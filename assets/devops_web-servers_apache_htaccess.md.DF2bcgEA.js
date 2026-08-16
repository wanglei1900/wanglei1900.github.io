import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"Web服务器Apache .htaccess配置深度解析学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"devops/web-servers/apache/htaccess.md","filePath":"devops/web-servers/apache/htaccess.md"}'),_={name:"devops/web-servers/apache/htaccess.md"};function l(h,s,e,c,t,o){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="web服务器apache-htaccess配置深度解析学习笔记" tabindex="-1">Web服务器Apache .htaccess配置深度解析学习笔记 <a class="header-anchor" href="#web服务器apache-htaccess配置深度解析学习笔记" aria-label="Permalink to &quot;Web服务器Apache .htaccess配置深度解析学习笔记&quot;">​</a></h1><h2 id="_1-htaccess基础概念" tabindex="-1">1. .htaccess基础概念 <a class="header-anchor" href="#_1-htaccess基础概念" aria-label="Permalink to &quot;1. .htaccess基础概念&quot;">​</a></h2><h3 id="_1-1-什么是-htaccess" tabindex="-1">1.1 什么是.htaccess？ <a class="header-anchor" href="#_1-1-什么是-htaccess" aria-label="Permalink to &quot;1.1 什么是.htaccess？&quot;">​</a></h3><p><strong><code>.htaccess</code>（超文本访问文件）</strong> 是Apache HTTP服务器的分布式配置文件，允许在目录级别覆盖主服务器配置。文件名前的点表示这是一个隐藏文件。</p><h3 id="_1-2-工作原理" tabindex="-1">1.2 工作原理 <a class="header-anchor" href="#_1-2-工作原理" aria-label="Permalink to &quot;1.2 工作原理&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">HTTP请求到达Apache</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">Apache检查请求路径的每个目录</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">从根目录开始逐级查找.htaccess文件</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">找到并读取配置指令</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">应用配置到当前请求</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">继续向下级目录查找</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">最终所有配置合并生效</span></span></code></pre></div><h3 id="_1-3-核心特点" tabindex="-1">1.3 核心特点 <a class="header-anchor" href="#_1-3-核心特点" aria-label="Permalink to &quot;1.3 核心特点&quot;">​</a></h3><ul><li><strong>目录级配置</strong>：每个目录都可以有自己的.htaccess文件</li><li><strong>即时生效</strong>：修改后无需重启Apache</li><li><strong>权限要求低</strong>：适用于共享主机环境</li><li><strong>继承性</strong>：子目录继承父目录配置（可被覆盖）</li></ul><h2 id="_2-启用与禁用-htaccess" tabindex="-1">2. 启用与禁用.htaccess <a class="header-anchor" href="#_2-启用与禁用-htaccess" aria-label="Permalink to &quot;2. 启用与禁用.htaccess&quot;">​</a></h2><h3 id="_2-1-主配置文件设置" tabindex="-1">2.1 主配置文件设置 <a class="header-anchor" href="#_2-1-主配置文件设置" aria-label="Permalink to &quot;2.1 主配置文件设置&quot;">​</a></h3><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># httpd.conf或apache2.conf中的配置</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 允许所有目录使用.htaccess</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">Directory</span><span class="__shiki_mdbnqw"> &quot;/var/www/html&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    AllowOverride</span><span class="__shiki_140thh"> All</span></span>
<span class="line"><span class="__shiki_1itgoe">    Options</span><span class="__shiki_140thh"> Indexes FollowSymLinks</span></span>
<span class="line"><span class="__shiki_1itgoe">    Require</span><span class="__shiki_140thh"> all granted</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">Directory</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 禁止特定目录使用.htaccess</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">Directory</span><span class="__shiki_mdbnqw"> &quot;/var/www/html/secure&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    AllowOverride</span><span class="__shiki_140thh"> None</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">Directory</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h3 id="_2-2-allowoverride指令详解" tabindex="-1">2.2 AllowOverride指令详解 <a class="header-anchor" href="#_2-2-allowoverride指令详解" aria-label="Permalink to &quot;2.2 AllowOverride指令详解&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数值</th><th>含义</th><th>允许的指令类型</th></tr></thead><tbody><tr><td><strong>All</strong></td><td>允许所有指令</td><td>全部.htaccess指令</td></tr><tr><td><strong>None</strong></td><td>完全禁止</td><td>无</td></tr><tr><td><strong>AuthConfig</strong></td><td>认证相关</td><td>AuthType, AuthName, Require等</td></tr><tr><td><strong>FileInfo</strong></td><td>文档处理</td><td>ErrorDocument, Redirect, RewriteRule等</td></tr><tr><td><strong>Indexes</strong></td><td>目录索引</td><td>DirectoryIndex, IndexOptions等</td></tr><tr><td><strong>Limit</strong></td><td>访问控制</td><td>Order, Allow, Deny等</td></tr><tr><td><strong>Options</strong></td><td>目录选项</td><td>Options, XBitHack等</td></tr></tbody></table><h2 id="_3-常用-htaccess配置详解" tabindex="-1">3. 常用.htaccess配置详解 <a class="header-anchor" href="#_3-常用-htaccess配置详解" aria-label="Permalink to &quot;3. 常用.htaccess配置详解&quot;">​</a></h2><h3 id="_3-1-url重写与重定向" tabindex="-1">3.1 URL重写与重定向 <a class="header-anchor" href="#_3-1-url重写与重定向" aria-label="Permalink to &quot;3.1 URL重写与重定向&quot;">​</a></h3><h4 id="_3-1-1-基本重定向" tabindex="-1">3.1.1 基本重定向 <a class="header-anchor" href="#_3-1-1-基本重定向" aria-label="Permalink to &quot;3.1.1 基本重定向&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 301永久重定向</span></span>
<span class="line"><span class="__shiki_1itgoe">Redirect</span><span class="__shiki_1t8gfj"> 301</span><span class="__shiki_mdbnqw"> /old-page.html</span><span class="__shiki_mdbnqw"> http://example.com/new-page.html</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 302临时重定向</span></span>
<span class="line"><span class="__shiki_1itgoe">Redirect</span><span class="__shiki_1t8gfj"> 302</span><span class="__shiki_mdbnqw"> /temp.html</span><span class="__shiki_mdbnqw"> http://example.com/other.html</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 整个目录重定向</span></span>
<span class="line"><span class="__shiki_1itgoe">RedirectMatch</span><span class="__shiki_1t8gfj"> 301</span><span class="__shiki_21q97f"> ^/old-dir/(.*)$</span><span class="__shiki_mdbnqw"> http://example.com/new-dir/$1</span></span></code></pre></div><h4 id="_3-1-2-mod-rewrite模块" tabindex="-1">3.1.2 mod_rewrite模块 <a class="header-anchor" href="#_3-1-2-mod-rewrite模块" aria-label="Permalink to &quot;3.1.2 mod_rewrite模块&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 启用重写引擎</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteEngine</span><span class="__shiki_1t8gfj"> On</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置重写规则基础路径（根据目录位置调整）</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteBase</span><span class="__shiki_140thh"> /</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 强制HTTPS</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{HTTPS}</span><span class="__shiki_mdbnqw"> off</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteRule</span><span class="__shiki_21q97f"> ^(.*)$</span><span class="__shiki_mdbnqw"> https://%{HTTP_HOST}/$1</span><span class="__shiki_140thh"> [R=</span><span class="__shiki_dzsirb">301</span><span class="__shiki_140thh">,L]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 强制www</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{HTTP_HOST}</span><span class="__shiki_mdbnqw"> ^example\\.com</span><span class="__shiki_140thh"> [NC]</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteRule</span><span class="__shiki_21q97f"> ^(.*)$</span><span class="__shiki_mdbnqw"> https://www.example.com/$1</span><span class="__shiki_140thh"> [R=</span><span class="__shiki_dzsirb">301</span><span class="__shiki_140thh">,L]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 强制非www</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{HTTP_HOST}</span><span class="__shiki_mdbnqw"> ^www\\.example\\.com</span><span class="__shiki_140thh"> [NC]</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteRule</span><span class="__shiki_21q97f"> ^(.*)$</span><span class="__shiki_mdbnqw"> https://example.com/$1</span><span class="__shiki_140thh"> [R=</span><span class="__shiki_dzsirb">301</span><span class="__shiki_140thh">,L]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 自定义错误页面重定向</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{REQUEST_URI}</span><span class="__shiki_mdbnqw"> ^/404/$</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteRule</span><span class="__shiki_21q97f"> ^(.*)$</span><span class="__shiki_mdbnqw"> /index.php?page=404</span><span class="__shiki_140thh"> [L]</span></span></code></pre></div><h3 id="_3-2-访问控制" tabindex="-1">3.2 访问控制 <a class="header-anchor" href="#_3-2-访问控制" aria-label="Permalink to &quot;3.2 访问控制&quot;">​</a></h3><h4 id="_3-2-1-ip地址限制" tabindex="-1">3.2.1 IP地址限制 <a class="header-anchor" href="#_3-2-1-ip地址限制" aria-label="Permalink to &quot;3.2.1 IP地址限制&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Apache 2.2语法</span></span>
<span class="line"><span class="__shiki_1itgoe">Order</span><span class="__shiki_140thh"> deny,allow</span></span>
<span class="line"><span class="__shiki_1itgoe">Deny</span><span class="__shiki_1t8gfj"> from</span><span class="__shiki_dzsirb"> 192</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">168</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_1itgoe">Deny</span><span class="__shiki_1t8gfj"> from</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">/</span><span class="__shiki_dzsirb">24</span></span>
<span class="line"><span class="__shiki_1itgoe">Allow</span><span class="__shiki_1t8gfj"> from</span><span class="__shiki_140thh"> all</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Apache 2.4+语法（推荐）</span></span>
<span class="line"><span class="__shiki_1itgoe">Require</span><span class="__shiki_140thh"> all granted</span></span>
<span class="line"><span class="__shiki_1itgoe">Require</span><span class="__shiki_140thh"> not ip </span><span class="__shiki_dzsirb">192</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">168</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_1itgoe">Require</span><span class="__shiki_140thh"> not ip </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">/</span><span class="__shiki_dzsirb">24</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 只允许特定IP</span></span>
<span class="line"><span class="__shiki_1itgoe">Require</span><span class="__shiki_140thh"> ip </span><span class="__shiki_dzsirb">203</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">113</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">/</span><span class="__shiki_dzsirb">24</span></span>
<span class="line"><span class="__shiki_1itgoe">Require</span><span class="__shiki_140thh"> ip </span><span class="__shiki_dzsirb">2001</span><span class="__shiki_140thh">:db8::/</span><span class="__shiki_dzsirb">32</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 复杂逻辑：允许特定IP段，但拒绝其中某个IP</span></span>
<span class="line"><span class="__shiki_140thh">&lt;RequireAll&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    Require</span><span class="__shiki_140thh"> ip </span><span class="__shiki_dzsirb">192</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">168</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">/</span><span class="__shiki_dzsirb">24</span></span>
<span class="line"><span class="__shiki_1itgoe">    Require</span><span class="__shiki_140thh"> not ip </span><span class="__shiki_dzsirb">192</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">168</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">50</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/RequireAll&gt;</span></span></code></pre></div><h4 id="_3-2-2-密码保护目录" tabindex="-1">3.2.2 密码保护目录 <a class="header-anchor" href="#_3-2-2-密码保护目录" aria-label="Permalink to &quot;3.2.2 密码保护目录&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基本认证</span></span>
<span class="line"><span class="__shiki_1itgoe">AuthType</span><span class="__shiki_140thh"> Basic</span></span>
<span class="line"><span class="__shiki_1itgoe">AuthName</span><span class="__shiki_140thh"> &quot;Restricted Area&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">AuthUserFile</span><span class="__shiki_140thh"> /path/to/.htpasswd</span></span>
<span class="line"><span class="__shiki_1itgoe">Require</span><span class="__shiki_140thh"> valid-user</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 组认证</span></span>
<span class="line"><span class="__shiki_1itgoe">AuthType</span><span class="__shiki_140thh"> Basic</span></span>
<span class="line"><span class="__shiki_1itgoe">AuthName</span><span class="__shiki_140thh"> &quot;Admin Area&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">AuthUserFile</span><span class="__shiki_140thh"> /path/to/.htpasswd</span></span>
<span class="line"><span class="__shiki_1itgoe">AuthGroupFile</span><span class="__shiki_140thh"> /path/to/.htgroup</span></span>
<span class="line"><span class="__shiki_1itgoe">Require</span><span class="__shiki_140thh"> group admins</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 允许多个用户</span></span>
<span class="line"><span class="__shiki_1itgoe">Require</span><span class="__shiki_140thh"> user user1 user2 user3</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 密码文件示例（使用htpasswd命令创建）</span></span>
<span class="line"><span class="__shiki_21nrsd"># user1:$apr1$random.salt$hashed.password</span></span>
<span class="line"><span class="__shiki_21nrsd"># user2:$apr1$different.salt$other.hash</span></span></code></pre></div><h4 id="_3-2-3-文件类型访问控制" tabindex="-1">3.2.3 文件类型访问控制 <a class="header-anchor" href="#_3-2-3-文件类型访问控制" aria-label="Permalink to &quot;3.2.3 文件类型访问控制&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 禁止访问敏感文件</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_mdbnqw"> &quot;\\.(htaccess|htpasswd|ini|log|sh|sql)$&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    Order</span><span class="__shiki_140thh"> allow,deny</span></span>
<span class="line"><span class="__shiki_1itgoe">    Deny</span><span class="__shiki_1t8gfj"> from</span><span class="__shiki_140thh"> all</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 保护配置文件</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">Files</span><span class="__shiki_mdbnqw"> &quot;config.php&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    Require</span><span class="__shiki_140thh"> all denied</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">Files</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 只允许特定IP访问后台</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_mdbnqw"> &quot;admin\\.php$&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    Require</span><span class="__shiki_140thh"> ip </span><span class="__shiki_dzsirb">192</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">168</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_1itgoe">    Require</span><span class="__shiki_140thh"> ip </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">50</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h3 id="_3-3-错误页面定制" tabindex="-1">3.3 错误页面定制 <a class="header-anchor" href="#_3-3-错误页面定制" aria-label="Permalink to &quot;3.3 错误页面定制&quot;">​</a></h3><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 自定义错误页面</span></span>
<span class="line"><span class="__shiki_1itgoe">ErrorDocument</span><span class="__shiki_dzsirb"> 400</span><span class="__shiki_140thh"> /errors/</span><span class="__shiki_dzsirb">400</span><span class="__shiki_140thh">.html</span></span>
<span class="line"><span class="__shiki_1itgoe">ErrorDocument</span><span class="__shiki_dzsirb"> 401</span><span class="__shiki_140thh"> /errors/</span><span class="__shiki_dzsirb">401</span><span class="__shiki_140thh">.html</span></span>
<span class="line"><span class="__shiki_1itgoe">ErrorDocument</span><span class="__shiki_dzsirb"> 403</span><span class="__shiki_140thh"> /errors/</span><span class="__shiki_dzsirb">403</span><span class="__shiki_140thh">.html</span></span>
<span class="line"><span class="__shiki_1itgoe">ErrorDocument</span><span class="__shiki_dzsirb"> 404</span><span class="__shiki_140thh"> /errors/</span><span class="__shiki_dzsirb">404</span><span class="__shiki_140thh">.html</span></span>
<span class="line"><span class="__shiki_1itgoe">ErrorDocument</span><span class="__shiki_dzsirb"> 500</span><span class="__shiki_140thh"> /errors/</span><span class="__shiki_dzsirb">500</span><span class="__shiki_140thh">.html</span></span>
<span class="line"><span class="__shiki_1itgoe">ErrorDocument</span><span class="__shiki_dzsirb"> 503</span><span class="__shiki_140thh"> /errors/</span><span class="__shiki_dzsirb">503</span><span class="__shiki_140thh">.html</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 动态错误页面（传递状态码）</span></span>
<span class="line"><span class="__shiki_1itgoe">ErrorDocument</span><span class="__shiki_dzsirb"> 404</span><span class="__shiki_140thh"> /error.php?code=</span><span class="__shiki_dzsirb">404</span></span>
<span class="line"><span class="__shiki_1itgoe">ErrorDocument</span><span class="__shiki_dzsirb"> 500</span><span class="__shiki_140thh"> /error.php?code=</span><span class="__shiki_dzsirb">500</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 内联错误消息</span></span>
<span class="line"><span class="__shiki_1itgoe">ErrorDocument</span><span class="__shiki_dzsirb"> 404</span><span class="__shiki_140thh"> &quot;&lt;h1&gt;Not Found&lt;/h1&gt;&lt;p&gt;The requested URL was not found.&lt;/p&gt;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">ErrorDocument</span><span class="__shiki_dzsirb"> 500</span><span class="__shiki_140thh"> &quot;&lt;h1&gt;Server Error&lt;/h1&gt;&lt;p&gt;Please try again later.&lt;/p&gt;&quot;</span></span></code></pre></div><h3 id="_3-4-性能优化配置" tabindex="-1">3.4 性能优化配置 <a class="header-anchor" href="#_3-4-性能优化配置" aria-label="Permalink to &quot;3.4 性能优化配置&quot;">​</a></h3><h4 id="_3-4-1-浏览器缓存控制" tabindex="-1">3.4.1 浏览器缓存控制 <a class="header-anchor" href="#_3-4-1-浏览器缓存控制" aria-label="Permalink to &quot;3.4.1 浏览器缓存控制&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 启用Expires头</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_expires.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresActive</span><span class="__shiki_1t8gfj"> On</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 默认缓存1天</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresDefault</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> day&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 图片缓存1个月</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> image/jpeg</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> month&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> image/png</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> month&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> image/gif</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> month&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> image/svg+xml</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> month&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> image/webp</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> month&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # CSS和JavaScript缓存1周</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> text/css</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> week&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> application/javascript</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> week&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 字体缓存1年</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_140thh"> font/woff &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> year&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_140thh"> font/woff2 &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> year&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> application/font-woff</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> year&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 动态内容不缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> text/html</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh"> seconds&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> application/json</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh"> seconds&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> application/xml</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh"> seconds&quot;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h4 id="_3-4-2-压缩配置" tabindex="-1">3.4.2 压缩配置 <a class="header-anchor" href="#_3-4-2-压缩配置" aria-label="Permalink to &quot;3.4.2 压缩配置&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 启用压缩</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_deflate.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    AddOutputFilterByType</span><span class="__shiki_140thh"> DEFLATE </span><span class="__shiki_1t8gfj">text/html</span><span class="__shiki_1t8gfj"> text/plain</span><span class="__shiki_1t8gfj"> text/xml</span></span>
<span class="line"><span class="__shiki_1itgoe">    AddOutputFilterByType</span><span class="__shiki_140thh"> DEFLATE </span><span class="__shiki_1t8gfj">text/css</span></span>
<span class="line"><span class="__shiki_1itgoe">    AddOutputFilterByType</span><span class="__shiki_140thh"> DEFLATE </span><span class="__shiki_1t8gfj">application/javascript</span></span>
<span class="line"><span class="__shiki_1itgoe">    AddOutputFilterByType</span><span class="__shiki_140thh"> DEFLATE </span><span class="__shiki_1t8gfj">application/json</span></span>
<span class="line"><span class="__shiki_1itgoe">    AddOutputFilterByType</span><span class="__shiki_140thh"> DEFLATE </span><span class="__shiki_1t8gfj">application/xml</span></span>
<span class="line"><span class="__shiki_1itgoe">    AddOutputFilterByType</span><span class="__shiki_140thh"> DEFLATE </span><span class="__shiki_1t8gfj">application/xhtml+xml</span></span>
<span class="line"><span class="__shiki_1itgoe">    AddOutputFilterByType</span><span class="__shiki_140thh"> DEFLATE </span><span class="__shiki_1t8gfj">application/rss+xml</span></span>
<span class="line"><span class="__shiki_1itgoe">    AddOutputFilterByType</span><span class="__shiki_140thh"> DEFLATE </span><span class="__shiki_1t8gfj">application/atom+xml</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 排除旧浏览器</span></span>
<span class="line"><span class="__shiki_1itgoe">    BrowserMatch</span><span class="__shiki_140thh"> ^Mozilla/</span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh"> gzip-only-</span><span class="__shiki_1t8gfj">text/html</span></span>
<span class="line"><span class="__shiki_1itgoe">    BrowserMatch</span><span class="__shiki_140thh"> ^Mozilla/</span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">\\.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">678</span><span class="__shiki_140thh">] no-gzip</span></span>
<span class="line"><span class="__shiki_1itgoe">    BrowserMatch</span><span class="__shiki_140thh"> \\bMSIE !no-gzip !gzip-only-</span><span class="__shiki_1t8gfj">text/html</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 设置压缩级别（1-9）</span></span>
<span class="line"><span class="__shiki_1itgoe">    DeflateCompressionLevel</span><span class="__shiki_dzsirb"> 6</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h4 id="_3-4-3-etag优化" tabindex="-1">3.4.3 ETag优化 <a class="header-anchor" href="#_3-4-3-etag优化" aria-label="Permalink to &quot;3.4.3 ETag优化&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 禁用ETag（在负载均衡环境中推荐）</span></span>
<span class="line"><span class="__shiki_1itgoe">FileETag</span><span class="__shiki_140thh"> None</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 或使用弱ETag</span></span>
<span class="line"><span class="__shiki_1itgoe">FileETag</span><span class="__shiki_140thh"> MTime Size</span></span></code></pre></div><h3 id="_3-5-安全增强配置" tabindex="-1">3.5 安全增强配置 <a class="header-anchor" href="#_3-5-安全增强配置" aria-label="Permalink to &quot;3.5 安全增强配置&quot;">​</a></h3><h4 id="_3-5-1-防止目录遍历" tabindex="-1">3.5.1 防止目录遍历 <a class="header-anchor" href="#_3-5-1-防止目录遍历" aria-label="Permalink to &quot;3.5.1 防止目录遍历&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 禁用目录列表</span></span>
<span class="line"><span class="__shiki_1itgoe">Options</span><span class="__shiki_140thh"> -Indexes</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 自定义目录列表（如果必须启用）</span></span>
<span class="line"><span class="__shiki_1itgoe">IndexOptions</span><span class="__shiki_140thh"> FancyIndexing HTMLTable NameWidth=* DescriptionWidth=* </span></span>
<span class="line"><span class="__shiki_1itgoe">IndexIgnore</span><span class="__shiki_140thh"> .htaccess .git README.md *.log</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 显示特定文件类型图标</span></span>
<span class="line"><span class="__shiki_1itgoe">AddIcon</span><span class="__shiki_140thh"> /icons/text.gif .txt .html .htm</span></span>
<span class="line"><span class="__shiki_1itgoe">AddIcon</span><span class="__shiki_140thh"> /icons/image.gif .jpg .png .gif</span></span></code></pre></div><h4 id="_3-5-2-防止点击劫持" tabindex="-1">3.5.2 防止点击劫持 <a class="header-anchor" href="#_3-5-2-防止点击劫持" aria-label="Permalink to &quot;3.5.2 防止点击劫持&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 设置X-Frame-Options头</span></span>
<span class="line"><span class="__shiki_1itgoe">Header</span><span class="__shiki_140thh"> always append X-Frame-</span><span class="__shiki_1itgoe">Options</span><span class="__shiki_140thh"> SAMEORIGIN</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 或完全禁止嵌入</span></span>
<span class="line"><span class="__shiki_1itgoe">Header</span><span class="__shiki_140thh"> always append X-Frame-</span><span class="__shiki_1itgoe">Options</span><span class="__shiki_140thh"> DENY</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 允许特定域名嵌入</span></span>
<span class="line"><span class="__shiki_1itgoe">Header</span><span class="__shiki_140thh"> always append X-Frame-</span><span class="__shiki_1itgoe">Options</span><span class="__shiki_140thh"> ALLOW-</span><span class="__shiki_1t8gfj">FROM</span><span class="__shiki_140thh"> https://trusted.example.com</span></span></code></pre></div><h4 id="_3-5-3-安全头配置" tabindex="-1">3.5.3 安全头配置 <a class="header-anchor" href="#_3-5-3-安全头配置" aria-label="Permalink to &quot;3.5.3 安全头配置&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 防止内容类型嗅探</span></span>
<span class="line"><span class="__shiki_1itgoe">Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> X-Content-Type-</span><span class="__shiki_1itgoe">Options</span><span class="__shiki_140thh"> &quot;nosniff&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 启用XSS保护</span></span>
<span class="line"><span class="__shiki_1itgoe">Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> X-XSS-Protection &quot;</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">; mode=block&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 防止MIME类型混淆</span></span>
<span class="line"><span class="__shiki_1itgoe">Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> X-Content-Type-</span><span class="__shiki_1itgoe">Options</span><span class="__shiki_140thh"> nosniff</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置Referrer策略</span></span>
<span class="line"><span class="__shiki_1itgoe">Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> Referrer-Policy &quot;strict-origin-when-cross-origin&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置内容安全策略（CSP）</span></span>
<span class="line"><span class="__shiki_1itgoe">Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> Content-Security-Policy &quot;default-src &#39;self&#39;; script-src &#39;self&#39; https://cdn.example.com; style-src &#39;self&#39; &#39;unsafe-inline&#39;&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置HSTS（强制HTTPS）</span></span>
<span class="line"><span class="__shiki_1itgoe">Header</span><span class="__shiki_140thh"> always </span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh"> Strict-Transport-Security &quot;max-age=</span><span class="__shiki_dzsirb">31536000</span><span class="__shiki_140thh">; includeSubDomains; preload&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置Feature-Policy</span></span>
<span class="line"><span class="__shiki_1itgoe">Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> Feature-Policy &quot;geolocation &#39;none&#39;; microphone &#39;none&#39;; camera &#39;none&#39;&quot;</span></span></code></pre></div><h4 id="_3-5-4-防止热链接" tabindex="-1">3.5.4 防止热链接 <a class="header-anchor" href="#_3-5-4-防止热链接" aria-label="Permalink to &quot;3.5.4 防止热链接&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 防止图片热链接</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteEngine</span><span class="__shiki_1t8gfj"> On</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{HTTP_REFERER}</span><span class="__shiki_mdbnqw"> !^$</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{HTTP_REFERER}</span><span class="__shiki_mdbnqw"> !^https?://(www\\.)?example\\.com/.*$</span><span class="__shiki_140thh"> [NC]</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteRule</span><span class="__shiki_21q97f"> \\.(jpg|jpeg|png|gif|bmp)$</span><span class="__shiki_mdbnqw"> -</span><span class="__shiki_140thh"> [F,NC,L]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 显示替代图片</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteEngine</span><span class="__shiki_1t8gfj"> On</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{HTTP_REFERER}</span><span class="__shiki_mdbnqw"> !^$</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{HTTP_REFERER}</span><span class="__shiki_mdbnqw"> !^https?://(www\\.)?example\\.com/.*$</span><span class="__shiki_140thh"> [NC]</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteRule</span><span class="__shiki_21q97f"> \\.(jpg|jpeg|png|gif|bmp)$</span><span class="__shiki_mdbnqw"> /images/hotlink.jpg</span><span class="__shiki_140thh"> [R,L]</span></span></code></pre></div><h3 id="_3-6-php配置覆盖" tabindex="-1">3.6 PHP配置覆盖 <a class="header-anchor" href="#_3-6-php配置覆盖" aria-label="Permalink to &quot;3.6 PHP配置覆盖&quot;">​</a></h3><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 覆盖PHP配置</span></span>
<span class="line"><span class="__shiki_1itgoe">php_value</span><span class="__shiki_1t8gfj"> upload_max_filesize</span><span class="__shiki_mdbnqw"> 20M</span></span>
<span class="line"><span class="__shiki_1itgoe">php_value</span><span class="__shiki_1t8gfj"> post_max_size</span><span class="__shiki_mdbnqw"> 25M</span></span>
<span class="line"><span class="__shiki_1itgoe">php_value</span><span class="__shiki_1t8gfj"> max_execution_time</span><span class="__shiki_mdbnqw"> 300</span></span>
<span class="line"><span class="__shiki_1itgoe">php_value</span><span class="__shiki_1t8gfj"> memory_limit</span><span class="__shiki_mdbnqw"> 128M</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 禁用危险函数</span></span>
<span class="line"><span class="__shiki_1itgoe">php_admin_flag</span><span class="__shiki_1t8gfj"> allow_url_fopen</span><span class="__shiki_mdbnqw"> off</span></span>
<span class="line"><span class="__shiki_1itgoe">php_admin_flag</span><span class="__shiki_1t8gfj"> allow_url_include</span><span class="__shiki_mdbnqw"> off</span></span>
<span class="line"><span class="__shiki_1itgoe">php_admin_value</span><span class="__shiki_1t8gfj"> open_basedir</span><span class="__shiki_mdbnqw"> &quot;/var/www/html:/tmp&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置时区</span></span>
<span class="line"><span class="__shiki_1itgoe">php_value</span><span class="__shiki_1t8gfj"> date.timezone</span><span class="__shiki_mdbnqw"> &quot;Asia/Shanghai&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 错误报告设置</span></span>
<span class="line"><span class="__shiki_1itgoe">php_flag</span><span class="__shiki_1t8gfj"> display_errors</span><span class="__shiki_mdbnqw"> off</span></span>
<span class="line"><span class="__shiki_1itgoe">php_flag</span><span class="__shiki_1t8gfj"> log_errors</span><span class="__shiki_mdbnqw"> on</span></span>
<span class="line"><span class="__shiki_1itgoe">php_value</span><span class="__shiki_1t8gfj"> error_log</span><span class="__shiki_mdbnqw"> /var/log/php_errors.log</span></span>
<span class="line"><span class="__shiki_1itgoe">php_value</span><span class="__shiki_1t8gfj"> error_reporting</span><span class="__shiki_mdbnqw"> E_ALL</span><span class="__shiki_140thh"> &amp; ~E_NOTICE &amp; ~E_DEPRECATED</span></span></code></pre></div><h2 id="_4-高级重写规则" tabindex="-1">4. 高级重写规则 <a class="header-anchor" href="#_4-高级重写规则" aria-label="Permalink to &quot;4. 高级重写规则&quot;">​</a></h2><h3 id="_4-1-seo友好的url" tabindex="-1">4.1 SEO友好的URL <a class="header-anchor" href="#_4-1-seo友好的url" aria-label="Permalink to &quot;4.1 SEO友好的URL&quot;">​</a></h3><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 隐藏.php扩展名</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{REQUEST_FILENAME}</span><span class="__shiki_mdbnqw"> !-d</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{REQUEST_FILENAME}\\.php</span><span class="__shiki_mdbnqw"> -f</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteRule</span><span class="__shiki_21q97f"> ^(.*)$</span><span class="__shiki_mdbnqw"> $1.php</span><span class="__shiki_140thh"> [L]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 文章URL重写</span></span>
<span class="line"><span class="__shiki_21nrsd"># 将 /article/123-title 重写为 article.php?id=123</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteRule</span><span class="__shiki_21q97f"> ^article/([0-9]+)-([a-z0-9-]+)/?$</span><span class="__shiki_mdbnqw"> article.php?id=$1</span><span class="__shiki_140thh"> [NC,L]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 多参数重写</span></span>
<span class="line"><span class="__shiki_21nrsd"># /category/books/page/2 重写为 category.php?name=books&amp;page=2</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteRule</span><span class="__shiki_21q97f"> ^category/([a-z]+)/page/([0-9]+)/?$</span><span class="__shiki_mdbnqw"> category.php?name=$1&amp;page=$2</span><span class="__shiki_140thh"> [NC,L]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 强制尾部斜杠</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{REQUEST_URI}</span><span class="__shiki_mdbnqw"> /+[^\\.]+$</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteRule</span><span class="__shiki_21q97f"> ^(.+[^/])$</span><span class="__shiki_mdbnqw"> %{REQUEST_URI}/</span><span class="__shiki_140thh"> [R=</span><span class="__shiki_dzsirb">301</span><span class="__shiki_140thh">,L]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 移除尾部斜杠（非目录）</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{REQUEST_FILENAME}</span><span class="__shiki_mdbnqw"> !-d</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteRule</span><span class="__shiki_21q97f"> ^(.*)/$</span><span class="__shiki_mdbnqw"> /$1</span><span class="__shiki_140thh"> [R=</span><span class="__shiki_dzsirb">301</span><span class="__shiki_140thh">,L]</span></span></code></pre></div><h3 id="_4-2-多语言站点" tabindex="-1">4.2 多语言站点 <a class="header-anchor" href="#_4-2-多语言站点" aria-label="Permalink to &quot;4.2 多语言站点&quot;">​</a></h3><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 根据浏览器语言重定向</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{HTTP:Accept-Language}</span><span class="__shiki_mdbnqw"> ^zh</span><span class="__shiki_140thh"> [NC]</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteRule</span><span class="__shiki_21q97f"> ^$</span><span class="__shiki_mdbnqw"> /zh/</span><span class="__shiki_140thh"> [R=</span><span class="__shiki_dzsirb">302</span><span class="__shiki_140thh">,L]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{HTTP:Accept-Language}</span><span class="__shiki_mdbnqw"> ^en</span><span class="__shiki_140thh"> [NC]</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteRule</span><span class="__shiki_21q97f"> ^$</span><span class="__shiki_mdbnqw"> /en/</span><span class="__shiki_140thh"> [R=</span><span class="__shiki_dzsirb">302</span><span class="__shiki_140thh">,L]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 默认语言</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteRule</span><span class="__shiki_21q97f"> ^$</span><span class="__shiki_mdbnqw"> /en/</span><span class="__shiki_140thh"> [R=</span><span class="__shiki_dzsirb">302</span><span class="__shiki_140thh">,L]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 语言子目录处理</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteRule</span><span class="__shiki_21q97f"> ^(en|zh|ja)/(.*)$</span><span class="__shiki_mdbnqw"> $2?lang=$1</span><span class="__shiki_140thh"> [QSA]</span></span></code></pre></div><h3 id="_4-3-移动设备检测" tabindex="-1">4.3 移动设备检测 <a class="header-anchor" href="#_4-3-移动设备检测" aria-label="Permalink to &quot;4.3 移动设备检测&quot;">​</a></h3><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 移动设备重定向到移动子域名</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{HTTP_USER_AGENT}</span><span class="__shiki_mdbnqw"> &quot;android|blackberry|iphone|ipod|iemobile|opera</span><span class="__shiki_140thh"> mobile|palmos|webos|googlebot-mobile&quot; [</span><span class="__shiki_mdbnqw">NC</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{HTTP_HOST}</span><span class="__shiki_mdbnqw"> !^m\\.example\\.com$</span><span class="__shiki_140thh"> [NC]</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteRule</span><span class="__shiki_21q97f"> ^(.*)$</span><span class="__shiki_mdbnqw"> https://m.example.com/$1</span><span class="__shiki_140thh"> [R=</span><span class="__shiki_dzsirb">302</span><span class="__shiki_140thh">,L]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 或移动到移动目录</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{HTTP_USER_AGENT}</span><span class="__shiki_mdbnqw"> &quot;android|blackberry|iphone|ipod|iemobile|opera</span><span class="__shiki_140thh"> mobile|palmos|webos|googlebot-mobile&quot; [</span><span class="__shiki_mdbnqw">NC</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{REQUEST_URI}</span><span class="__shiki_mdbnqw"> !^/mobile/</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteRule</span><span class="__shiki_21q97f"> ^(.*)$</span><span class="__shiki_mdbnqw"> /mobile/$1</span><span class="__shiki_140thh"> [L]</span></span></code></pre></div><h2 id="_5-条件判断与变量使用" tabindex="-1">5. 条件判断与变量使用 <a class="header-anchor" href="#_5-条件判断与变量使用" aria-label="Permalink to &quot;5. 条件判断与变量使用&quot;">​</a></h2><h3 id="_5-1-rewritecond常用条件" tabindex="-1">5.1 RewriteCond常用条件 <a class="header-anchor" href="#_5-1-rewritecond常用条件" aria-label="Permalink to &quot;5.1 RewriteCond常用条件&quot;">​</a></h3><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基于文件存在性</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{REQUEST_FILENAME}</span><span class="__shiki_mdbnqw"> !-f</span><span class="__shiki_140thh">  # 不是文件</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{REQUEST_FILENAME}</span><span class="__shiki_mdbnqw"> !-d</span><span class="__shiki_140thh">  # 不是目录</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{REQUEST_FILENAME}</span><span class="__shiki_mdbnqw"> !-l</span><span class="__shiki_140thh">  # 不是符号链接</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 基于请求属性</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{REQUEST_METHOD}</span><span class="__shiki_mdbnqw"> ^(GET|POST)$</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{QUERY_STRING}</span><span class="__shiki_mdbnqw"> ^id=([0-9]+)$</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{HTTP_USER_AGENT}</span><span class="__shiki_mdbnqw"> !^.*(bot|crawler|spider).*$</span><span class="__shiki_140thh"> [NC]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 基于服务器变量</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{SERVER_PORT}</span><span class="__shiki_mdbnqw"> ^80$</span><span class="__shiki_140thh">     # HTTP请求</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{SERVER_PORT}</span><span class="__shiki_mdbnqw"> ^443$</span><span class="__shiki_140thh">    # HTTPS请求</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{REMOTE_ADDR}</span><span class="__shiki_mdbnqw"> ^192\\.168\\.1\\.</span><span class="__shiki_140thh"> [OR]</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{REMOTE_ADDR}</span><span class="__shiki_mdbnqw"> ^10\\.0\\.0\\.</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 基于时间</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{TIME_HOUR}%{TIME_MIN}</span><span class="__shiki_mdbnqw"> &gt;0900</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{TIME_HOUR}%{TIME_MIN}</span><span class="__shiki_mdbnqw"> &lt;1700</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 基于cookie</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{HTTP_COOKIE}</span><span class="__shiki_mdbnqw"> !sessionid=</span><span class="__shiki_140thh"> [NC]</span></span></code></pre></div><h3 id="_5-2-环境变量设置" tabindex="-1">5.2 环境变量设置 <a class="header-anchor" href="#_5-2-环境变量设置" aria-label="Permalink to &quot;5.2 环境变量设置&quot;">​</a></h3><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 设置环境变量</span></span>
<span class="line"><span class="__shiki_1itgoe">SetEnv</span><span class="__shiki_140thh"> APPLICATION_ENV production</span></span>
<span class="line"><span class="__shiki_1itgoe">SetEnv</span><span class="__shiki_140thh"> DATABASE_HOST localhost</span></span>
<span class="line"><span class="__shiki_1itgoe">SetEnv</span><span class="__shiki_140thh"> MAINTENANCE_MODE </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 在RewriteCond中使用环境变量</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{ENV:MAINTENANCE_MODE}</span><span class="__shiki_mdbnqw"> =1</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteRule</span><span class="__shiki_21q97f"> ^(.*)$</span><span class="__shiki_mdbnqw"> /maintenance.html</span><span class="__shiki_140thh"> [L]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 传递变量给PHP</span></span>
<span class="line"><span class="__shiki_1itgoe">SetEnvIf</span><span class="__shiki_140thh"> Request_URI &quot;^/api/&quot; API_REQUEST=</span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_1itgoe">php_value</span><span class="__shiki_1t8gfj"> auto_prepend_file</span><span class="__shiki_mdbnqw"> &quot;/path/to/api_init.php&quot;</span></span></code></pre></div><h2 id="_6-调试与问题排查" tabindex="-1">6. 调试与问题排查 <a class="header-anchor" href="#_6-调试与问题排查" aria-label="Permalink to &quot;6. 调试与问题排查&quot;">​</a></h2><h3 id="_6-1-错误日志记录" tabindex="-1">6.1 错误日志记录 <a class="header-anchor" href="#_6-1-错误日志记录" aria-label="Permalink to &quot;6.1 错误日志记录&quot;">​</a></h3><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 记录重写日志（谨慎使用，会产生大量日志）</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteLog</span><span class="__shiki_140thh"> &quot;/var/log/apache2/rewrite.log&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteLogLevel</span><span class="__shiki_dzsirb"> 3</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 自定义访问日志格式</span></span>
<span class="line"><span class="__shiki_1itgoe">LogFormat</span><span class="__shiki_140thh"> &quot;%h %l %u %t \\&quot;%r\\&quot; %&gt;s %b \\&quot;%{</span><span class="__shiki_1jdh33">Referer</span><span class="__shiki_140thh">}i\\&quot; \\&quot;%{</span><span class="__shiki_1jdh33">User-Agent</span><span class="__shiki_140thh">}i\\&quot; %D&quot; myformat</span></span>
<span class="line"><span class="__shiki_1itgoe">CustomLog</span><span class="__shiki_140thh"> &quot;/var/log/apache2/myaccess.log&quot; myformat</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 记录特定条件</span></span>
<span class="line"><span class="__shiki_1itgoe">SetEnvIf</span><span class="__shiki_140thh"> Request_URI &quot;^/admin/&quot; adminlog</span></span>
<span class="line"><span class="__shiki_1itgoe">CustomLog</span><span class="__shiki_140thh"> &quot;/var/log/apache2/admin.log&quot; common env=adminlog</span></span></code></pre></div><h3 id="_6-2-调试技巧" tabindex="-1">6.2 调试技巧 <a class="header-anchor" href="#_6-2-调试技巧" aria-label="Permalink to &quot;6.2 调试技巧&quot;">​</a></h3><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 添加调试头</span></span>
<span class="line"><span class="__shiki_1itgoe">Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> X-Debug-Mode &quot;Active&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> X-Rewrite-Engine &quot;</span><span class="__shiki_1t8gfj">On</span><span class="__shiki_140thh">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 条件调试</span></span>
<span class="line"><span class="__shiki_1itgoe">SetEnvIf</span><span class="__shiki_140thh"> Remote_Addr &quot;^</span><span class="__shiki_dzsirb">192</span><span class="__shiki_140thh">\\.</span><span class="__shiki_dzsirb">168</span><span class="__shiki_140thh">\\.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">\\.</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">$&quot; debug_mode</span></span>
<span class="line"><span class="__shiki_1itgoe">Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> X-Debug-</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh"> &quot;Debug&quot; env=debug_mode</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 重写测试页面</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{QUERY_STRING}</span><span class="__shiki_mdbnqw"> ^debug=1$</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteRule</span><span class="__shiki_21q97f"> ^(.*)$</span><span class="__shiki_mdbnqw"> /debug.php?url=$1</span><span class="__shiki_140thh"> [L]</span></span></code></pre></div><h2 id="_7-性能优化最佳实践" tabindex="-1">7. 性能优化最佳实践 <a class="header-anchor" href="#_7-性能优化最佳实践" aria-label="Permalink to &quot;7. 性能优化最佳实践&quot;">​</a></h2><h3 id="_7-1-htaccess优化策略" tabindex="-1">7.1 .htaccess优化策略 <a class="header-anchor" href="#_7-1-htaccess优化策略" aria-label="Permalink to &quot;7.1 .htaccess优化策略&quot;">​</a></h3><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 合并RewriteRule</span></span>
<span class="line"><span class="__shiki_21nrsd"># 避免多个独立的RewriteRule，合并相似规则</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 使用RewriteMap处理大量映射（主配置中）</span></span>
<span class="line"><span class="__shiki_21nrsd"># RewriteMap lc int:tolower</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 避免过度使用正则表达式</span></span>
<span class="line"><span class="__shiki_21nrsd"># 使用简单的字符串匹配当可能时</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 按顺序组织规则</span></span>
<span class="line"><span class="__shiki_21nrsd"># 最常用的规则放在前面</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 使用[L]标志提前终止</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteRule</span><span class="__shiki_21q97f"> ^specific\\.php$</span><span class="__shiki_mdbnqw"> -</span><span class="__shiki_140thh"> [L]</span></span></code></pre></div><h3 id="_7-2-缓存头优化示例" tabindex="-1">7.2 缓存头优化示例 <a class="header-anchor" href="#_7-2-缓存头优化示例" aria-label="Permalink to &quot;7.2 缓存头优化示例&quot;">​</a></h3><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_mdbnqw"> &quot;\\.(html|htm)$&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> Cache-Control &quot;max-age=</span><span class="__shiki_dzsirb">3600</span><span class="__shiki_140thh">, must-revalidate&quot;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_mdbnqw"> &quot;\\.(css|js)$&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> Cache-Control &quot;max-age=</span><span class="__shiki_dzsirb">604800</span><span class="__shiki_140thh">, public&quot;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_mdbnqw"> &quot;\\.(jpg|jpeg|png|gif|ico)$&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> Cache-Control &quot;max-age=</span><span class="__shiki_dzsirb">2592000</span><span class="__shiki_140thh">, public&quot;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_mdbnqw"> &quot;\\.(pdf|doc|docx|xls|xlsx)$&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> Cache-Control &quot;max-age=</span><span class="__shiki_dzsirb">86400</span><span class="__shiki_140thh">, private&quot;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h2 id="_8-实际应用案例" tabindex="-1">8. 实际应用案例 <a class="header-anchor" href="#_8-实际应用案例" aria-label="Permalink to &quot;8. 实际应用案例&quot;">​</a></h2><h3 id="_8-1-wordpress优化配置" tabindex="-1">8.1 WordPress优化配置 <a class="header-anchor" href="#_8-1-wordpress优化配置" aria-label="Permalink to &quot;8.1 WordPress优化配置&quot;">​</a></h3><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># WordPress安全与性能配置</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_rewrite.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteEngine</span><span class="__shiki_1t8gfj"> On</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteBase</span><span class="__shiki_140thh"> /</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 保护wp-config.php</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">Files</span><span class="__shiki_mdbnqw"> wp-config.php</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        Order</span><span class="__shiki_140thh"> allow,deny</span></span>
<span class="line"><span class="__shiki_1itgoe">        Deny</span><span class="__shiki_1t8gfj"> from</span><span class="__shiki_140thh"> all</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">Files</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 防止恶意请求</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteCond</span><span class="__shiki_21q97f"> %{REQUEST_METHOD}</span><span class="__shiki_mdbnqw"> ^(HEAD|TRACE|DELETE|TRACK)</span><span class="__shiki_140thh"> [NC]</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteRule</span><span class="__shiki_21q97f"> ^(.*)$</span><span class="__shiki_mdbnqw"> -</span><span class="__shiki_140thh"> [F,L]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 阻止可疑查询字符串</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteCond</span><span class="__shiki_21q97f"> %{QUERY_STRING}</span><span class="__shiki_mdbnqw"> \\.\\.\\/</span><span class="__shiki_140thh"> [NC,OR]</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteCond</span><span class="__shiki_21q97f"> %{QUERY_STRING}</span><span class="__shiki_mdbnqw"> boot\\.ini</span><span class="__shiki_140thh"> [NC,OR]</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteCond</span><span class="__shiki_21q97f"> %{QUERY_STRING}</span><span class="__shiki_mdbnqw"> tag=\\/</span><span class="__shiki_140thh"> [NC,OR]</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteCond</span><span class="__shiki_21q97f"> %{QUERY_STRING}</span><span class="__shiki_mdbnqw"> ftp:</span><span class="__shiki_140thh"> [NC,OR]</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteCond</span><span class="__shiki_21q97f"> %{QUERY_STRING}</span><span class="__shiki_mdbnqw"> http:</span><span class="__shiki_140thh"> [NC,OR]</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteCond</span><span class="__shiki_21q97f"> %{QUERY_STRING}</span><span class="__shiki_mdbnqw"> https:</span><span class="__shiki_140thh"> [NC,OR]</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteCond</span><span class="__shiki_21q97f"> %{QUERY_STRING}</span><span class="__shiki_mdbnqw"> (\\&lt;|%3C).*script.*(\\&gt;|%3E)</span><span class="__shiki_140thh"> [NC,OR]</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteCond</span><span class="__shiki_21q97f"> %{QUERY_STRING}</span><span class="__shiki_mdbnqw"> mosConfig_[a-zA-Z_]{1,21}(=|%3D)</span><span class="__shiki_140thh"> [NC,OR]</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteCond</span><span class="__shiki_21q97f"> %{QUERY_STRING}</span><span class="__shiki_mdbnqw"> base64_encode.*\\(.*\\)</span><span class="__shiki_140thh"> [NC,OR]</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteCond</span><span class="__shiki_21q97f"> %{QUERY_STRING}</span><span class="__shiki_mdbnqw"> GLOBALS(=|\\[|\\%[0-9A-Z]{0,2})</span><span class="__shiki_140thh"> [OR]</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteCond</span><span class="__shiki_21q97f"> %{QUERY_STRING}</span><span class="__shiki_mdbnqw"> _REQUEST(=|\\[|\\%[0-9A-Z]{0,2})</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteRule</span><span class="__shiki_21q97f"> ^(.*)$</span><span class="__shiki_mdbnqw"> index.php</span><span class="__shiki_140thh"> [F,L]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 标准WordPress重写规则</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteRule</span><span class="__shiki_21q97f"> ^index\\.php$</span><span class="__shiki_mdbnqw"> -</span><span class="__shiki_140thh"> [L]</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteCond</span><span class="__shiki_21q97f"> %{REQUEST_FILENAME}</span><span class="__shiki_mdbnqw"> !-f</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteCond</span><span class="__shiki_21q97f"> %{REQUEST_FILENAME}</span><span class="__shiki_mdbnqw"> !-d</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteRule</span><span class="__shiki_21q97f"> .</span><span class="__shiki_mdbnqw"> /index.php</span><span class="__shiki_140thh"> [L]</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 压缩</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_deflate.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    AddOutputFilterByType</span><span class="__shiki_140thh"> DEFLATE </span><span class="__shiki_1t8gfj">text/html</span><span class="__shiki_1t8gfj"> text/plain</span><span class="__shiki_1t8gfj"> text/xml</span><span class="__shiki_1t8gfj"> text/css</span><span class="__shiki_1t8gfj"> application/javascript</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 缓存</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_expires.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresActive</span><span class="__shiki_1t8gfj"> On</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> image/jpg</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> year&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> image/jpeg</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> year&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> image/gif</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> year&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> image/png</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> year&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> text/css</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> month&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> application/pdf</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> month&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> text/x-javascript</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> month&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> image/x-icon</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> year&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresDefault</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh"> days&quot;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h3 id="_8-2-api服务器配置" tabindex="-1">8.2 API服务器配置 <a class="header-anchor" href="#_8-2-api服务器配置" aria-label="Permalink to &quot;8.2 API服务器配置&quot;">​</a></h3><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># API服务器专用配置</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteEngine</span><span class="__shiki_1t8gfj"> On</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># API版本控制</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteRule</span><span class="__shiki_21q97f"> ^api/v1/(.*)$</span><span class="__shiki_mdbnqw"> api_v1.php?endpoint=$1</span><span class="__shiki_140thh"> [QSA,L]</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteRule</span><span class="__shiki_21q97f"> ^api/v2/(.*)$</span><span class="__shiki_mdbnqw"> api_v2.php?endpoint=$1</span><span class="__shiki_140thh"> [QSA,L]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># CORS设置</span></span>
<span class="line"><span class="__shiki_1itgoe">Header</span><span class="__shiki_140thh"> always </span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh"> Access-Control-</span><span class="__shiki_1itgoe">Allow</span><span class="__shiki_140thh">-Origin &quot;*&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">Header</span><span class="__shiki_140thh"> always </span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh"> Access-Control-</span><span class="__shiki_1itgoe">Allow</span><span class="__shiki_140thh">-Methods &quot;GET, POST, PUT, DELETE, OPTIONS&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">Header</span><span class="__shiki_140thh"> always </span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh"> Access-Control-</span><span class="__shiki_1itgoe">Allow</span><span class="__shiki_140thh">-Headers &quot;Content-Type, Authorization, X-API-Key&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">Header</span><span class="__shiki_140thh"> always </span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh"> Access-Control-</span><span class="__shiki_1itgoe">Allow</span><span class="__shiki_140thh">-Credentials &quot;true&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 预检请求处理</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{REQUEST_METHOD}</span><span class="__shiki_mdbnqw"> OPTIONS</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteRule</span><span class="__shiki_21q97f"> ^(.*)$</span><span class="__shiki_mdbnqw"> $1</span><span class="__shiki_140thh"> [R=</span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">,L]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 速率限制头</span></span>
<span class="line"><span class="__shiki_1itgoe">SetEnvIf</span><span class="__shiki_140thh"> Request_URI &quot;^/api/&quot; api_request</span></span>
<span class="line"><span class="__shiki_1itgoe">Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> X-RateLimit-Limit &quot;</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">&quot; env=api_request</span></span>
<span class="line"><span class="__shiki_1itgoe">Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> X-RateLimit-Remaining &quot;</span><span class="__shiki_dzsirb">999</span><span class="__shiki_140thh">&quot; env=api_request</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># JSON响应头</span></span>
<span class="line"><span class="__shiki_1itgoe">AddType</span><span class="__shiki_1t8gfj"> application/json</span><span class="__shiki_140thh"> .json</span></span>
<span class="line"><span class="__shiki_1itgoe">Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> Content-Type &quot;</span><span class="__shiki_1t8gfj">application/json;</span><span class="__shiki_140thh"> charset=utf-</span><span class="__shiki_dzsirb">8</span><span class="__shiki_140thh">&quot; env=api_request</span></span></code></pre></div><h2 id="_9-常见问题与解决方案" tabindex="-1">9. 常见问题与解决方案 <a class="header-anchor" href="#_9-常见问题与解决方案" aria-label="Permalink to &quot;9. 常见问题与解决方案&quot;">​</a></h2><h3 id="_9-1-配置不生效" tabindex="-1">9.1 配置不生效 <a class="header-anchor" href="#_9-1-配置不生效" aria-label="Permalink to &quot;9.1 配置不生效&quot;">​</a></h3><p><strong>可能原因</strong>：</p><ol><li>AllowOverride未启用</li><li>.htaccess文件权限问题</li><li>语法错误</li><li>模块未加载</li></ol><p><strong>解决方案</strong>：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 检查语法</span></span>
<span class="line"><span class="__shiki_1t8gfj">apachectl</span><span class="__shiki_mdbnqw"> configtest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查文件权限</span></span>
<span class="line"><span class="__shiki_1t8gfj">ls</span><span class="__shiki_dzsirb"> -la</span><span class="__shiki_mdbnqw"> .htaccess</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查错误日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">tail</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> /var/log/apache2/error.log</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 启用模块</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> a2enmod</span><span class="__shiki_mdbnqw"> rewrite</span><span class="__shiki_mdbnqw"> headers</span><span class="__shiki_mdbnqw"> expires</span></span></code></pre></div><h3 id="_9-2-重定向循环" tabindex="-1">9.2 重定向循环 <a class="header-anchor" href="#_9-2-重定向循环" aria-label="Permalink to &quot;9.2 重定向循环&quot;">​</a></h3><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 错误示例：HTTPS重定向循环</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{HTTPS}</span><span class="__shiki_mdbnqw"> off</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteRule</span><span class="__shiki_21q97f"> ^(.*)$</span><span class="__shiki_mdbnqw"> https://%{HTTP_HOST}/$1</span><span class="__shiki_140thh"> [R=</span><span class="__shiki_dzsirb">301</span><span class="__shiki_140thh">,L]</span></span>
<span class="line"><span class="__shiki_21nrsd"># 如果负载均衡器处理了SSL，这会导致循环</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案：检查X-Forwarded-Proto头</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteCond</span><span class="__shiki_21q97f"> %{HTTP:X-Forwarded-Proto}</span><span class="__shiki_mdbnqw"> !https</span></span>
<span class="line"><span class="__shiki_1itgoe">RewriteRule</span><span class="__shiki_21q97f"> ^(.*)$</span><span class="__shiki_mdbnqw"> https://%{HTTP_HOST}/$1</span><span class="__shiki_140thh"> [R=</span><span class="__shiki_dzsirb">301</span><span class="__shiki_140thh">,L]</span></span></code></pre></div><h3 id="_9-3-性能问题" tabindex="-1">9.3 性能问题 <a class="header-anchor" href="#_9-3-性能问题" aria-label="Permalink to &quot;9.3 性能问题&quot;">​</a></h3><p><strong>优化建议</strong>：</p><ol><li>将频繁访问的规则移到主配置</li><li>减少RewriteCond数量</li><li>使用[L]标志终止不必要的处理</li><li>避免复杂的正则表达式</li></ol><h2 id="_10-最佳实践总结" tabindex="-1">10. 最佳实践总结 <a class="header-anchor" href="#_10-最佳实践总结" aria-label="Permalink to &quot;10. 最佳实践总结&quot;">​</a></h2><h3 id="_10-1-安全实践" tabindex="-1">10.1 安全实践 <a class="header-anchor" href="#_10-1-安全实践" aria-label="Permalink to &quot;10.1 安全实践&quot;">​</a></h3><ol><li><strong>最小权限原则</strong>：只启用必要的功能</li><li><strong>输入验证</strong>：防止恶意请求</li><li><strong>敏感文件保护</strong>：隐藏配置文件和日志</li><li><strong>定期审计</strong>：检查.htaccess文件内容</li></ol><h3 id="_10-2-性能实践" tabindex="-1">10.2 性能实践 <a class="header-anchor" href="#_10-2-性能实践" aria-label="Permalink to &quot;10.2 性能实践&quot;">​</a></h3><ol><li><strong>主配置优先</strong>：将全局配置放在主配置文件中</li><li><strong>合并规则</strong>：减少规则数量</li><li><strong>适当缓存</strong>：合理设置缓存头</li><li><strong>监控效果</strong>：使用工具测试配置影响</li></ol><h3 id="_10-3-维护实践" tabindex="-1">10.3 维护实践 <a class="header-anchor" href="#_10-3-维护实践" aria-label="Permalink to &quot;10.3 维护实践&quot;">​</a></h3><ol><li><strong>文档化</strong>：为复杂规则添加注释</li><li><strong>版本控制</strong>：将.htaccess纳入版本管理</li><li><strong>测试环境</strong>：在测试环境验证配置</li><li><strong>备份恢复</strong>：定期备份配置文件</li></ol><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>.htaccess是Apache服务器的强大工具，提供了灵活的目录级配置能力。正确使用可以增强安全性、优化性能、改善用户体验，但不当使用可能导致安全漏洞或性能问题。关键在于理解每条指令的作用，根据实际需求合理配置，并遵循最佳实践。</p><p><strong>核心建议</strong>：</p><ol><li><strong>了解需求</strong>：明确要解决的问题</li><li><strong>测试验证</strong>：所有修改先在测试环境验证</li><li><strong>循序渐进</strong>：一次只修改少量配置，观察效果</li><li><strong>监控日志</strong>：关注错误日志和访问日志</li><li><strong>持续学习</strong>：Apache版本更新可能带来新特性</li></ol><p>通过合理配置.htaccess，可以在不修改主服务器配置的情况下，实现复杂的URL重写、访问控制、性能优化和安全增强功能，是Web服务器管理的重要技能。</p>`,96)])])}const d=a(_,[["render",l]]);export{r as __pageData,d as default};
