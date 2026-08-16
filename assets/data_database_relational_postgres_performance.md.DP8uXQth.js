import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"PostgreSQL性能调优与监控 完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/relational/postgres/performance.md","filePath":"data/database/relational/postgres/performance.md"}'),p={name:"data/database/relational/postgres/performance.md"};function l(h,s,c,e,t,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="postgresql性能调优与监控-完整学习笔记" tabindex="-1">PostgreSQL性能调优与监控 完整学习笔记 <a class="header-anchor" href="#postgresql性能调优与监控-完整学习笔记" aria-label="Permalink to &quot;PostgreSQL性能调优与监控 完整学习笔记&quot;">​</a></h1><h2 id="一、性能调优基础概念" tabindex="-1">一、性能调优基础概念 <a class="header-anchor" href="#一、性能调优基础概念" aria-label="Permalink to &quot;一、性能调优基础概念&quot;">​</a></h2><h3 id="_1-1-性能调优层次模型" tabindex="-1">1.1 性能调优层次模型 <a class="header-anchor" href="#_1-1-性能调优层次模型" aria-label="Permalink to &quot;1.1 性能调优层次模型&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">应用层优化 → SQL/API层优化 → 数据库配置优化 → OS/硬件优化</span></span>
<span class="line"><span class="__shiki_wvjl67">      ↓             ↓              ↓              ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">   业务逻辑      查询优化       参数调整       资源分配</span></span></code></pre></div><h3 id="_1-2-性能指标kpi" tabindex="-1">1.2 性能指标KPI <a class="header-anchor" href="#_1-2-性能指标kpi" aria-label="Permalink to &quot;1.2 性能指标KPI&quot;">​</a></h3><ul><li><strong>吞吐量</strong>：单位时间内处理的事务/查询数量</li><li><strong>响应时间</strong>：单个操作的完成时间</li><li><strong>并发能力</strong>：同时处理的连接/事务数量</li><li><strong>资源利用率</strong>：CPU、内存、磁盘、网络使用率</li></ul><h2 id="二、查询性能分析与优化" tabindex="-1">二、查询性能分析与优化 <a class="header-anchor" href="#二、查询性能分析与优化" aria-label="Permalink to &quot;二、查询性能分析与优化&quot;">​</a></h2><h3 id="_2-1-执行计划分析工具" tabindex="-1">2.1 执行计划分析工具 <a class="header-anchor" href="#_2-1-执行计划分析工具" aria-label="Permalink to &quot;2.1 执行计划分析工具&quot;">​</a></h3><h4 id="_2-1-1-explain命令详解" tabindex="-1">2.1.1 EXPLAIN命令详解 <a class="header-anchor" href="#_2-1-1-explain命令详解" aria-label="Permalink to &quot;2.1.1 EXPLAIN命令详解&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 基础执行计划</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN </span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> users </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> email </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;test@example.com&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 详细执行计划（实际运行）</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS) </span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> orders </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> order_date </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 完整执行计划</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS, TIMING, COSTS, </span><span class="__shiki_1itgoe">VERBOSE</span><span class="__shiki_140thh">, FORMAT </span><span class="__shiki_1itgoe">JSON</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> o.</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">u</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">name</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> orders o </span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> users u </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">user_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> u</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">status</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;completed&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_date</span><span class="__shiki_1itgoe"> DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_2-1-2-执行计划关键指标" tabindex="-1">2.1.2 执行计划关键指标 <a class="header-anchor" href="#_2-1-2-执行计划关键指标" aria-label="Permalink to &quot;2.1.2 执行计划关键指标&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看节点类型和成本</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN </span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> large_table </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 理解输出指标：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- - Total Cost: 总预估成本</span></span>
<span class="line"><span class="__shiki_21nrsd">-- - Startup Cost: 启动成本</span></span>
<span class="line"><span class="__shiki_21nrsd">-- - Rows: 预估返回行数</span></span>
<span class="line"><span class="__shiki_21nrsd">-- - Width: 预估行宽度(字节)</span></span>
<span class="line"><span class="__shiki_21nrsd">-- - Actual Time: 实际执行时间(ms)</span></span>
<span class="line"><span class="__shiki_21nrsd">-- - Loops: 循环次数</span></span>
<span class="line"><span class="__shiki_21nrsd">-- - Shared Hit/Miss/Read: 缓冲命中情况</span></span></code></pre></div><h3 id="_2-2-常见执行计划节点" tabindex="-1">2.2 常见执行计划节点 <a class="header-anchor" href="#_2-2-常见执行计划节点" aria-label="Permalink to &quot;2.2 常见执行计划节点&quot;">​</a></h3><h4 id="_2-2-1-扫描节点" tabindex="-1">2.2.1 扫描节点 <a class="header-anchor" href="#_2-2-1-扫描节点" aria-label="Permalink to &quot;2.2.1 扫描节点&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- Seq Scan（顺序扫描）</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN </span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> users </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> age </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 30</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- Index Scan（索引扫描）</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN </span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> users </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- Index Only Scan（仅索引扫描）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_users_name</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> users(</span><span class="__shiki_1itgoe">name</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN </span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> users </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;A%&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- Bitmap Index/Heap Scan</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN </span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> users </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> age </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 30</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_140thh"> city </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;NYC&#39;</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_2-2-2-连接节点" tabindex="-1">2.2.2 连接节点 <a class="header-anchor" href="#_2-2-2-连接节点" aria-label="Permalink to &quot;2.2.2 连接节点&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- Nested Loop Join（嵌套循环连接）</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN </span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> users u, orders o </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> u</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">user_id</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- Hash Join（哈希连接）</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN </span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> large_table1 l1 </span><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> large_table2 l2 </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> l1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> l2</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- Merge Join（合并连接）</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN </span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> table1 t1 </span><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> table2 t2 </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> t1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">sorted_col</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> t2</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">sorted_col</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_2-3-执行计划优化技巧" tabindex="-1">2.3 执行计划优化技巧 <a class="header-anchor" href="#_2-3-执行计划优化技巧" aria-label="Permalink to &quot;2.3 执行计划优化技巧&quot;">​</a></h3><h4 id="_2-3-1-识别性能问题" tabindex="-1">2.3.1 识别性能问题 <a class="header-anchor" href="#_2-3-1-识别性能问题" aria-label="Permalink to &quot;2.3.1 识别性能问题&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 问题1：全表扫描</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN ANALYZE </span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> users </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> lower</span><span class="__shiki_140thh">(email) </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;test@example.com&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 优化：创建函数索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_users_lower_email</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> users(</span><span class="__shiki_dzsirb">lower</span><span class="__shiki_140thh">(email));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 问题2：错误的连接顺序</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN ANALYZE </span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> small_table s </span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> large_table l </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> l</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">small_id</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 优化：调整连接顺序或使用提示</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> enable_nestloop </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> enable_hashjoin </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> enable_mergejoin </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> off</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_2-3-2-统计信息分析" tabindex="-1">2.3.2 统计信息分析 <a class="header-anchor" href="#_2-3-2-统计信息分析" aria-label="Permalink to &quot;2.3.2 统计信息分析&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看表统计信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> schemaname, tablename, attname, n_distinct, most_common_vals</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stats </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> tablename </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;orders&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 手动收集统计信息</span></span>
<span class="line"><span class="__shiki_140thh">ANALYZE </span><span class="__shiki_1itgoe">VERBOSE</span><span class="__shiki_140thh"> orders;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 设置统计信息目标级别（0-10000）</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> orders </span><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_140thh"> COLUMN user_id </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_1itgoe"> STATISTICS</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">ANALYZE orders;</span></span></code></pre></div><h2 id="三、索引优化策略" tabindex="-1">三、索引优化策略 <a class="header-anchor" href="#三、索引优化策略" aria-label="Permalink to &quot;三、索引优化策略&quot;">​</a></h2><h3 id="_3-1-索引类型选择指南" tabindex="-1">3.1 索引类型选择指南 <a class="header-anchor" href="#_3-1-索引类型选择指南" aria-label="Permalink to &quot;3.1 索引类型选择指南&quot;">​</a></h3><table tabindex="0"><thead><tr><th>索引类型</th><th>适用场景</th><th>注意事项</th></tr></thead><tbody><tr><td>B-tree</td><td>等值、范围查询、排序</td><td>默认索引类型，最通用</td></tr><tr><td>Hash</td><td>等值查询</td><td>不支持范围查询，事务安全有限</td></tr><tr><td>GiST</td><td>地理数据、全文搜索、范围类型</td><td>支持复杂数据类型</td></tr><tr><td>GIN</td><td>数组、JSONB、全文搜索</td><td>倒排索引，查询快但插入慢</td></tr><tr><td>SP-GiST</td><td>空间分区数据</td><td>非平衡数据结构</td></tr><tr><td>BRIN</td><td>物理存储有序的大表</td><td>存储空间小，维护成本低</td></tr></tbody></table><h3 id="_3-2-复合索引设计" tabindex="-1">3.2 复合索引设计 <a class="header-anchor" href="#_3-2-复合索引设计" aria-label="Permalink to &quot;3.2 复合索引设计&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 正确的复合索引顺序</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_orders_date_status</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> orders(order_date, </span><span class="__shiki_1itgoe">status</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查询利用复合索引</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN </span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> orders </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> order_date </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_1itgoe"> status</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;shipped&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 覆盖索引（Include索引）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_orders_covering</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> orders (user_id) </span><span class="__shiki_1itgoe">INCLUDE</span><span class="__shiki_140thh"> (order_date, total_amount);</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN </span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> user_id, order_date, total_amount </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> orders </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> user_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_3-3-部分索引和表达式索引" tabindex="-1">3.3 部分索引和表达式索引 <a class="header-anchor" href="#_3-3-部分索引和表达式索引" aria-label="Permalink to &quot;3.3 部分索引和表达式索引&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 部分索引（减少索引大小）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_active_users</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> users(email) </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> active </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 表达式索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_users_lower_name</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> users(</span><span class="__shiki_dzsirb">lower</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">name</span><span class="__shiki_140thh">));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 函数索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_orders_year</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> orders(EXTRACT(</span><span class="__shiki_1itgoe">YEAR</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> order_date));</span></span></code></pre></div><h3 id="_3-4-索引维护" tabindex="-1">3.4 索引维护 <a class="header-anchor" href="#_3-4-索引维护" aria-label="Permalink to &quot;3.4 索引维护&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看索引使用情况</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">    tablename,</span></span>
<span class="line"><span class="__shiki_140thh">    indexname,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_scan </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> index_scans,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_tup_read </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> tuples_read,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_tup_fetch </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> tuples_fetch</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_user_indexes </span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> idx_scan </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 重建索引</span></span>
<span class="line"><span class="__shiki_140thh">REINDEX </span><span class="__shiki_1itgoe">INDEX</span><span class="__shiki_140thh"> CONCURRENTLY idx_users_email;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 并行重建索引</span></span>
<span class="line"><span class="__shiki_140thh">REINDEX </span><span class="__shiki_1itgoe">INDEX</span><span class="__shiki_140thh"> idx_large_table_name;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看索引膨胀</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    schemaname </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;.&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> tablename </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> table_name,</span></span>
<span class="line"><span class="__shiki_140thh">    indexname </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> index_name,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_relation_size(indexrelid)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> index_size,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_scan </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> scans_since_last_vacuum</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_user_indexes </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> idx_scan </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_21nrsd">  -- 很少使用的索引</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> pg_relation_size(indexrelid) </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span></code></pre></div><h2 id="四、配置参数调优" tabindex="-1">四、配置参数调优 <a class="header-anchor" href="#四、配置参数调优" aria-label="Permalink to &quot;四、配置参数调优&quot;">​</a></h2><h3 id="_4-1-内存相关参数" tabindex="-1">4.1 内存相关参数 <a class="header-anchor" href="#_4-1-内存相关参数" aria-label="Permalink to &quot;4.1 内存相关参数&quot;">​</a></h3><h4 id="_4-1-1-共享缓冲区" tabindex="-1">4.1.1 共享缓冲区 <a class="header-anchor" href="#_4-1-1-共享缓冲区" aria-label="Permalink to &quot;4.1.1 共享缓冲区&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看当前设置</span></span>
<span class="line"><span class="__shiki_140thh">SHOW shared_buffers;  </span><span class="__shiki_21nrsd">-- 建议设置为系统内存的25%</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 计算公式</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 对于专用数据库服务器：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- shared_buffers = RAM * 0.25</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 对于混合用途服务器：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- shared_buffers = RAM * 0.15</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 修改配置（需要重启）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- postgresql.conf:</span></span>
<span class="line"><span class="__shiki_140thh">shared_buffers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 4GB</span></span></code></pre></div><h4 id="_4-1-2-工作内存" tabindex="-1">4.1.2 工作内存 <a class="header-anchor" href="#_4-1-2-工作内存" aria-label="Permalink to &quot;4.1.2 工作内存&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- work_mem：每个排序/哈希操作的内存</span></span>
<span class="line"><span class="__shiki_140thh">SHOW work_mem;  </span><span class="__shiki_21nrsd">-- 建议计算公式：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- work_mem = (RAM - shared_buffers) / (max_connections * 2)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 设置示例</span></span>
<span class="line"><span class="__shiki_140thh">work_mem </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 64MB  </span><span class="__shiki_21nrsd">-- 对于复杂查询可以设置更高</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- maintenance_work_mem：维护操作内存</span></span>
<span class="line"><span class="__shiki_140thh">maintenance_work_mem </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 1GB  </span><span class="__shiki_21nrsd">-- VACUUM, CREATE INDEX等</span></span></code></pre></div><h4 id="_4-1-3-其他内存参数" tabindex="-1">4.1.3 其他内存参数 <a class="header-anchor" href="#_4-1-3-其他内存参数" aria-label="Permalink to &quot;4.1.3 其他内存参数&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 有效缓存大小（优化器假设的OS缓存）</span></span>
<span class="line"><span class="__shiki_140thh">effective_cache_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 12GB  </span><span class="__shiki_21nrsd">-- 设置为RAM的50-75%</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 临时缓冲区</span></span>
<span class="line"><span class="__shiki_140thh">temp_buffers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 8MB  </span><span class="__shiki_21nrsd">-- 每个会话的临时表缓冲区</span></span></code></pre></div><h3 id="_4-2-wal和检查点配置" tabindex="-1">4.2 WAL和检查点配置 <a class="header-anchor" href="#_4-2-wal和检查点配置" aria-label="Permalink to &quot;4.2 WAL和检查点配置&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- WAL配置</span></span>
<span class="line"><span class="__shiki_140thh">wal_level </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> replica</span><span class="__shiki_21nrsd">  -- 或 logical</span></span>
<span class="line"><span class="__shiki_140thh">wal_buffers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 16MB   </span><span class="__shiki_21nrsd">-- 通常为shared_buffers的1/32</span></span>
<span class="line"><span class="__shiki_140thh">wal_compression </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_21nrsd">  -- 压缩WAL日志</span></span>
<span class="line"><span class="__shiki_140thh">max_wal_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 2GB    </span><span class="__shiki_21nrsd">-- 最大WAL大小</span></span>
<span class="line"><span class="__shiki_140thh">min_wal_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 1GB    </span><span class="__shiki_21nrsd">-- 最小WAL大小</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 检查点配置</span></span>
<span class="line"><span class="__shiki_140thh">checkpoint_timeout </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 15min  </span><span class="__shiki_21nrsd">-- 检查点间隔</span></span>
<span class="line"><span class="__shiki_140thh">checkpoint_completion_target </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">9</span><span class="__shiki_21nrsd">  -- 检查点完成目标</span></span>
<span class="line"><span class="__shiki_140thh">checkpoint_warning </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 30s    </span><span class="__shiki_21nrsd">-- 检查点耗时警告阈值</span></span>
<span class="line"><span class="__shiki_140thh">max_wal_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 4GB          </span><span class="__shiki_21nrsd">-- 触发检查点的WAL大小</span></span></code></pre></div><h3 id="_4-3-并行查询配置" tabindex="-1">4.3 并行查询配置 <a class="header-anchor" href="#_4-3-并行查询配置" aria-label="Permalink to &quot;4.3 并行查询配置&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 并行查询设置</span></span>
<span class="line"><span class="__shiki_140thh">max_worker_processes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 8</span><span class="__shiki_21nrsd">           -- 最大工作进程数</span></span>
<span class="line"><span class="__shiki_140thh">max_parallel_workers_per_gather </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_21nrsd"> -- 每个Gather节点的并行工作进程</span></span>
<span class="line"><span class="__shiki_140thh">max_parallel_workers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 8</span><span class="__shiki_21nrsd">           -- 最大并行工作进程数</span></span>
<span class="line"><span class="__shiki_140thh">parallel_setup_cost </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_21nrsd">       -- 并行设置成本</span></span>
<span class="line"><span class="__shiki_140thh">parallel_tuple_cost </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_21nrsd">          -- 并行元组成本</span></span>
<span class="line"><span class="__shiki_140thh">min_parallel_table_scan_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 8MB </span><span class="__shiki_21nrsd">-- 启用并行的最小表大小</span></span>
<span class="line"><span class="__shiki_140thh">min_parallel_index_scan_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> 512kB </span><span class="__shiki_21nrsd">-- 启用并行的最小索引大小</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 表级并行度设置</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> large_table </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> (parallel_workers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_4-4-连接和自动清理配置" tabindex="-1">4.4 连接和自动清理配置 <a class="header-anchor" href="#_4-4-连接和自动清理配置" aria-label="Permalink to &quot;4.4 连接和自动清理配置&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 连接管理</span></span>
<span class="line"><span class="__shiki_140thh">max_connections </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 200</span><span class="__shiki_21nrsd">              -- 最大连接数</span></span>
<span class="line"><span class="__shiki_140thh">superuser_reserved_connections </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_21nrsd"> -- 为超级用户保留的连接</span></span>
<span class="line"><span class="__shiki_140thh">shared_preload_libraries </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;pg_stat_statements&#39;</span><span class="__shiki_21nrsd">  -- 预加载扩展</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 自动清理</span></span>
<span class="line"><span class="__shiki_140thh">autovacuum </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_21nrsd">                    -- 启用自动清理</span></span>
<span class="line"><span class="__shiki_140thh">autovacuum_max_workers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_21nrsd">         -- 自动清理工作进程数</span></span>
<span class="line"><span class="__shiki_140thh">autovacuum_vacuum_cost_limit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2000</span><span class="__shiki_21nrsd"> -- 清理成本限制</span></span>
<span class="line"><span class="__shiki_140thh">autovacuum_vacuum_scale_factor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">2</span><span class="__shiki_21nrsd"> -- 触发清理的表更新比例</span></span>
<span class="line"><span class="__shiki_140thh">autovacuum_analyze_scale_factor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_21nrsd"> -- 触发分析的表更新比例</span></span>
<span class="line"><span class="__shiki_140thh">log_autovacuum_min_duration </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_21nrsd">    -- 记录长时间自动清理</span></span></code></pre></div><h2 id="五、监控体系搭建" tabindex="-1">五、监控体系搭建 <a class="header-anchor" href="#五、监控体系搭建" aria-label="Permalink to &quot;五、监控体系搭建&quot;">​</a></h2><h3 id="_5-1-内置监控视图" tabindex="-1">5.1 内置监控视图 <a class="header-anchor" href="#_5-1-内置监控视图" aria-label="Permalink to &quot;5.1 内置监控视图&quot;">​</a></h3><h4 id="_5-1-1-系统统计视图" tabindex="-1">5.1.1 系统统计视图 <a class="header-anchor" href="#_5-1-1-系统统计视图" aria-label="Permalink to &quot;5.1.1 系统统计视图&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 数据库级别统计</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    datname,</span></span>
<span class="line"><span class="__shiki_140thh">    numbackends </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> connections,</span></span>
<span class="line"><span class="__shiki_140thh">    xact_commit </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> commits,</span></span>
<span class="line"><span class="__shiki_140thh">    xact_rollback </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> rollbacks,</span></span>
<span class="line"><span class="__shiki_140thh">    blks_read,</span></span>
<span class="line"><span class="__shiki_140thh">    blks_hit,</span></span>
<span class="line"><span class="__shiki_dzsirb">    round</span><span class="__shiki_140thh">(blks_hit::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> nullif</span><span class="__shiki_140thh">(blks_hit </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> blks_read, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> hit_ratio</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_database </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> datname </span><span class="__shiki_1itgoe">NOT</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;template0&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;template1&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 表级别统计</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">    relname,</span></span>
<span class="line"><span class="__shiki_140thh">    seq_scan,</span></span>
<span class="line"><span class="__shiki_140thh">    seq_tup_read,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_scan,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_tup_fetch,</span></span>
<span class="line"><span class="__shiki_140thh">    n_tup_ins,</span></span>
<span class="line"><span class="__shiki_140thh">    n_tup_upd,</span></span>
<span class="line"><span class="__shiki_140thh">    n_tup_del,</span></span>
<span class="line"><span class="__shiki_140thh">    n_tup_hot_upd,</span></span>
<span class="line"><span class="__shiki_140thh">    n_live_tup,</span></span>
<span class="line"><span class="__shiki_140thh">    n_dead_tup,</span></span>
<span class="line"><span class="__shiki_140thh">    vacuum_count,</span></span>
<span class="line"><span class="__shiki_140thh">    autovacuum_count,</span></span>
<span class="line"><span class="__shiki_140thh">    analyze_count,</span></span>
<span class="line"><span class="__shiki_140thh">    autoanalyze_count,</span></span>
<span class="line"><span class="__shiki_140thh">    last_vacuum,</span></span>
<span class="line"><span class="__shiki_140thh">    last_autovacuum,</span></span>
<span class="line"><span class="__shiki_140thh">    last_analyze,</span></span>
<span class="line"><span class="__shiki_140thh">    last_autoanalyze</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_user_tables </span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> n_dead_tup </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_5-1-2-查询统计扩展" tabindex="-1">5.1.2 查询统计扩展 <a class="header-anchor" href="#_5-1-2-查询统计扩展" aria-label="Permalink to &quot;5.1.2 查询统计扩展&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 安装pg_stat_statements</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> EXTENSION </span><span class="__shiki_1itgoe">IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> pg_stat_statements;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看最耗时的查询</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    query,</span></span>
<span class="line"><span class="__shiki_140thh">    calls,</span></span>
<span class="line"><span class="__shiki_140thh">    total_exec_time,</span></span>
<span class="line"><span class="__shiki_140thh">    mean_exec_time,</span></span>
<span class="line"><span class="__shiki_1itgoe">    rows</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    shared_blks_hit,</span></span>
<span class="line"><span class="__shiki_140thh">    shared_blks_read,</span></span>
<span class="line"><span class="__shiki_140thh">    shared_blks_dirtied,</span></span>
<span class="line"><span class="__shiki_140thh">    shared_blks_written,</span></span>
<span class="line"><span class="__shiki_140thh">    local_blks_hit,</span></span>
<span class="line"><span class="__shiki_140thh">    local_blks_read,</span></span>
<span class="line"><span class="__shiki_140thh">    local_blks_dirtied,</span></span>
<span class="line"><span class="__shiki_140thh">    local_blks_written,</span></span>
<span class="line"><span class="__shiki_140thh">    temp_blks_read,</span></span>
<span class="line"><span class="__shiki_140thh">    temp_blks_written</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_statements </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">NOT</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%pg_stat%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> total_exec_time </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 重置统计信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> pg_stat_statements_reset();</span></span></code></pre></div><h3 id="_5-2-性能监控查询" tabindex="-1">5.2 性能监控查询 <a class="header-anchor" href="#_5-2-性能监控查询" aria-label="Permalink to &quot;5.2 性能监控查询&quot;">​</a></h3><h4 id="_5-2-1-连接监控" tabindex="-1">5.2.1 连接监控 <a class="header-anchor" href="#_5-2-1-连接监控" aria-label="Permalink to &quot;5.2.1 连接监控&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 当前活动连接</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    pid,</span></span>
<span class="line"><span class="__shiki_140thh">    usename,</span></span>
<span class="line"><span class="__shiki_140thh">    application_name,</span></span>
<span class="line"><span class="__shiki_140thh">    client_addr,</span></span>
<span class="line"><span class="__shiki_140thh">    client_port,</span></span>
<span class="line"><span class="__shiki_140thh">    backend_start,</span></span>
<span class="line"><span class="__shiki_1itgoe">    state</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    query,</span></span>
<span class="line"><span class="__shiki_140thh">    query_start,</span></span>
<span class="line"><span class="__shiki_140thh">    wait_event_type,</span></span>
<span class="line"><span class="__shiki_140thh">    wait_event</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_activity </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> state</span><span class="__shiki_1itgoe"> IS NOT NULL</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> query_start;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 连接数统计</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    state</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> connection_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">    count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">FILTER</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> state</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;active&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> active,</span></span>
<span class="line"><span class="__shiki_dzsirb">    count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">FILTER</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> state</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;idle&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> idle,</span></span>
<span class="line"><span class="__shiki_dzsirb">    count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">FILTER</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> state</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;idle in transaction&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> idle_in_xact</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_activity </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> pid </span><span class="__shiki_1itgoe">&lt;&gt;</span><span class="__shiki_140thh"> pg_backend_pid()</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_1itgoe"> state</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 长事务查询</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    pid,</span></span>
<span class="line"><span class="__shiki_1itgoe">    now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> xact_start </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> duration,</span></span>
<span class="line"><span class="__shiki_140thh">    query</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_activity </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> state</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;idle in transaction&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;active&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> xact_start </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;5 minutes&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> duration </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_5-2-2-锁监控" tabindex="-1">5.2.2 锁监控 <a class="header-anchor" href="#_5-2-2-锁监控" aria-label="Permalink to &quot;5.2.2 锁监控&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 当前锁信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    locktype,</span></span>
<span class="line"><span class="__shiki_140thh">    relation::regclass,</span></span>
<span class="line"><span class="__shiki_140thh">    mode,</span></span>
<span class="line"><span class="__shiki_140thh">    granted,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_blocking_pids(pid) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> blocking_pids,</span></span>
<span class="line"><span class="__shiki_140thh">    age(</span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">(), query_start) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> query_age</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_locks l</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> pg_stat_activity a </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> l</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_dzsirb"> l</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">granted</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">   OR</span><span class="__shiki_140thh"> pg_blocking_pids(</span><span class="__shiki_dzsirb">l</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&lt;&gt;</span><span class="__shiki_mdbnqw"> &#39;{}&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 死锁检测</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 在postgresql.conf中设置：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- deadlock_timeout = 1s</span></span>
<span class="line"><span class="__shiki_21nrsd">-- log_lock_waits = on</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看锁等待</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    blocked_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> blocked_pid,</span></span>
<span class="line"><span class="__shiki_dzsirb">    blocked_activity</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">query</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> blocked_query,</span></span>
<span class="line"><span class="__shiki_dzsirb">    blocking_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> blocking_pid,</span></span>
<span class="line"><span class="__shiki_dzsirb">    blocking_activity</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">query</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> blocking_query</span></span>
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
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_dzsirb"> blocked_locks</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">granted</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_5-3-存储和i-o监控" tabindex="-1">5.3 存储和I/O监控 <a class="header-anchor" href="#_5-3-存储和i-o监控" aria-label="Permalink to &quot;5.3 存储和I/O监控&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 数据库大小</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    pg_database</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">datname</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_database_size(</span><span class="__shiki_dzsirb">pg_database</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">datname</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> size</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_database</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> pg_database_size(</span><span class="__shiki_dzsirb">pg_database</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">datname</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 表大小及膨胀情况</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">    tablename,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_total_relation_size(schemaname </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;.&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> tablename)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total_size,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_relation_size(schemaname </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;.&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> tablename)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> table_size,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_total_relation_size(schemaname </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;.&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> tablename) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                   pg_relation_size(schemaname </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;.&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> tablename)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> index_size,</span></span>
<span class="line"><span class="__shiki_140thh">    n_live_tup </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> live_rows,</span></span>
<span class="line"><span class="__shiki_140thh">    n_dead_tup </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> dead_rows,</span></span>
<span class="line"><span class="__shiki_dzsirb">    round</span><span class="__shiki_140thh">(n_dead_tup::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> nullif</span><span class="__shiki_140thh">(n_live_tup </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> n_dead_tup, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> dead_percent</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_user_tables </span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> (n_dead_tup::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> nullif</span><span class="__shiki_140thh">(n_live_tup </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> n_dead_tup, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- I/O统计</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">    relname,</span></span>
<span class="line"><span class="__shiki_140thh">    heap_blks_read,</span></span>
<span class="line"><span class="__shiki_140thh">    heap_blks_hit,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_blks_read,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_blks_hit,</span></span>
<span class="line"><span class="__shiki_140thh">    toast_blks_read,</span></span>
<span class="line"><span class="__shiki_140thh">    toast_blks_hit,</span></span>
<span class="line"><span class="__shiki_140thh">    tidx_blks_read,</span></span>
<span class="line"><span class="__shiki_140thh">    tidx_blks_hit</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_statio_user_tables;</span></span></code></pre></div><h2 id="六、高级监控工具" tabindex="-1">六、高级监控工具 <a class="header-anchor" href="#六、高级监控工具" aria-label="Permalink to &quot;六、高级监控工具&quot;">​</a></h2><h3 id="_6-1-pgbadger日志分析器" tabindex="-1">6.1 pgBadger日志分析器 <a class="header-anchor" href="#_6-1-pgbadger日志分析器" aria-label="Permalink to &quot;6.1 pgBadger日志分析器&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 配置PostgreSQL日志</span></span>
<span class="line"><span class="__shiki_21nrsd"># postgresql.conf:</span></span>
<span class="line"><span class="__shiki_1t8gfj">log_destination</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_mdbnqw"> &#39;stderr&#39;</span></span>
<span class="line"><span class="__shiki_1t8gfj">logging_collector</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_mdbnqw"> on</span></span>
<span class="line"><span class="__shiki_1t8gfj">log_directory</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_mdbnqw"> &#39;pg_log&#39;</span></span>
<span class="line"><span class="__shiki_1t8gfj">log_filename</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_mdbnqw"> &#39;postgresql-%Y-%m-%d_%H%M%S.log&#39;</span></span>
<span class="line"><span class="__shiki_1t8gfj">log_rotation_age</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_mdbnqw"> 1d</span></span>
<span class="line"><span class="__shiki_1t8gfj">log_rotation_size</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_mdbnqw"> 100MB</span></span>
<span class="line"><span class="__shiki_1t8gfj">log_min_duration_statement</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_21nrsd">  # 记录慢查询(ms)</span></span>
<span class="line"><span class="__shiki_1t8gfj">log_checkpoints</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_mdbnqw"> on</span></span>
<span class="line"><span class="__shiki_1t8gfj">log_connections</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_mdbnqw"> on</span></span>
<span class="line"><span class="__shiki_1t8gfj">log_disconnections</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_mdbnqw"> on</span></span>
<span class="line"><span class="__shiki_1t8gfj">log_lock_waits</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_mdbnqw"> on</span></span>
<span class="line"><span class="__shiki_1t8gfj">log_temp_files</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 运行pgBadger</span></span>
<span class="line"><span class="__shiki_1t8gfj">pgbadger</span><span class="__shiki_mdbnqw"> /var/lib/pgsql/data/pg_log/postgresql-</span><span class="__shiki_dzsirb">*</span><span class="__shiki_mdbnqw">.log</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> report.html</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 定时生成报告</span></span>
<span class="line"><span class="__shiki_1t8gfj">0</span><span class="__shiki_dzsirb"> *</span><span class="__shiki_mdbnqw">/6</span><span class="__shiki_dzsirb"> *</span><span class="__shiki_dzsirb"> *</span><span class="__shiki_dzsirb"> *</span><span class="__shiki_mdbnqw"> pgbadger</span><span class="__shiki_mdbnqw"> /var/lib/pgsql/data/pg_log/postgresql-</span><span class="__shiki_dzsirb">*</span><span class="__shiki_mdbnqw">.log</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> /var/www/html/db_report_\`</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +</span><span class="__shiki_dzsirb">\\%</span><span class="__shiki_mdbnqw">Y</span><span class="__shiki_dzsirb">\\%</span><span class="__shiki_mdbnqw">m</span><span class="__shiki_dzsirb">\\%</span><span class="__shiki_mdbnqw">d_</span><span class="__shiki_dzsirb">\\%</span><span class="__shiki_mdbnqw">H</span><span class="__shiki_dzsirb">\\%</span><span class="__shiki_mdbnqw">M\`</span><span class="__shiki_1t8gfj">.html</span></span></code></pre></div><h3 id="_6-2-prometheus-grafana监控栈" tabindex="-1">6.2 Prometheus + Grafana监控栈 <a class="header-anchor" href="#_6-2-prometheus-grafana监控栈" aria-label="Permalink to &quot;6.2 Prometheus + Grafana监控栈&quot;">​</a></h3><h4 id="_6-2-1-配置postgres-exporter" tabindex="-1">6.2.1 配置postgres_exporter <a class="header-anchor" href="#_6-2-1-配置postgres-exporter" aria-label="Permalink to &quot;6.2.1 配置postgres_exporter&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># postgres_exporter配置</span></span>
<span class="line"><span class="__shiki_17hn0y">exporters</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  postgres</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    instances</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">primary</span></span>
<span class="line"><span class="__shiki_17hn0y">        data_source_name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;postgresql://monitor_user:password@localhost:5432/postgres?sslmode=disable&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        disable_default_metrics</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">        autodiscover_databases</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">        query_path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/etc/postgres_exporter/queries.yaml&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 自定义查询指标</span></span>
<span class="line"><span class="__shiki_21nrsd"># queries.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">pg_stat_statements</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  query</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;SELECT query, calls, total_time, mean_time FROM pg_stat_statements&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">query</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        usage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;LABEL&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Query text&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">calls</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        usage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;COUNTER&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Number of times executed&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">total_time</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        usage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;GAUGE&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Total time spent in milliseconds&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">mean_time</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        usage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;GAUGE&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Mean time per execution in milliseconds&quot;</span></span></code></pre></div><h4 id="_6-2-2-grafana监控面板" tabindex="-1">6.2.2 Grafana监控面板 <a class="header-anchor" href="#_6-2-2-grafana监控面板" aria-label="Permalink to &quot;6.2.2 Grafana监控面板&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 关键监控面板配置示例</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;panels&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;title&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Database Connections&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;targets&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;expr&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;pg_stat_database_numbackends{datname!~</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">template.*</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">}&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;legendFormat&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{datname}}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      ]</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;title&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Cache Hit Ratio&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;targets&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;expr&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100 * (pg_stat_database_blks_hit / (pg_stat_database_blks_hit + pg_stat_database_blks_read))&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;legendFormat&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{datname}}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      ]</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-3-自定义监控脚本" tabindex="-1">6.3 自定义监控脚本 <a class="header-anchor" href="#_6-3-自定义监控脚本" aria-label="Permalink to &quot;6.3 自定义监控脚本&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># PostgreSQL健康检查脚本</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">check_postgres_health</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> host</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33">$1</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> port</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33">$2</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> dbname</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33">$3</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> user</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33">$4</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 检查连接性</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_1t8gfj"> psql</span><span class="__shiki_dzsirb"> -h</span><span class="__shiki_140thh"> $host </span><span class="__shiki_dzsirb">-p</span><span class="__shiki_140thh"> $port </span><span class="__shiki_dzsirb">-d</span><span class="__shiki_140thh"> $dbname </span><span class="__shiki_dzsirb">-U</span><span class="__shiki_140thh"> $user </span><span class="__shiki_dzsirb">-c</span><span class="__shiki_mdbnqw"> &quot;SELECT 1&quot;</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /dev/null</span><span class="__shiki_1itgoe"> 2&gt;&amp;1</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;CRITICAL: Cannot connect to PostgreSQL&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 2</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 检查复制状态（如果适用）</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> psql</span><span class="__shiki_dzsirb"> -h</span><span class="__shiki_140thh"> $host </span><span class="__shiki_dzsirb">-p</span><span class="__shiki_140thh"> $port </span><span class="__shiki_dzsirb">-d</span><span class="__shiki_140thh"> $dbname </span><span class="__shiki_dzsirb">-U</span><span class="__shiki_140thh"> $user </span><span class="__shiki_dzsirb">-c</span><span class="__shiki_mdbnqw"> &quot;SELECT pg_is_in_recovery()&quot;</span><span class="__shiki_dzsirb"> -t</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_mdbnqw"> &quot;f&quot;</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;OK: Primary database is running&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    else</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;WARNING: Database is in recovery mode&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 检查长事务</span></span>
<span class="line"><span class="__shiki_140thh">    long_tx</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">psql</span><span class="__shiki_dzsirb"> -h</span><span class="__shiki_140thh"> $host </span><span class="__shiki_dzsirb">-p</span><span class="__shiki_140thh"> $port </span><span class="__shiki_dzsirb">-d</span><span class="__shiki_140thh"> $dbname </span><span class="__shiki_dzsirb">-U</span><span class="__shiki_140thh"> $user </span><span class="__shiki_dzsirb">-c</span><span class="__shiki_mdbnqw"> &quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SELECT count(*) FROM pg_stat_activity </span></span>
<span class="line"><span class="__shiki_mdbnqw">        WHERE state IN (&#39;idle in transaction&#39;, &#39;active&#39;) </span></span>
<span class="line"><span class="__shiki_mdbnqw">        AND now() - xact_start &gt; interval &#39;5 minutes&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_dzsirb"> -t</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> [ $long_tx </span><span class="__shiki_1itgoe">-gt</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;WARNING: Found </span><span class="__shiki_140thh">$long_tx</span><span class="__shiki_mdbnqw"> long-running transactions&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 检查死元组比例</span></span>
<span class="line"><span class="__shiki_1t8gfj">    psql</span><span class="__shiki_dzsirb"> -h</span><span class="__shiki_140thh"> $host </span><span class="__shiki_dzsirb">-p</span><span class="__shiki_140thh"> $port </span><span class="__shiki_dzsirb">-d</span><span class="__shiki_140thh"> $dbname </span><span class="__shiki_dzsirb">-U</span><span class="__shiki_140thh"> $user </span><span class="__shiki_dzsirb">-c</span><span class="__shiki_mdbnqw"> &quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SELECT schemaname, tablename, </span></span>
<span class="line"><span class="__shiki_mdbnqw">               round(n_dead_tup::numeric * 100 / nullif(n_live_tup + n_dead_tup, 0), 2) as dead_percent</span></span>
<span class="line"><span class="__shiki_mdbnqw">        FROM pg_stat_user_tables </span></span>
<span class="line"><span class="__shiki_mdbnqw">        WHERE n_dead_tup &gt; 1000 </span></span>
<span class="line"><span class="__shiki_mdbnqw">          AND n_dead_tup::numeric * 100 / nullif(n_live_tup + n_dead_tup, 0) &gt; 20</span></span>
<span class="line"><span class="__shiki_mdbnqw">        ORDER BY dead_percent DESC</span></span>
<span class="line"><span class="__shiki_mdbnqw">        LIMIT 5;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 定期运行</span></span>
<span class="line"><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">/5 </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> /path/to/check_postgres_health.sh localhost 5432 postgres monitor_user </span><span class="__shiki_1itgoe">&gt;&gt;</span><span class="__shiki_140thh"> /var/log/postgres_health.log</span></span></code></pre></div><h2 id="七、性能问题诊断与解决" tabindex="-1">七、性能问题诊断与解决 <a class="header-anchor" href="#七、性能问题诊断与解决" aria-label="Permalink to &quot;七、性能问题诊断与解决&quot;">​</a></h2><h3 id="_7-1-常见性能问题排查流程" tabindex="-1">7.1 常见性能问题排查流程 <a class="header-anchor" href="#_7-1-常见性能问题排查流程" aria-label="Permalink to &quot;7.1 常见性能问题排查流程&quot;">​</a></h3><h4 id="_7-1-1-cpu使用率高" tabindex="-1">7.1.1 CPU使用率高 <a class="header-anchor" href="#_7-1-1-cpu使用率高" aria-label="Permalink to &quot;7.1.1 CPU使用率高&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查找消耗CPU的查询</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    pid,</span></span>
<span class="line"><span class="__shiki_140thh">    usename,</span></span>
<span class="line"><span class="__shiki_140thh">    query,</span></span>
<span class="line"><span class="__shiki_1itgoe">    now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> query_start </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> duration,</span></span>
<span class="line"><span class="__shiki_1itgoe">    state</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_activity </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> state</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;active&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> duration </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用pg_stat_statements查找高负载查询</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    query,</span></span>
<span class="line"><span class="__shiki_140thh">    calls,</span></span>
<span class="line"><span class="__shiki_140thh">    total_exec_time,</span></span>
<span class="line"><span class="__shiki_140thh">    mean_exec_time,</span></span>
<span class="line"><span class="__shiki_140thh">    stddev_exec_time,</span></span>
<span class="line"><span class="__shiki_1itgoe">    rows</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> calls </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_rows</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_statements </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> total_exec_time </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_21nrsd">  -- 执行时间超过1秒</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> total_exec_time </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_7-1-2-内存问题" tabindex="-1">7.1.2 内存问题 <a class="header-anchor" href="#_7-1-2-内存问题" aria-label="Permalink to &quot;7.1.2 内存问题&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 检查缓存命中率</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    sum</span><span class="__shiki_140thh">(heap_blks_hit) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> nullif</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(heap_blks_hit </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> heap_blks_read), </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> heap_hit_ratio,</span></span>
<span class="line"><span class="__shiki_dzsirb">    sum</span><span class="__shiki_140thh">(idx_blks_hit) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> nullif</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(idx_blks_hit </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> idx_blks_read), </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> idx_hit_ratio</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_statio_user_tables;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 检查work_mem使用</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS) </span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> large_table </span><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> random_column;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 临时文件使用</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    datname,</span></span>
<span class="line"><span class="__shiki_140thh">    temp_files,</span></span>
<span class="line"><span class="__shiki_140thh">    temp_bytes,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(temp_bytes) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> temp_size</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_database </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> temp_bytes </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_7-1-3-磁盘i-o问题" tabindex="-1">7.1.3 磁盘I/O问题 <a class="header-anchor" href="#_7-1-3-磁盘i-o问题" aria-label="Permalink to &quot;7.1.3 磁盘I/O问题&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 检查I/O等待</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    wait_event_type,</span></span>
<span class="line"><span class="__shiki_140thh">    wait_event,</span></span>
<span class="line"><span class="__shiki_dzsirb">    count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_activity </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> wait_event_type </span><span class="__shiki_1itgoe">IS NOT NULL</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> wait_event_type, wait_event</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_dzsirb"> count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看检查点活动</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    checkpoints_timed,</span></span>
<span class="line"><span class="__shiki_140thh">    checkpoints_req,</span></span>
<span class="line"><span class="__shiki_140thh">    checkpoint_write_time,</span></span>
<span class="line"><span class="__shiki_140thh">    checkpoint_sync_time,</span></span>
<span class="line"><span class="__shiki_140thh">    buffers_checkpoint,</span></span>
<span class="line"><span class="__shiki_140thh">    buffers_clean,</span></span>
<span class="line"><span class="__shiki_140thh">    maxwritten_clean</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_bgwriter;</span></span></code></pre></div><h3 id="_7-2-自动维护策略" tabindex="-1">7.2 自动维护策略 <a class="header-anchor" href="#_7-2-自动维护策略" aria-label="Permalink to &quot;7.2 自动维护策略&quot;">​</a></h3><h4 id="_7-2-1-智能vacuum策略" tabindex="-1">7.2.1 智能VACUUM策略 <a class="header-anchor" href="#_7-2-1-智能vacuum策略" aria-label="Permalink to &quot;7.2.1 智能VACUUM策略&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建自动VACUUM管理函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> smart_vacuum</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> void </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    r RECORD;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> r </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> schemaname, tablename, </span></span>
<span class="line"><span class="__shiki_140thh">               n_live_tup, n_dead_tup,</span></span>
<span class="line"><span class="__shiki_140thh">               n_dead_tup::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> nullif</span><span class="__shiki_140thh">(n_live_tup </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> n_dead_tup, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> dead_percent</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_stat_user_tables </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> n_dead_tup </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">          AND</span><span class="__shiki_140thh"> n_dead_tup::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> nullif</span><span class="__shiki_140thh">(n_live_tup </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> n_dead_tup, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"><span class="__shiki_1itgoe">          AND</span><span class="__shiki_140thh"> (last_vacuum </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_1itgoe"> NULL</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> last_vacuum </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;1 hour&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        ORDER BY</span><span class="__shiki_140thh"> dead_percent </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;VACUUM (VERBOSE, ANALYZE) %I.%I&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">schemaname</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">tablename</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;VACUUMed table %.% (dead: %% %%)&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">                     r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">schemaname</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">tablename</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">n_dead_tup</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">dead_percent</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 设置定时任务</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用cron或pg_cron扩展</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 0 2 * * * psql -d yourdb -c &quot;SELECT smart_vacuum();&quot;</span></span></code></pre></div><h4 id="_7-2-2-索引维护" tabindex="-1">7.2.2 索引维护 <a class="header-anchor" href="#_7-2-2-索引维护" aria-label="Permalink to &quot;7.2.2 索引维护&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 自动重建膨胀索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> maintain_indexes</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> void </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    r RECORD;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> r </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> schemaname, tablename, indexname,</span></span>
<span class="line"><span class="__shiki_140thh">               pg_relation_size(schemaname </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;.&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> indexname) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> index_size</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_stat_user_indexes </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> idx_scan </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_21nrsd">  -- 很少使用</span></span>
<span class="line"><span class="__shiki_1itgoe">          AND</span><span class="__shiki_140thh"> pg_relation_size(schemaname </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;.&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> indexname) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100000000</span><span class="__shiki_21nrsd">  -- 大于100MB</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 考虑删除而非重建</span></span>
<span class="line"><span class="__shiki_140thh">        RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;Consider dropping index %.%.% (size: %, scans: %)&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">                     r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">schemaname</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">tablename</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">indexname</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                     pg_size_pretty(</span><span class="__shiki_dzsirb">r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">index_size</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">idx_scan</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span></code></pre></div><h2 id="八、高级调优技术" tabindex="-1">八、高级调优技术 <a class="header-anchor" href="#八、高级调优技术" aria-label="Permalink to &quot;八、高级调优技术&quot;">​</a></h2><h3 id="_8-1-分区表优化" tabindex="-1">8.1 分区表优化 <a class="header-anchor" href="#_8-1-分区表优化" aria-label="Permalink to &quot;8.1 分区表优化&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建分区表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> orders_partitioned</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">BIGSERIAL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    order_date </span><span class="__shiki_1itgoe">DATE</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    customer_id </span><span class="__shiki_1itgoe">INT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    amount </span><span class="__shiki_1itgoe">DECIMAL</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1itgoe">    status</span><span class="__shiki_1itgoe"> VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">PARTITION</span><span class="__shiki_1itgoe"> BY</span><span class="__shiki_1itgoe"> RANGE</span><span class="__shiki_140thh"> (order_date);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建分区</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> orders_2023_q1</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF orders_partitioned</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2023-01-01&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2023-04-01&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> orders_2023_q2</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF orders_partitioned</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2023-04-01&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2023-07-01&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 为分区创建本地索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_orders_partitioned_date</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> orders_partitioned(order_date);</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_orders_partitioned_customer</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> orders_partitioned(customer_id);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 分区维护</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 分离旧分区</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> orders_partitioned DETACH </span><span class="__shiki_1itgoe">PARTITION</span><span class="__shiki_140thh"> orders_2023_q1;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 添加新分区</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> orders_2024_q1</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF orders_partitioned</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-01-01&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-04-01&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 并发创建索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> CONCURRENTLY</span><span class="__shiki_140thh"> idx_orders_2024_q1_customer </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> orders_2024_q1(customer_id);</span></span></code></pre></div><h3 id="_8-2-查询重写与优化" tabindex="-1">8.2 查询重写与优化 <a class="header-anchor" href="#_8-2-查询重写与优化" aria-label="Permalink to &quot;8.2 查询重写与优化&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 原始查询（可能低效）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> orders o</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> order_items oi </span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_dzsirb"> oi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_dzsirb"> oi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">AND</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_date</span><span class="__shiki_1itgoe"> &gt;=</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 优化版本1：使用JOIN</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT DISTINCT</span><span class="__shiki_140thh"> o.</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> orders o</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> order_items oi </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> oi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_id</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> oi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"><span class="__shiki_1itgoe">AND</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_date</span><span class="__shiki_1itgoe"> &gt;=</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 优化版本2：使用半连接</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> o.</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> orders o</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_date</span><span class="__shiki_1itgoe"> &gt;=</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">AND</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> order_id </span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> order_items </span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> product_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 优化版本3：使用LATERAL JOIN</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> o.</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">, latest_item.</span><span class="__shiki_1itgoe">*</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> orders o</span></span>
<span class="line"><span class="__shiki_1itgoe">LEFT JOIN</span><span class="__shiki_140thh"> LATERAL (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> order_items oi</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_dzsirb"> oi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span></span>
<span class="line"><span class="__shiki_1itgoe">    ORDER BY</span><span class="__shiki_dzsirb"> oi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">created_at</span><span class="__shiki_1itgoe"> DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">    LIMIT</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">) latest_item </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> true</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_date</span><span class="__shiki_1itgoe"> &gt;=</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_8-3-并行查询优化" tabindex="-1">8.3 并行查询优化 <a class="header-anchor" href="#_8-3-并行查询优化" aria-label="Permalink to &quot;8.3 并行查询优化&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 检查并行查询设置</span></span>
<span class="line"><span class="__shiki_140thh">SHOW max_parallel_workers;</span></span>
<span class="line"><span class="__shiki_140thh">SHOW max_parallel_workers_per_gather;</span></span>
<span class="line"><span class="__shiki_140thh">SHOW parallel_setup_cost;</span></span>
<span class="line"><span class="__shiki_140thh">SHOW parallel_tuple_cost;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 为特定表设置并行度</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> large_table </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> (parallel_workers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 8</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 强制并行查询</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> max_parallel_workers_per_gather </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> parallel_setup_cost </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> parallel_tuple_cost </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">001</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 监控并行查询</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, </span><span class="__shiki_1itgoe">VERBOSE</span><span class="__shiki_140thh">) </span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_dzsirb"> count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> large_table </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> some_column </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看并行查询统计</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    query,</span></span>
<span class="line"><span class="__shiki_140thh">    plans,</span></span>
<span class="line"><span class="__shiki_140thh">    total_plan_time,</span></span>
<span class="line"><span class="__shiki_140thh">    total_exec_time,</span></span>
<span class="line"><span class="__shiki_140thh">    calls</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_statements </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%Parallel%&#39;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">   OR</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%Gather%&#39;</span><span class="__shiki_140thh">;</span></span></code></pre></div><h2 id="九、监控报警配置" tabindex="-1">九、监控报警配置 <a class="header-anchor" href="#九、监控报警配置" aria-label="Permalink to &quot;九、监控报警配置&quot;">​</a></h2><h3 id="_9-1-关键性能阈值" tabindex="-1">9.1 关键性能阈值 <a class="header-anchor" href="#_9-1-关键性能阈值" aria-label="Permalink to &quot;9.1 关键性能阈值&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 监控报警阈值配置</span></span>
<span class="line"><span class="__shiki_17hn0y">monitoring_thresholds</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  cpu_usage</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span><span class="__shiki_21nrsd">  # CPU使用率超过80%</span></span>
<span class="line"><span class="__shiki_17hn0y">  memory_usage</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">85</span><span class="__shiki_21nrsd">  # 内存使用率超过85%</span></span>
<span class="line"><span class="__shiki_17hn0y">  disk_usage</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">90</span><span class="__shiki_21nrsd">  # 磁盘使用率超过90%</span></span>
<span class="line"><span class="__shiki_17hn0y">  connections</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd"># 连接数相关</span></span>
<span class="line"><span class="__shiki_17hn0y">    max_connections_percent</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span><span class="__shiki_21nrsd">  # 连接数达到max_connections的80%</span></span>
<span class="line"><span class="__shiki_17hn0y">    idle_in_transaction</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_21nrsd">  # 空闲事务超过10个</span></span>
<span class="line"><span class="__shiki_17hn0y">    long_running_queries</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">300</span><span class="__shiki_21nrsd">  # 查询运行超过300秒</span></span>
<span class="line"><span class="__shiki_17hn0y">  replication_lag</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span><span class="__shiki_21nrsd">  # 复制延迟超过60秒</span></span>
<span class="line"><span class="__shiki_17hn0y">  dead_tuples_percent</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">20</span><span class="__shiki_21nrsd">  # 死元组比例超过20%</span></span>
<span class="line"><span class="__shiki_17hn0y">  cache_hit_ratio</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">95</span><span class="__shiki_21nrsd">  # 缓存命中率低于95%</span></span>
<span class="line"><span class="__shiki_17hn0y">  checkpoint_segments</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd"># 检查点相关</span></span>
<span class="line"><span class="__shiki_17hn0y">    max_wal_size_percent</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_17hn0y">    checkpoint_warning</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_21nrsd">  # 检查点耗时超过30秒</span></span></code></pre></div><h3 id="_9-2-报警脚本示例" tabindex="-1">9.2 报警脚本示例 <a class="header-anchor" href="#_9-2-报警脚本示例" aria-label="Permalink to &quot;9.2 报警脚本示例&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/usr/bin/env python3</span></span>
<span class="line"><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">PostgreSQL监控报警脚本</span></span>
<span class="line"><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> psycopg2</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> smtplib</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> email.mime.text </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> MIMEText</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> logging</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> PostgreSQLMonitor</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, db_params):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.db_params </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db_params</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.conn </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.setup_logging()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> setup_logging</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_140thh">        logging.basicConfig(</span></span>
<span class="line"><span class="__shiki_1jdh33">            level</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">logging.</span><span class="__shiki_dzsirb">INFO</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            format</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">%(asctime)s</span><span class="__shiki_mdbnqw"> - </span><span class="__shiki_dzsirb">%(levelname)s</span><span class="__shiki_mdbnqw"> - </span><span class="__shiki_dzsirb">%(message)s</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            handlers</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span></span>
<span class="line"><span class="__shiki_140thh">                logging.FileHandler(</span><span class="__shiki_mdbnqw">&#39;/var/log/postgres_monitor.log&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">                logging.StreamHandler()</span></span>
<span class="line"><span class="__shiki_140thh">            ]</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> check_connections</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;检查连接数&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.conn.cursor() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> cur:</span></span>
<span class="line"><span class="__shiki_140thh">            cur.execute(</span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">                    count(*) as total,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    count(*) FILTER (WHERE state = &#39;active&#39;) as active,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    count(*) FILTER (WHERE state = &#39;idle in transaction&#39;) as idle_in_xact</span></span>
<span class="line"><span class="__shiki_mdbnqw">                FROM pg_stat_activity </span></span>
<span class="line"><span class="__shiki_mdbnqw">                WHERE pid &lt;&gt; pg_backend_pid()</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;&quot;&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cur.fetchone()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> result[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 150</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd"># 假设max_connections=200</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.send_alert(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;High connection count: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">result[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> result[</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.send_alert(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Idle in transaction connections: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">result[</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">]</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> check_query_performance</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;检查查询性能&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.conn.cursor() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> cur:</span></span>
<span class="line"><span class="__shiki_140thh">            cur.execute(</span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">                    pid,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    now() - query_start as duration,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    query</span></span>
<span class="line"><span class="__shiki_mdbnqw">                FROM pg_stat_activity </span></span>
<span class="line"><span class="__shiki_mdbnqw">                WHERE state = &#39;active&#39; </span></span>
<span class="line"><span class="__shiki_mdbnqw">                  AND now() - query_start &gt; interval &#39;5 minutes&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                ORDER BY duration DESC</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;&quot;&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            long_queries </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cur.fetchall()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> long_queries:</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.send_alert(</span></span>
<span class="line"><span class="__shiki_1itgoe">                    f</span><span class="__shiki_mdbnqw">&quot;Long running query detected</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">                    f</span><span class="__shiki_mdbnqw">&quot;PID: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">query[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]</span><span class="__shiki_dzsirb">}\\n</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">                    f</span><span class="__shiki_mdbnqw">&quot;Duration: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">query[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">]</span><span class="__shiki_dzsirb">}\\n</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">                    f</span><span class="__shiki_mdbnqw">&quot;Query: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">query[</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">][:</span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">]</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">...&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> send_alert</span><span class="__shiki_140thh">(self, message):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;发送报警&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        logging.warning(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;ALERT: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">message</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 邮件报警</span></span>
<span class="line"><span class="__shiki_140thh">        msg </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> MIMEText(message)</span></span>
<span class="line"><span class="__shiki_140thh">        msg[</span><span class="__shiki_mdbnqw">&#39;Subject&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;PostgreSQL Alert&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        msg[</span><span class="__shiki_mdbnqw">&#39;From&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;monitor@example.com&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        msg[</span><span class="__shiki_mdbnqw">&#39;To&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;dba@example.com&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            with</span><span class="__shiki_140thh"> smtplib.SMTP(</span><span class="__shiki_mdbnqw">&#39;smtp.example.com&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">587</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> server:</span></span>
<span class="line"><span class="__shiki_140thh">                server.starttls()</span></span>
<span class="line"><span class="__shiki_140thh">                server.login(</span><span class="__shiki_mdbnqw">&#39;user&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;password&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                server.send_message(msg)</span></span>
<span class="line"><span class="__shiki_1itgoe">        except</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> e:</span></span>
<span class="line"><span class="__shiki_140thh">            logging.error(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Failed to send alert email: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">e</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> run_checks</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;运行所有检查&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.conn </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> psycopg2.connect(</span><span class="__shiki_1itgoe">**</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.db_params)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.check_connections()</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.check_query_performance()</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 添加更多检查...</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        except</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> e:</span></span>
<span class="line"><span class="__shiki_140thh">            logging.error(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Monitor error: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">e</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.send_alert(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Monitor error: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">e</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        finally</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.conn:</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.conn.close()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_dzsirb"> __name__</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_mdbnqw"> &quot;__main__&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    db_params </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;host&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;localhost&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;port&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5432</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;database&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;postgres&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;user&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;monitor_user&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;password&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;secure_password&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    monitor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> PostgreSQLMonitor(db_params)</span></span>
<span class="line"><span class="__shiki_140thh">    monitor.run_checks()</span></span></code></pre></div><h2 id="十、最佳实践总结" tabindex="-1">十、最佳实践总结 <a class="header-anchor" href="#十、最佳实践总结" aria-label="Permalink to &quot;十、最佳实践总结&quot;">​</a></h2><h3 id="_10-1-性能调优检查清单" tabindex="-1">10.1 性能调优检查清单 <a class="header-anchor" href="#_10-1-性能调优检查清单" aria-label="Permalink to &quot;10.1 性能调优检查清单&quot;">​</a></h3><h4 id="系统级别" tabindex="-1">系统级别： <a class="header-anchor" href="#系统级别" aria-label="Permalink to &quot;系统级别：&quot;">​</a></h4><ul><li>[ ] 确保足够的RAM和CPU资源</li><li>[ ] 使用SSD存储，特别是对于WAL日志</li><li>[ ] 配置适当的文件系统（XFS或ext4）</li><li>[ ] 设置合理的操作系统限制</li></ul><h4 id="数据库级别" tabindex="-1">数据库级别： <a class="header-anchor" href="#数据库级别" aria-label="Permalink to &quot;数据库级别：&quot;">​</a></h4><ul><li>[ ] 根据负载调整shared_buffers和work_mem</li><li>[ ] 配置自动清理参数</li><li>[ ] 设置适当的检查点参数</li><li>[ ] 启用必要的扩展（pg_stat_statements等）</li></ul><h4 id="应用级别" tabindex="-1">应用级别： <a class="header-anchor" href="#应用级别" aria-label="Permalink to &quot;应用级别：&quot;">​</a></h4><ul><li>[ ] 使用连接池（如PgBouncer）</li><li>[ ] 实现查询重试机制</li><li>[ ] 避免N+1查询问题</li><li>[ ] 使用适当的隔离级别</li></ul><h3 id="_10-2-持续监控策略" tabindex="-1">10.2 持续监控策略 <a class="header-anchor" href="#_10-2-持续监控策略" aria-label="Permalink to &quot;10.2 持续监控策略&quot;">​</a></h3><ol><li><strong>实时监控</strong>：Grafana仪表板显示关键指标</li><li><strong>日志分析</strong>：使用pgBadger分析慢查询和错误</li><li><strong>定期健康检查</strong>：脚本化的完整性检查</li><li><strong>容量规划</strong>：预测增长并提前规划资源</li><li><strong>备份监控</strong>：确保备份的完整性和可恢复性</li></ol><h3 id="_10-3-调优周期" tabindex="-1">10.3 调优周期 <a class="header-anchor" href="#_10-3-调优周期" aria-label="Permalink to &quot;10.3 调优周期&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">周度：检查慢查询和索引使用</span></span>
<span class="line"><span class="__shiki_wvjl67">月度：分析统计信息，重建膨胀索引</span></span>
<span class="line"><span class="__shiki_wvjl67">季度：审查配置参数，容量规划</span></span>
<span class="line"><span class="__shiki_wvjl67">年度：全面性能评估，架构审查</span></span></code></pre></div><h2 id="附录-常用命令速查" tabindex="-1">附录：常用命令速查 <a class="header-anchor" href="#附录-常用命令速查" aria-label="Permalink to &quot;附录：常用命令速查&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看当前配置</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_140thh">, setting, unit, context </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_settings </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;shared_buffers&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;work_mem&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;max_connections&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 杀死长时间运行的查询</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> pg_cancel_backend(pid);  </span><span class="__shiki_21nrsd">-- 优雅终止</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> pg_terminate_backend(pid);  </span><span class="__shiki_21nrsd">-- 强制终止</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看锁信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_locks </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_140thh"> granted;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看表膨胀</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pgstattuple(</span><span class="__shiki_mdbnqw">&#39;table_name&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 重新收集统计信息</span></span>
<span class="line"><span class="__shiki_140thh">ANALYZE </span><span class="__shiki_1itgoe">VERBOSE</span><span class="__shiki_140thh"> table_name;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看扩展</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_available_extensions </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> installed_version </span><span class="__shiki_1itgoe">IS NOT NULL</span><span class="__shiki_140thh">;</span></span></code></pre></div><p>记住：性能调优是一个持续的过程，需要定期监控、分析和调整。最好的优化通常来自于应用层的改进和合理的数据库设计。</p>`,108)])])}const r=a(p,[["render",l]]);export{d as __pageData,r as default};
