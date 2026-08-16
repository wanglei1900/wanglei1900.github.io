import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"容器化技术 → Kubernetes → Serverless 框架 (Knative) 完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"devops/container/orchestration/serverless.md","filePath":"devops/container/orchestration/serverless.md"}'),_={name:"devops/container/orchestration/serverless.md"};function l(h,s,c,e,t,k){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="容器化技术-→-kubernetes-→-serverless-框架-knative-完整学习笔记" tabindex="-1">容器化技术 → Kubernetes → Serverless 框架 (Knative) 完整学习笔记 <a class="header-anchor" href="#容器化技术-→-kubernetes-→-serverless-框架-knative-完整学习笔记" aria-label="Permalink to &quot;容器化技术 → Kubernetes → Serverless 框架 (Knative) 完整学习笔记&quot;">​</a></h1><hr><h2 id="第一部分-serverless-与-knative-基础概念" tabindex="-1">第一部分：Serverless 与 Knative 基础概念 <a class="header-anchor" href="#第一部分-serverless-与-knative-基础概念" aria-label="Permalink to &quot;第一部分：Serverless 与 Knative 基础概念&quot;">​</a></h2><h3 id="_1-1-serverless-演进历程" tabindex="-1">1.1 Serverless 演进历程 <a class="header-anchor" href="#_1-1-serverless-演进历程" aria-label="Permalink to &quot;1.1 Serverless 演进历程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">物理服务器 → 虚拟机 → 容器 → 编排平台 → Serverless</span></span>
<span class="line"><span class="__shiki_wvjl67">演进特点：</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 资源粒度：物理机 → VM → 容器 → 函数</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 管理责任：全部自理 → 部分托管 → 完全托管</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 计费模式：整机购买 → 按VM计费 → 按容器计费 → 按请求计费</span></span>
<span class="line"><span class="__shiki_wvjl67">└── 伸缩速度：数小时 → 数分钟 → 数秒 → 毫秒级</span></span></code></pre></div><h3 id="_1-2-serverless-核心特征" tabindex="-1">1.2 Serverless 核心特征 <a class="header-anchor" href="#_1-2-serverless-核心特征" aria-label="Permalink to &quot;1.2 Serverless 核心特征&quot;">​</a></h3><p><strong>四大核心特性</strong>：</p><ol><li><strong>零服务器管理</strong>：无需管理基础设施</li><li><strong>弹性伸缩</strong>：自动从零扩展到无穷大</li><li><strong>按使用付费</strong>：只为实际消耗的资源付费</li><li><strong>高可用性</strong>：内置容错和自动恢复机制</li></ol><p><strong>三大实现模式</strong>：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 函数即服务 (FaaS)</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">事件驱动，执行单个函数</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">临时容器，冷启动问题</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">示例：AWS Lambda、Google Cloud Functions</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 后端即服务 (BaaS)</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">托管的后端服务</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">数据库、认证、存储等</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">示例：Firebase、Supabase</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 容器即服务 (CaaS)</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">基于容器的 Serverless</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">支持任意运行时</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">示例：Knative、Google Cloud Run</span></span></code></pre></div><h3 id="_1-3-knative-是什么" tabindex="-1">1.3 Knative 是什么？ <a class="header-anchor" href="#_1-3-knative-是什么" aria-label="Permalink to &quot;1.3 Knative 是什么？&quot;">​</a></h3><p><strong>定义</strong>：基于 Kubernetes 的开源 Serverless 平台，提供构建、部署和管理现代 Serverless 工作负载所需的一组中间件组件。</p><p><strong>核心价值主张</strong>：</p><ul><li><strong>Kubernetes 原生</strong>：完全基于 Kubernetes API 构建</li><li><strong>多云兼容</strong>：在任何 Kubernetes 集群上运行</li><li><strong>语言无关</strong>：支持任意容器化应用</li><li><strong>事件驱动</strong>：内置事件处理框架</li><li><strong>开发者友好</strong>：简化应用部署和运维</li></ul><h3 id="_1-4-knative-组件架构" tabindex="-1">1.4 Knative 组件架构 <a class="header-anchor" href="#_1-4-knative-组件架构" aria-label="Permalink to &quot;1.4 Knative 组件架构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">Knative 三大核心组件：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│          Knative Serving                 │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  应用部署、扩缩容、流量管理、网络        │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│          Knative Eventing                │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  事件源、事件路由、事件处理              │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│          Knative Functions (可选)         │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  函数开发框架和工具链                    │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">依赖组件：</span></span>
<span class="line"><span class="__shiki_wvjl67">├── Istio / Contour / Kourier (网络层)</span></span>
<span class="line"><span class="__shiki_wvjl67">├── Cert-Manager (证书管理)</span></span>
<span class="line"><span class="__shiki_wvjl67">├── Tekton / Cloud Native Buildpacks (构建)</span></span>
<span class="line"><span class="__shiki_wvjl67">└── Metrics Server / KEDA (指标收集)</span></span></code></pre></div><hr><h2 id="第二部分-knative-serving-深度解析" tabindex="-1">第二部分：Knative Serving 深度解析 <a class="header-anchor" href="#第二部分-knative-serving-深度解析" aria-label="Permalink to &quot;第二部分：Knative Serving 深度解析&quot;">​</a></h2><h3 id="_2-1-serving-核心概念" tabindex="-1">2.1 Serving 核心概念 <a class="header-anchor" href="#_2-1-serving-核心概念" aria-label="Permalink to &quot;2.1 Serving 核心概念&quot;">​</a></h3><h4 id="service-ksvc" tabindex="-1"><strong>Service (ksvc)</strong> <a class="header-anchor" href="#service-ksvc" aria-label="Permalink to &quot;**Service (ksvc)**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 核心概念：Knative Service 管理应用的全生命周期</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">hello-world</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gcr.io/knative-samples/helloworld-go</span></span>
<span class="line"><span class="__shiki_17hn0y">          env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TARGET</span></span>
<span class="line"><span class="__shiki_17hn0y">              value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;World&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 流量管理配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  traffic</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">percent</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_17hn0y">      latestRevision</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span></code></pre></div><h4 id="revision" tabindex="-1"><strong>Revision</strong> <a class="header-anchor" href="#revision" aria-label="Permalink to &quot;**Revision**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Revision：不可变的代码和配置快照</span></span>
<span class="line"><span class="__shiki_21nrsd"># 自动为每次配置变更创建新 Revision</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Revision</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">hello-world-00001</span></span>
<span class="line"><span class="__shiki_17hn0y">  labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    serving.knative.dev/service</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">hello-world</span></span>
<span class="line"><span class="__shiki_17hn0y">    serving.knative.dev/configuration</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">hello-world</span></span>
<span class="line"><span class="__shiki_17hn0y">    serving.knative.dev/configurationGeneration</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  containerConcurrency</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_21nrsd">  # 并发数（0=无限）</span></span>
<span class="line"><span class="__shiki_17hn0y">  timeoutSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">300</span><span class="__shiki_21nrsd">     # 请求超时时间</span></span>
<span class="line"><span class="__shiki_17hn0y">  containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gcr.io/knative-samples/helloworld-go:v1</span></span></code></pre></div><h4 id="configuration" tabindex="-1"><strong>Configuration</strong> <a class="header-anchor" href="#configuration" aria-label="Permalink to &quot;**Configuration**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Configuration：Revision 的期望状态描述</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Configuration</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">hello-world-config</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gcr.io/knative-samples/helloworld-go:v2</span></span></code></pre></div><h4 id="route" tabindex="-1"><strong>Route</strong> <a class="header-anchor" href="#route" aria-label="Permalink to &quot;**Route**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Route：流量路由和拆分规则</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Route</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">hello-world-route</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  traffic</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">revisionName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">hello-world-00001</span></span>
<span class="line"><span class="__shiki_17hn0y">      percent</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">90</span></span>
<span class="line"><span class="__shiki_17hn0y">      tag</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">revisionName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">hello-world-00002</span></span>
<span class="line"><span class="__shiki_17hn0y">      percent</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_17hn0y">      tag</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v2</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">latestRevision</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">      percent</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_21nrsd">  # 预留容量</span></span></code></pre></div><h3 id="_2-2-serving-核心特性" tabindex="-1">2.2 Serving 核心特性 <a class="header-anchor" href="#_2-2-serving-核心特性" aria-label="Permalink to &quot;2.2 Serving 核心特性&quot;">​</a></h3><h4 id="自动扩缩容-autoscaler" tabindex="-1"><strong>自动扩缩容 (Autoscaler)</strong> <a class="header-anchor" href="#自动扩缩容-autoscaler" aria-label="Permalink to &quot;**自动扩缩容 (Autoscaler)**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Autoscaler 配置示例</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling.internal.knative.dev/v1alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PodAutoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  containerConcurrency</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_21nrsd">  # 每个容器并发请求数</span></span>
<span class="line"><span class="__shiki_17hn0y">  scaleTargetRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">hello-world-deployment</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd"># 扩展指标类型：</span></span>
<span class="line"><span class="__shiki_mdbnqw">1. 并发请求数 (concurrency)</span></span>
<span class="line"><span class="__shiki_mdbnqw">2. RPS (requests-per-second)</span></span>
<span class="line"><span class="__shiki_mdbnqw">3. CPU 利用率</span></span>
<span class="line"><span class="__shiki_mdbnqw">4. 内存利用率</span></span>
<span class="line"><span class="__shiki_mdbnqw">5. 自定义指标</span></span></code></pre></div><p><strong>扩缩容策略配置</strong>：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 通过注解配置扩缩容行为</span></span>
<span class="line"><span class="__shiki_17hn0y">annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # KPA (Knative Pod Autoscaler) 配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  autoscaling.knative.dev/class</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kpa.autoscaling.knative.dev</span></span>
<span class="line"><span class="__shiki_17hn0y">  autoscaling.knative.dev/metric</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">concurrency</span><span class="__shiki_21nrsd">  # 或 rps</span></span>
<span class="line"><span class="__shiki_17hn0y">  autoscaling.knative.dev/target</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10&quot;</span><span class="__shiki_21nrsd">  # 目标并发数</span></span>
<span class="line"><span class="__shiki_17hn0y">  autoscaling.knative.dev/targetUtilizationPercentage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;70&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 扩缩容边界</span></span>
<span class="line"><span class="__shiki_17hn0y">  autoscaling.knative.dev/minScale</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1&quot;</span><span class="__shiki_21nrsd">     # 最小副本数</span></span>
<span class="line"><span class="__shiki_17hn0y">  autoscaling.knative.dev/maxScale</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;50&quot;</span><span class="__shiki_21nrsd">    # 最大副本数</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 扩缩容行为</span></span>
<span class="line"><span class="__shiki_17hn0y">  autoscaling.knative.dev/window</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;60s&quot;</span><span class="__shiki_21nrsd">     # 稳定窗口</span></span>
<span class="line"><span class="__shiki_17hn0y">  autoscaling.knative.dev/panicWindowPercentage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10.0&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  autoscaling.knative.dev/panicThresholdPercentage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;200.0&quot;</span></span></code></pre></div><h4 id="从零扩展-scale-to-zero" tabindex="-1"><strong>从零扩展 (Scale-to-Zero)</strong> <a class="header-anchor" href="#从零扩展-scale-to-zero" aria-label="Permalink to &quot;**从零扩展 (Scale-to-Zero)**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Scale-to-Zero 配置</span></span>
<span class="line"><span class="__shiki_17hn0y">annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  autoscaling.knative.dev/minScale</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;0&quot;</span><span class="__shiki_21nrsd">  # 启用从零扩展</span></span>
<span class="line"><span class="__shiki_17hn0y">  autoscaling.knative.dev/scaleToZeroPodRetentionPeriod</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;30s&quot;</span><span class="__shiki_21nrsd">  # 优雅关闭期</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Scale-to-Zero 工作原理：</span></span>
<span class="line"><span class="__shiki_mdbnqw">1. 没有流量时，副本数缩减到 0</span></span>
<span class="line"><span class="__shiki_mdbnqw">2. Activator 接收所有入站请求</span></span>
<span class="line"><span class="__shiki_mdbnqw">3. 新请求触发 Activator 启动新 Pod</span></span>
<span class="line"><span class="__shiki_mdbnqw">4. 冷启动延迟：Pod 启动 + 应用启动时间</span></span></code></pre></div><h4 id="网络与路由" tabindex="-1"><strong>网络与路由</strong> <a class="header-anchor" href="#网络与路由" aria-label="Permalink to &quot;**网络与路由**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 网络配置注解</span></span>
<span class="line"><span class="__shiki_17hn0y">annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 域名配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  networking.knative.dev/visibility</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cluster-local</span><span class="__shiki_21nrsd">  # 或 external</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # TLS 配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  networking.knative.dev/disablePublicTLS</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;false&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 入口网关</span></span>
<span class="line"><span class="__shiki_17hn0y">  networking.knative.dev/ingress.class</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;istio.ingress.networking.knative.dev&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 默认域名模式：</span></span>
<span class="line"><span class="__shiki_21nrsd"># {service-name}.{namespace}.{cluster-domain}</span></span>
<span class="line"><span class="__shiki_21nrsd"># 示例：hello-world.default.example.com</span></span></code></pre></div><h3 id="_2-3-serving-高级功能" tabindex="-1">2.3 Serving 高级功能 <a class="header-anchor" href="#_2-3-serving-高级功能" aria-label="Permalink to &quot;2.3 Serving 高级功能&quot;">​</a></h3><h4 id="多容器支持" tabindex="-1"><strong>多容器支持</strong> <a class="header-anchor" href="#多容器支持" aria-label="Permalink to &quot;**多容器支持**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">multi-container-app</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">user-container</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">        ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">containerPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_17hn0y">        env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">API_URL</span></span>
<span class="line"><span class="__shiki_17hn0y">          value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http://localhost:9090</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">sidecar</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">        ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">containerPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">9090</span></span>
<span class="line"><span class="__shiki_17hn0y">        volumeMounts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/etc/nginx</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_17hn0y">      volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config</span></span>
<span class="line"><span class="__shiki_17hn0y">        configMap</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx-config</span></span></code></pre></div><h4 id="卷和配置挂载" tabindex="-1"><strong>卷和配置挂载</strong> <a class="header-anchor" href="#卷和配置挂载" aria-label="Permalink to &quot;**卷和配置挂载**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">        volumeMounts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-volume</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/etc/config</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">secret-volume</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/etc/secret</span></span>
<span class="line"><span class="__shiki_17hn0y">          readOnly</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_17hn0y">      volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-volume</span></span>
<span class="line"><span class="__shiki_17hn0y">        configMap</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">secret-volume</span></span>
<span class="line"><span class="__shiki_17hn0y">        secret</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          secretName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-secret</span></span></code></pre></div><h4 id="探针配置" tabindex="-1"><strong>探针配置</strong> <a class="header-anchor" href="#探针配置" aria-label="Permalink to &quot;**探针配置**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 就绪探针</span></span>
<span class="line"><span class="__shiki_17hn0y">  knative.dev/probe-path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/healthz&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  knative.dev/probe-period-seconds</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">        readinessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          httpGet</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/ready</span></span>
<span class="line"><span class="__shiki_17hn0y">            port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_17hn0y">          initialDelaySeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">          periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">          successThreshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">          failureThreshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_17hn0y">        livenessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          tcpSocket</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_17hn0y">          initialDelaySeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_17hn0y">          periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span></code></pre></div><h4 id="资源限制" tabindex="-1"><strong>资源限制</strong> <a class="header-anchor" href="#资源限制" aria-label="Permalink to &quot;**资源限制**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">        resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;256Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;250m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;512Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;500m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">MEMORY_LIMIT</span></span>
<span class="line"><span class="__shiki_17hn0y">          valueFrom</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            resourceFieldRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">              resource</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">limits.memory</span></span></code></pre></div><hr><h2 id="第三部分-knative-eventing-深度解析" tabindex="-1">第三部分：Knative Eventing 深度解析 <a class="header-anchor" href="#第三部分-knative-eventing-深度解析" aria-label="Permalink to &quot;第三部分：Knative Eventing 深度解析&quot;">​</a></h2><h3 id="_3-1-eventing-核心概念" tabindex="-1">3.1 Eventing 核心概念 <a class="header-anchor" href="#_3-1-eventing-核心概念" aria-label="Permalink to &quot;3.1 Eventing 核心概念&quot;">​</a></h3><h4 id="事件模型" tabindex="-1"><strong>事件模型</strong> <a class="header-anchor" href="#事件模型" aria-label="Permalink to &quot;**事件模型**&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">CloudEvents 标准 (CNCF 项目)：</span></span>
<span class="line"><span class="__shiki_wvjl67">{</span></span>
<span class="line"><span class="__shiki_wvjl67">  &quot;specversion&quot;: &quot;1.0&quot;,</span></span>
<span class="line"><span class="__shiki_wvjl67">  &quot;type&quot;: &quot;com.example.object.created&quot;,</span></span>
<span class="line"><span class="__shiki_wvjl67">  &quot;source&quot;: &quot;/projects/{project-id}&quot;,</span></span>
<span class="line"><span class="__shiki_wvjl67">  &quot;id&quot;: &quot;A234-1234-1234&quot;,</span></span>
<span class="line"><span class="__shiki_wvjl67">  &quot;time&quot;: &quot;2023-01-02T12:34:56.789Z&quot;,</span></span>
<span class="line"><span class="__shiki_wvjl67">  &quot;datacontenttype&quot;: &quot;application/json&quot;,</span></span>
<span class="line"><span class="__shiki_wvjl67">  &quot;data&quot;: {</span></span>
<span class="line"><span class="__shiki_wvjl67">    &quot;objectId&quot;: &quot;12345&quot;,</span></span>
<span class="line"><span class="__shiki_wvjl67">    &quot;action&quot;: &quot;created&quot;</span></span>
<span class="line"><span class="__shiki_wvjl67">  }</span></span>
<span class="line"><span class="__shiki_wvjl67">}</span></span></code></pre></div><h4 id="事件源-event-sources" tabindex="-1"><strong>事件源 (Event Sources)</strong> <a class="header-anchor" href="#事件源-event-sources" aria-label="Permalink to &quot;**事件源 (Event Sources)**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># PingSource 示例（定时事件源）</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">sources.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PingSource</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test-ping-source</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  schedule</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;*/1 * * * *&quot;</span><span class="__shiki_21nrsd">  # 每分钟</span></span>
<span class="line"><span class="__shiki_17hn0y">  data</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;{&quot;message&quot;: &quot;Hello world!&quot;}&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">  sink</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    ref</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">      kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">event-display</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># APIServerSource 示例（K8s API 事件）</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">sources.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ApiServerSource</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">k8s-events</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  serviceAccountName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">events-sa</span></span>
<span class="line"><span class="__shiki_17hn0y">  mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Resource</span></span>
<span class="line"><span class="__shiki_17hn0y">  resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">  sink</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    ref</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">      kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">pod-event-processor</span></span></code></pre></div><h4 id="broker-和-trigger" tabindex="-1"><strong>Broker 和 Trigger</strong> <a class="header-anchor" href="#broker-和-trigger" aria-label="Permalink to &quot;**Broker 和 Trigger**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Broker：事件路由中心</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">eventing.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Broker</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    eventing.knative.dev/broker.class</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">MTChannelBasedBroker</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-br-default-channel</span></span>
<span class="line"><span class="__shiki_17hn0y">    namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">knative-eventing</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Trigger：事件过滤器</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">eventing.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Trigger</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">order-trigger</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  broker</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">  filter</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    attributes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">com.example.order.created</span></span>
<span class="line"><span class="__shiki_17hn0y">  subscriber</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    ref</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">      kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">order-processor</span></span></code></pre></div><h3 id="_3-2-eventing-组件详解" tabindex="-1">3.2 Eventing 组件详解 <a class="header-anchor" href="#_3-2-eventing-组件详解" aria-label="Permalink to &quot;3.2 Eventing 组件详解&quot;">​</a></h3><h4 id="channel" tabindex="-1"><strong>Channel</strong> <a class="header-anchor" href="#channel" aria-label="Permalink to &quot;**Channel**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Channel 类型：</span></span>
<span class="line"><span class="__shiki_mdbnqw">1. InMemoryChannel：内存通道（开发测试）</span></span>
<span class="line"><span class="__shiki_mdbnqw">2. KafkaChannel：Apache Kafka 后端</span></span>
<span class="line"><span class="__shiki_mdbnqw">3. NatssChannel：NATS Streaming 后端</span></span>
<span class="line"><span class="__shiki_mdbnqw">4. GoogleCloudPubSubChannel：GCP Pub/Sub</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Channel 配置示例</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">messaging.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Channel</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">my-channel</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    messaging.knative.dev/subscribable</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  channelTemplate</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">messaging.knative.dev/v1alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">KafkaChannel</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      numPartitions</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">      replicationFactor</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span></code></pre></div><h4 id="subscription" tabindex="-1"><strong>Subscription</strong> <a class="header-anchor" href="#subscription" aria-label="Permalink to &quot;**Subscription**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Subscription：定义 Channel 到 Subscriber 的连接</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">messaging.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Subscription</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">my-subscription</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  channel</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">messaging.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Channel</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">my-channel</span></span>
<span class="line"><span class="__shiki_17hn0y">  subscriber</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    ref</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">      kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">message-handler</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 重试策略</span></span>
<span class="line"><span class="__shiki_17hn0y">  delivery</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    deadLetterSink</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      ref</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">        kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">dead-letter-handler</span></span>
<span class="line"><span class="__shiki_17hn0y">    retry</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_17hn0y">    backoffDelay</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;PT1S&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    backoffPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">exponential</span></span></code></pre></div><h4 id="事件源类型概览" tabindex="-1"><strong>事件源类型概览</strong> <a class="header-anchor" href="#事件源类型概览" aria-label="Permalink to &quot;**事件源类型概览**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. Kubernetes 事件源</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">ApiServerSource</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">K8s API 事件</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">ContainerSource</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">自定义容器作为事件源</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 云服务事件源</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">AwsSqsSource</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AWS SQS</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">GoogleCloudPubSubSource</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">GCP Pub/Sub</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">AzureEventHubSource</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Azure Event Hub</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 定时事件源</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">PingSource</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">定时触发事件</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. HTTP 事件源</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">GitHubSource</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">GitHub Webhook</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">GitLabSource</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">GitLab Webhook</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">BitbucketSource</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Bitbucket Webhook</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 消息队列事件源</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">KafkaSource</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Apache Kafka</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">RabbitmqSource</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">RabbitMQ</span></span></code></pre></div><h3 id="_3-3-eventing-高级模式" tabindex="-1">3.3 Eventing 高级模式 <a class="header-anchor" href="#_3-3-eventing-高级模式" aria-label="Permalink to &quot;3.3 Eventing 高级模式&quot;">​</a></h3><h4 id="事件链" tabindex="-1"><strong>事件链</strong> <a class="header-anchor" href="#事件链" aria-label="Permalink to &quot;**事件链**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 事件处理链示例</span></span>
<span class="line"><span class="__shiki_mdbnqw">Event Source → Broker → Trigger1 → Service1 → Broker → Trigger2 → Service2</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 实现复杂事件处理逻辑</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">eventing.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Trigger</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">enrichment-trigger</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  broker</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">  filter</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    attributes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">com.example.raw.event</span></span>
<span class="line"><span class="__shiki_17hn0y">  subscriber</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    ref</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">      kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">event-enricher</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">eventing.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Trigger</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">processing-trigger</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  broker</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">  filter</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    attributes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">com.example.enriched.event</span></span>
<span class="line"><span class="__shiki_17hn0y">  subscriber</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    ref</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">      kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">event-processor</span></span></code></pre></div><h4 id="事件转换" tabindex="-1"><strong>事件转换</strong> <a class="header-anchor" href="#事件转换" aria-label="Permalink to &quot;**事件转换**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用服务进行事件转换</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">event-transformer</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">event-transformer:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">        env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TRANSFORM_TYPE</span></span>
<span class="line"><span class="__shiki_17hn0y">          value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;xml-to-json&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 在 Trigger 中使用</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">eventing.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Trigger</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">transform-trigger</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  broker</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">  filter</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    attributes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      contentType</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">application/xml</span></span>
<span class="line"><span class="__shiki_17hn0y">  subscriber</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    ref</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">      kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">event-transformer</span></span></code></pre></div><hr><h2 id="第四部分-knative-安装与配置" tabindex="-1">第四部分：Knative 安装与配置 <a class="header-anchor" href="#第四部分-knative-安装与配置" aria-label="Permalink to &quot;第四部分：Knative 安装与配置&quot;">​</a></h2><h3 id="_4-1-系统要求" tabindex="-1">4.1 系统要求 <a class="header-anchor" href="#_4-1-系统要求" aria-label="Permalink to &quot;4.1 系统要求&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Kubernetes 集群要求</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> version</span><span class="__shiki_21nrsd">  # 1.20+</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> nodes</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 集群资源要求</span></span>
<span class="line"><span class="__shiki_21nrsd"># 开发环境：4 CPU，8 GB RAM</span></span>
<span class="line"><span class="__shiki_21nrsd"># 生产环境：8+ CPU，16+ GB RAM</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 网络插件要求</span></span>
<span class="line"><span class="__shiki_21nrsd"># 支持 LoadBalancer 或 NodePort</span></span></code></pre></div><h3 id="_4-2-安装-knative-serving" tabindex="-1">4.2 安装 Knative Serving <a class="header-anchor" href="#_4-2-安装-knative-serving" aria-label="Permalink to &quot;4.2 安装 Knative Serving&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 安装 Istio（网络层）</span></span>
<span class="line"><span class="__shiki_21nrsd"># 快速安装</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_mdbnqw"> knative.dev/crd-install=</span><span class="__shiki_dzsirb">true</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> https://github.com/knative/net-istio/releases/download/knative-v1.10.0/istio.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> https://github.com/knative/net-istio/releases/download/knative-v1.10.0/istio.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 安装 Knative Serving CRDs</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> https://github.com/knative/serving/releases/download/knative-v1.10.0/serving-crds.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 安装 Knative Serving 核心组件</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> https://github.com/knative/serving/releases/download/knative-v1.10.0/serving-core.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 安装网络层适配器</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> https://github.com/knative/net-istio/releases/download/knative-v1.10.0/net-istio.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 获取 ingress IP</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_dzsirb"> --namespace</span><span class="__shiki_mdbnqw"> istio-system</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> istio-ingressgateway</span></span></code></pre></div><h3 id="_4-3-安装-knative-eventing" tabindex="-1">4.3 安装 Knative Eventing <a class="header-anchor" href="#_4-3-安装-knative-eventing" aria-label="Permalink to &quot;4.3 安装 Knative Eventing&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 安装 Knative Eventing CRDs</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> https://github.com/knative/eventing/releases/download/knative-v1.10.0/eventing-crds.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 安装 Knative Eventing 核心组件</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> https://github.com/knative/eventing/releases/download/knative-v1.10.0/eventing-core.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 安装 In-Memory Channel</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> https://github.com/knative/eventing/releases/download/knative-v1.10.0/in-memory-channel.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 安装 MT-Channel-Based Broker</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> https://github.com/knative/eventing/releases/download/knative-v1.10.0/mt-channel-broker.yaml</span></span></code></pre></div><h3 id="_4-4-可选组件安装" tabindex="-1">4.4 可选组件安装 <a class="header-anchor" href="#_4-4-可选组件安装" aria-label="Permalink to &quot;4.4 可选组件安装&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 安装监控组件</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> https://github.com/knative/serving/releases/download/knative-v1.10.0/serving-default-domain.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 安装 Kafka Channel（生产推荐）</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> https://github.com/knative-sandbox/eventing-kafka-broker/releases/download/knative-v1.10.0/eventing-kafka-controller.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> https://github.com/knative-sandbox/eventing-kafka-broker/releases/download/knative-v1.10.0/eventing-kafka-source.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 安装 Knative Functions</span></span>
<span class="line"><span class="__shiki_1t8gfj">npm</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_dzsirb"> -g</span><span class="__shiki_mdbnqw"> knative-func</span><span class="__shiki_21nrsd">  # 或使用 npx</span></span></code></pre></div><h3 id="_4-5-配置自定义域名" tabindex="-1">4.5 配置自定义域名 <a class="header-anchor" href="#_4-5-配置自定义域名" aria-label="Permalink to &quot;4.5 配置自定义域名&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 配置 ConfigMap config-domain</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-domain</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">knative-serving</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 默认使用 nip.io 进行测试</span></span>
<span class="line"><span class="__shiki_17hn0y">  example.com</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">    selector:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      app: myapp</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 多域名配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;*.example.com&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  example.org</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">    selector:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      type: production</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 保留默认配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  _example</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">    ...</span></span></code></pre></div><h3 id="_4-6-配置自动-tls" tabindex="-1">4.6 配置自动 TLS <a class="header-anchor" href="#_4-6-配置自动-tls" aria-label="Permalink to &quot;4.6 配置自动 TLS&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 安装 Cert-Manager</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> https://github.com/cert-manager/cert-manager/releases/download/v1.12.0/cert-manager.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 配置 Knative 使用 Cert-Manager</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> https://github.com/knative/net-certmanager/releases/download/knative-v1.10.0/release.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建 ClusterIssuer</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> -</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">apiVersion: cert-manager.io/v1</span></span>
<span class="line"><span class="__shiki_mdbnqw">kind: ClusterIssuer</span></span>
<span class="line"><span class="__shiki_mdbnqw">metadata:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  name: letsencrypt-prod</span></span>
<span class="line"><span class="__shiki_mdbnqw">spec:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  acme:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    server: https://acme-v02.api.letsencrypt.org/directory</span></span>
<span class="line"><span class="__shiki_mdbnqw">    email: admin@example.com</span></span>
<span class="line"><span class="__shiki_mdbnqw">    privateKeySecretRef:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      name: letsencrypt-prod</span></span>
<span class="line"><span class="__shiki_mdbnqw">    solvers:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    - http01:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        ingress:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          class: istio</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span></code></pre></div><hr><h2 id="第五部分-knative-serving-实战" tabindex="-1">第五部分：Knative Serving 实战 <a class="header-anchor" href="#第五部分-knative-serving-实战" aria-label="Permalink to &quot;第五部分：Knative Serving 实战&quot;">​</a></h2><h3 id="_5-1-基本服务部署" tabindex="-1">5.1 基本服务部署 <a class="header-anchor" href="#_5-1-基本服务部署" aria-label="Permalink to &quot;5.1 基本服务部署&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 部署第一个 Knative Service</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> -</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">apiVersion: serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_mdbnqw">kind: Service</span></span>
<span class="line"><span class="__shiki_mdbnqw">metadata:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  name: hello</span></span>
<span class="line"><span class="__shiki_mdbnqw">spec:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  template:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    spec:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      containers:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - image: gcr.io/knative-samples/helloworld-go</span></span>
<span class="line"><span class="__shiki_mdbnqw">        env:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        - name: TARGET</span></span>
<span class="line"><span class="__shiki_mdbnqw">          value: &quot;Knative&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 查看服务状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> ksvc</span><span class="__shiki_mdbnqw"> hello</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> ksvc</span><span class="__shiki_mdbnqw"> hello</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 访问服务</span></span>
<span class="line"><span class="__shiki_21nrsd"># 获取服务 URL</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> ksvc</span><span class="__shiki_mdbnqw"> hello</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.status.url}&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 访问服务</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_140thh"> $(</span><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> ksvc</span><span class="__shiki_mdbnqw"> hello</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.status.url}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 查看 Revision</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> revisions</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> revision</span><span class="__shiki_mdbnqw"> hello-00001</span></span></code></pre></div><h3 id="_5-2-蓝绿部署策略" tabindex="-1">5.2 蓝绿部署策略 <a class="header-anchor" href="#_5-2-蓝绿部署策略" aria-label="Permalink to &quot;5.2 蓝绿部署策略&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 步骤1：部署初始版本</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp-v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp:v1</span></span>
<span class="line"><span class="__shiki_17hn0y">  traffic</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">percent</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_17hn0y">      revisionName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp-v1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 步骤2：部署新版本</span></span>
<span class="line"><span class="__shiki_21nrsd"># 更新服务配置</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp-v2</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp:v2</span></span>
<span class="line"><span class="__shiki_17hn0y">  traffic</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">percent</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_21nrsd">      # v2 暂不接收流量</span></span>
<span class="line"><span class="__shiki_17hn0y">      revisionName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp-v2</span></span>
<span class="line"><span class="__shiki_17hn0y">      tag</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">candidate</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">percent</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_21nrsd">    # 所有流量到 v1</span></span>
<span class="line"><span class="__shiki_17hn0y">      revisionName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp-v1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 步骤3：逐步切换流量</span></span>
<span class="line"><span class="__shiki_mdbnqw">kubectl apply -f - &lt;&lt;EOF</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  traffic</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">percent</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_21nrsd">     # 10% 流量到 v2</span></span>
<span class="line"><span class="__shiki_17hn0y">      revisionName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp-v2</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">percent</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">90</span><span class="__shiki_21nrsd">     # 90% 流量到 v1</span></span>
<span class="line"><span class="__shiki_17hn0y">      revisionName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp-v1</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 步骤4：完全切换</span></span>
<span class="line"><span class="__shiki_mdbnqw">kubectl apply -f - &lt;&lt;EOF</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  traffic</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">percent</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_21nrsd">    # 所有流量到 v2</span></span>
<span class="line"><span class="__shiki_17hn0y">      revisionName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp-v2</span></span>
<span class="line"><span class="__shiki_17hn0y">      tag</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">current</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">percent</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_21nrsd">      # v1 作为回滚备选</span></span>
<span class="line"><span class="__shiki_17hn0y">      revisionName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp-v1</span></span>
<span class="line"><span class="__shiki_17hn0y">      tag</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">previous</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span></code></pre></div><h3 id="_5-3-金丝雀发布" tabindex="-1">5.3 金丝雀发布 <a class="header-anchor" href="#_5-3-金丝雀发布" aria-label="Permalink to &quot;5.3 金丝雀发布&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基于请求头的金丝雀发布</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">canary-demo</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">canary-demo-v2</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp:v2</span></span>
<span class="line"><span class="__shiki_17hn0y">  traffic</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 规则1：特定用户组到新版本</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">revisionName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">canary-demo-v2</span></span>
<span class="line"><span class="__shiki_17hn0y">      percent</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_17hn0y">      tag</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v2</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 基于请求头的路由</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 规则2：其余流量到旧版本</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">revisionName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">canary-demo-v1</span></span>
<span class="line"><span class="__shiki_17hn0y">      percent</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_17hn0y">      tag</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span></code></pre></div><h3 id="_5-4-a-b-测试" tabindex="-1">5.4 A/B 测试 <a class="header-anchor" href="#_5-4-a-b-测试" aria-label="Permalink to &quot;5.4 A/B 测试&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用标签进行 A/B 测试</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ab-test-app</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp:variant-a</span></span>
<span class="line"><span class="__shiki_17hn0y">  traffic</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # Variant A (50%)</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">revisionName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-variant-a</span></span>
<span class="line"><span class="__shiki_17hn0y">      percent</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">50</span></span>
<span class="line"><span class="__shiki_17hn0y">      tag</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">variant-a</span></span>
<span class="line"><span class="__shiki_21nrsd">    # Variant B (50%)</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">revisionName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-variant-b</span></span>
<span class="line"><span class="__shiki_17hn0y">      percent</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">50</span></span>
<span class="line"><span class="__shiki_17hn0y">      tag</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">variant-b</span></span></code></pre></div><h3 id="_5-5-自动扩缩容配置" tabindex="-1">5.5 自动扩缩容配置 <a class="header-anchor" href="#_5-5-自动扩缩容配置" aria-label="Permalink to &quot;5.5 自动扩缩容配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 配置并发驱动的自动扩缩容</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscale-demo</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # KPA 配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    autoscaling.knative.dev/class</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kpa.autoscaling.knative.dev</span></span>
<span class="line"><span class="__shiki_17hn0y">    autoscaling.knative.dev/metric</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">concurrency</span></span>
<span class="line"><span class="__shiki_17hn0y">    autoscaling.knative.dev/target</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 扩缩容边界</span></span>
<span class="line"><span class="__shiki_17hn0y">    autoscaling.knative.dev/minScale</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    autoscaling.knative.dev/maxScale</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;20&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 扩缩容行为</span></span>
<span class="line"><span class="__shiki_17hn0y">    autoscaling.knative.dev/window</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;60s&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    autoscaling.knative.dev/scaleDownDelay</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;30s&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    autoscaling.knative.dev/scaleToZeroPodRetentionPeriod</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1m&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 扩缩容指标聚合</span></span>
<span class="line"><span class="__shiki_17hn0y">    autoscaling.knative.dev/metricAggregationAlgorithm</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;weighted-exponential&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscale-demo:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">        resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">1000m</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">512Mi</span></span></code></pre></div><h3 id="_5-6-性能测试与负载测试" tabindex="-1">5.6 性能测试与负载测试 <a class="header-anchor" href="#_5-6-性能测试与负载测试" aria-label="Permalink to &quot;5.6 性能测试与负载测试&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用 hey 进行负载测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">hey</span><span class="__shiki_dzsirb"> -z</span><span class="__shiki_mdbnqw"> 30s</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -H</span><span class="__shiki_mdbnqw"> &quot;Host: autoscale-demo.default.example.com&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  http://</span><span class="__shiki_140thh">\${INGRESS_IP}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看扩缩容指标</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> -w</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> ksvc</span><span class="__shiki_mdbnqw"> autoscale-demo</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 监控自动扩缩容</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> podautoscalers.autoscaling.internal.knative.dev</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> podautoscaler</span><span class="__shiki_mdbnqw"> autoscale-demo</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看详细指标</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> metric.autoscaling.internal.knative.dev</span></span></code></pre></div><hr><h2 id="第六部分-knative-eventing-实战" tabindex="-1">第六部分：Knative Eventing 实战 <a class="header-anchor" href="#第六部分-knative-eventing-实战" aria-label="Permalink to &quot;第六部分：Knative Eventing 实战&quot;">​</a></h2><h3 id="_6-1-基本事件流配置" tabindex="-1">6.1 基本事件流配置 <a class="header-anchor" href="#_6-1-基本事件流配置" aria-label="Permalink to &quot;6.1 基本事件流配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 创建 Broker</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">eventing.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Broker</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    eventing.knative.dev/broker.class</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">MTChannelBasedBroker</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 创建事件处理器服务</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">event-processor</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">event-processor:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 创建 Trigger</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">eventing.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Trigger</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">my-trigger</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  broker</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">  filter</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    attributes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">com.example.myevent</span></span>
<span class="line"><span class="__shiki_17hn0y">  subscriber</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    ref</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">      kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">event-processor</span></span></code></pre></div><h3 id="_6-2-定时任务-pingsource" tabindex="-1">6.2 定时任务 (PingSource) <a class="header-anchor" href="#_6-2-定时任务-pingsource" aria-label="Permalink to &quot;6.2 定时任务 (PingSource)&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 创建定时事件源</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">sources.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PingSource</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">heartbeat</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  schedule</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;*/5 * * * *&quot;</span><span class="__shiki_21nrsd">  # 每5分钟</span></span>
<span class="line"><span class="__shiki_17hn0y">  contentType</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;application/json&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  data</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;{&quot;message&quot;: &quot;Heartbeat&quot;, &quot;timestamp&quot;: &quot;{{ now }}&quot;}&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">  sink</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    ref</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">      kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">heartbeat-processor</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 验证事件发送</span></span>
<span class="line"><span class="__shiki_mdbnqw">kubectl logs -l serving.knative.dev/service=heartbeat-processor -c user-container</span></span></code></pre></div><h3 id="_6-3-kubernetes-事件监控" tabindex="-1">6.3 Kubernetes 事件监控 <a class="header-anchor" href="#_6-3-kubernetes-事件监控" aria-label="Permalink to &quot;6.3 Kubernetes 事件监控&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 创建 ServiceAccount 和权限</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ServiceAccount</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">event-watcher</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ClusterRole</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">event-watcher</span></span>
<span class="line"><span class="__shiki_17hn0y">rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">apiGroups</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  resources</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;events&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  verbs</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;get&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;list&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;watch&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ClusterRoleBinding</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">event-watcher</span></span>
<span class="line"><span class="__shiki_17hn0y">roleRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">  kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ClusterRole</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">event-watcher</span></span>
<span class="line"><span class="__shiki_17hn0y">subjects</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ServiceAccount</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">event-watcher</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 创建 ApiServerSource</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">sources.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ApiServerSource</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">k8s-events</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  serviceAccountName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">event-watcher</span></span>
<span class="line"><span class="__shiki_17hn0y">  mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Resource</span></span>
<span class="line"><span class="__shiki_17hn0y">  resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pod</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">  sink</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    ref</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">      kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">event-logger</span></span></code></pre></div><h3 id="_6-4-复杂事件处理" tabindex="-1">6.4 复杂事件处理 <a class="header-anchor" href="#_6-4-复杂事件处理" aria-label="Permalink to &quot;6.4 复杂事件处理&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 事件处理链：验证 → 丰富 → 处理 → 通知</span></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_21nrsd"># 步骤1：事件验证器</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">event-validator</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">event-validator:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_21nrsd"># 步骤2：事件丰富器</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">event-enricher</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">event-enricher:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_21nrsd"># 步骤3：事件处理器</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">event-processor</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">event-processor:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_21nrsd"># 步骤4：通知器</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">notifier</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">notifier:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_21nrsd"># 连接所有服务</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">eventing.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Trigger</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">validate-trigger</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  broker</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">  filter</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    attributes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">com.example.raw.event</span></span>
<span class="line"><span class="__shiki_17hn0y">  subscriber</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    ref</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">      kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">event-validator</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">eventing.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Trigger</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">enrich-trigger</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  broker</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">  filter</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    attributes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">com.example.validated.event</span></span>
<span class="line"><span class="__shiki_17hn0y">  subscriber</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    ref</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">      kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">event-enricher</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">eventing.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Trigger</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">process-trigger</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  broker</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">  filter</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    attributes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">com.example.enriched.event</span></span>
<span class="line"><span class="__shiki_17hn0y">  subscriber</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    ref</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">      kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">event-processor</span></span></code></pre></div><h3 id="_6-5-死信队列配置" tabindex="-1">6.5 死信队列配置 <a class="header-anchor" href="#_6-5-死信队列配置" aria-label="Permalink to &quot;6.5 死信队列配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 配置事件重试和死信队列</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">messaging.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Subscription</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">retry-subscription</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  channel</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">messaging.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Channel</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">orders-channel</span></span>
<span class="line"><span class="__shiki_17hn0y">  subscriber</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    ref</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">      kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">order-processor</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 重试策略</span></span>
<span class="line"><span class="__shiki_17hn0y">  delivery</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    deadLetterSink</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      ref</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">        kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">dead-letter-handler</span></span>
<span class="line"><span class="__shiki_17hn0y">    retry</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_21nrsd">                      # 重试次数</span></span>
<span class="line"><span class="__shiki_17hn0y">    backoffDelay</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;PT1S&quot;</span><span class="__shiki_21nrsd">          # 初始延迟 1 秒</span></span>
<span class="line"><span class="__shiki_17hn0y">    backoffPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">exponential</span><span class="__shiki_21nrsd">    # 指数退避</span></span>
<span class="line"><span class="__shiki_17hn0y">    backoffDelay</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;PT10S&quot;</span><span class="__shiki_21nrsd">         # 最大延迟 10 秒</span></span></code></pre></div><hr><h2 id="第七部分-knative-functions-可选" tabindex="-1">第七部分：Knative Functions (可选) <a class="header-anchor" href="#第七部分-knative-functions-可选" aria-label="Permalink to &quot;第七部分：Knative Functions (可选)&quot;">​</a></h2><h3 id="_7-1-函数开发" tabindex="-1">7.1 函数开发 <a class="header-anchor" href="#_7-1-函数开发" aria-label="Permalink to &quot;7.1 函数开发&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 安装 Func CLI</span></span>
<span class="line"><span class="__shiki_21nrsd"># 使用 npm</span></span>
<span class="line"><span class="__shiki_1t8gfj">npm</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_dzsirb"> -g</span><span class="__shiki_mdbnqw"> knative-func</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 或使用 brew (macOS)</span></span>
<span class="line"><span class="__shiki_1t8gfj">brew</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> func</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 创建新函数</span></span>
<span class="line"><span class="__shiki_1t8gfj">func</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_mdbnqw"> node</span><span class="__shiki_mdbnqw"> hello-function</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 查看项目结构</span></span>
<span class="line"><span class="__shiki_1t8gfj">tree</span><span class="__shiki_mdbnqw"> hello-function/</span></span>
<span class="line"><span class="__shiki_21nrsd"># hello-function/</span></span>
<span class="line"><span class="__shiki_21nrsd"># ├── func.yaml    # 函数配置</span></span>
<span class="line"><span class="__shiki_21nrsd"># ├── index.js     # 函数代码</span></span>
<span class="line"><span class="__shiki_21nrsd"># ├── package.json</span></span>
<span class="line"><span class="__shiki_21nrsd"># └── .funcignore</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 本地测试</span></span>
<span class="line"><span class="__shiki_dzsirb">cd</span><span class="__shiki_mdbnqw"> hello-function</span></span>
<span class="line"><span class="__shiki_1t8gfj">func</span><span class="__shiki_mdbnqw"> run</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 部署到集群</span></span>
<span class="line"><span class="__shiki_1t8gfj">func</span><span class="__shiki_mdbnqw"> deploy</span><span class="__shiki_dzsirb"> --registry</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">your-registr</span><span class="__shiki_140thh">y</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> --push</span></span></code></pre></div><h3 id="_7-2-函数配置" tabindex="-1">7.2 函数配置 <a class="header-anchor" href="#_7-2-函数配置" aria-label="Permalink to &quot;7.2 函数配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># func.yaml 示例</span></span>
<span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">hello-function</span></span>
<span class="line"><span class="__shiki_17hn0y">namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">runtime</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">node</span></span>
<span class="line"><span class="__shiki_17hn0y">registry</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">docker.io/username</span></span>
<span class="line"><span class="__shiki_17hn0y">image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">docker.io/username/hello-function:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">builder</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">pack</span></span>
<span class="line"><span class="__shiki_17hn0y">buildpacks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">gcr.io/paketo-buildpacks/nodejs</span></span>
<span class="line"><span class="__shiki_17hn0y">envs</span><span class="__shiki_140thh">: []</span></span>
<span class="line"><span class="__shiki_17hn0y">annotations</span><span class="__shiki_140thh">: {}</span></span>
<span class="line"><span class="__shiki_17hn0y">labels</span><span class="__shiki_140thh">: []</span></span>
<span class="line"><span class="__shiki_17hn0y">options</span><span class="__shiki_140thh">: {}</span></span>
<span class="line"><span class="__shiki_17hn0y">healthEndpoints</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  liveness</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/health/liveness</span></span>
<span class="line"><span class="__shiki_17hn0y">  readiness</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/health/readiness</span></span></code></pre></div><h3 id="_7-3-函数模板" tabindex="-1">7.3 函数模板 <a class="header-anchor" href="#_7-3-函数模板" aria-label="Permalink to &quot;7.3 函数模板&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Node.js 函数模板</span></span>
<span class="line"><span class="__shiki_dzsirb">module</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">exports</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 处理 HTTP 请求</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (context.method </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;GET&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      status: </span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      headers: { </span><span class="__shiki_mdbnqw">&#39;Content-Type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;application/json&#39;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">      body: { message: </span><span class="__shiki_mdbnqw">&#39;Hello from Function!&#39;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 处理 CloudEvent</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (context.cloudevent) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Received event:&#39;</span><span class="__shiki_140thh">, context.cloudevent);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      status: </span><span class="__shiki_dzsirb">202</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      body: </span><span class="__shiki_mdbnqw">&#39;Event processed&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    status: </span><span class="__shiki_dzsirb">400</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    body: </span><span class="__shiki_mdbnqw">&#39;Bad Request&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><hr><h2 id="第八部分-监控、日志与调试" tabindex="-1">第八部分：监控、日志与调试 <a class="header-anchor" href="#第八部分-监控、日志与调试" aria-label="Permalink to &quot;第八部分：监控、日志与调试&quot;">​</a></h2><h3 id="_8-1-监控配置" tabindex="-1">8.1 监控配置 <a class="header-anchor" href="#_8-1-监控配置" aria-label="Permalink to &quot;8.1 监控配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 安装 Knative 监控组件</span></span>
<span class="line"><span class="__shiki_mdbnqw">kubectl apply -f https://github.com/knative/serving/releases/download/knative-v1.10.0/monitoring-core.yaml</span></span>
<span class="line"><span class="__shiki_mdbnqw">kubectl apply -f https://github.com/knative/serving/releases/download/knative-v1.10.0/monitoring-metrics-prometheus.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 配置 Prometheus</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">monitoring.coreos.com/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ServiceMonitor</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">knative-serving</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">knative-serving</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">activator</span></span>
<span class="line"><span class="__shiki_17hn0y">  endpoints</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">port</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http-metrics</span></span>
<span class="line"><span class="__shiki_17hn0y">    interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10s</span></span></code></pre></div><h3 id="_8-2-关键指标" tabindex="-1">8.2 关键指标 <a class="header-anchor" href="#_8-2-关键指标" aria-label="Permalink to &quot;8.2 关键指标&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">. 请求指标</span></span>
<span class="line"><span class="__shiki_140thh">knative_activator_request_count</span></span>
<span class="line"><span class="__shiki_140thh">knative_activator_request_latencies</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">. 自动扩缩容指标</span></span>
<span class="line"><span class="__shiki_140thh">autoscaler_actual_pods</span></span>
<span class="line"><span class="__shiki_140thh">autoscaler_desired_pods</span></span>
<span class="line"><span class="__shiki_140thh">autoscaler_excess_burst_capacity</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">. Revision 指标</span></span>
<span class="line"><span class="__shiki_140thh">revision_app_request_count</span></span>
<span class="line"><span class="__shiki_140thh">revision_app_request_latencies</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># </span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">. 队列指标</span></span>
<span class="line"><span class="__shiki_140thh">queue_requests_per_second</span></span>
<span class="line"><span class="__shiki_140thh">queue_average_concurrent_requests</span></span></code></pre></div><h3 id="_8-3-日志收集" tabindex="-1">8.3 日志收集 <a class="header-anchor" href="#_8-3-日志收集" aria-label="Permalink to &quot;8.3 日志收集&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 查看服务日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_mdbnqw"> serving.knative.dev/service=my-service</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_mdbnqw"> user-container</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看 Revision 日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_mdbnqw"> serving.knative.dev/revisionUID=</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_mdbnqw">revision-ui</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_mdbnqw"> user-container</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看 Activator 日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_mdbnqw"> app=activator</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> knative-serving</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看 Autoscaler 日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_mdbnqw"> app=autoscaler</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> knative-serving</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 启用详细日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> edit</span><span class="__shiki_mdbnqw"> configmap</span><span class="__shiki_mdbnqw"> config-logging</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> knative-serving</span></span></code></pre></div><h3 id="_8-4-调试工具" tabindex="-1">8.4 调试工具 <a class="header-anchor" href="#_8-4-调试工具" aria-label="Permalink to &quot;8.4 调试工具&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 检查 Knative 组件状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> knative-serving</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> knative-eventing</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 检查服务状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> ksvc</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> ksvc</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">service-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 检查 Revision 状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> revisions</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> revision</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">revision-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 检查路由状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> routes</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> route</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">route-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 检查事件源状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pingsources</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> apiserversources</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> triggers</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 6. 检查网络配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> svc</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> istio-system</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> gateway</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> istio-system</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 7. 端口转发调试</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> port-forward</span><span class="__shiki_mdbnqw"> svc/activator-service</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> knative-serving</span><span class="__shiki_dzsirb"> 8080</span></span></code></pre></div><h3 id="_8-5-常见问题排查" tabindex="-1">8.5 常见问题排查 <a class="header-anchor" href="#_8-5-常见问题排查" aria-label="Permalink to &quot;8.5 常见问题排查&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 问题1：服务状态为 Unknown</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> ksvc</span><span class="__shiki_mdbnqw"> problem-service</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> events</span><span class="__shiki_dzsirb"> --field-selector</span><span class="__shiki_mdbnqw"> involvedObject.name=problem-service</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 问题2：Revision 无法启动</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> revision</span><span class="__shiki_mdbnqw"> problem-revision</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_mdbnqw"> user-container</span><span class="__shiki_dzsirb"> --previous</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 问题3：自动扩缩容不工作</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> podautoscaler</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pa-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> metric</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 问题4：事件未传递</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> broker</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> trigger</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">trigger-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">event-display-po</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 问题5：域名无法解析</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> configmap</span><span class="__shiki_mdbnqw"> config-domain</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> knative-serving</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> certificate</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> istio-system</span></span></code></pre></div><hr><h2 id="第九部分-生产环境最佳实践" tabindex="-1">第九部分：生产环境最佳实践 <a class="header-anchor" href="#第九部分-生产环境最佳实践" aria-label="Permalink to &quot;第九部分：生产环境最佳实践&quot;">​</a></h2><h3 id="_9-1-安全配置" tabindex="-1">9.1 安全配置 <a class="header-anchor" href="#_9-1-安全配置" aria-label="Permalink to &quot;9.1 安全配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 网络策略</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">knative-serving-policy</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">knative-serving</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  podSelector</span><span class="__shiki_140thh">: {}</span></span>
<span class="line"><span class="__shiki_17hn0y">  policyTypes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Egress</span></span>
<span class="line"><span class="__shiki_17hn0y">  ingress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">namespaceSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          knative.dev/namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">  egress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">namespaceSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          knative.dev/namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 服务账户权限</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ServiceAccount</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">least-privilege-sa</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    iam.gke.io/gcp-service-account</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">minimal-sa@project.iam.gserviceaccount.com</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 安全上下文</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      securityContext</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        runAsNonRoot</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">        runAsUser</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1000</span></span>
<span class="line"><span class="__shiki_17hn0y">        fsGroup</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2000</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">securityContext</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          allowPrivilegeEscalation</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">          capabilities</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            drop</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            - </span><span class="__shiki_mdbnqw">ALL</span></span></code></pre></div><h3 id="_9-2-性能优化" tabindex="-1">9.2 性能优化 <a class="header-anchor" href="#_9-2-性能优化" aria-label="Permalink to &quot;9.2 性能优化&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 冷启动优化</span></span>
<span class="line"><span class="__shiki_17hn0y">annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  autoscaling.knative.dev/minScale</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1&quot;</span><span class="__shiki_21nrsd">  # 保持至少一个副本</span></span>
<span class="line"><span class="__shiki_17hn0y">  autoscaling.knative.dev/scaleToZeroGracePeriod</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;5m&quot;</span><span class="__shiki_21nrsd">  # 延长关闭时间</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 容器镜像优化</span></span>
<span class="line"><span class="__shiki_21nrsd"># 使用小基础镜像</span></span>
<span class="line"><span class="__shiki_mdbnqw">FROM gcr.io/distroless/base-debian10</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 多阶段构建</span></span>
<span class="line"><span class="__shiki_mdbnqw">FROM golang:1.19 as builder</span></span>
<span class="line"><span class="__shiki_mdbnqw">WORKDIR /app</span></span>
<span class="line"><span class="__shiki_mdbnqw">COPY . .</span></span>
<span class="line"><span class="__shiki_mdbnqw">RUN CGO_ENABLED=0 GOOS=linux go build -o server</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">FROM gcr.io/distroless/base-debian10</span></span>
<span class="line"><span class="__shiki_mdbnqw">COPY --from=builder /app/server /server</span></span>
<span class="line"><span class="__shiki_mdbnqw">CMD [&quot;/server&quot;]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 资源限制优化</span></span>
<span class="line"><span class="__shiki_17hn0y">resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;128Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;500m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;512Mi&quot;</span></span></code></pre></div><h3 id="_9-3-高可用配置" tabindex="-1">9.3 高可用配置 <a class="header-anchor" href="#_9-3-高可用配置" aria-label="Permalink to &quot;9.3 高可用配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 多副本部署</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">activator</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">knative-serving</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">  strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">RollingUpdate</span></span>
<span class="line"><span class="__shiki_17hn0y">    rollingUpdate</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      maxUnavailable</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">      maxSurge</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 多可用区分布</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      affinity</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        podAntiAffinity</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          requiredDuringSchedulingIgnoredDuringExecution</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">labelSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">              matchExpressions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">              - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app</span></span>
<span class="line"><span class="__shiki_17hn0y">                operator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">In</span></span>
<span class="line"><span class="__shiki_17hn0y">                values</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                - </span><span class="__shiki_mdbnqw">activator</span></span>
<span class="line"><span class="__shiki_17hn0y">            topologyKey</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">topology.kubernetes.io/zone</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 健康检查配置</span></span>
<span class="line"><span class="__shiki_17hn0y">livenessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  httpGet</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/healthz</span></span>
<span class="line"><span class="__shiki_17hn0y">    port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_17hn0y">  initialDelaySeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">20</span></span>
<span class="line"><span class="__shiki_17hn0y">  periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_17hn0y">  timeoutSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_17hn0y">  failureThreshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">readinessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  httpGet</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/ready</span></span>
<span class="line"><span class="__shiki_17hn0y">    port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_17hn0y">  initialDelaySeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_17hn0y">  periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_17hn0y">  timeoutSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_17hn0y">  successThreshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">  failureThreshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span></code></pre></div><h3 id="_9-4-ci-cd-集成" tabindex="-1">9.4 CI/CD 集成 <a class="header-anchor" href="#_9-4-ci-cd-集成" aria-label="Permalink to &quot;9.4 CI/CD 集成&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># GitHub Actions 示例</span></span>
<span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deploy to Knative</span></span>
<span class="line"><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  push</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    branches</span><span class="__shiki_140thh">: [ </span><span class="__shiki_mdbnqw">main</span><span class="__shiki_140thh"> ]</span></span>
<span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  build-and-deploy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v3</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Set up Docker Buildx</span></span>
<span class="line"><span class="__shiki_17hn0y">      uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">docker/setup-buildx-action@v2</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Login to Container Registry</span></span>
<span class="line"><span class="__shiki_17hn0y">      uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">docker/login-action@v2</span></span>
<span class="line"><span class="__shiki_17hn0y">      with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        registry</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.REGISTRY_URL }}</span></span>
<span class="line"><span class="__shiki_17hn0y">        username</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.REGISTRY_USERNAME }}</span></span>
<span class="line"><span class="__shiki_17hn0y">        password</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.REGISTRY_PASSWORD }}</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Build and push</span></span>
<span class="line"><span class="__shiki_17hn0y">      uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">docker/build-push-action@v4</span></span>
<span class="line"><span class="__shiki_17hn0y">      with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        context</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">.</span></span>
<span class="line"><span class="__shiki_17hn0y">        push</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">        tags</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.REGISTRY_URL }}/myapp:\${{ github.sha }}</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deploy to Knative</span></span>
<span class="line"><span class="__shiki_17hn0y">      run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">        kubectl set image ksvc/myapp \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">          myapp=\${{ secrets.REGISTRY_URL }}/myapp:\${{ github.sha }} \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">          -n default</span></span>
<span class="line"><span class="__shiki_17hn0y">      env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        KUBECONFIG</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.KUBECONFIG }}</span></span></code></pre></div><h3 id="_9-5-成本优化" tabindex="-1">9.5 成本优化 <a class="header-anchor" href="#_9-5-成本优化" aria-label="Permalink to &quot;9.5 成本优化&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 适当的扩缩容配置</span></span>
<span class="line"><span class="__shiki_17hn0y">annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  autoscaling.knative.dev/target</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10&quot;</span><span class="__shiki_21nrsd">          # 根据应用调整</span></span>
<span class="line"><span class="__shiki_17hn0y">  autoscaling.knative.dev/window</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;120s&quot;</span><span class="__shiki_21nrsd">        # 延长稳定窗口</span></span>
<span class="line"><span class="__shiki_17hn0y">  autoscaling.knative.dev/scaleDownDelay</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;5m&quot;</span><span class="__shiki_21nrsd">  # 延迟缩减</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 资源请求优化</span></span>
<span class="line"><span class="__shiki_17hn0y">resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;50m&quot;</span><span class="__shiki_21nrsd">    # 根据实际需求设置</span></span>
<span class="line"><span class="__shiki_17hn0y">    memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;64Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;200m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;256Mi&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 使用 Spot 实例</span></span>
<span class="line"><span class="__shiki_21nrsd"># 通过节点选择器使用成本更低的节点</span></span>
<span class="line"><span class="__shiki_17hn0y">nodeSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  cloud.google.com/gke-spot</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 或</span></span>
<span class="line"><span class="__shiki_17hn0y">  eks.amazonaws.com/capacityType</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">SPOT</span></span></code></pre></div><hr><h2 id="第十部分-生态系统与集成" tabindex="-1">第十部分：生态系统与集成 <a class="header-anchor" href="#第十部分-生态系统与集成" aria-label="Permalink to &quot;第十部分：生态系统与集成&quot;">​</a></h2><h3 id="_10-1-与其他技术集成" tabindex="-1">10.1 与其他技术集成 <a class="header-anchor" href="#_10-1-与其他技术集成" aria-label="Permalink to &quot;10.1 与其他技术集成&quot;">​</a></h3><h4 id="与-tekton-集成" tabindex="-1"><strong>与 Tekton 集成</strong> <a class="header-anchor" href="#与-tekton-集成" aria-label="Permalink to &quot;**与 Tekton 集成**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Tekton Pipeline 触发 Knative 部署</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">tekton.dev/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PipelineRun</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">build-and-deploy-pipeline</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  pipelineRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">build-and-deploy</span></span>
<span class="line"><span class="__shiki_17hn0y">  params</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">image-url</span></span>
<span class="line"><span class="__shiki_17hn0y">    value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gcr.io/my-project/myapp:latest</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">service-name</span></span>
<span class="line"><span class="__shiki_17hn0y">    value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 在 Pipeline 中部署到 Knative</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">tekton.dev/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Task</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deploy-to-knative</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  params</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">image</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">service</span></span>
<span class="line"><span class="__shiki_17hn0y">  steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deploy</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gcr.io/cloud-builders/kubectl</span></span>
<span class="line"><span class="__shiki_17hn0y">    script</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      kubectl apply -f - &lt;&lt;EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">      apiVersion: serving.knative.dev/v1</span></span>
<span class="line"><span class="__shiki_mdbnqw">      kind: Service</span></span>
<span class="line"><span class="__shiki_mdbnqw">      metadata:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        name: $(params.service)</span></span>
<span class="line"><span class="__shiki_mdbnqw">      spec:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        template:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          spec:</span></span>
<span class="line"><span class="__shiki_mdbnqw">            containers:</span></span>
<span class="line"><span class="__shiki_mdbnqw">            - image: $(params.image)</span></span>
<span class="line"><span class="__shiki_mdbnqw">      EOF</span></span></code></pre></div><h4 id="与-argocd-集成" tabindex="-1"><strong>与 ArgoCD 集成</strong> <a class="header-anchor" href="#与-argocd-集成" aria-label="Permalink to &quot;**与 ArgoCD 集成**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># GitOps 方式管理 Knative 服务</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">argoproj.io/v1alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Application</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">knative-app</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  project</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">  source</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    repoURL</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">https://github.com/myorg/myapp.git</span></span>
<span class="line"><span class="__shiki_17hn0y">    targetRevision</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HEAD</span></span>
<span class="line"><span class="__shiki_17hn0y">    path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">knative/</span></span>
<span class="line"><span class="__shiki_17hn0y">    directory</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      include</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;*.yaml&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  destination</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    server</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">https://kubernetes.default.svc</span></span>
<span class="line"><span class="__shiki_17hn0y">    namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">  syncPolicy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    automated</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      prune</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">      selfHeal</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span></code></pre></div><h3 id="_10-2-云平台集成" tabindex="-1">10.2 云平台集成 <a class="header-anchor" href="#_10-2-云平台集成" aria-label="Permalink to &quot;10.2 云平台集成&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Google Cloud Run for Anthos</span></span>
<span class="line"><span class="__shiki_1t8gfj">gcloud</span><span class="__shiki_mdbnqw"> beta</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_mdbnqw"> deploy</span><span class="__shiki_mdbnqw"> my-service</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --image</span><span class="__shiki_mdbnqw"> gcr.io/my-project/myapp</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --platform</span><span class="__shiki_mdbnqw"> gke</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --cluster</span><span class="__shiki_mdbnqw"> my-cluster</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --cluster-location</span><span class="__shiki_mdbnqw"> us-central1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># AWS App Runner (类似服务)</span></span>
<span class="line"><span class="__shiki_1t8gfj">aws</span><span class="__shiki_mdbnqw"> apprunner</span><span class="__shiki_mdbnqw"> create-service</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --service-name</span><span class="__shiki_mdbnqw"> my-service</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --source-configuration</span><span class="__shiki_mdbnqw"> file://apprunner.json</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Azure Container Apps</span></span>
<span class="line"><span class="__shiki_1t8gfj">az</span><span class="__shiki_mdbnqw"> containerapp</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> myapp</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --resource-group</span><span class="__shiki_mdbnqw"> my-rg</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --image</span><span class="__shiki_mdbnqw"> myregistry.azurecr.io/myapp:latest</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --target-port</span><span class="__shiki_dzsirb"> 80</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --ingress</span><span class="__shiki_mdbnqw"> external</span></span></code></pre></div><hr><h2 id="总结对比表" tabindex="-1">总结对比表 <a class="header-anchor" href="#总结对比表" aria-label="Permalink to &quot;总结对比表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>特性</th><th>传统 Kubernetes</th><th>Knative</th><th>FaaS (Lambda)</th></tr></thead><tbody><tr><td><strong>部署单元</strong></td><td>Pod/Deployment</td><td>Service (Container)</td><td>Function</td></tr><tr><td><strong>伸缩粒度</strong></td><td>Pod 级别</td><td>请求级别</td><td>函数级别</td></tr><tr><td><strong>冷启动</strong></td><td>无</td><td>有（Scale-to-Zero）</td><td>有</td></tr><tr><td><strong>计费模型</strong></td><td>按节点/资源</td><td>按请求/使用量</td><td>按请求/执行时间</td></tr><tr><td><strong>事件集成</strong></td><td>需要额外配置</td><td>内置 Eventing</td><td>内置触发器</td></tr><tr><td><strong>网络管理</strong></td><td>Service/Ingress</td><td>自动域名 + TLS</td><td>API Gateway</td></tr><tr><td><strong>运维复杂度</strong></td><td>高</td><td>中</td><td>低</td></tr><tr><td><strong>可移植性</strong></td><td>高（多云）</td><td>高（K8s 标准）</td><td>低（厂商锁定）</td></tr></tbody></table><hr><h2 id="学习路线建议" tabindex="-1">学习路线建议 <a class="header-anchor" href="#学习路线建议" aria-label="Permalink to &quot;学习路线建议&quot;">​</a></h2><h3 id="初级阶段-1-2周" tabindex="-1">初级阶段（1-2周） <a class="header-anchor" href="#初级阶段-1-2周" aria-label="Permalink to &quot;初级阶段（1-2周）&quot;">​</a></h3><ol><li>理解 Serverless 概念和 Knative 架构</li><li>安装 Knative 并部署第一个服务</li><li>掌握 Knative Serving 基础：Service、Revision、Route</li><li>实践基本流量管理和自动扩缩容</li></ol><h3 id="中级阶段-2-3周" tabindex="-1">中级阶段（2-3周） <a class="header-anchor" href="#中级阶段-2-3周" aria-label="Permalink to &quot;中级阶段（2-3周）&quot;">​</a></h3><ol><li>掌握 Knative Eventing：Broker、Trigger、Event Source</li><li>实践蓝绿部署、金丝雀发布等部署策略</li><li>配置 TLS、域名、认证等生产特性</li><li>集成监控和日志系统</li></ol><h3 id="高级阶段-3-4周" tabindex="-1">高级阶段（3-4周） <a class="header-anchor" href="#高级阶段-3-4周" aria-label="Permalink to &quot;高级阶段（3-4周）&quot;">​</a></h3><ol><li>深入理解 Knative 内部架构和扩展机制</li><li>设计复杂的事件驱动架构</li><li>性能调优和成本优化</li><li>多集群部署和灾难恢复</li></ol><h3 id="专家阶段-持续" tabindex="-1">专家阶段（持续） <a class="header-anchor" href="#专家阶段-持续" aria-label="Permalink to &quot;专家阶段（持续）&quot;">​</a></h3><ol><li>贡献 Knative 社区</li><li>开发自定义事件源和扩展</li><li>大规模生产环境运维</li><li>与其他云原生技术深度集成</li></ol><hr><p><strong>生产环境检查清单</strong>：</p><ul><li>[ ] Knative 组件高可用配置</li><li>[ ] 自动 TLS 证书管理</li><li>[ ] 监控告警系统集成</li><li>[ ] 网络策略和安全配置</li><li>[ ] 备份和恢复流程</li><li>[ ] 成本监控和优化</li><li>[ ] 团队培训和文档</li><li>[ ] 灾难恢复计划</li></ul><p><strong>推荐学习资源</strong>：</p><ul><li>官方文档：<a href="https://knative.dev/docs/" target="_blank" rel="noreferrer">https://knative.dev/docs/</a></li><li>GitHub：<a href="https://github.com/knative" target="_blank" rel="noreferrer">https://github.com/knative</a></li><li>示例仓库：<a href="https://github.com/knative-samples" target="_blank" rel="noreferrer">https://github.com/knative-samples</a></li><li>社区：Knative Slack (#knative 频道)</li></ul><p>通过系统学习 Knative，您将能够构建现代化、事件驱动的 Serverless 应用，充分利用 Kubernetes 生态系统，同时享受 Serverless 的弹性、自动化和成本优势。</p>`,166)])])}const o=a(_,[["render",l]]);export{r as __pageData,o as default};
