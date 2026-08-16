import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"InfluxDB连续查询与降采样深度解析","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/nosql/timeseries/influxdb/cq.md","filePath":"data/database/nosql/timeseries/influxdb/cq.md"}'),p={name:"data/database/nosql/timeseries/influxdb/cq.md"};function l(h,s,c,e,t,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="influxdb连续查询与降采样深度解析" tabindex="-1">InfluxDB连续查询与降采样深度解析 <a class="header-anchor" href="#influxdb连续查询与降采样深度解析" aria-label="Permalink to &quot;InfluxDB连续查询与降采样深度解析&quot;">​</a></h1><h2 id="一、时序数据生命周期管理挑战" tabindex="-1">一、时序数据生命周期管理挑战 <a class="header-anchor" href="#一、时序数据生命周期管理挑战" aria-label="Permalink to &quot;一、时序数据生命周期管理挑战&quot;">​</a></h2><h3 id="_1-1-数据增长与存储成本" tabindex="-1">1.1 数据增长与存储成本 <a class="header-anchor" href="#_1-1-数据增长与存储成本" aria-label="Permalink to &quot;1.1 数据增长与存储成本&quot;">​</a></h3><ul><li><strong>指数级增长</strong>：物联网设备每秒钟产生数百万数据点</li><li><strong>存储成本高昂</strong>：原始高精度数据长期存储不经济</li><li><strong>查询性能下降</strong>：全量扫描数十亿数据点响应缓慢</li></ul><h3 id="_1-2-数据价值的时间衰减" tabindex="-1">1.2 数据价值的时间衰减 <a class="header-anchor" href="#_1-2-数据价值的时间衰减" aria-label="Permalink to &quot;1.2 数据价值的时间衰减&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">数据价值曲线：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│            数据价值随时间衰减                 │</span></span>
<span class="line"><span class="__shiki_wvjl67">├──────────────┬──────────────┬───────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│  实时分析    │  趋势分析    │  归档审计     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  (1-7天)    │  (1-12个月)  │  (1-5年)      │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  原始精度    │  降采样      │  高度聚合     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  秒/毫秒级   │  分钟/小时级 │  日/月级      │</span></span>
<span class="line"><span class="__shiki_wvjl67">└──────────────┴──────────────┴───────────────┘</span></span></code></pre></div><h3 id="_1-3-业务需求的多粒度性" tabindex="-1">1.3 业务需求的多粒度性 <a class="header-anchor" href="#_1-3-业务需求的多粒度性" aria-label="Permalink to &quot;1.3 业务需求的多粒度性&quot;">​</a></h3><ul><li><strong>实时监控</strong>：需要秒级精度检测异常</li><li><strong>运营报表</strong>：需要小时/日级趋势分析</li><li><strong>历史审计</strong>：需要月/年级聚合统计</li></ul><h2 id="二、连续查询-continuous-query-架构" tabindex="-1">二、连续查询（Continuous Query）架构 <a class="header-anchor" href="#二、连续查询-continuous-query-架构" aria-label="Permalink to &quot;二、连续查询（Continuous Query）架构&quot;">​</a></h2><h3 id="_2-1-cq核心概念" tabindex="-1">2.1 CQ核心概念 <a class="header-anchor" href="#_2-1-cq核心概念" aria-label="Permalink to &quot;2.1 CQ核心概念&quot;">​</a></h3><p><strong>连续查询（CQ）</strong> 是InfluxDB中自动、定期运行的查询，用于：</p><ol><li><strong>数据降采样</strong>：高精度→低精度聚合</li><li><strong>预计算</strong>：提前计算复杂指标</li><li><strong>数据转换</strong>：格式标准化与清洗</li><li><strong>数据分流</strong>：分发到不同保留策略</li></ol><h3 id="_2-2-cq工作流程" tabindex="-1">2.2 CQ工作流程 <a class="header-anchor" href="#_2-2-cq工作流程" aria-label="Permalink to &quot;2.2 CQ工作流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">原始数据流：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                 CQ执行周期                          │</span></span>
<span class="line"><span class="__shiki_wvjl67">├───────┬──────────┬──────────┬──────────┬───────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 时间窗口│ 数据收集  │ 查询执行  │ 结果写入  │ 下一周期  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 对齐   │ (从RP)   │ (聚合计算)│ (到目标RP)│ (等待)    │</span></span>
<span class="line"><span class="__shiki_wvjl67">└───────┴──────────┴──────────┴──────────┴───────────┘</span></span></code></pre></div><h3 id="_2-3-cq执行引擎架构" tabindex="-1">2.3 CQ执行引擎架构 <a class="header-anchor" href="#_2-3-cq执行引擎架构" aria-label="Permalink to &quot;2.3 CQ执行引擎架构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">CQ引擎组件：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│               CQ执行器 (CQ Engine)                  │</span></span>
<span class="line"><span class="__shiki_wvjl67">├───────────┬────────────┬────────────┬───────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│  调度器   │  查询执行器 │ 结果处理器  │  状态管理器   │</span></span>
<span class="line"><span class="__shiki_wvjl67">├───────────┼────────────┼────────────┼───────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 时间对齐 │ • 查询解析  │ • 数据格式  │ • CQ元数据    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 任务调度 │ • 聚合计算  │ • 写入优化  │ • 执行状态    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 重试机制 │ • 内存管理  │ • 批量提交  │ • 错误恢复    │</span></span>
<span class="line"><span class="__shiki_wvjl67">└───────────┴────────────┴────────────┴───────────────┘</span></span></code></pre></div><h2 id="三、连续查询语法与配置详解" tabindex="-1">三、连续查询语法与配置详解 <a class="header-anchor" href="#三、连续查询语法与配置详解" aria-label="Permalink to &quot;三、连续查询语法与配置详解&quot;">​</a></h2><h3 id="_3-1-基础cq语法" tabindex="-1">3.1 基础CQ语法 <a class="header-anchor" href="#_3-1-基础cq语法" aria-label="Permalink to &quot;3.1 基础CQ语法&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 完整CQ语法结构</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONTINUOUS QUERY </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">cq_name</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_1itgoe"> &lt;database_name&gt;</span></span>
<span class="line"><span class="__shiki_140thh">[RESAMPLE [EVERY &lt;interval&gt;] [FOR &lt;interval&gt;]]</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">  SELECT</span><span class="__shiki_1itgoe"> &lt;function</span><span class="__shiki_140thh">[s]</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> INTO</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_140thh">destination_measurement</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">  FROM</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_140thh">source_measurement</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">  [WHERE &lt;conditions&gt;] </span></span>
<span class="line"><span class="__shiki_1itgoe">  GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">interval</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh">)[, &lt;tag_key[s]</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span></span></code></pre></div><h3 id="_3-2-cq关键参数解析" tabindex="-1">3.2 CQ关键参数解析 <a class="header-anchor" href="#_3-2-cq关键参数解析" aria-label="Permalink to &quot;3.2 CQ关键参数解析&quot;">​</a></h3><h4 id="_3-2-1-时间窗口配置" tabindex="-1">3.2.1 时间窗口配置 <a class="header-anchor" href="#_3-2-1-时间窗口配置" aria-label="Permalink to &quot;3.2.1 时间窗口配置&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 基础时间窗口</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(1h)           </span><span class="__shiki_21nrsd">-- 每小时聚合一次</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(10m, 5m)      </span><span class="__shiki_21nrsd">-- 每10分钟聚合，偏移5分钟</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(1d, </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">30m)     </span><span class="__shiki_21nrsd">-- 每天聚合，提前30分钟开始</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 偏移量使用场景：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 对齐业务时间（如财务日从9:30开始）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 处理数据延迟</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 避开高峰时段</span></span></code></pre></div><h4 id="_3-2-2-resample子句详解" tabindex="-1">3.2.2 RESAMPLE子句详解 <a class="header-anchor" href="#_3-2-2-resample子句详解" aria-label="Permalink to &quot;3.2.2 RESAMPLE子句详解&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- RESAMPLE控制CQ执行时机和数据范围</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONTINUOUS QUERY cq_advanced </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> mydb</span></span>
<span class="line"><span class="__shiki_1itgoe">RESAMPLE</span><span class="__shiki_140thh"> EVERY 5m </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_140thh"> 10m</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">  SELECT</span><span class="__shiki_140thh"> mean(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> downsampled_5m</span></span>
<span class="line"><span class="__shiki_1itgoe">  FROM</span><span class="__shiki_140thh"> raw_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">  GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(5m), </span><span class="__shiki_1itgoe">*</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 执行逻辑：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- EVERY 5m: 每5分钟执行一次CQ</span></span>
<span class="line"><span class="__shiki_21nrsd">-- FOR 10m:  每次处理过去10分钟的数据</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 目的：确保延迟数据也能被处理</span></span></code></pre></div><h3 id="_3-3-高级cq模式" tabindex="-1">3.3 高级CQ模式 <a class="header-anchor" href="#_3-3-高级cq模式" aria-label="Permalink to &quot;3.3 高级CQ模式&quot;">​</a></h3><h4 id="_3-3-1-多级降采样链" tabindex="-1">3.3.1 多级降采样链 <a class="header-anchor" href="#_3-3-1-多级降采样链" aria-label="Permalink to &quot;3.3.1 多级降采样链&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 第一级：原始数据 → 1分钟精度</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONTINUOUS QUERY cq_level1 </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> telemetry</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">  SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    mean(cpu_usage) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> cpu_mean,</span></span>
<span class="line"><span class="__shiki_dzsirb">    max</span><span class="__shiki_140thh">(memory_used) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> memory_max,</span></span>
<span class="line"><span class="__shiki_dzsirb">    count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">distinct</span><span class="__shiki_140thh">(device_id)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> device_count</span></span>
<span class="line"><span class="__shiki_1itgoe">  INTO</span><span class="__shiki_dzsirb"> telemetry</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">rp_30days</span><span class="__shiki_140thh">.1min_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">  FROM</span><span class="__shiki_dzsirb"> telemetry</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">rp_7days</span><span class="__shiki_140thh">.raw_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">  GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(1m), region, host</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 第二级：1分钟 → 5分钟精度</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONTINUOUS QUERY cq_level2 </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> telemetry</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">  SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    mean(cpu_mean) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> cpu_mean_5m,</span></span>
<span class="line"><span class="__shiki_140thh">    percentile(memory_max, </span><span class="__shiki_dzsirb">95</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> memory_p95,</span></span>
<span class="line"><span class="__shiki_dzsirb">    sum</span><span class="__shiki_140thh">(device_count) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> total_devices</span></span>
<span class="line"><span class="__shiki_1itgoe">  INTO</span><span class="__shiki_dzsirb"> telemetry</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">rp_90days</span><span class="__shiki_140thh">.5min_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">  FROM</span><span class="__shiki_dzsirb"> telemetry</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">rp_30days</span><span class="__shiki_140thh">.1min_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">  GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(5m), region</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 第三级：5分钟 → 1小时精度</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONTINUOUS QUERY cq_level3 </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> telemetry</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">  SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    mean(cpu_mean_5m) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> cpu_mean_hourly,</span></span>
<span class="line"><span class="__shiki_dzsirb">    max</span><span class="__shiki_140thh">(memory_p95) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> memory_max_hourly,</span></span>
<span class="line"><span class="__shiki_1itgoe">    stats</span><span class="__shiki_140thh">(total_devices) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> device_stats</span></span>
<span class="line"><span class="__shiki_1itgoe">  INTO</span><span class="__shiki_dzsirb"> telemetry</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">rp_1year</span><span class="__shiki_140thh">.hourly_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">  FROM</span><span class="__shiki_dzsirb"> telemetry</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">rp_90days</span><span class="__shiki_140thh">.5min_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">  GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(1h)</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span></span></code></pre></div><h4 id="_3-3-2-条件聚合与数据清洗" tabindex="-1">3.3.2 条件聚合与数据清洗 <a class="header-anchor" href="#_3-3-2-条件聚合与数据清洗" aria-label="Permalink to &quot;3.3.2 条件聚合与数据清洗&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 过滤异常值并计算有效数据统计</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONTINUOUS QUERY cq_clean </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> iot_data</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">  SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    mean(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> normal_avg,</span></span>
<span class="line"><span class="__shiki_140thh">    median(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> robust_median,</span></span>
<span class="line"><span class="__shiki_140thh">    stddev(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> volatility,</span></span>
<span class="line"><span class="__shiki_dzsirb">    count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> sample_count</span></span>
<span class="line"><span class="__shiki_1itgoe">  INTO</span><span class="__shiki_140thh"> cleaned_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">  FROM</span><span class="__shiki_140thh"> raw_sensor_data</span></span>
<span class="line"><span class="__shiki_1itgoe">  WHERE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    value</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">100</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_1itgoe"> value</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_21nrsd">      -- 合理范围过滤</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_140thh"> quality </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;good&#39;</span><span class="__shiki_21nrsd">               -- 质量标志检查</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> 1h              </span><span class="__shiki_21nrsd">-- 时间范围限制</span></span>
<span class="line"><span class="__shiki_1itgoe">  GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(1m), sensor_type, </span><span class="__shiki_1itgoe">location</span></span>
<span class="line"><span class="__shiki_1itgoe">  HAVING</span><span class="__shiki_dzsirb"> count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_21nrsd">              -- 最小样本数要求</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span></span></code></pre></div><h2 id="四、降采样算法与聚合函数" tabindex="-1">四、降采样算法与聚合函数 <a class="header-anchor" href="#四、降采样算法与聚合函数" aria-label="Permalink to &quot;四、降采样算法与聚合函数&quot;">​</a></h2><h3 id="_4-1-时序数据聚合特性" tabindex="-1">4.1 时序数据聚合特性 <a class="header-anchor" href="#_4-1-时序数据聚合特性" aria-label="Permalink to &quot;4.1 时序数据聚合特性&quot;">​</a></h3><h4 id="_4-1-1-可聚合性分类" tabindex="-1">4.1.1 可聚合性分类 <a class="header-anchor" href="#_4-1-1-可聚合性分类" aria-label="Permalink to &quot;4.1.1 可聚合性分类&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">聚合函数类型：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌────────────────┬─────────────────┬─────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│   类型         │    示例函数     │     特性            │</span></span>
<span class="line"><span class="__shiki_wvjl67">├────────────────┼─────────────────┼─────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 可加性         │ SUM, COUNT      │ 可跨时间直接求和    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 不可加性       │ MEAN, MEDIAN    │ 需要原始数据计算    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 近似统计       │ PERCENTILE      │ 需特殊算法处理      │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 状态保持       │ LAST, FIRST     │ 依赖数据顺序        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 累积性         │ CUMULATIVE_SUM  │ 依赖历史状态        │</span></span>
<span class="line"><span class="__shiki_wvjl67">└────────────────┴─────────────────┴─────────────────────┘</span></span></code></pre></div><h3 id="_4-2-聚合算法实现" tabindex="-1">4.2 聚合算法实现 <a class="header-anchor" href="#_4-2-聚合算法实现" aria-label="Permalink to &quot;4.2 聚合算法实现&quot;">​</a></h3><h4 id="_4-2-1-平均值降采样优化" tabindex="-1">4.2.1 平均值降采样优化 <a class="header-anchor" href="#_4-2-1-平均值降采样优化" aria-label="Permalink to &quot;4.2.1 平均值降采样优化&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 直接平均可能损失精度，推荐使用加权平均</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">  mean(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> simple_avg,                    </span><span class="__shiki_21nrsd">-- 简单平均</span></span>
<span class="line"><span class="__shiki_dzsirb">  sum</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> weight</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> sum</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">weight</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> weighted_avg  </span><span class="__shiki_21nrsd">-- 加权平均</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> sensor_data</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(1h)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 在CQ中实现加权平均：</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONTINUOUS QUERY cq_weighted </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">  SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    sum</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> interval_ms) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> sum</span><span class="__shiki_140thh">(interval_ms) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> weighted_mean,</span></span>
<span class="line"><span class="__shiki_dzsirb">    count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> sample_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">    sum</span><span class="__shiki_140thh">(interval_ms) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> total_interval</span></span>
<span class="line"><span class="__shiki_1itgoe">  INTO</span><span class="__shiki_140thh"> weighted_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">  FROM</span><span class="__shiki_140thh"> raw_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">  GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(5m), device_id</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span></span></code></pre></div><h4 id="_4-2-2-百分位数近似计算" tabindex="-1">4.2.2 百分位数近似计算 <a class="header-anchor" href="#_4-2-2-百分位数近似计算" aria-label="Permalink to &quot;4.2.2 百分位数近似计算&quot;">​</a></h4><p>InfluxDB使用T-Digest算法进行近似百分位数计算：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// T-Digest算法核心思想</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> TDigest</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    centroids []</span><span class="__shiki_1t8gfj">Centroid</span><span class="__shiki_21nrsd">  // 质心集合</span></span>
<span class="line"><span class="__shiki_140thh">    compression </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_21nrsd">   // 压缩参数</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 降采样时的百分位计算策略</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> downsamplePercentile</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">float64</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">percentile</span><span class="__shiki_1itgoe"> float64</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(data) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 小数据集：精确计算</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1t8gfj"> exactPercentile</span><span class="__shiki_140thh">(data, percentile)</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 大数据集：T-Digest近似</span></span>
<span class="line"><span class="__shiki_140thh">        digest </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> NewTDigest</span><span class="__shiki_140thh">(compression: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, v </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> data {</span></span>
<span class="line"><span class="__shiki_140thh">            digest.</span><span class="__shiki_1t8gfj">Add</span><span class="__shiki_140thh">(v)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> digest.</span><span class="__shiki_1t8gfj">Quantile</span><span class="__shiki_140thh">(percentile)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_4-2-3-时间加权聚合" tabindex="-1">4.2.3 时间加权聚合 <a class="header-anchor" href="#_4-2-3-时间加权聚合" aria-label="Permalink to &quot;4.2.3 时间加权聚合&quot;">​</a></h4><p>对于采样间隔不规则的数据，需要时间加权：</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 计算时间加权平均值</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONTINUOUS QUERY cq_time_weighted </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">  SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 时间加权平均 = Σ(值 × 持续时间) / Σ(持续时间)</span></span>
<span class="line"><span class="__shiki_140thh">    integral(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">last</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">timestamp</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_1itgoe"> first</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">timestamp</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> time_weighted_avg,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 同时保存开始和结束时间</span></span>
<span class="line"><span class="__shiki_1itgoe">    first</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">time</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> window_start,</span></span>
<span class="line"><span class="__shiki_1itgoe">    last</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">time</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> window_end,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 采样间隔统计</span></span>
<span class="line"><span class="__shiki_140thh">    mean(</span><span class="__shiki_dzsirb">difference</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">time</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> avg_sample_interval</span></span>
<span class="line"><span class="__shiki_1itgoe">  INTO</span><span class="__shiki_140thh"> time_weighted_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">  FROM</span><span class="__shiki_140thh"> irregular_samples</span></span>
<span class="line"><span class="__shiki_1itgoe">  GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(10m), sensor_id</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span></span></code></pre></div><h3 id="_4-3-特殊聚合场景" tabindex="-1">4.3 特殊聚合场景 <a class="header-anchor" href="#_4-3-特殊聚合场景" aria-label="Permalink to &quot;4.3 特殊聚合场景&quot;">​</a></h3><h4 id="_4-3-1-计数器处理-counter" tabindex="-1">4.3.1 计数器处理（Counter） <a class="header-anchor" href="#_4-3-1-计数器处理-counter" aria-label="Permalink to &quot;4.3.1 计数器处理（Counter）&quot;">​</a></h4><p>计数器需要处理重置和回绕：</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 处理可能重置的计数器</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONTINUOUS QUERY cq_counter </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> network</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">  SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    non_negative_difference(</span><span class="__shiki_dzsirb">max</span><span class="__shiki_140thh">(packet_count)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> packets_per_min,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检测并处理计数器重置</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">      WHEN</span><span class="__shiki_dzsirb"> difference</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">max</span><span class="__shiki_140thh">(packet_count)) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">      THEN</span><span class="__shiki_dzsirb"> max</span><span class="__shiki_140thh">(packet_count)  </span><span class="__shiki_21nrsd">-- 重置事件，从新值开始</span></span>
<span class="line"><span class="__shiki_1itgoe">      ELSE</span><span class="__shiki_dzsirb"> difference</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">max</span><span class="__shiki_140thh">(packet_count))</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> safe_difference,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 标记重置事件</span></span>
<span class="line"><span class="__shiki_dzsirb">    sum</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">CASE</span><span class="__shiki_1itgoe"> WHEN</span><span class="__shiki_dzsirb"> difference</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">max</span><span class="__shiki_140thh">(packet_count)) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> ELSE</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> END</span><span class="__shiki_140thh">) </span></span>
<span class="line"><span class="__shiki_1itgoe">      AS</span><span class="__shiki_140thh"> reset_count</span></span>
<span class="line"><span class="__shiki_1itgoe">  INTO</span><span class="__shiki_140thh"> network_rates</span></span>
<span class="line"><span class="__shiki_1itgoe">  FROM</span><span class="__shiki_140thh"> interface_counters</span></span>
<span class="line"><span class="__shiki_1itgoe">  GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(1m), interface</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span></span></code></pre></div><h4 id="_4-3-2-变化率计算-rate" tabindex="-1">4.3.2 变化率计算（Rate） <a class="header-anchor" href="#_4-3-2-变化率计算-rate" aria-label="Permalink to &quot;4.3.2 变化率计算（Rate）&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 计算变化率，处理时间间隔不一致</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONTINUOUS QUERY cq_rate </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">  SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 标准速率计算</span></span>
<span class="line"><span class="__shiki_140thh">    non_negative_derivative(mean(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">), 1s) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> rate_per_second,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 时间间隔感知的速率</span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_1itgoe">last</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_1itgoe"> first</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">      (</span><span class="__shiki_1itgoe">float</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">last</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">time</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_1itgoe"> float</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">first</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">time</span><span class="__shiki_140thh">))) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1000000000</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">      AS</span><span class="__shiki_140thh"> precise_rate,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 单位转换示例：字节/秒 → 比特/秒</span></span>
<span class="line"><span class="__shiki_140thh">    non_negative_derivative(mean(bytes)) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 8</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> bits_per_second</span></span>
<span class="line"><span class="__shiki_1itgoe">  INTO</span><span class="__shiki_140thh"> rate_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">  FROM</span><span class="__shiki_140thh"> raw_measurements</span></span>
<span class="line"><span class="__shiki_1itgoe">  GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(30s), </span><span class="__shiki_1itgoe">*</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span></span></code></pre></div><h2 id="五、cq调度与执行机制" tabindex="-1">五、CQ调度与执行机制 <a class="header-anchor" href="#五、cq调度与执行机制" aria-label="Permalink to &quot;五、CQ调度与执行机制&quot;">​</a></h2><h3 id="_5-1-时间窗口对齐策略" tabindex="-1">5.1 时间窗口对齐策略 <a class="header-anchor" href="#_5-1-时间窗口对齐策略" aria-label="Permalink to &quot;5.1 时间窗口对齐策略&quot;">​</a></h3><h4 id="_5-1-1-窗口边界计算" tabindex="-1">5.1.1 窗口边界计算 <a class="header-anchor" href="#_5-1-1-窗口边界计算" aria-label="Permalink to &quot;5.1.1 窗口边界计算&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// CQ调度器窗口计算逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> calculateWindow</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">executionTime</span><span class="__shiki_1t8gfj"> time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">interval</span><span class="__shiki_1t8gfj"> time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_140thh">) (</span><span class="__shiki_1jdh33">start</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">end</span><span class="__shiki_1t8gfj"> time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 向下取整到最近的interval边界</span></span>
<span class="line"><span class="__shiki_140thh">    truncated </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> executionTime.</span><span class="__shiki_1t8gfj">Truncate</span><span class="__shiki_140thh">(interval)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 默认窗口：前一个完整interval</span></span>
<span class="line"><span class="__shiki_140thh">    start </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> truncated.</span><span class="__shiki_1t8gfj">Add</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">interval)</span></span>
<span class="line"><span class="__shiki_140thh">    end </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> truncated</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 考虑RESAMPLE的FOR参数</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> resampleFor </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        start </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> executionTime.</span><span class="__shiki_1t8gfj">Add</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">resampleFor)</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 确保start对齐到interval边界</span></span>
<span class="line"><span class="__shiki_140thh">        start </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> start.</span><span class="__shiki_1t8gfj">Truncate</span><span class="__shiki_140thh">(interval)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> start, end</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_5-1-2-执行时间偏移" tabindex="-1">5.1.2 执行时间偏移 <a class="header-anchor" href="#_5-1-2-执行时间偏移" aria-label="Permalink to &quot;5.1.2 执行时间偏移&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 使用偏移避免高峰时段</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONTINUOUS QUERY cq_with_offset </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">RESAMPLE</span><span class="__shiki_140thh"> EVERY 1h </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_140thh"> 2h</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">  SELECT</span><span class="__shiki_140thh"> mean(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span></span>
<span class="line"><span class="__shiki_1itgoe">  INTO</span><span class="__shiki_140thh"> hourly_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">  FROM</span><span class="__shiki_140thh"> raw_data</span></span>
<span class="line"><span class="__shiki_1itgoe">  GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(1h, </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">15m)  </span><span class="__shiki_21nrsd">-- 偏移15分钟，窗口为:45-:45</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 执行时间线：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 实际窗口：00:45-01:45, 01:45-02:45, ...</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 执行时间：02:00, 03:00, ...（有15分钟延迟容忍）</span></span></code></pre></div><h3 id="_5-2-cq执行状态管理" tabindex="-1">5.2 CQ执行状态管理 <a class="header-anchor" href="#_5-2-cq执行状态管理" aria-label="Permalink to &quot;5.2 CQ执行状态管理&quot;">​</a></h3><h4 id="_5-2-1-元数据存储" tabindex="-1">5.2.1 元数据存储 <a class="header-anchor" href="#_5-2-1-元数据存储" aria-label="Permalink to &quot;5.2.1 元数据存储&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- InfluxDB内部CQ元数据表结构（概念示意）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- _internal数据库中的CQ状态记录</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_mdbnqw"> &quot;_internal&quot;</span><span class="__shiki_140thh">.</span><span class="__shiki_mdbnqw">&quot;monitor&quot;</span><span class="__shiki_140thh">.</span><span class="__shiki_mdbnqw">&quot;cq&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> 1h</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 关键状态字段：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- cq_name: 连续查询名称</span></span>
<span class="line"><span class="__shiki_21nrsd">-- last_executed: 最后执行时间</span></span>
<span class="line"><span class="__shiki_21nrsd">-- next_scheduled: 下次计划时间</span></span>
<span class="line"><span class="__shiki_21nrsd">-- executions: 总执行次数</span></span>
<span class="line"><span class="__shiki_21nrsd">-- errors: 错误次数</span></span>
<span class="line"><span class="__shiki_21nrsd">-- avg_duration: 平均执行耗时</span></span></code></pre></div><h4 id="_5-2-2-容错与重试机制" tabindex="-1">5.2.2 容错与重试机制 <a class="header-anchor" href="#_5-2-2-容错与重试机制" aria-label="Permalink to &quot;5.2.2 容错与重试机制&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// CQ执行器错误处理逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> executeCQWithRetry</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">cq</span><span class="__shiki_1t8gfj"> CQDefinition</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">maxRetries</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> attempt </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">; attempt </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_140thh"> maxRetries; attempt</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> executeCQ</span><span class="__shiki_140thh">(cq)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 成功，更新状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">            updateCQStatus</span><span class="__shiki_140thh">(cq.Name, </span><span class="__shiki_mdbnqw">&quot;success&quot;</span><span class="__shiki_140thh">, executionTime)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 分类错误类型</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1t8gfj"> isTransientError</span><span class="__shiki_140thh">(err) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 临时错误，等待后重试</span></span>
<span class="line"><span class="__shiki_140thh">            waitTime </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> calculateBackoff</span><span class="__shiki_140thh">(attempt)</span></span>
<span class="line"><span class="__shiki_140thh">            time.</span><span class="__shiki_1t8gfj">Sleep</span><span class="__shiki_140thh">(waitTime)</span></span>
<span class="line"><span class="__shiki_1itgoe">            continue</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_1t8gfj"> isDataError</span><span class="__shiki_140thh">(err) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 数据错误，记录但继续</span></span>
<span class="line"><span class="__shiki_1t8gfj">            logDataError</span><span class="__shiki_140thh">(cq.Name, err)</span></span>
<span class="line"><span class="__shiki_1t8gfj">            updateCQStatus</span><span class="__shiki_140thh">(cq.Name, </span><span class="__shiki_mdbnqw">&quot;partial_failure&quot;</span><span class="__shiki_140thh">, executionTime)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 永久错误，停止重试</span></span>
<span class="line"><span class="__shiki_1t8gfj">            updateCQStatus</span><span class="__shiki_140thh">(cq.Name, </span><span class="__shiki_mdbnqw">&quot;failed&quot;</span><span class="__shiki_140thh">, executionTime)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 超过重试次数</span></span>
<span class="line"><span class="__shiki_1t8gfj">    updateCQStatus</span><span class="__shiki_140thh">(cq.Name, </span><span class="__shiki_mdbnqw">&quot;max_retries_exceeded&quot;</span><span class="__shiki_140thh">, executionTime)</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> errors.</span><span class="__shiki_1t8gfj">New</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;max retries exceeded&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="六、性能优化与最佳实践" tabindex="-1">六、性能优化与最佳实践 <a class="header-anchor" href="#六、性能优化与最佳实践" aria-label="Permalink to &quot;六、性能优化与最佳实践&quot;">​</a></h2><h3 id="_6-1-多层次降采样策略设计" tabindex="-1">6.1 多层次降采样策略设计 <a class="header-anchor" href="#_6-1-多层次降采样策略设计" aria-label="Permalink to &quot;6.1 多层次降采样策略设计&quot;">​</a></h3><h4 id="_6-1-1-完整降采样架构" tabindex="-1">6.1.1 完整降采样架构 <a class="header-anchor" href="#_6-1-1-完整降采样架构" aria-label="Permalink to &quot;6.1.1 完整降采样架构&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">数据生命周期管理：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│              多层次降采样与保留策略                      │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────┬──────────┬──────────┬──────────┬─────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 数据层  │ 精度     │ 保留策略 │ 存储目标  │ 查询用途    │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────┼──────────┼──────────┼──────────┼─────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 热数据  │ 原始精度 │ RP_1d    │ SSD/NVMe │ 实时监控    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│         │ (秒级)   │ (1天)    │          │ 告警检测    │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────┼──────────┼──────────┼──────────┼─────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 温数据  │ 降采样1  │ RP_30d   │ SSD      │ 运营分析    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│         │ (1分钟)  │ (30天)   │          │ 日级报表    │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────┼──────────┼──────────┼──────────┼─────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 冷数据  │ 降采样2  │ RP_1y    │ HDD      │ 趋势分析    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│         │ (5分钟)  │ (1年)    │          │ 月度报告    │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────┼──────────┼──────────┼──────────┼─────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 归档数据│ 降采样3  │ RP_5y    │ 对象存储  │ 合规审计    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│         │ (1小时)  │ (5年)    │          │ 年度统计    │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────┴──────────┴──────────┴──────────┴─────────────┘</span></span></code></pre></div><h4 id="_6-1-2-自动化降采样配置" tabindex="-1">6.1.2 自动化降采样配置 <a class="header-anchor" href="#_6-1-2-自动化降采样配置" aria-label="Permalink to &quot;6.1.2 自动化降采样配置&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 自动化降采样配置脚本示例</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 创建保留策略</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> RETENTION</span><span class="__shiki_1itgoe"> POLICY</span><span class="__shiki_140thh"> rp_hot </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> metrics DURATION 1d REPLICATION </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> RETENTION</span><span class="__shiki_1itgoe"> POLICY</span><span class="__shiki_140thh"> rp_warm </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> metrics DURATION 30d REPLICATION </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> RETENTION</span><span class="__shiki_1itgoe"> POLICY</span><span class="__shiki_140thh"> rp_cold </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> metrics DURATION 365d REPLICATION </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> RETENTION</span><span class="__shiki_1itgoe"> POLICY</span><span class="__shiki_140thh"> rp_archive </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> metrics DURATION 1825d REPLICATION </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 设置默认保留策略</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> DATABASE</span><span class="__shiki_140thh"> metrics </span><span class="__shiki_1itgoe">DEFAULT</span><span class="__shiki_1itgoe"> RETENTION</span><span class="__shiki_1itgoe"> POLICY</span><span class="__shiki_140thh"> rp_hot</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 创建降采样CQ链</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 热→温：秒级→分钟级</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONTINUOUS QUERY cq_hot_to_warm </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">  SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    mean(cpu_usage) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> cpu_1m,</span></span>
<span class="line"><span class="__shiki_dzsirb">    max</span><span class="__shiki_140thh">(memory_used) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> memory_max_1m,</span></span>
<span class="line"><span class="__shiki_140thh">    percentile(response_time, </span><span class="__shiki_dzsirb">95</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> p95_rt_1m,</span></span>
<span class="line"><span class="__shiki_dzsirb">    count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">distinct</span><span class="__shiki_140thh">(user_id)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> active_users</span></span>
<span class="line"><span class="__shiki_1itgoe">  INTO</span><span class="__shiki_dzsirb"> metrics</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">rp_warm</span><span class="__shiki_140thh">.1min_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">  FROM</span><span class="__shiki_dzsirb"> metrics</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">rp_hot</span><span class="__shiki_140thh">.raw_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">  GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(1m), </span><span class="__shiki_1itgoe">service</span><span class="__shiki_140thh">, datacenter</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 温→冷：分钟级→5分钟级</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONTINUOUS QUERY cq_warm_to_cold </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">  SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    mean(cpu_1m) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> cpu_5m,</span></span>
<span class="line"><span class="__shiki_dzsirb">    max</span><span class="__shiki_140thh">(memory_max_1m) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> memory_max_5m,</span></span>
<span class="line"><span class="__shiki_140thh">    mean(p95_rt_1m) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> avg_p95_rt_5m,</span></span>
<span class="line"><span class="__shiki_dzsirb">    sum</span><span class="__shiki_140thh">(active_users) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> total_users_5m</span></span>
<span class="line"><span class="__shiki_1itgoe">  INTO</span><span class="__shiki_dzsirb"> metrics</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">rp_cold</span><span class="__shiki_140thh">.5min_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">  FROM</span><span class="__shiki_dzsirb"> metrics</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">rp_warm</span><span class="__shiki_140thh">.1min_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">  GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(5m), </span><span class="__shiki_1itgoe">service</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 冷→归档：5分钟级→小时级</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONTINUOUS QUERY cq_cold_to_archive </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">  SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    mean(cpu_5m) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> cpu_hourly,</span></span>
<span class="line"><span class="__shiki_dzsirb">    max</span><span class="__shiki_140thh">(memory_max_5m) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> memory_max_hourly,</span></span>
<span class="line"><span class="__shiki_140thh">    percentile(avg_p95_rt_5m, </span><span class="__shiki_dzsirb">99</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> p99_rt_hourly,</span></span>
<span class="line"><span class="__shiki_1itgoe">    stats</span><span class="__shiki_140thh">(total_users_5m) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> user_stats_hourly</span></span>
<span class="line"><span class="__shiki_1itgoe">  INTO</span><span class="__shiki_dzsirb"> metrics</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">rp_archive</span><span class="__shiki_140thh">.hourly_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">  FROM</span><span class="__shiki_dzsirb"> metrics</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">rp_cold</span><span class="__shiki_140thh">.5min_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">  GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(1h)</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span></span></code></pre></div><h3 id="_6-2-性能调优参数" tabindex="-1">6.2 性能调优参数 <a class="header-anchor" href="#_6-2-性能调优参数" aria-label="Permalink to &quot;6.2 性能调优参数&quot;">​</a></h3><h4 id="_6-2-1-influxdb-cq配置" tabindex="-1">6.2.1 InfluxDB CQ配置 <a class="header-anchor" href="#_6-2-1-influxdb-cq配置" aria-label="Permalink to &quot;6.2.1 InfluxDB CQ配置&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># influxdb.conf 相关配置</span></span>
<span class="line"><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">continuous_queries</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 启用CQ</span></span>
<span class="line"><span class="__shiki_140thh">  enabled = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 日志级别</span></span>
<span class="line"><span class="__shiki_140thh">  log-enabled = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  query-stats-enabled = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 执行限制</span></span>
<span class="line"><span class="__shiki_140thh">  run-interval = </span><span class="__shiki_mdbnqw">&quot;1s&quot;</span><span class="__shiki_21nrsd">           # CQ检查间隔</span></span>
<span class="line"><span class="__shiki_140thh">  max-process-cq = </span><span class="__shiki_dzsirb">0</span><span class="__shiki_21nrsd">            # 最大并发CQ数，0=CPU核心数</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 资源控制</span></span>
<span class="line"><span class="__shiki_140thh">  max-cq-per-database = </span><span class="__shiki_dzsirb">250</span><span class="__shiki_21nrsd">     # 每数据库最大CQ数</span></span>
<span class="line"><span class="__shiki_140thh">  max-cq-max-memory-per-query = </span><span class="__shiki_mdbnqw">&quot;1g&quot;</span><span class="__shiki_21nrsd">  # 单CQ最大内存</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 重试策略</span></span>
<span class="line"><span class="__shiki_140thh">  retry-rate-limit = </span><span class="__shiki_dzsirb">0</span><span class="__shiki_21nrsd">          # 重试速率限制，0=禁用</span></span>
<span class="line"><span class="__shiki_140thh">  max-scheduled-retries = </span><span class="__shiki_dzsirb">20</span><span class="__shiki_21nrsd">    # 最大计划重试次数</span></span></code></pre></div><h4 id="_6-2-2-查询优化技巧" tabindex="-1">6.2.2 查询优化技巧 <a class="header-anchor" href="#_6-2-2-查询优化技巧" aria-label="Permalink to &quot;6.2.2 查询优化技巧&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 减少GROUP BY维度</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 不推荐：维度爆炸</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(1m), host, device, sensor, </span><span class="__shiki_1itgoe">location</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">type</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 推荐：关键维度</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(1m), region, metric_type</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 使用WHERE子句限制数据范围</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> 2h </span><span class="__shiki_1itgoe">AND</span><span class="__shiki_140thh"> host </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">~ </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">web</span><span class="__shiki_1itgoe">-server-</span><span class="__shiki_140thh">.</span><span class="__shiki_1itgoe">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 分批处理大量数据</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用RESAMPLE处理延迟</span></span>
<span class="line"><span class="__shiki_1itgoe">RESAMPLE</span><span class="__shiki_140thh"> EVERY 5m </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_140thh"> 30m</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 避免全标签GROUP BY</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 小心使用：可能产生数万序列</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_1itgoe"> *</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 推荐：明确指定标签</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(1h), </span><span class="__shiki_1itgoe">service</span><span class="__shiki_140thh">, environment</span></span></code></pre></div><h3 id="_6-3-监控与维护" tabindex="-1">6.3 监控与维护 <a class="header-anchor" href="#_6-3-监控与维护" aria-label="Permalink to &quot;6.3 监控与维护&quot;">​</a></h3><h4 id="_6-3-1-cq健康监控" tabindex="-1">6.3.1 CQ健康监控 <a class="header-anchor" href="#_6-3-1-cq健康监控" aria-label="Permalink to &quot;6.3.1 CQ健康监控&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 监控CQ执行状态</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">  mean(</span><span class="__shiki_mdbnqw">&quot;queryDurationNs&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1000000</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> avg_duration_ms,</span></span>
<span class="line"><span class="__shiki_dzsirb">  count</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;pointsWrittenOK&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> points_written,</span></span>
<span class="line"><span class="__shiki_140thh">  mean(</span><span class="__shiki_mdbnqw">&quot;pointsWrittenOK&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (mean(</span><span class="__shiki_mdbnqw">&quot;queryDurationNs&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1000000000</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> write_rate_pps,</span></span>
<span class="line"><span class="__shiki_dzsirb">  sum</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;errors&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total_errors</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_mdbnqw"> &quot;_internal&quot;</span><span class="__shiki_140thh">.</span><span class="__shiki_mdbnqw">&quot;monitor&quot;</span><span class="__shiki_140thh">.</span><span class="__shiki_mdbnqw">&quot;cq&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> 1h</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(5m), </span><span class="__shiki_mdbnqw">&quot;database&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;cqName&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> avg_duration_ms </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 检测延迟的CQ</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">  last</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;lastExecuted&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> last_execution,</span></span>
<span class="line"><span class="__shiki_140thh">  elapsed(</span><span class="__shiki_1itgoe">last</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;lastExecuted&quot;</span><span class="__shiki_140thh">), </span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">()) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> time_since_last,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;cqName&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;database&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_mdbnqw"> &quot;_internal&quot;</span><span class="__shiki_140thh">.</span><span class="__shiki_mdbnqw">&quot;monitor&quot;</span><span class="__shiki_140thh">.</span><span class="__shiki_mdbnqw">&quot;cq&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> 24h</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_mdbnqw"> &quot;database&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;cqName&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">HAVING</span><span class="__shiki_140thh"> elapsed(</span><span class="__shiki_1itgoe">last</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;lastExecuted&quot;</span><span class="__shiki_140thh">), </span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">()) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> 10m</span></span></code></pre></div><h4 id="_6-3-2-资源使用监控" tabindex="-1">6.3.2 资源使用监控 <a class="header-anchor" href="#_6-3-2-资源使用监控" aria-label="Permalink to &quot;6.3.2 资源使用监控&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 监控CQ资源消耗</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">  mean(</span><span class="__shiki_mdbnqw">&quot;memoryUsage&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_memory_bytes,</span></span>
<span class="line"><span class="__shiki_dzsirb">  max</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;memoryUsage&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> peak_memory_bytes,</span></span>
<span class="line"><span class="__shiki_140thh">  percentile(</span><span class="__shiki_mdbnqw">&quot;queryDurationNs&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">95</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1000000</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> p95_duration_ms,</span></span>
<span class="line"><span class="__shiki_dzsirb">  count</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;executions&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> execution_count</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_mdbnqw"> &quot;_internal&quot;</span><span class="__shiki_140thh">.</span><span class="__shiki_mdbnqw">&quot;monitor&quot;</span><span class="__shiki_140thh">.</span><span class="__shiki_mdbnqw">&quot;cq&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> 24h</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(1h), </span><span class="__shiki_mdbnqw">&quot;database&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> peak_memory_bytes </span><span class="__shiki_1itgoe">DESC</span></span></code></pre></div><h2 id="七、常见问题与解决方案" tabindex="-1">七、常见问题与解决方案 <a class="header-anchor" href="#七、常见问题与解决方案" aria-label="Permalink to &quot;七、常见问题与解决方案&quot;">​</a></h2><h3 id="_7-1-cq执行失败诊断" tabindex="-1">7.1 CQ执行失败诊断 <a class="header-anchor" href="#_7-1-cq执行失败诊断" aria-label="Permalink to &quot;7.1 CQ执行失败诊断&quot;">​</a></h3><h4 id="_7-1-1-常见错误类型" tabindex="-1">7.1.1 常见错误类型 <a class="header-anchor" href="#_7-1-1-常见错误类型" aria-label="Permalink to &quot;7.1.1 常见错误类型&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 内存不足错误</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 错误信息：query exhausted memory</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 解决方案：增加内存限制或优化查询</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 超时错误</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 错误信息：query timeout</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 解决方案：增加超时时间或减少数据范围</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 序列过多错误</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 错误信息：max series per database exceeded</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 解决方案：减少GROUP BY维度</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 数据丢失问题</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 现象：CQ结果缺失某些时间段</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 解决方案：使用RESAMPLE FOR扩展处理窗口</span></span></code></pre></div><h4 id="_7-1-2-故障排查流程" tabindex="-1">7.1.2 故障排查流程 <a class="header-anchor" href="#_7-1-2-故障排查流程" aria-label="Permalink to &quot;7.1.2 故障排查流程&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">CQ故障排查：</span></span>
<span class="line"><span class="__shiki_wvjl67">1. 检查CQ状态</span></span>
<span class="line"><span class="__shiki_wvjl67">   SHOW CONTINUOUS QUERIES</span></span>
<span class="line"><span class="__shiki_wvjl67">   </span></span>
<span class="line"><span class="__shiki_wvjl67">2. 查看错误日志</span></span>
<span class="line"><span class="__shiki_wvjl67">   SELECT * FROM &quot;_internal&quot;.&quot;monitor&quot;.&quot;cq&quot; WHERE &quot;errors&quot; &gt; 0</span></span>
<span class="line"><span class="__shiki_wvjl67">   </span></span>
<span class="line"><span class="__shiki_wvjl67">3. 验证数据源</span></span>
<span class="line"><span class="__shiki_wvjl67">   SELECT count(*) FROM source_measurement WHERE time &gt; now() - 1h</span></span>
<span class="line"><span class="__shiki_wvjl67">   </span></span>
<span class="line"><span class="__shiki_wvjl67">4. 手动测试CQ查询</span></span>
<span class="line"><span class="__shiki_wvjl67">   -- 复制CQ查询语句，替换时间范围测试</span></span>
<span class="line"><span class="__shiki_wvjl67">   </span></span>
<span class="line"><span class="__shiki_wvjl67">5. 检查资源限制</span></span>
<span class="line"><span class="__shiki_wvjl67">   SHOW STATS | grep -E &quot;(max|memory|series)&quot;</span></span>
<span class="line"><span class="__shiki_wvjl67">   </span></span>
<span class="line"><span class="__shiki_wvjl67">6. 调整配置参数</span></span>
<span class="line"><span class="__shiki_wvjl67">   -- 增加内存/超时限制</span></span>
<span class="line"><span class="__shiki_wvjl67">   -- 添加RESAMPLE子句</span></span></code></pre></div><h3 id="_7-2-数据一致性问题" tabindex="-1">7.2 数据一致性问题 <a class="header-anchor" href="#_7-2-数据一致性问题" aria-label="Permalink to &quot;7.2 数据一致性问题&quot;">​</a></h3><h4 id="_7-2-1-处理延迟数据" tabindex="-1">7.2.1 处理延迟数据 <a class="header-anchor" href="#_7-2-1-处理延迟数据" aria-label="Permalink to &quot;7.2.1 处理延迟数据&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 方案1：使用RESAMPLE FOR</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONTINUOUS QUERY cq_with_late_data </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">RESAMPLE</span><span class="__shiki_140thh"> EVERY 5m </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_140thh"> 1h</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">  SELECT</span><span class="__shiki_140thh"> mean(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> downsampled</span></span>
<span class="line"><span class="__shiki_1itgoe">  FROM</span><span class="__shiki_140thh"> raw_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">  GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(5m)</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 方案2：后处理填充</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建额外的CQ处理历史数据</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONTINUOUS QUERY cq_backfill </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">  SELECT</span><span class="__shiki_140thh"> mean(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> downsampled_filled</span></span>
<span class="line"><span class="__shiki_1itgoe">  FROM</span><span class="__shiki_140thh"> raw_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">  WHERE</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> 24h  </span><span class="__shiki_21nrsd">-- 处理最近24小时</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> 5m   </span><span class="__shiki_21nrsd">-- 排除最近5分钟（可能有延迟）</span></span>
<span class="line"><span class="__shiki_1itgoe">  GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(5m)</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 方案3：使用填充函数</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">  mean(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> original,</span></span>
<span class="line"><span class="__shiki_140thh">  mean(fill(linear, </span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> filled_linear,</span></span>
<span class="line"><span class="__shiki_140thh">  mean(fill(previous, </span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> filled_previous</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> raw_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(5m)</span></span></code></pre></div><h2 id="八、高级应用场景" tabindex="-1">八、高级应用场景 <a class="header-anchor" href="#八、高级应用场景" aria-label="Permalink to &quot;八、高级应用场景&quot;">​</a></h2><h3 id="_8-1-实时异常检测" tabindex="-1">8.1 实时异常检测 <a class="header-anchor" href="#_8-1-实时异常检测" aria-label="Permalink to &quot;8.1 实时异常检测&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 使用CQ计算实时基线并检测异常</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONTINUOUS QUERY cq_anomaly_detection </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">RESAMPLE</span><span class="__shiki_140thh"> EVERY 1m </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_140thh"> 5m</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">  SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 计算统计基线</span></span>
<span class="line"><span class="__shiki_140thh">    mean(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> baseline_mean,</span></span>
<span class="line"><span class="__shiki_140thh">    stddev(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> baseline_stddev,</span></span>
<span class="line"><span class="__shiki_140thh">    percentile(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">95</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> baseline_p95,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 实时值与基线比较</span></span>
<span class="line"><span class="__shiki_140thh">    mean(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> current_value,</span></span>
<span class="line"><span class="__shiki_dzsirb">    abs</span><span class="__shiki_140thh">(mean(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> mean(mean(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">))) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> stddev(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> z_score,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 异常标记</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">      WHEN</span><span class="__shiki_dzsirb"> abs</span><span class="__shiki_140thh">(mean(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> mean(mean(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">))) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> stddev(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">      THEN</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">      ELSE</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> is_anomaly,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 变化率异常</span></span>
<span class="line"><span class="__shiki_140thh">    non_negative_derivative(mean(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> rate,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">      WHEN</span><span class="__shiki_dzsirb"> abs</span><span class="__shiki_140thh">(non_negative_derivative(mean(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">))) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> percentile(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">99</span><span class="__shiki_140thh">) </span></span>
<span class="line"><span class="__shiki_1itgoe">      THEN</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">      ELSE</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> rate_anomaly</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">  INTO</span><span class="__shiki_140thh"> anomaly_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">  FROM</span><span class="__shiki_140thh"> raw_sensor_data</span></span>
<span class="line"><span class="__shiki_1itgoe">  WHERE</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> 15m  </span><span class="__shiki_21nrsd">-- 使用最近15分钟计算基线</span></span>
<span class="line"><span class="__shiki_1itgoe">  GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(1m), sensor_id</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span></span></code></pre></div><h3 id="_8-2-多租户数据隔离" tabindex="-1">8.2 多租户数据隔离 <a class="header-anchor" href="#_8-2-多租户数据隔离" aria-label="Permalink to &quot;8.2 多租户数据隔离&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 为每个租户创建独立的降采样CQ</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用模板化方法（实际应用中需要程序生成）</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 租户A的CQ</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONTINUOUS QUERY cq_tenant_a </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> multitenant_db</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">  SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    mean(cpu_usage) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> cpu_1m,</span></span>
<span class="line"><span class="__shiki_dzsirb">    max</span><span class="__shiki_140thh">(memory_used) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> memory_1m</span></span>
<span class="line"><span class="__shiki_1itgoe">  INTO</span><span class="__shiki_mdbnqw"> &quot;tenant_a&quot;</span><span class="__shiki_140thh">.downsampled_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">  FROM</span><span class="__shiki_mdbnqw"> &quot;tenant_a&quot;</span><span class="__shiki_140thh">.raw_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">  WHERE</span><span class="__shiki_140thh"> tenant </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;A&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">  GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(1m), host</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 租户B的CQ</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONTINUOUS QUERY cq_tenant_b </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> multitenant_db</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">  SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    mean(cpu_usage) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> cpu_1m,</span></span>
<span class="line"><span class="__shiki_140thh">    percentile(response_time, </span><span class="__shiki_dzsirb">95</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> p95_rt_1m</span></span>
<span class="line"><span class="__shiki_1itgoe">  INTO</span><span class="__shiki_mdbnqw"> &quot;tenant_b&quot;</span><span class="__shiki_140thh">.downsampled_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">  FROM</span><span class="__shiki_mdbnqw"> &quot;tenant_b&quot;</span><span class="__shiki_140thh">.raw_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">  WHERE</span><span class="__shiki_140thh"> tenant </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;B&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">  GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(1m), </span><span class="__shiki_1itgoe">service</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 系统级聚合（跨租户，不包含敏感数据）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONTINUOUS QUERY cq_system_aggregate </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> multitenant_db</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">  SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">distinct</span><span class="__shiki_140thh">(tenant)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> active_tenants,</span></span>
<span class="line"><span class="__shiki_dzsirb">    sum</span><span class="__shiki_140thh">(point_count) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> total_points,</span></span>
<span class="line"><span class="__shiki_140thh">    mean(cpu_usage) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> overall_cpu_usage</span></span>
<span class="line"><span class="__shiki_1itgoe">  INTO</span><span class="__shiki_140thh"> system_aggregates</span></span>
<span class="line"><span class="__shiki_1itgoe">  FROM</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh">.</span><span class="__shiki_1itgoe">*/</span><span class="__shiki_21nrsd">  -- 匹配所有measurement</span></span>
<span class="line"><span class="__shiki_1itgoe">  WHERE</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> 5m</span></span>
<span class="line"><span class="__shiki_1itgoe">  GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(5m)</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span></span></code></pre></div><h3 id="_8-3-实时数据仓库" tabindex="-1">8.3 实时数据仓库 <a class="header-anchor" href="#_8-3-实时数据仓库" aria-label="Permalink to &quot;8.3 实时数据仓库&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 构建实时数据仓库层</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 维度建模：事实表与维度表</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 事实表：指标事实</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONTINUOUS QUERY cq_fact_metrics </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> dw</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">  SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    mean(response_time) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> avg_response_time,</span></span>
<span class="line"><span class="__shiki_dzsirb">    count</span><span class="__shiki_140thh">(request_id) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> request_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">    sum</span><span class="__shiki_140thh">(bytes_sent) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> total_bytes,</span></span>
<span class="line"><span class="__shiki_dzsirb">    count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">distinct</span><span class="__shiki_140thh">(user_id)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> unique_users</span></span>
<span class="line"><span class="__shiki_1itgoe">  INTO</span><span class="__shiki_dzsirb"> dw_fact</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">requests_fact</span></span>
<span class="line"><span class="__shiki_1itgoe">  FROM</span><span class="__shiki_140thh"> raw_requests</span></span>
<span class="line"><span class="__shiki_1itgoe">  GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(1m), </span></span>
<span class="line"><span class="__shiki_140thh">    region,          </span><span class="__shiki_21nrsd">-- 地域维度</span></span>
<span class="line"><span class="__shiki_1itgoe">    service</span><span class="__shiki_140thh">,         </span><span class="__shiki_21nrsd">-- 服务维度  </span></span>
<span class="line"><span class="__shiki_140thh">    status_code,     </span><span class="__shiki_21nrsd">-- 状态维度</span></span>
<span class="line"><span class="__shiki_1itgoe">    hour</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">hour</span><span class="__shiki_21nrsd">  -- 时间维度（小时）</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 维度表：缓慢变化维度</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONTINUOUS QUERY cq_dim_services </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> dw</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">  SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    last</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">service_name</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> current_name,</span></span>
<span class="line"><span class="__shiki_1itgoe">    last</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">version</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> current_version,</span></span>
<span class="line"><span class="__shiki_1itgoe">    last</span><span class="__shiki_140thh">(owner_team) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> current_owner,</span></span>
<span class="line"><span class="__shiki_dzsirb">    count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">version</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> version_changes</span></span>
<span class="line"><span class="__shiki_1itgoe">  INTO</span><span class="__shiki_dzsirb"> dw_dim</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">services_dim</span></span>
<span class="line"><span class="__shiki_1itgoe">  FROM</span><span class="__shiki_140thh"> service_registry</span></span>
<span class="line"><span class="__shiki_1itgoe">  GROUP BY</span><span class="__shiki_140thh"> service_id, </span><span class="__shiki_1itgoe">time</span><span class="__shiki_140thh">(1d)  </span><span class="__shiki_21nrsd">-- 每天快照</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 物化视图：预连接查询</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONTINUOUS QUERY cq_materialized_view </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> dw</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">  SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    f</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">avg_response_time</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    f</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">request_count</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">current_name</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_1itgoe"> service_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">current_owner</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> team_owner,</span></span>
<span class="line"><span class="__shiki_dzsirb">    t</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">hour_of_day</span></span>
<span class="line"><span class="__shiki_1itgoe">  INTO</span><span class="__shiki_dzsirb"> dw_mv</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">request_service_mv</span></span>
<span class="line"><span class="__shiki_1itgoe">  FROM</span><span class="__shiki_dzsirb"> dw_fact</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">requests_fact</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> f</span></span>
<span class="line"><span class="__shiki_1itgoe">  JOIN</span><span class="__shiki_dzsirb"> dw_dim</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">services_dim</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> d </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> f</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">service</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">service_id</span></span>
<span class="line"><span class="__shiki_1itgoe">  JOIN</span><span class="__shiki_140thh"> time_dimension </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> t </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> f</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">hour</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> t</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">hour_key</span></span>
<span class="line"><span class="__shiki_1itgoe">  WHERE</span><span class="__shiki_dzsirb"> f</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">time</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> 1h</span></span>
<span class="line"><span class="__shiki_1itgoe">  GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(5m), </span><span class="__shiki_dzsirb">f</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">region</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">current_owner</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span></span></code></pre></div><h2 id="九、未来演进方向" tabindex="-1">九、未来演进方向 <a class="header-anchor" href="#九、未来演进方向" aria-label="Permalink to &quot;九、未来演进方向&quot;">​</a></h2><h3 id="_9-1-influxdb-2-x-3-x中的改进" tabindex="-1">9.1 InfluxDB 2.x/3.x中的改进 <a class="header-anchor" href="#_9-1-influxdb-2-x-3-x中的改进" aria-label="Permalink to &quot;9.1 InfluxDB 2.x/3.x中的改进&quot;">​</a></h3><h4 id="_9-1-1-任务-tasks-替代cq" tabindex="-1">9.1.1 任务（Tasks）替代CQ <a class="header-anchor" href="#_9-1-1-任务-tasks-替代cq" aria-label="Permalink to &quot;9.1.1 任务（Tasks）替代CQ&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// InfluxDB 2.x使用Flux语言的任务系统</span></span>
<span class="line"><span class="__shiki_mdbnqw">option task = {</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Downsample CPU Metrics&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">  every</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">1h,</span></span>
<span class="line"><span class="__shiki_17hn0y">  offset</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;raw_metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">  |</span><span class="__shiki_2bbn9v">&gt; range(start: -task.every)</span></span>
<span class="line"><span class="__shiki_mdbnqw">  |&gt; filter(fn: (r) =&gt; r._measurement == &quot;cpu&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">  |&gt; aggregateWindow(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    every: 5m,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    fn: mean,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    createEmpty: false</span></span>
<span class="line"><span class="__shiki_mdbnqw">  )</span></span>
<span class="line"><span class="__shiki_mdbnqw">  |&gt; to(bucket: &quot;downsampled_metrics&quot;)</span></span></code></pre></div><h4 id="_9-1-2-新特性优势" tabindex="-1">9.1.2 新特性优势 <a class="header-anchor" href="#_9-1-2-新特性优势" aria-label="Permalink to &quot;9.1.2 新特性优势&quot;">​</a></h4><ol><li><strong>更灵活的调度</strong>：支持cron表达式</li><li><strong>错误处理</strong>：更好的重试和通知机制</li><li><strong>依赖管理</strong>：任务之间的依赖关系</li><li><strong>监控界面</strong>：Web UI中的任务管理</li></ol><h3 id="_9-2-云原生降采样" tabindex="-1">9.2 云原生降采样 <a class="header-anchor" href="#_9-2-云原生降采样" aria-label="Permalink to &quot;9.2 云原生降采样&quot;">​</a></h3><h4 id="_9-2-1-分离式计算架构" tabindex="-1">9.2.1 分离式计算架构 <a class="header-anchor" href="#_9-2-1-分离式计算架构" aria-label="Permalink to &quot;9.2.1 分离式计算架构&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">云原生降采样架构：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│          计算与存储分离的降采样                     │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────┬─────────────┬─────────────┬───────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│  事件源     │  流处理层   │  对象存储   │  查询引擎 │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  (设备)     │  (实时降采样)│ (长期存储)  │ (分析)    │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────┼─────────────┼─────────────┼───────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • Kafka     │ • Flink     │ • S3        │ • Presto  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • MQTT      │ • Spark     │ • GCS       │ • Trino   │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 直接写入  │ • 实时CQ    │ • 分层存储  │ • 联邦查询│</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────┴─────────────┴─────────────┴───────────┘</span></span></code></pre></div><h2 id="十、总结" tabindex="-1">十、总结 <a class="header-anchor" href="#十、总结" aria-label="Permalink to &quot;十、总结&quot;">​</a></h2><p>连续查询和降采样是时序数据管理的核心功能，通过合理设计可以实现：</p><ol><li><strong>成本优化</strong>：减少90%+的存储成本</li><li><strong>性能提升</strong>：查询速度提升10-100倍</li><li><strong>数据治理</strong>：完整的生命周期管理</li><li><strong>业务洞察</strong>：多粒度数据分析能力</li></ol><h3 id="_10-1-关键设计原则" tabindex="-1">10.1 关键设计原则 <a class="header-anchor" href="#_10-1-关键设计原则" aria-label="Permalink to &quot;10.1 关键设计原则&quot;">​</a></h3><ul><li><strong>尽早降采样</strong>：在数据进入时就开始聚合</li><li><strong>渐进精度</strong>：多层次精度满足不同需求</li><li><strong>自动化管理</strong>：减少人工维护成本</li><li><strong>监控告警</strong>：确保CQ健康运行</li></ul><h3 id="_10-2-选择建议" tabindex="-1">10.2 选择建议 <a class="header-anchor" href="#_10-2-选择建议" aria-label="Permalink to &quot;10.2 选择建议&quot;">​</a></h3><ul><li><strong>中小规模</strong>：使用InfluxDB内置CQ</li><li><strong>大规模</strong>：考虑外部流处理+Flink/Spark</li><li><strong>混合云</strong>：利用云原生分层存储</li><li><strong>实时分析</strong>：结合流处理与批处理</li></ul><p>通过合理的连续查询和降采样策略，可以构建高效、经济、可扩展的时序数据平台，支撑从实时监控到长期趋势分析的完整业务需求。</p>`,108)])])}const d=a(p,[["render",l]]);export{r as __pageData,d as default};
