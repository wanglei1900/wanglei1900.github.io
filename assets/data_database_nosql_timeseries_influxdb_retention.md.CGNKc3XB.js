import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"InfluxDB存储策略与保留机制深度解析","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/nosql/timeseries/influxdb/retention.md","filePath":"data/database/nosql/timeseries/influxdb/retention.md"}'),p={name:"data/database/nosql/timeseries/influxdb/retention.md"};function l(h,s,c,t,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="influxdb存储策略与保留机制深度解析" tabindex="-1">InfluxDB存储策略与保留机制深度解析 <a class="header-anchor" href="#influxdb存储策略与保留机制深度解析" aria-label="Permalink to &quot;InfluxDB存储策略与保留机制深度解析&quot;">​</a></h1><h2 id="一、时序数据生命周期管理概述" tabindex="-1">一、时序数据生命周期管理概述 <a class="header-anchor" href="#一、时序数据生命周期管理概述" aria-label="Permalink to &quot;一、时序数据生命周期管理概述&quot;">​</a></h2><h3 id="_1-1-数据管理的多维度挑战" tabindex="-1">1.1 数据管理的多维度挑战 <a class="header-anchor" href="#_1-1-数据管理的多维度挑战" aria-label="Permalink to &quot;1.1 数据管理的多维度挑战&quot;">​</a></h3><p>时序数据管理需要平衡多个相互制约的因素：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">数据管理权衡矩阵：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌──────────────────┬──────────────────┬──────────────────┬──────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│     维度         │  成本考虑        │  性能要求        │  业务价值        │</span></span>
<span class="line"><span class="__shiki_wvjl67">├──────────────────┼──────────────────┼──────────────────┼──────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 存储时间         │ 存储成本随保留   │ 长周期查询性能   │ 历史趋势分析     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│                  │ 时间指数增长     │ 下降             │ 价值             │</span></span>
<span class="line"><span class="__shiki_wvjl67">├──────────────────┼──────────────────┼──────────────────┼──────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 数据精度         │ 高精度需要更多   │ 原始数据查询     │ 实时监控和       │</span></span>
<span class="line"><span class="__shiki_wvjl67">│                  │ 存储空间         │ 更快             │ 精确调试         │</span></span>
<span class="line"><span class="__shiki_wvjl67">├──────────────────┼──────────────────┼──────────────────┼──────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 查询复杂度       │ 复杂查询需要     │ 简单查询响应     │ 深入分析和       │</span></span>
<span class="line"><span class="__shiki_wvjl67">│                  │ 更多计算资源     │ 更快             │ 业务洞察         │</span></span>
<span class="line"><span class="__shiki_wvjl67">├──────────────────┼──────────────────┼──────────────────┼──────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 数据可靠性       │ 多副本增加       │ 高可用性保障     │ 业务连续性和     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│                  │ 存储成本         │ 查询性能         │ 合规性要求       │</span></span>
<span class="line"><span class="__shiki_wvjl67">└──────────────────┴──────────────────┴──────────────────┴──────────────────┘</span></span></code></pre></div><h3 id="_1-2-influxdb数据层级架构" tabindex="-1">1.2 InfluxDB数据层级架构 <a class="header-anchor" href="#_1-2-influxdb数据层级架构" aria-label="Permalink to &quot;1.2 InfluxDB数据层级架构&quot;">​</a></h3><p>InfluxDB采用多层级的组织结构来管理数据：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">数据层级架构：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                InfluxDB 2.x 数据层级                     │</span></span>
<span class="line"><span class="__shiki_wvjl67">├───────────┬──────────────┬──────────────┬───────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│  组织层   │  存储桶层     │  测量层      │  数据点层     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ (Org)     │ (Bucket)     │ (Measurement)│ (Point)       │</span></span>
<span class="line"><span class="__shiki_wvjl67">├───────────┼──────────────┼──────────────┼───────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 用户组织 │ • 数据容器   │ • 逻辑分组   │ • 时间戳      │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 权限隔离 │ • 保留策略   │ • 同类指标   │ • 字段值      │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • API令牌 │ • 存储策略   │ • 查询单元   │ • 标签集      │</span></span>
<span class="line"><span class="__shiki_wvjl67">│           │ • 数据隔离   │              │               │</span></span>
<span class="line"><span class="__shiki_wvjl67">└───────────┴──────────────┴──────────────┴───────────────┘</span></span></code></pre></div><h2 id="二、存储策略-retention-policies-详解" tabindex="-1">二、存储策略（Retention Policies）详解 <a class="header-anchor" href="#二、存储策略-retention-policies-详解" aria-label="Permalink to &quot;二、存储策略（Retention Policies）详解&quot;">​</a></h2><h3 id="_2-1-influxdb-1-x存储策略" tabindex="-1">2.1 InfluxDB 1.x存储策略 <a class="header-anchor" href="#_2-1-influxdb-1-x存储策略" aria-label="Permalink to &quot;2.1 InfluxDB 1.x存储策略&quot;">​</a></h3><h4 id="_2-1-1-rp基本概念" tabindex="-1">2.1.1 RP基本概念 <a class="header-anchor" href="#_2-1-1-rp基本概念" aria-label="Permalink to &quot;2.1.1 RP基本概念&quot;">​</a></h4><p>在InfluxDB 1.x中，存储策略（Retention Policy，RP）定义了数据的保留时间和副本策略。</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- RP创建语法</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> RETENTION</span><span class="__shiki_1itgoe"> POLICY</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_140thh">rp_name</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_1itgoe"> &lt;database_name&gt;</span></span>
<span class="line"><span class="__shiki_140thh">DURATION </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">duration</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">REPLICATION </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">n</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">[SHARD DURATION &lt;duration&gt;]</span></span>
<span class="line"><span class="__shiki_140thh">[DEFAULT]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 示例</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> RETENTION</span><span class="__shiki_1itgoe"> POLICY</span><span class="__shiki_mdbnqw"> &quot;one_year&quot;</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_mdbnqw"> &quot;telegraf&quot;</span></span>
<span class="line"><span class="__shiki_140thh">DURATION 365d</span></span>
<span class="line"><span class="__shiki_140thh">REPLICATION </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_140thh">SHARD DURATION 7d</span></span>
<span class="line"><span class="__shiki_1itgoe">DEFAULT</span></span></code></pre></div><h4 id="_2-1-2-rp关键参数解析" tabindex="-1">2.1.2 RP关键参数解析 <a class="header-anchor" href="#_2-1-2-rp关键参数解析" aria-label="Permalink to &quot;2.1.2 RP关键参数解析&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">RP参数详解：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌────────────────┬─────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 参数           │ 说明                                                 │</span></span>
<span class="line"><span class="__shiki_wvjl67">├────────────────┼─────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ DURATION       │ 数据保留时间：30d（30天），52w（52周），0（永久）    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ REPLICATION    │ 副本数：1（单节点），&gt;1（集群，企业版功能）          │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ SHARD DURATION │ 分片组持续时间：1h, 1d, 7d, 30d，或0（自动）         │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ DEFAULT        │ 设为数据库的默认RP                                  │</span></span>
<span class="line"><span class="__shiki_wvjl67">└────────────────┴─────────────────────────────────────────────────────┘</span></span></code></pre></div><h4 id="_2-1-3-分片组-shard-group-策略" tabindex="-1">2.1.3 分片组（Shard Group）策略 <a class="header-anchor" href="#_2-1-3-分片组-shard-group-策略" aria-label="Permalink to &quot;2.1.3 分片组（Shard Group）策略&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- SHARD DURATION 自动计算规则：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 当DURATION &lt; 2天时: SHARD DURATION = 1小时</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 当DURATION ≥ 2天且 ≤ 6个月时: SHARD DURATION = 1天</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 当DURATION &gt; 6个月时: SHARD DURATION = 7天</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 手动设置分片组持续时间</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> RETENTION</span><span class="__shiki_1itgoe"> POLICY</span><span class="__shiki_mdbnqw"> &quot;custom_shard&quot;</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_mdbnqw"> &quot;metrics&quot;</span></span>
<span class="line"><span class="__shiki_140thh">DURATION 90d</span></span>
<span class="line"><span class="__shiki_140thh">REPLICATION </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_140thh">SHARD DURATION 30d  </span><span class="__shiki_21nrsd">-- 手动设置为30天</span></span></code></pre></div><h4 id="_2-1-4-rp管理操作" tabindex="-1">2.1.4 RP管理操作 <a class="header-anchor" href="#_2-1-4-rp管理操作" aria-label="Permalink to &quot;2.1.4 RP管理操作&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看所有RP</span></span>
<span class="line"><span class="__shiki_140thh">SHOW </span><span class="__shiki_1itgoe">RETENTION</span><span class="__shiki_140thh"> POLICIES </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_mdbnqw"> &quot;database_name&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 修改RP</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> RETENTION</span><span class="__shiki_1itgoe"> POLICY</span><span class="__shiki_mdbnqw"> &quot;rp_name&quot;</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_mdbnqw"> &quot;database_name&quot;</span></span>
<span class="line"><span class="__shiki_140thh">DURATION 30d</span></span>
<span class="line"><span class="__shiki_1itgoe">DEFAULT</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 删除RP</span></span>
<span class="line"><span class="__shiki_1itgoe">DROP</span><span class="__shiki_1itgoe"> RETENTION</span><span class="__shiki_1itgoe"> POLICY</span><span class="__shiki_mdbnqw"> &quot;rp_name&quot;</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_mdbnqw"> &quot;database_name&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用特定RP写入数据</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_mdbnqw"> &quot;rp_name&quot;</span><span class="__shiki_140thh">.</span><span class="__shiki_mdbnqw">&quot;measurement&quot;</span><span class="__shiki_140thh"> ...</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 或</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_mdbnqw"> &quot;database_name&quot;</span><span class="__shiki_140thh">.</span><span class="__shiki_mdbnqw">&quot;rp_name&quot;</span><span class="__shiki_140thh">.</span><span class="__shiki_mdbnqw">&quot;measurement&quot;</span><span class="__shiki_140thh"> ...</span></span></code></pre></div><h3 id="_2-2-influxdb-2-x存储桶-buckets" tabindex="-1">2.2 InfluxDB 2.x存储桶（Buckets） <a class="header-anchor" href="#_2-2-influxdb-2-x存储桶-buckets" aria-label="Permalink to &quot;2.2 InfluxDB 2.x存储桶（Buckets）&quot;">​</a></h3><h4 id="_2-2-1-存储桶概念演进" tabindex="-1">2.2.1 存储桶概念演进 <a class="header-anchor" href="#_2-2-1-存储桶概念演进" aria-label="Permalink to &quot;2.2.1 存储桶概念演进&quot;">​</a></h4><p>InfluxDB 2.x将数据库和RP合并为存储桶（Bucket）概念：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">概念映射关系：</span></span>
<span class="line"><span class="__shiki_wvjl67">InfluxDB 1.x                 InfluxDB 2.x</span></span>
<span class="line"><span class="__shiki_wvjl67">┌────────────────┐          ┌─────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Database       │          │ Organization    │</span></span>
<span class="line"><span class="__shiki_wvjl67">├────────────────┤ 对应     ├─────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ RP + Database  │ -------&gt; │ Bucket          │</span></span>
<span class="line"><span class="__shiki_wvjl67">├────────────────┤          ├─────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Measurement    │ 保留     │ Measurement     │</span></span>
<span class="line"><span class="__shiki_wvjl67">├────────────────┤          ├─────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Series         │ 保留     │ Series          │</span></span>
<span class="line"><span class="__shiki_wvjl67">└────────────────┘          └─────────────────┘</span></span></code></pre></div><h4 id="_2-2-2-存储桶配置详解" tabindex="-1">2.2.2 存储桶配置详解 <a class="header-anchor" href="#_2-2-2-存储桶配置详解" aria-label="Permalink to &quot;2.2.2 存储桶配置详解&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 存储桶配置参数</span></span>
<span class="line"><span class="__shiki_17hn0y">bucket_config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;production_metrics&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  org_id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;org123&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  retention_period</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2592000</span><span class="__shiki_21nrsd">  # 30天，单位秒</span></span>
<span class="line"><span class="__shiki_17hn0y">  description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;生产环境监控指标&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 高级配置（通过API设置）</span></span>
<span class="line"><span class="__shiki_17hn0y">  schema_type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;explicit&quot;</span><span class="__shiki_21nrsd">  # 或 &quot;implicit&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">  # explicit: 显式定义schema</span></span>
<span class="line"><span class="__shiki_21nrsd">  # implicit: 动态schema（默认）</span></span></code></pre></div><h4 id="_2-2-3-存储桶管理api" tabindex="-1">2.2.3 存储桶管理API <a class="header-anchor" href="#_2-2-3-存储桶管理api" aria-label="Permalink to &quot;2.2.3 存储桶管理API&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 创建存储桶</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> --request</span><span class="__shiki_mdbnqw"> POST</span><span class="__shiki_mdbnqw"> http://localhost:8086/api/v2/buckets</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --header</span><span class="__shiki_mdbnqw"> &quot;Authorization: Token \${</span><span class="__shiki_140thh">INFLUX_TOKEN</span><span class="__shiki_mdbnqw">}&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --header</span><span class="__shiki_mdbnqw"> &#39;Content-type: application/json&#39;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --data</span><span class="__shiki_mdbnqw"> &#39;{</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;orgID&quot;: &quot;org_id&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;name&quot;: &quot;30d_metrics&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;description&quot;: &quot;保留30天的指标数据&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;retentionRules&quot;: [{</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;type&quot;: &quot;expire&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;everySeconds&quot;: 2592000  # 30天</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }]</span></span>
<span class="line"><span class="__shiki_mdbnqw">  }&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 更新存储桶保留策略</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> --request</span><span class="__shiki_mdbnqw"> PATCH</span><span class="__shiki_mdbnqw"> http://localhost:8086/api/v2/buckets/</span><span class="__shiki_140thh">\${BUCKET_ID} </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --header</span><span class="__shiki_mdbnqw"> &quot;Authorization: Token \${</span><span class="__shiki_140thh">INFLUX_TOKEN</span><span class="__shiki_mdbnqw">}&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --header</span><span class="__shiki_mdbnqw"> &#39;Content-type: application/json&#39;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --data</span><span class="__shiki_mdbnqw"> &#39;{</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;retentionRules&quot;: [{</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;type&quot;: &quot;expire&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;everySeconds&quot;: 7776000  # 90天</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }]</span></span>
<span class="line"><span class="__shiki_mdbnqw">  }&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查询存储桶信息</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> --request</span><span class="__shiki_mdbnqw"> GET</span><span class="__shiki_mdbnqw"> http://localhost:8086/api/v2/buckets</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --header</span><span class="__shiki_mdbnqw"> &quot;Authorization: Token \${</span><span class="__shiki_140thh">INFLUX_TOKEN</span><span class="__shiki_mdbnqw">}&quot;</span></span></code></pre></div><h2 id="三、分片-shard-管理与数据组织" tabindex="-1">三、分片（Shard）管理与数据组织 <a class="header-anchor" href="#三、分片-shard-管理与数据组织" aria-label="Permalink to &quot;三、分片（Shard）管理与数据组织&quot;">​</a></h2><h3 id="_3-1-分片架构设计" tabindex="-1">3.1 分片架构设计 <a class="header-anchor" href="#_3-1-分片架构设计" aria-label="Permalink to &quot;3.1 分片架构设计&quot;">​</a></h3><h4 id="_3-1-1-分片层次结构" tabindex="-1">3.1.1 分片层次结构 <a class="header-anchor" href="#_3-1-1-分片层次结构" aria-label="Permalink to &quot;3.1.1 分片层次结构&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">分片组织结构：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                分片管理层次结构                         │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────┬─────────────────┬─────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│  存储桶/数据库  │  分片组          │  分片              │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ (Bucket/DB)     │ (Shard Group)   │ (Shard)            │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────┼─────────────────┼─────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 逻辑容器      │ • 时间分区       │ • 物理存储单元      │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 保留策略      │ • 数据组织       │ • TSM文件集合       │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 查询边界      │ • 压缩单元       │ • 系列分区         │</span></span>
<span class="line"><span class="__shiki_wvjl67">│                 │ • 删除单元       │                    │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────┴─────────────────┴─────────────────────┘</span></span></code></pre></div><h4 id="_3-1-2-分片组时间分区策略" tabindex="-1">3.1.2 分片组时间分区策略 <a class="header-anchor" href="#_3-1-2-分片组时间分区策略" aria-label="Permalink to &quot;3.1.2 分片组时间分区策略&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 分片组时间范围计算逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> calculateShardGroupInterval</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">duration</span><span class="__shiki_1t8gfj"> time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    switch</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> duration </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb">24</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">time.Hour:           </span><span class="__shiki_21nrsd">// ≤ 2天</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> time.Hour</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> duration </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 6</span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb">30</span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb">24</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">time.Hour:        </span><span class="__shiki_21nrsd">// ≤ 6个月</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 24</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> time.Hour              </span><span class="__shiki_21nrsd">// 1天</span></span>
<span class="line"><span class="__shiki_1itgoe">    default</span><span class="__shiki_140thh">:                                   </span><span class="__shiki_21nrsd">// &gt; 6个月</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 7</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 24</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> time.Hour              </span><span class="__shiki_21nrsd">// 7天</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 分片组时间对齐</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> alignToShardGroup</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">t</span><span class="__shiki_1t8gfj"> time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">interval</span><span class="__shiki_1t8gfj"> time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 向下对齐到最近的interval边界</span></span>
<span class="line"><span class="__shiki_140thh">    unix </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> t.</span><span class="__shiki_1t8gfj">UnixNano</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    intervalNs </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> interval.</span><span class="__shiki_1t8gfj">Nanoseconds</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    alignedNs </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> (unix </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> intervalNs) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> intervalNs</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Unix</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, alignedNs)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-分片生命周期管理" tabindex="-1">3.2 分片生命周期管理 <a class="header-anchor" href="#_3-2-分片生命周期管理" aria-label="Permalink to &quot;3.2 分片生命周期管理&quot;">​</a></h3><h4 id="_3-2-1-分片创建与激活" tabindex="-1">3.2.1 分片创建与激活 <a class="header-anchor" href="#_3-2-1-分片创建与激活" aria-label="Permalink to &quot;3.2.1 分片创建与激活&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 分片组自动创建机制</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 当写入时间超出当前活跃分片组范围时，自动创建新的分片组</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 手动查看分片信息</span></span>
<span class="line"><span class="__shiki_140thh">SHOW SHARDS</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 结果示例：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- id  database  retention_policy  shard_group  start_time           end_time             expiry_time</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1   telegraf  autogen           1            2023-01-01T00:00:00Z 2023-01-08T00:00:00Z 2023-01-08T00:00:00Z</span></span></code></pre></div><h4 id="_3-2-2-分片状态管理" tabindex="-1">3.2.2 分片状态管理 <a class="header-anchor" href="#_3-2-2-分片状态管理" aria-label="Permalink to &quot;3.2.2 分片状态管理&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 分片状态机</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> ShardState</span><span class="__shiki_1itgoe"> int</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">    ShardStateActive</span><span class="__shiki_1t8gfj">   ShardState</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> iota</span><span class="__shiki_21nrsd">  // 活跃：正在接收写入</span></span>
<span class="line"><span class="__shiki_dzsirb">    ShardStateWarm</span><span class="__shiki_21nrsd">                        // 温：只读，可能被压缩</span></span>
<span class="line"><span class="__shiki_dzsirb">    ShardStateCold</span><span class="__shiki_21nrsd">                        // 冷：只读，可能被删除</span></span>
<span class="line"><span class="__shiki_dzsirb">    ShardStateDeleting</span><span class="__shiki_21nrsd">                    // 删除中</span></span>
<span class="line"><span class="__shiki_dzsirb">    ShardStateDeleted</span><span class="__shiki_21nrsd">                     // 已删除</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 分片健康检查</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> checkShardHealth</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">shard</span><span class="__shiki_1t8gfj"> Shard</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">ShardHealth</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1t8gfj"> ShardHealth</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        ID: shard.ID,</span></span>
<span class="line"><span class="__shiki_140thh">        State: shard.State,</span></span>
<span class="line"><span class="__shiki_140thh">        DiskUsage: shard.</span><span class="__shiki_1t8gfj">DiskUsage</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        SeriesCount: shard.</span><span class="__shiki_1t8gfj">SeriesCount</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        PointsCount: shard.</span><span class="__shiki_1t8gfj">PointsCount</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        LastModified: shard.</span><span class="__shiki_1t8gfj">LastModified</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        IsCompacting: shard.</span><span class="__shiki_1t8gfj">IsCompacting</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        Errors: shard.</span><span class="__shiki_1t8gfj">ErrorCount</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-3-分片数据分布策略" tabindex="-1">3.3 分片数据分布策略 <a class="header-anchor" href="#_3-3-分片数据分布策略" aria-label="Permalink to &quot;3.3 分片数据分布策略&quot;">​</a></h3><h4 id="_3-3-1-系列-series-到分片的映射" tabindex="-1">3.3.1 系列（Series）到分片的映射 <a class="header-anchor" href="#_3-3-1-系列-series-到分片的映射" aria-label="Permalink to &quot;3.3.1 系列（Series）到分片的映射&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 系列分片映射算法</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> mapSeriesToShard</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">seriesKey</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">shardCount</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 使用一致的哈希算法</span></span>
<span class="line"><span class="__shiki_140thh">    hash </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> fnv.</span><span class="__shiki_1t8gfj">New32a</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    hash.</span><span class="__shiki_1t8gfj">Write</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">(seriesKey))</span></span>
<span class="line"><span class="__shiki_140thh">    hashValue </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> hash.</span><span class="__shiki_1t8gfj">Sum32</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 哈希取模确定分片</span></span>
<span class="line"><span class="__shiki_140thh">    shardIndex </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">(hashValue </span><span class="__shiki_1itgoe">%</span><span class="__shiki_1itgoe"> uint32</span><span class="__shiki_140thh">(shardCount))</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> shardIndex</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 优化的系列分布</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> optimizedShardMapping</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">series</span><span class="__shiki_1t8gfj"> Series</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">shards</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">Shard</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 考虑系列热度（访问频率）</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> series.</span><span class="__shiki_1t8gfj">IsHot</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 热点系列分散到不同分片</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1t8gfj"> distributeHotSeries</span><span class="__shiki_140thh">(series, shards)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 冷系列按哈希分配</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1t8gfj"> mapSeriesToShard</span><span class="__shiki_140thh">(series.Key, </span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(shards))</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="四、数据保留与过期机制" tabindex="-1">四、数据保留与过期机制 <a class="header-anchor" href="#四、数据保留与过期机制" aria-label="Permalink to &quot;四、数据保留与过期机制&quot;">​</a></h2><h3 id="_4-1-过期策略实现" tabindex="-1">4.1 过期策略实现 <a class="header-anchor" href="#_4-1-过期策略实现" aria-label="Permalink to &quot;4.1 过期策略实现&quot;">​</a></h3><h4 id="_4-1-1-基于时间的过期" tabindex="-1">4.1.1 基于时间的过期 <a class="header-anchor" href="#_4-1-1-基于时间的过期" aria-label="Permalink to &quot;4.1.1 基于时间的过期&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 过期检查器核心逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> ExpirationChecker</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    interval      </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_21nrsd">      // 检查间隔</span></span>
<span class="line"><span class="__shiki_140thh">    retention     </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_21nrsd">      // 保留时间</span></span>
<span class="line"><span class="__shiki_140thh">    shardLifetime </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">int64</span><span class="__shiki_140thh">]</span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span><span class="__shiki_21nrsd"> // 分片创建时间</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">ec </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">ExpirationChecker</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">run</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    ticker </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">NewTicker</span><span class="__shiki_140thh">(ec.interval)</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> ticker.</span><span class="__shiki_1t8gfj">Stop</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> ticker.C {</span></span>
<span class="line"><span class="__shiki_140thh">        ec.</span><span class="__shiki_1t8gfj">checkAndExpire</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">ec </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">ExpirationChecker</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">checkAndExpire</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    now </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    cutoffTime </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> now.</span><span class="__shiki_1t8gfj">Add</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">ec.retention)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> shardID, created </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> ec.shardLifetime {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 分片组的结束时间作为判断依据</span></span>
<span class="line"><span class="__shiki_140thh">        shardGroupEnd </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> created.</span><span class="__shiki_1t8gfj">Add</span><span class="__shiki_140thh">(shardGroupDuration)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> shardGroupEnd.</span><span class="__shiki_1t8gfj">Before</span><span class="__shiki_140thh">(cutoffTime) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 分片组过期，删除整个分片组</span></span>
<span class="line"><span class="__shiki_140thh">            ec.</span><span class="__shiki_1t8gfj">deleteShardGroup</span><span class="__shiki_140thh">(shardID)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_4-1-2-删除服务-delete-service" tabindex="-1">4.1.2 删除服务（Delete Service） <a class="header-anchor" href="#_4-1-2-删除服务-delete-service" aria-label="Permalink to &quot;4.1.2 删除服务（Delete Service）&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 删除服务配置（influxdb.conf）</span></span>
<span class="line"><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">data</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 删除服务间隔</span></span>
<span class="line"><span class="__shiki_mdbnqw">  compact-full-write-cold-duration = &quot;4h&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 并发删除任务数</span></span>
<span class="line"><span class="__shiki_mdbnqw">  max-concurrent-deletes = 0</span><span class="__shiki_21nrsd">  # 0 = CPU核心数</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 删除速率限制</span></span>
<span class="line"><span class="__shiki_mdbnqw">  delete-rate-limit = 0</span><span class="__shiki_21nrsd">  # MB/s, 0=无限制</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 删除超时时间</span></span>
<span class="line"><span class="__shiki_mdbnqw">  delete-timeout = &quot;10m&quot;</span></span></code></pre></div><h3 id="_4-2-删除操作的原子性与一致性" tabindex="-1">4.2 删除操作的原子性与一致性 <a class="header-anchor" href="#_4-2-删除操作的原子性与一致性" aria-label="Permalink to &quot;4.2 删除操作的原子性与一致性&quot;">​</a></h3><h4 id="_4-2-1-两阶段删除协议" tabindex="-1">4.2.1 两阶段删除协议 <a class="header-anchor" href="#_4-2-1-两阶段删除协议" aria-label="Permalink to &quot;4.2.1 两阶段删除协议&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 两阶段删除确保数据一致性</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> TwoPhaseDeleter</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    shardManager </span><span class="__shiki_1t8gfj">ShardManager</span></span>
<span class="line"><span class="__shiki_140thh">    wal          </span><span class="__shiki_1t8gfj">WriteAheadLog</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">d </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TwoPhaseDeleter</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">deleteShardGroup</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">shardGroupID</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 第一阶段：标记删除</span></span>
<span class="line"><span class="__shiki_140thh">    markErr </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> d.</span><span class="__shiki_1t8gfj">markShardGroupForDeletion</span><span class="__shiki_140thh">(shardGroupID)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> markErr </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;标记删除失败: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, markErr)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 写入WAL确保标记持久化</span></span>
<span class="line"><span class="__shiki_140thh">    walErr </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> d.wal.</span><span class="__shiki_1t8gfj">LogDeletionMark</span><span class="__shiki_140thh">(shardGroupID)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> walErr </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;WAL写入失败: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, walErr)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 第二阶段：执行删除</span></span>
<span class="line"><span class="__shiki_140thh">    deleteErr </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> d.</span><span class="__shiki_1t8gfj">performShardGroupDeletion</span><span class="__shiki_140thh">(shardGroupID)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> deleteErr </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 删除失败，记录错误但保留标记</span></span>
<span class="line"><span class="__shiki_140thh">        d.</span><span class="__shiki_1t8gfj">logDeletionFailure</span><span class="__shiki_140thh">(shardGroupID, deleteErr)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> deleteErr</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 删除成功，清除WAL标记</span></span>
<span class="line"><span class="__shiki_140thh">    d.wal.</span><span class="__shiki_1t8gfj">ClearDeletionMark</span><span class="__shiki_140thh">(shardGroupID)</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_4-2-2-删除操作的容错机制" tabindex="-1">4.2.2 删除操作的容错机制 <a class="header-anchor" href="#_4-2-2-删除操作的容错机制" aria-label="Permalink to &quot;4.2.2 删除操作的容错机制&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 删除操作的恢复机制</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> recoverFromDeletionFailure</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查WAL中的删除标记</span></span>
<span class="line"><span class="__shiki_140thh">    pendingDeletions </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> d.wal.</span><span class="__shiki_1t8gfj">GetPendingDeletions</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, deletion </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> pendingDeletions {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查分片组是否仍然存在</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> d.shardManager.</span><span class="__shiki_1t8gfj">ShardGroupExists</span><span class="__shiki_140thh">(deletion.ShardGroupID) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 重新尝试删除</span></span>
<span class="line"><span class="__shiki_1itgoe">            go</span><span class="__shiki_140thh"> d.</span><span class="__shiki_1t8gfj">retryDeletion</span><span class="__shiki_140thh">(deletion.ShardGroupID)</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 分片组已不存在，清除WAL标记</span></span>
<span class="line"><span class="__shiki_140thh">            d.wal.</span><span class="__shiki_1t8gfj">ClearDeletionMark</span><span class="__shiki_140thh">(deletion.ShardGroupID)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">d </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TwoPhaseDeleter</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">retryDeletion</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">shardGroupID</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    maxRetries </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 3</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> attempt </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">; attempt </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_140thh"> maxRetries; attempt</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> d.</span><span class="__shiki_1t8gfj">performShardGroupDeletion</span><span class="__shiki_140thh">(shardGroupID)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            d.wal.</span><span class="__shiki_1t8gfj">ClearDeletionMark</span><span class="__shiki_140thh">(shardGroupID)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 指数退避重试</span></span>
<span class="line"><span class="__shiki_140thh">        backoff </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_140thh">(math.</span><span class="__shiki_1t8gfj">Pow</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_140thh">(attempt))) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> time.Second</span></span>
<span class="line"><span class="__shiki_140thh">        time.</span><span class="__shiki_1t8gfj">Sleep</span><span class="__shiki_140thh">(backoff)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 重试失败，告警</span></span>
<span class="line"><span class="__shiki_140thh">    d.</span><span class="__shiki_1t8gfj">alertDeletionFailure</span><span class="__shiki_140thh">(shardGroupID)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-3-软删除与硬删除策略" tabindex="-1">4.3 软删除与硬删除策略 <a class="header-anchor" href="#_4-3-软删除与硬删除策略" aria-label="Permalink to &quot;4.3 软删除与硬删除策略&quot;">​</a></h3><h4 id="_4-3-1-软删除-逻辑删除" tabindex="-1">4.3.1 软删除（逻辑删除） <a class="header-anchor" href="#_4-3-1-软删除-逻辑删除" aria-label="Permalink to &quot;4.3.1 软删除（逻辑删除）&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 使用标记位实现软删除</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 添加删除标记字段</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_140thh"> MEASUREMENT metrics </span><span class="__shiki_1itgoe">ADD</span><span class="__shiki_140thh"> FIELD deleted </span><span class="__shiki_1itgoe">BOOLEAN</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 标记数据为删除状态</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> metrics </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> deleted </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> 90d </span><span class="__shiki_1itgoe">AND</span><span class="__shiki_140thh"> host </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;old-server&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查询时过滤已删除数据</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> metrics </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> deleted </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> true</span></span></code></pre></div><h4 id="_4-3-2-硬删除-物理删除" tabindex="-1">4.3.2 硬删除（物理删除） <a class="header-anchor" href="#_4-3-2-硬删除-物理删除" aria-label="Permalink to &quot;4.3.2 硬删除（物理删除）&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// TSM文件删除优化</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> deleteTSMFiles</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">shardPath</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 停止分片的所有写入操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> d.</span><span class="__shiki_1t8gfj">quiesceShard</span><span class="__shiki_140thh">(shardPath); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 确保所有数据已刷写到磁盘</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> d.</span><span class="__shiki_1t8gfj">syncShard</span><span class="__shiki_140thh">(shardPath); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 原子性地删除文件</span></span>
<span class="line"><span class="__shiki_140thh">    tempPath </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> shardPath </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot;.deleting&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> os.</span><span class="__shiki_1t8gfj">Rename</span><span class="__shiki_140thh">(shardPath, tempPath); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 异步删除文件内容</span></span>
<span class="line"><span class="__shiki_1itgoe">    go</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> os.</span><span class="__shiki_1t8gfj">RemoveAll</span><span class="__shiki_140thh">(tempPath); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;删除分片文件失败: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="五、分层存储与数据归档" tabindex="-1">五、分层存储与数据归档 <a class="header-anchor" href="#五、分层存储与数据归档" aria-label="Permalink to &quot;五、分层存储与数据归档&quot;">​</a></h2><h3 id="_5-1-热-温-冷数据分层架构" tabindex="-1">5.1 热-温-冷数据分层架构 <a class="header-anchor" href="#_5-1-热-温-冷数据分层架构" aria-label="Permalink to &quot;5.1 热-温-冷数据分层架构&quot;">​</a></h3><h4 id="_5-1-1-分层存储策略设计" tabindex="-1">5.1.1 分层存储策略设计 <a class="header-anchor" href="#_5-1-1-分层存储策略设计" aria-label="Permalink to &quot;5.1.1 分层存储策略设计&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">分层存储架构：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│              热-温-冷分层存储策略                        │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────┬─────────────┬─────────────┬───────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│  存储层     │  数据特性    │  存储介质   │  访问模式     │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────┼─────────────┼─────────────┼───────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 热存储      │ 0-7天       │ NVMe/SSD    │ 高频读写      │</span></span>
<span class="line"><span class="__shiki_wvjl67">│             │ 原始精度     │ 内存缓存    │ 低延迟        │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────┼─────────────┼─────────────┼───────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 温存储      │ 7-30天      │ SSD/高速HDD │ 中频读        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│             │ 降采样数据   │ 压缩存储    │ 中等延迟      │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────┼─────────────┼─────────────┼───────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 冷存储      │ 30-365天    │ HDD/对象存储│ 低频读        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│             │ 聚合数据     │ 高压缩      │ 高延迟        │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────┼─────────────┼─────────────┼───────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 归档存储    │ &gt;365天      │ 磁带/云归档 │ 极少读        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│             │ 统计摘要     │ 离线存储    │ 批处理        │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────┴─────────────┴─────────────┴───────────────┘</span></span></code></pre></div><h4 id="_5-1-2-自动分层迁移策略" tabindex="-1">5.1.2 自动分层迁移策略 <a class="header-anchor" href="#_5-1-2-自动分层迁移策略" aria-label="Permalink to &quot;5.1.2 自动分层迁移策略&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 数据分层迁移决策器</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> TieringManager</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    hotRetention   </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">    warmRetention  </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">    coldRetention  </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    accessPatterns </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1t8gfj">AccessStats</span></span>
<span class="line"><span class="__shiki_140thh">    costModels     </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">Tier</span><span class="__shiki_140thh">]</span><span class="__shiki_1t8gfj">CostModel</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">tm </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TieringManager</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">decideMigration</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">shard</span><span class="__shiki_1t8gfj"> Shard</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">MigrationDecision</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    age </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Since</span><span class="__shiki_140thh">(shard.CreatedAt)</span></span>
<span class="line"><span class="__shiki_140thh">    accessStats </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> tm.accessPatterns[shard.ID]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 基于访问频率和数据年龄的决策</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> age </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_140thh"> tm.hotRetention </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> accessStats.ReadsPerDay </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1t8gfj"> MigrationDecision</span><span class="__shiki_140thh">{From: shard.Tier, To: HotTier}</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> age </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_140thh"> tm.warmRetention </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> accessStats.ReadsPerDay </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1t8gfj"> MigrationDecision</span><span class="__shiki_140thh">{From: shard.Tier, To: WarmTier}</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> age </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_140thh"> tm.coldRetention </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> accessStats.ReadsPerDay </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1t8gfj"> MigrationDecision</span><span class="__shiki_140thh">{From: shard.Tier, To: ColdTier}</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1t8gfj"> MigrationDecision</span><span class="__shiki_140thh">{From: shard.Tier, To: ArchiveTier}</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-云原生分层存储" tabindex="-1">5.2 云原生分层存储 <a class="header-anchor" href="#_5-2-云原生分层存储" aria-label="Permalink to &quot;5.2 云原生分层存储&quot;">​</a></h3><h4 id="_5-2-1-与对象存储集成" tabindex="-1">5.2.1 与对象存储集成 <a class="header-anchor" href="#_5-2-1-与对象存储集成" aria-label="Permalink to &quot;5.2.1 与对象存储集成&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 分层存储配置示例</span></span>
<span class="line"><span class="__shiki_17hn0y">storage</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  tiers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    hot</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;local&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/var/lib/influxdb/hot&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      retention</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;7d&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    warm</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;s3&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;influxdb-warm&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      region</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;us-east-1&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      retention</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;30d&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    cold</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;s3&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;influxdb-cold&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      storage_class</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;GLACIER&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      retention</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;365d&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 自动迁移策略</span></span>
<span class="line"><span class="__shiki_17hn0y">  auto_tiering</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    check_interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1h&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    move_threshold_days</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span></code></pre></div><h4 id="_5-2-2-数据生命周期策略" tabindex="-1">5.2.2 数据生命周期策略 <a class="header-anchor" href="#_5-2-2-数据生命周期策略" aria-label="Permalink to &quot;5.2.2 数据生命周期策略&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;lifecycle_policies&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;name&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;iot_sensors&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;match&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">        &quot;measurement&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;sensor_data&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        &quot;tags&quot;</span><span class="__shiki_140thh">: {</span><span class="__shiki_dzsirb">&quot;type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;temperature&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;rules&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;action&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;downsample&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;interval&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1m&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;after&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;7d&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;destination&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;warm_tier&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;action&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;downsample&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;interval&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1h&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;after&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;30d&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;destination&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;cold_tier&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;action&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;aggregate&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;aggregations&quot;</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;mean&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;max&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;min&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;interval&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1d&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;after&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;365d&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;destination&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;archive_tier&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;action&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;delete&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;after&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;5y&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      ]</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="六、保留策略与连续查询的协同" tabindex="-1">六、保留策略与连续查询的协同 <a class="header-anchor" href="#六、保留策略与连续查询的协同" aria-label="Permalink to &quot;六、保留策略与连续查询的协同&quot;">​</a></h2><h3 id="_6-1-保留策略驱动的降采样" tabindex="-1">6.1 保留策略驱动的降采样 <a class="header-anchor" href="#_6-1-保留策略驱动的降采样" aria-label="Permalink to &quot;6.1 保留策略驱动的降采样&quot;">​</a></h3><h4 id="_6-1-1-多rp降采样架构" tabindex="-1">6.1.1 多RP降采样架构 <a class="header-anchor" href="#_6-1-1-多rp降采样架构" aria-label="Permalink to &quot;6.1.1 多RP降采样架构&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- InfluxDB 1.x: 多RP降采样链</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 原始数据RP (1天保留)</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> RETENTION</span><span class="__shiki_1itgoe"> POLICY</span><span class="__shiki_mdbnqw"> &quot;raw&quot;</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_mdbnqw"> &quot;iot&quot;</span><span class="__shiki_140thh"> DURATION 1d REPLICATION </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 1分钟降采样RP (7天保留)</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> RETENTION</span><span class="__shiki_1itgoe"> POLICY</span><span class="__shiki_mdbnqw"> &quot;1m&quot;</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_mdbnqw"> &quot;iot&quot;</span><span class="__shiki_140thh"> DURATION 7d REPLICATION </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5分钟降采样RP (30天保留)</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> RETENTION</span><span class="__shiki_1itgoe"> POLICY</span><span class="__shiki_mdbnqw"> &quot;5m&quot;</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_mdbnqw"> &quot;iot&quot;</span><span class="__shiki_140thh"> DURATION 30d REPLICATION </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 1小时降采样RP (1年保留)</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> RETENTION</span><span class="__shiki_1itgoe"> POLICY</span><span class="__shiki_mdbnqw"> &quot;1h&quot;</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_mdbnqw"> &quot;iot&quot;</span><span class="__shiki_140thh"> DURATION 365d REPLICATION </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建连续查询链</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONTINUOUS QUERY </span><span class="__shiki_mdbnqw">&quot;cq_1m&quot;</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_mdbnqw"> &quot;iot&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">  SELECT</span><span class="__shiki_140thh"> mean(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_mdbnqw"> &quot;iot&quot;</span><span class="__shiki_140thh">.</span><span class="__shiki_mdbnqw">&quot;1m&quot;</span><span class="__shiki_140thh">.:MEASUREMENT</span></span>
<span class="line"><span class="__shiki_1itgoe">  FROM</span><span class="__shiki_mdbnqw"> &quot;iot&quot;</span><span class="__shiki_140thh">.</span><span class="__shiki_mdbnqw">&quot;raw&quot;</span><span class="__shiki_140thh">.</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">.</span><span class="__shiki_1itgoe">*/</span></span>
<span class="line"><span class="__shiki_1itgoe">  GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(1m), </span><span class="__shiki_1itgoe">*</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONTINUOUS QUERY </span><span class="__shiki_mdbnqw">&quot;cq_5m&quot;</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_mdbnqw"> &quot;iot&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">  SELECT</span><span class="__shiki_140thh"> mean(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_mdbnqw"> &quot;iot&quot;</span><span class="__shiki_140thh">.</span><span class="__shiki_mdbnqw">&quot;5m&quot;</span><span class="__shiki_140thh">.:MEASUREMENT</span></span>
<span class="line"><span class="__shiki_1itgoe">  FROM</span><span class="__shiki_mdbnqw"> &quot;iot&quot;</span><span class="__shiki_140thh">.</span><span class="__shiki_mdbnqw">&quot;1m&quot;</span><span class="__shiki_140thh">.</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">.</span><span class="__shiki_1itgoe">*/</span></span>
<span class="line"><span class="__shiki_1itgoe">  GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(5m), </span><span class="__shiki_1itgoe">*</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONTINUOUS QUERY </span><span class="__shiki_mdbnqw">&quot;cq_1h&quot;</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_mdbnqw"> &quot;iot&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">  SELECT</span><span class="__shiki_140thh"> mean(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_mdbnqw"> &quot;iot&quot;</span><span class="__shiki_140thh">.</span><span class="__shiki_mdbnqw">&quot;1h&quot;</span><span class="__shiki_140thh">.:MEASUREMENT</span></span>
<span class="line"><span class="__shiki_1itgoe">  FROM</span><span class="__shiki_mdbnqw"> &quot;iot&quot;</span><span class="__shiki_140thh">.</span><span class="__shiki_mdbnqw">&quot;5m&quot;</span><span class="__shiki_140thh">.</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">.</span><span class="__shiki_1itgoe">*/</span></span>
<span class="line"><span class="__shiki_1itgoe">  GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(1h), </span><span class="__shiki_1itgoe">*</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span></span></code></pre></div><h4 id="_6-1-2-智能降采样策略" tabindex="-1">6.1.2 智能降采样策略 <a class="header-anchor" href="#_6-1-2-智能降采样策略" aria-label="Permalink to &quot;6.1.2 智能降采样策略&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">// InfluxDB 2.x</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">基于任务的智能降采样</span></span>
<span class="line"><span class="__shiki_mdbnqw">import &quot;influxdata/influxdb/tasks&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">import &quot;experimental&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 动态降采样任务</span></span>
<span class="line"><span class="__shiki_mdbnqw">option task = {</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;smart_downsampling&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">    every</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">1h,</span></span>
<span class="line"><span class="__shiki_17hn0y">    offset</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 根据数据变化率决定采样频率</span></span>
<span class="line"><span class="__shiki_17hn0y">data = from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;raw_metrics&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -task.every)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; filter(fn: (r) =&gt; r._measurement == &quot;sensor_data&quot;)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 计算数据变化率</span></span>
<span class="line"><span class="__shiki_mdbnqw">volatility = data</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; derivative(unit: 1m, nonNegative: false)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; absolute()</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; mean()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 根据波动性选择采样间隔</span></span>
<span class="line"><span class="__shiki_mdbnqw">sampling_interval =</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">    if volatility &gt;= 10.0 then 1m</span></span>
<span class="line"><span class="__shiki_mdbnqw">    else if volatility &gt;= 1.0 then 5m</span></span>
<span class="line"><span class="__shiki_mdbnqw">    else 15m</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 执行降采样</span></span>
<span class="line"><span class="__shiki_mdbnqw">data</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; aggregateWindow(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        every: duration(v: sampling_interval),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        fn: mean,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        createEmpty: false</span></span>
<span class="line"><span class="__shiki_mdbnqw">    )</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; to(bucket: &quot;downsampled_metrics&quot;)</span></span></code></pre></div><h3 id="_6-2-保留策略与数据回填" tabindex="-1">6.2 保留策略与数据回填 <a class="header-anchor" href="#_6-2-保留策略与数据回填" aria-label="Permalink to &quot;6.2 保留策略与数据回填&quot;">​</a></h3><h4 id="_6-2-1-跨rp数据迁移" tabindex="-1">6.2.1 跨RP数据迁移 <a class="header-anchor" href="#_6-2-1-跨rp数据迁移" aria-label="Permalink to &quot;6.2.1 跨RP数据迁移&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 历史数据回填到不同RP</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 将旧数据从默认RP迁移到长期保留RP</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_mdbnqw"> &quot;long_term&quot;</span><span class="__shiki_140thh">.cpu_usage</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_mdbnqw"> &quot;autogen&quot;</span><span class="__shiki_140thh">.cpu_usage</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> 30d</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> &gt;=</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> 90d</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 批量回填工具脚本</span></span>
<span class="line"><span class="__shiki_140thh">#!</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">bin</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">bash</span></span>
<span class="line"><span class="__shiki_140thh"># </span><span class="__shiki_dzsirb">influxdb_backfill</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">START_DATE=</span><span class="__shiki_mdbnqw">&quot;2023-01-01&quot;</span></span>
<span class="line"><span class="__shiki_140thh">END_DATE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;2023-06-01&quot;</span></span>
<span class="line"><span class="__shiki_140thh">SOURCE_RP</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;autogen&quot;</span></span>
<span class="line"><span class="__shiki_140thh">DEST_RP</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;yearly&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">current_date</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$</span><span class="__shiki_1itgoe">START_DATE</span></span>
<span class="line"><span class="__shiki_1itgoe">while</span><span class="__shiki_140thh"> [[ &quot;$current_date&quot; &lt; &quot;$END_DATE&quot; ]]; do</span></span>
<span class="line"><span class="__shiki_140thh">    next_date</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1itgoe">date</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh">d </span><span class="__shiki_mdbnqw">&quot;$current_date + 1 day&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh">%Y</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">%m</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">%d)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    influx </span><span class="__shiki_1itgoe">-database</span><span class="__shiki_mdbnqw"> &quot;metrics&quot;</span><span class="__shiki_1itgoe"> -execute</span><span class="__shiki_mdbnqw"> &quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        INSERT INTO \\&quot;</span><span class="__shiki_140thh">$DEST_RP\\</span><span class="__shiki_mdbnqw">&quot;.cpu_usage</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SELECT * FROM \\&quot;</span><span class="__shiki_140thh">$SOURCE_RP\\</span><span class="__shiki_mdbnqw">&quot;.cpu_usage</span></span>
<span class="line"><span class="__shiki_mdbnqw">        WHERE time &gt;= &#39;$current_date&#39; AND time &lt; &#39;$next_date&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    current_date</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$next_date</span></span>
<span class="line"><span class="__shiki_140thh">done</span></span></code></pre></div><h2 id="七、存储策略监控与优化" tabindex="-1">七、存储策略监控与优化 <a class="header-anchor" href="#七、存储策略监控与优化" aria-label="Permalink to &quot;七、存储策略监控与优化&quot;">​</a></h2><h3 id="_7-1-存储使用情况监控" tabindex="-1">7.1 存储使用情况监控 <a class="header-anchor" href="#_7-1-存储使用情况监控" aria-label="Permalink to &quot;7.1 存储使用情况监控&quot;">​</a></h3><h4 id="_7-1-1-存储指标收集" tabindex="-1">7.1.1 存储指标收集 <a class="header-anchor" href="#_7-1-1-存储指标收集" aria-label="Permalink to &quot;7.1.1 存储指标收集&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 监控存储桶使用情况</span></span>
<span class="line"><span class="__shiki_mdbnqw">import &quot;influxdata/influxdb/schema&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">import &quot;influxdata/influxdb/monitor&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 存储桶大小监控</span></span>
<span class="line"><span class="__shiki_17hn0y">bucket_usage = from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;_monitoring&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -1h)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; filter(fn: (r) =&gt; r._measurement == &quot;storage_bucket_size&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; group(columns: [&quot;bucket_name&quot;])</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; aggregateWindow(every: 5m, fn: last)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 系列数量监控</span></span>
<span class="line"><span class="__shiki_17hn0y">series_count = from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;_monitoring&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -1h)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; filter(fn: (r) =&gt; r._measurement == &quot;storage_series_count&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; group(columns: [&quot;bucket_name&quot;])</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; aggregateWindow(every: 5m, fn: max)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 数据点写入速率</span></span>
<span class="line"><span class="__shiki_17hn0y">write_rate = from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;_monitoring&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -1h)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; filter(fn: (r) =&gt; r._measurement == &quot;write_points&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; derivative(unit: 1s, nonNegative: true)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; aggregateWindow(every: 1m, fn: mean)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 合并监控指标</span></span>
<span class="line"><span class="__shiki_mdbnqw">join(</span></span>
<span class="line"><span class="__shiki_17hn0y">    tables</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_17hn0y">        usage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bucket_usage</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">        series</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">series_count</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">        writes</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">write_rate</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_dzsirb">    on</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;_time&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;bucket_name&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_mdbnqw">)</span></span>
<span class="line"><span class="__shiki_1itgoe">|</span><span class="__shiki_2bbn9v">&gt; map(fn: (r) =&gt; ({</span></span>
<span class="line"><span class="__shiki_mdbnqw">    time: r._time,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    bucket: r.bucket_name,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    size_gb: r._value_usage / 1e9,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    series_count: r._value_series,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    write_rate_pps: r._value_writes,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    avg_point_size: if r._value_writes &gt; 0 then</span></span>
<span class="line"><span class="__shiki_mdbnqw">        (r._value_usage / r._value_writes)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    else</span></span>
<span class="line"><span class="__shiki_mdbnqw">        0.0</span></span>
<span class="line"><span class="__shiki_140thh">}</span><span class="__shiki_mdbnqw">))</span></span></code></pre></div><h4 id="_7-1-2-存储容量规划" tabindex="-1">7.1.2 存储容量规划 <a class="header-anchor" href="#_7-1-2-存储容量规划" aria-label="Permalink to &quot;7.1.2 存储容量规划&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 容量预测模型</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> CapacityPlanner</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    historicalUsage []</span><span class="__shiki_1t8gfj">UsagePoint</span></span>
<span class="line"><span class="__shiki_140thh">    growthRate      </span><span class="__shiki_1itgoe">float64</span></span>
<span class="line"><span class="__shiki_140thh">    retentionPeriod </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">cp </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">CapacityPlanner</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">predictStorageNeeds</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1jdh33">    daysAhead</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    currentUsage</span><span class="__shiki_1itgoe"> float64</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">) (</span><span class="__shiki_1jdh33">neededGB</span><span class="__shiki_1itgoe"> float64</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">growthTrend</span><span class="__shiki_1itgoe"> float64</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 线性回归预测</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> sumX, sumY, sumXY, sumX2 </span><span class="__shiki_1itgoe">float64</span></span>
<span class="line"><span class="__shiki_140thh">    n </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> float64</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(cp.historicalUsage))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> i, point </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> cp.historicalUsage {</span></span>
<span class="line"><span class="__shiki_140thh">        x </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> float64</span><span class="__shiki_140thh">(i)</span></span>
<span class="line"><span class="__shiki_140thh">        y </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> point.UsageGB</span></span>
<span class="line"><span class="__shiki_140thh">        sumX </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> x</span></span>
<span class="line"><span class="__shiki_140thh">        sumY </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> y</span></span>
<span class="line"><span class="__shiki_140thh">        sumXY </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> x </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> y</span></span>
<span class="line"><span class="__shiki_140thh">        sumX2 </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> x </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> x</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 计算斜率和截距</span></span>
<span class="line"><span class="__shiki_140thh">    slope </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> (n</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">sumXY </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> sumX</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">sumY) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (n</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">sumX2 </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> sumX</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">sumX)</span></span>
<span class="line"><span class="__shiki_140thh">    intercept </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> (sumY </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> slope</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">sumX) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> n</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 预测未来需求</span></span>
<span class="line"><span class="__shiki_140thh">    predictedGB </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> slope</span><span class="__shiki_1itgoe">*float64</span><span class="__shiki_140thh">(daysAhead) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> intercept</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 考虑保留策略的影响</span></span>
<span class="line"><span class="__shiki_140thh">    retentionFactor </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> float64</span><span class="__shiki_140thh">(cp.retentionPeriod.</span><span class="__shiki_1t8gfj">Hours</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 24</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    neededGB </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> predictedGB </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> retentionFactor</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> neededGB, slope</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-性能优化策略" tabindex="-1">7.2 性能优化策略 <a class="header-anchor" href="#_7-2-性能优化策略" aria-label="Permalink to &quot;7.2 性能优化策略&quot;">​</a></h3><h4 id="_7-2-1-分片大小优化" tabindex="-1">7.2.1 分片大小优化 <a class="header-anchor" href="#_7-2-1-分片大小优化" aria-label="Permalink to &quot;7.2.1 分片大小优化&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 分片配置优化</span></span>
<span class="line"><span class="__shiki_17hn0y">shard_config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 目标分片大小（影响查询性能）</span></span>
<span class="line"><span class="__shiki_17hn0y">  target_shard_size</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1GB&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 最小分片大小（避免过多小分片）</span></span>
<span class="line"><span class="__shiki_17hn0y">  min_shard_size</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100MB&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 最大分片大小（影响压缩效率）</span></span>
<span class="line"><span class="__shiki_17hn0y">  max_shard_size</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10GB&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 系列到分片映射</span></span>
<span class="line"><span class="__shiki_17hn0y">  sharding</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    strategy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;hash&quot;</span><span class="__shiki_21nrsd">  # 或 &quot;time_range&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    hash_seed</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">12345</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 分片合并策略</span></span>
<span class="line"><span class="__shiki_17hn0y">  compaction</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    min_files</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">    max_files</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_17hn0y">    size_ratio</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1.5</span></span></code></pre></div><h4 id="_7-2-2-查询性能优化" tabindex="-1">7.2.2 查询性能优化 <a class="header-anchor" href="#_7-2-2-查询性能优化" aria-label="Permalink to &quot;7.2.2 查询性能优化&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 基于RP的查询优化策略</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 查询最近数据（使用热存储RP）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_mdbnqw"> &quot;raw_data&quot;</span><span class="__shiki_140thh">.cpu_usage </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> 1h</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 查询历史趋势（使用降采样RP）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> mean(usage) </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_mdbnqw"> &quot;downsampled_1h&quot;</span><span class="__shiki_140thh">.cpu_stats </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> 30d</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">(1d)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 跨RP查询优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用子查询分别查询不同RP，然后合并</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">  SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_mdbnqw"> &quot;raw&quot;</span><span class="__shiki_140thh">.cpu_usage </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> 2d</span></span>
<span class="line"><span class="__shiki_1itgoe">  UNION ALL</span></span>
<span class="line"><span class="__shiki_1itgoe">  SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_mdbnqw"> &quot;1h&quot;</span><span class="__shiki_140thh">.cpu_usage </span></span>
<span class="line"><span class="__shiki_1itgoe">  WHERE</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> 30d </span><span class="__shiki_1itgoe">AND</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> &lt;=</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> 2d</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_1itgoe"> time</span></span></code></pre></div><h2 id="八、企业级存储策略" tabindex="-1">八、企业级存储策略 <a class="header-anchor" href="#八、企业级存储策略" aria-label="Permalink to &quot;八、企业级存储策略&quot;">​</a></h2><h3 id="_8-1-多租户存储隔离" tabindex="-1">8.1 多租户存储隔离 <a class="header-anchor" href="#_8-1-多租户存储隔离" aria-label="Permalink to &quot;8.1 多租户存储隔离&quot;">​</a></h3><h4 id="_8-1-1-租户存储配额" tabindex="-1">8.1.1 租户存储配额 <a class="header-anchor" href="#_8-1-1-租户存储配额" aria-label="Permalink to &quot;8.1.1 租户存储配额&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 多租户存储配额配置</span></span>
<span class="line"><span class="__shiki_17hn0y">tenants</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;tenant_a&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;企业A&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    storage</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      quota</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100GB&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      warning_threshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0.8</span><span class="__shiki_21nrsd">  # 80%使用率告警</span></span>
<span class="line"><span class="__shiki_17hn0y">      hard_limit</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1.1</span><span class="__shiki_21nrsd">         # 110%硬限制</span></span>
<span class="line"><span class="__shiki_17hn0y">      retention_policies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        default</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;30d&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        premium</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;365d&quot;</span><span class="__shiki_21nrsd">  # 付费功能</span></span>
<span class="line"><span class="__shiki_17hn0y">    performance</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      max_series</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100000</span></span>
<span class="line"><span class="__shiki_17hn0y">      max_write_rate</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10MB/s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;tenant_b&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;企业B&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    storage</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      quota</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1TB&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      warning_threshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0.85</span></span>
<span class="line"><span class="__shiki_17hn0y">      hard_limit</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1.05</span></span>
<span class="line"><span class="__shiki_17hn0y">    performance</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      max_series</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1000000</span></span>
<span class="line"><span class="__shiki_17hn0y">      max_write_rate</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100MB/s&quot;</span></span></code></pre></div><h4 id="_8-1-2-租户数据隔离策略" tabindex="-1">8.1.2 租户数据隔离策略 <a class="header-anchor" href="#_8-1-2-租户数据隔离策略" aria-label="Permalink to &quot;8.1.2 租户数据隔离策略&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 租户存储隔离实现</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> TenantStorageManager</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    tenants </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1t8gfj">TenantConfig</span></span>
<span class="line"><span class="__shiki_140thh">    shardAllocator </span><span class="__shiki_1t8gfj">ShardAllocator</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">tsm </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TenantStorageManager</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">allocateShard</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1jdh33">    tenantID</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    measurement</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    tags</span><span class="__shiki_1itgoe"> map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">) (</span><span class="__shiki_1t8gfj">ShardID</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    tenant </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> tsm.tenants[tenantID]</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> tenant </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_mdbnqw"> &quot;&quot;</span><span class="__shiki_140thh">, ErrTenantNotFound</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查配额</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> tsm.</span><span class="__shiki_1t8gfj">checkQuota</span><span class="__shiki_140thh">(tenant); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_mdbnqw"> &quot;&quot;</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 租户专用的分片分配</span></span>
<span class="line"><span class="__shiki_140thh">    shardID </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> tsm.shardAllocator.</span><span class="__shiki_1t8gfj">allocate</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        pool: tenant.StoragePool,</span></span>
<span class="line"><span class="__shiki_140thh">        tags: </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;tenant&quot;</span><span class="__shiki_140thh">: tenantID,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;measurement&quot;</span><span class="__shiki_140thh">: measurement,</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> shardID, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-2-数据合规性保留" tabindex="-1">8.2 数据合规性保留 <a class="header-anchor" href="#_8-2-数据合规性保留" aria-label="Permalink to &quot;8.2 数据合规性保留&quot;">​</a></h3><h4 id="_8-2-1-合规性保留策略" tabindex="-1">8.2.1 合规性保留策略 <a class="header-anchor" href="#_8-2-1-合规性保留策略" aria-label="Permalink to &quot;8.2.1 合规性保留策略&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">compliance_policies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;financial_records&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;财务数据保留策略&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    regulations</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;SOX&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;GDPR&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;PCI-DSS&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    retention</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      minimum</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;7y&quot;</span><span class="__shiki_21nrsd">      # 最小保留时间</span></span>
<span class="line"><span class="__shiki_17hn0y">      maximum</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10y&quot;</span><span class="__shiki_21nrsd">     # 最大保留时间</span></span>
<span class="line"><span class="__shiki_17hn0y">      legal_hold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">   # 法律保留标志</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_17hn0y">    access_control</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      read</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;auditors&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;compliance_officers&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">      write</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;financial_systems&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">      delete</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;compliance_admin&quot;</span><span class="__shiki_140thh">]  </span><span class="__shiki_21nrsd"># 特殊权限</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_17hn0y">    audit</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">      log_all_access</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">      retention</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10y&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;healthcare_data&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;医疗数据保留策略&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    regulations</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;HIPAA&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    retention</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      minimum</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;6y&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      maximum</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;lifetime&quot;</span><span class="__shiki_21nrsd">  # 永久保留</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_17hn0y">    encryption</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      at_rest</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;AES-256&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      in_transit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;TLS-1.3&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_17hn0y">    anonymization</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      required</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">      method</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;differential_privacy&quot;</span></span></code></pre></div><h4 id="_8-2-2-法律保留-legal-hold-实现" tabindex="-1">8.2.2 法律保留（Legal Hold）实现 <a class="header-anchor" href="#_8-2-2-法律保留-legal-hold-实现" aria-label="Permalink to &quot;8.2.2 法律保留（Legal Hold）实现&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 法律保留管理</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> LegalHoldManager</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    holds </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1t8gfj">LegalHold</span></span>
<span class="line"><span class="__shiki_140thh">    auditLogger </span><span class="__shiki_1t8gfj">AuditLogger</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">lhm </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">LegalHoldManager</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">placeHold</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1jdh33">    bucket</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    reason</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    placedBy</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    expiration</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    hold </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> LegalHold</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        ID:          </span><span class="__shiki_1t8gfj">generateUUID</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        Bucket:      bucket,</span></span>
<span class="line"><span class="__shiki_140thh">        Reason:      reason,</span></span>
<span class="line"><span class="__shiki_140thh">        PlacedBy:    placedBy,</span></span>
<span class="line"><span class="__shiki_140thh">        PlacedAt:    time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        ExpiresAt:   expiration,</span></span>
<span class="line"><span class="__shiki_140thh">        IsActive:    </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 写入法律保留记录</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> lhm.</span><span class="__shiki_1t8gfj">storeHold</span><span class="__shiki_140thh">(hold); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 阻止相关数据的删除</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> lhm.</span><span class="__shiki_1t8gfj">blockDeletions</span><span class="__shiki_140thh">(bucket); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 记录审计日志</span></span>
<span class="line"><span class="__shiki_140thh">    lhm.auditLogger.</span><span class="__shiki_1t8gfj">LogLegalHold</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        Action:   </span><span class="__shiki_mdbnqw">&quot;place_hold&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        HoldID:   hold.ID,</span></span>
<span class="line"><span class="__shiki_140thh">        Bucket:   bucket,</span></span>
<span class="line"><span class="__shiki_140thh">        User:     placedBy,</span></span>
<span class="line"><span class="__shiki_140thh">        Reason:   reason,</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">lhm </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">LegalHoldManager</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">checkDeletionAllowed</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1jdh33">    bucket</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    shardID</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查是否有活跃的法律保留</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> lhm.</span><span class="__shiki_1t8gfj">hasActiveHold</span><span class="__shiki_140thh">(bucket) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">, ErrDeletionBlockedByLegalHold</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="九、灾难恢复与数据保护" tabindex="-1">九、灾难恢复与数据保护 <a class="header-anchor" href="#九、灾难恢复与数据保护" aria-label="Permalink to &quot;九、灾难恢复与数据保护&quot;">​</a></h2><h3 id="_9-1-备份与恢复策略" tabindex="-1">9.1 备份与恢复策略 <a class="header-anchor" href="#_9-1-备份与恢复策略" aria-label="Permalink to &quot;9.1 备份与恢复策略&quot;">​</a></h3><h4 id="_9-1-1-分级备份策略" tabindex="-1">9.1.1 分级备份策略 <a class="header-anchor" href="#_9-1-1-分级备份策略" aria-label="Permalink to &quot;9.1.1 分级备份策略&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">backup_strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 完全备份（每周）</span></span>
<span class="line"><span class="__shiki_17hn0y">  full</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    schedule</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;0 2 * * 0&quot;</span><span class="__shiki_21nrsd">  # 每周日凌晨2点</span></span>
<span class="line"><span class="__shiki_17hn0y">    retention</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;30d&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    compression</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;gzip&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    encryption</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 增量备份（每天）</span></span>
<span class="line"><span class="__shiki_17hn0y">  incremental</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    schedule</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;0 1 * * *&quot;</span><span class="__shiki_21nrsd">  # 每天凌晨1点</span></span>
<span class="line"><span class="__shiki_17hn0y">    retention</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;7d&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 连续备份（WAL归档）</span></span>
<span class="line"><span class="__shiki_17hn0y">  continuous</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    archive_wal</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    archive_interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;5m&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 存储位置</span></span>
<span class="line"><span class="__shiki_17hn0y">  storage</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    local</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/backup/influxdb&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      retention</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;7d&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    cloud</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      provider</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;s3&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;influxdb-backups&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      region</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;us-east-1&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      storage_class</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;STANDARD_IA&quot;</span></span></code></pre></div><h4 id="_9-1-2-备份工具与脚本" tabindex="-1">9.1.2 备份工具与脚本 <a class="header-anchor" href="#_9-1-2-备份工具与脚本" aria-label="Permalink to &quot;9.1.2 备份工具与脚本&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># influxdb_backup.sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 配置参数</span></span>
<span class="line"><span class="__shiki_140thh">BACKUP_DIR</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/backup/influxdb&quot;</span></span>
<span class="line"><span class="__shiki_140thh">RETENTION_DAYS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">30</span></span>
<span class="line"><span class="__shiki_140thh">S3_BUCKET</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;influxdb-backups-$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%Y%m)&quot;</span></span>
<span class="line"><span class="__shiki_140thh">ENCRYPTION_KEY</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/etc/influxdb/backup.key&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 完全备份函数</span></span>
<span class="line"><span class="__shiki_1t8gfj">full_backup</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    TIMESTAMP</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%Y%m%d_%H%M%S</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    BACKUP_PATH</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$BACKUP_DIR</span><span class="__shiki_mdbnqw">/full_</span><span class="__shiki_140thh">$TIMESTAMP</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;开始完全备份: </span><span class="__shiki_140thh">$BACKUP_PATH</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 执行备份</span></span>
<span class="line"><span class="__shiki_1t8gfj">    influx</span><span class="__shiki_mdbnqw"> backup</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">        --host</span><span class="__shiki_140thh"> $INFLUX_HOST </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_dzsirb">        --port</span><span class="__shiki_140thh"> $INFLUX_PORT </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_dzsirb">        --token</span><span class="__shiki_140thh"> $INFLUX_TOKEN </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_dzsirb">        --compression</span><span class="__shiki_mdbnqw"> gzip</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">        --encryption-key-file</span><span class="__shiki_140thh"> $ENCRYPTION_KEY </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_140thh">        $BACKUP_PATH</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 上传到云存储</span></span>
<span class="line"><span class="__shiki_1t8gfj">    aws</span><span class="__shiki_mdbnqw"> s3</span><span class="__shiki_mdbnqw"> sync</span><span class="__shiki_140thh"> $BACKUP_PATH </span><span class="__shiki_mdbnqw">&quot;s3://</span><span class="__shiki_140thh">$S3_BUCKET</span><span class="__shiki_mdbnqw">/full_</span><span class="__shiki_140thh">$TIMESTAMP</span><span class="__shiki_mdbnqw">/&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">        --storage-class</span><span class="__shiki_mdbnqw"> STANDARD_IA</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 清理旧备份</span></span>
<span class="line"><span class="__shiki_1t8gfj">    find</span><span class="__shiki_140thh"> $BACKUP_DIR </span><span class="__shiki_dzsirb">-name</span><span class="__shiki_mdbnqw"> &quot;full_*&quot;</span><span class="__shiki_dzsirb"> -mtime</span><span class="__shiki_mdbnqw"> +</span><span class="__shiki_140thh">$RETENTION_DAYS </span><span class="__shiki_dzsirb">-delete</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;完全备份完成&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 增量备份函数</span></span>
<span class="line"><span class="__shiki_1t8gfj">incremental_backup</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    TIMESTAMP</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%Y%m%d_%H%M%S</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    BACKUP_PATH</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$BACKUP_DIR</span><span class="__shiki_mdbnqw">/incr_</span><span class="__shiki_140thh">$TIMESTAMP</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;开始增量备份: </span><span class="__shiki_140thh">$BACKUP_PATH</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 查找最新的完全备份作为基准</span></span>
<span class="line"><span class="__shiki_140thh">    LATEST_FULL</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh"> $BACKUP_DIR </span><span class="__shiki_dzsirb">-name</span><span class="__shiki_mdbnqw"> &quot;full_*&quot;</span><span class="__shiki_dzsirb"> -type</span><span class="__shiki_mdbnqw"> d</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> sort</span><span class="__shiki_dzsirb"> -r</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> head</span><span class="__shiki_dzsirb"> -1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_1itgoe">-z</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$LATEST_FULL</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;未找到完全备份，执行完全备份&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">        full_backup</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 执行增量备份</span></span>
<span class="line"><span class="__shiki_1t8gfj">    influx</span><span class="__shiki_mdbnqw"> backup</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">        --host</span><span class="__shiki_140thh"> $INFLUX_HOST </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_dzsirb">        --port</span><span class="__shiki_140thh"> $INFLUX_PORT </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_dzsirb">        --token</span><span class="__shiki_140thh"> $INFLUX_TOKEN </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_dzsirb">        --compression</span><span class="__shiki_mdbnqw"> gzip</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">        --encryption-key-file</span><span class="__shiki_140thh"> $ENCRYPTION_KEY </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_dzsirb">        --incremental</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">        --base-backup</span><span class="__shiki_140thh"> $LATEST_FULL </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_140thh">        $BACKUP_PATH</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 上传到云存储</span></span>
<span class="line"><span class="__shiki_1t8gfj">    aws</span><span class="__shiki_mdbnqw"> s3</span><span class="__shiki_mdbnqw"> sync</span><span class="__shiki_140thh"> $BACKUP_PATH </span><span class="__shiki_mdbnqw">&quot;s3://</span><span class="__shiki_140thh">$S3_BUCKET</span><span class="__shiki_mdbnqw">/incr_</span><span class="__shiki_140thh">$TIMESTAMP</span><span class="__shiki_mdbnqw">/&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 清理旧增量备份</span></span>
<span class="line"><span class="__shiki_1t8gfj">    find</span><span class="__shiki_140thh"> $BACKUP_DIR </span><span class="__shiki_dzsirb">-name</span><span class="__shiki_mdbnqw"> &quot;incr_*&quot;</span><span class="__shiki_dzsirb"> -mtime</span><span class="__shiki_mdbnqw"> +7</span><span class="__shiki_dzsirb"> -delete</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;增量备份完成&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 主函数</span></span>
<span class="line"><span class="__shiki_1t8gfj">main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_dzsirb">$1</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> in</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;full&quot;</span><span class="__shiki_1itgoe">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">            full_backup</span></span>
<span class="line"><span class="__shiki_140thh">            ;;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;incremental&quot;</span><span class="__shiki_1itgoe">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">            incremental_backup</span></span>
<span class="line"><span class="__shiki_140thh">            ;;</span></span>
<span class="line"><span class="__shiki_1itgoe">        *)</span></span>
<span class="line"><span class="__shiki_dzsirb">            echo</span><span class="__shiki_mdbnqw"> &quot;用法: </span><span class="__shiki_dzsirb">$0</span><span class="__shiki_mdbnqw"> {full|incremental}&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">            exit</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">            ;;</span></span>
<span class="line"><span class="__shiki_1itgoe">    esac</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">main</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_dzsirb">$@</span><span class="__shiki_mdbnqw">&quot;</span></span></code></pre></div><h3 id="_9-2-跨区域复制与容灾" tabindex="-1">9.2 跨区域复制与容灾 <a class="header-anchor" href="#_9-2-跨区域复制与容灾" aria-label="Permalink to &quot;9.2 跨区域复制与容灾&quot;">​</a></h3><h4 id="_9-2-1-多区域复制策略" tabindex="-1">9.2.1 多区域复制策略 <a class="header-anchor" href="#_9-2-1-多区域复制策略" aria-label="Permalink to &quot;9.2.1 多区域复制策略&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">replication_strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 主-从复制</span></span>
<span class="line"><span class="__shiki_17hn0y">  primary_region</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;us-east-1&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  secondary_regions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">region</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;us-west-2&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      lag_tolerance</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;30s&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      read_only</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">region</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;eu-west-1&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      lag_tolerance</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;60s&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      read_only</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 复制配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  replication</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;async&quot;</span><span class="__shiki_21nrsd">  # 或 &quot;sync&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    batch_size</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;64MB&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    batch_timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;5s&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    compression</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;snappy&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 故障转移策略</span></span>
<span class="line"><span class="__shiki_17hn0y">  failover</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    automatic</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    detection_interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10s&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    health_check</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;5s&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;3s&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      unhealthy_threshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">      healthy_threshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span></code></pre></div><h4 id="_9-2-2-复制状态监控" tabindex="-1">9.2.2 复制状态监控 <a class="header-anchor" href="#_9-2-2-复制状态监控" aria-label="Permalink to &quot;9.2.2 复制状态监控&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">// 监控跨区域复制状态</span></span>
<span class="line"><span class="__shiki_mdbnqw">import &quot;influxdata/influxdb/monitor&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 复制延迟监控</span></span>
<span class="line"><span class="__shiki_17hn0y">replication_lag = from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;_internal&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -5m)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; filter(fn: (r) =&gt; </span></span>
<span class="line"><span class="__shiki_mdbnqw">        r._measurement == &quot;replication&quot; and</span></span>
<span class="line"><span class="__shiki_mdbnqw">        r._field == &quot;lag_ms&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    )</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; group(columns: [&quot;region&quot;])</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; aggregateWindow(every: 1m, fn: max)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 复制吞吐量监控</span></span>
<span class="line"><span class="__shiki_17hn0y">replication_throughput = from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;_internal&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -5m)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; filter(fn: (r) =&gt; </span></span>
<span class="line"><span class="__shiki_mdbnqw">        r._measurement == &quot;replication&quot; and</span></span>
<span class="line"><span class="__shiki_mdbnqw">        r._field == &quot;bytes_per_sec&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    )</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; derivative(unit: 1s, nonNegative: true)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; group(columns: [&quot;region&quot;])</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; aggregateWindow(every: 1m, fn: mean)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 复制错误监控</span></span>
<span class="line"><span class="__shiki_17hn0y">replication_errors = from(bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;_internal&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">    |</span><span class="__shiki_2bbn9v">&gt; range(start: -5m)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; filter(fn: (r) =&gt; </span></span>
<span class="line"><span class="__shiki_mdbnqw">        r._measurement == &quot;replication&quot; and</span></span>
<span class="line"><span class="__shiki_mdbnqw">        r._field == &quot;error_count&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    )</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; group(columns: [&quot;region&quot;, &quot;error_type&quot;])</span></span>
<span class="line"><span class="__shiki_mdbnqw">    |&gt; aggregateWindow(every: 1m, fn: sum)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">// 生成复制健康报告</span></span>
<span class="line"><span class="__shiki_mdbnqw">join(</span></span>
<span class="line"><span class="__shiki_17hn0y">    tables</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_17hn0y">        lag</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">replication_lag</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">        throughput</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">replication_throughput</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_17hn0y">        errors</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">replication_errors</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_dzsirb">    on</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;_time&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;region&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_mdbnqw">)</span></span>
<span class="line"><span class="__shiki_1itgoe">|</span><span class="__shiki_2bbn9v">&gt; map(fn: (r) =&gt; ({</span></span>
<span class="line"><span class="__shiki_mdbnqw">    time: r._time,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    region: r.region,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    lag_ms: r._value_lag,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    throughput_mbps: r._value_throughput / 1e6,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    error_rate: r._value_errors,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    status: </span></span>
<span class="line"><span class="__shiki_mdbnqw">        if r._value_lag &gt; 60000 then &quot;critical&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        else if r._value_lag &gt; 30000 then &quot;warning&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        else if r._value_errors &gt; 0 then &quot;degraded&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        else &quot;healthy&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span><span class="__shiki_mdbnqw">))</span></span></code></pre></div><h2 id="十、未来发展趋势" tabindex="-1">十、未来发展趋势 <a class="header-anchor" href="#十、未来发展趋势" aria-label="Permalink to &quot;十、未来发展趋势&quot;">​</a></h2><h3 id="_10-1-influxdb-3-0-iox-存储架构" tabindex="-1">10.1 InfluxDB 3.0（IOx）存储架构 <a class="header-anchor" href="#_10-1-influxdb-3-0-iox-存储架构" aria-label="Permalink to &quot;10.1 InfluxDB 3.0（IOx）存储架构&quot;">​</a></h3><h4 id="_10-1-1-新一代存储引擎" tabindex="-1">10.1.1 新一代存储引擎 <a class="header-anchor" href="#_10-1-1-新一代存储引擎" aria-label="Permalink to &quot;10.1.1 新一代存储引擎&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">InfluxDB IOx架构：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                 IOx存储架构演进                         │</span></span>
<span class="line"><span class="__shiki_wvjl67">├──────────────┬──────────────┬──────────────┬───────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 当前(TSM)    │ IOx改进      │ 优势         │ 影响      │</span></span>
<span class="line"><span class="__shiki_wvjl67">├──────────────┼──────────────┼──────────────┼───────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 行式存储     │ 列式存储     │ 更好压缩比   │ 存储成本↓ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 专用编码     │ Apache Arrow │ 向量化执行   │ 查询性能↑ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 自定义格式   │ Parquet格式  │ 生态兼容     │ 互操作性↑ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 内置索引     │ 独立索引服务 │ 灵活扩展     │ 可维护性↑ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 单一存储     │ 分层存储     │ 成本优化     │ TCO↓      │</span></span>
<span class="line"><span class="__shiki_wvjl67">└──────────────┴──────────────┴──────────────┴───────────┘</span></span></code></pre></div><h4 id="_10-1-2-智能数据管理" tabindex="-1">10.1.2 智能数据管理 <a class="header-anchor" href="#_10-1-2-智能数据管理" aria-label="Permalink to &quot;10.1.2 智能数据管理&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- IOx智能数据管理特性</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 自动数据分层</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> DATABASE</span><span class="__shiki_140thh"> metrics </span><span class="__shiki_1itgoe">SET</span></span>
<span class="line"><span class="__shiki_140thh">  TIERING_POLICY </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> AUTO</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  COST_OPTIMIZATION </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> TRUE,</span></span>
<span class="line"><span class="__shiki_140thh">  PERFORMANCE_TARGET </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;p95 &lt; 100ms&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 基于预测的保留策略</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> RETENTION</span><span class="__shiki_1itgoe"> POLICY</span><span class="__shiki_140thh"> predictive </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">  RETENTION</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> ADAPTIVE(</span></span>
<span class="line"><span class="__shiki_140thh">    BASED_ON </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> access_pattern,</span></span>
<span class="line"><span class="__shiki_140thh">    MIN </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;30d&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    MAX </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;5y&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  ),</span></span>
<span class="line"><span class="__shiki_140thh">  TIERING </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> AUTO</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    HOT_WHEN </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;access_frequency &gt; 10/day&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    COLD_WHEN </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;access_frequency &lt; 1/month&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  )</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 合规性自动执行</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> financial_records</span></span>
<span class="line"><span class="__shiki_1itgoe">ENABLE</span><span class="__shiki_140thh"> COMPLIANCE MODE (</span></span>
<span class="line"><span class="__shiki_140thh">  REGULATIONS </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [&#39;SOX&#39;, &#39;GDPR&#39;],</span></span>
<span class="line"><span class="__shiki_140thh">  AUDIT_TRAIL </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> FULL,</span></span>
<span class="line"><span class="__shiki_140thh">  DATA_MASKING </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ON_ACCESS</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_10-2-云原生存储服务" tabindex="-1">10.2 云原生存储服务 <a class="header-anchor" href="#_10-2-云原生存储服务" aria-label="Permalink to &quot;10.2 云原生存储服务&quot;">​</a></h3><h4 id="_10-2-1-无服务器架构" tabindex="-1">10.2.1 无服务器架构 <a class="header-anchor" href="#_10-2-1-无服务器架构" aria-label="Permalink to &quot;10.2.1 无服务器架构&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 云原生InfluxDB配置</span></span>
<span class="line"><span class="__shiki_17hn0y">influxdb_cloud</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  deployment_mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;serverless&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  storage</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    auto_scaling</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">      min_capacity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10GB&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      max_capacity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10TB&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      scale_up_threshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0.8</span></span>
<span class="line"><span class="__shiki_17hn0y">      scale_down_threshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0.3</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_17hn0y">    tiering</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      hot</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;auto&quot;</span><span class="__shiki_21nrsd">      # NVMe缓存</span></span>
<span class="line"><span class="__shiki_17hn0y">      warm</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;auto&quot;</span><span class="__shiki_21nrsd">     # SSD存储</span></span>
<span class="line"><span class="__shiki_17hn0y">      cold</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;s3&quot;</span><span class="__shiki_21nrsd">       # 对象存储</span></span>
<span class="line"><span class="__shiki_17hn0y">      archive</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;glacier&quot;</span><span class="__shiki_21nrsd"> # 归档存储</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_17hn0y">  data_lifecycle</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    auto_optimization</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    compression</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;adaptive&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    encryption</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;auto_rotating&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">  cost_optimization</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spot_instances</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    reserved_capacity</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">    auto_pause</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;after 15m idle&quot;</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><h3 id="关键实践原则" tabindex="-1">关键实践原则 <a class="header-anchor" href="#关键实践原则" aria-label="Permalink to &quot;关键实践原则&quot;">​</a></h3><ol><li><strong>分层存储策略</strong>：根据数据价值实施热-温-冷分层存储</li><li><strong>保留策略规划</strong>：基于业务需求和合规要求设计保留周期</li><li><strong>容量规划</strong>：结合增长预测和保留策略进行存储容量规划</li><li><strong>性能优化</strong>：通过分片优化、数据降采样平衡性能与成本</li><li><strong>合规性管理</strong>：实施法律保留、审计跟踪等合规性措施</li><li><strong>灾难恢复</strong>：建立分级备份和跨区域复制策略</li><li><strong>成本控制</strong>：利用云原生特性优化存储成本</li></ol><h3 id="实施路线图" tabindex="-1">实施路线图 <a class="header-anchor" href="#实施路线图" aria-label="Permalink to &quot;实施路线图&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">存储策略实施阶段：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────┬─────────────┬─────────────┬─────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│  阶段一     │  阶段二     │  阶段三     │  阶段四     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 基础配置    │ 优化调整    │ 高级功能    │ 云原生      │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────┼─────────────┼─────────────┼─────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 设置基础  │ • 实施降采  │ • 多租户    │ • 无服务器  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│   保留策略  │   样和分层  │   隔离      │   架构      │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 监控存储  │   存储      │ • 合规性    │ • 自动伸缩  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│   使用情况  │ • 优化分片  │   保留      │ • 智能分层  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 建立备份  │   策略      │ • 跨区域    │ • 成本优化  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│   恢复策略  │ • 性能调优  │   复制      │             │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────┴─────────────┴─────────────┴─────────────┘</span></span></code></pre></div><p>通过系统的存储策略和保留机制设计，可以在保证数据可用性和性能的同时，有效控制存储成本，满足合规性要求，为业务提供可靠的数据基础设施。随着技术的演进，InfluxDB的存储策略将继续向着更智能、更自动化、更云原生的方向发展。</p>`,125)])])}const d=a(p,[["render",l]]);export{r as __pageData,d as default};
