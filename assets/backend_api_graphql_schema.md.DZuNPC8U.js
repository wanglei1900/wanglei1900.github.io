import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"GraphQL 模式设计完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/api/graphql/schema.md","filePath":"backend/api/graphql/schema.md"}'),p={name:"backend/api/graphql/schema.md"};function h(l,s,c,e,t,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="graphql-模式设计完整学习笔记" tabindex="-1">GraphQL 模式设计完整学习笔记 <a class="header-anchor" href="#graphql-模式设计完整学习笔记" aria-label="Permalink to &quot;GraphQL 模式设计完整学习笔记&quot;">​</a></h1><h2 id="_1-graphql-模式基础" tabindex="-1">1. GraphQL 模式基础 <a class="header-anchor" href="#_1-graphql-模式基础" aria-label="Permalink to &quot;1. GraphQL 模式基础&quot;">​</a></h2><h3 id="_1-1-什么是-graphql-模式" tabindex="-1">1.1 什么是 GraphQL 模式 <a class="header-anchor" href="#_1-1-什么是-graphql-模式" aria-label="Permalink to &quot;1.1 什么是 GraphQL 模式&quot;">​</a></h3><ul><li><strong>模式定义语言 (SDL)</strong>: GraphQL 的类型系统定义语言</li><li><strong>类型系统</strong>: 定义 API 的数据结构和能力</li><li><strong>契约</strong>: 客户端和服务器之间的明确契约</li></ul><h3 id="_1-2-基本组件" tabindex="-1">1.2 基本组件 <a class="header-anchor" href="#_1-2-基本组件" aria-label="Permalink to &quot;1.2 基本组件&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 标量类型</span></span>
<span class="line"><span class="__shiki_1itgoe">scalar</span><span class="__shiki_1t8gfj"> DateTime</span></span>
<span class="line"><span class="__shiki_1itgoe">scalar</span><span class="__shiki_1t8gfj"> EmailAddress</span></span>
<span class="line"><span class="__shiki_1itgoe">scalar</span><span class="__shiki_1t8gfj"> URL</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 对象类型</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> User</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  email</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  createdAt</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">DateTime</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查询类型</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> Query</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  getUser</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): </span><span class="__shiki_dzsirb">User</span></span>
<span class="line"><span class="__shiki_1jdh33">  listUsers</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">limit</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Int</span><span class="__shiki_140thh"> = </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">): [</span><span class="__shiki_dzsirb">User</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 变更类型</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> Mutation</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  createUser</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">input</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">CreateUserInput</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): </span><span class="__shiki_dzsirb">User</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  updateUser</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">input</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">UpdateUserInput</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): </span><span class="__shiki_dzsirb">User</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 订阅类型</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> Subscription</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  userCreated</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">User</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_2-类型系统设计" tabindex="-1">2. 类型系统设计 <a class="header-anchor" href="#_2-类型系统设计" aria-label="Permalink to &quot;2. 类型系统设计&quot;">​</a></h2><h3 id="_2-1-标量类型" tabindex="-1">2.1 标量类型 <a class="header-anchor" href="#_2-1-标量类型" aria-label="Permalink to &quot;2.1 标量类型&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 内置标量类型</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_1t8gfj">ID</span><span class="__shiki_140thh">: 唯一标识符</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_1t8gfj">String</span><span class="__shiki_140thh">: 字符串</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_1t8gfj">Int</span><span class="__shiki_140thh">: 整数</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_1t8gfj">Float</span><span class="__shiki_140thh">: 浮点数</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_1t8gfj">Boolean</span><span class="__shiki_140thh">: 布尔值</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 自定义标量类型</span></span>
<span class="line"><span class="__shiki_1itgoe">scalar</span><span class="__shiki_1t8gfj"> DateTime</span></span>
<span class="line"><span class="__shiki_1itgoe">scalar</span><span class="__shiki_1t8gfj"> EmailAddress</span></span>
<span class="line"><span class="__shiki_1itgoe">scalar</span><span class="__shiki_1t8gfj"> JSON</span></span>
<span class="line"><span class="__shiki_1itgoe">scalar</span><span class="__shiki_1t8gfj"> Upload</span></span></code></pre></div><h3 id="_2-2-对象类型设计原则" tabindex="-1">2.2 对象类型设计原则 <a class="header-anchor" href="#_2-2-对象类型设计原则" aria-label="Permalink to &quot;2.2 对象类型设计原则&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 好的对象设计</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> Product</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  description</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span></span>
<span class="line"><span class="__shiki_1jdh33">  price</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Float</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  category</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Category</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  tags</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1jdh33">  createdAt</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">DateTime</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  updatedAt</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">DateTime</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 关联设计</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> Category</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  products</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">Product</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  parent</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Category</span></span>
<span class="line"><span class="__shiki_1jdh33">  children</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">Category</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-3-接口和联合类型" tabindex="-1">2.3 接口和联合类型 <a class="header-anchor" href="#_2-3-接口和联合类型" aria-label="Permalink to &quot;2.3 接口和联合类型&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 接口 - 共享字段定义</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_dzsirb"> Node</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  createdAt</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">DateTime</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_dzsirb"> SearchResult</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  score</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Float</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  highlight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 联合类型 - 不同类型的选择</span></span>
<span class="line"><span class="__shiki_1itgoe">union</span><span class="__shiki_dzsirb"> Content</span><span class="__shiki_140thh"> = </span><span class="__shiki_dzsirb">Article</span><span class="__shiki_140thh"> | </span><span class="__shiki_dzsirb">Video</span><span class="__shiki_140thh"> | </span><span class="__shiki_dzsirb">Podcast</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 实现接口</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> User</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_dzsirb"> Node</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  createdAt</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">DateTime</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  email</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> Product</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_dzsirb"> Node</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  createdAt</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">DateTime</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  price</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Float</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_3-查询设计模式" tabindex="-1">3. 查询设计模式 <a class="header-anchor" href="#_3-查询设计模式" aria-label="Permalink to &quot;3. 查询设计模式&quot;">​</a></h2><h3 id="_3-1-分页模式" tabindex="-1">3.1 分页模式 <a class="header-anchor" href="#_3-1-分页模式" aria-label="Permalink to &quot;3.1 分页模式&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基于游标的分页</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> PageInfo</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  hasNextPage</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Boolean</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  hasPreviousPage</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Boolean</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  startCursor</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span></span>
<span class="line"><span class="__shiki_1jdh33">  endCursor</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> UserConnection</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  edges</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">UserEdge</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  pageInfo</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">PageInfo</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  totalCount</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Int</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> UserEdge</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  node</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">User</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  cursor</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> Query</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  users</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1jdh33">    first</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Int</span></span>
<span class="line"><span class="__shiki_1jdh33">    after</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span></span>
<span class="line"><span class="__shiki_1jdh33">    last</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Int</span></span>
<span class="line"><span class="__shiki_1jdh33">    before</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span></span>
<span class="line"><span class="__shiki_140thh">  ): </span><span class="__shiki_dzsirb">UserConnection</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-过滤和排序" tabindex="-1">3.2 过滤和排序 <a class="header-anchor" href="#_3-2-过滤和排序" aria-label="Permalink to &quot;3.2 过滤和排序&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 过滤输入类型</span></span>
<span class="line"><span class="__shiki_1itgoe">input</span><span class="__shiki_dzsirb"> UserFilter</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">StringFilter</span></span>
<span class="line"><span class="__shiki_1jdh33">  email</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">StringFilter</span></span>
<span class="line"><span class="__shiki_1jdh33">  createdAt</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">DateRangeFilter</span></span>
<span class="line"><span class="__shiki_1jdh33">  AND</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">UserFilter</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1jdh33">  OR</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">UserFilter</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">input</span><span class="__shiki_dzsirb"> StringFilter</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  equals</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span></span>
<span class="line"><span class="__shiki_1jdh33">  contains</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span></span>
<span class="line"><span class="__shiki_1jdh33">  startsWith</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span></span>
<span class="line"><span class="__shiki_1jdh33">  endsWith</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">input</span><span class="__shiki_dzsirb"> DateRangeFilter</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  gte</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">DateTime</span></span>
<span class="line"><span class="__shiki_1jdh33">  lte</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">DateTime</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 排序枚举</span></span>
<span class="line"><span class="__shiki_1itgoe">enum</span><span class="__shiki_dzsirb"> SortOrder</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">  ASC</span></span>
<span class="line"><span class="__shiki_dzsirb">  DESC</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">input</span><span class="__shiki_dzsirb"> UserOrderBy</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">SortOrder</span></span>
<span class="line"><span class="__shiki_1jdh33">  email</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">SortOrder</span></span>
<span class="line"><span class="__shiki_1jdh33">  createdAt</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">SortOrder</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> Query</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  users</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1jdh33">    filter</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">UserFilter</span></span>
<span class="line"><span class="__shiki_1jdh33">    orderBy</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">UserOrderBy</span></span>
<span class="line"><span class="__shiki_1jdh33">    pagination</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">PaginationInput</span></span>
<span class="line"><span class="__shiki_140thh">  ): </span><span class="__shiki_dzsirb">UserConnection</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_4-变更设计模式" tabindex="-1">4. 变更设计模式 <a class="header-anchor" href="#_4-变更设计模式" aria-label="Permalink to &quot;4. 变更设计模式&quot;">​</a></h2><h3 id="_4-1-输入类型设计" tabindex="-1">4.1 输入类型设计 <a class="header-anchor" href="#_4-1-输入类型设计" aria-label="Permalink to &quot;4.1 输入类型设计&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 专门的输入类型</span></span>
<span class="line"><span class="__shiki_1itgoe">input</span><span class="__shiki_dzsirb"> CreateUserInput</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  email</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  password</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  profile</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ProfileInput</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">input</span><span class="__shiki_dzsirb"> UpdateUserInput</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span></span>
<span class="line"><span class="__shiki_1jdh33">  email</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span></span>
<span class="line"><span class="__shiki_1jdh33">  profile</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ProfileInput</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">input</span><span class="__shiki_dzsirb"> ProfileInput</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  avatar</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span></span>
<span class="line"><span class="__shiki_1jdh33">  bio</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span></span>
<span class="line"><span class="__shiki_1jdh33">  website</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> Mutation</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  createUser</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">input</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">CreateUserInput</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): </span><span class="__shiki_dzsirb">User</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  updateUser</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">input</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">UpdateUserInput</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): </span><span class="__shiki_dzsirb">User</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  deleteUser</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): </span><span class="__shiki_dzsirb">Boolean</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-批量操作" tabindex="-1">4.2 批量操作 <a class="header-anchor" href="#_4-2-批量操作" aria-label="Permalink to &quot;4.2 批量操作&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> Mutation</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 批量创建</span></span>
<span class="line"><span class="__shiki_1jdh33">  createUsers</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">input</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">CreateUserInput</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): [</span><span class="__shiki_dzsirb">User</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 批量更新</span></span>
<span class="line"><span class="__shiki_1jdh33">  updateUsers</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">input</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">UpdateUserInput</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): [</span><span class="__shiki_dzsirb">User</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 批量删除</span></span>
<span class="line"><span class="__shiki_1jdh33">  deleteUsers</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ids</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): </span><span class="__shiki_dzsirb">BatchPayload</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> BatchPayload</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  count</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Int</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_5-错误处理模式" tabindex="-1">5. 错误处理模式 <a class="header-anchor" href="#_5-错误处理模式" aria-label="Permalink to &quot;5. 错误处理模式&quot;">​</a></h2><h3 id="_5-1-联合类型错误处理" tabindex="-1">5.1 联合类型错误处理 <a class="header-anchor" href="#_5-1-联合类型错误处理" aria-label="Permalink to &quot;5.1 联合类型错误处理&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 成功和错误的联合类型</span></span>
<span class="line"><span class="__shiki_1itgoe">union</span><span class="__shiki_dzsirb"> CreateUserResult</span><span class="__shiki_140thh"> = </span><span class="__shiki_dzsirb">User</span><span class="__shiki_140thh"> | </span><span class="__shiki_dzsirb">ValidationError</span><span class="__shiki_140thh"> | </span><span class="__shiki_dzsirb">AuthenticationError</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> ValidationError</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  field</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  message</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  code</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> AuthenticationError</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  message</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  code</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> Mutation</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  createUser</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">input</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">CreateUserInput</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): </span><span class="__shiki_dzsirb">CreateUserResult</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-包装响应模式" tabindex="-1">5.2 包装响应模式 <a class="header-anchor" href="#_5-2-包装响应模式" aria-label="Permalink to &quot;5.2 包装响应模式&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> MutationResponse</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  success</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Boolean</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  message</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span></span>
<span class="line"><span class="__shiki_1jdh33">  code</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> CreateUserResponse</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_dzsirb"> MutationResponse</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  success</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Boolean</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  message</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span></span>
<span class="line"><span class="__shiki_1jdh33">  code</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span></span>
<span class="line"><span class="__shiki_1jdh33">  user</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">User</span></span>
<span class="line"><span class="__shiki_1jdh33">  errors</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">ValidationError</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> Mutation</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  createUser</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">input</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">CreateUserInput</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): </span><span class="__shiki_dzsirb">CreateUserResponse</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_6-高级模式设计" tabindex="-1">6. 高级模式设计 <a class="header-anchor" href="#_6-高级模式设计" aria-label="Permalink to &quot;6. 高级模式设计&quot;">​</a></h2><h3 id="_6-1-领域驱动设计-ddd" tabindex="-1">6.1 领域驱动设计 (DDD) <a class="header-anchor" href="#_6-1-领域驱动设计-ddd" aria-label="Permalink to &quot;6.1 领域驱动设计 (DDD)&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 聚合根模式</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> Order</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  customer</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Customer</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  items</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">OrderItem</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  total</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Float</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  status</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">OrderStatus</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 领域方法</span></span>
<span class="line"><span class="__shiki_1jdh33">  canCancel</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Boolean</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  canModify</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Boolean</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> OrderItem</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  product</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Product</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  quantity</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Int</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  price</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Float</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 值对象</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> Address</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  street</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  city</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  state</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  zipCode</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  country</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-cqrs-模式" tabindex="-1">6.2 CQRS 模式 <a class="header-anchor" href="#_6-2-cqrs-模式" aria-label="Permalink to &quot;6.2 CQRS 模式&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 查询端 - 只读</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> Query</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 用户相关查询</span></span>
<span class="line"><span class="__shiki_1jdh33">  userProfile</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">UserProfile</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  userOrders</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">Order</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  userNotifications</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">Notification</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 产品相关查询</span></span>
<span class="line"><span class="__shiki_1jdh33">  productCatalog</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ProductCatalog</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  productRecommendations</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">Product</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 命令端 - 写操作</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> Mutation</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 用户命令</span></span>
<span class="line"><span class="__shiki_1jdh33">  registerUser</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">input</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">RegisterInput</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): </span><span class="__shiki_dzsirb">AuthPayload</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  updateProfile</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">input</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ProfileInput</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): </span><span class="__shiki_dzsirb">ProfileResponse</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 订单命令</span></span>
<span class="line"><span class="__shiki_1jdh33">  createOrder</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">input</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">OrderInput</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): </span><span class="__shiki_dzsirb">Order</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  cancelOrder</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): </span><span class="__shiki_dzsirb">Order</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_7-性能优化模式" tabindex="-1">7. 性能优化模式 <a class="header-anchor" href="#_7-性能优化模式" aria-label="Permalink to &quot;7. 性能优化模式&quot;">​</a></h2><h3 id="_7-1-数据加载器模式" tabindex="-1">7.1 数据加载器模式 <a class="header-anchor" href="#_7-1-数据加载器模式" aria-label="Permalink to &quot;7.1 数据加载器模式&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 避免 N+1 查询问题</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> User</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 关联数据使用数据加载器</span></span>
<span class="line"><span class="__shiki_1jdh33">  posts</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">Post</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">!</span><span class="__shiki_21nrsd">    # 使用 DataLoader 批量加载</span></span>
<span class="line"><span class="__shiki_1jdh33">  comments</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">Comment</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">!</span><span class="__shiki_21nrsd"> # 使用 DataLoader 批量加载</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-字段级权限控制" tabindex="-1">7.2 字段级权限控制 <a class="header-anchor" href="#_7-2-字段级权限控制" aria-label="Permalink to &quot;7.2 字段级权限控制&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用指令进行权限控制</span></span>
<span class="line"><span class="__shiki_1itgoe">directive</span><span class="__shiki_1t8gfj"> @auth</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">requires</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">Role</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">on</span><span class="__shiki_dzsirb"> FIELD_DEFINITION</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">enum</span><span class="__shiki_dzsirb"> Role</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">  ADMIN</span></span>
<span class="line"><span class="__shiki_dzsirb">  USER</span></span>
<span class="line"><span class="__shiki_dzsirb">  MODERATOR</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> User</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  email</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span><span class="__shiki_1t8gfj"> @auth</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">requires</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">ADMIN</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb"> USER</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 只有用户自己和管理员能查看</span></span>
<span class="line"><span class="__shiki_1jdh33">  privateData</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1t8gfj"> @auth</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">requires</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">ADMIN</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb"> USER</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_8-版本控制和演进" tabindex="-1">8. 版本控制和演进 <a class="header-anchor" href="#_8-版本控制和演进" aria-label="Permalink to &quot;8. 版本控制和演进&quot;">​</a></h2><h3 id="_8-1-向后兼容的变更" tabindex="-1">8.1 向后兼容的变更 <a class="header-anchor" href="#_8-1-向后兼容的变更" aria-label="Permalink to &quot;8.1 向后兼容的变更&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 添加新字段 - 安全</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> Product</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  description</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 新添加的字段</span></span>
<span class="line"><span class="__shiki_1jdh33">  sku</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span></span>
<span class="line"><span class="__shiki_1jdh33">  metadata</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">JSON</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 弃用字段 - 安全</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> User</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 弃用旧字段</span></span>
<span class="line"><span class="__shiki_1jdh33">  oldEmail</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1t8gfj"> @deprecated</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">reason</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Use email field instead&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1jdh33">  email</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-2-模式拼接和联邦" tabindex="-1">8.2 模式拼接和联邦 <a class="header-anchor" href="#_8-2-模式拼接和联邦" aria-label="Permalink to &quot;8.2 模式拼接和联邦&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 联邦模式 - 用户服务</span></span>
<span class="line"><span class="__shiki_1itgoe">extend</span><span class="__shiki_1itgoe"> type</span><span class="__shiki_dzsirb"> Query</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  me</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">User</span><span class="__shiki_1t8gfj"> @provides</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">fields</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;id&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> User</span><span class="__shiki_1t8gfj"> @key</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">fields</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;id&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  email</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 联邦模式 - 订单服务</span></span>
<span class="line"><span class="__shiki_1itgoe">extend</span><span class="__shiki_1itgoe"> type</span><span class="__shiki_dzsirb"> User</span><span class="__shiki_1t8gfj"> @key</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">fields</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;id&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span><span class="__shiki_1t8gfj"> @external</span></span>
<span class="line"><span class="__shiki_1jdh33">  orders</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">Order</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> Order</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  userId</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  total</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Float</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_9-工具和最佳实践" tabindex="-1">9. 工具和最佳实践 <a class="header-anchor" href="#_9-工具和最佳实践" aria-label="Permalink to &quot;9. 工具和最佳实践&quot;">​</a></h2><h3 id="_9-1-开发工具" tabindex="-1">9.1 开发工具 <a class="header-anchor" href="#_9-1-开发工具" aria-label="Permalink to &quot;9.1 开发工具&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用指令增强开发体验</span></span>
<span class="line"><span class="__shiki_1itgoe">directive</span><span class="__shiki_1t8gfj"> @cacheControl</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">maxAge</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">scope</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">CacheControlScope</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">on</span><span class="__shiki_dzsirb"> FIELD_DEFINITION</span><span class="__shiki_140thh"> | </span><span class="__shiki_dzsirb">OBJECT</span><span class="__shiki_140thh"> | </span><span class="__shiki_dzsirb">INTERFACE</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">enum</span><span class="__shiki_dzsirb"> CacheControlScope</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">  PUBLIC</span></span>
<span class="line"><span class="__shiki_dzsirb">  PRIVATE</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> Query</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  products</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">Product</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">!</span><span class="__shiki_1t8gfj"> @cacheControl</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">maxAge</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3600</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">scope</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> PUBLIC</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1jdh33">  userProfile</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">User</span><span class="__shiki_1itgoe">!</span><span class="__shiki_1t8gfj"> @cacheControl</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">maxAge</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">300</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">scope</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb"> PRIVATE</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_9-2-文档和描述" tabindex="-1">9.2 文档和描述 <a class="header-anchor" href="#_9-2-文档和描述" aria-label="Permalink to &quot;9.2 文档和描述&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">用户实体表示系统中的用户</span></span>
<span class="line"><span class="__shiki_21nrsd">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> User</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  &quot;用户的唯一标识符&quot;</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  &quot;用户的显示名称&quot;</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  &quot;用户的电子邮件地址&quot;</span></span>
<span class="line"><span class="__shiki_1jdh33">  email</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  &quot;用户账户创建时间&quot;</span></span>
<span class="line"><span class="__shiki_1jdh33">  createdAt</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">DateTime</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">获取用户信息的查询</span></span>
<span class="line"><span class="__shiki_21nrsd">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> Query</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">  根据ID获取特定用户</span></span>
<span class="line"><span class="__shiki_21nrsd">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  **参数:**</span></span>
<span class="line"><span class="__shiki_21nrsd">  - id: 用户ID</span></span>
<span class="line"><span class="__shiki_21nrsd">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  **错误:**</span></span>
<span class="line"><span class="__shiki_21nrsd">  - 用户不存在时返回 null</span></span>
<span class="line"><span class="__shiki_21nrsd">  &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1jdh33">  user</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): </span><span class="__shiki_dzsirb">User</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_10-完整示例" tabindex="-1">10. 完整示例 <a class="header-anchor" href="#_10-完整示例" aria-label="Permalink to &quot;10. 完整示例&quot;">​</a></h2><h3 id="_10-1-电商平台模式设计" tabindex="-1">10.1 电商平台模式设计 <a class="header-anchor" href="#_10-1-电商平台模式设计" aria-label="Permalink to &quot;10.1 电商平台模式设计&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 标量类型</span></span>
<span class="line"><span class="__shiki_1itgoe">scalar</span><span class="__shiki_1t8gfj"> DateTime</span></span>
<span class="line"><span class="__shiki_1itgoe">scalar</span><span class="__shiki_1t8gfj"> EmailAddress</span></span>
<span class="line"><span class="__shiki_1itgoe">scalar</span><span class="__shiki_1t8gfj"> JSON</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 枚举类型</span></span>
<span class="line"><span class="__shiki_1itgoe">enum</span><span class="__shiki_dzsirb"> ProductStatus</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">  ACTIVE</span></span>
<span class="line"><span class="__shiki_dzsirb">  INACTIVE</span></span>
<span class="line"><span class="__shiki_dzsirb">  OUT_OF_STOCK</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">enum</span><span class="__shiki_dzsirb"> OrderStatus</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">  PENDING</span></span>
<span class="line"><span class="__shiki_dzsirb">  CONFIRMED</span></span>
<span class="line"><span class="__shiki_dzsirb">  SHIPPED</span></span>
<span class="line"><span class="__shiki_dzsirb">  DELIVERED</span></span>
<span class="line"><span class="__shiki_dzsirb">  CANCELLED</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 接口</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_dzsirb"> Node</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  createdAt</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">DateTime</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_dzsirb"> SearchResult</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  score</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Float</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 对象类型</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> User</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_dzsirb"> Node</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  createdAt</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">DateTime</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  email</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">EmailAddress</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  profile</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Profile</span></span>
<span class="line"><span class="__shiki_1jdh33">  addresses</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">Address</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  orders</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">OrderConnection</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> Product</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_dzsirb"> Node</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_dzsirb"> SearchResult</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  createdAt</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">DateTime</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  description</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span></span>
<span class="line"><span class="__shiki_1jdh33">  price</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Float</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  category</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Category</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  inventory</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Int</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  status</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ProductStatus</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  score</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Float</span><span class="__shiki_1itgoe">!</span><span class="__shiki_21nrsd"> # 来自 SearchResult</span></span>
<span class="line"><span class="__shiki_1jdh33">  tags</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  variants</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">ProductVariant</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> Order</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_dzsirb"> Node</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  createdAt</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">DateTime</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  user</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">User</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  items</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">OrderItem</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  total</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Float</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  status</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">OrderStatus</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  shippingAddress</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Address</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 输入类型</span></span>
<span class="line"><span class="__shiki_1itgoe">input</span><span class="__shiki_dzsirb"> ProductFilter</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  category</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span></span>
<span class="line"><span class="__shiki_1jdh33">  priceRange</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">PriceRangeFilter</span></span>
<span class="line"><span class="__shiki_1jdh33">  status</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ProductStatus</span></span>
<span class="line"><span class="__shiki_1jdh33">  tags</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1jdh33">  search</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">input</span><span class="__shiki_dzsirb"> CreateOrderInput</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  userId</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  items</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">OrderItemInput</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  shippingAddress</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">AddressInput</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查询和变更</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> Query</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 产品查询</span></span>
<span class="line"><span class="__shiki_1jdh33">  products</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1jdh33">    filter</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ProductFilter</span></span>
<span class="line"><span class="__shiki_1jdh33">    orderBy</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ProductOrderBy</span></span>
<span class="line"><span class="__shiki_1jdh33">    pagination</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">PaginationInput</span></span>
<span class="line"><span class="__shiki_140thh">  ): </span><span class="__shiki_dzsirb">ProductConnection</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1jdh33">  product</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): </span><span class="__shiki_dzsirb">Product</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 用户查询</span></span>
<span class="line"><span class="__shiki_1jdh33">  me</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">User</span></span>
<span class="line"><span class="__shiki_1jdh33">  user</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): </span><span class="__shiki_dzsirb">User</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 搜索</span></span>
<span class="line"><span class="__shiki_1jdh33">  search</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">query</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): [</span><span class="__shiki_dzsirb">SearchResult</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> Mutation</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 用户相关</span></span>
<span class="line"><span class="__shiki_1jdh33">  register</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">input</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">RegisterInput</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): </span><span class="__shiki_dzsirb">AuthPayload</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  updateProfile</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">input</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ProfileInput</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): </span><span class="__shiki_dzsirb">User</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 订单相关</span></span>
<span class="line"><span class="__shiki_1jdh33">  createOrder</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">input</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">CreateOrderInput</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): </span><span class="__shiki_dzsirb">Order</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  cancelOrder</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): </span><span class="__shiki_dzsirb">Order</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 产品相关 (管理员)</span></span>
<span class="line"><span class="__shiki_1jdh33">  createProduct</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">input</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">CreateProductInput</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): </span><span class="__shiki_dzsirb">Product</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  updateProduct</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">input</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">UpdateProductInput</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): </span><span class="__shiki_dzsirb">Product</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> Subscription</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  orderStatusChanged</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">orderId</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): </span><span class="__shiki_dzsirb">Order</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 响应类型</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> AuthPayload</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  token</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  user</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">User</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> CreateOrderResponse</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  success</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Boolean</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  order</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Order</span></span>
<span class="line"><span class="__shiki_1jdh33">  errors</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">OrderError</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">union</span><span class="__shiki_dzsirb"> OrderError</span><span class="__shiki_140thh"> = </span><span class="__shiki_dzsirb">ValidationError</span><span class="__shiki_140thh"> | </span><span class="__shiki_dzsirb">InventoryError</span><span class="__shiki_140thh"> | </span><span class="__shiki_dzsirb">PaymentError</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><h3 id="设计原则" tabindex="-1">设计原则 <a class="header-anchor" href="#设计原则" aria-label="Permalink to &quot;设计原则&quot;">​</a></h3><ol><li><strong>以客户端为中心</strong>: 根据客户端需求设计模式</li><li><strong>强类型</strong>: 充分利用 GraphQL 的类型系统</li><li><strong>渐进式演进</strong>: 保持向后兼容的变更</li><li><strong>性能意识</strong>: 考虑查询复杂性和数据加载</li><li><strong>明确意图</strong>: 使用清晰的命名和文档</li></ol><h3 id="常见模式" tabindex="-1">常见模式 <a class="header-anchor" href="#常见模式" aria-label="Permalink to &quot;常见模式&quot;">​</a></h3><ul><li><strong>分页连接模式</strong>: 用于列表查询</li><li><strong>输入对象模式</strong>: 用于复杂的变更操作</li><li><strong>错误联合模式</strong>: 用于类型安全的错误处理</li><li><strong>联邦模式</strong>: 用于微服务架构</li><li><strong>数据加载器模式</strong>: 用于性能优化</li></ul><p>这份笔记涵盖了 GraphQL 模式设计的核心概念和最佳实践，可以作为 API 开发的参考指南。</p>`,57)])])}const o=a(p,[["render",h]]);export{d as __pageData,o as default};
