import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"PostgreSQL架构设计与存储引擎深度解析","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/relational/postgres/architecture.md","filePath":"data/database/relational/postgres/architecture.md"}'),p={name:"data/database/relational/postgres/architecture.md"};function l(h,s,e,c,t,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="postgresql架构设计与存储引擎深度解析" tabindex="-1">PostgreSQL架构设计与存储引擎深度解析 <a class="header-anchor" href="#postgresql架构设计与存储引擎深度解析" aria-label="Permalink to &quot;PostgreSQL架构设计与存储引擎深度解析&quot;">​</a></h1><h2 id="一、postgresql整体架构概述" tabindex="-1">一、PostgreSQL整体架构概述 <a class="header-anchor" href="#一、postgresql整体架构概述" aria-label="Permalink to &quot;一、PostgreSQL整体架构概述&quot;">​</a></h2><h3 id="_1-1-核心架构设计哲学" tabindex="-1">1.1 核心架构设计哲学 <a class="header-anchor" href="#_1-1-核心架构设计哲学" aria-label="Permalink to &quot;1.1 核心架构设计哲学&quot;">​</a></h3><ul><li><strong>进程-内存分离架构</strong>：采用多进程模型，主进程fork子进程处理连接</li><li><strong>客户端/服务器模型</strong>：严格分离客户端和服务器进程</li><li><strong>可扩展性设计</strong>：通过扩展（extension）机制支持功能增强</li><li><strong>ACID兼容</strong>：完全符合原子性、一致性、隔离性、持久性</li></ul><h3 id="_1-2-核心组件架构图" tabindex="-1">1.2 核心组件架构图 <a class="header-anchor" href="#_1-2-核心组件架构图" aria-label="Permalink to &quot;1.2 核心组件架构图&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                      客户端应用程序                            │</span></span>
<span class="line"><span class="__shiki_wvjl67">└────────────────────────────┬────────────────────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">                            ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                    PostgreSQL服务器                           │</span></span>
<span class="line"><span class="__shiki_wvjl67">├──────────────┬──────────────┬──────────────┬───────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│  主进程      │  后台进程     │  工作进程     │  后台写入器   │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ (postmaster) │  (bgwriter)  │  (worker)    │  (wal writer) │</span></span>
<span class="line"><span class="__shiki_wvjl67">└──────────────┴──────────────┴──────────────┴───────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">                            ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                     共享内存与缓冲区                          │</span></span>
<span class="line"><span class="__shiki_wvjl67">├──────────────┬──────────────┬──────────────┬───────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│  共享缓冲区   │  WAL缓冲区    │  锁管理器     │  进程间通信    │</span></span>
<span class="line"><span class="__shiki_wvjl67">└──────────────┴──────────────┴──────────────┴───────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">                            ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                     持久化存储层                              │</span></span>
<span class="line"><span class="__shiki_wvjl67">├──────────────┬──────────────┬──────────────┬───────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│   数据文件    │  WAL日志     │  事务日志     │  配置文件      │</span></span>
<span class="line"><span class="__shiki_wvjl67">└──────────────┴──────────────┴──────────────┴───────────────┘</span></span></code></pre></div><h2 id="二、进程架构详解" tabindex="-1">二、进程架构详解 <a class="header-anchor" href="#二、进程架构详解" aria-label="Permalink to &quot;二、进程架构详解&quot;">​</a></h2><h3 id="_2-1-主进程-postmaster" tabindex="-1">2.1 主进程（Postmaster） <a class="header-anchor" href="#_2-1-主进程-postmaster" aria-label="Permalink to &quot;2.1 主进程（Postmaster）&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看PostgreSQL进程</span></span>
<span class="line"><span class="__shiki_140thh">$ ps aux | grep postgres</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 进程功能：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 监听客户端连接请求（默认5432端口）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 为每个连接fork一个后端进程</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 管理数据库实例的启动和关闭</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 维护共享内存区域</span></span></code></pre></div><h3 id="_2-2-后端进程-backend-processes" tabindex="-1">2.2 后端进程（Backend Processes） <a class="header-anchor" href="#_2-2-后端进程-backend-processes" aria-label="Permalink to &quot;2.2 后端进程（Backend Processes）&quot;">​</a></h3><p>每个客户端连接对应一个后端进程：</p><ul><li><strong>独立内存空间</strong>：每个后端进程有自己的私有内存</li><li><strong>查询处理</strong>：解析SQL、优化、执行</li><li><strong>事务管理</strong>：维护事务状态和隔离级别</li><li><strong>资源隔离</strong>：进程故障不会影响其他连接</li></ul><h3 id="_2-3-辅助后台进程" tabindex="-1">2.3 辅助后台进程 <a class="header-anchor" href="#_2-3-辅助后台进程" aria-label="Permalink to &quot;2.3 辅助后台进程&quot;">​</a></h3><table tabindex="0"><thead><tr><th>进程名称</th><th>功能描述</th><th>配置文件参数</th></tr></thead><tbody><tr><td><strong>Checkpointer</strong></td><td>执行检查点，刷新脏页到磁盘</td><td>checkpoint_timeout, checkpoint_completion_target</td></tr><tr><td><strong>Background Writer</strong></td><td>将共享缓冲区的脏页写入磁盘</td><td>bgwriter_delay, bgwriter_lru_maxpages</td></tr><tr><td><strong>WAL Writer</strong></td><td>将WAL缓冲区写入WAL日志</td><td>wal_writer_delay, wal_writer_flush_after</td></tr><tr><td><strong>Autovacuum Launcher</strong></td><td>自动启动vacuum工作进程</td><td>autovacuum, autovacuum_max_workers</td></tr><tr><td><strong>Stats Collector</strong></td><td>收集统计信息</td><td>stats_temp_directory</td></tr><tr><td><strong>Logging Collector</strong></td><td>日志收集器</td><td>logging_collector</td></tr><tr><td><strong>Archiver</strong></td><td>WAL日志归档</td><td>archive_mode, archive_command</td></tr></tbody></table><h2 id="三、内存架构" tabindex="-1">三、内存架构 <a class="header-anchor" href="#三、内存架构" aria-label="Permalink to &quot;三、内存架构&quot;">​</a></h2><h3 id="_3-1-共享内存-shared-memory" tabindex="-1">3.1 共享内存（Shared Memory） <a class="header-anchor" href="#_3-1-共享内存-shared-memory" aria-label="Permalink to &quot;3.1 共享内存（Shared Memory）&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看共享内存配置</span></span>
<span class="line"><span class="__shiki_140thh">SHOW shared_buffers;      </span><span class="__shiki_21nrsd">-- 默认128MB，建议设置总内存的25%</span></span>
<span class="line"><span class="__shiki_140thh">SHOW huge_pages;          </span><span class="__shiki_21nrsd">-- 是否使用大页</span></span>
<span class="line"><span class="__shiki_140thh">SHOW max_connections;     </span><span class="__shiki_21nrsd">-- 最大连接数</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 共享内存区域划分：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 共享缓冲区（Shared Buffers）：数据页缓存</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. WAL缓冲区（WAL Buffers）：WAL日志缓存</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 锁空间（Lock Space）：锁信息存储</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. CLOG缓冲区：事务提交状态缓存</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 其他共享数据结构</span></span></code></pre></div><h3 id="_3-2-后端进程私有内存" tabindex="-1">3.2 后端进程私有内存 <a class="header-anchor" href="#_3-2-后端进程私有内存" aria-label="Permalink to &quot;3.2 后端进程私有内存&quot;">​</a></h3><p>每个后端进程分配：</p><ul><li><strong>工作内存（work_mem）</strong>：用于排序、哈希操作</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 建议配置</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> work_mem </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;4MB&#39;</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 默认4MB，按需调整</span></span></code></pre></div><ul><li><strong>维护内存（maintenance_work_mem）</strong>：用于VACUUM、CREATE INDEX等操作</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> maintenance_work_mem </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;64MB&#39;</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 默认64MB</span></span></code></pre></div><ul><li><strong>临时缓冲区（temp_buffers）</strong>：临时表使用的缓冲区</li></ul><h3 id="_3-3-内存管理优化建议" tabindex="-1">3.3 内存管理优化建议 <a class="header-anchor" href="#_3-3-内存管理优化建议" aria-label="Permalink to &quot;3.3 内存管理优化建议&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 内存配置公式（Linux系统）</span></span>
<span class="line"><span class="__shiki_140thh">总内存 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 物理内存 </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> 系统保留(2GB)</span></span>
<span class="line"><span class="__shiki_140thh">shared_buffers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 总内存 × </span><span class="__shiki_dzsirb">25</span><span class="__shiki_140thh">%</span></span>
<span class="line"><span class="__shiki_140thh">wal_buffers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 16MB  </span><span class="__shiki_21nrsd">-- 通常足够</span></span>
<span class="line"><span class="__shiki_140thh">work_mem </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (总内存 </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> shared_buffers) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> max_connections × </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_140thh">maintenance_work_mem </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 总内存 × </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">05</span><span class="__shiki_21nrsd">  -- 但不超过2GB</span></span></code></pre></div><h2 id="四、存储架构与物理存储" tabindex="-1">四、存储架构与物理存储 <a class="header-anchor" href="#四、存储架构与物理存储" aria-label="Permalink to &quot;四、存储架构与物理存储&quot;">​</a></h2><h3 id="_4-1-数据库集群目录结构" tabindex="-1">4.1 数据库集群目录结构 <a class="header-anchor" href="#_4-1-数据库集群目录结构" aria-label="Permalink to &quot;4.1 数据库集群目录结构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">$PGDATA/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── PG_VERSION                    # PostgreSQL主版本号</span></span>
<span class="line"><span class="__shiki_wvjl67">├── pg_hba.conf                   # 客户端认证配置文件</span></span>
<span class="line"><span class="__shiki_wvjl67">├── pg_ident.conf                 # 用户映射配置文件</span></span>
<span class="line"><span class="__shiki_wvjl67">├── postgresql.conf               # 主配置文件</span></span>
<span class="line"><span class="__shiki_wvjl67">├── postgresql.auto.conf          # ALTER SYSTEM生成的配置</span></span>
<span class="line"><span class="__shiki_wvjl67">├── base/                         # 数据库目录</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── 1/                        # template1数据库</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── 13245/                    # 用户数据库目录</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │   ├── 1249                  # 系统表pg_class的文件</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │   ├── 1255                  # 系统表pg_proc的文件</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │   └── 16384/                # 用户表空间</span></span>
<span class="line"><span class="__shiki_wvjl67">├── global/                       # 集群范围的表</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── 1213                      # pg_database表</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── 1260                      # pg_authid表</span></span>
<span class="line"><span class="__shiki_wvjl67">├── pg_wal/                       # WAL日志目录（旧版本为pg_xlog）</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── 000000010000000000000001</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── archive_status/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── pg_xact/                      # 提交日志目录（旧版本为pg_clog）</span></span>
<span class="line"><span class="__shiki_wvjl67">├── pg_stat_tmp/                  # 统计信息临时文件</span></span>
<span class="line"><span class="__shiki_wvjl67">├── pg_subtrans/                  # 子事务状态</span></span>
<span class="line"><span class="__shiki_wvjl67">├── pg_twophase/                  # 两阶段提交状态</span></span>
<span class="line"><span class="__shiki_wvjl67">└── pg_multixact/                 # 多事务状态</span></span></code></pre></div><h3 id="_4-2-表空间管理" tabindex="-1">4.2 表空间管理 <a class="header-anchor" href="#_4-2-表空间管理" aria-label="Permalink to &quot;4.2 表空间管理&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建表空间</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLESPACE</span><span class="__shiki_1t8gfj"> fast_ssd</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">LOCATION</span><span class="__shiki_mdbnqw"> &#39;/ssd_data/postgresql/data&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建数据库指定表空间</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> DATABASE</span><span class="__shiki_1t8gfj"> mydb</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">TABLESPACE fast_ssd;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建表指定表空间</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> mytable</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    data</span><span class="__shiki_1itgoe"> TEXT</span></span>
<span class="line"><span class="__shiki_140thh">) TABLESPACE fast_ssd;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看表空间信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> spcname, pg_tablespace_location(</span><span class="__shiki_1itgoe">oid</span><span class="__shiki_140thh">) </span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_tablespace;</span></span></code></pre></div><h3 id="_4-3-数据文件组织结构" tabindex="-1">4.3 数据文件组织结构 <a class="header-anchor" href="#_4-3-数据文件组织结构" aria-label="Permalink to &quot;4.3 数据文件组织结构&quot;">​</a></h3><h4 id="_4-3-1-表文件结构" tabindex="-1">4.3.1 表文件结构 <a class="header-anchor" href="#_4-3-1-表文件结构" aria-label="Permalink to &quot;4.3.1 表文件结构&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">表文件 = 表OID（如16384）</span></span>
<span class="line"><span class="__shiki_wvjl67">表文件大小限制：1GB（默认），超过后创建新段文件：</span></span>
<span class="line"><span class="__shiki_wvjl67">16384      # 主文件（0-1GB）</span></span>
<span class="line"><span class="__shiki_wvjl67">16384.1    # 第一个段文件（1-2GB）</span></span>
<span class="line"><span class="__shiki_wvjl67">16384.2    # 第二个段文件（2-3GB）</span></span></code></pre></div><h4 id="_4-3-2-toast机制-the-oversized-attribute-storage-technique" tabindex="-1">4.3.2 TOAST机制（The Oversized-Attribute Storage Technique） <a class="header-anchor" href="#_4-3-2-toast机制-the-oversized-attribute-storage-technique" aria-label="Permalink to &quot;4.3.2 TOAST机制（The Oversized-Attribute Storage Technique）&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看表的TOAST信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    relname,</span></span>
<span class="line"><span class="__shiki_140thh">    reltoastrelid,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_relation_size(</span><span class="__shiki_1itgoe">oid</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> table_size,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_relation_size(reltoastrelid)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> toast_size</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_class </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> relname </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;your_table&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- TOAST策略</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. PLAIN：禁止压缩和线外存储</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. EXTENDED：允许压缩和线外存储（默认）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. EXTERNAL：允许线外存储但禁止压缩</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. MAIN：允许压缩，尽量不使用线外存储</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 修改列TOAST策略</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> mytable </span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_140thh"> COLUMN large_data </span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> STORAGE </span><span class="__shiki_1itgoe">EXTERNAL</span><span class="__shiki_140thh">;</span></span></code></pre></div><h2 id="五、页面结构与存储引擎" tabindex="-1">五、页面结构与存储引擎 <a class="header-anchor" href="#五、页面结构与存储引擎" aria-label="Permalink to &quot;五、页面结构与存储引擎&quot;">​</a></h2><h3 id="_5-1-数据页结构-8kb默认" tabindex="-1">5.1 数据页结构（8KB默认） <a class="header-anchor" href="#_5-1-数据页结构-8kb默认" aria-label="Permalink to &quot;5.1 数据页结构（8KB默认）&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                     Page Header (24 bytes)                   │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│                     Line Pointer Array                       │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 每个指针4字节，指向对应行数据                                │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│                     Free Space                               │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│                     Row Data (Heap Tuples)                   │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│                     Special Space (索引页专用)                │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_5-2-heap-tuple-堆元组-结构" tabindex="-1">5.2 Heap Tuple（堆元组）结构 <a class="header-anchor" href="#_5-2-heap-tuple-堆元组-结构" aria-label="Permalink to &quot;5.2 Heap Tuple（堆元组）结构&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// PostgreSQL源码中的HeapTupleHeaderData结构</span></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> HeapTupleHeaderData</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    union</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_140thh">        HeapTupleFields t_heap;</span></span>
<span class="line"><span class="__shiki_140thh">        DatumTupleFields t_datum;</span></span>
<span class="line"><span class="__shiki_140thh">    } t_choice;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    ItemPointerData t_ctid;</span><span class="__shiki_21nrsd">        // 当前元组ID（块号+偏移量）</span></span>
<span class="line"><span class="__shiki_140thh">    uint16          t_infomask2;</span><span class="__shiki_21nrsd">   // 属性数量+标志位</span></span>
<span class="line"><span class="__shiki_140thh">    uint16          t_infomask;</span><span class="__shiki_21nrsd">    // 事务可见性标志位</span></span>
<span class="line"><span class="__shiki_140thh">    uint8           t_hoff;</span><span class="__shiki_21nrsd">        // 头部长度</span></span>
<span class="line"><span class="__shiki_140thh">    bits8           </span><span class="__shiki_1jdh33">t_bits</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">];</span><span class="__shiki_21nrsd">     // NULL值位图（变长）</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 后面是实际数据</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_5-3-行版本与mvcc实现" tabindex="-1">5.3 行版本与MVCC实现 <a class="header-anchor" href="#_5-3-行版本与mvcc实现" aria-label="Permalink to &quot;5.3 行版本与MVCC实现&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看行的系统列</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> xmin, xmax, cmin, cmax, ctid, </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> your_table </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 系统列说明：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- xmin: 插入该行版本的事务ID</span></span>
<span class="line"><span class="__shiki_21nrsd">-- xmax: 删除该行版本的事务ID（0表示未删除）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- cmin: 命令ID（事务内的顺序）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- cmax: 命令ID（用于标记删除）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- ctid: 行版本的物理位置（块号+偏移量）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- oid: 对象ID（如果表有OID）</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建表时观察MVCC</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> test </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;data1&#39;</span><span class="__shiki_140thh">);  </span><span class="__shiki_21nrsd">-- 创建新行版本</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> test </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_1itgoe"> data</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;data2&#39;</span><span class="__shiki_1itgoe"> WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 创建新行版本，标记旧版本删除</span></span>
<span class="line"><span class="__shiki_1itgoe">COMMIT</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_5-4-事务id与冻结" tabindex="-1">5.4 事务ID与冻结 <a class="header-anchor" href="#_5-4-事务id与冻结" aria-label="Permalink to &quot;5.4 事务ID与冻结&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看事务ID相关信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    datname,</span></span>
<span class="line"><span class="__shiki_140thh">    age(datfrozenxid) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> frozen_age,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_database_size(datname)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> size</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_database;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 事务ID回卷问题预防</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 定期执行VACUUM FREEZE</span></span>
<span class="line"><span class="__shiki_140thh">VACUUM FREEZE your_table;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 监控事务ID使用</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">    relname,</span></span>
<span class="line"><span class="__shiki_140thh">    age(relfrozenxid) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> xid_age,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_relation_size(relid)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> size</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_class </span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> pg_namespace </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> pg_class</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relnamespace</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> pg_namespace</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> relkind </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;r&#39;</span><span class="__shiki_21nrsd">  -- 只查看普通表</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> age(relfrozenxid) </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span></code></pre></div><h2 id="六、wal-write-ahead-logging-机制" tabindex="-1">六、WAL（Write-Ahead Logging）机制 <a class="header-anchor" href="#六、wal-write-ahead-logging-机制" aria-label="Permalink to &quot;六、WAL（Write-Ahead Logging）机制&quot;">​</a></h2><h3 id="_6-1-wal架构设计" tabindex="-1">6.1 WAL架构设计 <a class="header-anchor" href="#_6-1-wal架构设计" aria-label="Permalink to &quot;6.1 WAL架构设计&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- WAL配置参数</span></span>
<span class="line"><span class="__shiki_140thh">SHOW wal_level;                    </span><span class="__shiki_21nrsd">-- minimal/replica/logical</span></span>
<span class="line"><span class="__shiki_140thh">SHOW fsync;                        </span><span class="__shiki_21nrsd">-- 是否同步写入（默认on）</span></span>
<span class="line"><span class="__shiki_140thh">SHOW </span><span class="__shiki_1itgoe">synchronous_commit</span><span class="__shiki_140thh">;           </span><span class="__shiki_21nrsd">-- 同步级别</span></span>
<span class="line"><span class="__shiki_140thh">SHOW wal_buffers;                  </span><span class="__shiki_21nrsd">-- WAL缓冲区大小</span></span>
<span class="line"><span class="__shiki_140thh">SHOW checkpoint_timeout;           </span><span class="__shiki_21nrsd">-- 检查点超时</span></span>
<span class="line"><span class="__shiki_140thh">SHOW max_wal_size;                 </span><span class="__shiki_21nrsd">-- 最大WAL大小</span></span>
<span class="line"><span class="__shiki_140thh">SHOW min_wal_size;                 </span><span class="__shiki_21nrsd">-- 最小WAL大小</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- WAL文件命名规则</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 文件名：0000000100000001000000A1</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 前8位：时间线Timeline ID</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 中间8位：逻辑日志文件号</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 最后8位：物理日志文件段号</span></span></code></pre></div><h3 id="_6-2-wal写入流程" tabindex="-1">6.2 WAL写入流程 <a class="header-anchor" href="#_6-2-wal写入流程" aria-label="Permalink to &quot;6.2 WAL写入流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">1. 事务修改数据页</span></span>
<span class="line"><span class="__shiki_wvjl67">2. 在共享缓冲区中修改页面（标记为脏页）</span></span>
<span class="line"><span class="__shiki_wvjl67">3. 生成WAL记录到WAL缓冲区</span></span>
<span class="line"><span class="__shiki_wvjl67">4. 根据synchronous_commit设置：</span></span>
<span class="line"><span class="__shiki_wvjl67">   - OFF/ LOCAL：异步写入</span></span>
<span class="line"><span class="__shiki_wvjl67">   - ON：同步写入（默认）</span></span>
<span class="line"><span class="__shiki_wvjl67">   - REMOTE_WRITE：同步写入到备库缓存</span></span>
<span class="line"><span class="__shiki_wvjl67">   - REMOTE_APPLY：同步应用到备库</span></span>
<span class="line"><span class="__shiki_wvjl67">5. WAL写入器定期刷盘</span></span>
<span class="line"><span class="__shiki_wvjl67">6. 检查点进程将脏页刷到数据文件</span></span></code></pre></div><h3 id="_6-3-wal相关优化" tabindex="-1">6.3 WAL相关优化 <a class="header-anchor" href="#_6-3-wal相关优化" aria-label="Permalink to &quot;6.3 WAL相关优化&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 批量写入优化</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 多个INSERT/UPDATE操作</span></span>
<span class="line"><span class="__shiki_1itgoe">COMMIT</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 一次WAL刷盘</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 调整WAL配置</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SYSTEM</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_140thh"> wal_compression </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_140thh">;     </span><span class="__shiki_21nrsd">-- WAL压缩（PG 9.5+）</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SYSTEM</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_140thh"> full_page_writes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> off</span><span class="__shiki_140thh">;   </span><span class="__shiki_21nrsd">-- 全页写（在确定场景下可关闭）</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SYSTEM</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_140thh"> wal_log_hints </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_140thh">;       </span><span class="__shiki_21nrsd">-- 提示位写入WAL</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 监控WAL生成</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    pg_current_wal_lsn(),                   </span><span class="__shiki_21nrsd">-- 当前LSN</span></span>
<span class="line"><span class="__shiki_140thh">    pg_walfile_name(pg_current_wal_lsn()),  </span><span class="__shiki_21nrsd">-- 当前WAL文件名</span></span>
<span class="line"><span class="__shiki_140thh">    pg_wal_lsn_diff(</span></span>
<span class="line"><span class="__shiki_140thh">        pg_current_wal_lsn(), </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;0/0&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> wal_bytes;                         </span><span class="__shiki_21nrsd">-- 生成的WAL字节数</span></span></code></pre></div><h2 id="七、索引存储引擎" tabindex="-1">七、索引存储引擎 <a class="header-anchor" href="#七、索引存储引擎" aria-label="Permalink to &quot;七、索引存储引擎&quot;">​</a></h2><h3 id="_7-1-b-tree索引" tabindex="-1">7.1 B-Tree索引 <a class="header-anchor" href="#_7-1-b-tree索引" aria-label="Permalink to &quot;7.1 B-Tree索引&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建B-Tree索引（默认）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_name</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> table_name (column_name);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- B-Tree索引页结构特点：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 平衡树结构，所有叶子节点深度相同</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 支持等值查询和范围查询</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 自动处理重复键值</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 支持多列索引（复合索引）</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看B-Tree索引元信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> bt_metap(</span><span class="__shiki_mdbnqw">&#39;idx_name&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> bt_page_stats(</span><span class="__shiki_mdbnqw">&#39;idx_name&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> bt_page_items(</span><span class="__shiki_mdbnqw">&#39;idx_name&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_7-2-gist-generalized-search-tree" tabindex="-1">7.2 GiST（Generalized Search Tree） <a class="header-anchor" href="#_7-2-gist-generalized-search-tree" aria-label="Permalink to &quot;7.2 GiST（Generalized Search Tree）&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建GiST索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_gist</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> table_name </span><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> gist (geo_column);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- GiST应用场景：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 几何数据类型</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 全文搜索（tsvector）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 范围类型</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 自定义数据类型</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看GiST索引统计</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> gist_stat(</span><span class="__shiki_mdbnqw">&#39;idx_gist&#39;</span><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_7-3-gin-generalized-inverted-index" tabindex="-1">7.3 GIN（Generalized Inverted Index） <a class="header-anchor" href="#_7-3-gin-generalized-inverted-index" aria-label="Permalink to &quot;7.3 GIN（Generalized Inverted Index）&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建GIN索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_gin</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> table_name </span><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> gin (array_column);</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_gin_tsv</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> docs </span><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> gin (tsvector_column);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- GIN优化参数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_gin</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> table_name </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> gin (column_name) </span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (fastupdate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> off</span><span class="__shiki_140thh">);  </span><span class="__shiki_21nrsd">-- 关闭快速更新</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- GIN应用场景：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 数组类型</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 全文搜索</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. JSONB类型</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 范围类型的包含查询</span></span></code></pre></div><h3 id="_7-4-brin-block-range-index" tabindex="-1">7.4 BRIN（Block Range Index） <a class="header-anchor" href="#_7-4-brin-block-range-index" aria-label="Permalink to &quot;7.4 BRIN（Block Range Index）&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建BRIN索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_brin</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> large_table </span><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> brin (timestamp_column);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- BRIN配置参数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_brin</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> table_name </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> brin (column_name) </span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (pages_per_range </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 128</span><span class="__shiki_140thh">);  </span><span class="__shiki_21nrsd">-- 每个范围包含的页数</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- BRIN适用场景：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 大型表，数据按时间或序列排序</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 数据物理存储顺序与查询条件相关</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 存储空间有限的场景</span></span></code></pre></div><h2 id="八、vacuum与存储优化" tabindex="-1">八、Vacuum与存储优化 <a class="header-anchor" href="#八、vacuum与存储优化" aria-label="Permalink to &quot;八、Vacuum与存储优化&quot;">​</a></h2><h3 id="_8-1-vacuum机制详解" tabindex="-1">8.1 Vacuum机制详解 <a class="header-anchor" href="#_8-1-vacuum机制详解" aria-label="Permalink to &quot;8.1 Vacuum机制详解&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 标准VACUUM（不锁表，可并行执行）</span></span>
<span class="line"><span class="__shiki_140thh">VACUUM (</span><span class="__shiki_1itgoe">VERBOSE</span><span class="__shiki_140thh">, ANALYZE) your_table;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 完整VACUUM（需要排它锁，重组表）</span></span>
<span class="line"><span class="__shiki_140thh">VACUUM FULL your_table;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 带参数的VACUUM</span></span>
<span class="line"><span class="__shiki_140thh">VACUUM (</span><span class="__shiki_1itgoe">VERBOSE</span><span class="__shiki_140thh">, SKIP_LOCKED, PROCESS_TOAST) your_table;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 自动Vacuum配置</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> your_table </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    autovacuum_enabled </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true,</span></span>
<span class="line"><span class="__shiki_140thh">    autovacuum_vacuum_threshold </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    autovacuum_vacuum_scale_factor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    autovacuum_analyze_threshold </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    autovacuum_analyze_scale_factor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    autovacuum_vacuum_cost_delay </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    autovacuum_vacuum_cost_limit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2000</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_8-2-存储优化策略" tabindex="-1">8.2 存储优化策略 <a class="header-anchor" href="#_8-2-存储优化策略" aria-label="Permalink to &quot;8.2 存储优化策略&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 表分区</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> measurement</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    city_id </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1itgoe"> not null</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    logdate </span><span class="__shiki_1itgoe">date</span><span class="__shiki_1itgoe"> not null</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    peaktemp </span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    unitsales </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">PARTITION</span><span class="__shiki_1itgoe"> BY</span><span class="__shiki_1itgoe"> RANGE</span><span class="__shiki_140thh"> (logdate);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 数据压缩（TOAST）</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> large_table </span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_140thh"> COLUMN json_data </span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> STORAGE </span><span class="__shiki_1itgoe">EXTERNAL</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 不压缩，只线外存储</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 填充因子优化</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> mytable</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">serial</span><span class="__shiki_1itgoe"> primary key</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    data</span><span class="__shiki_1itgoe"> text</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (fillfactor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 70</span><span class="__shiki_140thh">);  </span><span class="__shiki_21nrsd">-- 为更新预留空间</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 列存储优化（扩展）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用cstore_fdw扩展进行列存储</span></span></code></pre></div><h3 id="_8-3-监控存储状态" tabindex="-1">8.3 监控存储状态 <a class="header-anchor" href="#_8-3-监控存储状态" aria-label="Permalink to &quot;8.3 监控存储状态&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看表膨胀情况</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">    tablename,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_relation_size(quote_ident(schemaname)</span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw">&#39;.&#39;</span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh">quote_ident(tablename))) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> table_size,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_total_relation_size(quote_ident(schemaname)</span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw">&#39;.&#39;</span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh">quote_ident(tablename))) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total_size,</span></span>
<span class="line"><span class="__shiki_140thh">    n_dead_tup,</span></span>
<span class="line"><span class="__shiki_140thh">    n_live_tup,</span></span>
<span class="line"><span class="__shiki_dzsirb">    round</span><span class="__shiki_140thh">(n_dead_tup::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> (n_live_tup </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> n_dead_tup), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> dead_percentage</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_user_tables </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> (n_live_tup </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> n_dead_tup) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> dead_percentage </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看索引使用情况</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">    tablename,</span></span>
<span class="line"><span class="__shiki_140thh">    indexname,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_scan,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_tup_read,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_tup_fetch,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_relation_size(quote_ident(schemaname)</span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw">&#39;.&#39;</span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh">quote_ident(indexname))) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> index_size</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_user_indexes </span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> idx_scan;</span></span></code></pre></div><h2 id="九、高级存储特性" tabindex="-1">九、高级存储特性 <a class="header-anchor" href="#九、高级存储特性" aria-label="Permalink to &quot;九、高级存储特性&quot;">​</a></h2><h3 id="_9-1-表访问方法-table-access-method" tabindex="-1">9.1 表访问方法（Table Access Method） <a class="header-anchor" href="#_9-1-表访问方法-table-access-method" aria-label="Permalink to &quot;9.1 表访问方法（Table Access Method）&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看支持的访问方法</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> amname, amhandler, amtype </span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_am;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建自定义访问方法（需要C语言扩展）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 参考：https://www.postgresql.org/docs/current/tableam.html</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 设置表的访问方法</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> heap_table</span><span class="__shiki_140thh"> (...) </span><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> heap;</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> columnar_table</span><span class="__shiki_140thh"> (...) </span><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> columnar;  </span><span class="__shiki_21nrsd">-- 如果有columnar扩展</span></span></code></pre></div><h3 id="_9-2-可插拔存储引擎" tabindex="-1">9.2 可插拔存储引擎 <a class="header-anchor" href="#_9-2-可插拔存储引擎" aria-label="Permalink to &quot;9.2 可插拔存储引擎&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 示例：Zheap存储引擎（减少写放大）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 需要安装zheap扩展</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> zheap_table</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">serial</span><span class="__shiki_1itgoe"> primary key</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    data</span><span class="__shiki_1itgoe"> text</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> zheap;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- Zheap特性：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 原地更新（非MVCC堆叠）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 减少空间膨胀</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 更快的VACUUM</span></span></code></pre></div><h3 id="_9-3-fdw-foreign-data-wrapper" tabindex="-1">9.3 FDW（Foreign Data Wrapper） <a class="header-anchor" href="#_9-3-fdw-foreign-data-wrapper" aria-label="Permalink to &quot;9.3 FDW（Foreign Data Wrapper）&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建外部表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> EXTENSION postgres_fdw;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> foreign_server </span></span>
<span class="line"><span class="__shiki_140thh">FOREIGN </span><span class="__shiki_1itgoe">DATA</span><span class="__shiki_140thh"> WRAPPER postgres_fdw </span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (host </span><span class="__shiki_mdbnqw">&#39;foreign_host&#39;</span><span class="__shiki_140thh">, dbname </span><span class="__shiki_mdbnqw">&#39;foreign_db&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> USER</span><span class="__shiki_1t8gfj"> MAPPING</span><span class="__shiki_1itgoe"> FOR</span><span class="__shiki_140thh"> current_user </span></span>
<span class="line"><span class="__shiki_1itgoe">SERVER</span><span class="__shiki_140thh"> foreign_server </span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (user </span><span class="__shiki_mdbnqw">&#39;foreign_user&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">password</span><span class="__shiki_mdbnqw"> &#39;password&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> FOREIGN </span><span class="__shiki_1itgoe">TABLE</span><span class="__shiki_140thh"> foreign_table (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    data</span><span class="__shiki_1itgoe"> text</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">SERVER</span><span class="__shiki_140thh"> foreign_server </span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (schema_name </span><span class="__shiki_mdbnqw">&#39;public&#39;</span><span class="__shiki_140thh">, table_name </span><span class="__shiki_mdbnqw">&#39;remote_table&#39;</span><span class="__shiki_140thh">);</span></span></code></pre></div><h2 id="十、性能调优与最佳实践" tabindex="-1">十、性能调优与最佳实践 <a class="header-anchor" href="#十、性能调优与最佳实践" aria-label="Permalink to &quot;十、性能调优与最佳实践&quot;">​</a></h2><h3 id="_10-1-存储配置优化" tabindex="-1">10.1 存储配置优化 <a class="header-anchor" href="#_10-1-存储配置优化" aria-label="Permalink to &quot;10.1 存储配置优化&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- postgresql.conf关键配置</span></span>
<span class="line"><span class="__shiki_140thh"># 内存设置</span></span>
<span class="line"><span class="__shiki_140thh">shared_buffers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 4GB                   # </span><span class="__shiki_dzsirb">25</span><span class="__shiki_140thh">%总内存</span></span>
<span class="line"><span class="__shiki_140thh">work_mem </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 16MB                        # 排序</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">哈希内存</span></span>
<span class="line"><span class="__shiki_140thh">maintenance_work_mem </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 512MB          # 维护操作内存</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># WAL设置</span></span>
<span class="line"><span class="__shiki_140thh">wal_level </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> replica</span><span class="__shiki_140thh">                    # 复制级别</span></span>
<span class="line"><span class="__shiki_140thh">wal_buffers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 16MB                     # WAL缓冲区</span></span>
<span class="line"><span class="__shiki_140thh">max_wal_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 4GB                     # 最大WAL大小</span></span>
<span class="line"><span class="__shiki_140thh">min_wal_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 1GB                     # 最小WAL大小</span></span>
<span class="line"><span class="__shiki_140thh">checkpoint_timeout </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 15min            # 检查点间隔</span></span>
<span class="line"><span class="__shiki_140thh">checkpoint_completion_target </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">9</span><span class="__shiki_140thh">    # 检查点完成目标</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 存储优化</span></span>
<span class="line"><span class="__shiki_140thh">random_page_cost </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">                 # SSD优化</span></span>
<span class="line"><span class="__shiki_140thh">effective_io_concurrency </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 200</span><span class="__shiki_140thh">         # 并发IO</span></span>
<span class="line"><span class="__shiki_140thh">effective_cache_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 12GB            # 操作系统缓存估计</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 并行处理</span></span>
<span class="line"><span class="__shiki_140thh">max_worker_processes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 8</span><span class="__shiki_140thh">               # 最大工作进程</span></span>
<span class="line"><span class="__shiki_140thh">max_parallel_workers_per_gather </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">    # 每个查询并行工作进程</span></span>
<span class="line"><span class="__shiki_140thh">max_parallel_maintenance_workers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">   # 维护操作并行</span></span></code></pre></div><h3 id="_10-2-查询性能优化" tabindex="-1">10.2 查询性能优化 <a class="header-anchor" href="#_10-2-查询性能优化" aria-label="Permalink to &quot;10.2 查询性能优化&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 使用覆盖索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_covering</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> orders (customer_id, order_date) </span></span>
<span class="line"><span class="__shiki_1itgoe">INCLUDE</span><span class="__shiki_140thh"> (total_amount);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 部分索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_active_users</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> users (last_login) </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> active </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 表达式索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_lower_email</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> users (</span><span class="__shiki_dzsirb">lower</span><span class="__shiki_140thh">(email));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 多列索引顺序优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 等值查询列在前，范围查询列在后</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_optimized</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> sales (region, sale_date, product_id);</span></span></code></pre></div><h3 id="_10-3-监控与维护脚本" tabindex="-1">10.3 监控与维护脚本 <a class="header-anchor" href="#_10-3-监控与维护脚本" aria-label="Permalink to &quot;10.3 监控与维护脚本&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 存储健康检查脚本</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> table_stats </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">        tablename,</span></span>
<span class="line"><span class="__shiki_140thh">        pg_relation_size(quote_ident(schemaname)</span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw">&#39;.&#39;</span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh">quote_ident(tablename)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> table_size,</span></span>
<span class="line"><span class="__shiki_140thh">        pg_total_relation_size(quote_ident(schemaname)</span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw">&#39;.&#39;</span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh">quote_ident(tablename)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total_size,</span></span>
<span class="line"><span class="__shiki_140thh">        n_live_tup,</span></span>
<span class="line"><span class="__shiki_140thh">        n_dead_tup,</span></span>
<span class="line"><span class="__shiki_140thh">        last_vacuum,</span></span>
<span class="line"><span class="__shiki_140thh">        last_autovacuum,</span></span>
<span class="line"><span class="__shiki_140thh">        last_analyze,</span></span>
<span class="line"><span class="__shiki_140thh">        last_autoanalyze</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_stat_user_tables</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">    tablename,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(table_size) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> table_size,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(total_size </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> table_size) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> index_size,</span></span>
<span class="line"><span class="__shiki_140thh">    n_live_tup </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> live_rows,</span></span>
<span class="line"><span class="__shiki_140thh">    n_dead_tup </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> dead_rows,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> n_live_tup </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> n_dead_tup </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        THEN</span><span class="__shiki_dzsirb"> round</span><span class="__shiki_140thh">(n_dead_tup::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> (n_live_tup </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> n_dead_tup), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> dead_percentage,</span></span>
<span class="line"><span class="__shiki_140thh">    last_autovacuum</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> table_stats</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> total_size </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_21nrsd">  -- 大于100MB的表</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> total_size </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span></code></pre></div><h2 id="十一、故障排除与恢复" tabindex="-1">十一、故障排除与恢复 <a class="header-anchor" href="#十一、故障排除与恢复" aria-label="Permalink to &quot;十一、故障排除与恢复&quot;">​</a></h2><h3 id="_11-1-常见存储问题" tabindex="-1">11.1 常见存储问题 <a class="header-anchor" href="#_11-1-常见存储问题" aria-label="Permalink to &quot;11.1 常见存储问题&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 事务ID回卷警告</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> datname, age(datfrozenxid) </span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_database </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> age(datfrozenxid) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000000000</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 接近20亿</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 空间不足</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> pg_size_pretty(pg_database_size(current_database()));</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> pg_size_pretty(pg_tablespace_size(</span><span class="__shiki_mdbnqw">&#39;pg_default&#39;</span><span class="__shiki_140thh">));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 损坏检测</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用pg_checksums（PG 12+）</span></span>
<span class="line"><span class="__shiki_140thh">$ pg_checksums </span><span class="__shiki_21nrsd">--enable -D /path/to/data</span></span>
<span class="line"><span class="__shiki_140thh">$ pg_checksums </span><span class="__shiki_21nrsd">--check -D /path/to/data</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 数据文件损坏恢复</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 从备份恢复或使用pg_resetwal（谨慎使用）</span></span></code></pre></div><h3 id="_11-2-性能问题诊断" tabindex="-1">11.2 性能问题诊断 <a class="header-anchor" href="#_11-2-性能问题诊断" aria-label="Permalink to &quot;11.2 性能问题诊断&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 慢查询分析</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS) </span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> large_table </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> condition;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 锁等待分析</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    locktype,</span></span>
<span class="line"><span class="__shiki_140thh">    relation::regclass,</span></span>
<span class="line"><span class="__shiki_140thh">    mode,</span></span>
<span class="line"><span class="__shiki_140thh">    granted,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_blocking_pids(pid) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> blocking_pids</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_locks </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_140thh"> granted;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. IO瓶颈分析</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_stat_io;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 缓冲区命中率</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    sum</span><span class="__shiki_140thh">(heap_blks_read) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> heap_read,</span></span>
<span class="line"><span class="__shiki_dzsirb">    sum</span><span class="__shiki_140thh">(heap_blks_hit) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> heap_hit,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> sum</span><span class="__shiki_140thh">(heap_blks_read </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> heap_blks_hit) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        THEN</span><span class="__shiki_dzsirb"> round</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(heap_blks_hit) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> sum</span><span class="__shiki_140thh">(heap_blks_read </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> heap_blks_hit), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> hit_ratio</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_statio_user_tables;</span></span></code></pre></div><h2 id="十二、未来发展趋势" tabindex="-1">十二、未来发展趋势 <a class="header-anchor" href="#十二、未来发展趋势" aria-label="Permalink to &quot;十二、未来发展趋势&quot;">​</a></h2><h3 id="_12-1-postgresql存储引擎发展方向" tabindex="-1">12.1 PostgreSQL存储引擎发展方向 <a class="header-anchor" href="#_12-1-postgresql存储引擎发展方向" aria-label="Permalink to &quot;12.1 PostgreSQL存储引擎发展方向&quot;">​</a></h3><ol><li><strong>列存储引擎</strong>：cstore_fdw → 内置列存储支持</li><li><strong>可插拔存储引擎</strong>：更多第三方存储引擎集成</li><li><strong>Zheap/zedstore</strong>：减少写放大和空间膨胀</li><li><strong>内存表引擎</strong>：类似MySQL的MEMORY引擎</li><li><strong>分布式存储</strong>：Citus扩展的增强</li></ol><h3 id="_12-2-性能优化方向" tabindex="-1">12.2 性能优化方向 <a class="header-anchor" href="#_12-2-性能优化方向" aria-label="Permalink to &quot;12.2 性能优化方向&quot;">​</a></h3><ol><li><strong>并行处理增强</strong>：更多操作支持并行执行</li><li><strong>JIT编译优化</strong>：即时编译提升复杂查询性能</li><li><strong>机器学习集成</strong>：AI驱动的查询优化</li><li><strong>硬件加速</strong>：GPU/FPGA支持</li></ol><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>PostgreSQL的架构设计与存储引擎体现了其作为企业级关系数据库的成熟与稳健：</p><ol><li><strong>进程-内存分离架构</strong>提供了优秀的稳定性和隔离性</li><li><strong>MVCC实现</strong>平衡了并发性能和数据一致性</li><li><strong>可扩展的存储引擎</strong>支持多种数据访问模式</li><li><strong>WAL机制</strong>确保了数据的持久性和恢复能力</li><li><strong>丰富的索引类型</strong>满足不同查询模式的需求</li></ol><p>在实际应用中，理解PostgreSQL的存储架构对于：</p><ul><li>数据库设计优化</li><li>性能调优</li><li>容量规划</li><li>故障诊断</li><li>备份恢复策略</li></ul><p>都具有至关重要的意义。随着PostgreSQL的不断发展，其存储引擎将继续演进，为更多样化的应用场景提供支持。</p><hr><p><strong>参考资源</strong>：</p><ol><li>PostgreSQL官方文档：<a href="https://www.postgresql.org/docs/" target="_blank" rel="noreferrer">https://www.postgresql.org/docs/</a></li><li>《PostgreSQL修炼之道：从小工到专家》</li><li>《PostgreSQL 9.6 High Performance》</li><li>PostgreSQL源码：<a href="https://github.com/postgres/postgres" target="_blank" rel="noreferrer">https://github.com/postgres/postgres</a></li><li>PGCon会议资料：<a href="https://www.pgcon.org/" target="_blank" rel="noreferrer">https://www.pgcon.org/</a></li></ol>`,101)])])}const d=a(p,[["render",l]]);export{r as __pageData,d as default};
