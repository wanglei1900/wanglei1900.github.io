import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"大数据存储系统 - 数据湖架构 - Apache Iceberg表格式","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/bigdata/datalake/iceberg.md","filePath":"data/database/bigdata/datalake/iceberg.md"}'),p={name:"data/database/bigdata/datalake/iceberg.md"};function l(h,s,t,c,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="大数据存储系统-数据湖架构-apache-iceberg表格式" tabindex="-1">大数据存储系统 - 数据湖架构 - Apache Iceberg表格式 <a class="header-anchor" href="#大数据存储系统-数据湖架构-apache-iceberg表格式" aria-label="Permalink to &quot;大数据存储系统 - 数据湖架构 - Apache Iceberg表格式&quot;">​</a></h1><h2 id="详细学习笔记" tabindex="-1">详细学习笔记 <a class="header-anchor" href="#详细学习笔记" aria-label="Permalink to &quot;详细学习笔记&quot;">​</a></h2><hr><h2 id="一、apache-iceberg概述" tabindex="-1">一、Apache Iceberg概述 <a class="header-anchor" href="#一、apache-iceberg概述" aria-label="Permalink to &quot;一、Apache Iceberg概述&quot;">​</a></h2><h3 id="_1-1-起源与设计哲学" tabindex="-1">1.1 起源与设计哲学 <a class="header-anchor" href="#_1-1-起源与设计哲学" aria-label="Permalink to &quot;1.1 起源与设计哲学&quot;">​</a></h3><p><strong>诞生背景：</strong></p><ul><li>2017年由Netflix开发，2018年开源并捐赠给Apache基金会</li><li>解决传统Hive表格式在海量数据场景下的痛点</li><li>设计目标：提供高性能、可靠、开放的表格式标准</li></ul><p><strong>核心设计原则：</strong></p><ol><li><strong>隐藏分区</strong>：用户无需关心物理分区布局</li><li><strong>快照隔离</strong>：读写分离，保证一致性</li><li><strong>模式演进</strong>：向后兼容的schema变更</li><li><strong>多引擎支持</strong>：统一表格式，支持多种计算引擎</li><li><strong>高性能元数据</strong>：支持快速元数据操作</li></ol><h3 id="_1-2-与delta-lake的差异对比" tabindex="-1">1.2 与Delta Lake的差异对比 <a class="header-anchor" href="#_1-2-与delta-lake的差异对比" aria-label="Permalink to &quot;1.2 与Delta Lake的差异对比&quot;">​</a></h3><table tabindex="0"><thead><tr><th>维度</th><th>Apache Iceberg</th><th>Delta Lake</th></tr></thead><tbody><tr><td><strong>设计哲学</strong></td><td>计算与存储解耦</td><td>Spark生态系统紧密集成</td></tr><tr><td><strong>分区管理</strong></td><td>隐藏分区，分区演进</td><td>显式分区，分区覆盖</td></tr><tr><td><strong>事务模型</strong></td><td>乐观并发控制+快照</td><td>乐观并发控制</td></tr><tr><td><strong>元数据存储</strong></td><td>多级元数据（JSON/Avro）</td><td>事务日志（JSON）</td></tr><tr><td><strong>多引擎支持</strong></td><td>Spark, Flink, Trino, Hive</td><td>Spark为主，扩展有限</td></tr><tr><td><strong>文件格式</strong></td><td>支持Parquet, ORC, Avro</td><td>主要Parquet</td></tr><tr><td><strong>分区发现</strong></td><td>无需分区发现</td><td>需要分区发现</td></tr><tr><td><strong>社区生态</strong></td><td>跨引擎，厂商中立</td><td>与Databricks紧密绑定</td></tr></tbody></table><hr><h2 id="二、iceberg架构设计" tabindex="-1">二、Iceberg架构设计 <a class="header-anchor" href="#二、iceberg架构设计" aria-label="Permalink to &quot;二、Iceberg架构设计&quot;">​</a></h2><h3 id="_2-1-三层架构模型" tabindex="-1">2.1 三层架构模型 <a class="header-anchor" href="#_2-1-三层架构模型" aria-label="Permalink to &quot;2.1 三层架构模型&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                    Catalog Layer (目录层)                │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌─────────────────────────────────────────────────┐    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  Hive Catalog │  REST Catalog │  Nessie Catalog │    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └─────────────────────────────────────────────────┘    │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│                Metadata Layer (元数据层)                 │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌───────────┬─────────────┬─────────────┐              │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ Metadata  │ Manifest    │ Manifest    │              │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ JSON      │ List (Avro) │ File (Avro) │              │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └───────────┴─────────────┴─────────────┘              │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│                 Data Layer (数据层)                     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌───────────┬────────────┬─────────────┐               │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ Parquet   │ ORC        │ Avro        │               │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ Files     │ Files      │ Files       │               │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └───────────┴────────────┴─────────────┘               │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_2-2-核心组件详解" tabindex="-1">2.2 核心组件详解 <a class="header-anchor" href="#_2-2-核心组件详解" aria-label="Permalink to &quot;2.2 核心组件详解&quot;">​</a></h3><h4 id="_2-2-1-catalog-目录" tabindex="-1">2.2.1 Catalog（目录） <a class="header-anchor" href="#_2-2-1-catalog-目录" aria-label="Permalink to &quot;2.2.1 Catalog（目录）&quot;">​</a></h4><p><strong>支持的Catalog类型：</strong></p><ol><li><strong>Hive Catalog</strong>：使用Hive Metastore存储位置指针</li><li><strong>Hadoop Catalog</strong>：基于文件系统的目录（无外部元数据存储）</li><li><strong>REST Catalog</strong>：通过REST API访问</li><li><strong>Nessie Catalog</strong>：支持Git-like的分支和标签</li><li><strong>JDBC Catalog</strong>：基于关系数据库</li><li><strong>Glue Catalog</strong>：AWS Glue集成</li></ol><p><strong>Catalog存储内容：</strong></p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 目录中的表元数据指针</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;format-version&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;table-uuid&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;f6d9a8e7-c3b2-4a1d-8e5f-9a0b1c2d3e4f&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;location&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;s3://my-bucket/data/events&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;last-updated-ms&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1672531200000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;current-snapshot-id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">123456</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;last-sequence-number&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-2-2-元数据文件层次" tabindex="-1">2.2.2 元数据文件层次 <a class="header-anchor" href="#_2-2-2-元数据文件层次" aria-label="Permalink to &quot;2.2.2 元数据文件层次&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">events/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── data/                          # 数据文件目录</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── year=2023/</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │   ├── month=01/</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │   │   └── part-00000.parquet</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │   └── month=02/</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │       └── part-00001.parquet</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── year=2024/</span></span>
<span class="line"><span class="__shiki_wvjl67">│       └── month=01/</span></span>
<span class="line"><span class="__shiki_wvjl67">│           └── part-00002.parquet</span></span>
<span class="line"><span class="__shiki_wvjl67">└── metadata/                      # 元数据目录</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── v0.metadata.json          # 初始元数据文件</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── v1.metadata.json          # 第一次提交的元数据</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── v2.metadata.json          # 第二次提交的元数据</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── snap-123456.avro          # 快照123456的清单列表</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── snap-123457.avro          # 快照123457的清单列表</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── 00000-0-abc123.avro       # 清单文件</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── 00001-1-def456.avro       # 另一个清单文件</span></span>
<span class="line"><span class="__shiki_wvjl67">    └── version-hint.text         # 当前版本提示文件</span></span></code></pre></div><hr><h2 id="三、元数据系统详解" tabindex="-1">三、元数据系统详解 <a class="header-anchor" href="#三、元数据系统详解" aria-label="Permalink to &quot;三、元数据系统详解&quot;">​</a></h2><h3 id="_3-1-元数据版本演进" tabindex="-1">3.1 元数据版本演进 <a class="header-anchor" href="#_3-1-元数据版本演进" aria-label="Permalink to &quot;3.1 元数据版本演进&quot;">​</a></h3><p><strong>格式版本：</strong></p><ul><li><strong>v1</strong>：初始版本，基本功能</li><li><strong>v2</strong>：添加行级统计、删除文件等高级功能</li></ul><h3 id="_3-2-元数据文件-metadata-json" tabindex="-1">3.2 元数据文件（Metadata JSON） <a class="header-anchor" href="#_3-2-元数据文件-metadata-json" aria-label="Permalink to &quot;3.2 元数据文件（Metadata JSON）&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;format-version&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;table-uuid&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;uuid&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;location&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;s3://bucket/table&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;last-updated-ms&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1625097600000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;last-column-id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // Schema定义</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;schemas&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;schema-id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;struct&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;fields&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;name&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;id&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;long&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;required&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;doc&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Unique identifier&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;name&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;data&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;string&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;required&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;name&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;event_time&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;timestamp&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;required&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      ]</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  ],</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;current-schema-id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 分区规范</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;partition-specs&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;spec-id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;fields&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;name&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;day&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;transform&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;day&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;source-id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 指向event_time列</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;field-id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1000</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      ]</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  ],</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;default-partition-spec-id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;last-partition-id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 表属性</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;properties&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;write.format.default&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;parquet&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;read.split.target-size&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;134217728&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;write.metadata.compression-codec&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;gzip&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 快照信息</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;current-snapshot-id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">123456</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;snapshots&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;snapshot-id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">123456</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;timestamp-ms&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1625097600000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;summary&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">        &quot;operation&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;append&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        &quot;added-data-files&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;5&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        &quot;added-records&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1000000&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        &quot;added-files-size&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;5368709120&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;manifest-list&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;s3://bucket/table/metadata/snap-123456.avro&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;schema-id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  ],</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 快照日志</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;snapshot-log&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">    {</span><span class="__shiki_dzsirb">&quot;snapshot-id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">123456</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">&quot;timestamp-ms&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1625097600000</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">  ],</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 元数据日志（用于模式演进）</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;metadata-log&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;metadata-file&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;s3://bucket/table/metadata/v1.metadata.json&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;timestamp-ms&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1625097600000</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-3-清单列表-manifest-list" tabindex="-1">3.3 清单列表（Manifest List） <a class="header-anchor" href="#_3-3-清单列表-manifest-list" aria-label="Permalink to &quot;3.3 清单列表（Manifest List）&quot;">​</a></h3><p><strong>Avro格式存储，包含：</strong></p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">record ManifestFile {</span></span>
<span class="line"><span class="__shiki_2bbn9v">  string</span><span class="__shiki_2bbn9v"> manifest_path;</span><span class="__shiki_21nrsd">          // 清单文件路径</span></span>
<span class="line"><span class="__shiki_2bbn9v">  long</span><span class="__shiki_2bbn9v"> manifest_length;</span><span class="__shiki_21nrsd">          // 文件长度</span></span>
<span class="line"><span class="__shiki_2bbn9v">  int</span><span class="__shiki_2bbn9v"> partition_spec_id;</span><span class="__shiki_21nrsd">         // 分区规范ID</span></span>
<span class="line"><span class="__shiki_2bbn9v">  ManifestContent</span><span class="__shiki_2bbn9v"> content;</span><span class="__shiki_21nrsd">       // DATA或DELETES</span></span>
<span class="line"><span class="__shiki_2bbn9v">  long</span><span class="__shiki_2bbn9v"> sequence_number;</span><span class="__shiki_21nrsd">          // 序列号</span></span>
<span class="line"><span class="__shiki_2bbn9v">  long</span><span class="__shiki_2bbn9v"> min_sequence_number;</span><span class="__shiki_21nrsd">      // 最小序列号</span></span>
<span class="line"><span class="__shiki_2bbn9v">  int</span><span class="__shiki_2bbn9v"> added_snapshot_id;</span><span class="__shiki_21nrsd">         // 添加的快照ID</span></span>
<span class="line"><span class="__shiki_2bbn9v">  map&lt;long,</span><span class="__shiki_2bbn9v"> long&gt;</span><span class="__shiki_2bbn9v"> added_files;</span><span class="__shiki_21nrsd">   // 添加的文件计数</span></span>
<span class="line"><span class="__shiki_2bbn9v">  map&lt;long,</span><span class="__shiki_2bbn9v"> long&gt;</span><span class="__shiki_2bbn9v"> existing_files;</span><span class="__shiki_21nrsd">// 现有文件计数</span></span>
<span class="line"><span class="__shiki_2bbn9v">  map&lt;long,</span><span class="__shiki_2bbn9v"> long&gt;</span><span class="__shiki_2bbn9v"> deleted_files;</span><span class="__shiki_21nrsd"> // 删除的文件计数</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 分区范围</span></span>
<span class="line"><span class="__shiki_2bbn9v">  array&lt;long&gt;</span><span class="__shiki_2bbn9v"> partitions;</span><span class="__shiki_21nrsd">        // 分区值哈希</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 键元数据</span></span>
<span class="line"><span class="__shiki_2bbn9v">  map&lt;long,</span><span class="__shiki_2bbn9v"> ByteBuffer&gt;</span><span class="__shiki_2bbn9v"> key_metadata;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-4-清单文件-manifest-file" tabindex="-1">3.4 清单文件（Manifest File） <a class="header-anchor" href="#_3-4-清单文件-manifest-file" aria-label="Permalink to &quot;3.4 清单文件（Manifest File）&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">record ManifestEntry {</span></span>
<span class="line"><span class="__shiki_2bbn9v">  enum</span><span class="__shiki_2bbn9v"> Status</span><span class="__shiki_2bbn9v"> {</span></span>
<span class="line"><span class="__shiki_2bbn9v">    EXISTING,</span></span>
<span class="line"><span class="__shiki_2bbn9v">    ADDED,</span></span>
<span class="line"><span class="__shiki_2bbn9v">    DELETED</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  Status status;</span></span>
<span class="line"><span class="__shiki_140thh">  int snapshot_id;               </span><span class="__shiki_21nrsd">// 快照ID</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 数据文件信息</span></span>
<span class="line"><span class="__shiki_140thh">  DataFile data_file;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 序列号</span></span>
<span class="line"><span class="__shiki_140thh">  long sequence_number;</span></span>
<span class="line"><span class="__shiki_140thh">  long file_sequence_number;</span></span>
<span class="line"><span class="__shiki_140thh">  map&lt;long, long&gt; data_sequence_number;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">record DataFile {</span></span>
<span class="line"><span class="__shiki_2bbn9v">  string</span><span class="__shiki_2bbn9v"> file_path;</span><span class="__shiki_21nrsd">              // 文件路径</span></span>
<span class="line"><span class="__shiki_2bbn9v">  string</span><span class="__shiki_2bbn9v"> file_format;</span><span class="__shiki_21nrsd">            // 文件格式</span></span>
<span class="line"><span class="__shiki_2bbn9v">  PartitionData</span><span class="__shiki_2bbn9v"> partition;</span><span class="__shiki_21nrsd">       // 分区数据</span></span>
<span class="line"><span class="__shiki_2bbn9v">  long</span><span class="__shiki_2bbn9v"> record_count;</span><span class="__shiki_21nrsd">             // 记录数</span></span>
<span class="line"><span class="__shiki_2bbn9v">  long</span><span class="__shiki_2bbn9v"> file_size_in_bytes;</span><span class="__shiki_21nrsd">       // 文件大小</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 列级统计</span></span>
<span class="line"><span class="__shiki_2bbn9v">  map&lt;long,</span><span class="__shiki_2bbn9v"> ByteBuffer&gt;</span><span class="__shiki_2bbn9v"> column_sizes;</span></span>
<span class="line"><span class="__shiki_2bbn9v">  map&lt;long,</span><span class="__shiki_2bbn9v"> ByteBuffer&gt;</span><span class="__shiki_2bbn9v"> value_counts;</span></span>
<span class="line"><span class="__shiki_2bbn9v">  map&lt;long,</span><span class="__shiki_2bbn9v"> ByteBuffer&gt;</span><span class="__shiki_2bbn9v"> null_value_counts;</span></span>
<span class="line"><span class="__shiki_2bbn9v">  map&lt;long,</span><span class="__shiki_2bbn9v"> ByteBuffer&gt;</span><span class="__shiki_2bbn9v"> nan_value_counts;</span></span>
<span class="line"><span class="__shiki_2bbn9v">  map&lt;long,</span><span class="__shiki_2bbn9v"> ByteBuffer&gt;</span><span class="__shiki_2bbn9v"> lower_bounds;</span></span>
<span class="line"><span class="__shiki_2bbn9v">  map&lt;long,</span><span class="__shiki_2bbn9v"> ByteBuffer&gt;</span><span class="__shiki_2bbn9v"> upper_bounds;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 键元数据</span></span>
<span class="line"><span class="__shiki_2bbn9v">  map&lt;long,</span><span class="__shiki_2bbn9v"> ByteBuffer&gt;</span><span class="__shiki_2bbn9v"> key_metadata;</span></span>
<span class="line"><span class="__shiki_2bbn9v">  map&lt;long,</span><span class="__shiki_2bbn9v"> ByteBuffer&gt;</span><span class="__shiki_2bbn9v"> split_offsets;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 排序信息</span></span>
<span class="line"><span class="__shiki_2bbn9v">  map&lt;long,</span><span class="__shiki_2bbn9v"> Integer&gt;</span><span class="__shiki_2bbn9v"> sort_order_id;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><hr><h2 id="四、acid事务实现" tabindex="-1">四、ACID事务实现 <a class="header-anchor" href="#四、acid事务实现" aria-label="Permalink to &quot;四、ACID事务实现&quot;">​</a></h2><h3 id="_4-1-原子性保证" tabindex="-1">4.1 原子性保证 <a class="header-anchor" href="#_4-1-原子性保证" aria-label="Permalink to &quot;4.1 原子性保证&quot;">​</a></h3><p><strong>原子提交算法：</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> AtomicCommit</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> Snapshot </span><span class="__shiki_1t8gfj">commit</span><span class="__shiki_140thh">(TableMetadata </span><span class="__shiki_1jdh33">base</span><span class="__shiki_140thh">, List&lt;</span><span class="__shiki_1itgoe">DataFile</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">adds</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                          List&lt;</span><span class="__shiki_1itgoe">DataFile</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">deletes</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 1. 验证当前版本未被修改</span></span>
<span class="line"><span class="__shiki_140thh">        TableMetadata current </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> catalog.</span><span class="__shiki_1t8gfj">loadTable</span><span class="__shiki_140thh">(tableId);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">current.</span><span class="__shiki_1t8gfj">uuid</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">equals</span><span class="__shiki_140thh">(base.</span><span class="__shiki_1t8gfj">uuid</span><span class="__shiki_140thh">())) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> CommitFailedException</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Table was modified concurrently&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 2. 创建新清单文件</span></span>
<span class="line"><span class="__shiki_140thh">        ManifestFile manifest </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> writeManifest</span><span class="__shiki_140thh">(adds, deletes);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 3. 创建新清单列表</span></span>
<span class="line"><span class="__shiki_140thh">        ManifestList manifestList </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> writeManifestList</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            current.</span><span class="__shiki_1t8gfj">manifestListLocation</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            Collections.</span><span class="__shiki_1t8gfj">singletonList</span><span class="__shiki_140thh">(manifest)</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 4. 创建新元数据文件</span></span>
<span class="line"><span class="__shiki_1itgoe">        long</span><span class="__shiki_140thh"> newSnapshotId </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> current.</span><span class="__shiki_1t8gfj">currentSnapshotId</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        TableMetadata newMetadata </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> TableMetadata.</span><span class="__shiki_1t8gfj">buildFrom</span><span class="__shiki_140thh">(current)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">setCurrentSnapshotId</span><span class="__shiki_140thh">(newSnapshotId)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">addSnapshot</span><span class="__shiki_140thh">(newSnapshotId, manifestList.</span><span class="__shiki_1t8gfj">location</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">build</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 5. 原子性写入新元数据文件</span></span>
<span class="line"><span class="__shiki_140thh">        String newMetadataFile </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> writeMetadataFile</span><span class="__shiki_140thh">(newMetadata);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 6. 原子性更新Catalog指针</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            catalog.</span><span class="__shiki_1t8gfj">commitTable</span><span class="__shiki_140thh">(base.</span><span class="__shiki_1t8gfj">uuid</span><span class="__shiki_140thh">(), current.</span><span class="__shiki_1t8gfj">metadataLocation</span><span class="__shiki_140thh">(), </span></span>
<span class="line"><span class="__shiki_140thh">                              newMetadataFile);</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Snapshot</span><span class="__shiki_140thh">(newSnapshotId, manifestList);</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (CommitStateUnknownException </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 不确定状态，需要手动检查</span></span>
<span class="line"><span class="__shiki_1t8gfj">            checkCommitState</span><span class="__shiki_140thh">(newMetadataFile);</span></span>
<span class="line"><span class="__shiki_1itgoe">            throw</span><span class="__shiki_140thh"> e;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-快照隔离" tabindex="-1">4.2 快照隔离 <a class="header-anchor" href="#_4-2-快照隔离" aria-label="Permalink to &quot;4.2 快照隔离&quot;">​</a></h3><p><strong>读隔离级别：</strong></p><ul><li><strong>Snapshot Isolation</strong>：默认隔离级别</li><li><strong>Serializable</strong>：可配置的严格隔离</li></ul><p><strong>并发控制机制：</strong></p><div class="language-scala vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">scala</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> SnapshotIsolation</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  def</span><span class="__shiki_1t8gfj"> readTransaction</span><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">T</span><span class="__shiki_140thh">](</span><span class="__shiki_1jdh33">table</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">Table</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">snapshotId</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">Option</span><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">Long</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> None</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                       (</span><span class="__shiki_1jdh33">fn</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">Snapshot</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> T</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> T</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取指定或当前快照</span></span>
<span class="line"><span class="__shiki_1itgoe">    val</span><span class="__shiki_1jdh33"> snapshot</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> snapshotId </span><span class="__shiki_1itgoe">match</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_1t8gfj"> Some</span><span class="__shiki_140thh">(id) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> table.snapshot(id)</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_1t8gfj"> None</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> table.currentSnapshot()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 基于快照创建只读视图</span></span>
<span class="line"><span class="__shiki_1itgoe">    val</span><span class="__shiki_1jdh33"> readView</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> ReadView</span><span class="__shiki_140thh">(snapshot)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 执行读取操作</span></span>
<span class="line"><span class="__shiki_140thh">    fn(readView)</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  def</span><span class="__shiki_1t8gfj"> writeTransaction</span><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">T</span><span class="__shiki_140thh">](</span><span class="__shiki_1jdh33">table</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">Table</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">retries</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">Int</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                        (</span><span class="__shiki_1jdh33">fn</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">Table</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> T</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> T</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_1jdh33"> attempt</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">    while</span><span class="__shiki_140thh"> (attempt </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> retries) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 加载当前表状态</span></span>
<span class="line"><span class="__shiki_1itgoe">        val</span><span class="__shiki_1jdh33"> currentMetadata</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> table.refresh()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 执行写入逻辑（产生添加/删除的文件列表）</span></span>
<span class="line"><span class="__shiki_1itgoe">        val</span><span class="__shiki_1jdh33"> writeResult</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> fn(table)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 尝试提交</span></span>
<span class="line"><span class="__shiki_1itgoe">        val</span><span class="__shiki_1jdh33"> newSnapshot</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> commit(table, currentMetadata, </span></span>
<span class="line"><span class="__shiki_140thh">                               writeResult.adds, writeResult.deletes)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> writeResult</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1jdh33"> e</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">CommitFailedException</span><span class="__shiki_1itgoe"> =&gt;</span></span>
<span class="line"><span class="__shiki_140thh">          attempt </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">          if</span><span class="__shiki_140thh"> (attempt </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> retries) </span><span class="__shiki_1itgoe">throw</span><span class="__shiki_140thh"> e</span></span>
<span class="line"><span class="__shiki_1t8gfj">          Thread</span><span class="__shiki_140thh">.sleep(backoffTime(attempt))</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> CommitFailedException</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">s</span><span class="__shiki_mdbnqw">&quot;Failed after </span><span class="__shiki_140thh">$retries</span><span class="__shiki_mdbnqw"> attempts&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-3-乐观并发控制" tabindex="-1">4.3 乐观并发控制 <a class="header-anchor" href="#_4-3-乐观并发控制" aria-label="Permalink to &quot;4.3 乐观并发控制&quot;">​</a></h3><p><strong>冲突检测矩阵：</strong></p><table tabindex="0"><thead><tr><th>操作类型</th><th>盲追加</th><th>覆盖写</th><th>行级更新</th><th>模式变更</th></tr></thead><tbody><tr><td>盲追加</td><td>无冲突</td><td>冲突</td><td>冲突</td><td>无冲突</td></tr><tr><td>覆盖写</td><td>冲突</td><td>冲突</td><td>冲突</td><td>无冲突</td></tr><tr><td>行级更新</td><td>冲突</td><td>冲突</td><td>冲突</td><td>无冲突</td></tr><tr><td>模式变更</td><td>无冲突</td><td>无冲突</td><td>无冲突</td><td>冲突</td></tr></tbody></table><p><strong>重试策略：</strong></p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> optimistic_write_with_retry</span><span class="__shiki_140thh">(table, write_fn, max_retries</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> attempt </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(max_retries):</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 加载当前表状态</span></span>
<span class="line"><span class="__shiki_140thh">            table.refresh()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 执行写入操作，生成待添加/删除的文件</span></span>
<span class="line"><span class="__shiki_140thh">            adds, deletes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> write_fn(table)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 尝试提交</span></span>
<span class="line"><span class="__shiki_140thh">            table.new_transaction() \\</span></span>
<span class="line"><span class="__shiki_140thh">                .append_files(adds) \\</span></span>
<span class="line"><span class="__shiki_140thh">                .delete_files(deletes) \\</span></span>
<span class="line"><span class="__shiki_140thh">                .commit()</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        except</span><span class="__shiki_140thh"> CommitFailedException </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> e:</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> attempt </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> max_retries </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                raise</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 指数退避</span></span>
<span class="line"><span class="__shiki_140thh">            backoff </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">2</span><span class="__shiki_1itgoe"> **</span><span class="__shiki_140thh"> attempt) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_21nrsd">  # 毫秒</span></span>
<span class="line"><span class="__shiki_140thh">            time.sleep(backoff </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1000.0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> False</span></span></code></pre></div><hr><h2 id="五、分区与数据布局" tabindex="-1">五、分区与数据布局 <a class="header-anchor" href="#五、分区与数据布局" aria-label="Permalink to &quot;五、分区与数据布局&quot;">​</a></h2><h3 id="_5-1-隐藏分区机制" tabindex="-1">5.1 隐藏分区机制 <a class="header-anchor" href="#_5-1-隐藏分区机制" aria-label="Permalink to &quot;5.1 隐藏分区机制&quot;">​</a></h3><p><strong>分区转换函数：</strong></p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 内置转换函数</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 时间相关</span></span>
<span class="line"><span class="__shiki_dzsirb">year</span><span class="__shiki_140thh">(ts)        </span><span class="__shiki_21nrsd">-- 按年分区</span></span>
<span class="line"><span class="__shiki_dzsirb">month</span><span class="__shiki_140thh">(ts)       </span><span class="__shiki_21nrsd">-- 按月分区</span></span>
<span class="line"><span class="__shiki_dzsirb">day</span><span class="__shiki_140thh">(ts)         </span><span class="__shiki_21nrsd">-- 按天分区</span></span>
<span class="line"><span class="__shiki_1itgoe">hour</span><span class="__shiki_140thh">(ts)        </span><span class="__shiki_21nrsd">-- 按小时分区</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 哈希相关</span></span>
<span class="line"><span class="__shiki_140thh">bucket(N, col)  </span><span class="__shiki_21nrsd">-- 哈希分区，N个桶</span></span>
<span class="line"><span class="__shiki_1itgoe">truncate</span><span class="__shiki_140thh">(L, col) </span><span class="__shiki_21nrsd">-- 截断字符串，L长度</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 值相关</span></span>
<span class="line"><span class="__shiki_dzsirb">identity</span><span class="__shiki_140thh">(col)   </span><span class="__shiki_21nrsd">-- 原值分区（传统方式）</span></span>
<span class="line"><span class="__shiki_140thh">void(col)       </span><span class="__shiki_21nrsd">-- 不分区（用于演进）</span></span></code></pre></div><p><strong>隐藏分区示例：</strong></p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建带隐藏分区的表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> events</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    event_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    user_id </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    data</span><span class="__shiki_140thh"> STRING</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> iceberg</span></span>
<span class="line"><span class="__shiki_140thh">PARTITIONED </span><span class="__shiki_1itgoe">BY</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    days</span><span class="__shiki_140thh">(event_time),        </span><span class="__shiki_21nrsd">-- 按天分区，用户无需知道</span></span>
<span class="line"><span class="__shiki_140thh">    bucket(</span><span class="__shiki_dzsirb">16</span><span class="__shiki_140thh">, user_id)      </span><span class="__shiki_21nrsd">-- 哈希分区，用户无需知道</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查询时自动分区剪枝</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> events </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> event_time </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_mdbnqw"> &#39;2023-01-01&#39;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> event_time </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_mdbnqw"> &#39;2023-01-02&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">-- Iceberg自动使用分区信息进行剪枝</span></span></code></pre></div><h3 id="_5-2-分区演进" tabindex="-1">5.2 分区演进 <a class="header-anchor" href="#_5-2-分区演进" aria-label="Permalink to &quot;5.2 分区演进&quot;">​</a></h3><p><strong>分区规范演进：</strong></p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 初始分区规范</span></span>
<span class="line"><span class="__shiki_21nrsd">-- spec_id=0: days(event_time)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 添加新的分区规范</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> events </span></span>
<span class="line"><span class="__shiki_1itgoe">ADD</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> FIELD bucket(</span><span class="__shiki_dzsirb">16</span><span class="__shiki_140thh">, user_id);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 现在有两个分区规范：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- spec_id=0: days(event_time)</span></span>
<span class="line"><span class="__shiki_21nrsd">-- spec_id=1: days(event_time), bucket(16, user_id)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查询时自动合并</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> events </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> event_time </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_mdbnqw"> &#39;2023-01-01&#39;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> user_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 123</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">-- Iceberg同时查询两个分区规范的数据</span></span></code></pre></div><p><strong>演进规则：</strong></p><ol><li>新数据使用新分区规范</li><li>旧数据保持原有分区规范</li><li>查询时自动合并所有分区规范的数据</li><li>支持最多1000个分区字段</li></ol><h3 id="_5-3-数据排序与聚类" tabindex="-1">5.3 数据排序与聚类 <a class="header-anchor" href="#_5-3-数据排序与聚类" aria-label="Permalink to &quot;5.3 数据排序与聚类&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建排序表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> sorted_events</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    user_id </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    event_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    event_type STRING,</span></span>
<span class="line"><span class="__shiki_1itgoe">    data</span><span class="__shiki_140thh"> STRING</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> iceberg</span></span>
<span class="line"><span class="__shiki_140thh">PARTITIONED </span><span class="__shiki_1itgoe">BY</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">days</span><span class="__shiki_140thh">(event_time))</span></span>
<span class="line"><span class="__shiki_140thh">LOCALLY SORTED </span><span class="__shiki_1itgoe">BY</span><span class="__shiki_140thh"> (user_id, event_time);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 写入时排序</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> sorted_events</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> source</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> user_id, event_time;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- Z-Order聚类（多维度聚类）</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_dzsirb"> catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">system</span><span class="__shiki_140thh">.rewrite_data_files(</span></span>
<span class="line"><span class="__shiki_1itgoe">  table</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_mdbnqw"> &#39;db.sorted_events&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  strategy </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;sort&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  sort_order </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;zorder(user_id, event_type)&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><hr><h2 id="六、模式演进与兼容性" tabindex="-1">六、模式演进与兼容性 <a class="header-anchor" href="#六、模式演进与兼容性" aria-label="Permalink to &quot;六、模式演进与兼容性&quot;">​</a></h2><h3 id="_6-1-模式演进操作" tabindex="-1">6.1 模式演进操作 <a class="header-anchor" href="#_6-1-模式演进操作" aria-label="Permalink to &quot;6.1 模式演进操作&quot;">​</a></h3><p><strong>完整的演进支持：</strong></p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 添加列（支持默认值）</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> events </span><span class="__shiki_1itgoe">ADD</span><span class="__shiki_140thh"> COLUMN new_column STRING </span></span>
<span class="line"><span class="__shiki_140thh">COMMENT </span><span class="__shiki_mdbnqw">&#39;New column added&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">AFTER</span><span class="__shiki_140thh"> existing_column;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> events </span><span class="__shiki_1itgoe">ADD</span><span class="__shiki_140thh"> COLUMN optional_column </span><span class="__shiki_1itgoe">INT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">DEFAULT</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 删除列</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> events </span><span class="__shiki_1itgoe">DROP</span><span class="__shiki_140thh"> COLUMN old_column;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 重命名列</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> events RENAME COLUMN old_name </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> new_name;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 更新列类型（需兼容）</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> events </span><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_140thh"> COLUMN small_int </span><span class="__shiki_1itgoe">TYPE</span><span class="__shiki_1itgoe"> INT</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 更新列注释</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> events </span><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_140thh"> COLUMN column_name </span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> COMMENT </span><span class="__shiki_mdbnqw">&#39;Updated comment&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 重排序列顺序</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> events </span><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_140thh"> COLUMN column_name </span><span class="__shiki_1itgoe">FIRST</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> events </span><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_140thh"> COLUMN column_name </span><span class="__shiki_1itgoe">AFTER</span><span class="__shiki_140thh"> other_column;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 7. 设置列是否可为空</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> events </span><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_140thh"> COLUMN column_name </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_6-2-兼容性规则" tabindex="-1">6.2 兼容性规则 <a class="header-anchor" href="#_6-2-兼容性规则" aria-label="Permalink to &quot;6.2 兼容性规则&quot;">​</a></h3><p><strong>类型兼容性矩阵：</strong></p><table tabindex="0"><thead><tr><th>原始类型</th><th>可演进为</th><th>条件</th></tr></thead><tbody><tr><td>int → long</td><td>✓</td><td>总是兼容</td></tr><tr><td>float → double</td><td>✓</td><td>总是兼容</td></tr><tr><td>decimal(p,s) → decimal(p&#39;,s&#39;)</td><td>✓</td><td>p&#39; ≥ p, s&#39; ≥ s</td></tr><tr><td>string → binary</td><td>✓</td><td>读取时转换</td></tr><tr><td>struct → struct</td><td>✓</td><td>字段兼容</td></tr><tr><td>list → list</td><td>✓</td><td>元素类型兼容</td></tr><tr><td>map → map</td><td>✓</td><td>键值类型兼容</td></tr></tbody></table><p><strong>读取兼容性保证：</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> SchemaEvolution</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> Schema </span><span class="__shiki_1t8gfj">resolve</span><span class="__shiki_140thh">(Schema </span><span class="__shiki_1jdh33">readSchema</span><span class="__shiki_140thh">, Schema </span><span class="__shiki_1jdh33">tableSchema</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 按ID匹配列，而非名称</span></span>
<span class="line"><span class="__shiki_140thh">        Map&lt;</span><span class="__shiki_1itgoe">Integer</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Types</span><span class="__shiki_140thh">.</span><span class="__shiki_1itgoe">NestedField</span><span class="__shiki_140thh">&gt; readFields </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            readSchema.</span><span class="__shiki_1t8gfj">columns</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">stream</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">collect</span><span class="__shiki_140thh">(Collectors.</span><span class="__shiki_1t8gfj">toMap</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                    Types.NestedField</span><span class="__shiki_1itgoe">::</span><span class="__shiki_140thh">fieldId, </span></span>
<span class="line"><span class="__shiki_140thh">                    Function.</span><span class="__shiki_1t8gfj">identity</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                ));</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        Map&lt;</span><span class="__shiki_1itgoe">Integer</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Types</span><span class="__shiki_140thh">.</span><span class="__shiki_1itgoe">NestedField</span><span class="__shiki_140thh">&gt; tableFields </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            tableSchema.</span><span class="__shiki_1t8gfj">columns</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">stream</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">collect</span><span class="__shiki_140thh">(Collectors.</span><span class="__shiki_1t8gfj">toMap</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                    Types.NestedField</span><span class="__shiki_1itgoe">::</span><span class="__shiki_140thh">fieldId, </span></span>
<span class="line"><span class="__shiki_140thh">                    Function.</span><span class="__shiki_1t8gfj">identity</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                ));</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 构建解析后的schema</span></span>
<span class="line"><span class="__shiki_140thh">        List&lt;</span><span class="__shiki_1itgoe">Types</span><span class="__shiki_140thh">.</span><span class="__shiki_1itgoe">NestedField</span><span class="__shiki_140thh">&gt; resolvedFields </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (Types.NestedField readField </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> readSchema.</span><span class="__shiki_1t8gfj">columns</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            int</span><span class="__shiki_140thh"> fieldId </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> readField.</span><span class="__shiki_1t8gfj">fieldId</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (tableFields.</span><span class="__shiki_1t8gfj">containsKey</span><span class="__shiki_140thh">(fieldId)) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 列存在，检查类型兼容性</span></span>
<span class="line"><span class="__shiki_140thh">                Types.NestedField tableField </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tableFields.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(fieldId);</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">isCompatible</span><span class="__shiki_140thh">(readField.</span><span class="__shiki_1t8gfj">type</span><span class="__shiki_140thh">(), tableField.</span><span class="__shiki_1t8gfj">type</span><span class="__shiki_140thh">())) {</span></span>
<span class="line"><span class="__shiki_140thh">                    resolvedFields.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(tableField);</span></span>
<span class="line"><span class="__shiki_140thh">                } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> IllegalArgumentException</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;Incompatible type for field &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> readField.</span><span class="__shiki_1t8gfj">name</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (readField.</span><span class="__shiki_1t8gfj">isOptional</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 可选列不存在，设为null</span></span>
<span class="line"><span class="__shiki_140thh">                resolvedFields.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(readField);</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> IllegalArgumentException</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;Required field missing: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> readField.</span><span class="__shiki_1t8gfj">name</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Schema</span><span class="__shiki_140thh">(resolvedFields);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><hr><h2 id="七、时间旅行与版本管理" tabindex="-1">七、时间旅行与版本管理 <a class="header-anchor" href="#七、时间旅行与版本管理" aria-label="Permalink to &quot;七、时间旅行与版本管理&quot;">​</a></h2><h3 id="_7-1-快照管理" tabindex="-1">7.1 快照管理 <a class="header-anchor" href="#_7-1-快照管理" aria-label="Permalink to &quot;7.1 快照管理&quot;">​</a></h3><p><strong>快照创建流程：</strong></p><div class="language-scala vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">scala</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> SnapshotManager</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  def</span><span class="__shiki_1t8gfj"> createSnapshot</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1jdh33">    table</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">Table</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    operation</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">String</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    adds</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">Seq</span><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">DataFile</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_1jdh33">    deletes</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">Seq</span><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">DataFile</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  )</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Snapshot</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    val</span><span class="__shiki_1jdh33"> snapshotId</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> generateSnapshotId()</span></span>
<span class="line"><span class="__shiki_1itgoe">    val</span><span class="__shiki_1jdh33"> timestamp</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> System</span><span class="__shiki_140thh">.currentTimeMillis()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 创建清单文件</span></span>
<span class="line"><span class="__shiki_1itgoe">    val</span><span class="__shiki_1jdh33"> manifestFiles</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> writesManifests(adds, deletes)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 创建清单列表</span></span>
<span class="line"><span class="__shiki_1itgoe">    val</span><span class="__shiki_1jdh33"> manifestList</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> writeManifestList(manifestFiles)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 创建快照</span></span>
<span class="line"><span class="__shiki_1itgoe">    val</span><span class="__shiki_1jdh33"> snapshot</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> Snapshot</span><span class="__shiki_140thh">.builder()</span></span>
<span class="line"><span class="__shiki_140thh">      .withSnapshotId(snapshotId)</span></span>
<span class="line"><span class="__shiki_140thh">      .withTimestamp(timestamp)</span></span>
<span class="line"><span class="__shiki_140thh">      .withOperation(operation)</span></span>
<span class="line"><span class="__shiki_140thh">      .withManifestListLocation(manifestList.location())</span></span>
<span class="line"><span class="__shiki_140thh">      .withSummary(buildSummary(adds, deletes))</span></span>
<span class="line"><span class="__shiki_140thh">      .build()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 更新表元数据</span></span>
<span class="line"><span class="__shiki_140thh">    table.update()</span></span>
<span class="line"><span class="__shiki_140thh">      .setCurrentSnapshot(snapshot)</span></span>
<span class="line"><span class="__shiki_140thh">      .addSnapshot(snapshot)</span></span>
<span class="line"><span class="__shiki_140thh">      .commit()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    snapshot</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-时间旅行查询" tabindex="-1">7.2 时间旅行查询 <a class="header-anchor" href="#_7-2-时间旅行查询" aria-label="Permalink to &quot;7.2 时间旅行查询&quot;">​</a></h3><p><strong>多种时间旅行方式：</strong></p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 按快照ID查询</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> events </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VERSION</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> OF </span><span class="__shiki_dzsirb">123456</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 按时间戳查询</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> events </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> TIMESTAMP</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> OF </span><span class="__shiki_mdbnqw">&#39;2023-01-01 12:00:00&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> events </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> TIMESTAMP</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> OF </span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;1&#39;</span><span class="__shiki_1itgoe"> hour</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 按相对时间查询</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> events </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> TIMESTAMP</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> OF </span><span class="__shiki_dzsirb">current_timestamp</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;2&#39;</span><span class="__shiki_1itgoe"> days</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 使用DataFrame API（Spark）</span></span>
<span class="line"><span class="__shiki_dzsirb">spark</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">read</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_dzsirb">format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;iceberg&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1itgoe">option</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;snapshot-id&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">123456</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1itgoe">load</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;table_path&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">spark</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">read</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_dzsirb">format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;iceberg&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1itgoe">option</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;as-of-timestamp&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;2023-01-01 12:00:00&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1itgoe">load</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;table_path&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 增量查询（读取两个快照之间的变化）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> events </span></span>
<span class="line"><span class="__shiki_1itgoe">  FOR</span><span class="__shiki_1itgoe"> VERSION</span><span class="__shiki_1itgoe"> BETWEEN</span><span class="__shiki_dzsirb"> 123456</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_dzsirb"> 123460</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">  WHERE</span><span class="__shiki_140thh"> operation </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;INSERT&#39;</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_7-3-快照过期与清理" tabindex="-1">7.3 快照过期与清理 <a class="header-anchor" href="#_7-3-快照过期与清理" aria-label="Permalink to &quot;7.3 快照过期与清理&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 过期快照清理（保留最近7天）</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_dzsirb"> catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">system</span><span class="__shiki_140thh">.expire_snapshots(</span></span>
<span class="line"><span class="__shiki_1itgoe">  table</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_mdbnqw"> &#39;db.events&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  older_than </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;7&#39;</span><span class="__shiki_1itgoe"> days</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  retain_last </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_21nrsd">  -- 至少保留最近10个快照</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 查看快照信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_dzsirb"> catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">system</span><span class="__shiki_140thh">.snapshots </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> table_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;db.events&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 手动删除快照</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_dzsirb"> catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">system</span><span class="__shiki_140thh">.remove_snapshots(</span></span>
<span class="line"><span class="__shiki_1itgoe">  table</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_mdbnqw"> &#39;db.events&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  snapshot_ids </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_1itgoe"> ARRAY</span><span class="__shiki_140thh">[123456, 123457]</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 清理孤立文件（不再被引用的数据文件）</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_dzsirb"> catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">system</span><span class="__shiki_140thh">.remove_orphan_files(</span></span>
<span class="line"><span class="__shiki_1itgoe">  table</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_mdbnqw"> &#39;db.events&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  older_than </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;7&#39;</span><span class="__shiki_1itgoe"> days</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><hr><h2 id="八、性能优化技术" tabindex="-1">八、性能优化技术 <a class="header-anchor" href="#八、性能优化技术" aria-label="Permalink to &quot;八、性能优化技术&quot;">​</a></h2><h3 id="_8-1-元数据优化" tabindex="-1">8.1 元数据优化 <a class="header-anchor" href="#_8-1-元数据优化" aria-label="Permalink to &quot;8.1 元数据优化&quot;">​</a></h3><p><strong>清单文件优化：</strong></p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 重写清单文件，优化元数据</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_dzsirb"> catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">system</span><span class="__shiki_140thh">.rewrite_manifests(</span></span>
<span class="line"><span class="__shiki_1itgoe">  table</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_mdbnqw"> &#39;db.large_table&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  use_caching </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> true</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 合并小清单文件</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_dzsirb"> catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">system</span><span class="__shiki_140thh">.rewrite_manifests(</span></span>
<span class="line"><span class="__shiki_1itgoe">  table</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_mdbnqw"> &#39;db.large_table&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  min_files_to_compact </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  max_manifest_size_mb </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> 512</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_8-2-数据文件优化" tabindex="-1">8.2 数据文件优化 <a class="header-anchor" href="#_8-2-数据文件优化" aria-label="Permalink to &quot;8.2 数据文件优化&quot;">​</a></h3><p><strong>数据文件重写（Compaction）：</strong></p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 合并小文件</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_dzsirb"> catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">system</span><span class="__shiki_140thh">.rewrite_data_files(</span></span>
<span class="line"><span class="__shiki_1itgoe">  table</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_mdbnqw"> &#39;db.events&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  strategy </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;binpack&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  min_file_size_mb </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> 128</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  max_file_size_mb </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> 512</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  max_concurrent_file_groups </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 排序重写（提高查询性能）</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_dzsirb"> catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">system</span><span class="__shiki_140thh">.rewrite_data_files(</span></span>
<span class="line"><span class="__shiki_1itgoe">  table</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_mdbnqw"> &#39;db.events&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  strategy </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;sort&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  sort_order </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;user_id, event_time&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  min_file_size_mb </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> 128</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  max_file_size_mb </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> 512</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. Z-Order聚类（多维排序）</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_dzsirb"> catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">system</span><span class="__shiki_140thh">.rewrite_data_files(</span></span>
<span class="line"><span class="__shiki_1itgoe">  table</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_mdbnqw"> &#39;db.events&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  strategy </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;sort&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  sort_order </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &#39;zorder(user_id, event_type, event_date)&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  min_file_size_mb </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> 128</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  max_file_size_mb </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> 512</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_8-3-谓词下推优化" tabindex="-1">8.3 谓词下推优化 <a class="header-anchor" href="#_8-3-谓词下推优化" aria-label="Permalink to &quot;8.3 谓词下推优化&quot;">​</a></h3><p><strong>统计信息利用：</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> PredicatePushdown</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">DataFile</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">filterFiles</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        List&lt;</span><span class="__shiki_1itgoe">ManifestFile</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">manifests</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        Expression </span><span class="__shiki_1jdh33">predicate</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> manifests.</span><span class="__shiki_1t8gfj">parallelStream</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">flatMap</span><span class="__shiki_140thh">(manifest </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_1t8gfj"> readManifest</span><span class="__shiki_140thh">(manifest).</span><span class="__shiki_1t8gfj">stream</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(entry </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                DataFile file </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> entry.</span><span class="__shiki_1t8gfj">file</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 1. 分区过滤</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_1t8gfj">partitionMatches</span><span class="__shiki_140thh">(file.</span><span class="__shiki_1t8gfj">partition</span><span class="__shiki_140thh">(), predicate)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 2. 列统计过滤（最小值/最大值）</span></span>
<span class="line"><span class="__shiki_140thh">                Map&lt;</span><span class="__shiki_1itgoe">Integer</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">ByteBuffer</span><span class="__shiki_140thh">&gt; lowerBounds </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> file.</span><span class="__shiki_1t8gfj">lowerBounds</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                Map&lt;</span><span class="__shiki_1itgoe">Integer</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">ByteBuffer</span><span class="__shiki_140thh">&gt; upperBounds </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> file.</span><span class="__shiki_1t8gfj">upperBounds</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                for</span><span class="__shiki_140thh"> (Expression conjunct </span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> extractConjuncts</span><span class="__shiki_140thh">(predicate)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> (conjunct </span><span class="__shiki_1itgoe">instanceof</span><span class="__shiki_140thh"> Predicate) {</span></span>
<span class="line"><span class="__shiki_140thh">                        Predicate pred </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (Predicate) conjunct;</span></span>
<span class="line"><span class="__shiki_1itgoe">                        int</span><span class="__shiki_140thh"> fieldId </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pred.</span><span class="__shiki_1t8gfj">ref</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">fieldId</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_1itgoe">                        if</span><span class="__shiki_140thh"> (lowerBounds.</span><span class="__shiki_1t8gfj">containsKey</span><span class="__shiki_140thh">(fieldId) </span><span class="__shiki_1itgoe">&amp;&amp;</span></span>
<span class="line"><span class="__shiki_140thh">                            upperBounds.</span><span class="__shiki_1t8gfj">containsKey</span><span class="__shiki_140thh">(fieldId)) {</span></span>
<span class="line"><span class="__shiki_140thh">                            </span></span>
<span class="line"><span class="__shiki_140thh">                            Object min </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> deserialize</span><span class="__shiki_140thh">(lowerBounds.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(fieldId));</span></span>
<span class="line"><span class="__shiki_140thh">                            Object max </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> deserialize</span><span class="__shiki_140thh">(upperBounds.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(fieldId));</span></span>
<span class="line"><span class="__shiki_140thh">                            </span></span>
<span class="line"><span class="__shiki_1itgoe">                            if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_1t8gfj">valueInRange</span><span class="__shiki_140thh">(pred.</span><span class="__shiki_1t8gfj">literal</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">value</span><span class="__shiki_140thh">(), min, max)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                                return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">// 跳过此文件</span></span>
<span class="line"><span class="__shiki_140thh">                            }</span></span>
<span class="line"><span class="__shiki_140thh">                        }</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            })</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(ManifestEntry</span><span class="__shiki_1itgoe">::</span><span class="__shiki_140thh">file)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">collect</span><span class="__shiki_140thh">(Collectors.</span><span class="__shiki_1t8gfj">toList</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-4-缓存优化" tabindex="-1">8.4 缓存优化 <a class="header-anchor" href="#_8-4-缓存优化" aria-label="Permalink to &quot;8.4 缓存优化&quot;">​</a></h3><p><strong>元数据缓存策略：</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> MetadataCache</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> Cache&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">TableMetadata</span><span class="__shiki_140thh">&gt; metadataCache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        Caffeine.</span><span class="__shiki_1t8gfj">newBuilder</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">maximumSize</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">expireAfterWrite</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">, TimeUnit.MINUTES)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">build</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> Cache&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, List&lt;</span><span class="__shiki_1itgoe">ManifestFile</span><span class="__shiki_140thh">&gt;&gt; manifestCache </span><span class="__shiki_1itgoe">=</span></span>
<span class="line"><span class="__shiki_140thh">        Caffeine.</span><span class="__shiki_1t8gfj">newBuilder</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">maximumSize</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">500</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">expireAfterWrite</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, TimeUnit.MINUTES)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">build</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> TableMetadata </span><span class="__shiki_1t8gfj">getMetadata</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">tableName</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> metadataCache.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(tableName, key </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 从Catalog加载</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> catalog.</span><span class="__shiki_1t8gfj">loadTable</span><span class="__shiki_140thh">(key);</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">DataFile</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">getMatchingFiles</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        String </span><span class="__shiki_1jdh33">tableName</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">        Expression </span><span class="__shiki_1jdh33">predicate</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> manifestCache.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(tableName, key </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            TableMetadata metadata </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> getMetadata</span><span class="__shiki_140thh">(key);</span></span>
<span class="line"><span class="__shiki_140thh">            Snapshot snapshot </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> metadata.</span><span class="__shiki_1t8gfj">currentSnapshot</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> snapshot.</span><span class="__shiki_1t8gfj">manifests</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }).</span><span class="__shiki_1t8gfj">parallelStream</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">          .</span><span class="__shiki_1t8gfj">flatMap</span><span class="__shiki_140thh">(manifest </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_1t8gfj"> readManifest</span><span class="__shiki_140thh">(manifest).</span><span class="__shiki_1t8gfj">stream</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">          .</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(entry </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_1t8gfj"> evaluatePredicate</span><span class="__shiki_140thh">(entry, predicate))</span></span>
<span class="line"><span class="__shiki_140thh">          .</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(ManifestEntry</span><span class="__shiki_1itgoe">::</span><span class="__shiki_140thh">file)</span></span>
<span class="line"><span class="__shiki_140thh">          .</span><span class="__shiki_1t8gfj">collect</span><span class="__shiki_140thh">(Collectors.</span><span class="__shiki_1t8gfj">toList</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><hr><h2 id="九、多引擎集成" tabindex="-1">九、多引擎集成 <a class="header-anchor" href="#九、多引擎集成" aria-label="Permalink to &quot;九、多引擎集成&quot;">​</a></h2><h3 id="_9-1-spark集成" tabindex="-1">9.1 Spark集成 <a class="header-anchor" href="#_9-1-spark集成" aria-label="Permalink to &quot;9.1 Spark集成&quot;">​</a></h3><div class="language-scala vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">scala</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 1. 配置Spark Session</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_1t8gfj"> org</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">apache</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">spark</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sql</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">SparkSession</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">val</span><span class="__shiki_1jdh33"> spark</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> SparkSession</span><span class="__shiki_140thh">.builder()</span></span>
<span class="line"><span class="__shiki_140thh">  .appName(</span><span class="__shiki_mdbnqw">&quot;Iceberg Example&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .config(</span><span class="__shiki_mdbnqw">&quot;spark.sql.extensions&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">          &quot;org.apache.iceberg.spark.extensions.IcebergSparkSessionExtensions&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .config(</span><span class="__shiki_mdbnqw">&quot;spark.sql.catalog.spark_catalog&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">          &quot;org.apache.iceberg.spark.SparkSessionCatalog&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .config(</span><span class="__shiki_mdbnqw">&quot;spark.sql.catalog.spark_catalog.type&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;hive&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .config(</span><span class="__shiki_mdbnqw">&quot;spark.sql.catalog.local&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">          &quot;org.apache.iceberg.spark.SparkCatalog&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .config(</span><span class="__shiki_mdbnqw">&quot;spark.sql.catalog.local.type&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;hadoop&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .config(</span><span class="__shiki_mdbnqw">&quot;spark.sql.catalog.local.warehouse&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;/warehouse&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .getOrCreate()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 创建表</span></span>
<span class="line"><span class="__shiki_140thh">spark.sql(</span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  CREATE TABLE local.db.events (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    id BIGINT,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    event_time TIMESTAMP,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    user_id BIGINT,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    data STRING</span></span>
<span class="line"><span class="__shiki_mdbnqw">  ) USING iceberg</span></span>
<span class="line"><span class="__shiki_mdbnqw">  PARTITIONED BY (days(event_time))</span></span>
<span class="line"><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 3. 写入数据</span></span>
<span class="line"><span class="__shiki_1itgoe">val</span><span class="__shiki_1jdh33"> eventsDF</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> spark.read.json(</span><span class="__shiki_mdbnqw">&quot;/data/events.json&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">eventsDF.writeTo(</span><span class="__shiki_mdbnqw">&quot;local.db.events&quot;</span><span class="__shiki_140thh">).append()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 4. 增量读取</span></span>
<span class="line"><span class="__shiki_1itgoe">val</span><span class="__shiki_1jdh33"> changesDF</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> spark.read</span></span>
<span class="line"><span class="__shiki_140thh">  .format(</span><span class="__shiki_mdbnqw">&quot;iceberg&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .option(</span><span class="__shiki_mdbnqw">&quot;start-snapshot-id&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;123456&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .option(</span><span class="__shiki_mdbnqw">&quot;end-snapshot-id&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;123460&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .load(</span><span class="__shiki_mdbnqw">&quot;local.db.events&quot;</span><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_9-2-flink集成" tabindex="-1">9.2 Flink集成 <a class="header-anchor" href="#_9-2-flink集成" aria-label="Permalink to &quot;9.2 Flink集成&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 1. Flink SQL集成</span></span>
<span class="line"><span class="__shiki_21nrsd">// 创建Catalog</span></span>
<span class="line"><span class="__shiki_140thh">CREATE CATALOG iceberg_catalog </span><span class="__shiki_1t8gfj">WITH</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;type&#39;</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;iceberg&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;catalog-type&#39;</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;hive&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;uri&#39;</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;thrift://localhost:9083&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;warehouse&#39;</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;hdfs://localhost:9000/warehouse&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">USE CATALOG iceberg_catalog;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 创建表</span></span>
<span class="line"><span class="__shiki_140thh">CREATE TABLE </span><span class="__shiki_1t8gfj">events</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id BIGINT,</span></span>
<span class="line"><span class="__shiki_140thh">    event_time </span><span class="__shiki_1t8gfj">TIMESTAMP</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    user_id BIGINT,</span></span>
<span class="line"><span class="__shiki_140thh">    data STRING,</span></span>
<span class="line"><span class="__shiki_140thh">    WATERMARK FOR event_time AS event_time </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;5&#39;</span><span class="__shiki_140thh"> SECOND</span></span>
<span class="line"><span class="__shiki_140thh">) PARTITIONED </span><span class="__shiki_1t8gfj">BY</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">days</span><span class="__shiki_140thh">(event_time))</span></span>
<span class="line"><span class="__shiki_1t8gfj">WITH</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;format-version&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;2&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;write.upsert.enabled&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;true&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. DataStream API</span></span>
<span class="line"><span class="__shiki_140thh">StreamExecutionEnvironment env </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> StreamExecutionEnvironment.</span><span class="__shiki_1t8gfj">getExecutionEnvironment</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">StreamTableEnvironment tableEnv </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> StreamTableEnvironment.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">(env);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 创建Iceberg Catalog</span></span>
<span class="line"><span class="__shiki_140thh">Catalog catalog </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> HiveCatalog</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;iceberg_catalog&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;default&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;/path/to/warehouse&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    new</span><span class="__shiki_1t8gfj"> Configuration</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">tableEnv.</span><span class="__shiki_1t8gfj">registerCatalog</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;iceberg_catalog&quot;</span><span class="__shiki_140thh">, catalog);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 写入数据流</span></span>
<span class="line"><span class="__shiki_140thh">DataStream&lt;</span><span class="__shiki_1itgoe">Event</span><span class="__shiki_140thh">&gt; eventStream </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ...;</span></span>
<span class="line"><span class="__shiki_140thh">Table eventTable </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tableEnv.</span><span class="__shiki_1t8gfj">fromDataStream</span><span class="__shiki_140thh">(eventStream);</span></span>
<span class="line"><span class="__shiki_140thh">tableEnv.</span><span class="__shiki_1t8gfj">executeSql</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;INSERT INTO iceberg_catalog.db.events SELECT * FROM &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> eventTable);</span></span></code></pre></div><h3 id="_9-3-trino-presto集成" tabindex="-1">9.3 Trino/Presto集成 <a class="header-anchor" href="#_9-3-trino-presto集成" aria-label="Permalink to &quot;9.3 Trino/Presto集成&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 配置Catalog</span></span>
<span class="line"><span class="__shiki_21nrsd">-- etc/catalog/iceberg.properties</span></span>
<span class="line"><span class="__shiki_dzsirb">connector</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">iceberg</span></span>
<span class="line"><span class="__shiki_dzsirb">hive</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metastore</span><span class="__shiki_140thh">.uri</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">thrift:</span><span class="__shiki_1itgoe">//</span><span class="__shiki_140thh">localhost:</span><span class="__shiki_dzsirb">9083</span></span>
<span class="line"><span class="__shiki_dzsirb">iceberg</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">file</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">format</span><span class="__shiki_1itgoe">=PARQUET</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 创建表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> iceberg</span><span class="__shiki_140thh">.</span><span class="__shiki_1itgoe">default</span><span class="__shiki_140thh">.events (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    event_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    user_id </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    data</span><span class="__shiki_1itgoe"> VARCHAR</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    partitioning </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> ARRAY</span><span class="__shiki_140thh">[&#39;day(event_time)&#39;],</span></span>
<span class="line"><span class="__shiki_140thh">    format </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;PARQUET&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 查询优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 分区剪枝</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN </span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> events </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> event_time </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_1itgoe"> DATE</span><span class="__shiki_mdbnqw"> &#39;2023-01-01&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 谓词下推</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> events </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> user_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 123</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_140thh"> event_time </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_1itgoe"> DATE</span><span class="__shiki_mdbnqw"> &#39;2023-01-01&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 时间旅行</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> events </span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> TIMESTAMP</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> OF </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_mdbnqw"> &#39;2023-01-01 12:00:00&#39;</span><span class="__shiki_140thh">;</span></span></code></pre></div><hr><h2 id="十、高级特性" tabindex="-1">十、高级特性 <a class="header-anchor" href="#十、高级特性" aria-label="Permalink to &quot;十、高级特性&quot;">​</a></h2><h3 id="_10-1-分支与标签-nessie集成" tabindex="-1">10.1 分支与标签（Nessie集成） <a class="header-anchor" href="#_10-1-分支与标签-nessie集成" aria-label="Permalink to &quot;10.1 分支与标签（Nessie集成）&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 创建分支</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> BRANCH feature_branch </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_dzsirb"> iceberg_catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">db</span><span class="__shiki_140thh">.events;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 切换到分支</span></span>
<span class="line"><span class="__shiki_1itgoe">USE</span><span class="__shiki_140thh"> BRANCH feature_branch </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_dzsirb"> iceberg_catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">db</span><span class="__shiki_140thh">.events;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 在分支上操作</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_dzsirb"> iceberg_catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">db</span><span class="__shiki_140thh">.events </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (...);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 合并分支</span></span>
<span class="line"><span class="__shiki_1itgoe">MERGE</span><span class="__shiki_140thh"> BRANCH feature_branch </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> main </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_dzsirb"> iceberg_catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">db</span><span class="__shiki_140thh">.events;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 创建标签</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> TAG v1_0 </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_dzsirb"> iceberg_catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">db</span><span class="__shiki_140thh">.events </span></span>
<span class="line"><span class="__shiki_1itgoe">AT</span><span class="__shiki_1itgoe"> SNAPSHOT</span><span class="__shiki_mdbnqw"> &#39;snapshot-id-123456&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 查询特定标签</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_dzsirb"> iceberg_catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">db</span><span class="__shiki_140thh">.events </span></span>
<span class="line"><span class="__shiki_1itgoe">AT</span><span class="__shiki_140thh"> TAG </span><span class="__shiki_mdbnqw">&#39;v1_0&#39;</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_10-2-物化视图" tabindex="-1">10.2 物化视图 <a class="header-anchor" href="#_10-2-物化视图" aria-label="Permalink to &quot;10.2 物化视图&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建物化视图</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> MATERIALIZED VIEW daily_user_stats</span></span>
<span class="line"><span class="__shiki_140thh">PARTITIONED </span><span class="__shiki_1itgoe">BY</span><span class="__shiki_140thh"> (event_date)</span></span>
<span class="line"><span class="__shiki_1itgoe">LOCATION</span><span class="__shiki_mdbnqw"> &#39;/warehouse/daily_user_stats&#39;</span></span>
<span class="line"><span class="__shiki_140thh">REFRESH MODE </span><span class="__shiki_1itgoe">INCREMENTAL</span></span>
<span class="line"><span class="__shiki_1itgoe">AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    CAST</span><span class="__shiki_140thh">(event_time </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> DATE</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> event_date,</span></span>
<span class="line"><span class="__shiki_140thh">    user_id,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> event_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">    SUM</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> total_value</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> events</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_dzsirb"> CAST</span><span class="__shiki_140thh">(event_time </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> DATE</span><span class="__shiki_140thh">), user_id;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 手动刷新</span></span>
<span class="line"><span class="__shiki_140thh">REFRESH MATERIALIZED VIEW daily_user_stats;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 自动刷新配置</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_140thh"> MATERIALIZED VIEW daily_user_stats</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> PROPERTIES (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;refresh.mode&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;incremental&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;refresh.interval&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;1 hour&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_10-3-行级更新与删除" tabindex="-1">10.3 行级更新与删除 <a class="header-anchor" href="#_10-3-行级更新与删除" aria-label="Permalink to &quot;10.3 行级更新与删除&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 行级更新（需要v2表格式）</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> events </span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_1itgoe"> data</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;updated&#39;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 123</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_140thh"> user_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 456</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 行级删除</span></span>
<span class="line"><span class="__shiki_1itgoe">DELETE</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> events </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 123</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_140thh"> user_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 456</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 合并操作（UPSERT）</span></span>
<span class="line"><span class="__shiki_1itgoe">MERGE</span><span class="__shiki_1itgoe"> INTO</span><span class="__shiki_140thh"> target_table t</span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> source_table s</span></span>
<span class="line"><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> t</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span></span>
<span class="line"><span class="__shiki_1itgoe">WHEN</span><span class="__shiki_1itgoe"> MATCHED</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_dzsirb"> t</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">status</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;inactive&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_1itgoe"> DELETE</span></span>
<span class="line"><span class="__shiki_1itgoe">WHEN</span><span class="__shiki_1itgoe"> MATCHED</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_1itgoe"> UPDATE</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    t</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">data</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">data</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    t</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">updated_at</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> CURRENT_TIMESTAMP</span></span>
<span class="line"><span class="__shiki_1itgoe">WHEN</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> MATCHED</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_1itgoe"> INSERT</span><span class="__shiki_140thh"> (id, </span><span class="__shiki_1itgoe">data</span><span class="__shiki_140thh">) </span></span>
<span class="line"><span class="__shiki_1itgoe">    VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">data</span><span class="__shiki_140thh">);</span></span></code></pre></div><hr><h2 id="十一、监控与管理" tabindex="-1">十一、监控与管理 <a class="header-anchor" href="#十一、监控与管理" aria-label="Permalink to &quot;十一、监控与管理&quot;">​</a></h2><h3 id="_11-1-系统表查询" tabindex="-1">11.1 系统表查询 <a class="header-anchor" href="#_11-1-系统表查询" aria-label="Permalink to &quot;11.1 系统表查询&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 元数据查询</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看所有快照</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_dzsirb"> catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">system</span><span class="__shiki_140thh">.snapshots </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> table_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;db.events&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> committed_at </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看所有清单文件</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_dzsirb"> catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">system</span><span class="__shiki_140thh">.manifests </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> table_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;db.events&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看数据文件</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_dzsirb"> catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">system</span><span class="__shiki_140thh">.files </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> table_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;db.events&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> snapshot_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 123456</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 性能监控</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 查询扫描统计</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    snapshot_id,</span></span>
<span class="line"><span class="__shiki_140thh">    operation,</span></span>
<span class="line"><span class="__shiki_140thh">    added_files_count,</span></span>
<span class="line"><span class="__shiki_140thh">    added_rows_count,</span></span>
<span class="line"><span class="__shiki_140thh">    added_files_size_bytes,</span></span>
<span class="line"><span class="__shiki_140thh">    changed_partition_count</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_dzsirb"> catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">system</span><span class="__shiki_140thh">.snapshots </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> table_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;db.events&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 分区统计</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    partition</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    file_count,</span></span>
<span class="line"><span class="__shiki_140thh">    row_count,</span></span>
<span class="line"><span class="__shiki_140thh">    file_size_in_bytes</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_dzsirb"> catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">system</span><span class="__shiki_140thh">.partitions </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> table_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;db.events&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> row_count </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_11-2-健康检查" tabindex="-1">11.2 健康检查 <a class="header-anchor" href="#_11-2-健康检查" aria-label="Permalink to &quot;11.2 健康检查&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 检查小文件问题</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    partition</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> file_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">    AVG</span><span class="__shiki_140thh">(file_size_in_bytes) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_file_size,</span></span>
<span class="line"><span class="__shiki_dzsirb">    SUM</span><span class="__shiki_140thh">(file_size_in_bytes) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total_size</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_dzsirb"> catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">system</span><span class="__shiki_140thh">.files </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> table_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;db.events&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_1itgoe"> partition</span></span>
<span class="line"><span class="__shiki_1itgoe">HAVING</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_21nrsd">  -- 文件过多</span></span>
<span class="line"><span class="__shiki_1itgoe">   OR</span><span class="__shiki_dzsirb"> AVG</span><span class="__shiki_140thh">(file_size_in_bytes) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 64</span><span class="__shiki_21nrsd">  -- 平均小于64MB</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> file_count </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 检查过期快照</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    snapshot_id,</span></span>
<span class="line"><span class="__shiki_140thh">    committed_at,</span></span>
<span class="line"><span class="__shiki_140thh">    operation,</span></span>
<span class="line"><span class="__shiki_dzsirb">    DATEDIFF</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;day&#39;</span><span class="__shiki_140thh">, committed_at, CURRENT_TIMESTAMP) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> age_days</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_dzsirb"> catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">system</span><span class="__shiki_140thh">.snapshots </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> table_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;db.events&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_dzsirb"> DATEDIFF</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;day&#39;</span><span class="__shiki_140thh">, committed_at, CURRENT_TIMESTAMP) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 30</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> committed_at </span><span class="__shiki_1itgoe">ASC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 检查孤立文件</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_dzsirb"> catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">system</span><span class="__shiki_140thh">.check_orphan_files(</span></span>
<span class="line"><span class="__shiki_1itgoe">  table</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_mdbnqw"> &#39;db.events&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  dry_run </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> true</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_11-3-审计日志" tabindex="-1">11.3 审计日志 <a class="header-anchor" href="#_11-3-审计日志" aria-label="Permalink to &quot;11.3 审计日志&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建审计表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> audit_log</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    timestamp</span><span class="__shiki_1itgoe"> TIMESTAMP</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    user_name STRING,</span></span>
<span class="line"><span class="__shiki_140thh">    operation STRING,</span></span>
<span class="line"><span class="__shiki_140thh">    table_name STRING,</span></span>
<span class="line"><span class="__shiki_140thh">    snapshot_id </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    parameters MAP</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">STRING, STRING</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> iceberg</span></span>
<span class="line"><span class="__shiki_140thh">PARTITIONED </span><span class="__shiki_1itgoe">BY</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">days</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">timestamp</span><span class="__shiki_140thh">));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 启用审计</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">events</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_140thh"> PROPERTIES (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;write.audit.enabled&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;true&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;write.audit.catalog&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;audit_catalog&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;write.audit.table&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;db.audit_log&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><hr><h2 id="十二、最佳实践" tabindex="-1">十二、最佳实践 <a class="header-anchor" href="#十二、最佳实践" aria-label="Permalink to &quot;十二、最佳实践&quot;">​</a></h2><h3 id="_12-1-表设计最佳实践" tabindex="-1">12.1 表设计最佳实践 <a class="header-anchor" href="#_12-1-表设计最佳实践" aria-label="Permalink to &quot;12.1 表设计最佳实践&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 合理选择分区键</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> events</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    event_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    user_id </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    event_type STRING,</span></span>
<span class="line"><span class="__shiki_1itgoe">    data</span><span class="__shiki_140thh"> STRING</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">PARTITIONED </span><span class="__shiki_1itgoe">BY</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 一级分区：时间范围，控制分区数量</span></span>
<span class="line"><span class="__shiki_140thh">    months(event_time),</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 二级分区：哈希，避免数据倾斜</span></span>
<span class="line"><span class="__shiki_140thh">    bucket(</span><span class="__shiki_dzsirb">16</span><span class="__shiki_140thh">, user_id),</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 三级分区：枚举值，进一步剪枝</span></span>
<span class="line"><span class="__shiki_140thh">    event_type</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 设置合理的表属性</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> optimized_table</span><span class="__shiki_140thh"> (...) </span><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 写入优化</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;write.format.default&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;parquet&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;write.parquet.compression-codec&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;zstd&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;write.parquet.page-size-bytes&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;1048576&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;write.parquet.row-group-size-bytes&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;134217728&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 读取优化</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;read.split.target-size&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;134217728&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;read.split.open-file-cost&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;4194304&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 元数据优化</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;write.metadata.compression-codec&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;gzip&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;write.metadata.metrics.default&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;full&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 维护优化</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;write.wap.enabled&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;true&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;commit.retry.num-retries&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;5&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;commit.retry.min-wait-ms&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;100&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;commit.retry.max-wait-ms&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;5000&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_12-2-写入最佳实践" tabindex="-1">12.2 写入最佳实践 <a class="header-anchor" href="#_12-2-写入最佳实践" aria-label="Permalink to &quot;12.2 写入最佳实践&quot;">​</a></h3><div class="language-scala vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">scala</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 批量写入优化</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> optimizedWrite</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">df</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">DataFrame</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">table</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">String</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Unit</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  df</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 按分区键排序，减少小文件</span></span>
<span class="line"><span class="__shiki_140thh">    .sortWithinPartitions(</span><span class="__shiki_mdbnqw">&quot;event_date&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;user_id&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 控制写入并行度</span></span>
<span class="line"><span class="__shiki_140thh">    .coalesce(calculateOptimalParallelism(df))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 使用动态分区覆盖</span></span>
<span class="line"><span class="__shiki_140thh">    .writeTo(table)</span></span>
<span class="line"><span class="__shiki_140thh">    .option(</span><span class="__shiki_mdbnqw">&quot;overwrite-mode&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;dynamic&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    .option(</span><span class="__shiki_mdbnqw">&quot;check-ordering&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;false&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    .append()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 流式写入优化</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> streamingWrite</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">stream</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">DataStream</span><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">Record</span><span class="__shiki_140thh">])</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Unit</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  stream</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 微批处理，减少提交次数</span></span>
<span class="line"><span class="__shiki_140thh">    .window(</span><span class="__shiki_1t8gfj">TumblingProcessingTimeWindows</span><span class="__shiki_140thh">.of(</span><span class="__shiki_1t8gfj">Time</span><span class="__shiki_140thh">.minutes(</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">)))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 按分区键分组</span></span>
<span class="line"><span class="__shiki_140thh">    .keyBy(record </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> (record.partitionKey, record.bucketId))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 批量写入</span></span>
<span class="line"><span class="__shiki_140thh">    .process(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> BatchWriteFunction</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 异步提交</span></span>
<span class="line"><span class="__shiki_140thh">    .addSink(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> AsyncIcebergSink</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_12-3-查询最佳实践" tabindex="-1">12.3 查询最佳实践 <a class="header-anchor" href="#_12-3-查询最佳实践" aria-label="Permalink to &quot;12.3 查询最佳实践&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 利用分区剪枝</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 好：直接使用分区键</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> events </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> event_date </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;2023-01-01&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 不好：不使用分区键</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> events </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> DATE_FORMAT</span><span class="__shiki_140thh">(event_date, </span><span class="__shiki_mdbnqw">&#39;yyyy-MM&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;2023-01&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 利用列统计信息</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 好：使用有统计信息的列进行过滤</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> events </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> user_id </span><span class="__shiki_1itgoe">BETWEEN</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_dzsirb"> 2000</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> event_date </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;2023-01-01&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 避免全表扫描</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用LIMIT进行探索性查询</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> events </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> event_date </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;2023-01-01&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 使用时间旅行进行数据验证</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 在修改前验证数据</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> before_count </span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> events </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> TIMESTAMP</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> OF </span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;5&#39;</span><span class="__shiki_1itgoe"> minutes</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 执行修改操作</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> events </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_1itgoe"> status</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;processed&#39;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> event_date </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;2023-01-01&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 验证修改</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> after_count </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> events;</span></span></code></pre></div><h3 id="_12-4-运维最佳实践" tabindex="-1">12.4 运维最佳实践 <a class="header-anchor" href="#_12-4-运维最佳实践" aria-label="Permalink to &quot;12.4 运维最佳实践&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># 日常维护脚本</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 定期清理过期快照</span></span>
<span class="line"><span class="__shiki_1t8gfj">iceberg-cli</span><span class="__shiki_mdbnqw"> expire-snapshots</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --catalog</span><span class="__shiki_mdbnqw"> hive</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --table</span><span class="__shiki_mdbnqw"> db.events</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --older-than</span><span class="__shiki_mdbnqw"> &quot;7 days ago&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --retain-last</span><span class="__shiki_dzsirb"> 20</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 定期重写清单文件</span></span>
<span class="line"><span class="__shiki_1t8gfj">iceberg-cli</span><span class="__shiki_mdbnqw"> rewrite-manifests</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --catalog</span><span class="__shiki_mdbnqw"> hive</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --table</span><span class="__shiki_mdbnqw"> db.events</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --min-files-to-compact</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --max-manifest-size-mb</span><span class="__shiki_dzsirb"> 512</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 定期合并小文件</span></span>
<span class="line"><span class="__shiki_1t8gfj">iceberg-cli</span><span class="__shiki_mdbnqw"> rewrite-data-files</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --catalog</span><span class="__shiki_mdbnqw"> hive</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --table</span><span class="__shiki_mdbnqw"> db.events</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --strategy</span><span class="__shiki_mdbnqw"> sort</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --sort-order</span><span class="__shiki_mdbnqw"> &quot;zorder(user_id, event_date)&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --min-file-size-mb</span><span class="__shiki_dzsirb"> 128</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --max-file-size-mb</span><span class="__shiki_dzsirb"> 512</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 定期清理孤立文件</span></span>
<span class="line"><span class="__shiki_1t8gfj">iceberg-cli</span><span class="__shiki_mdbnqw"> remove-orphan-files</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --catalog</span><span class="__shiki_mdbnqw"> hive</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --table</span><span class="__shiki_mdbnqw"> db.events</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --older-than</span><span class="__shiki_mdbnqw"> &quot;30 days ago&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 定期收集统计信息</span></span>
<span class="line"><span class="__shiki_1t8gfj">iceberg-cli</span><span class="__shiki_mdbnqw"> analyze-table</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --catalog</span><span class="__shiki_mdbnqw"> hive</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --table</span><span class="__shiki_mdbnqw"> db.events</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --columns</span><span class="__shiki_mdbnqw"> &quot;user_id, event_date, event_type&quot;</span></span></code></pre></div><hr><h2 id="十三、总结" tabindex="-1">十三、总结 <a class="header-anchor" href="#十三、总结" aria-label="Permalink to &quot;十三、总结&quot;">​</a></h2><h3 id="_13-1-iceberg的核心优势" tabindex="-1">13.1 Iceberg的核心优势 <a class="header-anchor" href="#_13-1-iceberg的核心优势" aria-label="Permalink to &quot;13.1 Iceberg的核心优势&quot;">​</a></h3><ol><li><strong>开放标准</strong>：厂商中立，避免锁定</li><li><strong>隐藏分区</strong>：简化查询，自动优化</li><li><strong>分区演进</strong>：灵活调整分区策略</li><li><strong>多引擎支持</strong>：统一的表格式</li><li><strong>高性能元数据</strong>：快速元数据操作</li><li><strong>完整的事务支持</strong>：ACID保证</li></ol><h3 id="_13-2-适用场景" tabindex="-1">13.2 适用场景 <a class="header-anchor" href="#_13-2-适用场景" aria-label="Permalink to &quot;13.2 适用场景&quot;">​</a></h3><ul><li><strong>需要多计算引擎访问</strong>的数据湖</li><li><strong>频繁schema变更</strong>的场景</li><li><strong>需要灵活分区策略</strong>的大数据表</li><li><strong>对查询性能有高要求</strong>的分析场景</li><li><strong>需要严格数据版本管理</strong>的数据治理</li></ul><h3 id="_13-3-发展趋势" tabindex="-1">13.3 发展趋势 <a class="header-anchor" href="#_13-3-发展趋势" aria-label="Permalink to &quot;13.3 发展趋势&quot;">​</a></h3><ol><li><strong>云原生优化</strong>：深度集成对象存储</li><li><strong>实时能力增强</strong>：更好的流式支持</li><li><strong>数据治理集成</strong>：血缘、质量、安全</li><li><strong>性能持续优化</strong>：更智能的数据布局</li><li><strong>生态扩展</strong>：更多计算引擎支持</li></ol><h3 id="_13-4-选择建议" tabindex="-1">13.4 选择建议 <a class="header-anchor" href="#_13-4-选择建议" aria-label="Permalink to &quot;13.4 选择建议&quot;">​</a></h3><p><strong>选择Iceberg当：</strong></p><ul><li>需要多引擎支持（Spark + Flink + Trino等）</li><li>需要隐藏分区和分区演进</li><li>需要完整的schema演进支持</li><li>避免厂商锁定</li></ul><p><strong>考虑其他方案当：</strong></p><ul><li>深度绑定Spark生态（可考虑Delta Lake）</li><li>需要更强的流处理集成（可考虑Apache Hudi）</li><li>简单场景，只需基础ACID支持</li></ul><hr><p>通过深入理解Apache Iceberg的表格式和架构设计，可以在大数据存储系统中构建高性能、可扩展、多引擎兼容的数据湖解决方案。Iceberg作为开放的表格式标准，为大数据处理提供了统一的元数据管理和高效的数据访问能力。</p>`,147)])])}const r=a(p,[["render",l]]);export{d as __pageData,r as default};
