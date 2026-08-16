import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const g=JSON.parse('{"title":"NoSQL数据库-键值存储etcd-事务与MVCC：详细完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/nosql/keyvalue/etcd/transactions.md","filePath":"data/database/nosql/keyvalue/etcd/transactions.md"}'),p={name:"data/database/nosql/keyvalue/etcd/transactions.md"};function h(l,s,c,t,e,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="nosql数据库-键值存储etcd-事务与mvcc-详细完整学习笔记" tabindex="-1">NoSQL数据库-键值存储etcd-事务与MVCC：详细完整学习笔记 <a class="header-anchor" href="#nosql数据库-键值存储etcd-事务与mvcc-详细完整学习笔记" aria-label="Permalink to &quot;NoSQL数据库-键值存储etcd-事务与MVCC：详细完整学习笔记&quot;">​</a></h1><h2 id="第一部分-事务与mvcc基础概念" tabindex="-1">第一部分：事务与MVCC基础概念 <a class="header-anchor" href="#第一部分-事务与mvcc基础概念" aria-label="Permalink to &quot;第一部分：事务与MVCC基础概念&quot;">​</a></h2><h3 id="_1-1-事务的acid特性在分布式系统中的挑战" tabindex="-1">1.1 事务的ACID特性在分布式系统中的挑战 <a class="header-anchor" href="#_1-1-事务的acid特性在分布式系统中的挑战" aria-label="Permalink to &quot;1.1 事务的ACID特性在分布式系统中的挑战&quot;">​</a></h3><h4 id="_1-1-1-传统acid特性" tabindex="-1">1.1.1 传统ACID特性 <a class="header-anchor" href="#_1-1-1-传统acid特性" aria-label="Permalink to &quot;1.1.1 传统ACID特性&quot;">​</a></h4><ul><li><strong>原子性(Atomicity)</strong>：事务要么全部完成，要么全部不完成</li><li><strong>一致性(Consistency)</strong>：事务使系统从一个有效状态转换到另一个有效状态</li><li><strong>隔离性(Isolation)</strong>：并发事务相互隔离</li><li><strong>持久性(Durability)</strong>：事务完成后，修改是永久的</li></ul><h4 id="_1-2-2-分布式系统中的挑战" tabindex="-1">1.2.2 分布式系统中的挑战 <a class="header-anchor" href="#_1-2-2-分布式系统中的挑战" aria-label="Permalink to &quot;1.2.2 分布式系统中的挑战&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 分布式事务的复杂性</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> DistributedTransaction</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    participants []</span><span class="__shiki_1t8gfj">Node</span><span class="__shiki_21nrsd">  // 参与节点</span></span>
<span class="line"><span class="__shiki_140thh">    coordinator  </span><span class="__shiki_1t8gfj">Node</span><span class="__shiki_21nrsd">    // 协调者</span></span>
<span class="line"><span class="__shiki_140thh">    state        </span><span class="__shiki_1t8gfj">State</span><span class="__shiki_21nrsd">   // 全局状态</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 挑战：</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 网络分区：部分节点不可达</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 时钟同步：缺乏全局时间</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 故障处理：节点可能随时崩溃</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 性能开销：多轮网络通信</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_1-2-mvcc基础原理" tabindex="-1">1.2 MVCC基础原理 <a class="header-anchor" href="#_1-2-mvcc基础原理" aria-label="Permalink to &quot;1.2 MVCC基础原理&quot;">​</a></h3><h4 id="_1-2-1-什么是mvcc" tabindex="-1">1.2.1 什么是MVCC？ <a class="header-anchor" href="#_1-2-1-什么是mvcc" aria-label="Permalink to &quot;1.2.1 什么是MVCC？&quot;">​</a></h4><p><strong>MVCC（Multi-Version Concurrency Control）</strong>：多版本并发控制，通过维护数据的多个版本来实现无锁读取和快照隔离。</p><p><strong>核心思想</strong>：</p><ul><li>写操作创建新版本，不直接覆盖旧数据</li><li>读操作读取特定时间点的数据快照</li><li>不同事务看到不同版本的数据</li></ul><h4 id="_1-2-2-mvcc的优势" tabindex="-1">1.2.2 MVCC的优势 <a class="header-anchor" href="#_1-2-2-mvcc的优势" aria-label="Permalink to &quot;1.2.2 MVCC的优势&quot;">​</a></h4><ol><li><strong>读写不阻塞</strong>：读操作不会阻塞写操作，写操作不会阻塞读操作</li><li><strong>快照隔离</strong>：提供一致性的数据视图</li><li><strong>时间旅行</strong>：可以查询历史数据</li><li><strong>避免锁竞争</strong>：减少并发冲突</li></ol><h2 id="第二部分-etcd的mvcc实现架构" tabindex="-1">第二部分：etcd的MVCC实现架构 <a class="header-anchor" href="#第二部分-etcd的mvcc实现架构" aria-label="Permalink to &quot;第二部分：etcd的MVCC实现架构&quot;">​</a></h2><h3 id="_2-1-整体架构设计" tabindex="-1">2.1 整体架构设计 <a class="header-anchor" href="#_2-1-整体架构设计" aria-label="Permalink to &quot;2.1 整体架构设计&quot;">​</a></h3><h4 id="_2-1-1-mvcc存储层次结构" tabindex="-1">2.1.1 MVCC存储层次结构 <a class="header-anchor" href="#_2-1-1-mvcc存储层次结构" aria-label="Permalink to &quot;2.1.1 MVCC存储层次结构&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">客户端API层</span></span>
<span class="line"><span class="__shiki_wvjl67">    |</span></span>
<span class="line"><span class="__shiki_wvjl67">事务管理器 (Transaction Manager)</span></span>
<span class="line"><span class="__shiki_wvjl67">    |</span></span>
<span class="line"><span class="__shiki_wvjl67">MVCC存储层 (MVCC Store)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── 树索引 (TreeIndex) - B树内存索引</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── 存储后端 (Backend) - BoltDB持久化</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── 缓冲区管理 (Buffer Manager)</span></span>
<span class="line"><span class="__shiki_wvjl67">    └── 压缩器 (Compactor)</span></span>
<span class="line"><span class="__shiki_wvjl67">    |</span></span>
<span class="line"><span class="__shiki_wvjl67">Raft共识层</span></span>
<span class="line"><span class="__shiki_wvjl67">    |</span></span>
<span class="line"><span class="__shiki_wvjl67">物理存储层 (磁盘)</span></span></code></pre></div><h4 id="_2-1-2-版本号设计" tabindex="-1">2.1.2 版本号设计 <a class="header-anchor" href="#_2-1-2-版本号设计" aria-label="Permalink to &quot;2.1.2 版本号设计&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// etcd修订版本号结构</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> revision</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    main </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">  // 主版本（64位）</span></span>
<span class="line"><span class="__shiki_140thh">    sub  </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">  // 子版本（64位）</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 修订版本号编码（128位）</span></span>
<span class="line"><span class="__shiki_21nrsd">// [127:64] = main revision (事务ID)</span></span>
<span class="line"><span class="__shiki_21nrsd">// [63:0]  = sub revision (同一事务中的操作序号)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 示例：</span></span>
<span class="line"><span class="__shiki_21nrsd">// revision{main: 100, sub: 0} -&gt; 第100个事务</span></span>
<span class="line"><span class="__shiki_21nrsd">// revision{main: 100, sub: 1} -&gt; 第100个事务的第2个操作</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 版本号生成器</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> revisionGenerator</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    mu      </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Mutex</span></span>
<span class="line"><span class="__shiki_140thh">    current </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">  // 当前主版本</span></span>
<span class="line"><span class="__shiki_140thh">    sub     </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">  // 当前子版本</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">g </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">revisionGenerator</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">next</span><span class="__shiki_140thh">() </span><span class="__shiki_1t8gfj">revision</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    g.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> g.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    rev </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> revision</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        main: g.current,</span></span>
<span class="line"><span class="__shiki_140thh">        sub:  g.sub,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    g.sub</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> rev</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">g </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">revisionGenerator</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">incrementMain</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    g.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    g.current</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_140thh">    g.sub </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">    g.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-2-核心数据结构" tabindex="-1">2.2 核心数据结构 <a class="header-anchor" href="#_2-2-核心数据结构" aria-label="Permalink to &quot;2.2 核心数据结构&quot;">​</a></h3><h4 id="_2-2-1-键索引结构" tabindex="-1">2.2.1 键索引结构 <a class="header-anchor" href="#_2-2-1-键索引结构" aria-label="Permalink to &quot;2.2.1 键索引结构&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 键索引，存储在内存B树中</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> keyIndex</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    key         []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_21nrsd">           // 键名</span></span>
<span class="line"><span class="__shiki_140thh">    modified    </span><span class="__shiki_1t8gfj">revision</span><span class="__shiki_21nrsd">         // 最后修改的修订版本</span></span>
<span class="line"><span class="__shiki_140thh">    generations []</span><span class="__shiki_1t8gfj">generation</span><span class="__shiki_21nrsd">     // 代(generation)列表</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 代(generation)表示键的连续创建-删除周期</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> generation</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    ver     </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">       // 当前代中的版本号（从1开始）</span></span>
<span class="line"><span class="__shiki_140thh">    created </span><span class="__shiki_1t8gfj">revision</span><span class="__shiki_21nrsd">    // 创建该代的修订版本</span></span>
<span class="line"><span class="__shiki_140thh">    revs    []</span><span class="__shiki_1t8gfj">revision</span><span class="__shiki_21nrsd">  // 该代中的所有修订版本</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 示例：键&quot;/foo&quot;的历史</span></span>
<span class="line"><span class="__shiki_21nrsd">// generation 1: 创建于rev(5,0)，版本1 [PUT]</span></span>
<span class="line"><span class="__shiki_21nrsd">// generation 2: 创建于rev(8,0)，版本1 [PUT]</span></span>
<span class="line"><span class="__shiki_21nrsd">// generation 3: 创建于rev(12,0)，版本1 [PUT], 版本2 [PUT], 版本3 [PUT]</span></span></code></pre></div><h4 id="_2-2-2-boltdb存储结构" tabindex="-1">2.2.2 BoltDB存储结构 <a class="header-anchor" href="#_2-2-2-boltdb存储结构" aria-label="Permalink to &quot;2.2.2 BoltDB存储结构&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// BoltDB bucket组织</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 存储实际的键值对，key=revision，value=KeyValue</span></span>
<span class="line"><span class="__shiki_dzsirb">    keyBucketName</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;key&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 存储元数据，key=[]byte(&quot;consistent_index&quot;)，value=index</span></span>
<span class="line"><span class="__shiki_dzsirb">    metaBucketName</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;meta&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 存储租约信息</span></span>
<span class="line"><span class="__shiki_dzsirb">    leaseBucketName</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;lease&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 存储别名，用于迁移</span></span>
<span class="line"><span class="__shiki_dzsirb">    aliasBucketName</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;alias&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 存储在BoltDB中的键值对格式</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> KeyValue</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Key            []</span><span class="__shiki_1itgoe">byte</span></span>
<span class="line"><span class="__shiki_140thh">    Value          []</span><span class="__shiki_1itgoe">byte</span></span>
<span class="line"><span class="__shiki_140thh">    CreateRevision </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">    // 创建时的修订版本</span></span>
<span class="line"><span class="__shiki_140thh">    ModRevision    </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">    // 最后修改的修订版本</span></span>
<span class="line"><span class="__shiki_140thh">    Version        </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">    // 键在当前代中的版本号</span></span>
<span class="line"><span class="__shiki_140thh">    Lease          </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">    // 租约ID</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 键在BoltDB中的编码</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> encodeKey</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">rev</span><span class="__shiki_1t8gfj"> revision</span><span class="__shiki_140thh">) []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 格式: key + revision</span></span>
<span class="line"><span class="__shiki_21nrsd">    // revision编码为16字节: 8字节main + 8字节sub</span></span>
<span class="line"><span class="__shiki_140thh">    encoded </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(key)</span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb">16</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">    copy</span><span class="__shiki_140thh">(encoded, key)</span></span>
<span class="line"><span class="__shiki_140thh">    binary.BigEndian.</span><span class="__shiki_1t8gfj">PutUint64</span><span class="__shiki_140thh">(encoded[</span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(key):], </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">(rev.main))</span></span>
<span class="line"><span class="__shiki_140thh">    binary.BigEndian.</span><span class="__shiki_1t8gfj">PutUint64</span><span class="__shiki_140thh">(encoded[</span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(key)</span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb">8</span><span class="__shiki_140thh">:], </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">(rev.sub))</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> encoded</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-2-3-内存索引b树" tabindex="-1">2.2.3 内存索引B树 <a class="header-anchor" href="#_2-2-3-内存索引b树" aria-label="Permalink to &quot;2.2.3 内存索引B树&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// B树索引实现</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> treeIndex</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    tree </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">btree</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">BTree</span></span>
<span class="line"><span class="__shiki_140thh">    mu   </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RWMutex</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">ti </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">treeIndex</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">atRev</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) (</span><span class="__shiki_1jdh33">modified</span><span class="__shiki_1t8gfj"> revision</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">ver</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">err</span><span class="__shiki_1itgoe"> error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    ti.mu.</span><span class="__shiki_1t8gfj">RLock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> ti.mu.</span><span class="__shiki_1t8gfj">RUnlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 在B树中查找键</span></span>
<span class="line"><span class="__shiki_140thh">    keyi </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">keyIndex</span><span class="__shiki_140thh">{key: key}</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> item </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> ti.tree.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(keyi); item </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        keyi </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> item.(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">keyIndex</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> keyi.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(atRev)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1t8gfj"> revision</span><span class="__shiki_140thh">{}, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, ErrRevisionNotFound</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// B树比较函数</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">ki </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">keyIndex</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Less</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">than</span><span class="__shiki_1t8gfj"> btree</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Item</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> bytes.</span><span class="__shiki_1t8gfj">Compare</span><span class="__shiki_140thh">(ki.key, than.(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">keyIndex</span><span class="__shiki_140thh">).key) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第三部分-etcd事务机制详解" tabindex="-1">第三部分：etcd事务机制详解 <a class="header-anchor" href="#第三部分-etcd事务机制详解" aria-label="Permalink to &quot;第三部分：etcd事务机制详解&quot;">​</a></h2><h3 id="_3-1-事务模型与api" tabindex="-1">3.1 事务模型与API <a class="header-anchor" href="#_3-1-事务模型与api" aria-label="Permalink to &quot;3.1 事务模型与API&quot;">​</a></h3><h4 id="_3-1-1-事务接口定义" tabindex="-1">3.1.1 事务接口定义 <a class="header-anchor" href="#_3-1-1-事务接口定义" aria-label="Permalink to &quot;3.1.1 事务接口定义&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// etcd事务API</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Txn</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 条件部分 (IF)</span></span>
<span class="line"><span class="__shiki_1t8gfj">    If</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">cs</span><span class="__shiki_1itgoe"> ...</span><span class="__shiki_1t8gfj">Cmp</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Txn</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 成功执行部分 (THEN)</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Then</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ops</span><span class="__shiki_1itgoe"> ...</span><span class="__shiki_1t8gfj">Op</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Txn</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 失败执行部分 (ELSE)</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Else</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ops</span><span class="__shiki_1itgoe"> ...</span><span class="__shiki_1t8gfj">Op</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Txn</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 提交事务</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Commit</span><span class="__shiki_140thh">() (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TxnResponse</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 比较操作</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Cmp</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Key         []</span><span class="__shiki_1itgoe">byte</span></span>
<span class="line"><span class="__shiki_140thh">    Op          </span><span class="__shiki_1t8gfj">CmpOp</span></span>
<span class="line"><span class="__shiki_140thh">    TargetUnion </span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 比较操作类型</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> CmpOp</span><span class="__shiki_1itgoe"> int</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">    CmpEqual</span><span class="__shiki_1t8gfj">    CmpOp</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_21nrsd">  // =</span></span>
<span class="line"><span class="__shiki_dzsirb">    CmpGreater</span><span class="__shiki_1t8gfj">  CmpOp</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_21nrsd">  // &gt;</span></span>
<span class="line"><span class="__shiki_dzsirb">    CmpLess</span><span class="__shiki_1t8gfj">     CmpOp</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_21nrsd">  // &lt;</span></span>
<span class="line"><span class="__shiki_dzsirb">    CmpNotEqual</span><span class="__shiki_1t8gfj"> CmpOp</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_21nrsd">  // !=</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 比较目标</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> CmpTarget</span><span class="__shiki_1itgoe"> int</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">    CmpVersion</span><span class="__shiki_1t8gfj"> CmpTarget</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_21nrsd">  // 比较版本号</span></span>
<span class="line"><span class="__shiki_dzsirb">    CmpCreate</span><span class="__shiki_1t8gfj">  CmpTarget</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_21nrsd">  // 比较创建修订版本</span></span>
<span class="line"><span class="__shiki_dzsirb">    CmpMod</span><span class="__shiki_1t8gfj">     CmpTarget</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_21nrsd">  // 比较修改修订版本</span></span>
<span class="line"><span class="__shiki_dzsirb">    CmpValue</span><span class="__shiki_1t8gfj">   CmpTarget</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_21nrsd">  // 比较值</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 操作类型</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Op</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 可以是Range、Put、Delete等操作</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-1-2-事务请求结构" tabindex="-1">3.1.2 事务请求结构 <a class="header-anchor" href="#_3-1-2-事务请求结构" aria-label="Permalink to &quot;3.1.2 事务请求结构&quot;">​</a></h4><div class="language-protobuf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">protobuf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// etcd事务的protobuf定义</span></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> TxnRequest</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 比较条件列表</span></span>
<span class="line"><span class="__shiki_1itgoe">    repeated</span><span class="__shiki_1itgoe"> Compare</span><span class="__shiki_140thh"> compare </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 成功时执行的操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    repeated</span><span class="__shiki_1itgoe"> RequestOp</span><span class="__shiki_140thh"> success </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 失败时执行的操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    repeated</span><span class="__shiki_1itgoe"> RequestOp</span><span class="__shiki_140thh"> failure </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> Compare</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    CompareResult</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    CompareTarget</span><span class="__shiki_140thh"> target </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    bytes</span><span class="__shiki_140thh"> key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    oneof</span><span class="__shiki_140thh"> target_union {</span></span>
<span class="line"><span class="__shiki_1itgoe">        int64</span><span class="__shiki_140thh"> version </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">;        </span><span class="__shiki_21nrsd">// 比较版本号</span></span>
<span class="line"><span class="__shiki_1itgoe">        int64</span><span class="__shiki_140thh"> create_revision </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 比较创建修订版本</span></span>
<span class="line"><span class="__shiki_1itgoe">        int64</span><span class="__shiki_140thh"> mod_revision </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 6</span><span class="__shiki_140thh">;   </span><span class="__shiki_21nrsd">// 比较修改修订版本</span></span>
<span class="line"><span class="__shiki_1itgoe">        bytes</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 7</span><span class="__shiki_140thh">;          </span><span class="__shiki_21nrsd">// 比较值</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> RequestOp</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    oneof</span><span class="__shiki_140thh"> request {</span></span>
<span class="line"><span class="__shiki_1itgoe">        RangeRequest</span><span class="__shiki_140thh"> request_range </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;       </span><span class="__shiki_21nrsd">// 读操作</span></span>
<span class="line"><span class="__shiki_1itgoe">        PutRequest</span><span class="__shiki_140thh"> request_put </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;           </span><span class="__shiki_21nrsd">// 写操作</span></span>
<span class="line"><span class="__shiki_1itgoe">        DeleteRangeRequest</span><span class="__shiki_140thh"> request_delete_range </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 删除操作</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> TxnResponse</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    ResponseHeader</span><span class="__shiki_140thh"> header </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    bool</span><span class="__shiki_140thh"> succeeded </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;      </span><span class="__shiki_21nrsd">// 条件是否满足</span></span>
<span class="line"><span class="__shiki_1itgoe">    repeated</span><span class="__shiki_1itgoe"> ResponseOp</span><span class="__shiki_140thh"> responses </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 操作响应列表</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-事务执行流程" tabindex="-1">3.2 事务执行流程 <a class="header-anchor" href="#_3-2-事务执行流程" aria-label="Permalink to &quot;3.2 事务执行流程&quot;">​</a></h3><h4 id="_3-2-1-事务处理流程" tabindex="-1">3.2.1 事务处理流程 <a class="header-anchor" href="#_3-2-1-事务处理流程" aria-label="Permalink to &quot;3.2.1 事务处理流程&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 事务处理主流程</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">EtcdServer</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Txn</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">txn</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnRequest</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnResponse</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 验证请求</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.</span><span class="__shiki_1t8gfj">validateTxnRequest</span><span class="__shiki_140thh">(txn); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 创建Raft请求</span></span>
<span class="line"><span class="__shiki_140thh">    raftReq </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">InternalRaftRequest</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        Header: </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RequestHeader</span><span class="__shiki_140thh">{},</span></span>
<span class="line"><span class="__shiki_140thh">        Txn:    txn,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 通过Raft提交</span></span>
<span class="line"><span class="__shiki_140thh">    resp, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.</span><span class="__shiki_1t8gfj">processInternalRaftRequest</span><span class="__shiki_140thh">(ctx, raftReq)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 等待状态机应用</span></span>
<span class="line"><span class="__shiki_1itgoe">    select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">ctx.</span><span class="__shiki_1t8gfj">Done</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, ctx.</span><span class="__shiki_1t8gfj">Err</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">s.applyWait.</span><span class="__shiki_1t8gfj">Wait</span><span class="__shiki_140thh">(resp.Header.Index):</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 返回结果</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> resp.Txn, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Raft状态机中的事务应用</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">EtcdServer</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">applyTxn</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">txn</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnRequest</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">applyResult</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建事务上下文</span></span>
<span class="line"><span class="__shiki_140thh">    txnCtx </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">txnContext</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        txn:        txn,</span></span>
<span class="line"><span class="__shiki_140thh">        revision:   s.</span><span class="__shiki_1t8gfj">revision</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        responses:  </span><span class="__shiki_1t8gfj">make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ResponseOp</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(txn.Success)),</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 评估条件</span></span>
<span class="line"><span class="__shiki_140thh">    txnCtx.succeeded </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> s.</span><span class="__shiki_1t8gfj">evaluateTxnConditions</span><span class="__shiki_140thh">(txn.Compare)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 执行相应分支</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> txnCtx.succeeded {</span></span>
<span class="line"><span class="__shiki_140thh">        txnCtx.responses </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> s.</span><span class="__shiki_1t8gfj">executeTxnOps</span><span class="__shiki_140thh">(txn.Success, txnCtx.revision)</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        txnCtx.responses </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> s.</span><span class="__shiki_1t8gfj">executeTxnOps</span><span class="__shiki_140thh">(txn.Failure, txnCtx.revision)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 生成响应</span></span>
<span class="line"><span class="__shiki_140thh">    resp </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnResponse</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        Header:    </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ResponseHeader</span><span class="__shiki_140thh">{Revision: txnCtx.revision.main},</span></span>
<span class="line"><span class="__shiki_140thh">        Succeeded: txnCtx.succeeded,</span></span>
<span class="line"><span class="__shiki_140thh">        Responses: txnCtx.responses,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">applyResult</span><span class="__shiki_140thh">{resp: resp}</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-2-2-条件评估" tabindex="-1">3.2.2 条件评估 <a class="header-anchor" href="#_3-2-2-条件评估" aria-label="Permalink to &quot;3.2.2 条件评估&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 评估事务条件</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">EtcdServer</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">evaluateTxnConditions</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">cmps</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Compare</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, cmp </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> cmps {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 获取键的当前状态</span></span>
<span class="line"><span class="__shiki_140thh">        kv, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.kv.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(cmp.Key, s.</span><span class="__shiki_1t8gfj">revision</span><span class="__shiki_140thh">().main)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> ErrKeyNotFound {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 根据比较类型评估</span></span>
<span class="line"><span class="__shiki_1itgoe">        switch</span><span class="__shiki_140thh"> cmp.Target {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> pb.Compare_VERSION:</span></span>
<span class="line"><span class="__shiki_140thh">            version </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> kv </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                version </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> kv.Version</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_1t8gfj">compareInt64</span><span class="__shiki_140thh">(version, cmp.TargetUnion.(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Compare_Version</span><span class="__shiki_140thh">).Version, cmp.Result) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> pb.Compare_CREATE:</span></span>
<span class="line"><span class="__shiki_140thh">            createRev </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> kv </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                createRev </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> kv.CreateRevision</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_1t8gfj">compareInt64</span><span class="__shiki_140thh">(createRev, cmp.TargetUnion.(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Compare_CreateRevision</span><span class="__shiki_140thh">).CreateRevision, cmp.Result) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> pb.Compare_MOD:</span></span>
<span class="line"><span class="__shiki_140thh">            modRev </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> kv </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                modRev </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> kv.ModRevision</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_1t8gfj">compareInt64</span><span class="__shiki_140thh">(modRev, cmp.TargetUnion.(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Compare_ModRevision</span><span class="__shiki_140thh">).ModRevision, cmp.Result) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> pb.Compare_VALUE:</span></span>
<span class="line"><span class="__shiki_140thh">            value </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> kv </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> kv.Value</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            cmpValue </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> cmp.TargetUnion.(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Compare_Value</span><span class="__shiki_140thh">).Value</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_1t8gfj">compareBytes</span><span class="__shiki_140thh">(value, cmpValue, cmp.Result) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 比较函数</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> compareInt64</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">a</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">b</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">op</span><span class="__shiki_1t8gfj"> pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Compare_CompareResult</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    switch</span><span class="__shiki_140thh"> op {</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> pb.Compare_EQUAL:</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> a </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> b</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> pb.Compare_GREATER:</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> a </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> b</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> pb.Compare_LESS:</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> a </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> b</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> pb.Compare_NOT_EQUAL:</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> a </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> b</span></span>
<span class="line"><span class="__shiki_1itgoe">    default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-3-事务并发控制" tabindex="-1">3.3 事务并发控制 <a class="header-anchor" href="#_3-3-事务并发控制" aria-label="Permalink to &quot;3.3 事务并发控制&quot;">​</a></h3><h4 id="_3-3-1-乐观并发控制" tabindex="-1">3.3.1 乐观并发控制 <a class="header-anchor" href="#_3-3-1-乐观并发控制" aria-label="Permalink to &quot;3.3.1 乐观并发控制&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// etcd使用乐观并发控制（OCC）</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> OptimisticConcurrencyControl</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 基于修订版本的乐观锁</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 典型的乐观锁模式</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> optimisticUpdate</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">client</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">clientv3</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Client</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">key</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">updateFunc</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">current</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">) []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 1. 读取当前值</span></span>
<span class="line"><span class="__shiki_140thh">        getResp, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), key)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        var</span><span class="__shiki_140thh"> currentValue []</span><span class="__shiki_1itgoe">byte</span></span>
<span class="line"><span class="__shiki_1itgoe">        var</span><span class="__shiki_140thh"> currentVersion </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(getResp.Kvs) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            currentValue </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> getResp.Kvs[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">].Value</span></span>
<span class="line"><span class="__shiki_140thh">            currentVersion </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> getResp.Kvs[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">].Version</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 2. 计算新值</span></span>
<span class="line"><span class="__shiki_140thh">        newValue </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> updateFunc</span><span class="__shiki_140thh">(currentValue)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 3. 条件更新</span></span>
<span class="line"><span class="__shiki_140thh">        txnResp, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">Txn</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">()).</span></span>
<span class="line"><span class="__shiki_1t8gfj">            If</span><span class="__shiki_140thh">(clientv3.</span><span class="__shiki_1t8gfj">Compare</span><span class="__shiki_140thh">(clientv3.</span><span class="__shiki_1t8gfj">Version</span><span class="__shiki_140thh">(key), </span><span class="__shiki_mdbnqw">&quot;=&quot;</span><span class="__shiki_140thh">, currentVersion)).</span></span>
<span class="line"><span class="__shiki_1t8gfj">            Then</span><span class="__shiki_140thh">(clientv3.</span><span class="__shiki_1t8gfj">OpPut</span><span class="__shiki_140thh">(key, </span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">(newValue))).</span></span>
<span class="line"><span class="__shiki_1t8gfj">            Commit</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 4. 检查是否成功</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> txnResp.Succeeded {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 5. 失败则重试</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 指数退避</span></span>
<span class="line"><span class="__shiki_140thh">        time.</span><span class="__shiki_1t8gfj">Sleep</span><span class="__shiki_140thh">(time.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_140thh">(rand.</span><span class="__shiki_1t8gfj">Intn</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> time.Millisecond)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-3-2-事务隔离级别" tabindex="-1">3.3.2 事务隔离级别 <a class="header-anchor" href="#_3-3-2-事务隔离级别" aria-label="Permalink to &quot;3.3.2 事务隔离级别&quot;">​</a></h4><p>etcd提供<strong>可序列化快照隔离（Serializable Snapshot Isolation）</strong>：</p><ul><li><strong>快照读取</strong>：事务看到一致的数据快照</li><li><strong>写冲突检测</strong>：通过修订版本检测冲突</li><li><strong>可序列化</strong>：结果等价于某种顺序执行</li></ul><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 快照隔离实现</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> SnapshotIsolation</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    mvccStore </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MVCCStore</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">si </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">SnapshotIsolation</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">BeginTxn</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Transaction</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取当前修订版本作为快照</span></span>
<span class="line"><span class="__shiki_140thh">    snapshotRev </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> si.mvccStore.</span><span class="__shiki_1t8gfj">currentRevision</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">Transaction</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        readRev:   snapshotRev,</span></span>
<span class="line"><span class="__shiki_140thh">        writeRev:  </span><span class="__shiki_1t8gfj">revision</span><span class="__shiki_140thh">{},</span></span>
<span class="line"><span class="__shiki_140thh">        writes:    </span><span class="__shiki_1t8gfj">make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">KeyValue</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        snapshot:  si.mvccStore.</span><span class="__shiki_1t8gfj">createSnapshot</span><span class="__shiki_140thh">(snapshotRev),</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Transaction</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">) ([]</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 首先检查事务内的写入</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> kv, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> t.writes[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">(key)]; ok {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> kv.Value, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 从快照中读取</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> t.snapshot.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(key)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Transaction</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Put</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">value</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 记录写入，但不立即生效</span></span>
<span class="line"><span class="__shiki_140thh">    t.writes[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">(key)] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">KeyValue</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        Key:    key,</span></span>
<span class="line"><span class="__shiki_140thh">        Value:  value,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第四部分-mvcc存储引擎实现" tabindex="-1">第四部分：MVCC存储引擎实现 <a class="header-anchor" href="#第四部分-mvcc存储引擎实现" aria-label="Permalink to &quot;第四部分：MVCC存储引擎实现&quot;">​</a></h2><h3 id="_4-1-存储后端设计" tabindex="-1">4.1 存储后端设计 <a class="header-anchor" href="#_4-1-存储后端设计" aria-label="Permalink to &quot;4.1 存储后端设计&quot;">​</a></h3><h4 id="_4-1-1-backend接口" tabindex="-1">4.1.1 Backend接口 <a class="header-anchor" href="#_4-1-1-backend接口" aria-label="Permalink to &quot;4.1.1 Backend接口&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 存储后端接口</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Backend</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 读操作</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ReadTx</span><span class="__shiki_140thh">() </span><span class="__shiki_1t8gfj">ReadTx</span></span>
<span class="line"><span class="__shiki_1t8gfj">    BatchTx</span><span class="__shiki_140thh">() </span><span class="__shiki_1t8gfj">BatchTx</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 快照管理</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Snapshot</span><span class="__shiki_140thh">() </span><span class="__shiki_1t8gfj">Snapshot</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ForceCommit</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Close</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 指标</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Size</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_1t8gfj">    SizeInUse</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_1t8gfj">    OpenReadTxN</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 读事务接口</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> ReadTx</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1t8gfj">    RLock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1t8gfj">    RUnlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    UnsafeRange</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">bucketName</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">endKey</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">limit</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) (</span><span class="__shiki_1jdh33">keys</span><span class="__shiki_140thh"> [][]</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">vals</span><span class="__shiki_140thh"> [][]</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">    UnsafeForEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">bucketName</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">visitor</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">k</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">v</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 批量写事务接口</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> BatchTx</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ReadTx</span></span>
<span class="line"><span class="__shiki_1t8gfj">    UnsafeCreateBucket</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">    UnsafePut</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">bucketName</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">value</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">    UnsafeSeqPut</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">bucketName</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">value</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">    UnsafeDelete</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">bucketName</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Commit</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1t8gfj">    CommitAndStop</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_4-1-2-boltdb后端实现" tabindex="-1">4.1.2 BoltDB后端实现 <a class="header-anchor" href="#_4-1-2-boltdb后端实现" aria-label="Permalink to &quot;4.1.2 BoltDB后端实现&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// BoltDB后端实现</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> boltBackend</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    db </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">bolt</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">DB</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 批量事务</span></span>
<span class="line"><span class="__shiki_140thh">    batchmu </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Mutex</span></span>
<span class="line"><span class="__shiki_140thh">    batchTx </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">boltBatchTx</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 只读事务</span></span>
<span class="line"><span class="__shiki_140thh">    readTx </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">boltReadTx</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 指标</span></span>
<span class="line"><span class="__shiki_140thh">    size </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">b </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">boltBackend</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">BatchTx</span><span class="__shiki_140thh">() </span><span class="__shiki_1t8gfj">BatchTx</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    b.batchmu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> b.batchmu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> b.batchTx </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        b.batchTx </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> newBoltBatchTx</span><span class="__shiki_140thh">(b.db)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> b.batchTx</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">b </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">boltBackend</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">ReadTx</span><span class="__shiki_140thh">() </span><span class="__shiki_1t8gfj">ReadTx</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 返回缓存的只读事务</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> b.readTx</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// BoltDB事务管理</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> boltBatchTx</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    tx </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">bolt</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Tx</span></span>
<span class="line"><span class="__shiki_140thh">    pending </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    maxPending </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">bt </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">boltBatchTx</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">UnsafePut</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">bucketName</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">value</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    bucket </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> bt.tx.</span><span class="__shiki_1t8gfj">Bucket</span><span class="__shiki_140thh">(bucketName)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> bucket </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 创建bucket</span></span>
<span class="line"><span class="__shiki_140thh">        bucket, _ </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> bt.tx.</span><span class="__shiki_1t8gfj">CreateBucketIfNotExists</span><span class="__shiki_140thh">(bucketName)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    bucket.</span><span class="__shiki_1t8gfj">Put</span><span class="__shiki_140thh">(key, value)</span></span>
<span class="line"><span class="__shiki_140thh">    bt.pending</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 定期提交以避免事务过大</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> bt.pending </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> bt.maxPending {</span></span>
<span class="line"><span class="__shiki_140thh">        bt.</span><span class="__shiki_1t8gfj">commit</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">bt </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">boltBatchTx</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">commit</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> bt.pending </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 开始新事务</span></span>
<span class="line"><span class="__shiki_140thh">    bt.tx.</span><span class="__shiki_1t8gfj">Commit</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    bt.tx </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> bt.</span><span class="__shiki_1t8gfj">beginTx</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    bt.pending </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-键索引管理" tabindex="-1">4.2 键索引管理 <a class="header-anchor" href="#_4-2-键索引管理" aria-label="Permalink to &quot;4.2 键索引管理&quot;">​</a></h3><h4 id="_4-2-1-索引查找算法" tabindex="-1">4.2.1 索引查找算法 <a class="header-anchor" href="#_4-2-1-索引查找算法" aria-label="Permalink to &quot;4.2.1 索引查找算法&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 键索引查找</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">ki </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">keyIndex</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">atRev</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) (</span><span class="__shiki_1jdh33">modified</span><span class="__shiki_1t8gfj"> revision</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">ver</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">err</span><span class="__shiki_1itgoe"> error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(ki.generations) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1t8gfj"> revision</span><span class="__shiki_140thh">{}, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, ErrRevisionNotFound</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 找到atRev时的有效generation</span></span>
<span class="line"><span class="__shiki_140thh">    g </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> ki.</span><span class="__shiki_1t8gfj">findGeneration</span><span class="__shiki_140thh">(atRev)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> g.</span><span class="__shiki_1t8gfj">isEmpty</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1t8gfj"> revision</span><span class="__shiki_140thh">{}, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, ErrRevisionNotFound</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 在generation中查找修订版本</span></span>
<span class="line"><span class="__shiki_140thh">    n </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> g.</span><span class="__shiki_1t8gfj">walk</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">rev</span><span class="__shiki_1t8gfj"> revision</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> { </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh"> rev.main </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> atRev })</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> n </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> g.revs[n], g.ver </span><span class="__shiki_1itgoe">-</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(g.revs)</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">n) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1t8gfj"> revision</span><span class="__shiki_140thh">{}, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, ErrRevisionNotFound</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 查找指定修订版本时的有效generation</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">ki </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">keyIndex</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">findGeneration</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">atRev</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">generation</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 逆序遍历generations</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(ki.generations) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">--</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        g </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_140thh">ki.generations[i]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // generation在atRev时已创建且未删除</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> atRev </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> g.created.main </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> (i </span><span class="__shiki_1itgoe">==</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(ki.generations)</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> atRev </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> ki.generations[i</span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">].created.main) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> g</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 遍历修订版本</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">g </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">generation</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">walk</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">f</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">rev</span><span class="__shiki_1t8gfj"> revision</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 从最新到最旧遍历</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(g.revs) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">--</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_1t8gfj">f</span><span class="__shiki_140thh">(g.revs[i]) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> i</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_4-2-2-索引更新" tabindex="-1">4.2.2 索引更新 <a class="header-anchor" href="#_4-2-2-索引更新" aria-label="Permalink to &quot;4.2.2 索引更新&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 向键索引中添加新修订版本</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">ki </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">keyIndex</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">main</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">sub</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    rev </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> revision</span><span class="__shiki_140thh">{main: main, sub: sub}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(ki.generations) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 创建第一个generation</span></span>
<span class="line"><span class="__shiki_140thh">        ki.generations </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(ki.generations, </span><span class="__shiki_1t8gfj">generation</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            created: rev,</span></span>
<span class="line"><span class="__shiki_140thh">            revs:    []</span><span class="__shiki_1t8gfj">revision</span><span class="__shiki_140thh">{rev},</span></span>
<span class="line"><span class="__shiki_140thh">            ver:     </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">        ki.modified </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> rev</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取当前generation</span></span>
<span class="line"><span class="__shiki_140thh">    g </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_140thh">ki.generations[</span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(ki.generations)</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 添加修订版本</span></span>
<span class="line"><span class="__shiki_140thh">    g.revs </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(g.revs, rev)</span></span>
<span class="line"><span class="__shiki_140thh">    g.ver</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_140thh">    ki.modified </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> rev</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 标记键为已删除</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">ki </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">keyIndex</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">tombstone</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">main</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">sub</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> ki.</span><span class="__shiki_1t8gfj">isEmpty</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> ErrRevisionNotFound</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    rev </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> revision</span><span class="__shiki_140thh">{main: main, sub: sub}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 向当前generation添加tombstone标记</span></span>
<span class="line"><span class="__shiki_140thh">    g </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_140thh">ki.generations[</span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(ki.generations)</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    g.revs </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(g.revs, rev)</span></span>
<span class="line"><span class="__shiki_140thh">    g.ver</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建新的空generation（表示键已删除）</span></span>
<span class="line"><span class="__shiki_140thh">    ki.generations </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(ki.generations, </span><span class="__shiki_1t8gfj">generation</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        created: rev,</span></span>
<span class="line"><span class="__shiki_140thh">        revs:    []</span><span class="__shiki_1t8gfj">revision</span><span class="__shiki_140thh">{},</span></span>
<span class="line"><span class="__shiki_140thh">        ver:     </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    ki.modified </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> rev</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-3-读写操作实现" tabindex="-1">4.3 读写操作实现 <a class="header-anchor" href="#_4-3-读写操作实现" aria-label="Permalink to &quot;4.3 读写操作实现&quot;">​</a></h3><h4 id="_4-3-1-读操作实现" tabindex="-1">4.3.1 读操作实现 <a class="header-anchor" href="#_4-3-1-读操作实现" aria-label="Permalink to &quot;4.3.1 读操作实现&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// MVCC读操作</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MVCCStore</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">rev</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">KeyValue</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取读锁</span></span>
<span class="line"><span class="__shiki_140thh">    s.mu.</span><span class="__shiki_1t8gfj">RLock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> s.mu.</span><span class="__shiki_1t8gfj">RUnlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 从内存索引获取修订版本信息</span></span>
<span class="line"><span class="__shiki_140thh">    modified, ver, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.index.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(key, rev)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 从后端存储获取键值对</span></span>
<span class="line"><span class="__shiki_140thh">    kv </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.</span><span class="__shiki_1t8gfj">getKeyValue</span><span class="__shiki_140thh">(key, modified, ver)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> kv </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, ErrKeyNotFound</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 检查租约</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> kv.Lease </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> s.lessor </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> s.lessor.</span><span class="__shiki_1t8gfj">IsExpired</span><span class="__shiki_140thh">(kv.Lease) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, ErrKeyNotFound</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> kv, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MVCCStore</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">getKeyValue</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">rev</span><span class="__shiki_1t8gfj"> revision</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">ver</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">KeyValue</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 从后端存储读取</span></span>
<span class="line"><span class="__shiki_140thh">    backend </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.backend</span></span>
<span class="line"><span class="__shiki_140thh">    tx </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> backend.</span><span class="__shiki_1t8gfj">ReadTx</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    tx.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> tx.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 构建存储键</span></span>
<span class="line"><span class="__shiki_140thh">    storeKey </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> encodeKey</span><span class="__shiki_140thh">(key, rev)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 从key bucket读取</span></span>
<span class="line"><span class="__shiki_140thh">    keys, vals </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> tx.</span><span class="__shiki_1t8gfj">UnsafeRange</span><span class="__shiki_140thh">(keyBucketName, storeKey, </span><span class="__shiki_dzsirb">nil</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(keys) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 解码值</span></span>
<span class="line"><span class="__shiki_140thh">    kv </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">KeyValue</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> kv.</span><span class="__shiki_1t8gfj">Unmarshal</span><span class="__shiki_140thh">(vals[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    kv.Version </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ver</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> kv</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_4-3-2-写操作实现" tabindex="-1">4.3.2 写操作实现 <a class="header-anchor" href="#_4-3-2-写操作实现" aria-label="Permalink to &quot;4.3.2 写操作实现&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// MVCC写操作</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MVCCStore</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Put</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">value</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">leaseID</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) (</span><span class="__shiki_1t8gfj">revision</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取写锁</span></span>
<span class="line"><span class="__shiki_140thh">    s.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> s.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 生成新的修订版本</span></span>
<span class="line"><span class="__shiki_140thh">    rev </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.currentRev</span></span>
<span class="line"><span class="__shiki_140thh">    rev.sub</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 更新内存索引</span></span>
<span class="line"><span class="__shiki_140thh">    modified </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> rev</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> ver </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查键是否已存在</span></span>
<span class="line"><span class="__shiki_140thh">    oldModified, oldVer, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.index.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(key, rev.main</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 键已存在，更新版本</span></span>
<span class="line"><span class="__shiki_140thh">        s.index.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(rev.main, rev.sub)</span></span>
<span class="line"><span class="__shiki_140thh">        ver </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> oldVer </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 键不存在，创建新的generation</span></span>
<span class="line"><span class="__shiki_140thh">        s.index.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(rev.main, rev.sub)</span></span>
<span class="line"><span class="__shiki_140thh">        ver </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 准备要存储的KeyValue</span></span>
<span class="line"><span class="__shiki_140thh">    kv </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">KeyValue</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        Key:            key,</span></span>
<span class="line"><span class="__shiki_140thh">        Value:          value,</span></span>
<span class="line"><span class="__shiki_140thh">        CreateRevision: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 将在下面设置</span></span>
<span class="line"><span class="__shiki_140thh">        ModRevision:    rev.main,</span></span>
<span class="line"><span class="__shiki_140thh">        Version:        ver,</span></span>
<span class="line"><span class="__shiki_140thh">        Lease:          leaseID,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 如果是创建操作，设置CreateRevision</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> oldModified </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">revision</span><span class="__shiki_140thh">{}) {</span></span>
<span class="line"><span class="__shiki_140thh">        kv.CreateRevision </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> rev.main</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 获取之前的键值对以获取CreateRevision</span></span>
<span class="line"><span class="__shiki_140thh">        oldKv </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.</span><span class="__shiki_1t8gfj">getKeyValue</span><span class="__shiki_140thh">(key, oldModified, oldVer)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> oldKv </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            kv.CreateRevision </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> oldKv.CreateRevision</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 存储到后端</span></span>
<span class="line"><span class="__shiki_140thh">    s.</span><span class="__shiki_1t8gfj">saveKeyValue</span><span class="__shiki_140thh">(key, rev, kv)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 更新租约关联</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> leaseID </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        s.</span><span class="__shiki_1t8gfj">attachLease</span><span class="__shiki_140thh">(leaseID, key)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 更新当前修订版本</span></span>
<span class="line"><span class="__shiki_140thh">    s.currentRev </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> rev</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> rev, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MVCCStore</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">saveKeyValue</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">rev</span><span class="__shiki_1t8gfj"> revision</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">kv</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">KeyValue</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 编码键值对</span></span>
<span class="line"><span class="__shiki_140thh">    data, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> kv.</span><span class="__shiki_1t8gfj">Marshal</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取批量事务</span></span>
<span class="line"><span class="__shiki_140thh">    tx </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.backend.</span><span class="__shiki_1t8gfj">BatchTx</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    tx.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> tx.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 存储到key bucket</span></span>
<span class="line"><span class="__shiki_140thh">    storeKey </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> encodeKey</span><span class="__shiki_140thh">(key, rev)</span></span>
<span class="line"><span class="__shiki_140thh">    tx.</span><span class="__shiki_1t8gfj">UnsafePut</span><span class="__shiki_140thh">(keyBucketName, storeKey, data)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第五部分-事务在mvcc上的实现" tabindex="-1">第五部分：事务在MVCC上的实现 <a class="header-anchor" href="#第五部分-事务在mvcc上的实现" aria-label="Permalink to &quot;第五部分：事务在MVCC上的实现&quot;">​</a></h2><h3 id="_5-1-事务的原子性保证" tabindex="-1">5.1 事务的原子性保证 <a class="header-anchor" href="#_5-1-事务的原子性保证" aria-label="Permalink to &quot;5.1 事务的原子性保证&quot;">​</a></h3><h4 id="_5-1-1-基于raft的事务原子性" tabindex="-1">5.1.1 基于Raft的事务原子性 <a class="header-anchor" href="#_5-1-1-基于raft的事务原子性" aria-label="Permalink to &quot;5.1.1 基于Raft的事务原子性&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 通过Raft保证事务原子性</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">EtcdServer</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">processTxnThroughRaft</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">txn</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnRequest</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnResponse</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 创建Raft日志条目</span></span>
<span class="line"><span class="__shiki_140thh">    entry </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entry</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        Term:  s.raft.Term,</span></span>
<span class="line"><span class="__shiki_140thh">        Index: s.raft.</span><span class="__shiki_1t8gfj">LastIndex</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        Type:  pb.EntryNormal,</span></span>
<span class="line"><span class="__shiki_140thh">        Data:  </span><span class="__shiki_1t8gfj">mustMarshal</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">InternalRaftRequest</span><span class="__shiki_140thh">{Txn: txn}),</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 提交到Raft集群</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.raft.</span><span class="__shiki_1t8gfj">ProposeEntry</span><span class="__shiki_140thh">(entry); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 等待提交和应用</span></span>
<span class="line"><span class="__shiki_140thh">    applied </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.</span><span class="__shiki_1t8gfj">waitApplied</span><span class="__shiki_140thh">(entry.Index)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 获取结果</span></span>
<span class="line"><span class="__shiki_1itgoe">    select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">applied:</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> result.err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, result.err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> result.resp.(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnResponse</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">time.</span><span class="__shiki_1t8gfj">After</span><span class="__shiki_140thh">(s.cfg.ReqTimeout):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, ErrTimeout</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 状态机应用事务</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">EtcdServer</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">applyTxnToStateMachine</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">txn</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnRequest</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">rev</span><span class="__shiki_1t8gfj"> revision</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">applyResult</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 开始事务</span></span>
<span class="line"><span class="__shiki_140thh">    s.mvccStore.</span><span class="__shiki_1t8gfj">begin</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> s.mvccStore.</span><span class="__shiki_1t8gfj">end</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 评估条件</span></span>
<span class="line"><span class="__shiki_140thh">    succeeded </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.</span><span class="__shiki_1t8gfj">evaluateConditions</span><span class="__shiki_140thh">(txn.Compare, rev)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> responses []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ResponseOp</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 执行操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> succeeded {</span></span>
<span class="line"><span class="__shiki_140thh">        responses </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> s.</span><span class="__shiki_1t8gfj">executeOperations</span><span class="__shiki_140thh">(txn.Success, rev)</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        responses </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> s.</span><span class="__shiki_1t8gfj">executeOperations</span><span class="__shiki_140thh">(txn.Failure, rev)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 提交事务</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.mvccStore.</span><span class="__shiki_1t8gfj">commit</span><span class="__shiki_140thh">(); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">applyResult</span><span class="__shiki_140thh">{err: err}</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">applyResult</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        resp: </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnResponse</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            Header:    </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ResponseHeader</span><span class="__shiki_140thh">{Revision: rev.main},</span></span>
<span class="line"><span class="__shiki_140thh">            Succeeded: succeeded,</span></span>
<span class="line"><span class="__shiki_140thh">            Responses: responses,</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_5-1-2-写集冲突检测" tabindex="-1">5.1.2 写集冲突检测 <a class="header-anchor" href="#_5-1-2-写集冲突检测" aria-label="Permalink to &quot;5.1.2 写集冲突检测&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 事务写集管理</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> transactionWriteSet</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    writes </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">writeOp</span><span class="__shiki_21nrsd">  // key -&gt; 写操作</span></span>
<span class="line"><span class="__shiki_140thh">    mu     </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Mutex</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> writeOp</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    key       []</span><span class="__shiki_1itgoe">byte</span></span>
<span class="line"><span class="__shiki_140thh">    value     []</span><span class="__shiki_1itgoe">byte</span></span>
<span class="line"><span class="__shiki_140thh">    leaseID   </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">    isDelete  </span><span class="__shiki_1itgoe">bool</span></span>
<span class="line"><span class="__shiki_140thh">    prevKv    </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">KeyValue</span><span class="__shiki_21nrsd">  // 之前的键值对（用于PrevKv）</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">ws </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">transactionWriteSet</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">addPut</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">value</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">leaseID</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">prevKv</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">KeyValue</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    ws.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> ws.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    ws.writes[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">(key)] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">writeOp</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        key:      key,</span></span>
<span class="line"><span class="__shiki_140thh">        value:    value,</span></span>
<span class="line"><span class="__shiki_140thh">        leaseID:  leaseID,</span></span>
<span class="line"><span class="__shiki_140thh">        isDelete: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        prevKv:   prevKv,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">ws </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">transactionWriteSet</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">addDelete</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">prevKv</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">KeyValue</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    ws.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> ws.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    ws.writes[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">(key)] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">writeOp</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        key:      key,</span></span>
<span class="line"><span class="__shiki_140thh">        isDelete: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        prevKv:   prevKv,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 检测写冲突</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">ws </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">transactionWriteSet</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">checkConflicts</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">other</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">transactionWriteSet</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    ws.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    other.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> ws.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> other.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> key </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> ws.writes {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> _, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> other.writes[key]; ok {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_21nrsd">  // 写冲突</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-事务的一致性保证" tabindex="-1">5.2 事务的一致性保证 <a class="header-anchor" href="#_5-2-事务的一致性保证" aria-label="Permalink to &quot;5.2 事务的一致性保证&quot;">​</a></h3><h4 id="_5-2-1-线性一致性读写" tabindex="-1">5.2.1 线性一致性读写 <a class="header-anchor" href="#_5-2-1-线性一致性读写" aria-label="Permalink to &quot;5.2.1 线性一致性读写&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 线性一致性事务</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> LinearizableTxn</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    mvccStore </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MVCCStore</span></span>
<span class="line"><span class="__shiki_140thh">    readRev   </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">      // 读取时的修订版本</span></span>
<span class="line"><span class="__shiki_140thh">    writeSet  </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">transactionWriteSet</span></span>
<span class="line"><span class="__shiki_140thh">    conditions []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Compare</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">lt </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">LinearizableTxn</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Begin</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取当前修订版本作为快照</span></span>
<span class="line"><span class="__shiki_140thh">    lt.readRev </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> lt.mvccStore.</span><span class="__shiki_1t8gfj">currentRevision</span><span class="__shiki_140thh">().main</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证条件</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, cond </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> lt.conditions {</span></span>
<span class="line"><span class="__shiki_140thh">        kv, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> lt.mvccStore.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(cond.Key, lt.readRev)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> ErrKeyNotFound {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">lt.</span><span class="__shiki_1t8gfj">evaluateCondition</span><span class="__shiki_140thh">(cond, kv) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> ErrConditionFailed</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">lt </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">LinearizableTxn</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Commit</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">rev</span><span class="__shiki_1t8gfj"> revision</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 验证条件仍然成立</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, cond </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> lt.conditions {</span></span>
<span class="line"><span class="__shiki_140thh">        kv, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> lt.mvccStore.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(cond.Key, rev.main)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> ErrKeyNotFound {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">lt.</span><span class="__shiki_1t8gfj">evaluateCondition</span><span class="__shiki_140thh">(cond, kv) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> ErrConditionFailed</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 应用写集</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, op </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> lt.writeSet.writes {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> op.isDelete {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> _, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> lt.mvccStore.</span><span class="__shiki_1t8gfj">Delete</span><span class="__shiki_140thh">(op.key, rev); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> _, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> lt.mvccStore.</span><span class="__shiki_1t8gfj">Put</span><span class="__shiki_140thh">(op.key, op.value, op.leaseID); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_5-2-2-事务的持久化" tabindex="-1">5.2.2 事务的持久化 <a class="header-anchor" href="#_5-2-2-事务的持久化" aria-label="Permalink to &quot;5.2.2 事务的持久化&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 事务的WAL记录</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> TxnWALRecord</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    TxnID      []</span><span class="__shiki_1itgoe">byte</span></span>
<span class="line"><span class="__shiki_140thh">    Conditions []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Compare</span></span>
<span class="line"><span class="__shiki_140thh">    Operations []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RequestOp</span></span>
<span class="line"><span class="__shiki_140thh">    Timestamp  </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">    ClientID   []</span><span class="__shiki_1itgoe">byte</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 事务恢复</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> recoverTransactionsFromWAL</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">wal</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">wal</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">WAL</span><span class="__shiki_140thh">) ([]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TxnWALRecord</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> txns []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TxnWALRecord</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 读取WAL条目</span></span>
<span class="line"><span class="__shiki_140thh">    entries, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> wal.</span><span class="__shiki_1t8gfj">ReadAll</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, entry </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> entries {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> entry.Type </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> walpb.ENTRY_TYPE_TXN {</span></span>
<span class="line"><span class="__shiki_1itgoe">            var</span><span class="__shiki_140thh"> txnRec </span><span class="__shiki_1t8gfj">TxnWALRecord</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> txnRec.</span><span class="__shiki_1t8gfj">Unmarshal</span><span class="__shiki_140thh">(entry.Data); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                continue</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 检查事务是否已完成</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_1t8gfj">isTxnCompleted</span><span class="__shiki_140thh">(txnRec.TxnID) {</span></span>
<span class="line"><span class="__shiki_140thh">                txns </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(txns, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">txnRec)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> txns, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 重放未完成的事务</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> replayPendingTransactions</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">txns</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TxnWALRecord</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">store</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">MVCCStore</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, txn </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> txns {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 重新评估条件</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_1t8gfj">evaluateConditions</span><span class="__shiki_140thh">(txn.Conditions, store) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            continue</span><span class="__shiki_21nrsd">  // 条件不再成立，跳过</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 重放操作</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, op </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> txn.Operations {</span></span>
<span class="line"><span class="__shiki_1itgoe">            switch</span><span class="__shiki_140thh"> req </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> op.Request.(</span><span class="__shiki_1itgoe">type</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RequestOp_RequestPut</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                store.</span><span class="__shiki_1t8gfj">Put</span><span class="__shiki_140thh">(req.RequestPut.Key, req.RequestPut.Value, req.RequestPut.Lease)</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RequestOp_RequestDeleteRange</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                store.</span><span class="__shiki_1t8gfj">DeleteRange</span><span class="__shiki_140thh">(req.RequestDeleteRange.Key, req.RequestDeleteRange.RangeEnd)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-3-事务的性能优化" tabindex="-1">5.3 事务的性能优化 <a class="header-anchor" href="#_5-3-事务的性能优化" aria-label="Permalink to &quot;5.3 事务的性能优化&quot;">​</a></h3><h4 id="_5-3-1-批量事务处理" tabindex="-1">5.3.1 批量事务处理 <a class="header-anchor" href="#_5-3-1-批量事务处理" aria-label="Permalink to &quot;5.3.1 批量事务处理&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 批量事务管理器</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> BatchTxnManager</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    pendingTxns []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pendingTxn</span></span>
<span class="line"><span class="__shiki_140thh">    batchSize   </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    batchChan   </span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">txnBatch</span></span>
<span class="line"><span class="__shiki_140thh">    mu          </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Mutex</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> pendingTxn</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    txn      </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnRequest</span></span>
<span class="line"><span class="__shiki_140thh">    respChan </span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnResponse</span></span>
<span class="line"><span class="__shiki_140thh">    errChan  </span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> error</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> txnBatch</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    txns []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pendingTxn</span></span>
<span class="line"><span class="__shiki_140thh">    rev  </span><span class="__shiki_1t8gfj">revision</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">btm </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">BatchTxnManager</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Submit</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">txn</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnRequest</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnResponse</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    pt </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">pendingTxn</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        txn:      txn,</span></span>
<span class="line"><span class="__shiki_140thh">        respChan: </span><span class="__shiki_1t8gfj">make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnResponse</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        errChan:  </span><span class="__shiki_1t8gfj">make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> error</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    btm.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    btm.pendingTxns </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(btm.pendingTxns, pt)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 达到批量大小时提交</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(btm.pendingTxns) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> btm.batchSize {</span></span>
<span class="line"><span class="__shiki_140thh">        batch </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> btm.</span><span class="__shiki_1t8gfj">createBatch</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        btm.pendingTxns </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">        btm.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        btm.batchChan </span><span class="__shiki_1itgoe">&lt;-</span><span class="__shiki_140thh"> batch</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        btm.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 等待结果</span></span>
<span class="line"><span class="__shiki_1itgoe">    select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> resp </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">pt.respChan:</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> resp, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">pt.errChan:</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">time.</span><span class="__shiki_1t8gfj">After</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">5</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> time.Second):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, ErrTimeout</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">btm </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">BatchTxnManager</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">processBatches</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> batch </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> btm.batchChan {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 批量处理事务</span></span>
<span class="line"><span class="__shiki_140thh">        results </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> btm.</span><span class="__shiki_1t8gfj">processBatch</span><span class="__shiki_140thh">(batch)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 发送结果</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> i, result </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> results {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> result.err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                batch.txns[i].errChan </span><span class="__shiki_1itgoe">&lt;-</span><span class="__shiki_140thh"> result.err</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                batch.txns[i].respChan </span><span class="__shiki_1itgoe">&lt;-</span><span class="__shiki_140thh"> result.resp</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_5-3-2-读写分离优化" tabindex="-1">5.3.2 读写分离优化 <a class="header-anchor" href="#_5-3-2-读写分离优化" aria-label="Permalink to &quot;5.3.2 读写分离优化&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 读写分离的事务处理</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> ReadWriteSplitTxn</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    readStore  </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MVCCStore</span><span class="__shiki_21nrsd">  // 只读副本</span></span>
<span class="line"><span class="__shiki_140thh">    writeStore </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MVCCStore</span><span class="__shiki_21nrsd">  // 主副本</span></span>
<span class="line"><span class="__shiki_140thh">    readRev    </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">rwst </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">ReadWriteSplitTxn</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Begin</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 从只读副本获取读取快照</span></span>
<span class="line"><span class="__shiki_140thh">    rwst.readRev </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> rwst.readStore.</span><span class="__shiki_1t8gfj">currentRevision</span><span class="__shiki_140thh">().main</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">rwst </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">ReadWriteSplitTxn</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">EvaluateConditions</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">conditions</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Compare</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 在只读副本上评估条件</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, cond </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> conditions {</span></span>
<span class="line"><span class="__shiki_140thh">        kv, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> rwst.readStore.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(cond.Key, rwst.readRev)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> ErrKeyNotFound {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_1t8gfj">evaluateCondition</span><span class="__shiki_140thh">(cond, kv) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">rwst </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">ReadWriteSplitTxn</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Commit</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">operations</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RequestOp</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 在主副本上执行写操作</span></span>
<span class="line"><span class="__shiki_140thh">    rev </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> rwst.writeStore.</span><span class="__shiki_1t8gfj">currentRevision</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, op </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> operations {</span></span>
<span class="line"><span class="__shiki_1itgoe">        switch</span><span class="__shiki_140thh"> req </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> op.Request.(</span><span class="__shiki_1itgoe">type</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RequestOp_RequestPut</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            rwst.writeStore.</span><span class="__shiki_1t8gfj">Put</span><span class="__shiki_140thh">(req.RequestPut.Key, req.RequestPut.Value, req.RequestPut.Lease)</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RequestOp_RequestDeleteRange</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            rwst.writeStore.</span><span class="__shiki_1t8gfj">DeleteRange</span><span class="__shiki_140thh">(req.RequestDeleteRange.Key, req.RequestDeleteRange.RangeEnd)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 同步到只读副本</span></span>
<span class="line"><span class="__shiki_140thh">    rwst.</span><span class="__shiki_1t8gfj">syncToReadStore</span><span class="__shiki_140thh">(rev)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第六部分-mvcc维护与压缩" tabindex="-1">第六部分：MVCC维护与压缩 <a class="header-anchor" href="#第六部分-mvcc维护与压缩" aria-label="Permalink to &quot;第六部分：MVCC维护与压缩&quot;">​</a></h2><h3 id="_6-1-数据压缩机制" tabindex="-1">6.1 数据压缩机制 <a class="header-anchor" href="#_6-1-数据压缩机制" aria-label="Permalink to &quot;6.1 数据压缩机制&quot;">​</a></h3><h4 id="_6-1-1-压缩策略" tabindex="-1">6.1.1 压缩策略 <a class="header-anchor" href="#_6-1-1-压缩策略" aria-label="Permalink to &quot;6.1.1 压缩策略&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 压缩管理器</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Compactor</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    store        </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MVCCStore</span></span>
<span class="line"><span class="__shiki_140thh">    compactRev   </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">              // 压缩到的修订版本</span></span>
<span class="line"><span class="__shiki_140thh">    compactChan  </span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1t8gfj"> compactTask</span></span>
<span class="line"><span class="__shiki_140thh">    stopChan     </span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">    mu           </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RWMutex</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> compactTask</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    rev  </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">    mode </span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">CompactionMode</span></span>
<span class="line"><span class="__shiki_140thh">    done </span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> error</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 压缩算法</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">c </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Compactor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">compact</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">rev</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    c.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> c.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 获取需要压缩的修订版本范围</span></span>
<span class="line"><span class="__shiki_140thh">    revisions </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> c.</span><span class="__shiki_1t8gfj">getRevisionsToCompact</span><span class="__shiki_140thh">(rev)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 遍历所有键，清理旧版本</span></span>
<span class="line"><span class="__shiki_140thh">    deleted </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> c.</span><span class="__shiki_1t8gfj">compactKeys</span><span class="__shiki_140thh">(revisions)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 更新索引</span></span>
<span class="line"><span class="__shiki_140thh">    c.</span><span class="__shiki_1t8gfj">updateIndexAfterCompaction</span><span class="__shiki_140thh">(rev, deleted)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 清理后端存储</span></span>
<span class="line"><span class="__shiki_140thh">    c.</span><span class="__shiki_1t8gfj">cleanupBackend</span><span class="__shiki_140thh">(deleted)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 更新压缩指针</span></span>
<span class="line"><span class="__shiki_140thh">    c.compactRev </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> rev</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">c </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Compactor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">getRevisionsToCompact</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">rev</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) []</span><span class="__shiki_1t8gfj">revisionRange</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> ranges []</span><span class="__shiki_1t8gfj">revisionRange</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取所有键的旧版本</span></span>
<span class="line"><span class="__shiki_140thh">    c.store.index.tree.</span><span class="__shiki_1t8gfj">Ascend</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">item</span><span class="__shiki_1t8gfj"> btree</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Item</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        ki </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> item.(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">keyIndex</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 查找需要清理的修订版本</span></span>
<span class="line"><span class="__shiki_140thh">        compacted </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> ki.</span><span class="__shiki_1t8gfj">findCompactedRevisions</span><span class="__shiki_140thh">(rev)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(compacted) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            ranges </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(ranges, </span><span class="__shiki_1t8gfj">revisionRange</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">                key:  ki.key,</span></span>
<span class="line"><span class="__shiki_140thh">                revs: compacted,</span></span>
<span class="line"><span class="__shiki_140thh">            })</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> ranges</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">c </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Compactor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">compactKeys</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ranges</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">revisionRange</span><span class="__shiki_140thh">) []</span><span class="__shiki_1t8gfj">revision</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> deleted []</span><span class="__shiki_1t8gfj">revision</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    backend </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> c.store.backend.</span><span class="__shiki_1t8gfj">BatchTx</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    backend.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> backend.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, r </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> ranges {</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, rev </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> r.revs {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 构建存储键</span></span>
<span class="line"><span class="__shiki_140thh">            storeKey </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> encodeKey</span><span class="__shiki_140thh">(r.key, rev)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 从后端删除</span></span>
<span class="line"><span class="__shiki_140thh">            backend.</span><span class="__shiki_1t8gfj">UnsafeDelete</span><span class="__shiki_140thh">(keyBucketName, storeKey)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            deleted </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(deleted, rev)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    backend.</span><span class="__shiki_1t8gfj">Commit</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> deleted</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_6-1-2-压缩触发条件" tabindex="-1">6.1.2 压缩触发条件 <a class="header-anchor" href="#_6-1-2-压缩触发条件" aria-label="Permalink to &quot;6.1.2 压缩触发条件&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 自动压缩策略</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> AutoCompactionPolicy</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    mode          </span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">CompactionMode</span></span>
<span class="line"><span class="__shiki_140thh">    retention     </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">    retentionRev  </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">    checkInterval </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">    compactor     </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Compactor</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">acp </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">AutoCompactionPolicy</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">run</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    ticker </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">NewTicker</span><span class="__shiki_140thh">(acp.checkInterval)</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> ticker.</span><span class="__shiki_1t8gfj">Stop</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">ticker.C:</span></span>
<span class="line"><span class="__shiki_140thh">            acp.</span><span class="__shiki_1t8gfj">checkAndCompact</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">acp </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">AutoCompactionPolicy</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">checkAndCompact</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    currentRev </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> acp.compactor.store.</span><span class="__shiki_1t8gfj">currentRevision</span><span class="__shiki_140thh">().main</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> compactRev </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    switch</span><span class="__shiki_140thh"> acp.mode {</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> pb.CompactionMode_PERIODIC:</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 基于时间的压缩</span></span>
<span class="line"><span class="__shiki_140thh">        compactRev </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> currentRev </span><span class="__shiki_1itgoe">-</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">(acp.retention.</span><span class="__shiki_1t8gfj">Seconds</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> pb.CompactionMode_REVISION:</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 基于修订版本的压缩</span></span>
<span class="line"><span class="__shiki_140thh">        compactRev </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> currentRev </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> acp.retentionRev</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 确保压缩修订版本有效</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> compactRev </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_140thh"> acp.compactor.compactRev {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 执行压缩</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> acp.compactor.</span><span class="__shiki_1t8gfj">compact</span><span class="__shiki_140thh">(compactRev); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Compaction failed: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 手动压缩API</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">EtcdServer</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Compact</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">req</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">CompactionRequest</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">CompactionResponse</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证请求</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> req.Revision </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_140thh"> s.compactor.compactRev {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, ErrCompacted</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> req.Revision </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> s.</span><span class="__shiki_1t8gfj">currentRevision</span><span class="__shiki_140thh">().main {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, ErrFutureRev</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 执行压缩</span></span>
<span class="line"><span class="__shiki_140thh">    task </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> compactTask</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        rev:  req.Revision,</span></span>
<span class="line"><span class="__shiki_140thh">        mode: req.Mode,</span></span>
<span class="line"><span class="__shiki_140thh">        done: </span><span class="__shiki_1t8gfj">make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> error</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> s.compactor.compactChan </span><span class="__shiki_1itgoe">&lt;-</span><span class="__shiki_140thh"> task:</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">ctx.</span><span class="__shiki_1t8gfj">Done</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, ctx.</span><span class="__shiki_1t8gfj">Err</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 等待完成</span></span>
<span class="line"><span class="__shiki_1itgoe">    select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">task.done:</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">ctx.</span><span class="__shiki_1t8gfj">Done</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, ctx.</span><span class="__shiki_1t8gfj">Err</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">CompactionResponse</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        Header: </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ResponseHeader</span><span class="__shiki_140thh">{Revision: s.</span><span class="__shiki_1t8gfj">currentRevision</span><span class="__shiki_140thh">().main},</span></span>
<span class="line"><span class="__shiki_140thh">    }, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-快照管理" tabindex="-1">6.2 快照管理 <a class="header-anchor" href="#_6-2-快照管理" aria-label="Permalink to &quot;6.2 快照管理&quot;">​</a></h3><h4 id="_6-2-1-快照创建" tabindex="-1">6.2.1 快照创建 <a class="header-anchor" href="#_6-2-1-快照创建" aria-label="Permalink to &quot;6.2.1 快照创建&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// MVCC快照</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Snapshot</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    store    </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MVCCStore</span></span>
<span class="line"><span class="__shiki_140thh">    rev      </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">               // 快照修订版本</span></span>
<span class="line"><span class="__shiki_140thh">    data     []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_21nrsd">              // 序列化数据</span></span>
<span class="line"><span class="__shiki_140thh">    checksum </span><span class="__shiki_1itgoe">uint32</span><span class="__shiki_21nrsd">              // 校验和</span></span>
<span class="line"><span class="__shiki_140thh">    metadata </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">string</span><span class="__shiki_21nrsd">   // 元数据</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MVCCStore</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">CreateSnapshot</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">rev</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Snapshot</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取读锁</span></span>
<span class="line"><span class="__shiki_140thh">    s.mu.</span><span class="__shiki_1t8gfj">RLock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> s.mu.</span><span class="__shiki_1t8gfj">RUnlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建快照</span></span>
<span class="line"><span class="__shiki_140thh">    snapshot </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">Snapshot</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        store:    s,</span></span>
<span class="line"><span class="__shiki_140thh">        rev:      rev,</span></span>
<span class="line"><span class="__shiki_140thh">        metadata: </span><span class="__shiki_1t8gfj">make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 序列化索引</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> snapshot.</span><span class="__shiki_1t8gfj">serializeIndex</span><span class="__shiki_140thh">(); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 序列化数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> snapshot.</span><span class="__shiki_1t8gfj">serializeData</span><span class="__shiki_140thh">(); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 计算校验和</span></span>
<span class="line"><span class="__shiki_140thh">    snapshot.checksum </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> snapshot.</span><span class="__shiki_1t8gfj">calculateChecksum</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 添加元数据</span></span>
<span class="line"><span class="__shiki_140thh">    snapshot.metadata[</span><span class="__shiki_mdbnqw">&quot;revision&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> strconv.</span><span class="__shiki_1t8gfj">FormatInt</span><span class="__shiki_140thh">(rev, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    snapshot.metadata[</span><span class="__shiki_mdbnqw">&quot;timestamp&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">UTC</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">Format</span><span class="__shiki_140thh">(time.RFC3339)</span></span>
<span class="line"><span class="__shiki_140thh">    snapshot.metadata[</span><span class="__shiki_mdbnqw">&quot;key_count&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> strconv.</span><span class="__shiki_1t8gfj">Itoa</span><span class="__shiki_140thh">(snapshot.</span><span class="__shiki_1t8gfj">keyCount</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> snapshot, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Snapshot</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">serializeIndex</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> buf </span><span class="__shiki_1t8gfj">bytes</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Buffer</span></span>
<span class="line"><span class="__shiki_140thh">    encoder </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> gob.</span><span class="__shiki_1t8gfj">NewEncoder</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">buf)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 序列化索引树</span></span>
<span class="line"><span class="__shiki_140thh">    items </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">keyIndex</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    s.store.index.tree.</span><span class="__shiki_1t8gfj">Ascend</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">item</span><span class="__shiki_1t8gfj"> btree</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Item</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        ki </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> item.(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">keyIndex</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 只包含在快照修订版本时存在的键</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> _, _, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> ki.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(s.rev); err </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            items </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(items, ki)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> encoder.</span><span class="__shiki_1t8gfj">Encode</span><span class="__shiki_140thh">(items); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    s.data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> buf.</span><span class="__shiki_1t8gfj">Bytes</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_6-2-2-快照恢复" tabindex="-1">6.2.2 快照恢复 <a class="header-anchor" href="#_6-2-2-快照恢复" aria-label="Permalink to &quot;6.2.2 快照恢复&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 从快照恢复</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MVCCStore</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">RestoreFromSnapshot</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">snapshot</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">Snapshot</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取写锁</span></span>
<span class="line"><span class="__shiki_140thh">    s.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> s.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 验证快照</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> snapshot.</span><span class="__shiki_1t8gfj">validate</span><span class="__shiki_140thh">(); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 清空当前存储</span></span>
<span class="line"><span class="__shiki_140thh">    s.</span><span class="__shiki_1t8gfj">clear</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 恢复索引</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.</span><span class="__shiki_1t8gfj">restoreIndex</span><span class="__shiki_140thh">(snapshot); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 恢复数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.</span><span class="__shiki_1t8gfj">restoreData</span><span class="__shiki_140thh">(snapshot); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 更新修订版本</span></span>
<span class="line"><span class="__shiki_140thh">    s.currentRev </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> revision</span><span class="__shiki_140thh">{main: snapshot.rev, sub: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Snapshot</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">validate</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查校验和</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> s.</span><span class="__shiki_1t8gfj">calculateChecksum</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> s.checksum {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> ErrChecksumMismatch</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查修订版本</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> s.rev </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> ErrInvalidRevision</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MVCCStore</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">restoreIndex</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">snapshot</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">Snapshot</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 解码索引数据</span></span>
<span class="line"><span class="__shiki_140thh">    buf </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> bytes.</span><span class="__shiki_1t8gfj">NewBuffer</span><span class="__shiki_140thh">(snapshot.data)</span></span>
<span class="line"><span class="__shiki_140thh">    decoder </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> gob.</span><span class="__shiki_1t8gfj">NewDecoder</span><span class="__shiki_140thh">(buf)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> items []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">keyIndex</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> decoder.</span><span class="__shiki_1t8gfj">Decode</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">items); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 重建B树索引</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, ki </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> items {</span></span>
<span class="line"><span class="__shiki_140thh">        s.index.tree.</span><span class="__shiki_1t8gfj">ReplaceOrInsert</span><span class="__shiki_140thh">(ki)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第七部分-高级事务模式与优化" tabindex="-1">第七部分：高级事务模式与优化 <a class="header-anchor" href="#第七部分-高级事务模式与优化" aria-label="Permalink to &quot;第七部分：高级事务模式与优化&quot;">​</a></h2><h3 id="_7-1-分布式事务模式" tabindex="-1">7.1 分布式事务模式 <a class="header-anchor" href="#_7-1-分布式事务模式" aria-label="Permalink to &quot;7.1 分布式事务模式&quot;">​</a></h3><h4 id="_7-1-1-两阶段提交-2pc-模拟" tabindex="-1">7.1.1 两阶段提交（2PC）模拟 <a class="header-anchor" href="#_7-1-1-两阶段提交-2pc-模拟" aria-label="Permalink to &quot;7.1.1 两阶段提交（2PC）模拟&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 基于etcd的两阶段提交协调者</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> TwoPhaseCoordinator</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    client     </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">clientv3</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Client</span></span>
<span class="line"><span class="__shiki_140thh">    txnKey     </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    participants []</span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    timeout    </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">tpc </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TwoPhaseCoordinator</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Begin</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">transactionID</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">operations</span><span class="__shiki_1itgoe"> map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1t8gfj">Operation</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 阶段1：准备阶段</span></span>
<span class="line"><span class="__shiki_140thh">    prepared </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> tpc.</span><span class="__shiki_1t8gfj">preparePhase</span><span class="__shiki_140thh">(transactionID, operations)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">prepared {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> tpc.</span><span class="__shiki_1t8gfj">rollback</span><span class="__shiki_140thh">(transactionID)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 阶段2：提交阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> tpc.</span><span class="__shiki_1t8gfj">commitPhase</span><span class="__shiki_140thh">(transactionID)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">tpc </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TwoPhaseCoordinator</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">preparePhase</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">transactionID</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">operations</span><span class="__shiki_1itgoe"> map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1t8gfj">Operation</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 在etcd中记录事务状态</span></span>
<span class="line"><span class="__shiki_140thh">    txn </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> tpc.client.</span><span class="__shiki_1t8gfj">Txn</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查事务是否已存在</span></span>
<span class="line"><span class="__shiki_140thh">    txn </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> txn.</span><span class="__shiki_1t8gfj">If</span><span class="__shiki_140thh">(clientv3.</span><span class="__shiki_1t8gfj">Compare</span><span class="__shiki_140thh">(clientv3.</span><span class="__shiki_1t8gfj">Version</span><span class="__shiki_140thh">(tpc.</span><span class="__shiki_1t8gfj">getTxnKey</span><span class="__shiki_140thh">(transactionID)), </span><span class="__shiki_mdbnqw">&quot;=&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 记录准备操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> ops []</span><span class="__shiki_1t8gfj">clientv3</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Op</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> key, op </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> operations {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 创建临时键，包含事务ID</span></span>
<span class="line"><span class="__shiki_140thh">        tempKey </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/txn/</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, transactionID, key)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 序列化操作</span></span>
<span class="line"><span class="__shiki_140thh">        data, _ </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> json.</span><span class="__shiki_1t8gfj">Marshal</span><span class="__shiki_140thh">(op)</span></span>
<span class="line"><span class="__shiki_140thh">        ops </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(ops, clientv3.</span><span class="__shiki_1t8gfj">OpPut</span><span class="__shiki_140thh">(tempKey, </span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">(data)))</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 设置事务状态为&quot;准备中&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    ops </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(ops, clientv3.</span><span class="__shiki_1t8gfj">OpPut</span><span class="__shiki_140thh">(tpc.</span><span class="__shiki_1t8gfj">getTxnKey</span><span class="__shiki_140thh">(transactionID), </span><span class="__shiki_mdbnqw">&quot;prepared&quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    txn </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> txn.</span><span class="__shiki_1t8gfj">Then</span><span class="__shiki_140thh">(ops</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 提交事务</span></span>
<span class="line"><span class="__shiki_140thh">    resp, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> txn.</span><span class="__shiki_1t8gfj">Commit</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">resp.Succeeded {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 等待所有参与者确认</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> tpc.</span><span class="__shiki_1t8gfj">waitForParticipants</span><span class="__shiki_140thh">(transactionID, </span><span class="__shiki_mdbnqw">&quot;prepared&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">tpc </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TwoPhaseCoordinator</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">commitPhase</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">transactionID</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 将事务状态改为&quot;已提交&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    txn </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> tpc.client.</span><span class="__shiki_1t8gfj">Txn</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    txn </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> txn.</span><span class="__shiki_1t8gfj">If</span><span class="__shiki_140thh">(clientv3.</span><span class="__shiki_1t8gfj">Compare</span><span class="__shiki_140thh">(clientv3.</span><span class="__shiki_1t8gfj">Value</span><span class="__shiki_140thh">(tpc.</span><span class="__shiki_1t8gfj">getTxnKey</span><span class="__shiki_140thh">(transactionID)), </span><span class="__shiki_mdbnqw">&quot;=&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;prepared&quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    txn </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> txn.</span><span class="__shiki_1t8gfj">Then</span><span class="__shiki_140thh">(clientv3.</span><span class="__shiki_1t8gfj">OpPut</span><span class="__shiki_140thh">(tpc.</span><span class="__shiki_1t8gfj">getTxnKey</span><span class="__shiki_140thh">(transactionID), </span><span class="__shiki_mdbnqw">&quot;committed&quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    resp, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> txn.</span><span class="__shiki_1t8gfj">Commit</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">resp.Succeeded {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 应用所有操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> tpc.</span><span class="__shiki_1t8gfj">applyOperations</span><span class="__shiki_140thh">(transactionID)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_7-1-2-saga事务模式" tabindex="-1">7.1.2 Saga事务模式 <a class="header-anchor" href="#_7-1-2-saga事务模式" aria-label="Permalink to &quot;7.1.2 Saga事务模式&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Saga事务协调器</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> SagaCoordinator</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    client    </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">clientv3</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Client</span></span>
<span class="line"><span class="__shiki_140thh">    sagaKey   </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    steps     []</span><span class="__shiki_1t8gfj">SagaStep</span></span>
<span class="line"><span class="__shiki_140thh">    compensations </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1t8gfj">CompensationFunc</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> SagaStep</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    ID        </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    Execute   </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span></span>
<span class="line"><span class="__shiki_140thh">    Compensate </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span></span>
<span class="line"><span class="__shiki_140thh">    DependsOn []</span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">sc </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">SagaCoordinator</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Execute</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 记录Saga开始</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> sc.</span><span class="__shiki_1t8gfj">recordStart</span><span class="__shiki_140thh">(); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 按顺序执行步骤</span></span>
<span class="line"><span class="__shiki_140thh">    executed </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> i, step </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> sc.steps {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查依赖是否已执行</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">sc.</span><span class="__shiki_1t8gfj">dependenciesSatisfied</span><span class="__shiki_140thh">(step, executed) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;dependencies not satisfied for step </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, step.ID)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 执行步骤</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> step.</span><span class="__shiki_1t8gfj">Execute</span><span class="__shiki_140thh">(); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 执行失败，开始补偿</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> sc.</span><span class="__shiki_1t8gfj">compensate</span><span class="__shiki_140thh">(executed)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 记录步骤完成</span></span>
<span class="line"><span class="__shiki_140thh">        executed[step.ID] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> sc.</span><span class="__shiki_1t8gfj">recordStepCompletion</span><span class="__shiki_140thh">(i); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 记录Saga完成</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> sc.</span><span class="__shiki_1t8gfj">recordCompletion</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">sc </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">SagaCoordinator</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">compensate</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">executed</span><span class="__shiki_1itgoe"> map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 逆序执行补偿操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(sc.steps) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">--</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        step </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> sc.steps[i]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> executed[step.ID] </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> step.Compensate </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> step.</span><span class="__shiki_1t8gfj">Compensate</span><span class="__shiki_140thh">(); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 补偿失败，记录但不停止其他补偿</span></span>
<span class="line"><span class="__shiki_140thh">                sc.</span><span class="__shiki_1t8gfj">recordCompensationFailure</span><span class="__shiki_140thh">(step.ID, err)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            sc.</span><span class="__shiki_1t8gfj">recordCompensation</span><span class="__shiki_140thh">(step.ID)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> ErrSagaFailed</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">sc </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">SagaCoordinator</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">recordStepCompletion</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">stepIndex</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    key </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">/steps/</span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, sc.sagaKey, stepIndex)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    txn </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> sc.client.</span><span class="__shiki_1t8gfj">Txn</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">    txn </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> txn.</span><span class="__shiki_1t8gfj">If</span><span class="__shiki_140thh">(clientv3.</span><span class="__shiki_1t8gfj">Compare</span><span class="__shiki_140thh">(clientv3.</span><span class="__shiki_1t8gfj">Version</span><span class="__shiki_140thh">(key), </span><span class="__shiki_mdbnqw">&quot;=&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    txn </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> txn.</span><span class="__shiki_1t8gfj">Then</span><span class="__shiki_140thh">(clientv3.</span><span class="__shiki_1t8gfj">OpPut</span><span class="__shiki_140thh">(key, </span><span class="__shiki_mdbnqw">&quot;completed&quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    resp, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> txn.</span><span class="__shiki_1t8gfj">Commit</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">resp.Succeeded {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-性能优化策略" tabindex="-1">7.2 性能优化策略 <a class="header-anchor" href="#_7-2-性能优化策略" aria-label="Permalink to &quot;7.2 性能优化策略&quot;">​</a></h3><h4 id="_7-2-1-事务批处理优化" tabindex="-1">7.2.1 事务批处理优化 <a class="header-anchor" href="#_7-2-1-事务批处理优化" aria-label="Permalink to &quot;7.2.1 事务批处理优化&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 智能事务批处理器</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> SmartBatchProcessor</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    txns         []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnRequest</span></span>
<span class="line"><span class="__shiki_140thh">    maxBatchSize </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    analyzer     </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TxnAnalyzer</span></span>
<span class="line"><span class="__shiki_140thh">    scheduler    </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TxnScheduler</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">sbp </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">SmartBatchProcessor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">AddTxn</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">txn</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnRequest</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    sbp.txns </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(sbp.txns, txn)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 达到批处理大小时处理</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(sbp.txns) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> sbp.maxBatchSize {</span></span>
<span class="line"><span class="__shiki_140thh">        sbp.</span><span class="__shiki_1t8gfj">processBatch</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">sbp </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">SmartBatchProcessor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">processBatch</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 分析事务依赖</span></span>
<span class="line"><span class="__shiki_140thh">    dependencyGraph </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> sbp.analyzer.</span><span class="__shiki_1t8gfj">AnalyzeDependencies</span><span class="__shiki_140thh">(sbp.txns)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 调度事务执行顺序</span></span>
<span class="line"><span class="__shiki_140thh">    executionOrder </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> sbp.scheduler.</span><span class="__shiki_1t8gfj">Schedule</span><span class="__shiki_140thh">(dependencyGraph)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 合并无冲突的事务</span></span>
<span class="line"><span class="__shiki_140thh">    mergedTxns </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> sbp.</span><span class="__shiki_1t8gfj">mergeNonConflicting</span><span class="__shiki_140thh">(executionOrder)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 执行批处理</span></span>
<span class="line"><span class="__shiki_140thh">    sbp.</span><span class="__shiki_1t8gfj">executeMerged</span><span class="__shiki_140thh">(mergedTxns)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 清空批处理队列</span></span>
<span class="line"><span class="__shiki_140thh">    sbp.txns </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">sbp </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">SmartBatchProcessor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">mergeNonConflicting</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">txns</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnRequest</span><span class="__shiki_140thh">) []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnRequest</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> merged []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnRequest</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    current </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnRequest</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, txn </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> txns {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查与当前合并事务是否有冲突</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> sbp.</span><span class="__shiki_1t8gfj">hasConflict</span><span class="__shiki_140thh">(current, txn) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 有冲突，提交当前合并事务，开始新的合并</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(current.Success) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(current.Failure) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                merged </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(merged, current)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            current </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> txn</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 无冲突，合并到当前事务</span></span>
<span class="line"><span class="__shiki_140thh">            sbp.</span><span class="__shiki_1t8gfj">mergeTxn</span><span class="__shiki_140thh">(current, txn)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 添加最后一个合并事务</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(current.Success) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(current.Failure) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        merged </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(merged, current)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> merged</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 事务依赖分析器</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> TxnAnalyzer</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    conflictMatrix </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">bool</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">ta </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TxnAnalyzer</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">AnalyzeDependencies</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">txns</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnRequest</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">DependencyGraph</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    graph </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> NewDependencyGraph</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> i, txn1 </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> txns {</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> j, txn2 </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> txns {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> j {</span></span>
<span class="line"><span class="__shiki_1itgoe">                continue</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 检查事务间冲突</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ta.</span><span class="__shiki_1t8gfj">checkConflict</span><span class="__shiki_140thh">(txn1, txn2) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // txn2依赖txn1</span></span>
<span class="line"><span class="__shiki_140thh">                graph.</span><span class="__shiki_1t8gfj">AddDependency</span><span class="__shiki_140thh">(txn1, txn2)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> graph</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_7-2-2-缓存优化" tabindex="-1">7.2.2 缓存优化 <a class="header-anchor" href="#_7-2-2-缓存优化" aria-label="Permalink to &quot;7.2.2 缓存优化&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 事务结果缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> TxnResultCache</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    cache    </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">lru</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Cache</span></span>
<span class="line"><span class="__shiki_140thh">    maxSize  </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    ttl      </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">    mu       </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RWMutex</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> cachedResult</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    result    </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnResponse</span></span>
<span class="line"><span class="__shiki_140thh">    timestamp </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span></span>
<span class="line"><span class="__shiki_140thh">    keyHash   </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">trc </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TxnResultCache</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">txn</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnRequest</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnResponse</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    key </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> trc.</span><span class="__shiki_1t8gfj">generateKey</span><span class="__shiki_140thh">(txn)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    trc.mu.</span><span class="__shiki_1t8gfj">RLock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> trc.mu.</span><span class="__shiki_1t8gfj">RUnlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> val, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> trc.cache.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(key); ok {</span></span>
<span class="line"><span class="__shiki_140thh">        cached </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> val.(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">cachedResult</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查是否过期</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Since</span><span class="__shiki_140thh">(cached.timestamp) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> trc.ttl {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> cached.result, </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 过期，删除</span></span>
<span class="line"><span class="__shiki_140thh">        trc.cache.</span><span class="__shiki_1t8gfj">Remove</span><span class="__shiki_140thh">(key)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">trc </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TxnResultCache</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Put</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">txn</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnRequest</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">result</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnResponse</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    key </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> trc.</span><span class="__shiki_1t8gfj">generateKey</span><span class="__shiki_140thh">(txn)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    cached </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">cachedResult</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        result:    result,</span></span>
<span class="line"><span class="__shiki_140thh">        timestamp: time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        keyHash:   key,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    trc.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> trc.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    trc.cache.</span><span class="__shiki_1t8gfj">Add</span><span class="__shiki_140thh">(key, cached)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">trc </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TxnResultCache</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">generateKey</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">txn</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnRequest</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 生成事务的唯一键</span></span>
<span class="line"><span class="__shiki_140thh">    h </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> sha256.</span><span class="__shiki_1t8gfj">New</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 包含条件部分</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, cmp </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> txn.Compare {</span></span>
<span class="line"><span class="__shiki_140thh">        h.</span><span class="__shiki_1t8gfj">Write</span><span class="__shiki_140thh">(cmp.Key)</span></span>
<span class="line"><span class="__shiki_140thh">        h.</span><span class="__shiki_1t8gfj">Write</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">(fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, cmp.Target)))</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 包含操作部分</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, op </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> txn.Success {</span></span>
<span class="line"><span class="__shiki_140thh">        h.</span><span class="__shiki_1t8gfj">Write</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">(fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, op)))</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, op </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> txn.Failure {</span></span>
<span class="line"><span class="__shiki_140thh">        h.</span><span class="__shiki_1t8gfj">Write</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">(fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, op)))</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> hex.</span><span class="__shiki_1t8gfj">EncodeToString</span><span class="__shiki_140thh">(h.</span><span class="__shiki_1t8gfj">Sum</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">nil</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-3-监控与诊断" tabindex="-1">7.3 监控与诊断 <a class="header-anchor" href="#_7-3-监控与诊断" aria-label="Permalink to &quot;7.3 监控与诊断&quot;">​</a></h3><h4 id="_7-3-1-事务性能指标" tabindex="-1">7.3.1 事务性能指标 <a class="header-anchor" href="#_7-3-1-事务性能指标" aria-label="Permalink to &quot;7.3.1 事务性能指标&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 事务监控指标</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> TxnMetrics</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 计数器</span></span>
<span class="line"><span class="__shiki_140thh">    TxnTotal          </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Counter</span></span>
<span class="line"><span class="__shiki_140thh">    TxnSuccess        </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Counter</span></span>
<span class="line"><span class="__shiki_140thh">    TxnFailed         </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Counter</span></span>
<span class="line"><span class="__shiki_140thh">    TxnRetries        </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Counter</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 直方图</span></span>
<span class="line"><span class="__shiki_140thh">    TxnLatency        </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Histogram</span></span>
<span class="line"><span class="__shiki_140thh">    TxnSize           </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Histogram</span></span>
<span class="line"><span class="__shiki_140thh">    TxnConditionCount </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Histogram</span></span>
<span class="line"><span class="__shiki_140thh">    TxnOperationCount </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Histogram</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 仪表盘</span></span>
<span class="line"><span class="__shiki_140thh">    ActiveTxns        </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Gauge</span></span>
<span class="line"><span class="__shiki_140thh">    TxnQueueSize      </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Gauge</span></span>
<span class="line"><span class="__shiki_140thh">    ConflictRate      </span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Gauge</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 详细指标</span></span>
<span class="line"><span class="__shiki_140thh">    ConditionTypeMetrics </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Compare_CompareTarget</span><span class="__shiki_140thh">]</span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Counter</span></span>
<span class="line"><span class="__shiki_140thh">    OperationTypeMetrics </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Counter</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> collectTxnMetrics</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">txn</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnRequest</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">resp</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnResponse</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">duration</span><span class="__shiki_1t8gfj"> time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    metrics.TxnTotal.</span><span class="__shiki_1t8gfj">Inc</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> resp.Succeeded {</span></span>
<span class="line"><span class="__shiki_140thh">        metrics.TxnSuccess.</span><span class="__shiki_1t8gfj">Inc</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        metrics.TxnFailed.</span><span class="__shiki_1t8gfj">Inc</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    metrics.TxnLatency.</span><span class="__shiki_1t8gfj">Observe</span><span class="__shiki_140thh">(duration.</span><span class="__shiki_1t8gfj">Seconds</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">    metrics.TxnConditionCount.</span><span class="__shiki_1t8gfj">Observe</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">float64</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(txn.Compare)))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 统计操作类型</span></span>
<span class="line"><span class="__shiki_140thh">    opCount </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(txn.Success) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(txn.Failure)</span></span>
<span class="line"><span class="__shiki_140thh">    metrics.TxnOperationCount.</span><span class="__shiki_1t8gfj">Observe</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">float64</span><span class="__shiki_140thh">(opCount))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 统计条件类型</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, cmp </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> txn.Compare {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> counter, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> metrics.ConditionTypeMetrics[cmp.Target]; ok {</span></span>
<span class="line"><span class="__shiki_140thh">            counter.</span><span class="__shiki_1t8gfj">Inc</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 事务性能分析</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> TxnProfiler</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    slowTxns      []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TxnProfile</span></span>
<span class="line"><span class="__shiki_140thh">    failedTxns    []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TxnProfile</span></span>
<span class="line"><span class="__shiki_140thh">    conflictTxns  []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TxnProfile</span></span>
<span class="line"><span class="__shiki_140thh">    mu            </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RWMutex</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> TxnProfile</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    TxnID       </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    ClientID    </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    StartTime   </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span></span>
<span class="line"><span class="__shiki_140thh">    EndTime     </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span></span>
<span class="line"><span class="__shiki_140thh">    Duration    </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">    Conditions  []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Compare</span></span>
<span class="line"><span class="__shiki_140thh">    Operations  []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RequestOp</span></span>
<span class="line"><span class="__shiki_140thh">    Succeeded   </span><span class="__shiki_1itgoe">bool</span></span>
<span class="line"><span class="__shiki_140thh">    ConflictKey </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    StackTrace  </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">tp </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TxnProfiler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">RecordTxn</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">txn</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnRequest</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">resp</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnResponse</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">start</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">end</span><span class="__shiki_1t8gfj"> time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    duration </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> end.</span><span class="__shiki_1t8gfj">Sub</span><span class="__shiki_140thh">(start)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    profile </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">TxnProfile</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        TxnID:      </span><span class="__shiki_1t8gfj">generateTxnID</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        StartTime:  start,</span></span>
<span class="line"><span class="__shiki_140thh">        EndTime:    end,</span></span>
<span class="line"><span class="__shiki_140thh">        Duration:   duration,</span></span>
<span class="line"><span class="__shiki_140thh">        Conditions: txn.Compare,</span></span>
<span class="line"><span class="__shiki_140thh">        Operations: txn.Success,</span></span>
<span class="line"><span class="__shiki_140thh">        Succeeded:  resp.Succeeded,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    tp.mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> tp.mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 记录慢事务</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> duration </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">time.Millisecond {</span></span>
<span class="line"><span class="__shiki_140thh">        tp.slowTxns </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(tp.slowTxns, profile)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 保留最近的100个慢事务</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(tp.slowTxns) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            tp.slowTxns </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tp.slowTxns[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">:]</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 记录失败事务</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">resp.Succeeded {</span></span>
<span class="line"><span class="__shiki_140thh">        tp.failedTxns </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(tp.failedTxns, profile)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(tp.failedTxns) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            tp.failedTxns </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tp.failedTxns[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">:]</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_7-3-2-事务诊断工具" tabindex="-1">7.3.2 事务诊断工具 <a class="header-anchor" href="#_7-3-2-事务诊断工具" aria-label="Permalink to &quot;7.3.2 事务诊断工具&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 事务诊断器</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> TxnDiagnoser</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    store    </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MVCCStore</span></span>
<span class="line"><span class="__shiki_140thh">    analyzer </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TxnAnalyzer</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">td </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TxnDiagnoser</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Diagnose</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">txn</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnRequest</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">expected</span><span class="__shiki_1itgoe"> bool</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">actual</span><span class="__shiki_1itgoe"> bool</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">DiagnosisResult</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    result </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">DiagnosisResult</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        Txn:        txn,</span></span>
<span class="line"><span class="__shiki_140thh">        Expected:   expected,</span></span>
<span class="line"><span class="__shiki_140thh">        Actual:     actual,</span></span>
<span class="line"><span class="__shiki_140thh">        Issues:     []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Issue</span><span class="__shiki_140thh">{},</span></span>
<span class="line"><span class="__shiki_140thh">        Suggestions: []</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">{},</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查条件</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> i, cmp </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> txn.Compare {</span></span>
<span class="line"><span class="__shiki_140thh">        issue </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> td.</span><span class="__shiki_1t8gfj">analyzeCondition</span><span class="__shiki_140thh">(cmp, i)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> issue </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            result.Issues </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(result.Issues, issue)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查操作冲突</span></span>
<span class="line"><span class="__shiki_140thh">    conflicts </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> td.</span><span class="__shiki_1t8gfj">findConflicts</span><span class="__shiki_140thh">(txn)</span></span>
<span class="line"><span class="__shiki_140thh">    result.Conflicts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> conflicts</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查性能问题</span></span>
<span class="line"><span class="__shiki_140thh">    perfIssues </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> td.</span><span class="__shiki_1t8gfj">analyzePerformance</span><span class="__shiki_140thh">(txn)</span></span>
<span class="line"><span class="__shiki_140thh">    result.Issues </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(result.Issues, perfIssues</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 生成建议</span></span>
<span class="line"><span class="__shiki_140thh">    result.Suggestions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> td.</span><span class="__shiki_1t8gfj">generateSuggestions</span><span class="__shiki_140thh">(result)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> result</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">td </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TxnDiagnoser</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">analyzeCondition</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">cmp</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Compare</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">index</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Issue</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取键的当前状态</span></span>
<span class="line"><span class="__shiki_140thh">    kv, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> td.store.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(cmp.Key, td.store.</span><span class="__shiki_1t8gfj">currentRevision</span><span class="__shiki_140thh">().main)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    switch</span><span class="__shiki_140thh"> cmp.Target {</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> pb.Compare_VERSION:</span></span>
<span class="line"><span class="__shiki_140thh">        currentVersion </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> kv </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            currentVersion </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> kv.Version</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        expected </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> cmp.TargetUnion.(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Compare_Version</span><span class="__shiki_140thh">).Version</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_1t8gfj">compareInt64</span><span class="__shiki_140thh">(currentVersion, expected, cmp.Result) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">Issue</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">                Type:    </span><span class="__shiki_mdbnqw">&quot;ConditionFailed&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                Message: fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Condition </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw"> failed: version </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_dzsirb"> %s</span><span class="__shiki_dzsirb"> %d</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                    index, currentVersion, cmp.Result, expected),</span></span>
<span class="line"><span class="__shiki_140thh">                Severity: </span><span class="__shiki_mdbnqw">&quot;High&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> pb.Compare_VALUE:</span></span>
<span class="line"><span class="__shiki_140thh">        currentValue </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> kv </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            currentValue </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> kv.Value</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        expected </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> cmp.TargetUnion.(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Compare_Value</span><span class="__shiki_140thh">).Value</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_1t8gfj">compareBytes</span><span class="__shiki_140thh">(currentValue, expected, cmp.Result) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">Issue</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">                Type:    </span><span class="__shiki_mdbnqw">&quot;ConditionFailed&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                Message: fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Condition </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw"> failed: value mismatch&quot;</span><span class="__shiki_140thh">, index),</span></span>
<span class="line"><span class="__shiki_140thh">                Severity: </span><span class="__shiki_mdbnqw">&quot;High&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">td </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TxnDiagnoser</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">generateSuggestions</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">result</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">DiagnosisResult</span><span class="__shiki_140thh">) []</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> suggestions []</span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 基于问题生成建议</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, issue </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> result.Issues {</span></span>
<span class="line"><span class="__shiki_1itgoe">        switch</span><span class="__shiki_140thh"> issue.Type {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_mdbnqw"> &quot;ConditionFailed&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            suggestions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(suggestions, </span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;Consider using retry logic with exponential backoff&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_mdbnqw"> &quot;HighContention&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            suggestions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(suggestions,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;Consider redesigning the key schema to reduce contention&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;Use smaller transactions to reduce lock duration&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_mdbnqw"> &quot;LargeTransaction&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            suggestions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(suggestions,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;Split the transaction into smaller ones&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;Consider using batch operations instead of transactions&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> suggestions</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>etcd的事务和MVCC机制共同构成了其强大的数据一致性保证和并发控制能力。以下是关键要点总结：</p><h3 id="核心特性总结" tabindex="-1">核心特性总结： <a class="header-anchor" href="#核心特性总结" aria-label="Permalink to &quot;核心特性总结：&quot;">​</a></h3><ol><li><p><strong>MVCC架构</strong>：</p><ul><li>多版本数据存储，支持历史查询</li><li>基于修订版本的快照隔离</li><li>高效的读写并发控制</li></ul></li><li><p><strong>事务机制</strong>：</p><ul><li>基于条件的原子操作</li><li>支持比较-设置（Compare-and-Swap）模式</li><li>线性一致性保证</li></ul></li><li><p><strong>性能优化</strong>：</p><ul><li>批量事务处理</li><li>智能冲突检测</li><li>高效的压缩算法</li></ul></li></ol><h3 id="关键设计要点" tabindex="-1">关键设计要点： <a class="header-anchor" href="#关键设计要点" aria-label="Permalink to &quot;关键设计要点：&quot;">​</a></h3><ul><li><strong>修订版本号</strong>：全局单调递增，作为逻辑时钟</li><li><strong>键索引</strong>：B树内存索引，加速查找</li><li><strong>后端存储</strong>：BoltDB提供持久化保证</li><li><strong>压缩机制</strong>：定期清理旧版本，控制存储增长</li></ul><h3 id="最佳实践建议" tabindex="-1">最佳实践建议： <a class="header-anchor" href="#最佳实践建议" aria-label="Permalink to &quot;最佳实践建议：&quot;">​</a></h3><ol><li><p><strong>合理设计事务</strong>：</p><ul><li>保持事务简洁，避免大事务</li><li>使用合适的比较条件</li><li>实现重试逻辑处理冲突</li></ul></li><li><p><strong>监控与优化</strong>：</p><ul><li>监控事务延迟和冲突率</li><li>定期执行压缩操作</li><li>调整批处理参数优化性能</li></ul></li><li><p><strong>错误处理</strong>：</p><ul><li>处理事务失败和条件不满足</li><li>实现适当的重试策略</li><li>监控和告警关键指标</li></ul></li></ol><p>etcd的事务和MVCC机制为分布式系统提供了强大的数据一致性基础，理解和合理利用这些机制对于构建可靠的分布式应用至关重要。</p>`,113)])])}const r=a(p,[["render",h]]);export{g as __pageData,r as default};
