import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"JWT 安全存储","description":"","frontmatter":{},"headers":[],"relativePath":"backend/auth/jwt/storage.md","filePath":"backend/auth/jwt/storage.md"}'),p={name:"backend/auth/jwt/storage.md"};function h(l,s,c,t,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="jwt-安全存储" tabindex="-1">JWT 安全存储 <a class="header-anchor" href="#jwt-安全存储" aria-label="Permalink to &quot;JWT 安全存储&quot;">​</a></h1><h2 id="一、-jwt-存储安全概述" tabindex="-1">一、 JWT 存储安全概述 <a class="header-anchor" href="#一、-jwt-存储安全概述" aria-label="Permalink to &quot;一、 JWT 存储安全概述&quot;">​</a></h2><h4 id="_1-为什么-jwt-存储安全至关重要" tabindex="-1">1. 为什么 JWT 存储安全至关重要 <a class="header-anchor" href="#_1-为什么-jwt-存储安全至关重要" aria-label="Permalink to &quot;1. 为什么 JWT 存储安全至关重要&quot;">​</a></h4><ul><li><strong>令牌泄露</strong> = 身份被盗用</li><li><strong>持久性风险</strong>: JWT 在过期前一直有效</li><li><strong>无状态特性</strong>: 服务器无法强制撤销单个令牌</li><li><strong>敏感信息暴露</strong>: Payload 可能包含敏感数据</li></ul><h4 id="_2-主要安全威胁" tabindex="-1">2. 主要安全威胁 <a class="header-anchor" href="#_2-主要安全威胁" aria-label="Permalink to &quot;2. 主要安全威胁&quot;">​</a></h4><ul><li><strong>XSS 攻击</strong> (跨站脚本)</li><li><strong>CSRF 攻击</strong> (跨站请求伪造)</li><li><strong>中间人攻击</strong></li><li><strong>令牌窃取</strong></li><li><strong>令牌重放攻击</strong></li></ul><h2 id="二、客户端存储方案" tabindex="-1">二、客户端存储方案 <a class="header-anchor" href="#二、客户端存储方案" aria-label="Permalink to &quot;二、客户端存储方案&quot;">​</a></h2><h4 id="_1-浏览器存储选项对比" tabindex="-1">1. 浏览器存储选项对比 <a class="header-anchor" href="#_1-浏览器存储选项对比" aria-label="Permalink to &quot;1. 浏览器存储选项对比&quot;">​</a></h4><table tabindex="0"><thead><tr><th>存储方式</th><th>安全性</th><th>容量</th><th>可访问性</th><th>过期控制</th><th>XSS 风险</th><th>CSRF 风险</th></tr></thead><tbody><tr><td>LocalStorage</td><td>低</td><td>5-10MB</td><td>同源 JavaScript</td><td>无</td><td>高</td><td>低</td></tr><tr><td>SessionStorage</td><td>低</td><td>5-10MB</td><td>同源 JavaScript</td><td>会话结束</td><td>高</td><td>低</td></tr><tr><td>Cookies (HttpOnly)</td><td>高</td><td>4KB</td><td>仅服务器</td><td>可设置</td><td>低</td><td>中</td></tr><tr><td>Cookies (非 HttpOnly)</td><td>中</td><td>4KB</td><td>JavaScript</td><td>可设置</td><td>中</td><td>中</td></tr><tr><td>Memory</td><td>高</td><td>小</td><td>仅当前标签页</td><td>页面刷新</td><td>低</td><td>低</td></tr></tbody></table><h4 id="_2-具体实现方案" tabindex="-1">2. 具体实现方案 <a class="header-anchor" href="#_2-具体实现方案" aria-label="Permalink to &quot;2. 具体实现方案&quot;">​</a></h4><h5 id="_2-2-1-内存存储-推荐" tabindex="-1">2.2.1 内存存储 (推荐) <a class="header-anchor" href="#_2-2-1-内存存储-推荐" aria-label="Permalink to &quot;2.2.1 内存存储 (推荐)&quot;">​</a></h5><p><strong>实现原理</strong>: 将 JWT 保存在 JavaScript 变量中</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TokenManager</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.token </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.refreshToken </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">  setTokens</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">accessToken</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">refreshToken</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.token </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> accessToken;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.refreshToken </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> refreshToken;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">  getToken</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.token;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">  clearTokens</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.token </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.refreshToken </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 页面刷新时尝试从 sessionStorage 恢复（可选）</span></span>
<span class="line"><span class="__shiki_1t8gfj">  restoreFromSession</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (sessionStorage.</span><span class="__shiki_1t8gfj">getItem</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;jwt_backup&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.token </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sessionStorage.</span><span class="__shiki_1t8gfj">getItem</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;jwt_backup&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      sessionStorage.</span><span class="__shiki_1t8gfj">removeItem</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;jwt_backup&#39;</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 立即删除备份</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 页面卸载前备份到 sessionStorage（可选）</span></span>
<span class="line"><span class="__shiki_1t8gfj">  backupToSession</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.token) {</span></span>
<span class="line"><span class="__shiki_140thh">      sessionStorage.</span><span class="__shiki_1t8gfj">setItem</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;jwt_backup&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.token);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用示例</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> tokenManager</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> TokenManager</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 页面加载时恢复令牌</span></span>
<span class="line"><span class="__shiki_140thh">window.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;load&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  tokenManager.</span><span class="__shiki_1t8gfj">restoreFromSession</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 页面卸载前备份令牌</span></span>
<span class="line"><span class="__shiki_140thh">window.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;beforeunload&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  tokenManager.</span><span class="__shiki_1t8gfj">backupToSession</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h5 id="_2-2-2-httponly-cookie-推荐" tabindex="-1">2.2.2 HttpOnly Cookie (推荐) <a class="header-anchor" href="#_2-2-2-httponly-cookie-推荐" aria-label="Permalink to &quot;2.2.2 HttpOnly Cookie (推荐)&quot;">​</a></h5><p><strong>安全特性</strong>:</p><ul><li>无法通过 JavaScript 访问</li><li>自动随请求发送</li><li>支持 Secure、SameSite 属性</li></ul><p><strong>服务器设置 Cookie</strong>:</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Node.js Express 示例</span></span>
<span class="line"><span class="__shiki_140thh">app.</span><span class="__shiki_1t8gfj">post</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/login&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 验证用户凭证</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> user</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> authenticate</span><span class="__shiki_140thh">(req.body.username, req.body.password);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 生成 JWT</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> token</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> jwt.</span><span class="__shiki_1t8gfj">sign</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    { userId: user.id, username: user.username },</span></span>
<span class="line"><span class="__shiki_140thh">    process.env.</span><span class="__shiki_dzsirb">JWT_SECRET</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    { expiresIn: </span><span class="__shiki_mdbnqw">&#39;15m&#39;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 设置 HttpOnly Cookie</span></span>
<span class="line"><span class="__shiki_140thh">  res.</span><span class="__shiki_1t8gfj">cookie</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;jwt&#39;</span><span class="__shiki_140thh">, token, {</span></span>
<span class="line"><span class="__shiki_140thh">    httpOnly: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,      </span><span class="__shiki_21nrsd">// 防止 XSS</span></span>
<span class="line"><span class="__shiki_140thh">    secure: process.env.</span><span class="__shiki_dzsirb">NODE_ENV</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_mdbnqw"> &#39;production&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// HTTPS only</span></span>
<span class="line"><span class="__shiki_140thh">    sameSite: </span><span class="__shiki_mdbnqw">&#39;strict&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 防止 CSRF</span></span>
<span class="line"><span class="__shiki_140thh">    maxAge: </span><span class="__shiki_dzsirb">15</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 15分钟</span></span>
<span class="line"><span class="__shiki_140thh">    domain: </span><span class="__shiki_mdbnqw">&#39;.example.com&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  res.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({ success: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, user: { id: user.id, name: user.name } });</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><p><strong>客户端使用</strong>:</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 令牌自动随请求发送，无需手动处理</span></span>
<span class="line"><span class="__shiki_1t8gfj">fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/api/protected&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">  method: </span><span class="__shiki_mdbnqw">&#39;GET&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  credentials: </span><span class="__shiki_mdbnqw">&#39;include&#39;</span><span class="__shiki_21nrsd"> // 包含 cookies</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span>
<span class="line"><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">response</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> response.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">data</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(data));</span></span></code></pre></div><h5 id="_2-2-3-混合方案-access-token-refresh-token" tabindex="-1">2.2.3 混合方案 (Access Token + Refresh Token) <a class="header-anchor" href="#_2-2-3-混合方案-access-token-refresh-token" aria-label="Permalink to &quot;2.2.3 混合方案 (Access Token + Refresh Token)&quot;">​</a></h5><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 认证服务</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> AuthService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.accessToken </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.refreshToken </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> login</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">credentials</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/api/login&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">      method: </span><span class="__shiki_mdbnqw">&#39;POST&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      headers: { </span><span class="__shiki_mdbnqw">&#39;Content-Type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;application/json&#39;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">      body: </span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">(credentials)</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> data</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> response.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (data.success) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // Access Token 存储在内存中</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.accessToken </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> data.accessToken;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // Refresh Token 存储在 HttpOnly Cookie 中</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 由服务器设置</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> refreshAccessToken</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/api/refresh&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">        method: </span><span class="__shiki_mdbnqw">&#39;POST&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        credentials: </span><span class="__shiki_mdbnqw">&#39;include&#39;</span><span class="__shiki_21nrsd"> // 自动发送 refresh token cookie</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> data</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> response.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (data.success) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.accessToken </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> data.accessToken;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">logout</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">  getAccessToken</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.accessToken;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">  logout</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.accessToken </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 调用服务器清除 refresh token cookie</span></span>
<span class="line"><span class="__shiki_1t8gfj">    fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/api/logout&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">      method: </span><span class="__shiki_mdbnqw">&#39;POST&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      credentials: </span><span class="__shiki_mdbnqw">&#39;include&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="三、移动端存储方案" tabindex="-1">三、移动端存储方案 <a class="header-anchor" href="#三、移动端存储方案" aria-label="Permalink to &quot;三、移动端存储方案&quot;">​</a></h2><h4 id="_1-ios-安全存储" tabindex="-1">1. iOS 安全存储 <a class="header-anchor" href="#_1-ios-安全存储" aria-label="Permalink to &quot;1. iOS 安全存储&quot;">​</a></h4><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_1t8gfj"> Security</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_1t8gfj"> Foundation</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> KeychainService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    static</span><span class="__shiki_1itgoe"> let</span><span class="__shiki_140thh"> serviceName </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;com.yourapp.jwt&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 保存 JWT 到 Keychain</span></span>
<span class="line"><span class="__shiki_1itgoe">    static</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_1t8gfj"> saveJWT</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">token</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">forAccount</span><span class="__shiki_140thh"> account: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_dzsirb"> Bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        guard</span><span class="__shiki_1itgoe"> let</span><span class="__shiki_140thh"> tokenData </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> token.</span><span class="__shiki_dzsirb">data</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">using</span><span class="__shiki_140thh">: .</span><span class="__shiki_dzsirb">utf8</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> { </span><span class="__shiki_1itgoe">return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        let</span><span class="__shiki_140thh"> query: [</span><span class="__shiki_dzsirb">String</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Any</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">            kSecClass </span><span class="__shiki_1itgoe">as</span><span class="__shiki_dzsirb"> String</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> kSecClassGenericPassword,</span></span>
<span class="line"><span class="__shiki_140thh">            kSecAttrService </span><span class="__shiki_1itgoe">as</span><span class="__shiki_dzsirb"> String</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> serviceName,</span></span>
<span class="line"><span class="__shiki_140thh">            kSecAttrAccount </span><span class="__shiki_1itgoe">as</span><span class="__shiki_dzsirb"> String</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> account,</span></span>
<span class="line"><span class="__shiki_140thh">            kSecValueData </span><span class="__shiki_1itgoe">as</span><span class="__shiki_dzsirb"> String</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> tokenData,</span></span>
<span class="line"><span class="__shiki_140thh">            kSecAttrAccessible </span><span class="__shiki_1itgoe">as</span><span class="__shiki_dzsirb"> String</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> kSecAttrAccessibleWhenUnlockedThisDeviceOnly</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        SecItemDelete</span><span class="__shiki_140thh">(query </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> CFDictionary) </span><span class="__shiki_21nrsd">// 删除现有项目</span></span>
<span class="line"><span class="__shiki_1itgoe">        let</span><span class="__shiki_140thh"> status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> SecItemAdd</span><span class="__shiki_140thh">(query </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> CFDictionary, </span><span class="__shiki_dzsirb">nil</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> errSecSuccess</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 从 Keychain 读取 JWT</span></span>
<span class="line"><span class="__shiki_1itgoe">    static</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_1t8gfj"> loadJWT</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">forAccount</span><span class="__shiki_140thh"> account: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_dzsirb"> String</span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        let</span><span class="__shiki_140thh"> query: [</span><span class="__shiki_dzsirb">String</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Any</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">            kSecClass </span><span class="__shiki_1itgoe">as</span><span class="__shiki_dzsirb"> String</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> kSecClassGenericPassword,</span></span>
<span class="line"><span class="__shiki_140thh">            kSecAttrService </span><span class="__shiki_1itgoe">as</span><span class="__shiki_dzsirb"> String</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> serviceName,</span></span>
<span class="line"><span class="__shiki_140thh">            kSecAttrAccount </span><span class="__shiki_1itgoe">as</span><span class="__shiki_dzsirb"> String</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> account,</span></span>
<span class="line"><span class="__shiki_140thh">            kSecReturnData </span><span class="__shiki_1itgoe">as</span><span class="__shiki_dzsirb"> String</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            kSecMatchLimit </span><span class="__shiki_1itgoe">as</span><span class="__shiki_dzsirb"> String</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> kSecMatchLimitOne</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        var</span><span class="__shiki_140thh"> item: CFTypeRef</span><span class="__shiki_1itgoe">?</span></span>
<span class="line"><span class="__shiki_1itgoe">        let</span><span class="__shiki_140thh"> status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> SecItemCopyMatching</span><span class="__shiki_140thh">(query </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> CFDictionary, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">item)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        guard</span><span class="__shiki_140thh"> status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> errSecSuccess,</span></span>
<span class="line"><span class="__shiki_1itgoe">              let</span><span class="__shiki_140thh"> tokenData </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> item </span><span class="__shiki_1itgoe">as?</span><span class="__shiki_140thh"> Data,</span></span>
<span class="line"><span class="__shiki_1itgoe">              let</span><span class="__shiki_140thh"> token </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> String</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">data</span><span class="__shiki_140thh">: tokenData, </span><span class="__shiki_dzsirb">encoding</span><span class="__shiki_140thh">: .</span><span class="__shiki_dzsirb">utf8</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> token</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 从 Keychain 删除 JWT</span></span>
<span class="line"><span class="__shiki_1itgoe">    static</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_1t8gfj"> deleteJWT</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">forAccount</span><span class="__shiki_140thh"> account: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_dzsirb"> Bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        let</span><span class="__shiki_140thh"> query: [</span><span class="__shiki_dzsirb">String</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Any</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">            kSecClass </span><span class="__shiki_1itgoe">as</span><span class="__shiki_dzsirb"> String</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> kSecClassGenericPassword,</span></span>
<span class="line"><span class="__shiki_140thh">            kSecAttrService </span><span class="__shiki_1itgoe">as</span><span class="__shiki_dzsirb"> String</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> serviceName,</span></span>
<span class="line"><span class="__shiki_140thh">            kSecAttrAccount </span><span class="__shiki_1itgoe">as</span><span class="__shiki_dzsirb"> String</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> account</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        let</span><span class="__shiki_140thh"> status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> SecItemDelete</span><span class="__shiki_140thh">(query </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> CFDictionary)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> errSecSuccess</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-android-安全存储" tabindex="-1">2. Android 安全存储 <a class="header-anchor" href="#_2-android-安全存储" aria-label="Permalink to &quot;2. Android 安全存储&quot;">​</a></h4><div class="language-kotlin vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_1t8gfj"> android.content.Context</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_1t8gfj"> android.security.keystore.KeyGenParameterSpec</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_1t8gfj"> android.security.keystore.KeyProperties</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_1t8gfj"> android.util.Base64</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_1t8gfj"> java.security.KeyStore</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_1t8gfj"> javax.crypto.Cipher</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_1t8gfj"> javax.crypto.KeyGenerator</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_1t8gfj"> javax.crypto.SecretKey</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_1t8gfj"> javax.crypto.spec.GCMParameterSpec</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> SecureTokenStorage</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">private</span><span class="__shiki_1itgoe"> val</span><span class="__shiki_140thh"> context: </span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> val</span><span class="__shiki_140thh"> keyStore </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> KeyStore.</span><span class="__shiki_1t8gfj">getInstance</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;AndroidKeyStore&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">apply</span><span class="__shiki_140thh"> { </span><span class="__shiki_1t8gfj">load</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">) }</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> val</span><span class="__shiki_140thh"> keyAlias </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;jwt_encryption_key&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> fun</span><span class="__shiki_1t8gfj"> getOrCreateKey</span><span class="__shiki_140thh">(): </span><span class="__shiki_1t8gfj">SecretKey</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">keyStore.</span><span class="__shiki_1t8gfj">containsAlias</span><span class="__shiki_140thh">(keyAlias)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            val</span><span class="__shiki_140thh"> keyGenerator </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> KeyGenerator.</span><span class="__shiki_1t8gfj">getInstance</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                KeyProperties.KEY_ALGORITHM_AES, </span><span class="__shiki_mdbnqw">&quot;AndroidKeyStore&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            val</span><span class="__shiki_140thh"> keyGenSpec </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> KeyGenParameterSpec.</span><span class="__shiki_1t8gfj">Builder</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                keyAlias,</span></span>
<span class="line"><span class="__shiki_140thh">                KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT</span></span>
<span class="line"><span class="__shiki_140thh">            ).</span><span class="__shiki_1t8gfj">apply</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">                setBlockModes</span><span class="__shiki_140thh">(KeyProperties.BLOCK_MODE_GCM)</span></span>
<span class="line"><span class="__shiki_1t8gfj">                setEncryptionPaddings</span><span class="__shiki_140thh">(KeyProperties.ENCRYPTION_PADDING_NONE)</span></span>
<span class="line"><span class="__shiki_1t8gfj">                setUserAuthenticationRequired</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">                setKeySize</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">256</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            }.</span><span class="__shiki_1t8gfj">build</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            keyGenerator.</span><span class="__shiki_1t8gfj">init</span><span class="__shiki_140thh">(keyGenSpec)</span></span>
<span class="line"><span class="__shiki_140thh">            keyGenerator.</span><span class="__shiki_1t8gfj">generateKey</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> keyStore.</span><span class="__shiki_1t8gfj">getKey</span><span class="__shiki_140thh">(keyAlias, </span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> SecretKey</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    fun</span><span class="__shiki_1t8gfj"> saveJWT</span><span class="__shiki_140thh">(token: </span><span class="__shiki_1t8gfj">String</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        val</span><span class="__shiki_140thh"> cipher </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Cipher.</span><span class="__shiki_1t8gfj">getInstance</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;AES/GCM/NoPadding&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        cipher.</span><span class="__shiki_1t8gfj">init</span><span class="__shiki_140thh">(Cipher.ENCRYPT_MODE, </span><span class="__shiki_1t8gfj">getOrCreateKey</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        val</span><span class="__shiki_140thh"> iv </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cipher.iv</span></span>
<span class="line"><span class="__shiki_1itgoe">        val</span><span class="__shiki_140thh"> encrypted </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cipher.</span><span class="__shiki_1t8gfj">doFinal</span><span class="__shiki_140thh">(token.</span><span class="__shiki_1t8gfj">toByteArray</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        val</span><span class="__shiki_140thh"> pref </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> context.</span><span class="__shiki_1t8gfj">getSharedPreferences</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;secure_prefs&quot;</span><span class="__shiki_140thh">, Context.MODE_PRIVATE)</span></span>
<span class="line"><span class="__shiki_140thh">        pref.</span><span class="__shiki_1t8gfj">edit</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">apply</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            putString</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;jwt_iv&quot;</span><span class="__shiki_140thh">, Base64.</span><span class="__shiki_1t8gfj">encodeToString</span><span class="__shiki_140thh">(iv, Base64.DEFAULT))</span></span>
<span class="line"><span class="__shiki_1t8gfj">            putString</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;jwt_data&quot;</span><span class="__shiki_140thh">, Base64.</span><span class="__shiki_1t8gfj">encodeToString</span><span class="__shiki_140thh">(encrypted, Base64.DEFAULT))</span></span>
<span class="line"><span class="__shiki_140thh">        }.</span><span class="__shiki_1t8gfj">apply</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    fun</span><span class="__shiki_1t8gfj"> getJWT</span><span class="__shiki_140thh">(): </span><span class="__shiki_1t8gfj">String</span><span class="__shiki_140thh">? {</span></span>
<span class="line"><span class="__shiki_1itgoe">        val</span><span class="__shiki_140thh"> pref </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> context.</span><span class="__shiki_1t8gfj">getSharedPreferences</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;secure_prefs&quot;</span><span class="__shiki_140thh">, Context.MODE_PRIVATE)</span></span>
<span class="line"><span class="__shiki_1itgoe">        val</span><span class="__shiki_140thh"> ivString </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pref.</span><span class="__shiki_1t8gfj">getString</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;jwt_iv&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">) ?: </span><span class="__shiki_1itgoe">return</span><span class="__shiki_dzsirb"> null</span></span>
<span class="line"><span class="__shiki_1itgoe">        val</span><span class="__shiki_140thh"> dataString </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pref.</span><span class="__shiki_1t8gfj">getString</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;jwt_data&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">) ?: </span><span class="__shiki_1itgoe">return</span><span class="__shiki_dzsirb"> null</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            val</span><span class="__shiki_140thh"> cipher </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Cipher.</span><span class="__shiki_1t8gfj">getInstance</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;AES/GCM/NoPadding&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            val</span><span class="__shiki_140thh"> iv </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Base64.</span><span class="__shiki_1t8gfj">decode</span><span class="__shiki_140thh">(ivString, Base64.DEFAULT)</span></span>
<span class="line"><span class="__shiki_1itgoe">            val</span><span class="__shiki_140thh"> encrypted </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Base64.</span><span class="__shiki_1t8gfj">decode</span><span class="__shiki_140thh">(dataString, Base64.DEFAULT)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            val</span><span class="__shiki_140thh"> spec </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> GCMParameterSpec</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">128</span><span class="__shiki_140thh">, iv)</span></span>
<span class="line"><span class="__shiki_140thh">            cipher.</span><span class="__shiki_1t8gfj">init</span><span class="__shiki_140thh">(Cipher.DECRYPT_MODE, </span><span class="__shiki_1t8gfj">getOrCreateKey</span><span class="__shiki_140thh">(), spec)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1t8gfj">            String</span><span class="__shiki_140thh">(cipher.</span><span class="__shiki_1t8gfj">doFinal</span><span class="__shiki_140thh">(encrypted))</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (e: </span><span class="__shiki_1t8gfj">Exception</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">            null</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    fun</span><span class="__shiki_1t8gfj"> clearJWT</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        val</span><span class="__shiki_140thh"> pref </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> context.</span><span class="__shiki_1t8gfj">getSharedPreferences</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;secure_prefs&quot;</span><span class="__shiki_140thh">, Context.MODE_PRIVATE)</span></span>
<span class="line"><span class="__shiki_140thh">        pref.</span><span class="__shiki_1t8gfj">edit</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">remove</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;jwt_iv&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">remove</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;jwt_data&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">apply</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="四、高级安全策略" tabindex="-1">四、高级安全策略 <a class="header-anchor" href="#四、高级安全策略" aria-label="Permalink to &quot;四、高级安全策略&quot;">​</a></h2><h4 id="_1-令牌绑定-token-binding" tabindex="-1">1. 令牌绑定 (Token Binding) <a class="header-anchor" href="#_1-令牌绑定-token-binding" aria-label="Permalink to &quot;1. 令牌绑定 (Token Binding)&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 生成客户端指纹</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> generateClientFingerprint</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> components</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">    navigator.userAgent,</span></span>
<span class="line"><span class="__shiki_140thh">    navigator.language,</span></span>
<span class="line"><span class="__shiki_140thh">    screen.colorDepth,</span></span>
<span class="line"><span class="__shiki_140thh">    screen.width </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &#39;x&#39;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> screen.height,</span></span>
<span class="line"><span class="__shiki_1itgoe">    new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">getTimezoneOffset</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">  ].</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;|&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_1t8gfj"> btoa</span><span class="__shiki_140thh">(components).</span><span class="__shiki_1t8gfj">substring</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">32</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 在 JWT 中包含客户端指纹</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> createTokenWithBinding</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">username</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> clientFingerprint</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> generateClientFingerprint</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> payload</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    userId,</span></span>
<span class="line"><span class="__shiki_140thh">    username,</span></span>
<span class="line"><span class="__shiki_140thh">    cnf: { </span><span class="__shiki_21nrsd">// confirmation claim (RFC 7800)</span></span>
<span class="line"><span class="__shiki_140thh">      jkt: clientFingerprint </span><span class="__shiki_21nrsd">// JWK Thumbprint</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    iat: Math.</span><span class="__shiki_1t8gfj">floor</span><span class="__shiki_140thh">(Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    exp: Math.</span><span class="__shiki_1t8gfj">floor</span><span class="__shiki_140thh">(Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">15</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_140thh">) </span><span class="__shiki_21nrsd">// 15分钟</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> jwt.</span><span class="__shiki_1t8gfj">sign</span><span class="__shiki_140thh">(payload, process.env.</span><span class="__shiki_dzsirb">JWT_SECRET</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 验证令牌绑定</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> verifyTokenBinding</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">token</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">expectedFingerprint</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> decoded</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> jwt.</span><span class="__shiki_1t8gfj">verify</span><span class="__shiki_140thh">(token, process.env.</span><span class="__shiki_dzsirb">JWT_SECRET</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (decoded.cnf </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> decoded.cnf.jkt </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_140thh"> expectedFingerprint) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Token binding mismatch&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> decoded;</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Token verification failed&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-动态令牌轮换" tabindex="-1">2. 动态令牌轮换 <a class="header-anchor" href="#_2-动态令牌轮换" aria-label="Permalink to &quot;2. 动态令牌轮换&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> AdvancedTokenManager</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.token </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.tokenId </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.lastUsed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> requestToken</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">userCredentials</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/api/token&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">      method: </span><span class="__shiki_mdbnqw">&#39;POST&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      headers: { </span><span class="__shiki_mdbnqw">&#39;Content-Type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;application/json&#39;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">      body: </span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_1itgoe">        ...</span><span class="__shiki_140thh">userCredentials,</span></span>
<span class="line"><span class="__shiki_140thh">        deviceInfo: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getDeviceInfo</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">      })</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> data</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> response.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (data.success) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.token </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> data.token;</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.tokenId </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> data.tokenId;</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.lastUsed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 启动自动刷新</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">startTokenRefresh</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  startTokenRefresh</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 在令牌过期前 5 分钟刷新</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> refreshTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">15</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 10分钟后</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.refreshTimer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">refreshToken</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }, refreshTime);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> refreshToken</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/api/token/refresh&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">        method: </span><span class="__shiki_mdbnqw">&#39;POST&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        headers: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &#39;Authorization&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\`Bearer \${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">token</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &#39;Content-Type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;application/json&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        body: </span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">({ tokenId: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.tokenId })</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> data</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> response.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (data.success) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 使旧令牌失效</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">revokeToken</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.tokenId);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.token </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> data.token;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.tokenId </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> data.tokenId;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.lastUsed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">startTokenRefresh</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Token refresh failed:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> revokeToken</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">tokenId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/api/token/revoke&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">      method: </span><span class="__shiki_mdbnqw">&#39;POST&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      headers: { </span><span class="__shiki_mdbnqw">&#39;Content-Type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;application/json&#39;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">      body: </span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">({ tokenId })</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  getDeviceInfo</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      userAgent: navigator.userAgent,</span></span>
<span class="line"><span class="__shiki_140thh">      platform: navigator.platform,</span></span>
<span class="line"><span class="__shiki_140thh">      language: navigator.language,</span></span>
<span class="line"><span class="__shiki_140thh">      timezone: Intl.</span><span class="__shiki_1t8gfj">DateTimeFormat</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">resolvedOptions</span><span class="__shiki_140thh">().timeZone</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="五、安全最佳实践" tabindex="-1">五、安全最佳实践 <a class="header-anchor" href="#五、安全最佳实践" aria-label="Permalink to &quot;五、安全最佳实践&quot;">​</a></h2><h4 id="_1-存储安全清单" tabindex="-1">1. 存储安全清单 <a class="header-anchor" href="#_1-存储安全清单" aria-label="Permalink to &quot;1. 存储安全清单&quot;">​</a></h4><ul><li>✅ <strong>使用 HttpOnly Cookies</strong> 用于 refresh tokens</li><li>✅ <strong>内存存储</strong> access tokens</li><li>✅ <strong>设置合理的过期时间</strong> (access: 15-30分钟, refresh: 7天)</li><li>✅ <strong>实现令牌轮换机制</strong></li><li>✅ <strong>使用 HTTPS 加密传输</strong></li><li>✅ <strong>实施 SameSite Cookie 策略</strong></li><li>✅ <strong>添加客户端指纹验证</strong></li><li>✅ <strong>实现令牌撤销机制</strong></li></ul><h4 id="_2-防御特定攻击" tabindex="-1">2. 防御特定攻击 <a class="header-anchor" href="#_2-防御特定攻击" aria-label="Permalink to &quot;2. 防御特定攻击&quot;">​</a></h4><h5 id="防御-xss" tabindex="-1">防御 XSS: <a class="header-anchor" href="#防御-xss" aria-label="Permalink to &quot;防御 XSS:&quot;">​</a></h5><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 设置安全的 Cookie 属性</span></span>
<span class="line"><span class="__shiki_140thh">res.</span><span class="__shiki_1t8gfj">cookie</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;refreshToken&#39;</span><span class="__shiki_140thh">, refreshToken, {</span></span>
<span class="line"><span class="__shiki_140thh">  httpOnly: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  secure: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  sameSite: </span><span class="__shiki_mdbnqw">&#39;strict&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  maxAge: </span><span class="__shiki_dzsirb">7</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 24</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_21nrsd"> // 7天</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// CSP 头部</span></span>
<span class="line"><span class="__shiki_140thh">app.</span><span class="__shiki_1t8gfj">use</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">next</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  res.</span><span class="__shiki_1t8gfj">setHeader</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;Content-Security-Policy&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;default-src &#39;self&#39;; script-src &#39;self&#39; &#39;unsafe-inline&#39;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_1t8gfj">  next</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h5 id="防御-csrf" tabindex="-1">防御 CSRF: <a class="header-anchor" href="#防御-csrf" aria-label="Permalink to &quot;防御 CSRF:&quot;">​</a></h5><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 双重提交 Cookie 模式</span></span>
<span class="line"><span class="__shiki_140thh">app.</span><span class="__shiki_1t8gfj">post</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/api/protected&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> tokenFromHeader</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> req.headers[</span><span class="__shiki_mdbnqw">&#39;x-csrf-token&#39;</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> tokenFromCookie</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> req.cookies[</span><span class="__shiki_mdbnqw">&#39;csrf-token&#39;</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">tokenFromHeader </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> tokenFromHeader </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_140thh"> tokenFromCookie) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">403</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({ error: </span><span class="__shiki_mdbnqw">&#39;CSRF token validation failed&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 处理请求...</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h2 id="六、监控和响应" tabindex="-1">六、监控和响应 <a class="header-anchor" href="#六、监控和响应" aria-label="Permalink to &quot;六、监控和响应&quot;">​</a></h2><h4 id="异常检测" tabindex="-1">异常检测 <a class="header-anchor" href="#异常检测" aria-label="Permalink to &quot;异常检测&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> SecurityMonitor</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.failedAttempts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.suspiciousActivities </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  logTokenUsage</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">tokenId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">requestInfo</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> usage</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      tokenId,</span></span>
<span class="line"><span class="__shiki_140thh">      timestamp: Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">      ip: requestInfo.ip,</span></span>
<span class="line"><span class="__shiki_140thh">      userAgent: requestInfo.userAgent,</span></span>
<span class="line"><span class="__shiki_140thh">      endpoint: requestInfo.endpoint</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检测异常模式</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">detectAnomalies</span><span class="__shiki_140thh">(usage);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  detectAnomalies</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">usage</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> key</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> \`\${</span><span class="__shiki_140thh">usage</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">ip</span><span class="__shiki_mdbnqw">}-\${</span><span class="__shiki_140thh">usage</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">tokenId</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> attempts</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.failedAttempts.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(key) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 快速连续请求</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (attempts </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">flagSuspiciousActivity</span><span class="__shiki_140thh">(usage, </span><span class="__shiki_mdbnqw">&#39;Rapid fire requests&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">revokeToken</span><span class="__shiki_140thh">(usage.tokenId);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // User-Agent 变化</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> previousUA</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getPreviousUserAgent</span><span class="__shiki_140thh">(usage.tokenId);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (previousUA </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> previousUA </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_140thh"> usage.userAgent) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">flagSuspiciousActivity</span><span class="__shiki_140thh">(usage, </span><span class="__shiki_mdbnqw">&#39;User-Agent changed&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> revokeToken</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">tokenId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 立即撤销令牌</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/api/admin/revoke-token&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">      method: </span><span class="__shiki_mdbnqw">&#39;POST&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      headers: { </span><span class="__shiki_mdbnqw">&#39;Content-Type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;application/json&#39;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">      body: </span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">({ tokenId, reason: </span><span class="__shiki_mdbnqw">&#39;suspicious_activity&#39;</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="七、实际部署架构" tabindex="-1">七、实际部署架构 <a class="header-anchor" href="#七、实际部署架构" aria-label="Permalink to &quot;七、实际部署架构&quot;">​</a></h2><h4 id="微服务环境中的-jwt-存储" tabindex="-1">微服务环境中的 JWT 存储 <a class="header-anchor" href="#微服务环境中的-jwt-存储" aria-label="Permalink to &quot;微服务环境中的 JWT 存储&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// API Gateway 处理认证</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ApiGateway</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.tokenBlacklist </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Set</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> authenticateRequest</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 从 HttpOnly Cookie 获取 refresh token</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> refreshToken</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> req.cookies.refreshToken;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 从 Authorization header 获取 access token</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> accessToken</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> req.headers.authorization?.</span><span class="__shiki_1t8gfj">replace</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Bearer &#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">accessToken) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;No access token provided&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查令牌是否在黑名单中</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.tokenBlacklist.</span><span class="__shiki_1t8gfj">has</span><span class="__shiki_140thh">(accessToken)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Token revoked&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 验证 access token</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> jwt.</span><span class="__shiki_1t8gfj">verify</span><span class="__shiki_140thh">(accessToken, process.env.</span><span class="__shiki_dzsirb">JWT_SECRET</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (error.name </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;TokenExpiredError&#39;</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> refreshToken) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 自动刷新令牌</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">refreshTokens</span><span class="__shiki_140thh">(refreshToken, req);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> refreshTokens</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">refreshToken</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证 refresh token</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> refreshPayload</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> jwt.</span><span class="__shiki_1t8gfj">verify</span><span class="__shiki_140thh">(refreshToken, process.env.</span><span class="__shiki_dzsirb">REFRESH_SECRET</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 生成新的 access token</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> newAccessToken</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> jwt.</span><span class="__shiki_1t8gfj">sign</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      { userId: refreshPayload.userId },</span></span>
<span class="line"><span class="__shiki_140thh">      process.env.</span><span class="__shiki_dzsirb">JWT_SECRET</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      { expiresIn: </span><span class="__shiki_mdbnqw">&#39;15m&#39;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 将旧 access token 加入黑名单</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> oldAccessToken</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> req.headers.authorization?.</span><span class="__shiki_1t8gfj">replace</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Bearer &#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (oldAccessToken) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.tokenBlacklist.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(oldAccessToken);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      userId: refreshPayload.userId,</span></span>
<span class="line"><span class="__shiki_140thh">      newAccessToken</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="八、总结" tabindex="-1">八、总结 <a class="header-anchor" href="#八、总结" aria-label="Permalink to &quot;八、总结&quot;">​</a></h2><p>JWT 安全存储是一个多层次的安全策略，需要结合客户端存储方案、传输安全和服务器端验证。关键要点包括：</p><ol><li><strong>优先使用 HttpOnly Cookies</strong> 存储 refresh tokens</li><li><strong>内存存储 access tokens</strong> 减少持久化风险</li><li><strong>实施令牌绑定</strong> 防止令牌盗用</li><li><strong>设置合理的过期时间</strong> 和自动刷新机制</li><li><strong>监控异常行为</strong> 并快速响应安全事件</li><li><strong>使用 HTTPS</strong> 和安全头部保护传输过程</li></ol>`,49)])])}const d=a(p,[["render",h]]);export{r as __pageData,d as default};
