import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"CouchDB学习笔记：复制协议与同步机制详解","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/nosql/document/couchdb/replication.md","filePath":"data/database/nosql/document/couchdb/replication.md"}'),p={name:"data/database/nosql/document/couchdb/replication.md"};function h(l,s,c,t,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="couchdb学习笔记-复制协议与同步机制详解" tabindex="-1">CouchDB学习笔记：复制协议与同步机制详解 <a class="header-anchor" href="#couchdb学习笔记-复制协议与同步机制详解" aria-label="Permalink to &quot;CouchDB学习笔记：复制协议与同步机制详解&quot;">​</a></h1><h2 id="一、复制概述与架构设计" tabindex="-1">一、复制概述与架构设计 <a class="header-anchor" href="#一、复制概述与架构设计" aria-label="Permalink to &quot;一、复制概述与架构设计&quot;">​</a></h2><h3 id="_1-1-couchdb复制基础" tabindex="-1">1.1 CouchDB复制基础 <a class="header-anchor" href="#_1-1-couchdb复制基础" aria-label="Permalink to &quot;1.1 CouchDB复制基础&quot;">​</a></h3><h4 id="_1-1-1-复制概念" tabindex="-1">1.1.1 复制概念 <a class="header-anchor" href="#_1-1-1-复制概念" aria-label="Permalink to &quot;1.1.1 复制概念&quot;">​</a></h4><p>CouchDB复制是一种数据同步机制，允许在两个或多个数据库之间同步文档。复制是<strong>单向</strong>的，从源数据库到目标数据库。</p><p><strong>核心特性：</strong></p><ul><li><strong>多主复制</strong>：任何节点都可以作为源或目标</li><li><strong>增量同步</strong>：只传输更改的部分</li><li><strong>最终一致性</strong>：支持离线操作和网络分区</li><li><strong>冲突检测</strong>：自动检测并保留冲突版本</li></ul><h4 id="_1-1-2-复制拓扑" tabindex="-1">1.1.2 复制拓扑 <a class="header-anchor" href="#_1-1-2-复制拓扑" aria-label="Permalink to &quot;1.1.2 复制拓扑&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">1. 一对一复制: A → B</span></span>
<span class="line"><span class="__shiki_wvjl67">2. 星型拓扑: 中心节点与多个边缘节点</span></span>
<span class="line"><span class="__shiki_wvjl67">3. 环形拓扑: A → B → C → A</span></span>
<span class="line"><span class="__shiki_wvjl67">4. 网状拓扑: 节点间任意连接</span></span></code></pre></div><h3 id="_1-2-复制架构设计" tabindex="-1">1.2 复制架构设计 <a class="header-anchor" href="#_1-2-复制架构设计" aria-label="Permalink to &quot;1.2 复制架构设计&quot;">​</a></h3><h4 id="_1-2-1-系统组件" tabindex="-1">1.2.1 系统组件 <a class="header-anchor" href="#_1-2-1-系统组件" aria-label="Permalink to &quot;1.2.1 系统组件&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">复制系统 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 源数据库 </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> 目标数据库 </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> 复制协议 </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> 检查点</span></span></code></pre></div><h4 id="_1-2-2-复制状态机" tabindex="-1">1.2.2 复制状态机 <a class="header-anchor" href="#_1-2-2-复制状态机" aria-label="Permalink to &quot;1.2.2 复制状态机&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">初始化 → 建立连接 → 获取更改源 → 处理文档 → 更新检查点 → 完成/重试</span></span></code></pre></div><h2 id="二、复制协议详解" tabindex="-1">二、复制协议详解 <a class="header-anchor" href="#二、复制协议详解" aria-label="Permalink to &quot;二、复制协议详解&quot;">​</a></h2><h3 id="_2-1-http-based-复制协议" tabindex="-1">2.1 HTTP-based 复制协议 <a class="header-anchor" href="#_2-1-http-based-复制协议" aria-label="Permalink to &quot;2.1 HTTP-based 复制协议&quot;">​</a></h3><h4 id="_2-1-1-协议流程" tabindex="-1">2.1.1 协议流程 <a class="header-anchor" href="#_2-1-1-协议流程" aria-label="Permalink to &quot;2.1.1 协议流程&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">sequenceDiagram</span></span>
<span class="line"><span class="__shiki_140thh">    participant S as 源数据库</span></span>
<span class="line"><span class="__shiki_140thh">    participant T as 目标数据库</span></span>
<span class="line"><span class="__shiki_140thh">    T-&gt;&gt;S: GET /source_db (获取信息)</span></span>
<span class="line"><span class="__shiki_140thh">    S--&gt;&gt;T: 数据库信息</span></span>
<span class="line"><span class="__shiki_140thh">    T-&gt;&gt;S: POST /_replicate (启动复制)</span></span>
<span class="line"><span class="__shiki_140thh">    T-&gt;&gt;S: GET /source_db/_changes (获取更改)</span></span>
<span class="line"><span class="__shiki_140thh">    loop 文档处理</span></span>
<span class="line"><span class="__shiki_140thh">        T-&gt;&gt;S: GET /source_db/doc (获取文档)</span></span>
<span class="line"><span class="__shiki_140thh">        T-&gt;&gt;T: 写入/更新文档</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    T-&gt;&gt;T: 更新检查点</span></span></code></pre></div><h4 id="_2-1-2-复制会话管理" tabindex="-1">2.1.2 复制会话管理 <a class="header-anchor" href="#_2-1-2-复制会话管理" aria-label="Permalink to &quot;2.1.2 复制会话管理&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 复制会话标识</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;session_id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;a1b2c3d4e5f6&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;source_last_seq&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100-g1AAA...&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;session_start_time&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2024-01-01T10:00:00Z&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-2-couchdb-1-x-vs-2-x-复制协议" tabindex="-1">2.2 CouchDB 1.x vs 2.x+ 复制协议 <a class="header-anchor" href="#_2-2-couchdb-1-x-vs-2-x-复制协议" aria-label="Permalink to &quot;2.2 CouchDB 1.x vs 2.x+ 复制协议&quot;">​</a></h3><h4 id="_2-2-1-couchdb-1-x-复制" tabindex="-1">2.2.1 CouchDB 1.x 复制 <a class="header-anchor" href="#_2-2-1-couchdb-1-x-复制" aria-label="Permalink to &quot;2.2.1 CouchDB 1.x 复制&quot;">​</a></h4><div class="language-http vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">http</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">POST</span><span class="__shiki_140thh"> /_replicate</span></span>
<span class="line"><span class="__shiki_17hn0y">Content-Type</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> application/json</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;source&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;http://localhost:5984/db1&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;target&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;http://localhost:5984/db2&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-2-2-couchdb-2-x-复制-集群模式" tabindex="-1">2.2.2 CouchDB 2.x+ 复制（集群模式） <a class="header-anchor" href="#_2-2-2-couchdb-2-x-复制-集群模式" aria-label="Permalink to &quot;2.2.2 CouchDB 2.x+ 复制（集群模式）&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用 _replicator 数据库</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;_id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;rep_local_to_remote&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;source&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;http://localhost:5984/local_db&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;target&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;http://remote:5984/remote_db&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;continuous&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;create_target&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;owner&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;user123&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="三、更改源-changes-feed-机制" tabindex="-1">三、更改源（Changes Feed）机制 <a class="header-anchor" href="#三、更改源-changes-feed-机制" aria-label="Permalink to &quot;三、更改源（Changes Feed）机制&quot;">​</a></h2><h3 id="_3-1-changes-api-详解" tabindex="-1">3.1 _changes API 详解 <a class="header-anchor" href="#_3-1-changes-api-详解" aria-label="Permalink to &quot;3.1 _changes API 详解&quot;">​</a></h3><h4 id="_3-1-1-api-端点" tabindex="-1">3.1.1 API 端点 <a class="header-anchor" href="#_3-1-1-api-端点" aria-label="Permalink to &quot;3.1.1 API 端点&quot;">​</a></h4><div class="language-http vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">http</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">GET</span><span class="__shiki_140thh"> /{db}/_changes</span></span></code></pre></div><h4 id="_3-1-2-基本参数" tabindex="-1">3.1.2 基本参数 <a class="header-anchor" href="#_3-1-2-基本参数" aria-label="Permalink to &quot;3.1.2 基本参数&quot;">​</a></h4><table tabindex="0"><thead><tr><th>参数</th><th>描述</th><th>示例</th></tr></thead><tbody><tr><td>since</td><td>从指定序列开始</td><td><code>since=100</code></td></tr><tr><td>limit</td><td>限制返回数量</td><td><code>limit=1000</code></td></tr><tr><td>feed</td><td>推送模式</td><td><code>feed=continuous</code></td></tr><tr><td>heartbeat</td><td>心跳间隔(ms)</td><td><code>heartbeat=10000</code></td></tr><tr><td>timeout</td><td>超时时间(ms)</td><td><code>timeout=30000</code></td></tr><tr><td>include_docs</td><td>包含文档</td><td><code>include_docs=true</code></td></tr><tr><td>style</td><td>变更样式</td><td><code>style=all_docs</code></td></tr><tr><td>filter</td><td>过滤函数</td><td><code>filter=design/filter</code></td></tr></tbody></table><h3 id="_3-2-序列号系统" tabindex="-1">3.2 序列号系统 <a class="header-anchor" href="#_3-2-序列号系统" aria-label="Permalink to &quot;3.2 序列号系统&quot;">​</a></h3><h4 id="_3-2-1-序列号格式" tabindex="-1">3.2.1 序列号格式 <a class="header-anchor" href="#_3-2-1-序列号格式" aria-label="Permalink to &quot;3.2.1 序列号格式&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">CouchDB 1.x: 数字序列 (1, 2, 3...)</span></span>
<span class="line"><span class="__shiki_wvjl67">CouchDB 2.x+: 基于向量时钟的序列号</span></span></code></pre></div><h4 id="_3-2-2-序列号示例" tabindex="-1">3.2.2 序列号示例 <a class="header-anchor" href="#_3-2-2-序列号示例" aria-label="Permalink to &quot;3.2.2 序列号示例&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;seq&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100-g1AAAAGJeJzLYWBgYMlgTmFQS0lKzi9KdUhJMjXQy8lP_</span></span>
<span class="line"><span class="__shiki_mdbnqw">          SzW1SE5JNDbQy0vXS87P0ctLLU5J1MvJz0vRS87P0ctLLU5J1E_</span></span>
<span class="line"><span class="__shiki_mdbnqw">          FCMxkZgABGInC2IxG4CUwEAApREiw&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;doc123&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;changes&quot;</span><span class="__shiki_140thh">: [{</span><span class="__shiki_dzsirb">&quot;rev&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;3-abc123def456&quot;</span><span class="__shiki_140thh">}]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-3-更改源类型" tabindex="-1">3.3 更改源类型 <a class="header-anchor" href="#_3-3-更改源类型" aria-label="Permalink to &quot;3.3 更改源类型&quot;">​</a></h3><h4 id="_3-3-1-普通更改源-normal" tabindex="-1">3.3.1 普通更改源（Normal） <a class="header-anchor" href="#_3-3-1-普通更改源-normal" aria-label="Permalink to &quot;3.3.1 普通更改源（Normal）&quot;">​</a></h4><div class="language-http vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">http</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">GET</span><span class="__shiki_140thh"> /db/_changes?since=0&amp;limit=10</span></span></code></pre></div><p>响应格式：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;results&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;seq&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1-...&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;doc1&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;changes&quot;</span><span class="__shiki_140thh">: [{</span><span class="__shiki_dzsirb">&quot;rev&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1-aaa&quot;</span><span class="__shiki_140thh">}],</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;deleted&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">  // 可选，表示删除</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  ],</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;last_seq&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1-...&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-3-2-长轮询-long-poll" tabindex="-1">3.3.2 长轮询（Long Poll） <a class="header-anchor" href="#_3-3-2-长轮询-long-poll" aria-label="Permalink to &quot;3.3.2 长轮询（Long Poll）&quot;">​</a></h4><div class="language-http vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">http</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">GET</span><span class="__shiki_140thh"> /db/_changes?feed=longpoll&amp;since=100&amp;timeout=10000</span></span></code></pre></div><ul><li>等待新更改或超时</li><li>适用于实时性要求不高的场景</li></ul><h4 id="_3-3-3-连续更改源-continuous" tabindex="-1">3.3.3 连续更改源（Continuous） <a class="header-anchor" href="#_3-3-3-连续更改源-continuous" aria-label="Permalink to &quot;3.3.3 连续更改源（Continuous）&quot;">​</a></h4><div class="language-http vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">http</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">GET</span><span class="__shiki_140thh"> /db/_changes?feed=continuous&amp;since=now&amp;heartbeat=10000</span></span></code></pre></div><p>响应流：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span><span class="__shiki_dzsirb">&quot;seq&quot;</span><span class="__shiki_140thh">:</span><span class="__shiki_mdbnqw">&quot;101-...&quot;</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">&quot;id&quot;</span><span class="__shiki_140thh">:</span><span class="__shiki_mdbnqw">&quot;doc101&quot;</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">&quot;changes&quot;</span><span class="__shiki_140thh">:[{</span><span class="__shiki_dzsirb">&quot;rev&quot;</span><span class="__shiki_140thh">:</span><span class="__shiki_mdbnqw">&quot;1-bbb&quot;</span><span class="__shiki_140thh">}]}</span></span>
<span class="line"><span class="__shiki_140thh">{</span><span class="__shiki_dzsirb">&quot;seq&quot;</span><span class="__shiki_140thh">:</span><span class="__shiki_mdbnqw">&quot;102-...&quot;</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">&quot;id&quot;</span><span class="__shiki_140thh">:</span><span class="__shiki_mdbnqw">&quot;doc102&quot;</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">&quot;changes&quot;</span><span class="__shiki_140thh">:[{</span><span class="__shiki_dzsirb">&quot;rev&quot;</span><span class="__shiki_140thh">:</span><span class="__shiki_mdbnqw">&quot;1-ccc&quot;</span><span class="__shiki_140thh">}]}</span></span>
<span class="line"><span class="__shiki_140thh">...</span></span></code></pre></div><h2 id="四、复制流程详细解析" tabindex="-1">四、复制流程详细解析 <a class="header-anchor" href="#四、复制流程详细解析" aria-label="Permalink to &quot;四、复制流程详细解析&quot;">​</a></h2><h3 id="_4-1-复制初始化阶段" tabindex="-1">4.1 复制初始化阶段 <a class="header-anchor" href="#_4-1-复制初始化阶段" aria-label="Permalink to &quot;4.1 复制初始化阶段&quot;">​</a></h3><h4 id="_4-1-1-源数据库验证" tabindex="-1">4.1.1 源数据库验证 <a class="header-anchor" href="#_4-1-1-源数据库验证" aria-label="Permalink to &quot;4.1.1 源数据库验证&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> validateReplicationSource</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">source</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">target</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 1. 检查源数据库是否存在</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> sourceInfo</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_140thh">source</span><span class="__shiki_mdbnqw">}/\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 2. 验证权限</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> auth</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> authenticate</span><span class="__shiki_140thh">(source);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 3. 检查兼容性</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> compatible</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> checkCompatibility</span><span class="__shiki_140thh">(sourceInfo, target);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> { valid: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, sourceInfo, auth };</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_4-1-2-目标数据库准备" tabindex="-1">4.1.2 目标数据库准备 <a class="header-anchor" href="#_4-1-2-目标数据库准备" aria-label="Permalink to &quot;4.1.2 目标数据库准备&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> prepareTargetDatabase</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">target</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">createTarget</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> targetInfo</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_140thh">target</span><span class="__shiki_mdbnqw">}/\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> { exists: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, targetInfo };</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (createTarget </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> error.status </span><span class="__shiki_1itgoe">===</span><span class="__shiki_dzsirb"> 404</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 创建目标数据库</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(target, { method: </span><span class="__shiki_mdbnqw">&#39;PUT&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> { exists: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, created: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-更改获取阶段" tabindex="-1">4.2 更改获取阶段 <a class="header-anchor" href="#_4-2-更改获取阶段" aria-label="Permalink to &quot;4.2 更改获取阶段&quot;">​</a></h3><h4 id="_4-2-1-获取检查点" tabindex="-1">4.2.1 获取检查点 <a class="header-anchor" href="#_4-2-1-获取检查点" aria-label="Permalink to &quot;4.2.1 获取检查点&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> getReplicationCheckpoint</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">source</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">target</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">repId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> checkpointDocId</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> \`_local/\${</span><span class="__shiki_140thh">repId</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> doc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_140thh">target</span><span class="__shiki_mdbnqw">}/\${</span><span class="__shiki_140thh">checkpointDocId</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> doc.last_seq </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (error.status </span><span class="__shiki_1itgoe">===</span><span class="__shiki_dzsirb"> 404</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 首次复制</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_4-2-2-增量获取更改" tabindex="-1">4.2.2 增量获取更改 <a class="header-anchor" href="#_4-2-2-增量获取更改" aria-label="Permalink to &quot;4.2.2 增量获取更改&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> fetchChanges</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">source</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">since</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">batchSize</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 500</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> params</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> URLSearchParams</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">    since: since,</span></span>
<span class="line"><span class="__shiki_140thh">    limit: batchSize,</span></span>
<span class="line"><span class="__shiki_140thh">    include_docs: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    style: </span><span class="__shiki_mdbnqw">&#39;all_docs&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_140thh">source</span><span class="__shiki_mdbnqw">}/_changes?\${</span><span class="__shiki_140thh">params</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> data</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> response.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    results: data.results,</span></span>
<span class="line"><span class="__shiki_140thh">    last_seq: data.last_seq,</span></span>
<span class="line"><span class="__shiki_140thh">    pending: data.pending </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-3-文档处理阶段" tabindex="-1">4.3 文档处理阶段 <a class="header-anchor" href="#_4-3-文档处理阶段" aria-label="Permalink to &quot;4.3 文档处理阶段&quot;">​</a></h3><h4 id="_4-3-1-批量文档处理" tabindex="-1">4.3.1 批量文档处理 <a class="header-anchor" href="#_4-3-1-批量文档处理" aria-label="Permalink to &quot;4.3.1 批量文档处理&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> processChangesBatch</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">target</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">changes</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> bulkDocs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    docs: []</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> change</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> changes) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (change.deleted) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 处理删除</span></span>
<span class="line"><span class="__shiki_140thh">      bulkDocs.docs.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        _id: change.id,</span></span>
<span class="line"><span class="__shiki_140thh">        _rev: change.changes[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">].rev,</span></span>
<span class="line"><span class="__shiki_140thh">        _deleted: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (change.doc) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 处理文档更新/创建</span></span>
<span class="line"><span class="__shiki_140thh">      bulkDocs.docs.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(change.doc);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 批量写入</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_140thh">target</span><span class="__shiki_mdbnqw">}/_bulk_docs\`</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">    method: </span><span class="__shiki_mdbnqw">&#39;POST&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    body: </span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">(bulkDocs),</span></span>
<span class="line"><span class="__shiki_140thh">    headers: { </span><span class="__shiki_mdbnqw">&#39;Content-Type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;application/json&#39;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> response.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_4-3-2-冲突检测与处理" tabindex="-1">4.3.2 冲突检测与处理 <a class="header-anchor" href="#_4-3-2-冲突检测与处理" aria-label="Permalink to &quot;4.3.2 冲突检测与处理&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> handleReplicationConflicts</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">target</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">doc</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">existingRev</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 检查是否需要更新</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">shouldUpdate</span><span class="__shiki_140thh">(doc._rev, existingRev)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_1t8gfj"> saveDocument</span><span class="__shiki_140thh">(target, doc);</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> { success: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, action: </span><span class="__shiki_mdbnqw">&#39;updated&#39;</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (error.status </span><span class="__shiki_1itgoe">===</span><span class="__shiki_dzsirb"> 409</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 冲突发生</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> { </span></span>
<span class="line"><span class="__shiki_140thh">          success: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">          conflict: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          docId: doc._id,</span></span>
<span class="line"><span class="__shiki_140thh">          existingRevs: </span><span class="__shiki_1itgoe">await</span><span class="__shiki_1t8gfj"> getDocumentRevs</span><span class="__shiki_140thh">(target, doc._id)</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> { success: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, action: </span><span class="__shiki_mdbnqw">&#39;skipped&#39;</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> shouldUpdate</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">newRev</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">existingRev</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 比较修订版本号</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> newGen</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> parseInt</span><span class="__shiki_140thh">(newRev.</span><span class="__shiki_1t8gfj">split</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;-&#39;</span><span class="__shiki_140thh">)[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]);</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> existingGen</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> parseInt</span><span class="__shiki_140thh">(existingRev.</span><span class="__shiki_1t8gfj">split</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;-&#39;</span><span class="__shiki_140thh">)[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (newGen </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> existingGen) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (newGen </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> existingGen) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 同世代比较哈希</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> newRev </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_140thh"> existingRev;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-4-检查点更新阶段" tabindex="-1">4.4 检查点更新阶段 <a class="header-anchor" href="#_4-4-检查点更新阶段" aria-label="Permalink to &quot;4.4 检查点更新阶段&quot;">​</a></h3><h4 id="_4-4-1-保存检查点" tabindex="-1">4.4.1 保存检查点 <a class="header-anchor" href="#_4-4-1-保存检查点" aria-label="Permalink to &quot;4.4.1 保存检查点&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> saveCheckpoint</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">target</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">repId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">lastSeq</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">sessionId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> checkpointDoc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    _id: </span><span class="__shiki_mdbnqw">\`_local/\${</span><span class="__shiki_140thh">repId</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    last_seq: lastSeq,</span></span>
<span class="line"><span class="__shiki_140thh">    recorded_seq: lastSeq,</span></span>
<span class="line"><span class="__shiki_140thh">    session_id: sessionId,</span></span>
<span class="line"><span class="__shiki_140thh">    source_last_seq: lastSeq,</span></span>
<span class="line"><span class="__shiki_140thh">    replication_id_version: </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    history: [</span></span>
<span class="line"><span class="__shiki_140thh">      {</span></span>
<span class="line"><span class="__shiki_140thh">        session_id: sessionId,</span></span>
<span class="line"><span class="__shiki_140thh">        start_time: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        end_time: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        start_last_seq: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        end_last_seq: lastSeq,</span></span>
<span class="line"><span class="__shiki_140thh">        recorded_seq: lastSeq,</span></span>
<span class="line"><span class="__shiki_140thh">        missing_checked: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        missing_found: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        docs_read: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        docs_written: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        doc_write_failures: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  await</span><span class="__shiki_1t8gfj"> saveDocument</span><span class="__shiki_140thh">(target, checkpointDoc);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="五、连续复制详解" tabindex="-1">五、连续复制详解 <a class="header-anchor" href="#五、连续复制详解" aria-label="Permalink to &quot;五、连续复制详解&quot;">​</a></h2><h3 id="_5-1-连续复制工作原理" tabindex="-1">5.1 连续复制工作原理 <a class="header-anchor" href="#_5-1-连续复制工作原理" aria-label="Permalink to &quot;5.1 连续复制工作原理&quot;">​</a></h3><h4 id="_5-1-1-监控循环" tabindex="-1">5.1.1 监控循环 <a class="header-anchor" href="#_5-1-1-监控循环" aria-label="Permalink to &quot;5.1.1 监控循环&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ContinuousReplication</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">source</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">target</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">options</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.source </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> source;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.target </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> target;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.options </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> options;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.isRunning </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.checkpoint </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> start</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.isRunning </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    while</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.isRunning) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">replicateBatch</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 等待新更改或心跳</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">waitForChanges</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;复制错误:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">backoffAndRetry</span><span class="__shiki_140thh">(error);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> stop</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.isRunning </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_5-1-2-更改监听器" tabindex="-1">5.1.2 更改监听器 <a class="header-anchor" href="#_5-1-2-更改监听器" aria-label="Permalink to &quot;5.1.2 更改监听器&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> listenForChanges</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">source</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">since</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">callback</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> params</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> URLSearchParams</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">    feed: </span><span class="__shiki_mdbnqw">&#39;continuous&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    since: since,</span></span>
<span class="line"><span class="__shiki_140thh">    heartbeat: </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    include_docs: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    style: </span><span class="__shiki_mdbnqw">&#39;all_docs&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_140thh">source</span><span class="__shiki_mdbnqw">}/_changes?\${</span><span class="__shiki_140thh">params</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> reader</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> response.body.</span><span class="__shiki_1t8gfj">getReader</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> decoder</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> TextDecoder</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  let</span><span class="__shiki_140thh"> buffer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  while</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">done</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">value</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> reader.</span><span class="__shiki_1t8gfj">read</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (done) </span><span class="__shiki_1itgoe">break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    buffer </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> decoder.</span><span class="__shiki_1t8gfj">decode</span><span class="__shiki_140thh">(value);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 解析JSON行</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> lines</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> buffer.</span><span class="__shiki_1t8gfj">split</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    buffer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> lines.</span><span class="__shiki_1t8gfj">pop</span><span class="__shiki_140thh">(); </span><span class="__shiki_21nrsd">// 保留未完成的行</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> line</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> lines) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (line.</span><span class="__shiki_1t8gfj">trim</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">          const</span><span class="__shiki_dzsirb"> change</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">parse</span><span class="__shiki_140thh">(line);</span></span>
<span class="line"><span class="__shiki_1itgoe">          await</span><span class="__shiki_1t8gfj"> callback</span><span class="__shiki_140thh">(change);</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">          console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;解析更改错误:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-心跳与健康检查" tabindex="-1">5.2 心跳与健康检查 <a class="header-anchor" href="#_5-2-心跳与健康检查" aria-label="Permalink to &quot;5.2 心跳与健康检查&quot;">​</a></h3><h4 id="_5-2-1-心跳机制" tabindex="-1">5.2.1 心跳机制 <a class="header-anchor" href="#_5-2-1-心跳机制" aria-label="Permalink to &quot;5.2.1 心跳机制&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> monitorReplicationHealth</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">replication</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">options</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">checkInterval</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 30000</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">timeout</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 60000</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> options;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  let</span><span class="__shiki_140thh"> lastActivity </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 更新活动时间戳</span></span>
<span class="line"><span class="__shiki_140thh">  replication.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;activity&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    lastActivity </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 健康检查循环</span></span>
<span class="line"><span class="__shiki_1t8gfj">  setInterval</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> idleTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> lastActivity;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (idleTime </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> timeout) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;复制空闲超时，重新启动...&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      replication.</span><span class="__shiki_1t8gfj">restart</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查连接状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">    checkConnection</span><span class="__shiki_140thh">(replication.source)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">catch</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;源数据库连接失败&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">  }, checkInterval);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="六、过滤复制" tabindex="-1">六、过滤复制 <a class="header-anchor" href="#六、过滤复制" aria-label="Permalink to &quot;六、过滤复制&quot;">​</a></h2><h3 id="_6-1-过滤函数设计" tabindex="-1">6.1 过滤函数设计 <a class="header-anchor" href="#_6-1-过滤函数设计" aria-label="Permalink to &quot;6.1 过滤函数设计&quot;">​</a></h3><h4 id="_6-1-1-基础过滤函数" tabindex="-1">6.1.1 基础过滤函数 <a class="header-anchor" href="#_6-1-1-基础过滤函数" aria-label="Permalink to &quot;6.1.1 基础过滤函数&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 设计文档中的过滤函数</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;_id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;_design/filters&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;filters&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;by_type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">      function(doc, req) {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        // 按文档类型过滤</span></span>
<span class="line"><span class="__shiki_mdbnqw">        return doc.type === req.query.type;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;by_user&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">      function(doc, req) {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        // 按用户ID过滤</span></span>
<span class="line"><span class="__shiki_mdbnqw">        if (doc.type === &#39;user_profile&#39;) {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          return doc.userId === req.query.userId;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        if (doc.type === &#39;user_data&#39;) {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          return doc.owner === req.query.userId;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        return false;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;by_date_range&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">      function(doc, req) {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        // 按日期范围过滤</span></span>
<span class="line"><span class="__shiki_mdbnqw">        if (!doc.created_at) return false;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        const docDate = new Date(doc.created_at);</span></span>
<span class="line"><span class="__shiki_mdbnqw">        const startDate = new Date(req.query.startDate);</span></span>
<span class="line"><span class="__shiki_mdbnqw">        const endDate = new Date(req.query.endDate);</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        return docDate &gt;= startDate &amp;&amp; docDate &lt;= endDate;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_6-1-2-复杂过滤逻辑" tabindex="-1">6.1.2 复杂过滤逻辑 <a class="header-anchor" href="#_6-1-2-复杂过滤逻辑" aria-label="Permalink to &quot;6.1.2 复杂过滤逻辑&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;filters&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;selective_replication&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">      function(doc, req) {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        // 复杂的业务逻辑过滤</span></span>
<span class="line"><span class="__shiki_mdbnqw">        var query = req.query;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        // 1. 检查文档类型</span></span>
<span class="line"><span class="__shiki_mdbnqw">        if (!doc.type) return false;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        // 2. 基于角色过滤</span></span>
<span class="line"><span class="__shiki_mdbnqw">        var userRole = query.role || &#39;user&#39;;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        var docRoles = doc.access_roles || [&#39;public&#39;];</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        if (!docRoles.includes(userRole) &amp;&amp; !docRoles.includes(&#39;public&#39;)) {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          return false;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        // 3. 基于地理位置过滤（如果文档有位置信息）</span></span>
<span class="line"><span class="__shiki_mdbnqw">        if (doc.location &amp;&amp; query.location) {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          var distance = calculateDistance(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            doc.location,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            query.location</span></span>
<span class="line"><span class="__shiki_mdbnqw">          );</span></span>
<span class="line"><span class="__shiki_mdbnqw">          if (distance &gt; query.maxDistance) {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            return false;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        // 4. 基于时间过滤</span></span>
<span class="line"><span class="__shiki_mdbnqw">        if (doc.expires_at &amp;&amp; new Date(doc.expires_at) &lt; new Date()) {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          return false;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        return true;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-使用过滤复制" tabindex="-1">6.2 使用过滤复制 <a class="header-anchor" href="#_6-2-使用过滤复制" aria-label="Permalink to &quot;6.2 使用过滤复制&quot;">​</a></h3><h4 id="_6-2-1-基本过滤复制" tabindex="-1">6.2.1 基本过滤复制 <a class="header-anchor" href="#_6-2-1-基本过滤复制" aria-label="Permalink to &quot;6.2.1 基本过滤复制&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 启动过滤复制</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> replication</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  source: </span><span class="__shiki_mdbnqw">&#39;http://localhost:5984/source_db&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  target: </span><span class="__shiki_mdbnqw">&#39;http://localhost:5984/target_db&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  filter: </span><span class="__shiki_mdbnqw">&#39;filters/by_type&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  query_params: {</span></span>
<span class="line"><span class="__shiki_140thh">    type: </span><span class="__shiki_mdbnqw">&#39;order&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  continuous: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">await</span><span class="__shiki_1t8gfj"> startReplication</span><span class="__shiki_140thh">(replication);</span></span></code></pre></div><h4 id="_6-2-2-动态过滤复制" tabindex="-1">6.2.2 动态过滤复制 <a class="header-anchor" href="#_6-2-2-动态过滤复制" aria-label="Permalink to &quot;6.2.2 动态过滤复制&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> DynamicFilterReplication</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">source</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">target</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">filterLogic</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.source </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> source;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.target </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> target;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.filterLogic </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> filterLogic;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.activeFilters </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  addFilter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">filterId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">filterFn</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">params</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建过滤设计文档</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> designDoc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      _id: </span><span class="__shiki_mdbnqw">\`_design/filter_\${</span><span class="__shiki_140thh">filterId</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      filters: {</span></span>
<span class="line"><span class="__shiki_140thh">        dynamic: filterFn.</span><span class="__shiki_1t8gfj">toString</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 保存到源数据库</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_1t8gfj"> saveDesignDoc</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.source, designDoc);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 启动复制</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> repId</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> \`rep_\${</span><span class="__shiki_140thh">filterId</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> replication</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      _id: repId,</span></span>
<span class="line"><span class="__shiki_140thh">      source: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.source,</span></span>
<span class="line"><span class="__shiki_140thh">      target: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.target,</span></span>
<span class="line"><span class="__shiki_140thh">      filter: </span><span class="__shiki_mdbnqw">\`filter_\${</span><span class="__shiki_140thh">filterId</span><span class="__shiki_mdbnqw">}/dynamic\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      query_params: params,</span></span>
<span class="line"><span class="__shiki_140thh">      continuous: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.activeFilters.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(filterId, replication);</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_1t8gfj"> startReplication</span><span class="__shiki_140thh">(replication);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  updateFilter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">filterId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">newParams</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> replication</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.activeFilters.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(filterId);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (replication) {</span></span>
<span class="line"><span class="__shiki_140thh">      replication.query_params </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> newParams;</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_1t8gfj"> restartReplication</span><span class="__shiki_140thh">(replication);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="七、复制冲突与解决策略" tabindex="-1">七、复制冲突与解决策略 <a class="header-anchor" href="#七、复制冲突与解决策略" aria-label="Permalink to &quot;七、复制冲突与解决策略&quot;">​</a></h2><h3 id="_7-1-复制冲突检测" tabindex="-1">7.1 复制冲突检测 <a class="header-anchor" href="#_7-1-复制冲突检测" aria-label="Permalink to &quot;7.1 复制冲突检测&quot;">​</a></h3><h4 id="_7-1-1-冲突检测算法" tabindex="-1">7.1.1 冲突检测算法 <a class="header-anchor" href="#_7-1-1-冲突检测算法" aria-label="Permalink to &quot;7.1.1 冲突检测算法&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> detectReplicationConflicts</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">sourceDoc</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">targetDoc</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">targetDoc) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh"> { hasConflict: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 检查修订历史</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> sourceRevs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> getAllRevisions</span><span class="__shiki_140thh">(sourceDoc);</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> targetRevs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> getAllRevisions</span><span class="__shiki_140thh">(targetDoc);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 查找共同祖先</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> commonAncestor</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> findCommonAncestor</span><span class="__shiki_140thh">(sourceRevs, targetRevs);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">commonAncestor) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 无共同祖先，可能是完全不同的分支</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> { </span></span>
<span class="line"><span class="__shiki_140thh">      hasConflict: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">      type: </span><span class="__shiki_mdbnqw">&#39;divergent_branches&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      sourceRevs,</span></span>
<span class="line"><span class="__shiki_140thh">      targetRevs </span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 检查是否一个版本是另一个的后代</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> sourceIsDescendant</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> isDescendant</span><span class="__shiki_140thh">(sourceDoc._rev, targetDoc._rev);</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> targetIsDescendant</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> isDescendant</span><span class="__shiki_140thh">(targetDoc._rev, sourceDoc._rev);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (sourceIsDescendant) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> { hasConflict: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">, shouldUpdate: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (targetIsDescendant) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> { hasConflict: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">, shouldUpdate: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 冲突：两个版本从共同祖先分叉</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> { </span></span>
<span class="line"><span class="__shiki_140thh">      hasConflict: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">      type: </span><span class="__shiki_mdbnqw">&#39;sibling_conflict&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      commonAncestor,</span></span>
<span class="line"><span class="__shiki_140thh">      sourceRev: sourceDoc._rev,</span></span>
<span class="line"><span class="__shiki_140thh">      targetRev: targetDoc._rev</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-自动冲突解决" tabindex="-1">7.2 自动冲突解决 <a class="header-anchor" href="#_7-2-自动冲突解决" aria-label="Permalink to &quot;7.2 自动冲突解决&quot;">​</a></h3><h4 id="_7-2-1-基于时间戳的解决" tabindex="-1">7.2.1 基于时间戳的解决 <a class="header-anchor" href="#_7-2-1-基于时间戳的解决" aria-label="Permalink to &quot;7.2.1 基于时间戳的解决&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> resolveConflictByTimestamp</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">docId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">sourceDoc</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">targetDoc</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> sourceTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> getDocumentTimestamp</span><span class="__shiki_140thh">(sourceDoc);</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> targetTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> getDocumentTimestamp</span><span class="__shiki_140thh">(targetDoc);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  let</span><span class="__shiki_140thh"> winningDoc, losingDoc;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (sourceTime </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> targetTime) {</span></span>
<span class="line"><span class="__shiki_140thh">    winningDoc </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sourceDoc;</span></span>
<span class="line"><span class="__shiki_140thh">    losingDoc </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> targetDoc;</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    winningDoc </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> targetDoc;</span></span>
<span class="line"><span class="__shiki_140thh">    losingDoc </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sourceDoc;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 保存获胜版本</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> saveDocument</span><span class="__shiki_140thh">(db, winningDoc);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 标记冲突版本</span></span>
<span class="line"><span class="__shiki_1itgoe">  await</span><span class="__shiki_1t8gfj"> markAsConflict</span><span class="__shiki_140thh">(db, docId, losingDoc._rev);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_7-2-2-基于业务规则的解决" tabindex="-1">7.2.2 基于业务规则的解决 <a class="header-anchor" href="#_7-2-2-基于业务规则的解决" aria-label="Permalink to &quot;7.2.2 基于业务规则的解决&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> BusinessRuleConflictResolver</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">rules</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.rules </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> rules;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> resolve</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">docId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">versions</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 应用业务规则</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> winningVersion</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">applyRules</span><span class="__shiki_140thh">(versions);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 合并数据（如果需要）</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">shouldMerge</span><span class="__shiki_140thh">(versions)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> mergedDoc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">mergeVersions</span><span class="__shiki_140thh">(versions);</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> saveDocument</span><span class="__shiki_140thh">(db, mergedDoc);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 保存获胜版本</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> saveDocument</span><span class="__shiki_140thh">(db, winningVersion.doc);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 处理失败版本</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> version</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> versions) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (version.rev </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_140thh"> winningVersion.rev) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_1t8gfj"> markAsConflict</span><span class="__shiki_140thh">(db, docId, version.rev);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  applyRules</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">versions</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 规则1：优先选择有更高优先级的版本</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> priorityVersion</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> versions.</span><span class="__shiki_1t8gfj">reduce</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">highest</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">current</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> (current.priority </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> (highest.priority </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">             current </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> highest;</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 规则2：优先选择验证通过的版本</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> validatedVersions</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> versions.</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">v</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> v.validated);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (validatedVersions.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> validatedVersions[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 规则3：优先选择最新编辑的版本</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> versions.</span><span class="__shiki_1t8gfj">reduce</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">latest</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">current</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(current.updated_at </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">             new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(latest.updated_at </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> current </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> latest;</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="八、集群环境下的复制" tabindex="-1">八、集群环境下的复制 <a class="header-anchor" href="#八、集群环境下的复制" aria-label="Permalink to &quot;八、集群环境下的复制&quot;">​</a></h2><h3 id="_8-1-couchdb-2-x-集群复制" tabindex="-1">8.1 CouchDB 2.x+ 集群复制 <a class="header-anchor" href="#_8-1-couchdb-2-x-集群复制" aria-label="Permalink to &quot;8.1 CouchDB 2.x+ 集群复制&quot;">​</a></h3><h4 id="_8-1-1-集群架构" tabindex="-1">8.1.1 集群架构 <a class="header-anchor" href="#_8-1-1-集群架构" aria-label="Permalink to &quot;8.1.1 集群架构&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">CouchDB 2.x+ 使用三节点集群</span></span>
<span class="line"><span class="__shiki_wvjl67">每个分片在多个节点上有副本</span></span>
<span class="line"><span class="__shiki_wvjl67">复制发生在分片级别和数据库级别</span></span></code></pre></div><h4 id="_8-1-2-集群复制配置" tabindex="-1">8.1.2 集群复制配置 <a class="header-anchor" href="#_8-1-2-集群复制配置" aria-label="Permalink to &quot;8.1.2 集群复制配置&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;_id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;cluster_replication&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;source&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;url&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;http://cluster1:5984&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;headers&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;Authorization&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Basic ...&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;target&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;url&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;http://cluster2:5984&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;headers&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;Authorization&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Basic ...&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;databases&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;db1&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;filter&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;design/by_region&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;query_params&quot;</span><span class="__shiki_140thh">: { </span><span class="__shiki_mdbnqw">&quot;region&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;us-east&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;db2&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;filter&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;design/by_type&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;query_params&quot;</span><span class="__shiki_140thh">: { </span><span class="__shiki_mdbnqw">&quot;type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;log&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;cluster_options&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;worker_processes&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;http_connections&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;socket_options&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;keepalive&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;nodelay&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-2-分片感知复制" tabindex="-1">8.2 分片感知复制 <a class="header-anchor" href="#_8-2-分片感知复制" aria-label="Permalink to &quot;8.2 分片感知复制&quot;">​</a></h3><h4 id="_8-2-1-分片识别" tabindex="-1">8.2.1 分片识别 <a class="header-anchor" href="#_8-2-1-分片识别" aria-label="Permalink to &quot;8.2.1 分片识别&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> replicateShardedDatabase</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">sourceCluster</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">targetCluster</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">dbName</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 获取分片信息</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> shards</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> getDatabaseShards</span><span class="__shiki_140thh">(sourceCluster, dbName);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 并行复制每个分片</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> replicationPromises</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> shards.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">shard</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> sourceShard</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> \`\${</span><span class="__shiki_140thh">sourceCluster</span><span class="__shiki_mdbnqw">}/\${</span><span class="__shiki_140thh">shard</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> targetShard</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> \`\${</span><span class="__shiki_140thh">targetCluster</span><span class="__shiki_mdbnqw">}/\${</span><span class="__shiki_140thh">shard</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> replicate</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      source: sourceShard,</span></span>
<span class="line"><span class="__shiki_140thh">      target: targetShard,</span></span>
<span class="line"><span class="__shiki_140thh">      continuous: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  await</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">all</span><span class="__shiki_140thh">(replicationPromises);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="九、监控与管理" tabindex="-1">九、监控与管理 <a class="header-anchor" href="#九、监控与管理" aria-label="Permalink to &quot;九、监控与管理&quot;">​</a></h2><h3 id="_9-1-复制状态监控" tabindex="-1">9.1 复制状态监控 <a class="header-anchor" href="#_9-1-复制状态监控" aria-label="Permalink to &quot;9.1 复制状态监控&quot;">​</a></h3><h4 id="_9-1-1-监控端点" tabindex="-1">9.1.1 监控端点 <a class="header-anchor" href="#_9-1-1-监控端点" aria-label="Permalink to &quot;9.1.1 监控端点&quot;">​</a></h4><div class="language-http vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">http</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 获取活动复制任务</span></span>
<span class="line"><span class="__shiki_1itgoe">GET</span><span class="__shiki_140thh"> /_active_tasks</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 获取复制器状态</span></span>
<span class="line"><span class="__shiki_1itgoe">GET</span><span class="__shiki_140thh"> /_scheduler/jobs</span></span>
<span class="line"><span class="__shiki_1itgoe">GET</span><span class="__shiki_140thh"> /_scheduler/docs/_replicator</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 获取数据库复制状态</span></span>
<span class="line"><span class="__shiki_1itgoe">GET</span><span class="__shiki_140thh"> /{db}/_replication_status</span></span></code></pre></div><h4 id="_9-1-2-监控指标" tabindex="-1">9.1.2 监控指标 <a class="header-anchor" href="#_9-1-2-监控指标" aria-label="Permalink to &quot;9.1.2 监控指标&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ReplicationMonitor</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.metrics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      docsRead: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      docsWritten: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      writeFailures: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      checkpointFrequency: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      replicationLag: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      throughput: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> collectMetrics</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">replicationId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取复制任务状态</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> job</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> getSchedulerJob</span><span class="__shiki_140thh">(replicationId);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> doc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> getReplicatorDoc</span><span class="__shiki_140thh">(replicationId);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> metrics</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      id: replicationId,</span></span>
<span class="line"><span class="__shiki_140thh">      state: job.state,</span></span>
<span class="line"><span class="__shiki_140thh">      source: doc.source,</span></span>
<span class="line"><span class="__shiki_140thh">      target: doc.target,</span></span>
<span class="line"><span class="__shiki_140thh">      docs_read: job.docs_read </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      docs_written: job.docs_written </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      doc_write_failures: job.doc_write_failures </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      started_on: job.started_on,</span></span>
<span class="line"><span class="__shiki_140thh">      updated_on: job.updated_on,</span></span>
<span class="line"><span class="__shiki_140thh">      source_seq: job.source_seq,</span></span>
<span class="line"><span class="__shiki_140thh">      checkpointed_source_seq: job.checkpointed_source_seq,</span></span>
<span class="line"><span class="__shiki_140thh">      replication_lag_ms: </span><span class="__shiki_1t8gfj">calculateLag</span><span class="__shiki_140thh">(job.source_seq, job.checkpointed_source_seq)</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> metrics;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> alertOnIssues</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">metrics</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">thresholds</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> issues</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查复制延迟</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (metrics.replication_lag_ms </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> thresholds.maxLag) {</span></span>
<span class="line"><span class="__shiki_140thh">      issues.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        level: </span><span class="__shiki_mdbnqw">&#39;warning&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        message: </span><span class="__shiki_mdbnqw">\`复制延迟过高: \${</span><span class="__shiki_140thh">metrics</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">replication_lag_ms</span><span class="__shiki_mdbnqw">}ms\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        metric: </span><span class="__shiki_mdbnqw">&#39;replication_lag&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查失败率</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> failureRate</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> metrics.doc_write_failures </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                       (metrics.docs_written </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> metrics.doc_write_failures);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (failureRate </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> thresholds.maxFailureRate) {</span></span>
<span class="line"><span class="__shiki_140thh">      issues.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        level: </span><span class="__shiki_mdbnqw">&#39;error&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        message: </span><span class="__shiki_mdbnqw">\`复制失败率过高: \${</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_140thh">failureRate</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_mdbnqw">).</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}%\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        metric: </span><span class="__shiki_mdbnqw">&#39;failure_rate&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> issues;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_9-2-性能优化" tabindex="-1">9.2 性能优化 <a class="header-anchor" href="#_9-2-性能优化" aria-label="Permalink to &quot;9.2 性能优化&quot;">​</a></h3><h4 id="_9-2-1-批量处理优化" tabindex="-1">9.2.1 批量处理优化 <a class="header-anchor" href="#_9-2-1-批量处理优化" aria-label="Permalink to &quot;9.2.1 批量处理优化&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> optimizedBatchReplication</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">source</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">target</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">options</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">    batchSize</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 500</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    concurrency</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    checkpointInterval</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> options;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  let</span><span class="__shiki_140thh"> lastSeq </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> getCheckpoint</span><span class="__shiki_140thh">(target);</span></span>
<span class="line"><span class="__shiki_1itgoe">  let</span><span class="__shiki_140thh"> processedCount </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  while</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取一批更改</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> changes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetchChanges</span><span class="__shiki_140thh">(source, lastSeq, batchSize);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (changes.results.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 并行处理多个批次</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> batches</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> splitIntoBatches</span><span class="__shiki_140thh">(changes.results, concurrency);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> batchPromises</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> batches.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">batch</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1t8gfj">      processChangesBatch</span><span class="__shiki_140thh">(target, batch)</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">all</span><span class="__shiki_140thh">(batchPromises);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 更新检查点</span></span>
<span class="line"><span class="__shiki_140thh">    processedCount </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> changes.results.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (processedCount </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> checkpointInterval) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_1t8gfj"> saveCheckpoint</span><span class="__shiki_140thh">(target, changes.last_seq);</span></span>
<span class="line"><span class="__shiki_140thh">      processedCount </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    lastSeq </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> changes.last_seq;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 最终检查点</span></span>
<span class="line"><span class="__shiki_1itgoe">  await</span><span class="__shiki_1t8gfj"> saveCheckpoint</span><span class="__shiki_140thh">(target, lastSeq);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_9-2-2-连接池管理" tabindex="-1">9.2.2 连接池管理 <a class="header-anchor" href="#_9-2-2-连接池管理" aria-label="Permalink to &quot;9.2.2 连接池管理&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ReplicationConnectionPool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">maxConnections</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.maxConnections </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> maxConnections;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.activeConnections </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Set</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.waitingQueue </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> acquireConnection</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">url</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.activeConnections.size </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.maxConnections) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> connection</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> createConnection</span><span class="__shiki_140thh">(url);</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.activeConnections.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(connection);</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> connection;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 等待可用连接</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.waitingQueue.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({ resolve, url });</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  releaseConnection</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">connection</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.activeConnections.</span><span class="__shiki_1t8gfj">delete</span><span class="__shiki_140thh">(connection);</span></span>
<span class="line"><span class="__shiki_140thh">    connection.</span><span class="__shiki_1t8gfj">close</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 处理等待队列</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.waitingQueue.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">resolve</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">url</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.waitingQueue.</span><span class="__shiki_1t8gfj">shift</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">acquireConnection</span><span class="__shiki_140thh">(url).</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(resolve);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="十、安全与认证" tabindex="-1">十、安全与认证 <a class="header-anchor" href="#十、安全与认证" aria-label="Permalink to &quot;十、安全与认证&quot;">​</a></h2><h3 id="_10-1-认证机制" tabindex="-1">10.1 认证机制 <a class="header-anchor" href="#_10-1-认证机制" aria-label="Permalink to &quot;10.1 认证机制&quot;">​</a></h3><h4 id="_10-1-1-基本认证" tabindex="-1">10.1.1 基本认证 <a class="header-anchor" href="#_10-1-1-基本认证" aria-label="Permalink to &quot;10.1.1 基本认证&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 在复制配置中设置认证</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;source&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;http://username:password@source-host:5984/source_db&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;target&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;http://username:password@target-host:5984/target_db&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_10-1-2-oauth认证" tabindex="-1">10.1.2 OAuth认证 <a class="header-anchor" href="#_10-1-2-oauth认证" aria-label="Permalink to &quot;10.1.2 OAuth认证&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;source&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;url&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;http://source-host:5984/source_db&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;headers&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;Authorization&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Bearer eyJhbGciOiJIUzI1NiIs...&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;target&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;url&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;http://target-host:5984/target_db&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;headers&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;Authorization&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Bearer eyJhbGciOiJIUzI1NiIs...&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_10-2-ssl-tls配置" tabindex="-1">10.2 SSL/TLS配置 <a class="header-anchor" href="#_10-2-ssl-tls配置" aria-label="Permalink to &quot;10.2 SSL/TLS配置&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;source&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;https://source-host:6984/source_db&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;target&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;https://target-host:6984/target_db&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;ssl&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;verify_ssl&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;cert_file&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/path/to/cert.pem&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;key_file&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/path/to/key.pem&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;password&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;cert-password&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;ca_file&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/path/to/ca.pem&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="十一、故障恢复与容错" tabindex="-1">十一、故障恢复与容错 <a class="header-anchor" href="#十一、故障恢复与容错" aria-label="Permalink to &quot;十一、故障恢复与容错&quot;">​</a></h2><h3 id="_11-1-故障检测" tabindex="-1">11.1 故障检测 <a class="header-anchor" href="#_11-1-故障检测" aria-label="Permalink to &quot;11.1 故障检测&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ReplicationFaultDetector</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">replication</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.replication </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> replication;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.failures </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.lastSuccess </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> checkHealth</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 测试连接</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">all</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_1t8gfj">        testConnection</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.replication.source),</span></span>
<span class="line"><span class="__shiki_1t8gfj">        testConnection</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.replication.target)</span></span>
<span class="line"><span class="__shiki_140thh">      ]);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 测试复制功能</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> testDoc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        _id: </span><span class="__shiki_mdbnqw">\`_replication_test_\${</span><span class="__shiki_140thh">Date</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_mdbnqw">()</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        test: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">      };</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_1t8gfj"> saveDocument</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.replication.source, testDoc);</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(resolve, </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> replicated</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> getDocument</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.replication.target, testDoc._id);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (replicated) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.failures </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.lastSuccess </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> { healthy: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.failures</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> { </span></span>
<span class="line"><span class="__shiki_140thh">          healthy: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">          reason: </span><span class="__shiki_mdbnqw">&#39;test_doc_not_replicated&#39;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.failures</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> { </span></span>
<span class="line"><span class="__shiki_140thh">        healthy: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">        reason: error.message </span></span>
<span class="line"><span class="__shiki_140thh">      };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  shouldRestart</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> timeSinceSuccess</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.lastSuccess;</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.failures </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> timeSinceSuccess </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 300000</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 5分钟</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_11-2-自动恢复策略" tabindex="-1">11.2 自动恢复策略 <a class="header-anchor" href="#_11-2-自动恢复策略" aria-label="Permalink to &quot;11.2 自动恢复策略&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ReplicationAutoRecovery</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">replication</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">options</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.replication </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> replication;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.options </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      maxRetries: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      backoffMultiplier: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      initialDelay: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      maxDelay: </span><span class="__shiki_dzsirb">60000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">      ...</span><span class="__shiki_140thh">options</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.retryCount </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> recover</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.retryCount</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.retryCount </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.options.maxRetries) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`复制重试超过最大次数: \${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">options</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">maxRetries</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 计算退避延迟</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> delay</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">min</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.options.initialDelay </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">      Math.</span><span class="__shiki_1t8gfj">pow</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.options.backoffMultiplier, </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.retryCount </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.options.maxDelay</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`复制失败，\${</span><span class="__shiki_140thh">delay</span><span class="__shiki_mdbnqw">}ms后重试 (\${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">retryCount</span><span class="__shiki_mdbnqw">}/\${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">options</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">maxRetries</span><span class="__shiki_mdbnqw">})\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(resolve, delay));</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 尝试恢复策略</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (error.message.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;connection&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">recoverConnection</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (error.message.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;conflict&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">recoverConflicts</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (error.message.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;timeout&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">recoverTimeout</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 重新启动复制</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">restartReplication</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> recoverConnection</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 重新建立连接</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">testConnections</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 重置检查点（如果需要）</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">isCheckpointCorrupted</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">resetCheckpoint</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="十二、实践案例-多数据中心同步" tabindex="-1">十二、实践案例：多数据中心同步 <a class="header-anchor" href="#十二、实践案例-多数据中心同步" aria-label="Permalink to &quot;十二、实践案例：多数据中心同步&quot;">​</a></h2><h3 id="_12-1-跨数据中心复制架构" tabindex="-1">12.1 跨数据中心复制架构 <a class="header-anchor" href="#_12-1-跨数据中心复制架构" aria-label="Permalink to &quot;12.1 跨数据中心复制架构&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> MultiDatacenterReplication</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">datacenters</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">options</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.datacenters </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> datacenters; </span><span class="__shiki_21nrsd">// [{name, url, priority}]</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.replications </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.options </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      conflictResolver: </span><span class="__shiki_mdbnqw">&#39;timestamp&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      bidirectional: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">      ...</span><span class="__shiki_140thh">options</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> setupFullMesh</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 设置全网格复制</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> dc1</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.datacenters) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> dc2</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.datacenters) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (dc1.name </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_140thh"> dc2.name) {</span></span>
<span class="line"><span class="__shiki_1itgoe">          const</span><span class="__shiki_dzsirb"> repId</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> \`rep_\${</span><span class="__shiki_140thh">dc1</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">}_to_\${</span><span class="__shiki_140thh">dc2</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_dzsirb">          this</span><span class="__shiki_140thh">.replications.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(repId, {</span></span>
<span class="line"><span class="__shiki_140thh">            source: dc1.url,</span></span>
<span class="line"><span class="__shiki_140thh">            target: dc2.url,</span></span>
<span class="line"><span class="__shiki_140thh">            continuous: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            checkpoint: </span><span class="__shiki_mdbnqw">&#39;source&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            connection_timeout: </span><span class="__shiki_dzsirb">30000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            retries_per_request: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_140thh">          });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> monitorAndBalance</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 监控各数据中心延迟</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> latencies</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">measureLatencies</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 动态调整复制拓扑</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">repId</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">replication</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">of</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.replications) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> latency</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> latencies[repId];</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (latency </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.options.maxLatency) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 切换到备用路径</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">rerouteReplication</span><span class="__shiki_140thh">(repId);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 调整批量大小基于网络状况</span></span>
<span class="line"><span class="__shiki_140thh">      replication.batchSize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateOptimalBatchSize</span><span class="__shiki_140thh">(latency);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_12-2-灾难恢复策略" tabindex="-1">12.2 灾难恢复策略 <a class="header-anchor" href="#_12-2-灾难恢复策略" aria-label="Permalink to &quot;12.2 灾难恢复策略&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> DisasterRecoveryReplication</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">primary</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">secondary</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">options</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.primary </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> primary;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.secondary </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> secondary;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.replication </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.monitor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> setupDisasterRecovery</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 设置主到备的连续复制</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.replication </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> startReplication</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      source: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.primary,</span></span>
<span class="line"><span class="__shiki_140thh">      target: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.secondary,</span></span>
<span class="line"><span class="__shiki_140thh">      continuous: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      checkpoint: </span><span class="__shiki_mdbnqw">&#39;source&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 启动监控</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.monitor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> setInterval</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkPrimaryHealth</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }, </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> failover</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检测到主数据库故障，切换到备用</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;检测到主数据库故障，开始故障转移...&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 停止复制</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_1t8gfj"> stopReplication</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.replication);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 确保备用数据库是最新的</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">catchupSecondary</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 切换DNS或负载均衡器配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">updateRouting</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.secondary);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 通知应用</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">notifyApplications</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;故障转移完成&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> failback</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 主数据库恢复后的回切</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;主数据库恢复，开始回切...&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 设置反向复制（备用到主）</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> reverseReplication</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> startReplication</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      source: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.secondary,</span></span>
<span class="line"><span class="__shiki_140thh">      target: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.primary,</span></span>
<span class="line"><span class="__shiki_140thh">      continuous: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 等待数据同步</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">waitForSync</span><span class="__shiki_140thh">(reverseReplication);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 切换回主数据库</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">updateRouting</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.primary);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 恢复原始复制方向</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_1t8gfj"> stopReplication</span><span class="__shiki_140thh">(reverseReplication);</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.replication </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> startReplication</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      source: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.primary,</span></span>
<span class="line"><span class="__shiki_140thh">      target: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.secondary,</span></span>
<span class="line"><span class="__shiki_140thh">      continuous: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;回切完成&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="十三、总结与最佳实践" tabindex="-1">十三、总结与最佳实践 <a class="header-anchor" href="#十三、总结与最佳实践" aria-label="Permalink to &quot;十三、总结与最佳实践&quot;">​</a></h2><h3 id="_13-1-关键要点回顾" tabindex="-1">13.1 关键要点回顾 <a class="header-anchor" href="#_13-1-关键要点回顾" aria-label="Permalink to &quot;13.1 关键要点回顾&quot;">​</a></h3><ol><li><strong>增量复制</strong>：CouchDB只复制更改的部分，高效处理大数据集</li><li><strong>多主架构</strong>：任何节点都可以写入，支持离线操作</li><li><strong>冲突处理</strong>：自动检测冲突，需要应用层解决策略</li><li><strong>最终一致性</strong>：确保数据最终在所有节点一致</li></ol><h3 id="_13-2-性能优化清单" tabindex="-1">13.2 性能优化清单 <a class="header-anchor" href="#_13-2-性能优化清单" aria-label="Permalink to &quot;13.2 性能优化清单&quot;">​</a></h3><ol><li><strong>批量处理</strong>：使用适当的批量大小（100-1000个文档）</li><li><strong>连接管理</strong>：复用HTTP连接，使用连接池</li><li><strong>检查点策略</strong>：合理设置检查点间隔</li><li><strong>网络优化</strong>：压缩数据，使用持久连接</li></ol><h3 id="_13-3-监控指标" tabindex="-1">13.3 监控指标 <a class="header-anchor" href="#_13-3-监控指标" aria-label="Permalink to &quot;13.3 监控指标&quot;">​</a></h3><table tabindex="0"><thead><tr><th>指标</th><th>描述</th><th>推荐阈值</th></tr></thead><tbody><tr><td>复制延迟</td><td>源到目标的时间差</td><td>&lt; 5分钟</td></tr><tr><td>吞吐量</td><td>文档/秒</td><td>根据硬件调整</td></tr><tr><td>失败率</td><td>写入失败比例</td><td>&lt; 1%</td></tr><tr><td>内存使用</td><td>复制进程内存</td><td>&lt; 1GB</td></tr><tr><td>连接数</td><td>活跃HTTP连接</td><td>&lt; 100</td></tr></tbody></table><h3 id="_13-4-安全最佳实践" tabindex="-1">13.4 安全最佳实践 <a class="header-anchor" href="#_13-4-安全最佳实践" aria-label="Permalink to &quot;13.4 安全最佳实践&quot;">​</a></h3><ol><li><strong>使用HTTPS</strong>：加密传输中的数据</li><li><strong>认证授权</strong>：限制复制权限</li><li><strong>网络隔离</strong>：在受信任网络内复制</li><li><strong>审计日志</strong>：记录所有复制活动</li></ol><h3 id="_13-5-故障排除指南" tabindex="-1">13.5 故障排除指南 <a class="header-anchor" href="#_13-5-故障排除指南" aria-label="Permalink to &quot;13.5 故障排除指南&quot;">​</a></h3><ol><li><strong>连接问题</strong>：检查网络、防火墙、SSL证书</li><li><strong>权限问题</strong>：验证认证凭据和数据库权限</li><li><strong>冲突问题</strong>：实现适当的冲突解决策略</li><li><strong>性能问题</strong>：优化批量大小、调整检查点频率</li></ol><p>CouchDB的复制协议是其分布式能力的核心，理解复制机制对于构建可靠、可扩展的分布式应用至关重要。通过合理配置和监控，可以确保数据在多个节点间高效、可靠地同步。</p>`,146)])])}const d=a(p,[["render",h]]);export{r as __pageData,d as default};
