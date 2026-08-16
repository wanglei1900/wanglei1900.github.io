import{_ as a,o as n,c as _,a as p}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"Telegraf数据收集系统深度解析","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/nosql/timeseries/influxdb/telegraf.md","filePath":"data/database/nosql/timeseries/influxdb/telegraf.md"}'),i={name:"data/database/nosql/timeseries/influxdb/telegraf.md"};function l(h,s,c,t,e,k){return n(),_("div",null,[...s[0]||(s[0]=[p(`<h1 id="telegraf数据收集系统深度解析" tabindex="-1">Telegraf数据收集系统深度解析 <a class="header-anchor" href="#telegraf数据收集系统深度解析" aria-label="Permalink to &quot;Telegraf数据收集系统深度解析&quot;">​</a></h1><h2 id="一、telegraf架构与设计哲学" tabindex="-1">一、Telegraf架构与设计哲学 <a class="header-anchor" href="#一、telegraf架构与设计哲学" aria-label="Permalink to &quot;一、Telegraf架构与设计哲学&quot;">​</a></h2><h3 id="_1-1-telegraf在现代监控体系中的定位" tabindex="-1">1.1 Telegraf在现代监控体系中的定位 <a class="header-anchor" href="#_1-1-telegraf在现代监控体系中的定位" aria-label="Permalink to &quot;1.1 Telegraf在现代监控体系中的定位&quot;">​</a></h3><p><strong>Telegraf</strong>是InfluxData开源的服务器端代理，用于收集、处理、聚合和写入时间序列数据，是现代监控栈中的&quot;瑞士军刀&quot;。</p><h4 id="_1-1-1-设计目标与优势" tabindex="-1">1.1.1 设计目标与优势 <a class="header-anchor" href="#_1-1-1-设计目标与优势" aria-label="Permalink to &quot;1.1.1 设计目标与优势&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">Telegraf核心设计原则：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌──────────────────┬─────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│  设计原则        │  具体实现                                    │</span></span>
<span class="line"><span class="__shiki_wvjl67">├──────────────────┼─────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 最小资源占用     │ Go语言编写，单二进制，无依赖，内存占用&lt;50MB  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 插件化架构       │ 300+官方/社区插件，灵活扩展                 │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 配置驱动         │ TOML配置文件，支持环境变量，易于自动化      │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 跨平台支持       │ Linux、Windows、macOS、容器、嵌入式系统     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 高性能处理       │ 内部缓冲，批量写入，并行收集                │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 数据标准化       │ 统一指标格式，自动标签添加                  │</span></span>
<span class="line"><span class="__shiki_wvjl67">└──────────────────┴─────────────────────────────────────────────┘</span></span></code></pre></div><h4 id="_1-1-2-在tick-influxdb生态中的角色" tabindex="-1">1.1.2 在TICK/InfluxDB生态中的角色 <a class="header-anchor" href="#_1-1-2-在tick-influxdb生态中的角色" aria-label="Permalink to &quot;1.1.2 在TICK/InfluxDB生态中的角色&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">现代监控数据流水线：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────┬──────────────┬──────────────┬──────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│   数据源    │   收集层     │   存储层     │   分析层     │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────┼──────────────┼──────────────┼──────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 系统指标  │ • Telegraf   │ • InfluxDB   │ • Grafana    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 应用指标  │ • 插件驱动   │ • 时序存储   │ • Chronograf │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 容器指标  │ • 协议适配   │ • 实时处理   │ • 可视化     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 网络设备  │ • 数据清洗   │ • 降采样     │ • 告警       │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 业务数据  │ • 聚合转换   │ • 长期存储   │ • 趋势分析   │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────┴──────────────┴──────────────┴──────────────┘</span></span></code></pre></div><h3 id="_1-2-telegraf架构总览" tabindex="-1">1.2 Telegraf架构总览 <a class="header-anchor" href="#_1-2-telegraf架构总览" aria-label="Permalink to &quot;1.2 Telegraf架构总览&quot;">​</a></h3><h4 id="_1-2-1-核心架构组件" tabindex="-1">1.2.1 核心架构组件 <a class="header-anchor" href="#_1-2-1-核心架构组件" aria-label="Permalink to &quot;1.2.1 核心架构组件&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">Telegraf内部架构：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                 Telegraf处理流水线                       │</span></span>
<span class="line"><span class="__shiki_wvjl67">├───────────┬────────────┬────────────┬───────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│  输入插件 │  处理器    │  聚合器    │  输出插件         │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ (Inputs)  │ (Processors)│ (Aggregators)│ (Outputs)       │</span></span>
<span class="line"><span class="__shiki_wvjl67">├───────────┼────────────┼────────────┼───────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 数据收集│ • 数据转换 │ • 时间窗口 │ • 数据写入        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 协议解析│ • 字段过滤 │ 聚合       │ • 协议转换        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 指标提取│ • 标签操作 │ • 统计计算 │ • 批量提交        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 事件监听│ • 数据丰富 │ • 降采样   │ • 重试机制        │</span></span>
<span class="line"><span class="__shiki_wvjl67">└───────────┴────────────┴────────────┴───────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">      │           │           │           │</span></span>
<span class="line"><span class="__shiki_wvjl67">      ▼           ▼           ▼           ▼</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│              内部缓冲与调度引擎                          │</span></span>
<span class="line"><span class="__shiki_wvjl67">├───────────┬────────────┬────────────┬───────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│  指标缓冲 │  调度器    │  错误处理  │  监控端点         │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ (Accumulator)│ (Scheduler) │ (Error Handler)│ (HTTP API)    │</span></span>
<span class="line"><span class="__shiki_wvjl67">├───────────┼────────────┼────────────┼───────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 批量缓冲│ • 插件调度 │ • 重试逻辑 │ • 健康检查        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 内存管理│ • 间隔控制 │ • 错误隔离 │ • 指标暴露        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 背压控制│ • 并发控制 │ • 告警通知 │ • 配置热重载      │</span></span>
<span class="line"><span class="__shiki_wvjl67">└───────────┴────────────┴────────────┴───────────────────┘</span></span></code></pre></div><h4 id="_1-2-2-数据流处理模型" tabindex="-1">1.2.2 数据流处理模型 <a class="header-anchor" href="#_1-2-2-数据流处理模型" aria-label="Permalink to &quot;1.2.2 数据流处理模型&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Telegraf核心数据流伪代码</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Agent</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    inputs      []</span><span class="__shiki_1t8gfj">Input</span></span>
<span class="line"><span class="__shiki_140thh">    processors  []</span><span class="__shiki_1t8gfj">Processor</span></span>
<span class="line"><span class="__shiki_140thh">    aggregators []</span><span class="__shiki_1t8gfj">Aggregator</span></span>
<span class="line"><span class="__shiki_140thh">    outputs     []</span><span class="__shiki_1t8gfj">Output</span></span>
<span class="line"><span class="__shiki_140thh">    accumulator </span><span class="__shiki_1t8gfj">Accumulator</span></span>
<span class="line"><span class="__shiki_140thh">    scheduler   </span><span class="__shiki_1t8gfj">Scheduler</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">a </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Agent</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">run</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 初始化所有插件</span></span>
<span class="line"><span class="__shiki_140thh">    a.</span><span class="__shiki_1t8gfj">initializePlugins</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 启动调度器</span></span>
<span class="line"><span class="__shiki_140thh">    a.scheduler.</span><span class="__shiki_1t8gfj">Start</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 主事件循环</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> metric </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">a.accumulator.</span><span class="__shiki_1t8gfj">Metrics</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 处理流水线</span></span>
<span class="line"><span class="__shiki_140thh">            metric </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> a.</span><span class="__shiki_1t8gfj">applyProcessors</span><span class="__shiki_140thh">(metric)</span></span>
<span class="line"><span class="__shiki_140thh">            metric </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> a.</span><span class="__shiki_1t8gfj">applyAggregators</span><span class="__shiki_140thh">(metric)</span></span>
<span class="line"><span class="__shiki_140thh">            a.</span><span class="__shiki_1t8gfj">deliverToOutputs</span><span class="__shiki_140thh">(metric)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">a.scheduler.</span><span class="__shiki_1t8gfj">Tick</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 触发输入插件收集</span></span>
<span class="line"><span class="__shiki_140thh">            a.</span><span class="__shiki_1t8gfj">gatherInputs</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">a.errorChannel:</span></span>
<span class="line"><span class="__shiki_140thh">            a.</span><span class="__shiki_1t8gfj">handleError</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="二、telegraf安装与部署" tabindex="-1">二、Telegraf安装与部署 <a class="header-anchor" href="#二、telegraf安装与部署" aria-label="Permalink to &quot;二、Telegraf安装与部署&quot;">​</a></h2><h3 id="_2-1-多平台安装方法" tabindex="-1">2.1 多平台安装方法 <a class="header-anchor" href="#_2-1-多平台安装方法" aria-label="Permalink to &quot;2.1 多平台安装方法&quot;">​</a></h3><h4 id="_2-1-1-linux系统安装" tabindex="-1">2.1.1 Linux系统安装 <a class="header-anchor" href="#_2-1-1-linux系统安装" aria-label="Permalink to &quot;2.1.1 Linux系统安装&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Ubuntu/Debian</span></span>
<span class="line"><span class="__shiki_1t8gfj">wget</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_mdbnqw"> https://repos.influxdata.com/influxdata-archive.key</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &#39;23a1c8836f0afc5ed24e0486339d7cc8f6790b83886c4c96995b88a061c5bb5d influxdata-archive.key&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> sha256sum</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_140thh"> &amp;&amp; </span><span class="__shiki_1t8gfj">cat</span><span class="__shiki_mdbnqw"> influxdata-archive.key</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> gpg</span><span class="__shiki_dzsirb"> --dearmor</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> sudo</span><span class="__shiki_mdbnqw"> tee</span><span class="__shiki_mdbnqw"> /etc/apt/trusted.gpg.d/influxdata-archive.gpg</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /dev/null</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &#39;deb [signed-by=/etc/apt/trusted.gpg.d/influxdata-archive.gpg] https://repos.influxdata.com/debian stable main&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> sudo</span><span class="__shiki_mdbnqw"> tee</span><span class="__shiki_mdbnqw"> /etc/apt/sources.list.d/influxdata.list</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> apt-get</span><span class="__shiki_mdbnqw"> update</span><span class="__shiki_140thh"> &amp;&amp; </span><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> apt-get</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> telegraf</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># RHEL/CentOS/Rocky</span></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw">EOF</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> sudo</span><span class="__shiki_mdbnqw"> tee</span><span class="__shiki_mdbnqw"> /etc/yum.repos.d/influxdata.repo</span></span>
<span class="line"><span class="__shiki_mdbnqw">[influxdata]</span></span>
<span class="line"><span class="__shiki_mdbnqw">name = InfluxData Repository - Stable</span></span>
<span class="line"><span class="__shiki_mdbnqw">baseurl = https://repos.influxdata.com/stable/</span><span class="__shiki_dzsirb">\\$</span><span class="__shiki_mdbnqw">basearch/main</span></span>
<span class="line"><span class="__shiki_mdbnqw">enabled = 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">gpgcheck = 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">gpgkey = https://repos.influxdata.com/influxdata-archive.key</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> yum</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> telegraf</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用Docker</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -v</span><span class="__shiki_mdbnqw"> /path/to/telegraf.conf:/etc/telegraf/telegraf.conf:ro</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -v</span><span class="__shiki_mdbnqw"> /var/run/docker.sock:/var/run/docker.sock:ro</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -v</span><span class="__shiki_mdbnqw"> /:/hostfs:ro</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --net=host</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name=telegraf</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  telegraf:latest</span></span></code></pre></div><h4 id="_2-1-2-windows系统安装" tabindex="-1">2.1.2 Windows系统安装 <a class="header-anchor" href="#_2-1-2-windows系统安装" aria-label="Permalink to &quot;2.1.2 Windows系统安装&quot;">​</a></h4><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 方法1：使用MSI安装程序</span></span>
<span class="line"><span class="__shiki_21nrsd"># 下载：https://dl.influxdata.com/telegraf/releases/telegraf-1.27.4_windows_amd64.zip</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 方法2：使用Chocolatey包管理器</span></span>
<span class="line"><span class="__shiki_140thh">choco install telegraf</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 方法3：手动安装</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 下载ZIP包并解压到C:\\Program Files\\Telegraf</span></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 创建服务（以管理员身份运行PowerShell）</span></span>
<span class="line"><span class="__shiki_dzsirb">New-Service</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh">Name </span><span class="__shiki_mdbnqw">&quot;Telegraf&quot;</span><span class="__shiki_1itgoe"> \`</span></span>
<span class="line"><span class="__shiki_1itgoe">  -</span><span class="__shiki_140thh">BinaryPathName </span><span class="__shiki_mdbnqw">&quot;C:\\Program Files\\Telegraf\\telegraf.exe --config C:\\Program Files\\Telegraf\\telegraf.conf&quot;</span><span class="__shiki_1itgoe"> \`</span></span>
<span class="line"><span class="__shiki_1itgoe">  -</span><span class="__shiki_140thh">DisplayName </span><span class="__shiki_mdbnqw">&quot;Telegraf Data Collector&quot;</span><span class="__shiki_1itgoe"> \`</span></span>
<span class="line"><span class="__shiki_1itgoe">  -</span><span class="__shiki_140thh">StartupType Automatic</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 启动服务</span></span>
<span class="line"><span class="__shiki_dzsirb">Start-Service</span><span class="__shiki_140thh"> Telegraf</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 方法4：使用Windows容器</span></span>
<span class="line"><span class="__shiki_140thh">docker run </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">d </span><span class="__shiki_1itgoe">\`</span></span>
<span class="line"><span class="__shiki_1itgoe">  -</span><span class="__shiki_140thh">v C:\\telegraf\\telegraf.conf:C:\\etc\\telegraf\\telegraf.conf:ro </span><span class="__shiki_1itgoe">\`</span></span>
<span class="line"><span class="__shiki_1itgoe">  --</span><span class="__shiki_140thh">name telegraf </span><span class="__shiki_1itgoe">\`</span></span>
<span class="line"><span class="__shiki_140thh">  telegraf:windows</span></span></code></pre></div><h4 id="_2-1-3-kubernetes部署" tabindex="-1">2.1.3 Kubernetes部署 <a class="header-anchor" href="#_2-1-3-kubernetes部署" aria-label="Permalink to &quot;2.1.3 Kubernetes部署&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># telegraf-daemonset.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">telegraf-config</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">monitoring</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  telegraf.conf</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">    [agent]</span></span>
<span class="line"><span class="__shiki_mdbnqw">      interval = &quot;10s&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      flush_interval = &quot;10s&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      hostname = &quot;$HOSTNAME&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    [[inputs.cpu]]</span></span>
<span class="line"><span class="__shiki_mdbnqw">      percpu = true</span></span>
<span class="line"><span class="__shiki_mdbnqw">      totalcpu = true</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    [[inputs.disk]]</span></span>
<span class="line"><span class="__shiki_mdbnqw">      ignore_fs = [&quot;tmpfs&quot;, &quot;devtmpfs&quot;, &quot;devfs&quot;]</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    [[inputs.diskio]]</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    [[inputs.kernel]]</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    [[inputs.mem]]</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    [[inputs.processes]]</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    [[inputs.swap]]</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    [[inputs.system]]</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    [[inputs.docker]]</span></span>
<span class="line"><span class="__shiki_mdbnqw">      endpoint = &quot;unix:///var/run/docker.sock&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    [[inputs.kubernetes]]</span></span>
<span class="line"><span class="__shiki_mdbnqw">      url = &quot;https://$HOST_IP:10250&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      bearer_token = &quot;/var/run/secrets/kubernetes.io/serviceaccount/token&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      insecure_skip_verify = true</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    [[outputs.influxdb_v2]]</span></span>
<span class="line"><span class="__shiki_mdbnqw">      urls = [&quot;http://influxdb:8086&quot;]</span></span>
<span class="line"><span class="__shiki_mdbnqw">      token = &quot;$INFLUX_TOKEN&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      organization = &quot;monitoring&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      bucket = &quot;telegraf&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">DaemonSet</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">telegraf</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">monitoring</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">telegraf</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">telegraf</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      serviceAccountName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">telegraf</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">telegraf</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">telegraf:1.27-alpine</span></span>
<span class="line"><span class="__shiki_17hn0y">        env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HOSTNAME</span></span>
<span class="line"><span class="__shiki_17hn0y">          valueFrom</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            fieldRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">              fieldPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">spec.nodeName</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HOST_IP</span></span>
<span class="line"><span class="__shiki_17hn0y">          valueFrom</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            fieldRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">              fieldPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">status.hostIP</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">INFLUX_TOKEN</span></span>
<span class="line"><span class="__shiki_17hn0y">          valueFrom</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            secretKeyRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">              name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">influxdb-token</span></span>
<span class="line"><span class="__shiki_17hn0y">              key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">token</span></span>
<span class="line"><span class="__shiki_17hn0y">        volumeMounts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">telegraf-config</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/etc/telegraf</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">docker-socket</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/var/run/docker.sock</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">proc</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/proc</span></span>
<span class="line"><span class="__shiki_17hn0y">          readOnly</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">sys</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/sys</span></span>
<span class="line"><span class="__shiki_17hn0y">          readOnly</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rootfs</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/rootfs</span></span>
<span class="line"><span class="__shiki_17hn0y">          readOnly</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">        resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;128Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;256Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;500m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">telegraf-config</span></span>
<span class="line"><span class="__shiki_17hn0y">        configMap</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">telegraf-config</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">docker-socket</span></span>
<span class="line"><span class="__shiki_17hn0y">        hostPath</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/var/run/docker.sock</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">proc</span></span>
<span class="line"><span class="__shiki_17hn0y">        hostPath</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/proc</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">sys</span></span>
<span class="line"><span class="__shiki_17hn0y">        hostPath</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/sys</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rootfs</span></span>
<span class="line"><span class="__shiki_17hn0y">        hostPath</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/</span></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ServiceAccount</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">telegraf</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">monitoring</span></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ClusterRole</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">telegraf</span></span>
<span class="line"><span class="__shiki_17hn0y">rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">apiGroups</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">nodes</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">nodes/stats</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">pods</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">services</span></span>
<span class="line"><span class="__shiki_17hn0y">  verbs</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;get&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;list&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ClusterRoleBinding</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">telegraf</span></span>
<span class="line"><span class="__shiki_17hn0y">roleRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  apiGroup</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rbac.authorization.k8s.io</span></span>
<span class="line"><span class="__shiki_17hn0y">  kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ClusterRole</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">telegraf</span></span>
<span class="line"><span class="__shiki_17hn0y">subjects</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ServiceAccount</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">telegraf</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">monitoring</span></span></code></pre></div><h3 id="_2-2-配置管理与环境适配" tabindex="-1">2.2 配置管理与环境适配 <a class="header-anchor" href="#_2-2-配置管理与环境适配" aria-label="Permalink to &quot;2.2 配置管理与环境适配&quot;">​</a></h3><h4 id="_2-2-1-多环境配置管理" tabindex="-1">2.2.1 多环境配置管理 <a class="header-anchor" href="#_2-2-1-多环境配置管理" aria-label="Permalink to &quot;2.2.1 多环境配置管理&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基础配置文件：telegraf.conf</span></span>
<span class="line"><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">agent</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  interval = </span><span class="__shiki_mdbnqw">&quot;10s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  round_interval = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  metric_batch_size = </span><span class="__shiki_dzsirb">1000</span></span>
<span class="line"><span class="__shiki_140thh">  metric_buffer_limit = </span><span class="__shiki_dzsirb">10000</span></span>
<span class="line"><span class="__shiki_140thh">  collection_jitter = </span><span class="__shiki_mdbnqw">&quot;0s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  flush_interval = </span><span class="__shiki_mdbnqw">&quot;10s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  flush_jitter = </span><span class="__shiki_mdbnqw">&quot;0s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  precision = </span><span class="__shiki_mdbnqw">&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  debug = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">  quiet = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">  logfile = </span><span class="__shiki_mdbnqw">&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  hostname = </span><span class="__shiki_mdbnqw">&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  omit_hostname = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 包含环境特定配置</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cpu</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  percpu = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  totalcpu = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  fieldpass = [</span><span class="__shiki_mdbnqw">&quot;usage_*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">disk</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  ignore_fs = [</span><span class="__shiki_mdbnqw">&quot;tmpfs&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;devtmpfs&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;devfs&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 环境变量覆盖</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">influxdb_v2</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  urls = [</span><span class="__shiki_mdbnqw">&quot;\${INFLUXDB_URL:http://localhost:8086}&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  token = </span><span class="__shiki_mdbnqw">&quot;\${INFLUXDB_TOKEN}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  organization = </span><span class="__shiki_mdbnqw">&quot;\${INFLUXDB_ORG:default}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  bucket = </span><span class="__shiki_mdbnqw">&quot;\${INFLUXDB_BUCKET:telegraf}&quot;</span></span></code></pre></div><h4 id="_2-2-2-配置模板与变量替换" tabindex="-1">2.2.2 配置模板与变量替换 <a class="header-anchor" href="#_2-2-2-配置模板与变量替换" aria-label="Permalink to &quot;2.2.2 配置模板与变量替换&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># 配置生成脚本：generate_config.sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 读取环境变量</span></span>
<span class="line"><span class="__shiki_140thh">ENVIRONMENT</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">\${ENVIRONMENT</span><span class="__shiki_1itgoe">:-</span><span class="__shiki_140thh">development}</span></span>
<span class="line"><span class="__shiki_140thh">REGION</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">\${REGION</span><span class="__shiki_1itgoe">:-</span><span class="__shiki_140thh">us-east-1}</span></span>
<span class="line"><span class="__shiki_140thh">INFLUX_TOKEN</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">\${INFLUX_TOKEN}</span></span>
<span class="line"><span class="__shiki_140thh">HOSTNAME</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">hostname</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 模板变量</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_140thh"> HOSTNAME</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_140thh"> ENVIRONMENT</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_140thh"> REGION</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_140thh"> INFLUX_TOKEN</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用envsubst替换变量</span></span>
<span class="line"><span class="__shiki_1t8gfj">envsubst</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw"> telegraf.conf.template</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> telegraf.generated.conf</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 配置文件模板：telegraf.conf.template</span></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> telegraf.conf.template</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw"> &#39;EOF&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">[agent]</span></span>
<span class="line"><span class="__shiki_mdbnqw">  hostname = &quot;\${HOSTNAME}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  tags = { environment = &quot;\${ENVIRONMENT}&quot;, region = &quot;\${REGION}&quot; }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">[[inputs.cpu]]</span></span>
<span class="line"><span class="__shiki_mdbnqw">  tags = { environment = &quot;\${ENVIRONMENT}&quot;, region = &quot;\${REGION}&quot; }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">[[outputs.influxdb_v2]]</span></span>
<span class="line"><span class="__shiki_mdbnqw">  urls = [&quot;http://influxdb:8086&quot;]</span></span>
<span class="line"><span class="__shiki_mdbnqw">  token = &quot;\${INFLUX_TOKEN}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  organization = &quot;\${ENVIRONMENT}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  bucket = &quot;metrics_\${REGION}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span></code></pre></div><h2 id="三、输入插件深度解析" tabindex="-1">三、输入插件深度解析 <a class="header-anchor" href="#三、输入插件深度解析" aria-label="Permalink to &quot;三、输入插件深度解析&quot;">​</a></h2><h3 id="_3-1-系统监控插件" tabindex="-1">3.1 系统监控插件 <a class="header-anchor" href="#_3-1-系统监控插件" aria-label="Permalink to &quot;3.1 系统监控插件&quot;">​</a></h3><h4 id="_3-1-1-cpu监控插件" tabindex="-1">3.1.1 CPU监控插件 <a class="header-anchor" href="#_3-1-1-cpu监控插件" aria-label="Permalink to &quot;3.1.1 CPU监控插件&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cpu</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 是否收集每个CPU核心的指标</span></span>
<span class="line"><span class="__shiki_140thh">  percpu = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 是否收集总体CPU指标</span></span>
<span class="line"><span class="__shiki_140thh">  totalcpu = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 是否收集CPU时间分解</span></span>
<span class="line"><span class="__shiki_140thh">  collect_cpu_time = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 是否报告空闲和等待时间</span></span>
<span class="line"><span class="__shiki_140thh">  report_active = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## CPU核心过滤（正则表达式）</span></span>
<span class="line"><span class="__shiki_140thh">  core_tags = []</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 字段过滤</span></span>
<span class="line"><span class="__shiki_140thh">  fieldpass = [</span><span class="__shiki_mdbnqw">&quot;usage_user&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;usage_system&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;usage_iowait&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  fielddrop = [</span><span class="__shiki_mdbnqw">&quot;usage_steal&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;usage_guest&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 自定义标签</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cpu</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">tags</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    environment = </span><span class="__shiki_mdbnqw">&quot;production&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    monitoring_tier = </span><span class="__shiki_mdbnqw">&quot;infrastructure&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 数据收集间隔（覆盖agent间隔）</span></span>
<span class="line"><span class="__shiki_140thh">  interval = </span><span class="__shiki_mdbnqw">&quot;30s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 指标名称前缀</span></span>
<span class="line"><span class="__shiki_140thh">  name_prefix = </span><span class="__shiki_mdbnqw">&quot;cpu_&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 指标名称后缀  </span></span>
<span class="line"><span class="__shiki_140thh">  name_suffix = </span><span class="__shiki_mdbnqw">&quot;_metrics&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 重命名字段</span></span>
<span class="line"><span class="__shiki_140thh">  name_override = </span><span class="__shiki_mdbnqw">&quot;processor_usage&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 标签排除</span></span>
<span class="line"><span class="__shiki_140thh">  tagexclude = [</span><span class="__shiki_mdbnqw">&quot;cpu&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 标签包含</span></span>
<span class="line"><span class="__shiki_140thh">  taginclude = [</span><span class="__shiki_mdbnqw">&quot;host&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;environment&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h4 id="_3-1-2-内存监控插件" tabindex="-1">3.1.2 内存监控插件 <a class="header-anchor" href="#_3-1-2-内存监控插件" aria-label="Permalink to &quot;3.1.2 内存监控插件&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">mem</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 是否收集百分比指标</span></span>
<span class="line"><span class="__shiki_140thh">  percentage = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 字段映射（将字段重命名为更易读的名称）</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">mem</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">fielddrop</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;active&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    dest = </span><span class="__shiki_mdbnqw">&quot;memory_active&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">mem</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">fielddrop</span><span class="__shiki_140thh">]]  </span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;available&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    dest = </span><span class="__shiki_mdbnqw">&quot;memory_available&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 内存统计详细信息级别</span></span>
<span class="line"><span class="__shiki_140thh">  detailed = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 虚拟内存统计</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">mem</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    name_override = </span><span class="__shiki_mdbnqw">&quot;virtual_memory&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    fieldpass = [</span><span class="__shiki_mdbnqw">&quot;swap*&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;vm*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 内核内存统计</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">mem</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    name_override = </span><span class="__shiki_mdbnqw">&quot;kernel_memory&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    fieldpass = [</span><span class="__shiki_mdbnqw">&quot;slab*&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;page*&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h4 id="_3-1-3-磁盘与文件系统监控" tabindex="-1">3.1.3 磁盘与文件系统监控 <a class="header-anchor" href="#_3-1-3-磁盘与文件系统监控" aria-label="Permalink to &quot;3.1.3 磁盘与文件系统监控&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">disk</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 挂载点过滤</span></span>
<span class="line"><span class="__shiki_140thh">  mount_points = [</span><span class="__shiki_mdbnqw">&quot;/&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;/data&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;/var&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 文件系统类型过滤</span></span>
<span class="line"><span class="__shiki_140thh">  fstype = [</span><span class="__shiki_mdbnqw">&quot;ext4&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;xfs&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;btrfs&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  ignore_fs = [</span><span class="__shiki_mdbnqw">&quot;tmpfs&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;devtmpfs&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;devfs&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;overlay&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;aufs&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## I/O统计</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">diskio</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    devices = [</span><span class="__shiki_mdbnqw">&quot;sda&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;sdb&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;nvme0n1&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    skip_serial_number = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    ## 为每个设备收集的指标</span></span>
<span class="line"><span class="__shiki_140thh">    namedrop = [</span><span class="__shiki_mdbnqw">&quot;^loop&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    ## 自定义设备分组</span></span>
<span class="line"><span class="__shiki_140thh">    device_tags = [</span><span class="__shiki_mdbnqw">&quot;ID_SERIAL&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;ID_FS_TYPE&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## SMART磁盘健康监控</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">smart</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    attributes = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    devices = [</span><span class="__shiki_mdbnqw">&quot;/dev/sda&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;/dev/sdb&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    ## SMART属性选择</span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">smart</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">attribute</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      id = </span><span class="__shiki_dzsirb">5</span><span class="__shiki_21nrsd">   # 重定位扇区计数</span></span>
<span class="line"><span class="__shiki_140thh">      name = </span><span class="__shiki_mdbnqw">&quot;reallocated_sectors&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">smart</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">attribute</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      id = </span><span class="__shiki_dzsirb">187</span><span class="__shiki_21nrsd"> # 报告不可纠正错误</span></span>
<span class="line"><span class="__shiki_140thh">      name = </span><span class="__shiki_mdbnqw">&quot;reported_uncorrectable_errors&quot;</span></span></code></pre></div><h3 id="_3-2-应用与中间件监控" tabindex="-1">3.2 应用与中间件监控 <a class="header-anchor" href="#_3-2-应用与中间件监控" aria-label="Permalink to &quot;3.2 应用与中间件监控&quot;">​</a></h3><h4 id="_3-2-1-web服务器监控" tabindex="-1">3.2.1 Web服务器监控 <a class="header-anchor" href="#_3-2-1-web服务器监控" aria-label="Permalink to &quot;3.2.1 Web服务器监控&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Nginx监控（Stub Status模块）</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">nginx</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## Nginx状态URL</span></span>
<span class="line"><span class="__shiki_140thh">  urls = [</span><span class="__shiki_mdbnqw">&quot;http://localhost/nginx_status&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## HTTP配置</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">nginx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    method = </span><span class="__shiki_mdbnqw">&quot;GET&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    timeout = </span><span class="__shiki_mdbnqw">&quot;5s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    ## 认证</span></span>
<span class="line"><span class="__shiki_140thh">    username = </span><span class="__shiki_mdbnqw">&quot;\${NGINX_USER}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    password = </span><span class="__shiki_mdbnqw">&quot;\${NGINX_PASSWORD}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    ## TLS配置</span></span>
<span class="line"><span class="__shiki_140thh">    tls_ca = </span><span class="__shiki_mdbnqw">&quot;/etc/ssl/certs/ca-certificates.crt&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    tls_cert = </span><span class="__shiki_mdbnqw">&quot;/etc/telegraf/cert.pem&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    tls_key = </span><span class="__shiki_mdbnqw">&quot;/etc/telegraf/key.pem&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    insecure_skip_verify = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 响应处理</span></span>
<span class="line"><span class="__shiki_140thh">  data_format = </span><span class="__shiki_mdbnqw">&quot;json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## JSON路径提取</span></span>
<span class="line"><span class="__shiki_140thh">  json_query = </span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;active_connections&quot;: &quot;$.active_connections&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;accepted_connections&quot;: &quot;$.accepted&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;handled_connections&quot;: &quot;$.handled&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;requests&quot;: &quot;$.requests&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;reading&quot;: &quot;$.reading&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;writing&quot;: &quot;$.writing&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;waiting&quot;: &quot;$.waiting&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Apache监控（mod_status）</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">apache</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  urls = [</span><span class="__shiki_mdbnqw">&quot;http://localhost/server-status?auto&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  insecure_skip_verify = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 字段转换</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">apache</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">fieldpass</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;ReqPerSec&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    dest = </span><span class="__shiki_mdbnqw">&quot;requests_per_second&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">apache</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">fieldpass</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;BytesPerSec&quot;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    dest = </span><span class="__shiki_mdbnqw">&quot;bytes_per_second&quot;</span></span></code></pre></div><h4 id="_3-2-2-数据库监控" tabindex="-1">3.2.2 数据库监控 <a class="header-anchor" href="#_3-2-2-数据库监控" aria-label="Permalink to &quot;3.2.2 数据库监控&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># PostgreSQL监控</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">postgresql</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  address = </span><span class="__shiki_mdbnqw">&quot;host=localhost user=postgres sslmode=disable&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 连接池配置</span></span>
<span class="line"><span class="__shiki_140thh">  max_lifetime = </span><span class="__shiki_mdbnqw">&quot;0s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  max_idle_connections = </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_140thh">  max_open_connections = </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 要监控的数据库</span></span>
<span class="line"><span class="__shiki_140thh">  databases = [</span><span class="__shiki_mdbnqw">&quot;postgres&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;appdb&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 查询配置</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">postgresql</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">query</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    sqlquery = </span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">        datname as database,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        numbackends as connections,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        xact_commit as commits,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        xact_rollback as rollbacks,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        blks_read as blocks_read,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        blks_hit as blocks_hit</span></span>
<span class="line"><span class="__shiki_mdbnqw">      FROM pg_stat_database</span></span>
<span class="line"><span class="__shiki_mdbnqw">      WHERE datname NOT IN (&#39;template0&#39;, &#39;template1&#39;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    version = </span><span class="__shiki_dzsirb">901</span><span class="__shiki_21nrsd">  # PostgreSQL 9.1+</span></span>
<span class="line"><span class="__shiki_140thh">    withdbname = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">postgresql</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">query</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    sqlquery = </span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">        schemaname as schema,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        relname as table,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        seq_scan as sequential_scans,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        seq_tup_read as sequential_tuples_read,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        idx_scan as index_scans,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        idx_tup_fetch as index_tuples_fetched,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        n_tup_ins as tuples_inserted,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        n_tup_upd as tuples_updated,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        n_tup_del as tuples_deleted,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        n_live_tup as live_tuples,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        n_dead_tup as dead_tuples</span></span>
<span class="line"><span class="__shiki_mdbnqw">      FROM pg_stat_user_tables</span></span>
<span class="line"><span class="__shiki_mdbnqw">      ORDER BY n_dead_tup DESC</span></span>
<span class="line"><span class="__shiki_mdbnqw">      LIMIT 20</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    measurement = </span><span class="__shiki_mdbnqw">&quot;postgresql_tables&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># MySQL监控</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">mysql</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  servers = [</span><span class="__shiki_mdbnqw">&quot;tcp(127.0.0.1:3306)/&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  username = </span><span class="__shiki_mdbnqw">&quot;telegraf&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  password = </span><span class="__shiki_mdbnqw">&quot;\${MYSQL_PASSWORD}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 性能Schema指标</span></span>
<span class="line"><span class="__shiki_140thh">  perf_events_statements_digest_text_limit = </span><span class="__shiki_dzsirb">120</span></span>
<span class="line"><span class="__shiki_140thh">  perf_events_statements_limit = </span><span class="__shiki_dzsirb">250</span></span>
<span class="line"><span class="__shiki_140thh">  perf_events_statements_time_limit = </span><span class="__shiki_dzsirb">86400</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 全局状态指标</span></span>
<span class="line"><span class="__shiki_140thh">  gather_global_status = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  gather_global_variables = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  gather_slave_status = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 表级指标</span></span>
<span class="line"><span class="__shiki_140thh">  gather_table_schema = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">  table_schema_databases = []</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 自定义查询</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">mysql</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">query</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    sqlquery = </span><span class="__shiki_mdbnqw">&quot;SHOW ENGINE INNODB STATUS&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    measurement = </span><span class="__shiki_mdbnqw">&quot;mysql_innodb&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">mysql</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">query</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    sqlquery = </span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">        table_schema as db,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        table_name as table,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        engine,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        table_rows,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        data_length,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        index_length,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        data_free</span></span>
<span class="line"><span class="__shiki_mdbnqw">      FROM information_schema.tables</span></span>
<span class="line"><span class="__shiki_mdbnqw">      WHERE table_schema NOT IN (&#39;information_schema&#39;, &#39;mysql&#39;, &#39;performance_schema&#39;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    measurement = </span><span class="__shiki_mdbnqw">&quot;mysql_tables&quot;</span></span></code></pre></div><h4 id="_3-2-3-消息队列监控" tabindex="-1">3.2.3 消息队列监控 <a class="header-anchor" href="#_3-2-3-消息队列监控" aria-label="Permalink to &quot;3.2.3 消息队列监控&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># RabbitMQ监控</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">rabbitmq</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  url = </span><span class="__shiki_mdbnqw">&quot;http://localhost:15672&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  username = </span><span class="__shiki_mdbnqw">&quot;\${RABBITMQ_USER}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  password = </span><span class="__shiki_mdbnqw">&quot;\${RABBITMQ_PASS}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 节点列表（集群环境）</span></span>
<span class="line"><span class="__shiki_140thh">  nodes = [</span><span class="__shiki_mdbnqw">&quot;rabbit@node1&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;rabbit@node2&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 队列过滤</span></span>
<span class="line"><span class="__shiki_140thh">  queues = [</span><span class="__shiki_mdbnqw">&quot;*&quot;</span><span class="__shiki_140thh">]  </span><span class="__shiki_21nrsd"># 所有队列</span></span>
<span class="line"><span class="__shiki_140thh">  queues_include = [</span><span class="__shiki_mdbnqw">&quot;important.*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  queues_exclude = [</span><span class="__shiki_mdbnqw">&quot;temp.*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 指标聚合</span></span>
<span class="line"><span class="__shiki_140thh">  aggregation_interval = </span><span class="__shiki_mdbnqw">&quot;30s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 详细指标</span></span>
<span class="line"><span class="__shiki_140thh">  metric_exclude = [</span><span class="__shiki_mdbnqw">&quot;message_stats.publish_details.rate&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  metric_include = [</span><span class="__shiki_mdbnqw">&quot;message_stats.*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Kafka监控</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">kafka_consumer</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  brokers = [</span><span class="__shiki_mdbnqw">&quot;localhost:9092&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  topics = [</span><span class="__shiki_mdbnqw">&quot;metrics&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;logs&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 消费者组</span></span>
<span class="line"><span class="__shiki_140thh">  consumer_group = </span><span class="__shiki_mdbnqw">&quot;telegraf&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 偏移量管理</span></span>
<span class="line"><span class="__shiki_140thh">  offset = </span><span class="__shiki_mdbnqw">&quot;oldest&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  max_undelivered_messages = </span><span class="__shiki_dzsirb">1000</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## SASL认证</span></span>
<span class="line"><span class="__shiki_140thh">  sasl_username = </span><span class="__shiki_mdbnqw">&quot;\${KAFKA_USER}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  sasl_password = </span><span class="__shiki_mdbnqw">&quot;\${KAFKA_PASS}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## TLS配置</span></span>
<span class="line"><span class="__shiki_140thh">  tls_cert = </span><span class="__shiki_mdbnqw">&quot;/etc/telegraf/client.pem&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  tls_key = </span><span class="__shiki_mdbnqw">&quot;/etc/telegraf/client.key&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  tls_ca = </span><span class="__shiki_mdbnqw">&quot;/etc/telegraf/ca.pem&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 数据格式</span></span>
<span class="line"><span class="__shiki_140thh">  data_format = </span><span class="__shiki_mdbnqw">&quot;json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  json_string_fields = [</span><span class="__shiki_mdbnqw">&quot;level&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;message&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  json_time_key = </span><span class="__shiki_mdbnqw">&quot;timestamp&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  json_time_format = </span><span class="__shiki_mdbnqw">&quot;unix_ms&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 标签提取</span></span>
<span class="line"><span class="__shiki_140thh">  tag_keys = [</span><span class="__shiki_mdbnqw">&quot;app&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;environment&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;host&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h3 id="_3-3-容器与编排平台监控" tabindex="-1">3.3 容器与编排平台监控 <a class="header-anchor" href="#_3-3-容器与编排平台监控" aria-label="Permalink to &quot;3.3 容器与编排平台监控&quot;">​</a></h3><h4 id="_3-3-1-docker监控" tabindex="-1">3.3.1 Docker监控 <a class="header-anchor" href="#_3-3-1-docker监控" aria-label="Permalink to &quot;3.3.1 Docker监控&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  endpoint = </span><span class="__shiki_mdbnqw">&quot;unix:///var/run/docker.sock&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 容器过滤</span></span>
<span class="line"><span class="__shiki_140thh">  container_names = []</span></span>
<span class="line"><span class="__shiki_140thh">  container_name_include = [</span><span class="__shiki_mdbnqw">&quot;app-.*&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;web-.*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  container_name_exclude = [</span><span class="__shiki_mdbnqw">&quot;^test-&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;dev-.*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 指标收集配置</span></span>
<span class="line"><span class="__shiki_140thh">  perdevice = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  total = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 标签收集</span></span>
<span class="line"><span class="__shiki_140thh">  docker_label_include = [</span><span class="__shiki_mdbnqw">&quot;version&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;environment&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  docker_label_exclude = [</span><span class="__shiki_mdbnqw">&quot;com.docker.*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 容器状态过滤</span></span>
<span class="line"><span class="__shiki_140thh">  container_state_include = [</span><span class="__shiki_mdbnqw">&quot;running&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;paused&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  container_state_exclude = [</span><span class="__shiki_mdbnqw">&quot;created&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;dead&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 超时设置</span></span>
<span class="line"><span class="__shiki_140thh">  timeout = </span><span class="__shiki_mdbnqw">&quot;5s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 详细指标</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    name_override = </span><span class="__shiki_mdbnqw">&quot;docker_container_details&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      source = </span><span class="__shiki_mdbnqw">&quot;stats&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      name = </span><span class="__shiki_mdbnqw">&quot;cpu_usage&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      path = </span><span class="__shiki_mdbnqw">&quot;cpu_stats.cpu_usage.total_usage&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      source = </span><span class="__shiki_mdbnqw">&quot;stats&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      name = </span><span class="__shiki_mdbnqw">&quot;memory_usage&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      path = </span><span class="__shiki_mdbnqw">&quot;memory_stats.usage&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      source = </span><span class="__shiki_mdbnqw">&quot;stats&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      name = </span><span class="__shiki_mdbnqw">&quot;network_rx_bytes&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      path = </span><span class="__shiki_mdbnqw">&quot;networks.eth0.rx_bytes&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">## Docker日志收集</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">docker_log</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  endpoint = </span><span class="__shiki_mdbnqw">&quot;unix:///var/run/docker.sock&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 容器选择</span></span>
<span class="line"><span class="__shiki_140thh">  containers = [</span><span class="__shiki_mdbnqw">&quot;/^app-.*/&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 日志过滤</span></span>
<span class="line"><span class="__shiki_140thh">  source = </span><span class="__shiki_mdbnqw">&quot;stdout&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  log_options = {</span></span>
<span class="line"><span class="__shiki_140thh">    follow = </span><span class="__shiki_mdbnqw">&quot;true&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    tail = </span><span class="__shiki_mdbnqw">&quot;100&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    timestamps = </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 日志解析</span></span>
<span class="line"><span class="__shiki_140thh">  docker_label = {}</span></span>
<span class="line"><span class="__shiki_140thh">  data_format = </span><span class="__shiki_mdbnqw">&quot;grok&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  grok_patterns = [</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;%{TIMESTAMP_ISO8601:timestamp} %{LOGLEVEL:level} %{GREEDYDATA:message}&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  grok_timezone = </span><span class="__shiki_mdbnqw">&quot;UTC&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  grok_custom_patterns = </span><span class="__shiki_mdbnqw">&#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    LOGLEVEL (DEBUG|INFO|WARN|ERROR|FATAL)</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;&#39;&#39;</span></span></code></pre></div><h4 id="_3-3-2-kubernetes监控" tabindex="-1">3.3.2 Kubernetes监控 <a class="header-anchor" href="#_3-3-2-kubernetes监控" aria-label="Permalink to &quot;3.3.2 Kubernetes监控&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">kubernetes</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  url = </span><span class="__shiki_mdbnqw">&quot;https://\${KUBERNETES_SERVICE_HOST}:\${KUBERNETES_SERVICE_PORT}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 认证</span></span>
<span class="line"><span class="__shiki_140thh">  bearer_token = </span><span class="__shiki_mdbnqw">&quot;/var/run/secrets/kubernetes.io/serviceaccount/token&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  insecure_skip_verify = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 资源收集</span></span>
<span class="line"><span class="__shiki_140thh">  enable_kube_dns = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  enable_cadvisor = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 命名空间过滤</span></span>
<span class="line"><span class="__shiki_140thh">  namespace = </span><span class="__shiki_mdbnqw">&quot;default&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  monitor_kubernetes_pods = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  monitor_kubernetes_nodes = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 标签选择器</span></span>
<span class="line"><span class="__shiki_140thh">  label_selector = </span><span class="__shiki_mdbnqw">&quot;app in (web, api, database)&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  field_selector = </span><span class="__shiki_mdbnqw">&quot;status.phase=Running&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 指标详细程度</span></span>
<span class="line"><span class="__shiki_140thh">  resource_include = [</span><span class="__shiki_mdbnqw">&quot;limits.cpu&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;limits.memory&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;requests.cpu&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;requests.memory&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  resource_exclude = [</span><span class="__shiki_mdbnqw">&quot;*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 自定义指标</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">kubernetes</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">custom_metrics</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    namespace = </span><span class="__shiki_mdbnqw">&quot;custom-metrics&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    interval = </span><span class="__shiki_mdbnqw">&quot;30s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">kubernetes</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">custom_metrics</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">metric</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      name = </span><span class="__shiki_mdbnqw">&quot;http_requests_per_second&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      selector = </span><span class="__shiki_mdbnqw">&quot;app=web&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      query = </span><span class="__shiki_mdbnqw">&quot;sum(rate(http_requests_total[5m])) by (pod)&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## Kube-state-metrics集成</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    urls = [</span><span class="__shiki_mdbnqw">&quot;http://kube-state-metrics:8080/metrics&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    ## 指标重命名</span></span>
<span class="line"><span class="__shiki_140thh">    metric_version = </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">measurement</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      prefix = </span><span class="__shiki_mdbnqw">&quot;kube_&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      name = </span><span class="__shiki_mdbnqw">&quot;kubernetes_state&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    ## 标签映射</span></span>
<span class="line"><span class="__shiki_140thh">    tagpass = {</span></span>
<span class="line"><span class="__shiki_140thh">      &quot;namespace&quot; = [</span><span class="__shiki_mdbnqw">&quot;production&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;staging&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span></code></pre></div><h3 id="_3-4-网络设备与协议监控" tabindex="-1">3.4 网络设备与协议监控 <a class="header-anchor" href="#_3-4-网络设备与协议监控" aria-label="Permalink to &quot;3.4 网络设备与协议监控&quot;">​</a></h3><h4 id="_3-4-1-snmp设备监控" tabindex="-1">3.4.1 SNMP设备监控 <a class="header-anchor" href="#_3-4-1-snmp设备监控" aria-label="Permalink to &quot;3.4.1 SNMP设备监控&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">snmp</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  agents = [</span><span class="__shiki_mdbnqw">&quot;udp://192.168.1.1:161&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;udp://192.168.1.2:161&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## SNMP版本和社区</span></span>
<span class="line"><span class="__shiki_140thh">  version = </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_140thh">  community = </span><span class="__shiki_mdbnqw">&quot;\${SNMP_COMMUNITY}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 超时和重试</span></span>
<span class="line"><span class="__shiki_140thh">  timeout = </span><span class="__shiki_mdbnqw">&quot;5s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  retries = </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 批量获取配置</span></span>
<span class="line"><span class="__shiki_140thh">  max_repetitions = </span><span class="__shiki_dzsirb">50</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 系统信息表</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">snmp</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">table</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    name = </span><span class="__shiki_mdbnqw">&quot;sysInfo&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    oid = </span><span class="__shiki_mdbnqw">&quot;.1.3.6.1.2.1.1&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">snmp</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">table</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      oid = </span><span class="__shiki_mdbnqw">&quot;.1.3.6.1.2.1.1.1.0&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      name = </span><span class="__shiki_mdbnqw">&quot;sysDescr&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      is_tag = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">snmp</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">table</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      oid = </span><span class="__shiki_mdbnqw">&quot;.1.3.6.1.2.1.1.5.0&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      name = </span><span class="__shiki_mdbnqw">&quot;sysName&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      is_tag = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 接口表</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">snmp</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">table</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    name = </span><span class="__shiki_mdbnqw">&quot;ifTable&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    oid = </span><span class="__shiki_mdbnqw">&quot;.1.3.6.1.2.1.2.2&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    inherit_tags = [</span><span class="__shiki_mdbnqw">&quot;sysName&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">snmp</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">table</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      oid = </span><span class="__shiki_mdbnqw">&quot;.1.3.6.1.2.1.2.2.1.1&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      name = </span><span class="__shiki_mdbnqw">&quot;ifIndex&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      is_tag = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">snmp</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">table</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      oid = </span><span class="__shiki_mdbnqw">&quot;.1.3.6.1.2.1.2.2.1.2&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      name = </span><span class="__shiki_mdbnqw">&quot;ifDescr&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      is_tag = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">snmp</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">table</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      oid = </span><span class="__shiki_mdbnqw">&quot;.1.3.6.1.2.1.2.2.1.10&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      name = </span><span class="__shiki_mdbnqw">&quot;ifInOctets&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">snmp</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">table</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      oid = </span><span class="__shiki_mdbnqw">&quot;.1.3.6.1.2.1.2.2.1.16&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      name = </span><span class="__shiki_mdbnqw">&quot;ifOutOctets&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 自定义OID</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">snmp</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    oid = </span><span class="__shiki_mdbnqw">&quot;.1.3.6.1.4.1.9.9.13.1.3.1.3&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    name = </span><span class="__shiki_mdbnqw">&quot;cisco_cpu_5min&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    conversion = </span><span class="__shiki_mdbnqw">&quot;float&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">snmp</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    oid = </span><span class="__shiki_mdbnqw">&quot;.1.3.6.1.4.1.9.9.109.1.1.1.1.8&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    name = </span><span class="__shiki_mdbnqw">&quot;cisco_memory_used&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">snmp</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    oid = </span><span class="__shiki_mdbnqw">&quot;.1.3.6.1.4.1.9.9.109.1.1.1.1.5&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    name = </span><span class="__shiki_mdbnqw">&quot;cisco_memory_free&quot;</span></span></code></pre></div><h4 id="_3-4-2-netflow-sflow监控" tabindex="-1">3.4.2 NetFlow/sFlow监控 <a class="header-anchor" href="#_3-4-2-netflow-sflow监控" aria-label="Permalink to &quot;3.4.2 NetFlow/sFlow监控&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">netflow</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  service_address = </span><span class="__shiki_mdbnqw">&quot;udp://:2055&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 协议版本</span></span>
<span class="line"><span class="__shiki_140thh">  protocol = </span><span class="__shiki_mdbnqw">&quot;netflow&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  netflow_version = </span><span class="__shiki_dzsirb">9</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 模板缓存</span></span>
<span class="line"><span class="__shiki_140thh">  template_timeout = </span><span class="__shiki_mdbnqw">&quot;30m&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 字段映射</span></span>
<span class="line"><span class="__shiki_140thh">  field_separator = </span><span class="__shiki_mdbnqw">&quot;_&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 标签提取</span></span>
<span class="line"><span class="__shiki_140thh">  tag_keys = [</span><span class="__shiki_mdbnqw">&quot;src&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;dst&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;srcport&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;dstport&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;proto&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 采样率</span></span>
<span class="line"><span class="__shiki_140thh">  sampling_rate = </span><span class="__shiki_dzsirb">1000</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 流量过滤</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">netflow</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;bytes&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    operator = </span><span class="__shiki_mdbnqw">&quot;&gt;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    value = </span><span class="__shiki_dzsirb">1000</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">netflow</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;proto&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    operator = </span><span class="__shiki_mdbnqw">&quot;in&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    value = [</span><span class="__shiki_mdbnqw">&quot;tcp&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;udp&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">## sFlow监控</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sflow</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  service_address = </span><span class="__shiki_mdbnqw">&quot;udp://:6343&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 采样配置</span></span>
<span class="line"><span class="__shiki_140thh">  sampling = </span><span class="__shiki_dzsirb">1024</span></span>
<span class="line"><span class="__shiki_140thh">  polling = </span><span class="__shiki_dzsirb">30</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 计数器</span></span>
<span class="line"><span class="__shiki_140thh">  counter_poll_interval = </span><span class="__shiki_dzsirb">20</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 流量类型过滤</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sflow</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">flow</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    type = </span><span class="__shiki_mdbnqw">&quot;ipv4&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sflow</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">flow</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    type = </span><span class="__shiki_mdbnqw">&quot;ipv6&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sflow</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">flow</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    type = </span><span class="__shiki_mdbnqw">&quot;ethernet&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 自定义字段</span></span>
<span class="line"><span class="__shiki_140thh">  custom_fields = [</span><span class="__shiki_mdbnqw">&quot;vlan&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;mpls&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h2 id="四、处理器插件深度应用" tabindex="-1">四、处理器插件深度应用 <a class="header-anchor" href="#四、处理器插件深度应用" aria-label="Permalink to &quot;四、处理器插件深度应用&quot;">​</a></h2><h3 id="_4-1-数据转换与清洗" tabindex="-1">4.1 数据转换与清洗 <a class="header-anchor" href="#_4-1-数据转换与清洗" aria-label="Permalink to &quot;4.1 数据转换与清洗&quot;">​</a></h3><h4 id="_4-1-1-转换器处理器" tabindex="-1">4.1.1 转换器处理器 <a class="header-anchor" href="#_4-1-1-转换器处理器" aria-label="Permalink to &quot;4.1.1 转换器处理器&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 数据转换流水线</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">converter</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 字段类型转换</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">converter</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">fields</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    integer = [</span><span class="__shiki_mdbnqw">&quot;response_time_ms&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;status_code&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    float = [</span><span class="__shiki_mdbnqw">&quot;temperature&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;humidity&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    string = [</span><span class="__shiki_mdbnqw">&quot;device_id&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;location&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    boolean = [</span><span class="__shiki_mdbnqw">&quot;alarm_status&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;connected&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    tag = [</span><span class="__shiki_mdbnqw">&quot;hostname&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;region&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    measurement = [</span><span class="__shiki_mdbnqw">&quot;metric_name&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 重命名处理器</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">rename</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 重命名字段</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">rename</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">replace</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;cpu_usage_percent&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    dest = </span><span class="__shiki_mdbnqw">&quot;cpu_utilization&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">rename</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">replace</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;mem_usage_bytes&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    dest = </span><span class="__shiki_mdbnqw">&quot;memory_used&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 批量重命名（正则表达式）</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">rename</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    measurement = </span><span class="__shiki_mdbnqw">&quot;.*&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    replace = {</span></span>
<span class="line"><span class="__shiki_140thh">      &quot;usage_&quot; = </span><span class="__shiki_mdbnqw">&quot;utilization_&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      &quot;_bytes$&quot; = </span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      &quot;^sys_&quot; = </span><span class="__shiki_mdbnqw">&quot;system_&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 字符串处理器</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">strings</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">strings</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">lowercase</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;log_level&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">strings</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">trim</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;message&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    cutset = </span><span class="__shiki_mdbnqw">&quot; </span><span class="__shiki_dzsirb">\\t\\n\\r</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">strings</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">trim_prefix</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;file_path&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    prefix = </span><span class="__shiki_mdbnqw">&quot;/var/log/&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">strings</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">replace</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;error_message&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    old = </span><span class="__shiki_mdbnqw">&quot;ERROR&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    new = </span><span class="__shiki_mdbnqw">&quot;FAILURE&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">strings</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">left</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;long_text&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    width = </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">strings</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">padding</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;id&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    width = </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">    padding = </span><span class="__shiki_mdbnqw">&quot;0&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    side = </span><span class="__shiki_mdbnqw">&quot;left&quot;</span></span></code></pre></div><h4 id="_4-1-2-正则表达式处理器" tabindex="-1">4.1.2 正则表达式处理器 <a class="header-anchor" href="#_4-1-2-正则表达式处理器" aria-label="Permalink to &quot;4.1.2 正则表达式处理器&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">regex</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 字段提取模式</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">regex</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">fields</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    key = </span><span class="__shiki_mdbnqw">&quot;message&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    pattern = </span><span class="__shiki_mdbnqw">&#39;^(?P&lt;timestamp&gt;\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) \\[(?P&lt;level&gt;\\w+)\\] (?P&lt;logger&gt;\\w+): (?P&lt;msg&gt;.*)$&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    ## 捕获组重命名</span></span>
<span class="line"><span class="__shiki_140thh">    replacement = </span><span class="__shiki_mdbnqw">&quot;\${timestamp} \${level} \${logger} \${msg}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    ## 结果处理</span></span>
<span class="line"><span class="__shiki_140thh">    result_key = </span><span class="__shiki_mdbnqw">&quot;parsed_message&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    append = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 标签提取</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">regex</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">tags</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    key = </span><span class="__shiki_mdbnqw">&quot;url&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    pattern = </span><span class="__shiki_mdbnqw">&#39;^https?://(?P&lt;domain&gt;[^/]+)/(?P&lt;path&gt;.*)$&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">regex</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">tags</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">result</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      key = </span><span class="__shiki_mdbnqw">&quot;domain&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      dest = </span><span class="__shiki_mdbnqw">&quot;web_domain&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">regex</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">tags</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">result</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      key = </span><span class="__shiki_mdbnqw">&quot;path&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      dest = </span><span class="__shiki_mdbnqw">&quot;url_path&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 条件处理</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">regex</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    namepass = [</span><span class="__shiki_mdbnqw">&quot;nginx_access&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">regex</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">fields</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      key = </span><span class="__shiki_mdbnqw">&quot;request&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      pattern = </span><span class="__shiki_mdbnqw">&#39;^(?P&lt;method&gt;\\w+) (?P&lt;path&gt;[^ ]+) HTTP/(?P&lt;version&gt;[\\d.]+)$&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">regex</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">fields</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">result</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">        key = </span><span class="__shiki_mdbnqw">&quot;method&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        dest = </span><span class="__shiki_mdbnqw">&quot;http_method&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">      [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">regex</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">fields</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">result</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">        key = </span><span class="__shiki_mdbnqw">&quot;path&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        dest = </span><span class="__shiki_mdbnqw">&quot;http_path&quot;</span></span></code></pre></div><h3 id="_4-2-数据丰富与增强" tabindex="-1">4.2 数据丰富与增强 <a class="header-anchor" href="#_4-2-数据丰富与增强" aria-label="Permalink to &quot;4.2 数据丰富与增强&quot;">​</a></h3><h4 id="_4-2-1-查找与关联处理器" tabindex="-1">4.2.1 查找与关联处理器 <a class="header-anchor" href="#_4-2-1-查找与关联处理器" aria-label="Permalink to &quot;4.2.1 查找与关联处理器&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 文件查找处理器</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">file</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 查找表文件</span></span>
<span class="line"><span class="__shiki_140thh">  files = [</span><span class="__shiki_mdbnqw">&quot;/etc/telegraf/lookup.csv&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 文件格式</span></span>
<span class="line"><span class="__shiki_140thh">  format = </span><span class="__shiki_mdbnqw">&quot;csv&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  column_names = [</span><span class="__shiki_mdbnqw">&quot;ip&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;hostname&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;department&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;location&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 查找键</span></span>
<span class="line"><span class="__shiki_140thh">  key = </span><span class="__shiki_mdbnqw">&quot;src_ip&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 结果映射</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">file</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">tag</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    hostname = </span><span class="__shiki_mdbnqw">&quot;device_name&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    department = </span><span class="__shiki_mdbnqw">&quot;dept&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    location = </span><span class="__shiki_mdbnqw">&quot;site&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">file</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    none = </span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_21nrsd">  # 不添加字段，只添加标签</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 缓存配置</span></span>
<span class="line"><span class="__shiki_140thh">  cache_ttl = </span><span class="__shiki_mdbnqw">&quot;10m&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  cache_size = </span><span class="__shiki_dzsirb">1000</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 默认值</span></span>
<span class="line"><span class="__shiki_140thh">  defaults = {</span></span>
<span class="line"><span class="__shiki_140thh">    &quot;department&quot; = </span><span class="__shiki_mdbnqw">&quot;unknown&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    &quot;location&quot; = </span><span class="__shiki_mdbnqw">&quot;remote&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># DNS解析处理器</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">dns</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 查询字段</span></span>
<span class="line"><span class="__shiki_140thh">  field = </span><span class="__shiki_mdbnqw">&quot;src_ip&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  dest = </span><span class="__shiki_mdbnqw">&quot;src_hostname&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## DNS服务器</span></span>
<span class="line"><span class="__shiki_140thh">  servers = [</span><span class="__shiki_mdbnqw">&quot;8.8.8.8&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;1.1.1.1&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 查询类型</span></span>
<span class="line"><span class="__shiki_140thh">  record_type = </span><span class="__shiki_mdbnqw">&quot;A,AAAA,PTR,CNAME&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 端口</span></span>
<span class="line"><span class="__shiki_140thh">  port = </span><span class="__shiki_dzsirb">53</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 超时</span></span>
<span class="line"><span class="__shiki_140thh">  timeout = </span><span class="__shiki_mdbnqw">&quot;2s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 网络协议</span></span>
<span class="line"><span class="__shiki_140thh">  network = </span><span class="__shiki_mdbnqw">&quot;udp&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 缓存</span></span>
<span class="line"><span class="__shiki_140thh">  cache_ttl = </span><span class="__shiki_mdbnqw">&quot;300s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  cache_size = </span><span class="__shiki_dzsirb">10000</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 顺序</span></span>
<span class="line"><span class="__shiki_140thh">  order = </span><span class="__shiki_mdbnqw">&quot;random&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 并发</span></span>
<span class="line"><span class="__shiki_140thh">  max_parallel = </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 反向地理编码处理器</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">geoip</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## IP字段</span></span>
<span class="line"><span class="__shiki_140thh">  field = </span><span class="__shiki_mdbnqw">&quot;client_ip&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 数据库文件</span></span>
<span class="line"><span class="__shiki_140thh">  database = </span><span class="__shiki_mdbnqw">&quot;/usr/share/GeoIP/GeoLite2-City.mmdb&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 输出字段</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">geoip</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    city = </span><span class="__shiki_mdbnqw">&quot;geo_city&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    country = </span><span class="__shiki_mdbnqw">&quot;geo_country&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    country_code = </span><span class="__shiki_mdbnqw">&quot;geo_country_code&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    latitude = </span><span class="__shiki_mdbnqw">&quot;geo_latitude&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    longitude = </span><span class="__shiki_mdbnqw">&quot;geo_longitude&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    timezone = </span><span class="__shiki_mdbnqw">&quot;geo_timezone&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    continent = </span><span class="__shiki_mdbnqw">&quot;geo_continent&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 标签输出</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">geoip</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">tag</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    country = </span><span class="__shiki_mdbnqw">&quot;country&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    city = </span><span class="__shiki_mdbnqw">&quot;city&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 缓存</span></span>
<span class="line"><span class="__shiki_140thh">  cache_size = </span><span class="__shiki_dzsirb">10000</span></span></code></pre></div><h4 id="_4-2-2-时间处理器" tabindex="-1">4.2.2 时间处理器 <a class="header-anchor" href="#_4-2-2-时间处理器" aria-label="Permalink to &quot;4.2.2 时间处理器&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 时间字段</span></span>
<span class="line"><span class="__shiki_140thh">  field = </span><span class="__shiki_mdbnqw">&quot;timestamp&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 输入格式</span></span>
<span class="line"><span class="__shiki_140thh">  input_format = </span><span class="__shiki_mdbnqw">&quot;unix_ms&quot;</span><span class="__shiki_21nrsd">  # 支持: unix, unix_ms, unix_us, unix_ns, RFC3339, 自定义</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 自定义格式</span></span>
<span class="line"><span class="__shiki_140thh">  input_format_custom = </span><span class="__shiki_mdbnqw">&quot;2006-01-02 15:04:05.000&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 输出格式</span></span>
<span class="line"><span class="__shiki_140thh">  output_format = </span><span class="__shiki_mdbnqw">&quot;RFC3339&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  output_format_custom = </span><span class="__shiki_mdbnqw">&quot;2006-01-02T15:04:05Z&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 时区处理</span></span>
<span class="line"><span class="__shiki_140thh">  input_timezone = </span><span class="__shiki_mdbnqw">&quot;UTC&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  output_timezone = </span><span class="__shiki_mdbnqw">&quot;America/New_York&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 字段重命名</span></span>
<span class="line"><span class="__shiki_140thh">  dest = </span><span class="__shiki_mdbnqw">&quot;parsed_timestamp&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 回退到现有时间</span></span>
<span class="line"><span class="__shiki_140thh">  fallback_to_timestamp = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 日期提取</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">extract</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;parsed_timestamp&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">extract</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">part</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      name = </span><span class="__shiki_mdbnqw">&quot;year&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      format = </span><span class="__shiki_mdbnqw">&quot;2006&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">extract</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">part</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      name = </span><span class="__shiki_mdbnqw">&quot;month&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      format = </span><span class="__shiki_mdbnqw">&quot;01&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">extract</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">part</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      name = </span><span class="__shiki_mdbnqw">&quot;day&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      format = </span><span class="__shiki_mdbnqw">&quot;02&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">extract</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">part</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      name = </span><span class="__shiki_mdbnqw">&quot;hour&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      format = </span><span class="__shiki_mdbnqw">&quot;15&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">extract</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">part</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      name = </span><span class="__shiki_mdbnqw">&quot;weekday&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      format = </span><span class="__shiki_mdbnqw">&quot;Monday&quot;</span></span></code></pre></div><h3 id="_4-3-数学与统计处理器" tabindex="-1">4.3 数学与统计处理器 <a class="header-anchor" href="#_4-3-数学与统计处理器" aria-label="Permalink to &quot;4.3 数学与统计处理器&quot;">​</a></h3><h4 id="_4-3-1-数学运算处理器" tabindex="-1">4.3.1 数学运算处理器 <a class="header-anchor" href="#_4-3-1-数学运算处理器" aria-label="Permalink to &quot;4.3.1 数学运算处理器&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">math</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 数学运算表达式</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">math</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">operation</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;temperature_c&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    dest = </span><span class="__shiki_mdbnqw">&quot;temperature_f&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    expression = </span><span class="__shiki_mdbnqw">&quot;value * 9/5 + 32&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">math</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">operation</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;bytes_received&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    dest = </span><span class="__shiki_mdbnqw">&quot;mb_received&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    expression = </span><span class="__shiki_mdbnqw">&quot;value / (1024 * 1024)&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">math</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">operation</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;response_time_ms&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    dest = </span><span class="__shiki_mdbnqw">&quot;response_time_s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    expression = </span><span class="__shiki_mdbnqw">&quot;value / 1000&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 多字段运算</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">math</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">operation</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    dest = </span><span class="__shiki_mdbnqw">&quot;throughput_mbps&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    expression = </span><span class="__shiki_mdbnqw">&quot;(bytes_sent + bytes_received) * 8 / (time_interval * 1000000)&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 条件运算</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">math</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">operation</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;cpu_usage&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    dest = </span><span class="__shiki_mdbnqw">&quot;cpu_usage_normalized&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    expression = </span><span class="__shiki_mdbnqw">&quot;if(value &gt; 100, 100, if(value &lt; 0, 0, value))&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 使用常量</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">math</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">operation</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;price&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    dest = </span><span class="__shiki_mdbnqw">&quot;price_with_tax&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    expression = </span><span class="__shiki_mdbnqw">&quot;value * 1.08&quot;</span><span class="__shiki_21nrsd">  # 8%税率</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 单位转换</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">math</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">unit</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;memory_used&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    source = </span><span class="__shiki_mdbnqw">&quot;bytes&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    dest = </span><span class="__shiki_mdbnqw">&quot;megabytes&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 聚合运算</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">math</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    order = </span><span class="__shiki_dzsirb">100</span><span class="__shiki_21nrsd">  # 在聚合器后执行</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">math</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">operation</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      dest = </span><span class="__shiki_mdbnqw">&quot;avg_response_time&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      expression = </span><span class="__shiki_mdbnqw">&quot;sum(response_time) / count(response_time)&quot;</span></span></code></pre></div><h4 id="_4-3-2-统计处理器" tabindex="-1">4.3.2 统计处理器 <a class="header-anchor" href="#_4-3-2-统计处理器" aria-label="Permalink to &quot;4.3.2 统计处理器&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stats</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 时间窗口配置</span></span>
<span class="line"><span class="__shiki_140thh">  period = </span><span class="__shiki_mdbnqw">&quot;1m&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  delay = </span><span class="__shiki_mdbnqw">&quot;10s&quot;</span><span class="__shiki_21nrsd">  # 处理延迟数据</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 字段统计</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stats</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    name = </span><span class="__shiki_mdbnqw">&quot;response_time&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    ## 统计函数</span></span>
<span class="line"><span class="__shiki_140thh">    functions = [</span><span class="__shiki_mdbnqw">&quot;mean&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;median&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;min&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;max&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;count&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;stddev&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;sum&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    ## 百分位数</span></span>
<span class="line"><span class="__shiki_140thh">    percentiles = [</span><span class="__shiki_dzsirb">90</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">95</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">99</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    ## 直方图</span></span>
<span class="line"><span class="__shiki_140thh">    histogram_buckets = [</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">25</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">250</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">500</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 滑动窗口</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stats</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    namepass = [</span><span class="__shiki_mdbnqw">&quot;http_requests&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    algorithm = </span><span class="__shiki_mdbnqw">&quot;exponential&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    decay = </span><span class="__shiki_dzsirb">0.9</span><span class="__shiki_21nrsd">  # 指数衰减因子</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stats</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      name = </span><span class="__shiki_mdbnqw">&quot;latency&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      functions = [</span><span class="__shiki_mdbnqw">&quot;exponential_moving_average&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 分组统计</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stats</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    group_by = [</span><span class="__shiki_mdbnqw">&quot;host&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;endpoint&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stats</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      name = </span><span class="__shiki_mdbnqw">&quot;request_count&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      functions = [</span><span class="__shiki_mdbnqw">&quot;sum&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 异常检测</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stats</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stats</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      name = </span><span class="__shiki_mdbnqw">&quot;temperature&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      functions = [</span><span class="__shiki_mdbnqw">&quot;zscore&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">    ## 异常标记</span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stats</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">anomaly</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      field = </span><span class="__shiki_mdbnqw">&quot;temperature_zscore&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      threshold = </span><span class="__shiki_dzsirb">3.0</span></span>
<span class="line"><span class="__shiki_140thh">      dest = </span><span class="__shiki_mdbnqw">&quot;temperature_anomaly&quot;</span></span></code></pre></div><h2 id="五、聚合器插件高级应用" tabindex="-1">五、聚合器插件高级应用 <a class="header-anchor" href="#五、聚合器插件高级应用" aria-label="Permalink to &quot;五、聚合器插件高级应用&quot;">​</a></h2><h3 id="_5-1-时间窗口聚合" tabindex="-1">5.1 时间窗口聚合 <a class="header-anchor" href="#_5-1-时间窗口聚合" aria-label="Permalink to &quot;5.1 时间窗口聚合&quot;">​</a></h3><h4 id="_5-1-1-基本聚合器配置" tabindex="-1">5.1.1 基本聚合器配置 <a class="header-anchor" href="#_5-1-1-基本聚合器配置" aria-label="Permalink to &quot;5.1.1 基本聚合器配置&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">aggregators</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">basicstats</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 聚合周期</span></span>
<span class="line"><span class="__shiki_140thh">  period = </span><span class="__shiki_mdbnqw">&quot;30s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 聚合延迟（处理延迟数据）</span></span>
<span class="line"><span class="__shiki_140thh">  delay = </span><span class="__shiki_mdbnqw">&quot;10s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 指标过滤</span></span>
<span class="line"><span class="__shiki_140thh">  namepass = [</span><span class="__shiki_mdbnqw">&quot;cpu&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;memory&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;disk&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  namedrop = [</span><span class="__shiki_mdbnqw">&quot;cpu_temp&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 字段统计</span></span>
<span class="line"><span class="__shiki_140thh">  stats = [</span><span class="__shiki_mdbnqw">&quot;count&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;min&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;max&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;mean&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;stdev&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;s2&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;sum&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 字段选择</span></span>
<span class="line"><span class="__shiki_140thh">  fieldpass = [</span><span class="__shiki_mdbnqw">&quot;usage_percent&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;used_bytes&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  fielddrop = [</span><span class="__shiki_mdbnqw">&quot;timestamp&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;id&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 标签过滤</span></span>
<span class="line"><span class="__shiki_140thh">  tagpass = {</span></span>
<span class="line"><span class="__shiki_140thh">    &quot;environment&quot; = [</span><span class="__shiki_mdbnqw">&quot;production&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;staging&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  tagdrop = {</span></span>
<span class="line"><span class="__shiki_140thh">    &quot;host&quot; = [</span><span class="__shiki_mdbnqw">&quot;test-*&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;dev-*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 分组配置</span></span>
<span class="line"><span class="__shiki_140thh">  group_by = [</span><span class="__shiki_mdbnqw">&quot;host&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;region&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 输出配置</span></span>
<span class="line"><span class="__shiki_140thh">  name_override = </span><span class="__shiki_mdbnqw">&quot;aggregated_stats&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  name_prefix = </span><span class="__shiki_mdbnqw">&quot;agg_&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  name_suffix = </span><span class="__shiki_mdbnqw">&quot;_30s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 时间戳处理</span></span>
<span class="line"><span class="__shiki_140thh">  timestamp = </span><span class="__shiki_mdbnqw">&quot;middle&quot;</span><span class="__shiki_21nrsd">  # 可选: first, last, middle</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 过期数据</span></span>
<span class="line"><span class="__shiki_140thh">  drop_original = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">  max_expiration = </span><span class="__shiki_mdbnqw">&quot;5m&quot;</span></span></code></pre></div><h4 id="_5-1-2-直方图聚合器" tabindex="-1">5.1.2 直方图聚合器 <a class="header-anchor" href="#_5-1-2-直方图聚合器" aria-label="Permalink to &quot;5.1.2 直方图聚合器&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">aggregators</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">histogram</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 直方图配置</span></span>
<span class="line"><span class="__shiki_140thh">  period = </span><span class="__shiki_mdbnqw">&quot;1m&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 直方图桶配置</span></span>
<span class="line"><span class="__shiki_140thh">  buckets = [</span><span class="__shiki_dzsirb">0.1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0.5</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1.0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2.5</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">5.0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10.0</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 字段选择</span></span>
<span class="line"><span class="__shiki_140thh">  fields = [</span><span class="__shiki_mdbnqw">&quot;response_time&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;latency&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 桶类型</span></span>
<span class="line"><span class="__shiki_140thh">  bucket_type = </span><span class="__shiki_mdbnqw">&quot;explicit&quot;</span><span class="__shiki_21nrsd">  # 可选: explicit, linear, exponential</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 线性桶配置</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">aggregators</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">histogram</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    bucket_type = </span><span class="__shiki_mdbnqw">&quot;linear&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    start = </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">    width = </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_140thh">    count = </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 指数桶配置  </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">aggregators</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">histogram</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    bucket_type = </span><span class="__shiki_mdbnqw">&quot;exponential&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    start = </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_140thh">    factor = </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_140thh">    count = </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 标签保留</span></span>
<span class="line"><span class="__shiki_140thh">  retain_tags = [</span><span class="__shiki_mdbnqw">&quot;host&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;service&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 输出格式</span></span>
<span class="line"><span class="__shiki_140thh">  cumulative = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">  normalize = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 统计信息</span></span>
<span class="line"><span class="__shiki_140thh">  include_statistics = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  statistics = [</span><span class="__shiki_mdbnqw">&quot;count&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;min&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;max&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;mean&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;sum&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h3 id="_5-2-流式聚合与复杂计算" tabindex="-1">5.2 流式聚合与复杂计算 <a class="header-anchor" href="#_5-2-流式聚合与复杂计算" aria-label="Permalink to &quot;5.2 流式聚合与复杂计算&quot;">​</a></h3><h4 id="_5-2-1-最小最大值聚合器" tabindex="-1">5.2.1 最小最大值聚合器 <a class="header-anchor" href="#_5-2-1-最小最大值聚合器" aria-label="Permalink to &quot;5.2.1 最小最大值聚合器&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">aggregators</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">minmax</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  period = </span><span class="__shiki_mdbnqw">&quot;5m&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 字段配置</span></span>
<span class="line"><span class="__shiki_140thh">  fields = [</span><span class="__shiki_mdbnqw">&quot;temperature&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;pressure&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;humidity&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 滑动窗口</span></span>
<span class="line"><span class="__shiki_140thh">  algorithm = </span><span class="__shiki_mdbnqw">&quot;sliding&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  window_size = </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 重置条件</span></span>
<span class="line"><span class="__shiki_140thh">  reset_interval = </span><span class="__shiki_mdbnqw">&quot;1h&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 异常值处理</span></span>
<span class="line"><span class="__shiki_140thh">  outlier_removal = </span><span class="__shiki_mdbnqw">&quot;iqr&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  iqr_multiplier = </span><span class="__shiki_dzsirb">1.5</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 自定义阈值</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">aggregators</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">minmax</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">threshold</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;temperature&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    min = </span><span class="__shiki_dzsirb">-20</span></span>
<span class="line"><span class="__shiki_140thh">    max = </span><span class="__shiki_dzsirb">50</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    ## 阈值触发动作</span></span>
<span class="line"><span class="__shiki_140thh">    [</span><span class="__shiki_1t8gfj">aggregators</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">minmax</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">threshold</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">action</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      type = </span><span class="__shiki_mdbnqw">&quot;alert&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      field = </span><span class="__shiki_mdbnqw">&quot;temperature_alert&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      value = </span><span class="__shiki_mdbnqw">&quot;if(value &lt; -20 || value &gt; 50, &#39;out_of_range&#39;, &#39;normal&#39;)&quot;</span></span></code></pre></div><h4 id="_5-2-2-派生指标聚合器" tabindex="-1">5.2.2 派生指标聚合器 <a class="header-anchor" href="#_5-2-2-派生指标聚合器" aria-label="Permalink to &quot;5.2.2 派生指标聚合器&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">aggregators</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">derivative</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  period = </span><span class="__shiki_mdbnqw">&quot;1m&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 派生字段</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">aggregators</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">derivative</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    source = </span><span class="__shiki_mdbnqw">&quot;bytes_received&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    dest = </span><span class="__shiki_mdbnqw">&quot;bytes_per_sec&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    unit = </span><span class="__shiki_mdbnqw">&quot;1s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">aggregators</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">derivative</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    source = </span><span class="__shiki_mdbnqw">&quot;request_count&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    dest = </span><span class="__shiki_mdbnqw">&quot;requests_per_sec&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    unit = </span><span class="__shiki_mdbnqw">&quot;1s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 非负派生</span></span>
<span class="line"><span class="__shiki_140thh">  non_negative = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 最大跳变限制</span></span>
<span class="line"><span class="__shiki_140thh">  max_jump = </span><span class="__shiki_dzsirb">1000000</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 初始值处理</span></span>
<span class="line"><span class="__shiki_140thh">  initial_value = </span><span class="__shiki_mdbnqw">&quot;none&quot;</span><span class="__shiki_21nrsd">  # 可选: none, zero, drop</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 百分比变化</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">aggregators</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">derivative</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    algorithm = </span><span class="__shiki_mdbnqw">&quot;percentage&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">aggregators</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">derivative</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      source = </span><span class="__shiki_mdbnqw">&quot;active_users&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      dest = </span><span class="__shiki_mdbnqw">&quot;user_growth_rate&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 对数变化</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">aggregators</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">derivative</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    algorithm = </span><span class="__shiki_mdbnqw">&quot;log&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">aggregators</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">derivative</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      source = </span><span class="__shiki_mdbnqw">&quot;stock_price&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      dest = </span><span class="__shiki_mdbnqw">&quot;log_return&quot;</span></span></code></pre></div><h2 id="六、输出插件配置与优化" tabindex="-1">六、输出插件配置与优化 <a class="header-anchor" href="#六、输出插件配置与优化" aria-label="Permalink to &quot;六、输出插件配置与优化&quot;">​</a></h2><h3 id="_6-1-influxdb输出配置" tabindex="-1">6.1 InfluxDB输出配置 <a class="header-anchor" href="#_6-1-influxdb输出配置" aria-label="Permalink to &quot;6.1 InfluxDB输出配置&quot;">​</a></h3><h4 id="_6-1-1-influxdb-v2输出" tabindex="-1">6.1.1 InfluxDB v2输出 <a class="header-anchor" href="#_6-1-1-influxdb-v2输出" aria-label="Permalink to &quot;6.1.1 InfluxDB v2输出&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">influxdb_v2</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## InfluxDB服务器URL</span></span>
<span class="line"><span class="__shiki_140thh">  urls = [</span><span class="__shiki_mdbnqw">&quot;http://influxdb1:8086&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;http://influxdb2:8086&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 认证令牌</span></span>
<span class="line"><span class="__shiki_140thh">  token = </span><span class="__shiki_mdbnqw">&quot;\${INFLUX_TOKEN}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 组织</span></span>
<span class="line"><span class="__shiki_140thh">  organization = </span><span class="__shiki_mdbnqw">&quot;production&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 存储桶</span></span>
<span class="line"><span class="__shiki_140thh">  bucket = </span><span class="__shiki_mdbnqw">&quot;telegraf&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 批量写入配置</span></span>
<span class="line"><span class="__shiki_140thh">  batch_size = </span><span class="__shiki_dzsirb">5000</span></span>
<span class="line"><span class="__shiki_140thh">  flush_interval = </span><span class="__shiki_mdbnqw">&quot;10s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## HTTP配置</span></span>
<span class="line"><span class="__shiki_140thh">  content_encoding = </span><span class="__shiki_mdbnqw">&quot;gzip&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  timeout = </span><span class="__shiki_mdbnqw">&quot;5s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  insecure_skip_verify = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 重试策略</span></span>
<span class="line"><span class="__shiki_140thh">  retry_max = </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_140thh">  retry_delay = </span><span class="__shiki_mdbnqw">&quot;1s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  retry_max_delay = </span><span class="__shiki_mdbnqw">&quot;10s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 标签注入</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">influxdb_v2</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">tagpass</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    environment = [</span><span class="__shiki_mdbnqw">&quot;production&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;staging&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">influxdb_v2</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">tagdrop</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    host = [</span><span class="__shiki_mdbnqw">&quot;test-*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 字段过滤</span></span>
<span class="line"><span class="__shiki_140thh">  fieldpass = [</span><span class="__shiki_mdbnqw">&quot;usage_*&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;temperature&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;pressure&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  fielddrop = [</span><span class="__shiki_mdbnqw">&quot;id&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;timestamp&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 指标重命名</span></span>
<span class="line"><span class="__shiki_140thh">  name_override = </span><span class="__shiki_mdbnqw">&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  name_prefix = </span><span class="__shiki_mdbnqw">&quot;telegraf_&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  name_suffix = </span><span class="__shiki_mdbnqw">&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 标签强制写入</span></span>
<span class="line"><span class="__shiki_140thh">  force_tag = [</span><span class="__shiki_mdbnqw">&quot;host&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;region&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 丢弃特定指标</span></span>
<span class="line"><span class="__shiki_140thh">  namedrop = [</span><span class="__shiki_mdbnqw">&quot;debug_*&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;test_*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 写入一致性</span></span>
<span class="line"><span class="__shiki_140thh">  consistency = </span><span class="__shiki_mdbnqw">&quot;any&quot;</span><span class="__shiki_21nrsd">  # 可选: any, one, quorum, all</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 指标缓存（避免重启丢失）</span></span>
<span class="line"><span class="__shiki_140thh">  cache_max_memory_size = </span><span class="__shiki_mdbnqw">&quot;100MB&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  cache_directory = </span><span class="__shiki_mdbnqw">&quot;/var/lib/telegraf/cache&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 健康检查</span></span>
<span class="line"><span class="__shiki_140thh">  health_check_interval = </span><span class="__shiki_mdbnqw">&quot;30s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  health_check_timeout = </span><span class="__shiki_mdbnqw">&quot;5s&quot;</span></span></code></pre></div><h4 id="_6-1-2-influxdb-v1输出" tabindex="-1">6.1.2 InfluxDB v1输出 <a class="header-anchor" href="#_6-1-2-influxdb-v1输出" aria-label="Permalink to &quot;6.1.2 InfluxDB v1输出&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">influxdb</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## InfluxDB服务器</span></span>
<span class="line"><span class="__shiki_140thh">  urls = [</span><span class="__shiki_mdbnqw">&quot;http://influxdb:8086&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 数据库</span></span>
<span class="line"><span class="__shiki_140thh">  database = </span><span class="__shiki_mdbnqw">&quot;telegraf&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 保留策略</span></span>
<span class="line"><span class="__shiki_140thh">  retention_policy = </span><span class="__shiki_mdbnqw">&quot;autogen&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 写入一致性</span></span>
<span class="line"><span class="__shiki_140thh">  write_consistency = </span><span class="__shiki_mdbnqw">&quot;any&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 用户认证</span></span>
<span class="line"><span class="__shiki_140thh">  username = </span><span class="__shiki_mdbnqw">&quot;telegraf&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  password = </span><span class="__shiki_mdbnqw">&quot;\${INFLUX_PASSWORD}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## HTTP配置</span></span>
<span class="line"><span class="__shiki_140thh">  user_agent = </span><span class="__shiki_mdbnqw">&quot;telegraf&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  timeout = </span><span class="__shiki_mdbnqw">&quot;5s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 批量写入</span></span>
<span class="line"><span class="__shiki_140thh">  database_tag = </span><span class="__shiki_mdbnqw">&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  exclude_database_tag = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 标签注入</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">influxdb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">tagpass</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    measurement = [</span><span class="__shiki_mdbnqw">&quot;cpu&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;mem&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;disk&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 指标路由（到不同数据库）</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">influxdb</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    database = </span><span class="__shiki_mdbnqw">&quot;application_metrics&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    namepass = [</span><span class="__shiki_mdbnqw">&quot;app_*&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;service_*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">influxdb</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    database = </span><span class="__shiki_mdbnqw">&quot;infrastructure_metrics&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    namepass = [</span><span class="__shiki_mdbnqw">&quot;cpu&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;mem&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;disk&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;net&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h3 id="_6-2-多目标输出与故障转移" tabindex="-1">6.2 多目标输出与故障转移 <a class="header-anchor" href="#_6-2-多目标输出与故障转移" aria-label="Permalink to &quot;6.2 多目标输出与故障转移&quot;">​</a></h3><h4 id="_6-2-1-文件输出-备份" tabindex="-1">6.2.1 文件输出（备份） <a class="header-anchor" href="#_6-2-1-文件输出-备份" aria-label="Permalink to &quot;6.2.1 文件输出（备份）&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">file</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 输出文件</span></span>
<span class="line"><span class="__shiki_140thh">  files = [</span><span class="__shiki_mdbnqw">&quot;stdout&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;/var/log/telegraf/metrics.log&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;udp://logstash:9514&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 文件轮转</span></span>
<span class="line"><span class="__shiki_140thh">  rotation_interval = </span><span class="__shiki_mdbnqw">&quot;24h&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  rotation_max_size = </span><span class="__shiki_mdbnqw">&quot;100MB&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  rotation_max_archives = </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 数据格式</span></span>
<span class="line"><span class="__shiki_140thh">  data_format = </span><span class="__shiki_mdbnqw">&quot;json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## JSON配置</span></span>
<span class="line"><span class="__shiki_140thh">  json_timestamp_units = </span><span class="__shiki_mdbnqw">&quot;1s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  json_sort_keys = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 压缩</span></span>
<span class="line"><span class="__shiki_140thh">  compression = </span><span class="__shiki_mdbnqw">&quot;gzip&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  compression_level = </span><span class="__shiki_dzsirb">6</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 缓冲区</span></span>
<span class="line"><span class="__shiki_140thh">  buffer_size = </span><span class="__shiki_dzsirb">10000</span></span>
<span class="line"><span class="__shiki_140thh">  flush_interval = </span><span class="__shiki_mdbnqw">&quot;10s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 标签过滤</span></span>
<span class="line"><span class="__shiki_140thh">  tagpass = {</span></span>
<span class="line"><span class="__shiki_140thh">    &quot;environment&quot; = [</span><span class="__shiki_mdbnqw">&quot;production&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span></code></pre></div><h4 id="_6-2-2-多输出故障转移" tabindex="-1">6.2.2 多输出故障转移 <a class="header-anchor" href="#_6-2-2-多输出故障转移" aria-label="Permalink to &quot;6.2.2 多输出故障转移&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 主输出</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">influxdb_v2</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  urls = [</span><span class="__shiki_mdbnqw">&quot;http://primary-influxdb:8086&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  token = </span><span class="__shiki_mdbnqw">&quot;\${PRIMARY_TOKEN}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  organization = </span><span class="__shiki_mdbnqw">&quot;production&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  bucket = </span><span class="__shiki_mdbnqw">&quot;telegraf&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 健康检查</span></span>
<span class="line"><span class="__shiki_140thh">  health_check_url = </span><span class="__shiki_mdbnqw">&quot;http://primary-influxdb:8086/health&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  health_check_interval = </span><span class="__shiki_mdbnqw">&quot;30s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd"># 备用输出</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">influxdb_v2</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  urls = [</span><span class="__shiki_mdbnqw">&quot;http://backup-influxdb:8086&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  token = </span><span class="__shiki_mdbnqw">&quot;\${BACKUP_TOKEN}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  organization = </span><span class="__shiki_mdbnqw">&quot;production&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  bucket = </span><span class="__shiki_mdbnqw">&quot;telegraf_backup&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 故障转移配置</span></span>
<span class="line"><span class="__shiki_140thh">  failover = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  primary_timeout = </span><span class="__shiki_mdbnqw">&quot;30s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd"># 本地缓存输出（当主备都失败时）</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">file</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  files = [</span><span class="__shiki_mdbnqw">&quot;/var/lib/telegraf/cache/metrics-{{.Timestamp}}.log&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  data_format = </span><span class="__shiki_mdbnqw">&quot;json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 只在故障时启用</span></span>
<span class="line"><span class="__shiki_140thh">  enabled = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd"># 输出选择器（智能路由）</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">selector</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 基于标签路由</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">selector</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">route</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    tag = </span><span class="__shiki_mdbnqw">&quot;environment&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    value = </span><span class="__shiki_mdbnqw">&quot;production&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    output = </span><span class="__shiki_mdbnqw">&quot;influxdb_primary&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">selector</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">route</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    tag = </span><span class="__shiki_mdbnqw">&quot;environment&quot;</span><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">    value = </span><span class="__shiki_mdbnqw">&quot;staging&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    output = </span><span class="__shiki_mdbnqw">&quot;influxdb_backup&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">selector</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">route</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    tag = </span><span class="__shiki_mdbnqw">&quot;criticality&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    value = </span><span class="__shiki_mdbnqw">&quot;high&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    output = </span><span class="__shiki_mdbnqw">&quot;influxdb_primary,influxdb_backup&quot;</span><span class="__shiki_21nrsd">  # 双写</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 默认路由</span></span>
<span class="line"><span class="__shiki_140thh">  default = </span><span class="__shiki_mdbnqw">&quot;file_cache&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">## 输出定义</span></span>
<span class="line"><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  influxdb_primary = </span><span class="__shiki_mdbnqw">&quot;[[outputs.influxdb_v2]]&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  influxdb_backup = </span><span class="__shiki_mdbnqw">&quot;[[outputs.influxdb_v2]]&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  file_cache = </span><span class="__shiki_mdbnqw">&quot;[[outputs.file]]&quot;</span></span></code></pre></div><h3 id="_6-3-其他输出目标" tabindex="-1">6.3 其他输出目标 <a class="header-anchor" href="#_6-3-其他输出目标" aria-label="Permalink to &quot;6.3 其他输出目标&quot;">​</a></h3><h4 id="_6-3-1-prometheus输出" tabindex="-1">6.3.1 Prometheus输出 <a class="header-anchor" href="#_6-3-1-prometheus输出" aria-label="Permalink to &quot;6.3.1 Prometheus输出&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">prometheus_client</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 监听地址</span></span>
<span class="line"><span class="__shiki_140thh">  listen = </span><span class="__shiki_mdbnqw">&quot;:9273&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 指标路径</span></span>
<span class="line"><span class="__shiki_140thh">  path = </span><span class="__shiki_mdbnqw">&quot;/metrics&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 指标格式</span></span>
<span class="line"><span class="__shiki_140thh">  expiration_interval = </span><span class="__shiki_mdbnqw">&quot;60s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 标签保留</span></span>
<span class="line"><span class="__shiki_140thh">  metric_version = </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_140thh">  export_timestamp = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 字符串标签处理</span></span>
<span class="line"><span class="__shiki_140thh">  string_as_label = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 认证</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">prometheus_client</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">basic_auth</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    username = </span><span class="__shiki_mdbnqw">&quot;prometheus&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    password = </span><span class="__shiki_mdbnqw">&quot;\${METRICS_PASSWORD}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## TLS配置</span></span>
<span class="line"><span class="__shiki_140thh">  tls_cert = </span><span class="__shiki_mdbnqw">&quot;/etc/telegraf/cert.pem&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  tls_key = </span><span class="__shiki_mdbnqw">&quot;/etc/telegraf/key.pem&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## CORS配置</span></span>
<span class="line"><span class="__shiki_140thh">  cors_origin = </span><span class="__shiki_mdbnqw">&quot;*&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 指标类型推断</span></span>
<span class="line"><span class="__shiki_140thh">  infer_type_from_field = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 直方图和摘要</span></span>
<span class="line"><span class="__shiki_140thh">  enable_histogram = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  enable_summary = </span><span class="__shiki_dzsirb">true</span></span></code></pre></div><h4 id="_6-3-2-kafka输出" tabindex="-1">6.3.2 Kafka输出 <a class="header-anchor" href="#_6-3-2-kafka输出" aria-label="Permalink to &quot;6.3.2 Kafka输出&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">kafka</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## Kafka代理</span></span>
<span class="line"><span class="__shiki_140thh">  brokers = [</span><span class="__shiki_mdbnqw">&quot;kafka1:9092&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;kafka2:9092&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;kafka3:9092&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 主题</span></span>
<span class="line"><span class="__shiki_140thh">  topic = </span><span class="__shiki_mdbnqw">&quot;telegraf-metrics&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 分区策略</span></span>
<span class="line"><span class="__shiki_140thh">  partition_hash = [</span><span class="__shiki_mdbnqw">&quot;host&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;measurement&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  partition_random = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 压缩</span></span>
<span class="line"><span class="__shiki_140thh">  compression_codec = </span><span class="__shiki_mdbnqw">&quot;snappy&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 批处理</span></span>
<span class="line"><span class="__shiki_140thh">  batch_size = </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_140thh">  batch_timeout = </span><span class="__shiki_mdbnqw">&quot;1s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 重试</span></span>
<span class="line"><span class="__shiki_140thh">  max_retry = </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_140thh">  required_acks = </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 数据格式</span></span>
<span class="line"><span class="__shiki_140thh">  data_format = </span><span class="__shiki_mdbnqw">&quot;json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## JSON配置</span></span>
<span class="line"><span class="__shiki_140thh">  json_timestamp_format = </span><span class="__shiki_mdbnqw">&quot;unix&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 路由</span></span>
<span class="line"><span class="__shiki_140thh">  routing_tag = </span><span class="__shiki_mdbnqw">&quot;environment&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  routing_key = </span><span class="__shiki_mdbnqw">&quot;static-key&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 指标过滤</span></span>
<span class="line"><span class="__shiki_140thh">  namepass = [</span><span class="__shiki_mdbnqw">&quot;cpu&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;memory&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;disk&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 标签注入</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">kafka</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">metadata</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    refresh_frequency = </span><span class="__shiki_mdbnqw">&quot;10m&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## SASL认证</span></span>
<span class="line"><span class="__shiki_140thh">  sasl_username = </span><span class="__shiki_mdbnqw">&quot;\${KAFKA_USER}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  sasl_password = </span><span class="__shiki_mdbnqw">&quot;\${KAFKA_PASSWORD}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  sasl_mechanism = </span><span class="__shiki_mdbnqw">&quot;SCRAM-SHA-256&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## TLS</span></span>
<span class="line"><span class="__shiki_140thh">  enable_tls = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  tls_ca = </span><span class="__shiki_mdbnqw">&quot;/etc/telegraf/ca.pem&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  tls_cert = </span><span class="__shiki_mdbnqw">&quot;/etc/telegraf/client.pem&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  tls_key = </span><span class="__shiki_mdbnqw">&quot;/etc/telegraf/client.key&quot;</span></span></code></pre></div><h2 id="七、性能优化与高级配置" tabindex="-1">七、性能优化与高级配置 <a class="header-anchor" href="#七、性能优化与高级配置" aria-label="Permalink to &quot;七、性能优化与高级配置&quot;">​</a></h2><h3 id="_7-1-资源管理与性能调优" tabindex="-1">7.1 资源管理与性能调优 <a class="header-anchor" href="#_7-1-资源管理与性能调优" aria-label="Permalink to &quot;7.1 资源管理与性能调优&quot;">​</a></h3><h4 id="_7-1-1-内存与cpu优化" tabindex="-1">7.1.1 内存与CPU优化 <a class="header-anchor" href="#_7-1-1-内存与cpu优化" aria-label="Permalink to &quot;7.1.1 内存与CPU优化&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">agent</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 收集间隔</span></span>
<span class="line"><span class="__shiki_140thh">  interval = </span><span class="__shiki_mdbnqw">&quot;10s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  flush_interval = </span><span class="__shiki_mdbnqw">&quot;10s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 批处理配置</span></span>
<span class="line"><span class="__shiki_140thh">  metric_batch_size = </span><span class="__shiki_dzsirb">1000</span></span>
<span class="line"><span class="__shiki_140thh">  metric_buffer_limit = </span><span class="__shiki_dzsirb">10000</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 内存限制</span></span>
<span class="line"><span class="__shiki_140thh">  max_memory_mb = </span><span class="__shiki_dzsirb">512</span></span>
<span class="line"><span class="__shiki_140thh">  max_cpu_percent = </span><span class="__shiki_dzsirb">50</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 收集抖动（分散收集时间）</span></span>
<span class="line"><span class="__shiki_140thh">  collection_jitter = </span><span class="__shiki_mdbnqw">&quot;5s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 刷新抖动（分散写入时间）</span></span>
<span class="line"><span class="__shiki_140thh">  flush_jitter = </span><span class="__shiki_mdbnqw">&quot;5s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 精确时间戳</span></span>
<span class="line"><span class="__shiki_140thh">  precision = </span><span class="__shiki_mdbnqw">&quot;1ms&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 插件并发</span></span>
<span class="line"><span class="__shiki_140thh">  max_running_inputs = </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">  max_running_processors = </span><span class="__shiki_dzsirb">20</span></span>
<span class="line"><span class="__shiki_140thh">  max_running_aggregators = </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_140thh">  max_running_outputs = </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 插件执行顺序</span></span>
<span class="line"><span class="__shiki_140thh">  ordered_execution = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 数据收集超时</span></span>
<span class="line"><span class="__shiki_140thh">  gather_timeout = </span><span class="__shiki_mdbnqw">&quot;30s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 信号处理</span></span>
<span class="line"><span class="__shiki_140thh">  shutdown_timeout = </span><span class="__shiki_mdbnqw">&quot;30s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">## 输入插件资源限制</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cpu</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 插件级间隔</span></span>
<span class="line"><span class="__shiki_140thh">  interval = </span><span class="__shiki_mdbnqw">&quot;30s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 插件超时</span></span>
<span class="line"><span class="__shiki_140thh">  timeout = </span><span class="__shiki_mdbnqw">&quot;5s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 并发收集</span></span>
<span class="line"><span class="__shiki_140thh">  concurrent_gather = </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">## 输出插件资源限制  </span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">influxdb_v2</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 写入超时</span></span>
<span class="line"><span class="__shiki_140thh">  timeout = </span><span class="__shiki_mdbnqw">&quot;10s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 连接池</span></span>
<span class="line"><span class="__shiki_140thh">  max_idle_conns = </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">  max_idle_conns_per_host = </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_140thh">  idle_conn_timeout = </span><span class="__shiki_mdbnqw">&quot;90s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 批量写入优化</span></span>
<span class="line"><span class="__shiki_140thh">  batch_size = </span><span class="__shiki_dzsirb">5000</span></span>
<span class="line"><span class="__shiki_140thh">  flush_interval = </span><span class="__shiki_mdbnqw">&quot;10s&quot;</span></span></code></pre></div><h4 id="_7-1-2-网络与i-o优化" tabindex="-1">7.1.2 网络与I/O优化 <a class="header-anchor" href="#_7-1-2-网络与i-o优化" aria-label="Permalink to &quot;7.1.2 网络与I/O优化&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">agent</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 主机名配置</span></span>
<span class="line"><span class="__shiki_140thh">  hostname = </span><span class="__shiki_mdbnqw">&quot;\${HOSTNAME}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  omit_hostname = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 标签注入</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">agent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">tags</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    environment = </span><span class="__shiki_mdbnqw">&quot;production&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    region = </span><span class="__shiki_mdbnqw">&quot;us-east-1&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    az = </span><span class="__shiki_mdbnqw">&quot;us-east-1a&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 全局字段过滤</span></span>
<span class="line"><span class="__shiki_140thh">  fieldpass = [</span><span class="__shiki_mdbnqw">&quot;usage_*&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;temperature&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;pressure&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;humidity&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  fielddrop = [</span><span class="__shiki_mdbnqw">&quot;debug_*&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;test_*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 全局标签过滤</span></span>
<span class="line"><span class="__shiki_140thh">  tagpass = {</span></span>
<span class="line"><span class="__shiki_140thh">    &quot;environment&quot; = [</span><span class="__shiki_mdbnqw">&quot;production&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;staging&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  tagdrop = {</span></span>
<span class="line"><span class="__shiki_140thh">    &quot;host&quot; = [</span><span class="__shiki_mdbnqw">&quot;localhost&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;127.0.0.1&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">## 输入插件I/O优化</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">disk</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 减少I/O频率</span></span>
<span class="line"><span class="__shiki_140thh">  interval = </span><span class="__shiki_mdbnqw">&quot;60s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 跳过不必要的统计</span></span>
<span class="line"><span class="__shiki_140thh">  skip_serial_number = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">## SNMP插件优化</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">snmp</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 批量获取</span></span>
<span class="line"><span class="__shiki_140thh">  max_repetitions = </span><span class="__shiki_dzsirb">50</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 连接复用</span></span>
<span class="line"><span class="__shiki_140thh">  connection_cache_size = </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">  connection_timeout = </span><span class="__shiki_mdbnqw">&quot;5s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 并发查询</span></span>
<span class="line"><span class="__shiki_140thh">  concurrent_queries = </span><span class="__shiki_dzsirb">5</span></span></code></pre></div><h3 id="_7-2-高可用与负载均衡" tabindex="-1">7.2 高可用与负载均衡 <a class="header-anchor" href="#_7-2-高可用与负载均衡" aria-label="Permalink to &quot;7.2 高可用与负载均衡&quot;">​</a></h3><h4 id="_7-2-1-telegraf集群部署" tabindex="-1">7.2.1 Telegraf集群部署 <a class="header-anchor" href="#_7-2-1-telegraf集群部署" aria-label="Permalink to &quot;7.2.1 Telegraf集群部署&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 集群配置</span></span>
<span class="line"><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">cluster</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 集群模式</span></span>
<span class="line"><span class="__shiki_140thh">  enabled = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  mode = </span><span class="__shiki_mdbnqw">&quot;shared&quot;</span><span class="__shiki_21nrsd">  # 可选: shared, leader_follower</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 集群节点</span></span>
<span class="line"><span class="__shiki_140thh">  nodes = [</span><span class="__shiki_mdbnqw">&quot;telegraf-1:8094&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;telegraf-2:8094&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;telegraf-3:8094&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 选举配置</span></span>
<span class="line"><span class="__shiki_140thh">  election_timeout = </span><span class="__shiki_mdbnqw">&quot;3s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  heartbeat_interval = </span><span class="__shiki_mdbnqw">&quot;1s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 数据分片</span></span>
<span class="line"><span class="__shiki_140thh">  sharding = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  shard_count = </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_140thh">  shard_key = </span><span class="__shiki_mdbnqw">&quot;host&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 数据复制</span></span>
<span class="line"><span class="__shiki_140thh">  replication_factor = </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_140thh">  consistency_level = </span><span class="__shiki_mdbnqw">&quot;quorum&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 成员管理</span></span>
<span class="line"><span class="__shiki_140thh">  join_timeout = </span><span class="__shiki_mdbnqw">&quot;30s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  leave_timeout = </span><span class="__shiki_mdbnqw">&quot;30s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 故障检测</span></span>
<span class="line"><span class="__shiki_140thh">  failure_detection = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  suspicion_mult = </span><span class="__shiki_dzsirb">4</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd"># 集群通信</span></span>
<span class="line"><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">cluster</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">transport</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  bind_addr = </span><span class="__shiki_mdbnqw">&quot;0.0.0.0:8094&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  advertise_addr = </span><span class="__shiki_mdbnqw">&quot;\${HOSTNAME}:8094&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 加密</span></span>
<span class="line"><span class="__shiki_140thh">  encrypt = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  encryption_key = </span><span class="__shiki_mdbnqw">&quot;\${CLUSTER_KEY}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 压缩</span></span>
<span class="line"><span class="__shiki_140thh">  compress = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd"># 集群API</span></span>
<span class="line"><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">cluster</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  enabled = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  bind_addr = </span><span class="__shiki_mdbnqw">&quot;0.0.0.0:8095&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  advertise_addr = </span><span class="__shiki_mdbnqw">&quot;\${HOSTNAME}:8095&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 认证</span></span>
<span class="line"><span class="__shiki_140thh">  auth = </span><span class="__shiki_mdbnqw">&quot;basic&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  username = </span><span class="__shiki_mdbnqw">&quot;admin&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  password = </span><span class="__shiki_mdbnqw">&quot;\${API_PASSWORD}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## TLS</span></span>
<span class="line"><span class="__shiki_140thh">  tls_enabled = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  tls_cert = </span><span class="__shiki_mdbnqw">&quot;/etc/telegraf/cluster-cert.pem&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  tls_key = </span><span class="__shiki_mdbnqw">&quot;/etc/telegraf/cluster-key.pem&quot;</span></span></code></pre></div><h4 id="_7-2-2-负载均衡配置" tabindex="-1">7.2.2 负载均衡配置 <a class="header-anchor" href="#_7-2-2-负载均衡配置" aria-label="Permalink to &quot;7.2.2 负载均衡配置&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用HAProxy进行负载均衡</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">haproxy</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  servers = [</span><span class="__shiki_mdbnqw">&quot;http://haproxy:8404/stats&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 认证</span></span>
<span class="line"><span class="__shiki_140thh">  username = </span><span class="__shiki_mdbnqw">&quot;admin&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  password = </span><span class="__shiki_mdbnqw">&quot;\${HAPROXY_PASSWORD}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 统计导出</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">haproxy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stats</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;current_sessions&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    label = </span><span class="__shiki_mdbnqw">&quot;haproxy_sessions&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">haproxy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stats</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;bytes_in&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    label = </span><span class="__shiki_mdbnqw">&quot;haproxy_traffic_in&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">haproxy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stats</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;bytes_out&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    label = </span><span class="__shiki_mdbnqw">&quot;haproxy_traffic_out&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 负载均衡输出</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">influxdb_v2</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 多个InfluxDB实例</span></span>
<span class="line"><span class="__shiki_140thh">  urls = [</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;http://influxdb-1:8086&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;http://influxdb-2:8086&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;http://influxdb-3:8086&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 负载均衡策略</span></span>
<span class="line"><span class="__shiki_140thh">  load_balance = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  load_balance_strategy = </span><span class="__shiki_mdbnqw">&quot;round_robin&quot;</span><span class="__shiki_21nrsd">  # 可选: round_robin, least_loaded, hash</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 哈希负载均衡</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">influxdb_v2</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    load_balance_strategy = </span><span class="__shiki_mdbnqw">&quot;hash&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    hash_key = </span><span class="__shiki_mdbnqw">&quot;host&quot;</span><span class="__shiki_21nrsd">  # 基于host标签哈希</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 健康检查</span></span>
<span class="line"><span class="__shiki_140thh">  health_check_interval = </span><span class="__shiki_mdbnqw">&quot;30s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  health_check_timeout = </span><span class="__shiki_mdbnqw">&quot;5s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 失败转移</span></span>
<span class="line"><span class="__shiki_140thh">  failover = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  failover_threshold = </span><span class="__shiki_dzsirb">3</span></span></code></pre></div><h2 id="八、监控与运维" tabindex="-1">八、监控与运维 <a class="header-anchor" href="#八、监控与运维" aria-label="Permalink to &quot;八、监控与运维&quot;">​</a></h2><h3 id="_8-1-telegraf自身监控" tabindex="-1">8.1 Telegraf自身监控 <a class="header-anchor" href="#_8-1-telegraf自身监控" aria-label="Permalink to &quot;8.1 Telegraf自身监控&quot;">​</a></h3><h4 id="_8-1-1-内置监控端点" tabindex="-1">8.1.1 内置监控端点 <a class="header-anchor" href="#_8-1-1-内置监控端点" aria-label="Permalink to &quot;8.1.1 内置监控端点&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 启用内部指标收集</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">internal</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  collect_memstats = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd"># 启用Prometheus格式指标暴露</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">prometheus_client</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  listen = </span><span class="__shiki_mdbnqw">&quot;:9273&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  path = </span><span class="__shiki_mdbnqw">&quot;/metrics&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## Telegraf特定指标</span></span>
<span class="line"><span class="__shiki_140thh">  metric_version = </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_140thh">  export_timestamp = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd"># 启用HTTP API</span></span>
<span class="line"><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">agent</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 配置热重载</span></span>
<span class="line"><span class="__shiki_140thh">  config_reload_interval = </span><span class="__shiki_mdbnqw">&quot;10s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## HTTP服务器</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">agent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    enabled = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    bind_address = </span><span class="__shiki_mdbnqw">&quot;:6060&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    ## 端点</span></span>
<span class="line"><span class="__shiki_140thh">    [</span><span class="__shiki_1t8gfj">agent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">endpoints</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      health = </span><span class="__shiki_mdbnqw">&quot;/health&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      metrics = </span><span class="__shiki_mdbnqw">&quot;/metrics&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      config = </span><span class="__shiki_mdbnqw">&quot;/config&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      plugins = </span><span class="__shiki_mdbnqw">&quot;/plugins&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      version = </span><span class="__shiki_mdbnqw">&quot;/version&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">    ## 认证</span></span>
<span class="line"><span class="__shiki_140thh">    [</span><span class="__shiki_1t8gfj">agent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">auth</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      enabled = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      username = </span><span class="__shiki_mdbnqw">&quot;admin&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      password = </span><span class="__shiki_mdbnqw">&quot;\${ADMIN_PASSWORD}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">    ## TLS</span></span>
<span class="line"><span class="__shiki_140thh">    [</span><span class="__shiki_1t8gfj">agent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">tls</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      enabled = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      cert = </span><span class="__shiki_mdbnqw">&quot;/etc/telegraf/server-cert.pem&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      key = </span><span class="__shiki_mdbnqw">&quot;/etc/telegraf/server-key.pem&quot;</span></span></code></pre></div><h4 id="_8-1-2-监控面板配置" tabindex="-1">8.1.2 监控面板配置 <a class="header-anchor" href="#_8-1-2-监控面板配置" aria-label="Permalink to &quot;8.1.2 监控面板配置&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;dashboards&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;name&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Telegraf System Metrics&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;panels&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;title&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Telegraf Memory Usage&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;query&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;from(bucket: </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">telegraf</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">) |&gt; range(start: -1h) |&gt; filter(fn: (r) =&gt; r._measurement == </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">internal_mem</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw"> and r._field == </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">heap_alloc</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">)&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;line&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;title&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Input Plugin Collection Rate&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;query&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;from(bucket: </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">telegraf</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">) |&gt; range(start: -1h) |&gt; filter(fn: (r) =&gt; r._measurement == </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">internal_agent</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw"> and r._field == </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">gather_time_ns</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">) |&gt; derivative(unit: 1s)&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;bar&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;title&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Output Plugin Write Rate&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;query&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;from(bucket: </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">telegraf</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">) |&gt; range(start: -1h) |&gt; filter(fn: (r) =&gt; r._measurement == </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">internal_write</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw"> and r._field == </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">point_write_dropped</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">) |&gt; aggregateWindow(every: 1m, fn: mean)&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;stat&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      ]</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-2-告警与通知" tabindex="-1">8.2 告警与通知 <a class="header-anchor" href="#_8-2-告警与通知" aria-label="Permalink to &quot;8.2 告警与通知&quot;">​</a></h3><h4 id="_8-2-1-异常检测告警" tabindex="-1">8.2.1 异常检测告警 <a class="header-anchor" href="#_8-2-1-异常检测告警" aria-label="Permalink to &quot;8.2.1 异常检测告警&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用处理器进行异常检测</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stats</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  period = </span><span class="__shiki_mdbnqw">&quot;1m&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stats</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    name = </span><span class="__shiki_mdbnqw">&quot;cpu_usage&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    functions = [</span><span class="__shiki_mdbnqw">&quot;zscore&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 异常标记</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stats</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">anomaly</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;cpu_usage_zscore&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    threshold = </span><span class="__shiki_dzsirb">3.0</span></span>
<span class="line"><span class="__shiki_140thh">    dest = </span><span class="__shiki_mdbnqw">&quot;cpu_anomaly&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd"># 发送告警到输出插件</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  url = </span><span class="__shiki_mdbnqw">&quot;http://alertmanager:9093/api/v1/alerts&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  method = </span><span class="__shiki_mdbnqw">&quot;POST&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  data_format = </span><span class="__shiki_mdbnqw">&quot;json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">headers</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    Content-Type = </span><span class="__shiki_mdbnqw">&quot;application/json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">body</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    alerts = </span><span class="__shiki_mdbnqw">&#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    [</span></span>
<span class="line"><span class="__shiki_mdbnqw">      {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;labels&quot;: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &quot;alertname&quot;: &quot;HighCPUUsage&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &quot;severity&quot;: &quot;warning&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &quot;instance&quot;: &quot;{{.Tag \\&quot;host\\&quot;}}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        },</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;annotations&quot;: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &quot;summary&quot;: &quot;High CPU usage detected&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &quot;description&quot;: &quot;CPU usage on {{.Tag \\&quot;host\\&quot;}} is {{.Field \\&quot;cpu_usage\\&quot;}}%&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &quot;value&quot;: &quot;{{.Field \\&quot;cpu_usage\\&quot;}}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">      }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    ]</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 条件发送</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">condition</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;cpu_anomaly&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    operator = </span><span class="__shiki_mdbnqw">&quot;==&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    value = </span><span class="__shiki_dzsirb">true</span></span></code></pre></div><h2 id="九、安全与合规" tabindex="-1">九、安全与合规 <a class="header-anchor" href="#九、安全与合规" aria-label="Permalink to &quot;九、安全与合规&quot;">​</a></h2><h3 id="_9-1-数据安全与隐私" tabindex="-1">9.1 数据安全与隐私 <a class="header-anchor" href="#_9-1-数据安全与隐私" aria-label="Permalink to &quot;9.1 数据安全与隐私&quot;">​</a></h3><h4 id="_9-1-1-数据脱敏与加密" tabindex="-1">9.1.1 数据脱敏与加密 <a class="header-anchor" href="#_9-1-1-数据脱敏与加密" aria-label="Permalink to &quot;9.1.1 数据脱敏与加密&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 数据脱敏处理器</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">privacy</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 字段脱敏</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">privacy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">mask</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;email&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    type = </span><span class="__shiki_mdbnqw">&quot;email&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">privacy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">mask</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;ip_address&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    type = </span><span class="__shiki_mdbnqw">&quot;ip&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    preserve_prefix = </span><span class="__shiki_dzsirb">2</span><span class="__shiki_21nrsd">  # 保留前两个字节</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">privacy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">mask</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;credit_card&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    type = </span><span class="__shiki_mdbnqw">&quot;credit_card&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">privacy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">mask</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    field = </span><span class="__shiki_mdbnqw">&quot;phone_number&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    type = </span><span class="__shiki_mdbnqw">&quot;phone&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 数据加密</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">encrypt</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    algorithm = </span><span class="__shiki_mdbnqw">&quot;aes-256-gcm&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    key = </span><span class="__shiki_mdbnqw">&quot;\${ENCRYPTION_KEY}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    ## 加密字段</span></span>
<span class="line"><span class="__shiki_140thh">    fields = [</span><span class="__shiki_mdbnqw">&quot;sensitive_data&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;personal_info&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    ## 输出格式</span></span>
<span class="line"><span class="__shiki_140thh">    output_format = </span><span class="__shiki_mdbnqw">&quot;hex&quot;</span><span class="__shiki_21nrsd">  # 可选: hex, base64</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 数据哈希化</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">hash</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    algorithm = </span><span class="__shiki_mdbnqw">&quot;sha256&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">hash</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      source = </span><span class="__shiki_mdbnqw">&quot;user_id&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      dest = </span><span class="__shiki_mdbnqw">&quot;user_hash&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">    ## 加盐</span></span>
<span class="line"><span class="__shiki_140thh">    salt = </span><span class="__shiki_mdbnqw">&quot;\${HASH_SALT}&quot;</span></span></code></pre></div><h4 id="_9-1-2-合规性配置" tabindex="-1">9.1.2 合规性配置 <a class="header-anchor" href="#_9-1-2-合规性配置" aria-label="Permalink to &quot;9.1.2 合规性配置&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">agent</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## GDPR合规</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">agent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">compliance</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    gdpr_enabled = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    ## 数据保留</span></span>
<span class="line"><span class="__shiki_140thh">    data_retention_days = </span><span class="__shiki_dzsirb">30</span></span>
<span class="line"><span class="__shiki_140thh">    auto_purge = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    ## 数据主体权利</span></span>
<span class="line"><span class="__shiki_140thh">    [</span><span class="__shiki_1t8gfj">agent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">compliance</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">rights</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      right_to_access = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      right_to_erasure = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      right_to_rectification = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">    ## 审计日志</span></span>
<span class="line"><span class="__shiki_140thh">    audit_log_enabled = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    audit_log_path = </span><span class="__shiki_mdbnqw">&quot;/var/log/telegraf/audit.log&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    ## 数据分类</span></span>
<span class="line"><span class="__shiki_140thh">    [</span><span class="__shiki_1t8gfj">agent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">compliance</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">classification</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      pii_fields = [</span><span class="__shiki_mdbnqw">&quot;email&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;phone&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;address&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      sensitive_fields = [</span><span class="__shiki_mdbnqw">&quot;password&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;token&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;key&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd"># HIPAA合规配置</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">hipaa</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 受保护健康信息(PHI)</span></span>
<span class="line"><span class="__shiki_140thh">  phi_fields = [</span><span class="__shiki_mdbnqw">&quot;patient_id&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;medical_record_number&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;diagnosis&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 去标识化</span></span>
<span class="line"><span class="__shiki_140thh">  deidentification = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  deidentification_method = </span><span class="__shiki_mdbnqw">&quot;generalization&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 审计追踪</span></span>
<span class="line"><span class="__shiki_140thh">  audit_trail = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  audit_fields = [</span><span class="__shiki_mdbnqw">&quot;user&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;action&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;timestamp&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h3 id="_9-2-访问控制与认证" tabindex="-1">9.2 访问控制与认证 <a class="header-anchor" href="#_9-2-访问控制与认证" aria-label="Permalink to &quot;9.2 访问控制与认证&quot;">​</a></h3><h4 id="_9-2-1-插件级认证" tabindex="-1">9.2.1 插件级认证 <a class="header-anchor" href="#_9-2-1-插件级认证" aria-label="Permalink to &quot;9.2.1 插件级认证&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 输入插件认证</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">influxdb_v2</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  urls = [</span><span class="__shiki_mdbnqw">&quot;http://influxdb:8086&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## Token认证</span></span>
<span class="line"><span class="__shiki_140thh">  token = </span><span class="__shiki_mdbnqw">&quot;\${INFLUX_TOKEN}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 基本认证</span></span>
<span class="line"><span class="__shiki_140thh">  username = </span><span class="__shiki_mdbnqw">&quot;\${USERNAME}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  password = </span><span class="__shiki_mdbnqw">&quot;\${PASSWORD}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## TLS客户端认证</span></span>
<span class="line"><span class="__shiki_140thh">  tls_cert = </span><span class="__shiki_mdbnqw">&quot;/etc/telegraf/client.pem&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  tls_key = </span><span class="__shiki_mdbnqw">&quot;/etc/telegraf/client.key&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## mTLS</span></span>
<span class="line"><span class="__shiki_140thh">  tls_ca = </span><span class="__shiki_mdbnqw">&quot;/etc/telegraf/ca.pem&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  insecure_skip_verify = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd"># SNMP v3认证</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">snmp</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  version = </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 安全配置</span></span>
<span class="line"><span class="__shiki_140thh">  sec_name = </span><span class="__shiki_mdbnqw">&quot;\${SNMP_USER}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  sec_level = </span><span class="__shiki_mdbnqw">&quot;authPriv&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 认证协议</span></span>
<span class="line"><span class="__shiki_140thh">  auth_protocol = </span><span class="__shiki_mdbnqw">&quot;SHA&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  auth_password = </span><span class="__shiki_mdbnqw">&quot;\${SNMP_AUTH_PASSWORD}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 隐私协议</span></span>
<span class="line"><span class="__shiki_140thh">  priv_protocol = </span><span class="__shiki_mdbnqw">&quot;AES&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  priv_password = </span><span class="__shiki_mdbnqw">&quot;\${SNMP_PRIV_PASSWORD}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 上下文</span></span>
<span class="line"><span class="__shiki_140thh">  context_name = </span><span class="__shiki_mdbnqw">&quot;\${SNMP_CONTEXT}&quot;</span></span></code></pre></div><h2 id="十、实际应用案例" tabindex="-1">十、实际应用案例 <a class="header-anchor" href="#十、实际应用案例" aria-label="Permalink to &quot;十、实际应用案例&quot;">​</a></h2><h3 id="_10-1-混合云监控架构" tabindex="-1">10.1 混合云监控架构 <a class="header-anchor" href="#_10-1-混合云监控架构" aria-label="Permalink to &quot;10.1 混合云监控架构&quot;">​</a></h3><h4 id="_10-1-1-多云监控配置" tabindex="-1">10.1.1 多云监控配置 <a class="header-anchor" href="#_10-1-1-多云监控配置" aria-label="Permalink to &quot;10.1.1 多云监控配置&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 云服务商监控</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cloudwatch</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  namespace = </span><span class="__shiki_mdbnqw">&quot;AWS/EC2&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 跨区域</span></span>
<span class="line"><span class="__shiki_140thh">  regions = [</span><span class="__shiki_mdbnqw">&quot;us-east-1&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;us-west-2&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;eu-west-1&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 指标筛选</span></span>
<span class="line"><span class="__shiki_140thh">  metrics = [</span><span class="__shiki_mdbnqw">&quot;CPUUtilization&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;NetworkIn&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;NetworkOut&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;DiskReadBytes&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;DiskWriteBytes&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 维度过滤</span></span>
<span class="line"><span class="__shiki_140thh">  dimension = [</span><span class="__shiki_mdbnqw">&quot;InstanceId&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 认证</span></span>
<span class="line"><span class="__shiki_140thh">  access_key = </span><span class="__shiki_mdbnqw">&quot;\${AWS_ACCESS_KEY}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  secret_key = </span><span class="__shiki_mdbnqw">&quot;\${AWS_SECRET_KEY}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 角色假设</span></span>
<span class="line"><span class="__shiki_140thh">  role_arn = </span><span class="__shiki_mdbnqw">&quot;arn:aws:iam::123456789012:role/MonitoringRole&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 速率限制</span></span>
<span class="line"><span class="__shiki_140thh">  ratelimit = </span><span class="__shiki_dzsirb">200</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Azure Monitor</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">azure_monitor</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  subscription_id = </span><span class="__shiki_mdbnqw">&quot;\${AZURE_SUBSCRIPTION_ID}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  tenant_id = </span><span class="__shiki_mdbnqw">&quot;\${AZURE_TENANT_ID}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  client_id = </span><span class="__shiki_mdbnqw">&quot;\${AZURE_CLIENT_ID}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  client_secret = </span><span class="__shiki_mdbnqw">&quot;\${AZURE_CLIENT_SECRET}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 资源类型</span></span>
<span class="line"><span class="__shiki_140thh">  resources = [</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;Microsoft.Compute/virtualMachines&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;Microsoft.Storage/storageAccounts&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;Microsoft.Network/loadBalancers&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 指标</span></span>
<span class="line"><span class="__shiki_140thh">  metrics = [</span><span class="__shiki_mdbnqw">&quot;Percentage CPU&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;Disk Read Bytes/sec&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;Disk Write Bytes/sec&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Google Cloud Monitoring</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stackdriver</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  project = </span><span class="__shiki_mdbnqw">&quot;\${GCP_PROJECT_ID}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 服务账号密钥</span></span>
<span class="line"><span class="__shiki_140thh">  credentials_file = </span><span class="__shiki_mdbnqw">&quot;/etc/telegraf/gcp-key.json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 指标类型</span></span>
<span class="line"><span class="__shiki_140thh">  metric_types = [</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;compute.googleapis.com/instance/cpu/utilization&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;compute.googleapis.com/instance/disk/read_bytes_count&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;compute.googleapis.com/instance/network/received_bytes_count&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 过滤</span></span>
<span class="line"><span class="__shiki_140thh">  filter = </span><span class="__shiki_mdbnqw">&#39;resource.type = &quot;gce_instance&quot;&#39;</span></span></code></pre></div><h4 id="_10-1-2-统一标签管理" tabindex="-1">10.1.2 统一标签管理 <a class="header-anchor" href="#_10-1-2-统一标签管理" aria-label="Permalink to &quot;10.1.2 统一标签管理&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 全局标签处理器</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">template</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 标签模板</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">template</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">tag</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    key = </span><span class="__shiki_mdbnqw">&quot;cloud_provider&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    template = </span><span class="__shiki_mdbnqw">&quot;{{if .Tag </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">aws_account_id</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">}}aws{{else if .Tag </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">azure_subscription</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">}}azure{{else if .Tag </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">gcp_project</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">}}gcp{{else}}onprem{{end}}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">template</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">tag</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    key = </span><span class="__shiki_mdbnqw">&quot;environment&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    template = </span><span class="__shiki_mdbnqw">&quot;{{if (.Field </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">cpu_usage</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw"> | Float) &gt; 80.0}}production-critical{{else if (.Tag </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">aws_account_id</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">)}}production{{else}}development{{end}}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 字段模板</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">template</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    key = </span><span class="__shiki_mdbnqw">&quot;cost_center&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    template = </span><span class="__shiki_mdbnqw">&quot;{{.Tag </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">department</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">}}-{{.Tag </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">project</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">}}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 条件模板</span></span>
<span class="line"><span class="__shiki_140thh">  [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">template</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">    tagpass = {</span></span>
<span class="line"><span class="__shiki_140thh">      &quot;cloud_provider&quot; = [</span><span class="__shiki_mdbnqw">&quot;aws&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    [[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">template</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">tag</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">      key = </span><span class="__shiki_mdbnqw">&quot;aws_region_short&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      template = </span><span class="__shiki_mdbnqw">&quot;{{.Tag </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">aws_region</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw"> | TrimPrefix </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">us-</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw"> | TrimPrefix </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">eu-</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw"> | TrimPrefix </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">ap-</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">}}&quot;</span></span></code></pre></div><h3 id="_10-2-边缘计算监控" tabindex="-1">10.2 边缘计算监控 <a class="header-anchor" href="#_10-2-边缘计算监控" aria-label="Permalink to &quot;10.2 边缘计算监控&quot;">​</a></h3><h4 id="_10-2-1-边缘设备配置" tabindex="-1">10.2.1 边缘设备配置 <a class="header-anchor" href="#_10-2-1-边缘设备配置" aria-label="Permalink to &quot;10.2.1 边缘设备配置&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 适用于资源受限环境的轻量配置</span></span>
<span class="line"><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">agent</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  interval = </span><span class="__shiki_mdbnqw">&quot;30s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  flush_interval = </span><span class="__shiki_mdbnqw">&quot;30s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  metric_batch_size = </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_140thh">  metric_buffer_limit = </span><span class="__shiki_dzsirb">1000</span></span>
<span class="line"><span class="__shiki_140thh">  collection_jitter = </span><span class="__shiki_mdbnqw">&quot;5s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  flush_jitter = </span><span class="__shiki_mdbnqw">&quot;5s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  precision = </span><span class="__shiki_mdbnqw">&quot;s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 低内存模式</span></span>
<span class="line"><span class="__shiki_140thh">  low_memory_mode = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  max_memory_mb = </span><span class="__shiki_dzsirb">32</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 离线模式</span></span>
<span class="line"><span class="__shiki_140thh">  offline_mode = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  offline_buffer_size = </span><span class="__shiki_dzsirb">10000</span></span>
<span class="line"><span class="__shiki_140thh">  offline_buffer_path = </span><span class="__shiki_mdbnqw">&quot;/var/lib/telegraf/offline.db&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 边缘优化插件</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cpu</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  percpu = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">  totalcpu = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  fieldpass = [</span><span class="__shiki_mdbnqw">&quot;usage_user&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">mem</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  fieldpass = [</span><span class="__shiki_mdbnqw">&quot;used_percent&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">disk</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  ignore_fs = [</span><span class="__shiki_mdbnqw">&quot;tmpfs&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;devtmpfs&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  fieldpass = [</span><span class="__shiki_mdbnqw">&quot;used_percent&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># MQTT输出（边缘到云）</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">mqtt</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  servers = [</span><span class="__shiki_mdbnqw">&quot;tcp://mqtt-broker:1883&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## QoS级别</span></span>
<span class="line"><span class="__shiki_140thh">  qos = </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 主题</span></span>
<span class="line"><span class="__shiki_140thh">  topic_prefix = </span><span class="__shiki_mdbnqw">&quot;edge/devices/&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  topic = </span><span class="__shiki_mdbnqw">&quot;metrics/{{.Tag </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">device_id</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">}}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 离线消息</span></span>
<span class="line"><span class="__shiki_140thh">  retain = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  persistent_session = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 数据压缩</span></span>
<span class="line"><span class="__shiki_140thh">  compression = </span><span class="__shiki_mdbnqw">&quot;gzip&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 数据格式</span></span>
<span class="line"><span class="__shiki_140thh">  data_format = </span><span class="__shiki_mdbnqw">&quot;json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 批处理</span></span>
<span class="line"><span class="__shiki_140thh">  batch_size = </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">  batch_timeout = </span><span class="__shiki_mdbnqw">&quot;10s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 认证</span></span>
<span class="line"><span class="__shiki_140thh">  username = </span><span class="__shiki_mdbnqw">&quot;\${MQTT_USER}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  password = </span><span class="__shiki_mdbnqw">&quot;\${MQTT_PASSWORD}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## TLS</span></span>
<span class="line"><span class="__shiki_140thh">  tls_ca = </span><span class="__shiki_mdbnqw">&quot;/etc/telegraf/ca.pem&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  tls_cert = </span><span class="__shiki_mdbnqw">&quot;/etc/telegraf/edge-cert.pem&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  tls_key = </span><span class="__shiki_mdbnqw">&quot;/etc/telegraf/edge-key.pem&quot;</span></span></code></pre></div><h2 id="十一、未来发展趋势" tabindex="-1">十一、未来发展趋势 <a class="header-anchor" href="#十一、未来发展趋势" aria-label="Permalink to &quot;十一、未来发展趋势&quot;">​</a></h2><h3 id="_11-1-telegraf-2-0路线图" tabindex="-1">11.1 Telegraf 2.0路线图 <a class="header-anchor" href="#_11-1-telegraf-2-0路线图" aria-label="Permalink to &quot;11.1 Telegraf 2.0路线图&quot;">​</a></h3><h4 id="_11-1-1-架构演进" tabindex="-1">11.1.1 架构演进 <a class="header-anchor" href="#_11-1-1-架构演进" aria-label="Permalink to &quot;11.1.1 架构演进&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">Telegraf 2.0改进方向：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌──────────────────┬─────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│  改进领域        │  具体计划                                    │</span></span>
<span class="line"><span class="__shiki_wvjl67">├──────────────────┼─────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 插件架构         │ 动态插件加载，热插拔，版本管理              │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 数据处理         │ 支持流式SQL，更强大的聚合能力              │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 配置管理         │ 声明式配置，GitOps集成，配置验证           │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 可观测性         │ 分布式追踪，增强的指标，结构化日志         │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 安全增强         │ 零信任架构，硬件级安全，机密管理           │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 云原生           │ 无服务器支持，Kubernetes Operator          │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 边缘计算         │ 超轻量模式，间歇连接优化，本地AI           │</span></span>
<span class="line"><span class="__shiki_wvjl67">└──────────────────┴─────────────────────────────────────────────┘</span></span></code></pre></div><h4 id="_11-1-2-新特性预览" tabindex="-1">11.1.2 新特性预览 <a class="header-anchor" href="#_11-1-2-新特性预览" aria-label="Permalink to &quot;11.1.2 新特性预览&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Telegraf 2.0配置示例（概念性）</span></span>
<span class="line"><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">agent</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  mode = </span><span class="__shiki_mdbnqw">&quot;streaming&quot;</span><span class="__shiki_21nrsd">  # 支持流式处理</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 声明式配置</span></span>
<span class="line"><span class="__shiki_140thh">  config_source = </span><span class="__shiki_mdbnqw">&quot;git://github.com/org/repo/telegraf-config.git&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  config_ref = </span><span class="__shiki_mdbnqw">&quot;main&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 自动配置发现</span></span>
<span class="line"><span class="__shiki_140thh">  auto_discovery = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  discovery_interval = </span><span class="__shiki_mdbnqw">&quot;5m&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 流式SQL处理器</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sql</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  engine = </span><span class="__shiki_mdbnqw">&quot;flink&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  query = </span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">      device_id,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      AVG(temperature) as avg_temp,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      COUNT(*) as reading_count,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      WINDOW_START as window_start,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      WINDOW_END as window_end</span></span>
<span class="line"><span class="__shiki_mdbnqw">    FROM sensor_readings</span></span>
<span class="line"><span class="__shiki_mdbnqw">    WHERE temperature &gt; 0</span></span>
<span class="line"><span class="__shiki_mdbnqw">    GROUP BY TUMBLE(proctime, INTERVAL &#39;1&#39; MINUTE), device_id</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 状态管理</span></span>
<span class="line"><span class="__shiki_140thh">  state_backend = </span><span class="__shiki_mdbnqw">&quot;rocksdb&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  state_path = </span><span class="__shiki_mdbnqw">&quot;/var/lib/telegraf/state&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># AI增强异常检测</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">processors</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ai_anomaly</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  model = </span><span class="__shiki_mdbnqw">&quot;lstm&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  model_path = </span><span class="__shiki_mdbnqw">&quot;/etc/telegraf/models/anomaly.onnx&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 特征工程</span></span>
<span class="line"><span class="__shiki_140thh">  features = [</span><span class="__shiki_mdbnqw">&quot;value&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;rate_of_change&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;seasonality&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  ## 在线学习</span></span>
<span class="line"><span class="__shiki_140thh">  online_learning = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  learning_rate = </span><span class="__shiki_dzsirb">0.01</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><h3 id="telegraf关键优势总结" tabindex="-1">Telegraf关键优势总结 <a class="header-anchor" href="#telegraf关键优势总结" aria-label="Permalink to &quot;Telegraf关键优势总结&quot;">​</a></h3><ol><li><strong>全面性</strong>：300+官方插件覆盖几乎所有监控场景</li><li><strong>高性能</strong>：Go语言编写，单实例可处理10万+指标/秒</li><li><strong>灵活性</strong>：插件化架构支持任意数据源和目标</li><li><strong>可靠性</strong>：内置缓冲、重试、故障转移机制</li><li><strong>云原生</strong>：完美支持容器、Kubernetes、服务网格</li></ol><h3 id="最佳实践建议" tabindex="-1">最佳实践建议 <a class="header-anchor" href="#最佳实践建议" aria-label="Permalink to &quot;最佳实践建议&quot;">​</a></h3><ol><li><strong>配置管理</strong>：使用环境变量和配置模板，实现配置即代码</li><li><strong>性能优化</strong>：合理设置批处理大小和收集间隔</li><li><strong>高可用设计</strong>：部署多实例并使用负载均衡</li><li><strong>安全加固</strong>：启用TLS加密和认证机制</li><li><strong>监控自身</strong>：收集Telegraf自身指标并设置告警</li></ol><h3 id="学习路径" tabindex="-1">学习路径 <a class="header-anchor" href="#学习路径" aria-label="Permalink to &quot;学习路径&quot;">​</a></h3><ol><li><strong>初级阶段</strong>：掌握基本插件配置和InfluxDB集成</li><li><strong>中级阶段</strong>：学习处理器和聚合器的高级用法</li><li><strong>高级阶段</strong>：深入插件开发和多云监控架构</li><li><strong>专家阶段</strong>：参与社区贡献，优化大规模部署</li></ol><p>Telegraf作为现代监控栈的核心组件，将继续演进以满足日益复杂的监控需求，特别是在云原生、边缘计算和AI增强监控等领域。</p>`,146)])])}const u=a(i,[["render",l]]);export{d as __pageData,u as default};
