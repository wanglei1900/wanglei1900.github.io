import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"PromQL查询语言详解","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/nosql/timeseries/prometheus/promql.md","filePath":"data/database/nosql/timeseries/prometheus/promql.md"}'),_={name:"data/database/nosql/timeseries/prometheus/promql.md"};function l(h,s,t,e,c,o){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="promql查询语言详解" tabindex="-1">PromQL查询语言详解 <a class="header-anchor" href="#promql查询语言详解" aria-label="Permalink to &quot;PromQL查询语言详解&quot;">​</a></h1><h2 id="一、promql核心概念与架构" tabindex="-1">一、PromQL核心概念与架构 <a class="header-anchor" href="#一、promql核心概念与架构" aria-label="Permalink to &quot;一、PromQL核心概念与架构&quot;">​</a></h2><h3 id="_1-1-promql设计哲学" tabindex="-1">1.1 PromQL设计哲学 <a class="header-anchor" href="#_1-1-promql设计哲学" aria-label="Permalink to &quot;1.1 PromQL设计哲学&quot;">​</a></h3><p>PromQL是Prometheus的查询语言，专门设计用于：</p><ul><li><strong>多维数据筛选</strong>：基于标签系统的复杂过滤</li><li><strong>实时聚合</strong>：在查询时进行数据聚合</li><li><strong>数学运算</strong>：支持丰富的数学函数和运算符</li><li><strong>时间序列操作</strong>：专为时序数据优化的操作</li></ul><h3 id="_1-2-promql执行引擎架构" tabindex="-1">1.2 PromQL执行引擎架构 <a class="header-anchor" href="#_1-2-promql执行引擎架构" aria-label="Permalink to &quot;1.2 PromQL执行引擎架构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">用户查询 → 语法解析 → 查询优化 → 数据获取 → 执行计算 → 返回结果</span></span>
<span class="line"><span class="__shiki_wvjl67">           ↓          ↓          ↓          ↓          ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">        AST树     重写规则    TSDB查询   向量计算   格式化输出</span></span></code></pre></div><h2 id="二、数据类型与选择器" tabindex="-1">二、数据类型与选择器 <a class="header-anchor" href="#二、数据类型与选择器" aria-label="Permalink to &quot;二、数据类型与选择器&quot;">​</a></h2><h3 id="_2-1-四种核心数据类型" tabindex="-1">2.1 四种核心数据类型 <a class="header-anchor" href="#_2-1-四种核心数据类型" aria-label="Permalink to &quot;2.1 四种核心数据类型&quot;">​</a></h3><h4 id="_2-1-1-即时向量-instant-vector" tabindex="-1">2.1.1 即时向量（Instant Vector） <a class="header-anchor" href="#_2-1-1-即时向量-instant-vector" aria-label="Permalink to &quot;2.1.1 即时向量（Instant Vector）&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 单一时间点的所有序列值</span></span>
<span class="line"><span class="__shiki_140thh">http_requests_total{method</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;GET&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 结果示例</span></span>
<span class="line"><span class="__shiki_140thh">http_requests_total{method</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;GET&quot;</span><span class="__shiki_140thh">, handler</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/api&quot;</span><span class="__shiki_140thh">} </span><span class="__shiki_dzsirb">150</span><span class="__shiki_140thh"> @1641020400</span></span>
<span class="line"><span class="__shiki_140thh">http_requests_total{method</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;GET&quot;</span><span class="__shiki_140thh">, handler</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/home&quot;</span><span class="__shiki_140thh">} </span><span class="__shiki_dzsirb">230</span><span class="__shiki_140thh"> @1641020400</span></span></code></pre></div><h4 id="_2-1-2-范围向量-range-vector" tabindex="-1">2.1.2 范围向量（Range Vector） <a class="header-anchor" href="#_2-1-2-范围向量-range-vector" aria-label="Permalink to &quot;2.1.2 范围向量（Range Vector）&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 一段时间内的序列值</span></span>
<span class="line"><span class="__shiki_140thh">http_requests_total{method</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;GET&quot;</span><span class="__shiki_140thh">}[5m]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 结果示例（每个序列多个时间点）</span></span>
<span class="line"><span class="__shiki_140thh">http_requests_total{method</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;GET&quot;</span><span class="__shiki_140thh">, handler</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/api&quot;</span><span class="__shiki_140thh">} </span></span>
<span class="line"><span class="__shiki_dzsirb">  150</span><span class="__shiki_140thh"> @1641020400</span></span>
<span class="line"><span class="__shiki_dzsirb">  152</span><span class="__shiki_140thh"> @1641020460</span></span>
<span class="line"><span class="__shiki_dzsirb">  155</span><span class="__shiki_140thh"> @1641020520</span></span>
<span class="line"><span class="__shiki_dzsirb">  160</span><span class="__shiki_140thh"> @1641020580</span></span></code></pre></div><h4 id="_2-1-3-标量-scalar" tabindex="-1">2.1.3 标量（Scalar） <a class="header-anchor" href="#_2-1-3-标量-scalar" aria-label="Permalink to &quot;2.1.3 标量（Scalar）&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 单一数值</span></span>
<span class="line"><span class="__shiki_dzsirb">count</span><span class="__shiki_140thh">(http_requests_total)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 结果示例</span></span>
<span class="line"><span class="__shiki_dzsirb">42</span></span></code></pre></div><h4 id="_2-1-4-字符串-string" tabindex="-1">2.1.4 字符串（String） <a class="header-anchor" href="#_2-1-4-字符串-string" aria-label="Permalink to &quot;2.1.4 字符串（String）&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 字符串值（主要用于函数参数）</span></span>
<span class="line"><span class="__shiki_140thh">label_values(instance)</span></span></code></pre></div><h3 id="_2-2-选择器详解" tabindex="-1">2.2 选择器详解 <a class="header-anchor" href="#_2-2-选择器详解" aria-label="Permalink to &quot;2.2 选择器详解&quot;">​</a></h3><h4 id="_2-2-1-即时向量选择器" tabindex="-1">2.2.1 即时向量选择器 <a class="header-anchor" href="#_2-2-1-即时向量选择器" aria-label="Permalink to &quot;2.2.1 即时向量选择器&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 基础选择</span></span>
<span class="line"><span class="__shiki_140thh">up</span></span>
<span class="line"><span class="__shiki_140thh">node_cpu_seconds_total</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 标签过滤</span></span>
<span class="line"><span class="__shiki_140thh">up{job</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;prometheus&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">http_requests_total{</span><span class="__shiki_1itgoe">status!=</span><span class="__shiki_mdbnqw">&quot;200&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 正则匹配</span></span>
<span class="line"><span class="__shiki_140thh">http_requests_total{method</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">~</span><span class="__shiki_mdbnqw">&quot;GET|POST&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">http_requests_total{</span><span class="__shiki_1itgoe">status</span><span class="__shiki_140thh">!~</span><span class="__shiki_mdbnqw">&quot;4..|5..&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">http_requests_total{handler</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">~</span><span class="__shiki_mdbnqw">&quot;/api/.+&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 空值处理</span></span>
<span class="line"><span class="__shiki_140thh">http_requests_total{handler</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">}      # 标签值为空</span></span>
<span class="line"><span class="__shiki_140thh">http_requests_total{handler</span><span class="__shiki_1itgoe">!=</span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">}     # 标签值非空</span></span></code></pre></div><h4 id="_2-2-2-范围向量选择器" tabindex="-1">2.2.2 范围向量选择器 <a class="header-anchor" href="#_2-2-2-范围向量选择器" aria-label="Permalink to &quot;2.2.2 范围向量选择器&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 基础范围查询</span></span>
<span class="line"><span class="__shiki_140thh">http_requests_total[5m]</span></span>
<span class="line"><span class="__shiki_140thh">node_memory_usage_bytes[1h]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 时间单位</span></span>
<span class="line"><span class="__shiki_140thh">[5s]      # 5秒</span></span>
<span class="line"><span class="__shiki_140thh">[1m]      # 1分钟</span></span>
<span class="line"><span class="__shiki_140thh">[2h]      # 2小时</span></span>
<span class="line"><span class="__shiki_140thh">[1d]      # 1天</span></span>
<span class="line"><span class="__shiki_140thh">[1w]      # 1周</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 组合查询</span></span>
<span class="line"><span class="__shiki_140thh">rate(http_requests_total[5m])[1h:1m]  # 子查询</span></span></code></pre></div><h4 id="_2-2-3-偏移修饰器" tabindex="-1">2.2.3 偏移修饰器 <a class="header-anchor" href="#_2-2-3-偏移修饰器" aria-label="Permalink to &quot;2.2.3 偏移修饰器&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 相对时间偏移</span></span>
<span class="line"><span class="__shiki_140thh">http_requests_total offset 5m</span></span>
<span class="line"><span class="__shiki_140thh">sum_over_time(http_requests_total[1h] offset 1d)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 对比不同时间段</span></span>
<span class="line"><span class="__shiki_140thh">rate(http_requests_total[5m]) </span></span>
<span class="line"><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">rate(http_requests_total[5m] offset 1w)</span></span></code></pre></div><h2 id="三、操作符系统" tabindex="-1">三、操作符系统 <a class="header-anchor" href="#三、操作符系统" aria-label="Permalink to &quot;三、操作符系统&quot;">​</a></h2><h3 id="_3-1-算术运算符" tabindex="-1">3.1 算术运算符 <a class="header-anchor" href="#_3-1-算术运算符" aria-label="Permalink to &quot;3.1 算术运算符&quot;">​</a></h3><h4 id="_3-1-1-二元算术运算符" tabindex="-1">3.1.1 二元算术运算符 <a class="header-anchor" href="#_3-1-1-二元算术运算符" aria-label="Permalink to &quot;3.1.1 二元算术运算符&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 基本运算</span></span>
<span class="line"><span class="__shiki_140thh">metric_a </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> metric_b</span></span>
<span class="line"><span class="__shiki_140thh">metric_a </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> metric_b</span></span>
<span class="line"><span class="__shiki_140thh">metric_a </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> metric_b</span></span>
<span class="line"><span class="__shiki_140thh">metric_a </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> metric_b</span></span>
<span class="line"><span class="__shiki_140thh">metric_a % metric_b</span></span>
<span class="line"><span class="__shiki_140thh">metric_a ^ metric_b  # 幂运算</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 实际应用：计算内存使用率</span></span>
<span class="line"><span class="__shiki_140thh">(node_memory_total_bytes </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> node_memory_free_bytes) </span></span>
<span class="line"><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> node_memory_total_bytes </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span></span></code></pre></div><h4 id="_3-1-2-向量与标量运算" tabindex="-1">3.1.2 向量与标量运算 <a class="header-anchor" href="#_3-1-2-向量与标量运算" aria-label="Permalink to &quot;3.1.2 向量与标量运算&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 向量与标量</span></span>
<span class="line"><span class="__shiki_140thh">http_requests_total </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 2</span></span>
<span class="line"><span class="__shiki_140thh">node_memory_usage_bytes </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">  # 转换为MB</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 向量与向量（一对一匹配）</span></span>
<span class="line"><span class="__shiki_140thh">container_memory_usage_bytes{pod</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;a&quot;</span><span class="__shiki_140thh">} </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 2</span></span></code></pre></div><h4 id="_3-1-3-聚合后运算" tabindex="-1">3.1.3 聚合后运算 <a class="header-anchor" href="#_3-1-3-聚合后运算" aria-label="Permalink to &quot;3.1.3 聚合后运算&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 常见模式：先聚合后计算</span></span>
<span class="line"><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(http_requests_total) </span><span class="__shiki_1itgoe">by</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">service</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"><span class="__shiki_dzsirb">avg</span><span class="__shiki_140thh">(node_cpu_usage) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span></span></code></pre></div><h3 id="_3-2-比较运算符" tabindex="-1">3.2 比较运算符 <a class="header-anchor" href="#_3-2-比较运算符" aria-label="Permalink to &quot;3.2 比较运算符&quot;">​</a></h3><h4 id="_3-2-1-基本比较" tabindex="-1">3.2.1 基本比较 <a class="header-anchor" href="#_3-2-1-基本比较" aria-label="Permalink to &quot;3.2.1 基本比较&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 返回值过滤（返回值为真的序列）</span></span>
<span class="line"><span class="__shiki_140thh">http_requests_total </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"><span class="__shiki_140thh">node_memory_usage_bytes </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 8589934592</span><span class="__shiki_140thh">  # 8GB</span></span>
<span class="line"><span class="__shiki_140thh">up </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">up </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 布尔修饰符（返回0或1）</span></span>
<span class="line"><span class="__shiki_140thh">http_requests_total </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> bool </span><span class="__shiki_dzsirb">100</span></span></code></pre></div><h4 id="_3-2-2-向量匹配模式" tabindex="-1">3.2.2 向量匹配模式 <a class="header-anchor" href="#_3-2-2-向量匹配模式" aria-label="Permalink to &quot;3.2.2 向量匹配模式&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 一对一匹配（默认）</span></span>
<span class="line"><span class="__shiki_140thh">metric_a{label</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;x&quot;</span><span class="__shiki_140thh">} </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> metric_b{label</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;x&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 多对一</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">一对多</span></span>
<span class="line"><span class="__shiki_140thh">metric_a </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_140thh">(label) metric_b</span></span>
<span class="line"><span class="__shiki_140thh">metric_a </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> ignoring(label1, label2) metric_b</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 分组匹配</span></span>
<span class="line"><span class="__shiki_140thh">metric_a </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> group_left(additional_label) metric_b</span></span>
<span class="line"><span class="__shiki_140thh">metric_a </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> group_right(additional_label) metric_b</span></span></code></pre></div><h3 id="_3-3-逻辑-集合运算符" tabindex="-1">3.3 逻辑/集合运算符 <a class="header-anchor" href="#_3-3-逻辑-集合运算符" aria-label="Permalink to &quot;3.3 逻辑/集合运算符&quot;">​</a></h3><h4 id="_3-3-1-逻辑运算符" tabindex="-1">3.3.1 逻辑运算符 <a class="header-anchor" href="#_3-3-1-逻辑运算符" aria-label="Permalink to &quot;3.3.1 逻辑运算符&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># </span><span class="__shiki_1itgoe">and</span><span class="__shiki_140thh">（交集）</span></span>
<span class="line"><span class="__shiki_140thh">http_errors{</span><span class="__shiki_1itgoe">status=</span><span class="__shiki_mdbnqw">&quot;500&quot;</span><span class="__shiki_140thh">} </span><span class="__shiki_1itgoe">and</span><span class="__shiki_140thh"> http_requests_total{method</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;POST&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># </span><span class="__shiki_1itgoe">or</span><span class="__shiki_140thh">（并集）</span></span>
<span class="line"><span class="__shiki_140thh">up{job</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;api&quot;</span><span class="__shiki_140thh">} </span><span class="__shiki_1itgoe">or</span><span class="__shiki_140thh"> up{job</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;web&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># unless（补集）</span></span>
<span class="line"><span class="__shiki_140thh">http_requests_total{handler</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/api&quot;</span><span class="__shiki_140thh">} </span></span>
<span class="line"><span class="__shiki_140thh">unless http_requests_total{</span><span class="__shiki_1itgoe">status=</span><span class="__shiki_mdbnqw">&quot;200&quot;</span><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-3-2-集合运算符" tabindex="-1">3.3.2 集合运算符 <a class="header-anchor" href="#_3-3-2-集合运算符" aria-label="Permalink to &quot;3.3.2 集合运算符&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 实际应用：异常检测</span></span>
<span class="line"><span class="__shiki_140thh"># 找出返回500错误但之前正常的端点</span></span>
<span class="line"><span class="__shiki_140thh">http_requests_total{</span><span class="__shiki_1itgoe">status=</span><span class="__shiki_mdbnqw">&quot;500&quot;</span><span class="__shiki_140thh">} </span></span>
<span class="line"><span class="__shiki_1itgoe">and</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_140thh">(instance, handler) (</span></span>
<span class="line"><span class="__shiki_140thh">  http_requests_total{</span><span class="__shiki_1itgoe">status=</span><span class="__shiki_mdbnqw">&quot;200&quot;</span><span class="__shiki_140thh">} offset 5m</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h2 id="四、聚合操作" tabindex="-1">四、聚合操作 <a class="header-anchor" href="#四、聚合操作" aria-label="Permalink to &quot;四、聚合操作&quot;">​</a></h2><h3 id="_4-1-聚合函数" tabindex="-1">4.1 聚合函数 <a class="header-anchor" href="#_4-1-聚合函数" aria-label="Permalink to &quot;4.1 聚合函数&quot;">​</a></h3><h4 id="_4-1-1-基础聚合函数" tabindex="-1">4.1.1 基础聚合函数 <a class="header-anchor" href="#_4-1-1-基础聚合函数" aria-label="Permalink to &quot;4.1.1 基础聚合函数&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 求和</span></span>
<span class="line"><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(http_requests_total) </span><span class="__shiki_1itgoe">by</span><span class="__shiki_140thh"> (method, </span><span class="__shiki_1itgoe">status</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 平均值</span></span>
<span class="line"><span class="__shiki_dzsirb">avg</span><span class="__shiki_140thh">(node_cpu_usage) </span><span class="__shiki_1itgoe">by</span><span class="__shiki_140thh"> (instance)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 最大值</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">最小值</span></span>
<span class="line"><span class="__shiki_dzsirb">max</span><span class="__shiki_140thh">(container_memory_usage) </span><span class="__shiki_1itgoe">by</span><span class="__shiki_140thh"> (pod)</span></span>
<span class="line"><span class="__shiki_dzsirb">min</span><span class="__shiki_140thh">(temperature) </span><span class="__shiki_1itgoe">by</span><span class="__shiki_140thh"> (region)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 标准差和方差</span></span>
<span class="line"><span class="__shiki_140thh">stddev(http_request_duration_seconds) </span><span class="__shiki_1itgoe">by</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">service</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">stdvar(node_memory_usage_bytes) </span><span class="__shiki_1itgoe">by</span><span class="__shiki_140thh"> (instance)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 计数</span></span>
<span class="line"><span class="__shiki_dzsirb">count</span><span class="__shiki_140thh">(http_requests_total) </span><span class="__shiki_1itgoe">by</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">endpoint</span><span class="__shiki_140thh">)</span></span></code></pre></div><h4 id="_4-1-2-分位数聚合" tabindex="-1">4.1.2 分位数聚合 <a class="header-anchor" href="#_4-1-2-分位数聚合" aria-label="Permalink to &quot;4.1.2 分位数聚合&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 直方图分位数计算</span></span>
<span class="line"><span class="__shiki_140thh">histogram_quantile(</span></span>
<span class="line"><span class="__shiki_dzsirb">  0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">95</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">  sum</span><span class="__shiki_140thh">(rate(http_request_duration_seconds_bucket[5m])) </span></span>
<span class="line"><span class="__shiki_1itgoe">  by</span><span class="__shiki_140thh"> (le, </span><span class="__shiki_1itgoe">service</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 多个分位数</span></span>
<span class="line"><span class="__shiki_140thh">histogram_quantile(</span></span>
<span class="line"><span class="__shiki_dzsirb">  0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">  rate(http_request_duration_seconds_bucket[5m])</span></span>
<span class="line"><span class="__shiki_140thh">) </span></span>
<span class="line"><span class="__shiki_1itgoe">or</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">histogram_quantile(</span></span>
<span class="line"><span class="__shiki_dzsirb">  0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">99</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">  rate(http_request_duration_seconds_bucket[5m])</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_4-2-分组与聚合模式" tabindex="-1">4.2 分组与聚合模式 <a class="header-anchor" href="#_4-2-分组与聚合模式" aria-label="Permalink to &quot;4.2 分组与聚合模式&quot;">​</a></h3><h4 id="_4-2-1-by-子句分组" tabindex="-1">4.2.1 <code>by</code> 子句分组 <a class="header-anchor" href="#_4-2-1-by-子句分组" aria-label="Permalink to &quot;4.2.1 \`by\` 子句分组&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 按指定标签分组</span></span>
<span class="line"><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(http_requests_total) </span><span class="__shiki_1itgoe">by</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">service</span><span class="__shiki_140thh">, environment)</span></span>
<span class="line"><span class="__shiki_dzsirb">avg</span><span class="__shiki_140thh">(rate(http_requests_total[5m])) </span><span class="__shiki_1itgoe">by</span><span class="__shiki_140thh"> (status_code, method)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 嵌套聚合</span></span>
<span class="line"><span class="__shiki_dzsirb">max</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">  sum</span><span class="__shiki_140thh">(http_requests_total) </span><span class="__shiki_1itgoe">by</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">service</span><span class="__shiki_140thh">, instance)</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">by</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">service</span><span class="__shiki_140thh">)</span></span></code></pre></div><h4 id="_4-2-2-without-子句分组" tabindex="-1">4.2.2 <code>without</code> 子句分组 <a class="header-anchor" href="#_4-2-2-without-子句分组" aria-label="Permalink to &quot;4.2.2 \`without\` 子句分组&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 排除指定标签后分组</span></span>
<span class="line"><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(http_requests_total) </span><span class="__shiki_1itgoe">without</span><span class="__shiki_140thh"> (instance, pod)</span></span>
<span class="line"><span class="__shiki_dzsirb">avg</span><span class="__shiki_140thh">(node_cpu_usage) </span><span class="__shiki_1itgoe">without</span><span class="__shiki_140thh"> (cpu)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 与by的等价转换</span></span>
<span class="line"><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(metric) </span><span class="__shiki_1itgoe">by</span><span class="__shiki_140thh"> (a, b) </span></span>
<span class="line"><span class="__shiki_140thh">≡ </span></span>
<span class="line"><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(metric) </span><span class="__shiki_1itgoe">without</span><span class="__shiki_140thh"> (c, d, e)  # 假设总标签为{a,b,c,d,e}</span></span></code></pre></div><h4 id="_4-2-3-高级分组技巧" tabindex="-1">4.2.3 高级分组技巧 <a class="header-anchor" href="#_4-2-3-高级分组技巧" aria-label="Permalink to &quot;4.2.3 高级分组技巧&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 按标签前缀分组</span></span>
<span class="line"><span class="__shiki_140thh">sum </span><span class="__shiki_1itgoe">by</span><span class="__shiki_140thh"> (__name__)({__name__</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">~</span><span class="__shiki_mdbnqw">&quot;http_.+&quot;</span><span class="__shiki_140thh">})</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 动态分组</span></span>
<span class="line"><span class="__shiki_140thh">label_replace(</span></span>
<span class="line"><span class="__shiki_140thh">  sum </span><span class="__shiki_1itgoe">without</span><span class="__shiki_140thh"> (instance)(up), </span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;aggregated&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;true&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h2 id="五、函数库详解" tabindex="-1">五、函数库详解 <a class="header-anchor" href="#五、函数库详解" aria-label="Permalink to &quot;五、函数库详解&quot;">​</a></h2><h3 id="_5-1-时间序列处理函数" tabindex="-1">5.1 时间序列处理函数 <a class="header-anchor" href="#_5-1-时间序列处理函数" aria-label="Permalink to &quot;5.1 时间序列处理函数&quot;">​</a></h3><h4 id="_5-1-1-变化率函数" tabindex="-1">5.1.1 变化率函数 <a class="header-anchor" href="#_5-1-1-变化率函数" aria-label="Permalink to &quot;5.1.1 变化率函数&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># rate </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> 每秒平均增长率</span></span>
<span class="line"><span class="__shiki_140thh">rate(http_requests_total[5m])</span></span>
<span class="line"><span class="__shiki_140thh"># 计算原理：(v_now </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> v_before) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> time_range</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># irate </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> 瞬时增长率</span></span>
<span class="line"><span class="__shiki_140thh">irate(http_requests_total[2m])</span></span>
<span class="line"><span class="__shiki_140thh"># 使用最后两个样本计算，对突发变化更敏感</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># increase </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> 绝对增长量</span></span>
<span class="line"><span class="__shiki_140thh">increase(http_requests_total[1h])</span></span>
<span class="line"><span class="__shiki_140thh"># 等价于 rate() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1itgoe"> seconds</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 最佳实践对比</span></span>
<span class="line"><span class="__shiki_140thh">rate(http_requests_total[5m])     # 推荐：平滑，适合告警和面板</span></span>
<span class="line"><span class="__shiki_140thh">irate(http_requests_total[2m])    # 推荐：适合快速变化的图表</span></span></code></pre></div><h4 id="_5-1-2-时间窗口函数" tabindex="-1">5.1.2 时间窗口函数 <a class="header-anchor" href="#_5-1-2-时间窗口函数" aria-label="Permalink to &quot;5.1.2 时间窗口函数&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 时间段聚合</span></span>
<span class="line"><span class="__shiki_140thh">avg_over_time(metric[5m])        # 平均值</span></span>
<span class="line"><span class="__shiki_140thh">min_over_time(metric[1h])        # 最小值</span></span>
<span class="line"><span class="__shiki_140thh">max_over_time(metric[30m])       # 最大值</span></span>
<span class="line"><span class="__shiki_140thh">sum_over_time(metric[1d])        # 总和</span></span>
<span class="line"><span class="__shiki_140thh">count_over_time(metric[5m])      # 计数</span></span>
<span class="line"><span class="__shiki_140thh">quantile_over_time(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">95</span><span class="__shiki_140thh">, metric[5m])  # 分位数</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 标准差和方差</span></span>
<span class="line"><span class="__shiki_140thh">stddev_over_time(metric[10m])</span></span>
<span class="line"><span class="__shiki_140thh">stdvar_over_time(metric[10m])</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 实际应用：滑动窗口统计</span></span>
<span class="line"><span class="__shiki_140thh">avg_over_time(</span></span>
<span class="line"><span class="__shiki_140thh">  rate(http_requests_total[2m])[10m:]</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h4 id="_5-1-3-变化检测函数" tabindex="-1">5.1.3 变化检测函数 <a class="header-anchor" href="#_5-1-3-变化检测函数" aria-label="Permalink to &quot;5.1.3 变化检测函数&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 差值计算</span></span>
<span class="line"><span class="__shiki_140thh">delta(node_temperature[2h])      # 一段时间内的变化量</span></span>
<span class="line"><span class="__shiki_140thh">idelta(node_temperature[5m])     # 最后两个样本的差值</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 导数计算</span></span>
<span class="line"><span class="__shiki_140thh">deriv(node_temperature[10m])     # 每秒变化率</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 预测函数</span></span>
<span class="line"><span class="__shiki_140thh">predict_linear(node_disk_free[6h], </span><span class="__shiki_dzsirb">3600</span><span class="__shiki_140thh">)  # 预测1小时后</span></span></code></pre></div><h3 id="_5-2-标签操作函数" tabindex="-1">5.2 标签操作函数 <a class="header-anchor" href="#_5-2-标签操作函数" aria-label="Permalink to &quot;5.2 标签操作函数&quot;">​</a></h3><h4 id="_5-2-1-标签修改函数" tabindex="-1">5.2.1 标签修改函数 <a class="header-anchor" href="#_5-2-1-标签修改函数" aria-label="Permalink to &quot;5.2.1 标签修改函数&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 标签替换</span></span>
<span class="line"><span class="__shiki_140thh">label_replace(</span></span>
<span class="line"><span class="__shiki_140thh">  http_requests_total,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;service&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;$1&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;handler&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;/api/(.*)&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 标签连接</span></span>
<span class="line"><span class="__shiki_140thh">label_join(</span></span>
<span class="line"><span class="__shiki_140thh">  node_network_receive_bytes_total,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;interface_ip&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;,&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;device&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;address&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 标签提取</span></span>
<span class="line"><span class="__shiki_140thh">label_extract(metric, </span><span class="__shiki_mdbnqw">&quot;label_name&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;regex&quot;</span><span class="__shiki_140thh">)</span></span></code></pre></div><h4 id="_5-2-2-指标名称函数" tabindex="-1">5.2.2 指标名称函数 <a class="header-anchor" href="#_5-2-2-指标名称函数" aria-label="Permalink to &quot;5.2.2 指标名称函数&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 名称相关</span></span>
<span class="line"><span class="__shiki_140thh">label_replace(metric, </span><span class="__shiki_mdbnqw">&quot;__name__&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;new_name&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 实际应用：重命名指标</span></span>
<span class="line"><span class="__shiki_140thh">label_replace(</span></span>
<span class="line"><span class="__shiki_140thh">  node_cpu_seconds_total,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;__name__&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;cpu_usage&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;__name__&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;node_cpu_seconds_total&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_5-3-数学函数" tabindex="-1">5.3 数学函数 <a class="header-anchor" href="#_5-3-数学函数" aria-label="Permalink to &quot;5.3 数学函数&quot;">​</a></h3><h4 id="_5-3-1-基础数学函数" tabindex="-1">5.3.1 基础数学函数 <a class="header-anchor" href="#_5-3-1-基础数学函数" aria-label="Permalink to &quot;5.3.1 基础数学函数&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 舍入函数</span></span>
<span class="line"><span class="__shiki_dzsirb">floor</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">avg</span><span class="__shiki_140thh">(metric))      # 向下取整</span></span>
<span class="line"><span class="__shiki_140thh">ceil(</span><span class="__shiki_dzsirb">avg</span><span class="__shiki_140thh">(metric))       # 向上取整</span></span>
<span class="line"><span class="__shiki_dzsirb">round</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">avg</span><span class="__shiki_140thh">(metric))      # 四舍五入</span></span>
<span class="line"><span class="__shiki_dzsirb">round</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">avg</span><span class="__shiki_140thh">(metric), </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) # 指定精度</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 其他数学函数</span></span>
<span class="line"><span class="__shiki_dzsirb">abs</span><span class="__shiki_140thh">(temperature </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 20</span><span class="__shiki_140thh">)   # 绝对值</span></span>
<span class="line"><span class="__shiki_dzsirb">sqrt</span><span class="__shiki_140thh">(area)              # 平方根</span></span>
<span class="line"><span class="__shiki_dzsirb">exp</span><span class="__shiki_140thh">(growth_rate)        # 指数</span></span>
<span class="line"><span class="__shiki_140thh">ln(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">)               # 自然对数</span></span>
<span class="line"><span class="__shiki_140thh">log2(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">)             # 以2为底对数</span></span>
<span class="line"><span class="__shiki_dzsirb">log10</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">)            # 以10为底对数</span></span></code></pre></div><h4 id="_5-3-2-限制函数" tabindex="-1">5.3.2 限制函数 <a class="header-anchor" href="#_5-3-2-限制函数" aria-label="Permalink to &quot;5.3.2 限制函数&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 钳制函数</span></span>
<span class="line"><span class="__shiki_140thh">clamp_min(metric, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)     # 最小值限制</span></span>
<span class="line"><span class="__shiki_140thh">clamp_max(metric, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)   # 最大值限制</span></span>
<span class="line"><span class="__shiki_140thh">clamp(metric, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)    # 范围限制</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 实际应用：确保值在合理范围</span></span>
<span class="line"><span class="__shiki_140thh">clamp(</span></span>
<span class="line"><span class="__shiki_140thh">  node_memory_usage_percent,</span></span>
<span class="line"><span class="__shiki_dzsirb">  0</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">  100</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_5-4-特殊函数" tabindex="-1">5.4 特殊函数 <a class="header-anchor" href="#_5-4-特殊函数" aria-label="Permalink to &quot;5.4 特殊函数&quot;">​</a></h3><h4 id="_5-4-1-时间函数" tabindex="-1">5.4.1 时间函数 <a class="header-anchor" href="#_5-4-1-时间函数" aria-label="Permalink to &quot;5.4.1 时间函数&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 获取时间</span></span>
<span class="line"><span class="__shiki_1itgoe">time</span><span class="__shiki_140thh">()                    # 当前Unix时间戳</span></span>
<span class="line"><span class="__shiki_1itgoe">timestamp</span><span class="__shiki_140thh">(metric)         # 样本时间戳</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 时间运算</span></span>
<span class="line"><span class="__shiki_140thh">metric </span><span class="__shiki_1itgoe">and</span><span class="__shiki_1itgoe"> hour</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 8</span><span class="__shiki_1itgoe"> and</span><span class="__shiki_1itgoe"> hour</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 18</span><span class="__shiki_140thh">  # 工作时间段</span></span></code></pre></div><h4 id="_5-4-2-缺失数据处理" tabindex="-1">5.4.2 缺失数据处理 <a class="header-anchor" href="#_5-4-2-缺失数据处理" aria-label="Permalink to &quot;5.4.2 缺失数据处理&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 默认值</span></span>
<span class="line"><span class="__shiki_140thh">vector(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)                 # 标量0</span></span>
<span class="line"><span class="__shiki_1itgoe">scalar</span><span class="__shiki_140thh">(vector(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">))         # 转换为标量</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 缺失值处理</span></span>
<span class="line"><span class="__shiki_140thh">up </span><span class="__shiki_1itgoe">or</span><span class="__shiki_140thh"> vector(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)           # 为缺失指标提供默认值</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 实际应用：填充断线时间</span></span>
<span class="line"><span class="__shiki_140thh">up </span><span class="__shiki_1itgoe">or</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_140thh">() vector(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span></code></pre></div><h2 id="六、高级查询模式" tabindex="-1">六、高级查询模式 <a class="header-anchor" href="#六、高级查询模式" aria-label="Permalink to &quot;六、高级查询模式&quot;">​</a></h2><h3 id="_6-1-子查询" tabindex="-1">6.1 子查询 <a class="header-anchor" href="#_6-1-子查询" aria-label="Permalink to &quot;6.1 子查询&quot;">​</a></h3><h4 id="_6-1-1-子查询语法" tabindex="-1">6.1.1 子查询语法 <a class="header-anchor" href="#_6-1-1-子查询语法" aria-label="Permalink to &quot;6.1.1 子查询语法&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">&lt;function&gt;</span><span class="__shiki_140thh">([&lt;range&gt;:[&lt;resolution&gt;]])</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># resolution为空：使用全局分辨率</span></span>
<span class="line"><span class="__shiki_140thh"># resolution指定：子查询间隔</span></span></code></pre></div><h4 id="_6-1-2-实际应用" tabindex="-1">6.1.2 实际应用 <a class="header-anchor" href="#_6-1-2-实际应用" aria-label="Permalink to &quot;6.1.2 实际应用&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 计算最近30分钟内每5分钟的最大请求率</span></span>
<span class="line"><span class="__shiki_140thh">max_over_time(</span></span>
<span class="line"><span class="__shiki_140thh">  rate(http_requests_total[5m])[30m:5m]</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 计算每小时平均的5分钟速率</span></span>
<span class="line"><span class="__shiki_140thh">avg_over_time(</span></span>
<span class="line"><span class="__shiki_140thh">  rate(http_requests_total[5m])[1h:1m]</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 高基数时间序列的降采样</span></span>
<span class="line"><span class="__shiki_140thh">avg_over_time(</span></span>
<span class="line"><span class="__shiki_140thh">  high_cardinality_metric[1h:5m]</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_6-2-递归查询" tabindex="-1">6.2 递归查询 <a class="header-anchor" href="#_6-2-递归查询" aria-label="Permalink to &quot;6.2 递归查询&quot;">​</a></h3><h4 id="_6-2-1-自引用查询" tabindex="-1">6.2.1 自引用查询 <a class="header-anchor" href="#_6-2-1-自引用查询" aria-label="Permalink to &quot;6.2.1 自引用查询&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 计算增长率的变化率</span></span>
<span class="line"><span class="__shiki_140thh">deriv(</span></span>
<span class="line"><span class="__shiki_140thh">  rate(metric[5m])[10m:]</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 复合窗口计算</span></span>
<span class="line"><span class="__shiki_140thh">avg_over_time(</span></span>
<span class="line"><span class="__shiki_140thh">  stddev_over_time(metric[5m])[1h:]</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_6-3-查询优化模式" tabindex="-1">6.3 查询优化模式 <a class="header-anchor" href="#_6-3-查询优化模式" aria-label="Permalink to &quot;6.3 查询优化模式&quot;">​</a></h3><h4 id="_6-3-1-减少基数" tabindex="-1">6.3.1 减少基数 <a class="header-anchor" href="#_6-3-1-减少基数" aria-label="Permalink to &quot;6.3.1 减少基数&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 错误：高基数查询</span></span>
<span class="line"><span class="__shiki_140thh">sum </span><span class="__shiki_1itgoe">by</span><span class="__shiki_140thh"> (instance, pod, container) (metric)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 正确：聚合后分组</span></span>
<span class="line"><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(metric) </span><span class="__shiki_1itgoe">by</span><span class="__shiki_140thh"> (instance)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 使用过滤减少数据量</span></span>
<span class="line"><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(metric{environment</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;production&quot;</span><span class="__shiki_140thh">}) </span><span class="__shiki_1itgoe">by</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">service</span><span class="__shiki_140thh">)</span></span></code></pre></div><h4 id="_6-3-2-避免笛卡尔积" tabindex="-1">6.3.2 避免笛卡尔积 <a class="header-anchor" href="#_6-3-2-避免笛卡尔积" aria-label="Permalink to &quot;6.3.2 避免笛卡尔积&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 危险：可能导致笛卡尔积</span></span>
<span class="line"><span class="__shiki_140thh">metric_a </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> metric_b</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 安全：使用匹配标签</span></span>
<span class="line"><span class="__shiki_140thh">metric_a </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_140thh">(common_label) metric_b</span></span></code></pre></div><h2 id="七、实际场景查询示例" tabindex="-1">七、实际场景查询示例 <a class="header-anchor" href="#七、实际场景查询示例" aria-label="Permalink to &quot;七、实际场景查询示例&quot;">​</a></h2><h3 id="_7-1-基础设施监控" tabindex="-1">7.1 基础设施监控 <a class="header-anchor" href="#_7-1-基础设施监控" aria-label="Permalink to &quot;7.1 基础设施监控&quot;">​</a></h3><h4 id="_7-1-1-系统资源" tabindex="-1">7.1.1 系统资源 <a class="header-anchor" href="#_7-1-1-系统资源" aria-label="Permalink to &quot;7.1.1 系统资源&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># CPU使用率</span></span>
<span class="line"><span class="__shiki_dzsirb">100</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">  avg</span><span class="__shiki_140thh">(rate(node_cpu_seconds_total{mode</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;idle&quot;</span><span class="__shiki_140thh">}[5m])) </span></span>
<span class="line"><span class="__shiki_1itgoe">  by</span><span class="__shiki_140thh"> (instance) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 内存使用率</span></span>
<span class="line"><span class="__shiki_140thh">(node_memory_MemTotal_bytes </span></span>
<span class="line"><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> node_memory_MemFree_bytes </span></span>
<span class="line"><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> node_memory_Buffers_bytes </span></span>
<span class="line"><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> node_memory_Cached_bytes) </span></span>
<span class="line"><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> node_memory_MemTotal_bytes </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 磁盘使用率</span></span>
<span class="line"><span class="__shiki_dzsirb">100</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">  1</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> node_filesystem_free_bytes{mountpoint</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/&quot;</span><span class="__shiki_140thh">} </span></span>
<span class="line"><span class="__shiki_1itgoe">  /</span><span class="__shiki_140thh"> node_filesystem_size_bytes{mountpoint</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 网络流量</span></span>
<span class="line"><span class="__shiki_140thh">rate(node_network_receive_bytes_total[5m]) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 8</span><span class="__shiki_140thh">  # 转换为bps</span></span></code></pre></div><h4 id="_7-1-2-容器监控" tabindex="-1">7.1.2 容器监控 <a class="header-anchor" href="#_7-1-2-容器监控" aria-label="Permalink to &quot;7.1.2 容器监控&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 容器内存限制使用率</span></span>
<span class="line"><span class="__shiki_140thh">container_memory_usage_bytes </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> container_spec_memory_limit_bytes </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 容器重启次数</span></span>
<span class="line"><span class="__shiki_140thh">increase(kube_pod_container_status_restarts_total[1h])</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># Pod资源请求与使用对比</span></span>
<span class="line"><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(kube_pod_container_resource_requests{</span><span class="__shiki_1itgoe">resource=</span><span class="__shiki_mdbnqw">&quot;memory&quot;</span><span class="__shiki_140thh">}) </span><span class="__shiki_1itgoe">by</span><span class="__shiki_140thh"> (pod)</span></span>
<span class="line"><span class="__shiki_140thh">vs</span></span>
<span class="line"><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(container_memory_usage_bytes) </span><span class="__shiki_1itgoe">by</span><span class="__shiki_140thh"> (pod)</span></span></code></pre></div><h3 id="_7-2-应用性能监控" tabindex="-1">7.2 应用性能监控 <a class="header-anchor" href="#_7-2-应用性能监控" aria-label="Permalink to &quot;7.2 应用性能监控&quot;">​</a></h3><h4 id="_7-2-1-http服务监控" tabindex="-1">7.2.1 HTTP服务监控 <a class="header-anchor" href="#_7-2-1-http服务监控" aria-label="Permalink to &quot;7.2.1 HTTP服务监控&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 请求速率</span></span>
<span class="line"><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(rate(http_requests_total[5m])) </span><span class="__shiki_1itgoe">by</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">service</span><span class="__shiki_140thh">, method, </span><span class="__shiki_1itgoe">status</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 错误率</span></span>
<span class="line"><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(rate(http_requests_total{</span><span class="__shiki_1itgoe">status=</span><span class="__shiki_140thh">~</span><span class="__shiki_mdbnqw">&quot;5..&quot;</span><span class="__shiki_140thh">}[5m])) </span><span class="__shiki_1itgoe">by</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">service</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">/</span></span>
<span class="line"><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(rate(http_requests_total[5m])) </span><span class="__shiki_1itgoe">by</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">service</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 延迟分布</span></span>
<span class="line"><span class="__shiki_140thh">histogram_quantile(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">95</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">  sum</span><span class="__shiki_140thh">(rate(http_request_duration_seconds_bucket[5m])) </span></span>
<span class="line"><span class="__shiki_1itgoe">  by</span><span class="__shiki_140thh"> (le, </span><span class="__shiki_1itgoe">service</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># Apdex分数</span></span>
<span class="line"><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">  sum</span><span class="__shiki_140thh">(rate(http_request_duration_seconds_bucket{le</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;0.1&quot;</span><span class="__shiki_140thh">}[5m])) </span></span>
<span class="line"><span class="__shiki_1itgoe">  +</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">  sum</span><span class="__shiki_140thh">(rate(http_request_duration_seconds_bucket{le</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;0.5&quot;</span><span class="__shiki_140thh">}[5m])) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 2</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">/</span></span>
<span class="line"><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(rate(http_request_duration_seconds_count[5m]))</span></span></code></pre></div><h4 id="_7-2-2-数据库监控" tabindex="-1">7.2.2 数据库监控 <a class="header-anchor" href="#_7-2-2-数据库监控" aria-label="Permalink to &quot;7.2.2 数据库监控&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 查询性能</span></span>
<span class="line"><span class="__shiki_140thh">rate(pg_stat_database_xact_commit[5m])</span></span>
<span class="line"><span class="__shiki_140thh">rate(pg_stat_database_tup_returned[5m])</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 连接池</span></span>
<span class="line"><span class="__shiki_140thh">pg_stat_activity_count{</span><span class="__shiki_1itgoe">state=</span><span class="__shiki_mdbnqw">&quot;active&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">pg_settings_max_connections </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 缓存命中率</span></span>
<span class="line"><span class="__shiki_140thh">pg_stat_database_blks_hit </span></span>
<span class="line"><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">(pg_stat_database_blks_hit </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> pg_stat_database_blks_read) </span></span>
<span class="line"><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span></span></code></pre></div><h3 id="_7-3-业务指标监控" tabindex="-1">7.3 业务指标监控 <a class="header-anchor" href="#_7-3-业务指标监控" aria-label="Permalink to &quot;7.3 业务指标监控&quot;">​</a></h3><h4 id="_7-3-1-电子商务" tabindex="-1">7.3.1 电子商务 <a class="header-anchor" href="#_7-3-1-电子商务" aria-label="Permalink to &quot;7.3.1 电子商务&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 订单相关</span></span>
<span class="line"><span class="__shiki_140thh">rate(order_created_total[5m])</span></span>
<span class="line"><span class="__shiki_140thh">rate(payment_success_total[5m])</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 转化率</span></span>
<span class="line"><span class="__shiki_140thh">rate(order_created_total[1h]) </span></span>
<span class="line"><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">rate(user_session_started_total[1h]) </span></span>
<span class="line"><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 平均订单价值</span></span>
<span class="line"><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(payment_amount_total) </span></span>
<span class="line"><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(order_created_total)</span></span></code></pre></div><h4 id="_7-3-2-用户行为" tabindex="-1">7.3.2 用户行为 <a class="header-anchor" href="#_7-3-2-用户行为" aria-label="Permalink to &quot;7.3.2 用户行为&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># DAU</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">WAU</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">MAU</span></span>
<span class="line"><span class="__shiki_dzsirb">count</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">  sum </span><span class="__shiki_1itgoe">by</span><span class="__shiki_140thh"> (user_id) (</span></span>
<span class="line"><span class="__shiki_140thh">    rate(user_activity_total[1d])</span></span>
<span class="line"><span class="__shiki_140thh">  ) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 留存率</span></span>
<span class="line"><span class="__shiki_dzsirb">count</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">  user_activity_total{</span><span class="__shiki_1itgoe">day=</span><span class="__shiki_mdbnqw">&quot;0&quot;</span><span class="__shiki_140thh">} </span></span>
<span class="line"><span class="__shiki_1itgoe">  and</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">  user_activity_total{</span><span class="__shiki_1itgoe">day=</span><span class="__shiki_mdbnqw">&quot;7&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">) </span></span>
<span class="line"><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">count</span><span class="__shiki_140thh">(user_activity_total{</span><span class="__shiki_1itgoe">day=</span><span class="__shiki_mdbnqw">&quot;0&quot;</span><span class="__shiki_140thh">}) </span></span>
<span class="line"><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span></span></code></pre></div><h2 id="八、性能优化与最佳实践" tabindex="-1">八、性能优化与最佳实践 <a class="header-anchor" href="#八、性能优化与最佳实践" aria-label="Permalink to &quot;八、性能优化与最佳实践&quot;">​</a></h2><h3 id="_8-1-查询性能优化" tabindex="-1">8.1 查询性能优化 <a class="header-anchor" href="#_8-1-查询性能优化" aria-label="Permalink to &quot;8.1 查询性能优化&quot;">​</a></h3><h4 id="_8-1-1-减少数据扫描" tabindex="-1">8.1.1 减少数据扫描 <a class="header-anchor" href="#_8-1-1-减少数据扫描" aria-label="Permalink to &quot;8.1.1 减少数据扫描&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 优化前：全量扫描</span></span>
<span class="line"><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(http_requests_total)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 优化后：时间范围限制</span></span>
<span class="line"><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(http_requests_total{_interval</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;5m&quot;</span><span class="__shiki_140thh">})</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 优化后：标签过滤</span></span>
<span class="line"><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(http_requests_total{</span><span class="__shiki_1itgoe">service=</span><span class="__shiki_mdbnqw">&quot;api&quot;</span><span class="__shiki_140thh">})</span></span></code></pre></div><h4 id="_8-1-2-合理使用范围向量" tabindex="-1">8.1.2 合理使用范围向量 <a class="header-anchor" href="#_8-1-2-合理使用范围向量" aria-label="Permalink to &quot;8.1.2 合理使用范围向量&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 选择合适的时间窗口</span></span>
<span class="line"><span class="__shiki_140thh">rate(metric[1m])     # 高频指标</span></span>
<span class="line"><span class="__shiki_140thh">rate(metric[5m])     # 一般指标  </span></span>
<span class="line"><span class="__shiki_140thh">rate(metric[15m])    # 低频指标</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 避免过长范围</span></span>
<span class="line"><span class="__shiki_140thh">rate(metric[1h])     # 可能内存消耗大</span></span></code></pre></div><h4 id="_8-1-3-聚合优化" tabindex="-1">8.1.3 聚合优化 <a class="header-anchor" href="#_8-1-3-聚合优化" aria-label="Permalink to &quot;8.1.3 聚合优化&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 聚合前过滤</span></span>
<span class="line"><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(rate(metric{label</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;value&quot;</span><span class="__shiki_140thh">}[5m]))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 使用子查询降采样</span></span>
<span class="line"><span class="__shiki_140thh">avg_over_time(</span></span>
<span class="line"><span class="__shiki_dzsirb">  sum</span><span class="__shiki_140thh">(metric)[1h:5m]</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_8-2-查询编写规范" tabindex="-1">8.2 查询编写规范 <a class="header-anchor" href="#_8-2-查询编写规范" aria-label="Permalink to &quot;8.2 查询编写规范&quot;">​</a></h3><h4 id="_8-2-1-可读性规范" tabindex="-1">8.2.1 可读性规范 <a class="header-anchor" href="#_8-2-1-可读性规范" aria-label="Permalink to &quot;8.2.1 可读性规范&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 使用注释</span></span>
<span class="line"><span class="__shiki_140thh"># 计算API错误率</span></span>
<span class="line"><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">  sum</span><span class="__shiki_140thh">(rate(http_requests_total{</span><span class="__shiki_1itgoe">status=</span><span class="__shiki_140thh">~</span><span class="__shiki_mdbnqw">&quot;5..&quot;</span><span class="__shiki_140thh">}[5m])) </span></span>
<span class="line"><span class="__shiki_1itgoe">  by</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">service</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">  /</span></span>
<span class="line"><span class="__shiki_dzsirb">  sum</span><span class="__shiki_140thh">(rate(http_requests_total[5m])) </span></span>
<span class="line"><span class="__shiki_1itgoe">  by</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">service</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">  *</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">  # 错误率超过5%</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 格式化复杂查询</span></span>
<span class="line"><span class="__shiki_140thh">histogram_quantile(</span></span>
<span class="line"><span class="__shiki_dzsirb">  0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">95</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  sum </span><span class="__shiki_1itgoe">by</span><span class="__shiki_140thh">(le, </span><span class="__shiki_1itgoe">service</span><span class="__shiki_140thh">) (</span></span>
<span class="line"><span class="__shiki_140thh">    rate(</span></span>
<span class="line"><span class="__shiki_140thh">      http_request_duration_seconds_bucket[5m]</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">  )</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h4 id="_8-2-2-错误处理" tabindex="-1">8.2.2 错误处理 <a class="header-anchor" href="#_8-2-2-错误处理" aria-label="Permalink to &quot;8.2.2 错误处理&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 处理除零错误</span></span>
<span class="line"><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">  sum</span><span class="__shiki_140thh">(rate(errors_total[5m]))</span></span>
<span class="line"><span class="__shiki_1itgoe">  /</span></span>
<span class="line"><span class="__shiki_140thh">  (</span><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(rate(requests_total[5m])) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 处理缺失数据</span></span>
<span class="line"><span class="__shiki_140thh">up{job</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;service&quot;</span><span class="__shiki_140thh">} </span><span class="__shiki_1itgoe">or</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_140thh">() vector(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_8-3-监控查询性能" tabindex="-1">8.3 监控查询性能 <a class="header-anchor" href="#_8-3-监控查询性能" aria-label="Permalink to &quot;8.3 监控查询性能&quot;">​</a></h3><h4 id="_8-3-1-prometheus自身监控" tabindex="-1">8.3.1 Prometheus自身监控 <a class="header-anchor" href="#_8-3-1-prometheus自身监控" aria-label="Permalink to &quot;8.3.1 Prometheus自身监控&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 查询延迟</span></span>
<span class="line"><span class="__shiki_140thh">prometheus_engine_query_duration_seconds</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 内存使用</span></span>
<span class="line"><span class="__shiki_140thh">process_resident_memory_bytes</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 抓取性能</span></span>
<span class="line"><span class="__shiki_140thh">prometheus_target_interval_length_seconds</span></span></code></pre></div><h2 id="九、调试与故障排除" tabindex="-1">九、调试与故障排除 <a class="header-anchor" href="#九、调试与故障排除" aria-label="Permalink to &quot;九、调试与故障排除&quot;">​</a></h2><h3 id="_9-1-查询调试技巧" tabindex="-1">9.1 查询调试技巧 <a class="header-anchor" href="#_9-1-查询调试技巧" aria-label="Permalink to &quot;9.1 查询调试技巧&quot;">​</a></h3><h4 id="_9-1-1-逐步调试法" tabindex="-1">9.1.1 逐步调试法 <a class="header-anchor" href="#_9-1-1-逐步调试法" aria-label="Permalink to &quot;9.1.1 逐步调试法&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 步骤1：确认指标存在</span></span>
<span class="line"><span class="__shiki_140thh">http_requests_total</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 步骤2：添加标签过滤</span></span>
<span class="line"><span class="__shiki_140thh">http_requests_total{method</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;GET&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 步骤3：计算速率</span></span>
<span class="line"><span class="__shiki_140thh">rate(http_requests_total{method</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;GET&quot;</span><span class="__shiki_140thh">}[5m])</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 步骤4：聚合</span></span>
<span class="line"><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(rate(http_requests_total{method</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;GET&quot;</span><span class="__shiki_140thh">}[5m])) </span><span class="__shiki_1itgoe">by</span><span class="__shiki_140thh"> (handler)</span></span></code></pre></div><h4 id="_9-1-2-数据采样检查" tabindex="-1">9.1.2 数据采样检查 <a class="header-anchor" href="#_9-1-2-数据采样检查" aria-label="Permalink to &quot;9.1.2 数据采样检查&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 检查原始数据</span></span>
<span class="line"><span class="__shiki_140thh">http_requests_total[5m]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 检查标签值</span></span>
<span class="line"><span class="__shiki_140thh">label_values(http_requests_total, </span><span class="__shiki_1itgoe">status</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 检查时间范围</span></span>
<span class="line"><span class="__shiki_140thh">http_requests_total offset 1h</span></span></code></pre></div><h3 id="_9-2-常见问题解决" tabindex="-1">9.2 常见问题解决 <a class="header-anchor" href="#_9-2-常见问题解决" aria-label="Permalink to &quot;9.2 常见问题解决&quot;">​</a></h3><h4 id="_9-2-1-无数据返回" tabindex="-1">9.2.1 无数据返回 <a class="header-anchor" href="#_9-2-1-无数据返回" aria-label="Permalink to &quot;9.2.1 无数据返回&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 检查指标是否存在</span></span>
<span class="line"><span class="__shiki_dzsirb">count</span><span class="__shiki_140thh">(http_requests_total)  # 返回0表示不存在</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 检查时间范围</span></span>
<span class="line"><span class="__shiki_140thh">http_requests_total[10m]  # 缩短范围</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 检查标签拼写</span></span>
<span class="line"><span class="__shiki_140thh">http_requests_total{method</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;GET&quot;</span><span class="__shiki_140thh">}  # 注意大小写</span></span></code></pre></div><h4 id="_9-2-2-数据异常" tabindex="-1">9.2.2 数据异常 <a class="header-anchor" href="#_9-2-2-数据异常" aria-label="Permalink to &quot;9.2.2 数据异常&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 检查计数器重置</span></span>
<span class="line"><span class="__shiki_140thh">increase(http_requests_total[1h]) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 检查数据间断</span></span>
<span class="line"><span class="__shiki_140thh">count_over_time(metric[5m]) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 检查标签基数</span></span>
<span class="line"><span class="__shiki_dzsirb">count</span><span class="__shiki_140thh">(count </span><span class="__shiki_1itgoe">by</span><span class="__shiki_140thh"> (label) (metric))</span></span></code></pre></div><h2 id="十、promql与可视化集成" tabindex="-1">十、PromQL与可视化集成 <a class="header-anchor" href="#十、promql与可视化集成" aria-label="Permalink to &quot;十、PromQL与可视化集成&quot;">​</a></h2><h3 id="_10-1-grafana集成" tabindex="-1">10.1 Grafana集成 <a class="header-anchor" href="#_10-1-grafana集成" aria-label="Permalink to &quot;10.1 Grafana集成&quot;">​</a></h3><h4 id="_10-1-1-grafana面板查询" tabindex="-1">10.1.1 Grafana面板查询 <a class="header-anchor" href="#_10-1-1-grafana面板查询" aria-label="Permalink to &quot;10.1.1 Grafana面板查询&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 时间序列面板</span></span>
<span class="line"><span class="__shiki_140thh">rate(node_cpu_seconds_total{mode</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;idle&quot;</span><span class="__shiki_140thh">}[$__interval])</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 状态面板</span></span>
<span class="line"><span class="__shiki_140thh">up{instance</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">~</span><span class="__shiki_mdbnqw">&quot;$instance&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 表格面板</span></span>
<span class="line"><span class="__shiki_140thh">sort_desc(</span><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(rate(http_requests_total[5m])) </span><span class="__shiki_1itgoe">by</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">service</span><span class="__shiki_140thh">))</span></span></code></pre></div><h4 id="_10-1-2-变量使用" tabindex="-1">10.1.2 变量使用 <a class="header-anchor" href="#_10-1-2-变量使用" aria-label="Permalink to &quot;10.1.2 变量使用&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 标签值变量</span></span>
<span class="line"><span class="__shiki_140thh">label_values(node_cpu_seconds_total, instance)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 查询变量</span></span>
<span class="line"><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(rate(http_requests_total[5m])) </span><span class="__shiki_1itgoe">by</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">service</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 自定义变量</span></span>
<span class="line"><span class="__shiki_140thh">label_values(up{job</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">~</span><span class="__shiki_mdbnqw">&quot;$job&quot;</span><span class="__shiki_140thh">}, instance)</span></span></code></pre></div><h3 id="_10-2-告警规则编写" tabindex="-1">10.2 告警规则编写 <a class="header-anchor" href="#_10-2-告警规则编写" aria-label="Permalink to &quot;10.2 告警规则编写&quot;">​</a></h3><h4 id="_10-2-1-基础告警" tabindex="-1">10.2.1 基础告警 <a class="header-anchor" href="#_10-2-1-基础告警" aria-label="Permalink to &quot;10.2.1 基础告警&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">groups</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">example</span></span>
<span class="line"><span class="__shiki_17hn0y">    rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HighErrorRate</span></span>
<span class="line"><span class="__shiki_17hn0y">        expr</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          (</span></span>
<span class="line"><span class="__shiki_mdbnqw">            sum(rate(http_requests_total{status=~&quot;5..&quot;}[5m])) </span></span>
<span class="line"><span class="__shiki_mdbnqw">            by (service)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            /</span></span>
<span class="line"><span class="__shiki_mdbnqw">            sum(rate(http_requests_total[5m])) </span></span>
<span class="line"><span class="__shiki_mdbnqw">            by (service)</span></span>
<span class="line"><span class="__shiki_mdbnqw">          ) * 100 &gt; 5</span></span>
<span class="line"><span class="__shiki_17hn0y">        for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">        labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">critical</span></span>
<span class="line"><span class="__shiki_17hn0y">        annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;服务 {{ $labels.service }} 错误率超过5%&#39;</span></span></code></pre></div><h4 id="_10-2-2-预测告警" tabindex="-1">10.2.2 预测告警 <a class="header-anchor" href="#_10-2-2-预测告警" aria-label="Permalink to &quot;10.2.2 预测告警&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">DiskWillFill</span></span>
<span class="line"><span class="__shiki_17hn0y">        expr</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          predict_linear(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            node_filesystem_free_bytes{mountpoint=&quot;/&quot;}[6h],</span></span>
<span class="line"><span class="__shiki_mdbnqw">            3600 * 4</span></span>
<span class="line"><span class="__shiki_mdbnqw">          ) &lt; 0</span></span>
<span class="line"><span class="__shiki_17hn0y">        for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">1h</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><h3 id="promql核心要点回顾" tabindex="-1">PromQL核心要点回顾 <a class="header-anchor" href="#promql核心要点回顾" aria-label="Permalink to &quot;PromQL核心要点回顾&quot;">​</a></h3><ol><li><strong>数据类型</strong>：理解即时向量、范围向量、标量、字符串的区别</li><li><strong>选择器</strong>：掌握标签过滤、正则匹配、范围选择</li><li><strong>操作符</strong>：熟练使用算术、比较、逻辑运算符</li><li><strong>聚合</strong>：合理使用by和without进行分组</li><li><strong>函数库</strong>：了解各类函数的适用场景</li><li><strong>性能</strong>：编写高效的查询语句</li><li><strong>实践</strong>：结合具体业务场景应用</li></ol><h3 id="学习路径建议" tabindex="-1">学习路径建议 <a class="header-anchor" href="#学习路径建议" aria-label="Permalink to &quot;学习路径建议&quot;">​</a></h3><ol><li>从基础选择器和操作符开始</li><li>练习常用聚合模式</li><li>掌握核心函数（rate、sum、avg等）</li><li>学习高级特性（子查询、预测等）</li><li>在实际项目中应用和优化</li></ol><h3 id="资源推荐" tabindex="-1">资源推荐 <a class="header-anchor" href="#资源推荐" aria-label="Permalink to &quot;资源推荐&quot;">​</a></h3><ul><li>官方文档：<a href="https://prometheus.io/docs/prometheus/latest/querying/basics/" target="_blank" rel="noreferrer">https://prometheus.io/docs/prometheus/latest/querying/basics/</a></li><li>PromQL练习：<a href="https://promlabs.com/promql-cheat-sheet" target="_blank" rel="noreferrer">https://promlabs.com/promql-cheat-sheet</a></li><li>社区案例：<a href="https://github.com/prometheus/prometheus/wiki/Default-port-allocations" target="_blank" rel="noreferrer">https://github.com/prometheus/prometheus/wiki/Default-port-allocations</a></li></ul><p>通过系统学习PromQL，可以充分发挥Prometheus的监控能力，构建全面、高效的可观测性体系。</p>`,154)])])}const d=a(_,[["render",l]]);export{r as __pageData,d as default};
