import{_ as a,o as n,c as p,a as _}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"Kubernetes网络策略实现 - 详细完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"devops/container/kubernetes/network-policies.md","filePath":"devops/container/kubernetes/network-policies.md"}'),i={name:"devops/container/kubernetes/network-policies.md"};function h(l,s,c,e,t,k){return n(),p("div",null,[...s[0]||(s[0]=[_(`<h1 id="kubernetes网络策略实现-详细完整学习笔记" tabindex="-1">Kubernetes网络策略实现 - 详细完整学习笔记 <a class="header-anchor" href="#kubernetes网络策略实现-详细完整学习笔记" aria-label="Permalink to &quot;Kubernetes网络策略实现 - 详细完整学习笔记&quot;">​</a></h1><h2 id="一、网络策略基础概念" tabindex="-1">一、网络策略基础概念 <a class="header-anchor" href="#一、网络策略基础概念" aria-label="Permalink to &quot;一、网络策略基础概念&quot;">​</a></h2><h3 id="_1-1-网络策略的定义与作用" tabindex="-1">1.1 网络策略的定义与作用 <a class="header-anchor" href="#_1-1-网络策略的定义与作用" aria-label="Permalink to &quot;1.1 网络策略的定义与作用&quot;">​</a></h3><h4 id="_1-1-1-网络策略的核心价值" tabindex="-1">1.1.1 网络策略的核心价值 <a class="header-anchor" href="#_1-1-1-网络策略的核心价值" aria-label="Permalink to &quot;1.1.1 网络策略的核心价值&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">Kubernetes网络策略解决的问题：</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 零信任网络安全模型</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 微服务间的细粒度通信控制</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 南北向流量与东西向流量隔离</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 符合合规性要求（PCI-DSS、HIPAA等）</span></span>
<span class="line"><span class="__shiki_wvjl67">└── 防御横向移动攻击</span></span></code></pre></div><h4 id="_1-1-2-网络策略与传统防火墙对比" tabindex="-1">1.1.2 网络策略与传统防火墙对比 <a class="header-anchor" href="#_1-1-2-网络策略与传统防火墙对比" aria-label="Permalink to &quot;1.1.2 网络策略与传统防火墙对比&quot;">​</a></h4><table tabindex="0"><thead><tr><th>特性</th><th>传统防火墙</th><th>Kubernetes网络策略</th></tr></thead><tbody><tr><td>控制维度</td><td>IP地址/端口</td><td>Pod标签/命名空间</td></tr><tr><td>动态性</td><td>静态配置</td><td>动态跟随Pod</td></tr><tr><td>粒度</td><td>主机/网络级别</td><td>Pod级别</td></tr><tr><td>管理方式</td><td>集中式</td><td>声明式</td></tr><tr><td>可见性</td><td>有限</td><td>完整服务网格</td></tr></tbody></table><h3 id="_1-2-网络策略api演进" tabindex="-1">1.2 网络策略API演进 <a class="header-anchor" href="#_1-2-网络策略api演进" aria-label="Permalink to &quot;1.2 网络策略API演进&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># v1版本（稳定版本）</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">network-policy-v1</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web</span></span>
<span class="line"><span class="__shiki_17hn0y">  policyTypes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Egress</span></span>
<span class="line"><span class="__shiki_17hn0y">  ingress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          role</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># extensions/v1beta1（已弃用）</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">extensions/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">legacy-policy</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 旧API，不建议使用</span></span></code></pre></div><h2 id="二、网络策略核心组件" tabindex="-1">二、网络策略核心组件 <a class="header-anchor" href="#二、网络策略核心组件" aria-label="Permalink to &quot;二、网络策略核心组件&quot;">​</a></h2><h3 id="_2-1-网络策略模型" tabindex="-1">2.1 网络策略模型 <a class="header-anchor" href="#_2-1-网络策略模型" aria-label="Permalink to &quot;2.1 网络策略模型&quot;">​</a></h3><h4 id="_2-1-1-基础架构模型" tabindex="-1">2.1.1 基础架构模型 <a class="header-anchor" href="#_2-1-1-基础架构模型" aria-label="Permalink to &quot;2.1.1 基础架构模型&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│               Kubernetes网络策略架构                 │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 1. 控制平面                                         │</span></span>
<span class="line"><span class="__shiki_wvjl67">│    ├── API Server（接收策略定义）                   │</span></span>
<span class="line"><span class="__shiki_wvjl67">│    ├── Controller Manager（策略分发）               │</span></span>
<span class="line"><span class="__shiki_wvjl67">│    └── CNI插件控制器（策略转换）                    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│                                                    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 2. 数据平面                                         │</span></span>
<span class="line"><span class="__shiki_wvjl67">│    ├── CNI插件实现（Calico、Cilium等）              │</span></span>
<span class="line"><span class="__shiki_wvjl67">│    ├── Linux内核（iptables/ebpf/nftables）         │</span></span>
<span class="line"><span class="__shiki_wvjl67">│    └── Pod网络命名空间（veth pairs）               │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────────┘</span></span></code></pre></div><h4 id="_2-1-2-策略选择器类型" tabindex="-1">2.1.2 策略选择器类型 <a class="header-anchor" href="#_2-1-2-策略选择器类型" aria-label="Permalink to &quot;2.1.2 策略选择器类型&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 选择器示例</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 1. Pod选择器（必需）</span></span>
<span class="line"><span class="__shiki_17hn0y">  podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">database</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchExpressions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">environment</span></span>
<span class="line"><span class="__shiki_17hn0y">      operator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">In</span></span>
<span class="line"><span class="__shiki_17hn0y">      values</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">production</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">staging</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 2. 命名空间选择器（可选）</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespaceSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      project</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">microservices</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 3. IP块选择器（可选）</span></span>
<span class="line"><span class="__shiki_17hn0y">  ipBlock</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    cidr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">172.17.0.0/16</span></span>
<span class="line"><span class="__shiki_17hn0y">    except</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">172.17.1.0/24</span></span></code></pre></div><h3 id="_2-2-网络策略规则结构" tabindex="-1">2.2 网络策略规则结构 <a class="header-anchor" href="#_2-2-网络策略规则结构" aria-label="Permalink to &quot;2.2 网络策略规则结构&quot;">​</a></h3><h4 id="_2-2-1-ingress规则详解" tabindex="-1">2.2.1 Ingress规则详解 <a class="header-anchor" href="#_2-2-1-ingress规则详解" aria-label="Permalink to &quot;2.2.1 Ingress规则详解&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">detailed-ingress-policy</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">api-server</span></span>
<span class="line"><span class="__shiki_17hn0y">  policyTypes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  ingress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 规则1：允许来自特定Pod的流量</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          component</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">UDP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">53</span></span>
<span class="line"><span class="__shiki_17hn0y">      endPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">55</span><span class="__shiki_21nrsd">  # 端口范围（Kubernetes 1.22+）</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 规则2：允许来自特定命名空间的流量</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">namespaceSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">monitoring</span></span>
<span class="line"><span class="__shiki_17hn0y">      podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">prometheus</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">9090</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 规则3：允许来自特定IP段的流量</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">ipBlock</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        cidr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10.0.0.0/24</span></span>
<span class="line"><span class="__shiki_17hn0y">        except</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">10.0.0.128/25</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">443</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 规则4：允许所有来源的特定端口（开放公共服务）</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 注意：没有from字段表示允许所有来源</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 规则5：多个来源组合（逻辑OR）</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">legacy-app</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">namespaceSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          env</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">development</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">ipBlock</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        cidr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">192.168.1.0/24</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3306</span></span></code></pre></div><h4 id="_2-2-2-egress规则详解" tabindex="-1">2.2.2 Egress规则详解 <a class="header-anchor" href="#_2-2-2-egress规则详解" aria-label="Permalink to &quot;2.2.2 Egress规则详解&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">detailed-egress-policy</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">data-processor</span></span>
<span class="line"><span class="__shiki_17hn0y">  policyTypes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Egress</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  egress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 规则1：允许访问特定服务</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">database</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5432</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 规则2：允许访问外部API</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">ipBlock</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        cidr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">142.250.189.78/32</span><span class="__shiki_21nrsd">  # Google API</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">443</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 规则3：允许DNS查询</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">namespaceSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          k8s-app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kube-dns</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">UDP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">53</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">53</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 规则4：允许访问特定CIDR范围</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">ipBlock</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        cidr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10.0.0.0/8</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_17hn0y">      endPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">90</span><span class="__shiki_21nrsd">  # 端口范围</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 规则5：允许所有出口流量（谨慎使用）</span></span>
<span class="line"><span class="__shiki_140thh">  - {}  </span><span class="__shiki_21nrsd"># 空规则表示允许所有出口</span></span></code></pre></div><h2 id="三、网络策略实现机制" tabindex="-1">三、网络策略实现机制 <a class="header-anchor" href="#三、网络策略实现机制" aria-label="Permalink to &quot;三、网络策略实现机制&quot;">​</a></h2><h3 id="_3-1-cni插件支持对比" tabindex="-1">3.1 CNI插件支持对比 <a class="header-anchor" href="#_3-1-cni插件支持对比" aria-label="Permalink to &quot;3.1 CNI插件支持对比&quot;">​</a></h3><h4 id="_3-1-1-主流cni插件网络策略支持" tabindex="-1">3.1.1 主流CNI插件网络策略支持 <a class="header-anchor" href="#_3-1-1-主流cni插件网络策略支持" aria-label="Permalink to &quot;3.1.1 主流CNI插件网络策略支持&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># CNI插件特性对比</span></span>
<span class="line"><span class="__shiki_17hn0y">cni_plugins</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  calico</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    policy_engine</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">iptables/ebpf</span></span>
<span class="line"><span class="__shiki_17hn0y">    features</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">network_policy</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">egress_policy</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">dns_policy</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">audit_logging</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">tiered_policy</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    performance</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">high</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  cilium</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    policy_engine</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ebpf</span></span>
<span class="line"><span class="__shiki_17hn0y">    features</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">network_policy</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">egress_policy</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">dns_policy</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">l7_policy</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">service_mesh</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    performance</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">very_high</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  weave</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    policy_engine</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">iptables</span></span>
<span class="line"><span class="__shiki_17hn0y">    features</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">network_policy</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">egress_policy</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">dns_policy</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">    performance</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">medium</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  flannel</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    policy_engine</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">需要Calico配合</span></span>
<span class="line"><span class="__shiki_17hn0y">    features</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">network_policy</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_21nrsd">  # 原生不支持</span></span>
<span class="line"><span class="__shiki_17hn0y">    performance</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">medium</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  kube-router</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    policy_engine</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">iptables/ipvs</span></span>
<span class="line"><span class="__shiki_17hn0y">    features</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">network_policy</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">egress_policy</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">dns_policy</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">    performance</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">high</span></span></code></pre></div><h3 id="_3-2-iptables实现原理" tabindex="-1">3.2 iptables实现原理 <a class="header-anchor" href="#_3-2-iptables实现原理" aria-label="Permalink to &quot;3.2 iptables实现原理&quot;">​</a></h3><h4 id="_3-2-1-iptables规则链结构" tabindex="-1">3.2.1 iptables规则链结构 <a class="header-anchor" href="#_3-2-1-iptables规则链结构" aria-label="Permalink to &quot;3.2.1 iptables规则链结构&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Calico iptables链结构示例</span></span>
<span class="line"><span class="__shiki_21nrsd"># 每个Pod有一个对应的链</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 输入链（Ingress）</span></span>
<span class="line"><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">filter</span></span>
<span class="line"><span class="__shiki_1t8gfj">:cali-fw-cali1234567890</span><span class="__shiki_mdbnqw"> -</span><span class="__shiki_140thh"> [0:0]  </span><span class="__shiki_21nrsd"># 每个Pod的前向链</span></span>
<span class="line"><span class="__shiki_1t8gfj">:cali-tw-cali1234567890</span><span class="__shiki_mdbnqw"> -</span><span class="__shiki_140thh"> [0:0]  </span><span class="__shiki_21nrsd"># 每个Pod的终结链</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 主链规则</span></span>
<span class="line"><span class="__shiki_1t8gfj">-A</span><span class="__shiki_mdbnqw"> cali-fw-cali1234567890</span><span class="__shiki_dzsirb"> -m</span><span class="__shiki_mdbnqw"> comment</span><span class="__shiki_dzsirb"> --comment</span><span class="__shiki_mdbnqw"> &quot;cali:1234567890&quot;</span><span class="__shiki_dzsirb"> -m</span><span class="__shiki_mdbnqw"> mark</span><span class="__shiki_dzsirb"> --mark</span><span class="__shiki_mdbnqw"> 0x0/0x10000</span><span class="__shiki_dzsirb"> -j</span><span class="__shiki_mdbnqw"> ACCEPT</span></span>
<span class="line"><span class="__shiki_1t8gfj">-A</span><span class="__shiki_mdbnqw"> cali-fw-cali1234567890</span><span class="__shiki_dzsirb"> -m</span><span class="__shiki_mdbnqw"> comment</span><span class="__shiki_dzsirb"> --comment</span><span class="__shiki_mdbnqw"> &quot;cali:1234567890&quot;</span><span class="__shiki_dzsirb"> -m</span><span class="__shiki_mdbnqw"> set</span><span class="__shiki_dzsirb"> --match-set</span><span class="__shiki_mdbnqw"> cali40-s:1234567890-ip</span><span class="__shiki_mdbnqw"> src</span><span class="__shiki_dzsirb"> -j</span><span class="__shiki_mdbnqw"> MARK</span><span class="__shiki_dzsirb"> --set-mark</span><span class="__shiki_mdbnqw"> 0x10000/0x10000</span></span>
<span class="line"><span class="__shiki_1t8gfj">-A</span><span class="__shiki_mdbnqw"> cali-fw-cali1234567890</span><span class="__shiki_dzsirb"> -m</span><span class="__shiki_mdbnqw"> comment</span><span class="__shiki_dzsirb"> --comment</span><span class="__shiki_mdbnqw"> &quot;cali:1234567890&quot;</span><span class="__shiki_dzsirb"> -j</span><span class="__shiki_mdbnqw"> MARK</span><span class="__shiki_dzsirb"> --set-mark</span><span class="__shiki_mdbnqw"> 0x0/0x10000</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 策略匹配规则</span></span>
<span class="line"><span class="__shiki_1t8gfj">-A</span><span class="__shiki_mdbnqw"> cali-pi-_abcdef</span><span class="__shiki_dzsirb"> -m</span><span class="__shiki_mdbnqw"> comment</span><span class="__shiki_dzsirb"> --comment</span><span class="__shiki_mdbnqw"> &quot;cali:abcdef&quot;</span><span class="__shiki_dzsirb"> -m</span><span class="__shiki_mdbnqw"> set</span><span class="__shiki_dzsirb"> --match-set</span><span class="__shiki_mdbnqw"> cali40-s:1234567890-ip</span><span class="__shiki_mdbnqw"> src</span><span class="__shiki_dzsirb"> -m</span><span class="__shiki_mdbnqw"> set</span><span class="__shiki_dzsirb"> --match-set</span><span class="__shiki_mdbnqw"> cali40-d:abcdef-ip</span><span class="__shiki_mdbnqw"> dst</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> tcp</span><span class="__shiki_dzsirb"> --dport</span><span class="__shiki_dzsirb"> 80</span><span class="__shiki_dzsirb"> -j</span><span class="__shiki_mdbnqw"> RETURN</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 最终决策</span></span>
<span class="line"><span class="__shiki_1t8gfj">-A</span><span class="__shiki_mdbnqw"> cali-pri-kns.default</span><span class="__shiki_dzsirb"> -m</span><span class="__shiki_mdbnqw"> comment</span><span class="__shiki_dzsirb"> --comment</span><span class="__shiki_mdbnqw"> &quot;cali:default&quot;</span><span class="__shiki_dzsirb"> -j</span><span class="__shiki_mdbnqw"> cali-pi-_abcdef</span></span></code></pre></div><h4 id="_3-2-2-iptables规则生成逻辑" tabindex="-1">3.2.2 iptables规则生成逻辑 <a class="header-anchor" href="#_3-2-2-iptables规则生成逻辑" aria-label="Permalink to &quot;3.2.2 iptables规则生成逻辑&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 网络策略到iptables规则的转换逻辑（简化示例）</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> generateIPTablesRules</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">policy</span><span class="__shiki_1t8gfj"> NetworkPolicy</span><span class="__shiki_140thh">) []</span><span class="__shiki_1t8gfj">IPTablesRule</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> rules []</span><span class="__shiki_1t8gfj">IPTablesRule</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, ingress </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> policy.Spec.Ingress {</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, rule </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> ingress.From {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 处理Pod选择器</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> rule.PodSelector </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                pods </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> getPodsBySelector</span><span class="__shiki_140thh">(rule.PodSelector)</span></span>
<span class="line"><span class="__shiki_1itgoe">                for</span><span class="__shiki_140thh"> _, pod </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> pods {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    for</span><span class="__shiki_140thh"> _, port </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> ingress.Ports {</span></span>
<span class="line"><span class="__shiki_140thh">                        rule </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> IPTablesRule</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">                            Source: pod.IP,</span></span>
<span class="line"><span class="__shiki_140thh">                            Destination: </span><span class="__shiki_1t8gfj">getTargetPods</span><span class="__shiki_140thh">(policy.Spec.PodSelector),</span></span>
<span class="line"><span class="__shiki_140thh">                            Protocol: port.Protocol,</span></span>
<span class="line"><span class="__shiki_140thh">                            Port: port.Port,</span></span>
<span class="line"><span class="__shiki_140thh">                            Action: </span><span class="__shiki_mdbnqw">&quot;ACCEPT&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                        }</span></span>
<span class="line"><span class="__shiki_140thh">                        rules </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(rules, rule)</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 处理命名空间选择器</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> rule.NamespaceSelector </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                namespaces </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> getNamespacesBySelector</span><span class="__shiki_140thh">(rule.NamespaceSelector)</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 类似逻辑...</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 处理IP块</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> rule.IPBlock </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 处理CIDR和例外</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> rules</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-3-ebpf实现原理-cilium" tabindex="-1">3.3 eBPF实现原理（Cilium） <a class="header-anchor" href="#_3-3-ebpf实现原理-cilium" aria-label="Permalink to &quot;3.3 eBPF实现原理（Cilium）&quot;">​</a></h3><h4 id="_3-3-1-ebpf策略数据结构" tabindex="-1">3.3.1 eBPF策略数据结构 <a class="header-anchor" href="#_3-3-1-ebpf策略数据结构" aria-label="Permalink to &quot;3.3.1 eBPF策略数据结构&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Cilium eBPF策略映射结构（简化）</span></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> policy_key {</span></span>
<span class="line"><span class="__shiki_140thh">    __u32    identity;</span><span class="__shiki_21nrsd">      // 源身份</span></span>
<span class="line"><span class="__shiki_140thh">    __u32    remote_id;</span><span class="__shiki_21nrsd">     // 目标身份</span></span>
<span class="line"><span class="__shiki_140thh">    __u16    dport;</span><span class="__shiki_21nrsd">         // 目标端口</span></span>
<span class="line"><span class="__shiki_140thh">    __u8     proto;</span><span class="__shiki_21nrsd">         // 协议</span></span>
<span class="line"><span class="__shiki_140thh">    __u8     pad;</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> policy_entry {</span></span>
<span class="line"><span class="__shiki_140thh">    __u8     action;</span><span class="__shiki_21nrsd">        // 允许/拒绝</span></span>
<span class="line"><span class="__shiki_140thh">    __u8     priority;</span><span class="__shiki_21nrsd">      // 优先级</span></span>
<span class="line"><span class="__shiki_140thh">    __u16    port;</span><span class="__shiki_21nrsd">          // 端口</span></span>
<span class="line"><span class="__shiki_140thh">    __u32    proxy_port;</span><span class="__shiki_21nrsd">    // 代理端口</span></span>
<span class="line"><span class="__shiki_140thh">    __u64    bytes;</span><span class="__shiki_21nrsd">         // 字节计数</span></span>
<span class="line"><span class="__shiki_140thh">    __u64    packets;</span><span class="__shiki_21nrsd">       // 包计数</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// BPF映射定义</span></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    __uint</span><span class="__shiki_140thh">(type, BPF_MAP_TYPE_HASH);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    __uint</span><span class="__shiki_140thh">(max_entries, </span><span class="__shiki_dzsirb">65536</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    __type</span><span class="__shiki_140thh">(key, </span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> policy_key);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    __type</span><span class="__shiki_140thh">(value, </span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> policy_entry);</span></span>
<span class="line"><span class="__shiki_140thh">} POLICY_MAP __section_maps_btf;</span></span></code></pre></div><h4 id="_3-3-2-ebpf网络策略程序" tabindex="-1">3.3.2 eBPF网络策略程序 <a class="header-anchor" href="#_3-3-2-ebpf网络策略程序" aria-label="Permalink to &quot;3.3.2 eBPF网络策略程序&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 入口流量处理程序</span></span>
<span class="line"><span class="__shiki_1t8gfj">SEC</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;tc&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> handle_ingress</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> __sk_buff </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">skb</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> ctx ctx </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {};</span></span>
<span class="line"><span class="__shiki_140thh">    __u32 src_identity </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    __u32 dst_identity </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 解析数据包</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">parse_packet</span><span class="__shiki_140thh">(skb, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">ctx) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> TC_ACT_OK;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取身份标识</span></span>
<span class="line"><span class="__shiki_140thh">    src_identity </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> get_identity</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">ctx, </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    dst_identity </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> get_identity</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">ctx, </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 查询策略映射</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> policy_key key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        .identity </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> src_identity,</span></span>
<span class="line"><span class="__shiki_140thh">        .remote_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> dst_identity,</span></span>
<span class="line"><span class="__shiki_140thh">        .dport </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ctx.l4_dport,</span></span>
<span class="line"><span class="__shiki_140thh">        .proto </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ctx.l4_protocol,</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> policy_entry </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">entry </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> bpf_map_lookup_elem</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">POLICY_MAP, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">key);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (entry </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> entry-&gt;action </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> ACTION_ALLOW) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 允许流量</span></span>
<span class="line"><span class="__shiki_1t8gfj">        update_stats</span><span class="__shiki_140thh">(entry);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> TC_ACT_OK;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 默认拒绝</span></span>
<span class="line"><span class="__shiki_1t8gfj">    bpf_trace_printk</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Packet denied by network policy</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> TC_ACT_SHOT;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="四、高级网络策略模式" tabindex="-1">四、高级网络策略模式 <a class="header-anchor" href="#四、高级网络策略模式" aria-label="Permalink to &quot;四、高级网络策略模式&quot;">​</a></h2><h3 id="_4-1-多层应用安全策略" tabindex="-1">4.1 多层应用安全策略 <a class="header-anchor" href="#_4-1-多层应用安全策略" aria-label="Permalink to &quot;4.1 多层应用安全策略&quot;">​</a></h3><h4 id="_4-1-1-典型三层架构策略" tabindex="-1">4.1.1 典型三层架构策略 <a class="header-anchor" href="#_4-1-1-典型三层架构策略" aria-label="Permalink to &quot;4.1.1 典型三层架构策略&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 前端层策略</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend-policy</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      tier</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend</span></span>
<span class="line"><span class="__shiki_17hn0y">  policyTypes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Egress</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  ingress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 允许外部流量</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">443</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  egress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 允许访问后端</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          tier</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">backend</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 允许DNS</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">namespaceSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          k8s-app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kube-dns</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">UDP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">53</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">53</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 后端层策略</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">backend-policy</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">api</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      tier</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">backend</span></span>
<span class="line"><span class="__shiki_17hn0y">  policyTypes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Egress</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  ingress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 只允许前端访问</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">namespaceSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">web</span></span>
<span class="line"><span class="__shiki_17hn0y">      podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          tier</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  egress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 允许访问数据库</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          tier</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">database</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5432</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 允许访问缓存</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          tier</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cache</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">6379</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 数据库层策略</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">database-policy</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">data</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      tier</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">database</span></span>
<span class="line"><span class="__shiki_17hn0y">  policyTypes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  ingress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 只允许后端访问</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">namespaceSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">api</span></span>
<span class="line"><span class="__shiki_17hn0y">      podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          tier</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">backend</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5432</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 允许管理访问</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">namespaceSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">admin</span></span>
<span class="line"><span class="__shiki_17hn0y">      podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">database-admin</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5432</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5433</span><span class="__shiki_21nrsd">  # 管理端口</span></span></code></pre></div><h3 id="_4-2-命名空间隔离策略" tabindex="-1">4.2 命名空间隔离策略 <a class="header-anchor" href="#_4-2-命名空间隔离策略" aria-label="Permalink to &quot;4.2 命名空间隔离策略&quot;">​</a></h3><h4 id="_4-2-1-命名空间级默认策略" tabindex="-1">4.2.1 命名空间级默认策略 <a class="header-anchor" href="#_4-2-1-命名空间级默认策略" aria-label="Permalink to &quot;4.2.1 命名空间级默认策略&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 默认拒绝所有入站流量</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default-deny-ingress</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  podSelector</span><span class="__shiki_140thh">: {}  </span><span class="__shiki_21nrsd"># 空选择器匹配所有Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">  policyTypes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 没有ingress规则，所以所有入站流量都被拒绝</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 默认拒绝所有出站流量</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default-deny-egress</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  podSelector</span><span class="__shiki_140thh">: {}</span></span>
<span class="line"><span class="__shiki_17hn0y">  policyTypes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Egress</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 没有egress规则，所以所有出站流量都被拒绝</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 允许必要的出站流量</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">allow-essential-egress</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  podSelector</span><span class="__shiki_140thh">: {}</span></span>
<span class="line"><span class="__shiki_17hn0y">  policyTypes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Egress</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  egress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # DNS访问</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">namespaceSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          k8s-app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kube-dns</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">UDP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">53</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">53</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # Kubernetes API</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">namespaceSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kube-system</span></span>
<span class="line"><span class="__shiki_17hn0y">      podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          component</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kube-apiserver</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">443</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 节点端口范围（NodePort服务）</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30000</span></span>
<span class="line"><span class="__shiki_17hn0y">      endPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">32767</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 允许访问互联网（谨慎使用）</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">ipBlock</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        cidr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">0.0.0.0/0</span></span>
<span class="line"><span class="__shiki_17hn0y">        except</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">10.0.0.0/8</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">172.16.0.0/12</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">192.168.0.0/16</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">443</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span></code></pre></div><h3 id="_4-3-服务网格集成策略" tabindex="-1">4.3 服务网格集成策略 <a class="header-anchor" href="#_4-3-服务网格集成策略" aria-label="Permalink to &quot;4.3 服务网格集成策略&quot;">​</a></h3><h4 id="_4-3-1-istio与网络策略集成" tabindex="-1">4.3.1 Istio与网络策略集成 <a class="header-anchor" href="#_4-3-1-istio与网络策略集成" aria-label="Permalink to &quot;4.3.1 Istio与网络策略集成&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Istio Sidecar注入命名空间策略</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">istio-sidecar-policy</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">mesh-enabled</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 匹配所有注入sidecar的Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">      sidecar.istio.io/inject</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  policyTypes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Egress</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  ingress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 允许所有入口流量（由Istio控制）</span></span>
<span class="line"><span class="__shiki_140thh">  - {}</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  egress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 允许出站到所有服务</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">namespaceSelector</span><span class="__shiki_140thh">: {}  </span><span class="__shiki_21nrsd"># 所有命名空间</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 允许访问Istio控制平面</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">namespaceSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          istio-injection</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">enabled</span></span>
<span class="line"><span class="__shiki_17hn0y">      podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          istio</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">pilot</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">15010</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">15011</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">15012</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_21nrsd"># 网格外服务访问策略</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">mesh-external-egress</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">mesh-enabled</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      sidecar.istio.io/inject</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  policyTypes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Egress</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  egress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 允许访问外部服务</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">ipBlock</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        cidr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">34.107.204.206/32</span><span class="__shiki_21nrsd">  # 外部API</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">443</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 允许访问ServiceEntry定义的服务</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          istio.io/external-service</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span></code></pre></div><h2 id="五、网络策略最佳实践" tabindex="-1">五、网络策略最佳实践 <a class="header-anchor" href="#五、网络策略最佳实践" aria-label="Permalink to &quot;五、网络策略最佳实践&quot;">​</a></h2><h3 id="_5-1-策略设计与实施流程" tabindex="-1">5.1 策略设计与实施流程 <a class="header-anchor" href="#_5-1-策略设计与实施流程" aria-label="Permalink to &quot;5.1 策略设计与实施流程&quot;">​</a></h3><h4 id="_5-1-1-策略设计方法论" tabindex="-1">5.1.1 策略设计方法论 <a class="header-anchor" href="#_5-1-1-策略设计方法论" aria-label="Permalink to &quot;5.1.1 策略设计方法论&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 策略设计工作流程</span></span>
<span class="line"><span class="__shiki_17hn0y">workflow</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  phases</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">discovery</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        tasks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">资产发现：识别所有Pod和服务</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">流量分析：监控实际通信模式</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">风险评估：识别敏感工作负载</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">design</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        tasks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">定义安全区域：按敏感度分组</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">制定策略规则：基于最小权限原则</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">创建策略模板：标准化策略格式</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">implementation</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        tasks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">渐进式部署：从非关键环境开始</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">监控与验证：确保策略按预期工作</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">文档化：记录策略目的和影响</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">maintenance</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        tasks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">定期审计：检查策略有效性</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">自动化测试：验证策略变更</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">持续优化：根据流量变化调整</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 策略设计模板</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{ .Name }}&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{ .Namespace }}&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    owner</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{ .Team }}&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    tier</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{ .Tier }}&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{ .Environment }}&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{ .Description }}&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    last-reviewed</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{ .Date }}&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    change-management</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;CM-{{ .ChangeId }}&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{ .App }}&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{ .Version }}&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  policyTypes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Egress</span></span>
<span class="line"><span class="__shiki_17hn0y">  ingress</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">.IngressRules | toJson</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_17hn0y">  egress</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">.EgressRules | toJson</span><span class="__shiki_140thh"> }}</span></span></code></pre></div><h4 id="_5-1-2-黄金镜像策略" tabindex="-1">5.1.2 黄金镜像策略 <a class="header-anchor" href="#_5-1-2-黄金镜像策略" aria-label="Permalink to &quot;5.1.2 黄金镜像策略&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基础安全策略模板</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">baseline-security</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{ .Namespace }}&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    security.baseline/version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1.0&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    security.baseline/enforcement</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;mandatory&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  podSelector</span><span class="__shiki_140thh">: {}  </span><span class="__shiki_21nrsd"># 应用到所有Pod</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 默认拒绝所有入站流量</span></span>
<span class="line"><span class="__shiki_17hn0y">  policyTypes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 注意：没有ingress规则</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 允许必要的出站流量</span></span>
<span class="line"><span class="__shiki_17hn0y">  egress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">UDP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">53</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">53</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">443</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_21nrsd"># 应用特定例外策略</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-specific-exceptions</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">critical-app</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 覆盖基础策略</span></span>
<span class="line"><span class="__shiki_17hn0y">  policyTypes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  ingress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span></code></pre></div><h3 id="_5-2-策略测试与验证" tabindex="-1">5.2 策略测试与验证 <a class="header-anchor" href="#_5-2-策略测试与验证" aria-label="Permalink to &quot;5.2 策略测试与验证&quot;">​</a></h3><h4 id="_5-2-1-策略验证框架" tabindex="-1">5.2.1 策略验证框架 <a class="header-anchor" href="#_5-2-1-策略验证框架" aria-label="Permalink to &quot;5.2.1 策略验证框架&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 网络策略测试规范</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test.k8s.io/v1alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NetworkPolicyTest</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">policy-validation-test</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  policies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend-to-backend</span></span>
<span class="line"><span class="__shiki_17hn0y">      policyRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">allow-frontend-backend</span></span>
<span class="line"><span class="__shiki_17hn0y">        namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  testCases</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;允许前端访问后端&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      source</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend</span></span>
<span class="line"><span class="__shiki_17hn0y">        namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">      destination</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">backend</span></span>
<span class="line"><span class="__shiki_17hn0y">        namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">      protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_17hn0y">      expected</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ALLOW</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;拒绝外部访问后端&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      source</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        ipBlock</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          cidr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">192.168.1.0/24</span></span>
<span class="line"><span class="__shiki_17hn0y">      destination</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">backend</span></span>
<span class="line"><span class="__shiki_17hn0y">        namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">      protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_17hn0y">      expected</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">DENY</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;拒绝前端访问数据库&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      source</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend</span></span>
<span class="line"><span class="__shiki_17hn0y">        namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">      destination</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">database</span></span>
<span class="line"><span class="__shiki_17hn0y">        namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">      protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5432</span></span>
<span class="line"><span class="__shiki_17hn0y">      expected</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">DENY</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">  validation</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    method</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actual-traffic</span><span class="__shiki_21nrsd">  # 或 synthetic-probes</span></span>
<span class="line"><span class="__shiki_17hn0y">    timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">30s</span></span>
<span class="line"><span class="__shiki_17hn0y">    retryCount</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span></code></pre></div><h4 id="_5-2-2-自动化测试工具" tabindex="-1">5.2.2 自动化测试工具 <a class="header-anchor" href="#_5-2-2-自动化测试工具" aria-label="Permalink to &quot;5.2.2 自动化测试工具&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># 网络策略测试脚本</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 创建测试命名空间</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_mdbnqw"> ns</span><span class="__shiki_mdbnqw"> network-policy-test</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 部署测试客户端和服务端</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> -</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">apiVersion: v1</span></span>
<span class="line"><span class="__shiki_mdbnqw">kind: Pod</span></span>
<span class="line"><span class="__shiki_mdbnqw">metadata:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  name: test-client</span></span>
<span class="line"><span class="__shiki_mdbnqw">  namespace: network-policy-test</span></span>
<span class="line"><span class="__shiki_mdbnqw">  labels:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    app: test-client</span></span>
<span class="line"><span class="__shiki_mdbnqw">spec:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  containers:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  - name: busybox</span></span>
<span class="line"><span class="__shiki_mdbnqw">    image: busybox</span></span>
<span class="line"><span class="__shiki_mdbnqw">    command: [&quot;sleep&quot;, &quot;3600&quot;]</span></span>
<span class="line"><span class="__shiki_mdbnqw">---</span></span>
<span class="line"><span class="__shiki_mdbnqw">apiVersion: v1</span></span>
<span class="line"><span class="__shiki_mdbnqw">kind: Pod</span></span>
<span class="line"><span class="__shiki_mdbnqw">metadata:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  name: test-server</span></span>
<span class="line"><span class="__shiki_mdbnqw">  namespace: network-policy-test</span></span>
<span class="line"><span class="__shiki_mdbnqw">  labels:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    app: test-server</span></span>
<span class="line"><span class="__shiki_mdbnqw">spec:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  containers:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  - name: nginx</span></span>
<span class="line"><span class="__shiki_mdbnqw">    image: nginx</span></span>
<span class="line"><span class="__shiki_mdbnqw">    ports:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    - containerPort: 80</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 等待Pod就绪</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> wait</span><span class="__shiki_dzsirb"> --for=condition=Ready</span><span class="__shiki_mdbnqw"> pod/test-client</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> network-policy-test</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> wait</span><span class="__shiki_dzsirb"> --for=condition=Ready</span><span class="__shiki_mdbnqw"> pod/test-server</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> network-policy-test</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 测试连接（策略应用前）</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;=== 策略应用前测试 ===&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> exec</span><span class="__shiki_mdbnqw"> test-client</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> network-policy-test</span><span class="__shiki_dzsirb"> --</span><span class="__shiki_mdbnqw"> nc</span><span class="__shiki_dzsirb"> -zv</span><span class="__shiki_mdbnqw"> test-server</span><span class="__shiki_dzsirb"> 80</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 应用网络策略</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> -</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">apiVersion: networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_mdbnqw">kind: NetworkPolicy</span></span>
<span class="line"><span class="__shiki_mdbnqw">metadata:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  name: test-policy</span></span>
<span class="line"><span class="__shiki_mdbnqw">  namespace: network-policy-test</span></span>
<span class="line"><span class="__shiki_mdbnqw">spec:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  podSelector:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    matchLabels:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      app: test-server</span></span>
<span class="line"><span class="__shiki_mdbnqw">  policyTypes:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  - Ingress</span></span>
<span class="line"><span class="__shiki_mdbnqw">  ingress:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  - from:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    - podSelector:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        matchLabels:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          app: test-client</span></span>
<span class="line"><span class="__shiki_mdbnqw">    ports:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    - protocol: TCP</span></span>
<span class="line"><span class="__shiki_mdbnqw">      port: 80</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 6. 测试连接（策略应用后）</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;=== 策略应用后测试 ===&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> exec</span><span class="__shiki_mdbnqw"> test-client</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> network-policy-test</span><span class="__shiki_dzsirb"> --</span><span class="__shiki_mdbnqw"> nc</span><span class="__shiki_dzsirb"> -zv</span><span class="__shiki_mdbnqw"> test-server</span><span class="__shiki_dzsirb"> 80</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 7. 清理</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> delete</span><span class="__shiki_mdbnqw"> ns</span><span class="__shiki_mdbnqw"> network-policy-test</span></span></code></pre></div><h3 id="_5-3-监控与审计" tabindex="-1">5.3 监控与审计 <a class="header-anchor" href="#_5-3-监控与审计" aria-label="Permalink to &quot;5.3 监控与审计&quot;">​</a></h3><h4 id="_5-3-1-策略监控配置" tabindex="-1">5.3.1 策略监控配置 <a class="header-anchor" href="#_5-3-1-策略监控配置" aria-label="Permalink to &quot;5.3.1 策略监控配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Prometheus网络策略指标收集</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">monitoring.coreos.com/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ServiceMonitor</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">network-policy-monitor</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">monitoring</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      k8s-app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">calico-node</span><span class="__shiki_21nrsd">  # 或cilium-agent</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespaceSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchNames</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">kube-system</span></span>
<span class="line"><span class="__shiki_17hn0y">  endpoints</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">port</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">metrics</span></span>
<span class="line"><span class="__shiki_17hn0y">    interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">30s</span></span>
<span class="line"><span class="__shiki_17hn0y">    path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/metrics</span></span>
<span class="line"><span class="__shiki_17hn0y">    metricRelabelings</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">sourceLabels</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">__name__</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">      regex</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;felix_active.*&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">      action</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">keep</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_21nrsd"># 网络策略审计配置</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">network-policy-audit</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kube-system</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  audit-policy.yaml</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">    apiVersion: audit.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_mdbnqw">    kind: Policy</span></span>
<span class="line"><span class="__shiki_mdbnqw">    rules:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    - level: RequestResponse</span></span>
<span class="line"><span class="__shiki_mdbnqw">      resources:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - group: &quot;networking.k8s.io&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        resources: [&quot;networkpolicies&quot;]</span></span>
<span class="line"><span class="__shiki_mdbnqw">      namespaces: [&quot;production&quot;, &quot;staging&quot;]</span></span>
<span class="line"><span class="__shiki_mdbnqw">      verbs: [&quot;create&quot;, &quot;update&quot;, &quot;delete&quot;, &quot;patch&quot;]</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    - level: Metadata</span></span>
<span class="line"><span class="__shiki_mdbnqw">      resources:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - group: &quot;networking.k8s.io&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        resources: [&quot;networkpolicies&quot;]</span></span>
<span class="line"><span class="__shiki_mdbnqw">      verbs: [&quot;get&quot;, &quot;list&quot;, &quot;watch&quot;]</span></span></code></pre></div><h4 id="_5-3-2-可视化仪表板" tabindex="-1">5.3.2 可视化仪表板 <a class="header-anchor" href="#_5-3-2-可视化仪表板" aria-label="Permalink to &quot;5.3.2 可视化仪表板&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;dashboard&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;title&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Network Policy Monitoring&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;panels&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">      {</span></span>
<span class="line"><span class="__shiki_dzsirb">        &quot;title&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Policy Count by Namespace&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        &quot;targets&quot;</span><span class="__shiki_140thh">: [{</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;expr&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;count(kube_networkpolicy_info) by (namespace)&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;legendFormat&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{namespace}}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        }]</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      {</span></span>
<span class="line"><span class="__shiki_dzsirb">        &quot;title&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Policy Changes&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        &quot;targets&quot;</span><span class="__shiki_140thh">: [{</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;expr&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;changes(kube_networkpolicy_created[1h])&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;legendFormat&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Policy Changes&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        }]</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      {</span></span>
<span class="line"><span class="__shiki_dzsirb">        &quot;title&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Denied Connections&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        &quot;targets&quot;</span><span class="__shiki_140thh">: [{</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;expr&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;rate(felix_policy_denied_packets_total[5m])&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;legendFormat&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{hostname}}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        }]</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      {</span></span>
<span class="line"><span class="__shiki_dzsirb">        &quot;title&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Policy Rule Count&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        &quot;targets&quot;</span><span class="__shiki_140thh">: [{</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;expr&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;sum(felix_active_policies) by (hostname)&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;legendFormat&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{hostname}}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        }]</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="六、网络策略安全模式" tabindex="-1">六、网络策略安全模式 <a class="header-anchor" href="#六、网络策略安全模式" aria-label="Permalink to &quot;六、网络策略安全模式&quot;">​</a></h2><h3 id="_6-1-零信任网络模式" tabindex="-1">6.1 零信任网络模式 <a class="header-anchor" href="#_6-1-零信任网络模式" aria-label="Permalink to &quot;6.1 零信任网络模式&quot;">​</a></h3><h4 id="_6-1-1-零信任架构实现" tabindex="-1">6.1.1 零信任架构实现 <a class="header-anchor" href="#_6-1-1-零信任架构实现" aria-label="Permalink to &quot;6.1.1 零信任架构实现&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 零信任基础策略</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">zero-trust-base</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">zero-trust</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    security.model</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">zero-trust</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  podSelector</span><span class="__shiki_140thh">: {}</span></span>
<span class="line"><span class="__shiki_17hn0y">  policyTypes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Egress</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 默认拒绝所有流量</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 没有规则，全部拒绝</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_21nrsd"># 服务特定微边界策略</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">micro-perimeter-auth-service</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">zero-trust</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">auth-service</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  policyTypes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  ingress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 精确允许的来源</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">api-gateway</span></span>
<span class="line"><span class="__shiki_17hn0y">        namespaceSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            zone</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">dmz</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8443</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_21nrsd"># 基于身份的细粒度策略</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cilium.io/v2</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">CiliumNetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">identity-based-policy</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">zero-trust</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  endpointSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">payment-service</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  ingress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">fromEndpoints</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        io.kubernetes.pod.namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">api-gateway</span></span>
<span class="line"><span class="__shiki_17hn0y">        app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">api-gateway</span></span>
<span class="line"><span class="__shiki_17hn0y">    toPorts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">port</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;9090&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        http</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">method</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;POST&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/payments&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          headers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">&quot;X-Auth-Token: *&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  egress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">toEntities</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">&quot;world&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    toPorts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">port</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;443&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span></code></pre></div><h3 id="_6-2-多租户隔离模式" tabindex="-1">6.2 多租户隔离模式 <a class="header-anchor" href="#_6-2-多租户隔离模式" aria-label="Permalink to &quot;6.2 多租户隔离模式&quot;">​</a></h3><h4 id="_6-2-1-租户网络隔离" tabindex="-1">6.2.1 租户网络隔离 <a class="header-anchor" href="#_6-2-1-租户网络隔离" aria-label="Permalink to &quot;6.2.1 租户网络隔离&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 租户命名空间隔离策略</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">tenant-isolation</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">tenant-a</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  podSelector</span><span class="__shiki_140thh">: {}</span></span>
<span class="line"><span class="__shiki_17hn0y">  policyTypes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Egress</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 允许租户内部通信</span></span>
<span class="line"><span class="__shiki_17hn0y">  ingress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">podSelector</span><span class="__shiki_140thh">: {}</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  egress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">podSelector</span><span class="__shiki_140thh">: {}</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 允许访问共享服务</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">namespaceSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          shared-service</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">443</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_21nrsd"># 共享服务策略</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">shared-service-access</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">shared-services</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">shared-service</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  policyTypes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  ingress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 允许所有租户访问</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">namespaceSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          tenant</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">443</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 允许管理访问</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">namespaceSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">admin</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">443</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">22</span></span></code></pre></div><h2 id="七、高级功能与未来演进" tabindex="-1">七、高级功能与未来演进 <a class="header-anchor" href="#七、高级功能与未来演进" aria-label="Permalink to &quot;七、高级功能与未来演进&quot;">​</a></h2><h3 id="_7-1-网络策略扩展功能" tabindex="-1">7.1 网络策略扩展功能 <a class="header-anchor" href="#_7-1-网络策略扩展功能" aria-label="Permalink to &quot;7.1 网络策略扩展功能&quot;">​</a></h3><h4 id="_7-1-1-dns策略-cilium" tabindex="-1">7.1.1 DNS策略（Cilium） <a class="header-anchor" href="#_7-1-1-dns策略-cilium" aria-label="Permalink to &quot;7.1.1 DNS策略（Cilium）&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># DNS感知的网络策略</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cilium.io/v2</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">CiliumNetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">dns-aware-policy</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  endpointSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">external-api-consumer</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  egress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 允许访问特定域名</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">toFQDNs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">matchName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;api.example.com&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">matchPattern</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;*.internal.example.com&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    toPorts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">port</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;443&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 拒绝访问其他外部域名</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">toEndpoints</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - {}</span></span>
<span class="line"><span class="__shiki_17hn0y">    toPorts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">port</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;53&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">UDP</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">port</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;53&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_21nrsd"># DNS缓存配置</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cilium-config</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kube-system</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  tofqdns-enable-poller</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  tofqdns-min-ttl</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;3600&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  tofqdns-proxy-response-ttl</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;60&quot;</span></span></code></pre></div><h4 id="_7-1-2-应用层策略-l7" tabindex="-1">7.1.2 应用层策略（L7） <a class="header-anchor" href="#_7-1-2-应用层策略-l7" aria-label="Permalink to &quot;7.1.2 应用层策略（L7）&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># HTTP感知的网络策略</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cilium.io/v2</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">CiliumNetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http-aware-policy</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  endpointSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">api-server</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  ingress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">fromEndpoints</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend</span></span>
<span class="line"><span class="__shiki_17hn0y">    toPorts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">port</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;8080&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        http</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">method</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;GET&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/api/v1/users&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          headers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">&quot;X-API-Version: ^1</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">.[0-9]+$&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">method</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;POST&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/api/v1/auth/login&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          headers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">&quot;Content-Type: application/json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  egressDeny</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 拒绝可疑的User-Agent</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">toPorts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">port</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;80&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">port</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;443&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        http</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">headers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">&quot;User-Agent: .*curl.*&quot;</span></span></code></pre></div><h3 id="_7-2-未来演进方向" tabindex="-1">7.2 未来演进方向 <a class="header-anchor" href="#_7-2-未来演进方向" aria-label="Permalink to &quot;7.2 未来演进方向&quot;">​</a></h3><h4 id="_7-2-1-策略即代码-pac" tabindex="-1">7.2.1 策略即代码（PaC） <a class="header-anchor" href="#_7-2-1-策略即代码-pac" aria-label="Permalink to &quot;7.2.1 策略即代码（PaC）&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用Rego策略语言（OPA）</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NetworkPolicyTemplate</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">compliance-policy</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  regoPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">    package kubernetes.networkpolicy</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    # 合规性规则</span></span>
<span class="line"><span class="__shiki_mdbnqw">    violation[{&quot;msg&quot;: msg}] {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        input.kind == &quot;NetworkPolicy&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        not input.spec.podSelector</span></span>
<span class="line"><span class="__shiki_mdbnqw">        msg := &quot;NetworkPolicy must have podSelector&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    violation[{&quot;msg&quot;: msg}] {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        input.kind == &quot;NetworkPolicy&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        input.metadata.namespace == &quot;production&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        count(input.spec.egress) == 0</span></span>
<span class="line"><span class="__shiki_mdbnqw">        msg := &quot;Production NetworkPolicy must have egress rules&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    # 自动生成策略</span></span>
<span class="line"><span class="__shiki_mdbnqw">    generate[&quot;networkpolicy&quot;] = policy {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        apps := {app | app := input.kubernetes.pods[_].metadata.labels.app}</span></span>
<span class="line"><span class="__shiki_mdbnqw">        policy := {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;apiVersion&quot;: &quot;networking.k8s.io/v1&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;kind&quot;: &quot;NetworkPolicy&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;metadata&quot;: {&quot;name&quot;: &quot;auto-generated&quot;},</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;spec&quot;: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;podSelector&quot;: {&quot;matchLabels&quot;: {&quot;app&quot;: apps[_]}},</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;ingress&quot;: ingress_rules,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;egress&quot;: egress_rules</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span></code></pre></div><h4 id="_7-2-2-ai驱动的自适应策略" tabindex="-1">7.2.2 AI驱动的自适应策略 <a class="header-anchor" href="#_7-2-2-ai驱动的自适应策略" aria-label="Permalink to &quot;7.2.2 AI驱动的自适应策略&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 自适应网络策略（概念）</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v2alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AdaptiveNetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ai-driven-policy</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">dynamic-app</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  learningMode</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    observationPeriod</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;24h&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    confidenceThreshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0.95</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  adaptiveRules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ingress</span></span>
<span class="line"><span class="__shiki_17hn0y">    sourcePatterns</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">anomalyDetection</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        algorithm</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">isolation_forest</span></span>
<span class="line"><span class="__shiki_17hn0y">        sensitivity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">medium</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">behaviorAnalysis</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        features</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;request_rate&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;payload_size&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;access_time&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    autoRemediation</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      quarantineDuration</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;5m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      notificationChannels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">slack</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">pagerduty</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  enforcement</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">learning_and_enforce</span><span class="__shiki_21nrsd">  # 或 monitor_only</span></span>
<span class="line"><span class="__shiki_17hn0y">    gracePeriod</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10m&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  audit</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    logAllDecisions</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    retentionPeriod</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;30d&quot;</span></span></code></pre></div><h2 id="八、故障排查与调试" tabindex="-1">八、故障排查与调试 <a class="header-anchor" href="#八、故障排查与调试" aria-label="Permalink to &quot;八、故障排查与调试&quot;">​</a></h2><h3 id="_8-1-常见问题排查" tabindex="-1">8.1 常见问题排查 <a class="header-anchor" href="#_8-1-常见问题排查" aria-label="Permalink to &quot;8.1 常见问题排查&quot;">​</a></h3><h4 id="_8-1-1-网络策略调试工具" tabindex="-1">8.1.1 网络策略调试工具 <a class="header-anchor" href="#_8-1-1-网络策略调试工具" aria-label="Permalink to &quot;8.1.1 网络策略调试工具&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># 网络策略调试脚本</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">debug_network_policy</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> POD_NAME</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33">$1</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> NAMESPACE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33">\${2</span><span class="__shiki_1itgoe">:-</span><span class="__shiki_140thh">default</span><span class="__shiki_1jdh33">}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;=== 网络策略调试: </span><span class="__shiki_140thh">$POD_NAME</span><span class="__shiki_mdbnqw"> ===&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 1. 检查Pod标签</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n1. Pod标签:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">get</span><span class="__shiki_mdbnqw"> pod</span><span class="__shiki_140thh"> $POD_NAME </span><span class="__shiki_dzsirb">--show-labels</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 2. 检查网络策略</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n2. 相关网络策略:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">get</span><span class="__shiki_mdbnqw"> networkpolicies</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 3. 检查CNI插件状态</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n3. CNI插件状态:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> kube-system</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_mdbnqw"> k8s-app=calico-node</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> kube-system</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_mdbnqw"> k8s-app=cilium</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;CNI插件未找到&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 4. 检查iptables规则</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n4. iptables规则:&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    NODE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">get</span><span class="__shiki_mdbnqw"> pod</span><span class="__shiki_140thh"> $POD_NAME </span><span class="__shiki_dzsirb">-o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.spec.nodeName}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ssh</span><span class="__shiki_140thh"> $NODE </span><span class="__shiki_mdbnqw">&quot;sudo iptables-save | grep -i cali 2&gt;/dev/null | head -20&quot;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;无法访问节点&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 5. 测试连接性</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n5. 连接性测试:&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 获取其他Pod的IP</span></span>
<span class="line"><span class="__shiki_140thh">    OTHER_POD</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.items[0].metadata.name}&#39;</span><span class="__shiki_dzsirb"> --field-selector</span><span class="__shiki_mdbnqw"> status.phase=Running</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$OTHER_POD</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> !=</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$POD_NAME</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">        OTHER_IP</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">get</span><span class="__shiki_mdbnqw"> pod</span><span class="__shiki_140thh"> $OTHER_POD </span><span class="__shiki_dzsirb">-o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.status.podIP}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;测试从 </span><span class="__shiki_140thh">$POD_NAME</span><span class="__shiki_mdbnqw"> 到 </span><span class="__shiki_140thh">$OTHER_POD</span><span class="__shiki_mdbnqw"> (</span><span class="__shiki_140thh">$OTHER_IP</span><span class="__shiki_mdbnqw">):&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">        kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">exec</span><span class="__shiki_140thh"> $POD_NAME </span><span class="__shiki_dzsirb">--</span><span class="__shiki_mdbnqw"> nc</span><span class="__shiki_dzsirb"> -zv</span><span class="__shiki_140thh"> $OTHER_IP </span><span class="__shiki_dzsirb">80</span><span class="__shiki_1itgoe"> 2&gt;&amp;1</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> echo</span><span class="__shiki_mdbnqw"> &quot;连接失败&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 6. 检查网络策略日志</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n6. 网络策略日志:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> kube-system</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_mdbnqw"> k8s-app=calico-node</span><span class="__shiki_dzsirb"> --tail=20</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_mdbnqw"> policy</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;无相关日志&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用示例</span></span>
<span class="line"><span class="__shiki_1t8gfj">debug_network_policy</span><span class="__shiki_mdbnqw"> &quot;web-app-1&quot;</span><span class="__shiki_mdbnqw"> &quot;production&quot;</span></span></code></pre></div><h4 id="_8-1-2-常见问题解决方案" tabindex="-1">8.1.2 常见问题解决方案 <a class="header-anchor" href="#_8-1-2-常见问题解决方案" aria-label="Permalink to &quot;8.1.2 常见问题解决方案&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 网络策略问题诊断矩阵</span></span>
<span class="line"><span class="__shiki_17hn0y">troubleshooting_matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  symptom</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Pod无法接收流量&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  possible_causes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">cause</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;没有匹配的NetworkPolicy允许入站流量&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      solution</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;创建允许流量的NetworkPolicy&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      command</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;kubectl describe networkpolicies&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">cause</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;NetworkPolicy选择器不匹配&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      solution</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;检查Pod标签和策略选择器&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      command</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;kubectl get pod --show-labels&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">cause</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;CNI插件未正确安装&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      solution</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;检查CNI插件Pod状态&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      command</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;kubectl -n kube-system get pods&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">cause</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;iptables/ebpf规则未应用&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      solution</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;重启CNI插件Pod&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      command</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;kubectl -n kube-system rollout restart deployment/calico-node&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  symptom</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Pod无法发送流量&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  possible_causes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">cause</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;没有egress规则&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      solution</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;添加egress规则或允许所有egress&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      command</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;kubectl edit networkpolicy &lt;name&gt;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">cause</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;DNS被阻止&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      solution</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;允许到kube-dns的UDP 53和TCP 53&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      command</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">        kubectl apply -f - &lt;&lt;EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">        egress:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        - to:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          - namespaceSelector:</span></span>
<span class="line"><span class="__shiki_mdbnqw">              matchLabels:</span></span>
<span class="line"><span class="__shiki_mdbnqw">                k8s-app: kube-dns</span></span>
<span class="line"><span class="__shiki_mdbnqw">          ports:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          - protocol: UDP</span></span>
<span class="line"><span class="__shiki_mdbnqw">            port: 53</span></span>
<span class="line"><span class="__shiki_mdbnqw">          - protocol: TCP</span></span>
<span class="line"><span class="__shiki_mdbnqw">            port: 53</span></span>
<span class="line"><span class="__shiki_mdbnqw">        EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">cause</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;目标Pod有严格的入站策略&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      solution</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;检查目标Pod的NetworkPolicy&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      command</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;kubectl describe networkpolicies&quot;</span></span></code></pre></div><h2 id="九、性能优化与大规模部署" tabindex="-1">九、性能优化与大规模部署 <a class="header-anchor" href="#九、性能优化与大规模部署" aria-label="Permalink to &quot;九、性能优化与大规模部署&quot;">​</a></h2><h3 id="_9-1-性能优化策略" tabindex="-1">9.1 性能优化策略 <a class="header-anchor" href="#_9-1-性能优化策略" aria-label="Permalink to &quot;9.1 性能优化策略&quot;">​</a></h3><h4 id="_9-1-1-策略规则优化" tabindex="-1">9.1.1 策略规则优化 <a class="header-anchor" href="#_9-1-1-策略规则优化" aria-label="Permalink to &quot;9.1.1 策略规则优化&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 优化后的网络策略示例</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">optimized-policy</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">optimized-app</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 合并相似规则</span></span>
<span class="line"><span class="__shiki_17hn0y">  ingress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 优化前：多个单独规则</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 优化后：合并到单个规则</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          component</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">frontend</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          component</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">api-gateway</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">namespaceSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          env</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">staging</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8443</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 使用IP块替代多个Pod选择器</span></span>
<span class="line"><span class="__shiki_17hn0y">  egress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">to</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">ipBlock</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        cidr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10.0.0.0/8</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">443</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span></code></pre></div><h4 id="_9-1-2-大规模部署配置" tabindex="-1">9.1.2 大规模部署配置 <a class="header-anchor" href="#_9-1-2-大规模部署配置" aria-label="Permalink to &quot;9.1.2 大规模部署配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Calico大规模部署配置</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">calico-config</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kube-system</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 启用策略同步优化</span></span>
<span class="line"><span class="__shiki_17hn0y">  calico_backend</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;bird&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 调整策略处理参数</span></span>
<span class="line"><span class="__shiki_17hn0y">  felix_chaininsertmode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;insert&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  felix_iptablesbackend</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;auto&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 优化内存使用</span></span>
<span class="line"><span class="__shiki_17hn0y">  felix_ipv6support</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;false&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  felix_flowcontrolwindowsize</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  felix_flowcontrolssreporterinterval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;5&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 批量处理策略更新</span></span>
<span class="line"><span class="__shiki_17hn0y">  felix_policybatchsize</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  felix_policybatchdelay</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100ms&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 日志级别优化</span></span>
<span class="line"><span class="__shiki_17hn0y">  felix_loglevel</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Warning&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_21nrsd"># Cilium大规模部署配置</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cilium-config</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kube-system</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 启用eBPF优化</span></span>
<span class="line"><span class="__shiki_17hn0y">  enable-bpf-masquerade</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  enable-ipv6</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;false&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 策略处理优化</span></span>
<span class="line"><span class="__shiki_17hn0y">  policy-map-max-size</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;16384&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  policy-queue-size</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 连接跟踪优化</span></span>
<span class="line"><span class="__shiki_17hn0y">  bpf-ct-global-tcp-max</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;524288&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  bpf-ct-global-any-max</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;262144&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 监控和调试</span></span>
<span class="line"><span class="__shiki_17hn0y">  debug</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;false&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  monitor-aggregation</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;medium&quot;</span></span></code></pre></div><h3 id="_9-2-监控指标与告警" tabindex="-1">9.2 监控指标与告警 <a class="header-anchor" href="#_9-2-监控指标与告警" aria-label="Permalink to &quot;9.2 监控指标与告警&quot;">​</a></h3><h4 id="_9-2-1-关键性能指标" tabindex="-1">9.2.1 关键性能指标 <a class="header-anchor" href="#_9-2-1-关键性能指标" aria-label="Permalink to &quot;9.2.1 关键性能指标&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 网络策略性能监控</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">monitoring.coreos.com/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PrometheusRule</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">network-policy-performance</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">monitoring</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  groups</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">network-policy</span></span>
<span class="line"><span class="__shiki_17hn0y">    rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 策略处理延迟</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">record</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">network_policy_processing_duration_seconds</span></span>
<span class="line"><span class="__shiki_17hn0y">      expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">histogram_quantile(0.95, rate(felix_policy_calc_duration_seconds_bucket[5m]))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 规则数量</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">record</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">network_policy_rules_count</span></span>
<span class="line"><span class="__shiki_17hn0y">      expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">sum(felix_active_policy_rules) by (hostname)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 拒绝连接率</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HighPolicyDenialRate</span></span>
<span class="line"><span class="__shiki_17hn0y">      expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rate(felix_policy_denied_packets_total[5m]) &gt; 100</span></span>
<span class="line"><span class="__shiki_17hn0y">      for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">warning</span></span>
<span class="line"><span class="__shiki_17hn0y">      annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;高策略拒绝率&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{ $labels.hostname }} 的策略拒绝率过高&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 策略同步延迟</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PolicySyncDelay</span></span>
<span class="line"><span class="__shiki_17hn0y">      expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">time() - kube_networkpolicy_created &gt; 300</span></span>
<span class="line"><span class="__shiki_17hn0y">      for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2m</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">critical</span></span>
<span class="line"><span class="__shiki_17hn0y">      annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;网络策略同步延迟&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;网络策略 {{ $labels.networkpolicy }} 已创建但未同步&quot;</span></span></code></pre></div><h2 id="十、总结与最佳实践" tabindex="-1">十、总结与最佳实践 <a class="header-anchor" href="#十、总结与最佳实践" aria-label="Permalink to &quot;十、总结与最佳实践&quot;">​</a></h2><h3 id="_10-1-网络策略实施检查清单" tabindex="-1">10.1 网络策略实施检查清单 <a class="header-anchor" href="#_10-1-网络策略实施检查清单" aria-label="Permalink to &quot;10.1 网络策略实施检查清单&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 网络策略实施检查清单</span></span>
<span class="line"><span class="__shiki_17hn0y">checklist</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  design_phase</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">识别敏感工作负载和数据流</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">定义安全边界和信任区域</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">制定最小权限策略规则</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">创建策略模板和标准</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  implementation_phase</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">从非生产环境开始实施</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">应用默认拒绝策略</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">逐步添加允许规则</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">测试每条策略的有效性</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  monitoring_phase</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">建立策略变更审计</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">监控策略执行效果</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">设置适当的告警</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">定期审查和优化策略</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  operational_phase</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">自动化策略部署</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">集成到CI/CD流水线</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">建立策略回滚机制</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">培训团队使用策略</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 网络策略成熟度模型</span></span>
<span class="line"><span class="__shiki_17hn0y">maturity_levels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  level1</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;基础隔离&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    characteristics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">默认拒绝所有流量</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">基本的命名空间隔离</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">手动策略管理</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  level2</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;精细控制&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    characteristics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">基于标签的选择器</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">完整的入站/出站控制</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">策略版本控制</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  level3</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;动态适应&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    characteristics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">应用层策略（L7）</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">自动化策略生成</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">实时威胁响应</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  level4</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;智能防护&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    characteristics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">AI驱动的策略优化</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">行为分析异常检测</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">零信任网络架构</span></span></code></pre></div><h3 id="_10-2-关键成功因素" tabindex="-1">10.2 关键成功因素 <a class="header-anchor" href="#_10-2-关键成功因素" aria-label="Permalink to &quot;10.2 关键成功因素&quot;">​</a></h3><ol><li><strong>循序渐进实施</strong>：从非关键工作负载开始，逐步扩展到生产环境</li><li><strong>持续测试验证</strong>：建立自动化测试流水线，确保策略有效性</li><li><strong>监控与告警</strong>：实时监控策略执行情况，及时发现问题</li><li><strong>团队协作</strong>：开发、安全和运维团队紧密合作</li><li><strong>文档与培训</strong>：完整记录策略设计，培训相关人员</li></ol><h3 id="_10-3-未来发展趋势" tabindex="-1">10.3 未来发展趋势 <a class="header-anchor" href="#_10-3-未来发展趋势" aria-label="Permalink to &quot;10.3 未来发展趋势&quot;">​</a></h3><ul><li><strong>策略即代码</strong>：将网络策略纳入GitOps工作流</li><li><strong>智能策略</strong>：使用机器学习优化策略规则</li><li><strong>服务网格集成</strong>：网络策略与服务网格深度集成</li><li><strong>云原生安全</strong>：与云安全态势管理（CSPM）集成</li><li><strong>零信任扩展</strong>：扩展到集群外部和工作负载身份</li></ul><p>网络策略是Kubernetes安全的核心组件，正确实施和管理网络策略可以显著提升集群安全性，同时保持应用的可访问性和灵活性。通过本文的详细指南，您应该能够设计、实施和维护高效的Kubernetes网络策略体系。</p>`,101)])])}const r=a(i,[["render",h]]);export{d as __pageData,r as default};
