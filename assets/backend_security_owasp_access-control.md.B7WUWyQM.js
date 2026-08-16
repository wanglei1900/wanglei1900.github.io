import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"网络安全-OWASP访问控制全面学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/security/owasp/access-control.md","filePath":"backend/security/owasp/access-control.md"}'),p={name:"backend/security/owasp/access-control.md"};function h(l,s,c,t,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="网络安全-owasp访问控制全面学习笔记" tabindex="-1">网络安全-OWASP访问控制全面学习笔记 <a class="header-anchor" href="#网络安全-owasp访问控制全面学习笔记" aria-label="Permalink to &quot;网络安全-OWASP访问控制全面学习笔记&quot;">​</a></h1><h2 id="_1-访问控制基础概念" tabindex="-1">1. 访问控制基础概念 <a class="header-anchor" href="#_1-访问控制基础概念" aria-label="Permalink to &quot;1. 访问控制基础概念&quot;">​</a></h2><h3 id="_1-1-访问控制定义与重要性" tabindex="-1">1.1 访问控制定义与重要性 <a class="header-anchor" href="#_1-1-访问控制定义与重要性" aria-label="Permalink to &quot;1.1 访问控制定义与重要性&quot;">​</a></h3><p>访问控制是<strong>信息安全的核心支柱</strong>，在OWASP Top 10 2021中位列第1。它确保系统资源只能被授权用户以授权方式访问，是防止垂直越权和水平越权的关键防线。</p><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[访问控制体系] --&gt; B[身份认证]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[授权管理]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[审计追踪]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[你是谁]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B2[证明身份]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[你能做什么]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C2[权限级别]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[做了什么]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D2[何时操作]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    E[访问控制失效] --&gt; F[数据泄露]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; G[权限提升]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; H[业务风险]</span></span></code></pre></div><h3 id="_1-2-访问控制三要素" tabindex="-1">1.2 访问控制三要素 <a class="header-anchor" href="#_1-2-访问控制三要素" aria-label="Permalink to &quot;1.2 访问控制三要素&quot;">​</a></h3><table tabindex="0"><thead><tr><th>要素</th><th>描述</th><th>实现机制</th></tr></thead><tbody><tr><td><strong>身份认证</strong></td><td>验证用户身份真实性</td><td>用户名/密码、多因素认证、生物识别</td></tr><tr><td><strong>授权</strong></td><td>确定用户访问权限</td><td>角色权限、资源权限、操作权限</td></tr><tr><td><strong>审计</strong></td><td>记录访问行为日志</td><td>操作日志、安全监控、合规报告</td></tr></tbody></table><h2 id="_2-访问控制漏洞类型深度分析" tabindex="-1">2. 访问控制漏洞类型深度分析 <a class="header-anchor" href="#_2-访问控制漏洞类型深度分析" aria-label="Permalink to &quot;2. 访问控制漏洞类型深度分析&quot;">​</a></h2><h3 id="_2-1-垂直权限提升" tabindex="-1">2.1 垂直权限提升 <a class="header-anchor" href="#_2-1-垂直权限提升" aria-label="Permalink to &quot;2.1 垂直权限提升&quot;">​</a></h3><h4 id="_2-1-1-典型攻击场景" tabindex="-1">2.1.1 典型攻击场景 <a class="header-anchor" href="#_2-1-1-典型攻击场景" aria-label="Permalink to &quot;2.1.1 典型攻击场景&quot;">​</a></h4><div class="language-http vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">http</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 普通用户尝试访问管理员功能</span></span>
<span class="line"><span class="__shiki_1itgoe">GET</span><span class="__shiki_140thh"> /admin/user-management </span><span class="__shiki_1itgoe">HTTP</span><span class="__shiki_140thh">/</span><span class="__shiki_dzsirb">1.1</span></span>
<span class="line"><span class="__shiki_17hn0y">Cookie</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> session=user_session_token</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 直接访问管理API端点</span></span>
<span class="line"><span class="__shiki_1itgoe">POST</span><span class="__shiki_140thh"> /api/admin/delete-user </span><span class="__shiki_1itgoe">HTTP</span><span class="__shiki_140thh">/</span><span class="__shiki_dzsirb">1.1</span></span>
<span class="line"><span class="__shiki_17hn0y">Content-Type</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> application/json</span></span>
<span class="line"><span class="__shiki_140thh">{</span><span class="__shiki_dzsirb">&quot;userId&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">123</span><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-1-2-权限提升技术" tabindex="-1">2.1.2 权限提升技术 <a class="header-anchor" href="#_2-1-2-权限提升技术" aria-label="Permalink to &quot;2.1.2 权限提升技术&quot;">​</a></h4><ul><li><strong>直接URL访问</strong>：猜测或发现管理端点</li><li><strong>功能暴露</strong>：前端隐藏但后端可访问的功能</li><li><strong>参数篡改</strong>：修改角色ID或权限级别参数</li></ul><h3 id="_2-2-水平权限提升" tabindex="-1">2.2 水平权限提升 <a class="header-anchor" href="#_2-2-水平权限提升" aria-label="Permalink to &quot;2.2 水平权限提升&quot;">​</a></h3><h4 id="_2-2-1-idor漏洞详解" tabindex="-1">2.2.1 IDOR漏洞详解 <a class="header-anchor" href="#_2-2-1-idor漏洞详解" aria-label="Permalink to &quot;2.2.1 IDOR漏洞详解&quot;">​</a></h4><div class="language-http vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">http</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 用户A访问用户B的数据</span></span>
<span class="line"><span class="__shiki_1itgoe">GET</span><span class="__shiki_140thh"> /api/users/123/profile HTTP/1.1  # 用户A只能访问自己的数据（ID=456）</span></span>
<span class="line"><span class="__shiki_17hn0y">Cookie</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> session=user_a_session</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 响应可能泄露敏感信息</span></span>
<span class="line"><span class="__shiki_1itgoe">HTTP</span><span class="__shiki_140thh">/</span><span class="__shiki_dzsirb">1.1</span><span class="__shiki_dzsirb"> 200</span><span class="__shiki_mdbnqw"> OK</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;userId&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">123</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;email&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;userb@example.com&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;ssn&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;123-45-6789&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-2-2-idor变种攻击" tabindex="-1">2.2.2 IDOR变种攻击 <a class="header-anchor" href="#_2-2-2-idor变种攻击" aria-label="Permalink to &quot;2.2.2 IDOR变种攻击&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 不安全的数据访问代码</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> get_user_data</span><span class="__shiki_140thh">(user_id):</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 没有检查当前用户权限</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> db.query(</span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users WHERE id = </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, user_id)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 安全的数据访问代码</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> get_user_data</span><span class="__shiki_140thh">(current_user_id, requested_user_id):</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> current_user_id </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> requested_user_id:</span></span>
<span class="line"><span class="__shiki_1itgoe">        raise</span><span class="__shiki_140thh"> AccessDeniedError(</span><span class="__shiki_mdbnqw">&quot;无权访问该用户数据&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> db.query(</span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users WHERE id = </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, requested_user_id)</span></span></code></pre></div><h3 id="_2-3-上下文相关访问控制失效" tabindex="-1">2.3 上下文相关访问控制失效 <a class="header-anchor" href="#_2-3-上下文相关访问控制失效" aria-label="Permalink to &quot;2.3 上下文相关访问控制失效&quot;">​</a></h3><h4 id="_2-3-1-业务流程绕过" tabindex="-1">2.3.1 业务流程绕过 <a class="header-anchor" href="#_2-3-1-业务流程绕过" aria-label="Permalink to &quot;2.3.1 业务流程绕过&quot;">​</a></h4><div class="language-http vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">http</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 跳过验证步骤直接访问最终步骤</span></span>
<span class="line"><span class="__shiki_1itgoe">POST</span><span class="__shiki_140thh"> /checkout/confirm </span><span class="__shiki_1itgoe">HTTP</span><span class="__shiki_140thh">/</span><span class="__shiki_dzsirb">1.1</span></span>
<span class="line"><span class="__shiki_17hn0y">Content-Type</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> application/json</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;paymentMethod&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;credit_card&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;shippingAddress&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;123 Main St&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 正常流程应该为：</span></span>
<span class="line"><span class="__shiki_140thh"># </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">. POST /checkout/cart</span></span>
<span class="line"><span class="__shiki_140thh"># </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">. POST /checkout/shipping  </span></span>
<span class="line"><span class="__shiki_140thh"># </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">. POST /checkout/payment</span></span>
<span class="line"><span class="__shiki_140thh"># </span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">. POST /checkout/confirm</span></span></code></pre></div><h2 id="_3-访问控制设计模式" tabindex="-1">3. 访问控制设计模式 <a class="header-anchor" href="#_3-访问控制设计模式" aria-label="Permalink to &quot;3. 访问控制设计模式&quot;">​</a></h2><h3 id="_3-1-基于角色的访问控制-rbac" tabindex="-1">3.1 基于角色的访问控制（RBAC） <a class="header-anchor" href="#_3-1-基于角色的访问控制-rbac" aria-label="Permalink to &quot;3.1 基于角色的访问控制（RBAC）&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[用户 Users] --&gt; B[角色分配]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[角色 Roles]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[权限分配]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[权限 Permissions]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; F[操作 Operations]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; G[资源 Resources]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    subgraph &quot;RBAC层次结构&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    H[超级管理员] --&gt; I[部门管理员]</span></span>
<span class="line"><span class="__shiki_140thh">    I --&gt; J[普通用户]</span></span>
<span class="line"><span class="__shiki_140thh">    J --&gt; K[只读用户]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span></code></pre></div><h4 id="_3-1-1-rbac数据库设计" tabindex="-1">3.1.1 RBAC数据库设计 <a class="header-anchor" href="#_3-1-1-rbac数据库设计" aria-label="Permalink to &quot;3.1.1 RBAC数据库设计&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 用户表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> users</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh"> AUTO_INCREMENT,</span></span>
<span class="line"><span class="__shiki_140thh">    username </span><span class="__shiki_1itgoe">VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">UNIQUE</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    email </span><span class="__shiki_1itgoe">VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">UNIQUE</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    status</span><span class="__shiki_140thh"> ENUM(</span><span class="__shiki_mdbnqw">&#39;active&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;inactive&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">DEFAULT</span><span class="__shiki_mdbnqw"> &#39;active&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_140thh"> CURRENT_TIMESTAMP</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 角色表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> roles</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh"> AUTO_INCREMENT,</span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_1itgoe"> VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">UNIQUE</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    description</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    hierarchy_level </span><span class="__shiki_1itgoe">INT</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 权限表  </span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> permissions</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh"> AUTO_INCREMENT,</span></span>
<span class="line"><span class="__shiki_1itgoe">    resource</span><span class="__shiki_1itgoe"> VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    action</span><span class="__shiki_140thh"> ENUM(</span><span class="__shiki_mdbnqw">&#39;create&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;read&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;update&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;delete&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;manage&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    description</span><span class="__shiki_1itgoe"> TEXT</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 关联表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> user_roles</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    user_id </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    role_id </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    assigned_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_140thh"> CURRENT_TIMESTAMP,</span></span>
<span class="line"><span class="__shiki_1itgoe">    PRIMARY KEY</span><span class="__shiki_140thh"> (user_id, role_id),</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOREIGN KEY</span><span class="__shiki_140thh"> (user_id) </span><span class="__shiki_1itgoe">REFERENCES</span><span class="__shiki_140thh"> users(id) </span><span class="__shiki_1itgoe">ON DELETE CASCADE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOREIGN KEY</span><span class="__shiki_140thh"> (role_id) </span><span class="__shiki_1itgoe">REFERENCES</span><span class="__shiki_140thh"> roles(id) </span><span class="__shiki_1itgoe">ON DELETE CASCADE</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> role_permissions</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    role_id </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    permission_id </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    PRIMARY KEY</span><span class="__shiki_140thh"> (role_id, permission_id),</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOREIGN KEY</span><span class="__shiki_140thh"> (role_id) </span><span class="__shiki_1itgoe">REFERENCES</span><span class="__shiki_140thh"> roles(id) </span><span class="__shiki_1itgoe">ON DELETE CASCADE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOREIGN KEY</span><span class="__shiki_140thh"> (permission_id) </span><span class="__shiki_1itgoe">REFERENCES</span><span class="__shiki_dzsirb"> permissions</span><span class="__shiki_140thh">(id) </span><span class="__shiki_1itgoe">ON DELETE CASCADE</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h4 id="_3-1-2-rbac实现代码" tabindex="-1">3.1.2 RBAC实现代码 <a class="header-anchor" href="#_3-1-2-rbac实现代码" aria-label="Permalink to &quot;3.1.2 RBAC实现代码&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Component</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> RBACAuthorizationService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> PermissionRepository permissionRepository;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> UserRoleRepository userRoleRepository;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /**</span></span>
<span class="line"><span class="__shiki_21nrsd">     * 检查用户是否具有特定资源的操作权限</span></span>
<span class="line"><span class="__shiki_21nrsd">     */</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> hasPermission</span><span class="__shiki_140thh">(Long </span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">resource</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">action</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        List&lt;</span><span class="__shiki_1itgoe">Permission</span><span class="__shiki_140thh">&gt; userPermissions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> permissionRepository</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">findByUserIdAndResourceAndAction</span><span class="__shiki_140thh">(userId, resource, action);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">userPermissions.</span><span class="__shiki_1t8gfj">isEmpty</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /**</span></span>
<span class="line"><span class="__shiki_21nrsd">     * 基于角色的访问检查</span></span>
<span class="line"><span class="__shiki_21nrsd">     */</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> checkRoleAccess</span><span class="__shiki_140thh">(Long </span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">requiredRole</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        List&lt;</span><span class="__shiki_1itgoe">Role</span><span class="__shiki_140thh">&gt; userRoles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> userRoleRepository.</span><span class="__shiki_1t8gfj">findActiveRolesByUserId</span><span class="__shiki_140thh">(userId);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> userRoles.</span><span class="__shiki_1t8gfj">stream</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">anyMatch</span><span class="__shiki_140thh">(role </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> role.</span><span class="__shiki_1t8gfj">getName</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">equals</span><span class="__shiki_140thh">(requiredRole));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /**</span></span>
<span class="line"><span class="__shiki_21nrsd">     * 获取用户所有权限</span></span>
<span class="line"><span class="__shiki_21nrsd">     */</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> Set&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">getUserPermissions</span><span class="__shiki_140thh">(Long </span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> permissionRepository.</span><span class="__shiki_1t8gfj">findAllByUserId</span><span class="__shiki_140thh">(userId)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">stream</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(permission </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                    permission.</span><span class="__shiki_1t8gfj">getResource</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot;:&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> permission.</span><span class="__shiki_1t8gfj">getAction</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">collect</span><span class="__shiki_140thh">(Collectors.</span><span class="__shiki_1t8gfj">toSet</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-基于属性的访问控制-abac" tabindex="-1">3.2 基于属性的访问控制（ABAC） <a class="header-anchor" href="#_3-2-基于属性的访问控制-abac" aria-label="Permalink to &quot;3.2 基于属性的访问控制（ABAC）&quot;">​</a></h3><h4 id="_3-2-1-abac策略引擎" tabindex="-1">3.2.1 ABAC策略引擎 <a class="header-anchor" href="#_3-2-1-abac策略引擎" aria-label="Permalink to &quot;3.2.1 ABAC策略引擎&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ABACPolicyEngine</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.policies </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> add_policy</span><span class="__shiki_140thh">(self, policy):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;添加访问控制策略&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.policies.append(policy)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> evaluate_request</span><span class="__shiki_140thh">(self, subject, resource, action, environment</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;评估访问请求&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        environment </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> environment </span><span class="__shiki_1itgoe">or</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> policy </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.policies:</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._matches_policy(policy, subject, resource, action, environment):</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> policy[</span><span class="__shiki_mdbnqw">&#39;effect&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;allow&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_1itgoe">                else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 默认拒绝</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _matches_policy</span><span class="__shiki_140thh">(self, policy, subject, resource, action, environment):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;检查请求是否匹配策略条件&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 检查主体属性</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._check_conditions(policy.get(</span><span class="__shiki_mdbnqw">&#39;subject&#39;</span><span class="__shiki_140thh">, {}), subject):</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 检查资源属性  </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._check_conditions(policy.get(</span><span class="__shiki_mdbnqw">&#39;resource&#39;</span><span class="__shiki_140thh">, {}), resource):</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 检查操作</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_mdbnqw"> &#39;actions&#39;</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> policy </span><span class="__shiki_1itgoe">and</span><span class="__shiki_140thh"> action </span><span class="__shiki_1itgoe">not</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> policy[</span><span class="__shiki_mdbnqw">&#39;actions&#39;</span><span class="__shiki_140thh">]:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 检查环境条件</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._check_conditions(policy.get(</span><span class="__shiki_mdbnqw">&#39;environment&#39;</span><span class="__shiki_140thh">, {}), environment):</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _check_conditions</span><span class="__shiki_140thh">(self, conditions, attributes):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;检查属性条件&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> key, expected_value </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> conditions.items():</span></span>
<span class="line"><span class="__shiki_140thh">            actual_value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> attributes.get(key)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 支持多种条件操作符</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_dzsirb"> isinstance</span><span class="__shiki_140thh">(expected_value, </span><span class="__shiki_dzsirb">dict</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_21nrsd">                # 处理复杂条件 {operator: value}</span></span>
<span class="line"><span class="__shiki_1itgoe">                for</span><span class="__shiki_140thh"> operator, value </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> expected_value.items():</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._apply_operator(operator, actual_value, value):</span></span>
<span class="line"><span class="__shiki_1itgoe">                        return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_1itgoe">            else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">                # 简单相等检查</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> actual_value </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> expected_value:</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _apply_operator</span><span class="__shiki_140thh">(self, operator, actual, expected):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;应用条件操作符&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        operators </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;eq&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">lambda</span><span class="__shiki_140thh"> a, e: a </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> e,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;neq&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">lambda</span><span class="__shiki_140thh"> a, e: a </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> e,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;gt&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">lambda</span><span class="__shiki_140thh"> a, e: a </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> e,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;gte&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">lambda</span><span class="__shiki_140thh"> a, e: a </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> e,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;lt&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">lambda</span><span class="__shiki_140thh"> a, e: a </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> e,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;lte&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">lambda</span><span class="__shiki_140thh"> a, e: a </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_140thh"> e,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;in&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">lambda</span><span class="__shiki_140thh"> a, e: a </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> e,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;contains&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">lambda</span><span class="__shiki_140thh"> a, e: e </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> a </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> a </span><span class="__shiki_1itgoe">else</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> operator </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> operators:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> operators[operator](actual, expected)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ABAC策略示例</span></span>
<span class="line"><span class="__shiki_140thh">policies </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;name&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;工作时间访问策略&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;effect&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;allow&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;subject&quot;</span><span class="__shiki_140thh">: {</span><span class="__shiki_mdbnqw">&quot;department&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;HR&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;resource&quot;</span><span class="__shiki_140thh">: {</span><span class="__shiki_mdbnqw">&quot;type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;employee_records&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;actions&quot;</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;read&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;update&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;environment&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;time&quot;</span><span class="__shiki_140thh">: {</span><span class="__shiki_mdbnqw">&quot;gte&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;09:00&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;lte&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;17:00&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;day_of_week&quot;</span><span class="__shiki_140thh">: {</span><span class="__shiki_mdbnqw">&quot;in&quot;</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;mon&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;tue&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;wed&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;thu&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;fri&quot;</span><span class="__shiki_140thh">]}</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">]</span></span></code></pre></div><h2 id="_4-访问控制防护架构" tabindex="-1">4. 访问控制防护架构 <a class="header-anchor" href="#_4-访问控制防护架构" aria-label="Permalink to &quot;4. 访问控制防护架构&quot;">​</a></h2><h3 id="_4-1-分层防护体系" tabindex="-1">4.1 分层防护体系 <a class="header-anchor" href="#_4-1-分层防护体系" aria-label="Permalink to &quot;4.1 分层防护体系&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[用户请求] --&gt; B[API网关层]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[应用控制器层]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[业务服务层]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[数据访问层]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; F[数据库层]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    subgraph &quot;访问控制防护点&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    B1[网关ACL&lt;br&gt;IP限制/速率限制]</span></span>
<span class="line"><span class="__shiki_140thh">    C1[会话验证&lt;br&gt;CSRF防护]</span></span>
<span class="line"><span class="__shiki_140thh">    D1[业务权限&lt;br&gt;上下文检查]</span></span>
<span class="line"><span class="__shiki_140thh">    E1[数据权限&lt;br&gt;行级安全]</span></span>
<span class="line"><span class="__shiki_140thh">    F1[数据库权限&lt;br&gt;视图/存储过程]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E1</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; F1</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    G[中央授权服务] -.-&gt; B1</span></span>
<span class="line"><span class="__shiki_140thh">    G -.-&gt; C1</span></span>
<span class="line"><span class="__shiki_140thh">    G -.-&gt; D1</span></span>
<span class="line"><span class="__shiki_140thh">    G -.-&gt; E1</span></span></code></pre></div><h3 id="_4-2-中央授权服务设计" tabindex="-1">4.2 中央授权服务设计 <a class="header-anchor" href="#_4-2-中央授权服务设计" aria-label="Permalink to &quot;4.2 中央授权服务设计&quot;">​</a></h3><h4 id="_4-2-1-授权服务架构" tabindex="-1">4.2.1 授权服务架构 <a class="header-anchor" href="#_4-2-1-授权服务架构" aria-label="Permalink to &quot;4.2.1 授权服务架构&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Service</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> CentralAuthorizationService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> PolicyDecisionPoint pdp;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> PolicyAdministrationPoint pap;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> PolicyInformationPoint pip;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /**</span></span>
<span class="line"><span class="__shiki_21nrsd">     * 访问决策入口</span></span>
<span class="line"><span class="__shiki_21nrsd">     */</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> AuthorizationResult </span><span class="__shiki_1t8gfj">checkAccess</span><span class="__shiki_140thh">(AccessRequest </span><span class="__shiki_1jdh33">request</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 1. 收集上下文信息</span></span>
<span class="line"><span class="__shiki_140thh">        Map&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">&gt; context </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pip.</span><span class="__shiki_1t8gfj">gatherContext</span><span class="__shiki_140thh">(request);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 2. 决策点评估</span></span>
<span class="line"><span class="__shiki_140thh">        Decision decision </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pdp.</span><span class="__shiki_1t8gfj">evaluate</span><span class="__shiki_140thh">(request, context);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 3. 记录审计日志</span></span>
<span class="line"><span class="__shiki_140thh">        auditLogger.</span><span class="__shiki_1t8gfj">logAccessAttempt</span><span class="__shiki_140thh">(request, decision);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> AuthorizationResult</span><span class="__shiki_140thh">(decision, </span></span>
<span class="line"><span class="__shiki_140thh">            decision </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> Decision.PERMIT </span><span class="__shiki_1itgoe">?</span><span class="__shiki_mdbnqw"> &quot;Access granted&quot;</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_mdbnqw"> &quot;Access denied&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /**</span></span>
<span class="line"><span class="__shiki_21nrsd">     * 批量权限检查</span></span>
<span class="line"><span class="__shiki_21nrsd">     */</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> Map&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Boolean</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">checkMultipleResources</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            User </span><span class="__shiki_1jdh33">user</span><span class="__shiki_140thh">, List&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">resources</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">action</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> resources.</span><span class="__shiki_1t8gfj">stream</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">collect</span><span class="__shiki_140thh">(Collectors.</span><span class="__shiki_1t8gfj">toMap</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                    resource </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> resource,</span></span>
<span class="line"><span class="__shiki_140thh">                    resource </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_1t8gfj"> checkAccess</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> AccessRequest</span><span class="__shiki_140thh">(user, resource, action))</span></span>
<span class="line"><span class="__shiki_140thh">                        .</span><span class="__shiki_1t8gfj">isAllowed</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                ));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 访问请求对象</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Data</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> AccessRequest</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> User user;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> String resource;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> String action;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> Map&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">&gt; environment;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> Instant timestamp;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> AccessRequest</span><span class="__shiki_140thh">(User </span><span class="__shiki_1jdh33">user</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">resource</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">action</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> user;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.resource </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> resource;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.action </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> action;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.environment </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> HashMap&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.timestamp </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Instant.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_5-具体防护实现" tabindex="-1">5. 具体防护实现 <a class="header-anchor" href="#_5-具体防护实现" aria-label="Permalink to &quot;5. 具体防护实现&quot;">​</a></h2><h3 id="_5-1-服务端访问控制框架" tabindex="-1">5.1 服务端访问控制框架 <a class="header-anchor" href="#_5-1-服务端访问控制框架" aria-label="Permalink to &quot;5.1 服务端访问控制框架&quot;">​</a></h3><h4 id="_5-1-1-spring-security配置" tabindex="-1">5.1.1 Spring Security配置 <a class="header-anchor" href="#_5-1-1-spring-security配置" aria-label="Permalink to &quot;5.1.1 Spring Security配置&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Configuration</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">EnableWebSecurity</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">EnableGlobalMethodSecurity</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">prePostEnabled</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> SecurityConfig</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> WebSecurityConfigurerAdapter</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    protected</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> configure</span><span class="__shiki_140thh">(HttpSecurity </span><span class="__shiki_1jdh33">http</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">throws</span><span class="__shiki_140thh"> Exception {</span></span>
<span class="line"><span class="__shiki_140thh">        http</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 禁用CSRF（如使用无状态API）</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">csrf</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">disable</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 会话管理</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">sessionManagement</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">sessionCreationPolicy</span><span class="__shiki_140thh">(SessionCreationPolicy.STATELESS)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">and</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 授权配置</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">authorizeRequests</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 公开端点</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">antMatchers</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/api/public/**&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;/auth/login&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">permitAll</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 基于角色的访问控制</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">antMatchers</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/api/admin/**&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">hasRole</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ADMIN&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">antMatchers</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/api/manager/**&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">hasAnyRole</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;MANAGER&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;ADMIN&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">antMatchers</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/api/user/**&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">hasRole</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;USER&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 基于权限的访问控制</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">antMatchers</span><span class="__shiki_140thh">(HttpMethod.GET, </span><span class="__shiki_mdbnqw">&quot;/api/reports/**&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                    .</span><span class="__shiki_1t8gfj">hasAuthority</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;REPORT_READ&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">antMatchers</span><span class="__shiki_140thh">(HttpMethod.POST, </span><span class="__shiki_mdbnqw">&quot;/api/reports/**&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                    .</span><span class="__shiki_1t8gfj">hasAuthority</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;REPORT_WRITE&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 任何其他请求需要认证</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">anyRequest</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">authenticated</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">and</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // JWT过滤器</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">addFilterBefore</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">jwtAuthenticationFilter</span><span class="__shiki_140thh">(), </span></span>
<span class="line"><span class="__shiki_140thh">                UsernamePasswordAuthenticationFilter.class)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 异常处理</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">exceptionHandling</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">accessDeniedHandler</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">accessDeniedHandler</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">authenticationEntryPoint</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">authenticationEntryPoint</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Bean</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> MethodSecurityExpressionHandler </span><span class="__shiki_1t8gfj">methodSecurityExpressionHandler</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        DefaultMethodSecurityExpressionHandler handler </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            new</span><span class="__shiki_1t8gfj"> DefaultMethodSecurityExpressionHandler</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        handler.</span><span class="__shiki_1t8gfj">setPermissionEvaluator</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">customPermissionEvaluator</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> handler;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 自定义权限评估器</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Component</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> CustomPermissionEvaluator</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> PermissionEvaluator</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> hasPermission</span><span class="__shiki_140thh">(Authentication </span><span class="__shiki_1jdh33">authentication</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                                Object </span><span class="__shiki_1jdh33">targetDomainObject</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                                Object </span><span class="__shiki_1jdh33">permission</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 基于实例的权限检查</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (targetDomainObject </span><span class="__shiki_1itgoe">instanceof</span><span class="__shiki_140thh"> Ownable) {</span></span>
<span class="line"><span class="__shiki_140thh">            Ownable ownable </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (Ownable) targetDomainObject;</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> ownable.</span><span class="__shiki_1t8gfj">isOwnedBy</span><span class="__shiki_140thh">(authentication.</span><span class="__shiki_1t8gfj">getName</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> hasPermission</span><span class="__shiki_140thh">(Authentication </span><span class="__shiki_1jdh33">authentication</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                                Serializable </span><span class="__shiki_1jdh33">targetId</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                                String </span><span class="__shiki_1jdh33">targetType</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                                Object </span><span class="__shiki_1jdh33">permission</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 基于ID的权限检查</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> authorizationService.</span><span class="__shiki_1t8gfj">checkAccess</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            authentication.</span><span class="__shiki_1t8gfj">getName</span><span class="__shiki_140thh">(), </span></span>
<span class="line"><span class="__shiki_140thh">            targetType, </span></span>
<span class="line"><span class="__shiki_140thh">            targetId.</span><span class="__shiki_1t8gfj">toString</span><span class="__shiki_140thh">(), </span></span>
<span class="line"><span class="__shiki_140thh">            permission.</span><span class="__shiki_1t8gfj">toString</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_5-1-2-方法级安全控制" tabindex="-1">5.1.2 方法级安全控制 <a class="header-anchor" href="#_5-1-2-方法级安全控制" aria-label="Permalink to &quot;5.1.2 方法级安全控制&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">RestController</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">RequestMapping</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/api/users&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> UserController</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">GetMapping</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/{userId}&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">PreAuthorize</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;hasPermission(#userId, &#39;USER&#39;, &#39;READ&#39;)&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> ResponseEntity&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">getUser</span><span class="__shiki_140thh">(@</span><span class="__shiki_1itgoe">PathVariable</span><span class="__shiki_140thh"> Long </span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        User user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> userService.</span><span class="__shiki_1t8gfj">findById</span><span class="__shiki_140thh">(userId);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> ResponseEntity.</span><span class="__shiki_1t8gfj">ok</span><span class="__shiki_140thh">(user);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">PutMapping</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/{userId}&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">PreAuthorize</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;hasPermission(#userId, &#39;USER&#39;, &#39;UPDATE&#39;)&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> ResponseEntity&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">updateUser</span><span class="__shiki_140thh">(@</span><span class="__shiki_1itgoe">PathVariable</span><span class="__shiki_140thh"> Long </span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                                         @</span><span class="__shiki_1itgoe">RequestBody</span><span class="__shiki_140thh"> UserUpdateRequest </span><span class="__shiki_1jdh33">request</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        User updatedUser </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> userService.</span><span class="__shiki_1t8gfj">updateUser</span><span class="__shiki_140thh">(userId, request);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> ResponseEntity.</span><span class="__shiki_1t8gfj">ok</span><span class="__shiki_140thh">(updatedUser);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">DeleteMapping</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/{userId}&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">PreAuthorize</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;hasRole(&#39;ADMIN&#39;) or hasPermission(#userId, &#39;USER&#39;, &#39;DELETE&#39;)&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> ResponseEntity&lt;</span><span class="__shiki_1itgoe">Void</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">deleteUser</span><span class="__shiki_140thh">(@</span><span class="__shiki_1itgoe">PathVariable</span><span class="__shiki_140thh"> Long </span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        userService.</span><span class="__shiki_1t8gfj">deleteUser</span><span class="__shiki_140thh">(userId);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> ResponseEntity.</span><span class="__shiki_1t8gfj">noContent</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">build</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">GetMapping</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/{userId}/documents&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">PostFilter</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;hasPermission(filterObject, &#39;READ&#39;)&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">Document</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">getUserDocuments</span><span class="__shiki_140thh">(@</span><span class="__shiki_1itgoe">PathVariable</span><span class="__shiki_140thh"> Long </span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 返回列表会自动过滤，用户只能看到有权限的文档</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> documentService.</span><span class="__shiki_1t8gfj">findByUserId</span><span class="__shiki_140thh">(userId);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-前端访问控制" tabindex="-1">5.2 前端访问控制 <a class="header-anchor" href="#_5-2-前端访问控制" aria-label="Permalink to &quot;5.2 前端访问控制&quot;">​</a></h3><h4 id="_5-2-1-react权限组件" tabindex="-1">5.2.1 React权限组件 <a class="header-anchor" href="#_5-2-1-react权限组件" aria-label="Permalink to &quot;5.2.1 React权限组件&quot;">​</a></h4><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 权限高阶组件</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> withAuthorization</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">requiredPermissions</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">WrappedComponent</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> WithAuthorization</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> React</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Component</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    render</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">userPermissions</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.props;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> hasRequiredPermissions</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> requiredPermissions.</span><span class="__shiki_1t8gfj">every</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">permission</span><span class="__shiki_1itgoe"> =&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        userPermissions.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(permission)</span></span>
<span class="line"><span class="__shiki_140thh">      );</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">hasRequiredPermissions) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_dzsirb">AccessDenied</span><span class="__shiki_140thh"> /&gt;;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_dzsirb">WrappedComponent</span><span class="__shiki_140thh"> {</span><span class="__shiki_1itgoe">...</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.props} /&gt;;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 权限守卫组件</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> PermissionGuard</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> ({ </span><span class="__shiki_1jdh33">permissions</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">fallback</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">children</span><span class="__shiki_140thh"> }) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">hasPermissions</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> useAuthorization</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_1t8gfj">hasPermissions</span><span class="__shiki_140thh">(permissions)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> fallback;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> children;</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用示例</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> AdminPanel</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> withAuthorization</span><span class="__shiki_140thh">([</span><span class="__shiki_mdbnqw">&#39;USER_MANAGEMENT&#39;</span><span class="__shiki_140thh">])(({ </span><span class="__shiki_1jdh33">users</span><span class="__shiki_140thh"> }) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">h1</span><span class="__shiki_140thh">&gt;用户管理&lt;/</span><span class="__shiki_17hn0y">h1</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_dzsirb">UserList</span><span class="__shiki_1t8gfj"> users</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{users} /&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;/</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 在组件中使用</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> UserManagementPage</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_dzsirb">PermissionGuard</span><span class="__shiki_1t8gfj"> permissions</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{[</span><span class="__shiki_mdbnqw">&#39;USER_READ&#39;</span><span class="__shiki_140thh">]}&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;</span><span class="__shiki_dzsirb">UserList</span><span class="__shiki_140thh"> /&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_dzsirb">PermissionGuard</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_dzsirb">PermissionGuard</span><span class="__shiki_1t8gfj"> permissions</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{[</span><span class="__shiki_mdbnqw">&#39;USER_CREATE&#39;</span><span class="__shiki_140thh">]}&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;</span><span class="__shiki_dzsirb">CreateUserButton</span><span class="__shiki_140thh"> /&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_dzsirb">PermissionGuard</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_dzsirb">PermissionGuard</span><span class="__shiki_1t8gfj"> permissions</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{[</span><span class="__shiki_mdbnqw">&#39;USER_DELETE&#39;</span><span class="__shiki_140thh">]} </span></span>
<span class="line"><span class="__shiki_1t8gfj">                     fallback</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{&lt;</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;无删除权限&lt;/</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;}&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;</span><span class="__shiki_dzsirb">DeleteUserButton</span><span class="__shiki_140thh"> /&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_dzsirb">PermissionGuard</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;/</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h2 id="_6-高级访问控制模式" tabindex="-1">6. 高级访问控制模式 <a class="header-anchor" href="#_6-高级访问控制模式" aria-label="Permalink to &quot;6. 高级访问控制模式&quot;">​</a></h2><h3 id="_6-1-行级安全实现" tabindex="-1">6.1 行级安全实现 <a class="header-anchor" href="#_6-1-行级安全实现" aria-label="Permalink to &quot;6.1 行级安全实现&quot;">​</a></h3><h4 id="_6-1-1-数据库行级安全" tabindex="-1">6.1.1 数据库行级安全 <a class="header-anchor" href="#_6-1-1-数据库行级安全" aria-label="Permalink to &quot;6.1.1 数据库行级安全&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- PostgreSQL行级安全策略</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> documents </span><span class="__shiki_1itgoe">ENABLE</span><span class="__shiki_1itgoe"> ROW</span><span class="__shiki_1itgoe"> LEVEL</span><span class="__shiki_1itgoe"> SECURITY</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 用户只能访问自己的文档</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> POLICY</span><span class="__shiki_140thh"> user_documents_policy </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> documents</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> ALL</span></span>
<span class="line"><span class="__shiki_1itgoe">    TO</span><span class="__shiki_140thh"> authenticated_user</span></span>
<span class="line"><span class="__shiki_1itgoe">    USING</span><span class="__shiki_140thh"> (owner_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> current_user_id());</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 管理员可以访问所有文档</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> POLICY</span><span class="__shiki_140thh"> admin_documents_policy </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> documents</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> ALL</span></span>
<span class="line"><span class="__shiki_1itgoe">    TO</span><span class="__shiki_140thh"> admin_role</span></span>
<span class="line"><span class="__shiki_1itgoe">    USING</span><span class="__shiki_140thh"> (true);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 部门经理可以访问本部门文档</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> POLICY</span><span class="__shiki_140thh"> manager_documents_policy </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> documents</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_1itgoe"> SELECT</span></span>
<span class="line"><span class="__shiki_1itgoe">    TO</span><span class="__shiki_140thh"> manager_role</span></span>
<span class="line"><span class="__shiki_1itgoe">    USING</span><span class="__shiki_140thh"> (department_id </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> department_id </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> user_departments </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> user_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> current_user_id() </span><span class="__shiki_1itgoe">AND</span><span class="__shiki_140thh"> is_manager </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true</span></span>
<span class="line"><span class="__shiki_140thh">    ));</span></span></code></pre></div><h4 id="_6-1-2-应用层行级安全" tabindex="-1">6.1.2 应用层行级安全 <a class="header-anchor" href="#_6-1-2-应用层行级安全" aria-label="Permalink to &quot;6.1.2 应用层行级安全&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Service</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> RowLevelSecurityService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /**</span></span>
<span class="line"><span class="__shiki_21nrsd">     * 应用行级安全过滤器</span></span>
<span class="line"><span class="__shiki_21nrsd">     */</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; Specification&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">applyRowLevelSecurity</span><span class="__shiki_140thh">(Class&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">entityClass</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                                                     UserContext </span><span class="__shiki_1jdh33">userContext</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> (root, query, criteriaBuilder) </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            List&lt;</span><span class="__shiki_1itgoe">Predicate</span><span class="__shiki_140thh">&gt; predicates </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 基于用户角色的安全规则</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (userContext.</span><span class="__shiki_1t8gfj">hasRole</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ADMIN&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 管理员无限制</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> criteriaBuilder.</span><span class="__shiki_1t8gfj">conjunction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (userContext.</span><span class="__shiki_1t8gfj">hasRole</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;MANAGER&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 经理只能访问本部门数据</span></span>
<span class="line"><span class="__shiki_140thh">                predicates.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(criteriaBuilder.</span><span class="__shiki_1t8gfj">equal</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                    root.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;department&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;id&quot;</span><span class="__shiki_140thh">), </span></span>
<span class="line"><span class="__shiki_140thh">                    userContext.</span><span class="__shiki_1t8gfj">getDepartmentId</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                ));</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 普通用户只能访问自己的数据</span></span>
<span class="line"><span class="__shiki_140thh">                predicates.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(criteriaBuilder.</span><span class="__shiki_1t8gfj">equal</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                    root.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;owner&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;id&quot;</span><span class="__shiki_140thh">), </span></span>
<span class="line"><span class="__shiki_140thh">                    userContext.</span><span class="__shiki_1t8gfj">getUserId</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                ));</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> criteriaBuilder.</span><span class="__shiki_1t8gfj">and</span><span class="__shiki_140thh">(predicates.</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1itgoe"> Predicate</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]));</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /**</span></span>
<span class="line"><span class="__shiki_21nrsd">     * 安全的查询执行</span></span>
<span class="line"><span class="__shiki_21nrsd">     */</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; Page&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findWithRowLevelSecurity</span><span class="__shiki_140thh">(Class&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">entityClass</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                                               Pageable </span><span class="__shiki_1jdh33">pageable</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                                               UserContext </span><span class="__shiki_1jdh33">userContext</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        Specification&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; securitySpec </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> applyRowLevelSecurity</span><span class="__shiki_140thh">(entityClass, userContext);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> repository.</span><span class="__shiki_1t8gfj">findAll</span><span class="__shiki_140thh">(securitySpec, pageable);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-动态权限管理" tabindex="-1">6.2 动态权限管理 <a class="header-anchor" href="#_6-2-动态权限管理" aria-label="Permalink to &quot;6.2 动态权限管理&quot;">​</a></h3><h4 id="_6-2-1-实时权限更新" tabindex="-1">6.2.1 实时权限更新 <a class="header-anchor" href="#_6-2-1-实时权限更新" aria-label="Permalink to &quot;6.2.1 实时权限更新&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Component</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> DynamicPermissionManager</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> Map&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, Set&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt;&gt; userPermissions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ConcurrentHashMap&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> AtomicLong lastUpdate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> AtomicLong</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Scheduled</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">fixedRate</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 30000</span><span class="__shiki_140thh">) </span><span class="__shiki_21nrsd">// 每30秒刷新权限</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> refreshPermissions</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 从数据库或配置中心加载最新权限</span></span>
<span class="line"><span class="__shiki_140thh">        Map&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, Set&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt;&gt; newPermissions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> loadLatestPermissions</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        userPermissions.</span><span class="__shiki_1t8gfj">clear</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        userPermissions.</span><span class="__shiki_1t8gfj">putAll</span><span class="__shiki_140thh">(newPermissions);</span></span>
<span class="line"><span class="__shiki_140thh">        lastUpdate.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(System.</span><span class="__shiki_1t8gfj">currentTimeMillis</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> checkPermission</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">username</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">permission</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        Set&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; permissions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> userPermissions.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(username);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> permissions </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> permissions.</span><span class="__shiki_1t8gfj">contains</span><span class="__shiki_140thh">(permission);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> grantPermission</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">username</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">permission</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        userPermissions.</span><span class="__shiki_1t8gfj">computeIfAbsent</span><span class="__shiki_140thh">(username, k </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> HashSet&lt;&gt;())</span></span>
<span class="line"><span class="__shiki_140thh">                      .</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(permission);</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 异步保存到持久化存储</span></span>
<span class="line"><span class="__shiki_1t8gfj">        savePermissionChange</span><span class="__shiki_140thh">(username, permission, </span><span class="__shiki_mdbnqw">&quot;GRANT&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> revokePermission</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">username</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">permission</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        Set&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; permissions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> userPermissions.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(username);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (permissions </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            permissions.</span><span class="__shiki_1t8gfj">remove</span><span class="__shiki_140thh">(permission);</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 异步保存到持久化存储</span></span>
<span class="line"><span class="__shiki_1t8gfj">            savePermissionChange</span><span class="__shiki_140thh">(username, permission, </span><span class="__shiki_mdbnqw">&quot;REVOKE&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_7-测试与验证" tabindex="-1">7. 测试与验证 <a class="header-anchor" href="#_7-测试与验证" aria-label="Permalink to &quot;7. 测试与验证&quot;">​</a></h2><h3 id="_7-1-访问控制测试框架" tabindex="-1">7.1 访问控制测试框架 <a class="header-anchor" href="#_7-1-访问控制测试框架" aria-label="Permalink to &quot;7.1 访问控制测试框架&quot;">​</a></h3><h4 id="_7-1-1-自动化安全测试" tabindex="-1">7.1.1 自动化安全测试 <a class="header-anchor" href="#_7-1-1-自动化安全测试" aria-label="Permalink to &quot;7.1.1 自动化安全测试&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">SpringBootTest</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> AccessControlTests</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> WebApplicationContext context;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> UserRepository userRepository;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> MockMvc mockMvc;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">BeforeEach</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> setup</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        mockMvc </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> MockMvcBuilders.</span><span class="__shiki_1t8gfj">webAppContextSetup</span><span class="__shiki_140thh">(context)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">apply</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">springSecurity</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">build</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> testVerticalPrivilegeEscalation</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">throws</span><span class="__shiki_140thh"> Exception {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 普通用户尝试访问管理员端点</span></span>
<span class="line"><span class="__shiki_140thh">        String userToken </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> obtainUserToken</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;regular_user&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        mockMvc.</span><span class="__shiki_1t8gfj">perform</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/api/admin/users&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">header</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Authorization&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;Bearer &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> userToken))</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">andExpect</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">isForbidden</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> testHorizontalPrivilegeEscalation</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">throws</span><span class="__shiki_140thh"> Exception {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 用户A尝试访问用户B的数据</span></span>
<span class="line"><span class="__shiki_140thh">        String userAToken </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> obtainUserToken</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user_a&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        User userB </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> userRepository.</span><span class="__shiki_1t8gfj">findByUsername</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user_b&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        mockMvc.</span><span class="__shiki_1t8gfj">perform</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/api/users/&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> userB.</span><span class="__shiki_1t8gfj">getId</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">header</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Authorization&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;Bearer &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> userAToken))</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">andExpect</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">isForbidden</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> testIDORProtection</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">throws</span><span class="__shiki_140thh"> Exception {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 测试直接对象引用防护</span></span>
<span class="line"><span class="__shiki_140thh">        String userToken </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> obtainUserToken</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;test_user&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 尝试访问不存在的或无权访问的资源ID</span></span>
<span class="line"><span class="__shiki_140thh">        mockMvc.</span><span class="__shiki_1t8gfj">perform</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/api/documents/99999&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">header</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Authorization&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;Bearer &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> userToken))</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">andExpect</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">isNotFound</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> testRoleBasedAccess</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">throws</span><span class="__shiki_140thh"> Exception {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 测试不同角色的访问权限</span></span>
<span class="line"><span class="__shiki_1t8gfj">        testRoleAccess</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ROLE_USER&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;/api/user/profile&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        testRoleAccess</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ROLE_USER&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;/api/admin/dashboard&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        testRoleAccess</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ROLE_ADMIN&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;/api/admin/dashboard&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> testRoleAccess</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">role</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">endpoint</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">boolean</span><span class="__shiki_1jdh33"> shouldAllow</span><span class="__shiki_140thh">) </span></span>
<span class="line"><span class="__shiki_1itgoe">            throws</span><span class="__shiki_140thh"> Exception {</span></span>
<span class="line"><span class="__shiki_140thh">        String token </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> obtainTokenForRole</span><span class="__shiki_140thh">(role);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        MvcResult result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> mockMvc.</span><span class="__shiki_1t8gfj">perform</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(endpoint)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">header</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Authorization&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;Bearer &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> token))</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">andReturn</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (shouldAllow) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            assertThat</span><span class="__shiki_140thh">(result.</span><span class="__shiki_1t8gfj">getResponse</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">getStatus</span><span class="__shiki_140thh">()).</span><span class="__shiki_1t8gfj">isNotEqualTo</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">403</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            assertThat</span><span class="__shiki_140thh">(result.</span><span class="__shiki_1t8gfj">getResponse</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">getStatus</span><span class="__shiki_140thh">()).</span><span class="__shiki_1t8gfj">isEqualTo</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">403</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-渗透测试检查清单" tabindex="-1">7.2 渗透测试检查清单 <a class="header-anchor" href="#_7-2-渗透测试检查清单" aria-label="Permalink to &quot;7.2 渗透测试检查清单&quot;">​</a></h3><h4 id="_7-2-1-访问控制测试项目" tabindex="-1">7.2.1 访问控制测试项目 <a class="header-anchor" href="#_7-2-1-访问控制测试项目" aria-label="Permalink to &quot;7.2.1 访问控制测试项目&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">垂直权限测试</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">普通用户访问管理功能</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">未认证用户访问认证资源</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">角色权限边界测试</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">水平权限测试</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">IDOR漏洞检测</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">参数篡改测试</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">直接对象引用测试</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">上下文权限测试</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">工作流程绕过</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">状态转换验证</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">多步骤操作完整性</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">功能权限测试</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">UI元素权限控制</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">API端点权限验证</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">文件下载权限检查</span></span></code></pre></div><h2 id="_8-监控与审计" tabindex="-1">8. 监控与审计 <a class="header-anchor" href="#_8-监控与审计" aria-label="Permalink to &quot;8. 监控与审计&quot;">​</a></h2><h3 id="_8-1-安全审计框架" tabindex="-1">8.1 安全审计框架 <a class="header-anchor" href="#_8-1-安全审计框架" aria-label="Permalink to &quot;8.1 安全审计框架&quot;">​</a></h3><h4 id="_8-1-1-访问审计实现" tabindex="-1">8.1.1 访问审计实现 <a class="header-anchor" href="#_8-1-1-访问审计实现" aria-label="Permalink to &quot;8.1.1 访问审计实现&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Component</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Aspect</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> AccessAuditAspect</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> Logger auditLogger </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        LoggerFactory.</span><span class="__shiki_1t8gfj">getLogger</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ACCESS_AUDIT&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> HttpServletRequest request;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">AfterReturning</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;@annotation(securedOperation)&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> auditSuccessfulAccess</span><span class="__shiki_140thh">(JoinPoint </span><span class="__shiki_1jdh33">joinPoint</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        String username </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> SecurityContextHolder.</span><span class="__shiki_1t8gfj">getContext</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">getAuthentication</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">getName</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        String operation </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> joinPoint.</span><span class="__shiki_1t8gfj">getSignature</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">getName</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        String resource </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> getResourceFromJoinPoint</span><span class="__shiki_140thh">(joinPoint);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        AuditEntry entry </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> AuditEntry.</span><span class="__shiki_1t8gfj">builder</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">timestamp</span><span class="__shiki_140thh">(Instant.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">username</span><span class="__shiki_140thh">(username)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">operation</span><span class="__shiki_140thh">(operation)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">resource</span><span class="__shiki_140thh">(resource)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">ipAddress</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">getClientIp</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">userAgent</span><span class="__shiki_140thh">(request.</span><span class="__shiki_1t8gfj">getHeader</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;User-Agent&quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SUCCESS&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">build</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        auditLogger.</span><span class="__shiki_1t8gfj">info</span><span class="__shiki_140thh">(entry.</span><span class="__shiki_1t8gfj">toString</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">AfterThrowing</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">pointcut</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;@annotation(securedOperation)&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">                  throwing</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;ex&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> auditFailedAccess</span><span class="__shiki_140thh">(JoinPoint </span><span class="__shiki_1jdh33">joinPoint</span><span class="__shiki_140thh">, Exception </span><span class="__shiki_1jdh33">ex</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        String username </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;unknown&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            username </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> SecurityContextHolder.</span><span class="__shiki_1t8gfj">getContext</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                    .</span><span class="__shiki_1t8gfj">getAuthentication</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">getName</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (Exception </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 无法获取用户名</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        AuditEntry entry </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> AuditEntry.</span><span class="__shiki_1t8gfj">builder</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">timestamp</span><span class="__shiki_140thh">(Instant.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">username</span><span class="__shiki_140thh">(username)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">operation</span><span class="__shiki_140thh">(joinPoint.</span><span class="__shiki_1t8gfj">getSignature</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">getName</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">resource</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">getResourceFromJoinPoint</span><span class="__shiki_140thh">(joinPoint))</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">ipAddress</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">getClientIp</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">userAgent</span><span class="__shiki_140thh">(request.</span><span class="__shiki_1t8gfj">getHeader</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;User-Agent&quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;FAILED&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">errorMessage</span><span class="__shiki_140thh">(ex.</span><span class="__shiki_1t8gfj">getMessage</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">build</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        auditLogger.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(entry.</span><span class="__shiki_1t8gfj">toString</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-2-实时威胁检测" tabindex="-1">8.2 实时威胁检测 <a class="header-anchor" href="#_8-2-实时威胁检测" aria-label="Permalink to &quot;8.2 实时威胁检测&quot;">​</a></h3><h4 id="_8-2-1-异常访问模式检测" tabindex="-1">8.2.1 异常访问模式检测 <a class="header-anchor" href="#_8-2-1-异常访问模式检测" aria-label="Permalink to &quot;8.2.1 异常访问模式检测&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> AccessPatternAnalyzer</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.access_patterns </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.alert_threshold </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_21nrsd">  # 异常访问次数阈值</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> analyze_access</span><span class="__shiki_140thh">(self, access_event):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;分析访问行为模式&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        user_key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">access_event.user_id</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">_</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">access_event.ip_address</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 更新访问模式</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> user_key </span><span class="__shiki_1itgoe">not</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.access_patterns:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.access_patterns[user_key] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;normal_pattern&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;recent_access&#39;</span><span class="__shiki_140thh">: deque(</span><span class="__shiki_1jdh33">maxlen</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;access_count&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        pattern_data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.access_patterns[user_key]</span></span>
<span class="line"><span class="__shiki_140thh">        pattern_data[</span><span class="__shiki_mdbnqw">&#39;access_count&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">        pattern_data[</span><span class="__shiki_mdbnqw">&#39;recent_access&#39;</span><span class="__shiki_140thh">].append(access_event)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 检测异常模式</span></span>
<span class="line"><span class="__shiki_140thh">        alerts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._detect_anomalies(access_event, pattern_data)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> alerts</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _detect_anomalies</span><span class="__shiki_140thh">(self, event, pattern_data):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;检测访问异常&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        alerts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 检测权限提升尝试</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._is_privilege_escalation_attempt(event, pattern_data):</span></span>
<span class="line"><span class="__shiki_140thh">            alerts.append({</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;PRIVILEGE_ESCALATION&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;severity&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;HIGH&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;message&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&#39;用户 </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">event.user_id</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> 尝试权限提升&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            })</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 检测水平越权尝试</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._is_horizontal_escalation_attempt(event, pattern_data):</span></span>
<span class="line"><span class="__shiki_140thh">            alerts.append({</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;HORIZONTAL_ESCALATION&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;severity&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;HIGH&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;message&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&#39;用户 </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">event.user_id</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> 尝试水平越权&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            })</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 检测暴力枚举</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._is_brute_force_enumeration(event, pattern_data):</span></span>
<span class="line"><span class="__shiki_140thh">            alerts.append({</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;ENUMERATION_ATTEMPT&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;severity&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;MEDIUM&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;message&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&#39;检测到资源枚举尝试&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            })</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> alerts</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>OWASP访问控制防护是一个<strong>系统性工程</strong>，需要从技术架构、流程管控、人员意识三个维度构建完整防护体系：</p><h3 id="🛡️-核心技术原则" tabindex="-1">🛡️ 核心技术原则 <a class="header-anchor" href="#🛡️-核心技术原则" aria-label="Permalink to &quot;🛡️ 核心技术原则&quot;">​</a></h3><ol><li><strong>默认拒绝</strong>：所有访问默认拒绝，显式授权</li><li><strong>最小权限</strong>：用户只获得完成工作所需的最小权限</li><li><strong>职责分离</strong>：关键操作需要多人或多角色完成</li><li><strong>完整审计</strong>：所有访问行为可追溯、可审计</li></ol><h3 id="🔧-实施关键点" tabindex="-1">🔧 实施关键点 <a class="header-anchor" href="#🔧-实施关键点" aria-label="Permalink to &quot;🔧 实施关键点&quot;">​</a></h3><ul><li><strong>中央化授权服务</strong>：统一权限决策点</li><li><strong>行级数据安全</strong>：防止水平权限提升</li><li><strong>实时权限管理</strong>：支持动态权限调整</li><li><strong>全面测试覆盖</strong>：自动化安全测试</li></ul><h3 id="📊-持续改进" tabindex="-1">📊 持续改进 <a class="header-anchor" href="#📊-持续改进" aria-label="Permalink to &quot;📊 持续改进&quot;">​</a></h3><ul><li><strong>定期权限审查</strong>：清理不必要的权限</li><li><strong>威胁建模更新</strong>：适应新的攻击模式</li><li><strong>监控告警优化</strong>：及时发现异常访问</li><li><strong>安全意识培训</strong>：提升全员安全认知</li></ul><p>记住：<strong>访问控制不是一次性项目，而是持续的过程</strong>。需要不断评估、调整和优化，才能应对不断变化的安全威胁。</p>`,78)])])}const g=a(p,[["render",h]]);export{r as __pageData,g as default};
