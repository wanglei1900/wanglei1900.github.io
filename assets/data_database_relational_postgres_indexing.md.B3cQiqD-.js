import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"PostgreSQL高级索引与查询优化深度解析","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/relational/postgres/indexing.md","filePath":"data/database/relational/postgres/indexing.md"}'),p={name:"data/database/relational/postgres/indexing.md"};function l(h,s,c,e,t,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="postgresql高级索引与查询优化深度解析" tabindex="-1">PostgreSQL高级索引与查询优化深度解析 <a class="header-anchor" href="#postgresql高级索引与查询优化深度解析" aria-label="Permalink to &quot;PostgreSQL高级索引与查询优化深度解析&quot;">​</a></h1><h2 id="一、postgresql索引架构深入" tabindex="-1">一、PostgreSQL索引架构深入 <a class="header-anchor" href="#一、postgresql索引架构深入" aria-label="Permalink to &quot;一、PostgreSQL索引架构深入&quot;">​</a></h2><h3 id="_1-1-索引基础架构回顾" tabindex="-1">1.1 索引基础架构回顾 <a class="header-anchor" href="#_1-1-索引基础架构回顾" aria-label="Permalink to &quot;1.1 索引基础架构回顾&quot;">​</a></h3><h4 id="_1-1-1-索引与表的物理关系" tabindex="-1">1.1.1 索引与表的物理关系 <a class="header-anchor" href="#_1-1-1-索引与表的物理关系" aria-label="Permalink to &quot;1.1.1 索引与表的物理关系&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看索引与表的关联</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    idx</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">indexrelid</span><span class="__shiki_140thh">::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> index_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">    idx</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">indrelid</span><span class="__shiki_140thh">::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> table_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">    idx</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">indnatts</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> column_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">    cls</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relfilenode</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> physical_file,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_relation_size(</span><span class="__shiki_dzsirb">idx</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">indexrelid</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> index_size</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_index idx</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> pg_class cls </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> idx</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">indexrelid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> cls</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> idx</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">indrelid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;your_table&#39;</span><span class="__shiki_140thh">::regclass;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 索引页结构（B-Tree示例）</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">B-Tree索引页布局：</span></span>
<span class="line"><span class="__shiki_21nrsd">┌─────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_21nrsd">│ Page Header (24 bytes)                   │</span></span>
<span class="line"><span class="__shiki_21nrsd">├─────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_21nrsd">│ Special Space (16 bytes)                 │</span></span>
<span class="line"><span class="__shiki_21nrsd">├─────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_21nrsd">│ Line Pointers (每个4字节)                 │</span></span>
<span class="line"><span class="__shiki_21nrsd">├─────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_21nrsd">│ Free Space                               │</span></span>
<span class="line"><span class="__shiki_21nrsd">├─────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_21nrsd">│ Index Tuples (实际索引条目)                │</span></span>
<span class="line"><span class="__shiki_21nrsd">└─────────────────────────────────────────┘</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span></code></pre></div><h4 id="_1-1-2-索引访问方法接口" tabindex="-1">1.1.2 索引访问方法接口 <a class="header-anchor" href="#_1-1-2-索引访问方法接口" aria-label="Permalink to &quot;1.1.2 索引访问方法接口&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看所有索引访问方法</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    amname </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> access_method,</span></span>
<span class="line"><span class="__shiki_140thh">    amhandler </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> handler_function,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> amtype </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;i&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;Index&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;t&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;Table&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_mdbnqw"> &#39;Other&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_1itgoe"> type</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_am</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> amname;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看索引使用的访问方法</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relname</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> index_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">    am</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">amname</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> access_method,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_relation_size(</span><span class="__shiki_dzsirb">c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> size</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_class c</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> pg_am am </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relam</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> am</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relkind</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;i&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> pg_relation_size(</span><span class="__shiki_dzsirb">c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span></code></pre></div><h2 id="二、高级索引类型深度解析" tabindex="-1">二、高级索引类型深度解析 <a class="header-anchor" href="#二、高级索引类型深度解析" aria-label="Permalink to &quot;二、高级索引类型深度解析&quot;">​</a></h2><h3 id="_2-1-b-tree索引高级特性" tabindex="-1">2.1 B-Tree索引高级特性 <a class="header-anchor" href="#_2-1-b-tree索引高级特性" aria-label="Permalink to &quot;2.1 B-Tree索引高级特性&quot;">​</a></h3><h4 id="_2-1-1-多列复合索引优化" tabindex="-1">2.1.1 多列复合索引优化 <a class="header-anchor" href="#_2-1-1-多列复合索引优化" aria-label="Permalink to &quot;2.1.1 多列复合索引优化&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建多列复合索引（注意列顺序）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_users_name_email_active</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> users (last_name, first_name, email) </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> active </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 索引可用性分析</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">复合索引 (A, B, C) 可支持以下查询：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. WHERE A = ? AND B = ? AND C = ?  -- 完全匹配</span></span>
<span class="line"><span class="__shiki_21nrsd">2. WHERE A = ? AND B = ?           -- 前缀匹配</span></span>
<span class="line"><span class="__shiki_21nrsd">3. WHERE A = ?                     -- 前缀匹配</span></span>
<span class="line"><span class="__shiki_21nrsd">4. WHERE A = ? AND B &gt; ?           -- 范围查询（部分列）</span></span>
<span class="line"><span class="__shiki_21nrsd">5. WHERE A = ? ORDER BY B, C       -- 排序优化</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">不可用的情况：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. WHERE B = ?                     -- 跳过了前导列</span></span>
<span class="line"><span class="__shiki_21nrsd">2. WHERE A &gt; ? AND B = ?           -- 范围查询在前，等值在后</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 验证索引使用</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> users </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> last_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;Smith&#39;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">AND</span><span class="__shiki_140thh"> first_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;John&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> email;</span></span></code></pre></div><h4 id="_2-1-2-唯一索引与null处理" tabindex="-1">2.1.2 唯一索引与NULL处理 <a class="header-anchor" href="#_2-1-2-唯一索引与null处理" aria-label="Permalink to &quot;2.1.2 唯一索引与NULL处理&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建唯一索引（允许NULL值重复）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> UNIQUE INDEX</span><span class="__shiki_1t8gfj"> idx_unique_partial</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> orders (order_number) </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> order_number </span><span class="__shiki_1itgoe">IS NOT NULL</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建排除约束（更强大的唯一性）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> reservations</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    room_id </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    reservation_daterange daterange,</span></span>
<span class="line"><span class="__shiki_140thh">    EXCLUDE </span><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> gist (</span></span>
<span class="line"><span class="__shiki_140thh">        room_id </span><span class="__shiki_1itgoe">WITH</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        reservation_daterange </span><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> &amp;&amp;</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- NULL值的B-Tree索引行为</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_with_nulls</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> table1 (nullable_column);</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">PostgreSQL B-Tree索引：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. NULL值被存储在索引中（与Oracle不同）</span></span>
<span class="line"><span class="__shiki_21nrsd">2. WHERE nullable_column IS NULL 可以使用索引</span></span>
<span class="line"><span class="__shiki_21nrsd">3. 唯一索引中多个NULL值是被允许的</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span></code></pre></div><h4 id="_2-1-3-索引的include子句-覆盖索引" tabindex="-1">2.1.3 索引的INCLUDE子句（覆盖索引） <a class="header-anchor" href="#_2-1-3-索引的include子句-覆盖索引" aria-label="Permalink to &quot;2.1.3 索引的INCLUDE子句（覆盖索引）&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建包含非键列的索引（PostgreSQL 11+）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_covering</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> orders (</span></span>
<span class="line"><span class="__shiki_140thh">    customer_id, </span></span>
<span class="line"><span class="__shiki_140thh">    order_date</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">INCLUDE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    total_amount,</span></span>
<span class="line"><span class="__shiki_1itgoe">    status</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查询使用覆盖索引</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> customer_id, order_date, total_amount</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> orders</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> customer_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 12345</span></span>
<span class="line"><span class="__shiki_1itgoe">AND</span><span class="__shiki_140thh"> order_date </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 与传统复合索引对比</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">传统索引 (customer_id, order_date, total_amount, status):</span></span>
<span class="line"><span class="__shiki_21nrsd">- 所有列都是键列</span></span>
<span class="line"><span class="__shiki_21nrsd">- 可用于WHERE、ORDER BY、JOIN</span></span>
<span class="line"><span class="__shiki_21nrsd">- 索引较大</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">INCLUDE索引:</span></span>
<span class="line"><span class="__shiki_21nrsd">- customer_id, order_date是键列</span></span>
<span class="line"><span class="__shiki_21nrsd">- total_amount, status是包含列（仅存储在叶子节点）</span></span>
<span class="line"><span class="__shiki_21nrsd">- 索引较小</span></span>
<span class="line"><span class="__shiki_21nrsd">- 包含列只能用于SELECT，不能用于WHERE/ORDER BY</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span></code></pre></div><h3 id="_2-2-gist索引高级应用" tabindex="-1">2.2 GiST索引高级应用 <a class="header-anchor" href="#_2-2-gist索引高级应用" aria-label="Permalink to &quot;2.2 GiST索引高级应用&quot;">​</a></h3><h4 id="_2-2-1-多维数据索引" tabindex="-1">2.2.1 多维数据索引 <a class="header-anchor" href="#_2-2-1-多维数据索引" aria-label="Permalink to &quot;2.2.1 多维数据索引&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 几何数据索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_geo_gist</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> spatial_data </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> gist (geometry_column);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 地理空间查询优化</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> spatial_data</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> geometry_column &amp;&amp; ST_MakeEnvelope(</span></span>
<span class="line"><span class="__shiki_1itgoe">    -</span><span class="__shiki_dzsirb">74</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">40</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">73</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">41</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">4326</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- KNN查询（最近邻）</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">, geometry_column </span><span class="__shiki_1itgoe">&lt;-&gt;</span><span class="__shiki_140thh"> ST_Point(</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">73</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">985</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">40</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">748</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> distance</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> spatial_data</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> geometry_column </span><span class="__shiki_1itgoe">&lt;-&gt;</span><span class="__shiki_140thh"> ST_Point(</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">73</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">985</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">40</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">748</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 多维数组索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> array_data</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">serial</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    features </span><span class="__shiki_1itgoe">real</span><span class="__shiki_140thh">[]</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_array_gist</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> array_data </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> gist (features);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 数组相似度查询</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> array_data</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> features </span><span class="__shiki_1itgoe">&lt;-&gt;</span><span class="__shiki_1itgoe"> ARRAY</span><span class="__shiki_140thh">[0.1, 0.2, 0.3]</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_2-2-2-自定义gist操作符类" tabindex="-1">2.2.2 自定义GiST操作符类 <a class="header-anchor" href="#_2-2-2-自定义gist操作符类" aria-label="Permalink to &quot;2.2.2 自定义GiST操作符类&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看现有的GiST操作符类</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    opcname </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> operator_class,</span></span>
<span class="line"><span class="__shiki_140thh">    opcintype::regtype </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> indexed_type,</span></span>
<span class="line"><span class="__shiki_dzsirb">    am</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">amname</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> access_method</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_opclass opc</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> pg_am am </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> opc</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">opcmethod</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> am</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> am</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">amname</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;gist&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> opcname;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建自定义操作符类的示例</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">1. 实现支持函数（consistent、union、compress、decompress等）</span></span>
<span class="line"><span class="__shiki_21nrsd">2. 创建操作符类</span></span>
<span class="line"><span class="__shiki_21nrsd">3. 创建操作符</span></span>
<span class="line"><span class="__shiki_21nrsd">4. 创建支持函数</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 启用扩展提供的操作符类</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> EXTENSION btree_gist;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建排除约束（使用GiST）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> scheduling</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">serial</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    resource_id </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    time_slot tsrange,</span></span>
<span class="line"><span class="__shiki_140thh">    EXCLUDE </span><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> gist (resource_id </span><span class="__shiki_1itgoe">WITH</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh">, time_slot </span><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> &amp;&amp;)</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_2-3-gin索引深度优化" tabindex="-1">2.3 GIN索引深度优化 <a class="header-anchor" href="#_2-3-gin索引深度优化" aria-label="Permalink to &quot;2.3 GIN索引深度优化&quot;">​</a></h3><h4 id="_2-3-1-全文搜索优化" tabindex="-1">2.3.1 全文搜索优化 <a class="header-anchor" href="#_2-3-1-全文搜索优化" aria-label="Permalink to &quot;2.3.1 全文搜索优化&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建GIN索引用于全文搜索</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_gin_tsvector</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> documents </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> gin (to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, content));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 带权重的全文搜索</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_gin_weighted</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> documents </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> gin (</span></span>
<span class="line"><span class="__shiki_140thh">    setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, title), </span><span class="__shiki_mdbnqw">&#39;A&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span></span>
<span class="line"><span class="__shiki_140thh">    setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, content), </span><span class="__shiki_mdbnqw">&#39;B&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 高级全文搜索查询</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    title,</span></span>
<span class="line"><span class="__shiki_140thh">    ts_headline(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, content, q) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> snippet,</span></span>
<span class="line"><span class="__shiki_140thh">    ts_rank_cd(tsv, q) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> rank</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> documents, to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgresql &amp; (optimization | performance)&#39;</span><span class="__shiki_140thh">) q</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> tsv @@ q</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> rank </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 短语搜索（PostgreSQL 9.6+）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> documents</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> tsv @@ phraseto_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;query optimization&#39;</span><span class="__shiki_140thh">);</span></span></code></pre></div><h4 id="_2-3-2-jsonb索引优化" tabindex="-1">2.3.2 JSONB索引优化 <a class="header-anchor" href="#_2-3-2-jsonb索引优化" aria-label="Permalink to &quot;2.3.2 JSONB索引优化&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 多种JSONB索引策略</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> json_data</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">serial</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    data</span><span class="__shiki_140thh"> jsonb</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 通用GIN索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_gin_jsonb</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> json_data </span><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> gin (</span><span class="__shiki_1itgoe">data</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. GIN路径索引（特定路径）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_gin_jsonb_path</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> json_data </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> gin (</span><span class="__shiki_1itgoe">data</span><span class="__shiki_140thh"> jsonb_path_ops);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 表达式索引（特定键）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_jsonb_key</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> json_data </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> gin ((</span><span class="__shiki_1itgoe">data-&gt;</span><span class="__shiki_mdbnqw">&#39;tags&#39;</span><span class="__shiki_140thh">));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. B-Tree索引（标量值）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_jsonb_btree</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> json_data </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> btree ((</span><span class="__shiki_1itgoe">data-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;created_at&#39;</span><span class="__shiki_140thh">));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查询优化示例</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用通用索引</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> json_data </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> data</span><span class="__shiki_140thh"> @</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw"> &#39;{&quot;status&quot;: &quot;active&quot;, &quot;category&quot;: &quot;premium&quot;}&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用路径索引（更高效）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> json_data </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> data</span><span class="__shiki_140thh"> @@ </span><span class="__shiki_mdbnqw">&#39;$.status == &quot;active&quot; &amp;&amp; $.category == &quot;premium&quot;&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 多键查询</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> json_data </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> data</span><span class="__shiki_140thh"> ?&amp; </span><span class="__shiki_1itgoe">ARRAY</span><span class="__shiki_140thh">[&#39;name&#39;, &#39;email&#39;];</span></span></code></pre></div><h4 id="_2-3-3-gin快速更新优化" tabindex="-1">2.3.3 GIN快速更新优化 <a class="header-anchor" href="#_2-3-3-gin快速更新优化" aria-label="Permalink to &quot;2.3.3 GIN快速更新优化&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- GIN索引的FASTUPDATE机制</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_gin_fast</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> large_table </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> gin (array_column) </span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (fastupdate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 监控待处理条目</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> gin_pending_list_items(</span><span class="__shiki_mdbnqw">&#39;idx_gin_fast&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 手动清理待处理列表</span></span>
<span class="line"><span class="__shiki_140thh">VACUUM large_table;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 配置GIN索引参数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_gin_optimized</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> table1 </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> gin (column1)</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    fastupdate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> off</span><span class="__shiki_140thh">,           </span><span class="__shiki_21nrsd">-- 关闭快速更新（批量加载时）</span></span>
<span class="line"><span class="__shiki_140thh">    gin_pending_list_limit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4096</span><span class="__shiki_21nrsd">  -- 待处理列表大小限制</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_2-4-sp-gist索引-空间分区gist" tabindex="-1">2.4 SP-GiST索引（空间分区GiST） <a class="header-anchor" href="#_2-4-sp-gist索引-空间分区gist" aria-label="Permalink to &quot;2.4 SP-GiST索引（空间分区GiST）&quot;">​</a></h3><h4 id="_2-4-1-空间分区索引应用" tabindex="-1">2.4.1 空间分区索引应用 <a class="header-anchor" href="#_2-4-1-空间分区索引应用" aria-label="Permalink to &quot;2.4.1 空间分区索引应用&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建SP-GiST索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_spgist</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> points </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> spgist (point_column);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 适用于：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 非平衡数据结构（如四叉树、k-d树）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 高度重复的数据</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 某些文本模式匹配（如LIKE &#39;prefix%&#39;）</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 文本模式匹配优化</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_text_pattern</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> people </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> spgist (</span><span class="__shiki_1itgoe">name</span><span class="__shiki_140thh"> text_pattern_ops);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> people </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;Joh%&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 范围类型索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> reservations</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    room_id </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    period</span><span class="__shiki_140thh"> daterange</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_spgist_daterange</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> reservations </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> spgist (</span><span class="__shiki_1itgoe">period</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 范围查询</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> reservations</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> period</span><span class="__shiki_140thh"> &amp;&amp; </span><span class="__shiki_mdbnqw">&#39;[2024-01-01, 2024-01-10]&#39;</span><span class="__shiki_140thh">::daterange;</span></span></code></pre></div><h3 id="_2-5-brin索引高级配置" tabindex="-1">2.5 BRIN索引高级配置 <a class="header-anchor" href="#_2-5-brin索引高级配置" aria-label="Permalink to &quot;2.5 BRIN索引高级配置&quot;">​</a></h3><h4 id="_2-5-1-brin索引参数调优" tabindex="-1">2.5.1 BRIN索引参数调优 <a class="header-anchor" href="#_2-5-1-brin索引参数调优" aria-label="Permalink to &quot;2.5.1 BRIN索引参数调优&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建BRIN索引并配置参数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_brin_optimized</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> sensor_data </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> brin (</span><span class="__shiki_1itgoe">timestamp</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    pages_per_range </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 32</span><span class="__shiki_140thh">,      </span><span class="__shiki_21nrsd">-- 每范围包含的页数（默认128）</span></span>
<span class="line"><span class="__shiki_140thh">    autosummarize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_21nrsd">         -- 自动创建范围摘要</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 手动更新范围摘要</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> brin_summarize_range(</span><span class="__shiki_mdbnqw">&#39;idx_brin_optimized&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看BRIN索引统计信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    pages_per_range,</span></span>
<span class="line"><span class="__shiki_140thh">    last_value,</span></span>
<span class="line"><span class="__shiki_140thh">    is_null</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> brin_page_items(get_raw_page(</span><span class="__shiki_mdbnqw">&#39;idx_brin_optimized&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">), </span><span class="__shiki_mdbnqw">&#39;idx_brin_optimized&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 监控BRIN索引效果</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> sensor_data</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> timestamp</span><span class="__shiki_1itgoe"> &gt;=</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">AND</span><span class="__shiki_1itgoe"> timestamp</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw"> &#39;2024-01-02&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 多列BRIN索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_brin_multi</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> large_table </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> brin (</span><span class="__shiki_1itgoe">timestamp</span><span class="__shiki_140thh">, temperature, pressure);</span></span></code></pre></div><h2 id="三、查询优化器深度解析" tabindex="-1">三、查询优化器深度解析 <a class="header-anchor" href="#三、查询优化器深度解析" aria-label="Permalink to &quot;三、查询优化器深度解析&quot;">​</a></h2><h3 id="_3-1-统计信息与成本估算" tabindex="-1">3.1 统计信息与成本估算 <a class="header-anchor" href="#_3-1-统计信息与成本估算" aria-label="Permalink to &quot;3.1 统计信息与成本估算&quot;">​</a></h3><h4 id="_3-1-1-扩展统计信息" tabindex="-1">3.1.1 扩展统计信息 <a class="header-anchor" href="#_3-1-1-扩展统计信息" aria-label="Permalink to &quot;3.1.1 扩展统计信息&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建多变量统计信息</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> STATISTICS</span><span class="__shiki_140thh"> stats_correlation (dependencies)</span></span>
<span class="line"><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> customer_id, order_date</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> orders;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> STATISTICS</span><span class="__shiki_140thh"> stats_mcv (ndistinct, mcv)</span></span>
<span class="line"><span class="__shiki_1itgoe">ON</span><span class="__shiki_1itgoe"> status</span><span class="__shiki_140thh">, priority</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> tickets;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建表达式统计信息</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> STATISTICS</span><span class="__shiki_140thh"> stats_expr</span></span>
<span class="line"><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> (extract(</span><span class="__shiki_1itgoe">hour</span><span class="__shiki_1itgoe"> from</span><span class="__shiki_140thh"> created_at)), (extract(dow </span><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> created_at))</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> log_entries;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看统计信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    stxname,</span></span>
<span class="line"><span class="__shiki_140thh">    stxkeys,</span></span>
<span class="line"><span class="__shiki_140thh">    stxdependencies,</span></span>
<span class="line"><span class="__shiki_140thh">    stxndistinct</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_statistic_ext</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> stxrelid </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;orders&#39;</span><span class="__shiki_140thh">::regclass;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 手动更新统计信息</span></span>
<span class="line"><span class="__shiki_140thh">ANALYZE orders;</span></span>
<span class="line"><span class="__shiki_140thh">ANALYZE </span><span class="__shiki_1itgoe">VERBOSE</span><span class="__shiki_140thh"> orders;  </span><span class="__shiki_21nrsd">-- 查看详细统计信息收集过程</span></span></code></pre></div><h4 id="_3-1-2-成本估算模型" tabindex="-1">3.1.2 成本估算模型 <a class="header-anchor" href="#_3-1-2-成本估算模型" aria-label="Permalink to &quot;3.1.2 成本估算模型&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看当前成本参数</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_140thh">, setting, unit, short_desc</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_settings</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%cost%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 重要成本参数：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- seq_page_cost (默认1.0)    顺序扫描页成本</span></span>
<span class="line"><span class="__shiki_21nrsd">-- random_page_cost (默认4.0) 随机访问页成本（SSD可设为1.1）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- cpu_tuple_cost (默认0.01)  处理每行的CPU成本</span></span>
<span class="line"><span class="__shiki_21nrsd">-- cpu_index_tuple_cost (默认0.005) 索引扫描每行的CPU成本</span></span>
<span class="line"><span class="__shiki_21nrsd">-- cpu_operator_cost (默认0.0025) 每个操作符的CPU成本</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 针对SSD优化</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> random_page_cost </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> effective_io_concurrency </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 200</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看优化器成本估算</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS, </span><span class="__shiki_1itgoe">VERBOSE</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> orders </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> total_amount </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_3-2-查询重写与等价转换" tabindex="-1">3.2 查询重写与等价转换 <a class="header-anchor" href="#_3-2-查询重写与等价转换" aria-label="Permalink to &quot;3.2 查询重写与等价转换&quot;">​</a></h3><h4 id="_3-2-1-子查询优化" tabindex="-1">3.2.1 子查询优化 <a class="header-anchor" href="#_3-2-1-子查询优化" aria-label="Permalink to &quot;3.2.1 子查询优化&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 子查询转连接</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 原始查询</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> orders o</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> customers c</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">customer_id</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">active</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> true</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 优化后（手动重写）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> o.</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> orders o</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> customers c </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">customer_id</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">active</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> true;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- IN子查询优化</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> products</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> category_id </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> categories </span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> active </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- PostgreSQL自动优化：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. IN子查询转半连接（Semi-Join）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. EXISTS子查询转连接</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 子查询去嵌套（Subquery Flattening）</span></span></code></pre></div><h4 id="_3-2-2-公共表达式优化-cte优化" tabindex="-1">3.2.2 公共表达式优化（CTE优化） <a class="header-anchor" href="#_3-2-2-公共表达式优化-cte优化" aria-label="Permalink to &quot;3.2.2 公共表达式优化（CTE优化）&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- CTE的物化行为（PostgreSQL 12+）</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> cte_orders </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> orders </span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> order_date </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> cte_orders </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> total_amount </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 控制CTE物化</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> cte_orders </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> MATERIALIZED (  </span><span class="__shiki_21nrsd">-- 强制物化</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> orders </span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> order_date </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> cte_orders;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> cte_orders </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_140thh"> MATERIALIZED (  </span><span class="__shiki_21nrsd">-- 禁止物化（内联）</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> orders </span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> order_date </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> cte_orders;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 递归CTE优化</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_1itgoe"> RECURSIVE</span><span class="__shiki_140thh"> category_tree </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 锚点查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> id, </span><span class="__shiki_1itgoe">name</span><span class="__shiki_140thh">, parent_id, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_1itgoe"> level</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> categories</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> parent_id </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_1itgoe"> NULL</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    UNION ALL</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 递归查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">name</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">parent_id</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">ct</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">level</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> categories c</span></span>
<span class="line"><span class="__shiki_1itgoe">    JOIN</span><span class="__shiki_140thh"> category_tree ct </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">parent_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> ct</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> category_tree</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_1itgoe"> level</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">name</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_3-3-连接优化策略" tabindex="-1">3.3 连接优化策略 <a class="header-anchor" href="#_3-3-连接优化策略" aria-label="Permalink to &quot;3.3 连接优化策略&quot;">​</a></h3><h4 id="_3-3-1-连接类型选择" tabindex="-1">3.3.1 连接类型选择 <a class="header-anchor" href="#_3-3-1-连接类型选择" aria-label="Permalink to &quot;3.3.1 连接类型选择&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看连接算法</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> orders o</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> customers c </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">customer_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> products p </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 连接类型对比：</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">1. Nested Loop Join:</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 小表驱动大表</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 内表有高效索引</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 成本 = 外表行数 × 内表访问成本</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">2. Hash Join:</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 无合适索引</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 等值连接</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 内存充足（work_mem）</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 成本 = 建立哈希表成本 + 探测成本</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">3. Merge Join:</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 输入已排序</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 等值或范围连接</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 成本 = 排序成本 + 合并成本</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 强制连接类型（仅用于测试）</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> enable_nestloop </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> enable_hashjoin </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> enable_mergejoin </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> off</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看连接顺序优化</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (COSTS </span><span class="__shiki_1itgoe">OFF</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> t1, t2, t3</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> t1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">a</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> t2</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">a</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_dzsirb"> t2</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">b</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> t3</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">b</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用连接提示（通过pg_hint_plan扩展）</span></span>
<span class="line"><span class="__shiki_1itgoe">LOAD</span><span class="__shiki_mdbnqw"> &#39;pg_hint_plan&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">/*+</span></span>
<span class="line"><span class="__shiki_21nrsd">    Leading(((t1 t2) t3))</span></span>
<span class="line"><span class="__shiki_21nrsd">    HashJoin(t1 t2)</span></span>
<span class="line"><span class="__shiki_21nrsd">    MergeJoin(t2 t3)</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> t1, t2, t3</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> t1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">a</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> t2</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">a</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_dzsirb"> t2</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">b</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> t3</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">b</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_3-3-2-并行连接优化" tabindex="-1">3.3.2 并行连接优化 <a class="header-anchor" href="#_3-3-2-并行连接优化" aria-label="Permalink to &quot;3.3.2 并行连接优化&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看并行查询配置</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">    setting, </span></span>
<span class="line"><span class="__shiki_140thh">    unit,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%parallel%&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;并行相关&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_mdbnqw"> &#39;其他&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> category</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_settings</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;max_parallel_workers_per_gather&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;max_parallel_workers&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;parallel_setup_cost&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;parallel_tuple_cost&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;min_parallel_table_scan_size&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;min_parallel_index_scan_size&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> category, </span><span class="__shiki_1itgoe">name</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 并行查询示例</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, </span><span class="__shiki_1itgoe">VERBOSE</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">country</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    SUM</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">total_amount</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total_sales</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> orders o</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> customers c </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">customer_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_date</span><span class="__shiki_1itgoe"> &gt;=</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">country</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> total_sales </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 控制并行度</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_21nrsd"> /*+ Parallel(orders 4) */</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> orders </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> total_amount </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看并行查询统计</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    query,</span></span>
<span class="line"><span class="__shiki_140thh">    calls,</span></span>
<span class="line"><span class="__shiki_140thh">    total_time,</span></span>
<span class="line"><span class="__shiki_1itgoe">    rows</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    shared_blks_hit,</span></span>
<span class="line"><span class="__shiki_140thh">    shared_blks_read,</span></span>
<span class="line"><span class="__shiki_140thh">    temp_blks_written</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_statements</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%orders%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> total_time </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">;</span></span></code></pre></div><h2 id="四、执行计划深度分析" tabindex="-1">四、执行计划深度分析 <a class="header-anchor" href="#四、执行计划深度分析" aria-label="Permalink to &quot;四、执行计划深度分析&quot;">​</a></h2><h3 id="_4-1-执行计划解读技巧" tabindex="-1">4.1 执行计划解读技巧 <a class="header-anchor" href="#_4-1-执行计划解读技巧" aria-label="Permalink to &quot;4.1 执行计划解读技巧&quot;">​</a></h3><h4 id="_4-1-1-关键指标分析" tabindex="-1">4.1.1 关键指标分析 <a class="header-anchor" href="#_4-1-1-关键指标分析" aria-label="Permalink to &quot;4.1.1 关键指标分析&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 完整执行计划分析</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS, WAL, TIMING, SUMMARY, </span><span class="__shiki_1itgoe">VERBOSE</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> o.</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">name</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> orders o</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> customers c </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">customer_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> products p </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_date</span><span class="__shiki_1itgoe"> &gt;=</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">AND</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">total_amount</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_date</span><span class="__shiki_1itgoe"> DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 执行计划关键指标解读：</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">1. 成本估算：</span></span>
<span class="line"><span class="__shiki_21nrsd">   - Startup Cost: 返回第一行前的成本</span></span>
<span class="line"><span class="__shiki_21nrsd">   - Total Cost: 返回所有行的总成本</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">2. 实际性能：</span></span>
<span class="line"><span class="__shiki_21nrsd">   - Actual Time: 实际执行时间</span></span>
<span class="line"><span class="__shiki_21nrsd">   - Rows: 实际返回行数</span></span>
<span class="line"><span class="__shiki_21nrsd">   - Loops: 循环次数</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">3. I/O统计：</span></span>
<span class="line"><span class="__shiki_21nrsd">   - Buffers: 缓冲区使用情况</span></span>
<span class="line"><span class="__shiki_21nrsd">     - shared hit: 共享缓冲区命中</span></span>
<span class="line"><span class="__shiki_21nrsd">     - shared read: 从磁盘读取</span></span>
<span class="line"><span class="__shiki_21nrsd">     - shared dirtied: 修改的脏页</span></span>
<span class="line"><span class="__shiki_21nrsd">     - temp read/write: 临时文件I/O</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">4. 内存使用：</span></span>
<span class="line"><span class="__shiki_21nrsd">   - Memory Usage: 内存使用量</span></span>
<span class="line"><span class="__shiki_21nrsd">   - Memory Used: 峰值内存使用</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">5. 并行执行：</span></span>
<span class="line"><span class="__shiki_21nrsd">   - Workers Planned: 计划的工作进程数</span></span>
<span class="line"><span class="__shiki_21nrsd">   - Workers Launched: 实际启动的工作进程数</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span></code></pre></div><h4 id="_4-1-2-执行计划可视化工具" tabindex="-1">4.1.2 执行计划可视化工具 <a class="header-anchor" href="#_4-1-2-执行计划可视化工具" aria-label="Permalink to &quot;4.1.2 执行计划可视化工具&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 使用扩展进行计划分析</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> EXTENSION pg_stat_statements;</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> EXTENSION pg_store_plans;  </span><span class="__shiki_21nrsd">-- 存储执行计划</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> EXTENSION pg_qualstats;    </span><span class="__shiki_21nrsd">-- 查询条件统计</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 自动捕获执行计划</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> pg_store_plans();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看存储的计划</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    queryid,</span></span>
<span class="line"><span class="__shiki_140thh">    query,</span></span>
<span class="line"><span class="__shiki_140thh">    calls,</span></span>
<span class="line"><span class="__shiki_140thh">    total_time,</span></span>
<span class="line"><span class="__shiki_1itgoe">    rows</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    shared_blks_hit,</span></span>
<span class="line"><span class="__shiki_140thh">    shared_blks_read</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_statements</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> total_time </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 分析特定查询的计划</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> plan </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> plan</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_store_plans </span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%orders%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ORDER BY</span><span class="__shiki_140thh"> captured_at </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">    LIMIT</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> jsonb_pretty(plan) </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> plan;</span></span></code></pre></div><h3 id="_4-2-性能瓶颈识别" tabindex="-1">4.2 性能瓶颈识别 <a class="header-anchor" href="#_4-2-性能瓶颈识别" aria-label="Permalink to &quot;4.2 性能瓶颈识别&quot;">​</a></h3><h4 id="_4-2-1-常见瓶颈模式" tabindex="-1">4.2.1 常见瓶颈模式 <a class="header-anchor" href="#_4-2-1-常见瓶颈模式" aria-label="Permalink to &quot;4.2.1 常见瓶颈模式&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 顺序扫描瓶颈</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> large_table </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> non_indexed_column </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;value&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 解决方案：创建索引或使用覆盖索引</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 排序内存溢出</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> large_table</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> random_column</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 解决方案：增加work_mem或使用索引排序</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 哈希连接内存溢出</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> t1</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> t2 </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> t1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> t2</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 解决方案：增加work_mem或创建索引</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 嵌套循环过多</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> small_table s</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> large_table l </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> l</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">small_id</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 解决方案：确保内表有索引，或使用Hash/Merge Join</span></span></code></pre></div><h4 id="_4-2-2-实时性能分析" tabindex="-1">4.2.2 实时性能分析 <a class="header-anchor" href="#_4-2-2-实时性能分析" aria-label="Permalink to &quot;4.2.2 实时性能分析&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 使用pg_stat_activity监控运行查询</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    pid,</span></span>
<span class="line"><span class="__shiki_140thh">    usename,</span></span>
<span class="line"><span class="__shiki_140thh">    application_name,</span></span>
<span class="line"><span class="__shiki_140thh">    client_addr,</span></span>
<span class="line"><span class="__shiki_1itgoe">    state</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    query_start,</span></span>
<span class="line"><span class="__shiki_140thh">    query,</span></span>
<span class="line"><span class="__shiki_140thh">    wait_event_type,</span></span>
<span class="line"><span class="__shiki_140thh">    wait_event</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_activity</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> state</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;active&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> query_start;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看锁等待</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    blocked_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> blocked_pid,</span></span>
<span class="line"><span class="__shiki_dzsirb">    blocked_activity</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">usename</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> blocked_user,</span></span>
<span class="line"><span class="__shiki_dzsirb">    blocking_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> blocking_pid,</span></span>
<span class="line"><span class="__shiki_dzsirb">    blocking_activity</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">usename</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> blocking_user,</span></span>
<span class="line"><span class="__shiki_dzsirb">    blocked_activity</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">query</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> blocked_statement,</span></span>
<span class="line"><span class="__shiki_dzsirb">    blocking_activity</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">query</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> blocking_statement</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_dzsirb"> pg_catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pg_locks</span><span class="__shiki_140thh"> blocked_locks</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_dzsirb"> pg_catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pg_stat_activity</span><span class="__shiki_140thh"> blocked_activity </span></span>
<span class="line"><span class="__shiki_1itgoe">    ON</span><span class="__shiki_dzsirb"> blocked_activity</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> blocked_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_dzsirb"> pg_catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pg_locks</span><span class="__shiki_140thh"> blocking_locks </span></span>
<span class="line"><span class="__shiki_1itgoe">    ON</span><span class="__shiki_dzsirb"> blocking_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">locktype</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> blocked_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">locktype</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_dzsirb"> blocking_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">database</span><span class="__shiki_1itgoe"> IS</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> DISTINCT</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_dzsirb"> blocked_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">database</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_dzsirb"> blocking_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relation</span><span class="__shiki_1itgoe"> IS</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> DISTINCT</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_dzsirb"> blocked_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relation</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_dzsirb"> blocking_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">page</span><span class="__shiki_1itgoe"> IS</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> DISTINCT</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_dzsirb"> blocked_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">page</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_dzsirb"> blocking_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">tuple</span><span class="__shiki_1itgoe"> IS</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> DISTINCT</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_dzsirb"> blocked_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">tuple</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_dzsirb"> blocking_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">virtualxid</span><span class="__shiki_1itgoe"> IS</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> DISTINCT</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_dzsirb"> blocked_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">virtualxid</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_dzsirb"> blocking_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">transactionid</span><span class="__shiki_1itgoe"> IS</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> DISTINCT</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_dzsirb"> blocked_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">transactionid</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_dzsirb"> blocking_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">classid</span><span class="__shiki_1itgoe"> IS</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> DISTINCT</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_dzsirb"> blocked_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">classid</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_dzsirb"> blocking_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">objid</span><span class="__shiki_1itgoe"> IS</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> DISTINCT</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_dzsirb"> blocked_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">objid</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_dzsirb"> blocking_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">objsubid</span><span class="__shiki_1itgoe"> IS</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> DISTINCT</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_dzsirb"> blocked_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">objsubid</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_dzsirb"> blocking_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span><span class="__shiki_1itgoe"> !=</span><span class="__shiki_dzsirb"> blocked_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_dzsirb"> pg_catalog</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pg_stat_activity</span><span class="__shiki_140thh"> blocking_activity </span></span>
<span class="line"><span class="__shiki_1itgoe">    ON</span><span class="__shiki_dzsirb"> blocking_activity</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> blocking_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_dzsirb"> blocked_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">granted</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看I/O统计</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    relname,</span></span>
<span class="line"><span class="__shiki_140thh">    heap_blks_read,</span></span>
<span class="line"><span class="__shiki_140thh">    heap_blks_hit,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_blks_read,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_blks_hit,</span></span>
<span class="line"><span class="__shiki_140thh">    toast_blks_read,</span></span>
<span class="line"><span class="__shiki_140thh">    toast_blks_hit</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_statio_user_tables</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> heap_blks_read </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> idx_blks_read </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span></code></pre></div><h2 id="五、分区表索引优化" tabindex="-1">五、分区表索引优化 <a class="header-anchor" href="#五、分区表索引优化" aria-label="Permalink to &quot;五、分区表索引优化&quot;">​</a></h2><h3 id="_5-1-分区表索引策略" tabindex="-1">5.1 分区表索引策略 <a class="header-anchor" href="#_5-1-分区表索引策略" aria-label="Permalink to &quot;5.1 分区表索引策略&quot;">​</a></h3><h4 id="_5-1-1-分区索引类型" tabindex="-1">5.1.1 分区索引类型 <a class="header-anchor" href="#_5-1-1-分区索引类型" aria-label="Permalink to &quot;5.1.1 分区索引类型&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建分区表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> measurement</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    city_id </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1itgoe"> not null</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    logdate </span><span class="__shiki_1itgoe">date</span><span class="__shiki_1itgoe"> not null</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    peaktemp </span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    unitsales </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">PARTITION</span><span class="__shiki_1itgoe"> BY</span><span class="__shiki_1itgoe"> RANGE</span><span class="__shiki_140thh"> (logdate);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 全局索引（在所有分区上创建相同索引）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_global</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> measurement (city_id);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 本地索引（每个分区独立索引）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_local</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> measurement (logdate);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 唯一索引约束</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> UNIQUE INDEX</span><span class="__shiki_1t8gfj"> idx_unique</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> measurement (city_id, logdate);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看分区索引信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    inhrelid::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> partition</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_relation_size(inhrelid)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> partition_size,</span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> pg_size_pretty(</span><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(pg_relation_size(indexrelid)))</span></span>
<span class="line"><span class="__shiki_1itgoe">     FROM</span><span class="__shiki_140thh"> pg_index </span></span>
<span class="line"><span class="__shiki_1itgoe">     WHERE</span><span class="__shiki_140thh"> indrelid </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> inhrelid) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> index_size</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_inherits</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> inhparent </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;measurement&#39;</span><span class="__shiki_140thh">::regclass</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_1itgoe"> partition</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_5-1-2-分区剪枝优化" tabindex="-1">5.1.2 分区剪枝优化 <a class="header-anchor" href="#_5-1-2-分区剪枝优化" aria-label="Permalink to &quot;5.1.2 分区剪枝优化&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 启用分区剪枝</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> enable_partition_pruning </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看分区剪枝效果</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> measurement</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> logdate </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">AND</span><span class="__shiki_140thh"> logdate </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_mdbnqw"> &#39;2024-02-01&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 复杂查询的分区剪枝</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> measurement</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> logdate </span><span class="__shiki_1itgoe">BETWEEN</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_mdbnqw"> &#39;2024-03-01&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">AND</span><span class="__shiki_140thh"> city_id </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 子查询的分区剪枝</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> measurement m1</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> measurement m2</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_dzsirb"> m2</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">city_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> m1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">city_id</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_dzsirb"> m2</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">logdate</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> m1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">logdate</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;1 day&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 手动指定分区</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> measurement </span><span class="__shiki_1itgoe">PARTITION</span><span class="__shiki_140thh"> (measurement_202401)</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> city_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_5-2-分区维护优化" tabindex="-1">5.2 分区维护优化 <a class="header-anchor" href="#_5-2-分区维护优化" aria-label="Permalink to &quot;5.2 分区维护优化&quot;">​</a></h3><h4 id="_5-2-1-分区管理策略" tabindex="-1">5.2.1 分区管理策略 <a class="header-anchor" href="#_5-2-1-分区管理策略" aria-label="Permalink to &quot;5.2.1 分区管理策略&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 自动创建分区（使用扩展或触发器）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> create_partition_if_not_exists</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> trigger </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;CREATE TABLE IF NOT EXISTS %I PARTITION OF measurement &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;FOR VALUES FROM (%L) TO (%L)&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;measurement_&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> to_char(</span><span class="__shiki_dzsirb">NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">logdate</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;YYYYMM&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        date_trunc(</span><span class="__shiki_mdbnqw">&#39;month&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">logdate</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        date_trunc(</span><span class="__shiki_mdbnqw">&#39;month&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">logdate</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> INTERVAL </span><span class="__shiki_mdbnqw">&#39;1 month&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> NEW;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 分区索引维护</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 对单个分区创建并发索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> CONCURRENTLY</span><span class="__shiki_140thh"> idx_partition_202401 </span></span>
<span class="line"><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> measurement_202401 (city_id, logdate);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 批量重建分区索引</span></span>
<span class="line"><span class="__shiki_140thh">DO $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_1itgoe">    partition</span><span class="__shiki_140thh"> regclass;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_1itgoe"> partition</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> inhrelid::regclass</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_inherits</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> inhparent </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;measurement&#39;</span><span class="__shiki_140thh">::regclass</span></span>
<span class="line"><span class="__shiki_1itgoe">        AND</span><span class="__shiki_140thh"> pg_relation_size(inhrelid) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;REINDEX INDEX CONCURRENTLY %s&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">partition</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 分区统计信息更新</span></span>
<span class="line"><span class="__shiki_140thh">ANALYZE measurement_202401;</span></span>
<span class="line"><span class="__shiki_140thh">ANALYZE measurement_202402;</span></span></code></pre></div><h2 id="六、高级优化技巧" tabindex="-1">六、高级优化技巧 <a class="header-anchor" href="#六、高级优化技巧" aria-label="Permalink to &quot;六、高级优化技巧&quot;">​</a></h2><h3 id="_6-1-查询重写模式" tabindex="-1">6.1 查询重写模式 <a class="header-anchor" href="#_6-1-查询重写模式" aria-label="Permalink to &quot;6.1 查询重写模式&quot;">​</a></h3><h4 id="_6-1-1-模式匹配优化" tabindex="-1">6.1.1 模式匹配优化 <a class="header-anchor" href="#_6-1-1-模式匹配优化" aria-label="Permalink to &quot;6.1.1 模式匹配优化&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- LIKE优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建text_pattern_ops索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_name_pattern</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> users (</span><span class="__shiki_1itgoe">name</span><span class="__shiki_140thh"> text_pattern_ops);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 高效LIKE查询</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> users </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;John%&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 低效LIKE查询（无法使用B-Tree索引）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> users </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%Smith%&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 正则表达式优化（PostgreSQL 14+）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_email_regex</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> users </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> gin (email gin_trgm_ops);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> users </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> email ~ </span><span class="__shiki_mdbnqw">&#39;^john\\.[a-z]+@company\\.com$&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 全文搜索替代LIKE</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_content_search</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> documents </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> gin (to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, content));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> documents </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, content) @@ </span></span>
<span class="line"><span class="__shiki_140thh">      to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;performance &amp; tuning&#39;</span><span class="__shiki_140thh">);</span></span></code></pre></div><h4 id="_6-1-2-聚合优化" tabindex="-1">6.1.2 聚合优化 <a class="header-anchor" href="#_6-1-2-聚合优化" aria-label="Permalink to &quot;6.1.2 聚合优化&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 窗口函数优化</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    customer_id,</span></span>
<span class="line"><span class="__shiki_140thh">    order_date,</span></span>
<span class="line"><span class="__shiki_140thh">    total_amount,</span></span>
<span class="line"><span class="__shiki_dzsirb">    SUM</span><span class="__shiki_140thh">(total_amount) </span><span class="__shiki_1itgoe">OVER</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">        PARTITION</span><span class="__shiki_1itgoe"> BY</span><span class="__shiki_140thh"> customer_id </span></span>
<span class="line"><span class="__shiki_1itgoe">        ORDER BY</span><span class="__shiki_140thh"> order_date</span></span>
<span class="line"><span class="__shiki_1itgoe">        ROWS</span><span class="__shiki_1itgoe"> BETWEEN</span><span class="__shiki_1itgoe"> UNBOUNDED</span><span class="__shiki_1itgoe"> PRECEDING</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_140thh"> CURRENT </span><span class="__shiki_1itgoe">ROW</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> running_total</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> orders</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> customer_id, order_date;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 分组聚合优化</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    customer_id,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> order_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">    SUM</span><span class="__shiki_140thh">(total_amount) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> total_spent,</span></span>
<span class="line"><span class="__shiki_dzsirb">    AVG</span><span class="__shiki_140thh">(total_amount) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> avg_order_value</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> orders</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> customer_id</span></span>
<span class="line"><span class="__shiki_1itgoe">HAVING</span><span class="__shiki_dzsirb"> SUM</span><span class="__shiki_140thh">(total_amount) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用物化视图预聚合</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> MATERIALIZED VIEW order_summary </span><span class="__shiki_1itgoe">AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    customer_id,</span></span>
<span class="line"><span class="__shiki_140thh">    DATE_TRUNC(</span><span class="__shiki_mdbnqw">&#39;month&#39;</span><span class="__shiki_140thh">, order_date) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> month</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> order_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">    SUM</span><span class="__shiki_140thh">(total_amount) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> total_amount</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> orders</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> customer_id, DATE_TRUNC(</span><span class="__shiki_mdbnqw">&#39;month&#39;</span><span class="__shiki_140thh">, order_date);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> UNIQUE INDEX</span><span class="__shiki_1t8gfj"> idx_order_summary</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> order_summary (customer_id, </span><span class="__shiki_1itgoe">month</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 增量刷新物化视图</span></span>
<span class="line"><span class="__shiki_140thh">REFRESH MATERIALIZED VIEW CONCURRENTLY order_summary;</span></span></code></pre></div><h3 id="_6-2-jit编译优化-即时编译" tabindex="-1">6.2 JIT编译优化（即时编译） <a class="header-anchor" href="#_6-2-jit编译优化-即时编译" aria-label="Permalink to &quot;6.2 JIT编译优化（即时编译）&quot;">​</a></h3><h4 id="_6-2-1-jit配置与使用" tabindex="-1">6.2.1 JIT配置与使用 <a class="header-anchor" href="#_6-2-1-jit配置与使用" aria-label="Permalink to &quot;6.2.1 JIT配置与使用&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看JIT配置</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">    setting, </span></span>
<span class="line"><span class="__shiki_140thh">    unit,</span></span>
<span class="line"><span class="__shiki_140thh">    short_desc</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_settings</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;jit%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 关键JIT参数：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- jit = on                      -- 启用JIT</span></span>
<span class="line"><span class="__shiki_21nrsd">-- jit_above_cost = 100000       -- 成本阈值</span></span>
<span class="line"><span class="__shiki_21nrsd">-- jit_optimize_above_cost = 500000  -- 优化阈值</span></span>
<span class="line"><span class="__shiki_21nrsd">-- jit_inline_above_cost = 500000    -- 内联阈值</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 启用JIT编译</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> jit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> jit_above_cost </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 100000</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看JIT使用情况</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, </span><span class="__shiki_1itgoe">VERBOSE</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">customer_id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    SUM</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">total_amount</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> lifetime_value</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> customers c</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> orders o </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">customer_id</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_date</span><span class="__shiki_1itgoe"> &gt;=</span><span class="__shiki_mdbnqw"> &#39;2020-01-01&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">customer_id</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">name</span></span>
<span class="line"><span class="__shiki_1itgoe">HAVING</span><span class="__shiki_dzsirb"> SUM</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">total_amount</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 10000</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> lifetime_value </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- JIT性能监控</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    query,</span></span>
<span class="line"><span class="__shiki_140thh">    calls,</span></span>
<span class="line"><span class="__shiki_140thh">    total_time,</span></span>
<span class="line"><span class="__shiki_140thh">    mean_time,</span></span>
<span class="line"><span class="__shiki_1itgoe">    rows</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    jit_generation_time,</span></span>
<span class="line"><span class="__shiki_140thh">    jit_inlining_time,</span></span>
<span class="line"><span class="__shiki_140thh">    jit_optimization_time,</span></span>
<span class="line"><span class="__shiki_140thh">    jit_emission_time</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_statements</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> jit_generation_time </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> jit_generation_time </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">;</span></span></code></pre></div><h2 id="七、监控与维护" tabindex="-1">七、监控与维护 <a class="header-anchor" href="#七、监控与维护" aria-label="Permalink to &quot;七、监控与维护&quot;">​</a></h2><h3 id="_7-1-索引性能监控" tabindex="-1">7.1 索引性能监控 <a class="header-anchor" href="#_7-1-索引性能监控" aria-label="Permalink to &quot;7.1 索引性能监控&quot;">​</a></h3><h4 id="_7-1-1-索引使用统计" tabindex="-1">7.1.1 索引使用统计 <a class="header-anchor" href="#_7-1-1-索引使用统计" aria-label="Permalink to &quot;7.1.1 索引使用统计&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看索引使用情况</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">    tablename,</span></span>
<span class="line"><span class="__shiki_140thh">    indexname,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_scan,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_tup_read,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_tup_fetch,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_relation_size(indexrelid::regclass)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> index_size,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> idx_scan </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        THEN</span><span class="__shiki_dzsirb"> ROUND</span><span class="__shiki_140thh">(idx_tup_fetch::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> idx_tup_read, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> selectivity_percentage</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_user_indexes</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> idx_scan </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查找未使用的索引</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">    tablename,</span></span>
<span class="line"><span class="__shiki_140thh">    indexname,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_relation_size(indexrelid::regclass)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> index_size,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_scan,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_tup_read,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_tup_fetch</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_user_indexes</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> idx_scan </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">AND</span><span class="__shiki_140thh"> pg_relation_size(indexrelid::regclass) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_21nrsd">  -- 大于1MB</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> pg_relation_size(indexrelid::regclass) </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 索引膨胀检测</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">    tablename,</span></span>
<span class="line"><span class="__shiki_140thh">    indexname,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_relation_size(indexrelid::regclass)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> index_size,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_relation_size(indrelid::regclass)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> table_size,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_scan,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_tup_read</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_user_indexes</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> idx_scan </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> (pg_relation_size(indexrelid::regclass)::</span><span class="__shiki_1itgoe">float</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">          NULLIF</span><span class="__shiki_140thh">(pg_relation_size(indrelid::regclass), </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 20</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_7-1-2-索引维护自动化" tabindex="-1">7.1.2 索引维护自动化 <a class="header-anchor" href="#_7-1-2-索引维护自动化" aria-label="Permalink to &quot;7.1.2 索引维护自动化&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 自动重建膨胀索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> maintain_indexes</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    p_schema_name </span><span class="__shiki_1itgoe">text</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_mdbnqw"> &#39;public&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    p_index_size_threshold </span><span class="__shiki_1itgoe">bigint</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">-- 100MB</span></span>
<span class="line"><span class="__shiki_140thh">    p_scan_threshold </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    index_name </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    command </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    size_before </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    size_after </span><span class="__shiki_1itgoe">text</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    v_record record;</span></span>
<span class="line"><span class="__shiki_140thh">    v_size_before </span><span class="__shiki_1itgoe">bigint</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    v_size_after </span><span class="__shiki_1itgoe">bigint</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> v_record </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">            n</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">nspname</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> schema_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">            c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relname</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> index_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">            c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> index_oid</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_class c</span></span>
<span class="line"><span class="__shiki_1itgoe">        JOIN</span><span class="__shiki_140thh"> pg_namespace n </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relnamespace</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> n</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relkind</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;i&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        AND</span><span class="__shiki_dzsirb"> n</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">nspname</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> p_schema_name</span></span>
<span class="line"><span class="__shiki_1itgoe">        AND</span><span class="__shiki_140thh"> pg_relation_size(</span><span class="__shiki_dzsirb">c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> p_index_size_threshold</span></span>
<span class="line"><span class="__shiki_1itgoe">        AND</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_index i</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHERE</span><span class="__shiki_dzsirb"> i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">indexrelid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">            AND</span><span class="__shiki_dzsirb"> i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">indisvalid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> true</span></span>
<span class="line"><span class="__shiki_1itgoe">            AND</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> idx_scan </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_user_indexes </span></span>
<span class="line"><span class="__shiki_1itgoe">                 WHERE</span><span class="__shiki_140thh"> indexrelid </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> p_scan_threshold</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_1itgoe">        ORDER BY</span><span class="__shiki_140thh"> pg_relation_size(</span><span class="__shiki_dzsirb">c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 记录原始大小</span></span>
<span class="line"><span class="__shiki_140thh">        v_size_before :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pg_relation_size(</span><span class="__shiki_dzsirb">v_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">index_oid</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 重建索引</span></span>
<span class="line"><span class="__shiki_1itgoe">        EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;REINDEX INDEX CONCURRENTLY %I.%I&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">                      v_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">schema_name</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">v_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">index_name</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 记录新大小</span></span>
<span class="line"><span class="__shiki_140thh">        v_size_after :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pg_relation_size(</span><span class="__shiki_dzsirb">v_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">index_oid</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 返回结果</span></span>
<span class="line"><span class="__shiki_140thh">        index_name :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> v_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">index_name</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        command :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;REINDEX&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        size_before :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pg_size_pretty(v_size_before);</span></span>
<span class="line"><span class="__shiki_140thh">        size_after :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pg_size_pretty(v_size_after);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        RETURN</span><span class="__shiki_1itgoe"> NEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用维护函数</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> maintain_indexes(</span><span class="__shiki_mdbnqw">&#39;public&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">50</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_7-2-查询性能基线" tabindex="-1">7.2 查询性能基线 <a class="header-anchor" href="#_7-2-查询性能基线" aria-label="Permalink to &quot;7.2 查询性能基线&quot;">​</a></h3><h4 id="_7-2-1-性能基准测试" tabindex="-1">7.2.1 性能基准测试 <a class="header-anchor" href="#_7-2-1-性能基准测试" aria-label="Permalink to &quot;7.2.1 性能基准测试&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建性能测试表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> query_performance_baseline</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">serial</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    query_name </span><span class="__shiki_1itgoe">text</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    query_text </span><span class="__shiki_1itgoe">text</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    avg_execution_time </span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    min_execution_time </span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    max_execution_time </span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    calls </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    last_executed </span><span class="__shiki_1itgoe">timestamptz</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">timestamptz</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_1itgoe">    UNIQUE</span><span class="__shiki_140thh">(query_name)</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 自动性能监控函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> monitor_query_performance</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> trigger </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    v_query_stats record;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 从pg_stat_statements获取统计信息</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        mean_time,</span></span>
<span class="line"><span class="__shiki_140thh">        min_time,</span></span>
<span class="line"><span class="__shiki_140thh">        max_time,</span></span>
<span class="line"><span class="__shiki_140thh">        calls</span></span>
<span class="line"><span class="__shiki_1itgoe">    INTO</span><span class="__shiki_140thh"> v_query_stats</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_stat_statements</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> queryid </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">queryid</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 更新性能基线</span></span>
<span class="line"><span class="__shiki_1itgoe">    INSERT INTO</span><span class="__shiki_140thh"> query_performance_baseline (</span></span>
<span class="line"><span class="__shiki_140thh">        query_name,</span></span>
<span class="line"><span class="__shiki_140thh">        query_text,</span></span>
<span class="line"><span class="__shiki_140thh">        avg_execution_time,</span></span>
<span class="line"><span class="__shiki_140thh">        min_execution_time,</span></span>
<span class="line"><span class="__shiki_140thh">        max_execution_time,</span></span>
<span class="line"><span class="__shiki_140thh">        calls,</span></span>
<span class="line"><span class="__shiki_140thh">        last_executed</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">        NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">queryid</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">query</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        v_query_stats</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">mean_time</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        v_query_stats</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">min_time</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        v_query_stats</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">max_time</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        v_query_stats</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">calls</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">        now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_1itgoe">    ON</span><span class="__shiki_140thh"> CONFLICT (query_name) </span></span>
<span class="line"><span class="__shiki_140thh">    DO </span><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_1itgoe"> SET</span></span>
<span class="line"><span class="__shiki_140thh">        avg_execution_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> EXCLUDED</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">avg_execution_time</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        min_execution_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> EXCLUDED</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">min_execution_time</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        max_execution_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> EXCLUDED</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">max_execution_time</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        calls </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> EXCLUDED</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">calls</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        last_executed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> EXCLUDED</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">last_executed</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> NEW;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 检测性能回归</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    query_name,</span></span>
<span class="line"><span class="__shiki_140thh">    avg_execution_time,</span></span>
<span class="line"><span class="__shiki_dzsirb">    LAG</span><span class="__shiki_140thh">(avg_execution_time) </span><span class="__shiki_1itgoe">OVER</span><span class="__shiki_140thh"> w </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> previous_avg,</span></span>
<span class="line"><span class="__shiki_140thh">    (avg_execution_time </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> LAG</span><span class="__shiki_140thh">(avg_execution_time) </span><span class="__shiki_1itgoe">OVER</span><span class="__shiki_140thh"> w) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> change,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROUND</span><span class="__shiki_140thh">((avg_execution_time </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> LAG</span><span class="__shiki_140thh">(avg_execution_time) </span><span class="__shiki_1itgoe">OVER</span><span class="__shiki_140thh"> w) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">          NULLIF</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">LAG</span><span class="__shiki_140thh">(avg_execution_time) </span><span class="__shiki_1itgoe">OVER</span><span class="__shiki_140thh"> w, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> percent_change</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> query_performance_baseline</span></span>
<span class="line"><span class="__shiki_1itgoe">WINDOW</span><span class="__shiki_140thh"> w </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">PARTITION</span><span class="__shiki_1itgoe"> BY</span><span class="__shiki_140thh"> query_name </span><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> last_executed)</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_dzsirb"> ABS</span><span class="__shiki_140thh">(percent_change) </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span></code></pre></div><h2 id="八、最佳实践总结" tabindex="-1">八、最佳实践总结 <a class="header-anchor" href="#八、最佳实践总结" aria-label="Permalink to &quot;八、最佳实践总结&quot;">​</a></h2><h3 id="_8-1-索引选择矩阵" tabindex="-1">8.1 索引选择矩阵 <a class="header-anchor" href="#_8-1-索引选择矩阵" aria-label="Permalink to &quot;8.1 索引选择矩阵&quot;">​</a></h3><table tabindex="0"><thead><tr><th>数据类型/查询模式</th><th>推荐索引</th><th>配置参数</th><th>适用场景</th></tr></thead><tbody><tr><td>等值查询</td><td>B-Tree</td><td>默认</td><td>主键、外键、等值比较</td></tr><tr><td>范围查询</td><td>B-Tree</td><td>默认</td><td>日期范围、数值范围</td></tr><tr><td>文本搜索</td><td>GIN (tsvector)</td><td>gin_pending_list_limit</td><td>全文搜索、文档搜索</td></tr><tr><td>JSONB查询</td><td>GIN (jsonb_ops)</td><td>fastupdate</td><td>JSON文档查询</td></tr><tr><td>几何数据</td><td>GiST/SP-GiST</td><td>默认</td><td>空间查询、GIS应用</td></tr><tr><td>数组操作</td><td>GIN</td><td>默认</td><td>数组包含、重叠查询</td></tr><tr><td>前缀匹配</td><td>B-Tree (text_pattern_ops)</td><td>默认</td><td>LIKE &#39;prefix%&#39;</td></tr><tr><td>相似度搜索</td><td>GIN (trgm_ops)</td><td>默认</td><td>模糊匹配、拼写纠正</td></tr><tr><td>排序查询</td><td>B-Tree</td><td>fillfactor</td><td>ORDER BY查询</td></tr><tr><td>分组查询</td><td>B-Tree</td><td>默认</td><td>GROUP BY优化</td></tr><tr><td>大型时序数据</td><td>BRIN</td><td>pages_per_range</td><td>时间序列、监控数据</td></tr><tr><td>高重复值</td><td>Bloom</td><td>默认</td><td>多列任意组合查询</td></tr></tbody></table><h3 id="_8-2-查询优化检查清单" tabindex="-1">8.2 查询优化检查清单 <a class="header-anchor" href="#_8-2-查询优化检查清单" aria-label="Permalink to &quot;8.2 查询优化检查清单&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 优化检查清单查询</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> optimization_checklist </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 1. 检查未使用的索引</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;未使用的大索引&#39;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> category,</span></span>
<span class="line"><span class="__shiki_dzsirb">        format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;%I.%I&#39;</span><span class="__shiki_140thh">, schemaname, indexname) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> object</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        pg_size_pretty(pg_relation_size(indexrelid::regclass)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> size</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        idx_scan </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> scans</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_stat_user_indexes</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> idx_scan </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_140thh"> pg_relation_size(indexrelid::regclass) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    UNION ALL</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 2. 检查表膨胀</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;表膨胀严重&#39;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> category,</span></span>
<span class="line"><span class="__shiki_dzsirb">        format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;%I.%I&#39;</span><span class="__shiki_140thh">, schemaname, relname) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> object</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        pg_size_pretty(pg_relation_size(relid)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> size</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        n_dead_tup </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> dead_tuples</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_stat_user_tables</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> n_dead_tup </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_140thh"> n_live_tup </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_140thh"> n_dead_tup::</span><span class="__shiki_1itgoe">float</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> n_live_tup </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    UNION ALL</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 3. 检查缺失索引</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;缺失索引&#39;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> category,</span></span>
<span class="line"><span class="__shiki_dzsirb">        format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;表: %I, 列: %s&#39;</span><span class="__shiki_140thh">, relname, attname) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> object</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;N/A&#39;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_1itgoe"> size</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        seq_scan </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> scans</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            relname,</span></span>
<span class="line"><span class="__shiki_140thh">            attname,</span></span>
<span class="line"><span class="__shiki_140thh">            seq_scan</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_stat_user_tables st</span></span>
<span class="line"><span class="__shiki_1itgoe">        CROSS JOIN</span><span class="__shiki_140thh"> LATERAL unnest(</span></span>
<span class="line"><span class="__shiki_140thh">            string_to_array(</span></span>
<span class="line"><span class="__shiki_140thh">                (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> array_to_string(</span></span>
<span class="line"><span class="__shiki_140thh">                    array_agg(attname </span><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> attnum), </span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;,&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                )</span></span>
<span class="line"><span class="__shiki_1itgoe">                FROM</span><span class="__shiki_140thh"> pg_attribute </span></span>
<span class="line"><span class="__shiki_1itgoe">                WHERE</span><span class="__shiki_140thh"> attrelid </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> st</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relid</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">                AND</span><span class="__shiki_140thh"> attnum </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">                AND</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_140thh"> attisdropped),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;,&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        ) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> attname</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> seq_scan </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"><span class="__shiki_1itgoe">        AND</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_index i</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHERE</span><span class="__shiki_dzsirb"> i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">indrelid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> st</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relid</span></span>
<span class="line"><span class="__shiki_1itgoe">            AND</span><span class="__shiki_dzsirb"> i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">indisunique</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> false</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    ) t</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    UNION ALL</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 4. 检查work_mem不足</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;work_mem不足&#39;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> category,</span></span>
<span class="line"><span class="__shiki_140thh">        query </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> object</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;临时文件: &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> temp_blks_written </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> size</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        calls</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_stat_statements</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> temp_blks_written </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">    ORDER BY</span><span class="__shiki_140thh"> temp_blks_written </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">    LIMIT</span><span class="__shiki_dzsirb"> 5</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> optimization_checklist</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> category, </span><span class="__shiki_1itgoe">size</span><span class="__shiki_1itgoe"> DESC</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_8-3-性能优化工作流程" tabindex="-1">8.3 性能优化工作流程 <a class="header-anchor" href="#_8-3-性能优化工作流程" aria-label="Permalink to &quot;8.3 性能优化工作流程&quot;">​</a></h3><ol><li><p><strong>问题识别</strong></p><ul><li>使用pg_stat_statements识别慢查询</li><li>分析执行计划中的瓶颈</li><li>监控等待事件和锁争用</li></ul></li><li><p><strong>索引优化</strong></p><ul><li>分析查询模式选择合适索引类型</li><li>创建复合索引优化多列查询</li><li>使用部分索引减少索引大小</li><li>定期维护索引（REINDEX、VACUUM）</li></ul></li><li><p><strong>查询重写</strong></p><ul><li>优化子查询和连接</li><li>使用CTE和窗口函数</li><li>避免N+1查询问题</li><li>利用分区剪枝</li></ul></li><li><p><strong>配置调优</strong></p><ul><li>根据硬件调整内存参数</li><li>优化并行查询设置</li><li>调整成本估算参数</li><li>启用JIT编译</li></ul></li><li><p><strong>监控维护</strong></p><ul><li>建立性能基线</li><li>定期分析统计信息</li><li>自动化索引维护</li><li>容量规划与预警</li></ul></li></ol><h3 id="_8-4-新版本特性-postgresql-16" tabindex="-1">8.4 新版本特性（PostgreSQL 16+） <a class="header-anchor" href="#_8-4-新版本特性-postgresql-16" aria-label="Permalink to &quot;8.4 新版本特性（PostgreSQL 16+）&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- PostgreSQL 16新特性</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 并行聚合增强</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> max_parallel_workers_per_gather </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> customer_id, </span><span class="__shiki_dzsirb">SUM</span><span class="__shiki_140thh">(total_amount)</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> orders</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> customer_id;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 增量排序优化</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_orders_composite</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> orders (customer_id, order_date);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> orders</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> customer_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 123</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> order_date, total_amount;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 右/全外连接优化</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> table1</span></span>
<span class="line"><span class="__shiki_1itgoe">FULL OUTER JOIN</span><span class="__shiki_140thh"> table2 </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> table1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> table2</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 系统监控增强</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_stat_io;</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_stat_wal;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 逻辑复制并行应用</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_140thh"> SUBSCRIPTION mysubscription </span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> (streaming </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> parallel, parallel_workers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">);</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>PostgreSQL的高级索引与查询优化是一个持续的过程，需要深入理解：</p><ol><li><strong>索引的物理实现</strong>：不同索引类型的存储结构和适用场景</li><li><strong>查询优化器的工作原理</strong>：统计信息、成本估算、执行计划生成</li><li><strong>系统架构的影响</strong>：内存、磁盘I/O、并发控制</li><li><strong>监控与维护策略</strong>：性能基准、自动化维护、容量规划</li></ol><p>关键原则：</p><ul><li><strong>测量而不是猜测</strong>：始终基于实际执行计划和统计数据做决策</li><li><strong>平衡读写性能</strong>：索引加速查询但增加写入开销</li><li><strong>考虑数据特征</strong>：数据分布、访问模式、增长率</li><li><strong>利用版本特性</strong>：每个PostgreSQL版本都带来新的优化机会</li><li><strong>建立反馈循环</strong>：持续监控、分析、优化</li></ul><p>通过系统性的索引策略和查询优化，PostgreSQL可以支持从OLTP到OLAP的各种工作负载，提供企业级的性能表现。</p>`,102)])])}const r=a(p,[["render",l]]);export{d as __pageData,r as default};
