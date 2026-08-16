import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"MongoDB数据建模最佳实践：从理论到实战","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/nosql/document/mongodb/data-modeling.md","filePath":"data/database/nosql/document/mongodb/data-modeling.md"}'),p={name:"data/database/nosql/document/mongodb/data-modeling.md"};function h(l,s,t,c,e,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="mongodb数据建模最佳实践-从理论到实战" tabindex="-1">MongoDB数据建模最佳实践：从理论到实战 <a class="header-anchor" href="#mongodb数据建模最佳实践-从理论到实战" aria-label="Permalink to &quot;MongoDB数据建模最佳实践：从理论到实战&quot;">​</a></h1><h2 id="一、文档数据库设计哲学" tabindex="-1">一、文档数据库设计哲学 <a class="header-anchor" href="#一、文档数据库设计哲学" aria-label="Permalink to &quot;一、文档数据库设计哲学&quot;">​</a></h2><h3 id="_1-1-关系型vs文档型思维转变" tabindex="-1">1.1 关系型vs文档型思维转变 <a class="header-anchor" href="#_1-1-关系型vs文档型思维转变" aria-label="Permalink to &quot;1.1 关系型vs文档型思维转变&quot;">​</a></h3><p><strong>核心差异：</strong></p><ul><li><strong>关系型数据库</strong>：数据被分解为多个关联表，通过外键连接</li><li><strong>文档数据库</strong>：数据以文档形式存储，强调数据的自然聚合</li></ul><p><strong>范式对比：</strong></p><ul><li>关系型数据库：遵循第三范式（3NF），消除冗余</li><li>文档数据库：适当冗余，优先考虑<strong>读性能</strong>和<strong>应用访问模式</strong></li></ul><h3 id="_1-2-mongodb数据建模基本原则" tabindex="-1">1.2 MongoDB数据建模基本原则 <a class="header-anchor" href="#_1-2-mongodb数据建模基本原则" aria-label="Permalink to &quot;1.2 MongoDB数据建模基本原则&quot;">​</a></h3><ol><li><strong>应用驱动设计</strong>：基于应用的查询和更新模式设计模型</li><li><strong>数据一起使用则一起存储</strong>：经常同时访问的数据应嵌入同一文档</li><li><strong>优先考虑嵌入，除非有充分理由引用</strong></li><li><strong>预计算和反规范化</strong>：牺牲写入性能优化读取性能</li><li><strong>考虑基数关系</strong>：决定使用嵌入还是引用</li></ol><h2 id="二、数据建模决策框架" tabindex="-1">二、数据建模决策框架 <a class="header-anchor" href="#二、数据建模决策框架" aria-label="Permalink to &quot;二、数据建模决策框架&quot;">​</a></h2><h3 id="_2-1-关系类型分析" tabindex="-1">2.1 关系类型分析 <a class="header-anchor" href="#_2-1-关系类型分析" aria-label="Permalink to &quot;2.1 关系类型分析&quot;">​</a></h3><h4 id="基数关系分类" tabindex="-1">基数关系分类： <a class="header-anchor" href="#基数关系分类" aria-label="Permalink to &quot;基数关系分类：&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">1. 一对一关系 (1:1)</span></span>
<span class="line"><span class="__shiki_wvjl67">   - 示例：用户 ↔ 用户档案</span></span>
<span class="line"><span class="__shiki_wvjl67">   - 决策：通常嵌入</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">2. 一对多关系 (1:N)</span></span>
<span class="line"><span class="__shiki_wvjl67">   - 示例：博客文章 ↔ 评论</span></span>
<span class="line"><span class="__shiki_wvjl67">   - 决策：取决于N的大小和访问模式</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">3. 多对多关系 (N:M)</span></span>
<span class="line"><span class="__shiki_wvjl67">   - 示例：学生 ↔ 课程</span></span>
<span class="line"><span class="__shiki_wvjl67">   - 决策：通常需要引用</span></span></code></pre></div><h3 id="_2-2-决策树-嵌入-vs-引用" tabindex="-1">2.2 决策树：嵌入 vs 引用 <a class="header-anchor" href="#_2-2-决策树-嵌入-vs-引用" aria-label="Permalink to &quot;2.2 决策树：嵌入 vs 引用&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">是否需要独立访问子文档？</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── 是 → 使用引用</span></span>
<span class="line"><span class="__shiki_wvjl67">    │</span></span>
<span class="line"><span class="__shiki_wvjl67">    └── 否 → 子文档数量是否有限？</span></span>
<span class="line"><span class="__shiki_wvjl67">        ├── 是（小N）→ 考虑嵌入</span></span>
<span class="line"><span class="__shiki_wvjl67">        │</span></span>
<span class="line"><span class="__shiki_wvjl67">        └── 否（大N）→ 考虑引用</span></span>
<span class="line"><span class="__shiki_wvjl67">            │</span></span>
<span class="line"><span class="__shiki_wvjl67">            └── 访问频率如何？</span></span>
<span class="line"><span class="__shiki_wvjl67">                ├── 高频一起访问 → 考虑混合方案</span></span>
<span class="line"><span class="__shiki_wvjl67">                └── 低频一起访问 → 使用引用</span></span></code></pre></div><h3 id="_2-3-具体场景分析表" tabindex="-1">2.3 具体场景分析表 <a class="header-anchor" href="#_2-3-具体场景分析表" aria-label="Permalink to &quot;2.3 具体场景分析表&quot;">​</a></h3><table tabindex="0"><thead><tr><th>场景</th><th>推荐方案</th><th>理由</th><th>示例</th></tr></thead><tbody><tr><td>用户和地址信息</td><td>嵌入</td><td>1:1或1:小N，总是一起访问</td><td><code>{user: &quot;John&quot;, addresses: [{...}]}</code></td></tr><tr><td>博客文章和评论</td><td>混合</td><td>1:中等N，评论可能独立分页</td><td>文章嵌入前10条评论，其余引用</td></tr><tr><td>产品和供应商</td><td>引用</td><td>N:M关系，需要独立更新</td><td>产品文档引用供应商ID</td></tr><tr><td>订单和订单项</td><td>嵌入</td><td>1:N，订单项无独立意义</td><td>订单文档包含所有订单项</td></tr><tr><td>社交媒体帖子</td><td>引用</td><td>1:巨大N（点赞/分享）</td><td>帖子ID在点赞集合中被引用</td></tr></tbody></table><h2 id="三、核心建模模式详解" tabindex="-1">三、核心建模模式详解 <a class="header-anchor" href="#三、核心建模模式详解" aria-label="Permalink to &quot;三、核心建模模式详解&quot;">​</a></h2><h3 id="_3-1-内嵌文档模式-embedded-document-pattern" tabindex="-1">3.1 内嵌文档模式（Embedded Document Pattern） <a class="header-anchor" href="#_3-1-内嵌文档模式-embedded-document-pattern" aria-label="Permalink to &quot;3.1 内嵌文档模式（Embedded Document Pattern）&quot;">​</a></h3><p><strong>适用场景</strong>：</p><ul><li>子文档数量有限且稳定</li><li>数据总是一起查询</li><li>没有独立访问子文档的需求</li></ul><p><strong>示例：用户档案模型</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1t8gfj">  _id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;user123&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  username</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;jdoe&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  email</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;jdoe@example.com&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  profile</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    firstName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;John&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    lastName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Doe&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    birthDate</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;1990-01-01&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1t8gfj">    address</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      street</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;123 Main St&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">      city</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Anytown&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">      state</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;CA&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">      zip</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;12345&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_1t8gfj">  preferences</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    theme</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;dark&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    notifications</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    language</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;en&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>优势</strong>：</p><ul><li>单次读取获取完整数据</li><li>原子性更新整个文档</li><li>避免连接操作</li></ul><h3 id="_3-2-引用模式-referencing-pattern" tabindex="-1">3.2 引用模式（Referencing Pattern） <a class="header-anchor" href="#_3-2-引用模式-referencing-pattern" aria-label="Permalink to &quot;3.2 引用模式（Referencing Pattern）&quot;">​</a></h3><p><strong>适用场景</strong>：</p><ul><li>子文档数量无上限或非常大</li><li>子文档需要独立访问</li><li>多对多关系</li><li>数据频繁更新，避免写入放大</li></ul><p><strong>示例：图书-作者模型</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 图书文档</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1t8gfj">  _id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;book001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  title</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;MongoDB权威指南&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  isbn</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;9787121234567&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  authorIds</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;author001&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;author002&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_1t8gfj">  categories</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;database&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;nosql&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_1t8gfj">  publishedDate</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-01-15&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 作者文档（独立集合）</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1t8gfj">  _id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;author001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;张三&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  bio</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;数据库专家...&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  books</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;book001&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;book003&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>引用策略对比</strong>：</p><table tabindex="0"><thead><tr><th>引用类型</th><th>存储方式</th><th>适用场景</th></tr></thead><tbody><tr><td>手动引用</td><td>存储<code>_id</code>字段</td><td>简单关系，文档间解耦</td></tr><tr><td>DBRefs</td><td><code>{$ref: &quot;collection&quot;, $id: id}</code></td><td>跨数据库引用，已不推荐</td></tr><tr><td>应用层连接</td><td>应用代码中实现连接</td><td>需要灵活控制连接逻辑</td></tr></tbody></table><h3 id="_3-3-混合模式-hybrid-pattern" tabindex="-1">3.3 混合模式（Hybrid Pattern） <a class="header-anchor" href="#_3-3-混合模式-hybrid-pattern" aria-label="Permalink to &quot;3.3 混合模式（Hybrid Pattern）&quot;">​</a></h3><p><strong>适用场景</strong>：结合嵌入和引用的优势，处理中等到大量子文档</p><p><strong>示例：博客文章模型</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1t8gfj">  _id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;post001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  title</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;MongoDB建模指南&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  content</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;这是一篇详细的指南...&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  author</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;author001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;李四&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 嵌入最近评论（高频访问）</span></span>
<span class="line"><span class="__shiki_1t8gfj">  recentComments</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_140thh">      id: </span><span class="__shiki_mdbnqw">&quot;comment001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      user: </span><span class="__shiki_mdbnqw">&quot;王五&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      text: </span><span class="__shiki_mdbnqw">&quot;好文章！&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      timestamp: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-01T10:00:00Z&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ... 最多保留20条最近评论</span></span>
<span class="line"><span class="__shiki_140thh">  ],</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 评论统计信息（预计算）</span></span>
<span class="line"><span class="__shiki_1t8gfj">  commentStats</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    totalCount</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">156</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    lastUpdated</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-05T15:30:00Z&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 引用所有评论（完整集合）</span></span>
<span class="line"><span class="__shiki_1t8gfj">  allCommentIds</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;comment001&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;comment002&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>实现策略</strong>：</p><ol><li>嵌入高频访问的子集</li><li>引用完整集合</li><li>使用预计算字段维护统计信息</li></ol><h3 id="_3-4-桶模式-bucket-pattern" tabindex="-1">3.4 桶模式（Bucket Pattern） <a class="header-anchor" href="#_3-4-桶模式-bucket-pattern" aria-label="Permalink to &quot;3.4 桶模式（Bucket Pattern）&quot;">​</a></h3><p><strong>适用场景</strong>：时间序列数据、IoT数据、日志记录</p><p><strong>示例：传感器数据存储</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1t8gfj">  _id</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sensorId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;sensor001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    date</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-01&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_1t8gfj">  metadata</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    location</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Room 101&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;temperature&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    unit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;°C&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 每小时一个数据点，一天24个点</span></span>
<span class="line"><span class="__shiki_1t8gfj">  measurements</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">    {hour: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, value: </span><span class="__shiki_dzsirb">22.5</span><span class="__shiki_140thh">, timestamp: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-01T00:05:00Z&quot;</span><span class="__shiki_140thh">)},</span></span>
<span class="line"><span class="__shiki_140thh">    {hour: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, value: </span><span class="__shiki_dzsirb">22.3</span><span class="__shiki_140thh">, timestamp: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-01T01:05:00Z&quot;</span><span class="__shiki_140thh">)},</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ... 最多24个测量点</span></span>
<span class="line"><span class="__shiki_140thh">  ],</span></span>
<span class="line"><span class="__shiki_1t8gfj">  stats</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    max</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">23.1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    min</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">22.1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    avg</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">22.6</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    count</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">24</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>优势</strong>：</p><ul><li>减少文档数量（从每秒一个文档到每天一个文档）</li><li>预计算统计信息，查询更快</li><li>更容易维护数据保留策略</li></ul><h3 id="_3-5-计算模式-computed-pattern" tabindex="-1">3.5 计算模式（Computed Pattern） <a class="header-anchor" href="#_3-5-计算模式-computed-pattern" aria-label="Permalink to &quot;3.5 计算模式（Computed Pattern）&quot;">​</a></h3><p><strong>适用场景</strong>：频繁计算的聚合值、统计信息</p><p><strong>示例：电商订单汇总</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1t8gfj">  _id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;user001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  username</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;customer123&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 预计算的订单统计</span></span>
<span class="line"><span class="__shiki_1t8gfj">  orderStats</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    totalOrders</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">45</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    totalSpent</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">12500.50</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    avgOrderValue</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">277.78</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    lastOrderDate</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-05&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 按类别统计</span></span>
<span class="line"><span class="__shiki_1t8gfj">    byCategory</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      electronics</span><span class="__shiki_140thh">: {</span><span class="__shiki_1t8gfj">count</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">12</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">6500.00</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_1t8gfj">      clothing</span><span class="__shiki_140thh">: {</span><span class="__shiki_1t8gfj">count</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">18</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3200.50</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_1t8gfj">      books</span><span class="__shiki_140thh">: {</span><span class="__shiki_1t8gfj">count</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">15</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2800.00</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 原始订单引用</span></span>
<span class="line"><span class="__shiki_1t8gfj">  recentOrderIds</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;order1001&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;order1002&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;order1003&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>实现方式</strong>：</p><ol><li><strong>应用层计算</strong>：在业务逻辑中更新</li><li><strong>变更流监听</strong>：使用MongoDB变更流自动更新</li><li><strong>定期聚合任务</strong>：定时运行聚合管道更新</li></ol><h3 id="_3-6-模式版本控制-schema-versioning" tabindex="-1">3.6 模式版本控制（Schema Versioning） <a class="header-anchor" href="#_3-6-模式版本控制-schema-versioning" aria-label="Permalink to &quot;3.6 模式版本控制（Schema Versioning）&quot;">​</a></h3><p><strong>适用场景</strong>：长期演进的应用程序</p><p><strong>实现策略</strong>：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1t8gfj">  _id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;product001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;智能手机&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  price</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2999</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 模式版本号</span></span>
<span class="line"><span class="__shiki_1t8gfj">  schemaVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2.1&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 兼容旧版本字段</span></span>
<span class="line"><span class="__shiki_1t8gfj">  oldPriceField</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2999</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// v1.0字段</span></span>
<span class="line"><span class="__shiki_1t8gfj">  priceDetails</span><span class="__shiki_140thh">: {       </span><span class="__shiki_21nrsd">// v2.0新结构</span></span>
<span class="line"><span class="__shiki_1t8gfj">    basePrice</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2999</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    currency</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;CNY&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    discount</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">200</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_1t8gfj">  metadata</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    createdAt</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2022-01-01&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1t8gfj">    updatedAt</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-01&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1t8gfj">    migrationHistory</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">      {fromVersion: </span><span class="__shiki_mdbnqw">&quot;1.0&quot;</span><span class="__shiki_140thh">, toVersion: </span><span class="__shiki_mdbnqw">&quot;2.0&quot;</span><span class="__shiki_140thh">, date: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-06-01&quot;</span><span class="__shiki_140thh">)}</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>迁移策略</strong>：</p><ol><li><strong>懒惰迁移</strong>：读取时转换并更新文档</li><li><strong>批量迁移</strong>：后台作业更新所有文档</li><li><strong>双写策略</strong>：新旧字段同时写入</li></ol><h2 id="四、高级建模技巧" tabindex="-1">四、高级建模技巧 <a class="header-anchor" href="#四、高级建模技巧" aria-label="Permalink to &quot;四、高级建模技巧&quot;">​</a></h2><h3 id="_4-1-多态模式-polymorphic-pattern" tabindex="-1">4.1 多态模式（Polymorphic Pattern） <a class="header-anchor" href="#_4-1-多态模式-polymorphic-pattern" aria-label="Permalink to &quot;4.1 多态模式（Polymorphic Pattern）&quot;">​</a></h3><p><strong>适用场景</strong>：不同类型文档有相似但不同的结构</p><p><strong>示例：内容管理系统</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 所有内容类型共享的字段</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1t8gfj">  _id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;content001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;article&quot;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 或 &quot;video&quot;, &quot;podcast&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">  title</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;MongoDB教程&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  author</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;author001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  publishedDate</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-01&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1t8gfj">  tags</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;database&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;nosql&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 类型特定字段</span></span>
<span class="line"><span class="__shiki_1t8gfj">  attributes</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 文章类型</span></span>
<span class="line"><span class="__shiki_1t8gfj">    wordCount</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2500</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    readingTime</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10分钟&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 视频类型会有不同字段</span></span>
<span class="line"><span class="__shiki_21nrsd">    // duration: 3600,</span></span>
<span class="line"><span class="__shiki_21nrsd">    // resolution: &quot;1080p&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>索引策略</strong>：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 创建多态索引</span></span>
<span class="line"><span class="__shiki_140thh">db.contents.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;publishedDate&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;tags&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 稀疏索引用于可选字段</span></span>
<span class="line"><span class="__shiki_140thh">db.contents.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">  {</span><span class="__shiki_mdbnqw">&quot;attributes.wordCount&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">  {sparse: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_4-2-子集模式-subset-pattern" tabindex="-1">4.2 子集模式（Subset Pattern） <a class="header-anchor" href="#_4-2-子集模式-subset-pattern" aria-label="Permalink to &quot;4.2 子集模式（Subset Pattern）&quot;">​</a></h3><p><strong>适用场景</strong>：文档很大但通常只需要部分字段</p><p><strong>示例：产品详细信息</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 主产品文档（完整信息）</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1t8gfj">  _id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;product001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  sku</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;ABC123&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;高性能笔记本电脑&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  price</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8999</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  category</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;electronics&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 详细描述（可能很大）</span></span>
<span class="line"><span class="__shiki_1t8gfj">  fullDescription</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;这是一款...（很长的HTML内容）&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  specifications</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Intel i7&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ram</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;32GB&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1TB SSD&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ... 更多详细规格</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_1t8gfj">  reviews</span><span class="__shiki_140thh">: [</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">],  </span><span class="__shiki_21nrsd">// 大量评论</span></span>
<span class="line"><span class="__shiki_1t8gfj">  relatedProducts</span><span class="__shiki_140thh">: [</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 子集文档（用于列表页面）</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1t8gfj">  _id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;product001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  sku</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;ABC123&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;高性能笔记本电脑&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  price</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8999</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  category</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;electronics&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  shortDescription</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;高性能笔记本，适合专业用户&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  mainImage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;laptop.jpg&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  rating</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">4.5</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>实现方式</strong>：</p><ol><li>维护两个集合（products和productSummaries）</li><li>使用物化视图（MongoDB 4.2+的$merge）</li><li>应用层同步更新</li></ol><h3 id="_4-3-文档版本化-document-versioning" tabindex="-1">4.3 文档版本化（Document Versioning） <a class="header-anchor" href="#_4-3-文档版本化-document-versioning" aria-label="Permalink to &quot;4.3 文档版本化（Document Versioning）&quot;">​</a></h3><p><strong>示例：合同版本管理</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1t8gfj">  _id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;contract_2023_v3&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  contractId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;CON2023001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  version</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  status</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;active&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  previousVersions</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">    {version: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, effectiveDate: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-01-01&quot;</span><span class="__shiki_140thh">)},</span></span>
<span class="line"><span class="__shiki_140thh">    {version: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, effectiveDate: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-06-01&quot;</span><span class="__shiki_140thh">)}</span></span>
<span class="line"><span class="__shiki_140thh">  ],</span></span>
<span class="line"><span class="__shiki_1t8gfj">  content</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 当前版本内容</span></span>
<span class="line"><span class="__shiki_1t8gfj">    parties</span><span class="__shiki_140thh">: [</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_1t8gfj">    terms</span><span class="__shiki_140thh">: [</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_1t8gfj">    clauses</span><span class="__shiki_140thh">: [</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_1t8gfj">  metadata</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    createdBy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;user001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    createdAt</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-09-01&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1t8gfj">    changeLog</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">      {version: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, changes: </span><span class="__shiki_mdbnqw">&quot;更新了付款条款&quot;</span><span class="__shiki_140thh">, date: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-06-01&quot;</span><span class="__shiki_140thh">)},</span></span>
<span class="line"><span class="__shiki_140thh">      {version: </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">, changes: </span><span class="__shiki_mdbnqw">&quot;增加了保密条款&quot;</span><span class="__shiki_140thh">, date: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-09-01&quot;</span><span class="__shiki_140thh">)}</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="五、性能优化考量" tabindex="-1">五、性能优化考量 <a class="header-anchor" href="#五、性能优化考量" aria-label="Permalink to &quot;五、性能优化考量&quot;">​</a></h2><h3 id="_5-1-文档大小管理" tabindex="-1">5.1 文档大小管理 <a class="header-anchor" href="#_5-1-文档大小管理" aria-label="Permalink to &quot;5.1 文档大小管理&quot;">​</a></h3><p><strong>最佳实践</strong>：</p><ol><li><strong>16MB文档限制</strong>：确保文档不超过MongoDB的BSON文档大小限制</li><li><strong>分块策略</strong>：大文档拆分为逻辑块</li><li><strong>GridFS</strong>：存储大于16MB的文件</li></ol><p><strong>示例：大型内容分块</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 主文档</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1t8gfj">  _id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;article001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  title</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;非常长的文章&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  chunkCount</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  totalSize</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1024000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  chunks</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">    {chunkId: </span><span class="__shiki_mdbnqw">&quot;chunk1&quot;</span><span class="__shiki_140thh">, size: </span><span class="__shiki_dzsirb">200000</span><span class="__shiki_140thh">, order: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">    {chunkId: </span><span class="__shiki_mdbnqw">&quot;chunk2&quot;</span><span class="__shiki_140thh">, size: </span><span class="__shiki_dzsirb">200000</span><span class="__shiki_140thh">, order: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ...</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 分块文档（单独集合）</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1t8gfj">  _id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;article001_chunk1&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  articleId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;article001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  order</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  content</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;...&quot;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 200KB内容</span></span>
<span class="line"><span class="__shiki_1t8gfj">  nextChunkId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;article001_chunk2&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-索引设计策略" tabindex="-1">5.2 索引设计策略 <a class="header-anchor" href="#_5-2-索引设计策略" aria-label="Permalink to &quot;5.2 索引设计策略&quot;">​</a></h3><p><strong>索引设计原则</strong>：</p><ol><li><strong>ESR规则</strong>：Equality → Sort → Range</li><li><strong>覆盖查询</strong>：创建包含所有查询字段的索引</li><li><strong>索引选择性</strong>：高基数字段在前</li></ol><p><strong>复合索引示例</strong>：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 查询模式：按类别和价格范围查找，按评分排序</span></span>
<span class="line"><span class="__shiki_140thh">db.products.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  category: </span><span class="__shiki_mdbnqw">&quot;electronics&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  price: {$gte: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">, $lte: </span><span class="__shiki_dzsirb">5000</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">}).</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">({rating: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 最佳索引设计</span></span>
<span class="line"><span class="__shiki_140thh">db.products.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  category: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,      </span><span class="__shiki_21nrsd">// Equality</span></span>
<span class="line"><span class="__shiki_140thh">  rating: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,       </span><span class="__shiki_21nrsd">// Sort</span></span>
<span class="line"><span class="__shiki_140thh">  price: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_21nrsd">          // Range</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 替代方案：如果price范围查询更关键</span></span>
<span class="line"><span class="__shiki_140thh">db.products.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  category: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  price: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  rating: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><p><strong>索引类型选择</strong>：</p><table tabindex="0"><thead><tr><th>索引类型</th><th>适用场景</th><th>示例</th></tr></thead><tbody><tr><td>单字段索引</td><td>简单查询条件</td><td><code>db.users.createIndex({email: 1})</code></td></tr><tr><td>复合索引</td><td>多条件查询</td><td><code>db.orders.createIndex({userId: 1, date: -1})</code></td></tr><tr><td>多键索引</td><td>数组字段查询</td><td><code>db.products.createIndex({tags: 1})</code></td></tr><tr><td>文本索引</td><td>全文搜索</td><td><code>db.articles.createIndex({content: &quot;text&quot;})</code></td></tr><tr><td>地理空间索引</td><td>位置查询</td><td><code>db.places.createIndex({location: &quot;2dsphere&quot;})</code></td></tr><tr><td>哈希索引</td><td>分片键均匀分布</td><td><code>db.logs.createIndex({_id: &quot;hashed&quot;})</code></td></tr><tr><td>通配符索引</td><td>动态字段模式</td><td><code>db.data.createIndex({&quot;metadata.$**&quot;: 1})</code></td></tr></tbody></table><h3 id="_5-3-写入优化策略" tabindex="-1">5.3 写入优化策略 <a class="header-anchor" href="#_5-3-写入优化策略" aria-label="Permalink to &quot;5.3 写入优化策略&quot;">​</a></h3><p><strong>批量操作示例</strong>：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 批量插入优化</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> bulkOps</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">  bulkOps.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">    insertOne: {document: {name: </span><span class="__shiki_mdbnqw">\`product\${</span><span class="__shiki_140thh">i</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">, price: i </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">}}</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">db.products.</span><span class="__shiki_1t8gfj">bulkWrite</span><span class="__shiki_140thh">(bulkOps, {ordered: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用$set更新特定字段，避免替换整个文档</span></span>
<span class="line"><span class="__shiki_140thh">db.users.</span><span class="__shiki_1t8gfj">updateOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">  {_id: </span><span class="__shiki_mdbnqw">&quot;user001&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">  {</span></span>
<span class="line"><span class="__shiki_140thh">    $set: {lastLogin: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">()},</span></span>
<span class="line"><span class="__shiki_140thh">    $inc: {loginCount: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_5-4-分片策略设计" tabindex="-1">5.4 分片策略设计 <a class="header-anchor" href="#_5-4-分片策略设计" aria-label="Permalink to &quot;5.4 分片策略设计&quot;">​</a></h3><p><strong>分片键选择原则</strong>：</p><ol><li><strong>基数高</strong>：足够多的不同值</li><li><strong>写分布均匀</strong>：避免热点分片</li><li><strong>查询定向</strong>：支持常见查询模式</li></ol><p><strong>示例：时间序列数据分片</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 复合分片键：日期+设备ID</span></span>
<span class="line"><span class="__shiki_140thh">sh.</span><span class="__shiki_1t8gfj">shardCollection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;sensorDB.measurements&quot;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;date&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,        </span><span class="__shiki_21nrsd">// 日期前缀提供范围分片</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;sensorId&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_21nrsd">     // 设备ID提供基数</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 哈希分片键：均匀分布写入</span></span>
<span class="line"><span class="__shiki_140thh">sh.</span><span class="__shiki_1t8gfj">shardCollection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;logs.entries&quot;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;_id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;hashed&quot;</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h2 id="六、实际应用场景建模" tabindex="-1">六、实际应用场景建模 <a class="header-anchor" href="#六、实际应用场景建模" aria-label="Permalink to &quot;六、实际应用场景建模&quot;">​</a></h2><h3 id="_6-1-电子商务平台" tabindex="-1">6.1 电子商务平台 <a class="header-anchor" href="#_6-1-电子商务平台" aria-label="Permalink to &quot;6.1 电子商务平台&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 产品目录（多态模式）</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1t8gfj">  _id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;prod_001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;physical&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// physical, digital, service</span></span>
<span class="line"><span class="__shiki_1t8gfj">  sku</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;ELEC001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;无线耳机&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  category</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;electronics/audio&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  variants</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">    {color: </span><span class="__shiki_mdbnqw">&quot;black&quot;</span><span class="__shiki_140thh">, price: </span><span class="__shiki_dzsirb">299</span><span class="__shiki_140thh">, stock: </span><span class="__shiki_dzsirb">45</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">    {color: </span><span class="__shiki_mdbnqw">&quot;white&quot;</span><span class="__shiki_140thh">, price: </span><span class="__shiki_dzsirb">309</span><span class="__shiki_140thh">, stock: </span><span class="__shiki_dzsirb">32</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">  ],</span></span>
<span class="line"><span class="__shiki_1t8gfj">  attributes</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    brand</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;AudioTech&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    model</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;ATH-M50x&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    wireless</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    batteryLife</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">40</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 预计算字段</span></span>
<span class="line"><span class="__shiki_1t8gfj">  stats</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    totalSold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1250</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    avgRating</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">4.7</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    reviewCount</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">89</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    last30DaysSold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">120</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 分层分类</span></span>
<span class="line"><span class="__shiki_1t8gfj">  taxonomy</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    l1</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;electronics&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    l2</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;audio&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    l3</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;headphones&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 销售策略</span></span>
<span class="line"><span class="__shiki_1t8gfj">  pricing</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    basePrice</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">299</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    currency</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;CNY&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    discounts</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">      {type: </span><span class="__shiki_mdbnqw">&quot;seasonal&quot;</span><span class="__shiki_140thh">, value: </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">, endDate: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-12-31&quot;</span><span class="__shiki_140thh">)}</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 用户购物车（内嵌模式）</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1t8gfj">  _id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;cart_user001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  userId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;user001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  items</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_140thh">      productId: </span><span class="__shiki_mdbnqw">&quot;prod_001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      variantId: </span><span class="__shiki_mdbnqw">&quot;variant_black&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      quantity: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      addedAt: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-05T10:00:00Z&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      priceSnapshot: </span><span class="__shiki_dzsirb">299</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      productName: </span><span class="__shiki_mdbnqw">&quot;无线耳机（黑色）&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  ],</span></span>
<span class="line"><span class="__shiki_1t8gfj">  summary</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    itemCount</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    subtotal</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">598</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    discount</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    total</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">598</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    lastUpdated</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-05T10:00:00Z&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 订单（混合模式）</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1t8gfj">  _id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;order20231005001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  orderNumber</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;20231005001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  userId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;user001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  status</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;completed&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  timeline</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">    {status: </span><span class="__shiki_mdbnqw">&quot;created&quot;</span><span class="__shiki_140thh">, timestamp: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-05T10:05:00Z&quot;</span><span class="__shiki_140thh">)},</span></span>
<span class="line"><span class="__shiki_140thh">    {status: </span><span class="__shiki_mdbnqw">&quot;paid&quot;</span><span class="__shiki_140thh">, timestamp: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-05T10:10:00Z&quot;</span><span class="__shiki_140thh">)},</span></span>
<span class="line"><span class="__shiki_140thh">    {status: </span><span class="__shiki_mdbnqw">&quot;shipped&quot;</span><span class="__shiki_140thh">, timestamp: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-05T14:30:00Z&quot;</span><span class="__shiki_140thh">)},</span></span>
<span class="line"><span class="__shiki_140thh">    {status: </span><span class="__shiki_mdbnqw">&quot;delivered&quot;</span><span class="__shiki_140thh">, timestamp: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-07T09:15:00Z&quot;</span><span class="__shiki_140thh">)}</span></span>
<span class="line"><span class="__shiki_140thh">  ],</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 内嵌订单项</span></span>
<span class="line"><span class="__shiki_1t8gfj">  items</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_140thh">      productId: </span><span class="__shiki_mdbnqw">&quot;prod_001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      variantId: </span><span class="__shiki_mdbnqw">&quot;variant_black&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      quantity: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      unitPrice: </span><span class="__shiki_dzsirb">299</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      totalPrice: </span><span class="__shiki_dzsirb">598</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      productDetails: {</span></span>
<span class="line"><span class="__shiki_140thh">        name: </span><span class="__shiki_mdbnqw">&quot;无线耳机（黑色）&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        sku: </span><span class="__shiki_mdbnqw">&quot;ELEC001-BLK&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  ],</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 价格明细</span></span>
<span class="line"><span class="__shiki_1t8gfj">  pricing</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    subtotal</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">598</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    shipping</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    discount</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    tax</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">57.8</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    total</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">635.8</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 用户快照（订单创建时的信息）</span></span>
<span class="line"><span class="__shiki_1t8gfj">  userSnapshot</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    userId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;user001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    email</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;user@example.com&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    shippingAddress</span><span class="__shiki_140thh">: {</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_1t8gfj">    billingAddress</span><span class="__shiki_140thh">: {</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 引用支付和物流</span></span>
<span class="line"><span class="__shiki_1t8gfj">  paymentId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;pay_001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  shipmentIds</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;ship_001&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-社交网络应用" tabindex="-1">6.2 社交网络应用 <a class="header-anchor" href="#_6-2-社交网络应用" aria-label="Permalink to &quot;6.2 社交网络应用&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 用户社交图谱（混合模式）</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1t8gfj">  _id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;user001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  username</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;johndoe&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  profile</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    displayName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;John Doe&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    bio</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;技术爱好者&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    avatar</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;avatar001.jpg&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 内嵌直接社交关系（一度连接）</span></span>
<span class="line"><span class="__shiki_1t8gfj">  connections</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    followers</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;user002&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;user003&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;user004&quot;</span><span class="__shiki_140thh">],  </span><span class="__shiki_21nrsd">// 关注者</span></span>
<span class="line"><span class="__shiki_1t8gfj">    following</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;user005&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;user006&quot;</span><span class="__shiki_140thh">],             </span><span class="__shiki_21nrsd">// 正在关注</span></span>
<span class="line"><span class="__shiki_1t8gfj">    friends</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;user002&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;user005&quot;</span><span class="__shiki_140thh">]                </span><span class="__shiki_21nrsd">// 互相关注</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 社交统计（预计算）</span></span>
<span class="line"><span class="__shiki_1t8gfj">  socialStats</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    followerCount</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">342</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    followingCount</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">156</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    postCount</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">45</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    likeCount</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1200</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    lastUpdated</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-05&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 隐私设置</span></span>
<span class="line"><span class="__shiki_1t8gfj">  privacy</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    profileVisibility</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;public&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    connectionListVisibility</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;friends&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    postDefaultVisibility</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;public&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 社交帖子（桶模式用于互动）</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1t8gfj">  _id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;post001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  authorId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;user001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  content</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    text</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;今天学习了MongoDB数据建模...&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    media</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;image001.jpg&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_1t8gfj">    hashtags</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;#MongoDB&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;#数据库&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_1t8gfj">  timestamp</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-05T09:00:00Z&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1t8gfj">  visibility</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;public&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 内嵌最近互动（高频访问）</span></span>
<span class="line"><span class="__shiki_1t8gfj">  recentInteractions</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    likes</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">      {userId: </span><span class="__shiki_mdbnqw">&quot;user002&quot;</span><span class="__shiki_140thh">, timestamp: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-05T09:05:00Z&quot;</span><span class="__shiki_140thh">)},</span></span>
<span class="line"><span class="__shiki_140thh">      {userId: </span><span class="__shiki_mdbnqw">&quot;user003&quot;</span><span class="__shiki_140thh">, timestamp: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-05T09:10:00Z&quot;</span><span class="__shiki_140thh">)}</span></span>
<span class="line"><span class="__shiki_140thh">    ],</span></span>
<span class="line"><span class="__shiki_1t8gfj">    comments</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">      {</span></span>
<span class="line"><span class="__shiki_140thh">        id: </span><span class="__shiki_mdbnqw">&quot;comment001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        userId: </span><span class="__shiki_mdbnqw">&quot;user002&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        text: </span><span class="__shiki_mdbnqw">&quot;好文章！&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        timestamp: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-05T09:15:00Z&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    ],</span></span>
<span class="line"><span class="__shiki_1t8gfj">    shares</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 互动统计（预计算）</span></span>
<span class="line"><span class="__shiki_1t8gfj">  interactionStats</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    totalLikes</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">42</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    totalComments</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    totalShares</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">12</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    lastInteraction</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-05T14:30:00Z&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 引用完整互动（单独集合）</span></span>
<span class="line"><span class="__shiki_1t8gfj">  hasMoreInteractions</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-3-物联网平台" tabindex="-1">6.3 物联网平台 <a class="header-anchor" href="#_6-3-物联网平台" aria-label="Permalink to &quot;6.3 物联网平台&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 设备元数据（引用模式）</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1t8gfj">  _id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;device001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  deviceId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;temp_sensor_01&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;temperature_sensor&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  model</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;TEMP-X1&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  manufacturer</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;IoT Corp&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  installation</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    locationId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;loc_warehouse_a&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    coordinates</span><span class="__shiki_140thh">: {</span><span class="__shiki_1t8gfj">lat</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">40.7128</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">lng</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">74.0060</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_1t8gfj">    installedAt</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-01-15&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1t8gfj">    installedBy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;tech001&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_1t8gfj">  configuration</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    samplingRate</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 秒</span></span>
<span class="line"><span class="__shiki_1t8gfj">    minThreshold</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    maxThreshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    unit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;celsius&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_1t8gfj">  status</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    online</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    lastSeen</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-05T23:59:00Z&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1t8gfj">    batteryLevel</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">85</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    firmwareVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2.1.4&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 关联资产</span></span>
<span class="line"><span class="__shiki_1t8gfj">  assetId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;asset_machine_001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  gatewayId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;gateway_001&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 传感器数据（桶模式）</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1t8gfj">  _id</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    deviceId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;device001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    date</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-05&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1t8gfj">    hour</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">14</span><span class="__shiki_21nrsd">  // 每小时一个桶</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_1t8gfj">  metadata</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    deviceType</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;temperature_sensor&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    unit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;celsius&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 每分钟一个读数，每小时60个</span></span>
<span class="line"><span class="__shiki_1t8gfj">  readings</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">    {minute: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, value: </span><span class="__shiki_dzsirb">22.5</span><span class="__shiki_140thh">, timestamp: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-05T14:00:00Z&quot;</span><span class="__shiki_140thh">)},</span></span>
<span class="line"><span class="__shiki_140thh">    {minute: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, value: </span><span class="__shiki_dzsirb">22.6</span><span class="__shiki_140thh">, timestamp: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-05T14:01:00Z&quot;</span><span class="__shiki_140thh">)},</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ... 到 minute: 59</span></span>
<span class="line"><span class="__shiki_140thh">  ],</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 预计算统计</span></span>
<span class="line"><span class="__shiki_1t8gfj">  stats</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    count</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    avg</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">22.8</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    min</span><span class="__shiki_140thh">: {</span><span class="__shiki_1t8gfj">value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">22.4</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">timestamp</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-05T14:15:00Z&quot;</span><span class="__shiki_140thh">)},</span></span>
<span class="line"><span class="__shiki_1t8gfj">    max</span><span class="__shiki_140thh">: {</span><span class="__shiki_1t8gfj">value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">23.2</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">timestamp</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-05T14:45:00Z&quot;</span><span class="__shiki_140thh">)},</span></span>
<span class="line"><span class="__shiki_1t8gfj">    stdDev</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0.3</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 数据质量标记</span></span>
<span class="line"><span class="__shiki_1t8gfj">  quality</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    missingIntervals</span><span class="__shiki_140thh">: [],</span></span>
<span class="line"><span class="__shiki_1t8gfj">    anomalies</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">      {minute: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">, reason: </span><span class="__shiki_mdbnqw">&quot;spike_detected&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 设备事件日志（子集模式）</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1t8gfj">  _id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;event_202310051430&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  deviceId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;device001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  eventType</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;threshold_exceeded&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;warning&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  timestamp</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-05T14:30:00Z&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1t8gfj">  details</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    parameter</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;temperature&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">45.2</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    threshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">40.0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    unit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;celsius&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 上下文数据</span></span>
<span class="line"><span class="__shiki_1t8gfj">  context</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    deviceStatus</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;operational&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ambientTemperature</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">28.5</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    previousValue</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">38.7</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 动作跟踪</span></span>
<span class="line"><span class="__shiki_1t8gfj">  actions</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_140thh">      type: </span><span class="__shiki_mdbnqw">&quot;notification&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      sentTo: </span><span class="__shiki_mdbnqw">&quot;operator001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      timestamp: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-05T14:30:05Z&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="七、建模工作流程与最佳实践" tabindex="-1">七、建模工作流程与最佳实践 <a class="header-anchor" href="#七、建模工作流程与最佳实践" aria-label="Permalink to &quot;七、建模工作流程与最佳实践&quot;">​</a></h2><h3 id="_7-1-建模工作流程" tabindex="-1">7.1 建模工作流程 <a class="header-anchor" href="#_7-1-建模工作流程" aria-label="Permalink to &quot;7.1 建模工作流程&quot;">​</a></h3><p><strong>四步建模法：</strong></p><ol><li><p><strong>需求分析</strong>：</p><ul><li>识别实体和关系</li><li>分析查询模式</li><li>确定读写比例</li><li>预估数据量和增长</li></ul></li><li><p><strong>模式设计</strong>：</p><ul><li>选择嵌入或引用</li><li>设计文档结构</li><li>考虑索引需求</li><li>规划分片策略</li></ul></li><li><p><strong>实现与测试</strong>：</p><ul><li>创建集合和索引</li><li>编写CRUD操作</li><li>性能测试</li><li>负载测试</li></ul></li><li><p><strong>迭代优化</strong>：</p><ul><li>监控性能指标</li><li>分析慢查询</li><li>调整索引</li><li>重构模式</li></ul></li></ol><h3 id="_7-2-性能监控与优化" tabindex="-1">7.2 性能监控与优化 <a class="header-anchor" href="#_7-2-性能监控与优化" aria-label="Permalink to &quot;7.2 性能监控与优化&quot;">​</a></h3><p><strong>关键监控指标：</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 查询性能分析</span></span>
<span class="line"><span class="__shiki_140thh">db.</span><span class="__shiki_1t8gfj">getCollection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;orders&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">explain</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;executionStats&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  userId: </span><span class="__shiki_mdbnqw">&quot;user001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  status: </span><span class="__shiki_mdbnqw">&quot;completed&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  orderDate: {$gte: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-10-01&quot;</span><span class="__shiki_140thh">)}</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 索引使用统计</span></span>
<span class="line"><span class="__shiki_140thh">db.orders.</span><span class="__shiki_1t8gfj">aggregate</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_140thh">  {$indexStats: {}},</span></span>
<span class="line"><span class="__shiki_140thh">  {$sort: {accesses: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">}}</span></span>
<span class="line"><span class="__shiki_140thh">]);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 集合统计信息</span></span>
<span class="line"><span class="__shiki_140thh">db.orders.</span><span class="__shiki_1t8gfj">stats</span><span class="__shiki_140thh">();</span></span></code></pre></div><p><strong>优化检查清单：</strong></p><ul><li>[ ] 文档大小是否控制在合理范围？</li><li>[ ] 索引是否支持所有常见查询？</li><li>[ ] 写操作是否均匀分布？</li><li>[ ] 是否有适当的预计算字段？</li><li>[ ] 数据访问模式是否匹配业务需求？</li><li>[ ] 分片键选择是否合理？</li><li>[ ] 是否有适当的归档策略？</li></ul><h3 id="_7-3-常见陷阱与解决方案" tabindex="-1">7.3 常见陷阱与解决方案 <a class="header-anchor" href="#_7-3-常见陷阱与解决方案" aria-label="Permalink to &quot;7.3 常见陷阱与解决方案&quot;">​</a></h3><table tabindex="0"><thead><tr><th>常见问题</th><th>症状</th><th>解决方案</th></tr></thead><tbody><tr><td>文档无限增长</td><td>文档大小接近16MB限制</td><td>使用桶模式或引用模式</td></tr><tr><td>索引爆炸</td><td>索引占用空间过大</td><td>审查索引使用率，删除无用索引</td></tr><tr><td>热点分片</td><td>单个分片负载过高</td><td>调整分片键，使用哈希分片</td></tr><tr><td>N+1查询问题</td><td>大量单独查询</td><td>使用$lookup聚合或应用层批量查询</td></tr><tr><td>写入放大</td><td>小更新导致整个文档重写</td><td>使用$set只更新修改字段</td></tr><tr><td>连接过多</td><td>需要大量$lookup操作</td><td>考虑适当反规范化，预嵌入数据</td></tr></tbody></table><h2 id="八、迁移与演化策略" tabindex="-1">八、迁移与演化策略 <a class="header-anchor" href="#八、迁移与演化策略" aria-label="Permalink to &quot;八、迁移与演化策略&quot;">​</a></h2><h3 id="_8-1-渐进式模式迁移" tabindex="-1">8.1 渐进式模式迁移 <a class="header-anchor" href="#_8-1-渐进式模式迁移" aria-label="Permalink to &quot;8.1 渐进式模式迁移&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 迁移策略：双写和逐步迁移</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> migrateUserSchema</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> batchSize</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  let</span><span class="__shiki_140thh"> lastId </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  while</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 批量读取旧格式文档</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> query</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> lastId </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> {_id: {$gt: lastId}} </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> {};</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> users</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.users.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(query)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">({_id: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">})</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">limit</span><span class="__shiki_140thh">(batchSize)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (users.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 批量转换和更新</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> bulkOps</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> users.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">user</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> ({</span></span>
<span class="line"><span class="__shiki_140thh">      updateOne: {</span></span>
<span class="line"><span class="__shiki_140thh">        filter: {_id: user._id},</span></span>
<span class="line"><span class="__shiki_140thh">        update: {</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 同时写入新旧字段</span></span>
<span class="line"><span class="__shiki_140thh">          $set: {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 新字段结构</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;profile.firstName&quot;</span><span class="__shiki_140thh">: user.firstName,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;profile.lastName&quot;</span><span class="__shiki_140thh">: user.lastName,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;profile.email&quot;</span><span class="__shiki_140thh">: user.email,</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 标记迁移状态</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;metadata.migrated&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;metadata.migrationVersion&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2.0&quot;</span></span>
<span class="line"><span class="__shiki_140thh">          },</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 保留旧字段（逐步清理）</span></span>
<span class="line"><span class="__shiki_140thh">          $rename: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;firstName&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;legacy.firstName&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;lastName&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;legacy.lastName&quot;</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }));</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> db.users.</span><span class="__shiki_1t8gfj">bulkWrite</span><span class="__shiki_140thh">(bulkOps);</span></span>
<span class="line"><span class="__shiki_140thh">    lastId </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> users[users.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">]._id;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 清理阶段（所有用户迁移完成后）</span></span>
<span class="line"><span class="__shiki_1itgoe">  await</span><span class="__shiki_140thh"> db.users.</span><span class="__shiki_1t8gfj">updateMany</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    {</span><span class="__shiki_mdbnqw">&quot;metadata.migrated&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">    {$unset: {legacy: </span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">}}</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-2-版本兼容性管理" tabindex="-1">8.2 版本兼容性管理 <a class="header-anchor" href="#_8-2-版本兼容性管理" aria-label="Permalink to &quot;8.2 版本兼容性管理&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 应用层模式版本处理</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> DocumentModel</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">document</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.rawDoc </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> document;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.schemaVersion </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> document.schemaVersion </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &quot;1.0&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.normalizedData </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">normalize</span><span class="__shiki_140thh">(document);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  normalize</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">doc</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    switch</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.schemaVersion) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &quot;1.0&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">          id: doc._id,</span></span>
<span class="line"><span class="__shiki_140thh">          name: doc.name,</span></span>
<span class="line"><span class="__shiki_140thh">          email: doc.email,</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 从旧格式转换</span></span>
<span class="line"><span class="__shiki_140thh">          profile: {</span></span>
<span class="line"><span class="__shiki_140thh">            firstName: doc.name.</span><span class="__shiki_1t8gfj">split</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39; &#39;</span><span class="__shiki_140thh">)[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">            lastName: doc.name.</span><span class="__shiki_1t8gfj">split</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39; &#39;</span><span class="__shiki_140thh">)[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;&#39;</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &quot;2.0&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">          id: doc._id,</span></span>
<span class="line"><span class="__shiki_140thh">          profile: doc.profile,</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 处理新字段</span></span>
<span class="line"><span class="__shiki_140thh">          preferences: doc.preferences </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_1itgoe">      default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Unsupported schema version: \${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">schemaVersion</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="九、工具与资源" tabindex="-1">九、工具与资源 <a class="header-anchor" href="#九、工具与资源" aria-label="Permalink to &quot;九、工具与资源&quot;">​</a></h2><h3 id="_9-1-建模工具推荐" tabindex="-1">9.1 建模工具推荐 <a class="header-anchor" href="#_9-1-建模工具推荐" aria-label="Permalink to &quot;9.1 建模工具推荐&quot;">​</a></h3><ol><li><strong>MongoDB Compass</strong>：图形化界面查看和优化模式</li><li><strong>MongoDB Atlas</strong>：云服务，包含性能建议</li><li><strong>Variety</strong>：模式分析工具<div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">npm</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_dzsirb"> -g</span><span class="__shiki_mdbnqw"> variety</span></span>
<span class="line"><span class="__shiki_1t8gfj">variety</span><span class="__shiki_mdbnqw"> your-db/your-collection</span></span></code></pre></div></li><li><strong>MongoDB Charts</strong>：数据可视化工具</li></ol><h3 id="_9-2-性能测试工具" tabindex="-1">9.2 性能测试工具 <a class="header-anchor" href="#_9-2-性能测试工具" aria-label="Permalink to &quot;9.2 性能测试工具&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用mongo shell进行负载测试</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> testQueryPerformance</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> start</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> results</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> db.orders.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">    userId: </span><span class="__shiki_mdbnqw">&quot;testUser&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    status: </span><span class="__shiki_mdbnqw">&quot;completed&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    orderDate: {$gte: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-01-01&quot;</span><span class="__shiki_140thh">)}</span></span>
<span class="line"><span class="__shiki_140thh">  }).</span><span class="__shiki_1t8gfj">explain</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;executionStats&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> end</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">  print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`查询耗时: \${</span><span class="__shiki_140thh">end</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> start</span><span class="__shiki_mdbnqw">}ms\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">  print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`返回文档数: \${</span><span class="__shiki_140thh">results</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">executionStats</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">nReturned</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">  print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`扫描文档数: \${</span><span class="__shiki_140thh">results</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">executionStats</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">totalDocsExamined</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_9-3-学习资源" tabindex="-1">9.3 学习资源 <a class="header-anchor" href="#_9-3-学习资源" aria-label="Permalink to &quot;9.3 学习资源&quot;">​</a></h3><ol><li><strong>官方文档</strong>：MongoDB University免费课程</li><li><strong>设计模式</strong>：MongoDB Design Patterns书籍</li><li><strong>社区资源</strong>：MongoDB官方博客和论坛</li><li><strong>性能优化</strong>：MongoDB Performance Best Practices</li></ol><hr><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>MongoDB数据建模是一门平衡艺术，需要在以下维度找到最佳平衡点：</p><ol><li><strong>嵌入 vs 引用</strong>：基于数据关系、访问模式和增长预期</li><li><strong>规范化 vs 反规范化</strong>：基于读写比例和一致性要求</li><li><strong>灵活 vs 严格</strong>：基于应用变化频率和开发速度需求</li><li><strong>存储效率 vs 查询性能</strong>：基于数据量和访问频率</li></ol><p>成功的MongoDB数据建模始终始于对业务需求的深入理解，终于对实际性能的持续监控和优化。记住，没有&quot;一刀切&quot;的最佳实践，只有针对特定应用场景的最合适设计。</p><p><strong>最终建议</strong>：从小规模原型开始，基于实际使用模式逐步优化，始终让性能监控数据指导你的建模决策。</p>`,129)])])}const r=a(p,[["render",h]]);export{d as __pageData,r as default};
