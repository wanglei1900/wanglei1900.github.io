import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"可观测性、日志管理与分布式追踪学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/observability/logging/tracing.md","filePath":"backend/observability/logging/tracing.md"}'),t={name:"backend/observability/logging/tracing.md"};function h(l,s,_,e,c,r){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="可观测性、日志管理与分布式追踪学习笔记" tabindex="-1">可观测性、日志管理与分布式追踪学习笔记 <a class="header-anchor" href="#可观测性、日志管理与分布式追踪学习笔记" aria-label="Permalink to &quot;可观测性、日志管理与分布式追踪学习笔记&quot;">​</a></h1><h2 id="第一部分-可观测性基础" tabindex="-1">第一部分：可观测性基础 <a class="header-anchor" href="#第一部分-可观测性基础" aria-label="Permalink to &quot;第一部分：可观测性基础&quot;">​</a></h2><h3 id="_1-可观测性定义与三大支柱" tabindex="-1">1. 可观测性定义与三大支柱 <a class="header-anchor" href="#_1-可观测性定义与三大支柱" aria-label="Permalink to &quot;1. 可观测性定义与三大支柱&quot;">​</a></h3><p><strong>可观测性</strong>是指通过系统的外部输出来理解其内部状态的能力，而不仅仅是传统的监控。</p><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[可观测性] --&gt; B[三大支柱]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[日志]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; D[指标]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; E[追踪]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[发生了什么&lt;br&gt;离散事件记录]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[系统表现如何&lt;br&gt;时序数值数据]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E1[请求流经哪里&lt;br&gt;分布式调用链]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    F[关联分析] --&gt; C</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; D</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; E</span></span></code></pre></div><h3 id="_2-三大支柱对比分析" tabindex="-1">2. 三大支柱对比分析 <a class="header-anchor" href="#_2-三大支柱对比分析" aria-label="Permalink to &quot;2. 三大支柱对比分析&quot;">​</a></h3><table tabindex="0"><thead><tr><th>维度</th><th><strong>日志</strong></th><th><strong>指标</strong></th><th><strong>分布式追踪</strong></th></tr></thead><tbody><tr><td><strong>数据类型</strong></td><td>离散事件记录</td><td>时序数值数据</td><td>请求调用链</td></tr><tr><td><strong>关注点</strong></td><td>&quot;发生了什么&quot;</td><td>&quot;系统状态如何&quot;</td><td>&quot;请求路径与性能&quot;</td></tr><tr><td><strong>数据量</strong></td><td>大</td><td>小</td><td>中等</td></tr><tr><td><strong>查询方式</strong></td><td>全文搜索、字段过滤</td><td>聚合计算</td><td>跟踪ID查询、依赖分析</td></tr></tbody></table><hr><h2 id="第二部分-分布式追踪详解" tabindex="-1">第二部分：分布式追踪详解 <a class="header-anchor" href="#第二部分-分布式追踪详解" aria-label="Permalink to &quot;第二部分：分布式追踪详解&quot;">​</a></h2><h3 id="_1-分布式追踪的核心概念" tabindex="-1">1. 分布式追踪的核心概念 <a class="header-anchor" href="#_1-分布式追踪的核心概念" aria-label="Permalink to &quot;1. 分布式追踪的核心概念&quot;">​</a></h3><h4 id="为什么需要分布式追踪" tabindex="-1">为什么需要分布式追踪？ <a class="header-anchor" href="#为什么需要分布式追踪" aria-label="Permalink to &quot;为什么需要分布式追踪？&quot;">​</a></h4><ul><li>微服务架构中，单个请求可能涉及数十个服务</li><li>传统监控无法追踪跨服务的请求流</li><li>故障定位困难，性能瓶颈难以发现</li></ul><h4 id="核心术语" tabindex="-1">核心术语 <a class="header-anchor" href="#核心术语" aria-label="Permalink to &quot;核心术语&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[Trace] --&gt; B[Span]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[Span Context]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; D[Tags]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; E[Logs]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    F[父Span] --&gt; G[子Span]</span></span>
<span class="line"><span class="__shiki_140thh">    G --&gt; H[引用关系]</span></span></code></pre></div><p><strong>核心概念定义：</strong></p><ul><li><strong>Trace（追踪）</strong>：一个完整请求链路，包含多个Span</li><li><strong>Span（跨度）</strong>：单个工作单元，代表一个操作</li><li><strong>Span Context</strong>：跨服务传递的上下文信息</li><li><strong>Parent/Child关系</strong>：Span之间的调用关系</li></ul><h3 id="_2-span的详细结构" tabindex="-1">2. Span的详细结构 <a class="header-anchor" href="#_2-span的详细结构" aria-label="Permalink to &quot;2. Span的详细结构&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;trace_id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;4bf92f3577b34da6a3ce929d0e0e4736&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;span_id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;e457b5a2e4d86bd1&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;parent_span_id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;e457b5a2e4d86bd1&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;name&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;HTTP GET /api/users&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;kind&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;SERVER&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;start_time&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2023-10-27T10:00:00Z&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;end_time&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2023-10-27T10:00:01Z&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;attributes&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;http.method&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;GET&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;http.status_code&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;service.name&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;user-service&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;events&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;name&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;exception&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;timestamp&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2023-10-27T10:00:00.500Z&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;attributes&quot;</span><span class="__shiki_140thh">: {</span><span class="__shiki_dzsirb">&quot;exception.type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;NullPointerException&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-追踪上下文传播" tabindex="-1">3. 追踪上下文传播 <a class="header-anchor" href="#_3-追踪上下文传播" aria-label="Permalink to &quot;3. 追踪上下文传播&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">sequenceDiagram</span></span>
<span class="line"><span class="__shiki_140thh">    participant C as Client</span></span>
<span class="line"><span class="__shiki_140thh">    participant A as Service A</span></span>
<span class="line"><span class="__shiki_140thh">    participant B as Service B</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;A: HTTP Request&lt;br/&gt;+ Trace Headers</span></span>
<span class="line"><span class="__shiki_140thh">    Note over C,A: Headers: traceparent, tracestate</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    A-&gt;&gt;A: 创建Span A</span></span>
<span class="line"><span class="__shiki_140thh">    A-&gt;&gt;B: HTTP Request&lt;br/&gt;+ Propagated Headers</span></span>
<span class="line"><span class="__shiki_140thh">    Note over A,B: 传播追踪上下文</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B-&gt;&gt;B: 创建Span B&lt;br/&gt;(parent: Span A)</span></span>
<span class="line"><span class="__shiki_140thh">    B--&gt;&gt;A: Response</span></span>
<span class="line"><span class="__shiki_140thh">    A--&gt;&gt;C: Response</span></span></code></pre></div><p><strong>上下文传播标准：</strong></p><ul><li><strong>W3C Trace Context</strong>: <code>traceparent</code>, <code>tracestate</code></li><li><strong>B3 Propagation</strong>: <code>X-B3-TraceId</code>, <code>X-B3-SpanId</code></li><li><strong>Jaeger</strong>: <code>uber-trace-id</code></li></ul><hr><h2 id="第三部分-分布式追踪系统架构" tabindex="-1">第三部分：分布式追踪系统架构 <a class="header-anchor" href="#第三部分-分布式追踪系统架构" aria-label="Permalink to &quot;第三部分：分布式追踪系统架构&quot;">​</a></h2><h3 id="_1-整体架构组件" tabindex="-1">1. 整体架构组件 <a class="header-anchor" href="#_1-整体架构组件" aria-label="Permalink to &quot;1. 整体架构组件&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[应用程序] --&gt;|产生Span| B[追踪SDK]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt;|上报数据| C[收集器]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[消息队列]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[处理引擎]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; F[存储后端]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; G[查询界面]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    subgraph 应用程序层</span></span>
<span class="line"><span class="__shiki_140thh">        A1[Service A] --&gt; B</span></span>
<span class="line"><span class="__shiki_140thh">        A2[Service B] --&gt; B</span></span>
<span class="line"><span class="__shiki_140thh">        A3[Service C] --&gt; B</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    subgraph 数据处理层</span></span>
<span class="line"><span class="__shiki_140thh">        C --&gt; C1[数据验证]</span></span>
<span class="line"><span class="__shiki_140thh">        C --&gt; C2[数据转换]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    subgraph 存储查询层</span></span>
<span class="line"><span class="__shiki_140thh">        F --&gt; F1[Trace存储]</span></span>
<span class="line"><span class="__shiki_140thh">        F --&gt; F2[索引存储]</span></span>
<span class="line"><span class="__shiki_140thh">        G --&gt; G1[Trace查询]</span></span>
<span class="line"><span class="__shiki_140thh">        G --&gt; G2[依赖图]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span></code></pre></div><h3 id="_2-数据收集模式" tabindex="-1">2. 数据收集模式 <a class="header-anchor" href="#_2-数据收集模式" aria-label="Permalink to &quot;2. 数据收集模式&quot;">​</a></h3><h4 id="_2-1-基于代理的模式" tabindex="-1">2.1 基于代理的模式 <a class="header-anchor" href="#_2-1-基于代理的模式" aria-label="Permalink to &quot;2.1 基于代理的模式&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[App] --&gt;|Span数据| B[Sidecar代理]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[收集器]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[后端存储]</span></span></code></pre></div><h4 id="_2-2-直接上报模式" tabindex="-1">2.2 直接上报模式 <a class="header-anchor" href="#_2-2-直接上报模式" aria-label="Permalink to &quot;2.2 直接上报模式&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[App] --&gt;|直接上报| B[收集器]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[后端存储]</span></span></code></pre></div><h4 id="_2-3-服务网格集成" tabindex="-1">2.3 服务网格集成 <a class="header-anchor" href="#_2-3-服务网格集成" aria-label="Permalink to &quot;2.3 服务网格集成&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[App] --&gt; B[Service Mesh]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[自动生成追踪]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; D[收集器]</span></span></code></pre></div><h3 id="_3-主流追踪系统对比" tabindex="-1">3. 主流追踪系统对比 <a class="header-anchor" href="#_3-主流追踪系统对比" aria-label="Permalink to &quot;3. 主流追踪系统对比&quot;">​</a></h3><table tabindex="0"><thead><tr><th>特性</th><th><strong>Jaeger</strong></th><th><strong>Zipkin</strong></th><th><strong>SkyWalking</strong></th><th><strong>OpenTelemetry</strong></th></tr></thead><tbody><tr><td><strong>CNCF状态</strong></td><td>毕业项目</td><td>孵化项目</td><td>毕业项目</td><td>毕业项目</td></tr><tr><td><strong>数据模型</strong></td><td>OpenTracing</td><td>Zipkin原生</td><td>自有模型</td><td><strong>OpenTelemetry标准</strong></td></tr><tr><td><strong>存储后端</strong></td><td>Elasticsearch, Cassandra</td><td>ES, Cassandra, MySQL</td><td>ES, MySQL, TiDB</td><td>厂商无关</td></tr><tr><td><strong>主要优势</strong></td><td>云原生友好，功能丰富</td><td>简单易用，社区成熟</td><td>APM功能全面</td><td>标准统一，厂商中立</td></tr><tr><td><strong>部署复杂度</strong></td><td>中等</td><td>简单</td><td>中等</td><td>灵活</td></tr></tbody></table><hr><h2 id="第四部分-opentelemetry标准" tabindex="-1">第四部分：OpenTelemetry标准 <a class="header-anchor" href="#第四部分-opentelemetry标准" aria-label="Permalink to &quot;第四部分：OpenTelemetry标准&quot;">​</a></h2><h3 id="_1-opentelemetry架构" tabindex="-1">1. OpenTelemetry架构 <a class="header-anchor" href="#_1-opentelemetry架构" aria-label="Permalink to &quot;1. OpenTelemetry架构&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[应用程序] --&gt; B[OTel API]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[OTel SDK]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[导出器]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[收集器]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; F[后端系统]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    subgraph 可观测性信号</span></span>
<span class="line"><span class="__shiki_140thh">        G[Traces] --&gt; C</span></span>
<span class="line"><span class="__shiki_140thh">        H[Metrics] --&gt; C</span></span>
<span class="line"><span class="__shiki_140thh">        I[Logs] --&gt; C</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    subgraph 导出目标</span></span>
<span class="line"><span class="__shiki_140thh">        E --&gt; J[Jaeger]</span></span>
<span class="line"><span class="__shiki_140thh">        E --&gt; K[Prometheus]</span></span>
<span class="line"><span class="__shiki_140thh">        E --&gt; L[其他后端]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span></code></pre></div><h3 id="_2-opentelemetry组件详解" tabindex="-1">2. OpenTelemetry组件详解 <a class="header-anchor" href="#_2-opentelemetry组件详解" aria-label="Permalink to &quot;2. OpenTelemetry组件详解&quot;">​</a></h3><h4 id="_2-1-自动-instrumentation" tabindex="-1">2.1 自动 instrumentation <a class="header-anchor" href="#_2-1-自动-instrumentation" aria-label="Permalink to &quot;2.1 自动 instrumentation&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Java应用自动追踪示例</span></span>
<span class="line"><span class="__shiki_mdbnqw">java -javaagent:opentelemetry-javaagent.jar \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">     -Dotel.service.name=my-service \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">     -Dotel.traces.exporter=jaeger \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">     -jar my-app.jar</span></span></code></pre></div><h4 id="_2-2-手动-instrumentation-示例" tabindex="-1">2.2 手动 instrumentation 示例 <a class="header-anchor" href="#_2-2-手动-instrumentation-示例" aria-label="Permalink to &quot;2.2 手动 instrumentation 示例&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> opentelemetry </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> trace</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> opentelemetry.sdk.trace </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> TracerProvider</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置Tracer</span></span>
<span class="line"><span class="__shiki_140thh">trace.set_tracer_provider(TracerProvider())</span></span>
<span class="line"><span class="__shiki_140thh">tracer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> trace.get_tracer(</span><span class="__shiki_dzsirb">__name__</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建Span</span></span>
<span class="line"><span class="__shiki_1itgoe">with</span><span class="__shiki_140thh"> tracer.start_as_current_span(</span><span class="__shiki_mdbnqw">&quot;database_query&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> span:</span></span>
<span class="line"><span class="__shiki_140thh">    span.set_attribute(</span><span class="__shiki_mdbnqw">&quot;db.system&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;postgresql&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    span.set_attribute(</span><span class="__shiki_mdbnqw">&quot;db.statement&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 执行数据库操作</span></span>
<span class="line"><span class="__shiki_140thh">    result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db.query(</span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    span.set_attribute(</span><span class="__shiki_mdbnqw">&quot;db.rows_returned&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">len</span><span class="__shiki_140thh">(result))</span></span></code></pre></div><hr><h2 id="第五部分-追踪数据分析与应用" tabindex="-1">第五部分：追踪数据分析与应用 <a class="header-anchor" href="#第五部分-追踪数据分析与应用" aria-label="Permalink to &quot;第五部分：追踪数据分析与应用&quot;">​</a></h2><h3 id="_1-关键追踪指标" tabindex="-1">1. 关键追踪指标 <a class="header-anchor" href="#_1-关键追踪指标" aria-label="Permalink to &quot;1. 关键追踪指标&quot;">​</a></h3><table tabindex="0"><thead><tr><th>指标类型</th><th>说明</th><th>应用场景</th></tr></thead><tbody><tr><td><strong>延迟分析</strong></td><td>P50, P90, P95, P99延迟</td><td>性能优化</td></tr><tr><td><strong>错误率</strong></td><td>每个服务的错误比例</td><td>故障定位</td></tr><tr><td><strong>服务依赖</strong></td><td>服务间调用关系图</td><td>架构理解</td></tr><tr><td><strong>吞吐量</strong></td><td>每秒处理的请求数</td><td>容量规划</td></tr></tbody></table><h3 id="_2-服务依赖图" tabindex="-1">2. 服务依赖图 <a class="header-anchor" href="#_2-服务依赖图" aria-label="Permalink to &quot;2. 服务依赖图&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[前端服务] --&gt; B[用户服务]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[订单服务]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; D[数据库]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; E[支付服务]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; F[第三方支付]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    style B fill:#e1f5fe</span></span>
<span class="line"><span class="__shiki_140thh">    style C fill:#f3e5f5</span></span>
<span class="line"><span class="__shiki_140thh">    style E fill:#e8f5e8</span></span></code></pre></div><h3 id="_3-性能瓶颈识别" tabindex="-1">3. 性能瓶颈识别 <a class="header-anchor" href="#_3-性能瓶颈识别" aria-label="Permalink to &quot;3. 性能瓶颈识别&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">gantt</span></span>
<span class="line"><span class="__shiki_140thh">    title 请求时间线分析（单位：ms）</span></span>
<span class="line"><span class="__shiki_140thh">    dateFormat X</span></span>
<span class="line"><span class="__shiki_140thh">    axisFormat %s</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    section 用户服务</span></span>
<span class="line"><span class="__shiki_140thh">    数据库查询 : 0, 15</span></span>
<span class="line"><span class="__shiki_140thh">    业务逻辑 : 15, 10</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    section 订单服务</span></span>
<span class="line"><span class="__shiki_140thh">    库存检查 : 0, 25</span></span>
<span class="line"><span class="__shiki_140thh">    创建订单 : 25, 20</span></span>
<span class="line"><span class="__shiki_140thh">    调用支付 : 45, 150</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    section 支付服务</span></span>
<span class="line"><span class="__shiki_140thh">    支付处理 : 0, 100</span></span>
<span class="line"><span class="__shiki_140thh">    第三方等待 : 100, 50</span></span></code></pre></div><p>从图中可见，支付服务的第三方等待是主要瓶颈。</p><hr><h2 id="第六部分-最佳实践" tabindex="-1">第六部分：最佳实践 <a class="header-anchor" href="#第六部分-最佳实践" aria-label="Permalink to &quot;第六部分：最佳实践&quot;">​</a></h2><h3 id="_1-采样策略" tabindex="-1">1. 采样策略 <a class="header-anchor" href="#_1-采样策略" aria-label="Permalink to &quot;1. 采样策略&quot;">​</a></h3><h4 id="_1-1-采样类型" tabindex="-1">1.1 采样类型 <a class="header-anchor" href="#_1-1-采样类型" aria-label="Permalink to &quot;1.1 采样类型&quot;">​</a></h4><ul><li><strong>头部采样</strong>：在请求开始时决定是否采样</li><li><strong>尾部采样</strong>：在请求完成后基于结果决定是否采样</li></ul><h4 id="_1-2-推荐采样配置" tabindex="-1">1.2 推荐采样配置 <a class="header-anchor" href="#_1-2-推荐采样配置" aria-label="Permalink to &quot;1.2 推荐采样配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">sampling</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 生产环境推荐配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  probabilistic</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    sampling_percentage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10%</span><span class="__shiki_21nrsd">  # 10%的请求被采样</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 对于重要操作可以提高采样率</span></span>
<span class="line"><span class="__shiki_17hn0y">  rate_limiting</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spans_per_second</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 基于规则的采样</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">high-priority-routes</span></span>
<span class="line"><span class="__shiki_17hn0y">      attributes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http.route</span></span>
<span class="line"><span class="__shiki_17hn0y">          value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/api/payments&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      sampling_percentage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">100%</span></span></code></pre></div><h3 id="_2-span命名规范" tabindex="-1">2. Span命名规范 <a class="header-anchor" href="#_2-span命名规范" aria-label="Permalink to &quot;2. Span命名规范&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 好的命名</span></span>
<span class="line"><span class="__shiki_140thh">span.set_name(</span><span class="__shiki_mdbnqw">&quot;http.get:/api/users/</span><span class="__shiki_dzsirb">{id}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">span.set_name(</span><span class="__shiki_mdbnqw">&quot;db.users.select_by_id&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">span.set_name(</span><span class="__shiki_mdbnqw">&quot;cache.redis.get_user_profile&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 避免的命名</span></span>
<span class="line"><span class="__shiki_140thh">span.set_name(</span><span class="__shiki_mdbnqw">&quot;do_something&quot;</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 太模糊</span></span>
<span class="line"><span class="__shiki_140thh">span.set_name(</span><span class="__shiki_mdbnqw">&quot;method123&quot;</span><span class="__shiki_140thh">)     </span><span class="__shiki_21nrsd"># 无意义</span></span></code></pre></div><h3 id="_3-属性与标签最佳实践" tabindex="-1">3. 属性与标签最佳实践 <a class="header-anchor" href="#_3-属性与标签最佳实践" aria-label="Permalink to &quot;3. 属性与标签最佳实践&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 标准属性（遵循OpenTelemetry语义约定）</span></span>
<span class="line"><span class="__shiki_140thh">span.set_attribute(</span><span class="__shiki_mdbnqw">&quot;http.method&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;GET&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">span.set_attribute(</span><span class="__shiki_mdbnqw">&quot;http.status_code&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">span.set_attribute(</span><span class="__shiki_mdbnqw">&quot;db.system&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;postgresql&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">span.set_attribute(</span><span class="__shiki_mdbnqw">&quot;db.statement&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 业务属性</span></span>
<span class="line"><span class="__shiki_140thh">span.set_attribute(</span><span class="__shiki_mdbnqw">&quot;user.id&quot;</span><span class="__shiki_140thh">, user_id)</span></span>
<span class="line"><span class="__shiki_140thh">span.set_attribute(</span><span class="__shiki_mdbnqw">&quot;order.amount&quot;</span><span class="__shiki_140thh">, order_amount)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 避免敏感信息</span></span>
<span class="line"><span class="__shiki_21nrsd"># span.set_attribute(&quot;user.password&quot;, password)  # 错误！</span></span></code></pre></div><h3 id="_4-错误处理与事件记录" tabindex="-1">4. 错误处理与事件记录 <a class="header-anchor" href="#_4-错误处理与事件记录" aria-label="Permalink to &quot;4. 错误处理与事件记录&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    with</span><span class="__shiki_140thh"> tracer.start_as_current_span(</span><span class="__shiki_mdbnqw">&quot;process_order&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> span:</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 业务逻辑</span></span>
<span class="line"><span class="__shiki_140thh">        process_order(order)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 记录重要事件</span></span>
<span class="line"><span class="__shiki_140thh">        span.add_event(</span><span class="__shiki_mdbnqw">&quot;order.processed&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">attributes</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;order.id&quot;</span><span class="__shiki_140thh">: order.id,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;payment.amount&quot;</span><span class="__shiki_140thh">: order.amount</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">except</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> e:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 记录异常信息</span></span>
<span class="line"><span class="__shiki_140thh">    span.record_exception(e)</span></span>
<span class="line"><span class="__shiki_140thh">    span.set_status(Status(StatusCode.</span><span class="__shiki_dzsirb">ERROR</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">(e)))</span></span></code></pre></div><hr><h2 id="第七部分-现代架构中的追踪" tabindex="-1">第七部分：现代架构中的追踪 <a class="header-anchor" href="#第七部分-现代架构中的追踪" aria-label="Permalink to &quot;第七部分：现代架构中的追踪&quot;">​</a></h2><h3 id="_1-服务网格集成" tabindex="-1">1. 服务网格集成 <a class="header-anchor" href="#_1-服务网格集成" aria-label="Permalink to &quot;1. 服务网格集成&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[前端] --&gt; B[Istio Ingress]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[服务网格]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    subgraph 服务网格</span></span>
<span class="line"><span class="__shiki_140thh">        C --&gt; D[User Service]</span></span>
<span class="line"><span class="__shiki_140thh">        C --&gt; E[Order Service]</span></span>
<span class="line"><span class="__shiki_140thh">        D --&gt; F[Database]</span></span>
<span class="line"><span class="__shiki_140thh">        E --&gt; F</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    G[Istio Sidecar] --&gt; H[自动追踪]</span></span>
<span class="line"><span class="__shiki_140thh">    H --&gt; I[Jaeger Collector]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D -.-&gt; G</span></span>
<span class="line"><span class="__shiki_140thh">    E -.-&gt; G</span></span></code></pre></div><h3 id="_2-全栈可观测性" tabindex="-1">2. 全栈可观测性 <a class="header-anchor" href="#_2-全栈可观测性" aria-label="Permalink to &quot;2. 全栈可观测性&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[前端RUM] --&gt; B[后端追踪]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[基础设施指标]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[关联分析]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    E[用户会话] --&gt; A</span></span>
<span class="line"><span class="__shiki_140thh">    F[业务日志] --&gt; B</span></span>
<span class="line"><span class="__shiki_140thh">    G[系统指标] --&gt; C</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    H[统一仪表板] --&gt; D</span></span></code></pre></div><h3 id="_3-aiops与智能分析" tabindex="-1">3. AIOps与智能分析 <a class="header-anchor" href="#_3-aiops与智能分析" aria-label="Permalink to &quot;3. AIOps与智能分析&quot;">​</a></h3><ul><li><strong>异常检测</strong>：自动发现异常延迟模式</li><li><strong>根因分析</strong>：智能定位问题根源</li><li><strong>预测性维护</strong>：基于历史数据预测性能问题</li></ul><hr><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>分布式追踪是可观测性的关键支柱，它提供了：</p><ol><li><strong>端到端可见性</strong>：理解复杂分布式系统中的请求流</li><li><strong>性能分析</strong>：识别瓶颈和优化机会</li><li><strong>故障诊断</strong>：快速定位问题根源</li><li><strong>依赖分析</strong>：理解服务间关系和影响范围</li></ol><p><strong>现代最佳实践组合：</strong></p><ul><li>使用 <strong>OpenTelemetry</strong> 作为标准</li><li>结合 <strong>服务网格</strong> 实现零代码追踪</li><li>实施 <strong>智能采样</strong> 平衡成本与价值</li><li>建立 <strong>全栈关联</strong> 实现真正的可观测性</li></ul><p>通过有效实施分布式追踪，团队可以显著提升系统可靠性、加快故障排查速度，并为持续的性能优化提供数据支撑。</p>`,81)])])}const k=a(t,[["render",h]]);export{d as __pageData,k as default};
