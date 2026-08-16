import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"🔒 服务网格安全策略架构模式学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/architecture/service-mesh/security.md","filePath":"backend/architecture/service-mesh/security.md"}'),_={name:"backend/architecture/service-mesh/security.md"};function h(l,s,c,e,t,k){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="🔒-服务网格安全策略架构模式学习笔记" tabindex="-1">🔒 服务网格安全策略架构模式学习笔记 <a class="header-anchor" href="#🔒-服务网格安全策略架构模式学习笔记" aria-label="Permalink to &quot;🔒 服务网格安全策略架构模式学习笔记&quot;">​</a></h1><h2 id="_1️⃣-服务网格安全概述" tabindex="-1">1️⃣ 服务网格安全概述 <a class="header-anchor" href="#_1️⃣-服务网格安全概述" aria-label="Permalink to &quot;1️⃣ 服务网格安全概述&quot;">​</a></h2><h3 id="_1-1-安全挑战与解决方案" tabindex="-1">1.1 安全挑战与解决方案 <a class="header-anchor" href="#_1-1-安全挑战与解决方案" aria-label="Permalink to &quot;1.1 安全挑战与解决方案&quot;">​</a></h3><p>微服务架构引入了新的安全挑战，服务网格通过基础设施层提供统一的安全解决方案。</p><p><strong>传统安全挑战</strong>：</p><ul><li>❌ 服务间通信缺乏加密</li><li>❌ 缺乏细粒度的访问控制</li><li>❌ 身份管理复杂</li><li>❌ 安全策略分散</li></ul><p><strong>服务网格解决方案</strong>：</p><ul><li>✅ 自动mTLS加密</li><li>✅ 基于身份的策略执行</li><li>✅ 统一的证书管理</li><li>✅ 集中式安全配置</li></ul><h3 id="_1-2-零信任安全模型" tabindex="-1">1.2 零信任安全模型 <a class="header-anchor" href="#_1-2-零信任安全模型" aria-label="Permalink to &quot;1.2 零信任安全模型&quot;">​</a></h3><p>服务网格实现了零信任架构的核心原则：</p><ul><li><strong>永不信任，始终验证</strong></li><li><strong>假设网络已被攻破</strong></li><li><strong>基于身份的最小权限访问</strong></li></ul><h2 id="_2️⃣-服务网格安全架构" tabindex="-1">2️⃣ 服务网格安全架构 <a class="header-anchor" href="#_2️⃣-服务网格安全架构" aria-label="Permalink to &quot;2️⃣ 服务网格安全架构&quot;">​</a></h2><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    subgraph Control Plane Security</span></span>
<span class="line"><span class="__shiki_140thh">        A[策略管理]</span></span>
<span class="line"><span class="__shiki_140thh">        B[证书颁发机构]</span></span>
<span class="line"><span class="__shiki_140thh">        C[身份管理]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    subgraph Data Plane Security</span></span>
<span class="line"><span class="__shiki_140thh">        D[Sidecar代理]</span></span>
<span class="line"><span class="__shiki_140thh">        E[流量拦截]</span></span>
<span class="line"><span class="__shiki_140thh">        F[策略执行]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    subgraph Security Components</span></span>
<span class="line"><span class="__shiki_140thh">        G[认证策略]</span></span>
<span class="line"><span class="__shiki_140thh">        H[授权策略]</span></span>
<span class="line"><span class="__shiki_140thh">        I[加密通信]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; G</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; H</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; I</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; G</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; H</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; F</span></span>
<span class="line"><span class="__shiki_140thh">    G --&gt; F</span></span>
<span class="line"><span class="__shiki_140thh">    H --&gt; F</span></span>
<span class="line"><span class="__shiki_140thh">    I --&gt; E</span></span></code></pre></div><h2 id="_3️⃣-身份与认证安全" tabindex="-1">3️⃣ 身份与认证安全 <a class="header-anchor" href="#_3️⃣-身份与认证安全" aria-label="Permalink to &quot;3️⃣ 身份与认证安全&quot;">​</a></h2><h3 id="_3-1-服务身份管理" tabindex="-1">3.1 服务身份管理 <a class="header-anchor" href="#_3-1-服务身份管理" aria-label="Permalink to &quot;3.1 服务身份管理&quot;">​</a></h3><h4 id="_3-1-1-身份表示" tabindex="-1">3.1.1 身份表示 <a class="header-anchor" href="#_3-1-1-身份表示" aria-label="Permalink to &quot;3.1.1 身份表示&quot;">​</a></h4><p>在Kubernetes环境中，服务身份通常基于服务账户：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Kubernetes ServiceAccount</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ServiceAccount</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">payment-service</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ecommerce</span></span></code></pre></div><h4 id="_3-1-2-身份发现机制" tabindex="-1">3.1.2 身份发现机制 <a class="header-anchor" href="#_3-1-2-身份发现机制" aria-label="Permalink to &quot;3.1.2 身份发现机制&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">sequenceDiagram</span></span>
<span class="line"><span class="__shiki_140thh">    participant SA as Service Account</span></span>
<span class="line"><span class="__shiki_140thh">    participant CA as Certificate Authority</span></span>
<span class="line"><span class="__shiki_140thh">    participant SP as Sidecar Proxy</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Note over SA, SP: 身份引导流程</span></span>
<span class="line"><span class="__shiki_140thh">    SA-&gt;&gt;CA: 请求身份证书</span></span>
<span class="line"><span class="__shiki_140thh">    CA-&gt;&gt;SA: 颁发X.509证书</span></span>
<span class="line"><span class="__shiki_140thh">    SA-&gt;&gt;SP: 注入身份证书</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Note over SA, SP: 通信时身份验证</span></span>
<span class="line"><span class="__shiki_140thh">    SP-&gt;&gt;SP: 使用证书建立mTLS</span></span>
<span class="line"><span class="__shiki_140thh">    SP-&gt;&gt;SP: 验证对等方身份</span></span></code></pre></div><h3 id="_3-2-认证策略类型" tabindex="-1">3.2 认证策略类型 <a class="header-anchor" href="#_3-2-认证策略类型" aria-label="Permalink to &quot;3.2 认证策略类型&quot;">​</a></h3><h4 id="_3-2-1-对等认证-peer-authentication" tabindex="-1">3.2.1 对等认证（Peer Authentication） <a class="header-anchor" href="#_3-2-1-对等认证-peer-authentication" aria-label="Permalink to &quot;3.2.1 对等认证（Peer Authentication）&quot;">​</a></h4><p>验证服务间的通信身份：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PeerAuthentication</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">strict-mtls</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ecommerce</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">payment-service</span></span>
<span class="line"><span class="__shiki_17hn0y">  mtls</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">STRICT</span></span></code></pre></div><p><strong>认证模式</strong>：</p><ul><li><code>STRICT</code>：强制mTLS</li><li><code>PERMISSIVE</code>：允许明文和mTLS</li><li><code>DISABLE</code>：禁用mTLS</li></ul><h4 id="_3-2-2-请求认证-request-authentication" tabindex="-1">3.2.2 请求认证（Request Authentication） <a class="header-anchor" href="#_3-2-2-请求认证-request-authentication" aria-label="Permalink to &quot;3.2.2 请求认证（Request Authentication）&quot;">​</a></h4><p>验证终端用户请求：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">RequestAuthentication</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">jwt-auth</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ecommerce</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">user-service</span></span>
<span class="line"><span class="__shiki_17hn0y">  jwtRules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">issuer</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;https://auth.example.com&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    jwksUri</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;https://auth.example.com/.well-known/jwks.json&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    audiences</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">&quot;ecommerce-app&quot;</span></span></code></pre></div><h2 id="_4️⃣-授权与访问控制" tabindex="-1">4️⃣ 授权与访问控制 <a class="header-anchor" href="#_4️⃣-授权与访问控制" aria-label="Permalink to &quot;4️⃣ 授权与访问控制&quot;">​</a></h2><h3 id="_4-1-授权策略架构" tabindex="-1">4.1 授权策略架构 <a class="header-anchor" href="#_4-1-授权策略架构" aria-label="Permalink to &quot;4.1 授权策略架构&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[客户端请求] --&gt; B[Sidecar代理]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C{授权检查}</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt;|允许| D[目标服务]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt;|拒绝| E[返回403错误]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    F[授权策略] --&gt; C</span></span>
<span class="line"><span class="__shiki_140thh">    G[身份上下文] --&gt; C</span></span></code></pre></div><h3 id="_4-2-授权策略配置" tabindex="-1">4.2 授权策略配置 <a class="header-anchor" href="#_4-2-授权策略配置" aria-label="Permalink to &quot;4.2 授权策略配置&quot;">​</a></h3><h4 id="_4-2-1-基于命名空间的授权" tabindex="-1">4.2.1 基于命名空间的授权 <a class="header-anchor" href="#_4-2-1-基于命名空间的授权" aria-label="Permalink to &quot;4.2.1 基于命名空间的授权&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AuthorizationPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">namespace-access</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ecommerce</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  action</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ALLOW</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">source</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        namespaces</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;monitoring&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">operation</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        methods</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;GET&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">        paths</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;/metrics&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h4 id="_4-2-2-基于服务的授权" tabindex="-1">4.2.2 基于服务的授权 <a class="header-anchor" href="#_4-2-2-基于服务的授权" aria-label="Permalink to &quot;4.2.2 基于服务的授权&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AuthorizationPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">service-access</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ecommerce</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">payment-service</span></span>
<span class="line"><span class="__shiki_17hn0y">  action</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">DENY</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">source</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        notPrincipals</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;cluster.local/ns/ecommerce/sa/frontend-service&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">operation</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        methods</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;POST&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;PUT&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;DELETE&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h4 id="_4-2-3-条件授权" tabindex="-1">4.2.3 条件授权 <a class="header-anchor" href="#_4-2-3-条件授权" aria-label="Permalink to &quot;4.2.3 条件授权&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AuthorizationPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">conditional-access</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ecommerce</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  action</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ALLOW</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">source</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        principals</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;cluster.local/ns/ecommerce/sa/*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    when</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">request.headers[user-role]</span></span>
<span class="line"><span class="__shiki_17hn0y">      values</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;admin&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;supervisor&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">request.auth.claims[group]</span></span>
<span class="line"><span class="__shiki_17hn0y">      values</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;finance-team&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h2 id="_5️⃣-通信加密" tabindex="-1">5️⃣ 通信加密 <a class="header-anchor" href="#_5️⃣-通信加密" aria-label="Permalink to &quot;5️⃣ 通信加密&quot;">​</a></h2><h3 id="_5-1-mtls加密架构" tabindex="-1">5.1 mTLS加密架构 <a class="header-anchor" href="#_5-1-mtls加密架构" aria-label="Permalink to &quot;5.1 mTLS加密架构&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">sequenceDiagram</span></span>
<span class="line"><span class="__shiki_140thh">    participant Client as 客户端服务</span></span>
<span class="line"><span class="__shiki_140thh">    participant ClientProxy as 客户端Sidecar</span></span>
<span class="line"><span class="__shiki_140thh">    participant ServerProxy as 服务端Sidecar  </span></span>
<span class="line"><span class="__shiki_140thh">    participant Server as 服务端服务</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">    Note over Client, Server: TLS握手阶段</span></span>
<span class="line"><span class="__shiki_140thh">    ClientProxy-&gt;&gt;ServerProxy: ClientHello</span></span>
<span class="line"><span class="__shiki_140thh">    ServerProxy-&gt;&gt;ClientProxy: ServerHello + 证书</span></span>
<span class="line"><span class="__shiki_140thh">    ClientProxy-&gt;&gt;ServerProxy: 验证服务器证书</span></span>
<span class="line"><span class="__shiki_140thh">    ClientProxy-&gt;&gt;ServerProxy: 发送客户端证书</span></span>
<span class="line"><span class="__shiki_140thh">    ServerProxy-&gt;&gt;ClientProxy: 验证客户端证书</span></span>
<span class="line"><span class="__shiki_140thh">    ClientProxy-&gt;&gt;ServerProxy: 完成握手</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Note over Client, Server: 加密通信阶段</span></span>
<span class="line"><span class="__shiki_140thh">    Client-&gt;&gt;ClientProxy: 明文请求</span></span>
<span class="line"><span class="__shiki_140thh">    ClientProxy-&gt;&gt;ServerProxy: 加密传输</span></span>
<span class="line"><span class="__shiki_140thh">    ServerProxy-&gt;&gt;Server: 明文请求</span></span>
<span class="line"><span class="__shiki_140thh">    Server-&gt;&gt;ServerProxy: 明文响应</span></span>
<span class="line"><span class="__shiki_140thh">    ServerProxy-&gt;&gt;ClientProxy: 加密传输</span></span>
<span class="line"><span class="__shiki_140thh">    ClientProxy-&gt;&gt;Client: 明文响应</span></span></code></pre></div><h3 id="_5-2-加密策略配置" tabindex="-1">5.2 加密策略配置 <a class="header-anchor" href="#_5-2-加密策略配置" aria-label="Permalink to &quot;5.2 加密策略配置&quot;">​</a></h3><h4 id="_5-2-1-全局mtls策略" tabindex="-1">5.2.1 全局mTLS策略 <a class="header-anchor" href="#_5-2-1-全局mtls策略" aria-label="Permalink to &quot;5.2.1 全局mTLS策略&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PeerAuthentication</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">istio-system</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  mtls</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">STRICT</span></span></code></pre></div><h4 id="_5-2-2-特定服务策略覆盖" tabindex="-1">5.2.2 特定服务策略覆盖 <a class="header-anchor" href="#_5-2-2-特定服务策略覆盖" aria-label="Permalink to &quot;5.2.2 特定服务策略覆盖&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PeerAuthentication</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">legacy-service</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">legacy</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  mtls</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">DISABLE</span></span></code></pre></div><h2 id="_6️⃣-网络安全策略" tabindex="-1">6️⃣ 网络安全策略 <a class="header-anchor" href="#_6️⃣-网络安全策略" aria-label="Permalink to &quot;6️⃣ 网络安全策略&quot;">​</a></h2><h3 id="_6-1-网络边界安全" tabindex="-1">6.1 网络边界安全 <a class="header-anchor" href="#_6-1-网络边界安全" aria-label="Permalink to &quot;6.1 网络边界安全&quot;">​</a></h3><h4 id="_6-1-1-入口网关安全" tabindex="-1">6.1.1 入口网关安全 <a class="header-anchor" href="#_6-1-1-入口网关安全" aria-label="Permalink to &quot;6.1.1 入口网关安全&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Gateway</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">secure-gateway</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    istio</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ingressgateway</span></span>
<span class="line"><span class="__shiki_17hn0y">  servers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">port</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      number</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">443</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">https</span></span>
<span class="line"><span class="__shiki_17hn0y">      protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HTTPS</span></span>
<span class="line"><span class="__shiki_17hn0y">    tls</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">SIMPLE</span></span>
<span class="line"><span class="__shiki_17hn0y">      credentialName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gateway-certificate</span></span>
<span class="line"><span class="__shiki_17hn0y">    hosts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">&quot;api.example.com&quot;</span></span></code></pre></div><h4 id="_6-1-2-出口流量控制" tabindex="-1">6.1.2 出口流量控制 <a class="header-anchor" href="#_6-1-2-出口流量控制" aria-label="Permalink to &quot;6.1.2 出口流量控制&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ServiceEntry</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">allowed-external</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  hosts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">&quot;api.stripe.com&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">&quot;webhook.github.com&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">number</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">443</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">https</span></span>
<span class="line"><span class="__shiki_17hn0y">    protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HTTPS</span></span>
<span class="line"><span class="__shiki_17hn0y">  resolution</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">DNS</span></span></code></pre></div><h3 id="_6-2-安全默认值-默认拒绝策略" tabindex="-1">6.2 安全默认值：默认拒绝策略 <a class="header-anchor" href="#_6-2-安全默认值-默认拒绝策略" aria-label="Permalink to &quot;6.2 安全默认值：默认拒绝策略&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 默认拒绝所有流量</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AuthorizationPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deny-all</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">istio-system</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  {}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 按需开放访问权限</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AuthorizationPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">allow-specific</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ecommerce</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  action</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ALLOW</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">source</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        principals</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;cluster.local/ns/ecommerce/sa/frontend-service&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">operation</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        methods</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;GET&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;POST&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h2 id="_7️⃣-证书管理与轮换" tabindex="-1">7️⃣ 证书管理与轮换 <a class="header-anchor" href="#_7️⃣-证书管理与轮换" aria-label="Permalink to &quot;7️⃣ 证书管理与轮换&quot;">​</a></h2><h3 id="_7-1-自动证书管理" tabindex="-1">7.1 自动证书管理 <a class="header-anchor" href="#_7-1-自动证书管理" aria-label="Permalink to &quot;7.1 自动证书管理&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    subgraph Certificate Lifecycle</span></span>
<span class="line"><span class="__shiki_140thh">        A[证书请求] --&gt; B[证书颁发]</span></span>
<span class="line"><span class="__shiki_140thh">        B --&gt; C[证书分发]</span></span>
<span class="line"><span class="__shiki_140thh">        C --&gt; D[证书使用]</span></span>
<span class="line"><span class="__shiki_140thh">        D --&gt; E[证书监控]</span></span>
<span class="line"><span class="__shiki_140thh">        E --&gt; F{证书过期检查}</span></span>
<span class="line"><span class="__shiki_140thh">        F --&gt;|未过期| D</span></span>
<span class="line"><span class="__shiki_140thh">        F --&gt;|即将过期| A</span></span>
<span class="line"><span class="__shiki_140thh">        F --&gt;|已过期| G[证书撤销]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    subgraph Components</span></span>
<span class="line"><span class="__shiki_140thh">        H[Istiod CA] --&gt; B</span></span>
<span class="line"><span class="__shiki_140thh">        I[Sidecar代理] --&gt; C</span></span>
<span class="line"><span class="__shiki_140thh">        J[工作负载] --&gt; D</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span></code></pre></div><h3 id="_7-2-证书轮换策略" tabindex="-1">7.2 证书轮换策略 <a class="header-anchor" href="#_7-2-证书轮换策略" aria-label="Permalink to &quot;7.2 证书轮换策略&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Istio CA配置示例</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">istio</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  mesh</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">    defaultConfig:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      discoveryAddress: istiod.istio-system.svc:15012</span></span>
<span class="line"><span class="__shiki_mdbnqw">    certChain: /etc/certs/cert-chain.pem</span></span>
<span class="line"><span class="__shiki_mdbnqw">    privateKey: /etc/certs/key.pem</span></span>
<span class="line"><span class="__shiki_mdbnqw">    rootCert: /etc/certs/root-cert.pem</span></span>
<span class="line"><span class="__shiki_mdbnqw">    # 证书轮换配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">    secretRotationGracePeriodRatio: 0.5</span></span>
<span class="line"><span class="__shiki_mdbnqw">    secretRotationInterval: 24h</span></span></code></pre></div><h2 id="_8️⃣-安全审计与监控" tabindex="-1">8️⃣ 安全审计与监控 <a class="header-anchor" href="#_8️⃣-安全审计与监控" aria-label="Permalink to &quot;8️⃣ 安全审计与监控&quot;">​</a></h2><h3 id="_8-1-安全事件日志" tabindex="-1">8.1 安全事件日志 <a class="header-anchor" href="#_8-1-安全事件日志" aria-label="Permalink to &quot;8.1 安全事件日志&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 授权策略日志配置</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AuthorizationPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">audit-policy</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">sensitive-service</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">source</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        principals</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">operation</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        methods</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 记录所有访问尝试</span></span>
<span class="line"><span class="__shiki_17hn0y">  auditLogging</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    enable</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    includeRequestBody</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    includeResponseBody</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span></code></pre></div><h3 id="_8-2-安全指标监控" tabindex="-1">8.2 安全指标监控 <a class="header-anchor" href="#_8-2-安全指标监控" aria-label="Permalink to &quot;8.2 安全指标监控&quot;">​</a></h3><p><strong>关键安全指标</strong>：</p><ul><li><code>istio_requests_total{response_code=&quot;403&quot;}</code>：拒绝的请求数</li><li><code>istio_authentication_failures_total</code>：认证失败次数</li><li><code>istio_mtls_connections</code>：mTLS连接统计</li><li><code>istio_certificate_expiry_seconds</code>：证书过期时间</li></ul><h2 id="_9️⃣-多层次防御策略" tabindex="-1">9️⃣ 多层次防御策略 <a class="header-anchor" href="#_9️⃣-多层次防御策略" aria-label="Permalink to &quot;9️⃣ 多层次防御策略&quot;">​</a></h2><h3 id="_9-1-纵深防御架构" tabindex="-1">9.1 纵深防御架构 <a class="header-anchor" href="#_9-1-纵深防御架构" aria-label="Permalink to &quot;9.1 纵深防御架构&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[外部请求] --&gt; B[边缘安全]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[网络层安全]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[服务层安全]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[数据层安全]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    subgraph B[边缘安全]</span></span>
<span class="line"><span class="__shiki_140thh">        B1[WAF]</span></span>
<span class="line"><span class="__shiki_140thh">        B2[DDoS防护]</span></span>
<span class="line"><span class="__shiki_140thh">        B3[TLS终止]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    subgraph C[网络层安全]</span></span>
<span class="line"><span class="__shiki_140thh">        C1[网络策略]</span></span>
<span class="line"><span class="__shiki_140thh">        C2[服务隔离]</span></span>
<span class="line"><span class="__shiki_140thh">        C3[流量加密]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    subgraph D[服务层安全]</span></span>
<span class="line"><span class="__shiki_140thh">        D1[身份认证]</span></span>
<span class="line"><span class="__shiki_140thh">        D2[授权策略]</span></span>
<span class="line"><span class="__shiki_140thh">        D3[速率限制]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    subgraph E[数据层安全]</span></span>
<span class="line"><span class="__shiki_140thh">        E1[数据加密]</span></span>
<span class="line"><span class="__shiki_140thh">        E2[访问控制]</span></span>
<span class="line"><span class="__shiki_140thh">        E3[审计日志]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span></code></pre></div><h3 id="_9-2-安全策略层次" tabindex="-1">9.2 安全策略层次 <a class="header-anchor" href="#_9-2-安全策略层次" aria-label="Permalink to &quot;9.2 安全策略层次&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 网格级别默认策略</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PeerAuthentication</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">istio-system</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  mtls</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">STRICT</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 命名空间级别策略</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AuthorizationPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">namespace-default</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ecommerce</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  action</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">DENY</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">: []</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 服务级别策略</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AuthorizationPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">service-specific</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ecommerce</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">payment-service</span></span>
<span class="line"><span class="__shiki_17hn0y">  action</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ALLOW</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">source</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        principals</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;cluster.local/ns/ecommerce/sa/*&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h2 id="🔟-最佳实践与策略模板" tabindex="-1">🔟 最佳实践与策略模板 <a class="header-anchor" href="#🔟-最佳实践与策略模板" aria-label="Permalink to &quot;🔟 最佳实践与策略模板&quot;">​</a></h2><h3 id="_10-1-安全策略模板库" tabindex="-1">10.1 安全策略模板库 <a class="header-anchor" href="#_10-1-安全策略模板库" aria-label="Permalink to &quot;10.1 安全策略模板库&quot;">​</a></h3><h4 id="_10-1-1-pci-dss合规模板" tabindex="-1">10.1.1 PCI DSS合规模板 <a class="header-anchor" href="#_10-1-1-pci-dss合规模板" aria-label="Permalink to &quot;10.1.1 PCI DSS合规模板&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 支付卡行业数据安全标准</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AuthorizationPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">pci-dss-compliance</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">source</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        principals</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;cluster.local/ns/pci/sa/payment-processor&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">operation</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        paths</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;/api/v1/payments*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    when</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">request.auth.claims[pci_scope]</span></span>
<span class="line"><span class="__shiki_17hn0y">      values</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;true&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">connection.encryption</span></span>
<span class="line"><span class="__shiki_17hn0y">      values</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;true&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h4 id="_10-1-2-零信任网络模板" tabindex="-1">10.1.2 零信任网络模板 <a class="header-anchor" href="#_10-1-2-零信任网络模板" aria-label="Permalink to &quot;10.1.2 零信任网络模板&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 零信任策略</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AuthorizationPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">zero-trust-base</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 默认拒绝所有</span></span>
<span class="line"><span class="__shiki_140thh">  {}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AuthorizationPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">zero-trust-explicit</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  action</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ALLOW</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">source</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        principals</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">explicitly-defined</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">operation</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        methods</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">explicitly-allowed</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    when</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">request.auth.claims[role]</span></span>
<span class="line"><span class="__shiki_17hn0y">      values</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">required-role</span><span class="__shiki_140thh">]</span></span></code></pre></div><h2 id="📊-总结" tabindex="-1">📊 总结 <a class="header-anchor" href="#📊-总结" aria-label="Permalink to &quot;📊 总结&quot;">​</a></h2><p>服务网格安全策略提供了强大而灵活的安全机制：</p><h3 id="🎯-核心价值" tabindex="-1">🎯 核心价值 <a class="header-anchor" href="#🎯-核心价值" aria-label="Permalink to &quot;🎯 核心价值&quot;">​</a></h3><ol><li><strong>统一安全控制面</strong>：集中管理所有服务的安全策略</li><li><strong>自动安全实施</strong>：无需应用代码修改的安全能力</li><li><strong>深度防御</strong>：多层次、纵深的安全防护</li><li><strong>零信任就绪</strong>：原生支持零信任架构原则</li></ol><h3 id="🔧-关键策略模式" tabindex="-1">🔧 关键策略模式 <a class="header-anchor" href="#🔧-关键策略模式" aria-label="Permalink to &quot;🔧 关键策略模式&quot;">​</a></h3><ul><li><strong>身份驱动的访问控制</strong>：基于服务身份而非IP地址</li><li><strong>默认拒绝</strong>：显式允许所需通信</li><li><strong>自动加密</strong>：透明的服务间通信加密</li><li><strong>策略即代码</strong>：声明式、版本化的安全策略</li></ul><h3 id="🚀-实施建议" tabindex="-1">🚀 实施建议 <a class="header-anchor" href="#🚀-实施建议" aria-label="Permalink to &quot;🚀 实施建议&quot;">​</a></h3><ol><li>从默认拒绝策略开始</li><li>逐步实施mTLS加密</li><li>基于最小权限原则配置授权</li><li>建立持续的安全审计和监控</li><li>定期审查和更新安全策略</li></ol><p>服务网格的安全策略架构为现代云原生应用提供了企业级的安全基础，是实现零信任网络的关键技术支撑。</p>`,86)])])}const d=a(_,[["render",h]]);export{r as __pageData,d as default};
