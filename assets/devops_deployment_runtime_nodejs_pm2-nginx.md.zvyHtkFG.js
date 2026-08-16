import{_ as a,o as n,c as p,a as i}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"devops/deployment/runtime/nodejs/pm2-nginx.md","filePath":"devops/deployment/runtime/nodejs/pm2-nginx.md"}'),_={name:"devops/deployment/runtime/nodejs/pm2-nginx.md"};function l(h,s,c,e,t,d){return n(),p("div",null,[...s[0]||(s[0]=[i(`<h2 id="📘-裸机-vm-部署-node-js-应用生产环境部署完整指南-pm2-nginx" tabindex="-1">📘 裸机/VM 部署：Node.js 应用生产环境部署完整指南（PM2 + Nginx） <a class="header-anchor" href="#📘-裸机-vm-部署-node-js-应用生产环境部署完整指南-pm2-nginx" aria-label="Permalink to &quot;📘 裸机/VM 部署：Node.js 应用生产环境部署完整指南（PM2 + Nginx）&quot;">​</a></h2><h3 id="一、架构全景-为什么需要-pm2-nginx-组合" tabindex="-1"><strong>一、架构全景：为什么需要 PM2 + Nginx 组合？</strong> <a class="header-anchor" href="#一、架构全景-为什么需要-pm2-nginx-组合" aria-label="Permalink to &quot;**一、架构全景：为什么需要 PM2 + Nginx 组合？**&quot;">​</a></h3><p>在生产环境中，单一的 Node.js 进程无法满足高可用、高性能和安全需求。PM2 与 Nginx 的组合形成了完整的生产级部署架构：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">互联网用户</span></span>
<span class="line"><span class="__shiki_wvjl67">     ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">   [Nginx]（反向代理/负载均衡/SSL终端）</span></span>
<span class="line"><span class="__shiki_wvjl67">     ↓ （反向代理）</span></span>
<span class="line"><span class="__shiki_wvjl67">   [PM2 Cluster]（多个Node.js进程实例）</span></span>
<span class="line"><span class="__shiki_wvjl67">     ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">   [Node.js Application]</span></span>
<span class="line"><span class="__shiki_wvjl67">     ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">   [数据库/Redis等后端服务]</span></span></code></pre></div><p><strong>PM2 的核心职责</strong>：</p><ul><li><strong>进程管理</strong>：守护进程、崩溃自动重启、集群模式</li><li><strong>资源监控</strong>：CPU/内存监控、日志集中管理</li><li><strong>零停机部署</strong>：滚动重启、热重载</li></ul><p><strong>Nginx 的核心职责</strong>：</p><ul><li><strong>反向代理</strong>：将外部请求转发到内部Node.js服务</li><li><strong>负载均衡</strong>：在多实例间分配流量（可配合PM2集群）</li><li><strong>SSL/TLS终端</strong>：处理HTTPS加密解密，减轻Node.js负担</li><li><strong>静态文件服务</strong>：高效提供图片、CSS、JS等静态资源</li><li><strong>安全防护</strong>：限制连接数、缓冲请求、防DDoS</li><li><strong>性能优化</strong>：Gzip压缩、缓存头部、连接复用</li></ul><h3 id="二、环境准备与基础安装" tabindex="-1"><strong>二、环境准备与基础安装</strong> <a class="header-anchor" href="#二、环境准备与基础安装" aria-label="Permalink to &quot;**二、环境准备与基础安装**&quot;">​</a></h3><h4 id="_1-操作系统优化-ubuntu-centos示例" tabindex="-1"><strong>1. 操作系统优化（Ubuntu/CentOS示例）</strong> <a class="header-anchor" href="#_1-操作系统优化-ubuntu-centos示例" aria-label="Permalink to &quot;**1. 操作系统优化（Ubuntu/CentOS示例）**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 更新系统</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> apt</span><span class="__shiki_mdbnqw"> update</span><span class="__shiki_140thh"> &amp;&amp; </span><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> apt</span><span class="__shiki_mdbnqw"> upgrade</span><span class="__shiki_dzsirb"> -y</span><span class="__shiki_21nrsd">  # Ubuntu/Debian</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> yum</span><span class="__shiki_mdbnqw"> update</span><span class="__shiki_dzsirb"> -y</span><span class="__shiki_21nrsd">                      # CentOS/RHEL</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 安装基础工具</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> apt</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_dzsirb"> -y</span><span class="__shiki_mdbnqw"> curl</span><span class="__shiki_mdbnqw"> wget</span><span class="__shiki_mdbnqw"> vim</span><span class="__shiki_mdbnqw"> net-tools</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 调整文件描述符限制（Nginx和高并发Node.js需要）</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;* soft nofile 65535</span></span>
<span class="line"><span class="__shiki_mdbnqw">* hard nofile 65535&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> sudo</span><span class="__shiki_mdbnqw"> tee</span><span class="__shiki_dzsirb"> -a</span><span class="__shiki_mdbnqw"> /etc/security/limits.conf</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 调整内核参数</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;net.core.somaxconn = 65535</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.ipv4.tcp_max_syn_backlog = 65535</span></span>
<span class="line"><span class="__shiki_mdbnqw">fs.file-max = 2097152&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> sudo</span><span class="__shiki_mdbnqw"> tee</span><span class="__shiki_dzsirb"> -a</span><span class="__shiki_mdbnqw"> /etc/sysctl.conf</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> sysctl</span><span class="__shiki_dzsirb"> -p</span></span></code></pre></div><h4 id="_2-node-js-环境部署" tabindex="-1"><strong>2. Node.js 环境部署</strong> <a class="header-anchor" href="#_2-node-js-环境部署" aria-label="Permalink to &quot;**2. Node.js 环境部署**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 方法1：使用NodeSource仓库安装（推荐）</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -fsSL</span><span class="__shiki_mdbnqw"> https://deb.nodesource.com/setup_18.x</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> sudo</span><span class="__shiki_dzsirb"> -E</span><span class="__shiki_mdbnqw"> bash</span><span class="__shiki_mdbnqw"> -</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> apt</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_dzsirb"> -y</span><span class="__shiki_mdbnqw"> nodejs</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 验证安装</span></span>
<span class="line"><span class="__shiki_1t8gfj">node</span><span class="__shiki_dzsirb"> --version</span><span class="__shiki_21nrsd">  # v18.x.x</span></span>
<span class="line"><span class="__shiki_1t8gfj">npm</span><span class="__shiki_dzsirb"> --version</span><span class="__shiki_21nrsd">   # 8.x.x</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 配置npm（使用国内镜像加速）</span></span>
<span class="line"><span class="__shiki_1t8gfj">npm</span><span class="__shiki_mdbnqw"> config</span><span class="__shiki_mdbnqw"> set</span><span class="__shiki_mdbnqw"> registry</span><span class="__shiki_mdbnqw"> https://registry.npmmirror.com/</span></span>
<span class="line"><span class="__shiki_1t8gfj">npm</span><span class="__shiki_mdbnqw"> config</span><span class="__shiki_mdbnqw"> set</span><span class="__shiki_mdbnqw"> cache</span><span class="__shiki_mdbnqw"> ~/.npm-cache</span><span class="__shiki_dzsirb"> --global</span></span></code></pre></div><h4 id="_3-pm2-安装与基础配置" tabindex="-1"><strong>3. PM2 安装与基础配置</strong> <a class="header-anchor" href="#_3-pm2-安装与基础配置" aria-label="Permalink to &quot;**3. PM2 安装与基础配置**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 全局安装PM2</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> npm</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> pm2@latest</span><span class="__shiki_dzsirb"> -g</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建软链接确保全局可用</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> ln</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_mdbnqw"> /usr/bin/nodejs</span><span class="__shiki_mdbnqw"> /usr/bin/node</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> ln</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_mdbnqw"> /usr/lib/node_modules/pm2/bin/pm2</span><span class="__shiki_mdbnqw"> /usr/local/bin/pm2</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 初始化PM2</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> completion</span><span class="__shiki_mdbnqw"> install</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> update</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建PM2日志目录</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> mkdir</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> /var/log/pm2</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> chown</span><span class="__shiki_dzsirb"> -R</span><span class="__shiki_140thh"> $USER</span><span class="__shiki_mdbnqw">:</span><span class="__shiki_140thh">$USER </span><span class="__shiki_mdbnqw">/var/log/pm2</span></span></code></pre></div><h3 id="三、nginx-详细安装与配置" tabindex="-1"><strong>三、Nginx 详细安装与配置</strong> <a class="header-anchor" href="#三、nginx-详细安装与配置" aria-label="Permalink to &quot;**三、Nginx 详细安装与配置**&quot;">​</a></h3><h4 id="_1-nginx-安装" tabindex="-1"><strong>1. Nginx 安装</strong> <a class="header-anchor" href="#_1-nginx-安装" aria-label="Permalink to &quot;**1. Nginx 安装**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Ubuntu/Debian</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> apt</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_dzsirb"> -y</span><span class="__shiki_mdbnqw"> nginx</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># CentOS/RHEL</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> yum</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_dzsirb"> -y</span><span class="__shiki_mdbnqw"> epel-release</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> yum</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_dzsirb"> -y</span><span class="__shiki_mdbnqw"> nginx</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 验证安装</span></span>
<span class="line"><span class="__shiki_1t8gfj">nginx</span><span class="__shiki_dzsirb"> -v</span><span class="__shiki_21nrsd">  # nginx version: nginx/1.18.x</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 启动并设置开机自启</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> systemctl</span><span class="__shiki_mdbnqw"> start</span><span class="__shiki_mdbnqw"> nginx</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> systemctl</span><span class="__shiki_mdbnqw"> enable</span><span class="__shiki_mdbnqw"> nginx</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> systemctl</span><span class="__shiki_mdbnqw"> status</span><span class="__shiki_mdbnqw"> nginx</span></span></code></pre></div><h4 id="_2-防火墙配置" tabindex="-1"><strong>2. 防火墙配置</strong> <a class="header-anchor" href="#_2-防火墙配置" aria-label="Permalink to &quot;**2. 防火墙配置**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 查看防火墙状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> ufw</span><span class="__shiki_mdbnqw"> status</span><span class="__shiki_21nrsd">  # Ubuntu</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> firewall-cmd</span><span class="__shiki_dzsirb"> --list-all</span><span class="__shiki_21nrsd">  # CentOS</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 开放必要端口</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> ufw</span><span class="__shiki_mdbnqw"> allow</span><span class="__shiki_mdbnqw"> 22/tcp</span><span class="__shiki_21nrsd">        # SSH</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> ufw</span><span class="__shiki_mdbnqw"> allow</span><span class="__shiki_mdbnqw"> 80/tcp</span><span class="__shiki_21nrsd">        # HTTP</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> ufw</span><span class="__shiki_mdbnqw"> allow</span><span class="__shiki_mdbnqw"> 443/tcp</span><span class="__shiki_21nrsd">       # HTTPS</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> ufw</span><span class="__shiki_mdbnqw"> allow</span><span class="__shiki_mdbnqw"> 3000/tcp</span><span class="__shiki_21nrsd">      # Node.js应用端口（测试用）</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> ufw</span><span class="__shiki_mdbnqw"> enable</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># CentOS使用firewalld</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> firewall-cmd</span><span class="__shiki_dzsirb"> --permanent</span><span class="__shiki_dzsirb"> --add-service=http</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> firewall-cmd</span><span class="__shiki_dzsirb"> --permanent</span><span class="__shiki_dzsirb"> --add-service=https</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> firewall-cmd</span><span class="__shiki_dzsirb"> --permanent</span><span class="__shiki_dzsirb"> --add-port=3000/tcp</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> firewall-cmd</span><span class="__shiki_dzsirb"> --reload</span></span></code></pre></div><h4 id="_3-nginx-核心配置详解" tabindex="-1"><strong>3. Nginx 核心配置详解</strong> <a class="header-anchor" href="#_3-nginx-核心配置详解" aria-label="Permalink to &quot;**3. Nginx 核心配置详解**&quot;">​</a></h4><p>创建应用专属配置文件：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> nano</span><span class="__shiki_mdbnqw"> /etc/nginx/sites-available/your-domain.com</span></span></code></pre></div><p><strong>完整Nginx配置示例</strong>：</p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># /etc/nginx/sites-available/your-domain.com</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 上游服务器配置（连接PM2管理的Node.js实例）</span></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> node_backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 负载均衡算法：least_conn（最少连接）、ip_hash（会话保持）</span></span>
<span class="line"><span class="__shiki_1itgoe">    least_conn</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # PM2集群中的实例（假设运行在3000-3003端口）</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> 127.0.0.1:3000 </span><span class="__shiki_1jdh33">max_fails</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh"> fail_timeout=30s;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> 127.0.0.1:3001 </span><span class="__shiki_1jdh33">max_fails</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh"> fail_timeout=30s;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> 127.0.0.1:3002 </span><span class="__shiki_1jdh33">max_fails</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh"> fail_timeout=30s;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> 127.0.0.1:3003 </span><span class="__shiki_1jdh33">max_fails</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh"> fail_timeout=30s;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 健康检查</span></span>
<span class="line"><span class="__shiki_1itgoe">    keepalive </span><span class="__shiki_dzsirb">64</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># HTTP服务器块（80端口 - 重定向到HTTPS）</span></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_140thh">[::]:80;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server_name </span><span class="__shiki_140thh">your-domain.com www.your-domain.com;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 安全响应头</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">X-Frame-Options </span><span class="__shiki_mdbnqw">&quot;SAMEORIGIN&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">X-Content-Type-Options </span><span class="__shiki_mdbnqw">&quot;nosniff&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">Referrer-Policy </span><span class="__shiki_mdbnqw">&quot;strict-origin-when-cross-origin&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 根目录重定向</span></span>
<span class="line"><span class="__shiki_1itgoe">    root </span><span class="__shiki_140thh">/var/www/html;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # HTTP到HTTPS重定向（301永久重定向）</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 301</span><span class="__shiki_140thh"> https://$server_name$request_uri;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 可选的：Let&#39;s Encrypt验证目录（用于证书续期）</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /.well-known/acme-challenge/ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        alias </span><span class="__shiki_140thh">/var/www/letsencrypt/.well-known/acme-challenge/;</span></span>
<span class="line"><span class="__shiki_1itgoe">        try_files </span><span class="__shiki_140thh">$uri </span><span class="__shiki_dzsirb">=404</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># HTTPS服务器块（443端口 - 主配置）</span></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_dzsirb">443</span><span class="__shiki_140thh"> ssl http2;</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_140thh">[::]:443 ssl http2;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server_name </span><span class="__shiki_140thh">your-domain.com www.your-domain.com;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSL证书配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_certificate </span><span class="__shiki_140thh">/etc/letsencrypt/live/your-domain.com/fullchain.pem;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_certificate_key </span><span class="__shiki_140thh">/etc/letsencrypt/live/your-domain.com/privkey.pem;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSL安全配置（现代配置）</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_protocols </span><span class="__shiki_140thh">TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_ciphers </span><span class="__shiki_140thh">ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_prefer_server_ciphers </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSL会话优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_session_timeout </span><span class="__shiki_dzsirb">1d</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_session_cache </span><span class="__shiki_140thh">shared:SSL:50m;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_session_tickets </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # OCSP装订</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_stapling </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_stapling_verify </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_trusted_certificate </span><span class="__shiki_140thh">/etc/letsencrypt/live/your-domain.com/chain.pem;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 安全响应头（HTTPS专用）</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">Strict-Transport-Security </span><span class="__shiki_mdbnqw">&quot;max-age=63072000; includeSubDomains; preload&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">Content-Security-Policy </span><span class="__shiki_mdbnqw">&quot;default-src &#39;self&#39; https: data: &#39;unsafe-inline&#39; &#39;unsafe-eval&#39;;&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 日志配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    access_log </span><span class="__shiki_140thh">/var/log/nginx/your-domain.com.access.log combined buffer=512k flush=1m;</span></span>
<span class="line"><span class="__shiki_1itgoe">    error_log </span><span class="__shiki_140thh">/var/log/nginx/your-domain.com.error.log </span><span class="__shiki_dzsirb">warn</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 静态文件服务配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 反向代理到Node.js应用</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://node_backend;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 关键代理头部设置</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_http_version </span><span class="__shiki_dzsirb">1.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">Upgrade $http_upgrade;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">Connection </span><span class="__shiki_mdbnqw">&#39;upgrade&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">Host $host;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">X-Real-IP $remote_addr;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">X-Forwarded-Proto $scheme;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 代理超时设置</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_connect_timeout </span><span class="__shiki_dzsirb">75s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_send_timeout </span><span class="__shiki_dzsirb">300s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_read_timeout </span><span class="__shiki_dzsirb">300s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缓冲区优化</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_buffering </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_buffer_size </span><span class="__shiki_dzsirb">16k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_buffers </span><span class="__shiki_dzsirb">8</span><span class="__shiki_dzsirb"> 16k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_busy_buffers_size </span><span class="__shiki_dzsirb">32k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 禁用代理缓存（对动态内容）</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_no_cache </span><span class="__shiki_140thh">$http_pragma $http_authorization;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_bypass </span><span class="__shiki_140thh">$http_pragma $http_authorization;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 静态资源独立服务（性能优化）</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> ~*</span><span class="__shiki_21q97f"> \\.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        root </span><span class="__shiki_140thh">/var/www/your-domain.com/public;</span></span>
<span class="line"><span class="__shiki_1itgoe">        expires </span><span class="__shiki_dzsirb">365d</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Cache-Control </span><span class="__shiki_mdbnqw">&quot;public, immutable&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 尝试直接服务静态文件，不存在则代理到应用</span></span>
<span class="line"><span class="__shiki_1itgoe">        try_files </span><span class="__shiki_140thh">$uri @node_backend;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 启用gzip压缩</span></span>
<span class="line"><span class="__shiki_1itgoe">        gzip_static </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        gzip_vary </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 健康检查端点（供监控系统使用）</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /health </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        access_log </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://node_backend/health;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">Host $host;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 阻止敏感文件访问</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> ~</span><span class="__shiki_21q97f"> /\\.(?!well-known) </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        access_log </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        log_not_found </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> ~*</span><span class="__shiki_21q97f"> \\.(log|sql|conf|env)$ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 404</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 子域名或API专用配置</span></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_dzsirb">443</span><span class="__shiki_140thh"> ssl http2;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server_name </span><span class="__shiki_140thh">api.your-domain.com;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # ... SSL配置类似主域名</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://node_backend;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # API特定的配置</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">X-API-Version </span><span class="__shiki_dzsirb">1.0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 限制API请求频率</span></span>
<span class="line"><span class="__shiki_1itgoe">        limit_req </span><span class="__shiki_140thh">zone=api burst=20 nodelay;</span></span>
<span class="line"><span class="__shiki_1itgoe">        limit_req_status </span><span class="__shiki_dzsirb">429</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p>启用站点配置：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 创建符号链接</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> ln</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_mdbnqw"> /etc/nginx/sites-available/your-domain.com</span><span class="__shiki_mdbnqw"> /etc/nginx/sites-enabled/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 移除默认配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> rm</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> /etc/nginx/sites-enabled/default</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 测试配置语法</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> nginx</span><span class="__shiki_dzsirb"> -t</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 重新加载Nginx</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> systemctl</span><span class="__shiki_mdbnqw"> reload</span><span class="__shiki_mdbnqw"> nginx</span></span></code></pre></div><h4 id="_4-ssl证书配置-let-s-encrypt" tabindex="-1"><strong>4. SSL证书配置（Let&#39;s Encrypt）</strong> <a class="header-anchor" href="#_4-ssl证书配置-let-s-encrypt" aria-label="Permalink to &quot;**4. SSL证书配置（Let&#39;s Encrypt）**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 安装Certbot</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> apt</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_dzsirb"> -y</span><span class="__shiki_mdbnqw"> certbot</span><span class="__shiki_mdbnqw"> python3-certbot-nginx</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 申请证书</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> certbot</span><span class="__shiki_dzsirb"> --nginx</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_mdbnqw"> your-domain.com</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_mdbnqw"> www.your-domain.com</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 自动续期测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> certbot</span><span class="__shiki_mdbnqw"> renew</span><span class="__shiki_dzsirb"> --dry-run</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置自动续期定时任务</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;0 12 * * * /usr/bin/certbot renew --quiet&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> sudo</span><span class="__shiki_mdbnqw"> crontab</span><span class="__shiki_mdbnqw"> -</span></span></code></pre></div><h3 id="四、pm2-高级配置与生态系统文件" tabindex="-1"><strong>四、PM2 高级配置与生态系统文件</strong> <a class="header-anchor" href="#四、pm2-高级配置与生态系统文件" aria-label="Permalink to &quot;**四、PM2 高级配置与生态系统文件**&quot;">​</a></h3><h4 id="_1-完整的生态系统配置文件" tabindex="-1"><strong>1. 完整的生态系统配置文件</strong> <a class="header-anchor" href="#_1-完整的生态系统配置文件" aria-label="Permalink to &quot;**1. 完整的生态系统配置文件**&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// ecosystem.config.js</span></span>
<span class="line"><span class="__shiki_dzsirb">module</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">exports</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  apps: [{</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 应用基础配置</span></span>
<span class="line"><span class="__shiki_140thh">    name: </span><span class="__shiki_mdbnqw">&#39;my-node-app&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    script: </span><span class="__shiki_mdbnqw">&#39;./dist/server.js&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    cwd: </span><span class="__shiki_mdbnqw">&#39;/var/www/your-domain.com&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    interpreter: </span><span class="__shiki_mdbnqw">&#39;node@18&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 集群模式配置</span></span>
<span class="line"><span class="__shiki_140thh">    exec_mode: </span><span class="__shiki_mdbnqw">&#39;cluster&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    instances: </span><span class="__shiki_mdbnqw">&#39;max&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 或指定数字如4</span></span>
<span class="line"><span class="__shiki_140thh">    instance_var: </span><span class="__shiki_mdbnqw">&#39;INSTANCE_ID&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 环境变量（分层配置）</span></span>
<span class="line"><span class="__shiki_140thh">    env: {</span></span>
<span class="line"><span class="__shiki_140thh">      NODE_ENV: </span><span class="__shiki_mdbnqw">&#39;development&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      PORT: </span><span class="__shiki_dzsirb">3000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      HOST: </span><span class="__shiki_mdbnqw">&#39;0.0.0.0&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      LOG_LEVEL: </span><span class="__shiki_mdbnqw">&#39;debug&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    env_staging: {</span></span>
<span class="line"><span class="__shiki_140thh">      NODE_ENV: </span><span class="__shiki_mdbnqw">&#39;staging&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      PORT: </span><span class="__shiki_dzsirb">4000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      LOG_LEVEL: </span><span class="__shiki_mdbnqw">&#39;info&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    env_production: {</span></span>
<span class="line"><span class="__shiki_140thh">      NODE_ENV: </span><span class="__shiki_mdbnqw">&#39;production&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      PORT: </span><span class="__shiki_dzsirb">8080</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 内部端口，Nginx代理到80/443</span></span>
<span class="line"><span class="__shiki_140thh">      HOST: </span><span class="__shiki_mdbnqw">&#39;127.0.0.1&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      LOG_LEVEL: </span><span class="__shiki_mdbnqw">&#39;warn&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 敏感信息通过环境变量传入</span></span>
<span class="line"><span class="__shiki_140thh">      DATABASE_URL: process.env.</span><span class="__shiki_dzsirb">DATABASE_URL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      REDIS_URL: process.env.</span><span class="__shiki_dzsirb">REDIS_URL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      JWT_SECRET: process.env.</span><span class="__shiki_dzsirb">JWT_SECRET</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 日志管理</span></span>
<span class="line"><span class="__shiki_140thh">    log_date_format: </span><span class="__shiki_mdbnqw">&#39;YYYY-MM-DD HH:mm:ss Z&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    error_file: </span><span class="__shiki_mdbnqw">&#39;/var/log/pm2/my-app-error.log&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    out_file: </span><span class="__shiki_mdbnqw">&#39;/var/log/pm2/my-app-out.log&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    combine_logs: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    merge_logs: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    log_rotate: {</span></span>
<span class="line"><span class="__shiki_140thh">      max_size: </span><span class="__shiki_mdbnqw">&#39;10M&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      retain: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      compress: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      dateFormat: </span><span class="__shiki_mdbnqw">&#39;YYYY-MM-DD&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 进程管理</span></span>
<span class="line"><span class="__shiki_140thh">    autorestart: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    watch: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 生产环境禁用</span></span>
<span class="line"><span class="__shiki_140thh">    ignore_watch: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;node_modules&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;logs&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;.git&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;uploads&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    ],</span></span>
<span class="line"><span class="__shiki_140thh">    max_memory_restart: </span><span class="__shiki_mdbnqw">&#39;1G&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    min_uptime: </span><span class="__shiki_mdbnqw">&#39;60s&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    max_restarts: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    restart_delay: </span><span class="__shiki_dzsirb">5000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    kill_timeout: </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    listen_timeout: </span><span class="__shiki_dzsirb">3000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 高级配置</span></span>
<span class="line"><span class="__shiki_140thh">    source_map_support: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    node_args: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;--max-old-space-size=1536&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;--experimental-modules&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;--trace-warnings&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    ],</span></span>
<span class="line"><span class="__shiki_140thh">    args: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;--color&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    ],</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 监控和追踪</span></span>
<span class="line"><span class="__shiki_140thh">    pmx: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 执行钩子</span></span>
<span class="line"><span class="__shiki_140thh">    pre_start: </span><span class="__shiki_mdbnqw">&#39;npm run build&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    post_start: </span><span class="__shiki_mdbnqw">&#39;echo &quot;Application started successfully&quot;&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    pre_restart: </span><span class="__shiki_mdbnqw">&#39;npm run cleanup&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    post_restart: </span><span class="__shiki_mdbnqw">&#39;echo &quot;Application restarted&quot;&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    pre_stop: </span><span class="__shiki_mdbnqw">&#39;echo &quot;Stopping application&quot;&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    post_stop: </span><span class="__shiki_mdbnqw">&#39;rm -f /tmp/app.lock&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  }],</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 部署配置（可选）</span></span>
<span class="line"><span class="__shiki_140thh">  deploy: {</span></span>
<span class="line"><span class="__shiki_140thh">    production: {</span></span>
<span class="line"><span class="__shiki_140thh">      user: </span><span class="__shiki_mdbnqw">&#39;deploy&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      host: [</span><span class="__shiki_mdbnqw">&#39;server1.your-domain.com&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;server2.your-domain.com&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">      ref: </span><span class="__shiki_mdbnqw">&#39;origin/main&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      repo: </span><span class="__shiki_mdbnqw">&#39;git@github.com:yourusername/your-repo.git&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      path: </span><span class="__shiki_mdbnqw">&#39;/var/www/your-domain.com&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;post-deploy&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;npm ci --production &amp;&amp; pm2 reload ecosystem.config.js --env production&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      env: {</span></span>
<span class="line"><span class="__shiki_140thh">        NODE_ENV: </span><span class="__shiki_mdbnqw">&#39;production&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h4 id="_2-pm2-启动与管理" tabindex="-1"><strong>2. PM2 启动与管理</strong> <a class="header-anchor" href="#_2-pm2-启动与管理" aria-label="Permalink to &quot;**2. PM2 启动与管理**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用生态系统文件启动</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> start</span><span class="__shiki_mdbnqw"> ecosystem.config.js</span><span class="__shiki_dzsirb"> --env</span><span class="__shiki_mdbnqw"> production</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看详细状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> status</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> show</span><span class="__shiki_mdbnqw"> my-node-app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 监控</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> monit</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> dashboard</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 日志管理</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_mdbnqw"> my-node-app</span><span class="__shiki_dzsirb"> --lines</span><span class="__shiki_dzsirb"> 200</span><span class="__shiki_dzsirb"> --timestamp</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> flush</span><span class="__shiki_mdbnqw"> my-node-app</span><span class="__shiki_21nrsd">  # 清空日志</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 集群操作</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> scale</span><span class="__shiki_mdbnqw"> my-node-app</span><span class="__shiki_mdbnqw"> +2</span><span class="__shiki_21nrsd">  # 增加2个实例</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> scale</span><span class="__shiki_mdbnqw"> my-node-app</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_21nrsd">   # 设置为4个实例</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 零停机重载</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> reload</span><span class="__shiki_mdbnqw"> my-node-app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 保存当前配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> save</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 生成启动脚本</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> startup</span></span>
<span class="line"><span class="__shiki_21nrsd"># 按提示执行生成的命令</span></span></code></pre></div><h3 id="五、部署工作流与自动化" tabindex="-1"><strong>五、部署工作流与自动化</strong> <a class="header-anchor" href="#五、部署工作流与自动化" aria-label="Permalink to &quot;**五、部署工作流与自动化**&quot;">​</a></h3><h4 id="_1-手动部署脚本" tabindex="-1"><strong>1. 手动部署脚本</strong> <a class="header-anchor" href="#_1-手动部署脚本" aria-label="Permalink to &quot;**1. 手动部署脚本**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># deploy.sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">set</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_21nrsd">  # 遇到错误立即退出</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;=== 开始部署 ===&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 拉取最新代码</span></span>
<span class="line"><span class="__shiki_dzsirb">cd</span><span class="__shiki_mdbnqw"> /var/www/your-domain.com</span></span>
<span class="line"><span class="__shiki_1t8gfj">git</span><span class="__shiki_mdbnqw"> pull</span><span class="__shiki_mdbnqw"> origin</span><span class="__shiki_mdbnqw"> main</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 安装依赖</span></span>
<span class="line"><span class="__shiki_1t8gfj">npm</span><span class="__shiki_mdbnqw"> ci</span><span class="__shiki_dzsirb"> --production</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 构建（如果需要）</span></span>
<span class="line"><span class="__shiki_1t8gfj">npm</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_mdbnqw"> build</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 数据库迁移</span></span>
<span class="line"><span class="__shiki_1t8gfj">npm</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_mdbnqw"> migrate</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 重启应用</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> reload</span><span class="__shiki_mdbnqw"> ecosystem.config.js</span><span class="__shiki_dzsirb"> --env</span><span class="__shiki_mdbnqw"> production</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 6. 健康检查</span></span>
<span class="line"><span class="__shiki_1t8gfj">sleep</span><span class="__shiki_dzsirb"> 5</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> http://localhost:8080/health</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> exit</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;=== 部署成功 ===&quot;</span></span></code></pre></div><h4 id="_2-系统服务整合" tabindex="-1"><strong>2. 系统服务整合</strong> <a class="header-anchor" href="#_2-系统服务整合" aria-label="Permalink to &quot;**2. 系统服务整合**&quot;">​</a></h4><p>创建systemd服务确保PM2开机自启：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 生成PM2启动脚本</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> startup</span><span class="__shiki_mdbnqw"> systemd</span><span class="__shiki_dzsirb"> -u</span><span class="__shiki_mdbnqw"> www-data</span><span class="__shiki_dzsirb"> --hp</span><span class="__shiki_mdbnqw"> /home/www-data</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 输出类似：</span></span>
<span class="line"><span class="__shiki_21nrsd"># [PM2] Init System found: systemd</span></span>
<span class="line"><span class="__shiki_21nrsd"># [PM2] To setup the Startup Script, copy/paste the following command:</span></span>
<span class="line"><span class="__shiki_21nrsd"># sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u www-data --hp /home/www-data</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 保存当前PM2进程列表</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> save</span></span></code></pre></div><h3 id="六、监控、维护与故障排除" tabindex="-1"><strong>六、监控、维护与故障排除</strong> <a class="header-anchor" href="#六、监控、维护与故障排除" aria-label="Permalink to &quot;**六、监控、维护与故障排除**&quot;">​</a></h3><h4 id="_1-关键监控指标" tabindex="-1"><strong>1. 关键监控指标</strong> <a class="header-anchor" href="#_1-关键监控指标" aria-label="Permalink to &quot;**1. 关键监控指标**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 查看系统资源</span></span>
<span class="line"><span class="__shiki_1t8gfj">htop</span></span>
<span class="line"><span class="__shiki_1t8gfj">df</span><span class="__shiki_dzsirb"> -h</span><span class="__shiki_21nrsd">  # 磁盘空间</span></span>
<span class="line"><span class="__shiki_1t8gfj">free</span><span class="__shiki_dzsirb"> -h</span><span class="__shiki_21nrsd">  # 内存</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 监控网络连接</span></span>
<span class="line"><span class="__shiki_1t8gfj">ss</span><span class="__shiki_dzsirb"> -tulpn</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -E</span><span class="__shiki_mdbnqw"> &#39;(nginx|node)&#39;</span></span>
<span class="line"><span class="__shiki_1t8gfj">netstat</span><span class="__shiki_dzsirb"> -tulpn</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> :80</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 实时日志监控</span></span>
<span class="line"><span class="__shiki_1t8gfj">tail</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> /var/log/nginx/access.log</span></span>
<span class="line"><span class="__shiki_1t8gfj">tail</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> /var/log/nginx/error.log</span></span>
<span class="line"><span class="__shiki_1t8gfj">tail</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> /var/log/pm2/my-app-error.log</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># PM2监控</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> list</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_dzsirb"> 0</span></span></code></pre></div><h4 id="_2-性能优化检查清单" tabindex="-1"><strong>2. 性能优化检查清单</strong> <a class="header-anchor" href="#_2-性能优化检查清单" aria-label="Permalink to &quot;**2. 性能优化检查清单**&quot;">​</a></h4><table tabindex="0"><thead><tr><th><strong>项目</strong></th><th><strong>检查命令</strong></th><th><strong>优化目标</strong></th></tr></thead><tbody><tr><td>Nginx工作进程</td><td>\`ps aux</td><td>grep nginx</td></tr><tr><td>Node.js实例数</td><td><code>pm2 list</code></td><td>CPU核心数×1.5</td></tr><tr><td>内存使用</td><td><code>pm2 monit</code></td><td>&lt; 70% 总内存</td></tr><tr><td>磁盘空间</td><td><code>df -h /var/log</code></td><td>&gt; 20% 空闲</td></tr><tr><td>SSL证书</td><td><code>sudo certbot certificates</code></td><td>有效期&gt;30天</td></tr><tr><td>连接数</td><td><code>ss -s</code></td><td>ESTAB &lt; 文件描述符限制</td></tr></tbody></table><h4 id="_3-常见故障排除" tabindex="-1"><strong>3. 常见故障排除</strong> <a class="header-anchor" href="#_3-常见故障排除" aria-label="Permalink to &quot;**3. 常见故障排除**&quot;">​</a></h4><p><strong>问题1：502 Bad Gateway</strong></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 检查Node.js是否运行</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -I</span><span class="__shiki_mdbnqw"> http://localhost:8080</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查PM2日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_mdbnqw"> my-node-app</span><span class="__shiki_dzsirb"> --lines</span><span class="__shiki_dzsirb"> 50</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查Nginx错误日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> tail</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> /var/log/nginx/error.log</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查端口监听</span></span>
<span class="line"><span class="__shiki_1t8gfj">ss</span><span class="__shiki_dzsirb"> -tulpn</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> :8080</span></span></code></pre></div><p><strong>问题2：高内存使用</strong></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 查看内存占用最高的进程</span></span>
<span class="line"><span class="__shiki_1t8gfj">ps</span><span class="__shiki_mdbnqw"> aux</span><span class="__shiki_dzsirb"> --sort=-%mem</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> head</span><span class="__shiki_dzsirb"> -10</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 调整PM2内存重启阈值</span></span>
<span class="line"><span class="__shiki_21nrsd"># 在ecosystem.config.js中设置 max_memory_restart: &#39;800M&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 启用Node.js内存快照</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> trigger</span><span class="__shiki_mdbnqw"> my-node-app</span><span class="__shiki_mdbnqw"> heapdump</span></span></code></pre></div><p><strong>问题3：SSL证书问题</strong></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 测试SSL配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> nginx</span><span class="__shiki_dzsirb"> -t</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> certbot</span><span class="__shiki_mdbnqw"> renew</span><span class="__shiki_dzsirb"> --dry-run</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 在线测试SSL</span></span>
<span class="line"><span class="__shiki_21nrsd"># 访问 https://www.ssllabs.com/ssltest/</span></span></code></pre></div><h3 id="七、安全加固措施" tabindex="-1"><strong>七、安全加固措施</strong> <a class="header-anchor" href="#七、安全加固措施" aria-label="Permalink to &quot;**七、安全加固措施**&quot;">​</a></h3><h4 id="_1-服务器基础安全" tabindex="-1"><strong>1. 服务器基础安全</strong> <a class="header-anchor" href="#_1-服务器基础安全" aria-label="Permalink to &quot;**1. 服务器基础安全**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 禁用root SSH登录</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> sed</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_mdbnqw"> &#39;s/PermitRootLogin yes/PermitRootLogin no/&#39;</span><span class="__shiki_mdbnqw"> /etc/ssh/sshd_config</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> systemctl</span><span class="__shiki_mdbnqw"> restart</span><span class="__shiki_mdbnqw"> sshd</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建部署专用用户</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> adduser</span><span class="__shiki_mdbnqw"> deploy</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> usermod</span><span class="__shiki_dzsirb"> -aG</span><span class="__shiki_mdbnqw"> sudo</span><span class="__shiki_mdbnqw"> deploy</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 配置SSH密钥认证</span></span>
<span class="line"><span class="__shiki_1t8gfj">ssh-copy-id</span><span class="__shiki_mdbnqw"> deploy@your-server</span></span></code></pre></div><h4 id="_2-nginx-安全配置" tabindex="-1"><strong>2. Nginx 安全配置</strong> <a class="header-anchor" href="#_2-nginx-安全配置" aria-label="Permalink to &quot;**2. Nginx 安全配置**&quot;">​</a></h4><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 防止信息泄露</span></span>
<span class="line"><span class="__shiki_1itgoe">server_tokens </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 限制请求大小</span></span>
<span class="line"><span class="__shiki_1itgoe">client_max_body_size </span><span class="__shiki_dzsirb">10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 限制请求频率</span></span>
<span class="line"><span class="__shiki_1itgoe">limit_req_zone </span><span class="__shiki_140thh">$binary_remote_addr zone=api:10m rate=10r/s;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 阻止常见攻击</span></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1itgoe"> ~*</span><span class="__shiki_21q97f"> (wp-admin|phpmyadmin|\\.bak|\\.sql|\\.git) </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 404</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-node-js-应用安全" tabindex="-1"><strong>3. Node.js 应用安全</strong> <a class="header-anchor" href="#_3-node-js-应用安全" aria-label="Permalink to &quot;**3. Node.js 应用安全**&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 在Express应用中</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> helmet</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;helmet&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">app.</span><span class="__shiki_1t8gfj">use</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">helmet</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">    contentSecurityPolicy: {</span></span>
<span class="line"><span class="__shiki_140thh">        directives: {</span></span>
<span class="line"><span class="__shiki_140thh">            defaultSrc: [</span><span class="__shiki_mdbnqw">&quot;&#39;self&#39;&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">            styleSrc: [</span><span class="__shiki_mdbnqw">&quot;&#39;self&#39;&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;&#39;unsafe-inline&#39;&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">            scriptSrc: [</span><span class="__shiki_mdbnqw">&quot;&#39;self&#39;&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">            imgSrc: [</span><span class="__shiki_mdbnqw">&quot;&#39;self&#39;&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;data:&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;https:&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">}));</span></span></code></pre></div><h3 id="八、备份与恢复策略" tabindex="-1"><strong>八、备份与恢复策略</strong> <a class="header-anchor" href="#八、备份与恢复策略" aria-label="Permalink to &quot;**八、备份与恢复策略**&quot;">​</a></h3><h4 id="_1-配置文件备份" tabindex="-1"><strong>1. 配置文件备份</strong> <a class="header-anchor" href="#_1-配置文件备份" aria-label="Permalink to &quot;**1. 配置文件备份**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># backup-configs.sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">BACKUP_DIR</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/backup/configs/$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%Y%m%d)&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">mkdir</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_140thh"> $BACKUP_DIR</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 备份Nginx配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">cp</span><span class="__shiki_dzsirb"> -r</span><span class="__shiki_mdbnqw"> /etc/nginx</span><span class="__shiki_140thh"> $BACKUP_DIR</span><span class="__shiki_mdbnqw">/nginx</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 备份PM2配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">cp</span><span class="__shiki_dzsirb"> -r</span><span class="__shiki_mdbnqw"> ~/.pm2</span><span class="__shiki_140thh"> $BACKUP_DIR</span><span class="__shiki_mdbnqw">/pm2</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 备份应用环境变量</span></span>
<span class="line"><span class="__shiki_1t8gfj">printenv</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_140thh"> $BACKUP_DIR</span><span class="__shiki_mdbnqw">/environment.txt</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 打包备份</span></span>
<span class="line"><span class="__shiki_1t8gfj">tar</span><span class="__shiki_dzsirb"> -czf</span><span class="__shiki_mdbnqw"> /backup/configs-</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%Y%m%d</span><span class="__shiki_140thh">)</span><span class="__shiki_mdbnqw">.tar.gz</span><span class="__shiki_140thh"> $BACKUP_DIR</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 保留最近7天备份</span></span>
<span class="line"><span class="__shiki_1t8gfj">find</span><span class="__shiki_mdbnqw"> /backup/configs</span><span class="__shiki_dzsirb"> -type</span><span class="__shiki_mdbnqw"> f</span><span class="__shiki_dzsirb"> -mtime</span><span class="__shiki_mdbnqw"> +7</span><span class="__shiki_dzsirb"> -delete</span></span></code></pre></div><h4 id="_2-日志轮转配置" tabindex="-1"><strong>2. 日志轮转配置</strong> <a class="header-anchor" href="#_2-日志轮转配置" aria-label="Permalink to &quot;**2. 日志轮转配置**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># /etc/logrotate.d/node-app</span></span>
<span class="line"><span class="__shiki_1t8gfj">/var/log/pm2/*.log</span><span class="__shiki_mdbnqw"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    daily</span></span>
<span class="line"><span class="__shiki_1t8gfj">    missingok</span></span>
<span class="line"><span class="__shiki_1t8gfj">    rotate</span><span class="__shiki_dzsirb"> 30</span></span>
<span class="line"><span class="__shiki_1t8gfj">    compress</span></span>
<span class="line"><span class="__shiki_1t8gfj">    delaycompress</span></span>
<span class="line"><span class="__shiki_1t8gfj">    notifempty</span></span>
<span class="line"><span class="__shiki_1t8gfj">    create</span><span class="__shiki_dzsirb"> 0640</span><span class="__shiki_mdbnqw"> www-data</span><span class="__shiki_mdbnqw"> www-data</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sharedscripts</span></span>
<span class="line"><span class="__shiki_1t8gfj">    postrotate</span></span>
<span class="line"><span class="__shiki_1t8gfj">        pm2</span><span class="__shiki_mdbnqw"> reloadLogs</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /dev/null</span><span class="__shiki_1itgoe"> 2&gt;&amp;1</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_1t8gfj">    endscript</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="九、部署架构演进路径" tabindex="-1"><strong>九、部署架构演进路径</strong> <a class="header-anchor" href="#九、部署架构演进路径" aria-label="Permalink to &quot;**九、部署架构演进路径**&quot;">​</a></h3><table tabindex="0"><thead><tr><th><strong>阶段</strong></th><th><strong>架构</strong></th><th><strong>适用场景</strong></th></tr></thead><tbody><tr><td><strong>初级阶段</strong></td><td>单服务器 + PM2 + Nginx</td><td>小流量项目、MVP</td></tr><tr><td><strong>中级阶段</strong></td><td>多服务器 + 负载均衡器 + PM2集群</td><td>中等流量、需要高可用</td></tr><tr><td><strong>高级阶段</strong></td><td>容器化（Docker） + 编排（K8s） + 服务网格</td><td>大规模、微服务架构</td></tr><tr><td><strong>云原生阶段</strong></td><td>无服务器（Serverless） + CDN + 托管服务</td><td>极致弹性、低运维成本</td></tr></tbody></table><p>这种PM2 + Nginx的组合为Node.js应用提供了坚实、可扩展的生产环境基础，既能满足初创项目的需求，也为未来的架构演进留出了清晰的升级路径。</p><h3 id="十、示例-winserver-部署无头浏览器实战" tabindex="-1"><strong>十、示例：winserver 部署无头浏览器实战</strong> <a class="header-anchor" href="#十、示例-winserver-部署无头浏览器实战" aria-label="Permalink to &quot;**十、示例：winserver 部署无头浏览器实战**&quot;">​</a></h3><h4 id="_1-安装pm2" tabindex="-1"><strong>1. 安装pm2</strong> <a class="header-anchor" href="#_1-安装pm2" aria-label="Permalink to &quot;**1. 安装pm2**&quot;">​</a></h4><p>建议安装到全局</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">npm</span><span class="__shiki_mdbnqw"> config</span><span class="__shiki_mdbnqw"> set</span><span class="__shiki_mdbnqw"> registry</span><span class="__shiki_mdbnqw"> https://registry.npmmirror.com</span></span>
<span class="line"><span class="__shiki_1t8gfj">npm</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> pm2</span><span class="__shiki_dzsirb"> -g</span></span></code></pre></div><h4 id="_2-安装pm2的轮转模块" tabindex="-1"><strong>2. 安装pm2的轮转模块</strong> <a class="header-anchor" href="#_2-安装pm2的轮转模块" aria-label="Permalink to &quot;**2. 安装pm2的轮转模块**&quot;">​</a></h4><p>注意不是直接用npm装的</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> pm2-logrotate</span></span></code></pre></div><h4 id="_3-安装windows自启动包" tabindex="-1"><strong>3. 安装windows自启动包</strong> <a class="header-anchor" href="#_3-安装windows自启动包" aria-label="Permalink to &quot;**3. 安装windows自启动包**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">npm</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> pm2-windows-startup</span><span class="__shiki_dzsirb"> -g</span></span></code></pre></div><h4 id="_4-检查是否安装成功" tabindex="-1"><strong>4. 检查是否安装成功</strong> <a class="header-anchor" href="#_4-检查是否安装成功" aria-label="Permalink to &quot;**4. 检查是否安装成功**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">~&gt;</span><span class="__shiki_140thh"> npm list -g --depth</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">0</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> findstr</span><span class="__shiki_mdbnqw"> pm2</span></span>
<span class="line"><span class="__shiki_1t8gfj">+--</span><span class="__shiki_mdbnqw"> pm2-windows-startup@1.0.3</span></span>
<span class="line"><span class="__shiki_1t8gfj">+--</span><span class="__shiki_mdbnqw"> pm2@6.0.14</span></span></code></pre></div><h4 id="_5-创建开机启动脚本文件" tabindex="-1"><strong>5. 创建开机启动脚本文件</strong> <a class="header-anchor" href="#_5-创建开机启动脚本文件" aria-label="Permalink to &quot;**5. 创建开机启动脚本文件**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">pm2-startup</span><span class="__shiki_mdbnqw"> install</span></span></code></pre></div><h4 id="_6-使用pm2启动项目" tabindex="-1"><strong>6. 使用pm2启动项目</strong> <a class="header-anchor" href="#_6-使用pm2启动项目" aria-label="Permalink to &quot;**6. 使用pm2启动项目**&quot;">​</a></h4><p>最好是进入到项目启动文件同级目录</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> start</span><span class="__shiki_mdbnqw"> xxx.</span></span></code></pre></div><h4 id="_7-保存pm2中的项目" tabindex="-1"><strong>7. 保存pm2中的项目</strong> <a class="header-anchor" href="#_7-保存pm2中的项目" aria-label="Permalink to &quot;**7. 保存pm2中的项目**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> save</span></span></code></pre></div><h4 id="_8-卸载服务" tabindex="-1"><strong>8. 卸载服务</strong> <a class="header-anchor" href="#_8-卸载服务" aria-label="Permalink to &quot;**8. 卸载服务**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">pm2-service-uninstall</span></span></code></pre></div><h4 id="_9-设置切割规则" tabindex="-1"><strong>9. 设置切割规则</strong> <a class="header-anchor" href="#_9-设置切割规则" aria-label="Permalink to &quot;**9. 设置切割规则**&quot;">​</a></h4><p>按 50MB 或每天切割，保留 30 天，自动压缩</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> set</span><span class="__shiki_mdbnqw"> pm2-logrotate:max_size</span><span class="__shiki_mdbnqw"> 50M</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> set</span><span class="__shiki_mdbnqw"> pm2-logrotate:retain</span><span class="__shiki_dzsirb"> 30</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> set</span><span class="__shiki_mdbnqw"> pm2-logrotate:compress</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> set</span><span class="__shiki_mdbnqw"> pm2-logrotate:dateFormat</span><span class="__shiki_mdbnqw"> YYYY-MM-DD_HH-mm-ss</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> set</span><span class="__shiki_mdbnqw"> pm2-logrotate:workerInterval</span><span class="__shiki_dzsirb"> 1800</span><span class="__shiki_21nrsd">  # 每 1800 秒（1小时）检查一次大小</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> set</span><span class="__shiki_mdbnqw"> pm2-logrotate:rotateInterval</span><span class="__shiki_mdbnqw"> &#39;0 0 * * *&#39;</span><span class="__shiki_21nrsd">  # 每天 0 点强制切割（cron 格式）</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> save</span></span></code></pre></div><h4 id="_10-拷贝无头浏览器" tabindex="-1"><strong>10. 拷贝无头浏览器</strong> <a class="header-anchor" href="#_10-拷贝无头浏览器" aria-label="Permalink to &quot;**10. 拷贝无头浏览器**&quot;">​</a></h4><p>本地puppeteer 缓存地址，记住不是这个大依赖不是安装在项目里的，是单独安装在指定缓存里。离线部署需要拷贝进去 <code>C:\\Users\\Administrator\\.cache\\puppeteer</code></p><h4 id="_11-停止-pm2-中的服务" tabindex="-1"><strong>11. 停止 PM2 中的服务</strong> <a class="header-anchor" href="#_11-停止-pm2-中的服务" aria-label="Permalink to &quot;**11. 停止 PM2 中的服务**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> stop</span><span class="__shiki_mdbnqw"> all</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> delete</span><span class="__shiki_mdbnqw"> all</span></span></code></pre></div><h4 id="_12-强制结束所有-node-进程" tabindex="-1"><strong>12. 强制结束所有 node 进程</strong> <a class="header-anchor" href="#_12-强制结束所有-node-进程" aria-label="Permalink to &quot;**12. 强制结束所有 node 进程**&quot;">​</a></h4><p>如果有其他node项目谨慎使用</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">taskkill</span><span class="__shiki_mdbnqw"> /F</span><span class="__shiki_mdbnqw"> /IM</span><span class="__shiki_mdbnqw"> node.exe</span></span></code></pre></div><h4 id="_13-停止-pm2-中的服务" tabindex="-1"><strong>13. 停止 PM2 中的服务</strong> <a class="header-anchor" href="#_13-停止-pm2-中的服务" aria-label="Permalink to &quot;**13. 停止 PM2 中的服务**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 检查 3000 端口是否还被占用</span></span>
<span class="line"><span class="__shiki_1t8gfj">netstat</span><span class="__shiki_dzsirb"> -an</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> findstr</span><span class="__shiki_mdbnqw"> :3000</span></span></code></pre></div><h4 id="_14-托管项目的nginx" tabindex="-1"><strong>14. 托管项目的nginx</strong> <a class="header-anchor" href="#_14-托管项目的nginx" aria-label="Permalink to &quot;**14. 托管项目的nginx**&quot;">​</a></h4><p>查看nginx的命令，nginx现在全部托管给pm2来管理，只需要在nginx根目录的<code>nginx\\conf\\nginx.conf</code></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">    # 添加这行：引入项目配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">    include</span><span class="__shiki_mdbnqw">       D:/projects/node-hiprint-pdf/nginx.conf</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_15-项目的nginx" tabindex="-1"><strong>15. 项目的nginx</strong> <a class="header-anchor" href="#_15-项目的nginx" aria-label="Permalink to &quot;**15. 项目的nginx**&quot;">​</a></h4><p>项目根目录下新建<code>nginx.conf</code></p><p>nginx日志创建文件夹层级只允许有一级，如果层级过深，需要手动创建</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">worker_processes</span><span class="__shiki_dzsirb">  1</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">events</span><span class="__shiki_mdbnqw"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    worker_connections</span><span class="__shiki_dzsirb">  1024</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">http</span><span class="__shiki_mdbnqw"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # include       mime.types;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    include</span><span class="__shiki_mdbnqw">       F:/nginx/conf/mime.types</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    default_type</span><span class="__shiki_mdbnqw">  application/octet-stream</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">    sendfile</span><span class="__shiki_mdbnqw">        on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    keepalive_timeout</span><span class="__shiki_dzsirb">  65</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # Base64 可能很大，调整缓冲区</span></span>
<span class="line"><span class="__shiki_1t8gfj">    client_max_body_size</span><span class="__shiki_mdbnqw"> 50m</span><span class="__shiki_140thh">;      </span><span class="__shiki_21nrsd"># 允许上传大图片（如果用户上传图片生成PDF）</span></span>
<span class="line"><span class="__shiki_1t8gfj">    proxy_buffer_size</span><span class="__shiki_mdbnqw">    128k</span><span class="__shiki_140thh">;     </span><span class="__shiki_21nrsd"># 增大缓冲区，避免大 Base64 被截断</span></span>
<span class="line"><span class="__shiki_1t8gfj">    proxy_buffers</span><span class="__shiki_dzsirb">        4</span><span class="__shiki_mdbnqw"> 256k</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">    upstream</span><span class="__shiki_mdbnqw"> print_server</span><span class="__shiki_mdbnqw"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        server</span><span class="__shiki_mdbnqw"> 192.168.0.153:3000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    # 切割日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">    map</span><span class="__shiki_140thh"> $time_iso8601 $logdate </span><span class="__shiki_mdbnqw">{</span></span>
<span class="line"><span class="__shiki_1t8gfj">        &#39;~^(?&lt;ymd&gt;\\d{4}-\\d{2}-\\d{2})&#39;</span><span class="__shiki_140thh"> $ymd;</span></span>
<span class="line"><span class="__shiki_1t8gfj">        default</span><span class="__shiki_mdbnqw"> &#39;nodate&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">    server</span><span class="__shiki_mdbnqw"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        listen</span><span class="__shiki_dzsirb">       1880</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1t8gfj">        server_name</span><span class="__shiki_mdbnqw">  localhost</span><span class="__shiki_140thh">;      </span><span class="__shiki_21nrsd"># 改为你的IP或域名</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">        # 切割日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">        access_log</span><span class="__shiki_mdbnqw">  E:/WebSite/print-server/logs/nginx/access-</span><span class="__shiki_140thh">$logdate</span><span class="__shiki_mdbnqw">.log</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1t8gfj">        error_log</span><span class="__shiki_mdbnqw">   E:/WebSite/print-server/logs/nginx/error.log</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">        # 所有请求都转发给 Fastify</span></span>
<span class="line"><span class="__shiki_1t8gfj">        location</span><span class="__shiki_mdbnqw"> /</span><span class="__shiki_mdbnqw"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            proxy_pass</span><span class="__shiki_mdbnqw">         http://print_server</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">            # proxy_set_header   Host $host;</span></span>
<span class="line"><span class="__shiki_1t8gfj">            proxy_set_header</span><span class="__shiki_mdbnqw">   Host</span><span class="__shiki_140thh"> $host</span><span class="__shiki_mdbnqw">:</span><span class="__shiki_140thh">$server_port;</span></span>
<span class="line"><span class="__shiki_1t8gfj">            proxy_set_header</span><span class="__shiki_mdbnqw">   X-Real-IP</span><span class="__shiki_140thh"> $remote_addr;</span></span>
<span class="line"><span class="__shiki_1t8gfj">            proxy_set_header</span><span class="__shiki_mdbnqw">   X-Forwarded-For</span><span class="__shiki_140thh"> $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span class="__shiki_1t8gfj">            proxy_set_header</span><span class="__shiki_mdbnqw">   X-Forwarded-Port</span><span class="__shiki_140thh"> $server_port;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">            # 关键：生成 PDF 转 Base64 可能耗时较长（特别是复杂页面）</span></span>
<span class="line"><span class="__shiki_1t8gfj">            proxy_read_timeout</span><span class="__shiki_mdbnqw"> 300s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1t8gfj">            proxy_send_timeout</span><span class="__shiki_mdbnqw"> 300s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 如果 Base64 很大，关闭缓冲直接流式传输</span></span>
<span class="line"><span class="__shiki_1t8gfj">            proxy_buffering</span><span class="__shiki_mdbnqw">    off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1t8gfj">            proxy_request_buffering</span><span class="__shiki_mdbnqw"> off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_16-项目的ecosystem-config-cjs" tabindex="-1"><strong>16. 项目的ecosystem.config.cjs</strong> <a class="header-anchor" href="#_16-项目的ecosystem-config-cjs" aria-label="Permalink to &quot;**16. 项目的ecosystem.config.cjs**&quot;">​</a></h4><p>项目根目录下新建<code>ecosystem.config.cjs</code></p><p>nginx日志创建文件夹层级只允许有一级，如果层级过深，需要手动创建</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">module</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">exports</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  apps: [</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_140thh">      name: </span><span class="__shiki_mdbnqw">&#39;print-server&#39;</span><span class="__shiki_140thh">,           </span><span class="__shiki_21nrsd">// 服务名称</span></span>
<span class="line"><span class="__shiki_21nrsd">      // script: &#39;./app.js&#39;,</span><span class="__shiki_21nrsd">         // 入口文件（根据你的项目调整）</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      script: </span><span class="__shiki_mdbnqw">&#39;./node_modules/fastify-cli/cli.js&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// ✅ 直接指向 fastify-cli 的 CLI 入口（关键修复）</span></span>
<span class="line"><span class="__shiki_21nrsd">      // args: &#39;start -l info -p 3000 app.js&#39;,</span><span class="__shiki_21nrsd"> // ✅ 传给 fastify-cli 的参数（对应 npm start 里的内容）</span></span>
<span class="line"><span class="__shiki_140thh">      args: </span><span class="__shiki_mdbnqw">&#39;start -l warn -p 3000 -a 192.168.0.153 app.js&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// ✅ 传给 fastify-cli 的参数（对应 npm start 里的内容） </span></span>
<span class="line"><span class="__shiki_140thh">      exec_interpreter: </span><span class="__shiki_mdbnqw">&#39;node&#39;</span><span class="__shiki_140thh">,    </span><span class="__shiki_21nrsd">// 确保用 Node 运行（可选，默认就是 node）</span></span>
<span class="line"><span class="__shiki_140thh">      cwd: </span><span class="__shiki_mdbnqw">&#39;E:</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">WebSite</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">print-server&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      exec_mode: </span><span class="__shiki_mdbnqw">&#39;fork&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">      instances: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,                  </span><span class="__shiki_21nrsd">// Windows 下建议 1（或多线程用 cluster 模式）</span></span>
<span class="line"><span class="__shiki_140thh">      exec_mode: </span><span class="__shiki_mdbnqw">&#39;fork&#39;</span><span class="__shiki_140thh">,             </span><span class="__shiki_21nrsd">// Windows 建议 fork（cluster 模式在 Windows 有限制）</span></span>
<span class="line"><span class="__shiki_140thh">      autorestart: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,             </span><span class="__shiki_21nrsd">// 崩溃自动重启</span></span>
<span class="line"><span class="__shiki_140thh">      watch: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,                  </span><span class="__shiki_21nrsd">// 生产环境关闭文件监听</span></span>
<span class="line"><span class="__shiki_140thh">      max_memory_restart: </span><span class="__shiki_mdbnqw">&#39;1G&#39;</span><span class="__shiki_140thh">,      </span><span class="__shiki_21nrsd">// 内存超 1G 重启</span></span>
<span class="line"><span class="__shiki_140thh">      env: {</span></span>
<span class="line"><span class="__shiki_140thh">        NODE_ENV: </span><span class="__shiki_mdbnqw">&#39;production&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        PORT: </span><span class="__shiki_dzsirb">3000</span><span class="__shiki_140thh">,                  </span><span class="__shiki_21nrsd">// Node 监听端口（只开本地，不暴露公网）</span></span>
<span class="line"><span class="__shiki_140thh">        HOST: </span><span class="__shiki_mdbnqw">&#39;192.168.0.153&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      env_production: {</span></span>
<span class="line"><span class="__shiki_140thh">        NODE_ENV: </span><span class="__shiki_mdbnqw">&#39;production&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 日志配置（Windows 路径用双反斜杠或斜杠）</span></span>
<span class="line"><span class="__shiki_21nrsd">      // error_file: &#39;D:/apps/logs/err.log&#39;,</span></span>
<span class="line"><span class="__shiki_21nrsd">      // out_file: &#39;D:/apps/logs/out.log&#39;,</span></span>
<span class="line"><span class="__shiki_21nrsd">      // Windows 日志路径（双反斜杠）</span></span>
<span class="line"><span class="__shiki_140thh">      error_file: </span><span class="__shiki_mdbnqw">&#39;E:</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">WebSite</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">print-server</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">logs</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">app</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">err.log&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      out_file: </span><span class="__shiki_mdbnqw">&#39;E:</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">WebSite</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">print-server</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">logs</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">app</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">out.log&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      merge_logs: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      log_date_format: </span><span class="__shiki_mdbnqw">&#39;YYYY-MM-DD HH:mm:ss&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_140thh">      name: </span><span class="__shiki_mdbnqw">&#39;nginx&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      cwd: </span><span class="__shiki_mdbnqw">&#39;F:</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">nginx&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      script: </span><span class="__shiki_mdbnqw">&#39;nginx.exe&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      args: </span><span class="__shiki_mdbnqw">&#39;-c E:/WebSite/print-server/nginx.conf -g &quot;daemon off;&quot;&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// -g &quot;daemon off;&quot; 是必须的，让 nginx 前台运行以便 PM2 管理</span></span>
<span class="line"><span class="__shiki_140thh">      exec_mode: </span><span class="__shiki_mdbnqw">&#39;fork&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      autorestart: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      env: {</span></span>
<span class="line"><span class="__shiki_140thh">        PATH: </span><span class="__shiki_mdbnqw">&#39;F:</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">nginx&#39;</span><span class="__shiki_21nrsd">  // 确保能找到 nginx</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h4 id="_17-排查chromium在windows下是否session-级别为0" tabindex="-1"><strong>17. 排查Chromium在windows下是否session 级别为0</strong> <a class="header-anchor" href="#_17-排查chromium在windows下是否session-级别为0" aria-label="Permalink to &quot;**17. 排查Chromium在windows下是否session 级别为0**&quot;">​</a></h4><p>Chromium 参数没错，错在 Windows 不允许 Session 0 的进程拥有和 Session 1 相同的渲染优先级 本地 CMD 能跑 是因为你在 Session 1（有桌面） PM2 不能跑 是因为它在 Session 0（无桌面，强制节流）</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj"> Get-Process</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> Where-Object</span><span class="__shiki_mdbnqw"> {</span><span class="__shiki_dzsirb">$_</span><span class="__shiki_mdbnqw">.ProcessName</span><span class="__shiki_dzsirb"> -like</span><span class="__shiki_mdbnqw"> &quot;*node*&quot;</span><span class="__shiki_dzsirb"> -or</span><span class="__shiki_dzsirb"> $_</span><span class="__shiki_mdbnqw">.ProcessName</span><span class="__shiki_dzsirb"> -like</span><span class="__shiki_mdbnqw"> &quot;*chromium*&quot;}</span><span class="__shiki_1itgoe"> |</span></span>
<span class="line"><span class="__shiki_1itgoe">&gt;&gt;</span><span class="__shiki_1t8gfj">     Select-Object</span><span class="__shiki_mdbnqw"> Name,</span><span class="__shiki_mdbnqw"> Id,</span><span class="__shiki_mdbnqw"> @{Name=&quot;SessionId&quot;</span><span class="__shiki_140thh">; Expression</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{(</span><span class="__shiki_1t8gfj">Get-WmiObject</span><span class="__shiki_mdbnqw"> Win32_Process</span><span class="__shiki_dzsirb"> -Filter</span><span class="__shiki_mdbnqw"> &quot;ProcessId=$(</span><span class="__shiki_dzsirb">$_</span><span class="__shiki_mdbnqw">.Id)&quot;</span><span class="__shiki_140thh">)</span><span class="__shiki_1t8gfj">.SessionId}}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">Name</span><span class="__shiki_mdbnqw">    Id</span><span class="__shiki_mdbnqw"> SessionId</span></span>
<span class="line"><span class="__shiki_1t8gfj">----</span><span class="__shiki_dzsirb">    --</span><span class="__shiki_dzsirb"> ---------</span></span>
<span class="line"><span class="__shiki_1t8gfj">node</span><span class="__shiki_dzsirb">  3808</span><span class="__shiki_dzsirb">         1</span></span>
<span class="line"><span class="__shiki_1t8gfj">node</span><span class="__shiki_dzsirb"> 22392</span><span class="__shiki_dzsirb">         1</span></span></code></pre></div>`,113)])])}const r=a(_,[["render",l]]);export{o as __pageData,r as default};
