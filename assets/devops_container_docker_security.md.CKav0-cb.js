import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"Docker 安全实践指南 - 完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"devops/container/docker/security.md","filePath":"devops/container/docker/security.md"}'),_={name:"devops/container/docker/security.md"};function l(c,s,h,e,t,k){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="docker-安全实践指南-完整学习笔记" tabindex="-1"><strong>Docker 安全实践指南 - 完整学习笔记</strong> <a class="header-anchor" href="#docker-安全实践指南-完整学习笔记" aria-label="Permalink to &quot;**Docker 安全实践指南 - 完整学习笔记**&quot;">​</a></h1><h2 id="一、docker-安全概述与风险模型" tabindex="-1"><strong>一、Docker 安全概述与风险模型</strong> <a class="header-anchor" href="#一、docker-安全概述与风险模型" aria-label="Permalink to &quot;**一、Docker 安全概述与风险模型**&quot;">​</a></h2><h3 id="_1-1-容器安全挑战" tabindex="-1"><strong>1.1 容器安全挑战</strong> <a class="header-anchor" href="#_1-1-容器安全挑战" aria-label="Permalink to &quot;**1.1 容器安全挑战**&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">攻击面扩大：</span></span>
<span class="line"><span class="__shiki_wvjl67">主机层 ← 容器逃逸、资源滥用</span></span>
<span class="line"><span class="__shiki_wvjl67">镜像层 ← 恶意软件、漏洞、敏感信息</span></span>
<span class="line"><span class="__shiki_wvjl67">容器层 ← 配置不当、横向移动</span></span>
<span class="line"><span class="__shiki_wvjl67">网络层 ← 网络攻击、数据泄露</span></span>
<span class="line"><span class="__shiki_wvjl67">编排层 ← 供应链攻击、API滥用</span></span></code></pre></div><h3 id="_1-2-容器与虚拟机安全对比" tabindex="-1"><strong>1.2 容器与虚拟机安全对比</strong> <a class="header-anchor" href="#_1-2-容器与虚拟机安全对比" aria-label="Permalink to &quot;**1.2 容器与虚拟机安全对比**&quot;">​</a></h3><table tabindex="0"><thead><tr><th>安全维度</th><th>虚拟机</th><th>Docker 容器</th></tr></thead><tbody><tr><td><strong>隔离性</strong></td><td>强（完整OS隔离）</td><td>较弱（内核共享）</td></tr><tr><td><strong>攻击面</strong></td><td>大（完整OS）</td><td>小（仅应用+依赖）</td></tr><tr><td><strong>逃逸风险</strong></td><td>低</td><td>中高（命名空间逃逸）</td></tr><tr><td><strong>启动速度</strong></td><td>慢（分钟级）</td><td>快（秒级）</td></tr><tr><td><strong>资源开销</strong></td><td>高</td><td>低</td></tr></tbody></table><h2 id="二、主机安全加固" tabindex="-1"><strong>二、主机安全加固</strong> <a class="header-anchor" href="#二、主机安全加固" aria-label="Permalink to &quot;**二、主机安全加固**&quot;">​</a></h2><h3 id="_2-1-操作系统级加固" tabindex="-1"><strong>2.1 操作系统级加固</strong> <a class="header-anchor" href="#_2-1-操作系统级加固" aria-label="Permalink to &quot;**2.1 操作系统级加固**&quot;">​</a></h3><h4 id="_2-1-1-最小化安装原则" tabindex="-1"><strong>2.1.1 最小化安装原则</strong> <a class="header-anchor" href="#_2-1-1-最小化安装原则" aria-label="Permalink to &quot;**2.1.1 最小化安装原则**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 移除不必要的软件包</span></span>
<span class="line"><span class="__shiki_1t8gfj">apt-get</span><span class="__shiki_mdbnqw"> remove</span><span class="__shiki_dzsirb"> --purge</span><span class="__shiki_mdbnqw"> telnet</span><span class="__shiki_mdbnqw"> rsh-client</span><span class="__shiki_mdbnqw"> rsh-redone-client</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  xinetd</span><span class="__shiki_mdbnqw"> nis</span><span class="__shiki_mdbnqw"> yp-tools</span><span class="__shiki_mdbnqw"> tftp</span><span class="__shiki_mdbnqw"> at</span><span class="__shiki_mdbnqw"> ftp</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 仅安装必需软件包</span></span>
<span class="line"><span class="__shiki_1t8gfj">apt-get</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_dzsirb"> -y</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  apt-transport-https</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  ca-certificates</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  curl</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  gnupg</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  lsb-release</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  software-properties-common</span></span></code></pre></div><h4 id="_2-1-2-内核参数调优" tabindex="-1"><strong>2.1.2 内核参数调优</strong> <a class="header-anchor" href="#_2-1-2-内核参数调优" aria-label="Permalink to &quot;**2.1.2 内核参数调优**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># /etc/sysctl.d/docker-security.conf</span></span>
<span class="line"><span class="__shiki_21nrsd"># 禁止容器修改内核参数</span></span>
<span class="line"><span class="__shiki_1t8gfj">kernel.grsecurity.chroot_deny_chmod</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1t8gfj">kernel.grsecurity.chroot_deny_mknod</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 限制内核功能</span></span>
<span class="line"><span class="__shiki_1t8gfj">kernel.kptr_restrict</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 2</span></span>
<span class="line"><span class="__shiki_1t8gfj">kernel.dmesg_restrict</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1t8gfj">kernel.perf_event_paranoid</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 3</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 网络安全</span></span>
<span class="line"><span class="__shiki_1t8gfj">net.ipv4.ip_forward</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1t8gfj">net.ipv4.conf.all.accept_redirects</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1t8gfj">net.ipv4.conf.default.accept_redirects</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1t8gfj">net.ipv4.conf.all.secure_redirects</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 应用配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">sysctl</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> /etc/sysctl.d/docker-security.conf</span></span></code></pre></div><h3 id="_2-2-docker-daemon-安全配置" tabindex="-1"><strong>2.2 Docker Daemon 安全配置</strong> <a class="header-anchor" href="#_2-2-docker-daemon-安全配置" aria-label="Permalink to &quot;**2.2 Docker Daemon 安全配置**&quot;">​</a></h3><h4 id="_2-2-1-非-root-用户运行-docker" tabindex="-1"><strong>2.2.1 非 root 用户运行 Docker</strong> <a class="header-anchor" href="#_2-2-1-非-root-用户运行-docker" aria-label="Permalink to &quot;**2.2.1 非 root 用户运行 Docker**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 创建docker用户组（默认已存在）</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> groupadd</span><span class="__shiki_mdbnqw"> docker</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 将用户加入docker组</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> usermod</span><span class="__shiki_dzsirb"> -aG</span><span class="__shiki_mdbnqw"> docker</span><span class="__shiki_140thh"> $USER</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 验证非root用户权限</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> --rm</span><span class="__shiki_mdbnqw"> hello-world</span></span></code></pre></div><h4 id="_2-2-2-daemon-配置文件安全" tabindex="-1"><strong>2.2.2 Daemon 配置文件安全</strong> <a class="header-anchor" href="#_2-2-2-daemon-配置文件安全" aria-label="Permalink to &quot;**2.2.2 Daemon 配置文件安全**&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// /etc/docker/daemon.json</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;authorization-plugins&quot;</span><span class="__shiki_140thh">: [],        </span><span class="__shiki_21nrsd">// 访问控制插件</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;bridge&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;none&quot;</span><span class="__shiki_140thh">,                   </span><span class="__shiki_21nrsd">// 禁用默认网桥</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;cgroup-parent&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;docker-cgroup&quot;</span><span class="__shiki_140thh">,   </span><span class="__shiki_21nrsd">// 自定义cgroup父级</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;data-root&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/secure/docker&quot;</span><span class="__shiki_140thh">,      </span><span class="__shiki_21nrsd">// 数据目录隔离</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;default-ulimits&quot;</span><span class="__shiki_140thh">: {               </span><span class="__shiki_21nrsd">// 默认资源限制</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;nofile&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;Name&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;nofile&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;Hard&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">64000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;Soft&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">64000</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;disable-legacy-registry&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,    </span><span class="__shiki_21nrsd">// 禁用旧版registry</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;icc&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,                       </span><span class="__shiki_21nrsd">// 禁止容器间通信</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;live-restore&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,               </span><span class="__shiki_21nrsd">// 守护进程重启时保持容器运行</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;log-driver&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;json-file&quot;</span><span class="__shiki_140thh">,          </span><span class="__shiki_21nrsd">// 日志驱动</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;log-opts&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;max-size&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10m&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;max-file&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;3&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;labels&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;production_status&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;env&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;os,customer&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;no-new-privileges&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,          </span><span class="__shiki_21nrsd">// 禁止新权限</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;registry-mirrors&quot;</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;https://mirror.example.com&quot;</span><span class="__shiki_140thh">],  </span><span class="__shiki_21nrsd">// 受控镜像源</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;seccomp-profile&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/etc/docker/seccomp/default.json&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// seccomp配置</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;selinux-enabled&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,            </span><span class="__shiki_21nrsd">// 启用SELinux</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;storage-driver&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;overlay2&quot;</span><span class="__shiki_140thh">,       </span><span class="__shiki_21nrsd">// 存储驱动</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;tls&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,                        </span><span class="__shiki_21nrsd">// TLS加密</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;tlsverify&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;tlscacert&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/etc/docker/ca.pem&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;tlscert&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/etc/docker/server-cert.pem&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;tlskey&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/etc/docker/server-key.pem&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;userland-proxy&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,            </span><span class="__shiki_21nrsd">// 禁用用户态代理</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;userns-remap&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;default&quot;</span><span class="__shiki_21nrsd">           // 用户命名空间重映射</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-2-3-docker-socket-保护" tabindex="-1"><strong>2.2.3 Docker Socket 保护</strong> <a class="header-anchor" href="#_2-2-3-docker-socket-保护" aria-label="Permalink to &quot;**2.2.3 Docker Socket 保护**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 检查socket权限</span></span>
<span class="line"><span class="__shiki_1t8gfj">ls</span><span class="__shiki_dzsirb"> -la</span><span class="__shiki_mdbnqw"> /var/run/docker.sock</span></span>
<span class="line"><span class="__shiki_21nrsd"># 应显示：srw-rw---- 1 root docker 0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 使用sudo访问（替代docker组）</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> docker</span><span class="__shiki_mdbnqw"> ps</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 或使用授权插件</span></span>
<span class="line"><span class="__shiki_21nrsd"># 安装docker authz插件</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> plugin</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> vieux/sshfs</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 使用Docker REST API替代socket</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> --cert</span><span class="__shiki_mdbnqw"> client-cert.pem</span><span class="__shiki_dzsirb"> --key</span><span class="__shiki_mdbnqw"> client-key.pem</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  https://docker-host:2376/containers/json</span></span></code></pre></div><h2 id="三、镜像安全最佳实践" tabindex="-1"><strong>三、镜像安全最佳实践</strong> <a class="header-anchor" href="#三、镜像安全最佳实践" aria-label="Permalink to &quot;**三、镜像安全最佳实践**&quot;">​</a></h2><h3 id="_3-1-安全镜像构建指南" tabindex="-1"><strong>3.1 安全镜像构建指南</strong> <a class="header-anchor" href="#_3-1-安全镜像构建指南" aria-label="Permalink to &quot;**3.1 安全镜像构建指南**&quot;">​</a></h3><h4 id="_3-1-1-基础镜像选择" tabindex="-1"><strong>3.1.1 基础镜像选择</strong> <a class="header-anchor" href="#_3-1-1-基础镜像选择" aria-label="Permalink to &quot;**3.1.1 基础镜像选择**&quot;">​</a></h4><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 错误示例 - 使用latest标签</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> ubuntu:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 正确示例 - 指定版本和最小化镜像</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> alpine:3.15</span></span>
<span class="line"><span class="__shiki_21nrsd"># 或</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> gcr.io/distroless/base-debian11</span></span></code></pre></div><h4 id="_3-1-2-多阶段构建" tabindex="-1"><strong>3.1.2 多阶段构建</strong> <a class="header-anchor" href="#_3-1-2-多阶段构建" aria-label="Permalink to &quot;**3.1.2 多阶段构建**&quot;">​</a></h4><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 第一阶段：构建环境</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> golang:1.18 </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> builder</span></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /app</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> . .</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> go build -o myapp .</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 第二阶段：运行环境</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> alpine:3.15</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> addgroup -S appgroup &amp;&amp; adduser -S appuser -G appgroup</span></span>
<span class="line"><span class="__shiki_1itgoe">USER</span><span class="__shiki_140thh"> appuser:appgroup</span></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /app</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=builder /app/myapp .</span></span>
<span class="line"><span class="__shiki_1itgoe">CMD</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;./myapp&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h4 id="_3-1-3-安全dockerfile编写" tabindex="-1"><strong>3.1.3 安全Dockerfile编写</strong> <a class="header-anchor" href="#_3-1-3-安全dockerfile编写" aria-label="Permalink to &quot;**3.1.3 安全Dockerfile编写**&quot;">​</a></h4><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 使用非root用户</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> groupadd -r appgroup &amp;&amp; useradd -r -g appgroup appuser</span></span>
<span class="line"><span class="__shiki_1itgoe">USER</span><span class="__shiki_140thh"> appuser</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 最小化层数，合并RUN命令</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> apt-get update &amp;&amp; apt-get install -y \\</span></span>
<span class="line"><span class="__shiki_140thh">    package1 \\</span></span>
<span class="line"><span class="__shiki_140thh">    package2 \\</span></span>
<span class="line"><span class="__shiki_140thh">    &amp;&amp; rm -rf /var/lib/apt/lists/*</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 不暴露敏感端口</span></span>
<span class="line"><span class="__shiki_21nrsd"># EXPOSE 80 443  # 仅暴露必要端口</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 使用健康检查</span></span>
<span class="line"><span class="__shiki_1itgoe">HEALTHCHECK</span><span class="__shiki_140thh"> --interval=30s --timeout=3s --start-period=5s --retries=3 \\</span></span>
<span class="line"><span class="__shiki_1itgoe">  CMD</span><span class="__shiki_140thh"> curl -f http://localhost/ || exit 1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 设置工作目录</span></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 6. 复制文件时设置正确权限</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --chown=appuser:appgroup app/ /app/</span></span></code></pre></div><h3 id="_3-2-镜像扫描与漏洞管理" tabindex="-1"><strong>3.2 镜像扫描与漏洞管理</strong> <a class="header-anchor" href="#_3-2-镜像扫描与漏洞管理" aria-label="Permalink to &quot;**3.2 镜像扫描与漏洞管理**&quot;">​</a></h3><h4 id="_3-2-1-集成扫描工具" tabindex="-1"><strong>3.2.1 集成扫描工具</strong> <a class="header-anchor" href="#_3-2-1-集成扫描工具" aria-label="Permalink to &quot;**3.2.1 集成扫描工具**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 使用Docker Scan（基于Snyk）</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> scan</span><span class="__shiki_dzsirb"> --file</span><span class="__shiki_mdbnqw"> Dockerfile</span><span class="__shiki_mdbnqw"> myimage:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 使用Trivy（开源）</span></span>
<span class="line"><span class="__shiki_1t8gfj">trivy</span><span class="__shiki_mdbnqw"> image</span><span class="__shiki_mdbnqw"> myimage:latest</span></span>
<span class="line"><span class="__shiki_1t8gfj">trivy</span><span class="__shiki_mdbnqw"> image</span><span class="__shiki_dzsirb"> --severity</span><span class="__shiki_mdbnqw"> HIGH,CRITICAL</span><span class="__shiki_mdbnqw"> myimage:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 使用Clair</span></span>
<span class="line"><span class="__shiki_1t8gfj">clair-scanner</span><span class="__shiki_dzsirb"> --ip</span><span class="__shiki_mdbnqw"> host.docker.internal</span><span class="__shiki_dzsirb"> --report</span><span class="__shiki_mdbnqw"> report.json</span><span class="__shiki_mdbnqw"> myimage:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 使用Anchore Engine</span></span>
<span class="line"><span class="__shiki_1t8gfj">anchore-cli</span><span class="__shiki_mdbnqw"> image</span><span class="__shiki_mdbnqw"> add</span><span class="__shiki_mdbnqw"> myimage:latest</span></span>
<span class="line"><span class="__shiki_1t8gfj">anchore-cli</span><span class="__shiki_mdbnqw"> image</span><span class="__shiki_mdbnqw"> wait</span><span class="__shiki_mdbnqw"> myimage:latest</span></span>
<span class="line"><span class="__shiki_1t8gfj">anchore-cli</span><span class="__shiki_mdbnqw"> image</span><span class="__shiki_mdbnqw"> vuln</span><span class="__shiki_mdbnqw"> myimage:latest</span><span class="__shiki_mdbnqw"> all</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. CI/CD集成示例（GitLab）</span></span>
<span class="line"><span class="__shiki_21nrsd"># .gitlab-ci.yml</span></span>
<span class="line"><span class="__shiki_1t8gfj">image_scan:</span></span>
<span class="line"><span class="__shiki_1t8gfj">  stage:</span><span class="__shiki_mdbnqw"> test</span></span>
<span class="line"><span class="__shiki_1t8gfj">  image:</span></span>
<span class="line"><span class="__shiki_1t8gfj">    name:</span><span class="__shiki_mdbnqw"> aquasec/trivy:latest</span></span>
<span class="line"><span class="__shiki_1t8gfj">    entrypoint:</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1t8gfj">  script:</span></span>
<span class="line"><span class="__shiki_1t8gfj">    -</span><span class="__shiki_mdbnqw"> trivy</span><span class="__shiki_dzsirb"> --no-progress</span><span class="__shiki_dzsirb"> --exit-code</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_dzsirb"> --severity</span><span class="__shiki_mdbnqw"> HIGH,CRITICAL</span><span class="__shiki_140thh"> \${CI_REGISTRY_IMAGE}</span><span class="__shiki_mdbnqw">:</span><span class="__shiki_140thh">\${CI_COMMIT_SHA}</span></span></code></pre></div><h4 id="_3-2-2-镜像签名与验证" tabindex="-1"><strong>3.2.2 镜像签名与验证</strong> <a class="header-anchor" href="#_3-2-2-镜像签名与验证" aria-label="Permalink to &quot;**3.2.2 镜像签名与验证**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 启用Docker内容信任（DCT）</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_140thh"> DOCKER_CONTENT_TRUST</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_140thh"> DOCKER_CONTENT_TRUST_SERVER</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">https://notary.example.com</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 推送签名镜像</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> push</span><span class="__shiki_mdbnqw"> myimage:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 拉取并验证签名</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> pull</span><span class="__shiki_mdbnqw"> myimage:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 查看签名信息</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> trust</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_dzsirb"> --pretty</span><span class="__shiki_mdbnqw"> myimage:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 使用Notary CLI</span></span>
<span class="line"><span class="__shiki_1t8gfj">notary</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_mdbnqw"> https://notary.example.com</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_mdbnqw"> ~/.docker/trust</span><span class="__shiki_mdbnqw"> list</span><span class="__shiki_mdbnqw"> example.com/myimage</span></span></code></pre></div><h3 id="_3-3-私有registry安全" tabindex="-1"><strong>3.3 私有Registry安全</strong> <a class="header-anchor" href="#_3-3-私有registry安全" aria-label="Permalink to &quot;**3.3 私有Registry安全**&quot;">​</a></h3><h4 id="_3-3-1-harbor安全配置" tabindex="-1"><strong>3.3.1 Harbor安全配置</strong> <a class="header-anchor" href="#_3-3-1-harbor安全配置" aria-label="Permalink to &quot;**3.3.1 Harbor安全配置**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># harbor.yml 安全配置片段</span></span>
<span class="line"><span class="__shiki_21nrsd"># 启用内容信任</span></span>
<span class="line"><span class="__shiki_17hn0y">notary</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 漏洞扫描</span></span>
<span class="line"><span class="__shiki_17hn0y">clair</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">  updaters_interval</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">12</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 镜像复制策略</span></span>
<span class="line"><span class="__shiki_17hn0y">replication</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">  filter</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">name</span></span>
<span class="line"><span class="__shiki_17hn0y">      value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;prod-*&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 保留策略</span></span>
<span class="line"><span class="__shiki_17hn0y">retention</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">  policies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">algorithm</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">or</span></span>
<span class="line"><span class="__shiki_17hn0y">      rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">tag</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            pattern</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;latest&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          always_retain</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span></code></pre></div><h4 id="_3-3-2-registry访问控制" tabindex="-1"><strong>3.3.2 Registry访问控制</strong> <a class="header-anchor" href="#_3-3-2-registry访问控制" aria-label="Permalink to &quot;**3.3.2 Registry访问控制**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 使用认证</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> login</span><span class="__shiki_mdbnqw"> myregistry.example.com</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 配置TLS证书</span></span>
<span class="line"><span class="__shiki_21nrsd"># 生成自签名证书</span></span>
<span class="line"><span class="__shiki_1t8gfj">openssl</span><span class="__shiki_mdbnqw"> req</span><span class="__shiki_dzsirb"> -newkey</span><span class="__shiki_mdbnqw"> rsa:4096</span><span class="__shiki_dzsirb"> -nodes</span><span class="__shiki_dzsirb"> -sha256</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -keyout</span><span class="__shiki_mdbnqw"> domain.key</span><span class="__shiki_dzsirb"> -x509</span><span class="__shiki_dzsirb"> -days</span><span class="__shiki_dzsirb"> 365</span><span class="__shiki_dzsirb"> -out</span><span class="__shiki_mdbnqw"> domain.crt</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -subj</span><span class="__shiki_mdbnqw"> &quot;/C=CN/ST=Beijing/L=Beijing/O=Example/OU=IT/CN=myregistry.example.com&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 配置Nginx代理认证</span></span>
<span class="line"><span class="__shiki_21nrsd"># nginx.conf</span></span>
<span class="line"><span class="__shiki_1t8gfj">location</span><span class="__shiki_mdbnqw"> /v2/</span><span class="__shiki_mdbnqw"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    auth_basic</span><span class="__shiki_mdbnqw"> &quot;Registry Realm&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    auth_basic_user_file</span><span class="__shiki_mdbnqw"> /etc/nginx/conf.d/registry.password</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    proxy_pass</span><span class="__shiki_mdbnqw"> http://registry:5000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    proxy_set_header</span><span class="__shiki_mdbnqw"> Host</span><span class="__shiki_140thh"> $http_host;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="四、容器运行时安全" tabindex="-1"><strong>四、容器运行时安全</strong> <a class="header-anchor" href="#四、容器运行时安全" aria-label="Permalink to &quot;**四、容器运行时安全**&quot;">​</a></h2><h3 id="_4-1-容器安全启动参数" tabindex="-1"><strong>4.1 容器安全启动参数</strong> <a class="header-anchor" href="#_4-1-容器安全启动参数" aria-label="Permalink to &quot;**4.1 容器安全启动参数**&quot;">​</a></h3><h4 id="_4-1-1-基础安全参数" tabindex="-1"><strong>4.1.1 基础安全参数</strong> <a class="header-anchor" href="#_4-1-1-基础安全参数" aria-label="Permalink to &quot;**4.1.1 基础安全参数**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 安全启动示例</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> secure-container</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --read-only</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">                           # 只读根文件系统</span></span>
<span class="line"><span class="__shiki_140thh">  --security-opt</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">no-new-privileges</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">     # 禁止新权限</span></span>
<span class="line"><span class="__shiki_140thh">  --security-opt</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">apparmor</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">docker-default</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_140thh"># AppArmor配置</span></span>
<span class="line"><span class="__shiki_140thh">  --cap-drop</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">ALL</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">                        # 删除所有capabilities</span></span>
<span class="line"><span class="__shiki_140thh">  --cap-add</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">NET_BIND_SERVICE</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">           # 仅添加必需capabilities</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --pids-limit</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">                     # 限制进程数</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --memory</span><span class="__shiki_mdbnqw"> 256m</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">                        # 内存限制</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --cpus</span><span class="__shiki_dzsirb"> 0.5</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">                           # CPU限制</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --blkio-weight</span><span class="__shiki_dzsirb"> 500</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">                   # 块IO权重</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --device-read-bps</span><span class="__shiki_mdbnqw"> /dev/sda:1mb</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">       # 设备读取限制</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --ulimit</span><span class="__shiki_mdbnqw"> nofile=1024:1024</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">            # 文件描述符限制</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --tmpfs</span><span class="__shiki_mdbnqw"> /tmp:size=10M,noexec,nosuid</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">  # tmpfs挂载</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --user</span><span class="__shiki_mdbnqw"> 1000:1000</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">                     # 非root用户</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --group-add</span><span class="__shiki_dzsirb"> 2000</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">                     # 附加组</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --health-cmd</span><span class="__shiki_mdbnqw"> &quot;curl -f http://localhost/health&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --health-interval</span><span class="__shiki_mdbnqw"> 30s</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  myimage:latest</span></span></code></pre></div><h4 id="_4-1-2-linux-capabilities管理" tabindex="-1"><strong>4.1.2 Linux Capabilities管理</strong> <a class="header-anchor" href="#_4-1-2-linux-capabilities管理" aria-label="Permalink to &quot;**4.1.2 Linux Capabilities管理**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 查看容器capabilities</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_dzsirb"> --format=</span><span class="__shiki_mdbnqw">&#39;{{.HostConfig.CapAdd}} {{.HostConfig.CapDrop}}&#39;</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">containe</span><span class="__shiki_140thh">r</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 危险capabilities列表（应删除）：</span></span>
<span class="line"><span class="__shiki_21nrsd"># CAP_SYS_ADMIN      - 系统管理权限</span></span>
<span class="line"><span class="__shiki_21nrsd"># CAP_NET_RAW        - 原始套接字（可构造网络包）</span></span>
<span class="line"><span class="__shiki_21nrsd"># CAP_SYS_MODULE     - 加载内核模块</span></span>
<span class="line"><span class="__shiki_21nrsd"># CAP_SYS_PTRACE     - 调试其他进程</span></span>
<span class="line"><span class="__shiki_21nrsd"># CAP_CHOWN          - 改变文件所有者</span></span>
<span class="line"><span class="__shiki_21nrsd"># CAP_DAC_OVERRIDE   - 绕过文件权限检查</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 安全capabilities示例：</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> --cap-drop=ALL</span><span class="__shiki_dzsirb"> --cap-add=NET_BIND_SERVICE</span><span class="__shiki_mdbnqw"> nginx</span></span></code></pre></div><h3 id="_4-2-安全隔离技术" tabindex="-1"><strong>4.2 安全隔离技术</strong> <a class="header-anchor" href="#_4-2-安全隔离技术" aria-label="Permalink to &quot;**4.2 安全隔离技术**&quot;">​</a></h3><h4 id="_4-2-1-seccomp配置" tabindex="-1"><strong>4.2.1 Seccomp配置</strong> <a class="header-anchor" href="#_4-2-1-seccomp配置" aria-label="Permalink to &quot;**4.2.1 Seccomp配置**&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 自定义seccomp配置文件：/etc/docker/seccomp/custom.json</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;defaultAction&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;SCMP_ACT_ERRNO&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;architectures&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;SCMP_ARCH_X86_64&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;SCMP_ARCH_X86&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;SCMP_ARCH_X32&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  ],</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;syscalls&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;names&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;accept&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;accept4&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;access&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;alarm&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;bind&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;brk&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;capget&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;capset&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;chdir&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;chmod&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;chown&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;clock_gettime&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;clone&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;close&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;connect&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;dup&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;dup2&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;epoll_create&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;epoll_ctl&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;epoll_wait&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;execve&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;exit&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;exit_group&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;fchmod&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;fchown&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;fcntl&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;fdatasync&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;futex&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;getcwd&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;getdents&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;getegid&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;geteuid&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;getgid&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;getpeername&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;getpgid&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;getpid&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;getppid&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;getpriority&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;getrandom&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;getrlimit&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;getrusage&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;getsid&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;getsockname&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;getsockopt&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;getuid&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;ioctl&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;kill&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;listen&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;lseek&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;lstat&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;mkdir&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;mmap&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;mprotect&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;munmap&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;nanosleep&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;open&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;openat&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;pipe&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;poll&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;pread64&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;prlimit64&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;pwrite64&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;read&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;readlink&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;recvfrom&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;recvmsg&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;rename&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;rmdir&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;rt_sigaction&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;rt_sigprocmask&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;rt_sigreturn&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;sched_yield&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;sendmsg&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;sendto&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;set_robust_list&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;setitimer&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;setsockopt&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;shutdown&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;sigaltstack&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;socket&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;stat&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;symlink&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;sync&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;unlink&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;wait4&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;write&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      ],</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;action&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;SCMP_ACT_ALLOW&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 使用自定义seccomp配置</span></span>
<span class="line"><span class="__shiki_140thh">docker run --security-opt seccomp=/etc/docker/seccomp/custom.json nginx</span></span></code></pre></div><h4 id="_4-2-2-apparmor配置" tabindex="-1"><strong>4.2.2 AppArmor配置</strong> <a class="header-anchor" href="#_4-2-2-apparmor配置" aria-label="Permalink to &quot;**4.2.2 AppArmor配置**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 查看AppArmor状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">aa-status</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 创建自定义AppArmor配置文件</span></span>
<span class="line"><span class="__shiki_21nrsd"># /etc/apparmor.d/containers/myapp</span></span>
<span class="line"><span class="__shiki_21nrsd">#include &lt;tunables/global&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">profile</span><span class="__shiki_mdbnqw"> myapp</span><span class="__shiki_mdbnqw"> flags=</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">attach_disconnected,mediate_deleted</span><span class="__shiki_140thh">) </span><span class="__shiki_mdbnqw">{</span></span>
<span class="line"><span class="__shiki_21nrsd">  #include &lt;abstractions/base&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 允许网络</span></span>
<span class="line"><span class="__shiki_1t8gfj">  network</span><span class="__shiki_mdbnqw"> inet</span><span class="__shiki_mdbnqw"> tcp,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  network</span><span class="__shiki_mdbnqw"> inet</span><span class="__shiki_mdbnqw"> udp,</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 文件访问规则</span></span>
<span class="line"><span class="__shiki_1t8gfj">  deny</span><span class="__shiki_mdbnqw"> /etc/passwd</span><span class="__shiki_mdbnqw"> rw,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  deny</span><span class="__shiki_mdbnqw"> /etc/shadow</span><span class="__shiki_mdbnqw"> rw,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  deny</span><span class="__shiki_mdbnqw"> /root/</span><span class="__shiki_dzsirb">**</span><span class="__shiki_mdbnqw"> rw,</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 允许必要的文件访问</span></span>
<span class="line"><span class="__shiki_1t8gfj">  /var/log/myapp/*</span><span class="__shiki_mdbnqw"> rw,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  /tmp/**</span><span class="__shiki_mdbnqw"> rw,</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 进程管理</span></span>
<span class="line"><span class="__shiki_1t8gfj">  deny</span><span class="__shiki_mdbnqw"> capability</span><span class="__shiki_mdbnqw"> sys_module,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  deny</span><span class="__shiki_mdbnqw"> capability</span><span class="__shiki_mdbnqw"> sys_admin,</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 加载配置文件</span></span>
<span class="line"><span class="__shiki_1t8gfj">apparmor_parser</span><span class="__shiki_dzsirb"> -r</span><span class="__shiki_mdbnqw"> /etc/apparmor.d/containers/myapp</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 使用配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> --security-opt</span><span class="__shiki_mdbnqw"> apparmor=myapp</span><span class="__shiki_mdbnqw"> myimage</span></span></code></pre></div><h4 id="_4-2-3-selinux配置" tabindex="-1"><strong>4.2.3 SELinux配置</strong> <a class="header-anchor" href="#_4-2-3-selinux配置" aria-label="Permalink to &quot;**4.2.3 SELinux配置**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 查看SELinux状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">sestatus</span></span>
<span class="line"><span class="__shiki_1t8gfj">getenforce</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 设置SELinux标签</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -v</span><span class="__shiki_mdbnqw"> /host/data:/container/data:Z</span><span class="__shiki_mdbnqw"> nginx</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 自定义SELinux策略</span></span>
<span class="line"><span class="__shiki_21nrsd"># 生成容器策略模块</span></span>
<span class="line"><span class="__shiki_1t8gfj">audit2allow</span><span class="__shiki_dzsirb"> -a</span><span class="__shiki_dzsirb"> -M</span><span class="__shiki_mdbnqw"> docker-custom</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 加载模块</span></span>
<span class="line"><span class="__shiki_1t8gfj">semodule</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_mdbnqw"> docker-custom.pp</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 标签类型说明：</span></span>
<span class="line"><span class="__shiki_21nrsd"># :Z - 私有卷，仅当前容器可访问</span></span>
<span class="line"><span class="__shiki_21nrsd"># :z - 共享卷，多个容器可访问</span></span></code></pre></div><h3 id="_4-3-用户命名空间重映射" tabindex="-1"><strong>4.3 用户命名空间重映射</strong> <a class="header-anchor" href="#_4-3-用户命名空间重映射" aria-label="Permalink to &quot;**4.3 用户命名空间重映射**&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 配置用户映射</span></span>
<span class="line"><span class="__shiki_21nrsd"># /etc/subuid</span></span>
<span class="line"><span class="__shiki_1t8gfj">dockremap:100000:65536</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># /etc/subgid  </span></span>
<span class="line"><span class="__shiki_1t8gfj">dockremap:100000:65536</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 修改Docker配置</span></span>
<span class="line"><span class="__shiki_21nrsd"># /etc/docker/daemon.json</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1t8gfj">  &quot;userns-remap&quot;</span><span class="__shiki_dzsirb">:</span><span class="__shiki_mdbnqw"> &quot;dockremap&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 重启Docker</span></span>
<span class="line"><span class="__shiki_1t8gfj">systemctl</span><span class="__shiki_mdbnqw"> restart</span><span class="__shiki_mdbnqw"> docker</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 验证映射</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> --rm</span><span class="__shiki_mdbnqw"> alpine</span><span class="__shiki_mdbnqw"> cat</span><span class="__shiki_mdbnqw"> /proc/self/uid_map</span></span>
<span class="line"><span class="__shiki_21nrsd"># 应显示：0 100000 65536</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 临时禁用用户命名空间（如果需要特权）</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> --userns=host</span><span class="__shiki_dzsirb"> --privileged</span><span class="__shiki_mdbnqw"> debug-tools</span></span></code></pre></div><h2 id="五、网络安全" tabindex="-1"><strong>五、网络安全</strong> <a class="header-anchor" href="#五、网络安全" aria-label="Permalink to &quot;**五、网络安全**&quot;">​</a></h2><h3 id="_5-1-网络命名空间隔离" tabindex="-1"><strong>5.1 网络命名空间隔离</strong> <a class="header-anchor" href="#_5-1-网络命名空间隔离" aria-label="Permalink to &quot;**5.1 网络命名空间隔离**&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 创建自定义网络</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> network</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --driver</span><span class="__shiki_mdbnqw"> bridge</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --subnet=172.28.0.0/16</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --ip-range=172.28.5.0/24</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --gateway=172.28.5.254</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --opt</span><span class="__shiki_mdbnqw"> com.docker.network.bridge.name=br-secure</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --opt</span><span class="__shiki_mdbnqw"> com.docker.network.bridge.enable_icc=</span><span class="__shiki_dzsirb">false</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd"> # 禁止容器间通信</span></span>
<span class="line"><span class="__shiki_1t8gfj">  secure-net</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 启动容器使用自定义网络</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> --network</span><span class="__shiki_mdbnqw"> secure-net</span><span class="__shiki_dzsirb"> --name</span><span class="__shiki_mdbnqw"> app1</span><span class="__shiki_mdbnqw"> myapp</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> --network</span><span class="__shiki_mdbnqw"> secure-net</span><span class="__shiki_dzsirb"> --name</span><span class="__shiki_mdbnqw"> app2</span><span class="__shiki_mdbnqw"> myapp</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 验证网络隔离</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> exec</span><span class="__shiki_mdbnqw"> app1</span><span class="__shiki_mdbnqw"> ping</span><span class="__shiki_mdbnqw"> app2</span><span class="__shiki_21nrsd">  # 应该失败</span></span></code></pre></div><h3 id="_5-2-网络策略配置" tabindex="-1"><strong>5.2 网络策略配置</strong> <a class="header-anchor" href="#_5-2-网络策略配置" aria-label="Permalink to &quot;**5.2 网络策略配置**&quot;">​</a></h3><h4 id="_5-2-1-使用iptables规则" tabindex="-1"><strong>5.2.1 使用iptables规则</strong> <a class="header-anchor" href="#_5-2-1-使用iptables规则" aria-label="Permalink to &quot;**5.2.1 使用iptables规则**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 禁止容器访问宿主机敏感端口</span></span>
<span class="line"><span class="__shiki_1t8gfj">iptables</span><span class="__shiki_dzsirb"> -I</span><span class="__shiki_mdbnqw"> DOCKER-USER</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_mdbnqw"> docker0</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> eth0</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> tcp</span><span class="__shiki_dzsirb"> --dport</span><span class="__shiki_dzsirb"> 22</span><span class="__shiki_dzsirb"> -j</span><span class="__shiki_mdbnqw"> DROP</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 限制容器出站流量</span></span>
<span class="line"><span class="__shiki_1t8gfj">iptables</span><span class="__shiki_dzsirb"> -I</span><span class="__shiki_mdbnqw"> DOCKER-USER</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> docker0</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> tcp</span><span class="__shiki_dzsirb"> --dport</span><span class="__shiki_dzsirb"> 80</span><span class="__shiki_dzsirb"> -j</span><span class="__shiki_mdbnqw"> ACCEPT</span></span>
<span class="line"><span class="__shiki_1t8gfj">iptables</span><span class="__shiki_dzsirb"> -I</span><span class="__shiki_mdbnqw"> DOCKER-USER</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> docker0</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> tcp</span><span class="__shiki_dzsirb"> --dport</span><span class="__shiki_dzsirb"> 443</span><span class="__shiki_dzsirb"> -j</span><span class="__shiki_mdbnqw"> ACCEPT</span></span>
<span class="line"><span class="__shiki_1t8gfj">iptables</span><span class="__shiki_dzsirb"> -I</span><span class="__shiki_mdbnqw"> DOCKER-USER</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> docker0</span><span class="__shiki_dzsirb"> -j</span><span class="__shiki_mdbnqw"> DROP</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 允许特定容器通信</span></span>
<span class="line"><span class="__shiki_1t8gfj">iptables</span><span class="__shiki_dzsirb"> -I</span><span class="__shiki_mdbnqw"> DOCKER-USER</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_mdbnqw"> docker0</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_dzsirb"> 172.17.0.2</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> 172.17.0.3</span><span class="__shiki_dzsirb"> -j</span><span class="__shiki_mdbnqw"> ACCEPT</span></span>
<span class="line"><span class="__shiki_1t8gfj">iptables</span><span class="__shiki_dzsirb"> -I</span><span class="__shiki_mdbnqw"> DOCKER-USER</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_mdbnqw"> docker0</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_dzsirb"> 172.17.0.3</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> 172.17.0.2</span><span class="__shiki_dzsirb"> -j</span><span class="__shiki_mdbnqw"> ACCEPT</span></span></code></pre></div><h4 id="_5-2-2-docker网络驱动安全" tabindex="-1"><strong>5.2.2 Docker网络驱动安全</strong> <a class="header-anchor" href="#_5-2-2-docker网络驱动安全" aria-label="Permalink to &quot;**5.2.2 Docker网络驱动安全**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 使用macvlan隔离</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> network</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_mdbnqw"> macvlan</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --subnet=192.168.1.0/24</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --gateway=192.168.1.1</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --ip-range=192.168.1.128/25</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -o</span><span class="__shiki_mdbnqw"> parent=eth0</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  macvlan-net</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 使用host网络模式（谨慎使用）</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> --network</span><span class="__shiki_mdbnqw"> host</span><span class="__shiki_mdbnqw"> nginx</span><span class="__shiki_21nrsd">  # 容器与宿主机共享网络栈</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 使用none网络模式</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> --network</span><span class="__shiki_mdbnqw"> none</span><span class="__shiki_mdbnqw"> alpine</span><span class="__shiki_mdbnqw"> ip</span><span class="__shiki_mdbnqw"> addr</span><span class="__shiki_21nrsd">  # 无网络接口</span></span></code></pre></div><h3 id="_5-3-服务网格安全" tabindex="-1"><strong>5.3 服务网格安全</strong> <a class="header-anchor" href="#_5-3-服务网格安全" aria-label="Permalink to &quot;**5.3 服务网格安全**&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># docker-compose.yml with network security</span></span>
<span class="line"><span class="__shiki_17hn0y">version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;3.8&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">services</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  web</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx:alpine</span></span>
<span class="line"><span class="__shiki_17hn0y">    networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      frontend</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        aliases</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">web.frontend</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;80:80&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">  api</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapi:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">frontend</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">backend</span></span>
<span class="line"><span class="__shiki_17hn0y">    security_opt</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">no-new-privileges:true</span></span>
<span class="line"><span class="__shiki_17hn0y">    cap_drop</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">ALL</span></span>
<span class="line"><span class="__shiki_17hn0y">    cap_add</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">NET_BIND_SERVICE</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">  db</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">postgres:14</span></span>
<span class="line"><span class="__shiki_17hn0y">    networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      backend</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    environment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      POSTGRES_PASSWORD_FILE</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/run/secrets/db_password</span></span>
<span class="line"><span class="__shiki_17hn0y">    secrets</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">db_password</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">db_data:/var/lib/postgresql/data</span></span>
<span class="line"><span class="__shiki_17hn0y">    read_only</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  frontend</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    driver</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bridge</span></span>
<span class="line"><span class="__shiki_17hn0y">    internal</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_21nrsd">  # 可访问外部网络</span></span>
<span class="line"><span class="__shiki_17hn0y">  backend</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    driver</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bridge</span></span>
<span class="line"><span class="__shiki_17hn0y">    internal</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">   # 仅内部访问</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">secrets</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  db_password</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    file</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">./secrets/db_password.txt</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  db_data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    driver</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">local</span></span></code></pre></div><h2 id="六、日志与监控" tabindex="-1"><strong>六、日志与监控</strong> <a class="header-anchor" href="#六、日志与监控" aria-label="Permalink to &quot;**六、日志与监控**&quot;">​</a></h2><h3 id="_6-1-安全日志配置" tabindex="-1"><strong>6.1 安全日志配置</strong> <a class="header-anchor" href="#_6-1-安全日志配置" aria-label="Permalink to &quot;**6.1 安全日志配置**&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 配置日志驱动</span></span>
<span class="line"><span class="__shiki_21nrsd"># /etc/docker/daemon.json</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1t8gfj">  &quot;log-driver&quot;</span><span class="__shiki_dzsirb">:</span><span class="__shiki_mdbnqw"> &quot;json-file&quot;,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  &quot;log-opts&quot;</span><span class="__shiki_dzsirb">:</span><span class="__shiki_mdbnqw"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    &quot;max-size&quot;</span><span class="__shiki_dzsirb">:</span><span class="__shiki_mdbnqw"> &quot;10m&quot;,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    &quot;max-file&quot;</span><span class="__shiki_dzsirb">:</span><span class="__shiki_mdbnqw"> &quot;3&quot;,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    &quot;labels&quot;</span><span class="__shiki_dzsirb">:</span><span class="__shiki_mdbnqw"> &quot;security_level&quot;,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    &quot;env&quot;</span><span class="__shiki_dzsirb">:</span><span class="__shiki_mdbnqw"> &quot;os,customer&quot;,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    &quot;tag&quot;</span><span class="__shiki_dzsirb">:</span><span class="__shiki_mdbnqw"> &quot;{{.ImageName}}|{{.Name}}|{{.ImageFullID}}|{{.FullID}}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 容器日志级别</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> --log-driver=json-file</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --log-opt</span><span class="__shiki_mdbnqw"> max-size=10m</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --log-opt</span><span class="__shiki_mdbnqw"> max-file=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --log-opt</span><span class="__shiki_mdbnqw"> labels=security_audit</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  nginx</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 集中日志收集（使用Fluentd）</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> --log-driver=fluentd</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --log-opt</span><span class="__shiki_mdbnqw"> fluentd-address=localhost:24224</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --log-opt</span><span class="__shiki_mdbnqw"> tag=docker.{{.Name}}</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  nginx</span></span></code></pre></div><h3 id="_6-2-安全监控与告警" tabindex="-1"><strong>6.2 安全监控与告警</strong> <a class="header-anchor" href="#_6-2-安全监控与告警" aria-label="Permalink to &quot;**6.2 安全监控与告警**&quot;">​</a></h3><h4 id="_6-2-1-关键监控指标" tabindex="-1"><strong>6.2.1 关键监控指标</strong> <a class="header-anchor" href="#_6-2-1-关键监控指标" aria-label="Permalink to &quot;**6.2.1 关键监控指标**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 监控脚本示例：security-monitor.sh</span></span>
<span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 监控特权容器</span></span>
<span class="line"><span class="__shiki_140thh">PRIVILEGED_CONTAINERS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> ps</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_dzsirb"> --filter</span><span class="__shiki_mdbnqw"> &quot;status=running&quot;</span><span class="__shiki_dzsirb"> --filter</span><span class="__shiki_mdbnqw"> &quot;label=privileged=true&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_1itgoe">!</span><span class="__shiki_1itgoe"> -z</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$PRIVILEGED_CONTAINERS</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;ALERT: Privileged containers detected: </span><span class="__shiki_140thh">$PRIVILEGED_CONTAINERS</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 监控挂载敏感目录的容器</span></span>
<span class="line"><span class="__shiki_140thh">SENSITIVE_MOUNTS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_140thh"> $(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> ps</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">|</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_1t8gfj">  grep</span><span class="__shiki_dzsirb"> -E</span><span class="__shiki_mdbnqw"> &#39;&quot;Source&quot;:&quot;/(etc|root|var/lib/docker|/dev)&quot;&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_1itgoe">!</span><span class="__shiki_1itgoe"> -z</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$SENSITIVE_MOUNTS</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;ALERT: Containers with sensitive mounts detected&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 监控容器资源使用</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> stats</span><span class="__shiki_dzsirb"> --no-stream</span><span class="__shiki_dzsirb"> --format</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;{{.Name}} CPU:{{.CPUPerc}} MEM:{{.MemPerc}}&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 监控网络连接</span></span>
<span class="line"><span class="__shiki_1t8gfj">nsenter</span><span class="__shiki_dzsirb"> -t</span><span class="__shiki_140thh"> $(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> &#39;{{.State.Pid}}&#39;</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">containe</span><span class="__shiki_140thh">r</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh">) </span><span class="__shiki_dzsirb">-n</span><span class="__shiki_mdbnqw"> netstat</span><span class="__shiki_dzsirb"> -tunap</span></span></code></pre></div><h4 id="_6-2-2-使用falco进行运行时安全监控" tabindex="-1"><strong>6.2.2 使用Falco进行运行时安全监控</strong> <a class="header-anchor" href="#_6-2-2-使用falco进行运行时安全监控" aria-label="Permalink to &quot;**6.2.2 使用Falco进行运行时安全监控**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># falco-rules.yaml (自定义规则)</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">rule</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Write below binary dir</span></span>
<span class="line"><span class="__shiki_17hn0y">  desc</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">attempt to write to any file below a set of binary directories</span></span>
<span class="line"><span class="__shiki_17hn0y">  condition</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    evt.type = write and</span></span>
<span class="line"><span class="__shiki_mdbnqw">    container and</span></span>
<span class="line"><span class="__shiki_mdbnqw">    (fd.directory = /bin or fd.directory = /sbin or</span></span>
<span class="line"><span class="__shiki_mdbnqw">     fd.directory = /usr/bin or fd.directory = /usr/sbin)</span></span>
<span class="line"><span class="__shiki_17hn0y">  output</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    File below a binary directory opened for writing (user=%user.name</span></span>
<span class="line"><span class="__shiki_mdbnqw">    command=%proc.cmdline file=%fd.name)</span></span>
<span class="line"><span class="__shiki_17hn0y">  priority</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ERROR</span></span>
<span class="line"><span class="__shiki_17hn0y">  tags</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">filesystem</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">rule</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Launch Suspicious Container</span></span>
<span class="line"><span class="__shiki_17hn0y">  desc</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Detect the launch of a suspicious container</span></span>
<span class="line"><span class="__shiki_17hn0y">  condition</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    spawned_process and container and</span></span>
<span class="line"><span class="__shiki_mdbnqw">    (container.image.repository = alpine and</span></span>
<span class="line"><span class="__shiki_mdbnqw">     proc.name = sh and</span></span>
<span class="line"><span class="__shiki_mdbnqw">     (proc.cmdline contains &quot;-c&quot; and proc.cmdline contains &quot;apk add&quot;))</span></span>
<span class="line"><span class="__shiki_17hn0y">  output</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    Suspicious container launched (user=%user.name command=%proc.cmdline)</span></span>
<span class="line"><span class="__shiki_17hn0y">  priority</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">WARNING</span></span></code></pre></div><h2 id="七、合规与审计" tabindex="-1"><strong>七、合规与审计</strong> <a class="header-anchor" href="#七、合规与审计" aria-label="Permalink to &quot;**七、合规与审计**&quot;">​</a></h2><h3 id="_7-1-cis-docker-benchmark" tabindex="-1"><strong>7.1 CIS Docker Benchmark</strong> <a class="header-anchor" href="#_7-1-cis-docker-benchmark" aria-label="Permalink to &quot;**7.1 CIS Docker Benchmark**&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用docker-bench-security进行合规检查</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -it</span><span class="__shiki_dzsirb"> --net</span><span class="__shiki_mdbnqw"> host</span><span class="__shiki_dzsirb"> --pid</span><span class="__shiki_mdbnqw"> host</span><span class="__shiki_dzsirb"> --userns</span><span class="__shiki_mdbnqw"> host</span><span class="__shiki_dzsirb"> --cap-add</span><span class="__shiki_mdbnqw"> audit_control</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -e</span><span class="__shiki_mdbnqw"> DOCKER_CONTENT_TRUST=</span><span class="__shiki_dzsirb">1</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -v</span><span class="__shiki_mdbnqw"> /etc:/etc:ro</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -v</span><span class="__shiki_mdbnqw"> /usr/bin/containerd:/usr/bin/containerd:ro</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -v</span><span class="__shiki_mdbnqw"> /usr/bin/runc:/usr/bin/runc:ro</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -v</span><span class="__shiki_mdbnqw"> /usr/lib/systemd:/usr/lib/systemd:ro</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -v</span><span class="__shiki_mdbnqw"> /var/lib:/var/lib:ro</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -v</span><span class="__shiki_mdbnqw"> /var/run/docker.sock:/var/run/docker.sock:ro</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --label</span><span class="__shiki_mdbnqw"> docker_bench_security</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  docker/docker-bench-security</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查结果示例：</span></span>
<span class="line"><span class="__shiki_21nrsd"># [INFO] 1 - Host Configuration</span></span>
<span class="line"><span class="__shiki_21nrsd"># [PASS] 1.1 - Ensure a separate partition for containers has been created</span></span>
<span class="line"><span class="__shiki_21nrsd"># [WARN] 1.2 - Ensure the container host has been Hardened</span></span></code></pre></div><h3 id="_7-2-安全审计配置" tabindex="-1"><strong>7.2 安全审计配置</strong> <a class="header-anchor" href="#_7-2-安全审计配置" aria-label="Permalink to &quot;**7.2 安全审计配置**&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 启用Docker审计</span></span>
<span class="line"><span class="__shiki_21nrsd"># /etc/audit/audit.rules</span></span>
<span class="line"><span class="__shiki_1t8gfj">-w</span><span class="__shiki_mdbnqw"> /usr/bin/docker</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> rwxa</span><span class="__shiki_dzsirb"> -k</span><span class="__shiki_mdbnqw"> docker</span></span>
<span class="line"><span class="__shiki_1t8gfj">-w</span><span class="__shiki_mdbnqw"> /var/lib/docker</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> rwxa</span><span class="__shiki_dzsirb"> -k</span><span class="__shiki_mdbnqw"> docker</span></span>
<span class="line"><span class="__shiki_1t8gfj">-w</span><span class="__shiki_mdbnqw"> /etc/docker</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> rwxa</span><span class="__shiki_dzsirb"> -k</span><span class="__shiki_mdbnqw"> docker</span></span>
<span class="line"><span class="__shiki_1t8gfj">-w</span><span class="__shiki_mdbnqw"> /lib/systemd/system/docker.service</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> rwxa</span><span class="__shiki_dzsirb"> -k</span><span class="__shiki_mdbnqw"> docker</span></span>
<span class="line"><span class="__shiki_1t8gfj">-w</span><span class="__shiki_mdbnqw"> /etc/docker/daemon.json</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> rwxa</span><span class="__shiki_dzsirb"> -k</span><span class="__shiki_mdbnqw"> docker</span></span>
<span class="line"><span class="__shiki_1t8gfj">-w</span><span class="__shiki_mdbnqw"> /usr/bin/docker-containerd</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> rwxa</span><span class="__shiki_dzsirb"> -k</span><span class="__shiki_mdbnqw"> docker</span></span>
<span class="line"><span class="__shiki_1t8gfj">-w</span><span class="__shiki_mdbnqw"> /usr/bin/docker-runc</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> rwxa</span><span class="__shiki_dzsirb"> -k</span><span class="__shiki_mdbnqw"> docker</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 查看审计日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">ausearch</span><span class="__shiki_dzsirb"> -k</span><span class="__shiki_mdbnqw"> docker</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> aureport</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_dzsirb"> -i</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 定期安全扫描脚本</span></span>
<span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># security-audit.sh</span></span>
<span class="line"><span class="__shiki_140thh">DATE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%Y%m%d</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">REPORT</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/var/log/docker-security-audit-</span><span class="__shiki_140thh">$DATE</span><span class="__shiki_mdbnqw">.log&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;=== Docker Security Audit Report ===&quot;</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_140thh"> $REPORT</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;Date: $(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw">)&quot;</span><span class="__shiki_1itgoe"> &gt;&gt;</span><span class="__shiki_140thh"> $REPORT</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;&quot;</span><span class="__shiki_1itgoe"> &gt;&gt;</span><span class="__shiki_140thh"> $REPORT</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查容器配置</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;1. Container Security Checks:&quot;</span><span class="__shiki_1itgoe"> &gt;&gt;</span><span class="__shiki_140thh"> $REPORT</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> ps</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1itgoe"> while</span><span class="__shiki_dzsirb"> read</span><span class="__shiki_mdbnqw"> cid</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_dzsirb">  echo</span><span class="__shiki_mdbnqw"> &quot;Container: $(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> inspect </span><span class="__shiki_dzsirb">-f</span><span class="__shiki_mdbnqw"> &#39;{{.Name}}&#39; </span><span class="__shiki_140thh">$cid</span><span class="__shiki_mdbnqw">)&quot;</span><span class="__shiki_1itgoe"> &gt;&gt;</span><span class="__shiki_140thh"> $REPORT</span></span>
<span class="line"><span class="__shiki_1t8gfj">  docker</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_140thh"> $cid </span><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -E</span><span class="__shiki_mdbnqw"> &#39;(Privileged|ReadonlyRootfs|SecurityOpt)&#39;</span><span class="__shiki_1itgoe"> &gt;&gt;</span><span class="__shiki_140thh"> $REPORT</span></span>
<span class="line"><span class="__shiki_1itgoe">done</span></span></code></pre></div><h2 id="八、应急响应与取证" tabindex="-1"><strong>八、应急响应与取证</strong> <a class="header-anchor" href="#八、应急响应与取证" aria-label="Permalink to &quot;**八、应急响应与取证**&quot;">​</a></h2><h3 id="_8-1-安全事件响应流程" tabindex="-1"><strong>8.1 安全事件响应流程</strong> <a class="header-anchor" href="#_8-1-安全事件响应流程" aria-label="Permalink to &quot;**8.1 安全事件响应流程**&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 应急响应脚本模板</span></span>
<span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># incident-response.sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">INCIDENT_ID</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%Y%m%d-%H%M%S</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">LOG_DIR</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/var/incidents/</span><span class="__shiki_140thh">$INCIDENT_ID</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">mkdir</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_140thh"> $LOG_DIR</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 记录当前状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> ps</span><span class="__shiki_dzsirb"> -a</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_140thh"> $LOG_DIR</span><span class="__shiki_mdbnqw">/containers.txt</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> images</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_140thh"> $LOG_DIR</span><span class="__shiki_mdbnqw">/images.txt</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> network</span><span class="__shiki_mdbnqw"> ls</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_140thh"> $LOG_DIR</span><span class="__shiki_mdbnqw">/networks.txt</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 保存可疑容器配置</span></span>
<span class="line"><span class="__shiki_140thh">SUSPECT_CONTAINER</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33">$1</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_1itgoe">!</span><span class="__shiki_1itgoe"> -z</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$SUSPECT_CONTAINER</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1t8gfj">    docker</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_140thh"> $SUSPECT_CONTAINER </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> $LOG_DIR</span><span class="__shiki_mdbnqw">/inspect-</span><span class="__shiki_140thh">$SUSPECT_CONTAINER</span><span class="__shiki_mdbnqw">.json</span></span>
<span class="line"><span class="__shiki_1t8gfj">    docker</span><span class="__shiki_mdbnqw"> export</span><span class="__shiki_140thh"> $SUSPECT_CONTAINER </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> $LOG_DIR</span><span class="__shiki_mdbnqw">/export-</span><span class="__shiki_140thh">$SUSPECT_CONTAINER</span><span class="__shiki_mdbnqw">.tar</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 网络取证</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> exec</span><span class="__shiki_140thh"> $SUSPECT_CONTAINER </span><span class="__shiki_mdbnqw">netstat</span><span class="__shiki_dzsirb"> -tunap</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_140thh"> $LOG_DIR</span><span class="__shiki_mdbnqw">/netstat.txt</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> exec</span><span class="__shiki_140thh"> $SUSPECT_CONTAINER </span><span class="__shiki_mdbnqw">ps</span><span class="__shiki_mdbnqw"> aux</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_140thh"> $LOG_DIR</span><span class="__shiki_mdbnqw">/processes.txt</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 暂停容器进行进一步分析</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> pause</span><span class="__shiki_140thh"> $SUSPECT_CONTAINER</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;Incident </span><span class="__shiki_140thh">$INCIDENT_ID</span><span class="__shiki_mdbnqw"> recorded in </span><span class="__shiki_140thh">$LOG_DIR</span><span class="__shiki_mdbnqw">&quot;</span></span></code></pre></div><h3 id="_8-2-容器取证工具" tabindex="-1"><strong>8.2 容器取证工具</strong> <a class="header-anchor" href="#_8-2-容器取证工具" aria-label="Permalink to &quot;**8.2 容器取证工具**&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用dive检查镜像层</span></span>
<span class="line"><span class="__shiki_1t8gfj">dive</span><span class="__shiki_mdbnqw"> suspicious-image:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用container-diff比较镜像</span></span>
<span class="line"><span class="__shiki_1t8gfj">container-diff</span><span class="__shiki_mdbnqw"> diff</span><span class="__shiki_mdbnqw"> daemon://image1</span><span class="__shiki_mdbnqw"> daemon://image2</span><span class="__shiki_dzsirb"> --type=file</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用docker-explorer进行深度取证</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -v</span><span class="__shiki_mdbnqw"> /var/lib/docker:/var/lib/docker:ro</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -v</span><span class="__shiki_140thh"> $(</span><span class="__shiki_dzsirb">pwd</span><span class="__shiki_140thh">)</span><span class="__shiki_mdbnqw">:/output</span><span class="__shiki_mdbnqw"> aquasec/docker-explorer</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查容器文件系统变化</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> diff</span><span class="__shiki_mdbnqw"> suspicious-container</span></span></code></pre></div><h2 id="九、最佳实践总结" tabindex="-1"><strong>九、最佳实践总结</strong> <a class="header-anchor" href="#九、最佳实践总结" aria-label="Permalink to &quot;**九、最佳实践总结**&quot;">​</a></h2><h3 id="_9-1-安全配置检查清单" tabindex="-1"><strong>9.1 安全配置检查清单</strong> <a class="header-anchor" href="#_9-1-安全配置检查清单" aria-label="Permalink to &quot;**9.1 安全配置检查清单**&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_19pls7">## Docker 安全检查清单</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">### 主机安全</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 使用最新版 Docker 和 containerd</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 定期更新主机内核</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 为容器使用单独分区</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 启用用户命名空间重映射</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 配置适当的 ulimits</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">### 镜像安全  </span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 使用最小化基础镜像（Alpine、Distroless）</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 定期扫描镜像漏洞</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 启用 Docker 内容信任（DCT）</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 使用多阶段构建</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 删除镜像中的敏感信息</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">### 容器运行时安全</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 使用非 root 用户运行容器</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 设置 read-only 根文件系统</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 删除所有不必要的 capabilities</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 启用 no-new-privileges</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 配置适当的 seccomp 策略</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 使用 AppArmor 或 SELinux</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">### 网络安全</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 使用自定义网络</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 禁止容器间通信（icc=false）</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 配置网络策略</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 使用加密通信（TLS）</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 限制端口暴露</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">### 存储安全</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 使用只读挂载</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 避免挂载敏感主机目录</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 使用 tmpfs 代替持久化存储</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 加密敏感数据卷</span></span></code></pre></div><h3 id="_9-2-自动化安全流水线" tabindex="-1"><strong>9.2 自动化安全流水线</strong> <a class="header-anchor" href="#_9-2-自动化安全流水线" aria-label="Permalink to &quot;**9.2 自动化安全流水线**&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># .gitlab-ci.yml 安全流水线示例</span></span>
<span class="line"><span class="__shiki_17hn0y">stages</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">build</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">security_scan</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">deploy</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">build</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">build</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">security_scan</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security_scan</span></span>
<span class="line"><span class="__shiki_17hn0y">  image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">aquasec/trivy:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 镜像漏洞扫描</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">trivy image --exit-code 1 --severity HIGH,CRITICAL $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 配置检查</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">trivy config ./</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 安全策略检查</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">docker run -v /var/run/docker.sock:/var/run/docker.sock anchore/inline-scan analyze -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA</span></span>
<span class="line"><span class="__shiki_17hn0y">  only</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">main</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">develop</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">deploy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deploy</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">echo &quot;Deploying secure container...&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  when</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">manual</span></span></code></pre></div><h3 id="_9-3-持续监控与改进" tabindex="-1"><strong>9.3 持续监控与改进</strong> <a class="header-anchor" href="#_9-3-持续监控与改进" aria-label="Permalink to &quot;**9.3 持续监控与改进**&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 定期安全报告生成脚本</span></span>
<span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># weekly-security-report.sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">REPORT_DATE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%Y-%m-%d</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">REPORT_FILE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/var/log/security-reports/weekly-</span><span class="__shiki_140thh">$REPORT_DATE</span><span class="__shiki_mdbnqw">.md&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_140thh"> $REPORT_FILE </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_mdbnqw"> EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw"># Docker 安全周报 (</span><span class="__shiki_140thh">$REPORT_DATE</span><span class="__shiki_mdbnqw">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">## 1. 漏洞扫描结果</span></span>
<span class="line"><span class="__shiki_dzsirb">\\\`\\\`\\\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">$(</span><span class="__shiki_1t8gfj">trivy</span><span class="__shiki_mdbnqw"> image </span><span class="__shiki_dzsirb">--format</span><span class="__shiki_mdbnqw"> json myimage:latest </span><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> jq</span><span class="__shiki_mdbnqw"> &#39;.Results[] | {Target: .Target, Vulnerabilities: .Vulnerabilities}&#39;)</span></span>
<span class="line"><span class="__shiki_dzsirb">\\\`\\\`\\\`</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">## 2. 合规性检查</span></span>
<span class="line"><span class="__shiki_dzsirb">\\\`\\\`\\\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">$(</span><span class="__shiki_1t8gfj">docker-bench-security</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_mdbnqw">)</span></span>
<span class="line"><span class="__shiki_dzsirb">\\\`\\\`\\\`</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">## 3. 运行时事件</span></span>
<span class="line"><span class="__shiki_dzsirb">\\\`\\\`\\\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">$(</span><span class="__shiki_1t8gfj">journalctl</span><span class="__shiki_dzsirb"> --since</span><span class="__shiki_mdbnqw"> &quot;7 days ago&quot; </span><span class="__shiki_dzsirb">-u</span><span class="__shiki_mdbnqw"> docker </span><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_mdbnqw"> &quot;security\\|violation\\|audit&quot;)</span></span>
<span class="line"><span class="__shiki_dzsirb">\\\`\\\`\\\`</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">## 4. 建议改进</span></span>
<span class="line"><span class="__shiki_mdbnqw">- [ ] 更新基础镜像修复CVE-XXXX</span></span>
<span class="line"><span class="__shiki_mdbnqw">- [ ] 调整seccomp策略限制系统调用</span></span>
<span class="line"><span class="__shiki_mdbnqw">- [ ] 实施网络策略加强隔离</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span></code></pre></div><hr><h2 id="附录-安全工具集" tabindex="-1"><strong>附录：安全工具集</strong> <a class="header-anchor" href="#附录-安全工具集" aria-label="Permalink to &quot;**附录：安全工具集**&quot;">​</a></h2><h3 id="开源安全工具" tabindex="-1"><strong>开源安全工具</strong> <a class="header-anchor" href="#开源安全工具" aria-label="Permalink to &quot;**开源安全工具**&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">| 工具名称 | 用途 | 项目地址 |</span></span>
<span class="line"><span class="__shiki_140thh">|---------|------|---------|</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_28tyc3">**Trivy**</span><span class="__shiki_140thh"> | 镜像漏洞扫描 | https://github.com/aquasecurity/trivy |</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_28tyc3">**Clair**</span><span class="__shiki_140thh"> | 镜像静态分析 | https://github.com/quay/clair |</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_28tyc3">**Falco**</span><span class="__shiki_140thh"> | 运行时安全监控 | https://github.com/falcosecurity/falco |</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_28tyc3">**Anchore**</span><span class="__shiki_140thh"> | 策略合规检查 | https://github.com/anchore |</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_28tyc3">**docker-bench-security**</span><span class="__shiki_140thh"> | CIS基准测试 | https://github.com/docker/docker-bench-security |</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_28tyc3">**Notary**</span><span class="__shiki_140thh"> | 镜像签名验证 | https://github.com/theupdateframework/notary |</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_28tyc3">**Sysdig**</span><span class="__shiki_140thh"> | 安全监控与取证 | https://github.com/draios/sysdig |</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_28tyc3">**Bane**</span><span class="__shiki_140thh"> | AppArmor配置文件生成 | https://github.com/genuinetools/bane |</span></span></code></pre></div><h3 id="商业安全方案" tabindex="-1"><strong>商业安全方案</strong> <a class="header-anchor" href="#商业安全方案" aria-label="Permalink to &quot;**商业安全方案**&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">| 供应商 | 产品 | 关键特性 |</span></span>
<span class="line"><span class="__shiki_140thh">|-------|------|---------|</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_28tyc3">**Aqua Security**</span><span class="__shiki_140thh"> | Aqua CSP | 全生命周期安全、运行时保护 |</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_28tyc3">**Snyk**</span><span class="__shiki_140thh"> | Snyk Container | 开发优先的漏洞管理 |</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_28tyc3">**Twistlock**</span><span class="__shiki_140thh"> | Prisma Cloud | 云原生安全平台 |</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_28tyc3">**StackRox**</span><span class="__shiki_140thh"> | Red Hat Advanced Cluster Security | K8s原生安全 |</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_28tyc3">**Sysdig**</span><span class="__shiki_140thh"> | Sysdig Secure | 运行时安全、取证 |</span></span></code></pre></div><h3 id="学习资源" tabindex="-1"><strong>学习资源</strong> <a class="header-anchor" href="#学习资源" aria-label="Permalink to &quot;**学习资源**&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_19pls7">## 官方文档</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> Docker Security Documentation: https://docs.docker.com/engine/security/</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> CIS Docker Benchmark: https://www.cisecurity.org/benchmark/docker/</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> NIST Container Security Guide: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-190.pdf</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">## 社区资源</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> OWASP Docker Security: https://owasp.org/www-project-docker-security/</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> Cloud Native Security Whitepaper: https://github.com/cncf/tag-security</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">## 认证课程</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> Docker Certified Associate (DCA)</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> Certified Kubernetes Security Specialist (CKS)</span></span></code></pre></div><hr><p><strong>核心安全原则总结</strong>：</p><ol><li><strong>最小权限原则</strong>：容器只获得其运行所需的最小权限</li><li><strong>纵深防御</strong>：多层安全措施叠加，不依赖单一防护</li><li><strong>默认安全</strong>：默认配置应是最安全的配置</li><li><strong>持续监控</strong>：安全是一个持续的过程，不是一次性任务</li><li><strong>安全左移</strong>：在开发早期就考虑安全问题</li></ol><p>记住：<strong>安全与便利性的平衡是关键</strong>。过于严格的安全策略可能影响业务连续性，需要根据实际风险调整安全措施。</p>`,99)])])}const o=a(_,[["render",l]]);export{r as __pageData,o as default};
