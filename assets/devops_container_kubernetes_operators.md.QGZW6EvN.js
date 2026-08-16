import{_ as a,o as n,c as _,a as p}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"Kubernetes Operator 开发模式 深度解析","description":"","frontmatter":{},"headers":[],"relativePath":"devops/container/kubernetes/operators.md","filePath":"devops/container/kubernetes/operators.md"}'),i={name:"devops/container/kubernetes/operators.md"};function l(h,s,t,c,e,k){return n(),_("div",null,[...s[0]||(s[0]=[p(`<h1 id="kubernetes-operator-开发模式-深度解析" tabindex="-1">Kubernetes Operator 开发模式 深度解析 <a class="header-anchor" href="#kubernetes-operator-开发模式-深度解析" aria-label="Permalink to &quot;Kubernetes Operator 开发模式 深度解析&quot;">​</a></h1><h2 id="一、operator-模式基础理论" tabindex="-1">一、Operator 模式基础理论 <a class="header-anchor" href="#一、operator-模式基础理论" aria-label="Permalink to &quot;一、Operator 模式基础理论&quot;">​</a></h2><h3 id="_1-1-operator-模式的定义与演进" tabindex="-1">1.1 Operator 模式的定义与演进 <a class="header-anchor" href="#_1-1-operator-模式的定义与演进" aria-label="Permalink to &quot;1.1 Operator 模式的定义与演进&quot;">​</a></h3><h4 id="核心概念" tabindex="-1">核心概念： <a class="header-anchor" href="#核心概念" aria-label="Permalink to &quot;核心概念：&quot;">​</a></h4><p>Operator 是将<strong>运维知识代码化</strong>的 Kubernetes 扩展模式，通过自定义资源（CR）和自定义控制器（Controller）自动化复杂应用的整个生命周期管理。</p><h4 id="演进历程" tabindex="-1">演进历程： <a class="header-anchor" href="#演进历程" aria-label="Permalink to &quot;演进历程：&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">手动运维 → 脚本化运维 → 配置管理工具 → Kubernetes原生资源 → Operator模式</span></span>
<span class="line"><span class="__shiki_wvjl67">    2016年CoreOS首次提出Operator概念</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">Kubernetes原生扩展能力 + 领域专业知识 = Operator</span></span></code></pre></div><h4 id="为什么需要operator" tabindex="-1">为什么需要Operator？ <a class="header-anchor" href="#为什么需要operator" aria-label="Permalink to &quot;为什么需要Operator？&quot;">​</a></h4><ul><li><strong>有状态应用复杂性</strong>：数据库、消息队列等需要特定运维知识</li><li><strong>生命周期管理</strong>：安装、配置、备份、升级、故障恢复等</li><li><strong>一致性保证</strong>：确保应用状态与期望状态一致</li><li><strong>知识传承</strong>：将专家运维经验编码为可重复使用的软件</li></ul><h3 id="_1-2-operator-架构模式" tabindex="-1">1.2 Operator 架构模式 <a class="header-anchor" href="#_1-2-operator-架构模式" aria-label="Permalink to &quot;1.2 Operator 架构模式&quot;">​</a></h3><h4 id="基本组件" tabindex="-1">基本组件： <a class="header-anchor" href="#基本组件" aria-label="Permalink to &quot;基本组件：&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                Kubernetes Cluster                │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│   Custom Resource (CR)   │   Custom Controller  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ┌──────────────────┐   │   ┌──────────────┐   │</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │  MyApp CR        │   │   │  Reconciler  │   │</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │  spec: {...}     │◄──┼───┤  逻辑        │   │</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │  status: {...}   │───┼──►│              │   │</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └──────────────────┘   │   └──────────────┘   │</span></span>
<span class="line"><span class="__shiki_wvjl67">│                          │           │           │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌──────────────────┐    │   ┌──────▼──────┐    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  Native K8s      │    │   │ K8s API     │    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  Resources       │◄───┼───┤  Client     │    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  (Deployments,   │    │   │             │    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │   Services, etc) │    │   └──────────────┘    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └──────────────────┘    │           │           │</span></span>
<span class="line"><span class="__shiki_wvjl67">│                          │   ┌──────▼──────┐    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│                          │   │ 领域知识     │    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│                          │   │ 引擎        │    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│                          │   └──────────────┘    │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────┘</span></span></code></pre></div><h2 id="二、operator-开发框架对比" tabindex="-1">二、Operator 开发框架对比 <a class="header-anchor" href="#二、operator-开发框架对比" aria-label="Permalink to &quot;二、Operator 开发框架对比&quot;">​</a></h2><h3 id="_2-1-主流框架概览" tabindex="-1">2.1 主流框架概览 <a class="header-anchor" href="#_2-1-主流框架概览" aria-label="Permalink to &quot;2.1 主流框架概览&quot;">​</a></h3><table tabindex="0"><thead><tr><th>框架</th><th>维护方</th><th>语言</th><th>特点</th><th>适用场景</th></tr></thead><tbody><tr><td>Operator SDK</td><td>Red Hat (CNCF)</td><td>Go/Ansible/Helm</td><td>功能全面，生态丰富</td><td>企业级Operator</td></tr><tr><td>Kubebuilder</td><td>Kubernetes SIGs</td><td>Go</td><td>官方推荐，集成度高</td><td>核心K8s扩展</td></tr><tr><td>KUDO</td><td>D2iQ</td><td>YAML/声明式</td><td>无需编码，声明式</td><td>快速原型</td></tr><tr><td>Kopf</td><td>社区驱动</td><td>Python</td><td>简单灵活，Python生态</td><td>中小型项目</td></tr><tr><td>Java Operator SDK</td><td>Red Hat</td><td>Java</td><td>Java生态集成</td><td>Java团队</td></tr></tbody></table><h3 id="_2-2-框架选择决策矩阵" tabindex="-1">2.2 框架选择决策矩阵 <a class="header-anchor" href="#_2-2-框架选择决策矩阵" aria-label="Permalink to &quot;2.2 框架选择决策矩阵&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">项目需求 → 是否需要复杂业务逻辑？</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">是 → 团队技术栈？</span></span>
<span class="line"><span class="__shiki_wvjl67">        ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">        Go → Operator SDK 或 Kubebuilder</span></span>
<span class="line"><span class="__shiki_wvjl67">        ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">        Java → Java Operator SDK</span></span>
<span class="line"><span class="__shiki_wvjl67">        ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">        Python → Kopf</span></span>
<span class="line"><span class="__shiki_wvjl67">        ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">        运维团队 → Ansible Operator</span></span>
<span class="line"><span class="__shiki_wvjl67">        ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">        快速验证 → Helm Operator 或 KUDO</span></span></code></pre></div><h2 id="三、kubebuilder-深度开发指南" tabindex="-1">三、Kubebuilder 深度开发指南 <a class="header-anchor" href="#三、kubebuilder-深度开发指南" aria-label="Permalink to &quot;三、Kubebuilder 深度开发指南&quot;">​</a></h2><h3 id="_3-1-项目初始化与架构" tabindex="-1">3.1 项目初始化与架构 <a class="header-anchor" href="#_3-1-项目初始化与架构" aria-label="Permalink to &quot;3.1 项目初始化与架构&quot;">​</a></h3><h4 id="环境准备" tabindex="-1">环境准备： <a class="header-anchor" href="#环境准备" aria-label="Permalink to &quot;环境准备：&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 安装必备工具</span></span>
<span class="line"><span class="__shiki_21nrsd"># Kubebuilder</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -L</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> kubebuilder</span><span class="__shiki_mdbnqw"> https://go.kubebuilder.io/dl/latest/</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">go</span><span class="__shiki_mdbnqw"> env</span><span class="__shiki_mdbnqw"> GOOS</span><span class="__shiki_140thh">)</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">go</span><span class="__shiki_mdbnqw"> env</span><span class="__shiki_mdbnqw"> GOARCH</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">chmod</span><span class="__shiki_mdbnqw"> +x</span><span class="__shiki_mdbnqw"> kubebuilder</span><span class="__shiki_140thh"> &amp;&amp; </span><span class="__shiki_1t8gfj">mv</span><span class="__shiki_mdbnqw"> kubebuilder</span><span class="__shiki_mdbnqw"> /usr/local/bin/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Kustomize</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_mdbnqw"> &quot;https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> bash</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Controller-gen</span></span>
<span class="line"><span class="__shiki_1t8gfj">go</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> sigs.k8s.io/controller-tools/cmd/controller-gen@latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 验证安装</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubebuilder</span><span class="__shiki_mdbnqw"> version</span></span></code></pre></div><h4 id="项目创建" tabindex="-1">项目创建： <a class="header-anchor" href="#项目创建" aria-label="Permalink to &quot;项目创建：&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 创建项目目录结构</span></span>
<span class="line"><span class="__shiki_1t8gfj">mkdir</span><span class="__shiki_mdbnqw"> my-operator</span><span class="__shiki_140thh"> &amp;&amp; </span><span class="__shiki_dzsirb">cd</span><span class="__shiki_mdbnqw"> my-operator</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 初始化项目</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubebuilder</span><span class="__shiki_mdbnqw"> init</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --domain</span><span class="__shiki_mdbnqw"> example.com</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --repo</span><span class="__shiki_mdbnqw"> github.com/example/my-operator</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --project-version</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --plugins</span><span class="__shiki_mdbnqw"> go/v3</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建API（自定义资源）</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubebuilder</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_mdbnqw"> api</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --group</span><span class="__shiki_mdbnqw"> database</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --version</span><span class="__shiki_mdbnqw"> v1alpha1</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --kind</span><span class="__shiki_mdbnqw"> MySQLCluster</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --resource</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --controller</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --make</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --namespaced</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建Webhook（可选）</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubebuilder</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_mdbnqw"> webhook</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --group</span><span class="__shiki_mdbnqw"> database</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --version</span><span class="__shiki_mdbnqw"> v1alpha1</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --kind</span><span class="__shiki_mdbnqw"> MySQLCluster</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --defaulting</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --programmatic-validation</span></span></code></pre></div><h3 id="_3-2-自定义资源-crd-设计" tabindex="-1">3.2 自定义资源（CRD）设计 <a class="header-anchor" href="#_3-2-自定义资源-crd-设计" aria-label="Permalink to &quot;3.2 自定义资源（CRD）设计&quot;">​</a></h3><h4 id="完整crd定义示例" tabindex="-1">完整CRD定义示例： <a class="header-anchor" href="#完整crd定义示例" aria-label="Permalink to &quot;完整CRD定义示例：&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// api/v1alpha1/mysqlcluster_types.go</span></span>
<span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> v1alpha1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">	corev1 </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">k8s.io/api/core/v1</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">	metav1 </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">k8s.io/apimachinery/pkg/apis/meta/v1</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// MySQLClusterSpec 定义期望状态</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> MySQLClusterSpec</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 副本数</span></span>
<span class="line"><span class="__shiki_21nrsd">	// +kubebuilder:validation:Minimum=1</span></span>
<span class="line"><span class="__shiki_21nrsd">	// +kubebuilder:default=3</span></span>
<span class="line"><span class="__shiki_140thh">	Replicas </span><span class="__shiki_1itgoe">int32</span><span class="__shiki_mdbnqw"> \`json:&quot;replicas,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// MySQL版本</span></span>
<span class="line"><span class="__shiki_21nrsd">	// +kubebuilder:validation:Pattern=\`^8\\.0\\.[0-9]+$\`</span></span>
<span class="line"><span class="__shiki_140thh">	Version </span><span class="__shiki_1itgoe">string</span><span class="__shiki_mdbnqw"> \`json:&quot;version&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 存储配置</span></span>
<span class="line"><span class="__shiki_140thh">	Storage </span><span class="__shiki_1t8gfj">StorageSpec</span><span class="__shiki_mdbnqw"> \`json:&quot;storage&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 资源配置</span></span>
<span class="line"><span class="__shiki_140thh">	Resources </span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ResourceRequirements</span><span class="__shiki_mdbnqw"> \`json:&quot;resources,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 备份配置</span></span>
<span class="line"><span class="__shiki_140thh">	Backup </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">BackupSpec</span><span class="__shiki_mdbnqw"> \`json:&quot;backup,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 监控配置</span></span>
<span class="line"><span class="__shiki_140thh">	Monitoring </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MonitoringSpec</span><span class="__shiki_mdbnqw"> \`json:&quot;monitoring,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 高可用配置</span></span>
<span class="line"><span class="__shiki_140thh">	HighAvailability </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">HighAvailabilitySpec</span><span class="__shiki_mdbnqw"> \`json:&quot;highAvailability,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 网络配置</span></span>
<span class="line"><span class="__shiki_140thh">	Network </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">NetworkSpec</span><span class="__shiki_mdbnqw"> \`json:&quot;network,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 安全配置</span></span>
<span class="line"><span class="__shiki_140thh">	Security </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">SecuritySpec</span><span class="__shiki_mdbnqw"> \`json:&quot;security,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// StorageSpec 存储配置</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> StorageSpec</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 存储大小</span></span>
<span class="line"><span class="__shiki_21nrsd">	// +kubebuilder:validation:Pattern=\`^[0-9]+(Gi|Mi)$\`</span></span>
<span class="line"><span class="__shiki_140thh">	Size </span><span class="__shiki_1itgoe">string</span><span class="__shiki_mdbnqw"> \`json:&quot;size&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 存储类</span></span>
<span class="line"><span class="__shiki_140thh">	StorageClassName </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1itgoe">string</span><span class="__shiki_mdbnqw"> \`json:&quot;storageClassName,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 访问模式</span></span>
<span class="line"><span class="__shiki_140thh">	AccessModes []</span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">PersistentVolumeAccessMode</span><span class="__shiki_mdbnqw"> \`json:&quot;accessModes,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// BackupSpec 备份配置</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> BackupSpec</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">	Enabled </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_mdbnqw"> \`json:&quot;enabled&quot;\`</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 备份计划 (cron格式)</span></span>
<span class="line"><span class="__shiki_140thh">	Schedule </span><span class="__shiki_1itgoe">string</span><span class="__shiki_mdbnqw"> \`json:&quot;schedule,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 保留天数</span></span>
<span class="line"><span class="__shiki_140thh">	RetentionDays </span><span class="__shiki_1itgoe">int32</span><span class="__shiki_mdbnqw"> \`json:&quot;retentionDays,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 存储位置</span></span>
<span class="line"><span class="__shiki_140thh">	StorageLocation </span><span class="__shiki_1itgoe">string</span><span class="__shiki_mdbnqw"> \`json:&quot;storageLocation,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// MySQLClusterStatus 定义实际状态</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> MySQLClusterStatus</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 阶段</span></span>
<span class="line"><span class="__shiki_140thh">	Phase </span><span class="__shiki_1t8gfj">ClusterPhase</span><span class="__shiki_mdbnqw"> \`json:&quot;phase,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 条件</span></span>
<span class="line"><span class="__shiki_140thh">	Conditions []</span><span class="__shiki_1t8gfj">ClusterCondition</span><span class="__shiki_mdbnqw"> \`json:&quot;conditions,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 副本状态</span></span>
<span class="line"><span class="__shiki_140thh">	ReplicaStatus </span><span class="__shiki_1t8gfj">ReplicaStatus</span><span class="__shiki_mdbnqw"> \`json:&quot;replicaStatus,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 备份状态</span></span>
<span class="line"><span class="__shiki_140thh">	BackupStatus </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">BackupStatus</span><span class="__shiki_mdbnqw"> \`json:&quot;backupStatus,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 服务端点</span></span>
<span class="line"><span class="__shiki_140thh">	ServiceEndpoints </span><span class="__shiki_1t8gfj">ServiceEndpoints</span><span class="__shiki_mdbnqw"> \`json:&quot;serviceEndpoints,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 已观测到的生成</span></span>
<span class="line"><span class="__shiki_140thh">	ObservedGeneration </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_mdbnqw"> \`json:&quot;observedGeneration,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// ClusterPhase 集群阶段</span></span>
<span class="line"><span class="__shiki_21nrsd">// +kubebuilder:validation:Enum=Pending;Creating;Running;Updating;Degraded;Failed</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> ClusterPhase</span><span class="__shiki_1itgoe"> string</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">	ClusterPhasePending</span><span class="__shiki_1t8gfj">   ClusterPhase</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;Pending&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">	ClusterPhaseCreating</span><span class="__shiki_1t8gfj">  ClusterPhase</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;Creating&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">	ClusterPhaseRunning</span><span class="__shiki_1t8gfj">   ClusterPhase</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;Running&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">	ClusterPhaseUpdating</span><span class="__shiki_1t8gfj">  ClusterPhase</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;Updating&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">	ClusterPhaseDegraded</span><span class="__shiki_1t8gfj">  ClusterPhase</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;Degraded&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">	ClusterPhaseFailed</span><span class="__shiki_1t8gfj">    ClusterPhase</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;Failed&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// ClusterCondition 集群条件</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> ClusterCondition</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 类型</span></span>
<span class="line"><span class="__shiki_140thh">	Type </span><span class="__shiki_1t8gfj">ClusterConditionType</span><span class="__shiki_mdbnqw"> \`json:&quot;type&quot;\`</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 状态</span></span>
<span class="line"><span class="__shiki_140thh">	Status </span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ConditionStatus</span><span class="__shiki_mdbnqw"> \`json:&quot;status&quot;\`</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 最后变化时间</span></span>
<span class="line"><span class="__shiki_140thh">	LastTransitionTime </span><span class="__shiki_1t8gfj">metav1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span><span class="__shiki_mdbnqw"> \`json:&quot;lastTransitionTime,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 原因</span></span>
<span class="line"><span class="__shiki_140thh">	Reason </span><span class="__shiki_1itgoe">string</span><span class="__shiki_mdbnqw"> \`json:&quot;reason,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 消息</span></span>
<span class="line"><span class="__shiki_140thh">	Message </span><span class="__shiki_1itgoe">string</span><span class="__shiki_mdbnqw"> \`json:&quot;message,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// +kubebuilder:object:root=true</span></span>
<span class="line"><span class="__shiki_21nrsd">// +kubebuilder:subresource:status</span></span>
<span class="line"><span class="__shiki_21nrsd">// +kubebuilder:subresource:scale:specpath=.spec.replicas,statuspath=.status.replicaStatus.readyReplicas,selectorpath=.status.replicaStatus.selector</span></span>
<span class="line"><span class="__shiki_21nrsd">// +kubebuilder:printcolumn:name=&quot;Phase&quot;,type=&quot;string&quot;,JSONPath=&quot;.status.phase&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">// +kubebuilder:printcolumn:name=&quot;Replicas&quot;,type=&quot;integer&quot;,JSONPath=&quot;.spec.replicas&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">// +kubebuilder:printcolumn:name=&quot;Ready&quot;,type=&quot;integer&quot;,JSONPath=&quot;.status.replicaStatus.readyReplicas&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">// +kubebuilder:printcolumn:name=&quot;Age&quot;,type=&quot;date&quot;,JSONPath=&quot;.metadata.creationTimestamp&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">// +kubebuilder:storageversion</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// MySQLCluster 是MySQL集群的自定义资源</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> MySQLCluster</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">	metav1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TypeMeta</span><span class="__shiki_mdbnqw">   \`json:&quot;,inline&quot;\`</span></span>
<span class="line"><span class="__shiki_1t8gfj">	metav1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ObjectMeta</span><span class="__shiki_mdbnqw"> \`json:&quot;metadata,omitempty&quot;\`</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">	Spec   </span><span class="__shiki_1t8gfj">MySQLClusterSpec</span><span class="__shiki_mdbnqw">   \`json:&quot;spec,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">	Status </span><span class="__shiki_1t8gfj">MySQLClusterStatus</span><span class="__shiki_mdbnqw"> \`json:&quot;status,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// +kubebuilder:object:root=true</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// MySQLClusterList 包含MySQLCluster列表</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> MySQLClusterList</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">	metav1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TypeMeta</span><span class="__shiki_mdbnqw"> \`json:&quot;,inline&quot;\`</span></span>
<span class="line"><span class="__shiki_1t8gfj">	metav1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ListMeta</span><span class="__shiki_mdbnqw"> \`json:&quot;metadata,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">	Items           []</span><span class="__shiki_1t8gfj">MySQLCluster</span><span class="__shiki_mdbnqw"> \`json:&quot;items&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> init</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">	SchemeBuilder.</span><span class="__shiki_1t8gfj">Register</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">MySQLCluster</span><span class="__shiki_140thh">{}, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">MySQLClusterList</span><span class="__shiki_140thh">{})</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-3-控制器实现深度解析" tabindex="-1">3.3 控制器实现深度解析 <a class="header-anchor" href="#_3-3-控制器实现深度解析" aria-label="Permalink to &quot;3.3 控制器实现深度解析&quot;">​</a></h3><h4 id="控制器核心结构" tabindex="-1">控制器核心结构： <a class="header-anchor" href="#控制器核心结构" aria-label="Permalink to &quot;控制器核心结构：&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// controllers/mysqlcluster_controller.go</span></span>
<span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> controllers</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">context</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">fmt</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">time</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">reflect</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">	appsv1 </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">k8s.io/api/apps/v1</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">	corev1 </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">k8s.io/api/core/v1</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">k8s.io/apimachinery/pkg/api/errors</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">k8s.io/apimachinery/pkg/api/resource</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">	metav1 </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">k8s.io/apimachinery/pkg/apis/meta/v1</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">k8s.io/apimachinery/pkg/runtime</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">k8s.io/apimachinery/pkg/types</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">k8s.io/apimachinery/pkg/util/intstr</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">k8s.io/client-go/tools/record</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">k8s.io/utils/pointer</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">	ctrl </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">sigs.k8s.io/controller-runtime</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">sigs.k8s.io/controller-runtime/pkg/client</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">sigs.k8s.io/controller-runtime/pkg/controller/controllerutil</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">sigs.k8s.io/controller-runtime/pkg/log</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">sigs.k8s.io/controller-runtime/pkg/reconcile</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">	databasev1alpha1 </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">github.com/example/my-operator/api/v1alpha1</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// MySQLClusterReconciler 调和MySQLCluster资源</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> MySQLClusterReconciler</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">	client</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Client</span></span>
<span class="line"><span class="__shiki_140thh">	Scheme   </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">runtime</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Scheme</span></span>
<span class="line"><span class="__shiki_140thh">	Recorder </span><span class="__shiki_1t8gfj">record</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">EventRecorder</span></span>
<span class="line"><span class="__shiki_140thh">	Config   </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">OperatorConfig</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// OperatorConfig 配置</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> OperatorConfig</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">	BackupImage        </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">	MetricsImage       </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">	DefaultStorageSize </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// +kubebuilder:rbac:groups=database.example.com,resources=mysqlclusters,verbs=get;list;watch;create;update;patch;delete</span></span>
<span class="line"><span class="__shiki_21nrsd">// +kubebuilder:rbac:groups=database.example.com,resources=mysqlclusters/status,verbs=get;update;patch</span></span>
<span class="line"><span class="__shiki_21nrsd">// +kubebuilder:rbac:groups=database.example.com,resources=mysqlclusters/finalizers,verbs=update</span></span>
<span class="line"><span class="__shiki_21nrsd">// +kubebuilder:rbac:groups=apps,resources=statefulsets,verbs=get;list;watch;create;update;patch;delete</span></span>
<span class="line"><span class="__shiki_21nrsd">// +kubebuilder:rbac:groups=core,resources=services,verbs=get;list;watch;create;update;patch;delete</span></span>
<span class="line"><span class="__shiki_21nrsd">// +kubebuilder:rbac:groups=core,resources=configmaps,verbs=get;list;watch;create;update;patch;delete</span></span>
<span class="line"><span class="__shiki_21nrsd">// +kubebuilder:rbac:groups=core,resources=secrets,verbs=get;list;watch;create;update;patch;delete</span></span>
<span class="line"><span class="__shiki_21nrsd">// +kubebuilder:rbac:groups=core,resources=pods,verbs=get;list;watch</span></span>
<span class="line"><span class="__shiki_21nrsd">// +kubebuilder:rbac:groups=batch,resources=cronjobs,verbs=get;list;watch;create;update;patch;delete</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Reconcile 是核心调和函数</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">r </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MySQLClusterReconciler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Reconcile</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">req</span><span class="__shiki_1t8gfj"> ctrl</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Request</span><span class="__shiki_140thh">) (</span><span class="__shiki_1t8gfj">ctrl</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Result</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">	log </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> log.</span><span class="__shiki_1t8gfj">FromContext</span><span class="__shiki_140thh">(ctx).</span><span class="__shiki_1t8gfj">WithValues</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;mysqlcluster&quot;</span><span class="__shiki_140thh">, req.NamespacedName)</span></span>
<span class="line"><span class="__shiki_140thh">	log.</span><span class="__shiki_1t8gfj">Info</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;开始调和&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">	// 1. 获取MySQLCluster实例</span></span>
<span class="line"><span class="__shiki_140thh">	mysqlCluster </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">databasev1alpha1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">MySQLCluster</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> r.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(ctx, req.NamespacedName, mysqlCluster); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">		if</span><span class="__shiki_140thh"> errors.</span><span class="__shiki_1t8gfj">IsNotFound</span><span class="__shiki_140thh">(err) {</span></span>
<span class="line"><span class="__shiki_21nrsd">			// 对象已删除，执行清理</span></span>
<span class="line"><span class="__shiki_1itgoe">			return</span><span class="__shiki_1t8gfj"> ctrl</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Result</span><span class="__shiki_140thh">{}, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">		}</span></span>
<span class="line"><span class="__shiki_140thh">		log.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(err, </span><span class="__shiki_mdbnqw">&quot;无法获取MySQLCluster&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span><span class="__shiki_1t8gfj"> ctrl</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Result</span><span class="__shiki_140thh">{}, err</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">	// 2. 检查是否正在删除</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">mysqlCluster.ObjectMeta.DeletionTimestamp.</span><span class="__shiki_1t8gfj">IsZero</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span><span class="__shiki_140thh"> r.</span><span class="__shiki_1t8gfj">reconcileDelete</span><span class="__shiki_140thh">(ctx, mysqlCluster)</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">	// 3. 添加finalizer（如果不存在）</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">controllerutil.</span><span class="__shiki_1t8gfj">ContainsFinalizer</span><span class="__shiki_140thh">(mysqlCluster, mysqlFinalizer) {</span></span>
<span class="line"><span class="__shiki_140thh">		controllerutil.</span><span class="__shiki_1t8gfj">AddFinalizer</span><span class="__shiki_140thh">(mysqlCluster, mysqlFinalizer)</span></span>
<span class="line"><span class="__shiki_1itgoe">		if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> r.</span><span class="__shiki_1t8gfj">Update</span><span class="__shiki_140thh">(ctx, mysqlCluster); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">			return</span><span class="__shiki_1t8gfj"> ctrl</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Result</span><span class="__shiki_140thh">{}, err</span></span>
<span class="line"><span class="__shiki_140thh">		}</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">	// 4. 调和状态机</span></span>
<span class="line"><span class="__shiki_1itgoe">	var</span><span class="__shiki_140thh"> result </span><span class="__shiki_1t8gfj">ctrl</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Result</span></span>
<span class="line"><span class="__shiki_1itgoe">	var</span><span class="__shiki_140thh"> reconcileErr </span><span class="__shiki_1itgoe">error</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">	switch</span><span class="__shiki_140thh"> mysqlCluster.Status.Phase {</span></span>
<span class="line"><span class="__shiki_1itgoe">	case</span><span class="__shiki_mdbnqw"> &quot;&quot;</span><span class="__shiki_140thh">, databasev1alpha1.ClusterPhasePending:</span></span>
<span class="line"><span class="__shiki_140thh">		result, reconcileErr </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> r.</span><span class="__shiki_1t8gfj">reconcilePending</span><span class="__shiki_140thh">(ctx, mysqlCluster)</span></span>
<span class="line"><span class="__shiki_1itgoe">	case</span><span class="__shiki_140thh"> databasev1alpha1.ClusterPhaseCreating:</span></span>
<span class="line"><span class="__shiki_140thh">		result, reconcileErr </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> r.</span><span class="__shiki_1t8gfj">reconcileCreating</span><span class="__shiki_140thh">(ctx, mysqlCluster)</span></span>
<span class="line"><span class="__shiki_1itgoe">	case</span><span class="__shiki_140thh"> databasev1alpha1.ClusterPhaseRunning:</span></span>
<span class="line"><span class="__shiki_140thh">		result, reconcileErr </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> r.</span><span class="__shiki_1t8gfj">reconcileRunning</span><span class="__shiki_140thh">(ctx, mysqlCluster)</span></span>
<span class="line"><span class="__shiki_1itgoe">	case</span><span class="__shiki_140thh"> databasev1alpha1.ClusterPhaseUpdating:</span></span>
<span class="line"><span class="__shiki_140thh">		result, reconcileErr </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> r.</span><span class="__shiki_1t8gfj">reconcileUpdating</span><span class="__shiki_140thh">(ctx, mysqlCluster)</span></span>
<span class="line"><span class="__shiki_1itgoe">	case</span><span class="__shiki_140thh"> databasev1alpha1.ClusterPhaseDegraded:</span></span>
<span class="line"><span class="__shiki_140thh">		result, reconcileErr </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> r.</span><span class="__shiki_1t8gfj">reconcileDegraded</span><span class="__shiki_140thh">(ctx, mysqlCluster)</span></span>
<span class="line"><span class="__shiki_1itgoe">	case</span><span class="__shiki_140thh"> databasev1alpha1.ClusterPhaseFailed:</span></span>
<span class="line"><span class="__shiki_140thh">		result, reconcileErr </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> r.</span><span class="__shiki_1t8gfj">reconcileFailed</span><span class="__shiki_140thh">(ctx, mysqlCluster)</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">	// 5. 更新状态</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> r.</span><span class="__shiki_1t8gfj">updateStatus</span><span class="__shiki_140thh">(ctx, mysqlCluster); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		log.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(err, </span><span class="__shiki_mdbnqw">&quot;更新状态失败&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span><span class="__shiki_1t8gfj"> ctrl</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Result</span><span class="__shiki_140thh">{}, err</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">	return</span><span class="__shiki_140thh"> result, reconcileErr</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 状态机调和函数</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">r </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MySQLClusterReconciler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">reconcilePending</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">cluster</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">databasev1alpha1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">MySQLCluster</span><span class="__shiki_140thh">) (</span><span class="__shiki_1t8gfj">ctrl</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Result</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">	log </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> log.</span><span class="__shiki_1t8gfj">FromContext</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 验证spec</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> r.</span><span class="__shiki_1t8gfj">validateSpec</span><span class="__shiki_140thh">(cluster); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		r.Recorder.</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">(cluster, corev1.EventTypeWarning, </span><span class="__shiki_mdbnqw">&quot;ValidationFailed&quot;</span><span class="__shiki_140thh">, err.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">		cluster.Status.Phase </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> databasev1alpha1.ClusterPhaseFailed</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span><span class="__shiki_1t8gfj"> ctrl</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Result</span><span class="__shiki_140thh">{}, err</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">	// 创建必需资源</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> r.</span><span class="__shiki_1t8gfj">createPrerequisites</span><span class="__shiki_140thh">(ctx, cluster); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span><span class="__shiki_1t8gfj"> ctrl</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Result</span><span class="__shiki_140thh">{}, err</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">	// 设置创建密码</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> r.</span><span class="__shiki_1t8gfj">ensureSecrets</span><span class="__shiki_140thh">(ctx, cluster); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span><span class="__shiki_1t8gfj"> ctrl</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Result</span><span class="__shiki_140thh">{}, err</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">	cluster.Status.Phase </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> databasev1alpha1.ClusterPhaseCreating</span></span>
<span class="line"><span class="__shiki_140thh">	r.Recorder.</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">(cluster, corev1.EventTypeNormal, </span><span class="__shiki_mdbnqw">&quot;Creating&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;开始创建MySQL集群&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">	return</span><span class="__shiki_1t8gfj"> ctrl</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Result</span><span class="__shiki_140thh">{RequeueAfter: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> time.Second}, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">r </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MySQLClusterReconciler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">reconcileCreating</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">cluster</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">databasev1alpha1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">MySQLCluster</span><span class="__shiki_140thh">) (</span><span class="__shiki_1t8gfj">ctrl</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Result</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 1. 创建StatefulSet</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> r.</span><span class="__shiki_1t8gfj">ensureStatefulSet</span><span class="__shiki_140thh">(ctx, cluster); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span><span class="__shiki_1t8gfj"> ctrl</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Result</span><span class="__shiki_140thh">{}, err</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">	// 2. 创建Service</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> r.</span><span class="__shiki_1t8gfj">ensureServices</span><span class="__shiki_140thh">(ctx, cluster); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span><span class="__shiki_1t8gfj"> ctrl</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Result</span><span class="__shiki_140thh">{}, err</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">	// 3. 创建ConfigMap</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> r.</span><span class="__shiki_1t8gfj">ensureConfigMap</span><span class="__shiki_140thh">(ctx, cluster); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span><span class="__shiki_1t8gfj"> ctrl</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Result</span><span class="__shiki_140thh">{}, err</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">	// 4. 检查StatefulSet状态</span></span>
<span class="line"><span class="__shiki_140thh">	sts </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">appsv1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">StatefulSet</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> r.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(ctx, </span><span class="__shiki_1t8gfj">types</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">NamespacedName</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">		Name:      cluster.Name,</span></span>
<span class="line"><span class="__shiki_140thh">		Namespace: cluster.Namespace,</span></span>
<span class="line"><span class="__shiki_140thh">	}, sts); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span><span class="__shiki_1t8gfj"> ctrl</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Result</span><span class="__shiki_140thh">{}, err</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">	// 5. 更新状态</span></span>
<span class="line"><span class="__shiki_140thh">	cluster.Status.ReplicaStatus.ReadyReplicas </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sts.Status.ReadyReplicas</span></span>
<span class="line"><span class="__shiki_140thh">	cluster.Status.ReplicaStatus.CurrentReplicas </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sts.Status.CurrentReplicas</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> sts.Status.ReadyReplicas </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> cluster.Spec.Replicas {</span></span>
<span class="line"><span class="__shiki_140thh">		cluster.Status.Phase </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> databasev1alpha1.ClusterPhaseRunning</span></span>
<span class="line"><span class="__shiki_140thh">		r.Recorder.</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">(cluster, corev1.EventTypeNormal, </span><span class="__shiki_mdbnqw">&quot;Running&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;MySQL集群运行正常&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span><span class="__shiki_1t8gfj"> ctrl</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Result</span><span class="__shiki_140thh">{}, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">	// 6. 检查是否有错误</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> sts.Status.ReadyReplicas </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> sts.Status.Replicas </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">		// 检查Pod事件</span></span>
<span class="line"><span class="__shiki_140thh">		podList </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">PodList</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_1itgoe">		if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> r.</span><span class="__shiki_1t8gfj">List</span><span class="__shiki_140thh">(ctx, podList, client.</span><span class="__shiki_1t8gfj">InNamespace</span><span class="__shiki_140thh">(cluster.Namespace),</span></span>
<span class="line"><span class="__shiki_1t8gfj">			client</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">MatchingLabels</span><span class="__shiki_140thh">{</span><span class="__shiki_mdbnqw">&quot;app&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;mysql&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;cluster&quot;</span><span class="__shiki_140thh">: cluster.Name}); err </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">			for</span><span class="__shiki_140thh"> _, pod </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> podList.Items {</span></span>
<span class="line"><span class="__shiki_1itgoe">				if</span><span class="__shiki_140thh"> pod.Status.Phase </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> corev1.PodFailed {</span></span>
<span class="line"><span class="__shiki_140thh">					cluster.Status.Phase </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> databasev1alpha1.ClusterPhaseDegraded</span></span>
<span class="line"><span class="__shiki_140thh">					r.Recorder.</span><span class="__shiki_1t8gfj">Event</span><span class="__shiki_140thh">(cluster, corev1.EventTypeWarning, </span><span class="__shiki_mdbnqw">&quot;PodFailed&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">						fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Pod </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw"> 启动失败&quot;</span><span class="__shiki_140thh">, pod.Name))</span></span>
<span class="line"><span class="__shiki_140thh">				}</span></span>
<span class="line"><span class="__shiki_140thh">			}</span></span>
<span class="line"><span class="__shiki_140thh">		}</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">	return</span><span class="__shiki_1t8gfj"> ctrl</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Result</span><span class="__shiki_140thh">{RequeueAfter: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> time.Second}, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 创建StatefulSet</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">r </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MySQLClusterReconciler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">ensureStatefulSet</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">cluster</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">databasev1alpha1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">MySQLCluster</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">	sts </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">appsv1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">StatefulSet</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">	err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> r.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(ctx, </span><span class="__shiki_1t8gfj">types</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">NamespacedName</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">		Name:      cluster.Name,</span></span>
<span class="line"><span class="__shiki_140thh">		Namespace: cluster.Namespace,</span></span>
<span class="line"><span class="__shiki_140thh">	}, sts)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> errors.</span><span class="__shiki_1t8gfj">IsNotFound</span><span class="__shiki_140thh">(err) {</span></span>
<span class="line"><span class="__shiki_21nrsd">		// 创建StatefulSet</span></span>
<span class="line"><span class="__shiki_140thh">		desiredSts </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> r.</span><span class="__shiki_1t8gfj">buildStatefulSet</span><span class="__shiki_140thh">(cluster)</span></span>
<span class="line"><span class="__shiki_1itgoe">		if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> ctrl.</span><span class="__shiki_1t8gfj">SetControllerReference</span><span class="__shiki_140thh">(cluster, desiredSts, r.Scheme); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">			return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">		}</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span><span class="__shiki_140thh"> r.</span><span class="__shiki_1t8gfj">Create</span><span class="__shiki_140thh">(ctx, desiredSts)</span></span>
<span class="line"><span class="__shiki_140thh">	} </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">	// 检查是否需要更新</span></span>
<span class="line"><span class="__shiki_140thh">	desiredSts </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> r.</span><span class="__shiki_1t8gfj">buildStatefulSet</span><span class="__shiki_140thh">(cluster)</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">reflect.</span><span class="__shiki_1t8gfj">DeepEqual</span><span class="__shiki_140thh">(sts.Spec, desiredSts.Spec) {</span></span>
<span class="line"><span class="__shiki_140thh">		sts.Spec </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> desiredSts.Spec</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span><span class="__shiki_140thh"> r.</span><span class="__shiki_1t8gfj">Update</span><span class="__shiki_140thh">(ctx, sts)</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">	return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">r </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MySQLClusterReconciler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">buildStatefulSet</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">cluster</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">databasev1alpha1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">MySQLCluster</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">appsv1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">StatefulSet</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">	labels </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_mdbnqw">		&quot;app&quot;</span><span class="__shiki_140thh">:        </span><span class="__shiki_mdbnqw">&quot;mysql&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">		&quot;cluster&quot;</span><span class="__shiki_140thh">:    cluster.Name,</span></span>
<span class="line"><span class="__shiki_mdbnqw">		&quot;managed-by&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;mysql-operator&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">	// 构建容器</span></span>
<span class="line"><span class="__shiki_140thh">	containers </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Container</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">		{</span></span>
<span class="line"><span class="__shiki_140thh">			Name:  </span><span class="__shiki_mdbnqw">&quot;mysql&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">			Image: fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;mysql:</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, cluster.Spec.Version),</span></span>
<span class="line"><span class="__shiki_140thh">			Ports: []</span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ContainerPort</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">				{Name: </span><span class="__shiki_mdbnqw">&quot;mysql&quot;</span><span class="__shiki_140thh">, ContainerPort: </span><span class="__shiki_dzsirb">3306</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">			},</span></span>
<span class="line"><span class="__shiki_140thh">			Env: []</span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">EnvVar</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">				{</span></span>
<span class="line"><span class="__shiki_140thh">					Name: </span><span class="__shiki_mdbnqw">&quot;MYSQL_ROOT_PASSWORD&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">					ValueFrom: </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">EnvVarSource</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">						SecretKeyRef: </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">SecretKeySelector</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">							LocalObjectReference: </span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">LocalObjectReference</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">								Name: fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">-mysql-secret&quot;</span><span class="__shiki_140thh">, cluster.Name),</span></span>
<span class="line"><span class="__shiki_140thh">							},</span></span>
<span class="line"><span class="__shiki_140thh">							Key: </span><span class="__shiki_mdbnqw">&quot;root-password&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">						},</span></span>
<span class="line"><span class="__shiki_140thh">					},</span></span>
<span class="line"><span class="__shiki_140thh">				},</span></span>
<span class="line"><span class="__shiki_140thh">			},</span></span>
<span class="line"><span class="__shiki_140thh">			Resources: cluster.Spec.Resources,</span></span>
<span class="line"><span class="__shiki_140thh">			VolumeMounts: []</span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">VolumeMount</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">				{</span></span>
<span class="line"><span class="__shiki_140thh">					Name:      </span><span class="__shiki_mdbnqw">&quot;mysql-data&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">					MountPath: </span><span class="__shiki_mdbnqw">&quot;/var/lib/mysql&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">				},</span></span>
<span class="line"><span class="__shiki_140thh">				{</span></span>
<span class="line"><span class="__shiki_140thh">					Name:      </span><span class="__shiki_mdbnqw">&quot;mysql-config&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">					MountPath: </span><span class="__shiki_mdbnqw">&quot;/etc/mysql/conf.d&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">				},</span></span>
<span class="line"><span class="__shiki_140thh">			},</span></span>
<span class="line"><span class="__shiki_140thh">			LivenessProbe: </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Probe</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">				ProbeHandler: </span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ProbeHandler</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">					Exec: </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ExecAction</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">						Command: []</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">{</span><span class="__shiki_mdbnqw">&quot;mysqladmin&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;ping&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;-h&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;localhost&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">					},</span></span>
<span class="line"><span class="__shiki_140thh">				},</span></span>
<span class="line"><span class="__shiki_140thh">				InitialDelaySeconds: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">				PeriodSeconds:       </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">				TimeoutSeconds:      </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">				FailureThreshold:    </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">			},</span></span>
<span class="line"><span class="__shiki_140thh">			ReadinessProbe: </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Probe</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">				ProbeHandler: </span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ProbeHandler</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">					Exec: </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ExecAction</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">						Command: []</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">{</span><span class="__shiki_mdbnqw">&quot;mysql&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;-h&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;localhost&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;-u&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;root&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">							&quot;-p$(MYSQL_ROOT_PASSWORD)&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;-e&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;SELECT 1&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">					},</span></span>
<span class="line"><span class="__shiki_140thh">				},</span></span>
<span class="line"><span class="__shiki_140thh">				InitialDelaySeconds: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">				PeriodSeconds:       </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">				TimeoutSeconds:      </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">			},</span></span>
<span class="line"><span class="__shiki_140thh">		},</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">	// 添加Sidecar容器</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> cluster.Spec.Monitoring </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> cluster.Spec.Monitoring.Enabled {</span></span>
<span class="line"><span class="__shiki_140thh">		containers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(containers, </span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Container</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">			Name:  </span><span class="__shiki_mdbnqw">&quot;metrics-exporter&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">			Image: r.Config.MetricsImage,</span></span>
<span class="line"><span class="__shiki_140thh">			Ports: []</span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ContainerPort</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">				{Name: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;</span><span class="__shiki_140thh">, ContainerPort: </span><span class="__shiki_dzsirb">9104</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">			},</span></span>
<span class="line"><span class="__shiki_140thh">		})</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">	return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">appsv1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">StatefulSet</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">		ObjectMeta: </span><span class="__shiki_1t8gfj">metav1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ObjectMeta</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">			Name:      cluster.Name,</span></span>
<span class="line"><span class="__shiki_140thh">			Namespace: cluster.Namespace,</span></span>
<span class="line"><span class="__shiki_140thh">			Labels:    labels,</span></span>
<span class="line"><span class="__shiki_140thh">		},</span></span>
<span class="line"><span class="__shiki_140thh">		Spec: </span><span class="__shiki_1t8gfj">appsv1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">StatefulSetSpec</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">			Replicas:    </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">cluster.Spec.Replicas,</span></span>
<span class="line"><span class="__shiki_140thh">			ServiceName: fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">-headless&quot;</span><span class="__shiki_140thh">, cluster.Name),</span></span>
<span class="line"><span class="__shiki_140thh">			Selector: </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">metav1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">LabelSelector</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">				MatchLabels: labels,</span></span>
<span class="line"><span class="__shiki_140thh">			},</span></span>
<span class="line"><span class="__shiki_140thh">			Template: </span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">PodTemplateSpec</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">				ObjectMeta: </span><span class="__shiki_1t8gfj">metav1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ObjectMeta</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">					Labels: labels,</span></span>
<span class="line"><span class="__shiki_140thh">				},</span></span>
<span class="line"><span class="__shiki_140thh">				Spec: </span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">PodSpec</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">					Containers:     containers,</span></span>
<span class="line"><span class="__shiki_140thh">					InitContainers: r.</span><span class="__shiki_1t8gfj">buildInitContainers</span><span class="__shiki_140thh">(cluster),</span></span>
<span class="line"><span class="__shiki_140thh">				},</span></span>
<span class="line"><span class="__shiki_140thh">			},</span></span>
<span class="line"><span class="__shiki_140thh">			VolumeClaimTemplates: []</span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">PersistentVolumeClaim</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">				{</span></span>
<span class="line"><span class="__shiki_140thh">					ObjectMeta: </span><span class="__shiki_1t8gfj">metav1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ObjectMeta</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">						Name: </span><span class="__shiki_mdbnqw">&quot;mysql-data&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">					},</span></span>
<span class="line"><span class="__shiki_140thh">					Spec: </span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">PersistentVolumeClaimSpec</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">						AccessModes: []</span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">PersistentVolumeAccessMode</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">							corev1.ReadWriteOnce,</span></span>
<span class="line"><span class="__shiki_140thh">						},</span></span>
<span class="line"><span class="__shiki_140thh">						Resources: </span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ResourceRequirements</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">							Requests: </span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ResourceList</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">								corev1.ResourceStorage: resource.</span><span class="__shiki_1t8gfj">MustParse</span><span class="__shiki_140thh">(cluster.Spec.Storage.Size),</span></span>
<span class="line"><span class="__shiki_140thh">							},</span></span>
<span class="line"><span class="__shiki_140thh">						},</span></span>
<span class="line"><span class="__shiki_140thh">						StorageClassName: cluster.Spec.Storage.StorageClassName,</span></span>
<span class="line"><span class="__shiki_140thh">					},</span></span>
<span class="line"><span class="__shiki_140thh">				},</span></span>
<span class="line"><span class="__shiki_140thh">			},</span></span>
<span class="line"><span class="__shiki_140thh">		},</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-4-webhook-开发" tabindex="-1">3.4 Webhook 开发 <a class="header-anchor" href="#_3-4-webhook-开发" aria-label="Permalink to &quot;3.4 Webhook 开发&quot;">​</a></h3><h4 id="验证webhook" tabindex="-1">验证Webhook： <a class="header-anchor" href="#验证webhook" aria-label="Permalink to &quot;验证Webhook：&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// api/v1alpha1/mysqlcluster_webhook.go</span></span>
<span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> v1alpha1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">context</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">fmt</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">strings</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">	apierrors </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">k8s.io/apimachinery/pkg/api/errors</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">k8s.io/apimachinery/pkg/runtime</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">k8s.io/apimachinery/pkg/runtime/schema</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">k8s.io/apimachinery/pkg/util/validation/field</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">	ctrl </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">sigs.k8s.io/controller-runtime</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">sigs.k8s.io/controller-runtime/pkg/webhook</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">sigs.k8s.io/controller-runtime/pkg/webhook/admission</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// +kubebuilder:webhook:path=/mutate-database-example-com-v1alpha1-mysqlcluster,mutating=true,failurePolicy=fail,sideEffects=None,groups=database.example.com,resources=mysqlclusters,verbs=create;update,versions=v1alpha1,name=mmysqlcluster.kb.io,admissionReviewVersions=v1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> _ </span><span class="__shiki_1t8gfj">webhook</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Defaulter</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">MySQLCluster</span><span class="__shiki_140thh">{}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Default 实现默认值设置</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">r </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MySQLCluster</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Default</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> r.Spec.Replicas </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		r.Spec.Replicas </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> r.Spec.Version </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;&quot;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		r.Spec.Version </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;8.0.26&quot;</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> r.Spec.Storage.Size </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;&quot;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		r.Spec.Storage.Size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;10Gi&quot;</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 设置默认标签</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> r.Labels </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		r.Labels </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">	r.Labels[</span><span class="__shiki_mdbnqw">&quot;managed-by&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;mysql-operator&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// +kubebuilder:webhook:path=/validate-database-example-com-v1alpha1-mysqlcluster,mutating=false,failurePolicy=fail,sideEffects=None,groups=database.example.com,resources=mysqlclusters,verbs=create;update,versions=v1alpha1,name=vmysqlcluster.kb.io,admissionReviewVersions=v1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> _ </span><span class="__shiki_1t8gfj">webhook</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Validator</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">MySQLCluster</span><span class="__shiki_140thh">{}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// ValidateCreate 实现创建验证</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">r </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MySQLCluster</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">ValidateCreate</span><span class="__shiki_140thh">() (</span><span class="__shiki_1t8gfj">admission</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Warnings</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">	return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, r.</span><span class="__shiki_1t8gfj">validateMySQLCluster</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// ValidateUpdate 实现更新验证</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">r </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MySQLCluster</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">ValidateUpdate</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">old</span><span class="__shiki_1t8gfj"> runtime</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Object</span><span class="__shiki_140thh">) (</span><span class="__shiki_1t8gfj">admission</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Warnings</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">	oldCluster </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> old.(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MySQLCluster</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 检查不可变字段</span></span>
<span class="line"><span class="__shiki_1itgoe">	var</span><span class="__shiki_140thh"> allErrs </span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ErrorList</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> oldCluster.Spec.Version </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> r.Spec.Version {</span></span>
<span class="line"><span class="__shiki_140thh">		allErrs </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(allErrs, field.</span><span class="__shiki_1t8gfj">Forbidden</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">			field.</span><span class="__shiki_1t8gfj">NewPath</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;spec&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;version&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">			&quot;MySQL版本不能更改，请创建新集群&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		))</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> r.</span><span class="__shiki_1t8gfj">validateMySQLCluster</span><span class="__shiki_140thh">(); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(allErrs) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_1itgoe">	return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, apierrors.</span><span class="__shiki_1t8gfj">NewInvalid</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1t8gfj">		schema</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">GroupKind</span><span class="__shiki_140thh">{Group: </span><span class="__shiki_mdbnqw">&quot;database.example.com&quot;</span><span class="__shiki_140thh">, Kind: </span><span class="__shiki_mdbnqw">&quot;MySQLCluster&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">		r.Name, allErrs)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// ValidateDelete 实现删除验证</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">r </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MySQLCluster</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">ValidateDelete</span><span class="__shiki_140thh">() (</span><span class="__shiki_1t8gfj">admission</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Warnings</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 可以在这里实现删除前的验证逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">	return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// validateMySQLCluster 验证MySQLCluster</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">r </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MySQLCluster</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">validateMySQLCluster</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">	var</span><span class="__shiki_140thh"> allErrs </span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ErrorList</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 验证副本数</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> r.Spec.Replicas </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		allErrs </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(allErrs, field.</span><span class="__shiki_1t8gfj">Invalid</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">			field.</span><span class="__shiki_1t8gfj">NewPath</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;spec&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;replicas&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">			r.Spec.Replicas,</span></span>
<span class="line"><span class="__shiki_mdbnqw">			&quot;副本数必须大于0&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		))</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 验证版本</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">strings.</span><span class="__shiki_1t8gfj">HasPrefix</span><span class="__shiki_140thh">(r.Spec.Version, </span><span class="__shiki_mdbnqw">&quot;8.0.&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">		allErrs </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(allErrs, field.</span><span class="__shiki_1t8gfj">Invalid</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">			field.</span><span class="__shiki_1t8gfj">NewPath</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;spec&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;version&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">			r.Spec.Version,</span></span>
<span class="line"><span class="__shiki_mdbnqw">			&quot;仅支持MySQL 8.0版本&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		))</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 验证存储大小</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> r.Spec.Storage.Size </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;&quot;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		allErrs </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(allErrs, field.</span><span class="__shiki_1t8gfj">Required</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">			field.</span><span class="__shiki_1t8gfj">NewPath</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;spec&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;storage&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;size&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">			&quot;存储大小必须指定&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		))</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(allErrs) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_1itgoe">	return</span><span class="__shiki_140thh"> apierrors.</span><span class="__shiki_1t8gfj">NewInvalid</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1t8gfj">		schema</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">GroupKind</span><span class="__shiki_140thh">{Group: </span><span class="__shiki_mdbnqw">&quot;database.example.com&quot;</span><span class="__shiki_140thh">, Kind: </span><span class="__shiki_mdbnqw">&quot;MySQLCluster&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">		r.Name, allErrs)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">r </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MySQLCluster</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">SetupWebhookWithManager</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">mgr</span><span class="__shiki_1t8gfj"> ctrl</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Manager</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">	return</span><span class="__shiki_140thh"> ctrl.</span><span class="__shiki_1t8gfj">NewWebhookManagedBy</span><span class="__shiki_140thh">(mgr).</span></span>
<span class="line"><span class="__shiki_1t8gfj">		For</span><span class="__shiki_140thh">(r).</span></span>
<span class="line"><span class="__shiki_1t8gfj">		Complete</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="四、operator-sdk-开发实践" tabindex="-1">四、Operator SDK 开发实践 <a class="header-anchor" href="#四、operator-sdk-开发实践" aria-label="Permalink to &quot;四、Operator SDK 开发实践&quot;">​</a></h2><h3 id="_4-1-多版本api支持" tabindex="-1">4.1 多版本API支持 <a class="header-anchor" href="#_4-1-多版本api支持" aria-label="Permalink to &quot;4.1 多版本API支持&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 实现版本转换</span></span>
<span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> v1alpha2</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">fmt</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_140thh">	v1alpha1 </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">github.com/example/my-operator/api/v1alpha1</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">sigs.k8s.io/controller-runtime/pkg/conversion</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// ConvertTo 转换为旧版本</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">src </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MySQLCluster</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">ConvertTo</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">dstRaw</span><span class="__shiki_1t8gfj"> conversion</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Hub</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">	dst </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> dstRaw.(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">v1alpha1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">MySQLCluster</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 元数据转换</span></span>
<span class="line"><span class="__shiki_140thh">	dst.ObjectMeta </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> src.ObjectMeta</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 规格转换</span></span>
<span class="line"><span class="__shiki_140thh">	dst.Spec.Replicas </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> src.Spec.Replicas</span></span>
<span class="line"><span class="__shiki_140thh">	dst.Spec.Version </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> src.Spec.Version</span></span>
<span class="line"><span class="__shiki_140thh">	dst.Spec.Storage.Size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> src.Spec.Storage.Size</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 状态转换</span></span>
<span class="line"><span class="__shiki_140thh">	dst.Status.Phase </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> v1alpha1.</span><span class="__shiki_1t8gfj">ClusterPhase</span><span class="__shiki_140thh">(src.Status.Phase)</span></span>
<span class="line"><span class="__shiki_140thh">	dst.Status.ReplicaStatus.ReadyReplicas </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> src.Status.ReplicaStatus.ReadyReplicas</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_1itgoe">	return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// ConvertFrom 从旧版本转换</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">dst </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MySQLCluster</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">ConvertFrom</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">srcRaw</span><span class="__shiki_1t8gfj"> conversion</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Hub</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">	src </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> srcRaw.(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">v1alpha1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">MySQLCluster</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 元数据转换</span></span>
<span class="line"><span class="__shiki_140thh">	dst.ObjectMeta </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> src.ObjectMeta</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 规格转换</span></span>
<span class="line"><span class="__shiki_140thh">	dst.Spec.Replicas </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> src.Spec.Replicas</span></span>
<span class="line"><span class="__shiki_140thh">	dst.Spec.Version </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> src.Spec.Version</span></span>
<span class="line"><span class="__shiki_140thh">	dst.Spec.Storage.Size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> src.Spec.Storage.Size</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 设置默认值（新版本新增字段）</span></span>
<span class="line"><span class="__shiki_140thh">	dst.Spec.HighAvailability </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">HighAvailabilitySpec</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">		Enabled: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		Type:    </span><span class="__shiki_mdbnqw">&quot;SemiSync&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 状态转换</span></span>
<span class="line"><span class="__shiki_140thh">	dst.Status.Phase </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> ClusterPhase</span><span class="__shiki_140thh">(src.Status.Phase)</span></span>
<span class="line"><span class="__shiki_140thh">	dst.Status.ReplicaStatus.ReadyReplicas </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> src.Status.ReplicaStatus.ReadyReplicas</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_1itgoe">	return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-领导选举与高可用" tabindex="-1">4.2 领导选举与高可用 <a class="header-anchor" href="#_4-2-领导选举与高可用" aria-label="Permalink to &quot;4.2 领导选举与高可用&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// main.go 中的高可用配置</span></span>
<span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> main</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">flag</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">os</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">time</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">k8s.io/apimachinery/pkg/runtime</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">	utilruntime </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">k8s.io/apimachinery/pkg/util/runtime</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">	clientgoscheme </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">k8s.io/client-go/kubernetes/scheme</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">	ctrl </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">sigs.k8s.io/controller-runtime</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">sigs.k8s.io/controller-runtime/pkg/healthz</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">sigs.k8s.io/controller-runtime/pkg/log/zap</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">	databasev1alpha1 </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">github.com/example/my-operator/api/v1alpha1</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">github.com/example/my-operator/controllers</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">	var</span><span class="__shiki_140thh"> metricsAddr </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_1itgoe">	var</span><span class="__shiki_140thh"> enableLeaderElection </span><span class="__shiki_1itgoe">bool</span></span>
<span class="line"><span class="__shiki_1itgoe">	var</span><span class="__shiki_140thh"> probeAddr </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_1itgoe">	var</span><span class="__shiki_140thh"> leaseDuration </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_1itgoe">	var</span><span class="__shiki_140thh"> renewDeadline </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_1itgoe">	var</span><span class="__shiki_140thh"> retryPeriod </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_140thh">	flag.</span><span class="__shiki_1t8gfj">StringVar</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">metricsAddr, </span><span class="__shiki_mdbnqw">&quot;metrics-bind-address&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;:8080&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;监控指标地址&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	flag.</span><span class="__shiki_1t8gfj">StringVar</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">probeAddr, </span><span class="__shiki_mdbnqw">&quot;health-probe-bind-address&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;:8081&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;健康检查地址&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	flag.</span><span class="__shiki_1t8gfj">BoolVar</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">enableLeaderElection, </span><span class="__shiki_mdbnqw">&quot;leader-elect&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;启用领导选举&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	flag.</span><span class="__shiki_1t8gfj">DurationVar</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">leaseDuration, </span><span class="__shiki_mdbnqw">&quot;lease-duration&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">15</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">time.Second, </span><span class="__shiki_mdbnqw">&quot;租约持续时间&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	flag.</span><span class="__shiki_1t8gfj">DurationVar</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">renewDeadline, </span><span class="__shiki_mdbnqw">&quot;renew-deadline&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">time.Second, </span><span class="__shiki_mdbnqw">&quot;续约截止时间&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	flag.</span><span class="__shiki_1t8gfj">DurationVar</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">retryPeriod, </span><span class="__shiki_mdbnqw">&quot;retry-period&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">time.Second, </span><span class="__shiki_mdbnqw">&quot;重试周期&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_140thh">	opts </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> zap</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Options</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">		Development: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">	opts.</span><span class="__shiki_1t8gfj">BindFlags</span><span class="__shiki_140thh">(flag.CommandLine)</span></span>
<span class="line"><span class="__shiki_140thh">	flag.</span><span class="__shiki_1t8gfj">Parse</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_140thh">	ctrl.</span><span class="__shiki_1t8gfj">SetLogger</span><span class="__shiki_140thh">(zap.</span><span class="__shiki_1t8gfj">New</span><span class="__shiki_140thh">(zap.</span><span class="__shiki_1t8gfj">UseFlagOptions</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">opts)))</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_140thh">	scheme </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> runtime.</span><span class="__shiki_1t8gfj">NewScheme</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">	utilruntime.</span><span class="__shiki_1t8gfj">Must</span><span class="__shiki_140thh">(clientgoscheme.</span><span class="__shiki_1t8gfj">AddToScheme</span><span class="__shiki_140thh">(scheme))</span></span>
<span class="line"><span class="__shiki_140thh">	utilruntime.</span><span class="__shiki_1t8gfj">Must</span><span class="__shiki_140thh">(databasev1alpha1.</span><span class="__shiki_1t8gfj">AddToScheme</span><span class="__shiki_140thh">(scheme))</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 创建管理器</span></span>
<span class="line"><span class="__shiki_140thh">	mgr, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> ctrl.</span><span class="__shiki_1t8gfj">NewManager</span><span class="__shiki_140thh">(ctrl.</span><span class="__shiki_1t8gfj">GetConfigOrDie</span><span class="__shiki_140thh">(), </span><span class="__shiki_1t8gfj">ctrl</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Options</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">		Scheme:                 scheme,</span></span>
<span class="line"><span class="__shiki_140thh">		MetricsBindAddress:     metricsAddr,</span></span>
<span class="line"><span class="__shiki_140thh">		Port:                   </span><span class="__shiki_dzsirb">9443</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		HealthProbeBindAddress: probeAddr,</span></span>
<span class="line"><span class="__shiki_140thh">		LeaderElection:         enableLeaderElection,</span></span>
<span class="line"><span class="__shiki_140thh">		LeaderElectionID:       </span><span class="__shiki_mdbnqw">&quot;mysql-operator-lock&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		LeaseDuration:          </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">leaseDuration,</span></span>
<span class="line"><span class="__shiki_140thh">		RenewDeadline:          </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">renewDeadline,</span></span>
<span class="line"><span class="__shiki_140thh">		RetryPeriod:            </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">retryPeriod,</span></span>
<span class="line"><span class="__shiki_21nrsd">		// 命名空间限制（可选）</span></span>
<span class="line"><span class="__shiki_140thh">		Namespace:              os.</span><span class="__shiki_1t8gfj">Getenv</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;WATCH_NAMESPACE&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">	})</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		setupLog.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(err, </span><span class="__shiki_mdbnqw">&quot;无法创建管理器&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">		os.</span><span class="__shiki_1t8gfj">Exit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 设置控制器</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">controllers</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">MySQLClusterReconciler</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">		Client:   mgr.</span><span class="__shiki_1t8gfj">GetClient</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">		Scheme:   mgr.</span><span class="__shiki_1t8gfj">GetScheme</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">		Recorder: mgr.</span><span class="__shiki_1t8gfj">GetEventRecorderFor</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;mysql-operator&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">		Config: </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">controllers</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">OperatorConfig</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">			BackupImage:        </span><span class="__shiki_mdbnqw">&quot;mysql-backup:latest&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">			MetricsImage:       </span><span class="__shiki_mdbnqw">&quot;mysql-exporter:latest&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">			DefaultStorageSize: </span><span class="__shiki_mdbnqw">&quot;10Gi&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		},</span></span>
<span class="line"><span class="__shiki_140thh">	}).</span><span class="__shiki_1t8gfj">SetupWithManager</span><span class="__shiki_140thh">(mgr); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		setupLog.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(err, </span><span class="__shiki_mdbnqw">&quot;无法创建控制器&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;controller&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;MySQLCluster&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">		os.</span><span class="__shiki_1t8gfj">Exit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 设置Webhook</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> os.</span><span class="__shiki_1t8gfj">Getenv</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ENABLE_WEBHOOKS&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_mdbnqw"> &quot;false&quot;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">		if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">databasev1alpha1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">MySQLCluster</span><span class="__shiki_140thh">{}).</span><span class="__shiki_1t8gfj">SetupWebhookWithManager</span><span class="__shiki_140thh">(mgr); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">			setupLog.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(err, </span><span class="__shiki_mdbnqw">&quot;无法创建webhook&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;webhook&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;MySQLCluster&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">			os.</span><span class="__shiki_1t8gfj">Exit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">		}</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 健康检查</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> mgr.</span><span class="__shiki_1t8gfj">AddHealthzCheck</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;healthz&quot;</span><span class="__shiki_140thh">, healthz.Ping); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		setupLog.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(err, </span><span class="__shiki_mdbnqw">&quot;无法设置健康检查&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">		os.</span><span class="__shiki_1t8gfj">Exit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> mgr.</span><span class="__shiki_1t8gfj">AddReadyzCheck</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;readyz&quot;</span><span class="__shiki_140thh">, healthz.Ping); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		setupLog.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(err, </span><span class="__shiki_mdbnqw">&quot;无法设置就绪检查&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">		os.</span><span class="__shiki_1t8gfj">Exit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_140thh">	setupLog.</span><span class="__shiki_1t8gfj">Info</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;启动管理器&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> mgr.</span><span class="__shiki_1t8gfj">Start</span><span class="__shiki_140thh">(ctrl.</span><span class="__shiki_1t8gfj">SetupSignalHandler</span><span class="__shiki_140thh">()); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		setupLog.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(err, </span><span class="__shiki_mdbnqw">&quot;管理器运行失败&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">		os.</span><span class="__shiki_1t8gfj">Exit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="五、operator-测试策略" tabindex="-1">五、Operator 测试策略 <a class="header-anchor" href="#五、operator-测试策略" aria-label="Permalink to &quot;五、Operator 测试策略&quot;">​</a></h2><h3 id="_5-1-单元测试" tabindex="-1">5.1 单元测试 <a class="header-anchor" href="#_5-1-单元测试" aria-label="Permalink to &quot;5.1 单元测试&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// controllers/suite_test.go</span></span>
<span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> controllers</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">path/filepath</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">testing</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">time</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">	. </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">github.com/onsi/ginkgo/v2</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">	. </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">github.com/onsi/gomega</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">k8s.io/client-go/kubernetes/scheme</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">k8s.io/client-go/rest</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">sigs.k8s.io/controller-runtime/pkg/client</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">sigs.k8s.io/controller-runtime/pkg/envtest</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">	logf </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">sigs.k8s.io/controller-runtime/pkg/log</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">sigs.k8s.io/controller-runtime/pkg/log/zap</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">	databasev1alpha1 </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">github.com/example/my-operator/api/v1alpha1</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> cfg </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">rest</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Config</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> k8sClient </span><span class="__shiki_1t8gfj">client</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Client</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> testEnv </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">envtest</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Environment</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> TestAPIs</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">testing</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">T</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">	RegisterFailHandler</span><span class="__shiki_140thh">(Fail)</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_1t8gfj">	RunSpecs</span><span class="__shiki_140thh">(t, </span><span class="__shiki_mdbnqw">&quot;Controller Suite&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> _ </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> BeforeSuite</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">	logf.</span><span class="__shiki_1t8gfj">SetLogger</span><span class="__shiki_140thh">(zap.</span><span class="__shiki_1t8gfj">New</span><span class="__shiki_140thh">(zap.</span><span class="__shiki_1t8gfj">WriteTo</span><span class="__shiki_140thh">(GinkgoWriter), zap.</span><span class="__shiki_1t8gfj">UseDevMode</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">)))</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_1t8gfj">	By</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;启动测试环境&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	testEnv </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">envtest</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Environment</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">		CRDDirectoryPaths:     []</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">{filepath.</span><span class="__shiki_1t8gfj">Join</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;..&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;config&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;crd&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;bases&quot;</span><span class="__shiki_140thh">)},</span></span>
<span class="line"><span class="__shiki_140thh">		ErrorIfCRDPathMissing: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">		// 可以设置控制面启动超时</span></span>
<span class="line"><span class="__shiki_140thh">		ControlPlaneStartTimeout: time.Minute,</span></span>
<span class="line"><span class="__shiki_140thh">		ControlPlaneStopTimeout:  time.Minute,</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_1itgoe">	var</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">error</span></span>
<span class="line"><span class="__shiki_140thh">	cfg, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> testEnv.</span><span class="__shiki_1t8gfj">Start</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1t8gfj">	Expect</span><span class="__shiki_140thh">(err).</span><span class="__shiki_1t8gfj">NotTo</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">HaveOccurred</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_1t8gfj">	Expect</span><span class="__shiki_140thh">(cfg).</span><span class="__shiki_1t8gfj">NotTo</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">BeNil</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_140thh">	err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> databasev1alpha1.</span><span class="__shiki_1t8gfj">AddToScheme</span><span class="__shiki_140thh">(scheme.Scheme)</span></span>
<span class="line"><span class="__shiki_1t8gfj">	Expect</span><span class="__shiki_140thh">(err).</span><span class="__shiki_1t8gfj">NotTo</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">HaveOccurred</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_140thh">	k8sClient, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">New</span><span class="__shiki_140thh">(cfg, </span><span class="__shiki_1t8gfj">client</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Options</span><span class="__shiki_140thh">{Scheme: scheme.Scheme})</span></span>
<span class="line"><span class="__shiki_1t8gfj">	Expect</span><span class="__shiki_140thh">(err).</span><span class="__shiki_1t8gfj">NotTo</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">HaveOccurred</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_1t8gfj">	Expect</span><span class="__shiki_140thh">(k8sClient).</span><span class="__shiki_1t8gfj">NotTo</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">BeNil</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> _ </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> AfterSuite</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1t8gfj">	By</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;停止测试环境&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> testEnv.</span><span class="__shiki_1t8gfj">Stop</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1t8gfj">	Expect</span><span class="__shiki_140thh">(err).</span><span class="__shiki_1t8gfj">NotTo</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">HaveOccurred</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span></code></pre></div><h3 id="_5-2-集成测试" tabindex="-1">5.2 集成测试 <a class="header-anchor" href="#_5-2-集成测试" aria-label="Permalink to &quot;5.2 集成测试&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// controllers/mysqlcluster_controller_test.go</span></span>
<span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> controllers</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">context</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">time</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">	. </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">github.com/onsi/ginkgo/v2</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">	. </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">github.com/onsi/gomega</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">	appsv1 </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">k8s.io/api/apps/v1</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">	corev1 </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">k8s.io/api/core/v1</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">	metav1 </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">k8s.io/apimachinery/pkg/apis/meta/v1</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">k8s.io/apimachinery/pkg/types</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">	databasev1alpha1 </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">github.com/example/my-operator/api/v1alpha1</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> _ </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> Describe</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;MySQLCluster控制器&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">	const</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">		clusterName</span><span class="__shiki_1itgoe">      =</span><span class="__shiki_mdbnqw"> &quot;test-mysql-cluster&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">		clusterNamespace</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;default&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">		timeout</span><span class="__shiki_1itgoe">          =</span><span class="__shiki_140thh"> time.Second </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"><span class="__shiki_dzsirb">		interval</span><span class="__shiki_1itgoe">         =</span><span class="__shiki_140thh"> time.Millisecond </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 250</span></span>
<span class="line"><span class="__shiki_140thh">	)</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_1t8gfj">	Context</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;创建MySQLCluster&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1t8gfj">		It</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;应该成功创建相关资源&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1t8gfj">			By</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;创建MySQLCluster&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">			ctx </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">			</span></span>
<span class="line"><span class="__shiki_140thh">			cluster </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">databasev1alpha1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">MySQLCluster</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">				ObjectMeta: </span><span class="__shiki_1t8gfj">metav1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ObjectMeta</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">					Name:      clusterName,</span></span>
<span class="line"><span class="__shiki_140thh">					Namespace: clusterNamespace,</span></span>
<span class="line"><span class="__shiki_140thh">				},</span></span>
<span class="line"><span class="__shiki_140thh">				Spec: </span><span class="__shiki_1t8gfj">databasev1alpha1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">MySQLClusterSpec</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">					Replicas: </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">					Version:  </span><span class="__shiki_mdbnqw">&quot;8.0.26&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">					Storage: </span><span class="__shiki_1t8gfj">databasev1alpha1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">StorageSpec</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">						Size: </span><span class="__shiki_mdbnqw">&quot;10Gi&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">					},</span></span>
<span class="line"><span class="__shiki_140thh">				},</span></span>
<span class="line"><span class="__shiki_140thh">			}</span></span>
<span class="line"><span class="__shiki_140thh">			</span></span>
<span class="line"><span class="__shiki_1t8gfj">			Expect</span><span class="__shiki_140thh">(k8sClient.</span><span class="__shiki_1t8gfj">Create</span><span class="__shiki_140thh">(ctx, cluster)).</span><span class="__shiki_1t8gfj">Should</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Succeed</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">			</span></span>
<span class="line"><span class="__shiki_21nrsd">			// 等待状态更新</span></span>
<span class="line"><span class="__shiki_1t8gfj">			Eventually</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">() </span><span class="__shiki_1t8gfj">databasev1alpha1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ClusterPhase</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">				err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> k8sClient.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(ctx, </span></span>
<span class="line"><span class="__shiki_1t8gfj">					types</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">NamespacedName</span><span class="__shiki_140thh">{Name: clusterName, Namespace: clusterNamespace},</span></span>
<span class="line"><span class="__shiki_140thh">					cluster)</span></span>
<span class="line"><span class="__shiki_1itgoe">				if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">					return</span><span class="__shiki_mdbnqw"> &quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">				}</span></span>
<span class="line"><span class="__shiki_1itgoe">				return</span><span class="__shiki_140thh"> cluster.Status.Phase</span></span>
<span class="line"><span class="__shiki_140thh">			}, timeout, interval).</span><span class="__shiki_1t8gfj">Should</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Equal</span><span class="__shiki_140thh">(databasev1alpha1.ClusterPhaseCreating))</span></span>
<span class="line"><span class="__shiki_140thh">			</span></span>
<span class="line"><span class="__shiki_21nrsd">			// 验证StatefulSet创建</span></span>
<span class="line"><span class="__shiki_140thh">			sts </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">appsv1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">StatefulSet</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_1t8gfj">			Eventually</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">				return</span><span class="__shiki_140thh"> k8sClient.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(ctx, </span></span>
<span class="line"><span class="__shiki_1t8gfj">					types</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">NamespacedName</span><span class="__shiki_140thh">{Name: clusterName, Namespace: clusterNamespace},</span></span>
<span class="line"><span class="__shiki_140thh">					sts)</span></span>
<span class="line"><span class="__shiki_140thh">			}, timeout, interval).</span><span class="__shiki_1t8gfj">Should</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Succeed</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">			</span></span>
<span class="line"><span class="__shiki_1t8gfj">			Expect</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">sts.Spec.Replicas).</span><span class="__shiki_1t8gfj">To</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Equal</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int32</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">)))</span></span>
<span class="line"><span class="__shiki_140thh">			</span></span>
<span class="line"><span class="__shiki_21nrsd">			// 验证Service创建</span></span>
<span class="line"><span class="__shiki_140thh">			svc </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Service</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_1t8gfj">			Eventually</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">				return</span><span class="__shiki_140thh"> k8sClient.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(ctx, </span></span>
<span class="line"><span class="__shiki_1t8gfj">					types</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">NamespacedName</span><span class="__shiki_140thh">{Name: clusterName, Namespace: clusterNamespace},</span></span>
<span class="line"><span class="__shiki_140thh">					svc)</span></span>
<span class="line"><span class="__shiki_140thh">			}, timeout, interval).</span><span class="__shiki_1t8gfj">Should</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Succeed</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">		})</span></span>
<span class="line"><span class="__shiki_140thh">	})</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span></code></pre></div><h3 id="_5-3-e2e测试" tabindex="-1">5.3 E2E测试 <a class="header-anchor" href="#_5-3-e2e测试" aria-label="Permalink to &quot;5.3 E2E测试&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># e2e-test.sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置测试环境</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_140thh"> OPERATOR_NAMESPACE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">mysql-operator-system</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_140thh"> TEST_NAMESPACE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">mysql-test</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 部署Operator</span></span>
<span class="line"><span class="__shiki_1t8gfj">make</span><span class="__shiki_mdbnqw"> deploy</span><span class="__shiki_mdbnqw"> IMG=example.com/my-operator:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 等待Operator就绪</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> wait</span><span class="__shiki_dzsirb"> --for=condition=available</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --timeout=300s</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  deployment/mysql-operator-controller-manager</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -n</span><span class="__shiki_140thh"> $OPERATOR_NAMESPACE</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建测试命名空间</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_mdbnqw"> namespace</span><span class="__shiki_140thh"> $TEST_NAMESPACE</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 部署测试CR</span></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw">EOF</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> -</span></span>
<span class="line"><span class="__shiki_mdbnqw">apiVersion: database.example.com/v1alpha1</span></span>
<span class="line"><span class="__shiki_mdbnqw">kind: MySQLCluster</span></span>
<span class="line"><span class="__shiki_mdbnqw">metadata:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  name: e2e-test-cluster</span></span>
<span class="line"><span class="__shiki_mdbnqw">  namespace: </span><span class="__shiki_140thh">$TEST_NAMESPACE</span></span>
<span class="line"><span class="__shiki_mdbnqw">spec:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  replicas: 2</span></span>
<span class="line"><span class="__shiki_mdbnqw">  version: &quot;8.0.26&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  storage:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    size: &quot;5Gi&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 等待集群就绪</span></span>
<span class="line"><span class="__shiki_140thh">timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">300</span></span>
<span class="line"><span class="__shiki_140thh">interval</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">10</span></span>
<span class="line"><span class="__shiki_140thh">elapsed</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">while</span><span class="__shiki_140thh"> [ $elapsed </span><span class="__shiki_1itgoe">-lt</span><span class="__shiki_140thh"> $timeout ]; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_140thh">  phase</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> mysqlcluster</span><span class="__shiki_mdbnqw"> e2e-test-cluster</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    -n</span><span class="__shiki_140thh"> $TEST_NAMESPACE </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_dzsirb">    -o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.status.phase}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$phase</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;Running&quot;</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;MySQL集群运行正常&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    break</span></span>
<span class="line"><span class="__shiki_1itgoe">  fi</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_dzsirb">  echo</span><span class="__shiki_mdbnqw"> &quot;等待集群就绪... 当前状态: </span><span class="__shiki_140thh">$phase</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">  sleep</span><span class="__shiki_140thh"> $interval</span></span>
<span class="line"><span class="__shiki_140thh">  elapsed</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$((</span><span class="__shiki_1t8gfj">elapsed</span><span class="__shiki_mdbnqw"> +</span><span class="__shiki_mdbnqw"> interval</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_1itgoe">done</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 运行连接测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_mdbnqw"> mysql-client</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --rm</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_dzsirb"> --tty</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --image=mysql:8.0</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --restart=Never</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --command</span><span class="__shiki_dzsirb"> --</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  mysql</span><span class="__shiki_dzsirb"> -h</span><span class="__shiki_mdbnqw"> e2e-test-cluster</span><span class="__shiki_dzsirb"> -u</span><span class="__shiki_mdbnqw"> root</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_140thh">$MYSQL_ROOT_PASSWORD</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;SELECT 1&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 清理</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> delete</span><span class="__shiki_mdbnqw"> mysqlcluster</span><span class="__shiki_mdbnqw"> e2e-test-cluster</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $TEST_NAMESPACE</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> delete</span><span class="__shiki_mdbnqw"> namespace</span><span class="__shiki_140thh"> $TEST_NAMESPACE</span></span>
<span class="line"><span class="__shiki_1t8gfj">make</span><span class="__shiki_mdbnqw"> undeploy</span></span></code></pre></div><h2 id="六、operator-打包与分发" tabindex="-1">六、Operator 打包与分发 <a class="header-anchor" href="#六、operator-打包与分发" aria-label="Permalink to &quot;六、Operator 打包与分发&quot;">​</a></h2><h3 id="_6-1-olm-operator-lifecycle-manager-集成" tabindex="-1">6.1 OLM（Operator Lifecycle Manager）集成 <a class="header-anchor" href="#_6-1-olm-operator-lifecycle-manager-集成" aria-label="Permalink to &quot;6.1 OLM（Operator Lifecycle Manager）集成&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># config/manifests/bases/my-operator.clusterserviceversion.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">operators.coreos.com/v1alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ClusterServiceVersion</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    alm-examples</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      [</span></span>
<span class="line"><span class="__shiki_mdbnqw">        {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &quot;apiVersion&quot;: &quot;database.example.com/v1alpha1&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &quot;kind&quot;: &quot;MySQLCluster&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &quot;metadata&quot;: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;name&quot;: &quot;example-mysql&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          },</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &quot;spec&quot;: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;replicas&quot;: 3,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;version&quot;: &quot;8.0.26&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;storage&quot;: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">              &quot;size&quot;: &quot;10Gi&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">          }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">      ]</span></span>
<span class="line"><span class="__shiki_17hn0y">    capabilities</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Seamless Upgrades&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    categories</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Database&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    containerImage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;example.com/my-operator:v0.1.0&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    createdAt</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2023-01-01T00:00:00Z&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;MySQL数据库Operator&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    repository</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;https://github.com/example/my-operator&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    support</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;example.com&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">my-operator.v0.1.0</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">placeholder</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  apiservicedefinitions</span><span class="__shiki_140thh">: {}</span></span>
<span class="line"><span class="__shiki_17hn0y">  customresourcedefinitions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    owned</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">MySQLCluster是MySQL集群的自定义资源</span></span>
<span class="line"><span class="__shiki_17hn0y">      displayName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">MySQL Cluster</span></span>
<span class="line"><span class="__shiki_17hn0y">      kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">MySQLCluster</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">mysqlclusters.database.example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">      version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">  description</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">    一个用于管理MySQL集群的Kubernetes Operator，支持自动部署、</span></span>
<span class="line"><span class="__shiki_mdbnqw">    备份、监控和高可用配置。</span></span>
<span class="line"><span class="__shiki_17hn0y">  displayName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">MySQL Operator</span></span>
<span class="line"><span class="__shiki_17hn0y">  icon</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">base64data</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;...&quot;</span><span class="__shiki_21nrsd">  # Base64编码的图标</span></span>
<span class="line"><span class="__shiki_17hn0y">    mediatype</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">image/svg+xml</span></span>
<span class="line"><span class="__shiki_17hn0y">  install</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      deployments</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">my-operator-controller-manager</span></span>
<span class="line"><span class="__shiki_17hn0y">        spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">          selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">              control-plane</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">controller-manager</span></span>
<span class="line"><span class="__shiki_17hn0y">          template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">              labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">                control-plane</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">controller-manager</span></span>
<span class="line"><span class="__shiki_17hn0y">            spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">              containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">              - </span><span class="__shiki_17hn0y">args</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                - </span><span class="__shiki_mdbnqw">--health-probe-bind-address=:8081</span></span>
<span class="line"><span class="__shiki_140thh">                - </span><span class="__shiki_mdbnqw">--metrics-bind-address=:8080</span></span>
<span class="line"><span class="__shiki_140thh">                - </span><span class="__shiki_mdbnqw">--leader-elect</span></span>
<span class="line"><span class="__shiki_17hn0y">                command</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                - </span><span class="__shiki_mdbnqw">/manager</span></span>
<span class="line"><span class="__shiki_17hn0y">                image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">example.com/my-operator:v0.1.0</span></span>
<span class="line"><span class="__shiki_17hn0y">                name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">manager</span></span>
<span class="line"><span class="__shiki_17hn0y">                resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">                  limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">                    cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">100m</span></span>
<span class="line"><span class="__shiki_17hn0y">                    memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">300Mi</span></span>
<span class="line"><span class="__shiki_17hn0y">                  requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">                    cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">100m</span></span>
<span class="line"><span class="__shiki_17hn0y">                    memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">200Mi</span></span>
<span class="line"><span class="__shiki_17hn0y">                livenessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">                  httpGet</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">                    path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/healthz</span></span>
<span class="line"><span class="__shiki_17hn0y">                    port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8081</span></span>
<span class="line"><span class="__shiki_17hn0y">                  initialDelaySeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">15</span></span>
<span class="line"><span class="__shiki_17hn0y">                  periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">20</span></span>
<span class="line"><span class="__shiki_17hn0y">                readinessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">                  httpGet</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">                    path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/readyz</span></span>
<span class="line"><span class="__shiki_17hn0y">                    port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8081</span></span>
<span class="line"><span class="__shiki_17hn0y">                  initialDelaySeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_17hn0y">                  periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_17hn0y">              terminationGracePeriodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_17hn0y">    strategy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">  installModes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">supported</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">OwnNamespace</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">supported</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">SingleNamespace</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">supported</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">MultiNamespace</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">supported</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AllNamespaces</span></span>
<span class="line"><span class="__shiki_17hn0y">  keywords</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">mysql</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">database</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">operator</span></span>
<span class="line"><span class="__shiki_17hn0y">  links</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Documentation</span></span>
<span class="line"><span class="__shiki_17hn0y">    url</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">https://github.com/example/my-operator/docs</span></span>
<span class="line"><span class="__shiki_17hn0y">  maintainers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">email</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">team@example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Example Team</span></span>
<span class="line"><span class="__shiki_17hn0y">  maturity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">alpha</span></span>
<span class="line"><span class="__shiki_17hn0y">  provider</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Example Inc.</span></span>
<span class="line"><span class="__shiki_17hn0y">  version</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0.1.0</span></span></code></pre></div><h3 id="_6-2-bundle格式" tabindex="-1">6.2 Bundle格式 <a class="header-anchor" href="#_6-2-bundle格式" aria-label="Permalink to &quot;6.2 Bundle格式&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 创建bundle</span></span>
<span class="line"><span class="__shiki_1t8gfj">make</span><span class="__shiki_mdbnqw"> bundle</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 构建bundle镜像</span></span>
<span class="line"><span class="__shiki_1t8gfj">make</span><span class="__shiki_mdbnqw"> bundle-build</span><span class="__shiki_mdbnqw"> BUNDLE_IMG=example.com/my-operator-bundle:v0.1.0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用opm索引</span></span>
<span class="line"><span class="__shiki_1t8gfj">opm</span><span class="__shiki_mdbnqw"> index</span><span class="__shiki_mdbnqw"> add</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --bundles</span><span class="__shiki_mdbnqw"> example.com/my-operator-bundle:v0.1.0</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --tag</span><span class="__shiki_mdbnqw"> example.com/my-operator-index:v0.1.0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 部署到OperatorHub</span></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw">EOF</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> -</span></span>
<span class="line"><span class="__shiki_mdbnqw">apiVersion: operators.coreos.com/v1alpha1</span></span>
<span class="line"><span class="__shiki_mdbnqw">kind: CatalogSource</span></span>
<span class="line"><span class="__shiki_mdbnqw">metadata:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  name: my-operator-catalog</span></span>
<span class="line"><span class="__shiki_mdbnqw">  namespace: olm</span></span>
<span class="line"><span class="__shiki_mdbnqw">spec:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  sourceType: grpc</span></span>
<span class="line"><span class="__shiki_mdbnqw">  image: example.com/my-operator-index:v0.1.0</span></span>
<span class="line"><span class="__shiki_mdbnqw">  displayName: My Operator Catalog</span></span>
<span class="line"><span class="__shiki_mdbnqw">  publisher: Example Inc.</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span></code></pre></div><h2 id="七、高级模式与最佳实践" tabindex="-1">七、高级模式与最佳实践 <a class="header-anchor" href="#七、高级模式与最佳实践" aria-label="Permalink to &quot;七、高级模式与最佳实践&quot;">​</a></h2><h3 id="_7-1-水平自动伸缩-hpa-集成" tabindex="-1">7.1 水平自动伸缩（HPA）集成 <a class="header-anchor" href="#_7-1-水平自动伸缩-hpa-集成" aria-label="Permalink to &quot;7.1 水平自动伸缩（HPA）集成&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 支持自动伸缩的Operator</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">r </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MySQLClusterReconciler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">reconcileAutoscaling</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">cluster</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">databasev1alpha1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">MySQLCluster</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> cluster.Spec.Autoscaling </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">cluster.Spec.Autoscaling.Enabled {</span></span>
<span class="line"><span class="__shiki_21nrsd">		// 删除现有的HPA</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span><span class="__shiki_140thh"> r.</span><span class="__shiki_1t8gfj">deleteHPAIfExists</span><span class="__shiki_140thh">(ctx, cluster)</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">	hpa </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">autoscalingv2</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">HorizontalPodAutoscaler</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">		ObjectMeta: </span><span class="__shiki_1t8gfj">metav1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ObjectMeta</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">			Name:      cluster.Name,</span></span>
<span class="line"><span class="__shiki_140thh">			Namespace: cluster.Namespace,</span></span>
<span class="line"><span class="__shiki_140thh">		},</span></span>
<span class="line"><span class="__shiki_140thh">		Spec: </span><span class="__shiki_1t8gfj">autoscalingv2</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">HorizontalPodAutoscalerSpec</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">			ScaleTargetRef: </span><span class="__shiki_1t8gfj">autoscalingv2</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">CrossVersionObjectReference</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">				APIVersion: </span><span class="__shiki_mdbnqw">&quot;apps/v1&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">				Kind:       </span><span class="__shiki_mdbnqw">&quot;StatefulSet&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">				Name:       cluster.Name,</span></span>
<span class="line"><span class="__shiki_140thh">			},</span></span>
<span class="line"><span class="__shiki_140thh">			MinReplicas: </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">cluster.Spec.Autoscaling.MinReplicas,</span></span>
<span class="line"><span class="__shiki_140thh">			MaxReplicas: cluster.Spec.Autoscaling.MaxReplicas,</span></span>
<span class="line"><span class="__shiki_140thh">			Metrics: []</span><span class="__shiki_1t8gfj">autoscalingv2</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">MetricSpec</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">				{</span></span>
<span class="line"><span class="__shiki_140thh">					Type: autoscalingv2.ResourceMetricSourceType,</span></span>
<span class="line"><span class="__shiki_140thh">					Resource: </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">autoscalingv2</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ResourceMetricSource</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">						Name: corev1.ResourceCPU,</span></span>
<span class="line"><span class="__shiki_140thh">						Target: </span><span class="__shiki_1t8gfj">autoscalingv2</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">MetricTarget</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">							Type:               autoscalingv2.UtilizationMetricType,</span></span>
<span class="line"><span class="__shiki_140thh">							AverageUtilization: </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">cluster.Spec.Autoscaling.TargetCPUUtilization,</span></span>
<span class="line"><span class="__shiki_140thh">						},</span></span>
<span class="line"><span class="__shiki_140thh">					},</span></span>
<span class="line"><span class="__shiki_140thh">				},</span></span>
<span class="line"><span class="__shiki_140thh">			},</span></span>
<span class="line"><span class="__shiki_140thh">		},</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">	// 设置OwnerReference</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> ctrl.</span><span class="__shiki_1t8gfj">SetControllerReference</span><span class="__shiki_140thh">(cluster, hpa, r.Scheme); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">	return</span><span class="__shiki_140thh"> r.</span><span class="__shiki_1t8gfj">CreateOrUpdate</span><span class="__shiki_140thh">(ctx, hpa, </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		hpa.Spec </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> hpa.Spec</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">	})</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-事件驱动调和" tabindex="-1">7.2 事件驱动调和 <a class="header-anchor" href="#_7-2-事件驱动调和" aria-label="Permalink to &quot;7.2 事件驱动调和&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用事件驱动优化调和</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">r </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MySQLClusterReconciler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">SetupWithManager</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">mgr</span><span class="__shiki_1t8gfj"> ctrl</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Manager</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">	return</span><span class="__shiki_140thh"> ctrl.</span><span class="__shiki_1t8gfj">NewControllerManagedBy</span><span class="__shiki_140thh">(mgr).</span></span>
<span class="line"><span class="__shiki_1t8gfj">		For</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">databasev1alpha1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">MySQLCluster</span><span class="__shiki_140thh">{}).</span></span>
<span class="line"><span class="__shiki_1t8gfj">		Owns</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">appsv1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">StatefulSet</span><span class="__shiki_140thh">{}).</span></span>
<span class="line"><span class="__shiki_1t8gfj">		Owns</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Service</span><span class="__shiki_140thh">{}).</span></span>
<span class="line"><span class="__shiki_1t8gfj">		Owns</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ConfigMap</span><span class="__shiki_140thh">{}).</span></span>
<span class="line"><span class="__shiki_1t8gfj">		Owns</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">corev1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Secret</span><span class="__shiki_140thh">{}).</span></span>
<span class="line"><span class="__shiki_1t8gfj">		WithEventFilter</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">predicate</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Funcs</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">			// 忽略元数据变化</span></span>
<span class="line"><span class="__shiki_140thh">			UpdateFunc: </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">e</span><span class="__shiki_1t8gfj"> event</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">UpdateEvent</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">				oldObj </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> e.ObjectOld.(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">databasev1alpha1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">MySQLCluster</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">				newObj </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> e.ObjectNew.(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">databasev1alpha1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">MySQLCluster</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">				</span></span>
<span class="line"><span class="__shiki_21nrsd">				// 只处理spec变化或删除时间戳变化</span></span>
<span class="line"><span class="__shiki_1itgoe">				if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">reflect.</span><span class="__shiki_1t8gfj">DeepEqual</span><span class="__shiki_140thh">(oldObj.Spec, newObj.Spec) </span><span class="__shiki_1itgoe">||</span></span>
<span class="line"><span class="__shiki_1itgoe">					!</span><span class="__shiki_140thh">oldObj.DeletionTimestamp.</span><span class="__shiki_1t8gfj">Equal</span><span class="__shiki_140thh">(newObj.DeletionTimestamp) {</span></span>
<span class="line"><span class="__shiki_1itgoe">					return</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_140thh">				}</span></span>
<span class="line"><span class="__shiki_140thh">				</span></span>
<span class="line"><span class="__shiki_21nrsd">				// 忽略状态变化</span></span>
<span class="line"><span class="__shiki_1itgoe">				return</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">			},</span></span>
<span class="line"><span class="__shiki_140thh">			CreateFunc: </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">e</span><span class="__shiki_1t8gfj"> event</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">CreateEvent</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">				return</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_140thh">			},</span></span>
<span class="line"><span class="__shiki_140thh">			DeleteFunc: </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">e</span><span class="__shiki_1t8gfj"> event</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">DeleteEvent</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">				return</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_140thh">			},</span></span>
<span class="line"><span class="__shiki_140thh">			GenericFunc: </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">e</span><span class="__shiki_1t8gfj"> event</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">GenericEvent</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">				return</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">			},</span></span>
<span class="line"><span class="__shiki_140thh">		}).</span></span>
<span class="line"><span class="__shiki_1t8gfj">		WithOptions</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">controller</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Options</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">			MaxConcurrentReconciles: </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 并发调和数</span></span>
<span class="line"><span class="__shiki_140thh">			RateLimiter: workqueue.</span><span class="__shiki_1t8gfj">NewMaxOfRateLimiter</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">				workqueue.</span><span class="__shiki_1t8gfj">NewItemExponentialFailureRateLimiter</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">5</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">time.Millisecond, </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">time.Second),</span></span>
<span class="line"><span class="__shiki_1itgoe">				&amp;</span><span class="__shiki_1t8gfj">workqueue</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">BucketRateLimiter</span><span class="__shiki_140thh">{Limiter: rate.</span><span class="__shiki_1t8gfj">NewLimiter</span><span class="__shiki_140thh">(rate.</span><span class="__shiki_1t8gfj">Limit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)},</span></span>
<span class="line"><span class="__shiki_140thh">			),</span></span>
<span class="line"><span class="__shiki_140thh">		}).</span></span>
<span class="line"><span class="__shiki_1t8gfj">		Complete</span><span class="__shiki_140thh">(r)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-3-监控与可观测性" tabindex="-1">7.3 监控与可观测性 <a class="header-anchor" href="#_7-3-监控与可观测性" aria-label="Permalink to &quot;7.3 监控与可观测性&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 添加自定义指标</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">github.com/prometheus/client_golang/prometheus</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">sigs.k8s.io/controller-runtime/pkg/metrics</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 集群状态指标</span></span>
<span class="line"><span class="__shiki_140thh">	clusterPhaseGauge </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> prometheus.</span><span class="__shiki_1t8gfj">NewGaugeVec</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1t8gfj">		prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">GaugeOpts</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">			Name: </span><span class="__shiki_mdbnqw">&quot;mysql_operator_cluster_phase&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">			Help: </span><span class="__shiki_mdbnqw">&quot;MySQL集群当前阶段&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		},</span></span>
<span class="line"><span class="__shiki_140thh">		[]</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">{</span><span class="__shiki_mdbnqw">&quot;namespace&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;name&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;phase&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">	)</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 调和持续时间</span></span>
<span class="line"><span class="__shiki_140thh">	reconcileDuration </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> prometheus.</span><span class="__shiki_1t8gfj">NewHistogram</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1t8gfj">		prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">HistogramOpts</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">			Name:    </span><span class="__shiki_mdbnqw">&quot;mysql_operator_reconcile_duration_seconds&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">			Help:    </span><span class="__shiki_mdbnqw">&quot;调和持续时间&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">			Buckets: prometheus.</span><span class="__shiki_1t8gfj">ExponentialBuckets</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0.1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">		},</span></span>
<span class="line"><span class="__shiki_140thh">	)</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 调和错误计数</span></span>
<span class="line"><span class="__shiki_140thh">	reconcileErrors </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> prometheus.</span><span class="__shiki_1t8gfj">NewCounter</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1t8gfj">		prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">CounterOpts</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">			Name: </span><span class="__shiki_mdbnqw">&quot;mysql_operator_reconcile_errors_total&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">			Help: </span><span class="__shiki_mdbnqw">&quot;调和错误总数&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		},</span></span>
<span class="line"><span class="__shiki_140thh">	)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> init</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">	metrics.Registry.</span><span class="__shiki_1t8gfj">MustRegister</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">		clusterPhaseGauge,</span></span>
<span class="line"><span class="__shiki_140thh">		reconcileDuration,</span></span>
<span class="line"><span class="__shiki_140thh">		reconcileErrors,</span></span>
<span class="line"><span class="__shiki_140thh">	)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">r </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MySQLClusterReconciler</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Reconcile</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">req</span><span class="__shiki_1t8gfj"> ctrl</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Request</span><span class="__shiki_140thh">) (</span><span class="__shiki_1t8gfj">ctrl</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Result</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">	startTime </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">	defer</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">		duration </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Since</span><span class="__shiki_140thh">(startTime).</span><span class="__shiki_1t8gfj">Seconds</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">		reconcileDuration.</span><span class="__shiki_1t8gfj">Observe</span><span class="__shiki_140thh">(duration)</span></span>
<span class="line"><span class="__shiki_140thh">	}()</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// ... 调和逻辑 ...</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 更新指标</span></span>
<span class="line"><span class="__shiki_140thh">	clusterPhaseGauge.</span><span class="__shiki_1t8gfj">WithLabelValues</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">		cluster.Namespace,</span></span>
<span class="line"><span class="__shiki_140thh">		cluster.Name,</span></span>
<span class="line"><span class="__shiki_1itgoe">		string</span><span class="__shiki_140thh">(cluster.Status.Phase),</span></span>
<span class="line"><span class="__shiki_140thh">	).</span><span class="__shiki_1t8gfj">Set</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="八、调试与故障排除" tabindex="-1">八、调试与故障排除 <a class="header-anchor" href="#八、调试与故障排除" aria-label="Permalink to &quot;八、调试与故障排除&quot;">​</a></h2><h3 id="_8-1-本地开发调试" tabindex="-1">8.1 本地开发调试 <a class="header-anchor" href="#_8-1-本地开发调试" aria-label="Permalink to &quot;8.1 本地开发调试&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 本地运行Operator</span></span>
<span class="line"><span class="__shiki_1t8gfj">make</span><span class="__shiki_mdbnqw"> run</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 端口转发调试</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> port-forward</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> mysql-operator-system</span><span class="__shiki_mdbnqw"> deployment/mysql-operator-controller-manager</span><span class="__shiki_mdbnqw"> 8080:8080</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 使用delve调试</span></span>
<span class="line"><span class="__shiki_1t8gfj">dlv</span><span class="__shiki_mdbnqw"> debug</span><span class="__shiki_dzsirb"> --headless</span><span class="__shiki_dzsirb"> --listen=:2345</span><span class="__shiki_dzsirb"> --api-version=2</span><span class="__shiki_dzsirb"> --accept-multiclient</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 查看Operator日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> mysql-operator-system</span><span class="__shiki_mdbnqw"> deployment/mysql-operator-controller-manager</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_mdbnqw"> manager</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 查看事件</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> events</span><span class="__shiki_dzsirb"> --field-selector</span><span class="__shiki_mdbnqw"> involvedObject.kind=MySQLCluster</span><span class="__shiki_dzsirb"> --sort-by=</span><span class="__shiki_mdbnqw">&#39;.lastTimestamp&#39;</span></span></code></pre></div><h3 id="_8-2-常见问题排查" tabindex="-1">8.2 常见问题排查 <a class="header-anchor" href="#_8-2-常见问题排查" aria-label="Permalink to &quot;8.2 常见问题排查&quot;">​</a></h3><table tabindex="0"><thead><tr><th>问题</th><th>可能原因</th><th>解决方案</th></tr></thead><tbody><tr><td>CRD无法创建</td><td>1. RBAC权限不足<br>2. Webhook失败<br>3. 版本冲突</td><td>检查ClusterRole绑定<br>检查webhook日志<br>验证CRD版本</td></tr><tr><td>调和循环卡住</td><td>1. 资源创建失败<br>2. 最终状态不一致<br>3. 控制器死锁</td><td>检查相关资源状态<br>实现最终一致性逻辑<br>增加超时和重试</td></tr><tr><td>内存泄漏</td><td>1. 客户端缓存<br>2. Watch连接未关闭<br>3. 协程泄漏</td><td>定期刷新缓存<br>确保Context正确取消<br>使用pprof分析</td></tr><tr><td>性能问题</td><td>1. 调和频率过高<br>2. 资源列表操作<br>3. 事件风暴</td><td>优化事件过滤器<br>使用索引和字段选择器<br>实现防抖机制</td></tr></tbody></table><h2 id="九、生产就绪检查清单" tabindex="-1">九、生产就绪检查清单 <a class="header-anchor" href="#九、生产就绪检查清单" aria-label="Permalink to &quot;九、生产就绪检查清单&quot;">​</a></h2><h3 id="_9-1-安全性" tabindex="-1">9.1 安全性 <a class="header-anchor" href="#_9-1-安全性" aria-label="Permalink to &quot;9.1 安全性&quot;">​</a></h3><ul><li>[ ] 最小权限RBAC配置</li><li>[ ] 镜像签名与验证</li><li>[ ] 网络策略限制</li><li>[ ] 敏感信息加密</li><li>[ ] 安全上下文配置</li></ul><h3 id="_9-2-可靠性" tabindex="-1">9.2 可靠性 <a class="header-anchor" href="#_9-2-可靠性" aria-label="Permalink to &quot;9.2 可靠性&quot;">​</a></h3><ul><li>[ ] 领导选举配置</li><li>[ ] Pod反亲和性</li><li>[ ] 资源限制与请求</li><li>[ ] 优雅终止处理</li><li>[ ] 健康检查端点</li></ul><h3 id="_9-3-可观测性" tabindex="-1">9.3 可观测性 <a class="header-anchor" href="#_9-3-可观测性" aria-label="Permalink to &quot;9.3 可观测性&quot;">​</a></h3><ul><li>[ ] Prometheus指标暴露</li><li>[ ] 结构化日志输出</li><li>[ ] 分布式追踪集成</li><li>[ ] 审计日志记录</li><li>[ ] 事件报告</li></ul><h3 id="_9-4-运维性" tabindex="-1">9.4 运维性 <a class="header-anchor" href="#_9-4-运维性" aria-label="Permalink to &quot;9.4 运维性&quot;">​</a></h3><ul><li>[ ] 版本升级策略</li><li>[ ] 备份与恢复流程</li><li>[ ] 配置热更新</li><li>[ ] 文档和示例</li><li>[ ] 测试覆盖</li></ul><h2 id="十、未来发展趋势" tabindex="-1">十、未来发展趋势 <a class="header-anchor" href="#十、未来发展趋势" aria-label="Permalink to &quot;十、未来发展趋势&quot;">​</a></h2><h3 id="_10-1-operator-framework-2-0" tabindex="-1">10.1 Operator Framework 2.0 <a class="header-anchor" href="#_10-1-operator-framework-2-0" aria-label="Permalink to &quot;10.1 Operator Framework 2.0&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 下一代Operator特性</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">operators.coreos.com/v2alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Operator</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">next-gen-operator</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 声明式工作流</span></span>
<span class="line"><span class="__shiki_17hn0y">  workflows</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deploy</span></span>
<span class="line"><span class="__shiki_17hn0y">      steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">resource</span></span>
<span class="line"><span class="__shiki_17hn0y">          resource</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">            kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">wait</span></span>
<span class="line"><span class="__shiki_17hn0y">          for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ready</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">backup</span></span>
<span class="line"><span class="__shiki_17hn0y">      schedule</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;@daily&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # AI辅助运维</span></span>
<span class="line"><span class="__shiki_17hn0y">  aiAssist</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    models</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">anomaly-detection</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">capacity-planning</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # GitOps集成</span></span>
<span class="line"><span class="__shiki_17hn0y">  gitOps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    repo</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">https://github.com/example/gitops</span></span>
<span class="line"><span class="__shiki_17hn0y">    syncInterval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span></code></pre></div><h3 id="_10-2-无服务器operator" tabindex="-1">10.2 无服务器Operator <a class="header-anchor" href="#_10-2-无服务器operator" aria-label="Permalink to &quot;10.2 无服务器Operator&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 基于Knative的Serverless Operator</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">knative.dev/serving/pkg/apis/serving/v1</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">	servingclient </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">knative.dev/serving/pkg/client/clientset/versioned</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> ServerlessOperator</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">	servingClient </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">servingclient</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Clientset</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">o </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">ServerlessOperator</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Reconcile</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">req</span><span class="__shiki_1t8gfj"> Request</span><span class="__shiki_140thh">) (</span><span class="__shiki_1t8gfj">Result</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 基于请求量自动伸缩</span></span>
<span class="line"><span class="__shiki_140thh">	service </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">v1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Service</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">		Spec: </span><span class="__shiki_1t8gfj">v1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ServiceSpec</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">			ConfigurationSpec: </span><span class="__shiki_1t8gfj">v1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ConfigurationSpec</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">				Template: </span><span class="__shiki_1t8gfj">v1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RevisionTemplateSpec</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">					Spec: </span><span class="__shiki_1t8gfj">v1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RevisionSpec</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">						ContainerConcurrency: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">						TimeoutSeconds:      </span><span class="__shiki_dzsirb">300</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">					},</span></span>
<span class="line"><span class="__shiki_140thh">				},</span></span>
<span class="line"><span class="__shiki_140thh">			},</span></span>
<span class="line"><span class="__shiki_140thh">		},</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 零缩容支持</span></span>
<span class="line"><span class="__shiki_1itgoe">	return</span><span class="__shiki_140thh"> o.</span><span class="__shiki_1t8gfj">scaleToZeroIfIdle</span><span class="__shiki_140thh">(ctx, service)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>Kubernetes Operator开发模式是现代云原生应用管理的核心范式，它将领域专家的运维知识编码为可重复执行的软件。开发高质量Operator需要：</p><ol><li><strong>深入理解Kubernetes API</strong>：掌握控制器模式、资源管理等核心概念</li><li><strong>选择合适的框架</strong>：根据团队技术栈和需求选择合适开发框架</li><li><strong>设计良好的API</strong>：遵循Kubernetes API约定，提供清晰的CRD</li><li><strong>实现健壮的调和逻辑</strong>：处理各种边缘情况，确保最终一致性</li><li><strong>全面的测试策略</strong>：单元测试、集成测试、E2E测试全覆盖</li><li><strong>生产就绪特性</strong>：安全性、可观测性、可靠性缺一不可</li></ol><p>随着Operator生态的成熟，未来将出现更多标准化工具和最佳实践，使复杂应用的自动化管理变得更加简单和可靠。</p>`,79)])])}const d=a(i,[["render",l]]);export{r as __pageData,d as default};
