import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"Nginx安全加固实践完全指南","description":"","frontmatter":{},"headers":[],"relativePath":"devops/web-servers/nginx/security.md","filePath":"devops/web-servers/nginx/security.md"}'),p={name:"devops/web-servers/nginx/security.md"};function l(h,s,c,t,e,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="nginx安全加固实践完全指南" tabindex="-1">Nginx安全加固实践完全指南 <a class="header-anchor" href="#nginx安全加固实践完全指南" aria-label="Permalink to &quot;Nginx安全加固实践完全指南&quot;">​</a></h1><h2 id="第一部分-安全基础与威胁模型" tabindex="-1">第一部分：安全基础与威胁模型 <a class="header-anchor" href="#第一部分-安全基础与威胁模型" aria-label="Permalink to &quot;第一部分：安全基础与威胁模型&quot;">​</a></h2><h3 id="_1-1-安全威胁模型" tabindex="-1">1.1 安全威胁模型 <a class="header-anchor" href="#_1-1-安全威胁模型" aria-label="Permalink to &quot;1.1 安全威胁模型&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">攻击面分析：</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 网络层攻击</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── DDoS/DoS攻击</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── SYN洪水攻击</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── IP欺骗</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── 端口扫描</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 应用层攻击</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── SQL注入</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── XSS跨站脚本</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── CSRF跨站请求伪造</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── 文件包含</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── 命令注入</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 配置层面攻击</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── 信息泄露</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── 权限提升</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── 配置错误利用</span></span>
<span class="line"><span class="__shiki_wvjl67">└── 基础设施攻击</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── SSL/TLS攻击</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── DNS劫持</span></span>
<span class="line"><span class="__shiki_wvjl67">    └── 中间人攻击</span></span></code></pre></div><h3 id="_1-2-安全加固原则" tabindex="-1">1.2 安全加固原则 <a class="header-anchor" href="#_1-2-安全加固原则" aria-label="Permalink to &quot;1.2 安全加固原则&quot;">​</a></h3><ol><li><strong>最小权限原则</strong>：只授予必要的权限</li><li><strong>深度防御</strong>：多层安全防护</li><li><strong>默认拒绝</strong>：明确允许的才放行</li><li><strong>持续监控</strong>：实时检测和响应</li><li><strong>及时更新</strong>：保持系统和软件最新</li></ol><h2 id="第二部分-基础安全配置" tabindex="-1">第二部分：基础安全配置 <a class="header-anchor" href="#第二部分-基础安全配置" aria-label="Permalink to &quot;第二部分：基础安全配置&quot;">​</a></h2><h3 id="_2-1-基础安全加固" tabindex="-1">2.1 基础安全加固 <a class="header-anchor" href="#_2-1-基础安全加固" aria-label="Permalink to &quot;2.1 基础安全加固&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># nginx.conf - 基础安全配置</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 运行用户和组（非root）</span></span>
<span class="line"><span class="__shiki_1itgoe">user </span><span class="__shiki_140thh">nginx nginx;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 隐藏Nginx版本号</span></span>
<span class="line"><span class="__shiki_1itgoe">server_tokens </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 移除不需要的HTTP头</span></span>
<span class="line"><span class="__shiki_1itgoe">more_clear_headers</span><span class="__shiki_mdbnqw"> &quot;X-Powered-By&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">more_clear_headers</span><span class="__shiki_mdbnqw"> &quot;Server&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 限制工作进程权限</span></span>
<span class="line"><span class="__shiki_1itgoe">worker_processes </span><span class="__shiki_140thh">auto;</span></span>
<span class="line"><span class="__shiki_1itgoe">worker_rlimit_nofile </span><span class="__shiki_dzsirb">65535</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">events</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    worker_connections </span><span class="__shiki_dzsirb">2048</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    use </span><span class="__shiki_dzsirb">epoll</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    multi_accept </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 禁止无效主机名访问</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        listen </span><span class="__shiki_dzsirb">80</span><span class="__shiki_dzsirb"> default_server</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        listen </span><span class="__shiki_140thh">[::]:80 </span><span class="__shiki_dzsirb">default_server</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        server_name </span><span class="__shiki_140thh">_;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 444</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 444是Nginx特有的无响应状态码</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 限制请求方法</span></span>
<span class="line"><span class="__shiki_1itgoe">    map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">request_method</span><span class="__shiki_140thh"> $limit_method {</span></span>
<span class="line"><span class="__shiki_dzsirb">        default</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        GET     </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        POST    </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        HEAD    </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        OPTIONS </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 限制HTTP版本</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> ($server_protocol </span><span class="__shiki_1itgoe">!~* </span><span class="__shiki_mdbnqw">&quot;HTTP/1.1|HTTP/2.0&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 505</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 禁用TRACE方法</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> ($request_method </span><span class="__shiki_1itgoe">= </span><span class="__shiki_mdbnqw">&quot;TRACE&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 405</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 禁用TRACK方法</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> ($request_method </span><span class="__shiki_1itgoe">= </span><span class="__shiki_mdbnqw">&quot;TRACK&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 405</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-2-文件权限与目录结构" tabindex="-1">2.2 文件权限与目录结构 <a class="header-anchor" href="#_2-2-文件权限与目录结构" aria-label="Permalink to &quot;2.2 文件权限与目录结构&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 创建安全的目录结构</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> mkdir</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> /etc/nginx/{sites-available,sites-enabled,ssl,conf.d}</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> mkdir</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> /var/log/nginx/secure</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> mkdir</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> /var/www/html</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置正确的文件权限</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> chown</span><span class="__shiki_dzsirb"> -R</span><span class="__shiki_mdbnqw"> root:root</span><span class="__shiki_mdbnqw"> /etc/nginx</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> chmod</span><span class="__shiki_dzsirb"> -R</span><span class="__shiki_dzsirb"> 644</span><span class="__shiki_mdbnqw"> /etc/nginx</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> chmod</span><span class="__shiki_dzsirb"> 755</span><span class="__shiki_mdbnqw"> /etc/nginx</span><span class="__shiki_mdbnqw"> /etc/nginx/sites-available</span><span class="__shiki_mdbnqw"> /etc/nginx/sites-enabled</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Nginx运行用户和组</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> useradd</span><span class="__shiki_dzsirb"> -r</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_mdbnqw"> /sbin/nologin</span><span class="__shiki_mdbnqw"> nginx</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> chown</span><span class="__shiki_dzsirb"> -R</span><span class="__shiki_mdbnqw"> nginx:nginx</span><span class="__shiki_mdbnqw"> /var/log/nginx</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> chown</span><span class="__shiki_dzsirb"> -R</span><span class="__shiki_mdbnqw"> nginx:nginx</span><span class="__shiki_mdbnqw"> /var/cache/nginx</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 网站文件权限</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> chown</span><span class="__shiki_dzsirb"> -R</span><span class="__shiki_mdbnqw"> nginx:nginx</span><span class="__shiki_mdbnqw"> /var/www/html</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> chmod</span><span class="__shiki_dzsirb"> -R</span><span class="__shiki_dzsirb"> 755</span><span class="__shiki_mdbnqw"> /var/www/html</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> chmod</span><span class="__shiki_dzsirb"> -R</span><span class="__shiki_dzsirb"> 644</span><span class="__shiki_mdbnqw"> /var/www/html/</span><span class="__shiki_dzsirb">*</span><span class="__shiki_mdbnqw">.html</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 配置只读挂载（可选）</span></span>
<span class="line"><span class="__shiki_21nrsd"># 在/etc/fstab中添加：</span></span>
<span class="line"><span class="__shiki_21nrsd"># /etc/nginx /etc/nginx ext4 defaults,ro 0 0</span></span>
<span class="line"><span class="__shiki_21nrsd"># /var/www/html /var/www/html ext4 defaults,ro 0 0</span></span></code></pre></div><h2 id="第三部分-访问控制与认证" tabindex="-1">第三部分：访问控制与认证 <a class="header-anchor" href="#第三部分-访问控制与认证" aria-label="Permalink to &quot;第三部分：访问控制与认证&quot;">​</a></h2><h3 id="_3-1-ip黑白名单控制" tabindex="-1">3.1 IP黑白名单控制 <a class="header-anchor" href="#_3-1-ip黑白名单控制" aria-label="Permalink to &quot;3.1 IP黑白名单控制&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># IP访问控制配置</span></span>
<span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 定义IP黑白名单</span></span>
<span class="line"><span class="__shiki_1itgoe">    geo </span><span class="__shiki_140thh">$whitelist {</span></span>
<span class="line"><span class="__shiki_dzsirb">        default</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 允许的IP段</span></span>
<span class="line"><span class="__shiki_140thh">        192.168.1.0/</span><span class="__shiki_1itgoe">24</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        10.0.0.0/</span><span class="__shiki_1itgoe">8</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        127.0.0.</span><span class="__shiki_1itgoe">1</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 添加更多允许的IP...</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    geo </span><span class="__shiki_140thh">$blacklist {</span></span>
<span class="line"><span class="__shiki_dzsirb">        default</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 拒绝的IP</span></span>
<span class="line"><span class="__shiki_140thh">        1.2.3.</span><span class="__shiki_1itgoe">4</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        5.6.7.</span><span class="__shiki_1itgoe">8</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 动态黑名单（通过Lua或共享内存更新）</span></span>
<span class="line"><span class="__shiki_1itgoe">        include </span><span class="__shiki_140thh">/etc/nginx/conf.d/blacklist.conf;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">blacklist</span><span class="__shiki_140thh"> $block_access {</span></span>
<span class="line"><span class="__shiki_dzsirb">        0</span><span class="__shiki_mdbnqw"> &quot;&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">        1</span><span class="__shiki_mdbnqw"> &quot;Blocked&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 速率限制区域</span></span>
<span class="line"><span class="__shiki_1itgoe">    limit_req_zone </span><span class="__shiki_140thh">$binary_remote_addr zone=global:10m rate=10r/s;</span></span>
<span class="line"><span class="__shiki_1itgoe">    limit_req_zone </span><span class="__shiki_140thh">$binary_remote_addr zone=auth:10m rate=3r/m;</span></span>
<span class="line"><span class="__shiki_1itgoe">    limit_req_zone </span><span class="__shiki_140thh">$binary_remote_addr zone=api:10m rate=100r/s;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 连接限制区域</span></span>
<span class="line"><span class="__shiki_1itgoe">    limit_conn_zone </span><span class="__shiki_140thh">$binary_remote_addr zone=addr:10m;</span></span>
<span class="line"><span class="__shiki_1itgoe">    limit_conn_zone </span><span class="__shiki_140thh">$server_name zone=perserver:10m;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 基础访问控制</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 检查黑名单</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($block_access </span><span class="__shiki_1itgoe">= </span><span class="__shiki_mdbnqw">&quot;Blocked&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> 403</span><span class="__shiki_mdbnqw"> &quot;Access Denied&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 检查白名单（如果启用）</span></span>
<span class="line"><span class="__shiki_21nrsd">            # if ($whitelist = 0) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            #     return 403 &quot;Access Denied&quot;;</span></span>
<span class="line"><span class="__shiki_21nrsd">            # }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 全局速率限制</span></span>
<span class="line"><span class="__shiki_1itgoe">            limit_req </span><span class="__shiki_140thh">zone=global burst=20 nodelay;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 连接限制</span></span>
<span class="line"><span class="__shiki_1itgoe">            limit_conn </span><span class="__shiki_140thh">addr </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            limit_conn </span><span class="__shiki_140thh">perserver </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 限制请求大小</span></span>
<span class="line"><span class="__shiki_1itgoe">            client_max_body_size </span><span class="__shiki_dzsirb">10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 限制缓冲区大小</span></span>
<span class="line"><span class="__shiki_1itgoe">            client_body_buffer_size </span><span class="__shiki_dzsirb">128k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            client_header_buffer_size </span><span class="__shiki_dzsirb">4k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            large_client_header_buffers </span><span class="__shiki_dzsirb">8</span><span class="__shiki_dzsirb"> 16k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 管理后台访问控制</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /admin/ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 双重认证：IP限制+基础认证</span></span>
<span class="line"><span class="__shiki_1itgoe">            satisfy </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 必须同时满足</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # IP白名单</span></span>
<span class="line"><span class="__shiki_1itgoe">            allow </span><span class="__shiki_140thh">192.168.1.0/24;</span></span>
<span class="line"><span class="__shiki_1itgoe">            allow </span><span class="__shiki_140thh">10.0.0.0/8;</span></span>
<span class="line"><span class="__shiki_1itgoe">            deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 基础认证</span></span>
<span class="line"><span class="__shiki_1itgoe">            auth_basic </span><span class="__shiki_mdbnqw">&quot;Restricted Area&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            auth_basic_user_file </span><span class="__shiki_140thh">/etc/nginx/.htpasswd;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 严格的速率限制</span></span>
<span class="line"><span class="__shiki_1itgoe">            limit_req </span><span class="__shiki_140thh">zone=auth burst=5 nodelay;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 添加额外的安全头</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">X-Content-Type-Options </span><span class="__shiki_mdbnqw">&quot;nosniff&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">X-Frame-Options </span><span class="__shiki_mdbnqw">&quot;DENY&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">X-XSS-Protection </span><span class="__shiki_mdbnqw">&quot;1; mode=block&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # API访问控制</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /api/ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # API密钥认证</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($http_x_api_key </span><span class="__shiki_1itgoe">!= </span><span class="__shiki_mdbnqw">&quot;your-secret-api-key&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> 401</span><span class="__shiki_mdbnqw"> &quot;Invalid API Key&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # API速率限制</span></span>
<span class="line"><span class="__shiki_1itgoe">            limit_req </span><span class="__shiki_140thh">zone=api burst=50 nodelay;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 限制请求方法</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($request_method </span><span class="__shiki_1itgoe">!~ </span><span class="__shiki_21q97f">^(GET|POST|PUT|DELETE)$</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> 405</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 验证内容类型</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($content_type </span><span class="__shiki_1itgoe">!~ </span><span class="__shiki_21q97f">^(application/json|application/x-www-form-urlencoded)$</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> 415</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 登录页面特殊保护</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /login </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 防止暴力破解</span></span>
<span class="line"><span class="__shiki_1itgoe">            limit_req </span><span class="__shiki_140thh">zone=auth burst=3 nodelay;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 防止凭证填充</span></span>
<span class="line"><span class="__shiki_1itgoe">            limit_req </span><span class="__shiki_140thh">zone=global burst=10;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 添加CSRF令牌验证</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 需要应用程序支持</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 文件上传保护</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /upload </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 限制文件类型</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($content_type </span><span class="__shiki_1itgoe">!~ </span><span class="__shiki_21q97f">^(multipart/form-data|application/octet-stream)$</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> 415</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 限制文件大小</span></span>
<span class="line"><span class="__shiki_1itgoe">            client_max_body_size </span><span class="__shiki_dzsirb">50m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 扫描恶意文件</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 可以集成ClamAV等杀毒软件</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-高级访问控制策略" tabindex="-1">3.2 高级访问控制策略 <a class="header-anchor" href="#_3-2-高级访问控制策略" aria-label="Permalink to &quot;3.2 高级访问控制策略&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基于地理位置访问控制</span></span>
<span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 加载GeoIP数据库</span></span>
<span class="line"><span class="__shiki_1itgoe">    geoip_country </span><span class="__shiki_140thh">/usr/share/GeoIP/GeoIP.dat;</span></span>
<span class="line"><span class="__shiki_1itgoe">    geoip_city </span><span class="__shiki_140thh">/usr/share/GeoIP/GeoLiteCity.dat;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 国家代码映射</span></span>
<span class="line"><span class="__shiki_1itgoe">    map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">geoip_country_code</span><span class="__shiki_140thh"> $allowed_country {</span></span>
<span class="line"><span class="__shiki_dzsirb">        default</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        US </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 美国</span></span>
<span class="line"><span class="__shiki_140thh">        CA </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 加拿大</span></span>
<span class="line"><span class="__shiki_140thh">        GB </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 英国</span></span>
<span class="line"><span class="__shiki_140thh">        AU </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 澳大利亚</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 添加更多允许的国家...</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">geoip_country_code</span><span class="__shiki_140thh"> $blocked_country {</span></span>
<span class="line"><span class="__shiki_dzsirb">        default</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        CN </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 中国（示例）</span></span>
<span class="line"><span class="__shiki_140thh">        RU </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 俄罗斯</span></span>
<span class="line"><span class="__shiki_140thh">        KP </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 朝鲜</span></span>
<span class="line"><span class="__shiki_140thh">        IR </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 伊朗</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 添加更多阻止的国家...</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 基于ASN的限制</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 需要第三方模块或自定义实现</span></span>
<span class="line"><span class="__shiki_21nrsd">    # map $geoip_org $allowed_asn {</span></span>
<span class="line"><span class="__shiki_21nrsd">    #     default 0;</span></span>
<span class="line"><span class="__shiki_21nrsd">    #     &quot;Google LLC&quot; 1;</span></span>
<span class="line"><span class="__shiki_21nrsd">    #     &quot;Amazon.com&quot; 1;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 国家级别过滤</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($blocked_country </span><span class="__shiki_1itgoe">= </span><span class="__shiki_140thh">1) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> 403</span><span class="__shiki_mdbnqw"> &quot;Access from your country is not allowed&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 或只允许特定国家</span></span>
<span class="line"><span class="__shiki_21nrsd">            # if ($allowed_country = 0) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            #     return 403 &quot;Access from your country is not allowed&quot;;</span></span>
<span class="line"><span class="__shiki_21nrsd">            # }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # ASN级别过滤</span></span>
<span class="line"><span class="__shiki_21nrsd">            # if ($allowed_asn = 0) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            #     return 403 &quot;Access from your network is not allowed&quot;;</span></span>
<span class="line"><span class="__shiki_21nrsd">            # }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 动态黑名单管理端点（受保护）</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /security/blacklist </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 仅允许内部网络访问</span></span>
<span class="line"><span class="__shiki_1itgoe">            allow </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            allow </span><span class="__shiki_140thh">192.168.1.0/24;</span></span>
<span class="line"><span class="__shiki_1itgoe">            deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 认证</span></span>
<span class="line"><span class="__shiki_1itgoe">            auth_basic </span><span class="__shiki_mdbnqw">&quot;Security Admin&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            auth_basic_user_file </span><span class="__shiki_140thh">/etc/nginx/.htpasswd_admin;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_1t8gfj">header</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&quot;Content-Type&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;application/json&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> args </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">req</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">get_uri_args</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> action </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> args.</span><span class="__shiki_1t8gfj">action</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> ip </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> args.</span><span class="__shiki_1t8gfj">ip</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> action </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;add&quot; </span><span class="__shiki_1itgoe">and</span><span class="__shiki_140thh"> ip </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_21nrsd">                    -- 添加到黑名单</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> blacklist </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">blacklist</span></span>
<span class="line"><span class="__shiki_1t8gfj">                    blacklist</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(ip, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3600</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">-- 1小时</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;{&quot;status&quot;: &quot;added&quot;, &quot;ip&quot;: &quot;&#39; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> ip </span><span class="__shiki_1itgoe">..</span><span class="__shiki_mdbnqw"> &#39;&quot;}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                elseif</span><span class="__shiki_140thh"> action </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;remove&quot; </span><span class="__shiki_1itgoe">and</span><span class="__shiki_140thh"> ip </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_21nrsd">                    -- 从黑名单移除</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> blacklist </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">blacklist</span></span>
<span class="line"><span class="__shiki_1t8gfj">                    blacklist</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">delete</span><span class="__shiki_140thh">(ip)</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;{&quot;status&quot;: &quot;removed&quot;, &quot;ip&quot;: &quot;&#39; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> ip </span><span class="__shiki_1itgoe">..</span><span class="__shiki_mdbnqw"> &#39;&quot;}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                elseif</span><span class="__shiki_140thh"> action </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;list&quot; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_21nrsd">                    -- 列出黑名单</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> blacklist </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">blacklist</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> keys </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> blacklist</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get_keys</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_dzsirb">encode</span><span class="__shiki_140thh">(keys))</span></span>
<span class="line"><span class="__shiki_1itgoe">                else</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;{&quot;error&quot;: &quot;invalid action&quot;}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第四部分-https与ssl-tls安全" tabindex="-1">第四部分：HTTPS与SSL/TLS安全 <a class="header-anchor" href="#第四部分-https与ssl-tls安全" aria-label="Permalink to &quot;第四部分：HTTPS与SSL/TLS安全&quot;">​</a></h2><h3 id="_4-1-ssl-tls最佳实践配置" tabindex="-1">4.1 SSL/TLS最佳实践配置 <a class="header-anchor" href="#_4-1-ssl-tls最佳实践配置" aria-label="Permalink to &quot;4.1 SSL/TLS最佳实践配置&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># SSL/TLS安全配置</span></span>
<span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSL优化配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_session_cache </span><span class="__shiki_140thh">shared:SSL:50m;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_session_timeout </span><span class="__shiki_dzsirb">1d</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_session_tickets </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 现代SSL协议和加密套件</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_protocols </span><span class="__shiki_140thh">TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_prefer_server_ciphers </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 安全加密套件（TLS 1.2）</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_ciphers </span><span class="__shiki_mdbnqw">&#39;ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # TLS 1.3加密套件</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_conf_command </span><span class="__shiki_140thh">Ciphersuites TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 椭圆曲线优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_ecdh_curve </span><span class="__shiki_140thh">X25519:prime256v1:secp384r1;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # DH参数（2048位以上）</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_dhparam </span><span class="__shiki_140thh">/etc/nginx/ssl/dhparam.pem;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 证书配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_certificate </span><span class="__shiki_140thh">/etc/nginx/ssl/fullchain.pem;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_certificate_key </span><span class="__shiki_140thh">/etc/nginx/ssl/privkey.pem;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # OCSP装订</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_stapling </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_stapling_verify </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_trusted_certificate </span><span class="__shiki_140thh">/etc/nginx/ssl/chain.pem;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 安全重协商</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_renegotiation_limit</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSL缓冲区优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_buffer_size </span><span class="__shiki_dzsirb">16k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用HTTP/2</span></span>
<span class="line"><span class="__shiki_1itgoe">    http2 </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    http2_max_field_size </span><span class="__shiki_dzsirb">16k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    http2_max_concurrent_streams </span><span class="__shiki_dzsirb">128</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # HSTS头（强制HTTPS）</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">Strict-Transport-Security </span><span class="__shiki_mdbnqw">&quot;max-age=31536000; includeSubDomains; preload&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 证书透明度</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">Expect-CT </span><span class="__shiki_mdbnqw">&quot;max-age=86400, enforce&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        listen </span><span class="__shiki_dzsirb">443</span><span class="__shiki_140thh"> ssl http2;</span></span>
<span class="line"><span class="__shiki_1itgoe">        listen </span><span class="__shiki_140thh">[::]:443 ssl http2;</span></span>
<span class="line"><span class="__shiki_1itgoe">        server_name </span><span class="__shiki_140thh">example.com;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 仅允许安全连接</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($scheme </span><span class="__shiki_1itgoe">!= </span><span class="__shiki_mdbnqw">&quot;https&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> 301</span><span class="__shiki_140thh"> https://$server_name$request_uri;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 禁用TLS 1.0和1.1</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($ssl_protocol </span><span class="__shiki_1itgoe">= </span><span class="__shiki_mdbnqw">&quot;TLSv1&quot;</span><span class="__shiki_140thh"> || $ssl_protocol </span><span class="__shiki_1itgoe">= </span><span class="__shiki_mdbnqw">&quot;TLSv1.1&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> 403</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 验证客户端证书（双向SSL）</span></span>
<span class="line"><span class="__shiki_21nrsd">        # ssl_verify_client on;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # ssl_client_certificate /etc/nginx/ssl/ca.crt;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # ssl_verify_depth 2;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 添加SSL安全头</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Frame-Options </span><span class="__shiki_mdbnqw">&quot;SAMEORIGIN&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Content-Type-Options </span><span class="__shiki_mdbnqw">&quot;nosniff&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-XSS-Protection </span><span class="__shiki_mdbnqw">&quot;1; mode=block&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Referrer-Policy </span><span class="__shiki_mdbnqw">&quot;strict-origin-when-cross-origin&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Content-Security-Policy </span><span class="__shiki_mdbnqw">&quot;default-src &#39;self&#39;; script-src &#39;self&#39; &#39;unsafe-inline&#39; &#39;unsafe-eval&#39; https://cdn.example.com; style-src &#39;self&#39; &#39;unsafe-inline&#39; https://fonts.googleapis.com; img-src &#39;self&#39; data: https:; font-src &#39;self&#39; https://fonts.gstatic.com; connect-src &#39;self&#39;; media-src &#39;none&#39;; object-src &#39;none&#39;; child-src &#39;none&#39;; frame-ancestors &#39;none&#39;; form-action &#39;self&#39;; upgrade-insecure-requests;&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # HPKP（HTTP公钥固定）- 谨慎使用</span></span>
<span class="line"><span class="__shiki_21nrsd">        # add_header Public-Key-Pins &#39;pin-sha256=&quot;base64+primary==&quot;; pin-sha256=&quot;base64+backup==&quot;; max-age=5184000; includeSubDomains&#39; always;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 强制所有子域名使用HTTPS</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        listen </span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        server_name </span><span class="__shiki_140thh">*.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 301</span><span class="__shiki_140thh"> https://$host$request_uri;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 预加载HSTS</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        listen </span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        server_name </span><span class="__shiki_140thh">example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Strict-Transport-Security </span><span class="__shiki_mdbnqw">&quot;max-age=31536000; includeSubDomains; preload&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 301</span><span class="__shiki_140thh"> https://$server_name$request_uri;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-ssl证书自动化与监控" tabindex="-1">4.2 SSL证书自动化与监控 <a class="header-anchor" href="#_4-2-ssl证书自动化与监控" aria-label="Permalink to &quot;4.2 SSL证书自动化与监控&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># SSL证书自动化配置</span></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # Let&#39;s Encrypt ACME挑战</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> ^~</span><span class="__shiki_21q97f"> /.well-known/acme-challenge/ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        alias </span><span class="__shiki_140thh">/var/www/letsencrypt/.well-known/acme-challenge/;</span></span>
<span class="line"><span class="__shiki_1itgoe">        try_files </span><span class="__shiki_140thh">$uri </span><span class="__shiki_dzsirb">=404</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 安全配置</span></span>
<span class="line"><span class="__shiki_1itgoe">        allow </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Content-Type </span><span class="__shiki_mdbnqw">&quot;text/plain&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSL证书过期监控端点</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /ssl-status </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        internal</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 仅内部访问</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> ssl </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;ngx.ssl&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> pem </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.openssl.x509&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 获取当前证书</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> cert, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ssl.</span><span class="__shiki_dzsirb">get_der_certificate</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> cert </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Error: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 解析证书</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> x509, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pem.</span><span class="__shiki_dzsirb">new</span><span class="__shiki_140thh">(cert)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> x509 </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Error: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 获取过期时间</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> not_after </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> x509</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get_not_after</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> now </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> os.time</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> days_left </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> math.floor</span><span class="__shiki_140thh">((not_after </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> now) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 86400</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            ngx.</span><span class="__shiki_1t8gfj">header</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&quot;Content-Type&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;application/json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">string.format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;{&quot;not_after&quot;: %d, &quot;days_left&quot;: %d}&#39;</span><span class="__shiki_140thh">, not_after, days_left))</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># SSL证书自动化续期脚本</span></span>
<span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># /usr/local/bin/renew-ssl.sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">CERTBOT=&quot;/</span><span class="__shiki_dzsirb">usr/bin</span><span class="__shiki_140thh">/certbot</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">NGINX=&quot;</span><span class="__shiki_140thh">/usr/sbin/nginx</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">DOMAINS=&quot;</span><span class="__shiki_140thh">example.com www.example.com</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">EMAIL=&quot;</span><span class="__shiki_140thh">admin@example.com</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 续期证书</span></span>
<span class="line"><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">CERTBOT</span><span class="__shiki_mdbnqw"> renew --quiet --pre-hook &quot;</span><span class="__shiki_140thh">$NGINX -t &amp;&amp; systemctl stop nginx</span><span class="__shiki_mdbnqw">&quot; \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">               --post-hook &quot;</span><span class="__shiki_140thh">systemctl start nginx</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 检查证书状态</span></span>
<span class="line"><span class="__shiki_mdbnqw">for domain in $</span><span class="__shiki_140thh">DOMAINS</span><span class="__shiki_mdbnqw">; do</span></span>
<span class="line"><span class="__shiki_mdbnqw">    CERT_FILE=&quot;</span><span class="__shiki_140thh">/etc/letsencrypt/live/$domain/fullchain.pem</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    KEY_FILE=&quot;</span><span class="__shiki_140thh">/etc/letsencrypt/live/$domain/privkey.pem</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    if [ -f $</span><span class="__shiki_140thh">CERT_FILE</span><span class="__shiki_mdbnqw"> ]; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">        EXPIRY_DATE=$(openssl x509 -enddate -noout -in $</span><span class="__shiki_140thh">CERT_FILE</span><span class="__shiki_mdbnqw"> | cut -d= -f2)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        DAYS_LEFT=$(( ($(date -d &quot;</span><span class="__shiki_140thh">$EXPIRY_DATE</span><span class="__shiki_mdbnqw">&quot; +%s) - $(date +%s)) / 86400 ))</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        if [ $</span><span class="__shiki_140thh">DAYS_LEFT</span><span class="__shiki_mdbnqw"> -lt 30 ]; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">            echo &quot;</span><span class="__shiki_140thh">警告: $domain 证书将在 $DAYS_LEFT 天后过期</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            # 发送告警邮件</span></span>
<span class="line"><span class="__shiki_mdbnqw">            echo &quot;</span><span class="__shiki_140thh">证书 $domain 即将过期</span><span class="__shiki_mdbnqw">&quot; | mail -s &quot;</span><span class="__shiki_140thh">证书过期警告</span><span class="__shiki_mdbnqw">&quot; $</span><span class="__shiki_140thh">EMAIL</span></span>
<span class="line"><span class="__shiki_mdbnqw">        fi</span></span>
<span class="line"><span class="__shiki_mdbnqw">    fi</span></span>
<span class="line"><span class="__shiki_mdbnqw">done</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 设置cronjob自动续期</span></span>
<span class="line"><span class="__shiki_mdbnqw"># 0 0 * * * /usr/local/bin/renew-ssl.sh</span></span></code></pre></div><h2 id="第五部分-web应用防火墙-waf" tabindex="-1">第五部分：Web应用防火墙（WAF） <a class="header-anchor" href="#第五部分-web应用防火墙-waf" aria-label="Permalink to &quot;第五部分：Web应用防火墙（WAF）&quot;">​</a></h2><h3 id="_5-1-modsecurity-waf集成" tabindex="-1">5.1 ModSecurity WAF集成 <a class="header-anchor" href="#_5-1-modsecurity-waf集成" aria-label="Permalink to &quot;5.1 ModSecurity WAF集成&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># ModSecurity配置</span></span>
<span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 加载ModSecurity模块</span></span>
<span class="line"><span class="__shiki_1itgoe">    modsecurity</span><span class="__shiki_dzsirb"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    modsecurity_rules_file</span><span class="__shiki_140thh"> /etc/nginx/modsecurity/main.conf;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # ModSecurity规则配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    modsecurity_rules</span><span class="__shiki_mdbnqw"> &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        # 基础规则</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SecRuleEngine On</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SecRequestBodyAccess On</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SecResponseBodyAccess On</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SecResponseBodyMimeType text/plain text/html text/xml</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SecResponseBodyLimit 524288</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        # 数据目录</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SecDataDir /tmp/modsecurity</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        # 调试日志（生产环境关闭）</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SecDebugLog /var/log/nginx/modsec_debug.log</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SecDebugLogLevel 0</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        # 审计日志</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SecAuditEngine RelevantOnly</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SecAuditLogRelevantStatus &quot;^(?:5|4(?!04))&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SecAuditLogParts ABEFHIJZ</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SecAuditLogType Serial</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SecAuditLog /var/log/nginx/modsec_audit.log</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        # 规则文件</span></span>
<span class="line"><span class="__shiki_mdbnqw">        Include /etc/nginx/modsecurity/crs-setup.conf</span></span>
<span class="line"><span class="__shiki_mdbnqw">        Include /etc/nginx/modsecurity/rules/*.conf</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 自定义ModSecurity规则</span></span>
<span class="line"><span class="__shiki_1itgoe">            modsecurity_rules</span><span class="__shiki_mdbnqw"> &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                # 防止SQL注入</span></span>
<span class="line"><span class="__shiki_mdbnqw">                SecRule ARGS &quot;@detectSQLi&quot; \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;id:1001,phase:2,deny,status:403,msg:</span><span class="__shiki_dzsirb">\\&#39;</span><span class="__shiki_mdbnqw">SQL Injection Attack</span><span class="__shiki_dzsirb">\\&#39;</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                # 防止XSS攻击</span></span>
<span class="line"><span class="__shiki_mdbnqw">                SecRule ARGS &quot;@detectXSS&quot; \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;id:1002,phase:2,deny,status:403,msg:</span><span class="__shiki_dzsirb">\\&#39;</span><span class="__shiki_mdbnqw">XSS Attack</span><span class="__shiki_dzsirb">\\&#39;</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                # 限制请求大小</span></span>
<span class="line"><span class="__shiki_mdbnqw">                SecRule REQUEST_BODY &quot;@gt 1000000&quot; \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;id:1003,phase:1,deny,status:413,msg:</span><span class="__shiki_dzsirb">\\&#39;</span><span class="__shiki_mdbnqw">Request body too large</span><span class="__shiki_dzsirb">\\&#39;</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                # 检测恶意User-Agent</span></span>
<span class="line"><span class="__shiki_mdbnqw">                SecRule REQUEST_HEADERS:User-Agent &quot;@pmFromFile malicious-user-agents.txt&quot; \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;id:1004,phase:1,deny,status:403,msg:</span><span class="__shiki_dzsirb">\\&#39;</span><span class="__shiki_mdbnqw">Malicious User-Agent</span><span class="__shiki_dzsirb">\\&#39;</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                # 防止路径遍历</span></span>
<span class="line"><span class="__shiki_mdbnqw">                SecRule REQUEST_FILENAME &quot;@contains ../&quot; \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;id:1005,phase:1,deny,status:403,msg:</span><span class="__shiki_dzsirb">\\&#39;</span><span class="__shiki_mdbnqw">Path Traversal Attack</span><span class="__shiki_dzsirb">\\&#39;</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                # 限制HTTP方法</span></span>
<span class="line"><span class="__shiki_mdbnqw">                SecRule REQUEST_METHOD &quot;!@pm GET HEAD POST OPTIONS&quot; \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;id:1006,phase:1,deny,status:405,msg:</span><span class="__shiki_dzsirb">\\&#39;</span><span class="__shiki_mdbnqw">Method not allowed</span><span class="__shiki_dzsirb">\\&#39;</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                # 防止扫描器</span></span>
<span class="line"><span class="__shiki_mdbnqw">                SecRule REQUEST_URI &quot;@contains /admin/&quot; \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;id:1007,phase:1,block,msg:</span><span class="__shiki_dzsirb">\\&#39;</span><span class="__shiki_mdbnqw">Admin directory access attempt</span><span class="__shiki_dzsirb">\\&#39;</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                # 防止敏感信息泄露</span></span>
<span class="line"><span class="__shiki_mdbnqw">                SecRule RESPONSE_BODY &quot;@contains password=&quot; \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;id:1008,phase:4,deny,status:403,msg:</span><span class="__shiki_dzsirb">\\&#39;</span><span class="__shiki_mdbnqw">Sensitive information leakage</span><span class="__shiki_dzsirb">\\&#39;</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 排除静态文件</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1itgoe"> ~*</span><span class="__shiki_21q97f"> \\.(jpg|jpeg|png|gif|ico|css|js)$ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            modsecurity</span><span class="__shiki_dzsirb"> off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # WAF管理端点</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /waf-status </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 严格访问控制</span></span>
<span class="line"><span class="__shiki_1itgoe">            allow </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            allow </span><span class="__shiki_140thh">192.168.1.0/24;</span></span>
<span class="line"><span class="__shiki_1itgoe">            deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            auth_basic </span><span class="__shiki_mdbnqw">&quot;WAF Admin&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            auth_basic_user_file </span><span class="__shiki_140thh">/etc/nginx/.htpasswd_waf;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_1t8gfj">header</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&quot;Content-Type&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;application/json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 读取ModSecurity日志</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> log_file </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;/var/log/nginx/modsec_audit.log&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> f </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> io.open</span><span class="__shiki_140thh">(log_file, </span><span class="__shiki_mdbnqw">&quot;r&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> f </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                        attacks_blocked </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                        last_attack </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                        top_attack_types </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">                    for</span><span class="__shiki_140thh"> line in f:lines() do</span></span>
<span class="line"><span class="__shiki_1itgoe">                        if</span><span class="__shiki_140thh"> line:match(</span><span class="__shiki_mdbnqw">&quot;ModSecurity.*denied&quot;</span><span class="__shiki_140thh">) then</span></span>
<span class="line"><span class="__shiki_140thh">                            stats.</span><span class="__shiki_1itgoe">attacks_blocked</span><span class="__shiki_140thh"> = stats.attacks_blocked + 1</span></span>
<span class="line"><span class="__shiki_140thh">                            stats.</span><span class="__shiki_1itgoe">last_attack</span><span class="__shiki_140thh"> = os.date(</span><span class="__shiki_mdbnqw">&quot;%Y-%m-%d %H:%M:%S&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                        end</span></span>
<span class="line"><span class="__shiki_1itgoe">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    f:close()</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.say(require(&quot;cjson&quot;).encode(stats))</span></span>
<span class="line"><span class="__shiki_1itgoe">                else</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.say(&#39;{&quot;error&quot;: &quot;</span><span class="__shiki_1itgoe">log</span><span class="__shiki_140thh"> file not found</span><span class="__shiki_mdbnqw">&quot;}&#39;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                end</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">}</span></span></code></pre></div><h3 id="_5-2-naxsi-waf配置" tabindex="-1">5.2 NAXSI WAF配置 <a class="header-anchor" href="#_5-2-naxsi-waf配置" aria-label="Permalink to &quot;5.2 NAXSI WAF配置&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># NAXSI配置（轻量级WAF）</span></span>
<span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 加载NAXSI核心规则</span></span>
<span class="line"><span class="__shiki_1itgoe">    include </span><span class="__shiki_140thh">/etc/nginx/naxsi_core.rules;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 学习模式（生产环境关闭）</span></span>
<span class="line"><span class="__shiki_21nrsd">    # LearningMode;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # SecRulesEnabled;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # DeniedUrl &quot;/RequestDenied&quot;;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 检查规则</span></span>
<span class="line"><span class="__shiki_1itgoe">    CheckRule</span><span class="__shiki_mdbnqw"> &quot;$</span><span class="__shiki_140thh">SQL</span><span class="__shiki_mdbnqw"> &gt;= 8&quot;</span><span class="__shiki_140thh"> BLOCK;</span></span>
<span class="line"><span class="__shiki_1itgoe">    CheckRule</span><span class="__shiki_mdbnqw"> &quot;$</span><span class="__shiki_140thh">RFI</span><span class="__shiki_mdbnqw"> &gt;= 8&quot;</span><span class="__shiki_140thh"> BLOCK;</span></span>
<span class="line"><span class="__shiki_1itgoe">    CheckRule</span><span class="__shiki_mdbnqw"> &quot;$</span><span class="__shiki_140thh">TRAVERSAL</span><span class="__shiki_mdbnqw"> &gt;= 4&quot;</span><span class="__shiki_140thh"> BLOCK;</span></span>
<span class="line"><span class="__shiki_1itgoe">    CheckRule</span><span class="__shiki_mdbnqw"> &quot;$</span><span class="__shiki_140thh">EVADE</span><span class="__shiki_mdbnqw"> &gt;= 4&quot;</span><span class="__shiki_140thh"> BLOCK;</span></span>
<span class="line"><span class="__shiki_1itgoe">    CheckRule</span><span class="__shiki_mdbnqw"> &quot;$</span><span class="__shiki_140thh">XSS</span><span class="__shiki_mdbnqw"> &gt;= 8&quot;</span><span class="__shiki_140thh"> BLOCK;</span></span>
<span class="line"><span class="__shiki_1itgoe">    CheckRule</span><span class="__shiki_mdbnqw"> &quot;$</span><span class="__shiki_140thh">UPLOAD</span><span class="__shiki_mdbnqw"> &gt;= 8&quot;</span><span class="__shiki_140thh"> BLOCK;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 启用NAXSI</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 基本规则</span></span>
<span class="line"><span class="__shiki_140thh">            SecRulesEnabled;</span></span>
<span class="line"><span class="__shiki_1itgoe">            DeniedUrl</span><span class="__shiki_mdbnqw"> &quot;/RequestDenied&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 白名单规则</span></span>
<span class="line"><span class="__shiki_1itgoe">            BasicRule</span><span class="__shiki_140thh"> wl:1000 </span><span class="__shiki_mdbnqw">&quot;mz:$</span><span class="__shiki_140thh">ARGS_VAR</span><span class="__shiki_mdbnqw">:name|$</span><span class="__shiki_140thh">BODY_VAR</span><span class="__shiki_mdbnqw">:name&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            BasicRule</span><span class="__shiki_140thh"> wl:1001 </span><span class="__shiki_mdbnqw">&quot;mz:$</span><span class="__shiki_140thh">ARGS_VAR</span><span class="__shiki_mdbnqw">:email|$</span><span class="__shiki_140thh">BODY_VAR</span><span class="__shiki_mdbnqw">:email&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            BasicRule</span><span class="__shiki_140thh"> wl:1002 </span><span class="__shiki_mdbnqw">&quot;mz:$</span><span class="__shiki_140thh">ARGS_VAR</span><span class="__shiki_mdbnqw">:message|$</span><span class="__shiki_140thh">BODY_VAR</span><span class="__shiki_mdbnqw">:message&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            BasicRule</span><span class="__shiki_140thh"> wl:1003 </span><span class="__shiki_mdbnqw">&quot;mz:$</span><span class="__shiki_140thh">URL</span><span class="__shiki_mdbnqw">:/wp-admin/|$</span><span class="__shiki_140thh">ARGS_VAR</span><span class="__shiki_mdbnqw">:action&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 错误处理</span></span>
<span class="line"><span class="__shiki_1itgoe">            error_page </span><span class="__shiki_dzsirb">403</span><span class="__shiki_140thh"> /RequestDenied;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 被阻止请求的处理</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /RequestDenied </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            internal</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> 403</span><span class="__shiki_mdbnqw"> &quot;Access Denied by NAXSI&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # NAXSI状态页面</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /naxsi_status </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            stub_status</span><span class="__shiki_140thh"> on;</span></span>
<span class="line"><span class="__shiki_1itgoe">            allow </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            allow </span><span class="__shiki_140thh">192.168.1.0/24;</span></span>
<span class="line"><span class="__shiki_1itgoe">            deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第六部分-输入验证与过滤" tabindex="-1">第六部分：输入验证与过滤 <a class="header-anchor" href="#第六部分-输入验证与过滤" aria-label="Permalink to &quot;第六部分：输入验证与过滤&quot;">​</a></h2><h3 id="_6-1-请求验证与过滤" tabindex="-1">6.1 请求验证与过滤 <a class="header-anchor" href="#_6-1-请求验证与过滤" aria-label="Permalink to &quot;6.1 请求验证与过滤&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 请求验证配置</span></span>
<span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 定义恶意模式</span></span>
<span class="line"><span class="__shiki_1itgoe">    map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">request_uri</span><span class="__shiki_140thh"> $malicious_uri {</span></span>
<span class="line"><span class="__shiki_dzsirb">        default</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ~*</span><span class="__shiki_mdbnqw"> &quot;(\\.\\./|\\.\\.</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">|%2e%2e%2f|%252e%252e%252f)&quot;</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 路径遍历</span></span>
<span class="line"><span class="__shiki_1itgoe">        ~*</span><span class="__shiki_mdbnqw"> &quot;(&lt;script|javascript:|onload=|onerror=)&quot;</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;     </span><span class="__shiki_21nrsd"># XSS</span></span>
<span class="line"><span class="__shiki_1itgoe">        ~*</span><span class="__shiki_mdbnqw"> &quot;(union.*select|insert.*into|drop.*table)&quot;</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;   </span><span class="__shiki_21nrsd"># SQL注入</span></span>
<span class="line"><span class="__shiki_1itgoe">        ~*</span><span class="__shiki_mdbnqw"> &quot;(eval\\(|system\\(|exec\\(|passthru\\()&quot;</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;        </span><span class="__shiki_21nrsd"># 命令注入</span></span>
<span class="line"><span class="__shiki_1itgoe">        ~*</span><span class="__shiki_mdbnqw"> &quot;(\\.php|\\.asp|\\.jsp|\\.pl)\\?&quot;</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;                 </span><span class="__shiki_21nrsd"># 动态文件攻击</span></span>
<span class="line"><span class="__shiki_1itgoe">        ~*</span><span class="__shiki_mdbnqw"> &quot;(phpinfo|testphp|phpversion)&quot;</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;               </span><span class="__shiki_21nrsd"># 信息泄露</span></span>
<span class="line"><span class="__shiki_1itgoe">        ~*</span><span class="__shiki_mdbnqw"> &quot;(\\.git|\\.svn|\\.env|\\.htaccess)&quot;</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;             </span><span class="__shiki_21nrsd"># 敏感文件</span></span>
<span class="line"><span class="__shiki_1itgoe">        ~*</span><span class="__shiki_mdbnqw"> &quot;(admin|config|backup|dump)&quot;</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;                 </span><span class="__shiki_21nrsd"># 敏感目录</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 定义可疑User-Agent</span></span>
<span class="line"><span class="__shiki_1itgoe">    map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">http_user_agent</span><span class="__shiki_140thh"> $bad_agent {</span></span>
<span class="line"><span class="__shiki_dzsirb">        default</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ~*</span><span class="__shiki_mdbnqw"> &quot;(nmap|nikto|sqlmap|w3af|acunetix)&quot;</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;          </span><span class="__shiki_21nrsd"># 扫描器</span></span>
<span class="line"><span class="__shiki_1itgoe">        ~*</span><span class="__shiki_mdbnqw"> &quot;(curl|wget|libwww-perl|python-urllib)&quot;</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;      </span><span class="__shiki_21nrsd"># 自动化工具</span></span>
<span class="line"><span class="__shiki_1itgoe">        ~*</span><span class="__shiki_mdbnqw"> &quot;(spider|bot|crawler|scanner)&quot;</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;               </span><span class="__shiki_21nrsd"># 爬虫</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;~*</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">?</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">?$&quot;</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;                                      </span><span class="__shiki_21nrsd"># 空User-Agent</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 定义可疑Referer</span></span>
<span class="line"><span class="__shiki_1itgoe">    map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">http_referer</span><span class="__shiki_140thh"> $bad_referer {</span></span>
<span class="line"><span class="__shiki_dzsirb">        default</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ~*</span><span class="__shiki_mdbnqw"> &quot;(evil\\.com|hacker\\.site|malicious\\.domain)&quot;</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd"># 恶意来源</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;~*</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">?</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">?$&quot;</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;                                      </span><span class="__shiki_21nrsd"># 空Referer</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 验证请求</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($malicious_uri) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> 403</span><span class="__shiki_mdbnqw"> &quot;Malicious request detected&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($bad_agent) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                # 记录但不阻止（可选）</span></span>
<span class="line"><span class="__shiki_1itgoe">                access_log </span><span class="__shiki_140thh">/var/log/nginx/bad_agents.log;</span></span>
<span class="line"><span class="__shiki_21nrsd">                # return 403 &quot;Suspicious User-Agent&quot;;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($bad_referer) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> 403</span><span class="__shiki_mdbnqw"> &quot;Invalid Referer&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 验证内容类型</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($content_type </span><span class="__shiki_1itgoe">!~ </span><span class="__shiki_21q97f">^(text/html|application/json|application/x-www-form-urlencoded|multipart/form-data)$</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> 415</span><span class="__shiki_mdbnqw"> &quot;Unsupported Media Type&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 验证Accept头</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($http_accept </span><span class="__shiki_1itgoe">!~* </span><span class="__shiki_mdbnqw">&quot;text/html|application/json&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> 406</span><span class="__shiki_mdbnqw"> &quot;Not Acceptable&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 验证Accept-Encoding</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($http_accept_encoding </span><span class="__shiki_1itgoe">!~* </span><span class="__shiki_mdbnqw">&quot;gzip|deflate|br&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> 406</span><span class="__shiki_mdbnqw"> &quot;Unsupported Encoding&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 验证Accept-Language</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($http_accept_language </span><span class="__shiki_1itgoe">!~* </span><span class="__shiki_mdbnqw">&quot;en|zh&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                # 可选：限制语言</span></span>
<span class="line"><span class="__shiki_21nrsd">                # return 406 &quot;Unsupported Language&quot;;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 验证Origin头（CORS）</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($http_origin </span><span class="__shiki_1itgoe">!~* </span><span class="__shiki_mdbnqw">&quot;(https?://(localhost|127\\.0\\.0\\.1|example\\.com))&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> 403</span><span class="__shiki_mdbnqw"> &quot;Invalid Origin&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 防止Host头攻击</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($http_host </span><span class="__shiki_1itgoe">!= </span><span class="__shiki_mdbnqw">&quot;example.com&quot;</span><span class="__shiki_140thh"> &amp;&amp; $http_host </span><span class="__shiki_1itgoe">!= </span><span class="__shiki_mdbnqw">&quot;www.example.com&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> 400</span><span class="__shiki_mdbnqw"> &quot;Invalid Host header&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 防止请求走私</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($http_transfer_encoding </span><span class="__shiki_1itgoe">~* </span><span class="__shiki_mdbnqw">&quot;chunked&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> 400</span><span class="__shiki_mdbnqw"> &quot;Transfer-Encoding not allowed&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 防止HTTP参数污染</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($args </span><span class="__shiki_1itgoe">~* </span><span class="__shiki_mdbnqw">&quot;(\\w+)=.*&amp;\\1=&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> 400</span><span class="__shiki_mdbnqw"> &quot;Duplicate parameter detected&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 限制特殊字符</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($request_uri </span><span class="__shiki_1itgoe">~* </span><span class="__shiki_mdbnqw">&quot;[&lt;&gt;</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">&#39;\`|</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">{}]&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> 400</span><span class="__shiki_mdbnqw"> &quot;Invalid characters in request&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 文件上传验证</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /upload </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 验证文件类型</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($content_type </span><span class="__shiki_1itgoe">!~* </span><span class="__shiki_mdbnqw">&quot;multipart/form-data&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> 415</span><span class="__shiki_mdbnqw"> &quot;Invalid content type for upload&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 验证文件扩展名</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($request_filename </span><span class="__shiki_1itgoe">~* </span><span class="__shiki_mdbnqw">&quot;\\.(php|php3|php4|php5|phtml|pl|py|jsp|asp|sh|cgi)$&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> 403</span><span class="__shiki_mdbnqw"> &quot;Invalid file type&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 限制文件大小</span></span>
<span class="line"><span class="__shiki_1itgoe">            client_max_body_size </span><span class="__shiki_dzsirb">10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 扫描上传的文件（集成ClamAV）</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 可以通过Lua脚本实现</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 存储到安全位置</span></span>
<span class="line"><span class="__shiki_1itgoe">            client_body_temp_path </span><span class="__shiki_140thh">/var/nginx/upload_temp;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 添加安全头</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">X-Content-Type-Options </span><span class="__shiki_mdbnqw">&quot;nosniff&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">X-Frame-Options </span><span class="__shiki_mdbnqw">&quot;DENY&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 动态内容安全</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1itgoe"> ~</span><span class="__shiki_21q97f"> \\.php$ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # PHP安全配置</span></span>
<span class="line"><span class="__shiki_1itgoe">            fastcgi_param </span><span class="__shiki_140thh">PHP_ADMIN_VALUE </span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                open_basedir=/var/www/html:/tmp</span></span>
<span class="line"><span class="__shiki_mdbnqw">                disable_functions=exec,passthru,shell_exec,system,proc_open,popen,curl_exec,curl_multi_exec,parse_ini_file,show_source</span></span>
<span class="line"><span class="__shiki_mdbnqw">                expose_php=Off</span></span>
<span class="line"><span class="__shiki_mdbnqw">                allow_url_fopen=Off</span></span>
<span class="line"><span class="__shiki_mdbnqw">                allow_url_include=Off</span></span>
<span class="line"><span class="__shiki_mdbnqw">                display_errors=Off</span></span>
<span class="line"><span class="__shiki_mdbnqw">                log_errors=On</span></span>
<span class="line"><span class="__shiki_mdbnqw">                error_log=/var/log/php_errors.log</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 添加安全头</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">X-Powered-By </span><span class="__shiki_mdbnqw">&quot;Unknown&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">X-Content-Type-Options </span><span class="__shiki_mdbnqw">&quot;nosniff&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-输出过滤与编码" tabindex="-1">6.2 输出过滤与编码 <a class="header-anchor" href="#_6-2-输出过滤与编码" aria-label="Permalink to &quot;6.2 输出过滤与编码&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 输出安全配置</span></span>
<span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 子过滤器模块配置（需要安装）</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 用于修改响应内容</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 移除敏感信息</span></span>
<span class="line"><span class="__shiki_1itgoe">            sub_filter_once </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            sub_filter_types </span><span class="__shiki_140thh">text/html application/json;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 移除版本信息</span></span>
<span class="line"><span class="__shiki_1itgoe">            sub_filter </span><span class="__shiki_mdbnqw">&#39;Server: nginx&#39;</span><span class="__shiki_mdbnqw"> &#39;Server: Unknown&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            sub_filter </span><span class="__shiki_mdbnqw">&#39;X-Powered-By: PHP&#39;</span><span class="__shiki_mdbnqw"> &#39;X-Powered-By: Unknown&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 移除注释</span></span>
<span class="line"><span class="__shiki_1itgoe">            sub_filter </span><span class="__shiki_mdbnqw">&#39;&lt;!--&#39;</span><span class="__shiki_mdbnqw"> &#39;&lt;!-- &#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            sub_filter </span><span class="__shiki_mdbnqw">&#39;--&gt;&#39;</span><span class="__shiki_mdbnqw"> &#39; --&gt;&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 转义特殊字符（防止XSS）</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 需要Lua模块支持</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 添加安全头</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">X-Content-Type-Options </span><span class="__shiki_mdbnqw">&quot;nosniff&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">X-Frame-Options </span><span class="__shiki_mdbnqw">&quot;SAMEORIGIN&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">X-XSS-Protection </span><span class="__shiki_mdbnqw">&quot;1; mode=block&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">Referrer-Policy </span><span class="__shiki_mdbnqw">&quot;strict-origin-when-cross-origin&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 内容安全策略（CSP）</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">Content-Security-Policy </span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                default-src &#39;self&#39;;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                script-src &#39;self&#39; &#39;unsafe-inline&#39; &#39;unsafe-eval&#39; https://cdn.example.com;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                style-src &#39;self&#39; &#39;unsafe-inline&#39; https://fonts.googleapis.com;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                img-src &#39;self&#39; data: https:;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                font-src &#39;self&#39; https://fonts.gstatic.com;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                connect-src &#39;self&#39; https://api.example.com;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                media-src &#39;none&#39;;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                object-src &#39;none&#39;;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                child-src &#39;none&#39;;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                frame-ancestors &#39;none&#39;;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                form-action &#39;self&#39;;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                base-uri &#39;self&#39;;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                report-uri /csp-report;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 报告模式（仅报告不阻止）</span></span>
<span class="line"><span class="__shiki_21nrsd">            # add_header Content-Security-Policy-Report-Only &quot;...&quot;;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # CSP违规报告端点</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /csp-report </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 记录CSP违规</span></span>
<span class="line"><span class="__shiki_1itgoe">            access_log </span><span class="__shiki_140thh">/var/log/nginx/csp_violations.log;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 返回空响应</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> 204</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 错误页面安全配置</span></span>
<span class="line"><span class="__shiki_1itgoe">        error_page </span><span class="__shiki_dzsirb">404</span><span class="__shiki_140thh"> /404.html;</span></span>
<span class="line"><span class="__shiki_1itgoe">        error_page </span><span class="__shiki_dzsirb">500</span><span class="__shiki_dzsirb"> 502</span><span class="__shiki_dzsirb"> 503</span><span class="__shiki_dzsirb"> 504</span><span class="__shiki_140thh"> /50x.html;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_21q97f"> /404.html </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            internal</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">X-Frame-Options </span><span class="__shiki_mdbnqw">&quot;DENY&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">X-Content-Type-Options </span><span class="__shiki_mdbnqw">&quot;nosniff&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_21q97f"> /50x.html </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            internal</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">X-Frame-Options </span><span class="__shiki_mdbnqw">&quot;DENY&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">X-Content-Type-Options </span><span class="__shiki_mdbnqw">&quot;nosniff&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 不泄露内部信息</span></span>
<span class="line"><span class="__shiki_1itgoe">            sub_filter </span><span class="__shiki_mdbnqw">&#39;nginx&#39;</span><span class="__shiki_mdbnqw"> &#39;server&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            sub_filter </span><span class="__shiki_mdbnqw">&#39;/var/log/nginx/error.log&#39;</span><span class="__shiki_mdbnqw"> &#39;server logs&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第七部分-ddos防护" tabindex="-1">第七部分：DDoS防护 <a class="header-anchor" href="#第七部分-ddos防护" aria-label="Permalink to &quot;第七部分：DDoS防护&quot;">​</a></h2><h3 id="_7-1-基础ddos防护配置" tabindex="-1">7.1 基础DDoS防护配置 <a class="header-anchor" href="#_7-1-基础ddos防护配置" aria-label="Permalink to &quot;7.1 基础DDoS防护配置&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># DDoS防护配置</span></span>
<span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 连接限制区域</span></span>
<span class="line"><span class="__shiki_1itgoe">    limit_conn_zone </span><span class="__shiki_140thh">$binary_remote_addr zone=perip:10m;</span></span>
<span class="line"><span class="__shiki_1itgoe">    limit_conn_zone </span><span class="__shiki_140thh">$server_name zone=perserver:10m;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 请求限制区域</span></span>
<span class="line"><span class="__shiki_1itgoe">    limit_req_zone </span><span class="__shiki_140thh">$binary_remote_addr zone=req_perip:10m rate=10r/s;</span></span>
<span class="line"><span class="__shiki_1itgoe">    limit_req_zone </span><span class="__shiki_140thh">$binary_remote_addr zone=req_perip_burst:10m rate=100r/s;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 带宽限制区域</span></span>
<span class="line"><span class="__shiki_1itgoe">    limit_rate_zone</span><span class="__shiki_140thh"> $binary_remote_addr zone=bandwidth:10m </span><span class="__shiki_dzsirb">10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 地理限制区域</span></span>
<span class="line"><span class="__shiki_1itgoe">    geo </span><span class="__shiki_140thh">$ddos_country {</span></span>
<span class="line"><span class="__shiki_dzsirb">        default</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 高攻击频率国家</span></span>
<span class="line"><span class="__shiki_1itgoe">        CN</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        RU</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        US</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 根据实际情况调整</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 识别攻击模式</span></span>
<span class="line"><span class="__shiki_1itgoe">    map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">http_user_agent</span><span class="__shiki_140thh"> $is_bot {</span></span>
<span class="line"><span class="__shiki_dzsirb">        default</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ~*</span><span class="__shiki_140thh">(bot|crawler|spider|scraper) </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 识别慢速攻击</span></span>
<span class="line"><span class="__shiki_1itgoe">    map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">request_uri</span><span class="__shiki_140thh"> $slow_attack {</span></span>
<span class="line"><span class="__shiki_dzsirb">        default</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ~*\\.(php|asp|jsp|pl|cgi) </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 全局防护</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 连接限制</span></span>
<span class="line"><span class="__shiki_1itgoe">            limit_conn </span><span class="__shiki_140thh">perip </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            limit_conn </span><span class="__shiki_140thh">perserver </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 请求限制</span></span>
<span class="line"><span class="__shiki_1itgoe">            limit_req </span><span class="__shiki_140thh">zone=req_perip burst=20 nodelay;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 带宽限制</span></span>
<span class="line"><span class="__shiki_1itgoe">            limit_rate </span><span class="__shiki_dzsirb">1m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 地理限制</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($ddos_country </span><span class="__shiki_1itgoe">= </span><span class="__shiki_140thh">1) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                # 更严格的限制</span></span>
<span class="line"><span class="__shiki_1itgoe">                limit_req </span><span class="__shiki_140thh">zone=req_perip burst=5 nodelay;</span></span>
<span class="line"><span class="__shiki_1itgoe">                limit_conn </span><span class="__shiki_140thh">perip </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 机器人限制</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($is_bot </span><span class="__shiki_1itgoe">= </span><span class="__shiki_140thh">1) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                limit_req </span><span class="__shiki_140thh">zone=req_perip burst=2 nodelay;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 慢速攻击防护</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($slow_attack </span><span class="__shiki_1itgoe">= </span><span class="__shiki_140thh">1) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                # 设置更短的超时时间</span></span>
<span class="line"><span class="__shiki_1itgoe">                client_body_timeout </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">                client_header_timeout </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">                send_timeout </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 验证请求合法性</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($request_method </span><span class="__shiki_1itgoe">!~ </span><span class="__shiki_21q97f">^(GET|HEAD|POST)$</span><span class="__shiki_140thh"> ) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> 444</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 验证内容长度</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($content_length &gt; 1048576) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> 413</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 验证请求行长度</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($request </span><span class="__shiki_1itgoe">~* </span><span class="__shiki_mdbnqw">&quot;(\\r|</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">)&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> 400</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 动态资源特殊防护</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1itgoe"> ~</span><span class="__shiki_21q97f"> \\.(php|asp|aspx|jsp|do)$ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 更严格的限制</span></span>
<span class="line"><span class="__shiki_1itgoe">            limit_req </span><span class="__shiki_140thh">zone=req_perip burst=5 nodelay;</span></span>
<span class="line"><span class="__shiki_1itgoe">            limit_conn </span><span class="__shiki_140thh">perip </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 请求频率限制</span></span>
<span class="line"><span class="__shiki_1itgoe">            limit_req </span><span class="__shiki_140thh">zone=req_perip_burst burst=50;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 验证Referer</span></span>
<span class="line"><span class="__shiki_1itgoe">            valid_referers </span><span class="__shiki_140thh">none blocked server_names;</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($invalid_referer) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> 403</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 添加延迟（减慢攻击者）</span></span>
<span class="line"><span class="__shiki_1itgoe">            limit_rate_after </span><span class="__shiki_dzsirb">1m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            limit_rate </span><span class="__shiki_dzsirb">100k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # API端点防护</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /api/ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # API密钥验证</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($http_x_api_key </span><span class="__shiki_1itgoe">!= </span><span class="__shiki_140thh">$api_key) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> 401</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # API速率限制</span></span>
<span class="line"><span class="__shiki_1itgoe">            limit_req </span><span class="__shiki_140thh">zone=req_perip burst=30 nodelay;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 请求签名验证</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 需要应用程序支持</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 登录页面防护</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /login </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 防止暴力破解</span></span>
<span class="line"><span class="__shiki_1itgoe">            limit_req </span><span class="__shiki_140thh">zone=req_perip burst=3 nodelay;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 添加验证码（需要应用程序支持）</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 或使用WAF规则</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 失败尝试记录</span></span>
<span class="line"><span class="__shiki_1itgoe">            access_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> failed_attempts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">failed_logins</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">remote_addr</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> failed_attempts </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_1itgoe"> then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">exit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">403</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-高级ddos防护策略" tabindex="-1">7.2 高级DDoS防护策略 <a class="header-anchor" href="#_7-2-高级ddos防护策略" aria-label="Permalink to &quot;7.2 高级DDoS防护策略&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 高级DDoS防护</span></span>
<span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> attack_detection </span><span class="__shiki_dzsirb">100m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> ip_reputation </span><span class="__shiki_dzsirb">50m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    init_worker_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 初始化攻击检测</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> attacks </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">attack_detection</span></span>
<span class="line"><span class="__shiki_1t8gfj">        attacks</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;last_cleanup&quot;</span><span class="__shiki_140thh">, ngx.</span><span class="__shiki_dzsirb">time</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 基于行为的攻击检测</span></span>
<span class="line"><span class="__shiki_1itgoe">    map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">remote_addr</span><span class="__shiki_140thh"> $suspicious_ip {</span></span>
<span class="line"><span class="__shiki_dzsirb">        default</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 通过Lua动态更新</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            access_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> attacks </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">attack_detection</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> ip </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">remote_addr</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 检测异常请求模式</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> request_key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ip </span><span class="__shiki_1itgoe">..</span><span class="__shiki_mdbnqw"> &quot;:requests&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> current_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_dzsirb">time</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 获取请求计数</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> requests </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> attacks</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(request_key) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1t8gfj">                attacks</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">incr</span><span class="__shiki_140thh">(request_key, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 设置过期时间</span></span>
<span class="line"><span class="__shiki_1t8gfj">                attacks</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">expire</span><span class="__shiki_140thh">(request_key, </span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">-- 60秒窗口</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 检测攻击模式</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> requests </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> then</span><span class="__shiki_21nrsd">  -- 每分钟超过100个请求</span></span>
<span class="line"><span class="__shiki_21nrsd">                    -- 标记为可疑IP</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> suspicious_key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ip </span><span class="__shiki_1itgoe">..</span><span class="__shiki_mdbnqw"> &quot;:suspicious&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">                    attacks</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(suspicious_key, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">300</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">-- 标记5分钟</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    -- 记录攻击</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">WARN</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;Possible attack detected from &quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> ip)</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    -- 返回验证页面</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> requests </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 200</span><span class="__shiki_1itgoe"> then</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.</span><span class="__shiki_dzsirb">redirect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/captcha?ip=&quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_dzsirb">escape_uri</span><span class="__shiki_140thh">(ip))</span></span>
<span class="line"><span class="__shiki_1itgoe">                    end</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 检查是否在可疑名单中</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1t8gfj"> attacks</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(ip </span><span class="__shiki_1itgoe">..</span><span class="__shiki_mdbnqw"> &quot;:suspicious&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_21nrsd">                    -- 更严格的限制</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">limit_req_burst</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;1&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">limit_conn_perip</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;1&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 自动清理旧记录</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> current_time </span><span class="__shiki_1itgoe">%</span><span class="__shiki_dzsirb"> 300</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> then</span><span class="__shiki_21nrsd">  -- 每5分钟清理一次</span></span>
<span class="line"><span class="__shiki_1t8gfj">                    attacks</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">flush_expired</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 动态调整限制</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$limit_req_burst </span><span class="__shiki_mdbnqw">&quot;20&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$limit_conn_perip </span><span class="__shiki_mdbnqw">&quot;10&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            limit_req </span><span class="__shiki_140thh">zone=req_perip burst=$limit_req_burst nodelay;</span></span>
<span class="line"><span class="__shiki_1itgoe">            limit_conn </span><span class="__shiki_140thh">perip $limit_conn_perip;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 验证码页面（用于缓解攻击）</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /captcha </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 验证码验证逻辑</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 需要集成reCAPTCHA或其他验证码服务</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> ip </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">arg_ip</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> captcha_response </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">arg_response</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> captcha_response </span><span class="__shiki_1itgoe">and</span><span class="__shiki_140thh"> captcha_response </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;valid&quot; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_21nrsd">                    -- 验证通过，从可疑名单移除</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> attacks </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">attack_detection</span></span>
<span class="line"><span class="__shiki_1t8gfj">                    attacks</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">delete</span><span class="__shiki_140thh">(ip </span><span class="__shiki_1itgoe">..</span><span class="__shiki_mdbnqw"> &quot;:suspicious&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">                    attacks</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">delete</span><span class="__shiki_140thh">(ip </span><span class="__shiki_1itgoe">..</span><span class="__shiki_mdbnqw"> &quot;:requests&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">redirect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                else</span></span>
<span class="line"><span class="__shiki_21nrsd">                    -- 显示验证码页面</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">[[</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &lt;html&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &lt;head&gt;&lt;title&gt;Security Verification&lt;/title&gt;&lt;/head&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &lt;body&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            &lt;h1&gt;Security Verification Required&lt;/h1&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            &lt;form method=&quot;GET&quot;&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                &lt;!-- 集成reCAPTCHA --&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                &lt;div class=&quot;g-recaptcha&quot; data-sitekey=&quot;your-site-key&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                &lt;input type=&quot;hidden&quot; name=&quot;ip&quot; value=&quot;]] </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> ip </span><span class="__shiki_1itgoe">..</span><span class="__shiki_mdbnqw"> [[&quot;&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                &lt;button type=&quot;submit&quot;&gt;Verify&lt;/button&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            &lt;/form&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            &lt;script src=&quot;https://www.google.com/recaptcha/api.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &lt;/body&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &lt;/html&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    ]]</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # DDoS防护状态监控</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /ddos-status </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 严格访问控制</span></span>
<span class="line"><span class="__shiki_1itgoe">            allow </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            allow </span><span class="__shiki_140thh">192.168.1.0/24;</span></span>
<span class="line"><span class="__shiki_1itgoe">            deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> attacks </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">attack_detection</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> keys </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> attacks</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get_keys</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                    total_ips </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    suspicious_ips </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    blocked_ips </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    recent_attacks </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                for</span><span class="__shiki_140thh"> _, key in ipairs(keys) do</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> key:match(</span><span class="__shiki_mdbnqw">&quot;:requests$&quot;</span><span class="__shiki_140thh">) then</span></span>
<span class="line"><span class="__shiki_140thh">                        stats.</span><span class="__shiki_1itgoe">total_ips</span><span class="__shiki_140thh"> = stats.total_ips + 1</span></span>
<span class="line"><span class="__shiki_1itgoe">                        local</span><span class="__shiki_140thh"> ip = key:gsub(</span><span class="__shiki_mdbnqw">&quot;:requests$&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                        local</span><span class="__shiki_140thh"> requests = attacks:get(key) or 0</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_1itgoe">                        if</span><span class="__shiki_140thh"> requests &gt; </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                            stats.</span><span class="__shiki_1itgoe">suspicious_ips</span><span class="__shiki_140thh"> = stats.suspicious_ips + 1</span></span>
<span class="line"><span class="__shiki_140thh">                            table.insert(stats.recent_attacks, {</span></span>
<span class="line"><span class="__shiki_1itgoe">                                ip</span><span class="__shiki_140thh"> = ip,</span></span>
<span class="line"><span class="__shiki_1itgoe">                                requests</span><span class="__shiki_140thh"> = requests</span></span>
<span class="line"><span class="__shiki_140thh">                            })</span></span>
<span class="line"><span class="__shiki_1itgoe">                        end</span></span>
<span class="line"><span class="__shiki_1itgoe">                    end</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                ngx.header[&quot;Content-Type&quot;] = &quot;</span><span class="__shiki_dzsirb">application/json</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                ngx.say(require(&quot;</span><span class="__shiki_140thh">cjson</span><span class="__shiki_mdbnqw">&quot;).encode(stats))</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        # 集成CloudFlare等CDN防护</span></span>
<span class="line"><span class="__shiki_mdbnqw">        location / {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            # 验证CloudFlare IP</span></span>
<span class="line"><span class="__shiki_mdbnqw">            set_real_ip_from 103.21.244.0/22;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            set_real_ip_from 103.22.200.0/22;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            # 添加更多CloudFlare IP段...</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            real_ip_header CF-Connecting-IP;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            # 验证请求是否来自CloudFlare</span></span>
<span class="line"><span class="__shiki_mdbnqw">            if ($</span><span class="__shiki_140thh">http_cf_ray</span><span class="__shiki_mdbnqw"> = &quot;&quot;) {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                # 不是来自CloudFlare，应用更严格的规则</span></span>
<span class="line"><span class="__shiki_mdbnqw">                limit_req zone=req_perip burst=5 nodelay;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">}</span></span></code></pre></div><h2 id="第八部分-日志与监控" tabindex="-1">第八部分：日志与监控 <a class="header-anchor" href="#第八部分-日志与监控" aria-label="Permalink to &quot;第八部分：日志与监控&quot;">​</a></h2><h3 id="_8-1-安全日志配置" tabindex="-1">8.1 安全日志配置 <a class="header-anchor" href="#_8-1-安全日志配置" aria-label="Permalink to &quot;8.1 安全日志配置&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 安全日志配置</span></span>
<span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 安全日志格式</span></span>
<span class="line"><span class="__shiki_1itgoe">    log_format </span><span class="__shiki_140thh">security </span><span class="__shiki_mdbnqw">&#39;$</span><span class="__shiki_140thh">remote_addr</span><span class="__shiki_mdbnqw"> - $</span><span class="__shiki_140thh">remote_user</span><span class="__shiki_mdbnqw"> [$</span><span class="__shiki_140thh">time_local</span><span class="__shiki_mdbnqw">] &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &#39;&quot;$</span><span class="__shiki_140thh">request</span><span class="__shiki_mdbnqw">&quot; $</span><span class="__shiki_140thh">status</span><span class="__shiki_mdbnqw"> $</span><span class="__shiki_140thh">body_bytes_sent</span><span class="__shiki_mdbnqw"> &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &#39;&quot;$</span><span class="__shiki_140thh">http_referer</span><span class="__shiki_mdbnqw">&quot; &quot;$</span><span class="__shiki_140thh">http_user_agent</span><span class="__shiki_mdbnqw">&quot; &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &#39;&quot;$</span><span class="__shiki_140thh">http_x_forwarded_for</span><span class="__shiki_mdbnqw">&quot; $</span><span class="__shiki_140thh">request_time</span><span class="__shiki_mdbnqw"> &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &#39;$</span><span class="__shiki_140thh">geoip_country_code</span><span class="__shiki_mdbnqw"> $</span><span class="__shiki_140thh">geoip_city</span><span class="__shiki_mdbnqw"> &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &#39;$</span><span class="__shiki_140thh">upstream_addr</span><span class="__shiki_mdbnqw"> $</span><span class="__shiki_140thh">upstream_status</span><span class="__shiki_mdbnqw"> &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &#39;blocked=$</span><span class="__shiki_140thh">blocked</span><span class="__shiki_mdbnqw"> malicious=$</span><span class="__shiki_140thh">malicious_uri</span><span class="__shiki_mdbnqw"> &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &#39;bot=$</span><span class="__shiki_140thh">is_bot</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    log_format </span><span class="__shiki_140thh">json_audit escape=json </span><span class="__shiki_mdbnqw">&#39;{&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;time_local&quot;:&quot;$</span><span class="__shiki_140thh">time_local</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;remote_addr&quot;:&quot;$</span><span class="__shiki_140thh">remote_addr</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;remote_user&quot;:&quot;$</span><span class="__shiki_140thh">remote_user</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;request&quot;:&quot;$</span><span class="__shiki_140thh">request</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;status&quot;:&quot;$</span><span class="__shiki_140thh">status</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;body_bytes_sent&quot;:&quot;$</span><span class="__shiki_140thh">body_bytes_sent</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;http_referer&quot;:&quot;$</span><span class="__shiki_140thh">http_referer</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;http_user_agent&quot;:&quot;$</span><span class="__shiki_140thh">http_user_agent</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;http_x_forwarded_for&quot;:&quot;$</span><span class="__shiki_140thh">http_x_forwarded_for</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;request_time&quot;:&quot;$</span><span class="__shiki_140thh">request_time</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;geoip_country_code&quot;:&quot;$</span><span class="__shiki_140thh">geoip_country_code</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;geoip_city&quot;:&quot;$</span><span class="__shiki_140thh">geoip_city</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;upstream_addr&quot;:&quot;$</span><span class="__shiki_140thh">upstream_addr</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;upstream_status&quot;:&quot;$</span><span class="__shiki_140thh">upstream_status</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;ssl_protocol&quot;:&quot;$</span><span class="__shiki_140thh">ssl_protocol</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;ssl_cipher&quot;:&quot;$</span><span class="__shiki_140thh">ssl_cipher</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;blocked&quot;:&quot;$</span><span class="__shiki_140thh">blocked</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;malicious&quot;:&quot;$</span><span class="__shiki_140thh">malicious_uri</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;bot&quot;:&quot;$</span><span class="__shiki_140thh">is_bot</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;http_host&quot;:&quot;$</span><span class="__shiki_140thh">http_host</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;server_name&quot;:&quot;$</span><span class="__shiki_140thh">server_name</span><span class="__shiki_mdbnqw">&quot;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;}&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 错误日志配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    error_log </span><span class="__shiki_140thh">/var/log/nginx/error.log </span><span class="__shiki_dzsirb">warn</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    error_log </span><span class="__shiki_140thh">/var/log/nginx/error_secure.log </span><span class="__shiki_dzsirb">debug</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 安全访问日志</span></span>
<span class="line"><span class="__shiki_1itgoe">        access_log </span><span class="__shiki_140thh">/var/log/nginx/security.log security;</span></span>
<span class="line"><span class="__shiki_1itgoe">        access_log </span><span class="__shiki_140thh">/var/log/nginx/audit.log json_audit;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 异常请求日志</span></span>
<span class="line"><span class="__shiki_1itgoe">        set </span><span class="__shiki_140thh">$blocked </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        set </span><span class="__shiki_140thh">$logged </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 记录恶意请求</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($malicious_uri) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$blocked </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$logged </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            access_log </span><span class="__shiki_140thh">/var/log/nginx/malicious.log security;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 记录被阻止的请求</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($bad_agent) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$logged </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            access_log </span><span class="__shiki_140thh">/var/log/nginx/bad_agents.log security;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 记录登录尝试</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /login </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            access_log </span><span class="__shiki_140thh">/var/log/nginx/login_attempts.log security;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 记录失败尝试</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($status </span><span class="__shiki_1itgoe">= </span><span class="__shiki_140thh">401) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                access_log </span><span class="__shiki_140thh">/var/log/nginx/failed_logins.log security;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 管理活动日志</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /admin </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            access_log </span><span class="__shiki_140thh">/var/log/nginx/admin_access.log security;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 记录所有管理操作</span></span>
<span class="line"><span class="__shiki_1itgoe">            log_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> admin_actions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">admin_actions</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> action </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                    ip </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">remote_addr</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">remote_user</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">time_local</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    action </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">request_uri</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    method </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">request_method</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                admin_actions:lpush(&quot;actions&quot;, require(&quot;cjson&quot;).encode(action))</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 文件上传日志</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /upload </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            access_log </span><span class="__shiki_140thh">/var/log/nginx/uploads.log security;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 记录文件信息</span></span>
<span class="line"><span class="__shiki_1itgoe">            log_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> uploads </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">uploads</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> info </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                    ip </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">remote_addr</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    filename </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">request_filename</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">content_length</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">time_local</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                uploads:lpush(&quot;files&quot;, require(&quot;cjson&quot;).encode(info))</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 日志轮转配置</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 在/etc/logrotate.d/nginx中添加：</span></span>
<span class="line"><span class="__shiki_21nrsd">        # /var/log/nginx/*.log {</span></span>
<span class="line"><span class="__shiki_21nrsd">        #     daily</span></span>
<span class="line"><span class="__shiki_21nrsd">        #     missingok</span></span>
<span class="line"><span class="__shiki_21nrsd">        #     rotate 90</span></span>
<span class="line"><span class="__shiki_21nrsd">        #     compress</span></span>
<span class="line"><span class="__shiki_21nrsd">        #     delaycompress</span></span>
<span class="line"><span class="__shiki_21nrsd">        #     notifempty</span></span>
<span class="line"><span class="__shiki_21nrsd">        #     create 640 nginx adm</span></span>
<span class="line"><span class="__shiki_21nrsd">        #     sharedscripts</span></span>
<span class="line"><span class="__shiki_21nrsd">        #     postrotate</span></span>
<span class="line"><span class="__shiki_21nrsd">        #         [ -f /var/run/nginx.pid ] &amp;&amp; kill -USR1 \`cat /var/run/nginx.pid\`</span></span>
<span class="line"><span class="__shiki_21nrsd">        #     endscript</span></span>
<span class="line"><span class="__shiki_21nrsd">        # }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-2-实时安全监控" tabindex="-1">8.2 实时安全监控 <a class="header-anchor" href="#_8-2-实时安全监控" aria-label="Permalink to &quot;8.2 实时安全监控&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 实时安全监控配置</span></span>
<span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> security_monitor </span><span class="__shiki_dzsirb">10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    init_worker_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 初始化安全监控</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> monitor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">security_monitor</span></span>
<span class="line"><span class="__shiki_1t8gfj">        monitor</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;attack_count&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">        monitor</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;last_alert&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 启动监控循环</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_1t8gfj"> handler</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(premature)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> premature </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 检查异常模式</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> attacks </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> monitor</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;attack_count&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> last_alert </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> monitor</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;last_alert&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> current_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_dzsirb">time</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 发送警报（如果超过阈值）</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> attacks </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> and</span><span class="__shiki_140thh"> (current_time </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> last_alert) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 300</span><span class="__shiki_1itgoe"> then</span></span>
<span class="line"><span class="__shiki_21nrsd">                    -- 发送警报</span></span>
<span class="line"><span class="__shiki_dzsirb">                    send_alert</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;High attack rate detected: &quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> attacks </span><span class="__shiki_1itgoe">..</span><span class="__shiki_mdbnqw"> &quot; attacks&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">                    monitor</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;last_alert&quot;</span><span class="__shiki_140thh">, current_time)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 重置计数器（每小时）</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> current_time </span><span class="__shiki_1itgoe">%</span><span class="__shiki_dzsirb"> 3600</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> then</span></span>
<span class="line"><span class="__shiki_1t8gfj">                    monitor</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;attack_count&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 重新设置定时器</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> ok, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">timer</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">at</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">, handler)</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_1t8gfj">timer</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">at</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">, handler)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            log_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 实时监控逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> monitor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">security_monitor</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 检测攻击</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">blocked</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_mdbnqw"> &quot;1&quot; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1t8gfj">                    monitor</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">incr</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;attack_count&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    -- 实时警报</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> attacks </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> monitor</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;attack_count&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> attacks </span><span class="__shiki_1itgoe">%</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> then</span><span class="__shiki_21nrsd">  -- 每10次攻击记录一次</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">WARN</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;Attack detected, total: &quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> attacks)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    end</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 检测异常模式</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> ip </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">remote_addr</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> ip_key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;ip:&quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> ip</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> requests </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> monitor</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(ip_key) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1t8gfj">                monitor</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">incr</span><span class="__shiki_140thh">(ip_key, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">                monitor</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">expire</span><span class="__shiki_140thh">(ip_key, </span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">-- 60秒过期</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> requests </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_1itgoe"> then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">WARN</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;High request rate from &quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> ip </span><span class="__shiki_1itgoe">..</span><span class="__shiki_mdbnqw"> &quot;: &quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> requests)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 安全监控端点</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /security/monitor </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 严格访问控制</span></span>
<span class="line"><span class="__shiki_1itgoe">            allow </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            allow </span><span class="__shiki_140thh">192.168.1.0/24;</span></span>
<span class="line"><span class="__shiki_1itgoe">            deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            auth_basic </span><span class="__shiki_mdbnqw">&quot;Security Monitor&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            auth_basic_user_file </span><span class="__shiki_140thh">/etc/nginx/.htpasswd_monitor;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> monitor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">security_monitor</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 获取监控数据</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                    attack_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> monitor</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;attack_count&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    last_alert </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> monitor</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;last_alert&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    suspicious_ips </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {},</span></span>
<span class="line"><span class="__shiki_1itgoe">                    current_time</span><span class="__shiki_140thh"> = ngx.time()</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 获取所有IP计数器</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> keys = monitor:get_keys()</span></span>
<span class="line"><span class="__shiki_1itgoe">                for</span><span class="__shiki_140thh"> _, key in ipairs(keys) do</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> key:match(</span><span class="__shiki_mdbnqw">&quot;^ip:&quot;</span><span class="__shiki_140thh">) then</span></span>
<span class="line"><span class="__shiki_1itgoe">                        local</span><span class="__shiki_140thh"> ip = key:gsub(</span><span class="__shiki_mdbnqw">&quot;^ip:&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                        local</span><span class="__shiki_140thh"> count = monitor:get(key) or 0</span></span>
<span class="line"><span class="__shiki_1itgoe">                        if</span><span class="__shiki_140thh"> count &gt; </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                            table.insert(data.suspicious_ips, {</span></span>
<span class="line"><span class="__shiki_1itgoe">                                ip</span><span class="__shiki_140thh"> = ip,</span></span>
<span class="line"><span class="__shiki_1itgoe">                                requests</span><span class="__shiki_140thh"> = count</span></span>
<span class="line"><span class="__shiki_140thh">                            })</span></span>
<span class="line"><span class="__shiki_1itgoe">                        end</span></span>
<span class="line"><span class="__shiki_1itgoe">                    end</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 获取实时连接数</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> f = io.popen(</span><span class="__shiki_mdbnqw">&quot;netstat -an | grep :80 | wc -l&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                data.</span><span class="__shiki_1itgoe">current_connections</span><span class="__shiki_140thh"> = f:read(</span><span class="__shiki_mdbnqw">&quot;*a&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                f:close()</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                ngx.header[&quot;Content-Type&quot;] = &quot;</span><span class="__shiki_dzsirb">application/json</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                ngx.say(require(&quot;</span><span class="__shiki_140thh">cjson</span><span class="__shiki_mdbnqw">&quot;).encode(data))</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        # 集成第三方监控（如Prometheus）</span></span>
<span class="line"><span class="__shiki_mdbnqw">        location /metrics {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            content_by_lua_block {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                local monitor = ngx.shared.security_monitor</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                -- Prometheus格式的指标</span></span>
<span class="line"><span class="__shiki_mdbnqw">                local metrics = {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;</span><span class="__shiki_21nrsd"># HELP nginx_attacks_total Total number of attacks detected&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;# TYPE nginx_attacks_total counter&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;nginx_attacks_total &quot;</span><span class="__shiki_140thh"> .. (monitor:get(</span><span class="__shiki_mdbnqw">&quot;attack_count&quot;</span><span class="__shiki_140thh">) or 0),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;# HELP nginx_connections_total Current number of connections&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;# TYPE nginx_connections_total gauge&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;nginx_connections_total &quot;</span><span class="__shiki_140thh"> .. (get_connection_count() or 0),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;# HELP nginx_requests_total Total requests processed&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;# TYPE nginx_requests_total counter&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;nginx_requests_total &quot;</span><span class="__shiki_140thh"> .. (monitor:get(</span><span class="__shiki_mdbnqw">&quot;total_requests&quot;</span><span class="__shiki_140thh">) or 0)</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                ngx.header[</span><span class="__shiki_mdbnqw">&quot;Content-Type&quot;</span><span class="__shiki_140thh">] = </span><span class="__shiki_mdbnqw">&quot;text/plain; version=0.0.4&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.say(table.concat(metrics, </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第九部分-应急响应与恢复" tabindex="-1">第九部分：应急响应与恢复 <a class="header-anchor" href="#第九部分-应急响应与恢复" aria-label="Permalink to &quot;第九部分：应急响应与恢复&quot;">​</a></h2><h3 id="_9-1-应急响应配置" tabindex="-1">9.1 应急响应配置 <a class="header-anchor" href="#_9-1-应急响应配置" aria-label="Permalink to &quot;9.1 应急响应配置&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 应急响应配置</span></span>
<span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 紧急模式开关</span></span>
<span class="line"><span class="__shiki_1itgoe">    map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">cookie_emergency_mode</span><span class="__shiki_140thh"> $emergency_mode {</span></span>
<span class="line"><span class="__shiki_dzsirb">        default</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;enabled&quot;</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 维护模式配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">arg_maintenance</span><span class="__shiki_140thh"> $maintenance_mode {</span></span>
<span class="line"><span class="__shiki_dzsirb">        default</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;true&quot;</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 紧急响应处理</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 检查是否启用紧急模式</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($emergency_mode </span><span class="__shiki_1itgoe">= </span><span class="__shiki_140thh">1) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                # 紧急模式：只允许管理员访问</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> ($remote_addr </span><span class="__shiki_1itgoe">!~ </span><span class="__shiki_140thh">^(192\\.168\\.1\\.|10\\.0\\.0\\.)) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    # 返回维护页面</span></span>
<span class="line"><span class="__shiki_1itgoe">                    root </span><span class="__shiki_140thh">/var/www/emergency;</span></span>
<span class="line"><span class="__shiki_1itgoe">                    try_files </span><span class="__shiki_140thh">/maintenance.html </span><span class="__shiki_dzsirb">=503</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 检查维护模式</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">-f </span><span class="__shiki_140thh">/var/www/html/maintenance.flag) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                # 返回维护页面</span></span>
<span class="line"><span class="__shiki_1itgoe">                root </span><span class="__shiki_140thh">/var/www/html;</span></span>
<span class="line"><span class="__shiki_1itgoe">                try_files </span><span class="__shiki_140thh">/maintenance.html </span><span class="__shiki_dzsirb">=503</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 检查紧急IP封锁</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">-f </span><span class="__shiki_140thh">/etc/nginx/emergency_block.conf) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                include </span><span class="__shiki_140thh">/etc/nginx/emergency_block.conf;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 紧急控制端点</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /emergency </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 严格访问控制</span></span>
<span class="line"><span class="__shiki_1itgoe">            allow </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            allow </span><span class="__shiki_140thh">192.168.1.0/24;</span></span>
<span class="line"><span class="__shiki_1itgoe">            deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 双因素认证</span></span>
<span class="line"><span class="__shiki_1itgoe">            auth_basic </span><span class="__shiki_mdbnqw">&quot;Emergency Control&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            auth_basic_user_file </span><span class="__shiki_140thh">/etc/nginx/.htpasswd_emergency;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # IP白名单二次验证</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($remote_addr </span><span class="__shiki_1itgoe">!~ </span><span class="__shiki_21q97f">^(192\\.168\\.1\\.100|10\\.0\\.0\\.1)$</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> 403</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> action </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">arg_action</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> param </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">arg_param</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> action </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;enable_maintenance&quot; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_21nrsd">                    -- 启用维护模式</span></span>
<span class="line"><span class="__shiki_dzsirb">                    os.execute</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;touch /var/www/html/maintenance.flag&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Maintenance mode enabled&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">                elseif</span><span class="__shiki_140thh"> action </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;disable_maintenance&quot; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_21nrsd">                    -- 禁用维护模式</span></span>
<span class="line"><span class="__shiki_dzsirb">                    os.execute</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;rm -f /var/www/html/maintenance.flag&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Maintenance mode disabled&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">                elseif</span><span class="__shiki_140thh"> action </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;block_ip&quot; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_21nrsd">                    -- 紧急封锁IP</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> param </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1itgoe">                        local</span><span class="__shiki_140thh"> f </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> io.open</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/etc/nginx/emergency_block.conf&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;a&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">                        f</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">write</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;deny &quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> param </span><span class="__shiki_1itgoe">..</span><span class="__shiki_mdbnqw"> &quot;;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">                        f</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_21nrsd">                        -- 重载Nginx配置</span></span>
<span class="line"><span class="__shiki_dzsirb">                        os.execute</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;nginx -s reload&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;IP blocked: &quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> param)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">                elseif</span><span class="__shiki_140thh"> action </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;unblock_ip&quot; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_21nrsd">                    -- 解除IP封锁</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> param </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">                        os.execute</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;sed -i &#39;/&quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> param </span><span class="__shiki_1itgoe">..</span><span class="__shiki_mdbnqw"> &quot;/d&#39; /etc/nginx/emergency_block.conf&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">                        os.execute</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;nginx -s reload&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;IP unblocked: &quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> param)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">                elseif</span><span class="__shiki_140thh"> action </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;emergency_mode&quot; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_21nrsd">                    -- 紧急模式开关</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> param </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;on&quot; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_21nrsd">                        -- 设置紧急模式cookie</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.</span><span class="__shiki_1t8gfj">header</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&quot;Set-Cookie&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;emergency_mode=enabled; Path=/; HttpOnly; Secure&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Emergency mode enabled&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    else</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.</span><span class="__shiki_1t8gfj">header</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&quot;Set-Cookie&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;emergency_mode=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Emergency mode disabled&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">                else</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Available actions: enable_maintenance, disable_maintenance, block_ip, unblock_ip, emergency_mode&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 备份恢复端点</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /backup </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 极端严格的访问控制</span></span>
<span class="line"><span class="__shiki_1itgoe">            allow </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> action </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">arg_action</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> action </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;create&quot; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_21nrsd">                    -- 创建配置备份</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> timestamp </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> os.date</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;%Y%m%d_%H%M%S&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> backup_file </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;/backup/nginx_config_&quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> timestamp </span><span class="__shiki_1itgoe">..</span><span class="__shiki_mdbnqw"> &quot;.tar.gz&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_dzsirb">                    os.execute</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;tar -czf &quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> backup_file </span><span class="__shiki_1itgoe">..</span><span class="__shiki_mdbnqw"> &quot; /etc/nginx&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Backup created: &quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> backup_file)</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">                elseif</span><span class="__shiki_140thh"> action </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;restore&quot; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> file </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">arg_file</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> file </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_21nrsd">                        -- 恢复配置</span></span>
<span class="line"><span class="__shiki_dzsirb">                        os.execute</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;tar -xzf &quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> file </span><span class="__shiki_1itgoe">..</span><span class="__shiki_mdbnqw"> &quot; -C /&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">                        os.execute</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;nginx -t &amp;&amp; nginx -s reload&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Configuration restored from: &quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> file)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">                elseif</span><span class="__shiki_140thh"> action </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;list&quot; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_21nrsd">                    -- 列出备份</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> f </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> io.popen</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ls -la /backup/&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">f</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">read</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;*a&quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_1t8gfj">                    f</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 攻击取证端点</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /forensics </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            internal</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 仅内部访问</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> ip </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">arg_ip</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> time_range </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">arg_time</span><span class="__shiki_1itgoe"> or</span><span class="__shiki_mdbnqw"> &quot;1h&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 收集攻击证据</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> evidence </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                    ip </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ip,</span></span>
<span class="line"><span class="__shiki_140thh">                    timestamp </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_dzsirb">now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">                    logs </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {},</span></span>
<span class="line"><span class="__shiki_1itgoe">                    connections</span><span class="__shiki_140thh"> = {},</span></span>
<span class="line"><span class="__shiki_1itgoe">                    system_info</span><span class="__shiki_140thh"> = {}</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 获取相关日志</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> cmd = </span><span class="__shiki_mdbnqw">&quot;grep &quot;</span><span class="__shiki_140thh"> .. ip .. </span><span class="__shiki_mdbnqw">&quot; /var/log/nginx/access.log | tail -100&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> f = io.popen(cmd)</span></span>
<span class="line"><span class="__shiki_140thh">                evidence.logs.</span><span class="__shiki_1itgoe">access</span><span class="__shiki_140thh"> = f:read(</span><span class="__shiki_mdbnqw">&quot;*a&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                f:close()</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 获取错误日志</span></span>
<span class="line"><span class="__shiki_1itgoe">                cmd</span><span class="__shiki_140thh"> = </span><span class="__shiki_mdbnqw">&quot;grep &quot;</span><span class="__shiki_140thh"> .. ip .. </span><span class="__shiki_mdbnqw">&quot; /var/log/nginx/error.log | tail -50&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">                f</span><span class="__shiki_140thh"> = io.popen(cmd)</span></span>
<span class="line"><span class="__shiki_140thh">                evidence.logs.</span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> = f:read(</span><span class="__shiki_mdbnqw">&quot;*a&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                f:close()</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 获取当前连接</span></span>
<span class="line"><span class="__shiki_1itgoe">                cmd</span><span class="__shiki_140thh"> = </span><span class="__shiki_mdbnqw">&quot;netstat -an | grep &quot;</span><span class="__shiki_140thh"> .. ip</span></span>
<span class="line"><span class="__shiki_1itgoe">                f</span><span class="__shiki_140thh"> = io.popen(cmd)</span></span>
<span class="line"><span class="__shiki_140thh">                evidence.</span><span class="__shiki_1itgoe">connections</span><span class="__shiki_140thh"> = f:read(</span><span class="__shiki_mdbnqw">&quot;*a&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                f:close()</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 获取系统信息</span></span>
<span class="line"><span class="__shiki_140thh">                evidence.system_info.</span><span class="__shiki_1itgoe">load</span><span class="__shiki_140thh"> = io.popen(</span><span class="__shiki_mdbnqw">&quot;uptime&quot;</span><span class="__shiki_140thh">):read(</span><span class="__shiki_mdbnqw">&quot;*a&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                evidence.system_info.</span><span class="__shiki_1itgoe">memory</span><span class="__shiki_140thh"> = io.popen(</span><span class="__shiki_mdbnqw">&quot;free -m&quot;</span><span class="__shiki_140thh">):read(</span><span class="__shiki_mdbnqw">&quot;*a&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                ngx.header[&quot;Content-Type&quot;] = &quot;</span><span class="__shiki_dzsirb">application/json</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                ngx.say(require(&quot;</span><span class="__shiki_140thh">cjson</span><span class="__shiki_mdbnqw">&quot;).encode(evidence))</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">}</span></span></code></pre></div><h3 id="_9-2-安全备份策略" tabindex="-1">9.2 安全备份策略 <a class="header-anchor" href="#_9-2-安全备份策略" aria-label="Permalink to &quot;9.2 安全备份策略&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># /usr/local/bin/nginx-security-backup.sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 备份脚本</span></span>
<span class="line"><span class="__shiki_140thh">BACKUP_DIR</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/backup/nginx&quot;</span></span>
<span class="line"><span class="__shiki_140thh">DATE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%Y%m%d_%H%M%S</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">BACKUP_FILE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$BACKUP_DIR</span><span class="__shiki_mdbnqw">/backup_</span><span class="__shiki_140thh">$DATE</span><span class="__shiki_mdbnqw">.tar.gz&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建备份目录</span></span>
<span class="line"><span class="__shiki_1t8gfj">mkdir</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_140thh"> $BACKUP_DIR</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 备份内容</span></span>
<span class="line"><span class="__shiki_140thh">BACKUP_ITEMS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;/etc/nginx&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;/var/log/nginx&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;/var/www/html&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;/usr/local/nginx&quot;</span><span class="__shiki_21nrsd">  # 如果是源码安装</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建备份</span></span>
<span class="line"><span class="__shiki_1t8gfj">tar</span><span class="__shiki_dzsirb"> -czf</span><span class="__shiki_140thh"> $BACKUP_FILE \${BACKUP_ITEMS[</span><span class="__shiki_1itgoe">@</span><span class="__shiki_140thh">]}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 加密备份（可选）</span></span>
<span class="line"><span class="__shiki_21nrsd"># openssl enc -aes-256-cbc -salt -in $BACKUP_FILE -out $BACKUP_FILE.enc -pass pass:yourpassword</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 保留最近7天的备份</span></span>
<span class="line"><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh"> $BACKUP_DIR </span><span class="__shiki_dzsirb">-name</span><span class="__shiki_mdbnqw"> &quot;backup_*.tar.gz&quot;</span><span class="__shiki_dzsirb"> -mtime</span><span class="__shiki_mdbnqw"> +7</span><span class="__shiki_dzsirb"> -delete</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 验证备份完整性</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_1t8gfj"> tar</span><span class="__shiki_dzsirb"> -tzf</span><span class="__shiki_140thh"> $BACKUP_FILE &amp;</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh">/dev/null; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;Backup successful: </span><span class="__shiki_140thh">$BACKUP_FILE</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 发送通知</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;Nginx backup completed: </span><span class="__shiki_140thh">$BACKUP_FILE</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_1t8gfj">        mail</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_mdbnqw"> &quot;Nginx Backup Report&quot;</span><span class="__shiki_mdbnqw"> admin@example.com</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 上传到远程存储（可选）</span></span>
<span class="line"><span class="__shiki_21nrsd">    # scp $BACKUP_FILE user@backup-server:/backup/</span></span>
<span class="line"><span class="__shiki_1itgoe">else</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;Backup verification failed!&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;Backup failed: </span><span class="__shiki_140thh">$BACKUP_FILE</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_1t8gfj">        mail</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_mdbnqw"> &quot;Nginx Backup FAILED&quot;</span><span class="__shiki_mdbnqw"> admin@example.com</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 配置cron定时任务</span></span>
<span class="line"><span class="__shiki_21nrsd"># 0 2 * * * /usr/local/bin/nginx-security-backup.sh</span></span></code></pre></div><h2 id="第十部分-合规性与审计" tabindex="-1">第十部分：合规性与审计 <a class="header-anchor" href="#第十部分-合规性与审计" aria-label="Permalink to &quot;第十部分：合规性与审计&quot;">​</a></h2><h3 id="_10-1-安全合规配置" tabindex="-1">10.1 安全合规配置 <a class="header-anchor" href="#_10-1-安全合规配置" aria-label="Permalink to &quot;10.1 安全合规配置&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># PCI DSS合规配置</span></span>
<span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # PCI DSS要求</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 1. 使用强TLS配置（已在前面配置）</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 2. 禁用不安全的加密套件</span></span>
<span class="line"><span class="__shiki_1itgoe">        ssl_ciphers </span><span class="__shiki_mdbnqw">&#39;ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 3. 启用HSTS</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Strict-Transport-Security </span><span class="__shiki_mdbnqw">&quot;max-age=31536000; includeSubDomains&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 4. 禁用TLS 1.0和1.1</span></span>
<span class="line"><span class="__shiki_1itgoe">        ssl_protocols </span><span class="__shiki_140thh">TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 5. 配置安全的cookie</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Set-Cookie </span><span class="__shiki_mdbnqw">&quot;Path=/; HttpOnly; Secure; SameSite=Strict&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 6. 防止点击劫持</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Frame-Options </span><span class="__shiki_mdbnqw">&quot;DENY&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 7. 防止MIME类型嗅探</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Content-Type-Options </span><span class="__shiki_mdbnqw">&quot;nosniff&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 8. XSS防护</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-XSS-Protection </span><span class="__shiki_mdbnqw">&quot;1; mode=block&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 9. 配置CSP</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Content-Security-Policy </span><span class="__shiki_mdbnqw">&quot;default-src &#39;self&#39;; script-src &#39;self&#39;; style-src &#39;self&#39;; img-src &#39;self&#39; data:; font-src &#39;self&#39;; connect-src &#39;self&#39;; frame-src &#39;none&#39;; object-src &#39;none&#39;; base-uri &#39;self&#39;; form-action &#39;self&#39;;&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 10. 日志记录要求</span></span>
<span class="line"><span class="__shiki_1itgoe">        log_format </span><span class="__shiki_140thh">pci_dss </span><span class="__shiki_mdbnqw">&#39;$</span><span class="__shiki_140thh">remote_addr</span><span class="__shiki_mdbnqw"> - $</span><span class="__shiki_140thh">remote_user</span><span class="__shiki_mdbnqw"> [$</span><span class="__shiki_140thh">time_local</span><span class="__shiki_mdbnqw">] &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                           &#39;&quot;$</span><span class="__shiki_140thh">request</span><span class="__shiki_mdbnqw">&quot; $</span><span class="__shiki_140thh">status</span><span class="__shiki_mdbnqw"> $</span><span class="__shiki_140thh">body_bytes_sent</span><span class="__shiki_mdbnqw"> &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                           &#39;&quot;$</span><span class="__shiki_140thh">http_referer</span><span class="__shiki_mdbnqw">&quot; &quot;$</span><span class="__shiki_140thh">http_user_agent</span><span class="__shiki_mdbnqw">&quot; &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                           &#39;&quot;$</span><span class="__shiki_140thh">http_x_forwarded_for</span><span class="__shiki_mdbnqw">&quot; $</span><span class="__shiki_140thh">request_id</span><span class="__shiki_mdbnqw"> &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                           &#39;$</span><span class="__shiki_140thh">ssl_protocol</span><span class="__shiki_mdbnqw"> $</span><span class="__shiki_140thh">ssl_cipher</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        access_log </span><span class="__shiki_140thh">/var/log/nginx/pci_access.log pci_dss;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 11. 审计日志保留90天</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 通过logrotate配置</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 12. 敏感数据保护</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /card </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 禁止缓存包含敏感数据的页面</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">Cache-Control </span><span class="__shiki_mdbnqw">&quot;no-store, no-cache, must-revalidate, proxy-revalidate&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">Pragma </span><span class="__shiki_mdbnqw">&quot;no-cache&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">Expires </span><span class="__shiki_mdbnqw">&quot;0&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 防止敏感信息泄露</span></span>
<span class="line"><span class="__shiki_1itgoe">            sub_filter_types </span><span class="__shiki_140thh">text/html application/json;</span></span>
<span class="line"><span class="__shiki_1itgoe">            sub_filter </span><span class="__shiki_mdbnqw">&#39;card_number&#39;</span><span class="__shiki_mdbnqw"> &#39;[REDACTED]&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            sub_filter </span><span class="__shiki_mdbnqw">&#39;cvv&#39;</span><span class="__shiki_mdbnqw"> &#39;[REDACTED]&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            sub_filter </span><span class="__shiki_mdbnqw">&#39;expiry_date&#39;</span><span class="__shiki_mdbnqw"> &#39;[REDACTED]&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 13. 漏洞扫描豁免（如果需要）</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1itgoe"> ~*</span><span class="__shiki_21q97f"> \\.(xml|txt)$ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 允许安全扫描</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($http_user_agent </span><span class="__shiki_1itgoe">~* </span><span class="__shiki_mdbnqw">&quot;(nessus|openvas|qualys)&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                # 记录但不阻止</span></span>
<span class="line"><span class="__shiki_1itgoe">                access_log </span><span class="__shiki_140thh">/var/log/nginx/scanners.log;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_10-2-安全审计配置" tabindex="-1">10.2 安全审计配置 <a class="header-anchor" href="#_10-2-安全审计配置" aria-label="Permalink to &quot;10.2 安全审计配置&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 安全审计配置</span></span>
<span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 审计日志格式</span></span>
<span class="line"><span class="__shiki_1itgoe">    log_format </span><span class="__shiki_140thh">audit </span><span class="__shiki_mdbnqw">&#39;time:$</span><span class="__shiki_140thh">time_local</span><span class="__shiki_mdbnqw">|&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;client:$</span><span class="__shiki_140thh">remote_addr</span><span class="__shiki_mdbnqw">|&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;user:$</span><span class="__shiki_140thh">remote_user</span><span class="__shiki_mdbnqw">|&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;method:$</span><span class="__shiki_140thh">request_method</span><span class="__shiki_mdbnqw">|&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;uri:$</span><span class="__shiki_140thh">request_uri</span><span class="__shiki_mdbnqw">|&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;protocol:$</span><span class="__shiki_140thh">server_protocol</span><span class="__shiki_mdbnqw">|&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;status:$</span><span class="__shiki_140thh">status</span><span class="__shiki_mdbnqw">|&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;bytes:$</span><span class="__shiki_140thh">body_bytes_sent</span><span class="__shiki_mdbnqw">|&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;referer:$</span><span class="__shiki_140thh">http_referer</span><span class="__shiki_mdbnqw">|&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;agent:$</span><span class="__shiki_140thh">http_user_agent</span><span class="__shiki_mdbnqw">|&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;forwarded:$</span><span class="__shiki_140thh">http_x_forwarded_for</span><span class="__shiki_mdbnqw">|&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;response_time:$</span><span class="__shiki_140thh">request_time</span><span class="__shiki_mdbnqw">|&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;upstream_time:$</span><span class="__shiki_140thh">upstream_response_time</span><span class="__shiki_mdbnqw">|&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;ssl_proto:$</span><span class="__shiki_140thh">ssl_protocol</span><span class="__shiki_mdbnqw">|&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;ssl_cipher:$</span><span class="__shiki_140thh">ssl_cipher</span><span class="__shiki_mdbnqw">|&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;host:$</span><span class="__shiki_140thh">http_host</span><span class="__shiki_mdbnqw">|&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;server:$</span><span class="__shiki_140thh">server_name</span><span class="__shiki_mdbnqw">|&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;geo_country:$</span><span class="__shiki_140thh">geoip_country_code</span><span class="__shiki_mdbnqw">|&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;geo_city:$</span><span class="__shiki_140thh">geoip_city</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 完整审计日志</span></span>
<span class="line"><span class="__shiki_1itgoe">        access_log </span><span class="__shiki_140thh">/var/log/nginx/audit_full.log audit;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 安全事件日志</span></span>
<span class="line"><span class="__shiki_1itgoe">        access_log </span><span class="__shiki_140thh">/var/log/nginx/security_events.log audit if=$security_event;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 定义安全事件</span></span>
<span class="line"><span class="__shiki_1itgoe">        set </span><span class="__shiki_140thh">$security_event </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 管理员操作</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /admin </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$security_event </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 记录详细操作</span></span>
<span class="line"><span class="__shiki_1itgoe">            log_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> audit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">audit_log</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> entry </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                    time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">time_local</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">remote_user</span><span class="__shiki_1itgoe"> or</span><span class="__shiki_mdbnqw"> &quot;anonymous&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    action </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">request_uri</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    method </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">request_method</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    ip </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">remote_addr</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">status</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                audit:lpush(&quot;admin_actions&quot;, require(&quot;cjson&quot;).encode(entry))</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 文件上传审计</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /upload </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$security_event </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            log_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> uploads </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">upload_audit</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> info </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                    time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">time_local</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    ip </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">remote_addr</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    filename </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">request_filename</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">content_length</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">remote_user</span><span class="__shiki_1itgoe"> or</span><span class="__shiki_mdbnqw"> &quot;anonymous&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                uploads:lpush(&quot;uploads&quot;, require(&quot;cjson&quot;).encode(info))</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 登录尝试审计</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /login </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$security_event </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            log_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> logins </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">login_audit</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> attempt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                    time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">time_local</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    ip </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">remote_addr</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">arg_username</span><span class="__shiki_1itgoe"> or</span><span class="__shiki_mdbnqw"> &quot;unknown&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    success </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_dzsirb"> 200</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    user_agent </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">http_user_agent</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                logins:lpush(&quot;attempts&quot;, require(&quot;cjson&quot;).encode(attempt))</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 审计查询端点</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /audit/report </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 严格访问控制</span></span>
<span class="line"><span class="__shiki_1itgoe">            allow </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            allow </span><span class="__shiki_140thh">192.168.1.0/24;</span></span>
<span class="line"><span class="__shiki_1itgoe">            deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            auth_basic </span><span class="__shiki_mdbnqw">&quot;Audit Access&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            auth_basic_user_file </span><span class="__shiki_140thh">/etc/nginx/.htpasswd_audit;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> report_type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">arg_type</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> start_date </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">arg_start</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> end_date </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">arg_end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> reports </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> report_type == </span><span class="__shiki_mdbnqw">&quot;admin&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> audit = ngx.shared.audit_log</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> entries = audit:lrange(</span><span class="__shiki_mdbnqw">&quot;admin_actions&quot;</span><span class="__shiki_140thh">, 0, 100)</span></span>
<span class="line"><span class="__shiki_140thh">                    reports.</span><span class="__shiki_1itgoe">admin_actions</span><span class="__shiki_140thh"> = entries</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">                elseif</span><span class="__shiki_140thh"> report_type == </span><span class="__shiki_mdbnqw">&quot;uploads&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> uploads = ngx.shared.upload_audit</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> entries = uploads:lrange(</span><span class="__shiki_mdbnqw">&quot;uploads&quot;</span><span class="__shiki_140thh">, 0, 100)</span></span>
<span class="line"><span class="__shiki_140thh">                    reports.</span><span class="__shiki_1itgoe">uploads</span><span class="__shiki_140thh"> = entries</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">                elseif</span><span class="__shiki_140thh"> report_type == </span><span class="__shiki_mdbnqw">&quot;logins&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> logins = ngx.shared.login_audit</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> entries = logins:lrange(</span><span class="__shiki_mdbnqw">&quot;attempts&quot;</span><span class="__shiki_140thh">, 0, 100)</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    -- 分析登录模式</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> failed_attempts = 0</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> ip_attempts = {}</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">                    for</span><span class="__shiki_140thh"> _, entry_json in ipairs(entries) do</span></span>
<span class="line"><span class="__shiki_1itgoe">                        local</span><span class="__shiki_140thh"> entry = require(</span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span><span class="__shiki_140thh">).decode(entry_json)</span></span>
<span class="line"><span class="__shiki_1itgoe">                        if</span><span class="__shiki_140thh"> not entry.success then</span></span>
<span class="line"><span class="__shiki_1itgoe">                            failed_attempts</span><span class="__shiki_140thh"> = failed_attempts + 1</span></span>
<span class="line"><span class="__shiki_140thh">                            ip_attempts[entry.ip] = (ip_attempts[entry.ip] </span><span class="__shiki_1itgoe">or</span><span class="__shiki_140thh"> 0) + 1</span></span>
<span class="line"><span class="__shiki_1itgoe">                        end</span></span>
<span class="line"><span class="__shiki_1itgoe">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    reports.</span><span class="__shiki_1itgoe">login_analysis</span><span class="__shiki_140thh"> = {</span></span>
<span class="line"><span class="__shiki_1itgoe">                        total_attempts</span><span class="__shiki_140thh"> = </span><span class="__shiki_21nrsd">#entries,</span></span>
<span class="line"><span class="__shiki_1itgoe">                        failed_attempts</span><span class="__shiki_140thh"> = failed_attempts,</span></span>
<span class="line"><span class="__shiki_1itgoe">                        suspicious_ips</span><span class="__shiki_140thh"> = ip_attempts</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">                elseif</span><span class="__shiki_140thh"> report_type == </span><span class="__shiki_mdbnqw">&quot;summary&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                    -- 生成摘要报告</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> summary = {</span></span>
<span class="line"><span class="__shiki_1itgoe">                        timestamp</span><span class="__shiki_140thh"> = ngx.now(),</span></span>
<span class="line"><span class="__shiki_1itgoe">                        server</span><span class="__shiki_140thh"> = ngx.var.server_name,</span></span>
<span class="line"><span class="__shiki_140thh">                        uptime = get_uptime()</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    -- 获取各种统计</span></span>
<span class="line"><span class="__shiki_140thh">                    summary.connections = get_connection_count()</span></span>
<span class="line"><span class="__shiki_140thh">                    summary.requests = get_request_count()</span></span>
<span class="line"><span class="__shiki_140thh">                    summary.attacks = get_attack_count()</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    reports.summary = summary</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                ngx.header[</span><span class="__shiki_mdbnqw">&quot;Content-Type&quot;</span><span class="__shiki_140thh">] = </span><span class="__shiki_mdbnqw">&quot;application/json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.say(require(</span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span><span class="__shiki_140thh">).encode(reports))</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第十一部分-容器化环境安全" tabindex="-1">第十一部分：容器化环境安全 <a class="header-anchor" href="#第十一部分-容器化环境安全" aria-label="Permalink to &quot;第十一部分：容器化环境安全&quot;">​</a></h2><h3 id="_11-1-docker容器安全配置" tabindex="-1">11.1 Docker容器安全配置 <a class="header-anchor" href="#_11-1-docker容器安全配置" aria-label="Permalink to &quot;11.1 Docker容器安全配置&quot;">​</a></h3><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Dockerfile.nginx-secure</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> nginx:alpine</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 安全基础配置</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> apk add --no-cache \\</span></span>
<span class="line"><span class="__shiki_140thh">    openssl \\</span></span>
<span class="line"><span class="__shiki_140thh">    apache2-utils \\</span></span>
<span class="line"><span class="__shiki_140thh">    geoip \\</span></span>
<span class="line"><span class="__shiki_140thh">    geoip-dev \\</span></span>
<span class="line"><span class="__shiki_140thh">    libmaxminddb \\</span></span>
<span class="line"><span class="__shiki_140thh">    &amp;&amp; rm -rf /var/cache/apk/*</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建非root用户</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> addgroup -S nginx &amp;&amp; \\</span></span>
<span class="line"><span class="__shiki_140thh">    adduser -S -G nginx nginx &amp;&amp; \\</span></span>
<span class="line"><span class="__shiki_140thh">    chown -R nginx:nginx /var/cache/nginx &amp;&amp; \\</span></span>
<span class="line"><span class="__shiki_140thh">    chown -R nginx:nginx /var/log/nginx</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 安全目录结构</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> mkdir -p /etc/nginx/ssl &amp;&amp; \\</span></span>
<span class="line"><span class="__shiki_140thh">    mkdir -p /etc/nginx/conf.d &amp;&amp; \\</span></span>
<span class="line"><span class="__shiki_140thh">    mkdir -p /var/log/nginx/secure &amp;&amp; \\</span></span>
<span class="line"><span class="__shiki_140thh">    chmod -R 755 /etc/nginx &amp;&amp; \\</span></span>
<span class="line"><span class="__shiki_140thh">    chmod 644 /etc/nginx/nginx.conf</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 复制安全配置</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> nginx-security.conf /etc/nginx/conf.d/security.conf</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> ssl/ /etc/nginx/ssl/</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> html/ /usr/share/nginx/html/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置安全权限</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> chown -R nginx:nginx /etc/nginx/ssl &amp;&amp; \\</span></span>
<span class="line"><span class="__shiki_140thh">    chmod 600 /etc/nginx/ssl/*.key &amp;&amp; \\</span></span>
<span class="line"><span class="__shiki_140thh">    chmod 644 /etc/nginx/ssl/*.crt &amp;&amp; \\</span></span>
<span class="line"><span class="__shiki_140thh">    chown -R nginx:nginx /usr/share/nginx/html &amp;&amp; \\</span></span>
<span class="line"><span class="__shiki_140thh">    chmod -R 755 /usr/share/nginx/html</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 移除默认配置</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> rm -f /etc/nginx/conf.d/default.conf</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 切换到非root用户</span></span>
<span class="line"><span class="__shiki_1itgoe">USER</span><span class="__shiki_140thh"> nginx</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 健康检查</span></span>
<span class="line"><span class="__shiki_1itgoe">HEALTHCHECK</span><span class="__shiki_140thh"> --interval=30s --timeout=3s --start-period=5s --retries=3 \\</span></span>
<span class="line"><span class="__shiki_1itgoe">    CMD</span><span class="__shiki_140thh"> curl -f http://localhost/health || exit 1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 暴露端口</span></span>
<span class="line"><span class="__shiki_1itgoe">EXPOSE</span><span class="__shiki_140thh"> 80 443</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 启动命令</span></span>
<span class="line"><span class="__shiki_1itgoe">CMD</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;nginx&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;-g&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;daemon off;&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># docker-compose.secure.yml</span></span>
<span class="line"><span class="__shiki_17hn0y">version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;3.8&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">services</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  nginx-secure</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    build</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      context</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">.</span></span>
<span class="line"><span class="__shiki_17hn0y">      dockerfile</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Dockerfile.nginx-secure</span></span>
<span class="line"><span class="__shiki_17hn0y">    container_name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx-secure</span></span>
<span class="line"><span class="__shiki_17hn0y">    restart</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">unless-stopped</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;80:80&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;443:443&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 只读配置卷</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">./nginx.conf:/etc/nginx/nginx.conf:ro</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">./conf.d:/etc/nginx/conf.d:ro</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">./ssl:/etc/nginx/ssl:ro</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 日志卷</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">nginx-logs:/var/log/nginx</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 临时文件卷</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">nginx-tmp:/var/cache/nginx</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 只读网站文件</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">./html:/usr/share/nginx/html:ro</span></span>
<span class="line"><span class="__shiki_17hn0y">    environment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">NGINX_ENV=production</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">TZ=UTC</span></span>
<span class="line"><span class="__shiki_17hn0y">    security_opt</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">no-new-privileges:true</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">seccomp=unconfined</span></span>
<span class="line"><span class="__shiki_17hn0y">    cap_drop</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">ALL</span></span>
<span class="line"><span class="__shiki_17hn0y">    cap_add</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">NET_BIND_SERVICE</span></span>
<span class="line"><span class="__shiki_17hn0y">    read_only</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    tmpfs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">/tmp</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">/var/run</span></span>
<span class="line"><span class="__shiki_17hn0y">    networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">frontend</span></span>
<span class="line"><span class="__shiki_17hn0y">    logging</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      driver</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;json-file&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      options</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        max-size</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        max-file</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;3&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  nginx-logs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  nginx-tmp</span><span class="__shiki_140thh">:</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  frontend</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    driver</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bridge</span></span>
<span class="line"><span class="__shiki_17hn0y">    ipam</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">subnet</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">172.20.0.0/24</span></span></code></pre></div><h3 id="_11-2-kubernetes安全配置" tabindex="-1">11.2 Kubernetes安全配置 <a class="header-anchor" href="#_11-2-kubernetes安全配置" aria-label="Permalink to &quot;11.2 Kubernetes安全配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># nginx-security-deployment.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx-secure</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">  labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx</span></span>
<span class="line"><span class="__shiki_17hn0y">    security</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">hardened</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx</span></span>
<span class="line"><span class="__shiki_17hn0y">        security</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">hardened</span></span>
<span class="line"><span class="__shiki_17hn0y">      annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        sidecar.istio.io/inject</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;false&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 安全上下文</span></span>
<span class="line"><span class="__shiki_17hn0y">      securityContext</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        runAsNonRoot</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">        runAsUser</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">101</span><span class="__shiki_21nrsd">  # nginx用户ID</span></span>
<span class="line"><span class="__shiki_17hn0y">        runAsGroup</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">101</span></span>
<span class="line"><span class="__shiki_17hn0y">        fsGroup</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">101</span></span>
<span class="line"><span class="__shiki_17hn0y">        seccompProfile</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">RuntimeDefault</span></span>
<span class="line"><span class="__shiki_17hn0y">        capabilities</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          drop</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            - </span><span class="__shiki_mdbnqw">ALL</span></span>
<span class="line"><span class="__shiki_17hn0y">          add</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            - </span><span class="__shiki_mdbnqw">NET_BIND_SERVICE</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 服务账户</span></span>
<span class="line"><span class="__shiki_17hn0y">      serviceAccountName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx-service-account</span></span>
<span class="line"><span class="__shiki_17hn0y">      automountServiceAccountToken</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 容器定义</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx-secure:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">        imagePullPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Always</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 资源限制</span></span>
<span class="line"><span class="__shiki_17hn0y">        resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;256Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;500m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;128Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100m&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 安全配置</span></span>
<span class="line"><span class="__shiki_17hn0y">        securityContext</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          allowPrivilegeEscalation</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">          readOnlyRootFilesystem</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">          privileged</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 端口</span></span>
<span class="line"><span class="__shiki_17hn0y">        ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">containerPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http</span></span>
<span class="line"><span class="__shiki_17hn0y">          protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">containerPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">443</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">https</span></span>
<span class="line"><span class="__shiki_17hn0y">          protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 健康检查</span></span>
<span class="line"><span class="__shiki_17hn0y">        livenessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          httpGet</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/health</span></span>
<span class="line"><span class="__shiki_17hn0y">            port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_17hn0y">            scheme</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HTTP</span></span>
<span class="line"><span class="__shiki_17hn0y">          initialDelaySeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span></span>
<span class="line"><span class="__shiki_17hn0y">          periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_17hn0y">          timeoutSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_17hn0y">          failureThreshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">        readinessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          httpGet</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/health</span></span>
<span class="line"><span class="__shiki_17hn0y">            port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_17hn0y">            scheme</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HTTP</span></span>
<span class="line"><span class="__shiki_17hn0y">          initialDelaySeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_17hn0y">          periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 环境变量</span></span>
<span class="line"><span class="__shiki_17hn0y">        env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NGINX_ENV</span></span>
<span class="line"><span class="__shiki_17hn0y">          value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;production&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">POD_IP</span></span>
<span class="line"><span class="__shiki_17hn0y">          valueFrom</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            fieldRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">              fieldPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">status.podIP</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 挂载点</span></span>
<span class="line"><span class="__shiki_17hn0y">        volumeMounts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/etc/nginx/nginx.conf</span></span>
<span class="line"><span class="__shiki_17hn0y">          subPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx.conf</span></span>
<span class="line"><span class="__shiki_17hn0y">          readOnly</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/etc/nginx/conf.d</span></span>
<span class="line"><span class="__shiki_17hn0y">          readOnly</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ssl-certs</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/etc/nginx/ssl</span></span>
<span class="line"><span class="__shiki_17hn0y">          readOnly</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">html</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/usr/share/nginx/html</span></span>
<span class="line"><span class="__shiki_17hn0y">          readOnly</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx-logs</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/var/log/nginx</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">tmp</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/tmp</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 卷定义</span></span>
<span class="line"><span class="__shiki_17hn0y">      volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config</span></span>
<span class="line"><span class="__shiki_17hn0y">        configMap</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx-config</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ssl-certs</span></span>
<span class="line"><span class="__shiki_17hn0y">        secret</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          secretName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx-ssl-certs</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">html</span></span>
<span class="line"><span class="__shiki_17hn0y">        emptyDir</span><span class="__shiki_140thh">: {}</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx-logs</span></span>
<span class="line"><span class="__shiki_17hn0y">        emptyDir</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          sizeLimit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">1Gi</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">tmp</span></span>
<span class="line"><span class="__shiki_17hn0y">        emptyDir</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          medium</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Memory</span></span>
<span class="line"><span class="__shiki_17hn0y">          sizeLimit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">128Mi</span></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_21nrsd"># 服务账户</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ServiceAccount</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx-service-account</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">automountServiceAccountToken</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_21nrsd"># 网络策略</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx-network-policy</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx</span></span>
<span class="line"><span class="__shiki_17hn0y">  policyTypes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Egress</span></span>
<span class="line"><span class="__shiki_17hn0y">  ingress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">internal</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">443</span></span>
<span class="line"><span class="__shiki_17hn0y">  egress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">backend</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_21nrsd"># 服务定义</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx-service</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    service.beta.kubernetes.io/aws-load-balancer-ssl-cert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;arn:aws:acm:us-east-1:123456789012:certificate/xxxxxx&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    service.beta.kubernetes.io/aws-load-balancer-backend-protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;http&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    service.beta.kubernetes.io/aws-load-balancer-ssl-ports</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;443&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx</span></span>
<span class="line"><span class="__shiki_17hn0y">  ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http</span></span>
<span class="line"><span class="__shiki_17hn0y">    port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_17hn0y">    targetPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_17hn0y">    protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">https</span></span>
<span class="line"><span class="__shiki_17hn0y">    port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">443</span></span>
<span class="line"><span class="__shiki_17hn0y">    targetPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">443</span></span>
<span class="line"><span class="__shiki_17hn0y">    protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">  type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">LoadBalancer</span></span></code></pre></div><h2 id="第十二部分-持续安全监控与维护" tabindex="-1">第十二部分：持续安全监控与维护 <a class="header-anchor" href="#第十二部分-持续安全监控与维护" aria-label="Permalink to &quot;第十二部分：持续安全监控与维护&quot;">​</a></h2><h3 id="_12-1-自动化安全扫描" tabindex="-1">12.1 自动化安全扫描 <a class="header-anchor" href="#_12-1-自动化安全扫描" aria-label="Permalink to &quot;12.1 自动化安全扫描&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># /usr/local/bin/nginx-security-scan.sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Nginx安全扫描脚本</span></span>
<span class="line"><span class="__shiki_140thh">SCAN_DIR</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/tmp/nginx_scan_$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%Y%m%d_%H%M%S)&quot;</span></span>
<span class="line"><span class="__shiki_140thh">LOG_FILE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/var/log/nginx/security_scan.log&quot;</span></span>
<span class="line"><span class="__shiki_140thh">REPORT_FILE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/var/log/nginx/security_report_$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%Y%m%d).html&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建扫描目录</span></span>
<span class="line"><span class="__shiki_1t8gfj">mkdir</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_140thh"> $SCAN_DIR</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;Starting Nginx security scan at $(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw">)&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> tee</span><span class="__shiki_dzsirb"> -a</span><span class="__shiki_140thh"> $LOG_FILE</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 配置文件检查</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;1. Checking Nginx configuration...&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> tee</span><span class="__shiki_dzsirb"> -a</span><span class="__shiki_140thh"> $LOG_FILE</span></span>
<span class="line"><span class="__shiki_1t8gfj">nginx</span><span class="__shiki_dzsirb"> -t</span><span class="__shiki_1itgoe"> 2&gt;&amp;1</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> tee</span><span class="__shiki_dzsirb"> -a</span><span class="__shiki_140thh"> $LOG_FILE</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 权限检查</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;2. Checking file permissions...&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> tee</span><span class="__shiki_dzsirb"> -a</span><span class="__shiki_140thh"> $LOG_FILE</span></span>
<span class="line"><span class="__shiki_1t8gfj">find</span><span class="__shiki_mdbnqw"> /etc/nginx</span><span class="__shiki_dzsirb"> -type</span><span class="__shiki_mdbnqw"> f</span><span class="__shiki_dzsirb"> -exec</span><span class="__shiki_mdbnqw"> ls</span><span class="__shiki_dzsirb"> -la</span><span class="__shiki_mdbnqw"> {}</span><span class="__shiki_dzsirb"> \\;</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> tee</span><span class="__shiki_dzsirb"> -a</span><span class="__shiki_140thh"> $SCAN_DIR</span><span class="__shiki_mdbnqw">/permissions.txt</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. SSL检查</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;3. Checking SSL configuration...&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> tee</span><span class="__shiki_dzsirb"> -a</span><span class="__shiki_140thh"> $LOG_FILE</span></span>
<span class="line"><span class="__shiki_1t8gfj">openssl</span><span class="__shiki_mdbnqw"> s_client</span><span class="__shiki_dzsirb"> -connect</span><span class="__shiki_mdbnqw"> localhost:443</span><span class="__shiki_dzsirb"> -servername</span><span class="__shiki_mdbnqw"> example.com</span><span class="__shiki_dzsirb"> -tlsextdebug</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_1t8gfj">    openssl</span><span class="__shiki_mdbnqw"> x509</span><span class="__shiki_dzsirb"> -noout</span><span class="__shiki_dzsirb"> -text</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -A1</span><span class="__shiki_dzsirb"> -B1</span><span class="__shiki_mdbnqw"> &quot;Signature Algorithm&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> tee</span><span class="__shiki_dzsirb"> -a</span><span class="__shiki_140thh"> $SCAN_DIR</span><span class="__shiki_mdbnqw">/ssl.txt</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 安全头检查</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;4. Checking security headers...&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> tee</span><span class="__shiki_dzsirb"> -a</span><span class="__shiki_140thh"> $LOG_FILE</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -sI</span><span class="__shiki_mdbnqw"> https://example.com</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_mdbnqw"> &quot;x-&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> tee</span><span class="__shiki_dzsirb"> -a</span><span class="__shiki_140thh"> $SCAN_DIR</span><span class="__shiki_mdbnqw">/headers.txt</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 漏洞扫描</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;5. Running vulnerability scan...&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> tee</span><span class="__shiki_dzsirb"> -a</span><span class="__shiki_140thh"> $LOG_FILE</span></span>
<span class="line"><span class="__shiki_21nrsd"># 使用nmap扫描</span></span>
<span class="line"><span class="__shiki_1t8gfj">nmap</span><span class="__shiki_dzsirb"> -sV</span><span class="__shiki_dzsirb"> --script</span><span class="__shiki_mdbnqw"> http-vuln</span><span class="__shiki_dzsirb">*</span><span class="__shiki_mdbnqw"> localhost</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> 80,443</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> tee</span><span class="__shiki_dzsirb"> -a</span><span class="__shiki_140thh"> $SCAN_DIR</span><span class="__shiki_mdbnqw">/vuln_scan.txt</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 6. 日志分析</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;6. Analyzing logs for attacks...&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> tee</span><span class="__shiki_dzsirb"> -a</span><span class="__shiki_140thh"> $LOG_FILE</span></span>
<span class="line"><span class="__shiki_21nrsd"># 检查恶意请求</span></span>
<span class="line"><span class="__shiki_1t8gfj">grep</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_mdbnqw"> &quot;sql\\|xss\\|script\\|union\\|select&quot;</span><span class="__shiki_mdbnqw"> /var/log/nginx/access.log</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> tail</span><span class="__shiki_dzsirb"> -20</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> tee</span><span class="__shiki_dzsirb"> -a</span><span class="__shiki_140thh"> $SCAN_DIR</span><span class="__shiki_mdbnqw">/malicious_requests.txt</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 7. 生成HTML报告</span></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_140thh"> $REPORT_FILE </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_mdbnqw"> EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">&lt;html&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">&lt;head&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;title&gt;Nginx Security Scan Report - $(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw">)&lt;/title&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;style&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        body { font-family: Arial, sans-serif; margin: 20px; }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        .section { margin-bottom: 30px; }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        .success { color: green; }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        .warning { color: orange; }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        .error { color: red; }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        pre { background: #f4f4f4; padding: 10px; }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;/style&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">&lt;/head&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">&lt;body&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;h1&gt;Nginx Security Scan Report&lt;/h1&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;p&gt;Generated: $(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw">)&lt;/p&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;div class=&quot;section&quot;&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &lt;h2&gt;1. Configuration Check&lt;/h2&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &lt;pre&gt;$(</span><span class="__shiki_1t8gfj">nginx</span><span class="__shiki_dzsirb"> -t</span><span class="__shiki_1itgoe"> 2&gt;&amp;1</span><span class="__shiki_mdbnqw">)&lt;/pre&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;/div&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;div class=&quot;section&quot;&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &lt;h2&gt;2. Security Headers&lt;/h2&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &lt;pre&gt;$(</span><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -sI</span><span class="__shiki_mdbnqw"> https://example.com </span><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_mdbnqw"> &quot;x-&quot;)&lt;/pre&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;/div&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;div class=&quot;section&quot;&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &lt;h2&gt;3. Recent Suspicious Requests&lt;/h2&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &lt;pre&gt;$(</span><span class="__shiki_1t8gfj">tail</span><span class="__shiki_dzsirb"> -50</span><span class="__shiki_mdbnqw"> /var/log/nginx/malicious.log </span><span class="__shiki_1itgoe">2&gt;</span><span class="__shiki_mdbnqw">/dev/null </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> echo</span><span class="__shiki_mdbnqw"> &quot;No suspicious requests found&quot;)&lt;/pre&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;/div&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;div class=&quot;section&quot;&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &lt;h2&gt;4. SSL/TLS Configuration&lt;/h2&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &lt;pre&gt;$(</span><span class="__shiki_1t8gfj">openssl</span><span class="__shiki_mdbnqw"> s_client </span><span class="__shiki_dzsirb">-connect</span><span class="__shiki_mdbnqw"> localhost:443 </span><span class="__shiki_dzsirb">-servername</span><span class="__shiki_mdbnqw"> example.com </span><span class="__shiki_dzsirb">-tlsextdebug</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null </span><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> openssl</span><span class="__shiki_mdbnqw"> x509 </span><span class="__shiki_dzsirb">-noout</span><span class="__shiki_dzsirb"> -text</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -A5</span><span class="__shiki_mdbnqw"> &quot;Issuer:\\|Subject:&quot; </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> echo</span><span class="__shiki_mdbnqw"> &quot;SSL check failed&quot;)&lt;/pre&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;/div&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">&lt;/body&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">&lt;/html&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;Scan completed. Report saved to </span><span class="__shiki_140thh">$REPORT_FILE</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> tee</span><span class="__shiki_dzsirb"> -a</span><span class="__shiki_140thh"> $LOG_FILE</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 发送报告</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_1itgoe">-f</span><span class="__shiki_140thh"> $REPORT_FILE ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;Security scan report attached&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_1t8gfj">        mail</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_mdbnqw"> &quot;Nginx Security Scan Report - $(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw">)&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">             -a</span><span class="__shiki_140thh"> $REPORT_FILE </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_mdbnqw">             admin@example.com</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 清理</span></span>
<span class="line"><span class="__shiki_1t8gfj">rm</span><span class="__shiki_dzsirb"> -rf</span><span class="__shiki_140thh"> $SCAN_DIR</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置cron定时任务</span></span>
<span class="line"><span class="__shiki_21nrsd"># 0 3 * * 0 /usr/local/bin/nginx-security-scan.sh</span></span></code></pre></div><h3 id="_12-2-持续安全监控" tabindex="-1">12.2 持续安全监控 <a class="header-anchor" href="#_12-2-持续安全监控" aria-label="Permalink to &quot;12.2 持续安全监控&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 实时安全监控配置</span></span>
<span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> security_metrics </span><span class="__shiki_dzsirb">10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> threat_intelligence </span><span class="__shiki_dzsirb">50m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    init_worker_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 初始化威胁情报</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> threat </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">threat_intelligence</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 加载已知恶意IP列表</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 可以从外部源获取</span></span>
<span class="line"><span class="__shiki_1t8gfj">        threat</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;malicious_ips_last_update&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 更新威胁情报</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_1t8gfj"> update_handler</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(premature)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> premature </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">                update_threat_intelligence</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> ok, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">timer</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">at</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">3600</span><span class="__shiki_140thh">, update_handler)  </span><span class="__shiki_21nrsd">-- 每小时更新</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_1t8gfj">timer</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">at</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, update_handler)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 实时监控</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_1t8gfj"> monitor_handler</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(premature)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> premature </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">                analyze_traffic_patterns</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_dzsirb">                detect_anomalies</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_dzsirb">                generate_alerts</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> ok, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">timer</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">at</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">, monitor_handler)  </span><span class="__shiki_21nrsd">-- 每分钟分析</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_1t8gfj">timer</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">at</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">, monitor_handler)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            access_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 实时威胁检测</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> threat </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">threat_intelligence</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> ip </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">remote_addr</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 检查已知恶意IP</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1t8gfj"> threat</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ip:&quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> ip) </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">WARN</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;Request from known malicious IP: &quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> ip)</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">exit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">403</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 行为分析</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> metrics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">security_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> ip_key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;behavior:&quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> ip</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> behavior </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> metrics</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(ip_key) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 分析请求模式</span></span>
<span class="line"><span class="__shiki_140thh">                analyze_request_pattern(ip, behavior)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 检测异常</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> is_anomalous(behavior) then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.log(ngx.WARN, &quot;</span><span class="__shiki_1itgoe">Anomalous</span><span class="__shiki_140thh"> behavior detected from </span><span class="__shiki_mdbnqw">&quot; .. ip)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    -- 可选：重定向到验证页面或应用更严格的限制</span></span>
<span class="line"><span class="__shiki_mdbnqw">                end</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            log_by_lua_block {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                -- 记录安全指标</span></span>
<span class="line"><span class="__shiki_mdbnqw">                local metrics = ngx.shared.security_metrics</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                -- 请求计数</span></span>
<span class="line"><span class="__shiki_mdbnqw">                metrics:incr(&quot;</span><span class="__shiki_140thh">total_requests</span><span class="__shiki_mdbnqw">&quot;, 1)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                -- 按IP计数</span></span>
<span class="line"><span class="__shiki_mdbnqw">                local ip_key = &quot;</span><span class="__shiki_140thh">ip_requests:</span><span class="__shiki_mdbnqw">&quot; .. ngx.var.remote_addr</span></span>
<span class="line"><span class="__shiki_mdbnqw">                metrics:incr(ip_key, 1)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                metrics:expire(ip_key, 300)  -- 5分钟过期</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                -- 检测攻击</span></span>
<span class="line"><span class="__shiki_mdbnqw">                if ngx.var.status &gt;= 400 then</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    metrics:incr(&quot;</span><span class="__shiki_140thh">error_requests</span><span class="__shiki_mdbnqw">&quot;, 1)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                end</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                if ngx.var.blocked == &quot;</span><span class="__shiki_140thh">1</span><span class="__shiki_mdbnqw">&quot; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    metrics:incr(&quot;</span><span class="__shiki_140thh">blocked_requests</span><span class="__shiki_mdbnqw">&quot;, 1)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    </span></span>
<span class="line"><span class="__shiki_mdbnqw">                    -- 记录攻击者IP</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    local attackers = ngx.shared.attackers</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    attackers:incr(ngx.var.remote_addr, 1, 3600)  -- 1小时过期</span></span>
<span class="line"><span class="__shiki_mdbnqw">                end</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        # 安全仪表板</span></span>
<span class="line"><span class="__shiki_mdbnqw">        location /security/dashboard {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            # 严格访问控制</span></span>
<span class="line"><span class="__shiki_mdbnqw">            allow 127.0.0.1;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            allow 192.168.1.0/24;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            deny all;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            auth_basic &quot;</span><span class="__shiki_140thh">Security Dashboard</span><span class="__shiki_mdbnqw">&quot;;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            auth_basic_user_file /etc/nginx/.htpasswd_dashboard;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            content_by_lua_block {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                local metrics = ngx.shared.security_metrics</span></span>
<span class="line"><span class="__shiki_mdbnqw">                local threat = ngx.shared.threat_intelligence</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                local dashboard = {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    overview = {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        total_requests = metrics:get(&quot;</span><span class="__shiki_140thh">total_requests</span><span class="__shiki_mdbnqw">&quot;) or 0,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        blocked_requests = metrics:get(&quot;</span><span class="__shiki_140thh">blocked_requests</span><span class="__shiki_mdbnqw">&quot;) or 0,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        error_requests = metrics:get(&quot;</span><span class="__shiki_140thh">error_requests</span><span class="__shiki_mdbnqw">&quot;) or 0,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        active_attackers = 0,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        threat_level = &quot;</span><span class="__shiki_140thh">low</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    },</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    top_attackers = {},</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    recent_events = {},</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    system_health = {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        connections = get_connection_count(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        memory = get_memory_usage(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        cpu = get_cpu_usage()</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">                }</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                -- 获取攻击者列表</span></span>
<span class="line"><span class="__shiki_mdbnqw">                local attackers = ngx.shared.attackers</span></span>
<span class="line"><span class="__shiki_mdbnqw">                local attacker_keys = attackers:get_keys()</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                for _, key in ipairs(attacker_keys) do</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    local count = attackers:get(key) or 0</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    if count &gt; 0 then</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        dashboard.overview.active_attackers = dashboard.overview.active_attackers + 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        table.insert(dashboard.top_attackers, {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            ip = key,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            attacks = count</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        })</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    end</span></span>
<span class="line"><span class="__shiki_mdbnqw">                end</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                -- 计算威胁级别</span></span>
<span class="line"><span class="__shiki_mdbnqw">                local blocked_rate = 0</span></span>
<span class="line"><span class="__shiki_mdbnqw">                if dashboard.overview.total_requests &gt; 0 then</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    blocked_rate = dashboard.overview.blocked_requests / dashboard.overview.total_requests</span></span>
<span class="line"><span class="__shiki_mdbnqw">                end</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                if blocked_rate &gt; 0.1 then</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    dashboard.overview.threat_level = &quot;</span><span class="__shiki_140thh">high</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                elseif blocked_rate &gt; 0.05 then</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    dashboard.overview.threat_level = &quot;</span><span class="__shiki_140thh">medium</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                end</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                ngx.header[&quot;</span><span class="__shiki_140thh">Content-Type</span><span class="__shiki_mdbnqw">&quot;] = &quot;</span><span class="__shiki_140thh">application/json</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                ngx.say(require(&quot;</span><span class="__shiki_140thh">cjson</span><span class="__shiki_mdbnqw">&quot;).encode(dashboard))</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        # 威胁情报更新端点</span></span>
<span class="line"><span class="__shiki_mdbnqw">        location /security/threat-intel {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            internal;  # 仅内部访问</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            content_by_lua_block {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                local action = ngx.var.arg_action</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                if action == &quot;</span><span class="__shiki_140thh">update</span><span class="__shiki_mdbnqw">&quot; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    -- 更新威胁情报</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    local success = update_threat_intelligence()</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    ngx.say(&#39;{&quot;</span><span class="__shiki_140thh">status</span><span class="__shiki_mdbnqw">&quot;: &#39; .. tostring(success) .. &#39;}&#39;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    </span></span>
<span class="line"><span class="__shiki_mdbnqw">                elseif action == &quot;</span><span class="__shiki_140thh">list</span><span class="__shiki_mdbnqw">&quot; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    -- 列出威胁情报</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    local threat = ngx.shared.threat_intelligence</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    local keys = threat:get_keys()</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    </span></span>
<span class="line"><span class="__shiki_mdbnqw">                    local intel = {}</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    for _, key in ipairs(keys) do</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        if key:match(&quot;</span><span class="__shiki_140thh">^ip:</span><span class="__shiki_mdbnqw">&quot;) then</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            local ip = key:gsub(&quot;</span><span class="__shiki_140thh">^ip:</span><span class="__shiki_mdbnqw">&quot;, &quot;&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            table.insert(intel, {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                ip = ip,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                reason = threat:get(&quot;</span><span class="__shiki_140thh">reason:</span><span class="__shiki_mdbnqw">&quot; .. ip) or &quot;</span><span class="__shiki_140thh">unknown</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            })</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        end</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    end</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    </span></span>
<span class="line"><span class="__shiki_mdbnqw">                    ngx.header[&quot;</span><span class="__shiki_140thh">Content-Type</span><span class="__shiki_mdbnqw">&quot;] = &quot;</span><span class="__shiki_140thh">application/json</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    ngx.say(require(&quot;</span><span class="__shiki_140thh">cjson</span><span class="__shiki_mdbnqw">&quot;).encode(intel))</span></span>
<span class="line"><span class="__shiki_mdbnqw">                end</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">}</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>Nginx安全加固是一个持续的过程，需要从多个层面进行防护：</p><h3 id="关键安全实践总结" tabindex="-1">关键安全实践总结： <a class="header-anchor" href="#关键安全实践总结" aria-label="Permalink to &quot;关键安全实践总结：&quot;">​</a></h3><ol><li><p><strong>基础加固</strong>：</p><ul><li>隐藏版本信息</li><li>使用非root用户运行</li><li>配置适当的文件权限</li><li>移除不必要的模块</li></ul></li><li><p><strong>访问控制</strong>：</p><ul><li>实施IP黑白名单</li><li>配置速率限制</li><li>实现认证和授权</li><li>基于地理位置的访问控制</li></ul></li><li><p><strong>HTTPS安全</strong>：</p><ul><li>使用强TLS配置</li><li>启用HSTS</li><li>配置OCSP装订</li><li>定期更新证书</li></ul></li><li><p><strong>Web应用防护</strong>：</p><ul><li>部署WAF（ModSecurity/NAXSI）</li><li>输入验证和过滤</li><li>输出编码和过滤</li><li>内容安全策略</li></ul></li><li><p><strong>DDoS防护</strong>：</p><ul><li>连接和请求限制</li><li>基于行为的检测</li><li>集成CDN防护</li><li>自动攻击缓解</li></ul></li><li><p><strong>监控与审计</strong>：</p><ul><li>详细的日志记录</li><li>实时安全监控</li><li>定期安全扫描</li><li>合规性报告</li></ul></li><li><p><strong>应急响应</strong>：</p><ul><li>备份和恢复策略</li><li>应急操作流程</li><li>取证和调查工具</li><li>通信和通知机制</li></ul></li><li><p><strong>容器化安全</strong>：</p><ul><li>安全的Docker配置</li><li>Kubernetes安全上下文</li><li>网络策略</li><li>服务网格集成</li></ul></li></ol><h3 id="持续改进" tabindex="-1">持续改进： <a class="header-anchor" href="#持续改进" aria-label="Permalink to &quot;持续改进：&quot;">​</a></h3><ol><li><strong>定期评估</strong>：每月进行安全评估</li><li><strong>及时更新</strong>：保持Nginx和相关组件最新</li><li><strong>威胁情报</strong>：集成外部威胁情报源</li><li><strong>自动化测试</strong>：实施自动化安全测试</li><li><strong>团队培训</strong>：定期进行安全培训</li><li><strong>合规检查</strong>：确保符合相关法规和标准</li></ol><h3 id="工具推荐" tabindex="-1">工具推荐： <a class="header-anchor" href="#工具推荐" aria-label="Permalink to &quot;工具推荐：&quot;">​</a></h3><ol><li><strong>扫描工具</strong>：Nmap, Nikto, OpenVAS, Nessus</li><li><strong>WAF</strong>：ModSecurity, NAXSI</li><li><strong>监控工具</strong>：Prometheus, Grafana, ELK Stack</li><li><strong>SSL工具</strong>：SSL Labs, testssl.sh</li><li><strong>配置管理</strong>：Ansible, Puppet, Chef</li><li><strong>容器安全</strong>：Clair, Trivy, Anchore</li></ol><p>记住，安全是一个过程，而不是一个产品。通过实施这些最佳实践并持续监控和改进，可以显著提高Nginx部署的安全性。</p>`,71)])])}const r=a(p,[["render",l]]);export{d as __pageData,r as default};
