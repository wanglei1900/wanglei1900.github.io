import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"负载测试学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/scaling/strategies/load-testing.md","filePath":"backend/scaling/strategies/load-testing.md"}'),p={name:"backend/scaling/strategies/load-testing.md"};function h(l,s,c,t,e,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="负载测试学习笔记" tabindex="-1">负载测试学习笔记 <a class="header-anchor" href="#负载测试学习笔记" aria-label="Permalink to &quot;负载测试学习笔记&quot;">​</a></h1><h2 id="_1-负载测试概述" tabindex="-1">1. 负载测试概述 <a class="header-anchor" href="#_1-负载测试概述" aria-label="Permalink to &quot;1. 负载测试概述&quot;">​</a></h2><h3 id="_1-1-基本概念" tabindex="-1">1.1 基本概念 <a class="header-anchor" href="#_1-1-基本概念" aria-label="Permalink to &quot;1.1 基本概念&quot;">​</a></h3><p><strong>负载测试</strong>（Load Testing）是通过模拟真实用户访问场景，测试系统在正常和峰值负载条件下的性能表现。</p><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[负载测试类型] --&gt; B[基准测试]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[负载测试]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[压力测试]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; E[峰值测试]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; F[耐久测试]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; G[尖峰测试]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[系统基线性能]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[正常到峰值负载]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[超负荷测试]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E1[突发流量测试]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; F1[长时间稳定性]</span></span>
<span class="line"><span class="__shiki_140thh">    G --&gt; G1[突然流量冲击]</span></span></code></pre></div><h3 id="_1-2-测试目标" tabindex="-1">1.2 测试目标 <a class="header-anchor" href="#_1-2-测试目标" aria-label="Permalink to &quot;1.2 测试目标&quot;">​</a></h3><ul><li><strong>性能基准</strong>：建立系统性能基线</li><li><strong>容量规划</strong>：确定系统最大处理能力</li><li><strong>瓶颈识别</strong>：发现性能瓶颈点</li><li><strong>稳定性验证</strong>：验证系统在负载下的稳定性</li><li><strong>扩展性评估</strong>：评估系统扩展策略效果</li></ul><h2 id="_2-负载测试方法论" tabindex="-1">2. 负载测试方法论 <a class="header-anchor" href="#_2-负载测试方法论" aria-label="Permalink to &quot;2. 负载测试方法论&quot;">​</a></h2><h3 id="_2-1-测试策略框架" tabindex="-1">2.1 测试策略框架 <a class="header-anchor" href="#_2-1-测试策略框架" aria-label="Permalink to &quot;2.1 测试策略框架&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[负载测试策略] --&gt; B[测试规划]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[场景设计]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[执行监控]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; E[分析优化]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[需求分析]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B2[目标设定]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B3[环境准备]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[用户行为建模]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C2[流量模式设计]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C3[测试数据准备]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[负载生成]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D2[性能监控]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D3[问题诊断]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E1[结果分析]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E2[瓶颈定位]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E3[优化验证]</span></span></code></pre></div><h3 id="_2-2-性能指标体系" tabindex="-1">2.2 性能指标体系 <a class="header-anchor" href="#_2-2-性能指标体系" aria-label="Permalink to &quot;2.2 性能指标体系&quot;">​</a></h3><h4 id="关键性能指标-kpi" tabindex="-1">关键性能指标（KPI） <a class="header-anchor" href="#关键性能指标-kpi" aria-label="Permalink to &quot;关键性能指标（KPI）&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> PerformanceMetrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.response_time_metrics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;avg_response_time&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;p50_response_time&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;p90_response_time&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;p95_response_time&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;p99_response_time&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;max_response_time&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.throughput_metrics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;requests_per_second&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;transactions_per_second&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;bytes_per_second&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;concurrent_users&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.error_metrics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;error_rate&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;timeout_rate&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;http_5xx_errors&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;http_4xx_errors&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.resource_metrics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;cpu_utilization&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;memory_utilization&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;disk_io&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;network_io&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;database_connections&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span></code></pre></div><h2 id="_3-负载测试工具与技术" tabindex="-1">3. 负载测试工具与技术 <a class="header-anchor" href="#_3-负载测试工具与技术" aria-label="Permalink to &quot;3. 负载测试工具与技术&quot;">​</a></h2><h3 id="_3-1-主流测试工具对比" tabindex="-1">3.1 主流测试工具对比 <a class="header-anchor" href="#_3-1-主流测试工具对比" aria-label="Permalink to &quot;3.1 主流测试工具对比&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[负载测试工具] --&gt; B[开源工具]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[商业工具]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[云服务平台]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[JMeter]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B2[Gatling]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B3[k6]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B4[Locust]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[LoadRunner]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C2[NeoLoad]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C3[WebLOAD]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[AWS Load Testing]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D2[Azure Load Testing]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D3[GCP Cloud Load Testing]</span></span></code></pre></div><h3 id="_3-2-jmeter-测试架构" tabindex="-1">3.2 JMeter 测试架构 <a class="header-anchor" href="#_3-2-jmeter-测试架构" aria-label="Permalink to &quot;3.2 JMeter 测试架构&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> JMeterTestPlan</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> TestPlan testPlan;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> ThreadGroup threadGroup;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">HTTPSampler</span><span class="__shiki_140thh">&gt; httpSamplers;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> JMeterTestPlan </span><span class="__shiki_1t8gfj">createLoadTest</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 创建测试计划</span></span>
<span class="line"><span class="__shiki_140thh">        testPlan </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> TestPlan</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;API负载测试&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 配置线程组 - 模拟并发用户</span></span>
<span class="line"><span class="__shiki_140thh">        threadGroup </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ThreadGroup</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        threadGroup.</span><span class="__shiki_1t8gfj">setNumThreads</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 并发用户数</span></span>
<span class="line"><span class="__shiki_140thh">        threadGroup.</span><span class="__shiki_1t8gfj">setRampUp</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">);      </span><span class="__shiki_21nrsd">// 在60秒内启动所有用户</span></span>
<span class="line"><span class="__shiki_140thh">        threadGroup.</span><span class="__shiki_1t8gfj">setDuration</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">300</span><span class="__shiki_140thh">);   </span><span class="__shiki_21nrsd">// 测试持续时间300秒</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 配置HTTP请求默认值</span></span>
<span class="line"><span class="__shiki_140thh">        ConfigElement httpDefaults </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> HTTPDefaults</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        httpDefaults.</span><span class="__shiki_1t8gfj">setProtocol</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;https&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        httpDefaults.</span><span class="__shiki_1t8gfj">setDomain</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;api.example.com&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        httpDefaults.</span><span class="__shiki_1t8gfj">setPort</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">443</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 添加监听器收集结果</span></span>
<span class="line"><span class="__shiki_140thh">        ResultsCollector resultsCollector </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ResultsCollector</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        resultsCollector.</span><span class="__shiki_1t8gfj">setFilename</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;results.jtl&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 添加聚合报告</span></span>
<span class="line"><span class="__shiki_140thh">        AggregateReport aggregateReport </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> AggregateReport</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> addUserScenario</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">scenarioName</span><span class="__shiki_140thh">, List&lt;</span><span class="__shiki_1itgoe">HttpRequest</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">requests</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 添加用户场景</span></span>
<span class="line"><span class="__shiki_140thh">        TransactionController transaction </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> TransactionController</span><span class="__shiki_140thh">(scenarioName);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (HttpRequest request </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> requests) {</span></span>
<span class="line"><span class="__shiki_140thh">            HTTPSampler httpSampler </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> HTTPSampler</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            httpSampler.</span><span class="__shiki_1t8gfj">setMethod</span><span class="__shiki_140thh">(request.</span><span class="__shiki_1t8gfj">getMethod</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">            httpSampler.</span><span class="__shiki_1t8gfj">setPath</span><span class="__shiki_140thh">(request.</span><span class="__shiki_1t8gfj">getPath</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">            httpSampler.</span><span class="__shiki_1t8gfj">setBody</span><span class="__shiki_140thh">(request.</span><span class="__shiki_1t8gfj">getBody</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 添加断言</span></span>
<span class="line"><span class="__shiki_140thh">            ResponseAssertion assertion </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ResponseAssertion</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            assertion.</span><span class="__shiki_1t8gfj">setTestFieldResponseCode</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            assertion.</span><span class="__shiki_1t8gfj">setToEqualType</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            assertion.</span><span class="__shiki_1t8gfj">addTestString</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;200&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            httpSampler.</span><span class="__shiki_1t8gfj">addAssertion</span><span class="__shiki_140thh">(assertion);</span></span>
<span class="line"><span class="__shiki_140thh">            transaction.</span><span class="__shiki_1t8gfj">addSampler</span><span class="__shiki_140thh">(httpSampler);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        threadGroup.</span><span class="__shiki_1t8gfj">addController</span><span class="__shiki_140thh">(transaction);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-3-gatling-高性能测试" tabindex="-1">3.3 Gatling 高性能测试 <a class="header-anchor" href="#_3-3-gatling-高性能测试" aria-label="Permalink to &quot;3.3 Gatling 高性能测试&quot;">​</a></h3><div class="language-scala vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">scala</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_1t8gfj"> io</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">gatling</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">core</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Predef</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">_</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_1t8gfj"> io</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">gatling</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Predef</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">_</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_1t8gfj"> scala</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">concurrent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">duration</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">_</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ApiLoadTest</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> Simulation</span><span class="__shiki_140thh"> {</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">  val</span><span class="__shiki_1jdh33"> httpProtocol</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> http</span></span>
<span class="line"><span class="__shiki_140thh">    .baseUrl(</span><span class="__shiki_mdbnqw">&quot;https://api.example.com&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    .acceptHeader(</span><span class="__shiki_mdbnqw">&quot;application/json&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    .userAgentHeader(</span><span class="__shiki_mdbnqw">&quot;Gatling Load Test&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    .disableCaching</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 定义用户行为</span></span>
<span class="line"><span class="__shiki_1itgoe">  val</span><span class="__shiki_1jdh33"> scn</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> scenario(</span><span class="__shiki_mdbnqw">&quot;API负载测试场景&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    .exec(</span></span>
<span class="line"><span class="__shiki_140thh">      http(</span><span class="__shiki_mdbnqw">&quot;获取用户列表&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        .get(</span><span class="__shiki_mdbnqw">&quot;/users&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        .check(status.is(</span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">        .check(jsonPath(</span><span class="__shiki_mdbnqw">&quot;$.users&quot;</span><span class="__shiki_140thh">).exists)</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    .pause(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">.second)</span></span>
<span class="line"><span class="__shiki_140thh">    .exec(</span></span>
<span class="line"><span class="__shiki_140thh">      http(</span><span class="__shiki_mdbnqw">&quot;创建新用户&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        .post(</span><span class="__shiki_mdbnqw">&quot;/users&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        .body(</span><span class="__shiki_1t8gfj">StringBody</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;&quot;&quot;{&quot;name&quot;: &quot;testUser&quot;, &quot;email&quot;: &quot;test@example.com&quot;}&quot;&quot;&quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">        .asJson</span></span>
<span class="line"><span class="__shiki_140thh">        .check(status.is(</span><span class="__shiki_dzsirb">201</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">        .check(jsonPath(</span><span class="__shiki_mdbnqw">&quot;$.id&quot;</span><span class="__shiki_140thh">).saveAs(</span><span class="__shiki_mdbnqw">&quot;userId&quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    .pause(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">.seconds)</span></span>
<span class="line"><span class="__shiki_140thh">    .exec(</span></span>
<span class="line"><span class="__shiki_140thh">      http(</span><span class="__shiki_mdbnqw">&quot;获取用户详情&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        .get(</span><span class="__shiki_mdbnqw">&quot;/users/\${userId}&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        .check(status.is(</span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 设置负载模式</span></span>
<span class="line"><span class="__shiki_140thh">  setUp(</span></span>
<span class="line"><span class="__shiki_140thh">    scn.inject(</span></span>
<span class="line"><span class="__shiki_140thh">      nothingFor(</span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">.seconds),                    </span><span class="__shiki_21nrsd">// 等待4秒</span></span>
<span class="line"><span class="__shiki_140thh">      atOnceUsers(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">),                         </span><span class="__shiki_21nrsd">// 立即启动10个用户</span></span>
<span class="line"><span class="__shiki_140thh">      rampUsers(</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">).during(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">.minute),          </span><span class="__shiki_21nrsd">// 1分钟内逐步增加到50用户</span></span>
<span class="line"><span class="__shiki_140thh">      constantUsersPerSec(</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">).during(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">.minutes), </span><span class="__shiki_21nrsd">// 2分钟内保持20用户/秒</span></span>
<span class="line"><span class="__shiki_140thh">      rampUsersPerSec(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">).to(</span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">).during(</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">.minutes) </span><span class="__shiki_21nrsd">// 3分钟内从10用户/秒增加到30用户/秒</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">  ).protocols(httpProtocol)</span></span>
<span class="line"><span class="__shiki_140thh">    .assertions(</span></span>
<span class="line"><span class="__shiki_140thh">      global.responseTime.max.lt(</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">),        </span><span class="__shiki_21nrsd">// 最大响应时间&lt;1000ms</span></span>
<span class="line"><span class="__shiki_140thh">      global.successfulRequests.percent.gt(</span><span class="__shiki_dzsirb">99</span><span class="__shiki_140thh">) </span><span class="__shiki_21nrsd">// 成功率&gt;99%</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_4-测试场景设计" tabindex="-1">4. 测试场景设计 <a class="header-anchor" href="#_4-测试场景设计" aria-label="Permalink to &quot;4. 测试场景设计&quot;">​</a></h2><h3 id="_4-1-用户行为建模" tabindex="-1">4.1 用户行为建模 <a class="header-anchor" href="#_4-1-用户行为建模" aria-label="Permalink to &quot;4.1 用户行为建模&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> UserBehaviorModel</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.user_profiles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.workflow_patterns </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> create_user_profile</span><span class="__shiki_140thh">(self, profile_name, characteristics):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;创建用户画像&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.user_profiles[profile_name] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;think_time&#39;</span><span class="__shiki_140thh">: characteristics.get(</span><span class="__shiki_mdbnqw">&#39;think_time&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;session_length&#39;</span><span class="__shiki_140thh">: characteristics.get(</span><span class="__shiki_mdbnqw">&#39;session_length&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">900</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;request_frequency&#39;</span><span class="__shiki_140thh">: characteristics.get(</span><span class="__shiki_mdbnqw">&#39;request_frequency&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0.5</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;error_tolerance&#39;</span><span class="__shiki_140thh">: characteristics.get(</span><span class="__shiki_mdbnqw">&#39;error_tolerance&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0.1</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;preferred_devices&#39;</span><span class="__shiki_140thh">: characteristics.get(</span><span class="__shiki_mdbnqw">&#39;devices&#39;</span><span class="__shiki_140thh">, [</span><span class="__shiki_mdbnqw">&#39;desktop&#39;</span><span class="__shiki_140thh">]),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;geographic_location&#39;</span><span class="__shiki_140thh">: characteristics.get(</span><span class="__shiki_mdbnqw">&#39;location&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;default&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> define_workflow</span><span class="__shiki_140thh">(self, workflow_name, steps):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;定义用户工作流&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.workflow_patterns[workflow_name] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;steps&#39;</span><span class="__shiki_140thh">: steps,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;completion_rate&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1.0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;abandonment_points&#39;</span><span class="__shiki_140thh">: [],</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;alternative_paths&#39;</span><span class="__shiki_140thh">: {}</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> generate_load_profile</span><span class="__shiki_140thh">(self, user_count, duration):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;生成负载配置文件&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;concurrent_users&#39;</span><span class="__shiki_140thh">: user_count,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;test_duration&#39;</span><span class="__shiki_140thh">: duration,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;ramp_up_period&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">min</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">300</span><span class="__shiki_140thh">, duration </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.2</span><span class="__shiki_140thh">),  </span><span class="__shiki_21nrsd"># 20%的时间用于逐步增加</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;ramp_down_period&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">min</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">300</span><span class="__shiki_140thh">, duration </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.1</span><span class="__shiki_140thh">), </span><span class="__shiki_21nrsd"># 10%的时间用于逐步减少</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;steady_state_period&#39;</span><span class="__shiki_140thh">: duration </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.7</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;spike_configuration&#39;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;spike_frequency&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;spike_magnitude&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;spike_duration&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span></code></pre></div><h3 id="_4-2-流量模式设计" tabindex="-1">4.2 流量模式设计 <a class="header-anchor" href="#_4-2-流量模式设计" aria-label="Permalink to &quot;4.2 流量模式设计&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TrafficPatternGenerator</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.patterns </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> normal_distribution</span><span class="__shiki_140thh">(self, peak_users, duration_hours):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;正态分布流量模式 - 模拟日常流量&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        import</span><span class="__shiki_140thh"> numpy </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> np</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        times </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> np.linspace(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, duration_hours, duration_hours </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 模拟日间高峰（下午2点达到峰值）</span></span>
<span class="line"><span class="__shiki_140thh">        peak_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 14</span><span class="__shiki_21nrsd">  # 下午2点</span></span>
<span class="line"><span class="__shiki_140thh">        users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> peak_users </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> np.exp(</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">0.5</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> ((times </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> peak_time) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">**</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;normal_distribution&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;users_over_time&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">list</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">zip</span><span class="__shiki_140thh">(times, users)),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;description&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;日常流量模式 - 正态分布&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> spike_traffic</span><span class="__shiki_140thh">(self, base_users, spike_users, spike_times):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;尖峰流量模式 - 模拟促销/热点事件&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        pattern </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;spike_traffic&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;base_users&#39;</span><span class="__shiki_140thh">: base_users,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;spikes&#39;</span><span class="__shiki_140thh">: []</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> spike </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> spike_times:</span></span>
<span class="line"><span class="__shiki_140thh">            pattern[</span><span class="__shiki_mdbnqw">&#39;spikes&#39;</span><span class="__shiki_140thh">].append({</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;start_time&#39;</span><span class="__shiki_140thh">: spike[</span><span class="__shiki_mdbnqw">&#39;start&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;duration&#39;</span><span class="__shiki_140thh">: spike[</span><span class="__shiki_mdbnqw">&#39;duration&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;peak_users&#39;</span><span class="__shiki_140thh">: spike_users,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;ramp_up&#39;</span><span class="__shiki_140thh">: spike.get(</span><span class="__shiki_mdbnqw">&#39;ramp_up&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">),  </span><span class="__shiki_21nrsd"># 60秒内达到峰值</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;ramp_down&#39;</span><span class="__shiki_140thh">: spike.get(</span><span class="__shiki_mdbnqw">&#39;ramp_down&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">120</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 120秒内恢复正常</span></span>
<span class="line"><span class="__shiki_140thh">            })</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> pattern</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> gradual_growth</span><span class="__shiki_140thh">(self, start_users, end_users, duration):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;渐进增长模式 - 模拟用户增长&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;gradual_growth&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;start_users&#39;</span><span class="__shiki_140thh">: start_users,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;end_users&#39;</span><span class="__shiki_140thh">: end_users,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;duration&#39;</span><span class="__shiki_140thh">: duration,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;growth_rate&#39;</span><span class="__shiki_140thh">: (end_users </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> start_users) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> duration</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span></code></pre></div><h2 id="_5-测试执行与监控" tabindex="-1">5. 测试执行与监控 <a class="header-anchor" href="#_5-测试执行与监控" aria-label="Permalink to &quot;5. 测试执行与监控&quot;">​</a></h2><h3 id="_5-1-分布式负载生成" tabindex="-1">5.1 分布式负载生成 <a class="header-anchor" href="#_5-1-分布式负载生成" aria-label="Permalink to &quot;5.1 分布式负载生成&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># docker-compose-load-test.yml</span></span>
<span class="line"><span class="__shiki_17hn0y">version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;3.8&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">services</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  master</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gatling/gatling</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">./scripts:/opt/gatling/user-files/simulations</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">./results:/opt/gatling/results</span></span>
<span class="line"><span class="__shiki_17hn0y">    command</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      sh -c &quot;cd /opt/gatling/bin &amp;&amp; </span></span>
<span class="line"><span class="__shiki_mdbnqw">             ./gatling.sh -s ApiLoadTest -onf&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    environment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">GATLING_CLUSTER_MODE=master</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">GATLING_CLUSTER_WORKERS=worker1,worker2</span></span>
<span class="line"><span class="__shiki_17hn0y">    networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">load-test-network</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">  worker1</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gatling/gatling</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">./scripts:/opt/gatling/user-files/simulations</span></span>
<span class="line"><span class="__shiki_17hn0y">    command</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      sh -c &quot;cd /opt/gatling/bin &amp;&amp; </span></span>
<span class="line"><span class="__shiki_mdbnqw">             ./gatling.sh -onw&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    environment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">GATLING_CLUSTER_MODE=worker</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">GATLING_CLUSTER_MODE_MASTER=master</span></span>
<span class="line"><span class="__shiki_17hn0y">    networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">load-test-network</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">  worker2</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gatling/gatling</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">./scripts:/opt/gatling/user-files/simulations</span></span>
<span class="line"><span class="__shiki_17hn0y">    command</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      sh -c &quot;cd /opt/gatling/bin &amp;&amp; </span></span>
<span class="line"><span class="__shiki_mdbnqw">             ./gatling.sh -onw&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    environment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">GATLING_CLUSTER_MODE=worker</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">GATLING_CLUSTER_MODE_MASTER=master</span></span>
<span class="line"><span class="__shiki_17hn0y">    networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">load-test-network</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">  monitoring</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">prom/prometheus</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;9090:9090&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">./prometheus.yml:/etc/prometheus/prometheus.yml</span></span>
<span class="line"><span class="__shiki_17hn0y">    networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">load-test-network</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">  grafana</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">grafana/grafana</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;3000:3000&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    environment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">GF_SECURITY_ADMIN_PASSWORD=admin</span></span>
<span class="line"><span class="__shiki_17hn0y">    networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">load-test-network</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  load-test-network</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    driver</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bridge</span></span></code></pre></div><h3 id="_5-2-实时监控系统" tabindex="-1">5.2 实时监控系统 <a class="header-anchor" href="#_5-2-实时监控系统" aria-label="Permalink to &quot;5.2 实时监控系统&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> PerformanceMonitor</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, test_id):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.test_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> test_id</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.metrics_collector </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> MetricsCollector()</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.alert_manager </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> AlertManager()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> start_monitoring</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;启动全方位监控&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        monitors </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.monitor_system_resources(),</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.monitor_application_metrics(),</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.monitor_business_metrics(),</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.monitor_infrastructure()</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 启动所有监控任务</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> monitor </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> monitors:</span></span>
<span class="line"><span class="__shiki_140thh">            asyncio.create_task(monitor)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> monitor_system_resources</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;监控系统资源&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        while</span><span class="__shiki_dzsirb"> True</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # CPU监控</span></span>
<span class="line"><span class="__shiki_140thh">            cpu_metrics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.get_cpu_metrics()</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.metrics_collector.record(</span><span class="__shiki_mdbnqw">&#39;cpu&#39;</span><span class="__shiki_140thh">, cpu_metrics)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 内存监控</span></span>
<span class="line"><span class="__shiki_140thh">            memory_metrics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.get_memory_metrics()</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.metrics_collector.record(</span><span class="__shiki_mdbnqw">&#39;memory&#39;</span><span class="__shiki_140thh">, memory_metrics)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 磁盘I/O监控</span></span>
<span class="line"><span class="__shiki_140thh">            disk_metrics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> get_disk_metrics()</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.metrics_collector.record(</span><span class="__shiki_mdbnqw">&#39;disk&#39;</span><span class="__shiki_140thh">, disk_metrics)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 网络监控</span></span>
<span class="line"><span class="__shiki_140thh">            network_metrics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> get_network_metrics()</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.metrics_collector.record(</span><span class="__shiki_mdbnqw">&#39;network&#39;</span><span class="__shiki_140thh">, network_metrics)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> asyncio.sleep(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 每秒收集一次</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> monitor_application_metrics</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;监控应用性能指标&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        while</span><span class="__shiki_dzsirb"> True</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 响应时间监控</span></span>
<span class="line"><span class="__shiki_140thh">            response_times </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.get_response_times()</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.metrics_collector.record(</span><span class="__shiki_mdbnqw">&#39;response_time&#39;</span><span class="__shiki_140thh">, response_times)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 吞吐量监控</span></span>
<span class="line"><span class="__shiki_140thh">            throughput </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.get_throughput()</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.metrics_collector.record(</span><span class="__shiki_mdbnqw">&#39;throughput&#39;</span><span class="__shiki_140thh">, throughput)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 错误率监控</span></span>
<span class="line"><span class="__shiki_140thh">            error_rate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.get_error_rate()</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.metrics_collector.record(</span><span class="__shiki_mdbnqw">&#39;error_rate&#39;</span><span class="__shiki_140thh">, error_rate)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 检查性能阈值</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.check_performance_thresholds()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> asyncio.sleep(</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 每5秒收集一次</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> check_performance_thresholds</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;检查性能阈值并触发告警&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        current_metrics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.metrics_collector.get_current_metrics()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 响应时间阈值检查</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> current_metrics[</span><span class="__shiki_mdbnqw">&#39;response_time_p95&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd"># P95响应时间&gt;1秒</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.alert_manager.trigger_alert(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;HIGH_RESPONSE_TIME&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">                f</span><span class="__shiki_mdbnqw">&#39;P95响应时间超过阈值: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">current_metrics[</span><span class="__shiki_mdbnqw">&quot;response_time_p95&quot;</span><span class="__shiki_140thh">]</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">ms&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 错误率阈值检查</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> current_metrics[</span><span class="__shiki_mdbnqw">&#39;error_rate&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.01</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd"># 错误率&gt;1%</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.alert_manager.trigger_alert(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;HIGH_ERROR_RATE&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">                f</span><span class="__shiki_mdbnqw">&#39;错误率超过阈值: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">current_metrics[</span><span class="__shiki_mdbnqw">&quot;error_rate&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100}</span><span class="__shiki_mdbnqw">%&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 系统资源阈值检查</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> current_metrics[</span><span class="__shiki_mdbnqw">&#39;cpu_usage&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.8</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd"># CPU使用率&gt;80%</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.alert_manager.trigger_alert(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;HIGH_CPU_USAGE&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">                f</span><span class="__shiki_mdbnqw">&#39;CPU使用率过高: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">current_metrics[</span><span class="__shiki_mdbnqw">&quot;cpu_usage&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100}</span><span class="__shiki_mdbnqw">%&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span></code></pre></div><h2 id="_6-结果分析与报告" tabindex="-1">6. 结果分析与报告 <a class="header-anchor" href="#_6-结果分析与报告" aria-label="Permalink to &quot;6. 结果分析与报告&quot;">​</a></h2><h3 id="_6-1-性能数据分析" tabindex="-1">6.1 性能数据分析 <a class="header-anchor" href="#_6-1-性能数据分析" aria-label="Permalink to &quot;6.1 性能数据分析&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> PerformanceAnalyzer</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, test_results):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.results </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> test_results</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.analysis_report </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> analyze_performance_trends</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;分析性能趋势&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        trends </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;response_time_trend&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.calculate_response_time_trend(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;throughput_trend&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.calculate_throughput_trend(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;error_trend&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.calculate_error_trend(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;resource_utilization_trend&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.calculate_resource_trend()</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> trends</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> identify_bottlenecks</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;识别性能瓶颈&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        bottlenecks </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 响应时间分析</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.results[</span><span class="__shiki_mdbnqw">&#39;p95_response_time&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.results[</span><span class="__shiki_mdbnqw">&#39;target_response_time&#39;</span><span class="__shiki_140thh">]:</span></span>
<span class="line"><span class="__shiki_140thh">            bottlenecks.append({</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;RESPONSE_TIME&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;severity&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;HIGH&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;description&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;95%请求响应时间超过目标值&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;suggestions&#39;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;优化数据库查询&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;增加缓存层&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;优化代码逻辑&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                ]</span></span>
<span class="line"><span class="__shiki_140thh">            })</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 吞吐量分析</span></span>
<span class="line"><span class="__shiki_140thh">        expected_throughput </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.results[</span><span class="__shiki_mdbnqw">&#39;expected_rps&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        actual_throughput </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.results[</span><span class="__shiki_mdbnqw">&#39;actual_rps&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> actual_throughput </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> expected_throughput </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.8</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            bottlenecks.append({</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;THROUGHPUT&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;severity&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;MEDIUM&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;description&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;系统吞吐量未达到预期&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;suggestions&#39;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;检查系统资源限制&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;优化并发处理&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;考虑水平扩展&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                ]</span></span>
<span class="line"><span class="__shiki_140thh">            })</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 错误率分析</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.results[</span><span class="__shiki_mdbnqw">&#39;error_rate&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.01</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            bottlenecks.append({</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;ERROR_RATE&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;severity&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;HIGH&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;description&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;错误率超过可接受范围&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;suggestions&#39;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;检查异常处理逻辑&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;验证输入参数验证&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;检查依赖服务状态&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                ]</span></span>
<span class="line"><span class="__shiki_140thh">            })</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> bottlenecks</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> generate_performance_report</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;生成性能测试报告&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        report </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;executive_summary&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.generate_executive_summary(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;test_configuration&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.results[</span><span class="__shiki_mdbnqw">&#39;test_config&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;key_findings&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.analyze_key_findings(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;performance_metrics&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.compile_metrics(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;bottleneck_analysis&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.identify_bottlenecks(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;recommendations&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.generate_recommendations(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;charts_and_graphs&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.generate_charts()</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> report</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> generate_executive_summary</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;生成执行摘要&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        summary </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;test_objective&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.results[</span><span class="__shiki_mdbnqw">&#39;test_config&#39;</span><span class="__shiki_140thh">][</span><span class="__shiki_mdbnqw">&#39;objective&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;success_criteria_met&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.evaluate_success_criteria(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;overall_assessment&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.provide_overall_assessment(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;key_risks&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.identify_key_risks(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;immediate_actions&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.suggest_immediate_actions()</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> summary</span></span></code></pre></div><h3 id="_6-2-可视化报告" tabindex="-1">6.2 可视化报告 <a class="header-anchor" href="#_6-2-可视化报告" aria-label="Permalink to &quot;6.2 可视化报告&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ReportVisualizer</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, analysis_results):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.results </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> analysis_results</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> create_performance_dashboard</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;创建性能仪表板&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        import</span><span class="__shiki_140thh"> matplotlib.pyplot </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> plt</span></span>
<span class="line"><span class="__shiki_1itgoe">        import</span><span class="__shiki_140thh"> seaborn </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> sns</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        fig, axes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> plt.subplots(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">figsize</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">15</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 响应时间分布</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.plot_response_time_distribution(axes[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 吞吐量随时间变化</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.plot_throughput_over_time(axes[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 错误率分析</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.plot_error_analysis(axes[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 资源利用率</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.plot_resource_utilization(axes[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        plt.tight_layout()</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> fig</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> plot_response_time_distribution</span><span class="__shiki_140thh">(self, ax):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;绘制响应时间分布图&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        response_times </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.results[</span><span class="__shiki_mdbnqw">&#39;response_time_metrics&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        percentiles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;p50&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;p75&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;p90&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;p95&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;p99&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        values </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [response_times[p] </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> percentiles]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        bars </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ax.bar(percentiles, values, </span><span class="__shiki_1jdh33">color</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;skyblue&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        ax.set_title(</span><span class="__shiki_mdbnqw">&#39;响应时间百分位分布&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        ax.set_ylabel(</span><span class="__shiki_mdbnqw">&#39;响应时间 (ms)&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 在柱状图上添加数值标签</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> bar, value </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> zip</span><span class="__shiki_140thh">(bars, values):</span></span>
<span class="line"><span class="__shiki_140thh">            ax.text(bar.get_x() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> bar.get_width()</span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, bar.get_height() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">                   f</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">value</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">ms&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">ha</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;center&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">va</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;bottom&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> plot_throughput_over_time</span><span class="__shiki_140thh">(self, ax):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;绘制吞吐量随时间变化图&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        time_series </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.results[</span><span class="__shiki_mdbnqw">&#39;throughput_time_series&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        ax.plot(time_series[</span><span class="__shiki_mdbnqw">&#39;timestamps&#39;</span><span class="__shiki_140thh">], time_series[</span><span class="__shiki_mdbnqw">&#39;rps&#39;</span><span class="__shiki_140thh">], </span></span>
<span class="line"><span class="__shiki_1jdh33">               marker</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;o&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">linewidth</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">markersize</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        ax.set_title(</span><span class="__shiki_mdbnqw">&#39;吞吐量随时间变化&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        ax.set_xlabel(</span><span class="__shiki_mdbnqw">&#39;时间&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        ax.set_ylabel(</span><span class="__shiki_mdbnqw">&#39;请求数/秒&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        ax.grid(</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">alpha</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0.3</span><span class="__shiki_140thh">)</span></span></code></pre></div><h2 id="_7-负载测试最佳实践" tabindex="-1">7. 负载测试最佳实践 <a class="header-anchor" href="#_7-负载测试最佳实践" aria-label="Permalink to &quot;7. 负载测试最佳实践&quot;">​</a></h2><h3 id="_7-1-测试环境管理" tabindex="-1">7.1 测试环境管理 <a class="header-anchor" href="#_7-1-测试环境管理" aria-label="Permalink to &quot;7.1 测试环境管理&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 测试环境配置</span></span>
<span class="line"><span class="__shiki_17hn0y">test_environment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  hardware</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    servers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">application</span></span>
<span class="line"><span class="__shiki_17hn0y">        count</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">        spec</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;8CPU 16GB RAM&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">database</span></span>
<span class="line"><span class="__shiki_17hn0y">        count</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">        spec</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;16CPU 32GB RAM SSD&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cache</span></span>
<span class="line"><span class="__shiki_17hn0y">        count</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">        spec</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;4CPU 8GB RAM&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">  network</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    bandwidth</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1Gbps&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    latency</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;&lt; 10ms&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    topology</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;production-like&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  software</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    os</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Linux Ubuntu 20.04&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    middleware</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;Nginx 1.18&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;Java 11&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;Redis 6.0&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;PostgreSQL 13&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">  data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    database_size</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;50GB&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    cache_warmup</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;required&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    test_data</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;synthetic + sanitized_production&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  monitoring</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    application_metrics</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;enabled&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    infrastructure_metrics</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;enabled&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    business_metrics</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;enabled&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    log_collection</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;centralized&quot;</span></span></code></pre></div><h3 id="_7-2-测试数据策略" tabindex="-1">7.2 测试数据策略 <a class="header-anchor" href="#_7-2-测试数据策略" aria-label="Permalink to &quot;7.2 测试数据策略&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TestDataStrategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.data_generators </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.data_pools </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> create_realistic_test_data</span><span class="__shiki_140thh">(self, data_profile):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;创建真实的测试数据&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        strategies </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;user_data&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.generate_user_data,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;product_data&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.generate_product_data,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;transaction_data&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.generate_transaction_data,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;content_data&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.generate_content_data</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        test_data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> data_type, generator </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> strategies.items():</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> data_type </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> data_profile:</span></span>
<span class="line"><span class="__shiki_140thh">                test_data[data_type] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> generator(data_profile[data_type])</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> test_data</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> generate_user_data</span><span class="__shiki_140thh">(self, config):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;生成用户测试数据&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(config[</span><span class="__shiki_mdbnqw">&#39;count&#39;</span><span class="__shiki_140thh">]):</span></span>
<span class="line"><span class="__shiki_140thh">            user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;id&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;user_</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">i</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;name&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Test User </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">i</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;email&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;user</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">i</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">@test.com&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;profile&#39;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;age&#39;</span><span class="__shiki_140thh">: random.randint(</span><span class="__shiki_dzsirb">18</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">65</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;location&#39;</span><span class="__shiki_140thh">: random.choice(config[</span><span class="__shiki_mdbnqw">&#39;locations&#39;</span><span class="__shiki_140thh">]),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;preferences&#39;</span><span class="__shiki_140thh">: random.sample(config[</span><span class="__shiki_mdbnqw">&#39;preferences&#39;</span><span class="__shiki_140thh">], </span></span>
<span class="line"><span class="__shiki_1jdh33">                                              k</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">random.randint(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">                },</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;behavior&#39;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;session_length&#39;</span><span class="__shiki_140thh">: random.normalvariate(</span><span class="__shiki_dzsirb">300</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">),  </span><span class="__shiki_21nrsd"># 平均5分钟</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;request_frequency&#39;</span><span class="__shiki_140thh">: random.uniform(</span><span class="__shiki_dzsirb">0.1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2.0</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;error_tolerance&#39;</span><span class="__shiki_140thh">: random.uniform(</span><span class="__shiki_dzsirb">0.05</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0.2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            users.append(user)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> users</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> manage_data_lifecycle</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;管理测试数据生命周期&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        lifecycle </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;creation&#39;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;method&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;synthetic_generation&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;volume&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;production_like&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;variety&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;realistic_distribution&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;isolation&#39;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;environment_separation&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;data_anonymization&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;access_control&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;strict&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;maintenance&#39;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;refresh_frequency&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;before_each_test&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;cleanup_strategy&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;automated&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;version_control&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;enabled&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;disposal&#39;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;secure_deletion&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;compliance_audit&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">True</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> lifecycle</span></span></code></pre></div><h3 id="_7-3-持续负载测试集成" tabindex="-1">7.3 持续负载测试集成 <a class="header-anchor" href="#_7-3-持续负载测试集成" aria-label="Permalink to &quot;7.3 持续负载测试集成&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># GitHub Actions 负载测试工作流</span></span>
<span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Load Testing Pipeline</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  push</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    branches</span><span class="__shiki_140thh">: [ </span><span class="__shiki_mdbnqw">main</span><span class="__shiki_140thh"> ]</span></span>
<span class="line"><span class="__shiki_17hn0y">  pull_request</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    branches</span><span class="__shiki_140thh">: [ </span><span class="__shiki_mdbnqw">main</span><span class="__shiki_140thh"> ]</span></span>
<span class="line"><span class="__shiki_17hn0y">  schedule</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">cron</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;0 2 * * *&#39;</span><span class="__shiki_21nrsd">  # 每天凌晨2点运行</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  load-test</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        load-level</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">low</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">medium</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">high</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v2</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Setup Java</span></span>
<span class="line"><span class="__shiki_17hn0y">      uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/setup-java@v2</span></span>
<span class="line"><span class="__shiki_17hn0y">      with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        java-version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;11&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        distribution</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;adopt&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Setup Node.js</span></span>
<span class="line"><span class="__shiki_17hn0y">      uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/setup-node@v2</span></span>
<span class="line"><span class="__shiki_17hn0y">      with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        node-version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;16&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Install k6</span></span>
<span class="line"><span class="__shiki_17hn0y">      run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">        sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69</span></span>
<span class="line"><span class="__shiki_mdbnqw">        echo &quot;deb https://dl.k6.io/deb stable main&quot; | sudo tee /etc/apt/sources.list.d/k6.list</span></span>
<span class="line"><span class="__shiki_mdbnqw">        sudo apt-get update</span></span>
<span class="line"><span class="__shiki_mdbnqw">        sudo apt-get install k6</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Run Load Tests</span></span>
<span class="line"><span class="__shiki_17hn0y">      run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">        k6 run --out json=results.json \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">               --vus \${{ matrix.load-level == &#39;low&#39; &amp;&amp; &#39;50&#39; || matrix.load-level == &#39;medium&#39; &amp;&amp; &#39;200&#39; || &#39;500&#39; }} \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">               --duration 10m \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">               scripts/load-test.js</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Analyze Results</span></span>
<span class="line"><span class="__shiki_17hn0y">      run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">        python scripts/analyze_results.py results.json</span></span>
<span class="line"><span class="__shiki_mdbnqw">        python scripts/check_thresholds.py</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Upload Results</span></span>
<span class="line"><span class="__shiki_17hn0y">      uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/upload-artifact@v2</span></span>
<span class="line"><span class="__shiki_17hn0y">      with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">load-test-results-\${{ matrix.load-level }}</span></span>
<span class="line"><span class="__shiki_17hn0y">        path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">results.json</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Generate Report</span></span>
<span class="line"><span class="__shiki_17hn0y">      if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">always()</span></span>
<span class="line"><span class="__shiki_17hn0y">      run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">        python scripts/generate_report.py</span></span>
<span class="line"><span class="__shiki_mdbnqw">        python scripts/slack_notification.py</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Performance Gate</span></span>
<span class="line"><span class="__shiki_17hn0y">      if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">matrix.load-level == &#39;high&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">      run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">        python scripts/performance_gate.py</span></span></code></pre></div><p>这份负载测试学习笔记涵盖了从基础概念到高级实践的全方位内容，包括测试策略、工具使用、场景设计、执行监控、结果分析和持续集成等关键环节。通过系统化的负载测试，可以确保应用在真实负载条件下的性能表现，为系统扩展提供数据支持。</p>`,43)])])}const d=a(p,[["render",h]]);export{o as __pageData,d as default};
