import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"可观测性 - 日志管理 - 结构化日志 完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/observability/logging/structured.md","filePath":"backend/observability/logging/structured.md"}'),p={name:"backend/observability/logging/structured.md"};function h(l,s,t,c,e,o){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="可观测性-日志管理-结构化日志-完整学习笔记" tabindex="-1">可观测性 - 日志管理 - 结构化日志 完整学习笔记 <a class="header-anchor" href="#可观测性-日志管理-结构化日志-完整学习笔记" aria-label="Permalink to &quot;可观测性 - 日志管理 - 结构化日志 完整学习笔记&quot;">​</a></h1><h2 id="_1-可观测性基础概念" tabindex="-1">1. 可观测性基础概念 <a class="header-anchor" href="#_1-可观测性基础概念" aria-label="Permalink to &quot;1. 可观测性基础概念&quot;">​</a></h2><h3 id="_1-1-什么是可观测性" tabindex="-1">1.1 什么是可观测性 <a class="header-anchor" href="#_1-1-什么是可观测性" aria-label="Permalink to &quot;1.1 什么是可观测性&quot;">​</a></h3><p><strong>可观测性</strong> 是指通过系统外部输出来理解系统内部状态的能力，包含三大支柱：</p><ul><li><strong>日志 (Logs)</strong></li><li><strong>指标 (Metrics)</strong></li><li><strong>追踪 (Traces)</strong></li></ul><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[可观测性] --&gt; B[日志 Logs]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[指标 Metrics]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[追踪 Traces]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[事件记录]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B2[错误调试]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B3[行为分析]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[性能监控]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C2[资源使用]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C3[趋势分析]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[请求链路]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D2[性能瓶颈]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D3[依赖关系]</span></span></code></pre></div><h3 id="_1-2-三大支柱的关系" tabindex="-1">1.2 三大支柱的关系 <a class="header-anchor" href="#_1-2-三大支柱的关系" aria-label="Permalink to &quot;1.2 三大支柱的关系&quot;">​</a></h3><table tabindex="0"><thead><tr><th>维度</th><th>日志</th><th>指标</th><th>追踪</th></tr></thead><tbody><tr><td><strong>数据类型</strong></td><td>离散事件</td><td>数值数据</td><td>请求链路</td></tr><tr><td><strong>粒度</strong></td><td>细粒度</td><td>聚合数据</td><td>请求级别</td></tr><tr><td><strong>主要用途</strong></td><td>调试、审计</td><td>监控、告警</td><td>性能分析</td></tr></tbody></table><h2 id="_2-日志管理基础" tabindex="-1">2. 日志管理基础 <a class="header-anchor" href="#_2-日志管理基础" aria-label="Permalink to &quot;2. 日志管理基础&quot;">​</a></h2><h3 id="_2-1-日志的生命周期" tabindex="-1">2.1 日志的生命周期 <a class="header-anchor" href="#_2-1-日志的生命周期" aria-label="Permalink to &quot;2.1 日志的生命周期&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">flowchart LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[日志生成] --&gt; B[日志收集]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[日志传输]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[日志存储]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[日志分析]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; F[日志可视化]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; G[日志归档/清理]</span></span></code></pre></div><h3 id="_2-2-日志级别标准" tabindex="-1">2.2 日志级别标准 <a class="header-anchor" href="#_2-2-日志级别标准" aria-label="Permalink to &quot;2.2 日志级别标准&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Python logging 级别</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> logging</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 标准日志级别（从低到高）</span></span>
<span class="line"><span class="__shiki_140thh">logging.</span><span class="__shiki_dzsirb">DEBUG</span><span class="__shiki_21nrsd">    # 调试信息</span></span>
<span class="line"><span class="__shiki_140thh">logging.</span><span class="__shiki_dzsirb">INFO</span><span class="__shiki_21nrsd">     # 常规信息</span></span>
<span class="line"><span class="__shiki_140thh">logging.</span><span class="__shiki_dzsirb">WARNING</span><span class="__shiki_21nrsd">  # 警告信息</span></span>
<span class="line"><span class="__shiki_140thh">logging.</span><span class="__shiki_dzsirb">ERROR</span><span class="__shiki_21nrsd">    # 错误信息</span></span>
<span class="line"><span class="__shiki_140thh">logging.</span><span class="__shiki_dzsirb">CRITICAL</span><span class="__shiki_21nrsd"> # 严重错误</span></span></code></pre></div><h2 id="_3-结构化日志详解" tabindex="-1">3. 结构化日志详解 <a class="header-anchor" href="#_3-结构化日志详解" aria-label="Permalink to &quot;3. 结构化日志详解&quot;">​</a></h2><h3 id="_3-1-非结构化-vs-结构化日志" tabindex="-1">3.1 非结构化 vs 结构化日志 <a class="header-anchor" href="#_3-1-非结构化-vs-结构化日志" aria-label="Permalink to &quot;3.1 非结构化 vs 结构化日志&quot;">​</a></h3><p><strong>非结构化日志（传统方式）</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">2023-10-01 12:30:45 ERROR User login failed for user john@example.com</span></span></code></pre></div><p><strong>结构化日志（现代方式）</strong>：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;timestamp&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2023-10-01T12:30:45.123Z&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;level&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;ERROR&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;message&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;User login failed&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;user_id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;usr_12345&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;email&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;john@example.com&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;ip_address&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;192.168.1.100&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;session_id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;sess_abc123&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;error_code&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;AUTH_001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;service&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;authentication-service&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;trace_id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;trace-789xyz&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-结构化日志的核心优势" tabindex="-1">3.2 结构化日志的核心优势 <a class="header-anchor" href="#_3-2-结构化日志的核心优势" aria-label="Permalink to &quot;3.2 结构化日志的核心优势&quot;">​</a></h3><ol><li><strong>机器可读性</strong> - 易于解析和处理</li><li><strong>查询效率</strong> - 支持复杂查询和过滤</li><li><strong>字段标准化</strong> - 统一的日志schema</li><li><strong>上下文丰富</strong> - 包含完整的业务上下文</li><li><strong>易于集成</strong> - 与监控系统无缝集成</li></ol><h3 id="_3-3-结构化日志的关键字段" tabindex="-1">3.3 结构化日志的关键字段 <a class="header-anchor" href="#_3-3-结构化日志的关键字段" aria-label="Permalink to &quot;3.3 结构化日志的关键字段&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 基础元数据</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;timestamp&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2023-10-01T12:30:45.123Z&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;level&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;INFO&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;logger&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;com.example.UserService&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 业务上下文</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;message&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;User profile updated&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;user_id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;usr_123&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;action&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;profile_update&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 技术上下文</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;service&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;user-service&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;version&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1.2.3&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;environment&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;production&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 请求链路</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;trace_id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;trace-abc123&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;span_id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;span-456&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;parent_span_id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;span-789&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 性能数据</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;duration_ms&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">45</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;memory_usage_mb&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">128</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 自定义业务字段</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;fields&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;old_email&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;old@example.com&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;new_email&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;new@example.com&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;update_source&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;web&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_4-结构化日志实现模式" tabindex="-1">4. 结构化日志实现模式 <a class="header-anchor" href="#_4-结构化日志实现模式" aria-label="Permalink to &quot;4. 结构化日志实现模式&quot;">​</a></h2><h3 id="_4-1-日志-schema-设计" tabindex="-1">4.1 日志 schema 设计 <a class="header-anchor" href="#_4-1-日志-schema-设计" aria-label="Permalink to &quot;4.1 日志 schema 设计&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Python 结构化日志 schema 示例</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> logging</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> json</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> datetime </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> datetime</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> typing </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Dict, Any</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> StructuredLogger</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, name: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, service: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, version: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.logger </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> logging.getLogger(name)</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.base_fields </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;service&quot;</span><span class="__shiki_140thh">: service,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;version&quot;</span><span class="__shiki_140thh">: version,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;environment&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.get_environment()</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> info</span><span class="__shiki_140thh">(self, message: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs):</span></span>
<span class="line"><span class="__shiki_140thh">        log_entry </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            **</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.base_fields,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;timestamp&quot;</span><span class="__shiki_140thh">: datetime.utcnow().isoformat() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot;Z&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;level&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;INFO&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;message&quot;</span><span class="__shiki_140thh">: message,</span></span>
<span class="line"><span class="__shiki_1itgoe">            **</span><span class="__shiki_140thh">kwargs</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.logger.info(json.dumps(log_entry))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> error</span><span class="__shiki_140thh">(self, message: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, error: </span><span class="__shiki_dzsirb">Exception</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs):</span></span>
<span class="line"><span class="__shiki_140thh">        log_entry </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            **</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.base_fields,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;timestamp&quot;</span><span class="__shiki_140thh">: datetime.utcnow().isoformat() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot;Z&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;level&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;ERROR&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;message&quot;</span><span class="__shiki_140thh">: message,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;error_type&quot;</span><span class="__shiki_140thh">: error.</span><span class="__shiki_dzsirb">__class__</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">__name__</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> error </span><span class="__shiki_1itgoe">else</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;error_message&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">(error) </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> error </span><span class="__shiki_1itgoe">else</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">            **</span><span class="__shiki_140thh">kwargs</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.logger.error(json.dumps(log_entry))</span></span></code></pre></div><h3 id="_4-2-不同语言的实现" tabindex="-1">4.2 不同语言的实现 <a class="header-anchor" href="#_4-2-不同语言的实现" aria-label="Permalink to &quot;4.2 不同语言的实现&quot;">​</a></h3><h4 id="java-logback-logstash" tabindex="-1">Java (Logback + Logstash) <a class="header-anchor" href="#java-logback-logstash" aria-label="Permalink to &quot;Java (Logback + Logstash)&quot;">​</a></h4><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">&lt;!-- logback.xml --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">configuration</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">appender</span><span class="__shiki_1t8gfj"> name</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;JSON&quot;</span><span class="__shiki_1t8gfj"> class</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;ch.qos.logback.core.ConsoleAppender&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;</span><span class="__shiki_17hn0y">encoder</span><span class="__shiki_1t8gfj"> class</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;net.logstash.logback.encoder.LogstashEncoder&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">            &lt;</span><span class="__shiki_17hn0y">customFields</span><span class="__shiki_140thh">&gt;{&quot;service&quot;:&quot;user-service&quot;,&quot;version&quot;:&quot;1.0.0&quot;}&lt;/</span><span class="__shiki_17hn0y">customFields</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;/</span><span class="__shiki_17hn0y">encoder</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_17hn0y">appender</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">root</span><span class="__shiki_1t8gfj"> level</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;INFO&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;</span><span class="__shiki_17hn0y">appender-ref</span><span class="__shiki_1t8gfj"> ref</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;JSON&quot;</span><span class="__shiki_140thh"> /&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_17hn0y">root</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_17hn0y">configuration</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h4 id="javascript-node-js" tabindex="-1">JavaScript/Node.js <a class="header-anchor" href="#javascript-node-js" aria-label="Permalink to &quot;JavaScript/Node.js&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> winston</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;winston&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> logger</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> winston.</span><span class="__shiki_1t8gfj">createLogger</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  level: </span><span class="__shiki_mdbnqw">&#39;info&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  format: winston.format.</span><span class="__shiki_1t8gfj">combine</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    winston.format.</span><span class="__shiki_1t8gfj">timestamp</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    winston.format.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">  ),</span></span>
<span class="line"><span class="__shiki_140thh">  defaultMeta: {</span></span>
<span class="line"><span class="__shiki_140thh">    service: </span><span class="__shiki_mdbnqw">&#39;user-service&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    version: </span><span class="__shiki_mdbnqw">&#39;1.0.0&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  transports: [</span><span class="__shiki_1itgoe">new</span><span class="__shiki_140thh"> winston.transports.</span><span class="__shiki_1t8gfj">Console</span><span class="__shiki_140thh">()]</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用结构化日志</span></span>
<span class="line"><span class="__shiki_140thh">logger.</span><span class="__shiki_1t8gfj">info</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;User login successful&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">  user_id: </span><span class="__shiki_mdbnqw">&#39;12345&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  login_method: </span><span class="__shiki_mdbnqw">&#39;oauth&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  session_duration: </span><span class="__shiki_dzsirb">3600</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h4 id="go" tabindex="-1">Go <a class="header-anchor" href="#go" aria-label="Permalink to &quot;Go&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> main</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">os</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">github.com/sirupsen/logrus</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    log </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> logrus.</span><span class="__shiki_1t8gfj">New</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    log.</span><span class="__shiki_1t8gfj">SetFormatter</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">logrus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">JSONFormatter</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        FieldMap: </span><span class="__shiki_1t8gfj">logrus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">FieldMap</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            logrus.FieldKeyTime:  </span><span class="__shiki_mdbnqw">&quot;timestamp&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            logrus.FieldKeyLevel: </span><span class="__shiki_mdbnqw">&quot;level&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            logrus.FieldKeyMsg:   </span><span class="__shiki_mdbnqw">&quot;message&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    log.</span><span class="__shiki_1t8gfj">WithFields</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">logrus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Fields</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;user_id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;12345&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;action&quot;</span><span class="__shiki_140thh">:  </span><span class="__shiki_mdbnqw">&quot;login&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;ip&quot;</span><span class="__shiki_140thh">:      </span><span class="__shiki_mdbnqw">&quot;192.168.1.100&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    }).</span><span class="__shiki_1t8gfj">Info</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;User authentication completed&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_5-日志收集与处理架构" tabindex="-1">5. 日志收集与处理架构 <a class="header-anchor" href="#_5-日志收集与处理架构" aria-label="Permalink to &quot;5. 日志收集与处理架构&quot;">​</a></h2><h3 id="_5-1-现代日志处理架构" tabindex="-1">5.1 现代日志处理架构 <a class="header-anchor" href="#_5-1-现代日志处理架构" aria-label="Permalink to &quot;5.1 现代日志处理架构&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[应用1] --&gt; B[日志文件]</span></span>
<span class="line"><span class="__shiki_140thh">    C[应用2] --&gt; D[日志文件]</span></span>
<span class="line"><span class="__shiki_140thh">    E[应用3] --&gt; F[日志文件]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; G[Filebeat]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; H[Filebeat]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; I[Filebeat]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    G --&gt; J[Logstash]</span></span>
<span class="line"><span class="__shiki_140thh">    H --&gt; J</span></span>
<span class="line"><span class="__shiki_140thh">    I --&gt; J</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    J --&gt; K[Kafka]</span></span>
<span class="line"><span class="__shiki_140thh">    K --&gt; L[Elasticsearch]</span></span>
<span class="line"><span class="__shiki_140thh">    L --&gt; M[Kibana]</span></span>
<span class="line"><span class="__shiki_140thh">    L --&gt; N[Grafana]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    K --&gt; O[冷存储 S3]</span></span></code></pre></div><h3 id="_5-2-elk-efk-技术栈" tabindex="-1">5.2 ELK/EFK 技术栈 <a class="header-anchor" href="#_5-2-elk-efk-技术栈" aria-label="Permalink to &quot;5.2 ELK/EFK 技术栈&quot;">​</a></h3><p><strong>组件说明</strong>：</p><ul><li><strong>Elasticsearch</strong>: 分布式搜索和分析引擎</li><li><strong>Logstash/Fluentd</strong>: 日志收集和处理管道</li><li><strong>Kibana</strong>: 数据可视化平台</li></ul><p><strong>Logstash 配置示例</strong>：</p><div class="language-ruby vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ruby</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">input {</span></span>
<span class="line"><span class="__shiki_140thh">  beats {</span></span>
<span class="line"><span class="__shiki_140thh">    port =&gt; </span><span class="__shiki_dzsirb">5044</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">filter {</span></span>
<span class="line"><span class="__shiki_140thh">  json {</span></span>
<span class="line"><span class="__shiki_140thh">    source =&gt; </span><span class="__shiki_mdbnqw">&quot;message&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  date {</span></span>
<span class="line"><span class="__shiki_140thh">    match =&gt; [ </span><span class="__shiki_mdbnqw">&quot;timestamp&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;ISO8601&quot;</span><span class="__shiki_140thh"> ]</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 添加业务字段</span></span>
<span class="line"><span class="__shiki_140thh">  mutate {</span></span>
<span class="line"><span class="__shiki_140thh">    add_field =&gt; {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;environment&quot;</span><span class="__shiki_140thh"> =&gt; </span><span class="__shiki_mdbnqw">&quot;production&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;data_center&quot;</span><span class="__shiki_140thh"> =&gt; </span><span class="__shiki_mdbnqw">&quot;dc-1&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">output {</span></span>
<span class="line"><span class="__shiki_140thh">  elasticsearch {</span></span>
<span class="line"><span class="__shiki_140thh">    hosts =&gt; [</span><span class="__shiki_mdbnqw">&quot;elasticsearch:9200&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    index =&gt; </span><span class="__shiki_mdbnqw">&quot;logs-%{+YYYY.MM.dd}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_6-结构化日志最佳实践" tabindex="-1">6. 结构化日志最佳实践 <a class="header-anchor" href="#_6-结构化日志最佳实践" aria-label="Permalink to &quot;6. 结构化日志最佳实践&quot;">​</a></h2><h3 id="_6-1-设计原则" tabindex="-1">6.1 设计原则 <a class="header-anchor" href="#_6-1-设计原则" aria-label="Permalink to &quot;6.1 设计原则&quot;">​</a></h3><ol><li><p><strong>一致性原则</strong></p><ul><li>使用统一的字段命名规范</li><li>保持相同语义的字段名称一致</li></ul></li><li><p><strong>上下文完整性</strong></p><ul><li>包含足够的调试信息</li><li>添加业务相关的标识符</li></ul></li><li><p><strong>性能考虑</strong></p><ul><li>避免记录敏感信息</li><li>控制日志体积和频率</li></ul></li></ol><h3 id="_6-2-字段命名规范" tabindex="-1">6.2 字段命名规范 <a class="header-anchor" href="#_6-2-字段命名规范" aria-label="Permalink to &quot;6.2 字段命名规范&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 推荐的字段命名</span></span>
<span class="line"><span class="__shiki_dzsirb">STANDARD_FIELDS</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 时间相关</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;timestamp&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;ISO8601格式&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 标识相关</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;trace_id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;请求追踪ID&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;span_id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;当前跨度ID&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;user_id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;用户ID&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;session_id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;会话ID&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 服务相关</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;service&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;服务名称&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;version&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;服务版本&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;environment&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;运行环境&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 业务相关</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;action&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;操作类型&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;resource&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;操作资源&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;status&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;操作状态&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-3-安全考虑" tabindex="-1">6.3 安全考虑 <a class="header-anchor" href="#_6-3-安全考虑" aria-label="Permalink to &quot;6.3 安全考虑&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> SecureLogger</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, logger):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.logger </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> logger</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.sensitive_fields </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;password&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;token&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;secret&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;credit_card&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;ssn&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;api_key&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> sanitize_data</span><span class="__shiki_140thh">(self, data: Dict) -&gt; Dict:</span></span>
<span class="line"><span class="__shiki_140thh">        sanitized </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> data.copy()</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> key, value </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> sanitized.items():</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_dzsirb"> any</span><span class="__shiki_140thh">(sensitive </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> key.lower() </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> sensitive </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.sensitive_fields):</span></span>
<span class="line"><span class="__shiki_140thh">                sanitized[key] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;***REDACTED***&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> sanitized</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> info</span><span class="__shiki_140thh">(self, message: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs):</span></span>
<span class="line"><span class="__shiki_140thh">        safe_data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.sanitize_data(kwargs)</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.logger.info(message, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">safe_data)</span></span></code></pre></div><h2 id="_7-高级模式和实践" tabindex="-1">7. 高级模式和实践 <a class="header-anchor" href="#_7-高级模式和实践" aria-label="Permalink to &quot;7. 高级模式和实践&quot;">​</a></h2><h3 id="_7-1-关联日志与追踪" tabindex="-1">7.1 关联日志与追踪 <a class="header-anchor" href="#_7-1-关联日志与追踪" aria-label="Permalink to &quot;7.1 关联日志与追踪&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> opentelemetry </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> trace</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> process_user_request</span><span class="__shiki_140thh">(user_id: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, action: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 获取当前追踪上下文</span></span>
<span class="line"><span class="__shiki_140thh">    current_span </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> trace.get_current_span()</span></span>
<span class="line"><span class="__shiki_140thh">    trace_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> format_trace_id(current_span.get_span_context().trace_id)</span></span>
<span class="line"><span class="__shiki_140thh">    span_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> format_span_id(current_span.get_span_context().span_id)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    logger.info(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;Processing user request&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        user_id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">user_id,</span></span>
<span class="line"><span class="__shiki_1jdh33">        action</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">action,</span></span>
<span class="line"><span class="__shiki_1jdh33">        trace_id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">trace_id,</span></span>
<span class="line"><span class="__shiki_1jdh33">        span_id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">span_id</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span></code></pre></div><h3 id="_7-2-性能监控集成" tabindex="-1">7.2 性能监控集成 <a class="header-anchor" href="#_7-2-性能监控集成" aria-label="Permalink to &quot;7.2 性能监控集成&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> time</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> functools</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> log_performance</span><span class="__shiki_140thh">(operation_name: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> decorator</span><span class="__shiki_140thh">(func):</span></span>
<span class="line"><span class="__shiki_1t8gfj">        @functools.wraps</span><span class="__shiki_140thh">(func)</span></span>
<span class="line"><span class="__shiki_1itgoe">        def</span><span class="__shiki_1t8gfj"> wrapper</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs):</span></span>
<span class="line"><span class="__shiki_140thh">            start_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.time()</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> func(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs)</span></span>
<span class="line"><span class="__shiki_140thh">                duration </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.time() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> start_time</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                logger.info(</span></span>
<span class="line"><span class="__shiki_1itgoe">                    f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">operation_name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> completed&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                    operation</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">operation_name,</span></span>
<span class="line"><span class="__shiki_1jdh33">                    duration_ms</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">round</span><span class="__shiki_140thh">(duration </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1jdh33">                    status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;success&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                )</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> result</span></span>
<span class="line"><span class="__shiki_1itgoe">            except</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> e:</span></span>
<span class="line"><span class="__shiki_140thh">                duration </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.time() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> start_time</span></span>
<span class="line"><span class="__shiki_140thh">                logger.error(</span></span>
<span class="line"><span class="__shiki_1itgoe">                    f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">operation_name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> failed&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                    operation</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">operation_name,</span></span>
<span class="line"><span class="__shiki_1jdh33">                    duration_ms</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">round</span><span class="__shiki_140thh">(duration </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1jdh33">                    status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;error&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                    error</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">(e)</span></span>
<span class="line"><span class="__shiki_140thh">                )</span></span>
<span class="line"><span class="__shiki_1itgoe">                raise</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> wrapper</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> decorator</span></span></code></pre></div><h3 id="_7-3-审计日志专门处理" tabindex="-1">7.3 审计日志专门处理 <a class="header-anchor" href="#_7-3-审计日志专门处理" aria-label="Permalink to &quot;7.3 审计日志专门处理&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> AuditLogger</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, logger):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.logger </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> logger</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> log_security_event</span><span class="__shiki_140thh">(self, event_type: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, user_id: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">details):</span></span>
<span class="line"><span class="__shiki_140thh">        audit_log </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;event_type&quot;</span><span class="__shiki_140thh">: event_type,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;user_id&quot;</span><span class="__shiki_140thh">: user_id,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;timestamp&quot;</span><span class="__shiki_140thh">: datetime.utcnow().isoformat() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot;Z&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;severity&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;HIGH&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;source_ip&quot;</span><span class="__shiki_140thh">: details.get(</span><span class="__shiki_mdbnqw">&#39;ip_address&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;user_agent&quot;</span><span class="__shiki_140thh">: details.get(</span><span class="__shiki_mdbnqw">&#39;user_agent&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;resource_accessed&quot;</span><span class="__shiki_140thh">: details.get(</span><span class="__shiki_mdbnqw">&#39;resource&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;outcome&quot;</span><span class="__shiki_140thh">: details.get(</span><span class="__shiki_mdbnqw">&#39;outcome&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;UNKNOWN&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.logger.info(</span><span class="__shiki_mdbnqw">&quot;Security audit event&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">audit_log)</span></span></code></pre></div><h2 id="_8-监控和告警" tabindex="-1">8. 监控和告警 <a class="header-anchor" href="#_8-监控和告警" aria-label="Permalink to &quot;8. 监控和告警&quot;">​</a></h2><h3 id="_8-1-基于日志的告警规则" tabindex="-1">8.1 基于日志的告警规则 <a class="header-anchor" href="#_8-1-基于日志的告警规则" aria-label="Permalink to &quot;8.1 基于日志的告警规则&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Elasticsearch Alerting 规则示例</span></span>
<span class="line"><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;High Error Rate&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  indices</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;logs-*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  condition</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    script</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      ctx.results = ctx.results || [];</span></span>
<span class="line"><span class="__shiki_mdbnqw">      def errors = ctx.results.findResult(r -&gt; </span></span>
<span class="line"><span class="__shiki_mdbnqw">        r.aggregations?.error_count?.value &gt; 10 ? r : null</span></span>
<span class="line"><span class="__shiki_mdbnqw">      );</span></span>
<span class="line"><span class="__shiki_mdbnqw">      errors != null</span></span>
<span class="line"><span class="__shiki_17hn0y">  actions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">email</span></span>
<span class="line"><span class="__shiki_17hn0y">      template</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;error_alert&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      subject</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;High Error Rate Detected&quot;</span></span></code></pre></div><h3 id="_8-2-kibana-可视化仪表板" tabindex="-1">8.2 Kibana 可视化仪表板 <a class="header-anchor" href="#_8-2-kibana-可视化仪表板" aria-label="Permalink to &quot;8.2 Kibana 可视化仪表板&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;visualization&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;title&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Application Error Dashboard&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;lens&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;attributes&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;title&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Errors by Service&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;visState&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">        &quot;aggs&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">          {</span></span>
<span class="line"><span class="__shiki_dzsirb">            &quot;id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            &quot;enabled&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            &quot;type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;count&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            &quot;schema&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metric&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            &quot;params&quot;</span><span class="__shiki_140thh">: {}</span></span>
<span class="line"><span class="__shiki_140thh">          },</span></span>
<span class="line"><span class="__shiki_140thh">          {</span></span>
<span class="line"><span class="__shiki_dzsirb">            &quot;id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            &quot;enabled&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            &quot;type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;terms&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            &quot;schema&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;group&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            &quot;params&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">              &quot;field&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;service.keyword&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">              &quot;size&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        ],</span></span>
<span class="line"><span class="__shiki_dzsirb">        &quot;filters&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">          {</span></span>
<span class="line"><span class="__shiki_dzsirb">            &quot;query&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">              &quot;match&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">                &quot;level&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;ERROR&quot;</span></span>
<span class="line"><span class="__shiki_140thh">              }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_9-总结" tabindex="-1">9. 总结 <a class="header-anchor" href="#_9-总结" aria-label="Permalink to &quot;9. 总结&quot;">​</a></h2><p>结构化日志是现代可观测性体系的核心组成部分，它提供了：</p><ol><li><strong>更好的可调试性</strong> - 通过丰富的上下文信息</li><li><strong>更高的查询效率</strong> - 支持复杂的过滤和分析</li><li><strong>更强的可扩展性</strong> - 易于集成到监控和告警系统</li><li><strong>更佳的可维护性</strong> - 统一的日志格式和规范</li></ol><p>通过采用结构化日志，团队可以更有效地监控、调试和维护复杂的分布式系统。</p><hr><p><strong>关键要点</strong>：</p><ul><li>始终使用JSON格式的结构化日志</li><li>包含足够的上下文信息</li><li>遵循统一的字段命名规范</li><li>集成追踪信息实现端到端可观测性</li><li>实施适当的安全和隐私保护措施</li></ul>`,67)])])}const d=a(p,[["render",h]]);export{r as __pageData,d as default};
