import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const k=JSON.parse('{"title":"🌐 Envoy代理架构模式学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/architecture/service-mesh/envoy.md","filePath":"backend/architecture/service-mesh/envoy.md"}'),h={name:"backend/architecture/service-mesh/envoy.md"};function _(l,s,t,e,c,r){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="🌐-envoy代理架构模式学习笔记" tabindex="-1">🌐 Envoy代理架构模式学习笔记 <a class="header-anchor" href="#🌐-envoy代理架构模式学习笔记" aria-label="Permalink to &quot;🌐 Envoy代理架构模式学习笔记&quot;">​</a></h1><h2 id="_1️⃣-envoy概述与核心定位" tabindex="-1">1️⃣ Envoy概述与核心定位 <a class="header-anchor" href="#_1️⃣-envoy概述与核心定位" aria-label="Permalink to &quot;1️⃣ Envoy概述与核心定位&quot;">​</a></h2><h3 id="_1-1-什么是envoy" tabindex="-1">1.1 什么是Envoy <a class="header-anchor" href="#_1-1-什么是envoy" aria-label="Permalink to &quot;1.1 什么是Envoy&quot;">​</a></h3><p>Envoy是一个开源的<strong>高性能代理和通信总线</strong>，专为云原生应用设计。它是服务网格数据平面的核心组件，为服务间通信提供了统一的基础设施层。</p><h3 id="_1-2-设计哲学" tabindex="-1">1.2 设计哲学 <a class="header-anchor" href="#_1-2-设计哲学" aria-label="Permalink to &quot;1.2 设计哲学&quot;">​</a></h3><ul><li><strong>透明性</strong>：对应用程序透明，无需修改代码</li><li><strong>通用性</strong>：支持多种协议和部署模式</li><li><strong>可观测性</strong>：内置丰富的监控和跟踪能力</li><li><strong>动态配置</strong>：支持运行时配置更新</li></ul><h2 id="_2️⃣-envoy整体架构" tabindex="-1">2️⃣ Envoy整体架构 <a class="header-anchor" href="#_2️⃣-envoy整体架构" aria-label="Permalink to &quot;2️⃣ Envoy整体架构&quot;">​</a></h2><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    subgraph Envoy Instance</span></span>
<span class="line"><span class="__shiki_140thh">        A[Listener]</span></span>
<span class="line"><span class="__shiki_140thh">        B[Filter Chain]</span></span>
<span class="line"><span class="__shiki_140thh">        C[Router]</span></span>
<span class="line"><span class="__shiki_140thh">        D[Cluster Manager]</span></span>
<span class="line"><span class="__shiki_140thh">        E[Health Checker]</span></span>
<span class="line"><span class="__shiki_140thh">        F[Load Balancer]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        A --&gt; B</span></span>
<span class="line"><span class="__shiki_140thh">        B --&gt; C</span></span>
<span class="line"><span class="__shiki_140thh">        C --&gt; D</span></span>
<span class="line"><span class="__shiki_140thh">        D --&gt; F</span></span>
<span class="line"><span class="__shiki_140thh">        E --&gt; D</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    subgraph External Components</span></span>
<span class="line"><span class="__shiki_140thh">        G[Control Plane]</span></span>
<span class="line"><span class="__shiki_140thh">        H[Upstream Services]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    G -.-&gt;|xDS API| D</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; H</span></span></code></pre></div><h2 id="_3️⃣-核心架构组件" tabindex="-1">3️⃣ 核心架构组件 <a class="header-anchor" href="#_3️⃣-核心架构组件" aria-label="Permalink to &quot;3️⃣ 核心架构组件&quot;">​</a></h2><h3 id="_3-1-监听器-listener" tabindex="-1">3.1 监听器（Listener） <a class="header-anchor" href="#_3-1-监听器-listener" aria-label="Permalink to &quot;3.1 监听器（Listener）&quot;">​</a></h3><p>负责接收网络流量，支持多种协议和传输方式。</p><p><strong>配置示例</strong>：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">listeners</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http_listener</span></span>
<span class="line"><span class="__shiki_17hn0y">  address</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    socket_address</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      address</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0.0.0.0</span></span>
<span class="line"><span class="__shiki_17hn0y">      port_value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_17hn0y">  filter_chains</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">filters</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">envoy.filters.network.http_connection_manager</span></span>
<span class="line"><span class="__shiki_17hn0y">      typed_config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;@type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager</span></span>
<span class="line"><span class="__shiki_17hn0y">        stat_prefix</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ingress_http</span></span>
<span class="line"><span class="__shiki_17hn0y">        http_filters</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">envoy.filters.http.router</span></span></code></pre></div><h3 id="_3-2-过滤器-filter" tabindex="-1">3.2 过滤器（Filter） <a class="header-anchor" href="#_3-2-过滤器-filter" aria-label="Permalink to &quot;3.2 过滤器（Filter）&quot;">​</a></h3><p>Envoy的核心处理单元，形成过滤器链处理请求和响应。</p><h4 id="_3-2-1-网络层过滤器" tabindex="-1">3.2.1 网络层过滤器 <a class="header-anchor" href="#_3-2-1-网络层过滤器" aria-label="Permalink to &quot;3.2.1 网络层过滤器&quot;">​</a></h4><p>处理原始TCP/UDP流量：</p><ul><li><strong>TLS检查器</strong>：识别TLS流量</li><li><strong>TCP代理</strong>：基本的TCP流量转发</li><li><strong>HTTP连接管理器</strong>：将HTTP流量转换为内部HTTP格式</li></ul><h4 id="_3-2-2-http层过滤器" tabindex="-1">3.2.2 HTTP层过滤器 <a class="header-anchor" href="#_3-2-2-http层过滤器" aria-label="Permalink to &quot;3.2.2 HTTP层过滤器&quot;">​</a></h4><p>处理HTTP协议流量：</p><ul><li><strong>路由器过滤器</strong>：路由HTTP请求到上游集群</li><li><strong>CORS过滤器</strong>：处理跨域资源共享</li><li><strong>限流过滤器</strong>：实现速率限制</li><li><strong>故障注入过滤器</strong>：模拟故障场景</li></ul><h3 id="_3-3-集群-cluster" tabindex="-1">3.3 集群（Cluster） <a class="header-anchor" href="#_3-3-集群-cluster" aria-label="Permalink to &quot;3.3 集群（Cluster）&quot;">​</a></h3><p>定义上游服务的逻辑分组和负载均衡策略。</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">clusters</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">service_a</span></span>
<span class="line"><span class="__shiki_17hn0y">  connect_timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5s</span></span>
<span class="line"><span class="__shiki_17hn0y">  type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">EDS</span></span>
<span class="line"><span class="__shiki_17hn0y">  lb_policy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ROUND_ROBIN</span></span>
<span class="line"><span class="__shiki_17hn0y">  http2_protocol_options</span><span class="__shiki_140thh">: {}</span></span>
<span class="line"><span class="__shiki_17hn0y">  health_checks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5s</span></span>
<span class="line"><span class="__shiki_17hn0y">      interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10s</span></span>
<span class="line"><span class="__shiki_17hn0y">      unhealthy_threshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">      healthy_threshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">      http_health_check</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/health&quot;</span></span></code></pre></div><h2 id="_4️⃣-关键架构模式" tabindex="-1">4️⃣ 关键架构模式 <a class="header-anchor" href="#_4️⃣-关键架构模式" aria-label="Permalink to &quot;4️⃣ 关键架构模式&quot;">​</a></h2><h3 id="_4-1-线程模型" tabindex="-1">4.1 线程模型 <a class="header-anchor" href="#_4-1-线程模型" aria-label="Permalink to &quot;4.1 线程模型&quot;">​</a></h3><p>Envoy使用<strong>多线程架构</strong>，每个线程独立处理连接，实现高性能。</p><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    subgraph Envoy Process</span></span>
<span class="line"><span class="__shiki_140thh">        A[主线程] --&gt; B[管理接口]</span></span>
<span class="line"><span class="__shiki_140thh">        A --&gt; C[配置加载]</span></span>
<span class="line"><span class="__shiki_140thh">        A --&gt; D[统计聚合]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        E[工作线程1] --&gt; F[监听器1]</span></span>
<span class="line"><span class="__shiki_140thh">        E --&gt; G[连接1]</span></span>
<span class="line"><span class="__shiki_140thh">        E --&gt; H[连接2]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        I[工作线程2] --&gt; J[监听器2]</span></span>
<span class="line"><span class="__shiki_140thh">        I --&gt; K[连接3]</span></span>
<span class="line"><span class="__shiki_140thh">        I --&gt; L[连接4]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        M[工作线程N] --&gt; N[监听器N]</span></span>
<span class="line"><span class="__shiki_140thh">        M --&gt; O[连接M]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span></code></pre></div><p><strong>特点</strong>：</p><ul><li>每个工作线程独立运行事件循环</li><li>线程间无共享状态，减少锁竞争</li><li>连接生命周期绑定到单个线程</li></ul><h3 id="_4-2-配置发现服务-xds" tabindex="-1">4.2 配置发现服务（xDS） <a class="header-anchor" href="#_4-2-配置发现服务-xds" aria-label="Permalink to &quot;4.2 配置发现服务（xDS）&quot;">​</a></h3><p>Envoy通过xDS API从控制平面动态获取配置。</p><h4 id="_4-2-1-xds协议类型" tabindex="-1">4.2.1 xDS协议类型 <a class="header-anchor" href="#_4-2-1-xds协议类型" aria-label="Permalink to &quot;4.2.1 xDS协议类型&quot;">​</a></h4><ul><li><strong>LDS</strong>：监听器发现服务</li><li><strong>RDS</strong>：路由发现服务</li><li><strong>CDS</strong>：集群发现服务</li><li><strong>EDS</strong>：端点发现服务</li><li><strong>SDS</strong>：密钥发现服务</li></ul><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">sequenceDiagram</span></span>
<span class="line"><span class="__shiki_140thh">    participant E as Envoy</span></span>
<span class="line"><span class="__shiki_140thh">    participant CP as Control Plane</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Note over E, CP: 初始引导阶段</span></span>
<span class="line"><span class="__shiki_140thh">    E-&gt;&gt;CP: LDS - 获取监听器配置</span></span>
<span class="line"><span class="__shiki_140thh">    CP-&gt;&gt;E: 返回监听器列表</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    E-&gt;&gt;CP: RDS - 获取路由配置</span></span>
<span class="line"><span class="__shiki_140thh">    CP-&gt;&gt;E: 返回路由规则</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    E-&gt;&gt;CP: CDS - 获取集群配置</span></span>
<span class="line"><span class="__shiki_140thh">    CP-&gt;&gt;E: 返回集群定义</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    E-&gt;&gt;CP: EDS - 获取端点信息</span></span>
<span class="line"><span class="__shiki_140thh">    CP-&gt;&gt;E: 返回服务实例列表</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Note over E, CP: 运行时更新</span></span>
<span class="line"><span class="__shiki_140thh">    CP-&gt;&gt;E: 推送配置更新</span></span>
<span class="line"><span class="__shiki_140thh">    E-&gt;&gt;E: 热重载配置</span></span></code></pre></div><h3 id="_4-3-负载均衡策略" tabindex="-1">4.3 负载均衡策略 <a class="header-anchor" href="#_4-3-负载均衡策略" aria-label="Permalink to &quot;4.3 负载均衡策略&quot;">​</a></h3><p>Envoy支持多种负载均衡算法：</p><table tabindex="0"><thead><tr><th>策略类型</th><th>适用场景</th><th>特点</th></tr></thead><tbody><tr><td>轮询</td><td>通用场景</td><td>均匀分发请求</td></tr><tr><td>最少连接</td><td>长连接服务</td><td>考虑后端负载</td></tr><tr><td>一致性哈希</td><td>缓存亲和性</td><td>相同键的请求到相同后端</td></tr><tr><td>随机</td><td>测试场景</td><td>简单随机选择</td></tr><tr><td>区域感知</td><td>多区域部署</td><td>优先本区域后端</td></tr></tbody></table><h2 id="_5️⃣-请求处理流程" tabindex="-1">5️⃣ 请求处理流程 <a class="header-anchor" href="#_5️⃣-请求处理流程" aria-label="Permalink to &quot;5️⃣ 请求处理流程&quot;">​</a></h2><h3 id="_5-1-完整请求生命周期" tabindex="-1">5.1 完整请求生命周期 <a class="header-anchor" href="#_5-1-完整请求生命周期" aria-label="Permalink to &quot;5.1 完整请求生命周期&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">sequenceDiagram</span></span>
<span class="line"><span class="__shiki_140thh">    participant C as Downstream Client</span></span>
<span class="line"><span class="__shiki_140thh">    participant E as Envoy Proxy</span></span>
<span class="line"><span class="__shiki_140thh">    participant U as Upstream Service</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Note over C, U: 连接建立阶段</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;E: TCP连接请求</span></span>
<span class="line"><span class="__shiki_140thh">    E-&gt;&gt;E: 监听器接受连接</span></span>
<span class="line"><span class="__shiki_140thh">    E-&gt;&gt;E: 网络过滤器链处理</span></span>
<span class="line"><span class="__shiki_140thh">    E-&gt;&gt;E: TLS握手（如启用）</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Note over C, U: 请求处理阶段</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;E: 发送HTTP请求</span></span>
<span class="line"><span class="__shiki_140thh">    E-&gt;&gt;E: HTTP连接管理器解码</span></span>
<span class="line"><span class="__shiki_140thh">    E-&gt;&gt;E: HTTP过滤器链处理</span></span>
<span class="line"><span class="__shiki_140thh">    E-&gt;&gt;E: 路由匹配</span></span>
<span class="line"><span class="__shiki_140thh">    E-&gt;&gt;E: 负载均衡选择端点</span></span>
<span class="line"><span class="__shiki_140thh">    E-&gt;&gt;U: 建立到上游连接</span></span>
<span class="line"><span class="__shiki_140thh">    E-&gt;&gt;U: 转发请求</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Note over C, U: 响应处理阶段</span></span>
<span class="line"><span class="__shiki_140thh">    U-&gt;&gt;E: 返回响应</span></span>
<span class="line"><span class="__shiki_140thh">    E-&gt;&gt;E: 上游HTTP过滤器链</span></span>
<span class="line"><span class="__shiki_140thh">    E-&gt;&gt;E: 下游HTTP过滤器链</span></span>
<span class="line"><span class="__shiki_140thh">    E-&gt;&gt;C: 发送响应到客户端</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Note over C, U: 连接清理阶段</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;E: 关闭连接</span></span>
<span class="line"><span class="__shiki_140thh">    E-&gt;&gt;U: 关闭上游连接</span></span>
<span class="line"><span class="__shiki_140thh">    E-&gt;&gt;E: 更新统计信息</span></span></code></pre></div><h3 id="_5-2-过滤器链处理细节" tabindex="-1">5.2 过滤器链处理细节 <a class="header-anchor" href="#_5-2-过滤器链处理细节" aria-label="Permalink to &quot;5.2 过滤器链处理细节&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 典型的HTTP过滤器链配置</span></span>
<span class="line"><span class="__shiki_17hn0y">http_filters</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">envoy.filters.http.cors</span></span>
<span class="line"><span class="__shiki_17hn0y">    typed_config</span><span class="__shiki_140thh">: {</span><span class="__shiki_dzsirb">...</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">envoy.filters.http.fault</span></span>
<span class="line"><span class="__shiki_17hn0y">    typed_config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      delay</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        fixed_delay</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5s</span></span>
<span class="line"><span class="__shiki_17hn0y">        percentage</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          numerator</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">envoy.filters.http.router</span></span>
<span class="line"><span class="__shiki_17hn0y">    typed_config</span><span class="__shiki_140thh">: {</span><span class="__shiki_dzsirb">...</span><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_6️⃣-高级特性" tabindex="-1">6️⃣ 高级特性 <a class="header-anchor" href="#_6️⃣-高级特性" aria-label="Permalink to &quot;6️⃣ 高级特性&quot;">​</a></h2><h3 id="_6-1-熔断器模式" tabindex="-1">6.1 熔断器模式 <a class="header-anchor" href="#_6-1-熔断器模式" aria-label="Permalink to &quot;6.1 熔断器模式&quot;">​</a></h3><p>Envoy提供多种熔断机制保护后端服务：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">circuit_breakers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  thresholds</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">priority</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">DEFAULT</span></span>
<span class="line"><span class="__shiki_17hn0y">      max_connections</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1000</span></span>
<span class="line"><span class="__shiki_17hn0y">      max_requests</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10000</span></span>
<span class="line"><span class="__shiki_17hn0y">      max_pending_requests</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">500</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">priority</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HIGH</span></span>
<span class="line"><span class="__shiki_17hn0y">      max_connections</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2000</span></span></code></pre></div><h3 id="_6-2-健康检查" tabindex="-1">6.2 健康检查 <a class="header-anchor" href="#_6-2-健康检查" aria-label="Permalink to &quot;6.2 健康检查&quot;">​</a></h3><p>支持主动和被动健康检查：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">health_checks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5s</span></span>
<span class="line"><span class="__shiki_17hn0y">    interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10s</span></span>
<span class="line"><span class="__shiki_17hn0y">    interval_jitter</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2s</span></span>
<span class="line"><span class="__shiki_17hn0y">    unhealthy_threshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">    healthy_threshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">    http_health_check</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/health&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      expected_statuses</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        start</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">200</span></span>
<span class="line"><span class="__shiki_17hn0y">        end</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">299</span></span></code></pre></div><h3 id="_6-3-可观测性" tabindex="-1">6.3 可观测性 <a class="header-anchor" href="#_6-3-可观测性" aria-label="Permalink to &quot;6.3 可观测性&quot;">​</a></h3><ul><li><strong>统计信息</strong>：丰富的计数器、直方图和指标</li><li><strong>访问日志</strong>：详细的请求/响应日志</li><li><strong>分布式追踪</strong>：支持Jaeger、Zipkin等</li><li><strong>运行时配置</strong>：动态功能标记控制</li></ul><h2 id="_7️⃣-部署模式" tabindex="-1">7️⃣ 部署模式 <a class="header-anchor" href="#_7️⃣-部署模式" aria-label="Permalink to &quot;7️⃣ 部署模式&quot;">​</a></h2><h3 id="_7-1-sidecar模式" tabindex="-1">7.1 Sidecar模式 <a class="header-anchor" href="#_7-1-sidecar模式" aria-label="Permalink to &quot;7.1 Sidecar模式&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    subgraph Pod A</span></span>
<span class="line"><span class="__shiki_140thh">        A[Service A] --&gt; E1[Envoy Sidecar]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    subgraph Pod B</span></span>
<span class="line"><span class="__shiki_140thh">        B[Service B] --&gt; E2[Envoy Sidecar]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    E1 --&gt; E2</span></span></code></pre></div><h3 id="_7-2-边缘代理模式" tabindex="-1">7.2 边缘代理模式 <a class="header-anchor" href="#_7-2-边缘代理模式" aria-label="Permalink to &quot;7.2 边缘代理模式&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    C[External Client] --&gt; E[Envoy Edge Proxy]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; S1[Service 1]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; S2[Service 2]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; S3[Service 3]</span></span></code></pre></div><h2 id="_8️⃣-性能优化最佳实践" tabindex="-1">8️⃣ 性能优化最佳实践 <a class="header-anchor" href="#_8️⃣-性能优化最佳实践" aria-label="Permalink to &quot;8️⃣ 性能优化最佳实践&quot;">​</a></h2><h3 id="_8-1-资源配置" tabindex="-1">8.1 资源配置 <a class="header-anchor" href="#_8-1-资源配置" aria-label="Permalink to &quot;8.1 资源配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 资源限制配置</span></span>
<span class="line"><span class="__shiki_17hn0y">resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;256Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;500m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;512Mi&quot;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_17hn0y">    cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1000m&quot;</span></span></code></pre></div><h3 id="_8-2-连接池优化" tabindex="-1">8.2 连接池优化 <a class="header-anchor" href="#_8-2-连接池优化" aria-label="Permalink to &quot;8.2 连接池优化&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">upstream_connection_options</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  tcp_keepalive</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    keepalive_time</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">7200</span></span>
<span class="line"><span class="__shiki_17hn0y">circuit_breakers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  thresholds</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">max_connections</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10000</span></span>
<span class="line"><span class="__shiki_17hn0y">      max_requests</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100000</span></span></code></pre></div><h2 id="_9️⃣-总结" tabindex="-1">9️⃣ 总结 <a class="header-anchor" href="#_9️⃣-总结" aria-label="Permalink to &quot;9️⃣ 总结&quot;">​</a></h2><p>Envoy作为现代服务网格的数据平面核心，其架构设计体现了以下关键原则：</p><ol><li><strong>高性能</strong>：基于C++和现代异步编程模型</li><li><strong>可扩展性</strong>：通过过滤器链支持丰富功能扩展</li><li><strong>动态配置</strong>：通过xDS实现零停机配置更新</li><li><strong>可观测性</strong>：内置全面的监控和追踪能力</li><li><strong>协议透明</strong>：支持HTTP/1.1、HTTP/2、gRPC等多种协议</li></ol><p>掌握Envoy的架构模式对于构建可靠、可观测和高性能的微服务系统至关重要。</p>`,66)])])}const d=a(h,[["render",_]]);export{k as __pageData,d as default};
