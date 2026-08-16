import{_ as a,o as n,c as p,a as i}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"GitOps多集群管理完整指南：实现规模化云原生部署","description":"","frontmatter":{},"headers":[],"relativePath":"devops/deployment/gitops/multi-cluster.md","filePath":"devops/deployment/gitops/multi-cluster.md"}'),_={name:"devops/deployment/gitops/multi-cluster.md"};function l(h,s,c,e,t,k){return n(),p("div",null,[...s[0]||(s[0]=[i(`<h1 id="gitops多集群管理完整指南-实现规模化云原生部署" tabindex="-1">GitOps多集群管理完整指南：实现规模化云原生部署 <a class="header-anchor" href="#gitops多集群管理完整指南-实现规模化云原生部署" aria-label="Permalink to &quot;GitOps多集群管理完整指南：实现规模化云原生部署&quot;">​</a></h1><h2 id="_1-多集群gitops的基本概念与价值" tabindex="-1">1. 多集群GitOps的基本概念与价值 <a class="header-anchor" href="#_1-多集群gitops的基本概念与价值" aria-label="Permalink to &quot;1. 多集群GitOps的基本概念与价值&quot;">​</a></h2><h3 id="_1-1-为什么需要多集群管理" tabindex="-1">1.1 为什么需要多集群管理？ <a class="header-anchor" href="#_1-1-为什么需要多集群管理" aria-label="Permalink to &quot;1.1 为什么需要多集群管理？&quot;">​</a></h3><p>在现代云原生环境中，<strong>单一集群无法满足复杂业务需求</strong>。多集群架构提供了以下核心优势：</p><ul><li><strong>故障隔离与高可用</strong>：应用跨多个集群部署，避免单点故障导致全面服务中断</li><li><strong>环境隔离</strong>：开发、测试、预发、生产环境物理或逻辑分离</li><li><strong>地理位置优化</strong>：不同区域部署降低网络延迟，满足数据主权要求</li><li><strong>资源优化与扩展</strong>：根据负载特性选择不同配置的集群，优化成本与性能</li><li><strong>渐进式升级</strong>：在部分集群验证新版本，降低全平台风险</li></ul><h3 id="_1-2-多集群gitops的核心挑战" tabindex="-1">1.2 多集群GitOps的核心挑战 <a class="header-anchor" href="#_1-2-多集群gitops的核心挑战" aria-label="Permalink to &quot;1.2 多集群GitOps的核心挑战&quot;">​</a></h3><p>实施多集群GitOps面临的主要技术挑战：</p><table tabindex="0"><thead><tr><th>挑战维度</th><th>具体问题</th><th>潜在影响</th></tr></thead><tbody><tr><td><strong>配置一致性</strong></td><td>跨集群配置漂移、版本不一致</td><td>环境差异导致故障、调试困难</td></tr><tr><td><strong>部署协调</strong></td><td>跨集群部署顺序、依赖管理</td><td>服务间调用失败、数据不一致</td></tr><tr><td><strong>安全性</strong></td><td>多集群凭证管理、网络策略同步</td><td>安全漏洞、未授权访问</td></tr><tr><td><strong>可观测性</strong></td><td>统一视图缺失、问题定位困难</td><td>故障响应延迟、MTTR增长</td></tr><tr><td><strong>运维复杂度</strong></td><td>手动操作频繁、流程不统一</td><td>人为错误、运维效率低下</td></tr></tbody></table><h2 id="_2-多集群gitops架构模式" tabindex="-1">2. 多集群GitOps架构模式 <a class="header-anchor" href="#_2-多集群gitops架构模式" aria-label="Permalink to &quot;2. 多集群GitOps架构模式&quot;">​</a></h2><h3 id="_2-1-星型辐射架构-hub-and-spoke" tabindex="-1">2.1 星型辐射架构（Hub-and-Spoke） <a class="header-anchor" href="#_2-1-星型辐射架构-hub-and-spoke" aria-label="Permalink to &quot;2.1 星型辐射架构（Hub-and-Spoke）&quot;">​</a></h3><p>这是最经典的多集群GitOps模式，<strong>通过中心控制平面管理多个工作集群</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│       中央管理集群(Hub)          │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌─────────────────────────┐    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ GitOps控制平面          │    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ • Flux/Argo CD控制中心  │    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ • 策略引擎(OPA/Gatekeeper)│    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ • 全局配置仓库           │    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └─────────────────────────┘    │</span></span>
<span class="line"><span class="__shiki_wvjl67">└───────────┬─────────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">            │ 推送配置/收集状态</span></span>
<span class="line"><span class="__shiki_wvjl67">    ┌───────┼───────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">    ▼       ▼       ▼</span></span>
<span class="line"><span class="__shiki_wvjl67">┌───────┐ ┌───────┐ ┌───────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│集群A   │ │集群B   │ │集群C   │</span></span>
<span class="line"><span class="__shiki_wvjl67">│(生产)  │ │(预发)  │ │(开发)  │</span></span>
<span class="line"><span class="__shiki_wvjl67">└───────┘ └───────┘ └───────┘</span></span></code></pre></div><p><strong>技术实现要点</strong>：</p><ol><li>中央集群运行完整的GitOps控制平面</li><li>工作集群运行轻量级代理或完整GitOps工具</li><li>配置通过中央仓库统一管理，按集群差异化</li></ol><p><strong>优势</strong>：</p><ul><li>集中控制，便于实施统一策略</li><li>减少网络连接复杂度（工作集群仅需连接中心）</li><li>配置变更的审批流程集中管理</li></ul><p><strong>劣势</strong>：</p><ul><li>中央集群成为单点故障（需高可用部署）</li><li>大规模场景下中心可能成为性能瓶颈</li></ul><h3 id="_2-2-平等联邦架构-peer-federation" tabindex="-1">2.2 平等联邦架构（Peer Federation） <a class="header-anchor" href="#_2-2-平等联邦架构-peer-federation" aria-label="Permalink to &quot;2.2 平等联邦架构（Peer Federation）&quot;">​</a></h3><p>在这种架构中，<strong>每个集群独立运行完整的GitOps工具链</strong>，通过共享配置源保持同步：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│       全局Git仓库                │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌─────────────────────────┐    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ 多集群配置              │    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ • 基础配置(base)        │    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ • 集群覆盖(overlays)    │    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └─────────────────────────┘    │</span></span>
<span class="line"><span class="__shiki_wvjl67">└───────────┬─────────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">            │ 拉取配置</span></span>
<span class="line"><span class="__shiki_wvjl67">    ┌───────┼───────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">    ▼       ▼       ▼</span></span>
<span class="line"><span class="__shiki_wvjl67">┌───────┐ ┌───────┐ ┌───────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│集群A   │ │集群B   │ │集群C   │</span></span>
<span class="line"><span class="__shiki_wvjl67">│(独立   │ │(独立   │ │(独立   │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Flux) │ │ Flux) │ │ Flux) │</span></span>
<span class="line"><span class="__shiki_wvjl67">└───────┘ └───────┘ └───────┘</span></span></code></pre></div><p><strong>技术实现要点</strong>：</p><ol><li>每个集群独立部署完整的GitOps工具（如Flux CD）</li><li>共享配置仓库，通过Kustomize/Helm实现集群差异化</li><li>集群间无直接控制依赖，仅共享配置源</li></ol><p><strong>优势</strong>：</p><ul><li>无单点故障，集群自治性高</li><li>扩展性强，新增集群只需配置拉取权限</li><li>网络架构简单，无中心出口带宽压力</li></ul><p><strong>劣势</strong>：</p><ul><li>配置变更需确保所有集群同步拉取</li><li>统一的策略执行需要额外机制保障</li></ul><h2 id="_3-多集群gitops技术栈选择" tabindex="-1">3. 多集群GitOps技术栈选择 <a class="header-anchor" href="#_3-多集群gitops技术栈选择" aria-label="Permalink to &quot;3. 多集群GitOps技术栈选择&quot;">​</a></h2><h3 id="_3-1-gitops工具对比" tabindex="-1">3.1 GitOps工具对比 <a class="header-anchor" href="#_3-1-gitops工具对比" aria-label="Permalink to &quot;3.1 GitOps工具对比&quot;">​</a></h3><table tabindex="0"><thead><tr><th>工具</th><th>多集群支持能力</th><th>核心特性</th><th>适用场景</th></tr></thead><tbody><tr><td><strong>Flux CD</strong></td><td>原生支持多集群，通过Kustomization定向</td><td>声明式API、镜像自动化、通知系统</td><td>复杂多集群环境、需要自动化策略</td></tr><tr><td><strong>Argo CD</strong></td><td>通过ApplicationSet支持多集群</td><td>可视化UI、同步状态直观、回滚便捷</td><td>需要强可视化、团队GitOps经验较少</td></tr><tr><td><strong>Fleet (Rancher)</strong></td><td>专为大规模集群设计</td><td>精简架构、批量操作、内置dashboard</td><td>超大规模集群管理(100+)</td></tr><tr><td><strong>Jenkins X</strong></td><td>集成GitOps与CI/CD流水线</td><td>全生命周期管理、预览环境</td><td>需要完整CI/CD流水线集成</td></tr></tbody></table><h3 id="_3-2-认证与连接管理" tabindex="-1">3.2 认证与连接管理 <a class="header-anchor" href="#_3-2-认证与连接管理" aria-label="Permalink to &quot;3.2 认证与连接管理&quot;">​</a></h3><p>安全的多集群访问是实施基础，主要有以下模式：</p><p><strong>方案一：服务账号令牌（ServiceAccount Token）</strong></p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 中央集群访问工作集群的权限配置</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ServiceAccount</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">flux-multicluster-sa</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">flux-system</span></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ClusterRole</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">flux-multicluster-role</span></span>
<span class="line"><span class="__shiki_17hn0y">rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">apiGroups</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  resources</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  verbs</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ClusterRoleBinding</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">flux-multicluster-binding</span></span>
<span class="line"><span class="__shiki_17hn0y">roleRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  apiGroup</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rbac.authorization.k8s.io</span></span>
<span class="line"><span class="__shiki_17hn0y">  kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ClusterRole</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">flux-multicluster-role</span></span>
<span class="line"><span class="__shiki_17hn0y">subjects</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ServiceAccount</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">flux-multicluster-sa</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">flux-system</span></span></code></pre></div><p><strong>方案二：OIDC联合身份认证</strong></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用集群联邦身份（如Azure AKS、EKS身份提供程序）</span></span>
<span class="line"><span class="__shiki_1t8gfj">flux</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_mdbnqw"> secret</span><span class="__shiki_mdbnqw"> oci</span><span class="__shiki_mdbnqw"> registry-secret</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --url=</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb">ACR_URL</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --username=</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb">SERVICE_PRINCIPAL_ID</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --password=</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb">SERVICE_PRINCIPAL_PASSWORD</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 配置跨集群信任关系</span></span>
<span class="line"><span class="__shiki_1t8gfj">apiVersion:</span><span class="__shiki_mdbnqw"> config.kubernetes.io/v1alpha1</span></span>
<span class="line"><span class="__shiki_1t8gfj">kind:</span><span class="__shiki_mdbnqw"> ClusterConfig</span></span>
<span class="line"><span class="__shiki_1t8gfj">metadata:</span></span>
<span class="line"><span class="__shiki_1t8gfj">  name:</span><span class="__shiki_mdbnqw"> cluster-trust-policy</span></span>
<span class="line"><span class="__shiki_1t8gfj">spec:</span></span>
<span class="line"><span class="__shiki_1t8gfj">  clusters:</span></span>
<span class="line"><span class="__shiki_1t8gfj">  -</span><span class="__shiki_mdbnqw"> name:</span><span class="__shiki_mdbnqw"> cluster-a</span></span>
<span class="line"><span class="__shiki_1t8gfj">    server:</span><span class="__shiki_mdbnqw"> https://cluster-a.example.com</span></span>
<span class="line"><span class="__shiki_1t8gfj">    oidc:</span></span>
<span class="line"><span class="__shiki_1t8gfj">      issuerUrl:</span><span class="__shiki_mdbnqw"> https://oidc.example.com</span></span>
<span class="line"><span class="__shiki_1t8gfj">      clientId:</span><span class="__shiki_mdbnqw"> flux-client</span></span>
<span class="line"><span class="__shiki_1t8gfj">  -</span><span class="__shiki_mdbnqw"> name:</span><span class="__shiki_mdbnqw"> cluster-b</span></span>
<span class="line"><span class="__shiki_1t8gfj">    server:</span><span class="__shiki_mdbnqw"> https://cluster-b.example.com</span></span></code></pre></div><p><strong>方案三：使用专用多集群管理平台</strong></p><ul><li><strong>Rancher</strong>：提供统一的多集群管理平面</li><li><strong>Open Cluster Management (OCM)</strong>：CNCF沙箱项目，提供集群注册、工作分发</li><li><strong>Karmada</strong>：CNCF孵化项目，专注于Kubernetes多集群编排</li></ul><h2 id="_4-多集群配置管理与策略" tabindex="-1">4. 多集群配置管理与策略 <a class="header-anchor" href="#_4-多集群配置管理与策略" aria-label="Permalink to &quot;4. 多集群配置管理与策略&quot;">​</a></h2><h3 id="_4-1-配置仓库组织结构" tabindex="-1">4.1 配置仓库组织结构 <a class="header-anchor" href="#_4-1-配置仓库组织结构" aria-label="Permalink to &quot;4.1 配置仓库组织结构&quot;">​</a></h3><p>合理的仓库结构是多集群GitOps成功的关键：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">gitops-repositories/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── infrastructure/                    # 跨集群基础设施</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── base/                         # 基础组件定义</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │   ├── cert-manager/</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │   ├── ingress-nginx/</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │   └── monitoring-stack/</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── overlays/                     # 环境差异化</span></span>
<span class="line"><span class="__shiki_wvjl67">│       ├── development/</span></span>
<span class="line"><span class="__shiki_wvjl67">│       ├── staging/</span></span>
<span class="line"><span class="__shiki_wvjl67">│       └── production/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── clusters/                         # 集群特定配置</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── management-cluster/           # 管理集群配置</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │   ├── flux-system/             # Flux自身配置</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │   └── cluster-config/</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── cluster-us-east-1-prod/       # 区域生产集群</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │   ├── apps/                    # 该集群的应用</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │   ├── infrastructure/          # 集群基础设施</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │   └── cluster-config.yaml      # 集群元数据</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── cluster-eu-west-1-staging/   # 区域预发集群</span></span>
<span class="line"><span class="__shiki_wvjl67">├── apps/                            # 应用定义（全局）</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── base/                        # 应用基础模板</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │   ├── frontend-app/</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │   └── backend-api/</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── releases/                    # 应用发布配置</span></span>
<span class="line"><span class="__shiki_wvjl67">│       ├── v1.0.0/</span></span>
<span class="line"><span class="__shiki_wvjl67">│       └── v1.1.0/</span></span>
<span class="line"><span class="__shiki_wvjl67">└── policies/                        # 策略定义</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── security-policies/           # 安全策略</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── resource-policies/           # 资源策略</span></span>
<span class="line"><span class="__shiki_wvjl67">    └── compliance-policies/         # 合规策略</span></span></code></pre></div><h3 id="_4-2-使用kustomize实现配置差异化" tabindex="-1">4.2 使用Kustomize实现配置差异化 <a class="header-anchor" href="#_4-2-使用kustomize实现配置差异化" aria-label="Permalink to &quot;4.2 使用Kustomize实现配置差异化&quot;">​</a></h3><p>Kustomize是处理多环境差异化的核心工具：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># clusters/cluster-us-east-1-prod/kustomization.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kustomize.config.k8s.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Kustomization</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 引用基础配置</span></span>
<span class="line"><span class="__shiki_17hn0y">resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">../../../apps/base/frontend-app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 集群特定配置</span></span>
<span class="line"><span class="__shiki_17hn0y">patchesStrategicMerge</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">deployment-patch.yaml</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">service-patch.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 环境变量注入</span></span>
<span class="line"><span class="__shiki_17hn0y">configMapGenerator</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend-config</span></span>
<span class="line"><span class="__shiki_17hn0y">  behavior</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">merge</span></span>
<span class="line"><span class="__shiki_17hn0y">  literals</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">ENVIRONMENT=production</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">REGION=us-east-1</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">API_ENDPOINT=https://api.prod.example.com</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 镜像标签覆盖</span></span>
<span class="line"><span class="__shiki_17hn0y">images</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend-app</span></span>
<span class="line"><span class="__shiki_17hn0y">  newTag</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1.2.3-prod</span></span></code></pre></div><h3 id="_4-3-策略即代码-policy-as-code" tabindex="-1">4.3 策略即代码（Policy as Code） <a class="header-anchor" href="#_4-3-策略即代码-policy-as-code" aria-label="Permalink to &quot;4.3 策略即代码（Policy as Code）&quot;">​</a></h3><p>使用OPA Gatekeeper或Kyverno实施跨集群策略：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># policies/security-policies/require-resource-limits.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">constraints.gatekeeper.sh/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">K8sRequiredResources</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">require-resource-limits</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  match</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    kinds</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">apiGroups</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;apps&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">      kinds</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;Deployment&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  parameters</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    limits</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;cpu&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;memory&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    requests</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;cpu&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;memory&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 应用到所有集群的配置</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config.gatekeeper.sh/v1alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Config</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gatekeeper-system</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  sync</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    syncOnly</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">group</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;v1&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Namespace&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">group</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;apps&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;v1&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Deployment&quot;</span></span></code></pre></div><h2 id="_5-多集群部署策略与模式" tabindex="-1">5. 多集群部署策略与模式 <a class="header-anchor" href="#_5-多集群部署策略与模式" aria-label="Permalink to &quot;5. 多集群部署策略与模式&quot;">​</a></h2><h3 id="_5-1-渐进式部署-金丝雀发布" tabindex="-1">5.1 渐进式部署（金丝雀发布） <a class="header-anchor" href="#_5-1-渐进式部署-金丝雀发布" aria-label="Permalink to &quot;5.1 渐进式部署（金丝雀发布）&quot;">​</a></h3><p>在多集群环境中实现安全的应用发布：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># apps/releases/frontend-v1.2.3/canary-rollout.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">flagger.app/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Canary</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend-app</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 目标集群选择器</span></span>
<span class="line"><span class="__shiki_17hn0y">  clusterSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">      region</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">us-east-1</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  targetRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend-app</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 渐进式发布配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  progressDeadlineSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">600</span></span>
<span class="line"><span class="__shiki_17hn0y">  analysis</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">60s</span></span>
<span class="line"><span class="__shiki_17hn0y">    threshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_17hn0y">    metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">request-success-rate</span></span>
<span class="line"><span class="__shiki_17hn0y">      threshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">99</span></span>
<span class="line"><span class="__shiki_17hn0y">      interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">60s</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">request-duration</span></span>
<span class="line"><span class="__shiki_17hn0y">      threshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">500</span></span>
<span class="line"><span class="__shiki_17hn0y">      interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">60s</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 跨集群健康检查</span></span>
<span class="line"><span class="__shiki_17hn0y">    webhooks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;cluster-health-check&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">pre-rollout</span></span>
<span class="line"><span class="__shiki_17hn0y">      url</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http://multicluster-monitor/health</span></span>
<span class="line"><span class="__shiki_17hn0y">      timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">30s</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 自动回滚条件</span></span>
<span class="line"><span class="__shiki_17hn0y">  autodelay</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    initialDelaySeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">300</span></span>
<span class="line"><span class="__shiki_17hn0y">    maxDelaySeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1800</span></span></code></pre></div><h3 id="_5-2-蓝绿部署与流量切换" tabindex="-1">5.2 蓝绿部署与流量切换 <a class="header-anchor" href="#_5-2-蓝绿部署与流量切换" aria-label="Permalink to &quot;5.2 蓝绿部署与流量切换&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用服务网格进行跨集群流量管理</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">VirtualService</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend-app</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  hosts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">frontend.example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">  gateways</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">multicluster-gateway</span></span>
<span class="line"><span class="__shiki_17hn0y">  http</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;blue-green-route&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    match</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">headers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        x-cluster-version</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          exact</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;v2&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    route</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">destination</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend-app-blue</span></span>
<span class="line"><span class="__shiki_17hn0y">        port</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          number</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_17hn0y">      weight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">route</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">destination</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend-app-green</span></span>
<span class="line"><span class="__shiki_17hn0y">          port</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            number</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_17hn0y">        weight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span></code></pre></div><h3 id="_5-3-地理位置感知部署" tabindex="-1">5.3 地理位置感知部署 <a class="header-anchor" href="#_5-3-地理位置感知部署" aria-label="Permalink to &quot;5.3 地理位置感知部署&quot;">​</a></h3><p>根据用户位置路由到最近集群：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">global-frontend-ingress</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    kubernetes.io/ingress.class</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;global-gce&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    networking.gke.io/vip</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;35.1.1.1&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;app.example.com&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    http</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      paths</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/*&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        pathType</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ImplementationSpecific</span></span>
<span class="line"><span class="__shiki_17hn0y">        backend</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          service</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend-service</span></span>
<span class="line"><span class="__shiki_17hn0y">            port</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">              number</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.gke.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">MultiClusterService</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend-service</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend-app</span></span>
<span class="line"><span class="__shiki_17hn0y">  clusters</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">link</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">us-east1-cluster</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend-service-us-east1</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">link</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">europe-west1-cluster</span><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend-service-europe-west1</span></span></code></pre></div><h2 id="_6-监控、可观测性与运维" tabindex="-1">6. 监控、可观测性与运维 <a class="header-anchor" href="#_6-监控、可观测性与运维" aria-label="Permalink to &quot;6. 监控、可观测性与运维&quot;">​</a></h2><h3 id="_6-1-统一监控体系" tabindex="-1">6.1 统一监控体系 <a class="header-anchor" href="#_6-1-统一监控体系" aria-label="Permalink to &quot;6.1 统一监控体系&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># infrastructure/base/monitoring-stack/prometheus-multicluster.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">monitoring.coreos.com/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Prometheus</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">multicluster-prometheus</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">monitoring</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">  serviceAccountName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">prometheus</span></span>
<span class="line"><span class="__shiki_17hn0y">  serviceMonitorSelector</span><span class="__shiki_140thh">: {}</span></span>
<span class="line"><span class="__shiki_17hn0y">  podMonitorSelector</span><span class="__shiki_140thh">: {}</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 多集群抓取配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  additionalScrapeConfigs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">multicluster-scrape-config</span></span>
<span class="line"><span class="__shiki_17hn0y">    key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">prometheus-additional.yaml</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 远程写入配置（集中存储）</span></span>
<span class="line"><span class="__shiki_17hn0y">  remoteWrite</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">url</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;http://thanos-receive:10908/api/v1/receive&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    writeRelabelConfigs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">action</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">replace</span></span>
<span class="line"><span class="__shiki_17hn0y">      sourceLabels</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">__address__</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">      targetLabel</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cluster</span></span>
<span class="line"><span class="__shiki_17hn0y">      regex</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;(.*):.*&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">      replacement</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;$1&#39;</span></span></code></pre></div><h3 id="_6-2-使用thanos实现跨集群查询" tabindex="-1">6.2 使用Thanos实现跨集群查询 <a class="header-anchor" href="#_6-2-使用thanos实现跨集群查询" aria-label="Permalink to &quot;6.2 使用Thanos实现跨集群查询&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># infrastructure/base/monitoring-stack/thanos-query.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">thanos-query</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">monitoring</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">thanos-query</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">thanos-query</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">thanos-query</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">thanosio/thanos:v0.25.0</span></span>
<span class="line"><span class="__shiki_17hn0y">        args</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">&quot;query&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">&quot;--grpc-address=0.0.0.0:10901&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">&quot;--http-address=0.0.0.0:9090&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">&quot;--store=dnssrv+_grpc._tcp.thanos-store.monitoring.svc.cluster.local&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">&quot;--store=dnssrv+_grpc._tcp.thanos-sidecar.us-east1.svc.cluster.local&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">&quot;--store=dnssrv+_grpc._tcp.thanos-sidecar.europe-west1.svc.cluster.local&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">containerPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">9090</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">containerPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10901</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">grpc</span></span></code></pre></div><h3 id="_6-3-漂移检测与合规检查" tabindex="-1">6.3 漂移检测与合规检查 <a class="header-anchor" href="#_6-3-漂移检测与合规检查" aria-label="Permalink to &quot;6.3 漂移检测与合规检查&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># 多集群配置漂移检测脚本</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">CLUSTERS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;us-east1-prod&quot;</span><span class="__shiki_mdbnqw"> &quot;europe-west1-prod&quot;</span><span class="__shiki_mdbnqw"> &quot;asia-east1-staging&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> CLUSTER </span><span class="__shiki_1itgoe">in</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">CLUSTERS</span><span class="__shiki_mdbnqw">[</span><span class="__shiki_1itgoe">@</span><span class="__shiki_mdbnqw">]}&quot;</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;检查集群: </span><span class="__shiki_140thh">$CLUSTER</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 导出当前集群状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_mdbnqw"> config</span><span class="__shiki_mdbnqw"> use-context</span><span class="__shiki_140thh"> $CLUSTER</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> all</span><span class="__shiki_dzsirb"> -A</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> yaml</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /tmp/</span><span class="__shiki_140thh">$CLUSTER</span><span class="__shiki_mdbnqw">-current.yaml</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 与Git中声明状态对比</span></span>
<span class="line"><span class="__shiki_1t8gfj">    flux</span><span class="__shiki_mdbnqw"> diff</span><span class="__shiki_mdbnqw"> kustomization</span><span class="__shiki_mdbnqw"> apps</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">        --kustomization-file=clusters/</span><span class="__shiki_140thh">$CLUSTER</span><span class="__shiki_dzsirb">/kustomization.yaml</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">        --path=./apps/</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_dzsirb">$?</span><span class="__shiki_1itgoe"> -ne</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;⚠️  集群 </span><span class="__shiki_140thh">$CLUSTER</span><span class="__shiki_mdbnqw"> 存在配置漂移&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 发送警报</span></span>
<span class="line"><span class="__shiki_1t8gfj">        send_alert</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$CLUSTER</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_mdbnqw"> &quot;配置漂移检测&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_1itgoe">done</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 定期合规检查</span></span>
<span class="line"><span class="__shiki_1t8gfj">flux</span><span class="__shiki_mdbnqw"> trace</span><span class="__shiki_dzsirb"> --api-version=helm.toolkit.fluxcd.io/v2beta1</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --kind=HelmRelease</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --name=</span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --namespace=</span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --output=json</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> jq</span><span class="__shiki_mdbnqw"> &#39;. | select(.spec.suspend==true)&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> wc</span><span class="__shiki_dzsirb"> -l</span></span></code></pre></div><h2 id="_7-灾难恢复与业务连续性" tabindex="-1">7. 灾难恢复与业务连续性 <a class="header-anchor" href="#_7-灾难恢复与业务连续性" aria-label="Permalink to &quot;7. 灾难恢复与业务连续性&quot;">​</a></h2><h3 id="_7-1-多集群备份策略" tabindex="-1">7.1 多集群备份策略 <a class="header-anchor" href="#_7-1-多集群备份策略" aria-label="Permalink to &quot;7.1 多集群备份策略&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># infrastructure/base/backup/velero-multicluster.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">velero.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">BackupStorageLocation</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">multicluster-backup</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">velero</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  provider</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">aws</span></span>
<span class="line"><span class="__shiki_17hn0y">  objectStorage</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">multicluster-backups</span></span>
<span class="line"><span class="__shiki_17hn0y">  config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    region</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">us-west-2</span></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">velero.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Schedule</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">daily-cluster-backup</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">velero</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  schedule</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;0 2 * * *&quot;</span><span class="__shiki_21nrsd">  # 每天2点</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    includedNamespaces</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">&#39;*&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    excludedResources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">nodes</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">events</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">events.events.k8s.io</span></span>
<span class="line"><span class="__shiki_17hn0y">    storageLocation</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">multicluster-backup</span></span>
<span class="line"><span class="__shiki_17hn0y">    ttl</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">720h</span><span class="__shiki_21nrsd">  # 30天</span></span>
<span class="line"><span class="__shiki_17hn0y">    labelSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        velero.io/backup</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span></code></pre></div><h3 id="_7-2-跨集群故障转移" tabindex="-1">7.2 跨集群故障转移 <a class="header-anchor" href="#_7-2-跨集群故障转移" aria-label="Permalink to &quot;7.2 跨集群故障转移&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用服务网格实现自动故障转移</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">DestinationRule</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend-dr</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend-app</span></span>
<span class="line"><span class="__shiki_17hn0y">  trafficPolicy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    connectionPool</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      tcp</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        maxConnections</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_17hn0y">      http</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        http1MaxPendingRequests</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_17hn0y">        maxRequestsPerConnection</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_17hn0y">    outlierDetection</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      consecutive5xxErrors</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_17hn0y">      interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">30s</span></span>
<span class="line"><span class="__shiki_17hn0y">      baseEjectionTime</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">60s</span></span>
<span class="line"><span class="__shiki_17hn0y">      maxEjectionPercent</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">50</span></span>
<span class="line"><span class="__shiki_17hn0y">    loadBalancer</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      simple</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">LEAST_CONN</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 多集群故障转移配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    localityLbSetting</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">      failover</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">us-east1</span></span>
<span class="line"><span class="__shiki_17hn0y">        to</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">europe-west1</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">europe-west1</span></span>
<span class="line"><span class="__shiki_17hn0y">        to</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">asia-east1</span></span></code></pre></div><h2 id="_8-最佳实践总结" tabindex="-1">8. 最佳实践总结 <a class="header-anchor" href="#_8-最佳实践总结" aria-label="Permalink to &quot;8. 最佳实践总结&quot;">​</a></h2><h3 id="_8-1-渐进式演进路径" tabindex="-1">8.1 渐进式演进路径 <a class="header-anchor" href="#_8-1-渐进式演进路径" aria-label="Permalink to &quot;8.1 渐进式演进路径&quot;">​</a></h3><ol><li><p><strong>阶段一：单集群GitOps成熟化</strong></p><ul><li>完善单集群GitOps流程</li><li>建立配置即代码的团队文化</li><li>实现基础监控与告警</li></ul></li><li><p><strong>阶段二：同区域多集群</strong></p><ul><li>实施星型辐射架构</li><li>建立配置差异化机制</li><li>实现基础的多集群部署</li></ul></li><li><p><strong>阶段三：跨区域多集群</strong></p><ul><li>引入服务网格</li><li>实现地理位置感知部署</li><li>建立全局监控体系</li></ul></li><li><p><strong>阶段四：全球化多集群</strong></p><ul><li>实施自动故障转移</li><li>完善灾难恢复流程</li><li>优化成本与性能平衡</li></ul></li></ol><h3 id="_8-2-关键成功因素" tabindex="-1">8.2 关键成功因素 <a class="header-anchor" href="#_8-2-关键成功因素" aria-label="Permalink to &quot;8.2 关键成功因素&quot;">​</a></h3><ul><li><strong>组织与文化</strong>：建立平台工程团队，推行GitOps文化</li><li><strong>安全与合规先行</strong>：在早期设计阶段考虑安全与合规要求</li><li><strong>自动化程度</strong>：最大化自动化，减少人工干预</li><li><strong>可观测性投资</strong>：监控、日志、追踪三位一体</li><li><strong>持续演进</strong>：定期回顾架构，适应业务变化</li></ul><h3 id="_8-3-常见陷阱与规避" tabindex="-1">8.3 常见陷阱与规避 <a class="header-anchor" href="#_8-3-常见陷阱与规避" aria-label="Permalink to &quot;8.3 常见陷阱与规避&quot;">​</a></h3><table tabindex="0"><thead><tr><th>陷阱</th><th>表现</th><th>规避策略</th></tr></thead><tbody><tr><td><strong>配置爆炸</strong></td><td>仓库混乱，难以管理</td><td>严格的目录结构规范，配置模板化</td></tr><tr><td><strong>网络复杂化</strong></td><td>集群间延迟高，连接不稳定</td><td>使用服务网格，优化网络架构</td></tr><tr><td><strong>安全漏洞</strong></td><td>凭证泄露，未授权访问</td><td>最小权限原则，定期凭证轮换</td></tr><tr><td><strong>监控盲点</strong></td><td>问题难以定位，MTTR长</td><td>统一监控平台，标准化日志格式</td></tr><tr><td><strong>成本失控</strong></td><td>云资源费用超出预期</td><td>资源配额管理，定期成本分析</td></tr></tbody></table><p>多集群GitOps管理是现代云原生架构的必然演进方向。通过合理的架构设计、工具选型和实施策略，可以实现大规模Kubernetes集群的高效、安全、可靠管理。关键在于平衡集中控制与集群自治，在标准化与灵活性之间找到适合组织的最佳平衡点。</p><hr><p><strong>扩展学习资源</strong>：</p><ol><li><a href="https://www.cncf.io/reports/multi-cluster-kubernetes/" target="_blank" rel="noreferrer">CNCF多集群管理白皮书</a></li><li><a href="https://fluxcd.io/flux/guides/multi-tenancy/" target="_blank" rel="noreferrer">Flux CD多集群文档</a></li><li><a href="https://github.com/kubernetes-sigs/cluster-api" target="_blank" rel="noreferrer">Kubernetes多集群SIG</a></li><li><a href="https://istio.io/latest/docs/ops/deployment/deployment-models/" target="_blank" rel="noreferrer">多集群服务网格实践</a></li></ol>`,80)])])}const d=a(_,[["render",l]]);export{r as __pageData,d as default};
