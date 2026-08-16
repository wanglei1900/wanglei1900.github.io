import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"容器化技术 → Kubernetes → 服务网格 (Istio) 完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"devops/container/orchestration/service-mesh.md","filePath":"devops/container/orchestration/service-mesh.md"}'),_={name:"devops/container/orchestration/service-mesh.md"};function l(h,s,c,e,t,k){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="容器化技术-→-kubernetes-→-服务网格-istio-完整学习笔记" tabindex="-1">容器化技术 → Kubernetes → 服务网格 (Istio) 完整学习笔记 <a class="header-anchor" href="#容器化技术-→-kubernetes-→-服务网格-istio-完整学习笔记" aria-label="Permalink to &quot;容器化技术 → Kubernetes → 服务网格 (Istio) 完整学习笔记&quot;">​</a></h1><hr><h2 id="第一部分-服务网格基础概念" tabindex="-1">第一部分：服务网格基础概念 <a class="header-anchor" href="#第一部分-服务网格基础概念" aria-label="Permalink to &quot;第一部分：服务网格基础概念&quot;">​</a></h2><h3 id="_1-1-什么是服务网格" tabindex="-1">1.1 什么是服务网格？ <a class="header-anchor" href="#_1-1-什么是服务网格" aria-label="Permalink to &quot;1.1 什么是服务网格？&quot;">​</a></h3><p><strong>定义</strong>：服务网格是一个专门的基础设施层，用于处理服务间通信。它是一个可配置的、低延迟的网络架构，旨在实现微服务间的可靠、快速和安全的通信。</p><p><strong>核心特性</strong>：</p><ul><li><strong>透明通信</strong>：对应用代码无侵入</li><li><strong>网络抽象</strong>：解耦应用逻辑与网络通信</li><li><strong>可观察性</strong>：提供详细的流量指标和追踪</li><li><strong>流量管理</strong>：细粒度的流量控制能力</li><li><strong>安全性</strong>：内置的通信安全保障</li></ul><h3 id="_1-2-微服务架构的挑战" tabindex="-1">1.2 微服务架构的挑战 <a class="header-anchor" href="#_1-2-微服务架构的挑战" aria-label="Permalink to &quot;1.2 微服务架构的挑战&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 传统微服务通信问题：</span></span>
<span class="line"><span class="__shiki_mdbnqw">1. 服务发现：硬编码IP/端口 vs 动态发现</span></span>
<span class="line"><span class="__shiki_mdbnqw">2. 负载均衡：客户端实现 vs 统一策略</span></span>
<span class="line"><span class="__shiki_mdbnqw">3. 故障处理：每个服务重复实现重试、熔断</span></span>
<span class="line"><span class="__shiki_mdbnqw">4. 安全通信：每个服务单独处理TLS、认证</span></span>
<span class="line"><span class="__shiki_mdbnqw">5. 监控追踪：分布式追踪实现复杂</span></span>
<span class="line"><span class="__shiki_mdbnqw">6. 配置管理：动态配置更新困难</span></span></code></pre></div><h3 id="_1-3-服务网格-vs-传统方案对比" tabindex="-1">1.3 服务网格 vs 传统方案对比 <a class="header-anchor" href="#_1-3-服务网格-vs-传统方案对比" aria-label="Permalink to &quot;1.3 服务网格 vs 传统方案对比&quot;">​</a></h3><table tabindex="0"><thead><tr><th>维度</th><th>传统方案</th><th>服务网格</th></tr></thead><tbody><tr><td><strong>通信逻辑</strong></td><td>应用代码内实现</td><td>Sidecar 代理处理</td></tr><tr><td><strong>语言依赖</strong></td><td>每种语言单独实现</td><td>语言无关</td></tr><tr><td><strong>部署复杂度</strong></td><td>每个服务单独配置</td><td>统一配置管理</td></tr><tr><td><strong>升级维护</strong></td><td>需要重构应用</td><td>Sidecar 独立升级</td></tr><tr><td><strong>可观察性</strong></td><td>需要集成监控SDK</td><td>自动收集指标</td></tr></tbody></table><h3 id="_1-4-服务网格的核心组件" tabindex="-1">1.4 服务网格的核心组件 <a class="header-anchor" href="#_1-4-服务网格的核心组件" aria-label="Permalink to &quot;1.4 服务网格的核心组件&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">服务网格架构：</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 数据平面 (Data Plane)</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── Sidecar 代理 (如Envoy) - 处理所有入站/出站流量</span></span>
<span class="line"><span class="__shiki_wvjl67">│</span></span>
<span class="line"><span class="__shiki_wvjl67">└── 控制平面 (Control Plane)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── 配置管理</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── 证书管理</span></span>
<span class="line"><span class="__shiki_wvjl67">    └── 策略执行</span></span></code></pre></div><hr><h2 id="第二部分-istio-架构深度解析" tabindex="-1">第二部分：Istio 架构深度解析 <a class="header-anchor" href="#第二部分-istio-架构深度解析" aria-label="Permalink to &quot;第二部分：Istio 架构深度解析&quot;">​</a></h2><h3 id="_2-1-istio-整体架构" tabindex="-1">2.1 Istio 整体架构 <a class="header-anchor" href="#_2-1-istio-整体架构" aria-label="Permalink to &quot;2.1 Istio 整体架构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">Istio 1.8+ 简化架构：</span></span>
<span class="line"><span class="__shiki_wvjl67">控制平面 (istiod)</span></span>
<span class="line"><span class="__shiki_wvjl67">├── Pilot - 流量管理和服务发现</span></span>
<span class="line"><span class="__shiki_wvjl67">├── Citadel - 安全和身份管理</span></span>
<span class="line"><span class="__shiki_wvjl67">└── Galley - 配置验证和分发</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">数据平面</span></span>
<span class="line"><span class="__shiki_wvjl67">└── Envoy 代理 (Sidecar) - 实际处理流量</span></span></code></pre></div><h3 id="_2-2-数据平面-envoy-代理详解" tabindex="-1">2.2 数据平面：Envoy 代理详解 <a class="header-anchor" href="#_2-2-数据平面-envoy-代理详解" aria-label="Permalink to &quot;2.2 数据平面：Envoy 代理详解&quot;">​</a></h3><p><strong>Envoy 核心功能</strong>：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Envoy 代理职责：</span></span>
<span class="line"><span class="__shiki_mdbnqw">1. 动态服务发现</span></span>
<span class="line"><span class="__shiki_mdbnqw">2. 负载均衡 (HTTP/2, gRPC, TCP)</span></span>
<span class="line"><span class="__shiki_mdbnqw">3. TLS 终止和发起</span></span>
<span class="line"><span class="__shiki_mdbnqw">4. HTTP/2 和 gRPC 代理</span></span>
<span class="line"><span class="__shiki_mdbnqw">5. 断路器</span></span>
<span class="line"><span class="__shiki_mdbnqw">6. 健康检查</span></span>
<span class="line"><span class="__shiki_mdbnqw">7. 基于百分比流量分割的分阶段发布</span></span>
<span class="line"><span class="__shiki_mdbnqw">8. 故障注入</span></span>
<span class="line"><span class="__shiki_mdbnqw">9. 丰富的指标收集</span></span></code></pre></div><p><strong>Sidecar 注入模式</strong>：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 手动注入</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> &lt;(</span><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> kube-inject </span><span class="__shiki_dzsirb">-f</span><span class="__shiki_mdbnqw"> deployment.yaml)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 自动注入（基于命名空间）</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> label</span><span class="__shiki_mdbnqw"> namespace</span><span class="__shiki_mdbnqw"> default</span><span class="__shiki_mdbnqw"> istio-injection=enabled</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 自动注入（基于Pod注解）</span></span>
<span class="line"><span class="__shiki_1t8gfj">annotations:</span></span>
<span class="line"><span class="__shiki_1t8gfj">  sidecar.istio.io/inject:</span><span class="__shiki_mdbnqw"> &quot;true&quot;</span></span></code></pre></div><h3 id="_2-3-控制平面组件详解" tabindex="-1">2.3 控制平面组件详解 <a class="header-anchor" href="#_2-3-控制平面组件详解" aria-label="Permalink to &quot;2.3 控制平面组件详解&quot;">​</a></h3><h4 id="pilot-流量管理大脑" tabindex="-1"><strong>Pilot</strong> - 流量管理大脑 <a class="header-anchor" href="#pilot-流量管理大脑" aria-label="Permalink to &quot;**Pilot** - 流量管理大脑&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">功能分解：</span></span>
<span class="line"><span class="__shiki_mdbnqw">1. 服务发现：集成各种注册中心（Kubernetes、Consul等）</span></span>
<span class="line"><span class="__shiki_mdbnqw">2. 流量管理：将高级路由规则转换为Envoy配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">3. 负载均衡：配置负载均衡策略</span></span>
<span class="line"><span class="__shiki_mdbnqw">4. 故障恢复：配置超时、重试、熔断器</span></span>
<span class="line"><span class="__shiki_mdbnqw">5. 配置分发：通过xDS API向Envoy下发配置</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">xDS API类型：</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">CDS</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Cluster Discovery Service</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">EDS</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Endpoint Discovery Service</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">LDS</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Listener Discovery Service</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">RDS</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Route Discovery Service</span></span></code></pre></div><h4 id="citadel-安全核心" tabindex="-1"><strong>Citadel</strong> - 安全核心 <a class="header-anchor" href="#citadel-安全核心" aria-label="Permalink to &quot;**Citadel** - 安全核心&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">安全功能：</span></span>
<span class="line"><span class="__shiki_mdbnqw">1. 身份管理：为每个工作负载颁发身份</span></span>
<span class="line"><span class="__shiki_mdbnqw">2. 证书管理：自动证书颁发和轮换</span></span>
<span class="line"><span class="__shiki_mdbnqw">3. 认证策略：服务间认证策略管理</span></span>
<span class="line"><span class="__shiki_mdbnqw">4. 凭证管理：存储和分发TLS证书</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">工作流程：</span></span>
<span class="line"><span class="__shiki_mdbnqw">1. 工作负载启动时向Citadel请求身份</span></span>
<span class="line"><span class="__shiki_mdbnqw">2. Citadel颁发SPIFFE格式的身份证书</span></span>
<span class="line"><span class="__shiki_mdbnqw">3. 证书自动轮换（默认90天）</span></span>
<span class="line"><span class="__shiki_mdbnqw">4. Envoy使用证书进行mTLS通信</span></span></code></pre></div><h4 id="galley-配置验证与分发" tabindex="-1"><strong>Galley</strong> - 配置验证与分发 <a class="header-anchor" href="#galley-配置验证与分发" aria-label="Permalink to &quot;**Galley** - 配置验证与分发&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">职责：</span></span>
<span class="line"><span class="__shiki_mdbnqw">1. 配置摄取：从各种源读取配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">2. 配置验证：验证配置语法和语义</span></span>
<span class="line"><span class="__shiki_mdbnqw">3. 配置分发：将验证后的配置分发给其他组件</span></span>
<span class="line"><span class="__shiki_mdbnqw">4. 配置转换：将用户配置转换为内部表示</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">支持的配置源：</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">Kubernetes Custom Resources</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">MCP (Mesh Configuration Protocol) 服务器</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">文件系统</span></span></code></pre></div><h3 id="_2-4-istio-1-5-架构演进" tabindex="-1">2.4 Istio 1.5+ 架构演进 <a class="header-anchor" href="#_2-4-istio-1-5-架构演进" aria-label="Permalink to &quot;2.4 Istio 1.5+ 架构演进&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">演进方向：</span></span>
<span class="line"><span class="__shiki_wvjl67">Istio 1.4 及之前：多组件架构 (Pilot、Galley、Citadel、Mixer)</span></span>
<span class="line"><span class="__shiki_wvjl67">Istio 1.5：单体架构 (istiod，整合所有控制平面功能)</span></span>
<span class="line"><span class="__shiki_wvjl67">Istio 1.8+：移除Mixer，遥测功能集成到Envoy</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">优势：</span></span>
<span class="line"><span class="__shiki_wvjl67">- 简化部署和维护</span></span>
<span class="line"><span class="__shiki_wvjl67">- 减少资源消耗</span></span>
<span class="line"><span class="__shiki_wvjl67">- 提高性能</span></span>
<span class="line"><span class="__shiki_wvjl67">- 降低复杂度</span></span></code></pre></div><hr><h2 id="第三部分-istio-核心功能详解" tabindex="-1">第三部分：Istio 核心功能详解 <a class="header-anchor" href="#第三部分-istio-核心功能详解" aria-label="Permalink to &quot;第三部分：Istio 核心功能详解&quot;">​</a></h2><h3 id="_3-1-流量管理" tabindex="-1">3.1 流量管理 <a class="header-anchor" href="#_3-1-流量管理" aria-label="Permalink to &quot;3.1 流量管理&quot;">​</a></h3><h4 id="虚拟服务-virtualservice" tabindex="-1"><strong>虚拟服务 (VirtualService)</strong> <a class="header-anchor" href="#虚拟服务-virtualservice" aria-label="Permalink to &quot;**虚拟服务 (VirtualService)**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">VirtualService</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">reviews-vs</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  hosts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">reviews</span><span class="__shiki_21nrsd">  # 服务名称（K8s Service）</span></span>
<span class="line"><span class="__shiki_17hn0y">  http</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">match</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">headers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        end-user</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          exact</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">jason</span></span>
<span class="line"><span class="__shiki_17hn0y">    route</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">destination</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">reviews</span></span>
<span class="line"><span class="__shiki_17hn0y">        subset</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v2</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">route</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd"># 默认路由</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">destination</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">reviews</span></span>
<span class="line"><span class="__shiki_17hn0y">        subset</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">      weight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">destination</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">reviews</span></span>
<span class="line"><span class="__shiki_17hn0y">        subset</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v2</span></span>
<span class="line"><span class="__shiki_17hn0y">      weight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">20</span></span></code></pre></div><h4 id="目标规则-destinationrule" tabindex="-1"><strong>目标规则 (DestinationRule)</strong> <a class="header-anchor" href="#目标规则-destinationrule" aria-label="Permalink to &quot;**目标规则 (DestinationRule)**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">DestinationRule</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">reviews-dr</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">reviews</span></span>
<span class="line"><span class="__shiki_17hn0y">  subsets</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v2</span></span>
<span class="line"><span class="__shiki_17hn0y">    labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v2</span></span>
<span class="line"><span class="__shiki_17hn0y">    trafficPolicy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      loadBalancer</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        simple</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">LEAST_CONN</span><span class="__shiki_21nrsd">  # 最少连接</span></span>
<span class="line"><span class="__shiki_17hn0y">      connectionPool</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        tcp</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          maxConnections</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_17hn0y">        http</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          http1MaxPendingRequests</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">          http2MaxRequests</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_17hn0y">      outlierDetection</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        consecutive5xxErrors</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_17hn0y">        interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">30s</span></span>
<span class="line"><span class="__shiki_17hn0y">        baseEjectionTime</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">30s</span></span>
<span class="line"><span class="__shiki_17hn0y">        maxEjectionPercent</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span></code></pre></div><h4 id="网关-gateway" tabindex="-1"><strong>网关 (Gateway)</strong> <a class="header-anchor" href="#网关-gateway" aria-label="Permalink to &quot;**网关 (Gateway)**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Gateway</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bookinfo-gateway</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    istio</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ingressgateway</span><span class="__shiki_21nrsd">  # 使用ingressgateway pod</span></span>
<span class="line"><span class="__shiki_17hn0y">  servers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">port</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      number</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http</span></span>
<span class="line"><span class="__shiki_17hn0y">      protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HTTP</span></span>
<span class="line"><span class="__shiki_17hn0y">    hosts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">&quot;*&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    tls</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      httpsRedirect</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">  # HTTP重定向到HTTPS</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">port</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      number</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">443</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">https</span></span>
<span class="line"><span class="__shiki_17hn0y">      protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HTTPS</span></span>
<span class="line"><span class="__shiki_17hn0y">    hosts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">bookinfo.example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">    tls</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">SIMPLE</span></span>
<span class="line"><span class="__shiki_17hn0y">      credentialName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bookinfo-tls-cert</span></span></code></pre></div><h4 id="服务入口-serviceentry" tabindex="-1"><strong>服务入口 (ServiceEntry)</strong> <a class="header-anchor" href="#服务入口-serviceentry" aria-label="Permalink to &quot;**服务入口 (ServiceEntry)**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ServiceEntry</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">external-api</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  hosts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">api.example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">  ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">number</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">443</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">https</span></span>
<span class="line"><span class="__shiki_17hn0y">    protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HTTPS</span></span>
<span class="line"><span class="__shiki_17hn0y">  resolution</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">DNS</span></span>
<span class="line"><span class="__shiki_17hn0y">  location</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">MESH_EXTERNAL</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 流量策略</span></span>
<span class="line"><span class="__shiki_17hn0y">  trafficPolicy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    tls</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">SIMPLE</span><span class="__shiki_21nrsd">  # 启用TLS</span></span>
<span class="line"><span class="__shiki_17hn0y">    loadBalancer</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      simple</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ROUND_ROBIN</span></span></code></pre></div><h3 id="_3-2-安全功能" tabindex="-1">3.2 安全功能 <a class="header-anchor" href="#_3-2-安全功能" aria-label="Permalink to &quot;3.2 安全功能&quot;">​</a></h3><h4 id="对等认证-peerauthentication" tabindex="-1"><strong>对等认证 (PeerAuthentication)</strong> <a class="header-anchor" href="#对等认证-peerauthentication" aria-label="Permalink to &quot;**对等认证 (PeerAuthentication)**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PeerAuthentication</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">istio-system</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  mtls</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">STRICT</span><span class="__shiki_21nrsd">  # 严格mTLS</span></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_21nrsd"># 命名空间级别</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PeerAuthentication</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">backend-auth</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">backend</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  mtls</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">STRICT</span></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_21nrsd"># 工作负载级别</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PeerAuthentication</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">productpage-auth</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">productpage</span></span>
<span class="line"><span class="__shiki_17hn0y">  mtls</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PERMISSIVE</span><span class="__shiki_21nrsd">  # 允许明文和TLS</span></span></code></pre></div><h4 id="请求认证-requestauthentication" tabindex="-1"><strong>请求认证 (RequestAuthentication)</strong> <a class="header-anchor" href="#请求认证-requestauthentication" aria-label="Permalink to &quot;**请求认证 (RequestAuthentication)**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">RequestAuthentication</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">jwt-auth</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend</span></span>
<span class="line"><span class="__shiki_17hn0y">  jwtRules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">issuer</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;https://accounts.google.com&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    jwksUri</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;https://www.googleapis.com/oauth2/v3/certs&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    audiences</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">&quot;bookinfo.apps.example.com&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    jwtHeaders</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">&quot;x-goog-iap-jwt-assertion&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    jwtParams</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">&quot;access_token&quot;</span></span></code></pre></div><h4 id="授权策略-authorizationpolicy" tabindex="-1"><strong>授权策略 (AuthorizationPolicy)</strong> <a class="header-anchor" href="#授权策略-authorizationpolicy" aria-label="Permalink to &quot;**授权策略 (AuthorizationPolicy)**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AuthorizationPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">httpbin-policy</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">httpbin</span></span>
<span class="line"><span class="__shiki_17hn0y">  action</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">DENY</span><span class="__shiki_21nrsd">  # 默认拒绝</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">source</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        principals</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;cluster.local/ns/default/sa/sleep&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">operation</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        methods</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;GET&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">        paths</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;/info*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    when</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">request.headers[user-agent]</span></span>
<span class="line"><span class="__shiki_17hn0y">      values</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;curl/*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 允许规则</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">source</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        namespaces</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;trusted-ns&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">operation</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        methods</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;GET&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;POST&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h3 id="_3-3-可观察性" tabindex="-1">3.3 可观察性 <a class="header-anchor" href="#_3-3-可观察性" aria-label="Permalink to &quot;3.3 可观察性&quot;">​</a></h3><h4 id="遥测配置-telemetry" tabindex="-1"><strong>遥测配置 (Telemetry)</strong> <a class="header-anchor" href="#遥测配置-telemetry" aria-label="Permalink to &quot;**遥测配置 (Telemetry)**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">telemetry.istio.io/v1alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Telemetry</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">mesh-default</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">istio-system</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  accessLogging</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">providers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">envoy</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">  metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">providers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">prometheus</span></span>
<span class="line"><span class="__shiki_17hn0y">    overrides</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">match</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        metric</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">REQUEST_COUNT</span></span>
<span class="line"><span class="__shiki_17hn0y">      tagOverrides</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        response_code</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          operation</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">UPSERT</span></span>
<span class="line"><span class="__shiki_17hn0y">          value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;string(response.code)&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_17hn0y">  tracing</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">providers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">zipkin</span></span>
<span class="line"><span class="__shiki_17hn0y">    randomSamplingPercentage</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10.0</span></span></code></pre></div><h4 id="指标类型" tabindex="-1"><strong>指标类型</strong>： <a class="header-anchor" href="#指标类型" aria-label="Permalink to &quot;**指标类型**：&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 标准指标（自动收集）：</span></span>
<span class="line"><span class="__shiki_mdbnqw">1. 请求计数 (istio_requests_total)</span></span>
<span class="line"><span class="__shiki_mdbnqw">2. 请求持续时间 (istio_request_duration_milliseconds)</span></span>
<span class="line"><span class="__shiki_mdbnqw">3. 请求大小 (istio_request_bytes)</span></span>
<span class="line"><span class="__shiki_mdbnqw">4. 响应大小 (istio_response_bytes)</span></span>
<span class="line"><span class="__shiki_mdbnqw">5. TCP 指标 (istio_tcp_sent_bytes_total等)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 自定义指标：</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">telemetry.istio.io/v1alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Telemetry</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">custom-metrics</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">providers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">prometheus</span></span>
<span class="line"><span class="__shiki_17hn0y">    overrides</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">match</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        metric</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ALL_METRICS</span></span>
<span class="line"><span class="__shiki_17hn0y">      tagOverrides</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        custom_tag</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;source.workload.name&quot;</span></span></code></pre></div><h3 id="_3-4-网络弹性" tabindex="-1">3.4 网络弹性 <a class="header-anchor" href="#_3-4-网络弹性" aria-label="Permalink to &quot;3.4 网络弹性&quot;">​</a></h3><h4 id="超时配置" tabindex="-1"><strong>超时配置</strong>： <a class="header-anchor" href="#超时配置" aria-label="Permalink to &quot;**超时配置**：&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">VirtualService</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ratings-timeout</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  hosts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">ratings</span></span>
<span class="line"><span class="__shiki_17hn0y">  http</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">route</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">destination</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ratings</span></span>
<span class="line"><span class="__shiki_17hn0y">    timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10s</span><span class="__shiki_21nrsd">  # 请求超时</span></span></code></pre></div><h4 id="重试配置" tabindex="-1"><strong>重试配置</strong>： <a class="header-anchor" href="#重试配置" aria-label="Permalink to &quot;**重试配置**：&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">http</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">route</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">destination</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ratings</span></span>
<span class="line"><span class="__shiki_17hn0y">  retries</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    attempts</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span><span class="__shiki_21nrsd">  # 重试次数</span></span>
<span class="line"><span class="__shiki_17hn0y">    perTryTimeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2s</span><span class="__shiki_21nrsd">  # 每次尝试超时</span></span>
<span class="line"><span class="__shiki_17hn0y">    retryOn</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gateway-error,connect-failure,refused-stream</span></span></code></pre></div><h4 id="熔断器配置" tabindex="-1"><strong>熔断器配置</strong>： <a class="header-anchor" href="#熔断器配置" aria-label="Permalink to &quot;**熔断器配置**：&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">DestinationRule</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">httpbin-cb</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">httpbin</span></span>
<span class="line"><span class="__shiki_17hn0y">  trafficPolicy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    connectionPool</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      http</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        http1MaxPendingRequests</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">        maxRequestsPerConnection</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_17hn0y">    outlierDetection</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      consecutive5xxErrors</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_17hn0y">      interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">30s</span></span>
<span class="line"><span class="__shiki_17hn0y">      baseEjectionTime</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">30s</span></span>
<span class="line"><span class="__shiki_17hn0y">      maxEjectionPercent</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">50</span></span></code></pre></div><hr><h2 id="第四部分-istio-安装与配置" tabindex="-1">第四部分：Istio 安装与配置 <a class="header-anchor" href="#第四部分-istio-安装与配置" aria-label="Permalink to &quot;第四部分：Istio 安装与配置&quot;">​</a></h2><h3 id="_4-1-安装准备" tabindex="-1">4.1 安装准备 <a class="header-anchor" href="#_4-1-安装准备" aria-label="Permalink to &quot;4.1 安装准备&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 下载Istio</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -L</span><span class="__shiki_mdbnqw"> https://istio.io/downloadIstio</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> sh</span><span class="__shiki_mdbnqw"> -</span></span>
<span class="line"><span class="__shiki_dzsirb">cd</span><span class="__shiki_mdbnqw"> istio-</span><span class="__shiki_dzsirb">*</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_140thh"> PATH</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$PWD/bin:$PATH</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 检查Kubernetes集群</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> cluster-info</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> nodes</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 安装Istio Operator</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> operator</span><span class="__shiki_mdbnqw"> init</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> istio-operator</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 验证安装</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> verify-install</span></span></code></pre></div><h3 id="_4-2-安装配置文件" tabindex="-1">4.2 安装配置文件 <a class="header-anchor" href="#_4-2-安装配置文件" aria-label="Permalink to &quot;4.2 安装配置文件&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># minimal.yaml - 最小安装</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">install.istio.io/v1alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">IstioOperator</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  profile</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">minimal</span></span>
<span class="line"><span class="__shiki_17hn0y">  components</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    pilot</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    ingressGateways</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">istio-ingressgateway</span></span>
<span class="line"><span class="__shiki_17hn0y">      enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># demo.yaml - 演示安装（包含所有组件）</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">install.istio.io/v1alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">IstioOperator</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  profile</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">demo</span></span>
<span class="line"><span class="__shiki_17hn0y">  values</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    global</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      proxy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        autoInject</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">enabled</span></span>
<span class="line"><span class="__shiki_17hn0y">      useMCP</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># production.yaml - 生产安装</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">install.istio.io/v1alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">IstioOperator</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  profile</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">  values</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    global</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      proxy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">100m</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">128Mi</span></span>
<span class="line"><span class="__shiki_17hn0y">          limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2000m</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">1024Mi</span></span>
<span class="line"><span class="__shiki_17hn0y">    pilot</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      autoscaleEnabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">      resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">500m</span></span>
<span class="line"><span class="__shiki_17hn0y">          memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2048Mi</span></span></code></pre></div><h3 id="_4-3-自定义安装" tabindex="-1">4.3 自定义安装 <a class="header-anchor" href="#_4-3-自定义安装" aria-label="Permalink to &quot;4.3 自定义安装&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 生成安装清单</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> manifest</span><span class="__shiki_mdbnqw"> generate</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> custom-config.yaml</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> generated-manifest.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 安装Istio</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> custom-config.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 验证安装</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> istio-system</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> svc</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> istio-system</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> analyze</span></span></code></pre></div><h3 id="_4-4-插件安装" tabindex="-1">4.4 插件安装 <a class="header-anchor" href="#_4-4-插件安装" aria-label="Permalink to &quot;4.4 插件安装&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 安装Kiali（可视化）</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> samples/addons/kiali.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 安装Prometheus（监控）</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> samples/addons/prometheus.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 安装Grafana（仪表板）</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> samples/addons/grafana.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 安装Jaeger（分布式追踪）</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> samples/addons/jaeger.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 启动Dashboard</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> dashboard</span><span class="__shiki_mdbnqw"> kiali</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> dashboard</span><span class="__shiki_mdbnqw"> grafana</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> dashboard</span><span class="__shiki_mdbnqw"> prometheus</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> dashboard</span><span class="__shiki_mdbnqw"> jaeger</span></span></code></pre></div><hr><h2 id="第五部分-istio-实战操作" tabindex="-1">第五部分：Istio 实战操作 <a class="header-anchor" href="#第五部分-istio-实战操作" aria-label="Permalink to &quot;第五部分：Istio 实战操作&quot;">​</a></h2><h3 id="_5-1-bookinfo-应用部署" tabindex="-1">5.1 Bookinfo 应用部署 <a class="header-anchor" href="#_5-1-bookinfo-应用部署" aria-label="Permalink to &quot;5.1 Bookinfo 应用部署&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 部署应用</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> samples/bookinfo/platform/kube/bookinfo.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 检查服务</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> services</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pods</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 部署网关</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> samples/bookinfo/networking/bookinfo-gateway.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 确定入口IP和端口</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_140thh"> INGRESS_HOST</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> istio-system</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> istio-ingressgateway</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.status.loadBalancer.ingress[0].ip}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_140thh"> INGRESS_PORT</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> istio-system</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> istio-ingressgateway</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.spec.ports[?(@.name==&quot;http2&quot;)].port}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_140thh"> SECURE_INGRESS_PORT</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> istio-system</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> service</span><span class="__shiki_mdbnqw"> istio-ingressgateway</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.spec.ports[?(@.name==&quot;https&quot;)].port}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 访问应用</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_mdbnqw"> &quot;http://\${</span><span class="__shiki_140thh">INGRESS_HOST</span><span class="__shiki_mdbnqw">}:\${</span><span class="__shiki_140thh">INGRESS_PORT</span><span class="__shiki_mdbnqw">}/productpage&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> &quot;&lt;title&gt;.*&lt;/title&gt;&quot;</span></span></code></pre></div><h3 id="_5-2-流量管理实践" tabindex="-1">5.2 流量管理实践 <a class="header-anchor" href="#_5-2-流量管理实践" aria-label="Permalink to &quot;5.2 流量管理实践&quot;">​</a></h3><h4 id="金丝雀发布" tabindex="-1"><strong>金丝雀发布</strong> <a class="header-anchor" href="#金丝雀发布" aria-label="Permalink to &quot;**金丝雀发布**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 步骤1：创建目标规则</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">DestinationRule</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">reviews</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">reviews</span></span>
<span class="line"><span class="__shiki_17hn0y">  subsets</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v2</span></span>
<span class="line"><span class="__shiki_17hn0y">    labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v2</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 步骤2：创建虚拟服务</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">VirtualService</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">reviews</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  hosts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">reviews</span></span>
<span class="line"><span class="__shiki_17hn0y">  http</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">route</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">destination</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">reviews</span></span>
<span class="line"><span class="__shiki_17hn0y">        subset</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">      weight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">90</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">destination</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">reviews</span></span>
<span class="line"><span class="__shiki_17hn0y">        subset</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v2</span></span>
<span class="line"><span class="__shiki_17hn0y">      weight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span></code></pre></div><h4 id="a-b测试" tabindex="-1"><strong>A/B测试</strong> <a class="header-anchor" href="#a-b测试" aria-label="Permalink to &quot;**A/B测试**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">VirtualService</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">reviews-ab-test</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  hosts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">reviews</span></span>
<span class="line"><span class="__shiki_17hn0y">  http</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">match</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">headers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        user-type</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          exact</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">premium</span></span>
<span class="line"><span class="__shiki_17hn0y">    route</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">destination</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">reviews</span></span>
<span class="line"><span class="__shiki_17hn0y">        subset</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v2</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">route</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">destination</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">reviews</span></span>
<span class="line"><span class="__shiki_17hn0y">        subset</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span></code></pre></div><h4 id="故障注入" tabindex="-1"><strong>故障注入</strong> <a class="header-anchor" href="#故障注入" aria-label="Permalink to &quot;**故障注入**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">VirtualService</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ratings-fault</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  hosts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">ratings</span></span>
<span class="line"><span class="__shiki_17hn0y">  http</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">fault</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      delay</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        percentage</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10.0</span></span>
<span class="line"><span class="__shiki_17hn0y">        fixedDelay</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5s</span></span>
<span class="line"><span class="__shiki_17hn0y">      abort</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        percentage</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10.0</span></span>
<span class="line"><span class="__shiki_17hn0y">        httpStatus</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">500</span></span>
<span class="line"><span class="__shiki_17hn0y">    route</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">destination</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ratings</span></span>
<span class="line"><span class="__shiki_17hn0y">        subset</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span></code></pre></div><h4 id="流量镜像" tabindex="-1"><strong>流量镜像</strong> <a class="header-anchor" href="#流量镜像" aria-label="Permalink to &quot;**流量镜像**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">VirtualService</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">httpbin-mirror</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  hosts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">httpbin</span></span>
<span class="line"><span class="__shiki_17hn0y">  http</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">route</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">destination</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">httpbin</span></span>
<span class="line"><span class="__shiki_17hn0y">        subset</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">      weight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_17hn0y">    mirror</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">httpbin</span></span>
<span class="line"><span class="__shiki_17hn0y">      subset</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v2</span></span>
<span class="line"><span class="__shiki_17hn0y">    mirrorPercentage</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100.0</span></span></code></pre></div><h3 id="_5-3-安全配置实践" tabindex="-1">5.3 安全配置实践 <a class="header-anchor" href="#_5-3-安全配置实践" aria-label="Permalink to &quot;5.3 安全配置实践&quot;">​</a></h3><h4 id="双向tls配置" tabindex="-1"><strong>双向TLS配置</strong> <a class="header-anchor" href="#双向tls配置" aria-label="Permalink to &quot;**双向TLS配置**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 检查mTLS状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> authn</span><span class="__shiki_mdbnqw"> tls-check</span><span class="__shiki_140thh"> $(</span><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pod</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_mdbnqw"> app=productpage</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.items..metadata.name}&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_mdbnqw">details.default.svc.cluster.local</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 启用命名空间mTLS</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> -</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">apiVersion: security.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_mdbnqw">kind: PeerAuthentication</span></span>
<span class="line"><span class="__shiki_mdbnqw">metadata:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  name: default</span></span>
<span class="line"><span class="__shiki_mdbnqw">  namespace: default</span></span>
<span class="line"><span class="__shiki_mdbnqw">spec:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  mtls:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    mode: STRICT</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 创建目标规则</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> -</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">apiVersion: networking.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_mdbnqw">kind: DestinationRule</span></span>
<span class="line"><span class="__shiki_mdbnqw">metadata:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  name: default</span></span>
<span class="line"><span class="__shiki_mdbnqw">  namespace: default</span></span>
<span class="line"><span class="__shiki_mdbnqw">spec:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  host: &quot;*.default.svc.cluster.local&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  trafficPolicy:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    tls:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      mode: ISTIO_MUTUAL</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span></code></pre></div><h4 id="终端用户认证" tabindex="-1"><strong>终端用户认证</strong> <a class="header-anchor" href="#终端用户认证" aria-label="Permalink to &quot;**终端用户认证**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 创建请求认证策略</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> -</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">apiVersion: security.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_mdbnqw">kind: RequestAuthentication</span></span>
<span class="line"><span class="__shiki_mdbnqw">metadata:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  name: jwt-example</span></span>
<span class="line"><span class="__shiki_mdbnqw">spec:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  selector:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    matchLabels:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      app: httpbin</span></span>
<span class="line"><span class="__shiki_mdbnqw">  jwtRules:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  - issuer: &quot;testing@secure.istio.io&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    jwksUri: &quot;https://raw.githubusercontent.com/istio/istio/master/security/tools/jwt/samples/jwks.json&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 测试认证</span></span>
<span class="line"><span class="__shiki_140thh">TOKEN</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">curl</span><span class="__shiki_mdbnqw"> https://raw.githubusercontent.com/istio/istio/master/security/tools/jwt/samples/demo.jwt</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> --header</span><span class="__shiki_mdbnqw"> &quot;Authorization: Bearer </span><span class="__shiki_140thh">$TOKEN</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_mdbnqw"> http://</span><span class="__shiki_140thh">$INGRESS_HOST</span><span class="__shiki_mdbnqw">:</span><span class="__shiki_140thh">$INGRESS_PORT</span><span class="__shiki_mdbnqw">/headers</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> /dev/null</span><span class="__shiki_dzsirb"> -w</span><span class="__shiki_mdbnqw"> &quot;%{http_code}\\n&quot;</span></span></code></pre></div><h3 id="_5-4-可观察性实践" tabindex="-1">5.4 可观察性实践 <a class="header-anchor" href="#_5-4-可观察性实践" aria-label="Permalink to &quot;5.4 可观察性实践&quot;">​</a></h3><h4 id="自定义遥测" tabindex="-1"><strong>自定义遥测</strong> <a class="header-anchor" href="#自定义遥测" aria-label="Permalink to &quot;**自定义遥测**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">telemetry.istio.io/v1alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Telemetry</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">custom-metrics</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">productpage</span></span>
<span class="line"><span class="__shiki_17hn0y">  metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">providers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">prometheus</span></span>
<span class="line"><span class="__shiki_17hn0y">    overrides</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">match</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        metric</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">REQUEST_COUNT</span></span>
<span class="line"><span class="__shiki_17hn0y">      tagOverrides</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        custom_tag</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;source.workload.name&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">match</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        metric</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">REQUEST_DURATION</span></span>
<span class="line"><span class="__shiki_17hn0y">      disabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span></code></pre></div><h4 id="分布式追踪" tabindex="-1"><strong>分布式追踪</strong> <a class="header-anchor" href="#分布式追踪" aria-label="Permalink to &quot;**分布式追踪**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 启用追踪头传播</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> -</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">apiVersion: telemetry.istio.io/v1alpha1</span></span>
<span class="line"><span class="__shiki_mdbnqw">kind: Telemetry</span></span>
<span class="line"><span class="__shiki_mdbnqw">metadata:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  name: mesh-default</span></span>
<span class="line"><span class="__shiki_mdbnqw">  namespace: istio-system</span></span>
<span class="line"><span class="__shiki_mdbnqw">spec:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  tracing:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  - providers:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    - name: zipkin</span></span>
<span class="line"><span class="__shiki_mdbnqw">    randomSamplingPercentage: 100.0</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 查看追踪信息</span></span>
<span class="line"><span class="__shiki_21nrsd"># 访问应用并在Jaeger UI中查看</span></span></code></pre></div><hr><h2 id="第六部分-istio-高级主题" tabindex="-1">第六部分：Istio 高级主题 <a class="header-anchor" href="#第六部分-istio-高级主题" aria-label="Permalink to &quot;第六部分：Istio 高级主题&quot;">​</a></h2><h3 id="_6-1-多集群部署" tabindex="-1">6.1 多集群部署 <a class="header-anchor" href="#_6-1-多集群部署" aria-label="Permalink to &quot;6.1 多集群部署&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 集群配置示例</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">install.istio.io/v1alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">IstioOperator</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  profile</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">demo</span></span>
<span class="line"><span class="__shiki_17hn0y">  values</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    global</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      multiCluster</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        clusterName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cluster1</span></span>
<span class="line"><span class="__shiki_17hn0y">      network</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">network1</span></span>
<span class="line"><span class="__shiki_17hn0y">    pilot</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      configCluster</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">  components</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    egressGateways</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">istio-multicluster-egressgateway</span></span>
<span class="line"><span class="__shiki_17hn0y">      enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span></code></pre></div><h3 id="_6-2-虚拟机集成" tabindex="-1">6.2 虚拟机集成 <a class="header-anchor" href="#_6-2-虚拟机集成" aria-label="Permalink to &quot;6.2 虚拟机集成&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 生成虚拟机配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> x</span><span class="__shiki_mdbnqw"> workload</span><span class="__shiki_mdbnqw"> entry</span><span class="__shiki_mdbnqw"> configure</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> workload.yaml</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> vm-files/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 在虚拟机上安装Istio sidecar</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> mkdir</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> /etc/certs</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> cp</span><span class="__shiki_mdbnqw"> vm-files/root-cert.pem</span><span class="__shiki_mdbnqw"> /etc/certs/root-cert.pem</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> mkdir</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> /var/run/secrets/tokens</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> cp</span><span class="__shiki_mdbnqw"> vm-files/istio-token</span><span class="__shiki_mdbnqw"> /var/run/secrets/tokens/istio-token</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 安装Istio sidecar</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -L</span><span class="__shiki_mdbnqw"> https://storage.googleapis.com/istio-release/releases/1.17.0/deb/istio-sidecar.deb</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> istio-sidecar.deb</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> dpkg</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_mdbnqw"> istio-sidecar.deb</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 启动sidecar</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> systemctl</span><span class="__shiki_mdbnqw"> start</span><span class="__shiki_mdbnqw"> istio</span></span></code></pre></div><h3 id="_6-3-性能优化" tabindex="-1">6.3 性能优化 <a class="header-anchor" href="#_6-3-性能优化" aria-label="Permalink to &quot;6.3 性能优化&quot;">​</a></h3><h4 id="资源调优" tabindex="-1"><strong>资源调优</strong> <a class="header-anchor" href="#资源调优" aria-label="Permalink to &quot;**资源调优**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">install.istio.io/v1alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">IstioOperator</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  components</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    pilot</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      k8s</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">500m</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2048Mi</span></span>
<span class="line"><span class="__shiki_17hn0y">        hpaSpec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          minReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">          maxReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_17hn0y">          metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Resource</span></span>
<span class="line"><span class="__shiki_17hn0y">            resource</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">              name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cpu</span></span>
<span class="line"><span class="__shiki_17hn0y">              targetAverageUtilization</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_17hn0y">    ingressGateways</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">istio-ingressgateway</span></span>
<span class="line"><span class="__shiki_17hn0y">      k8s</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">100m</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">128Mi</span></span>
<span class="line"><span class="__shiki_17hn0y">          limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2000m</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">1024Mi</span></span></code></pre></div><h4 id="sidecar配置优化" tabindex="-1"><strong>Sidecar配置优化</strong> <a class="header-anchor" href="#sidecar配置优化" aria-label="Permalink to &quot;**Sidecar配置优化**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Sidecar</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  egress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">hosts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">&quot;*/istio-system/*&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">&quot;*/kube-system/*&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">&quot;./*&quot;</span><span class="__shiki_21nrsd">  # 当前命名空间</span></span>
<span class="line"><span class="__shiki_17hn0y">  workloadSelector</span><span class="__shiki_140thh">: {}  </span><span class="__shiki_21nrsd"># 应用到所有工作负载</span></span></code></pre></div><h3 id="_6-4-故障排查" tabindex="-1">6.4 故障排查 <a class="header-anchor" href="#_6-4-故障排查" aria-label="Permalink to &quot;6.4 故障排查&quot;">​</a></h3><h4 id="诊断命令" tabindex="-1"><strong>诊断命令</strong> <a class="header-anchor" href="#诊断命令" aria-label="Permalink to &quot;**诊断命令**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 代理状态检查</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> proxy-status</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> ps</span><span class="__shiki_21nrsd">  # 简写</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 代理配置检查</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> proxy-config</span><span class="__shiki_mdbnqw"> all</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> pc</span><span class="__shiki_mdbnqw"> clusters</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> pc</span><span class="__shiki_mdbnqw"> routes</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> pc</span><span class="__shiki_mdbnqw"> listeners</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> pc</span><span class="__shiki_mdbnqw"> endpoints</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 诊断分析</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> analyze</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> analyze</span><span class="__shiki_dzsirb"> --all-namespaces</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 日志检查</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_mdbnqw"> istio-proxy</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_mdbnqw"> istio-proxy</span><span class="__shiki_dzsirb"> --tail=100</span><span class="__shiki_dzsirb"> -f</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 性能分析</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> dashboard</span><span class="__shiki_mdbnqw"> envoy</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 6. 网络检查</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> experimental</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> pod</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> experimental</span><span class="__shiki_mdbnqw"> authz</span><span class="__shiki_mdbnqw"> check</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span></code></pre></div><h4 id="常见问题排查" tabindex="-1"><strong>常见问题排查</strong> <a class="header-anchor" href="#常见问题排查" aria-label="Permalink to &quot;**常见问题排查**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 问题1：Sidecar未注入</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> namespace</span><span class="__shiki_dzsirb"> -L</span><span class="__shiki_mdbnqw"> istio-injection</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pod</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.spec.containers[*].name}&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 问题2：mTLS连接失败</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> authn</span><span class="__shiki_mdbnqw"> tls-check</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">servic</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> peerauthentication</span><span class="__shiki_dzsirb"> --all-namespaces</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> destinationrule</span><span class="__shiki_dzsirb"> --all-namespaces</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 问题3：路由问题</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> proxy-config</span><span class="__shiki_mdbnqw"> routes</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> --name</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">route-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> json</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> virtualservice</span><span class="__shiki_dzsirb"> --all-namespaces</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 问题4：配置同步问题</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> proxy-status</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> STALE</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 问题5：资源不足</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> top</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> istio-system</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> pod</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> istio-system</span></span></code></pre></div><hr><h2 id="第七部分-istio-生态系统与集成" tabindex="-1">第七部分：Istio 生态系统与集成 <a class="header-anchor" href="#第七部分-istio-生态系统与集成" aria-label="Permalink to &quot;第七部分：Istio 生态系统与集成&quot;">​</a></h2><h3 id="_7-1-与ci-cd集成" tabindex="-1">7.1 与CI/CD集成 <a class="header-anchor" href="#_7-1-与ci-cd集成" aria-label="Permalink to &quot;7.1 与CI/CD集成&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># GitLab CI示例</span></span>
<span class="line"><span class="__shiki_17hn0y">stages</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">test</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">deploy</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">istio-test</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">kubectl apply -f samples/bookinfo/platform/kube/bookinfo.yaml</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">kubectl apply -f samples/bookinfo/networking/destination-rule-all.yaml</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">istioctl analyze</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">kubectl get virtualservices</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">canary-deploy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deploy</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">kubectl apply -f canary-virtualservice.yaml</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">sleep 30</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">kubectl apply -f production-virtualservice.yaml</span></span></code></pre></div><h3 id="_7-2-与监控告警集成" tabindex="-1">7.2 与监控告警集成 <a class="header-anchor" href="#_7-2-与监控告警集成" aria-label="Permalink to &quot;7.2 与监控告警集成&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Prometheus告警规则示例</span></span>
<span class="line"><span class="__shiki_17hn0y">groups</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">istio.rules</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">IstioHighRequestLatency</span></span>
<span class="line"><span class="__shiki_17hn0y">    expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">histogram_quantile(0.99, sum(rate(istio_request_duration_milliseconds_bucket[1m])) by (le, destination_service, source_workload)) &gt; 1000</span></span>
<span class="line"><span class="__shiki_17hn0y">    for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">    labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">warning</span></span>
<span class="line"><span class="__shiki_17hn0y">    annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;High request latency on {{ $labels.destination_service }}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Istio5xxErrors</span></span>
<span class="line"><span class="__shiki_17hn0y">    expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">sum(rate(istio_requests_total{response_code=~&quot;5.*&quot;}[1m])) / sum(rate(istio_requests_total[1m])) &gt; 0.05</span></span>
<span class="line"><span class="__shiki_17hn0y">    for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">    labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">critical</span></span>
<span class="line"><span class="__shiki_17hn0y">    annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;High error rate on {{ $labels.destination_service }}&quot;</span></span></code></pre></div><h3 id="_7-3-替代方案比较" tabindex="-1">7.3 替代方案比较 <a class="header-anchor" href="#_7-3-替代方案比较" aria-label="Permalink to &quot;7.3 替代方案比较&quot;">​</a></h3><table tabindex="0"><thead><tr><th>特性</th><th>Istio</th><th>Linkerd</th><th>Consul Connect</th><th>AWS App Mesh</th></tr></thead><tbody><tr><td><strong>架构复杂度</strong></td><td>高</td><td>低</td><td>中</td><td>低</td></tr><tr><td><strong>性能开销</strong></td><td>中</td><td>低</td><td>中</td><td>低</td></tr><tr><td><strong>功能丰富度</strong></td><td>非常高</td><td>高</td><td>中</td><td>中</td></tr><tr><td><strong>学习曲线</strong></td><td>陡峭</td><td>平缓</td><td>中等</td><td>平缓</td></tr><tr><td><strong>云厂商集成</strong></td><td>通用</td><td>通用</td><td>通用</td><td>AWS专用</td></tr><tr><td><strong>社区生态</strong></td><td>非常活跃</td><td>活跃</td><td>活跃</td><td>AWS维护</td></tr></tbody></table><hr><h2 id="第八部分-最佳实践" tabindex="-1">第八部分：最佳实践 <a class="header-anchor" href="#第八部分-最佳实践" aria-label="Permalink to &quot;第八部分：最佳实践&quot;">​</a></h2><h3 id="_8-1-部署最佳实践" tabindex="-1">8.1 部署最佳实践 <a class="header-anchor" href="#_8-1-部署最佳实践" aria-label="Permalink to &quot;8.1 部署最佳实践&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 使用金丝雀部署方式</span></span>
<span class="line"><span class="__shiki_21nrsd"># 先部署控制平面，再逐步注入sidecar</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 配置资源限制</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">install.istio.io/v1alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">IstioOperator</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  components</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    pilot</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      k8s</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1Gi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;500m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2Gi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1000m&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 启用自动扩缩容</span></span>
<span class="line"><span class="__shiki_17hn0y">    pilot</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      k8s</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        hpaSpec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          minReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">          maxReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 配置网络策略</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">istio-sidecar-policy</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      istio-injection</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">enabled</span></span>
<span class="line"><span class="__shiki_17hn0y">  policyTypes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Egress</span></span></code></pre></div><h3 id="_8-2-配置管理最佳实践" tabindex="-1">8.2 配置管理最佳实践 <a class="header-anchor" href="#_8-2-配置管理最佳实践" aria-label="Permalink to &quot;8.2 配置管理最佳实践&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 配置版本控制</span></span>
<span class="line"><span class="__shiki_1t8gfj">git</span><span class="__shiki_mdbnqw"> init</span></span>
<span class="line"><span class="__shiki_1t8gfj">git</span><span class="__shiki_mdbnqw"> add</span><span class="__shiki_mdbnqw"> .</span></span>
<span class="line"><span class="__shiki_1t8gfj">git</span><span class="__shiki_mdbnqw"> commit</span><span class="__shiki_dzsirb"> -m</span><span class="__shiki_mdbnqw"> &quot;Initial Istio configuration&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 配置分层管理</span></span>
<span class="line"><span class="__shiki_1t8gfj">config/</span></span>
<span class="line"><span class="__shiki_1t8gfj">├──</span><span class="__shiki_mdbnqw"> base/</span><span class="__shiki_21nrsd">              # 基础配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">├──</span><span class="__shiki_mdbnqw"> overlays/</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   ├──</span><span class="__shiki_mdbnqw"> dev/</span><span class="__shiki_21nrsd">          # 开发环境</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   ├──</span><span class="__shiki_mdbnqw"> staging/</span><span class="__shiki_21nrsd">      # 预发布环境</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   └──</span><span class="__shiki_mdbnqw"> prod/</span><span class="__shiki_21nrsd">         # 生产环境</span></span>
<span class="line"><span class="__shiki_1t8gfj">└──</span><span class="__shiki_mdbnqw"> components/</span><span class="__shiki_21nrsd">       # 可复用组件</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 使用配置验证</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> validate</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> my-config.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> analyze</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 配置回滚策略</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> rollout</span><span class="__shiki_mdbnqw"> undo</span><span class="__shiki_mdbnqw"> deployment/istio-ingressgateway</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> istio-system</span></span></code></pre></div><h3 id="_8-3-安全最佳实践" tabindex="-1">8.3 安全最佳实践 <a class="header-anchor" href="#_8-3-安全最佳实践" aria-label="Permalink to &quot;8.3 安全最佳实践&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 默认启用mTLS</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PeerAuthentication</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">istio-system</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  mtls</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">STRICT</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 使用最小权限原则</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AuthorizationPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deny-all</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  action</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">DENY</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">: []</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 定期轮换证书</span></span>
<span class="line"><span class="__shiki_21nrsd"># 自动管理，无需手动操作</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 启用审计日志</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">telemetry.istio.io/v1alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Telemetry</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">access-logging</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      istio</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ingressgateway</span></span>
<span class="line"><span class="__shiki_17hn0y">  accessLogging</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">providers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">envoy</span></span>
<span class="line"><span class="__shiki_17hn0y">    filter</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      expression</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;response.code &gt;= 400&quot;</span></span></code></pre></div><h3 id="_8-4-性能最佳实践" tabindex="-1">8.4 性能最佳实践 <a class="header-anchor" href="#_8-4-性能最佳实践" aria-label="Permalink to &quot;8.4 性能最佳实践&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 限制Sidecar配置范围</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Sidecar</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  egress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">hosts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">&quot;./*&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">&quot;istio-system/*&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 优化连接池设置</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">DestinationRule</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  trafficPolicy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    connectionPool</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      tcp</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        maxConnections</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_17hn0y">        connectTimeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">30ms</span></span>
<span class="line"><span class="__shiki_17hn0y">      http</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        http2MaxRequests</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1000</span></span>
<span class="line"><span class="__shiki_17hn0y">        maxRequestsPerConnection</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 启用访问日志采样</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">telemetry.istio.io/v1alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Telemetry</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  accessLogging</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">providers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">envoy</span></span>
<span class="line"><span class="__shiki_17hn0y">    disabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">    filter</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      expression</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;random() &lt; 0.1&quot;</span><span class="__shiki_21nrsd">  # 10%采样率</span></span></code></pre></div><h3 id="_8-5-监控告警最佳实践" tabindex="-1">8.5 监控告警最佳实践 <a class="header-anchor" href="#_8-5-监控告警最佳实践" aria-label="Permalink to &quot;8.5 监控告警最佳实践&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 关键监控指标：</span></span>
<span class="line"><span class="__shiki_mdbnqw">1. 控制平面健康</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">istiod up状态</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">配置同步延迟</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">2. 数据平面健康</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">Sidecar注入率</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">Envoy健康状态</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">3. 性能指标</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">请求延迟P99</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">错误率</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">吞吐量</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">4. 资源使用</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">CPU/内存使用率</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">网络带宽</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 告警规则示例：</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HighSidecarMemory</span></span>
<span class="line"><span class="__shiki_17hn0y">  expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">container_memory_usage_bytes{container=&quot;istio-proxy&quot;} &gt; 500 * 1024 * 1024</span></span>
<span class="line"><span class="__shiki_17hn0y">  for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PilotConfigRejectionRate</span></span>
<span class="line"><span class="__shiki_17hn0y">  expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rate(pilot_conflict_outbound_listener{config=&quot;sidecar&quot;} [5m]) &gt; 0.1</span></span>
<span class="line"><span class="__shiki_17hn0y">  for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2m</span></span></code></pre></div><hr><h2 id="第九部分-升级与维护" tabindex="-1">第九部分：升级与维护 <a class="header-anchor" href="#第九部分-升级与维护" aria-label="Permalink to &quot;第九部分：升级与维护&quot;">​</a></h2><h3 id="_9-1-升级策略" tabindex="-1">9.1 升级策略 <a class="header-anchor" href="#_9-1-升级策略" aria-label="Permalink to &quot;9.1 升级策略&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 金丝雀升级</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_dzsirb"> --set</span><span class="__shiki_mdbnqw"> revision=1-17-0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 迁移流量</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> label</span><span class="__shiki_mdbnqw"> namespace</span><span class="__shiki_mdbnqw"> default</span><span class="__shiki_mdbnqw"> istio-injection-</span><span class="__shiki_mdbnqw"> istio.io/rev=1-17-0</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> rollout</span><span class="__shiki_mdbnqw"> restart</span><span class="__shiki_mdbnqw"> deployment</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> default</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 验证升级</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> version</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> analyze</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 清理旧版本</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> x</span><span class="__shiki_mdbnqw"> uninstall</span><span class="__shiki_dzsirb"> --revision</span><span class="__shiki_mdbnqw"> 1-16-0</span></span></code></pre></div><h3 id="_9-2-备份与恢复" tabindex="-1">9.2 备份与恢复 <a class="header-anchor" href="#_9-2-备份与恢复" aria-label="Permalink to &quot;9.2 备份与恢复&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 备份配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> virtualservices</span><span class="__shiki_dzsirb"> -A</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> yaml</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> virtualservices-backup.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> destinationrules</span><span class="__shiki_dzsirb"> -A</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> yaml</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> destinationrules-backup.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> gateway</span><span class="__shiki_dzsirb"> -A</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> yaml</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> gateways-backup.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 备份安全配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> peerauthentications</span><span class="__shiki_dzsirb"> -A</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> yaml</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> peerauthentications-backup.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> authorizationpolicies</span><span class="__shiki_dzsirb"> -A</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> yaml</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> authorizationpolicies-backup.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 恢复配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> virtualservices-backup.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> destinationrules-backup.yaml</span></span></code></pre></div><h3 id="_9-3-日常维护任务" tabindex="-1">9.3 日常维护任务 <a class="header-anchor" href="#_9-3-日常维护任务" aria-label="Permalink to &quot;9.3 日常维护任务&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 检查组件状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> istio-system</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> svc</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> istio-system</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 检查配置同步</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> proxy-status</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 清理旧配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> experimental</span><span class="__shiki_mdbnqw"> cleanup</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 检查证书过期时间</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> secret</span><span class="__shiki_mdbnqw"> istio-ca-secret</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> istio-system</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.data.ca-cert\\.pem}&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> base64</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> openssl</span><span class="__shiki_mdbnqw"> x509</span><span class="__shiki_dzsirb"> -noout</span><span class="__shiki_dzsirb"> -dates</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 性能分析</span></span>
<span class="line"><span class="__shiki_1t8gfj">istioctl</span><span class="__shiki_mdbnqw"> dashboard</span><span class="__shiki_mdbnqw"> controlz</span><span class="__shiki_mdbnqw"> istiod-</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_mdbnqw">pod-i</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw">.istio-system</span></span></code></pre></div><hr><h2 id="总结表-istio核心概念速查" tabindex="-1">总结表：Istio核心概念速查 <a class="header-anchor" href="#总结表-istio核心概念速查" aria-label="Permalink to &quot;总结表：Istio核心概念速查&quot;">​</a></h2><table tabindex="0"><thead><tr><th>概念</th><th>作用</th><th>关键配置</th></tr></thead><tbody><tr><td><strong>VirtualService</strong></td><td>流量路由</td><td>hosts, http.match, route</td></tr><tr><td><strong>DestinationRule</strong></td><td>服务子集和策略</td><td>subsets, trafficPolicy</td></tr><tr><td><strong>Gateway</strong></td><td>入口网关</td><td>selector, servers, port</td></tr><tr><td><strong>ServiceEntry</strong></td><td>外部服务注册</td><td>hosts, ports, location</td></tr><tr><td><strong>Sidecar</strong></td><td>Sidecar配置范围</td><td>egress.hosts, ingress</td></tr><tr><td><strong>PeerAuthentication</strong></td><td>服务间认证</td><td>mtls.mode</td></tr><tr><td><strong>RequestAuthentication</strong></td><td>终端用户认证</td><td>jwtRules</td></tr><tr><td><strong>AuthorizationPolicy</strong></td><td>访问控制</td><td>action, rules</td></tr><tr><td><strong>Telemetry</strong></td><td>遥测配置</td><td>metrics, tracing, accessLogging</td></tr></tbody></table><hr><h2 id="学习路线建议" tabindex="-1">学习路线建议 <a class="header-anchor" href="#学习路线建议" aria-label="Permalink to &quot;学习路线建议&quot;">​</a></h2><h3 id="初级阶段-1-2周" tabindex="-1">初级阶段（1-2周） <a class="header-anchor" href="#初级阶段-1-2周" aria-label="Permalink to &quot;初级阶段（1-2周）&quot;">​</a></h3><ol><li>理解服务网格概念和Istio架构</li><li>安装Istio并部署示例应用</li><li>学习VirtualService和DestinationRule基础</li><li>实践基本流量管理（路由、权重分发）</li></ol><h3 id="中级阶段-2-3周" tabindex="-1">中级阶段（2-3周） <a class="header-anchor" href="#中级阶段-2-3周" aria-label="Permalink to &quot;中级阶段（2-3周）&quot;">​</a></h3><ol><li>掌握高级流量管理（故障注入、镜像、熔断）</li><li>配置安全策略（mTLS、JWT、授权）</li><li>使用可观察性工具（Kiali、Prometheus、Jaeger）</li><li>实践多集群部署和虚拟机集成</li></ol><h3 id="高级阶段-3-4周" tabindex="-1">高级阶段（3-4周） <a class="header-anchor" href="#高级阶段-3-4周" aria-label="Permalink to &quot;高级阶段（3-4周）&quot;">​</a></h3><ol><li>深入理解Envoy配置和xDS协议</li><li>性能调优和故障排查</li><li>生产环境最佳实践</li><li>定制开发（WebAssembly扩展）</li></ol><h3 id="专家阶段-持续" tabindex="-1">专家阶段（持续） <a class="header-anchor" href="#专家阶段-持续" aria-label="Permalink to &quot;专家阶段（持续）&quot;">​</a></h3><ol><li>参与Istio社区贡献</li><li>多集群多网络架构设计</li><li>大规模部署性能优化</li><li>安全策略深度定制</li></ol><hr><p><strong>实践项目建议</strong>：</p><ol><li>部署Bookinfo应用并实践所有流量管理功能</li><li>为微服务架构配置完整的安全策略</li><li>集成完整的可观察性栈（监控、日志、追踪）</li><li>设计并实施多集群服务网格</li><li>开发自定义Envoy过滤器</li></ol><p><strong>生产准备检查清单</strong>：</p><ul><li>[ ] 控制平面高可用配置</li><li>[ ] 资源限制和配额设置</li><li>[ ] 监控告警系统集成</li><li>[ ] 安全策略审查和测试</li><li>[ ] 备份和恢复流程</li><li>[ ] 升级和回滚策略</li><li>[ ] 团队培训文档</li><li>[ ] 故障排查手册</li></ul><p>通过系统学习Istio，您将能够构建可靠、安全和可观察的微服务架构，有效应对微服务带来的复杂性挑战，提升系统的稳定性和可维护性。</p>`,157)])])}const r=a(_,[["render",l]]);export{o as __pageData,r as default};
