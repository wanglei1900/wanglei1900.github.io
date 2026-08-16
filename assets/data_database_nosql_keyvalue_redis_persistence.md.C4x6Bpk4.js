import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"NoSQL数据库 - 键值存储Redis：持久化机制(RDB/AOF)深度解析","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/nosql/keyvalue/redis/persistence.md","filePath":"data/database/nosql/keyvalue/redis/persistence.md"}'),_={name:"data/database/nosql/keyvalue/redis/persistence.md"};function l(e,s,h,c,t,r){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="nosql数据库-键值存储redis-持久化机制-rdb-aof-深度解析" tabindex="-1">NoSQL数据库 - 键值存储Redis：持久化机制(RDB/AOF)深度解析 <a class="header-anchor" href="#nosql数据库-键值存储redis-持久化机制-rdb-aof-深度解析" aria-label="Permalink to &quot;NoSQL数据库 - 键值存储Redis：持久化机制(RDB/AOF)深度解析&quot;">​</a></h1><h2 id="一、redis持久化概述" tabindex="-1">一、Redis持久化概述 <a class="header-anchor" href="#一、redis持久化概述" aria-label="Permalink to &quot;一、Redis持久化概述&quot;">​</a></h2><h3 id="_1-1-为什么需要持久化" tabindex="-1">1.1 为什么需要持久化？ <a class="header-anchor" href="#_1-1-为什么需要持久化" aria-label="Permalink to &quot;1.1 为什么需要持久化？&quot;">​</a></h3><p>Redis是内存数据库，数据存储在内存中。持久化解决的核心问题：</p><ul><li><strong>数据持久保存</strong>：防止服务器重启或崩溃导致数据丢失</li><li><strong>灾难恢复</strong>：从持久化文件中恢复数据</li><li><strong>数据备份</strong>：用于数据迁移、复制等场景</li><li><strong>数据一致性</strong>：在分布式环境中保证数据可靠性</li></ul><h3 id="_1-2-redis持久化架构" tabindex="-1">1.2 Redis持久化架构 <a class="header-anchor" href="#_1-2-redis持久化架构" aria-label="Permalink to &quot;1.2 Redis持久化架构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│          Redis Server                │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│       数据操作层 (内存数据库)         │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │              │              │    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ▼              ▼              ▼    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ RDB持久化      AOF持久化     混合持久化  │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│         操作系统文件系统              │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────┘</span></span></code></pre></div><h2 id="二、rdb持久化机制" tabindex="-1">二、RDB持久化机制 <a class="header-anchor" href="#二、rdb持久化机制" aria-label="Permalink to &quot;二、RDB持久化机制&quot;">​</a></h2><h3 id="_2-1-rdb概述" tabindex="-1">2.1 RDB概述 <a class="header-anchor" href="#_2-1-rdb概述" aria-label="Permalink to &quot;2.1 RDB概述&quot;">​</a></h3><p>RDB（Redis DataBase）是Redis的<strong>快照式持久化</strong>，在指定时间间隔将内存中的数据集快照写入磁盘。</p><h3 id="_2-2-rdb文件结构" tabindex="-1">2.2 RDB文件结构 <a class="header-anchor" href="#_2-2-rdb文件结构" aria-label="Permalink to &quot;2.2 RDB文件结构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────┬─────────────────┬──────────────┬──────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│  REDIS  (5字节) │  RDB版本 (4字节) │  AUX字段      │  DB数据   │ ...</span></span>
<span class="line"><span class="__shiki_wvjl67">│  &quot;REDIS&quot;        │  &quot;0009&quot;         │  key-value对 │  数据库内容 │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────┴─────────────────┴──────────────┴──────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">数据库内容结构：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────┬──────────────────┬──────────────────┬────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│ SELECTDB    │ 数据库编号        │ 键值对数量       │ 过期键值对  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 0xFE        │ (变长编码)        │ (变长编码)       │  特殊操作   │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────┴──────────────────┴──────────────────┴────────────┘</span></span></code></pre></div><h3 id="_2-3-rdb触发机制" tabindex="-1">2.3 RDB触发机制 <a class="header-anchor" href="#_2-3-rdb触发机制" aria-label="Permalink to &quot;2.3 RDB触发机制&quot;">​</a></h3><h4 id="_2-3-1-自动触发" tabindex="-1">2.3.1 自动触发 <a class="header-anchor" href="#_2-3-1-自动触发" aria-label="Permalink to &quot;2.3.1 自动触发&quot;">​</a></h4><p>配置文件设置（redis.conf）：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 满足以下任一条件即触发BGSAVE</span></span>
<span class="line"><span class="__shiki_mdbnqw">save 900 1</span><span class="__shiki_21nrsd">      # 900秒内至少有1个key被修改</span></span>
<span class="line"><span class="__shiki_mdbnqw">save 300 10</span><span class="__shiki_21nrsd">     # 300秒内至少有10个key被修改  </span></span>
<span class="line"><span class="__shiki_mdbnqw">save 60 10000</span><span class="__shiki_21nrsd">   # 60秒内至少有10000个key被修改</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 其他相关配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">dbfilename dump.rdb</span><span class="__shiki_21nrsd">        # RDB文件名</span></span>
<span class="line"><span class="__shiki_mdbnqw">dir ./</span><span class="__shiki_21nrsd">                     # 存储目录</span></span>
<span class="line"><span class="__shiki_mdbnqw">rdbcompression yes</span><span class="__shiki_21nrsd">         # 是否压缩（LZF算法）</span></span>
<span class="line"><span class="__shiki_mdbnqw">rdbchecksum yes</span><span class="__shiki_21nrsd">           # 是否校验和</span></span>
<span class="line"><span class="__shiki_mdbnqw">stop-writes-on-bgsave-error yes</span><span class="__shiki_21nrsd">  # BGSAVE出错时停止写入</span></span></code></pre></div><h4 id="_2-3-2-手动触发" tabindex="-1">2.3.2 手动触发 <a class="header-anchor" href="#_2-3-2-手动触发" aria-label="Permalink to &quot;2.3.2 手动触发&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. SAVE命令（同步，会阻塞）</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_mdbnqw">SAVE</span><span class="__shiki_21nrsd">  # 阻塞直到RDB创建完成</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. BGSAVE命令（异步，非阻塞）</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_mdbnqw">BGSAVE</span><span class="__shiki_21nrsd">  # 后台执行，立即返回&quot;Background saving started&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 通过配置文件自动触发</span></span>
<span class="line"><span class="__shiki_21nrsd"># 4. SHUTDOWN命令（正常关闭时自动执行SAVE）</span></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 主从复制时，从节点连接会触发主节点执行BGSAVE</span></span></code></pre></div><h3 id="_2-4-rdb执行流程" tabindex="-1">2.4 RDB执行流程 <a class="header-anchor" href="#_2-4-rdb执行流程" aria-label="Permalink to &quot;2.4 RDB执行流程&quot;">​</a></h3><h4 id="_2-4-1-bgsave实现原理" tabindex="-1">2.4.1 BGSAVE实现原理 <a class="header-anchor" href="#_2-4-1-bgsave实现原理" aria-label="Permalink to &quot;2.4.1 BGSAVE实现原理&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">主进程                              子进程</span></span>
<span class="line"><span class="__shiki_wvjl67">  │                                   │</span></span>
<span class="line"><span class="__shiki_wvjl67">  │ 1. 接收BGSAVE命令                  │</span></span>
<span class="line"><span class="__shiki_wvjl67">  │ 2. 检查是否有其他持久化进程运行    │</span></span>
<span class="line"><span class="__shiki_wvjl67">  │ 3. 调用fork()创建子进程            │──────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">  │ 4. 继续处理客户端请求              │      │</span></span>
<span class="line"><span class="__shiki_wvjl67">  │    │                              │      │</span></span>
<span class="line"><span class="__shiki_wvjl67">  │    │                              │ 5. 子进程开始工作</span></span>
<span class="line"><span class="__shiki_wvjl67">  │    │                              │ 6. 遍历所有数据库</span></span>
<span class="line"><span class="__shiki_wvjl67">  │    │                              │ 7. 将数据写入临时RDB文件</span></span>
<span class="line"><span class="__shiki_wvjl67">  │    │                              │ 8. 原子替换旧RDB文件</span></span>
<span class="line"><span class="__shiki_wvjl67">  │    │                              │ 9. 向父进程发送信号</span></span>
<span class="line"><span class="__shiki_wvjl67">  │    │◄─────────────────────────────│</span></span>
<span class="line"><span class="__shiki_wvjl67">  │ 10. 处理子进程完成信号            │</span></span>
<span class="line"><span class="__shiki_wvjl67">  │ 11. 更新持久化状态信息            │</span></span>
<span class="line"><span class="__shiki_wvjl67">  │                                   │</span></span></code></pre></div><h4 id="_2-4-2-核心源码分析" tabindex="-1">2.4.2 核心源码分析 <a class="header-anchor" href="#_2-4-2-核心源码分析" aria-label="Permalink to &quot;2.4.2 核心源码分析&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// src/rdb.c</span></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> saveCommand</span><span class="__shiki_140thh">(client </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">c</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // SAVE命令同步执行</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (server.rdb_child_pid </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        addReplyError</span><span class="__shiki_140thh">(c,</span><span class="__shiki_mdbnqw">&quot;Background save already in progress&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    rdbSaveInfo rsi, </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">rsiptr;</span></span>
<span class="line"><span class="__shiki_140thh">    rsiptr </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> rdbPopulateSaveInfo</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">rsi);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">rdbSave</span><span class="__shiki_140thh">(server.rdb_filename,rsiptr) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> C_OK) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        addReply</span><span class="__shiki_140thh">(c,shared.ok);</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        addReply</span><span class="__shiki_140thh">(c,shared.err);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> bgsaveCommand</span><span class="__shiki_140thh">(client </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">c</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // BGSAVE命令异步执行</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (server.rdb_child_pid </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        addReplyError</span><span class="__shiki_140thh">(c,</span><span class="__shiki_mdbnqw">&quot;Background save already in progress&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (server.aof_child_pid </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        addReplyError</span><span class="__shiki_140thh">(c,</span><span class="__shiki_mdbnqw">&quot;Can&#39;t BGSAVE while AOF log rewriting is in progress&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">rdbSaveBackground</span><span class="__shiki_140thh">(server.rdb_filename,</span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> C_OK) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        addReplyStatus</span><span class="__shiki_140thh">(c,</span><span class="__shiki_mdbnqw">&quot;Background saving started&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        addReply</span><span class="__shiki_140thh">(c,shared.err);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> rdbSaveBackground</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">filename</span><span class="__shiki_140thh">, rdbSaveInfo </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">rsi</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    pid_t</span><span class="__shiki_140thh"> childpid;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (server.aof_child_pid </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> server.rdb_child_pid </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh"> C_ERR;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    server.dirty_before_bgsave </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> server.dirty;</span></span>
<span class="line"><span class="__shiki_140thh">    server.lastbgsave_try </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> time</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> ((childpid </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> redisFork</span><span class="__shiki_140thh">(CHILD_TYPE_RDB)) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 子进程</span></span>
<span class="line"><span class="__shiki_1t8gfj">        redisSetProcTitle</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;redis-rdb-bgsave&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        redisSetCpuAffinity</span><span class="__shiki_140thh">(server.bgsave_cpulist);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 执行RDB保存</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">rdbSave</span><span class="__shiki_140thh">(filename,rsi) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> C_OK) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            size_t</span><span class="__shiki_140thh"> private_dirty </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> zmalloc_get_private_dirty</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (private_dirty) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">                serverLog</span><span class="__shiki_140thh">(LL_NOTICE,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;RDB: </span><span class="__shiki_dzsirb">%zu</span><span class="__shiki_mdbnqw"> MB of memory used by copy-on-write&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    private_dirty</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_1t8gfj">            exitFromChild</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            exitFromChild</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 父进程</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (childpid </span><span class="__shiki_1itgoe">==</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            server.lastbgsave_status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> C_ERR;</span></span>
<span class="line"><span class="__shiki_1t8gfj">            serverLog</span><span class="__shiki_140thh">(LL_WARNING,</span><span class="__shiki_mdbnqw">&quot;Can&#39;t save in background: fork: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">                strerror</span><span class="__shiki_140thh">(errno));</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> C_ERR;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1t8gfj">        serverLog</span><span class="__shiki_140thh">(LL_NOTICE,</span><span class="__shiki_mdbnqw">&quot;Background saving started by pid </span><span class="__shiki_dzsirb">%ld</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">,(</span><span class="__shiki_1itgoe">long</span><span class="__shiki_140thh">) childpid);</span></span>
<span class="line"><span class="__shiki_140thh">        server.rdb_child_pid </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> childpid;</span></span>
<span class="line"><span class="__shiki_140thh">        server.rdb_child_type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> RDB_CHILD_TYPE_DISK;</span></span>
<span class="line"><span class="__shiki_1t8gfj">        updateDictResizePolicy</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> C_OK;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> C_OK;</span><span class="__shiki_21nrsd"> /* unreached */</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-5-写时复制-copy-on-write-技术" tabindex="-1">2.5 写时复制（Copy-On-Write）技术 <a class="header-anchor" href="#_2-5-写时复制-copy-on-write-技术" aria-label="Permalink to &quot;2.5 写时复制（Copy-On-Write）技术&quot;">​</a></h3><h4 id="_2-5-1-cow原理" tabindex="-1">2.5.1 COW原理 <a class="header-anchor" href="#_2-5-1-cow原理" aria-label="Permalink to &quot;2.5.1 COW原理&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">进程A内存空间                    进程B内存空间</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────┐              ┌─────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 页表            │ fork()       │ 复制页表         │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 指向物理页      │─────────────▶│ 指向相同物理页    │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────┘              └─────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">         │                               │</span></span>
<span class="line"><span class="__shiki_wvjl67">         │ 共享相同的物理内存页           │</span></span>
<span class="line"><span class="__shiki_wvjl67">         ▼                               ▼</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────┐              ┌─────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 物理内存页       │◀─────────────│ 相同的物理内存页  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ (实际数据)       │               │                 │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────┘              └─────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">当进程A修改数据时：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────┐              ┌─────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 页表            │              │ 页表            │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 指向新的物理页   │              │ 仍指向旧物理页   │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────┘              └─────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">         │                               │</span></span>
<span class="line"><span class="__shiki_wvjl67">         ▼                               ▼</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────┐              ┌─────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 新物理内存页     │               │ 旧物理内存页     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ (修改后数据)     │               │ (原始数据)       │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────┘              └─────────────────┘</span></span></code></pre></div><h4 id="_2-5-2-cow的内存影响" tabindex="-1">2.5.2 COW的内存影响 <a class="header-anchor" href="#_2-5-2-cow的内存影响" aria-label="Permalink to &quot;2.5.2 COW的内存影响&quot;">​</a></h4><ul><li><strong>内存增长</strong>：子进程保存期间，如果父进程修改数据，会复制内存页</li><li><strong>内存峰值</strong>：最坏情况下，内存占用可能翻倍</li><li><strong>优化建议</strong>： <ul><li>避免在BGSAVE期间大量写入</li><li>使用<code>vm.overcommit_memory = 1</code>（Linux）</li><li>监控<code>used_memory</code>和<code>used_memory_peak</code></li></ul></li></ul><h3 id="_2-6-rdb数据编码格式" tabindex="-1">2.6 RDB数据编码格式 <a class="header-anchor" href="#_2-6-rdb数据编码格式" aria-label="Permalink to &quot;2.6 RDB数据编码格式&quot;">​</a></h3><h4 id="_2-6-1-值类型编码" tabindex="-1">2.6.1 值类型编码 <a class="header-anchor" href="#_2-6-1-值类型编码" aria-label="Permalink to &quot;2.6.1 值类型编码&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// RDB文件中的数据类型标记</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> RDB_TYPE_STRING</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> RDB_TYPE_LIST</span><span class="__shiki_dzsirb">   1</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> RDB_TYPE_SET</span><span class="__shiki_dzsirb">    2</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> RDB_TYPE_ZSET</span><span class="__shiki_dzsirb">   3</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> RDB_TYPE_HASH</span><span class="__shiki_dzsirb">   4</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> RDB_TYPE_ZSET_2</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_21nrsd">  // ZSET版本2</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> RDB_TYPE_MODULE</span><span class="__shiki_dzsirb"> 6</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> RDB_TYPE_MODULE_2</span><span class="__shiki_dzsirb"> 7</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> RDB_TYPE_HASH_ZIPMAP</span><span class="__shiki_dzsirb"> 9</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> RDB_TYPE_LIST_ZIPLIST</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> RDB_TYPE_SET_INTSET</span><span class="__shiki_dzsirb"> 11</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> RDB_TYPE_ZSET_ZIPLIST</span><span class="__shiki_dzsirb"> 12</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> RDB_TYPE_HASH_ZIPLIST</span><span class="__shiki_dzsirb"> 13</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> RDB_TYPE_LIST_QUICKLIST</span><span class="__shiki_dzsirb"> 14</span></span></code></pre></div><h4 id="_2-6-2-字符串编码示例" tabindex="-1">2.6.2 字符串编码示例 <a class="header-anchor" href="#_2-6-2-字符串编码示例" aria-label="Permalink to &quot;2.6.2 字符串编码示例&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">字符串&quot;hello&quot;在RDB中的存储：</span></span>
<span class="line"><span class="__shiki_wvjl67">+------+-------+-------+</span></span>
<span class="line"><span class="__shiki_wvjl67">| 类型 | 长度  | 数据   |</span></span>
<span class="line"><span class="__shiki_wvjl67">| 0x00 | 0x05  | hello |</span></span>
<span class="line"><span class="__shiki_wvjl67">+------+-------+-------+</span></span>
<span class="line"><span class="__shiki_wvjl67">(5字节)</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">整数12345在RDB中的存储：</span></span>
<span class="line"><span class="__shiki_wvjl67">+------+-------------------+</span></span>
<span class="line"><span class="__shiki_wvjl67">| 类型 | 整数编码         |</span></span>
<span class="line"><span class="__shiki_wvjl67">| 0xFC | 0xC039 (12345)   |</span></span>
<span class="line"><span class="__shiki_wvjl67">+------+-------------------+</span></span></code></pre></div><h3 id="_2-7-rdb优缺点分析" tabindex="-1">2.7 RDB优缺点分析 <a class="header-anchor" href="#_2-7-rdb优缺点分析" aria-label="Permalink to &quot;2.7 RDB优缺点分析&quot;">​</a></h3><h4 id="优点" tabindex="-1">优点： <a class="header-anchor" href="#优点" aria-label="Permalink to &quot;优点：&quot;">​</a></h4><ol><li><strong>紧凑的二进制格式</strong>：文件小，适合备份和传输</li><li><strong>快速恢复</strong>：直接加载到内存，恢复速度快</li><li><strong>最大化性能</strong>：父进程不需要磁盘I/O</li><li><strong>适合灾难恢复</strong>：完整的数据库快照</li></ol><h4 id="缺点" tabindex="-1">缺点： <a class="header-anchor" href="#缺点" aria-label="Permalink to &quot;缺点：&quot;">​</a></h4><ol><li><strong>数据丢失风险</strong>：两次快照之间的数据可能丢失</li><li><strong>fork性能问题</strong>：大数据集时fork可能阻塞</li><li><strong>文件一致性</strong>：RDB文件可能不完整（崩溃时）</li></ol><h2 id="三、aof持久化机制" tabindex="-1">三、AOF持久化机制 <a class="header-anchor" href="#三、aof持久化机制" aria-label="Permalink to &quot;三、AOF持久化机制&quot;">​</a></h2><h3 id="_3-1-aof概述" tabindex="-1">3.1 AOF概述 <a class="header-anchor" href="#_3-1-aof概述" aria-label="Permalink to &quot;3.1 AOF概述&quot;">​</a></h3><p>AOF（Append Only File）通过记录所有写操作命令来持久化数据，类似于数据库的<strong>写前日志（WAL）</strong>。</p><h3 id="_3-2-aof文件结构" tabindex="-1">3.2 AOF文件结构 <a class="header-anchor" href="#_3-2-aof文件结构" aria-label="Permalink to &quot;3.2 AOF文件结构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">*3              # 3个元素</span></span>
<span class="line"><span class="__shiki_wvjl67">$3              # 第一个元素长度3</span></span>
<span class="line"><span class="__shiki_wvjl67">SET             # 命令</span></span>
<span class="line"><span class="__shiki_wvjl67">$5              # 键长度</span></span>
<span class="line"><span class="__shiki_wvjl67">mykey           # 键</span></span>
<span class="line"><span class="__shiki_wvjl67">$7              # 值长度</span></span>
<span class="line"><span class="__shiki_wvjl67">myvalue         # 值</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">实际AOF文件内容：</span></span>
<span class="line"><span class="__shiki_wvjl67">*3\\r\\n$3\\r\\nSET\\r\\n$5\\r\\nmykey\\r\\n$7\\r\\nmyvalue\\r\\n</span></span></code></pre></div><h3 id="_3-3-aof工作流程" tabindex="-1">3.3 AOF工作流程 <a class="header-anchor" href="#_3-3-aof工作流程" aria-label="Permalink to &quot;3.3 AOF工作流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                    Redis Server                          │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│  执行命令 → 命令传播到AOF → 写入AOF缓冲区 → 同步到磁盘     │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">         │              │              │           │</span></span>
<span class="line"><span class="__shiki_wvjl67">         │              │              │           │</span></span>
<span class="line"><span class="__shiki_wvjl67">         ▼              ▼              ▼           ▼</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│  处理结果   AOF命令      aof_buf缓冲区   AOF文件          │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_3-4-aof持久化策略" tabindex="-1">3.4 AOF持久化策略 <a class="header-anchor" href="#_3-4-aof持久化策略" aria-label="Permalink to &quot;3.4 AOF持久化策略&quot;">​</a></h3><h4 id="_3-4-1-三种刷盘策略" tabindex="-1">3.4.1 三种刷盘策略 <a class="header-anchor" href="#_3-4-1-三种刷盘策略" aria-label="Permalink to &quot;3.4.1 三种刷盘策略&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># redis.conf配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">appendonly yes</span><span class="__shiki_21nrsd">                    # 开启AOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">appendfilename &quot;appendonly.aof&quot;</span><span class="__shiki_21nrsd">   # AOF文件名</span></span>
<span class="line"><span class="__shiki_mdbnqw">appendfsync everysec</span><span class="__shiki_21nrsd">              # 刷盘策略</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 策略说明：</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. appendfsync always     每个命令都同步，最安全，性能最差</span></span>
<span class="line"><span class="__shiki_21nrsd"># 2. appendfsync everysec   每秒同步一次，平衡方案（默认）</span></span>
<span class="line"><span class="__shiki_21nrsd"># 3. appendfsync no         由操作系统决定，性能最好，最不安全</span></span></code></pre></div><h4 id="_3-4-2-策略实现源码" tabindex="-1">3.4.2 策略实现源码 <a class="header-anchor" href="#_3-4-2-策略实现源码" aria-label="Permalink to &quot;3.4.2 策略实现源码&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// src/aof.c</span></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> flushAppendOnlyFile</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> force</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssize_t</span><span class="__shiki_140thh"> nwritten;</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> sync_in_progress </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">sdslen</span><span class="__shiki_140thh">(server.aof_buf) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (server.aof_fsync </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> AOF_FSYNC_EVERYSEC)</span></span>
<span class="line"><span class="__shiki_140thh">        sync_in_progress </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> bioPendingJobsOfType</span><span class="__shiki_140thh">(BIO_AOF_FSYNC) </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 写入操作系统缓冲区</span></span>
<span class="line"><span class="__shiki_140thh">    nwritten </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> aofWrite</span><span class="__shiki_140thh">(server.aof_fd,server.aof_buf,</span><span class="__shiki_1t8gfj">sdslen</span><span class="__shiki_140thh">(server.aof_buf));</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 根据策略同步到磁盘</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (server.aof_fsync </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> AOF_FSYNC_ALWAYS) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // always策略：立即同步</span></span>
<span class="line"><span class="__shiki_1t8gfj">        redis_fsync</span><span class="__shiki_140thh">(server.aof_fd);</span></span>
<span class="line"><span class="__shiki_140thh">        server.aof_last_fsync </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> server.unixtime;</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (server.aof_fsync </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> AOF_FSYNC_EVERYSEC) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // everysec策略：异步同步</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">sync_in_progress) </span><span class="__shiki_1t8gfj">aof_background_fsync</span><span class="__shiki_140thh">(server.aof_fd);</span></span>
<span class="line"><span class="__shiki_140thh">        server.aof_last_fsync </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> server.unixtime;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_21nrsd">    // no策略：不主动同步，由操作系统决定</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-5-aof重写-rewrite-机制" tabindex="-1">3.5 AOF重写（Rewrite）机制 <a class="header-anchor" href="#_3-5-aof重写-rewrite-机制" aria-label="Permalink to &quot;3.5 AOF重写（Rewrite）机制&quot;">​</a></h3><h4 id="_3-5-1-为什么需要aof重写" tabindex="-1">3.5.1 为什么需要AOF重写？ <a class="header-anchor" href="#_3-5-1-为什么需要aof重写" aria-label="Permalink to &quot;3.5.1 为什么需要AOF重写？&quot;">​</a></h4><ul><li>AOF文件持续增长，可能占用大量磁盘空间</li><li>恢复时间变长</li><li>包含冗余命令（如多次SET同一个key）</li></ul><h4 id="_3-5-2-aof重写触发条件" tabindex="-1">3.5.2 AOF重写触发条件 <a class="header-anchor" href="#_3-5-2-aof重写触发条件" aria-label="Permalink to &quot;3.5.2 AOF重写触发条件&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 自动重写配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">auto-aof-rewrite-percentage 100</span><span class="__shiki_21nrsd">   # 当前AOF文件比上次重写后大小增长100%</span></span>
<span class="line"><span class="__shiki_mdbnqw">auto-aof-rewrite-min-size 64mb</span><span class="__shiki_21nrsd">    # AOF文件至少64MB才重写</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 手动触发</span></span>
<span class="line"><span class="__shiki_mdbnqw">redis-cli&gt; BGREWRITEAOF</span></span></code></pre></div><h4 id="_3-5-3-aof重写流程" tabindex="-1">3.5.3 AOF重写流程 <a class="header-anchor" href="#_3-5-3-aof重写流程" aria-label="Permalink to &quot;3.5.3 AOF重写流程&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">主进程                              子进程</span></span>
<span class="line"><span class="__shiki_wvjl67">  │                                   │</span></span>
<span class="line"><span class="__shiki_wvjl67">  │ 1. 接收BGREWRITEAOF命令            │</span></span>
<span class="line"><span class="__shiki_wvjl67">  │ 2. fork()创建子进程                │──────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">  │ 3. 继续处理客户端请求              │      │</span></span>
<span class="line"><span class="__shiki_wvjl67">  │    │                              │ 4. 子进程开始重写</span></span>
<span class="line"><span class="__shiki_wvjl67">  │    │ 5. 写入重写缓冲区             │ 5. 读取内存数据快照</span></span>
<span class="line"><span class="__shiki_wvjl67">  │    │ (新命令)                      │ 6. 生成新AOF临时文件</span></span>
<span class="line"><span class="__shiki_wvjl67">  │    │◄─────────────────────────────│ 7. 完成，通知父进程</span></span>
<span class="line"><span class="__shiki_wvjl67">  │ 8. 将重写缓冲区的命令追加到新文件   │      │</span></span>
<span class="line"><span class="__shiki_wvjl67">  │ 9. 原子替换旧AOF文件               │      │</span></span>
<span class="line"><span class="__shiki_wvjl67">  │ 10. 继续将新命令写入新AOF文件       │      │</span></span>
<span class="line"><span class="__shiki_wvjl67">  │                                   │      │</span></span></code></pre></div><h4 id="_3-5-4-aof重写源码解析" tabindex="-1">3.5.4 AOF重写源码解析 <a class="header-anchor" href="#_3-5-4-aof重写源码解析" aria-label="Permalink to &quot;3.5.4 AOF重写源码解析&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// src/aof.c</span></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> rewriteAppendOnlyFile</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">filename</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    rio aof;</span></span>
<span class="line"><span class="__shiki_140thh">    FILE </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">fp;</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1jdh33"> tmpfile</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">256</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_1itgoe">    long</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_140thh"> now </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> mstime</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建临时文件</span></span>
<span class="line"><span class="__shiki_1t8gfj">    snprintf</span><span class="__shiki_140thh">(tmpfile,</span><span class="__shiki_dzsirb">256</span><span class="__shiki_140thh">,</span><span class="__shiki_mdbnqw">&quot;temp-rewriteaof-</span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">.aof&quot;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">getpid</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    fp </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> fopen</span><span class="__shiki_140thh">(tmpfile,</span><span class="__shiki_mdbnqw">&quot;w&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 初始化rio结构</span></span>
<span class="line"><span class="__shiki_1t8gfj">    rioInitWithFile</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">aof,fp);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 设置AOF重写处理函数</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">rioWrite</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">aof,</span><span class="__shiki_mdbnqw">&quot;REDIS&quot;</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">goto</span><span class="__shiki_140thh"> werr;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 遍历所有数据库</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (j </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; j </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> server.dbnum; j</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 写入SELECT DB命令</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 遍历数据库中的所有key</span></span>
<span class="line"><span class="__shiki_1itgoe">        while</span><span class="__shiki_140thh">((de </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> dictNext</span><span class="__shiki_140thh">(di)) </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> NULL</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            sds keystr </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> dictGetKey</span><span class="__shiki_140thh">(de);</span></span>
<span class="line"><span class="__shiki_140thh">            robj key, </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">o </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> dictGetVal</span><span class="__shiki_140thh">(de);</span></span>
<span class="line"><span class="__shiki_1itgoe">            long</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_140thh"> expiretime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> getExpire</span><span class="__shiki_140thh">(db,</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">key);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 根据数据类型生成最小命令集</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (o-&gt;type </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> OBJ_STRING) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 生成SET命令</span></span>
<span class="line"><span class="__shiki_1t8gfj">                emitSETKey</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">aof,dbid,keystr,o,expiretime);</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (o-&gt;type </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> OBJ_LIST) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 生成RPUSH命令</span></span>
<span class="line"><span class="__shiki_1t8gfj">                rewriteListObject</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">aof,keystr,o,expiretime);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_21nrsd">            // ... 其他数据类型</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    fclose</span><span class="__shiki_140thh">(fp);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> C_OK;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-6-aof重写缓冲区与aof缓冲区" tabindex="-1">3.6 AOF重写缓冲区与AOF缓冲区 <a class="header-anchor" href="#_3-6-aof重写缓冲区与aof缓冲区" aria-label="Permalink to &quot;3.6 AOF重写缓冲区与AOF缓冲区&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│              Redis Server                        │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 执行命令 → 传播到AOF → 写入aof_buf → 同步到AOF文件 │</span></span>
<span class="line"><span class="__shiki_wvjl67">│         │        │           │                  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│         │        │           │                  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│         ▼        ▼           ▼                  ▼</span></span>
<span class="line"><span class="__shiki_wvjl67">│      客户端  重写缓冲区   AOF缓冲区           磁盘AOF文件</span></span>
<span class="line"><span class="__shiki_wvjl67">│                │                              │</span></span>
<span class="line"><span class="__shiki_wvjl67">│                │  重写期间的新命令            │</span></span>
<span class="line"><span class="__shiki_wvjl67">│                └─────────────┐                │</span></span>
<span class="line"><span class="__shiki_wvjl67">│                              │                │</span></span>
<span class="line"><span class="__shiki_wvjl67">│                   子进程重写完成时追加           │</span></span>
<span class="line"><span class="__shiki_wvjl67">└──────────────────────────────┼────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">                               ▼</span></span>
<span class="line"><span class="__shiki_wvjl67">                        新AOF文件（重写后）</span></span></code></pre></div><h3 id="_3-7-aof文件修复" tabindex="-1">3.7 AOF文件修复 <a class="header-anchor" href="#_3-7-aof文件修复" aria-label="Permalink to &quot;3.7 AOF文件修复&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># AOF文件可能损坏，Redis提供修复工具</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-check-aof</span><span class="__shiki_dzsirb"> --fix</span><span class="__shiki_mdbnqw"> appendonly.aof</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 修复原理：</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 扫描AOF文件，找到格式错误的位置</span></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 截断到最后一个有效命令</span></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 重新生成AOF文件</span></span></code></pre></div><h3 id="_3-8-aof优缺点分析" tabindex="-1">3.8 AOF优缺点分析 <a class="header-anchor" href="#_3-8-aof优缺点分析" aria-label="Permalink to &quot;3.8 AOF优缺点分析&quot;">​</a></h3><h4 id="优点-1" tabindex="-1">优点： <a class="header-anchor" href="#优点-1" aria-label="Permalink to &quot;优点：&quot;">​</a></h4><ol><li><strong>数据安全</strong>：最多丢失1秒数据（everysec策略）</li><li><strong>可读性强</strong>：文本格式，便于调试和修复</li><li><strong>容错性好</strong>：AOF文件损坏可通过工具修复</li><li><strong>灵活的策略</strong>：可根据需求调整同步频率</li></ol><h4 id="缺点-1" tabindex="-1">缺点： <a class="header-anchor" href="#缺点-1" aria-label="Permalink to &quot;缺点：&quot;">​</a></h4><ol><li><strong>文件体积大</strong>：相同数据集比RDB文件大</li><li><strong>恢复速度慢</strong>：需要重新执行所有命令</li><li><strong>写入性能影响</strong>：AOF同步对性能有一定影响</li><li><strong>重写期间内存占用</strong>：fork子进程可能导致内存翻倍</li></ol><h2 id="四、混合持久化-rdb-aof" tabindex="-1">四、混合持久化（RDB + AOF） <a class="header-anchor" href="#四、混合持久化-rdb-aof" aria-label="Permalink to &quot;四、混合持久化（RDB + AOF）&quot;">​</a></h2><h3 id="_4-1-混合持久化概述" tabindex="-1">4.1 混合持久化概述 <a class="header-anchor" href="#_4-1-混合持久化概述" aria-label="Permalink to &quot;4.1 混合持久化概述&quot;">​</a></h3><p>Redis 4.0+引入，结合RDB和AOF的优点：</p><ul><li><strong>快速加载</strong>：使用RDB格式作为数据基础</li><li><strong>低丢失风险</strong>：AOF记录增量变化</li></ul><h3 id="_4-2-混合持久化文件结构" tabindex="-1">4.2 混合持久化文件结构 <a class="header-anchor" href="#_4-2-混合持久化文件结构" aria-label="Permalink to &quot;4.2 混合持久化文件结构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                    AOF文件                            │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│  RDB格式数据     │          AOF格式增量命令             │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  (二进制)        │          (文本协议)                 │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">↑                   ↑</span></span>
<span class="line"><span class="__shiki_wvjl67">RDB部分              AOF部分</span></span></code></pre></div><h3 id="_4-3-混合持久化配置" tabindex="-1">4.3 混合持久化配置 <a class="header-anchor" href="#_4-3-混合持久化配置" aria-label="Permalink to &quot;4.3 混合持久化配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 开启AOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">appendonly yes</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 开启混合持久化（Redis 4.0+）</span></span>
<span class="line"><span class="__shiki_mdbnqw">aof-use-rdb-preamble yes</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># AOF重写时自动使用混合格式</span></span>
<span class="line"><span class="__shiki_21nrsd"># 重写后的AOF文件包含：</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. RDB格式的全量数据（快速加载）</span></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 后续的AOF格式增量命令</span></span></code></pre></div><h3 id="_4-4-混合持久化加载流程" tabindex="-1">4.4 混合持久化加载流程 <a class="header-anchor" href="#_4-4-混合持久化加载流程" aria-label="Permalink to &quot;4.4 混合持久化加载流程&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// src/aof.c - 加载AOF文件</span></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> loadAppendOnlyFile</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">filename</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查文件头部</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1jdh33"> sig</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">fread</span><span class="__shiki_140thh">(sig,</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">,fp) </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_1t8gfj"> memcmp</span><span class="__shiki_140thh">(sig,</span><span class="__shiki_mdbnqw">&quot;REDIS&quot;</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 旧版AOF格式，按文本协议解析</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查版本</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">fread</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">version,</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">,fp) </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查是否是混合持久化格式</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">version</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;R&#39;</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_1jdh33"> version</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;D&#39;</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1jdh33">            version</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;B&#39;</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_1jdh33"> version</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;</span><span class="__shiki_dzsirb">\\0</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // RDB格式部分</span></span>
<span class="line"><span class="__shiki_140thh">            rio rdb;</span></span>
<span class="line"><span class="__shiki_1t8gfj">            rioInitWithFile</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">rdb,fp);</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">rdbLoadRio</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">rdb,RDBFLAGS_AOF_PREAMBLE,</span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> C_OK) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">                serverLog</span><span class="__shiki_140thh">(LL_WARNING,</span><span class="__shiki_mdbnqw">&quot;Error reading the RDB preamble of the AOF file&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 旧版AOF格式</span></span>
<span class="line"><span class="__shiki_1t8gfj">            fseek</span><span class="__shiki_140thh">(fp,</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,SEEK_SET);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 继续加载AOF格式部分</span></span>
<span class="line"><span class="__shiki_1itgoe">        while</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 解析AOF命令并执行</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-5-混合持久化优缺点" tabindex="-1">4.5 混合持久化优缺点 <a class="header-anchor" href="#_4-5-混合持久化优缺点" aria-label="Permalink to &quot;4.5 混合持久化优缺点&quot;">​</a></h3><h4 id="优点-2" tabindex="-1">优点： <a class="header-anchor" href="#优点-2" aria-label="Permalink to &quot;优点：&quot;">​</a></h4><ol><li><strong>快速恢复</strong>：RDB部分提供快速加载</li><li><strong>数据安全</strong>：AOF部分保证数据完整性</li><li><strong>兼容性好</strong>：向后兼容旧版AOF格式</li></ol><h4 id="缺点-2" tabindex="-1">缺点： <a class="header-anchor" href="#缺点-2" aria-label="Permalink to &quot;缺点：&quot;">​</a></h4><ol><li><strong>文件可读性差</strong>：RDB部分是二进制，不可直接查看</li><li><strong>实现复杂度高</strong>：需要处理两种格式的切换</li></ol><h2 id="五、持久化性能优化" tabindex="-1">五、持久化性能优化 <a class="header-anchor" href="#五、持久化性能优化" aria-label="Permalink to &quot;五、持久化性能优化&quot;">​</a></h2><h3 id="_5-1-性能监控指标" tabindex="-1">5.1 性能监控指标 <a class="header-anchor" href="#_5-1-性能监控指标" aria-label="Permalink to &quot;5.1 性能监控指标&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 查看持久化相关信息</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_mdbnqw">INFO</span><span class="__shiki_mdbnqw"> persistence</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 关键指标：</span></span>
<span class="line"><span class="__shiki_1t8gfj">rdb_last_save_time:1630000000</span><span class="__shiki_21nrsd">      # 上次RDB保存时间</span></span>
<span class="line"><span class="__shiki_1t8gfj">rdb_changes_since_last_save:100</span><span class="__shiki_21nrsd">    # 上次保存后的修改数</span></span>
<span class="line"><span class="__shiki_1t8gfj">aof_enabled:1</span><span class="__shiki_21nrsd">                      # AOF是否启用</span></span>
<span class="line"><span class="__shiki_1t8gfj">aof_rewrite_in_progress:0</span><span class="__shiki_21nrsd">          # 是否正在重写</span></span>
<span class="line"><span class="__shiki_1t8gfj">aof_last_rewrite_time_sec:5</span><span class="__shiki_21nrsd">        # 上次重写耗时</span></span>
<span class="line"><span class="__shiki_1t8gfj">aof_current_size:1024000</span><span class="__shiki_21nrsd">           # 当前AOF文件大小</span></span>
<span class="line"><span class="__shiki_1t8gfj">aof_base_size:512000</span><span class="__shiki_21nrsd">               # 上次重写时AOF大小</span></span></code></pre></div><h3 id="_5-2-优化建议" tabindex="-1">5.2 优化建议 <a class="header-anchor" href="#_5-2-优化建议" aria-label="Permalink to &quot;5.2 优化建议&quot;">​</a></h3><h4 id="_5-2-1-rdb优化" tabindex="-1">5.2.1 RDB优化 <a class="header-anchor" href="#_5-2-1-rdb优化" aria-label="Permalink to &quot;5.2.1 RDB优化&quot;">​</a></h4><ol><li><strong>合理配置save规则</strong>：根据数据重要性设置</li><li><strong>避免大数据集频繁保存</strong>：减少fork开销</li><li><strong>使用BGSAVE而非SAVE</strong>：避免阻塞</li><li><strong>监控fork时间</strong>：<div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 查看上次fork耗时</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_mdbnqw">INFO</span><span class="__shiki_mdbnqw"> stats</span></span>
<span class="line"><span class="__shiki_1t8gfj">latest_fork_usec:500</span><span class="__shiki_21nrsd">  # 微秒</span></span></code></pre></div></li></ol><h4 id="_5-2-2-aof优化" tabindex="-1">5.2.2 AOF优化 <a class="header-anchor" href="#_5-2-2-aof优化" aria-label="Permalink to &quot;5.2.2 AOF优化&quot;">​</a></h4><ol><li><strong>调整appendfsync策略</strong>：平衡性能和数据安全</li><li><strong>优化AOF重写触发条件</strong>：<div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 根据写入量调整</span></span>
<span class="line"><span class="__shiki_mdbnqw">auto-aof-rewrite-percentage 100</span></span>
<span class="line"><span class="__shiki_mdbnqw">auto-aof-rewrite-min-size 1gb</span><span class="__shiki_21nrsd">  # 大文件才重写</span></span></code></pre></div></li><li><strong>使用no-appendfsync-on-rewrite</strong>：<div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">no-appendfsync-on-rewrite yes</span><span class="__shiki_21nrsd">  # 重写时不刷盘，提高性能</span></span></code></pre></div></li><li><strong>AOF重写优化</strong>：避免在高峰期触发重写</li></ol><h4 id="_5-2-3-系统级优化" tabindex="-1">5.2.3 系统级优化 <a class="header-anchor" href="#_5-2-3-系统级优化" aria-label="Permalink to &quot;5.2.3 系统级优化&quot;">​</a></h4><ol><li><strong>Linux内核参数</strong>：<div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 允许内存超配，避免fork失败</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /proc/sys/vm/overcommit_memory</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 透明大页，可能影响fork性能</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> never</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /sys/kernel/mm/transparent_hugepage/enabled</span></span></code></pre></div></li><li><strong>文件系统选择</strong>：XFS/ext4性能较好</li><li><strong>磁盘性能</strong>：使用SSD提高I/O性能</li></ol><h3 id="_5-3-内存优化策略" tabindex="-1">5.3 内存优化策略 <a class="header-anchor" href="#_5-3-内存优化策略" aria-label="Permalink to &quot;5.3 内存优化策略&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 配置示例</span></span>
<span class="line"><span class="__shiki_mdbnqw">maxmemory 2gb</span><span class="__shiki_21nrsd">                      # 最大内存限制</span></span>
<span class="line"><span class="__shiki_mdbnqw">maxmemory-policy allkeys-lru</span><span class="__shiki_21nrsd">       # 内存淘汰策略</span></span>
<span class="line"><span class="__shiki_mdbnqw">maxmemory-samples 5</span><span class="__shiki_21nrsd">                # LRU采样精度</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 持久化相关内存优化</span></span>
<span class="line"><span class="__shiki_mdbnqw">rdb-save-incremental-fsync yes</span><span class="__shiki_21nrsd">    # 增量fsync，减少延迟</span></span>
<span class="line"><span class="__shiki_mdbnqw">aof-rewrite-incremental-fsync yes</span><span class="__shiki_21nrsd"> # AOF重写时增量fsync</span></span></code></pre></div><h2 id="六、持久化故障处理与恢复" tabindex="-1">六、持久化故障处理与恢复 <a class="header-anchor" href="#六、持久化故障处理与恢复" aria-label="Permalink to &quot;六、持久化故障处理与恢复&quot;">​</a></h2><h3 id="_6-1-常见故障场景" tabindex="-1">6.1 常见故障场景 <a class="header-anchor" href="#_6-1-常见故障场景" aria-label="Permalink to &quot;6.1 常见故障场景&quot;">​</a></h3><h4 id="_6-1-1-rdb文件损坏" tabindex="-1">6.1.1 RDB文件损坏 <a class="header-anchor" href="#_6-1-1-rdb文件损坏" aria-label="Permalink to &quot;6.1.1 RDB文件损坏&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 检查RDB文件</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-check-rdb</span><span class="__shiki_mdbnqw"> dump.rdb</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 尝试修复（有限）</span></span>
<span class="line"><span class="__shiki_21nrsd"># RDB本身不支持修复，只能从备份恢复</span></span></code></pre></div><h4 id="_6-1-2-aof文件损坏" tabindex="-1">6.1.2 AOF文件损坏 <a class="header-anchor" href="#_6-1-2-aof文件损坏" aria-label="Permalink to &quot;6.1.2 AOF文件损坏&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 修复AOF文件</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-check-aof</span><span class="__shiki_dzsirb"> --fix</span><span class="__shiki_mdbnqw"> appendonly.aof</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 修复原理：</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 从文件开始扫描</span></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 找到第一个格式错误的位置</span></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 截断后续内容</span></span></code></pre></div><h4 id="_6-1-3-持久化进程阻塞" tabindex="-1">6.1.3 持久化进程阻塞 <a class="header-anchor" href="#_6-1-3-持久化进程阻塞" aria-label="Permalink to &quot;6.1.3 持久化进程阻塞&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 检查持久化进程状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_mdbnqw">INFO</span><span class="__shiki_mdbnqw"> persistence</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 如果BGSAVE卡住，可能的解决方法：</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 检查内存是否不足</span></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 检查磁盘空间</span></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 检查fork是否被阻塞</span></span></code></pre></div><h3 id="_6-2-数据恢复策略" tabindex="-1">6.2 数据恢复策略 <a class="header-anchor" href="#_6-2-数据恢复策略" aria-label="Permalink to &quot;6.2 数据恢复策略&quot;">​</a></h3><h4 id="_6-2-1-恢复优先级" tabindex="-1">6.2.1 恢复优先级 <a class="header-anchor" href="#_6-2-1-恢复优先级" aria-label="Permalink to &quot;6.2.1 恢复优先级&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">启动时数据加载顺序：</span></span>
<span class="line"><span class="__shiki_wvjl67">1. 如果开启了AOF，优先加载AOF文件</span></span>
<span class="line"><span class="__shiki_wvjl67">2. 如果AOF关闭，加载RDB文件</span></span>
<span class="line"><span class="__shiki_wvjl67">3. 如果两者都不存在，启动空数据库</span></span></code></pre></div><h4 id="_6-2-2-灾难恢复流程" tabindex="-1">6.2.2 灾难恢复流程 <a class="header-anchor" href="#_6-2-2-灾难恢复流程" aria-label="Permalink to &quot;6.2.2 灾难恢复流程&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 停止Redis服务</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_mdbnqw">SHUTDOWN</span><span class="__shiki_mdbnqw"> NOSAVE</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 备份当前数据文件</span></span>
<span class="line"><span class="__shiki_1t8gfj">cp</span><span class="__shiki_mdbnqw"> /var/lib/redis/dump.rdb</span><span class="__shiki_mdbnqw"> /backup/dump.rdb.</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%s</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">cp</span><span class="__shiki_mdbnqw"> /var/lib/redis/appendonly.aof</span><span class="__shiki_mdbnqw"> /backup/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 如果有AOF文件，尝试修复</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-check-aof</span><span class="__shiki_dzsirb"> --fix</span><span class="__shiki_mdbnqw"> appendonly.aof</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 启动Redis测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-server</span><span class="__shiki_mdbnqw"> /path/to/redis.conf</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 验证数据</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_mdbnqw">DBSIZE</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_mdbnqw">GET</span><span class="__shiki_mdbnqw"> some_key</span></span></code></pre></div><h3 id="_6-3-监控与告警" tabindex="-1">6.3 监控与告警 <a class="header-anchor" href="#_6-3-监控与告警" aria-label="Permalink to &quot;6.3 监控与告警&quot;">​</a></h3><h4 id="_6-3-1-关键监控指标" tabindex="-1">6.3.1 关键监控指标 <a class="header-anchor" href="#_6-3-1-关键监控指标" aria-label="Permalink to &quot;6.3.1 关键监控指标&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 持久化延迟监控</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_mdbnqw">INFO</span><span class="__shiki_mdbnqw"> persistence</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -E</span><span class="__shiki_mdbnqw"> &quot;(rdb_last_bgsave_status|aof_last_bgrewrite_status)&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 持久化性能监控</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_mdbnqw">INFO</span><span class="__shiki_mdbnqw"> stats</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -E</span><span class="__shiki_mdbnqw"> &quot;(latest_fork_usec|aof_delayed_fsync)&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 内存监控</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_mdbnqw">INFO</span><span class="__shiki_mdbnqw"> memory</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -E</span><span class="__shiki_mdbnqw"> &quot;(used_memory|used_memory_peak)&quot;</span></span></code></pre></div><h4 id="_6-3-2-告警规则示例" tabindex="-1">6.3.2 告警规则示例 <a class="header-anchor" href="#_6-3-2-告警规则示例" aria-label="Permalink to &quot;6.3.2 告警规则示例&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Prometheus告警规则示例</span></span>
<span class="line"><span class="__shiki_17hn0y">groups</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis_persistence</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">RedisRDBFailed</span></span>
<span class="line"><span class="__shiki_17hn0y">    expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis_rdb_last_bgsave_status == 0</span></span>
<span class="line"><span class="__shiki_17hn0y">    for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">    annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">RDB持久化已失败超过5分钟</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">RedisAOFFailed</span></span>
<span class="line"><span class="__shiki_17hn0y">    expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis_aof_last_bgrewrite_status == 0</span></span>
<span class="line"><span class="__shiki_17hn0y">    for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">    annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AOF重写已失败超过5分钟</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">RedisForkSlow</span></span>
<span class="line"><span class="__shiki_17hn0y">    expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis_latest_fork_usec &gt; 1000000</span></span>
<span class="line"><span class="__shiki_17hn0y">    annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Redis fork操作超过1秒，可能影响性能</span></span></code></pre></div><h2 id="七、生产环境最佳实践" tabindex="-1">七、生产环境最佳实践 <a class="header-anchor" href="#七、生产环境最佳实践" aria-label="Permalink to &quot;七、生产环境最佳实践&quot;">​</a></h2><h3 id="_7-1-持久化策略选择" tabindex="-1">7.1 持久化策略选择 <a class="header-anchor" href="#_7-1-持久化策略选择" aria-label="Permalink to &quot;7.1 持久化策略选择&quot;">​</a></h3><table tabindex="0"><thead><tr><th>场景</th><th>推荐策略</th><th>配置示例</th><th>说明</th></tr></thead><tbody><tr><td>缓存用途</td><td>RDB-only</td><td><code>save 3600 1</code> <code>appendonly no</code></td><td>允许数据丢失，追求性能</td></tr><tr><td>会话存储</td><td>AOF-everysec</td><td><code>appendonly yes</code> <code>appendfsync everysec</code></td><td>平衡性能和数据安全</td></tr><tr><td>金融数据</td><td>AOF-always + RDB</td><td><code>appendfsync always</code> <code>save 900 1</code></td><td>数据安全第一，可接受性能损失</td></tr><tr><td>大数据集</td><td>混合持久化</td><td><code>aof-use-rdb-preamble yes</code></td><td>快速恢复+数据安全</td></tr></tbody></table><h3 id="_7-2-备份策略" tabindex="-1">7.2 备份策略 <a class="header-anchor" href="#_7-2-备份策略" aria-label="Permalink to &quot;7.2 备份策略&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 定时备份脚本示例</span></span>
<span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_140thh">BACKUP_DIR</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/backup/redis&quot;</span></span>
<span class="line"><span class="__shiki_140thh">DATE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%Y%m%d_%H%M%S</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 执行BGSAVE</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> -h</span><span class="__shiki_dzsirb"> 127.0.0.1</span><span class="__shiki_mdbnqw"> BGSAVE</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 等待RDB完成</span></span>
<span class="line"><span class="__shiki_1itgoe">while</span><span class="__shiki_140thh"> [ </span><span class="__shiki_mdbnqw">&quot;$(</span><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> -h</span><span class="__shiki_dzsirb"> 127.0.0.1</span><span class="__shiki_mdbnqw"> INFO persistence </span><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> rdb_bgsave_in_progress </span><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> cut</span><span class="__shiki_dzsirb"> -d:</span><span class="__shiki_dzsirb"> -f2</span><span class="__shiki_mdbnqw">)&quot;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;1&quot;</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sleep</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">done</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 备份RDB和AOF文件</span></span>
<span class="line"><span class="__shiki_1t8gfj">cp</span><span class="__shiki_mdbnqw"> /var/lib/redis/dump.rdb</span><span class="__shiki_140thh"> \${BACKUP_DIR}</span><span class="__shiki_mdbnqw">/dump_</span><span class="__shiki_140thh">\${DATE}</span><span class="__shiki_mdbnqw">.rdb</span></span>
<span class="line"><span class="__shiki_1t8gfj">cp</span><span class="__shiki_mdbnqw"> /var/lib/redis/appendonly.aof</span><span class="__shiki_140thh"> \${BACKUP_DIR}</span><span class="__shiki_mdbnqw">/appendonly_</span><span class="__shiki_140thh">\${DATE}</span><span class="__shiki_mdbnqw">.aof</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 保留最近7天备份</span></span>
<span class="line"><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh"> \${BACKUP_DIR} </span><span class="__shiki_dzsirb">-name</span><span class="__shiki_mdbnqw"> &quot;*.rdb&quot;</span><span class="__shiki_dzsirb"> -mtime</span><span class="__shiki_mdbnqw"> +7</span><span class="__shiki_dzsirb"> -delete</span></span>
<span class="line"><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh"> \${BACKUP_DIR} </span><span class="__shiki_dzsirb">-name</span><span class="__shiki_mdbnqw"> &quot;*.aof&quot;</span><span class="__shiki_dzsirb"> -mtime</span><span class="__shiki_mdbnqw"> +7</span><span class="__shiki_dzsirb"> -delete</span></span></code></pre></div><h3 id="_7-3-高可用架构中的持久化" tabindex="-1">7.3 高可用架构中的持久化 <a class="header-anchor" href="#_7-3-高可用架构中的持久化" aria-label="Permalink to &quot;7.3 高可用架构中的持久化&quot;">​</a></h3><h4 id="_7-3-1-主从复制与持久化" tabindex="-1">7.3.1 主从复制与持久化 <a class="header-anchor" href="#_7-3-1-主从复制与持久化" aria-label="Permalink to &quot;7.3.1 主从复制与持久化&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">主节点配置：</span></span>
<span class="line"><span class="__shiki_wvjl67">appendonly yes</span></span>
<span class="line"><span class="__shiki_wvjl67">appendfsync everysec</span></span>
<span class="line"><span class="__shiki_wvjl67">save 900 1</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">从节点配置：</span></span>
<span class="line"><span class="__shiki_wvjl67"># 可关闭持久化，依赖主节点</span></span>
<span class="line"><span class="__shiki_wvjl67">appendonly no</span></span>
<span class="line"><span class="__shiki_wvjl67">save &quot;&quot;</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67"># 或配置不同的保存时间，分散持久化压力</span></span>
<span class="line"><span class="__shiki_wvjl67">save 1200 1</span></span></code></pre></div><h4 id="_7-3-2-redis-sentinel中的持久化" tabindex="-1">7.3.2 Redis Sentinel中的持久化 <a class="header-anchor" href="#_7-3-2-redis-sentinel中的持久化" aria-label="Permalink to &quot;7.3.2 Redis Sentinel中的持久化&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># sentinel监控的每个实例应有独立的持久化配置</span></span>
<span class="line"><span class="__shiki_21nrsd"># 避免所有实例同时执行BGSAVE</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 实例1</span></span>
<span class="line"><span class="__shiki_mdbnqw">save 900 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">dir /redis/data/instance1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 实例2  </span></span>
<span class="line"><span class="__shiki_mdbnqw">save 1000 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">dir /redis/data/instance2</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 实例3</span></span>
<span class="line"><span class="__shiki_mdbnqw">save 1100 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">dir /redis/data/instance3</span></span></code></pre></div><h4 id="_7-3-3-redis-cluster中的持久化" tabindex="-1">7.3.3 Redis Cluster中的持久化 <a class="header-anchor" href="#_7-3-3-redis-cluster中的持久化" aria-label="Permalink to &quot;7.3.3 Redis Cluster中的持久化&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 每个分片独立配置</span></span>
<span class="line"><span class="__shiki_21nrsd"># 考虑数据分片后，每个节点的数据量减少</span></span>
<span class="line"><span class="__shiki_21nrsd"># 可以适当增加save频率</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">cluster-enabled yes</span></span>
<span class="line"><span class="__shiki_mdbnqw">cluster-config-file nodes.conf</span></span>
<span class="line"><span class="__shiki_mdbnqw">cluster-node-timeout 5000</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 持久化配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">appendonly yes</span></span>
<span class="line"><span class="__shiki_mdbnqw">appendfsync everysec</span></span>
<span class="line"><span class="__shiki_mdbnqw">save 300 10</span><span class="__shiki_21nrsd">  # 分片后数据量小，可频繁保存</span></span></code></pre></div><h3 id="_7-4-性能测试与调优" tabindex="-1">7.4 性能测试与调优 <a class="header-anchor" href="#_7-4-性能测试与调优" aria-label="Permalink to &quot;7.4 性能测试与调优&quot;">​</a></h3><h4 id="_7-4-1-持久化性能测试" tabindex="-1">7.4.1 持久化性能测试 <a class="header-anchor" href="#_7-4-1-持久化性能测试" aria-label="Permalink to &quot;7.4.1 持久化性能测试&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 测试RDB性能</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-benchmark</span><span class="__shiki_dzsirb"> -t</span><span class="__shiki_mdbnqw"> set</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_dzsirb"> 1000000</span><span class="__shiki_dzsirb"> --rdb</span><span class="__shiki_mdbnqw"> &quot;dump.rdb&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 测试AOF性能</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-benchmark</span><span class="__shiki_dzsirb"> -t</span><span class="__shiki_mdbnqw"> set</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_dzsirb"> 1000000</span><span class="__shiki_dzsirb"> --aof</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 监控持久化对性能的影响</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_mdbnqw">INFO</span><span class="__shiki_mdbnqw"> stats</span></span>
<span class="line"><span class="__shiki_21nrsd"># 查看以下几个指标：</span></span>
<span class="line"><span class="__shiki_21nrsd"># total_commands_processed</span></span>
<span class="line"><span class="__shiki_21nrsd"># instantaneous_ops_per_sec  </span></span>
<span class="line"><span class="__shiki_21nrsd"># latest_fork_usec</span></span></code></pre></div><h4 id="_7-4-2-调优示例" tabindex="-1">7.4.2 调优示例 <a class="header-anchor" href="#_7-4-2-调优示例" aria-label="Permalink to &quot;7.4.2 调优示例&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 针对写密集型场景的优化配置</span></span>
<span class="line"><span class="__shiki_21nrsd"># redis.conf</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 内存设置</span></span>
<span class="line"><span class="__shiki_mdbnqw">maxmemory 8gb</span></span>
<span class="line"><span class="__shiki_mdbnqw">maxmemory-policy allkeys-lru</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># RDB优化</span></span>
<span class="line"><span class="__shiki_mdbnqw">save 300 10000</span><span class="__shiki_21nrsd">  # 减少保存频率</span></span>
<span class="line"><span class="__shiki_mdbnqw">rdbcompression yes</span></span>
<span class="line"><span class="__shiki_mdbnqw">rdbchecksum yes</span></span>
<span class="line"><span class="__shiki_mdbnqw">stop-writes-on-bgsave-error yes</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># AOF优化  </span></span>
<span class="line"><span class="__shiki_mdbnqw">appendonly yes</span></span>
<span class="line"><span class="__shiki_mdbnqw">appendfilename &quot;appendonly.aof&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">appendfsync everysec</span></span>
<span class="line"><span class="__shiki_mdbnqw">no-appendfsync-on-rewrite yes</span><span class="__shiki_21nrsd">  # 重写时不刷盘</span></span>
<span class="line"><span class="__shiki_mdbnqw">auto-aof-rewrite-percentage 100</span></span>
<span class="line"><span class="__shiki_mdbnqw">auto-aof-rewrite-min-size 1gb</span><span class="__shiki_21nrsd">  # 大文件才重写</span></span>
<span class="line"><span class="__shiki_mdbnqw">aof-rewrite-incremental-fsync yes</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 系统优化</span></span>
<span class="line"><span class="__shiki_mdbnqw">activerehashing yes</span></span>
<span class="line"><span class="__shiki_mdbnqw">hash-max-ziplist-entries 512</span></span>
<span class="line"><span class="__shiki_mdbnqw">hash-max-ziplist-value 64</span></span></code></pre></div><h2 id="八、未来发展趋势" tabindex="-1">八、未来发展趋势 <a class="header-anchor" href="#八、未来发展趋势" aria-label="Permalink to &quot;八、未来发展趋势&quot;">​</a></h2><h3 id="_8-1-redis-7-0-持久化改进" tabindex="-1">8.1 Redis 7.0+持久化改进 <a class="header-anchor" href="#_8-1-redis-7-0-持久化改进" aria-label="Permalink to &quot;8.1 Redis 7.0+持久化改进&quot;">​</a></h3><ol><li><strong>多线程AOF</strong>：AOF重写使用多线程加速</li><li><strong>更好的混合持久化</strong>：优化RDB+AOF的切换机制</li><li><strong>持久化性能优化</strong>：减少fsync延迟</li></ol><h3 id="_8-2-新兴持久化技术" tabindex="-1">8.2 新兴持久化技术 <a class="header-anchor" href="#_8-2-新兴持久化技术" aria-label="Permalink to &quot;8.2 新兴持久化技术&quot;">​</a></h3><ol><li><strong>PMem（持久内存）支持</strong>：Intel Optane等持久内存技术</li><li><strong>RDMA加速持久化</strong>：远程直接内存访问技术</li><li><strong>新文件格式</strong>：更高效的序列化格式</li></ol><h3 id="_8-3-云原生环境下的持久化" tabindex="-1">8.3 云原生环境下的持久化 <a class="header-anchor" href="#_8-3-云原生环境下的持久化" aria-label="Permalink to &quot;8.3 云原生环境下的持久化&quot;">​</a></h3><ol><li><strong>容器化部署</strong>：持久化数据与容器生命周期管理</li><li><strong>Kubernetes集成</strong>：StatefulSet + PersistentVolume</li><li><strong>云存储集成</strong>：直接持久化到对象存储（S3等）</li></ol><h2 id="九、总结" tabindex="-1">九、总结 <a class="header-anchor" href="#九、总结" aria-label="Permalink to &quot;九、总结&quot;">​</a></h2><p>Redis持久化机制提供了灵活可靠的数据保护方案：</p><h3 id="关键要点" tabindex="-1">关键要点： <a class="header-anchor" href="#关键要点" aria-label="Permalink to &quot;关键要点：&quot;">​</a></h3><ol><li><strong>RDB适合备份和快速恢复</strong>，但可能丢失数据</li><li><strong>AOF提供更好的数据安全性</strong>，但文件较大</li><li><strong>混合持久化结合两者优点</strong>，是推荐的生产环境配置</li><li><strong>持久化配置需要根据业务需求调整</strong>，平衡性能和数据安全</li></ol><h3 id="最佳实践原则" tabindex="-1">最佳实践原则： <a class="header-anchor" href="#最佳实践原则" aria-label="Permalink to &quot;最佳实践原则：&quot;">​</a></h3><ol><li><strong>理解业务需求</strong>：根据数据重要性选择策略</li><li><strong>监控持久化状态</strong>：定期检查持久化健康状况</li><li><strong>制定备份策略</strong>：定期备份并测试恢复流程</li><li><strong>容量规划</strong>：预留足够的磁盘空间和内存</li><li><strong>性能测试</strong>：在生产前测试持久化对性能的影响</li></ol><h3 id="故障处理黄金法则" tabindex="-1">故障处理黄金法则： <a class="header-anchor" href="#故障处理黄金法则" aria-label="Permalink to &quot;故障处理黄金法则：&quot;">​</a></h3><ol><li>总是备份持久化文件</li><li>优先尝试AOF修复</li><li>监控fork时间和持久化状态</li><li>准备好手动恢复流程</li></ol><p>通过合理配置和监控，Redis持久化可以为企业级应用提供可靠的数据保护，在性能和安全性之间取得最佳平衡。</p>`,146)])])}const o=a(_,[["render",l]]);export{d as __pageData,o as default};
