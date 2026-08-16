import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"Service Workers 完全指南","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/browser/api/service-workers.md","filePath":"frontend/browser/api/service-workers.md"}'),p={name:"frontend/browser/api/service-workers.md"};function h(l,s,c,t,e,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="service-workers-完全指南" tabindex="-1">Service Workers 完全指南 <a class="header-anchor" href="#service-workers-完全指南" aria-label="Permalink to &quot;Service Workers 完全指南&quot;">​</a></h1><h2 id="一、service-worker-基础概念" tabindex="-1">一、Service Worker 基础概念 <a class="header-anchor" href="#一、service-worker-基础概念" aria-label="Permalink to &quot;一、Service Worker 基础概念&quot;">​</a></h2><h4 id="_1-什么是-service-worker" tabindex="-1">1. 什么是 Service Worker？ <a class="header-anchor" href="#_1-什么是-service-worker" aria-label="Permalink to &quot;1. 什么是 Service Worker？&quot;">​</a></h4><ul><li>浏览器后台脚本：独立于网页运行的 JavaScript 文件</li><li>网络代理：拦截和处理网络请求（Fetch API）</li><li>离线体验核心：支持构建离线优先的 Web 应用</li><li>事件驱动：响应推送通知、后台同步等事件</li><li>独立生命周期：与页面分离，页面关闭后仍可运行</li></ul><h4 id="_2-核心能力" tabindex="-1">2. 核心能力 <a class="header-anchor" href="#_2-核心能力" aria-label="Permalink to &quot;2. 核心能力&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">A[Service Worker] --&gt; B(离线缓存)</span></span>
<span class="line"><span class="__shiki_140thh">A --&gt; C(后台同步)</span></span>
<span class="line"><span class="__shiki_140thh">A --&gt; D(推送通知)</span></span>
<span class="line"><span class="__shiki_140thh">A --&gt; E(拦截网络请求)</span></span>
<span class="line"><span class="__shiki_140thh">A --&gt; F(资源预加载)</span></span></code></pre></div><h4 id="_3-使用限制" tabindex="-1">3. 使用限制 <a class="header-anchor" href="#_3-使用限制" aria-label="Permalink to &quot;3. 使用限制&quot;">​</a></h4><table tabindex="0"><thead><tr><th><strong>限制类型</strong></th><th><strong>说明</strong></th><th><strong>解决方案</strong></th></tr></thead><tbody><tr><td>HTTPS 要求</td><td>生产环境必须使用 HTTPS</td><td>本地开发可用 localhost</td></tr><tr><td>作用域限制</td><td>只能控制其所在目录及子目录</td><td>合理规划 SW 文件位置</td></tr><tr><td>异步特性</td><td>无法使用 localStorage</td><td>改用 IndexedDB 或 Cache API</td></tr><tr><td>生命周期控制</td><td>需要手动更新和激活</td><td>实现更新策略</td></tr><tr><td>浏览器兼容性</td><td>不支持 IE，移动端需 Android 5+ 和 iOS 11.3+</td><td>提供降级方案</td></tr></tbody></table><h2 id="二、生命周期详解" tabindex="-1">二、生命周期详解 <a class="header-anchor" href="#二、生命周期详解" aria-label="Permalink to &quot;二、生命周期详解&quot;">​</a></h2><h4 id="_1-生命周期阶段" tabindex="-1">1. 生命周期阶段 <a class="header-anchor" href="#_1-生命周期阶段" aria-label="Permalink to &quot;1. 生命周期阶段&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">sequenceDiagram</span></span>
<span class="line"><span class="__shiki_140thh">participant C as Client</span></span>
<span class="line"><span class="__shiki_140thh">participant S as ServiceWorker</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">C-&gt;&gt;S: 注册 (register())</span></span>
<span class="line"><span class="__shiki_140thh">Note right of S: 下载 SW 文件</span></span>
<span class="line"><span class="__shiki_140thh">S-&gt;&gt;S: 安装 (install event)</span></span>
<span class="line"><span class="__shiki_140thh">S-&gt;&gt;S: 等待 (waiting)</span></span>
<span class="line"><span class="__shiki_140thh">S-&gt;&gt;S: 激活 (activate event)</span></span>
<span class="line"><span class="__shiki_140thh">S-&gt;&gt;C: 控制页面 (controllerchange)</span></span></code></pre></div><h4 id="_2-关键事件处理" tabindex="-1">2. 关键事件处理 <a class="header-anchor" href="#_2-关键事件处理" aria-label="Permalink to &quot;2. 关键事件处理&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 安装阶段 - 缓存核心资源</span></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;install&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  event.</span><span class="__shiki_1t8gfj">waitUntil</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    caches.</span><span class="__shiki_1t8gfj">open</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;v1-core&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">cache</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> cache.</span><span class="__shiki_1t8gfj">addAll</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;/&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;/styles/main.css&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;/scripts/app.js&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;/images/logo.png&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      ]);</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 激活阶段 - 清理旧缓存</span></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;activate&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  event.</span><span class="__shiki_1t8gfj">waitUntil</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    caches.</span><span class="__shiki_1t8gfj">keys</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">cacheNames</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">all</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        cacheNames.</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> name </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_mdbnqw"> &#39;v1-core&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">          .</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> caches.</span><span class="__shiki_1t8gfj">delete</span><span class="__shiki_140thh">(name))</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 接管控制</span></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;controllerchange&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Service Worker now controlling this page&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h2 id="三、注册与安装" tabindex="-1">三、注册与安装 <a class="header-anchor" href="#三、注册与安装" aria-label="Permalink to &quot;三、注册与安装&quot;">​</a></h2><h4 id="_1-注册-service-worker" tabindex="-1">1. 注册 Service Worker <a class="header-anchor" href="#_1-注册-service-worker" aria-label="Permalink to &quot;1. 注册 Service Worker&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 检查浏览器支持</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;serviceWorker&#39;</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> navigator) {</span></span>
<span class="line"><span class="__shiki_140thh">  window.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;load&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> registration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> navigator.serviceWorker.</span><span class="__shiki_1t8gfj">register</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/sw.js&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">        scope: </span><span class="__shiki_mdbnqw">&#39;/app/&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 控制范围</span></span>
<span class="line"><span class="__shiki_140thh">        type: </span><span class="__shiki_mdbnqw">&#39;module&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 支持 ES 模块</span></span>
<span class="line"><span class="__shiki_140thh">        updateViaCache: </span><span class="__shiki_mdbnqw">&#39;none&#39;</span><span class="__shiki_21nrsd"> // 更新策略</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;SW 注册成功:&#39;</span><span class="__shiki_140thh">, registration);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 监听更新</span></span>
<span class="line"><span class="__shiki_140thh">      registration.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;updatefound&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> newWorker</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> registration.installing;</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;发现新版本:&#39;</span><span class="__shiki_140thh">, newWorker.state);</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;SW 注册失败:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-安装策略" tabindex="-1">2. 安装策略 <a class="header-anchor" href="#_2-安装策略" aria-label="Permalink to &quot;2. 安装策略&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 自定义安装策略</span></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;install&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 跳过等待阶段</span></span>
<span class="line"><span class="__shiki_140thh">  self.</span><span class="__shiki_1t8gfj">skipWaiting</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 预缓存关键资源</span></span>
<span class="line"><span class="__shiki_140thh">  event.</span><span class="__shiki_1t8gfj">waitUntil</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> cache</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> caches.</span><span class="__shiki_1t8gfj">open</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;core-v2&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> cache.</span><span class="__shiki_1t8gfj">addAll</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;/app/&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;/app/index.html&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;/app/main.css&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;/app/app.js&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      ]);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 预缓存额外资源</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> res</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/api/precache&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> urls</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> res.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> cache.</span><span class="__shiki_1t8gfj">addAll</span><span class="__shiki_140thh">(urls);</span></span>
<span class="line"><span class="__shiki_140thh">    })()</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h2 id="四、缓存策略与离线体验" tabindex="-1">四、缓存策略与离线体验 <a class="header-anchor" href="#四、缓存策略与离线体验" aria-label="Permalink to &quot;四、缓存策略与离线体验&quot;">​</a></h2><h4 id="_1-缓存策略模式" tabindex="-1">1. 缓存策略模式 <a class="header-anchor" href="#_1-缓存策略模式" aria-label="Permalink to &quot;1. 缓存策略模式&quot;">​</a></h4><table tabindex="0"><thead><tr><th><strong>策略名称</strong></th><th><strong>描述</strong></th><th><strong>适用场景</strong></th></tr></thead><tbody><tr><td>缓存优先</td><td>优先返回缓存，无缓存时请求网络</td><td>静态资源，不常更新内容</td></tr><tr><td>网络优先</td><td>优先请求网络，失败时用缓存</td><td>实时数据</td></tr><tr><td>仅缓存</td><td>只从缓存获取</td><td>离线必备资源</td></tr><tr><td>仅网络</td><td>只从网络获取</td><td>需要最新数据</td></tr><tr><td>缓存并更新</td><td>返回缓存同时后台更新</td><td>可接受稍旧数据</td></tr><tr><td>缓存然后网络</td><td>立即返回缓存，后台更新后更新UI</td><td>内容页，社交应用</td></tr></tbody></table><h4 id="_2-缓存策略实现" tabindex="-1">2. 缓存策略实现 <a class="header-anchor" href="#_2-缓存策略实现" aria-label="Permalink to &quot;2. 缓存策略实现&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;fetch&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> request</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> event.request;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 静态资源 - 缓存优先</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (request.url.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/static/&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> event.</span><span class="__shiki_1t8gfj">respondWith</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      caches.</span><span class="__shiki_1t8gfj">match</span><span class="__shiki_140thh">(request).</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">cached</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        cached </span><span class="__shiki_1itgoe">||</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(request).</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">resp</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 克隆响应以缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">          const</span><span class="__shiki_dzsirb"> clone</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> resp.</span><span class="__shiki_1t8gfj">clone</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">          caches.</span><span class="__shiki_1t8gfj">open</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;static-assets&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">cache</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            cache.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(request, clone)</span></span>
<span class="line"><span class="__shiki_140thh">          );</span></span>
<span class="line"><span class="__shiki_1itgoe">          return</span><span class="__shiki_140thh"> resp;</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">      )</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // API请求 - 网络优先</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (request.url.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/api/&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> event.</span><span class="__shiki_1t8gfj">respondWith</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1t8gfj">      fetch</span><span class="__shiki_140thh">(request).</span><span class="__shiki_1t8gfj">catch</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        caches.</span><span class="__shiki_1t8gfj">match</span><span class="__shiki_140thh">(request).</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">cached</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> cached </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">          new</span><span class="__shiki_1t8gfj"> Response</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;{error: &quot;Offline&quot;}&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">            headers: {</span><span class="__shiki_mdbnqw">&#39;Content-Type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;application/json&#39;</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">          })</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">      )</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 其他请求 - 缓存优先</span></span>
<span class="line"><span class="__shiki_140thh">  event.</span><span class="__shiki_1t8gfj">respondWith</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    caches.</span><span class="__shiki_1t8gfj">match</span><span class="__shiki_140thh">(request).</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">cached</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">      cached </span><span class="__shiki_1itgoe">||</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(request)</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h4 id="_3-高级缓存管理" tabindex="-1">3. 高级缓存管理 <a class="header-anchor" href="#_3-高级缓存管理" aria-label="Permalink to &quot;3. 高级缓存管理&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 动态缓存策略</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> cacheFirstWithRefresh</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">request</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> cache</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> caches.</span><span class="__shiki_1t8gfj">open</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;dynamic-cache&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> cachedResponse</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> cache.</span><span class="__shiki_1t8gfj">match</span><span class="__shiki_140thh">(request);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 立即返回缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> fetchPromise</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(request).</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_1jdh33"> response</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 仅缓存有效响应</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (response.ok) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> cache.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(request, response.</span><span class="__shiki_1t8gfj">clone</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> response;</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> cachedResponse </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> fetchPromise;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 缓存过期管理</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> cacheWithExpiration</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">request</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">maxAge</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 3600</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> cache</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> caches.</span><span class="__shiki_1t8gfj">open</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;expiring-cache&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> cached</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> cache.</span><span class="__shiki_1t8gfj">match</span><span class="__shiki_140thh">(request);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (cached) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> cachedTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(cached.headers.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;date&#39;</span><span class="__shiki_140thh">)).</span><span class="__shiki_1t8gfj">getTime</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> age</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> cachedTime) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (age </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> maxAge) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> cached;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(request);</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (response.ok) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 添加缓存时间标记</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> headers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Headers</span><span class="__shiki_140thh">(response.headers);</span></span>
<span class="line"><span class="__shiki_140thh">    headers.</span><span class="__shiki_1t8gfj">append</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;date&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toUTCString</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> responseWithDate</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Response</span><span class="__shiki_140thh">(response.body, {</span></span>
<span class="line"><span class="__shiki_140thh">      status: response.status,</span></span>
<span class="line"><span class="__shiki_140thh">      statusText: response.statusText,</span></span>
<span class="line"><span class="__shiki_140thh">      headers</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    cache.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(request, responseWithDate.</span><span class="__shiki_1t8gfj">clone</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> responseWithDate;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> response;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="五、后台同步与推送通知" tabindex="-1">五、后台同步与推送通知 <a class="header-anchor" href="#五、后台同步与推送通知" aria-label="Permalink to &quot;五、后台同步与推送通知&quot;">​</a></h2><h4 id="_1-后台同步实现" tabindex="-1">1. 后台同步实现 <a class="header-anchor" href="#_1-后台同步实现" aria-label="Permalink to &quot;1. 后台同步实现&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 页面中触发同步</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> syncData</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> registration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> navigator.serviceWorker.ready;</span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> registration.sync.</span><span class="__shiki_1t8gfj">register</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;sync-user-data&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;后台同步已注册&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (err) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;后台同步注册失败:&#39;</span><span class="__shiki_140thh">, err);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Service Worker 中处理同步</span></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;sync&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (event.tag </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;sync-user-data&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    event.</span><span class="__shiki_1t8gfj">waitUntil</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      (</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 从 IndexedDB 获取待同步数据</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> openDB</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;sync-store&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> data</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">getAll</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;pending&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">          await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/api/sync&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">            method: </span><span class="__shiki_mdbnqw">&#39;POST&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            body: </span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">(data),</span></span>
<span class="line"><span class="__shiki_140thh">            headers: {</span><span class="__shiki_mdbnqw">&#39;Content-Type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;application/json&#39;</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">          });</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_21nrsd">          // 清除已同步数据</span></span>
<span class="line"><span class="__shiki_1itgoe">          await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">clear</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;pending&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 同步失败，下次重试</span></span>
<span class="line"><span class="__shiki_1itgoe">          throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      })()</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h4 id="_2-推送通知实现" tabindex="-1">2. 推送通知实现 <a class="header-anchor" href="#_2-推送通知实现" aria-label="Permalink to &quot;2. 推送通知实现&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 请求通知权限</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> requestNotificationPermission</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;Notification&#39;</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> window) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> permission</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> Notification.</span><span class="__shiki_1t8gfj">requestPermission</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> permission </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;granted&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 订阅推送服务</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> subscribePush</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> registration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> navigator.serviceWorker.ready;</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> subscription</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> registration.pushManager.</span><span class="__shiki_1t8gfj">subscribe</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">    userVisibleOnly: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 必须显示通知</span></span>
<span class="line"><span class="__shiki_140thh">    applicationServerKey: </span><span class="__shiki_1t8gfj">urlBase64ToUint8Array</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;PUBLIC_VAPID_KEY&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 发送订阅信息到服务器</span></span>
<span class="line"><span class="__shiki_1itgoe">  await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/api/push-subscribe&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">    method: </span><span class="__shiki_mdbnqw">&#39;POST&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    body: </span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">(subscription),</span></span>
<span class="line"><span class="__shiki_140thh">    headers: {</span><span class="__shiki_mdbnqw">&#39;Content-Type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;application/json&#39;</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Service Worker 处理推送事件</span></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;push&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> data</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> event.data.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  event.</span><span class="__shiki_1t8gfj">waitUntil</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    self.registration.</span><span class="__shiki_1t8gfj">showNotification</span><span class="__shiki_140thh">(data.title, {</span></span>
<span class="line"><span class="__shiki_140thh">      body: data.message,</span></span>
<span class="line"><span class="__shiki_140thh">      icon: </span><span class="__shiki_mdbnqw">&#39;/icons/notification.png&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      badge: </span><span class="__shiki_mdbnqw">&#39;/icons/badge.png&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      data: { url: data.link },</span></span>
<span class="line"><span class="__shiki_140thh">      vibrate: [</span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 处理通知点击</span></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;notificationclick&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  event.notification.</span><span class="__shiki_1t8gfj">close</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  event.</span><span class="__shiki_1t8gfj">waitUntil</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    clients.</span><span class="__shiki_1t8gfj">matchAll</span><span class="__shiki_140thh">({type: </span><span class="__shiki_mdbnqw">&#39;window&#39;</span><span class="__shiki_140thh">}).</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">clientList</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 尝试打开已有页面</span></span>
<span class="line"><span class="__shiki_1itgoe">      for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> client</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> clientList) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (client.url </span><span class="__shiki_1itgoe">===</span><span class="__shiki_140thh"> event.notification.data.url </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_mdbnqw"> &#39;focus&#39;</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> client) {</span></span>
<span class="line"><span class="__shiki_1itgoe">          return</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">focus</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 打开新页面</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (clients.openWindow) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> clients.</span><span class="__shiki_1t8gfj">openWindow</span><span class="__shiki_140thh">(event.notification.data.url);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h2 id="六、高级功能与优化" tabindex="-1">六、高级功能与优化 <a class="header-anchor" href="#六、高级功能与优化" aria-label="Permalink to &quot;六、高级功能与优化&quot;">​</a></h2><h4 id="_1-预缓存策略" tabindex="-1">1. 预缓存策略 <a class="header-anchor" href="#_1-预缓存策略" aria-label="Permalink to &quot;1. 预缓存策略&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 预缓存动态资源</span></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;install&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  event.</span><span class="__shiki_1t8gfj">waitUntil</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> cache</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> caches.</span><span class="__shiki_1t8gfj">open</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;precache-v1&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 预缓存关键页面</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> cache.</span><span class="__shiki_1t8gfj">addAll</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;/&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;/about&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;/contact&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      ]);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 预缓存动态确定的资源</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> apiResponse</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/api/critical-assets&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> assets</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> apiResponse.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> cache.</span><span class="__shiki_1t8gfj">addAll</span><span class="__shiki_140thh">(assets);</span></span>
<span class="line"><span class="__shiki_140thh">    })()</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 预取非关键资源</span></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;fetch&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (event.request.mode </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;navigate&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    event.</span><span class="__shiki_1t8gfj">respondWith</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      (</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 优先从网络获取</span></span>
<span class="line"><span class="__shiki_1itgoe">          const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(event.request);</span></span>
<span class="line"><span class="__shiki_1itgoe">          const</span><span class="__shiki_dzsirb"> cache</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> caches.</span><span class="__shiki_1t8gfj">open</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;pages&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">          cache.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(event.request, response.</span><span class="__shiki_1t8gfj">clone</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_1itgoe">          return</span><span class="__shiki_140thh"> response;</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">          return</span><span class="__shiki_140thh"> caches.</span><span class="__shiki_1t8gfj">match</span><span class="__shiki_140thh">(event.request);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      })()</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 后台预取资源</span></span>
<span class="line"><span class="__shiki_140thh">    event.</span><span class="__shiki_1t8gfj">waitUntil</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      (</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> cache</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> caches.</span><span class="__shiki_1t8gfj">open</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;next-pages&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> links</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &#39;/products&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">          &#39;/support&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">          &#39;/blog&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        ];</span></span>
<span class="line"><span class="__shiki_140thh">        cache.</span><span class="__shiki_1t8gfj">addAll</span><span class="__shiki_140thh">(links);</span></span>
<span class="line"><span class="__shiki_140thh">      })()</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h4 id="_1-性能优化技巧" tabindex="-1">1. 性能优化技巧 <a class="header-anchor" href="#_1-性能优化技巧" aria-label="Permalink to &quot;1. 性能优化技巧&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 流式响应处理</span></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;fetch&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (event.request.url.</span><span class="__shiki_1t8gfj">endsWith</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;.json&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_140thh">    event.</span><span class="__shiki_1t8gfj">respondWith</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      (</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 尝试从缓存获取</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> cached</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> caches.</span><span class="__shiki_1t8gfj">match</span><span class="__shiki_140thh">(event.request);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (cached) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh"> cached;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 获取网络响应</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(event.request);</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> reader</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> response.body.</span><span class="__shiki_1t8gfj">getReader</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> stream</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ReadableStream</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_1t8gfj">          start</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">controller</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            function</span><span class="__shiki_1t8gfj"> push</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">              reader.</span><span class="__shiki_1t8gfj">read</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(({ </span><span class="__shiki_1jdh33">done</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">value</span><span class="__shiki_140thh"> }) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (done) {</span></span>
<span class="line"><span class="__shiki_140thh">                  controller.</span><span class="__shiki_1t8gfj">close</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">                  return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                controller.</span><span class="__shiki_1t8gfj">enqueue</span><span class="__shiki_140thh">(value);</span></span>
<span class="line"><span class="__shiki_1t8gfj">                push</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">              });</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_1t8gfj">            push</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 缓存并返回流</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> cache</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> caches.</span><span class="__shiki_1t8gfj">open</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;stream-cache&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> newResponse</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Response</span><span class="__shiki_140thh">(stream, {</span></span>
<span class="line"><span class="__shiki_140thh">          headers: response.headers</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        cache.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(event.request, newResponse.</span><span class="__shiki_1t8gfj">clone</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> newResponse;</span></span>
<span class="line"><span class="__shiki_140thh">      })()</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 资源压缩与缓存</span></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;fetch&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> url</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> URL</span><span class="__shiki_140thh">(event.request.url);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (url.pathname.</span><span class="__shiki_1t8gfj">endsWith</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;.js&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> url.pathname.</span><span class="__shiki_1t8gfj">endsWith</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;.css&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_140thh">    event.</span><span class="__shiki_1t8gfj">respondWith</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      (</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查支持的压缩格式</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> acceptEncoding</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> event.request.headers.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Accept-Encoding&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> useGzip</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> acceptEncoding.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;gzip&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> useBrotli</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> acceptEncoding.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;br&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 构建缓存键</span></span>
<span class="line"><span class="__shiki_1itgoe">        let</span><span class="__shiki_140thh"> cacheKey </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> event.request.url;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (useGzip) cacheKey </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_mdbnqw"> &#39;.gz&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (useBrotli) cacheKey </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_mdbnqw"> &#39;.br&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 尝试从缓存获取压缩版本</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> cached</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> caches.</span><span class="__shiki_1t8gfj">match</span><span class="__shiki_140thh">(cacheKey);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (cached) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh"> cached;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 获取并缓存压缩资源</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(event.request.url </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">          (useBrotli </span><span class="__shiki_1itgoe">?</span><span class="__shiki_mdbnqw"> &#39;.br&#39;</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_140thh"> useGzip </span><span class="__shiki_1itgoe">?</span><span class="__shiki_mdbnqw"> &#39;.gz&#39;</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_mdbnqw"> &#39;&#39;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (response.ok) {</span></span>
<span class="line"><span class="__shiki_1itgoe">          const</span><span class="__shiki_dzsirb"> cache</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> caches.</span><span class="__shiki_1t8gfj">open</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;compressed-assets&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">          cache.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(cacheKey, response.</span><span class="__shiki_1t8gfj">clone</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> response;</span></span>
<span class="line"><span class="__shiki_140thh">      })()</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h2 id="七、调试与测试" tabindex="-1">七、调试与测试 <a class="header-anchor" href="#七、调试与测试" aria-label="Permalink to &quot;七、调试与测试&quot;">​</a></h2><h4 id="_1-调试工具" tabindex="-1">1. 调试工具 <a class="header-anchor" href="#_1-调试工具" aria-label="Permalink to &quot;1. 调试工具&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">A[调试工具] --&gt; B[Chrome DevTools]</span></span>
<span class="line"><span class="__shiki_140thh">A --&gt; C[Workbox Debugger]</span></span>
<span class="line"><span class="__shiki_140thh">A --&gt; D[Lighthouse]</span></span>
<span class="line"><span class="__shiki_140thh">A --&gt; E[Service Worker 测试库]</span></span></code></pre></div><h4 id="_2-调试技巧" tabindex="-1">2. 调试技巧 <a class="header-anchor" href="#_2-调试技巧" aria-label="Permalink to &quot;2. 调试技巧&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Service Worker 调试日志</span></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;install&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;[SW] 安装开始&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_21nrsd">  // ...</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 错误处理</span></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;error&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;SW 错误:&#39;</span><span class="__shiki_140thh">, event.error);</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 报告错误到服务器</span></span>
<span class="line"><span class="__shiki_1t8gfj">  reportError</span><span class="__shiki_140thh">(event.error);</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 手动触发更新</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> updateServiceWorker</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">  navigator.serviceWorker.</span><span class="__shiki_1t8gfj">getRegistration</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">reg</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (reg) reg.</span><span class="__shiki_1t8gfj">update</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;手动触发更新&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 跳过等待阶段</span></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;message&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (event.data </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;skipWaiting&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    self.</span><span class="__shiki_1t8gfj">skipWaiting</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h4 id="_3-测试策略" tabindex="-1">3. 测试策略 <a class="header-anchor" href="#_3-测试策略" aria-label="Permalink to &quot;3. 测试策略&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用 Workbox 测试库</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> {</span><span class="__shiki_dzsirb">generateSW</span><span class="__shiki_140thh">} </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;workbox-build&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> {</span><span class="__shiki_dzsirb">setup</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">teardown</span><span class="__shiki_140thh">} </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;workbox-testing&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">describe</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Service Worker&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  beforeAll</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_1t8gfj"> generateSW</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      globDirectory: </span><span class="__shiki_mdbnqw">&#39;./dist&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      globPatterns: [</span><span class="__shiki_mdbnqw">&#39;**/*.{html,js,css,png}&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">      swDest: </span><span class="__shiki_mdbnqw">&#39;./dist/sw.js&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">  beforeEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_1t8gfj"> setup</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> navigator.serviceWorker.</span><span class="__shiki_1t8gfj">register</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;./dist/sw.js&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">  afterEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_1t8gfj"> teardown</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">  test</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;缓存核心资源&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> cache</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> caches.</span><span class="__shiki_1t8gfj">open</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;v1-core&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> cachedRequests</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> cache.</span><span class="__shiki_1t8gfj">keys</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> cachedURLs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> cachedRequests.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">request</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> request.url);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(cachedURLs).</span><span class="__shiki_1t8gfj">toContain</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;https://example.com/index.html&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(cachedURLs).</span><span class="__shiki_1t8gfj">toContain</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;https://example.com/main.css&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h2 id="八、最佳实践与安全" tabindex="-1">八、最佳实践与安全 <a class="header-anchor" href="#八、最佳实践与安全" aria-label="Permalink to &quot;八、最佳实践与安全&quot;">​</a></h2><h4 id="_1-安全实践" tabindex="-1">1. 安全实践 <a class="header-anchor" href="#_1-安全实践" aria-label="Permalink to &quot;1. 安全实践&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 内容安全策略</span></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;install&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 设置严格的CSP</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> cspHeader</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;default-src &#39;self&#39;; script-src &#39;self&#39; &#39;unsafe-inline&#39;;&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  self.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;fetch&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (event.request.url.</span><span class="__shiki_1t8gfj">endsWith</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;.html&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_140thh">      event.</span><span class="__shiki_1t8gfj">respondWith</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1t8gfj">        fetch</span><span class="__shiki_140thh">(event.request).</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">response</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">          const</span><span class="__shiki_dzsirb"> newHeaders</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Headers</span><span class="__shiki_140thh">(response.headers);</span></span>
<span class="line"><span class="__shiki_140thh">          newHeaders.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Content-Security-Policy&#39;</span><span class="__shiki_140thh">, cspHeader);</span></span>
<span class="line"><span class="__shiki_1itgoe">          return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Response</span><span class="__shiki_140thh">(response.body, {</span></span>
<span class="line"><span class="__shiki_140thh">            status: response.status,</span></span>
<span class="line"><span class="__shiki_140thh">            statusText: response.statusText,</span></span>
<span class="line"><span class="__shiki_140thh">            headers: newHeaders</span></span>
<span class="line"><span class="__shiki_140thh">          });</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">      );</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 防止缓存中毒</span></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;fetch&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> url</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> URL</span><span class="__shiki_140thh">(event.request.url);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 拒绝缓存异常响应</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (url.origin </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_140thh"> location.origin </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">      event.request.method </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_mdbnqw"> &#39;GET&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">      event.request.mode </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_mdbnqw"> &#39;cors&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 拒绝缓存不安全的响应</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_ghujbu">\\.</span><span class="__shiki_21q97f">(php</span><span class="__shiki_1itgoe">|</span><span class="__shiki_21q97f">asp</span><span class="__shiki_1itgoe">|</span><span class="__shiki_21q97f">aspx</span><span class="__shiki_1itgoe">|</span><span class="__shiki_21q97f">jsp)</span><span class="__shiki_1itgoe">$</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">test</span><span class="__shiki_140thh">(url.pathname)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h4 id="_2-性能最佳实践" tabindex="-1">2. 性能最佳实践 <a class="header-anchor" href="#_2-性能最佳实践" aria-label="Permalink to &quot;2. 性能最佳实践&quot;">​</a></h4><table tabindex="0"><thead><tr><th><strong>实践要点</strong></th><th><strong>说明</strong></th><th><strong>实现方法</strong></th></tr></thead><tbody><tr><td>缓存策略优化</td><td>根据资源类型选择合适的缓存策略</td><td>静态资源用缓存优先，API用网络优先</td></tr><tr><td>资源预加载</td><td>预加载关键资源</td><td>在 install 事件中缓存核心资源</td></tr><tr><td>资源压缩</td><td>减少传输体积</td><td>缓存压缩版本资源</td></tr><tr><td>按需缓存</td><td>不缓存非必要资源</td><td>只缓存核心和常用资源</td></tr><tr><td>缓存清理</td><td>定期清理过期缓存</td><td>在 activate 事件中清理旧缓存</td></tr><tr><td>流式响应</td><td>加速内容呈现</td><td>使用 ReadableStream 返回部分内容</td></tr></tbody></table><h4 id="_3-版本控制与更新" tabindex="-1">3. 版本控制与更新 <a class="header-anchor" href="#_3-版本控制与更新" aria-label="Permalink to &quot;3. 版本控制与更新&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 版本控制策略</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> CACHE_VERSION</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;v3&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> CACHE_NAME</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> \`app-cache-\${</span><span class="__shiki_dzsirb">CACHE_VERSION</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;install&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  event.</span><span class="__shiki_1t8gfj">waitUntil</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    caches.</span><span class="__shiki_1t8gfj">open</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">CACHE_NAME</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">cache</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">      cache.</span><span class="__shiki_1t8gfj">addAll</span><span class="__shiki_140thh">([</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;activate&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  event.</span><span class="__shiki_1t8gfj">waitUntil</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    caches.</span><span class="__shiki_1t8gfj">keys</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">keys</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">      Promise</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">all</span><span class="__shiki_140thh">(keys.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (key </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_dzsirb"> CACHE_NAME</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> key.</span><span class="__shiki_1t8gfj">startsWith</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;app-cache-&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">          return</span><span class="__shiki_140thh"> caches.</span><span class="__shiki_1t8gfj">delete</span><span class="__shiki_140thh">(key);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }))</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 更新检测策略</span></span>
<span class="line"><span class="__shiki_140thh">navigator.serviceWorker.</span><span class="__shiki_1t8gfj">register</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/sw.js&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">reg</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  reg.</span><span class="__shiki_1t8gfj">onupdatefound</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> newWorker</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> reg.installing;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    newWorker.</span><span class="__shiki_1t8gfj">onstatechange</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (newWorker.state </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;installed&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (navigator.serviceWorker.controller) {</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 显示更新提示</span></span>
<span class="line"><span class="__shiki_1t8gfj">          showUpdateNotification</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            newWorker.</span><span class="__shiki_1t8gfj">postMessage</span><span class="__shiki_140thh">({action: </span><span class="__shiki_mdbnqw">&#39;skipWaiting&#39;</span><span class="__shiki_140thh">});</span></span>
<span class="line"><span class="__shiki_140thh">          });</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">          console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;首次安装成功&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;message&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (event.data.action </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;skipWaiting&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    self.</span><span class="__shiki_1t8gfj">skipWaiting</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h2 id="九、实战案例-pwa-应用" tabindex="-1">九、实战案例：PWA 应用 <a class="header-anchor" href="#九、实战案例-pwa-应用" aria-label="Permalink to &quot;九、实战案例：PWA 应用&quot;">​</a></h2><h4 id="_1-完整-pwa-实现" tabindex="-1">1. 完整 PWA 实现 <a class="header-anchor" href="#_1-完整-pwa-实现" aria-label="Permalink to &quot;1. 完整 PWA 实现&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Service Worker (sw.js)</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> CACHE_NAME</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;pwa-cache-v1&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> OFFLINE_URL</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;/offline.html&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;install&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  event.</span><span class="__shiki_1t8gfj">waitUntil</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    caches.</span><span class="__shiki_1t8gfj">open</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">CACHE_NAME</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">cache</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">      cache.</span><span class="__shiki_1t8gfj">addAll</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;/&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        OFFLINE_URL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;/styles/app.css&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;/scripts/app.js&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;/images/icons/icon-192.png&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;/images/icons/icon-512.png&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      ])</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;activate&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  event.</span><span class="__shiki_1t8gfj">waitUntil</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    caches.</span><span class="__shiki_1t8gfj">keys</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">keys</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">      Promise</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">all</span><span class="__shiki_140thh">(keys.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        key </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_dzsirb"> CACHE_NAME</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_140thh"> caches.</span><span class="__shiki_1t8gfj">delete</span><span class="__shiki_140thh">(key) </span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> null</span></span>
<span class="line"><span class="__shiki_140thh">      ))</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;fetch&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (event.request.mode </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;navigate&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    event.</span><span class="__shiki_1t8gfj">respondWith</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1t8gfj">      fetch</span><span class="__shiki_140thh">(event.request).</span><span class="__shiki_1t8gfj">catch</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        caches.</span><span class="__shiki_1t8gfj">match</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">OFFLINE_URL</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      )</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    event.</span><span class="__shiki_1t8gfj">respondWith</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      caches.</span><span class="__shiki_1t8gfj">match</span><span class="__shiki_140thh">(event.request).</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">cached</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        cached </span><span class="__shiki_1itgoe">||</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(event.request)</span></span>
<span class="line"><span class="__shiki_140thh">      )</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;push&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 推送通知处理</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 应用清单 (manifest.json)</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;name&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;My PWA&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;short_name&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;PWA&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;start_url&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;display&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;standalone&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;background_color&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;#ffffff&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;theme_color&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;#4285f4&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;icons&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;src&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/images/icons/icon-192.png&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;sizes&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;192x192&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;image/png&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;src&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/images/icons/icon-512.png&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;sizes&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;512x512&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;image/png&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="十、资源与工具" tabindex="-1">十、资源与工具 <a class="header-anchor" href="#十、资源与工具" aria-label="Permalink to &quot;十、资源与工具&quot;">​</a></h2><h4 id="_1-学习资源" tabindex="-1">1. 学习资源 <a class="header-anchor" href="#_1-学习资源" aria-label="Permalink to &quot;1. 学习资源&quot;">​</a></h4><p><a href="https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API" target="_blank" rel="noreferrer">📚 MDN Service Worker API</a></p><p><a href="https://developers.google.com/web/fundamentals/primers/service-workers" target="_blank" rel="noreferrer">📚 Google Web Fundamentals - Service Workers</a></p><p><a href="https://serviceworke.rs/" target="_blank" rel="noreferrer">📚 Service Worker Cookbook</a></p><p><a href="https://developers.google.com/web/tools/workbox" target="_blank" rel="noreferrer">📚 Workbox 文档</a></p><h4 id="_2-开发工具" tabindex="-1">2. 开发工具 <a class="header-anchor" href="#_2-开发工具" aria-label="Permalink to &quot;2. 开发工具&quot;">​</a></h4><table tabindex="0"><thead><tr><th><strong>工具名称</strong></th><th><strong>用途</strong></th><th><strong>链接</strong></th></tr></thead><tbody><tr><td>Workbox</td><td>简化 Service Worker 开发</td><td><a href="https://developers.google.com/web/tools/workbox" target="_blank" rel="noreferrer">https://developers.google.com/web/tools/workbox</a></td></tr><tr><td>PWA Builder</td><td>生成 PWA 应用</td><td><a href="https://www.pwabuilder.com/" target="_blank" rel="noreferrer">https://www.pwabuilder.com/</a></td></tr><tr><td>Lighthouse</td><td>审核 PWA 功能</td><td>Chrome DevTools</td></tr><tr><td>Service Worker Toolbox</td><td>常用缓存策略库</td><td><a href="https://github.com/GoogleChrome/sw-toolbox" target="_blank" rel="noreferrer">https://github.com/GoogleChrome/sw-toolbox</a></td></tr></tbody></table><h4 id="_3-浏览器调试" tabindex="-1">3. 浏览器调试 <a class="header-anchor" href="#_3-浏览器调试" aria-label="Permalink to &quot;3. 浏览器调试&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">A[Chrome DevTools] --&gt; B[Application &gt; Service Workers]</span></span>
<span class="line"><span class="__shiki_140thh">A --&gt; C[Application &gt; Cache Storage]</span></span>
<span class="line"><span class="__shiki_140thh">A --&gt; D[Network &gt; Offline 模式]</span></span>
<span class="line"><span class="__shiki_140thh">A --&gt; E[Performance &gt; 分析SW性能]</span></span></code></pre></div><p><strong>总结要点</strong>：</p><ul><li>Service Worker 是实现离线体验的核心技术</li><li>合理设计缓存策略是关键</li><li>生命周期管理决定应用稳定性</li><li>后台同步和推送通知增强用户参与度</li><li>安全实践保障用户数据安全</li><li>渐进增强确保兼容性</li><li>性能优化提升用户体验</li><li>持续更新保持应用最新状态</li></ul><p><strong>生产部署清单</strong>：</p><ul><li>通过 HTTPS 提供服务</li><li>实现有效的缓存策略</li><li>设置离线回退页面</li><li>添加 Web App Manifest</li><li>实现后台同步功能</li><li>添加推送通知支持</li><li>配置版本控制机制</li><li>添加更新提示功能</li><li>实施错误监控</li><li>进行跨浏览器测试</li></ul>`,66)])])}const d=a(p,[["render",h]]);export{r as __pageData,d as default};
