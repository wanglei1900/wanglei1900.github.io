import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"OAuth 2.0 实现模式","description":"","frontmatter":{},"headers":[],"relativePath":"backend/auth/oauth/patterns.md","filePath":"backend/auth/oauth/patterns.md"}'),p={name:"backend/auth/oauth/patterns.md"};function h(l,s,c,t,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="oauth-2-0-实现模式" tabindex="-1">OAuth 2.0 实现模式 <a class="header-anchor" href="#oauth-2-0-实现模式" aria-label="Permalink to &quot;OAuth 2.0 实现模式&quot;">​</a></h1><h2 id="一、-核心实现模式概览" tabindex="-1">一、 核心实现模式概览 <a class="header-anchor" href="#一、-核心实现模式概览" aria-label="Permalink to &quot;一、 核心实现模式概览&quot;">​</a></h2><h4 id="_1-标准授权模式回顾" tabindex="-1">1. 标准授权模式回顾 <a class="header-anchor" href="#_1-标准授权模式回顾" aria-label="Permalink to &quot;1. 标准授权模式回顾&quot;">​</a></h4><table tabindex="0"><thead><tr><th>模式</th><th>适用场景</th><th>安全性</th><th>推荐度</th></tr></thead><tbody><tr><td>授权码模式</td><td>有后端的Web应用</td><td>⭐⭐⭐⭐⭐</td><td>强烈推荐</td></tr><tr><td>授权码+PKCE模式</td><td>单页应用、移动应用</td><td>⭐⭐⭐⭐⭐</td><td>强烈推荐</td></tr><tr><td>客户端凭证模式</td><td>服务端到服务端</td><td>⭐⭐⭐⭐</td><td>推荐</td></tr><tr><td>设备授权模式</td><td>智能电视、IoT设备</td><td>⭐⭐⭐</td><td>特定场景</td></tr><tr><td>资源所有者密码模式</td><td>受信任的第一方应用</td><td>⭐⭐</td><td>不推荐</td></tr><tr><td>隐式授权模式</td><td>-</td><td>⭐</td><td>已弃用</td></tr></tbody></table><h2 id="二、-授权码模式-authorization-code-flow" tabindex="-1">二、 授权码模式 (Authorization Code Flow) <a class="header-anchor" href="#二、-授权码模式-authorization-code-flow" aria-label="Permalink to &quot;二、 授权码模式 (Authorization Code Flow)&quot;">​</a></h2><h4 id="_1-标准实现" tabindex="-1">1. 标准实现 <a class="header-anchor" href="#_1-标准实现" aria-label="Permalink to &quot;1. 标准实现&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">sequenceDiagram</span></span>
<span class="line"><span class="__shiki_140thh">    participant U as 用户</span></span>
<span class="line"><span class="__shiki_140thh">    participant C as 客户端</span></span>
<span class="line"><span class="__shiki_140thh">    participant AS as 授权服务器</span></span>
<span class="line"><span class="__shiki_140thh">    participant RS as 资源服务器</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">    U-&gt;&gt;C: 访问应用</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;U: 重定向到授权端点</span></span>
<span class="line"><span class="__shiki_140thh">    U-&gt;&gt;AS: 登录并授权</span></span>
<span class="line"><span class="__shiki_140thh">    AS-&gt;&gt;U: 重定向回客户端(带code)</span></span>
<span class="line"><span class="__shiki_140thh">    U-&gt;&gt;C: 携带授权码</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;AS: 用code交换token</span></span>
<span class="line"><span class="__shiki_140thh">    AS-&gt;&gt;C: 返回access_token, refresh_token</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;RS: 使用access_token访问资源</span></span>
<span class="line"><span class="__shiki_140thh">    RS-&gt;&gt;C: 返回受保护资源</span></span></code></pre></div><p><strong>关键参数示例：</strong></p><div class="language-http vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">http</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 授权请求</span></span>
<span class="line"><span class="__shiki_1itgoe">GET</span><span class="__shiki_140thh"> /authorize?response_type=code</span></span>
<span class="line"><span class="__shiki_1itgoe">  &amp;</span><span class="__shiki_140thh">client_id=</span><span class="__shiki_mdbnqw">CLIENT_ID</span></span>
<span class="line"><span class="__shiki_1itgoe">  &amp;</span><span class="__shiki_140thh">redirect_uri=</span><span class="__shiki_mdbnqw">https://client.com/callback</span></span>
<span class="line"><span class="__shiki_1itgoe">  &amp;</span><span class="__shiki_140thh">scope=</span><span class="__shiki_mdbnqw">read write</span></span>
<span class="line"><span class="__shiki_1itgoe">  &amp;</span><span class="__shiki_140thh">state=</span><span class="__shiki_mdbnqw">xyz123</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 令牌请求</span></span>
<span class="line"><span class="__shiki_1itgoe">POST</span><span class="__shiki_140thh"> /token</span></span>
<span class="line"><span class="__shiki_17hn0y">Content-Type</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> application/x-www-form-urlencoded</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">grant_type=authorization_code</span></span>
<span class="line"><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">code=</span><span class="__shiki_mdbnqw">AUTHORIZATION_CODE</span></span>
<span class="line"><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">redirect_uri=</span><span class="__shiki_mdbnqw">https://client.com/callback</span></span>
<span class="line"><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">client_id=</span><span class="__shiki_mdbnqw">CLIENT_ID</span></span>
<span class="line"><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">client_secret=</span><span class="__shiki_mdbnqw">CLIENT_SECRET</span></span></code></pre></div><h4 id="_2-安全增强实现" tabindex="-1">2. 安全增强实现 <a class="header-anchor" href="#_2-安全增强实现" aria-label="Permalink to &quot;2. 安全增强实现&quot;">​</a></h4><h5 id="state-参数防护csrf" tabindex="-1">State 参数防护CSRF <a class="header-anchor" href="#state-参数防护csrf" aria-label="Permalink to &quot;State 参数防护CSRF&quot;">​</a></h5><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 生成state</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> generateState</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> crypto.</span><span class="__shiki_1t8gfj">randomBytes</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">32</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">toString</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;hex&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 存储state到session</span></span>
<span class="line"><span class="__shiki_140thh">req.session.oauth_state </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> state;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 验证state</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> validateState</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">receivedState</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">storedState</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> crypto.</span><span class="__shiki_1t8gfj">timingSafeEqual</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        Buffer.</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(receivedState),</span></span>
<span class="line"><span class="__shiki_140thh">        Buffer.</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(storedState)</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h2 id="三、-pkce-proof-key-for-code-exchange-模式" tabindex="-1">三、 PKCE (Proof Key for Code Exchange) 模式 <a class="header-anchor" href="#三、-pkce-proof-key-for-code-exchange-模式" aria-label="Permalink to &quot;三、 PKCE (Proof Key for Code Exchange) 模式&quot;">​</a></h2><h4 id="_1-pkce-工作流程" tabindex="-1">1. PKCE 工作流程 <a class="header-anchor" href="#_1-pkce-工作流程" aria-label="Permalink to &quot;1. PKCE 工作流程&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">sequenceDiagram</span></span>
<span class="line"><span class="__shiki_140thh">    participant C as 客户端</span></span>
<span class="line"><span class="__shiki_140thh">    participant AS as 授权服务器</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Note right of C: 1. 生成code_verifier和code_challenge</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;AS: 2. 授权请求 + code_challenge</span></span>
<span class="line"><span class="__shiki_140thh">    AS-&gt;&gt;C: 3. 返回授权码</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;AS: 4. 令牌请求 + code_verifier</span></span>
<span class="line"><span class="__shiki_140thh">    Note left of AS: 5. 验证challenge与verifier匹配</span></span>
<span class="line"><span class="__shiki_140thh">    AS-&gt;&gt;C: 6. 返回访问令牌</span></span></code></pre></div><h4 id="_2-pkce-实现代码" tabindex="-1">2. PKCE 实现代码 <a class="header-anchor" href="#_2-pkce-实现代码" aria-label="Permalink to &quot;2. PKCE 实现代码&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> PKCE</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 生成code_verifier (43-128字符)</span></span>
<span class="line"><span class="__shiki_1itgoe">    static</span><span class="__shiki_1t8gfj"> generateCodeVerifier</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> randomBytes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> crypto.</span><span class="__shiki_1t8gfj">randomBytes</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">64</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> base64url.</span><span class="__shiki_1t8gfj">encode</span><span class="__shiki_140thh">(randomBytes);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 生成code_challenge</span></span>
<span class="line"><span class="__shiki_1itgoe">    static</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_1t8gfj"> generateCodeChallenge</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">verifier</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> hash</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> crypto.subtle.</span><span class="__shiki_1t8gfj">digest</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;SHA-256&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">            new</span><span class="__shiki_1t8gfj"> TextEncoder</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">encode</span><span class="__shiki_140thh">(verifier)</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> base64url.</span><span class="__shiki_1t8gfj">encode</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Uint8Array</span><span class="__shiki_140thh">(hash));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证code_verifier</span></span>
<span class="line"><span class="__shiki_1itgoe">    static</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_1t8gfj"> verifyChallenge</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">verifier</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">challenge</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> expectedChallenge</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">generateCodeChallenge</span><span class="__shiki_140thh">(verifier);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1t8gfj"> timingSafeEqual</span><span class="__shiki_140thh">(challenge, expectedChallenge);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用示例</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> codeVerifier</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> PKCE</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">generateCodeVerifier</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> codeChallenge</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> PKCE</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">generateCodeChallenge</span><span class="__shiki_140thh">(codeVerifier);</span></span></code></pre></div><h2 id="四、-客户端凭证模式-client-credentials-flow" tabindex="-1">四、 客户端凭证模式 (Client Credentials Flow) <a class="header-anchor" href="#四、-客户端凭证模式-client-credentials-flow" aria-label="Permalink to &quot;四、 客户端凭证模式 (Client Credentials Flow)&quot;">​</a></h2><h4 id="_1-实现模式" tabindex="-1">1. 实现模式 <a class="header-anchor" href="#_1-实现模式" aria-label="Permalink to &quot;1. 实现模式&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ClientCredentialsFlow</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> getAccessToken</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">clientId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">clientSecret</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">scope</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> tokenEndpoint</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;https://auth.server.com/token&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(tokenEndpoint, {</span></span>
<span class="line"><span class="__shiki_140thh">            method: </span><span class="__shiki_mdbnqw">&#39;POST&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            headers: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;Content-Type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;application/x-www-form-urlencoded&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;Authorization&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Basic &#39;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_1t8gfj"> btoa</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_140thh">clientId</span><span class="__shiki_mdbnqw">}:\${</span><span class="__shiki_140thh">clientSecret</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">            body: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> URLSearchParams</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                grant_type: </span><span class="__shiki_mdbnqw">&#39;client_credentials&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                scope: scope</span></span>
<span class="line"><span class="__shiki_140thh">            })</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> tokenData</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> response.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            accessToken: tokenData.access_token,</span></span>
<span class="line"><span class="__shiki_140thh">            expiresIn: tokenData.expires_in,</span></span>
<span class="line"><span class="__shiki_140thh">            tokenType: tokenData.token_type</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-带缓存的令牌管理" tabindex="-1">2. 带缓存的令牌管理 <a class="header-anchor" href="#_2-带缓存的令牌管理" aria-label="Permalink to &quot;2. 带缓存的令牌管理&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TokenManager</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.tokenCache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> getValidToken</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">clientId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">clientSecret</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">scope</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> cacheKey</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> \`\${</span><span class="__shiki_140thh">clientId</span><span class="__shiki_mdbnqw">}:\${</span><span class="__shiki_140thh">scope</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> cached</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.tokenCache.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(cacheKey);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (cached </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> cached.expiresAt) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> cached.accessToken;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> newToken</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">fetchNewToken</span><span class="__shiki_140thh">(clientId, clientSecret, scope);</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.tokenCache.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(cacheKey, {</span></span>
<span class="line"><span class="__shiki_140thh">            accessToken: newToken.accessToken,</span></span>
<span class="line"><span class="__shiki_140thh">            expiresAt: Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> (newToken.expiresIn </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 60000</span><span class="__shiki_21nrsd"> // 提前1分钟过期</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> newToken.accessToken;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="五、-设备授权模式-device-authorization-flow" tabindex="-1">五、 设备授权模式 (Device Authorization Flow) <a class="header-anchor" href="#五、-设备授权模式-device-authorization-flow" aria-label="Permalink to &quot;五、 设备授权模式 (Device Authorization Flow)&quot;">​</a></h2><h4 id="_1-实现流程" tabindex="-1">1. 实现流程 <a class="header-anchor" href="#_1-实现流程" aria-label="Permalink to &quot;1. 实现流程&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">sequenceDiagram</span></span>
<span class="line"><span class="__shiki_140thh">    participant D as 设备</span></span>
<span class="line"><span class="__shiki_140thh">    participant AS as 授权服务器</span></span>
<span class="line"><span class="__shiki_140thh">    participant U as 用户</span></span>
<span class="line"><span class="__shiki_140thh">    participant BC as 浏览器客户端</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">    D-&gt;&gt;AS: 1. 请求设备授权</span></span>
<span class="line"><span class="__shiki_140thh">    AS-&gt;&gt;D: 2. 返回device_code, user_code, verification_uri</span></span>
<span class="line"><span class="__shiki_140thh">    D-&gt;&gt;U: 3. 显示user_code和verification_uri</span></span>
<span class="line"><span class="__shiki_140thh">    U-&gt;&gt;BC: 4. 访问verification_uri输入user_code</span></span>
<span class="line"><span class="__shiki_140thh">    BC-&gt;&gt;AS: 5. 用户授权</span></span>
<span class="line"><span class="__shiki_140thh">    Note over D,AS: 6. 设备轮询令牌端点</span></span>
<span class="line"><span class="__shiki_140thh">    D-&gt;&gt;AS: 7. 轮询请求(device_code)</span></span>
<span class="line"><span class="__shiki_140thh">    AS-&gt;&gt;D: 8. 返回access_token(当用户授权后)</span></span></code></pre></div><h4 id="_2-设备授权实现" tabindex="-1">2. 设备授权实现 <a class="header-anchor" href="#_2-设备授权实现" aria-label="Permalink to &quot;2. 设备授权实现&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> DeviceAuthorization</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> initiateDeviceAuthorization</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">clientId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">scope</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;https://auth.server.com/device_authorization&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">            method: </span><span class="__shiki_mdbnqw">&#39;POST&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            headers: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;Content-Type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;application/x-www-form-urlencoded&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">            body: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> URLSearchParams</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                client_id: clientId,</span></span>
<span class="line"><span class="__shiki_140thh">                scope: scope</span></span>
<span class="line"><span class="__shiki_140thh">            })</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> authData</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> response.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            deviceCode: authData.device_code,</span></span>
<span class="line"><span class="__shiki_140thh">            userCode: authData.user_code,</span></span>
<span class="line"><span class="__shiki_140thh">            verificationUri: authData.verification_uri,</span></span>
<span class="line"><span class="__shiki_140thh">            verificationUriComplete: authData.verification_uri_complete,</span></span>
<span class="line"><span class="__shiki_140thh">            expiresIn: authData.expires_in,</span></span>
<span class="line"><span class="__shiki_140thh">            interval: authData.interval</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> pollForToken</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">deviceCode</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">clientId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">timeout</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 300000</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> startTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        while</span><span class="__shiki_140thh"> (Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> timeout) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;https://auth.server.com/token&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">                    method: </span><span class="__shiki_mdbnqw">&#39;POST&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    headers: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &#39;Content-Type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;application/x-www-form-urlencoded&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    },</span></span>
<span class="line"><span class="__shiki_140thh">                    body: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> URLSearchParams</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                        grant_type: </span><span class="__shiki_mdbnqw">&#39;urn:ietf:params:oauth:grant-type:device_code&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                        device_code: deviceCode,</span></span>
<span class="line"><span class="__shiki_140thh">                        client_id: clientId</span></span>
<span class="line"><span class="__shiki_140thh">                    })</span></span>
<span class="line"><span class="__shiki_140thh">                });</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">                const</span><span class="__shiki_dzsirb"> tokenData</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> response.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (tokenData.access_token) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_140thh"> tokenData;</span></span>
<span class="line"><span class="__shiki_140thh">                } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (tokenData.error </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;authorization_pending&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 继续轮询</span></span>
<span class="line"><span class="__shiki_1itgoe">                    await</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1t8gfj">                        setTimeout</span><span class="__shiki_140thh">(resolve, tokenData.interval </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                    );</span></span>
<span class="line"><span class="__shiki_140thh">                } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(tokenData.error);</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 处理网络错误等</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(resolve, </span><span class="__shiki_dzsirb">5000</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Authorization timeout&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="六、-令牌管理与安全实现" tabindex="-1">六、 令牌管理与安全实现 <a class="header-anchor" href="#六、-令牌管理与安全实现" aria-label="Permalink to &quot;六、 令牌管理与安全实现&quot;">​</a></h2><h4 id="_1-令牌存储策略" tabindex="-1">1. 令牌存储策略 <a class="header-anchor" href="#_1-令牌存储策略" aria-label="Permalink to &quot;1. 令牌存储策略&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 安全的令牌存储方案</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> SecureTokenStorage</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // Web环境 - 使用HttpOnly Cookie</span></span>
<span class="line"><span class="__shiki_1itgoe">    static</span><span class="__shiki_1t8gfj"> setTokenCookie</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">token</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">maxAge</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 3600</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        document.cookie </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> \`access_token=\${</span><span class="__shiki_140thh">token</span><span class="__shiki_mdbnqw">}; \`</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">                         \`Max-Age=\${</span><span class="__shiki_140thh">maxAge</span><span class="__shiki_mdbnqw">}; \`</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">                         \`Path=/; \`</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">                         \`Secure; \`</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">                         \`SameSite=Strict; \`</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">                         \`HttpOnly\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 移动端 - 使用安全存储</span></span>
<span class="line"><span class="__shiki_1itgoe">    static</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_1t8gfj"> setTokenSecureStorage</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">value</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (window.crypto </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> window.crypto.subtle) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 使用Web Crypto API加密存储</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> encoder</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> TextEncoder</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> data</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> encoder.</span><span class="__shiki_1t8gfj">encode</span><span class="__shiki_140thh">(value);</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 实际实现中需要使用更复杂的密钥管理</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 服务端存储方案</span></span>
<span class="line"><span class="__shiki_1itgoe">    static</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_1t8gfj"> storeTokenInDatabase</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">tokenData</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 加密令牌</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> encryptedToken</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">encryptToken</span><span class="__shiki_140thh">(tokenData.accessToken);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> db.tokens.</span><span class="__shiki_1t8gfj">upsert</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">            userId: userId,</span></span>
<span class="line"><span class="__shiki_140thh">            accessToken: encryptedToken,</span></span>
<span class="line"><span class="__shiki_140thh">            refreshToken: tokenData.refreshToken,</span></span>
<span class="line"><span class="__shiki_140thh">            expiresAt: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> (tokenData.expiresIn </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_140thh">            issuedAt: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-令牌刷新机制" tabindex="-1">2. 令牌刷新机制 <a class="header-anchor" href="#_2-令牌刷新机制" aria-label="Permalink to &quot;2. 令牌刷新机制&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TokenRefreshManager</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.refreshQueue </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> refreshAccessToken</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">refreshToken</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">clientId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 防止重复刷新</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.refreshQueue.</span><span class="__shiki_1t8gfj">has</span><span class="__shiki_140thh">(refreshToken)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.refreshQueue.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(refreshToken);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> refreshPromise</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">performTokenRefresh</span><span class="__shiki_140thh">(refreshToken, clientId);</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.refreshQueue.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(refreshToken, refreshPromise);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> refreshPromise;</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">finally</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.refreshQueue.</span><span class="__shiki_1t8gfj">delete</span><span class="__shiki_140thh">(refreshToken);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> performTokenRefresh</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">refreshToken</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">clientId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;https://auth.server.com/token&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">            method: </span><span class="__shiki_mdbnqw">&#39;POST&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            headers: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;Content-Type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;application/x-www-form-urlencoded&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">            body: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> URLSearchParams</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                grant_type: </span><span class="__shiki_mdbnqw">&#39;refresh_token&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                refresh_token: refreshToken,</span></span>
<span class="line"><span class="__shiki_140thh">                client_id: clientId</span></span>
<span class="line"><span class="__shiki_140thh">            })</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">response.ok) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Token refresh failed&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> response.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="七、-安全最佳实践实现" tabindex="-1">七、 安全最佳实践实现 <a class="header-anchor" href="#七、-安全最佳实践实现" aria-label="Permalink to &quot;七、 安全最佳实践实现&quot;">​</a></h2><h4 id="_1-令牌验证中间件" tabindex="-1">1. 令牌验证中间件 <a class="header-anchor" href="#_1-令牌验证中间件" aria-label="Permalink to &quot;1. 令牌验证中间件&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Express.js 令牌验证中间件</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> tokenValidationMiddleware</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">options</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">next</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> authHeader</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> req.headers.authorization;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">authHeader </span><span class="__shiki_1itgoe">||</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">authHeader.</span><span class="__shiki_1t8gfj">startsWith</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Bearer &#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">401</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({ error: </span><span class="__shiki_mdbnqw">&#39;Missing authorization header&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> token</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> authHeader.</span><span class="__shiki_1t8gfj">substring</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">7</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // JWT验证</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> decoded</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> verifyJWT</span><span class="__shiki_140thh">(token, options.publicKey);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 检查令牌是否在黑名单中</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">await</span><span class="__shiki_1t8gfj"> isTokenRevoked</span><span class="__shiki_140thh">(token)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">401</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({ error: </span><span class="__shiki_mdbnqw">&#39;Token revoked&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">            // 检查权限范围</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (options.requiredScopes) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                const</span><span class="__shiki_dzsirb"> hasScope</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> validateScopes</span><span class="__shiki_140thh">(decoded.scope, options.requiredScopes);</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">hasScope) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_140thh"> res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">403</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({ error: </span><span class="__shiki_mdbnqw">&#39;Insufficient scope&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">            req.user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> decoded;</span></span>
<span class="line"><span class="__shiki_1t8gfj">            next</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">401</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({ error: </span><span class="__shiki_mdbnqw">&#39;Invalid token&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// JWT验证函数</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> verifyJWT</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">token</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">publicKey</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">reject</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        jwt.</span><span class="__shiki_1t8gfj">verify</span><span class="__shiki_140thh">(token, publicKey, {</span></span>
<span class="line"><span class="__shiki_140thh">            algorithms: [</span><span class="__shiki_mdbnqw">&#39;RS256&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">            issuer: </span><span class="__shiki_mdbnqw">&#39;https://auth.server.com&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            audience: </span><span class="__shiki_mdbnqw">&#39;api.server.com&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        }, (</span><span class="__shiki_1jdh33">err</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">decoded</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (err) </span><span class="__shiki_1t8gfj">reject</span><span class="__shiki_140thh">(err);</span></span>
<span class="line"><span class="__shiki_1itgoe">            else</span><span class="__shiki_1t8gfj"> resolve</span><span class="__shiki_140thh">(decoded);</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-速率限制和防护" tabindex="-1">2. 速率限制和防护 <a class="header-anchor" href="#_2-速率限制和防护" aria-label="Permalink to &quot;2. 速率限制和防护&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> RateLimiter</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">maxRequests</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">timeWindow</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.maxRequests </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> maxRequests;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.timeWindow </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> timeWindow;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.requests </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">    isAllowed</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">identifier</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> now</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> windowStart</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> now </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.timeWindow;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.requests.</span><span class="__shiki_1t8gfj">has</span><span class="__shiki_140thh">(identifier)) {</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.requests.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(identifier, []);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> userRequests</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.requests.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(identifier);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 清理过期的请求记录</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> validRequests</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> userRequests.</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">time</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> time </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> windowStart);</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.requests.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(identifier, validRequests);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (validRequests.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.maxRequests) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        validRequests.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(now);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用示例 - 授权端点防护</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> authRateLimiter</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> RateLimiter</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">60000</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 5次/分钟</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> tokenRateLimiter</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> RateLimiter</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">60000</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 10次/分钟</span></span></code></pre></div><h2 id="八、-微服务架构中的实现模式" tabindex="-1">八、 微服务架构中的实现模式 <a class="header-anchor" href="#八、-微服务架构中的实现模式" aria-label="Permalink to &quot;八、 微服务架构中的实现模式&quot;">​</a></h2><h4 id="_1-api网关模式" tabindex="-1">1. API网关模式 <a class="header-anchor" href="#_1-api网关模式" aria-label="Permalink to &quot;1. API网关模式&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ApiGateway</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.tokenIntrospection </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> TokenIntrospection</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.serviceRegistry </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ServiceRegistry</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> handleRequest</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 1. 令牌验证</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> token</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">extractToken</span><span class="__shiki_140thh">(req);</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> tokenInfo</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.tokenIntrospection.</span><span class="__shiki_1t8gfj">introspect</span><span class="__shiki_140thh">(token);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">tokenInfo.active) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">401</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({ error: </span><span class="__shiki_mdbnqw">&#39;Invalid token&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">        // 2. 路由到对应微服务</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> service</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.serviceRegistry.</span><span class="__shiki_1t8gfj">findService</span><span class="__shiki_140thh">(req.path);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">service) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">404</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({ error: </span><span class="__shiki_mdbnqw">&#39;Service not found&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">        // 3. 权限检查</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkPermissions</span><span class="__shiki_140thh">(tokenInfo, service.requiredPermissions)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">403</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({ error: </span><span class="__shiki_mdbnqw">&#39;Insufficient permissions&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">        // 4. 转发请求（携带用户上下文）</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> serviceRequest</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            ...</span><span class="__shiki_140thh">req,</span></span>
<span class="line"><span class="__shiki_140thh">            headers: {</span></span>
<span class="line"><span class="__shiki_1itgoe">                ...</span><span class="__shiki_140thh">req.headers,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;x-user-id&#39;</span><span class="__shiki_140thh">: tokenInfo.sub,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;x-user-roles&#39;</span><span class="__shiki_140thh">: tokenInfo.roles.</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;,&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">        // 转发到目标服务...</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-令牌中继模式-token-relay" tabindex="-1">2. 令牌中继模式 (Token Relay) <a class="header-anchor" href="#_2-令牌中继模式-token-relay" aria-label="Permalink to &quot;2. 令牌中继模式 (Token Relay)&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 服务间调用的令牌中继</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TokenRelay</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    static</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_1t8gfj"> forwardRequest</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">upstreamService</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">downstreamUrl</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">originalRequest</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> headers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            ...</span><span class="__shiki_140thh">originalRequest.headers,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;Authorization&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\`Bearer \${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">extractToken</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_140thh">originalRequest</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}\`</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(downstreamUrl, {</span></span>
<span class="line"><span class="__shiki_140thh">            method: originalRequest.method,</span></span>
<span class="line"><span class="__shiki_140thh">            headers: headers,</span></span>
<span class="line"><span class="__shiki_140thh">            body: originalRequest.body</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> response;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    static</span><span class="__shiki_1t8gfj"> extractToken</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">request</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> authHeader</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> request.headers.authorization;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> authHeader </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> authHeader.</span><span class="__shiki_1t8gfj">replace</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Bearer &#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="九、-监控和日志记录" tabindex="-1">九、 监控和日志记录 <a class="header-anchor" href="#九、-监控和日志记录" aria-label="Permalink to &quot;九、 监控和日志记录&quot;">​</a></h2><h4 id="_1-审计日志实现" tabindex="-1">1. 审计日志实现 <a class="header-anchor" href="#_1-审计日志实现" aria-label="Permalink to &quot;1. 审计日志实现&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> OAuthAuditLogger</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    static</span><span class="__shiki_1t8gfj"> logAuthorizationAttempt</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">clientId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">success</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">reason</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> logEntry</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            event: </span><span class="__shiki_mdbnqw">&#39;authorization_attempt&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            clientId: clientId,</span></span>
<span class="line"><span class="__shiki_140thh">            userId: userId,</span></span>
<span class="line"><span class="__shiki_140thh">            success: success,</span></span>
<span class="line"><span class="__shiki_140thh">            reason: reason,</span></span>
<span class="line"><span class="__shiki_140thh">            ipAddress: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getClientIP</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            userAgent: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getUserAgent</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">        // 写入审计日志</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">writeAuditLog</span><span class="__shiki_140thh">(logEntry);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    static</span><span class="__shiki_1t8gfj"> logTokenIssuance</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">clientId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">scope</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> logEntry</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            event: </span><span class="__shiki_mdbnqw">&#39;token_issued&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            clientId: clientId,</span></span>
<span class="line"><span class="__shiki_140thh">            userId: userId,</span></span>
<span class="line"><span class="__shiki_140thh">            scope: scope,</span></span>
<span class="line"><span class="__shiki_140thh">            ipAddress: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getClientIP</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">writeAuditLog</span><span class="__shiki_140thh">(logEntry);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="十、-测试策略" tabindex="-1">十、 测试策略 <a class="header-anchor" href="#十、-测试策略" aria-label="Permalink to &quot;十、 测试策略&quot;">​</a></h2><h4 id="_1-集成测试示例" tabindex="-1">1. 集成测试示例 <a class="header-anchor" href="#_1-集成测试示例" aria-label="Permalink to &quot;1. 集成测试示例&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">describe</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;OAuth 2.0 Authorization Code Flow&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    test</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;should complete authorization flow successfully&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 1. 模拟授权请求</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> authResponse</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> request</span><span class="__shiki_140thh">(app)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/authorize&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">query</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                response_type: </span><span class="__shiki_mdbnqw">&#39;code&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                client_id: </span><span class="__shiki_dzsirb">TEST_CLIENT_ID</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                redirect_uri: </span><span class="__shiki_dzsirb">TEST_REDIRECT_URI</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                state: </span><span class="__shiki_dzsirb">TEST_STATE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                scope: </span><span class="__shiki_mdbnqw">&#39;read write&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">        expect</span><span class="__shiki_140thh">(authResponse.status).</span><span class="__shiki_1t8gfj">toBe</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">302</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        expect</span><span class="__shiki_140thh">(authResponse.headers.location).</span><span class="__shiki_1t8gfj">toContain</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;auth.server.com&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">        // 2. 模拟令牌交换</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> tokenResponse</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> request</span><span class="__shiki_140thh">(app)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">post</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/token&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                grant_type: </span><span class="__shiki_mdbnqw">&#39;authorization_code&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                code: </span><span class="__shiki_dzsirb">TEST_AUTH_CODE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                redirect_uri: </span><span class="__shiki_dzsirb">TEST_REDIRECT_URI</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                client_id: </span><span class="__shiki_dzsirb">TEST_CLIENT_ID</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                client_secret: </span><span class="__shiki_dzsirb">TEST_CLIENT_SECRET</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">        expect</span><span class="__shiki_140thh">(tokenResponse.status).</span><span class="__shiki_1t8gfj">toBe</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        expect</span><span class="__shiki_140thh">(tokenResponse.body).</span><span class="__shiki_1t8gfj">toHaveProperty</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;access_token&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        expect</span><span class="__shiki_140thh">(tokenResponse.body).</span><span class="__shiki_1t8gfj">toHaveProperty</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;refresh_token&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><p>这份学习笔记涵盖了OAuth 2.0的主要实现模式，包括标准流程、安全增强、令牌管理和在分布式系统中的实现策略。实际应用中需要根据具体场景选择合适的模式，并始终遵循安全最佳实践。</p>`,49)])])}const d=a(p,[["render",h]]);export{r as __pageData,d as default};
