import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"JWT 令牌生命周期","description":"","frontmatter":{},"headers":[],"relativePath":"backend/auth/jwt/lifecycle.md","filePath":"backend/auth/jwt/lifecycle.md"}'),p={name:"backend/auth/jwt/lifecycle.md"};function h(l,s,c,t,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="jwt-令牌生命周期" tabindex="-1">JWT 令牌生命周期 <a class="header-anchor" href="#jwt-令牌生命周期" aria-label="Permalink to &quot;JWT 令牌生命周期&quot;">​</a></h1><h2 id="一、认证与授权基础概念" tabindex="-1">一、认证与授权基础概念 <a class="header-anchor" href="#一、认证与授权基础概念" aria-label="Permalink to &quot;一、认证与授权基础概念&quot;">​</a></h2><h4 id="_1-认证-authentication" tabindex="-1">1. 认证 (Authentication) <a class="header-anchor" href="#_1-认证-authentication" aria-label="Permalink to &quot;1. 认证 (Authentication)&quot;">​</a></h4><ul><li><strong>定义</strong>: 验证用户身份的过程</li><li><strong>目的</strong>: 确认&quot;你是谁&quot;</li><li><strong>常见方式</strong>: <ul><li>用户名/密码</li><li>生物识别</li><li>多因素认证</li><li>单点登录(SSO)</li></ul></li></ul><h4 id="_2-授权-authorization" tabindex="-1">2. 授权 (Authorization) <a class="header-anchor" href="#_2-授权-authorization" aria-label="Permalink to &quot;2. 授权 (Authorization)&quot;">​</a></h4><ul><li><strong>定义</strong>: 确定用户有权访问哪些资源</li><li><strong>目的</strong>: 决定&quot;你能做什么&quot;</li><li><strong>常见方式</strong>: <ul><li>基于角色的访问控制(RBAC)</li><li>基于属性的访问控制(ABAC)</li><li>OAuth 2.0 授权框架</li></ul></li></ul><h2 id="二、jwt-json-web-token-详解" tabindex="-1">二、JWT (JSON Web Token) 详解 <a class="header-anchor" href="#二、jwt-json-web-token-详解" aria-label="Permalink to &quot;二、JWT (JSON Web Token) 详解&quot;">​</a></h2><h4 id="_1-jwt-概述" tabindex="-1">1. JWT 概述 <a class="header-anchor" href="#_1-jwt-概述" aria-label="Permalink to &quot;1. JWT 概述&quot;">​</a></h4><ul><li><strong>定义</strong>: 一种开放标准(RFC 7519)，用于安全地在各方之间传输信息</li><li><strong>特点</strong>: <ul><li>紧凑且自包含</li><li>可数字签名(JWS)或加密(JWE)</li><li>易于在Web环境中传输</li></ul></li></ul><h4 id="_2-jwt-结构" tabindex="-1">2. JWT 结构 <a class="header-anchor" href="#_2-jwt-结构" aria-label="Permalink to &quot;2. JWT 结构&quot;">​</a></h4><p>JWT由三部分组成，用点(.)分隔：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">Header.Payload.Signature</span></span></code></pre></div><h5 id="_2-2-1-header-头部" tabindex="-1">2.2.1 Header (头部) <a class="header-anchor" href="#_2-2-1-header-头部" aria-label="Permalink to &quot;2.2.1 Header (头部)&quot;">​</a></h5><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;alg&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;HS256&quot;</span><span class="__shiki_140thh">,     </span><span class="__shiki_21nrsd">// 签名算法</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;typ&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;JWT&quot;</span><span class="__shiki_21nrsd">        // 令牌类型</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h5 id="_2-2-2-payload-载荷-声明" tabindex="-1">2.2.2 Payload (载荷/声明) <a class="header-anchor" href="#_2-2-2-payload-载荷-声明" aria-label="Permalink to &quot;2.2.2 Payload (载荷/声明)&quot;">​</a></h5><p>包含三类声明：</p><p><strong>标准注册声明</strong>:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;iss&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;issuer&quot;</span><span class="__shiki_140thh">,          </span><span class="__shiki_21nrsd">// 签发者</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;sub&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;subject&quot;</span><span class="__shiki_140thh">,         </span><span class="__shiki_21nrsd">// 主题</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;aud&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;audience&quot;</span><span class="__shiki_140thh">,        </span><span class="__shiki_21nrsd">// 接收方</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;exp&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1300819380</span><span class="__shiki_140thh">,        </span><span class="__shiki_21nrsd">// 过期时间</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;nbf&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1300819080</span><span class="__shiki_140thh">,        </span><span class="__shiki_21nrsd">// 生效时间</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;iat&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1300818780</span><span class="__shiki_140thh">,        </span><span class="__shiki_21nrsd">// 签发时间</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;jti&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;unique-id&quot;</span><span class="__shiki_21nrsd">        // JWT ID</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>公共声明</strong>:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;name&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;John Doe&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;admin&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>私有声明</strong>:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;user_id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;12345&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;roles&quot;</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;user&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;admin&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h5 id="_2-2-3-signature-签名" tabindex="-1">2.2.3 Signature (签名) <a class="header-anchor" href="#_2-2-3-signature-签名" aria-label="Permalink to &quot;2.2.3 Signature (签名)&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">HMACSHA256(</span></span>
<span class="line"><span class="__shiki_wvjl67">  base64UrlEncode(header) + &quot;.&quot; +</span></span>
<span class="line"><span class="__shiki_wvjl67">  base64UrlEncode(payload),</span></span>
<span class="line"><span class="__shiki_wvjl67">  secret</span></span>
<span class="line"><span class="__shiki_wvjl67">)</span></span></code></pre></div><h4 id="_3-jwt-工作流程" tabindex="-1">3. JWT 工作流程 <a class="header-anchor" href="#_3-jwt-工作流程" aria-label="Permalink to &quot;3. JWT 工作流程&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">1. 用户登录 → 服务器验证凭证</span></span>
<span class="line"><span class="__shiki_wvjl67">2. 服务器生成JWT → 返回给客户端</span></span>
<span class="line"><span class="__shiki_wvjl67">3. 客户端存储JWT → 后续请求携带在Authorization头</span></span>
<span class="line"><span class="__shiki_wvjl67">4. 服务器验证JWT → 返回受保护资源</span></span></code></pre></div><h2 id="三、jwt-令牌生命周期管理" tabindex="-1">三、JWT 令牌生命周期管理 <a class="header-anchor" href="#三、jwt-令牌生命周期管理" aria-label="Permalink to &quot;三、JWT 令牌生命周期管理&quot;">​</a></h2><h4 id="_1-令牌创建阶段" tabindex="-1">1. 令牌创建阶段 <a class="header-anchor" href="#_1-令牌创建阶段" aria-label="Permalink to &quot;1. 令牌创建阶段&quot;">​</a></h4><h5 id="_3-1-1-登录认证" tabindex="-1">3.1.1 登录认证 <a class="header-anchor" href="#_3-1-1-登录认证" aria-label="Permalink to &quot;3.1.1 登录认证&quot;">​</a></h5><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 示例：用户登录后生成JWT</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> jwt</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;jsonwebtoken&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> generateToken</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">user</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> payload</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    userId: user.id,</span></span>
<span class="line"><span class="__shiki_140thh">    username: user.username,</span></span>
<span class="line"><span class="__shiki_140thh">    roles: user.roles,</span></span>
<span class="line"><span class="__shiki_140thh">    iat: Math.</span><span class="__shiki_1t8gfj">floor</span><span class="__shiki_140thh">(Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    exp: Math.</span><span class="__shiki_1t8gfj">floor</span><span class="__shiki_140thh">(Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_140thh">), </span><span class="__shiki_21nrsd">// 1小时过期</span></span>
<span class="line"><span class="__shiki_140thh">    jti: </span><span class="__shiki_1t8gfj">generateUniqueId</span><span class="__shiki_140thh">() </span><span class="__shiki_21nrsd">// 唯一标识符</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> jwt.</span><span class="__shiki_1t8gfj">sign</span><span class="__shiki_140thh">(payload, process.env.</span><span class="__shiki_dzsirb">JWT_SECRET</span><span class="__shiki_140thh">, { </span></span>
<span class="line"><span class="__shiki_140thh">    algorithm: </span><span class="__shiki_mdbnqw">&#39;HS256&#39;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h5 id="_3-1-2-令牌配置最佳实践" tabindex="-1">3.1.2 令牌配置最佳实践 <a class="header-anchor" href="#_3-1-2-令牌配置最佳实践" aria-label="Permalink to &quot;3.1.2 令牌配置最佳实践&quot;">​</a></h5><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 推荐的JWT配置</span></span>
<span class="line"><span class="__shiki_17hn0y">token_config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  access_token</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    expiration</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">15-30分钟</span><span class="__shiki_21nrsd">    # 短期访问令牌</span></span>
<span class="line"><span class="__shiki_17hn0y">    algorithm</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HS256/RS256</span><span class="__shiki_21nrsd">   # 安全算法</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">  refresh_token</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    expiration</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">7-30天</span><span class="__shiki_21nrsd">       # 长期刷新令牌</span></span>
<span class="line"><span class="__shiki_17hn0y">    storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">httpOnly cookie</span><span class="__shiki_21nrsd"> # 安全存储</span></span></code></pre></div><h4 id="_2-令牌传输与存储" tabindex="-1">2. 令牌传输与存储 <a class="header-anchor" href="#_2-令牌传输与存储" aria-label="Permalink to &quot;2. 令牌传输与存储&quot;">​</a></h4><h5 id="_3-2-1-安全传输方式" tabindex="-1">3.2.1 安全传输方式 <a class="header-anchor" href="#_3-2-1-安全传输方式" aria-label="Permalink to &quot;3.2.1 安全传输方式&quot;">​</a></h5><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 前端：存储令牌</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> storeTokens</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">accessToken</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">refreshToken</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // Access Token: 内存或sessionStorage（短期）</span></span>
<span class="line"><span class="__shiki_140thh">  sessionStorage.</span><span class="__shiki_1t8gfj">setItem</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;access_token&#39;</span><span class="__shiki_140thh">, accessToken);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // Refresh Token: HttpOnly Cookie（更安全）</span></span>
<span class="line"><span class="__shiki_140thh">  document.cookie </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> \`refresh_token=\${</span><span class="__shiki_140thh">refreshToken</span><span class="__shiki_mdbnqw">}; HttpOnly; Secure; SameSite=Strict\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 前端：请求时添加令牌</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> apiRequest</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">url</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">options</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> token</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> sessionStorage.</span><span class="__shiki_1t8gfj">getItem</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;access_token&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(url, {</span></span>
<span class="line"><span class="__shiki_1itgoe">    ...</span><span class="__shiki_140thh">options,</span></span>
<span class="line"><span class="__shiki_140thh">    headers: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;Authorization&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\`Bearer \${</span><span class="__shiki_140thh">token</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;Content-Type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;application/json&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">      ...</span><span class="__shiki_140thh">options.headers</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h5 id="_3-2-2-存储安全考虑" tabindex="-1">3.2.2 存储安全考虑 <a class="header-anchor" href="#_3-2-2-存储安全考虑" aria-label="Permalink to &quot;3.2.2 存储安全考虑&quot;">​</a></h5><ul><li><strong>Access Token</strong>: 内存存储 &gt; sessionStorage &gt; localStorage</li><li><strong>Refresh Token</strong>: HttpOnly Cookie</li><li><strong>避免XSS</strong>: 不将敏感数据放入JWT payload</li><li><strong>CSRF防护</strong>: 使用SameSite Cookie属性</li></ul><h4 id="_3-令牌验证阶段" tabindex="-1">3. 令牌验证阶段 <a class="header-anchor" href="#_3-令牌验证阶段" aria-label="Permalink to &quot;3. 令牌验证阶段&quot;">​</a></h4><h5 id="_3-3-1-服务器端验证" tabindex="-1">3.3.1 服务器端验证 <a class="header-anchor" href="#_3-3-1-服务器端验证" aria-label="Permalink to &quot;3.3.1 服务器端验证&quot;">​</a></h5><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> jwt</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;jsonwebtoken&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> verifyToken</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">token</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> decoded</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> jwt.</span><span class="__shiki_1t8gfj">verify</span><span class="__shiki_140thh">(token, process.env.</span><span class="__shiki_dzsirb">JWT_SECRET</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">      algorithms: [</span><span class="__shiki_mdbnqw">&#39;HS256&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">      issuer: </span><span class="__shiki_mdbnqw">&#39;my-app&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      audience: </span><span class="__shiki_mdbnqw">&#39;my-app-users&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查令牌是否在黑名单中</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">await</span><span class="__shiki_1t8gfj"> isTokenRevoked</span><span class="__shiki_140thh">(decoded.jti)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Token revoked&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> decoded;</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Invalid token&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 中间件示例</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> authenticateToken</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">next</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> authHeader</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> req.headers[</span><span class="__shiki_mdbnqw">&#39;authorization&#39;</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> token</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> authHeader </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> authHeader.</span><span class="__shiki_1t8gfj">split</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39; &#39;</span><span class="__shiki_140thh">)[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">token) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">401</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({ error: </span><span class="__shiki_mdbnqw">&#39;Access token required&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    req.user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> verifyToken</span><span class="__shiki_140thh">(token);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    next</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">403</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({ error: </span><span class="__shiki_mdbnqw">&#39;Invalid token&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h5 id="_3-3-2-验证检查点" tabindex="-1">3.3.2 验证检查点 <a class="header-anchor" href="#_3-3-2-验证检查点" aria-label="Permalink to &quot;3.3.2 验证检查点&quot;">​</a></h5><ul><li>✅ 签名验证</li><li>✅ 过期时间检查</li><li>✅ 签发者验证</li><li>✅ 接收方验证</li><li>✅ 生效时间检查</li><li>✅ 令牌吊销检查</li></ul><h4 id="_4-令牌刷新机制" tabindex="-1">4. 令牌刷新机制 <a class="header-anchor" href="#_4-令牌刷新机制" aria-label="Permalink to &quot;4. 令牌刷新机制&quot;">​</a></h4><h5 id="_3-4-1-双令牌架构" tabindex="-1">3.4.1 双令牌架构 <a class="header-anchor" href="#_3-4-1-双令牌架构" aria-label="Permalink to &quot;3.4.1 双令牌架构&quot;">​</a></h5><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 刷新令牌端点</span></span>
<span class="line"><span class="__shiki_140thh">app.</span><span class="__shiki_1t8gfj">post</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/refresh-token&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> refreshToken</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> req.cookies.refresh_token;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">refreshToken) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">401</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({ error: </span><span class="__shiki_mdbnqw">&#39;Refresh token required&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证刷新令牌</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> decoded</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> jwt.</span><span class="__shiki_1t8gfj">verify</span><span class="__shiki_140thh">(refreshToken, process.env.</span><span class="__shiki_dzsirb">REFRESH_SECRET</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查刷新令牌是否有效</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> isValid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> checkRefreshTokenValidity</span><span class="__shiki_140thh">(decoded.jti);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">isValid) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">403</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({ error: </span><span class="__shiki_mdbnqw">&#39;Invalid refresh token&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 生成新的访问令牌</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> newAccessToken</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> generateAccessToken</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      userId: decoded.userId,</span></span>
<span class="line"><span class="__shiki_140thh">      username: decoded.username</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    res.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({ access_token: newAccessToken });</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">    res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">403</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({ error: </span><span class="__shiki_mdbnqw">&#39;Invalid refresh token&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h5 id="_3-4-2-自动令牌刷新" tabindex="-1">3.4.2 自动令牌刷新 <a class="header-anchor" href="#_3-4-2-自动令牌刷新" aria-label="Permalink to &quot;3.4.2 自动令牌刷新&quot;">​</a></h5><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 前端：处理令牌刷新</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> AuthService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.refreshInProgress </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> refreshAccessToken</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.refreshInProgress) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 等待正在进行的刷新请求</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">waitForRefresh</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.refreshInProgress </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/api/refresh-token&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">        method: </span><span class="__shiki_mdbnqw">&#39;POST&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        credentials: </span><span class="__shiki_mdbnqw">&#39;include&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (response.ok) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">access_token</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> response.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        sessionStorage.</span><span class="__shiki_1t8gfj">setItem</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;access_token&#39;</span><span class="__shiki_140thh">, access_token);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> access_token;</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 刷新失败，需要重新登录</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">logout</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Refresh failed&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">finally</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.refreshInProgress </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> apiCall</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">url</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">options</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> response </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(url, {</span></span>
<span class="line"><span class="__shiki_1itgoe">      ...</span><span class="__shiki_140thh">options,</span></span>
<span class="line"><span class="__shiki_140thh">      headers: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;Authorization&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\`Bearer \${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">getAccessToken</span><span class="__shiki_mdbnqw">()</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">        ...</span><span class="__shiki_140thh">options.headers</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 如果访问令牌过期，尝试刷新</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (response.status </span><span class="__shiki_1itgoe">===</span><span class="__shiki_dzsirb"> 401</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> newToken</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">refreshAccessToken</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      response </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(url, {</span></span>
<span class="line"><span class="__shiki_1itgoe">        ...</span><span class="__shiki_140thh">options,</span></span>
<span class="line"><span class="__shiki_140thh">        headers: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &#39;Authorization&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\`Bearer \${</span><span class="__shiki_140thh">newToken</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">          ...</span><span class="__shiki_140thh">options.headers</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> response;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_5-令牌吊销与失效" tabindex="-1">5. 令牌吊销与失效 <a class="header-anchor" href="#_5-令牌吊销与失效" aria-label="Permalink to &quot;5. 令牌吊销与失效&quot;">​</a></h4><h5 id="_3-5-1-令牌吊销策略" tabindex="-1">3.5.1 令牌吊销策略 <a class="header-anchor" href="#_3-5-1-令牌吊销策略" aria-label="Permalink to &quot;3.5.1 令牌吊销策略&quot;">​</a></h5><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 令牌黑名单管理</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TokenBlacklist</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">redisClient</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.redis </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redisClient;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 吊销令牌</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> revokeToken</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">tokenId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">expiresAt</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> ttl</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">max</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, Math.</span><span class="__shiki_1t8gfj">floor</span><span class="__shiki_140thh">(expiresAt </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.redis.</span><span class="__shiki_1t8gfj">setex</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`blacklist:\${</span><span class="__shiki_140thh">tokenId</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">, ttl, </span><span class="__shiki_mdbnqw">&#39;revoked&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 检查令牌是否被吊销</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> isTokenRevoked</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">tokenId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.redis.</span><span class="__shiki_1t8gfj">exists</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`blacklist:\${</span><span class="__shiki_140thh">tokenId</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 登出端点</span></span>
<span class="line"><span class="__shiki_140thh">app.</span><span class="__shiki_1t8gfj">post</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/logout&#39;</span><span class="__shiki_140thh">, authenticateToken, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> tokenId</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> req.user.jti;</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> expiresAt</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> req.user.exp;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 将令牌加入黑名单</span></span>
<span class="line"><span class="__shiki_1itgoe">  await</span><span class="__shiki_140thh"> tokenBlacklist.</span><span class="__shiki_1t8gfj">revokeToken</span><span class="__shiki_140thh">(tokenId, expiresAt);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 清除刷新令牌</span></span>
<span class="line"><span class="__shiki_140thh">  res.</span><span class="__shiki_1t8gfj">clearCookie</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;refresh_token&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  res.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({ message: </span><span class="__shiki_mdbnqw">&#39;Logged out successfully&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h5 id="_3-5-2-安全考虑" tabindex="-1">3.5.2 安全考虑 <a class="header-anchor" href="#_3-5-2-安全考虑" aria-label="Permalink to &quot;3.5.2 安全考虑&quot;">​</a></h5><ul><li><strong>短期令牌</strong>: 减少被盗风险的影响范围</li><li><strong>黑名单</strong>: 用于立即吊销令牌</li><li><strong>密钥轮换</strong>: 定期更换签名密钥</li><li><strong>会话管理</strong>: 服务器端会话状态跟踪</li></ul><h4 id="_6-令牌监控与审计" tabindex="-1">6. 令牌监控与审计 <a class="header-anchor" href="#_6-令牌监控与审计" aria-label="Permalink to &quot;6. 令牌监控与审计&quot;">​</a></h4><h5 id="_3-6-1-监控指标" tabindex="-1">3.6.1 监控指标 <a class="header-anchor" href="#_3-6-1-监控指标" aria-label="Permalink to &quot;3.6.1 监控指标&quot;">​</a></h5><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 令牌使用监控</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TokenMetrics</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  trackTokenUsage</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">token</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">endpoint</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> metrics</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      token_id: token.jti,</span></span>
<span class="line"><span class="__shiki_140thh">      user_id: token.userId,</span></span>
<span class="line"><span class="__shiki_140thh">      endpoint: endpoint,</span></span>
<span class="line"><span class="__shiki_140thh">      timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">      user_agent: req.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;User-Agent&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      ip_address: req.ip</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 发送到监控系统</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sendToMonitoring</span><span class="__shiki_140thh">(metrics);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  detectAnomalies</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">usagePattern</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检测异常使用模式</span></span>
<span class="line"><span class="__shiki_21nrsd">    // - 频繁的令牌刷新</span></span>
<span class="line"><span class="__shiki_21nrsd">    // - 异常地理位置</span></span>
<span class="line"><span class="__shiki_21nrsd">    // - 异常时间访问</span></span>
<span class="line"><span class="__shiki_21nrsd">    // - 多次失败尝试</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="四、安全最佳实践" tabindex="-1">四、安全最佳实践 <a class="header-anchor" href="#四、安全最佳实践" aria-label="Permalink to &quot;四、安全最佳实践&quot;">​</a></h2><h4 id="_1-jwt-安全配置" tabindex="-1">1. JWT 安全配置 <a class="header-anchor" href="#_1-jwt-安全配置" aria-label="Permalink to &quot;1. JWT 安全配置&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 安全的JWT配置</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> secureJwtConfig</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 使用强算法</span></span>
<span class="line"><span class="__shiki_140thh">  algorithms: [</span><span class="__shiki_mdbnqw">&#39;HS256&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;RS256&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 验证声明</span></span>
<span class="line"><span class="__shiki_140thh">  validate: {</span></span>
<span class="line"><span class="__shiki_140thh">    iss: </span><span class="__shiki_mdbnqw">&#39;my-trusted-issuer&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    aud: </span><span class="__shiki_mdbnqw">&#39;my-app-audience&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 短期过期时间</span></span>
<span class="line"><span class="__shiki_140thh">  maxAge: </span><span class="__shiki_mdbnqw">&#39;15m&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 时钟偏差容限</span></span>
<span class="line"><span class="__shiki_140thh">  clockTolerance: </span><span class="__shiki_mdbnqw">&#39;30s&#39;</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h4 id="_2-防御常见攻击" tabindex="-1">2. 防御常见攻击 <a class="header-anchor" href="#_2-防御常见攻击" aria-label="Permalink to &quot;2. 防御常见攻击&quot;">​</a></h4><h5 id="_4-2-1-jwt-攻击防护" tabindex="-1">4.2.1 JWT 攻击防护 <a class="header-anchor" href="#_4-2-1-jwt-攻击防护" aria-label="Permalink to &quot;4.2.1 JWT 攻击防护&quot;">​</a></h5><ul><li><strong>算法混淆攻击</strong>: 明确指定允许的算法</li><li><strong>密钥泄露</strong>: 安全存储和轮换密钥</li><li><strong>重放攻击</strong>: 使用jti声明和短期过期</li><li><strong>令牌窃取</strong>: HTTPS传输，安全存储</li></ul><h2 id="五、完整示例实现" tabindex="-1">五、完整示例实现 <a class="header-anchor" href="#五、完整示例实现" aria-label="Permalink to &quot;五、完整示例实现&quot;">​</a></h2><h4 id="_1-node-js-完整实现" tabindex="-1">1. Node.js 完整实现 <a class="header-anchor" href="#_1-node-js-完整实现" aria-label="Permalink to &quot;1. Node.js 完整实现&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> express</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;express&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> jwt</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;jsonwebtoken&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> cookieParser</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;cookie-parser&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> crypto</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;crypto&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> JwtAuthService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.accessSecret </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> process.env.</span><span class="__shiki_dzsirb">JWT_ACCESS_SECRET</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.refreshSecret </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> process.env.</span><span class="__shiki_dzsirb">JWT_REFRESH_SECRET</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.blacklist </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> TokenBlacklist</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  generateAccessToken</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">user</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> jwt.</span><span class="__shiki_1t8gfj">sign</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      {</span></span>
<span class="line"><span class="__shiki_140thh">        userId: user.id,</span></span>
<span class="line"><span class="__shiki_140thh">        username: user.username,</span></span>
<span class="line"><span class="__shiki_140thh">        roles: user.roles,</span></span>
<span class="line"><span class="__shiki_140thh">        jti: crypto.</span><span class="__shiki_1t8gfj">randomUUID</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        iat: Math.</span><span class="__shiki_1t8gfj">floor</span><span class="__shiki_140thh">(Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.accessSecret,</span></span>
<span class="line"><span class="__shiki_140thh">      { </span></span>
<span class="line"><span class="__shiki_140thh">        algorithm: </span><span class="__shiki_mdbnqw">&#39;HS256&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        expiresIn: </span><span class="__shiki_mdbnqw">&#39;15m&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        issuer: </span><span class="__shiki_mdbnqw">&#39;my-app&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        audience: </span><span class="__shiki_mdbnqw">&#39;my-app-users&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  generateRefreshToken</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">user</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> tokenId</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> crypto.</span><span class="__shiki_1t8gfj">randomUUID</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      token: jwt.</span><span class="__shiki_1t8gfj">sign</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">          userId: user.id,</span></span>
<span class="line"><span class="__shiki_140thh">          jti: tokenId,</span></span>
<span class="line"><span class="__shiki_140thh">          iat: Math.</span><span class="__shiki_1t8gfj">floor</span><span class="__shiki_140thh">(Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.refreshSecret,</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">          algorithm: </span><span class="__shiki_mdbnqw">&#39;HS256&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          expiresIn: </span><span class="__shiki_mdbnqw">&#39;7d&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      ),</span></span>
<span class="line"><span class="__shiki_140thh">      tokenId: tokenId</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> verifyAccessToken</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">token</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> decoded</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> jwt.</span><span class="__shiki_1t8gfj">verify</span><span class="__shiki_140thh">(token, </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.accessSecret, {</span></span>
<span class="line"><span class="__shiki_140thh">        algorithms: [</span><span class="__shiki_mdbnqw">&#39;HS256&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.blacklist.</span><span class="__shiki_1t8gfj">isTokenRevoked</span><span class="__shiki_140thh">(decoded.jti)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Token revoked&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> decoded;</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Invalid access token&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Express应用配置</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> app</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> express</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">app.</span><span class="__shiki_1t8gfj">use</span><span class="__shiki_140thh">(express.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">app.</span><span class="__shiki_1t8gfj">use</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">cookieParser</span><span class="__shiki_140thh">());</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> authService</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> JwtAuthService</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 登录端点</span></span>
<span class="line"><span class="__shiki_140thh">app.</span><span class="__shiki_1t8gfj">post</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/login&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">username</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">password</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> req.body;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 验证用户凭证</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> user</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> validateCredentials</span><span class="__shiki_140thh">(username, password);</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">user) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">401</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({ error: </span><span class="__shiki_mdbnqw">&#39;Invalid credentials&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 生成令牌</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> accessToken</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> authService.</span><span class="__shiki_1t8gfj">generateAccessToken</span><span class="__shiki_140thh">(user);</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> refreshToken</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> authService.</span><span class="__shiki_1t8gfj">generateRefreshToken</span><span class="__shiki_140thh">(user);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 存储刷新令牌（数据库）</span></span>
<span class="line"><span class="__shiki_1itgoe">  await</span><span class="__shiki_1t8gfj"> storeRefreshToken</span><span class="__shiki_140thh">(refreshToken.tokenId, user.id);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 设置刷新令牌cookie</span></span>
<span class="line"><span class="__shiki_140thh">  res.</span><span class="__shiki_1t8gfj">cookie</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;refresh_token&#39;</span><span class="__shiki_140thh">, refreshToken.token, {</span></span>
<span class="line"><span class="__shiki_140thh">    httpOnly: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    secure: process.env.</span><span class="__shiki_dzsirb">NODE_ENV</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_mdbnqw"> &#39;production&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    sameSite: </span><span class="__shiki_mdbnqw">&#39;strict&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    maxAge: </span><span class="__shiki_dzsirb">7</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 24</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_21nrsd"> // 7天</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  res.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">    access_token: accessToken,</span></span>
<span class="line"><span class="__shiki_140thh">    token_type: </span><span class="__shiki_mdbnqw">&#39;Bearer&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    expires_in: </span><span class="__shiki_dzsirb">900</span><span class="__shiki_21nrsd"> // 15分钟</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 受保护的路由</span></span>
<span class="line"><span class="__shiki_140thh">app.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/protected&#39;</span><span class="__shiki_140thh">, authenticateToken, (</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  res.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({ </span></span>
<span class="line"><span class="__shiki_140thh">    message: </span><span class="__shiki_mdbnqw">&#39;Access granted&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">    user: req.user </span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 令牌刷新端点</span></span>
<span class="line"><span class="__shiki_140thh">app.</span><span class="__shiki_1t8gfj">post</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/refresh&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> refreshToken</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> req.cookies.refresh_token;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">refreshToken) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">401</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({ error: </span><span class="__shiki_mdbnqw">&#39;Refresh token required&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> newTokens</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> authService.</span><span class="__shiki_1t8gfj">refreshTokens</span><span class="__shiki_140thh">(refreshToken);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    res.</span><span class="__shiki_1t8gfj">cookie</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;refresh_token&#39;</span><span class="__shiki_140thh">, newTokens.refreshToken, {</span></span>
<span class="line"><span class="__shiki_140thh">      httpOnly: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      secure: process.env.</span><span class="__shiki_dzsirb">NODE_ENV</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_mdbnqw"> &#39;production&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      sameSite: </span><span class="__shiki_mdbnqw">&#39;strict&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      maxAge: </span><span class="__shiki_dzsirb">7</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 24</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    res.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      access_token: newTokens.accessToken,</span></span>
<span class="line"><span class="__shiki_140thh">      token_type: </span><span class="__shiki_mdbnqw">&#39;Bearer&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      expires_in: </span><span class="__shiki_dzsirb">900</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">    res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">403</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({ error: </span><span class="__shiki_mdbnqw">&#39;Invalid refresh token&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 登出端点</span></span>
<span class="line"><span class="__shiki_140thh">app.</span><span class="__shiki_1t8gfj">post</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/logout&#39;</span><span class="__shiki_140thh">, authenticateToken, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  await</span><span class="__shiki_140thh"> authService.</span><span class="__shiki_1t8gfj">revokeToken</span><span class="__shiki_140thh">(req.user.jti, req.user.exp);</span></span>
<span class="line"><span class="__shiki_140thh">  res.</span><span class="__shiki_1t8gfj">clearCookie</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;refresh_token&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  res.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({ message: </span><span class="__shiki_mdbnqw">&#39;Logged out successfully&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 认证中间件</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> authenticateToken</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">next</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> authHeader</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> req.headers[</span><span class="__shiki_mdbnqw">&#39;authorization&#39;</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> token</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> authHeader </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> authHeader.</span><span class="__shiki_1t8gfj">split</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39; &#39;</span><span class="__shiki_140thh">)[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">token) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">401</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({ error: </span><span class="__shiki_mdbnqw">&#39;Access token required&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    req.user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> authService.</span><span class="__shiki_1t8gfj">verifyAccessToken</span><span class="__shiki_140thh">(token);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    next</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">403</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({ error: </span><span class="__shiki_mdbnqw">&#39;Invalid token&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="六、总结" tabindex="-1">六、总结 <a class="header-anchor" href="#六、总结" aria-label="Permalink to &quot;六、总结&quot;">​</a></h2><h4 id="_1-jwt-令牌生命周期关键点" tabindex="-1">1. JWT 令牌生命周期关键点 <a class="header-anchor" href="#_1-jwt-令牌生命周期关键点" aria-label="Permalink to &quot;1. JWT 令牌生命周期关键点&quot;">​</a></h4><ol><li><strong>安全生成</strong>: 使用强算法，包含必要声明</li><li><strong>安全传输</strong>: HTTPS，适当的存储机制</li><li><strong>有效验证</strong>: 全面的验证检查，包括吊销状态</li><li><strong>及时刷新</strong>: 双令牌机制，自动刷新流程</li><li><strong>妥善吊销</strong>: 黑名单管理，安全登出</li><li><strong>持续监控</strong>: 使用模式分析，异常检测</li></ol><h4 id="_2-选择建议" tabindex="-1">2. 选择建议 <a class="header-anchor" href="#_2-选择建议" aria-label="Permalink to &quot;2. 选择建议&quot;">​</a></h4><ul><li><strong>适合场景</strong>: 无状态API，微服务架构，单点登录</li><li><strong>不适合场景</strong>: 需要立即吊销大量令牌，复杂权限管理</li><li><strong>替代方案</strong>: Opaque tokens，Session-based authentication</li></ul>`,69)])])}const d=a(p,[["render",h]]);export{r as __pageData,d as default};
