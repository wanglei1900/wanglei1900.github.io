import{_ as a,o as n,c as p,a as _}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"Kubernetes自动扩缩机制 - 详细完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"devops/container/kubernetes/autoscaling.md","filePath":"devops/container/kubernetes/autoscaling.md"}'),i={name:"devops/container/kubernetes/autoscaling.md"};function l(h,s,c,e,t,k){return n(),p("div",null,[...s[0]||(s[0]=[_(`<h1 id="kubernetes自动扩缩机制-详细完整学习笔记" tabindex="-1">Kubernetes自动扩缩机制 - 详细完整学习笔记 <a class="header-anchor" href="#kubernetes自动扩缩机制-详细完整学习笔记" aria-label="Permalink to &quot;Kubernetes自动扩缩机制 - 详细完整学习笔记&quot;">​</a></h1><h2 id="一、自动扩缩基础概念" tabindex="-1">一、自动扩缩基础概念 <a class="header-anchor" href="#一、自动扩缩基础概念" aria-label="Permalink to &quot;一、自动扩缩基础概念&quot;">​</a></h2><h3 id="_1-1-扩缩维度的分类" tabindex="-1">1.1 扩缩维度的分类 <a class="header-anchor" href="#_1-1-扩缩维度的分类" aria-label="Permalink to &quot;1.1 扩缩维度的分类&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">Kubernetes自动扩缩体系</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 水平扩缩 (HPA)           # Pod副本数调整</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 垂直扩缩 (VPA)           # Pod资源调整  </span></span>
<span class="line"><span class="__shiki_wvjl67">├── 集群扩缩 (CA)            # 节点数量调整</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 自定义扩缩 (Custom)       # 基于自定义指标</span></span>
<span class="line"><span class="__shiki_wvjl67">└── 混合扩缩策略              # 多维度组合扩缩</span></span></code></pre></div><h3 id="_1-2-扩缩触发指标类型" tabindex="-1">1.2 扩缩触发指标类型 <a class="header-anchor" href="#_1-2-扩缩触发指标类型" aria-label="Permalink to &quot;1.2 扩缩触发指标类型&quot;">​</a></h3><table tabindex="0"><thead><tr><th>指标类型</th><th>示例</th><th>适用场景</th></tr></thead><tbody><tr><td>资源指标</td><td>CPU、内存使用率</td><td>通用工作负载</td></tr><tr><td>自定义指标</td><td>QPS、连接数</td><td>Web服务</td></tr><tr><td>外部指标</td><td>队列长度、消息数</td><td>消息处理</td></tr><tr><td>对象指标</td><td>Ingress请求率</td><td>网络服务</td></tr><tr><td>多指标组合</td><td>CPU+QPS</td><td>复杂应用</td></tr></tbody></table><h2 id="二、horizontal-pod-autoscaler-hpa" tabindex="-1">二、Horizontal Pod Autoscaler (HPA) <a class="header-anchor" href="#二、horizontal-pod-autoscaler-hpa" aria-label="Permalink to &quot;二、Horizontal Pod Autoscaler (HPA)&quot;">​</a></h2><h3 id="_2-1-hpa基础原理" tabindex="-1">2.1 HPA基础原理 <a class="header-anchor" href="#_2-1-hpa基础原理" aria-label="Permalink to &quot;2.1 HPA基础原理&quot;">​</a></h3><h4 id="_2-1-1-hpa架构" tabindex="-1">2.1.1 HPA架构 <a class="header-anchor" href="#_2-1-1-hpa架构" aria-label="Permalink to &quot;2.1.1 HPA架构&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                   HPA控制器                      │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 1. 查询Metrics API获取指标                      │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 2. 计算期望副本数                               │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 3. 更新Deployment/StatefulSet副本数             │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">        ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                Metrics API                       │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 资源指标 ← Metrics Server                       │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 自定义指标 ← Prometheus Adapter                 │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 外部指标 ← 外部适配器                           │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────┘</span></span></code></pre></div><h4 id="_2-1-2-hpa核心算法" tabindex="-1">2.1.2 HPA核心算法 <a class="header-anchor" href="#_2-1-2-hpa核心算法" aria-label="Permalink to &quot;2.1.2 HPA核心算法&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// HPA计算公式</span></span>
<span class="line"><span class="__shiki_140thh">期望副本数 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ceil[当前副本数 × (当前指标值 </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> 目标指标值)]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 多指标计算</span></span>
<span class="line"><span class="__shiki_140thh">对于每个指标：</span></span>
<span class="line"><span class="__shiki_140thh">    desiredReplicas[i] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> ceil</span><span class="__shiki_140thh">(currentReplicas </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> (currentMetricValue[i] </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> targetMetricValue[i]))</span></span>
<span class="line"><span class="__shiki_140thh">最终副本数 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> max</span><span class="__shiki_140thh">(desiredReplicas[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">], desiredReplicas[</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">], </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_2-2-hpa配置详解" tabindex="-1">2.2 HPA配置详解 <a class="header-anchor" href="#_2-2-hpa配置详解" aria-label="Permalink to &quot;2.2 HPA配置详解&quot;">​</a></h3><h4 id="_2-2-1-基础hpa配置" tabindex="-1">2.2.1 基础HPA配置 <a class="header-anchor" href="#_2-2-1-基础hpa配置" aria-label="Permalink to &quot;2.2.1 基础HPA配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling/v2</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HorizontalPodAutoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">php-apache</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">  labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">php-apache</span></span>
<span class="line"><span class="__shiki_17hn0y">    type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">hpa</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;HPA for PHP Apache application&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2.0&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 目标伸缩对象</span></span>
<span class="line"><span class="__shiki_17hn0y">  scaleTargetRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">php-apache</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 副本数范围</span></span>
<span class="line"><span class="__shiki_17hn0y">  minReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">  maxReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 指标配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 1. 资源指标 - CPU</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Resource</span></span>
<span class="line"><span class="__shiki_17hn0y">    resource</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cpu</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Utilization</span><span class="__shiki_21nrsd">  # 或 AverageValue</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageUtilization</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">50</span><span class="__shiki_21nrsd">  # 目标CPU使用率50%</span></span>
<span class="line"><span class="__shiki_21nrsd">        # averageValue: 200m  # 或使用绝对值</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 2. 资源指标 - 内存</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Resource</span></span>
<span class="line"><span class="__shiki_17hn0y">    resource</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">memory</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AverageValue</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageValue</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">500Mi</span><span class="__shiki_21nrsd">  # 目标平均内存使用量</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 3. Pod指标 - 自定义Pod指标</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pods</span></span>
<span class="line"><span class="__shiki_17hn0y">    pods</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      metric</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">packets-per-second</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AverageValue</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageValue</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1000</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 4. 对象指标 - 基于Kubernetes对象</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Object</span></span>
<span class="line"><span class="__shiki_17hn0y">    object</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      metric</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">requests-per-second</span></span>
<span class="line"><span class="__shiki_17hn0y">      describedObject</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">        kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">main-route</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Value</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10000</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 5. 外部指标 - 来自外部系统</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">External</span></span>
<span class="line"><span class="__shiki_17hn0y">    external</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      metric</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">queue_messages_ready</span></span>
<span class="line"><span class="__shiki_17hn0y">        selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            queue</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;worker_tasks&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AverageValue</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageValue</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;30&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 行为配置（Kubernetes 1.18+）</span></span>
<span class="line"><span class="__shiki_17hn0y">  behavior</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 扩容行为</span></span>
<span class="line"><span class="__shiki_17hn0y">    scaleUp</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      stabilizationWindowSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_17hn0y">      policies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pods</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">4</span></span>
<span class="line"><span class="__shiki_17hn0y">        periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">15</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Percent</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_17hn0y">        periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">15</span></span>
<span class="line"><span class="__shiki_17hn0y">      selectPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Max</span><span class="__shiki_21nrsd">  # 选择最大变化值</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 缩容行为  </span></span>
<span class="line"><span class="__shiki_17hn0y">    scaleDown</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      stabilizationWindowSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">300</span><span class="__shiki_21nrsd">  # 5分钟稳定窗口</span></span>
<span class="line"><span class="__shiki_17hn0y">      policies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pods</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">        periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Percent</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_17hn0y">        periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span></span>
<span class="line"><span class="__shiki_17hn0y">      selectPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Min</span><span class="__shiki_21nrsd">  # 选择最小变化值</span></span></code></pre></div><h4 id="_2-2-2-hpa行为配置详解" tabindex="-1">2.2.2 HPA行为配置详解 <a class="header-anchor" href="#_2-2-2-hpa行为配置详解" aria-label="Permalink to &quot;2.2.2 HPA行为配置详解&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">behavior</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 扩容配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  scaleUp</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 稳定窗口：指标波动时防止频繁扩容</span></span>
<span class="line"><span class="__shiki_17hn0y">    stabilizationWindowSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 策略列表</span></span>
<span class="line"><span class="__shiki_17hn0y">    policies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pods</span><span class="__shiki_21nrsd">          # 按Pod数量</span></span>
<span class="line"><span class="__shiki_17hn0y">      value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">4</span><span class="__shiki_21nrsd">            # 每次最多增加4个Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">      periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">15</span><span class="__shiki_21nrsd">   # 每15秒评估一次</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Percent</span><span class="__shiki_21nrsd">       # 按百分比</span></span>
<span class="line"><span class="__shiki_17hn0y">      value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_21nrsd">          # 每次最多翻倍</span></span>
<span class="line"><span class="__shiki_17hn0y">      periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">15</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 选择策略</span></span>
<span class="line"><span class="__shiki_17hn0y">    selectPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Max</span><span class="__shiki_21nrsd">     # 取两个策略中的最大值</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 缩容配置  </span></span>
<span class="line"><span class="__shiki_17hn0y">  scaleDown</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 稳定窗口：防止短时下降导致缩容</span></span>
<span class="line"><span class="__shiki_17hn0y">    stabilizationWindowSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">300</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    policies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pods</span></span>
<span class="line"><span class="__shiki_17hn0y">      value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_21nrsd">            # 每次最多减少1个Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">      periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span><span class="__shiki_21nrsd">   # 每60秒评估一次</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Percent</span></span>
<span class="line"><span class="__shiki_17hn0y">      value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_21nrsd">           # 每次最多减少10%</span></span>
<span class="line"><span class="__shiki_17hn0y">      periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    selectPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Min</span><span class="__shiki_21nrsd">     # 取两个策略中的最小值</span></span></code></pre></div><h3 id="_2-3-hpa高级特性" tabindex="-1">2.3 HPA高级特性 <a class="header-anchor" href="#_2-3-hpa高级特性" aria-label="Permalink to &quot;2.3 HPA高级特性&quot;">​</a></h3><h4 id="_2-3-1-多指标hpa" tabindex="-1">2.3.1 多指标HPA <a class="header-anchor" href="#_2-3-1-多指标hpa" aria-label="Permalink to &quot;2.3.1 多指标HPA&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling/v2</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HorizontalPodAutoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">multi-metric-hpa</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  scaleTargetRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web-app</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  minReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">  maxReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">20</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # AND逻辑：所有指标都必须满足</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Resource</span></span>
<span class="line"><span class="__shiki_17hn0y">    resource</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cpu</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Utilization</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageUtilization</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">70</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Resource</span></span>
<span class="line"><span class="__shiki_17hn0y">    resource</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">memory</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Utilization</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageUtilization</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 自定义HTTP请求指标</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pods</span></span>
<span class="line"><span class="__shiki_17hn0y">    pods</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      metric</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http_requests_per_second</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AverageValue</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageValue</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">500</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 外部队列指标</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">External</span></span>
<span class="line"><span class="__shiki_17hn0y">    external</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      metric</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">sqs_queue_size</span></span>
<span class="line"><span class="__shiki_17hn0y">        selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            queue_name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;order_queue&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AverageValue</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageValue</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100&quot;</span></span></code></pre></div><h4 id="_2-3-2-hpa与cronhpa结合" tabindex="-1">2.3.2 HPA与CronHPA结合 <a class="header-anchor" href="#_2-3-2-hpa与cronhpa结合" aria-label="Permalink to &quot;2.3.2 HPA与CronHPA结合&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 常规HPA（基于负载）</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling/v2</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HorizontalPodAutoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web-app-hpa</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  scaleTargetRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web-app</span></span>
<span class="line"><span class="__shiki_17hn0y">  minReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">  maxReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">20</span></span>
<span class="line"><span class="__shiki_17hn0y">  metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Resource</span></span>
<span class="line"><span class="__shiki_17hn0y">    resource</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cpu</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Utilization</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageUtilization</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">70</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. CronHPA（基于时间计划）</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling/v2beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HorizontalPodAutoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web-app-cronhpa</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # Cron表达式：分钟 小时 日 月 星期</span></span>
<span class="line"><span class="__shiki_17hn0y">    cronhpa.k8s.io/schedule</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;0 9 * * 1-5&quot;</span><span class="__shiki_21nrsd">  # 工作日9:00</span></span>
<span class="line"><span class="__shiki_17hn0y">    cronhpa.k8s.io/target-replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    cronhpa.k8s.io/suspend</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;false&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  scaleTargetRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web-app</span></span>
<span class="line"><span class="__shiki_17hn0y">  minReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">  maxReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">20</span></span></code></pre></div><h4 id="_2-3-3-hpa冷却机制" tabindex="-1">2.3.3 HPA冷却机制 <a class="header-anchor" href="#_2-3-3-hpa冷却机制" aria-label="Permalink to &quot;2.3.3 HPA冷却机制&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用注解控制冷却时间</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 默认冷却时间（秒）</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 扩容冷却：3分钟</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 缩容冷却：5分钟</span></span>
<span class="line"><span class="__shiki_17hn0y">    autoscaling.kubernetes.io/scale-down-delay</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;5m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    autoscaling.kubernetes.io/scale-up-delay</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;3m&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 禁用自动扩缩（维护期间）</span></span>
<span class="line"><span class="__shiki_17hn0y">    autoscaling.kubernetes.io/paused</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span></code></pre></div><h3 id="_2-4-hpa监控与调试" tabindex="-1">2.4 HPA监控与调试 <a class="header-anchor" href="#_2-4-hpa监控与调试" aria-label="Permalink to &quot;2.4 HPA监控与调试&quot;">​</a></h3><h4 id="_2-4-1-hpa状态检查" tabindex="-1">2.4.1 HPA状态检查 <a class="header-anchor" href="#_2-4-1-hpa状态检查" aria-label="Permalink to &quot;2.4.1 HPA状态检查&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 查看HPA状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> hpa</span><span class="__shiki_mdbnqw"> php-apache</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 输出示例：</span></span>
<span class="line"><span class="__shiki_21nrsd"># Name: php-apache</span></span>
<span class="line"><span class="__shiki_21nrsd"># Namespace: default</span></span>
<span class="line"><span class="__shiki_21nrsd"># Labels: app=php-apache</span></span>
<span class="line"><span class="__shiki_21nrsd"># Annotations: &lt;none&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd"># CreationTimestamp: Mon, 26 Jan 2024 10:00:00 +0800</span></span>
<span class="line"><span class="__shiki_21nrsd"># Reference: Deployment/php-apache</span></span>
<span class="line"><span class="__shiki_21nrsd"># Metrics: ( current / target )</span></span>
<span class="line"><span class="__shiki_21nrsd">#   resource cpu on pods: 45% (225m) / 50%</span></span>
<span class="line"><span class="__shiki_21nrsd">#   resource memory on pods: 250Mi / 500Mi</span></span>
<span class="line"><span class="__shiki_21nrsd">#   pods/http-requests-per-second: 850 / 1k</span></span>
<span class="line"><span class="__shiki_21nrsd"># Min replicas: 1</span></span>
<span class="line"><span class="__shiki_21nrsd"># Max replicas: 10</span></span>
<span class="line"><span class="__shiki_21nrsd"># Deployment pods: 3 current / 3 desired</span></span>
<span class="line"><span class="__shiki_21nrsd"># Conditions:</span></span>
<span class="line"><span class="__shiki_21nrsd">#   Type            Status  Reason            Message</span></span>
<span class="line"><span class="__shiki_21nrsd">#   ----            ------  ------            -------</span></span>
<span class="line"><span class="__shiki_21nrsd">#   AbleToScale     True    ReadyForNewScale  recommended size matches current size</span></span>
<span class="line"><span class="__shiki_21nrsd">#   ScalingActive   True    ValidMetricFound  the HPA was able to successfully calculate...</span></span>
<span class="line"><span class="__shiki_21nrsd">#   ScalingLimited  False   DesiredWithinRange the desired count is within the acceptable range</span></span>
<span class="line"><span class="__shiki_21nrsd"># Events:</span></span>
<span class="line"><span class="__shiki_21nrsd">#   Type    Reason             Age   From                       Message</span></span>
<span class="line"><span class="__shiki_21nrsd">#   ----    ------             ----  ----                       -------</span></span>
<span class="line"><span class="__shiki_21nrsd">#   Normal  SuccessfulRescale  5m    horizontal-pod-autoscaler  New size: 3; reason: cpu resource utilization...</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 获取HPA详细指标</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_dzsirb"> --raw</span><span class="__shiki_mdbnqw"> &quot;/apis/autoscaling/v2/horizontalpodautoscalers/default/php-apache&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> jq</span><span class="__shiki_mdbnqw"> .</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看HPA事件</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> events</span><span class="__shiki_dzsirb"> --field-selector</span><span class="__shiki_mdbnqw"> involvedObject.kind=HorizontalPodAutoscaler,involvedObject.name=php-apache</span></span></code></pre></div><h4 id="_2-4-2-hpa故障排查" tabindex="-1">2.4.2 HPA故障排查 <a class="header-anchor" href="#_2-4-2-hpa故障排查" aria-label="Permalink to &quot;2.4.2 HPA故障排查&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># HPA故障排查脚本</span></span>
<span class="line"><span class="__shiki_1t8gfj">hpa_troubleshoot</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> HPA_NAME</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33">$1</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> NAMESPACE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33">\${2</span><span class="__shiki_1itgoe">:-</span><span class="__shiki_140thh">default</span><span class="__shiki_1jdh33">}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;=== HPA故障排查: </span><span class="__shiki_140thh">$HPA_NAME</span><span class="__shiki_mdbnqw"> ===&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 1. 检查HPA配置</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n1. HPA配置:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">get</span><span class="__shiki_mdbnqw"> hpa</span><span class="__shiki_140thh"> $HPA_NAME </span><span class="__shiki_dzsirb">-o</span><span class="__shiki_mdbnqw"> yaml</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 2. 检查目标Deployment</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n2. 目标Deployment状态:&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    TARGET</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">get</span><span class="__shiki_mdbnqw"> hpa</span><span class="__shiki_140thh"> $HPA_NAME </span><span class="__shiki_dzsirb">-o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.spec.scaleTargetRef.name}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">get</span><span class="__shiki_mdbnqw"> deployment</span><span class="__shiki_140thh"> $TARGET</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 3. 检查指标可用性</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n3. 检查Metrics API:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_dzsirb"> --raw</span><span class="__shiki_mdbnqw"> &quot;/apis/metrics.k8s.io/v1beta1&quot;</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /dev/null</span><span class="__shiki_1itgoe"> 2&gt;&amp;1</span><span class="__shiki_140thh"> &amp;&amp; </span><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;✓ Metrics API可用&quot;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> echo</span><span class="__shiki_mdbnqw"> &quot;✗ Metrics API不可用&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 4. 检查Pod资源请求</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n4. Pod资源请求:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_mdbnqw"> app=</span><span class="__shiki_140thh">$TARGET </span><span class="__shiki_dzsirb">-o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{range .items[*]}{.metadata.name}{&quot;\\t&quot;}{.spec.containers[*].resources.requests}{&quot;\\n&quot;}{end}&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 5. 检查实际资源使用</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n5. 实际资源使用:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">top</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_mdbnqw"> app=</span><span class="__shiki_140thh">$TARGET</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 6. 检查HPA事件</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n6. HPA事件:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">get</span><span class="__shiki_mdbnqw"> events</span><span class="__shiki_dzsirb"> --field-selector</span><span class="__shiki_mdbnqw"> involvedObject.name=</span><span class="__shiki_140thh">$HPA_NAME</span><span class="__shiki_mdbnqw">,involvedObject.kind=HorizontalPodAutoscaler</span><span class="__shiki_dzsirb"> --sort-by=</span><span class="__shiki_mdbnqw">&#39;.lastTimestamp&#39;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="三、vertical-pod-autoscaler-vpa" tabindex="-1">三、Vertical Pod Autoscaler (VPA) <a class="header-anchor" href="#三、vertical-pod-autoscaler-vpa" aria-label="Permalink to &quot;三、Vertical Pod Autoscaler (VPA)&quot;">​</a></h2><h3 id="_3-1-vpa架构原理" tabindex="-1">3.1 VPA架构原理 <a class="header-anchor" href="#_3-1-vpa架构原理" aria-label="Permalink to &quot;3.1 VPA架构原理&quot;">​</a></h3><h4 id="_3-1-1-vpa组件架构" tabindex="-1">3.1.1 VPA组件架构 <a class="header-anchor" href="#_3-1-1-vpa组件架构" aria-label="Permalink to &quot;3.1.1 VPA组件架构&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│               VPA控制器                          │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 1. Recommender - 计算推荐值                      │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 2. Updater - 驱逐Pod应用新资源                   │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 3. Admission Controller - 注入新Pod资源         │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">        ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│            Metrics Server                        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│            Prometheus                            │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────┘</span></span></code></pre></div><h4 id="_3-1-2-vpa工作流程" tabindex="-1">3.1.2 VPA工作流程 <a class="header-anchor" href="#_3-1-2-vpa工作流程" aria-label="Permalink to &quot;3.1.2 VPA工作流程&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">1. Recommender持续监控Pod资源使用</span></span>
<span class="line"><span class="__shiki_wvjl67">2. 基于历史数据计算资源推荐值</span></span>
<span class="line"><span class="__shiki_wvjl67">3. Updater检测到需要更新的Pod</span></span>
<span class="line"><span class="__shiki_wvjl67">4. 优雅驱逐Pod（遵循PDB规则）</span></span>
<span class="line"><span class="__shiki_wvjl67">5. Admission Controller为新Pod注入推荐资源</span></span>
<span class="line"><span class="__shiki_wvjl67">6. 新Pod以正确资源启动</span></span></code></pre></div><h3 id="_3-2-vpa配置详解" tabindex="-1">3.2 VPA配置详解 <a class="header-anchor" href="#_3-2-vpa配置详解" aria-label="Permalink to &quot;3.2 VPA配置详解&quot;">​</a></h3><h4 id="_3-2-1-vpa资源定义" tabindex="-1">3.2.1 VPA资源定义 <a class="header-anchor" href="#_3-2-1-vpa资源定义" aria-label="Permalink to &quot;3.2.1 VPA资源定义&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">VerticalPodAutoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">recommendation-engine-vpa</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">  labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">recommendation-engine</span></span>
<span class="line"><span class="__shiki_17hn0y">    component</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">vpa</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    vpa-autoscaling.kubernetes.io/update-mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Auto&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    vpa-autoscaling.kubernetes.io/resource-policy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;container-memory&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 目标工作负载</span></span>
<span class="line"><span class="__shiki_17hn0y">  targetRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;apps/v1&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Deployment&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;recommendation-engine&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 更新策略</span></span>
<span class="line"><span class="__shiki_17hn0y">  updatePolicy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    updateMode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Auto&quot;</span><span class="__shiki_21nrsd">  # Off, Initial, Auto, Recreate</span></span>
<span class="line"><span class="__shiki_17hn0y">    minReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_21nrsd">      # 最小副本数（Auto模式）</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 更新窗口</span></span>
<span class="line"><span class="__shiki_17hn0y">    updateWindow</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      startTime</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;02:00&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      duration</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2h&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 资源策略</span></span>
<span class="line"><span class="__shiki_17hn0y">  resourcePolicy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    containerPolicies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 容器特定策略</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">containerName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;app&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Auto&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      controlledResources</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;cpu&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;memory&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">      controlledValues</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;RequestsAndLimits&quot;</span><span class="__shiki_21nrsd">  # 或 RequestsOnly</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 最小允许资源</span></span>
<span class="line"><span class="__shiki_17hn0y">      minAllowed</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;250Mi&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 最大允许资源  </span></span>
<span class="line"><span class="__shiki_17hn0y">      maxAllowed</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;4Gi&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 资源限制比例</span></span>
<span class="line"><span class="__shiki_17hn0y">      limitCPUToMemoryPercent</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">200</span><span class="__shiki_21nrsd">  # CPU限制是内存的200%</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 通配符匹配所有容器</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">containerName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;*&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Auto&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      minAllowed</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;50m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      maxAllowed</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2Gi&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 推荐配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  recommendation</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # CPU推荐配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    cpu</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      baseRecommendation</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;500m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        lowerBound</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;300m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        upperBound</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;800m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      confidenceLevel</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0.95</span><span class="__shiki_21nrsd">  # 置信水平</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 内存推荐配置  </span></span>
<span class="line"><span class="__shiki_17hn0y">    memory</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      baseRecommendation</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1Gi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        lowerBound</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;512Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        upperBound</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2Gi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      confidenceLevel</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0.90</span></span></code></pre></div><h4 id="_3-2-2-vpa更新模式对比" tabindex="-1">3.2.2 VPA更新模式对比 <a class="header-anchor" href="#_3-2-2-vpa更新模式对比" aria-label="Permalink to &quot;3.2.2 VPA更新模式对比&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 模式1: Off - 仅监控，不更新</span></span>
<span class="line"><span class="__shiki_17hn0y">updatePolicy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  updateMode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Off&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 模式2: Initial - 只在创建时更新</span></span>
<span class="line"><span class="__shiki_17hn0y">updatePolicy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  updateMode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Initial&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 模式3: Auto - 自动更新（推荐）</span></span>
<span class="line"><span class="__shiki_17hn0y">updatePolicy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  updateMode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Auto&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  minReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_21nrsd">  # 保持至少2个副本在线</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 模式4: Recreate - 删除并重新创建</span></span>
<span class="line"><span class="__shiki_17hn0y">updatePolicy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  updateMode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Recreate&quot;</span></span></code></pre></div><h3 id="_3-3-vpa高级配置" tabindex="-1">3.3 VPA高级配置 <a class="header-anchor" href="#_3-3-vpa高级配置" aria-label="Permalink to &quot;3.3 VPA高级配置&quot;">​</a></h3><h4 id="_3-3-1-vpa与hpa协同工作" tabindex="-1">3.3.1 VPA与HPA协同工作 <a class="header-anchor" href="#_3-3-1-vpa与hpa协同工作" aria-label="Permalink to &quot;3.3.1 VPA与HPA协同工作&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 部署配置VPA</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">VerticalPodAutoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web-app-vpa</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  targetRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;apps/v1&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web-app</span></span>
<span class="line"><span class="__shiki_17hn0y">  updatePolicy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    updateMode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Auto&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  resourcePolicy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    containerPolicies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">containerName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;*&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      controlledResources</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;cpu&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;memory&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 部署配置HPA（基于CPU使用率）</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling/v2</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HorizontalPodAutoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web-app-hpa</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  scaleTargetRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web-app</span></span>
<span class="line"><span class="__shiki_17hn0y">  minReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">  maxReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_17hn0y">  metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Resource</span></span>
<span class="line"><span class="__shiki_17hn0y">    resource</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cpu</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Utilization</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageUtilization</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">70</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. Pod配置（设置初始资源）</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web-app</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web-app:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">        resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;200m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;256Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;500m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;512Mi&quot;</span></span></code></pre></div><p><strong>协同策略：</strong></p><ol><li>VPA负责优化单个Pod的资源</li><li>HPA负责调整Pod数量</li><li>避免同时修改相同资源</li></ol><h4 id="_3-3-2-vpa资源推荐算法" tabindex="-1">3.3.2 VPA资源推荐算法 <a class="header-anchor" href="#_3-3-2-vpa资源推荐算法" aria-label="Permalink to &quot;3.3.2 VPA资源推荐算法&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">VerticalPodAutoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">advanced-vpa</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  targetRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;apps/v1&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Deployment&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;data-processor&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 推荐器配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  recommendation</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    containerRecommendations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">containerName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;processor&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 百分位推荐</span></span>
<span class="line"><span class="__shiki_17hn0y">      percentileRecommendations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">percentile</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">50</span><span class="__shiki_21nrsd">   # 中位数</span></span>
<span class="line"><span class="__shiki_17hn0y">        target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;400m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;800Mi&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">percentile</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">95</span><span class="__shiki_21nrsd">   # P95</span></span>
<span class="line"><span class="__shiki_17hn0y">        target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;800m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1.5Gi&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">percentile</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">99</span><span class="__shiki_21nrsd">   # P99</span></span>
<span class="line"><span class="__shiki_17hn0y">        target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1.2&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2Gi&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 安全边界</span></span>
<span class="line"><span class="__shiki_17hn0y">      safetyMarginFraction</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0.15</span><span class="__shiki_21nrsd">   # 增加15%安全边界</span></span>
<span class="line"><span class="__shiki_17hn0y">        memory</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0.25</span><span class="__shiki_21nrsd"> # 增加25%安全边界</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 置信区间</span></span>
<span class="line"><span class="__shiki_17hn0y">      confidenceMultiplier</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1.2</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 历史数据窗口</span></span>
<span class="line"><span class="__shiki_17hn0y">      historicalDataWindow</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;168h&quot;</span><span class="__shiki_21nrsd">  # 7天</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 资源建议优先级</span></span>
<span class="line"><span class="__shiki_17hn0y">      resourcePriority</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">memory</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">cpu</span></span></code></pre></div><h3 id="_3-4-vpa监控与维护" tabindex="-1">3.4 VPA监控与维护 <a class="header-anchor" href="#_3-4-vpa监控与维护" aria-label="Permalink to &quot;3.4 VPA监控与维护&quot;">​</a></h3><h4 id="_3-4-1-vpa状态检查" tabindex="-1">3.4.1 VPA状态检查 <a class="header-anchor" href="#_3-4-1-vpa状态检查" aria-label="Permalink to &quot;3.4.1 VPA状态检查&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 查看VPA状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> vpa</span><span class="__shiki_mdbnqw"> recommendation-engine-vpa</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 输出示例：</span></span>
<span class="line"><span class="__shiki_21nrsd"># Name:         recommendation-engine-vpa</span></span>
<span class="line"><span class="__shiki_21nrsd"># Namespace:    production</span></span>
<span class="line"><span class="__shiki_21nrsd"># Labels:       app=recommendation-engine</span></span>
<span class="line"><span class="__shiki_21nrsd"># Annotations:  &lt;none&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd"># API Version:  autoscaling.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_21nrsd"># Kind:         VerticalPodAutoscaler</span></span>
<span class="line"><span class="__shiki_21nrsd"># Metadata:</span></span>
<span class="line"><span class="__shiki_21nrsd">#   Creation Timestamp:  2024-01-26T10:00:00Z</span></span>
<span class="line"><span class="__shiki_21nrsd"># Spec:</span></span>
<span class="line"><span class="__shiki_21nrsd">#   Target Ref:</span></span>
<span class="line"><span class="__shiki_21nrsd">#     API Version:  apps/v1</span></span>
<span class="line"><span class="__shiki_21nrsd">#     Kind:         Deployment</span></span>
<span class="line"><span class="__shiki_21nrsd">#     Name:         recommendation-engine</span></span>
<span class="line"><span class="__shiki_21nrsd">#   Update Policy:</span></span>
<span class="line"><span class="__shiki_21nrsd">#     Update Mode:  Auto</span></span>
<span class="line"><span class="__shiki_21nrsd"># Status:</span></span>
<span class="line"><span class="__shiki_21nrsd">#   Conditions:</span></span>
<span class="line"><span class="__shiki_21nrsd">#     Last Transition Time:  2024-01-26T10:05:00Z</span></span>
<span class="line"><span class="__shiki_21nrsd">#     Status:                True</span></span>
<span class="line"><span class="__shiki_21nrsd">#     Type:                  RecommendationProvided</span></span>
<span class="line"><span class="__shiki_21nrsd">#     Last Transition Time:  2024-01-26T10:05:00Z</span></span>
<span class="line"><span class="__shiki_21nrsd">#     Status:                True</span></span>
<span class="line"><span class="__shiki_21nrsd">#     Type:                  LowConfidence</span></span>
<span class="line"><span class="__shiki_21nrsd">#   Recommendation:</span></span>
<span class="line"><span class="__shiki_21nrsd">#     Container Recommendations:</span></span>
<span class="line"><span class="__shiki_21nrsd">#       Container Name:  app</span></span>
<span class="line"><span class="__shiki_21nrsd">#       Lower Bound:</span></span>
<span class="line"><span class="__shiki_21nrsd">#         Cpu:     300m</span></span>
<span class="line"><span class="__shiki_21nrsd">#         Memory:  512Mi</span></span>
<span class="line"><span class="__shiki_21nrsd">#       Target:</span></span>
<span class="line"><span class="__shiki_21nrsd">#         Cpu:     500m</span></span>
<span class="line"><span class="__shiki_21nrsd">#         Memory:  1Gi</span></span>
<span class="line"><span class="__shiki_21nrsd">#       Uncapped Target:</span></span>
<span class="line"><span class="__shiki_21nrsd">#         Cpu:     450m</span></span>
<span class="line"><span class="__shiki_21nrsd">#         Memory:  900Mi</span></span>
<span class="line"><span class="__shiki_21nrsd">#       Upper Bound:</span></span>
<span class="line"><span class="__shiki_21nrsd">#         Cpu:     800m</span></span>
<span class="line"><span class="__shiki_21nrsd">#         Memory:  2Gi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看VPA推荐历史</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> vpa</span><span class="__shiki_mdbnqw"> recommendation-engine-vpa</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.status.recommendationHistory}&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> jq</span><span class="__shiki_mdbnqw"> .</span></span></code></pre></div><h4 id="_3-4-2-vpa资源使用分析" tabindex="-1">3.4.2 VPA资源使用分析 <a class="header-anchor" href="#_3-4-2-vpa资源使用分析" aria-label="Permalink to &quot;3.4.2 VPA资源使用分析&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 分析VPA推荐效果</span></span>
<span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_1t8gfj">analyze_vpa_performance</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> DEPLOYMENT</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33">$1</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> NAMESPACE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33">\${2</span><span class="__shiki_1itgoe">:-</span><span class="__shiki_140thh">default</span><span class="__shiki_1jdh33">}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;=== VPA性能分析: </span><span class="__shiki_140thh">$DEPLOYMENT</span><span class="__shiki_mdbnqw"> ===&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 1. 获取当前资源设置</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n1. 当前资源设置:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">get</span><span class="__shiki_mdbnqw"> deploy</span><span class="__shiki_140thh"> $DEPLOYMENT </span><span class="__shiki_dzsirb">-o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.spec.template.spec.containers[*].resources}&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> jq</span><span class="__shiki_mdbnqw"> .</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 2. 获取VPA推荐</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n2. VPA推荐值:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">get</span><span class="__shiki_mdbnqw"> vpa</span><span class="__shiki_140thh"> $DEPLOYMENT</span><span class="__shiki_mdbnqw">-vpa</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.status.recommendation}&#39;</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> jq</span><span class="__shiki_mdbnqw"> .</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> echo</span><span class="__shiki_mdbnqw"> &quot;未找到VPA配置&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 3. 检查实际资源使用</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n3. 实际资源使用:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">top</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_mdbnqw"> app=</span><span class="__shiki_140thh">$DEPLOYMENT</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 4. 检查Pod重启次数</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n4. Pod重启统计:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_mdbnqw"> app=</span><span class="__shiki_140thh">$DEPLOYMENT </span><span class="__shiki_dzsirb">-o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{range .items[*]}{.metadata.name}{&quot;\\t重启:&quot;}{.status.containerStatuses[*].restartCount}{&quot;\\n&quot;}{end}&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 5. 计算资源利用率</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n5. 资源利用率分析:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_mdbnqw"> app=</span><span class="__shiki_140thh">$DEPLOYMENT </span><span class="__shiki_dzsirb">-o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{range .items[*]}{.metadata.name}{&quot;\\t&quot;}{.spec.containers[*].resources.requests}{&quot;\\n&quot;}{end}&#39;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="四、cluster-autoscaler-ca" tabindex="-1">四、Cluster Autoscaler (CA) <a class="header-anchor" href="#四、cluster-autoscaler-ca" aria-label="Permalink to &quot;四、Cluster Autoscaler (CA)&quot;">​</a></h2><h3 id="_4-1-ca架构原理" tabindex="-1">4.1 CA架构原理 <a class="header-anchor" href="#_4-1-ca架构原理" aria-label="Permalink to &quot;4.1 CA架构原理&quot;">​</a></h3><h4 id="_4-1-1-ca核心组件" tabindex="-1">4.1.1 CA核心组件 <a class="header-anchor" href="#_4-1-1-ca核心组件" aria-label="Permalink to &quot;4.1.1 CA核心组件&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│           Cluster Autoscaler                    │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 1. 监控不可调度Pod                              │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 2. 计算所需节点资源                             │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 3. 调用云提供商API扩展节点组                    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 4. 监控节点利用率                               │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 5. 安全缩容空节点                               │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">        ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│           云提供商API                           │</span></span>
<span class="line"><span class="__shiki_wvjl67">│           AWS Auto Scaling Groups               │</span></span>
<span class="line"><span class="__shiki_wvjl67">│           GCP Managed Instance Groups           │</span></span>
<span class="line"><span class="__shiki_wvjl67">│           Azure VM Scale Sets                   │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────┘</span></span></code></pre></div><h4 id="_4-1-2-ca扩缩容条件" tabindex="-1">4.1.2 CA扩缩容条件 <a class="header-anchor" href="#_4-1-2-ca扩缩容条件" aria-label="Permalink to &quot;4.1.2 CA扩缩容条件&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 扩容条件：</span></span>
<span class="line"><span class="__shiki_21nrsd">// 1. 存在因资源不足而Pending的Pod</span></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 集群资源不足</span></span>
<span class="line"><span class="__shiki_21nrsd">// 3. 节点组未达到最大值</span></span>
<span class="line"><span class="__shiki_21nrsd">// 4. 扩缩容操作在冷却期内</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 缩容条件：</span></span>
<span class="line"><span class="__shiki_21nrsd">// 1. 节点利用率低于阈值</span></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 节点上的Pod可重新调度</span></span>
<span class="line"><span class="__shiki_21nrsd">// 3. 节点组未达到最小值</span></span>
<span class="line"><span class="__shiki_21nrsd">// 4. 满足所有PodDisruptionBudget</span></span></code></pre></div><h3 id="_4-2-ca配置详解" tabindex="-1">4.2 CA配置详解 <a class="header-anchor" href="#_4-2-ca配置详解" aria-label="Permalink to &quot;4.2 CA配置详解&quot;">​</a></h3><h4 id="_4-2-1-ca部署配置" tabindex="-1">4.2.1 CA部署配置 <a class="header-anchor" href="#_4-2-1-ca部署配置" aria-label="Permalink to &quot;4.2.1 CA部署配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Cluster Autoscaler Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cluster-autoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kube-system</span></span>
<span class="line"><span class="__shiki_17hn0y">  labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cluster-autoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    cluster-autoscaler.kubernetes.io/safe-to-evict</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;false&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cluster-autoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cluster-autoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">      annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        prometheus.io/scrape</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        prometheus.io/port</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;8085&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      serviceAccountName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cluster-autoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">      priorityClassName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">system-cluster-critical</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cluster-autoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">k8s.gcr.io/autoscaling/cluster-autoscaler:v1.24.0</span></span>
<span class="line"><span class="__shiki_17hn0y">        resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;300Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;600Mi&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 命令行参数</span></span>
<span class="line"><span class="__shiki_17hn0y">        command</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">./cluster-autoscaler</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">--v=4</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">--stderrthreshold=info</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">--cloud-provider=aws</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">--skip-nodes-with-local-storage=false</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">--expander=least-waste</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">--node-group-auto-discovery=asg:tag=k8s.io/cluster-autoscaler/enabled,k8s.io/cluster-autoscaler/&lt;cluster-name&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">--balance-similar-node-groups</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">--skip-nodes-with-system-pods=true</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">--scale-down-unneeded-time=10m</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">--scale-down-delay-after-add=10m</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">--scale-down-delay-after-delete=10m</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">--scale-down-delay-after-failure=3m</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">--scale-down-unready-time=20m</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">--scale-down-utilization-threshold=0.5</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">--max-node-provision-time=15m</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">--ok-total-unready-count=3</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">--max-total-unready-percentage=45</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">--new-pod-scale-up-delay=0s</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">--max-empty-bulk-delete=10</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">--ignore-daemonsets-utilization=true</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">--daemonset-eviction-for-empty-nodes=true</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">--daemonset-eviction-for-occupied-nodes=true</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 环境变量</span></span>
<span class="line"><span class="__shiki_17hn0y">        env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AWS_REGION</span></span>
<span class="line"><span class="__shiki_17hn0y">          value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">us-west-2</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">CLUSTER_NAME</span></span>
<span class="line"><span class="__shiki_17hn0y">          value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">my-cluster</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 安全上下文</span></span>
<span class="line"><span class="__shiki_17hn0y">        securityContext</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          capabilities</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            drop</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            - </span><span class="__shiki_mdbnqw">ALL</span></span>
<span class="line"><span class="__shiki_17hn0y">          readOnlyRootFilesystem</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">          runAsNonRoot</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">          runAsUser</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">65534</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 健康检查</span></span>
<span class="line"><span class="__shiki_17hn0y">        livenessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          httpGet</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/health-check</span></span>
<span class="line"><span class="__shiki_17hn0y">            port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8085</span></span>
<span class="line"><span class="__shiki_17hn0y">          initialDelaySeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span></span>
<span class="line"><span class="__shiki_17hn0y">          periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 就绪检查</span></span>
<span class="line"><span class="__shiki_17hn0y">        readinessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          httpGet</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/health-check</span></span>
<span class="line"><span class="__shiki_17hn0y">            port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8085</span></span>
<span class="line"><span class="__shiki_17hn0y">          initialDelaySeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span></span>
<span class="line"><span class="__shiki_17hn0y">          periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 端口</span></span>
<span class="line"><span class="__shiki_17hn0y">        ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">containerPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8085</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http</span></span>
<span class="line"><span class="__shiki_17hn0y">          protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 挂载点</span></span>
<span class="line"><span class="__shiki_17hn0y">        volumeMounts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ssl-certs</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/etc/ssl/certs/ca-certificates.crt</span></span>
<span class="line"><span class="__shiki_17hn0y">          readOnly</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">etc-ssl</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/etc/ssl/certs</span></span>
<span class="line"><span class="__shiki_17hn0y">          readOnly</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 卷</span></span>
<span class="line"><span class="__shiki_17hn0y">      volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ssl-certs</span></span>
<span class="line"><span class="__shiki_17hn0y">        hostPath</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/etc/ssl/certs/ca-bundle.crt</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">etc-ssl</span></span>
<span class="line"><span class="__shiki_17hn0y">        hostPath</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/etc/ssl/certs</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 节点亲和性</span></span>
<span class="line"><span class="__shiki_17hn0y">      affinity</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        nodeAffinity</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          requiredDuringSchedulingIgnoredDuringExecution</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            nodeSelectorTerms</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            - </span><span class="__shiki_17hn0y">matchExpressions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">              - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">node-role.kubernetes.io/master</span></span>
<span class="line"><span class="__shiki_17hn0y">                operator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Exists</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 容忍度</span></span>
<span class="line"><span class="__shiki_17hn0y">      tolerations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">node-role.kubernetes.io/master</span></span>
<span class="line"><span class="__shiki_17hn0y">        effect</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NoSchedule</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;CriticalAddonsOnly&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        operator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Exists&quot;</span></span></code></pre></div><h4 id="_4-2-2-ca扩展器策略" tabindex="-1">4.2.2 CA扩展器策略 <a class="header-anchor" href="#_4-2-2-ca扩展器策略" aria-label="Permalink to &quot;4.2.2 CA扩展器策略&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 扩展器类型配置</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. random - 随机选择</span></span>
<span class="line"><span class="__shiki_21nrsd"># 2. most-pods - 选择能调度最多Pending Pod的节点组</span></span>
<span class="line"><span class="__shiki_21nrsd"># 3. least-waste - 选择浪费资源最少的节点组（默认）</span></span>
<span class="line"><span class="__shiki_21nrsd"># 4. price - 选择最便宜的节点组（需要云提供商支持）</span></span>
<span class="line"><span class="__shiki_21nrsd"># 5. priority - 基于优先级选择</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用priority扩展器示例</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">scheduling.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PriorityClass</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">high-priority</span></span>
<span class="line"><span class="__shiki_17hn0y">value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1000000</span></span>
<span class="line"><span class="__shiki_17hn0y">globalDefault</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;用于高优先级工作负载&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cluster-autoscaler-priority-expander</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kube-system</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  priorities</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|-</span></span>
<span class="line"><span class="__shiki_mdbnqw">    10:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - .*-high-priority.*</span></span>
<span class="line"><span class="__shiki_mdbnqw">    50:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - .*-spot.*</span></span>
<span class="line"><span class="__shiki_mdbnqw">    100:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - .*</span></span></code></pre></div><h3 id="_4-3-ca高级配置" tabindex="-1">4.3 CA高级配置 <a class="header-anchor" href="#_4-3-ca高级配置" aria-label="Permalink to &quot;4.3 CA高级配置&quot;">​</a></h3><h4 id="_4-3-1-多节点组配置" tabindex="-1">4.3.1 多节点组配置 <a class="header-anchor" href="#_4-3-1-多节点组配置" aria-label="Permalink to &quot;4.3.1 多节点组配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 节点组配置示例</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">eksctl.io/v1alpha5</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ClusterConfig</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">my-cluster</span></span>
<span class="line"><span class="__shiki_17hn0y">  region</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">us-west-2</span></span>
<span class="line"><span class="__shiki_17hn0y">nodeGroups</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 常规节点组</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ng-general</span></span>
<span class="line"><span class="__shiki_17hn0y">    instanceType</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">m5.large</span></span>
<span class="line"><span class="__shiki_17hn0y">    minSize</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">    maxSize</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_17hn0y">    desiredCapacity</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">    labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      node-type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">general</span></span>
<span class="line"><span class="__shiki_17hn0y">      autoscaling-group</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ng-general</span></span>
<span class="line"><span class="__shiki_17hn0y">    taints</span><span class="__shiki_140thh">: []</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 自动扩缩标签</span></span>
<span class="line"><span class="__shiki_17hn0y">    tags</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      k8s.io/cluster-autoscaler/enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      k8s.io/cluster-autoscaler/my-cluster</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;owned&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # IAM策略</span></span>
<span class="line"><span class="__shiki_17hn0y">    iam</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      withAddonPolicies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        autoScaler</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # Spot节点组</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ng-spot</span></span>
<span class="line"><span class="__shiki_17hn0y">    instanceType</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">m5.large</span></span>
<span class="line"><span class="__shiki_17hn0y">    minSize</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_17hn0y">    maxSize</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">20</span></span>
<span class="line"><span class="__shiki_17hn0y">    desiredCapacity</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_17hn0y">    spot</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      node-type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">spot</span></span>
<span class="line"><span class="__shiki_17hn0y">      autoscaling-group</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ng-spot</span></span>
<span class="line"><span class="__shiki_17hn0y">    taints</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">spot</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        effect</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NoSchedule</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 自动扩缩配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    tags</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      k8s.io/cluster-autoscaler/enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      k8s.io/cluster-autoscaler/my-cluster</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;owned&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 资源预留</span></span>
<span class="line"><span class="__shiki_17hn0y">    kubeletExtraConfig</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      kubeReserved</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;70m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;150Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      systemReserved</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;70m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;150Mi&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # GPU节点组</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ng-gpu</span></span>
<span class="line"><span class="__shiki_17hn0y">    instanceType</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">p3.2xlarge</span></span>
<span class="line"><span class="__shiki_17hn0y">    minSize</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_17hn0y">    maxSize</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_17hn0y">    desiredCapacity</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_17hn0y">    labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      node-type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gpu</span></span>
<span class="line"><span class="__shiki_17hn0y">      accelerator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nvidia-tesla-v100</span></span>
<span class="line"><span class="__shiki_17hn0y">      autoscaling-group</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ng-gpu</span></span>
<span class="line"><span class="__shiki_17hn0y">    taints</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nvidia.com/gpu</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;present&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        effect</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NoSchedule</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # GPU相关配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    preBootstrapCommands</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;nvidia-persistenced --user root&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 自动扩缩</span></span>
<span class="line"><span class="__shiki_17hn0y">    tags</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      k8s.io/cluster-autoscaler/enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      k8s.io/cluster-autoscaler/my-cluster</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;owned&quot;</span></span></code></pre></div><h4 id="_4-3-2-ca与pod调度协同" tabindex="-1">4.3.2 CA与Pod调度协同 <a class="header-anchor" href="#_4-3-2-ca与pod调度协同" aria-label="Permalink to &quot;4.3.2 CA与Pod调度协同&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Pod调度配置示例</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gpu-workload</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gpu-inference</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gpu-inference</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 节点选择器</span></span>
<span class="line"><span class="__shiki_17hn0y">      nodeSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        accelerator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nvidia-tesla-v100</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 容忍度</span></span>
<span class="line"><span class="__shiki_17hn0y">      tolerations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;nvidia.com/gpu&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        operator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Exists&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        effect</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;NoSchedule&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 亲和性</span></span>
<span class="line"><span class="__shiki_17hn0y">      affinity</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        nodeAffinity</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          requiredDuringSchedulingIgnoredDuringExecution</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            nodeSelectorTerms</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            - </span><span class="__shiki_17hn0y">matchExpressions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">              - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">node-type</span></span>
<span class="line"><span class="__shiki_17hn0y">                operator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">In</span></span>
<span class="line"><span class="__shiki_17hn0y">                values</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                - </span><span class="__shiki_mdbnqw">gpu</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 拓扑约束</span></span>
<span class="line"><span class="__shiki_17hn0y">      topologySpreadConstraints</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">maxSkew</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">        topologyKey</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kubernetes.io/hostname</span></span>
<span class="line"><span class="__shiki_17hn0y">        whenUnsatisfiable</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">DoNotSchedule</span></span>
<span class="line"><span class="__shiki_17hn0y">        labelSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gpu-inference</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">inference</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">tensorflow-serving:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">        resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;4Gi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            nvidia.com/gpu</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">          limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;8Gi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            nvidia.com/gpu</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 优先级</span></span>
<span class="line"><span class="__shiki_17hn0y">        priorityClassName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">high-priority</span></span></code></pre></div><h3 id="_4-4-ca监控与维护" tabindex="-1">4.4 CA监控与维护 <a class="header-anchor" href="#_4-4-ca监控与维护" aria-label="Permalink to &quot;4.4 CA监控与维护&quot;">​</a></h3><h4 id="_4-4-1-ca状态检查" tabindex="-1">4.4.1 CA状态检查 <a class="header-anchor" href="#_4-4-1-ca状态检查" aria-label="Permalink to &quot;4.4.1 CA状态检查&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 查看CA日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> kube-system</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_mdbnqw"> deployment/cluster-autoscaler</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看CA事件</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> events</span><span class="__shiki_dzsirb"> --field-selector</span><span class="__shiki_mdbnqw"> source=cluster-autoscaler</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看不可调度Pod</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> --all-namespaces</span><span class="__shiki_dzsirb"> --field-selector</span><span class="__shiki_mdbnqw"> status.phase=Pending</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> wide</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看节点组状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> nodes</span><span class="__shiki_dzsirb"> --show-labels</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -E</span><span class="__shiki_mdbnqw"> &quot;(node-type|autoscaling-group)&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># CA诊断命令</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> kube-system</span><span class="__shiki_mdbnqw"> exec</span><span class="__shiki_mdbnqw"> deployment/cluster-autoscaler</span><span class="__shiki_dzsirb"> --</span><span class="__shiki_mdbnqw"> ./cluster-autoscaler</span><span class="__shiki_dzsirb"> --help</span></span></code></pre></div><h4 id="_4-4-2-ca性能监控" tabindex="-1">4.4.2 CA性能监控 <a class="header-anchor" href="#_4-4-2-ca性能监控" aria-label="Permalink to &quot;4.4.2 CA性能监控&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Prometheus监控规则</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">monitoring.coreos.com/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PrometheusRule</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cluster-autoscaler-rules</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">monitoring</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  groups</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cluster-autoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">    rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # CA健康状态</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ClusterAutoscalerDown</span></span>
<span class="line"><span class="__shiki_17hn0y">      expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">up{job=&quot;cluster-autoscaler&quot;} == 0</span></span>
<span class="line"><span class="__shiki_17hn0y">      for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">critical</span></span>
<span class="line"><span class="__shiki_17hn0y">      annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Cluster Autoscaler is down&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Cluster Autoscaler has been down for more than 5 minutes&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 扩容事件</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">record</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cluster_autoscaler_scaled_up_nodes_total</span></span>
<span class="line"><span class="__shiki_17hn0y">      expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">sum(increase(cluster_autoscaler_scaled_up_nodes_total[1h]))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 缩容事件  </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">record</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cluster_autoscaler_scaled_down_nodes_total</span></span>
<span class="line"><span class="__shiki_17hn0y">      expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">sum(increase(cluster_autoscaler_scaled_down_nodes_total[1h]))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 不可调度Pod</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">UnschedulablePods</span></span>
<span class="line"><span class="__shiki_17hn0y">      expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">sum(kube_pod_status_phase{phase=&quot;Pending&quot;}) by (namespace) &gt; 0</span></span>
<span class="line"><span class="__shiki_17hn0y">      for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">warning</span></span>
<span class="line"><span class="__shiki_17hn0y">      annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Pods are pending&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{ $value }} pods are pending in namespace {{ $labels.namespace }}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 节点利用率</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">record</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">node_memory_utilization</span></span>
<span class="line"><span class="__shiki_17hn0y">      expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">record</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">node_cpu_utilization</span></span>
<span class="line"><span class="__shiki_17hn0y">      expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">(1 - avg(rate(node_cpu_seconds_total{mode=&quot;idle&quot;}[5m])) by (instance)) * 100</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # CA决策延迟</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">record</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cluster_autoscaler_loop_duration_seconds</span></span>
<span class="line"><span class="__shiki_17hn0y">      expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">histogram_quantile(0.95, rate(cluster_autoscaler_loop_duration_seconds_bucket[5m]))</span></span></code></pre></div><h2 id="五、自定义指标自动扩缩" tabindex="-1">五、自定义指标自动扩缩 <a class="header-anchor" href="#五、自定义指标自动扩缩" aria-label="Permalink to &quot;五、自定义指标自动扩缩&quot;">​</a></h2><h3 id="_5-1-prometheus-adapter配置" tabindex="-1">5.1 Prometheus Adapter配置 <a class="header-anchor" href="#_5-1-prometheus-adapter配置" aria-label="Permalink to &quot;5.1 Prometheus Adapter配置&quot;">​</a></h3><h4 id="_5-1-1-安装与配置" tabindex="-1">5.1.1 安装与配置 <a class="header-anchor" href="#_5-1-1-安装与配置" aria-label="Permalink to &quot;5.1.1 安装与配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Prometheus Adapter ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">prometheus-adapter-config</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">monitoring</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  config.yaml</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">    # Adapter配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">    rules:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      # 默认规则</span></span>
<span class="line"><span class="__shiki_mdbnqw">      default: false</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_mdbnqw">      # 自定义规则</span></span>
<span class="line"><span class="__shiki_mdbnqw">      custom:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      # 1. 基于HTTP请求率的指标</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - seriesQuery: &#39;http_requests_total{namespace!=&quot;&quot;,pod!=&quot;&quot;}&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        resources:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          overrides:</span></span>
<span class="line"><span class="__shiki_mdbnqw">            namespace: {resource: &quot;namespace&quot;}</span></span>
<span class="line"><span class="__shiki_mdbnqw">            pod: {resource: &quot;pod&quot;}</span></span>
<span class="line"><span class="__shiki_mdbnqw">        name:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          matches: &quot;^(.*)_total$&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          as: &quot;\${1}_per_second&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        metricsQuery: &#39;sum(rate(&lt;&lt;.Series&gt;&gt;{&lt;&lt;.LabelMatchers&gt;&gt;}[2m])) by (&lt;&lt;.GroupBy&gt;&gt;)&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_mdbnqw">      # 2. 基于响应时间的指标</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - seriesQuery: &#39;http_request_duration_seconds_bucket{namespace!=&quot;&quot;,pod!=&quot;&quot;}&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        resources:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          overrides:</span></span>
<span class="line"><span class="__shiki_mdbnqw">            namespace: {resource: &quot;namespace&quot;}</span></span>
<span class="line"><span class="__shiki_mdbnqw">            pod: {resource: &quot;pod&quot;}</span></span>
<span class="line"><span class="__shiki_mdbnqw">        name:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          matches: &quot;^(.*)_bucket$&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          as: &quot;\${1}_p99&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        metricsQuery: &gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          histogram_quantile(0.99,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            sum(rate(&lt;&lt;.Series&gt;&gt;{&lt;&lt;.LabelMatchers&gt;&gt;}[5m])) by (le,&lt;&lt;.GroupBy&gt;&gt;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">          )</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_mdbnqw">      # 3. 基于活跃连接数的指标</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - seriesQuery: &#39;nginx_ingress_controller_connections{namespace!=&quot;&quot;,pod!=&quot;&quot;}&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        resources:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          template: &lt;&lt;.Resource&gt;&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        name:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          as: &quot;nginx_active_connections&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        metricsQuery: &#39;&lt;&lt;.Series&gt;&gt;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_mdbnqw">      # 4. 基于队列长度的指标</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - seriesQuery: &#39;rabbitmq_queue_messages{namespace!=&quot;&quot;,pod!=&quot;&quot;}&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        resources:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          overrides:</span></span>
<span class="line"><span class="__shiki_mdbnqw">            namespace: {resource: &quot;namespace&quot;}</span></span>
<span class="line"><span class="__shiki_mdbnqw">            pod: {resource: &quot;pod&quot;}</span></span>
<span class="line"><span class="__shiki_mdbnqw">        name:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          as: &quot;rabbitmq_queue_size&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        metricsQuery: &#39;&lt;&lt;.Series&gt;&gt;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_mdbnqw">      # 5. 基于数据库连接数的指标</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - seriesQuery: &#39;pg_stat_database_numbackends{namespace!=&quot;&quot;,pod!=&quot;&quot;}&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        resources:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          overrides:</span></span>
<span class="line"><span class="__shiki_mdbnqw">            namespace: {resource: &quot;namespace&quot;}</span></span>
<span class="line"><span class="__shiki_mdbnqw">            pod: {resource: &quot;pod&quot;}</span></span>
<span class="line"><span class="__shiki_mdbnqw">        name:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          as: &quot;postgres_active_connections&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        metricsQuery: &#39;&lt;&lt;.Series&gt;&gt;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    # 外部规则</span></span>
<span class="line"><span class="__shiki_mdbnqw">    externalRules:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    - seriesQuery: &#39;{__name__=~&quot;^container_.*&quot;,container!=&quot;POD&quot;,namespace!=&quot;&quot;,pod!=&quot;&quot;}&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      resources:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        overrides:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          namespace: {resource: &quot;namespace&quot;}</span></span>
<span class="line"><span class="__shiki_mdbnqw">          pod: {resource: &quot;pod&quot;}</span></span>
<span class="line"><span class="__shiki_mdbnqw">      name:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        matches: &quot;^container_(.*)&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        as: &quot;container_\${1}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      metricsQuery: &#39;&lt;&lt;.Series&gt;&gt;{&lt;&lt;.LabelMatchers&gt;&gt;,container!=&quot;POD&quot;}&#39;</span></span></code></pre></div><h4 id="_5-1-2-自定义hpa配置" tabindex="-1">5.1.2 自定义HPA配置 <a class="header-anchor" href="#_5-1-2-自定义hpa配置" aria-label="Permalink to &quot;5.1.2 自定义HPA配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling/v2</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HorizontalPodAutoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">custom-metric-hpa</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  scaleTargetRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">api-service</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  minReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">  maxReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">20</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 自定义指标</span></span>
<span class="line"><span class="__shiki_17hn0y">  metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 1. QPS指标</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pods</span></span>
<span class="line"><span class="__shiki_17hn0y">    pods</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      metric</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http_requests_per_second</span></span>
<span class="line"><span class="__shiki_17hn0y">        selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/api&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            method</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;POST&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AverageValue</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageValue</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_21nrsd">  # 目标100 QPS</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 2. 响应时间指标</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pods</span></span>
<span class="line"><span class="__shiki_17hn0y">    pods</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      metric</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http_request_duration_seconds_p99</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AverageValue</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageValue</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;0.2&quot;</span><span class="__shiki_21nrsd">  # 目标P99 &lt; 200ms</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 3. 错误率指标</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pods</span></span>
<span class="line"><span class="__shiki_17hn0y">    pods</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      metric</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http_5xx_errors_per_second</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AverageValue</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageValue</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;0.1&quot;</span><span class="__shiki_21nrsd">  # 目标&lt;0.1个错误/秒</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 4. 业务指标 - 订单处理率</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">External</span></span>
<span class="line"><span class="__shiki_17hn0y">    external</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      metric</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">orders_processed_per_minute</span></span>
<span class="line"><span class="__shiki_17hn0y">        selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            service</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;order-processor&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AverageValue</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageValue</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;50&quot;</span><span class="__shiki_21nrsd">  # 目标50订单/分钟</span></span></code></pre></div><h3 id="_5-2-keda自动扩缩" tabindex="-1">5.2 KEDA自动扩缩 <a class="header-anchor" href="#_5-2-keda自动扩缩" aria-label="Permalink to &quot;5.2 KEDA自动扩缩&quot;">​</a></h3><h4 id="_5-2-1-keda部署与配置" tabindex="-1">5.2.1 KEDA部署与配置 <a class="header-anchor" href="#_5-2-1-keda部署与配置" aria-label="Permalink to &quot;5.2.1 KEDA部署与配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># KEDA部署</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">keda-operator</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">keda</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">keda-operator</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">keda-operator</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      serviceAccountName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">keda-operator</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">keda-operator</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ghcr.io/kedacore/keda:2.9.0</span></span>
<span class="line"><span class="__shiki_17hn0y">        imagePullPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Always</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 配置</span></span>
<span class="line"><span class="__shiki_17hn0y">        env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">WATCH_NAMESPACE</span></span>
<span class="line"><span class="__shiki_17hn0y">          value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_21nrsd">  # 所有命名空间</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">LOG_LEVEL</span></span>
<span class="line"><span class="__shiki_17hn0y">          value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;info&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">KEDA_HTTP_DEFAULT_TIMEOUT</span></span>
<span class="line"><span class="__shiki_17hn0y">          value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;3000&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 资源</span></span>
<span class="line"><span class="__shiki_17hn0y">        resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100Mi&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 健康检查</span></span>
<span class="line"><span class="__shiki_17hn0y">        livenessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          httpGet</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/healthz</span></span>
<span class="line"><span class="__shiki_17hn0y">            port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_17hn0y">        readinessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          httpGet</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/readyz</span></span>
<span class="line"><span class="__shiki_17hn0y">            port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span></code></pre></div><h4 id="_5-2-2-keda扩缩对象" tabindex="-1">5.2.2 KEDA扩缩对象 <a class="header-anchor" href="#_5-2-2-keda扩缩对象" aria-label="Permalink to &quot;5.2.2 KEDA扩缩对象&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># KEDA ScaledObject</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">keda.sh/v1alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ScaledObject</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kafka-scaledobject</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 目标工作负载</span></span>
<span class="line"><span class="__shiki_17hn0y">  scaleTargetRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kafka-consumer</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 最小/最大副本数</span></span>
<span class="line"><span class="__shiki_17hn0y">  minReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_21nrsd">  # KEDA支持缩容到0</span></span>
<span class="line"><span class="__shiki_17hn0y">  maxReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 冷却时间</span></span>
<span class="line"><span class="__shiki_17hn0y">  cooldownPeriod</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">300</span><span class="__shiki_21nrsd">  # 5分钟</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 轮询间隔</span></span>
<span class="line"><span class="__shiki_17hn0y">  pollingInterval</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_21nrsd">  # 30秒</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 触发指标</span></span>
<span class="line"><span class="__shiki_17hn0y">  triggers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 1. Kafka触发器</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kafka</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      bootstrapServers</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kafka-broker:9092</span></span>
<span class="line"><span class="__shiki_17hn0y">      consumerGroup</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">order-consumer</span></span>
<span class="line"><span class="__shiki_17hn0y">      topic</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">orders</span></span>
<span class="line"><span class="__shiki_17hn0y">      lagThreshold</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;50&quot;</span><span class="__shiki_21nrsd">  # 目标延迟消息数</span></span>
<span class="line"><span class="__shiki_17hn0y">      offsetResetPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">latest</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 2. Prometheus触发器</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">prometheus</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      serverAddress</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http://prometheus:9090</span></span>
<span class="line"><span class="__shiki_17hn0y">      query</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">sum(rate(http_requests_total{app=&quot;api-service&quot;}[2m]))</span></span>
<span class="line"><span class="__shiki_17hn0y">      threshold</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 3. Redis触发器</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      address</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis-service:6379</span></span>
<span class="line"><span class="__shiki_17hn0y">      passwordFromEnv</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">REDIS_PASSWORD</span></span>
<span class="line"><span class="__shiki_17hn0y">      listName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">tasks</span></span>
<span class="line"><span class="__shiki_17hn0y">      listLength</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 4. MySQL触发器</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">mysql</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      connectionStringFromEnv</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">MYSQL_CONNECTION_STRING</span></span>
<span class="line"><span class="__shiki_17hn0y">      query</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;SELECT COUNT(*) FROM pending_tasks&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      queryValue</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;50&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 5. AWS SQS触发器</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">aws-sqs</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      queueURL</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">https://sqs.us-east-1.amazonaws.com/account/queue</span></span>
<span class="line"><span class="__shiki_17hn0y">      queueLength</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      awsRegion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">us-east-1</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 高级配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  advanced</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 水平Pod自动扩缩器配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    horizontalPodAutoscalerConfig</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      behavior</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        scaleDown</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          stabilizationWindowSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">300</span></span>
<span class="line"><span class="__shiki_17hn0y">          policies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Percent</span></span>
<span class="line"><span class="__shiki_17hn0y">            value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">50</span></span>
<span class="line"><span class="__shiki_17hn0y">            periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 恢复配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    restoreToOriginalReplicaCount</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 扩缩策略</span></span>
<span class="line"><span class="__shiki_17hn0y">    scalingStrategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      strategy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;custom&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      customScalingQueueLengthDeduction</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">      customScalingMultiple</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span></code></pre></div><h4 id="_5-2-3-keda多触发器示例" tabindex="-1">5.2.3 KEDA多触发器示例 <a class="header-anchor" href="#_5-2-3-keda多触发器示例" aria-label="Permalink to &quot;5.2.3 KEDA多触发器示例&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">keda.sh/v1alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ScaledObject</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">multi-trigger-scaledobject</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  scaleTargetRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">image-processor</span></span>
<span class="line"><span class="__shiki_17hn0y">  minReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_17hn0y">  maxReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">20</span></span>
<span class="line"><span class="__shiki_17hn0y">  pollingInterval</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span></span>
<span class="line"><span class="__shiki_17hn0y">  cooldownPeriod</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">300</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  triggers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 触发器1：基于消息队列</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rabbitmq</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">amqp://guest:guest@rabbitmq:5672/</span></span>
<span class="line"><span class="__shiki_17hn0y">      queueName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">image-queue</span></span>
<span class="line"><span class="__shiki_17hn0y">      queueLength</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">QueueLength</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 触发器2：基于CPU使用率</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cpu</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Utilization</span></span>
<span class="line"><span class="__shiki_17hn0y">      value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;70&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 触发器3：基于自定义指标</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">prometheus</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      serverAddress</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http://prometheus:9090</span></span>
<span class="line"><span class="__shiki_17hn0y">      query</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">sum(rate(image_processing_duration_seconds_sum[5m])) / sum(rate(image_processing_duration_seconds_count[5m]))</span></span>
<span class="line"><span class="__shiki_17hn0y">      threshold</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;5.0&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 触发器选择策略</span></span>
<span class="line"><span class="__shiki_17hn0y">  triggerAuthenticationRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">keda-trigger-auth</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 高级行为配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  advanced</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    horizontalPodAutoscalerConfig</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      behavior</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        scaleUp</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          stabilizationWindowSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_17hn0y">          policies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pods</span></span>
<span class="line"><span class="__shiki_17hn0y">            value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">            periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span></span>
<span class="line"><span class="__shiki_17hn0y">        scaleDown</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          stabilizationWindowSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">300</span></span>
<span class="line"><span class="__shiki_17hn0y">          policies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pods</span></span>
<span class="line"><span class="__shiki_17hn0y">            value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">            periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span></span></code></pre></div><h2 id="六、混合扩缩策略与最佳实践" tabindex="-1">六、混合扩缩策略与最佳实践 <a class="header-anchor" href="#六、混合扩缩策略与最佳实践" aria-label="Permalink to &quot;六、混合扩缩策略与最佳实践&quot;">​</a></h2><h3 id="_6-1-hpa-vpa-ca协同策略" tabindex="-1">6.1 HPA + VPA + CA协同策略 <a class="header-anchor" href="#_6-1-hpa-vpa-ca协同策略" aria-label="Permalink to &quot;6.1 HPA + VPA + CA协同策略&quot;">​</a></h3><h4 id="_6-1-1-综合扩缩策略" tabindex="-1">6.1.1 综合扩缩策略 <a class="header-anchor" href="#_6-1-1-综合扩缩策略" aria-label="Permalink to &quot;6.1.1 综合扩缩策略&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 应用部署配置</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production-app</span></span>
<span class="line"><span class="__shiki_17hn0y">  labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production-app</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">  strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">RollingUpdate</span></span>
<span class="line"><span class="__shiki_17hn0y">    rollingUpdate</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      maxSurge</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">      maxUnavailable</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production-app</span></span>
<span class="line"><span class="__shiki_17hn0y">      annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 用于VPA</span></span>
<span class="line"><span class="__shiki_17hn0y">        vpa.autoscaling.kubernetes.io/min-allowed</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;cpu=100m,memory=256Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        vpa.autoscaling.kubernetes.io/max-allowed</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;cpu=2,memory=4Gi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 优先级</span></span>
<span class="line"><span class="__shiki_17hn0y">      priorityClassName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">high-priority</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 节点选择</span></span>
<span class="line"><span class="__shiki_17hn0y">      nodeSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        node-type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">general</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 容忍度</span></span>
<span class="line"><span class="__shiki_17hn0y">      tolerations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;spot&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        operator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Equal&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        effect</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;NoSchedule&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 拓扑约束</span></span>
<span class="line"><span class="__shiki_17hn0y">      topologySpreadConstraints</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">maxSkew</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">        topologyKey</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">topology.kubernetes.io/zone</span></span>
<span class="line"><span class="__shiki_17hn0y">        whenUnsatisfiable</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ScheduleAnyway</span></span>
<span class="line"><span class="__shiki_17hn0y">        labelSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production-app</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production-app:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">        resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;200m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;512Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2Gi&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 探针配置</span></span>
<span class="line"><span class="__shiki_17hn0y">        livenessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          httpGet</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/healthz</span></span>
<span class="line"><span class="__shiki_17hn0y">            port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_17hn0y">          initialDelaySeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span></span>
<span class="line"><span class="__shiki_17hn0y">          periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_17hn0y">        readinessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          httpGet</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/readyz</span></span>
<span class="line"><span class="__shiki_17hn0y">            port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_17hn0y">          initialDelaySeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_17hn0y">          periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 生命周期</span></span>
<span class="line"><span class="__shiki_17hn0y">        lifecycle</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          preStop</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            exec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">              command</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;/bin/sh&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;-c&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;sleep 10&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. VPA配置</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">VerticalPodAutoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production-app-vpa</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  targetRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production-app</span></span>
<span class="line"><span class="__shiki_17hn0y">  updatePolicy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    updateMode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Auto&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    minReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">  resourcePolicy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    containerPolicies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">containerName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;*&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      controlledResources</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;cpu&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;memory&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">      minAllowed</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;256Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      maxAllowed</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;4Gi&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. HPA配置</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling/v2</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HorizontalPodAutoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production-app-hpa</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  scaleTargetRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production-app</span></span>
<span class="line"><span class="__shiki_17hn0y">  minReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">  maxReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">20</span></span>
<span class="line"><span class="__shiki_17hn0y">  behavior</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    scaleUp</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      stabilizationWindowSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_17hn0y">      policies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Percent</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_17hn0y">        periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">15</span></span>
<span class="line"><span class="__shiki_17hn0y">    scaleDown</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      stabilizationWindowSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">300</span></span>
<span class="line"><span class="__shiki_17hn0y">      policies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pods</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">        periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span></span>
<span class="line"><span class="__shiki_17hn0y">  metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Resource</span></span>
<span class="line"><span class="__shiki_17hn0y">    resource</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cpu</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Utilization</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageUtilization</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">70</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pods</span></span>
<span class="line"><span class="__shiki_17hn0y">    pods</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      metric</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http_requests_per_second</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AverageValue</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageValue</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">500</span></span></code></pre></div><h4 id="_6-1-2-扩缩优先级策略" tabindex="-1">6.1.2 扩缩优先级策略 <a class="header-anchor" href="#_6-1-2-扩缩优先级策略" aria-label="Permalink to &quot;6.1.2 扩缩优先级策略&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 扩缩决策优先级配置</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling-priority</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kube-system</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  priority-config.yaml</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">    # 扩缩决策优先级</span></span>
<span class="line"><span class="__shiki_mdbnqw">    priorities:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      # 级别1: 关键业务（最高优先级）</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - name: critical-workloads</span></span>
<span class="line"><span class="__shiki_mdbnqw">        selector:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          matchLabels:</span></span>
<span class="line"><span class="__shiki_mdbnqw">            priority: &quot;critical&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        weight: 1000</span></span>
<span class="line"><span class="__shiki_mdbnqw">        scalingRules:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          - type: &quot;hpa&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            minReplicas: 3</span></span>
<span class="line"><span class="__shiki_mdbnqw">            maxReplicas: 50</span></span>
<span class="line"><span class="__shiki_mdbnqw">          - type: &quot;vpa&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            updateMode: &quot;Initial&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_mdbnqw">      # 级别2: 重要业务</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - name: important-workloads</span></span>
<span class="line"><span class="__shiki_mdbnqw">        selector:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          matchLabels:</span></span>
<span class="line"><span class="__shiki_mdbnqw">            priority: &quot;high&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        weight: 100</span></span>
<span class="line"><span class="__shiki_mdbnqw">        scalingRules:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          - type: &quot;hpa&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            minReplicas: 2</span></span>
<span class="line"><span class="__shiki_mdbnqw">            maxReplicas: 20</span></span>
<span class="line"><span class="__shiki_mdbnqw">          - type: &quot;vpa&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            updateMode: &quot;Auto&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_mdbnqw">      # 级别3: 普通业务</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - name: standard-workloads</span></span>
<span class="line"><span class="__shiki_mdbnqw">        selector:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          matchLabels:</span></span>
<span class="line"><span class="__shiki_mdbnqw">            priority: &quot;standard&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        weight: 10</span></span>
<span class="line"><span class="__shiki_mdbnqw">        scalingRules:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          - type: &quot;hpa&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            minReplicas: 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">            maxReplicas: 10</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_mdbnqw">      # 级别4: 批处理任务（最低优先级）</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - name: batch-workloads</span></span>
<span class="line"><span class="__shiki_mdbnqw">        selector:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          matchLabels:</span></span>
<span class="line"><span class="__shiki_mdbnqw">            priority: &quot;batch&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        weight: 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">        scalingRules:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          - type: &quot;keda&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            minReplicas: 0</span></span>
<span class="line"><span class="__shiki_mdbnqw">            maxReplicas: 5</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    # 资源保障策略</span></span>
<span class="line"><span class="__shiki_mdbnqw">    resourceGuarantees:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      critical-workloads:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        cpu: &quot;4&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        memory: &quot;8Gi&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      important-workloads:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        cpu: &quot;2&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        memory: &quot;4Gi&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    # 节点选择策略</span></span>
<span class="line"><span class="__shiki_mdbnqw">    nodeSelection:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      critical-workloads:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        - node-type: &quot;on-demand&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      batch-workloads:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        - node-type: &quot;spot&quot;</span></span></code></pre></div><h3 id="_6-2-成本优化策略" tabindex="-1">6.2 成本优化策略 <a class="header-anchor" href="#_6-2-成本优化策略" aria-label="Permalink to &quot;6.2 成本优化策略&quot;">​</a></h3><h4 id="_6-2-1-成本感知扩缩" tabindex="-1">6.2.1 成本感知扩缩 <a class="header-anchor" href="#_6-2-1-成本感知扩缩" aria-label="Permalink to &quot;6.2.1 成本感知扩缩&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 成本优化HPA配置</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling/v2</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HorizontalPodAutoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cost-optimized-hpa</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 成本优化注解</span></span>
<span class="line"><span class="__shiki_17hn0y">    autoscaling.alpha.kubernetes.io/cost-optimization</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    autoscaling.alpha.kubernetes.io/spot-instance-preference</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    autoscaling.alpha.kubernetes.io/max-cost-per-hour</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  scaleTargetRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cost-sensitive-app</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  minReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">  maxReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">50</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 基于成本的扩缩策略</span></span>
<span class="line"><span class="__shiki_17hn0y">  metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Resource</span></span>
<span class="line"><span class="__shiki_17hn0y">    resource</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cpu</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Utilization</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageUtilization</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span><span class="__shiki_21nrsd">  # 较高利用率以节省成本</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">External</span></span>
<span class="line"><span class="__shiki_17hn0y">    external</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      metric</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cost_per_hour</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Value</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;5&quot;</span><span class="__shiki_21nrsd">  # 目标每小时成本不超过5美元</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  behavior</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    scaleUp</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      stabilizationWindowSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span></span>
<span class="line"><span class="__shiki_17hn0y">      policies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pods</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">        periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span><span class="__shiki_21nrsd">  # 缓慢扩容</span></span>
<span class="line"><span class="__shiki_17hn0y">    scaleDown</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      stabilizationWindowSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">600</span><span class="__shiki_21nrsd">  # 10分钟稳定窗口</span></span>
<span class="line"><span class="__shiki_17hn0y">      policies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Percent</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">20</span></span>
<span class="line"><span class="__shiki_17hn0y">        periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">300</span><span class="__shiki_21nrsd">  # 快速缩容以节省成本</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 节点选择策略</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cost-sensitive-app</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      affinity</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        nodeAffinity</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          preferredDuringSchedulingIgnoredDuringExecution</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">weight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_17hn0y">            preference</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">              matchExpressions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">              - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">node-type</span></span>
<span class="line"><span class="__shiki_17hn0y">                operator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">In</span></span>
<span class="line"><span class="__shiki_17hn0y">                values</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                - </span><span class="__shiki_mdbnqw">spot</span><span class="__shiki_21nrsd">  # 优先使用Spot实例</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">weight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">50</span></span>
<span class="line"><span class="__shiki_17hn0y">            preference</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">              matchExpressions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">              - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">node-type</span></span>
<span class="line"><span class="__shiki_17hn0y">                operator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">In</span></span>
<span class="line"><span class="__shiki_17hn0y">                values</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                - </span><span class="__shiki_mdbnqw">on-demand</span><span class="__shiki_21nrsd">  # 其次按需实例</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 容忍度</span></span>
<span class="line"><span class="__shiki_17hn0y">      tolerations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;spot&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        operator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Exists&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        effect</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;NoSchedule&quot;</span></span></code></pre></div><h4 id="_6-2-2-混合实例策略" tabindex="-1">6.2.2 混合实例策略 <a class="header-anchor" href="#_6-2-2-混合实例策略" aria-label="Permalink to &quot;6.2.2 混合实例策略&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Cluster Autoscaler混合实例配置</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cluster-autoscaler-mixed-instances</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kube-system</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  mixed-instances-policy.json</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">    {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;instancesDistribution&quot;: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;onDemandPercentageAboveBaseCapacity&quot;: 20,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;onDemandBaseCapacity&quot;: 2,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;spotAllocationStrategy&quot;: &quot;capacity-optimized&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;spotInstancePools&quot;: 5</span></span>
<span class="line"><span class="__shiki_mdbnqw">      },</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;instanceTypes&quot;: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;m5.large&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;m5.xlarge&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;m5.2xlarge&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;c5.large&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;c5.xlarge&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;r5.large&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;r5.xlarge&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      ],</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;launchTemplateOverrides&quot;: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">        {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &quot;instanceType&quot;: &quot;m5.large&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &quot;weightedCapacity&quot;: &quot;1&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        },</span></span>
<span class="line"><span class="__shiki_mdbnqw">        {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &quot;instanceType&quot;: &quot;m5.xlarge&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &quot;weightedCapacity&quot;: &quot;2&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        },</span></span>
<span class="line"><span class="__shiki_mdbnqw">        {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &quot;instanceType&quot;: &quot;c5.large&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &quot;weightedCapacity&quot;: &quot;1&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">      ]</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span></code></pre></div><h3 id="_6-3-监控与告警策略" tabindex="-1">6.3 监控与告警策略 <a class="header-anchor" href="#_6-3-监控与告警策略" aria-label="Permalink to &quot;6.3 监控与告警策略&quot;">​</a></h3><h4 id="_6-3-1-扩缩监控面板" tabindex="-1">6.3.1 扩缩监控面板 <a class="header-anchor" href="#_6-3-1-扩缩监控面板" aria-label="Permalink to &quot;6.3.1 扩缩监控面板&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Grafana Dashboard配置</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling-dashboard</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">monitoring</span></span>
<span class="line"><span class="__shiki_17hn0y">  labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    grafana_dashboard</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  autoscaling-overview.json</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">    {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;dashboard&quot;: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;title&quot;: &quot;Kubernetes Autoscaling Overview&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;panels&quot;: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">          {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;title&quot;: &quot;HPA Replica Count&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;targets&quot;: [{</span></span>
<span class="line"><span class="__shiki_mdbnqw">              &quot;expr&quot;: &quot;kube_horizontalpodautoscaler_status_current_replicas&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">              &quot;legendFormat&quot;: &quot;{{namespace}}/{{hpa}}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }]</span></span>
<span class="line"><span class="__shiki_mdbnqw">          },</span></span>
<span class="line"><span class="__shiki_mdbnqw">          {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;title&quot;: &quot;HPA Target Utilization&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;targets&quot;: [{</span></span>
<span class="line"><span class="__shiki_mdbnqw">              &quot;expr&quot;: &quot;kube_horizontalpodautoscaler_status_target_metric{metric_name=\\&quot;cpu\\&quot;}&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">              &quot;legendFormat&quot;: &quot;{{namespace}}/{{hpa}}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }]</span></span>
<span class="line"><span class="__shiki_mdbnqw">          },</span></span>
<span class="line"><span class="__shiki_mdbnqw">          {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;title&quot;: &quot;VPA Recommendations&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;targets&quot;: [{</span></span>
<span class="line"><span class="__shiki_mdbnqw">              &quot;expr&quot;: &quot;vpa_recommendation_container_cpu_cores&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">              &quot;legendFormat&quot;: &quot;{{namespace}}/{{vpa}}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }]</span></span>
<span class="line"><span class="__shiki_mdbnqw">          },</span></span>
<span class="line"><span class="__shiki_mdbnqw">          {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;title&quot;: &quot;Cluster Nodes&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;targets&quot;: [{</span></span>
<span class="line"><span class="__shiki_mdbnqw">              &quot;expr&quot;: &quot;count(kube_node_info)&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">              &quot;legendFormat&quot;: &quot;Total Nodes&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }]</span></span>
<span class="line"><span class="__shiki_mdbnqw">          },</span></span>
<span class="line"><span class="__shiki_mdbnqw">          {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;title&quot;: &quot;Pending Pods&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;targets&quot;: [{</span></span>
<span class="line"><span class="__shiki_mdbnqw">              &quot;expr&quot;: &quot;sum(kube_pod_status_phase{phase=\\&quot;Pending\\&quot;})&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">              &quot;legendFormat&quot;: &quot;Pending Pods&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }]</span></span>
<span class="line"><span class="__shiki_mdbnqw">          },</span></span>
<span class="line"><span class="__shiki_mdbnqw">          {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;title&quot;: &quot;Node Utilization&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;targets&quot;: [{</span></span>
<span class="line"><span class="__shiki_mdbnqw">              &quot;expr&quot;: &quot;100 - (avg(rate(node_cpu_seconds_total{mode=\\&quot;idle\\&quot;}[5m])) * 100)&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">              &quot;legendFormat&quot;: &quot;CPU Utilization&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }, {</span></span>
<span class="line"><span class="__shiki_mdbnqw">              &quot;expr&quot;: &quot;(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">              &quot;legendFormat&quot;: &quot;Memory Utilization&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }]</span></span>
<span class="line"><span class="__shiki_mdbnqw">          }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        ]</span></span>
<span class="line"><span class="__shiki_mdbnqw">      }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span></code></pre></div><h4 id="_6-3-2-扩缩告警规则" tabindex="-1">6.3.2 扩缩告警规则 <a class="header-anchor" href="#_6-3-2-扩缩告警规则" aria-label="Permalink to &quot;6.3.2 扩缩告警规则&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">monitoring.coreos.com/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PrometheusRule</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling-alerts</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">monitoring</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  groups</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling</span></span>
<span class="line"><span class="__shiki_17hn0y">    rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # HPA告警</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HPAAtMaxReplicas</span></span>
<span class="line"><span class="__shiki_17hn0y">      expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kube_horizontalpodautoscaler_status_current_replicas == kube_horizontalpodautoscaler_spec_max_replicas</span></span>
<span class="line"><span class="__shiki_17hn0y">      for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">warning</span></span>
<span class="line"><span class="__shiki_17hn0y">      annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;HPA {{ $labels.hpa }} is at max replicas&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;HPA {{ $labels.hpa }} in namespace {{ $labels.namespace }} has been at max replicas for 5 minutes&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HPAAtMinReplicas</span></span>
<span class="line"><span class="__shiki_17hn0y">      expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kube_horizontalpodautoscaler_status_current_replicas == kube_horizontalpodautoscaler_spec_min_replicas</span></span>
<span class="line"><span class="__shiki_17hn0y">      for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">30m</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">info</span></span>
<span class="line"><span class="__shiki_17hn0y">      annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;HPA {{ $labels.hpa }} is at min replicas&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # VPA告警</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">VPARecommendationOutOfBounds</span></span>
<span class="line"><span class="__shiki_17hn0y">      expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">vpa_recommendation_container_cpu_cores &lt; vpa_spec_resource_policy_container_min_allowed_cpu_cores</span></span>
<span class="line"><span class="__shiki_mdbnqw">        or vpa_recommendation_container_cpu_cores &gt; vpa_spec_resource_policy_container_max_allowed_cpu_cores</span></span>
<span class="line"><span class="__shiki_17hn0y">      for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">1m</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">warning</span></span>
<span class="line"><span class="__shiki_17hn0y">      annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;VPA recommendation out of bounds&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # CA告警</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ClusterAutoscalerScaleUpFailed</span></span>
<span class="line"><span class="__shiki_17hn0y">      expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">increase(cluster_autoscaler_scale_up_errors_total[5m]) &gt; 0</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">critical</span></span>
<span class="line"><span class="__shiki_17hn0y">      annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Cluster Autoscaler failed to scale up&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ClusterAutoscalerScaleDownFailed</span></span>
<span class="line"><span class="__shiki_17hn0y">      expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">increase(cluster_autoscaler_scale_down_errors_total[5m]) &gt; 0</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">warning</span></span>
<span class="line"><span class="__shiki_17hn0y">      annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Cluster Autoscaler failed to scale down&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 资源不足告警</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">InsufficientClusterResources</span></span>
<span class="line"><span class="__shiki_17hn0y">      expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">sum(kube_pod_status_phase{phase=&quot;Pending&quot;}) by (namespace) &gt; 3</span></span>
<span class="line"><span class="__shiki_17hn0y">      for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">critical</span></span>
<span class="line"><span class="__shiki_17hn0y">      annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Insufficient cluster resources&quot;</span></span></code></pre></div><h2 id="七、故障排查与优化" tabindex="-1">七、故障排查与优化 <a class="header-anchor" href="#七、故障排查与优化" aria-label="Permalink to &quot;七、故障排查与优化&quot;">​</a></h2><h3 id="_7-1-常见问题排查" tabindex="-1">7.1 常见问题排查 <a class="header-anchor" href="#_7-1-常见问题排查" aria-label="Permalink to &quot;7.1 常见问题排查&quot;">​</a></h3><h4 id="_7-1-1-hpa不扩缩问题" tabindex="-1">7.1.1 HPA不扩缩问题 <a class="header-anchor" href="#_7-1-1-hpa不扩缩问题" aria-label="Permalink to &quot;7.1.1 HPA不扩缩问题&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># HPA故障排查脚本</span></span>
<span class="line"><span class="__shiki_1t8gfj">hpa_troubleshoot</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> HPA_NAME</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33">$1</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> NAMESPACE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33">\${2</span><span class="__shiki_1itgoe">:-</span><span class="__shiki_140thh">default</span><span class="__shiki_1jdh33">}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;=== HPA故障排查: </span><span class="__shiki_140thh">$HPA_NAME</span><span class="__shiki_mdbnqw"> ===&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 1. 检查HPA状态</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n1. HPA状态:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">describe</span><span class="__shiki_mdbnqw"> hpa</span><span class="__shiki_140thh"> $HPA_NAME</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 2. 检查指标API可用性</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n2. 指标API检查:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_dzsirb"> --raw</span><span class="__shiki_mdbnqw"> &quot;/apis/custom.metrics.k8s.io/v1beta1&quot;</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /dev/null</span><span class="__shiki_1itgoe"> 2&gt;&amp;1</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_dzsirb">$?</span><span class="__shiki_1itgoe"> -eq</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;✓ 自定义指标API可用&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    else</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;✗ 自定义指标API不可用&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 3. 检查Pod资源请求</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n3. Pod资源请求:&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    TARGET</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">get</span><span class="__shiki_mdbnqw"> hpa</span><span class="__shiki_140thh"> $HPA_NAME </span><span class="__shiki_dzsirb">-o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.spec.scaleTargetRef.name}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">get</span><span class="__shiki_mdbnqw"> deploy</span><span class="__shiki_140thh"> $TARGET </span><span class="__shiki_dzsirb">-o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.spec.template.spec.containers[*].resources}&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> jq</span><span class="__shiki_mdbnqw"> .</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 4. 检查实际指标值</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n4. 实际指标值:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">get</span><span class="__shiki_dzsirb"> --raw</span><span class="__shiki_mdbnqw"> &quot;/apis/custom.metrics.k8s.io/v1beta1/namespaces/</span><span class="__shiki_140thh">$NAMESPACE</span><span class="__shiki_mdbnqw">/pods/*/http_requests_per_second&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> jq</span><span class="__shiki_mdbnqw"> .</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 5. 检查事件</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n5. 相关事件:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">get</span><span class="__shiki_mdbnqw"> events</span><span class="__shiki_dzsirb"> --field-selector</span><span class="__shiki_mdbnqw"> involvedObject.name=</span><span class="__shiki_140thh">$HPA_NAME </span><span class="__shiki_dzsirb">--sort-by=</span><span class="__shiki_mdbnqw">&#39;.lastTimestamp&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 6. 检查Metrics Server</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n6. Metrics Server状态:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> kube-system</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_mdbnqw"> k8s-app=metrics-server</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 7. 检查PodDisruptionBudget</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n7. PodDisruptionBudget:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">get</span><span class="__shiki_mdbnqw"> pdb</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_mdbnqw"> app=</span><span class="__shiki_140thh">$TARGET</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 常见问题及解决方案</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;常见HPA问题及解决方案：&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;1. HPA显示&lt;unknown&gt;指标：检查Metrics Server是否正常运行&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;2. HPA不扩容：检查maxReplicas设置，检查目标利用率是否设置过高&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;3. HPA频繁伸缩：调整behavior中的stabilizationWindowSeconds&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;4. 自定义指标不工作：检查Prometheus Adapter配置&quot;</span></span></code></pre></div><h4 id="_7-1-2-ca节点管理问题" tabindex="-1">7.1.2 CA节点管理问题 <a class="header-anchor" href="#_7-1-2-ca节点管理问题" aria-label="Permalink to &quot;7.1.2 CA节点管理问题&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># CA故障排查脚本</span></span>
<span class="line"><span class="__shiki_1t8gfj">ca_troubleshoot</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;=== Cluster Autoscaler故障排查 ===&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 1. 检查CA Pod状态</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n1. CA Pod状态:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> kube-system</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_mdbnqw"> app=cluster-autoscaler</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 2. 查看CA日志</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n2. CA最近日志:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> kube-system</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_mdbnqw"> deployment/cluster-autoscaler</span><span class="__shiki_dzsirb"> --tail=100</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 3. 检查Pending Pods</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n3. Pending Pods:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> --all-namespaces</span><span class="__shiki_dzsirb"> --field-selector</span><span class="__shiki_mdbnqw"> status.phase=Pending</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> wide</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 4. 检查节点组状态</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n4. 节点状态:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> nodes</span><span class="__shiki_dzsirb"> --show-labels</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 5. 检查资源请求与限制</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n5. Pending Pod资源请求:&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> pod </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> $(</span><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> --field-selector</span><span class="__shiki_mdbnqw"> status.phase=Pending</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.items[*].metadata.name}&#39;</span><span class="__shiki_140thh">); </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;Pod: </span><span class="__shiki_140thh">$pod</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">        kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pod</span><span class="__shiki_140thh"> $pod </span><span class="__shiki_dzsirb">-o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.spec.containers[*].resources}&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> jq</span><span class="__shiki_mdbnqw"> .</span></span>
<span class="line"><span class="__shiki_1itgoe">    done</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 6. 检查PodDisruptionBudget</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n6. PodDisruptionBudget:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pdb</span><span class="__shiki_dzsirb"> --all-namespaces</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 7. 检查节点亲和性/反亲和性</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n7. 检查调度约束:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> --all-namespaces</span><span class="__shiki_dzsirb"> --field-selector</span><span class="__shiki_mdbnqw"> status.phase=Pending</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{range .items[*]}{.metadata.name}{&quot;\\t&quot;}{.spec.affinity}{&quot;\\n&quot;}{end}&#39;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 常见问题及解决方案</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;常见CA问题及解决方案：&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;1. CA不扩容：检查节点组最大限制，检查IAM权限&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;2. CA不缩容：检查节点上是否有不可移动的Pod&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;3. 节点频繁伸缩：调整scale-down-unneeded-time参数&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;4. Spot节点被频繁终止：使用多个节点组，设置合适的minSize&quot;</span></span></code></pre></div><h3 id="_7-2-性能优化建议" tabindex="-1">7.2 性能优化建议 <a class="header-anchor" href="#_7-2-性能优化建议" aria-label="Permalink to &quot;7.2 性能优化建议&quot;">​</a></h3><h4 id="_7-2-1-hpa优化配置" tabindex="-1">7.2.1 HPA优化配置 <a class="header-anchor" href="#_7-2-1-hpa优化配置" aria-label="Permalink to &quot;7.2.1 HPA优化配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 优化的HPA配置</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling/v2</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HorizontalPodAutoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">optimized-hpa</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 优化注解</span></span>
<span class="line"><span class="__shiki_17hn0y">    autoscaling.alpha.kubernetes.io/optimize-cost</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    autoscaling.alpha.kubernetes.io/warmup-pool-size</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  scaleTargetRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">optimized-app</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  minReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">  maxReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 智能指标配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Resource</span></span>
<span class="line"><span class="__shiki_17hn0y">    resource</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cpu</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Utilization</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageUtilization</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">75</span><span class="__shiki_21nrsd">  # 稍高的目标利用率</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pods</span></span>
<span class="line"><span class="__shiki_17hn0y">    pods</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      metric</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http_requests_per_second</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AverageValue</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageValue</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1000</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 优化的行为配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  behavior</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    scaleUp</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      stabilizationWindowSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_17hn0y">      policies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pods</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">        periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">15</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Percent</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">50</span></span>
<span class="line"><span class="__shiki_17hn0y">        periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">15</span></span>
<span class="line"><span class="__shiki_17hn0y">      selectPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Max</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    scaleDown</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      stabilizationWindowSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">600</span><span class="__shiki_21nrsd">  # 10分钟稳定窗口</span></span>
<span class="line"><span class="__shiki_17hn0y">      policies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pods</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">        periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Percent</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">20</span></span>
<span class="line"><span class="__shiki_17hn0y">        periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span></span>
<span class="line"><span class="__shiki_17hn0y">      selectPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Min</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 扩缩方向优先级</span></span>
<span class="line"><span class="__shiki_17hn0y">    scaleDirectionPriority</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Up&quot;</span><span class="__shiki_21nrsd">  # 优先扩容，后缩容</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 预测性扩缩</span></span>
<span class="line"><span class="__shiki_17hn0y">    predictive</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">      cpuHistogram</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        bucketSize</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        maxValue</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        retentionPeriod</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;24h&quot;</span></span></code></pre></div><h4 id="_7-2-2-预测性自动扩缩" tabindex="-1">7.2.2 预测性自动扩缩 <a class="header-anchor" href="#_7-2-2-预测性自动扩缩" aria-label="Permalink to &quot;7.2.2 预测性自动扩缩&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 预测性HPA配置（使用K8s 1.23+）</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling/v2</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HorizontalPodAutoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">predictive-hpa</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    autoscaling.alpha.kubernetes.io/predictive</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    autoscaling.alpha.kubernetes.io/prediction-window</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  scaleTargetRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">predictive-app</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  minReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">  maxReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">50</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Resource</span></span>
<span class="line"><span class="__shiki_17hn0y">    resource</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cpu</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AverageValue</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageValue</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">500m</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 预测性配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  behavior</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    predictive</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">      predictionWindowSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">600</span><span class="__shiki_21nrsd">  # 预测10分钟后的需求</span></span>
<span class="line"><span class="__shiki_17hn0y">      predictionAlgorithm</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;linear&quot;</span><span class="__shiki_21nrsd">  # 线性预测</span></span>
<span class="line"><span class="__shiki_17hn0y">      scaleUpBasedOnPrediction</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">      scaleDownBasedOnPrediction</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_21nrsd">  # 缩容不使用预测，更保守</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    scaleUp</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      stabilizationWindowSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_17hn0y">      policies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pods</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">        periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">15</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    scaleDown</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      stabilizationWindowSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">300</span></span>
<span class="line"><span class="__shiki_17hn0y">      policies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Percent</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_17hn0y">        periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span></span></code></pre></div><h2 id="八、未来发展趋势" tabindex="-1">八、未来发展趋势 <a class="header-anchor" href="#八、未来发展趋势" aria-label="Permalink to &quot;八、未来发展趋势&quot;">​</a></h2><h3 id="_8-1-kubernetes自动扩缩演进" tabindex="-1">8.1 Kubernetes自动扩缩演进 <a class="header-anchor" href="#_8-1-kubernetes自动扩缩演进" aria-label="Permalink to &quot;8.1 Kubernetes自动扩缩演进&quot;">​</a></h3><h4 id="_8-1-1-智能扩缩技术" tabindex="-1">8.1.1 智能扩缩技术 <a class="header-anchor" href="#_8-1-1-智能扩缩技术" aria-label="Permalink to &quot;8.1.1 智能扩缩技术&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># AI驱动的自动扩缩（概念）</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling/v2alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">IntelligentHorizontalPodAutoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ai-powered-hpa</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  scaleTargetRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ai-app</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  minReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">  maxReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # AI模型配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  aiModel</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;lstm&quot;</span><span class="__shiki_21nrsd">  # 或 &quot;transformer&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    trainingData</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      source</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;prometheus&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;cpu_usage&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;memory_usage&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;request_rate&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;response_time&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;error_rate&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      retentionPeriod</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;30d&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 特征工程</span></span>
<span class="line"><span class="__shiki_17hn0y">    featureEngineering</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      windowSize</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1h&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      aggregation</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;avg&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;p95&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;p99&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">      seasonality</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;hourly&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;daily&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;weekly&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 训练配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    training</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;24h&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      onlineLearning</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">      confidenceThreshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0.9</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 决策策略</span></span>
<span class="line"><span class="__shiki_17hn0y">  decisionStrategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    objective</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;cost_efficiency&quot;</span><span class="__shiki_21nrsd">  # 或 &quot;performance&quot;, &quot;reliability&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    constraints</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      maxCostPerHour</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;20&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      minAvailability</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;99.9&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      maxLatency</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;200ms&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 多目标优化</span></span>
<span class="line"><span class="__shiki_17hn0y">    multiObjectiveOptimization</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      weights</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        cost</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0.4</span></span>
<span class="line"><span class="__shiki_17hn0y">        performance</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0.4</span></span>
<span class="line"><span class="__shiki_17hn0y">        reliability</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0.2</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 可解释性</span></span>
<span class="line"><span class="__shiki_17hn0y">  explainability</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    featureImportance</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    decisionLogging</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span></code></pre></div><h4 id="_8-1-2-边缘计算扩缩" tabindex="-1">8.1.2 边缘计算扩缩 <a class="header-anchor" href="#_8-1-2-边缘计算扩缩" aria-label="Permalink to &quot;8.1.2 边缘计算扩缩&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 边缘场景自动扩缩</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling/v2</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HorizontalPodAutoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">edge-hpa</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    autoscaling.edge.k8s.io/latency-sensitive</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    autoscaling.edge.k8s.io/network-aware</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  scaleTargetRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">edge-app</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  minReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">  maxReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 边缘感知指标</span></span>
<span class="line"><span class="__shiki_17hn0y">  metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Resource</span></span>
<span class="line"><span class="__shiki_17hn0y">    resource</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cpu</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Utilization</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageUtilization</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">External</span></span>
<span class="line"><span class="__shiki_17hn0y">    external</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      metric</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">edge_node_latency</span></span>
<span class="line"><span class="__shiki_17hn0y">        selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            region</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;us-west-2&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Value</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;50&quot;</span><span class="__shiki_21nrsd">  # 目标延迟&lt;50ms</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 边缘优化行为</span></span>
<span class="line"><span class="__shiki_17hn0y">  behavior</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    scaleUp</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      stabilizationWindowSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span></span>
<span class="line"><span class="__shiki_17hn0y">      policies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pods</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">        periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_21nrsd">  # 更快的响应</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    scaleDown</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      stabilizationWindowSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">300</span></span>
<span class="line"><span class="__shiki_17hn0y">      policies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Percent</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">25</span></span>
<span class="line"><span class="__shiki_17hn0y">        periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">120</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 区域感知</span></span>
<span class="line"><span class="__shiki_17hn0y">    regionAwareness</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">      preferredRegions</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;us-west-2&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;us-east-1&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">      maxCrossRegionLatency</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100ms&quot;</span></span></code></pre></div><h3 id="_8-2-最佳实践总结" tabindex="-1">8.2 最佳实践总结 <a class="header-anchor" href="#_8-2-最佳实践总结" aria-label="Permalink to &quot;8.2 最佳实践总结&quot;">​</a></h3><h4 id="_8-2-1-自动扩缩黄金法则" tabindex="-1">8.2.1 自动扩缩黄金法则 <a class="header-anchor" href="#_8-2-1-自动扩缩黄金法则" aria-label="Permalink to &quot;8.2.1 自动扩缩黄金法则&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 自动扩缩最佳实践配置模板</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling-best-practices</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kube-system</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  best-practices.yaml</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">    # 原则1: 渐进式扩缩</span></span>
<span class="line"><span class="__shiki_mdbnqw">    scaling-principle-1: &quot;从小开始，渐进扩缩&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    # 原则2: 多指标决策</span></span>
<span class="line"><span class="__shiki_mdbnqw">    scaling-principle-2: &quot;使用多个相关指标进行扩缩决策&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    # 原则3: 保守缩容</span></span>
<span class="line"><span class="__shiki_mdbnqw">    scaling-principle-3: &quot;缩容比扩容更保守&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    # 原则4: 成本感知</span></span>
<span class="line"><span class="__shiki_mdbnqw">    scaling-principle-4: &quot;在性能和成本之间找到平衡&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    # 原则5: 预测性扩缩</span></span>
<span class="line"><span class="__shiki_mdbnqw">    scaling-principle-5: &quot;使用历史数据进行预测性扩缩&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    # 原则6: 故障安全</span></span>
<span class="line"><span class="__shiki_mdbnqw">    scaling-principle-6: &quot;确保扩缩失败时不会影响服务&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    # 具体配置建议</span></span>
<span class="line"><span class="__shiki_mdbnqw">    hpa-recommendations:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - &quot;minReplicas应该至少为2以确保高可用性&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - &quot;maxReplicas应该基于业务需求和成本限制&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - &quot;使用behavior控制扩缩速度&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - &quot;结合资源指标和业务指标&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    vpa-recommendations:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - &quot;为VPA设置合理的minAllowed和maxAllowed&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - &quot;避免VPA和HPA同时修改CPU资源&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - &quot;使用Initial模式进行初始资源调整&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - &quot;定期审查VPA推荐&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    ca-recommendations:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - &quot;设置合理的节点组min/max大小&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - &quot;使用混合实例类型降低成本&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - &quot;为关键工作负载预留容量&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - &quot;监控节点利用率并优化阈值&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    monitoring-recommendations:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - &quot;监控扩缩决策和效果&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - &quot;设置适当的告警规则&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - &quot;定期审计扩缩配置&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - &quot;建立扩缩性能基线&quot;</span></span></code></pre></div><p>通过全面掌握Kubernetes自动扩缩机制，可以实现以下目标：</p><ol><li><strong>资源优化</strong>：确保应用获得适当资源，避免浪费</li><li><strong>成本控制</strong>：动态调整资源使用，优化云成本</li><li><strong>性能保障</strong>：根据负载自动扩缩，保证服务质量</li><li><strong>高可用性</strong>：自动应对故障和负载变化</li><li><strong>运维自动化</strong>：减少人工干预，提高运维效率</li></ol><p>自动扩缩是云原生架构的核心能力，正确配置和使用HPA、VPA、CA等组件，可以构建弹性、高效、可靠的Kubernetes平台。</p>`,125)])])}const r=a(i,[["render",l]]);export{d as __pageData,r as default};
