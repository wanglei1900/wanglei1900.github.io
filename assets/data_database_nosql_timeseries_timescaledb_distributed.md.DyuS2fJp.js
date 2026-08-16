import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"NoSQL数据库 - TimescaleDB分布式架构 详细学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/nosql/timeseries/timescaledb/distributed.md","filePath":"data/database/nosql/timeseries/timescaledb/distributed.md"}'),p={name:"data/database/nosql/timeseries/timescaledb/distributed.md"};function l(h,s,c,e,t,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="nosql数据库-timescaledb分布式架构-详细学习笔记" tabindex="-1">NoSQL数据库 - TimescaleDB分布式架构 详细学习笔记 <a class="header-anchor" href="#nosql数据库-timescaledb分布式架构-详细学习笔记" aria-label="Permalink to &quot;NoSQL数据库 - TimescaleDB分布式架构 详细学习笔记&quot;">​</a></h1><h2 id="一、分布式架构概述" tabindex="-1">一、分布式架构概述 <a class="header-anchor" href="#一、分布式架构概述" aria-label="Permalink to &quot;一、分布式架构概述&quot;">​</a></h2><h3 id="_1-1-timescaledb分布式架构演进" tabindex="-1">1.1 TimescaleDB分布式架构演进 <a class="header-anchor" href="#_1-1-timescaledb分布式架构演进" aria-label="Permalink to &quot;1.1 TimescaleDB分布式架构演进&quot;">​</a></h3><p><strong>单节点架构的局限性：</strong></p><ul><li>存储容量受限于单机磁盘</li><li>计算能力受限于单机CPU/内存</li><li>高可用性依赖外部方案</li><li>扩展性有限，垂直扩展成本高</li></ul><p><strong>分布式架构的优势：</strong></p><ul><li><strong>水平扩展</strong>：线性增加存储和计算能力</li><li><strong>高可用性</strong>：内置冗余和故障转移</li><li><strong>负载均衡</strong>：查询和写入分布到多个节点</li><li><strong>地理分布</strong>：支持多地域部署</li></ul><h3 id="_1-2-timescaledb分布式架构设计哲学" tabindex="-1">1.2 TimescaleDB分布式架构设计哲学 <a class="header-anchor" href="#_1-2-timescaledb分布式架构设计哲学" aria-label="Permalink to &quot;1.2 TimescaleDB分布式架构设计哲学&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">分布式TimescaleDB设计原则：</span></span>
<span class="line"><span class="__shiki_wvjl67">1. 透明分片：对应用层隐藏分片细节</span></span>
<span class="line"><span class="__shiki_wvjl67">2. SQL兼容：100%兼容PostgreSQL SQL</span></span>
<span class="line"><span class="__shiki_wvjl67">3. 自动均衡：数据自动分布和重平衡</span></span>
<span class="line"><span class="__shiki_wvjl67">4. 一致性与可用性平衡：根据场景选择</span></span></code></pre></div><h2 id="二、分布式架构核心组件" tabindex="-1">二、分布式架构核心组件 <a class="header-anchor" href="#二、分布式架构核心组件" aria-label="Permalink to &quot;二、分布式架构核心组件&quot;">​</a></h2><h3 id="_2-1-节点角色与职责" tabindex="-1">2.1 节点角色与职责 <a class="header-anchor" href="#_2-1-节点角色与职责" aria-label="Permalink to &quot;2.1 节点角色与职责&quot;">​</a></h3><h4 id="_2-1-1-访问节点-access-node" tabindex="-1">2.1.1 访问节点 (Access Node) <a class="header-anchor" href="#_2-1-1-访问节点-access-node" aria-label="Permalink to &quot;2.1.1 访问节点 (Access Node)&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">访问节点职责：</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 查询规划与优化</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 元数据管理</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 分布式事务协调</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 客户端连接端点</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 数据分片路由</span></span>
<span class="line"><span class="__shiki_wvjl67">└── 查询结果聚合</span></span></code></pre></div><h4 id="_2-1-2-数据节点-data-node" tabindex="-1">2.1.2 数据节点 (Data Node) <a class="header-anchor" href="#_2-1-2-数据节点-data-node" aria-label="Permalink to &quot;2.1.2 数据节点 (Data Node)&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">数据节点职责：</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 实际数据存储</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 本地查询执行</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 本地索引维护</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 数据压缩与归档</span></span>
<span class="line"><span class="__shiki_wvjl67">└── 副本同步</span></span></code></pre></div><h3 id="_2-2-数据分片策略" tabindex="-1">2.2 数据分片策略 <a class="header-anchor" href="#_2-2-数据分片策略" aria-label="Permalink to &quot;2.2 数据分片策略&quot;">​</a></h3><h4 id="_2-2-1-两级分片架构" tabindex="-1">2.2.1 两级分片架构 <a class="header-anchor" href="#_2-2-1-两级分片架构" aria-label="Permalink to &quot;2.2.1 两级分片架构&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">分布式分片层次：</span></span>
<span class="line"><span class="__shiki_wvjl67">第一级：Hypertable分块 (Chunk)</span></span>
<span class="line"><span class="__shiki_wvjl67">第二级：跨节点分片 (Shard)</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">示例：100TB数据，4个数据节点</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 节点1: Chunk1, Chunk5, Chunk9...</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 节点2: Chunk2, Chunk6, Chunk10...</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 节点3: Chunk3, Chunk7, Chunk11...</span></span>
<span class="line"><span class="__shiki_wvjl67">└── 节点4: Chunk4, Chunk8, Chunk12...</span></span></code></pre></div><h4 id="_2-2-2-分片键选择策略" tabindex="-1">2.2.2 分片键选择策略 <a class="header-anchor" href="#_2-2-2-分片键选择策略" aria-label="Permalink to &quot;2.2.2 分片键选择策略&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 分布式超表创建示例</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> distributed_metrics</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    time</span><span class="__shiki_1itgoe"> TIMESTAMPTZ</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    device_id </span><span class="__shiki_1itgoe">INT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    location_id </span><span class="__shiki_1itgoe">INT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    metric_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    value</span><span class="__shiki_1itgoe"> DOUBLE PRECISION</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    tags JSONB</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 转换为分布式超表</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> create_distributed_hypertable(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;distributed_metrics&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;time&#39;</span><span class="__shiki_140thh">,                    </span><span class="__shiki_21nrsd">-- 分区时间列</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;device_id&#39;</span><span class="__shiki_140thh">,               </span><span class="__shiki_21nrsd">-- 空间分区列</span></span>
<span class="line"><span class="__shiki_140thh">    chunk_time_interval </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;7 days&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    replication_factor </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">,   </span><span class="__shiki_21nrsd">-- 副本因子</span></span>
<span class="line"><span class="__shiki_140thh">    data_nodes </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_1itgoe"> ARRAY</span><span class="__shiki_140thh">[&#39;dn1&#39;, &#39;dn2&#39;, &#39;dn3&#39;, &#39;dn4&#39;]</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 分片键选择考虑因素：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 数据均匀分布：选择高基数列</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 查询模式：WHERE子句常用列</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 连接性能：连接键作为分片键</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 避免热点：时间+空间组合</span></span></code></pre></div><h3 id="_2-3-副本与高可用" tabindex="-1">2.3 副本与高可用 <a class="header-anchor" href="#_2-3-副本与高可用" aria-label="Permalink to &quot;2.3 副本与高可用&quot;">​</a></h3><h4 id="_2-3-1-副本配置" tabindex="-1">2.3.1 副本配置 <a class="header-anchor" href="#_2-3-1-副本配置" aria-label="Permalink to &quot;2.3.1 副本配置&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看数据节点</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">data_nodes</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 添加数据节点</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> add_data_node(</span><span class="__shiki_mdbnqw">&#39;dn5&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    host </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;dn5.example.com&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    port </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> 5432</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    database</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_mdbnqw"> &#39;tsdb&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    if_not_exists </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> true</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 配置副本因子</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> DISTRIBUTED</span><span class="__shiki_140thh"> HYPER </span><span class="__shiki_1itgoe">TABLE</span><span class="__shiki_140thh"> distributed_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> (replication_factor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 副本放置策略</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 机架感知：避免副本在同一机架</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 可用区分布：跨可用区部署</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 负载均衡：考虑节点负载</span></span></code></pre></div><h4 id="_2-3-2-高可用架构" tabindex="-1">2.3.2 高可用架构 <a class="header-anchor" href="#_2-3-2-高可用架构" aria-label="Permalink to &quot;2.3.2 高可用架构&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">高可用部署模式：</span></span>
<span class="line"><span class="__shiki_wvjl67">模式1：多活访问节点</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 负载均衡器 (HAProxy/PGBouncer)</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 访问节点1 (AN1) ←→ 数据节点集群</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 访问节点2 (AN2) ←→ 数据节点集群</span></span>
<span class="line"><span class="__shiki_wvjl67">└── 共享元数据存储 (Citus Meta)</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">模式2：主备访问节点</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 主访问节点 (Active) ←→ 数据节点集群</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 备访问节点 (Standby) ←→ 数据节点集群</span></span>
<span class="line"><span class="__shiki_wvjl67">└── 流复制 (WAL Streaming)</span></span></code></pre></div><h2 id="三、分布式集群部署与配置" tabindex="-1">三、分布式集群部署与配置 <a class="header-anchor" href="#三、分布式集群部署与配置" aria-label="Permalink to &quot;三、分布式集群部署与配置&quot;">​</a></h2><h3 id="_3-1-集群规划与设计" tabindex="-1">3.1 集群规划与设计 <a class="header-anchor" href="#_3-1-集群规划与设计" aria-label="Permalink to &quot;3.1 集群规划与设计&quot;">​</a></h3><h4 id="_3-1-1-容量规划矩阵" tabindex="-1">3.1.1 容量规划矩阵 <a class="header-anchor" href="#_3-1-1-容量规划矩阵" aria-label="Permalink to &quot;3.1.1 容量规划矩阵&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 容量规划查询</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 存储容量估算</span></span>
<span class="line"><span class="__shiki_140thh">    hypertable_name,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(total_bytes) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total_size,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(total_bytes </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> number_chunks) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_chunk_size,</span></span>
<span class="line"><span class="__shiki_140thh">    number_chunks,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 分片规划</span></span>
<span class="line"><span class="__shiki_140thh">    CEIL(total_bytes </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">10</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">^</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> suggested_nodes, </span><span class="__shiki_21nrsd">-- 每个节点10GB</span></span>
<span class="line"><span class="__shiki_140thh">    CEIL(number_chunks </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> chunks_per_node_suggested</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> hypertable_detailed_size(</span><span class="__shiki_mdbnqw">&#39;metrics&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">CROSS JOIN</span><span class="__shiki_140thh"> LATERAL (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> number_chunks</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunks</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> hypertable_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;metrics&#39;</span></span>
<span class="line"><span class="__shiki_140thh">) chunk_stats;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 建议配置：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 小集群 (1-10TB): 3-5个数据节点</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 中集群 (10-100TB): 5-20个数据节点</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 大集群 (100TB+): 20+个数据节点，多访问节点</span></span></code></pre></div><h4 id="_3-1-2-网络拓扑设计" tabindex="-1">3.1.2 网络拓扑设计 <a class="header-anchor" href="#_3-1-2-网络拓扑设计" aria-label="Permalink to &quot;3.1.2 网络拓扑设计&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 推荐网络配置 (docker-compose示例)</span></span>
<span class="line"><span class="__shiki_17hn0y">version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;3.8&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">services</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 访问节点</span></span>
<span class="line"><span class="__shiki_17hn0y">  access-node</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">timescale/timescaledb:latest-pg14</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;5432:5432&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    environment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">POSTGRES_PASSWORD=secret</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">POSTGRES_DB=tsdb</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">./an_data:/var/lib/postgresql/data</span></span>
<span class="line"><span class="__shiki_17hn0y">    networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">tsdb-cluster</span></span>
<span class="line"><span class="__shiki_17hn0y">    command</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      postgres</span></span>
<span class="line"><span class="__shiki_mdbnqw">      -c max_connections=500</span></span>
<span class="line"><span class="__shiki_mdbnqw">      -c shared_buffers=4GB</span></span>
<span class="line"><span class="__shiki_mdbnqw">      -c work_mem=64MB</span></span>
<span class="line"><span class="__shiki_mdbnqw">      -c maintenance_work_mem=1GB</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 数据节点</span></span>
<span class="line"><span class="__shiki_17hn0y">  data-node-1</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">timescale/timescaledb:latest-pg14</span></span>
<span class="line"><span class="__shiki_17hn0y">    environment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">POSTGRES_PASSWORD=secret</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">POSTGRES_DB=tsdb</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">./dn1_data:/var/lib/postgresql/data</span></span>
<span class="line"><span class="__shiki_17hn0y">    networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">tsdb-cluster</span></span>
<span class="line"><span class="__shiki_17hn0y">    command</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      postgres</span></span>
<span class="line"><span class="__shiki_mdbnqw">      -c max_connections=300</span></span>
<span class="line"><span class="__shiki_mdbnqw">      -c shared_buffers=2GB</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_17hn0y">  data-node-2</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">timescale/timescaledb:latest-pg14</span></span>
<span class="line"><span class="__shiki_21nrsd">    # ... 类似配置</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 监控节点</span></span>
<span class="line"><span class="__shiki_17hn0y">  timescale-prometheus</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">timescale/promscale:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">tsdb-cluster</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 负载均衡器</span></span>
<span class="line"><span class="__shiki_17hn0y">  pgpool</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">pgpool/pgpool:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;5433:5432&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">tsdb-cluster</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">networks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  tsdb-cluster</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    driver</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bridge</span></span>
<span class="line"><span class="__shiki_17hn0y">    ipam</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">subnet</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">172.20.0.0/24</span></span></code></pre></div><h3 id="_3-2-集群初始化与配置" tabindex="-1">3.2 集群初始化与配置 <a class="header-anchor" href="#_3-2-集群初始化与配置" aria-label="Permalink to &quot;3.2 集群初始化与配置&quot;">​</a></h3><h4 id="_3-2-1-初始化脚本" tabindex="-1">3.2.1 初始化脚本 <a class="header-anchor" href="#_3-2-1-初始化脚本" aria-label="Permalink to &quot;3.2.1 初始化脚本&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># 集群初始化脚本</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 安装TimescaleDB扩展（在所有节点）</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> node </span><span class="__shiki_1itgoe">in</span><span class="__shiki_mdbnqw"> an1</span><span class="__shiki_mdbnqw"> dn1</span><span class="__shiki_mdbnqw"> dn2</span><span class="__shiki_mdbnqw"> dn3</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ssh</span><span class="__shiki_140thh"> $node </span><span class="__shiki_mdbnqw">&quot;psql -U postgres -c &#39;CREATE EXTENSION IF NOT EXISTS timescaledb;&#39;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">done</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 在访问节点配置数据节点</span></span>
<span class="line"><span class="__shiki_1t8gfj">psql</span><span class="__shiki_dzsirb"> -U</span><span class="__shiki_mdbnqw"> postgres</span><span class="__shiki_dzsirb"> -h</span><span class="__shiki_mdbnqw"> an1</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">-- 添加数据节点</span></span>
<span class="line"><span class="__shiki_mdbnqw">SELECT add_data_node(&#39;dn1&#39;, host =&gt; &#39;dn1&#39;, port =&gt; 5432);</span></span>
<span class="line"><span class="__shiki_mdbnqw">SELECT add_data_node(&#39;dn2&#39;, host =&gt; &#39;dn2&#39;, port =&gt; 5432);</span></span>
<span class="line"><span class="__shiki_mdbnqw">SELECT add_data_node(&#39;dn3&#39;, host =&gt; &#39;dn3&#39;, port =&gt; 5432);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">-- 验证节点状态</span></span>
<span class="line"><span class="__shiki_mdbnqw">SELECT * FROM timescaledb_information.data_nodes;</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 创建分布式超表</span></span>
<span class="line"><span class="__shiki_1t8gfj">psql</span><span class="__shiki_dzsirb"> -U</span><span class="__shiki_mdbnqw"> postgres</span><span class="__shiki_dzsirb"> -h</span><span class="__shiki_mdbnqw"> an1</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">CREATE TABLE distributed_metrics (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    ts TIMESTAMPTZ NOT NULL,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    device_id INT NOT NULL,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    metric VARCHAR(50) NOT NULL,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    value DOUBLE PRECISION,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    tags JSONB</span></span>
<span class="line"><span class="__shiki_mdbnqw">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">SELECT create_distributed_hypertable(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;distributed_metrics&#39;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;ts&#39;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;device_id&#39;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    chunk_time_interval =&gt; INTERVAL &#39;1 day&#39;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    replication_factor =&gt; 2,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    data_nodes =&gt; ARRAY[&#39;dn1&#39;, &#39;dn2&#39;, &#39;dn3&#39;]</span></span>
<span class="line"><span class="__shiki_mdbnqw">);</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span></code></pre></div><h4 id="_3-2-2-高级配置调优" tabindex="-1">3.2.2 高级配置调优 <a class="header-anchor" href="#_3-2-2-高级配置调优" aria-label="Permalink to &quot;3.2.2 高级配置调优&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 访问节点配置优化</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SYSTEM</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_140thh"> max_connections </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 500</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SYSTEM</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_140thh"> shared_buffers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;4GB&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SYSTEM</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_140thh"> work_mem </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;64MB&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SYSTEM</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_140thh"> maintenance_work_mem </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;1GB&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SYSTEM</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_140thh"> max_prepared_transactions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 150</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SYSTEM</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_140thh"> max_wal_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;4GB&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SYSTEM</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_140thh"> min_wal_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;1GB&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 数据节点配置优化</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SYSTEM</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_140thh"> max_connections </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 300</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SYSTEM</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_140thh"> shared_buffers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;2GB&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SYSTEM</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_140thh"> max_wal_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;2GB&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- TimescaleDB分布式特定配置</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 连接池设置</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SYSTEM</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_dzsirb"> timescaledb</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">max_background_workers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 8</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SYSTEM</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_dzsirb"> timescaledb</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">remote_data_fetcher</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;async&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 分布式查询优化</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SYSTEM</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_dzsirb"> timescaledb</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">enable_remote_explain</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> true;</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SYSTEM</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_dzsirb"> timescaledb</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">remote_async_pushdown</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> true;</span></span></code></pre></div><h2 id="四、分布式查询处理" tabindex="-1">四、分布式查询处理 <a class="header-anchor" href="#四、分布式查询处理" aria-label="Permalink to &quot;四、分布式查询处理&quot;">​</a></h2><h3 id="_4-1-分布式查询执行引擎" tabindex="-1">4.1 分布式查询执行引擎 <a class="header-anchor" href="#_4-1-分布式查询执行引擎" aria-label="Permalink to &quot;4.1 分布式查询执行引擎&quot;">​</a></h3><h4 id="_4-1-1-查询处理流程" tabindex="-1">4.1.1 查询处理流程 <a class="header-anchor" href="#_4-1-1-查询处理流程" aria-label="Permalink to &quot;4.1.1 查询处理流程&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">分布式查询执行流程：</span></span>
<span class="line"><span class="__shiki_wvjl67">1. 解析与验证（访问节点）</span></span>
<span class="line"><span class="__shiki_wvjl67">2. 查询规划与优化（访问节点）</span></span>
<span class="line"><span class="__shiki_wvjl67">   ├── 分布式查询规划</span></span>
<span class="line"><span class="__shiki_wvjl67">   ├── 分片剪裁</span></span>
<span class="line"><span class="__shiki_wvjl67">   ├── 谓词下推</span></span>
<span class="line"><span class="__shiki_wvjl67">   └── 聚合下推</span></span>
<span class="line"><span class="__shiki_wvjl67">3. 查询分发（访问节点 → 数据节点）</span></span>
<span class="line"><span class="__shiki_wvjl67">4. 并行执行（各数据节点）</span></span>
<span class="line"><span class="__shiki_wvjl67">5. 结果收集与聚合（访问节点）</span></span>
<span class="line"><span class="__shiki_wvjl67">6. 返回结果（访问节点 → 客户端）</span></span></code></pre></div><h4 id="_4-1-2-查询下推优化" tabindex="-1">4.1.2 查询下推优化 <a class="header-anchor" href="#_4-1-2-查询下推优化" aria-label="Permalink to &quot;4.1.2 查询下推优化&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 示例：自动下推的查询</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (</span><span class="__shiki_1itgoe">VERBOSE</span><span class="__shiki_140thh">, DISTSQL)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    time_bucket(</span><span class="__shiki_mdbnqw">&#39;1 hour&#39;</span><span class="__shiki_140thh">, ts) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> hour</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    device_id,</span></span>
<span class="line"><span class="__shiki_dzsirb">    AVG</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_value,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> readings</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> distributed_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> ts </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_1itgoe"> NOW</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;24 hours&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> device_id </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1001</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1002</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1003</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> metric </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;temperature&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_1itgoe"> hour</span><span class="__shiki_140thh">, device_id</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_1itgoe"> hour</span><span class="__shiki_1itgoe"> DESC</span><span class="__shiki_140thh">, device_id;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 下推分析：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 时间过滤下推到数据节点</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. device_id过滤下推</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. metric过滤下推</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 聚合(AVG, COUNT)下推</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. GROUP BY下推</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 只有最终聚合和ORDER BY在访问节点执行</span></span></code></pre></div><h3 id="_4-2-分布式连接与聚合" tabindex="-1">4.2 分布式连接与聚合 <a class="header-anchor" href="#_4-2-分布式连接与聚合" aria-label="Permalink to &quot;4.2 分布式连接与聚合&quot;">​</a></h3><h4 id="_4-2-1-分布式连接策略" tabindex="-1">4.2.1 分布式连接策略 <a class="header-anchor" href="#_4-2-1-分布式连接策略" aria-label="Permalink to &quot;4.2.1 分布式连接策略&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 分片键连接（最优性能）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 设备表按device_id分片，指标表也按device_id分片</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> distributed_devices</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    device_id </span><span class="__shiki_1itgoe">INT</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    device_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    installed_date </span><span class="__shiki_1itgoe">DATE</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">PARTITION</span><span class="__shiki_1itgoe"> BY</span><span class="__shiki_1itgoe"> HASH</span><span class="__shiki_140thh">(device_id);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> create_distributed_hypertable(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;distributed_devices&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    partition_column </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;device_id&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    data_nodes </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_1itgoe"> ARRAY</span><span class="__shiki_140thh">[&#39;dn1&#39;, &#39;dn2&#39;, &#39;dn3&#39;]</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 连接查询（可完全下推）</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_dzsirb"> d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">device_name</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">m</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">avg_temp</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> distributed_devices d</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> device_id, </span><span class="__shiki_dzsirb">AVG</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_temp</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> distributed_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> metric </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;temperature&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_140thh"> ts </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_1itgoe"> NOW</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;7 days&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    GROUP BY</span><span class="__shiki_140thh"> device_id</span></span>
<span class="line"><span class="__shiki_140thh">) m </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">device_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> m</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">device_id</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 广播连接（小表广播）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 将小表复制到所有数据节点</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> small_dimension</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">INT</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    category </span><span class="__shiki_1itgoe">TEXT</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 配置为复制表</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> create_reference_table(</span><span class="__shiki_mdbnqw">&#39;small_dimension&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 重新分区连接（大表连接）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 在运行时重新分布数据</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_dzsirb"> citus</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">enable_repartition_joins</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_4-2-2-分布式聚合优化" tabindex="-1">4.2.2 分布式聚合优化 <a class="header-anchor" href="#_4-2-2-分布式聚合优化" aria-label="Permalink to &quot;4.2.2 分布式聚合优化&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 多级聚合优化示例</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建小时级连续聚合（在数据节点本地）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> MATERIALIZED VIEW metrics_hourly</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">timescaledb</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">continuous</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span></span>
<span class="line"><span class="__shiki_140thh">    time_bucket(INTERVAL </span><span class="__shiki_mdbnqw">&#39;1 hour&#39;</span><span class="__shiki_140thh">, ts) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> hour</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    device_id,</span></span>
<span class="line"><span class="__shiki_140thh">    metric,</span></span>
<span class="line"><span class="__shiki_dzsirb">    AVG</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_value,</span></span>
<span class="line"><span class="__shiki_dzsirb">    MIN</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> min_value,</span></span>
<span class="line"><span class="__shiki_dzsirb">    MAX</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> max_value,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> readings</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> distributed_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_1itgoe"> hour</span><span class="__shiki_140thh">, device_id, metric;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 分布式查询利用连续聚合</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    date_trunc(</span><span class="__shiki_mdbnqw">&#39;day&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">hour</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> day</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    device_id,</span></span>
<span class="line"><span class="__shiki_140thh">    metric,</span></span>
<span class="line"><span class="__shiki_dzsirb">    AVG</span><span class="__shiki_140thh">(avg_value) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> daily_avg,</span></span>
<span class="line"><span class="__shiki_dzsirb">    SUM</span><span class="__shiki_140thh">(readings) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> daily_readings</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> metrics_hourly</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> hour</span><span class="__shiki_1itgoe"> &gt;=</span><span class="__shiki_1itgoe"> NOW</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;30 days&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> date_trunc(</span><span class="__shiki_mdbnqw">&#39;day&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">hour</span><span class="__shiki_140thh">), device_id, metric;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 聚合下推统计</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">distributed_aggregate_stats</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> hypertable_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;distributed_metrics&#39;</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_4-3-分布式事务处理" tabindex="-1">4.3 分布式事务处理 <a class="header-anchor" href="#_4-3-分布式事务处理" aria-label="Permalink to &quot;4.3 分布式事务处理&quot;">​</a></h3><h4 id="_4-3-1-两阶段提交协议" tabindex="-1">4.3.1 两阶段提交协议 <a class="header-anchor" href="#_4-3-1-两阶段提交协议" aria-label="Permalink to &quot;4.3.1 两阶段提交协议&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 分布式事务示例</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 准备阶段（所有节点）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 访问节点协调，各数据节点准备事务</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 分布式插入</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> distributed_metrics </span></span>
<span class="line"><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_1itgoe">NOW</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">1001</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;temperature&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">23</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;{&quot;unit&quot;: &quot;C&quot;}&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_1itgoe">NOW</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">1002</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;humidity&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">65</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;{&quot;unit&quot;: &quot;%&quot;}&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 提交阶段</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 如果所有节点准备成功，则提交</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 如果有节点失败，则回滚</span></span>
<span class="line"><span class="__shiki_1itgoe">COMMIT</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看分布式事务状态</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">distributed_transaction_status</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 事务重试机制</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> retry_distributed_insert(</span></span>
<span class="line"><span class="__shiki_140thh">    p_device_id </span><span class="__shiki_1itgoe">INT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    p_metric </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    p_value </span><span class="__shiki_1itgoe">DOUBLE PRECISION</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    max_retries </span><span class="__shiki_1itgoe">INT</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 3</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    retry_count </span><span class="__shiki_1itgoe">INT</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    success </span><span class="__shiki_1itgoe">BOOLEAN</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> false;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHILE</span><span class="__shiki_140thh"> retry_count </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> max_retries </span><span class="__shiki_1itgoe">AND</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_140thh"> success </span><span class="__shiki_1itgoe">LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">            INSERT INTO</span><span class="__shiki_140thh"> distributed_metrics </span></span>
<span class="line"><span class="__shiki_1itgoe">            VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">NOW</span><span class="__shiki_140thh">(), p_device_id, p_metric, p_value);</span></span>
<span class="line"><span class="__shiki_140thh">            success :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true;</span></span>
<span class="line"><span class="__shiki_140thh">        EXCEPTION </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> OTHERS </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_140thh">                retry_count :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> retry_count </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;Retry % for device %: %&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                    retry_count, p_device_id, SQLERRM;</span></span>
<span class="line"><span class="__shiki_140thh">                PERFORM pg_sleep(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh"> ^ retry_count); </span><span class="__shiki_21nrsd">-- 指数退避</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_140thh"> success </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_140thh">        RAISE EXCEPTION </span><span class="__shiki_mdbnqw">&#39;Failed after % retries&#39;</span><span class="__shiki_140thh">, max_retries;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh"> $$;</span></span></code></pre></div><h4 id="_4-3-2-一致性级别配置" tabindex="-1">4.3.2 一致性级别配置 <a class="header-anchor" href="#_4-3-2-一致性级别配置" aria-label="Permalink to &quot;4.3.2 一致性级别配置&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 配置读取一致性</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 强一致性（默认）</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_dzsirb"> citus</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">read_from_primary</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> true;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 最终一致性（读副本）</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_dzsirb"> citus</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">read_from_primary</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> false;</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_dzsirb"> citus</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">read_from_secondaries</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> true;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话级一致性设置</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> DATABASE</span><span class="__shiki_140thh"> tsdb </span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_dzsirb"> citus</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">read_from_primary</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> false;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 事务隔离级别</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_1itgoe"> TRANSACTION</span><span class="__shiki_1itgoe"> ISOLATION</span><span class="__shiki_1itgoe"> LEVEL</span><span class="__shiki_1itgoe"> REPEATABLE</span><span class="__shiki_1itgoe"> READ</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 分布式查询</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> distributed_metrics </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> device_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1001</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">COMMIT</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 监控一致性延迟</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    node_name,</span></span>
<span class="line"><span class="__shiki_140thh">    replay_lag,</span></span>
<span class="line"><span class="__shiki_140thh">    replay_lag_bytes,</span></span>
<span class="line"><span class="__shiki_1itgoe">    state</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    sync_state</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">data_node_replication_status</span><span class="__shiki_140thh">;</span></span></code></pre></div><h2 id="五、数据分布与重平衡" tabindex="-1">五、数据分布与重平衡 <a class="header-anchor" href="#五、数据分布与重平衡" aria-label="Permalink to &quot;五、数据分布与重平衡&quot;">​</a></h2><h3 id="_5-1-数据分布策略" tabindex="-1">5.1 数据分布策略 <a class="header-anchor" href="#_5-1-数据分布策略" aria-label="Permalink to &quot;5.1 数据分布策略&quot;">​</a></h3><h4 id="_5-1-1-智能分片放置" tabindex="-1">5.1.1 智能分片放置 <a class="header-anchor" href="#_5-1-1-智能分片放置" aria-label="Permalink to &quot;5.1.1 智能分片放置&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看当前数据分布</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    node_name,</span></span>
<span class="line"><span class="__shiki_140thh">    hypertable_name,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(total_bytes) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> size</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    chunk_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROUND</span><span class="__shiki_140thh">(total_bytes </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> SUM</span><span class="__shiki_140thh">(total_bytes) </span><span class="__shiki_1itgoe">OVER</span><span class="__shiki_140thh"> (), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> percent</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">data_node_hypertable_stats</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> total_bytes </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 数据分布不均的检测</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> node_stats </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        node_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> chunk_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">        SUM</span><span class="__shiki_140thh">(pg_total_relation_size(</span><span class="__shiki_dzsirb">format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;%I.%I&#39;</span><span class="__shiki_140thh">, schema_name, table_name))) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total_size</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunks</span><span class="__shiki_140thh"> c</span></span>
<span class="line"><span class="__shiki_1itgoe">    JOIN</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">data_nodes</span><span class="__shiki_140thh"> dn </span></span>
<span class="line"><span class="__shiki_1itgoe">        ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">data_nodes</span><span class="__shiki_140thh"> @</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> ARRAY</span><span class="__shiki_140thh">[dn.node_name]</span></span>
<span class="line"><span class="__shiki_1itgoe">    GROUP BY</span><span class="__shiki_140thh"> node_name</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    node_name,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(total_size) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> size</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    chunk_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROUND</span><span class="__shiki_140thh">(total_size </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> AVG</span><span class="__shiki_140thh">(total_size) </span><span class="__shiki_1itgoe">OVER</span><span class="__shiki_140thh"> (), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> relative_load</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> node_stats</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> ROUND</span><span class="__shiki_140thh">(total_size </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> AVG</span><span class="__shiki_140thh">(total_size) </span><span class="__shiki_1itgoe">OVER</span><span class="__shiki_140thh"> (), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 150</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">-- 负载超过平均150%</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 自动分片放置策略</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> alter_distributed_hypertable(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;distributed_metrics&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    shard_count </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> 32</span><span class="__shiki_140thh">,           </span><span class="__shiki_21nrsd">-- 增加分片数</span></span>
<span class="line"><span class="__shiki_140thh">    shard_array </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;device_id&#39;</span><span class="__shiki_21nrsd">   -- 按数组分片</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h4 id="_5-1-2-自定义放置策略" tabindex="-1">5.1.2 自定义放置策略 <a class="header-anchor" href="#_5-1-2-自定义放置策略" aria-label="Permalink to &quot;5.1.2 自定义放置策略&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 基于地理位置的分片放置</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> geo_shard_placement</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    chunk_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    candidate_nodes </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">[]</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_140thh">[] </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    preferred_nodes </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">[];</span></span>
<span class="line"><span class="__shiki_140thh">    chunk_region </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 获取分块的地理区域（从元数据或tags字段）</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> tags</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;region&#39;</span><span class="__shiki_1itgoe"> INTO</span><span class="__shiki_140thh"> chunk_region</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> distributed_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> chunk_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_21nrsd"> -- 根据chunk_id获取示例行</span></span>
<span class="line"><span class="__shiki_1itgoe">    LIMIT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 根据区域选择节点</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> chunk_region</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;us-east&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_140thh">            preferred_nodes :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> ARRAY</span><span class="__shiki_140thh">[&#39;dn-us-east-1&#39;, &#39;dn-us-east-2&#39;];</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;eu-west&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_140thh">            preferred_nodes :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> ARRAY</span><span class="__shiki_140thh">[&#39;dn-eu-west-1&#39;, &#39;dn-eu-west-2&#39;];</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;ap-southeast&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_140thh">            preferred_nodes :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> ARRAY</span><span class="__shiki_140thh">[&#39;dn-ap-southeast-1&#39;, &#39;dn-ap-southeast-2&#39;];</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span></span>
<span class="line"><span class="__shiki_140thh">            preferred_nodes :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> candidate_nodes;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> CASE</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> preferred_nodes;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh"> $$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 应用自定义放置策略</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> set_chunk_placement_policy(</span><span class="__shiki_mdbnqw">&#39;distributed_metrics&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;geo_shard_placement&#39;</span><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_5-2-数据重平衡" tabindex="-1">5.2 数据重平衡 <a class="header-anchor" href="#_5-2-数据重平衡" aria-label="Permalink to &quot;5.2 数据重平衡&quot;">​</a></h3><h4 id="_5-2-1-在线重平衡操作" tabindex="-1">5.2.1 在线重平衡操作 <a class="header-anchor" href="#_5-2-1-在线重平衡操作" aria-label="Permalink to &quot;5.2.1 在线重平衡操作&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 添加新节点</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> add_data_node(</span><span class="__shiki_mdbnqw">&#39;dn4&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    host </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;dn4.example.com&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    port </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> 5432</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    database</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_mdbnqw"> &#39;tsdb&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 触发重平衡</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> rebalance_distributed_hypertable(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;distributed_metrics&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    max_chunk_moves </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_140thh">,          </span><span class="__shiki_21nrsd">-- 每次最多移动50个分块</span></span>
<span class="line"><span class="__shiki_140thh">    move_timeout </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;1 hour&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    drain_only </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> false</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 监控重平衡进度</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    job_id,</span></span>
<span class="line"><span class="__shiki_140thh">    hypertable_name,</span></span>
<span class="line"><span class="__shiki_140thh">    node_from,</span></span>
<span class="line"><span class="__shiki_140thh">    node_to,</span></span>
<span class="line"><span class="__shiki_140thh">    chunk_name,</span></span>
<span class="line"><span class="__shiki_1itgoe">    status</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    started_at,</span></span>
<span class="line"><span class="__shiki_140thh">    completed_at</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">rebalance_jobs</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> status</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;completed&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;failed&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> started_at </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 取消或调整重平衡</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> alter_rebalance_job(</span></span>
<span class="line"><span class="__shiki_140thh">    job_id </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> 123</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    max_chunk_moves </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">,      </span><span class="__shiki_21nrsd">-- 增加移动限制</span></span>
<span class="line"><span class="__shiki_140thh">    move_timeout </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;2 hours&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 验证重平衡结果</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    node_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> chunk_count,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(</span><span class="__shiki_dzsirb">SUM</span><span class="__shiki_140thh">(pg_total_relation_size(table_name))) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total_size</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunks</span><span class="__shiki_140thh"> c</span></span>
<span class="line"><span class="__shiki_1itgoe">CROSS JOIN</span><span class="__shiki_140thh"> LATERAL unnest(</span><span class="__shiki_dzsirb">c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">data_nodes</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> node_name</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> hypertable_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;distributed_metrics&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> node_name</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> total_size </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_5-2-2-增量重平衡策略" tabindex="-1">5.2.2 增量重平衡策略 <a class="header-anchor" href="#_5-2-2-增量重平衡策略" aria-label="Permalink to &quot;5.2.2 增量重平衡策略&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 增量重平衡：只移动热点数据</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> incremental_rebalance()</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    hot_chunks </span><span class="__shiki_1itgoe">CURSOR</span><span class="__shiki_1itgoe"> FOR</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">            c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunk_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">data_nodes</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">seq_scan</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">idx_scan</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> access_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">            c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">range_start</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">range_end</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunks</span><span class="__shiki_140thh"> c</span></span>
<span class="line"><span class="__shiki_1itgoe">        JOIN</span><span class="__shiki_140thh"> pg_stat_user_tables a </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunk_name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relname</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">hypertable_name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;distributed_metrics&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">          AND</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">seq_scan</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">idx_scan</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_21nrsd">  -- 访问频繁的分块</span></span>
<span class="line"><span class="__shiki_1itgoe">          AND</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">range_start</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_1itgoe"> NOW</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;30 days&#39;</span><span class="__shiki_21nrsd"> -- 近期数据</span></span>
<span class="line"><span class="__shiki_1itgoe">        ORDER BY</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">seq_scan</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">idx_scan</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">        LIMIT</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    target_node </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    chunk_record RECORD;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 找出负载最低的节点</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> node_name </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> target_node</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            node_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">            COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> chunk_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">            ROW_NUMBER</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">OVER</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> rnk</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunks</span><span class="__shiki_140thh"> c</span></span>
<span class="line"><span class="__shiki_1itgoe">        CROSS JOIN</span><span class="__shiki_140thh"> LATERAL unnest(</span><span class="__shiki_dzsirb">c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">data_nodes</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> node_name</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> hypertable_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;distributed_metrics&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        GROUP BY</span><span class="__shiki_140thh"> node_name</span></span>
<span class="line"><span class="__shiki_140thh">    ) node_load</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> rnk </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 移动热点分块</span></span>
<span class="line"><span class="__shiki_1itgoe">    OPEN</span><span class="__shiki_140thh"> hot_chunks;</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        FETCH</span><span class="__shiki_140thh"> hot_chunks </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> chunk_record;</span></span>
<span class="line"><span class="__shiki_140thh">        EXIT </span><span class="__shiki_1itgoe">WHEN</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_140thh"> FOUND;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 移动分块到负载低的节点</span></span>
<span class="line"><span class="__shiki_140thh">        PERFORM move_chunk(</span></span>
<span class="line"><span class="__shiki_140thh">            chunk </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> chunk_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunk_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            source_node </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> chunk_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">data_nodes</span><span class="__shiki_140thh">[1],</span></span>
<span class="line"><span class="__shiki_140thh">            destination_node </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> target_node</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;Moved chunk % from % to %&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">            chunk_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunk_name</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">            chunk_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">data_nodes</span><span class="__shiki_140thh">[1], </span></span>
<span class="line"><span class="__shiki_140thh">            target_node;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    CLOSE</span><span class="__shiki_140thh"> hot_chunks;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh"> $$;</span></span></code></pre></div><h2 id="六、高可用与容错" tabindex="-1">六、高可用与容错 <a class="header-anchor" href="#六、高可用与容错" aria-label="Permalink to &quot;六、高可用与容错&quot;">​</a></h2><h3 id="_6-1-副本管理与故障转移" tabindex="-1">6.1 副本管理与故障转移 <a class="header-anchor" href="#_6-1-副本管理与故障转移" aria-label="Permalink to &quot;6.1 副本管理与故障转移&quot;">​</a></h3><h4 id="_6-1-1-多副本配置" tabindex="-1">6.1.1 多副本配置 <a class="header-anchor" href="#_6-1-1-多副本配置" aria-label="Permalink to &quot;6.1.1 多副本配置&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 配置多副本</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> DISTRIBUTED</span><span class="__shiki_140thh"> HYPER </span><span class="__shiki_1itgoe">TABLE</span><span class="__shiki_140thh"> distributed_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> (replication_factor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看副本状态</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    hypertable_name,</span></span>
<span class="line"><span class="__shiki_140thh">    chunk_name,</span></span>
<span class="line"><span class="__shiki_140thh">    node_names </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> replica_nodes,</span></span>
<span class="line"><span class="__shiki_140thh">    replica_count,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> replica_count </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;UNDER_REPLICATED&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_mdbnqw"> &#39;HEALTHY&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_1itgoe"> status</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunk_replica_status</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> hypertable_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;distributed_metrics&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> replica_count </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 副本放置约束</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 确保副本在不同故障域</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> add_replica_placement_constraint(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;distributed_metrics&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    constraint_type </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;zone&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    constraint_value </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;different&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 手动修复副本</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> repair_chunk_replica(</span></span>
<span class="line"><span class="__shiki_140thh">    chunk_name </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;_timescaledb_internal._dist_hyper_1_chunk_7&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    source_node </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;dn1&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    target_node </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;dn4&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h4 id="_6-1-2-自动故障转移" tabindex="-1">6.1.2 自动故障转移 <a class="header-anchor" href="#_6-1-2-自动故障转移" aria-label="Permalink to &quot;6.1.2 自动故障转移&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 配置故障检测</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> alter_data_node(</span></span>
<span class="line"><span class="__shiki_140thh">    node_name </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;dn1&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    available </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> true,</span></span>
<span class="line"><span class="__shiki_140thh">    metadata </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;{&quot;failure_threshold&quot;: 3, &quot;check_interval&quot;: &quot;10s&quot;}&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 故障转移策略</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> handle_node_failure(failed_node </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    affected_chunks </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">[];</span></span>
<span class="line"><span class="__shiki_140thh">    new_primary_node </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 1. 标记节点为不可用</span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM alter_data_node(failed_node, available </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> false);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 2. 找出受影响的副本</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> ARRAY_AGG(chunk_name)</span></span>
<span class="line"><span class="__shiki_1itgoe">    INTO</span><span class="__shiki_140thh"> affected_chunks</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunk_replica_status</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> node_names @</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> ARRAY</span><span class="__shiki_140thh">[failed_node]</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_140thh"> is_primary_replica;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 3. 为每个分块选择新的主副本</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">..array_length(affected_chunks, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 选择负载最低的副本节点作为新主</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> node_name </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> new_primary_node</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                unnest(node_names) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> node_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">                COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">OVER</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">PARTITION</span><span class="__shiki_1itgoe"> BY</span><span class="__shiki_140thh"> unnest(node_names)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> load</span></span>
<span class="line"><span class="__shiki_1itgoe">            FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunk_replica_status</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHERE</span><span class="__shiki_140thh"> chunk_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> affected_chunks[i]</span></span>
<span class="line"><span class="__shiki_1itgoe">              AND</span><span class="__shiki_140thh"> node_name </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> failed_node</span></span>
<span class="line"><span class="__shiki_1itgoe">            ORDER BY</span><span class="__shiki_1itgoe"> load</span></span>
<span class="line"><span class="__shiki_1itgoe">            LIMIT</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">        ) candidates;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 4. 提升副本为主</span></span>
<span class="line"><span class="__shiki_140thh">        PERFORM promote_chunk_replica(</span></span>
<span class="line"><span class="__shiki_140thh">            chunk_name </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> affected_chunks[i],</span></span>
<span class="line"><span class="__shiki_140thh">            new_primary </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> new_primary_node</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 5. 创建新副本（如果需要）</span></span>
<span class="line"><span class="__shiki_1itgoe">        IF</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> replica_count </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> chunk_replica_status </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHERE</span><span class="__shiki_140thh"> chunk_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> affected_chunks[i]) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_140thh">            PERFORM add_chunk_replica(</span></span>
<span class="line"><span class="__shiki_140thh">                chunk_name </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> affected_chunks[i],</span></span>
<span class="line"><span class="__shiki_140thh">                target_node </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_21nrsd"> -- 选择合适节点</span></span>
<span class="line"><span class="__shiki_140thh">            );</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 6. 记录故障事件</span></span>
<span class="line"><span class="__shiki_1itgoe">    INSERT INTO</span><span class="__shiki_140thh"> cluster_failure_events</span></span>
<span class="line"><span class="__shiki_1itgoe">    VALUES</span><span class="__shiki_140thh"> (failed_node, </span><span class="__shiki_1itgoe">NOW</span><span class="__shiki_140thh">(), affected_chunks);</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh"> $$;</span></span></code></pre></div><h3 id="_6-2-备份与恢复" tabindex="-1">6.2 备份与恢复 <a class="header-anchor" href="#_6-2-备份与恢复" aria-label="Permalink to &quot;6.2 备份与恢复&quot;">​</a></h3><h4 id="_6-2-1-分布式备份策略" tabindex="-1">6.2.1 分布式备份策略 <a class="header-anchor" href="#_6-2-1-分布式备份策略" aria-label="Permalink to &quot;6.2.1 分布式备份策略&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># 分布式集群备份脚本</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 配置</span></span>
<span class="line"><span class="__shiki_140thh">BACKUP_DIR</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/backups/timescale-cluster&quot;</span></span>
<span class="line"><span class="__shiki_140thh">DATE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%Y%m%d_%H%M%S</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">BACKUP_PATH</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$BACKUP_DIR</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_140thh">$DATE</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 备份访问节点（元数据）</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;Backing up access node...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">pg_dump</span><span class="__shiki_dzsirb"> -h</span><span class="__shiki_mdbnqw"> an1</span><span class="__shiki_dzsirb"> -U</span><span class="__shiki_mdbnqw"> postgres</span><span class="__shiki_dzsirb"> -Fc</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --schema-only</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --no-owner</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --no-privileges</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    -f</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$BACKUP_PATH</span><span class="__shiki_mdbnqw">/an_metadata.dump&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">    tsdb</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 备份每个数据节点</span></span>
<span class="line"><span class="__shiki_140thh">NODES</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;dn1&quot;</span><span class="__shiki_mdbnqw"> &quot;dn2&quot;</span><span class="__shiki_mdbnqw"> &quot;dn3&quot;</span><span class="__shiki_mdbnqw"> &quot;dn4&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> NODE </span><span class="__shiki_1itgoe">in</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">NODES</span><span class="__shiki_mdbnqw">[</span><span class="__shiki_1itgoe">@</span><span class="__shiki_mdbnqw">]}&quot;</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;Backing up data node: </span><span class="__shiki_140thh">$NODE</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 获取节点上的hypertable列表</span></span>
<span class="line"><span class="__shiki_140thh">    TABLES</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">psql</span><span class="__shiki_dzsirb"> -h</span><span class="__shiki_mdbnqw"> an1</span><span class="__shiki_dzsirb"> -U</span><span class="__shiki_mdbnqw"> postgres</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_mdbnqw"> tsdb</span><span class="__shiki_dzsirb"> -t</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">        -c</span><span class="__shiki_mdbnqw"> &quot;SELECT hypertable_name </span></span>
<span class="line"><span class="__shiki_mdbnqw">            FROM timescaledb_information.hypertables </span></span>
<span class="line"><span class="__shiki_mdbnqw">            WHERE data_nodes @&gt; ARRAY[&#39;</span><span class="__shiki_140thh">$NODE</span><span class="__shiki_mdbnqw">&#39;];&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 备份每个hypertable</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> TABLE </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> $TABLES; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;  Backing up hypertable: </span><span class="__shiki_140thh">$TABLE</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 使用timescaledb-backup工具</span></span>
<span class="line"><span class="__shiki_1t8gfj">        timescaledb-backup</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">            --host</span><span class="__shiki_140thh"> $NODE </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_dzsirb">            --port</span><span class="__shiki_dzsirb"> 5432</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">            --database</span><span class="__shiki_mdbnqw"> tsdb</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">            --table</span><span class="__shiki_140thh"> $TABLE </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_dzsirb">            --output</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$BACKUP_PATH</span><span class="__shiki_mdbnqw">/\${</span><span class="__shiki_140thh">NODE</span><span class="__shiki_mdbnqw">}_\${</span><span class="__shiki_140thh">TABLE</span><span class="__shiki_mdbnqw">}.backup&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">            --compress</span></span>
<span class="line"><span class="__shiki_1itgoe">    done</span></span>
<span class="line"><span class="__shiki_1itgoe">done</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 备份配置</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;Backing up configurations...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">pg_dumpall</span><span class="__shiki_dzsirb"> -h</span><span class="__shiki_mdbnqw"> an1</span><span class="__shiki_dzsirb"> -U</span><span class="__shiki_mdbnqw"> postgres</span><span class="__shiki_dzsirb"> --globals-only</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    -f</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$BACKUP_PATH</span><span class="__shiki_mdbnqw">/globals.dump&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 创建备份清单</span></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$BACKUP_PATH</span><span class="__shiki_mdbnqw">/manifest.json&quot;</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">{</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;backup_date&quot;: &quot;$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_dzsirb"> -Iseconds</span><span class="__shiki_mdbnqw">)&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;cluster_version&quot;: &quot;$(</span><span class="__shiki_1t8gfj">psql</span><span class="__shiki_dzsirb"> -h</span><span class="__shiki_mdbnqw"> an1 </span><span class="__shiki_dzsirb">-U</span><span class="__shiki_mdbnqw"> postgres </span><span class="__shiki_dzsirb">-d</span><span class="__shiki_mdbnqw"> tsdb </span><span class="__shiki_dzsirb">-t</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_mdbnqw"> &#39;SELECT version()&#39;)&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;timescale_version&quot;: &quot;$(</span><span class="__shiki_1t8gfj">psql</span><span class="__shiki_dzsirb"> -h</span><span class="__shiki_mdbnqw"> an1 </span><span class="__shiki_dzsirb">-U</span><span class="__shiki_mdbnqw"> postgres </span><span class="__shiki_dzsirb">-d</span><span class="__shiki_mdbnqw"> tsdb </span><span class="__shiki_dzsirb">-t</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_mdbnqw"> &#39;SELECT extversion FROM pg_extension WHERE extname = \\&quot;timescaledb\\&quot;&#39;)&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;nodes&quot;: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">        {&quot;name&quot;: &quot;an1&quot;, &quot;role&quot;: &quot;access&quot;},</span></span>
<span class="line"><span class="__shiki_mdbnqw">        {&quot;name&quot;: &quot;dn1&quot;, &quot;role&quot;: &quot;data&quot;},</span></span>
<span class="line"><span class="__shiki_mdbnqw">        {&quot;name&quot;: &quot;dn2&quot;, &quot;role&quot;: &quot;data&quot;},</span></span>
<span class="line"><span class="__shiki_mdbnqw">        {&quot;name&quot;: &quot;dn3&quot;, &quot;role&quot;: &quot;data&quot;},</span></span>
<span class="line"><span class="__shiki_mdbnqw">        {&quot;name&quot;: &quot;dn4&quot;, &quot;role&quot;: &quot;data&quot;}</span></span>
<span class="line"><span class="__shiki_mdbnqw">    ],</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;files&quot;: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">        $(</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$BACKUP_PATH</span><span class="__shiki_mdbnqw">&quot; </span><span class="__shiki_dzsirb">-type</span><span class="__shiki_mdbnqw"> f </span><span class="__shiki_dzsirb">-printf</span><span class="__shiki_mdbnqw"> &#39;&quot;%f&quot;,\\n&#39; </span><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> sed</span><span class="__shiki_mdbnqw"> &#39;$ s/,$//&#39;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    ]</span></span>
<span class="line"><span class="__shiki_mdbnqw">}</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;Backup completed: </span><span class="__shiki_140thh">$BACKUP_PATH</span><span class="__shiki_mdbnqw">&quot;</span></span></code></pre></div><h4 id="_6-2-2-分布式恢复流程" tabindex="-1">6.2.2 分布式恢复流程 <a class="header-anchor" href="#_6-2-2-分布式恢复流程" aria-label="Permalink to &quot;6.2.2 分布式恢复流程&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 灾难恢复过程</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 恢复访问节点元数据</span></span>
<span class="line"><span class="__shiki_140thh">pg_restore </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">h new</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">an1 </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">U postgres </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">d tsdb </span><span class="__shiki_21nrsd">--clean --if-exists an_metadata.dump</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 重新配置数据节点</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> add_data_node(</span><span class="__shiki_mdbnqw">&#39;new-dn1&#39;</span><span class="__shiki_140thh">, host </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;new-dn1&#39;</span><span class="__shiki_140thh">, port </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> 5432</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> add_data_node(</span><span class="__shiki_mdbnqw">&#39;new-dn2&#39;</span><span class="__shiki_140thh">, host </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;new-dn2&#39;</span><span class="__shiki_140thh">, port </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> 5432</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_21nrsd">-- ... 添加所有数据节点</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 恢复数据节点</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 在每个数据节点上执行</span></span>
<span class="line"><span class="__shiki_140thh">timescaledb</span><span class="__shiki_1itgoe">-restore</span><span class="__shiki_140thh"> \\</span></span>
<span class="line"><span class="__shiki_21nrsd">    --host new-dn1 \\</span></span>
<span class="line"><span class="__shiki_21nrsd">    --port 5432 \\</span></span>
<span class="line"><span class="__shiki_21nrsd">    --database tsdb \\</span></span>
<span class="line"><span class="__shiki_21nrsd">    --input &quot;dn1_metrics.backup&quot; \\</span></span>
<span class="line"><span class="__shiki_21nrsd">    --parallel 4</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 重新附加数据节点到超表</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> attach_data_node(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;new-dn1&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    hypertable </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;distributed_metrics&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    if_not_attached </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> true</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 验证数据完整性</span></span>
<span class="line"><span class="__shiki_140thh">DO $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    expected_count </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    actual_count </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 比较备份前后的数据量</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> expected_count</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> backup_metadata</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> backup_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;backup_001&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> actual_count</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> distributed_metrics;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_140thh"> expected_count </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> actual_count </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_140thh">        RAISE EXCEPTION </span><span class="__shiki_mdbnqw">&#39;Data integrity check failed: expected %, got %&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            expected_count, actual_count;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;Data integrity verified: % rows&#39;</span><span class="__shiki_140thh">, actual_count;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh"> $$;</span></span></code></pre></div><h2 id="七、监控与运维" tabindex="-1">七、监控与运维 <a class="header-anchor" href="#七、监控与运维" aria-label="Permalink to &quot;七、监控与运维&quot;">​</a></h2><h3 id="_7-1-集群健康监控" tabindex="-1">7.1 集群健康监控 <a class="header-anchor" href="#_7-1-集群健康监控" aria-label="Permalink to &quot;7.1 集群健康监控&quot;">​</a></h3><h4 id="_7-1-1-监控仪表板查询" tabindex="-1">7.1.1 监控仪表板查询 <a class="header-anchor" href="#_7-1-1-监控仪表板查询" aria-label="Permalink to &quot;7.1.1 监控仪表板查询&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 集群概览仪表板</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> cluster_stats </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 节点状态</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;node_status&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> metric,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> value</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        jsonb_agg(jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;node_name&#39;</span><span class="__shiki_140thh">, node_name,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;available&#39;</span><span class="__shiki_140thh">, available,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;role&#39;</span><span class="__shiki_140thh">, node_role</span></span>
<span class="line"><span class="__shiki_140thh">        )) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> details</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">data_nodes</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    UNION ALL</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 存储使用</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;total_storage_gb&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        SUM</span><span class="__shiki_140thh">(total_bytes) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh">^</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        jsonb_agg(jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;node_name&#39;</span><span class="__shiki_140thh">, node_name,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;storage_gb&#39;</span><span class="__shiki_140thh">, total_bytes </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh">^</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        ))</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">data_node_disk_stats</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    UNION ALL</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 查询性能</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;avg_query_latency_ms&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        AVG</span><span class="__shiki_140thh">(mean_time),</span></span>
<span class="line"><span class="__shiki_140thh">        jsonb_agg(jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;query_type&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">LEFT</span><span class="__shiki_140thh">(query, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;latency_ms&#39;</span><span class="__shiki_140thh">, mean_time,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;calls&#39;</span><span class="__shiki_140thh">, calls</span></span>
<span class="line"><span class="__shiki_140thh">        ))</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_stat_statements</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%distributed_metrics%&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    UNION ALL</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 副本健康度</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;healthy_replica_percent&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">FILTER</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> replica_count </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        jsonb_agg(jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;chunk_name&#39;</span><span class="__shiki_140thh">, chunk_name,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;replica_count&#39;</span><span class="__shiki_140thh">, replica_count,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;status&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">CASE</span><span class="__shiki_1itgoe"> WHEN</span><span class="__shiki_140thh"> replica_count </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;healthy&#39;</span><span class="__shiki_1itgoe"> ELSE</span><span class="__shiki_mdbnqw"> &#39;under_replicated&#39;</span><span class="__shiki_1itgoe"> END</span></span>
<span class="line"><span class="__shiki_140thh">        ))</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunk_replica_status</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> metric, </span><span class="__shiki_dzsirb">ROUND</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> value</span><span class="__shiki_140thh">, details</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> cluster_stats;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 实时监控告警</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> check_cluster_health</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (alert_level </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">, alert_message </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">, metric_value </span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 节点宕机检测</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;CRITICAL&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;Data node unavailable: &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> node_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">        1</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">data_nodes</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_140thh"> available;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 存储空间不足</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;WARNING&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;Low disk space on &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> node_name </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;: &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> ROUND</span><span class="__shiki_140thh">(used_percent, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;%&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        used_percent</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">data_node_disk_stats</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> used_percent </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 85</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 副本不足</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;WARNING&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;Under-replicated chunks: &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39; chunks&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">numeric</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunk_replica_status</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> replica_count </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 查询性能下降</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;WARNING&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;Slow queries detected: P95 latency = &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> ROUND</span><span class="__shiki_140thh">(p95_latency, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;ms&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        p95_latency</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_dzsirb"> percentile_cont</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">95</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">WITHIN</span><span class="__shiki_dzsirb"> GROUP</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> mean_time) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> p95_latency</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_stat_statements</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%distributed_metrics%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">          AND</span><span class="__shiki_140thh"> calls </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">stats</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> p95_latency </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">-- 超过1秒</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh"> $$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span></code></pre></div><h4 id="_7-1-2-prometheus监控集成" tabindex="-1">7.1.2 Prometheus监控集成 <a class="header-anchor" href="#_7-1-2-prometheus监控集成" aria-label="Permalink to &quot;7.1.2 Prometheus监控集成&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># timescale-prometheus配置</span></span>
<span class="line"><span class="__shiki_17hn0y">global</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  scrape_interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">15s</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">scrape_configs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">job_name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;timescale-access-node&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    static_configs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">targets</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;an1:9187&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    metrics_path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/metrics</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">job_name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;timescale-data-nodes&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    static_configs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">targets</span><span class="__shiki_140thh">: </span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">&#39;dn1:9187&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">&#39;dn2:9187&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">&#39;dn3:9187&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">&#39;dn4:9187&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    metrics_path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/metrics</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">job_name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;postgres-exporter&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    static_configs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">targets</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">&#39;an1:9187&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">&#39;dn1:9187&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">&#39;dn2:9187&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">&#39;dn3:9187&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">&#39;dn4:9187&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    metrics_path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/postgres/metrics</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 关键监控指标</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. timescaledb_chunks_total</span></span>
<span class="line"><span class="__shiki_21nrsd"># 2. timescaledb_hypertable_size_bytes</span></span>
<span class="line"><span class="__shiki_21nrsd"># 3. timescaledb_compression_ratio</span></span>
<span class="line"><span class="__shiki_21nrsd"># 4. postgres_connections_total</span></span>
<span class="line"><span class="__shiki_21nrsd"># 5. postgres_wal_bytes</span></span></code></pre></div><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 自定义监控指标导出</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> export_cluster_metrics</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (metric_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">, metric_value </span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_140thh">, labels JSONB) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 分片分布指标</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;timescaledb_shard_distribution&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        jsonb_build_object(</span><span class="__shiki_mdbnqw">&#39;node&#39;</span><span class="__shiki_140thh">, node_name)</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> unnest(data_nodes) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> node_name</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunks</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> hypertable_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;distributed_metrics&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    ) shards</span></span>
<span class="line"><span class="__shiki_1itgoe">    GROUP BY</span><span class="__shiki_140thh"> node_name;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 查询性能指标</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;timescaledb_query_performance&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        mean_time,</span></span>
<span class="line"><span class="__shiki_140thh">        jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;query_type&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">                WHEN</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%SELECT%&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;select&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">                WHEN</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%INSERT%&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;insert&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">                WHEN</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%UPDATE%&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;update&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">                ELSE</span><span class="__shiki_mdbnqw"> &#39;other&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            END</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;distributed&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">                WHEN</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%distributed_%&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;true&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">                ELSE</span><span class="__shiki_mdbnqw"> &#39;false&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            END</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_stat_statements</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> calls </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_140thh"> mean_time </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 副本状态指标</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;timescaledb_replica_health&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;status&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">                WHEN</span><span class="__shiki_140thh"> replica_count </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;healthy&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">                WHEN</span><span class="__shiki_140thh"> replica_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;warning&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">                ELSE</span><span class="__shiki_mdbnqw"> &#39;critical&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            END</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunk_replica_status</span></span>
<span class="line"><span class="__shiki_1itgoe">    GROUP BY</span><span class="__shiki_1itgoe"> CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> replica_count </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;healthy&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> replica_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;warning&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_mdbnqw"> &#39;critical&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh"> $$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span></code></pre></div><h3 id="_7-2-性能调优与容量规划" tabindex="-1">7.2 性能调优与容量规划 <a class="header-anchor" href="#_7-2-性能调优与容量规划" aria-label="Permalink to &quot;7.2 性能调优与容量规划&quot;">​</a></h3><h4 id="_7-2-1-分布式性能调优" tabindex="-1">7.2.1 分布式性能调优 <a class="header-anchor" href="#_7-2-1-分布式性能调优" aria-label="Permalink to &quot;7.2.1 分布式性能调优&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查询性能分析</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, DISTSQL, </span><span class="__shiki_1itgoe">VERBOSE</span><span class="__shiki_140thh">, BUFFERS)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    device_id,</span></span>
<span class="line"><span class="__shiki_140thh">    time_bucket(</span><span class="__shiki_mdbnqw">&#39;1 hour&#39;</span><span class="__shiki_140thh">, ts) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> hour</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    AVG</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_value</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> distributed_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> ts </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_1itgoe"> NOW</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;7 days&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> metric </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;temperature&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> device_id, </span><span class="__shiki_1itgoe">hour</span></span>
<span class="line"><span class="__shiki_1itgoe">HAVING</span><span class="__shiki_dzsirb"> AVG</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 30</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_1itgoe"> hour</span><span class="__shiki_1itgoe"> DESC</span><span class="__shiki_140thh">, device_id;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 性能问题诊断</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 检查是否所有分片都参与查询</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 检查谓词下推是否生效</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 检查聚合下推是否生效</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 检查数据倾斜</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 分布式查询优化技巧</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 技巧1：增加分片数以减少热点</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> alter_distributed_hypertable(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;distributed_metrics&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    shard_count </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> 64</span><span class="__shiki_21nrsd">  -- 增加分片数</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 技巧2：调整副本放置策略</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> set_replica_placement_policy(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;distributed_metrics&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    policy</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_mdbnqw"> &#39;load_aware&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 技巧3：查询重写优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 原始查询</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> distributed_metrics </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> device_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1001</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> ts </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 优化后（利用时间分区）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> distributed_metrics </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> device_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1001</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> ts </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_1itgoe"> NOW</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;7 days&#39;</span><span class="__shiki_21nrsd">  -- 添加时间限制</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> ts </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 技巧4：批量写入优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用COPY而不是多次INSERT</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> distributed_metrics </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_mdbnqw"> &#39;/path/to/data.csv&#39;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (FORMAT csv, HEADER true);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 或使用预准备语句批量插入</span></span>
<span class="line"><span class="__shiki_140thh">PREPARE insert_metric (</span><span class="__shiki_1itgoe">timestamptz</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">float</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> distributed_metrics </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> ($</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, $</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, $</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">, $</span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 批量执行</span></span>
<span class="line"><span class="__shiki_1itgoe">EXECUTE</span><span class="__shiki_140thh"> insert_metric(</span><span class="__shiki_1itgoe">NOW</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">1001</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;temperature&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">23</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">EXECUTE</span><span class="__shiki_140thh"> insert_metric(</span><span class="__shiki_1itgoe">NOW</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">1002</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;humidity&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">65</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_21nrsd">-- ...</span></span></code></pre></div><h4 id="_7-2-2-容量规划与扩展" tabindex="-1">7.2.2 容量规划与扩展 <a class="header-anchor" href="#_7-2-2-容量规划与扩展" aria-label="Permalink to &quot;7.2.2 容量规划与扩展&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 容量预测模型</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> predict_capacity_needs</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    p_months_ahead </span><span class="__shiki_1itgoe">INT</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 12</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    month_date </span><span class="__shiki_1itgoe">DATE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    estimated_size_gb </span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    recommended_nodes </span><span class="__shiki_1itgoe">INT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    recommended_shards </span><span class="__shiki_1itgoe">INT</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    daily_growth_gb </span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    current_size_gb </span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    avg_chunk_size_gb </span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 计算当前大小和日增长</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        SUM</span><span class="__shiki_140thh">(total_bytes) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh">^</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_dzsirb">        AVG</span><span class="__shiki_140thh">(total_bytes) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh">^</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    INTO</span><span class="__shiki_140thh"> current_size_gb, avg_chunk_size_gb</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> hypertable_detailed_size(</span><span class="__shiki_mdbnqw">&#39;distributed_metrics&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 计算日增长率（基于历史数据）</span></span>
<span class="line"><span class="__shiki_1itgoe">    WITH</span><span class="__shiki_140thh"> daily_stats </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            date_trunc(</span><span class="__shiki_mdbnqw">&#39;day&#39;</span><span class="__shiki_140thh">, ts) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> day</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> daily_rows,</span></span>
<span class="line"><span class="__shiki_140thh">            pg_total_relation_size(</span><span class="__shiki_mdbnqw">&#39;distributed_metrics&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> daily_size</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> distributed_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> ts </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_1itgoe"> NOW</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;30 days&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        GROUP BY</span><span class="__shiki_1itgoe"> day</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        AVG</span><span class="__shiki_140thh">(daily_size </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> LAG</span><span class="__shiki_140thh">(daily_size) </span><span class="__shiki_1itgoe">OVER</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_1itgoe"> day</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh">^</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    INTO</span><span class="__shiki_140thh"> daily_growth_gb</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> daily_stats;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 生成预测</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    WITH</span><span class="__shiki_140thh"> months </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">            generate_series</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                CURRENT_DATE,</span></span>
<span class="line"><span class="__shiki_140thh">                CURRENT_DATE </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> (p_months_ahead </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39; months&#39;</span><span class="__shiki_140thh">)::INTERVAL,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;1 month&#39;</span><span class="__shiki_140thh">::INTERVAL</span></span>
<span class="line"><span class="__shiki_140thh">            )::</span><span class="__shiki_1itgoe">DATE</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> month_date</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        m</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">month_date</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 指数增长模型</span></span>
<span class="line"><span class="__shiki_140thh">        current_size_gb </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> POWER</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> (daily_growth_gb </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> NULLIF</span><span class="__shiki_140thh">(current_size_gb, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)), </span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_dzsirb">m</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">month_date</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> CURRENT_DATE)::</span><span class="__shiki_1itgoe">INT</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> estimated_size_gb,</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 推荐节点数（每节点建议不超过2TB）</span></span>
<span class="line"><span class="__shiki_140thh">        CEIL(current_size_gb </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> POWER</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> (daily_growth_gb </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> NULLIF</span><span class="__shiki_140thh">(current_size_gb, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)), </span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_dzsirb">m</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">month_date</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> CURRENT_DATE)::</span><span class="__shiki_1itgoe">INT</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 2000</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> recommended_nodes,</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 推荐分片数（每节点建议8-16个分片）</span></span>
<span class="line"><span class="__shiki_140thh">        CEIL(current_size_gb </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> POWER</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> (daily_growth_gb </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> NULLIF</span><span class="__shiki_140thh">(current_size_gb, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)), </span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_dzsirb">m</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">month_date</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> CURRENT_DATE)::</span><span class="__shiki_1itgoe">INT</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 2000</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 12</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> recommended_shards</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> months m;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh"> $$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用预测模型</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> predict_capacity_needs(</span><span class="__shiki_dzsirb">12</span><span class="__shiki_140thh">);</span></span></code></pre></div><h2 id="八、安全与权限管理" tabindex="-1">八、安全与权限管理 <a class="header-anchor" href="#八、安全与权限管理" aria-label="Permalink to &quot;八、安全与权限管理&quot;">​</a></h2><h3 id="_8-1-分布式安全架构" tabindex="-1">8.1 分布式安全架构 <a class="header-anchor" href="#_8-1-分布式安全架构" aria-label="Permalink to &quot;8.1 分布式安全架构&quot;">​</a></h3><h4 id="_8-1-1-网络层安全" tabindex="-1">8.1.1 网络层安全 <a class="header-anchor" href="#_8-1-1-网络层安全" aria-label="Permalink to &quot;8.1.1 网络层安全&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. SSL/TLS加密配置</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 在postgresql.conf中配置</span></span>
<span class="line"><span class="__shiki_1itgoe">ssl</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> on</span></span>
<span class="line"><span class="__shiki_140thh">ssl_cert_file </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;/ssl/cert.pem&#39;</span></span>
<span class="line"><span class="__shiki_140thh">ssl_key_file </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;/ssl/key.pem&#39;</span></span>
<span class="line"><span class="__shiki_140thh">ssl_ca_file </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;/ssl/ca.pem&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 节点间认证</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用双向SSL认证</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SYSTEM</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_dzsirb"> timescaledb</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">data_node_ssl_mode</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;verify-full&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SYSTEM</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_dzsirb"> timescaledb</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">data_node_ssl_root_cert</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;/ssl/ca.pem&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 防火墙规则</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 只允许访问节点连接数据节点</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 只允许应用连接访问节点</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 连接限制</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 限制每个IP的连接数</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SYSTEM</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_dzsirb"> timescaledb</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">max_connections_per_node</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_8-1-2-数据加密" tabindex="-1">8.1.2 数据加密 <a class="header-anchor" href="#_8-1-2-数据加密" aria-label="Permalink to &quot;8.1.2 数据加密&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 透明数据加密（TDE）配置</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 需要企业版支持</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> enable_transparent_data_encryption();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 列级加密</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> EXTENSION </span><span class="__shiki_1itgoe">IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> pgcrypto;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 敏感数据加密存储</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> sensitive_metrics</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    device_id </span><span class="__shiki_1itgoe">INT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    metric_time </span><span class="__shiki_1itgoe">TIMESTAMPTZ</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 加密字段</span></span>
<span class="line"><span class="__shiki_1itgoe">    encrypted_value</span><span class="__shiki_1itgoe"> BYTEA</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    encryption_key_id </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    iv </span><span class="__shiki_1itgoe">BYTEA</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 加密函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> encrypt_metric_value</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    plain_text </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    key_id </span><span class="__shiki_1itgoe">TEXT</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> BYTEA</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    encryption_key </span><span class="__shiki_1itgoe">BYTEA</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    iv </span><span class="__shiki_1itgoe">BYTEA</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    encrypted</span><span class="__shiki_1itgoe"> BYTEA</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 从密钥管理服务获取密钥</span></span>
<span class="line"><span class="__shiki_140thh">    encryption_key :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> get_encryption_key(key_id);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 生成初始化向量</span></span>
<span class="line"><span class="__shiki_140thh">    iv :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> gen_random_bytes(</span><span class="__shiki_dzsirb">16</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 加密数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    encrypted</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pgp_sym_encrypt(</span></span>
<span class="line"><span class="__shiki_140thh">        plain_text,</span></span>
<span class="line"><span class="__shiki_140thh">        encryption_key,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;cipher-algo=aes256&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_1itgoe"> encrypted</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh"> $$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql </span><span class="__shiki_1itgoe">SECURITY</span><span class="__shiki_140thh"> DEFINER;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查询时解密</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> VIEW</span><span class="__shiki_1t8gfj"> decrypted_metrics</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    device_id,</span></span>
<span class="line"><span class="__shiki_140thh">    metric_time,</span></span>
<span class="line"><span class="__shiki_140thh">    pgp_sym_decrypt(</span></span>
<span class="line"><span class="__shiki_1itgoe">        encrypted_value</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        get_encryption_key(encryption_key_id)</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> decrypted_value</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> sensitive_metrics;</span></span></code></pre></div><h3 id="_8-2-权限与角色管理" tabindex="-1">8.2 权限与角色管理 <a class="header-anchor" href="#_8-2-权限与角色管理" aria-label="Permalink to &quot;8.2 权限与角色管理&quot;">​</a></h3><h4 id="_8-2-1-分布式权限模型" tabindex="-1">8.2.1 分布式权限模型 <a class="header-anchor" href="#_8-2-1-分布式权限模型" aria-label="Permalink to &quot;8.2.1 分布式权限模型&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建角色层次</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 超级用户（集群管理）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> ROLE</span><span class="__shiki_140thh"> cluster_admin </span><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> SUPERUSER </span><span class="__shiki_1itgoe">LOGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">GRANT</span><span class="__shiki_140thh"> ALL </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_1itgoe"> DATABASE</span><span class="__shiki_140thh"> tsdb </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> cluster_admin;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 应用用户（数据读写）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> ROLE</span><span class="__shiki_140thh"> app_user </span><span class="__shiki_1itgoe">WITH</span><span class="__shiki_1itgoe"> LOGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">GRANT</span><span class="__shiki_1itgoe"> CONNECT</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_1itgoe"> DATABASE</span><span class="__shiki_140thh"> tsdb </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> app_user;</span></span>
<span class="line"><span class="__shiki_1itgoe">GRANT</span><span class="__shiki_140thh"> USAGE </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_1itgoe"> SCHEMA</span><span class="__shiki_140thh"> public </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> app_user;</span></span>
<span class="line"><span class="__shiki_1itgoe">GRANT</span><span class="__shiki_1itgoe"> SELECT</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">INSERT</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> ALL TABLES </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_1itgoe"> SCHEMA</span><span class="__shiki_140thh"> public </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> app_user;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 只读用户（分析查询）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> ROLE</span><span class="__shiki_140thh"> analyst </span><span class="__shiki_1itgoe">WITH</span><span class="__shiki_1itgoe"> LOGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">GRANT</span><span class="__shiki_1itgoe"> CONNECT</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_1itgoe"> DATABASE</span><span class="__shiki_140thh"> tsdb </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> analyst;</span></span>
<span class="line"><span class="__shiki_1itgoe">GRANT</span><span class="__shiki_140thh"> USAGE </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_1itgoe"> SCHEMA</span><span class="__shiki_140thh"> public </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> analyst;</span></span>
<span class="line"><span class="__shiki_1itgoe">GRANT</span><span class="__shiki_1itgoe"> SELECT</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> ALL TABLES </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_1itgoe"> SCHEMA</span><span class="__shiki_140thh"> public </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> analyst;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 备份用户</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> ROLE</span><span class="__shiki_140thh"> backup_user </span><span class="__shiki_1itgoe">WITH</span><span class="__shiki_1itgoe"> LOGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">GRANT</span><span class="__shiki_1itgoe"> CONNECT</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_1itgoe"> DATABASE</span><span class="__shiki_140thh"> tsdb </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> backup_user;</span></span>
<span class="line"><span class="__shiki_1itgoe">GRANT</span><span class="__shiki_140thh"> USAGE </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_1itgoe"> SCHEMA</span><span class="__shiki_140thh"> public </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> backup_user;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 行级安全策略</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> distributed_metrics </span><span class="__shiki_1itgoe">ENABLE</span><span class="__shiki_1itgoe"> ROW</span><span class="__shiki_1itgoe"> LEVEL</span><span class="__shiki_1itgoe"> SECURITY</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 按租户隔离数据</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> POLICY</span><span class="__shiki_140thh"> tenant_isolation_policy </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> distributed_metrics</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_140thh"> ALL</span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> (tenant_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> current_setting(</span><span class="__shiki_mdbnqw">&#39;app.current_tenant&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">INT</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 列级权限</span></span>
<span class="line"><span class="__shiki_1itgoe">GRANT</span><span class="__shiki_1itgoe"> SELECT</span><span class="__shiki_140thh"> (ts, device_id, </span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> distributed_metrics </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> analyst;</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 隐藏tags列中的敏感信息</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> VIEW</span><span class="__shiki_1t8gfj"> metrics_secure</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    ts,</span></span>
<span class="line"><span class="__shiki_140thh">    device_id,</span></span>
<span class="line"><span class="__shiki_1itgoe">    value</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    tags </span><span class="__shiki_1itgoe">-</span><span class="__shiki_mdbnqw"> &#39;sensitive&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> tags  </span><span class="__shiki_21nrsd">-- 移除敏感字段</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> distributed_metrics;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">GRANT</span><span class="__shiki_1itgoe"> SELECT</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> metrics_secure </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> analyst;</span></span></code></pre></div><h4 id="_8-2-2-跨节点权限同步" tabindex="-1">8.2.2 跨节点权限同步 <a class="header-anchor" href="#_8-2-2-跨节点权限同步" aria-label="Permalink to &quot;8.2.2 跨节点权限同步&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 权限同步机制</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> sync_permissions_across_nodes()</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    node_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    sql_command </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 获取所有数据节点</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> node_name </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> node_name </span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">data_nodes</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 同步角色</span></span>
<span class="line"><span class="__shiki_1itgoe">        FOR</span><span class="__shiki_140thh"> sql_command </span><span class="__shiki_1itgoe">IN</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;CREATE ROLE %I %s;&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                rolname,</span></span>
<span class="line"><span class="__shiki_1itgoe">                CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">                    WHEN</span><span class="__shiki_140thh"> rolcanlogin </span><span class="__shiki_1itgoe">THEN</span><span class="__shiki_mdbnqw"> &#39;LOGIN&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">                    ELSE</span><span class="__shiki_mdbnqw"> &#39;NOLOGIN&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">                END</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_1itgoe">            FROM</span><span class="__shiki_140thh"> pg_roles</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHERE</span><span class="__shiki_140thh"> rolname </span><span class="__shiki_1itgoe">NOT</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;pg_%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">              AND</span><span class="__shiki_140thh"> rolname </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_mdbnqw"> &#39;postgres&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 在数据节点执行</span></span>
<span class="line"><span class="__shiki_140thh">            PERFORM run_command_on_data_nodes(</span></span>
<span class="line"><span class="__shiki_140thh">                node_name </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> node_name,</span></span>
<span class="line"><span class="__shiki_140thh">                command </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> sql_command</span></span>
<span class="line"><span class="__shiki_140thh">            );</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 同步表权限</span></span>
<span class="line"><span class="__shiki_1itgoe">        FOR</span><span class="__shiki_140thh"> sql_command </span><span class="__shiki_1itgoe">IN</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;GRANT %s ON TABLE %I.%I TO %I;&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                privilege_type,</span></span>
<span class="line"><span class="__shiki_140thh">                table_schema,</span></span>
<span class="line"><span class="__shiki_140thh">                table_name,</span></span>
<span class="line"><span class="__shiki_140thh">                grantee</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_1itgoe">            FROM</span><span class="__shiki_dzsirb"> information_schema</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">role_table_grants</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHERE</span><span class="__shiki_140thh"> table_schema </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;public&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">              AND</span><span class="__shiki_140thh"> grantee </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_mdbnqw"> &#39;postgres&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        LOOP</span></span>
<span class="line"><span class="__shiki_140thh">            PERFORM run_command_on_data_nodes(</span></span>
<span class="line"><span class="__shiki_140thh">                node_name </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> node_name,</span></span>
<span class="line"><span class="__shiki_140thh">                command </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> sql_command</span></span>
<span class="line"><span class="__shiki_140thh">            );</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh"> $$;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 定期同步权限</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> add_job(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;sync_permissions_across_nodes&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    schedule_interval </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;1 hour&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    config </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;{}&#39;</span><span class="__shiki_140thh">::jsonb</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h2 id="九、最佳实践与案例研究" tabindex="-1">九、最佳实践与案例研究 <a class="header-anchor" href="#九、最佳实践与案例研究" aria-label="Permalink to &quot;九、最佳实践与案例研究&quot;">​</a></h2><h3 id="_9-1-大型部署最佳实践" tabindex="-1">9.1 大型部署最佳实践 <a class="header-anchor" href="#_9-1-大型部署最佳实践" aria-label="Permalink to &quot;9.1 大型部署最佳实践&quot;">​</a></h3><h4 id="_9-1-1-百节点集群架构" tabindex="-1">9.1.1 百节点集群架构 <a class="header-anchor" href="#_9-1-1-百节点集群架构" aria-label="Permalink to &quot;9.1.1 百节点集群架构&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">超大规模集群架构示例：</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 区域：us-east-1</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── 访问节点层 (3节点，负载均衡)</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── 数据节点层 (30节点，分3个机架)</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── 副本策略：跨机架复制</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 区域：eu-west-1</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── 访问节点层 (2节点，只读副本)</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── 数据节点层 (20节点，异步复制)</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── 用途：灾难恢复和区域查询</span></span>
<span class="line"><span class="__shiki_wvjl67">└── 全局负载均衡器</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── 路由策略：地理位置路由</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── 健康检查：主动监控</span></span>
<span class="line"><span class="__shiki_wvjl67">    └── 故障转移：自动区域切换</span></span></code></pre></div><h4 id="_9-1-2-混合工作负载优化" tabindex="-1">9.1.2 混合工作负载优化 <a class="header-anchor" href="#_9-1-2-混合工作负载优化" aria-label="Permalink to &quot;9.1.2 混合工作负载优化&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 混合工作负载（写入密集型+分析查询）优化</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 写入节点专用</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> realtime_metrics</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 频繁写入的表</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">timescaledb</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">distributed</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> true);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 配置到高性能节点</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> attach_data_node(</span><span class="__shiki_mdbnqw">&#39;fast_ssd_node1&#39;</span><span class="__shiki_140thh">, hypertable </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;realtime_metrics&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> attach_data_node(</span><span class="__shiki_mdbnqw">&#39;fast_ssd_node2&#39;</span><span class="__shiki_140thh">, hypertable </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;realtime_metrics&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 分析节点专用</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> historical_analysis</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 分析查询的表</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">timescaledb</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">distributed</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> true);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> attach_data_node(</span><span class="__shiki_mdbnqw">&#39;high_mem_node1&#39;</span><span class="__shiki_140thh">, hypertable </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;historical_analysis&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> attach_data_node(</span><span class="__shiki_mdbnqw">&#39;high_mem_node2&#39;</span><span class="__shiki_140thh">, hypertable </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;historical_analysis&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 资源隔离配置</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 设置节点资源组</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> alter_data_node(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;fast_ssd_node1&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    metadata </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;{&quot;resource_group&quot;: &quot;write_optimized&quot;}&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> alter_data_node(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;high_mem_node1&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    metadata </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;{&quot;resource_group&quot;: &quot;read_optimized&quot;}&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 查询路由策略</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> route_queries_by_type</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    is_analytical </span><span class="__shiki_1itgoe">BOOLEAN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检测查询类型</span></span>
<span class="line"><span class="__shiki_140thh">    is_analytical :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> current_query() </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%GROUP BY%&#39;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">                    OR</span><span class="__shiki_140thh"> current_query() </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%JOIN%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">                    OR</span><span class="__shiki_140thh"> current_query() </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%ANALYZE%&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_140thh"> is_analytical </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_1itgoe">        RETURN</span><span class="__shiki_mdbnqw"> &#39;read_optimized&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ELSE</span></span>
<span class="line"><span class="__shiki_1itgoe">        RETURN</span><span class="__shiki_mdbnqw"> &#39;write_optimized&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh"> $$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 应用路由策略</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> set_query_routing_policy(</span><span class="__shiki_mdbnqw">&#39;route_queries_by_type&#39;</span><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_9-2-故障场景与恢复策略" tabindex="-1">9.2 故障场景与恢复策略 <a class="header-anchor" href="#_9-2-故障场景与恢复策略" aria-label="Permalink to &quot;9.2 故障场景与恢复策略&quot;">​</a></h3><h4 id="_9-2-1-典型故障处理" tabindex="-1">9.2.1 典型故障处理 <a class="header-anchor" href="#_9-2-1-典型故障处理" aria-label="Permalink to &quot;9.2.1 典型故障处理&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 场景1：数据节点完全故障</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 处理步骤：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 检测故障</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">data_nodes</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_140thh"> available;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 隔离故障节点</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> alter_data_node(</span><span class="__shiki_mdbnqw">&#39;failed_node&#39;</span><span class="__shiki_140thh">, available </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> false);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 重新分配分片</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> rebalance_distributed_hypertable(</span></span>
<span class="line"><span class="__shiki_140thh">    hypertable_name </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;distributed_metrics&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    excluded_nodes </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_1itgoe"> ARRAY</span><span class="__shiki_140thh">[&#39;failed_node&#39;]</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 修复后重新加入</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 恢复节点数据</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 重新配置副本</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> repair_chunk_replicas_for_node(</span><span class="__shiki_mdbnqw">&#39;recovered_node&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 重新启用节点</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> alter_data_node(</span><span class="__shiki_mdbnqw">&#39;recovered_node&#39;</span><span class="__shiki_140thh">, available </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> true);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 场景2：网络分区</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 处理步骤：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 检测分区</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> detect_network_partitions();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 暂停写入（防止脑裂）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> set_cluster_mode(</span><span class="__shiki_mdbnqw">&#39;read_only&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 解决网络问题</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 网络团队介入</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 数据一致性检查</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> verify_data_consistency();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 恢复写入</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> set_cluster_mode(</span><span class="__shiki_mdbnqw">&#39;read_write&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 场景3：访问节点故障</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 处理步骤：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 负载均衡器检测并切换到备用访问节点</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 检查备用节点元数据同步</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> verify_metadata_sync();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 应用重新连接（自动重试）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 修复主访问节点</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 计划切换回主节点</span></span></code></pre></div><h4 id="_9-2-2-灾难恢复演练" tabindex="-1">9.2.2 灾难恢复演练 <a class="header-anchor" href="#_9-2-2-灾难恢复演练" aria-label="Permalink to &quot;9.2.2 灾难恢复演练&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 定期灾难恢复演练脚本</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> disaster_recovery_drill()</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    drill_id UUID :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> gen_random_uuid();</span></span>
<span class="line"><span class="__shiki_140thh">    start_time </span><span class="__shiki_1itgoe">TIMESTAMPTZ</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> NOW</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    success </span><span class="__shiki_1itgoe">BOOLEAN</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true;</span></span>
<span class="line"><span class="__shiki_140thh">    error_message </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 记录演练开始</span></span>
<span class="line"><span class="__shiki_1itgoe">    INSERT INTO</span><span class="__shiki_140thh"> disaster_recovery_drills</span></span>
<span class="line"><span class="__shiki_1itgoe">    VALUES</span><span class="__shiki_140thh"> (drill_id, start_time, </span><span class="__shiki_1itgoe">NULL</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;in_progress&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 步骤1：创建测试环境快照</span></span>
<span class="line"><span class="__shiki_140thh">        PERFORM create_test_environment_snapshot();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 步骤2：模拟区域故障</span></span>
<span class="line"><span class="__shiki_140thh">        PERFORM simulate_region_failure(</span><span class="__shiki_mdbnqw">&#39;us-east-1&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 步骤3：触发故障转移</span></span>
<span class="line"><span class="__shiki_140thh">        PERFORM initiate_failover_to_dr_region(</span><span class="__shiki_mdbnqw">&#39;eu-west-1&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 步骤4：验证DR环境</span></span>
<span class="line"><span class="__shiki_1itgoe">        IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_140thh"> verify_dr_environment() </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_140thh">            RAISE EXCEPTION </span><span class="__shiki_mdbnqw">&#39;DR环境验证失败&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 步骤5：测试关键业务功能</span></span>
<span class="line"><span class="__shiki_140thh">        PERFORM test_critical_business_functions();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 步骤6：恢复主区域</span></span>
<span class="line"><span class="__shiki_140thh">        PERFORM failback_to_primary_region(</span><span class="__shiki_mdbnqw">&#39;us-east-1&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 步骤7：验证数据完整性</span></span>
<span class="line"><span class="__shiki_1itgoe">        IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_140thh"> verify_data_integrity() </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_140thh">            RAISE EXCEPTION </span><span class="__shiki_mdbnqw">&#39;数据完整性验证失败&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">    EXCEPTION </span><span class="__shiki_1itgoe">WHEN</span><span class="__shiki_140thh"> OTHERS </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_140thh">        success :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> false;</span></span>
<span class="line"><span class="__shiki_140thh">        error_message :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> SQLERRM;</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 恢复测试环境</span></span>
<span class="line"><span class="__shiki_140thh">        PERFORM restore_from_snapshot();</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 记录演练结果</span></span>
<span class="line"><span class="__shiki_1itgoe">    UPDATE</span><span class="__shiki_140thh"> disaster_recovery_drills</span></span>
<span class="line"><span class="__shiki_1itgoe">    SET</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        end_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> NOW</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_1itgoe">        status</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> CASE</span><span class="__shiki_1itgoe"> WHEN</span><span class="__shiki_140thh"> success </span><span class="__shiki_1itgoe">THEN</span><span class="__shiki_mdbnqw"> &#39;passed&#39;</span><span class="__shiki_1itgoe"> ELSE</span><span class="__shiki_mdbnqw"> &#39;failed&#39;</span><span class="__shiki_1itgoe"> END</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        error_message </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> error_message,</span></span>
<span class="line"><span class="__shiki_140thh">        duration </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> EXTRACT(EPOCH </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">NOW</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> start_time))</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> drill_id;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 生成演练报告</span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM generate_dr_drill_report(drill_id);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;灾难恢复演练完成: %&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_1itgoe">        CASE</span><span class="__shiki_1itgoe"> WHEN</span><span class="__shiki_140thh"> success </span><span class="__shiki_1itgoe">THEN</span><span class="__shiki_mdbnqw"> &#39;通过&#39;</span><span class="__shiki_1itgoe"> ELSE</span><span class="__shiki_mdbnqw"> &#39;失败: &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> error_message </span><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh"> $$;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 定期执行演练</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> add_job(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;disaster_recovery_drill&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    schedule_interval </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;90 days&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">-- 每季度一次</span></span>
<span class="line"><span class="__shiki_140thh">    config </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;{&quot;notification_email&quot;: &quot;sre-team@example.com&quot;}&#39;</span><span class="__shiki_140thh">::jsonb</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h2 id="十、未来发展与趋势" tabindex="-1">十、未来发展与趋势 <a class="header-anchor" href="#十、未来发展与趋势" aria-label="Permalink to &quot;十、未来发展与趋势&quot;">​</a></h2><h3 id="_10-1-timescaledb分布式路线图" tabindex="-1">10.1 TimescaleDB分布式路线图 <a class="header-anchor" href="#_10-1-timescaledb分布式路线图" aria-label="Permalink to &quot;10.1 TimescaleDB分布式路线图&quot;">​</a></h3><h4 id="_10-1-1-即将到来的特性" tabindex="-1">10.1.1 即将到来的特性 <a class="header-anchor" href="#_10-1-1-即将到来的特性" aria-label="Permalink to &quot;10.1.1 即将到来的特性&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">分布式架构演进方向：</span></span>
<span class="line"><span class="__shiki_wvjl67">1. 多租户增强：更好的租户隔离和QoS</span></span>
<span class="line"><span class="__shiki_wvjl67">2. 智能分片：基于ML的分片策略优化</span></span>
<span class="line"><span class="__shiki_wvjl67">3. 混合云部署：跨公有云和私有云部署</span></span>
<span class="line"><span class="__shiki_wvjl67">4. 无服务器架构：弹性伸缩，按使用付费</span></span>
<span class="line"><span class="__shiki_wvjl67">5. 边缘计算集成：边缘节点+云中心架构</span></span></code></pre></div><h4 id="_10-1-2-与云原生生态集成" tabindex="-1">10.1.2 与云原生生态集成 <a class="header-anchor" href="#_10-1-2-与云原生生态集成" aria-label="Permalink to &quot;10.1.2 与云原生生态集成&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Kubernetes部署示例（未来方向）</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">timescaledb.timescale.com/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TimescaleDBCluster</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">tsdb-cluster</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">6</span></span>
<span class="line"><span class="__shiki_17hn0y">  shards</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">48</span></span>
<span class="line"><span class="__shiki_17hn0y">  storage</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    size</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10Ti</span></span>
<span class="line"><span class="__shiki_17hn0y">    class</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">fast-ssd</span></span>
<span class="line"><span class="__shiki_17hn0y">  resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">16Gi</span></span>
<span class="line"><span class="__shiki_17hn0y">      cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">4</span></span>
<span class="line"><span class="__shiki_17hn0y">    limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">32Gi</span></span>
<span class="line"><span class="__shiki_17hn0y">      cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8</span></span>
<span class="line"><span class="__shiki_17hn0y">  autoscaling</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    minReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">    maxReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">12</span></span>
<span class="line"><span class="__shiki_17hn0y">    targetCPUUtilization</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">70</span></span>
<span class="line"><span class="__shiki_17hn0y">    targetMemoryUtilization</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_17hn0y">  backup</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    schedule</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;0 2 * * *&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    retention</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">30d</span></span></code></pre></div><h3 id="_10-2-性能基准与对比" tabindex="-1">10.2 性能基准与对比 <a class="header-anchor" href="#_10-2-性能基准与对比" aria-label="Permalink to &quot;10.2 性能基准与对比&quot;">​</a></h3><h4 id="_10-2-1-分布式性能基准" tabindex="-1">10.2.1 分布式性能基准 <a class="header-anchor" href="#_10-2-1-分布式性能基准" aria-label="Permalink to &quot;10.2.1 分布式性能基准&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 分布式性能测试框架</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> run_distributed_benchmark()</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    test_results JSONB;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 1. 写入性能测试</span></span>
<span class="line"><span class="__shiki_140thh">    test_results :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> test_write_performance(</span></span>
<span class="line"><span class="__shiki_140thh">        rows_per_second </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> 100000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        duration </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;5 minutes&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        concurrent_writers </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 2. 查询性能测试</span></span>
<span class="line"><span class="__shiki_140thh">    test_results :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> test_results </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> test_query_performance(</span></span>
<span class="line"><span class="__shiki_140thh">        query_types </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_1itgoe"> ARRAY</span><span class="__shiki_140thh">[&#39;point_lookup&#39;, &#39;range_scan&#39;, &#39;aggregation&#39;, &#39;join&#39;],</span></span>
<span class="line"><span class="__shiki_140thh">        scale_factor </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_21nrsd">  -- 数据量倍数</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 3. 扩展性测试</span></span>
<span class="line"><span class="__shiki_140thh">    test_results :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> test_results </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> test_scalability(</span></span>
<span class="line"><span class="__shiki_140thh">        start_nodes </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        end_nodes </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> 8</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        step </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> 2</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 4. 容错测试</span></span>
<span class="line"><span class="__shiki_140thh">    test_results :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> test_results </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> test_fault_tolerance(</span></span>
<span class="line"><span class="__shiki_140thh">        failure_scenarios </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_1itgoe"> ARRAY</span><span class="__shiki_140thh">[&#39;node_failure&#39;, &#39;network_partition&#39;, &#39;disk_full&#39;]</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 存储测试结果</span></span>
<span class="line"><span class="__shiki_1itgoe">    INSERT INTO</span><span class="__shiki_140thh"> benchmark_results </span></span>
<span class="line"><span class="__shiki_1itgoe">    VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">NOW</span><span class="__shiki_140thh">(), </span><span class="__shiki_mdbnqw">&#39;distributed_cluster&#39;</span><span class="__shiki_140thh">, test_results);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 生成性能报告</span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM generate_performance_report(test_results);</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh"> $$;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 典型性能指标</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 写入吞吐量：10万-100万行/秒</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 查询延迟：毫秒级点查询，秒级复杂分析</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 线性扩展：接近线性的读写扩展</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 故障恢复：分钟级自动故障转移</span></span></code></pre></div><h2 id="十一、总结与实施指南" tabindex="-1">十一、总结与实施指南 <a class="header-anchor" href="#十一、总结与实施指南" aria-label="Permalink to &quot;十一、总结与实施指南&quot;">​</a></h2><h3 id="_11-1-分布式部署检查清单" tabindex="-1">11.1 分布式部署检查清单 <a class="header-anchor" href="#_11-1-分布式部署检查清单" aria-label="Permalink to &quot;11.1 分布式部署检查清单&quot;">​</a></h3><p><strong>规划阶段：</strong></p><ul><li>[ ] 确定数据规模和增长预测</li><li>[ ] 选择合适的分片键和分区策略</li><li>[ ] 设计网络拓扑和安全架构</li><li>[ ] 规划存储和备份策略</li></ul><p><strong>部署阶段：</strong></p><ul><li>[ ] 配置访问节点和数据节点</li><li>[ ] 设置副本和故障转移策略</li><li>[ ] 配置监控和告警系统</li><li>[ ] 实施安全和权限控制</li></ul><p><strong>优化阶段：</strong></p><ul><li>[ ] 监控性能并调整配置</li><li>[ ] 优化查询和索引策略</li><li>[ ] 实施数据生命周期管理</li><li>[ ] 定期进行容量规划</li></ul><h3 id="_11-2-关键成功因素" tabindex="-1">11.2 关键成功因素 <a class="header-anchor" href="#_11-2-关键成功因素" aria-label="Permalink to &quot;11.2 关键成功因素&quot;">​</a></h3><ol><li><strong>正确的分片设计</strong>：避免数据倾斜和热点</li><li><strong>适当的副本策略</strong>：平衡可用性和成本</li><li><strong>全面的监控</strong>：及时发现和解决问题</li><li><strong>自动化运维</strong>：减少人工操作错误</li><li><strong>定期演练</strong>：确保灾难恢复能力</li></ol><h3 id="_11-3-推荐架构模式" tabindex="-1">11.3 推荐架构模式 <a class="header-anchor" href="#_11-3-推荐架构模式" aria-label="Permalink to &quot;11.3 推荐架构模式&quot;">​</a></h3><p><strong>模式A：中小规模部署 (1-10TB)</strong></p><ul><li>3个数据节点 + 1个访问节点</li><li>副本因子2，跨机架部署</li><li>按时间+设备ID分片</li><li>每日备份，保留30天</li></ul><p><strong>模式B：大规模部署 (10-100TB)</strong></p><ul><li>10-30个数据节点 + 2-3个访问节点</li><li>副本因子3，跨可用区部署</li><li>智能分片，多级分区</li><li>实时监控，自动扩展</li></ul><p><strong>模式C：超大规模部署 (100TB+)</strong></p><ul><li>50+个数据节点 + 多个访问节点（区域化）</li><li>跨区域部署，全局负载均衡</li><li>混合存储，分层架构</li><li>多租户隔离，资源池化</li></ul><p>通过合理的分布式架构设计和实施，TimescaleDB能够支持从GB到PB级的时间序列数据处理，满足各种规模和复杂度的应用需求。</p><hr><p><strong>附录：常用分布式管理命令速查</strong></p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 集群管理</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">data_nodes</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> add_data_node(</span><span class="__shiki_mdbnqw">&#39;node_name&#39;</span><span class="__shiki_140thh">, host </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;hostname&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> delete_data_node(</span><span class="__shiki_mdbnqw">&#39;node_name&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">force</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> true);</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> rebalance_distributed_hypertable(</span><span class="__shiki_mdbnqw">&#39;hypertable_name&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 分片管理</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">chunks</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> move_chunk(</span><span class="__shiki_mdbnqw">&#39;chunk_name&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;source_node&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;destination_node&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> copy_chunk(</span><span class="__shiki_mdbnqw">&#39;chunk_name&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;source_node&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;destination_node&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 监控与诊断</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">distributed_query_stats</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_dzsirb"> timescaledb_information</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">cluster_health</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (DISTSQL) </span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> ...;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 备份与恢复</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> create_distributed_backup(</span><span class="__shiki_mdbnqw">&#39;backup_location&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> restore_distributed_backup(</span><span class="__shiki_mdbnqw">&#39;backup_location&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 性能调优</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> set_distributed_query_optimization(</span><span class="__shiki_mdbnqw">&#39;optimization_level&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> alter_data_node(</span><span class="__shiki_mdbnqw">&#39;node_name&#39;</span><span class="__shiki_140thh">, metadata </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;{&quot;resource_limit&quot;: &quot;high&quot;}&#39;</span><span class="__shiki_140thh">);</span></span></code></pre></div><p><strong>紧急故障处理流程：</strong></p><ol><li>确认故障范围和影响</li><li>隔离故障节点或区域</li><li>启动故障转移流程</li><li>恢复服务并验证完整性</li><li>根本原因分析和修复</li><li>恢复原架构和运行演练</li></ol>`,140)])])}const r=a(p,[["render",l]]);export{d as __pageData,r as default};
