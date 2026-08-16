import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"容器化技术 → 容器编排 → Helm包管理 完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"devops/container/orchestration/helm.md","filePath":"devops/container/orchestration/helm.md"}'),_={name:"devops/container/orchestration/helm.md"};function l(h,s,e,c,t,k){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="容器化技术-→-容器编排-→-helm包管理-完整学习笔记" tabindex="-1">容器化技术 → 容器编排 → Helm包管理 完整学习笔记 <a class="header-anchor" href="#容器化技术-→-容器编排-→-helm包管理-完整学习笔记" aria-label="Permalink to &quot;容器化技术 → 容器编排 → Helm包管理 完整学习笔记&quot;">​</a></h1><hr><h2 id="第一部分-容器化技术核心概念" tabindex="-1">第一部分：容器化技术核心概念 <a class="header-anchor" href="#第一部分-容器化技术核心概念" aria-label="Permalink to &quot;第一部分：容器化技术核心概念&quot;">​</a></h2><h3 id="_1-1-容器技术演进" tabindex="-1">1.1 容器技术演进 <a class="header-anchor" href="#_1-1-容器技术演进" aria-label="Permalink to &quot;1.1 容器技术演进&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">物理机时代 → 虚拟机时代 → 容器时代</span></span></code></pre></div><ul><li><strong>传统部署问题</strong>：环境不一致、资源隔离差、部署效率低</li><li><strong>虚拟机缺点</strong>：资源占用大（每个VM需完整OS）、启动慢</li><li><strong>容器优势</strong>： <ul><li>轻量级（共享主机内核）</li><li>秒级启动</li><li>一致的运行环境</li><li>高效的资源利用</li></ul></li></ul><h3 id="_1-2-docker核心技术" tabindex="-1">1.2 Docker核心技术 <a class="header-anchor" href="#_1-2-docker核心技术" aria-label="Permalink to &quot;1.2 Docker核心技术&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Docker架构核心组件：</span></span>
<span class="line"><span class="__shiki_mdbnqw">1. Docker Client</span><span class="__shiki_21nrsd">     # 客户端</span></span>
<span class="line"><span class="__shiki_mdbnqw">2. Docker Daemon</span><span class="__shiki_21nrsd">    # 守护进程</span></span>
<span class="line"><span class="__shiki_mdbnqw">3. Registry</span><span class="__shiki_21nrsd">         # 镜像仓库</span></span>
<span class="line"><span class="__shiki_mdbnqw">4. Image</span><span class="__shiki_21nrsd">            # 镜像（只读模板）</span></span>
<span class="line"><span class="__shiki_mdbnqw">5. Container</span><span class="__shiki_21nrsd">        # 容器（运行实例）</span></span>
<span class="line"><span class="__shiki_mdbnqw">6. Network</span><span class="__shiki_21nrsd">          # 网络</span></span>
<span class="line"><span class="__shiki_mdbnqw">7. Volume</span><span class="__shiki_21nrsd">           # 数据卷</span></span></code></pre></div><h4 id="namespaces-命名空间-实现隔离" tabindex="-1"><strong>Namespaces（命名空间）</strong> - 实现隔离 <a class="header-anchor" href="#namespaces-命名空间-实现隔离" aria-label="Permalink to &quot;**Namespaces（命名空间）** - 实现隔离&quot;">​</a></h4><ul><li><strong>PID Namespace</strong>：进程隔离</li><li><strong>Net Namespace</strong>：网络隔离</li><li><strong>IPC Namespace</strong>：进程间通信隔离</li><li><strong>Mount Namespace</strong>：文件系统挂载点隔离</li><li><strong>UTS Namespace</strong>：主机名隔离</li><li><strong>User Namespace</strong>：用户权限隔离</li></ul><h4 id="cgroups-控制组-实现资源限制" tabindex="-1"><strong>Cgroups（控制组）</strong> - 实现资源限制 <a class="header-anchor" href="#cgroups-控制组-实现资源限制" aria-label="Permalink to &quot;**Cgroups（控制组）** - 实现资源限制&quot;">​</a></h4><ul><li>CPU限制</li><li>内存限制</li><li>磁盘I/O限制</li><li>网络带宽限制</li></ul><h4 id="unionfs-联合文件系统" tabindex="-1"><strong>UnionFS（联合文件系统）</strong> <a class="header-anchor" href="#unionfs-联合文件系统" aria-label="Permalink to &quot;**UnionFS（联合文件系统）**&quot;">​</a></h4><ul><li>分层镜像结构</li><li>写时复制（Copy-on-Write）</li><li>镜像复用机制</li></ul><h3 id="_1-3-容器化实践要点" tabindex="-1">1.3 容器化实践要点 <a class="header-anchor" href="#_1-3-容器化实践要点" aria-label="Permalink to &quot;1.3 容器化实践要点&quot;">​</a></h3><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Dockerfile最佳实践示例</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> alpine:3.18 </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> builder</span></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /app</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> package*.json ./</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> npm ci --only=production</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> alpine:3.18</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> addgroup -g 1001 -S nodejs &amp;&amp; \\</span></span>
<span class="line"><span class="__shiki_140thh">    adduser -S nodejs -u 1001</span></span>
<span class="line"><span class="__shiki_1itgoe">USER</span><span class="__shiki_140thh"> nodejs</span></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /app</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --chown=nodejs:nodejs . .</span></span>
<span class="line"><span class="__shiki_1itgoe">EXPOSE</span><span class="__shiki_140thh"> 3000</span></span>
<span class="line"><span class="__shiki_1itgoe">CMD</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;node&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;server.js&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><hr><h2 id="第二部分-容器编排技术" tabindex="-1">第二部分：容器编排技术 <a class="header-anchor" href="#第二部分-容器编排技术" aria-label="Permalink to &quot;第二部分：容器编排技术&quot;">​</a></h2><h3 id="_2-1-为什么需要容器编排" tabindex="-1">2.1 为什么需要容器编排？ <a class="header-anchor" href="#_2-1-为什么需要容器编排" aria-label="Permalink to &quot;2.1 为什么需要容器编排？&quot;">​</a></h3><p><strong>单容器问题</strong>：</p><ul><li>单点故障</li><li>扩缩容困难</li><li>服务发现复杂</li><li>网络管理繁琐</li><li>存储管理复杂</li></ul><h3 id="_2-2-kubernetes核心架构" tabindex="-1">2.2 Kubernetes核心架构 <a class="header-anchor" href="#_2-2-kubernetes核心架构" aria-label="Permalink to &quot;2.2 Kubernetes核心架构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">Kubernetes架构：</span></span>
<span class="line"><span class="__shiki_wvjl67">控制平面 (Control Plane)</span></span>
<span class="line"><span class="__shiki_wvjl67">├── API Server（所有操作入口）</span></span>
<span class="line"><span class="__shiki_wvjl67">├── etcd（集群状态存储）</span></span>
<span class="line"><span class="__shiki_wvjl67">├── Scheduler（Pod调度）</span></span>
<span class="line"><span class="__shiki_wvjl67">├── Controller Manager（控制器管理）</span></span>
<span class="line"><span class="__shiki_wvjl67">└── Cloud Controller Manager（云厂商扩展）</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">工作节点 (Worker Node)</span></span>
<span class="line"><span class="__shiki_wvjl67">├── Kubelet（节点代理）</span></span>
<span class="line"><span class="__shiki_wvjl67">├── Kube-proxy（网络代理）</span></span>
<span class="line"><span class="__shiki_wvjl67">├── Container Runtime（容器运行时）</span></span>
<span class="line"><span class="__shiki_wvjl67">└── Pod（最小调度单元）</span></span></code></pre></div><h3 id="_2-3-kubernetes核心概念" tabindex="-1">2.3 Kubernetes核心概念 <a class="header-anchor" href="#_2-3-kubernetes核心概念" aria-label="Permalink to &quot;2.3 Kubernetes核心概念&quot;">​</a></h3><h4 id="pod" tabindex="-1"><strong>Pod</strong> <a class="header-anchor" href="#pod" aria-label="Permalink to &quot;**Pod**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web-app</span></span>
<span class="line"><span class="__shiki_17hn0y">  labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web-container</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx:1.21</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">containerPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">sidecar</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">busybox</span></span>
<span class="line"><span class="__shiki_17hn0y">    command</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;sh&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;-c&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;while true; do echo logging; sleep 10; done&#39;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h4 id="controller-控制器" tabindex="-1"><strong>Controller（控制器）</strong> <a class="header-anchor" href="#controller-控制器" aria-label="Permalink to &quot;**Controller（控制器）**&quot;">​</a></h4><ol><li><strong>Deployment</strong> - 无状态应用</li><li><strong>StatefulSet</strong> - 有状态应用</li><li><strong>DaemonSet</strong> - 每个节点运行一个Pod</li><li><strong>Job/CronJob</strong> - 批处理任务</li></ol><h4 id="service-ingress" tabindex="-1"><strong>Service &amp; Ingress</strong> <a class="header-anchor" href="#service-ingress" aria-label="Permalink to &quot;**Service &amp; Ingress**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Service示例</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web-service</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web</span></span>
<span class="line"><span class="__shiki_17hn0y">  ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_17hn0y">    targetPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_17hn0y">  type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">LoadBalancer</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Ingress示例</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-ingress</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app.example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">    http</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      paths</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/</span></span>
<span class="line"><span class="__shiki_17hn0y">        pathType</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Prefix</span></span>
<span class="line"><span class="__shiki_17hn0y">        backend</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          service</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web-service</span></span>
<span class="line"><span class="__shiki_17hn0y">            port</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">              number</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span></code></pre></div><h4 id="configmap-secret" tabindex="-1"><strong>ConfigMap &amp; Secret</strong> <a class="header-anchor" href="#configmap-secret" aria-label="Permalink to &quot;**ConfigMap &amp; Secret**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># ConfigMap配置分离</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  log-level</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;info&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  max-connections</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 在Deployment中引用</span></span>
<span class="line"><span class="__shiki_17hn0y">env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">LOG_LEVEL</span></span>
<span class="line"><span class="__shiki_17hn0y">  valueFrom</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    configMapKeyRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config</span></span>
<span class="line"><span class="__shiki_17hn0y">      key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">log-level</span></span></code></pre></div><h4 id="persistentvolume-pv-persistentvolumeclaim-pvc" tabindex="-1"><strong>PersistentVolume(PV) &amp; PersistentVolumeClaim(PVC)</strong> <a class="header-anchor" href="#persistentvolume-pv-persistentvolumeclaim-pvc" aria-label="Permalink to &quot;**PersistentVolume(PV) &amp; PersistentVolumeClaim(PVC)**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 存储抽象层</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PersistentVolumeClaim</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">data-pvc</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  accessModes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">ReadWriteOnce</span></span>
<span class="line"><span class="__shiki_17hn0y">  resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10Gi</span></span></code></pre></div><h3 id="_2-4-kubernetes编排实践" tabindex="-1">2.4 Kubernetes编排实践 <a class="header-anchor" href="#_2-4-kubernetes编排实践" aria-label="Permalink to &quot;2.4 Kubernetes编排实践&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 常用命令</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> -A</span><span class="__shiki_21nrsd">                    # 查看所有命名空间Pod</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> pod</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_21nrsd">        # 查看Pod详情</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">containe</span><span class="__shiki_140thh">r</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_21nrsd"> # 查看容器日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> exec</span><span class="__shiki_dzsirb"> -it</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> --</span><span class="__shiki_mdbnqw"> sh</span><span class="__shiki_21nrsd">      # 进入容器</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> port-forward</span><span class="__shiki_mdbnqw"> svc/</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_mdbnqw">servic</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw"> 8080:80</span><span class="__shiki_21nrsd"> # 端口转发</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> deployment.yaml</span><span class="__shiki_21nrsd">       # 应用配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> rollout</span><span class="__shiki_mdbnqw"> status</span><span class="__shiki_mdbnqw"> deployment/web</span><span class="__shiki_21nrsd">  # 查看部署状态</span></span></code></pre></div><hr><h2 id="第三部分-helm包管理" tabindex="-1">第三部分：Helm包管理 <a class="header-anchor" href="#第三部分-helm包管理" aria-label="Permalink to &quot;第三部分：Helm包管理&quot;">​</a></h2><h3 id="_3-1-helm解决的问题" tabindex="-1">3.1 Helm解决的问题 <a class="header-anchor" href="#_3-1-helm解决的问题" aria-label="Permalink to &quot;3.1 Helm解决的问题&quot;">​</a></h3><p><strong>原生Kubernetes资源管理痛点</strong>：</p><ul><li>多环境配置管理复杂</li><li>资源文件分散、难以复用</li><li>版本控制困难</li><li>依赖管理缺失</li><li>部署过程缺少生命周期管理</li></ul><h3 id="_3-2-helm核心概念" tabindex="-1">3.2 Helm核心概念 <a class="header-anchor" href="#_3-2-helm核心概念" aria-label="Permalink to &quot;3.2 Helm核心概念&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">Helm架构：</span></span>
<span class="line"><span class="__shiki_wvjl67">├── Chart：软件包（包含所有K8s资源定义）</span></span>
<span class="line"><span class="__shiki_wvjl67">├── Release：Chart的运行实例</span></span>
<span class="line"><span class="__shiki_wvjl67">├── Repository：Chart仓库</span></span>
<span class="line"><span class="__shiki_wvjl67">└── Tiller（Helm 2） / 无Tiller（Helm 3）</span></span></code></pre></div><h4 id="helm-2-vs-helm-3-重大变化" tabindex="-1"><strong>Helm 2 vs Helm 3 重大变化</strong> <a class="header-anchor" href="#helm-2-vs-helm-3-重大变化" aria-label="Permalink to &quot;**Helm 2 vs Helm 3 重大变化**&quot;">​</a></h4><table tabindex="0"><thead><tr><th>特性</th><th>Helm 2</th><th>Helm 3</th></tr></thead><tbody><tr><td>架构</td><td>客户端/服务器（Tiller）</td><td>纯客户端</td></tr><tr><td>安全性</td><td>Tiller拥有集群权限</td><td>RBAC集成</td></tr><tr><td>发布管理</td><td>ConfigMaps中存储</td><td>Secrets中存储</td></tr><tr><td>升级策略</td><td>Three-way strategic merge</td><td>Three-way JSON patch merge</td></tr><tr><td>API版本</td><td>支持多种API版本</td><td>仅支持最新稳定API</td></tr></tbody></table><h3 id="_3-3-helm-chart结构详解" tabindex="-1">3.3 Helm Chart结构详解 <a class="header-anchor" href="#_3-3-helm-chart结构详解" aria-label="Permalink to &quot;3.3 Helm Chart结构详解&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">my-chart/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── Chart.yaml          # Chart元数据</span></span>
<span class="line"><span class="__shiki_wvjl67">├── values.yaml         # 默认配置值</span></span>
<span class="line"><span class="__shiki_wvjl67">├── charts/             # 依赖的subcharts</span></span>
<span class="line"><span class="__shiki_wvjl67">├── templates/          # 模板文件目录</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── deployment.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── service.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── ingress.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── _helpers.tpl    # 辅助模板</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── tests/          # 测试文件</span></span>
<span class="line"><span class="__shiki_wvjl67">└── README.md           # 说明文档</span></span></code></pre></div><h4 id="chart-yaml示例" tabindex="-1"><strong>Chart.yaml示例</strong> <a class="header-anchor" href="#chart-yaml示例" aria-label="Permalink to &quot;**Chart.yaml示例**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v2</span></span>
<span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">my-application</span></span>
<span class="line"><span class="__shiki_17hn0y">version</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1.2.3</span></span>
<span class="line"><span class="__shiki_17hn0y">appVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2.1.0&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">A Helm chart for My Application</span></span>
<span class="line"><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">application</span></span>
<span class="line"><span class="__shiki_17hn0y">keywords</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">web</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">application</span></span>
<span class="line"><span class="__shiki_17hn0y">home</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">https://example.com/myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">sources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">https://github.com/example/myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">maintainers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">John Doe</span></span>
<span class="line"><span class="__shiki_17hn0y">    email</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">john@example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">dependencies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis</span></span>
<span class="line"><span class="__shiki_17hn0y">    version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;~10.0.0&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    repository</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;https://charts.bitnami.com/bitnami&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    condition</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis.enabled</span></span></code></pre></div><h4 id="values-yaml示例" tabindex="-1"><strong>values.yaml示例</strong> <a class="header-anchor" href="#values-yaml示例" aria-label="Permalink to &quot;**values.yaml示例**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 默认值文件结构</span></span>
<span class="line"><span class="__shiki_17hn0y">replicaCount</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">image</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  repository</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx</span></span>
<span class="line"><span class="__shiki_17hn0y">  tag</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1.21.0&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  pullPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">IfNotPresent</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">service</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ClusterIP</span></span>
<span class="line"><span class="__shiki_17hn0y">  port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_17hn0y">  targetPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">ingress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">  className</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;nginx&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  hosts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">chart-example.local</span></span>
<span class="line"><span class="__shiki_17hn0y">      paths</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/</span></span>
<span class="line"><span class="__shiki_17hn0y">          pathType</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ImplementationSpecific</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;128Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;250m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;256Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;500m&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">autoscaling</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">  minReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">  maxReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_17hn0y">  targetCPUUtilizationPercentage</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_17hn0y">  targetMemoryUtilizationPercentage</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span></code></pre></div><h3 id="_3-4-helm模板引擎" tabindex="-1">3.4 Helm模板引擎 <a class="header-anchor" href="#_3-4-helm模板引擎" aria-label="Permalink to &quot;3.4 Helm模板引擎&quot;">​</a></h3><h4 id="模板语法基础" tabindex="-1"><strong>模板语法基础</strong> <a class="header-anchor" href="#模板语法基础" aria-label="Permalink to &quot;**模板语法基础**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># templates/deployment.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">include &quot;my-chart.fullname&quot; .</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_17hn0y">  labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    {{- </span><span class="__shiki_mdbnqw">include &quot;my-chart.labels&quot; . | nindent 4</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  replicas</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">.Values.replicaCount</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      {{- </span><span class="__shiki_mdbnqw">include &quot;my-chart.selectorLabels&quot; . | nindent 6</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        {{- </span><span class="__shiki_mdbnqw">include &quot;my-chart.labels&quot; . | nindent 8</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">        {{- </span><span class="__shiki_mdbnqw">with .Values.podLabels</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">        {{ </span><span class="__shiki_mdbnqw">toYaml . | nindent 8</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">        {{- </span><span class="__shiki_mdbnqw">end</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">.Chart.Name</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          imagePullPolicy</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">.Values.image.pullPolicy</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            - </span><span class="__shiki_17hn0y">containerPort</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">.Values.service.targetPort</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            {{- </span><span class="__shiki_mdbnqw">range $key</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">$value := .Values.env</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">            - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">$key</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_17hn0y">              value</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">$value | quote</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">            {{- </span><span class="__shiki_mdbnqw">end</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            {{- </span><span class="__shiki_mdbnqw">toYaml .Values.resources | nindent 12</span><span class="__shiki_140thh"> }}</span></span></code></pre></div><h4 id="模板函数和管道" tabindex="-1"><strong>模板函数和管道</strong> <a class="header-anchor" href="#模板函数和管道" aria-label="Permalink to &quot;**模板函数和管道**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 常用函数示例</span></span>
<span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">.Values.name | upper | trunc 20</span><span class="__shiki_140thh"> }}           </span><span class="__shiki_21nrsd"># 大写并截断</span></span>
<span class="line"><span class="__shiki_17hn0y">port</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">.Values.port | default &quot;8080&quot; | int</span><span class="__shiki_140thh"> }}       </span><span class="__shiki_21nrsd"># 默认值并转整数</span></span>
<span class="line"><span class="__shiki_17hn0y">config</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">.Values.config | toYaml | indent 2</span><span class="__shiki_140thh"> }}      </span><span class="__shiki_21nrsd"># 转YAML并缩进</span></span>
<span class="line"><span class="__shiki_17hn0y">time</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">now | date &quot;2006-01-02&quot;</span><span class="__shiki_140thh"> }}                   </span><span class="__shiki_21nrsd"># 日期格式化</span></span>
<span class="line"><span class="__shiki_17hn0y">secret</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">randAlphaNum 16 | b64enc</span><span class="__shiki_140thh"> }}                </span><span class="__shiki_21nrsd"># 生成随机密钥</span></span></code></pre></div><h4 id="控制流语句" tabindex="-1"><strong>控制流语句</strong> <a class="header-anchor" href="#控制流语句" aria-label="Permalink to &quot;**控制流语句**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">if .Values.ingress.enabled -</span><span class="__shiki_140thh">}}</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">include &quot;my-chart.fullname&quot; .</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  {{- </span><span class="__shiki_mdbnqw">if .Values.ingress.className</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_17hn0y">  ingressClassName</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">.Values.ingress.className</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">  {{- </span><span class="__shiki_mdbnqw">end</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">end</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">range .Values.servers</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">.name</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_17hn0y">  port</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">.port</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">end</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">with .Values.nodeSelector</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_17hn0y">nodeSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  {{- </span><span class="__shiki_mdbnqw">toYaml . | nindent 2</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">end</span><span class="__shiki_140thh"> }}</span></span></code></pre></div><h4 id="命名模板-helpers-tpl" tabindex="-1"><strong>命名模板 (_helpers.tpl)</strong> <a class="header-anchor" href="#命名模板-helpers-tpl" aria-label="Permalink to &quot;**命名模板 (_helpers.tpl)**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{{</span><span class="__shiki_mdbnqw">/*</span></span>
<span class="line"><span class="__shiki_mdbnqw">生成全名</span></span>
<span class="line"><span class="__shiki_140thh">*</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_140thh">}}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">define &quot;my-chart.fullname&quot; -</span><span class="__shiki_140thh">}}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">if .Values.fullnameOverride</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">.Values.fullnameOverride | trunc 63 | trimSuffix &quot;-&quot;</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">else</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">$name := default .Chart.Name .Values.nameOverride</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">if contains $name .Release.Name</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">.Release.Name | trunc 63 | trimSuffix &quot;-&quot;</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">else</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">printf &quot;%s-%s&quot; .Release.Name $name | trunc 63 | trimSuffix &quot;-&quot;</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">end</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">end</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">end</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">{{</span><span class="__shiki_mdbnqw">/*</span></span>
<span class="line"><span class="__shiki_mdbnqw">通用标签</span></span>
<span class="line"><span class="__shiki_140thh">*</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_140thh">}}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">define &quot;my-chart.labels&quot; -</span><span class="__shiki_140thh">}}</span></span>
<span class="line"><span class="__shiki_17hn0y">helm.sh/chart</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">include &quot;my-chart.chart&quot; .</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{ </span><span class="__shiki_mdbnqw">include &quot;my-chart.selectorLabels&quot; .</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">if .Chart.AppVersion</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_17hn0y">app.kubernetes.io/version</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">.Chart.AppVersion | quote</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">end</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_17hn0y">app.kubernetes.io/managed-by</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">.Release.Service</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">end</span><span class="__shiki_140thh"> }}</span></span></code></pre></div><h3 id="_3-5-helm依赖管理" tabindex="-1">3.5 Helm依赖管理 <a class="header-anchor" href="#_3-5-helm依赖管理" aria-label="Permalink to &quot;3.5 Helm依赖管理&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Chart.yaml中的依赖定义</span></span>
<span class="line"><span class="__shiki_17hn0y">dependencies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">postgresql</span></span>
<span class="line"><span class="__shiki_17hn0y">    version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;11.x.x&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    repository</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;https://charts.bitnami.com/bitnami&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    condition</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">postgresql.enabled</span></span>
<span class="line"><span class="__shiki_17hn0y">    tags</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">database</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis</span></span>
<span class="line"><span class="__shiki_17hn0y">    version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;16.x.x&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    repository</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;https://charts.bitnami.com/bitnami&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    condition</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis.enabled</span></span>
<span class="line"><span class="__shiki_17hn0y">    tags</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">cache</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 管理依赖命令</span></span>
<span class="line"><span class="__shiki_mdbnqw">helm dependency update</span><span class="__shiki_21nrsd">    # 更新依赖</span></span>
<span class="line"><span class="__shiki_mdbnqw">helm dependency build</span><span class="__shiki_21nrsd">     # 构建依赖</span></span>
<span class="line"><span class="__shiki_mdbnqw">helm dependency list</span><span class="__shiki_21nrsd">      # 列出依赖</span></span></code></pre></div><h3 id="_3-6-helm实战操作" tabindex="-1">3.6 Helm实战操作 <a class="header-anchor" href="#_3-6-helm实战操作" aria-label="Permalink to &quot;3.6 Helm实战操作&quot;">​</a></h3><h4 id="基础命令" tabindex="-1"><strong>基础命令</strong> <a class="header-anchor" href="#基础命令" aria-label="Permalink to &quot;**基础命令**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 仓库操作</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> repo</span><span class="__shiki_mdbnqw"> add</span><span class="__shiki_mdbnqw"> bitnami</span><span class="__shiki_mdbnqw"> https://charts.bitnami.com/bitnami</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> repo</span><span class="__shiki_mdbnqw"> update</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> repo</span><span class="__shiki_mdbnqw"> list</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Chart操作</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> search</span><span class="__shiki_mdbnqw"> repo</span><span class="__shiki_mdbnqw"> nginx</span><span class="__shiki_21nrsd">                    # 搜索Chart</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> show</span><span class="__shiki_mdbnqw"> values</span><span class="__shiki_mdbnqw"> bitnami/nginx</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> values.yaml</span><span class="__shiki_21nrsd">  # 导出默认值</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> my-nginx</span><span class="__shiki_mdbnqw"> bitnami/nginx</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> values.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> upgrade</span><span class="__shiki_mdbnqw"> my-nginx</span><span class="__shiki_mdbnqw"> bitnami/nginx</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> values.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> rollback</span><span class="__shiki_mdbnqw"> my-nginx</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_21nrsd">                  # 回滚到版本1</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> uninstall</span><span class="__shiki_mdbnqw"> my-nginx</span><span class="__shiki_21nrsd">                   # 卸载（Helm 3）</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> list</span><span class="__shiki_dzsirb"> -A</span><span class="__shiki_21nrsd">                              # 列出所有发布</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 本地开发</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_mdbnqw"> mychart</span><span class="__shiki_21nrsd">                       # 创建新Chart</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> lint</span><span class="__shiki_mdbnqw"> mychart</span><span class="__shiki_21nrsd">                         # 语法检查</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> template</span><span class="__shiki_mdbnqw"> mychart</span><span class="__shiki_dzsirb"> --debug</span><span class="__shiki_21nrsd">             # 渲染模板预览</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> package</span><span class="__shiki_mdbnqw"> mychart</span><span class="__shiki_21nrsd">                      # 打包Chart</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> myrelease</span><span class="__shiki_mdbnqw"> ./mychart</span><span class="__shiki_dzsirb"> --dry-run</span><span class="__shiki_21nrsd">  # 干跑测试</span></span></code></pre></div><h4 id="多环境部署策略" tabindex="-1"><strong>多环境部署策略</strong> <a class="header-anchor" href="#多环境部署策略" aria-label="Permalink to &quot;**多环境部署策略**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 开发环境</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> myapp</span><span class="__shiki_mdbnqw"> ./chart</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> values.yaml</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> env/dev.yaml</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> dev</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 生产环境</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> upgrade</span><span class="__shiki_mdbnqw"> myapp</span><span class="__shiki_mdbnqw"> ./chart</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> values.yaml</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> env/prod.yaml</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> prod</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用--set覆盖特定值</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> upgrade</span><span class="__shiki_mdbnqw"> myapp</span><span class="__shiki_mdbnqw"> ./chart</span><span class="__shiki_dzsirb"> --set</span><span class="__shiki_mdbnqw"> replicaCount=</span><span class="__shiki_dzsirb">5</span><span class="__shiki_dzsirb"> --set</span><span class="__shiki_mdbnqw"> image.tag=v2.0.0</span></span></code></pre></div><h4 id="chart测试" tabindex="-1"><strong>Chart测试</strong> <a class="header-anchor" href="#chart测试" aria-label="Permalink to &quot;**Chart测试**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># templates/tests/test-connection.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{ include &quot;my-chart.fullname&quot; . }}-test-connection&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    {{- </span><span class="__shiki_mdbnqw">include &quot;my-chart.labels&quot; . | nindent 4</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;helm.sh/hook&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test-success</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">wget</span></span>
<span class="line"><span class="__shiki_17hn0y">      image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">busybox</span></span>
<span class="line"><span class="__shiki_17hn0y">      command</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;wget&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">      args</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;{{ include &quot;my-chart.fullname&quot; . }}:{{ .Values.service.port }}&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  restartPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Never</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 运行测试</span></span>
<span class="line"><span class="__shiki_mdbnqw">helm test &lt;RELEASE_NAME&gt;</span></span></code></pre></div><h3 id="_3-7-helm高级特性" tabindex="-1">3.7 Helm高级特性 <a class="header-anchor" href="#_3-7-helm高级特性" aria-label="Permalink to &quot;3.7 Helm高级特性&quot;">​</a></h3><h4 id="hooks-生命周期管理" tabindex="-1"><strong>Hooks（生命周期管理）</strong> <a class="header-anchor" href="#hooks-生命周期管理" aria-label="Permalink to &quot;**Hooks（生命周期管理）**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 预安装Job</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">batch/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Job</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">.Release.Name</span><span class="__shiki_140thh"> }}</span><span class="__shiki_mdbnqw">-init-db</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;helm.sh/hook&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">pre-install,pre-upgrade</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;helm.sh/hook-weight&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;0&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;helm.sh/hook-delete-policy&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">before-hook-creation</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">init</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">busybox</span></span>
<span class="line"><span class="__shiki_17hn0y">        command</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;sh&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;-c&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;echo Initializing database...&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">      restartPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Never</span></span></code></pre></div><h4 id="chart库和oci注册表" tabindex="-1"><strong>Chart库和OCI注册表</strong> <a class="header-anchor" href="#chart库和oci注册表" aria-label="Permalink to &quot;**Chart库和OCI注册表**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用OCI注册表（Helm 3.8+）</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> registry</span><span class="__shiki_mdbnqw"> login</span><span class="__shiki_mdbnqw"> registry.example.com</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> chart</span><span class="__shiki_mdbnqw"> save</span><span class="__shiki_mdbnqw"> mychart/</span><span class="__shiki_mdbnqw"> registry.example.com/mychart:1.0.0</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> chart</span><span class="__shiki_mdbnqw"> push</span><span class="__shiki_mdbnqw"> registry.example.com/mychart:1.0.0</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> pull</span><span class="__shiki_mdbnqw"> oci://registry.example.com/mychart</span><span class="__shiki_dzsirb"> --version</span><span class="__shiki_dzsirb"> 1.0.0</span></span></code></pre></div><h4 id="library-chart-库chart" tabindex="-1"><strong>Library Chart（库Chart）</strong> <a class="header-anchor" href="#library-chart-库chart" aria-label="Permalink to &quot;**Library Chart（库Chart）**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Chart.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v2</span></span>
<span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">common-library</span></span>
<span class="line"><span class="__shiki_17hn0y">version</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1.0.0</span></span>
<span class="line"><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">library</span><span class="__shiki_21nrsd">  # 关键：声明为库Chart</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># _helpers.tpl中定义通用模板</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">define &quot;common-library.deployment&quot; -</span><span class="__shiki_140thh">}}</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">.name</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  replicas</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">.replicas</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">.container.name</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">.container.image</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">end -</span><span class="__shiki_140thh">}}</span></span></code></pre></div><h3 id="_3-8-helm最佳实践" tabindex="-1">3.8 Helm最佳实践 <a class="header-anchor" href="#_3-8-helm最佳实践" aria-label="Permalink to &quot;3.8 Helm最佳实践&quot;">​</a></h3><h4 id="_1-版本管理策略" tabindex="-1"><strong>1. 版本管理策略</strong> <a class="header-anchor" href="#_1-版本管理策略" aria-label="Permalink to &quot;**1. 版本管理策略**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Chart.yaml版本遵循SemVer</span></span>
<span class="line"><span class="__shiki_17hn0y">version</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1.2.3</span><span class="__shiki_21nrsd">  # MAJOR.MINOR.PATCH</span></span>
<span class="line"><span class="__shiki_21nrsd"># MAJOR: 不兼容的API变更</span></span>
<span class="line"><span class="__shiki_21nrsd"># MINOR: 向后兼容的功能性新增</span></span>
<span class="line"><span class="__shiki_21nrsd"># PATCH: 向后兼容的问题修复</span></span></code></pre></div><h4 id="_2-值文件组织" tabindex="-1"><strong>2. 值文件组织</strong> <a class="header-anchor" href="#_2-值文件组织" aria-label="Permalink to &quot;**2. 值文件组织**&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">chart/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── values.yaml          # 默认值</span></span>
<span class="line"><span class="__shiki_wvjl67">├── values-dev.yaml      # 开发环境</span></span>
<span class="line"><span class="__shiki_wvjl67">├── values-staging.yaml  # 预发布环境</span></span>
<span class="line"><span class="__shiki_wvjl67">├── values-prod.yaml     # 生产环境</span></span>
<span class="line"><span class="__shiki_wvjl67">└── secrets/             # 加密值文件（使用secrets-manager）</span></span></code></pre></div><h4 id="_3-模板设计原则" tabindex="-1"><strong>3. 模板设计原则</strong> <a class="header-anchor" href="#_3-模板设计原则" aria-label="Permalink to &quot;**3. 模板设计原则**&quot;">​</a></h4><ul><li>保持模板DRY（Don&#39;t Repeat Yourself）</li><li>使用命名模板复用代码</li><li>模板中避免复杂逻辑</li><li>提供合理的默认值</li></ul><h4 id="_4-安全最佳实践" tabindex="-1"><strong>4. 安全最佳实践</strong> <a class="header-anchor" href="#_4-安全最佳实践" aria-label="Permalink to &quot;**4. 安全最佳实践**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用secrets管理敏感信息</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> myapp</span><span class="__shiki_mdbnqw"> .</span><span class="__shiki_dzsirb"> --set</span><span class="__shiki_mdbnqw"> database.password=</span><span class="__shiki_140thh">$DB_PASSWORD</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用外部secret存储</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> myapp</span><span class="__shiki_mdbnqw"> .</span><span class="__shiki_dzsirb"> --set-file</span><span class="__shiki_mdbnqw"> ssl.certificate=./cert.pem</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 定期更新依赖</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> dependency</span><span class="__shiki_mdbnqw"> update</span></span></code></pre></div><h3 id="_3-9-企业级helm工作流" tabindex="-1">3.9 企业级Helm工作流 <a class="header-anchor" href="#_3-9-企业级helm工作流" aria-label="Permalink to &quot;3.9 企业级Helm工作流&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">开发流程：</span></span>
<span class="line"><span class="__shiki_wvjl67">1. 开发Chart → 2. CI验证 → 3. 测试环境部署 → 4. 生产发布</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">工具集成：</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 版本控制：Git（Chart版本化）</span></span>
<span class="line"><span class="__shiki_wvjl67">├── CI/CD：Jenkins/GitLab CI/ArgoCD</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 安全扫描：Trivy/Checkov</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 策略检查：OPA/Gatekeeper</span></span>
<span class="line"><span class="__shiki_wvjl67">└── 制品仓库：Harbor/Artifactory</span></span></code></pre></div><hr><h2 id="第四部分-实战案例-部署完整应用栈" tabindex="-1">第四部分：实战案例 - 部署完整应用栈 <a class="header-anchor" href="#第四部分-实战案例-部署完整应用栈" aria-label="Permalink to &quot;第四部分：实战案例 - 部署完整应用栈&quot;">​</a></h2><h3 id="_4-1-微服务应用chart示例" tabindex="-1">4.1 微服务应用Chart示例 <a class="header-anchor" href="#_4-1-微服务应用chart示例" aria-label="Permalink to &quot;4.1 微服务应用Chart示例&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">webapp-chart/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── Chart.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">├── values.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">├── charts/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── templates/</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── _helpers.tpl</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── frontend-deployment.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── frontend-service.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── backend-deployment.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── backend-service.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── db-statefulset.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── db-pvc.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── ingress.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── hpa.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">└── README.md</span></span></code></pre></div><h3 id="_4-2-ci-cd流水线集成" tabindex="-1">4.2 CI/CD流水线集成 <a class="header-anchor" href="#_4-2-ci-cd流水线集成" aria-label="Permalink to &quot;4.2 CI/CD流水线集成&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># .gitlab-ci.yml示例</span></span>
<span class="line"><span class="__shiki_17hn0y">stages</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">lint</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">test</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">package</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">deploy</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">lint-chart</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">lint</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">helm lint ./chart</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">helm template ./chart --debug</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">package-chart</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">package</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">helm package ./chart --version \${CI_COMMIT_TAG}</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">helm push webapp-\${CI_COMMIT_TAG}.tgz oci://\${REGISTRY}/charts</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">deploy-dev</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deploy</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">helm upgrade --install webapp-dev ./chart -f values-dev.yaml -n dev</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">deploy-prod</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deploy</span></span>
<span class="line"><span class="__shiki_17hn0y">  when</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">manual</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">helm upgrade --install webapp-prod ./chart -f values-prod.yaml -n prod</span></span></code></pre></div><hr><h2 id="第五部分-常见问题与调试" tabindex="-1">第五部分：常见问题与调试 <a class="header-anchor" href="#第五部分-常见问题与调试" aria-label="Permalink to &quot;第五部分：常见问题与调试&quot;">​</a></h2><h3 id="_5-1-常见错误排查" tabindex="-1">5.1 常见错误排查 <a class="header-anchor" href="#_5-1-常见错误排查" aria-label="Permalink to &quot;5.1 常见错误排查&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 模板渲染错误</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> template</span><span class="__shiki_mdbnqw"> ./mychart</span><span class="__shiki_dzsirb"> --debug</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 安装失败</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> myapp</span><span class="__shiki_mdbnqw"> ./chart</span><span class="__shiki_dzsirb"> --dry-run</span><span class="__shiki_dzsirb"> --debug</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> pod</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 升级失败</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> rollback</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">releas</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">revisio</span><span class="__shiki_140thh">n</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> manifest</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">releas</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_21nrsd">  # 查看实际部署的资源</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 依赖问题</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> dependency</span><span class="__shiki_mdbnqw"> update</span></span>
<span class="line"><span class="__shiki_1t8gfj">rm</span><span class="__shiki_dzsirb"> -rf</span><span class="__shiki_mdbnqw"> charts/</span><span class="__shiki_dzsirb">*</span><span class="__shiki_mdbnqw">.tgz</span></span></code></pre></div><h3 id="_5-2-性能优化建议" tabindex="-1">5.2 性能优化建议 <a class="header-anchor" href="#_5-2-性能优化建议" aria-label="Permalink to &quot;5.2 性能优化建议&quot;">​</a></h3><ol><li><strong>减少模板复杂度</strong>：避免嵌套循环</li><li><strong>使用命名模板复用</strong>：减少重复代码</li><li><strong>合理使用Values</strong>：避免过度参数化</li><li><strong>Chart拆分策略</strong>：核心应用与依赖分离</li><li><strong>缓存策略</strong>：使用稳定的镜像标签</li></ol><hr><h2 id="第六部分-生态系统与工具" tabindex="-1">第六部分：生态系统与工具 <a class="header-anchor" href="#第六部分-生态系统与工具" aria-label="Permalink to &quot;第六部分：生态系统与工具&quot;">​</a></h2><h3 id="_6-1-相关工具" tabindex="-1">6.1 相关工具 <a class="header-anchor" href="#_6-1-相关工具" aria-label="Permalink to &quot;6.1 相关工具&quot;">​</a></h3><table tabindex="0"><thead><tr><th>工具</th><th>用途</th><th>备注</th></tr></thead><tbody><tr><td><strong>Helm Dashboard</strong></td><td>GUI管理界面</td><td>可视化操作</td></tr><tr><td><strong>Helm Diff</strong></td><td>发布差异对比</td><td>升级前预览变化</td></tr><tr><td><strong>Helm Secrets</strong></td><td>值文件加密</td><td>管理敏感配置</td></tr><tr><td><strong>Helmfile</strong></td><td>多Chart部署</td><td>声明式批量部署</td></tr><tr><td><strong>Kustomize</strong></td><td>原生K8s配置管理</td><td>Helm替代方案</td></tr><tr><td><strong>Carvel</strong></td><td>VMware的包管理工具</td><td>另一套解决方案</td></tr></tbody></table><h3 id="_6-2-未来趋势" tabindex="-1">6.2 未来趋势 <a class="header-anchor" href="#_6-2-未来趋势" aria-label="Permalink to &quot;6.2 未来趋势&quot;">​</a></h3><ol><li><strong>GitOps集成</strong>：Helm + ArgoCD/Flux</li><li><strong>策略即代码</strong>：OPA/Gatekeeper策略集成</li><li><strong>安全增强</strong>：供应链安全、签名验证</li><li><strong>多云支持</strong>：跨集群Chart部署</li><li><strong>Serverless集成</strong>：Knative/KEDA支持</li></ol><hr><h2 id="总结对比表" tabindex="-1">总结对比表 <a class="header-anchor" href="#总结对比表" aria-label="Permalink to &quot;总结对比表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>技术层</th><th>解决问题</th><th>核心组件</th><th>关键命令</th></tr></thead><tbody><tr><td><strong>容器化</strong></td><td>环境一致性、资源隔离</td><td>Docker Engine, Image, Container</td><td><code>docker build</code>, <code>docker run</code></td></tr><tr><td><strong>容器编排</strong></td><td>大规模容器调度管理</td><td>Pod, Deployment, Service, Ingress</td><td><code>kubectl apply</code>, <code>kubectl get</code></td></tr><tr><td><strong>包管理</strong></td><td>应用打包、分发、版本管理</td><td>Chart, Release, Repository</td><td><code>helm install</code>, <code>helm upgrade</code></td></tr></tbody></table><hr><h2 id="学习路径建议" tabindex="-1">学习路径建议 <a class="header-anchor" href="#学习路径建议" aria-label="Permalink to &quot;学习路径建议&quot;">​</a></h2><ol><li><p><strong>初级阶段</strong>（1-2周）</p><ul><li>Docker基础命令和Dockerfile编写</li><li>Kubernetes核心资源对象操作</li><li>Helm基础安装和简单Chart使用</li></ul></li><li><p><strong>中级阶段</strong>（2-4周）</p><ul><li>Kubernetes网络、存储、安全进阶</li><li>编写复杂Helm Chart</li><li>多环境配置管理</li><li>CI/CD集成</li></ul></li><li><p><strong>高级阶段</strong>（4周+）</p><ul><li>Helm插件开发</li><li>企业级Chart库建设</li><li>安全加固和合规检查</li><li>多集群管理策略</li></ul></li><li><p><strong>实战项目</strong></p><ul><li>设计并部署完整的微服务应用</li><li>实现蓝绿部署/金丝雀发布</li><li>搭建私有Helm仓库</li><li>设计Chart自动化测试流水线</li></ul></li></ol><hr><p><strong>学习资源推荐</strong>：</p><ul><li>官方文档：docs.docker.com, kubernetes.io/docs, helm.sh/docs</li><li>实践平台：Katacoda, Play with Kubernetes, Kind集群</li><li>书籍：《Kubernetes权威指南》、《Helm实战》</li><li>社区：Kubernetes Slack频道、CNCF项目</li></ul><p>通过系统学习上述内容，您将能够熟练掌握从容器化到编排再到包管理的完整技术栈，具备在企业环境中设计、部署和管理云原生应用的能力。</p>`,115)])])}const o=a(_,[["render",l]]);export{r as __pageData,o as default};
