import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"大数据存储系统 - 数据湖架构 - Hudi数据管理","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/bigdata/datalake/hudi.md","filePath":"data/database/bigdata/datalake/hudi.md"}'),p={name:"data/database/bigdata/datalake/hudi.md"};function l(h,s,t,c,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="大数据存储系统-数据湖架构-hudi数据管理" tabindex="-1">大数据存储系统 - 数据湖架构 - Hudi数据管理 <a class="header-anchor" href="#大数据存储系统-数据湖架构-hudi数据管理" aria-label="Permalink to &quot;大数据存储系统 - 数据湖架构 - Hudi数据管理&quot;">​</a></h1><h2 id="详细完整学习笔记" tabindex="-1">详细完整学习笔记 <a class="header-anchor" href="#详细完整学习笔记" aria-label="Permalink to &quot;详细完整学习笔记&quot;">​</a></h2><hr><h2 id="一、apache-hudi概述与设计哲学" tabindex="-1">一、Apache Hudi概述与设计哲学 <a class="header-anchor" href="#一、apache-hudi概述与设计哲学" aria-label="Permalink to &quot;一、Apache Hudi概述与设计哲学&quot;">​</a></h2><h3 id="_1-1-诞生背景与演进历程" tabindex="-1">1.1 诞生背景与演进历程 <a class="header-anchor" href="#_1-1-诞生背景与演进历程" aria-label="Permalink to &quot;1.1 诞生背景与演进历程&quot;">​</a></h3><p><strong>起源与发展：</strong></p><ul><li><strong>2016年</strong>：由Uber开发，用于解决其大数据平台的数据管理问题</li><li><strong>2017年</strong>：开源，提交给Apache孵化器</li><li><strong>2019年</strong>：成为Apache顶级项目</li><li><strong>发展历程</strong>：从Uber内部数据平台组件 → 开源项目 → 行业标准数据湖解决方案</li></ul><p><strong>设计动机：</strong></p><ol><li><strong>大规模数据更新问题</strong>：传统HDFS/Parquet只支持追加，更新成本高</li><li><strong>近实时数据摄入</strong>：从批处理到准实时处理的演进需求</li><li><strong>数据新鲜度与效率平衡</strong>：平衡数据延迟与查询性能</li><li><strong>事务性保证</strong>：为数据湖提供ACID事务支持</li></ol><h3 id="_1-2-hudi核心定位" tabindex="-1">1.2 Hudi核心定位 <a class="header-anchor" href="#_1-2-hudi核心定位" aria-label="Permalink to &quot;1.2 Hudi核心定位&quot;">​</a></h3><p><strong>三大核心功能：</strong></p><ol><li><strong>Upserts</strong>：高效的更新/插入操作</li><li><strong>Incremental Pulls</strong>：增量数据拉取</li><li><strong>Transactional Management</strong>：事务管理</li></ol><p><strong>设计哲学：</strong></p><ul><li><strong>存储层优化</strong>：在文件系统层面提供数据库级别的操作能力</li><li><strong>计算与存储解耦</strong>：支持多种计算引擎（Spark, Flink, Presto, Hive）</li><li><strong>流批一体</strong>：统一批处理和流处理的存储格式</li></ul><h3 id="_1-3-与其他数据湖方案的对比" tabindex="-1">1.3 与其他数据湖方案的对比 <a class="header-anchor" href="#_1-3-与其他数据湖方案的对比" aria-label="Permalink to &quot;1.3 与其他数据湖方案的对比&quot;">​</a></h3><table tabindex="0"><thead><tr><th>维度</th><th>Apache Hudi</th><th>Delta Lake</th><th>Apache Iceberg</th></tr></thead><tbody><tr><td><strong>设计初衷</strong></td><td>流批一体，近实时更新</td><td>ACID事务，可靠性</td><td>开放标准，多引擎支持</td></tr><tr><td><strong>核心特性</strong></td><td>增量处理，事务，索引</td><td>ACID事务，时间旅行</td><td>隐藏分区，模式演进</td></tr><tr><td><strong>存储模型</strong></td><td>COW/MOR双模型</td><td>单一存储模型</td><td>统一元数据层</td></tr><tr><td><strong>索引机制</strong></td><td>布隆过滤器、全局索引</td><td>无专用索引</td><td>无专用索引</td></tr><tr><td><strong>更新策略</strong></td><td>Copy-on-Write, Merge-on-Read</td><td>Copy-on-Write</td><td>Copy-on-Write</td></tr><tr><td><strong>增量查询</strong></td><td>内置支持，增量拉取</td><td>需配置Change Data Feed</td><td>时间旅行衍生</td></tr><tr><td><strong>典型场景</strong></td><td>近实时数据管道</td><td>批量ETL，数据仓库</td><td>跨引擎分析，查询优化</td></tr></tbody></table><hr><h2 id="二、hudi核心架构" tabindex="-1">二、Hudi核心架构 <a class="header-anchor" href="#二、hudi核心架构" aria-label="Permalink to &quot;二、Hudi核心架构&quot;">​</a></h2><h3 id="_2-1-总体架构设计" tabindex="-1">2.1 总体架构设计 <a class="header-anchor" href="#_2-1-总体架构设计" aria-label="Permalink to &quot;2.1 总体架构设计&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                计算引擎层 (Spark/Flink/Hive)             │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│                     Hudi Client                          │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌─────────────────────────────────────────────┐        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  写入客户端      │   读取客户端    │  表服务   │        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  (Write Client) │  (Read Client) │ (Table  │        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │                 │                │ Services)│        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └─────────────────────────────────────────────┘        │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│               元数据管理层 (Timeline)                     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌─────────────────────────────────────────────┐        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  .hoodie/ 目录                               │        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  ├── archived/     (归档元数据)              │        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  ├── timeline/     (时间线元数据)            │        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  └── metadata/     (表元数据)                │        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └─────────────────────────────────────────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│                文件存储层 (HDFS/S3)                     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌─────────────────────────────────────────────┐        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  数据文件 (Parquet)     │  日志文件 (Avro)   │        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │                          │                  │        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └─────────────────────────────────────────────┘        │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_2-2-核心组件详解" tabindex="-1">2.2 核心组件详解 <a class="header-anchor" href="#_2-2-核心组件详解" aria-label="Permalink to &quot;2.2 核心组件详解&quot;">​</a></h3><h4 id="_2-2-1-时间线-timeline-系统" tabindex="-1">2.2.1 时间线（Timeline）系统 <a class="header-anchor" href="#_2-2-1-时间线-timeline-系统" aria-label="Permalink to &quot;2.2.1 时间线（Timeline）系统&quot;">​</a></h4><p><strong>时间线目录结构：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">.hoodie/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── archived/                    # 归档的元数据</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── 20230101010101.commit</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── 20230101010201.deltacommit</span></span>
<span class="line"><span class="__shiki_wvjl67">├── timeline/                    # 活跃元数据</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── 20230101010301.commit</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── 20230101010301.commit.request</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── 20230101010401.deltacommit</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── instant.state            # 实例状态文件</span></span>
<span class="line"><span class="__shiki_wvjl67">├── metadata/                    # 表元数据</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── .metadata/</span></span>
<span class="line"><span class="__shiki_wvjl67">└── .temp/                      # 临时文件</span></span></code></pre></div><p><strong>时间线动作类型：</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> enum</span><span class="__shiki_1t8gfj"> HoodieTimeline</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 提交类型</span></span>
<span class="line"><span class="__shiki_dzsirb">    COMMIT</span><span class="__shiki_140thh">,        </span><span class="__shiki_21nrsd">// 批处理提交</span></span>
<span class="line"><span class="__shiki_dzsirb">    DELTA_COMMIT</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 流处理提交</span></span>
<span class="line"><span class="__shiki_dzsirb">    COMPACTION</span><span class="__shiki_140thh">,    </span><span class="__shiki_21nrsd">// 压缩提交</span></span>
<span class="line"><span class="__shiki_dzsirb">    CLEAN</span><span class="__shiki_140thh">,         </span><span class="__shiki_21nrsd">// 清理提交</span></span>
<span class="line"><span class="__shiki_dzsirb">    SAVEPOINT</span><span class="__shiki_140thh">,     </span><span class="__shiki_21nrsd">// 保存点</span></span>
<span class="line"><span class="__shiki_dzsirb">    RESTORE</span><span class="__shiki_140thh">,       </span><span class="__shiki_21nrsd">// 恢复</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROLLBACK</span><span class="__shiki_140thh">,      </span><span class="__shiki_21nrsd">// 回滚</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 动作状态</span></span>
<span class="line"><span class="__shiki_dzsirb">    REQUESTED</span><span class="__shiki_140thh">,     </span><span class="__shiki_21nrsd">// 请求状态</span></span>
<span class="line"><span class="__shiki_dzsirb">    INFLIGHT</span><span class="__shiki_140thh">,      </span><span class="__shiki_21nrsd">// 执行中</span></span>
<span class="line"><span class="__shiki_dzsirb">    COMPLETED</span><span class="__shiki_21nrsd">      // 完成</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-2-2-文件布局设计" tabindex="-1">2.2.2 文件布局设计 <a class="header-anchor" href="#_2-2-2-文件布局设计" aria-label="Permalink to &quot;2.2.2 文件布局设计&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">table_path/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── .hoodie/                    # 元数据目录</span></span>
<span class="line"><span class="__shiki_wvjl67">├── partition1/                 # 分区目录</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── file1_1.parquet        # COW: 基础文件</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── file1_2.parquet</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── .file1_1.log           # MOR: 增量日志文件</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── .file1_2.log</span></span>
<span class="line"><span class="__shiki_wvjl67">├── partition2/</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── file2_1.parquet</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── .file2_1.log</span></span>
<span class="line"><span class="__shiki_wvjl67">└── ...</span></span></code></pre></div><hr><h2 id="三、表类型与存储模型" tabindex="-1">三、表类型与存储模型 <a class="header-anchor" href="#三、表类型与存储模型" aria-label="Permalink to &quot;三、表类型与存储模型&quot;">​</a></h2><h3 id="_3-1-copy-on-write-cow-表" tabindex="-1">3.1 Copy-On-Write (COW) 表 <a class="header-anchor" href="#_3-1-copy-on-write-cow-表" aria-label="Permalink to &quot;3.1 Copy-On-Write (COW) 表&quot;">​</a></h3><h4 id="_3-1-1-cow原理" tabindex="-1">3.1.1 COW原理 <a class="header-anchor" href="#_3-1-1-cow原理" aria-label="Permalink to &quot;3.1.1 COW原理&quot;">​</a></h4><p><strong>基本思想：</strong> 写入时复制整个数据文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">更新前：</span></span>
<span class="line"><span class="__shiki_wvjl67">分区1/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── file1.parquet [id: 1,2,3,4,5]</span></span>
<span class="line"><span class="__shiki_wvjl67">├── file2.parquet [id: 6,7,8,9,10]</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">更新操作：UPDATE id=5 SET value=&#39;new&#39;</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">更新后：</span></span>
<span class="line"><span class="__shiki_wvjl67">分区1/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── file1.parquet [id: 1,2,3,4]      ← 原文件保留</span></span>
<span class="line"><span class="__shiki_wvjl67">├── file2.parquet [id: 6,7,8,9,10]   ← 原文件保留</span></span>
<span class="line"><span class="__shiki_wvjl67">├── file1_new.parquet [id: 5, value=&#39;new&#39;] ← 新文件</span></span></code></pre></div><h4 id="_3-1-2-cow写入流程" tabindex="-1">3.1.2 COW写入流程 <a class="header-anchor" href="#_3-1-2-cow写入流程" aria-label="Permalink to &quot;3.1.2 COW写入流程&quot;">​</a></h4><div class="language-scala vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">scala</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CopyOnWriteWriteClient</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  def</span><span class="__shiki_1t8gfj"> upsert</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">records</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">RDD</span><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">HoodieRecord</span><span class="__shiki_140thh">[_]])</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Unit</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 标记记录状态（插入/更新）</span></span>
<span class="line"><span class="__shiki_1itgoe">    val</span><span class="__shiki_1jdh33"> taggedRecords</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> tagRecords(records)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 按文件分组</span></span>
<span class="line"><span class="__shiki_1itgoe">    val</span><span class="__shiki_1jdh33"> groupedRecords</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> taggedRecords.groupBy(_.getCurrentLocation.getFileId)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 处理每个文件</span></span>
<span class="line"><span class="__shiki_140thh">    groupedRecords.foreach { </span><span class="__shiki_1itgoe">case</span><span class="__shiki_140thh"> (fileId, fileRecords) </span><span class="__shiki_1itgoe">=&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 读取原文件</span></span>
<span class="line"><span class="__shiki_1itgoe">      val</span><span class="__shiki_1jdh33"> oldFile</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> readParquetFile(fileId)</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 合并记录</span></span>
<span class="line"><span class="__shiki_1itgoe">      val</span><span class="__shiki_1jdh33"> mergedRecords</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> mergeRecords(oldFile, fileRecords)</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 写入新文件</span></span>
<span class="line"><span class="__shiki_1itgoe">      val</span><span class="__shiki_1jdh33"> newFileId</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> generateNewFileId()</span></span>
<span class="line"><span class="__shiki_140thh">      writeParquetFile(newFileId, mergedRecords)</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 记录更新：删除旧文件，添加新文件</span></span>
<span class="line"><span class="__shiki_140thh">      recordFileChange(fileId, newFileId, fileRecords.count(_.isUpdate))</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 提交事务</span></span>
<span class="line"><span class="__shiki_140thh">    commitTransaction()</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-1-3-cow优缺点" tabindex="-1">3.1.3 COW优缺点 <a class="header-anchor" href="#_3-1-3-cow优缺点" aria-label="Permalink to &quot;3.1.3 COW优缺点&quot;">​</a></h4><p><strong>优点：</strong></p><ul><li>读取性能高（直接读取Parquet文件）</li><li>实现简单，数据一致性容易保证</li><li>适合读多写少的场景</li></ul><p><strong>缺点：</strong></p><ul><li>写放大严重（每次更新都要重写整个文件）</li><li>写入延迟高</li><li>不适合频繁更新的场景</li></ul><h3 id="_3-2-merge-on-read-mor-表" tabindex="-1">3.2 Merge-On-Read (MOR) 表 <a class="header-anchor" href="#_3-2-merge-on-read-mor-表" aria-label="Permalink to &quot;3.2 Merge-On-Read (MOR) 表&quot;">​</a></h3><h4 id="_3-2-1-mor原理" tabindex="-1">3.2.1 MOR原理 <a class="header-anchor" href="#_3-2-1-mor原理" aria-label="Permalink to &quot;3.2.1 MOR原理&quot;">​</a></h4><p><strong>基本思想：</strong> 写入增量日志，读取时合并</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">存储结构：</span></span>
<span class="line"><span class="__shiki_wvjl67">分区1/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── base_file.parquet        # 基础文件（列存）</span></span>
<span class="line"><span class="__shiki_wvjl67">│   [id:1,value:A], [id:2,value:B], [id:3,value:C]</span></span>
<span class="line"><span class="__shiki_wvjl67">├── .base_file.log.1_1-0-1   # 增量日志1（行存）</span></span>
<span class="line"><span class="__shiki_wvjl67">│   [id:2,value:X]           # 更新</span></span>
<span class="line"><span class="__shiki_wvjl67">├── .base_file.log.1_2-0-1   # 增量日志2</span></span>
<span class="line"><span class="__shiki_wvjl67">│   [id:4,value:D]           # 插入</span></span>
<span class="line"><span class="__shiki_wvjl67">│   [id:DELETE,value:null]   # 删除id=3</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">读取时合并结果：</span></span>
<span class="line"><span class="__shiki_wvjl67">id:1 → A (来自base)</span></span>
<span class="line"><span class="__shiki_wvjl67">id:2 → X (来自log，覆盖base)</span></span>
<span class="line"><span class="__shiki_wvjl67">id:3 → null (已删除)</span></span>
<span class="line"><span class="__shiki_wvjl67">id:4 → D (来自log)</span></span></code></pre></div><h4 id="_3-2-2-mor组件详解" tabindex="-1">3.2.2 MOR组件详解 <a class="header-anchor" href="#_3-2-2-mor组件详解" aria-label="Permalink to &quot;3.2.2 MOR组件详解&quot;">​</a></h4><p><strong>基础文件（Base File）：</strong></p><ul><li>Parquet格式</li><li>定期通过压缩（Compaction）生成</li><li>包含完整数据快照</li></ul><p><strong>增量日志文件（Log File）：</strong></p><ul><li>Avro格式（行存）</li><li>存储增量更新</li><li>按写入顺序追加</li><li>支持三种记录类型： <ul><li>INSERT</li><li>UPDATE</li><li>DELETE</li></ul></li></ul><h4 id="_3-2-3-mor写入流程" tabindex="-1">3.2.3 MOR写入流程 <a class="header-anchor" href="#_3-2-3-mor写入流程" aria-label="Permalink to &quot;3.2.3 MOR写入流程&quot;">​</a></h4><div class="language-scala vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">scala</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> MergeOnReadWriteClient</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  def</span><span class="__shiki_1t8gfj"> upsert</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">records</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">RDD</span><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">HoodieRecord</span><span class="__shiki_140thh">[_]])</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Unit</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 标记记录状态</span></span>
<span class="line"><span class="__shiki_1itgoe">    val</span><span class="__shiki_1jdh33"> taggedRecords</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> tagRecords(records)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 更新/插入到对应的日志文件</span></span>
<span class="line"><span class="__shiki_140thh">    taggedRecords.foreach { record </span><span class="__shiki_1itgoe">=&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">      val</span><span class="__shiki_1jdh33"> fileId</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> record.getCurrentLocation.getFileId</span></span>
<span class="line"><span class="__shiki_1itgoe">      val</span><span class="__shiki_1jdh33"> logFile</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> getOrCreateLogFile(fileId)</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 写入Avro格式的日志记录</span></span>
<span class="line"><span class="__shiki_140thh">      logFile.append(record)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 异步压缩（定期合并日志到基础文件）</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (shouldCompact()) {</span></span>
<span class="line"><span class="__shiki_140thh">      scheduleCompaction()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 提交事务</span></span>
<span class="line"><span class="__shiki_140thh">    commitTransaction()</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-2-4-mor读取流程" tabindex="-1">3.2.4 MOR读取流程 <a class="header-anchor" href="#_3-2-4-mor读取流程" aria-label="Permalink to &quot;3.2.4 MOR读取流程&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> MergeOnReadReader</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  public</span><span class="__shiki_140thh"> Iterator&lt;</span><span class="__shiki_1itgoe">Record</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">read</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">partition</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">fileId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 读取基础文件</span></span>
<span class="line"><span class="__shiki_140thh">    ParquetReader baseReader </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> readParquetFile</span><span class="__shiki_140thh">(basePath);</span></span>
<span class="line"><span class="__shiki_140thh">    Map&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Record</span><span class="__shiki_140thh">&gt; resultMap </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> HashMap&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 读取所有基础记录</span></span>
<span class="line"><span class="__shiki_1itgoe">    while</span><span class="__shiki_140thh"> (baseReader.</span><span class="__shiki_1t8gfj">hasNext</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_140thh">      Record record </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> baseReader.</span><span class="__shiki_1t8gfj">next</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      resultMap.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(record.</span><span class="__shiki_1t8gfj">getKey</span><span class="__shiki_140thh">(), record);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    baseReader.</span><span class="__shiki_1t8gfj">close</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 读取并应用日志文件</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">LogFile</span><span class="__shiki_140thh">&gt; logFiles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> getLogFiles</span><span class="__shiki_140thh">(fileId);</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (LogFile logFile </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> logFiles) {</span></span>
<span class="line"><span class="__shiki_140thh">      AvroReader logReader </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> readAvroFile</span><span class="__shiki_140thh">(logFile);</span></span>
<span class="line"><span class="__shiki_1itgoe">      while</span><span class="__shiki_140thh"> (logReader.</span><span class="__shiki_1t8gfj">hasNext</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_140thh">        HoodieAvroRecord logRecord </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> logReader.</span><span class="__shiki_1t8gfj">next</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        String operation </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> logRecord.</span><span class="__shiki_1t8gfj">getOperation</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        switch</span><span class="__shiki_140thh"> (operation) {</span></span>
<span class="line"><span class="__shiki_1itgoe">          case</span><span class="__shiki_mdbnqw"> &quot;INSERT&quot;</span><span class="__shiki_1itgoe">:</span></span>
<span class="line"><span class="__shiki_1itgoe">          case</span><span class="__shiki_mdbnqw"> &quot;UPDATE&quot;</span><span class="__shiki_1itgoe">:</span></span>
<span class="line"><span class="__shiki_140thh">            resultMap.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(logRecord.</span><span class="__shiki_1t8gfj">getKey</span><span class="__shiki_140thh">(), logRecord);</span></span>
<span class="line"><span class="__shiki_1itgoe">            break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">          case</span><span class="__shiki_mdbnqw"> &quot;DELETE&quot;</span><span class="__shiki_1itgoe">:</span></span>
<span class="line"><span class="__shiki_140thh">            resultMap.</span><span class="__shiki_1t8gfj">remove</span><span class="__shiki_140thh">(logRecord.</span><span class="__shiki_1t8gfj">getKey</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_1itgoe">            break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      logReader.</span><span class="__shiki_1t8gfj">close</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 返回合并后的结果</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> resultMap.</span><span class="__shiki_1t8gfj">values</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">iterator</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-2-5-mor优缺点" tabindex="-1">3.2.5 MOR优缺点 <a class="header-anchor" href="#_3-2-5-mor优缺点" aria-label="Permalink to &quot;3.2.5 MOR优缺点&quot;">​</a></h4><p><strong>优点：</strong></p><ul><li>写入延迟低（只写增量日志）</li><li>写放大少</li><li>适合写多读少的场景</li><li>支持近实时数据摄入</li></ul><p><strong>缺点：</strong></p><ul><li>读取性能较低（需要合并操作）</li><li>实现复杂</li><li>需要定期压缩维护</li></ul><h3 id="_3-3-cow-vs-mor选择指南" tabindex="-1">3.3 COW vs MOR选择指南 <a class="header-anchor" href="#_3-3-cow-vs-mor选择指南" aria-label="Permalink to &quot;3.3 COW vs MOR选择指南&quot;">​</a></h3><table tabindex="0"><thead><tr><th>考虑因素</th><th>选择COW</th><th>选择MOR</th></tr></thead><tbody><tr><td><strong>读写比例</strong></td><td>读多写少</td><td>写多读少</td></tr><tr><td><strong>数据延迟要求</strong></td><td>分钟级延迟可接受</td><td>秒级延迟要求</td></tr><tr><td><strong>查询类型</strong></td><td>复杂分析查询</td><td>简单点查、增量查询</td></tr><tr><td><strong>存储成本</strong></td><td>较高（多版本数据）</td><td>较低（增量存储）</td></tr><tr><td><strong>维护复杂度</strong></td><td>简单</td><td>复杂（需压缩管理）</td></tr><tr><td><strong>典型场景</strong></td><td>数据仓库，批量ETL</td><td>CDC同步，实时数仓</td></tr></tbody></table><hr><h2 id="四、索引系统" tabindex="-1">四、索引系统 <a class="header-anchor" href="#四、索引系统" aria-label="Permalink to &quot;四、索引系统&quot;">​</a></h2><h3 id="_4-1-索引类型对比" tabindex="-1">4.1 索引类型对比 <a class="header-anchor" href="#_4-1-索引类型对比" aria-label="Permalink to &quot;4.1 索引类型对比&quot;">​</a></h3><table tabindex="0"><thead><tr><th>索引类型</th><th>原理</th><th>优点</th><th>缺点</th><th>适用场景</th></tr></thead><tbody><tr><td><strong>布隆过滤器索引</strong></td><td>为每个文件创建布隆过滤器</td><td>存储开销小，查询快</td><td>有误报率，无法处理删除</td><td>点查为主，删除少的场景</td></tr><tr><td><strong>简单索引</strong></td><td>扫描全部分区查找记录</td><td>实现简单，无额外存储</td><td>性能差，O(N)复杂度</td><td>小数据集测试</td></tr><tr><td><strong>全局布隆过滤器索引</strong></td><td>全局布隆过滤器+文件映射</td><td>全局过滤，减少扫描</td><td>更新维护复杂</td><td>跨分区点查</td></tr><tr><td><strong>HBase索引</strong></td><td>使用HBase存储索引</td><td>高性能，支持删除</td><td>外部依赖，运维复杂</td><td>生产环境大规模数据</td></tr><tr><td><strong>InMemory哈希索引</strong></td><td>内存哈希表</td><td>极高性能</td><td>内存限制，重启丢失</td><td>内存充足，实时场景</td></tr><tr><td><strong>自定义索引</strong></td><td>用户自定义实现</td><td>灵活定制</td><td>开发成本高</td><td>特殊业务需求</td></tr></tbody></table><h3 id="_4-2-布隆过滤器索引详解" tabindex="-1">4.2 布隆过滤器索引详解 <a class="header-anchor" href="#_4-2-布隆过滤器索引详解" aria-label="Permalink to &quot;4.2 布隆过滤器索引详解&quot;">​</a></h3><p><strong>实现原理：</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> BloomIndex</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> BaseIndex</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 每个文件的布隆过滤器</span></span>
<span class="line"><span class="__shiki_1itgoe">  private</span><span class="__shiki_140thh"> Map&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">BloomFilter</span><span class="__shiki_140thh">&gt; fileBloomFilters </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> HashMap&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">  public</span><span class="__shiki_140thh"> List&lt;Pair&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt;&gt; </span><span class="__shiki_1t8gfj">tagLocation</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      List&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">recordKeys</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">      JavaSparkContext </span><span class="__shiki_1jdh33">jsc</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">      HoodieTable </span><span class="__shiki_1jdh33">hoodieTable</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 加载所有分区的布隆过滤器</span></span>
<span class="line"><span class="__shiki_140thh">    Map&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">BloomFilter</span><span class="__shiki_140thh">&gt; allBloomFilters </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1t8gfj">        loadAllBloomFilters</span><span class="__shiki_140thh">(hoodieTable);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 对每个记录键，检查所有布隆过滤器</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> recordKeys.</span><span class="__shiki_1t8gfj">stream</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">flatMap</span><span class="__shiki_140thh">(recordKey </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">          List&lt;Pair&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt;&gt; matches </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_1itgoe">          for</span><span class="__shiki_140thh"> (Map.Entry&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">BloomFilter</span><span class="__shiki_140thh">&gt; entry </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> allBloomFilters.</span><span class="__shiki_1t8gfj">entrySet</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_140thh">            String filePath </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> entry.</span><span class="__shiki_1t8gfj">getKey</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            BloomFilter bloomFilter </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> entry.</span><span class="__shiki_1t8gfj">getValue</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 布隆过滤器检查（可能有误报）</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (bloomFilter.</span><span class="__shiki_1t8gfj">mightContain</span><span class="__shiki_140thh">(recordKey)) {</span></span>
<span class="line"><span class="__shiki_140thh">              matches.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(Pair.</span><span class="__shiki_1t8gfj">of</span><span class="__shiki_140thh">(recordKey, filePath));</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_1itgoe">          return</span><span class="__shiki_140thh"> matches.</span><span class="__shiki_1t8gfj">stream</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">collect</span><span class="__shiki_140thh">(Collectors.</span><span class="__shiki_1t8gfj">toList</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-3-hbase索引集成" tabindex="-1">4.3 HBase索引集成 <a class="header-anchor" href="#_4-3-hbase索引集成" aria-label="Permalink to &quot;4.3 HBase索引集成&quot;">​</a></h3><p><strong>配置示例：</strong></p><div class="language-properties vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">properties</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Hudi配置</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.index.type</span><span class="__shiki_140thh">=HBASE</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.index.hbase.zkquorum</span><span class="__shiki_140thh">=zk1,zk2,zk3:2181</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.index.hbase.zkport</span><span class="__shiki_140thh">=2181</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.index.hbase.table</span><span class="__shiki_140thh">=hoodie_index</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.index.hbase.get.batch.size</span><span class="__shiki_140thh">=100</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.index.hbase.put.batch.size</span><span class="__shiki_140thh">=100</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># HBase表结构设计</span></span>
<span class="line"><span class="__shiki_140thh">Table: hoodie_index</span></span>
<span class="line"><span class="__shiki_140thh">  RowKey: record_key</span></span>
<span class="line"><span class="__shiki_140thh">  Column Family: f</span></span>
<span class="line"><span class="__shiki_140thh">    Column: file_path     </span><span class="__shiki_21nrsd"># 记录所在文件路径</span></span>
<span class="line"><span class="__shiki_140thh">    Column: partition     </span><span class="__shiki_21nrsd"># 记录所在分区</span></span>
<span class="line"><span class="__shiki_140thh">    Column: update_time   </span><span class="__shiki_21nrsd"># 更新时间</span></span></code></pre></div><p><strong>HBase索引写入流程：</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> HBaseIndex</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> BaseIndex</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  private</span><span class="__shiki_140thh"> Connection hbaseConnection;</span></span>
<span class="line"><span class="__shiki_1itgoe">  private</span><span class="__shiki_140thh"> Table indexTable;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">  public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> updateLocation</span><span class="__shiki_140thh">(List&lt;</span><span class="__shiki_1itgoe">HoodieRecord</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">records</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">Put</span><span class="__shiki_140thh">&gt; puts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (HoodieRecord record </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> records) {</span></span>
<span class="line"><span class="__shiki_140thh">      Put put </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Put</span><span class="__shiki_140thh">(Bytes.</span><span class="__shiki_1t8gfj">toBytes</span><span class="__shiki_140thh">(record.</span><span class="__shiki_1t8gfj">getRecordKey</span><span class="__shiki_140thh">()));</span></span>
<span class="line"><span class="__shiki_140thh">      put.</span><span class="__shiki_1t8gfj">addColumn</span><span class="__shiki_140thh">(BYTES_CF, BYTES_FILE_PATH, </span></span>
<span class="line"><span class="__shiki_140thh">                   Bytes.</span><span class="__shiki_1t8gfj">toBytes</span><span class="__shiki_140thh">(record.</span><span class="__shiki_1t8gfj">getCurrentLocation</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">getFileId</span><span class="__shiki_140thh">()));</span></span>
<span class="line"><span class="__shiki_140thh">      put.</span><span class="__shiki_1t8gfj">addColumn</span><span class="__shiki_140thh">(BYTES_CF, BYTES_PARTITION, </span></span>
<span class="line"><span class="__shiki_140thh">                   Bytes.</span><span class="__shiki_1t8gfj">toBytes</span><span class="__shiki_140thh">(record.</span><span class="__shiki_1t8gfj">getPartitionPath</span><span class="__shiki_140thh">()));</span></span>
<span class="line"><span class="__shiki_140thh">      put.</span><span class="__shiki_1t8gfj">addColumn</span><span class="__shiki_140thh">(BYTES_CF, BYTES_UPDATE_TIME, </span></span>
<span class="line"><span class="__shiki_140thh">                   Bytes.</span><span class="__shiki_1t8gfj">toBytes</span><span class="__shiki_140thh">(System.</span><span class="__shiki_1t8gfj">currentTimeMillis</span><span class="__shiki_140thh">()));</span></span>
<span class="line"><span class="__shiki_140thh">      puts.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(put);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 批量写入HBase</span></span>
<span class="line"><span class="__shiki_140thh">    indexTable.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(puts);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-4-索引选择策略" tabindex="-1">4.4 索引选择策略 <a class="header-anchor" href="#_4-4-索引选择策略" aria-label="Permalink to &quot;4.4 索引选择策略&quot;">​</a></h3><p><strong>决策树：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">数据集大小? </span></span>
<span class="line"><span class="__shiki_wvjl67">  ├── 小数据集 (&lt;100GB) → 简单索引/布隆过滤器</span></span>
<span class="line"><span class="__shiki_wvjl67">  └── 大数据集</span></span>
<span class="line"><span class="__shiki_wvjl67">        ├── 查询模式?</span></span>
<span class="line"><span class="__shiki_wvjl67">        │    ├── 点查为主 → 布隆过滤器/全局索引</span></span>
<span class="line"><span class="__shiki_wvjl67">        │    ├── 范围查询 → 无索引/Z-Ordering</span></span>
<span class="line"><span class="__shiki_wvjl67">        │    └── 混合查询 → 多级索引策略</span></span>
<span class="line"><span class="__shiki_wvjl67">        └── 基础设施?</span></span>
<span class="line"><span class="__shiki_wvjl67">              ├── 有HBase集群 → HBase索引</span></span>
<span class="line"><span class="__shiki_wvjl67">              ├── 内存充足 → InMemory哈希索引</span></span>
<span class="line"><span class="__shiki_wvjl67">              └── 云环境 → 全局布隆过滤器索引</span></span></code></pre></div><hr><h2 id="五、增量处理与查询" tabindex="-1">五、增量处理与查询 <a class="header-anchor" href="#五、增量处理与查询" aria-label="Permalink to &quot;五、增量处理与查询&quot;">​</a></h2><h3 id="_5-1-增量拉取-incremental-pull" tabindex="-1">5.1 增量拉取（Incremental Pull） <a class="header-anchor" href="#_5-1-增量拉取-incremental-pull" aria-label="Permalink to &quot;5.1 增量拉取（Incremental Pull）&quot;">​</a></h3><p><strong>原理：</strong> 基于时间线的增量数据获取</p><div class="language-scala vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">scala</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 增量读取配置</span></span>
<span class="line"><span class="__shiki_1itgoe">val</span><span class="__shiki_1jdh33"> incrementalDF</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> spark.read</span></span>
<span class="line"><span class="__shiki_140thh">  .format(</span><span class="__shiki_mdbnqw">&quot;org.apache.hudi&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .option(</span><span class="__shiki_1t8gfj">QUERY_TYPE_OPT_KEY</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">QUERY_TYPE_INCREMENTAL_OPT_VAL</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .option(</span><span class="__shiki_1t8gfj">BEGIN_INSTANTTIME_OPT_KEY</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;20230101000000&quot;</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">// 开始时间</span></span>
<span class="line"><span class="__shiki_140thh">  .option(</span><span class="__shiki_1t8gfj">END_INSTANTTIME_OPT_KEY</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;20230102000000&quot;</span><span class="__shiki_140thh">)    </span><span class="__shiki_21nrsd">// 结束时间</span></span>
<span class="line"><span class="__shiki_140thh">  .load(tablePath)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 支持的查询模式</span></span>
<span class="line"><span class="__shiki_1itgoe">val</span><span class="__shiki_1jdh33"> incrementalOptions</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;hoodie.datasource.query.type&quot;</span><span class="__shiki_1itgoe"> -&gt;</span><span class="__shiki_mdbnqw"> &quot;incremental&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;hoodie.datasource.read.begin.instanttime&quot;</span><span class="__shiki_1itgoe"> -&gt;</span><span class="__shiki_mdbnqw"> &quot;20230101000000&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;hoodie.datasource.read.end.instanttime&quot;</span><span class="__shiki_1itgoe"> -&gt;</span><span class="__shiki_mdbnqw"> &quot;20230102000000&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 增量模式</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;hoodie.datasource.read.incr.mode&quot;</span><span class="__shiki_1itgoe"> -&gt;</span><span class="__shiki_mdbnqw"> &quot;latest_file_slices&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 默认</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 或 &quot;hoodie.datasource.read.incr.mode&quot; -&gt; &quot;latest_commits&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 过滤条件</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;hoodie.datasource.read.partitions&quot;</span><span class="__shiki_1itgoe"> -&gt;</span><span class="__shiki_mdbnqw"> &quot;2023/01/01,2023/01/02&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_5-2-增量处理流程" tabindex="-1">5.2 增量处理流程 <a class="header-anchor" href="#_5-2-增量处理流程" aria-label="Permalink to &quot;5.2 增量处理流程&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> IncrementalProcessing</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  public</span><span class="__shiki_140thh"> Dataset&lt;</span><span class="__shiki_1itgoe">Row</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">processIncrementalData</span><span class="__shiki_140thh">(SparkSession </span><span class="__shiki_1jdh33">spark</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                                             String </span><span class="__shiki_1jdh33">tablePath</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                                             String </span><span class="__shiki_1jdh33">startTime</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                                             String </span><span class="__shiki_1jdh33">endTime</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 加载Hudi表</span></span>
<span class="line"><span class="__shiki_140thh">    Dataset&lt;</span><span class="__shiki_1itgoe">Row</span><span class="__shiki_140thh">&gt; hoodieDf </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> spark.</span><span class="__shiki_1t8gfj">read</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;org.apache.hudi&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">option</span><span class="__shiki_140thh">(QUERY_TYPE_OPT_KEY, QUERY_TYPE_INCREMENTAL_OPT_VAL)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">option</span><span class="__shiki_140thh">(BEGIN_INSTANTTIME_OPT_KEY, startTime)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">option</span><span class="__shiki_140thh">(END_INSTANTTIME_OPT_KEY, endTime)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">load</span><span class="__shiki_140thh">(tablePath);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 转换为HoodieRecord格式</span></span>
<span class="line"><span class="__shiki_140thh">    Dataset&lt;</span><span class="__shiki_1itgoe">HoodieRecord</span><span class="__shiki_140thh">&gt; records </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> hoodieDf.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(row </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      String recordKey </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> row.</span><span class="__shiki_1t8gfj">getString</span><span class="__shiki_140thh">(row.</span><span class="__shiki_1t8gfj">fieldIndex</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;_hoodie_record_key&quot;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">      String partitionPath </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> row.</span><span class="__shiki_1t8gfj">getString</span><span class="__shiki_140thh">(row.</span><span class="__shiki_1t8gfj">fieldIndex</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;_hoodie_partition_path&quot;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">      String operation </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> row.</span><span class="__shiki_1t8gfj">getString</span><span class="__shiki_140thh">(row.</span><span class="__shiki_1t8gfj">fieldIndex</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;_hoodie_operation&quot;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> HoodieRecord</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1itgoe">        new</span><span class="__shiki_1t8gfj"> HoodieKey</span><span class="__shiki_140thh">(recordKey, partitionPath),</span></span>
<span class="line"><span class="__shiki_1itgoe">        new</span><span class="__shiki_1t8gfj"> HoodieRecordPayload</span><span class="__shiki_140thh">(row, operation)</span></span>
<span class="line"><span class="__shiki_140thh">      );</span></span>
<span class="line"><span class="__shiki_140thh">    }, Encoders.</span><span class="__shiki_1t8gfj">bean</span><span class="__shiki_140thh">(HoodieRecord.class));</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 按操作类型处理</span></span>
<span class="line"><span class="__shiki_140thh">    Map&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, Dataset&lt;</span><span class="__shiki_1itgoe">HoodieRecord</span><span class="__shiki_140thh">&gt;&gt; grouped </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> records</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">groupByKey</span><span class="__shiki_140thh">(record </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> record.</span><span class="__shiki_1t8gfj">getOperation</span><span class="__shiki_140thh">(), Encoders.</span><span class="__shiki_1t8gfj">STRING</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">mapGroups</span><span class="__shiki_140thh">((op, recordsIter) </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">          List&lt;</span><span class="__shiki_1itgoe">HoodieRecord</span><span class="__shiki_140thh">&gt; recordList </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">          recordsIter.</span><span class="__shiki_1t8gfj">forEachRemaining</span><span class="__shiki_140thh">(recordList</span><span class="__shiki_1itgoe">::</span><span class="__shiki_140thh">add);</span></span>
<span class="line"><span class="__shiki_1itgoe">          return</span><span class="__shiki_140thh"> Tuple2.</span><span class="__shiki_1t8gfj">apply</span><span class="__shiki_140thh">(op, spark.</span><span class="__shiki_1t8gfj">createDataset</span><span class="__shiki_140thh">(recordList, </span></span>
<span class="line"><span class="__shiki_140thh">              Encoders.</span><span class="__shiki_1t8gfj">bean</span><span class="__shiki_140thh">(HoodieRecord.class)));</span></span>
<span class="line"><span class="__shiki_140thh">        }, Encoders.</span><span class="__shiki_1t8gfj">tuple</span><span class="__shiki_140thh">(Encoders.</span><span class="__shiki_1t8gfj">STRING</span><span class="__shiki_140thh">(), </span></span>
<span class="line"><span class="__shiki_140thh">            Encoders.</span><span class="__shiki_1t8gfj">bean</span><span class="__shiki_140thh">(HoodieRecord.class)))</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">collectAsMap</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 分别处理INSERT、UPDATE、DELETE</span></span>
<span class="line"><span class="__shiki_140thh">    Dataset&lt;</span><span class="__shiki_1itgoe">Row</span><span class="__shiki_140thh">&gt; inserts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> processInserts</span><span class="__shiki_140thh">(grouped.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;INSERT&quot;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">    Dataset&lt;</span><span class="__shiki_1itgoe">Row</span><span class="__shiki_140thh">&gt; updates </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> processUpdates</span><span class="__shiki_140thh">(grouped.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;UPDATE&quot;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">    Dataset&lt;</span><span class="__shiki_1itgoe">Row</span><span class="__shiki_140thh">&gt; deletes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> processDeletes</span><span class="__shiki_140thh">(grouped.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;DELETE&quot;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 合并结果</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> inserts.</span><span class="__shiki_1t8gfj">union</span><span class="__shiki_140thh">(updates).</span><span class="__shiki_1t8gfj">except</span><span class="__shiki_140thh">(deletes);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-3-增量查询优化" tabindex="-1">5.3 增量查询优化 <a class="header-anchor" href="#_5-3-增量查询优化" aria-label="Permalink to &quot;5.3 增量查询优化&quot;">​</a></h3><p><strong>优化策略：</strong></p><ol><li><strong>分区剪枝</strong>：基于时间范围过滤分区</li><li><strong>文件切片过滤</strong>：只读取包含增量数据的文件切片</li><li><strong>索引加速</strong>：使用索引快速定位增量记录</li><li><strong>压缩感知</strong>：智能跳过已压缩的增量数据</li></ol><p><strong>性能调优参数：</strong></p><div class="language-properties vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">properties</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 增量读取优化配置</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.datasource.read.incr.path.glob</span><span class="__shiki_140thh">=/*/*  </span><span class="__shiki_21nrsd"># 路径匹配模式</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.datasource.read.incr.file.format</span><span class="__shiki_140thh">=parquet  </span><span class="__shiki_21nrsd"># 文件格式过滤</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.datasource.read.incr.max.commits</span><span class="__shiki_140thh">=100  </span><span class="__shiki_21nrsd"># 最大提交数限制</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.datasource.read.incr.parallelism</span><span class="__shiki_140thh">=200  </span><span class="__shiki_21nrsd"># 读取并行度</span></span></code></pre></div><hr><h2 id="六、表服务-table-services" tabindex="-1">六、表服务（Table Services） <a class="header-anchor" href="#六、表服务-table-services" aria-label="Permalink to &quot;六、表服务（Table Services）&quot;">​</a></h2><h3 id="_6-1-压缩-compaction-服务" tabindex="-1">6.1 压缩（Compaction）服务 <a class="header-anchor" href="#_6-1-压缩-compaction-服务" aria-label="Permalink to &quot;6.1 压缩（Compaction）服务&quot;">​</a></h3><h4 id="_6-1-1-压缩类型" tabindex="-1">6.1.1 压缩类型 <a class="header-anchor" href="#_6-1-1-压缩类型" aria-label="Permalink to &quot;6.1.1 压缩类型&quot;">​</a></h4><p><strong>同步压缩：</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 写入时同步触发压缩</span></span>
<span class="line"><span class="__shiki_140thh">WriteConfig config </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> HoodieWriteConfig.</span><span class="__shiki_1t8gfj">newBuilder</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    .</span><span class="__shiki_1t8gfj">withPath</span><span class="__shiki_140thh">(tablePath)</span></span>
<span class="line"><span class="__shiki_140thh">    .</span><span class="__shiki_1t8gfj">withSchema</span><span class="__shiki_140thh">(schema)</span></span>
<span class="line"><span class="__shiki_140thh">    .</span><span class="__shiki_1t8gfj">withCompactionConfig</span><span class="__shiki_140thh">(HoodieCompactionConfig.</span><span class="__shiki_1t8gfj">newBuilder</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">withInlineCompaction</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">// 开启同步压缩</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">withInlineCompactionTriggerStrategy</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            CompactionTriggerStrategy.NUM_COMMITS)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">withInlineCompactionDeltaCommits</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">// 每5次提交压缩一次</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">build</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">    .</span><span class="__shiki_1t8gfj">build</span><span class="__shiki_140thh">();</span></span></code></pre></div><p><strong>异步压缩：</strong></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 命令行触发异步压缩</span></span>
<span class="line"><span class="__shiki_1t8gfj">spark-submit</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --class</span><span class="__shiki_mdbnqw"> org.apache.hudi.utilities.HoodieCompactor</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --master</span><span class="__shiki_mdbnqw"> yarn</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  hudi-utilities-bundle.jar</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --base-path</span><span class="__shiki_mdbnqw"> /path/to/hudi/table</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --table-name</span><span class="__shiki_mdbnqw"> table_name</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --schema-file</span><span class="__shiki_mdbnqw"> schema.avsc</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --instant-time</span><span class="__shiki_dzsirb"> 20230101010101</span></span></code></pre></div><h4 id="_6-1-2-压缩策略" tabindex="-1">6.1.2 压缩策略 <a class="header-anchor" href="#_6-1-2-压缩策略" aria-label="Permalink to &quot;6.1.2 压缩策略&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> LogCompactionStrategy</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 基于文件大小的策略</span></span>
<span class="line"><span class="__shiki_1itgoe">  public</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> BoundedIOCompactionStrategy</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">      implements</span><span class="__shiki_1t8gfj"> CompactionStrategy</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">CompactionOperation</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">orderAndFilter</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        List&lt;</span><span class="__shiki_1itgoe">CompactionOperation</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">operations</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        List&lt;</span><span class="__shiki_1itgoe">HoodieCompactionMetadata</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">metadata</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> operations.</span><span class="__shiki_1t8gfj">stream</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">          .</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(op </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 过滤条件</span></span>
<span class="line"><span class="__shiki_1itgoe">            long</span><span class="__shiki_140thh"> totalLogFileSize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> op.</span><span class="__shiki_1t8gfj">getMetrics</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">getTotalLogFileSize</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">            long</span><span class="__shiki_140thh"> baseFileSize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> op.</span><span class="__shiki_1t8gfj">getMetrics</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">getBaseFileSize</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 策略1: 日志文件总大小超过阈值</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (totalLogFileSize </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> MAX_LOG_FILE_SIZE) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 策略2: 日志/基础文件比例超过阈值</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (totalLogFileSize </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> baseFileSize </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> LOG_TO_BASE_RATIO) </span></span>
<span class="line"><span class="__shiki_1itgoe">              return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 策略3: 增量记录数超过阈值</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (op.</span><span class="__shiki_1t8gfj">getMetrics</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">getNumInserts</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> MAX_INSERTS) </span></span>
<span class="line"><span class="__shiki_1itgoe">              return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">          })</span></span>
<span class="line"><span class="__shiki_140thh">          .</span><span class="__shiki_1t8gfj">sorted</span><span class="__shiki_140thh">(Comparator</span></span>
<span class="line"><span class="__shiki_140thh">              .</span><span class="__shiki_1t8gfj">comparingLong</span><span class="__shiki_140thh">(op </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> op.</span><span class="__shiki_1t8gfj">getMetrics</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">getTotalLogFileSize</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">              .</span><span class="__shiki_1t8gfj">reversed</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">          .</span><span class="__shiki_1t8gfj">collect</span><span class="__shiki_140thh">(Collectors.</span><span class="__shiki_1t8gfj">toList</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-清理-clean-服务" tabindex="-1">6.2 清理（Clean）服务 <a class="header-anchor" href="#_6-2-清理-clean-服务" aria-label="Permalink to &quot;6.2 清理（Clean）服务&quot;">​</a></h3><p><strong>清理策略：</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Cleaner</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 基于时间保留策略</span></span>
<span class="line"><span class="__shiki_1itgoe">  public</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> TimeBasedCleanPolicy</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> CleanPolicy</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">CleanFileInfo</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">getFilesToClean</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        HoodieTableMetaClient </span><span class="__shiki_1jdh33">metaClient</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      List&lt;</span><span class="__shiki_1itgoe">CleanFileInfo</span><span class="__shiki_140thh">&gt; filesToClean </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_1itgoe">      long</span><span class="__shiki_140thh"> currentTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> System.</span><span class="__shiki_1t8gfj">currentTimeMillis</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 获取所有文件版本</span></span>
<span class="line"><span class="__shiki_140thh">      Map&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, List&lt;</span><span class="__shiki_1itgoe">FileVersion</span><span class="__shiki_140thh">&gt;&gt; fileVersions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1t8gfj">          getFileVersions</span><span class="__shiki_140thh">(metaClient);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      for</span><span class="__shiki_140thh"> (Map.Entry&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, List&lt;</span><span class="__shiki_1itgoe">FileVersion</span><span class="__shiki_140thh">&gt;&gt; entry </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">           fileVersions.</span><span class="__shiki_1t8gfj">entrySet</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        String fileId </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> entry.</span><span class="__shiki_1t8gfj">getKey</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        List&lt;</span><span class="__shiki_1itgoe">FileVersion</span><span class="__shiki_140thh">&gt; versions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> entry.</span><span class="__shiki_1t8gfj">getValue</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 保留最新版本</span></span>
<span class="line"><span class="__shiki_140thh">        FileVersion latestVersion </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> versions.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(versions.</span><span class="__shiki_1t8gfj">size</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 清理旧版本</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (FileVersion version </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> versions) {</span></span>
<span class="line"><span class="__shiki_1itgoe">          if</span><span class="__shiki_140thh"> (version </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> latestVersion) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            long</span><span class="__shiki_140thh"> fileAge </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> currentTime </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> version.</span><span class="__shiki_1t8gfj">getCommitTime</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 清理条件：超过保留时间且不被任何查询引用</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (fileAge </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> CLEAN_RETENTION_TIME </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">                !</span><span class="__shiki_1t8gfj">isFileReferenced</span><span class="__shiki_140thh">(version)) {</span></span>
<span class="line"><span class="__shiki_140thh">              filesToClean.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> CleanFileInfo</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                  version.</span><span class="__shiki_1t8gfj">getFilePath</span><span class="__shiki_140thh">(), </span></span>
<span class="line"><span class="__shiki_140thh">                  version.</span><span class="__shiki_1t8gfj">getCommitTime</span><span class="__shiki_140thh">()));</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> filesToClean;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>清理配置：</strong></p><div class="language-properties vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">properties</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 清理策略配置</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.cleaner.policy</span><span class="__shiki_140thh">=KEEP_LATEST_COMMITS</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.cleaner.commits.retained</span><span class="__shiki_140thh">=10  </span><span class="__shiki_21nrsd"># 保留最近10个提交</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.cleaner.hours.retained</span><span class="__shiki_140thh">=24    </span><span class="__shiki_21nrsd"># 保留最近24小时</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.cleaner.fileversions.retained</span><span class="__shiki_140thh">=3  </span><span class="__shiki_21nrsd"># 每个文件保留3个版本</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 并行清理配置</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.clean.parallelism</span><span class="__shiki_140thh">=200</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.clean.async</span><span class="__shiki_140thh">=true</span></span></code></pre></div><h3 id="_6-3-归档-archive-服务" tabindex="-1">6.3 归档（Archive）服务 <a class="header-anchor" href="#_6-3-归档-archive-服务" aria-label="Permalink to &quot;6.3 归档（Archive）服务&quot;">​</a></h3><p><strong>归档策略：</strong></p><div class="language-scala vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">scala</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ArchivalService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  def</span><span class="__shiki_1t8gfj"> archive</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">metaClient</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">HoodieTableMetaClient</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Unit</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    val</span><span class="__shiki_1jdh33"> timeline</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> metaClient.getActiveTimeline</span></span>
<span class="line"><span class="__shiki_1itgoe">    val</span><span class="__shiki_1jdh33"> allInstants</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> timeline.getInstants</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 过滤需要归档的实例</span></span>
<span class="line"><span class="__shiki_1itgoe">    val</span><span class="__shiki_1jdh33"> instantsToArchive</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> allInstants.asScala</span></span>
<span class="line"><span class="__shiki_140thh">      .filter(instant </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        val</span><span class="__shiki_1jdh33"> instantTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> instant.getTimestamp</span></span>
<span class="line"><span class="__shiki_1itgoe">        val</span><span class="__shiki_1jdh33"> age</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> getInstantAge(instantTime)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 归档条件</span></span>
<span class="line"><span class="__shiki_140thh">        age </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1t8gfj"> ARCHIVE_MIN_AGE</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        !</span><span class="__shiki_140thh">isSavepoint(instant) </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        !</span><span class="__shiki_140thh">isReferencedByAnyQuery(instant)</span></span>
<span class="line"><span class="__shiki_140thh">      })</span></span>
<span class="line"><span class="__shiki_140thh">      .toList</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 创建归档文件</span></span>
<span class="line"><span class="__shiki_1itgoe">    val</span><span class="__shiki_1jdh33"> archiveLog</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> HoodieArchiveLog</span><span class="__shiki_140thh">(config)</span></span>
<span class="line"><span class="__shiki_140thh">    archiveLog.archiveIfRequired(sparkContext)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 清理时间线元数据</span></span>
<span class="line"><span class="__shiki_140thh">    timeline.reload()</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><hr><h2 id="七、多引擎集成" tabindex="-1">七、多引擎集成 <a class="header-anchor" href="#七、多引擎集成" aria-label="Permalink to &quot;七、多引擎集成&quot;">​</a></h2><h3 id="_7-1-spark集成" tabindex="-1">7.1 Spark集成 <a class="header-anchor" href="#_7-1-spark集成" aria-label="Permalink to &quot;7.1 Spark集成&quot;">​</a></h3><h4 id="_7-1-1-spark-sql集成" tabindex="-1">7.1.1 Spark SQL集成 <a class="header-anchor" href="#_7-1-1-spark-sql集成" aria-label="Permalink to &quot;7.1.1 Spark SQL集成&quot;">​</a></h4><div class="language-scala vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">scala</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 创建Hudi表</span></span>
<span class="line"><span class="__shiki_140thh">spark.sql(</span><span class="__shiki_1itgoe">s</span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  CREATE TABLE </span><span class="__shiki_140thh">$tableName</span><span class="__shiki_mdbnqw"> USING hudi</span></span>
<span class="line"><span class="__shiki_mdbnqw">  LOCATION &#39;</span><span class="__shiki_140thh">$tablePath</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  TBLPROPERTIES (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    primaryKey = &#39;id&#39;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    preCombineField = &#39;ts&#39;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    type = &#39;cow&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  )</span></span>
<span class="line"><span class="__shiki_mdbnqw">  AS SELECT * FROM source_table</span></span>
<span class="line"><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 查询Hudi表</span></span>
<span class="line"><span class="__shiki_140thh">spark.sql(</span><span class="__shiki_1itgoe">s</span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  SELECT * FROM </span><span class="__shiki_140thh">$tableName</span></span>
<span class="line"><span class="__shiki_mdbnqw">  WHERE _hoodie_commit_time &gt; &#39;20230101000000&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 增量查询</span></span>
<span class="line"><span class="__shiki_140thh">spark.sql(</span><span class="__shiki_1itgoe">s</span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  SELECT * FROM </span><span class="__shiki_140thh">$tableName</span></span>
<span class="line"><span class="__shiki_mdbnqw">  WHERE _hoodie_commit_time &gt; &#39;20230101000000&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    AND _hoodie_commit_time &lt;= &#39;20230102000000&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span><span class="__shiki_140thh">)</span></span></code></pre></div><h4 id="_7-1-2-dataframe-api" tabindex="-1">7.1.2 DataFrame API <a class="header-anchor" href="#_7-1-2-dataframe-api" aria-label="Permalink to &quot;7.1.2 DataFrame API&quot;">​</a></h4><div class="language-scala vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">scala</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 写入数据</span></span>
<span class="line"><span class="__shiki_1itgoe">val</span><span class="__shiki_1jdh33"> df</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> spark.read.json(</span><span class="__shiki_mdbnqw">&quot;data.json&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">df.write</span></span>
<span class="line"><span class="__shiki_140thh">  .format(</span><span class="__shiki_mdbnqw">&quot;org.apache.hudi&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .option(</span><span class="__shiki_1t8gfj">DataSourceWriteOptions</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TABLE_TYPE_OPT_KEY</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_1t8gfj">          DataSourceWriteOptions</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">COW_TABLE_TYPE_OPT_VAL</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .option(</span><span class="__shiki_1t8gfj">DataSourceWriteOptions</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RECORDKEY_FIELD_OPT_KEY</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;id&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .option(</span><span class="__shiki_1t8gfj">DataSourceWriteOptions</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">PRECOMBINE_FIELD_OPT_KEY</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;ts&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .option(</span><span class="__shiki_1t8gfj">DataSourceWriteOptions</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">PARTITIONPATH_FIELD_OPT_KEY</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;dt&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .option(</span><span class="__shiki_1t8gfj">HoodieWriteConfig</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TABLE_NAME</span><span class="__shiki_140thh">, tableName)</span></span>
<span class="line"><span class="__shiki_140thh">  .mode(</span><span class="__shiki_1t8gfj">SaveMode</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Append</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .save(tablePath)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 读取数据</span></span>
<span class="line"><span class="__shiki_1itgoe">val</span><span class="__shiki_1jdh33"> hudiDF</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> spark.read</span></span>
<span class="line"><span class="__shiki_140thh">  .format(</span><span class="__shiki_mdbnqw">&quot;org.apache.hudi&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .load(tablePath)</span></span></code></pre></div><h3 id="_7-2-flink集成" tabindex="-1">7.2 Flink集成 <a class="header-anchor" href="#_7-2-flink集成" aria-label="Permalink to &quot;7.2 Flink集成&quot;">​</a></h3><h4 id="_7-2-1-flink-sql集成" tabindex="-1">7.2.1 Flink SQL集成 <a class="header-anchor" href="#_7-2-1-flink-sql集成" aria-label="Permalink to &quot;7.2.1 Flink SQL集成&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建Hudi表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> hudi_table</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">  id </span><span class="__shiki_1itgoe">INT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">  name</span><span class="__shiki_140thh"> STRING,</span></span>
<span class="line"><span class="__shiki_140thh">  ts </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">  dt STRING</span></span>
<span class="line"><span class="__shiki_140thh">) PARTITIONED </span><span class="__shiki_1itgoe">BY</span><span class="__shiki_140thh"> (dt)</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;connector&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;hudi&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;path&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;/path/to/hudi_table&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;table.type&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;MERGE_ON_READ&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;write.precombine.field&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;ts&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;write.operation&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;upsert&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;hoodie.datasource.write.recordkey.field&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;id&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;changelog.enabled&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;true&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 流式写入</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> hudi_table</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> id, </span><span class="__shiki_1itgoe">name</span><span class="__shiki_140thh">, ts, dt </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> kafka_source;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 流式读取</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> hudi_table</span></span>
<span class="line"><span class="__shiki_21nrsd">/*+ OPTIONS(&#39;read.streaming.enabled&#39;=&#39;true&#39;) */</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_7-2-2-flink-datastream-api" tabindex="-1">7.2.2 Flink DataStream API <a class="header-anchor" href="#_7-2-2-flink-datastream-api" aria-label="Permalink to &quot;7.2.2 Flink DataStream API&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">StreamExecutionEnvironment env </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> StreamExecutionEnvironment.</span><span class="__shiki_1t8gfj">getExecutionEnvironment</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">StreamTableEnvironment tableEnv </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> StreamTableEnvironment.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">(env);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 创建Hudi Catalog</span></span>
<span class="line"><span class="__shiki_140thh">Catalog catalog </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> HiveCatalog</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;hudi_catalog&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;default&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;/path/to/warehouse&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Configuration</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">tableEnv.</span><span class="__shiki_1t8gfj">registerCatalog</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;hudi_catalog&quot;</span><span class="__shiki_140thh">, catalog);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 流式写入</span></span>
<span class="line"><span class="__shiki_140thh">DataStream&lt;</span><span class="__shiki_1itgoe">Row</span><span class="__shiki_140thh">&gt; dataStream </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ...;</span></span>
<span class="line"><span class="__shiki_140thh">tableEnv.</span><span class="__shiki_1t8gfj">createTemporaryView</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;source&quot;</span><span class="__shiki_140thh">, dataStream);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">tableEnv.</span><span class="__shiki_1t8gfj">executeSql</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;INSERT INTO hudi_catalog.db.hudi_table SELECT * FROM source&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 流式读取</span></span>
<span class="line"><span class="__shiki_140thh">Table result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tableEnv.</span><span class="__shiki_1t8gfj">sqlQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;SELECT * FROM hudi_catalog.db.hudi_table&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">DataStream&lt;</span><span class="__shiki_1itgoe">Row</span><span class="__shiki_140thh">&gt; resultStream </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tableEnv.</span><span class="__shiki_1t8gfj">toDataStream</span><span class="__shiki_140thh">(result);</span></span></code></pre></div><h3 id="_7-3-hive集成" tabindex="-1">7.3 Hive集成 <a class="header-anchor" href="#_7-3-hive集成" aria-label="Permalink to &quot;7.3 Hive集成&quot;">​</a></h3><h4 id="_7-3-1-同步hive表" tabindex="-1">7.3.1 同步Hive表 <a class="header-anchor" href="#_7-3-1-同步hive表" aria-label="Permalink to &quot;7.3.1 同步Hive表&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 启用Hive同步</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_dzsirb"> hoodie</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">datasource</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">hive_sync</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">enable</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">true;</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_dzsirb"> hoodie</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">datasource</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">hive_sync</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">table</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">hudi_table;</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_dzsirb"> hoodie</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">datasource</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">hive_sync</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">partition_fields</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">dt;</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_dzsirb"> hoodie</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">datasource</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">hive_sync</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">jdbcurl</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">jdbc:hive2:</span><span class="__shiki_1itgoe">//</span><span class="__shiki_140thh">localhost:</span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_dzsirb"> hoodie</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">datasource</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">hive_sync</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">hive;</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_dzsirb"> hoodie</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">datasource</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">hive_sync</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">password</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">hive;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建外部表指向Hudi</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> EXTERNAL</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> hudi_hive_table</span></span>
<span class="line"><span class="__shiki_140thh">STORED </span><span class="__shiki_1itgoe">BY</span><span class="__shiki_mdbnqw"> &#39;org.apache.hadoop.hive.ql.io.HiveStorageHandler&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">LOCATION</span><span class="__shiki_mdbnqw"> &#39;/path/to/hudi_table&#39;</span></span>
<span class="line"><span class="__shiki_140thh">TBLPROPERTIES (</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;hoodie.table.name&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;hudi_table&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;hoodie.datasource.hive_sync.enable&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;true&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查询Hudi表</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> hudi_hive_table</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_mdbnqw"> \`_hoodie_commit_time\`</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> &#39;20230101000000&#39;</span><span class="__shiki_140thh">;</span></span></code></pre></div><hr><h2 id="八、高级特性" tabindex="-1">八、高级特性 <a class="header-anchor" href="#八、高级特性" aria-label="Permalink to &quot;八、高级特性&quot;">​</a></h2><h3 id="_8-1-异步索引" tabindex="-1">8.1 异步索引 <a class="header-anchor" href="#_8-1-异步索引" aria-label="Permalink to &quot;8.1 异步索引&quot;">​</a></h3><p><strong>异步索引架构：</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> AsyncIndexer</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  private</span><span class="__shiki_140thh"> ExecutorService executor;</span></span>
<span class="line"><span class="__shiki_1itgoe">  private</span><span class="__shiki_140thh"> BlockingQueue&lt;</span><span class="__shiki_1itgoe">IndexTask</span><span class="__shiki_140thh">&gt; taskQueue;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> start</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    executor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Executors.</span><span class="__shiki_1t8gfj">newFixedThreadPool</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        config.</span><span class="__shiki_1t8gfj">getAsyncIndexThreadPoolSize</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> config.</span><span class="__shiki_1t8gfj">getAsyncIndexThreadPoolSize</span><span class="__shiki_140thh">(); i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">      executor.</span><span class="__shiki_1t8gfj">submit</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> IndexWorker</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  class</span><span class="__shiki_1t8gfj"> IndexWorker</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Runnable</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> run</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">      while</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">Thread.</span><span class="__shiki_1t8gfj">currentThread</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">isInterrupted</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_140thh">        IndexTask task </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> taskQueue.</span><span class="__shiki_1t8gfj">poll</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, TimeUnit.SECONDS);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (task </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 异步构建索引</span></span>
<span class="line"><span class="__shiki_1t8gfj">          buildIndex</span><span class="__shiki_140thh">(task.</span><span class="__shiki_1t8gfj">getRecords</span><span class="__shiki_140thh">(), task.</span><span class="__shiki_1t8gfj">getInstantTime</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> submitIndexTask</span><span class="__shiki_140thh">(List&lt;</span><span class="__shiki_1itgoe">HoodieRecord</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">records</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                              String </span><span class="__shiki_1jdh33">instantTime</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    taskQueue.</span><span class="__shiki_1t8gfj">offer</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> IndexTask</span><span class="__shiki_140thh">(records, instantTime));</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-2-并发控制" tabindex="-1">8.2 并发控制 <a class="header-anchor" href="#_8-2-并发控制" aria-label="Permalink to &quot;8.2 并发控制&quot;">​</a></h3><h4 id="_8-2-1-乐观并发控制-occ" tabindex="-1">8.2.1 乐观并发控制（OCC） <a class="header-anchor" href="#_8-2-1-乐观并发控制-occ" aria-label="Permalink to &quot;8.2.1 乐观并发控制（OCC）&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> OptimisticConcurrencyControl</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> tryCommit</span><span class="__shiki_140thh">(TableMetadata </span><span class="__shiki_1jdh33">current</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                          List&lt;</span><span class="__shiki_1itgoe">DataFile</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">newFiles</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 检查当前版本</span></span>
<span class="line"><span class="__shiki_140thh">    TableMetadata latest </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> catalog.</span><span class="__shiki_1t8gfj">loadTable</span><span class="__shiki_140thh">(tableName);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">latest.</span><span class="__shiki_1t8gfj">getVersion</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">equals</span><span class="__shiki_140thh">(current.</span><span class="__shiki_1t8gfj">getVersion</span><span class="__shiki_140thh">())) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 版本冲突</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 准备提交</span></span>
<span class="line"><span class="__shiki_140thh">    String newInstant </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> HoodieActiveTimeline.</span><span class="__shiki_1t8gfj">createNewInstantTime</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">HoodieLogFile</span><span class="__shiki_140thh">&gt; logFiles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> writeLogFiles</span><span class="__shiki_140thh">(newFiles);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 创建新时间线实例</span></span>
<span class="line"><span class="__shiki_140thh">    HoodieInstant instant </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> HoodieInstant</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        State.REQUESTED, </span></span>
<span class="line"><span class="__shiki_140thh">        HoodieTimeline.DELTA_COMMIT, </span></span>
<span class="line"><span class="__shiki_140thh">        newInstant);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 原子性创建实例文件</span></span>
<span class="line"><span class="__shiki_1itgoe">    boolean</span><span class="__shiki_140thh"> created </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> timeline.</span><span class="__shiki_1t8gfj">createNewInstant</span><span class="__shiki_140thh">(instant);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">created) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 并发冲突</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 提交完成</span></span>
<span class="line"><span class="__shiki_140thh">    timeline.</span><span class="__shiki_1t8gfj">transitionRequestedToInflight</span><span class="__shiki_140thh">(instant);</span></span>
<span class="line"><span class="__shiki_140thh">    timeline.</span><span class="__shiki_1t8gfj">saveAsComplete</span><span class="__shiki_140thh">(instant, Option.</span><span class="__shiki_1t8gfj">of</span><span class="__shiki_140thh">(logFiles));</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_8-2-2-锁机制" tabindex="-1">8.2.2 锁机制 <a class="header-anchor" href="#_8-2-2-锁机制" aria-label="Permalink to &quot;8.2.2 锁机制&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> DistributedLock</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  private</span><span class="__shiki_140thh"> ZooKeeper zkClient;</span></span>
<span class="line"><span class="__shiki_1itgoe">  private</span><span class="__shiki_140thh"> String lockPath;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> acquireLock</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">instantTime</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">long</span><span class="__shiki_1jdh33"> timeout</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    String lockNode </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> String.</span><span class="__shiki_1t8gfj">format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;%s/%s&quot;</span><span class="__shiki_140thh">, lockPath, instantTime);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 创建临时有序节点</span></span>
<span class="line"><span class="__shiki_140thh">      String createdPath </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> zkClient.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">          lockNode, </span></span>
<span class="line"><span class="__shiki_1itgoe">          new</span><span class="__shiki_1itgoe"> byte</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">          ZooDefs.Ids.OPEN_ACL_UNSAFE,</span></span>
<span class="line"><span class="__shiki_140thh">          CreateMode.EPHEMERAL_SEQUENTIAL);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 检查是否获得锁</span></span>
<span class="line"><span class="__shiki_140thh">      List&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; children </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> zkClient.</span><span class="__shiki_1t8gfj">getChildren</span><span class="__shiki_140thh">(lockPath, </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      Collections.</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">(children);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      String smallest </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> children.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (createdPath.</span><span class="__shiki_1t8gfj">endsWith</span><span class="__shiki_140thh">(smallest)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 获得锁</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 等待前一个节点释放</span></span>
<span class="line"><span class="__shiki_140thh">      String previousNode </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> children.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">          Collections.</span><span class="__shiki_1t8gfj">binarySearch</span><span class="__shiki_140thh">(children, </span></span>
<span class="line"><span class="__shiki_140thh">              createdPath.</span><span class="__shiki_1t8gfj">substring</span><span class="__shiki_140thh">(createdPath.</span><span class="__shiki_1t8gfj">lastIndexOf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      CountDownLatch latch </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> CountDownLatch</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      Stat stat </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> zkClient.</span><span class="__shiki_1t8gfj">exists</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">          lockPath </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot;/&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> previousNode, </span></span>
<span class="line"><span class="__shiki_1itgoe">          new</span><span class="__shiki_1t8gfj"> Watcher</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">            @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">            public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> process</span><span class="__shiki_140thh">(WatchedEvent </span><span class="__shiki_1jdh33">event</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">              if</span><span class="__shiki_140thh"> (event.</span><span class="__shiki_1t8gfj">getType</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> EventType.NodeDeleted) {</span></span>
<span class="line"><span class="__shiki_140thh">                latch.</span><span class="__shiki_1t8gfj">countDown</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">              }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">          });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (stat </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        latch.</span><span class="__shiki_1t8gfj">await</span><span class="__shiki_140thh">(timeout, TimeUnit.MILLISECONDS);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> latch.</span><span class="__shiki_1t8gfj">getCount</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (Exception </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> RuntimeException</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Failed to acquire lock&quot;</span><span class="__shiki_140thh">, e);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-3-数据裁剪-clustering" tabindex="-1">8.3 数据裁剪（Clustering） <a class="header-anchor" href="#_8-3-数据裁剪-clustering" aria-label="Permalink to &quot;8.3 数据裁剪（Clustering）&quot;">​</a></h3><p><strong>数据聚类优化：</strong></p><div class="language-scala vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">scala</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ClusteringService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  def</span><span class="__shiki_1t8gfj"> scheduleClustering</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">hoodieTable</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">HoodieTable</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Unit</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 识别需要聚类的文件</span></span>
<span class="line"><span class="__shiki_1itgoe">    val</span><span class="__shiki_1jdh33"> filesToCluster</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> identifyFilesToCluster(hoodieTable)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 生成聚类计划</span></span>
<span class="line"><span class="__shiki_1itgoe">    val</span><span class="__shiki_1jdh33"> clusteringPlan</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> generateClusteringPlan(filesToCluster)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 执行聚类</span></span>
<span class="line"><span class="__shiki_140thh">    executeClustering(hoodieTable, clusteringPlan)</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  private</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> generateClusteringPlan</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1jdh33">      files</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">List</span><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">FileSlice</span><span class="__shiki_140thh">])</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> ClusteringPlan</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 基于Z-Ordering的聚类策略</span></span>
<span class="line"><span class="__shiki_1itgoe">    val</span><span class="__shiki_1jdh33"> strategy</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ZOrderClusteringStrategy</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      targetFileSize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 256</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 256MB</span></span>
<span class="line"><span class="__shiki_140thh">      maxNumGroups </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      columns </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> Seq</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user_id&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;timestamp&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    strategy.generatePlan(files)</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><hr><h2 id="九、性能调优与最佳实践" tabindex="-1">九、性能调优与最佳实践 <a class="header-anchor" href="#九、性能调优与最佳实践" aria-label="Permalink to &quot;九、性能调优与最佳实践&quot;">​</a></h2><h3 id="_9-1-写入优化配置" tabindex="-1">9.1 写入优化配置 <a class="header-anchor" href="#_9-1-写入优化配置" aria-label="Permalink to &quot;9.1 写入优化配置&quot;">​</a></h3><div class="language-properties vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">properties</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基础配置</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.insert.shuffle.parallelism</span><span class="__shiki_140thh">=200</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.upsert.shuffle.parallelism</span><span class="__shiki_140thh">=200</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.delete.shuffle.parallelism</span><span class="__shiki_140thh">=200</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 小文件处理</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.parquet.max.file.size</span><span class="__shiki_140thh">=134217728  </span><span class="__shiki_21nrsd"># 128MB</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.parquet.block.size</span><span class="__shiki_140thh">=134217728</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.parquet.page.size</span><span class="__shiki_140thh">=1048576  </span><span class="__shiki_21nrsd"># 1MB</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 压缩与清理</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.compact.inline</span><span class="__shiki_140thh">=true</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.compact.inline.max.delta.commits</span><span class="__shiki_140thh">=5</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.cleaner.commits.retained</span><span class="__shiki_140thh">=10</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.cleaner.hours.retained</span><span class="__shiki_140thh">=24</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 内存优化</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.memory.merge.max.size</span><span class="__shiki_140thh">=104857600  </span><span class="__shiki_21nrsd"># 100MB</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.memory.merge.fraction</span><span class="__shiki_140thh">=0.6</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.payload.combined.schema.validation.enable</span><span class="__shiki_140thh">=true</span></span></code></pre></div><h3 id="_9-2-读取优化配置" tabindex="-1">9.2 读取优化配置 <a class="header-anchor" href="#_9-2-读取优化配置" aria-label="Permalink to &quot;9.2 读取优化配置&quot;">​</a></h3><div class="language-properties vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">properties</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 查询优化</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.datasource.read.support.timestamp</span><span class="__shiki_140thh">=true</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.datasource.query.type</span><span class="__shiki_140thh">=snapshot  </span><span class="__shiki_21nrsd"># snapshot/incremental</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.datasource.read.path.filter</span><span class="__shiki_140thh">=/*/*/*  </span><span class="__shiki_21nrsd"># 分区过滤</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># MOR表优化</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.datasource.read.payload.combine.enable</span><span class="__shiki_140thh">=true</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.datasource.merge.type</span><span class="__shiki_140thh">=spark  </span><span class="__shiki_21nrsd"># spark/flink</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.datasource.read.latest.file.slices</span><span class="__shiki_140thh">=false</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 并行度优化</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.datasource.read.parallelism</span><span class="__shiki_140thh">=200</span></span>
<span class="line"><span class="__shiki_1itgoe">hoodie.datasource.read.split.max.size</span><span class="__shiki_140thh">=134217728  </span><span class="__shiki_21nrsd"># 128MB</span></span></code></pre></div><h3 id="_9-3-表设计最佳实践" tabindex="-1">9.3 表设计最佳实践 <a class="header-anchor" href="#_9-3-表设计最佳实践" aria-label="Permalink to &quot;9.3 表设计最佳实践&quot;">​</a></h3><h4 id="_9-3-1-分区策略" tabindex="-1">9.3.1 分区策略 <a class="header-anchor" href="#_9-3-1-分区策略" aria-label="Permalink to &quot;9.3.1 分区策略&quot;">​</a></h4><div class="language-scala vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">scala</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 时间+业务维度组合分区</span></span>
<span class="line"><span class="__shiki_1itgoe">val</span><span class="__shiki_1jdh33"> partitionColumns</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> Seq</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;dt&quot;</span><span class="__shiki_140thh">,           </span><span class="__shiki_21nrsd">// 日期分区: yyyy-MM-dd</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;hour&quot;</span><span class="__shiki_140thh">,         </span><span class="__shiki_21nrsd">// 小时分区: HH</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;region&quot;</span><span class="__shiki_140thh">,       </span><span class="__shiki_21nrsd">// 地域分区</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;category&quot;</span><span class="__shiki_21nrsd">      // 业务类别</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 动态分区写入</span></span>
<span class="line"><span class="__shiki_140thh">df.write</span></span>
<span class="line"><span class="__shiki_140thh">  .format(</span><span class="__shiki_mdbnqw">&quot;hudi&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .option(</span><span class="__shiki_1t8gfj">HoodieWriteConfig</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">PARTITIONPATH_FIELD</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">          &quot;dt,region,category&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .option(</span><span class="__shiki_mdbnqw">&quot;hoodie.datasource.write.partitionpath.url.encode&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;true&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .mode(</span><span class="__shiki_mdbnqw">&quot;append&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .save(tablePath)</span></span></code></pre></div><h4 id="_9-3-2-主键设计" tabindex="-1">9.3.2 主键设计 <a class="header-anchor" href="#_9-3-2-主键设计" aria-label="Permalink to &quot;9.3.2 主键设计&quot;">​</a></h4><div class="language-scala vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">scala</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 复合主键设计</span></span>
<span class="line"><span class="__shiki_1itgoe">val</span><span class="__shiki_1jdh33"> recordKey</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> Seq</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;user_id&quot;</span><span class="__shiki_140thh">,      </span><span class="__shiki_21nrsd">// 用户ID</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;session_id&quot;</span><span class="__shiki_140thh">,   </span><span class="__shiki_21nrsd">// 会话ID</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;event_type&quot;</span><span class="__shiki_21nrsd">    // 事件类型</span></span>
<span class="line"><span class="__shiki_140thh">).mkString(</span><span class="__shiki_mdbnqw">&quot;_&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 预合并字段选择</span></span>
<span class="line"><span class="__shiki_1itgoe">val</span><span class="__shiki_1jdh33"> preCombineField</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;event_timestamp&quot;</span><span class="__shiki_21nrsd">  // 时间戳字段</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 写入配置</span></span>
<span class="line"><span class="__shiki_140thh">df.write</span></span>
<span class="line"><span class="__shiki_140thh">  .format(</span><span class="__shiki_mdbnqw">&quot;hudi&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .option(</span><span class="__shiki_1t8gfj">HoodieWriteConfig</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RECORDKEY_FIELD</span><span class="__shiki_140thh">, recordKey)</span></span>
<span class="line"><span class="__shiki_140thh">  .option(</span><span class="__shiki_1t8gfj">HoodieWriteConfig</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">PRECOMBINE_FIELD</span><span class="__shiki_140thh">, preCombineField)</span></span>
<span class="line"><span class="__shiki_140thh">  .save(tablePath)</span></span></code></pre></div><h3 id="_9-4-运维监控" tabindex="-1">9.4 运维监控 <a class="header-anchor" href="#_9-4-运维监控" aria-label="Permalink to &quot;9.4 运维监控&quot;">​</a></h3><h4 id="_9-4-1-监控指标" tabindex="-1">9.4.1 监控指标 <a class="header-anchor" href="#_9-4-1-监控指标" aria-label="Permalink to &quot;9.4.1 监控指标&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Hudi表健康检查脚本</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> check_hudi_table_health</span><span class="__shiki_140thh">(table_path):</span></span>
<span class="line"><span class="__shiki_140thh">    metrics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 1. 检查文件大小分布</span></span>
<span class="line"><span class="__shiki_140thh">    file_sizes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> spark.read.format(</span><span class="__shiki_mdbnqw">&quot;hudi&quot;</span><span class="__shiki_140thh">) \\</span></span>
<span class="line"><span class="__shiki_140thh">        .load(table_path) \\</span></span>
<span class="line"><span class="__shiki_140thh">        .select(</span><span class="__shiki_mdbnqw">&quot;_hoodie_file_size&quot;</span><span class="__shiki_140thh">) \\</span></span>
<span class="line"><span class="__shiki_140thh">        .rdd.map(</span><span class="__shiki_1itgoe">lambda</span><span class="__shiki_140thh"> r: r[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]) \\</span></span>
<span class="line"><span class="__shiki_140thh">        .collect()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    metrics[</span><span class="__shiki_mdbnqw">&#39;file_size_stats&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;count&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">len</span><span class="__shiki_140thh">(file_sizes),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;avg&#39;</span><span class="__shiki_140thh">: np.mean(file_sizes),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;std&#39;</span><span class="__shiki_140thh">: np.std(file_sizes),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;p95&#39;</span><span class="__shiki_140thh">: np.percentile(file_sizes, </span><span class="__shiki_dzsirb">95</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 2. 检查分区平衡</span></span>
<span class="line"><span class="__shiki_140thh">    partition_stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> spark.read.format(</span><span class="__shiki_mdbnqw">&quot;hudi&quot;</span><span class="__shiki_140thh">) \\</span></span>
<span class="line"><span class="__shiki_140thh">        .load(table_path) \\</span></span>
<span class="line"><span class="__shiki_140thh">        .groupBy(</span><span class="__shiki_mdbnqw">&quot;_hoodie_partition_path&quot;</span><span class="__shiki_140thh">) \\</span></span>
<span class="line"><span class="__shiki_140thh">        .count() \\</span></span>
<span class="line"><span class="__shiki_140thh">        .collect()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    partition_counts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [r[</span><span class="__shiki_mdbnqw">&#39;count&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> r </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> partition_stats]</span></span>
<span class="line"><span class="__shiki_140thh">    metrics[</span><span class="__shiki_mdbnqw">&#39;partition_balance&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;gini_coefficient&#39;</span><span class="__shiki_140thh">: calculate_gini(partition_counts),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;max_min_ratio&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">max</span><span class="__shiki_140thh">(partition_counts) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> min</span><span class="__shiki_140thh">(partition_counts)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 3. 检查压缩状态</span></span>
<span class="line"><span class="__shiki_140thh">    compaction_pending </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> spark.sql(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SELECT COUNT(*) as pending</span></span>
<span class="line"><span class="__shiki_mdbnqw">        FROM </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">table_name</span><span class="__shiki_dzsirb">}</span></span>
<span class="line"><span class="__shiki_mdbnqw">        WHERE _hoodie_operation = &#39;COMPACTION&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          AND _hoodie_commit_state = &#39;REQUESTED&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;</span><span class="__shiki_140thh">).collect()[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">][</span><span class="__shiki_mdbnqw">&#39;pending&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    metrics[</span><span class="__shiki_mdbnqw">&#39;compaction_status&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;pending&#39;</span><span class="__shiki_140thh">: compaction_pending,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;healthy&#39;</span><span class="__shiki_140thh">: compaction_pending </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> metrics</span></span></code></pre></div><h4 id="_9-4-2-告警配置" tabindex="-1">9.4.2 告警配置 <a class="header-anchor" href="#_9-4-2-告警配置" aria-label="Permalink to &quot;9.4.2 告警配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Prometheus告警规则</span></span>
<span class="line"><span class="__shiki_17hn0y">groups</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">hudi_alerts</span></span>
<span class="line"><span class="__shiki_17hn0y">    rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 小文件告警</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HudiSmallFiles</span></span>
<span class="line"><span class="__shiki_17hn0y">        expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">hudi_file_size_avg_bytes &lt; 67108864</span><span class="__shiki_21nrsd">  # 64MB</span></span>
<span class="line"><span class="__shiki_17hn0y">        for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">        labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">warning</span></span>
<span class="line"><span class="__shiki_17hn0y">        annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Hudi表存在过多小文件&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;表 {{ $labels.table }} 平均文件大小 {{ $value }} 字节&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 压缩积压告警</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HudiCompactionBacklog</span></span>
<span class="line"><span class="__shiki_17hn0y">        expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">hudi_compaction_pending &gt; 20</span></span>
<span class="line"><span class="__shiki_17hn0y">        for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10m</span></span>
<span class="line"><span class="__shiki_17hn0y">        labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">critical</span></span>
<span class="line"><span class="__shiki_17hn0y">        annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Hudi表压缩任务积压&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;表 {{ $labels.table }} 有 {{ $value }} 个压缩任务待处理&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 写入延迟告警</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HudiWriteLatency</span></span>
<span class="line"><span class="__shiki_17hn0y">        expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rate(hudi_write_duration_seconds_sum[5m]) &gt; 30</span></span>
<span class="line"><span class="__shiki_17hn0y">        for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">        labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">warning</span></span>
<span class="line"><span class="__shiki_17hn0y">        annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Hudi写入延迟过高&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;表 {{ $labels.table }} 写入延迟 {{ $value }} 秒&quot;</span></span></code></pre></div><hr><h2 id="十、典型应用场景" tabindex="-1">十、典型应用场景 <a class="header-anchor" href="#十、典型应用场景" aria-label="Permalink to &quot;十、典型应用场景&quot;">​</a></h2><h3 id="_10-1-cdc数据同步" tabindex="-1">10.1 CDC数据同步 <a class="header-anchor" href="#_10-1-cdc数据同步" aria-label="Permalink to &quot;10.1 CDC数据同步&quot;">​</a></h3><div class="language-scala vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">scala</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// MySQL CDC -&gt; Hudi实时同步</span></span>
<span class="line"><span class="__shiki_1itgoe">val</span><span class="__shiki_1jdh33"> cdcStream</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> spark.readStream</span></span>
<span class="line"><span class="__shiki_140thh">  .format(</span><span class="__shiki_mdbnqw">&quot;mysql-cdc&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .option(</span><span class="__shiki_mdbnqw">&quot;hostname&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;localhost&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .option(</span><span class="__shiki_mdbnqw">&quot;port&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;3306&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .option(</span><span class="__shiki_mdbnqw">&quot;database&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;test&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .option(</span><span class="__shiki_mdbnqw">&quot;table&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;orders&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .load()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">val</span><span class="__shiki_1jdh33"> hudiStream</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> cdcStream</span></span>
<span class="line"><span class="__shiki_140thh">  .writeStream</span></span>
<span class="line"><span class="__shiki_140thh">  .format(</span><span class="__shiki_mdbnqw">&quot;org.apache.hudi&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .option(</span><span class="__shiki_mdbnqw">&quot;checkpointLocation&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;/tmp/checkpoint&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .option(</span><span class="__shiki_1t8gfj">HoodieWriteConfig</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TABLE_NAME</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;orders_hudi&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .option(</span><span class="__shiki_1t8gfj">DataSourceWriteOptions</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RECORDKEY_FIELD_OPT_KEY</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;order_id&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .option(</span><span class="__shiki_1t8gfj">DataSourceWriteOptions</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">PRECOMBINE_FIELD_OPT_KEY</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;update_time&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .option(</span><span class="__shiki_1t8gfj">DataSourceWriteOptions</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">PARTITIONPATH_FIELD_OPT_KEY</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;dt&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .option(</span><span class="__shiki_mdbnqw">&quot;hoodie.datasource.write.operation&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;upsert&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .option(</span><span class="__shiki_mdbnqw">&quot;hoodie.cleaner.commits.retained&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;3&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .option(</span><span class="__shiki_mdbnqw">&quot;hoodie.compact.inline&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;true&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .outputMode(</span><span class="__shiki_mdbnqw">&quot;append&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .start(</span><span class="__shiki_mdbnqw">&quot;/tmp/orders_hudi&quot;</span><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_10-2-实时数仓" tabindex="-1">10.2 实时数仓 <a class="header-anchor" href="#_10-2-实时数仓" aria-label="Permalink to &quot;10.2 实时数仓&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 分层实时数仓架构</span></span>
<span class="line"><span class="__shiki_21nrsd">-- ODS层: 原始数据接入</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> ods_user_events</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">  event_id STRING,</span></span>
<span class="line"><span class="__shiki_140thh">  user_id STRING,</span></span>
<span class="line"><span class="__shiki_140thh">  event_type STRING,</span></span>
<span class="line"><span class="__shiki_140thh">  event_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  properties STRING</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> hudi</span></span>
<span class="line"><span class="__shiki_140thh">PARTITIONED </span><span class="__shiki_1itgoe">BY</span><span class="__shiki_140thh"> (dt STRING)</span></span>
<span class="line"><span class="__shiki_140thh">TBLPROPERTIES (</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;primaryKey&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;event_id&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;preCombineField&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;event_time&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;type&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;mor&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- DWD层: 明细数据层</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> dwd_user_events</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">  event_id STRING,</span></span>
<span class="line"><span class="__shiki_140thh">  user_id STRING,</span></span>
<span class="line"><span class="__shiki_140thh">  event_type STRING,</span></span>
<span class="line"><span class="__shiki_140thh">  event_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">  -- 解析后的字段</span></span>
<span class="line"><span class="__shiki_140thh">  page_url STRING,</span></span>
<span class="line"><span class="__shiki_140thh">  device_type STRING,</span></span>
<span class="line"><span class="__shiki_1itgoe">  location</span><span class="__shiki_140thh"> STRING</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> hudi</span></span>
<span class="line"><span class="__shiki_140thh">PARTITIONED </span><span class="__shiki_1itgoe">BY</span><span class="__shiki_140thh"> (dt STRING, </span><span class="__shiki_1itgoe">hour</span><span class="__shiki_140thh"> STRING)</span></span>
<span class="line"><span class="__shiki_140thh">TBLPROPERTIES (</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;primaryKey&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;event_id&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;preCombineField&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;event_time&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;type&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;cow&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- DWS层: 轻度汇总层</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> dws_user_daily</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">  user_id STRING,</span></span>
<span class="line"><span class="__shiki_140thh">  dt STRING,</span></span>
<span class="line"><span class="__shiki_140thh">  page_view_count </span><span class="__shiki_1itgoe">INT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  unique_page_count </span><span class="__shiki_1itgoe">INT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  total_duration </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  last_active_time </span><span class="__shiki_1itgoe">TIMESTAMP</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> hudi</span></span>
<span class="line"><span class="__shiki_140thh">PARTITIONED </span><span class="__shiki_1itgoe">BY</span><span class="__shiki_140thh"> (dt STRING)</span></span>
<span class="line"><span class="__shiki_140thh">TBLPROPERTIES (</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;primaryKey&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;user_id,dt&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;preCombineField&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;last_active_time&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;type&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;cow&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_10-3-数据湖入湖" tabindex="-1">10.3 数据湖入湖 <a class="header-anchor" href="#_10-3-数据湖入湖" aria-label="Permalink to &quot;10.3 数据湖入湖&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 多源数据入湖管道</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> data_lake_ingestion_pipeline</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 1. 批处理数据入湖</span></span>
<span class="line"><span class="__shiki_140thh">    batch_data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> spark.read.parquet(</span><span class="__shiki_mdbnqw">&quot;/data/batch/*.parquet&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    batch_data.write \\</span></span>
<span class="line"><span class="__shiki_140thh">        .format(</span><span class="__shiki_mdbnqw">&quot;hudi&quot;</span><span class="__shiki_140thh">) \\</span></span>
<span class="line"><span class="__shiki_140thh">        .option(</span><span class="__shiki_mdbnqw">&quot;hoodie.datasource.write.operation&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;bulk_insert&quot;</span><span class="__shiki_140thh">) \\</span></span>
<span class="line"><span class="__shiki_140thh">        .mode(</span><span class="__shiki_mdbnqw">&quot;overwrite&quot;</span><span class="__shiki_140thh">) \\</span></span>
<span class="line"><span class="__shiki_140thh">        .save(</span><span class="__shiki_mdbnqw">&quot;/data_lake/ods/batch&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 2. 流处理数据入湖</span></span>
<span class="line"><span class="__shiki_140thh">    streaming_data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> spark.readStream \\</span></span>
<span class="line"><span class="__shiki_140thh">        .format(</span><span class="__shiki_mdbnqw">&quot;kafka&quot;</span><span class="__shiki_140thh">) \\</span></span>
<span class="line"><span class="__shiki_140thh">        .option(</span><span class="__shiki_mdbnqw">&quot;subscribe&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;real-time-events&quot;</span><span class="__shiki_140thh">) \\</span></span>
<span class="line"><span class="__shiki_140thh">        .load()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    streaming_query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> streaming_data.writeStream \\</span></span>
<span class="line"><span class="__shiki_140thh">        .format(</span><span class="__shiki_mdbnqw">&quot;hudi&quot;</span><span class="__shiki_140thh">) \\</span></span>
<span class="line"><span class="__shiki_140thh">        .option(</span><span class="__shiki_mdbnqw">&quot;checkpointLocation&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;/checkpoints/streaming&quot;</span><span class="__shiki_140thh">) \\</span></span>
<span class="line"><span class="__shiki_140thh">        .option(</span><span class="__shiki_mdbnqw">&quot;hoodie.datasource.write.operation&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;upsert&quot;</span><span class="__shiki_140thh">) \\</span></span>
<span class="line"><span class="__shiki_140thh">        .outputMode(</span><span class="__shiki_mdbnqw">&quot;append&quot;</span><span class="__shiki_140thh">) \\</span></span>
<span class="line"><span class="__shiki_140thh">        .start(</span><span class="__shiki_mdbnqw">&quot;/data_lake/ods/streaming&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 3. CDC数据入湖</span></span>
<span class="line"><span class="__shiki_140thh">    cdc_data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> spark.readStream \\</span></span>
<span class="line"><span class="__shiki_140thh">        .format(</span><span class="__shiki_mdbnqw">&quot;debezium&quot;</span><span class="__shiki_140thh">) \\</span></span>
<span class="line"><span class="__shiki_140thh">        .option(</span><span class="__shiki_mdbnqw">&quot;connector.class&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;io.debezium.connector.mysql.MySqlConnector&quot;</span><span class="__shiki_140thh">) \\</span></span>
<span class="line"><span class="__shiki_140thh">        .load()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    cdc_query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cdc_data.writeStream \\</span></span>
<span class="line"><span class="__shiki_140thh">        .format(</span><span class="__shiki_mdbnqw">&quot;hudi&quot;</span><span class="__shiki_140thh">) \\</span></span>
<span class="line"><span class="__shiki_140thh">        .option(</span><span class="__shiki_mdbnqw">&quot;hoodie.datasource.write.operation&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;upsert&quot;</span><span class="__shiki_140thh">) \\</span></span>
<span class="line"><span class="__shiki_140thh">        .option(</span><span class="__shiki_mdbnqw">&quot;hoodie.datasource.write.payload.class&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;org.apache.hudi.common.model.DefaultHoodieRecordPayload&quot;</span><span class="__shiki_140thh">) \\</span></span>
<span class="line"><span class="__shiki_140thh">        .outputMode(</span><span class="__shiki_mdbnqw">&quot;append&quot;</span><span class="__shiki_140thh">) \\</span></span>
<span class="line"><span class="__shiki_140thh">        .start(</span><span class="__shiki_mdbnqw">&quot;/data_lake/ods/cdc&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> streaming_query, cdc_query</span></span></code></pre></div><hr><h2 id="十一、总结与展望" tabindex="-1">十一、总结与展望 <a class="header-anchor" href="#十一、总结与展望" aria-label="Permalink to &quot;十一、总结与展望&quot;">​</a></h2><h3 id="_11-1-hudi的核心价值" tabindex="-1">11.1 Hudi的核心价值 <a class="header-anchor" href="#_11-1-hudi的核心价值" aria-label="Permalink to &quot;11.1 Hudi的核心价值&quot;">​</a></h3><ol><li><strong>近实时能力</strong>：支持低延迟的数据更新和查询</li><li><strong>增量处理</strong>：内置高效的增量数据处理能力</li><li><strong>事务保证</strong>：为数据湖提供ACID事务支持</li><li><strong>多引擎支持</strong>：与主流计算引擎深度集成</li><li><strong>灵活的表模型</strong>：COW/MOR双模型满足不同场景需求</li></ol><h3 id="_11-2-适用场景总结" tabindex="-1">11.2 适用场景总结 <a class="header-anchor" href="#_11-2-适用场景总结" aria-label="Permalink to &quot;11.2 适用场景总结&quot;">​</a></h3><ul><li><strong>CDC数据同步</strong>：数据库变更捕获和同步</li><li><strong>实时数仓</strong>：低延迟的数据仓库建设</li><li><strong>数据湖入湖</strong>：多源异构数据入湖</li><li><strong>近实时分析</strong>：准实时的数据分析场景</li><li><strong>数据治理</strong>：数据质量、血缘、生命周期管理</li></ul><h3 id="_11-3-未来发展" tabindex="-1">11.3 未来发展 <a class="header-anchor" href="#_11-3-未来发展" aria-label="Permalink to &quot;11.3 未来发展&quot;">​</a></h3><ol><li><strong>云原生优化</strong>：更好的对象存储集成和优化</li><li><strong>性能持续提升</strong>：更智能的索引和压缩策略</li><li><strong>生态扩展</strong>：更多计算引擎和工具的集成</li><li><strong>数据治理增强</strong>：内置的数据质量和安全管理</li><li><strong>AI/ML集成</strong>：与机器学习工作流的深度集成</li></ol><h3 id="_11-4-选型建议" tabindex="-1">11.4 选型建议 <a class="header-anchor" href="#_11-4-选型建议" aria-label="Permalink to &quot;11.4 选型建议&quot;">​</a></h3><p><strong>选择Hudi当：</strong></p><ul><li>需要近实时数据更新和查询</li><li>有大量的增量数据处理需求</li><li>需要灵活的存储模型（COW/MOR）选择</li><li>已经在使用Uber技术栈或有类似场景</li></ul><p><strong>考虑其他方案当：</strong></p><ul><li>主要需求是ACID事务保证（可考虑Delta Lake）</li><li>需要跨多个计算引擎的统一表格式（可考虑Iceberg）</li><li>场景简单，只需要基础的更新能力（可考虑Parquet+外部索引）</li></ul><hr><h2 id="附录-常用命令速查" tabindex="-1">附录：常用命令速查 <a class="header-anchor" href="#附录-常用命令速查" aria-label="Permalink to &quot;附录：常用命令速查&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Hudi CLI工具</span></span>
<span class="line"><span class="__shiki_1t8gfj">hudi-cli</span><span class="__shiki_dzsirb"> --path</span><span class="__shiki_mdbnqw"> /path/to/hudi/table</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 常用CLI命令</span></span>
<span class="line"><span class="__shiki_21nrsd"># 查看表信息</span></span>
<span class="line"><span class="__shiki_1t8gfj">show</span><span class="__shiki_mdbnqw"> table</span><span class="__shiki_mdbnqw"> info</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看提交历史</span></span>
<span class="line"><span class="__shiki_1t8gfj">show</span><span class="__shiki_mdbnqw"> commits</span><span class="__shiki_dzsirb"> --limit</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看压缩计划</span></span>
<span class="line"><span class="__shiki_1t8gfj">show</span><span class="__shiki_mdbnqw"> compaction</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 手动触发压缩</span></span>
<span class="line"><span class="__shiki_1t8gfj">compaction</span><span class="__shiki_mdbnqw"> schedule</span><span class="__shiki_dzsirb"> --table</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">table_nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 清理旧文件</span></span>
<span class="line"><span class="__shiki_1t8gfj">clean</span><span class="__shiki_dzsirb"> --clean-policy</span><span class="__shiki_mdbnqw"> KEEP_LATEST_COMMITS</span><span class="__shiki_dzsirb"> --retain-commits</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建保存点</span></span>
<span class="line"><span class="__shiki_1t8gfj">savepoint</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> --commit</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">commit_i</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> --table</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">table_nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 回滚到保存点</span></span>
<span class="line"><span class="__shiki_1t8gfj">rollback</span><span class="__shiki_dzsirb"> --savepoint</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">savepoint_i</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> --table</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">table_nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span></code></pre></div><div class="language-scala vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">scala</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Spark常用配置模板</span></span>
<span class="line"><span class="__shiki_1itgoe">val</span><span class="__shiki_1jdh33"> commonHudiOptions</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 表配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">  HoodieWriteConfig</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TABLE_NAME</span><span class="__shiki_1itgoe"> -&gt;</span><span class="__shiki_140thh"> tableName,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  DataSourceWriteOptions</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TABLE_TYPE_OPT_KEY</span><span class="__shiki_1itgoe"> -&gt;</span><span class="__shiki_mdbnqw"> &quot;COPY_ON_WRITE&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 主键配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">  DataSourceWriteOptions</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RECORDKEY_FIELD_OPT_KEY</span><span class="__shiki_1itgoe"> -&gt;</span><span class="__shiki_mdbnqw"> &quot;id&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  DataSourceWriteOptions</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">PRECOMBINE_FIELD_OPT_KEY</span><span class="__shiki_1itgoe"> -&gt;</span><span class="__shiki_mdbnqw"> &quot;ts&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  DataSourceWriteOptions</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">PARTITIONPATH_FIELD_OPT_KEY</span><span class="__shiki_1itgoe"> -&gt;</span><span class="__shiki_mdbnqw"> &quot;dt&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 写入优化</span></span>
<span class="line"><span class="__shiki_1t8gfj">  HoodieWriteConfig</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">INSERT_PARALLELISM_VALUE</span><span class="__shiki_1itgoe"> -&gt;</span><span class="__shiki_mdbnqw"> &quot;200&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  HoodieWriteConfig</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">UPSERT_PARALLELISM_VALUE</span><span class="__shiki_1itgoe"> -&gt;</span><span class="__shiki_mdbnqw"> &quot;200&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  HoodieWriteConfig</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">DELETE_PARALLELISM_VALUE</span><span class="__shiki_1itgoe"> -&gt;</span><span class="__shiki_mdbnqw"> &quot;200&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 索引配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">  HoodieWriteConfig</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">INDEX_TYPE</span><span class="__shiki_1itgoe"> -&gt;</span><span class="__shiki_mdbnqw"> &quot;BLOOM&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 小文件处理</span></span>
<span class="line"><span class="__shiki_1t8gfj">  HoodieWriteConfig</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">PARQUET_MAX_FILE_SIZE</span><span class="__shiki_1itgoe"> -&gt;</span><span class="__shiki_mdbnqw"> &quot;134217728&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  HoodieWriteConfig</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">PARQUET_BLOCK_SIZE</span><span class="__shiki_1itgoe"> -&gt;</span><span class="__shiki_mdbnqw"> &quot;134217728&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // Hive同步</span></span>
<span class="line"><span class="__shiki_1t8gfj">  DataSourceWriteOptions</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">HIVE_SYNC_ENABLED_OPT_KEY</span><span class="__shiki_1itgoe"> -&gt;</span><span class="__shiki_mdbnqw"> &quot;true&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  DataSourceWriteOptions</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">HIVE_TABLE_OPT_KEY</span><span class="__shiki_1itgoe"> -&gt;</span><span class="__shiki_140thh"> tableName,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  DataSourceWriteOptions</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">HIVE_PARTITION_FIELDS_OPT_KEY</span><span class="__shiki_1itgoe"> -&gt;</span><span class="__shiki_mdbnqw"> &quot;dt&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  DataSourceWriteOptions</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">HIVE_PARTITION_EXTRACTOR_CLASS_OPT_KEY</span><span class="__shiki_1itgoe"> -&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;org.apache.hudi.hive.MultiPartKeysValueExtractor&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><hr><p>通过系统学习Apache Hudi，可以掌握构建现代化数据湖架构的核心技术，实现高效、可靠、可扩展的数据管理和处理能力。Hudi作为流批一体的数据湖解决方案，在实时数据处理和大规模数据管理场景中发挥着越来越重要的作用。</p>`,177)])])}const r=a(p,[["render",l]]);export{d as __pageData,r as default};
