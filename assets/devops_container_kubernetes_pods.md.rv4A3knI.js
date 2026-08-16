import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"Kubernetes Pod生命周期管理 - 详细学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"devops/container/kubernetes/pods.md","filePath":"devops/container/kubernetes/pods.md"}'),_={name:"devops/container/kubernetes/pods.md"};function l(h,s,c,e,t,k){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="kubernetes-pod生命周期管理-详细学习笔记" tabindex="-1">Kubernetes Pod生命周期管理 - 详细学习笔记 <a class="header-anchor" href="#kubernetes-pod生命周期管理-详细学习笔记" aria-label="Permalink to &quot;Kubernetes Pod生命周期管理 - 详细学习笔记&quot;">​</a></h1><h2 id="一、pod基础概念" tabindex="-1">一、Pod基础概念 <a class="header-anchor" href="#一、pod基础概念" aria-label="Permalink to &quot;一、Pod基础概念&quot;">​</a></h2><h3 id="_1-1-pod定义" tabindex="-1">1.1 Pod定义 <a class="header-anchor" href="#_1-1-pod定义" aria-label="Permalink to &quot;1.1 Pod定义&quot;">​</a></h3><p><strong>Pod</strong>是Kubernetes中最小的可部署和管理单元，包含一个或多个紧密关联的容器，共享：</p><ul><li>网络命名空间（同一IP地址和端口空间）</li><li>存储卷（Volumes）</li><li>运行环境（节点资源限制）</li></ul><h3 id="_1-2-pod设计理念" tabindex="-1">1.2 Pod设计理念 <a class="header-anchor" href="#_1-2-pod设计理念" aria-label="Permalink to &quot;1.2 Pod设计理念&quot;">​</a></h3><ul><li><strong>原子调度单位</strong>：Pod内的容器总是被共同调度</li><li><strong>共享上下文</strong>：通过localhost通信，共享存储</li><li><strong>生命周期一致性</strong>：Pod内容器同时启动、终止</li></ul><h2 id="二、pod生命周期总览" tabindex="-1">二、Pod生命周期总览 <a class="header-anchor" href="#二、pod生命周期总览" aria-label="Permalink to &quot;二、Pod生命周期总览&quot;">​</a></h2><h3 id="_2-1-pod阶段-phase" tabindex="-1">2.1 Pod阶段（Phase） <a class="header-anchor" href="#_2-1-pod阶段-phase" aria-label="Permalink to &quot;2.1 Pod阶段（Phase）&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">Pending → Running → Succeeded/Failed</span></span>
<span class="line"><span class="__shiki_wvjl67">         ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">     Unknown</span></span></code></pre></div><p><strong>详细状态说明：</strong></p><ul><li><strong>Pending</strong>：Pod已被系统接受，但一个或多个容器镜像尚未创建</li><li><strong>Running</strong>：Pod已绑定到节点，所有容器已创建</li><li><strong>Succeeded</strong>：Pod中所有容器成功终止且不会重启</li><li><strong>Failed</strong>：Pod中所有容器已终止，至少一个容器失败终止</li><li><strong>Unknown</strong>：无法获取Pod状态（通常由于节点通信故障）</li></ul><h3 id="_2-2-pod状态流程图" tabindex="-1">2.2 Pod状态流程图 <a class="header-anchor" href="#_2-2-pod状态流程图" aria-label="Permalink to &quot;2.2 Pod状态流程图&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[Pod创建] --&gt; B(Pending)</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C{镜像拉取&lt;br&gt;调度决策}</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt;|成功| D(Running)</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt;|失败| E(Failed)</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; F{容器执行}</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt;|正常退出| G(Succeeded)</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt;|异常退出| H{重启策略}</span></span>
<span class="line"><span class="__shiki_140thh">    H --&gt;|Always| D</span></span>
<span class="line"><span class="__shiki_140thh">    H --&gt;|OnFailure| I{退出码=0?}</span></span>
<span class="line"><span class="__shiki_140thh">    I --&gt;|是| G</span></span>
<span class="line"><span class="__shiki_140thh">    I --&gt;|否| D</span></span>
<span class="line"><span class="__shiki_140thh">    H --&gt;|Never| E</span></span></code></pre></div><h2 id="三、pod生命周期详解" tabindex="-1">三、Pod生命周期详解 <a class="header-anchor" href="#三、pod生命周期详解" aria-label="Permalink to &quot;三、Pod生命周期详解&quot;">​</a></h2><h3 id="_3-1-创建与调度阶段" tabindex="-1">3.1 创建与调度阶段 <a class="header-anchor" href="#_3-1-创建与调度阶段" aria-label="Permalink to &quot;3.1 创建与调度阶段&quot;">​</a></h3><h4 id="_3-1-1-调度流程" tabindex="-1">3.1.1 调度流程 <a class="header-anchor" href="#_3-1-1-调度流程" aria-label="Permalink to &quot;3.1.1 调度流程&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Pod调度示例</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">lifecycle-demo</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 调度约束</span></span>
<span class="line"><span class="__shiki_17hn0y">  nodeSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    disktype</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ssd</span></span>
<span class="line"><span class="__shiki_17hn0y">  affinity</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    nodeAffinity</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      requiredDuringSchedulingIgnoredDuringExecution</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        nodeSelectorTerms</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">matchExpressions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kubernetes.io/os</span></span>
<span class="line"><span class="__shiki_17hn0y">            operator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">In</span></span>
<span class="line"><span class="__shiki_17hn0y">            values</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            - </span><span class="__shiki_mdbnqw">linux</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 优先级</span></span>
<span class="line"><span class="__shiki_17hn0y">  priorityClassName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">high-priority</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">main-container</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx:1.19</span></span></code></pre></div><p><strong>调度关键步骤：</strong></p><ol><li><strong>准入控制</strong>：验证资源请求、权限等</li><li><strong>预选（Predicate）</strong>：过滤不满足条件的节点</li><li><strong>优选（Priority）</strong>：为可用节点打分</li><li><strong>绑定（Binding）</strong>：将Pod绑定到选定节点</li></ol><h3 id="_3-2-初始化阶段" tabindex="-1">3.2 初始化阶段 <a class="header-anchor" href="#_3-2-初始化阶段" aria-label="Permalink to &quot;3.2 初始化阶段&quot;">​</a></h3><h4 id="_3-2-1-init-containers" tabindex="-1">3.2.1 Init Containers <a class="header-anchor" href="#_3-2-1-init-containers" aria-label="Permalink to &quot;3.2.1 Init Containers&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">init-demo</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  initContainers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">init-myservice</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">busybox:1.28</span></span>
<span class="line"><span class="__shiki_17hn0y">    command</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;sh&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;-c&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;until nslookup myservice; do echo waiting for myservice; sleep 2; done&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">init-mydb</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">busybox:1.28</span></span>
<span class="line"><span class="__shiki_17hn0y">    command</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;sh&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;-c&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;until nslookup mydb; do echo waiting for mydb; sleep 2; done&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">main-app</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp:1.0</span></span></code></pre></div><p><strong>Init Containers特性：</strong></p><ul><li><strong>顺序执行</strong>：按定义顺序串行执行</li><li><strong>运行完成要求</strong>：必须成功退出（exit 0）</li><li><strong>重新启动策略</strong>：失败时会根据Pod的restartPolicy重启</li><li><strong>资源隔离</strong>：单独指定资源限制</li><li><strong>访问权限</strong>：可以访问Secrets和ConfigMaps</li></ul><h4 id="_3-2-2-初始化流程" tabindex="-1">3.2.2 初始化流程 <a class="header-anchor" href="#_3-2-2-初始化流程" aria-label="Permalink to &quot;3.2.2 初始化流程&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">初始化开始</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">Init Container 1 运行 → 失败 → 根据restartPolicy处理</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓ 成功</span></span>
<span class="line"><span class="__shiki_wvjl67">Init Container 2 运行</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓ 成功</span></span>
<span class="line"><span class="__shiki_wvjl67">    ...</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">所有Init Containers完成</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">Main Containers启动</span></span></code></pre></div><h3 id="_3-3-主容器运行阶段" tabindex="-1">3.3 主容器运行阶段 <a class="header-anchor" href="#_3-3-主容器运行阶段" aria-label="Permalink to &quot;3.3 主容器运行阶段&quot;">​</a></h3><h4 id="_3-3-1-容器启动钩子-poststart" tabindex="-1">3.3.1 容器启动钩子（PostStart） <a class="header-anchor" href="#_3-3-1-容器启动钩子-poststart" aria-label="Permalink to &quot;3.3.1 容器启动钩子（PostStart）&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">lifecycle-demo</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">main-container</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx:1.19</span></span>
<span class="line"><span class="__shiki_17hn0y">    lifecycle</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      postStart</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        exec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          command</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;/bin/sh&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;-c&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;echo &#39;Container started at $(date)&#39; &gt; /usr/share/nginx/html/start.txt&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><p><strong>PostStart特性：</strong></p><ul><li>在容器创建后立即执行</li><li>与主进程并发运行</li><li>执行失败会导致容器终止</li></ul><h4 id="_3-3-2-容器终止钩子-prestop" tabindex="-1">3.3.2 容器终止钩子（PreStop） <a class="header-anchor" href="#_3-3-2-容器终止钩子-prestop" aria-label="Permalink to &quot;3.3.2 容器终止钩子（PreStop）&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">lifecycle</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  preStop</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 方式1: Exec命令</span></span>
<span class="line"><span class="__shiki_17hn0y">    exec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      command</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;/bin/sh&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;-c&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;nginx -s quit; while pidof nginx; do sleep 1; done&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 方式2: HTTP请求</span></span>
<span class="line"><span class="__shiki_17hn0y">    httpGet</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/graceful-shutdown</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_17hn0y">      scheme</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HTTP</span></span></code></pre></div><p><strong>PreStop特性：</strong></p><ul><li>在容器终止前调用</li><li>阻塞式执行，必须完成后才发送SIGTERM</li><li>默认30秒超时，可通过<code>terminationGracePeriodSeconds</code>调整</li></ul><h3 id="_3-4-容器终止流程" tabindex="-1">3.4 容器终止流程 <a class="header-anchor" href="#_3-4-容器终止流程" aria-label="Permalink to &quot;3.4 容器终止流程&quot;">​</a></h3><h4 id="_3-4-1-终止信号序列" tabindex="-1">3.4.1 终止信号序列 <a class="header-anchor" href="#_3-4-1-终止信号序列" aria-label="Permalink to &quot;3.4.1 终止信号序列&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">1. 用户/系统发起删除</span></span>
<span class="line"><span class="__shiki_wvjl67">2. Pod状态变为&quot;Terminating&quot;</span></span>
<span class="line"><span class="__shiki_wvjl67">3. 执行PreStop钩子（最长30秒）</span></span>
<span class="line"><span class="__shiki_wvjl67">4. 发送SIGTERM信号</span></span>
<span class="line"><span class="__shiki_wvjl67">5. 等待terminationGracePeriodSeconds（默认30秒）</span></span>
<span class="line"><span class="__shiki_wvjl67">6. 发送SIGKILL信号强制终止</span></span></code></pre></div><h4 id="_3-4-2-优雅终止配置" tabindex="-1">3.4.2 优雅终止配置 <a class="header-anchor" href="#_3-4-2-优雅终止配置" aria-label="Permalink to &quot;3.4.2 优雅终止配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">graceful-shutdown</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  terminationGracePeriodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span><span class="__shiki_21nrsd">  # 默认30秒</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">main</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx</span></span>
<span class="line"><span class="__shiki_17hn0y">    lifecycle</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      preStop</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        exec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          command</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;/usr/local/bin/graceful-shutdown.sh&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 指定停止信号</span></span>
<span class="line"><span class="__shiki_17hn0y">    command</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;/bin/sh&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    args</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;-c&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;trap &#39;echo Received SIGTERM; exit 0&#39; SIGTERM; while true; do sleep 1; done&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h3 id="_3-5-重启策略-restartpolicy" tabindex="-1">3.5 重启策略（RestartPolicy） <a class="header-anchor" href="#_3-5-重启策略-restartpolicy" aria-label="Permalink to &quot;3.5 重启策略（RestartPolicy）&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  restartPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Always</span><span class="__shiki_21nrsd">  # 可选值: Always, OnFailure, Never</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp:latest</span></span></code></pre></div><p><strong>重启策略详解：</strong></p><ul><li><strong>Always</strong>（默认）：容器退出时总是重启</li><li><strong>OnFailure</strong>：容器异常退出（非0退出码）时重启</li><li><strong>Never</strong>：从不重启</li></ul><p><strong>重启机制特性：</strong></p><ul><li>重启延迟按指数级增加（10s, 20s, 40s...），最大5分钟</li><li>成功运行10分钟后重置重启延迟</li><li>由kubelet在节点级别执行</li></ul><h2 id="四、pod健康检查机制" tabindex="-1">四、Pod健康检查机制 <a class="header-anchor" href="#四、pod健康检查机制" aria-label="Permalink to &quot;四、Pod健康检查机制&quot;">​</a></h2><h3 id="_4-1-存活探针-liveness-probe" tabindex="-1">4.1 存活探针（Liveness Probe） <a class="header-anchor" href="#_4-1-存活探针-liveness-probe" aria-label="Permalink to &quot;4.1 存活探针（Liveness Probe）&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">liveness-demo</span></span>
<span class="line"><span class="__shiki_17hn0y">  image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">k8s.gcr.io/liveness</span></span>
<span class="line"><span class="__shiki_17hn0y">  livenessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 探测方式：Exec、HTTPGet、TCPSocket</span></span>
<span class="line"><span class="__shiki_17hn0y">    exec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      command</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">cat</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">/tmp/healthy</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 配置参数</span></span>
<span class="line"><span class="__shiki_17hn0y">    initialDelaySeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_21nrsd">    # 初始延迟</span></span>
<span class="line"><span class="__shiki_17hn0y">    periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_21nrsd">          # 探测频率</span></span>
<span class="line"><span class="__shiki_17hn0y">    timeoutSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_21nrsd">         # 超时时间</span></span>
<span class="line"><span class="__shiki_17hn0y">    successThreshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_21nrsd">       # 成功阈值</span></span>
<span class="line"><span class="__shiki_17hn0y">    failureThreshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span><span class="__shiki_21nrsd">       # 失败阈值</span></span></code></pre></div><p><strong>作用</strong>：检测容器是否在正常运行，失败则重启容器</p><h3 id="_4-2-就绪探针-readiness-probe" tabindex="-1">4.2 就绪探针（Readiness Probe） <a class="header-anchor" href="#_4-2-就绪探针-readiness-probe" aria-label="Permalink to &quot;4.2 就绪探针（Readiness Probe）&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">readinessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  httpGet</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/health</span></span>
<span class="line"><span class="__shiki_17hn0y">    port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_17hn0y">    httpHeaders</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">X-Custom-Header</span></span>
<span class="line"><span class="__shiki_17hn0y">      value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Awesome</span></span>
<span class="line"><span class="__shiki_17hn0y">  initialDelaySeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">  periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span></code></pre></div><p><strong>作用</strong>：检测容器是否准备好接收流量，失败则从Service端点移除</p><h3 id="_4-3-启动探针-startup-probe" tabindex="-1">4.3 启动探针（Startup Probe） <a class="header-anchor" href="#_4-3-启动探针-startup-probe" aria-label="Permalink to &quot;4.3 启动探针（Startup Probe）&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">startupProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  httpGet</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/health</span></span>
<span class="line"><span class="__shiki_17hn0y">    port</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">liveness-port</span></span>
<span class="line"><span class="__shiki_17hn0y">  failureThreshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_21nrsd">    # 允许更多失败次数</span></span>
<span class="line"><span class="__shiki_17hn0y">  periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_21nrsd">       # 较长检测间隔</span></span></code></pre></div><p><strong>作用</strong>：处理慢启动容器，在启动期间禁用其他探针</p><h3 id="_4-4-探针组合策略" tabindex="-1">4.4 探针组合策略 <a class="header-anchor" href="#_4-4-探针组合策略" aria-label="Permalink to &quot;4.4 探针组合策略&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">容器启动</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">Startup Probe生效</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">启动成功 → Liveness/Readiness Probe接管</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">启动失败 → 容器重启（根据restartPolicy）</span></span></code></pre></div><h2 id="五、pod资源管理与服务质量" tabindex="-1">五、Pod资源管理与服务质量 <a class="header-anchor" href="#五、pod资源管理与服务质量" aria-label="Permalink to &quot;五、Pod资源管理与服务质量&quot;">​</a></h2><h3 id="_5-1-资源请求与限制" tabindex="-1">5.1 资源请求与限制 <a class="header-anchor" href="#_5-1-资源请求与限制" aria-label="Permalink to &quot;5.1 资源请求与限制&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web</span></span>
<span class="line"><span class="__shiki_17hn0y">  image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx</span></span>
<span class="line"><span class="__shiki_17hn0y">  resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    requests</span><span class="__shiki_140thh">:           </span><span class="__shiki_21nrsd"># 调度保证</span></span>
<span class="line"><span class="__shiki_17hn0y">      memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;64Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;250m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      ephemeral-storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2Gi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    limits</span><span class="__shiki_140thh">:             </span><span class="__shiki_21nrsd"># 运行上限</span></span>
<span class="line"><span class="__shiki_17hn0y">      memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;128Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;500m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      ephemeral-storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;4Gi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      hugepages-2Mi</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100Mi&quot;</span></span></code></pre></div><h3 id="_5-2-qos类别-服务质量" tabindex="-1">5.2 QoS类别（服务质量） <a class="header-anchor" href="#_5-2-qos类别-服务质量" aria-label="Permalink to &quot;5.2 QoS类别（服务质量）&quot;">​</a></h3><h4 id="_5-2-1-qos分类规则" tabindex="-1">5.2.1 QoS分类规则 <a class="header-anchor" href="#_5-2-1-qos分类规则" aria-label="Permalink to &quot;5.2.1 QoS分类规则&quot;">​</a></h4><ul><li><p><strong>Guaranteed</strong>（最高优先级）：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">limits.cpu = requests.cpu</span></span>
<span class="line"><span class="__shiki_mdbnqw">limits.memory = requests.memory</span></span></code></pre></div></li><li><p><strong>Burstable</strong>（中等优先级）：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">requests.memory &lt; limits.memory</span></span>
<span class="line"><span class="__shiki_mdbnqw">或至少一个容器设置了requests</span></span></code></pre></div></li><li><p><strong>BestEffort</strong>（最低优先级）：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">未设置requests和limits</span></span></code></pre></div></li></ul><h4 id="_5-2-2-资源回收顺序" tabindex="-1">5.2.2 资源回收顺序 <a class="header-anchor" href="#_5-2-2-资源回收顺序" aria-label="Permalink to &quot;5.2.2 资源回收顺序&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">内存压力 → 1. BestEffort Pods</span></span>
<span class="line"><span class="__shiki_wvjl67">             2. Burstable Pods（超过requests部分）</span></span>
<span class="line"><span class="__shiki_wvjl67">             3. Guaranteed Pods（最后）</span></span></code></pre></div><h3 id="_5-3-资源监控与自动扩缩" tabindex="-1">5.3 资源监控与自动扩缩 <a class="header-anchor" href="#_5-3-资源监控与自动扩缩" aria-label="Permalink to &quot;5.3 资源监控与自动扩缩&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Vertical Pod Autoscaler示例</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">VerticalPodAutoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp-vpa</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  targetRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;apps/v1&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">  updatePolicy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    updateMode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Auto&quot;</span></span></code></pre></div><h2 id="六、pod调度与拓扑管理" tabindex="-1">六、Pod调度与拓扑管理 <a class="header-anchor" href="#六、pod调度与拓扑管理" aria-label="Permalink to &quot;六、Pod调度与拓扑管理&quot;">​</a></h2><h3 id="_6-1-节点选择器与亲和性" tabindex="-1">6.1 节点选择器与亲和性 <a class="header-anchor" href="#_6-1-节点选择器与亲和性" aria-label="Permalink to &quot;6.1 节点选择器与亲和性&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  nodeSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    accelerator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gpu</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  affinity</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 节点亲和性</span></span>
<span class="line"><span class="__shiki_17hn0y">    nodeAffinity</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      requiredDuringSchedulingIgnoredDuringExecution</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        nodeSelectorTerms</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">matchExpressions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">topology.kubernetes.io/zone</span></span>
<span class="line"><span class="__shiki_17hn0y">            operator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">In</span></span>
<span class="line"><span class="__shiki_17hn0y">            values</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            - </span><span class="__shiki_mdbnqw">zone-a</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # Pod亲和性</span></span>
<span class="line"><span class="__shiki_17hn0y">    podAffinity</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      requiredDuringSchedulingIgnoredDuringExecution</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">labelSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          matchExpressions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security</span></span>
<span class="line"><span class="__shiki_17hn0y">            operator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">In</span></span>
<span class="line"><span class="__shiki_17hn0y">            values</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            - </span><span class="__shiki_mdbnqw">S1</span></span>
<span class="line"><span class="__shiki_17hn0y">        topologyKey</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">topology.kubernetes.io/zone</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # Pod反亲和性</span></span>
<span class="line"><span class="__shiki_17hn0y">    podAntiAffinity</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      preferredDuringSchedulingIgnoredDuringExecution</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">weight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_17hn0y">        podAffinityTerm</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          labelSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            matchExpressions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app</span></span>
<span class="line"><span class="__shiki_17hn0y">              operator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">In</span></span>
<span class="line"><span class="__shiki_17hn0y">              values</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">              - </span><span class="__shiki_mdbnqw">store</span></span>
<span class="line"><span class="__shiki_17hn0y">          topologyKey</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kubernetes.io/hostname</span></span></code></pre></div><h3 id="_6-2-污点与容忍" tabindex="-1">6.2 污点与容忍 <a class="header-anchor" href="#_6-2-污点与容忍" aria-label="Permalink to &quot;6.2 污点与容忍&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 节点污点</span></span>
<span class="line"><span class="__shiki_mdbnqw">kubectl taint nodes node1 key=value:NoSchedule</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Pod容忍配置</span></span>
<span class="line"><span class="__shiki_17hn0y">tolerations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;key&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  operator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Equal&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;value&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  effect</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;NoSchedule&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  tolerationSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3600</span><span class="__shiki_21nrsd">  # 临时容忍</span></span></code></pre></div><h2 id="七、pod生命周期事件与处理" tabindex="-1">七、Pod生命周期事件与处理 <a class="header-anchor" href="#七、pod生命周期事件与处理" aria-label="Permalink to &quot;七、Pod生命周期事件与处理&quot;">​</a></h2><h3 id="_7-1-容器状态追踪" tabindex="-1">7.1 容器状态追踪 <a class="header-anchor" href="#_7-1-容器状态追踪" aria-label="Permalink to &quot;7.1 容器状态追踪&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 查看详细状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> pod</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 输出关键信息：</span></span>
<span class="line"><span class="__shiki_21nrsd"># Conditions:</span></span>
<span class="line"><span class="__shiki_21nrsd">#   Type              Status</span></span>
<span class="line"><span class="__shiki_21nrsd">#   Initialized       True/False</span></span>
<span class="line"><span class="__shiki_21nrsd">#   Ready             True/False</span></span>
<span class="line"><span class="__shiki_21nrsd">#   ContainersReady   True/False</span></span>
<span class="line"><span class="__shiki_21nrsd">#   PodScheduled      True/False</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Container Statuses:</span></span>
<span class="line"><span class="__shiki_21nrsd">#   State: Running/Waiting/Terminated</span></span>
<span class="line"><span class="__shiki_21nrsd">#   Last State: 上次终止状态</span></span>
<span class="line"><span class="__shiki_21nrsd">#   Ready: True/False</span></span>
<span class="line"><span class="__shiki_21nrsd">#   Restart Count: 重启次数</span></span></code></pre></div><h3 id="_7-2-事件监控" tabindex="-1">7.2 事件监控 <a class="header-anchor" href="#_7-2-事件监控" aria-label="Permalink to &quot;7.2 事件监控&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 事件类型示例</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">Scheduling</span><span class="__shiki_21nrsd">      # 调度事件</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">Pulling</span><span class="__shiki_21nrsd">         # 拉取镜像</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">Pulled</span><span class="__shiki_21nrsd">          # 镜像拉取完成</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">Created</span><span class="__shiki_21nrsd">         # 容器创建</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">Started</span><span class="__shiki_21nrsd">         # 容器启动</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">Killing</span><span class="__shiki_21nrsd">         # 容器终止</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">Unhealthy</span><span class="__shiki_21nrsd">       # 健康检查失败</span></span></code></pre></div><h3 id="_7-3-调试与诊断" tabindex="-1">7.3 调试与诊断 <a class="header-anchor" href="#_7-3-调试与诊断" aria-label="Permalink to &quot;7.3 调试与诊断&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 查看Pod事件</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> events</span><span class="__shiki_dzsirb"> --field-selector</span><span class="__shiki_mdbnqw"> involvedObject.name=</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看容器日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> [-c </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_mdbnqw">container-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 进入运行中容器</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> exec</span><span class="__shiki_dzsirb"> -it</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> --</span><span class="__shiki_mdbnqw"> /bin/sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查Pod配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pod</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> yaml</span></span></code></pre></div><h2 id="八、pod生命周期管理最佳实践" tabindex="-1">八、Pod生命周期管理最佳实践 <a class="header-anchor" href="#八、pod生命周期管理最佳实践" aria-label="Permalink to &quot;八、Pod生命周期管理最佳实践&quot;">​</a></h2><h3 id="_8-1-配置规范" tabindex="-1">8.1 配置规范 <a class="header-anchor" href="#_8-1-配置规范" aria-label="Permalink to &quot;8.1 配置规范&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production-app</span></span>
<span class="line"><span class="__shiki_17hn0y">  labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">    version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1.2.3</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 生命周期相关注解</span></span>
<span class="line"><span class="__shiki_17hn0y">    sidecar.istio.io/inject</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;false&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    cluster-autoscaler.kubernetes.io/safe-to-evict</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 1. 总是设置资源限制</span></span>
<span class="line"><span class="__shiki_17hn0y">  containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app</span></span>
<span class="line"><span class="__shiki_17hn0y">    resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;256Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;500m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;512Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1000m&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 2. 配置健康检查</span></span>
<span class="line"><span class="__shiki_17hn0y">    livenessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      httpGet</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/healthz</span></span>
<span class="line"><span class="__shiki_17hn0y">        port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_17hn0y">      initialDelaySeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">15</span></span>
<span class="line"><span class="__shiki_17hn0y">      periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    readinessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      httpGet</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/readyz</span></span>
<span class="line"><span class="__shiki_17hn0y">        port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_17hn0y">      initialDelaySeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_17hn0y">      periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 3. 优雅终止配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    lifecycle</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      preStop</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        exec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          command</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;/bin/sh&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;-c&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;sleep 10&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 4. 安全上下文</span></span>
<span class="line"><span class="__shiki_17hn0y">  securityContext</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runAsNonRoot</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    runAsUser</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1000</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 5. 重启策略</span></span>
<span class="line"><span class="__shiki_17hn0y">  restartPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Always</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 6. 终止宽限期</span></span>
<span class="line"><span class="__shiki_17hn0y">  terminationGracePeriodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 7. 亲和性设置</span></span>
<span class="line"><span class="__shiki_17hn0y">  affinity</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    podAntiAffinity</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      preferredDuringSchedulingIgnoredDuringExecution</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">weight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_17hn0y">        podAffinityTerm</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          labelSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            matchExpressions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app</span></span>
<span class="line"><span class="__shiki_17hn0y">              operator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">In</span></span>
<span class="line"><span class="__shiki_17hn0y">              values</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">              - </span><span class="__shiki_mdbnqw">production-app</span></span>
<span class="line"><span class="__shiki_17hn0y">          topologyKey</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kubernetes.io/hostname</span></span></code></pre></div><h3 id="_8-2-常见问题与解决方案" tabindex="-1">8.2 常见问题与解决方案 <a class="header-anchor" href="#_8-2-常见问题与解决方案" aria-label="Permalink to &quot;8.2 常见问题与解决方案&quot;">​</a></h3><h4 id="问题1-pod处于pending状态" tabindex="-1">问题1：Pod处于Pending状态 <a class="header-anchor" href="#问题1-pod处于pending状态" aria-label="Permalink to &quot;问题1：Pod处于Pending状态&quot;">​</a></h4><p><strong>可能原因及排查：</strong></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 检查资源不足</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> pod</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -A</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_mdbnqw"> Events</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查节点污点</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> node</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">node-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> Taint</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查PV/PVC绑定</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pvc</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查镜像拉取</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> pod</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_mdbnqw"> &quot;pull&quot;</span></span></code></pre></div><h4 id="问题2-pod持续重启" tabindex="-1">问题2：Pod持续重启 <a class="header-anchor" href="#问题2-pod持续重启" aria-label="Permalink to &quot;问题2：Pod持续重启&quot;">​</a></h4><p><strong>诊断步骤：</strong></p><ol><li><p>查看重启原因</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pod</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> wide</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> pod</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span></code></pre></div></li><li><p>检查退出码</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> --previous</span></span></code></pre></div></li><li><p>验证探针配置</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 调整探针参数</span></span>
<span class="line"><span class="__shiki_17hn0y">livenessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  initialDelaySeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_21nrsd">  # 增加初始延迟</span></span>
<span class="line"><span class="__shiki_17hn0y">  failureThreshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_21nrsd">      # 增加失败阈值</span></span></code></pre></div></li></ol><h4 id="问题3-pod终止缓慢" tabindex="-1">问题3：Pod终止缓慢 <a class="header-anchor" href="#问题3-pod终止缓慢" aria-label="Permalink to &quot;问题3：Pod终止缓慢&quot;">​</a></h4><p><strong>优化方案：</strong></p><ol><li>优化preStop钩子</li><li>调整terminationGracePeriodSeconds</li><li>确保应用正确处理SIGTERM</li></ol><h2 id="九、高级特性与未来演进" tabindex="-1">九、高级特性与未来演进 <a class="header-anchor" href="#九、高级特性与未来演进" aria-label="Permalink to &quot;九、高级特性与未来演进&quot;">​</a></h2><h3 id="_9-1-pod生命周期增强" tabindex="-1">9.1 Pod生命周期增强 <a class="header-anchor" href="#_9-1-pod生命周期增强" aria-label="Permalink to &quot;9.1 Pod生命周期增强&quot;">​</a></h3><ul><li><strong>Sidecar容器</strong>：特殊生命周期管理的容器</li><li><strong>临时容器</strong>（Ephemeral Containers）：用于调试的运行中Pod注入</li><li><strong>Pod就绪门控</strong>（Readiness Gates）：自定义就绪条件</li></ul><h3 id="_9-2-pod-disruption-budget" tabindex="-1">9.2 Pod Disruption Budget <a class="header-anchor" href="#_9-2-pod-disruption-budget" aria-label="Permalink to &quot;9.2 Pod Disruption Budget&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">policy/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PodDisruptionBudget</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp-pdb</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  minAvailable</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_21nrsd">    # 或 maxUnavailable: 1</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp</span></span></code></pre></div><h3 id="_9-3-安全沙箱容器" tabindex="-1">9.3 安全沙箱容器 <a class="header-anchor" href="#_9-3-安全沙箱容器" aria-label="Permalink to &quot;9.3 安全沙箱容器&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  runtimeClassName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gvisor</span><span class="__shiki_21nrsd">  # 或 kata-containers</span></span></code></pre></div><h2 id="十、实战示例-完整pod配置" tabindex="-1">十、实战示例：完整Pod配置 <a class="header-anchor" href="#十、实战示例-完整pod配置" aria-label="Permalink to &quot;十、实战示例：完整Pod配置&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">full-lifecycle-demo</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">  labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web-server</span></span>
<span class="line"><span class="__shiki_17hn0y">    tier</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    prometheus.io/scrape</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    prometheus.io/port</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;9100&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 调度相关</span></span>
<span class="line"><span class="__shiki_17hn0y">  schedulerName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default-scheduler</span></span>
<span class="line"><span class="__shiki_17hn0y">  priorityClassName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">high-priority</span></span>
<span class="line"><span class="__shiki_17hn0y">  serviceAccountName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 初始化容器</span></span>
<span class="line"><span class="__shiki_17hn0y">  initContainers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">init-config</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">busybox:1.28</span></span>
<span class="line"><span class="__shiki_17hn0y">    command</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;sh&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;-c&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;cp /config/app.conf /etc/app/&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumeMounts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config</span></span>
<span class="line"><span class="__shiki_17hn0y">      mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/config</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config</span></span>
<span class="line"><span class="__shiki_17hn0y">      mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/etc/app</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 主容器</span></span>
<span class="line"><span class="__shiki_17hn0y">  containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web-app</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx:1.19-alpine</span></span>
<span class="line"><span class="__shiki_17hn0y">    imagePullPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">IfNotPresent</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">containerPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http</span></span>
<span class="line"><span class="__shiki_17hn0y">      protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 环境变量</span></span>
<span class="line"><span class="__shiki_17hn0y">    env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NODE_ENV</span></span>
<span class="line"><span class="__shiki_17hn0y">      value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">LOG_LEVEL</span></span>
<span class="line"><span class="__shiki_17hn0y">      valueFrom</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        configMapKeyRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config</span></span>
<span class="line"><span class="__shiki_17hn0y">          key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">log-level</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 资源管理</span></span>
<span class="line"><span class="__shiki_17hn0y">    resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;128Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;250m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        ephemeral-storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1Gi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;256Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;500m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        ephemeral-storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2Gi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        hugepages-2Mi</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;64Mi&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 健康检查</span></span>
<span class="line"><span class="__shiki_17hn0y">    livenessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      httpGet</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/healthz</span></span>
<span class="line"><span class="__shiki_17hn0y">        port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_17hn0y">        httpHeaders</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Custom-Header</span></span>
<span class="line"><span class="__shiki_17hn0y">          value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Awesome</span></span>
<span class="line"><span class="__shiki_17hn0y">      initialDelaySeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_17hn0y">      periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_17hn0y">      timeoutSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">      successThreshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">      failureThreshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    readinessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      httpGet</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/readyz</span></span>
<span class="line"><span class="__shiki_17hn0y">        port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_17hn0y">      initialDelaySeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_17hn0y">      periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    startupProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      httpGet</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/healthz</span></span>
<span class="line"><span class="__shiki_17hn0y">        port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_17hn0y">      failureThreshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span></span>
<span class="line"><span class="__shiki_17hn0y">      periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 生命周期钩子</span></span>
<span class="line"><span class="__shiki_17hn0y">    lifecycle</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      postStart</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        exec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          command</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;/bin/sh&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;-c&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;echo &#39;App started&#39; &gt; /tmp/start.log&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">      preStop</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        exec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          command</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;/bin/sh&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;-c&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;nginx -s quit&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 安全上下文</span></span>
<span class="line"><span class="__shiki_17hn0y">    securityContext</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      runAsNonRoot</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">      runAsUser</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1001</span></span>
<span class="line"><span class="__shiki_17hn0y">      allowPrivilegeEscalation</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">      capabilities</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        drop</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">ALL</span></span>
<span class="line"><span class="__shiki_17hn0y">        add</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">NET_BIND_SERVICE</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 存储卷挂载</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumeMounts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config</span></span>
<span class="line"><span class="__shiki_17hn0y">      mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/etc/nginx/conf.d</span></span>
<span class="line"><span class="__shiki_17hn0y">      readOnly</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-logs</span></span>
<span class="line"><span class="__shiki_17hn0y">      mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/var/log/nginx</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">empty-dir</span></span>
<span class="line"><span class="__shiki_17hn0y">      mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/cache</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 卷定义</span></span>
<span class="line"><span class="__shiki_17hn0y">  volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config</span></span>
<span class="line"><span class="__shiki_17hn0y">    configMap</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-configmap</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config</span></span>
<span class="line"><span class="__shiki_17hn0y">    emptyDir</span><span class="__shiki_140thh">: {}</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-logs</span></span>
<span class="line"><span class="__shiki_17hn0y">    emptyDir</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      sizeLimit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">500Mi</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">empty-dir</span></span>
<span class="line"><span class="__shiki_17hn0y">    emptyDir</span><span class="__shiki_140thh">: {}</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # Pod级别配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  restartPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Always</span></span>
<span class="line"><span class="__shiki_17hn0y">  terminationGracePeriodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">45</span></span>
<span class="line"><span class="__shiki_17hn0y">  dnsPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ClusterFirst</span></span>
<span class="line"><span class="__shiki_17hn0y">  hostNetwork</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">  hostPID</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 节点亲和性</span></span>
<span class="line"><span class="__shiki_17hn0y">  affinity</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    nodeAffinity</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      requiredDuringSchedulingIgnoredDuringExecution</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        nodeSelectorTerms</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">matchExpressions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kubernetes.io/arch</span></span>
<span class="line"><span class="__shiki_17hn0y">            operator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">In</span></span>
<span class="line"><span class="__shiki_17hn0y">            values</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            - </span><span class="__shiki_mdbnqw">amd64</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    podAntiAffinity</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      preferredDuringSchedulingIgnoredDuringExecution</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">weight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_17hn0y">        podAffinityTerm</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          labelSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            matchExpressions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app</span></span>
<span class="line"><span class="__shiki_17hn0y">              operator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">In</span></span>
<span class="line"><span class="__shiki_17hn0y">              values</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">              - </span><span class="__shiki_mdbnqw">web-server</span></span>
<span class="line"><span class="__shiki_17hn0y">          topologyKey</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kubernetes.io/hostname</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 容忍度</span></span>
<span class="line"><span class="__shiki_17hn0y">  tolerations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;dedicated&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    operator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Equal&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;web&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    effect</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;NoSchedule&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 优先级和抢占</span></span>
<span class="line"><span class="__shiki_17hn0y">  priority</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1000</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 拓扑约束</span></span>
<span class="line"><span class="__shiki_17hn0y">  topologySpreadConstraints</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">maxSkew</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">    topologyKey</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">topology.kubernetes.io/zone</span></span>
<span class="line"><span class="__shiki_17hn0y">    whenUnsatisfiable</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">DoNotSchedule</span></span>
<span class="line"><span class="__shiki_17hn0y">    labelSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web-server</span></span></code></pre></div><hr><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>Kubernetes Pod生命周期管理是一个涉及调度、运行、监控、终止的完整闭环。掌握Pod生命周期需要理解：</p><ol><li><strong>状态流转机制</strong>：Pending → Running → Terminating 的完整流程</li><li><strong>健康检查体系</strong>：三类探针的协同工作</li><li><strong>资源管理策略</strong>：QoS类别与资源保障</li><li><strong>优雅终止流程</strong>：信号处理与清理机制</li><li><strong>调度约束系统</strong>：亲和性、污点容忍等调度逻辑</li></ol><p>实际应用中，应根据业务需求合理配置各种探针、资源限制和生命周期钩子，确保应用的稳定性和可靠性。同时要结合监控系统，建立完整的Pod生命周期可观测性体系。</p>`,108)])])}const r=a(_,[["render",l]]);export{d as __pageData,r as default};
