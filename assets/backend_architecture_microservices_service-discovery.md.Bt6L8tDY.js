import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const k=JSON.parse('{"title":"微服务架构 - 服务发现 完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/architecture/microservices/service-discovery.md","filePath":"backend/architecture/microservices/service-discovery.md"}'),l={name:"backend/architecture/microservices/service-discovery.md"};function _(h,s,e,t,c,r){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="微服务架构-服务发现-完整学习笔记" tabindex="-1">微服务架构 - 服务发现 完整学习笔记 <a class="header-anchor" href="#微服务架构-服务发现-完整学习笔记" aria-label="Permalink to &quot;微服务架构 - 服务发现 完整学习笔记&quot;">​</a></h1><h2 id="_1-服务发现的核心概念" tabindex="-1">1. 服务发现的核心概念 <a class="header-anchor" href="#_1-服务发现的核心概念" aria-label="Permalink to &quot;1. 服务发现的核心概念&quot;">​</a></h2><h3 id="_1-1-什么是服务发现" tabindex="-1">1.1 什么是服务发现 <a class="header-anchor" href="#_1-1-什么是服务发现" aria-label="Permalink to &quot;1.1 什么是服务发现&quot;">​</a></h3><p><strong>服务发现</strong>是微服务架构中的核心机制，它解决了以下问题：</p><ul><li>服务实例的动态定位</li><li>服务实例的网络地址管理</li><li>服务实例的健康状态监控</li><li>负载均衡和流量分发</li></ul><h3 id="_1-2-为什么需要服务发现" tabindex="-1">1.2 为什么需要服务发现 <a class="header-anchor" href="#_1-2-为什么需要服务发现" aria-label="Permalink to &quot;1.2 为什么需要服务发现&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[单体应用] --&gt; B[硬编码配置]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[配置复杂]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[难以扩展]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    E[微服务架构] --&gt; F[服务实例动态变化]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; G[需要自动发现]</span></span>
<span class="line"><span class="__shiki_140thh">    G --&gt; H[服务发现机制]</span></span></code></pre></div><p><strong>传统架构的问题：</strong></p><ul><li>硬编码服务地址</li><li>手动配置服务端点</li><li>难以应对动态扩展和故障转移</li></ul><p><strong>微服务架构的需求：</strong></p><ul><li>服务实例频繁创建和销毁</li><li>自动扩缩容</li><li>故障自动恢复</li><li>多环境部署</li></ul><h2 id="_2-服务发现的核心组件" tabindex="-1">2. 服务发现的核心组件 <a class="header-anchor" href="#_2-服务发现的核心组件" aria-label="Permalink to &quot;2. 服务发现的核心组件&quot;">​</a></h2><h3 id="_2-1-服务注册表-service-registry" tabindex="-1">2.1 服务注册表 (Service Registry) <a class="header-anchor" href="#_2-1-服务注册表-service-registry" aria-label="Permalink to &quot;2.1 服务注册表 (Service Registry)&quot;">​</a></h3><p><strong>核心组件：</strong></p><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[服务实例] --&gt; B[服务注册表]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[心跳检测]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[健康状态]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[服务发现客户端]</span></span></code></pre></div><p><strong>服务注册表特性：</strong></p><ul><li>高可用性</li><li>强一致性</li><li>持久化存储</li><li>快速查询</li></ul><h3 id="_2-2-服务注册与发现流程" tabindex="-1">2.2 服务注册与发现流程 <a class="header-anchor" href="#_2-2-服务注册与发现流程" aria-label="Permalink to &quot;2.2 服务注册与发现流程&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">sequenceDiagram</span></span>
<span class="line"><span class="__shiki_140thh">    participant S as 服务提供者</span></span>
<span class="line"><span class="__shiki_140thh">    participant R as 服务注册表</span></span>
<span class="line"><span class="__shiki_140thh">    participant C as 服务消费者</span></span>
<span class="line"><span class="__shiki_140thh">    participant D as 发现客户端</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    S-&gt;&gt;R: 1. 注册服务实例</span></span>
<span class="line"><span class="__shiki_140thh">    R-&gt;&gt;S: 返回注册结果</span></span>
<span class="line"><span class="__shiki_140thh">    S-&gt;&gt;R: 定期发送心跳</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;D: 2. 请求服务发现</span></span>
<span class="line"><span class="__shiki_140thh">    D-&gt;&gt;R: 查询可用实例</span></span>
<span class="line"><span class="__shiki_140thh">    R-&gt;&gt;D: 返回实例列表</span></span>
<span class="line"><span class="__shiki_140thh">    D-&gt;&gt;C: 返回服务端点</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;S: 3. 发起服务调用</span></span></code></pre></div><h2 id="_3-服务发现模式" tabindex="-1">3. 服务发现模式 <a class="header-anchor" href="#_3-服务发现模式" aria-label="Permalink to &quot;3. 服务发现模式&quot;">​</a></h2><h3 id="_3-1-客户端发现模式-client-side-discovery" tabindex="-1">3.1 客户端发现模式 (Client-side Discovery) <a class="header-anchor" href="#_3-1-客户端发现模式-client-side-discovery" aria-label="Permalink to &quot;3.1 客户端发现模式 (Client-side Discovery)&quot;">​</a></h3><p><strong>工作原理：</strong></p><ul><li>服务消费者从注册表获取所有可用实例</li><li>消费者本地决定使用哪个实例</li><li>客户端实现负载均衡</li></ul><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[服务消费者] --&gt; B[发现客户端]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[服务注册表]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; D[负载均衡器]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[服务实例A]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; F[服务实例B]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; G[服务实例C]</span></span></code></pre></div><p><strong>优点：</strong></p><ul><li>减少网络跳数</li><li>客户端可定制负载策略</li><li>性能较好</li></ul><p><strong>缺点：</strong></p><ul><li>客户端复杂度高</li><li>需要支持多种语言</li><li>与注册表耦合</li></ul><h3 id="_3-2-服务端发现模式-server-side-discovery" tabindex="-1">3.2 服务端发现模式 (Server-side Discovery) <a class="header-anchor" href="#_3-2-服务端发现模式-server-side-discovery" aria-label="Permalink to &quot;3.2 服务端发现模式 (Server-side Discovery)&quot;">​</a></h3><p><strong>工作原理：</strong></p><ul><li>通过负载均衡器进行服务发现</li><li>客户端不知道注册表的存在</li><li>服务端负责实例选择和负载均衡</li></ul><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[服务消费者] --&gt; B[负载均衡器]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[服务注册表]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; D[服务实例A]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; E[服务实例B]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; F[服务实例C]</span></span></code></pre></div><p><strong>优点：</strong></p><ul><li>客户端简单</li><li>发现逻辑集中管理</li><li>支持多语言客户端</li></ul><p><strong>缺点：</strong></p><ul><li>额外的网络跳数</li><li>负载均衡器可能成为瓶颈</li></ul><h2 id="_4-服务注册机制" tabindex="-1">4. 服务注册机制 <a class="header-anchor" href="#_4-服务注册机制" aria-label="Permalink to &quot;4. 服务注册机制&quot;">​</a></h2><h3 id="_4-1-自注册模式-self-registration" tabindex="-1">4.1 自注册模式 (Self-registration) <a class="header-anchor" href="#_4-1-自注册模式-self-registration" aria-label="Permalink to &quot;4.1 自注册模式 (Self-registration)&quot;">​</a></h3><p><strong>工作流程：</strong></p><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">sequenceDiagram</span></span>
<span class="line"><span class="__shiki_140thh">    participant A as 服务实例</span></span>
<span class="line"><span class="__shiki_140thh">    participant B as 服务注册表</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    A-&gt;&gt;B: 启动时注册</span></span>
<span class="line"><span class="__shiki_140thh">    B-&gt;&gt;A: 确认注册</span></span>
<span class="line"><span class="__shiki_140thh">    loop 健康检查</span></span>
<span class="line"><span class="__shiki_140thh">        A-&gt;&gt;B: 定期心跳</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    A-&gt;&gt;B: 关闭时注销</span></span></code></pre></div><p><strong>注册信息包含：</strong></p><ul><li>服务名称</li><li>实例ID</li><li>IP地址和端口</li><li>健康检查端点</li><li>元数据（版本、区域等）</li></ul><h3 id="_4-2-第三方注册模式-third-party-registration" tabindex="-1">4.2 第三方注册模式 (Third-party Registration) <a class="header-anchor" href="#_4-2-第三方注册模式-third-party-registration" aria-label="Permalink to &quot;4.2 第三方注册模式 (Third-party Registration)&quot;">​</a></h3><p><strong>工作流程：</strong></p><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">sequenceDiagram</span></span>
<span class="line"><span class="__shiki_140thh">    participant A as 服务实例</span></span>
<span class="line"><span class="__shiki_140thh">    participant B as 注册器</span></span>
<span class="line"><span class="__shiki_140thh">    participant C as 服务注册表</span></span>
<span class="line"><span class="__shiki_140thh">    participant D as 部署平台</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D-&gt;&gt;A: 启动服务实例</span></span>
<span class="line"><span class="__shiki_140thh">    B-&gt;&gt;C: 检测并注册实例</span></span>
<span class="line"><span class="__shiki_140thh">    A-&gt;&gt;B: 暴露健康状态</span></span>
<span class="line"><span class="__shiki_140thh">    B-&gt;&gt;C: 更新健康状态</span></span>
<span class="line"><span class="__shiki_140thh">    D-&gt;&gt;A: 停止实例</span></span>
<span class="line"><span class="__shiki_140thh">    B-&gt;&gt;C: 自动注销</span></span></code></pre></div><h2 id="_5-健康检查机制" tabindex="-1">5. 健康检查机制 <a class="header-anchor" href="#_5-健康检查机制" aria-label="Permalink to &quot;5. 健康检查机制&quot;">​</a></h2><h3 id="_5-1-健康检查类型" tabindex="-1">5.1 健康检查类型 <a class="header-anchor" href="#_5-1-健康检查类型" aria-label="Permalink to &quot;5.1 健康检查类型&quot;">​</a></h3><p><strong>主动健康检查：</strong></p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">health_check</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HTTP</span></span>
<span class="line"><span class="__shiki_17hn0y">  path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/health</span></span>
<span class="line"><span class="__shiki_17hn0y">  port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_17hn0y">  interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">30s</span></span>
<span class="line"><span class="__shiki_17hn0y">  timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5s</span></span>
<span class="line"><span class="__shiki_17hn0y">  success_threshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">  failure_threshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span></code></pre></div><p><strong>被动健康检查：</strong></p><ul><li>基于实际请求的成功率</li><li>连接失败统计</li><li>响应时间监控</li></ul><h3 id="_5-2-健康状态管理" tabindex="-1">5.2 健康状态管理 <a class="header-anchor" href="#_5-2-健康状态管理" aria-label="Permalink to &quot;5.2 健康状态管理&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">stateDiagram-v2</span></span>
<span class="line"><span class="__shiki_140thh">    [*] --&gt; HEALTHY: 注册成功</span></span>
<span class="line"><span class="__shiki_140thh">    HEALTHY --&gt; UNHEALTHY: 连续失败</span></span>
<span class="line"><span class="__shiki_140thh">    UNHEALTHY --&gt; HEALTHY: 恢复成功</span></span>
<span class="line"><span class="__shiki_140thh">    UNHEALTHY --&gt; [*]: 超过阈值被移除</span></span>
<span class="line"><span class="__shiki_140thh">    HEALTHY --&gt; [*]: 主动注销</span></span></code></pre></div><h2 id="_6-主流服务发现解决方案" tabindex="-1">6. 主流服务发现解决方案 <a class="header-anchor" href="#_6-主流服务发现解决方案" aria-label="Permalink to &quot;6. 主流服务发现解决方案&quot;">​</a></h2><h3 id="_6-1-netflix-eureka" tabindex="-1">6.1 Netflix Eureka <a class="header-anchor" href="#_6-1-netflix-eureka" aria-label="Permalink to &quot;6.1 Netflix Eureka&quot;">​</a></h3><p><strong>架构特点：</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Eureka客户端配置</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Configuration</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> EurekaConfig</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Bean</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> EurekaInstanceConfigBean </span><span class="__shiki_1t8gfj">eurekaInstanceConfig</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        EurekaInstanceConfigBean config </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> EurekaInstanceConfigBean</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        config.</span><span class="__shiki_1t8gfj">setInstanceId</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;\${spring.cloud.client.hostname}:\${spring.application.name}:\${spring.application.instance_id:\${server.port}}&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        config.</span><span class="__shiki_1t8gfj">setAppname</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user-service&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        config.</span><span class="__shiki_1t8gfj">setStatusPageUrl</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;http://localhost:8080/actuator/info&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> config;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>Eureka集群架构：</strong></p><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[Eureka Client] --&gt; B[Eureka Server A]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[Eureka Server B]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[Eureka Server C]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; D</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; B</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; B</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; C</span></span></code></pre></div><h3 id="_6-2-consul" tabindex="-1">6.2 Consul <a class="header-anchor" href="#_6-2-consul" aria-label="Permalink to &quot;6.2 Consul&quot;">​</a></h3><p><strong>核心特性：</strong></p><ul><li>基于Raft协议保证一致性</li><li>支持多数据中心</li><li>内置健康检查</li><li>Key-Value存储</li></ul><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[Consul Agent] --&gt; B[Consul Server]</span></span>
<span class="line"><span class="__shiki_140thh">    C[Consul Agent] --&gt; B</span></span>
<span class="line"><span class="__shiki_140thh">    D[Consul Agent] --&gt; B</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; E[WAN Gossip]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; F[其他数据中心]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    G[服务注册] --&gt; A</span></span>
<span class="line"><span class="__shiki_140thh">    H[服务发现] --&gt; A</span></span></code></pre></div><h3 id="_6-3-zookeeper" tabindex="-1">6.3 Zookeeper <a class="header-anchor" href="#_6-3-zookeeper" aria-label="Permalink to &quot;6.3 Zookeeper&quot;">​</a></h3><p><strong>基于临时节点的服务发现：</strong></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 服务注册</span></span>
<span class="line"><span class="__shiki_1t8gfj">create</span><span class="__shiki_mdbnqw"> /services/userservice/node1</span><span class="__shiki_mdbnqw"> &quot;192.168.1.10:8080&quot;</span><span class="__shiki_mdbnqw"> ephemeral</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 服务发现</span></span>
<span class="line"><span class="__shiki_1t8gfj">ls</span><span class="__shiki_mdbnqw"> /services/userservice</span></span>
<span class="line"><span class="__shiki_1t8gfj">get</span><span class="__shiki_mdbnqw"> /services/userservice/node1</span></span></code></pre></div><h3 id="_6-4-nacos" tabindex="-1">6.4 Nacos <a class="header-anchor" href="#_6-4-nacos" aria-label="Permalink to &quot;6.4 Nacos&quot;">​</a></h3><p><strong>特性对比：</strong></p><table tabindex="0"><thead><tr><th>特性</th><th>Eureka</th><th>Consul</th><th>Nacos</th></tr></thead><tbody><tr><td>一致性协议</td><td>AP</td><td>CP</td><td>AP/CP</td></tr><tr><td>健康检查</td><td>客户端心跳</td><td>TCP/HTTP/Command</td><td>TCP/HTTP/MySQL</td></tr><tr><td>负载均衡</td><td>Ribbon</td><td>Fabio</td><td>内置</td></tr><tr><td>配置管理</td><td>需要Config</td><td>内置</td><td>内置</td></tr></tbody></table><h2 id="_7-服务发现的最佳实践" tabindex="-1">7. 服务发现的最佳实践 <a class="header-anchor" href="#_7-服务发现的最佳实践" aria-label="Permalink to &quot;7. 服务发现的最佳实践&quot;">​</a></h2><h3 id="_7-1-客户端配置" tabindex="-1">7.1 客户端配置 <a class="header-anchor" href="#_7-1-客户端配置" aria-label="Permalink to &quot;7.1 客户端配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">spring</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  cloud</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    loadbalancer</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    discovery</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      client</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        simple</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          instances</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            user-service</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">              - </span><span class="__shiki_17hn0y">uri</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http://localhost:8081</span></span>
<span class="line"><span class="__shiki_140thh">              - </span><span class="__shiki_17hn0y">uri</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http://localhost:8082</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">eureka</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  client</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    service-url</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      defaultZone</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http://eureka1:8761/eureka/,http://eureka2:8762/eureka/</span></span>
<span class="line"><span class="__shiki_17hn0y">    registry-fetch-interval-seconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span></span>
<span class="line"><span class="__shiki_17hn0y">  instance</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    lease-renewal-interval-in-seconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span></span>
<span class="line"><span class="__shiki_17hn0y">    lease-expiration-duration-in-seconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">90</span></span></code></pre></div><h3 id="_7-2-容错和重试机制" tabindex="-1">7.2 容错和重试机制 <a class="header-anchor" href="#_7-2-容错和重试机制" aria-label="Permalink to &quot;7.2 容错和重试机制&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Configuration</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> FeignConfig</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Bean</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> Retryer </span><span class="__shiki_1t8gfj">feignRetryer</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> Retryer.</span><span class="__shiki_1t8gfj">Default</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Bean</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> LoadBalancerClient </span><span class="__shiki_1t8gfj">loadBalancerClient</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> LoadBalancerClient</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">            @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">            public</span><span class="__shiki_140thh"> ServiceInstance </span><span class="__shiki_1t8gfj">choose</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">serviceId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 自定义服务选择逻辑</span></span>
<span class="line"><span class="__shiki_140thh">                List&lt;</span><span class="__shiki_1itgoe">ServiceInstance</span><span class="__shiki_140thh">&gt; instances </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> discoveryClient.</span><span class="__shiki_1t8gfj">getInstances</span><span class="__shiki_140thh">(serviceId);</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> instances.</span><span class="__shiki_1t8gfj">stream</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                    .</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(instance </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_1t8gfj"> isHealthy</span><span class="__shiki_140thh">(instance))</span></span>
<span class="line"><span class="__shiki_140thh">                    .</span><span class="__shiki_1t8gfj">findFirst</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                    .</span><span class="__shiki_1t8gfj">orElseThrow</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> NoInstanceAvailableException</span><span class="__shiki_140thh">(serviceId));</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-3-服务发现的安全考虑" tabindex="-1">7.3 服务发现的安全考虑 <a class="header-anchor" href="#_7-3-服务发现的安全考虑" aria-label="Permalink to &quot;7.3 服务发现的安全考虑&quot;">​</a></h3><p><strong>安全措施：</strong></p><ul><li>服务间TLS加密</li><li>注册表访问认证</li><li>网络隔离</li><li>审计日志</li></ul><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">spring</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  security</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    user</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">admin</span></span>
<span class="line"><span class="__shiki_17hn0y">      password</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${REGISTRY_PASSWORD}</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_17hn0y">eureka</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  client</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    tls</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">      key-store</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">classpath:keystore.p12</span></span>
<span class="line"><span class="__shiki_17hn0y">      key-store-password</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">changeit</span></span></code></pre></div><h2 id="_8-高级特性与模式" tabindex="-1">8. 高级特性与模式 <a class="header-anchor" href="#_8-高级特性与模式" aria-label="Permalink to &quot;8. 高级特性与模式&quot;">​</a></h2><h3 id="_8-1-多区域部署" tabindex="-1">8.1 多区域部署 <a class="header-anchor" href="#_8-1-多区域部署" aria-label="Permalink to &quot;8.1 多区域部署&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[区域A] --&gt; B[Eureka Server A]</span></span>
<span class="line"><span class="__shiki_140thh">    C[区域B] --&gt; D[Eureka Server B]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; E[区域注册表]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    F[服务消费者] --&gt; E</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; G[就近路由]</span></span></code></pre></div><h3 id="_8-2-服务网格集成" tabindex="-1">8.2 服务网格集成 <a class="header-anchor" href="#_8-2-服务网格集成" aria-label="Permalink to &quot;8.2 服务网格集成&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.istio.io/v1alpha3</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ServiceEntry</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">external-svc</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  hosts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">api.example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">  ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">number</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">443</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">https</span></span>
<span class="line"><span class="__shiki_17hn0y">    protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HTTPS</span></span>
<span class="line"><span class="__shiki_17hn0y">  resolution</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">DNS</span></span>
<span class="line"><span class="__shiki_17hn0y">  location</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">MESH_EXTERNAL</span></span></code></pre></div><h3 id="_8-3-动态路由和权重控制" tabindex="-1">8.3 动态路由和权重控制 <a class="header-anchor" href="#_8-3-动态路由和权重控制" aria-label="Permalink to &quot;8.3 动态路由和权重控制&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Configuration</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> LoadBalancerConfiguration</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Bean</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> ServiceInstanceListSupplier </span><span class="__shiki_1t8gfj">discoveryClientServiceInstanceListSupplier</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            ConfigurableApplicationContext </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> ServiceInstanceListSupplier.</span><span class="__shiki_1t8gfj">builder</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">withDiscoveryClient</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">withWeighted</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">withCaching</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">build</span><span class="__shiki_140thh">(context);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_9-监控和运维" tabindex="-1">9. 监控和运维 <a class="header-anchor" href="#_9-监控和运维" aria-label="Permalink to &quot;9. 监控和运维&quot;">​</a></h2><h3 id="_9-1-关键监控指标" tabindex="-1">9.1 关键监控指标 <a class="header-anchor" href="#_9-1-关键监控指标" aria-label="Permalink to &quot;9.1 关键监控指标&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 服务发现相关指标</span></span>
<span class="line"><span class="__shiki_mdbnqw">eureka_registrations_total</span></span>
<span class="line"><span class="__shiki_mdbnqw">eureka_heartbeats_total</span></span>
<span class="line"><span class="__shiki_mdbnqw">service_discovery_duration_seconds</span></span>
<span class="line"><span class="__shiki_mdbnqw">service_instances_count{service=&quot;user-service&quot;}</span></span>
<span class="line"><span class="__shiki_mdbnqw">load_balancer_choices_total</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 健康检查指标</span></span>
<span class="line"><span class="__shiki_mdbnqw">health_check_duration_seconds</span></span>
<span class="line"><span class="__shiki_mdbnqw">health_check_failures_total</span></span>
<span class="line"><span class="__shiki_mdbnqw">service_health_status{service=&quot;user-service&quot;}</span></span></code></pre></div><h3 id="_9-2-故障排查清单" tabindex="-1">9.2 故障排查清单 <a class="header-anchor" href="#_9-2-故障排查清单" aria-label="Permalink to &quot;9.2 故障排查清单&quot;">​</a></h3><p><strong>常见问题：</strong></p><ul><li>服务注册失败</li><li>心跳超时</li><li>发现延迟</li><li>负载不均</li></ul><p><strong>排查步骤：</strong></p><ol><li>检查网络连通性</li><li>验证注册表状态</li><li>检查健康检查端点</li><li>查看客户端配置</li><li>监控日志和指标</li></ol><h2 id="_10-总结" tabindex="-1">10. 总结 <a class="header-anchor" href="#_10-总结" aria-label="Permalink to &quot;10. 总结&quot;">​</a></h2><p>服务发现在微服务架构中扮演着至关重要的角色，它：</p><p><strong>核心价值：</strong></p><ul><li>实现服务的动态管理和发现</li><li>支持弹性扩展和故障恢复</li><li>简化服务间通信的复杂度</li></ul><p><strong>技术选型考虑：</strong></p><ul><li>一致性要求（AP vs CP）</li><li>运维复杂度</li><li>生态系统集成</li><li>性能要求</li></ul><p><strong>发展趋势：</strong></p><ul><li>与服务网格深度集成</li><li>智能路由和流量管理</li><li>多云和混合云支持</li><li>安全的服务身份认证</li></ul><p>服务发现是现代微服务架构的基石，正确理解和实施服务发现机制，对于构建可靠、可扩展的分布式系统至关重要。</p>`,102)])])}const d=a(l,[["render",_]]);export{k as __pageData,d as default};
