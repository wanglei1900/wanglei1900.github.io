import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"Jenkins安全加固完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"devops/deployment/cicd-tools/jenkins/security.md","filePath":"devops/deployment/cicd-tools/jenkins/security.md"}'),p={name:"devops/deployment/cicd-tools/jenkins/security.md"};function h(l,s,c,t,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="jenkins安全加固完整学习笔记" tabindex="-1">Jenkins安全加固完整学习笔记 <a class="header-anchor" href="#jenkins安全加固完整学习笔记" aria-label="Permalink to &quot;Jenkins安全加固完整学习笔记&quot;">​</a></h1><h2 id="一、jenkins安全概述与威胁模型" tabindex="-1">一、Jenkins安全概述与威胁模型 <a class="header-anchor" href="#一、jenkins安全概述与威胁模型" aria-label="Permalink to &quot;一、Jenkins安全概述与威胁模型&quot;">​</a></h2><h3 id="_1-1-jenkins安全重要性" tabindex="-1">1.1 Jenkins安全重要性 <a class="header-anchor" href="#_1-1-jenkins安全重要性" aria-label="Permalink to &quot;1.1 Jenkins安全重要性&quot;">​</a></h3><p><strong>为什么需要安全加固</strong>：</p><ul><li>Jenkins控制构建、部署和基础设施访问权限</li><li>存储大量敏感信息（凭据、API密钥、代码等）</li><li>作为攻击面的关键入口点</li><li>合规性要求（GDPR、HIPAA、PCI-DSS等）</li></ul><h3 id="_1-2-常见攻击向量" tabindex="-1">1.2 常见攻击向量 <a class="header-anchor" href="#_1-2-常见攻击向量" aria-label="Permalink to &quot;1.2 常见攻击向量&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">1. 未授权访问 → 配置错误/弱认证</span></span>
<span class="line"><span class="__shiki_wvjl67">2. 凭据泄露 → 不安全的凭据管理</span></span>
<span class="line"><span class="__shiki_wvjl67">3. 代码注入 → 不安全的流水线脚本</span></span>
<span class="line"><span class="__shiki_wvjl67">4. 特权升级 → 插件漏洞/配置不当</span></span>
<span class="line"><span class="__shiki_wvjl67">5. 供应链攻击 → 恶意插件/依赖</span></span></code></pre></div><h3 id="_1-3-安全加固框架" tabindex="-1">1.3 安全加固框架 <a class="header-anchor" href="#_1-3-安全加固框架" aria-label="Permalink to &quot;1.3 安全加固框架&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">身份认证 → 访问控制 → 数据保护 → 监控审计 → 应急响应</span></span></code></pre></div><h2 id="二、安装与基础环境安全" tabindex="-1">二、安装与基础环境安全 <a class="header-anchor" href="#二、安装与基础环境安全" aria-label="Permalink to &quot;二、安装与基础环境安全&quot;">​</a></h2><h3 id="_2-1-安全安装指南" tabindex="-1">2.1 安全安装指南 <a class="header-anchor" href="#_2-1-安全安装指南" aria-label="Permalink to &quot;2.1 安全安装指南&quot;">​</a></h3><p><strong>操作系统层面</strong>：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 专用用户和组</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> groupadd</span><span class="__shiki_mdbnqw"> jenkins</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> useradd</span><span class="__shiki_dzsirb"> -r</span><span class="__shiki_dzsirb"> -g</span><span class="__shiki_mdbnqw"> jenkins</span><span class="__shiki_dzsirb"> -m</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_mdbnqw"> /var/lib/jenkins</span><span class="__shiki_mdbnqw"> jenkins</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 最小权限原则</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> chown</span><span class="__shiki_dzsirb"> -R</span><span class="__shiki_mdbnqw"> jenkins:jenkins</span><span class="__shiki_mdbnqw"> /var/lib/jenkins</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> chmod</span><span class="__shiki_dzsirb"> 750</span><span class="__shiki_mdbnqw"> /var/lib/jenkins</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 文件系统加固</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> mount</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> remount,nosuid,nodev,noexec</span><span class="__shiki_mdbnqw"> /tmp</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> chattr</span><span class="__shiki_mdbnqw"> +i</span><span class="__shiki_mdbnqw"> /etc/passwd</span><span class="__shiki_mdbnqw"> /etc/shadow</span></span></code></pre></div><p><strong>Docker部署安全</strong>：</p><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Dockerfile.jenkins-secure</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> jenkins/jenkins:lts-jdk17</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 切换到非root用户（Jenkins镜像默认使用jenkins用户）</span></span>
<span class="line"><span class="__shiki_1itgoe">USER</span><span class="__shiki_140thh"> jenkins</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置安全目录权限</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> mkdir -p /var/jenkins_home/.ssh &amp;&amp; \\</span></span>
<span class="line"><span class="__shiki_140thh">    chmod 700 /var/jenkins_home/.ssh &amp;&amp; \\</span></span>
<span class="line"><span class="__shiki_140thh">    mkdir -p /var/jenkins_home/workspace &amp;&amp; \\</span></span>
<span class="line"><span class="__shiki_140thh">    chmod 750 /var/jenkins_home/workspace</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 移除不必要的工具</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> apt-get update &amp;&amp; \\</span></span>
<span class="line"><span class="__shiki_140thh">    apt-get remove -y curl wget netcat &amp;&amp; \\</span></span>
<span class="line"><span class="__shiki_140thh">    apt-get autoremove -y &amp;&amp; \\</span></span>
<span class="line"><span class="__shiki_140thh">    rm -rf /var/lib/apt/lists/*</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 添加安全配置</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> security.groovy /usr/share/jenkins/ref/init.groovy.d/</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> plugins.txt /usr/share/jenkins/ref/</span></span></code></pre></div><h3 id="_2-2-网络配置安全" tabindex="-1">2.2 网络配置安全 <a class="header-anchor" href="#_2-2-网络配置安全" aria-label="Permalink to &quot;2.2 网络配置安全&quot;">​</a></h3><p><strong>防火墙规则</strong>：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 只开放必要端口</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> ufw</span><span class="__shiki_mdbnqw"> allow</span><span class="__shiki_mdbnqw"> 22/tcp</span><span class="__shiki_21nrsd">  # SSH</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> ufw</span><span class="__shiki_mdbnqw"> allow</span><span class="__shiki_mdbnqw"> 443/tcp</span><span class="__shiki_21nrsd"> # HTTPS</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> ufw</span><span class="__shiki_mdbnqw"> allow</span><span class="__shiki_mdbnqw"> 8080/tcp</span><span class="__shiki_mdbnqw"> from</span><span class="__shiki_mdbnqw"> 10.0.0.0/8</span><span class="__shiki_21nrsd">  # 仅内部访问</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 拒绝所有其他入站</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> ufw</span><span class="__shiki_mdbnqw"> default</span><span class="__shiki_mdbnqw"> deny</span><span class="__shiki_mdbnqw"> incoming</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> ufw</span><span class="__shiki_mdbnqw"> enable</span></span></code></pre></div><p><strong>Nginx反向代理配置</strong>：</p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># /etc/nginx/sites-available/jenkins</span></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_dzsirb">443</span><span class="__shiki_140thh"> ssl http2;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server_name </span><span class="__shiki_140thh">jenkins.company.com;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSL配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_certificate </span><span class="__shiki_140thh">/etc/letsencrypt/live/jenkins.company.com/fullchain.pem;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_certificate_key </span><span class="__shiki_140thh">/etc/letsencrypt/live/jenkins.company.com/privkey.pem;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_protocols </span><span class="__shiki_140thh">TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_ciphers </span><span class="__shiki_140thh">ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_prefer_server_ciphers </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 安全头部</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">Strict-Transport-Security </span><span class="__shiki_mdbnqw">&quot;max-age=31536000; includeSubDomains&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">X-Content-Type-Options nosniff always;</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">X-Frame-Options DENY always;</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">X-XSS-Protection </span><span class="__shiki_mdbnqw">&quot;1; mode=block&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">Content-Security-Policy </span><span class="__shiki_mdbnqw">&quot;default-src &#39;self&#39;; script-src &#39;self&#39; &#39;unsafe-inline&#39; &#39;unsafe-eval&#39;; style-src &#39;self&#39; &#39;unsafe-inline&#39;;&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 限制请求大小</span></span>
<span class="line"><span class="__shiki_1itgoe">    client_max_body_size </span><span class="__shiki_dzsirb">10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 代理设置</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://localhost:8080;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">Host $host;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">X-Real-IP $remote_addr;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">X-Forwarded-Proto $scheme;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 超时设置</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_connect_timeout </span><span class="__shiki_dzsirb">60s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_send_timeout </span><span class="__shiki_dzsirb">60s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_read_timeout </span><span class="__shiki_dzsirb">60s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 限制访问频率</span></span>
<span class="line"><span class="__shiki_1itgoe">    limit_req_zone </span><span class="__shiki_140thh">$binary_remote_addr zone=jenkins:10m rate=10r/s;</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /login </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        limit_req </span><span class="__shiki_140thh">zone=jenkins burst=20 nodelay;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-3-初始化安全配置" tabindex="-1">2.3 初始化安全配置 <a class="header-anchor" href="#_2-3-初始化安全配置" aria-label="Permalink to &quot;2.3 初始化安全配置&quot;">​</a></h3><p><strong>安全启动脚本</strong>：</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// /var/lib/jenkins/init.groovy.d/security-init.groovy</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> jenkins.model.*</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> hudson.security.*</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> hudson.util.*</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> jenkins.security.s2m.*</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> org.jenkinsci.plugins.*</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 1. 禁用管理员初始化向导</span></span>
<span class="line"><span class="__shiki_1itgoe">System.</span><span class="__shiki_140thh">setProperty(</span><span class="__shiki_mdbnqw">&quot;jenkins.install.runSetupWizard&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;false&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 获取Jenkins实例</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_140thh"> instance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> Jenkins.</span><span class="__shiki_140thh">getInstance()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 3. 配置安全领域 - 使用LDAP或数据库</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_140thh"> strategy </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1itgoe"> GlobalMatrixAuthorizationStrategy</span><span class="__shiki_140thh">()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 4. 设置管理员权限</span></span>
<span class="line"><span class="__shiki_140thh">strategy</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">add(</span><span class="__shiki_1itgoe">Jenkins.</span><span class="__shiki_dzsirb">ADMINISTER</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;admin-group&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">strategy</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">add(</span><span class="__shiki_1itgoe">Jenkins.</span><span class="__shiki_dzsirb">READ</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;authenticated&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">strategy</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">add(</span><span class="__shiki_1itgoe">Item.</span><span class="__shiki_dzsirb">BUILD</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;developer-group&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">strategy</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">add(</span><span class="__shiki_1itgoe">Item.</span><span class="__shiki_dzsirb">READ</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;developer-group&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 5. 应用安全设置</span></span>
<span class="line"><span class="__shiki_140thh">instance</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">setAuthorizationStrategy(strategy)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 6. 启用代理到主控安全</span></span>
<span class="line"><span class="__shiki_1itgoe">AdminWhitelistRule</span><span class="__shiki_140thh"> rule </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> Jenkins.</span><span class="__shiki_140thh">instance</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">getExtensionList(</span><span class="__shiki_1itgoe">RootAction.</span><span class="__shiki_140thh">class)</span></span>
<span class="line"><span class="__shiki_140thh">    .get(</span><span class="__shiki_1itgoe">AdminWhitelistRule.</span><span class="__shiki_140thh">class)</span></span>
<span class="line"><span class="__shiki_140thh">rule</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">setMasterKillSwitch(</span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 7. 保存配置</span></span>
<span class="line"><span class="__shiki_140thh">instance</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">save()</span></span></code></pre></div><h2 id="三、认证与授权机制" tabindex="-1">三、认证与授权机制 <a class="header-anchor" href="#三、认证与授权机制" aria-label="Permalink to &quot;三、认证与授权机制&quot;">​</a></h2><h3 id="_3-1-认证配置" tabindex="-1">3.1 认证配置 <a class="header-anchor" href="#_3-1-认证配置" aria-label="Permalink to &quot;3.1 认证配置&quot;">​</a></h3><p><strong>LDAP集成</strong>：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">&lt;!-- Jenkins LDAP配置示例 --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">securityRealm</span><span class="__shiki_1t8gfj"> class</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;hudson.security.LDAPSecurityRealm&quot;</span><span class="__shiki_1t8gfj"> plugin</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;ldap@1.20&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">server</span><span class="__shiki_140thh">&gt;ldap://ldap.company.com:389&lt;/</span><span class="__shiki_17hn0y">server</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">rootDN</span><span class="__shiki_140thh">&gt;dc=company,dc=com&lt;/</span><span class="__shiki_17hn0y">rootDN</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">inhibitInferRootDN</span><span class="__shiki_140thh">&gt;false&lt;/</span><span class="__shiki_17hn0y">inhibitInferRootDN</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">userSearchBase</span><span class="__shiki_140thh">&gt;ou=users&lt;/</span><span class="__shiki_17hn0y">userSearchBase</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">userSearch</span><span class="__shiki_140thh">&gt;uid={0}&lt;/</span><span class="__shiki_17hn0y">userSearch</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">groupSearchBase</span><span class="__shiki_140thh">&gt;ou=groups&lt;/</span><span class="__shiki_17hn0y">groupSearchBase</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">groupSearchFilter</span><span class="__shiki_140thh">&gt;(</span><span class="__shiki_dzsirb">&amp;amp;</span><span class="__shiki_140thh">(objectClass=groupOfNames)(member={0}))&lt;/</span><span class="__shiki_17hn0y">groupSearchFilter</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">groupMembershipFilter</span><span class="__shiki_140thh">&gt;(</span><span class="__shiki_dzsirb">&amp;amp;</span><span class="__shiki_140thh">(objectClass=person)(memberOf={0}))&lt;/</span><span class="__shiki_17hn0y">groupMembershipFilter</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  &lt;!-- 安全连接 --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">disableMailAddressResolver</span><span class="__shiki_140thh">&gt;false&lt;/</span><span class="__shiki_17hn0y">disableMailAddressResolver</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">displayNameAttributeName</span><span class="__shiki_140thh">&gt;displayName&lt;/</span><span class="__shiki_17hn0y">displayNameAttributeName</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">mailAddressAttributeName</span><span class="__shiki_140thh">&gt;mail&lt;/</span><span class="__shiki_17hn0y">mailAddressAttributeName</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  &lt;!-- 缓存配置 --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">cache</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">size</span><span class="__shiki_140thh">&gt;100&lt;/</span><span class="__shiki_17hn0y">size</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">ttl</span><span class="__shiki_140thh">&gt;300&lt;/</span><span class="__shiki_17hn0y">ttl</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;/</span><span class="__shiki_17hn0y">cache</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  &lt;!-- TLS配置 --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">startTls</span><span class="__shiki_140thh">&gt;true&lt;/</span><span class="__shiki_17hn0y">startTls</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">tlsConfiguration</span><span class="__shiki_140thh">&gt;TRUST_ALL_CERTIFICATES&lt;/</span><span class="__shiki_17hn0y">tlsConfiguration</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_17hn0y">securityRealm</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><p><strong>多因素认证</strong>：</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 配置Google Authenticator</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> org.jenkinsci.plugins.GlobalConfiguration</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> com.google.security.mfa.*</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_140thh"> mfaConfig </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> GlobalConfiguration.</span><span class="__shiki_140thh">all()</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">get(</span><span class="__shiki_1itgoe">MFAConfig.</span><span class="__shiki_140thh">class)</span></span>
<span class="line"><span class="__shiki_140thh">mfaConfig</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">enabled </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_140thh">mfaConfig</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">enforceForAllUsers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_140thh">mfaConfig</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">issuer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;Company Jenkins&quot;</span></span>
<span class="line"><span class="__shiki_140thh">mfaConfig</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">windowSize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">mfaConfig</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">save()</span></span></code></pre></div><h3 id="_3-2-授权策略" tabindex="-1">3.2 授权策略 <a class="header-anchor" href="#_3-2-授权策略" aria-label="Permalink to &quot;3.2 授权策略&quot;">​</a></h3><p><strong>基于角色的访问控制（RBAC）</strong>：</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用Role Strategy Plugin</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> com.michelin.cio.hudson.plugins.rolestrategy.*</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> jenkins.model.*</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> hudson.security.*</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_140thh"> instance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> Jenkins.</span><span class="__shiki_140thh">getInstance()</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_140thh"> strategy </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1itgoe"> RoleBasedAuthorizationStrategy</span><span class="__shiki_140thh">()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 1. 定义全局角色</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_140thh"> globalRoles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> strategy</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">getGrantedRoles(</span><span class="__shiki_1itgoe">RoleBasedAuthorizationStrategy.</span><span class="__shiki_dzsirb">GLOBAL</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">globalRoles</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">add(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1itgoe"> Role</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;admin&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;.*&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">    [</span><span class="__shiki_mdbnqw">&quot;hudson.model.Hudson.Administer&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">     &quot;hudson.model.Hudson.Read&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">     &quot;hudson.model.View.Delete&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">     &quot;hudson.model.View.Create&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> Set</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">globalRoles</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">add(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1itgoe"> Role</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;viewer&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;.*&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">    [</span><span class="__shiki_mdbnqw">&quot;hudson.model.Hudson.Read&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> Set</span><span class="__shiki_140thh">))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 定义项目角色</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_140thh"> projectRoles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> strategy</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">getGrantedRoles(</span><span class="__shiki_1itgoe">RoleBasedAuthorizationStrategy.</span><span class="__shiki_dzsirb">PROJECT</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">projectRoles</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">add(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1itgoe"> Role</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;developer&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;project-.*&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    [</span><span class="__shiki_mdbnqw">&quot;hudson.model.Item.Build&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">     &quot;hudson.model.Item.Cancel&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">     &quot;hudson.model.Item.Read&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">     &quot;hudson.model.Item.Workspace&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> Set</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">projectRoles</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">add(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1itgoe"> Role</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;tester&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;project-.*&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    [</span><span class="__shiki_mdbnqw">&quot;hudson.model.Item.Read&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">     &quot;hudson.model.Item.Discover&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> Set</span><span class="__shiki_140thh">))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 3. 分配角色到组/用户</span></span>
<span class="line"><span class="__shiki_140thh">strategy</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">assignRole(</span><span class="__shiki_1itgoe">RoleBasedAuthorizationStrategy.</span><span class="__shiki_dzsirb">GLOBAL</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;admin&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;admin-group&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">strategy</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">assignRole(</span><span class="__shiki_1itgoe">RoleBasedAuthorizationStrategy.</span><span class="__shiki_dzsirb">GLOBAL</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;viewer&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;all-users&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">strategy</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">assignRole(</span><span class="__shiki_1itgoe">RoleBasedAuthorizationStrategy.</span><span class="__shiki_dzsirb">PROJECT</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;developer&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;dev-group&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">strategy</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">assignRole(</span><span class="__shiki_1itgoe">RoleBasedAuthorizationStrategy.</span><span class="__shiki_dzsirb">PROJECT</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;tester&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;qa-group&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">instance</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">setAuthorizationStrategy(strategy)</span></span>
<span class="line"><span class="__shiki_140thh">instance</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">save()</span></span></code></pre></div><p><strong>最小权限原则实现</strong>：</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用Matrix Authorization Strategy实现细粒度控制</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> jenkins.model.*</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> hudson.security.*</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> hudson.model.*</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_140thh"> instance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> Jenkins.</span><span class="__shiki_140thh">getInstance()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 创建矩阵策略</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_140thh"> strategy </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1itgoe"> ProjectMatrixAuthorizationStrategy</span><span class="__shiki_140thh">()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 全局权限</span></span>
<span class="line"><span class="__shiki_140thh">strategy</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">add(</span><span class="__shiki_1itgoe">Jenkins.</span><span class="__shiki_dzsirb">ADMINISTER</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;jenkins-admin&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">strategy</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">add(</span><span class="__shiki_1itgoe">Jenkins.</span><span class="__shiki_dzsirb">READ</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;authenticated&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 项目特定权限（通过脚本动态设置）</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_140thh"> projects </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> instance</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">getAllItems(</span><span class="__shiki_1itgoe">Job.</span><span class="__shiki_140thh">class)</span></span>
<span class="line"><span class="__shiki_140thh">projects</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">each { </span><span class="__shiki_1jdh33">project</span><span class="__shiki_1itgoe"> -&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 根据项目名称设置权限</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (project</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">name</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">startsWith(</span><span class="__shiki_mdbnqw">&quot;prod-&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_140thh">        strategy</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">add(</span><span class="__shiki_1itgoe">Item.</span><span class="__shiki_dzsirb">READ</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;prod-team&quot;</span><span class="__shiki_140thh">, project)</span></span>
<span class="line"><span class="__shiki_140thh">        strategy</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">add(</span><span class="__shiki_1itgoe">Item.</span><span class="__shiki_dzsirb">BUILD</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;prod-team&quot;</span><span class="__shiki_140thh">, project)</span></span>
<span class="line"><span class="__shiki_140thh">        strategy</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">add(</span><span class="__shiki_1itgoe">Item.</span><span class="__shiki_dzsirb">CONFIGURE</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;prod-admin&quot;</span><span class="__shiki_140thh">, project)</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (project</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">name</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">startsWith(</span><span class="__shiki_mdbnqw">&quot;dev-&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_140thh">        strategy</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">add(</span><span class="__shiki_1itgoe">Item.</span><span class="__shiki_dzsirb">READ</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;dev-team&quot;</span><span class="__shiki_140thh">, project)</span></span>
<span class="line"><span class="__shiki_140thh">        strategy</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">add(</span><span class="__shiki_1itgoe">Item.</span><span class="__shiki_dzsirb">BUILD</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;dev-team&quot;</span><span class="__shiki_140thh">, project)</span></span>
<span class="line"><span class="__shiki_140thh">        strategy</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">add(</span><span class="__shiki_1itgoe">Item.</span><span class="__shiki_dzsirb">CONFIGURE</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;team-lead&quot;</span><span class="__shiki_140thh">, project)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">instance</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">setAuthorizationStrategy(strategy)</span></span>
<span class="line"><span class="__shiki_140thh">instance</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">save()</span></span></code></pre></div><h2 id="四、凭据安全管理" tabindex="-1">四、凭据安全管理 <a class="header-anchor" href="#四、凭据安全管理" aria-label="Permalink to &quot;四、凭据安全管理&quot;">​</a></h2><h3 id="_4-1-凭据存储与加密" tabindex="-1">4.1 凭据存储与加密 <a class="header-anchor" href="#_4-1-凭据存储与加密" aria-label="Permalink to &quot;4.1 凭据存储与加密&quot;">​</a></h3><p><strong>配置凭据存储</strong>：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">&lt;!-- credentials.xml安全配置 --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">com.cloudbees.plugins.credentials.SystemCredentialsProvider</span><span class="__shiki_1t8gfj"> plugin</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;credentials@2.3.12&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">domainCredentialsMap</span><span class="__shiki_1t8gfj"> class</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;huygens&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">entry</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;</span><span class="__shiki_17hn0y">com.cloudbees.plugins.credentials.domains.Domain</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;</span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">&gt;github.com&lt;/</span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;</span><span class="__shiki_17hn0y">specifications</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">          &lt;</span><span class="__shiki_17hn0y">com.cloudbees.plugins.credentials.domains.HostnameSpecification</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">            &lt;</span><span class="__shiki_17hn0y">includes</span><span class="__shiki_140thh">&gt;github.com&lt;/</span><span class="__shiki_17hn0y">includes</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">          &lt;/</span><span class="__shiki_17hn0y">com.cloudbees.plugins.credentials.domains.HostnameSpecification</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;/</span><span class="__shiki_17hn0y">specifications</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;/</span><span class="__shiki_17hn0y">com.cloudbees.plugins.credentials.domains.Domain</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;</span><span class="__shiki_17hn0y">java.util.concurrent.CopyOnWriteArrayList</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">        &lt;!-- SSH密钥凭据 --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;</span><span class="__shiki_17hn0y">com.cloudbees.jenkins.plugins.sshcredentials.impl.BasicSSHUserPrivateKey</span><span class="__shiki_1t8gfj"> plugin</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;ssh-credentials@1.17&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">          &lt;</span><span class="__shiki_17hn0y">scope</span><span class="__shiki_140thh">&gt;GLOBAL&lt;/</span><span class="__shiki_17hn0y">scope</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">          &lt;</span><span class="__shiki_17hn0y">id</span><span class="__shiki_140thh">&gt;github-ssh-key&lt;/</span><span class="__shiki_17hn0y">id</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">          &lt;</span><span class="__shiki_17hn0y">description</span><span class="__shiki_140thh">&gt;GitHub Deploy Key&lt;/</span><span class="__shiki_17hn0y">description</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">          &lt;</span><span class="__shiki_17hn0y">username</span><span class="__shiki_140thh">&gt;git&lt;/</span><span class="__shiki_17hn0y">username</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">          &lt;</span><span class="__shiki_17hn0y">privateKeySource</span><span class="__shiki_1t8gfj"> class</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;com.cloudbees.jenkins.plugins.sshcredentials.impl.BasicSSHUserPrivateKey$DirectEntryPrivateKeySource&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">            &lt;</span><span class="__shiki_17hn0y">privateKey</span><span class="__shiki_140thh">&gt;\${ENCRYPTED_KEY}&lt;/</span><span class="__shiki_17hn0y">privateKey</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">          &lt;/</span><span class="__shiki_17hn0y">privateKeySource</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">          &lt;</span><span class="__shiki_17hn0y">passphrase</span><span class="__shiki_140thh">&gt;\${ENCRYPTED_PASSPHRASE}&lt;/</span><span class="__shiki_17hn0y">passphrase</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;/</span><span class="__shiki_17hn0y">com.cloudbees.jenkins.plugins.sshcredentials.impl.BasicSSHUserPrivateKey</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        &lt;!-- 用户名密码凭据 --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;</span><span class="__shiki_17hn0y">com.cloudbees.plugins.credentials.impl.UsernamePasswordCredentialsImpl</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">          &lt;</span><span class="__shiki_17hn0y">scope</span><span class="__shiki_140thh">&gt;GLOBAL&lt;/</span><span class="__shiki_17hn0y">scope</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">          &lt;</span><span class="__shiki_17hn0y">id</span><span class="__shiki_140thh">&gt;artifactory-creds&lt;/</span><span class="__shiki_17hn0y">id</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">          &lt;</span><span class="__shiki_17hn0y">description</span><span class="__shiki_140thh">&gt;Artifactory Credentials&lt;/</span><span class="__shiki_17hn0y">description</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">          &lt;</span><span class="__shiki_17hn0y">username</span><span class="__shiki_140thh">&gt;jenkins-service&lt;/</span><span class="__shiki_17hn0y">username</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">          &lt;</span><span class="__shiki_17hn0y">password</span><span class="__shiki_140thh">&gt;\${ENCRYPTED_PASSWORD}&lt;/</span><span class="__shiki_17hn0y">password</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;/</span><span class="__shiki_17hn0y">com.cloudbees.plugins.credentials.impl.UsernamePasswordCredentialsImpl</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        &lt;!-- 秘密文本凭据 --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;</span><span class="__shiki_17hn0y">org.jenkinsci.plugins.plaincredentials.impl.StringCredentialsImpl</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">          &lt;</span><span class="__shiki_17hn0y">scope</span><span class="__shiki_140thh">&gt;SYSTEM&lt;/</span><span class="__shiki_17hn0y">scope</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">          &lt;</span><span class="__shiki_17hn0y">id</span><span class="__shiki_140thh">&gt;api-token&lt;/</span><span class="__shiki_17hn0y">id</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">          &lt;</span><span class="__shiki_17hn0y">description</span><span class="__shiki_140thh">&gt;API Access Token&lt;/</span><span class="__shiki_17hn0y">description</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">          &lt;</span><span class="__shiki_17hn0y">secret</span><span class="__shiki_140thh">&gt;\${ENCRYPTED_SECRET}&lt;/</span><span class="__shiki_17hn0y">secret</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;/</span><span class="__shiki_17hn0y">org.jenkinsci.plugins.plaincredentials.impl.StringCredentialsImpl</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;/</span><span class="__shiki_17hn0y">java.util.concurrent.CopyOnWriteArrayList</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_17hn0y">entry</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;/</span><span class="__shiki_17hn0y">domainCredentialsMap</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_17hn0y">com.cloudbees.plugins.credentials.SystemCredentialsProvider</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h3 id="_4-2-外部凭据管理集成" tabindex="-1">4.2 外部凭据管理集成 <a class="header-anchor" href="#_4-2-外部凭据管理集成" aria-label="Permalink to &quot;4.2 外部凭据管理集成&quot;">​</a></h3><p><strong>Hashicorp Vault集成</strong>：</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Jenkinsfile中使用Vault</span></span>
<span class="line"><span class="__shiki_140thh">pipeline {</span></span>
<span class="line"><span class="__shiki_140thh">    agent any</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    environment {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 从Vault获取凭据</span></span>
<span class="line"><span class="__shiki_dzsirb">        AWS_CREDS</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> credentials(</span><span class="__shiki_mdbnqw">&#39;vault://secret/aws/creds&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        DB_PASSWORD</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> credentials(</span><span class="__shiki_mdbnqw">&#39;vault://secret/database/prod&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    stages {</span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;从Vault获取凭据&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 使用Vault插件</span></span>
<span class="line"><span class="__shiki_140thh">                    withVault(</span></span>
<span class="line"><span class="__shiki_dzsirb">                        configuration</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_dzsirb">                            vaultUrl</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;https://vault.company.com&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                            vaultCredentialId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;vault-token&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                        ],</span></span>
<span class="line"><span class="__shiki_dzsirb">                        vaultSecrets</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">                            [</span></span>
<span class="line"><span class="__shiki_dzsirb">                                path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;secret/data/aws&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                                engineVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                                secretValues</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">                                    [</span><span class="__shiki_dzsirb">envVar</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;AWS_ACCESS_KEY_ID&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">vaultKey</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;access_key&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">                                    [</span><span class="__shiki_dzsirb">envVar</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;AWS_SECRET_ACCESS_KEY&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">vaultKey</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;secret_key&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">                                ]</span></span>
<span class="line"><span class="__shiki_140thh">                            ]</span></span>
<span class="line"><span class="__shiki_140thh">                        ]</span></span>
<span class="line"><span class="__shiki_140thh">                    ) {</span></span>
<span class="line"><span class="__shiki_140thh">                        sh </span><span class="__shiki_mdbnqw">&#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            echo &quot;使用AWS凭据部署...&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            aws s3 sync dist/ s3://bucket/</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>AWS Secrets Manager集成</strong>：</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用AWS Secrets Manager</span></span>
<span class="line"><span class="__shiki_140thh">withAWS(</span><span class="__shiki_dzsirb">region</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;us-east-1&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">credentials</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;aws-jenkins-role&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> secret </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> getSecret(</span><span class="__shiki_mdbnqw">&#39;production/database&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> dbConfig </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> readJSON </span><span class="__shiki_dzsirb">text</span><span class="__shiki_140thh">: secret</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    withCredentials([</span></span>
<span class="line"><span class="__shiki_140thh">        usernamePassword(</span></span>
<span class="line"><span class="__shiki_dzsirb">            credentialsId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;db-creds&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            usernameVariable</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;DB_USER&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            passwordVariable</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;DB_PASSWORD&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    ]) {</span></span>
<span class="line"><span class="__shiki_140thh">        sh </span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            export DB_HOST=\${dbConfig.host}</span></span>
<span class="line"><span class="__shiki_mdbnqw">            export DB_PORT=\${dbConfig.port}</span></span>
<span class="line"><span class="__shiki_mdbnqw">            ./deploy-database.sh</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-3-凭据使用最佳实践" tabindex="-1">4.3 凭据使用最佳实践 <a class="header-anchor" href="#_4-3-凭据使用最佳实践" aria-label="Permalink to &quot;4.3 凭据使用最佳实践&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 安全的凭据使用模式</span></span>
<span class="line"><span class="__shiki_140thh">pipeline {</span></span>
<span class="line"><span class="__shiki_140thh">    agent any</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    stages {</span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;安全使用凭据&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 1. 使用withCredentials包装</span></span>
<span class="line"><span class="__shiki_140thh">                    withCredentials([</span></span>
<span class="line"><span class="__shiki_140thh">                        usernamePassword(</span></span>
<span class="line"><span class="__shiki_dzsirb">                            credentialsId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;nexus-creds&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                            usernameVariable</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;NEXUS_USER&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                            passwordVariable</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;NEXUS_PASS&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                        ),</span></span>
<span class="line"><span class="__shiki_140thh">                        string(</span></span>
<span class="line"><span class="__shiki_dzsirb">                            credentialsId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;api-token&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                            variable</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;API_TOKEN&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                        )</span></span>
<span class="line"><span class="__shiki_140thh">                    ]) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                        // 2. 避免在日志中暴露</span></span>
<span class="line"><span class="__shiki_140thh">                        sh </span><span class="__shiki_mdbnqw">&#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            # 错误：会暴露密码</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            # echo &quot;密码是: $NEXUS_PASS&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            </span></span>
<span class="line"><span class="__shiki_mdbnqw">                            # 正确：使用掩码</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            curl -u $NEXUS_USER:$NEXUS_PASS https://nexus.company.com</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            </span></span>
<span class="line"><span class="__shiki_mdbnqw">                            # 3. 及时清理环境变量</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            unset NEXUS_PASS</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_21nrsd">                        // 4. 短期令牌最佳实践</span></span>
<span class="line"><span class="__shiki_1itgoe">                        def</span><span class="__shiki_140thh"> tempToken </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> generateTempToken(</span><span class="__shiki_dzsirb">validFor</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;1h&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                        sh </span><span class="__shiki_mdbnqw">&quot;curl -H &#39;Authorization: Bearer \${tempToken}&#39; https://api.company.com&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 5. 凭据轮换检查</span></span>
<span class="line"><span class="__shiki_140thh">                    checkCredentialRotation(</span><span class="__shiki_mdbnqw">&#39;nexus-creds&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">maxAgeDays</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">90</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    post {</span></span>
<span class="line"><span class="__shiki_140thh">        always {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 6. 清理临时文件</span></span>
<span class="line"><span class="__shiki_140thh">            cleanWs()</span></span>
<span class="line"><span class="__shiki_140thh">            sh </span><span class="__shiki_mdbnqw">&#39;rm -f /tmp/*.secret&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="五、流水线脚本安全" tabindex="-1">五、流水线脚本安全 <a class="header-anchor" href="#五、流水线脚本安全" aria-label="Permalink to &quot;五、流水线脚本安全&quot;">​</a></h2><h3 id="_5-1-脚本沙箱与批准" tabindex="-1">5.1 脚本沙箱与批准 <a class="header-anchor" href="#_5-1-脚本沙箱与批准" aria-label="Permalink to &quot;5.1 脚本沙箱与批准&quot;">​</a></h3><p><strong>Groovy沙箱配置</strong>：</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 脚本批准策略</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> org.jenkinsci.plugins.scriptsecurity.scripts.*</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> org.jenkinsci.plugins.scriptsecurity.sandbox.whitelists.*</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 1. 启用脚本安全</span></span>
<span class="line"><span class="__shiki_1itgoe">System.</span><span class="__shiki_140thh">setProperty(</span><span class="__shiki_mdbnqw">&quot;jenkins.script.security.enabled&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;true&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 配置沙箱白名单</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_140thh"> whitelist </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> ScriptApproval.</span><span class="__shiki_140thh">get()</span></span>
<span class="line"><span class="__shiki_140thh">whitelist</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">approveSignature(</span><span class="__shiki_mdbnqw">&quot;method java.lang.Runtime exec&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">whitelist</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">approveSignature(</span><span class="__shiki_mdbnqw">&quot;staticMethod org.codehaus.groovy.runtime.DefaultGroovyMethods execute&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">whitelist</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">approveSignature(</span><span class="__shiki_mdbnqw">&quot;method hudson.FilePath readToString&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 3. 限制危险操作</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_140thh"> dangerousSignatures </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;method java.lang.System exit&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;method java.lang.Runtime loadLibrary&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;staticMethod java.lang.Class forName&quot;</span></span>
<span class="line"><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">dangerousSignatures</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">each { </span><span class="__shiki_1jdh33">sig</span><span class="__shiki_1itgoe"> -&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    whitelist</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">denySignature(sig)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 4. 保存配置</span></span>
<span class="line"><span class="__shiki_140thh">whitelist</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">save()</span></span></code></pre></div><h3 id="_5-2-安全的pipeline开发" tabindex="-1">5.2 安全的Pipeline开发 <a class="header-anchor" href="#_5-2-安全的pipeline开发" aria-label="Permalink to &quot;5.2 安全的Pipeline开发&quot;">​</a></h3><p><strong>输入验证与消毒</strong>：</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 安全的Pipeline模板</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> call</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">Map</span><span class="__shiki_1jdh33"> params</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 输入验证</span></span>
<span class="line"><span class="__shiki_140thh">    validateInput(params)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 参数消毒</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> safeParams </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sanitizeParams(params)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    pipeline {</span></span>
<span class="line"><span class="__shiki_140thh">        agent any</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        parameters {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 3. 安全的参数定义</span></span>
<span class="line"><span class="__shiki_140thh">            choice(</span></span>
<span class="line"><span class="__shiki_dzsirb">                name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;ENVIRONMENT&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                choices</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;dev&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;staging&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;production&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_dzsirb">                description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;部署环境&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">            string(</span></span>
<span class="line"><span class="__shiki_dzsirb">                name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;VERSION&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                defaultValue</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;1.0.0&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;版本号&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                trim</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">            booleanParam(</span></span>
<span class="line"><span class="__shiki_dzsirb">                name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;DRY_RUN&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                defaultValue</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;是否试运行&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        options {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 4. 安全选项</span></span>
<span class="line"><span class="__shiki_140thh">            timestamps()</span></span>
<span class="line"><span class="__shiki_140thh">            buildDiscarder(logRotator(</span><span class="__shiki_dzsirb">numToKeepStr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;10&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">            disableConcurrentBuilds()</span></span>
<span class="line"><span class="__shiki_140thh">            timeout(</span><span class="__shiki_dzsirb">time</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">unit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;MINUTES&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        stages {</span></span>
<span class="line"><span class="__shiki_140thh">            stage(</span><span class="__shiki_mdbnqw">&#39;安全检查&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                steps {</span></span>
<span class="line"><span class="__shiki_140thh">                    script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                        // 5. 脚本安全检查</span></span>
<span class="line"><span class="__shiki_1itgoe">                        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">isSafeScript()) {</span></span>
<span class="line"><span class="__shiki_140thh">                            error </span><span class="__shiki_mdbnqw">&quot;脚本包含不安全操作&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                        }</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_21nrsd">                        // 6. 依赖安全检查</span></span>
<span class="line"><span class="__shiki_140thh">                        scanDependencies()</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_21nrsd">                        // 7. 代码静态分析</span></span>
<span class="line"><span class="__shiki_140thh">                        runSecurityScan()</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            stage(</span><span class="__shiki_mdbnqw">&#39;安全构建&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                steps {</span></span>
<span class="line"><span class="__shiki_140thh">                    script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                        // 8. 安全的shell执行</span></span>
<span class="line"><span class="__shiki_140thh">                        safeShell {</span></span>
<span class="line"><span class="__shiki_140thh">                            sh </span><span class="__shiki_mdbnqw">&#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                # 使用参数化命令</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                docker build \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                    --build-arg VERSION=\${VERSION} \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                    -t app:\${VERSION} .</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            &#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                        }</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_21nrsd">                        // 9. 避免命令注入</span></span>
<span class="line"><span class="__shiki_1itgoe">                        def</span><span class="__shiki_140thh"> safeCmd </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;docker&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;build&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">                        safeCmd </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_mdbnqw"> &quot;--build-arg&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                        safeCmd </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_mdbnqw"> &quot;VERSION=\${params.VERSION}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                        safeCmd </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_mdbnqw"> &quot;-t&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                        safeCmd </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_mdbnqw"> &quot;app:\${params.VERSION}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                        safeCmd </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_mdbnqw"> &quot;.&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_140thh">                        sh(safeCmd</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">join(</span><span class="__shiki_mdbnqw">&quot; &quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            stage(</span><span class="__shiki_mdbnqw">&#39;安全部署&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                when {</span></span>
<span class="line"><span class="__shiki_140thh">                    expression { params</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">ENVIRONMENT</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_mdbnqw"> &#39;production&#39;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                steps {</span></span>
<span class="line"><span class="__shiki_140thh">                    script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                        // 10. 人工审批</span></span>
<span class="line"><span class="__shiki_140thh">                        timeout(</span><span class="__shiki_dzsirb">time</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">24</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">unit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;HOURS&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                            input(</span></span>
<span class="line"><span class="__shiki_dzsirb">                                message</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;确认部署到生产环境？&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                                ok</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;确认部署&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                                submitter</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;prod-team&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                                parameters</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">                                    string(</span></span>
<span class="line"><span class="__shiki_dzsirb">                                        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;DEPLOY_REASON&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                                        description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;部署原因&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                                        required</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">                                    )</span></span>
<span class="line"><span class="__shiki_140thh">                                ]</span></span>
<span class="line"><span class="__shiki_140thh">                            )</span></span>
<span class="line"><span class="__shiki_140thh">                        }</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_21nrsd">                        // 11. 审计日志</span></span>
<span class="line"><span class="__shiki_140thh">                        auditLog(</span></span>
<span class="line"><span class="__shiki_dzsirb">                            action</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;deployment&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                            user</span><span class="__shiki_140thh">: env</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">BUILD_USER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                            details</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_dzsirb">                                environment</span><span class="__shiki_140thh">: params</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">ENVIRONMENT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                                version</span><span class="__shiki_140thh">: params</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">VERSION</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                                reason</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">DEPLOY_REASON</span></span>
<span class="line"><span class="__shiki_140thh">                            ]</span></span>
<span class="line"><span class="__shiki_140thh">                        )</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        post {</span></span>
<span class="line"><span class="__shiki_140thh">            always {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 12. 清理敏感数据</span></span>
<span class="line"><span class="__shiki_140thh">                cleanSensitiveData()</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 13. 安全报告</span></span>
<span class="line"><span class="__shiki_140thh">                generateSecurityReport()</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            success {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 14. 安全通知</span></span>
<span class="line"><span class="__shiki_140thh">                secureNotify(</span></span>
<span class="line"><span class="__shiki_dzsirb">                    channel</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;#deployments&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                    message</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;安全部署完成: \${env.JOB_NAME}&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                    level</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;info&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                )</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            failure {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 15. 安全事件响应</span></span>
<span class="line"><span class="__shiki_140thh">                handleSecurityIncident()</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 输入验证函数</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> validateInput</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">Map</span><span class="__shiki_1jdh33"> params</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> required </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;ENVIRONMENT&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;VERSION&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    required</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">each { </span><span class="__shiki_1jdh33">key</span><span class="__shiki_1itgoe"> -&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">params[key]) {</span></span>
<span class="line"><span class="__shiki_140thh">            error </span><span class="__shiki_mdbnqw">&quot;缺少必要参数: \${key}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证环境参数</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> validEnvs </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;dev&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;staging&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;production&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">(params</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">ENVIRONMENT</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> validEnvs)) {</span></span>
<span class="line"><span class="__shiki_140thh">        error </span><span class="__shiki_mdbnqw">&quot;无效环境: \${params.ENVIRONMENT}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证版本格式</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">(params</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">VERSION</span><span class="__shiki_1itgoe"> ==~</span><span class="__shiki_mdbnqw"> /</span><span class="__shiki_21q97f">^</span><span class="__shiki_ghujbu">\\d</span><span class="__shiki_21q97f">+</span><span class="__shiki_ghujbu">\\.\\d</span><span class="__shiki_21q97f">+</span><span class="__shiki_ghujbu">\\.\\d</span><span class="__shiki_21q97f">+$</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_140thh">        error </span><span class="__shiki_mdbnqw">&quot;无效版本格式: \${params.VERSION}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 参数消毒函数</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> sanitizeParams</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">Map</span><span class="__shiki_1jdh33"> params</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> sanitized </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [:]</span></span>
<span class="line"><span class="__shiki_140thh">    params</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">each { </span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">value</span><span class="__shiki_1itgoe"> -&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 移除潜在的恶意字符</span></span>
<span class="line"><span class="__shiki_1itgoe">        def</span><span class="__shiki_140thh"> cleanValue </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> value</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">toString()</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">replaceAll(</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_21q97f">[&lt;&gt;&quot;&#39;&amp;;|\`</span><span class="__shiki_ghujbu">\\$</span><span class="__shiki_21q97f">]</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        sanitized[key] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cleanValue</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> sanitized</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-3-共享库安全" tabindex="-1">5.3 共享库安全 <a class="header-anchor" href="#_5-3-共享库安全" aria-label="Permalink to &quot;5.3 共享库安全&quot;">​</a></h3><p><strong>安全的共享库结构</strong>：</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// vars/securePipeline.groovy</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> call</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">Closure</span><span class="__shiki_1jdh33"> body</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 安全包装器</span></span>
<span class="line"><span class="__shiki_140thh">    pipeline {</span></span>
<span class="line"><span class="__shiki_140thh">        agent any</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        stages {</span></span>
<span class="line"><span class="__shiki_140thh">            stage(</span><span class="__shiki_mdbnqw">&#39;安全初始化&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                steps {</span></span>
<span class="line"><span class="__shiki_140thh">                    script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                        // 1. 验证调用者</span></span>
<span class="line"><span class="__shiki_140thh">                        validateCaller()</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_21nrsd">                        // 2. 设置安全上下文</span></span>
<span class="line"><span class="__shiki_140thh">                        withSecurityContext {</span></span>
<span class="line"><span class="__shiki_21nrsd">                            // 3. 执行用户代码（在受控环境中）</span></span>
<span class="line"><span class="__shiki_140thh">                            body()</span></span>
<span class="line"><span class="__shiki_140thh">                        }</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        post {</span></span>
<span class="line"><span class="__shiki_140thh">            always {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 4. 安全清理</span></span>
<span class="line"><span class="__shiki_140thh">                cleanSecurityContext()</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 安全的工具函数</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> secureShell</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">String</span><span class="__shiki_1jdh33"> script</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证脚本内容</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (containsDangerousCommands(script)) {</span></span>
<span class="line"><span class="__shiki_140thh">        error </span><span class="__shiki_mdbnqw">&quot;脚本包含危险命令&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 在受控环境中执行</span></span>
<span class="line"><span class="__shiki_140thh">    withCredentials([sshUserPrivateKey(</span><span class="__shiki_dzsirb">credentialsId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;executor-key&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">keyFileVariable</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;KEY_FILE&#39;</span><span class="__shiki_140thh">)]) {</span></span>
<span class="line"><span class="__shiki_140thh">        sh </span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            set -euo pipefail</span></span>
<span class="line"><span class="__shiki_mdbnqw">            # 使用受限的shell</span></span>
<span class="line"><span class="__shiki_mdbnqw">            /bin/rbash -c \${script.bytes.encodeBase64().toString()}</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="六、插件安全管理" tabindex="-1">六、插件安全管理 <a class="header-anchor" href="#六、插件安全管理" aria-label="Permalink to &quot;六、插件安全管理&quot;">​</a></h2><h3 id="_6-1-插件风险评估" tabindex="-1">6.1 插件风险评估 <a class="header-anchor" href="#_6-1-插件风险评估" aria-label="Permalink to &quot;6.1 插件风险评估&quot;">​</a></h3><p><strong>插件安全评估矩阵</strong>：</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 插件安全检查脚本</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> jenkins.model.*</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> hudson.PluginWrapper</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_140thh"> instance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> Jenkins.</span><span class="__shiki_140thh">getInstance()</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_140thh"> pm </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> instance</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">pluginManager</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_140thh"> riskCategories </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;HIGH&#39;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;requiresRoot&#39;</span><span class="__shiki_140thh"> : </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;networkAccess&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;fileSystemAccess&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;codeExecution&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    ],</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;MEDIUM&#39;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;requiresRoot&#39;</span><span class="__shiki_140thh"> : </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;networkAccess&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;fileSystemAccess&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;codeExecution&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">    ],</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;LOW&#39;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;requiresRoot&#39;</span><span class="__shiki_140thh"> : </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;networkAccess&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;fileSystemAccess&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;codeExecution&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_140thh"> plugins </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pm</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">getPlugins()</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_140thh"> report </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [:]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">plugins</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">each { </span><span class="__shiki_1jdh33">plugin</span><span class="__shiki_1itgoe"> -&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> manifest </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> plugin</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">getManifest()</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> riskLevel </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;LOW&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 分析插件风险</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (plugin</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">hasPermission(</span><span class="__shiki_mdbnqw">&#39;hudson.model.Hudson.Administer&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_140thh">        riskLevel </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;HIGH&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (plugin</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">class</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">name</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">contains(</span><span class="__shiki_mdbnqw">&#39;Script&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">               plugin</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">class</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">name</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">contains(</span><span class="__shiki_mdbnqw">&#39;Execute&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_140thh">        riskLevel </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;HIGH&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    report[plugin</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">shortName] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">        version</span><span class="__shiki_140thh">: plugin</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">version,</span></span>
<span class="line"><span class="__shiki_dzsirb">        riskLevel</span><span class="__shiki_140thh">: riskLevel,</span></span>
<span class="line"><span class="__shiki_dzsirb">        lastUpdated</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1itgoe"> Date</span><span class="__shiki_140thh">(plugin</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">getFile()</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">lastModified()),</span></span>
<span class="line"><span class="__shiki_dzsirb">        requiredPermissions</span><span class="__shiki_140thh">: getRequiredPermissions(plugin)</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 生成安全报告</span></span>
<span class="line"><span class="__shiki_140thh">generateSecurityReport(report)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 高风险插件处理</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_140thh"> highRiskPlugins </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> report</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">findAll { </span><span class="__shiki_1jdh33">k</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">v</span><span class="__shiki_1itgoe"> -&gt;</span><span class="__shiki_140thh"> v</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">riskLevel </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;HIGH&#39;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> (highRiskPlugins) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    println</span><span class="__shiki_mdbnqw"> &quot;发现高风险插件：&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    highRiskPlugins</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">each { </span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">info</span><span class="__shiki_1itgoe"> -&gt;</span></span>
<span class="line"><span class="__shiki_dzsirb">        println</span><span class="__shiki_mdbnqw"> &quot;  - \${name} (\${info.version})&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        println</span><span class="__shiki_mdbnqw"> &quot;    最后更新: \${info.lastUpdated}&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        println</span><span class="__shiki_mdbnqw"> &quot;    建议: 评估是否需要，考虑替代方案&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-安全插件推荐" tabindex="-1">6.2 安全插件推荐 <a class="header-anchor" href="#_6-2-安全插件推荐" aria-label="Permalink to &quot;6.2 安全插件推荐&quot;">​</a></h3><p><strong>必备安全插件</strong>：</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 推荐的安全插件列表</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_140thh"> securityPlugins </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 认证与授权</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;matrix-auth&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;基于矩阵的授权策略&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;role-strategy&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;基于角色的访问控制&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;ldap&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;LDAP集成认证&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;saml&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;SAML单点登录&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;oauth&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;OAuth认证&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 凭据管理</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;credentials-binding&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;凭据绑定&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;hashicorp-vault-plugin&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Vault集成&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;aws-secrets-manager-credentials-provider&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;AWS Secrets Manager&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 安全扫描</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;dependency-check-jenkins-plugin&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;依赖漏洞扫描&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;owasp-dependency-check&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;OWASP依赖检查&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;checkmarx&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;静态应用安全测试&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;fortify&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Fortify扫描&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;sonarqube&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;代码质量与安全&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 合规与审计</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;audit-trail&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;审计跟踪&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;junit-attachments&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;测试报告附件&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;warnings-ng&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;安全警告&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 运行时安全</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;whitesource&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;开源组件扫描&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;aqua-microscanner&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;容器安全扫描&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;trivy&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;容器漏洞扫描&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 配置管理</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;configuration-as-code&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;配置即代码&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;job-dsl&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;作业DSL&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;pipeline-stage-view&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;流水线视图&#39;</span></span>
<span class="line"><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 自动安装安全插件</span></span>
<span class="line"><span class="__shiki_140thh">securityPlugins</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">each { </span><span class="__shiki_1jdh33">pluginId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">description</span><span class="__shiki_1itgoe"> -&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">pm</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">getPlugin(pluginId)) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        println</span><span class="__shiki_mdbnqw"> &quot;安装安全插件: \${pluginId} - \${description}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        pm</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">install([pluginId], </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-3-插件更新策略" tabindex="-1">6.3 插件更新策略 <a class="header-anchor" href="#_6-3-插件更新策略" aria-label="Permalink to &quot;6.3 插件更新策略&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 自动插件更新检查</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> java.util.concurrent.TimeUnit</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_140thh"> pluginUpdatePolicy </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">    critical</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_dzsirb">        checkInterval</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">TimeUnit.</span><span class="__shiki_dzsirb">HOURS</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">toMillis(</span><span class="__shiki_dzsirb">24</span><span class="__shiki_140thh">),  </span><span class="__shiki_21nrsd">// 每天检查</span></span>
<span class="line"><span class="__shiki_dzsirb">        autoUpdate</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 手动审批</span></span>
<span class="line"><span class="__shiki_dzsirb">        maxAgeDays</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">7</span><span class="__shiki_21nrsd">  // 最多延迟7天</span></span>
<span class="line"><span class="__shiki_140thh">    ],</span></span>
<span class="line"><span class="__shiki_dzsirb">    security</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_dzsirb">        checkInterval</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">TimeUnit.</span><span class="__shiki_dzsirb">HOURS</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">toMillis(</span><span class="__shiki_dzsirb">12</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_dzsirb">        autoUpdate</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        maxAgeDays</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_140thh">    ],</span></span>
<span class="line"><span class="__shiki_dzsirb">    regular</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_dzsirb">        checkInterval</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">TimeUnit.</span><span class="__shiki_dzsirb">DAYS</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">toMillis(</span><span class="__shiki_dzsirb">7</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_dzsirb">        autoUpdate</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        maxAgeDays</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 检查插件更新</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> checkPluginUpdates</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> updates </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pm</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">getPluginUpdates()</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> updatesByRisk </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">critical</span><span class="__shiki_140thh">: [], </span><span class="__shiki_dzsirb">security</span><span class="__shiki_140thh">: [], </span><span class="__shiki_dzsirb">regular</span><span class="__shiki_140thh">: []]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    updates</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">each { </span><span class="__shiki_1jdh33">update</span><span class="__shiki_1itgoe"> -&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        def</span><span class="__shiki_140thh"> plugin </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> update</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">plugin</span></span>
<span class="line"><span class="__shiki_1itgoe">        def</span><span class="__shiki_140thh"> risk </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> classifyPluginRisk(plugin)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (update</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">hasSecurityFix()) {</span></span>
<span class="line"><span class="__shiki_140thh">            updatesByRisk</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">security </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_140thh"> update</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (risk </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;HIGH&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            updatesByRisk</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">critical </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_140thh"> update</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            updatesByRisk</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">regular </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_140thh"> update</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> updatesByRisk</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 应用更新策略</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> applyUpdatePolicy</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">updatesByRisk</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    updatesByRisk</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">each { </span><span class="__shiki_1jdh33">riskLevel</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">updates</span><span class="__shiki_1itgoe"> -&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        def</span><span class="__shiki_140thh"> policy </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pluginUpdatePolicy[riskLevel]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        updates</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">each { </span><span class="__shiki_1jdh33">update</span><span class="__shiki_1itgoe"> -&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">            def</span><span class="__shiki_140thh"> daysOld </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> getDaysSinceRelease(update)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (policy</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">autoUpdate </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> daysOld </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> policy</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">maxAgeDays) {</span></span>
<span class="line"><span class="__shiki_dzsirb">                println</span><span class="__shiki_mdbnqw"> &quot;自动更新: \${update.plugin.displayName}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                update</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">install()</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">policy</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">autoUpdate) {</span></span>
<span class="line"><span class="__shiki_dzsirb">                println</span><span class="__shiki_mdbnqw"> &quot;需要手动审批: \${update.plugin.displayName}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                sendUpdateApprovalRequest(update)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="七、系统监控与审计" tabindex="-1">七、系统监控与审计 <a class="header-anchor" href="#七、系统监控与审计" aria-label="Permalink to &quot;七、系统监控与审计&quot;">​</a></h2><h3 id="_7-1-安全审计配置" tabindex="-1">7.1 安全审计配置 <a class="header-anchor" href="#_7-1-安全审计配置" aria-label="Permalink to &quot;7.1 安全审计配置&quot;">​</a></h3><p><strong>审计日志配置</strong>：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">&lt;!-- audit-trail.xml --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;?</span><span class="__shiki_17hn0y">xml</span><span class="__shiki_1t8gfj"> version</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&#39;1.1&#39;</span><span class="__shiki_1t8gfj"> encoding</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&#39;UTF-8&#39;</span><span class="__shiki_140thh">?&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">com.michelin.cio.hudson.plugins.audittrail.AuditTrailPlugin</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">loggers</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">    &lt;!-- 文件日志 --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">com.michelin.cio.hudson.plugins.audittrail.Logger</span><span class="__shiki_1t8gfj"> file</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;\${JENKINS_HOME}/audit.log&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;</span><span class="__shiki_17hn0y">patterns</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;</span><span class="__shiki_17hn0y">string</span><span class="__shiki_140thh">&gt;%date% - %user% - %event% - %result%&lt;/</span><span class="__shiki_17hn0y">string</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;/</span><span class="__shiki_17hn0y">patterns</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;</span><span class="__shiki_17hn0y">dateFormat</span><span class="__shiki_140thh">&gt;yyyy-MM-dd HH:mm:ss&lt;/</span><span class="__shiki_17hn0y">dateFormat</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_17hn0y">com.michelin.cio.hudson.plugins.audittrail.Logger</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    &lt;!-- Syslog输出 --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">com.michelin.cio.hudson.plugins.audittrail.Logger</span><span class="__shiki_1t8gfj"> syslog</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;true&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;</span><span class="__shiki_17hn0y">host</span><span class="__shiki_140thh">&gt;log.company.com&lt;/</span><span class="__shiki_17hn0y">host</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;</span><span class="__shiki_17hn0y">port</span><span class="__shiki_140thh">&gt;514&lt;/</span><span class="__shiki_17hn0y">port</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;</span><span class="__shiki_17hn0y">facility</span><span class="__shiki_140thh">&gt;LOCAL0&lt;/</span><span class="__shiki_17hn0y">facility</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_17hn0y">com.michelin.cio.hudson.plugins.audittrail.Logger</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    &lt;!-- Splunk集成 --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">com.michelin.cio.hudson.plugins.audittrail.Logger</span><span class="__shiki_1t8gfj"> splunk</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;true&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;</span><span class="__shiki_17hn0y">url</span><span class="__shiki_140thh">&gt;https://splunk.company.com:8088&lt;/</span><span class="__shiki_17hn0y">url</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;</span><span class="__shiki_17hn0y">token</span><span class="__shiki_140thh">&gt;\${SPLUNK_TOKEN}&lt;/</span><span class="__shiki_17hn0y">token</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;</span><span class="__shiki_17hn0y">index</span><span class="__shiki_140thh">&gt;jenkins-audit&lt;/</span><span class="__shiki_17hn0y">index</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;</span><span class="__shiki_17hn0y">sourcetype</span><span class="__shiki_140thh">&gt;jenkins:audit&lt;/</span><span class="__shiki_17hn0y">sourcetype</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_17hn0y">com.michelin.cio.hudson.plugins.audittrail.Logger</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;/</span><span class="__shiki_17hn0y">loggers</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  &lt;!-- 审计事件 --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">events</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">string</span><span class="__shiki_140thh">&gt;LOGIN&lt;/</span><span class="__shiki_17hn0y">string</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">string</span><span class="__shiki_140thh">&gt;LOGOUT&lt;/</span><span class="__shiki_17hn0y">string</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">string</span><span class="__shiki_140thh">&gt;CONFIGURE&lt;/</span><span class="__shiki_17hn0y">string</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">string</span><span class="__shiki_140thh">&gt;CREATE&lt;/</span><span class="__shiki_17hn0y">string</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">string</span><span class="__shiki_140thh">&gt;DELETE&lt;/</span><span class="__shiki_17hn0y">string</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">string</span><span class="__shiki_140thh">&gt;BUILD&lt;/</span><span class="__shiki_17hn0y">string</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">string</span><span class="__shiki_140thh">&gt;CREDENTIALS&lt;/</span><span class="__shiki_17hn0y">string</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">string</span><span class="__shiki_140thh">&gt;PLUGINS&lt;/</span><span class="__shiki_17hn0y">string</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;/</span><span class="__shiki_17hn0y">events</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  &lt;!-- 审计过滤器 --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">filters</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">com.michelin.cio.hudson.plugins.audittrail.Filter</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;</span><span class="__shiki_17hn0y">includeUsers</span><span class="__shiki_140thh">&gt;.*&lt;/</span><span class="__shiki_17hn0y">includeUsers</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;</span><span class="__shiki_17hn0y">excludeUsers</span><span class="__shiki_140thh">&gt;system,anonymous&lt;/</span><span class="__shiki_17hn0y">excludeUsers</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;</span><span class="__shiki_17hn0y">includeEvents</span><span class="__shiki_140thh">&gt;.*&lt;/</span><span class="__shiki_17hn0y">includeEvents</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;</span><span class="__shiki_17hn0y">excludeEvents</span><span class="__shiki_140thh">&gt;LOGIN_FAILURE&lt;/</span><span class="__shiki_17hn0y">excludeEvents</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_17hn0y">com.michelin.cio.hudson.plugins.audittrail.Filter</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;/</span><span class="__shiki_17hn0y">filters</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_17hn0y">com.michelin.cio.hudson.plugins.audittrail.AuditTrailPlugin</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h3 id="_7-2-实时监控" tabindex="-1">7.2 实时监控 <a class="header-anchor" href="#_7-2-实时监控" aria-label="Permalink to &quot;7.2 实时监控&quot;">​</a></h3><p><strong>安全监控仪表板</strong>：</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 安全监控脚本</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> hudson.model.*</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> jenkins.model.*</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> java.util.concurrent.*</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_dzsirb"> SECURITY_METRICS</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">    failed_logins</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    unauthorized_access</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    suspicious_scripts</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    credential_usage</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    plugin_violations</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_dzsirb"> MONITORING_INTERVAL</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> TimeUnit.</span><span class="__shiki_dzsirb">MINUTES</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">toMillis(</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 监控任务</span></span>
<span class="line"><span class="__shiki_1itgoe">Thread.</span><span class="__shiki_140thh">start {</span></span>
<span class="line"><span class="__shiki_1itgoe">    while</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 1. 检查认证失败</span></span>
<span class="line"><span class="__shiki_140thh">            checkFailedLogins()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 2. 检查未授权访问</span></span>
<span class="line"><span class="__shiki_140thh">            checkUnauthorizedAccess()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 3. 检查可疑脚本</span></span>
<span class="line"><span class="__shiki_140thh">            checkSuspiciousScripts()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 4. 检查凭据使用</span></span>
<span class="line"><span class="__shiki_140thh">            checkCredentialUsage()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 5. 生成安全报告</span></span>
<span class="line"><span class="__shiki_140thh">            generateSecurityReport()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 6. 发送警报</span></span>
<span class="line"><span class="__shiki_140thh">            sendAlertsIfNeeded()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            Thread.</span><span class="__shiki_140thh">sleep(</span><span class="__shiki_dzsirb">MONITORING_INTERVAL</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">Exception</span><span class="__shiki_140thh"> e) {</span></span>
<span class="line"><span class="__shiki_dzsirb">            println</span><span class="__shiki_mdbnqw"> &quot;监控错误: \${e.message}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 检查失败登录</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> checkFailedLogins</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> logFile </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1itgoe"> File</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;\${JENKINS_HOME}/logs/login.log&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (logFile</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">exists()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        def</span><span class="__shiki_140thh"> lines </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> logFile</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">readLines()</span></span>
<span class="line"><span class="__shiki_1itgoe">        def</span><span class="__shiki_140thh"> recentFailures </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> lines</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">findAll { </span></span>
<span class="line"><span class="__shiki_140thh">            it</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">contains(</span><span class="__shiki_mdbnqw">&quot;FAILED&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            it</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">contains(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1itgoe"> Date</span><span class="__shiki_140thh">()</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">format(</span><span class="__shiki_mdbnqw">&quot;yyyy-MM-dd&quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">        }</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">size()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        SECURITY_METRICS</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">failed_logins </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> recentFailures</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (recentFailures </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            sendAlert(</span><span class="__shiki_mdbnqw">&quot;多次登录失败&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;检测到\${recentFailures}次失败登录尝试&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 检查可疑活动</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> checkSuspiciousScripts</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> scriptApproval </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> ScriptApproval.</span><span class="__shiki_140thh">get()</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> pendingScripts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> scriptApproval</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">getPendingScripts()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    pendingScripts</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">each { </span><span class="__shiki_1jdh33">script</span><span class="__shiki_1itgoe"> -&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (isDangerousScript(script)) {</span></span>
<span class="line"><span class="__shiki_dzsirb">            SECURITY_METRICS</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">suspicious_scripts</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_140thh">            sendAlert(</span><span class="__shiki_mdbnqw">&quot;可疑脚本&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;发现可疑脚本: \${script}&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 自动拒绝高危脚本</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (isHighRiskScript(script)) {</span></span>
<span class="line"><span class="__shiki_140thh">                scriptApproval</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">denyScript(script</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">signature)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-3-合规性报告" tabindex="-1">7.3 合规性报告 <a class="header-anchor" href="#_7-3-合规性报告" aria-label="Permalink to &quot;7.3 合规性报告&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 合规性检查脚本</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> generateComplianceReport</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> report </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">        timestamp</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1itgoe"> Date</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_dzsirb">        jenkinsVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">Jenkins.</span><span class="__shiki_dzsirb">VERSION</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        checks</span><span class="__shiki_140thh">: []</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // CIS Jenkins Benchmark检查</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> cisChecks </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 认证与授权</span></span>
<span class="line"><span class="__shiki_140thh">        [</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;CIS-1.1&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;启用安全领域&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">check</span><span class="__shiki_140thh">: { checkSecurityRealm() }],</span></span>
<span class="line"><span class="__shiki_140thh">        [</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;CIS-1.2&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;启用授权&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">check</span><span class="__shiki_140thh">: { checkAuthorization() }],</span></span>
<span class="line"><span class="__shiki_140thh">        [</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;CIS-1.3&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;禁用Remember Me&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">check</span><span class="__shiki_140thh">: { checkRememberMe() }],</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 网络配置</span></span>
<span class="line"><span class="__shiki_140thh">        [</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;CIS-2.1&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;使用HTTPS&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">check</span><span class="__shiki_140thh">: { checkHTTPS() }],</span></span>
<span class="line"><span class="__shiki_140thh">        [</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;CIS-2.2&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;禁用旧协议&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">check</span><span class="__shiki_140thh">: { checkProtocols() }],</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 系统配置</span></span>
<span class="line"><span class="__shiki_140thh">        [</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;CIS-3.1&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;启用代理到主控安全&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">check</span><span class="__shiki_140thh">: { checkAgentToMaster() }],</span></span>
<span class="line"><span class="__shiki_140thh">        [</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;CIS-3.2&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;禁用CLI远程访问&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">check</span><span class="__shiki_140thh">: { checkCLI() }],</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 凭据管理</span></span>
<span class="line"><span class="__shiki_140thh">        [</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;CIS-4.1&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;凭据加密&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">check</span><span class="__shiki_140thh">: { checkCredentialEncryption() }],</span></span>
<span class="line"><span class="__shiki_140thh">        [</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;CIS-4.2&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;定期轮换凭据&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">check</span><span class="__shiki_140thh">: { checkCredentialRotation() }],</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 监控与审计</span></span>
<span class="line"><span class="__shiki_140thh">        [</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;CIS-5.1&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;启用审计日志&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">check</span><span class="__shiki_140thh">: { checkAuditLog() }],</span></span>
<span class="line"><span class="__shiki_140thh">        [</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;CIS-5.2&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;日志保留策略&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">check</span><span class="__shiki_140thh">: { checkLogRetention() }]</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    cisChecks</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">each { </span><span class="__shiki_1jdh33">check</span><span class="__shiki_1itgoe"> -&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            def</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> check</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">check()</span></span>
<span class="line"><span class="__shiki_140thh">            report</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">checks </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">                id</span><span class="__shiki_140thh">: check</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">id,</span></span>
<span class="line"><span class="__shiki_dzsirb">                description</span><span class="__shiki_140thh">: check</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">description,</span></span>
<span class="line"><span class="__shiki_dzsirb">                status</span><span class="__shiki_140thh">: result</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">passed </span><span class="__shiki_1itgoe">?</span><span class="__shiki_mdbnqw"> &#39;PASS&#39;</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_mdbnqw"> &#39;FAIL&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                details</span><span class="__shiki_140thh">: result</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">details,</span></span>
<span class="line"><span class="__shiki_dzsirb">                remediation</span><span class="__shiki_140thh">: result</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">remediation</span></span>
<span class="line"><span class="__shiki_140thh">            ]</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">Exception</span><span class="__shiki_140thh"> e) {</span></span>
<span class="line"><span class="__shiki_140thh">            report</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">checks </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">                id</span><span class="__shiki_140thh">: check</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">id,</span></span>
<span class="line"><span class="__shiki_dzsirb">                description</span><span class="__shiki_140thh">: check</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">description,</span></span>
<span class="line"><span class="__shiki_dzsirb">                status</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;ERROR&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                details</span><span class="__shiki_140thh">: e</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">message</span></span>
<span class="line"><span class="__shiki_140thh">            ]</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 生成报告</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> reportFile </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1itgoe"> File</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;\${JENKINS_HOME}/compliance/report-\${new Date().format(&#39;yyyyMMdd&#39;)}.json&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    reportFile</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">text </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> groovy.json.JsonOutput.</span><span class="__shiki_140thh">toJson(report)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 发送通知</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (report</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">checks</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">any { it</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;FAIL&#39;</span><span class="__shiki_140thh"> }) {</span></span>
<span class="line"><span class="__shiki_140thh">        sendComplianceAlert(report)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> report</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// CIS检查实现示例</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> checkSecurityRealm</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> instance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> Jenkins.</span><span class="__shiki_140thh">getInstance()</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> securityRealm </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> instance</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">getSecurityRealm()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">        passed</span><span class="__shiki_140thh">: securityRealm </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">securityRealm</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">getClass()</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">simpleName</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">contains(</span><span class="__shiki_mdbnqw">&#39;Legacy&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_dzsirb">        details</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;当前安全领域: \${securityRealm?.getClass()?.simpleName}&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        remediation</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;配置LDAP、SAML或数据库认证&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> result</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="八、备份与灾难恢复" tabindex="-1">八、备份与灾难恢复 <a class="header-anchor" href="#八、备份与灾难恢复" aria-label="Permalink to &quot;八、备份与灾难恢复&quot;">​</a></h2><h3 id="_8-1-安全备份策略" tabindex="-1">8.1 安全备份策略 <a class="header-anchor" href="#_8-1-安全备份策略" aria-label="Permalink to &quot;8.1 安全备份策略&quot;">​</a></h3><p><strong>加密备份脚本</strong>：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># jenkins-backup.sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">set</span><span class="__shiki_dzsirb"> -euo</span><span class="__shiki_mdbnqw"> pipefail</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 配置</span></span>
<span class="line"><span class="__shiki_140thh">BACKUP_DIR</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/backup/jenkins&quot;</span></span>
<span class="line"><span class="__shiki_140thh">ENCRYPTION_KEY</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/etc/jenkins/backup.key&quot;</span></span>
<span class="line"><span class="__shiki_140thh">RETENTION_DAYS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">30</span></span>
<span class="line"><span class="__shiki_140thh">S3_BUCKET</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;s3://company-jenkins-backup&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建备份目录</span></span>
<span class="line"><span class="__shiki_1t8gfj">mkdir</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_140thh"> \${BACKUP_DIR}</span><span class="__shiki_mdbnqw">/{full,incremental}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 生成备份文件名</span></span>
<span class="line"><span class="__shiki_140thh">TIMESTAMP</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%Y%m%d_%H%M%S</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">BACKUP_FILE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;\${</span><span class="__shiki_140thh">BACKUP_DIR</span><span class="__shiki_mdbnqw">}/full/jenkins_full_\${</span><span class="__shiki_140thh">TIMESTAMP</span><span class="__shiki_mdbnqw">}.tar.gz&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 停止Jenkins（可选，建议在维护窗口）</span></span>
<span class="line"><span class="__shiki_21nrsd"># sudo systemctl stop jenkins</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 创建完整备份</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;创建完整备份...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">tar</span><span class="__shiki_dzsirb"> -czf</span><span class="__shiki_mdbnqw"> -</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --exclude=</span><span class="__shiki_mdbnqw">&quot;workspace/*&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --exclude=</span><span class="__shiki_mdbnqw">&quot;*.tmp&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --exclude=</span><span class="__shiki_mdbnqw">&quot;*.log&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --exclude=</span><span class="__shiki_mdbnqw">&quot;cache/*&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    -C</span><span class="__shiki_mdbnqw"> /var/lib</span><span class="__shiki_mdbnqw"> jenkins</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_1t8gfj"> openssl</span><span class="__shiki_mdbnqw"> enc</span><span class="__shiki_dzsirb"> -aes-256-cbc</span><span class="__shiki_dzsirb"> -salt</span><span class="__shiki_dzsirb"> -pass</span><span class="__shiki_mdbnqw"> file:</span><span class="__shiki_140thh">\${ENCRYPTION_KEY} </span><span class="__shiki_dzsirb">-out</span><span class="__shiki_140thh"> \${BACKUP_FILE}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 计算校验和</span></span>
<span class="line"><span class="__shiki_1t8gfj">sha256sum</span><span class="__shiki_140thh"> \${BACKUP_FILE} </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> \${BACKUP_FILE}</span><span class="__shiki_mdbnqw">.sha256</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 加密校验和文件</span></span>
<span class="line"><span class="__shiki_1t8gfj">openssl</span><span class="__shiki_mdbnqw"> enc</span><span class="__shiki_dzsirb"> -aes-256-cbc</span><span class="__shiki_dzsirb"> -salt</span><span class="__shiki_dzsirb"> -pass</span><span class="__shiki_mdbnqw"> file:</span><span class="__shiki_140thh">\${ENCRYPTION_KEY} </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_dzsirb">    -in</span><span class="__shiki_140thh"> \${BACKUP_FILE}</span><span class="__shiki_mdbnqw">.sha256</span><span class="__shiki_dzsirb"> -out</span><span class="__shiki_140thh"> \${BACKUP_FILE}</span><span class="__shiki_mdbnqw">.sha256.enc</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 上传到云存储</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;上传到S3...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">aws</span><span class="__shiki_mdbnqw"> s3</span><span class="__shiki_mdbnqw"> cp</span><span class="__shiki_140thh"> \${BACKUP_FILE} \${S3_BUCKET}</span><span class="__shiki_mdbnqw">/full/</span></span>
<span class="line"><span class="__shiki_1t8gfj">aws</span><span class="__shiki_mdbnqw"> s3</span><span class="__shiki_mdbnqw"> cp</span><span class="__shiki_140thh"> \${BACKUP_FILE}</span><span class="__shiki_mdbnqw">.sha256.enc</span><span class="__shiki_140thh"> \${S3_BUCKET}</span><span class="__shiki_mdbnqw">/full/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 6. 清理旧备份</span></span>
<span class="line"><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh"> \${BACKUP_DIR}</span><span class="__shiki_mdbnqw">/full</span><span class="__shiki_dzsirb"> -name</span><span class="__shiki_mdbnqw"> &quot;*.tar.gz&quot;</span><span class="__shiki_dzsirb"> -mtime</span><span class="__shiki_mdbnqw"> +</span><span class="__shiki_140thh">\${RETENTION_DAYS} </span><span class="__shiki_dzsirb">-delete</span></span>
<span class="line"><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh"> \${BACKUP_DIR}</span><span class="__shiki_mdbnqw">/incremental</span><span class="__shiki_dzsirb"> -name</span><span class="__shiki_mdbnqw"> &quot;*.tar.gz&quot;</span><span class="__shiki_dzsirb"> -mtime</span><span class="__shiki_mdbnqw"> +7</span><span class="__shiki_dzsirb"> -delete</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 7. 启动Jenkins（如果停止了）</span></span>
<span class="line"><span class="__shiki_21nrsd"># sudo systemctl start jenkins</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;备份完成: \${</span><span class="__shiki_140thh">BACKUP_FILE</span><span class="__shiki_mdbnqw">}&quot;</span></span></code></pre></div><h3 id="_8-2-灾难恢复计划" tabindex="-1">8.2 灾难恢复计划 <a class="header-anchor" href="#_8-2-灾难恢复计划" aria-label="Permalink to &quot;8.2 灾难恢复计划&quot;">​</a></h3><p><strong>恢复流程脚本</strong>：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># jenkins-recovery.sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">set</span><span class="__shiki_dzsirb"> -euo</span><span class="__shiki_mdbnqw"> pipefail</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 配置</span></span>
<span class="line"><span class="__shiki_140thh">RECOVERY_DIR</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/recovery/jenkins&quot;</span></span>
<span class="line"><span class="__shiki_140thh">ENCRYPTION_KEY</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/etc/jenkins/backup.key&quot;</span></span>
<span class="line"><span class="__shiki_140thh">BACKUP_FILE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">$1</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">S3_BUCKET</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;s3://company-jenkins-backup&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 验证参数</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> [[ </span><span class="__shiki_1itgoe">-z</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$BACKUP_FILE</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh"> ]]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;使用方法: </span><span class="__shiki_dzsirb">$0</span><span class="__shiki_mdbnqw"> &lt;备份文件&gt;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;可用备份:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    aws</span><span class="__shiki_mdbnqw"> s3</span><span class="__shiki_mdbnqw"> ls</span><span class="__shiki_140thh"> \${S3_BUCKET}</span><span class="__shiki_mdbnqw">/full/</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> jenkins_full</span></span>
<span class="line"><span class="__shiki_dzsirb">    exit</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 停止Jenkins</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;停止Jenkins服务...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> systemctl</span><span class="__shiki_mdbnqw"> stop</span><span class="__shiki_mdbnqw"> jenkins</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 下载备份文件</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;下载备份文件...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">aws</span><span class="__shiki_mdbnqw"> s3</span><span class="__shiki_mdbnqw"> cp</span><span class="__shiki_140thh"> \${S3_BUCKET}</span><span class="__shiki_mdbnqw">/full/</span><span class="__shiki_140thh">\${BACKUP_FILE} \${RECOVERY_DIR}</span><span class="__shiki_mdbnqw">/</span></span>
<span class="line"><span class="__shiki_1t8gfj">aws</span><span class="__shiki_mdbnqw"> s3</span><span class="__shiki_mdbnqw"> cp</span><span class="__shiki_140thh"> \${S3_BUCKET}</span><span class="__shiki_mdbnqw">/full/</span><span class="__shiki_140thh">\${BACKUP_FILE}</span><span class="__shiki_mdbnqw">.sha256.enc</span><span class="__shiki_140thh"> \${RECOVERY_DIR}</span><span class="__shiki_mdbnqw">/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 解密校验和文件</span></span>
<span class="line"><span class="__shiki_1t8gfj">openssl</span><span class="__shiki_mdbnqw"> enc</span><span class="__shiki_dzsirb"> -aes-256-cbc</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> -pass</span><span class="__shiki_mdbnqw"> file:</span><span class="__shiki_140thh">\${ENCRYPTION_KEY} </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_dzsirb">    -in</span><span class="__shiki_140thh"> \${RECOVERY_DIR}</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_140thh">\${BACKUP_FILE}</span><span class="__shiki_mdbnqw">.sha256.enc</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    -out</span><span class="__shiki_140thh"> \${RECOVERY_DIR}</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_140thh">\${BACKUP_FILE}</span><span class="__shiki_mdbnqw">.sha256</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 验证完整性</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;验证备份完整性...&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">cd</span><span class="__shiki_140thh"> \${RECOVERY_DIR}</span></span>
<span class="line"><span class="__shiki_140thh">EXPECTED_SUM</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">cat</span><span class="__shiki_140thh"> \${BACKUP_FILE}</span><span class="__shiki_mdbnqw">.sha256</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{print $1}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">ACTUAL_SUM</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">sha256sum</span><span class="__shiki_140thh"> \${BACKUP_FILE} </span><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{print $1}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> [[ </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$EXPECTED_SUM</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> !=</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$ACTUAL_SUM</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh"> ]]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;错误：备份文件校验和不匹配！&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    exit</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 解密备份文件</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;解密备份文件...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">openssl</span><span class="__shiki_mdbnqw"> enc</span><span class="__shiki_dzsirb"> -aes-256-cbc</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> -pass</span><span class="__shiki_mdbnqw"> file:</span><span class="__shiki_140thh">\${ENCRYPTION_KEY} </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_dzsirb">    -in</span><span class="__shiki_140thh"> \${BACKUP_FILE} </span><span class="__shiki_dzsirb">-out</span><span class="__shiki_140thh"> \${BACKUP_FILE}</span><span class="__shiki_mdbnqw">.decrypted</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 6. 恢复数据</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;恢复数据...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> mv</span><span class="__shiki_mdbnqw"> /var/lib/jenkins</span><span class="__shiki_mdbnqw"> /var/lib/jenkins.old.</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%s</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> tar</span><span class="__shiki_dzsirb"> -xzf</span><span class="__shiki_140thh"> \${BACKUP_FILE}</span><span class="__shiki_mdbnqw">.decrypted</span><span class="__shiki_dzsirb"> -C</span><span class="__shiki_mdbnqw"> /var/lib/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 7. 修复权限</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;修复权限...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> chown</span><span class="__shiki_dzsirb"> -R</span><span class="__shiki_mdbnqw"> jenkins:jenkins</span><span class="__shiki_mdbnqw"> /var/lib/jenkins</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> chmod</span><span class="__shiki_dzsirb"> -R</span><span class="__shiki_dzsirb"> 750</span><span class="__shiki_mdbnqw"> /var/lib/jenkins</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 8. 启动Jenkins</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;启动Jenkins服务...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> systemctl</span><span class="__shiki_mdbnqw"> start</span><span class="__shiki_mdbnqw"> jenkins</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 9. 验证恢复</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;验证恢复...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">sleep</span><span class="__shiki_dzsirb"> 30</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_1t8gfj"> curl</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_mdbnqw"> http://localhost:8080/login</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /dev/null</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;✅ Jenkins恢复成功&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">else</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;❌ Jenkins恢复失败&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    exit</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 10. 清理</span></span>
<span class="line"><span class="__shiki_1t8gfj">rm</span><span class="__shiki_dzsirb"> -rf</span><span class="__shiki_140thh"> \${RECOVERY_DIR}</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_dzsirb">*</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;恢复流程完成&quot;</span></span></code></pre></div><h2 id="九、安全事件响应" tabindex="-1">九、安全事件响应 <a class="header-anchor" href="#九、安全事件响应" aria-label="Permalink to &quot;九、安全事件响应&quot;">​</a></h2><h3 id="_9-1-事件响应流程" tabindex="-1">9.1 事件响应流程 <a class="header-anchor" href="#_9-1-事件响应流程" aria-label="Permalink to &quot;9.1 事件响应流程&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 安全事件响应脚本</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> handleSecurityIncident</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">Map</span><span class="__shiki_1jdh33"> incident</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> response </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">        status</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;investigating&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        actions</span><span class="__shiki_140thh">: [],</span></span>
<span class="line"><span class="__shiki_dzsirb">        timeline</span><span class="__shiki_140thh">: []</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 事件分类</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> severity </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> classifyIncidentSeverity(incident)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 初始响应</span></span>
<span class="line"><span class="__shiki_1itgoe">    switch</span><span class="__shiki_140thh">(severity) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_mdbnqw"> &#39;CRITICAL&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            response</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">actions </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_140thh"> isolateSystem()</span></span>
<span class="line"><span class="__shiki_140thh">            response</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">actions </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_140thh"> notifySecurityTeam()</span></span>
<span class="line"><span class="__shiki_140thh">            response</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">actions </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_140thh"> escalateToManagement()</span></span>
<span class="line"><span class="__shiki_1itgoe">            break</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_mdbnqw"> &#39;HIGH&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            response</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">actions </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_140thh"> disableAffectedAccounts()</span></span>
<span class="line"><span class="__shiki_140thh">            response</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">actions </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_140thh"> increaseMonitoring()</span></span>
<span class="line"><span class="__shiki_140thh">            response</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">actions </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_140thh"> notifySecurityTeam()</span></span>
<span class="line"><span class="__shiki_1itgoe">            break</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_mdbnqw"> &#39;MEDIUM&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            response</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">actions </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_140thh"> logIncident()</span></span>
<span class="line"><span class="__shiki_140thh">            response</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">actions </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_140thh"> scheduleInvestigation()</span></span>
<span class="line"><span class="__shiki_1itgoe">            break</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_mdbnqw"> &#39;LOW&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            response</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">actions </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_140thh"> logIncident()</span></span>
<span class="line"><span class="__shiki_1itgoe">            break</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 调查</span></span>
<span class="line"><span class="__shiki_140thh">    response</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">timeline </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">        time</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1itgoe"> Date</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_dzsirb">        action</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;开始调查&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        details</span><span class="__shiki_140thh">: collectEvidence(incident)</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 遏制</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (severity </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;CRITICAL&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;HIGH&#39;</span><span class="__shiki_140thh">]) {</span></span>
<span class="line"><span class="__shiki_140thh">        response</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">timeline </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">            time</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1itgoe"> Date</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_dzsirb">            action</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;遏制措施&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            details</span><span class="__shiki_140thh">: implementContainment(incident)</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 根因分析</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> rootCause </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> analyzeRootCause(incident)</span></span>
<span class="line"><span class="__shiki_140thh">    response</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">timeline </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">        time</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1itgoe"> Date</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_dzsirb">        action</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;根因分析&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        details</span><span class="__shiki_140thh">: rootCause</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 6. 恢复</span></span>
<span class="line"><span class="__shiki_140thh">    response</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">timeline </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">        time</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1itgoe"> Date</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_dzsirb">        action</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;恢复措施&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        details</span><span class="__shiki_140thh">: implementRecovery(rootCause)</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 7. 事后总结</span></span>
<span class="line"><span class="__shiki_140thh">    response</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">timeline </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">        time</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1itgoe"> Date</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_dzsirb">        action</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;经验总结&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        details</span><span class="__shiki_140thh">: generateLessonsLearned(incident)</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 8. 报告</span></span>
<span class="line"><span class="__shiki_140thh">    generateIncidentReport(response)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> response</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 事件分类函数</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> classifyIncidentSeverity</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">Map</span><span class="__shiki_1jdh33"> incident</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> score </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 影响评分</span></span>
<span class="line"><span class="__shiki_1itgoe">    switch</span><span class="__shiki_140thh">(incident</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">impact) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_mdbnqw"> &#39;system_compromise&#39;</span><span class="__shiki_140thh">: score </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_mdbnqw"> &#39;data_breach&#39;</span><span class="__shiki_140thh">: score </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 8</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_mdbnqw"> &#39;service_disruption&#39;</span><span class="__shiki_140thh">: score </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 6</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_mdbnqw"> &#39;policy_violation&#39;</span><span class="__shiki_140thh">: score </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 4</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 范围评分</span></span>
<span class="line"><span class="__shiki_1itgoe">    switch</span><span class="__shiki_140thh">(incident</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">scope) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_mdbnqw"> &#39;organization_wide&#39;</span><span class="__shiki_140thh">: score </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_mdbnqw"> &#39;department_wide&#39;</span><span class="__shiki_140thh">: score </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 7</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_mdbnqw"> &#39;team_wide&#39;</span><span class="__shiki_140thh">: score </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 4</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_mdbnqw"> &#39;individual&#39;</span><span class="__shiki_140thh">: score </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 确定严重等级</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (score </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 15</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_mdbnqw"> &#39;CRITICAL&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (score </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_mdbnqw"> &#39;HIGH&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (score </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_mdbnqw"> &#39;MEDIUM&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_mdbnqw"> &#39;LOW&#39;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_9-2-取证与调查" tabindex="-1">9.2 取证与调查 <a class="header-anchor" href="#_9-2-取证与调查" aria-label="Permalink to &quot;9.2 取证与调查&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 取证数据收集</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> collectForensicData</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">Map</span><span class="__shiki_1jdh33"> incident</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> evidence </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">        timestamp</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1itgoe"> Date</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_dzsirb">        incident_id</span><span class="__shiki_140thh">: incident</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">id,</span></span>
<span class="line"><span class="__shiki_dzsirb">        collector</span><span class="__shiki_140thh">: env</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">JENKINS_URL</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 系统信息</span></span>
<span class="line"><span class="__shiki_140thh">    evidence</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">system </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">        jenkins_version</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">Jenkins.</span><span class="__shiki_dzsirb">VERSION</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        os</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">System.</span><span class="__shiki_140thh">getProperty(</span><span class="__shiki_mdbnqw">&#39;os.name&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_dzsirb">        hostname</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">InetAddress.</span><span class="__shiki_140thh">localHost</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">hostName,</span></span>
<span class="line"><span class="__shiki_dzsirb">        uptime</span><span class="__shiki_140thh">: getSystemUptime()</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 用户活动</span></span>
<span class="line"><span class="__shiki_140thh">    evidence</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">user_activity </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">        current_users</span><span class="__shiki_140thh">: getActiveUsers(),</span></span>
<span class="line"><span class="__shiki_dzsirb">        recent_logins</span><span class="__shiki_140thh">: getRecentLogins(</span><span class="__shiki_dzsirb">24</span><span class="__shiki_140thh">), </span><span class="__shiki_21nrsd">// 最近24小时</span></span>
<span class="line"><span class="__shiki_dzsirb">        failed_logins</span><span class="__shiki_140thh">: getFailedLoginAttempts(</span><span class="__shiki_dzsirb">24</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 作业活动</span></span>
<span class="line"><span class="__shiki_140thh">    evidence</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">job_activity </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">        running_jobs</span><span class="__shiki_140thh">: getRunningJobs(),</span></span>
<span class="line"><span class="__shiki_dzsirb">        recent_builds</span><span class="__shiki_140thh">: getRecentBuilds(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_dzsirb">        suspicious_builds</span><span class="__shiki_140thh">: findSuspiciousBuilds()</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 配置变更</span></span>
<span class="line"><span class="__shiki_140thh">    evidence</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">config_changes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">        recent_config_changes</span><span class="__shiki_140thh">: getRecentConfigChanges(</span><span class="__shiki_dzsirb">7</span><span class="__shiki_140thh">), </span><span class="__shiki_21nrsd">// 最近7天</span></span>
<span class="line"><span class="__shiki_dzsirb">        plugin_changes</span><span class="__shiki_140thh">: getPluginInstallations(</span><span class="__shiki_dzsirb">7</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_dzsirb">        user_changes</span><span class="__shiki_140thh">: getUserAccountChanges(</span><span class="__shiki_dzsirb">7</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 网络活动</span></span>
<span class="line"><span class="__shiki_140thh">    evidence</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">network_activity </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">        active_connections</span><span class="__shiki_140thh">: getNetworkConnections(),</span></span>
<span class="line"><span class="__shiki_dzsirb">        outgoing_connections</span><span class="__shiki_140thh">: getOutgoingConnections(),</span></span>
<span class="line"><span class="__shiki_dzsirb">        dns_queries</span><span class="__shiki_140thh">: getRecentDNSQueries()</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 6. 文件系统</span></span>
<span class="line"><span class="__shiki_140thh">    evidence</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">filesystem </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">        modified_files</span><span class="__shiki_140thh">: findRecentlyModifiedFiles(</span><span class="__shiki_mdbnqw">&#39;/var/lib/jenkins&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">24</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_dzsirb">        suspicious_files</span><span class="__shiki_140thh">: findSuspiciousFiles(),</span></span>
<span class="line"><span class="__shiki_dzsirb">        log_files</span><span class="__shiki_140thh">: collectLogFiles()</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 7. 内存分析</span></span>
<span class="line"><span class="__shiki_140thh">    evidence</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">memory </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">        processes</span><span class="__shiki_140thh">: getJavaProcesses(),</span></span>
<span class="line"><span class="__shiki_dzsirb">        memory_dump</span><span class="__shiki_140thh">: takeMemorySnapshot(),</span></span>
<span class="line"><span class="__shiki_dzsirb">        thread_dump</span><span class="__shiki_140thh">: takeThreadDump()</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 保存证据</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> evidenceFile </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;/evidence/\${incident.id}_\${new Date().format(&#39;yyyyMMdd_HHmmss&#39;)}.json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    writeJSON(</span><span class="__shiki_dzsirb">file</span><span class="__shiki_140thh">: evidenceFile, </span><span class="__shiki_dzsirb">json</span><span class="__shiki_140thh">: evidence)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 计算哈希值</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> hash </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> calculateHash(evidenceFile)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">file</span><span class="__shiki_140thh">: evidenceFile, </span><span class="__shiki_dzsirb">hash</span><span class="__shiki_140thh">: hash, </span><span class="__shiki_dzsirb">size</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1itgoe"> File</span><span class="__shiki_140thh">(evidenceFile)</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">size()]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="十、持续安全改进" tabindex="-1">十、持续安全改进 <a class="header-anchor" href="#十、持续安全改进" aria-label="Permalink to &quot;十、持续安全改进&quot;">​</a></h2><h3 id="_10-1-安全成熟度模型" tabindex="-1">10.1 安全成熟度模型 <a class="header-anchor" href="#_10-1-安全成熟度模型" aria-label="Permalink to &quot;10.1 安全成熟度模型&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 安全成熟度评估</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> assessSecurityMaturity</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> maturityLevels </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">        initial</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_dzsirb">            description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;临时性安全措施&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            score</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe">..</span><span class="__shiki_dzsirb">25</span></span>
<span class="line"><span class="__shiki_140thh">        ],</span></span>
<span class="line"><span class="__shiki_dzsirb">        managed</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_dzsirb">            description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;基本安全控制&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            score</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">26</span><span class="__shiki_1itgoe">..</span><span class="__shiki_dzsirb">50</span></span>
<span class="line"><span class="__shiki_140thh">        ],</span></span>
<span class="line"><span class="__shiki_dzsirb">        defined</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_dzsirb">            description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;标准化安全流程&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            score</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">51</span><span class="__shiki_1itgoe">..</span><span class="__shiki_dzsirb">75</span></span>
<span class="line"><span class="__shiki_140thh">        ],</span></span>
<span class="line"><span class="__shiki_dzsirb">        measured</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_dzsirb">            description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;量化安全管理&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            score</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">76</span><span class="__shiki_1itgoe">..</span><span class="__shiki_dzsirb">90</span></span>
<span class="line"><span class="__shiki_140thh">        ],</span></span>
<span class="line"><span class="__shiki_dzsirb">        optimized</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_dzsirb">            description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;持续改进&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            score</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">91</span><span class="__shiki_1itgoe">..</span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> assessment </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">        categories</span><span class="__shiki_140thh">: [:],</span></span>
<span class="line"><span class="__shiki_dzsirb">        recommendations</span><span class="__shiki_140thh">: []</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 评估各安全领域</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> categories </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;认证与授权&#39;</span><span class="__shiki_140thh">: assessAuthentication(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;数据保护&#39;</span><span class="__shiki_140thh">: assessDataProtection(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;流水线安全&#39;</span><span class="__shiki_140thh">: assessPipelineSecurity(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;监控与审计&#39;</span><span class="__shiki_140thh">: assessMonitoring(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;事件响应&#39;</span><span class="__shiki_140thh">: assessIncidentResponse(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;合规性&#39;</span><span class="__shiki_140thh">: assessCompliance()</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    categories</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">each { </span><span class="__shiki_1jdh33">category</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">score</span><span class="__shiki_1itgoe"> -&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        assessment</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">categories[category] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">            score</span><span class="__shiki_140thh">: score,</span></span>
<span class="line"><span class="__shiki_dzsirb">            level</span><span class="__shiki_140thh">: determineMaturityLevel(score, maturityLevels),</span></span>
<span class="line"><span class="__shiki_dzsirb">            details</span><span class="__shiki_140thh">: getAssessmentDetails(category)</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 生成改进建议</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (score </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 70</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            assessment</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">recommendations</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">addAll(</span></span>
<span class="line"><span class="__shiki_140thh">                generateRecommendations(category, score)</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 计算总体成熟度</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> overallScore </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> assessment</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">categories</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">values()</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">score</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">sum() </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                      assessment</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">categories</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">size()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    assessment</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">overall </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">        score</span><span class="__shiki_140thh">: overallScore,</span></span>
<span class="line"><span class="__shiki_dzsirb">        level</span><span class="__shiki_140thh">: determineMaturityLevel(overallScore, maturityLevels),</span></span>
<span class="line"><span class="__shiki_dzsirb">        description</span><span class="__shiki_140thh">: maturityLevels</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">find { </span><span class="__shiki_1jdh33">k</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">v</span><span class="__shiki_1itgoe"> -&gt;</span><span class="__shiki_140thh"> overallScore </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> v</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">score }</span><span class="__shiki_1itgoe">?.</span><span class="__shiki_140thh">description</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> assessment</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 改进路线图</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> createSecurityRoadmap</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">assessment</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> roadmap </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">        timeline</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_dzsirb">            immediate</span><span class="__shiki_140thh">: [],    </span><span class="__shiki_21nrsd">// 30天内</span></span>
<span class="line"><span class="__shiki_dzsirb">            short_term</span><span class="__shiki_140thh">: [],   </span><span class="__shiki_21nrsd">// 90天内</span></span>
<span class="line"><span class="__shiki_dzsirb">            medium_term</span><span class="__shiki_140thh">: [],  </span><span class="__shiki_21nrsd">// 180天内</span></span>
<span class="line"><span class="__shiki_dzsirb">            long_term</span><span class="__shiki_140thh">: []     </span><span class="__shiki_21nrsd">// 1年内</span></span>
<span class="line"><span class="__shiki_140thh">        ],</span></span>
<span class="line"><span class="__shiki_dzsirb">        resources</span><span class="__shiki_140thh">: [:],</span></span>
<span class="line"><span class="__shiki_dzsirb">        metrics</span><span class="__shiki_140thh">: [:]</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 优先级排序</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> priorities </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> assessment</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">recommendations</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">collect { </span><span class="__shiki_1jdh33">rec</span><span class="__shiki_1itgoe"> -&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        [</span></span>
<span class="line"><span class="__shiki_dzsirb">            recommendation</span><span class="__shiki_140thh">: rec,</span></span>
<span class="line"><span class="__shiki_dzsirb">            priority</span><span class="__shiki_140thh">: calculatePriority(rec),</span></span>
<span class="line"><span class="__shiki_dzsirb">            effort</span><span class="__shiki_140thh">: estimateEffort(rec),</span></span>
<span class="line"><span class="__shiki_dzsirb">            impact</span><span class="__shiki_140thh">: estimateImpact(rec)</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">    }</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">sort { </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">it</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">priority }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 分配到时间线</span></span>
<span class="line"><span class="__shiki_140thh">    priorities</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">each { </span><span class="__shiki_1jdh33">item</span><span class="__shiki_1itgoe"> -&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (item</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">priority </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 9</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            roadmap</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">timeline</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">immediate </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_140thh"> item</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (item</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">priority </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 7</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            roadmap</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">timeline</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">short_term </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_140thh"> item</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (item</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">priority </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            roadmap</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">timeline</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">medium_term </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_140thh"> item</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            roadmap</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">timeline</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">long_term </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_140thh"> item</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 定义成功指标</span></span>
<span class="line"><span class="__shiki_140thh">    roadmap</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">metrics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">        kpi</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;mean_time_to_detect&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;MTTD &lt; 1小时&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;mean_time_to_respond&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;MTTR &lt; 4小时&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;vulnerability_remediation&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;高危漏洞修复时间 &lt; 7天&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;compliance_score&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;合规评分 &gt; 90%&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        ],</span></span>
<span class="line"><span class="__shiki_dzsirb">        okr</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;improve_authentication&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;实施多因素认证，覆盖率达到100%&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;enhance_monitoring&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;实现实时安全监控，检测率提升50%&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;reduce_risk&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;将高危安全风险减少80%&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> roadmap</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="总结-jenkins安全加固检查清单" tabindex="-1">总结：Jenkins安全加固检查清单 <a class="header-anchor" href="#总结-jenkins安全加固检查清单" aria-label="Permalink to &quot;总结：Jenkins安全加固检查清单&quot;">​</a></h2><h3 id="基础安全" tabindex="-1">基础安全 <a class="header-anchor" href="#基础安全" aria-label="Permalink to &quot;基础安全&quot;">​</a></h3><ul><li>[ ] 使用最新LTS版本</li><li>[ ] 运行在非root用户下</li><li>[ ] 配置HTTPS访问</li><li>[ ] 启用防火墙规则</li><li>[ ] 定期系统更新</li></ul><h3 id="认证与授权" tabindex="-1">认证与授权 <a class="header-anchor" href="#认证与授权" aria-label="Permalink to &quot;认证与授权&quot;">​</a></h3><ul><li>[ ] 启用安全领域（LDAP/SAML）</li><li>[ ] 配置RBAC或矩阵授权</li><li>[ ] 实施最小权限原则</li><li>[ ] 启用MFA（如支持）</li><li>[ ] 定期审查用户权限</li></ul><h3 id="凭据管理" tabindex="-1">凭据管理 <a class="header-anchor" href="#凭据管理" aria-label="Permalink to &quot;凭据管理&quot;">​</a></h3><ul><li>[ ] 使用凭据插件管理敏感信息</li><li>[ ] 集成外部秘钥管理（Vault/AWS Secrets Manager）</li><li>[ ] 定期轮换凭据</li><li>[ ] 审计凭据使用</li><li>[ ] 避免硬编码凭据</li></ul><h3 id="流水线安全" tabindex="-1">流水线安全 <a class="header-anchor" href="#流水线安全" aria-label="Permalink to &quot;流水线安全&quot;">​</a></h3><ul><li>[ ] 启用脚本安全沙箱</li><li>[ ] 审批危险脚本操作</li><li>[ ] 实施输入验证和消毒</li><li>[ ] 使用共享库封装安全逻辑</li><li>[ ] 定期安全代码审查</li></ul><h3 id="插件管理" tabindex="-1">插件管理 <a class="header-anchor" href="#插件管理" aria-label="Permalink to &quot;插件管理&quot;">​</a></h3><ul><li>[ ] 仅安装必要插件</li><li>[ ] 定期更新插件</li><li>[ ] 监控插件漏洞</li><li>[ ] 移除未使用插件</li><li>[ ] 验证插件签名</li></ul><h3 id="监控与审计" tabindex="-1">监控与审计 <a class="header-anchor" href="#监控与审计" aria-label="Permalink to &quot;监控与审计&quot;">​</a></h3><ul><li>[ ] 启用审计日志</li><li>[ ] 集中日志管理</li><li>[ ] 实时安全监控</li><li>[ ] 定期安全扫描</li><li>[ ] 实施异常检测</li></ul><h3 id="备份与恢复" tabindex="-1">备份与恢复 <a class="header-anchor" href="#备份与恢复" aria-label="Permalink to &quot;备份与恢复&quot;">​</a></h3><ul><li>[ ] 定期完整备份</li><li>[ ] 测试恢复流程</li><li>[ ] 加密备份数据</li><li>[ ] 离线备份存储</li><li>[ ] 文档化恢复流程</li></ul><h3 id="合规与治理" tabindex="-1">合规与治理 <a class="header-anchor" href="#合规与治理" aria-label="Permalink to &quot;合规与治理&quot;">​</a></h3><ul><li>[ ] 符合行业标准（CIS、NIST）</li><li>[ ] 定期合规检查</li><li>[ ] 安全策略文档化</li><li>[ ] 员工安全培训</li><li>[ ] 第三方风险评估</li></ul><h3 id="持续改进" tabindex="-1">持续改进 <a class="header-anchor" href="#持续改进" aria-label="Permalink to &quot;持续改进&quot;">​</a></h3><ul><li>[ ] 定期安全评估</li><li>[ ] 漏洞管理流程</li><li>[ ] 安全事件响应演练</li><li>[ ] 安全度量与报告</li><li>[ ] 持续安全教育</li></ul><p><strong>记住</strong>：安全是一个持续的过程，而非一次性的配置。定期审查和更新安全措施，保持对新兴威胁的警惕，并建立安全文化是保护Jenkins环境的关键。</p>`,108)])])}const r=a(p,[["render",h]]);export{d as __pageData,r as default};
