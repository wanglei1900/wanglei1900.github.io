import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"PostgreSQL事务隔离与MVCC实现深度解析","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/relational/postgres/mvcc.md","filePath":"data/database/relational/postgres/mvcc.md"}'),p={name:"data/database/relational/postgres/mvcc.md"};function l(h,s,c,e,t,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="postgresql事务隔离与mvcc实现深度解析" tabindex="-1">PostgreSQL事务隔离与MVCC实现深度解析 <a class="header-anchor" href="#postgresql事务隔离与mvcc实现深度解析" aria-label="Permalink to &quot;PostgreSQL事务隔离与MVCC实现深度解析&quot;">​</a></h1><h2 id="一、事务基础与acid特性" tabindex="-1">一、事务基础与ACID特性 <a class="header-anchor" href="#一、事务基础与acid特性" aria-label="Permalink to &quot;一、事务基础与ACID特性&quot;">​</a></h2><h3 id="_1-1-事务核心概念" tabindex="-1">1.1 事务核心概念 <a class="header-anchor" href="#_1-1-事务核心概念" aria-label="Permalink to &quot;1.1 事务核心概念&quot;">​</a></h3><h4 id="_1-1-1-acid特性实现" tabindex="-1">1.1.1 ACID特性实现 <a class="header-anchor" href="#_1-1-1-acid特性实现" aria-label="Permalink to &quot;1.1.1 ACID特性实现&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 开启事务并验证ACID</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 原子性(Atomicity)：要么全部成功，要么全部失败</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> accounts (id, balance) </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> accounts (id, balance) </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 一致性(Consistency)：始终保持数据一致性</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> accounts </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> balance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> balance </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> accounts </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> balance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> balance </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 检查约束</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> accounts </span><span class="__shiki_1itgoe">ADD</span><span class="__shiki_1itgoe"> CONSTRAINT</span><span class="__shiki_140thh"> positive_balance </span></span>
<span class="line"><span class="__shiki_1itgoe">CHECK</span><span class="__shiki_140thh"> (balance </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 隔离性(Isolation)：并发事务互不干扰</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 将在此后详细讨论</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 持久性(Durability)：提交后永久保存</span></span>
<span class="line"><span class="__shiki_1itgoe">COMMIT</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 验证事务状态</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_stat_activity </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> state</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;idle in transaction&#39;</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_1-1-2-事务控制语句" tabindex="-1">1.1.2 事务控制语句 <a class="header-anchor" href="#_1-1-2-事务控制语句" aria-label="Permalink to &quot;1.1.2 事务控制语句&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 基本事务控制</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 或 START TRANSACTION</span></span>
<span class="line"><span class="__shiki_140thh">SAVEPOINT sp1;</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> test </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">SAVEPOINT sp2;</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> test </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">ROLLBACK</span><span class="__shiki_1itgoe"> TO</span><span class="__shiki_140thh"> sp2;  </span><span class="__shiki_21nrsd">-- 回滚到保存点sp2</span></span>
<span class="line"><span class="__shiki_140thh">RELEASE SAVEPOINT sp1;  </span><span class="__shiki_21nrsd">-- 释放保存点</span></span>
<span class="line"><span class="__shiki_1itgoe">COMMIT</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 或 ROLLBACK</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看当前事务状态</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    txid_current(),                    </span><span class="__shiki_21nrsd">-- 当前事务ID</span></span>
<span class="line"><span class="__shiki_140thh">    pg_current_xact_id(),             </span><span class="__shiki_21nrsd">-- 当前事务ID（PG 13+）</span></span>
<span class="line"><span class="__shiki_140thh">    txid_current_if_assigned(),       </span><span class="__shiki_21nrsd">-- 如果已分配则返回事务ID</span></span>
<span class="line"><span class="__shiki_140thh">    pg_xact_status(txid_current());   </span><span class="__shiki_21nrsd">-- 事务状态</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 事务参数设置</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_1itgoe"> TRANSACTION</span></span>
<span class="line"><span class="__shiki_1itgoe">    ISOLATION</span><span class="__shiki_1itgoe"> LEVEL</span><span class="__shiki_1itgoe"> REPEATABLE</span><span class="__shiki_1itgoe"> READ</span></span>
<span class="line"><span class="__shiki_1itgoe">    READ</span><span class="__shiki_140thh"> WRITE                        </span><span class="__shiki_21nrsd">-- 或 READ ONLY</span></span>
<span class="line"><span class="__shiki_140thh">    DEFERRABLE                        </span><span class="__shiki_21nrsd">-- 延迟约束检查</span></span>
<span class="line"><span class="__shiki_1itgoe">    NOT</span><span class="__shiki_140thh"> DEFERRABLE;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 设置事务特性</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_1itgoe"> TRANSACTION</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    ISOLATION</span><span class="__shiki_1itgoe"> LEVEL</span><span class="__shiki_1itgoe"> SERIALIZABLE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    READ</span><span class="__shiki_140thh"> ONLY,</span></span>
<span class="line"><span class="__shiki_140thh">    DEFERRABLE;</span></span></code></pre></div><h3 id="_1-2-事务id管理" tabindex="-1">1.2 事务ID管理 <a class="header-anchor" href="#_1-2-事务id管理" aria-label="Permalink to &quot;1.2 事务ID管理&quot;">​</a></h3><h4 id="_1-2-1-事务id分配与范围" tabindex="-1">1.2.1 事务ID分配与范围 <a class="header-anchor" href="#_1-2-1-事务id分配与范围" aria-label="Permalink to &quot;1.2.1 事务ID分配与范围&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看事务ID相关信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    setting,</span></span>
<span class="line"><span class="__shiki_140thh">    unit,</span></span>
<span class="line"><span class="__shiki_140thh">    category,</span></span>
<span class="line"><span class="__shiki_140thh">    short_desc</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_settings</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%xid%&#39;</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%transaction%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 重要事务ID参数：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- xid_stop_limit (200000000)     -- 停止事务的阈值</span></span>
<span class="line"><span class="__shiki_21nrsd">-- xid_warn_limit (1500000000)    -- 警告阈值</span></span>
<span class="line"><span class="__shiki_21nrsd">-- vacuum_freeze_min_age (50000000) -- 冻结最小年龄</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看当前数据库的事务年龄</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    datname,</span></span>
<span class="line"><span class="__shiki_140thh">    age(datfrozenxid) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> frozen_age,</span></span>
<span class="line"><span class="__shiki_140thh">    mxid_age(datminmxid) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> multixact_age,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_database_size(datname)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> db_size</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_database</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> age(datfrozenxid) </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看表的事务年龄</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">    relname,</span></span>
<span class="line"><span class="__shiki_140thh">    age(relfrozenxid) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> xid_age,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_relation_size(relid)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> table_size,</span></span>
<span class="line"><span class="__shiki_140thh">    n_live_tup,</span></span>
<span class="line"><span class="__shiki_140thh">    n_dead_tup</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_class c</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> pg_namespace n </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relnamespace</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> n</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">LEFT JOIN</span><span class="__shiki_140thh"> pg_stat_user_tables s </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relid</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relkind</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;r&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> age(relfrozenxid) </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 20</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_1-2-2-事务id回卷问题" tabindex="-1">1.2.2 事务ID回卷问题 <a class="header-anchor" href="#_1-2-2-事务id回卷问题" aria-label="Permalink to &quot;1.2.2 事务ID回卷问题&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 模拟事务ID回卷问题</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">事务ID是32位无符号整数，范围：0 到 2^32-1 (4,294,967,295)</span></span>
<span class="line"><span class="__shiki_21nrsd">回卷问题：当事务ID达到最大值后，会从3重新开始</span></span>
<span class="line"><span class="__shiki_21nrsd">特殊事务ID：</span></span>
<span class="line"><span class="__shiki_21nrsd">  0 - 无效事务ID</span></span>
<span class="line"><span class="__shiki_21nrsd">  1 - 启动事务（引导事务）</span></span>
<span class="line"><span class="__shiki_21nrsd">  2 - 冻结事务ID</span></span>
<span class="line"><span class="__shiki_21nrsd">  3 - 第一个&quot;正常&quot;事务ID</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看接近回卷的表</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> xid_stats </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">        relname,</span></span>
<span class="line"><span class="__shiki_140thh">        age(relfrozenxid) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> xid_age,</span></span>
<span class="line"><span class="__shiki_1itgoe">        CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> age(relfrozenxid) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 2000000000</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;CRITICAL&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> age(relfrozenxid) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1500000000</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;WARNING&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            ELSE</span><span class="__shiki_mdbnqw"> &#39;OK&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_1itgoe"> status</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        pg_size_pretty(pg_relation_size(relid)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> size</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_class c</span></span>
<span class="line"><span class="__shiki_1itgoe">    JOIN</span><span class="__shiki_140thh"> pg_namespace n </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relnamespace</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> n</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relkind</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;r&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> xid_stats</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> status</span><span class="__shiki_1itgoe"> !=</span><span class="__shiki_mdbnqw"> &#39;OK&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> xid_age </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 预防回卷的维护策略</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 定期执行VACUUM FREEZE</span></span>
<span class="line"><span class="__shiki_140thh">VACUUM FREEZE </span><span class="__shiki_1itgoe">VERBOSE</span><span class="__shiki_140thh"> your_table;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 配置自动VACUUM</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> your_table </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    autovacuum_freeze_min_age </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 50000000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    autovacuum_freeze_table_age </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1500000000</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 监控脚本</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> monitor_xid_wraparound</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    database_name</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    frozen_xid_age int8,</span></span>
<span class="line"><span class="__shiki_1itgoe">    status</span><span class="__shiki_1itgoe"> text</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        datname,</span></span>
<span class="line"><span class="__shiki_140thh">        age(datfrozenxid),</span></span>
<span class="line"><span class="__shiki_1itgoe">        CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> age(datfrozenxid) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 2000000000</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;CRITICAL: 需要立即维护&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> age(datfrozenxid) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1500000000</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;WARNING: 接近回卷&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> age(datfrozenxid) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000000000</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;NOTICE: 需要监控&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            ELSE</span><span class="__shiki_mdbnqw"> &#39;OK&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_database</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> datallowconn;  </span><span class="__shiki_21nrsd">-- 只包含可连接的数据库</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> monitor_xid_wraparound();</span></span></code></pre></div><h2 id="二、事务隔离级别深度解析" tabindex="-1">二、事务隔离级别深度解析 <a class="header-anchor" href="#二、事务隔离级别深度解析" aria-label="Permalink to &quot;二、事务隔离级别深度解析&quot;">​</a></h2><h3 id="_2-1-sql标准隔离级别" tabindex="-1">2.1 SQL标准隔离级别 <a class="header-anchor" href="#_2-1-sql标准隔离级别" aria-label="Permalink to &quot;2.1 SQL标准隔离级别&quot;">​</a></h3><h4 id="_2-1-1-隔离级别定义与现象" tabindex="-1">2.1.1 隔离级别定义与现象 <a class="header-anchor" href="#_2-1-1-隔离级别定义与现象" aria-label="Permalink to &quot;2.1.1 隔离级别定义与现象&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 设置和查看隔离级别</span></span>
<span class="line"><span class="__shiki_21nrsd">-- PostgreSQL支持的隔离级别：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. READ UNCOMMITTED (实际实现为READ COMMITTED)</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. READ COMMITTED (默认)</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. REPEATABLE READ</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. SERIALIZABLE</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看当前隔离级别</span></span>
<span class="line"><span class="__shiki_140thh">SHOW default_transaction_isolation;</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> current_setting(</span><span class="__shiki_mdbnqw">&#39;default_transaction_isolation&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 在事务中设置隔离级别</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_1itgoe"> TRANSACTION</span><span class="__shiki_1itgoe"> ISOLATION</span><span class="__shiki_1itgoe"> LEVEL</span><span class="__shiki_1itgoe"> REPEATABLE</span><span class="__shiki_1itgoe"> READ</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 或者在BEGIN语句中指定</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_1itgoe"> TRANSACTION</span><span class="__shiki_1itgoe"> ISOLATION</span><span class="__shiki_1itgoe"> LEVEL</span><span class="__shiki_1itgoe"> SERIALIZABLE</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 不同隔离级别下的现象演示</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建测试表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> isolation_test</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    value</span><span class="__shiki_1itgoe"> INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    data</span><span class="__shiki_1itgoe"> TEXT</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 脏读演示（PostgreSQL实际上不支持真正的脏读）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话1</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_1itgoe"> TRANSACTION</span><span class="__shiki_1itgoe"> ISOLATION</span><span class="__shiki_1itgoe"> LEVEL</span><span class="__shiki_1itgoe"> READ</span><span class="__shiki_1itgoe"> COMMITTED</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> isolation_test (</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">data</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;dirty read test&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话2</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_1itgoe"> TRANSACTION</span><span class="__shiki_1itgoe"> ISOLATION</span><span class="__shiki_1itgoe"> LEVEL</span><span class="__shiki_1itgoe"> READ</span><span class="__shiki_1itgoe"> COMMITTED</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> isolation_test </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> data</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;dirty read test&#39;</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 看不到未提交的数据</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 不可重复读演示</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话1</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_1itgoe"> TRANSACTION</span><span class="__shiki_1itgoe"> ISOLATION</span><span class="__shiki_1itgoe"> LEVEL</span><span class="__shiki_1itgoe"> READ</span><span class="__shiki_1itgoe"> COMMITTED</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> isolation_test </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 第一次读取</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话2</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> isolation_test </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_1itgoe"> value</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> value</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">COMMIT</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话1</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> isolation_test </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 第二次读取，值已改变（不可重复读）</span></span>
<span class="line"><span class="__shiki_1itgoe">COMMIT</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 幻读演示</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话1</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_1itgoe"> TRANSACTION</span><span class="__shiki_1itgoe"> ISOLATION</span><span class="__shiki_1itgoe"> LEVEL</span><span class="__shiki_1itgoe"> REPEATABLE</span><span class="__shiki_1itgoe"> READ</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> isolation_test </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> value</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 第一次计数</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话2</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> isolation_test (</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">data</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;phantom&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">COMMIT</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话1</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> isolation_test </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> value</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 计数不变（防止幻读）</span></span>
<span class="line"><span class="__shiki_1itgoe">COMMIT</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_2-1-2-隔离级别实现对比" tabindex="-1">2.1.2 隔离级别实现对比 <a class="header-anchor" href="#_2-1-2-隔离级别实现对比" aria-label="Permalink to &quot;2.1.2 隔离级别实现对比&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看不同隔离级别的实现差异</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">PostgreSQL实现：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. READ UNCOMMITTED: 实际上实现为READ COMMITTED</span></span>
<span class="line"><span class="__shiki_21nrsd">2. READ COMMITTED: 使用快照，每个语句看到已提交的数据</span></span>
<span class="line"><span class="__shiki_21nrsd">3. REPEATABLE READ: 使用事务级别的快照</span></span>
<span class="line"><span class="__shiki_21nrsd">4. SERIALIZABLE: 使用可序列化快照隔离(SSI)</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 验证隔离级别行为</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> bank_accounts</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    account_name </span><span class="__shiki_1itgoe">VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    balance </span><span class="__shiki_1itgoe">DECIMAL</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1itgoe">    CHECK</span><span class="__shiki_140thh"> (balance </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 并发更新测试</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话1: 转账</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_1itgoe"> TRANSACTION</span><span class="__shiki_1itgoe"> ISOLATION</span><span class="__shiki_1itgoe"> LEVEL</span><span class="__shiki_1itgoe"> READ</span><span class="__shiki_1itgoe"> COMMITTED</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> bank_accounts </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> balance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> balance </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 此时会话2的更新会被阻塞</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话2: 同时更新同一账户</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_1itgoe"> TRANSACTION</span><span class="__shiki_1itgoe"> ISOLATION</span><span class="__shiki_1itgoe"> LEVEL</span><span class="__shiki_1itgoe"> READ</span><span class="__shiki_1itgoe"> COMMITTED</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> bank_accounts </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> balance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> balance </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_1itgoe"> WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 等待会话1提交或回滚</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看锁等待</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    locktype,</span></span>
<span class="line"><span class="__shiki_140thh">    relation::regclass,</span></span>
<span class="line"><span class="__shiki_140thh">    mode,</span></span>
<span class="line"><span class="__shiki_140thh">    granted,</span></span>
<span class="line"><span class="__shiki_140thh">    pid,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_blocking_pids(pid) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> blocking_pids</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_locks </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> relation </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;bank_accounts&#39;</span><span class="__shiki_140thh">::regclass;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用SSI（可序列化隔离级别）避免写偏序</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_1itgoe"> TRANSACTION</span><span class="__shiki_1itgoe"> ISOLATION</span><span class="__shiki_1itgoe"> LEVEL</span><span class="__shiki_1itgoe"> SERIALIZABLE</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 检查串行化冲突</span></span>
<span class="line"><span class="__shiki_140thh">SHOW max_predicate_locks_per_relation;</span></span>
<span class="line"><span class="__shiki_140thh">SHOW max_predicate_locks_per_xact;</span></span></code></pre></div><h3 id="_2-2-多版本并发控制-mvcc-核心实现" tabindex="-1">2.2 多版本并发控制(MVCC)核心实现 <a class="header-anchor" href="#_2-2-多版本并发控制-mvcc-核心实现" aria-label="Permalink to &quot;2.2 多版本并发控制(MVCC)核心实现&quot;">​</a></h3><h4 id="_2-2-1-元组结构与版本链" tabindex="-1">2.2.1 元组结构与版本链 <a class="header-anchor" href="#_2-2-1-元组结构与版本链" aria-label="Permalink to &quot;2.2.1 元组结构与版本链&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看元组结构信息</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建测试表并插入数据</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> mvcc_test</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    salary </span><span class="__shiki_1itgoe">INTEGER</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> mvcc_test (</span><span class="__shiki_1itgoe">name</span><span class="__shiki_140thh">, salary) </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;Alice&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">50000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> mvcc_test (</span><span class="__shiki_1itgoe">name</span><span class="__shiki_140thh">, salary) </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;Bob&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">60000</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看行的系统列</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    xmin,          </span><span class="__shiki_21nrsd">-- 插入该行版本的事务ID</span></span>
<span class="line"><span class="__shiki_140thh">    xmax,          </span><span class="__shiki_21nrsd">-- 删除该行版本的事务ID（0表示未删除）</span></span>
<span class="line"><span class="__shiki_140thh">    cmin,          </span><span class="__shiki_21nrsd">-- 插入命令ID</span></span>
<span class="line"><span class="__shiki_140thh">    cmax,          </span><span class="__shiki_21nrsd">-- 删除命令ID</span></span>
<span class="line"><span class="__shiki_140thh">    ctid,          </span><span class="__shiki_21nrsd">-- 当前元组ID（页号,偏移量）</span></span>
<span class="line"><span class="__shiki_140thh">    id, </span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">    salary</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> mvcc_test;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 模拟更新创建新版本</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> mvcc_test </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> salary </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 55000</span><span class="__shiki_1itgoe"> WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;Alice&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> ctid, xmin, xmax, </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> mvcc_test </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;Alice&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">COMMIT</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 再次查看，旧版本被标记为删除</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> ctid, xmin, xmax, </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> mvcc_test </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;Alice&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看页内元组信息（需要pageinspect扩展）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> EXTENSION </span><span class="__shiki_1itgoe">IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> pageinspect;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看页头信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> page_header(get_raw_page(</span><span class="__shiki_mdbnqw">&#39;mvcc_test&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看元组详细信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    lp,            </span><span class="__shiki_21nrsd">-- 行指针编号</span></span>
<span class="line"><span class="__shiki_140thh">    lp_off,        </span><span class="__shiki_21nrsd">-- 元组偏移量</span></span>
<span class="line"><span class="__shiki_140thh">    lp_flags,      </span><span class="__shiki_21nrsd">-- 行指针标志</span></span>
<span class="line"><span class="__shiki_140thh">    lp_len,        </span><span class="__shiki_21nrsd">-- 元组长度</span></span>
<span class="line"><span class="__shiki_140thh">    t_xmin,        </span><span class="__shiki_21nrsd">-- 插入XID</span></span>
<span class="line"><span class="__shiki_140thh">    t_xmax,        </span><span class="__shiki_21nrsd">-- 删除XID</span></span>
<span class="line"><span class="__shiki_140thh">    t_field3,      </span><span class="__shiki_21nrsd">-- 根据情况可能是cmin/cmax或xvac</span></span>
<span class="line"><span class="__shiki_140thh">    t_ctid,        </span><span class="__shiki_21nrsd">-- 当前元组ID</span></span>
<span class="line"><span class="__shiki_140thh">    t_infomask2,   </span><span class="__shiki_21nrsd">-- 属性数量+标志</span></span>
<span class="line"><span class="__shiki_140thh">    t_infomask,    </span><span class="__shiki_21nrsd">-- 标志位</span></span>
<span class="line"><span class="__shiki_140thh">    t_hoff,        </span><span class="__shiki_21nrsd">-- 头部长度</span></span>
<span class="line"><span class="__shiki_140thh">    t_bits,        </span><span class="__shiki_21nrsd">-- NULL位图</span></span>
<span class="line"><span class="__shiki_140thh">    t_oid          </span><span class="__shiki_21nrsd">-- 对象ID（如果存在）</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> heap_page_items(get_raw_page(</span><span class="__shiki_mdbnqw">&#39;mvcc_test&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">));</span></span></code></pre></div><h4 id="_2-2-2-可见性判断算法" tabindex="-1">2.2.2 可见性判断算法 <a class="header-anchor" href="#_2-2-2-可见性判断算法" aria-label="Permalink to &quot;2.2.2 可见性判断算法&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- PostgreSQL可见性判断的核心逻辑</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">可见性判断基于以下信息：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. 元组的xmin和xmax</span></span>
<span class="line"><span class="__shiki_21nrsd">2. 当前事务ID</span></span>
<span class="line"><span class="__shiki_21nrsd">3. 快照中的活跃事务列表</span></span>
<span class="line"><span class="__shiki_21nrsd">4. 提交日志(CLOG)状态</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">判断规则简化版：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. 如果xmin是当前事务：</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 如果xmax=0：可见（自己插入且未删除）</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 如果xmax≠0：不可见（自己删除）</span></span>
<span class="line"><span class="__shiki_21nrsd">2. 如果xmin已提交且不在快照中：</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 如果xmax=0：可见</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 如果xmax已提交且不在快照中：不可见（已删除）</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 如果xmax未提交或xmax是当前事务：可见（删除未提交）</span></span>
<span class="line"><span class="__shiki_21nrsd">3. 如果xmin未提交或xmin在快照中：</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 不可见</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看当前快照</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> txid_current_snapshot();</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 返回格式：xmin:xmax:xip_list</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 例如：100:200:110,115,120</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 表示：活跃事务列表[110,115,120]，所有&lt;xmin的事务可见，所有&gt;=xmax的事务不可见</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 获取详细快照信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    txid_snapshot_xmin(snap) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> xmin,</span></span>
<span class="line"><span class="__shiki_140thh">    txid_snapshot_xmax(snap) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> xmax,</span></span>
<span class="line"><span class="__shiki_140thh">    txid_snapshot_xip(snap) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> xip_list</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> txid_current_snapshot() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> snap;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 验证可见性判断</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 获取快照</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> txid_current_snapshot();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 在另一个会话中插入数据</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话2:</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> mvcc_test (</span><span class="__shiki_1itgoe">name</span><span class="__shiki_140thh">, salary) </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;Charlie&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">70000</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 回到会话1</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> mvcc_test </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;Charlie&#39;</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 不可见</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话2提交后</span></span>
<span class="line"><span class="__shiki_1itgoe">COMMIT</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 会话2</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话1重新查询（READ COMMITTED隔离级别）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> mvcc_test </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;Charlie&#39;</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 可见</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 如果是REPEATABLE READ，则仍然不可见</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_1itgoe"> TRANSACTION</span><span class="__shiki_1itgoe"> ISOLATION</span><span class="__shiki_1itgoe"> LEVEL</span><span class="__shiki_1itgoe"> REPEATABLE</span><span class="__shiki_1itgoe"> READ</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> mvcc_test </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;Charlie&#39;</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 不可见</span></span>
<span class="line"><span class="__shiki_1itgoe">COMMIT</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_2-3-快照机制详解" tabindex="-1">2.3 快照机制详解 <a class="header-anchor" href="#_2-3-快照机制详解" aria-label="Permalink to &quot;2.3 快照机制详解&quot;">​</a></h3><h4 id="_2-3-1-快照类型与获取" tabindex="-1">2.3.1 快照类型与获取 <a class="header-anchor" href="#_2-3-1-快照类型与获取" aria-label="Permalink to &quot;2.3.1 快照类型与获取&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 不同隔离级别的快照行为</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">快照类型：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. 语句级快照（READ COMMITTED）：每条语句开始时获取新快照</span></span>
<span class="line"><span class="__shiki_21nrsd">2. 事务级快照（REPEATABLE READ）：事务开始时获取快照，后续复用</span></span>
<span class="line"><span class="__shiki_21nrsd">3. 串行化快照（SERIALIZABLE）：类似REPEATABLE READ，但有冲突检测</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 演示不同隔离级别的快照行为</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 准备数据</span></span>
<span class="line"><span class="__shiki_1itgoe">TRUNCATE</span><span class="__shiki_140thh"> mvcc_test;</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> mvcc_test (</span><span class="__shiki_1itgoe">name</span><span class="__shiki_140thh">, salary) </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;User1&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话1：READ COMMITTED</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_1itgoe"> TRANSACTION</span><span class="__shiki_1itgoe"> ISOLATION</span><span class="__shiki_1itgoe"> LEVEL</span><span class="__shiki_1itgoe"> READ</span><span class="__shiki_1itgoe"> COMMITTED</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> txid_current_snapshot();  </span><span class="__shiki_21nrsd">-- 快照1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话2：插入新数据并提交</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> mvcc_test (</span><span class="__shiki_1itgoe">name</span><span class="__shiki_140thh">, salary) </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;User2&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">20000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">COMMIT</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话1：再次获取快照</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> txid_current_snapshot();  </span><span class="__shiki_21nrsd">-- 快照2（可能不同）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> mvcc_test;  </span><span class="__shiki_21nrsd">-- 能看到User2（新快照）</span></span>
<span class="line"><span class="__shiki_1itgoe">COMMIT</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话1：REPEATABLE READ</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_1itgoe"> TRANSACTION</span><span class="__shiki_1itgoe"> ISOLATION</span><span class="__shiki_1itgoe"> LEVEL</span><span class="__shiki_1itgoe"> REPEATABLE</span><span class="__shiki_1itgoe"> READ</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> txid_current_snapshot();  </span><span class="__shiki_21nrsd">-- 快照3</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话2：插入新数据</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> mvcc_test (</span><span class="__shiki_1itgoe">name</span><span class="__shiki_140thh">, salary) </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;User3&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">30000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">COMMIT</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话1：再次获取快照</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> txid_current_snapshot();  </span><span class="__shiki_21nrsd">-- 快照3（相同）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> mvcc_test;  </span><span class="__shiki_21nrsd">-- 不能看到User3（相同快照）</span></span>
<span class="line"><span class="__shiki_1itgoe">COMMIT</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用导出快照进行跨事务一致性读取</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_1itgoe"> TRANSACTION</span><span class="__shiki_1itgoe"> ISOLATION</span><span class="__shiki_1itgoe"> LEVEL</span><span class="__shiki_1itgoe"> REPEATABLE</span><span class="__shiki_1itgoe"> READ</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> pg_export_snapshot();  </span><span class="__shiki_21nrsd">-- 返回快照ID，如：00000004-00000001-1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 在另一个会话中使用该快照</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_1itgoe"> TRANSACTION</span><span class="__shiki_1itgoe"> ISOLATION</span><span class="__shiki_1itgoe"> LEVEL</span><span class="__shiki_1itgoe"> REPEATABLE</span><span class="__shiki_1itgoe"> READ</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_1itgoe"> TRANSACTION</span><span class="__shiki_1itgoe"> SNAPSHOT</span><span class="__shiki_mdbnqw"> &#39;00000004-00000001-1&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 现在这个会话看到与第一个会话相同的数据库状态</span></span>
<span class="line"><span class="__shiki_1itgoe">COMMIT</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_2-3-2-快照缓存与性能优化" tabindex="-1">2.3.2 快照缓存与性能优化 <a class="header-anchor" href="#_2-3-2-快照缓存与性能优化" aria-label="Permalink to &quot;2.3.2 快照缓存与性能优化&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 快照相关配置参数</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    setting,</span></span>
<span class="line"><span class="__shiki_140thh">    unit,</span></span>
<span class="line"><span class="__shiki_140thh">    short_desc</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_settings</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%snapshot%&#39;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">   OR</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%xact%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 重要参数：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- old_snapshot_threshold (默认-1，禁用)</span></span>
<span class="line"><span class="__shiki_21nrsd">--  设置旧快照的生存时间，超过后允许清理旧版本</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 快照缓存统计</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    snapshots_taken,           </span><span class="__shiki_21nrsd">-- 获取的快照总数</span></span>
<span class="line"><span class="__shiki_140thh">    snapshots_active,          </span><span class="__shiki_21nrsd">-- 活跃快照数</span></span>
<span class="line"><span class="__shiki_140thh">    snapshot_taken_time        </span><span class="__shiki_21nrsd">-- 获取快照的总时间</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_slru</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;Snapshot&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 监控快照使用情况</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> VIEW</span><span class="__shiki_1t8gfj"> snapshot_monitor</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    pid,</span></span>
<span class="line"><span class="__shiki_140thh">    usename,</span></span>
<span class="line"><span class="__shiki_140thh">    application_name,</span></span>
<span class="line"><span class="__shiki_140thh">    backend_xid,</span></span>
<span class="line"><span class="__shiki_140thh">    backend_xmin,</span></span>
<span class="line"><span class="__shiki_140thh">    query_start,</span></span>
<span class="line"><span class="__shiki_1itgoe">    state</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    query,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_database_size(datname)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> db_size</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_activity</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> backend_xmin </span><span class="__shiki_1itgoe">IS NOT NULL</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> query_start;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看持有最老快照的事务</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> snapshot_monitor</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> backend_xmin</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 快照导致的性能问题诊断</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> snapshot_holders </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        backend_xmin,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> num_backends,</span></span>
<span class="line"><span class="__shiki_dzsirb">        MIN</span><span class="__shiki_140thh">(query_start) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> oldest_query</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_stat_activity</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> backend_xmin </span><span class="__shiki_1itgoe">IS NOT NULL</span></span>
<span class="line"><span class="__shiki_1itgoe">    GROUP BY</span><span class="__shiki_140thh"> backend_xmin</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    sh</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">backend_xmin</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    sh</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">num_backends</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    sh</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oldest_query</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    age(</span><span class="__shiki_dzsirb">sh</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">backend_xmin</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> xid_age,</span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">query</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> snapshot_holders sh</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> pg_stat_activity a </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> sh</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">backend_xmin</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">backend_xmin</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_dzsirb"> sh</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">backend_xmin</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span></code></pre></div><h2 id="三、mvcc存储与版本管理" tabindex="-1">三、MVCC存储与版本管理 <a class="header-anchor" href="#三、mvcc存储与版本管理" aria-label="Permalink to &quot;三、MVCC存储与版本管理&quot;">​</a></h2><h3 id="_3-1-版本存储机制" tabindex="-1">3.1 版本存储机制 <a class="header-anchor" href="#_3-1-版本存储机制" aria-label="Permalink to &quot;3.1 版本存储机制&quot;">​</a></h3><h4 id="_3-1-1-堆元组存储细节" tabindex="-1">3.1.1 堆元组存储细节 <a class="header-anchor" href="#_3-1-1-堆元组存储细节" aria-label="Permalink to &quot;3.1.1 堆元组存储细节&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 深入查看元组头部结构</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">HeapTupleHeaderData结构：</span></span>
<span class="line"><span class="__shiki_21nrsd">typedef struct HeapTupleHeaderData</span></span>
<span class="line"><span class="__shiki_21nrsd">{</span></span>
<span class="line"><span class="__shiki_21nrsd">    union</span></span>
<span class="line"><span class="__shiki_21nrsd">    {</span></span>
<span class="line"><span class="__shiki_21nrsd">        HeapTupleFields t_heap;</span></span>
<span class="line"><span class="__shiki_21nrsd">        DatumTupleFields t_datum;</span></span>
<span class="line"><span class="__shiki_21nrsd">    } t_choice;</span></span>
<span class="line"><span class="__shiki_21nrsd">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    ItemPointerData t_ctid;      // 0-5字节：当前元组ID</span></span>
<span class="line"><span class="__shiki_21nrsd">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    uint16          t_infomask2; // 6-7字节：属性数量+标志</span></span>
<span class="line"><span class="__shiki_21nrsd">    uint16          t_infomask;  // 8-9字节：事务可见性标志</span></span>
<span class="line"><span class="__shiki_21nrsd">    uint8           t_hoff;      // 10字节：头部长度</span></span>
<span class="line"><span class="__shiki_21nrsd">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    bits8           t_bits[1];   // 11+字节：NULL位图（变长）</span></span>
<span class="line"><span class="__shiki_21nrsd">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 后面是实际数据</span></span>
<span class="line"><span class="__shiki_21nrsd">} HeapTupleHeaderData;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">t_infomask重要标志位：</span></span>
<span class="line"><span class="__shiki_21nrsd">HEAP_XMIN_COMMITTED   0x0100  // xmin已提交</span></span>
<span class="line"><span class="__shiki_21nrsd">HEAP_XMIN_INVALID     0x0200  // xmin无效/中止</span></span>
<span class="line"><span class="__shiki_21nrsd">HEAP_XMAX_COMMITTED   0x0400  // xmax已提交</span></span>
<span class="line"><span class="__shiki_21nrsd">HEAP_XMAX_INVALID     0x0800  // xmax无效</span></span>
<span class="line"><span class="__shiki_21nrsd">HEAP_XMAX_IS_MULTI    0x1000  // xmax是多事务ID</span></span>
<span class="line"><span class="__shiki_21nrsd">HEAP_UPDATED          0x2000  // 这是更新后的版本</span></span>
<span class="line"><span class="__shiki_21nrsd">HEAP_MOVED_OFF        0x4000  // 移动到其他位置</span></span>
<span class="line"><span class="__shiki_21nrsd">HEAP_MOVED_IN         0x8000  // 从其他位置移动来</span></span>
<span class="line"><span class="__shiki_21nrsd">HEAP_ONLY_TUPLE       0x2000  // 仅元组（HOT更新）</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看元组详细信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;(0,&#39;</span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh">lp</span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw">&#39;)&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> ctid,</span></span>
<span class="line"><span class="__shiki_140thh">    t_xmin::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">::xid </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> xmin,</span></span>
<span class="line"><span class="__shiki_140thh">    t_xmax::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">::xid </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> xmax,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> (t_infomask &amp; </span><span class="__shiki_dzsirb">256</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;COMMITTED&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> (t_infomask &amp; </span><span class="__shiki_dzsirb">512</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;ABORTED&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_mdbnqw"> &#39;IN_PROGRESS&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> xmin_status,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> (t_infomask &amp; </span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;COMMITTED&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> (t_infomask &amp; </span><span class="__shiki_dzsirb">2048</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;ABORTED&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_mdbnqw"> &#39;IN_PROGRESS&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> xmax_status,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> (t_infomask &amp; </span><span class="__shiki_dzsirb">4096</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;MULTI&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_mdbnqw"> &#39;SINGLE&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> xmax_type,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> (t_infomask &amp; </span><span class="__shiki_dzsirb">8192</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;UPDATED&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_mdbnqw"> &#39;ORIGINAL&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> update_status,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> (t_infomask &amp; </span><span class="__shiki_dzsirb">16384</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;MOVED_OUT&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> (t_infomask &amp; </span><span class="__shiki_dzsirb">32768</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;MOVED_IN&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_mdbnqw"> &#39;IN_PLACE&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> move_status</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> heap_page_items(get_raw_page(</span><span class="__shiki_mdbnqw">&#39;mvcc_test&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> lp;</span></span></code></pre></div><h4 id="_3-1-2-hot-heap-only-tuple-更新" tabindex="-1">3.1.2 HOT（Heap-Only Tuple）更新 <a class="header-anchor" href="#_3-1-2-hot-heap-only-tuple-更新" aria-label="Permalink to &quot;3.1.2 HOT（Heap-Only Tuple）更新&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- HOT更新机制演示</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">HOT（Heap-Only Tuple）条件：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. 更新不修改索引键</span></span>
<span class="line"><span class="__shiki_21nrsd">2. 同一页内有足够空间</span></span>
<span class="line"><span class="__shiki_21nrsd">3. 行版本链在同一页内</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">优点：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. 不创建新的索引条目</span></span>
<span class="line"><span class="__shiki_21nrsd">2. 减少索引膨胀</span></span>
<span class="line"><span class="__shiki_21nrsd">3. 提高更新性能</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建测试表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> hot_test</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    value</span><span class="__shiki_1itgoe"> INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    description</span><span class="__shiki_1itgoe"> TEXT</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_hot_name</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> hot_test(</span><span class="__shiki_1itgoe">name</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_hot_value</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> hot_test(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 插入初始数据</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> hot_test (</span><span class="__shiki_1itgoe">name</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">description</span><span class="__shiki_140thh">) </span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;Item&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> i,</span></span>
<span class="line"><span class="__shiki_140thh">    i,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;Description for item &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> i</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_dzsirb"> generate_series</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">) i;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 检查索引条目数量</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    relname,</span></span>
<span class="line"><span class="__shiki_140thh">    relkind,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_relation_size(</span><span class="__shiki_1itgoe">oid</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> size</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_class</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> relname </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;hot_test%&#39;</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_140thh"> relname </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;idx_hot%&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 执行HOT更新（不修改索引列）</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> hot_test </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_1itgoe"> description</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;Updated description&#39;</span><span class="__shiki_1itgoe"> WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 检查是否使用了HOT</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    n_tup_hot_upd,      </span><span class="__shiki_21nrsd">-- HOT更新次数</span></span>
<span class="line"><span class="__shiki_140thh">    n_tup_upd,          </span><span class="__shiki_21nrsd">-- 总更新次数</span></span>
<span class="line"><span class="__shiki_dzsirb">    round</span><span class="__shiki_140thh">(n_tup_hot_upd::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> NULLIF</span><span class="__shiki_140thh">(n_tup_upd, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> hot_percentage</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_user_tables</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> relname </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;hot_test&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 非HOT更新（修改索引列）</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> hot_test </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;UpdatedItem&#39;</span><span class="__shiki_1itgoe"> WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看索引膨胀</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">    tablename,</span></span>
<span class="line"><span class="__shiki_140thh">    indexname,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_relation_size(indexrelid)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> index_size,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_scan,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_tup_read,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_tup_fetch</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_user_indexes</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> tablename </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;hot_test&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 优化HOT更新</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 增加fillfactor预留空间</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> hot_test </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> (fillfactor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 70</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 监控HOT更新效率</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> VIEW</span><span class="__shiki_1t8gfj"> hot_update_stats</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">    relname,</span></span>
<span class="line"><span class="__shiki_140thh">    n_tup_upd,</span></span>
<span class="line"><span class="__shiki_140thh">    n_tup_hot_upd,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> n_tup_upd </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        THEN</span><span class="__shiki_dzsirb"> round</span><span class="__shiki_140thh">(n_tup_hot_upd::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> n_tup_upd, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> hot_ratio,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_relation_size(relid)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> table_size</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_user_tables</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> n_tup_upd </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_21nrsd">  -- 只查看更新频繁的表</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> hot_ratio </span><span class="__shiki_1itgoe">ASC</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- HOT比率低的表可能需要优化</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> hot_update_stats;</span></span></code></pre></div><h3 id="_3-2-提交日志与事务状态" tabindex="-1">3.2 提交日志与事务状态 <a class="header-anchor" href="#_3-2-提交日志与事务状态" aria-label="Permalink to &quot;3.2 提交日志与事务状态&quot;">​</a></h3><h4 id="_3-2-1-clog-提交日志-机制" tabindex="-1">3.2.1 CLOG（提交日志）机制 <a class="header-anchor" href="#_3-2-1-clog-提交日志-机制" aria-label="Permalink to &quot;3.2.1 CLOG（提交日志）机制&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 提交日志(CLOG)的工作原理</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">CLOG存储事务的最终状态：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. 事务状态：</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 0x00: TRANSACTION_STATUS_IN_PROGRESS</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 0x01: TRANSACTION_STATUS_COMMITTED</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 0x02: TRANSACTION_STATUS_ABORTED</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 0x03: TRANSACTION_STATUS_SUB_COMMITTED</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">2. 存储位置：$PGDATA/pg_xact（旧版本为pg_clog）</span></span>
<span class="line"><span class="__shiki_21nrsd">3. 每个事务2位，每字节存储4个事务状态</span></span>
<span class="line"><span class="__shiki_21nrsd">4. 缓存机制：共享缓冲区中的CLOG缓冲区</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看CLOG相关配置</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    setting,</span></span>
<span class="line"><span class="__shiki_140thh">    unit,</span></span>
<span class="line"><span class="__shiki_140thh">    short_desc</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_settings</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%clog%&#39;</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%commit%&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 重要参数：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- commit_delay (默认0)           -- 提交延迟，微秒</span></span>
<span class="line"><span class="__shiki_21nrsd">-- commit_siblings (默认5)        -- 触发提交延迟的最小并发事务数</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 监控CLOG使用情况</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    cid,                            </span><span class="__shiki_21nrsd">-- CLOG缓冲区ID</span></span>
<span class="line"><span class="__shiki_140thh">    access_count,                   </span><span class="__shiki_21nrsd">-- 访问次数</span></span>
<span class="line"><span class="__shiki_140thh">    usage_count,                    </span><span class="__shiki_21nrsd">-- 使用计数</span></span>
<span class="line"><span class="__shiki_140thh">    is_dirty,                       </span><span class="__shiki_21nrsd">-- 是否脏页</span></span>
<span class="line"><span class="__shiki_140thh">    pin_count                       </span><span class="__shiki_21nrsd">-- 固定计数</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_buffercache</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> relfilenode </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;pg_xact&#39;</span><span class="__shiki_140thh">::regclass::</span><span class="__shiki_1itgoe">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 估算CLOG大小</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(</span></span>
<span class="line"><span class="__shiki_140thh">        ( </span><span class="__shiki_21nrsd">-- 每个事务2位，每字节4个事务，每页8KB</span></span>
<span class="line"><span class="__shiki_140thh">          (</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">^</span><span class="__shiki_dzsirb">32</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">4</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 8192</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 8192</span></span>
<span class="line"><span class="__shiki_140thh">        )::</span><span class="__shiki_1itgoe">bigint</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> estimated_max_clog_size;</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 最大CLOG大小约256MB</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看事务状态函数</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    txid_current(),                           </span><span class="__shiki_21nrsd">-- 当前事务ID</span></span>
<span class="line"><span class="__shiki_140thh">    pg_xact_status(txid_current()) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> status</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">-- 事务状态</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 批量检查事务状态</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    xid,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_xact_status(xid) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> status</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    (txid_current()),                        </span><span class="__shiki_21nrsd">-- 当前事务</span></span>
<span class="line"><span class="__shiki_140thh">    (txid_current() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">),                    </span><span class="__shiki_21nrsd">-- 前一个事务</span></span>
<span class="line"><span class="__shiki_140thh">    (txid_current() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">)                   </span><span class="__shiki_21nrsd">-- 更早的事务</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> t(xid);</span></span></code></pre></div><h4 id="_3-2-2-多事务-multixact-机制" tabindex="-1">3.2.2 多事务(MultiXact)机制 <a class="header-anchor" href="#_3-2-2-多事务-multixact-机制" aria-label="Permalink to &quot;3.2.2 多事务(MultiXact)机制&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 多事务机制详解</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">MultiXact用于：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. 共享行锁（SELECT FOR SHARE）</span></span>
<span class="line"><span class="__shiki_21nrsd">2. 更新冲突检测</span></span>
<span class="line"><span class="__shiki_21nrsd">3. 多个事务同时锁定同一行</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">存储位置：$PGDATA/pg_multixact</span></span>
<span class="line"><span class="__shiki_21nrsd">包含：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. members文件：存储多事务成员</span></span>
<span class="line"><span class="__shiki_21nrsd">2. offsets文件：存储多事务偏移量</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建测试表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> multixact_test</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    data</span><span class="__shiki_1itgoe"> TEXT</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> multixact_test (</span><span class="__shiki_1itgoe">data</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;Test1&#39;</span><span class="__shiki_140thh">), (</span><span class="__shiki_mdbnqw">&#39;Test2&#39;</span><span class="__shiki_140thh">), (</span><span class="__shiki_mdbnqw">&#39;Test3&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 模拟多事务场景</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话1</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> multixact_test </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> FOR</span><span class="__shiki_140thh"> SHARE;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话2</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> multixact_test </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> FOR</span><span class="__shiki_140thh"> SHARE;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话3（尝试更新）</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> multixact_test </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_1itgoe"> data</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;Updated&#39;</span><span class="__shiki_1itgoe"> WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 等待</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看锁信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    locktype,</span></span>
<span class="line"><span class="__shiki_140thh">    relation::regclass,</span></span>
<span class="line"><span class="__shiki_1itgoe">    page</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    tuple,</span></span>
<span class="line"><span class="__shiki_140thh">    virtualxid,</span></span>
<span class="line"><span class="__shiki_140thh">    transactionid,</span></span>
<span class="line"><span class="__shiki_140thh">    classid,</span></span>
<span class="line"><span class="__shiki_1itgoe">    objid</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    objsubid,</span></span>
<span class="line"><span class="__shiki_140thh">    mode,</span></span>
<span class="line"><span class="__shiki_140thh">    granted,</span></span>
<span class="line"><span class="__shiki_140thh">    fastpath,</span></span>
<span class="line"><span class="__shiki_140thh">    waitstart</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_locks</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> pid </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> (pg_backend_pid(), ...)</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> pid, locktype;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看多事务信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    m</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">xid</span><span class="__shiki_140thh">,                          </span><span class="__shiki_21nrsd">-- 多事务ID</span></span>
<span class="line"><span class="__shiki_dzsirb">    p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span><span class="__shiki_140thh">,                          </span><span class="__shiki_21nrsd">-- 进程ID</span></span>
<span class="line"><span class="__shiki_dzsirb">    p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">mode</span><span class="__shiki_140thh">,                         </span><span class="__shiki_21nrsd">-- 锁模式</span></span>
<span class="line"><span class="__shiki_dzsirb">    p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">granted</span><span class="__shiki_21nrsd">                       -- 是否已授权</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_multixact_members m</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> pg_locks p </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> m</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">xid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">transactionid</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">locktype</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;transactionid&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 监控多事务使用</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    age(multixid) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> multixact_age,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_relation_size(relid)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> table_size,</span></span>
<span class="line"><span class="__shiki_140thh">    schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">    relname</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_class c</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> pg_namespace n </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relnamespace</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> n</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relkind</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;r&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> age(multixid) </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 多事务维护配置</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 重要参数：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- max_multixact_age (默认400000000)     -- 最大多事务年龄</span></span>
<span class="line"><span class="__shiki_21nrsd">-- multixact_freeze_min_age (默认5000000) -- 冻结最小年龄</span></span>
<span class="line"><span class="__shiki_21nrsd">-- multixact_freeze_table_age (默认150000000) -- 冻结表年龄</span></span></code></pre></div><h2 id="四、锁机制与并发控制" tabindex="-1">四、锁机制与并发控制 <a class="header-anchor" href="#四、锁机制与并发控制" aria-label="Permalink to &quot;四、锁机制与并发控制&quot;">​</a></h2><h3 id="_4-1-postgresql锁层级" tabindex="-1">4.1 PostgreSQL锁层级 <a class="header-anchor" href="#_4-1-postgresql锁层级" aria-label="Permalink to &quot;4.1 PostgreSQL锁层级&quot;">​</a></h3><h4 id="_4-1-1-锁类型与模式" tabindex="-1">4.1.1 锁类型与模式 <a class="header-anchor" href="#_4-1-1-锁类型与模式" aria-label="Permalink to &quot;4.1.1 锁类型与模式&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- PostgreSQL锁层级</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">锁类型（locktype）：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. relation       -- 关系锁（表、索引等）</span></span>
<span class="line"><span class="__shiki_21nrsd">2. extend         -- 扩展关系锁</span></span>
<span class="line"><span class="__shiki_21nrsd">3. page           -- 页锁</span></span>
<span class="line"><span class="__shiki_21nrsd">4. tuple          -- 元组锁</span></span>
<span class="line"><span class="__shiki_21nrsd">5. transactionid  -- 事务ID锁</span></span>
<span class="line"><span class="__shiki_21nrsd">6. virtualxid     -- 虚拟事务ID锁</span></span>
<span class="line"><span class="__shiki_21nrsd">7. object         -- 对象锁（数据库、模式等）</span></span>
<span class="line"><span class="__shiki_21nrsd">8. userlock       -- 用户锁（已弃用）</span></span>
<span class="line"><span class="__shiki_21nrsd">9. advisory       -- 咨询锁</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">锁模式（mode）：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. AccessShareLock        -- SELECT</span></span>
<span class="line"><span class="__shiki_21nrsd">2. RowShareLock           -- SELECT FOR UPDATE/SHARE</span></span>
<span class="line"><span class="__shiki_21nrsd">3. RowExclusiveLock       -- INSERT, UPDATE, DELETE</span></span>
<span class="line"><span class="__shiki_21nrsd">4. ShareUpdateExclusiveLock -- VACUUM, CREATE INDEX CONCURRENTLY</span></span>
<span class="line"><span class="__shiki_21nrsd">5. ShareLock              -- CREATE INDEX</span></span>
<span class="line"><span class="__shiki_21nrsd">6. ShareRowExclusiveLock  -- 锁表，排除其他写入</span></span>
<span class="line"><span class="__shiki_21nrsd">7. ExclusiveLock          -- 阻止其他读写</span></span>
<span class="line"><span class="__shiki_21nrsd">8. AccessExclusiveLock    -- DROP, TRUNCATE, ALTER TABLE</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看当前锁信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    locktype,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> locktype</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;relation&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_140thh"> relation::regclass::</span><span class="__shiki_1itgoe">text</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;transactionid&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_140thh"> transactionid::</span><span class="__shiki_1itgoe">text</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;tuple&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_140thh"> relation::regclass </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39; (&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_1itgoe"> page</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_mdbnqw"> &#39;,&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> tuple </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;)&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_dzsirb"> COALESCE</span><span class="__shiki_140thh">(relation::regclass::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> locked_object,</span></span>
<span class="line"><span class="__shiki_140thh">    mode,</span></span>
<span class="line"><span class="__shiki_140thh">    granted,</span></span>
<span class="line"><span class="__shiki_140thh">    pid,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_blocking_pids(pid) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> blocking_pids,</span></span>
<span class="line"><span class="__shiki_140thh">    age(</span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">(), query_start) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> query_age</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_locks l</span></span>
<span class="line"><span class="__shiki_1itgoe">LEFT JOIN</span><span class="__shiki_140thh"> pg_stat_activity a </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> l</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_dzsirb"> l</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> pg_backend_pid()  </span><span class="__shiki_21nrsd">-- 排除当前会话</span></span>
<span class="line"><span class="__shiki_1itgoe">AND</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">state</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;active&#39;</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_dzsirb"> a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">state</span><span class="__shiki_1itgoe"> IS</span><span class="__shiki_1itgoe"> NULL</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> locktype, granted </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 锁兼容性矩阵查询</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> lock_modes </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    VALUES</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;AccessShareLock&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;RowShareLock&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;RowExclusiveLock&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;ShareUpdateExclusiveLock&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;ShareLock&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;ShareRowExclusiveLock&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;ExclusiveLock&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;AccessExclusiveLock&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    l1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">column1</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> held_lock,</span></span>
<span class="line"><span class="__shiki_dzsirb">    l2</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">column1</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> requested_lock,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_lock_conflicts(</span><span class="__shiki_dzsirb">l1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">column1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">l2</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">column1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> conflicts</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> lock_modes l1</span></span>
<span class="line"><span class="__shiki_1itgoe">CROSS JOIN</span><span class="__shiki_140thh"> lock_modes l2</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_dzsirb"> l1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">column1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">l2</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">column1</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_4-1-2-死锁检测与处理" tabindex="-1">4.1.2 死锁检测与处理 <a class="header-anchor" href="#_4-1-2-死锁检测与处理" aria-label="Permalink to &quot;4.1.2 死锁检测与处理&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 死锁模拟与检测</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建测试表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> deadlock_test</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    value</span><span class="__shiki_1itgoe"> INTEGER</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> deadlock_test (</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">), (</span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">), (</span><span class="__shiki_dzsirb">300</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话1</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> deadlock_test </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_1itgoe"> value</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> value</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_1itgoe"> WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话2</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> deadlock_test </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_1itgoe"> value</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> value</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 20</span><span class="__shiki_1itgoe"> WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话1（继续）</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> deadlock_test </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_1itgoe"> value</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> value</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 30</span><span class="__shiki_1itgoe"> WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 等待会话2</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话2（继续）</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> deadlock_test </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_1itgoe"> value</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> value</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 40</span><span class="__shiki_1itgoe"> WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 检测到死锁</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看死锁检测配置</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    setting,</span></span>
<span class="line"><span class="__shiki_140thh">    unit,</span></span>
<span class="line"><span class="__shiki_140thh">    short_desc</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_settings</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%deadlock%&#39;</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%lock%timeout%&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 重要参数：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- deadlock_timeout (默认1s)       -- 死锁检测超时</span></span>
<span class="line"><span class="__shiki_21nrsd">-- lock_timeout (默认0，禁用)      -- 锁获取超时</span></span>
<span class="line"><span class="__shiki_21nrsd">-- statement_timeout (默认0，禁用) -- 语句执行超时</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 死锁日志分析</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 检查PostgreSQL日志中的死锁信息</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">典型死锁日志：</span></span>
<span class="line"><span class="__shiki_21nrsd">ERROR:  deadlock detected</span></span>
<span class="line"><span class="__shiki_21nrsd">DETAIL:  Process 12345 waits for ShareLock on transaction 54321; blocked by process 67890.</span></span>
<span class="line"><span class="__shiki_21nrsd">Process 67890 waits for ShareLock on transaction 12345; blocked by process 12345.</span></span>
<span class="line"><span class="__shiki_21nrsd">HINT:  See server log for query details.</span></span>
<span class="line"><span class="__shiki_21nrsd">CONTEXT:  while updating tuple (0,1) in relation &quot;deadlock_test&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 预防死锁的最佳实践</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 按固定顺序访问资源</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 使用锁超时</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 保持事务简短</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 使用适当的隔离级别</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 设置锁超时</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_1itgoe"> LOCAL</span><span class="__shiki_1itgoe"> lock_timeout</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;5s&#39;</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 5秒锁超时</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> deadlock_test </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_1itgoe"> value</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> value</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">COMMIT</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 死锁检测与处理函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> detect_potential_deadlocks</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    waiter_pid </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    waiter_locktype </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    waiter_mode </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    blocker_pid </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    blocker_locktype </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    blocker_mode </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    cycle_depth </span><span class="__shiki_1itgoe">integer</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    WITH</span><span class="__shiki_1itgoe"> RECURSIVE</span><span class="__shiki_140thh"> lock_chains </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 基础查询：找到所有被阻塞的进程</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">            w</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> waiter_pid,</span></span>
<span class="line"><span class="__shiki_dzsirb">            w</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">locktype</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> waiter_locktype,</span></span>
<span class="line"><span class="__shiki_dzsirb">            w</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">mode</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> waiter_mode,</span></span>
<span class="line"><span class="__shiki_dzsirb">            b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> blocker_pid,</span></span>
<span class="line"><span class="__shiki_dzsirb">            b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">locktype</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> blocker_locktype,</span></span>
<span class="line"><span class="__shiki_dzsirb">            b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">mode</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> blocker_mode,</span></span>
<span class="line"><span class="__shiki_dzsirb">            1</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> depth,</span></span>
<span class="line"><span class="__shiki_1itgoe">            ARRAY</span><span class="__shiki_140thh">[w.pid] </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> path</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_locks w</span></span>
<span class="line"><span class="__shiki_1itgoe">        JOIN</span><span class="__shiki_140thh"> pg_locks b </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">            w</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">database</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">database</span><span class="__shiki_1itgoe"> AND</span></span>
<span class="line"><span class="__shiki_dzsirb">            w</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relation</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relation</span><span class="__shiki_1itgoe"> AND</span></span>
<span class="line"><span class="__shiki_dzsirb">            w</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">page</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">page</span><span class="__shiki_1itgoe"> AND</span></span>
<span class="line"><span class="__shiki_dzsirb">            w</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">tuple</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">tuple</span><span class="__shiki_1itgoe"> AND</span></span>
<span class="line"><span class="__shiki_dzsirb">            w</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">virtualxid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">virtualxid</span><span class="__shiki_1itgoe"> AND</span></span>
<span class="line"><span class="__shiki_dzsirb">            w</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">transactionid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">transactionid</span><span class="__shiki_1itgoe"> AND</span></span>
<span class="line"><span class="__shiki_dzsirb">            w</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">classid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">classid</span><span class="__shiki_1itgoe"> AND</span></span>
<span class="line"><span class="__shiki_dzsirb">            w</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">objid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">objid</span><span class="__shiki_1itgoe"> AND</span></span>
<span class="line"><span class="__shiki_dzsirb">            w</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">objsubid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">objsubid</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_dzsirb"> w</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">granted</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_dzsirb"> b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">granted</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        UNION ALL</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 递归查询：查找阻塞链</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">            lc</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">waiter_pid</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            lc</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">waiter_locktype</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            lc</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">waiter_mode</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> blocker_pid,</span></span>
<span class="line"><span class="__shiki_dzsirb">            b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">locktype</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> blocker_locktype,</span></span>
<span class="line"><span class="__shiki_dzsirb">            b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">mode</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> blocker_mode,</span></span>
<span class="line"><span class="__shiki_dzsirb">            lc</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">depth</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            lc</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">path</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> lock_chains lc</span></span>
<span class="line"><span class="__shiki_1itgoe">        JOIN</span><span class="__shiki_140thh"> pg_locks w </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> lc</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">blocker_pid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> w</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span></span>
<span class="line"><span class="__shiki_1itgoe">        JOIN</span><span class="__shiki_140thh"> pg_locks b </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">            w</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">database</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">database</span><span class="__shiki_1itgoe"> AND</span></span>
<span class="line"><span class="__shiki_dzsirb">            w</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relation</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relation</span><span class="__shiki_1itgoe"> AND</span></span>
<span class="line"><span class="__shiki_dzsirb">            w</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">page</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">page</span><span class="__shiki_1itgoe"> AND</span></span>
<span class="line"><span class="__shiki_dzsirb">            w</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">tuple</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">tuple</span><span class="__shiki_1itgoe"> AND</span></span>
<span class="line"><span class="__shiki_dzsirb">            w</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">virtualxid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">virtualxid</span><span class="__shiki_1itgoe"> AND</span></span>
<span class="line"><span class="__shiki_dzsirb">            w</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">transactionid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">transactionid</span><span class="__shiki_1itgoe"> AND</span></span>
<span class="line"><span class="__shiki_dzsirb">            w</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">classid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">classid</span><span class="__shiki_1itgoe"> AND</span></span>
<span class="line"><span class="__shiki_dzsirb">            w</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">objid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">objid</span><span class="__shiki_1itgoe"> AND</span></span>
<span class="line"><span class="__shiki_dzsirb">            w</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">objsubid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">objsubid</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_dzsirb"> w</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">granted</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_dzsirb"> b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">granted</span></span>
<span class="line"><span class="__shiki_1itgoe">        AND</span><span class="__shiki_dzsirb"> b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span><span class="__shiki_1itgoe"> !=</span><span class="__shiki_140thh"> ALL(</span><span class="__shiki_dzsirb">lc</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">path</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">-- 避免循环</span></span>
<span class="line"><span class="__shiki_1itgoe">        AND</span><span class="__shiki_dzsirb"> lc</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">depth</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_21nrsd">  -- 防止无限递归</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        waiter_pid,</span></span>
<span class="line"><span class="__shiki_140thh">        waiter_locktype,</span></span>
<span class="line"><span class="__shiki_140thh">        waiter_mode,</span></span>
<span class="line"><span class="__shiki_140thh">        blocker_pid,</span></span>
<span class="line"><span class="__shiki_140thh">        blocker_locktype,</span></span>
<span class="line"><span class="__shiki_140thh">        blocker_mode,</span></span>
<span class="line"><span class="__shiki_140thh">        depth</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> lock_chains</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> depth </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_21nrsd">  -- 深度&gt;=3可能形成死锁环</span></span>
<span class="line"><span class="__shiki_1itgoe">    ORDER BY</span><span class="__shiki_140thh"> depth </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">    LIMIT</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用死锁检测函数</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> detect_potential_deadlocks();</span></span></code></pre></div><h3 id="_4-2-行级锁与谓词锁" tabindex="-1">4.2 行级锁与谓词锁 <a class="header-anchor" href="#_4-2-行级锁与谓词锁" aria-label="Permalink to &quot;4.2 行级锁与谓词锁&quot;">​</a></h3><h4 id="_4-2-1-行级锁实现" tabindex="-1">4.2.1 行级锁实现 <a class="header-anchor" href="#_4-2-1-行级锁实现" aria-label="Permalink to &quot;4.2.1 行级锁实现&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 行级锁（元组锁）详解</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">行级锁类型：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. FOR UPDATE        -- 排他行锁</span></span>
<span class="line"><span class="__shiki_21nrsd">2. FOR NO KEY UPDATE -- 非键更新锁（较弱的排他锁）</span></span>
<span class="line"><span class="__shiki_21nrsd">3. FOR SHARE         -- 共享行锁</span></span>
<span class="line"><span class="__shiki_21nrsd">4. FOR KEY SHARE     -- 键共享锁（最弱的锁）</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建测试表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> row_locking_test</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    account_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    balance </span><span class="__shiki_1itgoe">DECIMAL</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1itgoe">    status</span><span class="__shiki_1itgoe"> VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> row_locking_test (account_id, balance, </span><span class="__shiki_1itgoe">status</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    (n % </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    1000</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">00</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> random(),</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_1itgoe"> WHEN</span><span class="__shiki_140thh"> random() </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">5</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;active&#39;</span><span class="__shiki_1itgoe"> ELSE</span><span class="__shiki_mdbnqw"> &#39;inactive&#39;</span><span class="__shiki_1itgoe"> END</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_dzsirb"> generate_series</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">) n;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 不同行级锁示例</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话1：获取排他锁</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> row_locking_test </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> FOR</span><span class="__shiki_1itgoe"> UPDATE</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话2：尝试不同类型的锁</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. SELECT FOR UPDATE（被阻塞）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> row_locking_test </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> FOR</span><span class="__shiki_1itgoe"> UPDATE</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. SELECT FOR NO KEY UPDATE（被阻塞）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> row_locking_test </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> FOR</span><span class="__shiki_1itgoe"> NO</span><span class="__shiki_1itgoe"> KEY</span><span class="__shiki_1itgoe"> UPDATE</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. SELECT FOR SHARE（被阻塞）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> row_locking_test </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> FOR</span><span class="__shiki_140thh"> SHARE;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. SELECT FOR KEY SHARE（可能成功，取决于锁升级）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> row_locking_test </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> FOR</span><span class="__shiki_1itgoe"> KEY</span><span class="__shiki_140thh"> SHARE;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看行级锁信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    locktype,</span></span>
<span class="line"><span class="__shiki_140thh">    relation::regclass,</span></span>
<span class="line"><span class="__shiki_1itgoe">    page</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    tuple,</span></span>
<span class="line"><span class="__shiki_140thh">    virtualxid,</span></span>
<span class="line"><span class="__shiki_140thh">    transactionid,</span></span>
<span class="line"><span class="__shiki_140thh">    mode,</span></span>
<span class="line"><span class="__shiki_140thh">    granted,</span></span>
<span class="line"><span class="__shiki_140thh">    pid,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_blocking_pids(pid) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> blocking_pids</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_locks</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> locktype </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;tuple&#39;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">   OR</span><span class="__shiki_140thh"> (locktype </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;transactionid&#39;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_140thh"> mode </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%ExclusiveLock&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 行级锁冲突矩阵</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">锁兼容性：</span></span>
<span class="line"><span class="__shiki_21nrsd">                | FOR UPDATE | NO KEY UPDATE | FOR SHARE | KEY SHARE</span></span>
<span class="line"><span class="__shiki_21nrsd">----------------|------------|---------------|-----------|----------</span></span>
<span class="line"><span class="__shiki_21nrsd">FOR UPDATE      |    冲突     |      冲突      |    冲突    |    冲突</span></span>
<span class="line"><span class="__shiki_21nrsd">NO KEY UPDATE   |    冲突     |      冲突      |    冲突    |    兼容</span></span>
<span class="line"><span class="__shiki_21nrsd">FOR SHARE       |    冲突     |      冲突      |    兼容    |    兼容</span></span>
<span class="line"><span class="__shiki_21nrsd">KEY SHARE       |    冲突     |      兼容      |    兼容    |    兼容</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 监控行级锁等待</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">datname</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">usename</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">application_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">client_addr</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">state</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">wait_event_type</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">wait_event</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">query</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    age(</span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">query_start</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> query_age,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_blocking_pids(</span><span class="__shiki_dzsirb">a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> blocking_pids</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_activity a</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">wait_event_type</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;Lock&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">AND</span><span class="__shiki_dzsirb"> a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">state</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;active&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_dzsirb"> a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">query_start</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_4-2-2-谓词锁与ssi" tabindex="-1">4.2.2 谓词锁与SSI <a class="header-anchor" href="#_4-2-2-谓词锁与ssi" aria-label="Permalink to &quot;4.2.2 谓词锁与SSI&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 可序列化隔离级别与谓词锁</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">串行化快照隔离(SSI)：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. 使用谓词锁检测写偏序(Write Skew)</span></span>
<span class="line"><span class="__shiki_21nrsd">2. 在SERIALIZABLE隔离级别下工作</span></span>
<span class="line"><span class="__shiki_21nrsd">3. 检测并回滚序列化异常</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">谓词锁类型：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. SIReadLock - 串行化隔离读锁</span></span>
<span class="line"><span class="__shiki_21nrsd">2. 用于检测读写依赖</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 串行化隔离级别示例</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建银行账户表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> bank_accounts_serializable</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    account_name </span><span class="__shiki_1itgoe">VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    balance </span><span class="__shiki_1itgoe">DECIMAL</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    min_balance </span><span class="__shiki_1itgoe">DECIMAL</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">DEFAULT</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CHECK</span><span class="__shiki_140thh"> (balance </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> min_balance)</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> bank_accounts_serializable </span></span>
<span class="line"><span class="__shiki_140thh">(account_name, balance, min_balance) </span><span class="__shiki_1itgoe">VALUES</span></span>
<span class="line"><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Alice&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Bob&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Joint&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">);  </span><span class="__shiki_21nrsd">-- 联合账户允许透支</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 写偏序问题模拟</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话1：检查Alice的余额并从联合账户转账</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_1itgoe"> TRANSACTION</span><span class="__shiki_1itgoe"> ISOLATION</span><span class="__shiki_1itgoe"> LEVEL</span><span class="__shiki_1itgoe"> SERIALIZABLE</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> balance </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> bank_accounts_serializable </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> account_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;Alice&#39;</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 假设返回1000</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话2：检查Bob的余额并从联合账户转账</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_1itgoe"> TRANSACTION</span><span class="__shiki_1itgoe"> ISOLATION</span><span class="__shiki_1itgoe"> LEVEL</span><span class="__shiki_1itgoe"> SERIALIZABLE</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> balance </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> bank_accounts_serializable </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> account_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;Bob&#39;</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 假设返回1000</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话1：执行转账</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> bank_accounts_serializable </span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> balance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> balance </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> account_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;Joint&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话2：执行转账</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> bank_accounts_serializable </span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> balance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> balance </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> account_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;Joint&#39;</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 可能成功或失败</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 会话1和2都提交</span></span>
<span class="line"><span class="__shiki_1itgoe">COMMIT</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 会话1</span></span>
<span class="line"><span class="__shiki_1itgoe">COMMIT</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 会话2（可能收到序列化错误）</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看SSI冲突</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> serialization_failures,</span></span>
<span class="line"><span class="__shiki_dzsirb">    sum</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">case</span><span class="__shiki_1itgoe"> when</span><span class="__shiki_dzsirb"> ss</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">serialization_failure</span><span class="__shiki_1itgoe"> then</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> else</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> end</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> failures,</span></span>
<span class="line"><span class="__shiki_dzsirb">    sum</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">case</span><span class="__shiki_1itgoe"> when</span><span class="__shiki_dzsirb"> ss</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">serialization_failure</span><span class="__shiki_1itgoe"> then</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> else</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> end</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> successes</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_statements ss</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> ss</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">query</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%bank_accounts_serializable%&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- SSI相关配置</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    setting,</span></span>
<span class="line"><span class="__shiki_140thh">    unit,</span></span>
<span class="line"><span class="__shiki_140thh">    short_desc</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_settings</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%serial%&#39;</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%predicate%&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 重要参数：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- max_predicate_locks_per_transaction (默认64) -- 每个事务的最大谓词锁数</span></span>
<span class="line"><span class="__shiki_21nrsd">-- max_predicate_locks_per_relation (默认-1)   -- 每个关系的最大谓词锁数</span></span>
<span class="line"><span class="__shiki_21nrsd">-- serializable_deferrable (默认off)           -- 是否延迟串行化检查</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 监控谓词锁使用</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    locktype,</span></span>
<span class="line"><span class="__shiki_140thh">    relation::regclass,</span></span>
<span class="line"><span class="__shiki_1itgoe">    page</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    tuple,</span></span>
<span class="line"><span class="__shiki_140thh">    virtualxid,</span></span>
<span class="line"><span class="__shiki_140thh">    transactionid,</span></span>
<span class="line"><span class="__shiki_1itgoe">    objid</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    classid,</span></span>
<span class="line"><span class="__shiki_140thh">    objsubid,</span></span>
<span class="line"><span class="__shiki_140thh">    mode,</span></span>
<span class="line"><span class="__shiki_140thh">    granted</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_locks</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> locktype </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;predicate&#39;</span><span class="__shiki_21nrsd">  -- 谓词锁</span></span>
<span class="line"><span class="__shiki_1itgoe">   OR</span><span class="__shiki_140thh"> mode </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;SI%&#39;</span><span class="__shiki_140thh">;        </span><span class="__shiki_21nrsd">-- SI相关锁模式</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- SSI性能优化建议</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 增加max_predicate_locks_per_transaction</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 使用DEFERRABLE事务减少冲突</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 避免长事务</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 合理设计数据访问模式</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用DEFERRABLE事务</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_1itgoe"> TRANSACTION</span><span class="__shiki_1itgoe"> ISOLATION</span><span class="__shiki_1itgoe"> LEVEL</span><span class="__shiki_1itgoe"> SERIALIZABLE</span><span class="__shiki_140thh">, DEFERRABLE;</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 事务在整个过程中不检查序列化冲突，只在提交时检查</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> balance </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> bank_accounts_serializable </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> account_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;Alice&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> bank_accounts_serializable </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> balance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> balance </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> WHERE</span><span class="__shiki_140thh"> account_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;Alice&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">COMMIT</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 在此处检查序列化冲突</span></span></code></pre></div><h2 id="五、vacuum与版本清理" tabindex="-1">五、VACUUM与版本清理 <a class="header-anchor" href="#五、vacuum与版本清理" aria-label="Permalink to &quot;五、VACUUM与版本清理&quot;">​</a></h2><h3 id="_5-1-vacuum工作机制" tabindex="-1">5.1 VACUUM工作机制 <a class="header-anchor" href="#_5-1-vacuum工作机制" aria-label="Permalink to &quot;5.1 VACUUM工作机制&quot;">​</a></h3><h4 id="_5-1-1-vacuum类型与策略" tabindex="-1">5.1.1 VACUUM类型与策略 <a class="header-anchor" href="#_5-1-1-vacuum类型与策略" aria-label="Permalink to &quot;5.1.1 VACUUM类型与策略&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- VACUUM类型详解</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">1. 标准VACUUM（并发VACUUM）：</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 不锁表，可并行读写</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 清理死元组</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 更新统计信息</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 不回收空间给操作系统</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">2. VACUUM FULL：</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 排它锁表</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 重组表，回收空间</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 性能影响大</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">3. 自动VACUUM：</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 后台自动执行</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 基于阈值触发</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 执行不同类型的VACUUM</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 标准VACUUM</span></span>
<span class="line"><span class="__shiki_140thh">VACUUM (</span><span class="__shiki_1itgoe">VERBOSE</span><span class="__shiki_140thh">, ANALYZE) your_table;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 带选项的VACUUM</span></span>
<span class="line"><span class="__shiki_140thh">VACUUM (</span></span>
<span class="line"><span class="__shiki_1itgoe">    VERBOSE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    ANALYZE,</span></span>
<span class="line"><span class="__shiki_140thh">    SKIP_LOCKED,        </span><span class="__shiki_21nrsd">-- 跳过锁定的表</span></span>
<span class="line"><span class="__shiki_140thh">    PROCESS_TOAST,      </span><span class="__shiki_21nrsd">-- 处理TOAST表</span></span>
<span class="line"><span class="__shiki_140thh">    DISABLE_PAGE_SKIPPING  </span><span class="__shiki_21nrsd">-- 禁用页跳过</span></span>
<span class="line"><span class="__shiki_140thh">) your_table;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. VACUUM FULL</span></span>
<span class="line"><span class="__shiki_140thh">VACUUM FULL </span><span class="__shiki_1itgoe">VERBOSE</span><span class="__shiki_140thh"> your_table;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 冻结VACUUM（处理事务ID回卷）</span></span>
<span class="line"><span class="__shiki_140thh">VACUUM FREEZE </span><span class="__shiki_1itgoe">VERBOSE</span><span class="__shiki_140thh"> your_table;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看VACUUM进度</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    datname,</span></span>
<span class="line"><span class="__shiki_140thh">    age(datfrozenxid) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> frozen_age,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_database_size(datname)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> db_size</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_database</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> age(datfrozenxid) </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 监控VACUUM活动</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    pid,</span></span>
<span class="line"><span class="__shiki_140thh">    datname,</span></span>
<span class="line"><span class="__shiki_140thh">    usename,</span></span>
<span class="line"><span class="__shiki_140thh">    application_name,</span></span>
<span class="line"><span class="__shiki_1itgoe">    state</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    query,</span></span>
<span class="line"><span class="__shiki_140thh">    backend_xid,</span></span>
<span class="line"><span class="__shiki_140thh">    backend_xmin,</span></span>
<span class="line"><span class="__shiki_140thh">    age(backend_xmin) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> xmin_age</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_activity</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%VACUUM%&#39;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">   OR</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%autovacuum%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> query_start;</span></span></code></pre></div><h4 id="_5-1-2-自动vacuum配置" tabindex="-1">5.1.2 自动VACUUM配置 <a class="header-anchor" href="#_5-1-2-自动vacuum配置" aria-label="Permalink to &quot;5.1.2 自动VACUUM配置&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 自动VACUUM配置参数</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    setting,</span></span>
<span class="line"><span class="__shiki_140thh">    unit,</span></span>
<span class="line"><span class="__shiki_140thh">    short_desc,</span></span>
<span class="line"><span class="__shiki_140thh">    category</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_settings</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;autovacuum%&#39;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">   OR</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;vacuum%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">   OR</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%freeze%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> category, </span><span class="__shiki_1itgoe">name</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 重要参数分类：</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 触发阈值</span></span>
<span class="line"><span class="__shiki_21nrsd">-- autovacuum_vacuum_threshold = 50</span></span>
<span class="line"><span class="__shiki_21nrsd">-- autovacuum_vacuum_scale_factor = 0.2</span></span>
<span class="line"><span class="__shiki_21nrsd">-- autovacuum_analyze_threshold = 50</span></span>
<span class="line"><span class="__shiki_21nrsd">-- autovacuum_analyze_scale_factor = 0.1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 工作进程</span></span>
<span class="line"><span class="__shiki_21nrsd">-- autovacuum_max_workers = 3</span></span>
<span class="line"><span class="__shiki_21nrsd">-- autovacuum_naptime = 1min</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 成本控制</span></span>
<span class="line"><span class="__shiki_21nrsd">-- autovacuum_vacuum_cost_delay = 2ms</span></span>
<span class="line"><span class="__shiki_21nrsd">-- autovacuum_vacuum_cost_limit = 200</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 冻结相关</span></span>
<span class="line"><span class="__shiki_21nrsd">-- vacuum_freeze_min_age = 50000000</span></span>
<span class="line"><span class="__shiki_21nrsd">-- vacuum_freeze_table_age = 1500000000</span></span>
<span class="line"><span class="__shiki_21nrsd">-- autovacuum_freeze_max_age = 2000000000</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 表级自动VACUUM配置</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> your_table </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    autovacuum_enabled </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true,</span></span>
<span class="line"><span class="__shiki_140thh">    autovacuum_vacuum_threshold </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    autovacuum_vacuum_scale_factor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    autovacuum_analyze_threshold </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    autovacuum_analyze_scale_factor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">05</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    autovacuum_vacuum_cost_delay </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    autovacuum_freeze_min_age </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 10000000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    autovacuum_freeze_max_age </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1000000000</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看表级VACUUM配置</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    relname,</span></span>
<span class="line"><span class="__shiki_140thh">    reloptions,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_relation_size(</span><span class="__shiki_1itgoe">oid</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> size</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    n_live_tup,</span></span>
<span class="line"><span class="__shiki_140thh">    n_dead_tup</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_class</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> reloptions </span><span class="__shiki_1itgoe">IS NOT NULL</span></span>
<span class="line"><span class="__shiki_1itgoe">AND</span><span class="__shiki_140thh"> relkind </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;r&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> pg_relation_size(</span><span class="__shiki_1itgoe">oid</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 自动VACUUM监控视图</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> VIEW</span><span class="__shiki_1t8gfj"> autovacuum_monitor</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">    relname,</span></span>
<span class="line"><span class="__shiki_140thh">    last_vacuum,</span></span>
<span class="line"><span class="__shiki_140thh">    last_autovacuum,</span></span>
<span class="line"><span class="__shiki_140thh">    last_analyze,</span></span>
<span class="line"><span class="__shiki_140thh">    last_autoanalyze,</span></span>
<span class="line"><span class="__shiki_140thh">    vacuum_count,</span></span>
<span class="line"><span class="__shiki_140thh">    autovacuum_count,</span></span>
<span class="line"><span class="__shiki_140thh">    analyze_count,</span></span>
<span class="line"><span class="__shiki_140thh">    autoanalyze_count,</span></span>
<span class="line"><span class="__shiki_140thh">    n_live_tup,</span></span>
<span class="line"><span class="__shiki_140thh">    n_dead_tup,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> n_live_tup </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        THEN</span><span class="__shiki_dzsirb"> round</span><span class="__shiki_140thh">(n_dead_tup::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> n_live_tup, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> dead_tup_percentage,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_relation_size(relid)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> table_size</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_user_tables</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> n_live_tup </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> n_dead_tup </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> autovacuum_monitor </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> dead_tup_percentage </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 死元组比例超过10%的表</span></span></code></pre></div><h3 id="_5-2-性能优化与最佳实践" tabindex="-1">5.2 性能优化与最佳实践 <a class="header-anchor" href="#_5-2-性能优化与最佳实践" aria-label="Permalink to &quot;5.2 性能优化与最佳实践&quot;">​</a></h3><h4 id="_5-2-1-mvcc性能调优" tabindex="-1">5.2.1 MVCC性能调优 <a class="header-anchor" href="#_5-2-1-mvcc性能调优" aria-label="Permalink to &quot;5.2.1 MVCC性能调优&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- MVCC性能优化策略</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 监控和调整填充因子</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> optimized_table</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    data</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (fillfactor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 70</span><span class="__shiki_140thh">);  </span><span class="__shiki_21nrsd">-- 为更新预留30%空间</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 检查表膨胀</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">    tablename,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_relation_size(relid)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> table_size,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_total_relation_size(relid) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> pg_relation_size(relid)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> index_size,</span></span>
<span class="line"><span class="__shiki_140thh">    n_live_tup,</span></span>
<span class="line"><span class="__shiki_140thh">    n_dead_tup,</span></span>
<span class="line"><span class="__shiki_dzsirb">    round</span><span class="__shiki_140thh">(n_dead_tup::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> GREATEST</span><span class="__shiki_140thh">(n_live_tup </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> n_dead_tup, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> dead_percentage</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_user_tables</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> (pg_total_relation_size(relid) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> pg_relation_size(relid)) </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 优化事务ID管理</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 定期执行预防性VACUUM</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> preventive_vacuum</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> void </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    tbl record;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> tbl </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">            relname,</span></span>
<span class="line"><span class="__shiki_140thh">            age(relfrozenxid) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> xid_age</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_class c</span></span>
<span class="line"><span class="__shiki_1itgoe">        JOIN</span><span class="__shiki_140thh"> pg_namespace n </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relnamespace</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> n</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relkind</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;r&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        AND</span><span class="__shiki_140thh"> age(relfrozenxid) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100000000</span><span class="__shiki_21nrsd">  -- 超过1亿事务年龄</span></span>
<span class="line"><span class="__shiki_1itgoe">        AND</span><span class="__shiki_140thh"> pg_relation_size(</span><span class="__shiki_dzsirb">c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_21nrsd">  -- 大于100MB</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_140thh">        RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;Vacuuming table: %.% (age: %)&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">            tbl</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">schemaname</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">tbl</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relname</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">tbl</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">xid_age</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;VACUUM FREEZE VERBOSE %I.%I&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">                      tbl</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">schemaname</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">tbl</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relname</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 配置合适的维护工作内存</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> maintenance_work_mem </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;1GB&#39;</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 对于大型VACUUM操作</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 并行VACUUM（PostgreSQL 13+）</span></span>
<span class="line"><span class="__shiki_140thh">VACUUM (PARALLEL </span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">VERBOSE</span><span class="__shiki_140thh">) large_table;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 索引清理优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建支持HOT更新的索引策略</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_optimized_hot</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> your_table (non_updating_column)</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> frequently_updated_column </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_1itgoe"> NULL</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 监控HOT更新效率</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">    relname,</span></span>
<span class="line"><span class="__shiki_140thh">    n_tup_upd,</span></span>
<span class="line"><span class="__shiki_140thh">    n_tup_hot_upd,</span></span>
<span class="line"><span class="__shiki_dzsirb">    round</span><span class="__shiki_140thh">(n_tup_hot_upd::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> NULLIF</span><span class="__shiki_140thh">(n_tup_upd, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> hot_ratio</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_user_tables</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> n_tup_upd </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> hot_ratio </span><span class="__shiki_1itgoe">ASC</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_5-2-2-长事务与快照问题处理" tabindex="-1">5.2.2 长事务与快照问题处理 <a class="header-anchor" href="#_5-2-2-长事务与快照问题处理" aria-label="Permalink to &quot;5.2.2 长事务与快照问题处理&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 检测和处理长事务</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 查找持有最老快照的事务</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    pid,</span></span>
<span class="line"><span class="__shiki_140thh">    usename,</span></span>
<span class="line"><span class="__shiki_140thh">    application_name,</span></span>
<span class="line"><span class="__shiki_140thh">    client_addr,</span></span>
<span class="line"><span class="__shiki_1itgoe">    state</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    backend_xmin,</span></span>
<span class="line"><span class="__shiki_140thh">    age(backend_xmin) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> xmin_age,</span></span>
<span class="line"><span class="__shiki_140thh">    backend_xid,</span></span>
<span class="line"><span class="__shiki_140thh">    age(backend_xid) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> xid_age,</span></span>
<span class="line"><span class="__shiki_140thh">    query_start,</span></span>
<span class="line"><span class="__shiki_140thh">    query,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_terminate_backend(pid) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> terminate_command</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_activity</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> backend_xmin </span><span class="__shiki_1itgoe">IS NOT NULL</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> backend_xmin</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 监控影响VACUUM的长事务</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> long_transactions </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        pid,</span></span>
<span class="line"><span class="__shiki_140thh">        usename,</span></span>
<span class="line"><span class="__shiki_140thh">        application_name,</span></span>
<span class="line"><span class="__shiki_140thh">        backend_xmin,</span></span>
<span class="line"><span class="__shiki_140thh">        age(backend_xmin) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> xmin_age,</span></span>
<span class="line"><span class="__shiki_140thh">        query_start,</span></span>
<span class="line"><span class="__shiki_1itgoe">        state</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        query</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_stat_activity</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> backend_xmin </span><span class="__shiki_1itgoe">IS NOT NULL</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_1itgoe"> state</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;idle in transaction&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_140thh"> age(backend_xmin) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 10000000</span><span class="__shiki_21nrsd">  -- 超过1000万事务年龄</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> long_transactions</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> xmin_age </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 预防长事务的最佳实践</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 设置语句超时</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> statement_timeout </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;30s&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 设置锁超时</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_1itgoe"> lock_timeout</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;5s&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 使用连接池设置最大事务时间</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 应用层事务管理</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用以下模式处理事务：</span></span>
<span class="line"><span class="__shiki_140thh">DO $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    max_attempts </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    attempt </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHILE</span><span class="__shiki_140thh"> attempt </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_140thh"> max_attempts </span><span class="__shiki_1itgoe">LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 开启短事务</span></span>
<span class="line"><span class="__shiki_1itgoe">            BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 业务逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">            UPDATE</span><span class="__shiki_140thh"> accounts </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> balance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> balance </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            UPDATE</span><span class="__shiki_140thh"> accounts </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> balance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> balance </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            COMMIT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            EXIT;  </span><span class="__shiki_21nrsd">-- 成功则退出循环</span></span>
<span class="line"><span class="__shiki_140thh">        EXCEPTION</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> deadlock_detected </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_1itgoe">                ROLLBACK</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;Deadlock detected, retrying (attempt %)&#39;</span><span class="__shiki_140thh">, attempt;</span></span>
<span class="line"><span class="__shiki_140thh">                attempt :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> attempt </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                PERFORM pg_sleep(random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);  </span><span class="__shiki_21nrsd">-- 随机等待</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> lock_not_available </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_1itgoe">                ROLLBACK</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;Lock timeout, retrying (attempt %)&#39;</span><span class="__shiki_140thh">, attempt;</span></span>
<span class="line"><span class="__shiki_140thh">                attempt :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> attempt </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                PERFORM pg_sleep(random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> OTHERS </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_1itgoe">                ROLLBACK</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                RAISE;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_140thh"> attempt </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> max_attempts </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_140thh">        RAISE EXCEPTION </span><span class="__shiki_mdbnqw">&#39;Failed after % attempts&#39;</span><span class="__shiki_140thh">, max_attempts;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 自动清理空闲事务</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用pg_terminate_backend终止长空闲事务</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> pg_terminate_backend(pid)</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_activity</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> state</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;idle in transaction&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">AND</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> state_change) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;10 minutes&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">AND</span><span class="__shiki_140thh"> pid </span><span class="__shiki_1itgoe">&lt;&gt;</span><span class="__shiki_140thh"> pg_backend_pid();</span></span></code></pre></div><h2 id="六、高级特性与未来趋势" tabindex="-1">六、高级特性与未来趋势 <a class="header-anchor" href="#六、高级特性与未来趋势" aria-label="Permalink to &quot;六、高级特性与未来趋势&quot;">​</a></h2><h3 id="_6-1-逻辑复制与事务" tabindex="-1">6.1 逻辑复制与事务 <a class="header-anchor" href="#_6-1-逻辑复制与事务" aria-label="Permalink to &quot;6.1 逻辑复制与事务&quot;">​</a></h3><h4 id="_6-1-1-逻辑复制中的事务处理" tabindex="-1">6.1.1 逻辑复制中的事务处理 <a class="header-anchor" href="#_6-1-1-逻辑复制中的事务处理" aria-label="Permalink to &quot;6.1.1 逻辑复制中的事务处理&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 逻辑复制的事务一致性</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">逻辑复制特点：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. 基于WAL日志的逻辑解码</span></span>
<span class="line"><span class="__shiki_21nrsd">2. 保持事务的原子性和顺序</span></span>
<span class="line"><span class="__shiki_21nrsd">3. 支持并行应用（PostgreSQL 13+）</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建发布</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> PUBLICATION mypub </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> table1, table2;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 配置逻辑复制槽</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_create_logical_replication_slot(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;myslot&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;pgoutput&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 监控逻辑复制延迟</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    application_name,</span></span>
<span class="line"><span class="__shiki_140thh">    client_addr,</span></span>
<span class="line"><span class="__shiki_1itgoe">    state</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    sync_state,</span></span>
<span class="line"><span class="__shiki_140thh">    write_lag,</span></span>
<span class="line"><span class="__shiki_140thh">    flush_lag,</span></span>
<span class="line"><span class="__shiki_140thh">    replay_lag,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_wal_lsn_diff(</span></span>
<span class="line"><span class="__shiki_140thh">        pg_current_wal_lsn(),</span></span>
<span class="line"><span class="__shiki_140thh">        replay_lsn</span></span>
<span class="line"><span class="__shiki_140thh">    )) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> replay_lag_bytes</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_replication</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> application_name </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%subscription%&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 逻辑复制中的事务冲突处理</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 冲突检测配置</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_140thh"> SUBSCRIPTION mysubscription </span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> (run_on_origin </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> false);  </span><span class="__shiki_21nrsd">-- 避免循环复制</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 冲突解析</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> handle_replication_conflict</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> event_trigger </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 记录冲突信息</span></span>
<span class="line"><span class="__shiki_1itgoe">    INSERT INTO</span><span class="__shiki_140thh"> replication_conflicts </span></span>
<span class="line"><span class="__shiki_140thh">    (conflict_time, table_name, operation, conflict_type)</span></span>
<span class="line"><span class="__shiki_1itgoe">    VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">(), TG_TABLE_NAME, TG_OP, </span><span class="__shiki_mdbnqw">&#39;replication_conflict&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 根据业务逻辑处理冲突</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 例如：跳过冲突行、记录到错误表等</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> EVENT</span><span class="__shiki_140thh"> TRIGGER replication_conflict_trigger</span></span>
<span class="line"><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> sql_drop</span></span>
<span class="line"><span class="__shiki_1itgoe">EXECUTE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_140thh"> handle_replication_conflict();</span></span></code></pre></div><h3 id="_6-2-分布式事务" tabindex="-1">6.2 分布式事务 <a class="header-anchor" href="#_6-2-分布式事务" aria-label="Permalink to &quot;6.2 分布式事务&quot;">​</a></h3><h4 id="_6-2-1-两阶段提交-2pc" tabindex="-1">6.2.1 两阶段提交(2PC) <a class="header-anchor" href="#_6-2-1-两阶段提交-2pc" aria-label="Permalink to &quot;6.2.1 两阶段提交(2PC)&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- PostgreSQL两阶段提交</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 第一阶段：准备事务</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> distributed_table </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;data&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">PREPARE </span><span class="__shiki_1itgoe">TRANSACTION</span><span class="__shiki_mdbnqw"> &#39;txn_001&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看准备的事务</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_prepared_xacts;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 第二阶段：提交或回滚</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 提交</span></span>
<span class="line"><span class="__shiki_1itgoe">COMMIT</span><span class="__shiki_140thh"> PREPARED </span><span class="__shiki_mdbnqw">&#39;txn_001&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 或回滚</span></span>
<span class="line"><span class="__shiki_1itgoe">ROLLBACK</span><span class="__shiki_140thh"> PREPARED </span><span class="__shiki_mdbnqw">&#39;txn_001&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 两阶段提交监控</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    gid,</span></span>
<span class="line"><span class="__shiki_140thh">    prepared,</span></span>
<span class="line"><span class="__shiki_1itgoe">    owner</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    database</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    transaction</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> xid</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_prepared_xacts</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> prepared </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 自动清理过期的准备事务</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 配置参数：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- max_prepared_transactions (默认0，禁用)</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 启用两阶段提交需要设置&gt;0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 分布式事务最佳实践</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 使用全局事务ID</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 实现重试机制</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 监控和清理悬挂事务</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> cleanup_prepared_transactions</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> void </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    prepared_txn record;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> prepared_txn </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> gid, prepared</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_prepared_xacts</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> prepared </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;24 hours&#39;</span><span class="__shiki_21nrsd">  -- 超过24小时</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        BEGIN</span></span>
<span class="line"><span class="__shiki_140thh">            RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;Rolling back old prepared transaction: %&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">prepared_txn</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">gid</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            EXECUTE</span><span class="__shiki_mdbnqw"> &#39;ROLLBACK PREPARED &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> quote_literal(</span><span class="__shiki_dzsirb">prepared_txn</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">gid</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        EXCEPTION</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> OTHERS </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_140thh">                RAISE WARNING </span><span class="__shiki_mdbnqw">&#39;Failed to rollback transaction %: %&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">                    prepared_txn</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">gid</span><span class="__shiki_140thh">, SQLERRM;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 定期执行清理</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> cleanup_prepared_transactions();</span></span></code></pre></div><h2 id="七、监控与诊断工具" tabindex="-1">七、监控与诊断工具 <a class="header-anchor" href="#七、监控与诊断工具" aria-label="Permalink to &quot;七、监控与诊断工具&quot;">​</a></h2><h3 id="_7-1-系统视图与扩展" tabindex="-1">7.1 系统视图与扩展 <a class="header-anchor" href="#_7-1-系统视图与扩展" aria-label="Permalink to &quot;7.1 系统视图与扩展&quot;">​</a></h3><h4 id="_7-1-1-关键系统视图" tabindex="-1">7.1.1 关键系统视图 <a class="header-anchor" href="#_7-1-1-关键系统视图" aria-label="Permalink to &quot;7.1.1 关键系统视图&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 事务和MVCC相关系统视图</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 事务信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_stat_activity;           </span><span class="__shiki_21nrsd">-- 活动连接</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_locks;                   </span><span class="__shiki_21nrsd">-- 锁信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_prepared_xacts;          </span><span class="__shiki_21nrsd">-- 准备的事务</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. MVCC信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_stat_user_tables;        </span><span class="__shiki_21nrsd">-- 表统计</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_statio_user_tables;      </span><span class="__shiki_21nrsd">-- 表I/O统计</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_stat_progress_vacuum;    </span><span class="__shiki_21nrsd">-- VACUUM进度</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 复制信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_stat_replication;        </span><span class="__shiki_21nrsd">-- 复制状态</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_stat_wal_receiver;       </span><span class="__shiki_21nrsd">-- WAL接收状态</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建综合监控视图</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> VIEW</span><span class="__shiki_1t8gfj"> transaction_monitor</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 事务信息</span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">usename</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">application_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">client_addr</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">state</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">backend_xid</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">backend_xmin</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    age(</span><span class="__shiki_dzsirb">a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">backend_xmin</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> xmin_age,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 查询信息</span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">query_start</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    age(</span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">query_start</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> query_age,</span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">query</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 等待信息</span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">wait_event_type</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">wait_event</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 锁信息</span></span>
<span class="line"><span class="__shiki_dzsirb">    l</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">locktype</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    l</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">mode</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    l</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">granted</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 数据库信息</span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">datname</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_database_size(</span><span class="__shiki_dzsirb">a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">datname</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> db_size</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_activity a</span></span>
<span class="line"><span class="__shiki_1itgoe">LEFT JOIN</span><span class="__shiki_140thh"> pg_locks l </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> l</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span><span class="__shiki_1itgoe"> &lt;&gt;</span><span class="__shiki_140thh"> pg_backend_pid()</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_dzsirb"> a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">query_start</span><span class="__shiki_1itgoe"> DESC</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用监控视图</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> transaction_monitor </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> state</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;active&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> query_age </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 20</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_7-1-2-诊断扩展" tabindex="-1">7.1.2 诊断扩展 <a class="header-anchor" href="#_7-1-2-诊断扩展" aria-label="Permalink to &quot;7.1.2 诊断扩展&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 常用诊断扩展</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. pg_stat_statements：查询统计</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> EXTENSION </span><span class="__shiki_1itgoe">IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> pg_stat_statements;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    query,</span></span>
<span class="line"><span class="__shiki_140thh">    calls,</span></span>
<span class="line"><span class="__shiki_140thh">    total_time,</span></span>
<span class="line"><span class="__shiki_140thh">    mean_time,</span></span>
<span class="line"><span class="__shiki_1itgoe">    rows</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    shared_blks_hit,</span></span>
<span class="line"><span class="__shiki_140thh">    shared_blks_read,</span></span>
<span class="line"><span class="__shiki_140thh">    shared_blks_dirtied,</span></span>
<span class="line"><span class="__shiki_140thh">    temp_blks_read,</span></span>
<span class="line"><span class="__shiki_140thh">    temp_blks_written,</span></span>
<span class="line"><span class="__shiki_140thh">    blk_read_time,</span></span>
<span class="line"><span class="__shiki_140thh">    blk_write_time</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_statements</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> total_time </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. pg_qualstats：查询条件统计</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> EXTENSION </span><span class="__shiki_1itgoe">IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> pg_qualstats;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    qualnodeid,</span></span>
<span class="line"><span class="__shiki_140thh">    left::regtype,</span></span>
<span class="line"><span class="__shiki_140thh">    right::regtype,</span></span>
<span class="line"><span class="__shiki_140thh">    opno::regoperator,</span></span>
<span class="line"><span class="__shiki_140thh">    execution_count,</span></span>
<span class="line"><span class="__shiki_140thh">    nbfiltered,</span></span>
<span class="line"><span class="__shiki_140thh">    constant_position</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_qualstats;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. pg_wait_sampling：等待事件采样</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> EXTENSION </span><span class="__shiki_1itgoe">IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> pg_wait_sampling;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    event_type,</span></span>
<span class="line"><span class="__shiki_1itgoe">    event</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    sum</span><span class="__shiki_140thh">(count) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total_count</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_wait_sampling_profile</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> sample_time </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;5 minutes&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> event_type, </span><span class="__shiki_1itgoe">event</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> total_count </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. pg_visibility：页面可见性映射</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> EXTENSION </span><span class="__shiki_1itgoe">IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> pg_visibility;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_visibility_map(</span><span class="__shiki_mdbnqw">&#39;your_table&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_visibility_map_summary(</span><span class="__shiki_mdbnqw">&#39;your_table&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 自定义诊断函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> diagnose_transaction_issues</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    issue_type </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    description</span><span class="__shiki_1itgoe"> text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    severity </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    recommendation </span><span class="__shiki_1itgoe">text</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查长事务</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;Long Transaction&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;Transaction holding snapshot for too long&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;HIGH&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;Consider committing or rolling back transaction with PID: &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> pid</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_stat_activity</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> backend_xmin </span><span class="__shiki_1itgoe">IS NOT NULL</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_140thh"> age(backend_xmin) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100000000</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_1itgoe"> state</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;idle in transaction&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    LIMIT</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查锁等待</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;Lock Wait&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;Process waiting for lock held by another process&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;MEDIUM&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;Check blocking PIDs: &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> array_to_string(pg_blocking_pids(pid), </span><span class="__shiki_mdbnqw">&#39;, &#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_stat_activity</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> wait_event_type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;Lock&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_1itgoe"> state</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;active&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    LIMIT</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查接近事务ID回卷</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;XID Wrap-around Risk&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;Table approaching transaction ID wrap-around&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;CRITICAL&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;Run VACUUM FREEZE on table: &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> schemaname </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;.&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> relname</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_class c</span></span>
<span class="line"><span class="__shiki_1itgoe">    JOIN</span><span class="__shiki_140thh"> pg_namespace n </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relnamespace</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> n</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relkind</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;r&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_140thh"> age(relfrozenxid) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1500000000</span></span>
<span class="line"><span class="__shiki_1itgoe">    LIMIT</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> diagnose_transaction_issues();</span></span></code></pre></div><h2 id="八、最佳实践总结" tabindex="-1">八、最佳实践总结 <a class="header-anchor" href="#八、最佳实践总结" aria-label="Permalink to &quot;八、最佳实践总结&quot;">​</a></h2><h3 id="_8-1-配置建议矩阵" tabindex="-1">8.1 配置建议矩阵 <a class="header-anchor" href="#_8-1-配置建议矩阵" aria-label="Permalink to &quot;8.1 配置建议矩阵&quot;">​</a></h3><table tabindex="0"><thead><tr><th>配置项</th><th>推荐值</th><th>说明</th></tr></thead><tbody><tr><td><code>max_connections</code></td><td>根据硬件调整</td><td>通常100-1000</td></tr><tr><td><code>shared_buffers</code></td><td>25%内存</td><td>用于数据缓存</td></tr><tr><td><code>work_mem</code></td><td>4-64MB</td><td>排序和哈希操作</td></tr><tr><td><code>maintenance_work_mem</code></td><td>1-2GB</td><td>VACUUM等维护操作</td></tr><tr><td><code>autovacuum_max_workers</code></td><td>3-5</td><td>自动VACUUM工作进程</td></tr><tr><td><code>autovacuum_vacuum_scale_factor</code></td><td>0.1</td><td>触发VACUUM的死元组比例</td></tr><tr><td><code>autovacuum_analyze_scale_factor</code></td><td>0.05</td><td>触发ANALYZE的死元组比例</td></tr><tr><td><code>vacuum_freeze_min_age</code></td><td>50000000</td><td>冻结最小年龄</td></tr><tr><td><code>vacuum_freeze_table_age</code></td><td>1500000000</td><td>冻结表年龄</td></tr><tr><td><code>old_snapshot_threshold</code></td><td>1h-24h</td><td>旧快照保留时间</td></tr><tr><td><code>idle_in_transaction_session_timeout</code></td><td>5min-1h</td><td>空闲事务超时</td></tr><tr><td><code>lock_timeout</code></td><td>5s-30s</td><td>锁获取超时</td></tr><tr><td><code>statement_timeout</code></td><td>30s-5min</td><td>语句执行超时</td></tr><tr><td><code>deadlock_timeout</code></td><td>1s-5s</td><td>死锁检测超时</td></tr></tbody></table><h3 id="_8-2-代码模板与模式" tabindex="-1">8.2 代码模板与模式 <a class="header-anchor" href="#_8-2-代码模板与模式" aria-label="Permalink to &quot;8.2 代码模板与模式&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 安全的事务模式</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> safe_transaction_operation(</span></span>
<span class="line"><span class="__shiki_140thh">    p_input_data jsonb</span></span>
<span class="line"><span class="__shiki_140thh">) </span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql</span></span>
<span class="line"><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    v_max_retries </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    v_retry_count </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    v_success </span><span class="__shiki_1itgoe">BOOLEAN</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> false;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHILE</span><span class="__shiki_140thh"> v_retry_count </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> v_max_retries </span><span class="__shiki_1itgoe">AND</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_140thh"> v_success </span><span class="__shiki_1itgoe">LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 开启事务</span></span>
<span class="line"><span class="__shiki_1itgoe">            BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 业务逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">            INSERT INTO</span><span class="__shiki_140thh"> audit_log (operation, </span><span class="__shiki_1itgoe">data</span><span class="__shiki_140thh">) </span></span>
<span class="line"><span class="__shiki_1itgoe">            VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;transaction_start&#39;</span><span class="__shiki_140thh">, p_input_data);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 更多操作...</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 提交事务</span></span>
<span class="line"><span class="__shiki_1itgoe">            COMMIT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            v_success :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">        EXCEPTION</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> deadlock_detected </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_1itgoe">                ROLLBACK</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                v_retry_count :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> v_retry_count </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;Deadlock detected, retry %&#39;</span><span class="__shiki_140thh">, v_retry_count;</span></span>
<span class="line"><span class="__shiki_140thh">                PERFORM pg_sleep(</span><span class="__shiki_dzsirb">power</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, v_retry_count) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">-- 指数退避</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> lock_not_available </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_1itgoe">                ROLLBACK</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                v_retry_count :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> v_retry_count </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;Lock timeout, retry %&#39;</span><span class="__shiki_140thh">, v_retry_count;</span></span>
<span class="line"><span class="__shiki_140thh">                PERFORM pg_sleep(</span><span class="__shiki_dzsirb">power</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, v_retry_count) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> OTHERS </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_1itgoe">                ROLLBACK</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                RAISE;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_140thh"> v_success </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_140thh">        RAISE EXCEPTION </span><span class="__shiki_mdbnqw">&#39;Operation failed after % retries&#39;</span><span class="__shiki_140thh">, v_max_retries;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 定期维护作业</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> routine_maintenance()</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql</span></span>
<span class="line"><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 1. 分析关键表</span></span>
<span class="line"><span class="__shiki_140thh">    ANALYZE </span><span class="__shiki_1itgoe">VERBOSE</span><span class="__shiki_140thh"> frequently_updated_table;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 2. 对接近回卷的表执行预防性VACUUM</span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM preventive_vacuum();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 3. 清理旧统计数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    DELETE</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> query_performance_baseline </span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> last_executed </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;30 days&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 4. 检查并终止长空闲事务</span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM pg_terminate_backend(pid)</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_stat_activity</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_1itgoe"> state</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;idle in transaction&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> state_change) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;10 minutes&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_140thh"> pid </span><span class="__shiki_1itgoe">&lt;&gt;</span><span class="__shiki_140thh"> pg_backend_pid();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;Routine maintenance completed&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建定期执行作业</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_dzsirb"> cron</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">schedule</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;daily-maintenance&#39;</span><span class="__shiki_140thh">,      </span><span class="__shiki_21nrsd">-- 作业名</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;0 2 * * *&#39;</span><span class="__shiki_140thh">,             </span><span class="__shiki_21nrsd">-- 每天2点执行</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;CALL routine_maintenance()&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_8-3-性能优化检查清单" tabindex="-1">8.3 性能优化检查清单 <a class="header-anchor" href="#_8-3-性能优化检查清单" aria-label="Permalink to &quot;8.3 性能优化检查清单&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建优化检查视图</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> VIEW</span><span class="__shiki_1t8gfj"> optimization_checklist</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> checks </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 1. 长事务检查</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;长事务&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> category,</span></span>
<span class="line"><span class="__shiki_dzsirb">        count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> count,</span></span>
<span class="line"><span class="__shiki_dzsirb">        string_agg</span><span class="__shiki_140thh">(pid::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;, &#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> details</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_stat_activity</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_1itgoe"> state</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;idle in transaction&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> state_change) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;5 minutes&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    UNION ALL</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 2. 表膨胀检查</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;表膨胀&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> category,</span></span>
<span class="line"><span class="__shiki_dzsirb">        count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> count,</span></span>
<span class="line"><span class="__shiki_dzsirb">        string_agg</span><span class="__shiki_140thh">(relname, </span><span class="__shiki_mdbnqw">&#39;, &#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> details</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_stat_user_tables</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> n_dead_tup </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_140thh"> n_live_tup </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_140thh"> n_dead_tup::</span><span class="__shiki_1itgoe">float</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> n_live_tup </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    UNION ALL</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 3. 索引膨胀检查</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;索引膨胀&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> category,</span></span>
<span class="line"><span class="__shiki_dzsirb">        count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> count,</span></span>
<span class="line"><span class="__shiki_dzsirb">        string_agg</span><span class="__shiki_140thh">(indexname, </span><span class="__shiki_mdbnqw">&#39;, &#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> details</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_stat_user_indexes</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> idx_scan </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_140thh"> pg_relation_size(indexrelid) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    UNION ALL</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 4. 接近事务ID回卷</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;事务ID回卷风险&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> category,</span></span>
<span class="line"><span class="__shiki_dzsirb">        count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> count,</span></span>
<span class="line"><span class="__shiki_dzsirb">        string_agg</span><span class="__shiki_140thh">(relname, </span><span class="__shiki_mdbnqw">&#39;, &#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> details</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_class c</span></span>
<span class="line"><span class="__shiki_1itgoe">    JOIN</span><span class="__shiki_140thh"> pg_namespace n </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relnamespace</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> n</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relkind</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;r&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_140thh"> age(relfrozenxid) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000000000</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    UNION ALL</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 5. 自动VACUUM失败</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;自动VACUUM问题&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> category,</span></span>
<span class="line"><span class="__shiki_dzsirb">        count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> count,</span></span>
<span class="line"><span class="__shiki_dzsirb">        string_agg</span><span class="__shiki_140thh">(relname, </span><span class="__shiki_mdbnqw">&#39;, &#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> details</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_stat_user_tables</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> last_autovacuum </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_1itgoe"> NULL</span></span>
<span class="line"><span class="__shiki_1itgoe">    OR</span><span class="__shiki_140thh"> last_autovacuum </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;7 days&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_140thh"> n_dead_tup </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 10000</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    category,</span></span>
<span class="line"><span class="__shiki_140thh">    count,</span></span>
<span class="line"><span class="__shiki_140thh">    details,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> count </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;需要处理&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_mdbnqw"> &#39;正常&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_1itgoe"> status</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> checks</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> category;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> optimization_checklist;</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>PostgreSQL的事务隔离与MVCC实现是其核心优势之一，提供了：</p><ol><li><strong>强大的并发控制</strong>：通过MVCC避免读写冲突，通过锁机制处理写写冲突</li><li><strong>灵活的事务隔离</strong>：支持SQL标准的所有隔离级别，包括真正的可序列化隔离</li><li><strong>高效的版本管理</strong>：通过HOT优化、VACUUM机制等减少存储开销</li><li><strong>完善的监控诊断</strong>：丰富的系统视图和扩展支持</li></ol><p>关键要点：</p><ul><li><strong>理解MVCC原理</strong>：版本链、可见性判断、快照机制</li><li><strong>合理配置参数</strong>：根据工作负载调整VACUUM、内存、超时等参数</li><li><strong>预防常见问题</strong>：事务ID回卷、表膨胀、长事务</li><li><strong>使用合适工具</strong>：系统视图、扩展、监控脚本</li><li><strong>遵循最佳实践</strong>：短事务、合理索引、定期维护</li></ul><p>通过深入理解PostgreSQL的事务和MVCC机制，可以构建高性能、高并发的数据库应用，同时避免常见的并发问题和性能瓶颈。</p>`,87)])])}const g=a(p,[["render",l]]);export{d as __pageData,g as default};
