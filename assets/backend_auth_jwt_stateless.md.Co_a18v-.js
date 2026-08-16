import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"JWT 无状态会话","description":"","frontmatter":{},"headers":[],"relativePath":"backend/auth/jwt/stateless.md","filePath":"backend/auth/jwt/stateless.md"}'),p={name:"backend/auth/jwt/stateless.md"};function h(l,s,c,t,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="jwt-无状态会话" tabindex="-1">JWT 无状态会话 <a class="header-anchor" href="#jwt-无状态会话" aria-label="Permalink to &quot;JWT 无状态会话&quot;">​</a></h1><h2 id="一、无状态会话基础概念" tabindex="-1">一、无状态会话基础概念 <a class="header-anchor" href="#一、无状态会话基础概念" aria-label="Permalink to &quot;一、无状态会话基础概念&quot;">​</a></h2><h4 id="_1-什么是有状态会话" tabindex="-1">1. 什么是有状态会话 <a class="header-anchor" href="#_1-什么是有状态会话" aria-label="Permalink to &quot;1. 什么是有状态会话&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 传统有状态会话示例</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> sessionStore</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;sessionId123&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_140thh">    userId: </span><span class="__shiki_mdbnqw">&quot;user1&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    username: </span><span class="__shiki_mdbnqw">&quot;john_doe&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    loginTime: </span><span class="__shiki_mdbnqw">&quot;2024-01-15T10:00:00Z&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    lastActivity: </span><span class="__shiki_mdbnqw">&quot;2024-01-15T10:15:00Z&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 服务器需要维护会话存储</span></span>
<span class="line"><span class="__shiki_21nrsd">// 每个请求都需要查询会话存储</span></span></code></pre></div><h4 id="_2-什么是无状态会话" tabindex="-1">2. 什么是无状态会话 <a class="header-anchor" href="#_2-什么是无状态会话" aria-label="Permalink to &quot;2. 什么是无状态会话&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 无状态会话核心思想</span></span>
<span class="line"><span class="__shiki_21nrsd">// 服务器不存储会话信息，所有必要信息都包含在令牌中</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> jwtToken</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  header: { alg: </span><span class="__shiki_mdbnqw">&quot;HS256&quot;</span><span class="__shiki_140thh">, typ: </span><span class="__shiki_mdbnqw">&quot;JWT&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">  payload: {</span></span>
<span class="line"><span class="__shiki_140thh">    userId: </span><span class="__shiki_mdbnqw">&quot;user1&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    username: </span><span class="__shiki_mdbnqw">&quot;john_doe&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    iat: </span><span class="__shiki_dzsirb">1705305600</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    exp: </span><span class="__shiki_dzsirb">1705309200</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  signature: </span><span class="__shiki_mdbnqw">&quot;...&quot;</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h4 id="_3-有状态-vs-无状态对比" tabindex="-1">3. 有状态 vs 无状态对比 <a class="header-anchor" href="#_3-有状态-vs-无状态对比" aria-label="Permalink to &quot;3. 有状态 vs 无状态对比&quot;">​</a></h4><table tabindex="0"><thead><tr><th>特性</th><th>有状态会话</th><th>无状态会话 (JWT)</th></tr></thead><tbody><tr><td>服务器存储</td><td>需要会话存储</td><td>不需要会话存储</td></tr><tr><td>扩展性</td><td>需要会话亲和性或共享存储</td><td>天然支持水平扩展</td></tr><tr><td>性能</td><td>需要会话查询</td><td>直接验证令牌</td></tr><tr><td>移动端支持</td><td>较差</td><td>优秀</td></tr><tr><td>跨域支持</td><td>有限制</td><td>良好支持</td></tr><tr><td>实时撤销</td><td>容易</td><td>困难</td></tr></tbody></table><h2 id="二、jwt-无状态会话架构" tabindex="-1">二、JWT 无状态会话架构 <a class="header-anchor" href="#二、jwt-无状态会话架构" aria-label="Permalink to &quot;二、JWT 无状态会话架构&quot;">​</a></h2><h4 id="_1-系统架构图" tabindex="-1">1. 系统架构图 <a class="header-anchor" href="#_1-系统架构图" aria-label="Permalink to &quot;1. 系统架构图&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">客户端 (Client)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓ (携带 JWT)</span></span>
<span class="line"><span class="__shiki_wvjl67">负载均衡器 (Load Balancer)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓ (任何服务器都可以处理)</span></span>
<span class="line"><span class="__shiki_wvjl67">应用服务器集群 (Stateless)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓ (验证 JWT 签名)</span></span>
<span class="line"><span class="__shiki_wvjl67">数据库/服务 (仅在需要时访问)</span></span></code></pre></div><h4 id="_2-核心工作流程" tabindex="-1">2. 核心工作流程 <a class="header-anchor" href="#_2-核心工作流程" aria-label="Permalink to &quot;2. 核心工作流程&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">sequenceDiagram</span></span>
<span class="line"><span class="__shiki_140thh">    participant C as Client</span></span>
<span class="line"><span class="__shiki_140thh">    participant S as Server</span></span>
<span class="line"><span class="__shiki_140thh">    participant A as Auth Service</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;A: 1. 登录请求 (credentials)</span></span>
<span class="line"><span class="__shiki_140thh">    A-&gt;&gt;A: 2. 验证用户凭证</span></span>
<span class="line"><span class="__shiki_140thh">    A-&gt;&gt;C: 3. 返回 JWT (包含用户信息)</span></span>
<span class="line"><span class="__shiki_140thh">    Note over C: 4. 存储 JWT (localStorage/cookie)</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;S: 5. API 请求 (携带 JWT)</span></span>
<span class="line"><span class="__shiki_140thh">    S-&gt;&gt;S: 6. 验证 JWT 签名和过期时间</span></span>
<span class="line"><span class="__shiki_140thh">    S-&gt;&gt;S: 7. 从 JWT payload 提取用户信息</span></span>
<span class="line"><span class="__shiki_140thh">    S-&gt;&gt;C: 8. 返回请求数据</span></span></code></pre></div><h2 id="三、jwt-无状态会话实现" tabindex="-1">三、JWT 无状态会话实现 <a class="header-anchor" href="#三、jwt-无状态会话实现" aria-label="Permalink to &quot;三、JWT 无状态会话实现&quot;">​</a></h2><h4 id="_1-jwt-结构设计" tabindex="-1">1. JWT 结构设计 <a class="header-anchor" href="#_1-jwt-结构设计" aria-label="Permalink to &quot;1. JWT 结构设计&quot;">​</a></h4><h5 id="_3-1-1-标准声明-自定义声明" tabindex="-1">3.1.1 标准声明 + 自定义声明 <a class="header-anchor" href="#_3-1-1-标准声明-自定义声明" aria-label="Permalink to &quot;3.1.1 标准声明 + 自定义声明&quot;">​</a></h5><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 优化的 JWT payload 设计</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> payload</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 标准声明</span></span>
<span class="line"><span class="__shiki_140thh">  iss: </span><span class="__shiki_mdbnqw">&quot;api.yourdomain.com&quot;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 签发者</span></span>
<span class="line"><span class="__shiki_140thh">  sub: </span><span class="__shiki_mdbnqw">&quot;user123&quot;</span><span class="__shiki_140thh">,            </span><span class="__shiki_21nrsd">// 主题 (用户ID)</span></span>
<span class="line"><span class="__shiki_140thh">  aud: </span><span class="__shiki_mdbnqw">&quot;yourapp&quot;</span><span class="__shiki_140thh">,            </span><span class="__shiki_21nrsd">// 受众</span></span>
<span class="line"><span class="__shiki_140thh">  exp: Math.</span><span class="__shiki_1t8gfj">floor</span><span class="__shiki_140thh">(Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_140thh">), </span><span class="__shiki_21nrsd">// 1小时后过期</span></span>
<span class="line"><span class="__shiki_140thh">  iat: Math.</span><span class="__shiki_1t8gfj">floor</span><span class="__shiki_140thh">(Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">),             </span><span class="__shiki_21nrsd">// 签发时间</span></span>
<span class="line"><span class="__shiki_140thh">  nbf: Math.</span><span class="__shiki_1t8gfj">floor</span><span class="__shiki_140thh">(Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">),             </span><span class="__shiki_21nrsd">// 生效时间</span></span>
<span class="line"><span class="__shiki_140thh">  jti: </span><span class="__shiki_mdbnqw">&quot;unique-token-id&quot;</span><span class="__shiki_140thh">,    </span><span class="__shiki_21nrsd">// 令牌唯一标识</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 自定义声明 - 会话相关</span></span>
<span class="line"><span class="__shiki_140thh">  user: {</span></span>
<span class="line"><span class="__shiki_140thh">    id: </span><span class="__shiki_mdbnqw">&quot;user123&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    username: </span><span class="__shiki_mdbnqw">&quot;john_doe&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    email: </span><span class="__shiki_mdbnqw">&quot;john@example.com&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    roles: [</span><span class="__shiki_mdbnqw">&quot;user&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;premium&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">    permissions: [</span><span class="__shiki_mdbnqw">&quot;read:profile&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;write:posts&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 会话元数据</span></span>
<span class="line"><span class="__shiki_140thh">  session: {</span></span>
<span class="line"><span class="__shiki_140thh">    loginTime: </span><span class="__shiki_mdbnqw">&quot;2024-01-15T10:00:00Z&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    device: </span><span class="__shiki_mdbnqw">&quot;web&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    ip: </span><span class="__shiki_mdbnqw">&quot;192.168.1.100&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h4 id="_2-完整的无状态认证系统" tabindex="-1">2. 完整的无状态认证系统 <a class="header-anchor" href="#_2-完整的无状态认证系统" aria-label="Permalink to &quot;2. 完整的无状态认证系统&quot;">​</a></h4><h5 id="_3-2-1-认证服务" tabindex="-1">3.2.1 认证服务 <a class="header-anchor" href="#_3-2-1-认证服务" aria-label="Permalink to &quot;3.2.1 认证服务&quot;">​</a></h5><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> jwt</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;jsonwebtoken&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> bcrypt</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;bcrypt&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> crypto</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;crypto&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> StatelessAuthService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.secret </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> process.env.</span><span class="__shiki_dzsirb">JWT_SECRET</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.refreshSecret </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> process.env.</span><span class="__shiki_dzsirb">JWT_REFRESH_SECRET</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 生成访问令牌</span></span>
<span class="line"><span class="__shiki_1t8gfj">  generateAccessToken</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">user</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">sessionMeta</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> payload</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      sub: user.id,</span></span>
<span class="line"><span class="__shiki_140thh">      user: {</span></span>
<span class="line"><span class="__shiki_140thh">        id: user.id,</span></span>
<span class="line"><span class="__shiki_140thh">        username: user.username,</span></span>
<span class="line"><span class="__shiki_140thh">        email: user.email,</span></span>
<span class="line"><span class="__shiki_140thh">        roles: user.roles </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> [],</span></span>
<span class="line"><span class="__shiki_140thh">        permissions: user.permissions </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      session: {</span></span>
<span class="line"><span class="__shiki_140thh">        loginTime: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        device: sessionMeta.device </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;unknown&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        ip: sessionMeta.ip </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;unknown&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      jti: crypto.</span><span class="__shiki_1t8gfj">randomUUID</span><span class="__shiki_140thh">() </span><span class="__shiki_21nrsd">// 防止重放攻击</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> jwt.</span><span class="__shiki_1t8gfj">sign</span><span class="__shiki_140thh">(payload, </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.secret, {</span></span>
<span class="line"><span class="__shiki_140thh">      expiresIn: </span><span class="__shiki_mdbnqw">&#39;15m&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 短期访问令牌</span></span>
<span class="line"><span class="__shiki_140thh">      issuer: </span><span class="__shiki_mdbnqw">&#39;api.yourdomain.com&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      audience: </span><span class="__shiki_mdbnqw">&#39;yourapp&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 生成刷新令牌</span></span>
<span class="line"><span class="__shiki_1t8gfj">  generateRefreshToken</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> payload</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      sub: userId,</span></span>
<span class="line"><span class="__shiki_140thh">      jti: crypto.</span><span class="__shiki_1t8gfj">randomUUID</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> jwt.</span><span class="__shiki_1t8gfj">sign</span><span class="__shiki_140thh">(payload, </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.refreshSecret, {</span></span>
<span class="line"><span class="__shiki_140thh">      expiresIn: </span><span class="__shiki_mdbnqw">&#39;7d&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 长期刷新令牌</span></span>
<span class="line"><span class="__shiki_140thh">      issuer: </span><span class="__shiki_mdbnqw">&#39;api.yourdomain.com&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      audience: </span><span class="__shiki_mdbnqw">&#39;yourapp-refresh&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 验证访问令牌</span></span>
<span class="line"><span class="__shiki_1t8gfj">  verifyAccessToken</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">token</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> jwt.</span><span class="__shiki_1t8gfj">verify</span><span class="__shiki_140thh">(token, </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.secret, {</span></span>
<span class="line"><span class="__shiki_140thh">        issuer: </span><span class="__shiki_mdbnqw">&#39;api.yourdomain.com&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        audience: </span><span class="__shiki_mdbnqw">&#39;yourapp&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Token verification failed: \${</span><span class="__shiki_140thh">error</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">message</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 验证刷新令牌</span></span>
<span class="line"><span class="__shiki_1t8gfj">  verifyRefreshToken</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">token</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> jwt.</span><span class="__shiki_1t8gfj">verify</span><span class="__shiki_140thh">(token, </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.refreshSecret, {</span></span>
<span class="line"><span class="__shiki_140thh">        issuer: </span><span class="__shiki_mdbnqw">&#39;api.yourdomain.com&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        audience: </span><span class="__shiki_mdbnqw">&#39;yourapp-refresh&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Refresh token verification failed: \${</span><span class="__shiki_140thh">error</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">message</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 登录流程</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> login</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">credentials</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">sessionMeta</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 验证用户凭证</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> user</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">validateCredentials</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      credentials.username, </span></span>
<span class="line"><span class="__shiki_140thh">      credentials.password</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">user) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Invalid credentials&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 生成令牌对</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> accessToken</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">generateAccessToken</span><span class="__shiki_140thh">(user, sessionMeta);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> refreshToken</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">generateRefreshToken</span><span class="__shiki_140thh">(user.id);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      accessToken,</span></span>
<span class="line"><span class="__shiki_140thh">      refreshToken,</span></span>
<span class="line"><span class="__shiki_140thh">      tokenType: </span><span class="__shiki_mdbnqw">&#39;Bearer&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      expiresIn: </span><span class="__shiki_dzsirb">15</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 15分钟</span></span>
<span class="line"><span class="__shiki_140thh">      user: {</span></span>
<span class="line"><span class="__shiki_140thh">        id: user.id,</span></span>
<span class="line"><span class="__shiki_140thh">        username: user.username,</span></span>
<span class="line"><span class="__shiki_140thh">        email: user.email,</span></span>
<span class="line"><span class="__shiki_140thh">        roles: user.roles</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 刷新令牌</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> refreshTokens</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">refreshToken</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> decoded</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">verifyRefreshToken</span><span class="__shiki_140thh">(refreshToken);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取用户信息（从数据库或缓存）</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> user</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getUserById</span><span class="__shiki_140thh">(decoded.sub);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">user) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;User not found&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 生成新的令牌对</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> newAccessToken</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">generateAccessToken</span><span class="__shiki_140thh">(user);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> newRefreshToken</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">generateRefreshToken</span><span class="__shiki_140thh">(user.id);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      accessToken: newAccessToken,</span></span>
<span class="line"><span class="__shiki_140thh">      refreshToken: newRefreshToken,</span></span>
<span class="line"><span class="__shiki_140thh">      tokenType: </span><span class="__shiki_mdbnqw">&#39;Bearer&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      expiresIn: </span><span class="__shiki_dzsirb">15</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h5 id="_3-2-2-中间件实现" tabindex="-1">3.2.2 中间件实现 <a class="header-anchor" href="#_3-2-2-中间件实现" aria-label="Permalink to &quot;3.2.2 中间件实现&quot;">​</a></h5><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Express.js 中间件</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> statelessAuthMiddleware</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">authService</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">next</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 从请求头提取令牌</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> authHeader</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> req.headers.authorization;</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">authHeader </span><span class="__shiki_1itgoe">||</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">authHeader.</span><span class="__shiki_1t8gfj">startsWith</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Bearer &#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">401</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        error: </span><span class="__shiki_mdbnqw">&#39;Authentication required&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        code: </span><span class="__shiki_mdbnqw">&#39;MISSING_TOKEN&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> token</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> authHeader.</span><span class="__shiki_1t8gfj">substring</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">7</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 2. 验证令牌</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> decoded</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> authService.</span><span class="__shiki_1t8gfj">verifyAccessToken</span><span class="__shiki_140thh">(token);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 3. 将用户信息附加到请求对象</span></span>
<span class="line"><span class="__shiki_140thh">      req.user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> decoded.user;</span></span>
<span class="line"><span class="__shiki_140thh">      req.session </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> decoded.session;</span></span>
<span class="line"><span class="__shiki_140thh">      req.token </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        jti: decoded.jti,</span></span>
<span class="line"><span class="__shiki_140thh">        exp: decoded.exp,</span></span>
<span class="line"><span class="__shiki_140thh">        iat: decoded.iat</span></span>
<span class="line"><span class="__shiki_140thh">      };</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 4. 可选：检查令牌是否在撤销列表中（如果实现了撤销机制）</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">await</span><span class="__shiki_140thh"> authService.</span><span class="__shiki_1t8gfj">isTokenRevoked</span><span class="__shiki_140thh">(decoded.jti)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">401</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          error: </span><span class="__shiki_mdbnqw">&#39;Token revoked&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          code: </span><span class="__shiki_mdbnqw">&#39;TOKEN_REVOKED&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1t8gfj">      next</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 5. 处理各种验证错误</span></span>
<span class="line"><span class="__shiki_1itgoe">      let</span><span class="__shiki_140thh"> statusCode </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 401</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      let</span><span class="__shiki_140thh"> errorCode </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;INVALID_TOKEN&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (error.name </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;TokenExpiredError&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        errorCode </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;TOKEN_EXPIRED&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (error.name </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;JsonWebTokenError&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        errorCode </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;MALFORMED_TOKEN&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(statusCode).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        error: </span><span class="__shiki_mdbnqw">&#39;Authentication failed&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        code: errorCode,</span></span>
<span class="line"><span class="__shiki_140thh">        message: error.message</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 角色授权中间件</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> requireRole</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">roles</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">next</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">req.user) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">401</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({ error: </span><span class="__shiki_mdbnqw">&#39;Authentication required&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> userRoles</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> req.user.roles </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> hasRequiredRole</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Array.</span><span class="__shiki_1t8gfj">isArray</span><span class="__shiki_140thh">(roles) </span></span>
<span class="line"><span class="__shiki_1itgoe">      ?</span><span class="__shiki_140thh"> roles.</span><span class="__shiki_1t8gfj">some</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">role</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> userRoles.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(role))</span></span>
<span class="line"><span class="__shiki_1itgoe">      :</span><span class="__shiki_140thh"> userRoles.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(roles);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">hasRequiredRole) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">403</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        error: </span><span class="__shiki_mdbnqw">&#39;Insufficient permissions&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        code: </span><span class="__shiki_mdbnqw">&#39;INSUFFICIENT_ROLE&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    next</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 权限检查中间件</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> requirePermission</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">permission</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">next</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">req.user) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">401</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({ error: </span><span class="__shiki_mdbnqw">&#39;Authentication required&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> userPermissions</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> req.user.permissions </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> hasPermission</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> userPermissions.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(permission);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">hasPermission) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">403</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        error: </span><span class="__shiki_mdbnqw">&#39;Insufficient permissions&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        code: </span><span class="__shiki_mdbnqw">&#39;INSUFFICIENT_PERMISSION&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    next</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h2 id="四、高级无状态会话模式" tabindex="-1">四、高级无状态会话模式 <a class="header-anchor" href="#四、高级无状态会话模式" aria-label="Permalink to &quot;四、高级无状态会话模式&quot;">​</a></h2><h4 id="_1-双重令牌模式-access-token-refresh-token" tabindex="-1">1. 双重令牌模式（Access Token + Refresh Token） <a class="header-anchor" href="#_1-双重令牌模式-access-token-refresh-token" aria-label="Permalink to &quot;1. 双重令牌模式（Access Token + Refresh Token）&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> DualTokenStrategy</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">authService</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.authService </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> authService;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.refreshTokens </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">(); </span><span class="__shiki_21nrsd">// 简单存储，生产环境用Redis</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 登录返回双令牌</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> login</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">userCredentials</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">sessionMeta</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> tokens</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.authService.</span><span class="__shiki_1t8gfj">login</span><span class="__shiki_140thh">(userCredentials, sessionMeta);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 存储刷新令牌（用于撤销）</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.refreshTokens.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(tokens.refreshToken, {</span></span>
<span class="line"><span class="__shiki_140thh">      userId: tokens.user.id,</span></span>
<span class="line"><span class="__shiki_140thh">      createdAt: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">      device: sessionMeta.device</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> tokens;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 使用刷新令牌获取新访问令牌</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> refreshAccessToken</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">refreshToken</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查刷新令牌是否有效</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.refreshTokens.</span><span class="__shiki_1t8gfj">has</span><span class="__shiki_140thh">(refreshToken)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Invalid refresh token&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> tokenInfo</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.refreshTokens.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(refreshToken);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 生成新令牌</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> newTokens</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.authService.</span><span class="__shiki_1t8gfj">refreshTokens</span><span class="__shiki_140thh">(refreshToken);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 更新刷新令牌存储</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.refreshTokens.</span><span class="__shiki_1t8gfj">delete</span><span class="__shiki_140thh">(refreshToken);</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.refreshTokens.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(newTokens.refreshToken, {</span></span>
<span class="line"><span class="__shiki_1itgoe">      ...</span><span class="__shiki_140thh">tokenInfo,</span></span>
<span class="line"><span class="__shiki_140thh">      refreshedAt: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> newTokens;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 撤销令牌（登出）</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> logout</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">accessToken</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">refreshToken</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 解析访问令牌获取 jti</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> decoded</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.authService.</span><span class="__shiki_1t8gfj">verifyAccessToken</span><span class="__shiki_140thh">(accessToken);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 将 jti 加入撤销列表</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">revokeToken</span><span class="__shiki_140thh">(decoded.jti);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 删除刷新令牌</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (refreshToken) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.refreshTokens.</span><span class="__shiki_1t8gfj">delete</span><span class="__shiki_140thh">(refreshToken);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 即使令牌无效也尝试删除刷新令牌</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (refreshToken) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.refreshTokens.</span><span class="__shiki_1t8gfj">delete</span><span class="__shiki_140thh">(refreshToken);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-分布式会话黑名单" tabindex="-1">2. 分布式会话黑名单 <a class="header-anchor" href="#_2-分布式会话黑名单" aria-label="Permalink to &quot;2. 分布式会话黑名单&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TokenRevocationService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">redisClient</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.redis </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redisClient;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.prefix </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;revoked:&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 撤销令牌</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> revokeToken</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">jti</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">expiresIn</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 24</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 将 jti 存入 Redis，设置过期时间（自动清理）</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.redis.</span><span class="__shiki_1t8gfj">setex</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">      \`\${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">prefix</span><span class="__shiki_mdbnqw">}\${</span><span class="__shiki_140thh">jti</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">      expiresIn, </span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;revoked&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 检查令牌是否被撤销</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> isTokenRevoked</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">jti</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.redis.</span><span class="__shiki_1t8gfj">exists</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">prefix</span><span class="__shiki_mdbnqw">}\${</span><span class="__shiki_140thh">jti</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">===</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 批量撤销用户的所有令牌</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> revokeAllUserTokens</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 生产环境中需要维护用户-令牌的映射关系</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 这里简化实现</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> userTokensKey</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> \`user_tokens:\${</span><span class="__shiki_140thh">userId</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> tokens</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.redis.</span><span class="__shiki_1t8gfj">smembers</span><span class="__shiki_140thh">(userTokensKey);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> pipeline</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.redis.</span><span class="__shiki_1t8gfj">pipeline</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    tokens.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">jti</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      pipeline.</span><span class="__shiki_1t8gfj">setex</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">prefix</span><span class="__shiki_mdbnqw">}\${</span><span class="__shiki_140thh">jti</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">24</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;revoked&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    pipeline.</span><span class="__shiki_1t8gfj">del</span><span class="__shiki_140thh">(userTokensKey);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> pipeline.</span><span class="__shiki_1t8gfj">exec</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-安全增强措施" tabindex="-1">3. 安全增强措施 <a class="header-anchor" href="#_3-安全增强措施" aria-label="Permalink to &quot;3. 安全增强措施&quot;">​</a></h4><h5 id="_4-3-1-防止重放攻击" tabindex="-1">4.3.1 防止重放攻击 <a class="header-anchor" href="#_4-3-1-防止重放攻击" aria-label="Permalink to &quot;4.3.1 防止重放攻击&quot;">​</a></h5><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ReplayProtection</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">redisClient</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.redis </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redisClient;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.windowSize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 5分钟窗口</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 检查 nonce 防止重放</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> checkNonce</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">jti</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">timestamp</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> key</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> \`nonce:\${</span><span class="__shiki_140thh">jti</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查是否已经使用过</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> used</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.redis.</span><span class="__shiki_1t8gfj">exists</span><span class="__shiki_140thh">(key);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (used) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Possible replay attack detected&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查时间戳是否在允许范围内</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> now</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">floor</span><span class="__shiki_140thh">(Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (Math.</span><span class="__shiki_1t8gfj">abs</span><span class="__shiki_140thh">(timestamp </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> now) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.windowSize) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Timestamp outside allowed window&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 记录已使用的 nonce</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.redis.</span><span class="__shiki_1t8gfj">setex</span><span class="__shiki_140thh">(key, </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.windowSize </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;used&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="五、客户端实现" tabindex="-1">五、客户端实现 <a class="header-anchor" href="#五、客户端实现" aria-label="Permalink to &quot;五、客户端实现&quot;">​</a></h2><h4 id="_1-前端令牌管理" tabindex="-1">1. 前端令牌管理 <a class="header-anchor" href="#_1-前端令牌管理" aria-label="Permalink to &quot;1. 前端令牌管理&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TokenManager</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.accessToken </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.refreshToken </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.refreshPromise </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 存储令牌</span></span>
<span class="line"><span class="__shiki_1t8gfj">  setTokens</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">accessToken</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">refreshToken</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.accessToken </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> accessToken;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.refreshToken </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> refreshToken;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 安全存储（根据环境选择）</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">isBrowser</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 建议使用 HttpOnly cookies 存储刷新令牌</span></span>
<span class="line"><span class="__shiki_140thh">      localStorage.</span><span class="__shiki_1t8gfj">setItem</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;accessToken&#39;</span><span class="__shiki_140thh">, accessToken);</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 刷新令牌应该存储在更安全的地方</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">setSecureRefreshToken</span><span class="__shiki_140thh">(refreshToken);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 获取访问令牌（自动处理刷新）</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> getAccessToken</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.accessToken) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查令牌是否即将过期</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">isTokenExpiringSoon</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.accessToken)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">refreshTokens</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.accessToken;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 刷新令牌</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> refreshTokens</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 防止并发刷新</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.refreshPromise) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.refreshPromise;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.refreshPromise </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/api/auth/refresh&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">          method: </span><span class="__shiki_mdbnqw">&#39;POST&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          headers: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;Content-Type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;application/json&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          },</span></span>
<span class="line"><span class="__shiki_140thh">          body: </span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">            refreshToken: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.refreshToken</span></span>
<span class="line"><span class="__shiki_140thh">          })</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">response.ok) {</span></span>
<span class="line"><span class="__shiki_1itgoe">          throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Refresh failed&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> data</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> response.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">setTokens</span><span class="__shiki_140thh">(data.accessToken, data.refreshToken);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> data.accessToken;</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 刷新失败，清除令牌</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">clearTokens</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">finally</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.refreshPromise </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    })();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.refreshPromise;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 检查令牌是否即将过期</span></span>
<span class="line"><span class="__shiki_1t8gfj">  isTokenExpiringSoon</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">token</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">threshold</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_140thh">) { </span><span class="__shiki_21nrsd">// 5分钟阈值</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> payload</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">parse</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">atob</span><span class="__shiki_140thh">(token.</span><span class="__shiki_1t8gfj">split</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;.&#39;</span><span class="__shiki_140thh">)[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">]));</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> now</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">floor</span><span class="__shiki_140thh">(Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> (payload.exp </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> now) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> threshold;</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 清除令牌</span></span>
<span class="line"><span class="__shiki_1t8gfj">  clearTokens</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.accessToken </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.refreshToken </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">isBrowser</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_140thh">      localStorage.</span><span class="__shiki_1t8gfj">removeItem</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;accessToken&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">clearSecureRefreshToken</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-axios-请求拦截器" tabindex="-1">2. Axios 请求拦截器 <a class="header-anchor" href="#_2-axios-请求拦截器" aria-label="Permalink to &quot;2. Axios 请求拦截器&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 配置 Axios 自动添加令牌和刷新逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> configureAxios</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">tokenManager</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> axiosInstance</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> axios.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 请求拦截器</span></span>
<span class="line"><span class="__shiki_140thh">  axiosInstance.interceptors.request.</span><span class="__shiki_1t8gfj">use</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">config</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> token</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> tokenManager.</span><span class="__shiki_1t8gfj">getAccessToken</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (token) {</span></span>
<span class="line"><span class="__shiki_140thh">        config.headers.Authorization </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> \`Bearer \${</span><span class="__shiki_140thh">token</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> config;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">reject</span><span class="__shiki_140thh">(error)</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 响应拦截器 - 处理 401 错误</span></span>
<span class="line"><span class="__shiki_140thh">  axiosInstance.interceptors.response.</span><span class="__shiki_1t8gfj">use</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_1jdh33">response</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> response,</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> originalRequest</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> error.config;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (error.response?.status </span><span class="__shiki_1itgoe">===</span><span class="__shiki_dzsirb"> 401</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">originalRequest._retry) {</span></span>
<span class="line"><span class="__shiki_140thh">        originalRequest._retry </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 尝试刷新令牌</span></span>
<span class="line"><span class="__shiki_1itgoe">          await</span><span class="__shiki_140thh"> tokenManager.</span><span class="__shiki_1t8gfj">refreshTokens</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_21nrsd">          // 重新发送原始请求</span></span>
<span class="line"><span class="__shiki_1itgoe">          const</span><span class="__shiki_dzsirb"> token</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> tokenManager.</span><span class="__shiki_1t8gfj">getAccessToken</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">          originalRequest.headers.Authorization </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> \`Bearer \${</span><span class="__shiki_140thh">token</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">          return</span><span class="__shiki_1t8gfj"> axiosInstance</span><span class="__shiki_140thh">(originalRequest);</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (refreshError) {</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 刷新失败，跳转到登录页</span></span>
<span class="line"><span class="__shiki_140thh">          tokenManager.</span><span class="__shiki_1t8gfj">clearTokens</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">          window.location.href </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;/login&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">          return</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">reject</span><span class="__shiki_140thh">(refreshError);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">reject</span><span class="__shiki_140thh">(error);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> axiosInstance;</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h2 id="六、性能优化与最佳实践" tabindex="-1">六、性能优化与最佳实践 <a class="header-anchor" href="#六、性能优化与最佳实践" aria-label="Permalink to &quot;六、性能优化与最佳实践&quot;">​</a></h2><h4 id="_1-性能优化策略" tabindex="-1">1. 性能优化策略 <a class="header-anchor" href="#_1-性能优化策略" aria-label="Permalink to &quot;1. 性能优化策略&quot;">​</a></h4><h5 id="_6-1-1-jwt-大小优化" tabindex="-1">6.1.1 JWT 大小优化 <a class="header-anchor" href="#_6-1-1-jwt-大小优化" aria-label="Permalink to &quot;6.1.1 JWT 大小优化&quot;">​</a></h5><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 最小化 payload 设计</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> minimalPayload</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  sub: </span><span class="__shiki_mdbnqw">&quot;user123&quot;</span><span class="__shiki_140thh">,           </span><span class="__shiki_21nrsd">// 用户ID</span></span>
<span class="line"><span class="__shiki_140thh">  r: [</span><span class="__shiki_mdbnqw">&quot;u&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;p&quot;</span><span class="__shiki_140thh">],            </span><span class="__shiki_21nrsd">// 压缩的角色编码: u=user, p=premium</span></span>
<span class="line"><span class="__shiki_140thh">  p: [</span><span class="__shiki_mdbnqw">&quot;r:p&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;w:p&quot;</span><span class="__shiki_140thh">],        </span><span class="__shiki_21nrsd">// 压缩的权限编码</span></span>
<span class="line"><span class="__shiki_140thh">  iat: </span><span class="__shiki_dzsirb">1705305600</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  exp: </span><span class="__shiki_dzsirb">1705309200</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  jti: </span><span class="__shiki_mdbnqw">&quot;abc123&quot;</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// vs 完整 payload</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> fullPayload</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  sub: </span><span class="__shiki_mdbnqw">&quot;user123&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  user: {</span></span>
<span class="line"><span class="__shiki_140thh">    id: </span><span class="__shiki_mdbnqw">&quot;user123&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    username: </span><span class="__shiki_mdbnqw">&quot;john_doe&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    email: </span><span class="__shiki_mdbnqw">&quot;john@example.com&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    roles: [</span><span class="__shiki_mdbnqw">&quot;user&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;premium&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">    permissions: [</span><span class="__shiki_mdbnqw">&quot;read:profile&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;write:posts&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  iat: </span><span class="__shiki_dzsirb">1705305600</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  exp: </span><span class="__shiki_dzsirb">1705309200</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  jti: </span><span class="__shiki_mdbnqw">&quot;abc123&quot;</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h5 id="_6-1-2-缓存用户信息" tabindex="-1">6.1.2 缓存用户信息 <a class="header-anchor" href="#_6-1-2-缓存用户信息" aria-label="Permalink to &quot;6.1.2 缓存用户信息&quot;">​</a></h5><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> UserInfoCache</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">redisClient</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">ttl</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 300</span><span class="__shiki_140thh">) { </span><span class="__shiki_21nrsd">// 5分钟缓存</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.redis </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redisClient;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.ttl </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ttl;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 从 JWT 获取基础信息，从缓存获取完整信息</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> enrichUserInfo</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">jwtPayload</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> cacheKey</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> \`user:\${</span><span class="__shiki_140thh">jwtPayload</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">sub</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 尝试从缓存获取</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> userInfo </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.redis.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(cacheKey);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">userInfo) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 缓存未命中，从数据库获取</span></span>
<span class="line"><span class="__shiki_140thh">      userInfo </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">fetchUserFromDB</span><span class="__shiki_140thh">(jwtPayload.sub);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 存入缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.redis.</span><span class="__shiki_1t8gfj">setex</span><span class="__shiki_140thh">(cacheKey, </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.ttl, </span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">(userInfo));</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      userInfo </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">parse</span><span class="__shiki_140thh">(userInfo);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      ...</span><span class="__shiki_140thh">jwtPayload.user, </span><span class="__shiki_21nrsd">// JWT 中的基础信息</span></span>
<span class="line"><span class="__shiki_1itgoe">      ...</span><span class="__shiki_140thh">userInfo         </span><span class="__shiki_21nrsd">// 缓存中的完整信息</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-安全最佳实践" tabindex="-1">2. 安全最佳实践 <a class="header-anchor" href="#_2-安全最佳实践" aria-label="Permalink to &quot;2. 安全最佳实践&quot;">​</a></h4><h5 id="_6-2-1-令牌安全存储" tabindex="-1">6.2.1 令牌安全存储 <a class="header-anchor" href="#_6-2-1-令牌安全存储" aria-label="Permalink to &quot;6.2.1 令牌安全存储&quot;">​</a></h5><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 安全的令牌存储策略</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> SecureTokenStorage</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 访问令牌 - 内存存储或 localStorage</span></span>
<span class="line"><span class="__shiki_1itgoe">  static</span><span class="__shiki_1t8gfj"> setAccessToken</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">token</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">supportsLocalStorage</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_140thh">      localStorage.</span><span class="__shiki_1t8gfj">setItem</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;accessToken&#39;</span><span class="__shiki_140thh">, token);</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 内存存储（页面刷新会丢失）</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.memoryToken </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> token;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 刷新令牌 - 更安全的存储</span></span>
<span class="line"><span class="__shiki_1itgoe">  static</span><span class="__shiki_1t8gfj"> setRefreshToken</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">token</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 方案1: HttpOnly Cookie（最安全）</span></span>
<span class="line"><span class="__shiki_140thh">    document.cookie </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> \`refreshToken=\${</span><span class="__shiki_140thh">token</span><span class="__shiki_mdbnqw">}; HttpOnly; Secure; SameSite=Strict; Max-Age=604800\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 方案2: 内存存储（刷新会丢失，需要重新登录）</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.memoryRefreshToken </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> token;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 清除令牌</span></span>
<span class="line"><span class="__shiki_1itgoe">  static</span><span class="__shiki_1t8gfj"> clearTokens</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    localStorage.</span><span class="__shiki_1t8gfj">removeItem</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;accessToken&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    document.cookie </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT;&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.memoryToken </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.memoryRefreshToken </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="七、监控与调试" tabindex="-1">七、监控与调试 <a class="header-anchor" href="#七、监控与调试" aria-label="Permalink to &quot;七、监控与调试&quot;">​</a></h2><h4 id="会话监控" tabindex="-1">会话监控 <a class="header-anchor" href="#会话监控" aria-label="Permalink to &quot;会话监控&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> SessionMonitor</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.sessions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 记录会话活动</span></span>
<span class="line"><span class="__shiki_1t8gfj">  trackSessionActivity</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">jwtPayload</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">requestInfo</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> sessionId</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> jwtPayload.jti;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> session</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.sessions.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(sessionId) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      userId: jwtPayload.sub,</span></span>
<span class="line"><span class="__shiki_140thh">      loginTime: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(jwtPayload.iat </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      lastActivity: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">      requestCount: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      devices: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Set</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">      endpoints: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Set</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    session.lastActivity </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    session.requestCount</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    session.devices.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(requestInfo.userAgent);</span></span>
<span class="line"><span class="__shiki_140thh">    session.endpoints.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(requestInfo.endpoint);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.sessions.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(sessionId, session);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 定期清理过期会话</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cleanupExpiredSessions</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 获取用户活跃会话</span></span>
<span class="line"><span class="__shiki_1t8gfj">  getUserActiveSessions</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> Array.</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.sessions.</span><span class="__shiki_1t8gfj">values</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">session</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> session.userId </span><span class="__shiki_1itgoe">===</span><span class="__shiki_140thh"> userId)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">a</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">b</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> b.lastActivity </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> a.lastActivity);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="八、总结" tabindex="-1">八、总结 <a class="header-anchor" href="#八、总结" aria-label="Permalink to &quot;八、总结&quot;">​</a></h2><p>JWT 无状态会话为现代分布式系统提供了强大的认证解决方案：</p><h4 id="_1-核心优势" tabindex="-1">1. 核心优势 <a class="header-anchor" href="#_1-核心优势" aria-label="Permalink to &quot;1. 核心优势&quot;">​</a></h4><ul><li><strong>真正的无状态</strong>：服务器不需要维护会话存储</li><li><strong>水平扩展友好</strong>：任何服务器都可以处理任何请求</li><li><strong>性能优异</strong>：减少数据库查询，直接验证令牌</li><li><strong>跨域支持</strong>：天然支持微服务和跨域场景</li></ul><h4 id="_2-关键挑战与解决方案" tabindex="-1">2. 关键挑战与解决方案 <a class="header-anchor" href="#_2-关键挑战与解决方案" aria-label="Permalink to &quot;2. 关键挑战与解决方案&quot;">​</a></h4><ul><li><strong>令牌撤销</strong>：使用 jti + Redis 黑名单</li><li><strong>安全性</strong>：短期令牌 + 刷新令牌机制</li><li><strong>性能</strong>：优化 JWT 大小，合理使用缓存</li><li><strong>移动端支持</strong>：标准的 Bearer Token 方案</li></ul><h4 id="_3-适用场景" tabindex="-1">3. 适用场景 <a class="header-anchor" href="#_3-适用场景" aria-label="Permalink to &quot;3. 适用场景&quot;">​</a></h4><ul><li>微服务架构</li><li>需要水平扩展的 Web 应用</li><li>移动应用后端</li><li>跨域单点登录 (SSO)</li><li>API Gateway 认证</li></ul>`,55)])])}const d=a(p,[["render",h]]);export{r as __pageData,d as default};
