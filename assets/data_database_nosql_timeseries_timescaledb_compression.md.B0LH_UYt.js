import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"NoSQL数据库 - TimescaleDB压缩与归档策略 详细学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/nosql/timeseries/timescaledb/compression.md","filePath":"data/database/nosql/timeseries/timescaledb/compression.md"}'),p={name:"data/database/nosql/timeseries/timescaledb/compression.md"};function l(h,s,c,e,t,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="nosql数据库-timescaledb压缩与归档策略-详细学习笔记" tabindex="-1">NoSQL数据库 - TimescaleDB压缩与归档策略 详细学习笔记 <a class="header-anchor" href="#nosql数据库-timescaledb压缩与归档策略-详细学习笔记" aria-label="Permalink to &quot;NoSQL数据库 - TimescaleDB压缩与归档策略 详细学习笔记&quot;">​</a></h1><h2 id="一、压缩概述与原理" tabindex="-1">一、压缩概述与原理 <a class="header-anchor" href="#一、压缩概述与原理" aria-label="Permalink to &quot;一、压缩概述与原理&quot;">​</a></h2><h3 id="_1-1-为什么需要压缩时序数据" tabindex="-1">1.1 为什么需要压缩时序数据 <a class="header-anchor" href="#_1-1-为什么需要压缩时序数据" aria-label="Permalink to &quot;1.1 为什么需要压缩时序数据&quot;">​</a></h3><p><strong>时序数据特点：</strong></p><ul><li>数据量大且持续增长</li><li>高写入速率，低更新频率</li><li>时间局部性：新数据查询频繁，旧数据查询较少</li><li>高重复性：相邻时间点的值通常相似</li></ul><p><strong>压缩带来的好处：</strong></p><ul><li><strong>存储成本降低</strong>：典型压缩比 3-10 倍</li><li><strong>I/O 性能提升</strong>：减少磁盘读取量</li><li><strong>内存效率提高</strong>：更多数据可缓存</li><li><strong>备份恢复加速</strong>：减少备份大小和传输时间</li></ul><h3 id="_1-2-timescaledb-压缩原理" tabindex="-1">1.2 TimescaleDB 压缩原理 <a class="header-anchor" href="#_1-2-timescaledb-压缩原理" aria-label="Permalink to &quot;1.2 TimescaleDB 压缩原理&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 压缩前的行存储</span></span>
<span class="line"><span class="__shiki_1itgoe">Row</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">time=</span><span class="__shiki_140thh">t1, device</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">001</span><span class="__shiki_140thh">, temp</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">23</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">, humidity</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">65</span></span>
<span class="line"><span class="__shiki_1itgoe">Row</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">time=</span><span class="__shiki_140thh">t2, device</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">001</span><span class="__shiki_140thh">, temp</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">23</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">6</span><span class="__shiki_140thh">, humidity</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">65</span></span>
<span class="line"><span class="__shiki_1itgoe">Row</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">time=</span><span class="__shiki_140thh">t3, device</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">001</span><span class="__shiki_140thh">, temp</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">23</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">7</span><span class="__shiki_140thh">, humidity</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">66</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 压缩后的列存储</span></span>
<span class="line"><span class="__shiki_140thh">Segment: device</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">001</span></span>
<span class="line"><span class="__shiki_1itgoe">  time</span><span class="__shiki_140thh">: [t1, t2, t3]    </span><span class="__shiki_21nrsd">--&gt; 增量编码 + 字典压缩</span></span>
<span class="line"><span class="__shiki_140thh">  temp: [23.5, 23.6, 23.7] </span><span class="__shiki_21nrsd">--&gt; Delta + 浮点压缩</span></span>
<span class="line"><span class="__shiki_140thh">  humidity: [65, 65, 66]   </span><span class="__shiki_21nrsd">--&gt; 游程编码</span></span></code></pre></div><p><strong>核心压缩技术：</strong></p><ol><li><strong>列式存储</strong>：相同数据类型放在一起，提高压缩率</li><li><strong>增量编码</strong>：存储差值而非绝对值</li><li><strong>字典压缩</strong>：重复值用短代码表示</li><li><strong>游程编码</strong>：连续相同值压缩为&quot;值×次数&quot;</li><li><strong>轻量级索引</strong>：为压缩数据维护元数据索引</li></ol><h2 id="二、压缩配置与管理" tabindex="-1">二、压缩配置与管理 <a class="header-anchor" href="#二、压缩配置与管理" aria-label="Permalink to &quot;二、压缩配置与管理&quot;">​</a></h2><h3 id="_2-1-启用压缩" tabindex="-1">2.1 启用压缩 <a class="header-anchor" href="#_2-1-启用压缩" aria-label="Permalink to &quot;2.1 启用压缩&quot;">​</a></h3><h4 id="_2-1-1-基本压缩配置" tabindex="-1">2.1.1 基本压缩配置 <a class="header-anchor" href="#_2-1-1-基本压缩配置" aria-label="Permalink to &quot;2.1.1 基本压缩配置&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 在现有表上启用压缩</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> sensor_data </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">    timescaledb</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">compress</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    timescaledb</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">compress_segmentby</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;sensor_id, location_id&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    timescaledb</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">compress_orderby</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;time DESC, measurement_id&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建表时直接启用压缩</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> sensor_data_compressed</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    time</span><span class="__shiki_1itgoe"> TIMESTAMPTZ</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    sensor_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    location_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    temperature </span><span class="__shiki_1itgoe">DOUBLE PRECISION</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    humidity </span><span class="__shiki_1itgoe">DOUBLE PRECISION</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    status</span><span class="__shiki_1itgoe"> TEXT</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">    timescaledb</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">compress</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    timescaledb</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">compress_segmentby</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;sensor_id, location_id&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    timescaledb</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">compress_orderby</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;time DESC&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> create_hypertable(</span><span class="__shiki_mdbnqw">&#39;sensor_data_compressed&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;time&#39;</span><span class="__shiki_140thh">);</span></span></code></pre></div><h4 id="_2-1-2-压缩参数详解" tabindex="-1">2.1.2 压缩参数详解 <a class="header-anchor" href="#_2-1-2-压缩参数详解" aria-label="Permalink to &quot;2.1.2 压缩参数详解&quot;">​</a></h4><p><strong>segmentby 参数：</strong></p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 按设备分区压缩（每个设备单独压缩）</span></span>
<span class="line"><span class="__shiki_dzsirb">timescaledb</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">compress_segmentby</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;sensor_id&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 多列分区（设备+位置）</span></span>
<span class="line"><span class="__shiki_dzsirb">timescaledb</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">compress_segmentby</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;sensor_id, location_id&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 无分区（所有数据一起压缩）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 不指定segmentby参数</span></span></code></pre></div><p><strong>orderby 参数：</strong></p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 按时间降序（新数据在前）</span></span>
<span class="line"><span class="__shiki_dzsirb">timescaledb</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">compress_orderby</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;time DESC&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 多列排序</span></span>
<span class="line"><span class="__shiki_dzsirb">timescaledb</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">compress_orderby</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;time DESC, measurement_id ASC&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 默认排序：按时间戳升序</span></span>
<span class="line"><span class="__shiki_dzsirb">timescaledb</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">compress_orderby</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;time&#39;</span></span></code></pre></div><p><strong>segmentby vs orderby 的作用：</strong></p><ul><li><strong>segmentby</strong>：定义压缩边界，相同值的行被压缩在一起</li><li><strong>orderby</strong>：定义压缩块内的行顺序，影响压缩效率和查询性能</li></ul><h3 id="_2-2-压缩策略配置" tabindex="-1">2.2 压缩策略配置 <a class="header-anchor" href="#_2-2-压缩策略配置" aria-label="Permalink to &quot;2.2 压缩策略配置&quot;">​</a></h3><h4 id="_2-2-1-自动压缩策略" tabindex="-1">2.2.1 自动压缩策略 <a class="header-anchor" href="#_2-2-1-自动压缩策略" aria-label="Permalink to &quot;2.2.1 自动压缩策略&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 为超过7天的数据启用压缩</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> add_compression_policy(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;sensor_data&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    compress_after </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;7 days&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    if_not_exists </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> true</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 高级压缩策略配置</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> add_compression_policy(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;sensor_data&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    compress_after </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;7 days&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    schedule_interval </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;1 hour&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">-- 检查频率</span></span>
<span class="line"><span class="__shiki_140thh">    initial_start </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_1itgoe"> NOW</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;10 minutes&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">-- 首次执行时间</span></span>
<span class="line"><span class="__shiki_140thh">    timezone </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;Asia/Shanghai&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h4 id="_2-2-2-压缩策略调整" tabindex="-1">2.2.2 压缩策略调整 <a class="header-anchor" href="#_2-2-2-压缩策略调整" aria-label="Permalink to &quot;2.2.2 压缩策略调整&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看现有压缩策略</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    hypertable_name,</span></span>
<span class="line"><span class="__shiki_140thh">    compress_after,</span></span>
<span class="line"><span class="__shiki_140thh">    schedule_interval,</span></span>
<span class="line"><span class="__shiki_140thh">    max_workers,</span></span>
<span class="line"><span class="__shiki_140thh">    last_run_started_at,</span></span>
<span class="line"><span class="__shiki_140thh">    total_runs,</span></span>
<span class="line"><span class="__shiki_140thh">    total_compressed_chunks</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">compression_settings</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 修改压缩策略（增加压缩延迟）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> alter_compression_policy(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;sensor_data&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    compress_after </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;14 days&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 移除压缩策略</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> remove_compression_policy(</span><span class="__shiki_mdbnqw">&#39;sensor_data&#39;</span><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_2-3-手动压缩管理" tabindex="-1">2.3 手动压缩管理 <a class="header-anchor" href="#_2-3-手动压缩管理" aria-label="Permalink to &quot;2.3 手动压缩管理&quot;">​</a></h3><h4 id="_2-3-1-手动压缩分块" tabindex="-1">2.3.1 手动压缩分块 <a class="header-anchor" href="#_2-3-1-手动压缩分块" aria-label="Permalink to &quot;2.3.1 手动压缩分块&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看可压缩的分块</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> show_chunks(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;sensor_data&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    older_than </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;7 days&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 手动压缩单个分块</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> compress_chunk(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;_timescaledb_internal._hyper_1_chunk_7&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    if_not_compressed </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> true</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 批量压缩分块</span></span>
<span class="line"><span class="__shiki_140thh">DO $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    chunk_name </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> chunk_name </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> show_chunks(</span><span class="__shiki_mdbnqw">&#39;sensor_data&#39;</span><span class="__shiki_140thh">, older_than </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;7 days&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        BEGIN</span></span>
<span class="line"><span class="__shiki_140thh">            PERFORM compress_chunk(chunk_name);</span></span>
<span class="line"><span class="__shiki_140thh">            RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;Compressed chunk: %&#39;</span><span class="__shiki_140thh">, chunk_name;</span></span>
<span class="line"><span class="__shiki_140thh">        EXCEPTION </span><span class="__shiki_1itgoe">WHEN</span><span class="__shiki_140thh"> OTHERS </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_140thh">            RAISE WARNING </span><span class="__shiki_mdbnqw">&#39;Failed to compress chunk %: %&#39;</span><span class="__shiki_140thh">, chunk_name, SQLERRM;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh"> $$;</span></span></code></pre></div><h4 id="_2-3-2-解压缩操作" tabindex="-1">2.3.2 解压缩操作 <a class="header-anchor" href="#_2-3-2-解压缩操作" aria-label="Permalink to &quot;2.3.2 解压缩操作&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 解压缩单个分块</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> decompress_chunk(</span><span class="__shiki_mdbnqw">&#39;_timescaledb_internal._hyper_1_chunk_7&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 批量解压缩（用于数据修改）</span></span>
<span class="line"><span class="__shiki_140thh">DO $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    chunk_name </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> chunk_name </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> chunk_name </span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunks</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> hypertable_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;sensor_data&#39;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        AND</span><span class="__shiki_140thh"> is_compressed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true</span></span>
<span class="line"><span class="__shiki_1itgoe">        AND</span><span class="__shiki_140thh"> range_start </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_1itgoe"> NOW</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;1 day&#39;</span><span class="__shiki_21nrsd">  -- 示例条件</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_140thh">        PERFORM decompress_chunk(chunk_name);</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh"> $$;</span></span></code></pre></div><h2 id="三、压缩性能与优化" tabindex="-1">三、压缩性能与优化 <a class="header-anchor" href="#三、压缩性能与优化" aria-label="Permalink to &quot;三、压缩性能与优化&quot;">​</a></h2><h3 id="_3-1-压缩性能监控" tabindex="-1">3.1 压缩性能监控 <a class="header-anchor" href="#_3-1-压缩性能监控" aria-label="Permalink to &quot;3.1 压缩性能监控&quot;">​</a></h3><h4 id="_3-1-1-压缩统计信息" tabindex="-1">3.1.1 压缩统计信息 <a class="header-anchor" href="#_3-1-1-压缩统计信息" aria-label="Permalink to &quot;3.1.1 压缩统计信息&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看压缩整体统计</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    hypertable_name,</span></span>
<span class="line"><span class="__shiki_140thh">    number_chunks,</span></span>
<span class="line"><span class="__shiki_140thh">    number_compressed_chunks,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(before_compression_total_bytes) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> before_size,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(after_compression_total_bytes) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> after_size,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROUND</span><span class="__shiki_140thh">((before_compression_total_bytes </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> after_compression_total_bytes)::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">          before_compression_total_bytes </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> compression_ratio_percent</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> hypertable_compression_stats(</span><span class="__shiki_mdbnqw">&#39;sensor_data&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 详细分块压缩统计</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    chunk_name,</span></span>
<span class="line"><span class="__shiki_140thh">    is_compressed,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(before_compression_table_bytes) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> table_before,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(after_compression_table_bytes) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> table_after,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(before_compression_index_bytes) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> index_before,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(after_compression_index_bytes) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> index_after,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROUND</span><span class="__shiki_140thh">((before_compression_total_bytes </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> after_compression_total_bytes)::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">          before_compression_total_bytes </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> ratio_percent,</span></span>
<span class="line"><span class="__shiki_140thh">    compression_status,</span></span>
<span class="line"><span class="__shiki_140thh">    last_modified</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> chunk_compression_stats(</span><span class="__shiki_mdbnqw">&#39;sensor_data&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> range_start </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_3-1-2-压缩性能分析" tabindex="-1">3.1.2 压缩性能分析 <a class="header-anchor" href="#_3-1-2-压缩性能分析" aria-label="Permalink to &quot;3.1.2 压缩性能分析&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 压缩操作性能监控</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    hypertable_name,</span></span>
<span class="line"><span class="__shiki_140thh">    job_id,</span></span>
<span class="line"><span class="__shiki_140thh">    last_run_status,</span></span>
<span class="line"><span class="__shiki_140thh">    last_run_duration,</span></span>
<span class="line"><span class="__shiki_140thh">    total_successes,</span></span>
<span class="line"><span class="__shiki_140thh">    total_failures,</span></span>
<span class="line"><span class="__shiki_140thh">    total_runs,</span></span>
<span class="line"><span class="__shiki_140thh">    last_run_started_at,</span></span>
<span class="line"><span class="__shiki_140thh">    next_start</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">job_stats</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> job_type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;压缩&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 压缩对查询性能的影响</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS, COSTS </span><span class="__shiki_1itgoe">OFF</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_dzsirb"> avg</span><span class="__shiki_140thh">(temperature)</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> sensor_data</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> BETWEEN</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_mdbnqw"> &#39;2024-01-31&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> sensor_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 123</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 对比压缩前后的查询计划</span></span></code></pre></div><h3 id="_3-2-压缩配置优化" tabindex="-1">3.2 压缩配置优化 <a class="header-anchor" href="#_3-2-压缩配置优化" aria-label="Permalink to &quot;3.2 压缩配置优化&quot;">​</a></h3><h4 id="_3-2-1-优化-segmentby-选择" tabindex="-1">3.2.1 优化 segmentby 选择 <a class="header-anchor" href="#_3-2-1-优化-segmentby-选择" aria-label="Permalink to &quot;3.2.1 优化 segmentby 选择&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 分析列的唯一值分布</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    column_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">DISTINCT</span><span class="__shiki_140thh"> column_name) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> distinct_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total_rows,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROUND</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">DISTINCT</span><span class="__shiki_140thh"> column_name)::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> selectivity_percent</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> sensor_id, location_id, device_type </span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> sensor_data </span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_1itgoe"> NOW</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;7 days&#39;</span></span>
<span class="line"><span class="__shiki_140thh">) t</span></span>
<span class="line"><span class="__shiki_1itgoe">CROSS JOIN</span><span class="__shiki_140thh"> LATERAL (</span></span>
<span class="line"><span class="__shiki_1itgoe">    VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;sensor_id&#39;</span><span class="__shiki_140thh">, sensor_id), </span></span>
<span class="line"><span class="__shiki_140thh">           (</span><span class="__shiki_mdbnqw">&#39;location_id&#39;</span><span class="__shiki_140thh">, location_id), </span></span>
<span class="line"><span class="__shiki_140thh">           (</span><span class="__shiki_mdbnqw">&#39;device_type&#39;</span><span class="__shiki_140thh">, device_type)</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> cols(column_name, </span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> column_name</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> distinct_count;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- segmentby 选择建议：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 基数适中的列（几百到几千个唯一值）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 经常用于WHERE过滤的列</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 值变化不频繁的列</span></span></code></pre></div><h4 id="_3-2-2-优化-orderby-配置" tabindex="-1">3.2.2 优化 orderby 配置 <a class="header-anchor" href="#_3-2-2-优化-orderby-配置" aria-label="Permalink to &quot;3.2.2 优化 orderby 配置&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 分析查询模式</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%ORDER BY time DESC%&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;descending&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%ORDER BY time ASC%&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;ascending&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_mdbnqw"> &#39;no_order&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> query_order,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> query_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">    AVG</span><span class="__shiki_140thh">(mean_time) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_execution_time</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_statements</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%sensor_data%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- orderby 建议：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 与主要查询ORDER BY一致</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 新数据查询多：time DESC</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 历史分析多：time ASC</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 多列排序：先时间，再其他维度</span></span></code></pre></div><h3 id="_3-3-压缩与查询优化" tabindex="-1">3.3 压缩与查询优化 <a class="header-anchor" href="#_3-3-压缩与查询优化" aria-label="Permalink to &quot;3.3 压缩与查询优化&quot;">​</a></h3><h4 id="_3-3-1-压缩感知查询" tabindex="-1">3.3.1 压缩感知查询 <a class="header-anchor" href="#_3-3-1-压缩感知查询" aria-label="Permalink to &quot;3.3.1 压缩感知查询&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- TimescaleDB自动优化压缩数据查询</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 以下查询会自动利用压缩特性</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 聚合查询（压缩数据列式存储更高效）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    time_bucket(</span><span class="__shiki_mdbnqw">&#39;1 hour&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">time</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> hour</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    sensor_id,</span></span>
<span class="line"><span class="__shiki_dzsirb">    AVG</span><span class="__shiki_140thh">(temperature) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_temp,</span></span>
<span class="line"><span class="__shiki_dzsirb">    MIN</span><span class="__shiki_140thh">(temperature) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> min_temp,</span></span>
<span class="line"><span class="__shiki_dzsirb">    MAX</span><span class="__shiki_140thh">(temperature) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> max_temp</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> sensor_data</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_1itgoe"> NOW</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;7 days&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_1itgoe"> hour</span><span class="__shiki_140thh">, sensor_id;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 过滤在segmentby列上的查询</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> sensor_data</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> sensor_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 123</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> BETWEEN</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_mdbnqw"> &#39;2024-01-31&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 仅查询部分列（列式存储优势）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">, temperature</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> sensor_data</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_1itgoe"> NOW</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;1 day&#39;</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_3-3-2-避免压缩陷阱" tabindex="-1">3.3.2 避免压缩陷阱 <a class="header-anchor" href="#_3-3-2-避免压缩陷阱" aria-label="Permalink to &quot;3.3.2 避免压缩陷阱&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 不推荐的查询模式（压缩数据上性能较差）</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 频繁更新压缩数据（需要先解压缩）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 避免：UPDATE sensor_data SET value = ... WHERE time &lt; ...</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 建议：数据一旦压缩，视为只读</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 随机访问大量压缩块</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 避免：SELECT * FROM sensor_data ORDER BY random() LIMIT 1000;</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 建议：添加时间范围过滤</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 查询所有列且数据高度压缩</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 压缩数据解压需要CPU开销，权衡存储vs计算</span></span></code></pre></div><h2 id="四、分层存储与归档策略" tabindex="-1">四、分层存储与归档策略 <a class="header-anchor" href="#四、分层存储与归档策略" aria-label="Permalink to &quot;四、分层存储与归档策略&quot;">​</a></h2><h3 id="_4-1-分层存储架构" tabindex="-1">4.1 分层存储架构 <a class="header-anchor" href="#_4-1-分层存储架构" aria-label="Permalink to &quot;4.1 分层存储架构&quot;">​</a></h3><h4 id="_4-1-1-存储层设计" tabindex="-1">4.1.1 存储层设计 <a class="header-anchor" href="#_4-1-1-存储层设计" aria-label="Permalink to &quot;4.1.1 存储层设计&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">存储层次结构：</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 热层 (Hot Tier)</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── 存储介质：NVMe SSD</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── 数据：0-7天</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── 状态：未压缩，频繁读写</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── 性能：低延迟，高IOPS</span></span>
<span class="line"><span class="__shiki_wvjl67">│</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 温层 (Warm Tier)</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── 存储介质：SATA SSD/快速HDD</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── 数据：7-90天</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── 状态：压缩，定期查询</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── 性能：中等延迟</span></span>
<span class="line"><span class="__shiki_wvjl67">│</span></span>
<span class="line"><span class="__shiki_wvjl67">└── 冷层 (Cold Tier)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── 存储介质：慢速HDD/对象存储</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── 数据：90天以上</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── 状态：高度压缩，很少查询</span></span>
<span class="line"><span class="__shiki_wvjl67">    └── 性能：高延迟，低成本</span></span></code></pre></div><h4 id="_4-1-2-表空间配置" tabindex="-1">4.1.2 表空间配置 <a class="header-anchor" href="#_4-1-2-表空间配置" aria-label="Permalink to &quot;4.1.2 表空间配置&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建不同存储层级的表空间</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLESPACE</span><span class="__shiki_1t8gfj"> hot_storage</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">LOCATION</span><span class="__shiki_mdbnqw"> &#39;/data/nvme/timescale/hot&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLESPACE</span><span class="__shiki_1t8gfj"> warm_storage</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">LOCATION</span><span class="__shiki_mdbnqw"> &#39;/data/ssd/timescale/warm&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLESPACE</span><span class="__shiki_1t8gfj"> cold_storage</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">LOCATION</span><span class="__shiki_mdbnqw"> &#39;/data/hdd/timescale/cold&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看表空间</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> spcname, pg_tablespace_location(</span><span class="__shiki_1itgoe">oid</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> location</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_tablespace</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> spcname </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%storage&#39;</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_4-2-数据迁移策略" tabindex="-1">4.2 数据迁移策略 <a class="header-anchor" href="#_4-2-数据迁移策略" aria-label="Permalink to &quot;4.2 数据迁移策略&quot;">​</a></h3><h4 id="_4-2-1-自动迁移配置" tabindex="-1">4.2.1 自动迁移配置 <a class="header-anchor" href="#_4-2-1-自动迁移配置" aria-label="Permalink to &quot;4.2.1 自动迁移配置&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建数据移动策略</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> tiered_storage_policy(job_id </span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">, config jsonb)</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    hot_cutoff INTERVAL :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;7 days&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    warm_cutoff INTERVAL :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;90 days&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    chunk_rec RECORD;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 将超过7天的数据移动到温层</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> chunk_rec </span><span class="__shiki_1itgoe">IN</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> show_chunks(</span><span class="__shiki_mdbnqw">&#39;sensor_data&#39;</span><span class="__shiki_140thh">, older_than </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> hot_cutoff) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> chunk_name</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 检查是否已经在温层或冷层</span></span>
<span class="line"><span class="__shiki_1itgoe">        IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            FROM</span><span class="__shiki_140thh"> pg_tablespace ts </span></span>
<span class="line"><span class="__shiki_1itgoe">            JOIN</span><span class="__shiki_140thh"> pg_class c </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">reltablespace</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> ts</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHERE</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relname</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> split_part(</span><span class="__shiki_dzsirb">chunk_rec</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunk_name</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;.&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">              AND</span><span class="__shiki_dzsirb"> ts</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">spcname</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;warm_storage&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;cold_storage&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        ) </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_140thh">            PERFORM move_chunk(</span></span>
<span class="line"><span class="__shiki_140thh">                chunk </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> chunk_rec</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunk_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                destination_tablespace </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;warm_storage&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                index_destination_tablespace </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;warm_storage&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            );</span></span>
<span class="line"><span class="__shiki_140thh">            RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;Moved chunk % to warm storage&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">chunk_rec</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunk_name</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 将超过90天的数据移动到冷层</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> chunk_rec </span><span class="__shiki_1itgoe">IN</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> show_chunks(</span><span class="__shiki_mdbnqw">&#39;sensor_data&#39;</span><span class="__shiki_140thh">, older_than </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> warm_cutoff) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> chunk_name</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_140thh">        PERFORM move_chunk(</span></span>
<span class="line"><span class="__shiki_140thh">            chunk </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> chunk_rec</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunk_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            destination_tablespace </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;cold_storage&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            index_destination_tablespace </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;cold_storage&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;Moved chunk % to cold storage&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">chunk_rec</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunk_name</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh"> $$;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 添加调度策略（每天执行）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> add_job(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;tiered_storage_policy&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    schedule_interval </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;1 day&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    initial_start </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_1itgoe"> NOW</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;5 minutes&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    config </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;{}&#39;</span><span class="__shiki_140thh">::jsonb</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h4 id="_4-2-2-智能数据分层" tabindex="-1">4.2.2 智能数据分层 <a class="header-anchor" href="#_4-2-2-智能数据分层" aria-label="Permalink to &quot;4.2.2 智能数据分层&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 基于访问模式的分层</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> access_pattern_based_tiering(job_id </span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">, config jsonb)</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    hot_access_cutoff INTERVAL :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;30 days&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    chunk_name </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    last_access </span><span class="__shiki_1itgoe">timestamp</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    total_scans </span><span class="__shiki_1itgoe">bigint</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> chunk_name </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relname</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_class c</span></span>
<span class="line"><span class="__shiki_1itgoe">        JOIN</span><span class="__shiki_140thh"> pg_stat_user_tables s </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relname</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relname</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relname</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;_hyper_%_chunk_%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 获取分块访问统计</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            last_scan, </span></span>
<span class="line"><span class="__shiki_140thh">            seq_scan </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> idx_scan</span></span>
<span class="line"><span class="__shiki_1itgoe">        INTO</span><span class="__shiki_140thh"> last_access, total_scans</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">                COALESCE</span><span class="__shiki_140thh">(last_seq_scan, last_idx_scan) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> last_scan,</span></span>
<span class="line"><span class="__shiki_140thh">                seq_scan,</span></span>
<span class="line"><span class="__shiki_140thh">                idx_scan</span></span>
<span class="line"><span class="__shiki_1itgoe">            FROM</span><span class="__shiki_140thh"> pg_stat_user_tables</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHERE</span><span class="__shiki_140thh"> relname </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> chunk_name</span></span>
<span class="line"><span class="__shiki_140thh">        ) </span><span class="__shiki_1itgoe">stats</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 决策逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">        IF</span><span class="__shiki_140thh"> last_access </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_1itgoe"> NULL</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">           last_access </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_1itgoe"> NOW</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;90 days&#39;</span><span class="__shiki_1itgoe"> OR</span></span>
<span class="line"><span class="__shiki_140thh">           total_scans </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 移动到冷存储</span></span>
<span class="line"><span class="__shiki_140thh">            PERFORM move_chunk(</span></span>
<span class="line"><span class="__shiki_dzsirb">                format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;_timescaledb_internal.%I&#39;</span><span class="__shiki_140thh">, chunk_name),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;cold_storage&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;cold_storage&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            );</span></span>
<span class="line"><span class="__shiki_140thh">        ELSIF last_access </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_1itgoe"> NOW</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> hot_access_cutoff </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 移动到温存储</span></span>
<span class="line"><span class="__shiki_140thh">            PERFORM move_chunk(</span></span>
<span class="line"><span class="__shiki_dzsirb">                format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;_timescaledb_internal.%I&#39;</span><span class="__shiki_140thh">, chunk_name),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;warm_storage&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;warm_storage&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            );</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh"> $$;</span></span></code></pre></div><h3 id="_4-3-归档与数据保留" tabindex="-1">4.3 归档与数据保留 <a class="header-anchor" href="#_4-3-归档与数据保留" aria-label="Permalink to &quot;4.3 归档与数据保留&quot;">​</a></h3><h4 id="_4-3-1-数据保留策略" tabindex="-1">4.3.1 数据保留策略 <a class="header-anchor" href="#_4-3-1-数据保留策略" aria-label="Permalink to &quot;4.3.1 数据保留策略&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 基本保留策略</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> add_retention_policy(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;sensor_data&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    drop_after </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;365 days&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    if_not_exists </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> true</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 分层保留策略</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> tiered_retention_policy(job_id </span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">, config jsonb)</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 删除冷层中超过2年的数据</span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM drop_chunks(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;sensor_data&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        older_than </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;2 years&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        newer_than </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;1 year&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 删除温层中超过1年的数据（移动到冷层后）</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 注意：需要确保数据已移动到冷层</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh"> $$;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看保留策略</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    hypertable_name,</span></span>
<span class="line"><span class="__shiki_140thh">    drop_after,</span></span>
<span class="line"><span class="__shiki_140thh">    schedule_interval,</span></span>
<span class="line"><span class="__shiki_140thh">    last_run_started_at,</span></span>
<span class="line"><span class="__shiki_140thh">    total_runs,</span></span>
<span class="line"><span class="__shiki_140thh">    total_dropped_chunks</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">retention_settings</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_4-3-2-归档到外部存储" tabindex="-1">4.3.2 归档到外部存储 <a class="header-anchor" href="#_4-3-2-归档到外部存储" aria-label="Permalink to &quot;4.3.2 归档到外部存储&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 创建外部表（用于归档）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> EXTENSION </span><span class="__shiki_1itgoe">IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> postgres_fdw;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 创建归档服务器</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> archive_server</span></span>
<span class="line"><span class="__shiki_140thh">FOREIGN </span><span class="__shiki_1itgoe">DATA</span><span class="__shiki_140thh"> WRAPPER postgres_fdw</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (host </span><span class="__shiki_mdbnqw">&#39;archive-host&#39;</span><span class="__shiki_140thh">, dbname </span><span class="__shiki_mdbnqw">&#39;archive_db&#39;</span><span class="__shiki_140thh">, port </span><span class="__shiki_mdbnqw">&#39;5432&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 创建用户映射</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> USER</span><span class="__shiki_1t8gfj"> MAPPING</span><span class="__shiki_1itgoe"> FOR</span><span class="__shiki_140thh"> CURRENT_USER</span></span>
<span class="line"><span class="__shiki_1itgoe">SERVER</span><span class="__shiki_140thh"> archive_server</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (user </span><span class="__shiki_mdbnqw">&#39;archive_user&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">password</span><span class="__shiki_mdbnqw"> &#39;secret&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 创建外部表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> FOREIGN </span><span class="__shiki_1itgoe">TABLE</span><span class="__shiki_140thh"> sensor_data_archive (</span></span>
<span class="line"><span class="__shiki_1itgoe">    time</span><span class="__shiki_1itgoe"> TIMESTAMPTZ</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    sensor_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    value</span><span class="__shiki_1itgoe"> DOUBLE PRECISION</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">SERVER</span><span class="__shiki_140thh"> archive_server</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (table_name </span><span class="__shiki_mdbnqw">&#39;sensor_data_archive&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 归档过程</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> archive_old_data()</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    chunk_name </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    archive_start </span><span class="__shiki_1itgoe">timestamp</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    archive_end </span><span class="__shiki_1itgoe">timestamp</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 归档90天前的数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> chunk_name </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> show_chunks(</span><span class="__shiki_mdbnqw">&#39;sensor_data&#39;</span><span class="__shiki_140thh">, older_than </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;90 days&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 获取分块时间范围</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> range_start, range_end </span></span>
<span class="line"><span class="__shiki_1itgoe">        INTO</span><span class="__shiki_140thh"> archive_start, archive_end</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunks</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> chunk_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> chunk_name;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 复制数据到归档</span></span>
<span class="line"><span class="__shiki_1itgoe">        INSERT INTO</span><span class="__shiki_140thh"> sensor_data_archive</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_140thh">, sensor_id, </span><span class="__shiki_1itgoe">value</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> sensor_data</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> &gt;=</span><span class="__shiki_140thh"> archive_start </span><span class="__shiki_1itgoe">AND</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_140thh"> archive_end;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 验证数据完整性</span></span>
<span class="line"><span class="__shiki_1itgoe">        IF</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> sensor_data_archive </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHERE</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> &gt;=</span><span class="__shiki_140thh"> archive_start </span><span class="__shiki_1itgoe">AND</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_140thh"> archive_end</span></span>
<span class="line"><span class="__shiki_1itgoe">            EXCEPT</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> sensor_data</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHERE</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> &gt;=</span><span class="__shiki_140thh"> archive_start </span><span class="__shiki_1itgoe">AND</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_140thh"> archive_end</span></span>
<span class="line"><span class="__shiki_140thh">        ) </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_140thh">            RAISE EXCEPTION </span><span class="__shiki_mdbnqw">&#39;Data integrity check failed for chunk %&#39;</span><span class="__shiki_140thh">, chunk_name;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 删除原数据</span></span>
<span class="line"><span class="__shiki_140thh">        PERFORM drop_chunks(</span><span class="__shiki_mdbnqw">&#39;sensor_data&#39;</span><span class="__shiki_140thh">, older_than </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> archive_end);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;Archived chunk % (%, %)&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">            chunk_name, archive_start, archive_end;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh"> $$;</span></span></code></pre></div><h2 id="五、压缩与归档监控" tabindex="-1">五、压缩与归档监控 <a class="header-anchor" href="#五、压缩与归档监控" aria-label="Permalink to &quot;五、压缩与归档监控&quot;">​</a></h2><h3 id="_5-1-综合监控仪表板" tabindex="-1">5.1 综合监控仪表板 <a class="header-anchor" href="#_5-1-综合监控仪表板" aria-label="Permalink to &quot;5.1 综合监控仪表板&quot;">​</a></h3><h4 id="_5-1-1-存储使用监控" tabindex="-1">5.1.1 存储使用监控 <a class="header-anchor" href="#_5-1-1-存储使用监控" aria-label="Permalink to &quot;5.1.1 存储使用监控&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 存储使用概览</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> storage_stats </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;hot&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> tier,</span></span>
<span class="line"><span class="__shiki_dzsirb">        SUM</span><span class="__shiki_140thh">(pg_total_relation_size(</span><span class="__shiki_dzsirb">c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> size_bytes,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> chunk_count</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_class c</span></span>
<span class="line"><span class="__shiki_1itgoe">    JOIN</span><span class="__shiki_140thh"> pg_tablespace t </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">reltablespace</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> t</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_dzsirb"> t</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">spcname</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;hot_storage&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relname</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%_chunk_%&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    UNION ALL</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;warm&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> tier,</span></span>
<span class="line"><span class="__shiki_dzsirb">        SUM</span><span class="__shiki_140thh">(pg_total_relation_size(</span><span class="__shiki_dzsirb">c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> size_bytes,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> chunk_count</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_class c</span></span>
<span class="line"><span class="__shiki_1itgoe">    JOIN</span><span class="__shiki_140thh"> pg_tablespace t </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">reltablespace</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> t</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_dzsirb"> t</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">spcname</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;warm_storage&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relname</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%_chunk_%&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    UNION ALL</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;cold&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> tier,</span></span>
<span class="line"><span class="__shiki_dzsirb">        SUM</span><span class="__shiki_140thh">(pg_total_relation_size(</span><span class="__shiki_dzsirb">c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> size_bytes,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> chunk_count</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_class c</span></span>
<span class="line"><span class="__shiki_1itgoe">    JOIN</span><span class="__shiki_140thh"> pg_tablespace t </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">reltablespace</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> t</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_dzsirb"> t</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">spcname</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;cold_storage&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relname</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%_chunk_%&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    tier,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(size_bytes) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total_size,</span></span>
<span class="line"><span class="__shiki_140thh">    chunk_count,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(size_bytes </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> NULLIF</span><span class="__shiki_140thh">(chunk_count, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_chunk_size,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROUND</span><span class="__shiki_140thh">(size_bytes </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> SUM</span><span class="__shiki_140thh">(size_bytes) </span><span class="__shiki_1itgoe">OVER</span><span class="__shiki_140thh"> (), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> percent_total</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> storage_stats</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> tier </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;hot&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;warm&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_5-1-2-压缩效率监控" tabindex="-1">5.1.2 压缩效率监控 <a class="header-anchor" href="#_5-1-2-压缩效率监控" aria-label="Permalink to &quot;5.1.2 压缩效率监控&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 压缩效率趋势分析</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    DATE_TRUNC(</span><span class="__shiki_mdbnqw">&#39;day&#39;</span><span class="__shiki_140thh">, compression_time) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> day</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> chunks_compressed,</span></span>
<span class="line"><span class="__shiki_dzsirb">    AVG</span><span class="__shiki_140thh">(compression_ratio) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_ratio,</span></span>
<span class="line"><span class="__shiki_dzsirb">    MIN</span><span class="__shiki_140thh">(compression_ratio) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> min_ratio,</span></span>
<span class="line"><span class="__shiki_dzsirb">    MAX</span><span class="__shiki_140thh">(compression_ratio) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> max_ratio,</span></span>
<span class="line"><span class="__shiki_dzsirb">    SUM</span><span class="__shiki_140thh">(before_size_bytes) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total_before_bytes,</span></span>
<span class="line"><span class="__shiki_dzsirb">    SUM</span><span class="__shiki_140thh">(after_size_bytes) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total_after_bytes,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(</span><span class="__shiki_dzsirb">SUM</span><span class="__shiki_140thh">(before_size_bytes </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> after_size_bytes)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> space_saved</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunk_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_dzsirb">c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">before_compression_total_bytes</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">after_compression_total_bytes</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">float</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        NULLIF</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">before_compression_total_bytes</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> compression_ratio,</span></span>
<span class="line"><span class="__shiki_dzsirb">        c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">before_compression_total_bytes</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> before_size_bytes,</span></span>
<span class="line"><span class="__shiki_dzsirb">        c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">after_compression_total_bytes</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> after_size_bytes,</span></span>
<span class="line"><span class="__shiki_dzsirb">        ch</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">created</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> compression_time</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> chunk_compression_stats(</span><span class="__shiki_mdbnqw">&#39;sensor_data&#39;</span><span class="__shiki_140thh">) c</span></span>
<span class="line"><span class="__shiki_1itgoe">    JOIN</span><span class="__shiki_dzsirb"> _timescaledb_catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunk</span><span class="__shiki_140thh"> ch </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunk_name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> ch</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">table_name</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">is_compressed</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> true</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_dzsirb"> ch</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">created</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_1itgoe"> NOW</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;30 days&#39;</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">stats</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> DATE_TRUNC(</span><span class="__shiki_mdbnqw">&#39;day&#39;</span><span class="__shiki_140thh">, compression_time)</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_1itgoe"> day</span><span class="__shiki_1itgoe"> DESC</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_5-2-性能影响分析" tabindex="-1">5.2 性能影响分析 <a class="header-anchor" href="#_5-2-性能影响分析" aria-label="Permalink to &quot;5.2 性能影响分析&quot;">​</a></h3><h4 id="_5-2-1-查询性能对比" tabindex="-1">5.2.1 查询性能对比 <a class="header-anchor" href="#_5-2-1-查询性能对比" aria-label="Permalink to &quot;5.2.1 查询性能对比&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 压缩 vs 非压缩查询性能对比</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> query_performance_log (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    query_type </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    is_compressed </span><span class="__shiki_1itgoe">BOOLEAN</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    execution_time_ms </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    rows_returned </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    query_text </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    executed_at </span><span class="__shiki_1itgoe">TIMESTAMPTZ</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> NOW</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 自动收集查询性能</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> log_query_performance</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> event_trigger</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    r RECORD;</span></span>
<span class="line"><span class="__shiki_140thh">    query_text </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    start_time </span><span class="__shiki_1itgoe">timestamptz</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    end_time </span><span class="__shiki_1itgoe">timestamptz</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    rows_affected </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> r </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_1itgoe"> SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_event_trigger_ddl_commands()</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 这里可以添加逻辑来捕获查询</span></span>
<span class="line"><span class="__shiki_1itgoe">        NULL</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh"> $$;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 手动分析查询性能</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> compressed_stats </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        AVG</span><span class="__shiki_140thh">(total_time) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_compressed_time,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> compressed_queries</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_stat_statements</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%sensor_data%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%compressed_chunk%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_140thh"> calls </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">uncompressed_stats </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        AVG</span><span class="__shiki_140thh">(total_time) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_uncompressed_time,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> uncompressed_queries</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_stat_statements</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%sensor_data%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">NOT</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%compressed_chunk%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_140thh"> calls </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;压缩查询&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> query_type,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROUND</span><span class="__shiki_140thh">(avg_compressed_time, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_execution_ms,</span></span>
<span class="line"><span class="__shiki_140thh">    compressed_queries</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> compressed_stats</span></span>
<span class="line"><span class="__shiki_1itgoe">UNION ALL</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;非压缩查询&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROUND</span><span class="__shiki_140thh">(avg_uncompressed_time, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    uncompressed_queries</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> uncompressed_stats;</span></span></code></pre></div><h4 id="_5-2-2-系统资源监控" tabindex="-1">5.2.2 系统资源监控 <a class="header-anchor" href="#_5-2-2-系统资源监控" aria-label="Permalink to &quot;5.2.2 系统资源监控&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 压缩操作资源消耗</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;压缩&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> operation_type,</span></span>
<span class="line"><span class="__shiki_dzsirb">    SUM</span><span class="__shiki_140thh">(temp_files) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> temp_files_created,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(</span><span class="__shiki_dzsirb">SUM</span><span class="__shiki_140thh">(temp_bytes)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> temp_space_used,</span></span>
<span class="line"><span class="__shiki_dzsirb">    AVG</span><span class="__shiki_140thh">(blk_read_time </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> blk_write_time) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_io_time_ms</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_statements</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%compress_chunk%&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">UNION ALL</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;解压缩&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    SUM</span><span class="__shiki_140thh">(temp_files),</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(</span><span class="__shiki_dzsirb">SUM</span><span class="__shiki_140thh">(temp_bytes)),</span></span>
<span class="line"><span class="__shiki_dzsirb">    AVG</span><span class="__shiki_140thh">(blk_read_time </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> blk_write_time)</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_statements</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%decompress_chunk%&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 压缩对缓存的影响</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relname</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> chunk_name,</span></span>
<span class="line"><span class="__shiki_140thh">    heap_blks_hit </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> buffer_hits,</span></span>
<span class="line"><span class="__shiki_140thh">    heap_blks_read </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> disk_reads,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> heap_blks_hit </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> heap_blks_read </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        THEN</span><span class="__shiki_dzsirb"> ROUND</span><span class="__shiki_140thh">(heap_blks_hit </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> (heap_blks_hit </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> heap_blks_read), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> hit_rate_percent</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_statio_user_tables s</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> pg_class c </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relname</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%_chunk_%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> hit_rate_percent </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span></code></pre></div><h2 id="六、最佳实践与案例分析" tabindex="-1">六、最佳实践与案例分析 <a class="header-anchor" href="#六、最佳实践与案例分析" aria-label="Permalink to &quot;六、最佳实践与案例分析&quot;">​</a></h2><h3 id="_6-1-最佳实践总结" tabindex="-1">6.1 最佳实践总结 <a class="header-anchor" href="#_6-1-最佳实践总结" aria-label="Permalink to &quot;6.1 最佳实践总结&quot;">​</a></h3><h4 id="_6-1-1-压缩配置最佳实践" tabindex="-1">6.1.1 压缩配置最佳实践 <a class="header-anchor" href="#_6-1-1-压缩配置最佳实践" aria-label="Permalink to &quot;6.1.1 压缩配置最佳实践&quot;">​</a></h4><p><strong>segmentby 选择矩阵：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">列特性                  | 推荐操作</span></span>
<span class="line"><span class="__shiki_wvjl67">───────────────────────┼────────────────────────</span></span>
<span class="line"><span class="__shiki_wvjl67">基数低 (&lt;100)          | 作为segmentby</span></span>
<span class="line"><span class="__shiki_wvjl67">基数中等 (100-10k)     | 理想的segmentby候选</span></span>
<span class="line"><span class="__shiki_wvjl67">基数高 (&gt;10k)          | 不作为segmentby</span></span>
<span class="line"><span class="__shiki_wvjl67">频繁用于WHERE过滤      | 优先作为segmentby</span></span>
<span class="line"><span class="__shiki_wvjl67">很少用于过滤           | 不作为segmentby</span></span></code></pre></div><p><strong>压缩时间线策略：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">时间线                | 操作</span></span>
<span class="line"><span class="__shiki_wvjl67">─────────────────────┼────────────────────────</span></span>
<span class="line"><span class="__shiki_wvjl67">数据写入时            | 不压缩（保持性能）</span></span>
<span class="line"><span class="__shiki_wvjl67">写入后1-7天          | 评估压缩配置</span></span>
<span class="line"><span class="__shiki_wvjl67">7-30天              | 启用压缩，segmentby优化</span></span>
<span class="line"><span class="__shiki_wvjl67">30-90天             | 移动到温存储，保持压缩</span></span>
<span class="line"><span class="__shiki_wvjl67">90天以上             | 移动到冷存储，高压缩比</span></span>
<span class="line"><span class="__shiki_wvjl67">1年以上              | 归档或删除</span></span></code></pre></div><h4 id="_6-1-2-分层存储策略示例" tabindex="-1">6.1.2 分层存储策略示例 <a class="header-anchor" href="#_6-1-2-分层存储策略示例" aria-label="Permalink to &quot;6.1.2 分层存储策略示例&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 完整的分层存储策略配置</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 初始配置（创建表时）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> telemetry_data</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    device_id </span><span class="__shiki_1itgoe">INT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    metric_time </span><span class="__shiki_1itgoe">TIMESTAMPTZ</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    metric_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    metric_value </span><span class="__shiki_1itgoe">DOUBLE PRECISION</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    tags JSONB </span><span class="__shiki_1itgoe">DEFAULT</span><span class="__shiki_mdbnqw"> &#39;{}&#39;</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">    timescaledb</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">compress</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    timescaledb</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">compress_segmentby</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;device_id, metric_name&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    timescaledb</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">compress_orderby</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;metric_time DESC&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> create_hypertable(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;telemetry_data&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;metric_time&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    chunk_time_interval </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;1 day&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 压缩策略（1天后压缩）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> add_compression_policy(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;telemetry_data&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    compress_after </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;1 day&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 分层存储策略</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> add_job(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;move_to_warm_storage&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    schedule_interval </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;1 day&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    config </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;{&quot;age_days&quot;: 7, &quot;target_tier&quot;: &quot;warm&quot;}&#39;</span><span class="__shiki_140thh">::jsonb</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> add_job(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;move_to_cold_storage&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    schedule_interval </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;1 day&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    config </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;{&quot;age_days&quot;: 30, &quot;target_tier&quot;: &quot;cold&quot;}&#39;</span><span class="__shiki_140thh">::jsonb</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 保留策略（1年后删除）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> add_retention_policy(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;telemetry_data&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    drop_after </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;365 days&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_6-2-典型案例分析" tabindex="-1">6.2 典型案例分析 <a class="header-anchor" href="#_6-2-典型案例分析" aria-label="Permalink to &quot;6.2 典型案例分析&quot;">​</a></h3><h4 id="_6-2-1-iot设备监控案例" tabindex="-1">6.2.1 IoT设备监控案例 <a class="header-anchor" href="#_6-2-1-iot设备监控案例" aria-label="Permalink to &quot;6.2.1 IoT设备监控案例&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 场景：10万设备，每秒1000个数据点</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 目标：存储1年数据，保证最近7天查询性能</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 配置方案：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 热数据（0-7天）：不压缩，NVMe存储</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 温数据（7-30天）：压缩，SSD存储</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 冷数据（30-365天）：高压缩，HDD存储</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 实施步骤：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建表空间</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLESPACE</span><span class="__shiki_1t8gfj"> iot_hot</span><span class="__shiki_1itgoe"> LOCATION</span><span class="__shiki_mdbnqw"> &#39;/nvme/iot/hot&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLESPACE</span><span class="__shiki_1t8gfj"> iot_warm</span><span class="__shiki_1itgoe"> LOCATION</span><span class="__shiki_mdbnqw"> &#39;/ssd/iot/warm&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLESPACE</span><span class="__shiki_1t8gfj"> iot_cold</span><span class="__shiki_1itgoe"> LOCATION</span><span class="__shiki_mdbnqw"> &#39;/hdd/iot/cold&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 配置默认表空间</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> iot_metrics </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> TABLESPACE iot_hot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 智能压缩策略</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> iot_compression_policy()</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 7-30天：标准压缩</span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM compress_chunks(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;iot_metrics&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        older_than </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;7 days&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        newer_than </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;30 days&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 30天以上：高压缩（调整参数）</span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM compress_chunks(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;iot_metrics&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        older_than </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;30 days&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 移动压缩数据到合适层</span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM tiered_storage_migration();</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh"> $$;</span></span></code></pre></div><h4 id="_6-2-2-金融交易数据案例" tabindex="-1">6.2.2 金融交易数据案例 <a class="header-anchor" href="#_6-2-2-金融交易数据案例" aria-label="Permalink to &quot;6.2.2 金融交易数据案例&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 场景：高频交易，监管要求保存7年</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 挑战：数据量大，合规查询需求</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 策略：分层存储 + 外部归档</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 在线层：最近3个月，快速查询</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 近线层：3个月-2年，标准压缩</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 归档层：2-7年，外部存储</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 归档过程优化</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> financial_archive()</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    archive_cutoff </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> NOW</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;2 years&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    chunk RECORD;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 批次处理，避免长事务</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> chunk </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> chunk_name, range_end</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunks</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> hypertable_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;trades&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">          AND</span><span class="__shiki_140thh"> range_end </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> archive_cutoff</span></span>
<span class="line"><span class="__shiki_1itgoe">        ORDER BY</span><span class="__shiki_140thh"> range_end</span></span>
<span class="line"><span class="__shiki_1itgoe">        LIMIT</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_21nrsd">  -- 每次处理10个分块</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 1. 导出到外部存储</span></span>
<span class="line"><span class="__shiki_140thh">        PERFORM export_to_s3(</span><span class="__shiki_dzsirb">chunk</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunk_name</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 2. 验证导出完整性</span></span>
<span class="line"><span class="__shiki_1itgoe">        IF</span><span class="__shiki_140thh"> verify_export(</span><span class="__shiki_dzsirb">chunk</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunk_name</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 3. 从数据库中删除</span></span>
<span class="line"><span class="__shiki_140thh">            PERFORM drop_chunks(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;trades&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                older_than </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> chunk</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">range_end</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                newer_than </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> chunk</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">range_end</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;1 day&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            );</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 4. 记录归档元数据</span></span>
<span class="line"><span class="__shiki_1itgoe">            INSERT INTO</span><span class="__shiki_140thh"> archive_metadata </span></span>
<span class="line"><span class="__shiki_1itgoe">            VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">chunk</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunk_name</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">chunk</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">range_end</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">NOW</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span></span>
<span class="line"><span class="__shiki_140thh">            RAISE WARNING </span><span class="__shiki_mdbnqw">&#39;Export verification failed for %&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">chunk</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunk_name</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh"> $$;</span></span></code></pre></div><h2 id="七、故障排除与维护" tabindex="-1">七、故障排除与维护 <a class="header-anchor" href="#七、故障排除与维护" aria-label="Permalink to &quot;七、故障排除与维护&quot;">​</a></h2><h3 id="_7-1-常见问题解决" tabindex="-1">7.1 常见问题解决 <a class="header-anchor" href="#_7-1-常见问题解决" aria-label="Permalink to &quot;7.1 常见问题解决&quot;">​</a></h3><h4 id="_7-1-1-压缩失败处理" tabindex="-1">7.1.1 压缩失败处理 <a class="header-anchor" href="#_7-1-1-压缩失败处理" aria-label="Permalink to &quot;7.1.1 压缩失败处理&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 诊断压缩失败原因</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    chunk_name,</span></span>
<span class="line"><span class="__shiki_140thh">    compression_status,</span></span>
<span class="line"><span class="__shiki_140thh">    last_modified,</span></span>
<span class="line"><span class="__shiki_140thh">    error_message</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> chunk_compression_stats(</span><span class="__shiki_mdbnqw">&#39;sensor_data&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> compression_status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;failed&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 常见原因及解决：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 磁盘空间不足</span></span>
<span class="line"><span class="__shiki_21nrsd">--    解决：清理空间或增加存储</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> pg_size_pretty(pg_database_size(current_database()));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 锁冲突</span></span>
<span class="line"><span class="__shiki_21nrsd">--    解决：等待或强制取消阻塞会话</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    pid, </span></span>
<span class="line"><span class="__shiki_140thh">    usename, </span></span>
<span class="line"><span class="__shiki_140thh">    query, </span></span>
<span class="line"><span class="__shiki_1itgoe">    state</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    age(clock_timestamp(), query_start) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> query_age</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_activity</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%compress%&#39;</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%decompress%&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 内存不足</span></span>
<span class="line"><span class="__shiki_21nrsd">--    解决：调整work_mem或分批次压缩</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> work_mem </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;256MB&#39;</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_7-1-2-解压缩需求场景" tabindex="-1">7.1.2 解压缩需求场景 <a class="header-anchor" href="#_7-1-2-解压缩需求场景" aria-label="Permalink to &quot;7.1.2 解压缩需求场景&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 需要解压缩的场景：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 批量更新历史数据</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 解压缩相关分块</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> decompress_chunks(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;sensor_data&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    older_than </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    newer_than </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;2024-02-01&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 执行更新</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> sensor_data </span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> calibrated_value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> raw_value </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">02</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> BETWEEN</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_mdbnqw"> &#39;2024-02-01&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 重新压缩</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> compress_chunks(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;sensor_data&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    older_than </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    newer_than </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;2024-02-01&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">COMMIT</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 性能测试对比</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建解压缩副本进行A/B测试</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> sensor_data_uncompressed</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> sensor_data </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> time</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_1itgoe"> NOW</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;7 days&#39;</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_7-2-维护脚本库" tabindex="-1">7.2 维护脚本库 <a class="header-anchor" href="#_7-2-维护脚本库" aria-label="Permalink to &quot;7.2 维护脚本库&quot;">​</a></h3><h4 id="_7-2-1-定期维护脚本" tabindex="-1">7.2.1 定期维护脚本 <a class="header-anchor" href="#_7-2-1-定期维护脚本" aria-label="Permalink to &quot;7.2.1 定期维护脚本&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 每周维护任务</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> weekly_maintenance()</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 1. 更新统计信息</span></span>
<span class="line"><span class="__shiki_140thh">    ANALYZE sensor_data;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 2. 检查压缩状态</span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM validate_compression_integrity();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 3. 清理旧备份</span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM cleanup_old_backups();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 4. 检查存储使用</span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM check_storage_usage();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 5. 优化索引</span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM reindex_stale_indexes();</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh"> $$;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 验证压缩完整性</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> validate_compression_integrity()</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    chunk RECORD;</span></span>
<span class="line"><span class="__shiki_140thh">    original_count </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    compressed_count </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> chunk </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> chunk_name, hypertable_name</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunks</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> is_compressed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 比较行数（需要解压缩比较）</span></span>
<span class="line"><span class="__shiki_1itgoe">        EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            SELECT COUNT(*) FROM %I</span></span>
<span class="line"><span class="__shiki_mdbnqw">            WHERE time &gt;= $1 AND time &lt; $2&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            chunk</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunk_name</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        INTO</span><span class="__shiki_140thh"> compressed_count</span></span>
<span class="line"><span class="__shiki_1itgoe">        USING</span><span class="__shiki_dzsirb"> chunk</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">range_start</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">chunk</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">range_end</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 记录差异</span></span>
<span class="line"><span class="__shiki_1itgoe">        IF</span><span class="__shiki_140thh"> original_count </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> compressed_count </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_1itgoe">            INSERT INTO</span><span class="__shiki_140thh"> compression_audit_log</span></span>
<span class="line"><span class="__shiki_1itgoe">            VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">chunk</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunk_name</span><span class="__shiki_140thh">, original_count, compressed_count, </span><span class="__shiki_1itgoe">NOW</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh"> $$;</span></span></code></pre></div><h4 id="_7-2-2-监控告警配置" tabindex="-1">7.2.2 监控告警配置 <a class="header-anchor" href="#_7-2-2-监控告警配置" aria-label="Permalink to &quot;7.2.2 监控告警配置&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 压缩异常告警</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> check_compression_health</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    alert_level </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    alert_message </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    metric_value </span><span class="__shiki_1itgoe">NUMERIC</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查压缩率异常</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;WARNING&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;Low compression ratio detected&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        compression_ratio</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">            AVG</span><span class="__shiki_140thh">((before_compression_total_bytes </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> after_compression_total_bytes)::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                before_compression_total_bytes) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> compression_ratio</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> chunk_compression_stats(</span><span class="__shiki_mdbnqw">&#39;sensor_data&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> is_compressed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">stats</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> compression_ratio </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 低于30%压缩率</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查压缩失败</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;CRITICAL&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;Compression failures detected&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">NUMERIC</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> chunk_compression_stats(</span><span class="__shiki_mdbnqw">&#39;sensor_data&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> compression_status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;failed&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    GROUP BY</span><span class="__shiki_140thh"> compression_status</span></span>
<span class="line"><span class="__shiki_1itgoe">    HAVING</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查存储空间</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;CRITICAL&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;Storage space running low&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_dzsirb"> ROUND</span><span class="__shiki_140thh">(used_bytes </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> total_bytes, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">         FROM</span><span class="__shiki_140thh"> get_disk_usage(</span><span class="__shiki_mdbnqw">&#39;/data&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_dzsirb"> ROUND</span><span class="__shiki_140thh">(used_bytes </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> total_bytes, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">           FROM</span><span class="__shiki_140thh"> get_disk_usage(</span><span class="__shiki_mdbnqw">&#39;/data&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 90</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh"> $$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span></code></pre></div><h2 id="八、未来趋势与高级特性" tabindex="-1">八、未来趋势与高级特性 <a class="header-anchor" href="#八、未来趋势与高级特性" aria-label="Permalink to &quot;八、未来趋势与高级特性&quot;">​</a></h2><h3 id="_8-1-多级压缩算法" tabindex="-1">8.1 多级压缩算法 <a class="header-anchor" href="#_8-1-多级压缩算法" aria-label="Permalink to &quot;8.1 多级压缩算法&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- TimescaleDB未来可能支持的多级压缩</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 轻量级压缩（实时数据）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 中度压缩（温数据）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 重度压缩（冷数据）</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 模拟多级压缩策略</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> multi_level_compression()</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- Level 1: 快速压缩（7-30天）</span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM set_compression_algorithm(</span><span class="__shiki_mdbnqw">&#39;zstd&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);  </span><span class="__shiki_21nrsd">-- 快速模式</span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM compress_chunks(</span><span class="__shiki_mdbnqw">&#39;sensor_data&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">        older_than </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;7 days&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        newer_than </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;30 days&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- Level 2: 平衡压缩（30-90天）</span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM set_compression_algorithm(</span><span class="__shiki_mdbnqw">&#39;zstd&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">);  </span><span class="__shiki_21nrsd">-- 平衡模式</span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM compress_chunks(</span><span class="__shiki_mdbnqw">&#39;sensor_data&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">        older_than </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;30 days&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        newer_than </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;90 days&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- Level 3: 高压缩比（90天以上）</span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM set_compression_algorithm(</span><span class="__shiki_mdbnqw">&#39;zstd&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">9</span><span class="__shiki_140thh">);  </span><span class="__shiki_21nrsd">-- 高压缩比模式</span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM compress_chunks(</span><span class="__shiki_mdbnqw">&#39;sensor_data&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">        older_than </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;90 days&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh"> $$;</span></span></code></pre></div><h3 id="_8-2-ai驱动的压缩策略" tabindex="-1">8.2 AI驱动的压缩策略 <a class="header-anchor" href="#_8-2-ai驱动的压缩策略" aria-label="Permalink to &quot;8.2 AI驱动的压缩策略&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 基于机器学习优化压缩参数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> ai_optimized_compression()</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    optimal_segmentby </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">[];</span></span>
<span class="line"><span class="__shiki_140thh">    optimal_orderby </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">[];</span></span>
<span class="line"><span class="__shiki_140thh">    predicted_ratio </span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 分析数据特征</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        ARRAY_AGG(column_name),</span></span>
<span class="line"><span class="__shiki_140thh">        ARRAY_AGG(order_column)</span></span>
<span class="line"><span class="__shiki_1itgoe">    INTO</span><span class="__shiki_140thh"> optimal_segmentby, optimal_orderby</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> predict_optimal_compression_params(</span><span class="__shiki_mdbnqw">&#39;sensor_data&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 应用优化配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_140thh"> optimal_segmentby </span><span class="__shiki_1itgoe">IS NOT NULL</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_1itgoe">        EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            ALTER TABLE sensor_data SET (</span></span>
<span class="line"><span class="__shiki_mdbnqw">                timescaledb.compress_segmentby = %L,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                timescaledb.compress_orderby = %L</span></span>
<span class="line"><span class="__shiki_mdbnqw">            )&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">            array_to_string(optimal_segmentby, </span><span class="__shiki_mdbnqw">&#39;,&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            array_to_string(optimal_orderby, </span><span class="__shiki_mdbnqw">&#39;,&#39;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 预测压缩率并决策</span></span>
<span class="line"><span class="__shiki_140thh">    predicted_ratio :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> predict_compression_ratio(</span><span class="__shiki_mdbnqw">&#39;sensor_data&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_140thh"> predicted_ratio </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">4</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_21nrsd">  -- 预期压缩率超过40%</span></span>
<span class="line"><span class="__shiki_140thh">        PERFORM compress_chunks(</span><span class="__shiki_mdbnqw">&#39;sensor_data&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            older_than </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;3 days&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh"> $$;</span></span></code></pre></div><h2 id="九、总结与最佳实践清单" tabindex="-1">九、总结与最佳实践清单 <a class="header-anchor" href="#九、总结与最佳实践清单" aria-label="Permalink to &quot;九、总结与最佳实践清单&quot;">​</a></h2><h3 id="_9-1-压缩策略总结" tabindex="-1">9.1 压缩策略总结 <a class="header-anchor" href="#_9-1-压缩策略总结" aria-label="Permalink to &quot;9.1 压缩策略总结&quot;">​</a></h3><p><strong>核心原则：</strong></p><ol><li><strong>热数据保持未压缩</strong>：保证写入和实时查询性能</li><li><strong>温数据适度压缩</strong>：平衡存储和查询性能</li><li><strong>冷数据高度压缩</strong>：最大化存储效率</li><li><strong>归档数据外部存储</strong>：长期保存，成本最低</li></ol><p><strong>配置清单：</strong></p><ul><li>[ ] 选择合适的 <code>segmentby</code> 列（基数适中，常用过滤）</li><li>[ ] 配置合理的 <code>orderby</code>（匹配查询模式）</li><li>[ ] 设置分层压缩时间线（热→温→冷）</li><li>[ ] 启用自动压缩策略</li><li>[ ] 配置分层存储表空间</li><li>[ ] 设置数据保留策略</li><li>[ ] 建立监控告警机制</li><li>[ ] 定期维护和优化</li></ul><h3 id="_9-2-关键性能指标" tabindex="-1">9.2 关键性能指标 <a class="header-anchor" href="#_9-2-关键性能指标" aria-label="Permalink to &quot;9.2 关键性能指标&quot;">​</a></h3><table tabindex="0"><thead><tr><th>指标</th><th>目标值</th><th>监控频率</th></tr></thead><tbody><tr><td>压缩率</td><td>&gt;50%</td><td>每天</td></tr><tr><td>压缩速度</td><td>&lt;5分钟/GB</td><td>每周</td></tr><tr><td>压缩查询性能</td><td>&lt;100ms（P95）</td><td>实时</td></tr><tr><td>存储使用率</td><td>&lt;80%</td><td>每小时</td></tr><tr><td>分层存储比例</td><td>热:温:冷 = 10:30:60</td><td>每天</td></tr></tbody></table><h3 id="_9-3-常见场景推荐配置" tabindex="-1">9.3 常见场景推荐配置 <a class="header-anchor" href="#_9-3-常见场景推荐配置" aria-label="Permalink to &quot;9.3 常见场景推荐配置&quot;">​</a></h3><p><strong>1. IoT监控（高频写入）：</strong></p><ul><li>压缩延迟：1天</li><li>segmentby：device_id, metric_type</li><li>分层：热(7天)→温(30天)→冷(1年)</li></ul><p><strong>2. 金融日志（合规要求）：</strong></p><ul><li>压缩延迟：立即</li><li>segmentby：account_id, transaction_type</li><li>归档：2年外迁，7年删除</li></ul><p><strong>3. 应用指标（分析为主）：</strong></p><ul><li>压缩延迟：7天</li><li>segmentby：app_name, endpoint</li><li>保留：90天在线，1年归档</li></ul><p>通过合理配置TimescaleDB的压缩与归档策略，可以在保证查询性能的同时，显著降低存储成本，是构建高效、经济的时间序列数据平台的关键。</p><hr><p><strong>附录：压缩与归档决策树</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">新数据到达</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">是否&lt;热数据阈值？ → 是 → 保持未压缩，高性能存储</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓否</span></span>
<span class="line"><span class="__shiki_wvjl67">是否&lt;温数据阈值？ → 是 → 标准压缩，平衡存储</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓否</span></span>
<span class="line"><span class="__shiki_wvjl67">是否&lt;冷数据阈值？ → 是 → 高比例压缩，低成本存储</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓否</span></span>
<span class="line"><span class="__shiki_wvjl67">是否&lt;归档阈值？ → 是 → 外部归档，长期保存</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓否</span></span>
<span class="line"><span class="__shiki_wvjl67">删除数据（根据保留策略）</span></span></code></pre></div><p><strong>重要提醒：</strong></p><ul><li>在生产环境应用压缩策略前，务必进行充分的测试</li><li>监控压缩对查询性能的实际影响</li><li>定期审查和调整策略以适应业务变化</li><li>确保有完整的数据备份和恢复方案</li></ul>`,126)])])}const d=a(p,[["render",l]]);export{r as __pageData,d as default};
