import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const g=JSON.parse('{"title":"NoSQL数据库-键值存储etcd-租约与TTL机制：详细完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/nosql/keyvalue/etcd/leases.md","filePath":"data/database/nosql/keyvalue/etcd/leases.md"}'),p={name:"data/database/nosql/keyvalue/etcd/leases.md"};function h(l,s,c,e,t,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="nosql数据库-键值存储etcd-租约与ttl机制-详细完整学习笔记" tabindex="-1">NoSQL数据库-键值存储etcd-租约与TTL机制：详细完整学习笔记 <a class="header-anchor" href="#nosql数据库-键值存储etcd-租约与ttl机制-详细完整学习笔记" aria-label="Permalink to &quot;NoSQL数据库-键值存储etcd-租约与TTL机制：详细完整学习笔记&quot;">​</a></h1><h2 id="第一部分-租约机制基础概念" tabindex="-1">第一部分：租约机制基础概念 <a class="header-anchor" href="#第一部分-租约机制基础概念" aria-label="Permalink to &quot;第一部分：租约机制基础概念&quot;">​</a></h2><h3 id="_1-1-ttl与租约的概念区分" tabindex="-1">1.1 TTL与租约的概念区分 <a class="header-anchor" href="#_1-1-ttl与租约的概念区分" aria-label="Permalink to &quot;1.1 TTL与租约的概念区分&quot;">​</a></h3><h4 id="_1-1-1-ttl-time-to-live" tabindex="-1">1.1.1 TTL（Time-To-Live） <a class="header-anchor" href="#_1-1-1-ttl-time-to-live" aria-label="Permalink to &quot;1.1.1 TTL（Time-To-Live）&quot;">​</a></h4><p><strong>定义</strong>：键值对的生存时间，到期自动删除</p><ul><li><strong>被动过期</strong>：检查时发现过期才删除</li><li><strong>无状态</strong>：不维护过期信息，依赖定期扫描</li><li><strong>示例</strong>：Redis的EXPIRE命令</li></ul><h4 id="_1-2-2-租约-lease" tabindex="-1">1.2.2 租约（Lease） <a class="header-anchor" href="#_1-2-2-租约-lease" aria-label="Permalink to &quot;1.2.2 租约（Lease）&quot;">​</a></h4><p><strong>定义</strong>：主动的、可续期的生存时间管理机制</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 租约的核心属性</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Lease</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    ID        </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">         // 唯一标识符</span></span>
<span class="line"><span class="__shiki_140thh">    TTL       </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">         // 生存时间（秒）</span></span>
<span class="line"><span class="__shiki_140thh">    GrantedTTL </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">        // 授予的TTL</span></span>
<span class="line"><span class="__shiki_140thh">    Expiry    </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span><span class="__shiki_21nrsd">     // 精确过期时间</span></span>
<span class="line"><span class="__shiki_140thh">    KeyCount  </span><span class="__shiki_1itgoe">int</span><span class="__shiki_21nrsd">           // 关联的键数量</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>租约的特点</strong>：</p><ul><li><strong>主动管理</strong>：客户端可续期、可撤销</li><li><strong>状态维护</strong>：服务端跟踪租约状态</li><li><strong>批量管理</strong>：一个租约可关联多个键</li><li><strong>会话语义</strong>：适合连接/会话管理</li></ul><h3 id="_1-2-为什么需要租约机制" tabindex="-1">1.2 为什么需要租约机制？ <a class="header-anchor" href="#_1-2-为什么需要租约机制" aria-label="Permalink to &quot;1.2 为什么需要租约机制？&quot;">​</a></h3><h4 id="_1-2-1-传统ttl的局限性" tabindex="-1">1.2.1 传统TTL的局限性 <a class="header-anchor" href="#_1-2-1-传统ttl的局限性" aria-label="Permalink to &quot;1.2.1 传统TTL的局限性&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 传统TTL的问题</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> SimpleTTL</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    key       </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    value     []</span><span class="__shiki_1itgoe">byte</span></span>
<span class="line"><span class="__shiki_140thh">    expireAt  </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span><span class="__shiki_21nrsd">  // 问题：需要定期扫描检查</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 定期扫描开销大</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> cleanupExpiredKeys</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> key, ttl </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> allKeys {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">After</span><span class="__shiki_140thh">(ttl.expireAt) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            delete</span><span class="__shiki_140thh">(key)  </span><span class="__shiki_21nrsd">// O(n)复杂度</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_1-2-2-租约的优势" tabindex="-1">1.2.2 租约的优势 <a class="header-anchor" href="#_1-2-2-租约的优势" aria-label="Permalink to &quot;1.2.2 租约的优势&quot;">​</a></h4><ol><li><strong>效率</strong>：O(1)复杂度过期检查</li><li><strong>灵活性</strong>：可动态续期</li><li><strong>一致性</strong>：与Raft日志结合保证强一致性</li><li><strong>关联性</strong>：一个租约管理多个键</li></ol><h2 id="第二部分-etcd租约机制设计原理" tabindex="-1">第二部分：etcd租约机制设计原理 <a class="header-anchor" href="#第二部分-etcd租约机制设计原理" aria-label="Permalink to &quot;第二部分：etcd租约机制设计原理&quot;">​</a></h2><h3 id="_2-1-租约系统架构" tabindex="-1">2.1 租约系统架构 <a class="header-anchor" href="#_2-1-租约系统架构" aria-label="Permalink to &quot;2.1 租约系统架构&quot;">​</a></h3><h4 id="_2-1-1-整体架构" tabindex="-1">2.1.1 整体架构 <a class="header-anchor" href="#_2-1-1-整体架构" aria-label="Permalink to &quot;2.1.1 整体架构&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">客户端应用</span></span>
<span class="line"><span class="__shiki_wvjl67">    |</span></span>
<span class="line"><span class="__shiki_wvjl67">gRPC API (LeaseService)</span></span>
<span class="line"><span class="__shiki_wvjl67">    |</span></span>
<span class="line"><span class="__shiki_wvjl67">租约管理器 (Lessor)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── 租约映射表 (LeaseMap)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── 键-租约索引 (ItemMap)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── 过期最小堆 (ExpiryHeap)</span></span>
<span class="line"><span class="__shiki_wvjl67">    └── 时间轮调度器 (TimeWheel)</span></span>
<span class="line"><span class="__shiki_wvjl67">    |</span></span>
<span class="line"><span class="__shiki_wvjl67">Raft共识层 (日志复制)</span></span>
<span class="line"><span class="__shiki_wvjl67">    |</span></span>
<span class="line"><span class="__shiki_wvjl67">MVCC存储层 (持久化)</span></span></code></pre></div><h4 id="_2-1-2-核心组件交互" tabindex="-1">2.1.2 核心组件交互 <a class="header-anchor" href="#_2-1-2-核心组件交互" aria-label="Permalink to &quot;2.1.2 核心组件交互&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// etcd中租约相关的主要接口</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Lease</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 租约管理</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Grant</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">ttl</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">LeaseGrantResponse</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Revoke</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">id</span><span class="__shiki_1t8gfj"> LeaseID</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">LeaseRevokeResponse</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">    KeepAlive</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">id</span><span class="__shiki_1t8gfj"> LeaseID</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">&lt;-chan</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">LeaseKeepAliveResponse</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">    KeepAliveOnce</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">id</span><span class="__shiki_1t8gfj"> LeaseID</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">LeaseKeepAliveResponse</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">    TimeToLive</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">id</span><span class="__shiki_1t8gfj"> LeaseID</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">opts</span><span class="__shiki_1itgoe"> ...</span><span class="__shiki_1t8gfj">LeaseOption</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">LeaseTimeToLiveResponse</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 租约查询</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Leases</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">LeaseLeasesResponse</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 租约管理器接口</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Lessor</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 核心操作</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Grant</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_1t8gfj"> LeaseID</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">ttl</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Lease</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Revoke</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_1t8gfj"> LeaseID</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Attach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_1t8gfj"> LeaseID</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">items</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">LeaseItem</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Detach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_1t8gfj"> LeaseID</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">items</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">LeaseItem</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 续期与检查</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Renew</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_1t8gfj"> LeaseID</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">int64</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Lookup</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_1t8gfj"> LeaseID</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Lease</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 过期处理</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ExpireLeases</span><span class="__shiki_140thh">() []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Lease</span></span>
<span class="line"><span class="__shiki_1t8gfj">    GetLeaseResourceUsage</span><span class="__shiki_140thh">() </span><span class="__shiki_1t8gfj">LeaseResourceUsage</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-2-租约数据结构设计" tabindex="-1">2.2 租约数据结构设计 <a class="header-anchor" href="#_2-2-租约数据结构设计" aria-label="Permalink to &quot;2.2 租约数据结构设计&quot;">​</a></h3><h4 id="_2-2-1-内存中的租约结构" tabindex="-1">2.2.1 内存中的租约结构 <a class="header-anchor" href="#_2-2-1-内存中的租约结构" aria-label="Permalink to &quot;2.2.1 内存中的租约结构&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// etcd中完整的租约结构</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Lease</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    ID           </span><span class="__shiki_1t8gfj">LeaseID</span><span class="__shiki_21nrsd">                     // 租约ID</span></span>
<span class="line"><span class="__shiki_140thh">    TTL          </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">                       // 租约TTL（秒）</span></span>
<span class="line"><span class="__shiki_140thh">    GrantedTTL   </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">                       // 初始授予的TTL</span></span>
<span class="line"><span class="__shiki_140thh">    RemainingTTL </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">                       // 剩余TTL（用于查询）</span></span>
<span class="line"><span class="__shiki_140thh">    Expiry       </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span><span class="__shiki_21nrsd">                   // 绝对过期时间</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 关联的键集合（LeaseItem是key的别名）</span></span>
<span class="line"><span class="__shiki_140thh">    ItemSet      </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">LeaseItem</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh">{}      </span></span>
<span class="line"><span class="__shiki_140thh">    ItemCount    </span><span class="__shiki_1itgoe">int</span><span class="__shiki_21nrsd">                         // 关联键数量（性能优化）</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 元数据</span></span>
<span class="line"><span class="__shiki_140thh">    Created      </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span><span class="__shiki_21nrsd">                   // 创建时间</span></span>
<span class="line"><span class="__shiki_140thh">    LastRenewed  </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span><span class="__shiki_21nrsd">                   // 最后续期时间</span></span>
<span class="line"><span class="__shiki_140thh">    Revoked      </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_21nrsd">                        // 是否已撤销</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 索引信息</span></span>
<span class="line"><span class="__shiki_140thh">    ExpiryIndex  </span><span class="__shiki_1itgoe">int</span><span class="__shiki_21nrsd">                         // 在过期堆中的索引</span></span>
<span class="line"><span class="__shiki_140thh">    LeaseBucket  []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_21nrsd">                      // BoltDB中的存储位置</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 监控相关</span></span>
<span class="line"><span class="__shiki_140thh">    NotifyChan   </span><span class="__shiki_1itgoe">chan&lt;-</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh">{}             </span><span class="__shiki_21nrsd">// 过期通知通道</span></span>
<span class="line"><span class="__shiki_140thh">    WatchChan    </span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1t8gfj"> LeaseWatchResponse</span><span class="__shiki_21nrsd">     // 监控通道</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 统计信息</span></span>
<span class="line"><span class="__shiki_140thh">    RenewCount   </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">                       // 续期次数</span></span>
<span class="line"><span class="__shiki_140thh">    AttachCount  </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">                       // 关联次数</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    mu           </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RWMutex</span><span class="__shiki_21nrsd">                // 读写锁</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// LeaseItem定义</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> LeaseItem</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Key []</span><span class="__shiki_1itgoe">byte</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 租约状态枚举</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> LeaseState</span><span class="__shiki_1itgoe"> int</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">    LeaseActive</span><span class="__shiki_1t8gfj">    LeaseState</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> iota</span><span class="__shiki_21nrsd">  // 活跃</span></span>
<span class="line"><span class="__shiki_dzsirb">    LeaseExpired</span><span class="__shiki_21nrsd">                      // 已过期</span></span>
<span class="line"><span class="__shiki_dzsirb">    LeaseRevoked</span><span class="__shiki_21nrsd">                      // 已撤销</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h4 id="_2-2-2-持久化存储结构" tabindex="-1">2.2.2 持久化存储结构 <a class="header-anchor" href="#_2-2-2-持久化存储结构" aria-label="Permalink to &quot;2.2.2 持久化存储结构&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// BoltDB中的租约存储格式</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> PersistentLease</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    ID         </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_mdbnqw">    \`json:&quot;id&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    TTL        </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_mdbnqw">    \`json:&quot;ttl&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    ExpiryUnix </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_mdbnqw">    \`json:&quot;expiry_unix&quot;\`</span><span class="__shiki_21nrsd">  // Unix时间戳</span></span>
<span class="line"><span class="__shiki_140thh">    Keys       [][]</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_mdbnqw"> \`json:&quot;keys&quot;\`</span><span class="__shiki_21nrsd">         // 关联的键</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 存储布局</span></span>
<span class="line"><span class="__shiki_21nrsd">// bucket: &quot;lease&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">// key: leaseID (8字节小端序)</span></span>
<span class="line"><span class="__shiki_21nrsd">// value: PersistentLease (JSON序列化)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 关联索引</span></span>
<span class="line"><span class="__shiki_21nrsd">// bucket: &quot;lease_key_index&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">// key: 租约关联的键</span></span>
<span class="line"><span class="__shiki_21nrsd">// value: leaseID (8字节小端序)</span></span></code></pre></div><h3 id="_2-3-租约id生成机制" tabindex="-1">2.3 租约ID生成机制 <a class="header-anchor" href="#_2-3-租约id生成机制" aria-label="Permalink to &quot;2.3 租约ID生成机制&quot;">​</a></h3><h4 id="_2-3-1-id生成算法" tabindex="-1">2.3.1 ID生成算法 <a class="header-anchor" href="#_2-3-1-id生成算法" aria-label="Permalink to &quot;2.3.1 ID生成算法&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// etcd租约ID生成器</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> LeaseIDGenerator</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    mu        </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Mutex</span></span>
<span class="line"><span class="__shiki_140thh">    baseID    </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">           // 基础ID</span></span>
<span class="line"><span class="__shiki_140thh">    memberID  </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_21nrsd">          // 集群成员ID</span></span>
<span class="line"><span class="__shiki_140thh">    raftTerm  </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_21nrsd">          // 当前Raft任期</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 时间戳部分（高32位）</span></span>
<span class="line"><span class="__shiki_21nrsd">    // [63:32] = 时间戳（秒）</span></span>
<span class="line"><span class="__shiki_21nrsd">    // [31:24] = 成员ID片段</span></span>
<span class="line"><span class="__shiki_21nrsd">    // [23:0]  = 序列号</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">g </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">LeaseIDGenerator</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Next</span><span class="__shiki_140thh">() </span><span class="__shiki_1t8gfj">LeaseID</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    g.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> g.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    now </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">Unix</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 组合ID</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> (now </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_dzsirb"> 32</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">|</span><span class="__shiki_21nrsd">                    // 高32位：时间戳</span></span>
<span class="line"><span class="__shiki_140thh">           (</span><span class="__shiki_1itgoe">int64</span><span class="__shiki_140thh">(g.memberID </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1itgoe"> 0x</span><span class="__shiki_dzsirb">FF</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_dzsirb"> 24</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">|</span><span class="__shiki_21nrsd">  // 中间8位：成员ID</span></span>
<span class="line"><span class="__shiki_140thh">           (g.baseID </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1itgoe"> 0x</span><span class="__shiki_dzsirb">FFFFFF</span><span class="__shiki_140thh">)           </span><span class="__shiki_21nrsd">// 低24位：序列号</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    g.baseID</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> g.baseID </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> 0x</span><span class="__shiki_dzsirb">FFFFFF</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        g.baseID </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1t8gfj"> LeaseID</span><span class="__shiki_140thh">(id)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// ID解码函数</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> DecodeLeaseID</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_1t8gfj"> LeaseID</span><span class="__shiki_140thh">) (</span><span class="__shiki_1jdh33">timestamp</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">memberID</span><span class="__shiki_1itgoe"> uint8</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">seq</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    timestamp </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">(id </span><span class="__shiki_1itgoe">&gt;&gt;</span><span class="__shiki_dzsirb"> 32</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    memberID </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> uint8</span><span class="__shiki_140thh">((id </span><span class="__shiki_1itgoe">&gt;&gt;</span><span class="__shiki_dzsirb"> 24</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1itgoe"> 0x</span><span class="__shiki_dzsirb">FF</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    seq </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">(id </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1itgoe"> 0x</span><span class="__shiki_dzsirb">FFFFFF</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-3-2-id唯一性保证" tabindex="-1">2.3.2 ID唯一性保证 <a class="header-anchor" href="#_2-3-2-id唯一性保证" aria-label="Permalink to &quot;2.3.2 ID唯一性保证&quot;">​</a></h4><ol><li><strong>时间戳部分</strong>：秒级精度，保证跨节点单调递增</li><li><strong>成员ID部分</strong>：区分不同etcd节点</li><li><strong>序列号部分</strong>：同一秒内的自增序列</li><li><strong>冲突处理</strong>：Raft日志保证全局唯一</li></ol><h2 id="第三部分-租约生命周期管理" tabindex="-1">第三部分：租约生命周期管理 <a class="header-anchor" href="#第三部分-租约生命周期管理" aria-label="Permalink to &quot;第三部分：租约生命周期管理&quot;">​</a></h2><h3 id="_3-1-租约创建流程" tabindex="-1">3.1 租约创建流程 <a class="header-anchor" href="#_3-1-租约创建流程" aria-label="Permalink to &quot;3.1 租约创建流程&quot;">​</a></h3><h4 id="_3-1-1-客户端请求处理" tabindex="-1">3.1.1 客户端请求处理 <a class="header-anchor" href="#_3-1-1-客户端请求处理" aria-label="Permalink to &quot;3.1.1 客户端请求处理&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Lease Grant RPC处理流程</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">EtcdServer</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">LeaseGrant</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">cr</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">LeaseGrantRequest</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">LeaseGrantResponse</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 参数验证</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> cr.TTL </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, ErrLeaseTTLTooSmall</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> cr.TTL </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> maxLeaseTTL {</span></span>
<span class="line"><span class="__shiki_140thh">        cr.TTL </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> maxLeaseTTL</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 生成租约ID</span></span>
<span class="line"><span class="__shiki_140thh">    leaseID </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.lessor.</span><span class="__shiki_1t8gfj">NextID</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 创建Raft日志条目</span></span>
<span class="line"><span class="__shiki_140thh">    lease </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Lease</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        ID:  </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_140thh">(leaseID),</span></span>
<span class="line"><span class="__shiki_140thh">        TTL: cr.TTL,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 通过Raft提案</span></span>
<span class="line"><span class="__shiki_140thh">    r </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">InternalRaftRequest</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        LeaseGrant: </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">LeaseGrantRequest</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            ID:  lease.ID,</span></span>
<span class="line"><span class="__shiki_140thh">            TTL: lease.TTL,</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 提交到Raft集群</span></span>
<span class="line"><span class="__shiki_140thh">    resp, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.</span><span class="__shiki_1t8gfj">processInternalRaftRequest</span><span class="__shiki_140thh">(ctx, r)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 6. 等待应用</span></span>
<span class="line"><span class="__shiki_1itgoe">    select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">ctx.</span><span class="__shiki_1t8gfj">Done</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, ctx.</span><span class="__shiki_1t8gfj">Err</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">s.applyWait.</span><span class="__shiki_1t8gfj">Wait</span><span class="__shiki_140thh">(resp.Header.Index):</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 7. 返回结果</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">LeaseGrantResponse</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        Header: resp.Header,</span></span>
<span class="line"><span class="__shiki_140thh">        ID:     lease.ID,</span></span>
<span class="line"><span class="__shiki_140thh">        TTL:    lease.TTL,</span></span>
<span class="line"><span class="__shiki_140thh">    }, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-1-2-状态机应用" tabindex="-1">3.1.2 状态机应用 <a class="header-anchor" href="#_3-1-2-状态机应用" aria-label="Permalink to &quot;3.1.2 状态机应用&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Raft状态机中的应用逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">EtcdServer</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">applyLeaseGrant</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">leaseGrant</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">LeaseGrantRequest</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">applyResult</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 在Lessor中创建租约</span></span>
<span class="line"><span class="__shiki_140thh">    l, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.lessor.</span><span class="__shiki_1t8gfj">Grant</span><span class="__shiki_140thh">(leaseGrant.ID, leaseGrant.TTL)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">applyResult</span><span class="__shiki_140thh">{err: err}</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 记录到WAL（预写日志）</span></span>
<span class="line"><span class="__shiki_140thh">    walEntry </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">walpb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entry</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        Type:  walpb.ENTRY_TYPE_LEASE_GRANT,</span></span>
<span class="line"><span class="__shiki_140thh">        Term:  s.raft.Term,</span></span>
<span class="line"><span class="__shiki_140thh">        Index: s.raft.</span><span class="__shiki_1t8gfj">LastIndex</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        Data:  </span><span class="__shiki_1t8gfj">mustMarshal</span><span class="__shiki_140thh">(leaseGrant),</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 持久化到BoltDB</span></span>
<span class="line"><span class="__shiki_140thh">    err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> s.</span><span class="__shiki_1t8gfj">saveLeaseToBackend</span><span class="__shiki_140thh">(l)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">applyResult</span><span class="__shiki_140thh">{err: err}</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 更新指标</span></span>
<span class="line"><span class="__shiki_140thh">    s.metrics.LeaseGrants.</span><span class="__shiki_1t8gfj">Inc</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">applyResult</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        resp: </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">LeaseGrantResponse</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            ID:  leaseGrant.ID,</span></span>
<span class="line"><span class="__shiki_140thh">            TTL: leaseGrant.TTL,</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-租约续期机制" tabindex="-1">3.2 租约续期机制 <a class="header-anchor" href="#_3-2-租约续期机制" aria-label="Permalink to &quot;3.2 租约续期机制&quot;">​</a></h3><h4 id="_3-2-1-keepalive流程" tabindex="-1">3.2.1 KeepAlive流程 <a class="header-anchor" href="#_3-2-1-keepalive流程" aria-label="Permalink to &quot;3.2.1 KeepAlive流程&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// KeepAlive实现</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">l </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">lessor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Renew</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_1t8gfj"> LeaseID</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">int64</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    l.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> l.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 查找租约</span></span>
<span class="line"><span class="__shiki_140thh">    lease, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> l.leaseMap[id]</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">ok {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, ErrLeaseNotFound</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 检查是否已过期</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> lease.Expiry.</span><span class="__shiki_1t8gfj">Before</span><span class="__shiki_140thh">(time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, ErrLeaseExpired</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 更新过期时间</span></span>
<span class="line"><span class="__shiki_140thh">    oldExpiry </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> lease.Expiry</span></span>
<span class="line"><span class="__shiki_140thh">    lease.Expiry </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">Add</span><span class="__shiki_140thh">(time.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_140thh">(lease.TTL) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> time.Second)</span></span>
<span class="line"><span class="__shiki_140thh">    lease.LastRenewed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    lease.RenewCount</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 更新过期堆</span></span>
<span class="line"><span class="__shiki_140thh">    heap.</span><span class="__shiki_1t8gfj">Fix</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">l.expiredC, lease.ExpiryIndex)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 记录续期日志（可选）</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> l.enableRenewLogging {</span></span>
<span class="line"><span class="__shiki_140thh">        l.</span><span class="__shiki_1t8gfj">recordRenewal</span><span class="__shiki_140thh">(id, oldExpiry, lease.Expiry)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 6. 返回新的TTL</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> lease.TTL, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// KeepAlive流式接口</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">l </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">lessor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">KeepAlive</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">id</span><span class="__shiki_1t8gfj"> LeaseID</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">&lt;-chan</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">LeaseKeepAliveResponse</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    stream </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">LeaseKeepAliveResponse</span><span class="__shiki_140thh">, leaseKeepAliveResponseQueueSize)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    l.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> l.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 查找租约</span></span>
<span class="line"><span class="__shiki_140thh">    lease, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> l.leaseMap[id]</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">ok {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, ErrLeaseNotFound</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建续期循环</span></span>
<span class="line"><span class="__shiki_1itgoe">    go</span><span class="__shiki_140thh"> l.</span><span class="__shiki_1t8gfj">keepAliveLoop</span><span class="__shiki_140thh">(ctx, id, stream, lease)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> stream, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">l </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">lessor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">keepAliveLoop</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">id</span><span class="__shiki_1t8gfj"> LeaseID</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_1jdh33">    ch</span><span class="__shiki_1itgoe"> chan&lt;-</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">LeaseKeepAliveResponse</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">lease</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">Lease</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    ticker </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">NewTicker</span><span class="__shiki_140thh">(l.keepAliveInterval)</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> ticker.</span><span class="__shiki_1t8gfj">Stop</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">ctx.</span><span class="__shiki_1t8gfj">Done</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_1t8gfj">            close</span><span class="__shiki_140thh">(ch)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">ticker.C:</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 计算下一次续期时间</span></span>
<span class="line"><span class="__shiki_140thh">            remaining </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Until</span><span class="__shiki_140thh">(lease.Expiry)</span></span>
<span class="line"><span class="__shiki_140thh">            renewThreshold </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">float64</span><span class="__shiki_140thh">(lease.TTL) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.3</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> time.Second</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> remaining </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> renewThreshold {</span></span>
<span class="line"><span class="__shiki_140thh">                ttl, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> l.</span><span class="__shiki_1t8gfj">Renew</span><span class="__shiki_140thh">(id)</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                    ch </span><span class="__shiki_1itgoe">&lt;-</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">LeaseKeepAliveResponse</span><span class="__shiki_140thh">{ID: id, TTL: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, Error: err}</span></span>
<span class="line"><span class="__shiki_1itgoe">                    continue</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 发送续期响应</span></span>
<span class="line"><span class="__shiki_1itgoe">                select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                case</span><span class="__shiki_140thh"> ch </span><span class="__shiki_1itgoe">&lt;-</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_140thh">LeaseKeepAliveResponse{ID: id, TTL: ttl}:</span></span>
<span class="line"><span class="__shiki_1itgoe">                default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 避免阻塞，丢弃过期响应</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-2-2-续期优化策略" tabindex="-1">3.2.2 续期优化策略 <a class="header-anchor" href="#_3-2-2-续期优化策略" aria-label="Permalink to &quot;3.2.2 续期优化策略&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 批量续期优化</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> BatchRenewal</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    mu          </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Mutex</span></span>
<span class="line"><span class="__shiki_140thh">    leases      </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">LeaseID</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Lease</span></span>
<span class="line"><span class="__shiki_140thh">    batchSize   </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    maxInterval </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">b </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">BatchRenewal</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">AddLease</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">lease</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">Lease</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    b.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> b.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    b.leases[lease.ID] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> lease</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 达到批量大小时触发续期</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(b.leases) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> b.batchSize {</span></span>
<span class="line"><span class="__shiki_1itgoe">        go</span><span class="__shiki_140thh"> b.</span><span class="__shiki_1t8gfj">renewBatch</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">b </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">BatchRenewal</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">renewBatch</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    b.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> b.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 收集需要续期的租约</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> toRenew []</span><span class="__shiki_1t8gfj">LeaseID</span></span>
<span class="line"><span class="__shiki_140thh">    now </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> id, lease </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> b.leases {</span></span>
<span class="line"><span class="__shiki_140thh">        remaining </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> lease.Expiry.</span><span class="__shiki_1t8gfj">Sub</span><span class="__shiki_140thh">(now)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> remaining </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_140thh">(lease.TTL)</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">time.Second</span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            toRenew </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(toRenew, id)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 批量Raft提案</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(toRenew) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        req </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">LeaseBatchRenewRequest</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            IDs: toRenew,</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 提交批量续期请求</span></span>
<span class="line"><span class="__shiki_140thh">        b.</span><span class="__shiki_1t8gfj">submitBatchRenewal</span><span class="__shiki_140thh">(req)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 清空当前批次</span></span>
<span class="line"><span class="__shiki_140thh">    b.leases </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">LeaseID</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Lease</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-3-租约过期处理" tabindex="-1">3.3 租约过期处理 <a class="header-anchor" href="#_3-3-租约过期处理" aria-label="Permalink to &quot;3.3 租约过期处理&quot;">​</a></h3><h4 id="_3-3-1-过期检测算法" tabindex="-1">3.3.1 过期检测算法 <a class="header-anchor" href="#_3-3-1-过期检测算法" aria-label="Permalink to &quot;3.3.1 过期检测算法&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 基于最小堆的过期检测</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> expiryHeap</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Lease</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">h </span><span class="__shiki_1t8gfj">expiryHeap</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Len</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">           { </span><span class="__shiki_1itgoe">return</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(h) }</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">h </span><span class="__shiki_1t8gfj">expiryHeap</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Less</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">i</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">j</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> { </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh"> h[i].Expiry.</span><span class="__shiki_1t8gfj">Before</span><span class="__shiki_140thh">(h[j].Expiry) }</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">h </span><span class="__shiki_1t8gfj">expiryHeap</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Swap</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">i</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">j</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    h[i], h[j] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> h[j], h[i]</span></span>
<span class="line"><span class="__shiki_140thh">    h[i].ExpiryIndex </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> i</span></span>
<span class="line"><span class="__shiki_140thh">    h[j].ExpiryIndex </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> j</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">h </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">expiryHeap</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Push</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">x</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_140thh">{}) {</span></span>
<span class="line"><span class="__shiki_140thh">    lease </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> x.(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Lease</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    lease.ExpiryIndex </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">h)</span></span>
<span class="line"><span class="__shiki_1itgoe">    *</span><span class="__shiki_140thh">h </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">h, lease)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">h </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">expiryHeap</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Pop</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{} {</span></span>
<span class="line"><span class="__shiki_140thh">    old </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">h</span></span>
<span class="line"><span class="__shiki_140thh">    n </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(old)</span></span>
<span class="line"><span class="__shiki_140thh">    lease </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> old[n</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    lease.ExpiryIndex </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_1itgoe">    *</span><span class="__shiki_140thh">h </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> old[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh"> : n</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> lease</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 过期检查主循环</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">l </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">lessor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">expireLoop</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    checkInterval </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> l.leaseCheckInterval</span></span>
<span class="line"><span class="__shiki_140thh">    timer </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">NewTimer</span><span class="__shiki_140thh">(checkInterval)</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> timer.</span><span class="__shiki_1t8gfj">Stop</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">l.stopC:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">timer.C:</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 执行过期检查</span></span>
<span class="line"><span class="__shiki_140thh">            expiredLeases </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> l.</span><span class="__shiki_1t8gfj">findExpiredLeases</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(expiredLeases) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 处理过期租约</span></span>
<span class="line"><span class="__shiki_140thh">                l.</span><span class="__shiki_1t8gfj">processExpiredLeases</span><span class="__shiki_140thh">(expiredLeases)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 重置定时器</span></span>
<span class="line"><span class="__shiki_140thh">            timer.</span><span class="__shiki_1t8gfj">Reset</span><span class="__shiki_140thh">(checkInterval)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">l </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">lessor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">findExpiredLeases</span><span class="__shiki_140thh">() []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Lease</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    l.mu.</span><span class="__shiki_1t8gfj">RLock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> l.mu.</span><span class="__shiki_1t8gfj">RUnlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> expired []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Lease</span></span>
<span class="line"><span class="__shiki_140thh">    now </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查堆顶元素</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> l.expiredHeap.</span><span class="__shiki_1t8gfj">Len</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        lease </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> l.expiredHeap[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> now.</span><span class="__shiki_1t8gfj">Before</span><span class="__shiki_140thh">(lease.Expiry) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 最早过期的租约还未到期</span></span>
<span class="line"><span class="__shiki_1itgoe">            break</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 添加到过期列表</span></span>
<span class="line"><span class="__shiki_140thh">        expired </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(expired, lease)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 弹出堆顶</span></span>
<span class="line"><span class="__shiki_140thh">        heap.</span><span class="__shiki_1t8gfj">Pop</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">l.expiredHeap)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> expired</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-3-2-过期租约处理" tabindex="-1">3.3.2 过期租约处理 <a class="header-anchor" href="#_3-3-2-过期租约处理" aria-label="Permalink to &quot;3.3.2 过期租约处理&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">l </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">lessor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">processExpiredLeases</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">expired</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Lease</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 批量处理过期租约</span></span>
<span class="line"><span class="__shiki_140thh">    batchSize </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> l.batchExpirySize</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(expired); i </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> batchSize {</span></span>
<span class="line"><span class="__shiki_140thh">        end </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> batchSize</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> end </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(expired) {</span></span>
<span class="line"><span class="__shiki_140thh">            end </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(expired)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        batch </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> expired[i:end]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 创建过期提案</span></span>
<span class="line"><span class="__shiki_140thh">        req </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">InternalRaftRequest</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            LeaseRevokeBatch: </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">LeaseRevokeBatchRequest</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">                IDs: </span><span class="__shiki_1t8gfj">make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">int64</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(batch)),</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> j, lease </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> batch {</span></span>
<span class="line"><span class="__shiki_140thh">            req.LeaseRevokeBatch.IDs[j] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">(lease.ID)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 通过Raft提交</span></span>
<span class="line"><span class="__shiki_140thh">        ctx, cancel </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> context.</span><span class="__shiki_1t8gfj">WithTimeout</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), l.requestTimeout)</span></span>
<span class="line"><span class="__shiki_140thh">        _, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> l.server.</span><span class="__shiki_1t8gfj">Process</span><span class="__shiki_140thh">(ctx, req)</span></span>
<span class="line"><span class="__shiki_1t8gfj">        cancel</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            l.logger.</span><span class="__shiki_1t8gfj">Warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;failed to revoke expired leases&quot;</span><span class="__shiki_140thh">, zap.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(err))</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 重试逻辑</span></span>
<span class="line"><span class="__shiki_140thh">            l.</span><span class="__shiki_1t8gfj">retryExpiredLeases</span><span class="__shiki_140thh">(batch)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 状态机中的过期处理</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">EtcdServer</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">applyLeaseRevoke</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">leaseRevoke</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">LeaseRevokeRequest</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">applyResult</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 撤销租约</span></span>
<span class="line"><span class="__shiki_140thh">    err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.lessor.</span><span class="__shiki_1t8gfj">Revoke</span><span class="__shiki_140thh">(leaseRevoke.ID)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">applyResult</span><span class="__shiki_140thh">{err: err}</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 删除关联的所有键</span></span>
<span class="line"><span class="__shiki_140thh">    keys </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.lessor.</span><span class="__shiki_1t8gfj">GetLeaseKeys</span><span class="__shiki_140thh">(leaseRevoke.ID)</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, key </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> keys {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 通过KV存储删除键</span></span>
<span class="line"><span class="__shiki_140thh">        s.kv.</span><span class="__shiki_1t8gfj">Delete</span><span class="__shiki_140thh">(key, leaseRevoke.ID)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 清理存储</span></span>
<span class="line"><span class="__shiki_140thh">    s.</span><span class="__shiki_1t8gfj">deleteLeaseFromBackend</span><span class="__shiki_140thh">(leaseRevoke.ID)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 发送过期事件</span></span>
<span class="line"><span class="__shiki_140thh">    s.</span><span class="__shiki_1t8gfj">sendLeaseExpiredEvent</span><span class="__shiki_140thh">(leaseRevoke.ID, keys)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 更新指标</span></span>
<span class="line"><span class="__shiki_140thh">    s.metrics.LeaseExpirations.</span><span class="__shiki_1t8gfj">Inc</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">applyResult</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        resp: </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">LeaseRevokeResponse</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            Header: </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ResponseHeader</span><span class="__shiki_140thh">{},</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-4-租约撤销机制" tabindex="-1">3.4 租约撤销机制 <a class="header-anchor" href="#_3-4-租约撤销机制" aria-label="Permalink to &quot;3.4 租约撤销机制&quot;">​</a></h3><h4 id="_3-4-1-主动撤销流程" tabindex="-1">3.4.1 主动撤销流程 <a class="header-anchor" href="#_3-4-1-主动撤销流程" aria-label="Permalink to &quot;3.4.1 主动撤销流程&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">l </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">lessor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Revoke</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_1t8gfj"> LeaseID</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    l.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> l.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 查找租约</span></span>
<span class="line"><span class="__shiki_140thh">    lease, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> l.leaseMap[id]</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">ok {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> ErrLeaseNotFound</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 标记为已撤销</span></span>
<span class="line"><span class="__shiki_140thh">    lease.Revoked </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 从过期堆中移除</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> lease.ExpiryIndex </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> lease.ExpiryIndex </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(l.expiredHeap) {</span></span>
<span class="line"><span class="__shiki_140thh">        heap.</span><span class="__shiki_1t8gfj">Remove</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">l.expiredHeap, lease.ExpiryIndex)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 删除租约映射</span></span>
<span class="line"><span class="__shiki_1t8gfj">    delete</span><span class="__shiki_140thh">(l.leaseMap, id)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 清理键关联</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> item </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> lease.ItemSet {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        delete</span><span class="__shiki_140thh">(l.itemMap, item)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 6. 持久化删除</span></span>
<span class="line"><span class="__shiki_140thh">    l.</span><span class="__shiki_1t8gfj">deleteLeaseFromBackend</span><span class="__shiki_140thh">(id)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 7. 通知监控方</span></span>
<span class="line"><span class="__shiki_140thh">    l.</span><span class="__shiki_1t8gfj">notifyLeaseRevoked</span><span class="__shiki_140thh">(id)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第四部分-租约与键关联管理" tabindex="-1">第四部分：租约与键关联管理 <a class="header-anchor" href="#第四部分-租约与键关联管理" aria-label="Permalink to &quot;第四部分：租约与键关联管理&quot;">​</a></h2><h3 id="_4-1-键与租约的绑定" tabindex="-1">4.1 键与租约的绑定 <a class="header-anchor" href="#_4-1-键与租约的绑定" aria-label="Permalink to &quot;4.1 键与租约的绑定&quot;">​</a></h3><h4 id="_4-1-1-绑定机制" tabindex="-1">4.1.1 绑定机制 <a class="header-anchor" href="#_4-1-1-绑定机制" aria-label="Permalink to &quot;4.1.1 绑定机制&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 键与租约的关联管理</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">l </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">lessor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Attach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_1t8gfj"> LeaseID</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">items</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">LeaseItem</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    l.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> l.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 检查租约存在性</span></span>
<span class="line"><span class="__shiki_140thh">    lease, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> l.leaseMap[id]</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">ok {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> ErrLeaseNotFound</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 检查租约状态</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> lease.Revoked </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">After</span><span class="__shiki_140thh">(lease.Expiry) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> ErrLeaseExpired</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 绑定每个键</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, item </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> items {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查键是否已绑定其他租约</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> existingID, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> l.itemMap[item]; ok </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> existingID </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> id {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> ErrLeaseConflict</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 添加到租约的键集合</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> _, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> lease.ItemSet[item]; </span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">ok {</span></span>
<span class="line"><span class="__shiki_140thh">            lease.ItemSet[item] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh">{}{}</span></span>
<span class="line"><span class="__shiki_140thh">            lease.ItemCount</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_140thh">            l.itemMap[item] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> id</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 持久化关联关系</span></span>
<span class="line"><span class="__shiki_140thh">    l.</span><span class="__shiki_1t8gfj">saveLeaseAttachments</span><span class="__shiki_140thh">(id, items)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Put操作中的租约绑定</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">EtcdServer</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">putWithLease</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">value</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">leaseID</span><span class="__shiki_1t8gfj"> LeaseID</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 创建Put请求</span></span>
<span class="line"><span class="__shiki_140thh">    req </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">PutRequest</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        Key:    key,</span></span>
<span class="line"><span class="__shiki_140thh">        Value:  value,</span></span>
<span class="line"><span class="__shiki_140thh">        Lease:  </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_140thh">(leaseID),</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 通过Raft提交</span></span>
<span class="line"><span class="__shiki_140thh">    raftReq </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">InternalRaftRequest</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        Put: req,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. Raft日志包含租约信息</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 日志条目：{Type: ENTRY_TYPE_PUT, Key: key, Value: value, Lease: leaseID}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 状态机应用时自动绑定</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_4-1-2-关联查询" tabindex="-1">4.1.2 关联查询 <a class="header-anchor" href="#_4-1-2-关联查询" aria-label="Permalink to &quot;4.1.2 关联查询&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 查询租约关联的键</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">l </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">lessor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">GetLeaseKeys</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_1t8gfj"> LeaseID</span><span class="__shiki_140thh">) []</span><span class="__shiki_1t8gfj">LeaseItem</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    l.mu.</span><span class="__shiki_1t8gfj">RLock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> l.mu.</span><span class="__shiki_1t8gfj">RUnlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    lease, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> l.leaseMap[id]</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">ok {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    keys </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1t8gfj">LeaseItem</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(lease.ItemSet))</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> key </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> lease.ItemSet {</span></span>
<span class="line"><span class="__shiki_140thh">        keys </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(keys, key)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> keys</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 查询键关联的租约</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">l </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">lessor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">GetKeyLease</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_1t8gfj"> LeaseItem</span><span class="__shiki_140thh">) (</span><span class="__shiki_1t8gfj">LeaseID</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    l.mu.</span><span class="__shiki_1t8gfj">RLock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> l.mu.</span><span class="__shiki_1t8gfj">RUnlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    leaseID, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> l.itemMap[key]</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> leaseID, ok</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-解绑机制" tabindex="-1">4.2 解绑机制 <a class="header-anchor" href="#_4-2-解绑机制" aria-label="Permalink to &quot;4.2 解绑机制&quot;">​</a></h3><h4 id="_4-2-1-显式解绑" tabindex="-1">4.2.1 显式解绑 <a class="header-anchor" href="#_4-2-1-显式解绑" aria-label="Permalink to &quot;4.2.1 显式解绑&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">l </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">lessor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Detach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_1t8gfj"> LeaseID</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">items</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">LeaseItem</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    l.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> l.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 检查租约存在性</span></span>
<span class="line"><span class="__shiki_140thh">    lease, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> l.leaseMap[id]</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">ok {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> ErrLeaseNotFound</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 解绑每个键</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, item </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> items {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> _, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> lease.ItemSet[item]; ok {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            delete</span><span class="__shiki_140thh">(lease.ItemSet, item)</span></span>
<span class="line"><span class="__shiki_140thh">            lease.ItemCount</span><span class="__shiki_1itgoe">--</span></span>
<span class="line"><span class="__shiki_1t8gfj">            delete</span><span class="__shiki_140thh">(l.itemMap, item)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 如果租约没有关联键，考虑提前回收</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> lease.ItemCount </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> l.enableEmptyLeaseGC {</span></span>
<span class="line"><span class="__shiki_140thh">        l.</span><span class="__shiki_1t8gfj">scheduleLeaseGC</span><span class="__shiki_140thh">(id)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_4-2-2-隐式解绑-键删除时" tabindex="-1">4.2.2 隐式解绑（键删除时） <a class="header-anchor" href="#_4-2-2-隐式解绑-键删除时" aria-label="Permalink to &quot;4.2.2 隐式解绑（键删除时）&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 删除键时的租约解绑</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">EtcdServer</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">deleteKey</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 查找键关联的租约</span></span>
<span class="line"><span class="__shiki_140thh">    leaseID, hasLease </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.lessor.</span><span class="__shiki_1t8gfj">GetKeyLease</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">LeaseItem</span><span class="__shiki_140thh">{Key: key})</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 删除键</span></span>
<span class="line"><span class="__shiki_140thh">    err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.kv.</span><span class="__shiki_1t8gfj">Delete</span><span class="__shiki_140thh">(key)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 如果有关联租约，解绑</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> hasLease {</span></span>
<span class="line"><span class="__shiki_140thh">        items </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">LeaseItem</span><span class="__shiki_140thh">{{Key: key}}</span></span>
<span class="line"><span class="__shiki_140thh">        s.lessor.</span><span class="__shiki_1t8gfj">Detach</span><span class="__shiki_140thh">(leaseID, items)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第五部分-持久化与恢复" tabindex="-1">第五部分：持久化与恢复 <a class="header-anchor" href="#第五部分-持久化与恢复" aria-label="Permalink to &quot;第五部分：持久化与恢复&quot;">​</a></h2><h3 id="_5-1-租约数据持久化" tabindex="-1">5.1 租约数据持久化 <a class="header-anchor" href="#_5-1-租约数据持久化" aria-label="Permalink to &quot;5.1 租约数据持久化&quot;">​</a></h3><h4 id="_5-1-1-boltdb存储方案" tabindex="-1">5.1.1 BoltDB存储方案 <a class="header-anchor" href="#_5-1-1-boltdb存储方案" aria-label="Permalink to &quot;5.1.1 BoltDB存储方案&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 租约持久化到BoltDB</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">l </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">lessor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">saveLeaseToBackend</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">lease</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">Lease</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 编码租约数据</span></span>
<span class="line"><span class="__shiki_140thh">    data, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> json.</span><span class="__shiki_1t8gfj">Marshal</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">PersistentLease</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        ID:         </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_140thh">(lease.ID),</span></span>
<span class="line"><span class="__shiki_140thh">        TTL:        lease.TTL,</span></span>
<span class="line"><span class="__shiki_140thh">        ExpiryUnix: lease.Expiry.</span><span class="__shiki_1t8gfj">Unix</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        Keys:       l.</span><span class="__shiki_1t8gfj">getLeaseKeys</span><span class="__shiki_140thh">(lease.ID),</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // BoltDB事务</span></span>
<span class="line"><span class="__shiki_140thh">    err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> l.backend.</span><span class="__shiki_1t8gfj">Batch</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">tx</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">bolt</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Tx</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 租约bucket</span></span>
<span class="line"><span class="__shiki_140thh">        b </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> tx.</span><span class="__shiki_1t8gfj">Bucket</span><span class="__shiki_140thh">(leaseBucketName)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> b </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> ErrBucketNotFound</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 存储租约</span></span>
<span class="line"><span class="__shiki_140thh">        leaseKey </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> encodeLeaseKey</span><span class="__shiki_140thh">(lease.ID)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> b.</span><span class="__shiki_1t8gfj">Put</span><span class="__shiki_140thh">(leaseKey, data); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 更新键-租约索引</span></span>
<span class="line"><span class="__shiki_140thh">        idx </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> tx.</span><span class="__shiki_1t8gfj">Bucket</span><span class="__shiki_140thh">(leaseKeyIndexBucketName)</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, key </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> lease.Keys {</span></span>
<span class="line"><span class="__shiki_140thh">            idxKey </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> encodeIndexKey</span><span class="__shiki_140thh">(key)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> idx.</span><span class="__shiki_1t8gfj">Put</span><span class="__shiki_140thh">(idxKey, leaseKey); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 键编码函数</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> encodeLeaseKey</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_1t8gfj"> LeaseID</span><span class="__shiki_140thh">) []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    key </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">8</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    binary.BigEndian.</span><span class="__shiki_1t8gfj">PutUint64</span><span class="__shiki_140thh">(key, </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">(id))</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> key</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> encodeIndexKey</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">item</span><span class="__shiki_1t8gfj"> LeaseItem</span><span class="__shiki_140thh">) []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 使用SHA256避免key太长</span></span>
<span class="line"><span class="__shiki_140thh">    h </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> sha256.</span><span class="__shiki_1t8gfj">Sum256</span><span class="__shiki_140thh">(item.Key)</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> h[:]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_5-1-2-检查点机制" tabindex="-1">5.1.2 检查点机制 <a class="header-anchor" href="#_5-1-2-检查点机制" aria-label="Permalink to &quot;5.1.2 检查点机制&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 租约检查点</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> LeaseCheckpoint</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    ID           </span><span class="__shiki_1t8gfj">LeaseID</span></span>
<span class="line"><span class="__shiki_140thh">    RemainingTTL </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">    Timestamp    </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 定期创建检查点</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">l </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">lessor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">createCheckpoint</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    l.mu.</span><span class="__shiki_1t8gfj">RLock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> l.mu.</span><span class="__shiki_1t8gfj">RUnlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> checkpoints []</span><span class="__shiki_1t8gfj">LeaseCheckpoint</span></span>
<span class="line"><span class="__shiki_140thh">    now </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">Unix</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 收集活跃租约</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> id, lease </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> l.leaseMap {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">lease.Revoked </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> lease.Expiry.</span><span class="__shiki_1t8gfj">Unix</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> now {</span></span>
<span class="line"><span class="__shiki_140thh">            remaining </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> lease.Expiry.</span><span class="__shiki_1t8gfj">Unix</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> now</span></span>
<span class="line"><span class="__shiki_140thh">            checkpoints </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(checkpoints, </span><span class="__shiki_1t8gfj">LeaseCheckpoint</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">                ID:           id,</span></span>
<span class="line"><span class="__shiki_140thh">                RemainingTTL: remaining,</span></span>
<span class="line"><span class="__shiki_140thh">                Timestamp:    now,</span></span>
<span class="line"><span class="__shiki_140thh">            })</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 存储检查点</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> l.</span><span class="__shiki_1t8gfj">saveCheckpoints</span><span class="__shiki_140thh">(checkpoints)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-故障恢复" tabindex="-1">5.2 故障恢复 <a class="header-anchor" href="#_5-2-故障恢复" aria-label="Permalink to &quot;5.2 故障恢复&quot;">​</a></h3><h4 id="_5-2-1-重启恢复流程" tabindex="-1">5.2.1 重启恢复流程 <a class="header-anchor" href="#_5-2-1-重启恢复流程" aria-label="Permalink to &quot;5.2.1 重启恢复流程&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">l </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">lessor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">recoverFromBackend</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 从BoltDB加载租约</span></span>
<span class="line"><span class="__shiki_140thh">    leases, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> l.</span><span class="__shiki_1t8gfj">loadLeasesFromBackend</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 重建内存结构</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, lease </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> leases {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 计算过期时间</span></span>
<span class="line"><span class="__shiki_140thh">        expiry </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Unix</span><span class="__shiki_140thh">(lease.ExpiryUnix, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 创建内存租约对象</span></span>
<span class="line"><span class="__shiki_140thh">        memLease </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">Lease</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            ID:          lease.ID,</span></span>
<span class="line"><span class="__shiki_140thh">            TTL:         lease.TTL,</span></span>
<span class="line"><span class="__shiki_140thh">            GrantedTTL:  lease.TTL,</span></span>
<span class="line"><span class="__shiki_140thh">            Expiry:      expiry,</span></span>
<span class="line"><span class="__shiki_140thh">            ItemSet:     </span><span class="__shiki_1t8gfj">make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">LeaseItem</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh">{}),</span></span>
<span class="line"><span class="__shiki_140thh">            Created:     time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            LastRenewed: time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 加载关联的键</span></span>
<span class="line"><span class="__shiki_140thh">        keys, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> l.</span><span class="__shiki_1t8gfj">loadLeaseKeys</span><span class="__shiki_140thh">(lease.ID)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, key </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> keys {</span></span>
<span class="line"><span class="__shiki_140thh">            item </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> LeaseItem</span><span class="__shiki_140thh">{Key: key}</span></span>
<span class="line"><span class="__shiki_140thh">            memLease.ItemSet[item] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh">{}{}</span></span>
<span class="line"><span class="__shiki_140thh">            l.itemMap[item] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> lease.ID</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 添加到内存映射</span></span>
<span class="line"><span class="__shiki_140thh">        l.leaseMap[lease.ID] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> memLease</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 添加到过期堆</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> expiry.</span><span class="__shiki_1t8gfj">After</span><span class="__shiki_140thh">(time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_140thh">            heap.</span><span class="__shiki_1t8gfj">Push</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">l.expiredHeap, memLease)</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 已过期的租约加入待处理队列</span></span>
<span class="line"><span class="__shiki_140thh">            l.pendingExpired </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(l.pendingExpired, memLease)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 处理恢复期间过期的租约</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(l.pendingExpired) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        go</span><span class="__shiki_140thh"> l.</span><span class="__shiki_1t8gfj">processRecoveryExpirations</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_5-2-2-租约同步机制" tabindex="-1">5.2.2 租约同步机制 <a class="header-anchor" href="#_5-2-2-租约同步机制" aria-label="Permalink to &quot;5.2.2 租约同步机制&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 集群节点间的租约同步</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">l </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">lessor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">syncWithLeader</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 获取Leader的租约状态</span></span>
<span class="line"><span class="__shiki_140thh">    leaderLeases, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> l.</span><span class="__shiki_1t8gfj">getLeaderLeaseStatus</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 比较本地租约</span></span>
<span class="line"><span class="__shiki_140thh">    localLeases </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> l.</span><span class="__shiki_1t8gfj">getAllLeases</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 修复差异</span></span>
<span class="line"><span class="__shiki_140thh">    diff </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> l.</span><span class="__shiki_1t8gfj">compareLeases</span><span class="__shiki_140thh">(localLeases, leaderLeases)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 应用修复</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, repair </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> diff.repairs {</span></span>
<span class="line"><span class="__shiki_1itgoe">        switch</span><span class="__shiki_140thh"> repair.Action {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> RepairAdd:</span></span>
<span class="line"><span class="__shiki_140thh">            l.</span><span class="__shiki_1t8gfj">recoverLeaseFromLeader</span><span class="__shiki_140thh">(repair.LeaseID)</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> RepairUpdate:</span></span>
<span class="line"><span class="__shiki_140thh">            l.</span><span class="__shiki_1t8gfj">updateLeaseFromLeader</span><span class="__shiki_140thh">(repair.LeaseID)</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> RepairRemove:</span></span>
<span class="line"><span class="__shiki_140thh">            l.</span><span class="__shiki_1t8gfj">removeOrphanedLease</span><span class="__shiki_140thh">(repair.LeaseID)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第六部分-性能优化与监控" tabindex="-1">第六部分：性能优化与监控 <a class="header-anchor" href="#第六部分-性能优化与监控" aria-label="Permalink to &quot;第六部分：性能优化与监控&quot;">​</a></h2><h3 id="_6-1-内存优化" tabindex="-1">6.1 内存优化 <a class="header-anchor" href="#_6-1-内存优化" aria-label="Permalink to &quot;6.1 内存优化&quot;">​</a></h3><h4 id="_6-1-1-租约数据压缩" tabindex="-1">6.1.1 租约数据压缩 <a class="header-anchor" href="#_6-1-1-租约数据压缩" aria-label="Permalink to &quot;6.1.1 租约数据压缩&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 租约内存压缩</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> CompressedLease</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    ID           </span><span class="__shiki_1t8gfj">LeaseID</span></span>
<span class="line"><span class="__shiki_140thh">    TTL          </span><span class="__shiki_1itgoe">int16</span><span class="__shiki_21nrsd">         // 压缩为2字节（最大65535秒）</span></span>
<span class="line"><span class="__shiki_140thh">    Expiry       </span><span class="__shiki_1itgoe">uint32</span><span class="__shiki_21nrsd">        // 相对时间戳（从启动开始的秒数）</span></span>
<span class="line"><span class="__shiki_140thh">    KeyCount     </span><span class="__shiki_1itgoe">uint16</span><span class="__shiki_21nrsd">        // 关联键数量</span></span>
<span class="line"><span class="__shiki_140thh">    Flags        </span><span class="__shiki_1itgoe">uint8</span><span class="__shiki_21nrsd">         // 状态标志位</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 不存储完整的键集合，只存储引用计数</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 内存优化配置</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> LeaseMemoryConfig</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    EnableCompression    </span><span class="__shiki_1itgoe">bool</span></span>
<span class="line"><span class="__shiki_140thh">    MaxLeasesInMemory    </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    LeaseCacheSize       </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    EnableLRU           </span><span class="__shiki_1itgoe">bool</span></span>
<span class="line"><span class="__shiki_140thh">    CompressionThreshold </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// LRU缓存淘汰</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> LeaseLRUCache</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    cache    </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">lru</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Cache</span></span>
<span class="line"><span class="__shiki_140thh">    capacity </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">c </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">LeaseLRUCache</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Add</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">lease</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">Lease</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> c.cache.</span><span class="__shiki_1t8gfj">Len</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> c.capacity {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 淘汰最久未使用的租约</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> key, _, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> c.cache.</span><span class="__shiki_1t8gfj">RemoveOldest</span><span class="__shiki_140thh">(); ok {</span></span>
<span class="line"><span class="__shiki_140thh">            c.</span><span class="__shiki_1t8gfj">onEvict</span><span class="__shiki_140thh">(key.(</span><span class="__shiki_1t8gfj">LeaseID</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    c.cache.</span><span class="__shiki_1t8gfj">Add</span><span class="__shiki_140thh">(lease.ID, lease)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_6-1-2-过期检测优化" tabindex="-1">6.1.2 过期检测优化 <a class="header-anchor" href="#_6-1-2-过期检测优化" aria-label="Permalink to &quot;6.1.2 过期检测优化&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 多级时间轮算法</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> TimeWheel</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    wheels        []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">wheel</span></span>
<span class="line"><span class="__shiki_140thh">    currentTime   </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span></span>
<span class="line"><span class="__shiki_140thh">    tickDuration  </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">    ticksPerWheel </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> wheel</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    buckets    []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">leaseBucket</span></span>
<span class="line"><span class="__shiki_140thh">    resolution </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">    current    </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">tw </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TimeWheel</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">scheduleLeaseExpiry</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">lease</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">Lease</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    duration </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Until</span><span class="__shiki_140thh">(lease.Expiry)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 选择合适的时间轮层级</span></span>
<span class="line"><span class="__shiki_140thh">    wheelIndex </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(tw.wheels); i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> duration </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> tw.wheels[i].resolution</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">time.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_140thh">(tw.ticksPerWheel) {</span></span>
<span class="line"><span class="__shiki_140thh">            wheelIndex </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">            break</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 计算桶索引</span></span>
<span class="line"><span class="__shiki_140thh">    wheel </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> tw.wheels[wheelIndex]</span></span>
<span class="line"><span class="__shiki_140thh">    ticks </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">(duration </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> wheel.resolution)</span></span>
<span class="line"><span class="__shiki_140thh">    bucketIndex </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> (wheel.current </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> ticks) </span><span class="__shiki_1itgoe">%</span><span class="__shiki_140thh"> tw.ticksPerWheel</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 添加到桶</span></span>
<span class="line"><span class="__shiki_140thh">    wheel.buckets[bucketIndex].</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(lease)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 定时推进时间轮</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">tw </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TimeWheel</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">advance</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    tw.currentTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tw.currentTime.</span><span class="__shiki_1t8gfj">Add</span><span class="__shiki_140thh">(tw.tickDuration)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 推进最细粒度的时间轮</span></span>
<span class="line"><span class="__shiki_140thh">    tw.wheels[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">].current </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (tw.wheels[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">].current </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">%</span><span class="__shiki_140thh"> tw.ticksPerWheel</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 处理当前桶中的租约</span></span>
<span class="line"><span class="__shiki_140thh">    bucket </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> tw.wheels[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">].buckets[tw.wheels[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">].current]</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, lease </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> bucket.leases {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">After</span><span class="__shiki_140thh">(lease.Expiry) {</span></span>
<span class="line"><span class="__shiki_140thh">            tw.</span><span class="__shiki_1t8gfj">processExpiredLease</span><span class="__shiki_140thh">(lease)</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 迁移到更细粒度的时间轮</span></span>
<span class="line"><span class="__shiki_140thh">            tw.</span><span class="__shiki_1t8gfj">rescheduleLease</span><span class="__shiki_140thh">(lease)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    bucket.</span><span class="__shiki_1t8gfj">clear</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 处理高层时间轮的溢出</span></span>
<span class="line"><span class="__shiki_140thh">    tw.</span><span class="__shiki_1t8gfj">handleOverflow</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-监控指标" tabindex="-1">6.2 监控指标 <a class="header-anchor" href="#_6-2-监控指标" aria-label="Permalink to &quot;6.2 监控指标&quot;">​</a></h3><h4 id="_6-2-1-prometheus指标" tabindex="-1">6.2.1 Prometheus指标 <a class="header-anchor" href="#_6-2-1-prometheus指标" aria-label="Permalink to &quot;6.2.1 Prometheus指标&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 租约监控指标</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> LeaseMetrics</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 租约数量指标</span></span>
<span class="line"><span class="__shiki_140thh">    TotalLeases          </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Gauge</span></span>
<span class="line"><span class="__shiki_140thh">    ActiveLeases         </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Gauge</span></span>
<span class="line"><span class="__shiki_140thh">    ExpiredLeases        </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Counter</span></span>
<span class="line"><span class="__shiki_140thh">    RevokedLeases        </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Counter</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 性能指标</span></span>
<span class="line"><span class="__shiki_140thh">    GrantLatency         </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Histogram</span></span>
<span class="line"><span class="__shiki_140thh">    RenewLatency         </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Histogram</span></span>
<span class="line"><span class="__shiki_140thh">    RevokeLatency        </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Histogram</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 资源使用指标</span></span>
<span class="line"><span class="__shiki_140thh">    KeysPerLease         </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Histogram</span></span>
<span class="line"><span class="__shiki_140thh">    LeaseTTLDistribution </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Histogram</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 错误指标</span></span>
<span class="line"><span class="__shiki_140thh">    GrantErrors          </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Counter</span></span>
<span class="line"><span class="__shiki_140thh">    RenewErrors          </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Counter</span></span>
<span class="line"><span class="__shiki_140thh">    RevokeErrors         </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Counter</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 指标收集示例</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">l </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">lessor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">recordMetrics</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    l.metrics.TotalLeases.</span><span class="__shiki_1t8gfj">Set</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">float64</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(l.leaseMap)))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    activeCount </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">    now </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, lease </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> l.leaseMap {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">lease.Revoked </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> lease.Expiry.</span><span class="__shiki_1t8gfj">After</span><span class="__shiki_140thh">(now) {</span></span>
<span class="line"><span class="__shiki_140thh">            activeCount</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    l.metrics.ActiveLeases.</span><span class="__shiki_1t8gfj">Set</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">float64</span><span class="__shiki_140thh">(activeCount))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 记录TTL分布</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, lease </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> l.leaseMap {</span></span>
<span class="line"><span class="__shiki_140thh">        l.metrics.LeaseTTLDistribution.</span><span class="__shiki_1t8gfj">Observe</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">float64</span><span class="__shiki_140thh">(lease.TTL))</span></span>
<span class="line"><span class="__shiki_140thh">        l.metrics.KeysPerLease.</span><span class="__shiki_1t8gfj">Observe</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">float64</span><span class="__shiki_140thh">(lease.ItemCount))</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_6-2-2-健康检查" tabindex="-1">6.2.2 健康检查 <a class="header-anchor" href="#_6-2-2-健康检查" aria-label="Permalink to &quot;6.2.2 健康检查&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 租约系统健康状态</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> LeaseHealth</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Status            </span><span class="__shiki_1itgoe">string</span><span class="__shiki_mdbnqw">    \`json:&quot;status&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    ActiveLeases      </span><span class="__shiki_1itgoe">int</span><span class="__shiki_mdbnqw">       \`json:&quot;active_leases&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    PendingExpirations </span><span class="__shiki_1itgoe">int</span><span class="__shiki_mdbnqw">     \`json:&quot;pending_expirations&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    MemoryUsage       </span><span class="__shiki_1itgoe">string</span><span class="__shiki_mdbnqw">   \`json:&quot;memory_usage&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    AvgKeysPerLease   </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_mdbnqw">  \`json:&quot;avg_keys_per_lease&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    ErrorRate         </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_mdbnqw">  \`json:&quot;error_rate&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    LastCheckpoint    </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span><span class="__shiki_mdbnqw"> \`json:&quot;last_checkpoint&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">l </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">lessor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">CheckHealth</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">LeaseHealth</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    l.mu.</span><span class="__shiki_1t8gfj">RLock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> l.mu.</span><span class="__shiki_1t8gfj">RUnlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    active </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">    totalKeys </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">    now </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, lease </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> l.leaseMap {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">lease.Revoked </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> lease.Expiry.</span><span class="__shiki_1t8gfj">After</span><span class="__shiki_140thh">(now) {</span></span>
<span class="line"><span class="__shiki_140thh">            active</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_140thh">            totalKeys </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> lease.ItemCount</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    avgKeys </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 0.0</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> active </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        avgKeys </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> float64</span><span class="__shiki_140thh">(totalKeys) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_1itgoe"> float64</span><span class="__shiki_140thh">(active)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">LeaseHealth</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        Status:            </span><span class="__shiki_mdbnqw">&quot;healthy&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        ActiveLeases:      active,</span></span>
<span class="line"><span class="__shiki_140thh">        PendingExpirations: </span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(l.pendingExpired),</span></span>
<span class="line"><span class="__shiki_140thh">        AvgKeysPerLease:   avgKeys,</span></span>
<span class="line"><span class="__shiki_140thh">        LastCheckpoint:    l.lastCheckpointTime,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第七部分-实践应用与最佳实践" tabindex="-1">第七部分：实践应用与最佳实践 <a class="header-anchor" href="#第七部分-实践应用与最佳实践" aria-label="Permalink to &quot;第七部分：实践应用与最佳实践&quot;">​</a></h2><h3 id="_7-1-典型应用场景" tabindex="-1">7.1 典型应用场景 <a class="header-anchor" href="#_7-1-典型应用场景" aria-label="Permalink to &quot;7.1 典型应用场景&quot;">​</a></h3><h4 id="_7-1-1-服务注册与发现" tabindex="-1">7.1.1 服务注册与发现 <a class="header-anchor" href="#_7-1-1-服务注册与发现" aria-label="Permalink to &quot;7.1.1 服务注册与发现&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 基于租约的服务注册</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> ServiceRegistry</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    etcdClient </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">clientv3</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Client</span></span>
<span class="line"><span class="__shiki_140thh">    serviceTTL </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">    leaseID    </span><span class="__shiki_1t8gfj">clientv3</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">LeaseID</span></span>
<span class="line"><span class="__shiki_140thh">    stopChan   </span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">sr </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">ServiceRegistry</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Register</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">serviceName</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">endpoint</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 创建租约</span></span>
<span class="line"><span class="__shiki_140thh">    grantResp, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> sr.etcdClient.</span><span class="__shiki_1t8gfj">Grant</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), sr.serviceTTL)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    sr.leaseID </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> grantResp.ID</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 注册服务</span></span>
<span class="line"><span class="__shiki_140thh">    key </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/services/</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, serviceName, endpoint)</span></span>
<span class="line"><span class="__shiki_140thh">    _, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sr.etcdClient.</span><span class="__shiki_1t8gfj">Put</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), key, endpoint, </span></span>
<span class="line"><span class="__shiki_140thh">        clientv3.</span><span class="__shiki_1t8gfj">WithLease</span><span class="__shiki_140thh">(sr.leaseID))</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 启动续期循环</span></span>
<span class="line"><span class="__shiki_1itgoe">    go</span><span class="__shiki_140thh"> sr.</span><span class="__shiki_1t8gfj">keepAlive</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">sr </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">ServiceRegistry</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">keepAlive</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    ka, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> sr.etcdClient.</span><span class="__shiki_1t8gfj">KeepAlive</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), sr.leaseID)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">sr.stopChan:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> _, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">ka:</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">ok {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 租约过期，尝试重新注册</span></span>
<span class="line"><span class="__shiki_140thh">                sr.</span><span class="__shiki_1t8gfj">reconnect</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 服务发现</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> DiscoverServices</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">serviceName</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">) ([]</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    prefix </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/services/</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">/&quot;</span><span class="__shiki_140thh">, serviceName)</span></span>
<span class="line"><span class="__shiki_140thh">    resp, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> etcdClient.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), prefix, clientv3.</span><span class="__shiki_1t8gfj">WithPrefix</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> endpoints []</span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, kv </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> resp.Kvs {</span></span>
<span class="line"><span class="__shiki_140thh">        endpoints </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(endpoints, </span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">(kv.Value))</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> endpoints, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_7-1-2-分布式锁" tabindex="-1">7.1.2 分布式锁 <a class="header-anchor" href="#_7-1-2-分布式锁" aria-label="Permalink to &quot;7.1.2 分布式锁&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 基于租约的分布式锁</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> DistributedLock</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    client    </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">clientv3</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Client</span></span>
<span class="line"><span class="__shiki_140thh">    key       </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    leaseID   </span><span class="__shiki_1t8gfj">clientv3</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">LeaseID</span></span>
<span class="line"><span class="__shiki_140thh">    leaseTTL  </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">    isHeld    </span><span class="__shiki_1itgoe">bool</span></span>
<span class="line"><span class="__shiki_140thh">    stopRenew </span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">dl </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">DistributedLock</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">timeout</span><span class="__shiki_1t8gfj"> time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 创建租约</span></span>
<span class="line"><span class="__shiki_140thh">    ctx, cancel </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> context.</span><span class="__shiki_1t8gfj">WithTimeout</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), timeout)</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_1t8gfj"> cancel</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    grantResp, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> dl.client.</span><span class="__shiki_1t8gfj">Grant</span><span class="__shiki_140thh">(ctx, dl.leaseTTL)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    dl.leaseID </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> grantResp.ID</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 尝试获取锁（事务操作）</span></span>
<span class="line"><span class="__shiki_140thh">    txn </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> dl.client.</span><span class="__shiki_1t8gfj">Txn</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"><span class="__shiki_140thh">    txnResp, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> txn.</span><span class="__shiki_1t8gfj">If</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        clientv3.</span><span class="__shiki_1t8gfj">Compare</span><span class="__shiki_140thh">(clientv3.</span><span class="__shiki_1t8gfj">CreateRevision</span><span class="__shiki_140thh">(dl.key), </span><span class="__shiki_mdbnqw">&quot;=&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    ).</span><span class="__shiki_1t8gfj">Then</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        clientv3.</span><span class="__shiki_1t8gfj">OpPut</span><span class="__shiki_140thh">(dl.key, </span><span class="__shiki_mdbnqw">&quot;locked&quot;</span><span class="__shiki_140thh">, clientv3.</span><span class="__shiki_1t8gfj">WithLease</span><span class="__shiki_140thh">(dl.leaseID)),</span></span>
<span class="line"><span class="__shiki_140thh">    ).</span><span class="__shiki_1t8gfj">Else</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        clientv3.</span><span class="__shiki_1t8gfj">OpGet</span><span class="__shiki_140thh">(dl.key),</span></span>
<span class="line"><span class="__shiki_140thh">    ).</span><span class="__shiki_1t8gfj">Commit</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">txnResp.Succeeded {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> ErrLockAlreadyHeld</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 启动续期</span></span>
<span class="line"><span class="__shiki_140thh">    dl.isHeld </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_140thh">    dl.stopRenew </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh">{})</span></span>
<span class="line"><span class="__shiki_1itgoe">    go</span><span class="__shiki_140thh"> dl.</span><span class="__shiki_1t8gfj">keepAlive</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">dl </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">DistributedLock</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">keepAlive</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    ka, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> dl.client.</span><span class="__shiki_1t8gfj">KeepAlive</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), dl.leaseID)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">dl.stopRenew:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> _, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">ka:</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">ok {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 租约失效，锁已丢失</span></span>
<span class="line"><span class="__shiki_140thh">                dl.isHeld </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_1t8gfj">                close</span><span class="__shiki_140thh">(dl.stopRenew)</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_7-1-3-会话管理" tabindex="-1">7.1.3 会话管理 <a class="header-anchor" href="#_7-1-3-会话管理" aria-label="Permalink to &quot;7.1.3 会话管理&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 基于租约的会话管理</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> UserSession</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    SessionID </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    UserID    </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    Data      </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">    leaseID   </span><span class="__shiki_1t8gfj">clientv3</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">LeaseID</span></span>
<span class="line"><span class="__shiki_140thh">    lastActivity </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> SessionManager</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    sessions </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">UserSession</span></span>
<span class="line"><span class="__shiki_140thh">    etcd     </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">clientv3</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Client</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">sm </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">SessionManager</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">CreateSession</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">userID</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">ttl</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">UserSession</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 创建租约</span></span>
<span class="line"><span class="__shiki_140thh">    grantResp, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> sm.etcd.</span><span class="__shiki_1t8gfj">Grant</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), ttl)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 创建会话</span></span>
<span class="line"><span class="__shiki_140thh">    sessionID </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> generateSessionID</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    session </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">UserSession</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        SessionID:    sessionID,</span></span>
<span class="line"><span class="__shiki_140thh">        UserID:       userID,</span></span>
<span class="line"><span class="__shiki_140thh">        Data:         </span><span class="__shiki_1t8gfj">make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}),</span></span>
<span class="line"><span class="__shiki_140thh">        leaseID:      grantResp.ID,</span></span>
<span class="line"><span class="__shiki_140thh">        lastActivity: time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 存储会话数据</span></span>
<span class="line"><span class="__shiki_140thh">    key </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/sessions/</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, sessionID)</span></span>
<span class="line"><span class="__shiki_140thh">    data, _ </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> json.</span><span class="__shiki_1t8gfj">Marshal</span><span class="__shiki_140thh">(session.Data)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    _, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sm.etcd.</span><span class="__shiki_1t8gfj">Put</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), key, </span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">(data), </span></span>
<span class="line"><span class="__shiki_140thh">        clientv3.</span><span class="__shiki_1t8gfj">WithLease</span><span class="__shiki_140thh">(grantResp.ID))</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 添加到内存缓存</span></span>
<span class="line"><span class="__shiki_140thh">    sm.sessions[sessionID] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> session</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 设置会话活动监控</span></span>
<span class="line"><span class="__shiki_1itgoe">    go</span><span class="__shiki_140thh"> sm.</span><span class="__shiki_1t8gfj">monitorSessionActivity</span><span class="__shiki_140thh">(session)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> session, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">sm </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">SessionManager</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">RefreshSession</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">sessionID</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    session, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> sm.sessions[sessionID]</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">ok {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> ErrSessionNotFound</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 更新最后活动时间</span></span>
<span class="line"><span class="__shiki_140thh">    session.lastActivity </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 续期租约</span></span>
<span class="line"><span class="__shiki_140thh">    _, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> sm.etcd.</span><span class="__shiki_1t8gfj">KeepAliveOnce</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), session.leaseID)</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-最佳实践" tabindex="-1">7.2 最佳实践 <a class="header-anchor" href="#_7-2-最佳实践" aria-label="Permalink to &quot;7.2 最佳实践&quot;">​</a></h3><h4 id="_7-2-1-租约配置建议" tabindex="-1">7.2.1 租约配置建议 <a class="header-anchor" href="#_7-2-1-租约配置建议" aria-label="Permalink to &quot;7.2.1 租约配置建议&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># etcd租约配置最佳实践</span></span>
<span class="line"><span class="__shiki_17hn0y">etcd</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  lease</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # TTL配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    default-ttl</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span><span class="__shiki_21nrsd">           # 默认60秒</span></span>
<span class="line"><span class="__shiki_17hn0y">    min-ttl</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_21nrsd">                # 最小5秒</span></span>
<span class="line"><span class="__shiki_17hn0y">    max-ttl</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">86400</span><span class="__shiki_21nrsd">           # 最大24小时</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 续期配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    keepalive-interval</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_21nrsd">    # 续期间隔30秒</span></span>
<span class="line"><span class="__shiki_17hn0y">    keepalive-timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_21nrsd">     # 续期超时10秒</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 性能配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    max-leases</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100000</span><span class="__shiki_21nrsd">        # 最大租约数</span></span>
<span class="line"><span class="__shiki_17hn0y">    batch-expiry-size</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_21nrsd">    # 批量过期大小</span></span>
<span class="line"><span class="__shiki_17hn0y">    enable-timewheel</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">    # 启用时间轮优化</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 监控配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    metrics-interval</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_21nrsd">      # 指标收集间隔30秒</span></span>
<span class="line"><span class="__shiki_17hn0y">    health-check-interval</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span><span class="__shiki_21nrsd"> # 健康检查间隔60秒</span></span></code></pre></div><h4 id="_7-2-2-客户端使用模式" tabindex="-1">7.2.2 客户端使用模式 <a class="header-anchor" href="#_7-2-2-客户端使用模式" aria-label="Permalink to &quot;7.2.2 客户端使用模式&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 租约使用的最佳实践模式</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> LeaseManager</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    client      </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">clientv3</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Client</span></span>
<span class="line"><span class="__shiki_140thh">    leases      </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">LeaseHandle</span></span>
<span class="line"><span class="__shiki_140thh">    mu          </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RWMutex</span></span>
<span class="line"><span class="__shiki_140thh">    maxLeases   </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> LeaseHandle</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    ID         </span><span class="__shiki_1t8gfj">clientv3</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">LeaseID</span></span>
<span class="line"><span class="__shiki_140thh">    Key        </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    TTL        </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">    LastRenew  </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span></span>
<span class="line"><span class="__shiki_140thh">    CancelFunc </span><span class="__shiki_1t8gfj">context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">CancelFunc</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">lm </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">LeaseManager</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">AcquireLease</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">ttl</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">LeaseHandle</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 检查租约数量限制</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(lm.leases) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> lm.maxLeases {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, ErrTooManyLeases</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 创建带超时的上下文</span></span>
<span class="line"><span class="__shiki_140thh">    ctx, cancel </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> context.</span><span class="__shiki_1t8gfj">WithTimeout</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">5</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">time.Second)</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_1t8gfj"> cancel</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 创建租约</span></span>
<span class="line"><span class="__shiki_140thh">    grantResp, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> lm.client.</span><span class="__shiki_1t8gfj">Grant</span><span class="__shiki_140thh">(ctx, ttl)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;grant lease failed: </span><span class="__shiki_dzsirb">%w</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 创建续期上下文</span></span>
<span class="line"><span class="__shiki_140thh">    renewCtx, renewCancel </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> context.</span><span class="__shiki_1t8gfj">WithCancel</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    handle </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">LeaseHandle</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        ID:         grantResp.ID,</span></span>
<span class="line"><span class="__shiki_140thh">        Key:        key,</span></span>
<span class="line"><span class="__shiki_140thh">        TTL:        ttl,</span></span>
<span class="line"><span class="__shiki_140thh">        LastRenew:  time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        CancelFunc: renewCancel,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 启动续期协程</span></span>
<span class="line"><span class="__shiki_1itgoe">    go</span><span class="__shiki_140thh"> lm.</span><span class="__shiki_1t8gfj">keepAliveLease</span><span class="__shiki_140thh">(renewCtx, handle)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 6. 记录租约</span></span>
<span class="line"><span class="__shiki_140thh">    lm.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    lm.leases[key] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> handle</span></span>
<span class="line"><span class="__shiki_140thh">    lm.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> handle, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">lm </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">LeaseManager</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">keepAliveLease</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">handle</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">LeaseHandle</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    ticker </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">NewTicker</span><span class="__shiki_140thh">(time.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_140thh">(handle.TTL</span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> time.Second)</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> ticker.</span><span class="__shiki_1t8gfj">Stop</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">ctx.</span><span class="__shiki_1t8gfj">Done</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">ticker.C:</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 续期租约</span></span>
<span class="line"><span class="__shiki_140thh">            _, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> lm.client.</span><span class="__shiki_1t8gfj">KeepAliveOnce</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), handle.ID)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 租约可能已过期</span></span>
<span class="line"><span class="__shiki_140thh">                lm.</span><span class="__shiki_1t8gfj">handleLeaseExpired</span><span class="__shiki_140thh">(handle.Key)</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            handle.LastRenew </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 优雅关闭</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">lm </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">LeaseManager</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Shutdown</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    lm.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> lm.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 撤销所有租约</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> key, handle </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> lm.leases {</span></span>
<span class="line"><span class="__shiki_140thh">        ctx, cancel </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> context.</span><span class="__shiki_1t8gfj">WithTimeout</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">time.Second)</span></span>
<span class="line"><span class="__shiki_140thh">        _, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> lm.client.</span><span class="__shiki_1t8gfj">Revoke</span><span class="__shiki_140thh">(ctx, handle.ID)</span></span>
<span class="line"><span class="__shiki_1t8gfj">        cancel</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Failed to revoke lease for key </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, key, err)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 取消续期协程</span></span>
<span class="line"><span class="__shiki_140thh">        handle.</span><span class="__shiki_1t8gfj">CancelFunc</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    lm.leases </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">LeaseHandle</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_7-2-3-故障处理策略" tabindex="-1">7.2.3 故障处理策略 <a class="header-anchor" href="#_7-2-3-故障处理策略" aria-label="Permalink to &quot;7.2.3 故障处理策略&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 租约故障恢复策略</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> LeaseRecoveryPolicy</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    MaxRetries     </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    BackoffFactor  </span><span class="__shiki_1itgoe">float64</span></span>
<span class="line"><span class="__shiki_140thh">    InitialDelay   </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">    MaxDelay       </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">p </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">LeaseRecoveryPolicy</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">RecoverLease</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">leaseID</span><span class="__shiki_1t8gfj"> clientv3</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">LeaseID</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_1jdh33">    retryFunc</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> lastErr </span><span class="__shiki_1itgoe">error</span></span>
<span class="line"><span class="__shiki_140thh">    delay </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> p.InitialDelay</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> p.MaxRetries; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> retryFunc</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_21nrsd"> // 恢复成功</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        lastErr </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 指数退避</span></span>
<span class="line"><span class="__shiki_140thh">        time.</span><span class="__shiki_1t8gfj">Sleep</span><span class="__shiki_140thh">(delay)</span></span>
<span class="line"><span class="__shiki_140thh">        delay </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">float64</span><span class="__shiki_140thh">(delay) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> p.BackoffFactor)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> delay </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> p.MaxDelay {</span></span>
<span class="line"><span class="__shiki_140thh">            delay </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> p.MaxDelay</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查租约状态</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> p.</span><span class="__shiki_1t8gfj">isLeasePermanentlyLost</span><span class="__shiki_140thh">(leaseID) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;lease permanently lost: </span><span class="__shiki_dzsirb">%w</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, lastErr)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;lease recovery failed after </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw"> attempts: </span><span class="__shiki_dzsirb">%w</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">        p.MaxRetries, lastErr)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 监控告警配置</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> LeaseAlertConfig</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    ExpirationThreshold </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_21nrsd">  // 过期阈值比例（如0.8表示80%TTL时告警）</span></span>
<span class="line"><span class="__shiki_140thh">    RenewFailureCount   </span><span class="__shiki_1itgoe">int</span><span class="__shiki_21nrsd">      // 续期连续失败次数</span></span>
<span class="line"><span class="__shiki_140thh">    HighUsageThreshold  </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_21nrsd">  // 高使用率阈值</span></span>
<span class="line"><span class="__shiki_140thh">    CheckInterval       </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">c </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">LeaseAlertConfig</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">CheckAlerts</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">manager</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">LeaseManager</span><span class="__shiki_140thh">) []</span><span class="__shiki_1t8gfj">Alert</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> alerts []</span><span class="__shiki_1t8gfj">Alert</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    now </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, handle </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> manager.</span><span class="__shiki_1t8gfj">GetAllLeases</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查即将过期的租约</span></span>
<span class="line"><span class="__shiki_140thh">        elapsed </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> now.</span><span class="__shiki_1t8gfj">Sub</span><span class="__shiki_140thh">(handle.LastRenew)</span></span>
<span class="line"><span class="__shiki_140thh">        ttlDuration </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_140thh">(handle.TTL) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> time.Second</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> float64</span><span class="__shiki_140thh">(elapsed) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> float64</span><span class="__shiki_140thh">(ttlDuration)</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">c.ExpirationThreshold {</span></span>
<span class="line"><span class="__shiki_140thh">            alerts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(alerts, </span><span class="__shiki_1t8gfj">Alert</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">                Type:    </span><span class="__shiki_mdbnqw">&quot;LeaseNearExpiration&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                LeaseID: handle.ID,</span></span>
<span class="line"><span class="__shiki_140thh">                Key:     handle.Key,</span></span>
<span class="line"><span class="__shiki_140thh">                Message: fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Lease will expire in </span><span class="__shiki_dzsirb">%.0f</span><span class="__shiki_mdbnqw"> seconds&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                    ttlDuration.</span><span class="__shiki_1t8gfj">Seconds</span><span class="__shiki_140thh">()</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">elapsed.</span><span class="__shiki_1t8gfj">Seconds</span><span class="__shiki_140thh">()),</span></span>
<span class="line"><span class="__shiki_140thh">            })</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查系统使用率</span></span>
<span class="line"><span class="__shiki_140thh">    usage </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> manager.</span><span class="__shiki_1t8gfj">GetResourceUsage</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> usage </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> c.HighUsageThreshold {</span></span>
<span class="line"><span class="__shiki_140thh">        alerts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(alerts, </span><span class="__shiki_1t8gfj">Alert</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            Type:    </span><span class="__shiki_mdbnqw">&quot;HighLeaseUsage&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            Message: fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Lease usage is </span><span class="__shiki_dzsirb">%.1f%%</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, usage</span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> alerts</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-3-性能测试与调优" tabindex="-1">7.3 性能测试与调优 <a class="header-anchor" href="#_7-3-性能测试与调优" aria-label="Permalink to &quot;7.3 性能测试与调优&quot;">​</a></h3><h4 id="_7-3-1-基准测试" tabindex="-1">7.3.1 基准测试 <a class="header-anchor" href="#_7-3-1-基准测试" aria-label="Permalink to &quot;7.3.1 基准测试&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 租约性能基准测试</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> BenchmarkLeaseOperations</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">b</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">testing</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">B</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 准备测试环境</span></span>
<span class="line"><span class="__shiki_140thh">    client </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> setupTestEtcd</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    b.</span><span class="__shiki_1t8gfj">Run</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;GrantLease&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">b</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">testing</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">B</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> b.N; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            _, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">Grant</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                b.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    b.</span><span class="__shiki_1t8gfj">Run</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;RenewLease&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">b</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">testing</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">B</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        grantResp, _ </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">Grant</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        b.</span><span class="__shiki_1t8gfj">ResetTimer</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> b.N; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            _, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">KeepAliveOnce</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), grantResp.ID)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                b.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    b.</span><span class="__shiki_1t8gfj">Run</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;AttachKeys&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">b</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">testing</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">B</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        grantResp, _ </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">Grant</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        b.</span><span class="__shiki_1t8gfj">ResetTimer</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> b.N; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            key </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/test/key-</span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, i)</span></span>
<span class="line"><span class="__shiki_140thh">            _, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">Put</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), key, </span><span class="__shiki_mdbnqw">&quot;value&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                clientv3.</span><span class="__shiki_1t8gfj">WithLease</span><span class="__shiki_140thh">(grantResp.ID))</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                b.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 压力测试配置</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> LoadTestConfig</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Concurrency    </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    TotalLeases    </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    Operations     </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    TTLRange       [</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">  // [min, max]</span></span>
<span class="line"><span class="__shiki_140thh">    KeyCountRange  [</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">int</span><span class="__shiki_21nrsd">    // 每个租约关联的键数量范围</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> RunLoadTest</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">config</span><span class="__shiki_1t8gfj"> LoadTestConfig</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">LoadTestResult</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    result </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">LoadTestResult</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        StartTime: time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 并发创建租约</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> wg </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">WaitGroup</span></span>
<span class="line"><span class="__shiki_140thh">    leaseChan </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1t8gfj"> clientv3</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">LeaseID</span><span class="__shiki_140thh">, config.TotalLeases)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> config.Concurrency; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        wg.</span><span class="__shiki_1t8gfj">Add</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        go</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">workerID</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            defer</span><span class="__shiki_140thh"> wg.</span><span class="__shiki_1t8gfj">Done</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> j </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; j </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> config.TotalLeases</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">config.Concurrency; j</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 创建租约</span></span>
<span class="line"><span class="__shiki_140thh">                ttl </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> randomInRange</span><span class="__shiki_140thh">(config.TTLRange[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">], config.TTLRange[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">                grantResp, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> etcdClient.</span><span class="__shiki_1t8gfj">Grant</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), ttl)</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                    result.Errors</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_1itgoe">                    continue</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                leaseChan </span><span class="__shiki_1itgoe">&lt;-</span><span class="__shiki_140thh"> grantResp.ID</span></span>
<span class="line"><span class="__shiki_140thh">                result.LeasesCreated</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 关联随机数量的键</span></span>
<span class="line"><span class="__shiki_140thh">                keyCount </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> randomInRangeInt</span><span class="__shiki_140thh">(config.KeyCountRange[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">], </span></span>
<span class="line"><span class="__shiki_140thh">                    config.KeyCountRange[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_1itgoe">                for</span><span class="__shiki_140thh"> k </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; k </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> keyCount; k</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                    key </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/test/lease-</span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">/key-</span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                        grantResp.ID, k)</span></span>
<span class="line"><span class="__shiki_140thh">                    _, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> etcdClient.</span><span class="__shiki_1t8gfj">Put</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), </span></span>
<span class="line"><span class="__shiki_140thh">                        key, </span><span class="__shiki_mdbnqw">&quot;value&quot;</span><span class="__shiki_140thh">, clientv3.</span><span class="__shiki_1t8gfj">WithLease</span><span class="__shiki_140thh">(grantResp.ID))</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                        result.Errors</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_140thh">                    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                        result.KeysAttached</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }(i)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    wg.</span><span class="__shiki_1t8gfj">Wait</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1t8gfj">    close</span><span class="__shiki_140thh">(leaseChan)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    result.EndTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    result.Duration </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> result.EndTime.</span><span class="__shiki_1t8gfj">Sub</span><span class="__shiki_140thh">(result.StartTime)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> result</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>etcd租约机制是一个强大而复杂的分布式时间管理工具，其核心价值在于：</p><ol><li><strong>强一致性</strong>：通过Raft算法保证租约状态的全局一致性</li><li><strong>高效过期</strong>：O(1)复杂度的过期检测机制</li><li><strong>灵活管理</strong>：支持续期、撤销、批量操作</li><li><strong>关联管理</strong>：一个租约可管理多个键的生命周期</li><li><strong>生产就绪</strong>：经过大规模生产环境验证</li></ol><h3 id="关键设计要点" tabindex="-1">关键设计要点： <a class="header-anchor" href="#关键设计要点" aria-label="Permalink to &quot;关键设计要点：&quot;">​</a></h3><ul><li><strong>租约ID生成</strong>：结合时间戳、节点ID和序列号保证全局唯一</li><li><strong>过期检测</strong>：使用最小堆或时间轮实现高效检测</li><li><strong>持久化策略</strong>：结合WAL和BoltDB保证数据可靠性</li><li><strong>恢复机制</strong>：支持故障后的一致性恢复</li><li><strong>监控告警</strong>：全面的指标收集和健康检查</li></ul><h3 id="使用建议" tabindex="-1">使用建议： <a class="header-anchor" href="#使用建议" aria-label="Permalink to &quot;使用建议：&quot;">​</a></h3><ol><li><strong>合理设置TTL</strong>：根据业务需求平衡性能和资源使用</li><li><strong>实现优雅关闭</strong>：应用退出时主动撤销租约</li><li><strong>监控续期失败</strong>：及时发现网络或服务问题</li><li><strong>限制租约数量</strong>：避免资源耗尽</li><li><strong>实现重试逻辑</strong>：处理临时性故障</li></ol><p>etcd租约机制是构建可靠分布式系统的基石，深入理解其原理和最佳实践，对于设计高可用的微服务架构至关重要。</p>`,110)])])}const r=a(p,[["render",h]]);export{g as __pageData,r as default};
