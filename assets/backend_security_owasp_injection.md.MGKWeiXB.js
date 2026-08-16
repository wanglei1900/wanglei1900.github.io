import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"网络安全-OWASP注入防护全面学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/security/owasp/injection.md","filePath":"backend/security/owasp/injection.md"}'),p={name:"backend/security/owasp/injection.md"};function h(l,s,c,t,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="网络安全-owasp注入防护全面学习笔记" tabindex="-1">网络安全-OWASP注入防护全面学习笔记 <a class="header-anchor" href="#网络安全-owasp注入防护全面学习笔记" aria-label="Permalink to &quot;网络安全-OWASP注入防护全面学习笔记&quot;">​</a></h1><h2 id="_1-注入漏洞基础概念" tabindex="-1">1. 注入漏洞基础概念 <a class="header-anchor" href="#_1-注入漏洞基础概念" aria-label="Permalink to &quot;1. 注入漏洞基础概念&quot;">​</a></h2><h3 id="_1-1-注入漏洞定义与危害" tabindex="-1">1.1 注入漏洞定义与危害 <a class="header-anchor" href="#_1-1-注入漏洞定义与危害" aria-label="Permalink to &quot;1.1 注入漏洞定义与危害&quot;">​</a></h3><p>注入漏洞是<strong>应用程序安全风险之首</strong>，在OWASP Top 10中长期排名前列。当应用程序将<strong>不可信的用户输入</strong>作为命令或查询的一部分发送到解释器时，就会发生注入攻击。</p><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[攻击者输入恶意数据] --&gt; B[应用程序未经验收直接处理]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[恶意数据发送到解释器]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D{解释器类型}</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[数据库]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; F[操作系统]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; G[LDAP目录]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; H[XML处理器]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; I[数据泄露/篡改]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; J[系统完全沦陷]</span></span>
<span class="line"><span class="__shiki_140thh">    G --&gt; K[认证绕过]</span></span>
<span class="line"><span class="__shiki_140thh">    H --&gt; L[敏感信息提取]</span></span></code></pre></div><h3 id="_1-2-注入漏洞统计数据分析" tabindex="-1">1.2 注入漏洞统计数据分析 <a class="header-anchor" href="#_1-2-注入漏洞统计数据分析" aria-label="Permalink to &quot;1.2 注入漏洞统计数据分析&quot;">​</a></h3><p>根据最新OWASP报告：</p><ul><li><strong>94%</strong> 的应用存在某种形式的注入漏洞</li><li><strong>SQL注入</strong>占所有Web攻击的<strong>65%</strong></li><li>平均修复时间：<strong>50-100小时</strong></li><li>业务影响：数据泄露、服务中断、合规违规</li></ul><h2 id="_2-主要注入类型详解" tabindex="-1">2. 主要注入类型详解 <a class="header-anchor" href="#_2-主要注入类型详解" aria-label="Permalink to &quot;2. 主要注入类型详解&quot;">​</a></h2><h3 id="_2-1-sql注入-sql-injection" tabindex="-1">2.1 SQL注入（SQL Injection） <a class="header-anchor" href="#_2-1-sql注入-sql-injection" aria-label="Permalink to &quot;2.1 SQL注入（SQL Injection）&quot;">​</a></h3><h4 id="_2-1-1-攻击原理" tabindex="-1">2.1.1 攻击原理 <a class="header-anchor" href="#_2-1-1-攻击原理" aria-label="Permalink to &quot;2.1.1 攻击原理&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 原始查询</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> users </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> username </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;$username&#39;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_1itgoe"> password</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;$password&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 攻击载荷</span></span>
<span class="line"><span class="__shiki_140thh">username: </span><span class="__shiki_1itgoe">admin</span><span class="__shiki_mdbnqw">&#39; --</span></span>
<span class="line"><span class="__shiki_mdbnqw">password: anything</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">-- 最终查询（认证被绕过）</span></span>
<span class="line"><span class="__shiki_mdbnqw">SELECT * FROM users WHERE username = &#39;</span><span class="__shiki_1itgoe">admin</span><span class="__shiki_mdbnqw">&#39; --&#39;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_1itgoe"> password</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;anything&#39;</span></span></code></pre></div><h4 id="_2-1-2-sql注入分类" tabindex="-1">2.1.2 SQL注入分类 <a class="header-anchor" href="#_2-1-2-sql注入分类" aria-label="Permalink to &quot;2.1.2 SQL注入分类&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">flowchart TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[SQL注入分类] --&gt; B[基于技术]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[基于数据提取方式]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[盲注攻击]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B2[联合查询注入]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B3[错误型注入]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B4[布尔型注入]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B5[时间延迟注入]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[带内注入&lt;br&gt;直接获取数据]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C2[盲注&lt;br&gt;通过行为推断]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C3[带外注入&lt;br&gt;通过外部通道]</span></span></code></pre></div><h3 id="_2-2-命令注入-command-injection" tabindex="-1">2.2 命令注入（Command Injection） <a class="header-anchor" href="#_2-2-命令注入-command-injection" aria-label="Permalink to &quot;2.2 命令注入（Command Injection）&quot;">​</a></h3><h4 id="_2-2-1-攻击示例" tabindex="-1">2.2.1 攻击示例 <a class="header-anchor" href="#_2-2-1-攻击示例" aria-label="Permalink to &quot;2.2.1 攻击示例&quot;">​</a></h4><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 漏洞代码</span></span>
<span class="line"><span class="__shiki_1itgoe">&lt;?</span><span class="__shiki_dzsirb">php</span></span>
<span class="line"><span class="__shiki_140thh">$email </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> $_POST[</span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_dzsirb">system</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ping -c 1 &quot;</span><span class="__shiki_1itgoe"> .</span><span class="__shiki_140thh"> $email);</span></span>
<span class="line"><span class="__shiki_1itgoe">?&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 攻击载荷</span></span>
<span class="line"><span class="__shiki_dzsirb">email</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> user</span><span class="__shiki_1itgoe">@</span><span class="__shiki_dzsirb">example</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">com</span><span class="__shiki_140thh">; </span><span class="__shiki_dzsirb">cat</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb">etc</span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb">passwd</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 执行命令</span></span>
<span class="line"><span class="__shiki_dzsirb">ping</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">c</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_dzsirb"> user</span><span class="__shiki_1itgoe">@</span><span class="__shiki_dzsirb">example</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">com</span><span class="__shiki_140thh">; </span><span class="__shiki_dzsirb">cat</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb">etc</span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb">passwd</span></span></code></pre></div><h4 id="_2-2-2-命令连接符" tabindex="-1">2.2.2 命令连接符 <a class="header-anchor" href="#_2-2-2-命令连接符" aria-label="Permalink to &quot;2.2.2 命令连接符&quot;">​</a></h4><table tabindex="0"><thead><tr><th>操作系统</th><th>连接符</th><th>示例</th></tr></thead><tbody><tr><td>Unix/Linux</td><td><code>;</code></td><td><code>cmd1; cmd2</code></td></tr><tr><td>Unix/Linux</td><td><code>&amp;&amp;</code></td><td><code>cmd1 &amp;&amp; cmd2</code></td></tr><tr><td>Unix/Linux</td><td>\`</td><td></td></tr><tr><td>Unix/Linux</td><td>\`</td><td>\`</td></tr><tr><td>Windows</td><td><code>&amp;</code></td><td><code>cmd1 &amp; cmd2</code></td></tr><tr><td>Windows</td><td><code>&amp;&amp;</code></td><td><code>cmd1 &amp;&amp; cmd2</code></td></tr></tbody></table><h3 id="_2-3-ldap注入" tabindex="-1">2.3 LDAP注入 <a class="header-anchor" href="#_2-3-ldap注入" aria-label="Permalink to &quot;2.3 LDAP注入&quot;">​</a></h3><h4 id="_2-3-1-攻击原理" tabindex="-1">2.3.1 攻击原理 <a class="header-anchor" href="#_2-3-1-攻击原理" aria-label="Permalink to &quot;2.3.1 攻击原理&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 原始查询</span></span>
<span class="line"><span class="__shiki_mdbnqw">(cn=$user)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 攻击载荷</span></span>
<span class="line"><span class="__shiki_17hn0y">user</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)(cn=*))(|(cn=*</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 最终查询 - 返回所有条目</span></span>
<span class="line"><span class="__shiki_mdbnqw">(cn=*)(cn=*))(|(cn=*)</span></span></code></pre></div><h3 id="_2-4-xml注入与xxe" tabindex="-1">2.4 XML注入与XXE <a class="header-anchor" href="#_2-4-xml注入与xxe" aria-label="Permalink to &quot;2.4 XML注入与XXE&quot;">​</a></h3><h4 id="_2-4-1-xxe攻击示例" tabindex="-1">2.4.1 XXE攻击示例 <a class="header-anchor" href="#_2-4-1-xxe攻击示例" aria-label="Permalink to &quot;2.4.1 XXE攻击示例&quot;">​</a></h4><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">&lt;!-- 恶意XML --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;?</span><span class="__shiki_17hn0y">xml</span><span class="__shiki_1t8gfj"> version</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;1.0&quot;</span><span class="__shiki_140thh">?&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;!</span><span class="__shiki_1itgoe">DOCTYPE</span><span class="__shiki_dzsirb"> foo</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">&lt;!</span><span class="__shiki_1itgoe">ENTITY</span><span class="__shiki_dzsirb"> xxe</span><span class="__shiki_1itgoe"> SYSTEM </span><span class="__shiki_mdbnqw">&quot;file:///etc/passwd&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">]&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">foo</span><span class="__shiki_140thh">&gt;</span><span class="__shiki_dzsirb">&amp;xxe;</span><span class="__shiki_140thh">&lt;/</span><span class="__shiki_17hn0y">foo</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h2 id="_3-核心防护原则与架构" tabindex="-1">3. 核心防护原则与架构 <a class="header-anchor" href="#_3-核心防护原则与架构" aria-label="Permalink to &quot;3. 核心防护原则与架构&quot;">​</a></h2><h3 id="_3-1-纵深防御体系" tabindex="-1">3.1 纵深防御体系 <a class="header-anchor" href="#_3-1-纵深防御体系" aria-label="Permalink to &quot;3.1 纵深防御体系&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[用户输入] --&gt; B[WAF边界防护]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[输入验证层]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[安全处理层]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[输出编码层]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; F[目标解释器]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    subgraph &quot;防护层次&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    B[第1层: WAF/反向代理&lt;br&gt;签名检测/速率限制]</span></span>
<span class="line"><span class="__shiki_140thh">    C[第2层: 输入验证&lt;br&gt;白名单/数据类型检查]</span></span>
<span class="line"><span class="__shiki_140thh">    D[第3层: 安全处理&lt;br&gt;参数化查询/安全API]</span></span>
<span class="line"><span class="__shiki_140thh">    E[第4层: 输出编码&lt;br&gt;上下文相关编码]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    G[监控与响应] -.-&gt; B</span></span>
<span class="line"><span class="__shiki_140thh">    G -.-&gt; C</span></span>
<span class="line"><span class="__shiki_140thh">    G -.-&gt; D</span></span>
<span class="line"><span class="__shiki_140thh">    G -.-&gt; E</span></span></code></pre></div><h3 id="_3-2-输入验证策略" tabindex="-1">3.2 输入验证策略 <a class="header-anchor" href="#_3-2-输入验证策略" aria-label="Permalink to &quot;3.2 输入验证策略&quot;">​</a></h3><h4 id="_3-2-1-白名单验证框架" tabindex="-1">3.2.1 白名单验证框架 <a class="header-anchor" href="#_3-2-1-白名单验证框架" aria-label="Permalink to &quot;3.2.1 白名单验证框架&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> InputValidator</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 邮箱验证</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> isValidEmail</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">email</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        String emailRegex </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;^[a-zA-Z0-9_+&amp;*-]+(?:</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">.[a-zA-Z0-9_+&amp;*-]+)*@&quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">                          &quot;(?:[a-zA-Z0-9-]+</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">.)+[a-zA-Z]{2,7}$&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> email </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> email.</span><span class="__shiki_1t8gfj">matches</span><span class="__shiki_140thh">(emailRegex);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 数字ID验证</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> isValidId</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> id.</span><span class="__shiki_1t8gfj">matches</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;^</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">d{1,10}$&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 文件名验证</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> isValidFilename</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">filename</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> filename </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> filename.</span><span class="__shiki_1t8gfj">matches</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;^[a-zA-Z0-9._-]{1,255}$&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-2-2-上下文相关验证" tabindex="-1">3.2.2 上下文相关验证 <a class="header-anchor" href="#_3-2-2-上下文相关验证" aria-label="Permalink to &quot;3.2.2 上下文相关验证&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> re</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ContextAwareValidator</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> validate_sql_identifier</span><span class="__shiki_140thh">(identifier):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;验证SQL标识符（表名、列名）&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> re.match(</span><span class="__shiki_1itgoe">r</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">^[a-zA-Z_][a-zA-Z0-9_]</span><span class="__shiki_1itgoe">{0,127}</span><span class="__shiki_dzsirb">$</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">, identifier) </span><span class="__shiki_1itgoe">is</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> validate_ldap_filter</span><span class="__shiki_140thh">(filter_str):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;验证LDAP过滤器中用户输入部分&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 检查危险字符</span></span>
<span class="line"><span class="__shiki_140thh">        dangerous_chars </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;*&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;(&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;)&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;|&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;&amp;&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> all</span><span class="__shiki_140thh">(char </span><span class="__shiki_1itgoe">not</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> filter_str </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> char </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> dangerous_chars)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> validate_file_path</span><span class="__shiki_140thh">(path):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;验证文件路径，防止路径遍历&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        normalized_path </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> os.path.normpath(path)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> any</span><span class="__shiki_140thh">(segment </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;..&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;~&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> segment </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> normalized_path.split(os.sep))</span></span></code></pre></div><h2 id="_4-sql注入深度防护" tabindex="-1">4. SQL注入深度防护 <a class="header-anchor" href="#_4-sql注入深度防护" aria-label="Permalink to &quot;4. SQL注入深度防护&quot;">​</a></h2><h3 id="_4-1-参数化查询全面实施" tabindex="-1">4.1 参数化查询全面实施 <a class="header-anchor" href="#_4-1-参数化查询全面实施" aria-label="Permalink to &quot;4.1 参数化查询全面实施&quot;">​</a></h3><h4 id="_4-1-1-java-preparedstatement" tabindex="-1">4.1.1 Java PreparedStatement <a class="header-anchor" href="#_4-1-1-java-preparedstatement" aria-label="Permalink to &quot;4.1.1 Java PreparedStatement&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> UserDAO</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> User </span><span class="__shiki_1t8gfj">getUserById</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> userId</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">throws</span><span class="__shiki_140thh"> SQLException {</span></span>
<span class="line"><span class="__shiki_140thh">        String sql </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;SELECT id, username, email FROM users WHERE id = ? AND status = ?&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> (Connection conn </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> dataSource.</span><span class="__shiki_1t8gfj">getConnection</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">             PreparedStatement stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> conn.</span><span class="__shiki_1t8gfj">prepareStatement</span><span class="__shiki_140thh">(sql)) {</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            stmt.</span><span class="__shiki_1t8gfj">setInt</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, userId);</span></span>
<span class="line"><span class="__shiki_140thh">            stmt.</span><span class="__shiki_1t8gfj">setString</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;active&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh"> (ResultSet rs </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stmt.</span><span class="__shiki_1t8gfj">executeQuery</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (rs.</span><span class="__shiki_1t8gfj">next</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                        rs.</span><span class="__shiki_1t8gfj">getInt</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;id&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">                        rs.</span><span class="__shiki_1t8gfj">getString</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;username&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">                        rs.</span><span class="__shiki_1t8gfj">getString</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;email&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                    );</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> updateUserEmail</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> userId</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">newEmail</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">throws</span><span class="__shiki_140thh"> SQLException {</span></span>
<span class="line"><span class="__shiki_140thh">        String sql </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;UPDATE users SET email = ?, updated_at = NOW() WHERE id = ?&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> (Connection conn </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> dataSource.</span><span class="__shiki_1t8gfj">getConnection</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">             PreparedStatement stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> conn.</span><span class="__shiki_1t8gfj">prepareStatement</span><span class="__shiki_140thh">(sql)) {</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            stmt.</span><span class="__shiki_1t8gfj">setString</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, newEmail);</span></span>
<span class="line"><span class="__shiki_140thh">            stmt.</span><span class="__shiki_1t8gfj">setInt</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, userId);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> stmt.</span><span class="__shiki_1t8gfj">executeUpdate</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_4-1-2-python参数化查询" tabindex="-1">4.1.2 Python参数化查询 <a class="header-anchor" href="#_4-1-2-python参数化查询" aria-label="Permalink to &quot;4.1.2 Python参数化查询&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> sqlite3</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> contextlib </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> contextmanager</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> DatabaseManager</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @contextmanager</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_cursor</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_140thh">        conn </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sqlite3.connect(</span><span class="__shiki_mdbnqw">&#39;application.db&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        cursor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> conn.cursor()</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            yield</span><span class="__shiki_140thh"> cursor</span></span>
<span class="line"><span class="__shiki_140thh">            conn.commit()</span></span>
<span class="line"><span class="__shiki_1itgoe">        except</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            conn.rollback()</span></span>
<span class="line"><span class="__shiki_1itgoe">            raise</span></span>
<span class="line"><span class="__shiki_1itgoe">        finally</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            conn.close()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> search_users</span><span class="__shiki_140thh">(self, username_filter, limit</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;安全的用户搜索&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SELECT id, username, email </span></span>
<span class="line"><span class="__shiki_mdbnqw">        FROM users </span></span>
<span class="line"><span class="__shiki_mdbnqw">        WHERE username LIKE ? </span></span>
<span class="line"><span class="__shiki_mdbnqw">        AND status = &#39;active&#39; </span></span>
<span class="line"><span class="__shiki_mdbnqw">        LIMIT ?</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.get_cursor() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> cursor:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 参数化处理 LIKE 查询</span></span>
<span class="line"><span class="__shiki_140thh">            safe_filter </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;%</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">username_filter</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">%&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            cursor.execute(query, (safe_filter, limit))</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> cursor.fetchall()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> complex_query</span><span class="__shiki_140thh">(self, params):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;复杂查询的参数化处理&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SELECT u.username, p.title, p.content</span></span>
<span class="line"><span class="__shiki_mdbnqw">        FROM users u</span></span>
<span class="line"><span class="__shiki_mdbnqw">        INNER JOIN posts p ON u.id = p.user_id</span></span>
<span class="line"><span class="__shiki_mdbnqw">        WHERE u.created_at &gt; ?</span></span>
<span class="line"><span class="__shiki_mdbnqw">        AND p.status IN (</span><span class="__shiki_dzsirb">{}</span><span class="__shiki_mdbnqw">)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        ORDER BY p.created_at DESC</span></span>
<span class="line"><span class="__shiki_mdbnqw">        LIMIT ?</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;</span><span class="__shiki_140thh">.format(</span><span class="__shiki_mdbnqw">&#39;,&#39;</span><span class="__shiki_140thh">.join([</span><span class="__shiki_mdbnqw">&#39;?&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(params[</span><span class="__shiki_mdbnqw">&#39;statuses&#39;</span><span class="__shiki_140thh">])))</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 构建参数列表</span></span>
<span class="line"><span class="__shiki_140thh">        sql_params </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [params[</span><span class="__shiki_mdbnqw">&#39;min_date&#39;</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">        sql_params.extend(params[</span><span class="__shiki_mdbnqw">&#39;statuses&#39;</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">        sql_params.append(params[</span><span class="__shiki_mdbnqw">&#39;limit&#39;</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.get_cursor() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> cursor:</span></span>
<span class="line"><span class="__shiki_140thh">            cursor.execute(query, sql_params)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> cursor.fetchall()</span></span></code></pre></div><h3 id="_4-2-orm安全使用指南" tabindex="-1">4.2 ORM安全使用指南 <a class="header-anchor" href="#_4-2-orm安全使用指南" aria-label="Permalink to &quot;4.2 ORM安全使用指南&quot;">​</a></h3><h4 id="_4-2-1-hibernate安全使用" tabindex="-1">4.2.1 Hibernate安全使用 <a class="header-anchor" href="#_4-2-1-hibernate安全使用" aria-label="Permalink to &quot;4.2.1 Hibernate安全使用&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Table</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;users&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Id</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">GeneratedValue</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">strategy</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> GenerationType.IDENTITY)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Long id;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Column</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">nullable</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">unique</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String username;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Column</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">nullable</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String email;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // getters and setters</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Repository</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> UserRepository</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">PersistenceContext</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> EntityManager entityManager;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 安全的HQL查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findActiveUsers</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">usernameFilter</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        String hql </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;FROM User u WHERE u.username LIKE :username AND u.status = &#39;active&#39;&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> entityManager.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(hql, User.class)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">setParameter</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;username&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;%&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> usernameFilter </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot;%&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">getResultList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 危险的字符串拼接 - 绝对避免！</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">unsafeFindUsers</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">column</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">value</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 危险代码 - 容易导致HQL注入</span></span>
<span class="line"><span class="__shiki_140thh">        String unsafeHql </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;FROM User u WHERE u.&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> column </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot; = &#39;&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot;&#39;&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> entityManager.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(unsafeHql, User.class).</span><span class="__shiki_1t8gfj">getResultList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_4-2-2-sqlalchemy安全实践" tabindex="-1">4.2.2 SQLAlchemy安全实践 <a class="header-anchor" href="#_4-2-2-sqlalchemy安全实践" aria-label="Permalink to &quot;4.2.2 SQLAlchemy安全实践&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> create_engine, text</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy.orm </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> sessionmaker</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy.ext.declarative </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> declarative_base</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">Base </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> declarative_base()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> UserService</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, database_url):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.engine </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> create_engine(database_url)</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.Session </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sessionmaker(</span><span class="__shiki_1jdh33">bind</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.engine)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_users_by_role</span><span class="__shiki_140thh">(self, role_name):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;安全的SQLAlchemy查询&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        session </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.Session()</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 方法1: 使用ORM查询</span></span>
<span class="line"><span class="__shiki_140thh">            users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> session.query(User).filter(</span></span>
<span class="line"><span class="__shiki_140thh">                User.role </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> role_name,</span></span>
<span class="line"><span class="__shiki_140thh">                User.is_active </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_140thh">            ).all()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 方法2: 使用参数化文本查询</span></span>
<span class="line"><span class="__shiki_140thh">            query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> text(</span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users WHERE role = :role AND is_active = True&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> session.execute(query, {</span><span class="__shiki_mdbnqw">&#39;role&#39;</span><span class="__shiki_140thh">: role_name}).fetchall()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> users</span></span>
<span class="line"><span class="__shiki_1itgoe">        finally</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            session.close()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> unsafe_dynamic_query</span><span class="__shiki_140thh">(self, conditions):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;危险：动态查询构造&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 绝对避免这种写法！</span></span>
<span class="line"><span class="__shiki_140thh">        query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users WHERE </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">conditions</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.engine.execute(query)  </span><span class="__shiki_21nrsd"># SQL注入漏洞！</span></span></code></pre></div><h2 id="_5-进阶绕过技术与防护" tabindex="-1">5. 进阶绕过技术与防护 <a class="header-anchor" href="#_5-进阶绕过技术与防护" aria-label="Permalink to &quot;5. 进阶绕过技术与防护&quot;">​</a></h2><h3 id="_5-1-编码绕过技术深度解析" tabindex="-1">5.1 编码绕过技术深度解析 <a class="header-anchor" href="#_5-1-编码绕过技术深度解析" aria-label="Permalink to &quot;5.1 编码绕过技术深度解析&quot;">​</a></h3><h4 id="_5-1-1-多重编码检测" tabindex="-1">5.1.1 多重编码检测 <a class="header-anchor" href="#_5-1-1-多重编码检测" aria-label="Permalink to &quot;5.1.1 多重编码检测&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> urllib.parse</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> html</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> EncodingDetector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> normalize_input</span><span class="__shiki_140thh">(user_input):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;规范化用户输入，检测多重编码&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        original </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> user_input</span></span>
<span class="line"><span class="__shiki_140thh">        decoded </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> user_input</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 多次解码直到稳定</span></span>
<span class="line"><span class="__shiki_140thh">        previous </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"><span class="__shiki_1itgoe">        while</span><span class="__shiki_140thh"> decoded </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> previous:</span></span>
<span class="line"><span class="__shiki_140thh">            previous </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> decoded</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">                # URL解码</span></span>
<span class="line"><span class="__shiki_140thh">                temp </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> urllib.parse.unquote(decoded)</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> temp </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> decoded:</span></span>
<span class="line"><span class="__shiki_140thh">                    decoded </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> temp</span></span>
<span class="line"><span class="__shiki_1itgoe">                    continue</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                # HTML实体解码</span></span>
<span class="line"><span class="__shiki_140thh">                temp </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> html.unescape(decoded)</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> temp </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> decoded:</span></span>
<span class="line"><span class="__shiki_140thh">                    decoded </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> temp</span></span>
<span class="line"><span class="__shiki_1itgoe">                    continue</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                # Unicode解码</span></span>
<span class="line"><span class="__shiki_140thh">                temp </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> decoded.encode().decode(</span><span class="__shiki_mdbnqw">&#39;unicode_escape&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> temp </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> decoded:</span></span>
<span class="line"><span class="__shiki_140thh">                    decoded </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> temp</span></span>
<span class="line"><span class="__shiki_1itgoe">                    continue</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">            except</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                break</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> decoded</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> detect_encoding_attempts</span><span class="__shiki_140thh">(input_str):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;检测编码绕过尝试&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        suspicious_patterns </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_1itgoe">            r</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_21q97f">%</span><span class="__shiki_dzsirb">[0-9a-fA-F]</span><span class="__shiki_1itgoe">{2}</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd"># URL编码</span></span>
<span class="line"><span class="__shiki_1itgoe">            r</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_ghujbu">\\\\</span><span class="__shiki_21q97f">u</span><span class="__shiki_dzsirb">[0-9a-fA-F]</span><span class="__shiki_1itgoe">{4}</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd"># Unicode编码</span></span>
<span class="line"><span class="__shiki_1itgoe">            r</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_21q97f">&amp;#x</span><span class="__shiki_dzsirb">[0-9a-fA-F]</span><span class="__shiki_1itgoe">+</span><span class="__shiki_21q97f">;</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd"># HTML十六进制实体</span></span>
<span class="line"><span class="__shiki_1itgoe">            r</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_21q97f">&amp;#</span><span class="__shiki_dzsirb">[0-9]</span><span class="__shiki_1itgoe">+</span><span class="__shiki_21q97f">;</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd"># HTML十进制实体</span></span>
<span class="line"><span class="__shiki_1itgoe">            r</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_ghujbu">\\\\</span><span class="__shiki_21q97f">x</span><span class="__shiki_dzsirb">[0-9a-fA-F]</span><span class="__shiki_1itgoe">{2}</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd"># 十六进制转义</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        detections </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> pattern </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> suspicious_patterns:</span></span>
<span class="line"><span class="__shiki_1itgoe">            import</span><span class="__shiki_140thh"> re</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> re.search(pattern, input_str):</span></span>
<span class="line"><span class="__shiki_140thh">                detections.append(pattern)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> detections</span></span></code></pre></div><h3 id="_5-2-waf绕过技术与防护" tabindex="-1">5.2 WAF绕过技术与防护 <a class="header-anchor" href="#_5-2-waf绕过技术与防护" aria-label="Permalink to &quot;5.2 WAF绕过技术与防护&quot;">​</a></h3><h4 id="_5-2-1-常见waf绕过技术" tabindex="-1">5.2.1 常见WAF绕过技术 <a class="header-anchor" href="#_5-2-1-常见waf绕过技术" aria-label="Permalink to &quot;5.2.1 常见WAF绕过技术&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 注释符绕过</span></span>
<span class="line"><span class="__shiki_140thh">UN</span><span class="__shiki_21nrsd">/**/</span><span class="__shiki_140thh">ION SEL</span><span class="__shiki_21nrsd">/**/</span><span class="__shiki_140thh">ECT</span></span>
<span class="line"><span class="__shiki_21nrsd">/*!50000UNION*/</span><span class="__shiki_1itgoe"> SELECT</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 空白符变异</span></span>
<span class="line"><span class="__shiki_1itgoe">UNION</span><span class="__shiki_140thh">%0bSELECT</span></span>
<span class="line"><span class="__shiki_1itgoe">UNION</span><span class="__shiki_140thh">%a0SELECT</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 大小写混合</span></span>
<span class="line"><span class="__shiki_1itgoe">UnIoN</span><span class="__shiki_1itgoe"> SeLeCt</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 参数污染</span></span>
<span class="line"><span class="__shiki_140thh">?id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">&amp;id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2</span><span class="__shiki_1itgoe"> UNION</span><span class="__shiki_1itgoe"> SELECT</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 科学计数法</span></span>
<span class="line"><span class="__shiki_140thh">1E0UNION </span><span class="__shiki_1itgoe">SELECT</span></span></code></pre></div><h4 id="_5-2-2-waf规则强化" tabindex="-1">5.2.2 WAF规则强化 <a class="header-anchor" href="#_5-2-2-waf规则强化" aria-label="Permalink to &quot;5.2.2 WAF规则强化&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> WAFRuleEnhancer</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> normalize_sql_for_detection</span><span class="__shiki_140thh">(query):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;规范化SQL查询以提高检测率&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        import</span><span class="__shiki_140thh"> re</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 移除注释</span></span>
<span class="line"><span class="__shiki_140thh">        query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> re.sub(</span><span class="__shiki_1itgoe">r</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_21q97f">/</span><span class="__shiki_ghujbu">\\\\</span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb">.</span><span class="__shiki_1itgoe">*?</span><span class="__shiki_ghujbu">\\\\</span><span class="__shiki_1itgoe">*</span><span class="__shiki_21q97f">/</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39; &#39;</span><span class="__shiki_140thh">, query)</span></span>
<span class="line"><span class="__shiki_140thh">        query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> re.sub(</span><span class="__shiki_1itgoe">r</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_21q97f">--</span><span class="__shiki_dzsirb">.</span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb">$</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39; &#39;</span><span class="__shiki_140thh">, query, </span><span class="__shiki_1jdh33">flags</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">re.</span><span class="__shiki_dzsirb">MULTILINE</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 规范化空白符</span></span>
<span class="line"><span class="__shiki_140thh">        query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> re.sub(</span><span class="__shiki_1itgoe">r</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_ghujbu">\\\\</span><span class="__shiki_21q97f">s</span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39; &#39;</span><span class="__shiki_140thh">, query)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 统一大小写</span></span>
<span class="line"><span class="__shiki_140thh">        query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.upper()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 解码常见编码</span></span>
<span class="line"><span class="__shiki_140thh">        query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> urllib.parse.unquote(query)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> query.strip()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> detect_sql_injection_attempts</span><span class="__shiki_140thh">(input_str):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;增强型SQL注入检测&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        patterns </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 联合查询检测</span></span>
<span class="line"><span class="__shiki_1itgoe">            r</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">\\b</span><span class="__shiki_21q97f">UNION</span><span class="__shiki_dzsirb">\\s</span><span class="__shiki_1itgoe">+</span><span class="__shiki_21q97f">SELECT</span><span class="__shiki_dzsirb">\\b</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 条件语句检测</span></span>
<span class="line"><span class="__shiki_1itgoe">            r</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">\\b(</span><span class="__shiki_21q97f">OR</span><span class="__shiki_1itgoe">|</span><span class="__shiki_21q97f">AND</span><span class="__shiki_dzsirb">)\\s</span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb">[</span><span class="__shiki_ghujbu">\\&#39;</span><span class="__shiki_dzsirb">&quot;]</span><span class="__shiki_1itgoe">?</span><span class="__shiki_dzsirb">[\\w]</span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb">\\s</span><span class="__shiki_1itgoe">*</span><span class="__shiki_21q97f">=</span><span class="__shiki_dzsirb">\\s</span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb">[</span><span class="__shiki_ghujbu">\\&#39;</span><span class="__shiki_dzsirb">&quot;]</span><span class="__shiki_1itgoe">?</span><span class="__shiki_dzsirb">[\\w]</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 堆叠查询检测</span></span>
<span class="line"><span class="__shiki_1itgoe">            r</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_21q97f">;</span><span class="__shiki_dzsirb">\\s</span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb">(</span><span class="__shiki_21q97f">DROP</span><span class="__shiki_1itgoe">|</span><span class="__shiki_21q97f">DELETE</span><span class="__shiki_1itgoe">|</span><span class="__shiki_21q97f">UPDATE</span><span class="__shiki_1itgoe">|</span><span class="__shiki_21q97f">INSERT</span><span class="__shiki_dzsirb">)</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 时间盲注检测</span></span>
<span class="line"><span class="__shiki_1itgoe">            r</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">\\b(</span><span class="__shiki_21q97f">SLEEP</span><span class="__shiki_1itgoe">|</span><span class="__shiki_21q97f">WAITFOR</span><span class="__shiki_1itgoe">|</span><span class="__shiki_21q97f">BENCHMARK</span><span class="__shiki_dzsirb">)\\s</span><span class="__shiki_1itgoe">*</span><span class="__shiki_ghujbu">\\(</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 错误注入检测</span></span>
<span class="line"><span class="__shiki_1itgoe">            r</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_21q97f">EXTRACTVALUE</span><span class="__shiki_1itgoe">|</span><span class="__shiki_21q97f">UPDATEXML</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        normalized_input </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> WAFRuleEnhancer.normalize_sql_for_detection(input_str)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> pattern </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> patterns:</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> re.search(pattern, normalized_input, re.</span><span class="__shiki_dzsirb">IGNORECASE</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> False</span></span></code></pre></div><h2 id="_6-企业级防护架构" tabindex="-1">6. 企业级防护架构 <a class="header-anchor" href="#_6-企业级防护架构" aria-label="Permalink to &quot;6. 企业级防护架构&quot;">​</a></h2><h3 id="_6-1-完整防护体系设计" tabindex="-1">6.1 完整防护体系设计 <a class="header-anchor" href="#_6-1-完整防护体系设计" aria-label="Permalink to &quot;6.1 完整防护体系设计&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[客户端请求] --&gt; B[CDN/WAF层]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[API网关]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[输入验证微服务]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[业务逻辑层]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; F[数据访问层]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; G[数据库]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    H[安全监控] --&gt; I[实时威胁检测]</span></span>
<span class="line"><span class="__shiki_140thh">    I --&gt; J[自动阻断]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    K[安全配置管理] --&gt; L[密钥管理]</span></span>
<span class="line"><span class="__shiki_140thh">    K --&gt; M[规则更新]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    subgraph &quot;核心防护组件&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    B[边缘防护&lt;br&gt;DDoS防护/基础WAF]</span></span>
<span class="line"><span class="__shiki_140thh">    D[集中验证服务&lt;br&gt;统一输入处理]</span></span>
<span class="line"><span class="__shiki_140thh">    F[安全数据层&lt;br&gt;参数化查询/ORM]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    subgraph &quot;安全运维&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    H[安全监控与响应]</span></span>
<span class="line"><span class="__shiki_140thh">    K[配置管理]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span></code></pre></div><h3 id="_6-2-安全编码框架实现" tabindex="-1">6.2 安全编码框架实现 <a class="header-anchor" href="#_6-2-安全编码框架实现" aria-label="Permalink to &quot;6.2 安全编码框架实现&quot;">​</a></h3><h4 id="_6-2-1-java安全框架示例" tabindex="-1">6.2.1 Java安全框架示例 <a class="header-anchor" href="#_6-2-1-java安全框架示例" aria-label="Permalink to &quot;6.2.1 Java安全框架示例&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Component</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> SecurityFramework</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> InputValidator inputValidator;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> SqlInjectionDetector sqlDetector;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /**</span></span>
<span class="line"><span class="__shiki_21nrsd">     * 安全的数据库查询执行器</span></span>
<span class="line"><span class="__shiki_21nrsd">     */</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; List&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">executeSecureQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            String </span><span class="__shiki_1jdh33">sqlTemplate</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">            Map&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">params</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">            RowMapper&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">rowMapper</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 验证所有参数</span></span>
<span class="line"><span class="__shiki_140thh">        params.</span><span class="__shiki_1t8gfj">values</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(value </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (value </span><span class="__shiki_1itgoe">instanceof</span><span class="__shiki_140thh"> String) {</span></span>
<span class="line"><span class="__shiki_140thh">                String stringValue </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (String) value;</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (sqlDetector.</span><span class="__shiki_1t8gfj">detectInjection</span><span class="__shiki_140thh">(stringValue)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> SecurityException</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Potential SQL injection detected&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 使用NamedParameterJdbcTemplate执行安全查询</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> namedParameterJdbcTemplate.</span><span class="__shiki_1t8gfj">query</span><span class="__shiki_140thh">(sqlTemplate, params, rowMapper);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /**</span></span>
<span class="line"><span class="__shiki_21nrsd">     * 安全的文件操作</span></span>
<span class="line"><span class="__shiki_21nrsd">     */</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> safeFileOperation</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">userInputPath</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">baseDirectory</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        Path userPath </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Paths.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(userInputPath).</span><span class="__shiki_1t8gfj">normalize</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        Path safePath </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Paths.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(baseDirectory).</span><span class="__shiki_1t8gfj">resolve</span><span class="__shiki_140thh">(userPath).</span><span class="__shiki_1t8gfj">normalize</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 路径遍历检查</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">safePath.</span><span class="__shiki_1t8gfj">startsWith</span><span class="__shiki_140thh">(baseDirectory)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> SecurityException</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Path traversal attempt detected&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 执行文件操作</span></span>
<span class="line"><span class="__shiki_140thh">        Files.</span><span class="__shiki_1t8gfj">readAllLines</span><span class="__shiki_140thh">(safePath);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_6-2-2-python安全中间件" tabindex="-1">6.2.2 Python安全中间件 <a class="header-anchor" href="#_6-2-2-python安全中间件" aria-label="Permalink to &quot;6.2.2 Python安全中间件&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> functools </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> wraps</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> re</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> sql_injection_protected</span><span class="__shiki_140thh">(func):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;SQL注入防护装饰器&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    @wraps</span><span class="__shiki_140thh">(func)</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> wrapper</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs):</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 检查所有字符串参数</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> arg </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> args:</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_dzsirb"> isinstance</span><span class="__shiki_140thh">(arg, </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">and</span><span class="__shiki_140thh"> detect_sql_injection(arg):</span></span>
<span class="line"><span class="__shiki_1itgoe">                raise</span><span class="__shiki_140thh"> SecurityException(</span><span class="__shiki_mdbnqw">&quot;SQL injection detected&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> key, value </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> kwargs.items():</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_dzsirb"> isinstance</span><span class="__shiki_140thh">(value, </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">and</span><span class="__shiki_140thh"> detect_sql_injection(value):</span></span>
<span class="line"><span class="__shiki_1itgoe">                raise</span><span class="__shiki_140thh"> SecurityException(</span><span class="__shiki_mdbnqw">&quot;SQL injection detected&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> func(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs)</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> wrapper</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> command_injection_protected</span><span class="__shiki_140thh">(func):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;命令注入防护装饰器&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    @wraps</span><span class="__shiki_140thh">(func)</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> wrapper</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs):</span></span>
<span class="line"><span class="__shiki_140thh">        dangerous_patterns </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_1itgoe">            r</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">[;&amp;|\`$]</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd"># 命令分隔符</span></span>
<span class="line"><span class="__shiki_1itgoe">            r</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_ghujbu">\\$\\(</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">,     </span><span class="__shiki_21nrsd"># 命令替换</span></span>
<span class="line"><span class="__shiki_1itgoe">            r</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_ghujbu">\\\\</span><span class="__shiki_21q97f">n</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">,      </span><span class="__shiki_21nrsd"># 换行符</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> arg </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> args:</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_dzsirb"> isinstance</span><span class="__shiki_140thh">(arg, </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_1itgoe">                for</span><span class="__shiki_140thh"> pattern </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> dangerous_patterns:</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> re.search(pattern, arg):</span></span>
<span class="line"><span class="__shiki_1itgoe">                        raise</span><span class="__shiki_140thh"> SecurityException(</span><span class="__shiki_mdbnqw">&quot;Command injection detected&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> func(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs)</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> wrapper</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用示例</span></span>
<span class="line"><span class="__shiki_1t8gfj">@sql_injection_protected</span></span>
<span class="line"><span class="__shiki_1t8gfj">@command_injection_protected</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> user_search</span><span class="__shiki_140thh">(username, email):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;受保护的用户搜索函数&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;SELECT * FROM users WHERE username = </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw"> AND email = </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> db.execute(query, (username, email))</span></span></code></pre></div><h2 id="_7-测试与验证框架" tabindex="-1">7. 测试与验证框架 <a class="header-anchor" href="#_7-测试与验证框架" aria-label="Permalink to &quot;7. 测试与验证框架&quot;">​</a></h2><h3 id="_7-1-自动化安全测试" tabindex="-1">7.1 自动化安全测试 <a class="header-anchor" href="#_7-1-自动化安全测试" aria-label="Permalink to &quot;7.1 自动化安全测试&quot;">​</a></h3><h4 id="_7-1-1-sql注入测试套件" tabindex="-1">7.1.1 SQL注入测试套件 <a class="header-anchor" href="#_7-1-1-sql注入测试套件" aria-label="Permalink to &quot;7.1.1 SQL注入测试套件&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> SqlInjectionTestSuite</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> testSqlInjectionVectors</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        List&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; testVectors </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Arrays.</span><span class="__shiki_1t8gfj">asList</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;&#39; OR &#39;1&#39;=&#39;1&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;admin&#39; --&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;&#39;; DROP TABLE users; --&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;1&#39; UNION SELECT 1,2,3 --&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;&#39; AND 1=1 --&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;&#39; OR 1=1 --&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (String vector </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> testVectors) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                userService.</span><span class="__shiki_1t8gfj">login</span><span class="__shiki_140thh">(vector, </span><span class="__shiki_mdbnqw">&quot;password&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">                fail</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SQL injection should be blocked: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> vector);</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (SecurityException </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 预期行为 - 注入被阻止</span></span>
<span class="line"><span class="__shiki_1t8gfj">                assertTrue</span><span class="__shiki_140thh">(e.</span><span class="__shiki_1t8gfj">getMessage</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">contains</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;security&quot;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> testBlindSqlInjection</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        List&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; blindVectors </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Arrays.</span><span class="__shiki_1t8gfj">asList</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;&#39; AND SLEEP(5) --&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;&#39; AND (SELECT * FROM (SELECT(SLEEP(5)))a) --&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;&#39;%20WAITFOR%20DELAY%20&#39;0:0:5&#39;--&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (String vector </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> blindVectors) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            long</span><span class="__shiki_140thh"> startTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> System.</span><span class="__shiki_1t8gfj">currentTimeMillis</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                userService.</span><span class="__shiki_1t8gfj">searchUsers</span><span class="__shiki_140thh">(vector);</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (Exception </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 忽略业务异常，只关注时间延迟</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_1itgoe">            long</span><span class="__shiki_140thh"> duration </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> System.</span><span class="__shiki_1t8gfj">currentTimeMillis</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1t8gfj">            assertTrue</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Time-based blind SQL injection detected&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                      duration </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 3000</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 应该小于3秒</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-持续安全监控" tabindex="-1">7.2 持续安全监控 <a class="header-anchor" href="#_7-2-持续安全监控" aria-label="Permalink to &quot;7.2 持续安全监控&quot;">​</a></h3><h4 id="_7-2-1-安全日志与审计" tabindex="-1">7.2.1 安全日志与审计 <a class="header-anchor" href="#_7-2-1-安全日志与审计" aria-label="Permalink to &quot;7.2.1 安全日志与审计&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> logging</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> json</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> datetime </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> datetime</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> SecurityLogger</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.logger </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> logging.getLogger(</span><span class="__shiki_mdbnqw">&#39;security&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> log_injection_attempt</span><span class="__shiki_140thh">(self, request, detection_type, user_input):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;记录注入尝试&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        log_entry </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;timestamp&#39;</span><span class="__shiki_140thh">: datetime.utcnow().isoformat(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;injection_attempt&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;detection_type&#39;</span><span class="__shiki_140thh">: detection_type,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;user_input&#39;</span><span class="__shiki_140thh">: user_input[:</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">],  </span><span class="__shiki_21nrsd"># 限制长度</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;ip_address&#39;</span><span class="__shiki_140thh">: request.remote_addr,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;user_agent&#39;</span><span class="__shiki_140thh">: request.headers.get(</span><span class="__shiki_mdbnqw">&#39;User-Agent&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;endpoint&#39;</span><span class="__shiki_140thh">: request.path,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;severity&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;HIGH&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.logger.warning(json.dumps(log_entry))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> log_security_event</span><span class="__shiki_140thh">(self, event_type, details):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;记录安全事件&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        event </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;timestamp&#39;</span><span class="__shiki_140thh">: datetime.utcnow().isoformat(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;event_type&#39;</span><span class="__shiki_140thh">: event_type,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;details&#39;</span><span class="__shiki_140thh">: details</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.logger.info(json.dumps(event))</span></span></code></pre></div><h2 id="_8-应急响应与恢复" tabindex="-1">8. 应急响应与恢复 <a class="header-anchor" href="#_8-应急响应与恢复" aria-label="Permalink to &quot;8. 应急响应与恢复&quot;">​</a></h2><h3 id="_8-1-注入攻击应急响应流程" tabindex="-1">8.1 注入攻击应急响应流程 <a class="header-anchor" href="#_8-1-注入攻击应急响应流程" aria-label="Permalink to &quot;8.1 注入攻击应急响应流程&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">flowchart TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[检测到注入攻击] --&gt; B[立即隔离受影响系统]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[收集攻击证据]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D{攻击类型}</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[SQL注入]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; F[命令注入]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; G[其他注入]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E1[审查数据库日志]</span></span>
<span class="line"><span class="__shiki_140thh">    E1 --&gt; E2[检查数据完整性]</span></span>
<span class="line"><span class="__shiki_140thh">    E2 --&gt; E3[修复数据库漏洞]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; F1[审查系统命令日志]</span></span>
<span class="line"><span class="__shiki_140thh">    F1 --&gt; F2[检查系统完整性]</span></span>
<span class="line"><span class="__shiki_140thh">    F2 --&gt; F3[修复应用漏洞]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    G --&gt; G1[针对性调查]</span></span>
<span class="line"><span class="__shiki_140thh">    G1 --&gt; G2[评估影响范围]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    E3 --&gt; H[验证防护措施]</span></span>
<span class="line"><span class="__shiki_140thh">    F3 --&gt; H</span></span>
<span class="line"><span class="__shiki_140thh">    G2 --&gt; H</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    H --&gt; I[恢复服务]</span></span>
<span class="line"><span class="__shiki_140thh">    I --&gt; J[持续监控]</span></span>
<span class="line"><span class="__shiki_140thh">    J --&gt; K[编写事件报告]</span></span></code></pre></div><h3 id="_8-2-事后加固措施" tabindex="-1">8.2 事后加固措施 <a class="header-anchor" href="#_8-2-事后加固措施" aria-label="Permalink to &quot;8.2 事后加固措施&quot;">​</a></h3><ol><li><p><strong>立即措施</strong></p><ul><li>重置数据库密码</li><li>轮换应用密钥</li><li>审查用户权限</li></ul></li><li><p><strong>中期措施</strong></p><ul><li>代码安全审计</li><li>增强监控规则</li><li>员工安全意识培训</li></ul></li><li><p><strong>长期措施</strong></p><ul><li>实施安全开发生命周期</li><li>建立安全编码标准</li><li>定期渗透测试</li></ul></li></ol><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>OWASP注入防护是一个<strong>系统性工程</strong>，需要从技术、流程、人员三个维度构建完整的防护体系：</p><h3 id="核心技术防护" tabindex="-1">核心技术防护 <a class="header-anchor" href="#核心技术防护" aria-label="Permalink to &quot;核心技术防护&quot;">​</a></h3><ul><li><strong>参数化查询</strong>是根本解决方案</li><li><strong>输入验证</strong>提供第一道防线</li><li><strong>最小权限原则</strong>限制攻击影响</li><li><strong>输出编码</strong>防止二次注入</li></ul><h3 id="流程保障" tabindex="-1">流程保障 <a class="header-anchor" href="#流程保障" aria-label="Permalink to &quot;流程保障&quot;">​</a></h3><ul><li><strong>安全开发生命周期</strong>集成安全</li><li><strong>代码审查</strong>发现潜在漏洞</li><li><strong>自动化测试</strong>持续验证防护</li><li><strong>安全监控</strong>实时检测攻击</li></ul><h3 id="人员能力" tabindex="-1">人员能力 <a class="header-anchor" href="#人员能力" aria-label="Permalink to &quot;人员能力&quot;">​</a></h3><ul><li><strong>安全意识培训</strong>提升防护意识</li><li><strong>安全编码规范</strong>统一实践</li><li><strong>应急响应演练</strong>提高处置能力</li></ul><p>记住：<strong>没有100%的安全，只有100%的尽力</strong>。防护注入攻击需要持续改进和深度防御，将安全融入开发的每个环节。</p>`,82)])])}const d=a(p,[["render",h]]);export{r as __pageData,d as default};
