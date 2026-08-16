import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const g=JSON.parse('{"title":"NoSQL数据库-键值存储etcd-Watch机制与事件流：详细完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/nosql/keyvalue/etcd/watch.md","filePath":"data/database/nosql/keyvalue/etcd/watch.md"}'),p={name:"data/database/nosql/keyvalue/etcd/watch.md"};function h(l,s,c,t,e,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="nosql数据库-键值存储etcd-watch机制与事件流-详细完整学习笔记" tabindex="-1">NoSQL数据库-键值存储etcd-Watch机制与事件流：详细完整学习笔记 <a class="header-anchor" href="#nosql数据库-键值存储etcd-watch机制与事件流-详细完整学习笔记" aria-label="Permalink to &quot;NoSQL数据库-键值存储etcd-Watch机制与事件流：详细完整学习笔记&quot;">​</a></h1><h2 id="第一部分-watch机制基础概念" tabindex="-1">第一部分：Watch机制基础概念 <a class="header-anchor" href="#第一部分-watch机制基础概念" aria-label="Permalink to &quot;第一部分：Watch机制基础概念&quot;">​</a></h2><h3 id="_1-1-watch机制的定义与价值" tabindex="-1">1.1 Watch机制的定义与价值 <a class="header-anchor" href="#_1-1-watch机制的定义与价值" aria-label="Permalink to &quot;1.1 Watch机制的定义与价值&quot;">​</a></h3><h4 id="_1-1-1-什么是watch机制" tabindex="-1">1.1.1 什么是Watch机制？ <a class="header-anchor" href="#_1-1-1-什么是watch机制" aria-label="Permalink to &quot;1.1.1 什么是Watch机制？&quot;">​</a></h4><p><strong>Watch机制</strong>是etcd提供的一种实时数据变更通知系统，允许客户端订阅键（或键前缀）的变化，并在变化发生时立即接收通知。</p><p><strong>核心价值</strong>：</p><ul><li><strong>实时性</strong>：毫秒级延迟的数据变更通知</li><li><strong>效率性</strong>：避免轮询，减少网络开销和服务器压力</li><li><strong>一致性</strong>：保证事件顺序与Raft日志顺序一致</li><li><strong>可靠性</strong>：支持断线重连和历史事件重放</li></ul><h4 id="_1-2-2-watch-vs-polling" tabindex="-1">1.2.2 Watch vs Polling <a class="header-anchor" href="#_1-2-2-watch-vs-polling" aria-label="Permalink to &quot;1.2.2 Watch vs Polling&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 传统轮询模式的问题</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> pollingExample</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 1. 网络开销：每次都需要建立连接</span></span>
<span class="line"><span class="__shiki_140thh">        resp, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(ctx, </span><span class="__shiki_mdbnqw">&quot;/config/database&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 2. 延迟高：需要等待轮询间隔</span></span>
<span class="line"><span class="__shiki_140thh">        time.</span><span class="__shiki_1t8gfj">Sleep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> time.Second)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 3. 服务器压力：大量并发查询</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 4. 可能错过变更：轮询间隔内的变化</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Watch模式的优势</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> watchExample</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 一次订阅，持续监听</span></span>
<span class="line"><span class="__shiki_140thh">    watcher </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">Watch</span><span class="__shiki_140thh">(ctx, </span><span class="__shiki_mdbnqw">&quot;/config/database&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> resp </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> watcher {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 实时接收变更事件</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, event </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> resp.Events {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 立即处理变更</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_1-2-watch机制的应用场景" tabindex="-1">1.2 Watch机制的应用场景 <a class="header-anchor" href="#_1-2-watch机制的应用场景" aria-label="Permalink to &quot;1.2 Watch机制的应用场景&quot;">​</a></h3><h4 id="_1-2-1-配置管理" tabindex="-1">1.2.1 配置管理 <a class="header-anchor" href="#_1-2-1-配置管理" aria-label="Permalink to &quot;1.2.1 配置管理&quot;">​</a></h4><ul><li>动态配置更新</li><li>功能开关实时切换</li><li>业务规则动态调整</li></ul><h4 id="_1-2-2-服务发现" tabindex="-1">1.2.2 服务发现 <a class="header-anchor" href="#_1-2-2-服务发现" aria-label="Permalink to &quot;1.2.2 服务发现&quot;">​</a></h4><ul><li>服务实例上下线通知</li><li>负载均衡器后端更新</li><li>健康检查状态同步</li></ul><h4 id="_1-2-3-分布式协调" tabindex="-1">1.2.3 分布式协调 <a class="header-anchor" href="#_1-2-3-分布式协调" aria-label="Permalink to &quot;1.2.3 分布式协调&quot;">​</a></h4><ul><li>分布式锁状态监控</li><li>领导选举结果通知</li><li>任务分配变更感知</li></ul><h4 id="_1-2-4-数据同步" tabindex="-1">1.2.4 数据同步 <a class="header-anchor" href="#_1-2-4-数据同步" aria-label="Permalink to &quot;1.2.4 数据同步&quot;">​</a></h4><ul><li>跨数据中心数据同步</li><li>缓存失效通知</li><li>数据库主从同步触发</li></ul><h2 id="第二部分-watch机制架构设计" tabindex="-1">第二部分：Watch机制架构设计 <a class="header-anchor" href="#第二部分-watch机制架构设计" aria-label="Permalink to &quot;第二部分：Watch机制架构设计&quot;">​</a></h2><h3 id="_2-1-整体系统架构" tabindex="-1">2.1 整体系统架构 <a class="header-anchor" href="#_2-1-整体系统架构" aria-label="Permalink to &quot;2.1 整体系统架构&quot;">​</a></h3><h4 id="_2-1-1-watch系统组件" tabindex="-1">2.1.1 Watch系统组件 <a class="header-anchor" href="#_2-1-1-watch系统组件" aria-label="Permalink to &quot;2.1.1 Watch系统组件&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">客户端应用</span></span>
<span class="line"><span class="__shiki_wvjl67">    |</span></span>
<span class="line"><span class="__shiki_wvjl67">gRPC流式接口 (WatchService)</span></span>
<span class="line"><span class="__shiki_wvjl67">    |</span></span>
<span class="line"><span class="__shiki_wvjl67">Watch服务器 (etcdserver)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── Watchable KV存储层</span></span>
<span class="line"><span class="__shiki_wvjl67">    │   ├── 事件分发器 (EventDispatcher)</span></span>
<span class="line"><span class="__shiki_wvjl67">    │   ├── Watcher管理器 (WatcherManager)</span></span>
<span class="line"><span class="__shiki_wvjl67">    │   ├── 事件缓冲区 (EventBuffer)</span></span>
<span class="line"><span class="__shiki_wvjl67">    │   └── 历史事件存储 (EventHistory)</span></span>
<span class="line"><span class="__shiki_wvjl67">    │</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── Raft共识层</span></span>
<span class="line"><span class="__shiki_wvjl67">    └── 存储后端 (MVCC/BoltDB)</span></span></code></pre></div><h4 id="_2-1-2-数据流向" tabindex="-1">2.1.2 数据流向 <a class="header-anchor" href="#_2-1-2-数据流向" aria-label="Permalink to &quot;2.1.2 数据流向&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">写操作 → Raft日志 → 应用状态机 → MVCC存储 → 生成事件 → Watch分发 → 客户端</span></span></code></pre></div><h3 id="_2-2-核心数据结构" tabindex="-1">2.2 核心数据结构 <a class="header-anchor" href="#_2-2-核心数据结构" aria-label="Permalink to &quot;2.2 核心数据结构&quot;">​</a></h3><h4 id="_2-2-1-watcher定义" tabindex="-1">2.2.1 Watcher定义 <a class="header-anchor" href="#_2-2-1-watcher定义" aria-label="Permalink to &quot;2.2.1 Watcher定义&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// etcd中的Watcher结构（简化版）</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> watcher</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 标识信息</span></span>
<span class="line"><span class="__shiki_140thh">    id           </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">                    // 唯一标识符</span></span>
<span class="line"><span class="__shiki_140thh">    key          []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_21nrsd">                   // 监听的键</span></span>
<span class="line"><span class="__shiki_140thh">    end          []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_21nrsd">                   // 范围结束键（用于前缀监听）</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 过滤条件</span></span>
<span class="line"><span class="__shiki_140thh">    filters      []</span><span class="__shiki_1t8gfj">FilterFunc</span><span class="__shiki_21nrsd">             // 事件过滤器</span></span>
<span class="line"><span class="__shiki_140thh">    createdRev   </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">                    // 创建时的修订版本</span></span>
<span class="line"><span class="__shiki_140thh">    startRev     </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">                    // 开始监听的修订版本</span></span>
<span class="line"><span class="__shiki_140thh">    minRev       </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">                    // 最小监听修订版本</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 事件处理</span></span>
<span class="line"><span class="__shiki_140thh">    ch           </span><span class="__shiki_1itgoe">chan&lt;-</span><span class="__shiki_1t8gfj"> WatchResponse</span><span class="__shiki_21nrsd">     // 事件发送通道</span></span>
<span class="line"><span class="__shiki_140thh">    victim       </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_21nrsd">                     // 是否标记为受害者（缓冲区满）</span></span>
<span class="line"><span class="__shiki_140thh">    compacted    </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_21nrsd">                     // 是否因压缩被取消</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 状态控制</span></span>
<span class="line"><span class="__shiki_140thh">    pending      </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">watchEventBatch</span><span class="__shiki_21nrsd">         // 待处理事件批次</span></span>
<span class="line"><span class="__shiki_140thh">    mu           </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RWMutex</span><span class="__shiki_21nrsd">             // 读写锁</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 性能统计</span></span>
<span class="line"><span class="__shiki_140thh">    eventsReceived </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">                  // 接收的事件数</span></span>
<span class="line"><span class="__shiki_140thh">    lastEventTime  </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span><span class="__shiki_21nrsd">              // 最后事件时间</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 事件过滤器类型</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> FilterFunc</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">e</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">mvccpb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 内置过滤器</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    FilterPut    </span><span class="__shiki_1t8gfj">FilterFunc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">e</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">mvccpb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> { </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh"> e.Type </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> mvccpb.PUT }</span></span>
<span class="line"><span class="__shiki_140thh">    FilterDelete </span><span class="__shiki_1t8gfj">FilterFunc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">e</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">mvccpb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> { </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh"> e.Type </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> mvccpb.DELETE }</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h4 id="_2-2-2-事件结构" tabindex="-1">2.2.2 事件结构 <a class="header-anchor" href="#_2-2-2-事件结构" aria-label="Permalink to &quot;2.2.2 事件结构&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// etcd事件定义</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Event</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Type </span><span class="__shiki_1t8gfj">Event_EventType</span><span class="__shiki_mdbnqw"> \`protobuf:&quot;varint,1,opt,name=type&quot; json:&quot;type&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    Kv   </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">KeyValue</span><span class="__shiki_mdbnqw">       \`protobuf:&quot;bytes,2,opt,name=kv&quot; json:&quot;kv,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    PrevKv </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">KeyValue</span><span class="__shiki_mdbnqw">     \`protobuf:&quot;bytes,3,opt,name=prev_kv,json=prevKv&quot; json:&quot;prev_kv,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 事件类型枚举</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Event_EventType</span><span class="__shiki_1itgoe"> int32</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">    PUT</span><span class="__shiki_1t8gfj">    Event_EventType</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_21nrsd">  // 创建或更新</span></span>
<span class="line"><span class="__shiki_dzsirb">    DELETE</span><span class="__shiki_1t8gfj"> Event_EventType</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_21nrsd">  // 删除</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 键值对结构</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> KeyValue</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Key            []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_mdbnqw"> \`protobuf:&quot;bytes,1,opt,name=key&quot; json:&quot;key,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    Value          []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_mdbnqw"> \`protobuf:&quot;bytes,2,opt,name=value&quot; json:&quot;value,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    CreateRevision </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_mdbnqw">  \`protobuf:&quot;varint,3,opt,name=create_revision&quot; json:&quot;create_revision,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    ModRevision    </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_mdbnqw">  \`protobuf:&quot;varint,4,opt,name=mod_revision&quot; json:&quot;mod_revision,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    Version        </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_mdbnqw">  \`protobuf:&quot;varint,5,opt,name=version&quot; json:&quot;version,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    Lease          </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_mdbnqw">  \`protobuf:&quot;varint,6,opt,name=lease&quot; json:&quot;lease,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-2-3-watch响应结构" tabindex="-1">2.2.3 Watch响应结构 <a class="header-anchor" href="#_2-2-3-watch响应结构" aria-label="Permalink to &quot;2.2.3 Watch响应结构&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> WatchResponse</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Header </span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ResponseHeader</span><span class="__shiki_mdbnqw"> \`json:&quot;header&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    WatchID </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_mdbnqw">            \`json:&quot;watch_id&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    Created </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_mdbnqw">             \`json:&quot;created&quot;\`</span><span class="__shiki_21nrsd">      // 是否是新创建的watcher</span></span>
<span class="line"><span class="__shiki_140thh">    Canceled </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_mdbnqw">            \`json:&quot;canceled&quot;\`</span><span class="__shiki_21nrsd">     // 是否被取消</span></span>
<span class="line"><span class="__shiki_140thh">    CompactRevision </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_mdbnqw">    \`json:&quot;compact_revision&quot;\`</span><span class="__shiki_21nrsd"> // 压缩修订版本</span></span>
<span class="line"><span class="__shiki_140thh">    CancelReason </span><span class="__shiki_1itgoe">string</span><span class="__shiki_mdbnqw">      \`json:&quot;cancel_reason&quot;\`</span><span class="__shiki_21nrsd">    // 取消原因</span></span>
<span class="line"><span class="__shiki_140thh">    Events []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_mdbnqw">          \`json:&quot;events&quot;\`</span><span class="__shiki_21nrsd">       // 事件列表</span></span>
<span class="line"><span class="__shiki_140thh">    Fragment </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_mdbnqw">            \`json:&quot;fragment&quot;\`</span><span class="__shiki_21nrsd">     // 是否是分片响应</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 分片事件的批处理</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> watchEventBatch</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    events []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">watchEvent</span></span>
<span class="line"><span class="__shiki_140thh">    revs   []</span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">    size   </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    mu     </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Mutex</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> watchEvent</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    e </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span></span>
<span class="line"><span class="__shiki_140thh">    rev </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第三部分-watch机制核心实现" tabindex="-1">第三部分：Watch机制核心实现 <a class="header-anchor" href="#第三部分-watch机制核心实现" aria-label="Permalink to &quot;第三部分：Watch机制核心实现&quot;">​</a></h2><h3 id="_3-1-事件生成机制" tabindex="-1">3.1 事件生成机制 <a class="header-anchor" href="#_3-1-事件生成机制" aria-label="Permalink to &quot;3.1 事件生成机制&quot;">​</a></h3><h4 id="_3-1-1-事件生成流程" tabindex="-1">3.1.1 事件生成流程 <a class="header-anchor" href="#_3-1-1-事件生成流程" aria-label="Permalink to &quot;3.1.1 事件生成流程&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// MVCC存储中的事件生成</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">watchableStore</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">notify</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">rev</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">evs</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">mvccpb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    s.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 记录到事件历史</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> s.eventHistory </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        s.eventHistory.</span><span class="__shiki_1t8gfj">addEvent</span><span class="__shiki_140thh">(rev, evs)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 分发到匹配的watcher</span></span>
<span class="line"><span class="__shiki_140thh">    victims </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">watcher</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh">{})</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, ev </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> evs {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 精确匹配的watcher</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> wg </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.watchers[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">(ev.Kv.Key)]; wg </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            victims </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> s.</span><span class="__shiki_1t8gfj">notifyWatchers</span><span class="__shiki_140thh">(wg, ev, rev, victims)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 前缀匹配的watcher</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> s.ranges.</span><span class="__shiki_1t8gfj">Len</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            victims </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> s.</span><span class="__shiki_1t8gfj">notifyRangeWatchers</span><span class="__shiki_140thh">(ev, rev, victims)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 处理缓冲区满的watcher</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(victims) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        s.victims </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(s.victims, victims)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    s.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 通知watcher</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">watchableStore</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">notifyWatchers</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">wg</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">watcherGroup</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">ev</span><span class="__shiki_1t8gfj"> mvccpb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_1jdh33">    rev</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">victims</span><span class="__shiki_1itgoe"> map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">watcher</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh">{}) </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">watcher</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh">{} {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> w </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> wg.watchers {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 应用过滤器</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">w.</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(ev) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            continue</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查起始修订版本</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ev.Kv.ModRevision </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> w.minRev {</span></span>
<span class="line"><span class="__shiki_1itgoe">            continue</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 发送事件</span></span>
<span class="line"><span class="__shiki_140thh">        ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> w.</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">WatchResponse</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            Events: []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">{</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">                Type:   ev.Type,</span></span>
<span class="line"><span class="__shiki_140thh">                Kv:     ev.Kv,</span></span>
<span class="line"><span class="__shiki_140thh">                PrevKv: ev.PrevKv,</span></span>
<span class="line"><span class="__shiki_140thh">            }},</span></span>
<span class="line"><span class="__shiki_140thh">            Header: </span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ResponseHeader</span><span class="__shiki_140thh">{Revision: rev},</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 如果发送失败（缓冲区满），标记为victim</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">ok {</span></span>
<span class="line"><span class="__shiki_140thh">            victims[w] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh">{}{}</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> victims</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-1-2-事件历史管理" tabindex="-1">3.1.2 事件历史管理 <a class="header-anchor" href="#_3-1-2-事件历史管理" aria-label="Permalink to &quot;3.1.2 事件历史管理&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 环形缓冲区实现的事件历史</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> eventHistory</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    buffer    []</span><span class="__shiki_1t8gfj">eventGroup</span><span class="__shiki_21nrsd">      // 环形缓冲区</span></span>
<span class="line"><span class="__shiki_140thh">    capacity  </span><span class="__shiki_1itgoe">int</span><span class="__shiki_21nrsd">               // 容量</span></span>
<span class="line"><span class="__shiki_140thh">    front     </span><span class="__shiki_1itgoe">int</span><span class="__shiki_21nrsd">               // 队首索引</span></span>
<span class="line"><span class="__shiki_140thh">    back      </span><span class="__shiki_1itgoe">int</span><span class="__shiki_21nrsd">               // 队尾索引</span></span>
<span class="line"><span class="__shiki_140thh">    size      </span><span class="__shiki_1itgoe">int</span><span class="__shiki_21nrsd">               // 当前大小</span></span>
<span class="line"><span class="__shiki_140thh">    mu        </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RWMutex</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> eventGroup</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    revision </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">    events   []</span><span class="__shiki_1t8gfj">mvccpb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Event</span></span>
<span class="line"><span class="__shiki_140thh">    size     </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">h </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">eventHistory</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">addEvent</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">rev</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">evs</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">mvccpb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    h.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> h.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 计算事件组大小</span></span>
<span class="line"><span class="__shiki_140thh">    size </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, ev </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> evs {</span></span>
<span class="line"><span class="__shiki_140thh">        size </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> ev.</span><span class="__shiki_1t8gfj">Size</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建新的事件组</span></span>
<span class="line"><span class="__shiki_140thh">    group </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> eventGroup</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        revision: rev,</span></span>
<span class="line"><span class="__shiki_140thh">        events:   evs,</span></span>
<span class="line"><span class="__shiki_140thh">        size:     size,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 添加到环形缓冲区</span></span>
<span class="line"><span class="__shiki_140thh">    h.buffer[h.back] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> group</span></span>
<span class="line"><span class="__shiki_140thh">    h.back </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (h.back </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">%</span><span class="__shiki_140thh"> h.capacity</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> h.size </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> h.capacity {</span></span>
<span class="line"><span class="__shiki_140thh">        h.front </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (h.front </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">%</span><span class="__shiki_140thh"> h.capacity</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        h.size</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 查询历史事件</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">h </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">eventHistory</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">scan</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">rev</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) []</span><span class="__shiki_1t8gfj">mvccpb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    h.mu.</span><span class="__shiki_1t8gfj">RLock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> h.mu.</span><span class="__shiki_1t8gfj">RUnlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> result []</span><span class="__shiki_1t8gfj">mvccpb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Event</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 遍历缓冲区查找&gt;=rev的事件</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> h.size; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        idx </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> (h.front </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> i) </span><span class="__shiki_1itgoe">%</span><span class="__shiki_140thh"> h.capacity</span></span>
<span class="line"><span class="__shiki_140thh">        group </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> h.buffer[idx]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> group.revision </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> rev {</span></span>
<span class="line"><span class="__shiki_140thh">            result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(result, group.events</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> result</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-watcher匹配算法" tabindex="-1">3.2 Watcher匹配算法 <a class="header-anchor" href="#_3-2-watcher匹配算法" aria-label="Permalink to &quot;3.2 Watcher匹配算法&quot;">​</a></h3><h4 id="_3-2-1-精确匹配" tabindex="-1">3.2.1 精确匹配 <a class="header-anchor" href="#_3-2-1-精确匹配" aria-label="Permalink to &quot;3.2.1 精确匹配&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 基于哈希表的精确匹配</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> watcherGroup</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    watchers </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">watcher</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">    mu       </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RWMutex</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> watcherSet</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    keyWatchers </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">watcherGroup</span><span class="__shiki_21nrsd">  // 键-&gt;watcher组映射</span></span>
<span class="line"><span class="__shiki_140thh">    mu          </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RWMutex</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">ws </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">watcherSet</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">addWatcher</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">w</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">watcher</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    ws.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> ws.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    key </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">(w.key)</span></span>
<span class="line"><span class="__shiki_140thh">    wg, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> ws.keyWatchers[key]</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">ok {</span></span>
<span class="line"><span class="__shiki_140thh">        wg </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">watcherGroup</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            watchers: </span><span class="__shiki_1t8gfj">make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">watcher</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh">{}),</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        ws.keyWatchers[key] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> wg</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    wg.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    wg.watchers[w] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh">{}{}</span></span>
<span class="line"><span class="__shiki_140thh">    wg.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">ws </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">watcherSet</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">removeWatcher</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">w</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">watcher</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    ws.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> ws.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    key </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">(w.key)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> wg, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> ws.keyWatchers[key]; ok {</span></span>
<span class="line"><span class="__shiki_140thh">        wg.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1t8gfj">        delete</span><span class="__shiki_140thh">(wg.watchers, w)</span></span>
<span class="line"><span class="__shiki_140thh">        wg.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 如果组为空，删除整个组</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(wg.watchers) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            delete</span><span class="__shiki_140thh">(ws.keyWatchers, key)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-2-2-前缀匹配优化" tabindex="-1">3.2.2 前缀匹配优化 <a class="header-anchor" href="#_3-2-2-前缀匹配优化" aria-label="Permalink to &quot;3.2.2 前缀匹配优化&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 基于区间树的前缀匹配</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> interval</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    begin []</span><span class="__shiki_1itgoe">byte</span></span>
<span class="line"><span class="__shiki_140thh">    end   []</span><span class="__shiki_1itgoe">byte</span></span>
<span class="line"><span class="__shiki_140thh">    value </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">watcher</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> intervalTree</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    root </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">intervalNode</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> intervalNode</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    interval </span><span class="__shiki_1t8gfj">interval</span></span>
<span class="line"><span class="__shiki_140thh">    maxEnd   []</span><span class="__shiki_1itgoe">byte</span></span>
<span class="line"><span class="__shiki_140thh">    left     </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">intervalNode</span></span>
<span class="line"><span class="__shiki_140thh">    right    </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">intervalNode</span></span>
<span class="line"><span class="__shiki_140thh">    height   </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 查找与key匹配的所有watcher</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">intervalTree</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">search</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">) []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">watcher</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> result []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">watcher</span></span>
<span class="line"><span class="__shiki_140thh">    t.</span><span class="__shiki_1t8gfj">searchHelper</span><span class="__shiki_140thh">(t.root, key, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">result)</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> result</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">intervalTree</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">searchHelper</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">node</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">intervalNode</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">result</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">[]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">watcher</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> node </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 如果key小于节点的最小begin，向左子树搜索</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> bytes.</span><span class="__shiki_1t8gfj">Compare</span><span class="__shiki_140thh">(key, node.interval.begin) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        t.</span><span class="__shiki_1t8gfj">searchHelper</span><span class="__shiki_140thh">(node.left, key, result)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查当前节点是否匹配</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> bytes.</span><span class="__shiki_1t8gfj">Compare</span><span class="__shiki_140thh">(key, node.interval.begin) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">       (</span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(node.interval.end) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> bytes.</span><span class="__shiki_1t8gfj">Compare</span><span class="__shiki_140thh">(key, node.interval.end) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        *</span><span class="__shiki_140thh">result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">result, node.interval.value)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 如果key可能落在右子树，继续搜索</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(node.maxEnd) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> bytes.</span><span class="__shiki_1t8gfj">Compare</span><span class="__shiki_140thh">(key, node.maxEnd) </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        t.</span><span class="__shiki_1t8gfj">searchHelper</span><span class="__shiki_140thh">(node.right, key, result)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 添加watcher到区间树</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">intervalTree</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">addWatcher</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">w</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">watcher</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    iv </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> interval</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        begin: w.key,</span></span>
<span class="line"><span class="__shiki_140thh">        end:   w.end,</span></span>
<span class="line"><span class="__shiki_140thh">        value: w,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    t.root </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> t.</span><span class="__shiki_1t8gfj">insert</span><span class="__shiki_140thh">(t.root, iv)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-3-事件分发与流量控制" tabindex="-1">3.3 事件分发与流量控制 <a class="header-anchor" href="#_3-3-事件分发与流量控制" aria-label="Permalink to &quot;3.3 事件分发与流量控制&quot;">​</a></h3><h4 id="_3-3-1-事件分发管道" tabindex="-1">3.3.1 事件分发管道 <a class="header-anchor" href="#_3-3-1-事件分发管道" aria-label="Permalink to &quot;3.3.1 事件分发管道&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 事件分发管道</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> watchPipeline</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    ch          </span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1t8gfj"> watchEventBatch</span></span>
<span class="line"><span class="__shiki_140thh">    maxBatch    </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    maxInterval </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">    stopCh      </span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    watchersMu  </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RWMutex</span></span>
<span class="line"><span class="__shiki_140thh">    watchers    </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">int64</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">watcher</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">p </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">watchPipeline</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">run</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    batch </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">watchEventBatch</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">    timer </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">NewTimer</span><span class="__shiki_140thh">(p.maxInterval)</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> timer.</span><span class="__shiki_1t8gfj">Stop</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">p.stopCh:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> ev </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">p.ch:</span></span>
<span class="line"><span class="__shiki_140thh">            batch.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(ev)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 达到批量大小或超时，发送批次</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> batch.size </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> p.maxBatch {</span></span>
<span class="line"><span class="__shiki_140thh">                p.</span><span class="__shiki_1t8gfj">sendBatch</span><span class="__shiki_140thh">(batch)</span></span>
<span class="line"><span class="__shiki_140thh">                batch </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">watchEventBatch</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">                timer.</span><span class="__shiki_1t8gfj">Reset</span><span class="__shiki_140thh">(p.maxInterval)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">timer.C:</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 超时发送</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> batch.size </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                p.</span><span class="__shiki_1t8gfj">sendBatch</span><span class="__shiki_140thh">(batch)</span></span>
<span class="line"><span class="__shiki_140thh">                batch </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">watchEventBatch</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            timer.</span><span class="__shiki_1t8gfj">Reset</span><span class="__shiki_140thh">(p.maxInterval)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">p </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">watchPipeline</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">sendBatch</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">batch</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">watchEventBatch</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    p.watchersMu.</span><span class="__shiki_1t8gfj">RLock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> p.watchersMu.</span><span class="__shiki_1t8gfj">RUnlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 按watcher分组事件</span></span>
<span class="line"><span class="__shiki_140thh">    eventsByWatcher </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">int64</span><span class="__shiki_140thh">][]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">watchEvent</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, ev </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> batch.events {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 查找匹配的watcher</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, w </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> p.</span><span class="__shiki_1t8gfj">findMatchingWatchers</span><span class="__shiki_140thh">(ev) {</span></span>
<span class="line"><span class="__shiki_140thh">            eventsByWatcher[w.id] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(eventsByWatcher[w.id], ev)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 发送给每个watcher</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> watcherID, events </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> eventsByWatcher {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> w, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> p.watchers[watcherID]; ok {</span></span>
<span class="line"><span class="__shiki_140thh">            w.</span><span class="__shiki_1t8gfj">sendEvents</span><span class="__shiki_140thh">(events)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-3-2-流量控制机制" tabindex="-1">3.3.2 流量控制机制 <a class="header-anchor" href="#_3-3-2-流量控制机制" aria-label="Permalink to &quot;3.3.2 流量控制机制&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 基于令牌桶的流量控制</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> rateLimiter</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    capacity </span><span class="__shiki_1itgoe">int</span><span class="__shiki_21nrsd">           // 桶容量</span></span>
<span class="line"><span class="__shiki_140thh">    tokens   </span><span class="__shiki_1itgoe">int</span><span class="__shiki_21nrsd">           // 当前令牌数</span></span>
<span class="line"><span class="__shiki_140thh">    rate     </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_21nrsd"> // 令牌生成间隔</span></span>
<span class="line"><span class="__shiki_140thh">    lastTime </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span><span class="__shiki_21nrsd">     // 最后更新时间</span></span>
<span class="line"><span class="__shiki_140thh">    mu       </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Mutex</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">rl </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">rateLimiter</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">allow</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    rl.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> rl.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 补充令牌</span></span>
<span class="line"><span class="__shiki_140thh">    now </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    elapsed </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> now.</span><span class="__shiki_1t8gfj">Sub</span><span class="__shiki_140thh">(rl.lastTime)</span></span>
<span class="line"><span class="__shiki_140thh">    tokensToAdd </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">(elapsed </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> rl.rate)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> tokensToAdd </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        rl.tokens </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> min</span><span class="__shiki_140thh">(rl.capacity, rl.tokens </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> tokensToAdd)</span></span>
<span class="line"><span class="__shiki_140thh">        rl.lastTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> now</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查是否有可用令牌</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> rl.tokens </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        rl.tokens</span><span class="__shiki_1itgoe">--</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// watcher级别的流量控制</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> watcherRateLimiter</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    global    </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">rateLimiter</span><span class="__shiki_21nrsd">  // 全局限制</span></span>
<span class="line"><span class="__shiki_140thh">    perClient </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">rateLimiter</span><span class="__shiki_21nrsd">  // 客户端级别限制</span></span>
<span class="line"><span class="__shiki_140thh">    perKey    </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">rateLimiter</span><span class="__shiki_21nrsd">  // 键级别限制</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">wrl </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">watcherRateLimiter</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">allowWatcher</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">w</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">watcher</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">key</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查各级限制</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">wrl.global.</span><span class="__shiki_1t8gfj">allow</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">wrl.perClient.</span><span class="__shiki_1t8gfj">allow</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 键级别限制</span></span>
<span class="line"><span class="__shiki_140thh">    wrl.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    keyLimiter, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> wrl.keyLimiters[key]</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">ok {</span></span>
<span class="line"><span class="__shiki_140thh">        keyLimiter </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">rateLimiter</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            capacity: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            rate:     </span><span class="__shiki_dzsirb">10</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> time.Millisecond,</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        wrl.keyLimiters[key] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> keyLimiter</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    wrl.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> keyLimiter.</span><span class="__shiki_1t8gfj">allow</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第四部分-watch-api详细解析" tabindex="-1">第四部分：Watch API详细解析 <a class="header-anchor" href="#第四部分-watch-api详细解析" aria-label="Permalink to &quot;第四部分：Watch API详细解析&quot;">​</a></h2><h3 id="_4-1-grpc接口定义" tabindex="-1">4.1 gRPC接口定义 <a class="header-anchor" href="#_4-1-grpc接口定义" aria-label="Permalink to &quot;4.1 gRPC接口定义&quot;">​</a></h3><h4 id="_4-1-1-服务定义" tabindex="-1">4.1.1 服务定义 <a class="header-anchor" href="#_4-1-1-服务定义" aria-label="Permalink to &quot;4.1.1 服务定义&quot;">​</a></h4><div class="language-protobuf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">protobuf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// etcd watch API定义</span></span>
<span class="line"><span class="__shiki_1itgoe">service</span><span class="__shiki_1t8gfj"> Watch</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // Watch双向流式RPC</span></span>
<span class="line"><span class="__shiki_1itgoe">  rpc</span><span class="__shiki_1t8gfj"> Watch</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">stream</span><span class="__shiki_1t8gfj"> WatchRequest</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">returns</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">stream</span><span class="__shiki_1t8gfj"> WatchResponse</span><span class="__shiki_140thh">) {}</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> WatchRequest</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  oneof</span><span class="__shiki_140thh"> request_union {</span></span>
<span class="line"><span class="__shiki_1itgoe">    WatchCreateRequest</span><span class="__shiki_140thh"> create_request </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    WatchCancelRequest</span><span class="__shiki_140thh"> cancel_request </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    WatchProgressRequest</span><span class="__shiki_140thh"> progress_request </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> WatchCreateRequest</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  bytes</span><span class="__shiki_140thh"> key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  bytes</span><span class="__shiki_140thh"> range_end </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  int64</span><span class="__shiki_140thh"> start_revision </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  bool</span><span class="__shiki_140thh"> progress_notify </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> FilterType</span><span class="__shiki_140thh"> filters </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  bool</span><span class="__shiki_140thh"> prev_kv </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 6</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  bool</span><span class="__shiki_140thh"> watch_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 7</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  bool</span><span class="__shiki_140thh"> fragment </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 8</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> WatchResponse</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  ResponseHeader</span><span class="__shiki_140thh"> header </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  int64</span><span class="__shiki_140thh"> watch_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  bool</span><span class="__shiki_140thh"> created </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  bool</span><span class="__shiki_140thh"> canceled </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  int64</span><span class="__shiki_140thh"> compact_revision </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> cancel_reason </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 6</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> mvccpb.Event</span><span class="__shiki_140thh"> events </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 11</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  bool</span><span class="__shiki_140thh"> fragment </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 12</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">enum</span><span class="__shiki_1t8gfj"> FilterType</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  NOPUT </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;    </span><span class="__shiki_21nrsd">// 过滤PUT事件</span></span>
<span class="line"><span class="__shiki_140thh">  NODELETE </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 过滤DELETE事件</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_4-1-2-客户端使用示例" tabindex="-1">4.1.2 客户端使用示例 <a class="header-anchor" href="#_4-1-2-客户端使用示例" aria-label="Permalink to &quot;4.1.2 客户端使用示例&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 创建watch客户端</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> createWatchClient</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    conn, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> grpc.</span><span class="__shiki_1t8gfj">Dial</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;localhost:2379&quot;</span><span class="__shiki_140thh">, grpc.</span><span class="__shiki_1t8gfj">WithInsecure</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> conn.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    client </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> pb.</span><span class="__shiki_1t8gfj">NewWatchClient</span><span class="__shiki_140thh">(conn)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建双向流</span></span>
<span class="line"><span class="__shiki_140thh">    stream, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">Watch</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 发送watch请求</span></span>
<span class="line"><span class="__shiki_140thh">    req </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">WatchRequest</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        RequestUnion: </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">WatchRequest_CreateRequest</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            CreateRequest: </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">WatchCreateRequest</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">                Key: []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/my/key&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">                StartRevision: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> stream.</span><span class="__shiki_1t8gfj">Send</span><span class="__shiki_140thh">(req); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 接收响应</span></span>
<span class="line"><span class="__shiki_1itgoe">    go</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            resp, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> stream.</span><span class="__shiki_1t8gfj">Recv</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Watch stream closed: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> _, event </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> resp.Events {</span></span>
<span class="line"><span class="__shiki_140thh">                log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Event: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">, Key: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">, Value: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                    event.Type, event.Kv.Key, event.Kv.Value)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-watch选项详解" tabindex="-1">4.2 Watch选项详解 <a class="header-anchor" href="#_4-2-watch选项详解" aria-label="Permalink to &quot;4.2 Watch选项详解&quot;">​</a></h3><h4 id="_4-2-1-监听模式选项" tabindex="-1">4.2.1 监听模式选项 <a class="header-anchor" href="#_4-2-1-监听模式选项" aria-label="Permalink to &quot;4.2.1 监听模式选项&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 各种监听模式</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> watchOptionsExample</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">client</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">clientv3</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Client</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    ctx </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 精确监听单个键</span></span>
<span class="line"><span class="__shiki_140thh">    watcher1 </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">Watch</span><span class="__shiki_140thh">(ctx, </span><span class="__shiki_mdbnqw">&quot;/key1&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 前缀监听</span></span>
<span class="line"><span class="__shiki_140thh">    watcher2 </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">Watch</span><span class="__shiki_140thh">(ctx, </span><span class="__shiki_mdbnqw">&quot;/keys/&quot;</span><span class="__shiki_140thh">, clientv3.</span><span class="__shiki_1t8gfj">WithPrefix</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 范围监听</span></span>
<span class="line"><span class="__shiki_140thh">    watcher3 </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">Watch</span><span class="__shiki_140thh">(ctx, </span><span class="__shiki_mdbnqw">&quot;/key1&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">        clientv3.</span><span class="__shiki_1t8gfj">WithRange</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/key9&quot;</span><span class="__shiki_140thh">)) </span><span class="__shiki_21nrsd">// 监听[key1, key9)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 从指定修订版本开始监听</span></span>
<span class="line"><span class="__shiki_140thh">    watcher4 </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">Watch</span><span class="__shiki_140thh">(ctx, </span><span class="__shiki_mdbnqw">&quot;/key1&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">        clientv3.</span><span class="__shiki_1t8gfj">WithRev</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 过滤特定事件类型</span></span>
<span class="line"><span class="__shiki_140thh">    watcher5 </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">Watch</span><span class="__shiki_140thh">(ctx, </span><span class="__shiki_mdbnqw">&quot;/key1&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        clientv3.</span><span class="__shiki_1t8gfj">WithFilterPut</span><span class="__shiki_140thh">()) </span><span class="__shiki_21nrsd">// 只监听PUT事件</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 6. 获取变更前的值</span></span>
<span class="line"><span class="__shiki_140thh">    watcher6 </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">Watch</span><span class="__shiki_140thh">(ctx, </span><span class="__shiki_mdbnqw">&quot;/key1&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        clientv3.</span><span class="__shiki_1t8gfj">WithPrevKV</span><span class="__shiki_140thh">()) </span><span class="__shiki_21nrsd">// 事件包含PrevKv字段</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 7. 进度通知</span></span>
<span class="line"><span class="__shiki_140thh">    watcher7 </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">Watch</span><span class="__shiki_140thh">(ctx, </span><span class="__shiki_mdbnqw">&quot;/key1&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        clientv3.</span><span class="__shiki_1t8gfj">WithProgressNotify</span><span class="__shiki_140thh">()) </span><span class="__shiki_21nrsd">// 定期发送空事件</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 8. 分片模式（大事件拆分成多个消息）</span></span>
<span class="line"><span class="__shiki_140thh">    watcher8 </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">Watch</span><span class="__shiki_140thh">(ctx, </span><span class="__shiki_mdbnqw">&quot;/key1&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        clientv3.</span><span class="__shiki_1t8gfj">WithFragment</span><span class="__shiki_140thh">()) </span><span class="__shiki_21nrsd">// 启用分片</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_4-2-2-高级监听配置" tabindex="-1">4.2.2 高级监听配置 <a class="header-anchor" href="#_4-2-2-高级监听配置" aria-label="Permalink to &quot;4.2.2 高级监听配置&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 自定义监听配置</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> WatchConfig</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Key              []</span><span class="__shiki_1itgoe">byte</span></span>
<span class="line"><span class="__shiki_140thh">    RangeEnd         []</span><span class="__shiki_1itgoe">byte</span></span>
<span class="line"><span class="__shiki_140thh">    StartRevision    </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">    ProgressNotify   </span><span class="__shiki_1itgoe">bool</span></span>
<span class="line"><span class="__shiki_140thh">    Fragment         </span><span class="__shiki_1itgoe">bool</span></span>
<span class="line"><span class="__shiki_140thh">    PrevKV           </span><span class="__shiki_1itgoe">bool</span></span>
<span class="line"><span class="__shiki_140thh">    Filters          []</span><span class="__shiki_1t8gfj">FilterType</span></span>
<span class="line"><span class="__shiki_140thh">    WatchID          </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">    CreatedNotify    </span><span class="__shiki_1itgoe">bool</span></span>
<span class="line"><span class="__shiki_140thh">    WatchStream      </span><span class="__shiki_1itgoe">bool</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 创建自定义watcher</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> createCustomWatcher</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">client</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">clientv3</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Client</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">config</span><span class="__shiki_1t8gfj"> WatchConfig</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    opts </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">clientv3</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">OpOption</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> config.RangeEnd </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        opts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(opts, clientv3.</span><span class="__shiki_1t8gfj">WithRange</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">(config.RangeEnd)))</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> config.StartRevision </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        opts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(opts, clientv3.</span><span class="__shiki_1t8gfj">WithRev</span><span class="__shiki_140thh">(config.StartRevision))</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> config.ProgressNotify {</span></span>
<span class="line"><span class="__shiki_140thh">        opts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(opts, clientv3.</span><span class="__shiki_1t8gfj">WithProgressNotify</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> config.PrevKV {</span></span>
<span class="line"><span class="__shiki_140thh">        opts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(opts, clientv3.</span><span class="__shiki_1t8gfj">WithPrevKV</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> config.Fragment {</span></span>
<span class="line"><span class="__shiki_140thh">        opts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(opts, clientv3.</span><span class="__shiki_1t8gfj">WithFragment</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 应用过滤器</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, filter </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> config.Filters {</span></span>
<span class="line"><span class="__shiki_1itgoe">        switch</span><span class="__shiki_140thh"> filter {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> clientv3.FilterPut:</span></span>
<span class="line"><span class="__shiki_140thh">            opts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(opts, clientv3.</span><span class="__shiki_1t8gfj">WithFilterPut</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> clientv3.FilterDelete:</span></span>
<span class="line"><span class="__shiki_140thh">            opts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(opts, clientv3.</span><span class="__shiki_1t8gfj">WithFilterDelete</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    watcher </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">Watch</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), </span></span>
<span class="line"><span class="__shiki_1itgoe">        string</span><span class="__shiki_140thh">(config.Key), opts</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-3-错误处理与重连" tabindex="-1">4.3 错误处理与重连 <a class="header-anchor" href="#_4-3-错误处理与重连" aria-label="Permalink to &quot;4.3 错误处理与重连&quot;">​</a></h3><h4 id="_4-3-1-错误类型" tabindex="-1">4.3.1 错误类型 <a class="header-anchor" href="#_4-3-1-错误类型" aria-label="Permalink to &quot;4.3.1 错误类型&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Watch常见错误类型</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    ErrWatchClosed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> errors.</span><span class="__shiki_1t8gfj">New</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;watch closed&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    ErrWatchCompact </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> errors.</span><span class="__shiki_1t8gfj">New</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;required revision has been compacted&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    ErrWatchCanceled </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> errors.</span><span class="__shiki_1t8gfj">New</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;watch canceled&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    ErrWatchTimeout </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> errors.</span><span class="__shiki_1t8gfj">New</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;watch timeout&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    ErrWatchBufferFull </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> errors.</span><span class="__shiki_1t8gfj">New</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;watch response buffer full&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 错误处理示例</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> handleWatchErrors</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">watcher</span><span class="__shiki_1t8gfj"> clientv3</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">WatchChan</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> resp </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> watcher {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> resp.</span><span class="__shiki_1t8gfj">Err</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            switch</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_140thh"> errors.</span><span class="__shiki_1t8gfj">Is</span><span class="__shiki_140thh">(resp.</span><span class="__shiki_1t8gfj">Err</span><span class="__shiki_140thh">(), rpctypes.ErrCompacted):</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 处理压缩错误：重新从当前修订版本开始监听</span></span>
<span class="line"><span class="__shiki_140thh">                log.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Watch compacted, restarting...&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">                restartWatchFromCurrent</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_140thh"> errors.</span><span class="__shiki_1t8gfj">Is</span><span class="__shiki_140thh">(resp.</span><span class="__shiki_1t8gfj">Err</span><span class="__shiki_140thh">(), rpctypes.ErrFutureRev):</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 请求的修订版本在将来</span></span>
<span class="line"><span class="__shiki_140thh">                log.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Requested revision is in the future&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_140thh"> errors.</span><span class="__shiki_1t8gfj">Is</span><span class="__shiki_140thh">(resp.</span><span class="__shiki_1t8gfj">Err</span><span class="__shiki_140thh">(), io.EOF):</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 连接断开</span></span>
<span class="line"><span class="__shiki_140thh">                log.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Watch stream closed, reconnecting...&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">                reconnectWatch</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">            default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Watch error: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, resp.</span><span class="__shiki_1t8gfj">Err</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_1itgoe">            continue</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 处理正常事件</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, ev </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> resp.Events {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            processEvent</span><span class="__shiki_140thh">(ev)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_4-3-2-自动重连机制" tabindex="-1">4.3.2 自动重连机制 <a class="header-anchor" href="#_4-3-2-自动重连机制" aria-label="Permalink to &quot;4.3.2 自动重连机制&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 带自动重连的Watch管理器</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> ResilientWatcher</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    client      </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">clientv3</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Client</span></span>
<span class="line"><span class="__shiki_140thh">    key         </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    opts        []</span><span class="__shiki_1t8gfj">clientv3</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">OpOption</span></span>
<span class="line"><span class="__shiki_140thh">    watchChan   </span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1t8gfj"> clientv3</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">WatchResponse</span></span>
<span class="line"><span class="__shiki_140thh">    stopCh      </span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">    restartCh   </span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">    mu          </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RWMutex</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">rw </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">ResilientWatcher</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Start</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    go</span><span class="__shiki_140thh"> rw.</span><span class="__shiki_1t8gfj">watchLoop</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">rw </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">ResilientWatcher</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">watchLoop</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_1t8gfj"> close</span><span class="__shiki_140thh">(rw.watchChan)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">rw.stopCh:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 创建新的watch流</span></span>
<span class="line"><span class="__shiki_140thh">            ctx, cancel </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> context.</span><span class="__shiki_1t8gfj">WithCancel</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">            watcher </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> rw.client.</span><span class="__shiki_1t8gfj">Watch</span><span class="__shiki_140thh">(ctx, rw.key, rw.opts</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 处理watch响应</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> rw.</span><span class="__shiki_1t8gfj">handleWatchStream</span><span class="__shiki_140thh">(watcher); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Watch stream error: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1t8gfj">                cancel</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 等待一段时间后重试</span></span>
<span class="line"><span class="__shiki_1itgoe">                select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">rw.stopCh:</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span></span>
<span class="line"><span class="__shiki_1itgoe">                case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">time.</span><span class="__shiki_1t8gfj">After</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> time.Second):</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 继续重试</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">                cancel</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_21nrsd"> // 正常结束</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">rw </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">ResilientWatcher</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">handleWatchStream</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1jdh33">    watcher</span><span class="__shiki_1t8gfj"> clientv3</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">WatchChan</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">rw.stopCh:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> resp, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">watcher:</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">ok {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> errors.</span><span class="__shiki_1t8gfj">New</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;watch channel closed&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> resp.</span><span class="__shiki_1t8gfj">Err</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> resp.</span><span class="__shiki_1t8gfj">Err</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 发送事件到输出通道</span></span>
<span class="line"><span class="__shiki_1itgoe">            select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_140thh"> rw.watchChan </span><span class="__shiki_1itgoe">&lt;-</span><span class="__shiki_140thh"> resp:</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 成功发送</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">rw.stopCh:</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_1itgoe">            default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 输出通道满，等待或丢弃</span></span>
<span class="line"><span class="__shiki_140thh">                log.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Watch output channel full&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第五部分-事件流处理与优化" tabindex="-1">第五部分：事件流处理与优化 <a class="header-anchor" href="#第五部分-事件流处理与优化" aria-label="Permalink to &quot;第五部分：事件流处理与优化&quot;">​</a></h2><h3 id="_5-1-事件流处理模式" tabindex="-1">5.1 事件流处理模式 <a class="header-anchor" href="#_5-1-事件流处理模式" aria-label="Permalink to &quot;5.1 事件流处理模式&quot;">​</a></h3><h4 id="_5-1-1-批处理模式" tabindex="-1">5.1.1 批处理模式 <a class="header-anchor" href="#_5-1-1-批处理模式" aria-label="Permalink to &quot;5.1.1 批处理模式&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 事件批处理处理器</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> EventBatchProcessor</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    batchSize    </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    batchTimeout </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">    eventCh      </span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">Event</span></span>
<span class="line"><span class="__shiki_140thh">    batchCh      </span><span class="__shiki_1itgoe">chan</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span></span>
<span class="line"><span class="__shiki_140thh">    processor    </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">ebp </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">EventBatchProcessor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Start</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    go</span><span class="__shiki_140thh"> ebp.</span><span class="__shiki_1t8gfj">processLoop</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">ebp </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">EventBatchProcessor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">processLoop</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    batch </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, ebp.batchSize)</span></span>
<span class="line"><span class="__shiki_140thh">    timer </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">NewTimer</span><span class="__shiki_140thh">(ebp.batchTimeout)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> event </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">ebp.eventCh:</span></span>
<span class="line"><span class="__shiki_140thh">            batch </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(batch, event)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 达到批量大小</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(batch) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> ebp.batchSize {</span></span>
<span class="line"><span class="__shiki_140thh">                ebp.</span><span class="__shiki_1t8gfj">processBatch</span><span class="__shiki_140thh">(batch)</span></span>
<span class="line"><span class="__shiki_140thh">                batch </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, ebp.batchSize)</span></span>
<span class="line"><span class="__shiki_140thh">                timer.</span><span class="__shiki_1t8gfj">Reset</span><span class="__shiki_140thh">(ebp.batchTimeout)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">timer.C:</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 超时处理</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(batch) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                ebp.</span><span class="__shiki_1t8gfj">processBatch</span><span class="__shiki_140thh">(batch)</span></span>
<span class="line"><span class="__shiki_140thh">                batch </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, ebp.batchSize)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            timer.</span><span class="__shiki_1t8gfj">Reset</span><span class="__shiki_140thh">(ebp.batchTimeout)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">ebp </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">EventBatchProcessor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">processBatch</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">batch</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 按key分组处理</span></span>
<span class="line"><span class="__shiki_140thh">    eventsByKey </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">][]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, event </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> batch {</span></span>
<span class="line"><span class="__shiki_140thh">        key </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">(event.Kv.Key)</span></span>
<span class="line"><span class="__shiki_140thh">        eventsByKey[key] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(eventsByKey[key], event)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 并行处理不同key的事件</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> wg </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">WaitGroup</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> key, events </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> eventsByKey {</span></span>
<span class="line"><span class="__shiki_140thh">        wg.</span><span class="__shiki_1t8gfj">Add</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        go</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">k</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">evs</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            defer</span><span class="__shiki_140thh"> wg.</span><span class="__shiki_1t8gfj">Done</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> ebp.</span><span class="__shiki_1t8gfj">processor</span><span class="__shiki_140thh">(evs); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Failed to process events for key </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, k, err)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }(key, events)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    wg.</span><span class="__shiki_1t8gfj">Wait</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_5-1-2-事件去重与排序" tabindex="-1">5.1.2 事件去重与排序 <a class="header-anchor" href="#_5-1-2-事件去重与排序" aria-label="Permalink to &quot;5.1.2 事件去重与排序&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 事件去重器（基于修订版本）</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> EventDeduplicator</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    latestRevisions </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd"> // key -&gt; 最新修订版本</span></span>
<span class="line"><span class="__shiki_140thh">    mu              </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RWMutex</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">ed </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">EventDeduplicator</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Deduplicate</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">events</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">) []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    ed.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> ed.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> uniqueEvents []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, event </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> events {</span></span>
<span class="line"><span class="__shiki_140thh">        key </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">(event.Kv.Key)</span></span>
<span class="line"><span class="__shiki_140thh">        currentRev </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> event.Kv.ModRevision</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查是否为重复事件</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> lastRev, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> ed.latestRevisions[key]; ok </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> currentRev </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_140thh"> lastRev {</span></span>
<span class="line"><span class="__shiki_1itgoe">            continue</span><span class="__shiki_21nrsd"> // 跳过重复事件</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 更新最新修订版本</span></span>
<span class="line"><span class="__shiki_140thh">        ed.latestRevisions[key] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> currentRev</span></span>
<span class="line"><span class="__shiki_140thh">        uniqueEvents </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(uniqueEvents, event)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 按修订版本排序</span></span>
<span class="line"><span class="__shiki_140thh">    sort.</span><span class="__shiki_1t8gfj">Slice</span><span class="__shiki_140thh">(uniqueEvents, </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">i</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">j</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> uniqueEvents[i].Kv.ModRevision </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> uniqueEvents[j].Kv.ModRevision</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> uniqueEvents</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 滑动窗口去重</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> SlidingWindowDeduplicator</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    windowSize   </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">    recentEvents </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span><span class="__shiki_21nrsd"> // key -&gt; 最后出现时间</span></span>
<span class="line"><span class="__shiki_140thh">    mu           </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RWMutex</span></span>
<span class="line"><span class="__shiki_140thh">    cleanupTicker </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Ticker</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">swd </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">SlidingWindowDeduplicator</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Deduplicate</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    swd.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> swd.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    key </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">(event.Kv.Key)</span></span>
<span class="line"><span class="__shiki_140thh">    now </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查是否在窗口期内出现过</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> lastSeen, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> swd.recentEvents[key]; ok {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> now.</span><span class="__shiki_1t8gfj">Sub</span><span class="__shiki_140thh">(lastSeen) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> swd.windowSize {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_21nrsd"> // 重复事件</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 更新最后出现时间</span></span>
<span class="line"><span class="__shiki_140thh">    swd.recentEvents[key] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> now</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_21nrsd"> // 新事件</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-性能优化策略" tabindex="-1">5.2 性能优化策略 <a class="header-anchor" href="#_5-2-性能优化策略" aria-label="Permalink to &quot;5.2 性能优化策略&quot;">​</a></h3><h4 id="_5-2-1-事件压缩" tabindex="-1">5.2.1 事件压缩 <a class="header-anchor" href="#_5-2-1-事件压缩" aria-label="Permalink to &quot;5.2.1 事件压缩&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 事件压缩：合并多个事件</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> EventCompressor</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    compressionWindow </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">ec </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">EventCompressor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Compress</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">events</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">) []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(events) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> events</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 按key分组</span></span>
<span class="line"><span class="__shiki_140thh">    eventsByKey </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">][]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, event </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> events {</span></span>
<span class="line"><span class="__shiki_140thh">        key </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">(event.Kv.Key)</span></span>
<span class="line"><span class="__shiki_140thh">        eventsByKey[key] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(eventsByKey[key], event)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> compressed []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 对每个key的事件进行压缩</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> key, keyEvents </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> eventsByKey {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(keyEvents) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            compressed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(compressed, keyEvents[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_1itgoe">            continue</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 排序事件</span></span>
<span class="line"><span class="__shiki_140thh">        sort.</span><span class="__shiki_1t8gfj">Slice</span><span class="__shiki_140thh">(keyEvents, </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">i</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">j</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> keyEvents[i].Kv.ModRevision </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> keyEvents[j].Kv.ModRevision</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 压缩策略：只保留第一个和最后一个事件</span></span>
<span class="line"><span class="__shiki_140thh">        firstEvent </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> keyEvents[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        lastEvent </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> keyEvents[</span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(keyEvents)</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 如果第一个和最后一个事件类型相同，可以进一步压缩</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> firstEvent.Type </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> lastEvent.Type {</span></span>
<span class="line"><span class="__shiki_140thh">            compressedEvent </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">                Type: lastEvent.Type,</span></span>
<span class="line"><span class="__shiki_140thh">                Kv:   lastEvent.Kv,</span></span>
<span class="line"><span class="__shiki_140thh">                PrevKv: firstEvent.PrevKv,</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            compressed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(compressed, compressedEvent)</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 类型不同，保留两个事件</span></span>
<span class="line"><span class="__shiki_140thh">            compressed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(compressed, firstEvent, lastEvent)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> compressed</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_5-2-2-事件优先级队列" tabindex="-1">5.2.2 事件优先级队列 <a class="header-anchor" href="#_5-2-2-事件优先级队列" aria-label="Permalink to &quot;5.2.2 事件优先级队列&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 优先级事件队列</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> PriorityEvent</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Event    </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span></span>
<span class="line"><span class="__shiki_140thh">    Priority </span><span class="__shiki_1itgoe">int</span><span class="__shiki_21nrsd"> // 优先级，值越小优先级越高</span></span>
<span class="line"><span class="__shiki_140thh">    Sequence </span><span class="__shiki_1itgoe">int</span><span class="__shiki_21nrsd"> // 序列号，用于稳定排序</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> PriorityEventQueue</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    events []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">PriorityEvent</span></span>
<span class="line"><span class="__shiki_140thh">    mu     </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Mutex</span></span>
<span class="line"><span class="__shiki_140thh">    cond   </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Cond</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> NewPriorityEventQueue</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">PriorityEventQueue</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    pq </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">PriorityEventQueue</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">    pq.cond </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sync.</span><span class="__shiki_1t8gfj">NewCond</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">pq.mu)</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> pq</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">pq </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">PriorityEventQueue</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Push</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">priority</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    pq.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> pq.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    pe </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">PriorityEvent</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        Event:    event,</span></span>
<span class="line"><span class="__shiki_140thh">        Priority: priority,</span></span>
<span class="line"><span class="__shiki_140thh">        Sequence: </span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(pq.events),</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    pq.events </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(pq.events, pe)</span></span>
<span class="line"><span class="__shiki_140thh">    pq.</span><span class="__shiki_1t8gfj">heapifyUp</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(pq.events) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 通知等待的消费者</span></span>
<span class="line"><span class="__shiki_140thh">    pq.cond.</span><span class="__shiki_1t8gfj">Signal</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">pq </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">PriorityEventQueue</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Pop</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    pq.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> pq.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 等待队列非空</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(pq.events) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        pq.cond.</span><span class="__shiki_1t8gfj">Wait</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 取出最高优先级元素</span></span>
<span class="line"><span class="__shiki_140thh">    event </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> pq.events[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    last </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(pq.events) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">    pq.events[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pq.events[last]</span></span>
<span class="line"><span class="__shiki_140thh">    pq.events </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pq.events[:last]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(pq.events) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        pq.</span><span class="__shiki_1t8gfj">heapifyDown</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> event.Event</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">pq </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">PriorityEventQueue</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">heapifyUp</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">index</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> index </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        parent </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> (index </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 2</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> pq.</span><span class="__shiki_1t8gfj">less</span><span class="__shiki_140thh">(index, parent) {</span></span>
<span class="line"><span class="__shiki_140thh">            pq.events[index], pq.events[parent] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pq.events[parent], pq.events[index]</span></span>
<span class="line"><span class="__shiki_140thh">            index </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> parent</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            break</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">pq </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">PriorityEventQueue</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">less</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">i</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">j</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> pq.events[i].Priority </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> pq.events[j].Priority {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> pq.events[i].Priority </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> pq.events[j].Priority</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> pq.events[i].Sequence </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> pq.events[j].Sequence</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-3-监控与诊断" tabindex="-1">5.3 监控与诊断 <a class="header-anchor" href="#_5-3-监控与诊断" aria-label="Permalink to &quot;5.3 监控与诊断&quot;">​</a></h3><h4 id="_5-3-1-watch监控指标" tabindex="-1">5.3.1 Watch监控指标 <a class="header-anchor" href="#_5-3-1-watch监控指标" aria-label="Permalink to &quot;5.3.1 Watch监控指标&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Watch监控指标</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> WatchMetrics</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 计数器</span></span>
<span class="line"><span class="__shiki_140thh">    WatchersCreated    </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Counter</span></span>
<span class="line"><span class="__shiki_140thh">    WatchersCanceled   </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Counter</span></span>
<span class="line"><span class="__shiki_140thh">    EventsSent         </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Counter</span></span>
<span class="line"><span class="__shiki_140thh">    EventsDropped      </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Counter</span></span>
<span class="line"><span class="__shiki_140thh">    BytesSent          </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Counter</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 仪表盘</span></span>
<span class="line"><span class="__shiki_140thh">    ActiveWatchers     </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Gauge</span></span>
<span class="line"><span class="__shiki_140thh">    PendingEvents      </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Gauge</span></span>
<span class="line"><span class="__shiki_140thh">    EventQueueSize     </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Gauge</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 直方图</span></span>
<span class="line"><span class="__shiki_140thh">    EventProcessingTime </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Histogram</span></span>
<span class="line"><span class="__shiki_140thh">    EventDeliveryLatency </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Histogram</span></span>
<span class="line"><span class="__shiki_140thh">    WatchDuration      </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Histogram</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 摘要</span></span>
<span class="line"><span class="__shiki_140thh">    EventsPerWatcher   </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Summary</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 收集watch指标</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> collectWatchMetrics</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">watcher</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">watcher</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">events</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    metrics.EventsSent.</span><span class="__shiki_1t8gfj">Add</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">float64</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(events)))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, event </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> events {</span></span>
<span class="line"><span class="__shiki_140thh">        metrics.BytesSent.</span><span class="__shiki_1t8gfj">Add</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">float64</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(event.Kv.Key) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(event.Kv.Value)))</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 记录处理时间</span></span>
<span class="line"><span class="__shiki_140thh">    start </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1t8gfj">    processEvents</span><span class="__shiki_140thh">(events)</span></span>
<span class="line"><span class="__shiki_140thh">    metrics.EventProcessingTime.</span><span class="__shiki_1t8gfj">Observe</span><span class="__shiki_140thh">(time.</span><span class="__shiki_1t8gfj">Since</span><span class="__shiki_140thh">(start).</span><span class="__shiki_1t8gfj">Seconds</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 记录每个watcher的事件数</span></span>
<span class="line"><span class="__shiki_140thh">    metrics.EventsPerWatcher.</span><span class="__shiki_1t8gfj">Observe</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">float64</span><span class="__shiki_140thh">(watcher.eventsReceived))</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_5-3-2-watch诊断工具" tabindex="-1">5.3.2 Watch诊断工具 <a class="header-anchor" href="#_5-3-2-watch诊断工具" aria-label="Permalink to &quot;5.3.2 Watch诊断工具&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Watch诊断信息</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> WatchDiagnostics</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    WatcherCount     </span><span class="__shiki_1itgoe">int</span><span class="__shiki_mdbnqw">            \`json:&quot;watcher_count&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    EventQueueSize   </span><span class="__shiki_1itgoe">int</span><span class="__shiki_mdbnqw">            \`json:&quot;event_queue_size&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    MemoryUsage      </span><span class="__shiki_1itgoe">string</span><span class="__shiki_mdbnqw">         \`json:&quot;memory_usage&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    ActiveStreams    </span><span class="__shiki_1itgoe">int</span><span class="__shiki_mdbnqw">            \`json:&quot;active_streams&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    EventsPerSecond  </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_mdbnqw">        \`json:&quot;events_per_second&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    AverageLatency   </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_mdbnqw">  \`json:&quot;average_latency&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    ErrorRate        </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_mdbnqw">        \`json:&quot;error_rate&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 按key的统计</span></span>
<span class="line"><span class="__shiki_140thh">    TopWatchedKeys   []</span><span class="__shiki_1t8gfj">KeyStats</span><span class="__shiki_mdbnqw">     \`json:&quot;top_watched_keys&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 性能瓶颈</span></span>
<span class="line"><span class="__shiki_140thh">    Bottlenecks      []</span><span class="__shiki_1t8gfj">Bottleneck</span><span class="__shiki_mdbnqw">   \`json:&quot;bottlenecks&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> KeyStats</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Key           </span><span class="__shiki_1itgoe">string</span><span class="__shiki_mdbnqw">  \`json:&quot;key&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    WatcherCount  </span><span class="__shiki_1itgoe">int</span><span class="__shiki_mdbnqw">     \`json:&quot;watcher_count&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    EventCount    </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_mdbnqw">   \`json:&quot;event_count&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Bottleneck</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Type        </span><span class="__shiki_1itgoe">string</span><span class="__shiki_mdbnqw">  \`json:&quot;type&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    Description </span><span class="__shiki_1itgoe">string</span><span class="__shiki_mdbnqw">  \`json:&quot;description&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    Severity    </span><span class="__shiki_1itgoe">string</span><span class="__shiki_mdbnqw">  \`json:&quot;severity&quot;\`</span><span class="__shiki_21nrsd"> // low, medium, high</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 诊断watch系统</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> DiagnoseWatchSystem</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">store</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">watchableStore</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WatchDiagnostics</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    diag </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">WatchDiagnostics</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 收集基本信息</span></span>
<span class="line"><span class="__shiki_140thh">    diag.WatcherCount </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> store.</span><span class="__shiki_1t8gfj">totalWatchers</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    diag.EventQueueSize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> store.</span><span class="__shiki_1t8gfj">pendingEventCount</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    diag.ActiveStreams </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> store.</span><span class="__shiki_1t8gfj">activeStreamCount</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 计算事件速率</span></span>
<span class="line"><span class="__shiki_140thh">    events, duration </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> store.</span><span class="__shiki_1t8gfj">getRecentEventStats</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> duration </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        diag.EventsPerSecond </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> float64</span><span class="__shiki_140thh">(events) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> duration.</span><span class="__shiki_1t8gfj">Seconds</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 识别性能瓶颈</span></span>
<span class="line"><span class="__shiki_140thh">    diag.Bottlenecks </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> identifyBottlenecks</span><span class="__shiki_140thh">(store)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取最常被监听的key</span></span>
<span class="line"><span class="__shiki_140thh">    diag.TopWatchedKeys </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> store.</span><span class="__shiki_1t8gfj">getTopWatchedKeys</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> diag</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 监控watch内存使用</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> monitorWatchMemory</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> memStats </span><span class="__shiki_1t8gfj">runtime</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">MemStats</span></span>
<span class="line"><span class="__shiki_140thh">    runtime.</span><span class="__shiki_1t8gfj">ReadMemStats</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">memStats)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 计算watch相关内存使用</span></span>
<span class="line"><span class="__shiki_140thh">    watchMemory </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> memStats.HeapInuse </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> baselineMemory</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> watchMemory </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> memoryThreshold {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 触发内存清理</span></span>
<span class="line"><span class="__shiki_1t8gfj">        cleanupStaleWatchers</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 告警</span></span>
<span class="line"><span class="__shiki_1t8gfj">        sendMemoryAlert</span><span class="__shiki_140thh">(watchMemory)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第六部分-高级特性与优化" tabindex="-1">第六部分：高级特性与优化 <a class="header-anchor" href="#第六部分-高级特性与优化" aria-label="Permalink to &quot;第六部分：高级特性与优化&quot;">​</a></h2><h3 id="_6-1-watch代理与聚合" tabindex="-1">6.1 Watch代理与聚合 <a class="header-anchor" href="#_6-1-watch代理与聚合" aria-label="Permalink to &quot;6.1 Watch代理与聚合&quot;">​</a></h3><h4 id="_6-1-1-watch代理服务" tabindex="-1">6.1.1 Watch代理服务 <a class="header-anchor" href="#_6-1-1-watch代理服务" aria-label="Permalink to &quot;6.1.1 Watch代理服务&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Watch代理：聚合多个客户端的watch请求</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> WatchProxy</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    upstream    </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">clientv3</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Client</span><span class="__shiki_21nrsd">  // 上游etcd集群</span></span>
<span class="line"><span class="__shiki_140thh">    cache       </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WatchCache</span><span class="__shiki_21nrsd">       // 本地缓存</span></span>
<span class="line"><span class="__shiki_140thh">    aggregator  </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WatchAggregator</span><span class="__shiki_21nrsd">  // 请求聚合器</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 客户端连接</span></span>
<span class="line"><span class="__shiki_140thh">    clients     </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WatchClient</span></span>
<span class="line"><span class="__shiki_140thh">    mu          </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RWMutex</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">wp </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WatchProxy</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Serve</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 监听客户端连接</span></span>
<span class="line"><span class="__shiki_140thh">    ln, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> net.</span><span class="__shiki_1t8gfj">Listen</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;tcp&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;:23790&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        conn, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> ln.</span><span class="__shiki_1t8gfj">Accept</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Accept error: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">            continue</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        go</span><span class="__shiki_140thh"> wp.</span><span class="__shiki_1t8gfj">handleClient</span><span class="__shiki_140thh">(conn)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">wp </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WatchProxy</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">handleClient</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">conn</span><span class="__shiki_1t8gfj"> net</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Conn</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    client </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> NewWatchClient</span><span class="__shiki_140thh">(conn)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    wp.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    wp.clients[client.</span><span class="__shiki_1t8gfj">ID</span><span class="__shiki_140thh">()] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> client</span></span>
<span class="line"><span class="__shiki_140thh">    wp.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        wp.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1t8gfj">        delete</span><span class="__shiki_140thh">(wp.clients, client.</span><span class="__shiki_1t8gfj">ID</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">        wp.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        conn.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 处理客户端请求</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        req, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">ReceiveRequest</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            break</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 聚合相似的watch请求</span></span>
<span class="line"><span class="__shiki_140thh">        aggregated </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> wp.aggregator.</span><span class="__shiki_1t8gfj">Aggregate</span><span class="__shiki_140thh">(req)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 从缓存获取或向上游查询</span></span>
<span class="line"><span class="__shiki_140thh">        resp </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> wp.</span><span class="__shiki_1t8gfj">getOrFetch</span><span class="__shiki_140thh">(aggregated)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 发送响应给客户端</span></span>
<span class="line"><span class="__shiki_140thh">        client.</span><span class="__shiki_1t8gfj">SendResponse</span><span class="__shiki_140thh">(resp)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Watch缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> WatchCache</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    cache      </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">lru</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Cache</span></span>
<span class="line"><span class="__shiki_140thh">    ttl        </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">    mu         </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RWMutex</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">wc </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WatchCache</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">rev</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) ([]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    wc.mu.</span><span class="__shiki_1t8gfj">RLock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> wc.mu.</span><span class="__shiki_1t8gfj">RUnlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    cacheKey </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">-</span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, key, rev)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> val, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> wc.cache.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(cacheKey); ok {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> events, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> val.([]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">); ok {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> events, </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">wc </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WatchCache</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Put</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">rev</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">events</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    wc.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> wc.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    cacheKey </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">-</span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, key, rev)</span></span>
<span class="line"><span class="__shiki_140thh">    wc.cache.</span><span class="__shiki_1t8gfj">Add</span><span class="__shiki_140thh">(cacheKey, events)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_6-1-2-请求聚合器" tabindex="-1">6.1.2 请求聚合器 <a class="header-anchor" href="#_6-1-2-请求聚合器" aria-label="Permalink to &quot;6.1.2 请求聚合器&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Watch请求聚合器</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> WatchAggregator</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    watches    </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">AggregatedWatch</span></span>
<span class="line"><span class="__shiki_140thh">    mu         </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RWMutex</span></span>
<span class="line"><span class="__shiki_140thh">    mergeWindow </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> AggregatedWatch</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    key         []</span><span class="__shiki_1itgoe">byte</span></span>
<span class="line"><span class="__shiki_140thh">    startRev    </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">    clients     </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WatchClient</span></span>
<span class="line"><span class="__shiki_140thh">    filters     </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">FilterType</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">bool</span></span>
<span class="line"><span class="__shiki_140thh">    lastEvent   </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span></span>
<span class="line"><span class="__shiki_140thh">    eventCh     </span><span class="__shiki_1itgoe">chan</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">wa </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WatchAggregator</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Aggregate</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">req</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">WatchRequest</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">AggregatedWatch</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    wa.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> wa.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    key </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">(req.Key)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 查找现有的聚合watch</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> aw, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> wa.watches[key]; ok {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查是否可以合并</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> wa.</span><span class="__shiki_1t8gfj">canMerge</span><span class="__shiki_140thh">(aw, req) {</span></span>
<span class="line"><span class="__shiki_140thh">            aw.clients[req.ClientID] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> req.Client</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> aw</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建新的聚合watch</span></span>
<span class="line"><span class="__shiki_140thh">    aw </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">AggregatedWatch</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        key:     req.Key,</span></span>
<span class="line"><span class="__shiki_140thh">        startRev: req.StartRevision,</span></span>
<span class="line"><span class="__shiki_140thh">        clients: </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WatchClient</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            req.ClientID: req.Client,</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        filters:   </span><span class="__shiki_1t8gfj">make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">FilterType</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        eventCh:   </span><span class="__shiki_1t8gfj">make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">chan</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 复制过滤器</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, filter </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> req.Filters {</span></span>
<span class="line"><span class="__shiki_140thh">        aw.filters[filter] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    wa.watches[key] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> aw</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 启动事件分发协程</span></span>
<span class="line"><span class="__shiki_1itgoe">    go</span><span class="__shiki_140thh"> wa.</span><span class="__shiki_1t8gfj">dispatchEvents</span><span class="__shiki_140thh">(aw)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> aw</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">wa </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WatchAggregator</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">dispatchEvents</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">aw</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">AggregatedWatch</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> events </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> aw.eventCh {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 应用过滤器</span></span>
<span class="line"><span class="__shiki_140thh">        filtered </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> wa.</span><span class="__shiki_1t8gfj">filterEvents</span><span class="__shiki_140thh">(events, aw.filters)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 分发给所有客户端</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, client </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> aw.clients {</span></span>
<span class="line"><span class="__shiki_1itgoe">            select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_140thh"> client.EventCh </span><span class="__shiki_1itgoe">&lt;-</span><span class="__shiki_140thh"> filtered:</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 成功发送</span></span>
<span class="line"><span class="__shiki_1itgoe">            default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 客户端处理不过来，记录日志</span></span>
<span class="line"><span class="__shiki_140thh">                log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Client </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw"> event channel full&quot;</span><span class="__shiki_140thh">, client.ID)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-大规模部署优化" tabindex="-1">6.2 大规模部署优化 <a class="header-anchor" href="#_6-2-大规模部署优化" aria-label="Permalink to &quot;6.2 大规模部署优化&quot;">​</a></h3><h4 id="_6-2-1-watch分片" tabindex="-1">6.2.1 Watch分片 <a class="header-anchor" href="#_6-2-1-watch分片" aria-label="Permalink to &quot;6.2.1 Watch分片&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 基于key的watch分片</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> WatchShard</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    id        </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    watchers  </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">watcherSet</span></span>
<span class="line"><span class="__shiki_140thh">    eventCh   </span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1t8gfj"> watchEvent</span></span>
<span class="line"><span class="__shiki_140thh">    stopCh    </span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> WatchSharder</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    shards     []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WatchShard</span></span>
<span class="line"><span class="__shiki_140thh">    shardCount </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 分片函数</span></span>
<span class="line"><span class="__shiki_140thh">    shardFunc  </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> NewWatchSharder</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">shardCount</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WatchSharder</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    shards </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WatchShard</span><span class="__shiki_140thh">, shardCount)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> shardCount; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        shards[i] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">WatchShard</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            id:       i,</span></span>
<span class="line"><span class="__shiki_140thh">            watchers: </span><span class="__shiki_1t8gfj">newWatcherSet</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            eventCh:  </span><span class="__shiki_1t8gfj">make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1t8gfj"> watchEvent</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            stopCh:   </span><span class="__shiki_1t8gfj">make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh">{}),</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 启动分片处理协程</span></span>
<span class="line"><span class="__shiki_1itgoe">        go</span><span class="__shiki_140thh"> shards[i].</span><span class="__shiki_1t8gfj">run</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">WatchSharder</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        shards:     shards,</span></span>
<span class="line"><span class="__shiki_140thh">        shardCount: shardCount,</span></span>
<span class="line"><span class="__shiki_140thh">        shardFunc:  defaultShardFunc,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 默认分片函数：基于key的哈希</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> defaultShardFunc</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    h </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> fnv.</span><span class="__shiki_1t8gfj">New32a</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    h.</span><span class="__shiki_1t8gfj">Write</span><span class="__shiki_140thh">(key)</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">(h.</span><span class="__shiki_1t8gfj">Sum32</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">%</span><span class="__shiki_1itgoe"> uint32</span><span class="__shiki_140thh">(shardCount))</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">ws </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WatchSharder</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">AddWatcher</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">w</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">watcher</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    shardID </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> ws.</span><span class="__shiki_1t8gfj">shardFunc</span><span class="__shiki_140thh">(w.key)</span></span>
<span class="line"><span class="__shiki_140thh">    ws.shards[shardID].watchers.</span><span class="__shiki_1t8gfj">addWatcher</span><span class="__shiki_140thh">(w)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">ws </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WatchSharder</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">NotifyEvent</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ev</span><span class="__shiki_1t8gfj"> mvccpb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">rev</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    shardID </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> ws.</span><span class="__shiki_1t8gfj">shardFunc</span><span class="__shiki_140thh">(ev.Kv.Key)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> ws.shards[shardID].eventCh </span><span class="__shiki_1itgoe">&lt;-</span><span class="__shiki_140thh"> watchEvent{ev: ev, rev: rev}:</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 成功发送到分片</span></span>
<span class="line"><span class="__shiki_1itgoe">    default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 分片事件通道满，记录日志</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Shard </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw"> event channel full&quot;</span><span class="__shiki_140thh">, shardID)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WatchShard</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">run</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">s.stopCh:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> we </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">s.eventCh:</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 在分片内部分发事件</span></span>
<span class="line"><span class="__shiki_140thh">            s.watchers.</span><span class="__shiki_1t8gfj">notify</span><span class="__shiki_140thh">(we.ev, we.rev)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_6-2-2-地理分布式watch" tabindex="-1">6.2.2 地理分布式Watch <a class="header-anchor" href="#_6-2-2-地理分布式watch" aria-label="Permalink to &quot;6.2.2 地理分布式Watch&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 跨数据中心的watch代理</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> GeoWatchProxy</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    localDC     </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    remoteDCs   </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">DCWatcher</span></span>
<span class="line"><span class="__shiki_140thh">    syncPolicy  </span><span class="__shiki_1t8gfj">SyncPolicy</span></span>
<span class="line"><span class="__shiki_140thh">    conflictRes </span><span class="__shiki_1t8gfj">ConflictResolver</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> DCWatcher</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    dcName   </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    client   </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">clientv3</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Client</span></span>
<span class="line"><span class="__shiki_140thh">    watchers </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">RemoteWatcher</span></span>
<span class="line"><span class="__shiki_140thh">    latency  </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 同步策略</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> SyncPolicy</span><span class="__shiki_1itgoe"> int</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">    SyncImmediate</span><span class="__shiki_1t8gfj">  SyncPolicy</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> iota</span><span class="__shiki_21nrsd">  // 立即同步</span></span>
<span class="line"><span class="__shiki_dzsirb">    SyncLazy</span><span class="__shiki_21nrsd">                          // 延迟同步</span></span>
<span class="line"><span class="__shiki_dzsirb">    SyncBatch</span><span class="__shiki_21nrsd">                         // 批量同步</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 跨数据中心watch</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">gwp </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">GeoWatchProxy</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">WatchGlobal</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">opts</span><span class="__shiki_1itgoe"> ...</span><span class="__shiki_1t8gfj">clientv3</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">OpOption</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 在本地数据中心创建watch</span></span>
<span class="line"><span class="__shiki_140thh">    localWatcher </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> gwp.</span><span class="__shiki_1t8gfj">createLocalWatch</span><span class="__shiki_140thh">(key, opts</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 在远程数据中心创建watch</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> dcName, dcWatcher </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> gwp.remoteDCs {</span></span>
<span class="line"><span class="__shiki_140thh">        remoteWatcher </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> dcWatcher.</span><span class="__shiki_1t8gfj">createRemoteWatch</span><span class="__shiki_140thh">(key, opts</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 根据同步策略处理远程事件</span></span>
<span class="line"><span class="__shiki_1itgoe">        switch</span><span class="__shiki_140thh"> gwp.syncPolicy {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> SyncImmediate:</span></span>
<span class="line"><span class="__shiki_1itgoe">            go</span><span class="__shiki_140thh"> gwp.</span><span class="__shiki_1t8gfj">syncImmediate</span><span class="__shiki_140thh">(remoteWatcher)</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> SyncLazy:</span></span>
<span class="line"><span class="__shiki_1itgoe">            go</span><span class="__shiki_140thh"> gwp.</span><span class="__shiki_1t8gfj">syncLazy</span><span class="__shiki_140thh">(remoteWatcher)</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> SyncBatch:</span></span>
<span class="line"><span class="__shiki_140thh">            gwp.</span><span class="__shiki_1t8gfj">syncBatch</span><span class="__shiki_140thh">(remoteWatcher)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 冲突解决</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">gwp </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">GeoWatchProxy</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">resolveConflict</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">localEvent</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">remoteEvent</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 基于时间戳的冲突解决</span></span>
<span class="line"><span class="__shiki_140thh">    localTime </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> extractTimestamp</span><span class="__shiki_140thh">(localEvent)</span></span>
<span class="line"><span class="__shiki_140thh">    remoteTime </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> extractTimestamp</span><span class="__shiki_140thh">(remoteEvent)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> remoteTime.</span><span class="__shiki_1t8gfj">After</span><span class="__shiki_140thh">(localTime) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 远程更新，需要同步</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> remoteEvent</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 本地更新，忽略远程事件</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 事件去重和排序</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">gwp </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">GeoWatchProxy</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">deduplicateEvents</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">events</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">) []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 使用向量时钟进行去重和排序</span></span>
<span class="line"><span class="__shiki_140thh">    vectorClock </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">int64</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> deduped []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, event </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> events {</span></span>
<span class="line"><span class="__shiki_140thh">        dc </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> extractDatacenter</span><span class="__shiki_140thh">(event)</span></span>
<span class="line"><span class="__shiki_140thh">        rev </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> event.Kv.ModRevision</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> lastRev, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> vectorClock[dc]; ok </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> rev </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_140thh"> lastRev {</span></span>
<span class="line"><span class="__shiki_1itgoe">            continue</span><span class="__shiki_21nrsd"> // 重复事件</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        vectorClock[dc] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> rev</span></span>
<span class="line"><span class="__shiki_140thh">        deduped </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(deduped, event)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 按逻辑时间排序</span></span>
<span class="line"><span class="__shiki_140thh">    sort.</span><span class="__shiki_1t8gfj">Slice</span><span class="__shiki_140thh">(deduped, </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">i</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">j</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1t8gfj"> compareEvents</span><span class="__shiki_140thh">(deduped[i], deduped[j]) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> deduped</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第七部分-最佳实践与性能调优" tabindex="-1">第七部分：最佳实践与性能调优 <a class="header-anchor" href="#第七部分-最佳实践与性能调优" aria-label="Permalink to &quot;第七部分：最佳实践与性能调优&quot;">​</a></h2><h3 id="_7-1-客户端最佳实践" tabindex="-1">7.1 客户端最佳实践 <a class="header-anchor" href="#_7-1-客户端最佳实践" aria-label="Permalink to &quot;7.1 客户端最佳实践&quot;">​</a></h3><h4 id="_7-1-1-watch客户端模式" tabindex="-1">7.1.1 Watch客户端模式 <a class="header-anchor" href="#_7-1-1-watch客户端模式" aria-label="Permalink to &quot;7.1.1 Watch客户端模式&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 健壮的Watch客户端模式</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> RobustWatchClient</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    etcdClient  </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">clientv3</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Client</span></span>
<span class="line"><span class="__shiki_140thh">    watchConfig </span><span class="__shiki_1t8gfj">WatchConfig</span></span>
<span class="line"><span class="__shiki_140thh">    eventQueue  </span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">Event</span></span>
<span class="line"><span class="__shiki_140thh">    errorQueue  </span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> error</span></span>
<span class="line"><span class="__shiki_140thh">    restartCh   </span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 统计信息</span></span>
<span class="line"><span class="__shiki_140thh">    stats       </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WatchStats</span></span>
<span class="line"><span class="__shiki_140thh">    mu          </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RWMutex</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">rwc </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">RobustWatchClient</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Start</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 启动事件处理协程</span></span>
<span class="line"><span class="__shiki_1itgoe">    go</span><span class="__shiki_140thh"> rwc.</span><span class="__shiki_1t8gfj">eventHandler</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 启动错误处理协程</span></span>
<span class="line"><span class="__shiki_1itgoe">    go</span><span class="__shiki_140thh"> rwc.</span><span class="__shiki_1t8gfj">errorHandler</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 启动watch循环</span></span>
<span class="line"><span class="__shiki_1itgoe">    go</span><span class="__shiki_140thh"> rwc.</span><span class="__shiki_1t8gfj">watchLoop</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">rwc </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">RobustWatchClient</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">watchLoop</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> retryCount </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    maxRetryDelay </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 30</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> time.Second</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">rwc.restartCh:</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 手动重启</span></span>
<span class="line"><span class="__shiki_140thh">            retryCount </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 创建watch</span></span>
<span class="line"><span class="__shiki_140thh">            ctx, cancel </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> context.</span><span class="__shiki_1t8gfj">WithCancel</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">            watcher </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> rwc.etcdClient.</span><span class="__shiki_1t8gfj">Watch</span><span class="__shiki_140thh">(ctx, </span></span>
<span class="line"><span class="__shiki_140thh">                rwc.watchConfig.Key, </span></span>
<span class="line"><span class="__shiki_140thh">                rwc.watchConfig.Options</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 处理watch响应</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> rwc.</span><span class="__shiki_1t8gfj">handleWatcher</span><span class="__shiki_140thh">(watcher); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                rwc.errorQueue </span><span class="__shiki_1itgoe">&lt;-</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_1t8gfj">                cancel</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 指数退避重试</span></span>
<span class="line"><span class="__shiki_140thh">                delay </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_140thh">(math.</span><span class="__shiki_1t8gfj">Pow</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_140thh">(retryCount))) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> time.Second</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> delay </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> maxRetryDelay {</span></span>
<span class="line"><span class="__shiki_140thh">                    delay </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> maxRetryDelay</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                time.</span><span class="__shiki_1t8gfj">Sleep</span><span class="__shiki_140thh">(delay)</span></span>
<span class="line"><span class="__shiki_140thh">                retryCount</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">                cancel</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_21nrsd"> // 正常退出</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">rwc </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">RobustWatchClient</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">handleWatcher</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1jdh33">    watcher</span><span class="__shiki_1t8gfj"> clientv3</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">WatchChan</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> resp, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">watcher:</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">ok {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> errors.</span><span class="__shiki_1t8gfj">New</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;watch channel closed&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> resp.</span><span class="__shiki_1t8gfj">Err</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> resp.</span><span class="__shiki_1t8gfj">Err</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 处理事件</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> _, event </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> resp.Events {</span></span>
<span class="line"><span class="__shiki_1itgoe">                select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                case</span><span class="__shiki_140thh"> rwc.eventQueue </span><span class="__shiki_1itgoe">&lt;-</span><span class="__shiki_140thh"> event:</span></span>
<span class="line"><span class="__shiki_140thh">                    rwc.</span><span class="__shiki_1t8gfj">recordEvent</span><span class="__shiki_140thh">(event)</span></span>
<span class="line"><span class="__shiki_1itgoe">                default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 事件队列满，记录丢弃</span></span>
<span class="line"><span class="__shiki_140thh">                    rwc.</span><span class="__shiki_1t8gfj">recordDroppedEvent</span><span class="__shiki_140thh">(event)</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">rwc.restartCh:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> errors.</span><span class="__shiki_1t8gfj">New</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;watch restart requested&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">rwc </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">RobustWatchClient</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">eventHandler</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 批处理事件</span></span>
<span class="line"><span class="__shiki_140thh">    batch </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, rwc.watchConfig.BatchSize)</span></span>
<span class="line"><span class="__shiki_140thh">    timer </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">NewTimer</span><span class="__shiki_140thh">(rwc.watchConfig.BatchTimeout)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> event </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">rwc.eventQueue:</span></span>
<span class="line"><span class="__shiki_140thh">            batch </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(batch, event)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(batch) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> rwc.watchConfig.BatchSize {</span></span>
<span class="line"><span class="__shiki_140thh">                rwc.</span><span class="__shiki_1t8gfj">processEventBatch</span><span class="__shiki_140thh">(batch)</span></span>
<span class="line"><span class="__shiki_140thh">                batch </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, rwc.watchConfig.BatchSize)</span></span>
<span class="line"><span class="__shiki_140thh">                timer.</span><span class="__shiki_1t8gfj">Reset</span><span class="__shiki_140thh">(rwc.watchConfig.BatchTimeout)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">timer.C:</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(batch) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                rwc.</span><span class="__shiki_1t8gfj">processEventBatch</span><span class="__shiki_140thh">(batch)</span></span>
<span class="line"><span class="__shiki_140thh">                batch </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, rwc.watchConfig.BatchSize)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            timer.</span><span class="__shiki_1t8gfj">Reset</span><span class="__shiki_140thh">(rwc.watchConfig.BatchTimeout)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_7-1-2-连接管理与资源清理" tabindex="-1">7.1.2 连接管理与资源清理 <a class="header-anchor" href="#_7-1-2-连接管理与资源清理" aria-label="Permalink to &quot;7.1.2 连接管理与资源清理&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Watch连接池</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> WatchConnectionPool</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    pool        []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WatchConnection</span></span>
<span class="line"><span class="__shiki_140thh">    poolSize    </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    idleTimeout </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">    mu          </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RWMutex</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> WatchConnection</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    conn        </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">grpc</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ClientConn</span></span>
<span class="line"><span class="__shiki_140thh">    watchClient </span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">WatchClient</span></span>
<span class="line"><span class="__shiki_140thh">    lastUsed    </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span></span>
<span class="line"><span class="__shiki_140thh">    inUse       </span><span class="__shiki_1itgoe">bool</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">wcp </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WatchConnectionPool</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">() (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WatchConnection</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    wcp.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> wcp.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 查找空闲连接</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, conn </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> wcp.pool {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">conn.inUse </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Since</span><span class="__shiki_140thh">(conn.lastUsed) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> wcp.idleTimeout {</span></span>
<span class="line"><span class="__shiki_140thh">            conn.inUse </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_140thh">            conn.lastUsed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> conn, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建新连接</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(wcp.pool) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> wcp.poolSize {</span></span>
<span class="line"><span class="__shiki_140thh">        conn, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> wcp.</span><span class="__shiki_1t8gfj">createConnection</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        conn.inUse </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_140thh">        conn.lastUsed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        wcp.pool </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(wcp.pool, conn)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> conn, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 等待连接释放</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, errors.</span><span class="__shiki_1t8gfj">New</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;no available connections&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">wcp </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WatchConnectionPool</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Return</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">conn</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">WatchConnection</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    wcp.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> wcp.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    conn.inUse </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">    conn.lastUsed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 资源清理器</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> WatchResourceCleaner</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    cleanupInterval </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">    maxIdleTime     </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">    maxWatchers     </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    stopCh          </span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">wrc </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WatchResourceCleaner</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Start</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    ticker </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">NewTicker</span><span class="__shiki_140thh">(wrc.cleanupInterval)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">wrc.stopCh:</span></span>
<span class="line"><span class="__shiki_140thh">            ticker.</span><span class="__shiki_1t8gfj">Stop</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">ticker.C:</span></span>
<span class="line"><span class="__shiki_140thh">            wrc.</span><span class="__shiki_1t8gfj">cleanupStaleWatchers</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            wrc.</span><span class="__shiki_1t8gfj">cleanupIdleConnections</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            wrc.</span><span class="__shiki_1t8gfj">checkMemoryUsage</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">wrc </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WatchResourceCleaner</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">cleanupStaleWatchers</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 清理长时间没有事件的watcher</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 清理客户端断开的watcher</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 清理超过数量限制的watcher</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-服务器端优化配置" tabindex="-1">7.2 服务器端优化配置 <a class="header-anchor" href="#_7-2-服务器端优化配置" aria-label="Permalink to &quot;7.2 服务器端优化配置&quot;">​</a></h3><h4 id="_7-2-1-etcd-watch配置参数" tabindex="-1">7.2.1 etcd Watch配置参数 <a class="header-anchor" href="#_7-2-1-etcd-watch配置参数" aria-label="Permalink to &quot;7.2.1 etcd Watch配置参数&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># etcd Watch配置最佳实践</span></span>
<span class="line"><span class="__shiki_17hn0y">etcd</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # Watch相关配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  watch</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 性能配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    max-watch-streams</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1024</span><span class="__shiki_21nrsd">               # 最大watch流数量</span></span>
<span class="line"><span class="__shiki_17hn0y">    max-concurrent-watches</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1024</span><span class="__shiki_21nrsd">          # 最大并发watch数量</span></span>
<span class="line"><span class="__shiki_17hn0y">    watch-progress-notify-interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10m&quot;</span><span class="__shiki_21nrsd"> # 进度通知间隔</span></span>
<span class="line"><span class="__shiki_17hn0y">    watch-batch-limit</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_21nrsd">               # 每批最大事件数</span></span>
<span class="line"><span class="__shiki_17hn0y">    watch-batch-timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1s&quot;</span><span class="__shiki_21nrsd">             # 批处理超时时间</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 内存管理</span></span>
<span class="line"><span class="__shiki_17hn0y">    max-watchers-per-key</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_21nrsd">            # 每个key的最大watcher数</span></span>
<span class="line"><span class="__shiki_17hn0y">    watch-history-size</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_21nrsd">             # 历史事件缓冲区大小</span></span>
<span class="line"><span class="__shiki_17hn0y">    watch-event-buffer-size</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1024</span><span class="__shiki_21nrsd">         # 事件缓冲区大小</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 网络优化</span></span>
<span class="line"><span class="__shiki_17hn0y">    grpc-keepalive-min-time</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10s&quot;</span><span class="__shiki_21nrsd">        # 最小keepalive时间</span></span>
<span class="line"><span class="__shiki_17hn0y">    grpc-keepalive-interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1m&quot;</span><span class="__shiki_21nrsd">         # keepalive间隔</span></span>
<span class="line"><span class="__shiki_17hn0y">    grpc-keepalive-timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;20s&quot;</span><span class="__shiki_21nrsd">         # keepalive超时</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 压缩配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    auto-compaction-mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">periodic</span><span class="__shiki_21nrsd">        # 自动压缩模式</span></span>
<span class="line"><span class="__shiki_17hn0y">    auto-compaction-retention</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1h&quot;</span><span class="__shiki_21nrsd">       # 压缩保留时间</span></span>
<span class="line"><span class="__shiki_17hn0y">    compaction-batch-limit</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_21nrsd">          # 压缩批处理限制</span></span></code></pre></div><h4 id="_7-2-2-监控告警配置" tabindex="-1">7.2.2 监控告警配置 <a class="header-anchor" href="#_7-2-2-监控告警配置" aria-label="Permalink to &quot;7.2.2 监控告警配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Prometheus监控配置</span></span>
<span class="line"><span class="__shiki_17hn0y">watch_metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 关键指标阈值</span></span>
<span class="line"><span class="__shiki_17hn0y">  thresholds</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    active_watchers</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_21nrsd">                # 活跃watcher数告警阈值</span></span>
<span class="line"><span class="__shiki_17hn0y">    event_queue_size</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5000</span><span class="__shiki_21nrsd">                # 事件队列大小阈值</span></span>
<span class="line"><span class="__shiki_17hn0y">    event_delivery_latency</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100ms&quot;</span><span class="__shiki_21nrsd">       # 事件交付延迟阈值</span></span>
<span class="line"><span class="__shiki_17hn0y">    watch_error_rate</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0.01</span><span class="__shiki_21nrsd">                # watch错误率阈值</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 告警规则</span></span>
<span class="line"><span class="__shiki_17hn0y">  alerts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HighWatchMemoryUsage</span></span>
<span class="line"><span class="__shiki_17hn0y">      expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">etcd_memory_watch_active_bytes / etcd_memory_usage_bytes &gt; 0.5</span></span>
<span class="line"><span class="__shiki_17hn0y">      for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">warning</span></span>
<span class="line"><span class="__shiki_17hn0y">      annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Watch memory usage is high&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">WatchEventDeliverySlow</span></span>
<span class="line"><span class="__shiki_17hn0y">      expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">histogram_quantile(0.95, rate(etcd_watch_event_delivery_latency_seconds_bucket[5m])) &gt; 0.1</span></span>
<span class="line"><span class="__shiki_17hn0y">      for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2m</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">critical</span></span>
<span class="line"><span class="__shiki_17hn0y">      annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Watch event delivery is slow&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ManyWatchErrors</span></span>
<span class="line"><span class="__shiki_17hn0y">      expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rate(etcd_watch_errors_total[5m]) &gt; 0.1</span></span>
<span class="line"><span class="__shiki_17hn0y">      for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">1m</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">warning</span></span>
<span class="line"><span class="__shiki_17hn0y">      annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;High rate of watch errors&quot;</span></span></code></pre></div><h3 id="_7-3-性能测试与基准" tabindex="-1">7.3 性能测试与基准 <a class="header-anchor" href="#_7-3-性能测试与基准" aria-label="Permalink to &quot;7.3 性能测试与基准&quot;">​</a></h3><h4 id="_7-3-1-watch性能测试工具" tabindex="-1">7.3.1 Watch性能测试工具 <a class="header-anchor" href="#_7-3-1-watch性能测试工具" aria-label="Permalink to &quot;7.3.1 Watch性能测试工具&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Watch性能基准测试</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> WatchBenchmark</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    clientCount   </span><span class="__shiki_1itgoe">int</span><span class="__shiki_21nrsd">      // 客户端数量</span></span>
<span class="line"><span class="__shiki_140thh">    watchersPerClient </span><span class="__shiki_1itgoe">int</span><span class="__shiki_21nrsd">  // 每个客户端的watcher数</span></span>
<span class="line"><span class="__shiki_140thh">    eventsPerSecond </span><span class="__shiki_1itgoe">int</span><span class="__shiki_21nrsd">    // 事件生成速率</span></span>
<span class="line"><span class="__shiki_140thh">    keyPattern     </span><span class="__shiki_1itgoe">string</span><span class="__shiki_21nrsd">  // key模式</span></span>
<span class="line"><span class="__shiki_140thh">    valueSize      </span><span class="__shiki_1itgoe">int</span><span class="__shiki_21nrsd">     // value大小</span></span>
<span class="line"><span class="__shiki_140thh">    duration       </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_21nrsd"> // 测试时长</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">wb </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">WatchBenchmark</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Run</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">BenchmarkResult</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    result </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">BenchmarkResult</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        StartTime: time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建测试客户端</span></span>
<span class="line"><span class="__shiki_140thh">    clients </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> wb.</span><span class="__shiki_1t8gfj">createClients</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建watcher</span></span>
<span class="line"><span class="__shiki_140thh">    watcherStats </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> wb.</span><span class="__shiki_1t8gfj">createWatchers</span><span class="__shiki_140thh">(clients)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 生成测试事件</span></span>
<span class="line"><span class="__shiki_140thh">    eventStats </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> wb.</span><span class="__shiki_1t8gfj">generateEvents</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 收集结果</span></span>
<span class="line"><span class="__shiki_140thh">    result.WatcherCount </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> watcherStats.Count</span></span>
<span class="line"><span class="__shiki_140thh">    result.EventsGenerated </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> eventStats.Count</span></span>
<span class="line"><span class="__shiki_140thh">    result.EventsDelivered </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> wb.</span><span class="__shiki_1t8gfj">collectDeliveredEvents</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    result.AverageLatency </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> wb.</span><span class="__shiki_1t8gfj">calculateAverageLatency</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    result.ErrorCount </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> wb.</span><span class="__shiki_1t8gfj">collectErrors</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    result.EndTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    result.Duration </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> result.EndTime.</span><span class="__shiki_1t8gfj">Sub</span><span class="__shiki_140thh">(result.StartTime)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> result</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 性能分析</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> profileWatchPerformance</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // CPU性能分析</span></span>
<span class="line"><span class="__shiki_140thh">    f, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> os.</span><span class="__shiki_1t8gfj">Create</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;watch_cpu.pprof&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> f.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    pprof.</span><span class="__shiki_1t8gfj">StartCPUProfile</span><span class="__shiki_140thh">(f)</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> pprof.</span><span class="__shiki_1t8gfj">StopCPUProfile</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 运行性能测试</span></span>
<span class="line"><span class="__shiki_140thh">    benchmark </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">WatchBenchmark</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        clientCount:       </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        watchersPerClient: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        eventsPerSecond:   </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        duration:          </span><span class="__shiki_dzsirb">30</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> time.Second,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    result </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> benchmark.</span><span class="__shiki_1t8gfj">Run</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 内存分析</span></span>
<span class="line"><span class="__shiki_140thh">    mf, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> os.</span><span class="__shiki_1t8gfj">Create</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;watch_mem.pprof&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> mf.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    pprof.</span><span class="__shiki_1t8gfj">WriteHeapProfile</span><span class="__shiki_140thh">(mf)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 输出性能报告</span></span>
<span class="line"><span class="__shiki_1t8gfj">    printPerformanceReport</span><span class="__shiki_140thh">(result)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_7-3-2-性能优化检查清单" tabindex="-1">7.3.2 性能优化检查清单 <a class="header-anchor" href="#_7-3-2-性能优化检查清单" aria-label="Permalink to &quot;7.3.2 性能优化检查清单&quot;">​</a></h4><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_19pls7"># Watch性能优化检查清单</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">## 客户端优化</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 使用连接池管理etcd连接</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 实现指数退避重连机制</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 批量处理watch事件</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 设置合理的事件队列大小</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 实现事件去重和排序</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 监控客户端资源使用</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">## 服务器端优化</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 调整watch历史缓冲区大小</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 配置合理的watch批处理参数</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 优化事件分发算法</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 实现watch请求聚合</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 设置连接和流限制</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">## 网络优化</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 使用gRPC keepalive</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 配置合理的超时时间</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 启用gRPC压缩</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 优化TCP参数</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 使用负载均衡</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">## 监控告警</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 监控watch事件交付延迟</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 监控watcher数量增长</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 监控内存使用情况</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 设置错误率告警</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 定期性能测试</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>etcd的Watch机制是一个强大的实时数据变更通知系统，其核心优势在于：</p><h3 id="核心特性总结" tabindex="-1">核心特性总结： <a class="header-anchor" href="#核心特性总结" aria-label="Permalink to &quot;核心特性总结：&quot;">​</a></h3><ol><li><strong>实时性</strong>：毫秒级的事件通知延迟</li><li><strong>可靠性</strong>：基于Raft的强一致性保证</li><li><strong>可扩展性</strong>：支持大规模并发watch</li><li><strong>灵活性</strong>：支持多种监听模式和过滤器</li><li><strong>容错性</strong>：完善的错误处理和重连机制</li></ol><h3 id="关键设计要点" tabindex="-1">关键设计要点： <a class="header-anchor" href="#关键设计要点" aria-label="Permalink to &quot;关键设计要点：&quot;">​</a></h3><ul><li><strong>事件历史管理</strong>：环形缓冲区存储历史事件，支持从指定修订版本监听</li><li><strong>高效的watcher匹配</strong>：结合哈希表和区间树实现快速匹配</li><li><strong>流量控制</strong>：多层次的限流机制防止系统过载</li><li><strong>连接管理</strong>：智能的连接池和资源清理</li></ul><h3 id="最佳实践建议" tabindex="-1">最佳实践建议： <a class="header-anchor" href="#最佳实践建议" aria-label="Permalink to &quot;最佳实践建议：&quot;">​</a></h3><ol><li><strong>合理使用监听模式</strong>：根据需要选择精确匹配、前缀匹配或范围匹配</li><li><strong>实现健壮的错误处理</strong>：处理压缩错误、网络断开等异常情况</li><li><strong>优化事件处理逻辑</strong>：使用批处理、去重和优先级队列</li><li><strong>监控关键指标</strong>：关注事件延迟、watcher数量、内存使用等</li><li><strong>容量规划</strong>：根据业务需求预估和调整watch相关参数</li></ol><p>etcd Watch机制是构建实时分布式系统的基石，深入理解其原理和最佳实践，对于设计高性能、高可用的微服务架构至关重要。</p>`,115)])])}const r=a(p,[["render",h]]);export{g as __pageData,r as default};
