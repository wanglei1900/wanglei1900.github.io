import{_ as a,o as n,c as p,a as i}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"容器化技术 → Kubernetes → Kustomize配置管理 完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"devops/container/orchestration/kustomize.md","filePath":"devops/container/orchestration/kustomize.md"}'),_={name:"devops/container/orchestration/kustomize.md"};function l(h,s,c,e,t,k){return n(),p("div",null,[...s[0]||(s[0]=[i(`<h1 id="容器化技术-→-kubernetes-→-kustomize配置管理-完整学习笔记" tabindex="-1">容器化技术 → Kubernetes → Kustomize配置管理 完整学习笔记 <a class="header-anchor" href="#容器化技术-→-kubernetes-→-kustomize配置管理-完整学习笔记" aria-label="Permalink to &quot;容器化技术 → Kubernetes → Kustomize配置管理 完整学习笔记&quot;">​</a></h1><hr><h2 id="第一部分-kustomize-基础概念" tabindex="-1">第一部分：Kustomize 基础概念 <a class="header-anchor" href="#第一部分-kustomize-基础概念" aria-label="Permalink to &quot;第一部分：Kustomize 基础概念&quot;">​</a></h2><h3 id="_1-1-kustomize-是什么" tabindex="-1">1.1 Kustomize 是什么？ <a class="header-anchor" href="#_1-1-kustomize-是什么" aria-label="Permalink to &quot;1.1 Kustomize 是什么？&quot;">​</a></h3><p><strong>定义</strong>：Kubernetes 原生的配置管理工具，采用&quot;声明式&quot;、&quot;无模板&quot;的方式管理 Kubernetes 资源配置。</p><p><strong>核心理念</strong>：</p><ul><li><strong>纯 YAML 驱动</strong>：无需学习新的模板语言</li><li><strong>叠加（Overlay）模式</strong>：基础配置 + 环境特定修改</li><li><strong>GitOps 友好</strong>：配置即代码，版本控制友好</li><li><strong>声明式操作</strong>：描述&quot;应该是什么状态&quot;</li></ul><h3 id="_1-2-kustomize-vs-helm-对比" tabindex="-1">1.2 Kustomize vs Helm 对比 <a class="header-anchor" href="#_1-2-kustomize-vs-helm-对比" aria-label="Permalink to &quot;1.2 Kustomize vs Helm 对比&quot;">​</a></h3><table tabindex="0"><thead><tr><th>维度</th><th>Kustomize</th><th>Helm</th></tr></thead><tbody><tr><td><strong>哲学</strong></td><td>配置组合、补丁</td><td>模板渲染、包管理</td></tr><tr><td><strong>语法</strong></td><td>纯 YAML + Kustomization</td><td>Go 模板 + Values</td></tr><tr><td><strong>复杂性</strong></td><td>低（Kubernetes 原生）</td><td>中（需学习模板语法）</td></tr><tr><td><strong>场景</strong></td><td>多环境配置管理</td><td>应用打包分发</td></tr><tr><td><strong>集成</strong></td><td>已集成到 kubectl (v1.14+)</td><td>独立工具</td></tr><tr><td><strong>复用性</strong></td><td>通过 base/overlay 复用</td><td>通过模板参数化</td></tr></tbody></table><h3 id="_1-3-为什么选择-kustomize" tabindex="-1">1.3 为什么选择 Kustomize？ <a class="header-anchor" href="#_1-3-为什么选择-kustomize" aria-label="Permalink to &quot;1.3 为什么选择 Kustomize？&quot;">​</a></h3><p><strong>解决的问题</strong>：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 问题：多环境配置文件重复</span></span>
<span class="line"><span class="__shiki_mdbnqw">├── deployment-dev.yaml</span><span class="__shiki_21nrsd">    # 90%内容相同</span></span>
<span class="line"><span class="__shiki_mdbnqw">├── deployment-stg.yaml</span><span class="__shiki_21nrsd">    # 90%内容相同</span></span>
<span class="line"><span class="__shiki_mdbnqw">└── deployment-prod.yaml</span><span class="__shiki_21nrsd">   # 90%内容相同</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 方案：使用 Kustomize</span></span>
<span class="line"><span class="__shiki_mdbnqw">├── base/</span><span class="__shiki_21nrsd">                  # 通用配置（100%）</span></span>
<span class="line"><span class="__shiki_mdbnqw">└── overlays/</span><span class="__shiki_140thh">              </span></span>
<span class="line"><span class="__shiki_mdbnqw">    ├── dev/</span><span class="__shiki_21nrsd">              # 仅环境差异配置（10%）</span></span>
<span class="line"><span class="__shiki_mdbnqw">    ├── stg/</span><span class="__shiki_21nrsd">              # 仅环境差异配置（10%）</span></span>
<span class="line"><span class="__shiki_mdbnqw">    └── prod/</span><span class="__shiki_21nrsd">             # 仅环境差异配置（10%）</span></span></code></pre></div><hr><h2 id="第二部分-kustomize-核心概念详解" tabindex="-1">第二部分：Kustomize 核心概念详解 <a class="header-anchor" href="#第二部分-kustomize-核心概念详解" aria-label="Permalink to &quot;第二部分：Kustomize 核心概念详解&quot;">​</a></h2><h3 id="_2-1-核心架构" tabindex="-1">2.1 核心架构 <a class="header-anchor" href="#_2-1-核心架构" aria-label="Permalink to &quot;2.1 核心架构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">Kustomize 工作流：</span></span>
<span class="line"><span class="__shiki_wvjl67">Base（基础配置）</span></span>
<span class="line"><span class="__shiki_wvjl67">├── kustomization.yaml    # 入口文件</span></span>
<span class="line"><span class="__shiki_wvjl67">├── deployment.yaml       # 通用 Deployment</span></span>
<span class="line"><span class="__shiki_wvjl67">├── service.yaml         # 通用 Service</span></span>
<span class="line"><span class="__shiki_wvjl67">└── configmap.yaml       # 通用 ConfigMap</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">Overlay（环境覆盖）</span></span>
<span class="line"><span class="__shiki_wvjl67">├── kustomization.yaml    # 引用 base + 环境补丁</span></span>
<span class="line"><span class="__shiki_wvjl67">├── patch-deployment.yaml # 环境特定修改</span></span>
<span class="line"><span class="__shiki_wvjl67">└── patch-configmap.yaml  # 环境特定修改</span></span></code></pre></div><h3 id="_2-2-kustomization-yaml-结构解析" tabindex="-1">2.2 kustomization.yaml 结构解析 <a class="header-anchor" href="#_2-2-kustomization-yaml-结构解析" aria-label="Permalink to &quot;2.2 kustomization.yaml 结构解析&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># kustomization.yaml 核心字段</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kustomize.config.k8s.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Kustomization</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 资源引用</span></span>
<span class="line"><span class="__shiki_17hn0y">resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">../base</span><span class="__shiki_21nrsd">                     # 引用目录</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">deployment.yaml</span><span class="__shiki_21nrsd">            # 引用文件</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">github.com/owner/repo?ref=main</span><span class="__shiki_21nrsd">  # 远程资源</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 生成器</span></span>
<span class="line"><span class="__shiki_17hn0y">configMapGenerator</span><span class="__shiki_140thh">:           </span><span class="__shiki_21nrsd"># 动态生成 ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">secretGenerator</span><span class="__shiki_140thh">:              </span><span class="__shiki_21nrsd"># 动态生成 Secret</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 转换器</span></span>
<span class="line"><span class="__shiki_17hn0y">patchesStrategicMerge</span><span class="__shiki_140thh">:        </span><span class="__shiki_21nrsd"># 策略合并补丁</span></span>
<span class="line"><span class="__shiki_17hn0y">patchesJson6902</span><span class="__shiki_140thh">:              </span><span class="__shiki_21nrsd"># JSON 补丁</span></span>
<span class="line"><span class="__shiki_17hn0y">images</span><span class="__shiki_140thh">:                       </span><span class="__shiki_21nrsd"># 镜像修改</span></span>
<span class="line"><span class="__shiki_17hn0y">replacements</span><span class="__shiki_140thh">:                 </span><span class="__shiki_21nrsd"># 字段替换（v4.5+）</span></span>
<span class="line"><span class="__shiki_17hn0y">namePrefix</span><span class="__shiki_140thh">:                   </span><span class="__shiki_21nrsd"># 名称前缀</span></span>
<span class="line"><span class="__shiki_17hn0y">nameSuffix</span><span class="__shiki_140thh">:                   </span><span class="__shiki_21nrsd"># 名称后缀</span></span>
<span class="line"><span class="__shiki_17hn0y">namespace</span><span class="__shiki_140thh">:                    </span><span class="__shiki_21nrsd"># 命名空间</span></span>
<span class="line"><span class="__shiki_17hn0y">commonLabels</span><span class="__shiki_140thh">:                 </span><span class="__shiki_21nrsd"># 通用标签</span></span>
<span class="line"><span class="__shiki_17hn0y">commonAnnotations</span><span class="__shiki_140thh">:            </span><span class="__shiki_21nrsd"># 通用注解</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 校验和生成器</span></span>
<span class="line"><span class="__shiki_17hn0y">generators</span><span class="__shiki_140thh">:                   </span><span class="__shiki_21nrsd"># 自定义生成器</span></span>
<span class="line"><span class="__shiki_17hn0y">transformers</span><span class="__shiki_140thh">:                 </span><span class="__shiki_21nrsd"># 自定义转换器</span></span>
<span class="line"><span class="__shiki_17hn0y">validators</span><span class="__shiki_140thh">:                   </span><span class="__shiki_21nrsd"># 自定义校验器</span></span></code></pre></div><h3 id="_2-3-base-和-overlay-最佳实践" tabindex="-1">2.3 Base 和 Overlay 最佳实践 <a class="header-anchor" href="#_2-3-base-和-overlay-最佳实践" aria-label="Permalink to &quot;2.3 Base 和 Overlay 最佳实践&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 目录结构示例</span></span>
<span class="line"><span class="__shiki_1t8gfj">my-app/</span></span>
<span class="line"><span class="__shiki_1t8gfj">├──</span><span class="__shiki_mdbnqw"> base/</span><span class="__shiki_21nrsd">                    # 基础配置（不可直接应用）</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   ├──</span><span class="__shiki_mdbnqw"> kustomization.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   ├──</span><span class="__shiki_mdbnqw"> deployment.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   ├──</span><span class="__shiki_mdbnqw"> service.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   └──</span><span class="__shiki_mdbnqw"> configmap.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span></span>
<span class="line"><span class="__shiki_1t8gfj">├──</span><span class="__shiki_mdbnqw"> overlays/</span><span class="__shiki_21nrsd">                # 环境覆盖（可应用）</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   ├──</span><span class="__shiki_mdbnqw"> dev/</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   │</span><span class="__shiki_mdbnqw">   ├──</span><span class="__shiki_mdbnqw"> kustomization.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   │</span><span class="__shiki_mdbnqw">   ├──</span><span class="__shiki_mdbnqw"> patch-replicas.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   │</span><span class="__shiki_mdbnqw">   └──</span><span class="__shiki_mdbnqw"> patch-config.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   │</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   ├──</span><span class="__shiki_mdbnqw"> staging/</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   │</span><span class="__shiki_mdbnqw">   ├──</span><span class="__shiki_mdbnqw"> kustomization.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   │</span><span class="__shiki_mdbnqw">   ├──</span><span class="__shiki_mdbnqw"> ingress.yaml</span><span class="__shiki_21nrsd">      # 新增资源</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   │</span><span class="__shiki_mdbnqw">   └──</span><span class="__shiki_mdbnqw"> patch-resources.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   │</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   └──</span><span class="__shiki_mdbnqw"> prod/</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">       ├──</span><span class="__shiki_mdbnqw"> kustomization.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">       ├──</span><span class="__shiki_mdbnqw"> hpa.yaml</span><span class="__shiki_21nrsd">         # 新增资源</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">       └──</span><span class="__shiki_mdbnqw"> patch-security.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span></span>
<span class="line"><span class="__shiki_1t8gfj">└──</span><span class="__shiki_mdbnqw"> components/</span><span class="__shiki_21nrsd">              # 可复用组件（v4+）</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ├──</span><span class="__shiki_mdbnqw"> ingress/</span></span>
<span class="line"><span class="__shiki_1t8gfj">    └──</span><span class="__shiki_mdbnqw"> monitoring/</span></span></code></pre></div><hr><h2 id="第三部分-kustomize-核心功能详解" tabindex="-1">第三部分：Kustomize 核心功能详解 <a class="header-anchor" href="#第三部分-kustomize-核心功能详解" aria-label="Permalink to &quot;第三部分：Kustomize 核心功能详解&quot;">​</a></h2><h3 id="_3-1-资源组合-resources" tabindex="-1">3.1 资源组合（Resources） <a class="header-anchor" href="#_3-1-资源组合-resources" aria-label="Permalink to &quot;3.1 资源组合（Resources）&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 组合多个资源文件</span></span>
<span class="line"><span class="__shiki_17hn0y">resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">deployment.yaml</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">service.yaml</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">ingress.yaml</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">../another-base</span><span class="__shiki_21nrsd">        # 引用另一个 base</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">github.com/org/repo/deploy?ref=v1.0</span><span class="__shiki_21nrsd">  # 远程资源</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">https://example.com/manifest.yaml</span><span class="__shiki_21nrsd">    # URL 资源</span></span></code></pre></div><h3 id="_3-2-名称变换-name-prefix-suffix" tabindex="-1">3.2 名称变换（Name Prefix/Suffix） <a class="header-anchor" href="#_3-2-名称变换-name-prefix-suffix" aria-label="Permalink to &quot;3.2 名称变换（Name Prefix/Suffix）&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 为所有资源添加前缀/后缀</span></span>
<span class="line"><span class="__shiki_17hn0y">namePrefix</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">dev-</span><span class="__shiki_21nrsd">           # 添加前缀：dev-&lt;资源名&gt;</span></span>
<span class="line"><span class="__shiki_17hn0y">nameSuffix</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">-v1</span><span class="__shiki_21nrsd">           # 添加后缀：&lt;资源名&gt;-v1</span></span>
<span class="line"><span class="__shiki_17hn0y">namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">my-namespace</span><span class="__shiki_21nrsd">   # 设置命名空间</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 变换效果：</span></span>
<span class="line"><span class="__shiki_21nrsd"># deployment.yaml → dev-deployment-v1.yaml</span></span>
<span class="line"><span class="__shiki_21nrsd"># 在 my-namespace 命名空间中</span></span></code></pre></div><h3 id="_3-3-标签和注解-labels-annotations" tabindex="-1">3.3 标签和注解（Labels &amp; Annotations） <a class="header-anchor" href="#_3-3-标签和注解-labels-annotations" aria-label="Permalink to &quot;3.3 标签和注解（Labels &amp; Annotations）&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 通用标签和注解（添加到所有资源）</span></span>
<span class="line"><span class="__shiki_17hn0y">commonLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  app.kubernetes.io/name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">  app.kubernetes.io/version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1.0</span></span>
<span class="line"><span class="__shiki_17hn0y">  environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">commonAnnotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  owner</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">team-a</span></span>
<span class="line"><span class="__shiki_17hn0y">  description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Production deployment&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 为特定资源添加标签</span></span>
<span class="line"><span class="__shiki_17hn0y">labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">pairs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      custom-label</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">special-value</span></span>
<span class="line"><span class="__shiki_17hn0y">    includeSelectors</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">    # 是否添加到 selector</span></span>
<span class="line"><span class="__shiki_17hn0y">    includeTemplates</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">    # 是否添加到 pod template</span></span>
<span class="line"><span class="__shiki_17hn0y">    fields</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">my-deployment</span></span></code></pre></div><h3 id="_3-4-镜像修改-images" tabindex="-1">3.4 镜像修改（Images） <a class="header-anchor" href="#_3-4-镜像修改-images" aria-label="Permalink to &quot;3.4 镜像修改（Images）&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 修改容器镜像（支持多种格式）</span></span>
<span class="line"><span class="__shiki_17hn0y">images</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 格式1：完整格式</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx</span></span>
<span class="line"><span class="__shiki_17hn0y">    newName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myregistry/nginx</span></span>
<span class="line"><span class="__shiki_17hn0y">    newTag</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1.21</span></span>
<span class="line"><span class="__shiki_17hn0y">    digest</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">sha256:abc123...</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 格式2：简写格式</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">nginx=myregistry/nginx:v1.21</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 格式3：仅修改tag</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app</span></span>
<span class="line"><span class="__shiki_17hn0y">    newTag</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v2.0</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 格式4：通配符匹配</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;postgres:*&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    newName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">internal-registry/postgres</span></span></code></pre></div><h3 id="_3-5-配置生成器-generators" tabindex="-1">3.5 配置生成器（Generators） <a class="header-anchor" href="#_3-5-配置生成器-generators" aria-label="Permalink to &quot;3.5 配置生成器（Generators）&quot;">​</a></h3><h4 id="configmapgenerator" tabindex="-1"><strong>ConfigMapGenerator</strong> <a class="header-anchor" href="#configmapgenerator" aria-label="Permalink to &quot;**ConfigMapGenerator**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">configMapGenerator</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 方式1：从文件生成</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config</span></span>
<span class="line"><span class="__shiki_17hn0y">    files</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">config.properties</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">ui-config.json</span></span>
<span class="line"><span class="__shiki_17hn0y">    options</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">      annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Application configuration&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 方式2：从字面值生成</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">env-config</span></span>
<span class="line"><span class="__shiki_17hn0y">    literals</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">LOG_LEVEL=DEBUG</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">MAX_CONNECTIONS=100</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 方式3：从.env文件生成</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">dotenv-config</span></span>
<span class="line"><span class="__shiki_17hn0y">    envs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">.env</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">.env.production</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 方式4：行为控制</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">auto-update-config</span></span>
<span class="line"><span class="__shiki_17hn0y">    behavior</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">merge</span><span class="__shiki_21nrsd">        # create/merge/replace</span></span>
<span class="line"><span class="__shiki_17hn0y">    files</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">config.yaml</span></span></code></pre></div><h4 id="secretgenerator" tabindex="-1"><strong>SecretGenerator</strong> <a class="header-anchor" href="#secretgenerator" aria-label="Permalink to &quot;**SecretGenerator**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">secretGenerator</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 方式1：从文件生成（自动base64编码）</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">tls-secret</span></span>
<span class="line"><span class="__shiki_17hn0y">    files</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">tls.crt</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">tls.key</span></span>
<span class="line"><span class="__shiki_17hn0y">    type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kubernetes.io/tls</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 方式2：从字面值生成（自动base64编码）</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">db-secret</span></span>
<span class="line"><span class="__shiki_17hn0y">    literals</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">username=admin</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">password=secret123</span></span>
<span class="line"><span class="__shiki_17hn0y">    type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Opaque</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 方式3：从.env文件生成</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-secrets</span></span>
<span class="line"><span class="__shiki_17hn0y">    envs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">secrets.env</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 方式4：禁用自动base64编码</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">plain-secret</span></span>
<span class="line"><span class="__shiki_17hn0y">    literals</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">text=plain-text-content</span></span>
<span class="line"><span class="__shiki_17hn0y">    type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Opaque</span></span>
<span class="line"><span class="__shiki_17hn0y">    options</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      disableNameSuffixHash</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span></code></pre></div><h3 id="_3-6-变量替换-replacements-v4-5-新特性" tabindex="-1">3.6 变量替换（Replacements）- v4.5+ 新特性 <a class="header-anchor" href="#_3-6-变量替换-replacements-v4-5-新特性" aria-label="Permalink to &quot;3.6 变量替换（Replacements）- v4.5+ 新特性&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">replacements</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 1. 简单字段替换</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">source</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config</span></span>
<span class="line"><span class="__shiki_17hn0y">      fieldPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">data.version</span></span>
<span class="line"><span class="__shiki_17hn0y">    targets</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">select</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">my-app</span></span>
<span class="line"><span class="__shiki_17hn0y">        fieldPaths</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">spec.template.spec.containers.[name=app].image</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 2. 多目标替换</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">source</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Secret</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">db-secret</span></span>
<span class="line"><span class="__shiki_17hn0y">      fieldPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">data.host</span></span>
<span class="line"><span class="__shiki_17hn0y">    targets</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">select</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">        fieldPaths</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">spec.template.spec.containers.*.env.[name=DB_HOST].value</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 3. 正则表达式替换</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">source</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">metadata</span></span>
<span class="line"><span class="__shiki_17hn0y">      fieldPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">data.domain</span></span>
<span class="line"><span class="__shiki_17hn0y">    targets</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">select</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_17hn0y">        fieldPaths</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">spec.rules.*.host</span></span>
<span class="line"><span class="__shiki_17hn0y">        options</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          delimiter</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;.&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          index</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 4. 复杂转换</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">source</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">    targets</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">select</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">        fieldPaths</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">spec.replicas</span></span>
<span class="line"><span class="__shiki_17hn0y">        options</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          create</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span></code></pre></div><h3 id="_3-7-补丁-patches" tabindex="-1">3.7 补丁（Patches） <a class="header-anchor" href="#_3-7-补丁-patches" aria-label="Permalink to &quot;3.7 补丁（Patches）&quot;">​</a></h3><h4 id="strategic-merge-patch" tabindex="-1"><strong>Strategic Merge Patch</strong> <a class="header-anchor" href="#strategic-merge-patch" aria-label="Permalink to &quot;**Strategic Merge Patch**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># patchesStrategicMerge：策略合并补丁</span></span>
<span class="line"><span class="__shiki_17hn0y">patchesStrategicMerge</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 文件形式</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">increase-replicas.yaml</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">add-sidecar.yaml</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 内联形式</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">    apiVersion: apps/v1</span></span>
<span class="line"><span class="__shiki_mdbnqw">    kind: Deployment</span></span>
<span class="line"><span class="__shiki_mdbnqw">    metadata:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      name: my-app</span></span>
<span class="line"><span class="__shiki_mdbnqw">    spec:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      replicas: 5</span></span>
<span class="line"><span class="__shiki_mdbnqw">      template:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        spec:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          containers:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          - name: app</span></span>
<span class="line"><span class="__shiki_mdbnqw">            resources:</span></span>
<span class="line"><span class="__shiki_mdbnqw">              requests:</span></span>
<span class="line"><span class="__shiki_mdbnqw">                memory: &quot;256Mi&quot;</span></span></code></pre></div><p><strong>补丁文件示例</strong>：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># increase-replicas.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">my-app</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_21nrsd">  # 修改副本数</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># add-sidecar.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">my-app</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">sidecar</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">busybox:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">        command</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;sh&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;-c&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;echo Sidecar running&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h4 id="json-6902-patch" tabindex="-1"><strong>JSON 6902 Patch</strong> <a class="header-anchor" href="#json-6902-patch" aria-label="Permalink to &quot;**JSON 6902 Patch**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># patchesJson6902：更精确的JSON补丁</span></span>
<span class="line"><span class="__shiki_17hn0y">patchesJson6902</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 补丁组1</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      group</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps</span></span>
<span class="line"><span class="__shiki_17hn0y">      version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">      kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">my-app</span></span>
<span class="line"><span class="__shiki_17hn0y">    path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">patch/add-label.json</span><span class="__shiki_21nrsd">  # 文件路径</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 补丁组2（内联）</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      group</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">      kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">my-service</span></span>
<span class="line"><span class="__shiki_17hn0y">    patch</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span><span class="__shiki_21nrsd">  # 内联补丁</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - op: replace</span></span>
<span class="line"><span class="__shiki_mdbnqw">        path: /spec/type</span></span>
<span class="line"><span class="__shiki_mdbnqw">        value: LoadBalancer</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - op: add</span></span>
<span class="line"><span class="__shiki_mdbnqw">        path: /metadata/labels/environment</span></span>
<span class="line"><span class="__shiki_mdbnqw">        value: production</span></span></code></pre></div><p><strong>JSON 补丁操作类型</strong>：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;op&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;操作类型&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;path&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;JSON路径&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;value&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;新值&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><ul><li><code>add</code>：添加字段</li><li><code>remove</code>：删除字段</li><li><code>replace</code>：替换字段</li><li><code>move</code>：移动字段</li><li><code>copy</code>：复制字段</li><li><code>test</code>：测试字段值</li></ul><p><strong>JSON 路径示例</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">/spec/replicas                          # 直接路径</span></span>
<span class="line"><span class="__shiki_wvjl67">/spec/template/spec/containers/0/image  # 数组索引</span></span>
<span class="line"><span class="__shiki_wvjl67">/spec/template/spec/containers/[name=app]/image  # 名称选择器</span></span></code></pre></div><h3 id="_3-8-组件-components-v4-0-新特性" tabindex="-1">3.8 组件（Components）- v4.0+ 新特性 <a class="header-anchor" href="#_3-8-组件-components-v4-0-新特性" aria-label="Permalink to &quot;3.8 组件（Components）- v4.0+ 新特性&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># components/kustomization.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kustomize.config.k8s.io/v1alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Component</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 组件可包含的功能（与普通kustomization类似）</span></span>
<span class="line"><span class="__shiki_17hn0y">namePrefix</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">comp-</span></span>
<span class="line"><span class="__shiki_17hn0y">patches</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">    patch</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - op: add</span></span>
<span class="line"><span class="__shiki_mdbnqw">        path: /spec/template/spec/containers/-</span></span>
<span class="line"><span class="__shiki_mdbnqw">        value:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          name: component-sidecar</span></span>
<span class="line"><span class="__shiki_mdbnqw">          image: component:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 在 overlay 中引用组件</span></span>
<span class="line"><span class="__shiki_17hn0y">components</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">../../components/monitoring</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">../../components/logging</span></span></code></pre></div><hr><h2 id="第四部分-kustomize-实战操作" tabindex="-1">第四部分：Kustomize 实战操作 <a class="header-anchor" href="#第四部分-kustomize-实战操作" aria-label="Permalink to &quot;第四部分：Kustomize 实战操作&quot;">​</a></h2><h3 id="_4-1-安装与验证" tabindex="-1">4.1 安装与验证 <a class="header-anchor" href="#_4-1-安装与验证" aria-label="Permalink to &quot;4.1 安装与验证&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 方式1：使用 kubectl（内置，推荐）</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> kustomize</span><span class="__shiki_dzsirb"> --help</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 方式2：独立安装</span></span>
<span class="line"><span class="__shiki_21nrsd"># MacOS</span></span>
<span class="line"><span class="__shiki_1t8gfj">brew</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> kustomize</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Linux</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_mdbnqw"> &quot;https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> bash</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 验证安装</span></span>
<span class="line"><span class="__shiki_1t8gfj">kustomize</span><span class="__shiki_mdbnqw"> version</span></span></code></pre></div><h3 id="_4-2-基础命令" tabindex="-1">4.2 基础命令 <a class="header-anchor" href="#_4-2-基础命令" aria-label="Permalink to &quot;4.2 基础命令&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 构建配置（预览）</span></span>
<span class="line"><span class="__shiki_1t8gfj">kustomize</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_mdbnqw"> ./overlays/dev</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> kustomize</span><span class="__shiki_mdbnqw"> ./overlays/dev</span><span class="__shiki_21nrsd">  # 等效命令</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 构建并应用</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -k</span><span class="__shiki_mdbnqw"> ./overlays/dev</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 差异比较</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> diff</span><span class="__shiki_dzsirb"> -k</span><span class="__shiki_mdbnqw"> ./overlays/dev</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 删除资源</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> delete</span><span class="__shiki_dzsirb"> -k</span><span class="__shiki_mdbnqw"> ./overlays/dev</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 验证配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">kustomize</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_mdbnqw"> ./overlays/dev</span><span class="__shiki_dzsirb"> --load-restrictor</span><span class="__shiki_mdbnqw"> LoadRestrictionsNone</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> --dry-run=client</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> -</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 6. 输出到文件</span></span>
<span class="line"><span class="__shiki_1t8gfj">kustomize</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_mdbnqw"> ./overlays/prod</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> all-resources.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 7. 启用 Alpha 功能（v4+）</span></span>
<span class="line"><span class="__shiki_1t8gfj">kustomize</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_dzsirb"> --enable-alpha-plugins</span><span class="__shiki_mdbnqw"> ./overlays/dev</span></span></code></pre></div><h3 id="_4-3-完整工作流程示例" tabindex="-1">4.3 完整工作流程示例 <a class="header-anchor" href="#_4-3-完整工作流程示例" aria-label="Permalink to &quot;4.3 完整工作流程示例&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 项目结构</span></span>
<span class="line"><span class="__shiki_1t8gfj">myapp/</span></span>
<span class="line"><span class="__shiki_1t8gfj">├──</span><span class="__shiki_mdbnqw"> base/</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   ├──</span><span class="__shiki_mdbnqw"> kustomization.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   ├──</span><span class="__shiki_mdbnqw"> deployment.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   └──</span><span class="__shiki_mdbnqw"> service.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">└──</span><span class="__shiki_mdbnqw"> overlays/</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ├──</span><span class="__shiki_mdbnqw"> dev/</span></span>
<span class="line"><span class="__shiki_1t8gfj">    │</span><span class="__shiki_mdbnqw">   ├──</span><span class="__shiki_mdbnqw"> kustomization.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">    │</span><span class="__shiki_mdbnqw">   └──</span><span class="__shiki_mdbnqw"> patch.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">    └──</span><span class="__shiki_mdbnqw"> prod/</span></span>
<span class="line"><span class="__shiki_1t8gfj">        ├──</span><span class="__shiki_mdbnqw"> kustomization.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">        ├──</span><span class="__shiki_mdbnqw"> hpa.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">        └──</span><span class="__shiki_mdbnqw"> patch.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 步骤1：查看构建结果</span></span>
<span class="line"><span class="__shiki_1t8gfj">kustomize</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_mdbnqw"> overlays/dev</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 步骤2：应用配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -k</span><span class="__shiki_mdbnqw"> overlays/dev</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 步骤3：查看生成资源</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> all</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_mdbnqw"> app=myapp</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 步骤4：更新配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">vim</span><span class="__shiki_mdbnqw"> overlays/dev/patch.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -k</span><span class="__shiki_mdbnqw"> overlays/dev</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 步骤5：清理</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> delete</span><span class="__shiki_dzsirb"> -k</span><span class="__shiki_mdbnqw"> overlays/dev</span></span></code></pre></div><h3 id="_4-4-调试技巧" tabindex="-1">4.4 调试技巧 <a class="header-anchor" href="#_4-4-调试技巧" aria-label="Permalink to &quot;4.4 调试技巧&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 详细输出</span></span>
<span class="line"><span class="__shiki_1t8gfj">kustomize</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_dzsirb"> --verbose</span><span class="__shiki_mdbnqw"> ./overlays/dev</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 仅显示特定阶段</span></span>
<span class="line"><span class="__shiki_1t8gfj">kustomize</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_dzsirb"> --enable-alpha-plugins</span><span class="__shiki_dzsirb"> --reorder</span><span class="__shiki_mdbnqw"> none</span><span class="__shiki_mdbnqw"> ./overlays/dev</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 生成有意义的资源名称（避免哈希冲突）</span></span>
<span class="line"><span class="__shiki_1t8gfj">kustomize</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_dzsirb"> --load-restrictor</span><span class="__shiki_mdbnqw"> LoadRestrictionsNone</span><span class="__shiki_mdbnqw"> ./overlays/dev</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 调试补丁</span></span>
<span class="line"><span class="__shiki_1t8gfj">kustomize</span><span class="__shiki_mdbnqw"> cfg</span><span class="__shiki_mdbnqw"> cat</span><span class="__shiki_mdbnqw"> ./base</span><span class="__shiki_21nrsd">  # 查看原始资源</span></span>
<span class="line"><span class="__shiki_1t8gfj">kustomize</span><span class="__shiki_mdbnqw"> cfg</span><span class="__shiki_mdbnqw"> grep</span><span class="__shiki_mdbnqw"> &quot;kind=Deployment&quot;</span><span class="__shiki_mdbnqw"> ./base</span><span class="__shiki_21nrsd">  # 过滤特定资源</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 使用 kyaml 库调试</span></span>
<span class="line"><span class="__shiki_1t8gfj">kustomize</span><span class="__shiki_mdbnqw"> fn</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_mdbnqw"> ./overlays/dev</span><span class="__shiki_dzsirb"> --enable-exec</span><span class="__shiki_dzsirb"> --enable-star</span><span class="__shiki_21nrsd">  # 使用函数</span></span></code></pre></div><hr><h2 id="第五部分-高级模式与实践" tabindex="-1">第五部分：高级模式与实践 <a class="header-anchor" href="#第五部分-高级模式与实践" aria-label="Permalink to &quot;第五部分：高级模式与实践&quot;">​</a></h2><h3 id="_5-1-多环境管理策略" tabindex="-1">5.1 多环境管理策略 <a class="header-anchor" href="#_5-1-多环境管理策略" aria-label="Permalink to &quot;5.1 多环境管理策略&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 策略1：简单覆盖</span></span>
<span class="line"><span class="__shiki_mdbnqw">environments/</span></span>
<span class="line"><span class="__shiki_mdbnqw">├── base/</span></span>
<span class="line"><span class="__shiki_mdbnqw">├── dev/</span><span class="__shiki_21nrsd">           # 引用 base</span></span>
<span class="line"><span class="__shiki_mdbnqw">├── staging/</span><span class="__shiki_21nrsd">       # 引用 base</span></span>
<span class="line"><span class="__shiki_mdbnqw">└── prod/</span><span class="__shiki_21nrsd">          # 引用 base</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 策略2：层次覆盖</span></span>
<span class="line"><span class="__shiki_mdbnqw">environments/</span></span>
<span class="line"><span class="__shiki_mdbnqw">├── base/</span></span>
<span class="line"><span class="__shiki_mdbnqw">├── regions/</span><span class="__shiki_21nrsd">       # 区域配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">│   ├── us-east/</span></span>
<span class="line"><span class="__shiki_mdbnqw">│   └── eu-west/</span></span>
<span class="line"><span class="__shiki_mdbnqw">└── envs/</span><span class="__shiki_21nrsd">          # 环境配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">    ├── dev/</span></span>
<span class="line"><span class="__shiki_mdbnqw">    └── prod/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 策略3：组合覆盖</span></span>
<span class="line"><span class="__shiki_mdbnqw">overlays/</span></span>
<span class="line"><span class="__shiki_mdbnqw">├── dev/</span></span>
<span class="line"><span class="__shiki_mdbnqw">│   └── kustomization.yaml</span><span class="__shiki_21nrsd">  # resources: [../../base, ../components/monitoring]</span></span>
<span class="line"><span class="__shiki_mdbnqw">├── prod-us/</span></span>
<span class="line"><span class="__shiki_mdbnqw">│   └── kustomization.yaml</span><span class="__shiki_21nrsd">  # resources: [../../base, ../regions/us]</span></span>
<span class="line"><span class="__shiki_mdbnqw">└── prod-eu/</span></span>
<span class="line"><span class="__shiki_mdbnqw">    └── kustomization.yaml</span><span class="__shiki_21nrsd">  # resources: [../../base, ../regions/eu, ../components/logging]</span></span></code></pre></div><h3 id="_5-2-gitops-集成" tabindex="-1">5.2 GitOps 集成 <a class="header-anchor" href="#_5-2-gitops-集成" aria-label="Permalink to &quot;5.2 GitOps 集成&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># ArgoCD Application 配置示例</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">argoproj.io/v1alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Application</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp-dev</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  project</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">  source</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    repoURL</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">https://github.com/org/repo</span></span>
<span class="line"><span class="__shiki_17hn0y">    targetRevision</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HEAD</span></span>
<span class="line"><span class="__shiki_17hn0y">    path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">k8s/overlays/dev</span><span class="__shiki_21nrsd">  # 指向 Kustomize overlay</span></span>
<span class="line"><span class="__shiki_17hn0y">    kustomize</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      namePrefix</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">dev-</span><span class="__shiki_21nrsd">      # ArgoCD 可覆盖 Kustomize 配置</span></span>
<span class="line"><span class="__shiki_17hn0y">      images</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">nginx:1.21</span></span>
<span class="line"><span class="__shiki_17hn0y">  destination</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    server</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">https://kubernetes.default.svc</span></span>
<span class="line"><span class="__shiki_17hn0y">    namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">dev</span></span></code></pre></div><h3 id="_5-3-与-helm-结合使用" tabindex="-1">5.3 与 Helm 结合使用 <a class="header-anchor" href="#_5-3-与-helm-结合使用" aria-label="Permalink to &quot;5.3 与 Helm 结合使用&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 方法1：将 Helm 输出作为 Kustomize 输入</span></span>
<span class="line"><span class="__shiki_21nrsd"># 步骤1：生成 Helm 模板</span></span>
<span class="line"><span class="__shiki_mdbnqw">helm template myapp ./chart -f values.yaml &gt; helm-output.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 步骤2：在 Kustomize 中引用</span></span>
<span class="line"><span class="__shiki_17hn0y">resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">helm-output.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 方法2：使用 HelmChartInflationGenerator 插件</span></span>
<span class="line"><span class="__shiki_17hn0y">generators</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">helmChartInflationGenerator.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># helmChartInflationGenerator.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">builtin</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HelmChartInflationGenerator</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">chartName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">chartRepoUrl</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">https://charts.example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">chartVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1.0.0</span></span>
<span class="line"><span class="__shiki_17hn0y">releaseName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">releaseNamespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">values</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">values.yaml</span></span></code></pre></div><h3 id="_5-4-自定义插件开发" tabindex="-1">5.4 自定义插件开发 <a class="header-anchor" href="#_5-4-自定义插件开发" aria-label="Permalink to &quot;5.4 自定义插件开发&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 简单插件示例：添加注解</span></span>
<span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> main</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;</span><span class="__shiki_1t8gfj">sigs.k8s.io/kustomize/api/filters/annotations</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;</span><span class="__shiki_1t8gfj">sigs.k8s.io/kustomize/api/resmap</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;</span><span class="__shiki_1t8gfj">sigs.k8s.io/yaml</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> plugin</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  Annotations </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">string</span><span class="__shiki_mdbnqw"> \`json:&quot;annotations,omitempty&quot; yaml:&quot;annotations,omitempty&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">p </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">plugin</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Config</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ldr</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">loader</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Loader</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">rf</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">resmap</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Factory</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">config</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> yaml.</span><span class="__shiki_1t8gfj">Unmarshal</span><span class="__shiki_140thh">(config, p)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">p </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">plugin</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Transform</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">m</span><span class="__shiki_1t8gfj"> resmap</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ResMap</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  for</span><span class="__shiki_140thh"> _, res </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> m.</span><span class="__shiki_1t8gfj">Resources</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    res.</span><span class="__shiki_1t8gfj">SetAnnotations</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">mergeMaps</span><span class="__shiki_140thh">(res.</span><span class="__shiki_1t8gfj">GetAnnotations</span><span class="__shiki_140thh">(), p.Annotations))</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用插件</span></span>
<span class="line"><span class="__shiki_140thh">transformers:</span></span>
<span class="line"><span class="__shiki_1itgoe">-</span><span class="__shiki_1itgoe"> |</span></span>
<span class="line"><span class="__shiki_140thh">  apiVersion: mycompany.com</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">v1</span></span>
<span class="line"><span class="__shiki_140thh">  kind: AddAnnotations</span></span>
<span class="line"><span class="__shiki_140thh">  metadata:</span></span>
<span class="line"><span class="__shiki_140thh">    name: notImportantHere</span></span>
<span class="line"><span class="__shiki_140thh">  annotations:</span></span>
<span class="line"><span class="__shiki_140thh">    owner: team</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">a</span></span>
<span class="line"><span class="__shiki_140thh">    deployed</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">by: kustomize</span></span></code></pre></div><h3 id="_5-5-性能优化" tabindex="-1">5.5 性能优化 <a class="header-anchor" href="#_5-5-性能优化" aria-label="Permalink to &quot;5.5 性能优化&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 缓存远程资源</span></span>
<span class="line"><span class="__shiki_1t8gfj">kustomize</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_dzsirb"> --enable-remote-cache</span><span class="__shiki_mdbnqw"> ./overlays/dev</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 限制资源加载</span></span>
<span class="line"><span class="__shiki_1t8gfj">kustomize</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_dzsirb"> --load-restrictor</span><span class="__shiki_mdbnqw"> LoadRestrictionsRootOnly</span><span class="__shiki_mdbnqw"> ./overlays/dev</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 并行处理</span></span>
<span class="line"><span class="__shiki_1t8gfj">kustomize</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_dzsirb"> --parallelism=4</span><span class="__shiki_mdbnqw"> ./overlays/dev</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 避免重复计算</span></span>
<span class="line"><span class="__shiki_21nrsd"># 为生成的 ConfigMap/Secret 禁用名称哈希</span></span>
<span class="line"><span class="__shiki_1t8gfj">configMapGenerator:</span></span>
<span class="line"><span class="__shiki_1t8gfj">-</span><span class="__shiki_mdbnqw"> name:</span><span class="__shiki_mdbnqw"> app-config</span></span>
<span class="line"><span class="__shiki_1t8gfj">  files:</span><span class="__shiki_140thh"> [config.yaml]</span></span>
<span class="line"><span class="__shiki_1t8gfj">  options:</span></span>
<span class="line"><span class="__shiki_1t8gfj">    disableNameSuffixHash:</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_21nrsd">  # 名称固定，避免频繁变更</span></span></code></pre></div><hr><h2 id="第六部分-实战案例" tabindex="-1">第六部分：实战案例 <a class="header-anchor" href="#第六部分-实战案例" aria-label="Permalink to &quot;第六部分：实战案例&quot;">​</a></h2><h3 id="_6-1-微服务完整配置示例" tabindex="-1">6.1 微服务完整配置示例 <a class="header-anchor" href="#_6-1-微服务完整配置示例" aria-label="Permalink to &quot;6.1 微服务完整配置示例&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">microservices/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── base/</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── kustomization.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── namespace.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── frontend/</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │   ├── deployment.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │   ├── service.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │   └── configmap.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── backend/</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │   ├── deployment.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │   ├── service.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │   └── configmap.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── database/</span></span>
<span class="line"><span class="__shiki_wvjl67">│       ├── statefulset.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">│       └── pvc.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">├── components/</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── ingress/</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │   └── kustomization.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── monitoring/</span></span>
<span class="line"><span class="__shiki_wvjl67">│       └── kustomization.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">└── overlays/</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── dev/</span></span>
<span class="line"><span class="__shiki_wvjl67">    │   ├── kustomization.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">    │   ├── patch-frontend.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">    │   └── patch-backend.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">    └── prod/</span></span>
<span class="line"><span class="__shiki_wvjl67">        ├── kustomization.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">        ├── ingress.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">        └── hpa-backend.yaml</span></span></code></pre></div><h3 id="_6-2-多集群部署配置" tabindex="-1">6.2 多集群部署配置 <a class="header-anchor" href="#_6-2-多集群部署配置" aria-label="Permalink to &quot;6.2 多集群部署配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># clusters/aws/eu-west/kustomization.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kustomize.config.k8s.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Kustomization</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 组合：应用 + 区域 + 环境</span></span>
<span class="line"><span class="__shiki_17hn0y">resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">../../../apps/myapp/overlays/prod</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">../../regions/eu-west</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">../../../infra/monitoring</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 集群特定覆盖</span></span>
<span class="line"><span class="__shiki_17hn0y">patches</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_17hn0y">    patch</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - op: replace</span></span>
<span class="line"><span class="__shiki_mdbnqw">        path: /spec/rules/0/host</span></span>
<span class="line"><span class="__shiki_mdbnqw">        value: myapp.eu.example.com</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 集群特定生成器</span></span>
<span class="line"><span class="__shiki_17hn0y">configMapGenerator</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cluster-config</span></span>
<span class="line"><span class="__shiki_17hn0y">    literals</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">REGION=eu-west-1</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">CLUSTER_TYPE=production</span></span></code></pre></div><h3 id="_6-3-ci-cd-集成示例" tabindex="-1">6.3 CI/CD 集成示例 <a class="header-anchor" href="#_6-3-ci-cd-集成示例" aria-label="Permalink to &quot;6.3 CI/CD 集成示例&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># .gitlab-ci.yml 示例</span></span>
<span class="line"><span class="__shiki_17hn0y">stages</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">validate</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">build</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">deploy</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">validate-kustomize</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">validate</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">kustomize build overlays/dev --load-restrictor LoadRestrictionsNone &gt; /dev/null</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">kustomize build overlays/prod --load-restrictor LoadRestrictionsNone &gt; /dev/null</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">build-manifests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">build</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">mkdir -p dist</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">kustomize build overlays/dev -o dist/dev-manifests.yaml</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">kustomize build overlays/prod -o dist/prod-manifests.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">  artifacts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    paths</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">dist/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">deploy-dev</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deploy</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">kubectl apply -k overlays/dev --prune -l app=myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">  only</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">dev</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">deploy-prod</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deploy</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">kubectl apply -k overlays/prod --prune -l app=myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">  only</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">main</span></span></code></pre></div><hr><h2 id="第七部分-最佳实践与模式" tabindex="-1">第七部分：最佳实践与模式 <a class="header-anchor" href="#第七部分-最佳实践与模式" aria-label="Permalink to &quot;第七部分：最佳实践与模式&quot;">​</a></h2><h3 id="_7-1-目录结构规范" tabindex="-1">7.1 目录结构规范 <a class="header-anchor" href="#_7-1-目录结构规范" aria-label="Permalink to &quot;7.1 目录结构规范&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67"># 推荐结构1：按环境组织</span></span>
<span class="line"><span class="__shiki_wvjl67">kubernetes/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── base/              # 基础配置</span></span>
<span class="line"><span class="__shiki_wvjl67">├── staging/           # 预发布环境</span></span>
<span class="line"><span class="__shiki_wvjl67">├── production/        # 生产环境</span></span>
<span class="line"><span class="__shiki_wvjl67">└── components/        # 共享组件</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67"># 推荐结构2：按应用组织</span></span>
<span class="line"><span class="__shiki_wvjl67">apps/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── app1/</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── base/</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── overlays/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── app2/</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── base/</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── overlays/</span></span>
<span class="line"><span class="__shiki_wvjl67">└── shared-components/</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67"># 推荐结构3：GitOps风格</span></span>
<span class="line"><span class="__shiki_wvjl67">cluster/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── base/              # 集群基础配置</span></span>
<span class="line"><span class="__shiki_wvjl67">├── apps/              # 应用配置</span></span>
<span class="line"><span class="__shiki_wvjl67">└── infrastructure/    # 基础设施</span></span></code></pre></div><h3 id="_7-2-配置管理原则" tabindex="-1">7.2 配置管理原则 <a class="header-anchor" href="#_7-2-配置管理原则" aria-label="Permalink to &quot;7.2 配置管理原则&quot;">​</a></h3><ol><li><strong>单一职责</strong>：每个 overlay 只负责一个环境的差异</li><li><strong>最小变更</strong>：base 应尽可能通用，overlay 只做必要修改</li><li><strong>版本同步</strong>：所有环境使用相同的 base 版本</li><li><strong>秘密分离</strong>：敏感数据使用 SecretGenerator 或外部 Secret 管理</li><li><strong>资源命名</strong>：使用 namePrefix/nameSuffix 避免冲突</li></ol><h3 id="_7-3-补丁策略选择指南" tabindex="-1">7.3 补丁策略选择指南 <a class="header-anchor" href="#_7-3-补丁策略选择指南" aria-label="Permalink to &quot;7.3 补丁策略选择指南&quot;">​</a></h3><table tabindex="0"><thead><tr><th>场景</th><th>推荐补丁类型</th><th>示例</th></tr></thead><tbody><tr><td>简单字段修改</td><td>Strategic Merge Patch</td><td>修改 replicas、image</td></tr><tr><td>数组元素操作</td><td>JSON 6902 Patch</td><td>添加 sidecar、修改环境变量</td></tr><tr><td>跨资源修改</td><td>Replacements (v4.5+)</td><td>同步版本号、配置值</td></tr><tr><td>复杂转换</td><td>自定义插件</td><td>特殊格式转换</td></tr></tbody></table><h3 id="_7-4-错误处理与验证" tabindex="-1">7.4 错误处理与验证 <a class="header-anchor" href="#_7-4-错误处理与验证" aria-label="Permalink to &quot;7.4 错误处理与验证&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 语法验证</span></span>
<span class="line"><span class="__shiki_1t8gfj">kustomize</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_dzsirb"> --load-restrictor</span><span class="__shiki_mdbnqw"> LoadRestrictionsNone</span><span class="__shiki_mdbnqw"> ./config</span><span class="__shiki_1itgoe"> 2&gt;&amp;1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. Kubernetes 模式验证</span></span>
<span class="line"><span class="__shiki_1t8gfj">kustomize</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_mdbnqw"> ./config</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> kubeval</span><span class="__shiki_dzsirb"> --strict</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 策略检查</span></span>
<span class="line"><span class="__shiki_1t8gfj">kustomize</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_mdbnqw"> ./config</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> conftest</span><span class="__shiki_mdbnqw"> test</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> policy.rego</span><span class="__shiki_mdbnqw"> -</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 安全扫描</span></span>
<span class="line"><span class="__shiki_1t8gfj">kustomize</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_mdbnqw"> ./config</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> --dry-run=server</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> -</span></span>
<span class="line"><span class="__shiki_1t8gfj">kustomize</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_mdbnqw"> ./config</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> trivy</span><span class="__shiki_mdbnqw"> config</span><span class="__shiki_mdbnqw"> -</span></span></code></pre></div><hr><h2 id="第八部分-生态系统与工具" tabindex="-1">第八部分：生态系统与工具 <a class="header-anchor" href="#第八部分-生态系统与工具" aria-label="Permalink to &quot;第八部分：生态系统与工具&quot;">​</a></h2><h3 id="_8-1-相关工具集成" tabindex="-1">8.1 相关工具集成 <a class="header-anchor" href="#_8-1-相关工具集成" aria-label="Permalink to &quot;8.1 相关工具集成&quot;">​</a></h3><table tabindex="0"><thead><tr><th>工具</th><th>用途</th><th>集成方式</th></tr></thead><tbody><tr><td><strong>ArgoCD</strong></td><td>GitOps 部署</td><td>原生支持 Kustomize</td></tr><tr><td><strong>Flux</strong></td><td>GitOps 部署</td><td>原生支持 Kustomize</td></tr><tr><td><strong>Tanka</strong></td><td>Jsonnet K8s 配置</td><td>可输出到 Kustomize</td></tr><tr><td><strong>kpt</strong></td><td>包管理</td><td>与 Kustomize 互补</td></tr><tr><td><strong>Kubeval</strong></td><td>模式验证</td><td>管道集成</td></tr><tr><td><strong>Conftest</strong></td><td>策略测试</td><td>OPA 策略检查</td></tr><tr><td><strong>Pluto</strong></td><td>API 废弃检查</td><td>检测废弃 API</td></tr></tbody></table><h3 id="_8-2-编辑器支持" tabindex="-1">8.2 编辑器支持 <a class="header-anchor" href="#_8-2-编辑器支持" aria-label="Permalink to &quot;8.2 编辑器支持&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># VS Code 配置示例 (.vscode/settings.json)</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;yaml.customTags&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;!And sequence&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;!If sequence&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;!Not sequence&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;!Equals sequence&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;!Or sequence&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;!Find sequence&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;!Replacements&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  ],</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;files.associations&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;kustomization.yaml&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;yaml&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;Kustomization&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;yaml&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><hr><h2 id="第九部分-迁移与升级" tabindex="-1">第九部分：迁移与升级 <a class="header-anchor" href="#第九部分-迁移与升级" aria-label="Permalink to &quot;第九部分：迁移与升级&quot;">​</a></h2><h3 id="_9-1-从传统-yaml-迁移" tabindex="-1">9.1 从传统 YAML 迁移 <a class="header-anchor" href="#_9-1-从传统-yaml-迁移" aria-label="Permalink to &quot;9.1 从传统 YAML 迁移&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 步骤1：创建 base</span></span>
<span class="line"><span class="__shiki_1t8gfj">mkdir</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> base</span></span>
<span class="line"><span class="__shiki_1t8gfj">cp</span><span class="__shiki_mdbnqw"> deployment.yaml</span><span class="__shiki_mdbnqw"> service.yaml</span><span class="__shiki_mdbnqw"> configmap.yaml</span><span class="__shiki_mdbnqw"> base/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 步骤2：创建 kustomization.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> base/kustomization.yaml</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">apiVersion: kustomize.config.k8s.io/v1beta1</span></span>
<span class="line"><span class="__shiki_mdbnqw">kind: Kustomization</span></span>
<span class="line"><span class="__shiki_mdbnqw">resources:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  - deployment.yaml</span></span>
<span class="line"><span class="__shiki_mdbnqw">  - service.yaml</span></span>
<span class="line"><span class="__shiki_mdbnqw">  - configmap.yaml</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 步骤3：创建环境覆盖</span></span>
<span class="line"><span class="__shiki_1t8gfj">mkdir</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> overlays/dev</span></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> overlays/dev/kustomization.yaml</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">apiVersion: kustomize.config.k8s.io/v1beta1</span></span>
<span class="line"><span class="__shiki_mdbnqw">kind: Kustomization</span></span>
<span class="line"><span class="__shiki_mdbnqw">resources:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  - ../../base</span></span>
<span class="line"><span class="__shiki_mdbnqw">patchesStrategicMerge:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  - patch-deployment.yaml</span></span>
<span class="line"><span class="__shiki_mdbnqw">namePrefix: dev-</span></span>
<span class="line"><span class="__shiki_mdbnqw">namespace: dev</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span></code></pre></div><h3 id="_9-2-从-helm-迁移" tabindex="-1">9.2 从 Helm 迁移 <a class="header-anchor" href="#_9-2-从-helm-迁移" aria-label="Permalink to &quot;9.2 从 Helm 迁移&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 方案1：混合使用</span></span>
<span class="line"><span class="__shiki_21nrsd"># 生成 Helm 模板，用 Kustomize 补丁</span></span>
<span class="line"><span class="__shiki_1t8gfj">helm</span><span class="__shiki_mdbnqw"> template</span><span class="__shiki_mdbnqw"> myapp</span><span class="__shiki_mdbnqw"> ./chart</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> values.yaml</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> base/all.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 方案2：完全迁移</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 提取通用配置为 base</span></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 将 values.yaml 转换为 overlay 补丁</span></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 使用 replacements 处理变量</span></span></code></pre></div><hr><h2 id="第十部分-常见问题排查" tabindex="-1">第十部分：常见问题排查 <a class="header-anchor" href="#第十部分-常见问题排查" aria-label="Permalink to &quot;第十部分：常见问题排查&quot;">​</a></h2><h3 id="_10-1-常见错误与解决方案" tabindex="-1">10.1 常见错误与解决方案 <a class="header-anchor" href="#_10-1-常见错误与解决方案" aria-label="Permalink to &quot;10.1 常见错误与解决方案&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 错误1：资源重复</span></span>
<span class="line"><span class="__shiki_21nrsd"># 错误：Resource ... already deployed</span></span>
<span class="line"><span class="__shiki_21nrsd"># 解决：检查是否有重复的 resources 条目</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 错误2：补丁不匹配</span></span>
<span class="line"><span class="__shiki_21nrsd"># 错误：no matches for ... </span></span>
<span class="line"><span class="__shiki_21nrsd"># 解决：确保补丁的 apiVersion/kind/name 完全匹配</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 错误3：无限递归</span></span>
<span class="line"><span class="__shiki_21nrsd"># 错误：cycle detected</span></span>
<span class="line"><span class="__shiki_21nrsd"># 解决：检查 resources 引用是否形成循环</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 错误4：变量替换失败</span></span>
<span class="line"><span class="__shiki_21nrsd"># 错误：field not found</span></span>
<span class="line"><span class="__shiki_21nrsd"># 解决：确保 source 资源存在且字段路径正确</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 错误5：哈希后缀变化</span></span>
<span class="line"><span class="__shiki_21nrsd"># 现象：ConfigMap 名称频繁变化导致滚动更新</span></span>
<span class="line"><span class="__shiki_21nrsd"># 解决：设置 options.disableNameSuffixHash: true</span></span></code></pre></div><h3 id="_10-2-调试命令" tabindex="-1">10.2 调试命令 <a class="header-anchor" href="#_10-2-调试命令" aria-label="Permalink to &quot;10.2 调试命令&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 逐步调试</span></span>
<span class="line"><span class="__shiki_1t8gfj">kustomize</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_dzsirb"> --reorder=legacy</span><span class="__shiki_mdbnqw"> ./overlays/dev</span><span class="__shiki_21nrsd">  # 禁用重新排序</span></span>
<span class="line"><span class="__shiki_1t8gfj">kustomize</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_dzsirb"> --enable-deepcopy=false</span><span class="__shiki_mdbnqw"> ./overlays/dev</span><span class="__shiki_21nrsd">  # 禁用深拷贝</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 输出中间状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">kustomize</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_dzsirb"> --output</span><span class="__shiki_mdbnqw"> /tmp/manifests.yaml</span><span class="__shiki_mdbnqw"> ./overlays/dev</span></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_mdbnqw"> /tmp/manifests.yaml</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -A5</span><span class="__shiki_dzsirb"> -B5</span><span class="__shiki_mdbnqw"> &quot;ERROR&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用 kyaml 调试</span></span>
<span class="line"><span class="__shiki_1t8gfj">kustomize</span><span class="__shiki_mdbnqw"> cfg</span><span class="__shiki_mdbnqw"> count</span><span class="__shiki_mdbnqw"> ./base</span><span class="__shiki_21nrsd">  # 统计资源数量</span></span>
<span class="line"><span class="__shiki_1t8gfj">kustomize</span><span class="__shiki_mdbnqw"> cfg</span><span class="__shiki_mdbnqw"> tree</span><span class="__shiki_mdbnqw"> ./overlays/dev</span><span class="__shiki_21nrsd">  # 显示资源树</span></span></code></pre></div><hr><h2 id="总结对比表" tabindex="-1">总结对比表 <a class="header-anchor" href="#总结对比表" aria-label="Permalink to &quot;总结对比表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>特性</th><th>kubectl apply -f</th><th>Helm</th><th>Kustomize</th></tr></thead><tbody><tr><td><strong>配置方式</strong></td><td>原始 YAML</td><td>模板 + Values</td><td>基础 + 补丁</td></tr><tr><td><strong>环境管理</strong></td><td>多文件复制</td><td>Values 文件</td><td>Overlay</td></tr><tr><td><strong>复用性</strong></td><td>无</td><td>Chart 复用</td><td>Base 复用</td></tr><tr><td><strong>学习曲线</strong></td><td>低</td><td>中</td><td>中低</td></tr><tr><td><strong>GitOps 友好度</strong></td><td>中</td><td>中</td><td>高</td></tr><tr><td><strong>适用场景</strong></td><td>简单应用</td><td>应用分发</td><td>配置管理</td></tr></tbody></table><hr><h2 id="学习路线建议" tabindex="-1">学习路线建议 <a class="header-anchor" href="#学习路线建议" aria-label="Permalink to &quot;学习路线建议&quot;">​</a></h2><h3 id="初级阶段-1-2周" tabindex="-1">初级阶段（1-2周） <a class="header-anchor" href="#初级阶段-1-2周" aria-label="Permalink to &quot;初级阶段（1-2周）&quot;">​</a></h3><ol><li>学习 kustomization.yaml 基本结构</li><li>掌握 resources、namePrefix、commonLabels 使用</li><li>实践 base 和 overlay 模式</li></ol><h3 id="中级阶段-2-3周" tabindex="-1">中级阶段（2-3周） <a class="header-anchor" href="#中级阶段-2-3周" aria-label="Permalink to &quot;中级阶段（2-3周）&quot;">​</a></h3><ol><li>掌握 ConfigMapGenerator、SecretGenerator</li><li>学习 Strategic Merge Patch 和 JSON 6902 Patch</li><li>实践多环境管理</li></ol><h3 id="高级阶段-3-4周" tabindex="-1">高级阶段（3-4周） <a class="header-anchor" href="#高级阶段-3-4周" aria-label="Permalink to &quot;高级阶段（3-4周）&quot;">​</a></h3><ol><li>学习 Replacements 高级特性</li><li>掌握 Components 复用模式</li><li>集成 GitOps 工具（ArgoCD/Flux）</li><li>开发自定义插件</li></ol><h3 id="专家阶段-持续" tabindex="-1">专家阶段（持续） <a class="header-anchor" href="#专家阶段-持续" aria-label="Permalink to &quot;专家阶段（持续）&quot;">​</a></h3><ol><li>大型多集群配置管理</li><li>性能优化与最佳实践</li><li>贡献社区与插件生态</li></ol><hr><p><strong>推荐学习资源</strong>：</p><ul><li>官方文档：<a href="https://kubectl.docs.kubernetes.io/" target="_blank" rel="noreferrer">https://kubectl.docs.kubernetes.io/</a></li><li>GitHub：<a href="https://github.com/kubernetes-sigs/kustomize" target="_blank" rel="noreferrer">https://github.com/kubernetes-sigs/kustomize</a></li><li>示例仓库：<a href="https://github.com/kubernetes-sigs/kustomize/tree/master/examples" target="_blank" rel="noreferrer">https://github.com/kubernetes-sigs/kustomize/tree/master/examples</a></li><li>社区：Kubernetes Slack #kustomize 频道</li></ul><p><strong>实践建议</strong>：</p><ol><li>从现有 YAML 文件开始迁移</li><li>先为单个应用创建 base 和 overlay</li><li>逐步扩展到多应用、多环境</li><li>集成到现有 CI/CD 流程</li><li>定期回顾和优化目录结构</li></ol><p>通过系统学习 Kustomize，您将能够高效管理 Kubernetes 配置，实现真正的 GitOps 工作流，提升部署的一致性和可靠性。</p>`,128)])])}const r=a(_,[["render",l]]);export{o as __pageData,r as default};
