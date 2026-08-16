import{_ as a,o as n,c as i,a as l}from"./app.DkoUFz-u.js";const k=JSON.parse('{"title":"可观测性、性能分析与内存分析学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/observability/profiling/memory.md","filePath":"backend/observability/profiling/memory.md"}'),p={name:"backend/observability/profiling/memory.md"};function _(h,s,t,e,c,o){return n(),i("div",null,[...s[0]||(s[0]=[l(`<h1 id="可观测性、性能分析与内存分析学习笔记" tabindex="-1">可观测性、性能分析与内存分析学习笔记 <a class="header-anchor" href="#可观测性、性能分析与内存分析学习笔记" aria-label="Permalink to &quot;可观测性、性能分析与内存分析学习笔记&quot;">​</a></h1><h2 id="_1-可观测性基础" tabindex="-1">1. 可观测性基础 <a class="header-anchor" href="#_1-可观测性基础" aria-label="Permalink to &quot;1. 可观测性基础&quot;">​</a></h2><h3 id="_1-1-可观测性概念" tabindex="-1">1.1 可观测性概念 <a class="header-anchor" href="#_1-1-可观测性概念" aria-label="Permalink to &quot;1.1 可观测性概念&quot;">​</a></h3><p><strong>可观测性</strong>是指通过系统外部输出理解系统内部状态的能力，基于三大支柱：</p><ul><li><strong>指标 (Metrics)</strong></li><li><strong>日志 (Logs)</strong></li><li><strong>追踪 (Traces)</strong></li></ul><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[可观测性] --&gt; B[指标 Metrics]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[日志 Logs]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[追踪 Traces]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[时序数据]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B2[聚合分析]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[结构化日志]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C2[日志级别]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[分布式追踪]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D2[调用链分析]</span></span></code></pre></div><h3 id="_1-2-三大支柱详解" tabindex="-1">1.2 三大支柱详解 <a class="header-anchor" href="#_1-2-三大支柱详解" aria-label="Permalink to &quot;1.2 三大支柱详解&quot;">​</a></h3><h4 id="_1-2-1-指标-metrics" tabindex="-1">1.2.1 指标 (Metrics) <a class="header-anchor" href="#_1-2-1-指标-metrics" aria-label="Permalink to &quot;1.2.1 指标 (Metrics)&quot;">​</a></h4><ul><li><strong>计数器 (Counter)</strong>: 单调递增的数值</li><li><strong>计量器 (Gauge)</strong>: 可上下波动的数值</li><li><strong>直方图 (Histogram)</strong>: 样本观测，计算可配置桶中的统计</li><li><strong>摘要 (Summary)</strong>: 类似直方图，但计算分位数</li></ul><h4 id="_1-2-2-日志-logs" tabindex="-1">1.2.2 日志 (Logs) <a class="header-anchor" href="#_1-2-2-日志-logs" aria-label="Permalink to &quot;1.2.2 日志 (Logs)&quot;">​</a></h4><ul><li>结构化日志 vs 非结构化日志</li><li>日志级别: DEBUG, INFO, WARN, ERROR, FATAL</li><li>日志聚合与分析工具</li></ul><h4 id="_1-2-3-追踪-traces" tabindex="-1">1.2.3 追踪 (Traces) <a class="header-anchor" href="#_1-2-3-追踪-traces" aria-label="Permalink to &quot;1.2.3 追踪 (Traces)&quot;">​</a></h4><ul><li>分布式请求跟踪</li><li>Span: 操作的基本单位</li><li>Trace: 相关的Span集合</li></ul><h2 id="_2-性能分析" tabindex="-1">2. 性能分析 <a class="header-anchor" href="#_2-性能分析" aria-label="Permalink to &quot;2. 性能分析&quot;">​</a></h2><h3 id="_2-1-性能分析类型" tabindex="-1">2.1 性能分析类型 <a class="header-anchor" href="#_2-1-性能分析类型" aria-label="Permalink to &quot;2.1 性能分析类型&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[性能分析] --&gt; B[CPU分析]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[内存分析]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[I/O分析]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; E[网络分析]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[采样分析]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B2[插桩分析]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[堆分析]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C2[分配分析]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[磁盘I/O]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D2[文件I/O]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E1[网络延迟]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E2[吞吐量分析]</span></span></code></pre></div><h3 id="_2-2-cpu性能分析" tabindex="-1">2.2 CPU性能分析 <a class="header-anchor" href="#_2-2-cpu性能分析" aria-label="Permalink to &quot;2.2 CPU性能分析&quot;">​</a></h3><h4 id="_2-2-1-分析方法" tabindex="-1">2.2.1 分析方法 <a class="header-anchor" href="#_2-2-1-分析方法" aria-label="Permalink to &quot;2.2.1 分析方法&quot;">​</a></h4><ul><li><strong>采样分析</strong>: 周期性采集调用栈</li><li><strong>插桩分析</strong>: 在特定点插入测量代码</li><li><strong>事件基础分析</strong>: 基于特定事件进行分析</li></ul><h4 id="_2-2-2-关键指标" tabindex="-1">2.2.2 关键指标 <a class="header-anchor" href="#_2-2-2-关键指标" aria-label="Permalink to &quot;2.2.2 关键指标&quot;">​</a></h4><ul><li>CPU使用率</li><li>上下文切换次数</li><li>系统调用次数</li><li>函数调用频率</li></ul><h4 id="_2-2-3-常用工具" tabindex="-1">2.2.3 常用工具 <a class="header-anchor" href="#_2-2-3-常用工具" aria-label="Permalink to &quot;2.2.3 常用工具&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Linux系统工具</span></span>
<span class="line"><span class="__shiki_1t8gfj">top,</span><span class="__shiki_mdbnqw"> htop,</span><span class="__shiki_mdbnqw"> pidstat,</span><span class="__shiki_mdbnqw"> perf,</span><span class="__shiki_mdbnqw"> strace</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 编程语言特定工具</span></span>
<span class="line"><span class="__shiki_21nrsd"># Java: JProfiler, YourKit, VisualVM</span></span>
<span class="line"><span class="__shiki_21nrsd"># Go: pprof, trace</span></span>
<span class="line"><span class="__shiki_21nrsd"># Python: cProfile, py-spy</span></span>
<span class="line"><span class="__shiki_21nrsd"># Node.js: clinic, 0x</span></span></code></pre></div><h3 id="_2-3-i-o性能分析" tabindex="-1">2.3 I/O性能分析 <a class="header-anchor" href="#_2-3-i-o性能分析" aria-label="Permalink to &quot;2.3 I/O性能分析&quot;">​</a></h3><h4 id="_2-3-1-磁盘i-o指标" tabindex="-1">2.3.1 磁盘I/O指标 <a class="header-anchor" href="#_2-3-1-磁盘i-o指标" aria-label="Permalink to &quot;2.3.1 磁盘I/O指标&quot;">​</a></h4><ul><li>IOPS (每秒I/O操作数)</li><li>吞吐量 (MB/s)</li><li>延迟 (响应时间)</li><li>队列深度</li></ul><h4 id="_2-3-2-分析工具" tabindex="-1">2.3.2 分析工具 <a class="header-anchor" href="#_2-3-2-分析工具" aria-label="Permalink to &quot;2.3.2 分析工具&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Linux工具</span></span>
<span class="line"><span class="__shiki_1t8gfj">iostat,</span><span class="__shiki_mdbnqw"> iotop,</span><span class="__shiki_mdbnqw"> blktrace,</span><span class="__shiki_mdbnqw"> fio</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 监控命令示例</span></span>
<span class="line"><span class="__shiki_1t8gfj">iostat</span><span class="__shiki_dzsirb"> -x</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1t8gfj">iotop</span><span class="__shiki_dzsirb"> -o</span></span></code></pre></div><h2 id="_3-内存分析" tabindex="-1">3. 内存分析 <a class="header-anchor" href="#_3-内存分析" aria-label="Permalink to &quot;3. 内存分析&quot;">​</a></h2><h3 id="_3-1-内存管理基础" tabindex="-1">3.1 内存管理基础 <a class="header-anchor" href="#_3-1-内存管理基础" aria-label="Permalink to &quot;3.1 内存管理基础&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[内存分析] --&gt; B[堆内存]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[栈内存]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[原生内存]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[对象分配]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B2[垃圾回收]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B3[内存泄漏]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[栈帧]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C2[栈溢出]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[JNI内存]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D2[直接内存]</span></span></code></pre></div><h3 id="_3-2-内存分析技术" tabindex="-1">3.2 内存分析技术 <a class="header-anchor" href="#_3-2-内存分析技术" aria-label="Permalink to &quot;3.2 内存分析技术&quot;">​</a></h3><h4 id="_3-2-1-堆转储分析" tabindex="-1">3.2.1 堆转储分析 <a class="header-anchor" href="#_3-2-1-堆转储分析" aria-label="Permalink to &quot;3.2.1 堆转储分析&quot;">​</a></h4><ul><li><strong>Heap Dump</strong>: 内存快照分析</li><li><strong>关键信息</strong>: <ul><li>对象数量</li><li>对象大小</li><li>引用关系</li><li>GC根路径</li></ul></li></ul><h4 id="_3-2-2-实时内存分析" tabindex="-1">3.2.2 实时内存分析 <a class="header-anchor" href="#_3-2-2-实时内存分析" aria-label="Permalink to &quot;3.2.2 实时内存分析&quot;">​</a></h4><ul><li>内存分配跟踪</li><li>垃圾回收分析</li><li>内存使用趋势</li></ul><h3 id="_3-3-内存泄漏检测" tabindex="-1">3.3 内存泄漏检测 <a class="header-anchor" href="#_3-3-内存泄漏检测" aria-label="Permalink to &quot;3.3 内存泄漏检测&quot;">​</a></h3><h4 id="_3-3-1-常见泄漏模式" tabindex="-1">3.3.1 常见泄漏模式 <a class="header-anchor" href="#_3-3-1-常见泄漏模式" aria-label="Permalink to &quot;3.3.1 常见泄漏模式&quot;">​</a></h4><ol><li><strong>静态集合类持有引用</strong></li><li><strong>未关闭的资源</strong></li><li><strong>监听器未注销</strong></li><li><strong>内部类持有外部类引用</strong></li><li><strong>缓存无限增长</strong></li></ol><h4 id="_3-3-2-检测方法" tabindex="-1">3.3.2 检测方法 <a class="header-anchor" href="#_3-3-2-检测方法" aria-label="Permalink to &quot;3.3.2 检测方法&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Java示例：弱引用检测内存泄漏</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> MemoryLeakDetector</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> Map&lt;</span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">, WeakReference&lt;</span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">&gt;&gt; LEAK_MAP </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        new</span><span class="__shiki_140thh"> WeakHashMap&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> trackObject</span><span class="__shiki_140thh">(Object </span><span class="__shiki_1jdh33">obj</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">description</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        LEAK_MAP.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(obj, </span><span class="__shiki_1itgoe">new</span><span class="__shiki_140thh"> WeakReference&lt;&gt;(obj));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-4-垃圾回收分析" tabindex="-1">3.4 垃圾回收分析 <a class="header-anchor" href="#_3-4-垃圾回收分析" aria-label="Permalink to &quot;3.4 垃圾回收分析&quot;">​</a></h3><h4 id="_3-4-1-gc指标" tabindex="-1">3.4.1 GC指标 <a class="header-anchor" href="#_3-4-1-gc指标" aria-label="Permalink to &quot;3.4.1 GC指标&quot;">​</a></h4><ul><li>GC频率</li><li>GC暂停时间</li><li>堆使用模式</li><li>对象晋升率</li></ul><h4 id="_3-4-2-gc调优策略" tabindex="-1">3.4.2 GC调优策略 <a class="header-anchor" href="#_3-4-2-gc调优策略" aria-label="Permalink to &quot;3.4.2 GC调优策略&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># JVM GC参数示例</span></span>
<span class="line"><span class="__shiki_1t8gfj">java</span><span class="__shiki_dzsirb"> -Xmx2g</span><span class="__shiki_dzsirb"> -Xms2g</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">     -XX:+UseG1GC</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">     -XX:MaxGCPauseMillis=200</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">     -XX:InitiatingHeapOccupancyPercent=45</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">     -jar</span><span class="__shiki_mdbnqw"> application.jar</span></span></code></pre></div><h2 id="_4-工具与实践" tabindex="-1">4. 工具与实践 <a class="header-anchor" href="#_4-工具与实践" aria-label="Permalink to &quot;4. 工具与实践&quot;">​</a></h2><h3 id="_4-1-全链路监控架构" tabindex="-1">4.1 全链路监控架构 <a class="header-anchor" href="#_4-1-全链路监控架构" aria-label="Permalink to &quot;4.1 全链路监控架构&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[应用层] --&gt; B[数据收集]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[存储层]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[分析层]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[可视化层]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; A1[应用埋点]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; A2[自动注入]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[Agent]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B2[Exporter]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[时序数据库]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C2[日志存储]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C3[追踪存储]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[聚合分析]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D2[异常检测]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D3[根因分析]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E1[Dashboard]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E2[报警]</span></span></code></pre></div><h3 id="_4-2-常用工具栈" tabindex="-1">4.2 常用工具栈 <a class="header-anchor" href="#_4-2-常用工具栈" aria-label="Permalink to &quot;4.2 常用工具栈&quot;">​</a></h3><h4 id="_4-2-1-监控栈" tabindex="-1">4.2.1 监控栈 <a class="header-anchor" href="#_4-2-1-监控栈" aria-label="Permalink to &quot;4.2.1 监控栈&quot;">​</a></h4><ul><li><strong>Prometheus + Grafana</strong>: 指标监控</li><li><strong>ELK/EFK</strong>: 日志分析</li><li><strong>Jaeger/Zipkin</strong>: 分布式追踪</li><li><strong>OpenTelemetry</strong>: 可观测性标准</li></ul><h4 id="_4-2-2-性能分析工具" tabindex="-1">4.2.2 性能分析工具 <a class="header-anchor" href="#_4-2-2-性能分析工具" aria-label="Permalink to &quot;4.2.2 性能分析工具&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 系统级</span></span>
<span class="line"><span class="__shiki_1t8gfj">perf,</span><span class="__shiki_mdbnqw"> strace,</span><span class="__shiki_mdbnqw"> ltrace,</span><span class="__shiki_mdbnqw"> systemtap</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 应用级</span></span>
<span class="line"><span class="__shiki_21nrsd"># Java: Arthas, async-profiler</span></span>
<span class="line"><span class="__shiki_21nrsd"># Go: pprof, delve</span></span>
<span class="line"><span class="__shiki_21nrsd"># Python: pyinstrument, memory_profiler</span></span>
<span class="line"><span class="__shiki_21nrsd"># Node.js: v8-profiler, heapdump</span></span></code></pre></div><h3 id="_4-3-最佳实践" tabindex="-1">4.3 最佳实践 <a class="header-anchor" href="#_4-3-最佳实践" aria-label="Permalink to &quot;4.3 最佳实践&quot;">​</a></h3><h4 id="_4-3-1-监控策略" tabindex="-1">4.3.1 监控策略 <a class="header-anchor" href="#_4-3-1-监控策略" aria-label="Permalink to &quot;4.3.1 监控策略&quot;">​</a></h4><ol><li><strong>定义SLO/SLI</strong></li><li><strong>建立基线性能</strong></li><li><strong>设置智能告警</strong></li><li><strong>定期性能测试</strong></li></ol><h4 id="_4-3-2-内存优化" tabindex="-1">4.3.2 内存优化 <a class="header-anchor" href="#_4-3-2-内存优化" aria-label="Permalink to &quot;4.3.2 内存优化&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 示例：对象池减少内存分配</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> ObjectPool</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> Queue&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; pool;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> Supplier&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; creator;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> ObjectPool</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> size</span><span class="__shiki_140thh">, Supplier&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">creator</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.pool </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> LinkedList&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.creator </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> creator;</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> size; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            pool.</span><span class="__shiki_1t8gfj">offer</span><span class="__shiki_140thh">(creator.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> T </span><span class="__shiki_1t8gfj">borrow</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> pool.</span><span class="__shiki_1t8gfj">isEmpty</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> creator.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> pool.</span><span class="__shiki_1t8gfj">poll</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> returnObject</span><span class="__shiki_140thh">(T </span><span class="__shiki_1jdh33">obj</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        pool.</span><span class="__shiki_1t8gfj">offer</span><span class="__shiki_140thh">(obj);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_5-实战案例" tabindex="-1">5. 实战案例 <a class="header-anchor" href="#_5-实战案例" aria-label="Permalink to &quot;5. 实战案例&quot;">​</a></h2><h3 id="_5-1-性能问题排查流程" tabindex="-1">5.1 性能问题排查流程 <a class="header-anchor" href="#_5-1-性能问题排查流程" aria-label="Permalink to &quot;5.1 性能问题排查流程&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">flowchart TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[性能问题报告] --&gt; B[现象分析]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[指标收集]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[根因定位]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[解决方案]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; F[验证测试]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; G[文档记录]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[响应时间慢]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B2[CPU使用率高]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B3[内存使用率高]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[系统指标]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C2[应用指标]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C3[业务指标]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[代码分析]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D2[配置检查]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D3[依赖分析]</span></span></code></pre></div><h3 id="_5-2-内存泄漏排查示例" tabindex="-1">5.2 内存泄漏排查示例 <a class="header-anchor" href="#_5-2-内存泄漏排查示例" aria-label="Permalink to &quot;5.2 内存泄漏排查示例&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 监控内存使用趋势</span></span>
<span class="line"><span class="__shiki_1t8gfj">jstat</span><span class="__shiki_dzsirb"> -gc</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pi</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw"> 1s</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 生成堆转储</span></span>
<span class="line"><span class="__shiki_1t8gfj">jmap</span><span class="__shiki_dzsirb"> -dump:live,format=b,file=heap.hprof</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pi</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 分析堆转储</span></span>
<span class="line"><span class="__shiki_1t8gfj">jhat</span><span class="__shiki_mdbnqw"> heap.hprof</span></span>
<span class="line"><span class="__shiki_21nrsd"># 或使用MAT, VisualVM等工具</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 跟踪对象分配</span></span>
<span class="line"><span class="__shiki_1t8gfj">jcmd</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pi</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw"> JFR.start</span><span class="__shiki_mdbnqw"> duration=60s</span><span class="__shiki_mdbnqw"> filename=allocation.jfr</span></span></code></pre></div><h2 id="_6-进阶主题" tabindex="-1">6. 进阶主题 <a class="header-anchor" href="#_6-进阶主题" aria-label="Permalink to &quot;6. 进阶主题&quot;">​</a></h2><h3 id="_6-1-云原生可观测性" tabindex="-1">6.1 云原生可观测性 <a class="header-anchor" href="#_6-1-云原生可观测性" aria-label="Permalink to &quot;6.1 云原生可观测性&quot;">​</a></h3><ul><li>容器环境监控</li><li>服务网格可观测性</li><li>无服务器架构监控</li></ul><h3 id="_6-2-aiops" tabindex="-1">6.2 AIOps <a class="header-anchor" href="#_6-2-aiops" aria-label="Permalink to &quot;6.2 AIOps&quot;">​</a></h3><ul><li>异常检测算法</li><li>根因分析自动化</li><li>智能告警</li></ul><h3 id="_6-3-持续性能优化" tabindex="-1">6.3 持续性能优化 <a class="header-anchor" href="#_6-3-持续性能优化" aria-label="Permalink to &quot;6.3 持续性能优化&quot;">​</a></h3><ul><li>性能回归测试</li><li>容量规划</li><li>资源利用率优化</li></ul><hr><p><strong>总结</strong>: 可观测性、性能分析和内存分析是现代软件系统维护的重要支柱。通过系统化的监控、分析和优化，可以确保应用程序的稳定性、性能和资源效率。掌握这些技能需要理论知识与实践经验的结合，并随着技术发展持续学习。</p>`,73)])])}const d=a(p,[["render",_]]);export{k as __pageData,d as default};
