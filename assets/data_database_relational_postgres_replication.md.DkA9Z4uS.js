import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"PostgreSQL逻辑复制与物理复制深度解析","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/relational/postgres/replication.md","filePath":"data/database/relational/postgres/replication.md"}'),p={name:"data/database/relational/postgres/replication.md"};function l(h,s,c,e,t,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="postgresql逻辑复制与物理复制深度解析" tabindex="-1">PostgreSQL逻辑复制与物理复制深度解析 <a class="header-anchor" href="#postgresql逻辑复制与物理复制深度解析" aria-label="Permalink to &quot;PostgreSQL逻辑复制与物理复制深度解析&quot;">​</a></h1><h2 id="一、复制基础概念与架构对比" tabindex="-1">一、复制基础概念与架构对比 <a class="header-anchor" href="#一、复制基础概念与架构对比" aria-label="Permalink to &quot;一、复制基础概念与架构对比&quot;">​</a></h2><h3 id="_1-1-复制类型概述" tabindex="-1">1.1 复制类型概述 <a class="header-anchor" href="#_1-1-复制类型概述" aria-label="Permalink to &quot;1.1 复制类型概述&quot;">​</a></h3><h4 id="_1-1-1-复制类型对比矩阵" tabindex="-1">1.1.1 复制类型对比矩阵 <a class="header-anchor" href="#_1-1-1-复制类型对比矩阵" aria-label="Permalink to &quot;1.1.1 复制类型对比矩阵&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看当前数据库的复制配置</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    setting,</span></span>
<span class="line"><span class="__shiki_140thh">    unit,</span></span>
<span class="line"><span class="__shiki_140thh">    category,</span></span>
<span class="line"><span class="__shiki_140thh">    short_desc</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_settings</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%replication%&#39;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">   OR</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%wal%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">   OR</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%archive%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> category, </span><span class="__shiki_1itgoe">name</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 复制类型对比</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">| 特性 | 物理复制（流复制） | 逻辑复制 |</span></span>
<span class="line"><span class="__shiki_21nrsd">|------|-------------------|----------|</span></span>
<span class="line"><span class="__shiki_21nrsd">| 复制级别 | 块级/物理页级 | 行级/逻辑变更 |</span></span>
<span class="line"><span class="__shiki_21nrsd">| 数据一致性 | 字节级一致性 | 事务级一致性 |</span></span>
<span class="line"><span class="__shiki_21nrsd">| 版本要求 | 主备版本必须相同 | 可跨大版本（通常支持跨1-2个主版本） |</span></span>
<span class="line"><span class="__shiki_21nrsd">| 复制粒度 | 整个数据库集群 | 表级/数据库级可选 |</span></span>
<span class="line"><span class="__shiki_21nrsd">| 拓扑结构 | 一主多从，级联复制 | 多主，双向复制（需谨慎） |</span></span>
<span class="line"><span class="__shiki_21nrsd">| 冲突处理 | 无冲突（备库只读） | 可能产生冲突，需处理 |</span></span>
<span class="line"><span class="__shiki_21nrsd">| 延迟 | 通常较低（毫秒级） | 略高于物理复制 |</span></span>
<span class="line"><span class="__shiki_21nrsd">| 资源消耗 | 较低（仅传输WAL） | 较高（需要解码WAL） |</span></span>
<span class="line"><span class="__shiki_21nrsd">| 适用场景 | 高可用、灾难恢复 | 数据分发、数据汇聚、升级迁移 |</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span></code></pre></div><h4 id="_1-1-2-postgresql复制演进史" tabindex="-1">1.1.2 PostgreSQL复制演进史 <a class="header-anchor" href="#_1-1-2-postgresql复制演进史" aria-label="Permalink to &quot;1.1.2 PostgreSQL复制演进史&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- PostgreSQL复制发展历程</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">版本演进：</span></span>
<span class="line"><span class="__shiki_21nrsd">- PostgreSQL 9.0: 引入内置流复制（物理复制）</span></span>
<span class="line"><span class="__shiki_21nrsd">- PostgreSQL 9.4: 逻辑解码API（Logical Decoding）</span></span>
<span class="line"><span class="__shiki_21nrsd">- PostgreSQL 9.6: 同步提交增强，多同步备库</span></span>
<span class="line"><span class="__shiki_21nrsd">- PostgreSQL 10.0: 内置逻辑复制（Publication/Subscription）</span></span>
<span class="line"><span class="__shiki_21nrsd">- PostgreSQL 11: 逻辑复制支持分区表</span></span>
<span class="line"><span class="__shiki_21nrsd">- PostgreSQL 12: 逻辑复制性能提升，支持流式解码</span></span>
<span class="line"><span class="__shiki_21nrsd">- PostgreSQL 13: 逻辑复制支持并行应用</span></span>
<span class="line"><span class="__shiki_21nrsd">- PostgreSQL 14: 逻辑复制支持长事务，性能改进</span></span>
<span class="line"><span class="__shiki_21nrsd">- PostgreSQL 15: 逻辑复制支持行过滤，列过滤</span></span>
<span class="line"><span class="__shiki_21nrsd">- PostgreSQL 16: 逻辑复制支持双向复制冲突检测</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span></code></pre></div><h3 id="_1-2-复制架构核心组件" tabindex="-1">1.2 复制架构核心组件 <a class="header-anchor" href="#_1-2-复制架构核心组件" aria-label="Permalink to &quot;1.2 复制架构核心组件&quot;">​</a></h3><h4 id="_1-2-1-物理复制架构" tabindex="-1">1.2.1 物理复制架构 <a class="header-anchor" href="#_1-2-1-物理复制架构" aria-label="Permalink to &quot;1.2.1 物理复制架构&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 物理复制（流复制）架构图</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">主库（Primary）：</span></span>
<span class="line"><span class="__shiki_21nrsd">┌─────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_21nrsd">│           PostgreSQL主库             │</span></span>
<span class="line"><span class="__shiki_21nrsd">├─────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_21nrsd">│  WAL写入器 → WAL文件                │</span></span>
<span class="line"><span class="__shiki_21nrsd">│       ↓                             │</span></span>
<span class="line"><span class="__shiki_21nrsd">│  WAL发送进程（WAL Sender）           │</span></span>
<span class="line"><span class="__shiki_21nrsd">│       ↓                             │</span></span>
<span class="line"><span class="__shiki_21nrsd">│  通过网络传输WAL记录                 │</span></span>
<span class="line"><span class="__shiki_21nrsd">└──────────────┬──────────────────────┘</span></span>
<span class="line"><span class="__shiki_21nrsd">               ↓</span></span>
<span class="line"><span class="__shiki_21nrsd">备库（Standby）：</span></span>
<span class="line"><span class="__shiki_21nrsd">┌─────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_21nrsd">│           PostgreSQL备库             │</span></span>
<span class="line"><span class="__shiki_21nrsd">├─────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_21nrsd">│  WAL接收进程（WAL Receiver）         │</span></span>
<span class="line"><span class="__shiki_21nrsd">│       ↓                             │</span></span>
<span class="line"><span class="__shiki_21nrsd">│  WAL写入 → WAL文件                   │</span></span>
<span class="line"><span class="__shiki_21nrsd">│       ↓                             │</span></span>
<span class="line"><span class="__shiki_21nrsd">│  启动进程（Startup Process）         │</span></span>
<span class="line"><span class="__shiki_21nrsd">│       ↓                             │</span></span>
<span class="line"><span class="__shiki_21nrsd">│  重放WAL（WAL Replay）              │</span></span>
<span class="line"><span class="__shiki_21nrsd">└─────────────────────────────────────┘</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">关键进程：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. WAL写入器（WAL Writer）：将WAL缓冲区写入磁盘</span></span>
<span class="line"><span class="__shiki_21nrsd">2. WAL发送进程（WAL Sender）：向备库发送WAL数据</span></span>
<span class="line"><span class="__shiki_21nrsd">3. WAL接收进程（WAL Receiver）：接收主库WAL数据</span></span>
<span class="line"><span class="__shiki_21nrsd">4. 启动进程（Startup Process）：在备库重放WAL</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span></code></pre></div><h4 id="_1-2-2-逻辑复制架构" tabindex="-1">1.2.2 逻辑复制架构 <a class="header-anchor" href="#_1-2-2-逻辑复制架构" aria-label="Permalink to &quot;1.2.2 逻辑复制架构&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 逻辑复制架构图</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">发布者（Publisher）：</span></span>
<span class="line"><span class="__shiki_21nrsd">┌─────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_21nrsd">│          PostgreSQL主库              │</span></span>
<span class="line"><span class="__shiki_21nrsd">├─────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_21nrsd">│    逻辑解码（Logical Decoding）      │</span></span>
<span class="line"><span class="__shiki_21nrsd">│           ↓                         │</span></span>
<span class="line"><span class="__shiki_21nrsd">│    输出插件（Output Plugin）         │</span></span>
<span class="line"><span class="__shiki_21nrsd">│           ↓                         │</span></span>
<span class="line"><span class="__shiki_21nrsd">│    逻辑变更流（Logical Changes）     │</span></span>
<span class="line"><span class="__shiki_21nrsd">└──────────────┬──────────────────────┘</span></span>
<span class="line"><span class="__shiki_21nrsd">               ↓</span></span>
<span class="line"><span class="__shiki_21nrsd">订阅者（Subscriber）：</span></span>
<span class="line"><span class="__shiki_21nrsd">┌─────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_21nrsd">│          PostgreSQL备库              │</span></span>
<span class="line"><span class="__shiki_21nrsd">├─────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_21nrsd">│    逻辑复制工作进程                  │</span></span>
<span class="line"><span class="__shiki_21nrsd">│    （Logical Replication Worker）    │</span></span>
<span class="line"><span class="__shiki_21nrsd">│           ↓                         │</span></span>
<span class="line"><span class="__shiki_21nrsd">│    应用变更（Apply Changes）         │</span></span>
<span class="line"><span class="__shiki_21nrsd">└─────────────────────────────────────┘</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">关键概念：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. 复制槽（Replication Slot）：确保WAL保留，防止被清理</span></span>
<span class="line"><span class="__shiki_21nrsd">2. 发布（Publication）：定义要复制的表集合</span></span>
<span class="line"><span class="__shiki_21nrsd">3. 订阅（Subscription）：连接到发布并接收变更</span></span>
<span class="line"><span class="__shiki_21nrsd">4. 输出插件：将WAL解码为逻辑格式（如pgoutput、wal2json）</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span></code></pre></div><h2 id="二、物理复制-流复制-深度解析" tabindex="-1">二、物理复制（流复制）深度解析 <a class="header-anchor" href="#二、物理复制-流复制-深度解析" aria-label="Permalink to &quot;二、物理复制（流复制）深度解析&quot;">​</a></h2><h3 id="_2-1-流复制配置与实践" tabindex="-1">2.1 流复制配置与实践 <a class="header-anchor" href="#_2-1-流复制配置与实践" aria-label="Permalink to &quot;2.1 流复制配置与实践&quot;">​</a></h3><h4 id="_2-1-1-基础流复制配置" tabindex="-1">2.1.1 基础流复制配置 <a class="header-anchor" href="#_2-1-1-基础流复制配置" aria-label="Permalink to &quot;2.1.1 基础流复制配置&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 主库配置（postgresql.conf）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 启用WAL归档和复制</span></span>
<span class="line"><span class="__shiki_140thh">wal_level </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> replica</span><span class="__shiki_21nrsd">                    -- 或 minimal/replica/logical</span></span>
<span class="line"><span class="__shiki_140thh">archive_mode </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_21nrsd">                      -- 启用归档</span></span>
<span class="line"><span class="__shiki_140thh">archive_command </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;test ! -f /var/lib/pgsql/archive/%f &amp;&amp; cp %p /var/lib/pgsql/archive/%f&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 复制相关配置</span></span>
<span class="line"><span class="__shiki_140thh">max_wal_senders </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_21nrsd">                   -- 最大WAL发送进程数</span></span>
<span class="line"><span class="__shiki_140thh">wal_keep_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 1GB                    </span><span class="__shiki_21nrsd">-- 保留的WAL大小（替代wal_keep_segments）</span></span>
<span class="line"><span class="__shiki_140thh">max_replication_slots </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_21nrsd">             -- 最大复制槽数</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 连接和认证</span></span>
<span class="line"><span class="__shiki_140thh">listen_addresses </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;*&#39;</span><span class="__shiki_21nrsd">                 -- 监听所有地址</span></span>
<span class="line"><span class="__shiki_140thh">port </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 5432</span><span class="__shiki_21nrsd">                            -- 监听端口</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 同步复制配置（可选）</span></span>
<span class="line"><span class="__shiki_1itgoe">synchronous_commit</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_21nrsd">                -- 同步提交</span></span>
<span class="line"><span class="__shiki_140thh">synchronous_standby_names </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;standby1&#39;</span><span class="__shiki_21nrsd"> -- 同步备库名称</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 备库配置（postgresql.auto.conf 或 recovery.conf）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 恢复模式配置</span></span>
<span class="line"><span class="__shiki_140thh">standby_mode </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;on&#39;</span></span>
<span class="line"><span class="__shiki_140thh">primary_conninfo </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;host=192.168.1.10 port=5432 user=replicator password=secret application_name=standby1&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 恢复目标</span></span>
<span class="line"><span class="__shiki_140thh">recovery_target_timeline </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;latest&#39;</span><span class="__shiki_21nrsd">    -- 恢复到最新时间线</span></span>
<span class="line"><span class="__shiki_140thh">recovery_min_apply_delay </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_21nrsd">           -- 延迟应用（用于逻辑备库）</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 触发文件（用于故障转移）</span></span>
<span class="line"><span class="__shiki_140thh">trigger_file </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;/tmp/promote_trigger&#39;</span></span></code></pre></div><h4 id="_2-1-2-高级流复制配置" tabindex="-1">2.1.2 高级流复制配置 <a class="header-anchor" href="#_2-1-2-高级流复制配置" aria-label="Permalink to &quot;2.1.2 高级流复制配置&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 级联复制配置</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 主库 → 中间备库 → 叶子备库</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 中间备库配置（既是备库也是主库）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- postgresql.conf</span></span>
<span class="line"><span class="__shiki_140thh">wal_level </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> replica</span></span>
<span class="line"><span class="__shiki_140thh">max_wal_senders </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 5</span></span>
<span class="line"><span class="__shiki_140thh">hot_standby </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> on</span></span>
<span class="line"><span class="__shiki_140thh">hot_standby_feedback </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> on</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 中间备库的recovery.conf</span></span>
<span class="line"><span class="__shiki_140thh">primary_conninfo </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;host=primary_host port=5432 user=replicator password=secret application_name=cascade_standby&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 叶子备库配置</span></span>
<span class="line"><span class="__shiki_140thh">primary_conninfo </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;host=cascade_standby_host port=5432 user=replicator password=secret application_name=leaf_standby&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 多同步备库配置</span></span>
<span class="line"><span class="__shiki_140thh">synchronous_standby_names </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;FIRST 2 (standby1, standby2, standby3)&#39;</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 或</span></span>
<span class="line"><span class="__shiki_140thh">synchronous_standby_names </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;ANY 2 (standby1, standby2, standby3)&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 延迟备库（用于避免逻辑错误）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 在备库配置</span></span>
<span class="line"><span class="__shiki_140thh">recovery_min_apply_delay </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;1h&#39;</span><span class="__shiki_21nrsd">        -- 延迟1小时应用</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 监控和调优参数</span></span>
<span class="line"><span class="__shiki_140thh">wal_receiver_status_interval </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 10s     </span><span class="__shiki_21nrsd">-- 接收状态报告间隔</span></span>
<span class="line"><span class="__shiki_140thh">wal_receiver_timeout </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 60s             </span><span class="__shiki_21nrsd">-- 接收超时</span></span>
<span class="line"><span class="__shiki_140thh">max_slot_wal_keep_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_21nrsd">            -- 复制槽保留的WAL大小（-1为无限制）</span></span></code></pre></div><h3 id="_2-2-流复制监控与管理" tabindex="-1">2.2 流复制监控与管理 <a class="header-anchor" href="#_2-2-流复制监控与管理" aria-label="Permalink to &quot;2.2 流复制监控与管理&quot;">​</a></h3><h4 id="_2-2-1-复制状态监控" tabindex="-1">2.2.1 复制状态监控 <a class="header-anchor" href="#_2-2-1-复制状态监控" aria-label="Permalink to &quot;2.2.1 复制状态监控&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 查看主库复制状态</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    pid,</span></span>
<span class="line"><span class="__shiki_140thh">    application_name,</span></span>
<span class="line"><span class="__shiki_140thh">    client_addr,</span></span>
<span class="line"><span class="__shiki_140thh">    client_hostname,</span></span>
<span class="line"><span class="__shiki_140thh">    client_port,</span></span>
<span class="line"><span class="__shiki_140thh">    backend_start,</span></span>
<span class="line"><span class="__shiki_1itgoe">    state</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    sync_state,</span></span>
<span class="line"><span class="__shiki_140thh">    sent_lsn,</span></span>
<span class="line"><span class="__shiki_140thh">    write_lsn,</span></span>
<span class="line"><span class="__shiki_140thh">    flush_lsn,</span></span>
<span class="line"><span class="__shiki_140thh">    replay_lsn,</span></span>
<span class="line"><span class="__shiki_140thh">    write_lag,</span></span>
<span class="line"><span class="__shiki_140thh">    flush_lag,</span></span>
<span class="line"><span class="__shiki_140thh">    replay_lag,</span></span>
<span class="line"><span class="__shiki_140thh">    sync_priority,</span></span>
<span class="line"><span class="__shiki_140thh">    sync_state</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_replication</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> sync_state </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">, application_name;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 查看备库接收状态</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    pid,</span></span>
<span class="line"><span class="__shiki_1itgoe">    status</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    receive_start_lsn,</span></span>
<span class="line"><span class="__shiki_140thh">    received_tli,</span></span>
<span class="line"><span class="__shiki_140thh">    last_msg_send_time,</span></span>
<span class="line"><span class="__shiki_140thh">    last_msg_receipt_time,</span></span>
<span class="line"><span class="__shiki_140thh">    latest_end_lsn,</span></span>
<span class="line"><span class="__shiki_140thh">    latest_end_time,</span></span>
<span class="line"><span class="__shiki_140thh">    slot_name,</span></span>
<span class="line"><span class="__shiki_140thh">    sender_host,</span></span>
<span class="line"><span class="__shiki_140thh">    sender_port,</span></span>
<span class="line"><span class="__shiki_140thh">    conninfo</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_wal_receiver;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 查看WAL发送统计</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    pg_current_wal_lsn() </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> current_lsn,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_walfile_name(pg_current_wal_lsn()) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> current_wal_file,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_wal_lsn_diff(pg_current_wal_lsn(), </span><span class="__shiki_mdbnqw">&#39;0/0&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> total_wal_bytes,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_wal_lsn_diff(pg_current_wal_lsn(), </span><span class="__shiki_mdbnqw">&#39;0/0&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> total_wal_size;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 查看复制槽信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    slot_name,</span></span>
<span class="line"><span class="__shiki_140thh">    slot_type,</span></span>
<span class="line"><span class="__shiki_1itgoe">    database</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    active,</span></span>
<span class="line"><span class="__shiki_140thh">    active_pid,</span></span>
<span class="line"><span class="__shiki_140thh">    xmin,</span></span>
<span class="line"><span class="__shiki_140thh">    catalog_xmin,</span></span>
<span class="line"><span class="__shiki_140thh">    restart_lsn,</span></span>
<span class="line"><span class="__shiki_140thh">    confirmed_flush_lsn,</span></span>
<span class="line"><span class="__shiki_140thh">    wal_status,</span></span>
<span class="line"><span class="__shiki_140thh">    safe_wal_size</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_replication_slots;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 综合复制监控视图</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> VIEW</span><span class="__shiki_1t8gfj"> replication_monitor</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> replication_stats </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        application_name,</span></span>
<span class="line"><span class="__shiki_140thh">        client_addr,</span></span>
<span class="line"><span class="__shiki_1itgoe">        state</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        sync_state,</span></span>
<span class="line"><span class="__shiki_140thh">        sent_lsn,</span></span>
<span class="line"><span class="__shiki_140thh">        write_lsn,</span></span>
<span class="line"><span class="__shiki_140thh">        flush_lsn,</span></span>
<span class="line"><span class="__shiki_140thh">        replay_lsn,</span></span>
<span class="line"><span class="__shiki_140thh">        pg_wal_lsn_diff(sent_lsn, replay_lsn) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> replication_lag_bytes,</span></span>
<span class="line"><span class="__shiki_1itgoe">        CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> pg_wal_lsn_diff(sent_lsn, replay_lsn) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            THEN</span><span class="__shiki_140thh"> pg_size_pretty(pg_wal_lsn_diff(sent_lsn, replay_lsn))</span></span>
<span class="line"><span class="__shiki_1itgoe">            ELSE</span><span class="__shiki_mdbnqw"> &#39;0 bytes&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> replication_lag_size,</span></span>
<span class="line"><span class="__shiki_140thh">        write_lag,</span></span>
<span class="line"><span class="__shiki_140thh">        flush_lag,</span></span>
<span class="line"><span class="__shiki_140thh">        replay_lag</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_stat_replication</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    application_name,</span></span>
<span class="line"><span class="__shiki_140thh">    client_addr,</span></span>
<span class="line"><span class="__shiki_1itgoe">    state</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    sync_state,</span></span>
<span class="line"><span class="__shiki_140thh">    replication_lag_size,</span></span>
<span class="line"><span class="__shiki_140thh">    replication_lag_bytes,</span></span>
<span class="line"><span class="__shiki_140thh">    write_lag,</span></span>
<span class="line"><span class="__shiki_140thh">    flush_lag,</span></span>
<span class="line"><span class="__shiki_140thh">    replay_lag,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> sync_state </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;sync&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;quorum&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">THEN</span><span class="__shiki_mdbnqw"> &#39;同步复制&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_mdbnqw"> &#39;异步复制&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> replication_mode,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> replication_lag_bytes </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;警告: 延迟过高&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> replication_lag_bytes </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;注意: 延迟较高&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_mdbnqw"> &#39;正常&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> health_status</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> replication_stats</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> sync_state, replication_lag_bytes </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> replication_monitor;</span></span></code></pre></div><h4 id="_2-2-2-故障转移与切换" tabindex="-1">2.2.2 故障转移与切换 <a class="header-anchor" href="#_2-2-2-故障转移与切换" aria-label="Permalink to &quot;2.2.2 故障转移与切换&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 计划内切换（Switchover）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 步骤1: 在主库上提升备库为新的主库</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 在备库上执行</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> pg_promote();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 或使用触发文件</span></span>
<span class="line"><span class="__shiki_21nrsd">-- touch /tmp/promote_trigger</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 步骤2: 验证新主库状态</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> pg_is_in_recovery();</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 返回 false 表示现在是主库</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 步骤3: 重新配置旧主库作为新备库</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 在旧主库创建 recovery.conf 或修改配置</span></span>
<span class="line"><span class="__shiki_140thh">echo </span><span class="__shiki_mdbnqw">&quot;standby_mode = &#39;on&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">primary_conninfo = &#39;host=new_primary port=5432 user=replicator password=secret&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">restore_command = &#39;cp /var/lib/pgsql/archive/%f %p&#39;&quot;</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_140thh"> $PGDATA</span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb">recovery</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">conf</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 重启旧主库</span></span>
<span class="line"><span class="__shiki_140thh">pg_ctl </span><span class="__shiki_1itgoe">restart</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh">D $PGDATA</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 故障转移（Failover）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 当主库故障时，手动提升备库</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 在备库上执行</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> pg_promote(true, </span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">);  </span><span class="__shiki_21nrsd">-- 强制提升，等待60秒</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 使用pg_rewind重新同步旧主库</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 步骤1: 停止旧主库</span></span>
<span class="line"><span class="__shiki_140thh">pg_ctl </span><span class="__shiki_1itgoe">stop</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh">D $PGDATA</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 步骤2: 使用pg_rewind同步</span></span>
<span class="line"><span class="__shiki_140thh">pg_rewind </span><span class="__shiki_21nrsd">--target-pgdata=$PGDATA --source-server=&quot;host=new_primary port=5432 dbname=postgres&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 步骤3: 配置恢复</span></span>
<span class="line"><span class="__shiki_140thh">echo </span><span class="__shiki_mdbnqw">&quot;standby_mode = &#39;on&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">primary_conninfo = &#39;host=new_primary port=5432 user=replicator password=secret&#39;&quot;</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_140thh"> $PGDATA</span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb">recovery</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">conf</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 步骤4: 启动旧主库作为备库</span></span>
<span class="line"><span class="__shiki_140thh">pg_ctl </span><span class="__shiki_1itgoe">start</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh">D $PGDATA</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 时间点恢复（PITR）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 在备库配置恢复目标</span></span>
<span class="line"><span class="__shiki_21nrsd">-- recovery.conf 或 postgresql.auto.conf</span></span>
<span class="line"><span class="__shiki_140thh">recovery_target_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;2024-01-15 14:30:00&#39;</span></span>
<span class="line"><span class="__shiki_140thh">recovery_target_action </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;promote&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 或使用LSN</span></span>
<span class="line"><span class="__shiki_140thh">recovery_target_lsn </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;0/15000000&#39;</span></span>
<span class="line"><span class="__shiki_140thh">recovery_target_action </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;promote&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 自动化故障转移脚本示例</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> auto_failover_monitor</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> void </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    primary_status </span><span class="__shiki_1itgoe">boolean</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    standby_status </span><span class="__shiki_1itgoe">boolean</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    max_lag_allowed interval :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;5 minutes&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查主库是否存活</span></span>
<span class="line"><span class="__shiki_1itgoe">    BEGIN</span></span>
<span class="line"><span class="__shiki_140thh">        PERFORM dblink_connect(</span><span class="__shiki_mdbnqw">&#39;primary_conn&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;host=primary_host port=5432 dbname=postgres user=monitor password=secret&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        primary_status :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true;</span></span>
<span class="line"><span class="__shiki_140thh">        PERFORM dblink_disconnect(</span><span class="__shiki_mdbnqw">&#39;primary_conn&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    EXCEPTION</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> OTHERS </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_140thh">            primary_status :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> false;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 如果主库故障</span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_140thh"> primary_status </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 检查备库延迟</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> (replay_lag </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> max_lag_allowed) </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> standby_status</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_stat_wal_receiver;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        IF</span><span class="__shiki_140thh"> standby_status </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 执行故障转移</span></span>
<span class="line"><span class="__shiki_140thh">            PERFORM pg_promote();</span></span>
<span class="line"><span class="__shiki_140thh">            RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;故障转移已执行: %&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 发送通知</span></span>
<span class="line"><span class="__shiki_140thh">            PERFORM dblink_exec(</span><span class="__shiki_mdbnqw">&#39;host=monitor_host port=5432&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;INSERT INTO failover_events(event_time, action) VALUES (now(), &#39;&#39;自动故障转移&#39;&#39;)&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span></span>
<span class="line"><span class="__shiki_140thh">            RAISE WARNING </span><span class="__shiki_mdbnqw">&#39;备库延迟过高，不执行故障转移&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建定时任务（需要pg_cron扩展）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_dzsirb"> cron</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">schedule</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;failover-check&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;* * * * *&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">-- 每分钟执行</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;SELECT auto_failover_monitor()&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_2-3-流复制高级特性" tabindex="-1">2.3 流复制高级特性 <a class="header-anchor" href="#_2-3-流复制高级特性" aria-label="Permalink to &quot;2.3 流复制高级特性&quot;">​</a></h3><h4 id="_2-3-1-同步复制深度解析" tabindex="-1">2.3.1 同步复制深度解析 <a class="header-anchor" href="#_2-3-1-同步复制深度解析" aria-label="Permalink to &quot;2.3.1 同步复制深度解析&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 同步复制配置示例</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 主库配置</span></span>
<span class="line"><span class="__shiki_1itgoe">synchronous_commit</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> remote_write  </span><span class="__shiki_21nrsd">-- 或 on/remote_apply/local/off</span></span>
<span class="line"><span class="__shiki_140thh">synchronous_standby_names </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;FIRST 1 (standby1, standby2)&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 查看同步提交状态</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    setting,</span></span>
<span class="line"><span class="__shiki_140thh">    unit,</span></span>
<span class="line"><span class="__shiki_140thh">    short_desc</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_settings</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;synchronous%&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 同步复制监控</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    application_name,</span></span>
<span class="line"><span class="__shiki_140thh">    sync_state,</span></span>
<span class="line"><span class="__shiki_140thh">    sync_priority,</span></span>
<span class="line"><span class="__shiki_140thh">    sync_state </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;sync&#39;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> is_synchronous,</span></span>
<span class="line"><span class="__shiki_140thh">    write_lag,</span></span>
<span class="line"><span class="__shiki_140thh">    flush_lag,</span></span>
<span class="line"><span class="__shiki_140thh">    replay_lag</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_replication</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> sync_state </span><span class="__shiki_1itgoe">IS NOT NULL</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 同步复制超时处理</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 配置参数</span></span>
<span class="line"><span class="__shiki_140thh">wal_sender_timeout </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 60s            </span><span class="__shiki_21nrsd">-- WAL发送超时</span></span>
<span class="line"><span class="__shiki_140thh">synchronous_commit_timeout </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 30s    </span><span class="__shiki_21nrsd">-- 同步提交超时</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 同步复制故障处理</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 当同步备库故障时，PostgreSQL行为：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 如果 synchronous_standby_names 使用 &#39;FIRST n&#39;：继续等待其他备库</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 如果所有同步备库都故障：事务会阻塞直到超时</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 动态修改同步备库</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 无需重启，在线修改</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SYSTEM</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_140thh"> synchronous_standby_names </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;standby1&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> pg_reload_conf();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 7. 同步复制性能优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用 remote_write 而不是 on</span></span>
<span class="line"><span class="__shiki_1itgoe">synchronous_commit</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> remote_write</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 调整WAL相关参数</span></span>
<span class="line"><span class="__shiki_140thh">wal_buffers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 16MB</span></span>
<span class="line"><span class="__shiki_140thh">wal_writer_delay </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 200ms</span></span>
<span class="line"><span class="__shiki_140thh">wal_writer_flush_after </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 1MB</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 8. 同步复制与数据一致性级别</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">同步提交级别：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. off:           本地写入WAL缓冲区即返回</span></span>
<span class="line"><span class="__shiki_21nrsd">2. local:         本地写入WAL文件即返回</span></span>
<span class="line"><span class="__shiki_21nrsd">3. remote_write:  备库接收到WAL并写入缓冲区</span></span>
<span class="line"><span class="__shiki_21nrsd">4. on:            备库写入WAL文件（默认）</span></span>
<span class="line"><span class="__shiki_21nrsd">5. remote_apply:  备库应用WAL变更</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span></code></pre></div><h4 id="_2-3-2-复制槽管理" tabindex="-1">2.3.2 复制槽管理 <a class="header-anchor" href="#_2-3-2-复制槽管理" aria-label="Permalink to &quot;2.3.2 复制槽管理&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 创建复制槽（物理复制槽）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 用于确保WAL不被删除，直到备库接收</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_create_physical_replication_slot(</span><span class="__shiki_mdbnqw">&#39;standby1_slot&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 创建逻辑复制槽</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_create_logical_replication_slot(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;logical_slot&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;pgoutput&#39;</span><span class="__shiki_21nrsd">  -- 输出插件</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 查看复制槽信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    slot_name,</span></span>
<span class="line"><span class="__shiki_140thh">    slot_type,</span></span>
<span class="line"><span class="__shiki_140thh">    active,</span></span>
<span class="line"><span class="__shiki_140thh">    active_pid,</span></span>
<span class="line"><span class="__shiki_140thh">    xmin,</span></span>
<span class="line"><span class="__shiki_140thh">    catalog_xmin,</span></span>
<span class="line"><span class="__shiki_140thh">    restart_lsn,</span></span>
<span class="line"><span class="__shiki_140thh">    confirmed_flush_lsn,</span></span>
<span class="line"><span class="__shiki_140thh">    wal_status,</span></span>
<span class="line"><span class="__shiki_140thh">    safe_wal_size,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(safe_wal_size) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> safe_wal_size_pretty</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_replication_slots</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> slot_type, slot_name;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 监控复制槽使用情况</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> slot_info </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        slot_name,</span></span>
<span class="line"><span class="__shiki_140thh">        slot_type,</span></span>
<span class="line"><span class="__shiki_140thh">        restart_lsn,</span></span>
<span class="line"><span class="__shiki_140thh">        confirmed_flush_lsn,</span></span>
<span class="line"><span class="__shiki_140thh">        pg_wal_lsn_diff(pg_current_wal_lsn(), restart_lsn) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> wal_behind,</span></span>
<span class="line"><span class="__shiki_140thh">        pg_size_pretty(pg_wal_lsn_diff(pg_current_wal_lsn(), restart_lsn)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> wal_behind_pretty</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_replication_slots</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> active</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    slot_name,</span></span>
<span class="line"><span class="__shiki_140thh">    slot_type,</span></span>
<span class="line"><span class="__shiki_140thh">    wal_behind_pretty,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> wal_behind </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;警告: 落后超过10GB&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> wal_behind </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;注意: 落后超过1GB&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_mdbnqw"> &#39;正常&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_1itgoe"> status</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> slot_info</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> wal_behind </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 复制槽维护</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 更新复制槽位置（逻辑复制）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> pg_replication_slot_advance(</span><span class="__shiki_mdbnqw">&#39;logical_slot&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;0/3000000&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 删除复制槽</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> pg_drop_replication_slot(</span><span class="__shiki_mdbnqw">&#39;standby1_slot&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 复制槽与WAL保留</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看需要保留的WAL</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    slot_name,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_wal_lsn_diff(restart_lsn, </span><span class="__shiki_mdbnqw">&#39;0/0&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> restart_lsn_bytes,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_wal_lsn_diff(pg_current_wal_lsn(), restart_lsn)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> wal_retained</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_replication_slots</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> active;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 7. 防止复制槽导致的WAL膨胀</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 监控脚本</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> monitor_replication_slots</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    slot_name </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    slot_type </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    wal_retained_size </span><span class="__shiki_1itgoe">bigint</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    wal_retained_pretty </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    status</span><span class="__shiki_1itgoe"> text</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        rs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">slot_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        rs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">slot_type</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        pg_wal_lsn_diff(pg_current_wal_lsn(), </span><span class="__shiki_dzsirb">rs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">restart_lsn</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> wal_retained_size,</span></span>
<span class="line"><span class="__shiki_140thh">        pg_size_pretty(pg_wal_lsn_diff(pg_current_wal_lsn(), </span><span class="__shiki_dzsirb">rs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">restart_lsn</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> wal_retained_pretty,</span></span>
<span class="line"><span class="__shiki_1itgoe">        CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_dzsirb"> rs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">active</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_140thh"> age(</span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">coalesce</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">stat</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">backend_start</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;1 year&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;1 hour&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;不活跃&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> pg_wal_lsn_diff(pg_current_wal_lsn(), </span><span class="__shiki_dzsirb">rs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">restart_lsn</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;警告: 保留WAL过多&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            ELSE</span><span class="__shiki_mdbnqw"> &#39;正常&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_1itgoe"> status</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_replication_slots rs</span></span>
<span class="line"><span class="__shiki_1itgoe">    LEFT JOIN</span><span class="__shiki_140thh"> pg_stat_activity stat </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> rs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">active_pid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> stat</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span></span>
<span class="line"><span class="__shiki_1itgoe">    ORDER BY</span><span class="__shiki_140thh"> pg_wal_lsn_diff(pg_current_wal_lsn(), </span><span class="__shiki_dzsirb">rs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">restart_lsn</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 8. 自动化清理不活跃的复制槽</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> cleanup_inactive_slots()</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql</span></span>
<span class="line"><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    slot_record RECORD;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> slot_record </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> slot_name</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_replication_slots</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_140thh"> active</span></span>
<span class="line"><span class="__shiki_1itgoe">          AND</span><span class="__shiki_140thh"> age(</span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">(), (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> backend_start </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_activity </span></span>
<span class="line"><span class="__shiki_1itgoe">                         WHERE</span><span class="__shiki_140thh"> pid </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> active_pid)) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;1 hour&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_140thh">        RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;删除不活跃复制槽: %&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">slot_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">slot_name</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;SELECT pg_drop_replication_slot(%L)&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">slot_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">slot_name</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$;</span></span></code></pre></div><h2 id="三、逻辑复制深度解析" tabindex="-1">三、逻辑复制深度解析 <a class="header-anchor" href="#三、逻辑复制深度解析" aria-label="Permalink to &quot;三、逻辑复制深度解析&quot;">​</a></h2><h3 id="_3-1-逻辑复制基础配置" tabindex="-1">3.1 逻辑复制基础配置 <a class="header-anchor" href="#_3-1-逻辑复制基础配置" aria-label="Permalink to &quot;3.1 逻辑复制基础配置&quot;">​</a></h3><h4 id="_3-1-1-逻辑复制基本设置" tabindex="-1">3.1.1 逻辑复制基本设置 <a class="header-anchor" href="#_3-1-1-逻辑复制基本设置" aria-label="Permalink to &quot;3.1.1 逻辑复制基本设置&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 发布者（Publisher）配置</span></span>
<span class="line"><span class="__shiki_21nrsd">-- postgresql.conf</span></span>
<span class="line"><span class="__shiki_140thh">wal_level </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> logical                    </span><span class="__shiki_21nrsd">-- 必须设置为logical</span></span>
<span class="line"><span class="__shiki_140thh">max_replication_slots </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_21nrsd">             -- 逻辑复制需要复制槽</span></span>
<span class="line"><span class="__shiki_140thh">max_wal_senders </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_21nrsd">                   -- WAL发送进程</span></span>
<span class="line"><span class="__shiki_140thh">max_worker_processes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 8</span><span class="__shiki_21nrsd">               -- 工作进程</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 逻辑复制专用参数</span></span>
<span class="line"><span class="__shiki_140thh">max_logical_replication_workers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_21nrsd">    -- 逻辑复制工作进程</span></span>
<span class="line"><span class="__shiki_140thh">max_sync_workers_per_subscription </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_21nrsd">  -- 每个订阅的同步工作进程</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建发布者用户</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> USER</span><span class="__shiki_1t8gfj"> logical_repl</span><span class="__shiki_1itgoe"> WITH</span><span class="__shiki_140thh"> REPLICATION </span><span class="__shiki_1itgoe">LOGIN</span><span class="__shiki_1itgoe"> PASSWORD</span><span class="__shiki_mdbnqw"> &#39;secret&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">GRANT</span><span class="__shiki_1itgoe"> CONNECT</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_1itgoe"> DATABASE</span><span class="__shiki_140thh"> mydb </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> logical_repl;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 创建测试表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> public</span><span class="__shiki_140thh">.employees (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_1itgoe"> VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    department </span><span class="__shiki_1itgoe">VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    salary </span><span class="__shiki_1itgoe">DECIMAL</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    updated_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> public</span><span class="__shiki_140thh">.departments (</span></span>
<span class="line"><span class="__shiki_140thh">    dept_id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    dept_name </span><span class="__shiki_1itgoe">VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 创建发布（Publication）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建单个表发布</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> PUBLICATION emp_pub </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_dzsirb"> public</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">employees</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建多个表发布</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> PUBLICATION all_tables_pub </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_140thh"> ALL TABLES;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建带过滤条件的发布（PostgreSQL 15+）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> PUBLICATION filtered_pub </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_dzsirb"> public</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">employees</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> (salary </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 50000</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看发布信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    pubname,</span></span>
<span class="line"><span class="__shiki_140thh">    puballtables,</span></span>
<span class="line"><span class="__shiki_140thh">    pubinsert,</span></span>
<span class="line"><span class="__shiki_140thh">    pubupdate,</span></span>
<span class="line"><span class="__shiki_140thh">    pubdelete,</span></span>
<span class="line"><span class="__shiki_140thh">    pubtruncate</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_publication;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    pubname,</span></span>
<span class="line"><span class="__shiki_140thh">    schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">    tablename</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_publication_tables</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> pubname, schemaname, tablename;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 订阅者（Subscriber）配置</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建相同结构的表（DDL不会自动复制）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> public</span><span class="__shiki_140thh">.employees (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_1itgoe"> VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    department </span><span class="__shiki_1itgoe">VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    salary </span><span class="__shiki_1itgoe">DECIMAL</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    updated_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> public</span><span class="__shiki_140thh">.departments (</span></span>
<span class="line"><span class="__shiki_140thh">    dept_id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    dept_name </span><span class="__shiki_1itgoe">VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 创建订阅（Subscription）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> SUBSCRIPTION emp_sub</span></span>
<span class="line"><span class="__shiki_1itgoe">CONNECTION</span><span class="__shiki_mdbnqw"> &#39;host=publisher_host port=5432 dbname=mydb user=logical_repl password=secret&#39;</span></span>
<span class="line"><span class="__shiki_140thh">PUBLICATION emp_pub</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    copy_data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true,                  </span><span class="__shiki_21nrsd">-- 初始数据复制</span></span>
<span class="line"><span class="__shiki_140thh">    create_slot </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true,                </span><span class="__shiki_21nrsd">-- 自动创建复制槽</span></span>
<span class="line"><span class="__shiki_1itgoe">    enabled</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> true,                    </span><span class="__shiki_21nrsd">-- 启用订阅</span></span>
<span class="line"><span class="__shiki_1itgoe">    connect</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> true,                    </span><span class="__shiki_21nrsd">-- 立即连接</span></span>
<span class="line"><span class="__shiki_140thh">    slot_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;emp_sub_slot&#39;</span><span class="__shiki_21nrsd">         -- 复制槽名称（可选）</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看订阅信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    subname,</span></span>
<span class="line"><span class="__shiki_140thh">    subenabled,</span></span>
<span class="line"><span class="__shiki_140thh">    subconninfo,</span></span>
<span class="line"><span class="__shiki_140thh">    subslotname,</span></span>
<span class="line"><span class="__shiki_140thh">    subsynccommit,</span></span>
<span class="line"><span class="__shiki_140thh">    subpublications</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_subscription;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    srsubid,</span></span>
<span class="line"><span class="__shiki_140thh">    srrelid::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> table_name,</span></span>
<span class="line"><span class="__shiki_140thh">    srsubstate,</span></span>
<span class="line"><span class="__shiki_140thh">    srsublsn</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_subscription_rel;</span></span></code></pre></div><h4 id="_3-1-2-逻辑复制高级配置" tabindex="-1">3.1.2 逻辑复制高级配置 <a class="header-anchor" href="#_3-1-2-逻辑复制高级配置" aria-label="Permalink to &quot;3.1.2 逻辑复制高级配置&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 并行逻辑复制（PostgreSQL 13+）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 发布者配置</span></span>
<span class="line"><span class="__shiki_140thh">max_logical_replication_workers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 8</span></span>
<span class="line"><span class="__shiki_140thh">max_parallel_apply_workers_per_subscription </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 订阅者配置</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_140thh"> SUBSCRIPTION emp_sub </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> (parallel </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 流式逻辑复制（PostgreSQL 14+）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 允许在事务提交前流式传输更改</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SYSTEM</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_140thh"> logical_decoding_work_mem </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;64MB&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> pg_reload_conf();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 在创建订阅时启用流式</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> SUBSCRIPTION streaming_sub</span></span>
<span class="line"><span class="__shiki_1itgoe">CONNECTION</span><span class="__shiki_mdbnqw"> &#39;host=publisher_host port=5432 dbname=mydb user=logical_repl password=secret&#39;</span></span>
<span class="line"><span class="__shiki_140thh">PUBLICATION all_tables_pub</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    streaming </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> parallel,              </span><span class="__shiki_21nrsd">-- 并行流式传输</span></span>
<span class="line"><span class="__shiki_1itgoe">    binary</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> true                      </span><span class="__shiki_21nrsd">-- 二进制传输（性能更好）</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 冲突处理配置</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 订阅者配置冲突解决策略</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_140thh"> SUBSCRIPTION emp_sub </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    conflict_resolution </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;error&#39;</span><span class="__shiki_21nrsd">      -- 或 &#39;apply_remote&#39;, &#39;keep_local&#39;, &#39;nothing&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 性能优化参数</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 发布者</span></span>
<span class="line"><span class="__shiki_140thh">wal_sender_timeout </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 60s</span></span>
<span class="line"><span class="__shiki_140thh">wal_receiver_timeout </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 60s</span></span>
<span class="line"><span class="__shiki_140thh">max_replication_slots </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 20</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 订阅者</span></span>
<span class="line"><span class="__shiki_140thh">logical_replication_work_mem </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 64MB</span></span>
<span class="line"><span class="__shiki_140thh">maintenance_work_mem </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 1GB</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 安全配置</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用SSL连接</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> SUBSCRIPTION secure_sub</span></span>
<span class="line"><span class="__shiki_1itgoe">CONNECTION</span><span class="__shiki_mdbnqw"> &#39;host=publisher_host port=5432 dbname=mydb user=logical_repl password=secret sslmode=require&#39;</span></span>
<span class="line"><span class="__shiki_140thh">PUBLICATION emp_pub;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 网络优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 调整TCP参数</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_140thh"> SUBSCRIPTION emp_sub </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    min_apply_delay </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;0&#39;</span><span class="__shiki_140thh">,             </span><span class="__shiki_21nrsd">-- 无延迟</span></span>
<span class="line"><span class="__shiki_140thh">    max_apply_delay </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;10s&#39;</span><span class="__shiki_21nrsd">            -- 最大延迟</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 7. 监控和诊断</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 启用详细日志</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SYSTEM</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_140thh"> log_replication_commands </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SYSTEM</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_140thh"> debug_logical_replication </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> pg_reload_conf();</span></span></code></pre></div><h3 id="_3-2-逻辑复制监控与管理" tabindex="-1">3.2 逻辑复制监控与管理 <a class="header-anchor" href="#_3-2-逻辑复制监控与管理" aria-label="Permalink to &quot;3.2 逻辑复制监控与管理&quot;">​</a></h3><h4 id="_3-2-1-逻辑复制状态监控" tabindex="-1">3.2.1 逻辑复制状态监控 <a class="header-anchor" href="#_3-2-1-逻辑复制状态监控" aria-label="Permalink to &quot;3.2.1 逻辑复制状态监控&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 查看逻辑复制工作进程状态</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    pid,</span></span>
<span class="line"><span class="__shiki_140thh">    usename,</span></span>
<span class="line"><span class="__shiki_140thh">    application_name,</span></span>
<span class="line"><span class="__shiki_140thh">    client_addr,</span></span>
<span class="line"><span class="__shiki_140thh">    backend_start,</span></span>
<span class="line"><span class="__shiki_1itgoe">    state</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    sent_lsn,</span></span>
<span class="line"><span class="__shiki_140thh">    write_lsn,</span></span>
<span class="line"><span class="__shiki_140thh">    flush_lsn,</span></span>
<span class="line"><span class="__shiki_140thh">    replay_lsn,</span></span>
<span class="line"><span class="__shiki_140thh">    sync_state</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_replication</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> application_name </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%logical%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">   OR</span><span class="__shiki_140thh"> application_name </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%subscription%&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 查看逻辑复制槽状态</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    slot_name,</span></span>
<span class="line"><span class="__shiki_140thh">    slot_type,</span></span>
<span class="line"><span class="__shiki_1itgoe">    database</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    active,</span></span>
<span class="line"><span class="__shiki_140thh">    active_pid,</span></span>
<span class="line"><span class="__shiki_140thh">    xmin,</span></span>
<span class="line"><span class="__shiki_140thh">    catalog_xmin,</span></span>
<span class="line"><span class="__shiki_140thh">    restart_lsn,</span></span>
<span class="line"><span class="__shiki_140thh">    confirmed_flush_lsn,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_wal_lsn_diff(pg_current_wal_lsn(), confirmed_flush_lsn) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> lag_bytes,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_wal_lsn_diff(pg_current_wal_lsn(), confirmed_flush_lsn)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> lag_size</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_replication_slots</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> slot_type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;logical&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> lag_bytes </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 查看订阅状态</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">subname</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> subscription_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">    s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">subenabled</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_1itgoe"> enabled</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">subconninfo</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> connection_info,</span></span>
<span class="line"><span class="__shiki_dzsirb">    sr</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srrelid</span><span class="__shiki_140thh">::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> table_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">    sr</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srsubstate</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_1itgoe"> state</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_dzsirb"> sr</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srsubstate</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;i&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;初始化&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;d&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;数据复制中&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;s&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;已同步&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;r&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;准备好&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_mdbnqw"> &#39;未知&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> state_description,</span></span>
<span class="line"><span class="__shiki_dzsirb">    sr</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srsublsn</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> last_applied_lsn</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_subscription s</span></span>
<span class="line"><span class="__shiki_1itgoe">LEFT JOIN</span><span class="__shiki_140thh"> pg_subscription_rel sr </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> sr</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srsubid</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">subname</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">sr</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srrelid</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 逻辑复制延迟监控</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> logical_stats </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        application_name,</span></span>
<span class="line"><span class="__shiki_140thh">        sent_lsn,</span></span>
<span class="line"><span class="__shiki_140thh">        write_lsn,</span></span>
<span class="line"><span class="__shiki_140thh">        flush_lsn,</span></span>
<span class="line"><span class="__shiki_140thh">        replay_lsn,</span></span>
<span class="line"><span class="__shiki_140thh">        pg_wal_lsn_diff(sent_lsn, replay_lsn) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> logical_lag_bytes,</span></span>
<span class="line"><span class="__shiki_140thh">        pg_wal_lsn_diff(sent_lsn, replay_lsn) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> logical_lag_mb</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_stat_replication</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> slot_type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;logical&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    application_name,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(logical_lag_bytes) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> logical_lag,</span></span>
<span class="line"><span class="__shiki_140thh">    logical_lag_mb,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> logical_lag_mb </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;警告: 延迟超过1GB&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> logical_lag_mb </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;注意: 延迟超过100MB&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_mdbnqw"> &#39;正常&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_1itgoe"> status</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> logical_stats</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> logical_lag_bytes </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 逻辑复制吞吐量监控</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    pid,</span></span>
<span class="line"><span class="__shiki_140thh">    application_name,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_wal_lsn_diff(sent_lsn, </span><span class="__shiki_mdbnqw">&#39;0/0&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> total_sent,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_wal_lsn_diff(replay_lsn, </span><span class="__shiki_mdbnqw">&#39;0/0&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> total_applied,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROUND</span><span class="__shiki_140thh">(EXTRACT(EPOCH </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> backend_start))::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> uptime_seconds,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROUND</span><span class="__shiki_140thh">((pg_wal_lsn_diff(sent_lsn, </span><span class="__shiki_mdbnqw">&#39;0/0&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">          NULLIF</span><span class="__shiki_140thh">(EXTRACT(EPOCH </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> backend_start)), </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> avg_mbps</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_replication</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> slot_type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;logical&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 创建综合监控视图</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> VIEW</span><span class="__shiki_1t8gfj"> logical_replication_monitor</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 订阅信息</span></span>
<span class="line"><span class="__shiki_dzsirb">    s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">subname</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> subscription_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">    s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">subenabled</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_1itgoe"> enabled</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 表信息</span></span>
<span class="line"><span class="__shiki_dzsirb">    sr</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srrelid</span><span class="__shiki_140thh">::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> table_name,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_dzsirb"> sr</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srsubstate</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;i&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;初始化&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;d&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;数据复制中&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;s&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;已同步&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;r&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;准备好&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_mdbnqw"> &#39;未知&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> table_state,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 复制状态</span></span>
<span class="line"><span class="__shiki_dzsirb">    r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">application_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">client_addr</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">state</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">sync_state</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 延迟信息</span></span>
<span class="line"><span class="__shiki_140thh">    pg_wal_lsn_diff(</span><span class="__shiki_dzsirb">r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">sent_lsn</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">replay_lsn</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> lag_bytes,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_wal_lsn_diff(</span><span class="__shiki_dzsirb">r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">sent_lsn</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">replay_lsn</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> lag_pretty,</span></span>
<span class="line"><span class="__shiki_dzsirb">    r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">write_lag</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">flush_lag</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">replay_lag</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 性能指标</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROUND</span><span class="__shiki_140thh">((pg_wal_lsn_diff(</span><span class="__shiki_dzsirb">r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">sent_lsn</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;0/0&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">          NULLIF</span><span class="__shiki_140thh">(EXTRACT(EPOCH </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">backend_start</span><span class="__shiki_140thh">)), </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> throughput_mbps,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 健康状态</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> pg_wal_lsn_diff(</span><span class="__shiki_dzsirb">r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">sent_lsn</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">replay_lsn</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;警告: 高延迟&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> sr</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srsubstate</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;s&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;r&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">THEN</span><span class="__shiki_mdbnqw"> &#39;注意: 同步中&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_mdbnqw"> &#39;健康&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> health_status</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_subscription s</span></span>
<span class="line"><span class="__shiki_1itgoe">LEFT JOIN</span><span class="__shiki_140thh"> pg_subscription_rel sr </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> sr</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srsubid</span></span>
<span class="line"><span class="__shiki_1itgoe">LEFT JOIN</span><span class="__shiki_140thh"> pg_stat_replication r </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">application_name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">subname</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">subenabled</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">subname</span><span class="__shiki_140thh">, lag_bytes </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_1itgoe"> NULLS</span><span class="__shiki_1itgoe"> LAST</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> logical_replication_monitor;</span></span></code></pre></div><h4 id="_3-2-2-逻辑复制冲突检测与处理" tabindex="-1">3.2.2 逻辑复制冲突检测与处理 <a class="header-anchor" href="#_3-2-2-逻辑复制冲突检测与处理" aria-label="Permalink to &quot;3.2.2 逻辑复制冲突检测与处理&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 创建冲突监控表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> logical_replication_conflicts</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    conflict_id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    conflict_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    subscription_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    table_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    conflict_type </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    conflict_details JSONB,</span></span>
<span class="line"><span class="__shiki_140thh">    resolved </span><span class="__shiki_1itgoe">BOOLEAN</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_140thh"> false,</span></span>
<span class="line"><span class="__shiki_140thh">    resolved_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    resolution_action </span><span class="__shiki_1itgoe">TEXT</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 冲突检测函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> detect_logical_conflicts</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    subscription_name </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    table_name </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    conflict_count </span><span class="__shiki_1itgoe">bigint</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    last_conflict_time </span><span class="__shiki_1itgoe">timestamp</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">subname</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relname</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> conflict_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">        MAX</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">lrc</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">conflict_time</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> last_conflict</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_subscription s</span></span>
<span class="line"><span class="__shiki_1itgoe">    CROSS JOIN</span><span class="__shiki_140thh"> pg_class c</span></span>
<span class="line"><span class="__shiki_1itgoe">    LEFT JOIN</span><span class="__shiki_140thh"> logical_replication_conflicts lrc </span></span>
<span class="line"><span class="__shiki_1itgoe">        ON</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">subname</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> lrc</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">subscription_name</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        AND</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relname</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> lrc</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">table_name</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relkind</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;r&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        AND</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_subscription_rel sr</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHERE</span><span class="__shiki_dzsirb"> sr</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srsubid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            AND</span><span class="__shiki_dzsirb"> sr</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srrelid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_1itgoe">        AND</span><span class="__shiki_dzsirb"> lrc</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">resolved</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> false</span></span>
<span class="line"><span class="__shiki_1itgoe">    GROUP BY</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">subname</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relname</span></span>
<span class="line"><span class="__shiki_1itgoe">    HAVING</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">    ORDER BY</span><span class="__shiki_140thh"> conflict_count </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 常见冲突类型及处理</span></span>
<span class="line"><span class="__shiki_21nrsd">-- a) 唯一约束冲突</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 示例：订阅者表中已存在相同主键的记录</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">处理方案：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. 删除订阅者的冲突记录</span></span>
<span class="line"><span class="__shiki_21nrsd">2. 跳过冲突（使用冲突解决策略）</span></span>
<span class="line"><span class="__shiki_21nrsd">3. 合并数据</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- b) 外键约束冲突</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 示例：插入的记录引用不存在的父表记录</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">处理方案：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. 先确保父表记录存在</span></span>
<span class="line"><span class="__shiki_21nrsd">2. 禁用外键约束（谨慎使用）</span></span>
<span class="line"><span class="__shiki_21nrsd">3. 调整复制顺序</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- c) 数据类型不匹配</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 示例：发布者和订阅者表结构不一致</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">处理方案：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. 同步表结构</span></span>
<span class="line"><span class="__shiki_21nrsd">2. 使用CAST转换数据类型</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 冲突解决策略配置</span></span>
<span class="line"><span class="__shiki_21nrsd">-- a) 使用冲突解决参数</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_140thh"> SUBSCRIPTION emp_sub </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    conflict_resolution </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;apply_remote&#39;</span><span class="__shiki_21nrsd">  -- 应用远程变更</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 可选值：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- &#39;error&#39;: 产生错误并停止复制（默认）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- &#39;apply_remote&#39;: 应用远程变更</span></span>
<span class="line"><span class="__shiki_21nrsd">-- &#39;keep_local&#39;: 保留本地变更</span></span>
<span class="line"><span class="__shiki_21nrsd">-- &#39;nothing&#39;: 跳过冲突，不做任何操作</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- b) 自定义冲突解决函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> resolve_replication_conflict</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> trigger </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 记录冲突</span></span>
<span class="line"><span class="__shiki_1itgoe">    INSERT INTO</span><span class="__shiki_140thh"> logical_replication_conflicts (</span></span>
<span class="line"><span class="__shiki_140thh">        subscription_name,</span></span>
<span class="line"><span class="__shiki_140thh">        table_name,</span></span>
<span class="line"><span class="__shiki_140thh">        conflict_type,</span></span>
<span class="line"><span class="__shiki_140thh">        conflict_details</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">        TG_ARGV[0],  </span><span class="__shiki_21nrsd">-- 订阅名称</span></span>
<span class="line"><span class="__shiki_140thh">        TG_TABLE_NAME,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;unique_violation&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;old&#39;</span><span class="__shiki_140thh">, OLD,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;new&#39;</span><span class="__shiki_140thh">, NEW</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 应用远程变更（覆盖本地）</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> NEW;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 为表创建冲突解决触发器</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TRIGGER</span><span class="__shiki_1t8gfj"> resolve_emp_conflict</span></span>
<span class="line"><span class="__shiki_1itgoe">BEFORE</span><span class="__shiki_1itgoe"> INSERT</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> UPDATE</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> employees</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_140thh"> EACH </span><span class="__shiki_1itgoe">ROW</span></span>
<span class="line"><span class="__shiki_1itgoe">EXECUTE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_140thh"> resolve_replication_conflict(</span><span class="__shiki_mdbnqw">&#39;emp_sub&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 手动处理冲突</span></span>
<span class="line"><span class="__shiki_21nrsd">-- a) 查看未解决的冲突</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> logical_replication_conflicts</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> resolved </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> false</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> conflict_time </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- b) 手动跳过冲突</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看复制槽的冲突LSN</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    slot_name,</span></span>
<span class="line"><span class="__shiki_140thh">    confirmed_flush_lsn,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_current_wal_lsn()</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_replication_slots</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> slot_type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;logical&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 前进复制槽位置（跳过冲突）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> pg_replication_slot_advance(</span><span class="__shiki_mdbnqw">&#39;emp_sub_slot&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;0/3500000&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- c) 重新同步表</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 步骤1: 停止订阅对该表的复制</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_140thh"> SUBSCRIPTION emp_sub </span><span class="__shiki_1itgoe">DISABLE</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 步骤2: 在订阅者上清空表</span></span>
<span class="line"><span class="__shiki_1itgoe">TRUNCATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> employees;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 步骤3: 重新启用订阅并复制数据</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_140thh"> SUBSCRIPTION emp_sub </span><span class="__shiki_1itgoe">ENABLE</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_140thh"> SUBSCRIPTION emp_sub REFRESH PUBLICATION;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 预防冲突的最佳实践</span></span>
<span class="line"><span class="__shiki_21nrsd">-- a) 确保表结构一致</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> compare_table_structures</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    table_name </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    publisher_columns </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    subscriber_columns </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    match_status </span><span class="__shiki_1itgoe">text</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    conn_str </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;host=publisher_host port=5432 dbname=mydb user=monitor password=secret&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        t</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">tablename</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        t</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">columns</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> publisher_columns,</span></span>
<span class="line"><span class="__shiki_dzsirb">        s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">columns</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> subscriber_columns,</span></span>
<span class="line"><span class="__shiki_1itgoe">        CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_dzsirb"> t</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">columns</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">columns</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;匹配&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            ELSE</span><span class="__shiki_mdbnqw"> &#39;不匹配&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> match_status</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> dblink(conn_str, </span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">            table_name,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            string_agg(column_name || &#39;&#39; &#39;&#39; || data_type, &#39;&#39;, &#39;&#39; ORDER BY ordinal_position) AS columns</span></span>
<span class="line"><span class="__shiki_mdbnqw">        FROM information_schema.columns</span></span>
<span class="line"><span class="__shiki_mdbnqw">        WHERE table_schema = &#39;&#39;public&#39;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        GROUP BY table_name</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> t(tablename </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">, columns </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    FULL JOIN</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            table_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">            string_agg</span><span class="__shiki_140thh">(column_name </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;&#39;</span><span class="__shiki_mdbnqw"> &#39;&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> data_type, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_1itgoe"> ORDER BY</span><span class="__shiki_140thh"> ordinal_position) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> columns</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_dzsirb"> information_schema</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">columns</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> table_schema </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;&#39;</span><span class="__shiki_140thh">public</span><span class="__shiki_mdbnqw">&#39;&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        GROUP BY</span><span class="__shiki_140thh"> table_name</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> s </span><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> (tablename)</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_dzsirb"> t</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">columns</span><span class="__shiki_1itgoe"> !=</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">columns</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">       OR</span><span class="__shiki_dzsirb"> t</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">columns</span><span class="__shiki_1itgoe"> IS</span><span class="__shiki_1itgoe"> NULL</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">       OR</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">columns</span><span class="__shiki_1itgoe"> IS</span><span class="__shiki_1itgoe"> NULL</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- b) 使用冲突避免模式</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 为表添加冲突避免列</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> employees </span><span class="__shiki_1itgoe">ADD</span><span class="__shiki_140thh"> COLUMN last_updated_source </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_mdbnqw"> &#39;publisher&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> employees </span><span class="__shiki_1itgoe">ADD</span><span class="__shiki_140thh"> COLUMN last_updated_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 在触发器或应用中设置来源</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> set_update_source</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> trigger </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_dzsirb">    NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">last_updated_source</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;local&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">last_updated_at</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> NEW;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- c) 实施数据分区策略</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 不同订阅者复制不同的数据分区</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> PUBLICATION pub_region_east </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> employees</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> (region </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;east&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> PUBLICATION pub_region_west </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> employees</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> (region </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;west&#39;</span><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_3-3-逻辑复制高级应用场景" tabindex="-1">3.3 逻辑复制高级应用场景 <a class="header-anchor" href="#_3-3-逻辑复制高级应用场景" aria-label="Permalink to &quot;3.3 逻辑复制高级应用场景&quot;">​</a></h3><h4 id="_3-3-1-数据分发与汇聚" tabindex="-1">3.3.1 数据分发与汇聚 <a class="header-anchor" href="#_3-3-1-数据分发与汇聚" aria-label="Permalink to &quot;3.3.1 数据分发与汇聚&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 星型拓扑：一个发布者，多个订阅者</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 发布者配置（数据中心）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> PUBLICATION central_pub </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_140thh"> ALL TABLES;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 订阅者1（区域数据中心）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> SUBSCRIPTION region_east_sub</span></span>
<span class="line"><span class="__shiki_1itgoe">CONNECTION</span><span class="__shiki_mdbnqw"> &#39;host=central_host port=5432 dbname=central_db&#39;</span></span>
<span class="line"><span class="__shiki_140thh">PUBLICATION central_pub</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (copy_data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 订阅者2（区域数据中心）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> SUBSCRIPTION region_west_sub</span></span>
<span class="line"><span class="__shiki_1itgoe">CONNECTION</span><span class="__shiki_mdbnqw"> &#39;host=central_host port=5432 dbname=central_db&#39;</span></span>
<span class="line"><span class="__shiki_140thh">PUBLICATION central_pub</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (copy_data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 双向复制（需要谨慎处理冲突）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 数据库A（作为发布者和订阅者）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 配置发布</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> PUBLICATION pub_from_a </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> shared_table;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 配置订阅</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> SUBSCRIPTION sub_to_b</span></span>
<span class="line"><span class="__shiki_1itgoe">CONNECTION</span><span class="__shiki_mdbnqw"> &#39;host=db_b port=5432 dbname=mydb&#39;</span></span>
<span class="line"><span class="__shiki_140thh">PUBLICATION pub_from_b</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    conflict_resolution </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;last_update_wins&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    create_slot </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> false  </span><span class="__shiki_21nrsd">-- 避免复制槽冲突</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 数据库B（类似配置）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> PUBLICATION pub_from_b </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> shared_table;</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> SUBSCRIPTION sub_to_a</span></span>
<span class="line"><span class="__shiki_1itgoe">CONNECTION</span><span class="__shiki_mdbnqw"> &#39;host=db_a port=5432 dbname=mydb&#39;</span></span>
<span class="line"><span class="__shiki_140thh">PUBLICATION pub_from_a;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 数据汇聚：多个发布者到一个订阅者</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 订阅者数据库配置多个订阅</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> SUBSCRIPTION sub_from_source1</span></span>
<span class="line"><span class="__shiki_1itgoe">CONNECTION</span><span class="__shiki_mdbnqw"> &#39;host=source1 port=5432 dbname=source1_db&#39;</span></span>
<span class="line"><span class="__shiki_140thh">PUBLICATION source1_pub;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> SUBSCRIPTION sub_from_source2</span></span>
<span class="line"><span class="__shiki_1itgoe">CONNECTION</span><span class="__shiki_mdbnqw"> &#39;host=source2 port=5432 dbname=source2_db&#39;</span></span>
<span class="line"><span class="__shiki_140thh">PUBLICATION source2_pub;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 级联逻辑复制</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 主发布者 → 中间订阅者/发布者 → 最终订阅者</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 中间数据库配置</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 作为订阅者</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> SUBSCRIPTION sub_from_primary</span></span>
<span class="line"><span class="__shiki_1itgoe">CONNECTION</span><span class="__shiki_mdbnqw"> &#39;host=primary port=5432 dbname=primary_db&#39;</span></span>
<span class="line"><span class="__shiki_140thh">PUBLICATION primary_pub;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 作为发布者</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> PUBLICATION middle_pub </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_140thh"> ALL TABLES;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 最终订阅者</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> SUBSCRIPTION sub_from_middle</span></span>
<span class="line"><span class="__shiki_1itgoe">CONNECTION</span><span class="__shiki_mdbnqw"> &#39;host=middle port=5432 dbname=middle_db&#39;</span></span>
<span class="line"><span class="__shiki_140thh">PUBLICATION middle_pub;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 数据分片复制</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 基于业务规则分发数据到不同订阅者</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 发布者创建过滤发布</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> PUBLICATION pub_shard1 </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> orders</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> (customer_id % </span><span class="__shiki_dzsirb">4</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> PUBLICATION pub_shard2 </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> orders</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> (customer_id % </span><span class="__shiki_dzsirb">4</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> PUBLICATION pub_shard3 </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> orders</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> (customer_id % </span><span class="__shiki_dzsirb">4</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> PUBLICATION pub_shard4 </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> orders</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> (customer_id % </span><span class="__shiki_dzsirb">4</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 每个分片订阅者连接到对应的发布</span></span></code></pre></div><h4 id="_3-3-2-逻辑复制与数据迁移" tabindex="-1">3.3.2 逻辑复制与数据迁移 <a class="header-anchor" href="#_3-3-2-逻辑复制与数据迁移" aria-label="Permalink to &quot;3.3.2 逻辑复制与数据迁移&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 零停机数据库升级</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 步骤1: 在新版本数据库创建逻辑复制订阅</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 新版本数据库作为订阅者</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> SUBSCRIPTION upgrade_sub</span></span>
<span class="line"><span class="__shiki_1itgoe">CONNECTION</span><span class="__shiki_mdbnqw"> &#39;host=old_version_host port=5432 dbname=mydb&#39;</span></span>
<span class="line"><span class="__shiki_140thh">PUBLICATION all_tables_pub</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    copy_data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true,</span></span>
<span class="line"><span class="__shiki_140thh">    create_slot </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 步骤2: 等待数据同步完成</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 监控复制延迟</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> logical_replication_monitor;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 步骤3: 停止应用对旧数据库的写入</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 步骤4: 确认数据完全同步</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    pg_wal_lsn_diff(pg_current_wal_lsn(), confirmed_flush_lsn) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> lag_bytes</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_replication_slots</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> slot_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;upgrade_sub_slot&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 步骤5: 停止逻辑复制</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_140thh"> SUBSCRIPTION upgrade_sub </span><span class="__shiki_1itgoe">DISABLE</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_140thh"> SUBSCRIPTION upgrade_sub </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> (slot_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> NONE</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">DROP</span><span class="__shiki_140thh"> SUBSCRIPTION upgrade_sub;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 步骤6: 在旧数据库删除复制槽（如果需要）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> pg_drop_replication_slot(</span><span class="__shiki_mdbnqw">&#39;upgrade_sub_slot&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 步骤7: 切换应用连接到新数据库</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 数据库拆分（垂直拆分）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 原数据库包含 users, orders, products 表</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 目标：将 orders 拆分到单独数据库</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 步骤1: 在新数据库创建 orders 表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> orders</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_dzsirb"> source_db</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">orders</span><span class="__shiki_140thh"> INCLUDING ALL);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 步骤2: 在源数据库创建仅包含 orders 的发布</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> PUBLICATION orders_pub </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> orders;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 步骤3: 在新数据库创建订阅</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> SUBSCRIPTION orders_sub</span></span>
<span class="line"><span class="__shiki_1itgoe">CONNECTION</span><span class="__shiki_mdbnqw"> &#39;host=source_db port=5432 dbname=source_db&#39;</span></span>
<span class="line"><span class="__shiki_140thh">PUBLICATION orders_pub</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (copy_data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 步骤4: 迁移完成后，修改应用配置，将 orders 相关查询指向新数据库</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 数据库合并（水平合并）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 多个数据库合并到一个数据库</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 目标数据库创建多个订阅</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 订阅数据库A</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> SUBSCRIPTION merge_sub_a</span></span>
<span class="line"><span class="__shiki_1itgoe">CONNECTION</span><span class="__shiki_mdbnqw"> &#39;host=db_a port=5432 dbname=db_a&#39;</span></span>
<span class="line"><span class="__shiki_140thh">PUBLICATION db_a_pub;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 订阅数据库B</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> SUBSCRIPTION merge_sub_b</span></span>
<span class="line"><span class="__shiki_1itgoe">CONNECTION</span><span class="__shiki_mdbnqw"> &#39;host=db_b port=5432 dbname=db_b&#39;</span></span>
<span class="line"><span class="__shiki_140thh">PUBLICATION db_b_pub;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 跨版本逻辑复制函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> setup_cross_version_replication</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    source_conninfo </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    target_conninfo </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    publication_name </span><span class="__shiki_1itgoe">text</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_mdbnqw"> &#39;all_tables_pub&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> void </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    table_record RECORD;</span></span>
<span class="line"><span class="__shiki_140thh">    create_table_sql </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 在目标数据库创建相同表结构</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> table_record </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">            tablename,</span></span>
<span class="line"><span class="__shiki_140thh">            column_name,</span></span>
<span class="line"><span class="__shiki_140thh">            data_type,</span></span>
<span class="line"><span class="__shiki_140thh">            is_nullable,</span></span>
<span class="line"><span class="__shiki_140thh">            column_default</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> dblink(source_conninfo, </span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">                table_schema as schemaname,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                table_name as tablename,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                column_name,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                data_type,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                is_nullable,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                column_default</span></span>
<span class="line"><span class="__shiki_mdbnqw">            FROM information_schema.columns</span></span>
<span class="line"><span class="__shiki_mdbnqw">            WHERE table_schema = &#39;&#39;public&#39;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            ORDER BY table_schema, table_name, ordinal_position</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> t(schemaname </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">, tablename </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">, column_name </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                data_type </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">, is_nullable </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">, column_default </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 动态创建表（简化示例）</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 实际需要更复杂的DDL生成逻辑</span></span>
<span class="line"><span class="__shiki_140thh">        RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;创建表: %.%&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">table_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">schemaname</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">table_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">tablename</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 在目标数据库创建订阅</span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM dblink_exec(target_conninfo, </span></span>
<span class="line"><span class="__shiki_dzsirb">        format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;CREATE SUBSCRIPTION cross_version_sub</span></span>
<span class="line"><span class="__shiki_mdbnqw">                CONNECTION %L</span></span>
<span class="line"><span class="__shiki_mdbnqw">                PUBLICATION %I</span></span>
<span class="line"><span class="__shiki_mdbnqw">                WITH (copy_data = true)&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                source_conninfo, publication_name));</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;跨版本逻辑复制配置完成&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span></code></pre></div><h2 id="四、复制监控与维护自动化" tabindex="-1">四、复制监控与维护自动化 <a class="header-anchor" href="#四、复制监控与维护自动化" aria-label="Permalink to &quot;四、复制监控与维护自动化&quot;">​</a></h2><h3 id="_4-1-综合监控系统" tabindex="-1">4.1 综合监控系统 <a class="header-anchor" href="#_4-1-综合监控系统" aria-label="Permalink to &quot;4.1 综合监控系统&quot;">​</a></h3><h4 id="_4-1-1-复制健康检查系统" tabindex="-1">4.1.1 复制健康检查系统 <a class="header-anchor" href="#_4-1-1-复制健康检查系统" aria-label="Permalink to &quot;4.1.1 复制健康检查系统&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 创建复制监控数据库</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> DATABASE</span><span class="__shiki_1t8gfj"> replication_monitor</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 连接到 replication_monitor 数据库</span></span>
<span class="line"><span class="__shiki_140thh">\\c replication_monitor</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 创建监控表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> replication_health_history</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">BIGSERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    check_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    server_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    replication_type </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">-- &#39;physical&#39; 或 &#39;logical&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    subscription_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    lag_bytes </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    lag_interval INTERVAL,</span></span>
<span class="line"><span class="__shiki_1itgoe">    status</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">-- &#39;healthy&#39;, &#39;warning&#39;, &#39;critical&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    metrics JSONB,</span></span>
<span class="line"><span class="__shiki_140thh">    details </span><span class="__shiki_1itgoe">TEXT</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_health_history_time</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> replication_health_history(check_time);</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_health_history_server</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> replication_health_history(server_name, check_time);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 创建健康检查函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> check_replication_health</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    server_name </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    replication_type </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    subscription_name </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    lag_bytes </span><span class="__shiki_1itgoe">bigint</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    lag_interval interval,</span></span>
<span class="line"><span class="__shiki_1itgoe">    status</span><span class="__shiki_1itgoe"> text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    metrics jsonb,</span></span>
<span class="line"><span class="__shiki_140thh">    details </span><span class="__shiki_1itgoe">text</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    physical_lag_threshold_bytes </span><span class="__shiki_1itgoe">bigint</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 100MB</span></span>
<span class="line"><span class="__shiki_140thh">    logical_lag_threshold_bytes </span><span class="__shiki_1itgoe">bigint</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 500</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 500MB</span></span>
<span class="line"><span class="__shiki_140thh">    logical_lag_threshold_interval interval :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;5 minutes&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查物理复制</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;primary_server&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> server_name,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;physical&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> replication_type,</span></span>
<span class="line"><span class="__shiki_140thh">        application_name </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> subscription_name,</span></span>
<span class="line"><span class="__shiki_140thh">        pg_wal_lsn_diff(sent_lsn, replay_lsn) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> lag_bytes,</span></span>
<span class="line"><span class="__shiki_140thh">        replay_lag </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> lag_interval,</span></span>
<span class="line"><span class="__shiki_1itgoe">        CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> pg_wal_lsn_diff(sent_lsn, replay_lsn) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> physical_lag_threshold_bytes </span></span>
<span class="line"><span class="__shiki_1itgoe">                 OR</span><span class="__shiki_140thh"> replay_lag </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;1 minute&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            THEN</span><span class="__shiki_mdbnqw"> &#39;warning&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            ELSE</span><span class="__shiki_mdbnqw"> &#39;healthy&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_1itgoe"> status</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;sent_lsn&#39;</span><span class="__shiki_140thh">, sent_lsn::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;replay_lsn&#39;</span><span class="__shiki_140thh">, replay_lsn::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;client_addr&#39;</span><span class="__shiki_140thh">, client_addr::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;state&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">state</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;sync_state&#39;</span><span class="__shiki_140thh">, sync_state</span></span>
<span class="line"><span class="__shiki_140thh">        ) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> metrics,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;物理复制监控&#39;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> details</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_stat_replication</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> slot_type </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_1itgoe"> NULL</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_140thh"> slot_type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;physical&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查逻辑复制</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;primary_server&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> server_name,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;logical&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> replication_type,</span></span>
<span class="line"><span class="__shiki_dzsirb">        s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">subname</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> subscription_name,</span></span>
<span class="line"><span class="__shiki_140thh">        pg_wal_lsn_diff(</span><span class="__shiki_dzsirb">r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">sent_lsn</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">replay_lsn</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> lag_bytes,</span></span>
<span class="line"><span class="__shiki_dzsirb">        r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">replay_lag</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> lag_interval,</span></span>
<span class="line"><span class="__shiki_1itgoe">        CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> pg_wal_lsn_diff(</span><span class="__shiki_dzsirb">r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">sent_lsn</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">replay_lsn</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> logical_lag_threshold_bytes </span></span>
<span class="line"><span class="__shiki_1itgoe">                 OR</span><span class="__shiki_dzsirb"> r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">replay_lag</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_140thh"> logical_lag_threshold_interval</span></span>
<span class="line"><span class="__shiki_1itgoe">            THEN</span><span class="__shiki_mdbnqw"> &#39;warning&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_dzsirb"> sr</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srsubstate</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;s&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;r&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">THEN</span><span class="__shiki_mdbnqw"> &#39;syncing&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            ELSE</span><span class="__shiki_mdbnqw"> &#39;healthy&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_1itgoe"> status</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;subscription_state&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">sr</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srsubstate</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;table_count&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_subscription_rel </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> srsubid </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;active&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> active </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_replication_slots </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> slot_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">subslotname</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        ) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> metrics,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;逻辑复制监控&#39;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> details</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_subscription s</span></span>
<span class="line"><span class="__shiki_1itgoe">    LEFT JOIN</span><span class="__shiki_140thh"> pg_stat_replication r </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">application_name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">subname</span></span>
<span class="line"><span class="__shiki_1itgoe">    LEFT JOIN</span><span class="__shiki_140thh"> pg_subscription_rel sr </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> sr</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srsubid</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">subenabled</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 创建自动化监控作业</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> run_replication_health_check()</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql</span></span>
<span class="line"><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    health_record RECORD;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 清空历史记录（保留最近24小时）</span></span>
<span class="line"><span class="__shiki_1itgoe">    DELETE</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> replication_health_history </span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> check_time </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;24 hours&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 运行健康检查并记录结果</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> health_record </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> check_replication_health()</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        INSERT INTO</span><span class="__shiki_140thh"> replication_health_history (</span></span>
<span class="line"><span class="__shiki_140thh">            server_name,</span></span>
<span class="line"><span class="__shiki_140thh">            replication_type,</span></span>
<span class="line"><span class="__shiki_140thh">            subscription_name,</span></span>
<span class="line"><span class="__shiki_140thh">            lag_bytes,</span></span>
<span class="line"><span class="__shiki_140thh">            lag_interval,</span></span>
<span class="line"><span class="__shiki_1itgoe">            status</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            metrics,</span></span>
<span class="line"><span class="__shiki_140thh">            details</span></span>
<span class="line"><span class="__shiki_140thh">        ) </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">            health_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">server_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            health_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">replication_type</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            health_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">subscription_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            health_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">lag_bytes</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            health_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">lag_interval</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            health_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">status</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            health_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metrics</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            health_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">details</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 发送告警（如果状态为warning或critical）</span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM send_replication_alerts();</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 告警发送函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> send_replication_alerts</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> void </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    alert_record RECORD;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> alert_record </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            server_name,</span></span>
<span class="line"><span class="__shiki_140thh">            replication_type,</span></span>
<span class="line"><span class="__shiki_140thh">            subscription_name,</span></span>
<span class="line"><span class="__shiki_140thh">            lag_bytes,</span></span>
<span class="line"><span class="__shiki_140thh">            lag_interval,</span></span>
<span class="line"><span class="__shiki_1itgoe">            status</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            check_time</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> replication_health_history</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> check_time </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;5 minutes&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">          AND</span><span class="__shiki_1itgoe"> status</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;warning&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;critical&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        GROUP BY</span><span class="__shiki_140thh"> server_name, replication_type, subscription_name, </span></span>
<span class="line"><span class="__shiki_140thh">                 lag_bytes, lag_interval, </span><span class="__shiki_1itgoe">status</span><span class="__shiki_140thh">, check_time</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 这里可以集成邮件、Slack、Webhook等通知方式</span></span>
<span class="line"><span class="__shiki_140thh">        RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;复制告警: 服务器=%, 类型=%, 订阅=%, 延迟=%, 状态=%, 时间=%&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            alert_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">server_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            alert_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">replication_type</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            alert_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">subscription_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            pg_size_pretty(</span><span class="__shiki_dzsirb">alert_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">lag_bytes</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_dzsirb">            alert_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">status</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            alert_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">check_time</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 示例：记录到告警表</span></span>
<span class="line"><span class="__shiki_1itgoe">        INSERT INTO</span><span class="__shiki_140thh"> replication_alerts (</span></span>
<span class="line"><span class="__shiki_140thh">            alert_time,</span></span>
<span class="line"><span class="__shiki_140thh">            server_name,</span></span>
<span class="line"><span class="__shiki_140thh">            subscription_name,</span></span>
<span class="line"><span class="__shiki_140thh">            alert_type,</span></span>
<span class="line"><span class="__shiki_140thh">            alert_message</span></span>
<span class="line"><span class="__shiki_140thh">        ) </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">            now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_dzsirb">            alert_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">server_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            alert_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">subscription_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            alert_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">status</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;复制延迟超过阈值: %s&#39;</span><span class="__shiki_140thh">, pg_size_pretty(</span><span class="__shiki_dzsirb">alert_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">lag_bytes</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 创建定时监控任务（需要pg_cron扩展）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_dzsirb"> cron</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">schedule</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;replication-health-check&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;*/5 * * * *&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">-- 每5分钟执行</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;CALL run_replication_health_check()&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h4 id="_4-1-2-性能分析报告" tabindex="-1">4.1.2 性能分析报告 <a class="header-anchor" href="#_4-1-2-性能分析报告" aria-label="Permalink to &quot;4.1.2 性能分析报告&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 创建性能分析表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> replication_performance_stats</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">BIGSERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    sample_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    server_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    metric_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    metric_value </span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">15</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    metric_unit </span><span class="__shiki_1itgoe">TEXT</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 性能指标收集函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> collect_replication_performance</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> void </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 物理复制指标</span></span>
<span class="line"><span class="__shiki_140thh">    physical_stats RECORD;</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 逻辑复制指标</span></span>
<span class="line"><span class="__shiki_140thh">    logical_stats RECORD;</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 系统指标</span></span>
<span class="line"><span class="__shiki_140thh">    system_stats RECORD;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 收集物理复制性能指标</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> physical_stats </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            application_name,</span></span>
<span class="line"><span class="__shiki_140thh">            EXTRACT(EPOCH </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> backend_start)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> uptime_seconds,</span></span>
<span class="line"><span class="__shiki_140thh">            pg_wal_lsn_diff(sent_lsn, </span><span class="__shiki_mdbnqw">&#39;0/0&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> total_sent_bytes,</span></span>
<span class="line"><span class="__shiki_140thh">            pg_wal_lsn_diff(replay_lsn, </span><span class="__shiki_mdbnqw">&#39;0/0&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> total_applied_bytes,</span></span>
<span class="line"><span class="__shiki_140thh">            pg_wal_lsn_diff(sent_lsn, replay_lsn) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> current_lag_bytes,</span></span>
<span class="line"><span class="__shiki_1itgoe">            CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">                WHEN</span><span class="__shiki_140thh"> pg_wal_lsn_diff(sent_lsn, </span><span class="__shiki_mdbnqw">&#39;0/0&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">                THEN</span><span class="__shiki_140thh"> (pg_wal_lsn_diff(sent_lsn, </span><span class="__shiki_mdbnqw">&#39;0/0&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">                     NULLIF</span><span class="__shiki_140thh">(EXTRACT(EPOCH </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> backend_start)), </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                ELSE</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">            END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> avg_throughput_mbps</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_stat_replication</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> slot_type </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_1itgoe"> NULL</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_140thh"> slot_type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;physical&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        INSERT INTO</span><span class="__shiki_140thh"> replication_performance_stats </span></span>
<span class="line"><span class="__shiki_140thh">            (server_name, metric_name, metric_value, metric_unit)</span></span>
<span class="line"><span class="__shiki_1itgoe">        VALUES</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_mdbnqw">&#39;primary&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;physical_replication_uptime&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">physical_stats</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">uptime_seconds</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;seconds&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_mdbnqw">&#39;primary&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;physical_total_sent&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">physical_stats</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">total_sent_bytes</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;MB&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_mdbnqw">&#39;primary&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;physical_total_applied&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">physical_stats</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">total_applied_bytes</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;MB&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_mdbnqw">&#39;primary&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;physical_current_lag&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">physical_stats</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">current_lag_bytes</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;MB&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_mdbnqw">&#39;primary&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;physical_avg_throughput&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">physical_stats</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">avg_throughput_mbps</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;MB/s&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 收集逻辑复制性能指标</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> logical_stats </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">            s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">subname</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">DISTINCT</span><span class="__shiki_dzsirb"> sr</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srrelid</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> table_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">            SUM</span><span class="__shiki_140thh">(pg_relation_size(</span><span class="__shiki_dzsirb">sr</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srrelid</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> total_table_size,</span></span>
<span class="line"><span class="__shiki_dzsirb">            AVG</span><span class="__shiki_140thh">(EXTRACT(EPOCH </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">backend_start</span><span class="__shiki_140thh">))) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> avg_uptime</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_subscription s</span></span>
<span class="line"><span class="__shiki_1itgoe">        LEFT JOIN</span><span class="__shiki_140thh"> pg_subscription_rel sr </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> sr</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srsubid</span></span>
<span class="line"><span class="__shiki_1itgoe">        LEFT JOIN</span><span class="__shiki_140thh"> pg_stat_replication r </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">application_name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">subname</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">subenabled</span></span>
<span class="line"><span class="__shiki_1itgoe">        GROUP BY</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">subname</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        INSERT INTO</span><span class="__shiki_140thh"> replication_performance_stats </span></span>
<span class="line"><span class="__shiki_140thh">            (server_name, metric_name, metric_value, metric_unit)</span></span>
<span class="line"><span class="__shiki_1itgoe">        VALUES</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_mdbnqw">&#39;primary&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;logical_subscription_tables&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">logical_stats</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">table_count</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;count&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_mdbnqw">&#39;primary&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;logical_total_table_size&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">logical_stats</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">total_table_size</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;MB&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_mdbnqw">&#39;primary&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;logical_avg_uptime&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">logical_stats</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">avg_uptime</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;seconds&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 收集系统级指标</span></span>
<span class="line"><span class="__shiki_1itgoe">    INSERT INTO</span><span class="__shiki_140thh"> replication_performance_stats </span></span>
<span class="line"><span class="__shiki_140thh">        (server_name, metric_name, metric_value, metric_unit)</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;primary&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;replication_slots_count&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;count&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_replication_slots;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    INSERT INTO</span><span class="__shiki_140thh"> replication_performance_stats </span></span>
<span class="line"><span class="__shiki_140thh">        (server_name, metric_name, metric_value, metric_unit)</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;primary&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;wal_files_count&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;count&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_ls_waldir();</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 性能报告生成函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> generate_replication_report</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    start_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;1 day&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    end_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    report_section </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    metric_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    avg_value </span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">15</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    max_value </span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">15</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    min_value </span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">15</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    current_value </span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">15</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    metric_unit </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    trend </span><span class="__shiki_1itgoe">TEXT</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 物理复制报告</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;物理复制性能&#39;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> report_section,</span></span>
<span class="line"><span class="__shiki_dzsirb">        rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        AVG</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> avg_value,</span></span>
<span class="line"><span class="__shiki_dzsirb">        MAX</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> max_value,</span></span>
<span class="line"><span class="__shiki_dzsirb">        MIN</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> min_value,</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> metric_value </span></span>
<span class="line"><span class="__shiki_1itgoe">         FROM</span><span class="__shiki_140thh"> replication_performance_stats </span></span>
<span class="line"><span class="__shiki_1itgoe">         WHERE</span><span class="__shiki_140thh"> metric_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_name</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">         ORDER BY</span><span class="__shiki_140thh"> sample_time </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_1itgoe"> LIMIT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> current_value,</span></span>
<span class="line"><span class="__shiki_dzsirb">        rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_unit</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">        CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_dzsirb"> AVG</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">8</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> MAX</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">THEN</span><span class="__shiki_mdbnqw"> &#39;稳定&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_dzsirb"> AVG</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">5</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> MAX</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">THEN</span><span class="__shiki_mdbnqw"> &#39;正常波动&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            ELSE</span><span class="__shiki_mdbnqw"> &#39;波动较大&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> trend</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> replication_performance_stats rps</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_dzsirb"> rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">sample_time</span><span class="__shiki_1itgoe"> BETWEEN</span><span class="__shiki_140thh"> start_time </span><span class="__shiki_1itgoe">AND</span><span class="__shiki_140thh"> end_time</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_dzsirb"> rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;physical_%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    GROUP BY</span><span class="__shiki_dzsirb"> rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_name</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_unit</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 逻辑复制报告</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;逻辑复制性能&#39;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> report_section,</span></span>
<span class="line"><span class="__shiki_dzsirb">        rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        AVG</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> avg_value,</span></span>
<span class="line"><span class="__shiki_dzsirb">        MAX</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> max_value,</span></span>
<span class="line"><span class="__shiki_dzsirb">        MIN</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> min_value,</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> metric_value </span></span>
<span class="line"><span class="__shiki_1itgoe">         FROM</span><span class="__shiki_140thh"> replication_performance_stats </span></span>
<span class="line"><span class="__shiki_1itgoe">         WHERE</span><span class="__shiki_140thh"> metric_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_name</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">         ORDER BY</span><span class="__shiki_140thh"> sample_time </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_1itgoe"> LIMIT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> current_value,</span></span>
<span class="line"><span class="__shiki_dzsirb">        rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_unit</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">        CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_dzsirb"> AVG</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">8</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> MAX</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">THEN</span><span class="__shiki_mdbnqw"> &#39;稳定&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_dzsirb"> AVG</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">5</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> MAX</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">THEN</span><span class="__shiki_mdbnqw"> &#39;正常波动&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            ELSE</span><span class="__shiki_mdbnqw"> &#39;波动较大&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> trend</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> replication_performance_stats rps</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_dzsirb"> rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">sample_time</span><span class="__shiki_1itgoe"> BETWEEN</span><span class="__shiki_140thh"> start_time </span><span class="__shiki_1itgoe">AND</span><span class="__shiki_140thh"> end_time</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_dzsirb"> rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;logical_%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    GROUP BY</span><span class="__shiki_dzsirb"> rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_name</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_unit</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 系统资源报告</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;系统资源&#39;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> report_section,</span></span>
<span class="line"><span class="__shiki_dzsirb">        rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        AVG</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> avg_value,</span></span>
<span class="line"><span class="__shiki_dzsirb">        MAX</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> max_value,</span></span>
<span class="line"><span class="__shiki_dzsirb">        MIN</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> min_value,</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> metric_value </span></span>
<span class="line"><span class="__shiki_1itgoe">         FROM</span><span class="__shiki_140thh"> replication_performance_stats </span></span>
<span class="line"><span class="__shiki_1itgoe">         WHERE</span><span class="__shiki_140thh"> metric_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_name</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">         ORDER BY</span><span class="__shiki_140thh"> sample_time </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_1itgoe"> LIMIT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> current_value,</span></span>
<span class="line"><span class="__shiki_dzsirb">        rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_unit</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">        CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_dzsirb"> MAX</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> MIN</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> AVG</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_value</span><span class="__shiki_140thh">) </span></span>
<span class="line"><span class="__shiki_1itgoe">            THEN</span><span class="__shiki_mdbnqw"> &#39;稳定&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            ELSE</span><span class="__shiki_mdbnqw"> &#39;波动&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> trend</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> replication_performance_stats rps</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_dzsirb"> rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">sample_time</span><span class="__shiki_1itgoe"> BETWEEN</span><span class="__shiki_140thh"> start_time </span><span class="__shiki_1itgoe">AND</span><span class="__shiki_140thh"> end_time</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_dzsirb"> rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_name</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;physical_%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_dzsirb"> rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_name</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;logical_%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    GROUP BY</span><span class="__shiki_dzsirb"> rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_name</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">rps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">metric_unit</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 自动化性能收集</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> schedule_performance_collection()</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql</span></span>
<span class="line"><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 每15分钟收集一次性能数据</span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM </span><span class="__shiki_dzsirb">cron</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">schedule</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;performance-collection&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;*/15 * * * *&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;SELECT collect_replication_performance()&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 每天生成报告</span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM </span><span class="__shiki_dzsirb">cron</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">schedule</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;daily-report&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;0 2 * * *&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">-- 每天凌晨2点</span></span>
<span class="line"><span class="__shiki_140thh">        $$</span></span>
<span class="line"><span class="__shiki_1itgoe">        INSERT INTO</span><span class="__shiki_140thh"> replication_reports (report_date, report_content)</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            date</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">()),</span></span>
<span class="line"><span class="__shiki_140thh">            jsonb_agg(row_to_json(r))</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> generate_replication_report(</span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;1 day&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">()) r</span></span>
<span class="line"><span class="__shiki_140thh">        $$</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$;</span></span></code></pre></div><h3 id="_4-2-维护自动化系统" tabindex="-1">4.2 维护自动化系统 <a class="header-anchor" href="#_4-2-维护自动化系统" aria-label="Permalink to &quot;4.2 维护自动化系统&quot;">​</a></h3><h4 id="_4-2-1-自动化维护任务" tabindex="-1">4.2.1 自动化维护任务 <a class="header-anchor" href="#_4-2-1-自动化维护任务" aria-label="Permalink to &quot;4.2.1 自动化维护任务&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 创建维护任务表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> replication_maintenance_tasks</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    task_id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    task_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    task_type </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> CHECK</span><span class="__shiki_140thh"> (task_type </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;cleanup&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;optimization&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;backup&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;health_check&#39;</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_140thh">    schedule_cron </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    last_run </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    next_run </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    enabled</span><span class="__shiki_1itgoe"> BOOLEAN</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_140thh"> true,</span></span>
<span class="line"><span class="__shiki_140thh">    parameters JSONB,</span></span>
<span class="line"><span class="__shiki_1itgoe">    description</span><span class="__shiki_1itgoe"> TEXT</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. WAL文件维护任务</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> replication_maintenance_tasks </span></span>
<span class="line"><span class="__shiki_140thh">    (task_name, task_type, schedule_cron, parameters, </span><span class="__shiki_1itgoe">description</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;wal_cleanup&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;cleanup&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;0 2 * * *&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">-- 每天凌晨2点</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;{&quot;max_wal_age_days&quot;: 7, &quot;keep_min_wal_files&quot;: 100}&#39;</span><span class="__shiki_140thh">::jsonb,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;清理旧的WAL文件，保留最近7天或最少100个文件&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 复制槽维护任务</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> replication_maintenance_tasks </span></span>
<span class="line"><span class="__shiki_140thh">    (task_name, task_type, schedule_cron, parameters, </span><span class="__shiki_1itgoe">description</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;slot_maintenance&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;cleanup&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;0 */6 * * *&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">-- 每6小时</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;{&quot;max_inactive_hours&quot;: 24, &quot;max_wal_retention_gb&quot;: 100}&#39;</span><span class="__shiki_140thh">::jsonb,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;清理不活跃的复制槽，防止WAL无限增长&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 统计信息更新任务</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> replication_maintenance_tasks </span></span>
<span class="line"><span class="__shiki_140thh">    (task_name, task_type, schedule_cron, parameters, </span><span class="__shiki_1itgoe">description</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;stats_update&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;optimization&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;0 3 * * *&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">-- 每天凌晨3点</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;{&quot;analyze_tables&quot;: true, &quot;vacuum_tables&quot;: true}&#39;</span><span class="__shiki_140thh">::jsonb,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;更新复制相关表的统计信息&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 自动化维护执行函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> execute_maintenance_task</span><span class="__shiki_140thh">(task_id_param </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> JSONB</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql</span></span>
<span class="line"><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    task_record RECORD;</span></span>
<span class="line"><span class="__shiki_140thh">    result_json JSONB;</span></span>
<span class="line"><span class="__shiki_140thh">    task_start_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 获取任务信息</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> INTO</span><span class="__shiki_140thh"> task_record</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> replication_maintenance_tasks</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> task_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> task_id_param</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_1itgoe"> enabled</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> true;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_140thh"> FOUND </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_1itgoe">        RETURN</span><span class="__shiki_140thh"> jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;status&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;error&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;message&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;任务不存在或已禁用&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 根据任务类型执行</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_dzsirb"> task_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">task_type</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;cleanup&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_140thh">            result_json :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> perform_cleanup_task(</span><span class="__shiki_dzsirb">task_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">parameters</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;optimization&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_140thh">            result_json :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> perform_optimization_task(</span><span class="__shiki_dzsirb">task_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">parameters</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;health_check&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_140thh">            result_json :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> perform_health_check_task(</span><span class="__shiki_dzsirb">task_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">parameters</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span></span>
<span class="line"><span class="__shiki_140thh">            result_json :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;status&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;error&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;message&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;未知任务类型&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            );</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> CASE</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 更新任务状态</span></span>
<span class="line"><span class="__shiki_1itgoe">    UPDATE</span><span class="__shiki_140thh"> replication_maintenance_tasks</span></span>
<span class="line"><span class="__shiki_1itgoe">    SET</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        last_run </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> task_start_time,</span></span>
<span class="line"><span class="__shiki_140thh">        next_run </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> task_start_time </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_1itgoe">CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">                WHEN</span><span class="__shiki_dzsirb"> task_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">schedule_cron</span><span class="__shiki_1itgoe"> IS NOT NULL</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">                THEN</span><span class="__shiki_140thh"> cron_next(</span><span class="__shiki_dzsirb">task_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">schedule_cron</span><span class="__shiki_140thh">, task_start_time)</span></span>
<span class="line"><span class="__shiki_1itgoe">                ELSE</span><span class="__shiki_1itgoe"> NULL</span></span>
<span class="line"><span class="__shiki_1itgoe">            END</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> task_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> task_id_param;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 记录执行日志</span></span>
<span class="line"><span class="__shiki_1itgoe">    INSERT INTO</span><span class="__shiki_140thh"> maintenance_execution_log (</span></span>
<span class="line"><span class="__shiki_140thh">        task_id,</span></span>
<span class="line"><span class="__shiki_140thh">        execution_time,</span></span>
<span class="line"><span class="__shiki_140thh">        duration,</span></span>
<span class="line"><span class="__shiki_140thh">        result,</span></span>
<span class="line"><span class="__shiki_140thh">        details</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">        task_id_param,</span></span>
<span class="line"><span class="__shiki_140thh">        task_start_time,</span></span>
<span class="line"><span class="__shiki_140thh">        EXTRACT(EPOCH </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> task_start_time)),</span></span>
<span class="line"><span class="__shiki_140thh">        result_json</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;status&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        result_json</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> result_json;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 具体任务实现函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> perform_cleanup_task</span><span class="__shiki_140thh">(params JSONB)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> JSONB</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql</span></span>
<span class="line"><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    max_wal_age_days </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> COALESCE</span><span class="__shiki_140thh">((params</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;max_wal_age_days&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">7</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    keep_min_wal_files </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> COALESCE</span><span class="__shiki_140thh">((params</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;keep_min_wal_files&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    max_inactive_hours </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> COALESCE</span><span class="__shiki_140thh">((params</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;max_inactive_hours&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">24</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    max_wal_retention_gb </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> COALESCE</span><span class="__shiki_140thh">((params</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;max_wal_retention_gb&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    deleted_files </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    deleted_slots </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 清理旧的WAL文件</span></span>
<span class="line"><span class="__shiki_1itgoe">    WITH</span><span class="__shiki_140thh"> old_wal_files </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">               modification</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_ls_waldir()</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> modification </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> (max_wal_age_days </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39; days&#39;</span><span class="__shiki_140thh">)::interval</span></span>
<span class="line"><span class="__shiki_1itgoe">        ORDER BY</span><span class="__shiki_140thh"> modification</span></span>
<span class="line"><span class="__shiki_140thh">        OFFSET keep_min_wal_files  </span><span class="__shiki_21nrsd">-- 跳过最少保留的文件数</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> deleted_files</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> old_wal_files;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 清理不活跃的复制槽</span></span>
<span class="line"><span class="__shiki_1itgoe">    WITH</span><span class="__shiki_140thh"> inactive_slots </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> slot_name</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_replication_slots</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_140thh"> active</span></span>
<span class="line"><span class="__shiki_1itgoe">          AND</span><span class="__shiki_140thh"> age(</span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">(), </span></span>
<span class="line"><span class="__shiki_dzsirb">              COALESCE</span><span class="__shiki_140thh">((</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> backend_start </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_activity </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> pid </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> active_pid),</span></span>
<span class="line"><span class="__shiki_1itgoe">                       now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> (max_inactive_hours </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39; hours&#39;</span><span class="__shiki_140thh">)::interval)</span></span>
<span class="line"><span class="__shiki_140thh">          ) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> (max_inactive_hours </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39; hours&#39;</span><span class="__shiki_140thh">)::interval</span></span>
<span class="line"><span class="__shiki_1itgoe">          AND</span><span class="__shiki_140thh"> pg_wal_lsn_diff(pg_current_wal_lsn(), restart_lsn) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> max_wal_retention_gb </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> deleted_slots</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> inactive_slots;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;status&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;success&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;details&#39;</span><span class="__shiki_140thh">, jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;wal_files_deleted&#39;</span><span class="__shiki_140thh">, deleted_files,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;replication_slots_deleted&#39;</span><span class="__shiki_140thh">, deleted_slots,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;timestamp&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 7. 自动化任务调度器</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> run_scheduled_maintenance()</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql</span></span>
<span class="line"><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    task_record RECORD;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> task_record </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_1itgoe"> *</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> replication_maintenance_tasks</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_1itgoe"> enabled</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> true</span></span>
<span class="line"><span class="__shiki_1itgoe">          AND</span><span class="__shiki_140thh"> (next_run </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_1itgoe"> NULL</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_140thh"> next_run </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_1itgoe">          AND</span><span class="__shiki_140thh"> schedule_cron </span><span class="__shiki_1itgoe">IS NOT NULL</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        BEGIN</span></span>
<span class="line"><span class="__shiki_140thh">            RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;执行维护任务: % (ID: %)&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">task_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">task_name</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">task_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">task_id</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            PERFORM execute_maintenance_task(</span><span class="__shiki_dzsirb">task_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">task_id</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        EXCEPTION</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> OTHERS </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_140thh">                RAISE WARNING </span><span class="__shiki_mdbnqw">&#39;任务执行失败: % (ID: %), 错误: %&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">                    task_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">task_name</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">task_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">task_id</span><span class="__shiki_140thh">, SQLERRM;</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 记录失败</span></span>
<span class="line"><span class="__shiki_1itgoe">                INSERT INTO</span><span class="__shiki_140thh"> maintenance_failure_log (</span></span>
<span class="line"><span class="__shiki_140thh">                    task_id,</span></span>
<span class="line"><span class="__shiki_140thh">                    failure_time,</span></span>
<span class="line"><span class="__shiki_140thh">                    error_message</span></span>
<span class="line"><span class="__shiki_140thh">                ) </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">                    task_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">task_id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">                    now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">                    SQLERRM</span></span>
<span class="line"><span class="__shiki_140thh">                );</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 8. 创建定时执行器（需要pg_cron扩展）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_dzsirb"> cron</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">schedule</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;maintenance-scheduler&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;*/5 * * * *&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">-- 每5分钟检查一次</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;CALL run_scheduled_maintenance()&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h4 id="_4-2-2-灾难恢复自动化" tabindex="-1">4.2.2 灾难恢复自动化 <a class="header-anchor" href="#_4-2-2-灾难恢复自动化" aria-label="Permalink to &quot;4.2.2 灾难恢复自动化&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 创建灾难恢复配置表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> disaster_recovery_config</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    config_id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    config_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_1itgoe"> UNIQUE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    primary_host </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    primary_port </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 5432</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    standby_hosts JSONB,  </span><span class="__shiki_21nrsd">-- 多个备库配置</span></span>
<span class="line"><span class="__shiki_140thh">    failover_threshold_seconds </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 30</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    health_check_interval_seconds </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    auto_failover_enabled </span><span class="__shiki_1itgoe">BOOLEAN</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_140thh"> false,</span></span>
<span class="line"><span class="__shiki_140thh">    notification_contacts JSONB,</span></span>
<span class="line"><span class="__shiki_140thh">    last_updated </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 创建恢复计划表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> recovery_plans</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    plan_id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    plan_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    scenario_type </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> CHECK</span><span class="__shiki_140thh"> (scenario_type </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;primary_failure&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;network_partition&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;data_corruption&#39;</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_140thh">    steps JSONB,</span></span>
<span class="line"><span class="__shiki_140thh">    estimated_recovery_time INTERVAL,</span></span>
<span class="line"><span class="__shiki_140thh">    last_tested </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    success_rate </span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 自动化故障检测函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> detect_failures</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    detection_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    failure_type </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    affected_host </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    severity </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    details JSONB</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql</span></span>
<span class="line"><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    primary_status </span><span class="__shiki_1itgoe">BOOLEAN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    standby_status </span><span class="__shiki_1itgoe">BOOLEAN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    health_check_timeout</span><span class="__shiki_140thh"> INTERVAL :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;30 seconds&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检测主库故障</span></span>
<span class="line"><span class="__shiki_1itgoe">    BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 尝试连接主库</span></span>
<span class="line"><span class="__shiki_140thh">        PERFORM dblink_connect(</span><span class="__shiki_mdbnqw">&#39;primary_check&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">            format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;host=%s port=%s dbname=%s user=%s password=%s&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                   (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> primary_host </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> disaster_recovery_config </span><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">                   (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> primary_port </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> disaster_recovery_config </span><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                   &#39;postgres&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;monitor&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;monitor_password&#39;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">        PERFORM dblink_disconnect(</span><span class="__shiki_mdbnqw">&#39;primary_check&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        primary_status :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true;</span></span>
<span class="line"><span class="__shiki_140thh">    EXCEPTION</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> OTHERS </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_140thh">            primary_status :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> false;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_140thh"> primary_status </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_140thh">        detection_time :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        failure_type :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;primary_unreachable&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        affected_host :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> primary_host </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> disaster_recovery_config </span><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        severity :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;critical&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        details :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;error&#39;</span><span class="__shiki_140thh">, SQLERRM,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;check_time&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_1itgoe">        RETURN</span><span class="__shiki_1itgoe"> NEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检测备库延迟</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> standby_status </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">                WHEN</span><span class="__shiki_140thh"> replay_lag </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> health_check_timeout</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_140thh"> false</span></span>
<span class="line"><span class="__shiki_1itgoe">                ELSE</span><span class="__shiki_140thh"> true</span></span>
<span class="line"><span class="__shiki_1itgoe">            END</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_stat_replication</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> sync_state </span><span class="__shiki_1itgoe">IS NOT NULL</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_140thh"> standby_status </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_140thh">            detection_time :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            failure_type :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;standby_lag_exceeded&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            affected_host :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> client_addr::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_stat_replication </span><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            severity :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;warning&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            details :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;lag_threshold&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">health_check_timeout</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;actual_lag&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> replay_lag </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_replication </span><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            );</span></span>
<span class="line"><span class="__shiki_1itgoe">            RETURN</span><span class="__shiki_1itgoe"> NEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检测WAL归档问题</span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_stat_archiver</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> last_failed_time </span><span class="__shiki_1itgoe">IS NOT NULL</span></span>
<span class="line"><span class="__shiki_1itgoe">          AND</span><span class="__shiki_140thh"> last_failed_time </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;5 minutes&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_140thh">        detection_time :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        failure_type :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;wal_archive_failure&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        affected_host :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;local&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        severity :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;high&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        details :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;last_failed_time&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> last_failed_time </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_archiver),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;last_failed_wal&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> last_failed_wal </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_archiver)</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_1itgoe">        RETURN</span><span class="__shiki_1itgoe"> NEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 自动化故障转移函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> execute_auto_failover</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> JSONB</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql</span></span>
<span class="line"><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    config_record RECORD;</span></span>
<span class="line"><span class="__shiki_140thh">    best_standby RECORD;</span></span>
<span class="line"><span class="__shiki_140thh">    failover_result JSONB;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 获取配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> INTO</span><span class="__shiki_140thh"> config_record</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> disaster_recovery_config</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> auto_failover_enabled </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true</span></span>
<span class="line"><span class="__shiki_1itgoe">    LIMIT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_140thh"> FOUND </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_1itgoe">        RETURN</span><span class="__shiki_140thh"> jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;status&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;disabled&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;message&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;自动故障转移已禁用&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 选择最佳备库（延迟最低的同步备库）</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        application_name,</span></span>
<span class="line"><span class="__shiki_140thh">        client_addr,</span></span>
<span class="line"><span class="__shiki_140thh">        replay_lag</span></span>
<span class="line"><span class="__shiki_1itgoe">    INTO</span><span class="__shiki_140thh"> best_standby</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_stat_replication</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> sync_state </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;sync&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;quorum&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    ORDER BY</span><span class="__shiki_140thh"> replay_lag </span><span class="__shiki_1itgoe">NULLS</span><span class="__shiki_1itgoe"> FIRST</span></span>
<span class="line"><span class="__shiki_1itgoe">    LIMIT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_140thh"> FOUND </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 如果没有同步备库，选择延迟最低的备库</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            application_name,</span></span>
<span class="line"><span class="__shiki_140thh">            client_addr,</span></span>
<span class="line"><span class="__shiki_140thh">            replay_lag</span></span>
<span class="line"><span class="__shiki_1itgoe">        INTO</span><span class="__shiki_140thh"> best_standby</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_stat_replication</span></span>
<span class="line"><span class="__shiki_1itgoe">        ORDER BY</span><span class="__shiki_140thh"> replay_lag </span><span class="__shiki_1itgoe">NULLS</span><span class="__shiki_1itgoe"> FIRST</span></span>
<span class="line"><span class="__shiki_1itgoe">        LIMIT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_140thh"> FOUND </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_1itgoe">        RETURN</span><span class="__shiki_140thh"> jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;status&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;no_standby&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;message&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;没有可用的备库&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 执行故障转移</span></span>
<span class="line"><span class="__shiki_1itgoe">    BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 在备库上执行提升（通过dblink）</span></span>
<span class="line"><span class="__shiki_140thh">        PERFORM dblink_exec(</span></span>
<span class="line"><span class="__shiki_dzsirb">            format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;host=%s port=5432 dbname=postgres user=postgres&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">best_standby</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">client_addr</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;SELECT pg_promote(true, 30);&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        failover_result :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;status&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;success&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;new_primary&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">best_standby</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">client_addr</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;old_primary&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">config_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">primary_host</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;promotion_time&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;standby_lag_at_promotion&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">best_standby</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">replay_lag</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 更新配置</span></span>
<span class="line"><span class="__shiki_1itgoe">        UPDATE</span><span class="__shiki_140thh"> disaster_recovery_config</span></span>
<span class="line"><span class="__shiki_1itgoe">        SET</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            primary_host </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> best_standby</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">client_addr</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            last_updated </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> config_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> config_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">config_id</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 发送通知</span></span>
<span class="line"><span class="__shiki_140thh">        PERFORM send_failover_notification(failover_result);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">    EXCEPTION</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> OTHERS </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_140thh">            failover_result :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;status&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;failed&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;error&#39;</span><span class="__shiki_140thh">, SQLERRM,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;attempt_time&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            );</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 记录故障转移</span></span>
<span class="line"><span class="__shiki_1itgoe">    INSERT INTO</span><span class="__shiki_140thh"> failover_history (</span></span>
<span class="line"><span class="__shiki_140thh">        failover_time,</span></span>
<span class="line"><span class="__shiki_140thh">        from_host,</span></span>
<span class="line"><span class="__shiki_140thh">        to_host,</span></span>
<span class="line"><span class="__shiki_140thh">        reason,</span></span>
<span class="line"><span class="__shiki_140thh">        result</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">        now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_dzsirb">        config_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">primary_host</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        best_standby</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">client_addr</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;auto_failover&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        failover_result</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> failover_result;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 故障转移后重新配置</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> reconfigure_after_failover</span><span class="__shiki_140thh">(new_primary_host </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> void</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql</span></span>
<span class="line"><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    standby_record RECORD;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 重新配置其他备库连接到新的主库</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> standby_record </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> client_addr</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_stat_replication</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> client_addr::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_1itgoe"> !=</span><span class="__shiki_140thh"> new_primary_host</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 在备库上更新primary_conninfo（通过SSH或dblink）</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 这里需要根据具体环境实现</span></span>
<span class="line"><span class="__shiki_140thh">        RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;需要重新配置备库 % 连接到新的主库 %&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">            standby_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">client_addr</span><span class="__shiki_140thh">, new_primary_host;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 更新应用连接配置</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 这里可以集成配置管理工具（如Ansible、Puppet）</span></span>
<span class="line"><span class="__shiki_140thh">    RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;请更新应用配置以连接到新的主库: %&#39;</span><span class="__shiki_140thh">, new_primary_host;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 灾难恢复测试函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> test_disaster_recovery</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> JSONB</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql</span></span>
<span class="line"><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    test_start </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    test_results JSONB :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;[]&#39;</span><span class="__shiki_140thh">::jsonb;</span></span>
<span class="line"><span class="__shiki_140thh">    test_step RECORD;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 测试步骤</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> test_step </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            unnest(steps) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> step</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> recovery_plans</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> scenario_type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;primary_failure&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        LIMIT</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 执行测试步骤</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 这里根据实际恢复计划实现</span></span>
<span class="line"><span class="__shiki_140thh">        test_results :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> test_results </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;step&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">test_step</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">step</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;name&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;status&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;simulated&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;duration&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;0s&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 记录测试结果</span></span>
<span class="line"><span class="__shiki_1itgoe">    INSERT INTO</span><span class="__shiki_140thh"> recovery_test_results (</span></span>
<span class="line"><span class="__shiki_140thh">        test_time,</span></span>
<span class="line"><span class="__shiki_140thh">        plan_name,</span></span>
<span class="line"><span class="__shiki_140thh">        duration,</span></span>
<span class="line"><span class="__shiki_140thh">        success,</span></span>
<span class="line"><span class="__shiki_140thh">        details</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">        test_start,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;primary_failure_recovery&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">        now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> test_start,</span></span>
<span class="line"><span class="__shiki_140thh">        true,</span></span>
<span class="line"><span class="__shiki_140thh">        test_results</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;status&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;completed&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;test_time&#39;</span><span class="__shiki_140thh">, test_start,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;duration&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> test_start,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;steps&#39;</span><span class="__shiki_140thh">, test_results</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$;</span></span></code></pre></div><h2 id="五、最佳实践与性能优化" tabindex="-1">五、最佳实践与性能优化 <a class="header-anchor" href="#五、最佳实践与性能优化" aria-label="Permalink to &quot;五、最佳实践与性能优化&quot;">​</a></h2><h3 id="_5-1-复制架构设计最佳实践" tabindex="-1">5.1 复制架构设计最佳实践 <a class="header-anchor" href="#_5-1-复制架构设计最佳实践" aria-label="Permalink to &quot;5.1 复制架构设计最佳实践&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 高可用架构设计示例</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 三节点集群：1主2备，其中1个同步备库</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">架构：</span></span>
<span class="line"><span class="__shiki_21nrsd">Primary (同步提交到 standby1)</span></span>
<span class="line"><span class="__shiki_21nrsd">    ↓</span></span>
<span class="line"><span class="__shiki_21nrsd">standby1 (同步备库，可读)</span></span>
<span class="line"><span class="__shiki_21nrsd">    ↓</span></span>
<span class="line"><span class="__shiki_21nrsd">standby2 (异步备库，级联，可读)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">配置要点：</span></span>
<span class="line"><span class="__shiki_21nrsd">- 主库: synchronous_standby_names = &#39;standby1&#39;</span></span>
<span class="line"><span class="__shiki_21nrsd">- standby1: 配置为同步备库，hot_standby = on</span></span>
<span class="line"><span class="__shiki_21nrsd">- standby2: 通过standby1级联复制，减少主库负载</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 混合复制架构</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 物理复制用于高可用，逻辑复制用于数据分发</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">架构：</span></span>
<span class="line"><span class="__shiki_21nrsd">物理复制层：</span></span>
<span class="line"><span class="__shiki_21nrsd">Primary → standby1 (同步) → standby2 (异步)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">逻辑复制层：</span></span>
<span class="line"><span class="__shiki_21nrsd">Primary → reporting_db (逻辑复制，用于报表)</span></span>
<span class="line"><span class="__shiki_21nrsd">Primary → analytics_db (逻辑复制，用于分析)</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 跨地域复制架构</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 主中心（本地同步复制） + 灾备中心（异步复制）</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">本地数据中心：</span></span>
<span class="line"><span class="__shiki_21nrsd">Primary → standby_local1 (同步) → standby_local2 (异步)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">灾备数据中心：</span></span>
<span class="line"><span class="__shiki_21nrsd">Primary → standby_dr (异步，跨地域)</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 多活架构（双向逻辑复制）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 注意：需要谨慎处理冲突</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">节点A和节点B双向逻辑复制：</span></span>
<span class="line"><span class="__shiki_21nrsd">节点A: </span></span>
<span class="line"><span class="__shiki_21nrsd">  - 发布: pub_a</span></span>
<span class="line"><span class="__shiki_21nrsd">  - 订阅: sub_b (连接到节点B)</span></span>
<span class="line"><span class="__shiki_21nrsd">节点B:</span></span>
<span class="line"><span class="__shiki_21nrsd">  - 发布: pub_b  </span></span>
<span class="line"><span class="__shiki_21nrsd">  - 订阅: sub_a (连接到节点A)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">冲突解决策略：</span></span>
<span class="line"><span class="__shiki_21nrsd">- 基于时间戳的last-write-wins</span></span>
<span class="line"><span class="__shiki_21nrsd">- 基于业务规则的分区（如按用户ID哈希）</span></span>
<span class="line"><span class="__shiki_21nrsd">- 基于应用层的冲突检测和解决</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 监控架构设计</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 集中式监控数据库</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">监控架构：</span></span>
<span class="line"><span class="__shiki_21nrsd">所有数据库节点 → 监控代理 → 集中监控数据库</span></span>
<span class="line"><span class="__shiki_21nrsd">                                ↓</span></span>
<span class="line"><span class="__shiki_21nrsd">                        监控仪表板</span></span>
<span class="line"><span class="__shiki_21nrsd">                                ↓</span></span>
<span class="line"><span class="__shiki_21nrsd">                        告警系统</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span></code></pre></div><h3 id="_5-2-性能优化建议" tabindex="-1">5.2 性能优化建议 <a class="header-anchor" href="#_5-2-性能优化建议" aria-label="Permalink to &quot;5.2 性能优化建议&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 网络优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 调整TCP参数（在操作系统级别）</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">建议配置：</span></span>
<span class="line"><span class="__shiki_21nrsd">net.core.rmem_max = 16777216</span></span>
<span class="line"><span class="__shiki_21nrsd">net.core.wmem_max = 16777216</span></span>
<span class="line"><span class="__shiki_21nrsd">net.ipv4.tcp_rmem = 4096 87380 16777216</span></span>
<span class="line"><span class="__shiki_21nrsd">net.ipv4.tcp_wmem = 4096 65536 16777216</span></span>
<span class="line"><span class="__shiki_21nrsd">net.ipv4.tcp_window_scaling = 1</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. PostgreSQL复制参数优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 主库配置</span></span>
<span class="line"><span class="__shiki_140thh">wal_level </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> logical                    </span><span class="__shiki_21nrsd">-- 逻辑复制需要</span></span>
<span class="line"><span class="__shiki_140thh">max_wal_senders </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 20</span><span class="__shiki_21nrsd">                   -- 根据备库数量调整</span></span>
<span class="line"><span class="__shiki_140thh">wal_keep_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 10GB                   </span><span class="__shiki_21nrsd">-- 保留足够的WAL</span></span>
<span class="line"><span class="__shiki_140thh">wal_compression </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_21nrsd">                   -- 压缩WAL（PostgreSQL 9.5+）</span></span>
<span class="line"><span class="__shiki_1itgoe">synchronous_commit</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> remote_write      </span><span class="__shiki_21nrsd">-- 平衡性能和数据安全</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 备库配置</span></span>
<span class="line"><span class="__shiki_140thh">max_standby_streaming_delay </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 30s      </span><span class="__shiki_21nrsd">-- 备库查询取消延迟</span></span>
<span class="line"><span class="__shiki_140thh">max_standby_archive_delay </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 60s        </span><span class="__shiki_21nrsd">-- 归档延迟</span></span>
<span class="line"><span class="__shiki_140thh">hot_standby_feedback </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_21nrsd">              -- 避免查询冲突</span></span>
<span class="line"><span class="__shiki_140thh">wal_receiver_status_interval </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 10s     </span><span class="__shiki_21nrsd">-- 状态报告间隔</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 逻辑复制专用优化</span></span>
<span class="line"><span class="__shiki_140thh">max_logical_replication_workers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 8</span><span class="__shiki_21nrsd">    -- 逻辑复制工作进程</span></span>
<span class="line"><span class="__shiki_140thh">max_sync_workers_per_subscription </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_21nrsd">  -- 每个订阅的同步工作进程</span></span>
<span class="line"><span class="__shiki_140thh">logical_decoding_work_mem </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 64MB       </span><span class="__shiki_21nrsd">-- 逻辑解码内存</span></span>
<span class="line"><span class="__shiki_140thh">maintenance_work_mem </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 1GB             </span><span class="__shiki_21nrsd">-- 维护操作内存</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 磁盘I/O优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用SSD存储WAL文件</span></span>
<span class="line"><span class="__shiki_21nrsd">-- WAL文件单独存放于高速磁盘</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 调整预读和调度算法</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 内存优化</span></span>
<span class="line"><span class="__shiki_140thh">shared_buffers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 4GB                    </span><span class="__shiki_21nrsd">-- 共享缓冲区</span></span>
<span class="line"><span class="__shiki_140thh">work_mem </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 16MB                         </span><span class="__shiki_21nrsd">-- 工作内存</span></span>
<span class="line"><span class="__shiki_140thh">maintenance_work_mem </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 1GB              </span><span class="__shiki_21nrsd">-- 维护内存</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 批量操作优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 对于大批量数据操作，考虑：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 暂停复制，执行批量操作，然后重新启用</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用COPY代替多个INSERT</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 在事务外执行批量操作</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 7. 索引优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 在订阅者上创建适当的索引以加速应用</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 考虑在复制完成后创建索引，而不是复制过程中</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 8. 并行处理优化（PostgreSQL 13+）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 启用并行逻辑复制应用</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_140thh"> SUBSCRIPTION my_sub </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> (parallel </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true);</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SYSTEM</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_140thh"> max_parallel_apply_workers_per_subscription </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SYSTEM</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_140thh"> max_logical_replication_workers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 16</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 9. 流式复制优化（PostgreSQL 14+）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 启用流式逻辑复制</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_140thh"> SUBSCRIPTION my_sub </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> (streaming </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> parallel);</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SYSTEM</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_140thh"> logical_decoding_work_mem </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;128MB&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 10. 监控和调整</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 定期监控复制延迟</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 根据负载调整参数</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 实施自动扩展策略</span></span></code></pre></div><h2 id="六、故障排除与疑难解答" tabindex="-1">六、故障排除与疑难解答 <a class="header-anchor" href="#六、故障排除与疑难解答" aria-label="Permalink to &quot;六、故障排除与疑难解答&quot;">​</a></h2><h3 id="_6-1-常见问题与解决方案" tabindex="-1">6.1 常见问题与解决方案 <a class="header-anchor" href="#_6-1-常见问题与解决方案" aria-label="Permalink to &quot;6.1 常见问题与解决方案&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 复制延迟问题</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 诊断复制延迟</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    application_name,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_wal_lsn_diff(sent_lsn, replay_lsn) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> lag_bytes,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_wal_lsn_diff(sent_lsn, replay_lsn)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> lag_pretty,</span></span>
<span class="line"><span class="__shiki_140thh">    write_lag,</span></span>
<span class="line"><span class="__shiki_140thh">    flush_lag,</span></span>
<span class="line"><span class="__shiki_140thh">    replay_lag,</span></span>
<span class="line"><span class="__shiki_1itgoe">    state</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    sync_state</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_replication;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 延迟原因及解决：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- a) 网络问题：检查网络延迟和带宽</span></span>
<span class="line"><span class="__shiki_21nrsd">-- b) 磁盘I/O瓶颈：检查磁盘性能，考虑使用SSD</span></span>
<span class="line"><span class="__shiki_21nrsd">-- c) 备库负载过高：减少备库上的查询负载</span></span>
<span class="line"><span class="__shiki_21nrsd">-- d) WAL生成过快：优化主库写入，批量提交</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 复制中断问题</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 检查复制状态</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_stat_replication </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> state</span><span class="__shiki_1itgoe"> !=</span><span class="__shiki_mdbnqw"> &#39;streaming&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 常见中断原因：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- a) 网络中断：检查网络连接</span></span>
<span class="line"><span class="__shiki_21nrsd">-- b) 主备版本不兼容：确保版本匹配</span></span>
<span class="line"><span class="__shiki_21nrsd">-- c) 复制槽丢失：重新创建复制槽</span></span>
<span class="line"><span class="__shiki_21nrsd">-- d) WAL文件被清理：增加wal_keep_size</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 逻辑复制冲突</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看冲突信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_stat_subscription;</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_subscription_rel </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> srsubstate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;e&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 冲突解决步骤：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- a) 识别冲突类型（唯一约束、外键等）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- b) 手动解决冲突数据</span></span>
<span class="line"><span class="__shiki_21nrsd">-- c) 重新启用订阅</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_140thh"> SUBSCRIPTION my_sub </span><span class="__shiki_1itgoe">ENABLE</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. WAL磁盘空间不足</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 监控WAL使用</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    setting,</span></span>
<span class="line"><span class="__shiki_140thh">    unit,</span></span>
<span class="line"><span class="__shiki_140thh">    short_desc</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_settings </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;wal_keep_size&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;max_wal_size&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;checkpoint_segments&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 清理策略：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- a) 增加wal_keep_size</span></span>
<span class="line"><span class="__shiki_21nrsd">-- b) 更频繁的检查点</span></span>
<span class="line"><span class="__shiki_21nrsd">-- c) 清理旧的复制槽</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 备库无法启动</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 检查恢复日志</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> pg_last_wal_receive_lsn(), pg_last_wal_replay_lsn();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 常见问题：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- a) 恢复目标设置错误</span></span>
<span class="line"><span class="__shiki_21nrsd">-- b) WAL文件缺失</span></span>
<span class="line"><span class="__shiki_21nrsd">-- c) 权限问题</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 逻辑复制性能问题</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 监控逻辑复制性能</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS) </span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_stat_subscription;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 性能优化：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- a) 增加max_logical_replication_workers</span></span>
<span class="line"><span class="__shiki_21nrsd">-- b) 启用并行应用（PostgreSQL 13+）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- c) 优化订阅者表索引</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 7. 自动化诊断函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> diagnose_replication_issues</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    issue_type </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    severity </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    description</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    recommendation </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    check_query </span><span class="__shiki_1itgoe">TEXT</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查复制延迟</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;复制延迟过高&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">        CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> lag_bytes </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;high&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> lag_bytes </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;medium&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            ELSE</span><span class="__shiki_mdbnqw"> &#39;low&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;复制延迟: %s&#39;</span><span class="__shiki_140thh">, pg_size_pretty(lag_bytes)),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;优化网络、减少备库负载、调整复制参数&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;SELECT application_name, pg_wal_lsn_diff(sent_lsn, replay_lsn) FROM pg_stat_replication&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_dzsirb"> MAX</span><span class="__shiki_140thh">(pg_wal_lsn_diff(sent_lsn, replay_lsn)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> lag_bytes</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_stat_replication</span></span>
<span class="line"><span class="__shiki_140thh">    ) t</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> lag_bytes </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查复制中断</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;复制中断&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;high&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;一个或多个复制连接处于非streaming状态&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;检查网络连接、复制槽状态、WAL文件&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;SELECT * FROM pg_stat_replication WHERE state != &#39;&#39;streaming&#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_stat_replication </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> state</span><span class="__shiki_1itgoe"> !=</span><span class="__shiki_mdbnqw"> &#39;streaming&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查WAL空间</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;WAL空间压力&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;medium&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;WAL目录使用率可能过高&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;增加wal_keep_size，清理旧的复制槽，调整检查点频率&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;SELECT pg_size_pretty(pg_wal_lsn_diff(pg_current_wal_lsn(), restart_lsn)) FROM pg_replication_slots&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_replication_slots </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> pg_wal_lsn_diff(pg_current_wal_lsn(), restart_lsn) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查逻辑复制冲突</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;逻辑复制冲突&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;high&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;逻辑复制存在未解决的冲突&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;检查pg_subscription_rel表，手动解决冲突&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;SELECT * FROM pg_subscription_rel WHERE srsubstate = &#39;&#39;e&#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_subscription_rel </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> srsubstate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;e&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用诊断函数</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> diagnose_replication_issues();</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>PostgreSQL的物理复制和逻辑复制提供了强大而灵活的数据复制解决方案：</p><h3 id="核心要点总结" tabindex="-1">核心要点总结： <a class="header-anchor" href="#核心要点总结" aria-label="Permalink to &quot;核心要点总结：&quot;">​</a></h3><ol><li><p><strong>物理复制（流复制）</strong>：</p><ul><li>块级复制，保证数据物理一致性</li><li>适用于高可用和灾难恢复</li><li>配置简单，延迟低</li><li>支持同步和异步复制</li></ul></li><li><p><strong>逻辑复制</strong>：</p><ul><li>行级逻辑变更复制</li><li>支持表级选择性复制</li><li>适用于数据分发、数据汇聚、升级迁移</li><li>支持跨版本复制和双向复制</li></ul></li><li><p><strong>关键成功因素</strong>：</p><ul><li>合理的架构设计</li><li>全面的监控系统</li><li>自动化的维护流程</li><li>完善的灾难恢复计划</li></ul></li><li><p><strong>最佳实践</strong>：</p><ul><li>根据业务需求选择合适的复制类型</li><li>实施多层监控和告警</li><li>定期进行灾难恢复测试</li><li>持续优化复制性能</li></ul></li></ol><h3 id="选择指南" tabindex="-1">选择指南： <a class="header-anchor" href="#选择指南" aria-label="Permalink to &quot;选择指南：&quot;">​</a></h3><ul><li><strong>需要高可用和灾难恢复</strong> → 物理复制</li><li><strong>需要数据分发到多个目标</strong> → 逻辑复制</li><li><strong>需要跨版本升级</strong> → 逻辑复制</li><li><strong>需要双向数据同步</strong> → 逻辑复制（需谨慎处理冲突）</li><li><strong>需要最低延迟</strong> → 物理复制</li><li><strong>需要选择性复制表</strong> → 逻辑复制</li></ul><h3 id="未来趋势" tabindex="-1">未来趋势： <a class="header-anchor" href="#未来趋势" aria-label="Permalink to &quot;未来趋势：&quot;">​</a></h3><ol><li><strong>逻辑复制功能增强</strong>：更多DDL支持、更好的冲突解决</li><li><strong>多主复制改进</strong>：更好的冲突检测和解决机制</li><li><strong>云原生集成</strong>：与Kubernetes和云服务的深度集成</li><li><strong>机器学习优化</strong>：基于负载预测的自动参数调整</li></ol><p>通过深入理解和正确应用PostgreSQL的复制功能，可以构建出高可用、高性能、易维护的数据架构，满足现代应用对数据可用性和一致性的严苛要求。</p>`,72)])])}const d=a(p,[["render",l]]);export{r as __pageData,d as default};
