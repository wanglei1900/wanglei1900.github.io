import{_ as a,o as n,c as p,a as i}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"InfluxDB Flux查询语言深度解析","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/nosql/timeseries/influxdb/flux.md","filePath":"data/database/nosql/timeseries/influxdb/flux.md"}'),_={name:"data/database/nosql/timeseries/influxdb/flux.md"};function l(h,s,c,e,t,k){return n(),p("div",null,[...s[0]||(s[0]=[i(`<h1 id="influxdb-flux查询语言深度解析" tabindex="-1">InfluxDB Flux查询语言深度解析 <a class="header-anchor" href="#influxdb-flux查询语言深度解析" aria-label="Permalink to &quot;InfluxDB Flux查询语言深度解析&quot;">​</a></h1><h2 id="一、flux语言设计哲学与架构" tabindex="-1">一、Flux语言设计哲学与架构 <a class="header-anchor" href="#一、flux语言设计哲学与架构" aria-label="Permalink to &quot;一、Flux语言设计哲学与架构&quot;">​</a></h2><h3 id="_1-1-flux诞生的背景与目标" tabindex="-1">1.1 Flux诞生的背景与目标 <a class="header-anchor" href="#_1-1-flux诞生的背景与目标" aria-label="Permalink to &quot;1.1 Flux诞生的背景与目标&quot;">​</a></h3><p><strong>Flux</strong>是InfluxDB 2.0引入的全新数据脚本语言，旨在解决InfluxQL的局限性：</p><h4 id="_1-1-1-influxql的不足" tabindex="-1">1.1.1 InfluxQL的不足 <a class="header-anchor" href="#_1-1-1-influxql的不足" aria-label="Permalink to &quot;1.1.1 InfluxQL的不足&quot;">​</a></h4><ul><li><strong>表达能力有限</strong>：复杂数据处理需要多次查询</li><li><strong>缺乏可组合性</strong>：查询结果难以作为后续查询输入</li><li><strong>单一数据源</strong>：难以跨数据源查询</li><li><strong>过程化逻辑缺失</strong>：不支持条件、循环等编程结构</li></ul><h4 id="_1-1-2-flux设计目标" tabindex="-1">1.1.2 Flux设计目标 <a class="header-anchor" href="#_1-1-2-flux设计目标" aria-label="Permalink to &quot;1.1.2 Flux设计目标&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">Flux核心设计原则：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌──────────────────┬─────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│  设计原则        │  具体实现                                    │</span></span>
<span class="line"><span class="__shiki_wvjl67">├──────────────────┼─────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 函数式          │ 不可变数据，纯函数，函数组合                 │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 管道化          │ |&gt; 管道操作符连接数据处理步骤                │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 可扩展          │ 自定义函数，包系统，插件架构                 │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 跨平台          │ 支持多种数据源：InfluxDB、CSV、SQL数据库等   │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 强类型          │ 静态类型系统，编译时类型检查                 │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 可读性          │ 类似JavaScript的语法，自描述性强            │</span></span>
<span class="line"><span class="__shiki_wvjl67">└──────────────────┴─────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_1-2-flux语言架构" tabindex="-1">1.2 Flux语言架构 <a class="header-anchor" href="#_1-2-flux语言架构" aria-label="Permalink to &quot;1.2 Flux语言架构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">Flux执行引擎架构：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                    Flux执行栈                           │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────┬─────────────┬─────────────┬───────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│   查询接口  │   Flux编译  │   执行器    │   数据源      │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  (UI/API)   │   器        │  (Runtime)  │   Connectors  │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────┼─────────────┼─────────────┼───────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 脚本编辑器│ • 语法分析  │ • 计划器    │ • InfluxDB    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • HTTP API  │ • 类型检查  │ • 优化器    │ • PostgreSQL  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 命令行    │ • AST转换  │ • 执行器    │ • MySQL       │</span></span>
<span class="line"><span class="__shiki_wvjl67">│             │ • 代码生成  │ • 内存管理  │ • CSV文件     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│             │             │ • 并行执行  │ • Prometheus  │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────┴─────────────┴─────────────┴───────────────┘</span></span></code></pre></div><h2 id="二、flux核心语法与数据类型" tabindex="-1">二、Flux核心语法与数据类型 <a class="header-anchor" href="#二、flux核心语法与数据类型" aria-label="Permalink to &quot;二、Flux核心语法与数据类型&quot;">​</a></h2><h3 id="_2-1-基本语法结构" tabindex="-1">2.1 基本语法结构 <a class="header-anchor" href="#_2-1-基本语法结构" aria-label="Permalink to &quot;2.1 基本语法结构&quot;">​</a></h3><h4 id="_2-1-1-管道操作符" tabindex="-1">2.1.1 管道操作符 <a class="header-anchor" href="#_2-1-1-管道操作符" aria-label="Permalink to &quot;2.1.1 管道操作符&quot;">​</a></h4><p>Flux的核心是管道操作符 <code>|&gt;</code>，数据从左向右流动：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 基础管道示例</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">  |</span><span class="__shiki_2bbn9v">&gt; range(start: -1h)          // 第一步：时间范围</span></span>
<span class="line"><span class="__shiki_mdbnqw">  |&gt; filter(fn: (r) =&gt; r._measurement == &quot;cpu&quot;)  // 第二步：过滤</span></span>
<span class="line"><span class="__shiki_mdbnqw">  |&gt; aggregateWindow(every: 1m, fn: mean)  // 第三步：聚合</span></span>
<span class="line"><span class="__shiki_mdbnqw">  |&gt; yield(name: &quot;result&quot;)      // 第四步：输出</span></span></code></pre></div><h4 id="_2-1-2-注释系统" tabindex="-1">2.1.2 注释系统 <a class="header-anchor" href="#_2-1-2-注释系统" aria-label="Permalink to &quot;2.1.2 注释系统&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 单行注释</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">/*</span></span>
<span class="line"><span class="__shiki_mdbnqw">   多行注释</span></span>
<span class="line"><span class="__shiki_mdbnqw">   可以跨越多行</span></span>
<span class="line"><span class="__shiki_140thh">*</span><span class="__shiki_mdbnqw">/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 文档注释（用于生成文档）</span></span>
<span class="line"><span class="__shiki_mdbnqw">// queryData 函数从指定bucket查询数据</span></span>
<span class="line"><span class="__shiki_mdbnqw">// 参数：</span></span>
<span class="line"><span class="__shiki_17hn0y">//   bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">存储桶名称</span></span>
<span class="line"><span class="__shiki_17hn0y">//   start</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">开始时间</span></span>
<span class="line"><span class="__shiki_mdbnqw">queryData = (bucket, start) =&gt; {</span></span>
<span class="line"><span class="__shiki_17hn0y">    from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bucket)</span></span>
<span class="line"><span class="__shiki_1itgoe">        |</span><span class="__shiki_2bbn9v">&gt; range(start: start)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-2-数据类型系统" tabindex="-1">2.2 数据类型系统 <a class="header-anchor" href="#_2-2-数据类型系统" aria-label="Permalink to &quot;2.2 数据类型系统&quot;">​</a></h3><h4 id="_2-2-1-基本类型" tabindex="-1">2.2.1 基本类型 <a class="header-anchor" href="#_2-2-1-基本类型" aria-label="Permalink to &quot;2.2.1 基本类型&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 字符串</span></span>
<span class="line"><span class="__shiki_mdbnqw">name = &quot;server01&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">multiline = &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    多行字符串</span></span>
<span class="line"><span class="__shiki_mdbnqw">    第二行</span></span>
<span class="line"><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 数值</span></span>
<span class="line"><span class="__shiki_mdbnqw">integer = 42</span></span>
<span class="line"><span class="__shiki_mdbnqw">float = 3.14159</span></span>
<span class="line"><span class="__shiki_mdbnqw">duration = 1h30m  // 时间间隔</span></span>
<span class="line"><span class="__shiki_mdbnqw">time = 2023-01-01T00:00:00Z  // 时间戳</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 布尔值</span></span>
<span class="line"><span class="__shiki_mdbnqw">enabled = true</span></span>
<span class="line"><span class="__shiki_mdbnqw">disabled = false</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 正则表达式</span></span>
<span class="line"><span class="__shiki_mdbnqw">pattern = /^server\\d+$/  // 匹配server后跟数字</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 字节数组</span></span>
<span class="line"><span class="__shiki_mdbnqw">bytes = 0xBEEF</span></span></code></pre></div><h4 id="_2-2-2-复合类型" tabindex="-1">2.2.2 复合类型 <a class="header-anchor" href="#_2-2-2-复合类型" aria-label="Permalink to &quot;2.2.2 复合类型&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 数组</span></span>
<span class="line"><span class="__shiki_mdbnqw">numbers = [1, 2, 3, 4, 5]</span></span>
<span class="line"><span class="__shiki_mdbnqw">mixed = [1, &quot;two&quot;, true]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 记录（对象）</span></span>
<span class="line"><span class="__shiki_mdbnqw">record = {</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;server01&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">    ip</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;192.168.1.1&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">    tags</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;web&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;production&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 嵌套结构</span></span>
<span class="line"><span class="__shiki_mdbnqw">config = {</span></span>
<span class="line"><span class="__shiki_17hn0y">    database</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_17hn0y">        host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;localhost&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">        port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8086</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">        credentials</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_17hn0y">            username</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;admin&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">            password</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;secret&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-2-3-特殊类型-流-stream" tabindex="-1">2.2.3 特殊类型：流（Stream） <a class="header-anchor" href="#_2-2-3-特殊类型-流-stream" aria-label="Permalink to &quot;2.2.3 特殊类型：流（Stream）&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 流是Flux的核心数据表示形式</span></span>
<span class="line"><span class="__shiki_mdbnqw">// 概念上是一个表格序列，每个表格有相同的列结构</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 流的模式（Schema）示例</span></span>
<span class="line"><span class="__shiki_mdbnqw">stream_schema = {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    // 列定义</span></span>
<span class="line"><span class="__shiki_17hn0y">    columns</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_17hn0y">        _time</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;time&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">        _value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;float&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">        _measurement</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;string&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">        _field</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;string&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">        host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;string&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">        region</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;string&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    // 分组键（Group Key）</span></span>
<span class="line"><span class="__shiki_17hn0y">    group_key</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_17hn0y">        _measurement</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;cpu&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">        _field</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;usage_user&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">        host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;server01&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    // 数据行</span></span>
<span class="line"><span class="__shiki_17hn0y">    data</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">        {</span><span class="__shiki_17hn0y">_time</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2023-01-01T00:00:00Z</span><span class="__shiki_140thh">, </span><span class="__shiki_17hn0y">_value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">23.5</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">        {</span><span class="__shiki_17hn0y">_time</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2023-01-01T00:01:00Z</span><span class="__shiki_140thh">, </span><span class="__shiki_17hn0y">_value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">24.1</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-3-变量与作用域" tabindex="-1">2.3 变量与作用域 <a class="header-anchor" href="#_2-3-变量与作用域" aria-label="Permalink to &quot;2.3 变量与作用域&quot;">​</a></h3><h4 id="_2-3-1-变量声明" tabindex="-1">2.3.1 变量声明 <a class="header-anchor" href="#_2-3-1-变量声明" aria-label="Permalink to &quot;2.3.1 变量声明&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 常量（不可重新赋值）</span></span>
<span class="line"><span class="__shiki_mdbnqw">constant_value = 42</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 变量（可重新赋值）</span></span>
<span class="line"><span class="__shiki_mdbnqw">variable_value = &quot;initial&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">variable_value = &quot;updated&quot;  // 允许重新赋值</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 块作用域</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_mdbnqw">    local_var = &quot;只在块内可见&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    // 外部无法访问local_var</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_mdbnqw">// 这里无法访问local_var</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 函数作用域</span></span>
<span class="line"><span class="__shiki_mdbnqw">add = (a, b) =&gt; {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    result = a + b  // 函数内局部变量</span></span>
<span class="line"><span class="__shiki_mdbnqw">    return result</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-3-2-类型注解-type-annotations" tabindex="-1">2.3.2 类型注解（Type Annotations） <a class="header-anchor" href="#_2-3-2-类型注解-type-annotations" aria-label="Permalink to &quot;2.3.2 类型注解（Type Annotations）&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 显式类型注解（可选但推荐）</span></span>
<span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">string = &quot;server01&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">count</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">int = 100</span></span>
<span class="line"><span class="__shiki_17hn0y">ratio</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">float = 0.85</span></span>
<span class="line"><span class="__shiki_17hn0y">active</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bool = true</span></span>
<span class="line"><span class="__shiki_17hn0y">timestamp</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">time = 2023-01-01T00:00:00Z</span></span>
<span class="line"><span class="__shiki_17hn0y">interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">duration = 5m</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 函数类型注解</span></span>
<span class="line"><span class="__shiki_17hn0y">add = (a</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">float, b</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">float) =&gt; {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    return a + b</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 带返回类型注解的函数</span></span>
<span class="line"><span class="__shiki_17hn0y">multiply = (x</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">float, y</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">float) -&gt; float =&gt; {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    return x * y</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="三、flux函数系统" tabindex="-1">三、Flux函数系统 <a class="header-anchor" href="#三、flux函数系统" aria-label="Permalink to &quot;三、Flux函数系统&quot;">​</a></h2><h3 id="_3-1-函数定义与调用" tabindex="-1">3.1 函数定义与调用 <a class="header-anchor" href="#_3-1-函数定义与调用" aria-label="Permalink to &quot;3.1 函数定义与调用&quot;">​</a></h3><h4 id="_3-1-1-函数定义语法" tabindex="-1">3.1.1 函数定义语法 <a class="header-anchor" href="#_3-1-1-函数定义语法" aria-label="Permalink to &quot;3.1.1 函数定义语法&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 基本函数</span></span>
<span class="line"><span class="__shiki_mdbnqw">square = (x) =&gt; {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    return x * x</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 简写形式（单表达式）</span></span>
<span class="line"><span class="__shiki_mdbnqw">cube = (x) =&gt; x * x * x</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 多参数函数</span></span>
<span class="line"><span class="__shiki_mdbnqw">distance = (x1, y1, x2, y2) =&gt; {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    dx = x2 - x1</span></span>
<span class="line"><span class="__shiki_mdbnqw">    dy = y2 - y1</span></span>
<span class="line"><span class="__shiki_17hn0y">    return math.sqrt(x</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">dx*dx + dy*dy)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 默认参数</span></span>
<span class="line"><span class="__shiki_17hn0y">greet = (name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">string = &quot;World&quot;) =&gt; {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    return &quot;Hello, \${name}!&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 命名参数调用</span></span>
<span class="line"><span class="__shiki_17hn0y">result = greet(name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Alice&quot;)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 可变参数（接受任意数量参数）</span></span>
<span class="line"><span class="__shiki_mdbnqw">sumAll = (values...) =&gt; {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    total = 0.0</span></span>
<span class="line"><span class="__shiki_mdbnqw">    for v in values {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        total = total + v</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    return total</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-1-2-高阶函数" tabindex="-1">3.1.2 高阶函数 <a class="header-anchor" href="#_3-1-2-高阶函数" aria-label="Permalink to &quot;3.1.2 高阶函数&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 函数作为参数</span></span>
<span class="line"><span class="__shiki_mdbnqw">applyFunction = (data, fn) =&gt; {</span></span>
<span class="line"><span class="__shiki_17hn0y">    return data |&gt; map(fn</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">fn)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 返回函数的函数</span></span>
<span class="line"><span class="__shiki_mdbnqw">multiplier = (factor) =&gt; {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    return (x) =&gt; x * factor</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">double = multiplier(factor</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2)</span></span>
<span class="line"><span class="__shiki_17hn0y">triple = multiplier(factor</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">3)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 使用示例</span></span>
<span class="line"><span class="__shiki_17hn0y">result1 = double(x</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5)  // 10</span></span>
<span class="line"><span class="__shiki_17hn0y">result2 = triple(x</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5)  // 15</span></span></code></pre></div><h3 id="_3-2-内置函数库" tabindex="-1">3.2 内置函数库 <a class="header-anchor" href="#_3-2-内置函数库" aria-label="Permalink to &quot;3.2 内置函数库&quot;">​</a></h3><h4 id="_3-2-1-数学函数" tabindex="-1">3.2.1 数学函数 <a class="header-anchor" href="#_3-2-1-数学函数" aria-label="Permalink to &quot;3.2.1 数学函数&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">import &quot;math&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 基本运算</span></span>
<span class="line"><span class="__shiki_17hn0y">math.abs(x</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">-5)        // 绝对值</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_17hn0y">math.ceil(x</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">3.14)     // 向上取整</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">4</span></span>
<span class="line"><span class="__shiki_17hn0y">math.floor(x</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">3.14)    // 向下取整</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">math.round(x</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">3.14)    // 四舍五入</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">math.sqrt(x</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">16)       // 平方根</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">4</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 三角函数</span></span>
<span class="line"><span class="__shiki_17hn0y">math.sin(x</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">math.pi / 2)   // 正弦</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1.0</span></span>
<span class="line"><span class="__shiki_17hn0y">math.cos(x</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">0)             // 余弦</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1.0</span></span>
<span class="line"><span class="__shiki_17hn0y">math.tan(x</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">math.pi / 4)   // 正切</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1.0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 对数和指数</span></span>
<span class="line"><span class="__shiki_17hn0y">math.exp(x</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">1)         // e^x</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2.718</span></span>
<span class="line"><span class="__shiki_17hn0y">math.log(x</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">10)        // 自然对数</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2.302</span></span>
<span class="line"><span class="__shiki_17hn0y">math.log2(x</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">8)        // 以2为底对数</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3.0</span></span>
<span class="line"><span class="__shiki_17hn0y">math.log10(x</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">100)     // 以10为底对数</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2.0</span></span>
<span class="line"><span class="__shiki_17hn0y">math.pow(x</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">2, y</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">3)   // 幂运算</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 统计函数</span></span>
<span class="line"><span class="__shiki_mdbnqw">values = [1, 2, 3, 4, 5]</span></span>
<span class="line"><span class="__shiki_17hn0y">math.mean(values</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">values)      // 平均值</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">math.median(values</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">values)    // 中位数</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">math.mode(values</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">values)      // 众数</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">math.stddev(values</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">values)    // 标准差</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1.581</span></span>
<span class="line"><span class="__shiki_17hn0y">math.variance(values</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">values)  // 方差</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2.5</span></span></code></pre></div><h4 id="_3-2-2-字符串处理" tabindex="-1">3.2.2 字符串处理 <a class="header-anchor" href="#_3-2-2-字符串处理" aria-label="Permalink to &quot;3.2.2 字符串处理&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">import &quot;strings&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 大小写转换</span></span>
<span class="line"><span class="__shiki_17hn0y">strings.toUpper(v</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;hello&quot;)</span><span class="__shiki_mdbnqw">     // &quot;HELLO&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">strings.toLower(v</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;WORLD&quot;)</span><span class="__shiki_mdbnqw">     // &quot;world&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">strings.title(v</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;hello world&quot;)</span><span class="__shiki_mdbnqw"> // &quot;Hello World&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 修剪与填充</span></span>
<span class="line"><span class="__shiki_17hn0y">strings.trim(v</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;  hello  &quot;)</span><span class="__shiki_mdbnqw">        // &quot;hello&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">strings.trimPrefix(v</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;foo_bar&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_17hn0y">prefix</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;foo_&quot;)</span><span class="__shiki_mdbnqw"> // &quot;bar&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">strings.trimSuffix(v</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;foo_bar&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_17hn0y">suffix</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;_bar&quot;)</span><span class="__shiki_mdbnqw"> // &quot;foo&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">strings.trimSpace(v</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;  hello  &quot;)</span><span class="__shiki_mdbnqw">   // &quot;hello&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 搜索与替换</span></span>
<span class="line"><span class="__shiki_17hn0y">strings.contains(v</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;hello&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_17hn0y">substr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;ell&quot;)</span><span class="__shiki_mdbnqw">  // true</span></span>
<span class="line"><span class="__shiki_17hn0y">strings.hasPrefix(v</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;hello&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_17hn0y">prefix</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;he&quot;)</span><span class="__shiki_mdbnqw">  // true</span></span>
<span class="line"><span class="__shiki_17hn0y">strings.hasSuffix(v</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;hello&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_17hn0y">suffix</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;lo&quot;)</span><span class="__shiki_mdbnqw">  // true</span></span>
<span class="line"><span class="__shiki_17hn0y">strings.replaceAll(v</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;foo bar foo&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_17hn0y">t</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;foo&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_17hn0y">u</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;baz&quot;)</span><span class="__shiki_mdbnqw">  // &quot;baz bar baz&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">strings.replaceFirst(v</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;foo bar foo&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_17hn0y">t</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;foo&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_17hn0y">u</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;baz&quot;)</span><span class="__shiki_mdbnqw"> // &quot;baz bar foo&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 分割与连接</span></span>
<span class="line"><span class="__shiki_17hn0y">strings.split(v</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;a,b,c&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_17hn0y">t</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;,&quot;)</span><span class="__shiki_mdbnqw">       // [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]</span></span>
<span class="line"><span class="__shiki_17hn0y">strings.splitAfter(v</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;a,b,c&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_17hn0y">t</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;,&quot;)</span><span class="__shiki_mdbnqw">   // [&quot;a,&quot;, &quot;b,&quot;, &quot;c&quot;]</span></span>
<span class="line"><span class="__shiki_17hn0y">strings.splitN(v</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;a,b,c&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_17hn0y">t</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;,&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">n</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2) // [&quot;a&quot;, &quot;b,c&quot;]</span></span>
<span class="line"><span class="__shiki_17hn0y">strings.join(v</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;a&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;b&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;c&quot;</span><span class="__shiki_140thh">], </span><span class="__shiki_17hn0y">sep</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;,&quot;)</span><span class="__shiki_mdbnqw"> // &quot;a,b,c&quot;</span></span></code></pre></div><h4 id="_3-2-3-日期时间处理" tabindex="-1">3.2.3 日期时间处理 <a class="header-anchor" href="#_3-2-3-日期时间处理" aria-label="Permalink to &quot;3.2.3 日期时间处理&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">import &quot;date&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">import &quot;timezone&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 时间解析</span></span>
<span class="line"><span class="__shiki_17hn0y">time(v</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2023-01-01T00:00:00Z&quot;)</span></span>
<span class="line"><span class="__shiki_17hn0y">time(v</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2023-01-01&quot;)</span><span class="__shiki_mdbnqw">  // 自动补充时间部分</span></span>
<span class="line"><span class="__shiki_17hn0y">duration(v</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1h30m&quot;)</span></span>
<span class="line"><span class="__shiki_17hn0y">duration(v</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2.5h&quot;)</span><span class="__shiki_mdbnqw">    // 2.5小时</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 日期组件提取</span></span>
<span class="line"><span class="__shiki_mdbnqw">d = 2023-01-15T14:30:45Z</span></span>
<span class="line"><span class="__shiki_17hn0y">date.year(t</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">d)           // 2023</span></span>
<span class="line"><span class="__shiki_17hn0y">date.month(t</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">d)          // 1</span></span>
<span class="line"><span class="__shiki_17hn0y">date.day(t</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">d)            // 15</span></span>
<span class="line"><span class="__shiki_17hn0y">date.weekDay(t</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">d)        // 0 (星期天)</span></span>
<span class="line"><span class="__shiki_17hn0y">date.hour(t</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">d)           // 14</span></span>
<span class="line"><span class="__shiki_17hn0y">date.minute(t</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">d)         // 30</span></span>
<span class="line"><span class="__shiki_17hn0y">date.second(t</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">d)         // 45</span></span>
<span class="line"><span class="__shiki_17hn0y">date.microsecond(t</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">d)    // 0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 日期算术</span></span>
<span class="line"><span class="__shiki_17hn0y">date.add(d</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">1h, to</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">d)             // 加1小时</span></span>
<span class="line"><span class="__shiki_17hn0y">date.sub(d</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">30m, from</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">d)          // 减30分钟</span></span>
<span class="line"><span class="__shiki_17hn0y">date.truncate(t</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">d, unit</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">1h)      // 截断到小时</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2023-01-15T14:00:00Z</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 时区处理</span></span>
<span class="line"><span class="__shiki_17hn0y">timezone.location(name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;America/New_York&quot;)</span></span>
<span class="line"><span class="__shiki_17hn0y">timezone.fixed(offset</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">-5h)  // UTC-5</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 时间范围计算</span></span>
<span class="line"><span class="__shiki_17hn0y">date.scale(x</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">1h, n</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5)  // 5小时</span></span>
<span class="line"><span class="__shiki_17hn0y">date.millisecond(t</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">d)   // 毫秒表示</span></span></code></pre></div><h2 id="四、flux查询处理管道" tabindex="-1">四、Flux查询处理管道 <a class="header-anchor" href="#四、flux查询处理管道" aria-label="Permalink to &quot;四、Flux查询处理管道&quot;">​</a></h2><h3 id="_4-1-数据获取阶段" tabindex="-1">4.1 数据获取阶段 <a class="header-anchor" href="#_4-1-数据获取阶段" aria-label="Permalink to &quot;4.1 数据获取阶段&quot;">​</a></h3><h4 id="_4-1-1-from-函数详解" tabindex="-1">4.1.1 from() 函数详解 <a class="header-anchor" href="#_4-1-1-from-函数详解" aria-label="Permalink to &quot;4.1.1 from() 函数详解&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 基础用法</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;telegraf&quot;)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 指定保留策略（兼容InfluxDB 1.x）</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;telegraf/autogen&quot;)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 使用变量</span></span>
<span class="line"><span class="__shiki_mdbnqw">bucket_name = &quot;production_metrics&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">time_range = -1h</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">data = from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bucket_name)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: time_range)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 多bucket查询（需要union）</span></span>
<span class="line"><span class="__shiki_17hn0y">data1 = from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;bucket1&quot;</span><span class="__shiki_17hn0y">) |&gt; range(start</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">-1h)</span></span>
<span class="line"><span class="__shiki_17hn0y">data2 = from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;bucket2&quot;</span><span class="__shiki_17hn0y">) |&gt; range(start</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">-1h)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">combined = union(tables</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">data1</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">data2</span><span class="__shiki_140thh">]</span><span class="__shiki_mdbnqw">)</span></span></code></pre></div><h4 id="_4-1-2-range-函数详解" tabindex="-1">4.1.2 range() 函数详解 <a class="header-anchor" href="#_4-1-2-range-函数详解" aria-label="Permalink to &quot;4.1.2 range() 函数详解&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 相对时间</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -1h)                // 过去1小时</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; range(start: -1h, stop: -10m)    // 过去1小时，但排除最近10分钟</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 绝对时间</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: 2023-01-01T00:00:00Z, stop: 2023-01-02T00:00:00Z)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 动态时间范围</span></span>
<span class="line"><span class="__shiki_mdbnqw">now = system.time()</span></span>
<span class="line"><span class="__shiki_17hn0y">one_hour_ago = date.sub(d</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">1h, from</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">now)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: one_hour_ago, stop: now)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 无停止时间（查询到最新）</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -30m)  // 自动查询到最新数据</span></span></code></pre></div><h3 id="_4-2-数据过滤与转换" tabindex="-1">4.2 数据过滤与转换 <a class="header-anchor" href="#_4-2-数据过滤与转换" aria-label="Permalink to &quot;4.2 数据过滤与转换&quot;">​</a></h3><h4 id="_4-2-1-filter-高级用法" tabindex="-1">4.2.1 filter() 高级用法 <a class="header-anchor" href="#_4-2-1-filter-高级用法" aria-label="Permalink to &quot;4.2.1 filter() 高级用法&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 基础过滤</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; filter(fn: (r) =&gt; r._measurement == &quot;cpu&quot;)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 多条件过滤</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; filter(fn: (r) =&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        r._measurement == &quot;cpu&quot; and</span></span>
<span class="line"><span class="__shiki_mdbnqw">        r._field == &quot;usage_user&quot; and</span></span>
<span class="line"><span class="__shiki_mdbnqw">        r.cpu == &quot;cpu-total&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    )</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 正则表达式过滤</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; filter(fn: (r) =&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        r.host =~ /^web-server-\\d+$/ and  // 匹配web-server-数字</span></span>
<span class="line"><span class="__shiki_mdbnqw">        r._measurement !~ /^test_/         // 排除test_开头的measurement</span></span>
<span class="line"><span class="__shiki_mdbnqw">    )</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 动态过滤条件</span></span>
<span class="line"><span class="__shiki_mdbnqw">allowed_hosts = [&quot;server01&quot;, &quot;server02&quot;, &quot;server03&quot;]</span></span>
<span class="line"><span class="__shiki_mdbnqw">min_value = 50.0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; filter(fn: (r) =&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        contains(value: r.host, set: allowed_hosts) and</span></span>
<span class="line"><span class="__shiki_mdbnqw">        r._value &gt;= min_value</span></span>
<span class="line"><span class="__shiki_mdbnqw">    )</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 基于时间的过滤</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; filter(fn: (r) =&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        date.hour(t: r._time) &gt;= 9 and</span></span>
<span class="line"><span class="__shiki_mdbnqw">        date.hour(t: r._time) &lt;= 17</span></span>
<span class="line"><span class="__shiki_mdbnqw">    )</span></span></code></pre></div><h4 id="_4-2-2-map-数据转换" tabindex="-1">4.2.2 map() 数据转换 <a class="header-anchor" href="#_4-2-2-map-数据转换" aria-label="Permalink to &quot;4.2.2 map() 数据转换&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 基本转换</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -1h)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; filter(fn: (r) =&gt; r._measurement == &quot;temperature&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; map(fn: (r) =&gt; ({</span></span>
<span class="line"><span class="__shiki_mdbnqw">        r with</span></span>
<span class="line"><span class="__shiki_mdbnqw">        _value: (r._value - 32) * 5/9  // 华氏度转摄氏度</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 添加新字段</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; map(fn: (r) =&gt; ({</span></span>
<span class="line"><span class="__shiki_mdbnqw">        r with</span></span>
<span class="line"><span class="__shiki_mdbnqw">        computed_field: r._value * 100,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        status: if r._value &gt; 80 then &quot;high&quot; else &quot;normal&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        timestamp_ms: int(v: r._time) / 1000000  // 纳秒转毫秒</span></span>
<span class="line"><span class="__shiki_140thh">    }</span><span class="__shiki_mdbnqw">))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 复杂计算</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;finance&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; map(fn: (r) =&gt; {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        // 计算移动平均</span></span>
<span class="line"><span class="__shiki_mdbnqw">        window_size = 5</span></span>
<span class="line"><span class="__shiki_mdbnqw">        values = window(rows: window_size)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        avg_value = if length(arr: values) &gt;= window_size then</span></span>
<span class="line"><span class="__shiki_mdbnqw">            mean(values: values)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        else</span></span>
<span class="line"><span class="__shiki_mdbnqw">            0.0</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        return {r with moving_avg: avg_value}</span></span>
<span class="line"><span class="__shiki_140thh">    }</span><span class="__shiki_mdbnqw">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 类型转换</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; map(fn: (r) =&gt; ({</span></span>
<span class="line"><span class="__shiki_mdbnqw">        r with</span></span>
<span class="line"><span class="__shiki_mdbnqw">        value_int: int(v: r._value),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        value_string: string(v: r._value),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        is_high: bool(v: r._value &gt; 50.0)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span><span class="__shiki_mdbnqw">))</span></span></code></pre></div><h4 id="_4-2-3-pivot-行列转换" tabindex="-1">4.2.3 pivot() 行列转换 <a class="header-anchor" href="#_4-2-3-pivot-行列转换" aria-label="Permalink to &quot;4.2.3 pivot() 行列转换&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 将不同field的值转换为列</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;system&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -1h)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; filter(fn: (r) =&gt; r._measurement == &quot;cpu&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; pivot(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        rowKey: [&quot;_time&quot;, &quot;host&quot;],</span></span>
<span class="line"><span class="__shiki_mdbnqw">        columnKey: [&quot;_field&quot;],</span></span>
<span class="line"><span class="__shiki_mdbnqw">        valueColumn: &quot;_value&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    )</span></span>
<span class="line"><span class="__shiki_mdbnqw">// 结果示例：</span></span>
<span class="line"><span class="__shiki_mdbnqw">// _time, host, usage_user, usage_system, usage_idle</span></span>
<span class="line"><span class="__shiki_mdbnqw">// 2023-01-01T00:00:00Z, server01, 23.5, 12.1, 64.4</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 反向操作：unpivot（宽表转长表）</span></span>
<span class="line"><span class="__shiki_mdbnqw">wide_data</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; pivot(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        rowKey: [&quot;_time&quot;, &quot;host&quot;],</span></span>
<span class="line"><span class="__shiki_mdbnqw">        columnKey: [&quot;_field&quot;],</span></span>
<span class="line"><span class="__shiki_mdbnqw">        valueColumn: &quot;_value&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    )</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; rename(columns: {&quot;usage_user&quot;: &quot;value&quot;})</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; map(fn: (r) =&gt; ({r with _field: &quot;usage_user&quot;}))</span></span></code></pre></div><h3 id="_4-3-数据聚合与分组" tabindex="-1">4.3 数据聚合与分组 <a class="header-anchor" href="#_4-3-数据聚合与分组" aria-label="Permalink to &quot;4.3 数据聚合与分组&quot;">​</a></h3><h4 id="_4-3-1-聚合函数详解" tabindex="-1">4.3.1 聚合函数详解 <a class="header-anchor" href="#_4-3-1-聚合函数详解" aria-label="Permalink to &quot;4.3.1 聚合函数详解&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 基础聚合</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -1h)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; filter(fn: (r) =&gt; r._measurement == &quot;http_requests&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; group(columns: [&quot;method&quot;, &quot;status&quot;])</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; aggregateWindow(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        every: 1m,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        fn: (column, tables=&lt;-) =&gt; tables</span></span>
<span class="line"><span class="__shiki_mdbnqw">            |&gt; mean(column: column)  // 平均值</span></span>
<span class="line"><span class="__shiki_mdbnqw">            |&gt; sum(column: column)   // 总和</span></span>
<span class="line"><span class="__shiki_mdbnqw">            |&gt; count(column: column) // 计数</span></span>
<span class="line"><span class="__shiki_mdbnqw">            |&gt; min(column: column)   // 最小值</span></span>
<span class="line"><span class="__shiki_mdbnqw">            |&gt; max(column: column)   // 最大值</span></span>
<span class="line"><span class="__shiki_mdbnqw">    )</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 统计聚合</span></span>
<span class="line"><span class="__shiki_mdbnqw">import &quot;statistics&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; statistics.histogram(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        column: &quot;_value&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        bins: [0, 10, 20, 30, 40, 50],</span></span>
<span class="line"><span class="__shiki_mdbnqw">        normalize: false</span></span>
<span class="line"><span class="__shiki_mdbnqw">    )</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; statistics.cov(x: &quot;x_column&quot;, y: &quot;y_column&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; statistics.pearsonr(x: &quot;x_column&quot;, y: &quot;y_column&quot;)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 百分位数聚合</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; aggregateWindow(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        every: 5m,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        fn: (column, tables=&lt;-) =&gt; tables</span></span>
<span class="line"><span class="__shiki_mdbnqw">            |&gt; quantile(column: column, q: 0.95)    // P95</span></span>
<span class="line"><span class="__shiki_mdbnqw">            |&gt; quantile(column: column, q: 0.99)    // P99</span></span>
<span class="line"><span class="__shiki_mdbnqw">            |&gt; median(column: column)               // P50</span></span>
<span class="line"><span class="__shiki_mdbnqw">            |&gt; spread(column: column)               // 极差</span></span>
<span class="line"><span class="__shiki_mdbnqw">    )</span></span></code></pre></div><h4 id="_4-3-2-时间窗口聚合" tabindex="-1">4.3.2 时间窗口聚合 <a class="header-anchor" href="#_4-3-2-时间窗口聚合" aria-label="Permalink to &quot;4.3.2 时间窗口聚合&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 基础窗口聚合</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; aggregateWindow(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        every: 5m,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        fn: mean,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        createEmpty: false,  // 不创建空窗口</span></span>
<span class="line"><span class="__shiki_mdbnqw">        timeSrc: &quot;_time&quot;,    // 时间源列</span></span>
<span class="line"><span class="__shiki_mdbnqw">        timeDst: &quot;_time&quot;     // 结果时间列</span></span>
<span class="line"><span class="__shiki_mdbnqw">    )</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 对齐时间窗口</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; aggregateWindow(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        every: 1h,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        period: 30m,         // 窗口大小</span></span>
<span class="line"><span class="__shiki_mdbnqw">        offset: 15m,         // 窗口偏移</span></span>
<span class="line"><span class="__shiki_mdbnqw">        fn: mean</span></span>
<span class="line"><span class="__shiki_mdbnqw">    )</span></span>
<span class="line"><span class="__shiki_17hn0y">// 窗口</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">00:15-00:45, 01:15-01:45, ...</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 滚动窗口（无重叠）</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; window(every: 5m)     // 5分钟窗口</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; mean()                // 每个窗口内平均</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; duplicate(column: &quot;_stop&quot;, as: &quot;_time&quot;)  // 使用窗口结束时间</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; window(every: inf)    // 合并所有窗口</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 滑动窗口（有重叠）</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; timedMovingAverage(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        every: 1m,           // 输出频率</span></span>
<span class="line"><span class="__shiki_mdbnqw">        period: 5m,          // 窗口大小</span></span>
<span class="line"><span class="__shiki_mdbnqw">        column: &quot;_value&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    )</span></span></code></pre></div><h4 id="_4-3-3-分组策略" tabindex="-1">4.3.3 分组策略 <a class="header-anchor" href="#_4-3-3-分组策略" aria-label="Permalink to &quot;4.3.3 分组策略&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 按标签分组</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; group(columns: [&quot;host&quot;, &quot;region&quot;])  // 按host和region分组</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; group(columns: [&quot;*&quot;])               // 按所有标签分组</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; group()                             // 清除分组（合并所有数据）</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 嵌套分组</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; group(columns: [&quot;host&quot;])</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; aggregateWindow(every: 1m, fn: mean)  // 每个host单独聚合</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; group(columns: [])                    // 合并所有host</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; aggregateWindow(every: 5m, fn: mean)  // 跨host聚合</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 动态分组</span></span>
<span class="line"><span class="__shiki_mdbnqw">group_columns = if system.time().hour &gt;= 18 then</span></span>
<span class="line"><span class="__shiki_140thh">    [</span><span class="__shiki_mdbnqw">&quot;host&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;environment&quot;</span><span class="__shiki_140thh">]  </span><span class="__shiki_mdbnqw">// 晚间按环境分组</span></span>
<span class="line"><span class="__shiki_mdbnqw">else</span></span>
<span class="line"><span class="__shiki_140thh">    [</span><span class="__shiki_mdbnqw">&quot;host&quot;</span><span class="__shiki_140thh">]                 </span><span class="__shiki_mdbnqw">// 白天只按host分组</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; group(columns: group_columns)</span></span></code></pre></div><h3 id="_4-4-数据连接与合并" tabindex="-1">4.4 数据连接与合并 <a class="header-anchor" href="#_4-4-数据连接与合并" aria-label="Permalink to &quot;4.4 数据连接与合并&quot;">​</a></h3><h4 id="_4-4-1-连接操作-joins" tabindex="-1">4.4.1 连接操作（Joins） <a class="header-anchor" href="#_4-4-1-连接操作-joins" aria-label="Permalink to &quot;4.4.1 连接操作（Joins）&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 内连接</span></span>
<span class="line"><span class="__shiki_17hn0y">cpu_data = from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -1h)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; filter(fn: (r) =&gt; r._measurement == &quot;cpu&quot;)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">mem_data = from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -1h)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; filter(fn: (r) =&gt; r._measurement == &quot;mem&quot;)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">join(</span></span>
<span class="line"><span class="__shiki_17hn0y">    tables</span><span class="__shiki_140thh">: {</span><span class="__shiki_17hn0y">cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cpu_data</span><span class="__shiki_140thh">, </span><span class="__shiki_17hn0y">memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">mem_data</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_dzsirb">    on</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;_time&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;host&quot;</span><span class="__shiki_140thh">],          </span><span class="__shiki_mdbnqw">// 连接键</span></span>
<span class="line"><span class="__shiki_17hn0y">    method</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;inner&quot;</span><span class="__shiki_mdbnqw">                  // 连接类型</span></span>
<span class="line"><span class="__shiki_mdbnqw">)</span></span>
<span class="line"><span class="__shiki_1itgoe">|</span><span class="__shiki_2bbn9v">&gt; map(fn: (r) =&gt; ({</span></span>
<span class="line"><span class="__shiki_mdbnqw">    _time: r._time,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    host: r.host,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    cpu_usage: r._value_cpu,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    mem_usage: r._value_memory,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    ratio: r._value_cpu / r._value_memory</span></span>
<span class="line"><span class="__shiki_140thh">}</span><span class="__shiki_mdbnqw">))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 左连接</span></span>
<span class="line"><span class="__shiki_mdbnqw">join(</span></span>
<span class="line"><span class="__shiki_17hn0y">    tables</span><span class="__shiki_140thh">: {</span><span class="__shiki_17hn0y">main</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">main_data</span><span class="__shiki_140thh">, </span><span class="__shiki_17hn0y">lookup</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">lookup_data</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_dzsirb">    on</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;host&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_17hn0y">    method</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;left&quot;</span><span class="__shiki_mdbnqw">  // 保留所有主表数据</span></span>
<span class="line"><span class="__shiki_mdbnqw">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 全外连接</span></span>
<span class="line"><span class="__shiki_mdbnqw">join(</span></span>
<span class="line"><span class="__shiki_17hn0y">    tables</span><span class="__shiki_140thh">: {</span><span class="__shiki_17hn0y">t1</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">table1</span><span class="__shiki_140thh">, </span><span class="__shiki_17hn0y">t2</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">table2</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_dzsirb">    on</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;_time&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_17hn0y">    method</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;full&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 交叉连接（笛卡尔积）</span></span>
<span class="line"><span class="__shiki_mdbnqw">join(</span></span>
<span class="line"><span class="__shiki_17hn0y">    tables</span><span class="__shiki_140thh">: {</span><span class="__shiki_17hn0y">a</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">table_a</span><span class="__shiki_140thh">, </span><span class="__shiki_17hn0y">b</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">table_b</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_dzsirb">    on</span><span class="__shiki_140thh">: [],  </span><span class="__shiki_mdbnqw">// 空连接键</span></span>
<span class="line"><span class="__shiki_17hn0y">    method</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;cross&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">)</span></span></code></pre></div><h4 id="_4-4-2-集合操作" tabindex="-1">4.4.2 集合操作 <a class="header-anchor" href="#_4-4-2-集合操作" aria-label="Permalink to &quot;4.4.2 集合操作&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 并集</span></span>
<span class="line"><span class="__shiki_17hn0y">union(tables</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">table1</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">table2</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">table3</span><span class="__shiki_140thh">]</span><span class="__shiki_mdbnqw">)</span></span>
<span class="line"><span class="__shiki_1itgoe">|</span><span class="__shiki_2bbn9v">&gt; sort(columns: [&quot;_time&quot;])</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 带标签的并集</span></span>
<span class="line"><span class="__shiki_17hn0y">table1 = from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;bucket1&quot;</span><span class="__shiki_17hn0y">) |&gt; set(key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;source&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_17hn0y">value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;bucket1&quot;)</span></span>
<span class="line"><span class="__shiki_17hn0y">table2 = from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;bucket2&quot;</span><span class="__shiki_17hn0y">) |&gt; set(key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;source&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_17hn0y">value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;bucket2&quot;)</span></span>
<span class="line"><span class="__shiki_17hn0y">union(tables</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">table1</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">table2</span><span class="__shiki_140thh">]</span><span class="__shiki_mdbnqw">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 交集</span></span>
<span class="line"><span class="__shiki_17hn0y">intersection(tables</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">table1</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">table2</span><span class="__shiki_140thh">]</span><span class="__shiki_mdbnqw">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 差集</span></span>
<span class="line"><span class="__shiki_17hn0y">difference(tables</span><span class="__shiki_140thh">: {</span><span class="__shiki_17hn0y">master</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">master_table</span><span class="__shiki_140thh">, </span><span class="__shiki_17hn0y">diff</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">diff_table</span><span class="__shiki_140thh">}</span><span class="__shiki_mdbnqw">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 去重</span></span>
<span class="line"><span class="__shiki_17hn0y">distinct(column</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;host&quot;)</span><span class="__shiki_mdbnqw">  // 按host去重</span></span></code></pre></div><h2 id="五、高级数据处理模式" tabindex="-1">五、高级数据处理模式 <a class="header-anchor" href="#五、高级数据处理模式" aria-label="Permalink to &quot;五、高级数据处理模式&quot;">​</a></h2><h3 id="_5-1-时间序列分析" tabindex="-1">5.1 时间序列分析 <a class="header-anchor" href="#_5-1-时间序列分析" aria-label="Permalink to &quot;5.1 时间序列分析&quot;">​</a></h3><h4 id="_5-1-1-移动窗口计算" tabindex="-1">5.1.1 移动窗口计算 <a class="header-anchor" href="#_5-1-1-移动窗口计算" aria-label="Permalink to &quot;5.1.1 移动窗口计算&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 简单移动平均</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; movingAverage(n: 5)  // 5点移动平均</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 指数加权移动平均</span></span>
<span class="line"><span class="__shiki_mdbnqw">import &quot;experimental&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; experimental.exponentialMovingAverage(n: 10)  // 10点EMA</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 双重指数平滑（Holt线性趋势）</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; experimental.doubleEMA(n: 10)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 三重指数平滑（Holt-Winters季节性）</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; experimental.tripleEMA(n: 10)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 自定义窗口函数</span></span>
<span class="line"><span class="__shiki_mdbnqw">windowFunction = (tables=&lt;-, n) =&gt; {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    return tables</span></span>
<span class="line"><span class="__shiki_1itgoe">        |</span><span class="__shiki_2bbn9v">&gt; window(every: 1m)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        |&gt; reduce(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            fn: (r, accumulator) =&gt; ({</span></span>
<span class="line"><span class="__shiki_mdbnqw">                sum: accumulator.sum + r._value,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                count: accumulator.count + 1,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                values: accumulator.values + [r._value]</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            identity: {sum: 0.0, count: 0, values: []}</span></span>
<span class="line"><span class="__shiki_mdbnqw">        )</span></span>
<span class="line"><span class="__shiki_mdbnqw">        |&gt; map(fn: (r) =&gt; ({</span></span>
<span class="line"><span class="__shiki_mdbnqw">            _time: r._time,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            _value: r.sum / float(v: r.count),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            stddev: statistics.stddev(r.values)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }))</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; windowFunction(n: 5)</span></span></code></pre></div><h4 id="_5-1-2-时间序列分解" tabindex="-1">5.1.2 时间序列分解 <a class="header-anchor" href="#_5-1-2-时间序列分解" aria-label="Permalink to &quot;5.1.2 时间序列分解&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 趋势、季节性和残差分解</span></span>
<span class="line"><span class="__shiki_mdbnqw">import &quot;contrib/jsternberg/seasonal&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -30d)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; filter(fn: (r) =&gt; r._measurement == &quot;sales&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; seasonal.decompose(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        column: &quot;_value&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        interval: 7d,      // 季节性周期（7天）</span></span>
<span class="line"><span class="__shiki_mdbnqw">        method: &quot;additive&quot;  // 加法模型</span></span>
<span class="line"><span class="__shiki_mdbnqw">    )</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; map(fn: (r) =&gt; ({</span></span>
<span class="line"><span class="__shiki_mdbnqw">        _time: r._time,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        observed: r._value,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        trend: r.trend,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        seasonal: r.seasonal,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        residual: r.residual</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }))</span></span></code></pre></div><h4 id="_5-1-3-异常检测" tabindex="-1">5.1.3 异常检测 <a class="header-anchor" href="#_5-1-3-异常检测" aria-label="Permalink to &quot;5.1.3 异常检测&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">import &quot;anomalydetection&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 基于统计的异常检测</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -7d)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; filter(fn: (r) =&gt; r._measurement == &quot;response_time&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; anomalydetection.mad(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        column: &quot;_value&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        threshold: 3.0  // 3倍标准差</span></span>
<span class="line"><span class="__shiki_mdbnqw">    )</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; map(fn: (r) =&gt; ({</span></span>
<span class="line"><span class="__shiki_mdbnqw">        r with</span></span>
<span class="line"><span class="__shiki_mdbnqw">        is_anomaly: r.level != &quot;ok&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        anomaly_score: r.deviation</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 季节性异常检测</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; anomalydetection.seasonal(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        column: &quot;_value&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        interval: 1d,     // 日季节性</span></span>
<span class="line"><span class="__shiki_mdbnqw">        period: 7,        // 7天周期</span></span>
<span class="line"><span class="__shiki_mdbnqw">        threshold: 2.5</span></span>
<span class="line"><span class="__shiki_mdbnqw">    )</span></span></code></pre></div><h3 id="_5-2-数据质量检查" tabindex="-1">5.2 数据质量检查 <a class="header-anchor" href="#_5-2-数据质量检查" aria-label="Permalink to &quot;5.2 数据质量检查&quot;">​</a></h3><h4 id="_5-2-1-完整性验证" tabindex="-1">5.2.1 完整性验证 <a class="header-anchor" href="#_5-2-1-完整性验证" aria-label="Permalink to &quot;5.2.1 完整性验证&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 检查数据间隔</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -1h)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; filter(fn: (r) =&gt; r._measurement == &quot;sensor&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; difference(columns: [&quot;_time&quot;])</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; map(fn: (r) =&gt; ({</span></span>
<span class="line"><span class="__shiki_mdbnqw">        _time: r._time,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        interval_ns: r._time_diff,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        interval_s: float(v: r._time_diff) / 1000000000.0,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        is_missing: r._time_diff &gt; 60000000000  // 大于60秒为缺失</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }))</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; filter(fn: (r) =&gt; r.is_missing)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 计数监控</span></span>
<span class="line"><span class="__shiki_mdbnqw">expected_count = 3600  // 1小时应有3600个点（每秒1个）</span></span>
<span class="line"><span class="__shiki_17hn0y">actual_count = from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -1h)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; filter(fn: (r) =&gt; r._measurement == &quot;heartbeat&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; count()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">completeness = (actual</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">float, expected</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">float) =&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">    (actual / expected) * 100.0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">completeness_ratio = completeness(</span></span>
<span class="line"><span class="__shiki_17hn0y">    actual</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">float(v</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actual_count._value),</span></span>
<span class="line"><span class="__shiki_17hn0y">    expected</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">float(v</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">expected_count)</span></span>
<span class="line"><span class="__shiki_mdbnqw">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 输出完整性报告</span></span>
<span class="line"><span class="__shiki_17hn0y">array.from(rows</span><span class="__shiki_140thh">: [{</span></span>
<span class="line"><span class="__shiki_17hn0y">    measurement</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;heartbeat&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">    time_range</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;-1h&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">    expected</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">expected_count</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">    actual</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actual_count._value</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">    completeness_pct</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">completeness_ratio</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">    status</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">if completeness_ratio &gt;= 99.0 then &quot;OK&quot; else &quot;WARNING&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}]</span><span class="__shiki_mdbnqw">)</span></span></code></pre></div><h4 id="_5-2-2-数据一致性检查" tabindex="-1">5.2.2 数据一致性检查 <a class="header-anchor" href="#_5-2-2-数据一致性检查" aria-label="Permalink to &quot;5.2.2 数据一致性检查&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 跨数据源一致性验证</span></span>
<span class="line"><span class="__shiki_17hn0y">influx_data = from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;influx_metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -5m)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; filter(fn: (r) =&gt; r._measurement == &quot;api_requests&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; sum()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">prometheus_data = from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;prometheus_metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -5m)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; filter(fn: (r) =&gt; r._measurement == &quot;http_requests_total&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; sum()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 比较两个数据源</span></span>
<span class="line"><span class="__shiki_mdbnqw">join(</span></span>
<span class="line"><span class="__shiki_17hn0y">    tables</span><span class="__shiki_140thh">: {</span><span class="__shiki_17hn0y">influx</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">influx_data</span><span class="__shiki_140thh">, </span><span class="__shiki_17hn0y">prometheus</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">prometheus_data</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_dzsirb">    on</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;_time&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_mdbnqw">)</span></span>
<span class="line"><span class="__shiki_1itgoe">|</span><span class="__shiki_2bbn9v">&gt; map(fn: (r) =&gt; ({</span></span>
<span class="line"><span class="__shiki_mdbnqw">    _time: r._time,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    influx_count: r._value_influx,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    prometheus_count: r._value_prometheus,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    difference: r._value_influx - r._value_prometheus,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    diff_percent: if r._value_prometheus &gt; 0 then</span></span>
<span class="line"><span class="__shiki_mdbnqw">        ((r._value_influx - r._value_prometheus) / r._value_prometheus) * 100.0</span></span>
<span class="line"><span class="__shiki_mdbnqw">    else</span></span>
<span class="line"><span class="__shiki_mdbnqw">        0.0,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    is_consistent: math.abs(x: r._value_influx - r._value_prometheus) &lt; 10</span></span>
<span class="line"><span class="__shiki_140thh">}</span><span class="__shiki_mdbnqw">))</span></span></code></pre></div><h3 id="_5-3-状态机与模式识别" tabindex="-1">5.3 状态机与模式识别 <a class="header-anchor" href="#_5-3-状态机与模式识别" aria-label="Permalink to &quot;5.3 状态机与模式识别&quot;">​</a></h3><h4 id="_5-3-1-状态跟踪" tabindex="-1">5.3.1 状态跟踪 <a class="header-anchor" href="#_5-3-1-状态跟踪" aria-label="Permalink to &quot;5.3.1 状态跟踪&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 设备状态跟踪</span></span>
<span class="line"><span class="__shiki_17hn0y">device_states = from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;iot&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -24h)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; filter(fn: (r) =&gt; r._measurement == &quot;device_status&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; map(fn: (r) =&gt; ({</span></span>
<span class="line"><span class="__shiki_mdbnqw">        r with</span></span>
<span class="line"><span class="__shiki_mdbnqw">        state: if r._value &gt; 0 then &quot;ON&quot; else &quot;OFF&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 状态变化检测</span></span>
<span class="line"><span class="__shiki_mdbnqw">state_changes = device_states</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; difference(columns: [&quot;state&quot;])</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; filter(fn: (r) =&gt; r.state != &quot;&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; map(fn: (r) =&gt; ({</span></span>
<span class="line"><span class="__shiki_mdbnqw">        _time: r._time,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        device: r.device,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        from_state: r.state[0],  // 前一个状态</span></span>
<span class="line"><span class="__shiki_mdbnqw">        to_state: r.state[1],    // 新状态</span></span>
<span class="line"><span class="__shiki_mdbnqw">        duration: r._time_diff   // 前一状态持续时间</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 状态统计</span></span>
<span class="line"><span class="__shiki_mdbnqw">state_stats = state_changes</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; group(columns: [&quot;device&quot;, &quot;from_state&quot;])</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; aggregateWindow(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        every: 1h,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        fn: (column, tables=&lt;-) =&gt; tables</span></span>
<span class="line"><span class="__shiki_mdbnqw">            |&gt; count(column: &quot;duration&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            |&gt; sum(column: &quot;duration&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            |&gt; mean(column: &quot;duration&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    )</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; map(fn: (r) =&gt; ({</span></span>
<span class="line"><span class="__shiki_mdbnqw">        device: r.device,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        state: r.from_state,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        change_count: r.duration_count,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        total_duration_ns: r.duration_sum,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        avg_duration_s: r.duration_mean / 1000000000.0</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }))</span></span></code></pre></div><h4 id="_5-3-2-模式匹配" tabindex="-1">5.3.2 模式匹配 <a class="header-anchor" href="#_5-3-2-模式匹配" aria-label="Permalink to &quot;5.3.2 模式匹配&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 寻找特定模式（如：连续三次上升）</span></span>
<span class="line"><span class="__shiki_mdbnqw">pattern_detector = (tables=&lt;-, threshold) =&gt; {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    return tables</span></span>
<span class="line"><span class="__shiki_1itgoe">        |</span><span class="__shiki_2bbn9v">&gt; window(every: 3, period: 3)  // 3点窗口</span></span>
<span class="line"><span class="__shiki_mdbnqw">        |&gt; reduce(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            fn: (r, accumulator) =&gt; ({</span></span>
<span class="line"><span class="__shiki_mdbnqw">                values: accumulator.values + [r._value],</span></span>
<span class="line"><span class="__shiki_mdbnqw">                times: accumulator.times + [r._time]</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            identity: {values: [], times: []}</span></span>
<span class="line"><span class="__shiki_mdbnqw">        )</span></span>
<span class="line"><span class="__shiki_mdbnqw">        |&gt; filter(fn: (r) =&gt; length(arr: r.values) == 3)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        |&gt; map(fn: (r) =&gt; {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            v1 = r.values[0]</span></span>
<span class="line"><span class="__shiki_mdbnqw">            v2 = r.values[1]</span></span>
<span class="line"><span class="__shiki_mdbnqw">            v3 = r.values[2]</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            is_increasing = v1 &lt; v2 and v2 &lt; v3</span></span>
<span class="line"><span class="__shiki_mdbnqw">            is_large_increase = (v3 - v1) &gt; threshold</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            return {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                pattern_start: r.times[0],</span></span>
<span class="line"><span class="__shiki_mdbnqw">                pattern_end: r.times[2],</span></span>
<span class="line"><span class="__shiki_mdbnqw">                values: r.values,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                is_increasing: is_increasing,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                is_large_increase: is_large_increase,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                total_increase: v3 - v1</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        })</span></span>
<span class="line"><span class="__shiki_mdbnqw">        |&gt; filter(fn: (r) =&gt; r.is_increasing and r.is_large_increase)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;stocks&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -1d)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; filter(fn: (r) =&gt; r._measurement == &quot;price&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; pattern_detector(threshold: 10.0)</span></span></code></pre></div><h2 id="六、flux模块化与代码组织" tabindex="-1">六、Flux模块化与代码组织 <a class="header-anchor" href="#六、flux模块化与代码组织" aria-label="Permalink to &quot;六、Flux模块化与代码组织&quot;">​</a></h2><h3 id="_6-1-自定义包与模块" tabindex="-1">6.1 自定义包与模块 <a class="header-anchor" href="#_6-1-自定义包与模块" aria-label="Permalink to &quot;6.1 自定义包与模块&quot;">​</a></h3><h4 id="_6-1-1-包定义与导入" tabindex="-1">6.1.1 包定义与导入 <a class="header-anchor" href="#_6-1-1-包定义与导入" aria-label="Permalink to &quot;6.1.1 包定义与导入&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// mypackage.flux</span></span>
<span class="line"><span class="__shiki_mdbnqw">package mypackage</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 导出常量</span></span>
<span class="line"><span class="__shiki_mdbnqw">default_bucket = &quot;production&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">timeout = 5m</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 导出函数</span></span>
<span class="line"><span class="__shiki_mdbnqw">getData = (bucket, start) =&gt; {</span></span>
<span class="line"><span class="__shiki_17hn0y">    return from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bucket)</span></span>
<span class="line"><span class="__shiki_1itgoe">        |</span><span class="__shiki_2bbn9v">&gt; range(start: start)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">aggregateMetrics = (tables=&lt;-, window) =&gt; {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    return tables</span></span>
<span class="line"><span class="__shiki_1itgoe">        |</span><span class="__shiki_2bbn9v">&gt; aggregateWindow(every: window, fn: mean)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 私有函数（小写开头，不导出）</span></span>
<span class="line"><span class="__shiki_mdbnqw">internal_helper = (x) =&gt; x * 2</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 使用自定义包</span></span>
<span class="line"><span class="__shiki_mdbnqw">import &quot;mypackage&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">data = mypackage.getData(</span></span>
<span class="line"><span class="__shiki_17hn0y">    bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">mypackage.default_bucket,</span></span>
<span class="line"><span class="__shiki_17hn0y">    start</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">-1h</span></span>
<span class="line"><span class="__shiki_mdbnqw">)</span></span>
<span class="line"><span class="__shiki_1itgoe">|</span><span class="__shiki_2bbn9v">&gt; mypackage.aggregateMetrics(window: 5m)</span></span></code></pre></div><h4 id="_6-1-2-条件导入" tabindex="-1">6.1.2 条件导入 <a class="header-anchor" href="#_6-1-2-条件导入" aria-label="Permalink to &quot;6.1.2 条件导入&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 根据环境选择不同的配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">environment = &quot;production&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">config = if environment == &quot;production&quot; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">    import &quot;config/production&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">else if environment == &quot;staging&quot; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">    import &quot;config/staging&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">else</span></span>
<span class="line"><span class="__shiki_mdbnqw">    import &quot;config/development&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 使用配置</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config.metrics_bucket)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: config.default_range)</span></span></code></pre></div><h3 id="_6-2-查询模板" tabindex="-1">6.2 查询模板 <a class="header-anchor" href="#_6-2-查询模板" aria-label="Permalink to &quot;6.2 查询模板&quot;">​</a></h3><h4 id="_6-2-1-参数化查询" tabindex="-1">6.2.1 参数化查询 <a class="header-anchor" href="#_6-2-1-参数化查询" aria-label="Permalink to &quot;6.2.1 参数化查询&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 查询模板函数</span></span>
<span class="line"><span class="__shiki_mdbnqw">queryTemplate = (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    bucket,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    measurement,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    fields,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    tags,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    start,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    window</span></span>
<span class="line"><span class="__shiki_mdbnqw">) =&gt; {</span></span>
<span class="line"><span class="__shiki_17hn0y">    data = from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bucket)</span></span>
<span class="line"><span class="__shiki_1itgoe">        |</span><span class="__shiki_2bbn9v">&gt; range(start: start)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        |&gt; filter(fn: (r) =&gt; r._measurement == measurement)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    // 动态字段过滤</span></span>
<span class="line"><span class="__shiki_17hn0y">    filtered_data = if length(arr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">fields) &gt; 0 then</span></span>
<span class="line"><span class="__shiki_17hn0y">        data |&gt; filter(fn</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">(r) =&gt; contains(value</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">r._field, set</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">fields))</span></span>
<span class="line"><span class="__shiki_mdbnqw">    else</span></span>
<span class="line"><span class="__shiki_mdbnqw">        data</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    // 动态标签过滤</span></span>
<span class="line"><span class="__shiki_17hn0y">    result = if length(arr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">tags) &gt; 0 then</span></span>
<span class="line"><span class="__shiki_17hn0y">        filtered_data |&gt; filter(fn</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">(r) =&gt; {</span></span>
<span class="line"><span class="__shiki_17hn0y">            return tags |&gt; containsAny(r</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">r)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span><span class="__shiki_mdbnqw">)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    else</span></span>
<span class="line"><span class="__shiki_mdbnqw">        filtered_data</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    // 应用窗口聚合</span></span>
<span class="line"><span class="__shiki_mdbnqw">    return result</span></span>
<span class="line"><span class="__shiki_1itgoe">        |</span><span class="__shiki_2bbn9v">&gt; aggregateWindow(every: window, fn: mean)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 使用模板</span></span>
<span class="line"><span class="__shiki_mdbnqw">cpu_metrics = queryTemplate(</span></span>
<span class="line"><span class="__shiki_17hn0y">    bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;telegraf&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">    measurement</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;cpu&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">    fields</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;usage_user&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;usage_system&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_17hn0y">    tags</span><span class="__shiki_140thh">: [{</span><span class="__shiki_17hn0y">host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;web-*&quot;</span><span class="__shiki_140thh">}, {</span><span class="__shiki_17hn0y">region</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;us-*&quot;</span><span class="__shiki_140thh">}],</span></span>
<span class="line"><span class="__shiki_17hn0y">    start</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">-1h,</span></span>
<span class="line"><span class="__shiki_17hn0y">    window</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">1m</span></span>
<span class="line"><span class="__shiki_mdbnqw">)</span></span></code></pre></div><h4 id="_6-2-2-查询构建器模式" tabindex="-1">6.2.2 查询构建器模式 <a class="header-anchor" href="#_6-2-2-查询构建器模式" aria-label="Permalink to &quot;6.2.2 查询构建器模式&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 链式查询构建器</span></span>
<span class="line"><span class="__shiki_mdbnqw">queryBuilder = () =&gt; {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    return {</span></span>
<span class="line"><span class="__shiki_17hn0y">        _bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">        _filters</span><span class="__shiki_140thh">: [],</span></span>
<span class="line"><span class="__shiki_17hn0y">        _aggregations</span><span class="__shiki_140thh">: [],</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_17hn0y">        from</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">(bucket) =&gt; {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            this._bucket = bucket</span></span>
<span class="line"><span class="__shiki_mdbnqw">            return this</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_17hn0y">        filter</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">(fn) =&gt; {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            this._filters = this._filters + [fn]</span></span>
<span class="line"><span class="__shiki_mdbnqw">            return this</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_17hn0y">        aggregate</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">(window, fn) =&gt; {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            this._aggregations = this._aggregations + [</span></span>
<span class="line"><span class="__shiki_140thh">                {</span><span class="__shiki_17hn0y">window</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">window</span><span class="__shiki_140thh">, </span><span class="__shiki_17hn0y">fn</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">fn</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">            ]</span></span>
<span class="line"><span class="__shiki_mdbnqw">            return this</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_17hn0y">        execute</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">(start) =&gt; {</span></span>
<span class="line"><span class="__shiki_17hn0y">            query = from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">this._bucket)</span></span>
<span class="line"><span class="__shiki_1itgoe">                |</span><span class="__shiki_2bbn9v">&gt; range(start: start)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            // 应用所有过滤器</span></span>
<span class="line"><span class="__shiki_mdbnqw">            for filter_fn in this._filters {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                query = query |&gt; filter(fn: filter_fn)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            // 应用所有聚合</span></span>
<span class="line"><span class="__shiki_mdbnqw">            for agg in this._aggregations {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                query = query |&gt; aggregateWindow(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    every: agg.window,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    fn: agg.fn</span></span>
<span class="line"><span class="__shiki_mdbnqw">                )</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            return query</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 使用构建器</span></span>
<span class="line"><span class="__shiki_mdbnqw">result = queryBuilder()</span></span>
<span class="line"><span class="__shiki_17hn0y">    .from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_17hn0y">    .filter(fn</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">(r) =&gt; r._measurement == &quot;http_requests&quot;)</span></span>
<span class="line"><span class="__shiki_17hn0y">    .filter(fn</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">(r) =&gt; r.status == &quot;200&quot;)</span></span>
<span class="line"><span class="__shiki_17hn0y">    .aggregate(window</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">1m, fn</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">sum)</span></span>
<span class="line"><span class="__shiki_17hn0y">    .aggregate(window</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">5m, fn</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">mean)</span></span>
<span class="line"><span class="__shiki_17hn0y">    .execute(start</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">-1h)</span></span></code></pre></div><h2 id="七、性能优化与调试" tabindex="-1">七、性能优化与调试 <a class="header-anchor" href="#七、性能优化与调试" aria-label="Permalink to &quot;七、性能优化与调试&quot;">​</a></h2><h3 id="_7-1-查询性能分析" tabindex="-1">7.1 查询性能分析 <a class="header-anchor" href="#_7-1-查询性能分析" aria-label="Permalink to &quot;7.1 查询性能分析&quot;">​</a></h3><h4 id="_7-1-1-使用profile" tabindex="-1">7.1.1 使用PROFILE <a class="header-anchor" href="#_7-1-1-使用profile" aria-label="Permalink to &quot;7.1.1 使用PROFILE&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">import &quot;profiler&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 启用性能分析</span></span>
<span class="line"><span class="__shiki_mdbnqw">option profiler.enabledProfilers = [&quot;query&quot;, &quot;operator&quot;]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 复杂查询</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -1h)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; filter(fn: (r) =&gt; r._measurement == &quot;cpu&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; group(columns: [&quot;host&quot;])</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; aggregateWindow(every: 1m, fn: mean)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; profiler.profile()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 分析结果将包含：</span></span>
<span class="line"><span class="__shiki_mdbnqw">// - 总执行时间</span></span>
<span class="line"><span class="__shiki_mdbnqw">// - 各阶段执行时间</span></span>
<span class="line"><span class="__shiki_mdbnqw">// - 内存使用情况</span></span>
<span class="line"><span class="__shiki_mdbnqw">// - 处理的行数</span></span>
<span class="line"><span class="__shiki_mdbnqw">// - 序列数</span></span></code></pre></div><h4 id="_7-1-2-查询优化技巧" tabindex="-1">7.1.2 查询优化技巧 <a class="header-anchor" href="#_7-1-2-查询优化技巧" aria-label="Permalink to &quot;7.1.2 查询优化技巧&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 1. 尽早过滤</span></span>
<span class="line"><span class="__shiki_mdbnqw">// 不好：先聚合后过滤</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -24h)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; aggregateWindow(every: 1h, fn: mean)  // 聚合24小时数据</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; filter(fn: (r) =&gt; r._value &gt; 100)      // 最后过滤</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 好：先过滤后聚合</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -24h)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; filter(fn: (r) =&gt; r._value &gt; 100)      // 先过滤，减少数据量</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; aggregateWindow(every: 1h, fn: mean)  // 聚合过滤后的数据</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 2. 减少分组维度</span></span>
<span class="line"><span class="__shiki_mdbnqw">// 不好：过多分组维度</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; group(columns: [&quot;host&quot;, &quot;region&quot;, &quot;az&quot;, &quot;instance&quot;, &quot;service&quot;])</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 好：按需分组</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; group(columns: [&quot;host&quot;, &quot;service&quot;])  // 只按必要维度分组</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 3. 合理使用窗口大小</span></span>
<span class="line"><span class="__shiki_mdbnqw">// 根据查询时间范围选择窗口大小</span></span>
<span class="line"><span class="__shiki_mdbnqw">time_range = -1h</span></span>
<span class="line"><span class="__shiki_17hn0y">window_size = if duration(v</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">time_range) &lt;= 1h then</span></span>
<span class="line"><span class="__shiki_mdbnqw">    1m  // 短期查询用细粒度</span></span>
<span class="line"><span class="__shiki_17hn0y">else if duration(v</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">time_range) &lt;= 24h then</span></span>
<span class="line"><span class="__shiki_mdbnqw">    5m  // 中期查询用中等粒度</span></span>
<span class="line"><span class="__shiki_mdbnqw">else</span></span>
<span class="line"><span class="__shiki_mdbnqw">    1h  // 长期查询用粗粒度</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: time_range)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; aggregateWindow(every: window_size, fn: mean)</span></span></code></pre></div><h3 id="_7-2-调试技术" tabindex="-1">7.2 调试技术 <a class="header-anchor" href="#_7-2-调试技术" aria-label="Permalink to &quot;7.2 调试技术&quot;">​</a></h3><h4 id="_7-2-1-调试输出" tabindex="-1">7.2.1 调试输出 <a class="header-anchor" href="#_7-2-1-调试输出" aria-label="Permalink to &quot;7.2.1 调试输出&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 使用yield输出中间结果</span></span>
<span class="line"><span class="__shiki_mdbnqw">debug = true</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">data = from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -1h)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 调试输出原始数据</span></span>
<span class="line"><span class="__shiki_mdbnqw">if debug then</span></span>
<span class="line"><span class="__shiki_17hn0y">    data |&gt; yield(name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;raw_data&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">else</span></span>
<span class="line"><span class="__shiki_mdbnqw">    data</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 管道中多个调试点</span></span>
<span class="line"><span class="__shiki_mdbnqw">data</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; filter(fn: (r) =&gt; r._measurement == &quot;cpu&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; yield(name: &quot;after_filter&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; aggregateWindow(every: 1m, fn: mean)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; yield(name: &quot;after_aggregate&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; map(fn: (r) =&gt; ({r with _value: r._value * 100}))</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; yield(name: &quot;final_result&quot;)</span></span></code></pre></div><h4 id="_7-2-2-数据采样与预览" tabindex="-1">7.2.2 数据采样与预览 <a class="header-anchor" href="#_7-2-2-数据采样与预览" aria-label="Permalink to &quot;7.2.2 数据采样与预览&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 数据采样（减少数据量进行调试）</span></span>
<span class="line"><span class="__shiki_mdbnqw">sample_data = (tables=&lt;-, sample_rate=0.1) =&gt; {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    return tables</span></span>
<span class="line"><span class="__shiki_1itgoe">        |</span><span class="__shiki_2bbn9v">&gt; filter(fn: (r) =&gt; </span></span>
<span class="line"><span class="__shiki_mdbnqw">            float(v: int(v: r._time) % 100) / 100.0 &lt; sample_rate</span></span>
<span class="line"><span class="__shiki_mdbnqw">        )</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;large_dataset&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -7d)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; sample_data(sample_rate: 0.01)  // 1%采样</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; yield(name: &quot;sampled&quot;)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 限制行数</span></span>
<span class="line"><span class="__shiki_17hn0y">from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -1h)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; limit(n: 100)  // 只取前100行</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; yield(name: &quot;preview&quot;)</span></span></code></pre></div><h2 id="八、flux与外部系统集成" tabindex="-1">八、Flux与外部系统集成 <a class="header-anchor" href="#八、flux与外部系统集成" aria-label="Permalink to &quot;八、Flux与外部系统集成&quot;">​</a></h2><h3 id="_8-1-多数据源查询" tabindex="-1">8.1 多数据源查询 <a class="header-anchor" href="#_8-1-多数据源查询" aria-label="Permalink to &quot;8.1 多数据源查询&quot;">​</a></h3><h4 id="_8-1-1-sql数据库集成" tabindex="-1">8.1.1 SQL数据库集成 <a class="header-anchor" href="#_8-1-1-sql数据库集成" aria-label="Permalink to &quot;8.1.1 SQL数据库集成&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">import &quot;sql&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 从PostgreSQL查询</span></span>
<span class="line"><span class="__shiki_mdbnqw">pg_data = sql.from(</span></span>
<span class="line"><span class="__shiki_17hn0y">    driverName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;postgres&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">    dataSourceName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;postgresql://user:pass@localhost/db&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">    query</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">            timestamp,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            hostname,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            metric_name,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            value</span></span>
<span class="line"><span class="__shiki_mdbnqw">        FROM metrics</span></span>
<span class="line"><span class="__shiki_mdbnqw">        WHERE timestamp &gt; NOW() - INTERVAL &#39;1 hour&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        ORDER BY timestamp</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 从MySQL查询</span></span>
<span class="line"><span class="__shiki_mdbnqw">mysql_data = sql.from(</span></span>
<span class="line"><span class="__shiki_17hn0y">    driverName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;mysql&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">    dataSourceName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;user:pass@tcp(localhost:3306)/db&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">    query</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;SELECT * FROM sensor_data WHERE ts &gt; DATE_SUB(NOW(), INTERVAL 1 HOUR)&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 合并InfluxDB和SQL数据</span></span>
<span class="line"><span class="__shiki_17hn0y">influx_data = from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -1h)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 连接不同数据源的数据</span></span>
<span class="line"><span class="__shiki_17hn0y">combined = union(tables</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_17hn0y">    influx_data |&gt; map(fn</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">(r) =&gt; (</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_17hn0y">        _time</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">r._time</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">        source</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;influxdb&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">        metric</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">r._measurement</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">r._value</span></span>
<span class="line"><span class="__shiki_140thh">    }</span><span class="__shiki_mdbnqw">))</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">    pg_data |&gt; map(fn</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">(r) =&gt; (</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_17hn0y">        _time</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">r.timestamp</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">        source</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;postgresql&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">        metric</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">r.metric_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">r.value</span></span>
<span class="line"><span class="__shiki_140thh">    }</span><span class="__shiki_mdbnqw">))</span></span>
<span class="line"><span class="__shiki_140thh">]</span><span class="__shiki_mdbnqw">)</span></span></code></pre></div><h4 id="_8-1-2-csv文件处理" tabindex="-1">8.1.2 CSV文件处理 <a class="header-anchor" href="#_8-1-2-csv文件处理" aria-label="Permalink to &quot;8.1.2 CSV文件处理&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">import &quot;csv&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 从CSV文件读取</span></span>
<span class="line"><span class="__shiki_mdbnqw">csv_data = csv.from(</span></span>
<span class="line"><span class="__shiki_17hn0y">    csv</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    timestamp,host,value,status</span></span>
<span class="line"><span class="__shiki_mdbnqw">    2023-01-01T00:00:00Z,server01,42.5,OK</span></span>
<span class="line"><span class="__shiki_mdbnqw">    2023-01-01T00:01:00Z,server01,43.1,OK</span></span>
<span class="line"><span class="__shiki_mdbnqw">    2023-01-01T00:00:00Z,server02,38.2,WARNING</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">    mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;raw&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 从URL读取CSV</span></span>
<span class="line"><span class="__shiki_17hn0y">url_data = csv.from(url</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;https://example.com/data.csv&quot;)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 解析CSV并转换为InfluxDB格式</span></span>
<span class="line"><span class="__shiki_mdbnqw">parsed_data = csv_data</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; map(fn: (r) =&gt; ({</span></span>
<span class="line"><span class="__shiki_mdbnqw">        _time: time(v: r.timestamp),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        _measurement: &quot;external_metrics&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        _field: &quot;value&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        host: r.host,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        status: r.status,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        _value: float(v: r.value)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span><span class="__shiki_mdbnqw">))</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; group(columns: [&quot;_measurement&quot;, &quot;_field&quot;, &quot;host&quot;])</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 写入到InfluxDB</span></span>
<span class="line"><span class="__shiki_mdbnqw">import &quot;experimental&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">parsed_data</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; experimental.to(bucket: &quot;imported_data&quot;)</span></span></code></pre></div><h3 id="_8-2-http-api集成" tabindex="-1">8.2 HTTP API集成 <a class="header-anchor" href="#_8-2-http-api集成" aria-label="Permalink to &quot;8.2 HTTP API集成&quot;">​</a></h3><h4 id="_8-2-1-调用外部api" tabindex="-1">8.2.1 调用外部API <a class="header-anchor" href="#_8-2-1-调用外部api" aria-label="Permalink to &quot;8.2.1 调用外部API&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">import &quot;http&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">import &quot;json&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 获取外部API数据</span></span>
<span class="line"><span class="__shiki_mdbnqw">api_response = http.get(</span></span>
<span class="line"><span class="__shiki_17hn0y">    url</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;https://api.example.com/metrics&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">    headers</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;Authorization&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Bearer \${token}&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;Content-Type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;application/json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_17hn0y">    params</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_17hn0y">        start</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2023-01-01&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">        end</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2023-01-02&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 解析JSON响应</span></span>
<span class="line"><span class="__shiki_17hn0y">parsed_json = json.parse(data</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">api_response.body)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 转换为Flux数据流</span></span>
<span class="line"><span class="__shiki_mdbnqw">external_data = parsed_json.data</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; map(fn: (r) =&gt; ({</span></span>
<span class="line"><span class="__shiki_mdbnqw">        _time: time(v: r.timestamp),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        _measurement: &quot;external_api&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        _field: r.metric_name,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        _value: float(v: r.value),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        tags: r.tags</span></span>
<span class="line"><span class="__shiki_140thh">    }</span><span class="__shiki_mdbnqw">))</span></span></code></pre></div><h4 id="_8-2-2-发送数据到webhook" tabindex="-1">8.2.2 发送数据到Webhook <a class="header-anchor" href="#_8-2-2-发送数据到webhook" aria-label="Permalink to &quot;8.2.2 发送数据到Webhook&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">import &quot;http&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 查询异常数据</span></span>
<span class="line"><span class="__shiki_17hn0y">anomalies = from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -5m)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; filter(fn: (r) =&gt; r._value &gt; 100)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; limit(n: 10)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 转换为JSON</span></span>
<span class="line"><span class="__shiki_mdbnqw">anomaly_json = anomalies</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; map(fn: (r) =&gt; ({</span></span>
<span class="line"><span class="__shiki_mdbnqw">        timestamp: string(v: r._time),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        measurement: r._measurement,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        field: r._field,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        value: r._value,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        host: r.host</span></span>
<span class="line"><span class="__shiki_140thh">    }</span><span class="__shiki_mdbnqw">))</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; reduce(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        fn: (r, accumulator) =&gt; ({</span></span>
<span class="line"><span class="__shiki_mdbnqw">            anomalies: accumulator.anomalies + [r]</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        identity: {anomalies: []}</span></span>
<span class="line"><span class="__shiki_mdbnqw">    )</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; map(fn: (r) =&gt; json.encode(v: r))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 发送到Webhook</span></span>
<span class="line"><span class="__shiki_mdbnqw">anomaly_json</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; map(fn: (r) =&gt; {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        http.post(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            url: &quot;https://webhook.example.com/alerts&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            headers: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;Content-Type&quot;: &quot;application/json&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            },</span></span>
<span class="line"><span class="__shiki_mdbnqw">            data: bytes(v: r)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        )</span></span>
<span class="line"><span class="__shiki_mdbnqw">        return {sent: true, time: system.time()}</span></span>
<span class="line"><span class="__shiki_140thh">    }</span><span class="__shiki_mdbnqw">)</span></span></code></pre></div><h2 id="九、flux最佳实践" tabindex="-1">九、Flux最佳实践 <a class="header-anchor" href="#九、flux最佳实践" aria-label="Permalink to &quot;九、Flux最佳实践&quot;">​</a></h2><h3 id="_9-1-代码组织规范" tabindex="-1">9.1 代码组织规范 <a class="header-anchor" href="#_9-1-代码组织规范" aria-label="Permalink to &quot;9.1 代码组织规范&quot;">​</a></h3><h4 id="_9-1-1-项目结构" tabindex="-1">9.1.1 项目结构 <a class="header-anchor" href="#_9-1-1-项目结构" aria-label="Permalink to &quot;9.1.1 项目结构&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">flux-queries/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── lib/                    # 共享库</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── utils.flux         # 工具函数</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── metrics.flux       # 指标相关函数</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── alerts.flux        # 告警相关函数</span></span>
<span class="line"><span class="__shiki_wvjl67">├── queries/               # 查询脚本</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── system/           # 系统监控查询</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── application/      # 应用监控查询</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── business/         # 业务指标查询</span></span>
<span class="line"><span class="__shiki_wvjl67">├── config/               # 配置文件</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── development.flux  # 开发环境配置</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── staging.flux      # 预发环境配置</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── production.flux   # 生产环境配置</span></span>
<span class="line"><span class="__shiki_wvjl67">└── tests/                # 测试</span></span>
<span class="line"><span class="__shiki_wvjl67">    └── query_tests.flux</span></span></code></pre></div><h4 id="_9-1-2-命名约定" tabindex="-1">9.1.2 命名约定 <a class="header-anchor" href="#_9-1-2-命名约定" aria-label="Permalink to &quot;9.1.2 命名约定&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 变量和函数：驼峰命名法</span></span>
<span class="line"><span class="__shiki_mdbnqw">bucketName = &quot;production_metrics&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">queryStartTime = -1h</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 常量：大写加下划线</span></span>
<span class="line"><span class="__shiki_mdbnqw">DEFAULT_BUCKET = &quot;telegraf&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">MAX_RETENTION_DAYS = 30</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 布尔函数：is/has/can开头</span></span>
<span class="line"><span class="__shiki_mdbnqw">isValidMetric = (r) =&gt; r._value != null</span></span>
<span class="line"><span class="__shiki_mdbnqw">hasRequiredTags = (r) =&gt; r.host != null and r.service != null</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 查询函数：动词开头</span></span>
<span class="line"><span class="__shiki_mdbnqw">fetchMetrics = (bucket, start) =&gt; {</span></span>
<span class="line"><span class="__shiki_17hn0y">    from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bucket)</span></span>
<span class="line"><span class="__shiki_1itgoe">        |</span><span class="__shiki_2bbn9v">&gt; range(start: start)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">transformForVisualization = (tables=&lt;-) =&gt; {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    tables</span></span>
<span class="line"><span class="__shiki_1itgoe">        |</span><span class="__shiki_2bbn9v">&gt; map(fn: (r) =&gt; ({r with display_value: r._value * 100}))</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_9-2-错误处理与健壮性" tabindex="-1">9.2 错误处理与健壮性 <a class="header-anchor" href="#_9-2-错误处理与健壮性" aria-label="Permalink to &quot;9.2 错误处理与健壮性&quot;">​</a></h3><h4 id="_9-2-1-防御性编程" tabindex="-1">9.2.1 防御性编程 <a class="header-anchor" href="#_9-2-1-防御性编程" aria-label="Permalink to &quot;9.2.1 防御性编程&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 安全的除法函数</span></span>
<span class="line"><span class="__shiki_mdbnqw">safeDivide = (numerator, denominator) =&gt; {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    return if denominator != 0 then</span></span>
<span class="line"><span class="__shiki_mdbnqw">        numerator / denominator</span></span>
<span class="line"><span class="__shiki_mdbnqw">    else</span></span>
<span class="line"><span class="__shiki_dzsirb">        0.0</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 带默认值的查询</span></span>
<span class="line"><span class="__shiki_mdbnqw">queryWithDefaults = (</span></span>
<span class="line"><span class="__shiki_17hn0y">    bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">string = &quot;default&quot;,</span></span>
<span class="line"><span class="__shiki_17hn0y">    start</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">duration = -1h,</span></span>
<span class="line"><span class="__shiki_17hn0y">    fields</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">string</span><span class="__shiki_140thh">] </span><span class="__shiki_mdbnqw">= []</span></span>
<span class="line"><span class="__shiki_mdbnqw">) =&gt; {</span></span>
<span class="line"><span class="__shiki_17hn0y">    data = from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bucket)</span></span>
<span class="line"><span class="__shiki_1itgoe">        |</span><span class="__shiki_2bbn9v">&gt; range(start: start)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    result = if length(arr: fields) &gt; 0 then</span></span>
<span class="line"><span class="__shiki_mdbnqw">        data |&gt; filter(fn: (r) =&gt; contains(value: r._field, set: fields))</span></span>
<span class="line"><span class="__shiki_mdbnqw">    else</span></span>
<span class="line"><span class="__shiki_mdbnqw">        data</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    // 确保有数据</span></span>
<span class="line"><span class="__shiki_mdbnqw">    row_count = result |&gt; count()</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    return if row_count._value &gt; 0 then</span></span>
<span class="line"><span class="__shiki_mdbnqw">        result</span></span>
<span class="line"><span class="__shiki_mdbnqw">    else</span></span>
<span class="line"><span class="__shiki_mdbnqw">        // 返回空结果集</span></span>
<span class="line"><span class="__shiki_mdbnqw">        array.from(rows: [{</span></span>
<span class="line"><span class="__shiki_mdbnqw">            _time: system.time(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            _measurement: &quot;no_data&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            _field: &quot;warning&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            _value: 0.0,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            message: &quot;No data found for the given query&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }])</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 重试机制</span></span>
<span class="line"><span class="__shiki_17hn0y">retryQuery = (queryFunc, maxRetries</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">int = 3) =&gt; {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    attempt = 1</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    while attempt &lt;= maxRetries {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        try {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            return queryFunc()</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_mdbnqw">catch e {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            // 记录错误</span></span>
<span class="line"><span class="__shiki_17hn0y">            logError(message</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Query failed&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_17hn0y">attempt</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">attempt, error</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">e)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            // 指数退避</span></span>
<span class="line"><span class="__shiki_17hn0y">            waitTime = math.pow(x</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">2, y</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">attempt - 1)</span></span>
<span class="line"><span class="__shiki_17hn0y">            sleep(duration</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">duration(v</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;\${waitTime}s&quot;))</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            attempt = attempt + 1</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    // 所有重试都失败</span></span>
<span class="line"><span class="__shiki_17hn0y">    return array.from(rows</span><span class="__shiki_140thh">: [{</span></span>
<span class="line"><span class="__shiki_17hn0y">        error</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Max retries exceeded&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">        attempts</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">maxRetries</span></span>
<span class="line"><span class="__shiki_140thh">    }]</span><span class="__shiki_mdbnqw">)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="十、flux未来演进" tabindex="-1">十、Flux未来演进 <a class="header-anchor" href="#十、flux未来演进" aria-label="Permalink to &quot;十、Flux未来演进&quot;">​</a></h2><h3 id="_10-1-flux-2-0规划" tabindex="-1">10.1 Flux 2.0规划 <a class="header-anchor" href="#_10-1-flux-2-0规划" aria-label="Permalink to &quot;10.1 Flux 2.0规划&quot;">​</a></h3><h4 id="_10-1-1-语言改进" tabindex="-1">10.1.1 语言改进 <a class="header-anchor" href="#_10-1-1-语言改进" aria-label="Permalink to &quot;10.1.1 语言改进&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 计划中的新特性</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 1. 改进的类型系统</span></span>
<span class="line"><span class="__shiki_mdbnqw">type MetricPoint {</span></span>
<span class="line"><span class="__shiki_17hn0y">    time</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">time</span></span>
<span class="line"><span class="__shiki_17hn0y">    value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">float</span></span>
<span class="line"><span class="__shiki_17hn0y">    tags</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">map[string]string</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 2. 泛型支持</span></span>
<span class="line"><span class="__shiki_17hn0y">processData&lt;T&gt; = (data</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">T, processor</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">(T) =&gt; T) =&gt; {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    return processor(data)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 3. 异步操作</span></span>
<span class="line"><span class="__shiki_mdbnqw">async fetchData = (url) =&gt; {</span></span>
<span class="line"><span class="__shiki_17hn0y">    response = await http.get(url</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">url)</span></span>
<span class="line"><span class="__shiki_17hn0y">    return json.parse(data</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">response.body)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 4. 改进的错误处理</span></span>
<span class="line"><span class="__shiki_mdbnqw">try {</span></span>
<span class="line"><span class="__shiki_17hn0y">    data = from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;nonexistent&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">        |</span><span class="__shiki_2bbn9v">&gt; range(start: -1h)</span></span>
<span class="line"><span class="__shiki_140thh">} </span><span class="__shiki_mdbnqw">catch NotFoundError {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    return &quot;Bucket not found&quot;</span></span>
<span class="line"><span class="__shiki_140thh">} </span><span class="__shiki_mdbnqw">catch TimeoutError {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    return &quot;Query timeout&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_10-2-生态扩展" tabindex="-1">10.2 生态扩展 <a class="header-anchor" href="#_10-2-生态扩展" aria-label="Permalink to &quot;10.2 生态扩展&quot;">​</a></h3><h4 id="_10-2-1-可视化集成" tabindex="-1">10.2.1 可视化集成 <a class="header-anchor" href="#_10-2-1-可视化集成" aria-label="Permalink to &quot;10.2.1 可视化集成&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 与Grafana等可视化工具的深度集成</span></span>
<span class="line"><span class="__shiki_mdbnqw">import &quot;grafana&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 自动生成面板配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">dashboard = grafana.dashboard(</span></span>
<span class="line"><span class="__shiki_17hn0y">    title</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;System Metrics&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">    panels</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">        grafana.panel(</span></span>
<span class="line"><span class="__shiki_17hn0y">            title</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;CPU Usage&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">            query</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">(from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;metrics&quot;)</span></span>
<span class="line"><span class="__shiki_140thh">                |&gt; </span><span class="__shiki_mdbnqw">filter(fn</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">(r) =&gt; r._measurement == &quot;cpu&quot;)</span></span>
<span class="line"><span class="__shiki_140thh">                |&gt; </span><span class="__shiki_mdbnqw">aggregateWindow(every</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">1m</span><span class="__shiki_140thh">, </span><span class="__shiki_17hn0y">fn</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">mean))</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">            visualization</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;timeseries&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        )</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_mdbnqw">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 导出为Grafana JSON</span></span>
<span class="line"><span class="__shiki_mdbnqw">dashboard |&gt; grafana.export()</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>Flux语言作为InfluxDB 2.0的数据处理核心，提供了强大而灵活的数据处理能力：</p><h3 id="关键优势" tabindex="-1">关键优势： <a class="header-anchor" href="#关键优势" aria-label="Permalink to &quot;关键优势：&quot;">​</a></h3><ol><li><strong>统一的数据处理</strong>：从数据获取到转换、分析的完整管道</li><li><strong>跨数据源支持</strong>：不仅仅是InfluxDB，还包括SQL、CSV、HTTP等</li><li><strong>函数式编程</strong>：纯函数、不可变数据，易于测试和推理</li><li><strong>强大的扩展性</strong>：自定义函数、包系统、插件架构</li></ol><h3 id="学习路径建议" tabindex="-1">学习路径建议： <a class="header-anchor" href="#学习路径建议" aria-label="Permalink to &quot;学习路径建议：&quot;">​</a></h3><ol><li><strong>基础阶段</strong>：掌握管道操作、基本函数、filter/map/aggregate</li><li><strong>中级阶段</strong>：学习时间序列分析、连接操作、自定义函数</li><li><strong>高级阶段</strong>：掌握性能优化、模块化设计、外部集成</li><li><strong>专家阶段</strong>：深入语言内部、参与社区贡献、构建复杂数据流水线</li></ol><p>通过系统学习Flux，你可以构建从简单的数据查询到复杂的数据处理流水线，满足现代数据分析和监控的各种需求。随着InfluxDB生态的发展，Flux将继续演进，成为时序数据处理领域的重要工具。</p>`,141)])])}const m=a(_,[["render",l]]);export{d as __pageData,m as default};
