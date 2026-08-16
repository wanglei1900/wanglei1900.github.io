import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"Caddy 插件开发详解：从原理到实践","description":"","frontmatter":{},"headers":[],"relativePath":"devops/web-servers/caddy/plugins.md","filePath":"devops/web-servers/caddy/plugins.md"}'),p={name:"devops/web-servers/caddy/plugins.md"};function h(l,s,c,t,e,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="caddy-插件开发详解-从原理到实践" tabindex="-1">Caddy 插件开发详解：从原理到实践 <a class="header-anchor" href="#caddy-插件开发详解-从原理到实践" aria-label="Permalink to &quot;Caddy 插件开发详解：从原理到实践&quot;">​</a></h1><h2 id="_1-caddy-插件架构概述" tabindex="-1">1. Caddy 插件架构概述 <a class="header-anchor" href="#_1-caddy-插件架构概述" aria-label="Permalink to &quot;1. Caddy 插件架构概述&quot;">​</a></h2><h3 id="_1-1-插件在-caddy-中的角色" tabindex="-1">1.1 插件在 Caddy 中的角色 <a class="header-anchor" href="#_1-1-插件在-caddy-中的角色" aria-label="Permalink to &quot;1.1 插件在 Caddy 中的角色&quot;">​</a></h3><p>Caddy 是一个<strong>模块化</strong>的 Web 服务器，其几乎所有功能都通过插件（模块）实现。插件系统使得 Caddy 既能开箱即用，又能无限扩展。</p><p><strong>插件类型层级关系</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">Caddy 核心</span></span>
<span class="line"><span class="__shiki_wvjl67">├── HTTP 应用程序 (apps.http)</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── 服务器 (servers)</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── 处理器 (handlers)          ← 最常见的插件类型</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── 匹配器 (matchers)</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── 中间件 (middleware)</span></span>
<span class="line"><span class="__shiki_wvjl67">├── TLS 应用程序 (apps.tls)</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 管理 API 应用程序 (apps.admin)</span></span>
<span class="line"><span class="__shiki_wvjl67">└── 其他应用程序...</span></span></code></pre></div><h3 id="_1-2-两种插件开发模式" tabindex="-1">1.2 两种插件开发模式 <a class="header-anchor" href="#_1-2-两种插件开发模式" aria-label="Permalink to &quot;1.2 两种插件开发模式&quot;">​</a></h3><table tabindex="0"><thead><tr><th>模式</th><th>描述</th><th>适用场景</th><th>优缺点</th></tr></thead><tbody><tr><td><strong>Caddy 模块</strong></td><td>使用 Caddy 官方的模块系统，遵循标准接口</td><td>新功能开发、与 Caddy 深度集成</td><td>✅ 官方推荐、生命周期管理、配置集成<br>❌ 需遵循特定接口</td></tr><tr><td><strong>标准库插件</strong></td><td>实现标准库接口（如 <code>http.Handler</code>）</td><td>快速原型、简单功能</td><td>✅ 开发简单、Go 标准兼容<br>❌ 功能有限、集成度低</td></tr></tbody></table><h2 id="_2-官方推荐-caddy-模块开发" tabindex="-1">2. 官方推荐：Caddy 模块开发 <a class="header-anchor" href="#_2-官方推荐-caddy-模块开发" aria-label="Permalink to &quot;2. 官方推荐：Caddy 模块开发&quot;">​</a></h2><h3 id="_2-1-模块基础结构" tabindex="-1">2.1 模块基础结构 <a class="header-anchor" href="#_2-1-模块基础结构" aria-label="Permalink to &quot;2.1 模块基础结构&quot;">​</a></h3><p>Caddy 模块需要实现以下核心接口：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 模块接口（简化版）</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Module</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    CaddyModule</span><span class="__shiki_140thh">() </span><span class="__shiki_1t8gfj">ModuleInfo</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// HTTP 处理器接口（最常见的插件类型）</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Handler</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ServeHTTP</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ResponseWriter</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Request</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 示例：ModuleInfo 定义</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> ModuleInfo</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    ID  </span><span class="__shiki_1t8gfj">ModuleID</span><span class="__shiki_21nrsd">  // 如 &quot;http.handlers.my_handler&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    New </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">() </span><span class="__shiki_1t8gfj">Module</span><span class="__shiki_21nrsd">  // 构造函数</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-2-开发一个-http-处理器插件" tabindex="-1">2.2 开发一个 HTTP 处理器插件 <a class="header-anchor" href="#_2-2-开发一个-http-处理器插件" aria-label="Permalink to &quot;2.2 开发一个 HTTP 处理器插件&quot;">​</a></h3><p>以下是完整的 HTTP 处理器插件示例：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// myhandler.go</span></span>
<span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> myhandler</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">fmt</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">net/http</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">time</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">github.com/caddyserver/caddy/v2</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">github.com/caddyserver/caddy/v2/caddyconfig/caddyfile</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">github.com/caddyserver/caddy/v2/modules/caddyhttp</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 1. 定义模块结构</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> MyHandler</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Message </span><span class="__shiki_1itgoe">string</span><span class="__shiki_mdbnqw"> \`json:&quot;message,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    Count   </span><span class="__shiki_1itgoe">int</span><span class="__shiki_mdbnqw">    \`json:&quot;count,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 私有字段</span></span>
<span class="line"><span class="__shiki_140thh">    startTime </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 实现 CaddyModule 方法</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">MyHandler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">CaddyModule</span><span class="__shiki_140thh">() </span><span class="__shiki_1t8gfj">caddy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ModuleInfo</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1t8gfj"> caddy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ModuleInfo</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        ID:  </span><span class="__shiki_mdbnqw">&quot;http.handlers.my_handler&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        New: </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">() </span><span class="__shiki_1t8gfj">caddy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Module</span><span class="__shiki_140thh"> { </span><span class="__shiki_1itgoe">return</span><span class="__shiki_1t8gfj"> new</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">MyHandler</span><span class="__shiki_140thh">) },</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 3. 实现 Provision 方法（配置初始化）</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">m </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MyHandler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Provision</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> caddy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    m.startTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> m.Message </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;&quot;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        m.Message </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;默认消息&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> m.Count </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        m.Count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 可以获取其他模块</span></span>
<span class="line"><span class="__shiki_21nrsd">    // var app http.App</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ctx.App(&amp;app)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 4. 实现 Validator 方法（配置验证）</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">m </span><span class="__shiki_1t8gfj">MyHandler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Validate</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> m.Count </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;count 不能超过 100&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 5. 实现 ServeHTTP 方法（请求处理）</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">m </span><span class="__shiki_1t8gfj">MyHandler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">ServeHTTP</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">w</span><span class="__shiki_1t8gfj"> http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ResponseWriter</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">r</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Request</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">next</span><span class="__shiki_1t8gfj"> caddyhttp</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Handler</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 记录访问日志</span></span>
<span class="line"><span class="__shiki_140thh">    fmt.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;[</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">] </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_dzsirb"> %s\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">        time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">Format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2006-01-02 15:04:05&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        r.Method,</span></span>
<span class="line"><span class="__shiki_140thh">        r.URL.Path)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 在响应头中添加自定义信息</span></span>
<span class="line"><span class="__shiki_140thh">    w.</span><span class="__shiki_1t8gfj">Header</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">Set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;X-My-Handler&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;enabled&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    w.</span><span class="__shiki_1t8gfj">Header</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">Set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;X-Start-Time&quot;</span><span class="__shiki_140thh">, m.startTime.</span><span class="__shiki_1t8gfj">Format</span><span class="__shiki_140thh">(time.RFC3339))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 处理逻辑：重复输出消息</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> m.Count; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        fmt.</span><span class="__shiki_1t8gfj">Fprintf</span><span class="__shiki_140thh">(w, </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">%s\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, i</span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, m.Message)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 调用下一个处理器（中间件模式）</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> next.</span><span class="__shiki_1t8gfj">ServeHTTP</span><span class="__shiki_140thh">(w, r)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 6. 实现 UnmarshalCaddyfile 方法（Caddyfile 解析）</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">m </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MyHandler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">UnmarshalCaddyfile</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">d</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">caddyfile</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Dispenser</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 解析：my_handler [&lt;message&gt;] [count &lt;num&gt;]</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> d.</span><span class="__shiki_1t8gfj">Next</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 解析参数</span></span>
<span class="line"><span class="__shiki_140thh">        args </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> d.</span><span class="__shiki_1t8gfj">RemainingArgs</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(args) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            m.Message </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> args[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 解析具名参数</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> d.</span><span class="__shiki_1t8gfj">NextBlock</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            switch</span><span class="__shiki_140thh"> d.</span><span class="__shiki_1t8gfj">Val</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_mdbnqw"> &quot;count&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">d.</span><span class="__shiki_1t8gfj">NextArg</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_140thh"> d.</span><span class="__shiki_1t8gfj">ArgErr</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> _, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Sscanf</span><span class="__shiki_140thh">(d.</span><span class="__shiki_1t8gfj">Val</span><span class="__shiki_140thh">(), </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">m.Count); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_140thh"> d.</span><span class="__shiki_1t8gfj">Errf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;无效的 count 值: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_mdbnqw"> &quot;message&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">d.</span><span class="__shiki_1t8gfj">NextArg</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_140thh"> d.</span><span class="__shiki_1t8gfj">ArgErr</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                m.Message </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> d.</span><span class="__shiki_1t8gfj">Val</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">            default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> d.</span><span class="__shiki_1t8gfj">Errf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;未知参数: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, d.</span><span class="__shiki_1t8gfj">Val</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 7. 注册模块</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> init</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    caddy.</span><span class="__shiki_1t8gfj">RegisterModule</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">MyHandler</span><span class="__shiki_140thh">{})</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 接口断言</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    _ </span><span class="__shiki_1t8gfj">caddy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Module</span><span class="__shiki_1itgoe">                =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MyHandler</span><span class="__shiki_140thh">)(</span><span class="__shiki_dzsirb">nil</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    _ </span><span class="__shiki_1t8gfj">caddy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Provisioner</span><span class="__shiki_1itgoe">           =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MyHandler</span><span class="__shiki_140thh">)(</span><span class="__shiki_dzsirb">nil</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    _ </span><span class="__shiki_1t8gfj">caddy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Validator</span><span class="__shiki_1itgoe">             =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MyHandler</span><span class="__shiki_140thh">)(</span><span class="__shiki_dzsirb">nil</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    _ </span><span class="__shiki_1t8gfj">caddyhttp</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">MiddlewareHandler</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MyHandler</span><span class="__shiki_140thh">)(</span><span class="__shiki_dzsirb">nil</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    _ </span><span class="__shiki_1t8gfj">caddyfile</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Unmarshaler</span><span class="__shiki_1itgoe">       =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MyHandler</span><span class="__shiki_140thh">)(</span><span class="__shiki_dzsirb">nil</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_2-3-模块生命周期" tabindex="-1">2.3 模块生命周期 <a class="header-anchor" href="#_2-3-模块生命周期" aria-label="Permalink to &quot;2.3 模块生命周期&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[模块定义] --&gt; B[init 注册]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[Caddy 加载配置]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D{配置格式?}</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt;|JSON| E[UnmarshalJSON&lt;br&gt;反序列化]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt;|Caddyfile| F[UnmarshalCaddyfile&lt;br&gt;解析]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; G[Provision 初始化]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; G</span></span>
<span class="line"><span class="__shiki_140thh">    G --&gt; H[Validate 验证]</span></span>
<span class="line"><span class="__shiki_140thh">    H --&gt; I[运行时]</span></span>
<span class="line"><span class="__shiki_140thh">    I --&gt; J[ServeHTTP 处理请求]</span></span>
<span class="line"><span class="__shiki_140thh">    I --&gt; K[Cleanup 清理]</span></span>
<span class="line"><span class="__shiki_140thh">    J --&gt; L[下一处理器]</span></span></code></pre></div><h3 id="_2-4-配置文件集成" tabindex="-1">2.4 配置文件集成 <a class="header-anchor" href="#_2-4-配置文件集成" aria-label="Permalink to &quot;2.4 配置文件集成&quot;">​</a></h3><p><strong>JSON 配置</strong>：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;apps&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;http&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;servers&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">        &quot;example&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;listen&quot;</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;:8080&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;routes&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">            {</span></span>
<span class="line"><span class="__shiki_dzsirb">              &quot;handle&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">                {</span></span>
<span class="line"><span class="__shiki_dzsirb">                  &quot;handler&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;my_handler&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                  &quot;message&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Hello from plugin!&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                  &quot;count&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">              ]</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">          ]</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>Caddyfile 配置</strong>：</p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">:</span><span class="__shiki_1itgoe">8080</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    my_handler</span><span class="__shiki_mdbnqw"> &quot;Hello from Caddyfile!&quot;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        count</span><span class="__shiki_140thh"> 5</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_3-其他类型插件开发" tabindex="-1">3. 其他类型插件开发 <a class="header-anchor" href="#_3-其他类型插件开发" aria-label="Permalink to &quot;3. 其他类型插件开发&quot;">​</a></h2><h3 id="_3-1-匹配器-matcher-插件" tabindex="-1">3.1 匹配器（Matcher）插件 <a class="header-anchor" href="#_3-1-匹配器-matcher-插件" aria-label="Permalink to &quot;3.1 匹配器（Matcher）插件&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// mymatcher.go</span></span>
<span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> mymatcher</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">strings</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">github.com/caddyserver/caddy/v2</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">github.com/caddyserver/caddy/v2/caddyconfig/caddyfile</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">github.com/caddyserver/caddy/v2/modules/caddyhttp</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> MyMatcher</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Keyword </span><span class="__shiki_1itgoe">string</span><span class="__shiki_mdbnqw"> \`json:&quot;keyword,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">MyMatcher</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">CaddyModule</span><span class="__shiki_140thh">() </span><span class="__shiki_1t8gfj">caddy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ModuleInfo</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1t8gfj"> caddy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ModuleInfo</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        ID:  </span><span class="__shiki_mdbnqw">&quot;http.matchers.my_matcher&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        New: </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">() </span><span class="__shiki_1t8gfj">caddy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Module</span><span class="__shiki_140thh"> { </span><span class="__shiki_1itgoe">return</span><span class="__shiki_1t8gfj"> new</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">MyMatcher</span><span class="__shiki_140thh">) },</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Match 方法决定是否匹配请求</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">m </span><span class="__shiki_1t8gfj">MyMatcher</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Match</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">r</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Request</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> m.Keyword </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;&quot;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查 URL 路径是否包含关键词</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> strings.</span><span class="__shiki_1t8gfj">Contains</span><span class="__shiki_140thh">(r.URL.Path, m.Keyword)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 也可以检查其他部分：</span></span>
<span class="line"><span class="__shiki_21nrsd">    // return strings.Contains(r.Header.Get(&quot;User-Agent&quot;), m.Keyword)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">m </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MyMatcher</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">UnmarshalCaddyfile</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">d</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">caddyfile</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Dispenser</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> d.</span><span class="__shiki_1t8gfj">Next</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">d.</span><span class="__shiki_1t8gfj">NextArg</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> d.</span><span class="__shiki_1t8gfj">ArgErr</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        m.Keyword </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> d.</span><span class="__shiki_1t8gfj">Val</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> init</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    caddy.</span><span class="__shiki_1t8gfj">RegisterModule</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">MyMatcher</span><span class="__shiki_140thh">{})</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p>使用示例：</p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">:</span><span class="__shiki_1itgoe">8080</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">my</span><span class="__shiki_140thh"> match my_matcher api</span></span>
<span class="line"><span class="__shiki_1itgoe">    handle</span><span class="__shiki_140thh"> @my {</span></span>
<span class="line"><span class="__shiki_1itgoe">        reverse_proxy</span><span class="__shiki_140thh"> localhost:3000</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    handle</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        file_server</span><span class="__shiki_140thh"> /var/www/html</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-完整的中间件插件示例-请求id生成器" tabindex="-1">3.2 完整的中间件插件示例：请求ID生成器 <a class="header-anchor" href="#_3-2-完整的中间件插件示例-请求id生成器" aria-label="Permalink to &quot;3.2 完整的中间件插件示例：请求ID生成器&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// requestid.go</span></span>
<span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> requestid</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">crypto/rand</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">encoding/hex</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">fmt</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">net/http</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">github.com/caddyserver/caddy/v2</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">github.com/caddyserver/caddy/v2/caddyconfig/caddyfile</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">github.com/caddyserver/caddy/v2/modules/caddyhttp</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> RequestIDHandler</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    HeaderName </span><span class="__shiki_1itgoe">string</span><span class="__shiki_mdbnqw"> \`json:&quot;header_name,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    Length     </span><span class="__shiki_1itgoe">int</span><span class="__shiki_mdbnqw">    \`json:&quot;length,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">RequestIDHandler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">CaddyModule</span><span class="__shiki_140thh">() </span><span class="__shiki_1t8gfj">caddy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ModuleInfo</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1t8gfj"> caddy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ModuleInfo</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        ID:  </span><span class="__shiki_mdbnqw">&quot;http.handlers.request_id&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        New: </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">() </span><span class="__shiki_1t8gfj">caddy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Module</span><span class="__shiki_140thh"> { </span><span class="__shiki_1itgoe">return</span><span class="__shiki_1t8gfj"> new</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">RequestIDHandler</span><span class="__shiki_140thh">) },</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">m </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">RequestIDHandler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Provision</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> caddy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> m.HeaderName </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;&quot;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        m.HeaderName </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;X-Request-ID&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> m.Length </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        m.Length </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 16</span><span class="__shiki_21nrsd"> // 默认 16 字节 = 32 字符 hex</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">m </span><span class="__shiki_1t8gfj">RequestIDHandler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">ServeHTTP</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">w</span><span class="__shiki_1t8gfj"> http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ResponseWriter</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">r</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Request</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">next</span><span class="__shiki_1t8gfj"> caddyhttp</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Handler</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 生成随机 ID</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, m.Length)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> _, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> rand.</span><span class="__shiki_1t8gfj">Read</span><span class="__shiki_140thh">(id); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> caddyhttp.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(http.StatusInternalServerError, err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    requestID </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> hex.</span><span class="__shiki_1t8gfj">EncodeToString</span><span class="__shiki_140thh">(id)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 设置请求头</span></span>
<span class="line"><span class="__shiki_140thh">    r.Header.</span><span class="__shiki_1t8gfj">Set</span><span class="__shiki_140thh">(m.HeaderName, requestID)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 也设置到响应头</span></span>
<span class="line"><span class="__shiki_140thh">    w.</span><span class="__shiki_1t8gfj">Header</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">Set</span><span class="__shiki_140thh">(m.HeaderName, requestID)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 调用下一个处理器</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> next.</span><span class="__shiki_1t8gfj">ServeHTTP</span><span class="__shiki_140thh">(w, r)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">m </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">RequestIDHandler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">UnmarshalCaddyfile</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">d</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">caddyfile</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Dispenser</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> d.</span><span class="__shiki_1t8gfj">Next</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        args </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> d.</span><span class="__shiki_1t8gfj">RemainingArgs</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(args) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            m.HeaderName </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> args[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> d.</span><span class="__shiki_1t8gfj">NextBlock</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            switch</span><span class="__shiki_140thh"> d.</span><span class="__shiki_1t8gfj">Val</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_mdbnqw"> &quot;length&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">d.</span><span class="__shiki_1t8gfj">NextArg</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_140thh"> d.</span><span class="__shiki_1t8gfj">ArgErr</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                fmt.</span><span class="__shiki_1t8gfj">Sscanf</span><span class="__shiki_140thh">(d.</span><span class="__shiki_1t8gfj">Val</span><span class="__shiki_140thh">(), </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">m.Length)</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_mdbnqw"> &quot;header&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">d.</span><span class="__shiki_1t8gfj">NextArg</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_140thh"> d.</span><span class="__shiki_1t8gfj">ArgErr</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                m.HeaderName </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> d.</span><span class="__shiki_1t8gfj">Val</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> init</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    caddy.</span><span class="__shiki_1t8gfj">RegisterModule</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">RequestIDHandler</span><span class="__shiki_140thh">{})</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_4-插件开发工作流" tabindex="-1">4. 插件开发工作流 <a class="header-anchor" href="#_4-插件开发工作流" aria-label="Permalink to &quot;4. 插件开发工作流&quot;">​</a></h2><h3 id="_4-1-项目结构与开发环境" tabindex="-1">4.1 项目结构与开发环境 <a class="header-anchor" href="#_4-1-项目结构与开发环境" aria-label="Permalink to &quot;4.1 项目结构与开发环境&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 创建插件项目</span></span>
<span class="line"><span class="__shiki_1t8gfj">mkdir</span><span class="__shiki_mdbnqw"> caddy-plugin-myhandler</span></span>
<span class="line"><span class="__shiki_dzsirb">cd</span><span class="__shiki_mdbnqw"> caddy-plugin-myhandler</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 初始化 Go 模块</span></span>
<span class="line"><span class="__shiki_1t8gfj">go</span><span class="__shiki_mdbnqw"> mod</span><span class="__shiki_mdbnqw"> init</span><span class="__shiki_mdbnqw"> github.com/yourname/caddy-plugin-myhandler</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 添加 Caddy 依赖</span></span>
<span class="line"><span class="__shiki_1t8gfj">go</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> github.com/caddyserver/caddy/v2</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 项目结构</span></span>
<span class="line"><span class="__shiki_1t8gfj">caddy-plugin-myhandler/</span></span>
<span class="line"><span class="__shiki_1t8gfj">├──</span><span class="__shiki_mdbnqw"> go.mod</span></span>
<span class="line"><span class="__shiki_1t8gfj">├──</span><span class="__shiki_mdbnqw"> go.sum</span></span>
<span class="line"><span class="__shiki_1t8gfj">├──</span><span class="__shiki_mdbnqw"> myhandler.go</span><span class="__shiki_21nrsd">      # 主插件代码</span></span>
<span class="line"><span class="__shiki_1t8gfj">├──</span><span class="__shiki_mdbnqw"> myhandler_test.go</span><span class="__shiki_21nrsd"> # 测试文件</span></span>
<span class="line"><span class="__shiki_1t8gfj">├──</span><span class="__shiki_mdbnqw"> README.md</span></span>
<span class="line"><span class="__shiki_1t8gfj">└──</span><span class="__shiki_mdbnqw"> examples/</span><span class="__shiki_21nrsd">         # 示例配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ├──</span><span class="__shiki_mdbnqw"> Caddyfile</span></span>
<span class="line"><span class="__shiki_1t8gfj">    └──</span><span class="__shiki_mdbnqw"> config.json</span></span></code></pre></div><p><strong>go.mod 示例</strong>：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">module github.com</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">yourname</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">caddy</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">plugin</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">myhandler</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">go</span><span class="__shiki_dzsirb"> 1.21</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">require (</span></span>
<span class="line"><span class="__shiki_140thh">    github.com</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">caddyserver</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">caddy</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">v2 v2.</span><span class="__shiki_dzsirb">7.0</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 其他依赖...</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_4-2-本地测试与调试" tabindex="-1">4.2 本地测试与调试 <a class="header-anchor" href="#_4-2-本地测试与调试" aria-label="Permalink to &quot;4.2 本地测试与调试&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// main_test.go</span></span>
<span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> myhandler</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">net/http</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">net/http/httptest</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">testing</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">github.com/caddyserver/caddy/v2</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">github.com/caddyserver/caddy/v2/caddyconfig</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">github.com/caddyserver/caddy/v2/modules/caddyhttp</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> TestMyHandler</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">testing</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">T</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 创建处理器实例</span></span>
<span class="line"><span class="__shiki_140thh">    handler </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> MyHandler</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        Message: </span><span class="__shiki_mdbnqw">&quot;Test Message&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        Count:   </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 初始化</span></span>
<span class="line"><span class="__shiki_140thh">    ctx </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> caddy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">{Context: context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">()}</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> handler.</span><span class="__shiki_1t8gfj">Provision</span><span class="__shiki_140thh">(ctx); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        t.</span><span class="__shiki_1t8gfj">Fatalf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Provision failed: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 测试 HTTP 处理</span></span>
<span class="line"><span class="__shiki_140thh">    req </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> httptest.</span><span class="__shiki_1t8gfj">NewRequest</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;GET&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;/test&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">nil</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    rr </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> httptest.</span><span class="__shiki_1t8gfj">NewRecorder</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 下一个处理器（模拟）</span></span>
<span class="line"><span class="__shiki_140thh">    next </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> caddyhttp.</span><span class="__shiki_1t8gfj">HandlerFunc</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">w</span><span class="__shiki_1t8gfj"> http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ResponseWriter</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">r</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Request</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        w.</span><span class="__shiki_1t8gfj">WriteHeader</span><span class="__shiki_140thh">(http.StatusOK)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 执行处理</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> handler.</span><span class="__shiki_1t8gfj">ServeHTTP</span><span class="__shiki_140thh">(rr, req, next); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        t.</span><span class="__shiki_1t8gfj">Fatalf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ServeHTTP failed: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 验证结果</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> rr.Code </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> http.StatusOK {</span></span>
<span class="line"><span class="__shiki_140thh">        t.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Expected status 200, got </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, rr.Code)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    expectedHeader </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_mdbnqw"> &quot;enabled&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> rr.</span><span class="__shiki_1t8gfj">Header</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;X-My-Handler&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> expectedHeader {</span></span>
<span class="line"><span class="__shiki_140thh">        t.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Expected header X-My-Handler=</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">, got </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">            expectedHeader, rr.</span><span class="__shiki_1t8gfj">Header</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;X-My-Handler&quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 集成测试：测试完整的 Caddy 配置</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> TestIntegration</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">testing</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">T</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    cfg </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_mdbnqw"> \`</span></span>
<span class="line"><span class="__shiki_mdbnqw">    {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;apps&quot;: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;http&quot;: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;servers&quot;: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;test&quot;: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;listen&quot;: [&quot;:18080&quot;],</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;routes&quot;: [{</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            &quot;handle&quot;: [{</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                &quot;handler&quot;: &quot;my_handler&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                &quot;message&quot;: &quot;Integration Test&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                &quot;count&quot;: 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            }]</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        }]</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">                }</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }\`</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 加载配置</span></span>
<span class="line"><span class="__shiki_140thh">    _, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> caddyconfig.</span><span class="__shiki_1t8gfj">Load</span><span class="__shiki_140thh">(cfg, </span><span class="__shiki_mdbnqw">&quot;json&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        t.</span><span class="__shiki_1t8gfj">Fatalf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Failed to load config: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-3-编译与运行" tabindex="-1">4.3 编译与运行 <a class="header-anchor" href="#_4-3-编译与运行" aria-label="Permalink to &quot;4.3 编译与运行&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 创建主文件（用于独立测试）</span></span>
<span class="line"><span class="__shiki_1t8gfj">//</span><span class="__shiki_mdbnqw"> cmd/caddy/main.go</span></span>
<span class="line"><span class="__shiki_1t8gfj">package</span><span class="__shiki_mdbnqw"> main</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1t8gfj">    _</span><span class="__shiki_mdbnqw"> &quot;github.com/yourname/caddy-plugin-myhandler&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    &quot;github.com/caddyserver/caddy/v2/cmd&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">func</span><span class="__shiki_mdbnqw"> main</span><span class="__shiki_140thh">() </span><span class="__shiki_mdbnqw">{</span></span>
<span class="line"><span class="__shiki_1t8gfj">    cmd.Execute</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 编译包含插件的 Caddy</span></span>
<span class="line"><span class="__shiki_1t8gfj">go</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> caddy-with-myplugin</span><span class="__shiki_mdbnqw"> ./cmd/caddy</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 运行测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">./caddy-with-myplugin</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> --config</span><span class="__shiki_mdbnqw"> examples/config.json</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 或者使用 xcaddy 构建（推荐）</span></span>
<span class="line"><span class="__shiki_1t8gfj">go</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> github.com/caddyserver/xcaddy/cmd/xcaddy@latest</span></span>
<span class="line"><span class="__shiki_1t8gfj">xcaddy</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_dzsirb"> --with</span><span class="__shiki_mdbnqw"> github.com/yourname/caddy-plugin-myhandler</span></span></code></pre></div><h2 id="_5-高级插件开发技巧" tabindex="-1">5. 高级插件开发技巧 <a class="header-anchor" href="#_5-高级插件开发技巧" aria-label="Permalink to &quot;5. 高级插件开发技巧&quot;">​</a></h2><h3 id="_5-1-依赖注入与模块交互" tabindex="-1">5.1 依赖注入与模块交互 <a class="header-anchor" href="#_5-1-依赖注入与模块交互" aria-label="Permalink to &quot;5.1 依赖注入与模块交互&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 访问其他模块</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> MyHandler</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 通过结构体标签声明依赖</span></span>
<span class="line"><span class="__shiki_140thh">    Logger </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">caddy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Logger</span><span class="__shiki_mdbnqw"> \`json:&quot;-&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    Cache  </span><span class="__shiki_1t8gfj">caddy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Cache</span><span class="__shiki_mdbnqw">   \`json:&quot;-&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">m </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MyHandler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Provision</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> caddy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取日志模块</span></span>
<span class="line"><span class="__shiki_140thh">    m.Logger </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ctx.</span><span class="__shiki_1t8gfj">Logger</span><span class="__shiki_140thh">(m)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取缓存模块</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> ctx.</span><span class="__shiki_1t8gfj">App</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;cache&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">m.Cache); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 缓存是可选的</span></span>
<span class="line"><span class="__shiki_140thh">        m.Logger.</span><span class="__shiki_1t8gfj">Warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;缓存模块不可用&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取 HTTP 应用配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> httpApp </span><span class="__shiki_1t8gfj">caddyhttp</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">App</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> ctx.</span><span class="__shiki_1t8gfj">App</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;http&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">httpApp); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用共享状态</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> SharedState</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Counter </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">    mu      </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RWMutex</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">m </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MyHandler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">ServeHTTP</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">w</span><span class="__shiki_1t8gfj"> http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ResponseWriter</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">r</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Request</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">next</span><span class="__shiki_1t8gfj"> caddyhttp</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Handler</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 原子操作</span></span>
<span class="line"><span class="__shiki_140thh">    atomic.</span><span class="__shiki_1t8gfj">AddInt64</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">m.State.Counter, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    fmt.</span><span class="__shiki_1t8gfj">Fprintf</span><span class="__shiki_140thh">(w, </span><span class="__shiki_mdbnqw">&quot;请求计数: </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, atomic.</span><span class="__shiki_1t8gfj">LoadInt64</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">m.State.Counter))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> next.</span><span class="__shiki_1t8gfj">ServeHTTP</span><span class="__shiki_140thh">(w, r)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-配置验证与默认值" tabindex="-1">5.2 配置验证与默认值 <a class="header-anchor" href="#_5-2-配置验证与默认值" aria-label="Permalink to &quot;5.2 配置验证与默认值&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> ConfigurableHandler</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 配置字段</span></span>
<span class="line"><span class="__shiki_140thh">    Timeout   </span><span class="__shiki_1t8gfj">caddy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_mdbnqw"> \`json:&quot;timeout,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    MaxSize   </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_mdbnqw">          \`json:&quot;max_size,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    AllowedIPs []</span><span class="__shiki_1itgoe">string</span><span class="__shiki_mdbnqw">      \`json:&quot;allowed_ips,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 解析后的字段</span></span>
<span class="line"><span class="__shiki_140thh">    allowedNets []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">net</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">IPNet</span><span class="__shiki_mdbnqw"> \`json:&quot;-&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">ch </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">ConfigurableHandler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Provision</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> caddy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 设置默认值</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> ch.Timeout </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        ch.Timeout </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> caddy.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">30</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> time.Second)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> ch.MaxSize </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        ch.MaxSize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_21nrsd"> // 10MB</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 解析 CIDR</span></span>
<span class="line"><span class="__shiki_140thh">    ch.allowedNets </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">net</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">IPNet</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(ch.AllowedIPs))</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, cidr </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> ch.AllowedIPs {</span></span>
<span class="line"><span class="__shiki_140thh">        _, ipNet, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> net.</span><span class="__shiki_1t8gfj">ParseCIDR</span><span class="__shiki_140thh">(cidr)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;无效的 CIDR </span><span class="__shiki_dzsirb">%q</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, cidr, err)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        ch.allowedNets </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(ch.allowedNets, ipNet)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">ch </span><span class="__shiki_1t8gfj">ConfigurableHandler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Validate</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> ch.MaxSize </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;max_size 不能为负数&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> ch.MaxSize </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;max_size 太大 (最大 100MB)&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> ch.Timeout </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;timeout 不能为负数&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-3-性能优化技巧" tabindex="-1">5.3 性能优化技巧 <a class="header-anchor" href="#_5-3-性能优化技巧" aria-label="Permalink to &quot;5.3 性能优化技巧&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 1. 使用 sync.Pool 减少分配</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> bufferPool </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Pool</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">    New: </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{} {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> bytes.</span><span class="__shiki_1t8gfj">NewBuffer</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">m </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MyHandler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">ServeHTTP</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">w</span><span class="__shiki_1t8gfj"> http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ResponseWriter</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">r</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Request</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">next</span><span class="__shiki_1t8gfj"> caddyhttp</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Handler</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 从池中获取 buffer</span></span>
<span class="line"><span class="__shiki_140thh">    buf </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> bufferPool.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">().(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">bytes</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Buffer</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    buf.</span><span class="__shiki_1t8gfj">Reset</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> bufferPool.</span><span class="__shiki_1t8gfj">Put</span><span class="__shiki_140thh">(buf) </span><span class="__shiki_21nrsd">// 用完后放回</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 使用 buffer</span></span>
<span class="line"><span class="__shiki_140thh">    buf.</span><span class="__shiki_1t8gfj">WriteString</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;处理结果: &quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ...</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> next.</span><span class="__shiki_1t8gfj">ServeHTTP</span><span class="__shiki_140thh">(w, r)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 使用 context 传递值（避免全局变量）</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> contextKey</span><span class="__shiki_1itgoe"> string</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> requestIDKey</span><span class="__shiki_1t8gfj"> contextKey</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;requestID&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">m </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MyHandler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">ServeHTTP</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">w</span><span class="__shiki_1t8gfj"> http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ResponseWriter</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">r</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Request</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">next</span><span class="__shiki_1t8gfj"> caddyhttp</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Handler</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 在 context 中存储值</span></span>
<span class="line"><span class="__shiki_140thh">    ctx </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> context.</span><span class="__shiki_1t8gfj">WithValue</span><span class="__shiki_140thh">(r.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">(), requestIDKey, </span><span class="__shiki_1t8gfj">generateID</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">    r </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> r.</span><span class="__shiki_1t8gfj">WithContext</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> next.</span><span class="__shiki_1t8gfj">ServeHTTP</span><span class="__shiki_140thh">(w, r)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 下游处理器获取值</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> getRequestID</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">r</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Request</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> id, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> r.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">Value</span><span class="__shiki_140thh">(requestIDKey).(</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">); ok {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> id</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_mdbnqw"> &quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 3. 延迟计算（懒加载）</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> LazyHandler</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    config     </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    compiledRE </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">regexp</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Regexp</span><span class="__shiki_21nrsd"> // 延迟编译</span></span>
<span class="line"><span class="__shiki_140thh">    reOnce     </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Once</span></span>
<span class="line"><span class="__shiki_140thh">    reErr      </span><span class="__shiki_1itgoe">error</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">lh </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">LazyHandler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">getRegex</span><span class="__shiki_140thh">() (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">regexp</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Regexp</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    lh.reOnce.</span><span class="__shiki_1t8gfj">Do</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        lh.compiledRE, lh.reErr </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> regexp.</span><span class="__shiki_1t8gfj">Compile</span><span class="__shiki_140thh">(lh.config)</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> lh.compiledRE, lh.reErr</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_6-插件发布与分发" tabindex="-1">6. 插件发布与分发 <a class="header-anchor" href="#_6-插件发布与分发" aria-label="Permalink to &quot;6. 插件发布与分发&quot;">​</a></h2><h3 id="_6-1-版本管理与兼容性" tabindex="-1">6.1 版本管理与兼容性 <a class="header-anchor" href="#_6-1-版本管理与兼容性" aria-label="Permalink to &quot;6.1 版本管理与兼容性&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// go.mod - 版本管理</span></span>
<span class="line"><span class="__shiki_140thh">module github.com</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">yourname</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">caddy</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">plugin</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">v2</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">go</span><span class="__shiki_dzsirb"> 1.21</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">require (</span></span>
<span class="line"><span class="__shiki_140thh">    github.com</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">caddyserver</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">caddy</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">v2 v2.</span><span class="__shiki_dzsirb">7.0</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 语义化版本</span></span>
<span class="line"><span class="__shiki_21nrsd">// v1.0.0 - 初始版本</span></span>
<span class="line"><span class="__shiki_21nrsd">// v1.1.0 - 向后兼容的新功能</span></span>
<span class="line"><span class="__shiki_21nrsd">// v2.0.0 - 不兼容的 API 更改</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 兼容性声明</span></span>
<span class="line"><span class="__shiki_21nrsd">// 在 README 中说明支持的 Caddy 版本</span></span></code></pre></div><h3 id="_6-2-文档与示例" tabindex="-1">6.2 文档与示例 <a class="header-anchor" href="#_6-2-文档与示例" aria-label="Permalink to &quot;6.2 文档与示例&quot;">​</a></h3><p><strong>README.md 结构</strong>：</p><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_19pls7"># Caddy MyHandler 插件</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">## 功能简介</span></span>
<span class="line"><span class="__shiki_140thh">详细描述插件功能...</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">## 安装</span></span>
<span class="line"><span class="__shiki_140thh">\`\`\`bash</span></span>
<span class="line"><span class="__shiki_1t8gfj">xcaddy</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_dzsirb"> --with</span><span class="__shiki_mdbnqw"> github.com/yourname/caddy-plugin-myhandler</span></span></code></pre></div><h2 id="配置示例" tabindex="-1">配置示例 <a class="header-anchor" href="#配置示例" aria-label="Permalink to &quot;配置示例&quot;">​</a></h2><h3 id="json-配置" tabindex="-1">JSON 配置 <a class="header-anchor" href="#json-配置" aria-label="Permalink to &quot;JSON 配置&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;handler&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;my_handler&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;message&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Hello&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;count&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="caddyfile-配置" tabindex="-1">Caddyfile 配置 <a class="header-anchor" href="#caddyfile-配置" aria-label="Permalink to &quot;Caddyfile 配置&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">my_handler</span><span class="__shiki_mdbnqw"> &quot;Hello&quot;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    count</span><span class="__shiki_140thh"> 5</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="api-文档" tabindex="-1">API 文档 <a class="header-anchor" href="#api-文档" aria-label="Permalink to &quot;API 文档&quot;">​</a></h2><ul><li><code>message</code> (string): 显示的消息</li><li><code>count</code> (int): 重复次数</li></ul><h2 id="开发" tabindex="-1">开发 <a class="header-anchor" href="#开发" aria-label="Permalink to &quot;开发&quot;">​</a></h2><p>构建与测试说明...</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">### 6.3 发布到 Caddy 市场</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">虽然 Caddy 没有官方插件市场，但可以通过以下方式分发：</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">1. **GitHub Releases**：发布编译好的二进制文件</span></span>
<span class="line"><span class="__shiki_wvjl67">2. **Docker 镜像**：提供包含插件的 Caddy 镜像</span></span>
<span class="line"><span class="__shiki_wvjl67">3. **xcaddy 集成**：确保可以通过 \`--with\` 参数构建</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">\`\`\`dockerfile</span></span>
<span class="line"><span class="__shiki_wvjl67"># Dockerfile 示例</span></span>
<span class="line"><span class="__shiki_wvjl67">FROM caddy:2-builder AS builder</span></span>
<span class="line"><span class="__shiki_wvjl67">RUN xcaddy build --with github.com/yourname/caddy-plugin-myhandler</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">FROM caddy:2</span></span>
<span class="line"><span class="__shiki_wvjl67">COPY --from=builder /usr/bin/caddy /usr/bin/caddy</span></span></code></pre></div><h2 id="_7-调试与故障排除" tabindex="-1">7. 调试与故障排除 <a class="header-anchor" href="#_7-调试与故障排除" aria-label="Permalink to &quot;7. 调试与故障排除&quot;">​</a></h2><h3 id="_7-1-常见问题与解决方案" tabindex="-1">7.1 常见问题与解决方案 <a class="header-anchor" href="#_7-1-常见问题与解决方案" aria-label="Permalink to &quot;7.1 常见问题与解决方案&quot;">​</a></h3><table tabindex="0"><thead><tr><th>问题</th><th>可能原因</th><th>解决方案</th></tr></thead><tbody><tr><td>插件未加载</td><td>未正确注册</td><td>检查 <code>init()</code> 函数中的 <code>RegisterModule</code></td></tr><tr><td>配置解析失败</td><td>UnmarshalCaddyfile 实现错误</td><td>使用 <code>caddy adapt</code> 测试配置</td></tr><tr><td>内存泄漏</td><td>未正确管理资源</td><td>使用 <code>pprof</code> 分析内存使用</td></tr><tr><td>竞争条件</td><td>并发访问共享状态</td><td>使用 <code>sync</code> 包或原子操作</td></tr></tbody></table><h3 id="_7-2-调试工具" tabindex="-1">7.2 调试工具 <a class="header-anchor" href="#_7-2-调试工具" aria-label="Permalink to &quot;7.2 调试工具&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 1. 使用 pprof 进行性能分析</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> _ </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">net/http/pprof</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">m </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MyHandler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Provision</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> caddy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 启用 pprof（仅开发环境）</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> os.</span><span class="__shiki_1t8gfj">Getenv</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;DEBUG&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;true&quot;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        go</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">            log.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(http.</span><span class="__shiki_1t8gfj">ListenAndServe</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;localhost:6060&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">nil</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">        }()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 详细的日志记录</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">m </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MyHandler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">ServeHTTP</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">w</span><span class="__shiki_1t8gfj"> http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ResponseWriter</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">r</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Request</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">next</span><span class="__shiki_1t8gfj"> caddyhttp</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Handler</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    start </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 记录请求详情</span></span>
<span class="line"><span class="__shiki_140thh">    m.Logger.</span><span class="__shiki_1t8gfj">Debug</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;开始处理请求&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        zap.</span><span class="__shiki_1t8gfj">String</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;path&quot;</span><span class="__shiki_140thh">, r.URL.Path),</span></span>
<span class="line"><span class="__shiki_140thh">        zap.</span><span class="__shiki_1t8gfj">String</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;method&quot;</span><span class="__shiki_140thh">, r.Method),</span></span>
<span class="line"><span class="__shiki_140thh">        zap.</span><span class="__shiki_1t8gfj">String</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ip&quot;</span><span class="__shiki_140thh">, r.RemoteAddr))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> next.</span><span class="__shiki_1t8gfj">ServeHTTP</span><span class="__shiki_140thh">(w, r)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 记录处理时间</span></span>
<span class="line"><span class="__shiki_140thh">    m.Logger.</span><span class="__shiki_1t8gfj">Debug</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;请求处理完成&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        zap.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;duration&quot;</span><span class="__shiki_140thh">, time.</span><span class="__shiki_1t8gfj">Since</span><span class="__shiki_140thh">(start)),</span></span>
<span class="line"><span class="__shiki_140thh">        zap.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(err))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 3. 使用 delve 调试</span></span>
<span class="line"><span class="__shiki_21nrsd">// dlv debug ./cmd/caddy -- run --config test.json</span></span></code></pre></div><h2 id="_8-最佳实践总结" tabindex="-1">8. 最佳实践总结 <a class="header-anchor" href="#_8-最佳实践总结" aria-label="Permalink to &quot;8. 最佳实践总结&quot;">​</a></h2><ol><li><strong>遵循单一职责原则</strong>：每个插件只做一件事</li><li><strong>提供合理的默认值</strong>：减少必要的配置</li><li><strong>完整的错误处理</strong>：提供清晰的错误信息</li><li><strong>充分的测试覆盖</strong>：单元测试 + 集成测试</li><li><strong>性能考虑</strong>：避免不必要的内存分配</li><li><strong>并发安全</strong>：正确处理共享状态</li><li><strong>完整文档</strong>：包括示例和 API 文档</li><li><strong>版本兼容性</strong>：明确声明支持的 Caddy 版本</li></ol><p>Caddy 插件开发的核心是理解模块系统和生命周期。从简单的处理器开始，逐步尝试更复杂的插件类型，最终可以开发出功能强大的定制模块，扩展 Caddy 以满足特定需求。</p>`,69)])])}const r=a(p,[["render",h]]);export{o as __pageData,r as default};
