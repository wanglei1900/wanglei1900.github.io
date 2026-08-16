import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"MongoDB索引优化与查询计划全面解析","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/nosql/document/mongodb/indexing.md","filePath":"data/database/nosql/document/mongodb/indexing.md"}'),p={name:"data/database/nosql/document/mongodb/indexing.md"};function h(l,s,c,t,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="mongodb索引优化与查询计划全面解析" tabindex="-1">MongoDB索引优化与查询计划全面解析 <a class="header-anchor" href="#mongodb索引优化与查询计划全面解析" aria-label="Permalink to &quot;MongoDB索引优化与查询计划全面解析&quot;">​</a></h1><h2 id="_1-mongodb索引基础与核心原理" tabindex="-1">1. MongoDB索引基础与核心原理 <a class="header-anchor" href="#_1-mongodb索引基础与核心原理" aria-label="Permalink to &quot;1. MongoDB索引基础与核心原理&quot;">​</a></h2><h3 id="_1-1-索引的本质与价值" tabindex="-1">1.1 索引的本质与价值 <a class="header-anchor" href="#_1-1-索引的本质与价值" aria-label="Permalink to &quot;1.1 索引的本质与价值&quot;">​</a></h3><p>索引是数据库系统中<strong>加速数据检索</strong>的数据结构，它通过维护数据的特定视图（排序、哈希等）来避免全表扫描。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 索引的价值体现</span></span>
<span class="line"><span class="__shiki_140thh">索引的核心价值 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  查询加速: </span><span class="__shiki_mdbnqw">&quot;将O(n)的全表扫描优化为O(log n)甚至O(1)的索引查找&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  排序优化: </span><span class="__shiki_mdbnqw">&quot;避免内存排序，直接利用索引的有序性&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  唯一性保证: </span><span class="__shiki_mdbnqw">&quot;唯一索引确保数据完整性&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  覆盖查询: </span><span class="__shiki_mdbnqw">&quot;直接从索引获取数据，无需访问文档&quot;</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_1-2-b-树索引-mongodb的核心索引结构" tabindex="-1">1.2 B-树索引：MongoDB的核心索引结构 <a class="header-anchor" href="#_1-2-b-树索引-mongodb的核心索引结构" aria-label="Permalink to &quot;1.2 B-树索引：MongoDB的核心索引结构&quot;">​</a></h3><p>MongoDB默认使用<strong>B-树（B-Tree）</strong> 作为索引数据结构，这是理解索引优化的基础。</p><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[B-Tree索引结构] --&gt; B[根节点 Root Node]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[内部节点 Internal Nodes]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[叶子节点 Leaf Nodes]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; E[存储键值和指针]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; F[存储键值和指针]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; G[存储键值 + 文档位置/文档本身]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    G --&gt; H{存储内容}</span></span>
<span class="line"><span class="__shiki_140thh">    H --&gt; I[非覆盖索引：文档位置]</span></span>
<span class="line"><span class="__shiki_140thh">    H --&gt; J[覆盖索引：文档本身]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; K[平衡特性]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; K</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; K</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    K --&gt; L[所有叶子节点在同一层]</span></span>
<span class="line"><span class="__shiki_140thh">    K --&gt; M[自动平衡保持性能]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    style A fill:#f9f,stroke:#333,stroke-width:2px</span></span></code></pre></div><p><strong>B-树的关键特性</strong>：</p><ol><li><strong>多路平衡树</strong>：每个节点有多个子节点，保持树高度较低</li><li><strong>有序存储</strong>：节点内键值有序排列，支持高效范围查询</li><li><strong>自动平衡</strong>：插入删除时自动调整，保持查询性能稳定</li><li><strong>磁盘友好</strong>：节点大小匹配磁盘块，减少I/O次数</li></ol><h3 id="_1-3-索引的物理存储与wiredtiger实现" tabindex="-1">1.3 索引的物理存储与WiredTiger实现 <a class="header-anchor" href="#_1-3-索引的物理存储与wiredtiger实现" aria-label="Permalink to &quot;1.3 索引的物理存储与WiredTiger实现&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// WiredTiger存储引擎中的索引实现</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> wiredTigerIndex</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 1. 内存中的结构</span></span>
<span class="line"><span class="__shiki_140thh">  memoryStructure: {</span></span>
<span class="line"><span class="__shiki_140thh">    cache: </span><span class="__shiki_mdbnqw">&quot;索引数据缓存在WiredTiger缓存中&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    evictionPolicy: </span><span class="__shiki_mdbnqw">&quot;LRU（最近最少使用）算法管理缓存&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    compression: </span><span class="__shiki_mdbnqw">&quot;索引数据使用前缀压缩减少内存占用&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 2. 磁盘上的结构</span></span>
<span class="line"><span class="__shiki_140thh">  diskStructure: {</span></span>
<span class="line"><span class="__shiki_140thh">    fileOrganization: </span><span class="__shiki_mdbnqw">&quot;索引存储在单独的.wt文件中&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    blockManagement: </span><span class="__shiki_mdbnqw">&quot;数据按块（block）组织，通常4KB-32KB&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    checkpointing: </span><span class="__shiki_mdbnqw">&quot;定期将内存中的脏页刷到磁盘&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 3. 索引操作的代价</span></span>
<span class="line"><span class="__shiki_140thh">  operationCost: {</span></span>
<span class="line"><span class="__shiki_140thh">    insert: {</span></span>
<span class="line"><span class="__shiki_140thh">      cost: </span><span class="__shiki_mdbnqw">&quot;O(log n) + 写放大因子&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      details: </span><span class="__shiki_mdbnqw">&quot;需要更新索引树，可能引起节点分裂&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    update: {</span></span>
<span class="line"><span class="__shiki_140thh">      cost: </span><span class="__shiki_mdbnqw">&quot;取决于是否更新索引键&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      details: </span><span class="__shiki_mdbnqw">&quot;更新索引键相当于删除+插入&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    delete: {</span></span>
<span class="line"><span class="__shiki_140thh">      cost: </span><span class="__shiki_mdbnqw">&quot;O(log n)&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      details: </span><span class="__shiki_mdbnqw">&quot;标记删除，空间可能不会立即回收&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 4. 内存使用估算公式</span></span>
<span class="line"><span class="__shiki_140thh">  memoryEstimation: {</span></span>
<span class="line"><span class="__shiki_140thh">    totalSize: </span><span class="__shiki_mdbnqw">&quot;索引条目数 × 平均条目大小&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    entrySize: </span><span class="__shiki_mdbnqw">&quot;索引键大小 + 指针大小(8字节) + 开销(约16字节)&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    example: </span><span class="__shiki_mdbnqw">&quot;100万条记录，索引键平均20字节 → 约(20+8+16)×1M=44MB&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h2 id="_2-mongodb索引类型详解" tabindex="-1">2. MongoDB索引类型详解 <a class="header-anchor" href="#_2-mongodb索引类型详解" aria-label="Permalink to &quot;2. MongoDB索引类型详解&quot;">​</a></h2><h3 id="_2-1-单字段索引" tabindex="-1">2.1 单字段索引 <a class="header-anchor" href="#_2-1-单字段索引" aria-label="Permalink to &quot;2.1 单字段索引&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 单字段索引创建与使用</span></span>
<span class="line"><span class="__shiki_140thh">db.collection.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">({ field: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> });  </span><span class="__shiki_21nrsd">// 升序索引</span></span>
<span class="line"><span class="__shiki_140thh">db.collection.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">({ field: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }); </span><span class="__shiki_21nrsd">// 降序索引</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 实际示例：用户集合的email索引</span></span>
<span class="line"><span class="__shiki_140thh">db.users.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">({ email: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }, {</span></span>
<span class="line"><span class="__shiki_140thh">  name: </span><span class="__shiki_mdbnqw">&quot;email_idx&quot;</span><span class="__shiki_140thh">,           </span><span class="__shiki_21nrsd">// 指定索引名称</span></span>
<span class="line"><span class="__shiki_140thh">  unique: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,                </span><span class="__shiki_21nrsd">// 唯一索引</span></span>
<span class="line"><span class="__shiki_140thh">  partialFilterExpression: {   </span><span class="__shiki_21nrsd">// 部分索引</span></span>
<span class="line"><span class="__shiki_140thh">    email: { $exists: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, $type: </span><span class="__shiki_mdbnqw">&quot;string&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  collation: {                 </span><span class="__shiki_21nrsd">// 排序规则</span></span>
<span class="line"><span class="__shiki_140thh">    locale: </span><span class="__shiki_mdbnqw">&quot;en&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    strength: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 索引选择示例</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> query</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> db.users.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">({ </span></span>
<span class="line"><span class="__shiki_140thh">  email: </span><span class="__shiki_mdbnqw">&quot;user@example.com&quot;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">}).</span><span class="__shiki_1t8gfj">explain</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;executionStats&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(query.executionStats.executionStages);</span></span>
<span class="line"><span class="__shiki_21nrsd">// 期望看到: &quot;IXSCAN&quot;而不是&quot;COLLSCAN&quot;</span></span></code></pre></div><h3 id="_2-2-复合索引" tabindex="-1">2.2 复合索引 <a class="header-anchor" href="#_2-2-复合索引" aria-label="Permalink to &quot;2.2 复合索引&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 复合索引：多字段组合</span></span>
<span class="line"><span class="__shiki_140thh">db.orders.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">({ </span></span>
<span class="line"><span class="__shiki_140thh">  customerId: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">  orderDate: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  status: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 复合索引的ESR规则（Equality, Sort, Range）</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> ESRRule</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 最佳实践：索引字段顺序应为：</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 1. Equality（等值查询）字段</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 2. Sort（排序）字段  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 3. Range（范围查询）字段</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  exampleQueries: {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 查询1：等值 + 排序 + 范围（最优）</span></span>
<span class="line"><span class="__shiki_140thh">    query1: {</span></span>
<span class="line"><span class="__shiki_140thh">      filter: { customerId: </span><span class="__shiki_mdbnqw">&quot;123&quot;</span><span class="__shiki_140thh">, status: </span><span class="__shiki_mdbnqw">&quot;pending&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">      sort: { orderDate: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">      range: { total: { $gt: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">      indexUsed: </span><span class="__shiki_mdbnqw">&quot;[customerId, status, orderDate, total]&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 查询2：等值 + 范围 + 排序（次优）</span></span>
<span class="line"><span class="__shiki_140thh">    query2: {</span></span>
<span class="line"><span class="__shiki_140thh">      filter: { customerId: </span><span class="__shiki_mdbnqw">&quot;123&quot;</span><span class="__shiki_140thh">, total: { $gt: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">      sort: { orderDate: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">      indexUsed: </span><span class="__shiki_mdbnqw">&quot;[customerId, orderDate, total]&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      note: </span><span class="__shiki_mdbnqw">&quot;范围查询在排序前，可能导致排序无法使用索引&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 索引前缀原则</span></span>
<span class="line"><span class="__shiki_140thh">  prefixPrinciple: {</span></span>
<span class="line"><span class="__shiki_140thh">    description: </span><span class="__shiki_mdbnqw">&quot;复合索引支持前缀子集的查询&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    example: </span><span class="__shiki_mdbnqw">&quot;索引[A, B, C]支持：A, [A, B], [A, B, C]的查询&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    unsupported: </span><span class="__shiki_mdbnqw">&quot;不支持：B, C, [B, C], [A, C]（跳跃扫描除外）&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 复合索引选择算法</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CompoundIndexSelector</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">queries</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.queries </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queries;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.fieldStats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  analyzeQueries</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 分析查询模式</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> patterns</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.queries.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">query</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> ({</span></span>
<span class="line"><span class="__shiki_140thh">      equalityFields: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">extractEqualityFields</span><span class="__shiki_140thh">(query.filter),</span></span>
<span class="line"><span class="__shiki_140thh">      sortFields: query.sort </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> {},</span></span>
<span class="line"><span class="__shiki_140thh">      rangeFields: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">extractRangeFields</span><span class="__shiki_140thh">(query.filter),</span></span>
<span class="line"><span class="__shiki_140thh">      frequency: query.frequency </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">    }));</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">generateIndexCandidates</span><span class="__shiki_140thh">(patterns);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  extractEqualityFields</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">filter</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 提取等值查询字段</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> equalities</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">field</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">value</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">of</span><span class="__shiki_140thh"> Object.</span><span class="__shiki_1t8gfj">entries</span><span class="__shiki_140thh">(filter)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">typeof</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_mdbnqw"> &#39;object&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">          (value.$eq </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_dzsirb"> undefined</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span></span>
<span class="line"><span class="__shiki_140thh">          (value.$in </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_dzsirb"> undefined</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">Array.</span><span class="__shiki_1t8gfj">isArray</span><span class="__shiki_140thh">(value.$in[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]))) {</span></span>
<span class="line"><span class="__shiki_140thh">        equalities.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(field);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> equalities;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  generateIndexCandidates</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">patterns</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 生成索引候选</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> candidates</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    patterns.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">pattern</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 根据ESR规则生成候选索引</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> fields</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_1itgoe">        ...</span><span class="__shiki_140thh">pattern.equalityFields,</span></span>
<span class="line"><span class="__shiki_1itgoe">        ...</span><span class="__shiki_140thh">Object.</span><span class="__shiki_1t8gfj">keys</span><span class="__shiki_140thh">(pattern.sortFields),</span></span>
<span class="line"><span class="__shiki_1itgoe">        ...</span><span class="__shiki_140thh">pattern.rangeFields</span></span>
<span class="line"><span class="__shiki_140thh">      ];</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> indexKey</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> fields.</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;,&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> current</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> candidates.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(indexKey) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> { score: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, patterns: [] };</span></span>
<span class="line"><span class="__shiki_140thh">      current.score </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> pattern.frequency;</span></span>
<span class="line"><span class="__shiki_140thh">      current.patterns.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(pattern);</span></span>
<span class="line"><span class="__shiki_140thh">      candidates.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(indexKey, current);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 按分数排序</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> Array.</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(candidates.</span><span class="__shiki_1t8gfj">entries</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">a</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">b</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> b[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">].score </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> a[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">].score)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">slice</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 返回前10个候选</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-3-多键索引-数组索引" tabindex="-1">2.3 多键索引（数组索引） <a class="header-anchor" href="#_2-3-多键索引-数组索引" aria-label="Permalink to &quot;2.3 多键索引（数组索引）&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 多键索引：为数组字段的每个元素创建索引条目</span></span>
<span class="line"><span class="__shiki_140thh">db.products.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">({ tags: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> });</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 多键索引的行为和限制</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> multikeyIndexBehavior</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 1. 自动检测和创建</span></span>
<span class="line"><span class="__shiki_140thh">  automatic: </span><span class="__shiki_mdbnqw">&quot;当对数组字段创建索引时，MongoDB自动创建多键索引&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 2. 查询行为</span></span>
<span class="line"><span class="__shiki_140thh">  queryExamples: {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 精确匹配数组</span></span>
<span class="line"><span class="__shiki_140thh">    exactArray: {</span></span>
<span class="line"><span class="__shiki_140thh">      query: { tags: [</span><span class="__shiki_mdbnqw">&quot;electronics&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;sale&quot;</span><span class="__shiki_140thh">] },</span></span>
<span class="line"><span class="__shiki_140thh">      behavior: </span><span class="__shiki_mdbnqw">&quot;需要完全匹配数组元素和顺序&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 匹配单个元素</span></span>
<span class="line"><span class="__shiki_140thh">    singleElement: {</span></span>
<span class="line"><span class="__shiki_140thh">      query: { tags: </span><span class="__shiki_mdbnqw">&quot;electronics&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">      behavior: </span><span class="__shiki_mdbnqw">&quot;匹配包含该元素的任何数组&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 匹配多个元素</span></span>
<span class="line"><span class="__shiki_140thh">    multipleElements: {</span></span>
<span class="line"><span class="__shiki_140thh">      query: { tags: { $all: [</span><span class="__shiki_mdbnqw">&quot;electronics&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;sale&quot;</span><span class="__shiki_140thh">] } },</span></span>
<span class="line"><span class="__shiki_140thh">      behavior: </span><span class="__shiki_mdbnqw">&quot;匹配同时包含所有元素的数组&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 数组元素查询</span></span>
<span class="line"><span class="__shiki_140thh">    elemMatch: {</span></span>
<span class="line"><span class="__shiki_140thh">      query: { </span></span>
<span class="line"><span class="__shiki_140thh">        reviews: { </span></span>
<span class="line"><span class="__shiki_140thh">          $elemMatch: { rating: { $gt: </span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh"> }, helpful: { $gt: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh"> } } </span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      behavior: </span><span class="__shiki_mdbnqw">&quot;匹配数组中满足条件的元素&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 3. 重要限制</span></span>
<span class="line"><span class="__shiki_140thh">  limitations: {</span></span>
<span class="line"><span class="__shiki_140thh">    compoundIndex: </span><span class="__shiki_mdbnqw">&quot;一个复合索引中只能有一个数组字段&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    nestedArrays: </span><span class="__shiki_mdbnqw">&quot;不能索引嵌套数组的直接字段&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    indexBound: </span><span class="__shiki_mdbnqw">&quot;查询时对数组字段只能有一个谓词使用索引&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 4. 性能考虑</span></span>
<span class="line"><span class="__shiki_140thh">  performance: {</span></span>
<span class="line"><span class="__shiki_140thh">    indexSize: </span><span class="__shiki_mdbnqw">&quot;每个数组元素创建一个索引条目，索引可能很大&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    writeOverhead: </span><span class="__shiki_mdbnqw">&quot;数组修改需要更新多个索引条目&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    queryPlanning: </span><span class="__shiki_mdbnqw">&quot;可能产生多个索引边界&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 多键索引边界计算</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> MultikeyIndexBounds</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  calculateBounds</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">query</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">indexPattern</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> bounds</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {};</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 对于数组字段的$in查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (query.tags </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> query.tags.$in) {</span></span>
<span class="line"><span class="__shiki_140thh">      bounds.tags </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.tags.$in.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">value</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> [value, value]);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 对于$elemMatch查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (query.reviews </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> query.reviews.$elemMatch) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> conditions</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> query.reviews.$elemMatch;</span></span>
<span class="line"><span class="__shiki_140thh">      bounds.reviews </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateElemMatchBounds</span><span class="__shiki_140thh">(conditions);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> bounds;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  calculateElemMatchBounds</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">conditions</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> bounds</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 处理嵌套条件</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (conditions.rating </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> conditions.rating.$gt) {</span></span>
<span class="line"><span class="__shiki_140thh">      bounds.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">([</span><span class="__shiki_mdbnqw">&#39;&gt;&#39;</span><span class="__shiki_140thh">, conditions.rating.$gt]);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> bounds;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-4-其他索引类型" tabindex="-1">2.4 其他索引类型 <a class="header-anchor" href="#_2-4-其他索引类型" aria-label="Permalink to &quot;2.4 其他索引类型&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 特殊索引类型</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> specialIndexTypes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 1. 文本索引</span></span>
<span class="line"><span class="__shiki_140thh">  textIndex: {</span></span>
<span class="line"><span class="__shiki_140thh">    creation: db.articles.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      { title: </span><span class="__shiki_mdbnqw">&quot;text&quot;</span><span class="__shiki_140thh">, content: </span><span class="__shiki_mdbnqw">&quot;text&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">      { </span></span>
<span class="line"><span class="__shiki_140thh">        name: </span><span class="__shiki_mdbnqw">&quot;text_index&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        weights: { title: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, content: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh"> }, </span><span class="__shiki_21nrsd">// 权重</span></span>
<span class="line"><span class="__shiki_140thh">        default_language: </span><span class="__shiki_mdbnqw">&quot;english&quot;</span><span class="__shiki_140thh">,        </span><span class="__shiki_21nrsd">// 默认语言</span></span>
<span class="line"><span class="__shiki_140thh">        language_override: </span><span class="__shiki_mdbnqw">&quot;language&quot;</span><span class="__shiki_140thh">,       </span><span class="__shiki_21nrsd">// 语言字段</span></span>
<span class="line"><span class="__shiki_140thh">        textIndexVersion: </span><span class="__shiki_dzsirb">3</span><span class="__shiki_21nrsd">                  // 版本</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    ),</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    features: {</span></span>
<span class="line"><span class="__shiki_140thh">      relevanceScoring: </span><span class="__shiki_mdbnqw">&quot;BM25算法计算相关性分数&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      languageSupport: </span><span class="__shiki_mdbnqw">&quot;支持多种语言分词&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      stopWords: </span><span class="__shiki_mdbnqw">&quot;自动排除常见词（the, and等）&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      phraseSearch: </span><span class="__shiki_mdbnqw">&quot;支持短语搜索&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      negation: </span><span class="__shiki_mdbnqw">&quot;支持排除词&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    queryExample: {</span></span>
<span class="line"><span class="__shiki_140thh">      find: db.articles.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        { $text: { $search: </span><span class="__shiki_mdbnqw">&quot;mongodb database -sql&quot;</span><span class="__shiki_140thh">, $language: </span><span class="__shiki_mdbnqw">&quot;english&quot;</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">        { score: { $meta: </span><span class="__shiki_mdbnqw">&quot;textScore&quot;</span><span class="__shiki_140thh"> } }</span></span>
<span class="line"><span class="__shiki_140thh">      ).</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">({ score: { $meta: </span><span class="__shiki_mdbnqw">&quot;textScore&quot;</span><span class="__shiki_140thh"> } })</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 2. 地理空间索引</span></span>
<span class="line"><span class="__shiki_140thh">  geospatialIndex: {</span></span>
<span class="line"><span class="__shiki_140thh">    types: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;2dsphere&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_140thh">        for: </span><span class="__shiki_mdbnqw">&quot;球面几何（经纬度）&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        creation: db.places.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">({ location: </span><span class="__shiki_mdbnqw">&quot;2dsphere&quot;</span><span class="__shiki_140thh"> }),</span></span>
<span class="line"><span class="__shiki_140thh">        queries: [</span><span class="__shiki_mdbnqw">&quot;$near&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;$geoWithin&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;$geoIntersects&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;2d&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_140thh">        for: </span><span class="__shiki_mdbnqw">&quot;平面几何（x,y坐标）&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        creation: db.grid.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">({ pos: </span><span class="__shiki_mdbnqw">&quot;2d&quot;</span><span class="__shiki_140thh"> }),</span></span>
<span class="line"><span class="__shiki_140thh">        queries: [</span><span class="__shiki_mdbnqw">&quot;$near&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;$geoWithin&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;$box&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;$center&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    queryExample: {</span></span>
<span class="line"><span class="__shiki_140thh">      nearQuery: db.places.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        location: {</span></span>
<span class="line"><span class="__shiki_140thh">          $near: {</span></span>
<span class="line"><span class="__shiki_140thh">            $geometry: {</span></span>
<span class="line"><span class="__shiki_140thh">              type: </span><span class="__shiki_mdbnqw">&quot;Point&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">              coordinates: [</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">73.9667</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">40.78</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">            $maxDistance: </span><span class="__shiki_dzsirb">5000</span><span class="__shiki_21nrsd"> // 5公里</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      })</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 3. 哈希索引</span></span>
<span class="line"><span class="__shiki_140thh">  hashedIndex: {</span></span>
<span class="line"><span class="__shiki_140thh">    purpose: </span><span class="__shiki_mdbnqw">&quot;主要用于分片键的哈希分片&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    creation: db.users.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">({ userId: </span><span class="__shiki_mdbnqw">&quot;hashed&quot;</span><span class="__shiki_140thh"> }),</span></span>
<span class="line"><span class="__shiki_140thh">    characteristics: {</span></span>
<span class="line"><span class="__shiki_140thh">      equalityOnly: </span><span class="__shiki_mdbnqw">&quot;只支持等值查询，不支持范围查询&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      hashFunction: </span><span class="__shiki_mdbnqw">&quot;使用MurmurHash3算法&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      collisions: </span><span class="__shiki_mdbnqw">&quot;可能存在哈希冲突（极低概率）&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 4. 通配符索引</span></span>
<span class="line"><span class="__shiki_140thh">  wildcardIndex: {</span></span>
<span class="line"><span class="__shiki_140thh">    purpose: </span><span class="__shiki_mdbnqw">&quot;支持未知字段的查询&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    creation: db.products.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">({ </span><span class="__shiki_mdbnqw">&quot;$**&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }),</span></span>
<span class="line"><span class="__shiki_140thh">    variations: {</span></span>
<span class="line"><span class="__shiki_140thh">      fieldPath: db.products.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">({ </span><span class="__shiki_mdbnqw">&quot;metadata.$**&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }),</span></span>
<span class="line"><span class="__shiki_140thh">      specific: db.products.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">({ </span><span class="__shiki_mdbnqw">&quot;metadata.tags.$**&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    limitations: {</span></span>
<span class="line"><span class="__shiki_140thh">      noMixed: </span><span class="__shiki_mdbnqw">&quot;不能与普通字段混合&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      performance: </span><span class="__shiki_mdbnqw">&quot;可能影响写入性能&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      size: </span><span class="__shiki_mdbnqw">&quot;索引可能很大&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 5. 聚簇索引（MongoDB 5.3+）</span></span>
<span class="line"><span class="__shiki_140thh">  clusteredIndex: {</span></span>
<span class="line"><span class="__shiki_140thh">    concept: </span><span class="__shiki_mdbnqw">&quot;数据按索引顺序物理存储&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    creation: db.</span><span class="__shiki_1t8gfj">createCollection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;clustered_collection&quot;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">      clusteredIndex: {</span></span>
<span class="line"><span class="__shiki_140thh">        key: { _id: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        unique: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        name: </span><span class="__shiki_mdbnqw">&quot;clustered_idx&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }),</span></span>
<span class="line"><span class="__shiki_140thh">    benefits: {</span></span>
<span class="line"><span class="__shiki_140thh">      rangeScan: </span><span class="__shiki_mdbnqw">&quot;范围查询性能极佳&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      storage: </span><span class="__shiki_mdbnqw">&quot;减少存储碎片&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      cache: </span><span class="__shiki_mdbnqw">&quot;更好的缓存局部性&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_2-5-索引属性与选项" tabindex="-1">2.5 索引属性与选项 <a class="header-anchor" href="#_2-5-索引属性与选项" aria-label="Permalink to &quot;2.5 索引属性与选项&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 索引属性配置</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> indexProperties</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 1. 唯一索引</span></span>
<span class="line"><span class="__shiki_140thh">  unique: {</span></span>
<span class="line"><span class="__shiki_140thh">    creation: db.users.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">({ email: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }, { unique: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> }),</span></span>
<span class="line"><span class="__shiki_140thh">    behavior: </span><span class="__shiki_mdbnqw">&quot;确保索引字段值唯一&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    sparseUnique: {</span></span>
<span class="line"><span class="__shiki_140thh">      creation: db.users.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">({ ssn: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }, { </span></span>
<span class="line"><span class="__shiki_140thh">        unique: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">        partialFilterExpression: { ssn: { $exists: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> } }</span></span>
<span class="line"><span class="__shiki_140thh">      }),</span></span>
<span class="line"><span class="__shiki_140thh">      note: </span><span class="__shiki_mdbnqw">&quot;允许null/不存在值重复&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 2. 部分索引</span></span>
<span class="line"><span class="__shiki_140thh">  partial: {</span></span>
<span class="line"><span class="__shiki_140thh">    creation: db.orders.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      { status: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, orderDate: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">      { </span></span>
<span class="line"><span class="__shiki_140thh">        partialFilterExpression: { </span></span>
<span class="line"><span class="__shiki_140thh">          status: { $in: [</span><span class="__shiki_mdbnqw">&quot;pending&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;processing&quot;</span><span class="__shiki_140thh">] },</span></span>
<span class="line"><span class="__shiki_140thh">          total: { $gte: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    ),</span></span>
<span class="line"><span class="__shiki_140thh">    benefits: {</span></span>
<span class="line"><span class="__shiki_140thh">      size: </span><span class="__shiki_mdbnqw">&quot;索引更小，占用更少空间&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      performance: </span><span class="__shiki_mdbnqw">&quot;维护开销更低&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      targeted: </span><span class="__shiki_mdbnqw">&quot;针对特定查询优化&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    conditions: </span><span class="__shiki_mdbnqw">&quot;支持大多数查询操作符，除$where和$text&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 3. 稀疏索引</span></span>
<span class="line"><span class="__shiki_140thh">  sparse: {</span></span>
<span class="line"><span class="__shiki_140thh">    creation: db.users.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">({ middleName: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }, { sparse: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> }),</span></span>
<span class="line"><span class="__shiki_140thh">    behavior: </span><span class="__shiki_mdbnqw">&quot;只为存在该字段的文档创建索引条目&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    vsPartial: {</span></span>
<span class="line"><span class="__shiki_140thh">      sparse: </span><span class="__shiki_mdbnqw">&quot;只检查字段是否存在&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      partial: </span><span class="__shiki_mdbnqw">&quot;支持复杂条件表达式&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 4. TTL索引</span></span>
<span class="line"><span class="__shiki_140thh">  TTL: {</span></span>
<span class="line"><span class="__shiki_140thh">    creation: db.sessions.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      { lastAccess: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }, </span></span>
<span class="line"><span class="__shiki_140thh">      { expireAfterSeconds: </span><span class="__shiki_dzsirb">3600</span><span class="__shiki_140thh"> } </span><span class="__shiki_21nrsd">// 1小时后过期</span></span>
<span class="line"><span class="__shiki_140thh">    ),</span></span>
<span class="line"><span class="__shiki_140thh">    behavior: </span><span class="__shiki_mdbnqw">&quot;自动删除过期文档&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    requirements: {</span></span>
<span class="line"><span class="__shiki_140thh">      fieldType: </span><span class="__shiki_mdbnqw">&quot;必须是日期类型字段或包含日期的数组&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      replicaSet: </span><span class="__shiki_mdbnqw">&quot;需要副本集部署&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      accuracy: </span><span class="__shiki_mdbnqw">&quot;删除操作每分钟运行一次&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    variations: {</span></span>
<span class="line"><span class="__shiki_140thh">      flexible: db.logs.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        { createdAt: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        { </span></span>
<span class="line"><span class="__shiki_140thh">          expireAfterSeconds: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 立即过期</span></span>
<span class="line"><span class="__shiki_140thh">          partialFilterExpression: { level: </span><span class="__shiki_mdbnqw">&quot;debug&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      )</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 5. 不区分大小写索引</span></span>
<span class="line"><span class="__shiki_140thh">  caseInsensitive: {</span></span>
<span class="line"><span class="__shiki_140thh">    creation: db.products.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      { name: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">      { </span></span>
<span class="line"><span class="__shiki_140thh">        collation: {</span></span>
<span class="line"><span class="__shiki_140thh">          locale: </span><span class="__shiki_mdbnqw">&quot;en&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          strength: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_21nrsd"> // 1:只比较基础字符, 2:忽略大小写</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    ),</span></span>
<span class="line"><span class="__shiki_140thh">    queryRequirement: </span><span class="__shiki_mdbnqw">&quot;查询必须指定相同collation&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    exampleQuery: db.products.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">({ name: </span><span class="__shiki_mdbnqw">&quot;MongoDB&quot;</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">collation</span><span class="__shiki_140thh">({ locale: </span><span class="__shiki_mdbnqw">&quot;en&quot;</span><span class="__shiki_140thh">, strength: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 6. 隐藏索引</span></span>
<span class="line"><span class="__shiki_140thh">  hidden: {</span></span>
<span class="line"><span class="__shiki_140thh">    creation: db.collection.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">({ field: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }, { hidden: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> }),</span></span>
<span class="line"><span class="__shiki_140thh">    purpose: </span><span class="__shiki_mdbnqw">&quot;临时移除索引而不删除，测试性能影响&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    management: {</span></span>
<span class="line"><span class="__shiki_140thh">      hide: db.collection.</span><span class="__shiki_1t8gfj">hideIndex</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;field_1&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      unhide: db.collection.</span><span class="__shiki_1t8gfj">unhideIndex</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;field_1&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      list: db.collection.</span><span class="__shiki_1t8gfj">getIndexes</span><span class="__shiki_140thh">() </span><span class="__shiki_21nrsd">// 包含hidden: true</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 7. 索引构建选项</span></span>
<span class="line"><span class="__shiki_140thh">  buildOptions: {</span></span>
<span class="line"><span class="__shiki_140thh">    background: {</span></span>
<span class="line"><span class="__shiki_140thh">      option: { background: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">      effect: </span><span class="__shiki_mdbnqw">&quot;后台构建，不阻塞读写操作&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      tradeoff: </span><span class="__shiki_mdbnqw">&quot;构建时间更长，期间可能影响性能&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    expireAfterSeconds: {</span></span>
<span class="line"><span class="__shiki_140thh">      option: { expireAfterSeconds: </span><span class="__shiki_dzsirb">3600</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">      note: </span><span class="__shiki_mdbnqw">&quot;TTL索引专用&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    name: {</span></span>
<span class="line"><span class="__shiki_140thh">      option: { name: </span><span class="__shiki_mdbnqw">&quot;custom_index_name&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">      bestPractice: </span><span class="__shiki_mdbnqw">&quot;使用有意义的名称便于管理&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    storageEngine: {</span></span>
<span class="line"><span class="__shiki_140thh">      option: { storageEngine: { wiredTiger: { configString: </span><span class="__shiki_mdbnqw">&quot;block_compressor=zlib&quot;</span><span class="__shiki_140thh"> } } },</span></span>
<span class="line"><span class="__shiki_140thh">      note: </span><span class="__shiki_mdbnqw">&quot;特定存储引擎选项&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h2 id="_3-查询计划分析与优化" tabindex="-1">3. 查询计划分析与优化 <a class="header-anchor" href="#_3-查询计划分析与优化" aria-label="Permalink to &quot;3. 查询计划分析与优化&quot;">​</a></h2><h3 id="_3-1-explain-方法详解" tabindex="-1">3.1 explain()方法详解 <a class="header-anchor" href="#_3-1-explain-方法详解" aria-label="Permalink to &quot;3.1 explain()方法详解&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// explain()的三个详细模式</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> explainModes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 1. queryPlanner模式（默认）</span></span>
<span class="line"><span class="__shiki_140thh">  queryPlanner: {</span></span>
<span class="line"><span class="__shiki_140thh">    command: db.collection.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(query).</span><span class="__shiki_1t8gfj">explain</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;queryPlanner&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    output: {</span></span>
<span class="line"><span class="__shiki_140thh">      parsedQuery: </span><span class="__shiki_mdbnqw">&quot;解析后的查询条件&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      winningPlan: </span><span class="__shiki_mdbnqw">&quot;被选中的执行计划&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      rejectedPlans: </span><span class="__shiki_mdbnqw">&quot;被拒绝的备选计划&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      namespace: </span><span class="__shiki_mdbnqw">&quot;查询的集合&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      indexFilterSet: </span><span class="__shiki_mdbnqw">&quot;是否应用了索引过滤器&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    useCase: </span><span class="__shiki_mdbnqw">&quot;分析查询优化器选择的计划&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 2. executionStats模式</span></span>
<span class="line"><span class="__shiki_140thh">  executionStats: {</span></span>
<span class="line"><span class="__shiki_140thh">    command: db.collection.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(query).</span><span class="__shiki_1t8gfj">explain</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;executionStats&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    output: {</span></span>
<span class="line"><span class="__shiki_140thh">      executionSuccess: </span><span class="__shiki_mdbnqw">&quot;执行是否成功&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      nReturned: </span><span class="__shiki_mdbnqw">&quot;返回的文档数&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      executionTimeMillis: </span><span class="__shiki_mdbnqw">&quot;总执行时间&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      totalKeysExamined: </span><span class="__shiki_mdbnqw">&quot;检查的索引键数&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      totalDocsExamined: </span><span class="__shiki_mdbnqw">&quot;检查的文档数&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      executionStages: </span><span class="__shiki_mdbnqw">&quot;执行阶段的详细统计&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      allPlansExecution: </span><span class="__shiki_mdbnqw">&quot;所有候选计划的执行统计&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    useCase: </span><span class="__shiki_mdbnqw">&quot;分析查询的实际执行性能&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 3. allPlansExecution模式</span></span>
<span class="line"><span class="__shiki_140thh">  allPlansExecution: {</span></span>
<span class="line"><span class="__shiki_140thh">    command: db.collection.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(query).</span><span class="__shiki_1t8gfj">explain</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;allPlansExecution&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    output: </span><span class="__shiki_mdbnqw">&quot;包含所有候选计划的执行统计&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    useCase: </span><span class="__shiki_mdbnqw">&quot;比较不同执行计划的性能&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 详细的explain输出解析</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ExplainOutputAnalyzer</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">explainOutput</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.output </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> explainOutput;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  analyzeQueryPlanner</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> planner</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.output.queryPlanner;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 基础信息</span></span>
<span class="line"><span class="__shiki_140thh">      namespace: planner.namespace,</span></span>
<span class="line"><span class="__shiki_140thh">      parsedQuery: planner.parsedQuery,</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 索引使用情况</span></span>
<span class="line"><span class="__shiki_140thh">      winningPlan: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeWinningPlan</span><span class="__shiki_140thh">(planner.winningPlan),</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 被拒绝的计划</span></span>
<span class="line"><span class="__shiki_140thh">      rejectedPlans: planner.rejectedPlans?.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">plan</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeRejectedPlan</span><span class="__shiki_140thh">(plan)</span></span>
<span class="line"><span class="__shiki_140thh">      ) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> [],</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 索引过滤器</span></span>
<span class="line"><span class="__shiki_140thh">      indexFilterSet: planner.indexFilterSet </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 优化器信息</span></span>
<span class="line"><span class="__shiki_140thh">      optimizedPipeline: planner.optimizedPipeline </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  analyzeWinningPlan</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">plan</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> analysis</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      stage: plan.stage,</span></span>
<span class="line"><span class="__shiki_140thh">      inputStage: plan.inputStage </span><span class="__shiki_1itgoe">?</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeInputStage</span><span class="__shiki_140thh">(plan.inputStage) </span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      direction: plan.direction,</span></span>
<span class="line"><span class="__shiki_140thh">      indexBounds: plan.indexBounds,</span></span>
<span class="line"><span class="__shiki_140thh">      indexName: plan.indexName,</span></span>
<span class="line"><span class="__shiki_140thh">      isMultiKey: plan.isMultiKey </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      isPartial: plan.isPartial </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      isUnique: plan.isUnique </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 特殊处理FETCH阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (plan.stage </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;FETCH&#39;</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> plan.inputStage) {</span></span>
<span class="line"><span class="__shiki_140thh">      analysis.filter </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> plan.inputStage.filter;</span></span>
<span class="line"><span class="__shiki_140thh">      analysis.indexBounds </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> plan.inputStage.indexBounds;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> analysis;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  analyzeExecutionStats</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> stats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.output.executionStats;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 基本统计</span></span>
<span class="line"><span class="__shiki_140thh">      executionTimeMillis: stats.executionTimeMillis,</span></span>
<span class="line"><span class="__shiki_140thh">      nReturned: stats.nReturned,</span></span>
<span class="line"><span class="__shiki_140thh">      totalKeysExamined: stats.totalKeysExamined,</span></span>
<span class="line"><span class="__shiki_140thh">      totalDocsExamined: stats.totalDocsExamined,</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 效率指标</span></span>
<span class="line"><span class="__shiki_140thh">      indexEfficiency: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateIndexEfficiency</span><span class="__shiki_140thh">(stats),</span></span>
<span class="line"><span class="__shiki_140thh">      documentEfficiency: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateDocumentEfficiency</span><span class="__shiki_140thh">(stats),</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 阶段统计</span></span>
<span class="line"><span class="__shiki_140thh">      executionStages: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeExecutionStages</span><span class="__shiki_140thh">(stats.executionStages),</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 所有计划统计</span></span>
<span class="line"><span class="__shiki_140thh">      allPlansExecution: stats.allPlansExecution?.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">plan</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> ({</span></span>
<span class="line"><span class="__shiki_140thh">        nReturned: plan.nReturned,</span></span>
<span class="line"><span class="__shiki_140thh">        executionTimeMillisEstimate: plan.executionTimeMillisEstimate,</span></span>
<span class="line"><span class="__shiki_140thh">        totalKeysExamined: plan.totalKeysExamined,</span></span>
<span class="line"><span class="__shiki_140thh">        totalDocsExamined: plan.totalDocsExamined</span></span>
<span class="line"><span class="__shiki_140thh">      }))</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  calculateIndexEfficiency</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">stats</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (stats.totalKeysExamined </span><span class="__shiki_1itgoe">===</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_mdbnqw"> &#39;N/A&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      keysPerDocument: (stats.totalKeysExamined </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> stats.nReturned).</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      efficiency: (stats.nReturned </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> stats.totalKeysExamined </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &#39;%&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  calculateDocumentEfficiency</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">stats</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (stats.totalDocsExamined </span><span class="__shiki_1itgoe">===</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_mdbnqw"> &#39;N/A&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      documentsPerReturn: (stats.totalDocsExamined </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> stats.nReturned).</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      efficiency: (stats.nReturned </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> stats.totalDocsExamined </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &#39;%&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  analyzeExecutionStages</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">stage</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> analysis</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      stage: stage.stage,</span></span>
<span class="line"><span class="__shiki_140thh">      nReturned: stage.nReturned,</span></span>
<span class="line"><span class="__shiki_140thh">      executionTimeMillisEstimate: stage.executionTimeMillisEstimate,</span></span>
<span class="line"><span class="__shiki_140thh">      works: stage.works,</span></span>
<span class="line"><span class="__shiki_140thh">      advanced: stage.advanced,</span></span>
<span class="line"><span class="__shiki_140thh">      needTime: stage.needTime,</span></span>
<span class="line"><span class="__shiki_140thh">      needYield: stage.needYield,</span></span>
<span class="line"><span class="__shiki_140thh">      isEOF: stage.isEOF </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 递归分析子阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (stage.inputStage) {</span></span>
<span class="line"><span class="__shiki_140thh">      analysis.inputStage </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeExecutionStages</span><span class="__shiki_140thh">(stage.inputStage);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (stage.innerStage) {</span></span>
<span class="line"><span class="__shiki_140thh">      analysis.innerStage </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeExecutionStages</span><span class="__shiki_140thh">(stage.innerStage);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (stage.outerStage) {</span></span>
<span class="line"><span class="__shiki_140thh">      analysis.outerStage </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeExecutionStages</span><span class="__shiki_140thh">(stage.outerStage);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (stage.thenStage) {</span></span>
<span class="line"><span class="__shiki_140thh">      analysis.thenStage </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeExecutionStages</span><span class="__shiki_140thh">(stage.thenStage);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (stage.elseStage) {</span></span>
<span class="line"><span class="__shiki_140thh">      analysis.elseStage </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeExecutionStages</span><span class="__shiki_140thh">(stage.elseStage);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> analysis;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  generateRecommendations</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> stats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.output.executionStats;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> recommendations</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查全表扫描</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (stats.totalDocsExamined </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 10000</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> stats.totalKeysExamined </span><span class="__shiki_1itgoe">===</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">      recommendations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        severity: </span><span class="__shiki_mdbnqw">&#39;CRITICAL&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        issue: </span><span class="__shiki_mdbnqw">&#39;全表扫描&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        suggestion: </span><span class="__shiki_mdbnqw">&#39;考虑添加合适的索引&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        details: </span><span class="__shiki_mdbnqw">\`扫描了 \${</span><span class="__shiki_140thh">stats</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">totalDocsExamined</span><span class="__shiki_mdbnqw">} 个文档但未使用索引\`</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查索引效率</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (stats.totalKeysExamined </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> efficiency</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> stats.nReturned </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> stats.totalKeysExamined;</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (efficiency </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0.1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        recommendations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          severity: </span><span class="__shiki_mdbnqw">&#39;HIGH&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          issue: </span><span class="__shiki_mdbnqw">&#39;低效索引使用&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          suggestion: </span><span class="__shiki_mdbnqw">&#39;优化索引或查询条件&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          details: </span><span class="__shiki_mdbnqw">\`检查了 \${</span><span class="__shiki_140thh">stats</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">totalKeysExamined</span><span class="__shiki_mdbnqw">} 个索引键但只返回 \${</span><span class="__shiki_140thh">stats</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">nReturned</span><span class="__shiki_mdbnqw">} 个文档\`</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查内存排序</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> executionStages</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeExecutionStages</span><span class="__shiki_140thh">(stats.executionStages);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">containsStage</span><span class="__shiki_140thh">(executionStages, </span><span class="__shiki_mdbnqw">&#39;SORT&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> sortStage</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">findStage</span><span class="__shiki_140thh">(executionStages, </span><span class="__shiki_mdbnqw">&#39;SORT&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (sortStage </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> sortStage.memLimit) {</span></span>
<span class="line"><span class="__shiki_140thh">        recommendations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          severity: </span><span class="__shiki_mdbnqw">&#39;MEDIUM&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          issue: </span><span class="__shiki_mdbnqw">&#39;内存排序&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          suggestion: </span><span class="__shiki_mdbnqw">&#39;考虑使用索引支持排序&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          details: </span><span class="__shiki_mdbnqw">&#39;排序操作在内存中进行，可能影响性能&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> recommendations;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  containsStage</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">stage</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">targetStage</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (stage.stage </span><span class="__shiki_1itgoe">===</span><span class="__shiki_140thh"> targetStage) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (stage.inputStage </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">containsStage</span><span class="__shiki_140thh">(stage.inputStage, targetStage)) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (stage.innerStage </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">containsStage</span><span class="__shiki_140thh">(stage.innerStage, targetStage)) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-查询执行阶段详解" tabindex="-1">3.2 查询执行阶段详解 <a class="header-anchor" href="#_3-2-查询执行阶段详解" aria-label="Permalink to &quot;3.2 查询执行阶段详解&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// MongoDB查询执行阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> queryExecutionStages</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 1. 获取阶段</span></span>
<span class="line"><span class="__shiki_140thh">  FETCH: {</span></span>
<span class="line"><span class="__shiki_140thh">    description: </span><span class="__shiki_mdbnqw">&quot;从集合中获取完整文档&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    occursWhen: </span><span class="__shiki_mdbnqw">&quot;索引扫描后需要返回完整文档时&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    optimization: </span><span class="__shiki_mdbnqw">&quot;使用覆盖索引避免FETCH阶段&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    example: {</span></span>
<span class="line"><span class="__shiki_140thh">      withFetch: </span><span class="__shiki_mdbnqw">&quot;索引扫描 → FETCH → 返回结果&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      withoutFetch: </span><span class="__shiki_mdbnqw">&quot;覆盖索引扫描 → 直接返回结果&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 2. 索引扫描阶段</span></span>
<span class="line"><span class="__shiki_140thh">  IXSCAN: {</span></span>
<span class="line"><span class="__shiki_140thh">    description: </span><span class="__shiki_mdbnqw">&quot;使用索引扫描&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    details: {</span></span>
<span class="line"><span class="__shiki_140thh">      direction: </span><span class="__shiki_mdbnqw">&quot;扫描方向（1:升序, -1:降序）&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      indexBounds: </span><span class="__shiki_mdbnqw">&quot;索引扫描的边界&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      indexName: </span><span class="__shiki_mdbnqw">&quot;使用的索引名称&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      isMultiKey: </span><span class="__shiki_mdbnqw">&quot;是否多键索引&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      keyPattern: </span><span class="__shiki_mdbnqw">&quot;索引键模式&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    variants: {</span></span>
<span class="line"><span class="__shiki_140thh">      forward: </span><span class="__shiki_mdbnqw">&quot;前向扫描（升序）&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      backward: </span><span class="__shiki_mdbnqw">&quot;反向扫描（降序）&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 3. 集合扫描阶段</span></span>
<span class="line"><span class="__shiki_140thh">  COLLSCAN: {</span></span>
<span class="line"><span class="__shiki_140thh">    description: </span><span class="__shiki_mdbnqw">&quot;全集合扫描&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    whenOccurs: {</span></span>
<span class="line"><span class="__shiki_140thh">      noIndex: </span><span class="__shiki_mdbnqw">&quot;没有合适的索引&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      lowSelectivity: </span><span class="__shiki_mdbnqw">&quot;索引选择性太低&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      smallCollection: </span><span class="__shiki_mdbnqw">&quot;集合很小&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    performance: {</span></span>
<span class="line"><span class="__shiki_140thh">      small: </span><span class="__shiki_mdbnqw">&quot;小集合可能可以接受&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      large: </span><span class="__shiki_mdbnqw">&quot;大集合必须避免&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 4. 排序阶段</span></span>
<span class="line"><span class="__shiki_140thh">  SORT: {</span></span>
<span class="line"><span class="__shiki_140thh">    description: </span><span class="__shiki_mdbnqw">&quot;在内存中排序&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    memoryLimit: </span><span class="__shiki_mdbnqw">&quot;100MB默认限制，超过会报错&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    optimization: {</span></span>
<span class="line"><span class="__shiki_140thh">      useIndex: </span><span class="__shiki_mdbnqw">&quot;使用索引支持排序&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      limit: </span><span class="__shiki_mdbnqw">&quot;结合limit减少排序数据量&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      allowDiskUse: </span><span class="__shiki_mdbnqw">&quot;允许使用磁盘临时文件&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 5. 限制阶段</span></span>
<span class="line"><span class="__shiki_140thh">  LIMIT: {</span></span>
<span class="line"><span class="__shiki_140thh">    description: </span><span class="__shiki_mdbnqw">&quot;限制返回的文档数量&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    position: </span><span class="__shiki_mdbnqw">&quot;通常在管道末尾&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    withSkip: </span><span class="__shiki_mdbnqw">&quot;LIMIT + SKIP组合&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 6. 跳过阶段</span></span>
<span class="line"><span class="__shiki_140thh">  SKIP: {</span></span>
<span class="line"><span class="__shiki_140thh">    description: </span><span class="__shiki_mdbnqw">&quot;跳过指定数量的文档&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    performance: {</span></span>
<span class="line"><span class="__shiki_140thh">      withIndex: </span><span class="__shiki_mdbnqw">&quot;配合索引效率高&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      withoutIndex: </span><span class="__shiki_mdbnqw">&quot;需要扫描所有跳过的文档&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 7. 投影阶段</span></span>
<span class="line"><span class="__shiki_140thh">  PROJECTION: {</span></span>
<span class="line"><span class="__shiki_140thh">    description: </span><span class="__shiki_mdbnqw">&quot;选择返回的字段&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    covered: </span><span class="__shiki_mdbnqw">&quot;覆盖查询可以在索引阶段完成投影&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    simple: </span><span class="__shiki_mdbnqw">&quot;{ _id: 0, field: 1 }&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    complex: </span><span class="__shiki_mdbnqw">&quot;包含表达式或嵌套字段&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 8. 聚合管道阶段</span></span>
<span class="line"><span class="__shiki_140thh">  aggregationStages: {</span></span>
<span class="line"><span class="__shiki_140thh">    $match: </span><span class="__shiki_mdbnqw">&quot;过滤文档，可能使用索引&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    $group: </span><span class="__shiki_mdbnqw">&quot;分组聚合&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    $sort: </span><span class="__shiki_mdbnqw">&quot;排序，可能使用索引&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    $lookup: </span><span class="__shiki_mdbnqw">&quot;关联查询&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    $unwind: </span><span class="__shiki_mdbnqw">&quot;展开数组&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 9. 特殊阶段</span></span>
<span class="line"><span class="__shiki_140thh">  specialStages: {</span></span>
<span class="line"><span class="__shiki_140thh">    COUNT_SCAN: </span><span class="__shiki_mdbnqw">&quot;使用索引计数&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    COUNT: </span><span class="__shiki_mdbnqw">&quot;全集合计数&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    TEXT: </span><span class="__shiki_mdbnqw">&quot;文本搜索&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    GEO_NEAR: </span><span class="__shiki_mdbnqw">&quot;地理空间近邻搜索&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    SHARDING_FILTER: </span><span class="__shiki_mdbnqw">&quot;分片集群过滤&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 10. 阶段组合模式</span></span>
<span class="line"><span class="__shiki_140thh">  commonPatterns: {</span></span>
<span class="line"><span class="__shiki_140thh">    optimal: </span><span class="__shiki_mdbnqw">&quot;IXSCAN → FETCH → PROJECTION&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    covered: </span><span class="__shiki_mdbnqw">&quot;IXSCAN → PROJECTION（覆盖查询）&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    sortCovered: </span><span class="__shiki_mdbnqw">&quot;IXSCAN → PROJECTION（排序也被索引覆盖）&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    inMemorySort: </span><span class="__shiki_mdbnqw">&quot;IXSCAN → FETCH → SORT → PROJECTION&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    collectionScan: </span><span class="__shiki_mdbnqw">&quot;COLLSCAN → SORT → PROJECTION&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 执行阶段性能分析器</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> StagePerformanceAnalyzer</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">executionStages</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.rootStage </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> executionStages;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.metrics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">collectMetrics</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  collectMetrics</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      totalTime: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateTotalTime</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.rootStage),</span></span>
<span class="line"><span class="__shiki_140thh">      stageBreakdown: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeStageBreakdown</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.rootStage),</span></span>
<span class="line"><span class="__shiki_140thh">      bottlenecks: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">identifyBottlenecks</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.rootStage),</span></span>
<span class="line"><span class="__shiki_140thh">      recommendations: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">generateStageRecommendations</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  calculateTotalTime</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">stage</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> total </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stage.executionTimeMillisEstimate </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (stage.inputStage) {</span></span>
<span class="line"><span class="__shiki_140thh">      total </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateTotalTime</span><span class="__shiki_140thh">(stage.inputStage);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (stage.innerStage) {</span></span>
<span class="line"><span class="__shiki_140thh">      total </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateTotalTime</span><span class="__shiki_140thh">(stage.innerStage);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (stage.outerStage) {</span></span>
<span class="line"><span class="__shiki_140thh">      total </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateTotalTime</span><span class="__shiki_140thh">(stage.outerStage);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> total;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  analyzeStageBreakdown</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">stage</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">path</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> currentPath</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> path </span><span class="__shiki_1itgoe">?</span><span class="__shiki_mdbnqw"> \`\${</span><span class="__shiki_140thh">path</span><span class="__shiki_mdbnqw">}.\${</span><span class="__shiki_140thh">stage</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">stage</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_140thh"> stage.stage;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> breakdown</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      stage: stage.stage,</span></span>
<span class="line"><span class="__shiki_140thh">      path: currentPath,</span></span>
<span class="line"><span class="__shiki_140thh">      time: stage.executionTimeMillisEstimate </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      documents: stage.nReturned </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      details: {</span></span>
<span class="line"><span class="__shiki_140thh">        works: stage.works,</span></span>
<span class="line"><span class="__shiki_140thh">        advanced: stage.advanced,</span></span>
<span class="line"><span class="__shiki_140thh">        needTime: stage.needTime,</span></span>
<span class="line"><span class="__shiki_140thh">        needYield: stage.needYield</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> children</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (stage.inputStage) {</span></span>
<span class="line"><span class="__shiki_140thh">      children.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeStageBreakdown</span><span class="__shiki_140thh">(stage.inputStage, currentPath));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (stage.innerStage) {</span></span>
<span class="line"><span class="__shiki_140thh">      children.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeStageBreakdown</span><span class="__shiki_140thh">(stage.innerStage, currentPath));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (stage.outerStage) {</span></span>
<span class="line"><span class="__shiki_140thh">      children.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeStageBreakdown</span><span class="__shiki_140thh">(stage.outerStage, currentPath));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (stage.thenStage) {</span></span>
<span class="line"><span class="__shiki_140thh">      children.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeStageBreakdown</span><span class="__shiki_140thh">(stage.thenStage, currentPath));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (stage.elseStage) {</span></span>
<span class="line"><span class="__shiki_140thh">      children.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeStageBreakdown</span><span class="__shiki_140thh">(stage.elseStage, currentPath));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (children.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">      breakdown.children </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> children;</span></span>
<span class="line"><span class="__shiki_140thh">      breakdown.childTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> children.</span><span class="__shiki_1t8gfj">reduce</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">sum</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">child</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> sum </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> child.time, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      breakdown.selfTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> breakdown.time </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> breakdown.childTime;</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      breakdown.selfTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> breakdown.time;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> breakdown;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  identifyBottlenecks</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">stage</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">threshold</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 0.3</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> bottlenecks</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> totalTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.metrics.totalTime;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_1t8gfj"> analyze</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">path</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> stageTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> s.executionTimeMillisEstimate </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> percentage</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (stageTime </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> totalTime) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (percentage </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> threshold </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        bottlenecks.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          stage: s.stage,</span></span>
<span class="line"><span class="__shiki_140thh">          path: path,</span></span>
<span class="line"><span class="__shiki_140thh">          time: stageTime,</span></span>
<span class="line"><span class="__shiki_140thh">          percentage: percentage.</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &#39;%&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          details: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getStageDetails</span><span class="__shiki_140thh">(s)</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 递归检查子阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (s.inputStage) </span><span class="__shiki_1t8gfj">analyze</span><span class="__shiki_140thh">(s.inputStage, </span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_140thh">path</span><span class="__shiki_mdbnqw">}.input\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (s.innerStage) </span><span class="__shiki_1t8gfj">analyze</span><span class="__shiki_140thh">(s.innerStage, </span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_140thh">path</span><span class="__shiki_mdbnqw">}.inner\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (s.outerStage) </span><span class="__shiki_1t8gfj">analyze</span><span class="__shiki_140thh">(s.outerStage, </span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_140thh">path</span><span class="__shiki_mdbnqw">}.outer\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    analyze</span><span class="__shiki_140thh">(stage, stage.stage);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> bottlenecks;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  getStageDetails</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">stage</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> details</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {};</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    switch</span><span class="__shiki_140thh"> (stage.stage) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;IXSCAN&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        details.indexName </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stage.indexName;</span></span>
<span class="line"><span class="__shiki_140thh">        details.direction </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stage.direction;</span></span>
<span class="line"><span class="__shiki_140thh">        details.indexBounds </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stage.indexBounds;</span></span>
<span class="line"><span class="__shiki_140thh">        details.isMultiKey </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stage.isMultiKey;</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;FETCH&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        details.filter </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stage.filter </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;无过滤&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;SORT&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        details.sortPattern </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stage.sortPattern;</span></span>
<span class="line"><span class="__shiki_140thh">        details.memLimit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stage.memLimit;</span></span>
<span class="line"><span class="__shiki_140thh">        details.limitAmount </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stage.limitAmount;</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;COLLSCAN&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        details.direction </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stage.direction;</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> details;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  generateStageRecommendations</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> recommendations</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> bottlenecks</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.metrics.bottlenecks;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    bottlenecks.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">bottleneck</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      switch</span><span class="__shiki_140thh"> (bottleneck.stage) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_mdbnqw"> &#39;COLLSCAN&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          recommendations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">            stage: </span><span class="__shiki_mdbnqw">&#39;COLLSCAN&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            issue: </span><span class="__shiki_mdbnqw">&#39;全表扫描&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            recommendation: </span><span class="__shiki_mdbnqw">&#39;添加合适的索引&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            priority: </span><span class="__shiki_mdbnqw">&#39;HIGH&#39;</span></span>
<span class="line"><span class="__shiki_140thh">          });</span></span>
<span class="line"><span class="__shiki_1itgoe">          break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_mdbnqw"> &#39;SORT&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          recommendations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">            stage: </span><span class="__shiki_mdbnqw">&#39;SORT&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            issue: </span><span class="__shiki_mdbnqw">&#39;内存排序&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            recommendation: </span><span class="__shiki_mdbnqw">&#39;使用索引支持排序&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            priority: </span><span class="__shiki_mdbnqw">&#39;MEDIUM&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            details: </span><span class="__shiki_mdbnqw">\`考虑在排序字段上创建索引\`</span></span>
<span class="line"><span class="__shiki_140thh">          });</span></span>
<span class="line"><span class="__shiki_1itgoe">          break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_mdbnqw"> &#39;FETCH&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 检查是否可以避免FETCH</span></span>
<span class="line"><span class="__shiki_1itgoe">          const</span><span class="__shiki_dzsirb"> fetchStage</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">findStageByName</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;FETCH&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">          if</span><span class="__shiki_140thh"> (fetchStage </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> fetchStage.inputStage </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> fetchStage.inputStage.stage </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;IXSCAN&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> indexStage</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> fetchStage.inputStage;</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">canUseCoveredIndex</span><span class="__shiki_140thh">(indexStage)) {</span></span>
<span class="line"><span class="__shiki_140thh">              recommendations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                stage: </span><span class="__shiki_mdbnqw">&#39;FETCH&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                issue: </span><span class="__shiki_mdbnqw">&#39;不必要的文档获取&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                recommendation: </span><span class="__shiki_mdbnqw">&#39;使用覆盖索引&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                priority: </span><span class="__shiki_mdbnqw">&#39;LOW&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                details: </span><span class="__shiki_mdbnqw">&#39;修改投影或索引以支持覆盖查询&#39;</span></span>
<span class="line"><span class="__shiki_140thh">              });</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_1itgoe">          break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> recommendations;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_4-索引优化策略与实战" tabindex="-1">4. 索引优化策略与实战 <a class="header-anchor" href="#_4-索引优化策略与实战" aria-label="Permalink to &quot;4. 索引优化策略与实战&quot;">​</a></h2><h3 id="_4-1-索引设计策略" tabindex="-1">4.1 索引设计策略 <a class="header-anchor" href="#_4-1-索引设计策略" aria-label="Permalink to &quot;4.1 索引设计策略&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 系统性索引设计方法</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> IndexDesignStrategy</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">workloadAnalysis</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.workload </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> workloadAnalysis;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.existingIndexes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.recommendations </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 1. 查询模式分析</span></span>
<span class="line"><span class="__shiki_1t8gfj">  analyzeQueryPatterns</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">queries</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> patterns</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      equality: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Set</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">      sort: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Set</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">      range: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Set</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">      multiKey: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Set</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    queries.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">query</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 分析查询条件</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> analysis</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeSingleQuery</span><span class="__shiki_140thh">(query);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 收集字段使用模式</span></span>
<span class="line"><span class="__shiki_140thh">      analysis.equalityFields.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">field</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> patterns.equality.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(field));</span></span>
<span class="line"><span class="__shiki_140thh">      analysis.sortFields.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">field</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> patterns.sort.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(field));</span></span>
<span class="line"><span class="__shiki_140thh">      analysis.rangeFields.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">field</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> patterns.range.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(field));</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (analysis.hasArrays) {</span></span>
<span class="line"><span class="__shiki_140thh">        analysis.arrayFields.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">field</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> patterns.multiKey.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(field));</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      patterns,</span></span>
<span class="line"><span class="__shiki_140thh">      fieldFrequency: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateFieldFrequency</span><span class="__shiki_140thh">(queries),</span></span>
<span class="line"><span class="__shiki_140thh">      queryTypes: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">categorizeQueryTypes</span><span class="__shiki_140thh">(queries)</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 2. ESR规则应用</span></span>
<span class="line"><span class="__shiki_1t8gfj">  applyESRRule</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">queryPatterns</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> indexes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 对每种查询类型应用ESR</span></span>
<span class="line"><span class="__shiki_140thh">    queryPatterns.queryTypes.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">queryType</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> candidate</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">buildESRIndex</span><span class="__shiki_140thh">(queryType);</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (candidate) {</span></span>
<span class="line"><span class="__shiki_140thh">        indexes.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(candidate);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 合并相似索引</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">mergeSimilarIndexes</span><span class="__shiki_140thh">(indexes);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  buildESRIndex</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">queryType</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> fields</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. Equality字段（等值查询）</span></span>
<span class="line"><span class="__shiki_140thh">    queryType.equalityFields.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">field</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      fields.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({ field, order: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }); </span><span class="__shiki_21nrsd">// 顺序不重要</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. Sort字段（排序）</span></span>
<span class="line"><span class="__shiki_140thh">    queryType.sortFields.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">field</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      fields.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({ </span></span>
<span class="line"><span class="__shiki_140thh">        field, </span></span>
<span class="line"><span class="__shiki_140thh">        order: queryType.sortDirection[field] </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. Range字段（范围查询）</span></span>
<span class="line"><span class="__shiki_140thh">    queryType.rangeFields.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">field</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 范围查询字段放在最后</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">fields.</span><span class="__shiki_1t8gfj">some</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">f</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> f.field </span><span class="__shiki_1itgoe">===</span><span class="__shiki_140thh"> field)) {</span></span>
<span class="line"><span class="__shiki_140thh">        fields.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({ field, order: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (fields.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      fields: fields.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">f</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> ({ [f.field]: f.order })),</span></span>
<span class="line"><span class="__shiki_140thh">      type: </span><span class="__shiki_mdbnqw">&#39;compound&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      covers: queryType.queries,</span></span>
<span class="line"><span class="__shiki_140thh">      estimatedSize: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">estimateIndexSize</span><span class="__shiki_140thh">(fields, queryType.frequency)</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 3. 索引合并与优化</span></span>
<span class="line"><span class="__shiki_1t8gfj">  mergeSimilarIndexes</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">indexes</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> merged</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> threshold</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 0.7</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 相似度阈值</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    indexes.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">index</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      let</span><span class="__shiki_140thh"> mergedFlag </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> merged.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> existing</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> merged[i];</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> similarity</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateIndexSimilarity</span><span class="__shiki_140thh">(index, existing);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (similarity </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> threshold) {</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 合并索引</span></span>
<span class="line"><span class="__shiki_140thh">          merged[i] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">mergeTwoIndexes</span><span class="__shiki_140thh">(existing, index);</span></span>
<span class="line"><span class="__shiki_140thh">          mergedFlag </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">          break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">mergedFlag) {</span></span>
<span class="line"><span class="__shiki_140thh">        merged.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(index);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> merged;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  calculateIndexSimilarity</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">index1</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">index2</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> fields1</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">extractFieldNames</span><span class="__shiki_140thh">(index1.fields);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> fields2</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">extractFieldNames</span><span class="__shiki_140thh">(index2.fields);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> intersection</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> fields1.</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">f</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> fields2.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(f));</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> union</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [</span><span class="__shiki_1itgoe">...new</span><span class="__shiki_1t8gfj"> Set</span><span class="__shiki_140thh">([</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">fields1, </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">fields2])];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> intersection.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> union.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 4. 选择性计算</span></span>
<span class="line"><span class="__shiki_1t8gfj">  calculateSelectivity</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">field</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">collectionStats</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 选择性 = 不同值的数量 / 总文档数</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> distinctValues</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">estimateDistinctValues</span><span class="__shiki_140thh">(field, collectionStats);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> totalDocs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> collectionStats.count;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      selectivity: distinctValues </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> totalDocs,</span></span>
<span class="line"><span class="__shiki_140thh">      distinctValues,</span></span>
<span class="line"><span class="__shiki_140thh">      cardinality: distinctValues</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  estimateDistinctValues</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">field</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">stats</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 基于数据分布的估计</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (stats.fieldStats </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> stats.fieldStats[field]) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> stats.fieldStats[field].distinct;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 启发式估计</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (field </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;_id&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh"> stats.count;</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (field.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Id&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> field.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Code&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">min</span><span class="__shiki_140thh">(stats.count, </span><span class="__shiki_dzsirb">100000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (field.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Status&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> field.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Type&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">min</span><span class="__shiki_140thh">(stats.count, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">min</span><span class="__shiki_140thh">(stats.count, </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 默认估计</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 5. 索引大小估算</span></span>
<span class="line"><span class="__shiki_1t8gfj">  estimateIndexSize</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">indexFields</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">frequency</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 简化估算公式</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> entrySize</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> indexFields.</span><span class="__shiki_1t8gfj">reduce</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">sum</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">field</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> sum </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">estimateFieldSize</span><span class="__shiki_140thh">(field.field);</span></span>
<span class="line"><span class="__shiki_140thh">    }, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 24</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 开销</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> entries</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> frequency </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 假设频率代表查询次数</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> entrySize </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> entries;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  estimateFieldSize</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">fieldName</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 基于字段名的启发式估算</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> patterns</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      id: </span><span class="__shiki_dzsirb">24</span><span class="__shiki_140thh">,           </span><span class="__shiki_21nrsd">// ObjectId</span></span>
<span class="line"><span class="__shiki_140thh">      name: </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">,         </span><span class="__shiki_21nrsd">// 字符串</span></span>
<span class="line"><span class="__shiki_140thh">      email: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">,        </span><span class="__shiki_21nrsd">// 邮箱</span></span>
<span class="line"><span class="__shiki_140thh">      date: </span><span class="__shiki_dzsirb">8</span><span class="__shiki_140thh">,          </span><span class="__shiki_21nrsd">// 日期</span></span>
<span class="line"><span class="__shiki_140thh">      number: </span><span class="__shiki_dzsirb">8</span><span class="__shiki_140thh">,        </span><span class="__shiki_21nrsd">// 数字</span></span>
<span class="line"><span class="__shiki_140thh">      boolean: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,       </span><span class="__shiki_21nrsd">// 布尔值</span></span>
<span class="line"><span class="__shiki_140thh">      default: </span><span class="__shiki_dzsirb">20</span><span class="__shiki_21nrsd">       // 默认</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">pattern</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">size</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">of</span><span class="__shiki_140thh"> Object.</span><span class="__shiki_1t8gfj">entries</span><span class="__shiki_140thh">(patterns)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (fieldName.</span><span class="__shiki_1t8gfj">toLowerCase</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(pattern)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> size;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> patterns.default;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 6. 生成索引建议</span></span>
<span class="line"><span class="__shiki_1t8gfj">  generateIndexRecommendations</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> analysis</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeQueryPatterns</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.workload.queries);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> candidateIndexes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">applyESRRule</span><span class="__shiki_140thh">(analysis);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> existingIndexes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.existingIndexes;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> recommendations</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      newIndexes: [],</span></span>
<span class="line"><span class="__shiki_140thh">      modifiedIndexes: [],</span></span>
<span class="line"><span class="__shiki_140thh">      droppedIndexes: [],</span></span>
<span class="line"><span class="__shiki_140thh">      retainedIndexes: []</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 对比现有索引</span></span>
<span class="line"><span class="__shiki_140thh">    candidateIndexes.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">candidate</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> existing</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">findMatchingExistingIndex</span><span class="__shiki_140thh">(candidate, existingIndexes);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">existing) {</span></span>
<span class="line"><span class="__shiki_140thh">        recommendations.newIndexes.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          index: candidate,</span></span>
<span class="line"><span class="__shiki_140thh">          reason: </span><span class="__shiki_mdbnqw">&#39;没有现有索引支持此查询模式&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          priority: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculatePriority</span><span class="__shiki_140thh">(candidate)</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">shouldModifyIndex</span><span class="__shiki_140thh">(existing, candidate)) {</span></span>
<span class="line"><span class="__shiki_140thh">        recommendations.modifiedIndexes.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          from: existing,</span></span>
<span class="line"><span class="__shiki_140thh">          to: candidate,</span></span>
<span class="line"><span class="__shiki_140thh">          reason: </span><span class="__shiki_mdbnqw">&#39;现有索引不最优，建议修改&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        recommendations.retainedIndexes.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(existing);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 识别应该删除的索引</span></span>
<span class="line"><span class="__shiki_140thh">    existingIndexes.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">existing</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">isIndexUsed</span><span class="__shiki_140thh">(existing, candidateIndexes)) {</span></span>
<span class="line"><span class="__shiki_140thh">        recommendations.droppedIndexes.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          index: existing,</span></span>
<span class="line"><span class="__shiki_140thh">          reason: </span><span class="__shiki_mdbnqw">&#39;没有查询使用此索引&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          lastUsed: existing.lastUsed</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> recommendations;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  calculatePriority</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">index</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 基于覆盖查询数量和频率计算优先级</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> coverageScore</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> index.covers.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> frequencyScore</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> index.covers.</span><span class="__shiki_1t8gfj">reduce</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">sum</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">query</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">      sum </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> (query.frequency </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> selectivityScore</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateOverallSelectivity</span><span class="__shiki_140thh">(index);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> coverageScore </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.3</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> frequencyScore </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.5</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> selectivityScore </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-查询优化技术" tabindex="-1">4.2 查询优化技术 <a class="header-anchor" href="#_4-2-查询优化技术" aria-label="Permalink to &quot;4.2 查询优化技术&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 高级查询优化技术</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> queryOptimizationTechniques</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 1. 覆盖查询优化</span></span>
<span class="line"><span class="__shiki_140thh">  coveredQueries: {</span></span>
<span class="line"><span class="__shiki_140thh">    concept: </span><span class="__shiki_mdbnqw">&quot;查询只需要扫描索引，不需要访问文档&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    requirements: {</span></span>
<span class="line"><span class="__shiki_140thh">      projection: </span><span class="__shiki_mdbnqw">&quot;查询的投影字段都在索引中&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      noFieldsExcluded: </span><span class="__shiki_mdbnqw">&quot;不能排除_id除非索引包含_id&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      filterFields: </span><span class="__shiki_mdbnqw">&quot;查询条件字段在索引前缀中&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    examples: {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 覆盖查询示例</span></span>
<span class="line"><span class="__shiki_140thh">      covered: {</span></span>
<span class="line"><span class="__shiki_140thh">        index: { userId: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, createdAt: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, status: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        query: {</span></span>
<span class="line"><span class="__shiki_140thh">          find: { userId: </span><span class="__shiki_mdbnqw">&quot;123&quot;</span><span class="__shiki_140thh">, status: </span><span class="__shiki_mdbnqw">&quot;active&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">          projection: { userId: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, createdAt: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, _id: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">          sort: { createdAt: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        explain: </span><span class="__shiki_mdbnqw">&quot;只显示IXSCAN，没有FETCH阶段&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 非覆盖查询</span></span>
<span class="line"><span class="__shiki_140thh">      notCovered: {</span></span>
<span class="line"><span class="__shiki_140thh">        index: { userId: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, createdAt: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        query: {</span></span>
<span class="line"><span class="__shiki_140thh">          find: { userId: </span><span class="__shiki_mdbnqw">&quot;123&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">          projection: { userId: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, email: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }, </span><span class="__shiki_21nrsd">// email不在索引中</span></span>
<span class="line"><span class="__shiki_140thh">          sort: { createdAt: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        explain: </span><span class="__shiki_mdbnqw">&quot;显示IXSCAN → FETCH&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    optimization: {</span></span>
<span class="line"><span class="__shiki_140thh">      addFields: </span><span class="__shiki_mdbnqw">&quot;在索引中添加需要的字段&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      modifyProjection: </span><span class="__shiki_mdbnqw">&quot;调整投影只使用索引字段&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      includeId: </span><span class="__shiki_mdbnqw">&quot;如果不需要_id，在索引中包含{_id: 0}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 2. 索引交集优化</span></span>
<span class="line"><span class="__shiki_140thh">  indexIntersection: {</span></span>
<span class="line"><span class="__shiki_140thh">    concept: </span><span class="__shiki_mdbnqw">&quot;MongoDB自动使用多个索引的交集&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    whenUsed: {</span></span>
<span class="line"><span class="__shiki_140thh">      compoundNotOptimal: </span><span class="__shiki_mdbnqw">&quot;没有完美的复合索引时&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      multipleConditions: </span><span class="__shiki_mdbnqw">&quot;查询有多个独立条件&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      optimizerChoice: </span><span class="__shiki_mdbnqw">&quot;查询优化器判断有效时&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    example: {</span></span>
<span class="line"><span class="__shiki_140thh">      indexes: [</span></span>
<span class="line"><span class="__shiki_140thh">        { category: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        { price: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        { rating: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">      ],</span></span>
<span class="line"><span class="__shiki_140thh">      query: {</span></span>
<span class="line"><span class="__shiki_140thh">        category: </span><span class="__shiki_mdbnqw">&quot;electronics&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        price: { $lt: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        rating: { $gt: </span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      execution: </span><span class="__shiki_mdbnqw">&quot;可能使用category和price索引的交集&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    limitations: {</span></span>
<span class="line"><span class="__shiki_140thh">      performance: </span><span class="__shiki_mdbnqw">&quot;通常不如复合索引高效&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      memory: </span><span class="__shiki_mdbnqw">&quot;需要在内存中计算交集&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      restrictions: </span><span class="__shiki_mdbnqw">&quot;对某些操作符有限制&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 3. 索引下推优化</span></span>
<span class="line"><span class="__shiki_140thh">  indexPushdown: {</span></span>
<span class="line"><span class="__shiki_140thh">    concept: </span><span class="__shiki_mdbnqw">&quot;将过滤条件推送到索引扫描阶段&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    operations: {</span></span>
<span class="line"><span class="__shiki_140thh">      equality: </span><span class="__shiki_mdbnqw">&quot;=, $in, $eq&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      range: </span><span class="__shiki_mdbnqw">&quot;$gt, $lt, $gte, $lte&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      regex: </span><span class="__shiki_mdbnqw">&quot;前缀正则表达式（^pattern）&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    examples: {</span></span>
<span class="line"><span class="__shiki_140thh">      pushed: {</span></span>
<span class="line"><span class="__shiki_140thh">        index: { name: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, age: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        query: { </span></span>
<span class="line"><span class="__shiki_140thh">          name:</span><span class="__shiki_mdbnqw"> /</span><span class="__shiki_1itgoe">^</span><span class="__shiki_21q97f">John</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 前缀正则，可以下推</span></span>
<span class="line"><span class="__shiki_140thh">          age: { $gt: </span><span class="__shiki_dzsirb">25</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      notPushed: {</span></span>
<span class="line"><span class="__shiki_140thh">        index: { name: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        query: { </span></span>
<span class="line"><span class="__shiki_140thh">          name:</span><span class="__shiki_mdbnqw"> /</span><span class="__shiki_21q97f">Doe</span><span class="__shiki_1itgoe">$</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_21nrsd">  // 后缀正则，不能下推</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 4. 排序优化</span></span>
<span class="line"><span class="__shiki_140thh">  sortOptimization: {</span></span>
<span class="line"><span class="__shiki_140thh">    techniques: {</span></span>
<span class="line"><span class="__shiki_140thh">      indexSort: </span><span class="__shiki_mdbnqw">&quot;使用索引的自然顺序&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      memorySort: </span><span class="__shiki_mdbnqw">&quot;内存排序（有限制）&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      externalSort: </span><span class="__shiki_mdbnqw">&quot;使用磁盘的排序&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    indexSortPatterns: {</span></span>
<span class="line"><span class="__shiki_140thh">      exactMatch: {</span></span>
<span class="line"><span class="__shiki_140thh">        index: { a: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, b: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        query: { a: </span><span class="__shiki_mdbnqw">&quot;value&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        sort: { b: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }, </span><span class="__shiki_21nrsd">// 匹配索引</span></span>
<span class="line"><span class="__shiki_140thh">        performance: </span><span class="__shiki_mdbnqw">&quot;最优&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      prefixMatch: {</span></span>
<span class="line"><span class="__shiki_140thh">        index: { a: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, b: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, c: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        query: { a: </span><span class="__shiki_mdbnqw">&quot;value&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        sort: { b: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }, </span><span class="__shiki_21nrsd">// b是索引前缀</span></span>
<span class="line"><span class="__shiki_140thh">        performance: </span><span class="__shiki_mdbnqw">&quot;良好&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      nonMatch: {</span></span>
<span class="line"><span class="__shiki_140thh">        index: { a: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, b: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        query: { a: </span><span class="__shiki_mdbnqw">&quot;value&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        sort: { c: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }, </span><span class="__shiki_21nrsd">// c不在索引中</span></span>
<span class="line"><span class="__shiki_140thh">        performance: </span><span class="__shiki_mdbnqw">&quot;需要内存排序&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    inMemorySortOptimization: {</span></span>
<span class="line"><span class="__shiki_140thh">      limit: </span><span class="__shiki_mdbnqw">&quot;添加limit减少排序数据量&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      earlyFilter: </span><span class="__shiki_mdbnqw">&quot;在排序前尽可能过滤&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      allowDiskUse: </span><span class="__shiki_mdbnqw">&quot;对于大数据集使用磁盘排序&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 5. 分页优化</span></span>
<span class="line"><span class="__shiki_140thh">  paginationOptimization: {</span></span>
<span class="line"><span class="__shiki_140thh">    problems: {</span></span>
<span class="line"><span class="__shiki_140thh">      skipLimit: {</span></span>
<span class="line"><span class="__shiki_140thh">        query: db.collection.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">skip</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">limit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        issue: </span><span class="__shiki_mdbnqw">&quot;需要扫描并跳过10000个文档&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    solutions: {</span></span>
<span class="line"><span class="__shiki_140thh">      rangeBased: {</span></span>
<span class="line"><span class="__shiki_140thh">        concept: </span><span class="__shiki_mdbnqw">&quot;基于值的分页，而不是skip&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        example: {</span></span>
<span class="line"><span class="__shiki_140thh">          firstPage: db.users.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">({}).</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">({ _id: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }).</span><span class="__shiki_1t8gfj">limit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">          nextPage: db.users.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">({ _id: { $gt: lastId } })</span></span>
<span class="line"><span class="__shiki_140thh">                         .</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">({ _id: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }).</span><span class="__shiki_1t8gfj">limit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        requirement: </span><span class="__shiki_mdbnqw">&quot;排序字段唯一且可比较&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      indexedSkip: {</span></span>
<span class="line"><span class="__shiki_140thh">        concept: </span><span class="__shiki_mdbnqw">&quot;在索引字段上使用skip&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        condition: </span><span class="__shiki_mdbnqw">&quot;skip字段必须是索引前缀&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      bucketPattern: {</span></span>
<span class="line"><span class="__shiki_140thh">        concept: </span><span class="__shiki_mdbnqw">&quot;将数据分桶，按桶分页&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        useCase: </span><span class="__shiki_mdbnqw">&quot;时间序列数据按时间分桶&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 6. 聚合管道优化</span></span>
<span class="line"><span class="__shiki_140thh">  aggregationOptimization: {</span></span>
<span class="line"><span class="__shiki_140thh">    optimizationStages: {</span></span>
<span class="line"><span class="__shiki_140thh">      $match: {</span></span>
<span class="line"><span class="__shiki_140thh">        earlyMatch: </span><span class="__shiki_mdbnqw">&quot;尽量在管道开始处使用$match&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        indexUsage: </span><span class="__shiki_mdbnqw">&quot;$match可以使用索引&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        pushdown: </span><span class="__shiki_mdbnqw">&quot;将$match推送到find()中&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      $sort: {</span></span>
<span class="line"><span class="__shiki_140thh">        indexSort: </span><span class="__shiki_mdbnqw">&quot;$sort可以使用索引&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        memorySort: </span><span class="__shiki_mdbnqw">&quot;注意内存使用限制&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        limitSort: </span><span class="__shiki_mdbnqw">&quot;$sort + $limit可以优化&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      $project: {</span></span>
<span class="line"><span class="__shiki_140thh">        earlyProject: </span><span class="__shiki_mdbnqw">&quot;尽早减少字段&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        exclusion: </span><span class="__shiki_mdbnqw">&quot;排除不需要的字段&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        computedFields: </span><span class="__shiki_mdbnqw">&quot;注意计算字段的性能&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      $lookup: {</span></span>
<span class="line"><span class="__shiki_140thh">        indexedJoin: </span><span class="__shiki_mdbnqw">&quot;确保关联字段有索引&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        pipeline: </span><span class="__shiki_mdbnqw">&quot;使用pipeline进行复杂关联&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        uncorrelated: </span><span class="__shiki_mdbnqw">&quot;非相关子查询更高效&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    explainAggregation: {</span></span>
<span class="line"><span class="__shiki_140thh">      command: db.collection.</span><span class="__shiki_1t8gfj">aggregate</span><span class="__shiki_140thh">(pipeline).</span><span class="__shiki_1t8gfj">explain</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">      stages: </span><span class="__shiki_mdbnqw">&quot;查看每个聚合阶段的执行计划&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      optimization: </span><span class="__shiki_mdbnqw">&quot;识别可以优化的阶段&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 7. 查询重写技术</span></span>
<span class="line"><span class="__shiki_140thh">  queryRewriting: {</span></span>
<span class="line"><span class="__shiki_140thh">    equivalentForms: {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // $in vs $or</span></span>
<span class="line"><span class="__shiki_140thh">      inVsOr: {</span></span>
<span class="line"><span class="__shiki_140thh">        original: { $or: [{status: </span><span class="__shiki_mdbnqw">&quot;A&quot;</span><span class="__shiki_140thh">}, {status: </span><span class="__shiki_mdbnqw">&quot;B&quot;</span><span class="__shiki_140thh">}, {status: </span><span class="__shiki_mdbnqw">&quot;C&quot;</span><span class="__shiki_140thh">}] },</span></span>
<span class="line"><span class="__shiki_140thh">        optimized: { status: { $in: [</span><span class="__shiki_mdbnqw">&quot;A&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;B&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;C&quot;</span><span class="__shiki_140thh">] } },</span></span>
<span class="line"><span class="__shiki_140thh">        benefit: </span><span class="__shiki_mdbnqw">&quot;$in更高效，单个索引扫描&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 嵌套查询扁平化</span></span>
<span class="line"><span class="__shiki_140thh">      flatten: {</span></span>
<span class="line"><span class="__shiki_140thh">        original: { </span><span class="__shiki_mdbnqw">&quot;address.city&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;New York&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        optimized: { </span><span class="__shiki_mdbnqw">&quot;address.city&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;New York&quot;</span><span class="__shiki_140thh"> }, </span><span class="__shiki_21nrsd">// 已优化</span></span>
<span class="line"><span class="__shiki_140thh">        note: </span><span class="__shiki_mdbnqw">&quot;点表示法本身已优化&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 范围查询合并</span></span>
<span class="line"><span class="__shiki_140thh">      rangeMerge: {</span></span>
<span class="line"><span class="__shiki_140thh">        original: { age: { $gt: </span><span class="__shiki_dzsirb">18</span><span class="__shiki_140thh"> }, age: { $lt: </span><span class="__shiki_dzsirb">65</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">        optimized: { age: { $gt: </span><span class="__shiki_dzsirb">18</span><span class="__shiki_140thh">, $lt: </span><span class="__shiki_dzsirb">65</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">        benefit: </span><span class="__shiki_mdbnqw">&quot;单个范围条件&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    indexHinting: {</span></span>
<span class="line"><span class="__shiki_140thh">      concept: </span><span class="__shiki_mdbnqw">&quot;强制使用特定索引&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      usage: db.collection.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(query).</span><span class="__shiki_1t8gfj">hint</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;index_name&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      scenarios: {</span></span>
<span class="line"><span class="__shiki_140thh">        optimizerError: </span><span class="__shiki_mdbnqw">&quot;优化器选择了错误的索引&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        testing: </span><span class="__shiki_mdbnqw">&quot;测试不同索引的性能&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        temporary: </span><span class="__shiki_mdbnqw">&quot;临时解决性能问题&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      risks: </span><span class="__shiki_mdbnqw">&quot;可能阻止优化器选择更好的索引&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_4-3-性能监控与调优" tabindex="-1">4.3 性能监控与调优 <a class="header-anchor" href="#_4-3-性能监控与调优" aria-label="Permalink to &quot;4.3 性能监控与调优&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// MongoDB索引性能监控系统</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> IndexPerformanceMonitor</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">client</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.client </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> client;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.metrics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      indexUsage: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">      queryPerformance: [],</span></span>
<span class="line"><span class="__shiki_140thh">      recommendations: []</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">startMonitoring</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  startMonitoring</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 定期收集索引统计</span></span>
<span class="line"><span class="__shiki_1t8gfj">    setInterval</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">collectIndexStats</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }, </span><span class="__shiki_dzsirb">60000</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 每分钟</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 监控慢查询</span></span>
<span class="line"><span class="__shiki_1t8gfj">    setInterval</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeSlowQueries</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }, </span><span class="__shiki_dzsirb">300000</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 每5分钟</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 生成报告</span></span>
<span class="line"><span class="__shiki_1t8gfj">    setInterval</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">generatePerformanceReport</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }, </span><span class="__shiki_dzsirb">3600000</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 每小时</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> collectIndexStats</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> adminDb</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;admin&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 获取所有数据库</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> dbs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> adminDb.</span><span class="__shiki_1t8gfj">admin</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">listDatabases</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> dbInfo</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> dbs.databases) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> dbName</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> dbInfo.name;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 跳过系统数据库</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ([</span><span class="__shiki_mdbnqw">&#39;admin&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;local&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;config&#39;</span><span class="__shiki_140thh">].</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(dbName)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">          continue</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(dbName);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 获取所有集合</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> collections</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">listCollections</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> collInfo</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> collections) {</span></span>
<span class="line"><span class="__shiki_1itgoe">          await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeCollectionIndexes</span><span class="__shiki_140thh">(dbName, collInfo.name, db);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Error collecting index stats:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> analyzeCollectionIndexes</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">dbName</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">collectionName</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">db</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> collection</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(collectionName);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 获取索引统计</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> indexStats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">aggregate</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_140thh">      { $indexStats: {} }</span></span>
<span class="line"><span class="__shiki_140thh">    ]).</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 获取集合统计</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> collStats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">command</span><span class="__shiki_140thh">({ </span></span>
<span class="line"><span class="__shiki_140thh">      collStats: collectionName </span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 分析每个索引</span></span>
<span class="line"><span class="__shiki_140thh">    indexStats.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">indexStat</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> indexKey</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> \`\${</span><span class="__shiki_140thh">dbName</span><span class="__shiki_mdbnqw">}.\${</span><span class="__shiki_140thh">collectionName</span><span class="__shiki_mdbnqw">}.\${</span><span class="__shiki_140thh">indexStat</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> analysis</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        name: indexStat.name,</span></span>
<span class="line"><span class="__shiki_140thh">        key: indexStat.key,</span></span>
<span class="line"><span class="__shiki_140thh">        accesses: indexStat.accesses,</span></span>
<span class="line"><span class="__shiki_140thh">        usage: {</span></span>
<span class="line"><span class="__shiki_140thh">          ops: indexStat.accesses?.ops </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          since: indexStat.accesses?.since </span><span class="__shiki_1itgoe">||</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        size: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getIndexSize</span><span class="__shiki_140thh">(indexStat.name, collStats),</span></span>
<span class="line"><span class="__shiki_140thh">        operations: indexStat.accesses,</span></span>
<span class="line"><span class="__shiki_140thh">        lastUsed: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getLastUsedTime</span><span class="__shiki_140thh">(indexStat.accesses)</span></span>
<span class="line"><span class="__shiki_140thh">      };</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 计算使用率</span></span>
<span class="line"><span class="__shiki_140thh">      analysis.utilization </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateIndexUtilization</span><span class="__shiki_140thh">(analysis);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 存储分析结果</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.metrics.indexUsage.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(indexKey, analysis);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 生成建议</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">generateIndexRecommendations</span><span class="__shiki_140thh">(indexKey, analysis, collStats);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  getIndexSize</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">indexName</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">collStats</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">collStats.indexSizes) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 查找索引大小</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">key</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">size</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">of</span><span class="__shiki_140thh"> Object.</span><span class="__shiki_1t8gfj">entries</span><span class="__shiki_140thh">(collStats.indexSizes)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (key </span><span class="__shiki_1itgoe">===</span><span class="__shiki_140thh"> indexName </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> key.</span><span class="__shiki_1t8gfj">endsWith</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`_\${</span><span class="__shiki_140thh">indexName</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> size;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  calculateIndexUtilization</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">indexAnalysis</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> ops</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> indexAnalysis.usage.ops;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> since</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(indexAnalysis.usage.since);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> hours</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> since.</span><span class="__shiki_1t8gfj">getTime</span><span class="__shiki_140thh">()) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (hours </span><span class="__shiki_1itgoe">===</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 使用率 = 操作次数 / 时间（小时）</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> ops </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> hours;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  getLastUsedTime</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">accesses</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">accesses) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 从operations中提取最后使用时间</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> ops</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> accesses.ops </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (ops.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(Math.</span><span class="__shiki_1t8gfj">max</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">ops.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">op</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(op).</span><span class="__shiki_1t8gfj">getTime</span><span class="__shiki_140thh">())));</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> analyzeSlowQueries</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> adminDb</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;admin&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 从system.profile读取慢查询</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> profileDb</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;test&#39;</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// profile可能在其他数据库</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> slowQueries</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> profileDb.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;system.profile&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          millis: { $gt: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh"> }, </span><span class="__shiki_21nrsd">// 超过100ms的查询</span></span>
<span class="line"><span class="__shiki_140thh">          op: { $in: [</span><span class="__shiki_mdbnqw">&#39;query&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;update&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;remove&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;getmore&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;command&#39;</span><span class="__shiki_140thh">] }</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">({ ts: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">limit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 分析每个慢查询</span></span>
<span class="line"><span class="__shiki_140thh">      slowQueries.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">query</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeSingleQuery</span><span class="__shiki_140thh">(query);</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // system.profile可能不存在或禁用</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Could not analyze slow queries:&#39;</span><span class="__shiki_140thh">, error.message);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  analyzeSingleQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">profileEntry</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> analysis</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      timestamp: profileEntry.ts,</span></span>
<span class="line"><span class="__shiki_140thh">      duration: profileEntry.millis,</span></span>
<span class="line"><span class="__shiki_140thh">      namespace: profileEntry.ns,</span></span>
<span class="line"><span class="__shiki_140thh">      operation: profileEntry.op,</span></span>
<span class="line"><span class="__shiki_140thh">      command: profileEntry.command,</span></span>
<span class="line"><span class="__shiki_140thh">      planSummary: profileEntry.planSummary,</span></span>
<span class="line"><span class="__shiki_140thh">      executionStats: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">extractExecutionStats</span><span class="__shiki_140thh">(profileEntry)</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 识别问题</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> issues</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">identifyQueryIssues</span><span class="__shiki_140thh">(analysis);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (issues.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.metrics.queryPerformance.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_1itgoe">        ...</span><span class="__shiki_140thh">analysis,</span></span>
<span class="line"><span class="__shiki_140thh">        issues,</span></span>
<span class="line"><span class="__shiki_140thh">        recommendations: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">generateQueryRecommendations</span><span class="__shiki_140thh">(analysis, issues)</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  identifyQueryIssues</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">queryAnalysis</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> issues</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查全表扫描</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (queryAnalysis.planSummary </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        queryAnalysis.planSummary.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;COLLSCAN&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_140thh">      issues.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        type: </span><span class="__shiki_mdbnqw">&#39;COLLSCAN&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        severity: </span><span class="__shiki_mdbnqw">&#39;HIGH&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        description: </span><span class="__shiki_mdbnqw">&#39;查询执行了全表扫描&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查内存排序</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (queryAnalysis.executionStats </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        queryAnalysis.executionStats.hasSortStage) {</span></span>
<span class="line"><span class="__shiki_140thh">      issues.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        type: </span><span class="__shiki_mdbnqw">&#39;IN_MEMORY_SORT&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        severity: </span><span class="__shiki_mdbnqw">&#39;MEDIUM&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        description: </span><span class="__shiki_mdbnqw">&#39;查询在内存中排序&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查索引效率</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (queryAnalysis.executionStats) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">keysExamined</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">docsExamined</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">nReturned</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queryAnalysis.executionStats;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (keysExamined </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> nReturned </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> efficiency</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> nReturned </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> keysExamined;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (efficiency </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0.01</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">          issues.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">            type: </span><span class="__shiki_mdbnqw">&#39;INEFFICIENT_INDEX&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            severity: </span><span class="__shiki_mdbnqw">&#39;HIGH&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            description: </span><span class="__shiki_mdbnqw">\`索引效率低: 检查了\${</span><span class="__shiki_140thh">keysExamined</span><span class="__shiki_mdbnqw">}个键，只返回\${</span><span class="__shiki_140thh">nReturned</span><span class="__shiki_mdbnqw">}个文档\`</span></span>
<span class="line"><span class="__shiki_140thh">          });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (docsExamined </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> nReturned </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        issues.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          type: </span><span class="__shiki_mdbnqw">&#39;EXCESSIVE_DOCUMENT_SCAN&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          severity: </span><span class="__shiki_mdbnqw">&#39;MEDIUM&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          description: </span><span class="__shiki_mdbnqw">\`扫描了\${</span><span class="__shiki_140thh">docsExamined</span><span class="__shiki_mdbnqw">}个文档，只返回\${</span><span class="__shiki_140thh">nReturned</span><span class="__shiki_mdbnqw">}个\`</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> issues;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  generateIndexRecommendations</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">indexKey</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">indexAnalysis</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">collStats</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> recommendations</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 检查未使用的索引</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (indexAnalysis.utilization </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0.1</span><span class="__shiki_140thh">) { </span><span class="__shiki_21nrsd">// 每小时使用少于0.1次</span></span>
<span class="line"><span class="__shiki_140thh">      recommendations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        type: </span><span class="__shiki_mdbnqw">&#39;UNUSED_INDEX&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        severity: </span><span class="__shiki_mdbnqw">&#39;LOW&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        description: </span><span class="__shiki_mdbnqw">\`索引使用率低: \${</span><span class="__shiki_140thh">indexAnalysis</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">utilization</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}次/小时\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        action: </span><span class="__shiki_mdbnqw">&#39;考虑删除此索引&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        details: {</span></span>
<span class="line"><span class="__shiki_140thh">          lastUsed: indexAnalysis.lastUsed,</span></span>
<span class="line"><span class="__shiki_140thh">          sizeMB: (indexAnalysis.size </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">)).</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 检查重复索引</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> duplicate</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">findDuplicateIndexes</span><span class="__shiki_140thh">(indexKey, indexAnalysis);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (duplicate) {</span></span>
<span class="line"><span class="__shiki_140thh">      recommendations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        type: </span><span class="__shiki_mdbnqw">&#39;DUPLICATE_INDEX&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        severity: </span><span class="__shiki_mdbnqw">&#39;MEDIUM&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        description: </span><span class="__shiki_mdbnqw">&#39;存在重复或冗余索引&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        action: </span><span class="__shiki_mdbnqw">&#39;删除冗余索引&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        details: {</span></span>
<span class="line"><span class="__shiki_140thh">          duplicateWith: duplicate</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 检查索引大小</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> indexSizeMB</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> indexAnalysis.size </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> dataSizeMB</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> collStats.size </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (indexSizeMB </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> dataSizeMB </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.5</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">      recommendations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        type: </span><span class="__shiki_mdbnqw">&#39;LARGE_INDEX&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        severity: </span><span class="__shiki_mdbnqw">&#39;MEDIUM&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        description: </span><span class="__shiki_mdbnqw">\`索引大小(\${</span><span class="__shiki_140thh">indexSizeMB</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}MB)超过数据大小(\${</span><span class="__shiki_140thh">dataSizeMB</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}MB)的50%\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        action: </span><span class="__shiki_mdbnqw">&#39;考虑索引优化&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        details: {</span></span>
<span class="line"><span class="__shiki_140thh">          indexSize: indexSizeMB,</span></span>
<span class="line"><span class="__shiki_140thh">          dataSize: dataSizeMB,</span></span>
<span class="line"><span class="__shiki_140thh">          ratio: (indexSizeMB </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> dataSizeMB).</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (recommendations.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.metrics.recommendations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        index: indexKey,</span></span>
<span class="line"><span class="__shiki_140thh">        analysis: indexAnalysis,</span></span>
<span class="line"><span class="__shiki_140thh">        recommendations</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  findDuplicateIndexes</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">indexKey</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">indexAnalysis</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 查找重复或冗余索引</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">otherKey</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">otherAnalysis</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">of</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.metrics.indexUsage.</span><span class="__shiki_1t8gfj">entries</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (otherKey </span><span class="__shiki_1itgoe">===</span><span class="__shiki_140thh"> indexKey) </span><span class="__shiki_1itgoe">continue</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 检查索引是否冗余</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">isIndexRedundant</span><span class="__shiki_140thh">(indexAnalysis.key, otherAnalysis.key)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> otherKey;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  isIndexRedundant</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">index1</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">index2</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 判断index1是否被index2覆盖</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> fields1</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Object.</span><span class="__shiki_1t8gfj">keys</span><span class="__shiki_140thh">(index1);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> fields2</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Object.</span><span class="__shiki_1t8gfj">keys</span><span class="__shiki_140thh">(index2);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 如果index2包含index1的所有字段作为前缀</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (fields2.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;=</span><span class="__shiki_140thh"> fields1.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> fields1.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (fields1[i] </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_140thh"> fields2[i]) {</span></span>
<span class="line"><span class="__shiki_1itgoe">          return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  generatePerformanceReport</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> report</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">      summary: {</span></span>
<span class="line"><span class="__shiki_140thh">        totalIndexes: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.metrics.indexUsage.size,</span></span>
<span class="line"><span class="__shiki_140thh">        unusedIndexes: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">countUnusedIndexes</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        largeIndexes: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">countLargeIndexes</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        slowQueries: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.metrics.queryPerformance.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        recommendations: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.metrics.recommendations.</span><span class="__shiki_dzsirb">length</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      detailedAnalysis: {</span></span>
<span class="line"><span class="__shiki_140thh">        indexUsage: Array.</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.metrics.indexUsage.</span><span class="__shiki_1t8gfj">entries</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">          .</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(([</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">analysis</span><span class="__shiki_140thh">]) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> ({</span></span>
<span class="line"><span class="__shiki_140thh">            index: key,</span></span>
<span class="line"><span class="__shiki_140thh">            utilization: analysis.utilization,</span></span>
<span class="line"><span class="__shiki_140thh">            lastUsed: analysis.lastUsed,</span></span>
<span class="line"><span class="__shiki_140thh">            sizeMB: (analysis.size </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">)).</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">          }))</span></span>
<span class="line"><span class="__shiki_140thh">          .</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">a</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">b</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> a.utilization </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> b.utilization),</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        slowQueries: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.metrics.queryPerformance</span></span>
<span class="line"><span class="__shiki_140thh">          .</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">a</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">b</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> b.duration </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> a.duration)</span></span>
<span class="line"><span class="__shiki_140thh">          .</span><span class="__shiki_1t8gfj">slice</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        recommendations: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.metrics.recommendations</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      actions: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">generateActionPlan</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 输出报告</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;=== MongoDB索引性能报告 ===&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">(report, </span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 保存报告</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">saveReport</span><span class="__shiki_140thh">(report);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> report;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  countUnusedIndexes</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> analysis</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.metrics.indexUsage.</span><span class="__shiki_1t8gfj">values</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (analysis.utilization </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0.1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        count</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> count;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  countLargeIndexes</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> analysis</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.metrics.indexUsage.</span><span class="__shiki_1t8gfj">values</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (analysis.size </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">) { </span><span class="__shiki_21nrsd">// 大于100MB</span></span>
<span class="line"><span class="__shiki_140thh">        count</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> count;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  generateActionPlan</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> actions</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      immediate: [],</span></span>
<span class="line"><span class="__shiki_140thh">      shortTerm: [],</span></span>
<span class="line"><span class="__shiki_140thh">      longTerm: []</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 分析建议并分类</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.metrics.recommendations.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">rec</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      rec.recommendations.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">recommendation</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> action</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">          index: rec.index,</span></span>
<span class="line"><span class="__shiki_140thh">          type: recommendation.type,</span></span>
<span class="line"><span class="__shiki_140thh">          description: recommendation.description,</span></span>
<span class="line"><span class="__shiki_140thh">          action: recommendation.action</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 根据严重性分类</span></span>
<span class="line"><span class="__shiki_1itgoe">        switch</span><span class="__shiki_140thh"> (recommendation.severity) {</span></span>
<span class="line"><span class="__shiki_1itgoe">          case</span><span class="__shiki_mdbnqw"> &#39;HIGH&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            actions.immediate.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(action);</span></span>
<span class="line"><span class="__shiki_1itgoe">            break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">          case</span><span class="__shiki_mdbnqw"> &#39;MEDIUM&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            actions.shortTerm.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(action);</span></span>
<span class="line"><span class="__shiki_1itgoe">            break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">          case</span><span class="__shiki_mdbnqw"> &#39;LOW&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            actions.longTerm.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(action);</span></span>
<span class="line"><span class="__shiki_1itgoe">            break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> actions;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  saveReport</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">report</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 保存报告到数据库</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;monitoring&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;index_performance_reports&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">insertOne</span><span class="__shiki_140thh">(report);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 索引优化工具集</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> IndexOptimizationTools</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">client</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.client </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> client;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 1. 索引分析器</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> analyzeIndexCoverage</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">collection</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">queries</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> analysis</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      covered: [],</span></span>
<span class="line"><span class="__shiki_140thh">      notCovered: [],</span></span>
<span class="line"><span class="__shiki_140thh">      partiallyCovered: []</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> query</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> queries) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> explain</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(query.filter, query.projection)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">(query.sort </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> {})</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">limit</span><span class="__shiki_140thh">(query.limit </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">explain</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;executionStats&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> coverage</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkQueryCoverage</span><span class="__shiki_140thh">(explain);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (coverage.fullyCovered) {</span></span>
<span class="line"><span class="__shiki_140thh">        analysis.covered.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          query,</span></span>
<span class="line"><span class="__shiki_140thh">          coverage</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (coverage.partiallyCovered) {</span></span>
<span class="line"><span class="__shiki_140thh">        analysis.partiallyCovered.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          query,</span></span>
<span class="line"><span class="__shiki_140thh">          coverage</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        analysis.notCovered.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          query,</span></span>
<span class="line"><span class="__shiki_140thh">          coverage</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> analysis;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 2. 索引建议器</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> suggestIndexes</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">collection</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">workload</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> suggestions</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> existingIndexes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">getIndexes</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 分析查询模式</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> queryPatterns</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeQueryPatterns</span><span class="__shiki_140thh">(workload.queries);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 对每种模式生成索引建议</span></span>
<span class="line"><span class="__shiki_140thh">    queryPatterns.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">pattern</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> candidate</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">generateIndexCandidate</span><span class="__shiki_140thh">(pattern);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 检查是否已有类似索引</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> existing</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">findMatchingIndex</span><span class="__shiki_140thh">(candidate, existingIndexes);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">existing) {</span></span>
<span class="line"><span class="__shiki_140thh">        suggestions.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          candidate,</span></span>
<span class="line"><span class="__shiki_140thh">          reason: </span><span class="__shiki_mdbnqw">\`支持\${</span><span class="__shiki_140thh">pattern</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">queries</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_mdbnqw">}个查询\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          estimatedImpact: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">estimateImpact</span><span class="__shiki_140thh">(candidate, pattern)</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">canImproveIndex</span><span class="__shiki_140thh">(existing, candidate)) {</span></span>
<span class="line"><span class="__shiki_140thh">        suggestions.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          candidate,</span></span>
<span class="line"><span class="__shiki_140thh">          reason: </span><span class="__shiki_mdbnqw">\`改进现有索引\${</span><span class="__shiki_140thh">existing</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          existing,</span></span>
<span class="line"><span class="__shiki_140thh">          improvement: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateImprovement</span><span class="__shiki_140thh">(existing, candidate)</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> suggestions.</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">a</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">b</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">      b.estimatedImpact.score </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> a.estimatedImpact.score</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 3. 索引重构工具</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> rebuildIndexes</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">collection</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">options</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> defaultOptions</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      background: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      compression: </span><span class="__shiki_mdbnqw">&#39;zlib&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      validate: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> opts</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> { </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">defaultOptions, </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">options };</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> indexes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">getIndexes</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> results</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> index</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> indexes) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (index.name </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;_id_&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">continue</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 跳过_id索引</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 删除并重建索引</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">dropIndex</span><span class="__shiki_140thh">(index.name);</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Dropped index: \${</span><span class="__shiki_140thh">index</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 重建索引</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">(index.key, {</span></span>
<span class="line"><span class="__shiki_1itgoe">          ...</span><span class="__shiki_140thh">index,</span></span>
<span class="line"><span class="__shiki_140thh">          background: opts.background,</span></span>
<span class="line"><span class="__shiki_140thh">          name: index.name</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Rebuilt index: \${</span><span class="__shiki_140thh">index</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        results.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          index: index.name,</span></span>
<span class="line"><span class="__shiki_140thh">          status: </span><span class="__shiki_mdbnqw">&#39;success&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          result</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Failed to rebuild index \${</span><span class="__shiki_140thh">index</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">}:\`</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">        results.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          index: index.name,</span></span>
<span class="line"><span class="__shiki_140thh">          status: </span><span class="__shiki_mdbnqw">&#39;failed&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          error: error.message</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> results;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 4. 索引压缩工具</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> compressIndexes</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">collection</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> adminDb</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;admin&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> dbName</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> collection.dbName;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> collName</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> collection.collectionName;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 运行compact命令</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> collection.db.</span><span class="__shiki_1t8gfj">command</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        compact: collName,</span></span>
<span class="line"><span class="__shiki_140thh">        compression: {</span></span>
<span class="line"><span class="__shiki_140thh">          wiredTiger: {</span></span>
<span class="line"><span class="__shiki_140thh">            block_compressor: </span><span class="__shiki_mdbnqw">&#39;zlib&#39;</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        success: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        result,</span></span>
<span class="line"><span class="__shiki_140thh">        message: </span><span class="__shiki_mdbnqw">&#39;索引压缩完成&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      };</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        success: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        error: error.message</span></span>
<span class="line"><span class="__shiki_140thh">      };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 5. 索引统计重置</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> resetIndexStats</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">collection</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 通过重建索引重置统计</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> indexes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">getIndexes</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> index</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> indexes) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (index.name </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;_id_&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">continue</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">hideIndex</span><span class="__shiki_140thh">(index.name);</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">unhideIndex</span><span class="__shiki_140thh">(index.name);</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Reset stats for index: \${</span><span class="__shiki_140thh">index</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Failed to reset stats for \${</span><span class="__shiki_140thh">index</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">}:\`</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 6. 索引迁移工具</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> migrateIndexes</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">sourceCollection</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">targetCollection</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">options</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> indexes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> sourceCollection.</span><span class="__shiki_1t8gfj">getIndexes</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> results</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> index</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> indexes) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 在目标集合创建相同索引</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> targetCollection.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">(index.key, {</span></span>
<span class="line"><span class="__shiki_140thh">          name: index.name,</span></span>
<span class="line"><span class="__shiki_140thh">          unique: index.unique </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          sparse: index.sparse </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          background: options.background </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        results.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          index: index.name,</span></span>
<span class="line"><span class="__shiki_140thh">          status: </span><span class="__shiki_mdbnqw">&#39;success&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          result</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">        results.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          index: index.name,</span></span>
<span class="line"><span class="__shiki_140thh">          status: </span><span class="__shiki_mdbnqw">&#39;failed&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          error: error.message</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> results;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_5-实战案例与故障排除" tabindex="-1">5. 实战案例与故障排除 <a class="header-anchor" href="#_5-实战案例与故障排除" aria-label="Permalink to &quot;5. 实战案例与故障排除&quot;">​</a></h2><h3 id="_5-1-电商系统索引优化案例" tabindex="-1">5.1 电商系统索引优化案例 <a class="header-anchor" href="#_5-1-电商系统索引优化案例" aria-label="Permalink to &quot;5.1 电商系统索引优化案例&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 电商平台索引优化实战</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ECommerceIndexOptimization</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 典型电商数据模型</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.dataModel </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      orders: {</span></span>
<span class="line"><span class="__shiki_140thh">        fields: [</span><span class="__shiki_mdbnqw">&#39;_id&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;userId&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;orderDate&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;status&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;total&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;items&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;shippingAddress&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;paymentMethod&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">        indexes: []</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      products: {</span></span>
<span class="line"><span class="__shiki_140thh">        fields: [</span><span class="__shiki_mdbnqw">&#39;_id&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;name&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;category&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;price&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;stock&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;tags&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;rating&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;createdAt&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">        indexes: []</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      users: {</span></span>
<span class="line"><span class="__shiki_140thh">        fields: [</span><span class="__shiki_mdbnqw">&#39;_id&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;name&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;createdAt&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;lastLogin&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;preferences&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;addresses&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">        indexes: []</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 典型查询模式</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.queryPatterns </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      orders: [</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 用户查看自己的订单</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">          name: </span><span class="__shiki_mdbnqw">&#39;user_orders&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          filter: { userId: </span><span class="__shiki_mdbnqw">&#39;value&#39;</span><span class="__shiki_140thh">, status: { $in: [</span><span class="__shiki_mdbnqw">&#39;pending&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;shipped&#39;</span><span class="__shiki_140thh">] } },</span></span>
<span class="line"><span class="__shiki_140thh">          sort: { orderDate: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">          projection: { _id: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, orderDate: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, total: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, status: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">          frequency: </span><span class="__shiki_mdbnqw">&#39;HIGH&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 管理员搜索订单</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">          name: </span><span class="__shiki_mdbnqw">&#39;admin_order_search&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          filter: { </span></span>
<span class="line"><span class="__shiki_140thh">            orderDate: { $gte: </span><span class="__shiki_mdbnqw">&#39;start&#39;</span><span class="__shiki_140thh">, $lte: </span><span class="__shiki_mdbnqw">&#39;end&#39;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">            total: { $gt: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">            status: </span><span class="__shiki_mdbnqw">&#39;completed&#39;</span></span>
<span class="line"><span class="__shiki_140thh">          },</span></span>
<span class="line"><span class="__shiki_140thh">          sort: { orderDate: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">          projection: { },</span></span>
<span class="line"><span class="__shiki_140thh">          frequency: </span><span class="__shiki_mdbnqw">&#39;MEDIUM&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 订单统计</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">          name: </span><span class="__shiki_mdbnqw">&#39;order_stats&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          filter: { </span></span>
<span class="line"><span class="__shiki_140thh">            orderDate: { $gte: </span><span class="__shiki_mdbnqw">&#39;start&#39;</span><span class="__shiki_140thh">, $lte: </span><span class="__shiki_mdbnqw">&#39;end&#39;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">            status: </span><span class="__shiki_mdbnqw">&#39;completed&#39;</span></span>
<span class="line"><span class="__shiki_140thh">          },</span></span>
<span class="line"><span class="__shiki_140thh">          sort: { },</span></span>
<span class="line"><span class="__shiki_140thh">          projection: { userId: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, total: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">          frequency: </span><span class="__shiki_mdbnqw">&#39;LOW&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      ],</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      products: [</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 商品搜索</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">          name: </span><span class="__shiki_mdbnqw">&#39;product_search&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          filter: { </span></span>
<span class="line"><span class="__shiki_140thh">            category: </span><span class="__shiki_mdbnqw">&#39;value&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            price: { $gte: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, $lte: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">            rating: { $gte: </span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">          },</span></span>
<span class="line"><span class="__shiki_140thh">          sort: { price: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">          projection: { name: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, price: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, rating: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, image: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">          frequency: </span><span class="__shiki_mdbnqw">&#39;HIGH&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 热门商品</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">          name: </span><span class="__shiki_mdbnqw">&#39;popular_products&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          filter: { rating: { $gte: </span><span class="__shiki_dzsirb">4.5</span><span class="__shiki_140thh"> }, stock: { $gt: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">          sort: { rating: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">          projection: { },</span></span>
<span class="line"><span class="__shiki_140thh">          frequency: </span><span class="__shiki_mdbnqw">&#39;HIGH&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 库存管理</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">          name: </span><span class="__shiki_mdbnqw">&#39;low_stock&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          filter: { stock: { $lt: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">          sort: { stock: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">          projection: { name: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, stock: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">          frequency: </span><span class="__shiki_mdbnqw">&#39;MEDIUM&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      ]</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 1. 分析现有索引</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> analyzeCurrentIndexes</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> analysis</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      orders: </span><span class="__shiki_1itgoe">await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeCollectionIndexes</span><span class="__shiki_140thh">(db.orders),</span></span>
<span class="line"><span class="__shiki_140thh">      products: </span><span class="__shiki_1itgoe">await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeCollectionIndexes</span><span class="__shiki_140thh">(db.products),</span></span>
<span class="line"><span class="__shiki_140thh">      users: </span><span class="__shiki_1itgoe">await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeCollectionIndexes</span><span class="__shiki_140thh">(db.users)</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> analysis;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 2. 识别性能问题</span></span>
<span class="line"><span class="__shiki_1t8gfj">  identifyPerformanceIssues</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">indexAnalysis</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">queryPatterns</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> issues</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查订单集合</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> orderIssues</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeCollectionIssues</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;orders&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">      indexAnalysis.orders, </span></span>
<span class="line"><span class="__shiki_140thh">      queryPatterns.orders</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    issues.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">orderIssues);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查产品集合</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> productIssues</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeCollectionIssues</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;products&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      indexAnalysis.products,</span></span>
<span class="line"><span class="__shiki_140thh">      queryPatterns.products</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    issues.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">productIssues);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> issues;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  analyzeCollectionIssues</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">collectionName</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">indexes</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">patterns</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> issues</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    patterns.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">pattern</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> matchingIndex</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">findMatchingIndexForPattern</span><span class="__shiki_140thh">(pattern, indexes);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">matchingIndex) {</span></span>
<span class="line"><span class="__shiki_140thh">        issues.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          collection: collectionName,</span></span>
<span class="line"><span class="__shiki_140thh">          query: pattern.name,</span></span>
<span class="line"><span class="__shiki_140thh">          issue: </span><span class="__shiki_mdbnqw">&#39;NO_INDEX&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          severity: </span><span class="__shiki_mdbnqw">&#39;HIGH&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          description: </span><span class="__shiki_mdbnqw">\`查询&quot;\${</span><span class="__shiki_140thh">pattern</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">}&quot;没有合适的索引\`</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查索引效率</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> efficiency</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">assessIndexEfficiency</span><span class="__shiki_140thh">(matchingIndex, pattern);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (efficiency.score </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0.7</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">          issues.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">            collection: collectionName,</span></span>
<span class="line"><span class="__shiki_140thh">            query: pattern.name,</span></span>
<span class="line"><span class="__shiki_140thh">            issue: </span><span class="__shiki_mdbnqw">&#39;INEFFICIENT_INDEX&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            severity: </span><span class="__shiki_mdbnqw">&#39;MEDIUM&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            description: </span><span class="__shiki_mdbnqw">\`索引效率低: \${</span><span class="__shiki_140thh">efficiency</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">reason</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            details: efficiency.details</span></span>
<span class="line"><span class="__shiki_140thh">          });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> issues;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 3. 设计优化方案</span></span>
<span class="line"><span class="__shiki_1t8gfj">  designOptimizationPlan</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">issues</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">currentIndexes</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> plan</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      newIndexes: [],</span></span>
<span class="line"><span class="__shiki_140thh">      modifiedIndexes: [],</span></span>
<span class="line"><span class="__shiki_140thh">      droppedIndexes: [],</span></span>
<span class="line"><span class="__shiki_140thh">      queryRewrites: []</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 按集合分组问题</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> issuesByCollection</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">groupIssuesByCollection</span><span class="__shiki_140thh">(issues);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Object.</span><span class="__shiki_1t8gfj">entries</span><span class="__shiki_140thh">(issuesByCollection).</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(([</span><span class="__shiki_1jdh33">collection</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">collIssues</span><span class="__shiki_140thh">]) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> collectionPlan</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">designCollectionOptimization</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        collection,</span></span>
<span class="line"><span class="__shiki_140thh">        collIssues,</span></span>
<span class="line"><span class="__shiki_140thh">        currentIndexes[collection]</span></span>
<span class="line"><span class="__shiki_140thh">      );</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      plan.newIndexes.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">collectionPlan.newIndexes);</span></span>
<span class="line"><span class="__shiki_140thh">      plan.modifiedIndexes.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">collectionPlan.modifiedIndexes);</span></span>
<span class="line"><span class="__shiki_140thh">      plan.droppedIndexes.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">collectionPlan.droppedIndexes);</span></span>
<span class="line"><span class="__shiki_140thh">      plan.queryRewrites.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">collectionPlan.queryRewrites);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> plan;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  designCollectionOptimization</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">collection</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">issues</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">existingIndexes</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> plan</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      newIndexes: [],</span></span>
<span class="line"><span class="__shiki_140thh">      modifiedIndexes: [],</span></span>
<span class="line"><span class="__shiki_140thh">      droppedIndexes: [],</span></span>
<span class="line"><span class="__shiki_140thh">      queryRewrites: []</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 处理缺少索引的问题</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> noIndexIssues</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> issues.</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">i</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> i.issue </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;NO_INDEX&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    noIndexIssues.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">issue</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> index</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">designIndexForQuery</span><span class="__shiki_140thh">(issue.query, collection);</span></span>
<span class="line"><span class="__shiki_140thh">      plan.newIndexes.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        collection,</span></span>
<span class="line"><span class="__shiki_140thh">        index,</span></span>
<span class="line"><span class="__shiki_140thh">        reason: </span><span class="__shiki_mdbnqw">\`支持查询: \${</span><span class="__shiki_140thh">issue</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">query</span><span class="__shiki_mdbnqw">}\`</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 处理低效索引问题</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> inefficientIssues</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> issues.</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">i</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> i.issue </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;INEFFICIENT_INDEX&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    inefficientIssues.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">issue</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> improvement</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">improveIndexForQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        issue.query,</span></span>
<span class="line"><span class="__shiki_140thh">        existingIndexes,</span></span>
<span class="line"><span class="__shiki_140thh">        collection</span></span>
<span class="line"><span class="__shiki_140thh">      );</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (improvement.type </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;modify&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        plan.modifiedIndexes.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          collection,</span></span>
<span class="line"><span class="__shiki_140thh">          from: improvement.from,</span></span>
<span class="line"><span class="__shiki_140thh">          to: improvement.to,</span></span>
<span class="line"><span class="__shiki_140thh">          reason: issue.description</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (improvement.type </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;new&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        plan.newIndexes.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          collection,</span></span>
<span class="line"><span class="__shiki_140thh">          index: improvement.index,</span></span>
<span class="line"><span class="__shiki_140thh">          reason: </span><span class="__shiki_mdbnqw">\`替换低效索引: \${</span><span class="__shiki_140thh">issue</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">query</span><span class="__shiki_mdbnqw">}\`</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 标记旧索引为可删除</span></span>
<span class="line"><span class="__shiki_140thh">        plan.droppedIndexes.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          collection,</span></span>
<span class="line"><span class="__shiki_140thh">          index: improvement.oldIndex,</span></span>
<span class="line"><span class="__shiki_140thh">          reason: </span><span class="__shiki_mdbnqw">&#39;被更高效的索引替换&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 识别未使用的索引</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> unusedIndexes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">identifyUnusedIndexes</span><span class="__shiki_140thh">(existingIndexes, issues);</span></span>
<span class="line"><span class="__shiki_140thh">    unusedIndexes.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">index</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      plan.droppedIndexes.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        collection,</span></span>
<span class="line"><span class="__shiki_140thh">        index: index.name,</span></span>
<span class="line"><span class="__shiki_140thh">        reason: </span><span class="__shiki_mdbnqw">&#39;未被任何查询使用&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> plan;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 4. 实施优化</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> implementOptimizationPlan</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">plan</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> results</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      successes: [],</span></span>
<span class="line"><span class="__shiki_140thh">      failures: [],</span></span>
<span class="line"><span class="__shiki_140thh">      warnings: []</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 阶段1: 创建新索引</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> newIndex</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> plan.newIndexes) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> collection</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(newIndex.collection);</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">(newIndex.index.fields, newIndex.index.options);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        results.successes.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          action: </span><span class="__shiki_mdbnqw">&#39;CREATE_INDEX&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          collection: newIndex.collection,</span></span>
<span class="line"><span class="__shiki_140thh">          index: newIndex.index.fields,</span></span>
<span class="line"><span class="__shiki_140thh">          result: </span><span class="__shiki_mdbnqw">&#39;success&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">        results.failures.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          action: </span><span class="__shiki_mdbnqw">&#39;CREATE_INDEX&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          collection: newIndex.collection,</span></span>
<span class="line"><span class="__shiki_140thh">          index: newIndex.index.fields,</span></span>
<span class="line"><span class="__shiki_140thh">          error: error.message</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 阶段2: 修改索引（通过删除和重建）</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> modifyIndex</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> plan.modifiedIndexes) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> collection</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(modifyIndex.collection);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 删除旧索引</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">dropIndex</span><span class="__shiki_140thh">(modifyIndex.from.name);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 创建新索引</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">          modifyIndex.to.fields,</span></span>
<span class="line"><span class="__shiki_140thh">          modifyIndex.to.options</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        results.successes.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          action: </span><span class="__shiki_mdbnqw">&#39;MODIFY_INDEX&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          collection: modifyIndex.collection,</span></span>
<span class="line"><span class="__shiki_140thh">          from: modifyIndex.from.name,</span></span>
<span class="line"><span class="__shiki_140thh">          to: modifyIndex.to.fields,</span></span>
<span class="line"><span class="__shiki_140thh">          result: </span><span class="__shiki_mdbnqw">&#39;success&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">        results.failures.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          action: </span><span class="__shiki_mdbnqw">&#39;MODIFY_INDEX&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          collection: modifyIndex.collection,</span></span>
<span class="line"><span class="__shiki_140thh">          error: error.message</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 阶段3: 删除索引（在监控期后）</span></span>
<span class="line"><span class="__shiki_140thh">    results.warnings.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      action: </span><span class="__shiki_mdbnqw">&#39;DROP_INDEX&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      note: </span><span class="__shiki_mdbnqw">&#39;索引删除建议，请在监控确认后手动执行&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      indexes: plan.droppedIndexes</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> results;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 5. 监控优化效果</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> monitorOptimizationImpact</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">plan</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">durationDays</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 7</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> monitoringResults</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      before: {},</span></span>
<span class="line"><span class="__shiki_140thh">      after: {},</span></span>
<span class="line"><span class="__shiki_140thh">      improvements: {},</span></span>
<span class="line"><span class="__shiki_140thh">      regressions: {}</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 收集优化前的基准数据</span></span>
<span class="line"><span class="__shiki_140thh">    monitoringResults.before </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">collectPerformanceBaseline</span><span class="__shiki_140thh">(db);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 实施优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">implementOptimizationPlan</span><span class="__shiki_140thh">(db, plan);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 等待并收集优化后数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">wait</span><span class="__shiki_140thh">(durationDays </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 24</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    monitoringResults.after </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">collectPerformanceBaseline</span><span class="__shiki_140thh">(db);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 分析变化</span></span>
<span class="line"><span class="__shiki_140thh">    monitoringResults.improvements </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeImprovements</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      monitoringResults.before,</span></span>
<span class="line"><span class="__shiki_140thh">      monitoringResults.after</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    monitoringResults.regressions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeRegressions</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      monitoringResults.before,</span></span>
<span class="line"><span class="__shiki_140thh">      monitoringResults.after</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> monitoringResults;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> collectPerformanceBaseline</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> baseline</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      queryPerformance: {},</span></span>
<span class="line"><span class="__shiki_140thh">      indexUsage: {},</span></span>
<span class="line"><span class="__shiki_140thh">      systemMetrics: {}</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 监控关键查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> keyQueries</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">identifyKeyQueries</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> query</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> keyQueries) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> explain</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(query.collection)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(query.filter)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">(query.sort </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> {})</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">limit</span><span class="__shiki_140thh">(query.limit </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">explain</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;executionStats&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      baseline.queryPerformance[query.name] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        executionTime: explain.executionStats.executionTimeMillis,</span></span>
<span class="line"><span class="__shiki_140thh">        documentsExamined: explain.executionStats.totalDocsExamined,</span></span>
<span class="line"><span class="__shiki_140thh">        keysExamined: explain.executionStats.totalKeysExamined,</span></span>
<span class="line"><span class="__shiki_140thh">        indexUsed: explain.executionStats.executionStages.inputStage?.indexName</span></span>
<span class="line"><span class="__shiki_140thh">      };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> baseline;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-常见性能问题与解决方案" tabindex="-1">5.2 常见性能问题与解决方案 <a class="header-anchor" href="#_5-2-常见性能问题与解决方案" aria-label="Permalink to &quot;5.2 常见性能问题与解决方案&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// MongoDB索引常见问题诊断与解决</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> commonIndexProblems</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 1. 全表扫描问题</span></span>
<span class="line"><span class="__shiki_140thh">  collectionScan: {</span></span>
<span class="line"><span class="__shiki_140thh">    symptoms: {</span></span>
<span class="line"><span class="__shiki_140thh">      explain: </span><span class="__shiki_mdbnqw">&quot;显示COLLSCAN阶段&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      performance: </span><span class="__shiki_mdbnqw">&quot;查询缓慢，特别是大数据集&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      metrics: </span><span class="__shiki_mdbnqw">&quot;totalDocsExamined接近集合文档总数&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    causes: {</span></span>
<span class="line"><span class="__shiki_140thh">      noIndex: </span><span class="__shiki_mdbnqw">&quot;查询字段没有索引&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      wrongIndex: </span><span class="__shiki_mdbnqw">&quot;索引不匹配查询模式&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      typeMismatch: </span><span class="__shiki_mdbnqw">&quot;查询值与索引类型不匹配&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      functionCall: </span><span class="__shiki_mdbnqw">&quot;在查询中使用函数（如$where）&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    solutions: {</span></span>
<span class="line"><span class="__shiki_140thh">      createIndex: </span><span class="__shiki_mdbnqw">&quot;为查询字段创建合适索引&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      adjustQuery: </span><span class="__shiki_mdbnqw">&quot;修改查询以使用现有索引&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      hintIndex: </span><span class="__shiki_mdbnqw">&quot;使用hint()强制使用索引&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      analyzePattern: </span><span class="__shiki_mdbnqw">&quot;使用explain()分析查询计划&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    example: {</span></span>
<span class="line"><span class="__shiki_140thh">      problem: db.users.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">({ name:</span><span class="__shiki_mdbnqw"> /</span><span class="__shiki_21q97f">john</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_1itgoe">i</span><span class="__shiki_140thh"> }), </span><span class="__shiki_21nrsd">// 不区分大小写正则</span></span>
<span class="line"><span class="__shiki_140thh">      solution: db.users.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">({ name: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }, { </span></span>
<span class="line"><span class="__shiki_140thh">        collation: { locale: </span><span class="__shiki_mdbnqw">&#39;en&#39;</span><span class="__shiki_140thh">, strength: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh"> } </span></span>
<span class="line"><span class="__shiki_140thh">      })</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 2. 内存排序问题</span></span>
<span class="line"><span class="__shiki_140thh">  inMemorySort: {</span></span>
<span class="line"><span class="__shiki_140thh">    symptoms: {</span></span>
<span class="line"><span class="__shiki_140thh">      explain: </span><span class="__shiki_mdbnqw">&quot;显示SORT阶段，memLimit字段&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      error: </span><span class="__shiki_mdbnqw">&quot;Exceeded memory limit for sort&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      performance: </span><span class="__shiki_mdbnqw">&quot;排序操作缓慢&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    causes: {</span></span>
<span class="line"><span class="__shiki_140thh">      noIndexSort: </span><span class="__shiki_mdbnqw">&quot;排序字段没有索引&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      wrongOrder: </span><span class="__shiki_mdbnqw">&quot;排序方向与索引方向不匹配&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      skipIndex: </span><span class="__shiki_mdbnqw">&quot;排序字段不在索引前缀中&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    solutions: {</span></span>
<span class="line"><span class="__shiki_140thh">      indexSort: </span><span class="__shiki_mdbnqw">&quot;创建支持排序的索引&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      limitResults: </span><span class="__shiki_mdbnqw">&quot;添加limit减少排序数据量&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      allowDiskUse: </span><span class="__shiki_mdbnqw">&quot;使用allowDiskUse选项&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      compoundIndex: </span><span class="__shiki_mdbnqw">&quot;创建复合索引支持过滤+排序&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    example: {</span></span>
<span class="line"><span class="__shiki_140thh">      problem: db.orders.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">({ status: </span><span class="__shiki_mdbnqw">&quot;active&quot;</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">({ orderDate: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }) </span><span class="__shiki_21nrsd">// 可能需要内存排序</span></span>
<span class="line"><span class="__shiki_140thh">      solution: db.orders.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">({ </span></span>
<span class="line"><span class="__shiki_140thh">        status: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, orderDate: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">      })</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 3. 索引选择性问题低</span></span>
<span class="line"><span class="__shiki_140thh">  lowSelectivity: {</span></span>
<span class="line"><span class="__shiki_140thh">    symptoms: {</span></span>
<span class="line"><span class="__shiki_140thh">      explain: </span><span class="__shiki_mdbnqw">&quot;IXSCAN检查大量键，返回少量文档&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      metrics: </span><span class="__shiki_mdbnqw">&quot;totalKeysExamined &gt;&gt; nReturned&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      performance: </span><span class="__shiki_mdbnqw">&quot;索引扫描缓慢&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    causes: {</span></span>
<span class="line"><span class="__shiki_140thh">      lowCardinality: </span><span class="__shiki_mdbnqw">&quot;索引字段基数低（如性别字段）&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      wrongOrder: </span><span class="__shiki_mdbnqw">&quot;低选择性字段在复合索引前面&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      rangeQuery: </span><span class="__shiki_mdbnqw">&quot;范围查询匹配大量文档&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    solutions: {</span></span>
<span class="line"><span class="__shiki_140thh">      combineFields: </span><span class="__shiki_mdbnqw">&quot;与高选择性字段创建复合索引&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      partialIndex: </span><span class="__shiki_mdbnqw">&quot;使用部分索引过滤低选择性值&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      adjustOrder: </span><span class="__shiki_mdbnqw">&quot;调整复合索引字段顺序&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    example: {</span></span>
<span class="line"><span class="__shiki_140thh">      problem: db.users.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">({ active: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> }), </span><span class="__shiki_21nrsd">// 大多数用户都active</span></span>
<span class="line"><span class="__shiki_140thh">      solution: db.users.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">({ </span></span>
<span class="line"><span class="__shiki_140thh">        active: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, lastLogin: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">      }, {</span></span>
<span class="line"><span class="__shiki_140thh">        partialFilterExpression: { active: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">      })</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 4. 索引碎片化问题</span></span>
<span class="line"><span class="__shiki_140thh">  indexFragmentation: {</span></span>
<span class="line"><span class="__shiki_140thh">    symptoms: {</span></span>
<span class="line"><span class="__shiki_140thh">      performance: </span><span class="__shiki_mdbnqw">&quot;索引性能逐渐下降&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      storage: </span><span class="__shiki_mdbnqw">&quot;索引大小异常增长&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      operations: </span><span class="__shiki_mdbnqw">&quot;写操作变慢&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    causes: {</span></span>
<span class="line"><span class="__shiki_140thh">      frequentUpdates: </span><span class="__shiki_mdbnqw">&quot;文档频繁更新导致索引更新&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      deletions: </span><span class="__shiki_mdbnqw">&quot;大量删除导致索引空洞&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      randomInserts: </span><span class="__shiki_mdbnqw">&quot;随机键值插入导致页面分裂&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    solutions: {</span></span>
<span class="line"><span class="__shiki_140thh">      rebuildIndex: </span><span class="__shiki_mdbnqw">&quot;定期重建索引&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      compact: </span><span class="__shiki_mdbnqw">&quot;运行compact命令&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      useSSD: </span><span class="__shiki_mdbnqw">&quot;使用SSD减少碎片影响&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      monitor: </span><span class="__shiki_mdbnqw">&quot;监控索引大小和性能&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    detection: </span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">      // 检测索引碎片</span></span>
<span class="line"><span class="__shiki_mdbnqw">      db.collection.stats().indexSizes</span></span>
<span class="line"><span class="__shiki_mdbnqw">      db.collection.aggregate([{ $indexStats: {} }])</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    rebuild: </span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">      // 重建索引</span></span>
<span class="line"><span class="__shiki_mdbnqw">      db.collection.reIndex()</span></span>
<span class="line"><span class="__shiki_mdbnqw">      // 或</span></span>
<span class="line"><span class="__shiki_mdbnqw">      db.collection.dropIndex(&quot;index_name&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">      db.collection.createIndex({ field: 1 }, { name: &quot;index_name&quot; })</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 5. 索引覆盖问题</span></span>
<span class="line"><span class="__shiki_140thh">  indexCoverage: {</span></span>
<span class="line"><span class="__shiki_140thh">    symptoms: {</span></span>
<span class="line"><span class="__shiki_140thh">      explain: </span><span class="__shiki_mdbnqw">&quot;IXSCAN后跟FETCH阶段&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      performance: </span><span class="__shiki_mdbnqw">&quot;查询需要访问文档&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      projection: </span><span class="__shiki_mdbnqw">&quot;查询需要不在索引中的字段&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    solutions: {</span></span>
<span class="line"><span class="__shiki_140thh">      coveredIndex: </span><span class="__shiki_mdbnqw">&quot;创建覆盖查询的索引&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      includeFields: </span><span class="__shiki_mdbnqw">&quot;在索引中包含需要的字段&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      adjustProjection: </span><span class="__shiki_mdbnqw">&quot;调整查询投影&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    example: {</span></span>
<span class="line"><span class="__shiki_140thh">      problem: {</span></span>
<span class="line"><span class="__shiki_140thh">        index: { userId: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, orderDate: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        query: db.orders.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">({ userId: </span><span class="__shiki_mdbnqw">&quot;123&quot;</span><span class="__shiki_140thh"> }, </span></span>
<span class="line"><span class="__shiki_140thh">                { orderDate: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, total: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }) </span><span class="__shiki_21nrsd">// total不在索引中</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      solution: db.orders.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">({ </span></span>
<span class="line"><span class="__shiki_140thh">        userId: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, orderDate: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, total: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">      })</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 6. 复合索引顺序问题</span></span>
<span class="line"><span class="__shiki_140thh">  compoundOrder: {</span></span>
<span class="line"><span class="__shiki_140thh">    symptoms: {</span></span>
<span class="line"><span class="__shiki_140thh">      explain: </span><span class="__shiki_mdbnqw">&quot;索引扫描效率低&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      sorting: </span><span class="__shiki_mdbnqw">&quot;排序无法使用索引&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      filtering: </span><span class="__shiki_mdbnqw">&quot;范围查询后无法使用索引排序&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    rules: {</span></span>
<span class="line"><span class="__shiki_140thh">      ESR: </span><span class="__shiki_mdbnqw">&quot;等值字段 → 排序字段 → 范围字段&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      prefix: </span><span class="__shiki_mdbnqw">&quot;复合索引只支持前缀查询&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      sorting: </span><span class="__shiki_mdbnqw">&quot;排序字段需要在等值字段之后&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    example: {</span></span>
<span class="line"><span class="__shiki_140thh">      good: {</span></span>
<span class="line"><span class="__shiki_140thh">        query: { status: </span><span class="__shiki_mdbnqw">&quot;active&quot;</span><span class="__shiki_140thh">, category: </span><span class="__shiki_mdbnqw">&quot;electronics&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        sort: { price: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        index: { status: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, category: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, price: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      bad: {</span></span>
<span class="line"><span class="__shiki_140thh">        query: { status: </span><span class="__shiki_mdbnqw">&quot;active&quot;</span><span class="__shiki_140thh">, price: { $gt: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">        sort: { category: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        index: { status: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, price: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, category: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 7. 多键索引限制</span></span>
<span class="line"><span class="__shiki_140thh">  multikeyLimitations: {</span></span>
<span class="line"><span class="__shiki_140thh">    symptoms: {</span></span>
<span class="line"><span class="__shiki_140thh">      error: </span><span class="__shiki_mdbnqw">&quot;cannot index parallel arrays&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      performance: </span><span class="__shiki_mdbnqw">&quot;数组查询缓慢&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      indexSize: </span><span class="__shiki_mdbnqw">&quot;索引异常大&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    limitations: {</span></span>
<span class="line"><span class="__shiki_140thh">      oneArray: </span><span class="__shiki_mdbnqw">&quot;一个复合索引只能有一个数组字段&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      noNesting: </span><span class="__shiki_mdbnqw">&quot;不能直接索引嵌套数组&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      bounds: </span><span class="__shiki_mdbnqw">&quot;查询时对数组字段只能有一个谓词使用索引&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    solutions: {</span></span>
<span class="line"><span class="__shiki_140thh">      flatten: </span><span class="__shiki_mdbnqw">&quot;展平数据结构&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      separate: </span><span class="__shiki_mdbnqw">&quot;将数组字段放在单独集合&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      design: </span><span class="__shiki_mdbnqw">&quot;重新设计数据模型&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 8. 查询计划不稳定</span></span>
<span class="line"><span class="__shiki_140thh">  planInstability: {</span></span>
<span class="line"><span class="__shiki_140thh">    symptoms: {</span></span>
<span class="line"><span class="__shiki_140thh">      performance: </span><span class="__shiki_mdbnqw">&quot;相同查询性能波动大&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      explain: </span><span class="__shiki_mdbnqw">&quot;查询计划变化&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      indexes: </span><span class="__shiki_mdbnqw">&quot;优化器在不同索引间切换&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    causes: {</span></span>
<span class="line"><span class="__shiki_140thh">      statsOutdated: </span><span class="__shiki_mdbnqw">&quot;索引统计信息过时&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      dataChanges: </span><span class="__shiki_mdbnqw">&quot;数据分布发生变化&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      similarIndexes: </span><span class="__shiki_mdbnqw">&quot;存在多个相似索引&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    solutions: {</span></span>
<span class="line"><span class="__shiki_140thh">      hint: </span><span class="__shiki_mdbnqw">&quot;使用hint()固定索引&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      analyze: </span><span class="__shiki_mdbnqw">&quot;定期分析索引统计&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      consolidate: </span><span class="__shiki_mdbnqw">&quot;合并相似索引&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 性能问题诊断工具</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> PerformanceDiagnostics</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">client</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.client </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> client;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 1. 诊断全表扫描</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> diagnoseCollectionScan</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">collection</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">query</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> explain</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(query).</span><span class="__shiki_1t8gfj">explain</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;executionStats&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> hasCollScan</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">hasStage</span><span class="__shiki_140thh">(explain, </span><span class="__shiki_mdbnqw">&#39;COLLSCAN&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">hasCollScan) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> { issue: </span><span class="__shiki_mdbnqw">&#39;NO_COLLSCAN&#39;</span><span class="__shiki_140thh">, message: </span><span class="__shiki_mdbnqw">&#39;查询没有全表扫描&#39;</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> analysis</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      issue: </span><span class="__shiki_mdbnqw">&#39;COLLSCAN_DETECTED&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      severity: </span><span class="__shiki_mdbnqw">&#39;HIGH&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      stats: {</span></span>
<span class="line"><span class="__shiki_140thh">        documentsExamined: explain.executionStats.totalDocsExamined,</span></span>
<span class="line"><span class="__shiki_140thh">        executionTime: explain.executionStats.executionTimeMillis,</span></span>
<span class="line"><span class="__shiki_140thh">        stage: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">findStage</span><span class="__shiki_140thh">(explain, </span><span class="__shiki_mdbnqw">&#39;COLLSCAN&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      causes: [],</span></span>
<span class="line"><span class="__shiki_140thh">      recommendations: []</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 分析可能的原因</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">hasMatchingIndex</span><span class="__shiki_140thh">(collection, query)) {</span></span>
<span class="line"><span class="__shiki_140thh">      analysis.causes.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;NO_MATCHING_INDEX&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      analysis.recommendations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        action: </span><span class="__shiki_mdbnqw">&#39;CREATE_INDEX&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        details: </span><span class="__shiki_mdbnqw">&#39;为查询字段创建索引&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">hasTypeMismatch</span><span class="__shiki_140thh">(query)) {</span></span>
<span class="line"><span class="__shiki_140thh">      analysis.causes.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;TYPE_MISMATCH&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      analysis.recommendations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        action: </span><span class="__shiki_mdbnqw">&#39;FIX_QUERY&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        details: </span><span class="__shiki_mdbnqw">&#39;确保查询值与索引类型匹配&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> analysis;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 2. 诊断内存排序</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> diagnoseInMemorySort</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">collection</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">query</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">sort</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">limit</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> cursor</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(query).</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">(sort);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (limit) cursor.</span><span class="__shiki_1t8gfj">limit</span><span class="__shiki_140thh">(limit);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> explain</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> cursor.</span><span class="__shiki_1t8gfj">explain</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;executionStats&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> hasSort</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">hasStage</span><span class="__shiki_140thh">(explain, </span><span class="__shiki_mdbnqw">&#39;SORT&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">hasSort) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> { issue: </span><span class="__shiki_mdbnqw">&#39;NO_IN_MEMORY_SORT&#39;</span><span class="__shiki_140thh">, message: </span><span class="__shiki_mdbnqw">&#39;排序使用索引&#39;</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> sortStage</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">findStage</span><span class="__shiki_140thh">(explain, </span><span class="__shiki_mdbnqw">&#39;SORT&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> analysis</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      issue: </span><span class="__shiki_mdbnqw">&#39;IN_MEMORY_SORT&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      severity: sortStage.memLimit </span><span class="__shiki_1itgoe">?</span><span class="__shiki_mdbnqw"> &#39;HIGH&#39;</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_mdbnqw"> &#39;MEDIUM&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      stats: {</span></span>
<span class="line"><span class="__shiki_140thh">        sortPattern: sortStage.sortPattern,</span></span>
<span class="line"><span class="__shiki_140thh">        memLimit: sortStage.memLimit,</span></span>
<span class="line"><span class="__shiki_140thh">        amountSorted: sortStage.amountSorted,</span></span>
<span class="line"><span class="__shiki_140thh">        usedDisk: sortStage.usedDisk </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      recommendations: []</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查是否可以索引排序</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> sortFields</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Object.</span><span class="__shiki_1t8gfj">keys</span><span class="__shiki_140thh">(sort);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> existingIndexes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">getIndexes</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> canIndexSort</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">canIndexSupportSort</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      sortFields, </span></span>
<span class="line"><span class="__shiki_140thh">      sort, </span></span>
<span class="line"><span class="__shiki_140thh">      existingIndexes,</span></span>
<span class="line"><span class="__shiki_140thh">      query</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (canIndexSort) {</span></span>
<span class="line"><span class="__shiki_140thh">      analysis.recommendations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        action: </span><span class="__shiki_mdbnqw">&#39;CREATE_INDEX&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        details: </span><span class="__shiki_mdbnqw">\`创建索引支持排序: \${</span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_140thh">canIndexSort</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}\`</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (limit) {</span></span>
<span class="line"><span class="__shiki_140thh">      analysis.recommendations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        action: </span><span class="__shiki_mdbnqw">&#39;ADD_LIMIT&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        details: </span><span class="__shiki_mdbnqw">&#39;已经有限制，考虑优化查询条件&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> analysis;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 3. 诊断索引效率</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> diagnoseIndexEfficiency</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">collection</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">query</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> explain</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(query).</span><span class="__shiki_1t8gfj">explain</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;executionStats&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> hasIxScan</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">hasStage</span><span class="__shiki_140thh">(explain, </span><span class="__shiki_mdbnqw">&#39;IXSCAN&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">hasIxScan) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> { issue: </span><span class="__shiki_mdbnqw">&#39;NO_INDEX_USED&#39;</span><span class="__shiki_140thh">, message: </span><span class="__shiki_mdbnqw">&#39;查询未使用索引&#39;</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> stats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> explain.executionStats;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> efficiency</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> stats.nReturned </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> stats.totalKeysExamined;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> analysis</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      issue: efficiency </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0.01</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_mdbnqw"> &#39;LOW_INDEX_EFFICIENCY&#39;</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_mdbnqw"> &#39;ACCEPTABLE_EFFICIENCY&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      severity: efficiency </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0.01</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_mdbnqw"> &#39;HIGH&#39;</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_mdbnqw"> &#39;LOW&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      stats: {</span></span>
<span class="line"><span class="__shiki_140thh">        keysExamined: stats.totalKeysExamined,</span></span>
<span class="line"><span class="__shiki_140thh">        documentsReturned: stats.nReturned,</span></span>
<span class="line"><span class="__shiki_140thh">        efficiency: efficiency.</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        indexName: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getIndexName</span><span class="__shiki_140thh">(explain)</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (efficiency </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0.01</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">      analysis.recommendations </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">          action: </span><span class="__shiki_mdbnqw">&#39;OPTIMIZE_INDEX&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          details: </span><span class="__shiki_mdbnqw">&#39;索引选择性太低，考虑添加高选择性字段&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">          action: </span><span class="__shiki_mdbnqw">&#39;ADJUST_QUERY&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          details: </span><span class="__shiki_mdbnqw">&#39;添加更多过滤条件提高选择性&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      ];</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> analysis;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 4. 诊断索引碎片</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> diagnoseIndexFragmentation</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">collection</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> stats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">stats</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> indexes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">getIndexes</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> analysis</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      issue: </span><span class="__shiki_mdbnqw">&#39;INDEX_FRAGMENTATION_ANALYSIS&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      indexes: []</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    indexes.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">index</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> indexStats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> stats.indexSizes[index.name];</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> indexDetails</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        name: index.name,</span></span>
<span class="line"><span class="__shiki_140thh">        sizeMB: (indexStats </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">)).</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        keyPattern: index.key,</span></span>
<span class="line"><span class="__shiki_140thh">        fragmentation: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">estimateFragmentation</span><span class="__shiki_140thh">(index, stats)</span></span>
<span class="line"><span class="__shiki_140thh">      };</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      analysis.indexes.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(indexDetails);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 识别问题索引</span></span>
<span class="line"><span class="__shiki_140thh">    analysis.problematicIndexes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> analysis.indexes.</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">idx</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">      idx.fragmentation.level </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;HIGH&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (analysis.problematicIndexes.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">      analysis.recommendations </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> analysis.problematicIndexes.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">idx</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> ({</span></span>
<span class="line"><span class="__shiki_140thh">        action: </span><span class="__shiki_mdbnqw">&#39;REBUILD_INDEX&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        index: idx.name,</span></span>
<span class="line"><span class="__shiki_140thh">        reason: </span><span class="__shiki_mdbnqw">\`高碎片化: \${</span><span class="__shiki_140thh">idx</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">fragmentation</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">estimated</span><span class="__shiki_mdbnqw">}%\`</span></span>
<span class="line"><span class="__shiki_140thh">      }));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> analysis;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 辅助方法</span></span>
<span class="line"><span class="__shiki_1t8gfj">  hasStage</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">explain</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">stageName</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_1t8gfj"> checkStage</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">stage</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (stage.stage </span><span class="__shiki_1itgoe">===</span><span class="__shiki_140thh"> stageName) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (stage.inputStage </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_1t8gfj"> checkStage</span><span class="__shiki_140thh">(stage.inputStage)) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (stage.innerStage </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_1t8gfj"> checkStage</span><span class="__shiki_140thh">(stage.innerStage)) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1t8gfj"> checkStage</span><span class="__shiki_140thh">(explain.executionStats.executionStages);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  findStage</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">explain</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">stageName</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_1t8gfj"> find</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">stage</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (stage.stage </span><span class="__shiki_1itgoe">===</span><span class="__shiki_140thh"> stageName) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh"> stage;</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (stage.inputStage) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> found</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> find</span><span class="__shiki_140thh">(stage.inputStage);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (found) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh"> found;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (stage.innerStage) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> found</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> find</span><span class="__shiki_140thh">(stage.innerStage);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (found) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh"> found;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1t8gfj"> find</span><span class="__shiki_140thh">(explain.executionStats.executionStages);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  hasMatchingIndex</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">collection</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">query</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 简化实现</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  canIndexSupportSort</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">sortFields</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">sort</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">indexes</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">query</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查现有索引是否支持排序</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> index</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> indexes) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> indexFields</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Object.</span><span class="__shiki_1t8gfj">keys</span><span class="__shiki_140thh">(index.key);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 检查索引前缀是否匹配查询条件</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 简化实现</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> canSupport</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkIndexSupport</span><span class="__shiki_140thh">(indexFields, sortFields, query);</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (canSupport) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> index.key;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  estimateFragmentation</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">index</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">stats</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 简化碎片估算</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> size</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> stats.indexSizes[index.name] </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> count</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> stats.count </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 启发式估算</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> avgEntrySize</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 假设平均条目大小</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> estimatedOptimalSize</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> count </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> avgEntrySize;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> fragmentation</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> ((size </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> estimatedOptimalSize) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> size) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      estimated: Math.</span><span class="__shiki_1t8gfj">max</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, fragmentation).</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      level: fragmentation </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 30</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_mdbnqw"> &#39;HIGH&#39;</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_140thh"> fragmentation </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_mdbnqw"> &#39;MEDIUM&#39;</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_mdbnqw"> &#39;LOW&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_6-高级主题与最佳实践" tabindex="-1">6. 高级主题与最佳实践 <a class="header-anchor" href="#_6-高级主题与最佳实践" aria-label="Permalink to &quot;6. 高级主题与最佳实践&quot;">​</a></h2><h3 id="_6-1-分片集群索引策略" tabindex="-1">6.1 分片集群索引策略 <a class="header-anchor" href="#_6-1-分片集群索引策略" aria-label="Permalink to &quot;6.1 分片集群索引策略&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 分片集群索引管理</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> shardedClusterIndexing</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 1. 分片键索引</span></span>
<span class="line"><span class="__shiki_140thh">  shardKeyIndex: {</span></span>
<span class="line"><span class="__shiki_140thh">    requirement: </span><span class="__shiki_mdbnqw">&quot;分片键必须有索引&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    creation: </span><span class="__shiki_mdbnqw">&quot;创建集合时自动创建&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    characteristics: {</span></span>
<span class="line"><span class="__shiki_140thh">      unique: </span><span class="__shiki_mdbnqw">&quot;分片键索引不能是唯一索引（除非是_id）&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      prefix: </span><span class="__shiki_mdbnqw">&quot;分片键必须是索引前缀&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      immutable: </span><span class="__shiki_mdbnqw">&quot;分片键值不能修改&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    bestPractices: {</span></span>
<span class="line"><span class="__shiki_140thh">      highCardinality: </span><span class="__shiki_mdbnqw">&quot;选择高基数字段作为分片键&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      writeDistribution: </span><span class="__shiki_mdbnqw">&quot;确保写操作均匀分布&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      queryPattern: </span><span class="__shiki_mdbnqw">&quot;匹配常用查询模式&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 2. 全局索引 vs 分片索引</span></span>
<span class="line"><span class="__shiki_140thh">  indexTypes: {</span></span>
<span class="line"><span class="__shiki_140thh">    global: {</span></span>
<span class="line"><span class="__shiki_140thh">      description: </span><span class="__shiki_mdbnqw">&quot;跨所有分片的索引&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      creation: </span><span class="__shiki_mdbnqw">&quot;在mongos上创建，自动同步到所有分片&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      useCase: </span><span class="__shiki_mdbnqw">&quot;非分片键查询&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      considerations: {</span></span>
<span class="line"><span class="__shiki_140thh">        writeCost: </span><span class="__shiki_mdbnqw">&quot;写操作需要更新所有分片的索引&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        consistency: </span><span class="__shiki_mdbnqw">&quot;跨分片索引可能有不一致窗口&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    shardLocal: {</span></span>
<span class="line"><span class="__shiki_140thh">      description: </span><span class="__shiki_mdbnqw">&quot;单个分片本地的索引&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      creation: </span><span class="__shiki_mdbnqw">&quot;直接连接到分片创建&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      useCase: </span><span class="__shiki_mdbnqw">&quot;分片特定的优化&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      risks: </span><span class="__shiki_mdbnqw">&quot;可能导致查询计划不一致&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 3. 分片集群索引管理命令</span></span>
<span class="line"><span class="__shiki_140thh">  managementCommands: {</span></span>
<span class="line"><span class="__shiki_140thh">    createIndex: {</span></span>
<span class="line"><span class="__shiki_140thh">      viaMongos: </span><span class="__shiki_mdbnqw">&quot;db.collection.createIndex() // 在mongos执行&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      result: </span><span class="__shiki_mdbnqw">&quot;在所有分片创建索引&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      options: {</span></span>
<span class="line"><span class="__shiki_140thh">        background: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 支持后台构建</span></span>
<span class="line"><span class="__shiki_140thh">        unique: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_21nrsd">     // 通常不能是唯一的（分片键除外）</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    listIndexes: {</span></span>
<span class="line"><span class="__shiki_140thh">      mongos: </span><span class="__shiki_mdbnqw">&quot;db.collection.getIndexes() // 从配置服务器获取&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      shard: </span><span class="__shiki_mdbnqw">&quot;db.collection.getIndexes()</span><span class="__shiki_mdbnqw"> // 连接到特定分片&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    dropIndex: {</span></span>
<span class="line"><span class="__shiki_140thh">      viaMongos: </span><span class="__shiki_mdbnqw">&quot;db.collection.dropIndex(&#39;index_name&#39;)&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      note: </span><span class="__shiki_mdbnqw">&quot;从所有分片删除索引&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 4. 分片集群索引构建策略</span></span>
<span class="line"><span class="__shiki_140thh">  buildStrategies: {</span></span>
<span class="line"><span class="__shiki_140thh">    rolling: {</span></span>
<span class="line"><span class="__shiki_140thh">      description: </span><span class="__shiki_mdbnqw">&quot;逐个分片构建索引&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      command: </span><span class="__shiki_mdbnqw">&quot;db.collection.createIndex(keys, { background: true })&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      benefit: </span><span class="__shiki_mdbnqw">&quot;减少对集群的影响&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      drawback: </span><span class="__shiki_mdbnqw">&quot;构建时间较长&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    parallel: {</span></span>
<span class="line"><span class="__shiki_140thh">      description: </span><span class="__shiki_mdbnqw">&quot;所有分片同时构建&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      benefit: </span><span class="__shiki_mdbnqw">&quot;构建时间最短&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      risk: </span><span class="__shiki_mdbnqw">&quot;可能影响集群性能&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 5. 分片集群索引性能优化</span></span>
<span class="line"><span class="__shiki_140thh">  performanceOptimization: {</span></span>
<span class="line"><span class="__shiki_140thh">    coveredQueries: {</span></span>
<span class="line"><span class="__shiki_140thh">      requirement: </span><span class="__shiki_mdbnqw">&quot;查询必须包含分片键&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      example: {</span></span>
<span class="line"><span class="__shiki_140thh">        shardKey: { userId: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        index: { userId: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, orderDate: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        query: { userId: </span><span class="__shiki_mdbnqw">&quot;123&quot;</span><span class="__shiki_140thh"> }, </span><span class="__shiki_21nrsd">// 包含分片键</span></span>
<span class="line"><span class="__shiki_140thh">        projection: { userId: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, orderDate: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }, </span><span class="__shiki_21nrsd">// 都在索引中</span></span>
<span class="line"><span class="__shiki_140thh">        result: </span><span class="__shiki_mdbnqw">&quot;定向查询到特定分片，覆盖查询&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    scatterGather: {</span></span>
<span class="line"><span class="__shiki_140thh">      description: </span><span class="__shiki_mdbnqw">&quot;查询不包含分片键，需要查询所有分片&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      optimization: {</span></span>
<span class="line"><span class="__shiki_140thh">        limitPushdown: </span><span class="__shiki_mdbnqw">&quot;将limit推送到每个分片&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        sortMerge: </span><span class="__shiki_mdbnqw">&quot;跨分片排序合并&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    indexFilter: {</span></span>
<span class="line"><span class="__shiki_140thh">      concept: </span><span class="__shiki_mdbnqw">&quot;使用分片键缩小查询范围&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      example: {</span></span>
<span class="line"><span class="__shiki_140thh">        collection: </span><span class="__shiki_mdbnqw">&quot;orders&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        shardKey: { orderDate: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, region: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        query: { </span></span>
<span class="line"><span class="__shiki_140thh">          orderDate: { $gte: </span><span class="__shiki_mdbnqw">&quot;2023-01-01&quot;</span><span class="__shiki_140thh">, $lte: </span><span class="__shiki_mdbnqw">&quot;2023-12-31&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">          region: </span><span class="__shiki_mdbnqw">&quot;North America&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        benefit: </span><span class="__shiki_mdbnqw">&quot;只查询包含这些分片键值的分片&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 6. 分片集群索引监控</span></span>
<span class="line"><span class="__shiki_140thh">  monitoring: {</span></span>
<span class="line"><span class="__shiki_140thh">    keyMetrics: {</span></span>
<span class="line"><span class="__shiki_140thh">      indexBuildProgress: </span><span class="__shiki_mdbnqw">&quot;索引构建进度&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      indexSizePerShard: </span><span class="__shiki_mdbnqw">&quot;每个分片的索引大小&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      indexUsagePerShard: </span><span class="__shiki_mdbnqw">&quot;每个分片的索引使用情况&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      balancingImpact: </span><span class="__shiki_mdbnqw">&quot;块迁移对索引的影响&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    commands: {</span></span>
<span class="line"><span class="__shiki_140thh">      shardStats: </span><span class="__shiki_mdbnqw">&quot;db.collection.getShardDistribution()&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      indexStats: </span><span class="__shiki_mdbnqw">&quot;db.collection.aggregate([{ $indexStats: {} }])&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      explain: </span><span class="__shiki_mdbnqw">&quot;db.collection.find(query).explain(&#39;executionStats&#39;)&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 7. 分片集群索引最佳实践</span></span>
<span class="line"><span class="__shiki_140thh">  bestPractices: {</span></span>
<span class="line"><span class="__shiki_140thh">    design: {</span></span>
<span class="line"><span class="__shiki_140thh">      shardKeySelection: </span><span class="__shiki_mdbnqw">&quot;选择高基数、写分布均匀的字段&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      indexAlignment: </span><span class="__shiki_mdbnqw">&quot;确保常用索引与分片键对齐&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      compoundShardKey: </span><span class="__shiki_mdbnqw">&quot;考虑复合分片键更好控制分布&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    management: {</span></span>
<span class="line"><span class="__shiki_140thh">      backgroundBuild: </span><span class="__shiki_mdbnqw">&quot;总是使用后台索引构建&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      monitorBuild: </span><span class="__shiki_mdbnqw">&quot;监控大型索引构建进度&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      testFirst: </span><span class="__shiki_mdbnqw">&quot;在测试环境验证索引策略&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    performance: {</span></span>
<span class="line"><span class="__shiki_140thh">      avoidScatterGather: </span><span class="__shiki_mdbnqw">&quot;设计查询包含分片键&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      useCoveredQueries: </span><span class="__shiki_mdbnqw">&quot;优化覆盖查询&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      partitionData: </span><span class="__shiki_mdbnqw">&quot;考虑按时间或范围分区&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_6-2-索引生命周期管理" tabindex="-1">6.2 索引生命周期管理 <a class="header-anchor" href="#_6-2-索引生命周期管理" aria-label="Permalink to &quot;6.2 索引生命周期管理&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 索引生命周期管理框架</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> IndexLifecycleManager</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">client</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.client </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> client;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.indexRegistry </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.performanceHistory </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 1. 索引创建策略</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> createIndexWithStrategy</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">collection</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">indexSpec</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">strategy</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;default&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> strategies</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      default: {</span></span>
<span class="line"><span class="__shiki_140thh">        background: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        name: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">generateIndexName</span><span class="__shiki_140thh">(indexSpec)</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      critical: {</span></span>
<span class="line"><span class="__shiki_140thh">        background: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 前台构建，更快</span></span>
<span class="line"><span class="__shiki_140thh">        name: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">generateIndexName</span><span class="__shiki_140thh">(indexSpec)</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      testing: {</span></span>
<span class="line"><span class="__shiki_140thh">        background: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        name: </span><span class="__shiki_mdbnqw">\`test_\${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">generateIndexName</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_140thh">indexSpec</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}_\${</span><span class="__shiki_140thh">Date</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_mdbnqw">()</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        hidden: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd"> // 隐藏索引，测试不影响生产</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      large: {</span></span>
<span class="line"><span class="__shiki_140thh">        background: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        maxTimeMS: </span><span class="__shiki_dzsirb">3600000</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 1小时超时</span></span>
<span class="line"><span class="__shiki_140thh">        commitQuorum: </span><span class="__shiki_mdbnqw">&#39;majority&#39;</span><span class="__shiki_21nrsd"> // 副本集多数确认</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> options</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> { </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">strategies[strategy], </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">indexSpec.options };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> startTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">(indexSpec.keys, options);</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> duration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 记录索引信息</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">registerIndex</span><span class="__shiki_140thh">(collection, indexSpec, result, duration, strategy);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        success: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        result,</span></span>
<span class="line"><span class="__shiki_140thh">        duration,</span></span>
<span class="line"><span class="__shiki_140thh">        indexName: result</span></span>
<span class="line"><span class="__shiki_140thh">      };</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        success: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        error: error.message,</span></span>
<span class="line"><span class="__shiki_140thh">        strategy</span></span>
<span class="line"><span class="__shiki_140thh">      };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 2. 索引维护计划</span></span>
<span class="line"><span class="__shiki_1t8gfj">  createMaintenancePlan</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      daily: [</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">          task: </span><span class="__shiki_mdbnqw">&#39;检查未使用索引&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          command: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.checkUnusedIndexes.</span><span class="__shiki_1t8gfj">bind</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">          schedule: </span><span class="__shiki_mdbnqw">&#39;02:00&#39;</span><span class="__shiki_21nrsd"> // 每天凌晨2点</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">          task: </span><span class="__shiki_mdbnqw">&#39;收集索引统计&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          command: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.collectIndexStats.</span><span class="__shiki_1t8gfj">bind</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">          schedule: </span><span class="__shiki_mdbnqw">&#39;03:00&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      ],</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      weekly: [</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">          task: </span><span class="__shiki_mdbnqw">&#39;分析索引碎片&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          command: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.analyzeFragmentation.</span><span class="__shiki_1t8gfj">bind</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">          schedule: </span><span class="__shiki_mdbnqw">&#39;sunday 04:00&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">          task: </span><span class="__shiki_mdbnqw">&#39;生成优化报告&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          command: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.generateOptimizationReport.</span><span class="__shiki_1t8gfj">bind</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">          schedule: </span><span class="__shiki_mdbnqw">&#39;sunday 05:00&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      ],</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      monthly: [</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">          task: </span><span class="__shiki_mdbnqw">&#39;重建高碎片索引&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          command: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.rebuildFragmentedIndexes.</span><span class="__shiki_1t8gfj">bind</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">          schedule: </span><span class="__shiki_mdbnqw">&#39;first day 06:00&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">          task: </span><span class="__shiki_mdbnqw">&#39;归档历史索引数据&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          command: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.archiveIndexHistory.</span><span class="__shiki_1t8gfj">bind</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">          schedule: </span><span class="__shiki_mdbnqw">&#39;last day 23:00&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      ]</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 3. 索引版本管理</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> manageIndexVersions</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">collection</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">indexSpec</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> existingIndexes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">getIndexes</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> newIndexName</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">generateIndexName</span><span class="__shiki_140thh">(indexSpec);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查是否存在类似索引</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> similarIndex</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">findSimilarIndex</span><span class="__shiki_140thh">(existingIndexes, indexSpec);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (similarIndex) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 创建新版本索引（隐藏）</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> testIndexName</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> \`\${</span><span class="__shiki_140thh">newIndexName</span><span class="__shiki_mdbnqw">}_v\${</span><span class="__shiki_140thh">Date</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_mdbnqw">()</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> testIndex</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">(indexSpec.keys, {</span></span>
<span class="line"><span class="__shiki_1itgoe">        ...</span><span class="__shiki_140thh">indexSpec.options,</span></span>
<span class="line"><span class="__shiki_140thh">        name: testIndexName,</span></span>
<span class="line"><span class="__shiki_140thh">        hidden: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 测试新索引性能</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> performance</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">testIndexPerformance</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        collection, </span></span>
<span class="line"><span class="__shiki_140thh">        testIndexName, </span></span>
<span class="line"><span class="__shiki_140thh">        indexSpec.queries</span></span>
<span class="line"><span class="__shiki_140thh">      );</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (performance.improvement </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 性能提升超过10%，切换索引</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">switchIndexVersion</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">          collection, </span></span>
<span class="line"><span class="__shiki_140thh">          similarIndex.name, </span></span>
<span class="line"><span class="__shiki_140thh">          testIndexName,</span></span>
<span class="line"><span class="__shiki_140thh">          performance</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> { action: </span><span class="__shiki_mdbnqw">&#39;REPLACED&#39;</span><span class="__shiki_140thh">, performance };</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 性能没有提升，删除测试索引</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">dropIndex</span><span class="__shiki_140thh">(testIndexName);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> { action: </span><span class="__shiki_mdbnqw">&#39;KEPT_EXISTING&#39;</span><span class="__shiki_140thh">, performance };</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 新索引，直接创建</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">(indexSpec.keys, indexSpec.options);</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> { action: </span><span class="__shiki_mdbnqw">&#39;CREATED&#39;</span><span class="__shiki_140thh">, result };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 4. 索引退役策略</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> retireIndex</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">collection</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">indexName</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">strategy</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;gradual&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> strategies</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      immediate: {</span></span>
<span class="line"><span class="__shiki_140thh">        steps: [</span></span>
<span class="line"><span class="__shiki_140thh">          () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">dropIndex</span><span class="__shiki_140thh">(indexName)</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      gradual: {</span></span>
<span class="line"><span class="__shiki_140thh">        steps: [</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 阶段1: 隐藏索引</span></span>
<span class="line"><span class="__shiki_140thh">          () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">hideIndex</span><span class="__shiki_140thh">(indexName),</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_21nrsd">          // 阶段2: 监控影响（等待1周）</span></span>
<span class="line"><span class="__shiki_1itgoe">          async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">wait</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">7</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 24</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> impact</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">measureRemovalImpact</span><span class="__shiki_140thh">(collection, indexName);</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> impact;</span></span>
<span class="line"><span class="__shiki_140thh">          },</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_21nrsd">          // 阶段3: 如果没问题，删除索引</span></span>
<span class="line"><span class="__shiki_1itgoe">          async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">impact</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (impact.performanceDegradation </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0.05</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">              await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">dropIndex</span><span class="__shiki_140thh">(indexName);</span></span>
<span class="line"><span class="__shiki_1itgoe">              return</span><span class="__shiki_140thh"> { action: </span><span class="__shiki_mdbnqw">&#39;DROPPED&#39;</span><span class="__shiki_140thh">, impact };</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">              // 恢复索引</span></span>
<span class="line"><span class="__shiki_1itgoe">              await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">unhideIndex</span><span class="__shiki_140thh">(indexName);</span></span>
<span class="line"><span class="__shiki_1itgoe">              return</span><span class="__shiki_140thh"> { action: </span><span class="__shiki_mdbnqw">&#39;RETAINED&#39;</span><span class="__shiki_140thh">, impact };</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      backup: {</span></span>
<span class="line"><span class="__shiki_140thh">        steps: [</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 备份索引定义</span></span>
<span class="line"><span class="__shiki_1itgoe">          async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> indexes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">getIndexes</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> indexDef</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> indexes.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">idx</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> idx.name </span><span class="__shiki_1itgoe">===</span><span class="__shiki_140thh"> indexName);</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">backupIndexDefinition</span><span class="__shiki_140thh">(collection, indexDef);</span></span>
<span class="line"><span class="__shiki_140thh">          },</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_21nrsd">          // 隐藏索引</span></span>
<span class="line"><span class="__shiki_140thh">          () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">hideIndex</span><span class="__shiki_140thh">(indexName),</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_21nrsd">          // 等待观察期</span></span>
<span class="line"><span class="__shiki_1itgoe">          async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">wait</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">30</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 24</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 30天</span></span>
<span class="line"><span class="__shiki_140thh">          },</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_21nrsd">          // 删除索引</span></span>
<span class="line"><span class="__shiki_140thh">          () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">dropIndex</span><span class="__shiki_140thh">(indexName)</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> selectedStrategy</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> strategies[strategy];</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> step</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> selectedStrategy.steps) {</span></span>
<span class="line"><span class="__shiki_140thh">      result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> step</span><span class="__shiki_140thh">(result);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 5. 索引容量规划</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> planIndexCapacity</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">collection</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">growthForecast</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> currentStats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">stats</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> currentIndexes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">getIndexes</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> analysis</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      current: {</span></span>
<span class="line"><span class="__shiki_140thh">        totalIndexSize: currentStats.totalIndexSize,</span></span>
<span class="line"><span class="__shiki_140thh">        avgIndexSize: currentStats.totalIndexSize </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> currentIndexes.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        indexCount: currentIndexes.</span><span class="__shiki_dzsirb">length</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      forecast: {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 基于增长预测计算未来需求</span></span>
<span class="line"><span class="__shiki_140thh">        sixMonths: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateFutureSize</span><span class="__shiki_140thh">(currentStats, growthForecast, </span><span class="__shiki_dzsirb">6</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        oneYear: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateFutureSize</span><span class="__shiki_140thh">(currentStats, growthForecast, </span><span class="__shiki_dzsirb">12</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        twoYears: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateFutureSize</span><span class="__shiki_140thh">(currentStats, growthForecast, </span><span class="__shiki_dzsirb">24</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      recommendations: {</span></span>
<span class="line"><span class="__shiki_140thh">        storage: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateStorageRequirements</span><span class="__shiki_140thh">(currentStats, growthForecast),</span></span>
<span class="line"><span class="__shiki_140thh">        maintenance: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateMaintenanceSchedule</span><span class="__shiki_140thh">(currentIndexes),</span></span>
<span class="line"><span class="__shiki_140thh">        optimization: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">identifyOptimizationOpportunities</span><span class="__shiki_140thh">(currentIndexes)</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> analysis;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  calculateFutureSize</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">currentStats</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">growthRate</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">months</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> monthlyGrowth</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> (growthRate </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> currentSize</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> currentStats.totalIndexSize;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      estimatedSize: currentSize </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">pow</span><span class="__shiki_140thh">(monthlyGrowth, months),</span></span>
<span class="line"><span class="__shiki_140thh">      growthFactor: Math.</span><span class="__shiki_1t8gfj">pow</span><span class="__shiki_140thh">(monthlyGrowth, months),</span></span>
<span class="line"><span class="__shiki_140thh">      storageNeeded: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">estimateStorageNeeded</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        currentSize, </span></span>
<span class="line"><span class="__shiki_140thh">        monthlyGrowth, </span></span>
<span class="line"><span class="__shiki_140thh">        months</span></span>
<span class="line"><span class="__shiki_140thh">      )</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 6. 索引监控告警</span></span>
<span class="line"><span class="__shiki_1t8gfj">  setupIndexAlerts</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> alerts</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      critical: [</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">          condition: </span><span class="__shiki_mdbnqw">&#39;index_build_failed&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          threshold: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          action: </span><span class="__shiki_mdbnqw">&#39;notify_team&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          channels: [</span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;slack&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">          condition: </span><span class="__shiki_mdbnqw">&#39;index_size_growth_rate&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          threshold: </span><span class="__shiki_mdbnqw">&#39;&gt;20% per day&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          action: </span><span class="__shiki_mdbnqw">&#39;investigate&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          channels: [</span><span class="__shiki_mdbnqw">&#39;slack&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      ],</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      warning: [</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">          condition: </span><span class="__shiki_mdbnqw">&#39;unused_index&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          threshold: </span><span class="__shiki_mdbnqw">&#39;30 days&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          action: </span><span class="__shiki_mdbnqw">&#39;review&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          channels: [</span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">          condition: </span><span class="__shiki_mdbnqw">&#39;index_fragmentation&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          threshold: </span><span class="__shiki_mdbnqw">&#39;&gt;30%&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          action: </span><span class="__shiki_mdbnqw">&#39;schedule_maintenance&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          channels: [</span><span class="__shiki_mdbnqw">&#39;dashboard&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      ],</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      info: [</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">          condition: </span><span class="__shiki_mdbnqw">&#39;new_index_created&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          threshold: </span><span class="__shiki_mdbnqw">&#39;any&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          action: </span><span class="__shiki_mdbnqw">&#39;log&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          channels: [</span><span class="__shiki_mdbnqw">&#39;log&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">          condition: </span><span class="__shiki_mdbnqw">&#39;index_performance_degradation&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          threshold: </span><span class="__shiki_mdbnqw">&#39;&gt;10%&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          action: </span><span class="__shiki_mdbnqw">&#39;monitor&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          channels: [</span><span class="__shiki_mdbnqw">&#39;dashboard&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      ]</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> alerts;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 7. 索引文档化</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> documentIndexes</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">collection</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> indexes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">getIndexes</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> collectionStats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">stats</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> queryPatterns</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeQueryPatterns</span><span class="__shiki_140thh">(collection);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> documentation</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      metadata: {</span></span>
<span class="line"><span class="__shiki_140thh">        collection: collection.collectionName,</span></span>
<span class="line"><span class="__shiki_140thh">        database: collection.dbName,</span></span>
<span class="line"><span class="__shiki_140thh">        documentedAt: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        documentVersion: </span><span class="__shiki_mdbnqw">&#39;1.0&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      indexes: indexes.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">index</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> ({</span></span>
<span class="line"><span class="__shiki_140thh">        name: index.name,</span></span>
<span class="line"><span class="__shiki_140thh">        key: index.key,</span></span>
<span class="line"><span class="__shiki_140thh">        properties: {</span></span>
<span class="line"><span class="__shiki_140thh">          unique: index.unique </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          sparse: index.sparse </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          partial: index.partialFilterExpression </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          ttl: index.expireAfterSeconds </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          hidden: index.hidden </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        statistics: {</span></span>
<span class="line"><span class="__shiki_140thh">          size: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getIndexSize</span><span class="__shiki_140thh">(index.name, collectionStats),</span></span>
<span class="line"><span class="__shiki_140thh">          usage: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getIndexUsage</span><span class="__shiki_140thh">(index.name),</span></span>
<span class="line"><span class="__shiki_140thh">          lastUsed: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getLastUsed</span><span class="__shiki_140thh">(index.name),</span></span>
<span class="line"><span class="__shiki_140thh">          fragmentation: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">estimateFragmentation</span><span class="__shiki_140thh">(index, collectionStats)</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        purpose: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">inferIndexPurpose</span><span class="__shiki_140thh">(index, queryPatterns),</span></span>
<span class="line"><span class="__shiki_140thh">        dependencies: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">identifyIndexDependencies</span><span class="__shiki_140thh">(index, indexes),</span></span>
<span class="line"><span class="__shiki_140thh">        maintenance: {</span></span>
<span class="line"><span class="__shiki_140thh">          lastRebuild: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getLastMaintenance</span><span class="__shiki_140thh">(index.name),</span></span>
<span class="line"><span class="__shiki_140thh">          recommendedAction: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getRecommendedAction</span><span class="__shiki_140thh">(index)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      })),</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      queryPatterns: queryPatterns.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">pattern</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> ({</span></span>
<span class="line"><span class="__shiki_140thh">        description: pattern.description,</span></span>
<span class="line"><span class="__shiki_140thh">        filter: pattern.filter,</span></span>
<span class="line"><span class="__shiki_140thh">        sort: pattern.sort,</span></span>
<span class="line"><span class="__shiki_140thh">        projection: pattern.projection,</span></span>
<span class="line"><span class="__shiki_140thh">        frequency: pattern.frequency,</span></span>
<span class="line"><span class="__shiki_140thh">        usedIndexes: pattern.usedIndexes,</span></span>
<span class="line"><span class="__shiki_140thh">        performance: pattern.performance</span></span>
<span class="line"><span class="__shiki_140thh">      })),</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      recommendations: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">generateDocumentationRecommendations</span><span class="__shiki_140thh">(indexes, queryPatterns)</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 保存文档</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">saveDocumentation</span><span class="__shiki_140thh">(documentation);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> documentation;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_7-总结" tabindex="-1">7. 总结 <a class="header-anchor" href="#_7-总结" aria-label="Permalink to &quot;7. 总结&quot;">​</a></h2><h3 id="_7-1-索引优化核心原则" tabindex="-1">7.1 索引优化核心原则 <a class="header-anchor" href="#_7-1-索引优化核心原则" aria-label="Permalink to &quot;7.1 索引优化核心原则&quot;">​</a></h3><ol><li><strong>理解数据访问模式</strong>：索引设计必须基于实际的查询模式</li><li><strong>遵循ESR规则</strong>：等值字段 → 排序字段 → 范围字段</li><li><strong>选择性优先</strong>：高选择性字段应该放在复合索引前面</li><li><strong>覆盖查询最优</strong>：尽可能设计覆盖查询的索引</li><li><strong>监控持续优化</strong>：索引需要持续监控和调整</li></ol><h3 id="_7-2-关键性能指标" tabindex="-1">7.2 关键性能指标 <a class="header-anchor" href="#_7-2-关键性能指标" aria-label="Permalink to &quot;7.2 关键性能指标&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 索引性能关键指标</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> keyPerformanceIndicators</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  efficiency: {</span></span>
<span class="line"><span class="__shiki_140thh">    indexSelectivity: </span><span class="__shiki_mdbnqw">&quot;返回文档数 / 扫描索引键数 &gt; 0.01&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    documentSelectivity: </span><span class="__shiki_mdbnqw">&quot;返回文档数 / 扫描文档数 &gt; 0.1&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    coverageRate: </span><span class="__shiki_mdbnqw">&quot;覆盖查询比例 &gt; 80%&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  operations: {</span></span>
<span class="line"><span class="__shiki_140thh">    writeAmplification: </span><span class="__shiki_mdbnqw">&quot;索引更新开销 &lt; 2倍&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    indexMaintenance: </span><span class="__shiki_mdbnqw">&quot;索引维护时间 &lt; 业务低峰窗口&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    queryResponse: </span><span class="__shiki_mdbnqw">&quot;P95查询延迟 &lt; 100ms&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  resource: {</span></span>
<span class="line"><span class="__shiki_140thh">    indexSize: </span><span class="__shiki_mdbnqw">&quot;索引大小 &lt; 数据大小的50%&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    memoryUsage: </span><span class="__shiki_mdbnqw">&quot;工作集在内存中&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    fragmentation: </span><span class="__shiki_mdbnqw">&quot;索引碎片率 &lt; 20%&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_7-3-持续优化流程" tabindex="-1">7.3 持续优化流程 <a class="header-anchor" href="#_7-3-持续优化流程" aria-label="Permalink to &quot;7.3 持续优化流程&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[监控性能指标] --&gt; B[识别瓶颈问题]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C{问题类型}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[查询缓慢]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; E[写入缓慢]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; F[存储过大]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; G[分析查询计划]</span></span>
<span class="line"><span class="__shiki_140thh">    G --&gt; H[检查索引使用]</span></span>
<span class="line"><span class="__shiki_140thh">    H --&gt; I[设计优化方案]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; J[分析写入模式]</span></span>
<span class="line"><span class="__shiki_140thh">    J --&gt; K[评估索引开销]</span></span>
<span class="line"><span class="__shiki_140thh">    K --&gt; I</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; L[分析索引大小]</span></span>
<span class="line"><span class="__shiki_140thh">    L --&gt; M[识别碎片索引]</span></span>
<span class="line"><span class="__shiki_140thh">    M --&gt; I</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    I --&gt; N[实施优化]</span></span>
<span class="line"><span class="__shiki_140thh">    N --&gt; O[验证效果]</span></span>
<span class="line"><span class="__shiki_140thh">    O --&gt; P{效果满意?}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    P --&gt;|是| A</span></span>
<span class="line"><span class="__shiki_140thh">    P --&gt;|否| Q[回滚调整]</span></span>
<span class="line"><span class="__shiki_140thh">    Q --&gt; I</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    style A fill:#f9f,stroke:#333,stroke-width:2px</span></span>
<span class="line"><span class="__shiki_140thh">    style N fill:#ccf,stroke:#333,stroke-width:2px</span></span></code></pre></div><h3 id="_7-4-工具与资源" tabindex="-1">7.4 工具与资源 <a class="header-anchor" href="#_7-4-工具与资源" aria-label="Permalink to &quot;7.4 工具与资源&quot;">​</a></h3><ol><li><p><strong>监控工具</strong>：</p><ul><li>MongoDB Atlas性能面板</li><li>mtools（日志分析）</li><li>Percona Monitoring and Management</li></ul></li><li><p><strong>分析工具</strong>：</p><ul><li>explain()方法</li><li>db.currentOp()</li><li>系统分析器（profiler）</li></ul></li><li><p><strong>最佳实践</strong>：</p><ul><li>测试环境验证所有索引变更</li><li>使用隐藏索引测试性能影响</li><li>建立索引变更审核流程</li><li>定期进行索引健康检查</li></ul></li></ol><p>通过系统性的索引设计、持续的监控优化，以及遵循最佳实践，可以确保MongoDB数据库始终提供高性能的数据访问服务。</p>`,55)])])}const r=a(p,[["render",h]]);export{d as __pageData,r as default};
