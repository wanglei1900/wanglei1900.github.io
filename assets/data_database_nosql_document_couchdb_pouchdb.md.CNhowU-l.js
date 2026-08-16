import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"CouchDB学习笔记：PouchDB离线同步详解","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/nosql/document/couchdb/pouchdb.md","filePath":"data/database/nosql/document/couchdb/pouchdb.md"}'),p={name:"data/database/nosql/document/couchdb/pouchdb.md"};function h(l,s,c,t,e,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="couchdb学习笔记-pouchdb离线同步详解" tabindex="-1">CouchDB学习笔记：PouchDB离线同步详解 <a class="header-anchor" href="#couchdb学习笔记-pouchdb离线同步详解" aria-label="Permalink to &quot;CouchDB学习笔记：PouchDB离线同步详解&quot;">​</a></h1><h2 id="一、pouchdb概述与核心架构" tabindex="-1">一、PouchDB概述与核心架构 <a class="header-anchor" href="#一、pouchdb概述与核心架构" aria-label="Permalink to &quot;一、PouchDB概述与核心架构&quot;">​</a></h2><h3 id="_1-1-pouchdb是什么" tabindex="-1">1.1 PouchDB是什么 <a class="header-anchor" href="#_1-1-pouchdb是什么" aria-label="Permalink to &quot;1.1 PouchDB是什么&quot;">​</a></h3><h4 id="_1-1-1-定义与定位" tabindex="-1">1.1.1 定义与定位 <a class="header-anchor" href="#_1-1-1-定义与定位" aria-label="Permalink to &quot;1.1.1 定义与定位&quot;">​</a></h4><p>PouchDB是一个开源的JavaScript数据库，灵感来自CouchDB，专为浏览器和Node.js环境设计。</p><p><strong>核心定位：</strong></p><ul><li><strong>客户端CouchDB</strong>：实现CouchDB API的子集</li><li><strong>离线优先</strong>：为Web应用提供离线数据存储能力</li><li><strong>数据同步</strong>：与CouchDB和兼容服务器双向同步</li><li><strong>跨平台</strong>：在浏览器、移动应用和桌面应用中运行</li></ul><h4 id="_1-2-pouchdb与couchdb的关系" tabindex="-1">1.2 PouchDB与CouchDB的关系 <a class="header-anchor" href="#_1-2-pouchdb与couchdb的关系" aria-label="Permalink to &quot;1.2 PouchDB与CouchDB的关系&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│            CouchDB (服务器端)              │</span></span>
<span class="line"><span class="__shiki_wvjl67">│   • 完整功能实现                            │</span></span>
<span class="line"><span class="__shiki_wvjl67">│   • 持久化存储                              │</span></span>
<span class="line"><span class="__shiki_wvjl67">│   • 多用户管理                              │</span></span>
<span class="line"><span class="__shiki_wvjl67">│   • 集群部署                                │</span></span>
<span class="line"><span class="__shiki_wvjl67">└───────────────────┬─────────────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">                    │ HTTP复制协议</span></span>
<span class="line"><span class="__shiki_wvjl67">┌───────────────────┴─────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│            PouchDB (客户端)                │</span></span>
<span class="line"><span class="__shiki_wvjl67">│   • CouchDB API子集                        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│   • 浏览器存储适配器                        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│   • 离线数据处理                            │</span></span>
<span class="line"><span class="__shiki_wvjl67">│   • 自动冲突检测                            │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_1-3-技术架构" tabindex="-1">1.3 技术架构 <a class="header-anchor" href="#_1-3-技术架构" aria-label="Permalink to &quot;1.3 技术架构&quot;">​</a></h3><h4 id="_1-3-1-存储适配器架构" tabindex="-1">1.3.1 存储适配器架构 <a class="header-anchor" href="#_1-3-1-存储适配器架构" aria-label="Permalink to &quot;1.3.1 存储适配器架构&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// PouchDB的多层存储架构</span></span>
<span class="line"><span class="__shiki_140thh">┌─────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_140thh">│          PouchDB </span><span class="__shiki_dzsirb">API</span><span class="__shiki_140thh"> 层                 │</span></span>
<span class="line"><span class="__shiki_140thh">├─────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_140thh">│         核心同步引擎                    │</span></span>
<span class="line"><span class="__shiki_140thh">├─────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_140thh">│         存储适配器抽象层                │</span></span>
<span class="line"><span class="__shiki_140thh">├──────┬──────┬───────┬──────┬───────────┤</span></span>
<span class="line"><span class="__shiki_140thh">│ IndexedDB │ WebSQL │ LevelDB │ SQLite │</span></span>
<span class="line"><span class="__shiki_140thh">│  适配器    │ 适配器 │ 适配器  │ 适配器  │</span></span>
<span class="line"><span class="__shiki_140thh">└──────┴──────┴───────┴──────┴───────────┘</span></span></code></pre></div><h4 id="_1-3-2-支持的存储后端" tabindex="-1">1.3.2 支持的存储后端 <a class="header-anchor" href="#_1-3-2-支持的存储后端" aria-label="Permalink to &quot;1.3.2 支持的存储后端&quot;">​</a></h4><table tabindex="0"><thead><tr><th>适配器</th><th>环境</th><th>容量限制</th><th>特点</th></tr></thead><tbody><tr><td>IndexedDB</td><td>现代浏览器</td><td>各浏览器不同（通常50MB+）</td><td>异步API，支持复杂查询</td></tr><tr><td>WebSQL</td><td>旧版浏览器</td><td>5-50MB</td><td>SQLite语法，已废弃但仍有支持</td></tr><tr><td>LevelDB</td><td>Node.js</td><td>磁盘空间限制</td><td>高性能键值存储</td></tr><tr><td>Memory</td><td>测试环境</td><td>内存限制</td><td>临时存储，不持久化</td></tr><tr><td>SQLite</td><td>Cordova/React Native</td><td>设备存储限制</td><td>移动端原生存储</td></tr></tbody></table><h2 id="二、安装与基础配置" tabindex="-1">二、安装与基础配置 <a class="header-anchor" href="#二、安装与基础配置" aria-label="Permalink to &quot;二、安装与基础配置&quot;">​</a></h2><h3 id="_2-1-环境安装" tabindex="-1">2.1 环境安装 <a class="header-anchor" href="#_2-1-环境安装" aria-label="Permalink to &quot;2.1 环境安装&quot;">​</a></h3><h4 id="_2-1-1-浏览器环境" tabindex="-1">2.1.1 浏览器环境 <a class="header-anchor" href="#_2-1-1-浏览器环境" aria-label="Permalink to &quot;2.1.1 浏览器环境&quot;">​</a></h4><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">&lt;!-- 直接通过CDN引入 --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">script</span><span class="__shiki_1t8gfj"> src</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js&quot;</span><span class="__shiki_140thh">&gt;&lt;/</span><span class="__shiki_17hn0y">script</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">&lt;!-- 或使用模块化引入 --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">script</span><span class="__shiki_1t8gfj"> type</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;module&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">  import</span><span class="__shiki_140thh"> PouchDB </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/+esm&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_17hn0y">script</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h4 id="_2-1-2-node-js环境" tabindex="-1">2.1.2 Node.js环境 <a class="header-anchor" href="#_2-1-2-node-js环境" aria-label="Permalink to &quot;2.1.2 Node.js环境&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 安装PouchDB</span></span>
<span class="line"><span class="__shiki_1t8gfj">npm</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> pouchdb</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 可选：安装特定适配器</span></span>
<span class="line"><span class="__shiki_1t8gfj">npm</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> pouchdb-adapter-leveldb</span></span>
<span class="line"><span class="__shiki_1t8gfj">npm</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> pouchdb-adapter-http</span></span>
<span class="line"><span class="__shiki_1t8gfj">npm</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> pouchdb-adapter-websql</span></span></code></pre></div><h3 id="_2-2-数据库初始化" tabindex="-1">2.2 数据库初始化 <a class="header-anchor" href="#_2-2-数据库初始化" aria-label="Permalink to &quot;2.2 数据库初始化&quot;">​</a></h3><h4 id="_2-2-1-基本初始化" tabindex="-1">2.2.1 基本初始化 <a class="header-anchor" href="#_2-2-1-基本初始化" aria-label="Permalink to &quot;2.2.1 基本初始化&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 浏览器环境 - 使用最佳适配器</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> PouchDB</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;my_database&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Node.js环境 - 指定适配器</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> PouchDB</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;pouchdb&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> PouchDB</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;my_database&#39;</span><span class="__shiki_140thh">, { adapter: </span><span class="__shiki_mdbnqw">&#39;leveldb&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 内存数据库（用于测试）</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> memoryDB</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> PouchDB</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;test_db&#39;</span><span class="__shiki_140thh">, { adapter: </span><span class="__shiki_mdbnqw">&#39;memory&#39;</span><span class="__shiki_140thh"> });</span></span></code></pre></div><h4 id="_2-2-2-高级配置选项" tabindex="-1">2.2.2 高级配置选项 <a class="header-anchor" href="#_2-2-2-高级配置选项" aria-label="Permalink to &quot;2.2.2 高级配置选项&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> PouchDB</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;my_app_db&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 存储配置</span></span>
<span class="line"><span class="__shiki_140thh">  adapter: </span><span class="__shiki_mdbnqw">&#39;idb&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 强制使用IndexedDB</span></span>
<span class="line"><span class="__shiki_140thh">  auto_compaction: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 自动压缩</span></span>
<span class="line"><span class="__shiki_140thh">  revs_limit: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 限制修订历史数量</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 性能优化</span></span>
<span class="line"><span class="__shiki_140thh">  size: </span><span class="__shiki_dzsirb">50</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 50MB大小限制（WebSQL）</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 前缀配置（多租户支持）</span></span>
<span class="line"><span class="__shiki_140thh">  prefix: </span><span class="__shiki_mdbnqw">&#39;tenant_123_&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 事件监听</span></span>
<span class="line"><span class="__shiki_140thh">  deterministic_revs: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd"> // 确定性修订ID（测试用）</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h4 id="_2-2-3-多数据库实例管理" tabindex="-1">2.2.3 多数据库实例管理 <a class="header-anchor" href="#_2-2-3-多数据库实例管理" aria-label="Permalink to &quot;2.2.3 多数据库实例管理&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> DatabaseManager</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.databases </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  getDatabase</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">options</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> key</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> \`\${</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">}_\${</span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_140thh">options</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.databases.</span><span class="__shiki_1t8gfj">has</span><span class="__shiki_140thh">(key)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> PouchDB</span><span class="__shiki_140thh">(name, options);</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.databases.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(key, db);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 添加事件监听</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">setupEventListeners</span><span class="__shiki_140thh">(db, name);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.databases.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(key);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  setupEventListeners</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    db.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;created&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`数据库 \${</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">} 已创建\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    db.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;destroyed&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`数据库 \${</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">} 已销毁\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.databases.</span><span class="__shiki_1t8gfj">delete</span><span class="__shiki_140thh">(name);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> closeAll</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">name</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">db</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">of</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.databases) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">close</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.databases.</span><span class="__shiki_1t8gfj">clear</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="三、数据操作api" tabindex="-1">三、数据操作API <a class="header-anchor" href="#三、数据操作api" aria-label="Permalink to &quot;三、数据操作API&quot;">​</a></h2><h3 id="_3-1-crud操作" tabindex="-1">3.1 CRUD操作 <a class="header-anchor" href="#_3-1-crud操作" aria-label="Permalink to &quot;3.1 CRUD操作&quot;">​</a></h3><h4 id="_3-1-1-创建文档" tabindex="-1">3.1.1 创建文档 <a class="header-anchor" href="#_3-1-1-创建文档" aria-label="Permalink to &quot;3.1.1 创建文档&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 方法1：指定_id</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  _id: </span><span class="__shiki_mdbnqw">&#39;user_123&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  name: </span><span class="__shiki_mdbnqw">&#39;张三&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  email: </span><span class="__shiki_mdbnqw">&#39;zhangsan@example.com&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  age: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  createdAt: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 方法2：自动生成_id</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">post</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  name: </span><span class="__shiki_mdbnqw">&#39;李四&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  email: </span><span class="__shiki_mdbnqw">&#39;lisi@example.com&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  type: </span><span class="__shiki_mdbnqw">&#39;user&#39;</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 批量创建</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">bulkDocs</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_140thh">  { _id: </span><span class="__shiki_mdbnqw">&#39;doc1&#39;</span><span class="__shiki_140thh">, title: </span><span class="__shiki_mdbnqw">&#39;文档1&#39;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">  { _id: </span><span class="__shiki_mdbnqw">&#39;doc2&#39;</span><span class="__shiki_140thh">, title: </span><span class="__shiki_mdbnqw">&#39;文档2&#39;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">  { _id: </span><span class="__shiki_mdbnqw">&#39;doc3&#39;</span><span class="__shiki_140thh">, title: </span><span class="__shiki_mdbnqw">&#39;文档3&#39;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">]);</span></span></code></pre></div><h4 id="_3-1-2-读取文档" tabindex="-1">3.1.2 读取文档 <a class="header-anchor" href="#_3-1-2-读取文档" aria-label="Permalink to &quot;3.1.2 读取文档&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 按ID读取</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> doc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;user_123&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 读取特定修订版本</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> docWithRev</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;user_123&#39;</span><span class="__shiki_140thh">, { rev: </span><span class="__shiki_mdbnqw">&#39;3-abc123&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 读取包含冲突信息</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> docWithConflicts</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;user_123&#39;</span><span class="__shiki_140thh">, { conflicts: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> });</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 批量读取</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">allDocs</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  include_docs: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  startkey: </span><span class="__shiki_mdbnqw">&#39;user_&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  endkey: </span><span class="__shiki_mdbnqw">&#39;user_</span><span class="__shiki_dzsirb">\\ufff0</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h4 id="_3-1-3-更新文档" tabindex="-1">3.1.3 更新文档 <a class="header-anchor" href="#_3-1-3-更新文档" aria-label="Permalink to &quot;3.1.3 更新文档&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 必须包含_id和_rev</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> doc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;user_123&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">doc.name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;张三（已更新）&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">doc.updatedAt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(doc);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 条件更新（避免冲突）</span></span>
<span class="line"><span class="__shiki_1itgoe">try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">    _id: </span><span class="__shiki_mdbnqw">&#39;user_123&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    _rev: </span><span class="__shiki_mdbnqw">&#39;3-abc123&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 当前修订版本</span></span>
<span class="line"><span class="__shiki_140thh">    name: </span><span class="__shiki_mdbnqw">&#39;新的名字&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    _deleted: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_21nrsd"> // 明确标记非删除</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">} </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (err) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (err.status </span><span class="__shiki_1itgoe">===</span><span class="__shiki_dzsirb"> 409</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;文档已被修改，需要处理冲突&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-1-4-删除文档" tabindex="-1">3.1.4 删除文档 <a class="header-anchor" href="#_3-1-4-删除文档" aria-label="Permalink to &quot;3.1.4 删除文档&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 方法1：标记删除</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> doc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;user_123&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">doc._deleted </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(doc);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 方法2：直接删除</span></span>
<span class="line"><span class="__shiki_1itgoe">await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">remove</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;user_123&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;3-abc123&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 批量删除</span></span>
<span class="line"><span class="__shiki_1itgoe">await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">bulkDocs</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_140thh">  { _id: </span><span class="__shiki_mdbnqw">&#39;doc1&#39;</span><span class="__shiki_140thh">, _rev: </span><span class="__shiki_mdbnqw">&#39;1-xxx&#39;</span><span class="__shiki_140thh">, _deleted: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">  { _id: </span><span class="__shiki_mdbnqw">&#39;doc2&#39;</span><span class="__shiki_140thh">, _rev: </span><span class="__shiki_mdbnqw">&#39;2-yyy&#39;</span><span class="__shiki_140thh">, _deleted: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">]);</span></span></code></pre></div><h3 id="_3-2-查询操作" tabindex="-1">3.2 查询操作 <a class="header-anchor" href="#_3-2-查询操作" aria-label="Permalink to &quot;3.2 查询操作&quot;">​</a></h3><h4 id="_3-2-1-基本查询" tabindex="-1">3.2.1 基本查询 <a class="header-anchor" href="#_3-2-1-基本查询" aria-label="Permalink to &quot;3.2.1 基本查询&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 获取所有文档</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> allDocs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">allDocs</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  include_docs: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  descending: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 分页查询</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> paginate</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">page</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">pageSize</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 20</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> skip</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (page </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> pageSize;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">allDocs</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">    include_docs: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    limit: pageSize,</span></span>
<span class="line"><span class="__shiki_140thh">    skip: skip,</span></span>
<span class="line"><span class="__shiki_140thh">    descending: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    docs: result.rows.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">row</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> row.doc),</span></span>
<span class="line"><span class="__shiki_140thh">    total: result.total_rows,</span></span>
<span class="line"><span class="__shiki_140thh">    page: page,</span></span>
<span class="line"><span class="__shiki_140thh">    pageSize: pageSize,</span></span>
<span class="line"><span class="__shiki_140thh">    hasNext: (skip </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> pageSize) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> result.total_rows</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-2-2-使用mango查询-需要安装pouchdb-find" tabindex="-1">3.2.2 使用Mango查询（需要安装pouchdb-find） <a class="header-anchor" href="#_3-2-2-使用mango查询-需要安装pouchdb-find" aria-label="Permalink to &quot;3.2.2 使用Mango查询（需要安装pouchdb-find）&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 安装pouchdb-find</span></span>
<span class="line"><span class="__shiki_21nrsd">// npm install pouchdb-find</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 启用查询插件</span></span>
<span class="line"><span class="__shiki_140thh">PouchDB.</span><span class="__shiki_1t8gfj">plugin</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;pouchdb-find&#39;</span><span class="__shiki_140thh">));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 创建索引</span></span>
<span class="line"><span class="__shiki_1itgoe">await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  index: {</span></span>
<span class="line"><span class="__shiki_140thh">    fields: [</span><span class="__shiki_mdbnqw">&#39;name&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;age&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;createdAt&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 执行查询</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  selector: {</span></span>
<span class="line"><span class="__shiki_140thh">    type: </span><span class="__shiki_mdbnqw">&#39;user&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    age: { $gte: </span><span class="__shiki_dzsirb">18</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">    name: { $regex: </span><span class="__shiki_mdbnqw">&#39;张&#39;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  fields: [</span><span class="__shiki_mdbnqw">&#39;_id&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;name&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;age&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">  sort: [{ age: </span><span class="__shiki_mdbnqw">&#39;desc&#39;</span><span class="__shiki_140thh"> }, { name: </span><span class="__shiki_mdbnqw">&#39;asc&#39;</span><span class="__shiki_140thh"> }],</span></span>
<span class="line"><span class="__shiki_140thh">  limit: </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  skip: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h3 id="_3-3-附件操作" tabindex="-1">3.3 附件操作 <a class="header-anchor" href="#_3-3-附件操作" aria-label="Permalink to &quot;3.3 附件操作&quot;">​</a></h3><h4 id="_3-3-1-附件管理" tabindex="-1">3.3.1 附件管理 <a class="header-anchor" href="#_3-3-1-附件管理" aria-label="Permalink to &quot;3.3.1 附件管理&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 添加附件</span></span>
<span class="line"><span class="__shiki_1itgoe">await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">putAttachment</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;user_123&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;avatar.jpg&#39;</span><span class="__shiki_140thh">, doc._rev, fileBlob, </span><span class="__shiki_mdbnqw">&#39;image/jpeg&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 获取附件</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> attachment</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">getAttachment</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;user_123&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;avatar.jpg&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 列出所有附件</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> doc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;user_123&#39;</span><span class="__shiki_140thh">, { attachments: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> attachments</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> doc._attachments;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 删除附件</span></span>
<span class="line"><span class="__shiki_1itgoe">await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">removeAttachment</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;user_123&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;avatar.jpg&#39;</span><span class="__shiki_140thh">, doc._rev);</span></span></code></pre></div><h2 id="四、同步机制详解" tabindex="-1">四、同步机制详解 <a class="header-anchor" href="#四、同步机制详解" aria-label="Permalink to &quot;四、同步机制详解&quot;">​</a></h2><h3 id="_4-1-同步基础概念" tabindex="-1">4.1 同步基础概念 <a class="header-anchor" href="#_4-1-同步基础概念" aria-label="Permalink to &quot;4.1 同步基础概念&quot;">​</a></h3><h4 id="_4-1-1-同步类型" tabindex="-1">4.1.1 同步类型 <a class="header-anchor" href="#_4-1-1-同步类型" aria-label="Permalink to &quot;4.1.1 同步类型&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 单向同步（拉取）</span></span>
<span class="line"><span class="__shiki_140thh">db.replicate.</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(remoteDB);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 单向同步（推送）</span></span>
<span class="line"><span class="__shiki_140thh">db.replicate.</span><span class="__shiki_1t8gfj">to</span><span class="__shiki_140thh">(remoteDB);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 双向同步</span></span>
<span class="line"><span class="__shiki_140thh">db.</span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">(remoteDB);</span></span></code></pre></div><h4 id="_4-1-2-同步状态机" tabindex="-1">4.1.2 同步状态机 <a class="header-anchor" href="#_4-1-2-同步状态机" aria-label="Permalink to &quot;4.1.2 同步状态机&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">初始化 → 检查点恢复 → 获取更改源 → 处理差异 → 持续监控</span></span>
<span class="line"><span class="__shiki_wvjl67">      ↑          ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">      故障恢复 ← 网络中断</span></span></code></pre></div><h3 id="_4-2-本地到远程同步" tabindex="-1">4.2 本地到远程同步 <a class="header-anchor" href="#_4-2-本地到远程同步" aria-label="Permalink to &quot;4.2 本地到远程同步&quot;">​</a></h3><h4 id="_4-2-1-基本同步配置" tabindex="-1">4.2.1 基本同步配置 <a class="header-anchor" href="#_4-2-1-基本同步配置" aria-label="Permalink to &quot;4.2.1 基本同步配置&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> localDB</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> PouchDB</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;local_todos&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> remoteDB</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> PouchDB</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;http://admin:password@localhost:5984/remote_todos&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 简单双向同步</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> sync</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> localDB.</span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">(remoteDB, {</span></span>
<span class="line"><span class="__shiki_140thh">  live: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,            </span><span class="__shiki_21nrsd">// 持续同步</span></span>
<span class="line"><span class="__shiki_140thh">  retry: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,           </span><span class="__shiki_21nrsd">// 失败重试</span></span>
<span class="line"><span class="__shiki_1t8gfj">  back_off_function</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">delay</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> delay </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 退避策略</span></span>
<span class="line"><span class="__shiki_140thh">  timeout: </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_21nrsd">         // 超时设置</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 事件监听</span></span>
<span class="line"><span class="__shiki_140thh">sync</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;change&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">info</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;同步变更:&#39;</span><span class="__shiki_140thh">, info);</span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;paused&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">err</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;同步暂停:&#39;</span><span class="__shiki_140thh">, err);</span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;active&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;同步恢复&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;complete&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">info</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;同步完成:&#39;</span><span class="__shiki_140thh">, info);</span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;error&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">err</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;同步错误:&#39;</span><span class="__shiki_140thh">, err);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span></code></pre></div><h4 id="_4-2-2-高级同步选项" tabindex="-1">4.2.2 高级同步选项 <a class="header-anchor" href="#_4-2-2-高级同步选项" aria-label="Permalink to &quot;4.2.2 高级同步选项&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> syncOptions</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 网络与重试</span></span>
<span class="line"><span class="__shiki_140thh">  live: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  retry: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  heartbeat: </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">,           </span><span class="__shiki_21nrsd">// 心跳间隔</span></span>
<span class="line"><span class="__shiki_140thh">  timeout: </span><span class="__shiki_dzsirb">30000</span><span class="__shiki_140thh">,             </span><span class="__shiki_21nrsd">// 请求超时</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 批量处理</span></span>
<span class="line"><span class="__shiki_140thh">  batch_size: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">,            </span><span class="__shiki_21nrsd">// 每批文档数</span></span>
<span class="line"><span class="__shiki_140thh">  batches_limit: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,          </span><span class="__shiki_21nrsd">// 并发批次数</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 过滤与转换</span></span>
<span class="line"><span class="__shiki_1t8gfj">  filter</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">doc</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> doc.type </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;todo&#39;</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">doc._deleted;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  query_params: {</span></span>
<span class="line"><span class="__shiki_140thh">    user_id: </span><span class="__shiki_mdbnqw">&#39;123&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 检查点控制</span></span>
<span class="line"><span class="__shiki_140thh">  checkpoint: </span><span class="__shiki_mdbnqw">&#39;target&#39;</span><span class="__shiki_140thh">,       </span><span class="__shiki_21nrsd">// &#39;source&#39;, &#39;target&#39;, false</span></span>
<span class="line"><span class="__shiki_140thh">  since: </span><span class="__shiki_mdbnqw">&#39;now&#39;</span><span class="__shiki_140thh">,               </span><span class="__shiki_21nrsd">// 从何时开始同步</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 性能优化</span></span>
<span class="line"><span class="__shiki_140thh">  worker: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,               </span><span class="__shiki_21nrsd">// 使用Web Worker</span></span>
<span class="line"><span class="__shiki_140thh">  ajax: {                     </span><span class="__shiki_21nrsd">// AJAX配置</span></span>
<span class="line"><span class="__shiki_140thh">    cache: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    headers: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;X-Custom-Header&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;value&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_4-3-离线同步策略" tabindex="-1">4.3 离线同步策略 <a class="header-anchor" href="#_4-3-离线同步策略" aria-label="Permalink to &quot;4.3 离线同步策略&quot;">​</a></h3><h4 id="_4-3-1-网络状态检测" tabindex="-1">4.3.1 网络状态检测 <a class="header-anchor" href="#_4-3-1-网络状态检测" aria-label="Permalink to &quot;4.3.1 网络状态检测&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> NetworkManager</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.online </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> navigator.onLine;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.syncHandler </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    window.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;online&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.handleOnline.</span><span class="__shiki_1t8gfj">bind</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">    window.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;offline&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.handleOffline.</span><span class="__shiki_1t8gfj">bind</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  handleOnline</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.online </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;网络恢复&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 触发同步</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.syncHandler) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.syncHandler.</span><span class="__shiki_1t8gfj">resume</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  handleOffline</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.online </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;网络断开&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 暂停同步</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.syncHandler) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.syncHandler.</span><span class="__shiki_1t8gfj">pause</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  setSyncHandler</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">handler</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.syncHandler </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> handler;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  isOnline</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.online;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_4-3-2-离线队列管理" tabindex="-1">4.3.2 离线队列管理 <a class="header-anchor" href="#_4-3-2-离线队列管理" aria-label="Permalink to &quot;4.3.2 离线队列管理&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> OfflineQueue</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.db </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.queue </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.processing </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.maxRetries </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 从本地存储恢复队列</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">restoreQueue</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> addOperation</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">type</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">doc</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">options</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> operation</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      id: </span><span class="__shiki_mdbnqw">\`op_\${</span><span class="__shiki_140thh">Date</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_mdbnqw">()</span><span class="__shiki_mdbnqw">}_\${</span><span class="__shiki_140thh">Math</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">random</span><span class="__shiki_mdbnqw">()</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      type: type, </span><span class="__shiki_21nrsd">// &#39;create&#39;, &#39;update&#39;, &#39;delete&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      doc: doc,</span></span>
<span class="line"><span class="__shiki_140thh">      options: options,</span></span>
<span class="line"><span class="__shiki_140thh">      retries: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">      status: </span><span class="__shiki_mdbnqw">&#39;pending&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.queue.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(operation);</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">saveQueue</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 尝试处理队列</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.processing) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">processQueue</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> operation.id;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> processQueue</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.queue.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.processing) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.processing </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    while</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.queue.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> operation</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.queue[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">executeOperation</span><span class="__shiki_140thh">(operation);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 成功，移除操作</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.queue.</span><span class="__shiki_1t8gfj">shift</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">saveQueue</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;操作失败:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        operation.retries</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        operation.lastError </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> error.message;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (operation.retries </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.maxRetries) {</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 达到最大重试次数，移至失败队列</span></span>
<span class="line"><span class="__shiki_dzsirb">          this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">moveToFailed</span><span class="__shiki_140thh">(operation);</span></span>
<span class="line"><span class="__shiki_dzsirb">          this</span><span class="__shiki_140thh">.queue.</span><span class="__shiki_1t8gfj">shift</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 等待后重试</span></span>
<span class="line"><span class="__shiki_1itgoe">          await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">waitForRetry</span><span class="__shiki_140thh">(operation.retries);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">saveQueue</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.processing </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> executeOperation</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">operation</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    switch</span><span class="__shiki_140thh"> (operation.type) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;create&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.</span><span class="__shiki_1t8gfj">post</span><span class="__shiki_140thh">(operation.doc);</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;update&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(operation.doc);</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;delete&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.</span><span class="__shiki_1t8gfj">remove</span><span class="__shiki_140thh">(operation.doc);</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    operation.status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;completed&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    operation.completedAt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> saveQueue</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    localStorage.</span><span class="__shiki_1t8gfj">setItem</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;offline_queue&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.queue));</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> restoreQueue</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> saved</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> localStorage.</span><span class="__shiki_1t8gfj">getItem</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;offline_queue&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (saved) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.queue </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">parse</span><span class="__shiki_140thh">(saved);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="五、冲突检测与解决" tabindex="-1">五、冲突检测与解决 <a class="header-anchor" href="#五、冲突检测与解决" aria-label="Permalink to &quot;五、冲突检测与解决&quot;">​</a></h2><h3 id="_5-1-冲突检测机制" tabindex="-1">5.1 冲突检测机制 <a class="header-anchor" href="#_5-1-冲突检测机制" aria-label="Permalink to &quot;5.1 冲突检测机制&quot;">​</a></h3><h4 id="_5-1-1-冲突类型识别" tabindex="-1">5.1.1 冲突类型识别 <a class="header-anchor" href="#_5-1-1-冲突类型识别" aria-label="Permalink to &quot;5.1.1 冲突类型识别&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> detectConflicts</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">docId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> doc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(docId, { conflicts: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">doc._conflicts </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> doc._conflicts.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> { hasConflict: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 获取所有冲突版本</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> conflictRevs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [doc._rev, </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">doc._conflicts];</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> conflictDocs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">all</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    conflictRevs.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">rev</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(docId, { rev }))</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 分析冲突类型</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> conflictTypes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> conflictDocs.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">doc</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      rev: doc._rev,</span></span>
<span class="line"><span class="__shiki_140thh">      timestamp: doc.updatedAt </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> doc.createdAt,</span></span>
<span class="line"><span class="__shiki_140thh">      source: doc._source </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;unknown&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      content: doc</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    hasConflict: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    docId: docId,</span></span>
<span class="line"><span class="__shiki_140thh">    currentRev: doc._rev,</span></span>
<span class="line"><span class="__shiki_140thh">    conflicts: conflictTypes,</span></span>
<span class="line"><span class="__shiki_140thh">    conflictCount: conflictTypes.</span><span class="__shiki_dzsirb">length</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-冲突解决策略" tabindex="-1">5.2 冲突解决策略 <a class="header-anchor" href="#_5-2-冲突解决策略" aria-label="Permalink to &quot;5.2 冲突解决策略&quot;">​</a></h3><h4 id="_5-2-1-自动解决策略" tabindex="-1">5.2.1 自动解决策略 <a class="header-anchor" href="#_5-2-1-自动解决策略" aria-label="Permalink to &quot;5.2.1 自动解决策略&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ConflictResolver</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.db </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 策略1：最后写入获胜</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> resolveLastWriteWins</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">docId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> conflictInfo</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> detectConflicts</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.db, docId);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">conflictInfo.hasConflict) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 按时间戳排序，选择最新的</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> sorted</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> conflictInfo.conflicts.</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">a</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">b</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(b.timestamp) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(a.timestamp);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> winner</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> sorted[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 删除其他冲突版本</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> conflict</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> conflictInfo.conflicts) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (conflict.rev </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_140thh"> winner.rev) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">markAsConflict</span><span class="__shiki_140thh">(docId, conflict.rev);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> winner;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 策略2：自定义业务规则</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> resolveByBusinessRules</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">docId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">rules</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> conflictInfo</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> detectConflicts</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.db, docId);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">conflictInfo.hasConflict) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 应用业务规则</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> winner </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> highestScore </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> conflict</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> conflictInfo.conflicts) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> score</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateScore</span><span class="__shiki_140thh">(conflict, rules);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (score </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> highestScore) {</span></span>
<span class="line"><span class="__shiki_140thh">        highestScore </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> score;</span></span>
<span class="line"><span class="__shiki_140thh">        winner </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> conflict;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 处理失败版本</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> conflict</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> conflictInfo.conflicts) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (conflict.rev </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_140thh"> winner.rev) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">markAsConflict</span><span class="__shiki_140thh">(docId, conflict.rev);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> winner;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 策略3：合并冲突版本</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> mergeConflicts</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">docId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">mergeStrategy</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> conflictInfo</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> detectConflicts</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.db, docId);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">conflictInfo.hasConflict) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 应用合并策略</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> mergedDoc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> mergeStrategy</span><span class="__shiki_140thh">(conflictInfo.conflicts.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">c</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> c.content));</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 保存合并结果</span></span>
<span class="line"><span class="__shiki_140thh">    mergedDoc._id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> docId;</span></span>
<span class="line"><span class="__shiki_140thh">    mergedDoc._rev </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> conflictInfo.currentRev;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(mergedDoc);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 删除冲突版本</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> conflict</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> conflictInfo.conflicts) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">markAsConflict</span><span class="__shiki_140thh">(docId, conflict.rev);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> markAsConflict</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">docId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">rev</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> conflictDoc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(docId, { rev });</span></span>
<span class="line"><span class="__shiki_140thh">      conflictDoc._conflict_marked </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(conflictDoc);</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 文档可能已被删除，忽略错误</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_5-2-2-用户干预解决" tabindex="-1">5.2.2 用户干预解决 <a class="header-anchor" href="#_5-2-2-用户干预解决" aria-label="Permalink to &quot;5.2.2 用户干预解决&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> InteractiveConflictResolver</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">uiManager</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.db </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.ui </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> uiManager;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> presentConflictsToUser</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">docId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> conflictInfo</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> detectConflicts</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.db, docId);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">conflictInfo.hasConflict) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 显示冲突解决界面</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> resolution</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.ui.</span><span class="__shiki_1t8gfj">showConflictResolution</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      docId: docId,</span></span>
<span class="line"><span class="__shiki_140thh">      conflicts: conflictInfo.conflicts,</span></span>
<span class="line"><span class="__shiki_140thh">      options: {</span></span>
<span class="line"><span class="__shiki_140thh">        allowMerge: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        allowSelect: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        allowCancel: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (resolution.action </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;select&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 用户选择了特定版本</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">useSelectedVersion</span><span class="__shiki_140thh">(docId, resolution.selectedRev);</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (resolution.action </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;merge&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 用户手动合并</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">saveMergedVersion</span><span class="__shiki_140thh">(docId, resolution.mergedDoc);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> resolution;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> useSelectedVersion</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">docId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">selectedRev</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> selectedDoc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(docId, { rev: selectedRev });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 将其他版本标记为冲突</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> conflictInfo</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> detectConflicts</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.db, docId);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> conflict</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> conflictInfo.conflicts) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (conflict.rev </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_140thh"> selectedRev) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">markAsConflict</span><span class="__shiki_140thh">(docId, conflict.rev);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 保存选择的版本</span></span>
<span class="line"><span class="__shiki_140thh">    selectedDoc._rev </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> conflictInfo.currentRev;</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(selectedDoc);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="六、数据模型设计与优化" tabindex="-1">六、数据模型设计与优化 <a class="header-anchor" href="#六、数据模型设计与优化" aria-label="Permalink to &quot;六、数据模型设计与优化&quot;">​</a></h2><h3 id="_6-1-离线优先数据模型" tabindex="-1">6.1 离线优先数据模型 <a class="header-anchor" href="#_6-1-离线优先数据模型" aria-label="Permalink to &quot;6.1 离线优先数据模型&quot;">​</a></h3><h4 id="_6-1-1-文档结构设计" tabindex="-1">6.1.1 文档结构设计 <a class="header-anchor" href="#_6-1-1-文档结构设计" aria-label="Permalink to &quot;6.1.1 文档结构设计&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 基础文档结构</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> baseDocument</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  _id: </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">,           </span><span class="__shiki_21nrsd">// 文档ID</span></span>
<span class="line"><span class="__shiki_140thh">  _rev: </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">,          </span><span class="__shiki_21nrsd">// 修订版本</span></span>
<span class="line"><span class="__shiki_140thh">  type: </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">,          </span><span class="__shiki_21nrsd">// 文档类型标识</span></span>
<span class="line"><span class="__shiki_140thh">  createdAt: </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">,     </span><span class="__shiki_21nrsd">// 创建时间</span></span>
<span class="line"><span class="__shiki_140thh">  updatedAt: </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">,     </span><span class="__shiki_21nrsd">// 更新时间</span></span>
<span class="line"><span class="__shiki_140thh">  deleted: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,    </span><span class="__shiki_21nrsd">// 软删除标记</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 同步元数据</span></span>
<span class="line"><span class="__shiki_140thh">  _sync: {</span></span>
<span class="line"><span class="__shiki_140thh">    source: </span><span class="__shiki_mdbnqw">&#39;local&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 来源: local, remote, sync</span></span>
<span class="line"><span class="__shiki_140thh">    lastSynced: </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 最后同步时间</span></span>
<span class="line"><span class="__shiki_140thh">    conflicts: [],   </span><span class="__shiki_21nrsd">// 冲突记录</span></span>
<span class="line"><span class="__shiki_140thh">    pending: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_21nrsd">   // 待同步标记</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 用户文档示例</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> userDocument</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  ...</span><span class="__shiki_140thh">baseDocument,</span></span>
<span class="line"><span class="__shiki_140thh">  type: </span><span class="__shiki_mdbnqw">&#39;user&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  _id: </span><span class="__shiki_mdbnqw">&#39;user_1234567890&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  username: </span><span class="__shiki_mdbnqw">&#39;johndoe&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  email: </span><span class="__shiki_mdbnqw">&#39;john@example.com&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  profile: {</span></span>
<span class="line"><span class="__shiki_140thh">    firstName: </span><span class="__shiki_mdbnqw">&#39;John&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    lastName: </span><span class="__shiki_mdbnqw">&#39;Doe&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    avatar: </span><span class="__shiki_mdbnqw">&#39;avatar.jpg&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  settings: {</span></span>
<span class="line"><span class="__shiki_140thh">    theme: </span><span class="__shiki_mdbnqw">&#39;dark&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    notifications: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 订单文档示例</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> orderDocument</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  ...</span><span class="__shiki_140thh">baseDocument,</span></span>
<span class="line"><span class="__shiki_140thh">  type: </span><span class="__shiki_mdbnqw">&#39;order&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  _id: </span><span class="__shiki_mdbnqw">&#39;order_&#39;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &#39;_&#39;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">random</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">  userId: </span><span class="__shiki_mdbnqw">&#39;user_1234567890&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  items: [</span></span>
<span class="line"><span class="__shiki_140thh">    { productId: </span><span class="__shiki_mdbnqw">&#39;prod_1&#39;</span><span class="__shiki_140thh">, quantity: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, price: </span><span class="__shiki_dzsirb">25.99</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">    { productId: </span><span class="__shiki_mdbnqw">&#39;prod_2&#39;</span><span class="__shiki_140thh">, quantity: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, price: </span><span class="__shiki_dzsirb">15.50</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">  ],</span></span>
<span class="line"><span class="__shiki_140thh">  total: </span><span class="__shiki_dzsirb">67.48</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  status: </span><span class="__shiki_mdbnqw">&#39;pending&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// pending, confirmed, shipped, delivered, cancelled</span></span>
<span class="line"><span class="__shiki_140thh">  shippingAddress: {</span></span>
<span class="line"><span class="__shiki_140thh">    street: </span><span class="__shiki_mdbnqw">&#39;123 Main St&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    city: </span><span class="__shiki_mdbnqw">&#39;Anytown&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    zipCode: </span><span class="__shiki_mdbnqw">&#39;12345&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h4 id="_6-1-2-关系建模策略" tabindex="-1">6.1.2 关系建模策略 <a class="header-anchor" href="#_6-1-2-关系建模策略" aria-label="Permalink to &quot;6.1.2 关系建模策略&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 策略1：内嵌文档（适合一对一或少量一对多）</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> userWithOrders</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  _id: </span><span class="__shiki_mdbnqw">&#39;user_123&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  type: </span><span class="__shiki_mdbnqw">&#39;user&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  name: </span><span class="__shiki_mdbnqw">&#39;张三&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  orders: [</span></span>
<span class="line"><span class="__shiki_140thh">    { orderId: </span><span class="__shiki_mdbnqw">&#39;order_1&#39;</span><span class="__shiki_140thh">, total: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">, date: </span><span class="__shiki_mdbnqw">&#39;2024-01-01&#39;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">    { orderId: </span><span class="__shiki_mdbnqw">&#39;order_2&#39;</span><span class="__shiki_140thh">, total: </span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">, date: </span><span class="__shiki_mdbnqw">&#39;2024-01-02&#39;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 策略2：文档引用（适合多对多关系）</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> userDoc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  _id: </span><span class="__shiki_mdbnqw">&#39;user_123&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  type: </span><span class="__shiki_mdbnqw">&#39;user&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  name: </span><span class="__shiki_mdbnqw">&#39;张三&#39;</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> orderDoc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  _id: </span><span class="__shiki_mdbnqw">&#39;order_456&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  type: </span><span class="__shiki_mdbnqw">&#39;order&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  userId: </span><span class="__shiki_mdbnqw">&#39;user_123&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 引用用户ID</span></span>
<span class="line"><span class="__shiki_140thh">  items: [</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 策略3：连接文档（适合复杂关系）</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> userOrderLink</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  _id: </span><span class="__shiki_mdbnqw">&#39;link_user123_order456&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  type: </span><span class="__shiki_mdbnqw">&#39;link&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  from: </span><span class="__shiki_mdbnqw">&#39;user_123&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  to: </span><span class="__shiki_mdbnqw">&#39;order_456&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  relation: </span><span class="__shiki_mdbnqw">&#39;purchased&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  timestamp: </span><span class="__shiki_mdbnqw">&#39;2024-01-01T10:00:00Z&#39;</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_6-2-索引与查询优化" tabindex="-1">6.2 索引与查询优化 <a class="header-anchor" href="#_6-2-索引与查询优化" aria-label="Permalink to &quot;6.2 索引与查询优化&quot;">​</a></h3><h4 id="_6-2-1-视图设计" tabindex="-1">6.2.1 视图设计 <a class="header-anchor" href="#_6-2-1-视图设计" aria-label="Permalink to &quot;6.2.1 视图设计&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 设计文档示例</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> designDoc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  _id: </span><span class="__shiki_mdbnqw">&#39;_design/app&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  views: {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 按类型和状态查询</span></span>
<span class="line"><span class="__shiki_140thh">    by_type_status: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      map</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">doc</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (doc.type </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> doc.status) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">          emit</span><span class="__shiki_140thh">([doc.type, doc.status, doc.updatedAt], {</span></span>
<span class="line"><span class="__shiki_140thh">            _id: doc._id,</span></span>
<span class="line"><span class="__shiki_140thh">            type: doc.type,</span></span>
<span class="line"><span class="__shiki_140thh">            status: doc.status,</span></span>
<span class="line"><span class="__shiki_140thh">            updatedAt: doc.updatedAt</span></span>
<span class="line"><span class="__shiki_140thh">          });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 按用户和时间范围查询</span></span>
<span class="line"><span class="__shiki_140thh">    by_user_time: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      map</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">doc</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (doc.userId </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> doc.createdAt) {</span></span>
<span class="line"><span class="__shiki_1itgoe">          var</span><span class="__shiki_140thh"> date </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(doc.createdAt);</span></span>
<span class="line"><span class="__shiki_1t8gfj">          emit</span><span class="__shiki_140thh">([doc.userId, date.</span><span class="__shiki_1t8gfj">getFullYear</span><span class="__shiki_140thh">(), date.</span><span class="__shiki_1t8gfj">getMonth</span><span class="__shiki_140thh">(), date.</span><span class="__shiki_1t8gfj">getDate</span><span class="__shiki_140thh">()], {</span></span>
<span class="line"><span class="__shiki_140thh">            _id: doc._id,</span></span>
<span class="line"><span class="__shiki_140thh">            title: doc.title </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            createdAt: doc.createdAt</span></span>
<span class="line"><span class="__shiki_140thh">          });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 统计视图</span></span>
<span class="line"><span class="__shiki_140thh">    stats_by_type: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      map</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">doc</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (doc.type) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">          emit</span><span class="__shiki_140thh">(doc.type, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      reduce: </span><span class="__shiki_mdbnqw">&#39;_count&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // Mango查询索引</span></span>
<span class="line"><span class="__shiki_140thh">  indexes: {</span></span>
<span class="line"><span class="__shiki_140thh">    by_user_status: {</span></span>
<span class="line"><span class="__shiki_140thh">      index: {</span></span>
<span class="line"><span class="__shiki_140thh">        fields: [</span><span class="__shiki_mdbnqw">&#39;userId&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;status&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;createdAt&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    fulltext_search: {</span></span>
<span class="line"><span class="__shiki_140thh">      index: {</span></span>
<span class="line"><span class="__shiki_140thh">        fields: [</span><span class="__shiki_mdbnqw">&#39;title&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;description&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;content&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">        default_analyzer: </span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        index_array_lengths: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h4 id="_6-2-2-查询优化技巧" tabindex="-1">6.2.2 查询优化技巧 <a class="header-anchor" href="#_6-2-2-查询优化技巧" aria-label="Permalink to &quot;6.2.2 查询优化技巧&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> QueryOptimizer</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.db </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.queryCache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.cacheTTL </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 5分钟</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> optimizedQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">query</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">useCache</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> cacheKey</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">(query);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (useCache </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.queryCache.</span><span class="__shiki_1t8gfj">has</span><span class="__shiki_140thh">(cacheKey)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> cached</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.queryCache.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(cacheKey);</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> cached.timestamp </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.cacheTTL) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> cached.result;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 优化查询参数</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> optimizedQuery</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">optimizeQueryParams</span><span class="__shiki_140thh">(query);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 执行查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(optimizedQuery);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 缓存结果</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (useCache </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> result.docs.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.queryCache.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(cacheKey, {</span></span>
<span class="line"><span class="__shiki_140thh">        result: result,</span></span>
<span class="line"><span class="__shiki_140thh">        timestamp: Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 清理过期缓存</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cleanupCache</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  optimizeQueryParams</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">query</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> optimized</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> { </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">query };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 限制返回字段</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">optimized.fields) {</span></span>
<span class="line"><span class="__shiki_140thh">      optimized.fields </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;_id&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;_rev&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;type&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;updatedAt&#39;</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 添加分页限制</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">optimized.limit) {</span></span>
<span class="line"><span class="__shiki_140thh">      optimized.limit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 确保有排序字段</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">optimized.sort) {</span></span>
<span class="line"><span class="__shiki_140thh">      optimized.sort </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [{ updatedAt: </span><span class="__shiki_mdbnqw">&#39;desc&#39;</span><span class="__shiki_140thh"> }];</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 使用索引提示</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (optimized.selector </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">optimized.use_index) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> index</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">suggestIndex</span><span class="__shiki_140thh">(optimized.selector);</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (index) {</span></span>
<span class="line"><span class="__shiki_140thh">        optimized.use_index </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> index;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> optimized;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="七、性能优化与监控" tabindex="-1">七、性能优化与监控 <a class="header-anchor" href="#七、性能优化与监控" aria-label="Permalink to &quot;七、性能优化与监控&quot;">​</a></h2><h3 id="_7-1-存储优化" tabindex="-1">7.1 存储优化 <a class="header-anchor" href="#_7-1-存储优化" aria-label="Permalink to &quot;7.1 存储优化&quot;">​</a></h3><h4 id="_7-1-1-数据库压缩" tabindex="-1">7.1.1 数据库压缩 <a class="header-anchor" href="#_7-1-1-数据库压缩" aria-label="Permalink to &quot;7.1.1 数据库压缩&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 手动触发压缩</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> compactDatabase</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;开始压缩数据库...&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> startTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">compact</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> endTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`数据库压缩完成，耗时: \${</span><span class="__shiki_140thh">endTime</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> startTime</span><span class="__shiki_mdbnqw">}ms\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;压缩失败:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 定期压缩</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> scheduleCompaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">interval</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 24</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  setInterval</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> info</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">info</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 仅当数据量较大时压缩</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (info.doc_count </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_1t8gfj"> compactDatabase</span><span class="__shiki_140thh">(db);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }, interval);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_7-1-2-数据清理策略" tabindex="-1">7.1.2 数据清理策略 <a class="header-anchor" href="#_7-1-2-数据清理策略" aria-label="Permalink to &quot;7.1.2 数据清理策略&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> DataCleanupManager</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.db </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.retentionDays </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 90</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 保留90天数据</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> cleanupOldData</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> cutoffDate</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    cutoffDate.</span><span class="__shiki_1t8gfj">setDate</span><span class="__shiki_140thh">(cutoffDate.</span><span class="__shiki_1t8gfj">getDate</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.retentionDays);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 查找过期文档</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      selector: {</span></span>
<span class="line"><span class="__shiki_140thh">        type: </span><span class="__shiki_mdbnqw">&#39;log&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 示例：清理日志</span></span>
<span class="line"><span class="__shiki_140thh">        createdAt: { $lt: cutoffDate.</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">() }</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      fields: [</span><span class="__shiki_mdbnqw">&#39;_id&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;_rev&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`找到 \${</span><span class="__shiki_140thh">result</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">docs</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_mdbnqw">} 个过期文档\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 批量删除</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (result.docs.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> deleteDocs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> result.docs.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">doc</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> ({</span></span>
<span class="line"><span class="__shiki_1itgoe">        ...</span><span class="__shiki_140thh">doc,</span></span>
<span class="line"><span class="__shiki_140thh">        _deleted: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      }));</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.</span><span class="__shiki_1t8gfj">bulkDocs</span><span class="__shiki_140thh">(deleteDocs);</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`已删除 \${</span><span class="__shiki_140thh">result</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">docs</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_mdbnqw">} 个过期文档\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> result.docs.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> cleanupOrphanedDocuments</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 清理无关联的文档</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> allDocs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.</span><span class="__shiki_1t8gfj">allDocs</span><span class="__shiki_140thh">({ include_docs: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> orphanedDocs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> row</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> allDocs.rows) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> doc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> row.doc;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 检查文档是否有有效关联</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">isOrphaned</span><span class="__shiki_140thh">(doc)) {</span></span>
<span class="line"><span class="__shiki_140thh">        orphanedDocs.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_1itgoe">          ...</span><span class="__shiki_140thh">doc,</span></span>
<span class="line"><span class="__shiki_140thh">          _deleted: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (orphanedDocs.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.</span><span class="__shiki_1t8gfj">bulkDocs</span><span class="__shiki_140thh">(orphanedDocs);</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`清理了 \${</span><span class="__shiki_140thh">orphanedDocs</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_mdbnqw">} 个孤儿文档\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-同步性能优化" tabindex="-1">7.2 同步性能优化 <a class="header-anchor" href="#_7-2-同步性能优化" aria-label="Permalink to &quot;7.2 同步性能优化&quot;">​</a></h3><h4 id="_7-2-1-增量同步策略" tabindex="-1">7.2.1 增量同步策略 <a class="header-anchor" href="#_7-2-1-增量同步策略" aria-label="Permalink to &quot;7.2.1 增量同步策略&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> IncrementalSyncManager</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">localDB</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">remoteDB</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.localDB </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> localDB;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.remoteDB </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> remoteDB;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.checkpoint </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.syncBatchSize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> syncIncremental</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取检查点</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">loadCheckpoint</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取远程更改</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> changes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getRemoteChanges</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 分批处理更改</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">processChangesInBatches</span><span class="__shiki_140thh">(changes);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 保存检查点</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">saveCheckpoint</span><span class="__shiki_140thh">(changes.last_seq);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> getRemoteChanges</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> options</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      since: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.checkpoint </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      limit: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.syncBatchSize,</span></span>
<span class="line"><span class="__shiki_140thh">      include_docs: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      batch_size: </span><span class="__shiki_dzsirb">50</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.remoteDB.</span><span class="__shiki_1t8gfj">changes</span><span class="__shiki_140thh">(options);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> processChangesInBatches</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">changes</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> batches</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">createBatches</span><span class="__shiki_140thh">(changes.results, </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> batch</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> batches) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">processBatch</span><span class="__shiki_140thh">(batch);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> processBatch</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">batch</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> bulkDocs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> batch.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">change</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (change.deleted) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">          _id: change.id,</span></span>
<span class="line"><span class="__shiki_140thh">          _rev: change.changes[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">].rev,</span></span>
<span class="line"><span class="__shiki_140thh">          _deleted: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> change.doc;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.localDB.</span><span class="__shiki_1t8gfj">bulkDocs</span><span class="__shiki_140thh">(bulkDocs);</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;批量处理失败:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 失败时降级为单文档处理</span></span>
<span class="line"><span class="__shiki_1itgoe">      for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> doc</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> bulkDocs) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">          await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.localDB.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(doc);</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (singleError) {</span></span>
<span class="line"><span class="__shiki_1itgoe">          if</span><span class="__shiki_140thh"> (singleError.status </span><span class="__shiki_1itgoe">===</span><span class="__shiki_dzsirb"> 409</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 冲突，记录但不停止</span></span>
<span class="line"><span class="__shiki_140thh">            console.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`文档冲突: \${</span><span class="__shiki_140thh">doc</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">_id</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">          } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`文档处理失败: \${</span><span class="__shiki_140thh">doc</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">_id</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">, singleError);</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_7-2-2-网络优化" tabindex="-1">7.2.2 网络优化 <a class="header-anchor" href="#_7-2-2-网络优化" aria-label="Permalink to &quot;7.2.2 网络优化&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> NetworkOptimizer</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.lastSyncTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.syncInterval </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 30000</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 30秒</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.backoffFactor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.maxBackoff </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 300000</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 5分钟</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.currentBackoff </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  shouldSync</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> now</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> timeSinceLastSync</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> now </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.lastSyncTime;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查是否达到同步间隔</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (timeSinceLastSync </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.syncInterval </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.currentBackoff) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查网络状态</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">navigator.onLine) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.currentBackoff </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">min</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.currentBackoff </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.backoffFactor,</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.maxBackoff</span></span>
<span class="line"><span class="__shiki_140thh">      );</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 重置退避</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.currentBackoff </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  recordSync</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">success</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.lastSyncTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">success) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.currentBackoff </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">min</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.currentBackoff </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.backoffFactor,</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.maxBackoff</span></span>
<span class="line"><span class="__shiki_140thh">      );</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  getNextSyncTime</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.lastSyncTime </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.syncInterval </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.currentBackoff;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-3-监控与日志" tabindex="-1">7.3 监控与日志 <a class="header-anchor" href="#_7-3-监控与日志" aria-label="Permalink to &quot;7.3 监控与日志&quot;">​</a></h3><h4 id="_7-3-1-性能监控" tabindex="-1">7.3.1 性能监控 <a class="header-anchor" href="#_7-3-1-性能监控" aria-label="Permalink to &quot;7.3.1 性能监控&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> PerformanceMonitor</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.metrics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      readLatency: [],</span></span>
<span class="line"><span class="__shiki_140thh">      writeLatency: [],</span></span>
<span class="line"><span class="__shiki_140thh">      syncDuration: [],</span></span>
<span class="line"><span class="__shiki_140thh">      conflictCount: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      errorCount: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.startTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  recordOperation</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">operation</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">duration</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">success</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> metric</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      operation: operation,</span></span>
<span class="line"><span class="__shiki_140thh">      duration: duration,</span></span>
<span class="line"><span class="__shiki_140thh">      timestamp: Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">      success: success</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    switch</span><span class="__shiki_140thh">(operation) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;read&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.metrics.readLatency.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(metric);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.metrics.readLatency.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">          this</span><span class="__shiki_140thh">.metrics.readLatency.</span><span class="__shiki_1t8gfj">shift</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;write&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.metrics.writeLatency.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(metric);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.metrics.writeLatency.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">          this</span><span class="__shiki_140thh">.metrics.writeLatency.</span><span class="__shiki_1t8gfj">shift</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;sync&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.metrics.syncDuration.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(metric);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.metrics.syncDuration.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">          this</span><span class="__shiki_140thh">.metrics.syncDuration.</span><span class="__shiki_1t8gfj">shift</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">success) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.metrics.errorCount</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  getStats</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> uptime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.startTime;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      uptime: uptime,</span></span>
<span class="line"><span class="__shiki_140thh">      totalOperations: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.metrics.readLatency.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.metrics.writeLatency.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      avgReadLatency: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateAverage</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.metrics.readLatency),</span></span>
<span class="line"><span class="__shiki_140thh">      avgWriteLatency: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateAverage</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.metrics.writeLatency),</span></span>
<span class="line"><span class="__shiki_140thh">      avgSyncDuration: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateAverage</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.metrics.syncDuration),</span></span>
<span class="line"><span class="__shiki_140thh">      errorRate: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.metrics.errorCount </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.metrics.readLatency.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.metrics.writeLatency.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      conflicts: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.metrics.conflictCount</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  calculateAverage</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">metrics</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (metrics.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> sum</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> metrics.</span><span class="__shiki_1t8gfj">reduce</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">total</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">metric</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> total </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> metric.duration, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> sum </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> metrics.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_7-3-2-错误追踪" tabindex="-1">7.3.2 错误追踪 <a class="header-anchor" href="#_7-3-2-错误追踪" aria-label="Permalink to &quot;7.3.2 错误追踪&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ErrorTracker</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.errors </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.maxErrors </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  track</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">context</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> errorRecord</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      id: </span><span class="__shiki_mdbnqw">\`err_\${</span><span class="__shiki_140thh">Date</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_mdbnqw">()</span><span class="__shiki_mdbnqw">}_\${</span><span class="__shiki_140thh">Math</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">random</span><span class="__shiki_mdbnqw">().</span><span class="__shiki_1t8gfj">toString</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">36</span><span class="__shiki_mdbnqw">).</span><span class="__shiki_1t8gfj">substr</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_mdbnqw">, </span><span class="__shiki_dzsirb">9</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      type: error.name,</span></span>
<span class="line"><span class="__shiki_140thh">      message: error.message,</span></span>
<span class="line"><span class="__shiki_140thh">      stack: error.stack,</span></span>
<span class="line"><span class="__shiki_140thh">      context: context,</span></span>
<span class="line"><span class="__shiki_140thh">      timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">      userAgent: navigator.userAgent,</span></span>
<span class="line"><span class="__shiki_140thh">      online: navigator.onLine</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.errors.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(errorRecord);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 限制错误记录数量</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.errors.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.maxErrors) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.errors.</span><span class="__shiki_1t8gfj">shift</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 保存到本地存储以便分析</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">saveToStorage</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 可选的远程错误报告</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">reportToServer</span><span class="__shiki_140thh">(errorRecord);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> errorRecord.id;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  saveToStorage</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      localStorage.</span><span class="__shiki_1t8gfj">setItem</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;pouchdb_errors&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.errors));</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (e) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;无法保存错误到本地存储:&#39;</span><span class="__shiki_140thh">, e);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> reportToServer</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">errorRecord</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">navigator.onLine) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 离线时不报告</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 发送错误报告到服务器</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/api/error-report&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">        method: </span><span class="__shiki_mdbnqw">&#39;POST&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        headers: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &#39;Content-Type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;application/json&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        body: </span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          error: errorRecord,</span></span>
<span class="line"><span class="__shiki_140thh">          appVersion: </span><span class="__shiki_mdbnqw">&#39;1.0.0&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (reportError) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;错误报告失败:&#39;</span><span class="__shiki_140thh">, reportError);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  getErrorSummary</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> summary</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {};</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> error</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.errors) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> key</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> \`\${</span><span class="__shiki_140thh">error</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">type</span><span class="__shiki_mdbnqw">}:\${</span><span class="__shiki_140thh">error</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">message</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">summary[key]) {</span></span>
<span class="line"><span class="__shiki_140thh">        summary[key] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">          type: error.type,</span></span>
<span class="line"><span class="__shiki_140thh">          message: error.message,</span></span>
<span class="line"><span class="__shiki_140thh">          count: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          firstOccurred: error.timestamp,</span></span>
<span class="line"><span class="__shiki_140thh">          lastOccurred: error.timestamp,</span></span>
<span class="line"><span class="__shiki_140thh">          contexts: []</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      summary[key].count</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      summary[key].lastOccurred </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> error.timestamp;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (summary[key].contexts.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        summary[key].contexts.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(error.context);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> Object.</span><span class="__shiki_1t8gfj">values</span><span class="__shiki_140thh">(summary).</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">a</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">b</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> b.count </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> a.count);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="八、安全与认证" tabindex="-1">八、安全与认证 <a class="header-anchor" href="#八、安全与认证" aria-label="Permalink to &quot;八、安全与认证&quot;">​</a></h2><h3 id="_8-1-客户端安全" tabindex="-1">8.1 客户端安全 <a class="header-anchor" href="#_8-1-客户端安全" aria-label="Permalink to &quot;8.1 客户端安全&quot;">​</a></h3><h4 id="_8-1-1-数据加密" tabindex="-1">8.1.1 数据加密 <a class="header-anchor" href="#_8-1-1-数据加密" aria-label="Permalink to &quot;8.1.1 数据加密&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> DataEncryption</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">encryptionKey</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> encryptionKey;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.algorithm </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;AES-GCM&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> encrypt</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 生成随机IV</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> iv</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> crypto.</span><span class="__shiki_1t8gfj">getRandomValues</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Uint8Array</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">12</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 导入密钥</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> cryptoKey</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">importKey</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 加密数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> encrypted</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> crypto.subtle.</span><span class="__shiki_1t8gfj">encrypt</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      {</span></span>
<span class="line"><span class="__shiki_140thh">        name: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.algorithm,</span></span>
<span class="line"><span class="__shiki_140thh">        iv: iv</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      cryptoKey,</span></span>
<span class="line"><span class="__shiki_1itgoe">      new</span><span class="__shiki_1t8gfj"> TextEncoder</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">encode</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">(data))</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 组合IV和加密数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Uint8Array</span><span class="__shiki_140thh">(iv.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> encrypted.byteLength);</span></span>
<span class="line"><span class="__shiki_140thh">    result.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(iv);</span></span>
<span class="line"><span class="__shiki_140thh">    result.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Uint8Array</span><span class="__shiki_140thh">(encrypted), iv.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1t8gfj"> btoa</span><span class="__shiki_140thh">(String.fromCharCode.</span><span class="__shiki_1t8gfj">apply</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">, result));</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> decrypt</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">encryptedData</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 解码Base64</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> binary</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> atob</span><span class="__shiki_140thh">(encryptedData);</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> bytes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Uint8Array</span><span class="__shiki_140thh">(binary.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> binary.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        bytes[i] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> binary.</span><span class="__shiki_1t8gfj">charCodeAt</span><span class="__shiki_140thh">(i);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 提取IV和加密数据</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> iv</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> bytes.</span><span class="__shiki_1t8gfj">slice</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">12</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> encrypted</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> bytes.</span><span class="__shiki_1t8gfj">slice</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">12</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 导入密钥</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> cryptoKey</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">importKey</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 解密数据</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> decrypted</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> crypto.subtle.</span><span class="__shiki_1t8gfj">decrypt</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">          name: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.algorithm,</span></span>
<span class="line"><span class="__shiki_140thh">          iv: iv</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        cryptoKey,</span></span>
<span class="line"><span class="__shiki_140thh">        encrypted</span></span>
<span class="line"><span class="__shiki_140thh">      );</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">parse</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> TextDecoder</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">decode</span><span class="__shiki_140thh">(decrypted));</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;解密失败:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> importKey</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 从密码派生密钥</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> keyMaterial</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> crypto.subtle.</span><span class="__shiki_1t8gfj">importKey</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;raw&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">      new</span><span class="__shiki_1t8gfj"> TextEncoder</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">encode</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.key),</span></span>
<span class="line"><span class="__shiki_140thh">      { name: </span><span class="__shiki_mdbnqw">&#39;PBKDF2&#39;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_dzsirb">      false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      [</span><span class="__shiki_mdbnqw">&#39;deriveKey&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> crypto.subtle.</span><span class="__shiki_1t8gfj">deriveKey</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      {</span></span>
<span class="line"><span class="__shiki_140thh">        name: </span><span class="__shiki_mdbnqw">&#39;PBKDF2&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        salt: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> TextEncoder</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">encode</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;pouchdb-encryption-salt&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        iterations: </span><span class="__shiki_dzsirb">100000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        hash: </span><span class="__shiki_mdbnqw">&#39;SHA-256&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      keyMaterial,</span></span>
<span class="line"><span class="__shiki_140thh">      { name: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.algorithm, length: </span><span class="__shiki_dzsirb">256</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_dzsirb">      false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      [</span><span class="__shiki_mdbnqw">&#39;encrypt&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;decrypt&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用加密的PouchDB包装器</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> EncryptedPouchDB</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">dbName</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">encryptionKey</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.db </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> PouchDB</span><span class="__shiki_140thh">(dbName);</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.encryption </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> DataEncryption</span><span class="__shiki_140thh">(encryptionKey);</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.encryptedFields </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;password&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;phone&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;address&#39;</span><span class="__shiki_140thh">]; </span><span class="__shiki_21nrsd">// 需要加密的字段</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> put</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">doc</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 加密敏感字段</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> encryptedDoc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">encryptFields</span><span class="__shiki_140thh">(doc);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(encryptedDoc);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> get</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> doc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(id);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">decryptFields</span><span class="__shiki_140thh">(doc);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> encryptFields</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">doc</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> encrypted</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> { </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">doc };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> field</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.encryptedFields) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (encrypted[field] </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_dzsirb"> undefined</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        encrypted[field] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.encryption.</span><span class="__shiki_1t8gfj">encrypt</span><span class="__shiki_140thh">(encrypted[field]);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> encrypted;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> decryptFields</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">doc</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> decrypted</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> { </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">doc };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> field</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.encryptedFields) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (decrypted[field] </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_dzsirb"> undefined</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        decrypted[field] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.encryption.</span><span class="__shiki_1t8gfj">decrypt</span><span class="__shiki_140thh">(decrypted[field]);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> decrypted;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-2-认证与授权" tabindex="-1">8.2 认证与授权 <a class="header-anchor" href="#_8-2-认证与授权" aria-label="Permalink to &quot;8.2 认证与授权&quot;">​</a></h3><h4 id="_8-2-1-couchdb认证集成" tabindex="-1">8.2.1 CouchDB认证集成 <a class="header-anchor" href="#_8-2-1-couchdb认证集成" aria-label="Permalink to &quot;8.2.1 CouchDB认证集成&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CouchDBAuthenticator</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">serverUrl</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.serverUrl </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> serverUrl;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.session </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> login</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">username</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">password</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">serverUrl</span><span class="__shiki_mdbnqw">}/_session\`</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">        method: </span><span class="__shiki_mdbnqw">&#39;POST&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        headers: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &#39;Content-Type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;application/json&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        body: </span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          name: username,</span></span>
<span class="line"><span class="__shiki_140thh">          password: password</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">response.ok) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;认证失败&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> data</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> response.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.session </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        username: data.name,</span></span>
<span class="line"><span class="__shiki_140thh">        roles: data.roles,</span></span>
<span class="line"><span class="__shiki_140thh">        cookie: response.headers.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;set-cookie&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      };</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 保存会话信息</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">saveSession</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.session;</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;登录失败:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> logout</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">serverUrl</span><span class="__shiki_mdbnqw">}/_session\`</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">        method: </span><span class="__shiki_mdbnqw">&#39;DELETE&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        credentials: </span><span class="__shiki_mdbnqw">&#39;include&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.session </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">clearSession</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;登出失败:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  saveSession</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    localStorage.</span><span class="__shiki_1t8gfj">setItem</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;couchdb_session&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      username: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.session.username,</span></span>
<span class="line"><span class="__shiki_140thh">      timestamp: Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }));</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  clearSession</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    localStorage.</span><span class="__shiki_1t8gfj">removeItem</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;couchdb_session&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  restoreSession</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> saved</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> localStorage.</span><span class="__shiki_1t8gfj">getItem</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;couchdb_session&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (saved) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> session</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">parse</span><span class="__shiki_140thh">(saved);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 检查会话是否过期（24小时）</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> session.timestamp </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 24</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> session;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  getAuthHeaders</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.session </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.session.cookie) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;Cookie&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.session.cookie</span></span>
<span class="line"><span class="__shiki_140thh">      };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {};</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_8-2-2-基于角色的访问控制" tabindex="-1">8.2.2 基于角色的访问控制 <a class="header-anchor" href="#_8-2-2-基于角色的访问控制" aria-label="Permalink to &quot;8.2.2 基于角色的访问控制&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> RoleBasedAccessControl</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">userRoles</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.db </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.userRoles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> userRoles;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 验证文档读取权限</span></span>
<span class="line"><span class="__shiki_1t8gfj">  canRead</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">doc</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 公共文档</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (doc.access </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> doc.access.public </span><span class="__shiki_1itgoe">===</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 用户自己的文档</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (doc.userId </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> doc.userId </span><span class="__shiki_1itgoe">===</span><span class="__shiki_140thh"> context.userId) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 基于角色的访问</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (doc.access </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> doc.access.roles) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> role</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.userRoles) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (doc.access.roles.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(role)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">          return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 验证文档写入权限</span></span>
<span class="line"><span class="__shiki_1t8gfj">  canWrite</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">doc</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">newDoc</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 新文档创建</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">doc) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">canCreate</span><span class="__shiki_140thh">(newDoc, context);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 文档所有者</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (doc.userId </span><span class="__shiki_1itgoe">===</span><span class="__shiki_140thh"> context.userId) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 管理员角色</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.userRoles.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;admin&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 文档特定的写入权限</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (doc.access </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> doc.access.writeRoles) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> role</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.userRoles) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (doc.access.writeRoles.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(role)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">          return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  canCreate</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">newDoc</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 设置文档所有者</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">newDoc.userId) {</span></span>
<span class="line"><span class="__shiki_140thh">      newDoc.userId </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> context.userId;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证用户是否有权创建此类文档</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> allowedTypes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getAllowedDocumentTypes</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> allowedTypes.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(newDoc.type);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  getAllowedDocumentTypes</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> typePermissions</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;user&#39;</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;admin&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;order&#39;</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;user&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;admin&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;product&#39;</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;editor&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;admin&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;comment&#39;</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;user&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;admin&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> allowedTypes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">type</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">roles</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">of</span><span class="__shiki_140thh"> Object.</span><span class="__shiki_1t8gfj">entries</span><span class="__shiki_140thh">(typePermissions)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> userRole</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.userRoles) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (roles.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(userRole)) {</span></span>
<span class="line"><span class="__shiki_140thh">          allowedTypes.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(type);</span></span>
<span class="line"><span class="__shiki_1itgoe">          break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> allowedTypes;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 查询过滤</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> filterDocuments</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">query</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(query);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> filteredDocs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> result.docs.</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">doc</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">canRead</span><span class="__shiki_140thh">(doc, context)</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      docs: filteredDocs,</span></span>
<span class="line"><span class="__shiki_140thh">      warning: result.docs.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> !==</span><span class="__shiki_140thh"> filteredDocs.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        \`过滤了 \${</span><span class="__shiki_140thh">result</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">docs</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> filteredDocs</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_mdbnqw">} 个无权限文档\`</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_dzsirb"> null</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="九、应用架构模式" tabindex="-1">九、应用架构模式 <a class="header-anchor" href="#九、应用架构模式" aria-label="Permalink to &quot;九、应用架构模式&quot;">​</a></h2><h3 id="_9-1-离线优先应用架构" tabindex="-1">9.1 离线优先应用架构 <a class="header-anchor" href="#_9-1-离线优先应用架构" aria-label="Permalink to &quot;9.1 离线优先应用架构&quot;">​</a></h3><h4 id="_9-1-1-前端架构" tabindex="-1">9.1.1 前端架构 <a class="header-anchor" href="#_9-1-1-前端架构" aria-label="Permalink to &quot;9.1.1 前端架构&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> OfflineFirstApplication</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.localDB </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> PouchDB</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;local_app_data&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.remoteDB </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.syncManager </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.networkManager </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> NetworkManager</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.cacheManager </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> CacheManager</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.conflictResolver </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ConflictResolver</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.localDB);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> initialize</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">config</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 初始化本地数据库</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">setupLocalDatabase</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 检查网络状态</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> isOnline</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.networkManager.</span><span class="__shiki_1t8gfj">isOnline</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 连接远程数据库（如果在线）</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (isOnline) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">connectToRemote</span><span class="__shiki_140thh">(config.remoteUrl, config.auth);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 启动同步</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.remoteDB) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">startSync</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 恢复离线操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">recoverOfflineOperations</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> setupLocalDatabase</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建必要视图</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">createViews</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建必要索引</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">createIndexes</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 初始化默认数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">initializeDefaultData</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> connectToRemote</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">url</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">auth</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.remoteDB </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> PouchDB</span><span class="__shiki_140thh">(url, {</span></span>
<span class="line"><span class="__shiki_140thh">        auth: auth,</span></span>
<span class="line"><span class="__shiki_140thh">        skip_setup: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 验证连接</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.remoteDB.</span><span class="__shiki_1t8gfj">info</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;远程连接失败:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.remoteDB </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> startSync</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.syncManager </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.localDB.</span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.remoteDB, {</span></span>
<span class="line"><span class="__shiki_140thh">      live: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      retry: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">      back_off_function</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">delay</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">min</span><span class="__shiki_140thh">(delay </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">30000</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      heartbeat: </span><span class="__shiki_dzsirb">10000</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 监听同步事件</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.syncManager</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;change&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.handleSyncChange.</span><span class="__shiki_1t8gfj">bind</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;error&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.handleSyncError.</span><span class="__shiki_1t8gfj">bind</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> handleSyncChange</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">info</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;同步变更:&#39;</span><span class="__shiki_140thh">, info);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 更新UI显示同步状态</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">updateSyncStatus</span><span class="__shiki_140thh">(info);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 处理冲突</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (info.direction </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;pull&#39;</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> info.change.docs.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkForConflicts</span><span class="__shiki_140thh">(info.change.docs);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> checkForConflicts</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">docs</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> doc</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> docs) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (doc._conflicts </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> doc._conflicts.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.conflictResolver.</span><span class="__shiki_1t8gfj">resolveConflicts</span><span class="__shiki_140thh">(doc._id);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> recoverOfflineOperations</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查是否有待同步的操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> pendingOps</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getPendingOperations</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (pendingOps.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`恢复 \${</span><span class="__shiki_140thh">pendingOps</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_mdbnqw">} 个离线操作\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">processPendingOperations</span><span class="__shiki_140thh">(pendingOps);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 业务方法</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> createDocument</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">type</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> doc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      _id: </span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_140thh">type</span><span class="__shiki_mdbnqw">}_\${</span><span class="__shiki_140thh">Date</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_mdbnqw">()</span><span class="__shiki_mdbnqw">}_\${</span><span class="__shiki_140thh">Math</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">random</span><span class="__shiki_mdbnqw">().</span><span class="__shiki_1t8gfj">toString</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">36</span><span class="__shiki_mdbnqw">).</span><span class="__shiki_1t8gfj">substr</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_mdbnqw">, </span><span class="__shiki_dzsirb">9</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      type: type,</span></span>
<span class="line"><span class="__shiki_1itgoe">      ...</span><span class="__shiki_140thh">data,</span></span>
<span class="line"><span class="__shiki_140thh">      createdAt: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">      updatedAt: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">      _sync: {</span></span>
<span class="line"><span class="__shiki_140thh">        pending: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        source: </span><span class="__shiki_mdbnqw">&#39;local&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.localDB.</span><span class="__shiki_1t8gfj">post</span><span class="__shiki_140thh">(doc);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 如果在线，立即尝试同步</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.networkManager.</span><span class="__shiki_1t8gfj">isOnline</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.syncManager) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.syncManager.</span><span class="__shiki_1t8gfj">resume</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;创建文档失败:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 存储到离线队列</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">addToOfflineQueue</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;create&#39;</span><span class="__shiki_140thh">, doc);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> queryDocuments</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">options</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 首先尝试本地查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.localDB.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(options);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 如果没有结果且在线，尝试远程查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (result.docs.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.networkManager.</span><span class="__shiki_1t8gfj">isOnline</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> remoteResult</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.remoteDB.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(options);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 将结果缓存到本地</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cacheDocuments</span><span class="__shiki_140thh">(remoteResult.docs);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> remoteResult;</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (remoteError) {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;远程查询失败，使用本地结果:&#39;</span><span class="__shiki_140thh">, remoteError);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_9-2-数据同步策略" tabindex="-1">9.2 数据同步策略 <a class="header-anchor" href="#_9-2-数据同步策略" aria-label="Permalink to &quot;9.2 数据同步策略&quot;">​</a></h3><h4 id="_9-2-1-智能同步策略" tabindex="-1">9.2.1 智能同步策略 <a class="header-anchor" href="#_9-2-1-智能同步策略" aria-label="Permalink to &quot;9.2.1 智能同步策略&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> SmartSyncStrategy</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">localDB</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">remoteDB</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.localDB </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> localDB;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.remoteDB </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> remoteDB;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.syncHistory </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.dataPriorities </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">(); </span><span class="__shiki_21nrsd">// 文档类型 -&gt; 优先级</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> syncWithStrategy</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">strategy</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;adaptive&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    switch</span><span class="__shiki_140thh"> (strategy) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;adaptive&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">adaptiveSync</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;incremental&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">incrementalSync</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;priority&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">priorityBasedSync</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;background&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">backgroundSync</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">defaultSync</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> adaptiveSync</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 基于网络条件和数据变化的自适应同步</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查网络状况</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> networkQuality</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">assessNetworkQuality</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查数据变更量</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> changeCount</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getLocalChangeCount</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 决定同步策略</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (networkQuality </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;good&#39;</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> changeCount </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 快速同步</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">quickSync</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (networkQuality </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;good&#39;</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> changeCount </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 分批同步</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">batchedSync</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (networkQuality </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;poor&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 仅同步高优先级数据</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">prioritySync</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 后台同步</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">backgroundSync</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> quickSync</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 快速完整同步</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> sync</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.localDB.</span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.remoteDB, {</span></span>
<span class="line"><span class="__shiki_140thh">      live: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      retry: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      batch_size: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      timeout: </span><span class="__shiki_dzsirb">30000</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">reject</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      sync</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;complete&#39;</span><span class="__shiki_140thh">, resolve)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;error&#39;</span><span class="__shiki_140thh">, reject);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> batchedSync</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 分批同步大量数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> changeCount</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getLocalChangeCount</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> batchSize</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> totalBatches</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">ceil</span><span class="__shiki_140thh">(changeCount </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> batchSize);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> batch </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; batch </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> totalBatches; batch</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`同步批次 \${</span><span class="__shiki_140thh">batch</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_mdbnqw">}/\${</span><span class="__shiki_140thh">totalBatches</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">syncBatch</span><span class="__shiki_140thh">(batch </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> batchSize, batchSize);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 批次间短暂暂停</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (batch </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> totalBatches </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">wait</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> syncBatch</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">skip</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">limit</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取本地更改</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> changes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.localDB.</span><span class="__shiki_1t8gfj">changes</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      since: </span><span class="__shiki_mdbnqw">&#39;now&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      limit: limit,</span></span>
<span class="line"><span class="__shiki_140thh">      skip: skip,</span></span>
<span class="line"><span class="__shiki_140thh">      include_docs: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 处理每个更改</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> change</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> changes.results) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (change.doc) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 推送到远程</span></span>
<span class="line"><span class="__shiki_1itgoe">          await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.remoteDB.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(change.doc);</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">          if</span><span class="__shiki_140thh"> (error.status </span><span class="__shiki_1itgoe">===</span><span class="__shiki_dzsirb"> 409</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 冲突，需要处理</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">handleConflict</span><span class="__shiki_140thh">(change.doc);</span></span>
<span class="line"><span class="__shiki_140thh">          } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;同步失败:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> prioritySync</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 仅同步高优先级数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> highPriorityTypes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getHighPriorityTypes</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> type</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> highPriorityTypes) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">syncByType</span><span class="__shiki_140thh">(type);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> syncByType</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">type</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 同步特定类型的文档</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> docs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.localDB.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      selector: { type: type },</span></span>
<span class="line"><span class="__shiki_140thh">      fields: [</span><span class="__shiki_mdbnqw">&#39;_id&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;_rev&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;type&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;updatedAt&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`同步类型 \${</span><span class="__shiki_140thh">type</span><span class="__shiki_mdbnqw">}: \${</span><span class="__shiki_140thh">docs</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">docs</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_mdbnqw">} 个文档\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> batch</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> docs.docs.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">doc</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> ({</span></span>
<span class="line"><span class="__shiki_1itgoe">      ...</span><span class="__shiki_140thh">doc,</span></span>
<span class="line"><span class="__shiki_140thh">      _sync: { priority: </span><span class="__shiki_mdbnqw">&#39;high&#39;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">    }));</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.remoteDB.</span><span class="__shiki_1t8gfj">bulkDocs</span><span class="__shiki_140thh">(batch);</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`同步类型 \${</span><span class="__shiki_140thh">type</span><span class="__shiki_mdbnqw">} 失败:\`</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> assessNetworkQuality</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 评估网络质量</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">navigator.onLine) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_mdbnqw"> &#39;offline&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> startTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">remoteDB</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">}/_session\`</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">        method: </span><span class="__shiki_mdbnqw">&#39;HEAD&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        cache: </span><span class="__shiki_mdbnqw">&#39;no-store&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> latency</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (latency </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 500</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_mdbnqw"> &#39;good&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (latency </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 2000</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_mdbnqw"> &#39;fair&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_mdbnqw"> &#39;poor&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_mdbnqw"> &#39;poor&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> getLocalChangeCount</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> info</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.localDB.</span><span class="__shiki_1t8gfj">info</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> changes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.localDB.</span><span class="__shiki_1t8gfj">changes</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      since: </span><span class="__shiki_mdbnqw">&#39;now&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      limit: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> changes.pending </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  getHighPriorityTypes</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 定义高优先级文档类型</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;user&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;auth&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;settings&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;critical_data&#39;</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  wait</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ms</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(resolve, ms));</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="十、测试与调试" tabindex="-1">十、测试与调试 <a class="header-anchor" href="#十、测试与调试" aria-label="Permalink to &quot;十、测试与调试&quot;">​</a></h2><h3 id="_10-1-单元测试" tabindex="-1">10.1 单元测试 <a class="header-anchor" href="#_10-1-单元测试" aria-label="Permalink to &quot;10.1 单元测试&quot;">​</a></h3><h4 id="_10-1-1-测试环境设置" tabindex="-1">10.1.1 测试环境设置 <a class="header-anchor" href="#_10-1-1-测试环境设置" aria-label="Permalink to &quot;10.1.1 测试环境设置&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用Jest和PouchDB内存适配器进行测试</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> PouchDB </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;pouchdb&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> memoryAdapter </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;pouchdb-adapter-memory&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">PouchDB.</span><span class="__shiki_1t8gfj">plugin</span><span class="__shiki_140thh">(memoryAdapter);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">describe</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;PouchDB离线同步&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  let</span><span class="__shiki_140thh"> localDB;</span></span>
<span class="line"><span class="__shiki_1itgoe">  let</span><span class="__shiki_140thh"> remoteDB;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  beforeEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 使用内存适配器创建测试数据库</span></span>
<span class="line"><span class="__shiki_140thh">    localDB </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> PouchDB</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;test-local&#39;</span><span class="__shiki_140thh">, { adapter: </span><span class="__shiki_mdbnqw">&#39;memory&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    remoteDB </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> PouchDB</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;test-remote&#39;</span><span class="__shiki_140thh">, { adapter: </span><span class="__shiki_mdbnqw">&#39;memory&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 初始化测试数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_1t8gfj"> setupTestData</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  afterEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 清理测试数据库</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> localDB.</span><span class="__shiki_1t8gfj">destroy</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> remoteDB.</span><span class="__shiki_1t8gfj">destroy</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> setupTestData</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 在远程数据库创建测试数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> remoteDB.</span><span class="__shiki_1t8gfj">bulkDocs</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_140thh">      { _id: </span><span class="__shiki_mdbnqw">&#39;doc1&#39;</span><span class="__shiki_140thh">, type: </span><span class="__shiki_mdbnqw">&#39;test&#39;</span><span class="__shiki_140thh">, value: </span><span class="__shiki_mdbnqw">&#39;remote1&#39;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">      { _id: </span><span class="__shiki_mdbnqw">&#39;doc2&#39;</span><span class="__shiki_140thh">, type: </span><span class="__shiki_mdbnqw">&#39;test&#39;</span><span class="__shiki_140thh">, value: </span><span class="__shiki_mdbnqw">&#39;remote2&#39;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">    ]);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  test</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;应该能够从远程同步数据&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 执行同步</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> sync</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> localDB.</span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">(remoteDB, { live: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">reject</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      sync</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;complete&#39;</span><span class="__shiki_140thh">, resolve)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;error&#39;</span><span class="__shiki_140thh">, reject);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证本地数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> docs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> localDB.</span><span class="__shiki_1t8gfj">allDocs</span><span class="__shiki_140thh">({ include_docs: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(docs.rows).</span><span class="__shiki_1t8gfj">toHaveLength</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(docs.rows[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">].doc.value).</span><span class="__shiki_1t8gfj">toBe</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;remote1&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  test</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;应该检测并处理冲突&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 在两个数据库创建相同ID的文档</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> localDB.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">({ _id: </span><span class="__shiki_mdbnqw">&#39;conflict&#39;</span><span class="__shiki_140thh">, value: </span><span class="__shiki_mdbnqw">&#39;local&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> remoteDB.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">({ _id: </span><span class="__shiki_mdbnqw">&#39;conflict&#39;</span><span class="__shiki_140thh">, value: </span><span class="__shiki_mdbnqw">&#39;remote&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 同步应该检测到冲突</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> sync</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> localDB.</span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">(remoteDB, { live: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">reject</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      sync</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;complete&#39;</span><span class="__shiki_140thh">, resolve)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;error&#39;</span><span class="__shiki_140thh">, reject);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查冲突</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> doc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> localDB.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;conflict&#39;</span><span class="__shiki_140thh">, { conflicts: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(doc._conflicts).</span><span class="__shiki_1t8gfj">toBeDefined</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(doc._conflicts).</span><span class="__shiki_1t8gfj">toHaveLength</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  test</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;应该支持离线操作&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 模拟离线状态</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> originalOnline</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> navigator.onLine;</span></span>
<span class="line"><span class="__shiki_140thh">    Object.</span><span class="__shiki_1t8gfj">defineProperty</span><span class="__shiki_140thh">(navigator, </span><span class="__shiki_mdbnqw">&#39;onLine&#39;</span><span class="__shiki_140thh">, { value: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 离线状态下创建文档</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> localDB.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">({ _id: </span><span class="__shiki_mdbnqw">&#39;offline-doc&#39;</span><span class="__shiki_140thh">, value: </span><span class="__shiki_mdbnqw">&#39;created-offline&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(result.ok).</span><span class="__shiki_1t8gfj">toBe</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 恢复在线状态</span></span>
<span class="line"><span class="__shiki_140thh">    Object.</span><span class="__shiki_1t8gfj">defineProperty</span><span class="__shiki_140thh">(navigator, </span><span class="__shiki_mdbnqw">&#39;onLine&#39;</span><span class="__shiki_140thh">, { value: originalOnline });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 同步离线创建的文档</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> sync</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> localDB.</span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">(remoteDB, { live: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">reject</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      sync</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;complete&#39;</span><span class="__shiki_140thh">, resolve)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;error&#39;</span><span class="__shiki_140thh">, reject);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证文档已同步</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> remoteDoc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> remoteDB.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;offline-doc&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(remoteDoc.value).</span><span class="__shiki_1t8gfj">toBe</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;created-offline&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h3 id="_10-2-集成测试" tabindex="-1">10.2 集成测试 <a class="header-anchor" href="#_10-2-集成测试" aria-label="Permalink to &quot;10.2 集成测试&quot;">​</a></h3><h4 id="_10-2-1-端到端测试" tabindex="-1">10.2.1 端到端测试 <a class="header-anchor" href="#_10-2-1-端到端测试" aria-label="Permalink to &quot;10.2.1 端到端测试&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用Cypress进行端到端测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">describe</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;离线优先应用&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  beforeEach</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 清除IndexedDB</span></span>
<span class="line"><span class="__shiki_140thh">    indexedDB.</span><span class="__shiki_1t8gfj">deleteDatabase</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;_pouch_local_app_data&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 访问应用</span></span>
<span class="line"><span class="__shiki_140thh">    cy.</span><span class="__shiki_1t8gfj">visit</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;http://localhost:3000&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  it</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;应该在离线时创建数据并在恢复连接后同步&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建测试数据</span></span>
<span class="line"><span class="__shiki_140thh">    cy.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;#create-doc&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">click</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    cy.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;#doc-title&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">type</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;离线测试文档&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    cy.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;#save-doc&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">click</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证本地保存成功</span></span>
<span class="line"><span class="__shiki_140thh">    cy.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;.toast-success&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">should</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;be.visible&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 模拟离线状态</span></span>
<span class="line"><span class="__shiki_140thh">    cy.</span><span class="__shiki_1t8gfj">window</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">win</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      cy.</span><span class="__shiki_1t8gfj">stub</span><span class="__shiki_140thh">(win.navigator, </span><span class="__shiki_mdbnqw">&#39;onLine&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">value</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      win.</span><span class="__shiki_1t8gfj">dispatchEvent</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Event</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;offline&#39;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建更多离线数据</span></span>
<span class="line"><span class="__shiki_140thh">    cy.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;#create-doc&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">click</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    cy.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;#doc-title&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">type</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;另一个离线文档&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    cy.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;#save-doc&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">click</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证显示离线指示器</span></span>
<span class="line"><span class="__shiki_140thh">    cy.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;.offline-indicator&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">should</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;be.visible&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 模拟恢复在线</span></span>
<span class="line"><span class="__shiki_140thh">    cy.</span><span class="__shiki_1t8gfj">window</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">win</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      cy.</span><span class="__shiki_1t8gfj">stub</span><span class="__shiki_140thh">(win.navigator, </span><span class="__shiki_mdbnqw">&#39;onLine&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">value</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      win.</span><span class="__shiki_1t8gfj">dispatchEvent</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Event</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;online&#39;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 等待同步完成</span></span>
<span class="line"><span class="__shiki_140thh">    cy.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;.sync-indicator&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">should</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;not.exist&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    cy.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;.toast-sync-complete&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">should</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;be.visible&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证数据同步</span></span>
<span class="line"><span class="__shiki_140thh">    cy.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;.doc-list&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">should</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;have.length&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  it</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;应该处理同步冲突&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 在两个客户端创建相同文档</span></span>
<span class="line"><span class="__shiki_140thh">    cy.</span><span class="__shiki_1t8gfj">window</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">win</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 客户端A创建文档</span></span>
<span class="line"><span class="__shiki_140thh">      win.app.</span><span class="__shiki_1t8gfj">createDocument</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;test&#39;</span><span class="__shiki_140thh">, { title: </span><span class="__shiki_mdbnqw">&#39;客户端A的标题&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 模拟服务器上的冲突版本</span></span>
<span class="line"><span class="__shiki_140thh">      cy.</span><span class="__shiki_1t8gfj">request</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;POST&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;http://localhost:5984/testdb&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">        _id: </span><span class="__shiki_mdbnqw">&#39;conflict-doc&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        title: </span><span class="__shiki_mdbnqw">&#39;服务器上的标题&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 触发同步</span></span>
<span class="line"><span class="__shiki_140thh">    cy.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;#sync-button&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">click</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 应该显示冲突解决界面</span></span>
<span class="line"><span class="__shiki_140thh">    cy.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;.conflict-resolver&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">should</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;be.visible&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 解决冲突</span></span>
<span class="line"><span class="__shiki_140thh">    cy.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;.resolve-conflict&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">click</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    cy.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;.conflict-resolved&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">should</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;be.visible&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h3 id="_10-3-调试工具" tabindex="-1">10.3 调试工具 <a class="header-anchor" href="#_10-3-调试工具" aria-label="Permalink to &quot;10.3 调试工具&quot;">​</a></h3><h4 id="_10-3-1-pouchdb调试插件" tabindex="-1">10.3.1 PouchDB调试插件 <a class="header-anchor" href="#_10-3-1-pouchdb调试插件" aria-label="Permalink to &quot;10.3.1 PouchDB调试插件&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// PouchDB调试工具</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> PouchDBDebug </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;pouchdb-debug&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">PouchDB.</span><span class="__shiki_1t8gfj">plugin</span><span class="__shiki_140thh">(PouchDBDebug);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 启用调试</span></span>
<span class="line"><span class="__shiki_140thh">PouchDB.debug.</span><span class="__shiki_1t8gfj">enable</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;*&#39;</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 启用所有调试</span></span>
<span class="line"><span class="__shiki_21nrsd">// 或指定模块</span></span>
<span class="line"><span class="__shiki_140thh">PouchDB.debug.</span><span class="__shiki_1t8gfj">enable</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;pouchdb:api,pouchdb:http&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 自定义调试器</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> PouchDBInspector</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">db</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.db </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.logs </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">setupLogging</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  setupLogging</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 拦截所有数据库操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> originalPut</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.put;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> originalGet</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.get;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> originalRemove</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.remove;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> originalFind</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.find;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.db.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">...</span><span class="__shiki_1jdh33">args</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> start</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> performance.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> originalPut.</span><span class="__shiki_1t8gfj">apply</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.db, args);</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;put&#39;</span><span class="__shiki_140thh">, args[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]._id, performance.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> start, </span><span class="__shiki_mdbnqw">&#39;success&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;put&#39;</span><span class="__shiki_140thh">, args[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]._id, performance.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> start, </span><span class="__shiki_mdbnqw">&#39;error&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.db.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">...</span><span class="__shiki_1jdh33">args</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> start</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> performance.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> originalGet.</span><span class="__shiki_1t8gfj">apply</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.db, args);</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;get&#39;</span><span class="__shiki_140thh">, args[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">], performance.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> start, </span><span class="__shiki_mdbnqw">&#39;success&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;get&#39;</span><span class="__shiki_140thh">, args[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">], performance.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> start, </span><span class="__shiki_mdbnqw">&#39;error&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 类似地包装其他方法...</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  log</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">operation</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">docId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">duration</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">status</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">error</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> logEntry</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">      operation,</span></span>
<span class="line"><span class="__shiki_140thh">      docId,</span></span>
<span class="line"><span class="__shiki_140thh">      duration,</span></span>
<span class="line"><span class="__shiki_140thh">      status,</span></span>
<span class="line"><span class="__shiki_140thh">      error: error </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> error.message </span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> null</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.logs.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(logEntry);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 限制日志大小</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.logs.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.logs.</span><span class="__shiki_1t8gfj">shift</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 发送到开发者工具</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sendToDevTools</span><span class="__shiki_140thh">(logEntry);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  sendToDevTools</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">logEntry</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 使用postMessage与浏览器扩展通信</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (window.chrome </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> chrome.runtime) {</span></span>
<span class="line"><span class="__shiki_140thh">      chrome.runtime.</span><span class="__shiki_1t8gfj">sendMessage</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        type: </span><span class="__shiki_mdbnqw">&#39;POUCHDB_LOG&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        data: logEntry</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  getStats</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> stats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      totalOperations: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.logs.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      successRate: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      avgDuration: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      operationCount: {}</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> totalDuration </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> successCount </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> log</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.logs) {</span></span>
<span class="line"><span class="__shiki_140thh">      totalDuration </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> log.duration;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (log.status </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;success&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        successCount</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">stats.operationCount[log.operation]) {</span></span>
<span class="line"><span class="__shiki_140thh">        stats.operationCount[log.operation] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      stats.operationCount[log.operation]</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.logs.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">      stats.successRate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> successCount </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.logs.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      stats.avgDuration </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> totalDuration </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.logs.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> stats;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  exportLogs</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">format</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;json&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (format </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;json&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.logs, </span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (format </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;csv&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">convertToCSV</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  convertToCSV</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.logs.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_mdbnqw"> &#39;&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> headers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Object.</span><span class="__shiki_1t8gfj">keys</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.logs[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]).</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;,&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> rows</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.logs.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">log</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">      Object.</span><span class="__shiki_1t8gfj">values</span><span class="__shiki_140thh">(log).</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">value</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        typeof</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;string&#39;</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_mdbnqw"> \`&quot;\${</span><span class="__shiki_140thh">value</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">replace</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_21q97f">&quot;</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_1itgoe">g</span><span class="__shiki_mdbnqw">, </span><span class="__shiki_mdbnqw">&#39;&quot;&quot;&#39;</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}&quot;\`</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_140thh"> value</span></span>
<span class="line"><span class="__shiki_140thh">      ).</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;,&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> [headers, </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">rows].</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="十一、实际应用案例" tabindex="-1">十一、实际应用案例 <a class="header-anchor" href="#十一、实际应用案例" aria-label="Permalink to &quot;十一、实际应用案例&quot;">​</a></h2><h3 id="_11-1-离线笔记应用" tabindex="-1">11.1 离线笔记应用 <a class="header-anchor" href="#_11-1-离线笔记应用" aria-label="Permalink to &quot;11.1 离线笔记应用&quot;">​</a></h3><h4 id="_11-1-1-应用架构" tabindex="-1">11.1.1 应用架构 <a class="header-anchor" href="#_11-1-1-应用架构" aria-label="Permalink to &quot;11.1.1 应用架构&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> OfflineNotesApp</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.db </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> PouchDB</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;notes_app&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.remoteDB </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.sync </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">setupDatabase</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> setupDatabase</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建设计文档</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> designDoc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      _id: </span><span class="__shiki_mdbnqw">&#39;_design/notes&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      views: {</span></span>
<span class="line"><span class="__shiki_140thh">        by_folder: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">          map</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">doc</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (doc.type </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;note&#39;</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> doc.folderId) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">              emit</span><span class="__shiki_140thh">([doc.folderId, doc.updatedAt], {</span></span>
<span class="line"><span class="__shiki_140thh">                _id: doc._id,</span></span>
<span class="line"><span class="__shiki_140thh">                title: doc.title,</span></span>
<span class="line"><span class="__shiki_140thh">                preview: doc.content.</span><span class="__shiki_1t8gfj">substring</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">                updatedAt: doc.updatedAt</span></span>
<span class="line"><span class="__shiki_140thh">              });</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        by_tag: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">          map</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">doc</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (doc.type </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;note&#39;</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> doc.tags) {</span></span>
<span class="line"><span class="__shiki_140thh">              doc.tags.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">tag</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">                emit</span><span class="__shiki_140thh">([tag, doc.updatedAt], {</span></span>
<span class="line"><span class="__shiki_140thh">                  _id: doc._id,</span></span>
<span class="line"><span class="__shiki_140thh">                  title: doc.title,</span></span>
<span class="line"><span class="__shiki_140thh">                  updatedAt: doc.updatedAt</span></span>
<span class="line"><span class="__shiki_140thh">                });</span></span>
<span class="line"><span class="__shiki_140thh">              });</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        recent: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">          map</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">doc</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (doc.type </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;note&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">              emit</span><span class="__shiki_140thh">(doc.updatedAt, {</span></span>
<span class="line"><span class="__shiki_140thh">                _id: doc._id,</span></span>
<span class="line"><span class="__shiki_140thh">                title: doc.title,</span></span>
<span class="line"><span class="__shiki_140thh">                folderId: doc.folderId,</span></span>
<span class="line"><span class="__shiki_140thh">                updatedAt: doc.updatedAt</span></span>
<span class="line"><span class="__shiki_140thh">              });</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(designDoc);</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 设计文档可能已存在</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (error.status </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_dzsirb"> 409</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> createNote</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">noteData</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> note</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      _id: </span><span class="__shiki_mdbnqw">\`note_\${</span><span class="__shiki_140thh">Date</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_mdbnqw">()</span><span class="__shiki_mdbnqw">}_\${</span><span class="__shiki_140thh">Math</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">random</span><span class="__shiki_mdbnqw">().</span><span class="__shiki_1t8gfj">toString</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">36</span><span class="__shiki_mdbnqw">).</span><span class="__shiki_1t8gfj">substr</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_mdbnqw">, </span><span class="__shiki_dzsirb">9</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      type: </span><span class="__shiki_mdbnqw">&#39;note&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      title: noteData.title </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;无标题&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      content: noteData.content </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      folderId: noteData.folderId </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;default&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      tags: noteData.tags </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> [],</span></span>
<span class="line"><span class="__shiki_140thh">      attachments: noteData.attachments </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> [],</span></span>
<span class="line"><span class="__shiki_140thh">      createdAt: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">      updatedAt: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">      version: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(note);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> { </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">note, _rev: result.rev };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> updateNote</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">updates</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> note</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(id);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> updatedNote</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        ...</span><span class="__shiki_140thh">note,</span></span>
<span class="line"><span class="__shiki_1itgoe">        ...</span><span class="__shiki_140thh">updates,</span></span>
<span class="line"><span class="__shiki_140thh">        updatedAt: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        version: (note.version </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">      };</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(updatedNote);</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> { </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">updatedNote, _rev: result.rev };</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (error.status </span><span class="__shiki_1itgoe">===</span><span class="__shiki_dzsirb"> 404</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;笔记不存在&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> searchNotes</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">query</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 全文搜索实现</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (window.PouchDB.plugins.find) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        selector: {</span></span>
<span class="line"><span class="__shiki_140thh">          type: </span><span class="__shiki_mdbnqw">&#39;note&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          $or: [</span></span>
<span class="line"><span class="__shiki_140thh">            { title: { $regex: </span><span class="__shiki_mdbnqw">\`(?i)\${</span><span class="__shiki_140thh">query</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">            { content: { $regex: </span><span class="__shiki_mdbnqw">\`(?i)\${</span><span class="__shiki_140thh">query</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">            { tags: { $in: [query] } }</span></span>
<span class="line"><span class="__shiki_140thh">          ]</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        sort: [{ updatedAt: </span><span class="__shiki_mdbnqw">&#39;desc&#39;</span><span class="__shiki_140thh"> }],</span></span>
<span class="line"><span class="__shiki_140thh">        limit: </span><span class="__shiki_dzsirb">50</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 回退到视图查询</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> allNotes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.</span><span class="__shiki_1t8gfj">allDocs</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        include_docs: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        startkey: </span><span class="__shiki_mdbnqw">&#39;note_&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        endkey: </span><span class="__shiki_mdbnqw">&#39;note_</span><span class="__shiki_dzsirb">\\ufff0</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        docs: allNotes.rows</span></span>
<span class="line"><span class="__shiki_140thh">          .</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">row</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> row.doc)</span></span>
<span class="line"><span class="__shiki_140thh">          .</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">note</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            note.type </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;note&#39;</span><span class="__shiki_1itgoe"> &amp;&amp;</span></span>
<span class="line"><span class="__shiki_140thh">            (note.title.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(query) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">             note.content.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(query) </span><span class="__shiki_1itgoe">||</span></span>
<span class="line"><span class="__shiki_140thh">             (note.tags </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> note.tags.</span><span class="__shiki_1t8gfj">some</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">tag</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> tag.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(query))))</span></span>
<span class="line"><span class="__shiki_140thh">          )</span></span>
<span class="line"><span class="__shiki_140thh">          .</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">a</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">b</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(b.updatedAt) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(a.updatedAt))</span></span>
<span class="line"><span class="__shiki_140thh">      };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> syncWithServer</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">serverUrl</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">credentials</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.remoteDB </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> PouchDB</span><span class="__shiki_140thh">(serverUrl, {</span></span>
<span class="line"><span class="__shiki_140thh">      auth: credentials,</span></span>
<span class="line"><span class="__shiki_140thh">      skip_setup: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.sync </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.</span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.remoteDB, {</span></span>
<span class="line"><span class="__shiki_140thh">      live: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      retry: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      heartbeat: </span><span class="__shiki_dzsirb">10000</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">reject</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.sync</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;change&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.handleSyncChange.</span><span class="__shiki_1t8gfj">bind</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;complete&#39;</span><span class="__shiki_140thh">, resolve)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;error&#39;</span><span class="__shiki_140thh">, reject);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  handleSyncChange</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">info</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 更新UI显示同步状态</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> event</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> CustomEvent</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;sync-change&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">      detail: {</span></span>
<span class="line"><span class="__shiki_140thh">        direction: info.direction,</span></span>
<span class="line"><span class="__shiki_140thh">        change: info.change,</span></span>
<span class="line"><span class="__shiki_140thh">        pending: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.sync.pending</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    window.</span><span class="__shiki_1t8gfj">dispatchEvent</span><span class="__shiki_140thh">(event);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> exportNotes</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">format</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;json&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> allNotes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.</span><span class="__shiki_1t8gfj">allDocs</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      include_docs: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      startkey: </span><span class="__shiki_mdbnqw">&#39;note_&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      endkey: </span><span class="__shiki_mdbnqw">&#39;note_</span><span class="__shiki_dzsirb">\\ufff0</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> notes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> allNotes.rows.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">row</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> note</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> { </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">row.doc };</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 移除内部字段</span></span>
<span class="line"><span class="__shiki_1itgoe">      delete</span><span class="__shiki_140thh"> note._rev;</span></span>
<span class="line"><span class="__shiki_1itgoe">      delete</span><span class="__shiki_140thh"> note._revisions;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> note;</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (format </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;json&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">(notes, </span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (format </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;markdown&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> notes.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">note</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        \`# \${</span><span class="__shiki_140thh">note</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">title</span><span class="__shiki_mdbnqw">}</span><span class="__shiki_dzsirb">\\n\\n</span><span class="__shiki_mdbnqw">\${</span><span class="__shiki_140thh">note</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">content</span><span class="__shiki_mdbnqw">}</span><span class="__shiki_dzsirb">\\n\\n</span><span class="__shiki_mdbnqw">---</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_140thh">      ).</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="十二、最佳实践总结" tabindex="-1">十二、最佳实践总结 <a class="header-anchor" href="#十二、最佳实践总结" aria-label="Permalink to &quot;十二、最佳实践总结&quot;">​</a></h2><h3 id="_12-1-架构最佳实践" tabindex="-1">12.1 架构最佳实践 <a class="header-anchor" href="#_12-1-架构最佳实践" aria-label="Permalink to &quot;12.1 架构最佳实践&quot;">​</a></h3><h4 id="_12-1-1-数据模型设计原则" tabindex="-1">12.1.1 数据模型设计原则 <a class="header-anchor" href="#_12-1-1-数据模型设计原则" aria-label="Permalink to &quot;12.1.1 数据模型设计原则&quot;">​</a></h4><ol><li><strong>类型字段</strong>：每个文档应有type字段</li><li><strong>时间戳</strong>：包含createdAt和updatedAt字段</li><li><strong>软删除</strong>：使用_deleted标记而非物理删除</li><li><strong>文档ID策略</strong>：使用有意义的ID模式（如<code>type_timestamp_random</code>）</li></ol><h4 id="_12-1-2-同步策略选择" tabindex="-1">12.1.2 同步策略选择 <a class="header-anchor" href="#_12-1-2-同步策略选择" aria-label="Permalink to &quot;12.1.2 同步策略选择&quot;">​</a></h4><table tabindex="0"><thead><tr><th>场景</th><th>推荐策略</th><th>原因</th></tr></thead><tbody><tr><td>实时聊天</td><td>连续同步 + 心跳</td><td>需要即时性</td></tr><tr><td>数据收集</td><td>批量同步 + 压缩</td><td>减少网络请求</td></tr><tr><td>只读数据</td><td>预加载 + 增量更新</td><td>优化性能</td></tr><tr><td>移动应用</td><td>智能同步 + 离线队列</td><td>处理网络波动</td></tr></tbody></table><h3 id="_12-2-性能优化清单" tabindex="-1">12.2 性能优化清单 <a class="header-anchor" href="#_12-2-性能优化清单" aria-label="Permalink to &quot;12.2 性能优化清单&quot;">​</a></h3><ol><li><p><strong>数据库配置</strong></p><ul><li>启用auto_compaction</li><li>设置合理的revs_limit</li><li>使用合适的存储适配器</li></ul></li><li><p><strong>同步优化</strong></p><ul><li>调整batch_size基于网络状况</li><li>实现智能重试策略</li><li>使用检查点减少重复传输</li></ul></li><li><p><strong>内存管理</strong></p><ul><li>限制查询结果大小</li><li>定期清理临时数据</li><li>监控存储使用情况</li></ul></li></ol><h3 id="_12-3-错误处理策略" tabindex="-1">12.3 错误处理策略 <a class="header-anchor" href="#_12-3-错误处理策略" aria-label="Permalink to &quot;12.3 错误处理策略&quot;">​</a></h3><ol><li><strong>网络错误</strong>：实现指数退避重试</li><li><strong>冲突错误</strong>：提供用户友好的解决界面</li><li><strong>存储错误</strong>：监控配额并提示用户</li><li><strong>同步错误</strong>：记录详细日志便于调试</li></ol><h3 id="_12-4-安全注意事项" tabindex="-1">12.4 安全注意事项 <a class="header-anchor" href="#_12-4-安全注意事项" aria-label="Permalink to &quot;12.4 安全注意事项&quot;">​</a></h3><ol><li><strong>数据加密</strong>：敏感字段客户端加密</li><li><strong>认证管理</strong>：妥善处理会话令牌</li><li><strong>权限控制</strong>：实现基于角色的访问控制</li><li><strong>输入验证</strong>：防止注入攻击</li></ol><h3 id="_12-5-监控与维护" tabindex="-1">12.5 监控与维护 <a class="header-anchor" href="#_12-5-监控与维护" aria-label="Permalink to &quot;12.5 监控与维护&quot;">​</a></h3><ol><li><strong>性能监控</strong>：跟踪关键指标（延迟、成功率等）</li><li><strong>错误追踪</strong>：记录并分析错误模式</li><li><strong>数据质量</strong>：定期验证数据一致性</li><li><strong>容量规划</strong>：监控存储增长趋势</li></ol><h2 id="十三、未来发展与趋势" tabindex="-1">十三、未来发展与趋势 <a class="header-anchor" href="#十三、未来发展与趋势" aria-label="Permalink to &quot;十三、未来发展与趋势&quot;">​</a></h2><h3 id="_13-1-pouchdb生态系统" tabindex="-1">13.1 PouchDB生态系统 <a class="header-anchor" href="#_13-1-pouchdb生态系统" aria-label="Permalink to &quot;13.1 PouchDB生态系统&quot;">​</a></h3><h4 id="_13-1-1-相关工具和库" tabindex="-1">13.1.1 相关工具和库 <a class="header-anchor" href="#_13-1-1-相关工具和库" aria-label="Permalink to &quot;13.1.1 相关工具和库&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 流行的PouchDB插件和工具</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> pouchdbEcosystem</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 查询扩展</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;pouchdb-find&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Mango查询支持&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;pouchdb-quick-search&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;全文搜索&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 复制增强</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;pouchdb-replication-stream&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;流式复制&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;pouchdb-load&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;快速数据加载&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 安全与加密</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;pouchdb-authentication&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;认证支持&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;pouchdb-secure&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;端到端加密&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 工具与实用程序</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;pouchdb-debug&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;调试工具&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;pouchdb-adapter-helpers&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;适配器工具&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 框架集成</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;angular-pouchdb&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Angular集成&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;ember-pouch&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Ember.js集成&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;vue-pouchdb&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Vue.js集成&#39;</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_13-2-新兴技术整合" tabindex="-1">13.2 新兴技术整合 <a class="header-anchor" href="#_13-2-新兴技术整合" aria-label="Permalink to &quot;13.2 新兴技术整合&quot;">​</a></h3><h4 id="_13-2-1-service-worker集成" tabindex="-1">13.2.1 Service Worker集成 <a class="header-anchor" href="#_13-2-1-service-worker集成" aria-label="Permalink to &quot;13.2.1 Service Worker集成&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用Service Worker增强离线能力</span></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;install&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">event</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  event.</span><span class="__shiki_1t8gfj">waitUntil</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    caches.</span><span class="__shiki_1t8gfj">open</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;pouchdb-data&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">cache</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> cache.</span><span class="__shiki_1t8gfj">addAll</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;/pouchdb.min.js&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;/app-data/design-docs.json&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      ]);</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;fetch&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">event</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 拦截PouchDB请求</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (event.request.url.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/_local/&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_140thh">    event.</span><span class="__shiki_1t8gfj">respondWith</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      caches.</span><span class="__shiki_1t8gfj">match</span><span class="__shiki_140thh">(event.request).</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">response</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> response </span><span class="__shiki_1itgoe">||</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(event.request);</span></span>
<span class="line"><span class="__shiki_140thh">      })</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;sync&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">event</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (event.tag </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;pouchdb-sync&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    event.</span><span class="__shiki_1t8gfj">waitUntil</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">syncPendingChanges</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> syncPendingChanges</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 获取所有数据库的待同步更改</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> dbs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> indexedDB.</span><span class="__shiki_1t8gfj">databases</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> dbInfo</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> dbs) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (dbInfo.name.</span><span class="__shiki_1t8gfj">startsWith</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;_pouch_&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_1t8gfj"> syncDatabase</span><span class="__shiki_140thh">(dbInfo.name);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_13-2-2-webassembly加速" tabindex="-1">13.2.2 WebAssembly加速 <a class="header-anchor" href="#_13-2-2-webassembly加速" aria-label="Permalink to &quot;13.2.2 WebAssembly加速&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用WebAssembly加速加密和压缩</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> WASMAcceleratedPouchDB</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">dbName</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.db </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> PouchDB</span><span class="__shiki_140thh">(dbName);</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.wasmModule </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">initWASM</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> initWASM</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 加载WASM模块</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.wasmModule </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> WebAssembly.</span><span class="__shiki_1t8gfj">instantiateStreaming</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1t8gfj">      fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/pouchdb-accelerator.wasm&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      {</span></span>
<span class="line"><span class="__shiki_140thh">        env: {</span></span>
<span class="line"><span class="__shiki_140thh">          memory: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_140thh"> WebAssembly.</span><span class="__shiki_1t8gfj">Memory</span><span class="__shiki_140thh">({ initial: </span><span class="__shiki_dzsirb">256</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> encryptAndStore</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">doc</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.wasmModule) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 使用WASM加速加密</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> encrypted</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.wasmModule.instance.exports.</span><span class="__shiki_1t8gfj">encrypt</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">        JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">(doc)</span></span>
<span class="line"><span class="__shiki_140thh">      );</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> encryptedDoc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        ...</span><span class="__shiki_140thh">doc,</span></span>
<span class="line"><span class="__shiki_140thh">        _encrypted: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        data: encrypted</span></span>
<span class="line"><span class="__shiki_140thh">      };</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(encryptedDoc);</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 回退到JavaScript实现</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.db.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(doc);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_13-3-边缘计算集成" tabindex="-1">13.3 边缘计算集成 <a class="header-anchor" href="#_13-3-边缘计算集成" aria-label="Permalink to &quot;13.3 边缘计算集成&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// PouchDB在边缘计算环境中的应用</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> EdgePouchDB</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.edgeDB </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.cloudDB </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.syncStrategy </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;edge-first&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> initialize</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">edgeEndpoint</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">cloudEndpoint</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 连接到边缘节点</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.edgeDB </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> PouchDB</span><span class="__shiki_140thh">(edgeEndpoint, {</span></span>
<span class="line"><span class="__shiki_140thh">      adapter: </span><span class="__shiki_mdbnqw">&#39;http&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      skip_setup: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 连接到云中心</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.cloudDB </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> PouchDB</span><span class="__shiki_140thh">(cloudEndpoint, {</span></span>
<span class="line"><span class="__shiki_140thh">      adapter: </span><span class="__shiki_mdbnqw">&#39;http&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      skip_setup: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 设置多层同步</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">setupMultiLayerSync</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> setupMultiLayerSync</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 边缘优先策略</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.syncStrategy </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;edge-first&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 1. 同步到边缘节点</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.localToEdgeSync </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.localDB.</span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.edgeDB, {</span></span>
<span class="line"><span class="__shiki_140thh">        live: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        retry: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 2. 边缘到云同步</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.edgeToCloudSync </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.edgeDB.</span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.cloudDB, {</span></span>
<span class="line"><span class="__shiki_140thh">        live: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        retry: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 仅在边缘节点空闲时同步</span></span>
<span class="line"><span class="__shiki_140thh">        throttle: </span><span class="__shiki_dzsirb">1000</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> queryWithFallback</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">query</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 尝试边缘节点</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.edgeDB.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(query);</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> { source: </span><span class="__shiki_mdbnqw">&#39;edge&#39;</span><span class="__shiki_140thh">, data: result };</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (edgeError) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;边缘查询失败，回退到云:&#39;</span><span class="__shiki_140thh">, edgeError);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 回退到云中心</span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.cloudDB.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(query);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 将结果缓存到边缘</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cacheToEdge</span><span class="__shiki_140thh">(result.docs);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> { source: </span><span class="__shiki_mdbnqw">&#39;cloud&#39;</span><span class="__shiki_140thh">, data: result };</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (cloudError) {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;云查询也失败:&#39;</span><span class="__shiki_140thh">, cloudError);</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;所有数据源均不可用&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> cacheToEdge</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">docs</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 将数据缓存到边缘节点</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> cacheDocs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> docs.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">doc</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> ({</span></span>
<span class="line"><span class="__shiki_1itgoe">      ...</span><span class="__shiki_140thh">doc,</span></span>
<span class="line"><span class="__shiki_140thh">      _cached: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      _cached_at: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }));</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.edgeDB.</span><span class="__shiki_1t8gfj">bulkDocs</span><span class="__shiki_140thh">(cacheDocs);</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;边缘缓存失败:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="十四、总结" tabindex="-1">十四、总结 <a class="header-anchor" href="#十四、总结" aria-label="Permalink to &quot;十四、总结&quot;">​</a></h2><h3 id="_14-1-pouchdb核心价值" tabindex="-1">14.1 PouchDB核心价值 <a class="header-anchor" href="#_14-1-pouchdb核心价值" aria-label="Permalink to &quot;14.1 PouchDB核心价值&quot;">​</a></h3><ol><li><strong>离线优先架构</strong>：确保应用在无网络时完全可用</li><li><strong>无缝同步</strong>：自动处理网络连接和断开</li><li><strong>跨平台一致性</strong>：相同API在浏览器、移动设备和服务器上</li><li><strong>CouchDB兼容性</strong>：轻松与现有CouchDB基础设施集成</li></ol><h3 id="_14-2-适用场景评估" tabindex="-1">14.2 适用场景评估 <a class="header-anchor" href="#_14-2-适用场景评估" aria-label="Permalink to &quot;14.2 适用场景评估&quot;">​</a></h3><h4 id="_14-2-1-理想使用场景" tabindex="-1">14.2.1 理想使用场景 <a class="header-anchor" href="#_14-2-1-理想使用场景" aria-label="Permalink to &quot;14.2.1 理想使用场景&quot;">​</a></h4><ul><li><strong>移动数据收集</strong>：野外调查、巡检、库存管理</li><li><strong>协作应用</strong>：团队任务管理、文档协作</li><li><strong>物联网</strong>：设备数据收集和同步</li><li><strong>离线阅读器</strong>：新闻、文章、电子书</li></ul><h4 id="_14-2-2-可能不适合的场景" tabindex="-1">14.2.2 可能不适合的场景 <a class="header-anchor" href="#_14-2-2-可能不适合的场景" aria-label="Permalink to &quot;14.2.2 可能不适合的场景&quot;">​</a></h4><ul><li><strong>高频交易系统</strong>：需要强一致性保证</li><li><strong>海量数据分析</strong>：需要复杂聚合查询</li><li><strong>简单静态网站</strong>：不需要离线功能</li><li><strong>严格安全要求的系统</strong>：需要更高级的安全控制</li></ul><h3 id="_14-3-学习路径建议" tabindex="-1">14.3 学习路径建议 <a class="header-anchor" href="#_14-3-学习路径建议" aria-label="Permalink to &quot;14.3 学习路径建议&quot;">​</a></h3><ol><li><p><strong>入门阶段</strong></p><ul><li>掌握基本CRUD操作</li><li>理解修订系统和冲突</li><li>实现简单同步</li></ul></li><li><p><strong>进阶阶段</strong></p><ul><li>设计高效数据模型</li><li>实现智能同步策略</li><li>处理复杂冲突场景</li></ul></li><li><p><strong>专家阶段</strong></p><ul><li>性能优化和调优</li><li>安全加固和加密</li><li>大规模部署架构</li></ul></li></ol><h3 id="_14-4-社区资源" tabindex="-1">14.4 社区资源 <a class="header-anchor" href="#_14-4-社区资源" aria-label="Permalink to &quot;14.4 社区资源&quot;">​</a></h3><h4 id="_14-4-1-官方资源" tabindex="-1">14.4.1 官方资源 <a class="header-anchor" href="#_14-4-1-官方资源" aria-label="Permalink to &quot;14.4.1 官方资源&quot;">​</a></h4><ul><li><strong>文档</strong>: <a href="https://pouchdb.com/guides/" target="_blank" rel="noreferrer">https://pouchdb.com/guides/</a></li><li><strong>GitHub</strong>: <a href="https://github.com/pouchdb/pouchdb" target="_blank" rel="noreferrer">https://github.com/pouchdb/pouchdb</a></li><li><strong>Stack Overflow</strong>: <code>pouchdb</code>标签</li></ul><h4 id="_14-4-2-学习资源" tabindex="-1">14.4.2 学习资源 <a class="header-anchor" href="#_14-4-2-学习资源" aria-label="Permalink to &quot;14.4.2 学习资源&quot;">​</a></h4><ul><li><strong>官方示例</strong>: PouchDB GitHub仓库中的examples</li><li><strong>在线课程</strong>: Egghead.io, Udemy上的相关课程</li><li><strong>博客</strong>: PouchDB官方博客和社区博客</li></ul><h4 id="_14-4-3-工具和库" tabindex="-1">14.4.3 工具和库 <a class="header-anchor" href="#_14-4-3-工具和库" aria-label="Permalink to &quot;14.4.3 工具和库&quot;">​</a></h4><ul><li><strong>调试工具</strong>: PouchDB Inspector浏览器扩展</li><li><strong>测试工具</strong>: PouchDB测试工具包</li><li><strong>监控工具</strong>: 各种性能监控插件</li></ul><p>PouchDB作为CouchDB在客户端的完美补充，为构建离线优先的现代Web应用提供了强大的基础。通过深入理解其同步机制、冲突处理策略和性能优化技巧，开发者可以构建出既能在离线状态下正常工作，又能无缝同步到云端的高质量应用。</p><p>随着Web技术的不断发展，PouchDB也在持续演进，整合Service Worker、WebAssembly等新技术，为开发者提供更强大的离线同步能力。无论您是构建简单的笔记应用，还是复杂的企业级系统，PouchDB都是一个值得考虑的可靠选择。</p>`,171)])])}const d=a(p,[["render",h]]);export{r as __pageData,d as default};
