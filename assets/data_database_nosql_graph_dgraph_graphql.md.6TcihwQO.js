import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"NoSQL数据库 - 图数据库Dgraph - GraphQL+-查询语言详细学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/nosql/graph/dgraph/graphql.md","filePath":"data/database/nosql/graph/dgraph/graphql.md"}'),p={name:"data/database/nosql/graph/dgraph/graphql.md"};function h(l,s,c,t,e,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="nosql数据库-图数据库dgraph-graphql-查询语言详细学习笔记" tabindex="-1">NoSQL数据库 - 图数据库Dgraph - GraphQL+-查询语言详细学习笔记 <a class="header-anchor" href="#nosql数据库-图数据库dgraph-graphql-查询语言详细学习笔记" aria-label="Permalink to &quot;NoSQL数据库 - 图数据库Dgraph - GraphQL+-查询语言详细学习笔记&quot;">​</a></h1><h2 id="一、图数据库与dgraph概述" tabindex="-1">一、图数据库与Dgraph概述 <a class="header-anchor" href="#一、图数据库与dgraph概述" aria-label="Permalink to &quot;一、图数据库与Dgraph概述&quot;">​</a></h2><h3 id="_1-1-图数据库基本概念" tabindex="-1">1.1 图数据库基本概念 <a class="header-anchor" href="#_1-1-图数据库基本概念" aria-label="Permalink to &quot;1.1 图数据库基本概念&quot;">​</a></h3><ul><li><strong>图数据库</strong>：以图论为基础，使用节点、边和属性来表示和存储数据</li><li><strong>核心组成</strong>： <ul><li>节点/顶点(Vertex/Node)：实体对象</li><li>边(Edge/Relationship)：实体间的关系</li><li>属性(Property)：节点或边的属性</li></ul></li></ul><h3 id="_1-2-dgraph简介" tabindex="-1">1.2 Dgraph简介 <a class="header-anchor" href="#_1-2-dgraph简介" aria-label="Permalink to &quot;1.2 Dgraph简介&quot;">​</a></h3><ul><li><strong>Dgraph</strong>：原生的分布式图数据库，采用Go语言开发</li><li><strong>核心特性</strong>： <ul><li>水平可扩展性：通过分片实现数据分布</li><li>强一致性：基于Raft协议保证数据一致性</li><li>实时查询：低延迟的图遍历查询</li><li>ACID事务：支持事务操作</li></ul></li></ul><h3 id="_1-3-graphql-定位" tabindex="-1">1.3 GraphQL+-定位 <a class="header-anchor" href="#_1-3-graphql-定位" aria-label="Permalink to &quot;1.3 GraphQL+-定位&quot;">​</a></h3><ul><li>GraphQL+是Dgraph自定义的查询语言，基于GraphQL语法扩展</li><li>专门为图数据库查询优化设计</li><li>注意：Dgraph从v21.0开始已转向标准GraphQL，但理解GraphQL+-有助于理解底层原理</li></ul><h2 id="二、graphql-基础语法结构" tabindex="-1">二、GraphQL+-基础语法结构 <a class="header-anchor" href="#二、graphql-基础语法结构" aria-label="Permalink to &quot;二、GraphQL+-基础语法结构&quot;">​</a></h2><h3 id="_2-1-查询基本结构" tabindex="-1">2.1 查询基本结构 <a class="header-anchor" href="#_2-1-查询基本结构" aria-label="Permalink to &quot;2.1 查询基本结构&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1jdh33">  query_name</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">: ...) </span><span class="__shiki_1t8gfj">@filter</span><span class="__shiki_140thh">(...) </span><span class="__shiki_1t8gfj">@cascade</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">    uid</span></span>
<span class="line"><span class="__shiki_1jdh33">    predicate</span></span>
<span class="line"><span class="__shiki_1jdh33">    predicate</span><span class="__shiki_1t8gfj"> @filter</span><span class="__shiki_140thh">(...)</span></span>
<span class="line"><span class="__shiki_140thh">    ~</span><span class="__shiki_1jdh33">predicate</span></span>
<span class="line"><span class="__shiki_1jdh33">    predicate</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">      nested_predicate</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-2-查询组成要素" tabindex="-1">2.2 查询组成要素 <a class="header-anchor" href="#_2-2-查询组成要素" aria-label="Permalink to &quot;2.2 查询组成要素&quot;">​</a></h3><h4 id="_2-2-1-查询块-query-block" tabindex="-1">2.2.1 查询块(Query Block) <a class="header-anchor" href="#_2-2-1-查询块-query-block" aria-label="Permalink to &quot;2.2.1 查询块(Query Block)&quot;">​</a></h4><ul><li>每个查询由多个查询块组成</li><li>每个查询块包含： <ul><li>根函数(func)：定义起始查询点</li><li>过滤器(@filter)：筛选条件</li><li>选择集(Selection Set)：要返回的字段</li></ul></li></ul><h4 id="_2-2-2-谓词-predicate" tabindex="-1">2.2.2 谓词(Predicate) <a class="header-anchor" href="#_2-2-2-谓词-predicate" aria-label="Permalink to &quot;2.2.2 谓词(Predicate)&quot;">​</a></h4><ul><li>表示节点属性或关系</li><li>三种类型： <ul><li>标量谓词：存储简单值(string, int, float, bool, datetime, geo)</li><li>实体谓词：指向其他节点(建立关系)</li><li>列表谓词：值数组</li></ul></li></ul><h2 id="三、查询函数-func-详解" tabindex="-1">三、查询函数(func)详解 <a class="header-anchor" href="#三、查询函数-func-详解" aria-label="Permalink to &quot;三、查询函数(func)详解&quot;">​</a></h2><h3 id="_3-1-基础函数" tabindex="-1">3.1 基础函数 <a class="header-anchor" href="#_3-1-基础函数" aria-label="Permalink to &quot;3.1 基础函数&quot;">​</a></h3><h4 id="_3-1-1-uid-按节点id查询" tabindex="-1">3.1.1 uid() - 按节点ID查询 <a class="header-anchor" href="#_3-1-1-uid-按节点id查询" aria-label="Permalink to &quot;3.1.1 uid() - 按节点ID查询&quot;">​</a></h4><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 查询特定UID的节点</span></span>
<span class="line"><span class="__shiki_1jdh33">  user</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> uid</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0x1</span><span class="__shiki_140thh">, 0x2)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    uid</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    age</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 在嵌套查询中使用uid</span></span>
<span class="line"><span class="__shiki_1jdh33">  post</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> eq</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">title</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">&quot;GraphQL Guide&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    author</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">      friends</span><span class="__shiki_1t8gfj"> @filter</span><span class="__shiki_140thh">(uid(0x5, 0x6)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">        name</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-1-2-eq-等于" tabindex="-1">3.1.2 eq() - 等于 <a class="header-anchor" href="#_3-1-2-eq-等于" aria-label="Permalink to &quot;3.1.2 eq() - 等于&quot;">​</a></h4><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 字符串匹配</span></span>
<span class="line"><span class="__shiki_1jdh33">  users</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> eq</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">&quot;Alice&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    uid</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    email</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 数值匹配</span></span>
<span class="line"><span class="__shiki_1jdh33">  products</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> eq</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">price</span><span class="__shiki_140thh">, 99.99)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    price</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 布尔匹配</span></span>
<span class="line"><span class="__shiki_1jdh33">  active_users</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> eq</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">active</span><span class="__shiki_140thh">, true)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-1-3-比较函数" tabindex="-1">3.1.3 比较函数 <a class="header-anchor" href="#_3-1-3-比较函数" aria-label="Permalink to &quot;3.1.3 比较函数&quot;">​</a></h4><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 大于</span></span>
<span class="line"><span class="__shiki_1jdh33">  gt_query</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> gt</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">age</span><span class="__shiki_140thh">, 18)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    age</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 小于等于</span></span>
<span class="line"><span class="__shiki_1jdh33">  le_query</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> le</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">rating</span><span class="__shiki_140thh">, 4.0)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    title</span></span>
<span class="line"><span class="__shiki_1jdh33">    rating</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 范围查询</span></span>
<span class="line"><span class="__shiki_1jdh33">  range_query</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> ge</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">age</span><span class="__shiki_140thh">, 18) </span><span class="__shiki_1t8gfj">@filter</span><span class="__shiki_140thh">(le(age, 30))) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    age</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-1-4-字符串匹配函数" tabindex="-1">3.1.4 字符串匹配函数 <a class="header-anchor" href="#_3-1-4-字符串匹配函数" aria-label="Permalink to &quot;3.1.4 字符串匹配函数&quot;">​</a></h4><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 正则匹配</span></span>
<span class="line"><span class="__shiki_1jdh33">  regex_query</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> regexp</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_140thh">, /^Ali.*/)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 全文本搜索(需要配置分词器)</span></span>
<span class="line"><span class="__shiki_1jdh33">  alloftext_query</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> alloftext</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">description</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">&quot;graph database&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    title</span></span>
<span class="line"><span class="__shiki_1jdh33">    description</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 任意词匹配</span></span>
<span class="line"><span class="__shiki_1jdh33">  anyoftext_query</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> anyoftext</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">tags</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">&quot;nosql graph&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    title</span></span>
<span class="line"><span class="__shiki_1jdh33">    tags</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-地理空间函数" tabindex="-1">3.2 地理空间函数 <a class="header-anchor" href="#_3-2-地理空间函数" aria-label="Permalink to &quot;3.2 地理空间函数&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 附近查询</span></span>
<span class="line"><span class="__shiki_1jdh33">  nearby_places</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> near</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">location</span><span class="__shiki_140thh">, [-122.423246, 37.779388], 1000)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    address</span></span>
<span class="line"><span class="__shiki_1jdh33">    location</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 在多边形内</span></span>
<span class="line"><span class="__shiki_1jdh33">  within_area</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> within</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">location</span><span class="__shiki_140thh">, [[-122.1, 37.1], </span></span>
<span class="line"><span class="__shiki_140thh">                                       [-122.2, 37.1],</span></span>
<span class="line"><span class="__shiki_140thh">                                       [-122.2, 37.2],</span></span>
<span class="line"><span class="__shiki_140thh">                                       [-122.1, 37.2]])) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    location</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 包含点</span></span>
<span class="line"><span class="__shiki_1jdh33">  containing</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> contains</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">location</span><span class="__shiki_140thh">, [-122.3, 37.5])) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    boundary</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-3-连接函数" tabindex="-1">3.3 连接函数 <a class="header-anchor" href="#_3-3-连接函数" aria-label="Permalink to &quot;3.3 连接函数&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">  # AND连接</span></span>
<span class="line"><span class="__shiki_1jdh33">  and_query</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> eq</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">type</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">&quot;User&quot;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1t8gfj">@filter</span><span class="__shiki_140thh">(gt(age, 18) </span><span class="__shiki_1jdh33">AND</span><span class="__shiki_1jdh33"> lt</span><span class="__shiki_140thh">(age, 30)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    age</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # OR连接</span></span>
<span class="line"><span class="__shiki_1jdh33">  or_query</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> anyofterms</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">&quot;Alice Bob&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    uid</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # NOT排除</span></span>
<span class="line"><span class="__shiki_1jdh33">  not_query</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> has</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_140thh">)) </span><span class="__shiki_1t8gfj">@filter</span><span class="__shiki_140thh">(NOT eq(status, </span><span class="__shiki_21nrsd">&quot;inactive&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    status</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="四、过滤器-filter-高级用法" tabindex="-1">四、过滤器(@filter)高级用法 <a class="header-anchor" href="#四、过滤器-filter-高级用法" aria-label="Permalink to &quot;四、过滤器(@filter)高级用法&quot;">​</a></h2><h3 id="_4-1-基础过滤" tabindex="-1">4.1 基础过滤 <a class="header-anchor" href="#_4-1-基础过滤" aria-label="Permalink to &quot;4.1 基础过滤&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1jdh33">  users</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> has</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    uid</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    age</span></span>
<span class="line"><span class="__shiki_1jdh33">    posts</span><span class="__shiki_1t8gfj"> @filter</span><span class="__shiki_140thh">(gt(views, 1000)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">      title</span></span>
<span class="line"><span class="__shiki_1jdh33">      views</span></span>
<span class="line"><span class="__shiki_1jdh33">      tags</span><span class="__shiki_1t8gfj"> @filter</span><span class="__shiki_140thh">(anyofterms(tags, </span><span class="__shiki_21nrsd">&quot;tutorial guide&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">        name</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-多条件过滤" tabindex="-1">4.2 多条件过滤 <a class="header-anchor" href="#_4-2-多条件过滤" aria-label="Permalink to &quot;4.2 多条件过滤&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1jdh33">  complex_filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> type</span><span class="__shiki_140thh">(</span><span class="__shiki_21nrsd">&quot;Product&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    uid</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    price</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 组合过滤条件</span></span>
<span class="line"><span class="__shiki_1jdh33">    reviews</span><span class="__shiki_1t8gfj"> @filter</span><span class="__shiki_140thh">(ge(rating, 4) </span><span class="__shiki_1jdh33">AND</span><span class="__shiki_1jdh33"> has</span><span class="__shiki_140thh">(comment) </span><span class="__shiki_1jdh33">AND</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1jdh33">                   eq</span><span class="__shiki_140thh">(verified, true) </span><span class="__shiki_1jdh33">AND</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1jdh33">                   gt</span><span class="__shiki_140thh">(date, </span><span class="__shiki_21nrsd">&quot;2023-01-01&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">      rating</span></span>
<span class="line"><span class="__shiki_1jdh33">      comment</span></span>
<span class="line"><span class="__shiki_1jdh33">      date</span></span>
<span class="line"><span class="__shiki_1jdh33">      reviewer</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">        name</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-3-变量在过滤器中" tabindex="-1">4.3 变量在过滤器中 <a class="header-anchor" href="#_4-3-变量在过滤器中" aria-label="Permalink to &quot;4.3 变量在过滤器中&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">query</span><span class="__shiki_1t8gfj"> search</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">$minRating</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh"> = </span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">$minViews</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh"> = </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1jdh33">  posts</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> has</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">title</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    uid</span></span>
<span class="line"><span class="__shiki_1jdh33">    title</span></span>
<span class="line"><span class="__shiki_1jdh33">    content</span><span class="__shiki_1t8gfj"> @filter</span><span class="__shiki_140thh">(ge(rating, $minRating) </span><span class="__shiki_1jdh33">AND</span><span class="__shiki_1jdh33"> gt</span><span class="__shiki_140thh">(views, $minViews)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">      text</span></span>
<span class="line"><span class="__shiki_1jdh33">      rating</span></span>
<span class="line"><span class="__shiki_1jdh33">      views</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="五、查询操作符与模式" tabindex="-1">五、查询操作符与模式 <a class="header-anchor" href="#五、查询操作符与模式" aria-label="Permalink to &quot;五、查询操作符与模式&quot;">​</a></h2><h3 id="_5-1-关系遍历" tabindex="-1">5.1 关系遍历 <a class="header-anchor" href="#_5-1-关系遍历" aria-label="Permalink to &quot;5.1 关系遍历&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 正向遍历</span></span>
<span class="line"><span class="__shiki_1jdh33">  user_posts</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> uid</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0x1</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    posts</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">      title</span></span>
<span class="line"><span class="__shiki_1jdh33">      comments</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">        text</span></span>
<span class="line"><span class="__shiki_1jdh33">        author</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">          name</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 反向遍历(使用~)</span></span>
<span class="line"><span class="__shiki_1jdh33">  post_authors</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> uid</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0x2</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    title</span></span>
<span class="line"><span class="__shiki_140thh">    ~</span><span class="__shiki_1jdh33">posts</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">      name</span></span>
<span class="line"><span class="__shiki_140thh">      ~</span><span class="__shiki_1jdh33">friends</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">        name</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 双向遍历</span></span>
<span class="line"><span class="__shiki_1jdh33">  mutual</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> uid</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0x3</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    friends</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">      name</span></span>
<span class="line"><span class="__shiki_140thh">      ~</span><span class="__shiki_1jdh33">friends</span><span class="__shiki_1t8gfj"> @filter</span><span class="__shiki_140thh">(uid(0x3)) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 相互关注的朋友</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-分页与排序" tabindex="-1">5.2 分页与排序 <a class="header-anchor" href="#_5-2-分页与排序" aria-label="Permalink to &quot;5.2 分页与排序&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 基本分页</span></span>
<span class="line"><span class="__shiki_1jdh33">  paginated</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> type</span><span class="__shiki_140thh">(</span><span class="__shiki_21nrsd">&quot;User&quot;</span><span class="__shiki_140thh">), </span><span class="__shiki_mdbnqw">first</span><span class="__shiki_140thh">: 10, </span><span class="__shiki_mdbnqw">offset</span><span class="__shiki_140thh">: 20) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    uid</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 排序后分页</span></span>
<span class="line"><span class="__shiki_1jdh33">  sorted_posts</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> type</span><span class="__shiki_140thh">(</span><span class="__shiki_21nrsd">&quot;Post&quot;</span><span class="__shiki_140thh">), </span><span class="__shiki_mdbnqw">orderdesc</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">views</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">first</span><span class="__shiki_140thh">: 5) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    title</span></span>
<span class="line"><span class="__shiki_1jdh33">    views</span></span>
<span class="line"><span class="__shiki_1jdh33">    date</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 多级排序</span></span>
<span class="line"><span class="__shiki_1jdh33">  multi_sorted</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> type</span><span class="__shiki_140thh">(</span><span class="__shiki_21nrsd">&quot;Product&quot;</span><span class="__shiki_140thh">), </span><span class="__shiki_mdbnqw">orderasc</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">category</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">orderdesc</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">price</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    category</span></span>
<span class="line"><span class="__shiki_1jdh33">    price</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 嵌套查询中的分页</span></span>
<span class="line"><span class="__shiki_1jdh33">  user_with_posts</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> uid</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0x1</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    posts</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">orderasc</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> date</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">first</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">offset</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1jdh33">      title</span></span>
<span class="line"><span class="__shiki_1jdh33">      date</span></span>
<span class="line"><span class="__shiki_1jdh33">      comments</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">first</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">orderdesc</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> likes</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1jdh33">        text</span></span>
<span class="line"><span class="__shiki_1jdh33">        likes</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-3-聚合函数" tabindex="-1">5.3 聚合函数 <a class="header-anchor" href="#_5-3-聚合函数" aria-label="Permalink to &quot;5.3 聚合函数&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 计数</span></span>
<span class="line"><span class="__shiki_1jdh33">  user_count</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> type</span><span class="__shiki_140thh">(</span><span class="__shiki_21nrsd">&quot;User&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    count</span><span class="__shiki_140thh">(uid)</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 分组统计</span></span>
<span class="line"><span class="__shiki_1jdh33">  category_stats</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> type</span><span class="__shiki_140thh">(</span><span class="__shiki_21nrsd">&quot;Product&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    category</span></span>
<span class="line"><span class="__shiki_mdbnqw">    total_products</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">count</span><span class="__shiki_140thh">(uid)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    avg_price</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">avg</span><span class="__shiki_140thh">(price)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    max_price</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">max</span><span class="__shiki_140thh">(price)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    min_price</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">min</span><span class="__shiki_140thh">(price)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    sum_value</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">sum</span><span class="__shiki_140thh">(value)</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 嵌套聚合</span></span>
<span class="line"><span class="__shiki_1jdh33">  user_activity</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> type</span><span class="__shiki_140thh">(</span><span class="__shiki_21nrsd">&quot;User&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_mdbnqw">    post_count</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">count</span><span class="__shiki_140thh">(posts)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    total_likes</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">sum</span><span class="__shiki_140thh">(posts.likes)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    avg_post_rating</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">avg</span><span class="__shiki_140thh">(posts.rating)</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="六、变量与参数化查询" tabindex="-1">六、变量与参数化查询 <a class="header-anchor" href="#六、变量与参数化查询" aria-label="Permalink to &quot;六、变量与参数化查询&quot;">​</a></h2><h3 id="_6-1-查询变量" tabindex="-1">6.1 查询变量 <a class="header-anchor" href="#_6-1-查询变量" aria-label="Permalink to &quot;6.1 查询变量&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 定义查询变量</span></span>
<span class="line"><span class="__shiki_1itgoe">query</span><span class="__shiki_1t8gfj"> getUser</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">$userId</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">$minAge</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1jdh33">  user_info</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> uid</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">$userId</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    uid</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    age</span><span class="__shiki_1t8gfj"> @filter</span><span class="__shiki_140thh">(ge(age, $minAge))</span></span>
<span class="line"><span class="__shiki_1jdh33">    email</span></span>
<span class="line"><span class="__shiki_1jdh33">    friends</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      mutual_friends</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">count</span><span class="__shiki_140thh">(friends @filter(uid($userId)))</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 变量赋值</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">  &quot;userId&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_21nrsd">&quot;0x1&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">  &quot;minAge&quot;</span><span class="__shiki_140thh">: 18</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-参数化函数" tabindex="-1">6.2 参数化函数 <a class="header-anchor" href="#_6-2-参数化函数" aria-label="Permalink to &quot;6.2 参数化函数&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">query</span><span class="__shiki_1t8gfj"> search</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">$searchTerm</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">$location</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">float</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">], </span><span class="__shiki_1jdh33">$radius</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 全文搜索参数化</span></span>
<span class="line"><span class="__shiki_1jdh33">  text_results</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> anyoftext</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">content</span><span class="__shiki_140thh">, $searchTerm)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    title</span></span>
<span class="line"><span class="__shiki_1jdh33">    score</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 地理位置参数化</span></span>
<span class="line"><span class="__shiki_1jdh33">  location_results</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> near</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">coordinates</span><span class="__shiki_140thh">, $location, $radius)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    address</span></span>
<span class="line"><span class="__shiki_mdbnqw">    distance</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">math</span><span class="__shiki_140thh">(sqrt(</span></span>
<span class="line"><span class="__shiki_140thh">      pow(coordinates[0] - $location[0], 2) + </span></span>
<span class="line"><span class="__shiki_1jdh33">      pow</span><span class="__shiki_140thh">(coordinates[1] - $location[1], 2)</span></span>
<span class="line"><span class="__shiki_140thh">    ))</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="七、高级查询模式" tabindex="-1">七、高级查询模式 <a class="header-anchor" href="#七、高级查询模式" aria-label="Permalink to &quot;七、高级查询模式&quot;">​</a></h2><h3 id="_7-1-递归查询" tabindex="-1">7.1 递归查询 <a class="header-anchor" href="#_7-1-递归查询" aria-label="Permalink to &quot;7.1 递归查询&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 查询组织层级(有限递归)</span></span>
<span class="line"><span class="__shiki_1jdh33">  org_hierarchy</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> uid</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0x1</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    uid</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    department</span></span>
<span class="line"><span class="__shiki_1jdh33">    manages</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">first</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">@recurse</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">depth</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1jdh33">      uid</span></span>
<span class="line"><span class="__shiki_1jdh33">      name</span></span>
<span class="line"><span class="__shiki_1jdh33">      department</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 查找所有下属</span></span>
<span class="line"><span class="__shiki_1jdh33">  all_subordinates</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> uid</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0x2</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    title</span></span>
<span class="line"><span class="__shiki_1jdh33">    subordinates</span><span class="__shiki_1t8gfj"> @recurse</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">      name</span></span>
<span class="line"><span class="__shiki_1jdh33">      title</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-路径查询" tabindex="-1">7.2 路径查询 <a class="header-anchor" href="#_7-2-路径查询" aria-label="Permalink to &quot;7.2 路径查询&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 查找连接路径</span></span>
<span class="line"><span class="__shiki_1jdh33">  path_finder</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> uid</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0x1</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    uid</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_mdbnqw">    path</span><span class="__shiki_140thh">: ~</span><span class="__shiki_1jdh33">knows</span><span class="__shiki_1t8gfj"> @filter</span><span class="__shiki_140thh">(uid(0x2)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">      uid</span></span>
<span class="line"><span class="__shiki_1jdh33">      name</span></span>
<span class="line"><span class="__shiki_1jdh33">      knows</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">        uid</span></span>
<span class="line"><span class="__shiki_1jdh33">        name</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 最短路径(需要特殊处理)</span></span>
<span class="line"><span class="__shiki_1jdh33">  shortest_path</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> uid</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0xA</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    as</span><span class="__shiki_140thh">(start)</span></span>
<span class="line"><span class="__shiki_1jdh33">    knows</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">      as</span><span class="__shiki_140thh">(mid)</span></span>
<span class="line"><span class="__shiki_1jdh33">      knows</span><span class="__shiki_1t8gfj"> @filter</span><span class="__shiki_140thh">(uid(0xB)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">        as</span><span class="__shiki_140thh">(end)</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_mdbnqw">  path</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">shortest</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">from</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> start</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">to</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> end</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    path</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-3-别名和计算字段" tabindex="-1">7.3 别名和计算字段 <a class="header-anchor" href="#_7-3-别名和计算字段" aria-label="Permalink to &quot;7.3 别名和计算字段&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1jdh33">  user_stats</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> type</span><span class="__shiki_140thh">(</span><span class="__shiki_21nrsd">&quot;User&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    user_id</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">uid</span></span>
<span class="line"><span class="__shiki_mdbnqw">    full_name</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">name</span></span>
<span class="line"><span class="__shiki_mdbnqw">    years_since_join</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">math</span><span class="__shiki_140thh">(since(join_date) / 31536000)</span><span class="__shiki_21nrsd">  # 转换为年</span></span>
<span class="line"><span class="__shiki_mdbnqw">    age_group</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">math</span><span class="__shiki_140thh">(floor(age / 10) * 10)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1jdh33">    posts</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      post_count</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">count</span><span class="__shiki_140thh">(uid)</span></span>
<span class="line"><span class="__shiki_mdbnqw">      avg_reading_time</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">math</span><span class="__shiki_140thh">(avg(reading_time))</span></span>
<span class="line"><span class="__shiki_mdbnqw">      popularity_score</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">math</span><span class="__shiki_140thh">((likes * 0.7 + shares * 0.3))</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="八、数据修改操作" tabindex="-1">八、数据修改操作 <a class="header-anchor" href="#八、数据修改操作" aria-label="Permalink to &quot;八、数据修改操作&quot;">​</a></h2><h3 id="_8-1-插入数据" tabindex="-1">8.1 插入数据 <a class="header-anchor" href="#_8-1-插入数据" aria-label="Permalink to &quot;8.1 插入数据&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 插入节点</span></span>
<span class="line"><span class="__shiki_1itgoe">mutation</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  set</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 创建用户</span></span>
<span class="line"><span class="__shiki_mdbnqw">    _</span><span class="__shiki_140thh">:</span><span class="__shiki_1jdh33">user1</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_21nrsd">&quot;Alice&quot;</span><span class="__shiki_140thh"> .</span></span>
<span class="line"><span class="__shiki_mdbnqw">    _</span><span class="__shiki_140thh">:</span><span class="__shiki_1jdh33">user1</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_1jdh33">age</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_21nrsd">&quot;28&quot;</span><span class="__shiki_140thh">^^&lt;</span><span class="__shiki_mdbnqw">xs</span><span class="__shiki_140thh">:</span><span class="__shiki_1jdh33">int</span><span class="__shiki_140thh">&gt; .</span></span>
<span class="line"><span class="__shiki_mdbnqw">    _</span><span class="__shiki_140thh">:</span><span class="__shiki_1jdh33">user1</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_1jdh33">email</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_21nrsd">&quot;alice@example.com&quot;</span><span class="__shiki_140thh"> .</span></span>
<span class="line"><span class="__shiki_mdbnqw">    _</span><span class="__shiki_140thh">:</span><span class="__shiki_1jdh33">user1</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_1jdh33">type</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_21nrsd">&quot;User&quot;</span><span class="__shiki_140thh"> .</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 创建帖子</span></span>
<span class="line"><span class="__shiki_mdbnqw">    _</span><span class="__shiki_140thh">:</span><span class="__shiki_1jdh33">post1</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_1jdh33">title</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_21nrsd">&quot;GraphQL Guide&quot;</span><span class="__shiki_140thh"> .</span></span>
<span class="line"><span class="__shiki_mdbnqw">    _</span><span class="__shiki_140thh">:</span><span class="__shiki_1jdh33">post1</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_1jdh33">content</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_21nrsd">&quot;A comprehensive guide...&quot;</span><span class="__shiki_140thh"> .</span></span>
<span class="line"><span class="__shiki_mdbnqw">    _</span><span class="__shiki_140thh">:</span><span class="__shiki_1jdh33">post1</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_1jdh33">views</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_21nrsd">&quot;1500&quot;</span><span class="__shiki_140thh">^^&lt;</span><span class="__shiki_mdbnqw">xs</span><span class="__shiki_140thh">:</span><span class="__shiki_1jdh33">int</span><span class="__shiki_140thh">&gt; .</span></span>
<span class="line"><span class="__shiki_mdbnqw">    _</span><span class="__shiki_140thh">:</span><span class="__shiki_1jdh33">post1</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_1jdh33">type</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_21nrsd">&quot;Post&quot;</span><span class="__shiki_140thh"> .</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 建立关系</span></span>
<span class="line"><span class="__shiki_mdbnqw">    _</span><span class="__shiki_140thh">:</span><span class="__shiki_1jdh33">user1</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_1jdh33">posts</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_mdbnqw">_</span><span class="__shiki_140thh">:</span><span class="__shiki_1jdh33">post1</span><span class="__shiki_140thh"> .</span></span>
<span class="line"><span class="__shiki_mdbnqw">    _</span><span class="__shiki_140thh">:</span><span class="__shiki_1jdh33">post1</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_1jdh33">author</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_mdbnqw">_</span><span class="__shiki_140thh">:</span><span class="__shiki_1jdh33">user1</span><span class="__shiki_140thh"> .</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-2-更新数据" tabindex="-1">8.2 更新数据 <a class="header-anchor" href="#_8-2-更新数据" aria-label="Permalink to &quot;8.2 更新数据&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">mutation</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 更新属性</span></span>
<span class="line"><span class="__shiki_1jdh33">  set</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;0</span><span class="__shiki_1jdh33">x1</span><span class="__shiki_140thh">&gt; &lt;</span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_21nrsd">&quot;Alice Updated&quot;</span><span class="__shiki_140thh"> .</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;0</span><span class="__shiki_1jdh33">x1</span><span class="__shiki_140thh">&gt; &lt;</span><span class="__shiki_1jdh33">age</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_21nrsd">&quot;29&quot;</span><span class="__shiki_140thh">^^&lt;</span><span class="__shiki_mdbnqw">xs</span><span class="__shiki_140thh">:</span><span class="__shiki_1jdh33">int</span><span class="__shiki_140thh">&gt; .</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 添加新关系</span></span>
<span class="line"><span class="__shiki_1jdh33">  set</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;0</span><span class="__shiki_1jdh33">x1</span><span class="__shiki_140thh">&gt; &lt;</span><span class="__shiki_1jdh33">friends</span><span class="__shiki_140thh">&gt; &lt;0</span><span class="__shiki_1jdh33">x2</span><span class="__shiki_140thh">&gt; .</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;0</span><span class="__shiki_1jdh33">x1</span><span class="__shiki_140thh">&gt; &lt;</span><span class="__shiki_1jdh33">friends</span><span class="__shiki_140thh">&gt; &lt;0</span><span class="__shiki_1jdh33">x3</span><span class="__shiki_140thh">&gt; .</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 删除特定属性</span></span>
<span class="line"><span class="__shiki_1jdh33">  delete</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;0</span><span class="__shiki_1jdh33">x1</span><span class="__shiki_140thh">&gt; &lt;</span><span class="__shiki_1jdh33">old_email</span><span class="__shiki_140thh">&gt; * .</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-3-删除操作" tabindex="-1">8.3 删除操作 <a class="header-anchor" href="#_8-3-删除操作" aria-label="Permalink to &quot;8.3 删除操作&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">mutation</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 删除整个节点</span></span>
<span class="line"><span class="__shiki_1jdh33">  delete</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;0</span><span class="__shiki_1jdh33">x5</span><span class="__shiki_140thh">&gt; * * .</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 删除特定谓词</span></span>
<span class="line"><span class="__shiki_1jdh33">  delete</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;0</span><span class="__shiki_1jdh33">x1</span><span class="__shiki_140thh">&gt; &lt;</span><span class="__shiki_1jdh33">temporary_data</span><span class="__shiki_140thh">&gt; * .</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 删除特定值</span></span>
<span class="line"><span class="__shiki_1jdh33">  delete</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;0</span><span class="__shiki_1jdh33">x1</span><span class="__shiki_140thh">&gt; &lt;</span><span class="__shiki_1jdh33">friends</span><span class="__shiki_140thh">&gt; &lt;0</span><span class="__shiki_1jdh33">x2</span><span class="__shiki_140thh">&gt; .</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-4-条件更新" tabindex="-1">8.4 条件更新 <a class="header-anchor" href="#_8-4-条件更新" aria-label="Permalink to &quot;8.4 条件更新&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">mutation</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 使用upsert进行条件插入/更新</span></span>
<span class="line"><span class="__shiki_1jdh33">  upsert</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">    query</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">      user</span><span class="__shiki_1jdh33"> as</span><span class="__shiki_1jdh33"> var</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> eq</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">email</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">&quot;alice@example.com&quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1jdh33">    mutation</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">      set</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">        uid</span><span class="__shiki_140thh">(user) &lt;</span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_21nrsd">&quot;Alice&quot;</span><span class="__shiki_140thh"> .</span></span>
<span class="line"><span class="__shiki_1jdh33">        uid</span><span class="__shiki_140thh">(user) &lt;</span><span class="__shiki_1jdh33">email</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_21nrsd">&quot;alice@example.com&quot;</span><span class="__shiki_140thh"> .</span></span>
<span class="line"><span class="__shiki_1jdh33">        uid</span><span class="__shiki_140thh">(user) &lt;</span><span class="__shiki_1jdh33">last_login</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_21nrsd">&quot;2024-01-15T10:30:00Z&quot;</span><span class="__shiki_140thh">^^&lt;</span><span class="__shiki_mdbnqw">xs</span><span class="__shiki_140thh">:</span><span class="__shiki_1jdh33">datetime</span><span class="__shiki_140thh">&gt; .</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="九、性能优化技巧" tabindex="-1">九、性能优化技巧 <a class="header-anchor" href="#九、性能优化技巧" aria-label="Permalink to &quot;九、性能优化技巧&quot;">​</a></h2><h3 id="_9-1-索引策略" tabindex="-1">9.1 索引策略 <a class="header-anchor" href="#_9-1-索引策略" aria-label="Permalink to &quot;9.1 索引策略&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Schema定义索引</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> User</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">string</span><span class="__shiki_1t8gfj"> @index</span><span class="__shiki_140thh">(exact, hash) .</span></span>
<span class="line"><span class="__shiki_1jdh33">  email</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">string</span><span class="__shiki_1t8gfj"> @index</span><span class="__shiki_140thh">(exact) </span><span class="__shiki_1t8gfj">@upsert</span><span class="__shiki_140thh"> .</span></span>
<span class="line"><span class="__shiki_1jdh33">  age</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_1t8gfj"> @index</span><span class="__shiki_140thh">(int) .</span></span>
<span class="line"><span class="__shiki_1jdh33">  location</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">geo</span><span class="__shiki_1t8gfj"> @index</span><span class="__shiki_140thh">(geo) .</span></span>
<span class="line"><span class="__shiki_1jdh33">  bio</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">string</span><span class="__shiki_1t8gfj"> @index</span><span class="__shiki_140thh">(fulltext) .</span></span>
<span class="line"><span class="__shiki_1jdh33">  created_at</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">datetime</span><span class="__shiki_1t8gfj"> @index</span><span class="__shiki_140thh">(year) .</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查询时使用索引</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 使用hash索引快速查找</span></span>
<span class="line"><span class="__shiki_1jdh33">  fast_lookup</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> eq</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">&quot;Alice&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    uid</span></span>
<span class="line"><span class="__shiki_1jdh33">    email</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 使用范围索引</span></span>
<span class="line"><span class="__shiki_1jdh33">  range_query</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> ge</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">age</span><span class="__shiki_140thh">, 18), </span><span class="__shiki_mdbnqw">first</span><span class="__shiki_140thh">: 100) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    age</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_9-2-查询优化" tabindex="-1">9.2 查询优化 <a class="header-anchor" href="#_9-2-查询优化" aria-label="Permalink to &quot;9.2 查询优化&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 1. 尽早过滤</span></span>
<span class="line"><span class="__shiki_1jdh33">  optimized_query</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> type</span><span class="__shiki_140thh">(</span><span class="__shiki_21nrsd">&quot;User&quot;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1t8gfj">@filter</span><span class="__shiki_140thh">(gt(age, 18) </span><span class="__shiki_1jdh33">AND</span><span class="__shiki_1jdh33"> eq</span><span class="__shiki_140thh">(status, </span><span class="__shiki_21nrsd">&quot;active&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    uid</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 而不是在嵌套查询中过滤</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 2. 限制返回字段</span></span>
<span class="line"><span class="__shiki_1jdh33">    posts</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">first</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1jdh33">      title</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 只返回必要字段</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 3. 使用分页避免大结果集</span></span>
<span class="line"><span class="__shiki_1jdh33">  large_dataset</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> has</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">post</span><span class="__shiki_140thh">), </span><span class="__shiki_mdbnqw">first</span><span class="__shiki_140thh">: 20, </span><span class="__shiki_mdbnqw">offset</span><span class="__shiki_140thh">: 0) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    uid</span></span>
<span class="line"><span class="__shiki_1jdh33">    title</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 4. 避免深度递归</span></span>
<span class="line"><span class="__shiki_1jdh33">  shallow_recursion</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> uid</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0x1</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    friends</span><span class="__shiki_1t8gfj"> @recurse</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">depth</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1jdh33">      name</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_9-3-批量操作" tabindex="-1">9.3 批量操作 <a class="header-anchor" href="#_9-3-批量操作" aria-label="Permalink to &quot;9.3 批量操作&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">mutation</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 批量插入</span></span>
<span class="line"><span class="__shiki_1jdh33">  set</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    _</span><span class="__shiki_140thh">:</span><span class="__shiki_1jdh33">u1</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_21nrsd">&quot;User1&quot;</span><span class="__shiki_140thh"> .</span></span>
<span class="line"><span class="__shiki_mdbnqw">    _</span><span class="__shiki_140thh">:</span><span class="__shiki_1jdh33">u1</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_1jdh33">type</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_21nrsd">&quot;User&quot;</span><span class="__shiki_140thh"> .</span></span>
<span class="line"><span class="__shiki_mdbnqw">    _</span><span class="__shiki_140thh">:</span><span class="__shiki_1jdh33">u2</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_21nrsd">&quot;User2&quot;</span><span class="__shiki_140thh"> .</span></span>
<span class="line"><span class="__shiki_mdbnqw">    _</span><span class="__shiki_140thh">:</span><span class="__shiki_1jdh33">u2</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_1jdh33">type</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_21nrsd">&quot;User&quot;</span><span class="__shiki_140thh"> .</span></span>
<span class="line"><span class="__shiki_mdbnqw">    _</span><span class="__shiki_140thh">:</span><span class="__shiki_1jdh33">u1</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_1jdh33">knows</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_mdbnqw">_</span><span class="__shiki_140thh">:</span><span class="__shiki_1jdh33">u2</span><span class="__shiki_140thh"> .</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 批量查询</span></span>
<span class="line"><span class="__shiki_1itgoe">query</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">  user1</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">get_user</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> uid</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0x1</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    ...</span><span class="__shiki_1jdh33">userFields</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_mdbnqw">  user2</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">get_user</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> uid</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0x2</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    ...</span><span class="__shiki_1jdh33">userFields</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">fragment</span><span class="__shiki_1t8gfj"> userFields</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_dzsirb"> User</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  uid</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span></span>
<span class="line"><span class="__shiki_1jdh33">  age</span></span>
<span class="line"><span class="__shiki_1jdh33">  friends</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="十、实际应用示例" tabindex="-1">十、实际应用示例 <a class="header-anchor" href="#十、实际应用示例" aria-label="Permalink to &quot;十、实际应用示例&quot;">​</a></h2><h3 id="_10-1-社交网络查询" tabindex="-1">10.1 社交网络查询 <a class="header-anchor" href="#_10-1-社交网络查询" aria-label="Permalink to &quot;10.1 社交网络查询&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">query</span><span class="__shiki_1t8gfj"> socialNetwork</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">$userId</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">$depth</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh"> = </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1jdh33">  user_profile</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> uid</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">$userId</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    uid</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    profile_picture</span></span>
<span class="line"><span class="__shiki_1jdh33">    bio</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 朋友的朋友（二度人脉）</span></span>
<span class="line"><span class="__shiki_1jdh33">    friends</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      mutual_friends</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">count</span><span class="__shiki_140thh">(friends @filter(uid($userId)))</span></span>
<span class="line"><span class="__shiki_1jdh33">      name</span></span>
<span class="line"><span class="__shiki_1jdh33">      friends</span><span class="__shiki_1t8gfj"> @filter</span><span class="__shiki_140thh">(NOT uid($userId)) </span><span class="__shiki_1t8gfj">@recurse</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">depth</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">$depth</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1jdh33">        name</span></span>
<span class="line"><span class="__shiki_mdbnqw">        common_interests</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">count</span><span class="__shiki_140thh">(interests @filter(uid(user_profile.interests)))</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 用户帖子按热度排序</span></span>
<span class="line"><span class="__shiki_1jdh33">    posts</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">orderdesc</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> created_at</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">first</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1jdh33">      title</span></span>
<span class="line"><span class="__shiki_1jdh33">      content</span></span>
<span class="line"><span class="__shiki_mdbnqw">      likes</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">count</span><span class="__shiki_140thh">(~likes)</span></span>
<span class="line"><span class="__shiki_1jdh33">      comments</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">first</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">orderdesc</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> created_at</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1jdh33">        text</span></span>
<span class="line"><span class="__shiki_1jdh33">        author</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">          name</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_mdbnqw">      shares</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">count</span><span class="__shiki_140thh">(~shared)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 推荐朋友（共同兴趣最多）</span></span>
<span class="line"><span class="__shiki_1jdh33">    friend_suggestions</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> type</span><span class="__shiki_140thh">(</span><span class="__shiki_21nrsd">&quot;User&quot;</span><span class="__shiki_140thh">)) </span></span>
<span class="line"><span class="__shiki_1t8gfj">      @filter</span><span class="__shiki_140thh">(NOT uid($userId) </span><span class="__shiki_1jdh33">AND</span><span class="__shiki_1jdh33"> NOT</span><span class="__shiki_1jdh33"> uid</span><span class="__shiki_140thh">(user_profile.friends)) </span></span>
<span class="line"><span class="__shiki_1t8gfj">      @normalize</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">      name</span></span>
<span class="line"><span class="__shiki_mdbnqw">      score</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">math</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        count(interests @filter(uid(user_profile.interests))) * 2 +</span></span>
<span class="line"><span class="__shiki_1jdh33">        count</span><span class="__shiki_140thh">(friends @filter(uid(user_profile.friends))) * 1</span></span>
<span class="line"><span class="__shiki_140thh">      )</span></span>
<span class="line"><span class="__shiki_140thh">    } (</span><span class="__shiki_1jdh33">orderdesc</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> score</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">first</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_10-2-推荐系统" tabindex="-1">10.2 推荐系统 <a class="header-anchor" href="#_10-2-推荐系统" aria-label="Permalink to &quot;10.2 推荐系统&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">query</span><span class="__shiki_1t8gfj"> recommendations</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">$userId</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">string</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1jdh33">  user_preferences</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> uid</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">$userId</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    uid</span></span>
<span class="line"><span class="__shiki_mdbnqw">    viewed_products</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">count</span><span class="__shiki_140thh">(~viewed)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    purchased_products</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">count</span><span class="__shiki_140thh">(~purchased)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 基于内容的推荐</span></span>
<span class="line"><span class="__shiki_mdbnqw">    content_based</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">product</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> type</span><span class="__shiki_140thh">(</span><span class="__shiki_21nrsd">&quot;Product&quot;</span><span class="__shiki_140thh">)) </span></span>
<span class="line"><span class="__shiki_1t8gfj">      @filter</span><span class="__shiki_140thh">(uid(categories) </span><span class="__shiki_1jdh33">AND</span><span class="__shiki_1jdh33"> uid</span><span class="__shiki_140thh">(user_preferences.preferred_categories)) </span></span>
<span class="line"><span class="__shiki_1t8gfj">      @normalize</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      product_id</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">uid</span></span>
<span class="line"><span class="__shiki_1jdh33">      name</span></span>
<span class="line"><span class="__shiki_1jdh33">      price</span></span>
<span class="line"><span class="__shiki_mdbnqw">      match_score</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">math</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        count(categories @filter(uid(user_preferences.preferred_categories))) * 10 +</span></span>
<span class="line"><span class="__shiki_140thh">        (avg(rating) * 2)</span></span>
<span class="line"><span class="__shiki_140thh">      )</span></span>
<span class="line"><span class="__shiki_140thh">    } (</span><span class="__shiki_1jdh33">orderdesc</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> match_score</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">first</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 协同过滤</span></span>
<span class="line"><span class="__shiki_1jdh33">    similar_users</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> type</span><span class="__shiki_140thh">(</span><span class="__shiki_21nrsd">&quot;User&quot;</span><span class="__shiki_140thh">)) </span></span>
<span class="line"><span class="__shiki_1t8gfj">      @filter</span><span class="__shiki_140thh">(gt(similarity, 0.7) </span><span class="__shiki_1jdh33">AND</span><span class="__shiki_1jdh33"> NOT</span><span class="__shiki_1jdh33"> uid</span><span class="__shiki_140thh">($userId)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">      uid</span></span>
<span class="line"><span class="__shiki_mdbnqw">      similarity</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">math</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        count(purchased @filter(uid(user_preferences.purchased))) /</span></span>
<span class="line"><span class="__shiki_1jdh33">        sqrt</span><span class="__shiki_140thh">(count(user_preferences.purchased) * </span><span class="__shiki_1jdh33">count</span><span class="__shiki_140thh">(purchased))</span></span>
<span class="line"><span class="__shiki_140thh">      )</span></span>
<span class="line"><span class="__shiki_1jdh33">      purchased_products</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        product_id</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">uid</span></span>
<span class="line"><span class="__shiki_1jdh33">        name</span></span>
<span class="line"><span class="__shiki_mdbnqw">        confidence</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">math</span><span class="__shiki_140thh">(similarity * rating)</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_10-3-欺诈检测" tabindex="-1">10.3 欺诈检测 <a class="header-anchor" href="#_10-3-欺诈检测" aria-label="Permalink to &quot;10.3 欺诈检测&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">query</span><span class="__shiki_1t8gfj"> detectFraud</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">$transactionId</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">string</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1jdh33">  suspicious_transactions</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> uid</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">$transactionId</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    uid</span></span>
<span class="line"><span class="__shiki_1jdh33">    amount</span></span>
<span class="line"><span class="__shiki_1jdh33">    timestamp</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 关联实体分析</span></span>
<span class="line"><span class="__shiki_1jdh33">    from_account</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">      uid</span></span>
<span class="line"><span class="__shiki_mdbnqw">      recent_transactions</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">count</span><span class="__shiki_140thh">(transactions </span></span>
<span class="line"><span class="__shiki_140thh">        @filter(gt(timestamp, </span><span class="__shiki_21nrsd">&quot;2024-01-01T00:00:00Z&quot;</span><span class="__shiki_140thh">))) </span></span>
<span class="line"><span class="__shiki_1t8gfj">        @filter</span><span class="__shiki_140thh">(gt(count, 50))</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 检查异常模式</span></span>
<span class="line"><span class="__shiki_mdbnqw">      unusual_patterns</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">math</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        variance(transactions.amount) &gt; 10000 ? 1 : 0</span></span>
<span class="line"><span class="__shiki_140thh">      )</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1jdh33">    to_account</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">      uid</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 检查新账户</span></span>
<span class="line"><span class="__shiki_mdbnqw">      account_age</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">math</span><span class="__shiki_140thh">(since(created_at) / 86400)</span></span>
<span class="line"><span class="__shiki_mdbnqw">      is_new</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">math</span><span class="__shiki_140thh">(account_age &lt; 7 ? 1 : 0)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 网络分析</span></span>
<span class="line"><span class="__shiki_1jdh33">    transaction_network</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> uid</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">$transactionId</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">      as</span><span class="__shiki_140thh">(start)</span></span>
<span class="line"><span class="__shiki_1jdh33">      from_account</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">        as</span><span class="__shiki_140thh">(account)</span></span>
<span class="line"><span class="__shiki_1jdh33">        transactions</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">          as</span><span class="__shiki_140thh">(tx)</span></span>
<span class="line"><span class="__shiki_1jdh33">          to_account</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">            as</span><span class="__shiki_140thh">(destination)</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 查找可疑环</span></span>
<span class="line"><span class="__shiki_mdbnqw">    cycles</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">query</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">      suspicious_cycles</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> uid</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">account</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        path</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">shortest</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">from</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> account</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">to</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> account</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">depth</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    risk_score</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">math</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      (from_account.unusual_patterns * 30) +</span></span>
<span class="line"><span class="__shiki_140thh">      (to_account.is_new * 20) +</span></span>
<span class="line"><span class="__shiki_140thh">      (gt(amount, 10000) ? 25 : 0) +</span></span>
<span class="line"><span class="__shiki_140thh">      (count(suspicious_cycles) &gt; 0 ? 25 : 0)</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="十一、错误处理与调试" tabindex="-1">十一、错误处理与调试 <a class="header-anchor" href="#十一、错误处理与调试" aria-label="Permalink to &quot;十一、错误处理与调试&quot;">​</a></h2><h3 id="_11-1-常见错误" tabindex="-1">11.1 常见错误 <a class="header-anchor" href="#_11-1-常见错误" aria-label="Permalink to &quot;11.1 常见错误&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 缺少索引错误</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 错误：如果name没有索引</span></span>
<span class="line"><span class="__shiki_1jdh33">  error_query</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> eq</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">&quot;Alice&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    uid</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 正确：确保字段有索引</span></span>
<span class="line"><span class="__shiki_1jdh33">  correct_query</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> eq</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_140thh">@., </span><span class="__shiki_21nrsd">&quot;Alice&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    uid</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 递归深度过大</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 可能导致超时</span></span>
<span class="line"><span class="__shiki_1jdh33">  deep_recursion</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> uid</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0x1</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    friends</span><span class="__shiki_1t8gfj"> @recurse</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">depth</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">) {</span><span class="__shiki_21nrsd">  # 太深！</span></span>
<span class="line"><span class="__shiki_1jdh33">      name</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_11-2-调试技巧" tabindex="-1">11.2 调试技巧 <a class="header-anchor" href="#_11-2-调试技巧" aria-label="Permalink to &quot;11.2 调试技巧&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 使用explain分析查询</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1jdh33">  explain_query</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> eq</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">&quot;Alice&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    uid</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    friends</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">      name</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 性能分析</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 添加性能追踪</span></span>
<span class="line"><span class="__shiki_1jdh33">  profile_query</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> type</span><span class="__shiki_140thh">(</span><span class="__shiki_21nrsd">&quot;User&quot;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1t8gfj">@profile</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">    uid</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    count</span><span class="__shiki_140thh">(friends)</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 分步调试复杂查询</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 先测试子查询</span></span>
<span class="line"><span class="__shiki_mdbnqw">  step1</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">test_filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> type</span><span class="__shiki_140thh">(</span><span class="__shiki_21nrsd">&quot;User&quot;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1t8gfj">@filter</span><span class="__shiki_140thh">(gt(age, 18)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    count</span><span class="__shiki_140thh">(uid)</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_mdbnqw">  step2</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">test_relation</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> uid</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0x1</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    friends</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">first</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1jdh33">      name</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="十二、graphql-到标准graphql迁移" tabindex="-1">十二、GraphQL+-到标准GraphQL迁移 <a class="header-anchor" href="#十二、graphql-到标准graphql迁移" aria-label="Permalink to &quot;十二、GraphQL+-到标准GraphQL迁移&quot;">​</a></h2><h3 id="_12-1-主要变化" tabindex="-1">12.1 主要变化 <a class="header-anchor" href="#_12-1-主要变化" aria-label="Permalink to &quot;12.1 主要变化&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">GraphQL+- → 标准GraphQL</span></span>
<span class="line"><span class="__shiki_wvjl67">---------------------------------</span></span>
<span class="line"><span class="__shiki_wvjl67">func: eq(name, &quot;A&quot;)  → query { get(func: eq(name, &quot;A&quot;)) }</span></span>
<span class="line"><span class="__shiki_wvjl67">@filter(gt(age, 18)) → @filter(age: {gt: 18})</span></span>
<span class="line"><span class="__shiki_wvjl67">uid(0x1)            → { id: &quot;0x1&quot; }</span></span>
<span class="line"><span class="__shiki_wvjl67">@cascade            → @cascade</span></span>
<span class="line"><span class="__shiki_wvjl67">@recurse            → @recurse</span></span></code></pre></div><h3 id="_12-2-迁移示例" tabindex="-1">12.2 迁移示例 <a class="header-anchor" href="#_12-2-迁移示例" aria-label="Permalink to &quot;12.2 迁移示例&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># GraphQL+- 版本</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1jdh33">  old_query</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> eq</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">&quot;Alice&quot;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1t8gfj">@filter</span><span class="__shiki_140thh">(gt(age, 18)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    uid</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    age</span></span>
<span class="line"><span class="__shiki_1jdh33">    friends</span><span class="__shiki_1t8gfj"> @filter</span><span class="__shiki_140thh">(eq(city, </span><span class="__shiki_21nrsd">&quot;NYC&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">      name</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 标准GraphQL 版本</span></span>
<span class="line"><span class="__shiki_1itgoe">query</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  get</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">func</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> eq</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">&quot;Alice&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">    id</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span></span>
<span class="line"><span class="__shiki_1jdh33">    age</span><span class="__shiki_1t8gfj"> @filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">gt</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">18</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1jdh33">    friends</span><span class="__shiki_1t8gfj"> @filter</span><span class="__shiki_140thh">(eq(city, </span><span class="__shiki_21nrsd">&quot;NYC&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1jdh33">      name</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="十三、最佳实践总结" tabindex="-1">十三、最佳实践总结 <a class="header-anchor" href="#十三、最佳实践总结" aria-label="Permalink to &quot;十三、最佳实践总结&quot;">​</a></h2><h3 id="_13-1-设计原则" tabindex="-1">13.1 设计原则 <a class="header-anchor" href="#_13-1-设计原则" aria-label="Permalink to &quot;13.1 设计原则&quot;">​</a></h3><ol><li><strong>合理分片</strong>：根据访问模式设计分片键</li><li><strong>索引策略</strong>：只为查询需要的字段建索引</li><li><strong>数据建模</strong>：关系优先，属性次要</li><li><strong>查询优化</strong>：尽早过滤，限制返回数据</li></ol><h3 id="_13-2-性能指南" tabindex="-1">13.2 性能指南 <a class="header-anchor" href="#_13-2-性能指南" aria-label="Permalink to &quot;13.2 性能指南&quot;">​</a></h3><ol><li><strong>避免大结果集</strong>：使用分页(first/offset)</li><li><strong>控制递归深度</strong>：@recurse(depth: n)</li><li><strong>批量操作</strong>：减少网络往返</li><li><strong>监控查询</strong>：使用@explain和@profile</li></ol><h3 id="_13-3-维护建议" tabindex="-1">13.3 维护建议 <a class="header-anchor" href="#_13-3-维护建议" aria-label="Permalink to &quot;13.3 维护建议&quot;">​</a></h3><ol><li><strong>定期备份</strong>：使用导出/导入功能</li><li><strong>监控指标</strong>：关注延迟、吞吐量、内存使用</li><li><strong>版本管理</strong>：Schema变更要有版本控制</li><li><strong>测试覆盖</strong>：单元测试复杂查询</li></ol><h2 id="十四、学习资源" tabindex="-1">十四、学习资源 <a class="header-anchor" href="#十四、学习资源" aria-label="Permalink to &quot;十四、学习资源&quot;">​</a></h2><h3 id="_14-1-官方文档" tabindex="-1">14.1 官方文档 <a class="header-anchor" href="#_14-1-官方文档" aria-label="Permalink to &quot;14.1 官方文档&quot;">​</a></h3><ul><li><a href="https://dgraph.io/docs/" target="_blank" rel="noreferrer">Dgraph官方文档</a></li><li><a href="https://dgraph.io/docs/query-language/" target="_blank" rel="noreferrer">GraphQL+-参考</a></li><li><a href="https://dgraph.io/docs/schema/" target="_blank" rel="noreferrer">Schema设计指南</a></li></ul><h3 id="_14-2-实践工具" tabindex="-1">14.2 实践工具 <a class="header-anchor" href="#_14-2-实践工具" aria-label="Permalink to &quot;14.2 实践工具&quot;">​</a></h3><ol><li><strong>Ratel</strong>：Dgraph官方UI工具</li><li><strong>dgraph-js</strong>：JavaScript客户端</li><li><strong>dgraph-orm</strong>：ORM工具</li><li><strong>dgraph-loader</strong>：数据导入工具</li></ol><h3 id="_14-3-社区资源" tabindex="-1">14.3 社区资源 <a class="header-anchor" href="#_14-3-社区资源" aria-label="Permalink to &quot;14.3 社区资源&quot;">​</a></h3><ul><li><a href="https://discord.gg/dgraph" target="_blank" rel="noreferrer">Dgraph Discord社区</a></li><li><a href="https://github.com/dgraph-io/dgraph" target="_blank" rel="noreferrer">GitHub仓库</a></li><li><a href="https://dgraph.io/blog/" target="_blank" rel="noreferrer">官方博客</a></li><li><a href="https://stackoverflow.com/questions/tagged/dgraph" target="_blank" rel="noreferrer">Stack Overflow标签</a></li></ul><hr><p><strong>注意</strong>：本笔记基于GraphQL+-语法编写。自Dgraph v21.0起，官方推荐使用标准GraphQL+Directives语法。实际使用时请参考对应版本的官方文档。GraphQL+-的理解对于深入掌握Dgraph查询机制仍然非常重要。</p>`,105)])])}const o=a(p,[["render",h]]);export{r as __pageData,o as default};
