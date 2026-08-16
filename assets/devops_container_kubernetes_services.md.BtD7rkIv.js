import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"Kubernetes 服务暴露策略 深度解析","description":"","frontmatter":{},"headers":[],"relativePath":"devops/container/kubernetes/services.md","filePath":"devops/container/kubernetes/services.md"}'),_={name:"devops/container/kubernetes/services.md"};function h(l,s,c,e,t,k){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="kubernetes-服务暴露策略-深度解析" tabindex="-1">Kubernetes 服务暴露策略 深度解析 <a class="header-anchor" href="#kubernetes-服务暴露策略-深度解析" aria-label="Permalink to &quot;Kubernetes 服务暴露策略 深度解析&quot;">​</a></h1><h2 id="一、服务暴露基础概念" tabindex="-1">一、服务暴露基础概念 <a class="header-anchor" href="#一、服务暴露基础概念" aria-label="Permalink to &quot;一、服务暴露基础概念&quot;">​</a></h2><h3 id="_1-1-为什么需要服务暴露" tabindex="-1">1.1 为什么需要服务暴露？ <a class="header-anchor" href="#_1-1-为什么需要服务暴露" aria-label="Permalink to &quot;1.1 为什么需要服务暴露？&quot;">​</a></h3><p>容器化应用需要被访问的四种场景：</p><ol><li><strong>集群内访问</strong>：微服务间通信</li><li><strong>集群外访问</strong>：外部客户端访问</li><li><strong>公网访问</strong>：互联网用户访问</li><li><strong>混合云/跨集群访问</strong>：多环境互通</li></ol><h3 id="_1-2-核心挑战" tabindex="-1">1.2 核心挑战 <a class="header-anchor" href="#_1-2-核心挑战" aria-label="Permalink to &quot;1.2 核心挑战&quot;">​</a></h3><ul><li><strong>动态IP问题</strong>：Pod IP不固定</li><li><strong>负载均衡需求</strong>：多副本流量分发</li><li><strong>网络隔离</strong>：命名空间/网络安全策略</li><li><strong>协议适配</strong>：HTTP/HTTPS/TCP/UDP/WebSocket等</li><li><strong>SSL/TLS终结</strong>：证书管理</li><li><strong>路径路由</strong>：基于URL的路由规则</li></ul><h2 id="二、service-服务发现与负载均衡" tabindex="-1">二、Service：服务发现与负载均衡 <a class="header-anchor" href="#二、service-服务发现与负载均衡" aria-label="Permalink to &quot;二、Service：服务发现与负载均衡&quot;">​</a></h2><h3 id="_2-1-service-核心原理" tabindex="-1">2.1 Service 核心原理 <a class="header-anchor" href="#_2-1-service-核心原理" aria-label="Permalink to &quot;2.1 Service 核心原理&quot;">​</a></h3><h4 id="service-类型对比" tabindex="-1">Service 类型对比： <a class="header-anchor" href="#service-类型对比" aria-label="Permalink to &quot;Service 类型对比：&quot;">​</a></h4><table tabindex="0"><thead><tr><th>类型</th><th>作用范围</th><th>IP类型</th><th>访问方式</th><th>适用场景</th></tr></thead><tbody><tr><td>ClusterIP</td><td>集群内部</td><td>虚拟IP</td><td>集群内Pod</td><td>内部微服务通信</td></tr><tr><td>NodePort</td><td>节点级别</td><td>节点IP</td><td><code>&lt;NodeIP&gt;:&lt;NodePort&gt;</code></td><td>开发测试，简单外部访问</td></tr><tr><td>LoadBalancer</td><td>公网/内网</td><td>负载均衡器IP</td><td>外部客户端</td><td>云环境生产部署</td></tr><tr><td>ExternalName</td><td>DNS级别</td><td>CNAME</td><td>域名解析</td><td>集成外部服务</td></tr><tr><td>Headless</td><td>集群内部</td><td>无ClusterIP</td><td>DNS直接解析Pod IP</td><td>有状态服务，如数据库</td></tr></tbody></table><h4 id="service-yaml-示例" tabindex="-1">Service YAML 示例： <a class="header-anchor" href="#service-yaml-示例" aria-label="Permalink to &quot;Service YAML 示例：&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">my-service</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">my-app</span></span>
<span class="line"><span class="__shiki_17hn0y">  type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ClusterIP</span><span class="__shiki_21nrsd">  # NodePort, LoadBalancer, ExternalName</span></span>
<span class="line"><span class="__shiki_17hn0y">  clusterIP</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10.96.0.100</span><span class="__shiki_21nrsd">  # 可选，固定ClusterIP</span></span>
<span class="line"><span class="__shiki_17hn0y">  ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http</span></span>
<span class="line"><span class="__shiki_17hn0y">    port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span><span class="__shiki_21nrsd">          # Service端口</span></span>
<span class="line"><span class="__shiki_17hn0y">    targetPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span><span class="__shiki_21nrsd">  # Pod端口</span></span>
<span class="line"><span class="__shiki_17hn0y">    protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">https</span></span>
<span class="line"><span class="__shiki_17hn0y">    port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">443</span></span>
<span class="line"><span class="__shiki_17hn0y">    targetPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8443</span></span>
<span class="line"><span class="__shiki_17hn0y">    protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">  sessionAffinity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ClientIP</span><span class="__shiki_21nrsd">  # 会话保持</span></span>
<span class="line"><span class="__shiki_17hn0y">  sessionAffinityConfig</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    clientIP</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      timeoutSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10800</span></span></code></pre></div><h3 id="_2-2-clusterip-集群内部服务" tabindex="-1">2.2 ClusterIP（集群内部服务） <a class="header-anchor" href="#_2-2-clusterip-集群内部服务" aria-label="Permalink to &quot;2.2 ClusterIP（集群内部服务）&quot;">​</a></h3><h4 id="工作原理" tabindex="-1">工作原理： <a class="header-anchor" href="#工作原理" aria-label="Permalink to &quot;工作原理：&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">Client Pod → ClusterIP(10.96.0.100) → kube-proxy(iptables/IPVS) → 后端Pod</span></span></code></pre></div><h4 id="服务发现机制" tabindex="-1">服务发现机制： <a class="header-anchor" href="#服务发现机制" aria-label="Permalink to &quot;服务发现机制：&quot;">​</a></h4><ol><li><strong>环境变量注入</strong>（传统方式）：</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">MY_SERVICE_SERVICE_HOST</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">10.96.0.100</span></span>
<span class="line"><span class="__shiki_140thh">MY_SERVICE_SERVICE_PORT</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">80</span></span>
<span class="line"><span class="__shiki_140thh">MY_SERVICE_PORT_80_TCP_ADDR</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">10.96.0.100</span></span></code></pre></div><ol start="2"><li><strong>DNS解析</strong>（推荐方式）：</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 完全限定域名</span></span>
<span class="line"><span class="__shiki_1t8gfj">my-service.default.svc.cluster.local</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 缩写（同一命名空间）</span></span>
<span class="line"><span class="__shiki_1t8gfj">my-service</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># DNS记录类型</span></span>
<span class="line"><span class="__shiki_1t8gfj">A记录：my-service</span><span class="__shiki_mdbnqw"> →</span><span class="__shiki_dzsirb"> 10.96.0.100</span></span>
<span class="line"><span class="__shiki_1t8gfj">SRV记录：_http._tcp.my-service</span><span class="__shiki_mdbnqw"> →</span><span class="__shiki_mdbnqw"> 端口信息</span></span></code></pre></div><h4 id="高级配置" tabindex="-1">高级配置： <a class="header-anchor" href="#高级配置" aria-label="Permalink to &quot;高级配置：&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 无头服务（Headless Service）</span></span>
<span class="line"><span class="__shiki_17hn0y">  clusterIP</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">None</span><span class="__shiki_21nrsd">  # 重要：没有ClusterIP</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 自定义端点</span></span>
<span class="line"><span class="__shiki_17hn0y">  externalIPs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_dzsirb">192.168.1.240</span><span class="__shiki_21nrsd">  # 外部可达的IP</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 流量策略</span></span>
<span class="line"><span class="__shiki_17hn0y">  internalTrafficPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Local</span><span class="__shiki_21nrsd">  # 节点内优先</span></span>
<span class="line"><span class="__shiki_17hn0y">  externalTrafficPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Local</span><span class="__shiki_21nrsd">  # 保留客户端源IP</span></span></code></pre></div><h3 id="_2-3-nodeport-节点端口暴露" tabindex="-1">2.3 NodePort（节点端口暴露） <a class="header-anchor" href="#_2-3-nodeport-节点端口暴露" aria-label="Permalink to &quot;2.3 NodePort（节点端口暴露）&quot;">​</a></h3><h4 id="架构原理" tabindex="-1">架构原理： <a class="header-anchor" href="#架构原理" aria-label="Permalink to &quot;架构原理：&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">外部客户端 → NodeIP:NodePort → kube-proxy → 后端Pod</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">可能经过：LoadBalancer → NodePort</span></span></code></pre></div><h4 id="配置示例" tabindex="-1">配置示例： <a class="header-anchor" href="#配置示例" aria-label="Permalink to &quot;配置示例：&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nodeport-service</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NodePort</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web</span></span>
<span class="line"><span class="__shiki_17hn0y">  ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span><span class="__shiki_21nrsd">          # Service端口</span></span>
<span class="line"><span class="__shiki_17hn0y">    targetPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span><span class="__shiki_21nrsd">  # Pod端口</span></span>
<span class="line"><span class="__shiki_17hn0y">    nodePort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30080</span><span class="__shiki_21nrsd">   # 节点端口(30000-32767)</span></span>
<span class="line"><span class="__shiki_17hn0y">    protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span></code></pre></div><h4 id="端口分配策略" tabindex="-1">端口分配策略： <a class="header-anchor" href="#端口分配策略" aria-label="Permalink to &quot;端口分配策略：&quot;">​</a></h4><ul><li><strong>自动分配</strong>：不指定nodePort时，K8s分配30000-32767</li><li><strong>手动指定</strong>：确保端口不冲突</li><li><strong>多节点访问</strong>：需要外部负载均衡器或DNS轮询</li></ul><h4 id="局限性" tabindex="-1">局限性： <a class="header-anchor" href="#局限性" aria-label="Permalink to &quot;局限性：&quot;">​</a></h4><ul><li>端口范围有限（30000-32767）</li><li>每个服务占用所有节点的相同端口</li><li>需要维护防火墙规则</li><li>不支持基于主机的路由</li></ul><h3 id="_2-4-loadbalancer-云提供商负载均衡器" tabindex="-1">2.4 LoadBalancer（云提供商负载均衡器） <a class="header-anchor" href="#_2-4-loadbalancer-云提供商负载均衡器" aria-label="Permalink to &quot;2.4 LoadBalancer（云提供商负载均衡器）&quot;">​</a></h3><h4 id="工作原理-1" tabindex="-1">工作原理： <a class="header-anchor" href="#工作原理-1" aria-label="Permalink to &quot;工作原理：&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">互联网用户 → 云负载均衡器 → NodePort/ClusterIP → Pod</span></span></code></pre></div><h4 id="云平台集成" tabindex="-1">云平台集成： <a class="header-anchor" href="#云平台集成" aria-label="Permalink to &quot;云平台集成：&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">loadbalancer-service</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # AWS ELB 特定配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    service.beta.kubernetes.io/aws-load-balancer-type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;nlb&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    service.beta.kubernetes.io/aws-load-balancer-internal</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    service.beta.kubernetes.io/aws-load-balancer-ssl-cert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;arn:aws:acm...&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # GCP 特定配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    cloud.google.com/load-balancer-type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Internal&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # Azure 特定配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    service.beta.kubernetes.io/azure-load-balancer-internal</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 通用配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    service.beta.kubernetes.io/load-balancer-source-ranges</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10.0.0.0/8,192.168.0.0/16&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">LoadBalancer</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web</span></span>
<span class="line"><span class="__shiki_17hn0y">  ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_17hn0y">    targetPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_17hn0y">  loadBalancerIP</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">203.0.113.10</span><span class="__shiki_21nrsd">  # 特定IP（如果云提供商支持）</span></span>
<span class="line"><span class="__shiki_17hn0y">  externalTrafficPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Local</span><span class="__shiki_21nrsd">   # 保留客户端IP</span></span></code></pre></div><h4 id="保留客户端源ip" tabindex="-1">保留客户端源IP： <a class="header-anchor" href="#保留客户端源ip" aria-label="Permalink to &quot;保留客户端源IP：&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  externalTrafficPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Local</span></span></code></pre></div><p><strong>工作原理</strong>：</p><ul><li>当设置为<code>Local</code>时，kube-proxy只代理到本地有Pod的节点</li><li>需要确保Pod在所有节点均匀分布，或使用DaemonSet</li><li>缺点：可能导致流量分布不均</li></ul><h3 id="_2-5-externalname-外部服务集成" tabindex="-1">2.5 ExternalName（外部服务集成） <a class="header-anchor" href="#_2-5-externalname-外部服务集成" aria-label="Permalink to &quot;2.5 ExternalName（外部服务集成）&quot;">​</a></h3><h4 id="用途" tabindex="-1">用途： <a class="header-anchor" href="#用途" aria-label="Permalink to &quot;用途：&quot;">​</a></h4><p>将集群外服务映射为集群内服务名</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">external-database</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ExternalName</span></span>
<span class="line"><span class="__shiki_17hn0y">  externalName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">database.example.com</span><span class="__shiki_21nrsd">  # 外部域名</span></span></code></pre></div><h4 id="工作原理-2" tabindex="-1">工作原理： <a class="header-anchor" href="#工作原理-2" aria-label="Permalink to &quot;工作原理：&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">Pod访问 external-database.default.svc.cluster.local</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">DNS CNAME解析 → database.example.com</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">访问外部服务</span></span></code></pre></div><h2 id="三、ingress-http-https路由" tabindex="-1">三、Ingress：HTTP/HTTPS路由 <a class="header-anchor" href="#三、ingress-http-https路由" aria-label="Permalink to &quot;三、Ingress：HTTP/HTTPS路由&quot;">​</a></h2><h3 id="_3-1-ingress-核心概念" tabindex="-1">3.1 Ingress 核心概念 <a class="header-anchor" href="#_3-1-ingress-核心概念" aria-label="Permalink to &quot;3.1 Ingress 核心概念&quot;">​</a></h3><h4 id="与service的关系" tabindex="-1">与Service的关系： <a class="header-anchor" href="#与service的关系" aria-label="Permalink to &quot;与Service的关系：&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">互联网 → Ingress Controller → Ingress规则 → Service → Pod</span></span></code></pre></div><h4 id="ingress-资源定义" tabindex="-1">Ingress 资源定义： <a class="header-anchor" href="#ingress-资源定义" aria-label="Permalink to &quot;Ingress 资源定义：&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">example-ingress</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # Ingress Controller特定注解</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/rewrite-target</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/ssl-redirect</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  ingressClassName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx</span><span class="__shiki_21nrsd">  # 指定Ingress Controller</span></span>
<span class="line"><span class="__shiki_17hn0y">  tls</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">hosts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">www.example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">    secretName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">example-tls-secret</span><span class="__shiki_21nrsd">  # TLS证书</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">www.example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">    http</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      paths</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/api</span></span>
<span class="line"><span class="__shiki_17hn0y">        pathType</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Prefix</span></span>
<span class="line"><span class="__shiki_17hn0y">        backend</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          service</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">api-service</span></span>
<span class="line"><span class="__shiki_17hn0y">            port</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">              number</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/web</span></span>
<span class="line"><span class="__shiki_17hn0y">        pathType</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Prefix</span></span>
<span class="line"><span class="__shiki_17hn0y">        backend</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          service</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web-service</span></span>
<span class="line"><span class="__shiki_17hn0y">            port</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">              number</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">admin.example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">    http</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      paths</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/</span></span>
<span class="line"><span class="__shiki_17hn0y">        pathType</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Prefix</span></span>
<span class="line"><span class="__shiki_17hn0y">        backend</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          service</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">admin-service</span></span>
<span class="line"><span class="__shiki_17hn0y">            port</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">              number</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span></code></pre></div><h3 id="_3-2-主流ingress-controller" tabindex="-1">3.2 主流Ingress Controller <a class="header-anchor" href="#_3-2-主流ingress-controller" aria-label="Permalink to &quot;3.2 主流Ingress Controller&quot;">​</a></h3><h4 id="_1-nginx-ingress-controller" tabindex="-1">1. Nginx Ingress Controller <a class="header-anchor" href="#_1-nginx-ingress-controller" aria-label="Permalink to &quot;1. Nginx Ingress Controller&quot;">​</a></h4><p><strong>最流行的Ingress Controller</strong></p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 安装（使用Helm）</span></span>
<span class="line"><span class="__shiki_mdbnqw">helm upgrade --install ingress-nginx ingress-nginx \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  --repo https://kubernetes.github.io/ingress-nginx \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  --namespace ingress-nginx --create-namespace</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 高级配置示例</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx-ingress</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 负载均衡配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/load-balance</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;ip_hash&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/upstream-hash-by</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;$remote_addr&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 限流配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/limit-connections</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/limit-rps</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 认证配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/auth-type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">basic</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/auth-secret</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">basic-auth</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/auth-realm</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Authentication Required&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # CORS配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/enable-cors</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/cors-allow-origin</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;*&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 重写规则</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/rewrite-target</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/$2</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/use-regex</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSL配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/backend-protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;HTTPS&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/force-ssl-redirect</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span></code></pre></div><h4 id="_2-traefik-ingress-controller" tabindex="-1">2. Traefik Ingress Controller <a class="header-anchor" href="#_2-traefik-ingress-controller" aria-label="Permalink to &quot;2. Traefik Ingress Controller&quot;">​</a></h4><p><strong>云原生动态路由</strong></p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Traefik IngressRoute (CRD方式)</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">traefik.containo.us/v1alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">IngressRoute</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">traefik-route</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  entryPoints</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">web</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">websecure</span></span>
<span class="line"><span class="__shiki_17hn0y">  routes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">match</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Host(\`www.example.com\`) &amp;&amp; PathPrefix(\`/api\`)</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Rule</span></span>
<span class="line"><span class="__shiki_17hn0y">    services</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">api-service</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_17hn0y">    middlewares</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rate-limit</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">auth</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">match</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Host(\`www.example.com\`) &amp;&amp; PathPrefix(\`/web\`)</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Rule</span></span>
<span class="line"><span class="__shiki_17hn0y">    services</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web-service</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # TLS配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  tls</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    secretName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">example-tls</span></span>
<span class="line"><span class="__shiki_17hn0y">    options</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">      namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span></code></pre></div><h4 id="_3-aws-alb-ingress-controller" tabindex="-1">3. AWS ALB Ingress Controller <a class="header-anchor" href="#_3-aws-alb-ingress-controller" aria-label="Permalink to &quot;3. AWS ALB Ingress Controller&quot;">​</a></h4><p><strong>AWS云原生集成</strong></p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">extensions/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">alb-ingress</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # ALB特定配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    alb.ingress.kubernetes.io/scheme</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">internet-facing</span></span>
<span class="line"><span class="__shiki_17hn0y">    alb.ingress.kubernetes.io/target-type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ip</span><span class="__shiki_21nrsd">  # ip 或 instance</span></span>
<span class="line"><span class="__shiki_17hn0y">    alb.ingress.kubernetes.io/listen-ports</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;[{&quot;HTTP&quot;: 80}, {&quot;HTTPS&quot;:443}]&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    alb.ingress.kubernetes.io/certificate-arn</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">arn:aws:acm...</span></span>
<span class="line"><span class="__shiki_17hn0y">    alb.ingress.kubernetes.io/ssl-policy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ELBSecurityPolicy-TLS-1-2-2017-01</span></span>
<span class="line"><span class="__shiki_17hn0y">    alb.ingress.kubernetes.io/healthcheck-path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/health</span></span>
<span class="line"><span class="__shiki_17hn0y">    alb.ingress.kubernetes.io/healthcheck-port</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">traffic-port</span></span>
<span class="line"><span class="__shiki_17hn0y">    alb.ingress.kubernetes.io/actions.ssl-redirect</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      {&quot;Type&quot;: &quot;redirect&quot;, &quot;RedirectConfig&quot;: {&quot;Protocol&quot;: &quot;HTTPS&quot;, &quot;Port&quot;: &quot;443&quot;, &quot;StatusCode&quot;: &quot;HTTP_301&quot;}}</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">www.example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">    http</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      paths</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/*</span></span>
<span class="line"><span class="__shiki_17hn0y">        backend</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          serviceName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ssl-redirect</span></span>
<span class="line"><span class="__shiki_17hn0y">          servicePort</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">use-annotation</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/*</span></span>
<span class="line"><span class="__shiki_17hn0y">        backend</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          serviceName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web-service</span></span>
<span class="line"><span class="__shiki_17hn0y">          servicePort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span></code></pre></div><h3 id="_3-3-ingress-高级特性" tabindex="-1">3.3 Ingress 高级特性 <a class="header-anchor" href="#_3-3-ingress-高级特性" aria-label="Permalink to &quot;3.3 Ingress 高级特性&quot;">​</a></h3><h4 id="_1-路径匹配策略" tabindex="-1">1. 路径匹配策略 <a class="header-anchor" href="#_1-路径匹配策略" aria-label="Permalink to &quot;1. 路径匹配策略&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">http</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      paths</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/exact</span></span>
<span class="line"><span class="__shiki_17hn0y">        pathType</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Exact</span><span class="__shiki_21nrsd">     # 精确匹配 /exact</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/prefix</span></span>
<span class="line"><span class="__shiki_17hn0y">        pathType</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Prefix</span><span class="__shiki_21nrsd">    # 前缀匹配 /prefix, /prefix/xxx</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/regex.*\\.html</span></span>
<span class="line"><span class="__shiki_17hn0y">        pathType</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ImplementationSpecific</span><span class="__shiki_21nrsd">  # 依赖于Ingress Controller</span></span></code></pre></div><h4 id="_2-默认后端" tabindex="-1">2. 默认后端 <a class="header-anchor" href="#_2-默认后端" aria-label="Permalink to &quot;2. 默认后端&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  defaultBackend</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    service</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default-service</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        number</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span></code></pre></div><h4 id="_3-通配符主机" tabindex="-1">3. 通配符主机 <a class="header-anchor" href="#_3-通配符主机" aria-label="Permalink to &quot;3. 通配符主机&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;*.example.com&quot;</span><span class="__shiki_21nrsd">  # 通配符子域名</span></span>
<span class="line"><span class="__shiki_17hn0y">    http</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      paths</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/</span></span>
<span class="line"><span class="__shiki_17hn0y">        pathType</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Prefix</span></span>
<span class="line"><span class="__shiki_17hn0y">        backend</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">...</span></span></code></pre></div><h3 id="_3-4-ingress-与-tls" tabindex="-1">3.4 Ingress 与 TLS <a class="header-anchor" href="#_3-4-ingress-与-tls" aria-label="Permalink to &quot;3.4 Ingress 与 TLS&quot;">​</a></h3><h4 id="tls证书管理" tabindex="-1">TLS证书管理： <a class="header-anchor" href="#tls证书管理" aria-label="Permalink to &quot;TLS证书管理：&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 创建TLS Secret</span></span>
<span class="line"><span class="__shiki_mdbnqw">kubectl create secret tls example-tls \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  --key tls.key \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  --cert tls.crt</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 或从Let&#39;s Encrypt自动获取（使用cert-manager）</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cert-manager.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Certificate</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">example-com</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  secretName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">example-tls</span></span>
<span class="line"><span class="__shiki_17hn0y">  dnsNames</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">www.example.com</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">api.example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">  issuerRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">letsencrypt-prod</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ClusterIssuer</span></span></code></pre></div><h2 id="四、gateway-api-下一代服务暴露" tabindex="-1">四、Gateway API：下一代服务暴露 <a class="header-anchor" href="#四、gateway-api-下一代服务暴露" aria-label="Permalink to &quot;四、Gateway API：下一代服务暴露&quot;">​</a></h2><h3 id="_4-1-gateway-api-与-ingress-对比" tabindex="-1">4.1 Gateway API 与 Ingress 对比 <a class="header-anchor" href="#_4-1-gateway-api-与-ingress-对比" aria-label="Permalink to &quot;4.1 Gateway API 与 Ingress 对比&quot;">​</a></h3><table tabindex="0"><thead><tr><th>特性</th><th>Ingress</th><th>Gateway API</th></tr></thead><tbody><tr><td>设计目标</td><td>简单HTTP路由</td><td>通用L4-L7路由</td></tr><tr><td>扩展性</td><td>依赖注解</td><td>原生可扩展</td></tr><tr><td>职责分离</td><td>单一资源</td><td>多层资源模型</td></tr><tr><td>TLS管理</td><td>基本支持</td><td>高级管理</td></tr><tr><td>协议支持</td><td>主要HTTP</td><td>HTTP, TCP, UDP, TLS等</td></tr><tr><td>参考实现</td><td>多种Controller</td><td>标准化实现</td></tr></tbody></table><h3 id="_4-2-gateway-api-核心资源" tabindex="-1">4.2 Gateway API 核心资源 <a class="header-anchor" href="#_4-2-gateway-api-核心资源" aria-label="Permalink to &quot;4.2 Gateway API 核心资源&quot;">​</a></h3><h4 id="_1-gatewayclass" tabindex="-1">1. GatewayClass <a class="header-anchor" href="#_1-gatewayclass" aria-label="Permalink to &quot;1. GatewayClass&quot;">​</a></h4><p>定义网关实现类型</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gateway.networking.k8s.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">GatewayClass</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">public-gateway</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  controllerName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">example.com/gateway-controller</span></span>
<span class="line"><span class="__shiki_17hn0y">  parametersRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">public-gateway-params</span></span>
<span class="line"><span class="__shiki_17hn0y">    group</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">GatewayClassConfig</span></span></code></pre></div><h4 id="_2-gateway" tabindex="-1">2. Gateway <a class="header-anchor" href="#_2-gateway" aria-label="Permalink to &quot;2. Gateway&quot;">​</a></h4><p>网关实例配置</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gateway.networking.k8s.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Gateway</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">internet-gateway</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  gatewayClassName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">public-gateway</span></span>
<span class="line"><span class="__shiki_17hn0y">  listeners</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http</span></span>
<span class="line"><span class="__shiki_17hn0y">    port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_17hn0y">    protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HTTP</span></span>
<span class="line"><span class="__shiki_17hn0y">    allowedRoutes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      namespaces</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        from</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">All</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">https</span></span>
<span class="line"><span class="__shiki_17hn0y">    port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">443</span></span>
<span class="line"><span class="__shiki_17hn0y">    protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HTTPS</span></span>
<span class="line"><span class="__shiki_17hn0y">    tls</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Terminate</span></span>
<span class="line"><span class="__shiki_17hn0y">      certificateRefs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">example-com</span></span>
<span class="line"><span class="__shiki_17hn0y">    allowedRoutes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      namespaces</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        from</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Selector</span></span>
<span class="line"><span class="__shiki_17hn0y">        selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span></code></pre></div><h4 id="_3-httproute" tabindex="-1">3. HTTPRoute <a class="header-anchor" href="#_3-httproute" aria-label="Permalink to &quot;3. HTTPRoute&quot;">​</a></h4><p>HTTP路由规则</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gateway.networking.k8s.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HTTPRoute</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http-route</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  parentRefs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">internet-gateway</span></span>
<span class="line"><span class="__shiki_17hn0y">    namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">  hostnames</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">&quot;www.example.com&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">&quot;api.example.com&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">matches</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">path</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PathPrefix</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/api</span></span>
<span class="line"><span class="__shiki_17hn0y">    backendRefs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">api-service</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_17hn0y">      weight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">90</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">api-canary</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_17hn0y">      weight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">matches</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">headers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Exact</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">version</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v2</span></span>
<span class="line"><span class="__shiki_17hn0y">    backendRefs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">api-v2</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span></code></pre></div><h4 id="_4-tcproute" tabindex="-1">4. TCPRoute <a class="header-anchor" href="#_4-tcproute" aria-label="Permalink to &quot;4. TCPRoute&quot;">​</a></h4><p>TCP路由规则</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gateway.networking.k8s.io/v1alpha2</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCPRoute</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">tcp-route</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  parentRefs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">internet-gateway</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">backendRefs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">database-service</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5432</span></span></code></pre></div><h2 id="五、高级服务暴露策略" tabindex="-1">五、高级服务暴露策略 <a class="header-anchor" href="#五、高级服务暴露策略" aria-label="Permalink to &quot;五、高级服务暴露策略&quot;">​</a></h2><h3 id="_5-1-金丝雀发布-canary-release" tabindex="-1">5.1 金丝雀发布（Canary Release） <a class="header-anchor" href="#_5-1-金丝雀发布-canary-release" aria-label="Permalink to &quot;5.1 金丝雀发布（Canary Release）&quot;">​</a></h3><h4 id="使用service实现" tabindex="-1">使用Service实现： <a class="header-anchor" href="#使用service实现" aria-label="Permalink to &quot;使用Service实现：&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 主服务</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">main-service</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">my-app</span></span>
<span class="line"><span class="__shiki_17hn0y">    version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">stable</span></span>
<span class="line"><span class="__shiki_17hn0y">  ports</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">...</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 金丝雀服务</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">canary-service</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">my-app</span></span>
<span class="line"><span class="__shiki_17hn0y">    version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">canary</span></span>
<span class="line"><span class="__shiki_17hn0y">  ports</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">...</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Ingress路由（Nginx示例）</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">canary-ingress</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/canary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/canary-weight</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10&quot;</span><span class="__shiki_21nrsd">  # 10%流量</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 或基于header</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/canary-by-header</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;X-Canary&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/canary-by-header-value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;always&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 或基于cookie</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/canary-by-cookie</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;canary&quot;</span></span></code></pre></div><h4 id="使用istio实现" tabindex="-1">使用Istio实现： <a class="header-anchor" href="#使用istio实现" aria-label="Permalink to &quot;使用Istio实现：&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">VirtualService</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">canary-vs</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  hosts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">myapp.example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">  http</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">match</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">headers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        endpoint</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          exact</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">canary</span></span>
<span class="line"><span class="__shiki_17hn0y">    route</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">destination</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp-canary</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">route</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">destination</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp-stable</span></span>
<span class="line"><span class="__shiki_17hn0y">      weight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">90</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">destination</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp-canary</span></span>
<span class="line"><span class="__shiki_17hn0y">      weight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span></code></pre></div><h3 id="_5-2-蓝绿部署" tabindex="-1">5.2 蓝绿部署 <a class="header-anchor" href="#_5-2-蓝绿部署" aria-label="Permalink to &quot;5.2 蓝绿部署&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 蓝环境服务</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">blue-green-service</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">my-app</span></span>
<span class="line"><span class="__shiki_17hn0y">    version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">blue</span><span class="__shiki_21nrsd">  # 切换到green进行切换</span></span>
<span class="line"><span class="__shiki_17hn0y">  ports</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">...</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用Ingress切换</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">blue-green-ingress</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp.example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">    http</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      paths</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/</span></span>
<span class="line"><span class="__shiki_17hn0y">        pathType</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Prefix</span></span>
<span class="line"><span class="__shiki_17hn0y">        backend</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          service</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">blue-service</span><span class="__shiki_21nrsd">  # 改为green-service</span></span>
<span class="line"><span class="__shiki_17hn0y">            port</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">              number</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span></code></pre></div><h3 id="_5-3-多集群服务暴露" tabindex="-1">5.3 多集群服务暴露 <a class="header-anchor" href="#_5-3-多集群服务暴露" aria-label="Permalink to &quot;5.3 多集群服务暴露&quot;">​</a></h3><h4 id="使用submariner-跨集群网络" tabindex="-1">使用Submariner（跨集群网络）： <a class="header-anchor" href="#使用submariner-跨集群网络" aria-label="Permalink to &quot;使用Submariner（跨集群网络）：&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 在集群A中创建ServiceExport</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">lighthouse.submariner.io/v2alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ServiceExport</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cross-cluster-service</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 在集群B中访问</span></span>
<span class="line"><span class="__shiki_21nrsd"># 通过 &lt;service-name&gt;.&lt;namespace&gt;.svc.clusterset.local 访问</span></span></code></pre></div><h4 id="使用kubernetes-federation" tabindex="-1">使用Kubernetes Federation： <a class="header-anchor" href="#使用kubernetes-federation" aria-label="Permalink to &quot;使用Kubernetes Federation：&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">types.kubefed.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">FederatedService</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">federated-service</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  placement</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    clusterSelector</span><span class="__shiki_140thh">: {}</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">LoadBalancer</span></span>
<span class="line"><span class="__shiki_17hn0y">      ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_17hn0y">        targetPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_17hn0y">  overrides</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">clusterName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cluster-asia</span></span>
<span class="line"><span class="__shiki_17hn0y">    clusterOverrides</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/spec/type&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NodePort</span></span></code></pre></div><h3 id="_5-4-服务网格-service-mesh-集成" tabindex="-1">5.4 服务网格（Service Mesh）集成 <a class="header-anchor" href="#_5-4-服务网格-service-mesh-集成" aria-label="Permalink to &quot;5.4 服务网格（Service Mesh）集成&quot;">​</a></h3><h4 id="istio-gateway" tabindex="-1">Istio Gateway： <a class="header-anchor" href="#istio-gateway" aria-label="Permalink to &quot;Istio Gateway：&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Gateway</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">public-gateway</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    istio</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ingressgateway</span></span>
<span class="line"><span class="__shiki_17hn0y">  servers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">port</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      number</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http</span></span>
<span class="line"><span class="__shiki_17hn0y">      protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HTTP</span></span>
<span class="line"><span class="__shiki_17hn0y">    hosts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">&quot;*&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    tls</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      httpsRedirect</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">port</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      number</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">443</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">https</span></span>
<span class="line"><span class="__shiki_17hn0y">      protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HTTPS</span></span>
<span class="line"><span class="__shiki_17hn0y">    hosts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">&quot;*&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    tls</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">SIMPLE</span></span>
<span class="line"><span class="__shiki_17hn0y">      credentialName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">istio-ingressgateway-certs</span></span></code></pre></div><h2 id="六、网络策略与安全" tabindex="-1">六、网络策略与安全 <a class="header-anchor" href="#六、网络策略与安全" aria-label="Permalink to &quot;六、网络策略与安全&quot;">​</a></h2><h3 id="_6-1-networkpolicy-网络策略" tabindex="-1">6.1 NetworkPolicy（网络策略） <a class="header-anchor" href="#_6-1-networkpolicy-网络策略" aria-label="Permalink to &quot;6.1 NetworkPolicy（网络策略）&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">api-network-policy</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">api</span></span>
<span class="line"><span class="__shiki_17hn0y">  policyTypes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Egress</span></span>
<span class="line"><span class="__shiki_17hn0y">  ingress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">namespaceSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend-namespace</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">ipBlock</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        cidr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10.244.0.0/16</span></span>
<span class="line"><span class="__shiki_17hn0y">        except</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">10.244.1.0/24</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_17hn0y">  egress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">database</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5432</span></span></code></pre></div><h3 id="_6-2-服务网格安全策略" tabindex="-1">6.2 服务网格安全策略 <a class="header-anchor" href="#_6-2-服务网格安全策略" aria-label="Permalink to &quot;6.2 服务网格安全策略&quot;">​</a></h3><h4 id="istio-authorizationpolicy" tabindex="-1">Istio AuthorizationPolicy： <a class="header-anchor" href="#istio-authorizationpolicy" aria-label="Permalink to &quot;Istio AuthorizationPolicy：&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AuthorizationPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">require-jwt</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">api</span></span>
<span class="line"><span class="__shiki_17hn0y">  action</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ALLOW</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">source</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        requestPrincipals</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">operation</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        methods</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;GET&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">        paths</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;/public/*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">source</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        requestPrincipals</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;accounts.google.com/*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">operation</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        methods</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;GET&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;POST&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">        paths</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;/api/*&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h2 id="七、监控与可观测性" tabindex="-1">七、监控与可观测性 <a class="header-anchor" href="#七、监控与可观测性" aria-label="Permalink to &quot;七、监控与可观测性&quot;">​</a></h2><h3 id="_7-1-服务监控指标" tabindex="-1">7.1 服务监控指标 <a class="header-anchor" href="#_7-1-服务监控指标" aria-label="Permalink to &quot;7.1 服务监控指标&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Prometheus ServiceMonitor</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">monitoring.coreos.com/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ServiceMonitor</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web-service-monitor</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web</span></span>
<span class="line"><span class="__shiki_17hn0y">  endpoints</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">port</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http</span></span>
<span class="line"><span class="__shiki_17hn0y">    interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">30s</span></span>
<span class="line"><span class="__shiki_17hn0y">    path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/metrics</span></span>
<span class="line"><span class="__shiki_17hn0y">    relabelings</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">sourceLabels</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">__meta_kubernetes_pod_name</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">      targetLabel</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">pod</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespaceSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    any</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span></code></pre></div><h3 id="_7-2-服务拓扑图" tabindex="-1">7.2 服务拓扑图 <a class="header-anchor" href="#_7-2-服务拓扑图" aria-label="Permalink to &quot;7.2 服务拓扑图&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Kiali配置示例（Istio环境）</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kiali.io/v1alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Kiali</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kiali</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  auth</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    strategy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">openid</span></span>
<span class="line"><span class="__shiki_17hn0y">  deployment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    accessible_namespaces</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">&quot;**&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    ingress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">      override_yaml</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            nginx.ingress.kubernetes.io/ssl-redirect</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span></code></pre></div><h2 id="八、最佳实践总结" tabindex="-1">八、最佳实践总结 <a class="header-anchor" href="#八、最佳实践总结" aria-label="Permalink to &quot;八、最佳实践总结&quot;">​</a></h2><h3 id="_8-1-选择策略的决策树" tabindex="-1">8.1 选择策略的决策树 <a class="header-anchor" href="#_8-1-选择策略的决策树" aria-label="Permalink to &quot;8.1 选择策略的决策树&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">需要暴露服务吗？</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">是 → 访问来源？</span></span>
<span class="line"><span class="__shiki_wvjl67">        ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">        集群内 → ClusterIP（无头服务用于有状态应用）</span></span>
<span class="line"><span class="__shiki_wvjl67">        ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">        特定节点 → NodePort（开发测试）</span></span>
<span class="line"><span class="__shiki_wvjl67">        ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">        公网访问 → 需要高级路由？</span></span>
<span class="line"><span class="__shiki_wvjl67">            ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">            否 → LoadBalancer（云环境）</span></span>
<span class="line"><span class="__shiki_wvjl67">            ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">            是 → Ingress（HTTP/HTTPS）</span></span>
<span class="line"><span class="__shiki_wvjl67">                ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">                需要现代API → Gateway API（未来标准）</span></span>
<span class="line"><span class="__shiki_wvjl67">                ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">                需要微服务治理 → 服务网格（Istio/Linkerd）</span></span></code></pre></div><h3 id="_8-2-配置模板库" tabindex="-1">8.2 配置模板库 <a class="header-anchor" href="#_8-2-配置模板库" aria-label="Permalink to &quot;8.2 配置模板库&quot;">​</a></h3><h4 id="生产级ingress配置" tabindex="-1">生产级Ingress配置： <a class="header-anchor" href="#生产级ingress配置" aria-label="Permalink to &quot;生产级Ingress配置：&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production-ingress</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 安全相关</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/enable-modsecurity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/modsecurity-snippet</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      SecRuleEngine On</span></span>
<span class="line"><span class="__shiki_mdbnqw">      SecRequestBodyAccess On</span></span>
<span class="line"><span class="__shiki_mdbnqw">      SecRule REQUEST_HEADERS:Content-Type &quot;text/xml&quot; &quot;id:&#39;200000&#39;,phase:1,t:none,t:lowercase,pass,nolog,ctl:requestBodyProcessor=XML&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      SecRule REQUEST_HEADERS:Content-Type &quot;application/x-www-form-urlencoded&quot; &quot;id:&#39;200001&#39;,phase:1,t:none,t:lowercase,pass,nolog,ctl:requestBodyProcessor=URLENCODED&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/configuration-snippet</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      more_set_headers &quot;Server: Custom&quot;;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      more_set_headers &quot;X-Content-Type-Options: nosniff&quot;;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      more_set_headers &quot;X-Frame-Options: DENY&quot;;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      more_set_headers &quot;X-XSS-Protection: 1; mode=block&quot;;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 性能优化</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/proxy-buffer-size</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;16k&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/proxy-buffers-number</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;4&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/proxy-connect-timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;30&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/proxy-read-timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;30&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/proxy-send-timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;30&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/limit-connections</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/limit-rps</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 日志配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/enable-access-log</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/access-log-path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/var/log/nginx/access.log&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/error-log-path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/var/log/nginx/error.log&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 限流配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/limit-connections</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/limit-rps</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/limit-burst-multiplier</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;5&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 健康检查</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/health-check-enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/health-check-path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/healthz&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/health-check-interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;30s&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/health-check-timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;5s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSL配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/ssl-ciphers</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/ssl-protocols</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;TLSv1.2 TLSv1.3&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/ssl-prefer-server-ciphers</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/ssl-session-tickets</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;false&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/ssl-session-timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10m&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 负载均衡算法</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/load-balance</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;ewma&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/upstream-hash-by</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;$remote_addr&quot;</span></span></code></pre></div><h3 id="_8-3-多环境策略" tabindex="-1">8.3 多环境策略 <a class="header-anchor" href="#_8-3-多环境策略" aria-label="Permalink to &quot;8.3 多环境策略&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用Kustomize overlay</span></span>
<span class="line"><span class="__shiki_21nrsd"># base/ingress.yaml</span></span>
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
<span class="line"><span class="__shiki_17hn0y">        backend</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          service</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-service</span></span>
<span class="line"><span class="__shiki_17hn0y">            port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># overlays/development/patch.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-ingress</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/ssl-redirect</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;false&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app.dev.example.com</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># overlays/production/patch.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-ingress</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    cert-manager.io/cluster-issuer</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;letsencrypt-prod&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/ssl-redirect</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nginx.ingress.kubernetes.io/whitelist-source-range</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10.0.0.0/8,192.168.0.0/16&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  tls</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">hosts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">app.prod.example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">    secretName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-tls</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app.prod.example.com</span></span></code></pre></div><h2 id="九、故障排查指南" tabindex="-1">九、故障排查指南 <a class="header-anchor" href="#九、故障排查指南" aria-label="Permalink to &quot;九、故障排查指南&quot;">​</a></h2><h3 id="_9-1-常见问题排查" tabindex="-1">9.1 常见问题排查 <a class="header-anchor" href="#_9-1-常见问题排查" aria-label="Permalink to &quot;9.1 常见问题排查&quot;">​</a></h3><table tabindex="0"><thead><tr><th>问题现象</th><th>可能原因</th><th>排查命令</th></tr></thead><tbody><tr><td>Service无法访问</td><td>1. Pod选择器不匹配<br>2. Pod端口不匹配<br>3. kube-proxy异常</td><td><code>kubectl describe svc &lt;name&gt;</code><br><code>kubectl get endpoints</code><br><code>kubectl logs -n kube-system kube-proxy-xxx</code></td></tr><tr><td>Ingress返回502</td><td>1. 后端服务不可用<br>2. 健康检查失败<br>3. Ingress配置错误</td><td><code>kubectl get ing</code><br><code>kubectl describe ing &lt;name&gt;</code><br>检查Ingress Controller日志</td></tr><tr><td>NodePort无法访问</td><td>1. 防火墙规则<br>2. 节点端口冲突<br>3. 节点网络配置</td><td><code>netstat -tlnp | grep &lt;port&gt;</code><br><code>iptables -L -n -t nat</code><br>检查云安全组规则</td></tr><tr><td>LoadBalancer状态Pending</td><td>1. 云配额不足<br>2. 子网配置问题<br>3. 云提供商限制</td><td><code>kubectl describe svc &lt;name&gt;</code><br>检查云控制台<br>检查云日志</td></tr><tr><td>DNS解析失败</td><td>1. CoreDNS异常<br>2. 网络策略限制<br>3. DNS配置错误</td><td><code>kubectl get pods -n kube-system -l k8s-app=kube-dns</code><br><code>kubectl logs -n kube-system coredns-xxx</code><br><code>dig @&lt;coredns-ip&gt; service.namespace.svc.cluster.local</code></td></tr></tbody></table><h3 id="_9-2-诊断工具集" tabindex="-1">9.2 诊断工具集 <a class="header-anchor" href="#_9-2-诊断工具集" aria-label="Permalink to &quot;9.2 诊断工具集&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 网络诊断</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_mdbnqw"> network-check</span><span class="__shiki_dzsirb"> --image=nicolaka/netshoot</span><span class="__shiki_dzsirb"> -it</span><span class="__shiki_dzsirb"> --rm</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Ingress诊断</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> ingress-nginx</span><span class="__shiki_dzsirb"> --namespace</span><span class="__shiki_mdbnqw"> ingress-nginx</span><span class="__shiki_mdbnqw"> logs</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 服务发现诊断</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_mdbnqw"> dns-check</span><span class="__shiki_dzsirb"> --image=busybox</span><span class="__shiki_dzsirb"> -it</span><span class="__shiki_dzsirb"> --rm</span><span class="__shiki_dzsirb"> --</span><span class="__shiki_mdbnqw"> nslookup</span><span class="__shiki_mdbnqw"> kubernetes.default</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 端口检查</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_mdbnqw"> port-check</span><span class="__shiki_dzsirb"> --image=alpine/socat</span><span class="__shiki_dzsirb"> -it</span><span class="__shiki_dzsirb"> --rm</span><span class="__shiki_dzsirb"> --</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  socat</span><span class="__shiki_mdbnqw"> -</span><span class="__shiki_mdbnqw"> TCP4:service-name:80</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>Kubernetes服务暴露是一个多层次、多方案的体系，从基础的Service到复杂的服务网格，每种方案都有其适用场景：</p><ol><li><strong>Service</strong>：基础的服务发现和负载均衡</li><li><strong>Ingress</strong>：HTTP/HTTPS流量的智能路由</li><li><strong>Gateway API</strong>：下一代标准化服务暴露</li><li><strong>服务网格</strong>：微服务治理的全套解决方案</li></ol><p>选择合适策略时需考虑：</p><ul><li>应用协议（HTTP/TCP/UDP）</li><li>流量规模</li><li>安全需求</li><li>团队技术栈</li><li>云环境限制</li><li>运维复杂度</li></ul><p>在生产环境中，通常会结合多种方案，如：Ingress处理南北流量，服务网格处理东西流量，辅以精细的网络策略和安全配置。</p>`,135)])])}const d=a(_,[["render",h]]);export{o as __pageData,d as default};
