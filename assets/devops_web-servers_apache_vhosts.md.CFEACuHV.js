import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"Web服务器Apache虚拟主机管理深度解析学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"devops/web-servers/apache/vhosts.md","filePath":"devops/web-servers/apache/vhosts.md"}'),p={name:"devops/web-servers/apache/vhosts.md"};function l(h,s,c,t,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="web服务器apache虚拟主机管理深度解析学习笔记" tabindex="-1">Web服务器Apache虚拟主机管理深度解析学习笔记 <a class="header-anchor" href="#web服务器apache虚拟主机管理深度解析学习笔记" aria-label="Permalink to &quot;Web服务器Apache虚拟主机管理深度解析学习笔记&quot;">​</a></h1><h2 id="_1-虚拟主机基础概念" tabindex="-1">1. 虚拟主机基础概念 <a class="header-anchor" href="#_1-虚拟主机基础概念" aria-label="Permalink to &quot;1. 虚拟主机基础概念&quot;">​</a></h2><h3 id="_1-1-什么是虚拟主机" tabindex="-1">1.1 什么是虚拟主机？ <a class="header-anchor" href="#_1-1-什么是虚拟主机" aria-label="Permalink to &quot;1.1 什么是虚拟主机？&quot;">​</a></h3><p><strong>虚拟主机（Virtual Host）</strong> 是Apache服务器的核心功能，允许在一台物理服务器上运行多个独立的网站，每个网站都有自己的域名、文件系统、日志和配置。用户访问不同域名时，Apache会根据配置提供不同的网站内容。</p><h3 id="_1-2-虚拟主机工作原理" tabindex="-1">1.2 虚拟主机工作原理 <a class="header-anchor" href="#_1-2-虚拟主机工作原理" aria-label="Permalink to &quot;1.2 虚拟主机工作原理&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">客户端请求 http://example.com/</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">DNS解析到服务器IP 192.168.1.100:80</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">Apache接收请求</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">检查Host请求头: example.com</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">匹配虚拟主机配置</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">找到对应DocumentRoot: /var/www/example.com</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">处理请求，返回对应网站内容</span></span></code></pre></div><h3 id="_1-3-虚拟主机类型对比" tabindex="-1">1.3 虚拟主机类型对比 <a class="header-anchor" href="#_1-3-虚拟主机类型对比" aria-label="Permalink to &quot;1.3 虚拟主机类型对比&quot;">​</a></h3><table tabindex="0"><thead><tr><th>类型</th><th>原理</th><th>优点</th><th>缺点</th><th>适用场景</th></tr></thead><tbody><tr><td><strong>基于IP</strong></td><td>每个网站绑定独立IP</td><td>稳定性高，兼容性好</td><td>浪费IP资源</td><td>需要SSL证书，不支持SNI的客户端</td></tr><tr><td><strong>基于域名</strong></td><td>通过Host头区分</td><td>节约IP，配置灵活</td><td>依赖DNS解析</td><td>现代Web服务主流</td></tr><tr><td><strong>基于端口</strong></td><td>通过端口号区分</td><td>简单易用</td><td>用户需记住端口</td><td>开发测试环境</td></tr></tbody></table><h2 id="_2-虚拟主机配置基础" tabindex="-1">2. 虚拟主机配置基础 <a class="header-anchor" href="#_2-虚拟主机配置基础" aria-label="Permalink to &quot;2. 虚拟主机配置基础&quot;">​</a></h2><h3 id="_2-1-配置文件结构" tabindex="-1">2.1 配置文件结构 <a class="header-anchor" href="#_2-1-配置文件结构" aria-label="Permalink to &quot;2.1 配置文件结构&quot;">​</a></h3><h4 id="_2-1-1-主流系统配置文件位置" tabindex="-1">2.1.1 主流系统配置文件位置 <a class="header-anchor" href="#_2-1-1-主流系统配置文件位置" aria-label="Permalink to &quot;2.1.1 主流系统配置文件位置&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Debian/Ubuntu系统</span></span>
<span class="line"><span class="__shiki_1t8gfj">主配置:</span><span class="__shiki_mdbnqw">     /etc/apache2/apache2.conf</span></span>
<span class="line"><span class="__shiki_1t8gfj">端口配置:</span><span class="__shiki_mdbnqw">   /etc/apache2/ports.conf</span></span>
<span class="line"><span class="__shiki_1t8gfj">可用站点:</span><span class="__shiki_mdbnqw">   /etc/apache2/sites-available/</span></span>
<span class="line"><span class="__shiki_1t8gfj">启用站点:</span><span class="__shiki_mdbnqw">   /etc/apache2/sites-enabled/</span></span>
<span class="line"><span class="__shiki_1t8gfj">模块配置:</span><span class="__shiki_mdbnqw">   /etc/apache2/mods-available/，/etc/apache2/mods-enabled/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># RHEL/CentOS系统</span></span>
<span class="line"><span class="__shiki_1t8gfj">主配置:</span><span class="__shiki_mdbnqw">     /etc/httpd/conf/httpd.conf</span></span>
<span class="line"><span class="__shiki_1t8gfj">额外配置:</span><span class="__shiki_mdbnqw">   /etc/httpd/conf.d/</span><span class="__shiki_dzsirb">*</span><span class="__shiki_mdbnqw">.conf</span></span>
<span class="line"><span class="__shiki_1t8gfj">模块配置:</span><span class="__shiki_mdbnqw">   /etc/httpd/conf.modules.d/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># macOS系统</span></span>
<span class="line"><span class="__shiki_1t8gfj">主配置:</span><span class="__shiki_mdbnqw">     /etc/apache2/httpd.conf</span></span>
<span class="line"><span class="__shiki_1t8gfj">额外配置:</span><span class="__shiki_mdbnqw">   /etc/apache2/extra/</span><span class="__shiki_dzsirb">*</span><span class="__shiki_mdbnqw">.conf</span></span>
<span class="line"><span class="__shiki_1t8gfj">用户配置:</span><span class="__shiki_mdbnqw">   /etc/apache2/users/</span><span class="__shiki_dzsirb">*</span><span class="__shiki_mdbnqw">.conf</span></span></code></pre></div><h4 id="_2-1-2-模块加载检查" tabindex="-1">2.1.2 模块加载检查 <a class="header-anchor" href="#_2-1-2-模块加载检查" aria-label="Permalink to &quot;2.1.2 模块加载检查&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 检查虚拟主机模块是否加载</span></span>
<span class="line"><span class="__shiki_1t8gfj">apachectl</span><span class="__shiki_dzsirb"> -M</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> vhost</span></span>
<span class="line"><span class="__shiki_21nrsd"># 应输出: vhost_alias_module (shared) 或类似</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查mod_ssl（HTTPS必需）</span></span>
<span class="line"><span class="__shiki_1t8gfj">apachectl</span><span class="__shiki_dzsirb"> -M</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> ssl</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查rewrite模块（重定向常用）</span></span>
<span class="line"><span class="__shiki_1t8gfj">apachectl</span><span class="__shiki_dzsirb"> -M</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> rewrite</span></span></code></pre></div><h3 id="_2-2-基于域名的虚拟主机" tabindex="-1">2.2 基于域名的虚拟主机 <a class="header-anchor" href="#_2-2-基于域名的虚拟主机" aria-label="Permalink to &quot;2.2 基于域名的虚拟主机&quot;">​</a></h3><h4 id="_2-2-1-基本配置模板" tabindex="-1">2.2.1 基本配置模板 <a class="header-anchor" href="#_2-2-1-基本配置模板" aria-label="Permalink to &quot;2.2.1 基本配置模板&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># /etc/apache2/sites-available/example.com.conf</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 监听所有IP的80端口</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> *:80</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 管理员邮箱</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerAdmin</span><span class="__shiki_140thh"> webmaster@example.com</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 网站根目录</span></span>
<span class="line"><span class="__shiki_1itgoe">    DocumentRoot</span><span class="__shiki_140thh"> /var/www/example.com/public_html</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 主域名（必须配置）</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerName</span><span class="__shiki_140thh"> example.com</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 别名域名（可选，可多个）</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerAlias</span><span class="__shiki_mdbnqw"> www.example.com</span><span class="__shiki_mdbnqw"> m.example.com</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 错误日志位置</span></span>
<span class="line"><span class="__shiki_1itgoe">    ErrorLog</span><span class="__shiki_140thh"> \${APACHE_LOG_DIR}/example.com-error.log</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 自定义日志格式（可选）</span></span>
<span class="line"><span class="__shiki_1itgoe">    LogFormat</span><span class="__shiki_140thh"> &quot;%h %l %u %t \\&quot;%r\\&quot; %&gt;s %b \\&quot;%{</span><span class="__shiki_1jdh33">Referer</span><span class="__shiki_140thh">}i\\&quot; \\&quot;%{</span><span class="__shiki_1jdh33">User-Agent</span><span class="__shiki_140thh">}i\\&quot;&quot; combined_vhost</span></span>
<span class="line"><span class="__shiki_1itgoe">    CustomLog</span><span class="__shiki_140thh"> \${APACHE_LOG_DIR}/example.com-access.log combined_vhost</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 设置默认文件（可选）</span></span>
<span class="line"><span class="__shiki_1itgoe">    DirectoryIndex</span><span class="__shiki_140thh"> index.html index.php</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 目录权限配置</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">Directory</span><span class="__shiki_mdbnqw"> /var/www/example.com/public_html</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        Options</span><span class="__shiki_140thh"> Indexes FollowSymLinks MultiViews</span></span>
<span class="line"><span class="__shiki_1itgoe">        AllowOverride</span><span class="__shiki_140thh"> All</span></span>
<span class="line"><span class="__shiki_1itgoe">        Require</span><span class="__shiki_140thh"> all granted</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 重写引擎设置</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_rewrite.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">            RewriteEngine</span><span class="__shiki_1t8gfj"> On</span></span>
<span class="line"><span class="__shiki_1itgoe">            RewriteBase</span><span class="__shiki_140thh"> /</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 强制www</span></span>
<span class="line"><span class="__shiki_21nrsd">            # RewriteCond %{HTTP_HOST} ^example\\.com [NC]</span></span>
<span class="line"><span class="__shiki_21nrsd">            # RewriteRule ^(.*)$ http://www.example.com/$1 [R=301,L]</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">Directory</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 保护敏感文件</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_mdbnqw"> &quot;\\.(htaccess|htpasswd|ini|log|sh|sql)$&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        Require</span><span class="__shiki_140thh"> all denied</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h4 id="_2-2-2-多域名共享配置" tabindex="-1">2.2.2 多域名共享配置 <a class="header-anchor" href="#_2-2-2-多域名共享配置" aria-label="Permalink to &quot;2.2.2 多域名共享配置&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 多个域名指向同一个网站</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> *:80</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerName</span><span class="__shiki_140thh"> example.com</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerAlias</span><span class="__shiki_mdbnqw"> www.example.com</span><span class="__shiki_mdbnqw"> example.net</span><span class="__shiki_140thh"> www.example.net example.org</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    DocumentRoot</span><span class="__shiki_140thh"> /var/www/shared_site</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 使用域名作为日志文件名</span></span>
<span class="line"><span class="__shiki_1itgoe">    ErrorLog</span><span class="__shiki_140thh"> \${APACHE_LOG_DIR}/%</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">-error.log</span></span>
<span class="line"><span class="__shiki_1itgoe">    CustomLog</span><span class="__shiki_140thh"> \${APACHE_LOG_DIR}/%</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">-access.log combined</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 可以根据不同域名定制内容</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">If</span><span class="__shiki_mdbnqw"> &quot;%{HTTP_HOST} == &#39;example.net&#39;&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 特定域名的特殊配置</span></span>
<span class="line"><span class="__shiki_1itgoe">        SetEnv</span><span class="__shiki_140thh"> SPECIAL_THEME </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">If</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h3 id="_2-3-基于ip的虚拟主机" tabindex="-1">2.3 基于IP的虚拟主机 <a class="header-anchor" href="#_2-3-基于ip的虚拟主机" aria-label="Permalink to &quot;2.3 基于IP的虚拟主机&quot;">​</a></h3><h4 id="_2-3-1-单ip多端口配置" tabindex="-1">2.3.1 单IP多端口配置 <a class="header-anchor" href="#_2-3-1-单ip多端口配置" aria-label="Permalink to &quot;2.3.1 单IP多端口配置&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 监听多个端口</span></span>
<span class="line"><span class="__shiki_1itgoe">Listen</span><span class="__shiki_dzsirb"> 80</span></span>
<span class="line"><span class="__shiki_1itgoe">Listen</span><span class="__shiki_dzsirb"> 8080</span></span>
<span class="line"><span class="__shiki_1itgoe">Listen</span><span class="__shiki_dzsirb"> 8888</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 端口80的虚拟主机</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> 192.168.1.100:80</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerName</span><span class="__shiki_140thh"> example.com</span></span>
<span class="line"><span class="__shiki_1itgoe">    DocumentRoot</span><span class="__shiki_140thh"> /var/www/example.com</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 端口8080的虚拟主机</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> 192.168.1.100:8080</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerName</span><span class="__shiki_140thh"> dev.example.com</span></span>
<span class="line"><span class="__shiki_1itgoe">    DocumentRoot</span><span class="__shiki_140thh"> /var/www/dev.example.com</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 开发环境特殊配置</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">Directory</span><span class="__shiki_mdbnqw"> /var/www/dev.example.com</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        Options</span><span class="__shiki_140thh"> All</span></span>
<span class="line"><span class="__shiki_1itgoe">        AllowOverride</span><span class="__shiki_140thh"> All</span></span>
<span class="line"><span class="__shiki_1itgoe">        Require</span><span class="__shiki_140thh"> all granted</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">Directory</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 端口8888的管理面板</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> 192.168.1.100:8888</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerName</span><span class="__shiki_140thh"> admin.local</span></span>
<span class="line"><span class="__shiki_1itgoe">    DocumentRoot</span><span class="__shiki_140thh"> /var/www/admin_panel</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 限制访问IP</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">Location</span><span class="__shiki_mdbnqw"> /</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        Require</span><span class="__shiki_140thh"> ip </span><span class="__shiki_dzsirb">192</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">168</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">/</span><span class="__shiki_dzsirb">24</span></span>
<span class="line"><span class="__shiki_1itgoe">        Require</span><span class="__shiki_140thh"> ip </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">/</span><span class="__shiki_dzsirb">8</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">Location</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h4 id="_2-3-2-多ip地址配置" tabindex="-1">2.3.2 多IP地址配置 <a class="header-anchor" href="#_2-3-2-多ip地址配置" aria-label="Permalink to &quot;2.3.2 多IP地址配置&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 添加多个IP地址（Linux）</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> ip</span><span class="__shiki_mdbnqw"> addr</span><span class="__shiki_mdbnqw"> add</span><span class="__shiki_mdbnqw"> 192.168.1.101/24</span><span class="__shiki_mdbnqw"> dev</span><span class="__shiki_mdbnqw"> eth0</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> ip</span><span class="__shiki_mdbnqw"> addr</span><span class="__shiki_mdbnqw"> add</span><span class="__shiki_mdbnqw"> 192.168.1.102/24</span><span class="__shiki_mdbnqw"> dev</span><span class="__shiki_mdbnqw"> eth0</span></span></code></pre></div><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 不同IP对应不同网站</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> 192.168.1.101:80</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerName</span><span class="__shiki_140thh"> site1.com</span></span>
<span class="line"><span class="__shiki_1itgoe">    DocumentRoot</span><span class="__shiki_140thh"> /var/www/site1</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSL配置需要对应IP</span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSLCertificateFile /etc/ssl/certs/site1.crt</span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSLCertificateKeyFile /etc/ssl/private/site1.key</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> 192.168.1.102:80</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerName</span><span class="__shiki_140thh"> site2.com</span></span>
<span class="line"><span class="__shiki_1itgoe">    DocumentRoot</span><span class="__shiki_140thh"> /var/www/site2</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h2 id="_3-ssl-tls虚拟主机配置" tabindex="-1">3. SSL/TLS虚拟主机配置 <a class="header-anchor" href="#_3-ssl-tls虚拟主机配置" aria-label="Permalink to &quot;3. SSL/TLS虚拟主机配置&quot;">​</a></h2><h3 id="_3-1-单域名ssl配置" tabindex="-1">3.1 单域名SSL配置 <a class="header-anchor" href="#_3-1-单域名ssl配置" aria-label="Permalink to &quot;3.1 单域名SSL配置&quot;">​</a></h3><h4 id="_3-1-1-基本https配置" tabindex="-1">3.1.1 基本HTTPS配置 <a class="header-anchor" href="#_3-1-1-基本https配置" aria-label="Permalink to &quot;3.1.1 基本HTTPS配置&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> *:443</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerName</span><span class="__shiki_140thh"> example.com</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerAlias</span><span class="__shiki_mdbnqw"> www.example.com</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    DocumentRoot</span><span class="__shiki_140thh"> /var/www/example.com</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSL引擎开启</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLEngine</span><span class="__shiki_1t8gfj"> on</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 证书文件路径</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLCertificateFile</span><span class="__shiki_140thh"> /etc/ssl/certs/example.com.crt</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLCertificateKeyFile</span><span class="__shiki_140thh"> /etc/ssl/private/example.com.key</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 中间证书链（如果需要）</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLCertificateChainFile</span><span class="__shiki_140thh"> /etc/ssl/certs/example.com-chain.crt</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSL协议配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLProtocol</span><span class="__shiki_140thh"> all -SSLv2 -SSLv3 -TLSv1 -TLSv1.</span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLHonorCipherOrder</span><span class="__shiki_1t8gfj"> on</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLCipherSuite</span><span class="__shiki_140thh"> ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # HSTS头（谨慎启用）</span></span>
<span class="line"><span class="__shiki_21nrsd">    # Header always set Strict-Transport-Security &quot;max-age=31536000; includeSubDomains&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 日志文件</span></span>
<span class="line"><span class="__shiki_1itgoe">    ErrorLog</span><span class="__shiki_140thh"> \${APACHE_LOG_DIR}/example.com-ssl-error.log</span></span>
<span class="line"><span class="__shiki_1itgoe">    CustomLog</span><span class="__shiki_140thh"> \${APACHE_LOG_DIR}/example.com-ssl-access.log combined</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># HTTP重定向到HTTPS</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> *:80</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerName</span><span class="__shiki_140thh"> example.com</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerAlias</span><span class="__shiki_mdbnqw"> www.example.com</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 301永久重定向</span></span>
<span class="line"><span class="__shiki_1itgoe">    Redirect</span><span class="__shiki_1t8gfj"> permanent</span><span class="__shiki_mdbnqw"> /</span><span class="__shiki_mdbnqw"> https://example.com/</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 或者使用重写规则</span></span>
<span class="line"><span class="__shiki_21nrsd">    # RewriteEngine On</span></span>
<span class="line"><span class="__shiki_21nrsd">    # RewriteCond %{HTTPS} off</span></span>
<span class="line"><span class="__shiki_21nrsd">    # RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h3 id="_3-2-多域名ssl-sni" tabindex="-1">3.2 多域名SSL（SNI） <a class="header-anchor" href="#_3-2-多域名ssl-sni" aria-label="Permalink to &quot;3.2 多域名SSL（SNI）&quot;">​</a></h3><h4 id="_3-2-1-sni配置" tabindex="-1">3.2.1 SNI配置 <a class="header-anchor" href="#_3-2-1-sni配置" aria-label="Permalink to &quot;3.2.1 SNI配置&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 多个HTTPS虚拟主机共享同一IP</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_ssl.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 第一个SSL站点</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> *:443</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ServerName</span><span class="__shiki_140thh"> site1.com</span></span>
<span class="line"><span class="__shiki_1itgoe">        DocumentRoot</span><span class="__shiki_140thh"> /var/www/site1</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        SSLEngine</span><span class="__shiki_1t8gfj"> on</span></span>
<span class="line"><span class="__shiki_1itgoe">        SSLCertificateFile</span><span class="__shiki_140thh"> /etc/ssl/certs/site1.crt</span></span>
<span class="line"><span class="__shiki_1itgoe">        SSLCertificateKeyFile</span><span class="__shiki_140thh"> /etc/ssl/private/site1.key</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # SNI需要TLSv1+</span></span>
<span class="line"><span class="__shiki_1itgoe">        SSLProtocol</span><span class="__shiki_140thh"> +TLSv1.</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh"> +TLSv1.</span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 第二个SSL站点</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> *:443</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ServerName</span><span class="__shiki_140thh"> site2.com</span></span>
<span class="line"><span class="__shiki_1itgoe">        DocumentRoot</span><span class="__shiki_140thh"> /var/www/site2</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        SSLEngine</span><span class="__shiki_1t8gfj"> on</span></span>
<span class="line"><span class="__shiki_1itgoe">        SSLCertificateFile</span><span class="__shiki_140thh"> /etc/ssl/certs/site2.crt</span></span>
<span class="line"><span class="__shiki_1itgoe">        SSLCertificateKeyFile</span><span class="__shiki_140thh"> /etc/ssl/private/site2.key</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 通配符证书站点</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> *:443</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ServerName</span><span class="__shiki_140thh"> *.example.com</span></span>
<span class="line"><span class="__shiki_1itgoe">        DocumentRoot</span><span class="__shiki_140thh"> /var/www/wildcard</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        SSLEngine</span><span class="__shiki_1t8gfj"> on</span></span>
<span class="line"><span class="__shiki_1itgoe">        SSLCertificateFile</span><span class="__shiki_140thh"> /etc/ssl/certs/wildcard.example.com.crt</span></span>
<span class="line"><span class="__shiki_1itgoe">        SSLCertificateKeyFile</span><span class="__shiki_140thh"> /etc/ssl/private/wildcard.example.com.key</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 使用ServerName匹配子域名</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;</span><span class="__shiki_1t8gfj">If</span><span class="__shiki_mdbnqw"> &quot;%{HTTP_HOST} =~ /^(\\w+)\\.example\\.com$/&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">            SetEnv</span><span class="__shiki_140thh"> SUBDOMAIN %</span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;/</span><span class="__shiki_1t8gfj">If</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h4 id="_3-2-2-使用sslstapling" tabindex="-1">3.2.2 使用SSLStapling <a class="header-anchor" href="#_3-2-2-使用sslstapling" aria-label="Permalink to &quot;3.2.2 使用SSLStapling&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> *:443</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerName</span><span class="__shiki_140thh"> example.com</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # OCSP装订（提高SSL性能）</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLUseStapling</span><span class="__shiki_1t8gfj"> on</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLStaplingCache</span><span class="__shiki_140thh"> &quot;shmcb:logs/ssl_stapling(</span><span class="__shiki_dzsirb">32768</span><span class="__shiki_140thh">)&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLStaplingResponderTimeout</span><span class="__shiki_dzsirb"> 5</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLStaplingReturnResponderErrors</span><span class="__shiki_1t8gfj"> off</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLStaplingFakeTryLater</span><span class="__shiki_1t8gfj"> off</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSL会话缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLSessionCache</span><span class="__shiki_140thh"> &quot;shmcb:logs/ssl_scache(</span><span class="__shiki_dzsirb">512000</span><span class="__shiki_140thh">)&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLSessionCacheTimeout</span><span class="__shiki_dzsirb"> 300</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用SSL压缩（谨慎，可能有安全问题）</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLCompression</span><span class="__shiki_1t8gfj"> off</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h3 id="_3-3-let-s-encrypt自动ssl" tabindex="-1">3.3 Let&#39;s Encrypt自动SSL <a class="header-anchor" href="#_3-3-let-s-encrypt自动ssl" aria-label="Permalink to &quot;3.3 Let&#39;s Encrypt自动SSL&quot;">​</a></h3><h4 id="_3-3-1-certbot配置示例" tabindex="-1">3.3.1 Certbot配置示例 <a class="header-anchor" href="#_3-3-1-certbot配置示例" aria-label="Permalink to &quot;3.3.1 Certbot配置示例&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 安装Certbot</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> apt-get</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> certbot</span><span class="__shiki_mdbnqw"> python3-certbot-apache</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 获取证书（自动配置Apache）</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> certbot</span><span class="__shiki_dzsirb"> --apache</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_mdbnqw"> example.com</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_mdbnqw"> www.example.com</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 手动配置模式</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> certbot</span><span class="__shiki_mdbnqw"> certonly</span><span class="__shiki_dzsirb"> --apache</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_mdbnqw"> example.com</span></span></code></pre></div><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Certbot生成的配置示例</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_ssl.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> *:443</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerName</span><span class="__shiki_140thh"> example.com</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    DocumentRoot</span><span class="__shiki_140thh"> /var/www/example.com</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    Include</span><span class="__shiki_140thh"> /etc/letsencrypt/options-ssl-apache.conf</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLCertificateFile</span><span class="__shiki_140thh"> /etc/letsencrypt/live/example.com/fullchain.pem</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLCertificateKeyFile</span><span class="__shiki_140thh"> /etc/letsencrypt/live/example.com/privkey.pem</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h2 id="_4-高级虚拟主机配置" tabindex="-1">4. 高级虚拟主机配置 <a class="header-anchor" href="#_4-高级虚拟主机配置" aria-label="Permalink to &quot;4. 高级虚拟主机配置&quot;">​</a></h2><h3 id="_4-1-动态虚拟主机" tabindex="-1">4.1 动态虚拟主机 <a class="header-anchor" href="#_4-1-动态虚拟主机" aria-label="Permalink to &quot;4.1 动态虚拟主机&quot;">​</a></h3><h4 id="_4-1-1-使用mod-vhost-alias" tabindex="-1">4.1.1 使用mod_vhost_alias <a class="header-anchor" href="#_4-1-1-使用mod-vhost-alias" aria-label="Permalink to &quot;4.1.1 使用mod_vhost_alias&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 启用模块</span></span>
<span class="line"><span class="__shiki_1itgoe">LoadModule</span><span class="__shiki_140thh"> vhost_alias_module modules/mod_vhost_alias.so</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 动态虚拟主机配置</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> *:80</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 使用域名直接映射到目录</span></span>
<span class="line"><span class="__shiki_1itgoe">    VirtualDocumentRoot</span><span class="__shiki_140thh"> /var/www/vhosts/%</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">/public_html</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 或者按域名部分映射</span></span>
<span class="line"><span class="__shiki_21nrsd">    # VirtualDocumentRoot /var/www/vhosts/%-2+/%-1+/%0</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 日志文件也动态生成</span></span>
<span class="line"><span class="__shiki_1itgoe">    ErrorLog</span><span class="__shiki_140thh"> /var/log/apache2/error-%</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.log</span></span>
<span class="line"><span class="__shiki_1itgoe">    CustomLog</span><span class="__shiki_140thh"> /var/log/apache2/access-%</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.log combined</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 限制允许的域名（安全考虑）</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">Directory</span><span class="__shiki_mdbnqw"> &quot;/var/www/vhosts&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        Options</span><span class="__shiki_140thh"> -Indexes</span></span>
<span class="line"><span class="__shiki_1itgoe">        AllowOverride</span><span class="__shiki_140thh"> All</span></span>
<span class="line"><span class="__shiki_1itgoe">        Require</span><span class="__shiki_140thh"> all granted</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">Directory</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 通配符DNS配合</span></span>
<span class="line"><span class="__shiki_21nrsd"># 在DNS设置: *.example.com A 192.168.1.100</span></span>
<span class="line"><span class="__shiki_21nrsd"># 访问 anyname.example.com 会自动创建虚拟主机</span></span></code></pre></div><h4 id="_4-1-2-大量虚拟主机优化" tabindex="-1">4.1.2 大量虚拟主机优化 <a class="header-anchor" href="#_4-1-2-大量虚拟主机优化" aria-label="Permalink to &quot;4.1.2 大量虚拟主机优化&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用IP哈希表加速查找（Apache 2.4+）</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_vhost_alias.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 使用哈希表存储虚拟主机</span></span>
<span class="line"><span class="__shiki_1itgoe">    VirtualDocumentRootIP</span><span class="__shiki_140thh"> /var/www/vhosts/%</span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用内存缓存</span></span>
<span class="line"><span class="__shiki_140thh">    VirtualDocumentRootCache </span><span class="__shiki_dzsirb">1000</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 设置过期时间（秒）</span></span>
<span class="line"><span class="__shiki_140thh">    VirtualDocumentRootCacheExpire </span><span class="__shiki_dzsirb">3600</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 简化日志配置</span></span>
<span class="line"><span class="__shiki_1itgoe">LogFormat</span><span class="__shiki_140thh"> &quot;%v %h %l %u %t \\&quot;%r\\&quot; %&gt;s %b&quot; vhost_common</span></span>
<span class="line"><span class="__shiki_1itgoe">CustomLog</span><span class="__shiki_140thh"> /var/log/apache2/vhosts-access.log vhost_common</span></span></code></pre></div><h3 id="_4-2-反向代理虚拟主机" tabindex="-1">4.2 反向代理虚拟主机 <a class="header-anchor" href="#_4-2-反向代理虚拟主机" aria-label="Permalink to &quot;4.2 反向代理虚拟主机&quot;">​</a></h3><h4 id="_4-2-1-代理到后端应用" tabindex="-1">4.2.1 代理到后端应用 <a class="header-anchor" href="#_4-2-1-代理到后端应用" aria-label="Permalink to &quot;4.2.1 代理到后端应用&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> *:80</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerName</span><span class="__shiki_140thh"> app.example.com</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用代理模块</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyPreserveHost</span><span class="__shiki_1t8gfj"> On</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyRequests</span><span class="__shiki_1t8gfj"> Off</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 反向代理设置</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyPass</span><span class="__shiki_140thh"> / http://localhost:</span><span class="__shiki_dzsirb">3000</span><span class="__shiki_140thh">/</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyPassReverse</span><span class="__shiki_140thh"> / http://localhost:</span><span class="__shiki_dzsirb">3000</span><span class="__shiki_140thh">/</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # WebSocket支持</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyPass</span><span class="__shiki_140thh"> /ws/ ws://localhost:</span><span class="__shiki_dzsirb">3000</span><span class="__shiki_140thh">/ws/</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyPassReverse</span><span class="__shiki_140thh"> /ws/ ws://localhost:</span><span class="__shiki_dzsirb">3000</span><span class="__shiki_140thh">/ws/</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 超时设置</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyTimeout</span><span class="__shiki_dzsirb"> 300</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 负载均衡示例</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">Proxy</span><span class="__shiki_mdbnqw"> balancer://mycluster</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        BalancerMember</span><span class="__shiki_140thh"> http://</span><span class="__shiki_dzsirb">192</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">168</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">101</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">3000</span></span>
<span class="line"><span class="__shiki_1itgoe">        BalancerMember</span><span class="__shiki_140thh"> http://</span><span class="__shiki_dzsirb">192</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">168</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">102</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">3000</span></span>
<span class="line"><span class="__shiki_1itgoe">        BalancerMember</span><span class="__shiki_140thh"> http://</span><span class="__shiki_dzsirb">192</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">168</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">103</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">3000</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 负载均衡方法</span></span>
<span class="line"><span class="__shiki_140thh">        ProxySet lbmethod=byrequests</span></span>
<span class="line"><span class="__shiki_140thh">        ProxySet stickysession=JSESSIONID</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">Proxy</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 使用负载均衡</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyPass</span><span class="__shiki_140thh"> / balancer://mycluster/</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyPassReverse</span><span class="__shiki_140thh"> / balancer://mycluster/</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h4 id="_4-2-2-微服务网关配置" tabindex="-1">4.2.2 微服务网关配置 <a class="header-anchor" href="#_4-2-2-微服务网关配置" aria-label="Permalink to &quot;4.2.2 微服务网关配置&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> *:80</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerName</span><span class="__shiki_140thh"> api.example.com</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # API网关路由</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyPass</span><span class="__shiki_140thh"> /users/ http://user-service:</span><span class="__shiki_dzsirb">8080</span><span class="__shiki_140thh">/</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyPassReverse</span><span class="__shiki_140thh"> /users/ http://user-service:</span><span class="__shiki_dzsirb">8080</span><span class="__shiki_140thh">/</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyPass</span><span class="__shiki_140thh"> /products/ http://product-service:</span><span class="__shiki_dzsirb">8081</span><span class="__shiki_140thh">/</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyPassReverse</span><span class="__shiki_140thh"> /products/ http://product-service:</span><span class="__shiki_dzsirb">8081</span><span class="__shiki_140thh">/</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyPass</span><span class="__shiki_140thh"> /orders/ http://order-service:</span><span class="__shiki_dzsirb">8082</span><span class="__shiki_140thh">/</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyPassReverse</span><span class="__shiki_140thh"> /orders/ http://order-service:</span><span class="__shiki_dzsirb">8082</span><span class="__shiki_140thh">/</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 统一认证</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">Location</span><span class="__shiki_mdbnqw"> /</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        AuthType</span><span class="__shiki_140thh"> Basic</span></span>
<span class="line"><span class="__shiki_1itgoe">        AuthName</span><span class="__shiki_140thh"> &quot;API Gateway&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        AuthUserFile</span><span class="__shiki_140thh"> /etc/apache2/.htpasswd</span></span>
<span class="line"><span class="__shiki_1itgoe">        Require</span><span class="__shiki_140thh"> valid-user</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 添加认证头到后端</span></span>
<span class="line"><span class="__shiki_1itgoe">        RequestHeader</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> X-Forwarded-</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh"> %{</span><span class="__shiki_1jdh33">REMOTE_USER</span><span class="__shiki_140thh">}s</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">Location</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 跨域支持</span></span>
<span class="line"><span class="__shiki_1itgoe">    Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> Access-Control-</span><span class="__shiki_1itgoe">Allow</span><span class="__shiki_140thh">-Origin &quot;*&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> Access-Control-</span><span class="__shiki_1itgoe">Allow</span><span class="__shiki_140thh">-Methods &quot;GET, POST, PUT, DELETE, OPTIONS&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> Access-Control-</span><span class="__shiki_1itgoe">Allow</span><span class="__shiki_140thh">-Headers &quot;Content-Type, Authorization&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 预检请求处理</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteCond</span><span class="__shiki_21q97f"> %{REQUEST_METHOD}</span><span class="__shiki_mdbnqw"> OPTIONS</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteRule</span><span class="__shiki_21q97f"> ^(.*)$</span><span class="__shiki_mdbnqw"> $1</span><span class="__shiki_140thh"> [R=</span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">,L]</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h3 id="_4-3-多语言-多区域虚拟主机" tabindex="-1">4.3 多语言/多区域虚拟主机 <a class="header-anchor" href="#_4-3-多语言-多区域虚拟主机" aria-label="Permalink to &quot;4.3 多语言/多区域虚拟主机&quot;">​</a></h3><h4 id="_4-3-1-语言检测与重定向" tabindex="-1">4.3.1 语言检测与重定向 <a class="header-anchor" href="#_4-3-1-语言检测与重定向" aria-label="Permalink to &quot;4.3.1 语言检测与重定向&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> *:80</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerName</span><span class="__shiki_140thh"> example.com</span></span>
<span class="line"><span class="__shiki_1itgoe">    DocumentRoot</span><span class="__shiki_140thh"> /var/www/example.com</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 根据浏览器语言重定向</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteEngine</span><span class="__shiki_1t8gfj"> On</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 中文用户</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteCond</span><span class="__shiki_21q97f"> %{HTTP:Accept-Language}</span><span class="__shiki_mdbnqw"> ^zh</span><span class="__shiki_140thh"> [NC]</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteRule</span><span class="__shiki_21q97f"> ^$</span><span class="__shiki_mdbnqw"> /zh/</span><span class="__shiki_140thh"> [R=</span><span class="__shiki_dzsirb">302</span><span class="__shiki_140thh">,L]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 英文用户</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteCond</span><span class="__shiki_21q97f"> %{HTTP:Accept-Language}</span><span class="__shiki_mdbnqw"> ^en</span><span class="__shiki_140thh"> [NC]</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteRule</span><span class="__shiki_21q97f"> ^$</span><span class="__shiki_mdbnqw"> /en/</span><span class="__shiki_140thh"> [R=</span><span class="__shiki_dzsirb">302</span><span class="__shiki_140thh">,L]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 日语用户</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteCond</span><span class="__shiki_21q97f"> %{HTTP:Accept-Language}</span><span class="__shiki_mdbnqw"> ^ja</span><span class="__shiki_140thh"> [NC]</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteRule</span><span class="__shiki_21q97f"> ^$</span><span class="__shiki_mdbnqw"> /ja/</span><span class="__shiki_140thh"> [R=</span><span class="__shiki_dzsirb">302</span><span class="__shiki_140thh">,L]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 默认英语</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteRule</span><span class="__shiki_21q97f"> ^$</span><span class="__shiki_mdbnqw"> /en/</span><span class="__shiki_140thh"> [R=</span><span class="__shiki_dzsirb">302</span><span class="__shiki_140thh">,L]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 语言子目录处理</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteRule</span><span class="__shiki_21q97f"> ^(en|zh|ja)/(.*)$</span><span class="__shiki_mdbnqw"> $2?lang=$1</span><span class="__shiki_140thh"> [QSA]</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h4 id="_4-3-2-地理区域路由" tabindex="-1">4.3.2 地理区域路由 <a class="header-anchor" href="#_4-3-2-地理区域路由" aria-label="Permalink to &quot;4.3.2 地理区域路由&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> *:80</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerName</span><span class="__shiki_140thh"> global.example.com</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 使用GeoIP模块</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_geoip.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        GeoIPEnable </span><span class="__shiki_1t8gfj">On</span></span>
<span class="line"><span class="__shiki_140thh">        GeoIPDBFile /usr/share/GeoIP/GeoIP.dat</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 美国用户</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;</span><span class="__shiki_1t8gfj">If</span><span class="__shiki_mdbnqw"> &quot;-R &#39;192.168.1.0/24&#39; || %{GEOIP_COUNTRY_CODE} == &#39;US&#39;&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">            DocumentRoot</span><span class="__shiki_140thh"> /var/www/example.com/us/</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;/</span><span class="__shiki_1t8gfj">If</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 欧盟用户</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;</span><span class="__shiki_1t8gfj">ElseIf</span><span class="__shiki_mdbnqw"> &quot;-R &#39;10.0.0.0/8&#39; || %{GEOIP_COUNTRY_CODE} == &#39;DE&#39; || %{GEOIP_COUNTRY_CODE} == &#39;FR&#39;&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">            DocumentRoot</span><span class="__shiki_140thh"> /var/www/example.com/eu/</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # GDPR合规设置</span></span>
<span class="line"><span class="__shiki_1itgoe">            Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> Cookie &quot;HttpOnly; Secure; SameSite=Strict&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;/</span><span class="__shiki_1t8gfj">ElseIf</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 其他地区</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;</span><span class="__shiki_1t8gfj">Else</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">            DocumentRoot</span><span class="__shiki_140thh"> /var/www/example.com/global/</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;/</span><span class="__shiki_1t8gfj">Else</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h2 id="_5-虚拟主机管理工具" tabindex="-1">5. 虚拟主机管理工具 <a class="header-anchor" href="#_5-虚拟主机管理工具" aria-label="Permalink to &quot;5. 虚拟主机管理工具&quot;">​</a></h2><h3 id="_5-1-debian-ubuntu管理命令" tabindex="-1">5.1 Debian/Ubuntu管理命令 <a class="header-anchor" href="#_5-1-debian-ubuntu管理命令" aria-label="Permalink to &quot;5.1 Debian/Ubuntu管理命令&quot;">​</a></h3><h4 id="_5-1-1-站点管理工具" tabindex="-1">5.1.1 站点管理工具 <a class="header-anchor" href="#_5-1-1-站点管理工具" aria-label="Permalink to &quot;5.1.1 站点管理工具&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 启用站点（创建符号链接）</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> a2ensite</span><span class="__shiki_mdbnqw"> example.com.conf</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 禁用站点（移除符号链接）</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> a2dissite</span><span class="__shiki_mdbnqw"> example.com.conf</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 列出已启用站点</span></span>
<span class="line"><span class="__shiki_1t8gfj">ls</span><span class="__shiki_dzsirb"> -la</span><span class="__shiki_mdbnqw"> /etc/apache2/sites-enabled/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 列出可用站点</span></span>
<span class="line"><span class="__shiki_1t8gfj">ls</span><span class="__shiki_dzsirb"> -la</span><span class="__shiki_mdbnqw"> /etc/apache2/sites-available/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 重新加载配置（不中断服务）</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> systemctl</span><span class="__shiki_mdbnqw"> reload</span><span class="__shiki_mdbnqw"> apache2</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 完整重启（中断服务）</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> systemctl</span><span class="__shiki_mdbnqw"> restart</span><span class="__shiki_mdbnqw"> apache2</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查配置语法</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> apachectl</span><span class="__shiki_mdbnqw"> configtest</span></span></code></pre></div><h4 id="_5-1-2-模块管理" tabindex="-1">5.1.2 模块管理 <a class="header-anchor" href="#_5-1-2-模块管理" aria-label="Permalink to &quot;5.1.2 模块管理&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 启用模块</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> a2enmod</span><span class="__shiki_mdbnqw"> rewrite</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> a2enmod</span><span class="__shiki_mdbnqw"> ssl</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> a2enmod</span><span class="__shiki_mdbnqw"> headers</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> a2enmod</span><span class="__shiki_mdbnqw"> proxy</span><span class="__shiki_mdbnqw"> proxy_http</span><span class="__shiki_mdbnqw"> proxy_wstunnel</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 禁用模块</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> a2dismod</span><span class="__shiki_mdbnqw"> autoindex</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 列出已启用模块</span></span>
<span class="line"><span class="__shiki_1t8gfj">apache2ctl</span><span class="__shiki_dzsirb"> -M</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看模块详细信息</span></span>
<span class="line"><span class="__shiki_1t8gfj">apt-cache</span><span class="__shiki_mdbnqw"> show</span><span class="__shiki_mdbnqw"> libapache2-mod-security2</span></span></code></pre></div><h3 id="_5-2-自动化部署脚本" tabindex="-1">5.2 自动化部署脚本 <a class="header-anchor" href="#_5-2-自动化部署脚本" aria-label="Permalink to &quot;5.2 自动化部署脚本&quot;">​</a></h3><h4 id="_5-2-1-bash自动化脚本" tabindex="-1">5.2.1 Bash自动化脚本 <a class="header-anchor" href="#_5-2-1-bash自动化脚本" aria-label="Permalink to &quot;5.2.1 Bash自动化脚本&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># vhost-manager.sh - Apache虚拟主机管理脚本</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">set</span><span class="__shiki_dzsirb"> -e</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 颜色定义</span></span>
<span class="line"><span class="__shiki_140thh">RED</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;\\033[0;31m&#39;</span></span>
<span class="line"><span class="__shiki_140thh">GREEN</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;\\033[0;32m&#39;</span></span>
<span class="line"><span class="__shiki_140thh">YELLOW</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;\\033[1;33m&#39;</span></span>
<span class="line"><span class="__shiki_140thh">NC</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;\\033[0m&#39;</span><span class="__shiki_21nrsd"> # No Color</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 函数：创建虚拟主机</span></span>
<span class="line"><span class="__shiki_1t8gfj">create_vhost</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> domain</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33">$1</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> docroot</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33">$2</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">GREEN</span><span class="__shiki_mdbnqw">}创建虚拟主机: </span><span class="__shiki_140thh">$domain</span><span class="__shiki_mdbnqw">\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 创建文档根目录</span></span>
<span class="line"><span class="__shiki_1t8gfj">    mkdir</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$docroot</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    chown</span><span class="__shiki_dzsirb"> -R</span><span class="__shiki_mdbnqw"> www-data:www-data</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$docroot</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 创建配置文件</span></span>
<span class="line"><span class="__shiki_1t8gfj">    cat</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> &quot;/etc/apache2/sites-available/</span><span class="__shiki_140thh">$domain</span><span class="__shiki_mdbnqw">.conf&quot;</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw"> EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">&lt;VirtualHost *:80&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    ServerName </span><span class="__shiki_140thh">$domain</span></span>
<span class="line"><span class="__shiki_mdbnqw">    DocumentRoot </span><span class="__shiki_140thh">$docroot</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    ErrorLog </span><span class="__shiki_dzsirb">\\$</span><span class="__shiki_mdbnqw">{APACHE_LOG_DIR}/</span><span class="__shiki_140thh">$domain</span><span class="__shiki_mdbnqw">-error.log</span></span>
<span class="line"><span class="__shiki_mdbnqw">    CustomLog </span><span class="__shiki_dzsirb">\\$</span><span class="__shiki_mdbnqw">{APACHE_LOG_DIR}/</span><span class="__shiki_140thh">$domain</span><span class="__shiki_mdbnqw">-access.log combined</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;Directory </span><span class="__shiki_140thh">$docroot</span><span class="__shiki_mdbnqw">&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        Options -Indexes +FollowSymLinks</span></span>
<span class="line"><span class="__shiki_mdbnqw">        AllowOverride All</span></span>
<span class="line"><span class="__shiki_mdbnqw">        Require all granted</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;/Directory&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">&lt;/VirtualHost&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用站点</span></span>
<span class="line"><span class="__shiki_1t8gfj">    a2ensite</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$domain</span><span class="__shiki_mdbnqw">.conf&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 重启Apache</span></span>
<span class="line"><span class="__shiki_1t8gfj">    systemctl</span><span class="__shiki_mdbnqw"> reload</span><span class="__shiki_mdbnqw"> apache2</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">GREEN</span><span class="__shiki_mdbnqw">}虚拟主机 </span><span class="__shiki_140thh">$domain</span><span class="__shiki_mdbnqw"> 创建成功!\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">YELLOW</span><span class="__shiki_mdbnqw">}请在DNS中添加记录: </span><span class="__shiki_140thh">$domain</span><span class="__shiki_mdbnqw"> -&gt; $(</span><span class="__shiki_1t8gfj">hostname</span><span class="__shiki_dzsirb"> -I</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{print $1}&#39;)\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 函数：删除虚拟主机</span></span>
<span class="line"><span class="__shiki_1t8gfj">delete_vhost</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> domain</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33">$1</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">RED</span><span class="__shiki_mdbnqw">}删除虚拟主机: </span><span class="__shiki_140thh">$domain</span><span class="__shiki_mdbnqw">\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 禁用站点</span></span>
<span class="line"><span class="__shiki_1t8gfj">    a2dissite</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$domain</span><span class="__shiki_mdbnqw">.conf&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 删除配置文件</span></span>
<span class="line"><span class="__shiki_1t8gfj">    rm</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> &quot;/etc/apache2/sites-available/</span><span class="__shiki_140thh">$domain</span><span class="__shiki_mdbnqw">.conf&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 重启Apache</span></span>
<span class="line"><span class="__shiki_1t8gfj">    systemctl</span><span class="__shiki_mdbnqw"> reload</span><span class="__shiki_mdbnqw"> apache2</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">GREEN</span><span class="__shiki_mdbnqw">}虚拟主机 </span><span class="__shiki_140thh">$domain</span><span class="__shiki_mdbnqw"> 已删除\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 函数：列出所有虚拟主机</span></span>
<span class="line"><span class="__shiki_1t8gfj">list_vhosts</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">YELLOW</span><span class="__shiki_mdbnqw">}已启用的虚拟主机:\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> conf </span><span class="__shiki_1itgoe">in</span><span class="__shiki_mdbnqw"> /etc/apache2/sites-enabled/*.conf</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_140thh">        [ </span><span class="__shiki_1itgoe">-e</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$conf</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh"> ] </span><span class="__shiki_1itgoe">||</span><span class="__shiki_1itgoe"> continue</span></span>
<span class="line"><span class="__shiki_140thh">        servername</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">grep</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_mdbnqw"> &quot;ServerName&quot;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$conf</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{print $2}&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> head</span><span class="__shiki_dzsirb"> -1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        docroot</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">grep</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_mdbnqw"> &quot;DocumentRoot&quot;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$conf</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{print $2}&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> head</span><span class="__shiki_dzsirb"> -1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;- </span><span class="__shiki_140thh">$servername</span><span class="__shiki_mdbnqw"> -&gt; </span><span class="__shiki_140thh">$docroot</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    done</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 主程序</span></span>
<span class="line"><span class="__shiki_1itgoe">case</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_dzsirb">$1</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> in</span></span>
<span class="line"><span class="__shiki_21q97f">    create</span><span class="__shiki_1itgoe">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_1itgoe">-z</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_dzsirb">$2</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh"> ] </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> [ </span><span class="__shiki_1itgoe">-z</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_dzsirb">$3</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">            echo</span><span class="__shiki_mdbnqw"> &quot;用法: </span><span class="__shiki_dzsirb">$0</span><span class="__shiki_mdbnqw"> create &lt;域名&gt; &lt;文档根目录&gt;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">            exit</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">        fi</span></span>
<span class="line"><span class="__shiki_1t8gfj">        create_vhost</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_dzsirb">$2</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_dzsirb">$3</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        ;;</span></span>
<span class="line"><span class="__shiki_21q97f">    delete</span><span class="__shiki_1itgoe">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_1itgoe">-z</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_dzsirb">$2</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">            echo</span><span class="__shiki_mdbnqw"> &quot;用法: </span><span class="__shiki_dzsirb">$0</span><span class="__shiki_mdbnqw"> delete &lt;域名&gt;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">            exit</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">        fi</span></span>
<span class="line"><span class="__shiki_1t8gfj">        delete_vhost</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_dzsirb">$2</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        ;;</span></span>
<span class="line"><span class="__shiki_21q97f">    list</span><span class="__shiki_1itgoe">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">        list_vhosts</span></span>
<span class="line"><span class="__shiki_140thh">        ;;</span></span>
<span class="line"><span class="__shiki_1itgoe">    *)</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;用法: </span><span class="__shiki_dzsirb">$0</span><span class="__shiki_mdbnqw"> {create|delete|list}&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        exit</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">        ;;</span></span>
<span class="line"><span class="__shiki_1itgoe">esac</span></span></code></pre></div><h4 id="_5-2-2-python管理工具" tabindex="-1">5.2.2 Python管理工具 <a class="header-anchor" href="#_5-2-2-python管理工具" aria-label="Permalink to &quot;5.2.2 Python管理工具&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/usr/bin/env python3</span></span>
<span class="line"><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">Apache虚拟主机管理工具</span></span>
<span class="line"><span class="__shiki_mdbnqw">支持创建、删除、列出、备份虚拟主机</span></span>
<span class="line"><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> os</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> sys</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> shutil</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> subprocess</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> datetime </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> datetime</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> configparser</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> argparse</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ApacheVHostManager</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.sites_available </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;/etc/apache2/sites-available&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.sites_enabled </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;/etc/apache2/sites-enabled&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.backup_dir </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;/var/backups/apache-vhosts&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 确保目录存在</span></span>
<span class="line"><span class="__shiki_140thh">        os.makedirs(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.backup_dir, </span><span class="__shiki_1jdh33">exist_ok</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> create_vhost</span><span class="__shiki_140thh">(self, domain, docroot, template</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;default&quot;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;创建虚拟主机&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 检查域名是否已存在</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> os.path.exists(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.sites_available</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">domain</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">.conf&quot;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;错误: 域名 </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">domain</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> 已存在!&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 创建文档根目录</span></span>
<span class="line"><span class="__shiki_140thh">        os.makedirs(docroot, </span><span class="__shiki_1jdh33">exist_ok</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 设置权限</span></span>
<span class="line"><span class="__shiki_140thh">        subprocess.run([</span><span class="__shiki_mdbnqw">&quot;chown&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;-R&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;www-data:www-data&quot;</span><span class="__shiki_140thh">, docroot])</span></span>
<span class="line"><span class="__shiki_140thh">        subprocess.run([</span><span class="__shiki_mdbnqw">&quot;chmod&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;755&quot;</span><span class="__shiki_140thh">, docroot])</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 选择模板</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> template </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;php&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            config </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._generate_php_config(domain, docroot)</span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_140thh"> template </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;python&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            config </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._generate_python_config(domain, docroot)</span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_140thh"> template </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;static&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            config </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._generate_static_config(domain, docroot)</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            config </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._generate_default_config(domain, docroot)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 写入配置文件</span></span>
<span class="line"><span class="__shiki_140thh">        config_path </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.sites_available</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">domain</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">.conf&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_dzsirb"> open</span><span class="__shiki_140thh">(config_path, </span><span class="__shiki_mdbnqw">&#39;w&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> f:</span></span>
<span class="line"><span class="__shiki_140thh">            f.write(config)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 启用站点</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.enable_vhost(domain)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 重启Apache</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.reload_apache()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;✓ 虚拟主机 </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">domain</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> 创建成功!&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;  文档根目录: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">docroot</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;  配置文件: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">config_path</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _generate_default_config</span><span class="__shiki_140thh">(self, domain, docroot):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;生成默认配置模板&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;&quot;&quot;&lt;VirtualHost *:80&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    ServerName </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">domain</span><span class="__shiki_dzsirb">}</span></span>
<span class="line"><span class="__shiki_mdbnqw">    ServerAlias www.</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">domain</span><span class="__shiki_dzsirb">}</span></span>
<span class="line"><span class="__shiki_mdbnqw">    ServerAdmin webmaster@</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">domain</span><span class="__shiki_dzsirb">}</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    DocumentRoot </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">docroot</span><span class="__shiki_dzsirb">}</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    ErrorLog $</span><span class="__shiki_dzsirb">{{</span><span class="__shiki_mdbnqw">APACHE_LOG_DIR</span><span class="__shiki_dzsirb">}}</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">domain</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">-error.log</span></span>
<span class="line"><span class="__shiki_mdbnqw">    CustomLog $</span><span class="__shiki_dzsirb">{{</span><span class="__shiki_mdbnqw">APACHE_LOG_DIR</span><span class="__shiki_dzsirb">}}</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">domain</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">-access.log combined</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;Directory </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">docroot</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        Options -Indexes +FollowSymLinks +MultiViews</span></span>
<span class="line"><span class="__shiki_mdbnqw">        AllowOverride All</span></span>
<span class="line"><span class="__shiki_mdbnqw">        Require all granted</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        # 安全头</span></span>
<span class="line"><span class="__shiki_mdbnqw">        Header always set X-Content-Type-Options &quot;nosniff&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        Header always set X-Frame-Options &quot;SAMEORIGIN&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;/Directory&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    # 保护敏感文件</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;FilesMatch &quot;\\.(htaccess|htpasswd|ini|log|sh|sql)$&quot;&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        Require all denied</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;/FilesMatch&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">&lt;/VirtualHost&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> enable_vhost</span><span class="__shiki_140thh">(self, domain):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;启用虚拟主机&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        config_file </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">domain</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">.conf&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        enabled_link </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.sites_enabled</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">config_file</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> os.path.exists(enabled_link):</span></span>
<span class="line"><span class="__shiki_140thh">            os.symlink(</span></span>
<span class="line"><span class="__shiki_1itgoe">                f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.sites_available</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">config_file</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                enabled_link</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;✓ 已启用虚拟主机: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">domain</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;⚠ 虚拟主机 </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">domain</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> 已启用&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> disable_vhost</span><span class="__shiki_140thh">(self, domain):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;禁用虚拟主机&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        enabled_link </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.sites_enabled</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">domain</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">.conf&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> os.path.exists(enabled_link):</span></span>
<span class="line"><span class="__shiki_140thh">            os.unlink(enabled_link)</span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;✓ 已禁用虚拟主机: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">domain</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;⚠ 虚拟主机 </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">domain</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> 未启用&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> delete_vhost</span><span class="__shiki_140thh">(self, domain, keep_files</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;删除虚拟主机&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        config_file </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.sites_available</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">domain</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">.conf&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 备份配置</span></span>
<span class="line"><span class="__shiki_140thh">        backup_file </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.backup_dir</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">domain</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">-</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">datetime.now().strftime(</span><span class="__shiki_mdbnqw">&#39;%Y%m</span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">-%H%M%S&#39;</span><span class="__shiki_140thh">)</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">.conf&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> os.path.exists(config_file):</span></span>
<span class="line"><span class="__shiki_140thh">            shutil.copy2(config_file, backup_file)</span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;✓ 配置文件已备份到: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">backup_file</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 禁用站点</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.disable_vhost(domain)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 删除配置文件</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> os.path.exists(config_file):</span></span>
<span class="line"><span class="__shiki_140thh">            os.remove(config_file)</span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;✓ 配置文件已删除: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">config_file</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 可选：删除文档根目录</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> keep_files:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 从配置文件中读取DocumentRoot</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                with</span><span class="__shiki_dzsirb"> open</span><span class="__shiki_140thh">(config_file, </span><span class="__shiki_mdbnqw">&#39;r&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> f:</span></span>
<span class="line"><span class="__shiki_140thh">                    content </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> f.read()</span></span>
<span class="line"><span class="__shiki_1itgoe">                    import</span><span class="__shiki_140thh"> re</span></span>
<span class="line"><span class="__shiki_140thh">                    match </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> re.search(</span><span class="__shiki_1itgoe">r</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_21q97f">DocumentRoot</span><span class="__shiki_dzsirb">\\s</span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb">(.</span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb">)\\s</span><span class="__shiki_1itgoe">*</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">, content)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> match:</span></span>
<span class="line"><span class="__shiki_140thh">                        docroot </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> match.group(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">).strip()</span></span>
<span class="line"><span class="__shiki_1itgoe">                        if</span><span class="__shiki_140thh"> os.path.exists(docroot):</span></span>
<span class="line"><span class="__shiki_140thh">                            shutil.rmtree(docroot)</span></span>
<span class="line"><span class="__shiki_dzsirb">                            print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;✓ 文档根目录已删除: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">docroot</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            except</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                pass</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 重启Apache</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.reload_apache()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;✓ 虚拟主机 </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">domain</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> 已完全删除&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> list_vhosts</span><span class="__shiki_140thh">(self, show_disabled</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;列出虚拟主机&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;=&quot;</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;已启用的虚拟主机:&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;-&quot;</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        enabled_vhosts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> conf </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> sorted</span><span class="__shiki_140thh">(os.listdir(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.sites_enabled)):</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> conf.endswith(</span><span class="__shiki_mdbnqw">&#39;.conf&#39;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">                config_path </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.sites_enabled</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">conf</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> os.path.islink(config_path):</span></span>
<span class="line"><span class="__shiki_1itgoe">                    with</span><span class="__shiki_dzsirb"> open</span><span class="__shiki_140thh">(config_path, </span><span class="__shiki_mdbnqw">&#39;r&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> f:</span></span>
<span class="line"><span class="__shiki_140thh">                        content </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> f.read()</span></span>
<span class="line"><span class="__shiki_140thh">                        domain </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> conf[:</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">]  </span><span class="__shiki_21nrsd"># 移除.conf</span></span>
<span class="line"><span class="__shiki_140thh">                        enabled_vhosts.append(domain)</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_21nrsd">                        # 提取信息</span></span>
<span class="line"><span class="__shiki_1itgoe">                        import</span><span class="__shiki_140thh"> re</span></span>
<span class="line"><span class="__shiki_140thh">                        server_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> re.search(</span><span class="__shiki_1itgoe">r</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_21q97f">ServerName</span><span class="__shiki_dzsirb">\\s</span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb">(.</span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb">)</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">, content)</span></span>
<span class="line"><span class="__shiki_140thh">                        docroot </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> re.search(</span><span class="__shiki_1itgoe">r</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_21q97f">DocumentRoot</span><span class="__shiki_dzsirb">\\s</span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb">(.</span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb">)</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">, content)</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_dzsirb">                        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;域名: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">domain</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                        if</span><span class="__shiki_140thh"> server_name:</span></span>
<span class="line"><span class="__shiki_dzsirb">                            print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;  ServerName: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">server_name.group(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                        if</span><span class="__shiki_140thh"> docroot:</span></span>
<span class="line"><span class="__shiki_dzsirb">                            print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;  DocumentRoot: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">docroot.group(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">                        print</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> show_disabled:</span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;=&quot;</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;可用的虚拟主机（未启用）:&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;-&quot;</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> conf </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> sorted</span><span class="__shiki_140thh">(os.listdir(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.sites_available)):</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> conf.endswith(</span><span class="__shiki_mdbnqw">&#39;.conf&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">and</span><span class="__shiki_140thh"> conf[:</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">not</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> enabled_vhosts:</span></span>
<span class="line"><span class="__shiki_dzsirb">                    print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;域名: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">conf[:</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">]</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;总计: </span><span class="__shiki_dzsirb">{len</span><span class="__shiki_140thh">(enabled_vhosts)</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> 个已启用的虚拟主机&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> reload_apache</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;重新加载Apache配置&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 测试配置</span></span>
<span class="line"><span class="__shiki_140thh">            result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> subprocess.run(</span></span>
<span class="line"><span class="__shiki_140thh">                [</span><span class="__shiki_mdbnqw">&quot;apachectl&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;configtest&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_1jdh33">                capture_output</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                text</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> result.returncode </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">                print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;✓ Apache配置语法正确&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_21nrsd">                # 重新加载</span></span>
<span class="line"><span class="__shiki_140thh">                subprocess.run([</span><span class="__shiki_mdbnqw">&quot;systemctl&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;reload&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;apache2&quot;</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_dzsirb">                print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;✓ Apache配置已重新加载&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_1itgoe">            else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">                print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;✗ Apache配置有错误:&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">                print</span><span class="__shiki_140thh">(result.stderr)</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_1itgoe">        except</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> e:</span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;✗ 重新加载Apache时出错: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">e</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> backup_all</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;备份所有虚拟主机配置&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        timestamp </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> datetime.now().strftime(</span><span class="__shiki_mdbnqw">&#39;%Y%m</span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">-%H%M%S&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        backup_path </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.backup_dir</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">/all-vhosts-</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">timestamp</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">.tar.gz&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        subprocess.run([</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;tar&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;czf&quot;</span><span class="__shiki_140thh">, backup_path,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;-C&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;/etc/apache2&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;sites-available&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;sites-enabled&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        ])</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;✓ 所有虚拟主机配置已备份到: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">backup_path</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> backup_path</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_140thh">    parser </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> argparse.ArgumentParser(</span><span class="__shiki_1jdh33">description</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;Apache虚拟主机管理工具&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    subparsers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> parser.add_subparsers(</span><span class="__shiki_1jdh33">dest</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;command&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">help</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;可用命令&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # create命令</span></span>
<span class="line"><span class="__shiki_140thh">    create_parser </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> subparsers.add_parser(</span><span class="__shiki_mdbnqw">&quot;create&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">help</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;创建虚拟主机&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    create_parser.add_argument(</span><span class="__shiki_mdbnqw">&quot;domain&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">help</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;域名&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    create_parser.add_argument(</span><span class="__shiki_mdbnqw">&quot;docroot&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">help</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;文档根目录&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    create_parser.add_argument(</span><span class="__shiki_mdbnqw">&quot;-t&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;--template&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_1jdh33">                              choices</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&quot;default&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;php&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;python&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;static&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_1jdh33">                              default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;default&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                              help</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;配置模板&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # delete命令</span></span>
<span class="line"><span class="__shiki_140thh">    delete_parser </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> subparsers.add_parser(</span><span class="__shiki_mdbnqw">&quot;delete&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">help</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;删除虚拟主机&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    delete_parser.add_argument(</span><span class="__shiki_mdbnqw">&quot;domain&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">help</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;域名&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    delete_parser.add_argument(</span><span class="__shiki_mdbnqw">&quot;-k&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;--keep-files&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_1jdh33">                              action</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;store_true&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                              help</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;保留文档根目录&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # list命令</span></span>
<span class="line"><span class="__shiki_140thh">    list_parser </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> subparsers.add_parser(</span><span class="__shiki_mdbnqw">&quot;list&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">help</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;列出虚拟主机&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    list_parser.add_argument(</span><span class="__shiki_mdbnqw">&quot;-a&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;--all&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                            action</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;store_true&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                            help</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;显示所有可用配置&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # enable命令</span></span>
<span class="line"><span class="__shiki_140thh">    enable_parser </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> subparsers.add_parser(</span><span class="__shiki_mdbnqw">&quot;enable&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">help</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;启用虚拟主机&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    enable_parser.add_argument(</span><span class="__shiki_mdbnqw">&quot;domain&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">help</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;域名&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # disable命令</span></span>
<span class="line"><span class="__shiki_140thh">    disable_parser </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> subparsers.add_parser(</span><span class="__shiki_mdbnqw">&quot;disable&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">help</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;禁用虚拟主机&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    disable_parser.add_argument(</span><span class="__shiki_mdbnqw">&quot;domain&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">help</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;域名&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # backup命令</span></span>
<span class="line"><span class="__shiki_140thh">    backup_parser </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> subparsers.add_parser(</span><span class="__shiki_mdbnqw">&quot;backup&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">help</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;备份所有配置&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    args </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> parser.parse_args()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> args.command:</span></span>
<span class="line"><span class="__shiki_140thh">        parser.print_help()</span></span>
<span class="line"><span class="__shiki_140thh">        sys.exit(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    manager </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ApacheVHostManager()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> args.command </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;create&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            manager.create_vhost(args.domain, args.docroot, args.template)</span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_140thh"> args.command </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;delete&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            manager.delete_vhost(args.domain, args.keep_files)</span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_140thh"> args.command </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;list&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            manager.list_vhosts(args.all)</span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_140thh"> args.command </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;enable&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            manager.enable_vhost(args.domain)</span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_140thh"> args.command </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;disable&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            manager.disable_vhost(args.domain)</span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_140thh"> args.command </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;backup&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            manager.backup_all()</span></span>
<span class="line"><span class="__shiki_1itgoe">    except</span><span class="__shiki_dzsirb"> PermissionError</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;错误: 需要root权限运行此脚本!&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;请使用sudo执行命令&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        sys.exit(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    except</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> e:</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;错误: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">e</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        sys.exit(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_dzsirb"> __name__</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_mdbnqw"> &quot;__main__&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    main()</span></span></code></pre></div><h2 id="_6-性能优化配置" tabindex="-1">6. 性能优化配置 <a class="header-anchor" href="#_6-性能优化配置" aria-label="Permalink to &quot;6. 性能优化配置&quot;">​</a></h2><h3 id="_6-1-虚拟主机资源限制" tabindex="-1">6.1 虚拟主机资源限制 <a class="header-anchor" href="#_6-1-虚拟主机资源限制" aria-label="Permalink to &quot;6.1 虚拟主机资源限制&quot;">​</a></h3><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 为不同虚拟主机分配不同资源</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> *:80</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerName</span><span class="__shiki_140thh"> high-traffic.com</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 限制并发连接</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mpm_prefork_module</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        MaxClients</span><span class="__shiki_dzsirb"> 150</span></span>
<span class="line"><span class="__shiki_1itgoe">        MaxRequestsPerChild</span><span class="__shiki_dzsirb"> 10000</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mpm_worker_module</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        MaxRequestWorkers</span><span class="__shiki_dzsirb"> 250</span></span>
<span class="line"><span class="__shiki_1itgoe">        ThreadsPerChild</span><span class="__shiki_dzsirb"> 25</span></span>
<span class="line"><span class="__shiki_1itgoe">        MaxConnectionsPerChild</span><span class="__shiki_dzsirb"> 10000</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用Keep-Alive优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    KeepAlive</span><span class="__shiki_1t8gfj"> On</span></span>
<span class="line"><span class="__shiki_1itgoe">    KeepAliveTimeout</span><span class="__shiki_dzsirb"> 5</span></span>
<span class="line"><span class="__shiki_1itgoe">    MaxKeepAliveRequests</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 连接超时</span></span>
<span class="line"><span class="__shiki_1itgoe">    Timeout</span><span class="__shiki_dzsirb"> 30</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用压缩</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_deflate.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        AddOutputFilterByType</span><span class="__shiki_140thh"> DEFLATE </span><span class="__shiki_1t8gfj">text/html</span><span class="__shiki_1t8gfj"> text/plain</span><span class="__shiki_1t8gfj"> text/css</span><span class="__shiki_1t8gfj"> application/javascript</span></span>
<span class="line"><span class="__shiki_1itgoe">        DeflateCompressionLevel</span><span class="__shiki_dzsirb"> 6</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用缓存</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_expires.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ExpiresActive</span><span class="__shiki_1t8gfj"> On</span></span>
<span class="line"><span class="__shiki_1itgoe">        ExpiresByType</span><span class="__shiki_1t8gfj"> image/jpg</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> month&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ExpiresByType</span><span class="__shiki_1t8gfj"> image/jpeg</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> month&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ExpiresByType</span><span class="__shiki_1t8gfj"> image/gif</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> month&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ExpiresByType</span><span class="__shiki_1t8gfj"> image/png</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> month&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ExpiresByType</span><span class="__shiki_1t8gfj"> text/css</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> week&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ExpiresByType</span><span class="__shiki_1t8gfj"> application/javascript</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> week&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> *:80</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerName</span><span class="__shiki_140thh"> low-traffic.com</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 低流量站点使用较少资源</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mpm_prefork_module</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        MaxClients</span><span class="__shiki_dzsirb"> 50</span></span>
<span class="line"><span class="__shiki_1itgoe">        MaxRequestsPerChild</span><span class="__shiki_dzsirb"> 5000</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 更短的超时时间</span></span>
<span class="line"><span class="__shiki_1itgoe">    KeepAliveTimeout</span><span class="__shiki_dzsirb"> 2</span></span>
<span class="line"><span class="__shiki_1itgoe">    Timeout</span><span class="__shiki_dzsirb"> 15</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h3 id="_6-2-基于负载的虚拟主机调度" tabindex="-1">6.2 基于负载的虚拟主机调度 <a class="header-anchor" href="#_6-2-基于负载的虚拟主机调度" aria-label="Permalink to &quot;6.2 基于负载的虚拟主机调度&quot;">​</a></h3><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用mod_proxy_balancer进行负载分配</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> *:80</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerName</span><span class="__shiki_140thh"> loadbalanced.com</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">Proxy</span><span class="__shiki_mdbnqw"> balancer://myapp</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        BalancerMember</span><span class="__shiki_140thh"> http://backend1.example.com route=</span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_1itgoe">        BalancerMember</span><span class="__shiki_140thh"> http://backend2.example.com route=</span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_1itgoe">        BalancerMember</span><span class="__shiki_140thh"> http://backend3.example.com route=</span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 负载均衡算法</span></span>
<span class="line"><span class="__shiki_140thh">        ProxySet lbmethod=byrequests</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 会话粘滞</span></span>
<span class="line"><span class="__shiki_140thh">        ProxySet stickysession=JSESSIONID</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 健康检查</span></span>
<span class="line"><span class="__shiki_140thh">        ProxySet failonstatus=</span><span class="__shiki_dzsirb">500</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">503</span></span>
<span class="line"><span class="__shiki_140thh">        ProxySet maxattempts=</span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 故障转移</span></span>
<span class="line"><span class="__shiki_140thh">        ProxySet nofailover=</span><span class="__shiki_1t8gfj">Off</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">Proxy</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 代理请求到负载均衡器</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyPass</span><span class="__shiki_140thh"> / balancer://myapp/</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyPassReverse</span><span class="__shiki_140thh"> / balancer://myapp/</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 健康检查端点</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">Location</span><span class="__shiki_mdbnqw"> /balancer-manager</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        SetHandler</span><span class="__shiki_140thh"> balancer-manager</span></span>
<span class="line"><span class="__shiki_1itgoe">        Require</span><span class="__shiki_140thh"> host localhost</span></span>
<span class="line"><span class="__shiki_1itgoe">        Require</span><span class="__shiki_140thh"> ip </span><span class="__shiki_dzsirb">192</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">168</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">/</span><span class="__shiki_dzsirb">24</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">Location</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h2 id="_7-安全增强配置" tabindex="-1">7. 安全增强配置 <a class="header-anchor" href="#_7-安全增强配置" aria-label="Permalink to &quot;7. 安全增强配置&quot;">​</a></h2><h3 id="_7-1-虚拟主机隔离" tabindex="-1">7.1 虚拟主机隔离 <a class="header-anchor" href="#_7-1-虚拟主机隔离" aria-label="Permalink to &quot;7.1 虚拟主机隔离&quot;">​</a></h3><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用mod_ruid2或mod_itk进行用户隔离</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> *:80</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerName</span><span class="__shiki_140thh"> customer1.com</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # mod_itk配置（每个虚拟主机不同用户）</span></span>
<span class="line"><span class="__shiki_1itgoe">    AssignUserID</span><span class="__shiki_140thh"> customer1 customer1</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    DocumentRoot</span><span class="__shiki_140thh"> /home/customer1/public_html</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">Directory</span><span class="__shiki_mdbnqw"> /home/customer1/public_html</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        Options</span><span class="__shiki_140thh"> -Indexes +FollowSymLinks</span></span>
<span class="line"><span class="__shiki_1itgoe">        AllowOverride</span><span class="__shiki_140thh"> All</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 限制目录访问</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;</span><span class="__shiki_1t8gfj">LimitExcept</span><span class="__shiki_mdbnqw"> GET POST</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">            Require</span><span class="__shiki_140thh"> all denied</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;/</span><span class="__shiki_1t8gfj">LimitExcept</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">Directory</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # PHP安全设置</span></span>
<span class="line"><span class="__shiki_1itgoe">    php_admin_value</span><span class="__shiki_1t8gfj"> open_basedir</span><span class="__shiki_mdbnqw"> &quot;/home/customer1/public_html:/tmp&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    php_admin_flag</span><span class="__shiki_1t8gfj"> allow_url_fopen</span><span class="__shiki_mdbnqw"> off</span></span>
<span class="line"><span class="__shiki_1itgoe">    php_admin_flag</span><span class="__shiki_1t8gfj"> allow_url_include</span><span class="__shiki_mdbnqw"> off</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 限制资源使用</span></span>
<span class="line"><span class="__shiki_1itgoe">    RLimitCPU</span><span class="__shiki_dzsirb"> 300</span><span class="__shiki_dzsirb"> 600</span></span>
<span class="line"><span class="__shiki_1itgoe">    RLimitMEM</span><span class="__shiki_dzsirb"> 128000</span><span class="__shiki_dzsirb"> 256000</span></span>
<span class="line"><span class="__shiki_1itgoe">    RLimitNPROC</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> *:80</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerName</span><span class="__shiki_140thh"> customer2.com</span></span>
<span class="line"><span class="__shiki_1itgoe">    AssignUserID</span><span class="__shiki_140thh"> customer2 customer2</span></span>
<span class="line"><span class="__shiki_21nrsd">    # ... 类似配置，完全隔离</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h3 id="_7-2-web应用防火墙配置" tabindex="-1">7.2 Web应用防火墙配置 <a class="header-anchor" href="#_7-2-web应用防火墙配置" aria-label="Permalink to &quot;7.2 Web应用防火墙配置&quot;">​</a></h3><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用mod_security进行WAF保护</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> *:80</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerName</span><span class="__shiki_140thh"> secured.com</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用mod_security</span></span>
<span class="line"><span class="__shiki_140thh">    SecRuleEngine </span><span class="__shiki_1t8gfj">On</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 规则文件</span></span>
<span class="line"><span class="__shiki_1itgoe">    Include</span><span class="__shiki_140thh"> /etc/modsecurity/modsecurity.conf</span></span>
<span class="line"><span class="__shiki_1itgoe">    Include</span><span class="__shiki_140thh"> /etc/modsecurity/crs-setup.conf</span></span>
<span class="line"><span class="__shiki_1itgoe">    Include</span><span class="__shiki_140thh"> /etc/modsecurity/rules/*.conf</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 自定义规则</span></span>
<span class="line"><span class="__shiki_140thh">    SecRule REQUEST_URI &quot;@contains /admin&quot; \\</span></span>
<span class="line"><span class="__shiki_140thh">        &quot;id:</span><span class="__shiki_dzsirb">1001</span><span class="__shiki_140thh">,phase:</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,deny,status:</span><span class="__shiki_dzsirb">403</span><span class="__shiki_140thh">,msg:&#39;Admin access blocked&#39;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 防护SQL注入</span></span>
<span class="line"><span class="__shiki_140thh">    SecRule ARGS &quot;@detectSQLi&quot; \\</span></span>
<span class="line"><span class="__shiki_140thh">        &quot;id:</span><span class="__shiki_dzsirb">1002</span><span class="__shiki_140thh">,phase:</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">,block,msg:&#39;SQL Injection attempt&#39;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 防护XSS</span></span>
<span class="line"><span class="__shiki_140thh">    SecRule ARGS &quot;@detectXSS&quot; \\</span></span>
<span class="line"><span class="__shiki_140thh">        &quot;id:</span><span class="__shiki_dzsirb">1003</span><span class="__shiki_140thh">,phase:</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">,block,msg:&#39;XSS attempt&#39;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 限制文件上传</span></span>
<span class="line"><span class="__shiki_140thh">    SecRule FILES_TMPNAMES &quot;@rx \\.(php|exe|sh)$&quot; \\</span></span>
<span class="line"><span class="__shiki_140thh">        &quot;id:</span><span class="__shiki_dzsirb">1004</span><span class="__shiki_140thh">,phase:</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">,deny,msg:&#39;Dangerous file upload&#39;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 日志设置</span></span>
<span class="line"><span class="__shiki_140thh">    SecAuditEngine RelevantOnly</span></span>
<span class="line"><span class="__shiki_140thh">    SecAuditLog /var/log/apache2/modsec_audit.log</span></span>
<span class="line"><span class="__shiki_140thh">    SecDebugLog /var/log/apache2/modsec_debug.log</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 错误处理</span></span>
<span class="line"><span class="__shiki_1itgoe">    ErrorDocument</span><span class="__shiki_dzsirb"> 403</span><span class="__shiki_140thh"> /error/</span><span class="__shiki_dzsirb">403</span><span class="__shiki_140thh">.html</span></span>
<span class="line"><span class="__shiki_1itgoe">    ErrorDocument</span><span class="__shiki_dzsirb"> 404</span><span class="__shiki_140thh"> /error/</span><span class="__shiki_dzsirb">404</span><span class="__shiki_140thh">.html</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h2 id="_8-监控和日志分析" tabindex="-1">8. 监控和日志分析 <a class="header-anchor" href="#_8-监控和日志分析" aria-label="Permalink to &quot;8. 监控和日志分析&quot;">​</a></h2><h3 id="_8-1-虚拟主机监控配置" tabindex="-1">8.1 虚拟主机监控配置 <a class="header-anchor" href="#_8-1-虚拟主机监控配置" aria-label="Permalink to &quot;8.1 虚拟主机监控配置&quot;">​</a></h3><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 启用详细日志和状态</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> *:80</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerName</span><span class="__shiki_140thh"> monitored.com</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 扩展状态信息</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExtendedStatus</span><span class="__shiki_1t8gfj"> On</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 详细访问日志</span></span>
<span class="line"><span class="__shiki_1itgoe">    LogFormat</span><span class="__shiki_140thh"> &quot;%h %l %u %t \\&quot;%r\\&quot; %&gt;s %b \\&quot;%{</span><span class="__shiki_1jdh33">Referer</span><span class="__shiki_140thh">}i\\&quot; \\&quot;%{</span><span class="__shiki_1jdh33">User-Agent</span><span class="__shiki_140thh">}i\\&quot; %T/%D %X&quot; detailed</span></span>
<span class="line"><span class="__shiki_1itgoe">    CustomLog</span><span class="__shiki_140thh"> \${APACHE_LOG_DIR}/monitored-access.log detailed</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 错误日志级别</span></span>
<span class="line"><span class="__shiki_1itgoe">    LogLevel</span><span class="__shiki_140thh"> warn rewrite:trace2</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用服务器状态页（需要mod_status）</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">Location</span><span class="__shiki_mdbnqw"> /server-status</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        SetHandler</span><span class="__shiki_140thh"> server-status</span></span>
<span class="line"><span class="__shiki_1itgoe">        Require</span><span class="__shiki_140thh"> host localhost</span></span>
<span class="line"><span class="__shiki_1itgoe">        Require</span><span class="__shiki_140thh"> ip </span><span class="__shiki_dzsirb">192</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">168</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">/</span><span class="__shiki_dzsirb">24</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 扩展信息</span></span>
<span class="line"><span class="__shiki_1itgoe">        ExtendedStatus</span><span class="__shiki_1t8gfj"> On</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">Location</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用服务器信息页（需要mod_info）</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">Location</span><span class="__shiki_mdbnqw"> /server-info</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        SetHandler</span><span class="__shiki_140thh"> server-info</span></span>
<span class="line"><span class="__shiki_1itgoe">        Require</span><span class="__shiki_140thh"> host localhost</span></span>
<span class="line"><span class="__shiki_1itgoe">        Require</span><span class="__shiki_140thh"> ip </span><span class="__shiki_dzsirb">192</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">168</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">/</span><span class="__shiki_dzsirb">24</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">Location</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 实时日志流</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_log_forensic.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ForensicLog</span><span class="__shiki_140thh"> \${APACHE_LOG_DIR}/forensic.log</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h3 id="_8-2-日志轮转配置" tabindex="-1">8.2 日志轮转配置 <a class="header-anchor" href="#_8-2-日志轮转配置" aria-label="Permalink to &quot;8.2 日志轮转配置&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># /etc/logrotate.d/apache2</span></span>
<span class="line"><span class="__shiki_1t8gfj">/var/log/apache2/*.log</span><span class="__shiki_mdbnqw"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    daily</span></span>
<span class="line"><span class="__shiki_1t8gfj">    missingok</span></span>
<span class="line"><span class="__shiki_1t8gfj">    rotate</span><span class="__shiki_dzsirb"> 14</span></span>
<span class="line"><span class="__shiki_1t8gfj">    compress</span></span>
<span class="line"><span class="__shiki_1t8gfj">    delaycompress</span></span>
<span class="line"><span class="__shiki_1t8gfj">    notifempty</span></span>
<span class="line"><span class="__shiki_1t8gfj">    create</span><span class="__shiki_dzsirb"> 640</span><span class="__shiki_mdbnqw"> root</span><span class="__shiki_mdbnqw"> adm</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sharedscripts</span></span>
<span class="line"><span class="__shiki_1t8gfj">    postrotate</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1t8gfj"> /etc/init.d/apache2</span><span class="__shiki_mdbnqw"> status</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /dev/null</span><span class="__shiki_140thh"> ; </span><span class="__shiki_1itgoe">then</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_1t8gfj">            /etc/init.d/apache2</span><span class="__shiki_mdbnqw"> reload</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /dev/null</span><span class="__shiki_140thh">; </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_1t8gfj">        fi</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    endscript</span></span>
<span class="line"><span class="__shiki_1t8gfj">    prerotate</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_1itgoe">-d</span><span class="__shiki_140thh"> /etc/logrotate.d/httpd-prerotate ]; </span><span class="__shiki_1itgoe">then</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_1t8gfj">            run-parts</span><span class="__shiki_mdbnqw"> /etc/logrotate.d/httpd-prerotate</span><span class="__shiki_140thh">; </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_1t8gfj">        fi</span><span class="__shiki_140thh">; </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_1t8gfj">    endscript</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 虚拟主机特定的日志轮转</span></span>
<span class="line"><span class="__shiki_1t8gfj">/var/log/apache2/*-access.log</span><span class="__shiki_mdbnqw"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    rotate</span><span class="__shiki_dzsirb"> 7</span></span>
<span class="line"><span class="__shiki_1t8gfj">    daily</span></span>
<span class="line"><span class="__shiki_1t8gfj">    compress</span></span>
<span class="line"><span class="__shiki_1t8gfj">    postrotate</span></span>
<span class="line"><span class="__shiki_1t8gfj">        /usr/bin/killall</span><span class="__shiki_dzsirb"> -HUP</span><span class="__shiki_mdbnqw"> apache2</span></span>
<span class="line"><span class="__shiki_1t8gfj">    endscript</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_9-故障排查与调试" tabindex="-1">9. 故障排查与调试 <a class="header-anchor" href="#_9-故障排查与调试" aria-label="Permalink to &quot;9. 故障排查与调试&quot;">​</a></h2><h3 id="_9-1-常见问题排查" tabindex="-1">9.1 常见问题排查 <a class="header-anchor" href="#_9-1-常见问题排查" aria-label="Permalink to &quot;9.1 常见问题排查&quot;">​</a></h3><h4 id="_9-1-1-配置测试命令" tabindex="-1">9.1.1 配置测试命令 <a class="header-anchor" href="#_9-1-1-配置测试命令" aria-label="Permalink to &quot;9.1.1 配置测试命令&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 测试Apache配置语法</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> apachectl</span><span class="__shiki_mdbnqw"> configtest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 详细配置检查</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> apachectl</span><span class="__shiki_dzsirb"> -S</span></span>
<span class="line"><span class="__shiki_21nrsd"># 输出示例:</span></span>
<span class="line"><span class="__shiki_21nrsd"># VirtualHost configuration:</span></span>
<span class="line"><span class="__shiki_21nrsd"># *:80                   is a NameVirtualHost</span></span>
<span class="line"><span class="__shiki_21nrsd">#          default server example.com (/etc/apache2/sites-enabled/example.com.conf:1)</span></span>
<span class="line"><span class="__shiki_21nrsd">#          port 80 namevhost example.com (/etc/apache2/sites-enabled/example.com.conf:1)</span></span>
<span class="line"><span class="__shiki_21nrsd">#          port 80 namevhost test.com (/etc/apache2/sites-enabled/test.com.conf:1)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查加载的模块</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> apachectl</span><span class="__shiki_dzsirb"> -M</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查监听端口</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> netstat</span><span class="__shiki_dzsirb"> -tlnp</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> apache</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> ss</span><span class="__shiki_dzsirb"> -tlnp</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> apache</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 跟踪特定虚拟主机的请求</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> tail</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> /var/log/apache2/example.com-access.log</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> tail</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> /var/log/apache2/example.com-error.log</span></span></code></pre></div><h4 id="_9-1-2-调试技巧" tabindex="-1">9.1.2 调试技巧 <a class="header-anchor" href="#_9-1-2-调试技巧" aria-label="Permalink to &quot;9.1.2 调试技巧&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 启用详细日志</span></span>
<span class="line"><span class="__shiki_21nrsd"># 在虚拟主机配置中添加:</span></span>
<span class="line"><span class="__shiki_1t8gfj">LogLevel</span><span class="__shiki_mdbnqw"> debug</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 使用curl测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -v</span><span class="__shiki_mdbnqw"> http://example.com/</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -I</span><span class="__shiki_mdbnqw"> http://example.com/</span><span class="__shiki_21nrsd">  # 只获取头部</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 检查DNS解析</span></span>
<span class="line"><span class="__shiki_1t8gfj">nslookup</span><span class="__shiki_mdbnqw"> example.com</span></span>
<span class="line"><span class="__shiki_1t8gfj">dig</span><span class="__shiki_mdbnqw"> example.com</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 检查防火墙</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> ufw</span><span class="__shiki_mdbnqw"> status</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> iptables</span><span class="__shiki_dzsirb"> -L</span><span class="__shiki_dzsirb"> -n</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. SELinux问题（CentOS/RHEL）</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> semanage</span><span class="__shiki_mdbnqw"> port</span><span class="__shiki_dzsirb"> -a</span><span class="__shiki_dzsirb"> -t</span><span class="__shiki_mdbnqw"> http_port_t</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> tcp</span><span class="__shiki_dzsirb"> 8080</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> setsebool</span><span class="__shiki_dzsirb"> -P</span><span class="__shiki_mdbnqw"> httpd_can_network_connect</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 6. 检查文件权限</span></span>
<span class="line"><span class="__shiki_1t8gfj">namei</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_mdbnqw"> /var/www/example.com/public_html/index.html</span></span></code></pre></div><h3 id="_9-2-性能问题排查" tabindex="-1">9.2 性能问题排查 <a class="header-anchor" href="#_9-2-性能问题排查" aria-label="Permalink to &quot;9.2 性能问题排查&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 查看Apache状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> apachectl</span><span class="__shiki_mdbnqw"> status</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 实时监控连接数</span></span>
<span class="line"><span class="__shiki_1t8gfj">watch</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_mdbnqw"> &quot;netstat -an | grep :80 | wc -l&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 查看进程内存使用</span></span>
<span class="line"><span class="__shiki_1t8gfj">ps</span><span class="__shiki_mdbnqw"> aux</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> apache</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> sort</span><span class="__shiki_dzsirb"> -nk4</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 使用ab进行压力测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">ab</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_mdbnqw"> http://example.com/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 监控系统资源</span></span>
<span class="line"><span class="__shiki_1t8gfj">top</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_140thh"> $(</span><span class="__shiki_1t8gfj">pgrep</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_mdbnqw">&#39;,&#39;</span><span class="__shiki_mdbnqw"> apache2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">htop</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_140thh"> $(</span><span class="__shiki_1t8gfj">pgrep</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_mdbnqw">&#39;,&#39;</span><span class="__shiki_mdbnqw"> httpd</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 6. 检查磁盘I/O</span></span>
<span class="line"><span class="__shiki_1t8gfj">iotop</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_140thh"> $(</span><span class="__shiki_1t8gfj">pgrep</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_mdbnqw">&#39;,&#39;</span><span class="__shiki_mdbnqw"> apache2</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 7. 分析访问日志中的慢请求</span></span>
<span class="line"><span class="__shiki_1t8gfj">awk</span><span class="__shiki_mdbnqw"> &#39;{print $NF}&#39;</span><span class="__shiki_mdbnqw"> access.log</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> sort</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> tail</span><span class="__shiki_dzsirb"> -20</span></span></code></pre></div><h2 id="_10-实际生产案例" tabindex="-1">10. 实际生产案例 <a class="header-anchor" href="#_10-实际生产案例" aria-label="Permalink to &quot;10. 实际生产案例&quot;">​</a></h2><h3 id="_10-1-电子商务网站配置" tabindex="-1">10.1 电子商务网站配置 <a class="header-anchor" href="#_10-1-电子商务网站配置" aria-label="Permalink to &quot;10.1 电子商务网站配置&quot;">​</a></h3><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># /etc/apache2/sites-available/ecommerce.com.conf</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> *:80</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerName</span><span class="__shiki_140thh"> ecommerce.com</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerAlias</span><span class="__shiki_mdbnqw"> www.ecommerce.com</span><span class="__shiki_mdbnqw"> shop.ecommerce.com</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # HTTP重定向到HTTPS</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteEngine</span><span class="__shiki_1t8gfj"> On</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteCond</span><span class="__shiki_21q97f"> %{HTTPS}</span><span class="__shiki_mdbnqw"> off</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteRule</span><span class="__shiki_21q97f"> ^(.*)$</span><span class="__shiki_mdbnqw"> https://%{HTTP_HOST}$1</span><span class="__shiki_140thh"> [R=</span><span class="__shiki_dzsirb">301</span><span class="__shiki_140thh">,L]</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_ssl.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> *:443</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerName</span><span class="__shiki_140thh"> ecommerce.com</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerAlias</span><span class="__shiki_mdbnqw"> www.ecommerce.com</span><span class="__shiki_mdbnqw"> shop.ecommerce.com</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    DocumentRoot</span><span class="__shiki_140thh"> /var/www/ecommerce/public</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSL配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLEngine</span><span class="__shiki_1t8gfj"> on</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLCertificateFile</span><span class="__shiki_140thh"> /etc/ssl/certs/ecommerce.com.crt</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLCertificateKeyFile</span><span class="__shiki_140thh"> /etc/ssl/private/ecommerce.com.key</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLCertificateChainFile</span><span class="__shiki_140thh"> /etc/ssl/certs/ecommerce.com-chain.crt</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 性能优化</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_deflate.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        AddOutputFilterByType</span><span class="__shiki_140thh"> DEFLATE </span><span class="__shiki_1t8gfj">text/html</span><span class="__shiki_1t8gfj"> text/plain</span><span class="__shiki_1t8gfj"> text/css</span><span class="__shiki_1t8gfj"> application/javascript</span><span class="__shiki_1t8gfj"> application/json</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 缓存策略</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_expires.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ExpiresActive</span><span class="__shiki_1t8gfj"> On</span></span>
<span class="line"><span class="__shiki_1itgoe">        ExpiresByType</span><span class="__shiki_1t8gfj"> image/jpeg</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> year&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ExpiresByType</span><span class="__shiki_1t8gfj"> image/png</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> year&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ExpiresByType</span><span class="__shiki_1t8gfj"> image/webp</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> year&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ExpiresByType</span><span class="__shiki_1t8gfj"> text/css</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> month&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ExpiresByType</span><span class="__shiki_1t8gfj"> application/javascript</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> month&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 安全头</span></span>
<span class="line"><span class="__shiki_1itgoe">    Header</span><span class="__shiki_140thh"> always </span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh"> Content-Security-Policy &quot;default-src &#39;self&#39;; script-src &#39;self&#39; &#39;unsafe-inline&#39; https://ajax.googleapis.com; style-src &#39;self&#39; &#39;unsafe-inline&#39;; img-src &#39;self&#39; data: https:; font-src &#39;self&#39; https://fonts.gstatic.com&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    Header</span><span class="__shiki_140thh"> always </span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh"> X-Frame-</span><span class="__shiki_1itgoe">Options</span><span class="__shiki_140thh"> &quot;SAMEORIGIN&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    Header</span><span class="__shiki_140thh"> always </span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh"> X-Content-Type-</span><span class="__shiki_1itgoe">Options</span><span class="__shiki_140thh"> &quot;nosniff&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    Header</span><span class="__shiki_140thh"> always </span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh"> X-XSS-Protection &quot;</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">; mode=block&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # PHP设置（如果使用）</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_php7.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        php_value</span><span class="__shiki_1t8gfj"> upload_max_filesize</span><span class="__shiki_mdbnqw"> 20M</span></span>
<span class="line"><span class="__shiki_1itgoe">        php_value</span><span class="__shiki_1t8gfj"> post_max_size</span><span class="__shiki_mdbnqw"> 25M</span></span>
<span class="line"><span class="__shiki_1itgoe">        php_value</span><span class="__shiki_1t8gfj"> max_execution_time</span><span class="__shiki_mdbnqw"> 300</span></span>
<span class="line"><span class="__shiki_1itgoe">        php_value</span><span class="__shiki_1t8gfj"> memory_limit</span><span class="__shiki_mdbnqw"> 256M</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 目录配置</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">Directory</span><span class="__shiki_mdbnqw"> /var/www/ecommerce/public</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        Options</span><span class="__shiki_140thh"> -Indexes +FollowSymLinks</span></span>
<span class="line"><span class="__shiki_1itgoe">        AllowOverride</span><span class="__shiki_140thh"> All</span></span>
<span class="line"><span class="__shiki_1itgoe">        Require</span><span class="__shiki_140thh"> all granted</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 重写规则</span></span>
<span class="line"><span class="__shiki_1itgoe">        RewriteEngine</span><span class="__shiki_1t8gfj"> On</span></span>
<span class="line"><span class="__shiki_1itgoe">        RewriteCond</span><span class="__shiki_21q97f"> %{REQUEST_FILENAME}</span><span class="__shiki_mdbnqw"> !-f</span></span>
<span class="line"><span class="__shiki_1itgoe">        RewriteCond</span><span class="__shiki_21q97f"> %{REQUEST_FILENAME}</span><span class="__shiki_mdbnqw"> !-d</span></span>
<span class="line"><span class="__shiki_1itgoe">        RewriteRule</span><span class="__shiki_21q97f"> ^(.*)$</span><span class="__shiki_mdbnqw"> index.php?q=$1</span><span class="__shiki_140thh"> [L,QSA]</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">Directory</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # API端点特殊处理</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">Location</span><span class="__shiki_mdbnqw"> /api/</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # API限流</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 可以使用mod_ratelimit或应用层实现</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">Location</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 后台管理区域</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">Location</span><span class="__shiki_mdbnqw"> /admin/</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        AuthType</span><span class="__shiki_140thh"> Basic</span></span>
<span class="line"><span class="__shiki_1itgoe">        AuthName</span><span class="__shiki_140thh"> &quot;Admin Area&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        AuthUserFile</span><span class="__shiki_140thh"> /etc/apache2/.htpasswd-admin</span></span>
<span class="line"><span class="__shiki_1itgoe">        Require</span><span class="__shiki_140thh"> valid-user</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 双重验证头</span></span>
<span class="line"><span class="__shiki_1itgoe">        Header</span><span class="__shiki_140thh"> always </span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh"> X-Admin-Access &quot;Restricted&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">Location</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 日志配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    ErrorLog</span><span class="__shiki_140thh"> \${APACHE_LOG_DIR}/ecommerce-error.log</span></span>
<span class="line"><span class="__shiki_1itgoe">    LogFormat</span><span class="__shiki_140thh"> &quot;%h %l %u %t \\&quot;%r\\&quot; %&gt;s %b \\&quot;%{</span><span class="__shiki_1jdh33">Referer</span><span class="__shiki_140thh">}i\\&quot; \\&quot;%{</span><span class="__shiki_1jdh33">User-Agent</span><span class="__shiki_140thh">}i\\&quot; \\&quot;%{</span><span class="__shiki_1jdh33">Cookie</span><span class="__shiki_140thh">}i\\&quot;&quot; ecommerce_combined</span></span>
<span class="line"><span class="__shiki_1itgoe">    CustomLog</span><span class="__shiki_140thh"> \${APACHE_LOG_DIR}/ecommerce-access.log ecommerce_combined</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 慢请求日志</span></span>
<span class="line"><span class="__shiki_1itgoe">    LogFormat</span><span class="__shiki_140thh"> &quot;%h %l %u %t \\&quot;%r\\&quot; %&gt;s %b %D&quot; slow_request</span></span>
<span class="line"><span class="__shiki_1itgoe">    CustomLog</span><span class="__shiki_140thh"> \${APACHE_LOG_DIR}/ecommerce-slow.log slow_request env=slow_request</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 设置慢请求条件</span></span>
<span class="line"><span class="__shiki_1itgoe">    SetEnvIf</span><span class="__shiki_140thh"> Request_URI &quot;\\.(php|asp|aspx)$&quot; slow_request</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h3 id="_10-2-多租户saas平台配置" tabindex="-1">10.2 多租户SaaS平台配置 <a class="header-anchor" href="#_10-2-多租户saas平台配置" aria-label="Permalink to &quot;10.2 多租户SaaS平台配置&quot;">​</a></h3><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># SaaS平台动态虚拟主机配置</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> *:80</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 通配符DNS解析到同一IP</span></span>
<span class="line"><span class="__shiki_21nrsd">    # *.saasplatform.com -&gt; 192.168.1.100</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 动态文档根目录</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 根据子域名映射到不同租户</span></span>
<span class="line"><span class="__shiki_1itgoe">    VirtualDocumentRoot</span><span class="__shiki_140thh"> /var/www/saas/tenants/%</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">/public_html</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 租户数据库配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteEngine</span><span class="__shiki_1t8gfj"> On</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteMap</span><span class="__shiki_140thh"> tenantdb txt:/etc/apache2/tenant-db.map</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteRule</span><span class="__shiki_21q97f"> ^</span><span class="__shiki_mdbnqw"> -</span><span class="__shiki_140thh"> [E=TENANT_DB:\${tenantdb:%</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">}]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 设置租户环境变量</span></span>
<span class="line"><span class="__shiki_1itgoe">    SetEnvIf</span><span class="__shiki_140thh"> Host ^([^.]+)\\.saasplatform\\.com$ TENANT_NAME=$</span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 日志按租户分割</span></span>
<span class="line"><span class="__shiki_1itgoe">    ErrorLog</span><span class="__shiki_140thh"> &quot;|/usr/bin/rotatelogs /var/log/apache2/tenant-%</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">-error.log </span><span class="__shiki_dzsirb">86400</span><span class="__shiki_140thh">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    CustomLog</span><span class="__shiki_140thh"> &quot;|/usr/bin/rotatelogs /var/log/apache2/tenant-%</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">-access.log </span><span class="__shiki_dzsirb">86400</span><span class="__shiki_140thh">&quot; combined</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 通用目录配置</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">Directory</span><span class="__shiki_mdbnqw"> /var/www/saas/tenants</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        Options</span><span class="__shiki_140thh"> -Indexes +FollowSymLinks</span></span>
<span class="line"><span class="__shiki_1itgoe">        AllowOverride</span><span class="__shiki_140thh"> All</span></span>
<span class="line"><span class="__shiki_1itgoe">        Require</span><span class="__shiki_140thh"> all granted</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 安全限制</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_mdbnqw"> &quot;\\.(php|inc|conf|sh)$&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">            Require</span><span class="__shiki_140thh"> all denied</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;/</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">Directory</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 上传目录隔离</span></span>
<span class="line"><span class="__shiki_1itgoe">    Alias</span><span class="__shiki_mdbnqw"> /uploads</span><span class="__shiki_mdbnqw"> /var/www/saas/uploads/%1</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">Directory</span><span class="__shiki_mdbnqw"> /var/www/saas/uploads/%1</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        Options</span><span class="__shiki_140thh"> -Indexes</span></span>
<span class="line"><span class="__shiki_1itgoe">        AllowOverride</span><span class="__shiki_140thh"> None</span></span>
<span class="line"><span class="__shiki_1itgoe">        Require</span><span class="__shiki_140thh"> all granted</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">Directory</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># HTTPS配置类似，需要通配符SSL证书</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> *:443</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerName</span><span class="__shiki_140thh"> *.saasplatform.com</span></span>
<span class="line"><span class="__shiki_1itgoe">    VirtualDocumentRoot</span><span class="__shiki_140thh"> /var/www/saas/tenants/%</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">/public_html</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLEngine</span><span class="__shiki_1t8gfj"> on</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLCertificateFile</span><span class="__shiki_140thh"> /etc/ssl/certs/wildcard.saasplatform.com.crt</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLCertificateKeyFile</span><span class="__shiki_140thh"> /etc/ssl/private/wildcard.saasplatform.com.key</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>Apache虚拟主机管理是企业级Web服务的基础技能。关键要点包括：</p><h3 id="核心概念" tabindex="-1">核心概念： <a class="header-anchor" href="#核心概念" aria-label="Permalink to &quot;核心概念：&quot;">​</a></h3><ol><li><strong>基于域名的虚拟主机</strong>是现代Web服务的主流</li><li><strong>SSL/TLS配置</strong>是生产环境必需</li><li><strong>虚拟主机隔离</strong>确保安全性和稳定性</li></ol><h3 id="最佳实践" tabindex="-1">最佳实践： <a class="header-anchor" href="#最佳实践" aria-label="Permalink to &quot;最佳实践：&quot;">​</a></h3><ol><li><strong>配置文件组织</strong>：按功能分离配置，使用sites-available/enabled模式</li><li><strong>自动化管理</strong>：使用脚本工具减少人工错误</li><li><strong>监控和日志</strong>：完善的日志策略便于故障排查</li><li><strong>安全加固</strong>：每个虚拟主机独立的安全配置</li><li><strong>性能优化</strong>：根据流量特点调整资源分配</li></ol><h3 id="高级技巧" tabindex="-1">高级技巧： <a class="header-anchor" href="#高级技巧" aria-label="Permalink to &quot;高级技巧：&quot;">​</a></h3><ol><li><strong>动态虚拟主机</strong>：适合多租户SaaS平台</li><li><strong>反向代理配置</strong>：整合微服务和后端应用</li><li><strong>负载均衡</strong>：高可用性架构的基础</li><li><strong>地理路由</strong>：全球化服务优化</li></ol><p>通过合理配置虚拟主机，可以在一台物理服务器上安全、高效地托管数十甚至数百个网站，是Web服务器管理的核心技能。</p>`,102)])])}const r=a(p,[["render",l]]);export{d as __pageData,r as default};
