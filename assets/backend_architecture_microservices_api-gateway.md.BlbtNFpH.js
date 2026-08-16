import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"🌉 微服务架构 - API网关 完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/architecture/microservices/api-gateway.md","filePath":"backend/architecture/microservices/api-gateway.md"}'),l={name:"backend/architecture/microservices/api-gateway.md"};function t(h,s,_,e,c,r){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="🌉-微服务架构-api网关-完整学习笔记" tabindex="-1">🌉 微服务架构 - API网关 完整学习笔记 <a class="header-anchor" href="#🌉-微服务架构-api网关-完整学习笔记" aria-label="Permalink to &quot;🌉 微服务架构 - API网关 完整学习笔记&quot;">​</a></h1><h2 id="_1-api网关核心概念" tabindex="-1">1. API网关核心概念 <a class="header-anchor" href="#_1-api网关核心概念" aria-label="Permalink to &quot;1. API网关核心概念&quot;">​</a></h2><h3 id="_1-1-什么是api网关" tabindex="-1">1.1 什么是API网关？ <a class="header-anchor" href="#_1-1-什么是api网关" aria-label="Permalink to &quot;1.1 什么是API网关？&quot;">​</a></h3><p>API网关是微服务架构中的<strong>统一入口点</strong>，它位于客户端与后端微服务之间，提供路由、认证、限流等横切关注点的集中处理。</p><h3 id="_1-2-为什么需要api网关" tabindex="-1">1.2 为什么需要API网关？ <a class="header-anchor" href="#_1-2-为什么需要api网关" aria-label="Permalink to &quot;1.2 为什么需要API网关？&quot;">​</a></h3><h4 id="_1-2-1-客户端直接调用微服务的问题" tabindex="-1">1.2.1 客户端直接调用微服务的问题 <a class="header-anchor" href="#_1-2-1-客户端直接调用微服务的问题" aria-label="Permalink to &quot;1.2.1 客户端直接调用微服务的问题&quot;">​</a></h4><ul><li><strong>复杂性</strong>：客户端需要了解多个微服务的地址和API</li><li><strong>跨域问题</strong>：不同服务可能部署在不同域名下</li><li><strong>认证分散</strong>：每个服务都需要实现认证逻辑</li><li><strong>协议差异</strong>：部分服务可能使用非HTTP协议（gRPC、WebSocket等）</li></ul><h4 id="_1-2-2-api网关的价值" tabindex="-1">1.2.2 API网关的价值 <a class="header-anchor" href="#_1-2-2-api网关的价值" aria-label="Permalink to &quot;1.2.2 API网关的价值&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    Client[客户端] --&gt; Gateway[API网关]</span></span>
<span class="line"><span class="__shiki_140thh">    Gateway --&gt; Auth[认证服务]</span></span>
<span class="line"><span class="__shiki_140thh">    Gateway --&gt; Order[订单服务]</span></span>
<span class="line"><span class="__shiki_140thh">    Gateway --&gt; Product[商品服务]</span></span>
<span class="line"><span class="__shiki_140thh">    Gateway --&gt; Payment[支付服务]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    style Gateway fill:#e1f5fe</span></span></code></pre></div><h2 id="_2-api网关核心功能" tabindex="-1">2. API网关核心功能 <a class="header-anchor" href="#_2-api网关核心功能" aria-label="Permalink to &quot;2. API网关核心功能&quot;">​</a></h2><h3 id="_2-1-请求路由与负载均衡" tabindex="-1">2.1 请求路由与负载均衡 <a class="header-anchor" href="#_2-1-请求路由与负载均衡" aria-label="Permalink to &quot;2.1 请求路由与负载均衡&quot;">​</a></h3><h4 id="_2-1-1-动态路由配置" tabindex="-1">2.1.1 动态路由配置 <a class="header-anchor" href="#_2-1-1-动态路由配置" aria-label="Permalink to &quot;2.1.1 动态路由配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Spring Cloud Gateway 配置示例</span></span>
<span class="line"><span class="__shiki_17hn0y">spring</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  cloud</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    gateway</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      routes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">user-service</span></span>
<span class="line"><span class="__shiki_17hn0y">          uri</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">lb://user-service</span></span>
<span class="line"><span class="__shiki_17hn0y">          predicates</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            - </span><span class="__shiki_mdbnqw">Path=/api/users/**</span></span>
<span class="line"><span class="__shiki_17hn0y">          filters</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            - </span><span class="__shiki_mdbnqw">StripPrefix=1</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">order-service</span></span>
<span class="line"><span class="__shiki_17hn0y">          uri</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">lb://order-service</span></span>
<span class="line"><span class="__shiki_17hn0y">          predicates</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            - </span><span class="__shiki_mdbnqw">Path=/api/orders/**</span></span></code></pre></div><h4 id="_2-1-2-负载均衡策略" tabindex="-1">2.1.2 负载均衡策略 <a class="header-anchor" href="#_2-1-2-负载均衡策略" aria-label="Permalink to &quot;2.1.2 负载均衡策略&quot;">​</a></h4><ul><li><strong>轮询</strong>（Round Robin）：均匀分配请求</li><li><strong>最少连接</strong>（Least Connections）：优先选择连接数最少的实例</li><li><strong>IP哈希</strong>（IP Hash）：基于客户端IP进行路由，保证会话一致性</li><li><strong>权重</strong>（Weighted）：根据服务器性能分配不同权重</li></ul><h3 id="_2-2-安全认证与授权" tabindex="-1">2.2 安全认证与授权 <a class="header-anchor" href="#_2-2-安全认证与授权" aria-label="Permalink to &quot;2.2 安全认证与授权&quot;">​</a></h3><h4 id="_2-2-1-认证流程" tabindex="-1">2.2.1 认证流程 <a class="header-anchor" href="#_2-2-1-认证流程" aria-label="Permalink to &quot;2.2.1 认证流程&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">sequenceDiagram</span></span>
<span class="line"><span class="__shiki_140thh">    participant C as Client</span></span>
<span class="line"><span class="__shiki_140thh">    participant G as API Gateway</span></span>
<span class="line"><span class="__shiki_140thh">    participant A as Auth Service</span></span>
<span class="line"><span class="__shiki_140thh">    participant S as Backend Service</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;G: 请求携带Token</span></span>
<span class="line"><span class="__shiki_140thh">    G-&gt;&gt;A: 验证Token有效性</span></span>
<span class="line"><span class="__shiki_140thh">    A--&gt;&gt;G: 返回用户信息</span></span>
<span class="line"><span class="__shiki_140thh">    G-&gt;&gt;S: 转发请求(携带用户上下文)</span></span>
<span class="line"><span class="__shiki_140thh">    S--&gt;&gt;G: 返回业务数据</span></span>
<span class="line"><span class="__shiki_140thh">    G--&gt;&gt;C: 返回响应</span></span></code></pre></div><h4 id="_2-2-2-安全功能矩阵" tabindex="-1">2.2.2 安全功能矩阵 <a class="header-anchor" href="#_2-2-2-安全功能矩阵" aria-label="Permalink to &quot;2.2.2 安全功能矩阵&quot;">​</a></h4><table tabindex="0"><thead><tr><th>安全功能</th><th>实现方式</th><th>使用场景</th></tr></thead><tbody><tr><td>JWT验证</td><td>解析和验证JWT令牌</td><td>前后端分离应用</td></tr><tr><td>OAuth2.0</td><td>集成认证服务器</td><td>第三方应用接入</td></tr><tr><td>API密钥</td><td>验证API Key</td><td>内部服务间调用</td></tr><tr><td>限流防刷</td><td>令牌桶/漏桶算法</td><td>防止API滥用</td></tr></tbody></table><h3 id="_2-3-流量控制与熔断" tabindex="-1">2.3 流量控制与熔断 <a class="header-anchor" href="#_2-3-流量控制与熔断" aria-label="Permalink to &quot;2.3 流量控制与熔断&quot;">​</a></h3><h4 id="_2-3-1-限流算法对比" tabindex="-1">2.3.1 限流算法对比 <a class="header-anchor" href="#_2-3-1-限流算法对比" aria-label="Permalink to &quot;2.3.1 限流算法对比&quot;">​</a></h4><table tabindex="0"><thead><tr><th>算法</th><th>原理</th><th>优点</th><th>缺点</th></tr></thead><tbody><tr><td><strong>令牌桶</strong></td><td>以固定速率生成令牌，请求需要获取令牌</td><td>允许突发流量</td><td>实现相对复杂</td></tr><tr><td><strong>漏桶</strong></td><td>以固定速率处理请求，超出容量则拒绝</td><td>平滑流量</td><td>无法处理突发</td></tr><tr><td><strong>固定窗口</strong></td><td>在固定时间窗口内计数</td><td>实现简单</td><td>边界时间可能超限</td></tr><tr><td><strong>滑动窗口</strong></td><td>在滑动时间窗口内计数</td><td>更精确控制</td><td>内存开销较大</td></tr></tbody></table><h4 id="_2-3-2-熔断器状态机" tabindex="-1">2.3.2 熔断器状态机 <a class="header-anchor" href="#_2-3-2-熔断器状态机" aria-label="Permalink to &quot;2.3.2 熔断器状态机&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[Closed&lt;br/&gt;正常状态] --&gt;|失败次数超过阈值| B[Open&lt;br/&gt;熔断状态]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt;|经过超时时间| C[Half-Open&lt;br/&gt;半开状态]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt;|测试请求成功| A</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt;|测试请求失败| B</span></span></code></pre></div><h3 id="_2-4-数据转换与聚合" tabindex="-1">2.4 数据转换与聚合 <a class="header-anchor" href="#_2-4-数据转换与聚合" aria-label="Permalink to &quot;2.4 数据转换与聚合&quot;">​</a></h3><h4 id="_2-4-1-响应聚合模式" tabindex="-1">2.4.1 响应聚合模式 <a class="header-anchor" href="#_2-4-1-响应聚合模式" aria-label="Permalink to &quot;2.4.1 响应聚合模式&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 伪代码：订单详情聚合</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> OrderAggregator</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> OrderDetails </span><span class="__shiki_1t8gfj">aggregateOrder</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">orderId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 并行调用多个服务</span></span>
<span class="line"><span class="__shiki_140thh">        CompletableFuture&lt;</span><span class="__shiki_1itgoe">Order</span><span class="__shiki_140thh">&gt; orderFuture </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> getOrder</span><span class="__shiki_140thh">(orderId);</span></span>
<span class="line"><span class="__shiki_140thh">        CompletableFuture&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; userFuture </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> getUser</span><span class="__shiki_140thh">(order.</span><span class="__shiki_1t8gfj">getUserId</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        CompletableFuture&lt;List&lt;</span><span class="__shiki_1itgoe">Product</span><span class="__shiki_140thh">&gt;&gt; productsFuture </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> getProducts</span><span class="__shiki_140thh">(order.</span><span class="__shiki_1t8gfj">getProductIds</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 聚合结果</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> CompletableFuture.</span><span class="__shiki_1t8gfj">allOf</span><span class="__shiki_140thh">(orderFuture, userFuture, productsFuture)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">thenApply</span><span class="__shiki_140thh">(v </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_1t8gfj"> combineResults</span><span class="__shiki_140thh">(orderFuture, userFuture, productsFuture));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-5-监控与可观测性" tabindex="-1">2.5 监控与可观测性 <a class="header-anchor" href="#_2-5-监控与可观测性" aria-label="Permalink to &quot;2.5 监控与可观测性&quot;">​</a></h3><h4 id="_2-5-1-关键监控指标" tabindex="-1">2.5.1 关键监控指标 <a class="header-anchor" href="#_2-5-1-关键监控指标" aria-label="Permalink to &quot;2.5.1 关键监控指标&quot;">​</a></h4><ul><li><strong>流量指标</strong>：QPS、并发数、带宽使用</li><li><strong>性能指标</strong>：响应时间(P50/P95/P99)、错误率</li><li><strong>业务指标</strong>：API调用次数、关键业务成功率</li><li><strong>系统指标</strong>：CPU、内存、网络IO</li></ul><h2 id="_3-api网关架构模式" tabindex="-1">3. API网关架构模式 <a class="header-anchor" href="#_3-api网关架构模式" aria-label="Permalink to &quot;3. API网关架构模式&quot;">​</a></h2><h3 id="_3-1-网关分层架构" tabindex="-1">3.1 网关分层架构 <a class="header-anchor" href="#_3-1-网关分层架构" aria-label="Permalink to &quot;3.1 网关分层架构&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    subgraph &quot;客户端层&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        Web[Web应用]</span></span>
<span class="line"><span class="__shiki_140thh">        Mobile[移动App]</span></span>
<span class="line"><span class="__shiki_140thh">        Third[第三方应用]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    subgraph &quot;网关层&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        Edge[边缘网关&lt;br/&gt;SSL/限流/缓存]</span></span>
<span class="line"><span class="__shiki_140thh">        Aggregation[聚合网关&lt;br/&gt;BFF模式]</span></span>
<span class="line"><span class="__shiki_140thh">        Internal[内部网关&lt;br/&gt;服务间通信]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    subgraph &quot;微服务层&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        Auth[认证服务]</span></span>
<span class="line"><span class="__shiki_140thh">        Order[订单服务]</span></span>
<span class="line"><span class="__shiki_140thh">        Product[商品服务]</span></span>
<span class="line"><span class="__shiki_140thh">        User[用户服务]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Web --&gt; Edge</span></span>
<span class="line"><span class="__shiki_140thh">    Mobile --&gt; Edge</span></span>
<span class="line"><span class="__shiki_140thh">    Third --&gt; Edge</span></span>
<span class="line"><span class="__shiki_140thh">    Edge --&gt; Aggregation</span></span>
<span class="line"><span class="__shiki_140thh">    Aggregation --&gt; Internal</span></span>
<span class="line"><span class="__shiki_140thh">    Internal --&gt; Auth</span></span>
<span class="line"><span class="__shiki_140thh">    Internal --&gt; Order</span></span>
<span class="line"><span class="__shiki_140thh">    Internal --&gt; Product</span></span>
<span class="line"><span class="__shiki_140thh">    Internal --&gt; User</span></span></code></pre></div><h3 id="_3-2-bff模式-backend-for-frontend" tabindex="-1">3.2 BFF模式（Backend For Frontend） <a class="header-anchor" href="#_3-2-bff模式-backend-for-frontend" aria-label="Permalink to &quot;3.2 BFF模式（Backend For Frontend）&quot;">​</a></h3><h4 id="_3-2-1-bff模式概念" tabindex="-1">3.2.1 BFF模式概念 <a class="header-anchor" href="#_3-2-1-bff模式概念" aria-label="Permalink to &quot;3.2.1 BFF模式概念&quot;">​</a></h4><p>为不同的客户端类型提供专属的后端服务，每个BFF针对特定客户端优化API。</p><h4 id="_3-2-2-bff实施案例" tabindex="-1">3.2.2 BFF实施案例 <a class="header-anchor" href="#_3-2-2-bff实施案例" aria-label="Permalink to &quot;3.2.2 BFF实施案例&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    subgraph &quot;客户端&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        Web[Web应用]</span></span>
<span class="line"><span class="__shiki_140thh">        Mobile[移动App]</span></span>
<span class="line"><span class="__shiki_140thh">        Admin[管理后台]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    subgraph &quot;BFF层&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        WebBFF[Web BFF&lt;br/&gt;SSR/SEO优化]</span></span>
<span class="line"><span class="__shiki_140thh">        MobileBFF[Mobile BFF&lt;br/&gt;数据压缩/推送]</span></span>
<span class="line"><span class="__shiki_140thh">        AdminBFF[Admin BFF&lt;br/&gt;批量操作/权限]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    subgraph &quot;微服务&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        Order[订单服务]</span></span>
<span class="line"><span class="__shiki_140thh">        User[用户服务]</span></span>
<span class="line"><span class="__shiki_140thh">        Product[商品服务]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Web --&gt; WebBFF</span></span>
<span class="line"><span class="__shiki_140thh">    Mobile --&gt; MobileBFF</span></span>
<span class="line"><span class="__shiki_140thh">    Admin --&gt; AdminBFF</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    WebBFF --&gt; Order</span></span>
<span class="line"><span class="__shiki_140thh">    WebBFF --&gt; User</span></span>
<span class="line"><span class="__shiki_140thh">    WebBFF --&gt; Product</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    MobileBFF --&gt; Order</span></span>
<span class="line"><span class="__shiki_140thh">    MobileBFF --&gt; User</span></span>
<span class="line"><span class="__shiki_140thh">    MobileBFF --&gt; Product</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    AdminBFF --&gt; Order</span></span>
<span class="line"><span class="__shiki_140thh">    AdminBFF --&gt; User</span></span>
<span class="line"><span class="__shiki_140thh">    AdminBFF --&gt; Product</span></span></code></pre></div><h3 id="_3-3-网关部署模式" tabindex="-1">3.3 网关部署模式 <a class="header-anchor" href="#_3-3-网关部署模式" aria-label="Permalink to &quot;3.3 网关部署模式&quot;">​</a></h3><h4 id="_3-3-1-单中心网关" tabindex="-1">3.3.1 单中心网关 <a class="header-anchor" href="#_3-3-1-单中心网关" aria-label="Permalink to &quot;3.3.1 单中心网关&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    Client1[客户端1]</span></span>
<span class="line"><span class="__shiki_140thh">    Client2[客户端2]</span></span>
<span class="line"><span class="__shiki_140thh">    Client3[客户端3]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Gateway[中心API网关]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    ServiceA[服务A]</span></span>
<span class="line"><span class="__shiki_140thh">    ServiceB[服务B]</span></span>
<span class="line"><span class="__shiki_140thh">    ServiceC[服务C]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Client1 --&gt; Gateway</span></span>
<span class="line"><span class="__shiki_140thh">    Client2 --&gt; Gateway</span></span>
<span class="line"><span class="__shiki_140thh">    Client3 --&gt; Gateway</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Gateway --&gt; ServiceA</span></span>
<span class="line"><span class="__shiki_140thh">    Gateway --&gt; ServiceB</span></span>
<span class="line"><span class="__shiki_140thh">    Gateway --&gt; ServiceC</span></span></code></pre></div><h4 id="_3-3-2-多区域网关" tabindex="-1">3.3.2 多区域网关 <a class="header-anchor" href="#_3-3-2-多区域网关" aria-label="Permalink to &quot;3.3.2 多区域网关&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    subgraph &quot;区域A&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        ClientA[客户端]</span></span>
<span class="line"><span class="__shiki_140thh">        GatewayA[区域网关A]</span></span>
<span class="line"><span class="__shiki_140thh">        ServiceA1[服务A1]</span></span>
<span class="line"><span class="__shiki_140thh">        ServiceA2[服务A2]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        ClientA --&gt; GatewayA</span></span>
<span class="line"><span class="__shiki_140thh">        GatewayA --&gt; ServiceA1</span></span>
<span class="line"><span class="__shiki_140thh">        GatewayA --&gt; ServiceA2</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    subgraph &quot;区域B&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        ClientB[客户端]</span></span>
<span class="line"><span class="__shiki_140thh">        GatewayB[区域网关B]</span></span>
<span class="line"><span class="__shiki_140thh">        ServiceB1[服务B1]</span></span>
<span class="line"><span class="__shiki_140thh">        ServiceB2[服务B2]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        ClientB --&gt; GatewayB</span></span>
<span class="line"><span class="__shiki_140thh">        GatewayB --&gt; ServiceB1</span></span>
<span class="line"><span class="__shiki_140thh">        GatewayB --&gt; ServiceB2</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    GatewayA -.-&gt; GatewayB</span></span></code></pre></div><h2 id="_4-主流api网关技术对比" tabindex="-1">4. 主流API网关技术对比 <a class="header-anchor" href="#_4-主流api网关技术对比" aria-label="Permalink to &quot;4. 主流API网关技术对比&quot;">​</a></h2><h3 id="_4-1-开源网关对比" tabindex="-1">4.1 开源网关对比 <a class="header-anchor" href="#_4-1-开源网关对比" aria-label="Permalink to &quot;4.1 开源网关对比&quot;">​</a></h3><table tabindex="0"><thead><tr><th>特性</th><th>Spring Cloud Gateway</th><th>Kong</th><th>Nginx</th><th>Envoy</th></tr></thead><tbody><tr><td><strong>性能</strong></td><td>中等（基于WebFlux）</td><td>高（基于Nginx）</td><td>非常高</td><td>高</td></tr><tr><td><strong>配置方式</strong></td><td>代码/配置文件</td><td>数据库/REST API</td><td>配置文件</td><td>配置文件/xDS</td></tr><tr><td><strong>服务发现</strong></td><td>支持</td><td>插件支持</td><td>有限支持</td><td>原生支持</td></tr><tr><td><strong>扩展性</strong></td><td>Java插件</td><td>Lua插件</td><td>C模块</td><td>C++过滤器</td></tr><tr><td><strong>监控</strong></td><td>Micrometer</td><td>插件丰富</td><td>基础监控</td><td>原生Observability</td></tr></tbody></table><h3 id="_4-2-云服务商网关" tabindex="-1">4.2 云服务商网关 <a class="header-anchor" href="#_4-2-云服务商网关" aria-label="Permalink to &quot;4.2 云服务商网关&quot;">​</a></h3><table tabindex="0"><thead><tr><th>特性</th><th>AWS API Gateway</th><th>Azure API Management</th><th>Google API Gateway</th><th>阿里云API网关</th></tr></thead><tbody><tr><td><strong>计费模式</strong></td><td>按调用次数</td><td>按层级定价</td><td>按调用次数</td><td>按调用次数</td></tr><tr><td><strong>集成生态</strong></td><td>深度AWS集成</td><td>Azure服务集成</td><td>GCP服务集成</td><td>阿里云服务集成</td></tr><tr><td><strong>自定义域名</strong></td><td>支持</td><td>支持</td><td>支持</td><td>支持</td></tr><tr><td><strong>自动扩缩容</strong></td><td>是</td><td>是</td><td>是</td><td>是</td></tr><tr><td><strong>价格</strong></td><td>中等</td><td>较高</td><td>中等</td><td>较低</td></tr></tbody></table><h2 id="_5-api网关设计最佳实践" tabindex="-1">5. API网关设计最佳实践 <a class="header-anchor" href="#_5-api网关设计最佳实践" aria-label="Permalink to &quot;5. API网关设计最佳实践&quot;">​</a></h2><h3 id="_5-1-性能优化策略" tabindex="-1">5.1 性能优化策略 <a class="header-anchor" href="#_5-1-性能优化策略" aria-label="Permalink to &quot;5.1 性能优化策略&quot;">​</a></h3><h4 id="_5-1-1-缓存策略" tabindex="-1">5.1.1 缓存策略 <a class="header-anchor" href="#_5-1-1-缓存策略" aria-label="Permalink to &quot;5.1.1 缓存策略&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 网关缓存配置示例</span></span>
<span class="line"><span class="__shiki_17hn0y">caching</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  strategies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    user-profile</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      ttl</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">300s</span><span class="__shiki_21nrsd">      # 5分钟缓存</span></span>
<span class="line"><span class="__shiki_17hn0y">      max-size</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_21nrsd"> # 最大缓存条目</span></span>
<span class="line"><span class="__shiki_17hn0y">    product-info</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      ttl</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">3600s</span><span class="__shiki_21nrsd">     # 1小时缓存</span></span>
<span class="line"><span class="__shiki_17hn0y">      max-size</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">50000</span></span></code></pre></div><h4 id="_5-1-2-连接池优化" tabindex="-1">5.1.2 连接池优化 <a class="header-anchor" href="#_5-1-2-连接池优化" aria-label="Permalink to &quot;5.1.2 连接池优化&quot;">​</a></h4><ul><li><strong>HTTP连接池</strong>：最大连接数、每路由连接数、超时设置</li><li><strong>数据库连接池</strong>：合理设置最大最小连接数</li><li><strong>线程池配置</strong>：IO密集型 vs CPU密集型任务</li></ul><h3 id="_5-2-安全最佳实践" tabindex="-1">5.2 安全最佳实践 <a class="header-anchor" href="#_5-2-安全最佳实践" aria-label="Permalink to &quot;5.2 安全最佳实践&quot;">​</a></h3><h4 id="_5-2-1-防御层设计" tabindex="-1">5.2.1 防御层设计 <a class="header-anchor" href="#_5-2-1-防御层设计" aria-label="Permalink to &quot;5.2.1 防御层设计&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    Request[客户端请求] --&gt; WAF[Web应用防火墙]</span></span>
<span class="line"><span class="__shiki_140thh">    WAF --&gt; RateLimit[限流层]</span></span>
<span class="line"><span class="__shiki_140thh">    RateLimit --&gt; Auth[认证层]</span></span>
<span class="line"><span class="__shiki_140thh">    Auth --&gt; InputValidation[输入验证]</span></span>
<span class="line"><span class="__shiki_140thh">    InputValidation --&gt; BusinessLogic[业务逻辑]</span></span></code></pre></div><h4 id="_5-2-2-api安全清单" tabindex="-1">5.2.2 API安全清单 <a class="header-anchor" href="#_5-2-2-api安全清单" aria-label="Permalink to &quot;5.2.2 API安全清单&quot;">​</a></h4><ul><li>[x] 强制HTTPS</li><li>[x] JWT令牌验证</li><li>[x] API密钥管理</li><li>[x] 请求签名验证</li><li>[x] SQL注入防护</li><li>[x] XSS攻击防护</li><li>[x] CSRF令牌验证</li></ul><h3 id="_5-3-高可用设计" tabindex="-1">5.3 高可用设计 <a class="header-anchor" href="#_5-3-高可用设计" aria-label="Permalink to &quot;5.3 高可用设计&quot;">​</a></h3><h4 id="_5-3-1-集群部署架构" tabindex="-1">5.3.1 集群部署架构 <a class="header-anchor" href="#_5-3-1-集群部署架构" aria-label="Permalink to &quot;5.3.1 集群部署架构&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Kubernetes部署示例</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">api-gateway</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">  strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">RollingUpdate</span></span>
<span class="line"><span class="__shiki_17hn0y">    rollingUpdate</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      maxSurge</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">      maxUnavailable</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gateway</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">api-gateway:1.0.0</span></span>
<span class="line"><span class="__shiki_17hn0y">        resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;512Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;250m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1Gi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;500m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        livenessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          httpGet</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/health</span></span>
<span class="line"><span class="__shiki_17hn0y">            port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span></code></pre></div><h4 id="_5-3-2-容灾策略" tabindex="-1">5.3.2 容灾策略 <a class="header-anchor" href="#_5-3-2-容灾策略" aria-label="Permalink to &quot;5.3.2 容灾策略&quot;">​</a></h4><ul><li><strong>多区域部署</strong>：跨可用区部署网关实例</li><li><strong>故障转移</strong>：DNS故障转移 + 健康检查</li><li><strong>优雅降级</strong>：核心功能优先保障</li><li><strong>数据备份</strong>：配置信息定期备份</li></ul><h2 id="_6-api网关演进策略" tabindex="-1">6. API网关演进策略 <a class="header-anchor" href="#_6-api网关演进策略" aria-label="Permalink to &quot;6. API网关演进策略&quot;">​</a></h2><h3 id="_6-1-从单体到网关的迁移" tabindex="-1">6.1 从单体到网关的迁移 <a class="header-anchor" href="#_6-1-从单体到网关的迁移" aria-label="Permalink to &quot;6.1 从单体到网关的迁移&quot;">​</a></h3><h4 id="_6-1-1-绞杀者模式" tabindex="-1">6.1.1 绞杀者模式 <a class="header-anchor" href="#_6-1-1-绞杀者模式" aria-label="Permalink to &quot;6.1.1 绞杀者模式&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    Client[客户端] --&gt; Router[路由层]</span></span>
<span class="line"><span class="__shiki_140thh">    Router --&gt;|旧路径| Monolith[单体应用]</span></span>
<span class="line"><span class="__shiki_140thh">    Router --&gt;|新路径| Gateway[API网关]</span></span>
<span class="line"><span class="__shiki_140thh">    Gateway --&gt; NewService1[新服务1]</span></span>
<span class="line"><span class="__shiki_140thh">    Gateway --&gt; NewService2[新服务2]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    style Monolith fill:#ffebee</span></span>
<span class="line"><span class="__shiki_140thh">    style Gateway fill:#e8f5e8</span></span></code></pre></div><h4 id="_6-1-2-迁移阶段" tabindex="-1">6.1.2 迁移阶段 <a class="header-anchor" href="#_6-1-2-迁移阶段" aria-label="Permalink to &quot;6.1.2 迁移阶段&quot;">​</a></h4><ol><li><strong>阶段一</strong>：网关与单体并存，逐步迁移API</li><li><strong>阶段二</strong>：网关作为唯一入口，反向代理到单体</li><li><strong>阶段三</strong>：新功能通过网关接入微服务</li><li><strong>阶段四</strong>：完全迁移至微服务架构</li></ol><h3 id="_6-2-网关版本管理" tabindex="-1">6.2 网关版本管理 <a class="header-anchor" href="#_6-2-网关版本管理" aria-label="Permalink to &quot;6.2 网关版本管理&quot;">​</a></h3><h4 id="_6-2-1-api版本策略" tabindex="-1">6.2.1 API版本策略 <a class="header-anchor" href="#_6-2-1-api版本策略" aria-label="Permalink to &quot;6.2.1 API版本策略&quot;">​</a></h4><div class="language-http vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">http</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 路径版本</span></span>
<span class="line"><span class="__shiki_1itgoe">GET</span><span class="__shiki_140thh"> /v1/users/123</span></span>
<span class="line"><span class="__shiki_1itgoe">GET</span><span class="__shiki_140thh"> /v2/users/123</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 头信息版本</span></span>
<span class="line"><span class="__shiki_1itgoe">GET</span><span class="__shiki_140thh"> /users/123</span></span>
<span class="line"><span class="__shiki_17hn0y">Accept</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> application/vnd.company.v1+json</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查询参数版本</span></span>
<span class="line"><span class="__shiki_1itgoe">GET</span><span class="__shiki_140thh"> /users/123?version=1</span></span></code></pre></div><h4 id="_6-2-2-版本路由配置" tabindex="-1">6.2.2 版本路由配置 <a class="header-anchor" href="#_6-2-2-版本路由配置" aria-label="Permalink to &quot;6.2.2 版本路由配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">routes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">user-service-v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    uri</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">lb://user-service-v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    predicates</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">Path=/v1/users/**</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1.0&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">user-service-v2</span><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">    uri</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">lb://user-service-v2</span></span>
<span class="line"><span class="__shiki_17hn0y">    predicates</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">Path=/v2/users/**</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2.0&quot;</span></span></code></pre></div><h2 id="_7-监控与运维" tabindex="-1">7. 监控与运维 <a class="header-anchor" href="#_7-监控与运维" aria-label="Permalink to &quot;7. 监控与运维&quot;">​</a></h2><h3 id="_7-1-关键监控指标" tabindex="-1">7.1 关键监控指标 <a class="header-anchor" href="#_7-1-关键监控指标" aria-label="Permalink to &quot;7.1 关键监控指标&quot;">​</a></h3><h4 id="_7-1-1-业务层面监控" tabindex="-1">7.1.1 业务层面监控 <a class="header-anchor" href="#_7-1-1-业务层面监控" aria-label="Permalink to &quot;7.1.1 业务层面监控&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 网关QPS监控</span></span>
<span class="line"><span class="__shiki_mdbnqw">api_gateway_requests_total{route_id=&quot;user-service&quot;, status=&quot;200&quot;}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 响应时间分布</span></span>
<span class="line"><span class="__shiki_mdbnqw">api_gateway_request_duration_seconds_bucket{route_id=&quot;user-service&quot;, le=&quot;0.1&quot;}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 错误率</span></span>
<span class="line"><span class="__shiki_mdbnqw">rate(api_gateway_requests_total{status=~&quot;5..&quot;}[5m]) /</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">rate(api_gateway_requests_total[5m])</span></span></code></pre></div><h4 id="_7-1-2-系统层面监控" tabindex="-1">7.1.2 系统层面监控 <a class="header-anchor" href="#_7-1-2-系统层面监控" aria-label="Permalink to &quot;7.1.2 系统层面监控&quot;">​</a></h4><ul><li><strong>资源使用</strong>：CPU、内存、网络IO、磁盘IO</li><li><strong>JVM指标</strong>（Java网关）：堆内存、GC时间、线程数</li><li><strong>连接数</strong>：活跃连接、等待队列长度</li></ul><h3 id="_7-2-日志与追踪" tabindex="-1">7.2 日志与追踪 <a class="header-anchor" href="#_7-2-日志与追踪" aria-label="Permalink to &quot;7.2 日志与追踪&quot;">​</a></h3><h4 id="_7-2-1-结构化日志" tabindex="-1">7.2.1 结构化日志 <a class="header-anchor" href="#_7-2-1-结构化日志" aria-label="Permalink to &quot;7.2.1 结构化日志&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;timestamp&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2024-01-15T10:30:00Z&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;level&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;INFO&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;logger&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;APIGateway&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;traceId&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;abc-123-xyz&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;routeId&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;user-service&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;clientIp&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;192.168.1.100&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;method&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;GET&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;path&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/api/users/123&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;status&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;responseTime&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">45</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;userAgent&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Mozilla/5.0...&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_7-2-2-分布式追踪" tabindex="-1">7.2.2 分布式追踪 <a class="header-anchor" href="#_7-2-2-分布式追踪" aria-label="Permalink to &quot;7.2.2 分布式追踪&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[网关收到请求] --&gt; B[认证服务]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[用户服务]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[订单服务]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    style A fill:#4caf50</span></span>
<span class="line"><span class="__shiki_140thh">    style B fill:#2196f3</span></span>
<span class="line"><span class="__shiki_140thh">    style C fill:#2196f3</span></span>
<span class="line"><span class="__shiki_140thh">    style D fill:#2196f3</span></span></code></pre></div><h2 id="_8-总结" tabindex="-1">8. 总结 <a class="header-anchor" href="#_8-总结" aria-label="Permalink to &quot;8. 总结&quot;">​</a></h2><p>API网关是微服务架构的核心组件，它通过提供统一的入口点，简化了客户端的调用复杂度，集中处理横切关注点。成功的API网关设计需要在<strong>功能性</strong>、<strong>性能</strong>、<strong>安全性</strong>和<strong>可维护性</strong>之间找到平衡。</p><p><strong>关键成功因素</strong>：</p><ul><li>✅ 合理的服务拆分和路由设计</li><li>✅ 完善的安全防护机制</li><li>✅ 有效的性能优化策略</li><li>✅ 全面的监控告警体系</li><li>✅ 清晰的版本管理策略</li></ul><p>记住：API网关不是银弹，过度使用网关可能导致单点故障和性能瓶颈。应根据实际业务场景选择合适的网关模式和功能集合。</p>`,92)])])}const k=a(l,[["render",t]]);export{o as __pageData,k as default};
